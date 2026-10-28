import re
import unittest
from pathlib import Path


REPO = Path(__file__).parents[2]
OPS = REPO / "ops" / "vps-new"


class VpsTestCdContractTests(unittest.TestCase):
    def test_test_backup_has_checksum_and_restore_drill_is_scratch_only(self) -> None:
        backup = (OPS / "cotuong-local-backup").read_text(encoding="utf-8")
        validator = (OPS / "validate-test-backup.py").read_text(encoding="utf-8")
        self.assertIn("readonly DB='cotuong_stage'", backup)
        self.assertIn('sha256sum "$(basename -- "$OUT")"', backup)
        self.assertIn('chmod 0600 "$SUM_TMP"', backup)
        self.assertIn('SOURCE_SCHEMA = "cotuong_stage"', validator)
        self.assertIn('f"cotuong_restore_check_{stamp}_{os.getpid()}"', validator)
        self.assertIn('DROP DATABASE `{target}`', validator)
        self.assertNotIn('DROP DATABASE `cotuong_stage`', validator)
        self.assertIn("restore_validation_uses_unique_scratch_schema_and_drops_it", (REPO / "tests" / "vps_new" / "test_backup_restore.py").read_text(encoding="utf-8"))

    def test_deploy_identity_never_traverses_protected_environment_directory(self) -> None:
        deploy_client = (OPS / "deploy-test-release.sh").read_text(encoding="utf-8")
        self.assertNotIn("/etc/cotuong", deploy_client)
        self.assertNotIn("test -x /usr/local/sbin/cotuong-deploy-activate", deploy_client)
        self.assertIn("stat -c %U:%G:%a /usr/local/sbin/cotuong-deploy-activate", deploy_client)
        self.assertIn('(cd "$ARTIFACT_DIR" && sha256sum -c "$SHA.tar.gz.sha256")', deploy_client)

    def test_first_release_can_be_staged_without_activation_then_activated_separately(self) -> None:
        deploy_client = (OPS / "deploy-test-release.sh").read_text(encoding="utf-8")
        stage_exit = deploy_client.index("if [[ \"$MODE\" == stage ]]; then")
        pending_activation = deploy_client.index('readonly PENDING_TMP=')
        self.assertLess(stage_exit, pending_activation)
        self.assertIn("Staged verified release", deploy_client)
        self.assertIn('readonly MODE="${5:-deploy}"', deploy_client)
        self.assertIn('install -d -m 0700 \'$REMOTE\'', deploy_client)
        self.assertIn('if [[ "$MODE" == activate ]]; then', deploy_client)
        workflow = (REPO.parent / ".github" / "workflows" / "vps-test-deploy.yml").read_text(encoding="utf-8")
        self.assertIn("operation:", workflow)
        self.assertIn("default: stage", workflow)
        self.assertIn("- stage", workflow)
        self.assertIn("- activate", workflow)
        self.assertIn("- deploy", workflow)
        self.assertIn('DEPLOY_MODE: ${{ inputs.operation }}', workflow)
        self.assertIn('"$RUN_ATTEMPT" "$DEPLOY_MODE"', workflow)

    def test_activation_root_checks_environment_owner_and_mode(self) -> None:
        activator = (OPS / "cotuong-deploy-activate").read_text(encoding="utf-8")
        self.assertIn("readonly ENV_FILE='/etc/cotuong/cotuong.env'", activator)
        self.assertIn("root:cotuong", activator)
        self.assertIn('== 640', activator)
        self.assertIn(".cotuong-release-sha", activator)

    def test_systemd_unit_can_be_enabled_before_first_release_without_starting(self) -> None:
        admin = (OPS / "cotuong-vps-admin").read_text(encoding="utf-8")
        action = admin.split("action_install_app_unit() {", 1)[1].split("\naction_install_nginx_site() {", 1)[0]
        self.assertIn('if [[ -e "$APP_ROOT/current" || -L "$APP_ROOT/current" ]]; then', action)
        self.assertIn("systemctl enable cotuong-test.service", action)
        self.assertNotIn("systemctl start", action)
        self.assertNotIn("systemctl restart", action)

    def test_first_boot_setup_uses_least_privilege_and_does_not_deploy(self) -> None:
        setup = (OPS / "prepare-test-vps-first-boot.sh").read_text(encoding="utf-8")
        wrapper = (OPS / "prepare-test-vps-first-boot.ps1").read_text(encoding="utf-8")
        self.assertIn("GRANT SELECT, INSERT, UPDATE, DELETE ON cotuong_stage.* TO 'cotuong_app'", setup)
        self.assertIn("GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, REFERENCES ON cotuong_stage.* TO 'cotuong_migrator'", setup)
        self.assertNotIn("DROP", setup.upper())
        self.assertNotIn("db:migrate", setup)
        self.assertNotIn("systemctl start", setup)
        self.assertNotIn("systemctl restart", setup)
        self.assertNotIn("nginx enable", setup)
        self.assertIn("StrictHostKeyChecking yes", wrapper)
        self.assertIn("$sshOptions = @('-F', $sshConfigPath)", wrapper)
        self.assertIn("UserKnownHostsFile \"{0}\"", wrapper)
        self.assertIn("@('-i', $PrivateKey) + $sshOptions", wrapper)
        self.assertIn("if ($Preflight)", wrapper)
        self.assertIn("Read-only SCP preflight", wrapper)
        self.assertIn("bash -c ''test -r \"$1\" && cat -- \"$1\"'' _ ''/etc/hostname''", wrapper)
        self.assertIn('$remoteManifest = "$remoteDir/.sha256"', wrapper)
        self.assertIn('$remoteBash = "$remoteDir/prepare-test-vps-first-boot.sh"', wrapper)
        self.assertNotIn('Join-Path $remoteDir', wrapper)
        self.assertIn("finally {", wrapper)
        self.assertIn("cotuong-vps-setup-[a-f0-9]{32}", wrapper)
        self.assertIn("-tt", wrapper)
        self.assertIn("-Recurse -Force -Confirm:$false", wrapper)
        self.assertNotIn("UserKnownHostsFile=\"", wrapper)

    def test_first_boot_bundle_modes_are_secured_before_root_execution(self) -> None:
        wrapper = (OPS / "prepare-test-vps-first-boot.ps1").read_text(encoding="utf-8")
        setup = (OPS / "prepare-test-vps-first-boot.sh").read_text(encoding="utf-8")
        self.assertIn("$remoteBundleNames = @('prepare-test-vps-first-boot.sh', 'cotuong-vps-admin', 'cotuong-deploy-activate', 'cotuong.service', '.sha256')", wrapper)
        self.assertIn("chmod 0600 -- '$remoteFile'", wrapper)
        self.assertIn("nhat_hoang:nhat_hoang", wrapper)
        self.assertLess(wrapper.index("Checksum manifest SCP failed"), wrapper.index("Could not secure uploaded bundle permissions"))
        self.assertLess(wrapper.index("Could not secure uploaded bundle permissions"), wrapper.index("Remote checksum or Bash syntax check failed"))
        self.assertLess(wrapper.index("Remote checksum or Bash syntax check failed"), wrapper.index("VPS first-boot preparation failed"))
        self.assertIn("for file in prepare-test-vps-first-boot.sh cotuong-vps-admin cotuong-deploy-activate cotuong.service .sha256; do", setup)
        self.assertIn("-perm /022", setup)
        self.assertIn("group/world writable bundle file", setup)

    def test_manual_vps_preflight_is_environment_gated_and_read_only(self) -> None:
        workflow_path = REPO.parent / ".github" / "workflows" / "vps-test-preflight.yml"
        workflow = workflow_path.read_text(encoding="utf-8")
        self.assertIn("workflow_dispatch:", workflow)
        self.assertIn("environment:\n      name: vps-test", workflow)
        self.assertIn(".can_admins_bypass == false", workflow)
        self.assertIn('any(.reviewers[]?; .reviewer.login == "hoangbbcg-cell")', workflow)
        self.assertIn("[.branch_policies[].name] == [\"master\"]", workflow)
        self.assertIn("StrictHostKeyChecking=yes", workflow)
        self.assertIn("SHA256:CJzV7hFpB6mDfGDoBm/ViJvw5D5HlBhR60gmOJGLW74", workflow)
        self.assertIn("VPS_TEST_SSH_KEY is not a readable OpenSSH private key.", workflow)
        self.assertIn("Read-only VPS preflight failed: %s\\n", workflow)
        self.assertIn("Restricted sudo allowance for the activation helper is missing.", workflow)
        self.assertIn("SSH/read-only VPS preflight failed with exit code %s", workflow)
        self.assertNotIn("set -x", workflow)
        self.assertIn("if [[ -r /etc/cotuong/cotuong.env ]]; then", workflow)
        self.assertIn("stat -c %U:%G:%a /usr/local/sbin/cotuong-deploy-activate", workflow)
        self.assertNotIn("test -x /usr/local/sbin/cotuong-deploy-activate", workflow)
        self.assertIn("intentionally root:root 0750", workflow)
        self.assertIn("sudo -n -l /usr/local/sbin/cotuong-deploy-activate", workflow)
        self.assertIn("systemctl is-active --quiet cotuong-test.service", workflow)
        self.assertNotIn("sudo -n /usr/local/sbin/cotuong-deploy-activate ", workflow)
        self.assertNotIn("scp ", workflow)
        self.assertNotIn("systemctl start", workflow)
        self.assertNotIn("systemctl restart", workflow)


    def test_deploy_migration_instructions_match_registered_set(self) -> None:
        migration_source = (REPO / "server" / "repositories" / "migrationRepository.ts").read_text(encoding="utf-8")
        docs = (OPS / "CI-CD.md").read_text(encoding="utf-8")
        registered = re.findall(r"'([0-9]{3})_[^']+[.]sql'", migration_source.split("export const migrationFiles", 1)[1].split(" as const", 1)[0])
        self.assertTrue(registered)
        self.assertIn("migration set currently registered", docs)
        self.assertIn("migrationRepository.ts", docs)
        tick = chr(96)
        self.assertIn(f"{tick}{registered[0]}{tick}–{tick}{registered[-1]}{tick}", docs)
        self.assertNotIn(f"{tick}001{tick}–{tick}012{tick}", docs)
        readme = (OPS / "README.md").read_text(encoding="utf-8")
        self.assertNotIn(f"{tick}001{tick}–{tick}012{tick}", readme)
        self.assertIn(f"{tick}{registered[0]}{tick}–{tick}{registered[-1]}{tick}", readme)

    def test_r2_offsite_backup_is_encrypted_retained_and_verifies_remote_readback(self) -> None:
        helper = (OPS / "upload-test-backup-r2.py").read_text(encoding="utf-8")
        verifier = (OPS / "verify-offsite-test-backup.py").read_text(encoding="utf-8")
        local_unit = (OPS / "cotuong-backup.service").read_text(encoding="utf-8")
        offsite_unit = (OPS / "cotuong-offsite-backup.service").read_text(encoding="utf-8")
        self.assertIn('"age", "--encrypt"', helper)
        self.assertIn('"--if-none-match", "*"', helper)
        self.assertIn("MIN_LOCK_SECONDS = 35", helper)
        self.assertIn("MIN_RETENTION_DAYS = 90", helper)
        self.assertIn("sha256_file(downloaded) != expected", helper)
        self.assertIn("OFFSITE_DECRYPTION_VERIFIED", verifier)
        self.assertIn("age", verifier)
        self.assertIn("OnSuccess=cotuong-offsite-backup.service", local_unit)
        self.assertIn("ConditionPathExists=/etc/cotuong/offsite-backup.conf", offsite_unit)
        self.assertNotIn("age1", offsite_unit)

    def test_backup_installer_preserves_existing_verified_directory_and_requires_cloud_config(self) -> None:
        admin = (OPS / "cotuong-vps-admin").read_text(encoding="utf-8")
        action = admin.split("action_install_backup() {", 1)[1].split("\n}", 1)[0]
        self.assertIn("existing backup directory must be a real root:root mode-0700 directory", action)
        self.assertIn("if ((backup_dir_created)); then rmdir /var/backups/cotuong-stage", action)
        self.assertIn("/etc/cotuong/r2-credentials", action)
        self.assertIn("/etc/cotuong/r2-read-token", action)
        self.assertIn('"IfNoneMatch"', action)
        self.assertNotIn("rm -f /var/backups/cotuong-stage", action)
        self.assertGreater(action.index('systemd-analyze verify'), action.index('install -o root -g root -m 0700 "$offsite"'))
        self.assertLess(action.index('systemd-analyze verify'), action.index('systemctl enable --now'))
if __name__ == "__main__":
    unittest.main()
