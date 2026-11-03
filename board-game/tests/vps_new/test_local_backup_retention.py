from __future__ import annotations

import importlib.util
import os
import tempfile
import unittest
from types import SimpleNamespace
from datetime import datetime, timezone
from pathlib import Path
from unittest.mock import patch


OPS = Path(__file__).parents[2] / "ops" / "vps-new"
SPEC = importlib.util.spec_from_file_location("prune_test_local_backups", OPS / "prune-test-local-backups.py")
assert SPEC and SPEC.loader
RETENTION = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(RETENTION)


class LocalBackupRetentionTests(unittest.TestCase):
    def test_plan_only_expires_old_complete_sets_and_preserves_newest(self) -> None:
        old = "2026-08-01T00-00-00Z"
        recent = "2026-10-15T00-00-00Z"
        newest = "2026-10-28T09-00-35Z"
        groups = {stamp: {stamp + ".fixture"} for stamp in (old, recent, newest)}
        now = datetime(2026, 10, 29, tzinfo=timezone.utc)
        with patch.object(RETENTION, "backup_groups", return_value=groups), patch.object(RETENTION, "verify_backup_set") as verify, patch.object(RETENTION, "verified_offsite_source_stamp", return_value=newest):
            preserved, expired = RETENTION.cleanup_plan(now)
        self.assertEqual(preserved, newest)
        self.assertEqual(expired, [old])
        self.assertEqual(verify.call_count, 3)

    def test_plan_fails_closed_if_newest_local_set_was_not_uploaded(self) -> None:
        newest = "2026-10-28T09-00-35Z"
        groups = {newest: {newest + ".fixture"}}
        with patch.object(RETENTION, "backup_groups", return_value=groups), patch.object(RETENTION, "verify_backup_set"), patch.object(RETENTION, "verified_offsite_source_stamp", return_value="2026-10-27T00-00-00Z"):
            with self.assertRaisesRegex(RETENTION.LocalRetentionError, "not the source"):
                RETENTION.cleanup_plan(datetime(2026, 10, 29, tzinfo=timezone.utc))

    def test_dry_run_never_unlinks_and_apply_requires_explicit_second_gate(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            lock = root / ".backup.lock"
            expired = ["2026-08-01T00-00-00Z"]
            fake_lock_stat = type("Stat", (), {"st_mode": RETENTION.stat.S_IFREG | 0o600, "st_uid": 0})()
            fake_fcntl = SimpleNamespace(LOCK_EX=1, LOCK_NB=2, flock=lambda *_args: None)
            with patch.object(RETENTION, "fcntl", fake_fcntl), patch.object(RETENTION, "BACKUP_DIR", root), patch.object(RETENTION, "LOCK_FILE", lock), patch.object(RETENTION.os, "geteuid", return_value=0, create=True), patch.object(RETENTION.os, "fstat", return_value=fake_lock_stat), patch.object(RETENTION, "cleanup_plan", return_value=("2026-10-28T09-00-35Z", expired)), patch.object(Path, "unlink") as unlink:
                self.assertEqual(RETENTION.run(), expired)
                unlink.assert_not_called()
                with patch.dict(os.environ, {}, clear=False):
                    os.environ.pop("COTUONG_LOCAL_RETENTION_APPLY", None)
                    with self.assertRaisesRegex(RETENTION.LocalRetentionError, "explicit --apply"):
                        RETENTION.run(apply=True)
            unlink.assert_not_called()


if __name__ == "__main__":
    unittest.main()
