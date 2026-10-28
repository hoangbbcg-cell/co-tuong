import os
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path


@unittest.skipUnless(os.name == 'posix' and shutil.which('systemd-analyze'), 'Requires Linux systemd-analyze; covered by Ubuntu CI')
class BackupUnitVerificationTests(unittest.TestCase):
    def test_verify_requires_execstart_to_be_installed_before_validation(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            executable = root / 'backup-helper'
            unit = root / 'cotuong-install-verification.service'
            unit.write_text('[Unit]\nDescription=Temporary verification fixture\n[Service]\nType=oneshot\nExecStart=' + str(executable) + '\n', encoding='utf-8')
            missing = subprocess.run(['systemd-analyze', 'verify', str(unit)], capture_output=True, text=True)
            self.assertNotEqual(missing.returncode, 0)
            shutil.copyfile('/bin/true', executable)
            executable.chmod(0o700)
            installed = subprocess.run(['systemd-analyze', 'verify', str(unit)], capture_output=True, text=True)
            self.assertEqual(installed.returncode, 0, installed.stderr)


if __name__ == '__main__': unittest.main()
