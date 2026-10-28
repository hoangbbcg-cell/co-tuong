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


if __name__ == "__main__":
    unittest.main()
