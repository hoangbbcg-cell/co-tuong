import unittest
import os
import re
import subprocess
import tempfile
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
        self.assertIn("$TransportRelative = 'board-game/ops/vps-new/ssh-bash-command.ps1'", self.script)
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
        self.assertLess(self.script.index("$readOnlyPreflight = @'"), self.script.index("$confirmation = Read-Host"))
        self.assertLess(self.script.index("step='existing backup inventory'"), self.script.index("$confirmation = Read-Host"))
        self.assertLess(self.script.index("$confirmation = Read-Host"), self.script.index("$runBackup ="))
        self.assertLess(self.script.index("$runBackup ="), self.script.index("$runValidator ="))
        self.assertIn("schema_migrations", self.script)
        self.assertIn("SHOW GRANTS FOR", self.script)
        self.assertIn("/var/backups/cotuong-stage", self.script)
        self.assertIn("$BackupLogPath", self.script)
        self.assertIn("$backupPathMatch.Groups['path'].Value", self.script)
        self.assertNotIn("Paste the exact .sql.gz path", self.script)

    def test_database_preflight_uses_visible_interactive_sudo_and_safe_diagnostics(self) -> None:
        self.assertIn("$readOnlyPreflight = @'", self.script)
        self.assertIn("sudo -v", self.script)
        self.assertIn("sudo -n mysql --protocol=socket --user=root", self.script)
        self.assertIn("READ_ONLY_PREFLIGHT_FAILED step=%s exit=%s", self.script)
        self.assertIn("$remotePreflight = New-CotuongSshBashCommand", self.script)
        self.assertIn("ssh-bash-command.ps1", self.script)
        self.assertNotIn("$(printf", self.script)
        inspector = (SCRIPT.parent / "inspect-test-migration-state.ps1").read_text(encoding="utf-8")
        self.assertIn("New-CotuongSshBashCommand -Base64Script $transport", inspector)
        self.assertNotIn("$(printf", inspector)
        self.assertIn("@('-tt', '-i', $PrivateKey) + $sshOptions + @($Target, $remotePreflight)", self.script)
        self.assertIn("-FailureMessage 'Read-only VPS preflight failed; inspect the READ_ONLY_STEP diagnostic above'", self.script)
        self.assertNotIn("$dbLines = @(& ssh.exe", self.script)
        self.assertNotIn("$journalLines = @(& ssh.exe", self.script)

    @unittest.skipIf(os.name == "nt", "Bash syntax is checked in Linux CI; Windows runs the PowerShell 5.1 parser test.")
    def test_embedded_read_only_bash_preflight_has_valid_syntax(self) -> None:
        match = re.search(r"\$readOnlyPreflight = @'\r?\n(.*?)\r?\n'@", self.script, re.DOTALL)
        self.assertIsNotNone(match)
        with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", suffix=".sh") as probe:
            probe.write(match.group(1))
            probe.flush()
            subprocess.run(["bash", "-n", probe.name], check=True, capture_output=True, text=True)

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
