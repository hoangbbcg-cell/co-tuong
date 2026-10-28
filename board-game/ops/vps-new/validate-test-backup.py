#!/usr/bin/env python3
"""Restore a test VPS dump into a fresh disposable schema and verify it."""

from __future__ import annotations

import gzip
import hashlib
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

BACKUP_DIR = Path("/var/backups/cotuong-stage")
SOURCE_SCHEMA = "cotuong_stage"
MYSQL = ["mysql", "--protocol=socket", "--user=root", "--batch", "--skip-column-names"]


def rewrite_dump_for_restore(sql: str, target_schema: str) -> str:
    """Retarget only mysqldump's database header; preserve all row data verbatim."""
    if not re.fullmatch(r"cotuong_restore_check_[0-9]{8}T[0-9]{6}Z_[0-9]+", target_schema):
        raise ValueError("invalid disposable schema name")
    create_pattern = re.compile(
        rf"^CREATE DATABASE /\*!32312 IF NOT EXISTS\*/ `{re.escape(SOURCE_SCHEMA)}`[^\n]*;$",
        re.MULTILINE,
    )
    use_pattern = re.compile(rf"^USE `{re.escape(SOURCE_SCHEMA)}`;$", re.MULTILINE)
    if len(create_pattern.findall(sql)) != 1 or len(use_pattern.findall(sql)) != 1:
        raise ValueError("backup must contain one canonical cotuong_stage mysqldump header")
    if re.search(r"^\s*(?:DROP DATABASE|CREATE DATABASE|USE)\b", sql, re.MULTILINE):
        without_create = create_pattern.sub("", sql)
        without_use = use_pattern.sub("", without_create)
        if re.search(r"^\s*(?:DROP DATABASE|CREATE DATABASE|USE)\b", without_use, re.MULTILINE):
            raise ValueError("backup contains an unexpected database directive")
    sql = create_pattern.sub("", sql)
    return use_pattern.sub(f"USE `{target_schema}`;", sql)


def mysql(*args: str, input_sql: str | None = None) -> str:
    result = subprocess.run(
        [*MYSQL, *args], input=input_sql, text=True, capture_output=True, check=True
    )
    return result.stdout.strip()


def validate_backup(path: Path) -> None:
    if path.is_symlink() or not path.is_file() or path.parent != BACKUP_DIR:
        raise ValueError("backup must be a regular file directly inside the test backup directory")
    info = path.stat()
    if info.st_uid != 0 or info.st_mode & 0o777 != 0o600:
        raise ValueError("backup must be owned by root with mode 0600")
    checksum = path.with_name(path.name + ".sha256")
    if checksum.is_symlink() or not checksum.is_file():
        raise ValueError("backup checksum sidecar is missing or unsafe")
    checksum_info = checksum.stat()
    if checksum_info.st_uid != 0 or checksum_info.st_mode & 0o777 != 0o600:
        raise ValueError("backup checksum must be owned by root with mode 0600")
    checksum_text = checksum.read_text(encoding="ascii")
    expected = re.fullmatch(rf"([a-f0-9]{{64}})  {re.escape(path.name)}\n", checksum_text)
    if not expected:
        raise ValueError("backup checksum sidecar has an unexpected format")
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    if digest.hexdigest() != expected.group(1):
        raise ValueError("backup checksum does not match")
    with gzip.open(path, "rt", encoding="utf-8") as source:
        sql = source.read()

    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    target = f"cotuong_restore_check_{stamp}_{os.getpid()}"
    if mysql("-e", f"SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='{target}'"):
        raise ValueError("disposable restore schema unexpectedly already exists")
    created = False
    try:
        mysql("-e", f"CREATE DATABASE `{target}` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci")
        created = True
        restored_sql = rewrite_dump_for_restore(sql, target)
        mysql(input_sql=restored_sql)
        table_count = int(mysql("-e", f"SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='{target}'"))
        expected_tables = len(re.findall(r"^CREATE TABLE `", sql, re.MULTILINE))
        if table_count != expected_tables:
            raise ValueError("restored table count does not match the dump")
        if table_count == 0:
            return  # A fresh, pre-migration schema is a valid backup baseline.
        journal = mysql("-e", f"SELECT COUNT(*) FROM `{target}`.schema_migrations WHERE status <> 'applied'")
        total = mysql("-e", f"SELECT COUNT(*) FROM `{target}`.schema_migrations")
        if int(total) < 1 or int(journal) != 0:
            raise ValueError("restored migration journal is empty or incomplete")
    finally:
        if created:
            mysql("-e", f"DROP DATABASE `{target}`")


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print("Usage: validate-test-backup.py /var/backups/cotuong-stage/<timestamp>.sql.gz", file=sys.stderr)
        return 2
    try:
        path = Path(argv[1])
        validate_backup(path)
    except (OSError, gzip.BadGzipFile, subprocess.CalledProcessError, ValueError) as error:
        # MySQL stderr can contain query details; keep logs to a generic safe result.
        print(f"Test backup restore validation failed ({type(error).__name__}).", file=sys.stderr)
        return 1
    print("Test backup restored into a disposable schema; tables and applied migration journal verified, scratch schema removed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
