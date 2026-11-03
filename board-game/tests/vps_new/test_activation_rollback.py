import subprocess
import tempfile
import unittest
from pathlib import Path


REPO = Path(__file__).parents[2]
ACTIVATOR = REPO / "ops" / "vps-new" / "cotuong-deploy-activate"
SHA = "a" * 40
OLD_SHA = "b" * 40


class ActivationRollbackTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory(dir=REPO)
        self.root = Path(self.temp.name) / "srv" / "cotuong"
        self.releases = self.root / "releases"
        self.deploy = self.root / "deploy"
        self.env_file = Path(self.temp.name) / "etc" / "cotuong" / "cotuong.env"
        self.env_file.parent.mkdir(parents=True)
        self.env_file.write_text("DB_NAME=cotuong_stage\n", encoding="utf-8")
        self.mock_bin = Path(self.temp.name) / "mock-bin"
        self.mock_bin.mkdir()
        self.releases.mkdir(parents=True)
        self.deploy.mkdir()
        self.new_release = self._release(SHA)
        self.pending = self.deploy / "pending"
        self.pending.symlink_to(f"../releases/{SHA}")
        self.log = Path(self.temp.name) / "systemctl.log"
        self.script = Path(self.temp.name) / "cotuong-deploy-activate"

        source = ACTIVATOR.read_text(encoding="utf-8")
        source = source.replace("readonly ROOT='/srv/cotuong'", f"readonly ROOT='{self.root}'")
        source = source.replace("/etc/cotuong/cotuong.env", str(self.env_file))
        source = source.replace(
            "/run/lock/cotuong-deploy-activate.lock",
            f"{self.temp.name}/activate.lock",
        )
        source = source.replace(
            "export PATH=/usr/sbin:/usr/bin:/sbin:/bin",
            f"export PATH='{self.mock_bin}:/usr/sbin:/usr/bin:/sbin:/bin'",
        )
        self.script.write_text(source, encoding="utf-8")
        self.script.chmod(0o755)
        self._mock("ip", "printf '%s\\n' '2: eth0 inet 103.153.254.184/24 scope global eth0'\n")
        self._mock(
            "stat",
            """#!/bin/sh
format="$2"; path="$3"
[ "$path" = -- ] && path="$4"
case "$format:$path" in
  %U:%G:*cotuong.env) printf 'root:cotuong\\n' ;;
  %a:*cotuong.env) printf '%s\\n' "${MOCK_ENV_MODE:-640}" ;;
  %U:%G:*cotuong) printf 'root:root\\n' ;;
  %a:*cotuong) printf '755\\n' ;;
  %U:%G:*releases) printf 'cotuong_deploy:cotuong_release\\n' ;;
  %a:*releases) printf '2750\\n' ;;
  %U:%G:*deploy*) printf 'cotuong_deploy:cotuong_deploy\\n' ;;
  %a:*deploy) printf '700\\n' ;;
  %U:%G:*) printf 'cotuong_deploy:cotuong_release\\n' ;;
  *) exit 1 ;;
esac
""",
        )
        self._mock(
            "systemctl",
            """#!/bin/sh
case "$1" in
  restart) printf 'restart\\n' >> "$MOCK_SYSTEMCTL_LOG" ;;
  stop) printf 'stop\\n' >> "$MOCK_SYSTEMCTL_LOG" ;;
  is-active) exit 0 ;;
  *) exit 2 ;;
esac
""",
        )
        self._mock(
            "curl",
            """#!/bin/sh
test "${MOCK_HEALTH:-ok}" = ok
""",
        )
        self._mock("sleep", "exit 0\n")

    def tearDown(self) -> None:
        self.temp.cleanup()

    def _mock(self, name: str, body: str) -> None:
        path = self.mock_bin / name
        prefix = "" if body.startswith("#!") else "#!/bin/sh\n"
        path.write_text(prefix + body, encoding="utf-8")
        path.chmod(0o755)

    def _release(self, sha: str) -> Path:
        release = self.releases / sha
        (release / "dist").mkdir(parents=True)
        (release / "node_modules" / "tsx").mkdir(parents=True)
        (release / "server").mkdir()
        for relative in (
            "package.json",
            "server/index.ts",
            "dist/index.html",
            "node_modules/tsx/package.json",
        ):
            (release / relative).write_text("{}", encoding="utf-8")
        (release / ".cotuong-release-sha").write_text(f"{sha}\n", encoding="ascii")
        (release / ".cotuong-release-sha").chmod(0o640)
        (release / "uploads").symlink_to("/srv/cotuong/shared/uploads")
        return release

    def _run(self, health: str = "ok", env_mode: str = "640") -> subprocess.CompletedProcess[str]:
        environment = [
            "sudo",
            "-n",
            "/usr/bin/env",
            f"PATH={self.mock_bin}:/usr/sbin:/usr/bin:/sbin:/bin",
            f"MOCK_SYSTEMCTL_LOG={self.log}",
            f"MOCK_HEALTH={health}",
            f"MOCK_ENV_MODE={env_mode}",
            str(self.script),
        ]
        return subprocess.run(environment, capture_output=True, text=True, check=False)

    def test_healthy_activation_keeps_new_release(self) -> None:
        previous = self._release(OLD_SHA)
        (self.root / "current").symlink_to(previous)

        result = self._run()

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual((self.root / "current").resolve(), self.new_release)
        self.assertFalse(self.pending.exists())
        self.assertEqual(self.log.read_text(encoding="utf-8").splitlines(), ["restart"])

    def test_rejects_release_sha_marker_mismatch_before_restart(self) -> None:
        self.new_release.joinpath(".cotuong-release-sha").write_text(f"{'b' * 40}\n", encoding="ascii")
        result = self._run()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("release SHA marker", result.stderr)
        self.assertFalse(self.log.exists())

    def test_failed_health_check_restores_previous_release(self) -> None:
        previous = self._release(OLD_SHA)
        (self.root / "current").symlink_to(previous)

        result = self._run(health="fail")

        self.assertEqual(result.returncode, 1)
        self.assertEqual((self.root / "current").resolve(), previous)
        self.assertEqual(self.log.read_text(encoding="utf-8").splitlines(), ["restart", "restart"])

    def test_failed_first_activation_stops_without_current_pointer(self) -> None:
        result = self._run(health="fail")

        self.assertEqual(result.returncode, 1)
        self.assertFalse((self.root / "current").exists())
        self.assertEqual(self.log.read_text(encoding="utf-8").splitlines(), ["restart", "stop"])

    def test_rejects_missing_environment_before_switch(self) -> None:
        self.env_file.unlink()

        result = self._run()

        self.assertEqual(result.returncode, 1)
        self.assertIn("environment file is missing or unsafe", result.stderr)
        self.assertFalse((self.root / "current").exists())
        self.assertFalse(self.log.exists())

    def test_rejects_wrong_environment_mode_before_switch(self) -> None:
        result = self._run(env_mode="660")

        self.assertEqual(result.returncode, 1)
        self.assertIn("root:cotuong mode 0640", result.stderr)
        self.assertFalse((self.root / "current").exists())
        self.assertFalse(self.log.exists())


if __name__ == "__main__":
    unittest.main()
