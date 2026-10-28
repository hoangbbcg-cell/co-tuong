#!/usr/bin/env python3
"""Fail-closed validator for the isolated VPS release archive."""

from __future__ import annotations

import posixpath
import re
import sys
import tarfile
from pathlib import PurePosixPath

REQUIRED_FILES = {
    "package.json",
    "server/index.ts",
    "dist/index.html",
    "node_modules/tsx/package.json",
}
UPLOADS_TARGET = "/srv/cotuong/shared/uploads"


def _normalized_name(name: str) -> str:
    if name.startswith("/") or "\\" in name:
        raise ValueError(f"unsafe archive path: {name!r}")
    normalized = posixpath.normpath(name)
    if normalized == ".." or normalized.startswith("../"):
        raise ValueError(f"archive path escapes release root: {name!r}")
    return normalized


def verify_archive(archive_path: str, expected_sha: str) -> None:
    if not re.fullmatch(r"[a-f0-9]{40}", expected_sha):
        raise ValueError("expected SHA must contain exactly 40 lowercase hexadecimal characters")

    seen: dict[str, tarfile.TarInfo] = {}
    with tarfile.open(archive_path, "r:gz") as archive:
        for member in archive.getmembers():
            name = _normalized_name(member.name)
            if name in seen:
                raise ValueError(f"duplicate archive path: {name!r}")
            seen[name] = member

            parts = PurePosixPath(name).parts
            if any(
                (part.startswith(".env") and part != ".env.example")
                or part.startswith(".admin-access")
                for part in parts
            ):
                raise ValueError(f"credential file is forbidden in release: {name!r}")

            if member.isdir():
                if not member.mode & 0o010:
                    raise ValueError(f"runtime group cannot traverse release directory: {name!r}")
                if member.mode & 0o022:
                    raise ValueError(f"group/world-writable release directory: {name!r}")
            elif member.isfile():
                if not member.mode & 0o040:
                    raise ValueError(f"runtime group cannot read release file: {name!r}")
                if member.mode & 0o022:
                    raise ValueError(f"group/world-writable release file: {name!r}")
            elif member.issym():
                if name != "uploads" or member.linkname != UPLOADS_TARGET:
                    raise ValueError(f"unexpected release symlink: {name!r} -> {member.linkname!r}")
            else:
                raise ValueError(f"unsupported archive entry type: {name!r}")

    missing = sorted(
        path for path in REQUIRED_FILES if path not in seen or not seen[path].isfile()
    )
    if missing:
        raise ValueError(f"release is missing required regular files: {', '.join(missing)}")
    if "uploads" not in seen or not seen["uploads"].issym():
        raise ValueError("release must contain the shared uploads symlink")
    if "." not in seen or not seen["."].isdir() or seen["."].mode & 0o2777 != 0o2750:
        raise ValueError("release root must be a non-writable 2750 directory")


def main(argv: list[str]) -> int:
    if len(argv) != 3:
        print("Usage: verify-test-release.py <archive.tar.gz> <full-commit-sha>", file=sys.stderr)
        return 2
    try:
        verify_archive(argv[1], argv[2])
    except (OSError, tarfile.TarError, ValueError) as error:
        print(f"release validation failed: {error}", file=sys.stderr)
        return 1
    print("Release archive layout, symlinks, permissions, and credential exclusions are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
