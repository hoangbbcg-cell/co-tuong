#!/usr/bin/env python3
"""Dry-run-first 30-day local cleanup for complete, verified test backups."""
from __future__ import annotations

import os
import re
import stat
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

try:
    import fcntl
except ImportError:  # pragma: no cover - VPS runs Linux; keeps module importable in Windows tests.
    fcntl = None

BACKUP_DIR = Path("/var/backups/cotuong-stage")
MEDIA_HELPER = Path("/usr/local/sbin/cotuong-media-backup.py")
LOCK_FILE = BACKUP_DIR / ".backup.lock"
STATUS = BACKUP_DIR / ".offsite-status"
RETENTION = timedelta(days=30)
STAMP_RE = re.compile(r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}-[0-9]{2}-[0-9]{2}Z")
BACKUP_RE = re.compile(r"(?P<stamp>[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}-[0-9]{2}-[0-9]{2}Z)(?P<kind>\.sql\.gz|\.uploads\.tar\.gz)(?P<sidecar>\.sha256)?")


class LocalRetentionError(RuntimeError):
    pass


def sha256_file(path: Path) -> str:
    import hashlib

    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def checked_run(args: list[str]) -> subprocess.CompletedProcess[str]:
    try:
        return subprocess.run(args, check=True, capture_output=True, text=True)
    except (OSError, subprocess.CalledProcessError) as error:
        raise LocalRetentionError("backup archive validation failed; refusing local cleanup") from error


def backup_groups() -> dict[str, set[str]]:
    if not hasattr(os, "geteuid") or os.geteuid() != 0:
        raise LocalRetentionError("root is required")
    if BACKUP_DIR.is_symlink() or not BACKUP_DIR.is_dir():
        raise LocalRetentionError("local backup directory is missing or unsafe")
    directory = BACKUP_DIR.stat()
    if directory.st_uid != 0 or stat.S_IMODE(directory.st_mode) != 0o700:
        raise LocalRetentionError("local backup directory owner or mode is unsafe")

    groups: dict[str, set[str]] = {}
    for path in BACKUP_DIR.iterdir():
        match = BACKUP_RE.fullmatch(path.name)
        if not match:
            continue  # Preserve status markers, locks, and unrelated files.
        groups.setdefault(match.group("stamp"), set()).add(path.name)
    expected = {
        stamp: {
            stamp + ".sql.gz", stamp + ".sql.gz.sha256",
            stamp + ".uploads.tar.gz", stamp + ".uploads.tar.gz.sha256",
        }
        for stamp in groups
    }
    if any(groups[stamp] != names for stamp, names in expected.items()):
        raise LocalRetentionError("an incomplete local backup set exists; refusing all cleanup")
    return groups


def verify_backup_set(stamp: str, names: set[str]) -> list[Path]:
    paths = [BACKUP_DIR / name for name in sorted(names)]
    for path in paths:
        if path.is_symlink() or not path.is_file():
            raise LocalRetentionError("a local backup set contains an unsafe path")
        info = path.stat()
        if info.st_uid != 0 or stat.S_IMODE(info.st_mode) != 0o600 or info.st_size == 0:
            raise LocalRetentionError("local backup file owner, mode, or size is invalid")

    for suffix in (".sql.gz", ".uploads.tar.gz"):
        archive = BACKUP_DIR / (stamp + suffix)
        sidecar = archive.with_name(archive.name + ".sha256")
        expected = f"{sha256_file(archive)}  {archive.name}\n"
        if sidecar.read_text(encoding="ascii") != expected:
            raise LocalRetentionError("local backup checksum mismatch; refusing all cleanup")
    checked_run(["gzip", "-t", "--", str(BACKUP_DIR / (stamp + ".sql.gz"))])
    media = checked_run(["python3", str(MEDIA_HELPER), "--verify", str(BACKUP_DIR / (stamp + ".uploads.tar.gz"))])
    if not re.fullmatch(r"MEDIA_ARCHIVE_VERIFIED files=[0-9]+ sha256=[a-f0-9]{64}\n?", media.stdout):
        raise LocalRetentionError("media archive structural verification failed; refusing all cleanup")
    return paths


def verified_offsite_source_stamp() -> str:
    if STATUS.is_symlink() or not STATUS.is_file():
        raise LocalRetentionError("successful offsite marker is missing or unsafe; refusing local cleanup")
    info = STATUS.stat()
    if info.st_uid != 0 or stat.S_IMODE(info.st_mode) != 0o600:
        raise LocalRetentionError("successful offsite marker owner or mode is unsafe")
    fields = STATUS.read_text(encoding="ascii").strip().split()
    if len(fields) != 4 or fields[0] != "success" or not re.fullmatch(r"cotuong-stage/[0-9]{8}T[0-9]{6}Z-[0-9a-f]{32}", fields[1]):
        raise LocalRetentionError("a current-format successful offsite marker is required")
    try:
        completed = datetime.fromisoformat(fields[2])
    except ValueError as error:
        raise LocalRetentionError("offsite success marker timestamp is invalid") from error
    now = datetime.now(timezone.utc)
    if completed.tzinfo is None or completed > now + timedelta(minutes=5) or now - completed.astimezone(timezone.utc) > timedelta(hours=12):
        raise LocalRetentionError("offsite success marker is stale or from the future")
    if not STAMP_RE.fullmatch(fields[3]):
        raise LocalRetentionError("offsite source backup timestamp is invalid")
    return fields[3]


def cleanup_plan(now: datetime) -> tuple[str, list[str]]:
    groups = backup_groups()
    if not groups:
        raise LocalRetentionError("no complete local backup sets exist; refusing cleanup")
    stamps = sorted(groups)
    newest = stamps[-1]

    # Validate every set before printing or applying any deletion plan.
    for stamp, names in groups.items():
        try:
            datetime.strptime(stamp, "%Y-%m-%dT%H-%M-%SZ")
        except ValueError as error:
            raise LocalRetentionError("local backup timestamp is invalid; refusing cleanup") from error
        verify_backup_set(stamp, names)

    if verified_offsite_source_stamp() != newest:
        raise LocalRetentionError("latest local backup is not the source of the recent verified offsite upload")

    expired = [stamp for stamp in stamps if stamp != newest and now - datetime.strptime(stamp, "%Y-%m-%dT%H-%M-%SZ").replace(tzinfo=timezone.utc) >= RETENTION]
    return newest, expired


def run(apply: bool = False) -> list[str]:
    if fcntl is None:
        raise LocalRetentionError("advisory backup locking is available only on Linux")
    if apply and os.environ.get("COTUONG_LOCAL_RETENTION_APPLY") != "1":
        raise LocalRetentionError("deletion requires COTUONG_LOCAL_RETENTION_APPLY=1 and explicit --apply")
    if LOCK_FILE.parent.is_symlink() or not LOCK_FILE.parent.is_dir():
        raise LocalRetentionError("system lock directory is missing or unsafe")
    lock_fd = os.open(LOCK_FILE, os.O_RDWR | os.O_CREAT | getattr(os, "O_NOFOLLOW", 0), 0o600)
    try:
        lock_info = os.fstat(lock_fd)
        if not stat.S_ISREG(lock_info.st_mode) or lock_info.st_uid != 0 or stat.S_IMODE(lock_info.st_mode) != 0o600:
            raise LocalRetentionError("backup lock file owner or mode is unsafe")
        try:
            fcntl.flock(lock_fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError as error:
            raise LocalRetentionError("a local backup is running; refusing cleanup") from error
        newest, expired = cleanup_plan(datetime.now(timezone.utc))
        print(f"LOCAL_RETENTION_NEWEST_PRESERVED {newest}")
        for stamp in expired:
            print(f"LOCAL_RETENTION_CANDIDATE {stamp}")
        if not apply:
            print("LOCAL_RETENTION_DRY_RUN=PASS no files deleted")
            return expired
        for stamp in expired:
            for suffix in (".sql.gz", ".sql.gz.sha256", ".uploads.tar.gz", ".uploads.tar.gz.sha256"):
                path = BACKUP_DIR / (stamp + suffix)
                info = path.lstat()
                if not stat.S_ISREG(info.st_mode) or info.st_uid != 0 or stat.S_IMODE(info.st_mode) != 0o600:
                    raise LocalRetentionError("backup set changed before deletion; stopped without deleting remaining files")
                path.unlink()
        print(f"LOCAL_RETENTION_APPLIED sets={len(expired)} newest_preserved=true")
        return expired
    finally:
        os.close(lock_fd)


def main(argv: list[str]) -> int:
    if len(argv) > 2 or (len(argv) == 2 and argv[1] != "--apply"):
        print("Usage: prune-test-local-backups.py [--apply] (dry-run is the default)", file=sys.stderr)
        return 2
    try:
        run(apply=len(argv) == 2)
        return 0
    except (LocalRetentionError, OSError, ValueError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
