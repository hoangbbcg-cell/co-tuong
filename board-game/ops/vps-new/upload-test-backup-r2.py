#!/usr/bin/env python3
"""Encrypt one verified test dump and verify its R2 copy by SHA-256 readback."""

from __future__ import annotations

import hashlib
import configparser
import json
import os
import re
import shutil
import stat
import subprocess
import sys
import tempfile
import uuid
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BACKUP_DIR = Path("/var/backups/cotuong-stage")
R2_CREDENTIALS = Path("/etc/cotuong/r2-credentials")
R2_READ_TOKEN = Path("/etc/cotuong/r2-read-token")
AGE_RECIPIENTS = Path("/etc/cotuong/r2-age-recipients")
MAX_BACKUP_AGE_SECONDS = 12 * 60 * 60
MIN_LOCK_SECONDS = 35 * 24 * 60 * 60
MIN_RETENTION_DAYS = 90


class BackupError(RuntimeError):
    pass


def require_root_file(path: Path, mode: int) -> None:
    if path.is_symlink() or not path.is_file():
        raise BackupError("required protected file is missing or unsafe")
    info = path.stat()
    if info.st_uid != 0 or stat.S_IMODE(info.st_mode) != mode:
        raise BackupError("protected file owner or mode is unsafe")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def checked_run(args: list[str], *, env: dict[str, str] | None = None) -> subprocess.CompletedProcess[str]:
    """Never forward command output: cloud clients can include sensitive diagnostics."""
    try:
        return subprocess.run(args, check=True, capture_output=True, text=True, env=env)
    except (OSError, subprocess.CalledProcessError) as error:
        raise BackupError("required encryption or R2 operation failed; inspect protected service logs") from error


def verify_source(path: Path) -> str:
    if BACKUP_DIR.is_symlink() or not BACKUP_DIR.is_dir():
        raise BackupError("local backup directory is missing or unsafe")
    directory = BACKUP_DIR.stat()
    if directory.st_uid != 0 or stat.S_IMODE(directory.st_mode) != 0o700:
        raise BackupError("local backup directory owner or mode is unsafe")
    if path.parent != BACKUP_DIR or path.is_symlink() or not path.is_file():
        raise BackupError("source backup must be a regular file directly in the protected backup directory")
    info = path.stat()
    if info.st_uid != 0 or stat.S_IMODE(info.st_mode) != 0o600 or info.st_size == 0:
        raise BackupError("source backup owner, mode or size is invalid")
    if not re.fullmatch(r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}-[0-9]{2}-[0-9]{2}Z\.sql\.gz", path.name):
        raise BackupError("source backup filename is invalid")
    age_seconds = (datetime.now(timezone.utc).timestamp() - info.st_mtime)
    if age_seconds < -300 or age_seconds > MAX_BACKUP_AGE_SECONDS:
        raise BackupError("source backup is outside the accepted age window")
    checksum_path = path.with_name(path.name + ".sha256")
    require_root_file(checksum_path, 0o600)
    match = re.fullmatch(rf"([a-f0-9]{{64}})  {re.escape(path.name)}\n", checksum_path.read_text(encoding="ascii"))
    if not match or sha256_file(path) != match.group(1):
        raise BackupError("source backup checksum does not match")
    checked_run(["gzip", "-t", "--", str(path)])
    return match.group(1)


def load_config() -> tuple[str, str, str, Path, Path]:
    bucket = os.environ.get("COTUONG_R2_BUCKET", "")
    endpoint = os.environ.get("COTUONG_R2_ENDPOINT", "")
    account = os.environ.get("COTUONG_R2_ACCOUNT_ID", "")
    if not re.fullmatch(r"[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]", bucket):
        raise BackupError("R2 bucket configuration is invalid")
    if not re.fullmatch(r"https://[a-f0-9]{32}\.r2\.cloudflarestorage\.com", endpoint):
        raise BackupError("R2 endpoint configuration is invalid")
    if not re.fullmatch(r"[a-f0-9]{32}", account) or endpoint != f"https://{account}.r2.cloudflarestorage.com":
        raise BackupError("R2 account configuration is invalid")
    require_root_file(R2_CREDENTIALS, 0o600)
    require_root_file(R2_READ_TOKEN, 0o600)
    require_root_file(AGE_RECIPIENTS, 0o600)
    credentials = configparser.RawConfigParser()
    try:
        credentials.read(R2_CREDENTIALS)
    except configparser.Error as error:
        raise BackupError("R2 credentials file is invalid") from error
    if not credentials.has_section("default") or not credentials.get("default", "aws_access_key_id", fallback="") or not credentials.get("default", "aws_secret_access_key", fallback=""):
        raise BackupError("R2 default credentials are incomplete")
    recipients = [line.strip() for line in AGE_RECIPIENTS.read_text(encoding="ascii").splitlines() if line.strip()]
    if not recipients or any(not re.fullmatch(r"age1[023456789acdefghjklmnpqrstuvwxyz]{58}", item) for item in recipients):
        raise BackupError("age recipient configuration is invalid")
    return bucket, endpoint, account, R2_CREDENTIALS, R2_READ_TOKEN


def verify_retention(bucket: str, endpoint: str, account: str, token_path: Path, env: dict[str, str]) -> None:
    token = token_path.read_text(encoding="ascii").strip()
    if not token or any(character.isspace() for character in token):
        raise BackupError("R2 read token is invalid")
    request = urllib.request.Request(
        f"https://api.cloudflare.com/client/v4/accounts/{account}/r2/buckets/{bucket}/lock",
        headers={"Authorization": f"Bearer {token}", "Accept": "application/json"},
    )
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            lock_payload = json.loads(response.read())
    except (OSError, urllib.error.URLError, ValueError) as error:
        raise BackupError("could not verify the R2 retention lock policy") from error
    if lock_payload.get("success") is not True:
        raise BackupError("R2 retention lock policy query was unsuccessful")
    result_payload = lock_payload.get("result")
    rules = result_payload.get("rules", []) if isinstance(result_payload, dict) else []
    if not isinstance(rules, list):
        raise BackupError("R2 retention lock response is invalid")
    locked = any(
        rule.get("enabled") is True
        and rule.get("prefix") == "cotuong-stage/"
        and rule.get("condition", {}).get("type") == "Age"
        and rule.get("condition", {}).get("maxAgeSeconds", 0) >= MIN_LOCK_SECONDS
        for rule in rules
        if isinstance(rule, dict)
    )
    if not locked:
        raise BackupError("R2 bucket has no enabled 35-day lock for cotuong-stage objects")

    lifecycle = subprocess.run(
        ["aws", "s3api", "get-bucket-lifecycle-configuration", "--bucket", bucket, "--endpoint-url", endpoint],
        capture_output=True,
        text=True,
        env=env,
    )
    if lifecycle.returncode != 0:
        raise BackupError("could not verify the R2 lifecycle retention policy")
    try:
        lifecycle_payload = json.loads(lifecycle.stdout)
    except ValueError as error:
        raise BackupError("R2 lifecycle response is invalid") from error
    retained = False
    lifecycle_rules = lifecycle_payload.get("Rules", [])
    if not isinstance(lifecycle_rules, list):
        raise BackupError("R2 lifecycle response is invalid")
    for rule in lifecycle_rules:
        if not isinstance(rule, dict):
            continue
        prefix = rule.get("Filter", {}).get("Prefix", rule.get("Prefix", ""))
        expiration_days = rule.get("Expiration", {}).get("Days", 0)
        if rule.get("Status") == "Enabled" and prefix == "cotuong-stage/" and expiration_days >= MIN_RETENTION_DAYS:
            retained = True
            break
    if not retained:
        raise BackupError("R2 bucket has no 90-day lifecycle retention for cotuong-stage objects")


def head_exists(bucket: str, key: str, endpoint: str, env: dict[str, str]) -> bool:
    result = subprocess.run(
        ["aws", "s3api", "head-object", "--bucket", bucket, "--key", key, "--endpoint-url", endpoint],
        capture_output=True,
        text=True,
        env=env,
    )
    if result.returncode == 0:
        return True
    diagnostic = (result.stderr + result.stdout).lower()
    if "404" in diagnostic or "not found" in diagnostic or "nosuchkey" in diagnostic:
        return False
    raise BackupError("could not safely determine whether the R2 object key already exists")


def transfer_and_verify(path: Path, key: str, bucket: str, endpoint: str, env: dict[str, str], expected: str) -> None:
    if head_exists(bucket, key, endpoint, env):
        raise BackupError("refusing to overwrite an existing R2 object")
    checked_run(["aws", "s3api", "put-object", "--bucket", bucket, "--key", key, "--body", str(path), "--endpoint-url", endpoint, "--if-none-match", "*"], env=env)
    with tempfile.NamedTemporaryFile(prefix="cotuong-r2-readback-", dir=BACKUP_DIR, delete=False) as output:
        downloaded = Path(output.name)
    try:
        checked_run(["aws", "s3api", "get-object", "--bucket", bucket, "--key", key, "--endpoint-url", endpoint, str(downloaded)], env=env)
        if sha256_file(downloaded) != expected:
            raise BackupError("R2 readback SHA-256 mismatch")
    finally:
        downloaded.unlink(missing_ok=True)


def latest_backup() -> Path:
    if BACKUP_DIR.is_symlink() or not BACKUP_DIR.is_dir():
        raise BackupError("local backup directory is missing or unsafe")
    matches = [path for path in BACKUP_DIR.iterdir() if re.fullmatch(r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}-[0-9]{2}-[0-9]{2}Z\.sql\.gz", path.name)]
    if not matches:
        raise BackupError("no completed local backup is available")
    return max(matches, key=lambda path: path.name)


def upload_backup(path: Path) -> str:
    source_digest = verify_source(path)
    bucket, endpoint, account, credentials, token_path = load_config()
    credentials_info = credentials.stat()
    env = os.environ.copy()
    env.update({
        "AWS_SHARED_CREDENTIALS_FILE": str(credentials),
        "AWS_CONFIG_FILE": "/dev/null",
        "AWS_DEFAULT_REGION": "auto",
        "AWS_EC2_METADATA_DISABLED": "true",
        "AWS_PAGER": "",
    })
    verify_retention(bucket, endpoint, account, token_path, env)
    require_root_file(AGE_RECIPIENTS, 0o600)
    with tempfile.TemporaryDirectory(prefix=".r2-upload-", dir=BACKUP_DIR) as work_name:
        work = Path(work_name)
        os.chmod(work, 0o700)
        encrypted_dump = work / "backup.sql.gz.age"
        checked_run(["age", "--encrypt", "--recipients-file", str(AGE_RECIPIENTS), "--output", str(encrypted_dump), str(path)])
        os.chmod(encrypted_dump, 0o600)
        encrypted_digest = sha256_file(encrypted_dump)
        manifest = {
            "format": 1,
            "schema": "cotuong_stage",
            "source_sha256": source_digest,
            "encrypted_sha256": encrypted_digest,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        manifest_plain = work / "manifest.json"
        manifest_plain.write_text(json.dumps(manifest, sort_keys=True) + "\n", encoding="utf-8")
        os.chmod(manifest_plain, 0o600)
        encrypted_manifest = work / "manifest.json.age"
        checked_run(["age", "--encrypt", "--recipients-file", str(AGE_RECIPIENTS), "--output", str(encrypted_manifest), str(manifest_plain)])
        os.chmod(encrypted_manifest, 0o600)
        manifest_plain.unlink()

        # Detect an in-place or replacement change before creating any remote objects.
        if sha256_file(path) != source_digest:
            raise BackupError("source backup changed during encryption")

        object_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ") + "-" + uuid.uuid4().hex
        prefix = "cotuong-stage/" + object_id
        encrypted_manifest_digest = sha256_file(encrypted_manifest)
        for local, suffix, digest in (
            (encrypted_dump, ".sql.gz.age", encrypted_digest),
            (encrypted_manifest, ".manifest.age", encrypted_manifest_digest),
        ):
            transfer_and_verify(local, prefix + suffix, bucket, endpoint, env, digest)
        for key, digest in (
            (prefix + ".sql.gz.age.sha256", encrypted_digest),
            (prefix + ".manifest.age.sha256", encrypted_manifest_digest),
        ):
            sidecar = work / (Path(key).name + ".tmp")
            sidecar.write_text(digest + "\n", encoding="ascii")
            os.chmod(sidecar, 0o600)
            transfer_and_verify(sidecar, key, bucket, endpoint, env, hashlib.sha256(sidecar.read_bytes()).hexdigest())
        if sha256_file(path) != source_digest:
            raise BackupError("source backup changed during encryption or upload")
        # Verify credentials were not changed while AWS CLI was running.
        if credentials.stat().st_ino != credentials_info.st_ino or credentials.stat().st_size != credentials_info.st_size:
            raise BackupError("R2 credentials file changed during upload")
        return prefix


def main(argv: list[str]) -> int:
    if os.geteuid() != 0:
        print("ERROR: root is required", file=sys.stderr)
        return 1
    if len(argv) != 2:
        print("Usage: upload-test-backup-r2.py --latest | /var/backups/cotuong-stage/<timestamp>.sql.gz", file=sys.stderr)
        return 2
    try:
        source = latest_backup() if argv[1] == "--latest" else Path(argv[1])
        prefix = upload_backup(source)
    except (BackupError, OSError, ValueError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(f"OFFSITE_VERIFIED prefix={prefix} encryption=age sha256=readback")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
