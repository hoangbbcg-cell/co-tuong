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
from datetime import datetime, timedelta, timezone
from pathlib import Path

BACKUP_DIR = Path("/var/backups/cotuong-stage")
MEDIA_HELPER = Path("/usr/local/sbin/cotuong-media-backup.py")
R2_CREDENTIALS = Path("/etc/cotuong/r2-credentials")
R2_POLICY_ATTESTATION = Path("/etc/cotuong/r2-policy-attestation.json")
AGE_RECIPIENTS = Path("/etc/cotuong/r2-age-recipients")
MAX_BACKUP_AGE_SECONDS = 12 * 60 * 60
MIN_LOCK_SECONDS = 30 * 24 * 60 * 60
MAX_POLICY_ATTESTATION_AGE = timedelta(days=7)


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


def write_offsite_status(status: str, prefix: str, source_stamp: str) -> None:
    path = BACKUP_DIR / ".offsite-status"
    temporary = BACKUP_DIR / f".offsite-status.{uuid.uuid4().hex}.tmp"
    if path.is_symlink() or (path.exists() and not path.is_file()):
        raise BackupError("offsite status marker is unsafe")
    fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, "O_NOFOLLOW", 0), 0o600)
    try:
        with os.fdopen(fd, "w", encoding="ascii") as stream:
            stream.write(f"{status} {prefix} {datetime.now(timezone.utc).isoformat()} {source_stamp}\n")
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
        os.chmod(path, 0o600)
    finally:
        try:
            temporary.unlink(missing_ok=True)
        except OSError:
            pass


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


def media_source_for(path: Path) -> Path:
    stamp = path.name.removesuffix(".sql.gz")
    return BACKUP_DIR / f"{stamp}.uploads.tar.gz"


def verify_media_source(path: Path) -> tuple[str, int]:
    if BACKUP_DIR.is_symlink() or not BACKUP_DIR.is_dir():
        raise BackupError("local backup directory is missing or unsafe")
    if path.parent != BACKUP_DIR or path.is_symlink() or not path.is_file():
        raise BackupError("media archive must be in the protected local backup directory")
    if not re.fullmatch(r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}-[0-9]{2}-[0-9]{2}Z\.uploads\.tar\.gz", path.name):
        raise BackupError("media archive filename is invalid")
    info = path.stat()
    if info.st_uid != 0 or stat.S_IMODE(info.st_mode) != 0o600 or info.st_size == 0:
        raise BackupError("media archive owner, mode or size is invalid")
    checksum_path = path.with_name(path.name + ".sha256")
    require_root_file(checksum_path, 0o600)
    match = re.fullmatch(rf"([a-f0-9]{{64}})  {re.escape(path.name)}\n", checksum_path.read_text(encoding="ascii"))
    if not match or sha256_file(path) != match.group(1):
        raise BackupError("media archive checksum does not match")
    result = checked_run(["python3", str(MEDIA_HELPER), "--verify", str(path)])
    report = re.fullmatch(r"MEDIA_ARCHIVE_VERIFIED files=([0-9]+) sha256=([a-f0-9]{64})\n?", result.stdout)
    if not report or report.group(2) != match.group(1):
        raise BackupError("media archive structural verification failed")
    return match.group(1), int(report.group(1))


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
    require_root_file(R2_POLICY_ATTESTATION, 0o600)
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
    return bucket, endpoint, account, R2_CREDENTIALS, R2_POLICY_ATTESTATION


def verify_retention(bucket: str, account: str, attestation_path: Path) -> None:
    """Require a fresh root-owned manual dashboard attestation without storing Admin Read on the VPS."""
    require_root_file(attestation_path, 0o600)
    try:
        report = json.loads(attestation_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, ValueError) as error:
        raise BackupError("R2 policy attestation is missing or invalid") from error
    expected_fields = {"format", "account_id", "bucket", "prefix", "public_access_disabled", "lock_age_seconds", "lifecycle_deletion_overlap", "verified_via", "checked_at", "expires_at"}
    if not isinstance(report, dict) or set(report) != expected_fields:
        raise BackupError("R2 policy attestation fields are invalid")
    if (
        report.get("format") != 1
        or report.get("account_id") != account
        or report.get("bucket") != bucket
        or report.get("prefix") != "cotuong-stage/"
        or report.get("public_access_disabled") is not True
        or type(report.get("lock_age_seconds")) is not int
        or report["lock_age_seconds"] < MIN_LOCK_SECONDS
        or report.get("lifecycle_deletion_overlap") is not False
        or report.get("verified_via") != "cloudflare-dashboard"
    ):
        raise BackupError("R2 policy attestation does not match the required private bucket policy")
    try:
        checked_at = datetime.fromisoformat(report["checked_at"])
        expires_at = datetime.fromisoformat(report["expires_at"])
    except (TypeError, ValueError) as error:
        raise BackupError("R2 policy attestation timestamps are invalid") from error
    now = datetime.now(timezone.utc)
    if checked_at.tzinfo is None or expires_at.tzinfo is None:
        raise BackupError("R2 policy attestation timestamps must include a timezone")
    if checked_at > now + timedelta(minutes=5) or expires_at <= now or expires_at <= checked_at:
        raise BackupError("R2 policy attestation is from the future or has expired")
    if now - checked_at.astimezone(timezone.utc) > MAX_POLICY_ATTESTATION_AGE or expires_at > checked_at + MAX_POLICY_ATTESTATION_AGE:
        raise BackupError("R2 policy attestation must be renewed within seven days")


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
    stamp_match = re.fullmatch(r"([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}-[0-9]{2}-[0-9]{2}Z)\.sql\.gz", path.name)
    if path.parent != BACKUP_DIR or not stamp_match:
        raise BackupError("source backup filename is invalid")
    source_stamp = stamp_match.group(1)
    write_offsite_status("running", "pending", source_stamp)
    source_digest = verify_source(path)
    media_path = media_source_for(path)
    media_digest, media_files = verify_media_source(media_path)
    bucket, endpoint, account, credentials, attestation_path = load_config()
    credentials_info = credentials.stat()
    env = os.environ.copy()
    env.update({
        "AWS_SHARED_CREDENTIALS_FILE": str(credentials),
        "AWS_CONFIG_FILE": "/dev/null",
        "AWS_DEFAULT_REGION": "auto",
        "AWS_EC2_METADATA_DISABLED": "true",
        "AWS_PAGER": "",
    })
    # The account-wide Admin Read token stays off the VPS. An operator checks
    # lock/lifecycle in the dashboard and renews this short-lived attestation.
    verify_retention(bucket, account, attestation_path)
    require_root_file(AGE_RECIPIENTS, 0o600)
    with tempfile.TemporaryDirectory(prefix=".r2-upload-", dir=BACKUP_DIR) as work_name:
        work = Path(work_name)
        os.chmod(work, 0o700)
        encrypted_dump = work / "backup.sql.gz.age"
        encrypted_media = work / "backup.uploads.tar.gz.age"
        checked_run(["age", "--encrypt", "--recipients-file", str(AGE_RECIPIENTS), "--output", str(encrypted_dump), str(path)])
        os.chmod(encrypted_dump, 0o600)
        encrypted_digest = sha256_file(encrypted_dump)
        checked_run(["age", "--encrypt", "--recipients-file", str(AGE_RECIPIENTS), "--output", str(encrypted_media), str(media_path)])
        os.chmod(encrypted_media, 0o600)
        encrypted_media_digest = sha256_file(encrypted_media)
        manifest = {
            "format": 2,
            "schema": "cotuong_stage",
            "database": {"source_sha256": source_digest, "encrypted_sha256": encrypted_digest},
            "media": {"source_sha256": media_digest, "encrypted_sha256": encrypted_media_digest, "file_count": media_files},
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
        if sha256_file(path) != source_digest or sha256_file(media_path) != media_digest:
            raise BackupError("a source backup changed during encryption")

        object_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ") + "-" + uuid.uuid4().hex
        prefix = "cotuong-stage/" + object_id
        encrypted_manifest_digest = sha256_file(encrypted_manifest)
        for local, suffix, digest in (
            (encrypted_dump, ".sql.gz.age", encrypted_digest),
            (encrypted_media, ".uploads.tar.gz.age", encrypted_media_digest),
            (encrypted_manifest, ".manifest.age", encrypted_manifest_digest),
        ):
            transfer_and_verify(local, prefix + suffix, bucket, endpoint, env, digest)
        for key, digest in (
            (prefix + ".sql.gz.age.sha256", encrypted_digest),
            (prefix + ".uploads.tar.gz.age.sha256", encrypted_media_digest),
            (prefix + ".manifest.age.sha256", encrypted_manifest_digest),
        ):
            sidecar = work / (Path(key).name + ".tmp")
            sidecar.write_text(digest + "\n", encoding="ascii")
            os.chmod(sidecar, 0o600)
            transfer_and_verify(sidecar, key, bucket, endpoint, env, hashlib.sha256(sidecar.read_bytes()).hexdigest())
        if sha256_file(path) != source_digest or sha256_file(media_path) != media_digest:
            raise BackupError("a source backup changed during encryption or upload")
        # Verify credentials were not changed while AWS CLI was running.
        if credentials.stat().st_ino != credentials_info.st_ino or credentials.stat().st_size != credentials_info.st_size:
            raise BackupError("R2 credentials file changed during upload")
        write_offsite_status("success", prefix, source_stamp)
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
    print(f"OFFSITE_VERIFIED prefix={prefix} encryption=age database+media sha256=readback")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
