#!/usr/bin/env python3
"""Dry-run-first 30-day R2 cleanup; preserves the newest verified backup set."""
from __future__ import annotations

import hashlib
import importlib.util
import json
import os
import re
import subprocess
import sys
import tempfile
from datetime import datetime, timedelta, timezone
from pathlib import Path

OPS = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location("upload_test_backup_r2", OPS / "upload-test-backup-r2.py")
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("R2 uploader helper is unavailable")
UPLOAD = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(UPLOAD)

PREFIX = "cotuong-stage/"
RETENTION = timedelta(days=30)
STATUS = Path("/var/backups/cotuong-stage/.offsite-status")
SUFFIXES = (".sql.gz.age", ".uploads.tar.gz.age", ".manifest.age")
GROUP_RE = re.compile(r"cotuong-stage/([0-9]{8}T[0-9]{6}Z-[0-9a-f]{32})(\.sql\.gz\.age|\.uploads\.tar\.gz\.age|\.manifest\.age)(\.sha256)?")


class RetentionError(RuntimeError):
    pass


def group_keys(keys: list[str]) -> dict[str, set[str]]:
    groups: dict[str, set[str]] = {}
    for key in keys:
        match = GROUP_RE.fullmatch(key)
        if not match:
            raise RetentionError("R2 prefix contains an unexpected object key; refusing cleanup")
        groups.setdefault(PREFIX + match.group(1), set()).add(key)
    expected = {suffix + extra for suffix in SUFFIXES for extra in ("", ".sha256")}
    if any({key.removeprefix(prefix) for key in values} != expected for prefix, values in groups.items()):
        raise RetentionError("R2 prefix contains an incomplete backup set; refusing cleanup")
    return groups


def created_at(prefix: str) -> datetime:
    stamp = prefix.removeprefix(PREFIX).split("-", 1)[0]
    return datetime.strptime(stamp, "%Y%m%dT%H%M%SZ").replace(tzinfo=timezone.utc)


def retention_plan(groups: dict[str, set[str]], now: datetime) -> tuple[str, list[str]]:
    if not groups:
        raise RetentionError("no complete R2 backup sets exist; refusing cleanup")
    ordered = sorted(groups, key=created_at)
    newest = ordered[-1]
    expired = [prefix for prefix in ordered if prefix != newest and now - created_at(prefix) >= RETENTION]
    return newest, expired


def checked_aws(args: list[str], env: dict[str, str]) -> subprocess.CompletedProcess[str]:
    try:
        return subprocess.run(args, check=True, capture_output=True, text=True, env=env)
    except (OSError, subprocess.CalledProcessError) as error:
        raise RetentionError("R2 retention operation failed; inspect protected service logs") from error


def list_keys(bucket: str, endpoint: str, env: dict[str, str]) -> list[str]:
    result = checked_aws(["aws", "s3api", "list-objects-v2", "--bucket", bucket, "--prefix", PREFIX, "--endpoint-url", endpoint, "--output", "json"], env)
    try:
        payload = json.loads(result.stdout)
        objects = payload.get("Contents", []) if isinstance(payload, dict) else None
        if not isinstance(objects, list) or any(not isinstance(item, dict) or not isinstance(item.get("Key"), str) for item in objects):
            raise ValueError
        return [item["Key"] for item in objects]
    except (ValueError, TypeError) as error:
        raise RetentionError("R2 object listing was invalid; refusing cleanup") from error


def verify_group(prefix: str, bucket: str, endpoint: str, env: dict[str, str]) -> None:
    with tempfile.TemporaryDirectory(prefix=".r2-retention-verify-", dir=UPLOAD.BACKUP_DIR) as directory:
        root = Path(directory)
        for suffix in SUFFIXES:
            key = prefix + suffix
            data, sidecar = root / ("data" + suffix), root / ("sum" + suffix)
            for remote, local in ((key, data), (key + ".sha256", sidecar)):
                checked_aws(["aws", "s3api", "get-object", "--bucket", bucket, "--key", remote, "--endpoint-url", endpoint, str(local)], env)
            expected = sidecar.read_text(encoding="ascii")
            if not re.fullmatch(r"[a-f0-9]{64}\n", expected) or hashlib.sha256(data.read_bytes()).hexdigest() + "\n" != expected:
                raise RetentionError("R2 object checksum failed; refusing cleanup")


def require_recent_success(prefix: str) -> None:
    UPLOAD.require_root_file(STATUS, 0o600)
    report = STATUS.read_text(encoding="ascii").strip().split()
    if len(report) != 3 or report[0] != "success" or report[1] != prefix:
        raise RetentionError("latest offsite upload is not recorded as successful; refusing cleanup")
    try:
        at = datetime.fromisoformat(report[2])
    except ValueError as error:
        raise RetentionError("offsite success marker is invalid; refusing cleanup") from error
    if at.tzinfo is None or datetime.now(timezone.utc) - at.astimezone(timezone.utc) > timedelta(hours=12):
        raise RetentionError("offsite success marker is stale; refusing cleanup")


def run(apply: bool = False) -> list[str]:
    if not hasattr(os, "geteuid") or os.geteuid() != 0:
        raise RetentionError("root is required")
    if apply and os.environ.get("COTUONG_R2_RETENTION_APPLY") != "1":
        raise RetentionError("deletion requires COTUONG_R2_RETENTION_APPLY=1 and explicit --apply")
    bucket, endpoint, _account, credentials, _token = UPLOAD.load_config()
    env = os.environ.copy()
    env.update({"AWS_SHARED_CREDENTIALS_FILE": str(credentials), "AWS_CONFIG_FILE": "/dev/null", "AWS_DEFAULT_REGION": "auto", "AWS_EC2_METADATA_DISABLED": "true", "AWS_PAGER": ""})
    groups = group_keys(list_keys(bucket, endpoint, env))
    newest, expired = retention_plan(groups, datetime.now(timezone.utc))
    require_recent_success(newest)
    for prefix in groups:
        verify_group(prefix, bucket, endpoint, env)
    print(f"RETENTION_NEWEST_PRESERVED {newest}")
    for prefix in expired:
        print(f"RETENTION_CANDIDATE {prefix}")
    if not apply:
        print("RETENTION_DRY_RUN=PASS no objects deleted")
        return expired
    for prefix in expired:
        for suffix in SUFFIXES:
            for key in (prefix + suffix, prefix + suffix + ".sha256"):
                checked_aws(["aws", "s3api", "delete-object", "--bucket", bucket, "--key", key, "--endpoint-url", endpoint], env)
    print(f"RETENTION_APPLIED sets={len(expired)} newest_preserved=true")
    return expired


def main(argv: list[str]) -> int:
    if len(argv) > 2 or (len(argv) == 2 and argv[1] != "--apply"):
        print("Usage: prune-test-r2-backups.py [--apply] (dry-run is the default)", file=sys.stderr)
        return 2
    try:
        run(apply=len(argv) == 2)
        return 0
    except (RetentionError, OSError, ValueError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
