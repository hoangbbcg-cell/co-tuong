import unittest
from pathlib import Path


REPO = Path(__file__).parents[2]
SCRIPT = REPO / "ops" / "vps-new" / "run-test-backup-restore-drill.ps1"


class BackupRestoreRunnerContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.script = SCRIPT.read_text(encoding="utf-8")

    def test_runner_requires_approved_master_and_pinned_host(self) -> None:
        self.assertIn("#requires -Version 5.1", self.script)
        self.assertIn("[string]$ApprovedMasterCommit", self.script)
        self.assertIn("fetch', 'origin', 'master", self.script)
        self.assertIn("refs/remotes/origin/master", self.script)
        self.assertIn("Local helper differs from approved master", self.script)
        self.assertIn("103.153.254.184", self.script)
        self.assertIn("SHA256:CJzV7hFpB6mDfGDoBm/ViJvw5D5HlBhR60gmOJGLW74", self.script)
        self.assertIn("StrictHostKeyChecking yes", self.script)
        self.assertIn("UserKnownHostsFile \"{0}\"", self.script)

    def test_upload_is_private_checked_before_backup_restore_and_prompted(self) -> None:
        self.assertIn("install -d -m 0700", self.script)
        self.assertIn("test ! -L", self.script)
        self.assertIn("stat -c %U:%G", self.script)
        self.assertIn("chmod 0600", self.script)
        self.assertIn("sha256sum --check --status .sha256", self.script)
        self.assertIn("Get-FileHash -LiteralPath $file -Algorithm SHA256", self.script)
        self.assertLess(self.script.index("$dbInspection ="), self.script.index("$confirmation = Read-Host"))
        self.assertLess(self.script.index("$backupStateCommand ="), self.script.index("$confirmation = Read-Host"))
        self.assertLess(self.script.index("$confirmation = Read-Host"), self.script.index("$runBackup ="))
        self.assertLess(self.script.index("$runBackup ="), self.script.index("$runValidator ="))
        self.assertIn("schema_migrations", self.script)
        self.assertIn("SHOW GRANTS FOR", self.script)
        self.assertIn("/var/backups/cotuong-stage", self.script)
        self.assertIn("$BackupLogPath", self.script)
        self.assertIn("$backupPathMatch.Groups['path'].Value", self.script)
        self.assertNotIn("Paste the exact .sql.gz path", self.script)

    def test_failure_preserves_backup_and_upload_for_inspection_and_never_migrates(self) -> None:
        self.assertIn("$DrillStarted -and -not $DrillCompleted", self.script)
        self.assertIn("Preserve this backup and sidecar for investigation", self.script)
        self.assertIn("The unique upload directory is retained for investigation", self.script)
        self.assertIn("rmdir -- '$RemoteDirectory'", self.script)
        self.assertNotIn("rm -rf", self.script)
        for forbidden in ("db:migrate", "systemctl start", "systemctl restart", "nginx", "hovanggame.com", "103.9.78.75"):
            with self.subTest(forbidden=forbidden):
                self.assertNotIn(forbidden, self.script)


if __name__ == "__main__":
    unittest.main()
