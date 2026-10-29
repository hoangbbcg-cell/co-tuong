#!/usr/bin/env python3
"""Package and validate only the Co Tuong test application's uploaded media."""

from __future__ import annotations

import hashlib
import os
import re
import shutil
import stat
import sys
import tarfile
import uuid
from pathlib import Path, PurePosixPath

BACKUP_DIR = Path("/var/backups/cotuong-stage")
MEDIA_ROOT = Path("/srv/cotuong/shared/uploads")
MEDIA_DIRS = ("group-avatars", "message-images")
STAMP_RE = re.compile(r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}-[0-9]{2}-[0-9]{2}Z")
MEDIA_NAME_RE = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpg|png|webp|gif)")


class MediaBackupError(RuntimeError):
    pass


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def publish_exclusive(temporary: Path, destination: Path) -> None:
    """Publish without replacing a path, including on filesystems without hardlinks."""
    fd = os.open(destination, os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, "O_NOFOLLOW", 0), 0o600)
    created = os.fstat(fd)
    try:
        with os.fdopen(fd, "wb") as output, temporary.open("rb") as source:
            shutil.copyfileobj(source, output, 1024 * 1024)
            output.flush()
            os.fsync(output.fileno())
    except BaseException:
        try:
            current = destination.lstat()
            if (current.st_dev, current.st_ino) == (created.st_dev, created.st_ino):
                destination.unlink()
        except FileNotFoundError:
            pass
        raise


def validate_member_name(name: str) -> tuple[str, ...]:
    if name.startswith("/") or "\\" in name:
        raise MediaBackupError("media archive contains an unsafe path")
    raw_parts = name.split("/")
    if raw_parts and raw_parts[-1] == "":
        raw_parts.pop()
    if not raw_parts or any(part in ("", ".", "..") for part in raw_parts):
        raise MediaBackupError("media archive contains an unsafe path")
    pure = PurePosixPath(name)
    parts = pure.parts
    if pure.is_absolute() or tuple(raw_parts) != parts:
        raise MediaBackupError("media archive contains an unsafe path")
    if parts[0] not in MEDIA_DIRS or len(parts) > 2:
        raise MediaBackupError("media archive contains an unexpected path")
    if len(parts) == 2 and not MEDIA_NAME_RE.fullmatch(parts[1]):
        raise MediaBackupError("media archive contains an unexpected filename")
    return parts


def _source_entries(root: Path) -> list[tuple[Path, str, os.stat_result]]:
    if root.is_symlink() or not root.is_dir():
        raise MediaBackupError("application media root is missing or unsafe")
    entries: list[tuple[Path, str, os.stat_result]] = []
    for directory in MEDIA_DIRS:
        folder = root / directory
        if not folder.exists() and not folder.is_symlink():
            continue
        info = folder.lstat()
        if stat.S_ISLNK(info.st_mode) or not stat.S_ISDIR(info.st_mode):
            raise MediaBackupError("application media directory is unsafe")
        entries.append((folder, directory, info))
        for child in sorted(folder.iterdir(), key=lambda path: path.name):
            child_info = child.lstat()
            if stat.S_ISLNK(child_info.st_mode) or not stat.S_ISREG(child_info.st_mode):
                raise MediaBackupError("media source contains a symlink or non-regular file")
            if not MEDIA_NAME_RE.fullmatch(child.name) or (directory == "group-avatars" and not child.name.endswith(".jpg")):
                raise MediaBackupError("media source contains an unexpected file; refusing an incomplete package")
            entries.append((child, f"{directory}/{child.name}", child_info))
    return entries


def _safe_tar_info(name: str, info: os.stat_result, is_directory: bool) -> tarfile.TarInfo:
    item = tarfile.TarInfo(name + ("/" if is_directory else ""))
    item.type = tarfile.DIRTYPE if is_directory else tarfile.REGTYPE
    item.mode = 0o700 if is_directory else 0o600
    item.uid = 0
    item.gid = 0
    item.uname = ""
    item.gname = ""
    item.mtime = int(info.st_mtime)
    item.size = 0 if is_directory else info.st_size
    return item


def package_media(root: Path, destination: Path) -> tuple[str, int]:
    """Create a gzip tar with a strict path/type allowlist and no symlinks."""
    entries = _source_entries(root)
    if destination.exists() or destination.is_symlink():
        raise MediaBackupError("refusing to overwrite an existing media archive")
    temporary = destination.with_name("." + destination.name + ".tmp")
    if temporary.exists() or temporary.is_symlink():
        raise MediaBackupError("media archive temporary path already exists")
    fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, "O_NOFOLLOW", 0), 0o600)
    try:
        with os.fdopen(fd, "wb") as raw:
            with tarfile.open(fileobj=raw, mode="w:gz", compresslevel=6) as archive:
                for source, name, initial in entries:
                    is_directory = stat.S_ISDIR(initial.st_mode)
                    if is_directory:
                        archive.addfile(_safe_tar_info(name, initial, True))
                        continue
                    file_fd = os.open(source, os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0))
                    with os.fdopen(file_fd, "rb") as media:
                        opened = os.fstat(media.fileno())
                        if (opened.st_dev, opened.st_ino, opened.st_size, opened.st_mtime_ns) != (initial.st_dev, initial.st_ino, initial.st_size, initial.st_mtime_ns):
                            raise MediaBackupError("media changed while backup was starting")
                        archive.addfile(_safe_tar_info(name, opened, False), media)
                        after = os.fstat(media.fileno())
                        if (after.st_dev, after.st_ino, after.st_size, after.st_mtime_ns) != (opened.st_dev, opened.st_ino, opened.st_size, opened.st_mtime_ns):
                            raise MediaBackupError("media changed while it was being backed up")
            raw.flush()
            os.fsync(raw.fileno())
        os.chmod(temporary, 0o600)
        publish_exclusive(temporary, destination)
        temporary.unlink()
    except BaseException:
        try:
            temporary.unlink()
        except FileNotFoundError:
            pass
        raise
    return sha256_file(destination), sum(1 for _, _, info in entries if stat.S_ISREG(info.st_mode))


def inspect_archive(archive_path: Path) -> tuple[int, str]:
    if archive_path.is_symlink() or not archive_path.is_file():
        raise MediaBackupError("media archive is missing or unsafe")
    count = 0
    seen: set[str] = set()
    try:
        with tarfile.open(archive_path, mode="r:gz") as archive:
            for item in archive:
                name = item.name.rstrip("/")
                parts = validate_member_name(name)
                canonical = "/".join(parts)
                if canonical in seen:
                    raise MediaBackupError("media archive contains duplicate paths")
                seen.add(canonical)
                if len(parts) == 1:
                    if not item.isdir():
                        raise MediaBackupError("media archive directory entry has an unsafe type")
                elif not item.isreg():
                    raise MediaBackupError("media archive contains a link or non-regular member")
                else:
                    count += 1
                    if count > 100_000 or item.size < 0 or item.size > 10 * 1024 * 1024:
                        raise MediaBackupError("media archive exceeds the supported file count or size")
    except (tarfile.TarError, OSError) as error:
        raise MediaBackupError("media archive is invalid") from error
    if not set(MEDIA_DIRS).issubset(seen):
        raise MediaBackupError("media archive is missing a required directory")
    if archive_path.stat().st_size == 0:
        raise MediaBackupError("media archive is empty or invalid")
    return count, sha256_file(archive_path)


def extract_to_fresh_scratch(archive_path: Path, target: Path) -> tuple[int, str]:
    expected_count, digest = inspect_archive(archive_path)
    if target.exists() or target.is_symlink():
        raise MediaBackupError("refusing to use an existing media scratch directory")
    parent = target.parent
    if parent.is_symlink() or not parent.is_dir() or parent.resolve() != parent:
        raise MediaBackupError("media scratch parent is missing or unsafe")
    target.mkdir(mode=0o700)
    os.chmod(target, 0o700)
    try:
        with tarfile.open(archive_path, mode="r:gz") as archive:
            for item in archive:
                parts = validate_member_name(item.name.rstrip("/"))
                output = target.joinpath(*parts)
                if len(parts) == 1:
                    output.mkdir(mode=0o700, exist_ok=True)
                    continue
                source = archive.extractfile(item)
                if source is None:
                    raise MediaBackupError("media archive member could not be read")
                fd = os.open(output, os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, "O_NOFOLLOW", 0), 0o600)
                with os.fdopen(fd, "wb") as destination:
                    while chunk := source.read(1024 * 1024):
                        destination.write(chunk)
    except BaseException as error:
        # Keep this exact newly-created scratch directory for investigation; never remove caller data.
        raise MediaBackupError(f"media restore validation failed; scratch preserved at {target}") from error
    restored = [path for path in target.rglob("*") if path.is_file() and not path.is_symlink()]
    restored_count = len(restored)
    if restored_count != expected_count:
        raise MediaBackupError(f"media restore validation failed; scratch preserved at {target}")
    for path in restored:
        if path.stat().st_size > 10 * 1024 * 1024 or (os.name == "posix" and path.stat().st_mode & 0o077):
            raise MediaBackupError(f"media restore validation failed; scratch preserved at {target}")
    return restored_count, digest


def verify_local_archive(path: Path) -> tuple[int, str]:
    require_backup_directory()
    if path.parent != BACKUP_DIR or path.is_symlink() or not path.is_file() or not re.fullmatch(STAMP_RE.pattern + r"\.uploads\.tar\.gz", path.name):
        raise MediaBackupError("media archive must be a known backup file in the protected directory")
    info = path.stat()
    if info.st_uid != 0 or stat.S_IMODE(info.st_mode) != 0o600:
        raise MediaBackupError("media archive owner or mode is unsafe")
    sidecar = path.with_name(path.name + ".sha256")
    if sidecar.is_symlink() or not sidecar.is_file():
        raise MediaBackupError("media archive checksum sidecar is missing or unsafe")
    sum_info = sidecar.stat()
    if sum_info.st_uid != 0 or stat.S_IMODE(sum_info.st_mode) != 0o600:
        raise MediaBackupError("media checksum sidecar owner or mode is unsafe")
    expected = f"{sha256_file(path)}  {path.name}\n"
    if sidecar.read_text(encoding="ascii") != expected:
        raise MediaBackupError("media archive checksum does not match")
    return inspect_archive(path)


def require_backup_directory() -> None:
    if os.geteuid() != 0 or BACKUP_DIR.is_symlink() or not BACKUP_DIR.is_dir():
        raise MediaBackupError("root and a real local backup directory are required")
    info = BACKUP_DIR.stat()
    if info.st_uid != 0 or stat.S_IMODE(info.st_mode) != 0o700:
        raise MediaBackupError("local backup directory owner or mode is unsafe")


def package_cli(stamp: str) -> int:
    if not STAMP_RE.fullmatch(stamp):
        raise MediaBackupError("backup timestamp is invalid")
    require_backup_directory()
    destination = BACKUP_DIR / f"{stamp}.uploads.tar.gz"
    sidecar = destination.with_name(destination.name + ".sha256")
    temporary = sidecar.with_name("." + sidecar.name + ".tmp")
    if any(path.exists() or path.is_symlink() for path in (destination, sidecar, temporary)):
        raise MediaBackupError("media backup timestamp already exists; refusing to overwrite")
    digest, files = package_media(MEDIA_ROOT, destination)
    fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, "O_NOFOLLOW", 0), 0o600)
    try:
        with os.fdopen(fd, "w", encoding="ascii") as stream:
            stream.write(f"{digest}  {destination.name}\n")
            stream.flush()
            os.fsync(stream.fileno())
        publish_exclusive(temporary, sidecar)
    finally:
        try:
            temporary.unlink()
        except FileNotFoundError:
            pass
    os.chmod(destination, 0o600)
    os.chmod(sidecar, 0o600)
    print(f"Created test media archive files={files} sha256={digest} path={destination}")
    return 0


def main(argv: list[str]) -> int:
    try:
        if len(argv) == 3 and argv[1] == "--package":
            return package_cli(argv[2])
        if len(argv) == 3 and argv[1] == "--verify":
            count, digest = verify_local_archive(Path(argv[2]))
            print(f"MEDIA_ARCHIVE_VERIFIED files={count} sha256={digest}")
            return 0
        if len(argv) == 3 and argv[1] == "--inspect":
            count, digest = inspect_archive(Path(argv[2]))
            print(f"MEDIA_ARCHIVE_INSPECTED files={count} sha256={digest}")
            return 0
        if len(argv) == 3 and argv[1] == "--restore-validate":
            archive_path = Path(argv[2])
            verify_local_archive(archive_path)
            scratch_parent = Path("/var/tmp")
            scratch = scratch_parent / f"cotuong-media-restore-check-{uuid.uuid4().hex}"
            count, digest = extract_to_fresh_scratch(archive_path, scratch)
            print(f"MEDIA_RESTORE_VALIDATED files={count} sha256={digest} scratch={scratch}")
            return 0
        print("Usage: cotuong-media-backup.py --package <UTC timestamp> | --verify <archive> | --inspect <archive> | --restore-validate <archive>", file=sys.stderr)
        return 2
    except (MediaBackupError, OSError, ValueError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
