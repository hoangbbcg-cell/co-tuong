import importlib.util
import gzip
import hashlib
import os
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

SCRIPT = Path(__file__).parents[2] / "ops" / "vps-new" / "validate-test-backup.py"
SPEC = importlib.util.spec_from_file_location("validate_test_backup", SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)
rewrite_dump_for_restore = MODULE.rewrite_dump_for_restore


class BackupRestoreValidationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.schema = "cotuong_restore_check_20261028T120000Z_1234"
        self.dump = """-- MySQL dump
CREATE DATABASE /*!32312 IF NOT EXISTS*/ `cotuong_stage` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `cotuong_stage`;
CREATE TABLE `schema_migrations` (`version` varchar(128));
INSERT INTO `schema_migrations` VALUES ('001');
"""

    def test_retargets_only_dump_header_and_preserves_data(self) -> None:
        result = rewrite_dump_for_restore(self.dump, self.schema)
        self.assertNotIn("CREATE DATABASE", result)
        self.assertIn(f"USE `{self.schema}`;", result)
        self.assertIn("VALUES ('001');", result)

    def test_rejects_noncanonical_or_additional_database_directives(self) -> None:
        with self.assertRaisesRegex(ValueError, "canonical"):
            rewrite_dump_for_restore(self.dump.replace("USE `cotuong_stage`;", "USE `other`;"), self.schema)

        unsafe = self.dump.replace("INSERT INTO", "USE `production`;\nINSERT INTO")
        with self.assertRaisesRegex(ValueError, "unexpected database directive"):
            rewrite_dump_for_restore(unsafe, self.schema)

    def test_rejects_untrusted_target_identifier(self) -> None:
        with self.assertRaisesRegex(ValueError, "invalid disposable schema"):
            rewrite_dump_for_restore(self.dump, "production")

    def test_restore_validation_uses_unique_scratch_schema_and_drops_it(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            backup_dir = Path(directory)
            backup = backup_dir / "2026-10-28T12-00-00Z.sql.gz"
            with gzip.open(backup, "wt", encoding="utf-8") as stream:
                stream.write(self.dump)
            os.chmod(backup, 0o600)
            checksum = backup.with_name(backup.name + ".sha256")
            digest = hashlib.sha256(backup.read_bytes()).hexdigest()
            checksum.write_text(digest + "  " + backup.name + "\n", encoding="ascii")
            os.chmod(checksum, 0o600)
            answers = iter(("", "", "", "1", "0", "12", ""))
            calls: list[tuple[tuple[str, ...], str | None]] = []

            def fake_mysql(*args: str, input_sql: str | None = None) -> str:
                calls.append((args, input_sql))
                return next(answers)

            stat_info = SimpleNamespace(st_uid=0, st_mode=0o100600)
            with patch.object(MODULE, "BACKUP_DIR", backup_dir), \
                 patch.object(MODULE.Path, "stat", return_value=stat_info), \
                 patch.object(MODULE, "mysql", side_effect=fake_mysql):
                MODULE.validate_backup(backup)

            created = next(args[1] for args, _ in calls if args and args[0] == "-e" and "CREATE DATABASE" in args[1])
            scratch = created.split("`", 2)[1]
            self.assertRegex(scratch, r"^cotuong_restore_check_[0-9]{8}T[0-9]{6}Z_[0-9]+$")
            restored = next(sql for _, sql in calls if sql is not None)
            self.assertIn(f"USE `{scratch}`;", restored)
            self.assertTrue(any(args and args[0] == "-e" and f"DROP DATABASE `{scratch}`" in args[1] for args, _ in calls))

    def test_empty_bootstrap_schema_is_a_valid_restore_baseline(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            backup_dir = Path(directory)
            backup = backup_dir / "2026-10-28T12-00-00Z.sql.gz"
            empty_dump = "CREATE DATABASE /*!32312 IF NOT EXISTS*/ `cotuong_stage` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;\nUSE `cotuong_stage`;\n"
            with gzip.open(backup, "wt", encoding="utf-8") as stream:
                stream.write(empty_dump)
            os.chmod(backup, 0o600)
            checksum = backup.with_name(backup.name + ".sha256")
            checksum.write_text(hashlib.sha256(backup.read_bytes()).hexdigest() + "  " + backup.name + "\n", encoding="ascii")
            os.chmod(checksum, 0o600)
            answers = iter(("", "", "", "0", ""))
            calls: list[tuple[tuple[str, ...], str | None]] = []

            def fake_mysql(*args: str, input_sql: str | None = None) -> str:
                calls.append((args, input_sql))
                return next(answers)

            stat_info = SimpleNamespace(st_uid=0, st_mode=0o100600)
            with patch.object(MODULE, "BACKUP_DIR", backup_dir), \
                 patch.object(MODULE.Path, "stat", return_value=stat_info), \
                 patch.object(MODULE, "mysql", side_effect=fake_mysql):
                MODULE.validate_backup(backup)

            self.assertFalse(any(sql and "schema_migrations" in sql for _, sql in calls))
            self.assertTrue(any(args and "DROP DATABASE" in args[1] for args, _ in calls))


if __name__ == "__main__":
    unittest.main()
