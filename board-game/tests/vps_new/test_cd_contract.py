import unittest
from pathlib import Path


REPO = Path(__file__).parents[2]
OPS = REPO / "ops" / "vps-new"


class VpsTestCdContractTests(unittest.TestCase):
    def test_deploy_identity_never_traverses_protected_environment_directory(self) -> None:
        deploy_client = (OPS / "deploy-test-release.sh").read_text(encoding="utf-8")
        self.assertNotIn("/etc/cotuong", deploy_client)

    def test_activation_root_checks_environment_owner_and_mode(self) -> None:
        activator = (OPS / "cotuong-deploy-activate").read_text(encoding="utf-8")
        self.assertIn("readonly ENV_FILE='/etc/cotuong/cotuong.env'", activator)
        self.assertIn("root:cotuong", activator)
        self.assertIn('== 640', activator)

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
        self.assertIn("sudo -n -l /usr/local/sbin/cotuong-deploy-activate", workflow)
        self.assertIn("systemctl is-active --quiet cotuong-test.service", workflow)
        self.assertNotIn("sudo -n /usr/local/sbin/cotuong-deploy-activate ", workflow)
        self.assertNotIn("scp ", workflow)
        self.assertNotIn("systemctl start", workflow)
        self.assertNotIn("systemctl restart", workflow)


if __name__ == "__main__":
    unittest.main()
