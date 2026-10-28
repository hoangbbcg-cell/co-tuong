#!/usr/bin/env python3
"""Download, checksum, decrypt and gzip-verify one R2 test backup off-VPS."""

from __future__ import annotations

import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path


class VerificationError(RuntimeError):
    pass


def run_silent(args: list[str]) -> subprocess.CompletedProcess[str]:
    try:
        return subprocess.run(args, check=True, capture_output=True, text=True)
    except (OSError, subprocess.CalledProcessError) as error:
        raise VerificationError("R2 download or age verification failed") from error


def digest(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def verify(prefix: str, bucket: str, endpoint: str, identity: Path) -> str:
    if not re.fullmatch(r"cotuong-stage/[0-9]{8}T[0-9]{6}Z-[0-9a-f]{32}", prefix):
        raise VerificationError("R2 backup prefix is invalid")
    if not re.fullmatch(r"[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]", bucket):
        raise VerificationError("R2 bucket configuration is invalid")
    if not re.fullmatch(r"https://[a-f0-9]{32}\.r2\.cloudflarestorage\.com", endpoint):
        raise VerificationError("R2 endpoint configuration is invalid")
    if identity.is_symlink() or not identity.is_file():
        raise VerificationError("local age identity file is missing or unsafe")
    with tempfile.TemporaryDirectory(prefix="cotuong-r2-restore-check-") as directory:
        root = Path(directory)
        os.chmod(root, 0o700)
        encrypted_dump = root / "backup.sql.gz.age"
        dump_sidecar = root / "backup.sql.gz.age.sha256"
        encrypted_manifest = root / "manifest.json.age"
        manifest_sidecar = root / "manifest.json.age.sha256"
        downloads = (
            (prefix + ".sql.gz.age", encrypted_dump),
            (prefix + ".sql.gz.age.sha256", dump_sidecar),
            (prefix + ".manifest.age", encrypted_manifest),
            (prefix + ".manifest.age.sha256", manifest_sidecar),
        )
        for key, target in downloads:
            run_silent(["aws", "s3api", "get-object", "--bucket", bucket, "--key", key, "--endpoint-url", endpoint, str(target)])
        for data, sidecar in ((encrypted_dump, dump_sidecar), (encrypted_manifest, manifest_sidecar)):
            expected = sidecar.read_text(encoding="ascii").strip()
            if not re.fullmatch(r"[a-f0-9]{64}", expected) or digest(data) != expected:
                raise VerificationError("offsite encrypted object SHA-256 verification failed")
        dump = root / "backup.sql.gz"
        manifest = root / "manifest.json"
        run_silent(["age", "--decrypt", "--identity", str(identity), "--output", str(dump), str(encrypted_dump)])
        run_silent(["age", "--decrypt", "--identity", str(identity), "--output", str(manifest), str(encrypted_manifest)])
        try:
            contents = json.loads(manifest.read_text(encoding="utf-8"))
        except (OSError, ValueError) as error:
            raise VerificationError("decrypted offsite manifest is invalid") from error
        if not isinstance(contents, dict):
            raise VerificationError("decrypted offsite manifest is invalid")
        if contents.get("format") != 1 or contents.get("schema") != "cotuong_stage":
            raise VerificationError("decrypted offsite manifest is for an unexpected schema")
        if digest(encrypted_dump) != contents.get("encrypted_sha256"):
            raise VerificationError("manifest encrypted-object checksum does not match")
        source_digest = digest(dump)
        if source_digest != contents.get("source_sha256"):
            raise VerificationError("decrypted source checksum does not match the manifest")
        run_silent(["gzip", "-t", "--", str(dump)])
        return source_digest


def main(argv: list[str]) -> int:
    if len(argv) != 5:
        print("Usage: verify-offsite-test-backup.py <R2 prefix> <bucket> <endpoint> <local age identity file>", file=sys.stderr)
        return 2
    try:
        source_digest = verify(argv[1], argv[2], argv[3], Path(argv[4]))
    except (OSError, VerificationError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(f"OFFSITE_DECRYPTION_VERIFIED schema=cotuong_stage source_sha256={source_digest} gzip=OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
