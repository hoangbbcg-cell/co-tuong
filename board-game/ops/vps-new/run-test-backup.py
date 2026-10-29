#!/usr/bin/env python3
"""Run the local test backup and require verified offsite readback before success."""

from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path

LOCAL_BACKUP = Path("/usr/local/sbin/cotuong-local-backup")
R2_UPLOADER = Path("/usr/local/sbin/cotuong-upload-test-backup-r2.py")
BACKUP_DIR = Path("/var/backups/cotuong-stage")
BACKUP_DIR_TEXT = "/var/backups/cotuong-stage"
STAMP = r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}-[0-9]{2}-[0-9]{2}Z"
SQL_MARKER = re.compile(rf"Created compressed test database backup and SHA-256 sidecar: (?P<path>{re.escape(BACKUP_DIR_TEXT)}/(?P<stamp>{STAMP})\.sql\.gz)")
MEDIA_MARKER = re.compile(rf"Created test media archive files=[0-9]+ sha256=[a-f0-9]{{64}} path={re.escape(BACKUP_DIR_TEXT)}/(?P<stamp>{STAMP})\.uploads\.tar\.gz")
OFFSITE_MARKER = re.compile(r"OFFSITE_VERIFIED prefix=(?P<prefix>cotuong-stage/[0-9]{8}T[0-9]{6}Z-[0-9a-f]{32}) encryption=age database\+media sha256=readback")


class BackupRunError(RuntimeError):
    pass


def is_root() -> bool:
    return hasattr(os, "geteuid") and os.geteuid() == 0


def run() -> int:
    if not is_root():
        raise BackupRunError("root is required")
    try:
        local = subprocess.run([str(LOCAL_BACKUP)], check=False, capture_output=True, text=True)
    except OSError as error:
        raise BackupRunError("local database/media backup could not start") from error
    if local.returncode != 0:
        raise BackupRunError("local database/media backup failed; preserve its files and inspect the journal")

    lines = local.stdout.splitlines()
    sql_matches = [match for line in lines if (match := SQL_MARKER.fullmatch(line))]
    media_matches = [match for line in lines if (match := MEDIA_MARKER.fullmatch(line))]
    if len(sql_matches) != 1 or len(media_matches) != 1 or sql_matches[0].group("stamp") != media_matches[0].group("stamp"):
        raise BackupRunError("local backup did not emit one matching verified database and media set")
    sql_path = Path(sql_matches[0].group("path"))
    try:
        offsite = subprocess.run([str(R2_UPLOADER), str(sql_path)], check=False, capture_output=True, text=True)
    except OSError as error:
        raise BackupRunError("R2 verification helper could not start; local files were preserved") from error
    if offsite.returncode != 0:
        raise BackupRunError("offsite encryption/upload/readback verification failed; local files were preserved")

    offsite_lines = offsite.stdout.splitlines()
    verified = [match for line in offsite_lines if (match := OFFSITE_MARKER.fullmatch(line))]
    if len(offsite_lines) != 1 or len(verified) != 1:
        raise BackupRunError("R2 helper exited successfully without its required verified-readback attestation")

    print(f"LOCAL_BACKUP_VERIFIED stamp={sql_matches[0].group('stamp')} database+media sha256=checked")
    print(offsite_lines[0])
    print(f"BACKUP_COMPLETE=PASS stamp={sql_matches[0].group('stamp')} offsite={verified[0].group('prefix')}")
    return 0


def main() -> int:
    try:
        return run()
    except BackupRunError as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
