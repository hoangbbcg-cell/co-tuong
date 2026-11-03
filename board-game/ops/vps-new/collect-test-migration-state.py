#!/usr/bin/env python3
"""Read only test schema metadata; never read application rows or environment contents."""
from __future__ import annotations

import base64
import json
import os
import stat
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


def query(sql: str) -> list[list[str]]:
    if not sql.startswith(("SELECT ", "SHOW GRANTS ")) or ";" in sql:
        raise ValueError("Only metadata queries are permitted")
    result = subprocess.run(
        ["mysql", "--protocol=socket", "--user=root", "--batch", "--raw", "--skip-column-names", "--execute", sql],
        check=True, capture_output=True, text=True, timeout=15,
    )
    return [line.split("\t") for line in result.stdout.splitlines() if line]


def protected_metadata(path: str) -> dict[str, object]:
    import grp
    info = Path(path).lstat()
    return {"path": path, "regular": stat.S_ISREG(info.st_mode), "uid": info.st_uid,
            "group": grp.getgrgid(info.st_gid).gr_name, "mode": format(stat.S_IMODE(info.st_mode), "04o")}


def collect() -> dict[str, object]:
    schemas = query("SELECT DEFAULT_COLLATION_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='cotuong_stage'")
    if len(schemas) != 1:
        raise ValueError("Expected exactly one cotuong_stage schema")
    tables = query("SELECT TABLE_NAME,ENGINE,TABLE_COLLATION FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='cotuong_stage' ORDER BY TABLE_NAME")
    journal_exists = any(row[0] == "schema_migrations" for row in tables)
    journal = query("SELECT version,checksum,status FROM cotuong_stage.schema_migrations ORDER BY version") if journal_exists else []
    return {
        "format": 1, "host": "103.153.254.184", "schema": "cotuong_stage",
        "collectedAt": datetime.now(timezone.utc).isoformat(),
        "serverVersion": query("SELECT VERSION()")[0][0], "collation": schemas[0][0],
        "tableCount": len(tables), "tables": [{"name": r[0], "engine": r[1], "collation": r[2]} for r in tables],
        "journalExists": journal_exists,
        "journal": [{"version": r[0], "checksum": r[1], "status": r[2]} for r in journal],
        "grants": {user: [r[0] for r in query(f"SHOW GRANTS FOR '{user}'@'127.0.0.1'")]
                   for user in ("cotuong_app", "cotuong_migrator")},
        "environmentMetadata": [protected_metadata(p) for p in
            ("/etc/cotuong/cotuong.env", "/etc/cotuong/cotuong-migrator.env")],
    }


def main() -> int:
    try:
        if os.geteuid() != 0:
            raise ValueError("Run the read-only probe with interactive sudo")
        report = collect()
        payload = base64.b64encode(json.dumps(report, separators=(",", ":")).encode()).decode("ascii")
        print("COTUONG_MIGRATION_REPORT=" + payload)
        return 0
    except (OSError, ValueError, IndexError, subprocess.SubprocessError):
        # Driver stderr may contain SQL; do not forward it or environment contents.
        print("READ_ONLY_METADATA_FAILED: inspect MySQL socket access, metadata grants and protected file existence.", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
