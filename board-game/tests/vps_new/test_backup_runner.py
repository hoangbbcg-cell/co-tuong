import importlib.util
import subprocess
import unittest
from pathlib import Path
from unittest.mock import patch


OPS = Path(__file__).parents[2] / "ops" / "vps-new"
SPEC = importlib.util.spec_from_file_location("run_test_backup", OPS / "run-test-backup.py")
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("backup runner module is unavailable")
RUNNER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(RUNNER)

STAMP = "2026-10-29T03-00-00Z"
SQL = f"Created compressed test database backup and SHA-256 sidecar: /var/backups/cotuong-stage/{STAMP}.sql.gz"
MEDIA = f"Created test media archive files=2 sha256={'a' * 64} path=/var/backups/cotuong-stage/{STAMP}.uploads.tar.gz"
OFFSITE = f"OFFSITE_VERIFIED prefix=cotuong-stage/20261029T030000Z-{'b' * 32} encryption=age database+media sha256=readback"


class BackupRunnerTests(unittest.TestCase):
    def call_runner(self, responses):
        with patch.object(RUNNER, "is_root", return_value=True), patch.object(RUNNER.subprocess, "run", side_effect=responses) as run:
            result = RUNNER.run()
        return result, run

    def test_reports_complete_only_after_matching_local_set_and_verified_readback(self):
        responses = [
            subprocess.CompletedProcess([], 0, SQL + "\n" + MEDIA + "\n", ""),
            subprocess.CompletedProcess([], 0, OFFSITE + "\n", ""),
        ]
        result, run = self.call_runner(responses)
        self.assertEqual(result, 0)
        self.assertEqual(run.call_count, 2)
        self.assertEqual(run.call_args_list[1].args[0], [str(RUNNER.R2_UPLOADER), str(Path(f"/var/backups/cotuong-stage/{STAMP}.sql.gz"))])

    def test_local_failure_does_not_upload_or_report_complete(self):
        responses = [subprocess.CompletedProcess([], 1, "", "secret-like stderr must not be forwarded")]
        with patch.object(RUNNER, "is_root", return_value=True), patch.object(RUNNER.subprocess, "run", side_effect=responses) as run:
            with self.assertRaisesRegex(RUNNER.BackupRunError, "local database/media backup failed"):
                RUNNER.run()
        self.assertEqual(run.call_count, 1)

    def test_offsite_failure_does_not_report_complete(self):
        responses = [
            subprocess.CompletedProcess([], 0, SQL + "\n" + MEDIA + "\n", ""),
            subprocess.CompletedProcess([], 1, "", "secret-like stderr must not be forwarded"),
        ]
        with self.assertRaisesRegex(RUNNER.BackupRunError, "offsite encryption/upload/readback verification failed"):
            self.call_runner(responses)

    def test_zero_exit_without_exact_verified_marker_is_failure(self):
        responses = [
            subprocess.CompletedProcess([], 0, SQL + "\n" + MEDIA + "\n", ""),
            subprocess.CompletedProcess([], 0, "upload completed\n", ""),
        ]
        with self.assertRaisesRegex(RUNNER.BackupRunError, "without its required verified-readback attestation"):
            self.call_runner(responses)

    def test_mismatched_local_media_marker_is_failure(self):
        wrong_media = MEDIA.replace(STAMP, "2026-10-29T03-01-00Z")
        responses = [subprocess.CompletedProcess([], 0, SQL + "\n" + wrong_media + "\n", "")]
        with self.assertRaisesRegex(RUNNER.BackupRunError, "matching verified database and media set"):
            self.call_runner(responses)


if __name__ == "__main__":
    unittest.main()
