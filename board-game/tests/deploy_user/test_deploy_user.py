"""Deploy control-flow regression with disposable paths and stubbed VPS commands.

No SSH, production files, service, database or real sudo command is used.
The real Linux ACL/inheritance check is a separate administrator probe in DEPLOY-USER.md.
"""
import os
from pathlib import Path
import shutil
import subprocess
import tarfile
import tempfile
import unittest


SCRIPT = Path(__file__).resolve().parents[2] / "scripts" / "deploy-vps.sh"
BASH = os.environ.get("DEPLOY_TEST_BASH") or shutil.which("bash")


def shell_path(path):
    value = Path(path).resolve().as_posix()
    return "/" + value[0].lower() + value[2:] if os.name == "nt" else value


@unittest.skipUnless(BASH, "Bash is required for the deployment shell harness")
class DeployUserTest(unittest.TestCase):
    def setUp(self):
        # Keep temporary fixtures inside the checked-out project so restricted runners
        # can create and remove them without relying on an OS temp directory outside
        # the workspace sandbox.
        self.temporary = tempfile.TemporaryDirectory(
            prefix=".cotuong-deploy-test-", dir=Path(__file__).resolve().parents[2]
        )
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.bin = self.root / "bin"
        self.home = self.root / "deploy-home"
        self.app = self.root / "admin-home" / "co-tuong" / "board-game"
        self.web = self.root / "www"
        self.state = self.home / ".cotuong-deploy"
        self.incoming = self.home / ".cotuong-incoming"
        self.log = self.root / "calls.log"
        for path in (self.bin, self.app, self.web, self.state, self.incoming):
            path.mkdir(parents=True, mode=0o700)
            path.chmod(0o700)
        credential = self.state / "mysql-migrator.json"
        credential.write_text('{"user":"cotuong_migrator","password":"fixture-only"}')
        credential.chmod(0o600)
        (self.app / ".env").write_text("FIXTURE_ONLY=1\n")
        self.hook = self.root / "backup-hook"
        self.hook.write_text("#!/bin/sh\nexit 0\n")
        self.hook.chmod(0o755)
        self.script = self.root / "deploy.sh"
        text = SCRIPT.read_text(encoding="utf-8")
        for original, replacement in (
            ("/home/nhat_hoang/co-tuong/board-game", self.app),
            ("/var/www/cotuong", self.web),
            ("/home/cotuong_deploy", self.home),
            ("/usr/local/sbin/cotuong-backup-check", self.hook),
        ):
            text = text.replace(original, shell_path(replacement))
        self.script.write_text(text, encoding="utf-8", newline="\n")
        self.env = dict(os.environ, HOME=shell_path(self.home), CALL_LOG=shell_path(self.log),
                        FIXTURE_HOOK=shell_path(self.hook), FIXTURE_APP=shell_path(self.app),
                        FIXTURE_BIN=shell_path(self.bin), FAKE_USER="cotuong_deploy")
        # Prefix PATH in Bash: Windows PATH uses a different separator.
        self.command("id", '''if [[ "$1" == -un ]]; then echo "${FAKE_USER}";
elif [[ "$1" == -u && $# == 2 ]]; then
  [[ "$2" == missing ]] && exit 1
  if [[ "$2" == 0 || "$2" == root ]]; then echo 0; else echo 1001; fi
else /usr/bin/id "$@"; fi''')
        self.command("stat", '''if [[ "${@: -1}" == "$FIXTURE_HOOK" && "$*" == "-c %u "* ]]; then echo 0;
else /usr/bin/stat "$@"; fi''')
        self.command("find", '''if [[ "$*" == *"-maxdepth 0 -perm /077"* ]]; then
  [[ "${FAKE_PRIVATE_PERMS:-0}" == 1 ]] && echo "$1"; exit 0
fi
if [[ "$1" == "$FIXTURE_HOOK" ]]; then exit 0; fi
if [[ "$1" == "$FIXTURE_APP" && "${FAKE_BAD_APP:-0}" == 1 ]]; then echo "$1/blocked"; exit 0; fi
/usr/bin/find "$@"''')
        self.command("systemctl", 'printf "%s\\n" "${FAKE_RUNTIME:-nhat_hoang}"')
        self.command("sudo", '''printf 'sudo %s\\n' "$*" >> "$CALL_LOG"
[[ "$1" == -n ]] || exit 90
shift
if [[ "$1" == -l ]]; then
  [[ "${FAKE_DENY_STOP:-0}" == 1 && "$*" == *"systemctl stop cotuong.service" ]] && exit 1
  exit 0
fi
if [[ "$1" == "$FIXTURE_HOOK" ]]; then
  [[ "$2" == create-and-verify && "${FAKE_BACKUP_FAIL:-0}" == 1 ]] && exit 1
  [[ "$2" == verify-existing || "$2" == create-and-verify ]] || exit 91
  exit 0
fi
[[ "$1" == /usr/bin/systemctl ]] || exit 92
[[ "$2" == stop || "$2" == start || "$2" == is-active ]] || exit 93''')
        self.command("node", '''if [[ "$1" == -p ]]; then echo 22; else cat >/dev/null; fi''')
        self.command("npm", '''printf 'npm %s\\n' "$*" >> "$CALL_LOG"
if [[ -n "${DB_MIGRATOR_CREDENTIALS_FILE:-}" ]]; then printf 'migrator-config=%s\\n' "$DB_MIGRATOR_CREDENTIALS_FILE" >> "$CALL_LOG"; fi
if [[ "$*" == "run db:verify" && "$PWD" == */code/board-game && "${FAKE_SCHEMA_FAIL:-0}" == 1 ]]; then exit 1; fi
if [[ "$*" == "run db:migrate" && "${FAKE_MIGRATION_FAIL:-0}" == 1 ]]; then exit 23; fi
if [[ "$*" == "run build" ]]; then mkdir -p dist; printf 'fixture-index\\n' > dist/index.html; fi''')
        self.command("rsync", 'printf "rsync %s\\n" "$*" >> "$CALL_LOG"')
        self.command("flock", 'exit 0')
        self.command("sleep", 'exit 0')
        self.command("curl", '''output=; previous=; url=
for arg in "$@"; do
  [[ "$previous" == -o ]] && output="$arg"
  [[ "$arg" == http* ]] && url="$arg"
  previous="$arg"
done
if [[ "${FAKE_HEALTH_FAIL:-0}" == 1 && "$url" == */api/health ]]; then
  starts=$(grep -c 'sudo -n /usr/bin/systemctl start cotuong.service' "$CALL_LOG" || true)
  [[ "$starts" == 1 ]] && exit 1
fi
if [[ -n "$output" ]]; then printf 'fixture-index\\n' > "$output";
else printf '{"status":"ok"}'; fi''')
        payload = self.root / "payload" / "board-game"
        (payload / "server").mkdir(parents=True)
        (payload / "package-lock.json").write_text("{}")
        (payload / "server" / "index.ts").write_text("// fixture\n")
        upload = self.incoming / "run-1"
        upload.mkdir()
        self.archive = upload / "release.tar.gz"
        with tarfile.open(self.archive, "w:gz") as archive:
            archive.add(payload, arcname="board-game")

    def command(self, name, body):
        path = self.bin / name
        path.write_text("#!/usr/bin/env bash\n" + body + "\n", encoding="utf-8", newline="\n")
        path.chmod(0o755)

    def run_script(self, *args, **changes):
        env = dict(self.env, **changes)
        result = subprocess.run([BASH, "--noprofile", "--norc", "-c",
                                 'export PATH="$FIXTURE_BIN:$PATH"; bash "$@"',
                                 "fixture", shell_path(self.script), *args],
                                env=env, capture_output=True, text=True, timeout=30)
        self.calls = self.log.read_text().splitlines() if self.log.exists() else []
        self.actual_sudo = [line for line in self.calls if line.startswith("sudo ") and " -l " not in line]
        return result

    def deploy(self, **changes):
        rollback = changes.pop("rollback", "false")
        return self.run_script(shell_path(self.archive), "a" * 40, rollback, **changes)

    def assert_not_activated(self):
        self.assertFalse(any("systemctl stop " in call or "systemctl start " in call for call in self.actual_sudo))

    def assert_no_deploy_release(self):
        self.assertEqual({path.name for path in self.state.iterdir()}, {"mysql-migrator.json"})

    def test_administrator_and_wrong_home_refused_before_commands(self):
        result = self.run_script("--check", FAKE_USER="nhat_hoang")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("administrator/root", result.stderr)
        self.assertEqual(self.calls, [])
        result = self.run_script("--check", HOME=shell_path(self.root))
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.calls, [])

    def test_check_does_not_build_backup_restart_or_create_release(self):
        result = self.run_script("--check")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(len(self.actual_sudo), 2)
        self.assertTrue(any("verify-existing" in call for call in self.actual_sudo))
        self.assertFalse(any(call.startswith(("npm ", "rsync ")) for call in self.calls))
        self.assert_no_deploy_release()
        self.assert_not_activated()

    def test_private_directory_and_app_permissions_fail_closed(self):
        for setting in ("FAKE_PRIVATE_PERMS", "FAKE_BAD_APP"):
            with self.subTest(setting=setting):
                result = self.run_script("--check", **{setting: "1"})
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(self.actual_sudo, [])
                self.assert_no_deploy_release()

    def test_root_runtime_and_missing_sudo_rejected_without_restart(self):
        result = self.run_script("--check", FAKE_RUNTIME="root")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("non-root", result.stderr)
        result = self.run_script("--check", FAKE_RUNTIME="0")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("UID 0", result.stderr)
        result = self.run_script("--check", FAKE_RUNTIME="missing")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Cannot resolve", result.stderr)
        result = self.run_script("--check", FAKE_DENY_STOP="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.actual_sudo, [])

    def test_full_deploy_uses_acl_preserving_publish_and_backup_before_stop(self):
        result = self.deploy()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        publishes = [call for call in self.calls if call.startswith("rsync ") and "--delete" in call]
        self.assertEqual(len(publishes), 2)
        for call in publishes:
            for flag in ("--no-owner", "--no-group", "--no-perms", "--omit-dir-times", "--omit-link-times", "--chmod=Du=rwx,Dgo=rx,Fu+rw,Fgo+r,a+X"):
                self.assertIn(flag, call)
        self.assertIn("--exclude=.env", publishes[0])
        self.assertIn("--exclude=uploads", publishes[0])
        create = next(i for i, call in enumerate(self.actual_sudo) if "create-and-verify" in call)
        migration = next(i for i, call in enumerate(self.calls) if call.startswith("npm run db:migrate"))
        stop = next(i for i, call in enumerate(self.calls) if call.startswith("sudo -n /usr/bin/systemctl stop "))
        self.assertLess(create, stop)
        self.assertLess(create, migration)
        self.assertLess(migration, stop)
        self.assertIn(f"migrator-config={shell_path(self.state / 'mysql-migrator.json')}", self.calls)

    def test_failed_backup_or_schema_never_activates(self):
        for setting in ("FAKE_BACKUP_FAIL", "FAKE_SCHEMA_FAIL"):
            with self.subTest(setting=setting):
                self.log.unlink(missing_ok=True)
                result = self.deploy(**{setting: "1"})
                self.assertNotEqual(result.returncode, 0)
                self.assertIn("[backup] FAILED" if setting == "FAKE_BACKUP_FAIL" else "[migration] FAILED", result.stdout)
                if setting == "FAKE_BACKUP_FAIL":
                    self.assert_not_activated()
                else:
                    self.assertFalse(any("systemctl start cotuong.service" in call for call in self.actual_sudo))
                    self.assertTrue(any("systemctl stop cotuong.service" in call for call in self.actual_sudo))
                self.assertFalse(any("--delete" in call for call in self.calls if call.startswith("rsync ")))

    def test_failed_migration_stops_service_without_code_or_database_rollback(self):
        result = self.deploy(rollback="true", FAKE_MIGRATION_FAIL="1")
        self.assertEqual(result.returncode, 23, result.stdout + result.stderr)
        self.assertIn("Migration failed; database may be partially migrated", result.stdout)
        self.assertIn("No code rollback or MySQL restore was attempted", result.stdout)
        self.assertTrue(any("systemctl stop cotuong.service" in call for call in self.actual_sudo))
        self.assertFalse(any("systemctl start cotuong.service" in call for call in self.actual_sudo))
        self.assertFalse(any("--delete" in call for call in self.calls if call.startswith("rsync ")))

    def test_compatible_rollback_uses_same_acl_preserving_sync(self):
        result = self.deploy(rollback="true", FAKE_HEALTH_FAIL="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Previous code/frontend restored", result.stdout)
        publishes = [call for call in self.calls if call.startswith("rsync ") and "--delete" in call]
        self.assertEqual(len(publishes), 4)
        self.assertTrue(all("--no-perms" in call and "--omit-dir-times" in call for call in publishes))

    def test_unreviewed_rollback_stops_without_restoring(self):
        result = self.deploy(FAKE_HEALTH_FAIL="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Automatic rollback not authorized", result.stdout)
        publishes = [call for call in self.calls if call.startswith("rsync ") and "--delete" in call]
        self.assertEqual(len(publishes), 2)

    def test_workflow_multiline_run_blocks_have_valid_bash_syntax(self):
        # Syntax only: these blocks are never executed, in particular no SSH.
        repository = SCRIPT.parents[2]
        checked = 0
        for name in ("ci.yml", "deploy.yml"):
            lines = (repository / ".github" / "workflows" / name).read_text().splitlines()
            for index, line in enumerate(lines):
                if line.strip() != "run: |":
                    continue
                indent = len(line) - len(line.lstrip())
                body = []
                for following in lines[index + 1:]:
                    if following.strip() and len(following) - len(following.lstrip()) <= indent:
                        break
                    body.append(following[indent + 2:])
                result = subprocess.run([BASH, "--noprofile", "--norc", "-n"],
                                        input="\n".join(body), capture_output=True, text=True, timeout=10)
                self.assertEqual(result.returncode, 0, name + ": " + result.stderr)
                checked += 1
        self.assertGreaterEqual(checked, 3)


if __name__ == "__main__":
    unittest.main()
