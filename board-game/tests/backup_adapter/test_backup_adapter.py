import gzip
import importlib.util
import os
from pathlib import Path
import tempfile
import time
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).resolve().parents[2] / 'scripts/cotuong-backup-check.py'
spec = importlib.util.spec_from_file_location('adapter', SCRIPT)
a = importlib.util.module_from_spec(spec)
spec.loader.exec_module(a)
SQL = (b'-- MySQL dump 10.13\n-- Host: localhost    Database: cotuong\n'
       b'CREATE TABLE `users` (`id` int);\n-- Dump completed on 2026-10-21 03:00:00\n')


def unit(start=100, end=200, **changes):
    data = dict(Type='oneshot', RemainAfterExit='no', ActiveState='inactive',
                Result='success', ExecMainStatus='0', ExecMainCode='1',
                ExecMainStartTimestampMonotonic=str(start),
                ExecMainExitTimestampMonotonic=str(end), OnSuccess=a.CLOUD)
    data.update(changes)
    return data


class AdapterTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(dir=Path(__file__).parent)
        self.root = Path(self.tmp.name)
        self.path = self.root / 'cotuong-2026-10-21_03-00-00.sql.gz'
        self.path.write_bytes(gzip.compress(SQL))

    def tearDown(self):
        self.tmp.cleanup()

    def test_valid_dump(self):
        record = a.validate(self.path)
        self.assertEqual(len(record['sha256']), 64)

    def test_empty_file(self):
        self.path.write_bytes(b'')
        with self.assertRaises(a.Refused): a.validate(self.path)

    def test_empty_decoded(self):
        self.path.write_bytes(gzip.compress(b''))
        with self.assertRaises(a.Refused): a.validate(self.path)

    def test_wrong_db(self):
        self.path.write_bytes(gzip.compress(SQL.replace(b'cotuong', b'other')))
        with self.assertRaises(a.Refused): a.validate(self.path)

    def test_other_use(self):
        self.path.write_bytes(gzip.compress(SQL.replace(b'CREATE TABLE', b'USE `other`;\nCREATE TABLE')))
        with self.assertRaises(a.Refused): a.validate(self.path)

    def test_missing_footer(self):
        self.path.write_bytes(gzip.compress(SQL.split(b'-- Dump completed')[0]))
        with self.assertRaises(a.Refused): a.validate(self.path)

    def test_crc_failure(self):
        content = bytearray(self.path.read_bytes())
        content[-8] ^= 1
        self.path.write_bytes(content)
        with self.assertRaises(gzip.BadGzipFile): a.validate(self.path)

    def test_truncated(self):
        self.path.write_bytes(self.path.read_bytes()[:-8])
        with self.assertRaises(EOFError): a.validate(self.path)

    def test_expired(self):
        with self.assertRaises(a.Refused): a.validate(self.path, time.time() + a.MAX_AGE + 1)

    def test_future(self):
        with self.assertRaises(a.Refused): a.validate(self.path, time.time() - 60)

    def test_limit(self):
        with patch.object(a, 'MAX_SQL', 10):
            with self.assertRaises(a.Refused): a.validate(self.path)

    def test_filename_ignores_temp(self):
        (self.root / (self.path.name + '.tmp')).write_bytes(b'partial')
        with patch.object(a, 'BACKUPS', self.root):
            self.assertEqual(list(a.candidates()), [self.path.name])

    def test_record_checksum_change(self):
        with patch.object(a, 'STATE', self.root), patch.object(a, 'trusted'):
            a.receipt(a.validate(self.path), unit())
            self.path.write_bytes(gzip.compress(SQL.replace(b'`id`', b'`changed`')))
            with self.assertRaises(a.Refused): a.receipt(a.validate(self.path), unit())

    def test_previous_cloud_not_fresh(self):
        with patch.object(a, 'show', return_value=unit()) as show, patch.object(a.time, 'sleep'), \
                patch.object(a.time, 'monotonic', side_effect=[0, 2]):
            with self.assertRaises(a.Refused):
                a.wait_completed(a.CLOUD, '100', 99, 1)
            show.assert_called_once()

    def test_fresh_failed_cloud(self):
        with patch.object(a, 'show', return_value=unit(300, 400, ActiveState='failed')):
            with self.assertRaises(a.Refused):
                a.wait_completed(a.CLOUD, '100', 200, time.monotonic() + 1)

    def test_fresh_success_without_invocation_id(self):
        with patch.object(a, 'show', return_value=unit(300, 400)):
            self.assertTrue(a.completed(a.wait_completed(a.CLOUD, '100', 200, time.monotonic() + 1)))

    def test_no_new_file_blocks(self):
        with patch.object(a, 'BACKUPS', self.root), patch.object(a, 'show', return_value=unit()), \
                patch.object(a, 'systemctl') as command, patch.object(a, 'wait_completed', return_value=unit()):
            with self.assertRaises(a.Refused): a.run('create-and-verify')
            command.assert_called_once_with('start', a.LOCAL, timeout=a.TIMEOUT)

    def test_failed_local_blocks(self):
        with patch.object(a, 'BACKUPS', self.root), patch.object(a, 'show', return_value=unit()), \
                patch.object(a, 'systemctl', side_effect=a.Refused('failed')), patch.object(a, 'receipt') as save:
            with self.assertRaises(a.Refused): a.run('create-and-verify')
            save.assert_not_called()

    def test_cloud_failure_blocks_receipt(self):
        fresh = self.root / 'cotuong-2026-10-21_03-01-00.sql.gz'
        with patch.object(a, 'BACKUPS', self.root), patch.object(a, 'show', return_value=unit()), \
                patch.object(a, 'systemctl', side_effect=lambda *args, **kwargs: fresh.write_bytes(gzip.compress(SQL))), \
                patch.object(a, 'wait_completed', side_effect=[unit(300, 400), a.Refused('cloud failed')]), \
                patch.object(a, 'receipt') as save:
            with self.assertRaises(a.Refused): a.run('create-and-verify')
            save.assert_not_called()

    def test_wrong_unit_type(self):
        output = 'LoadState=loaded\nType=simple\nRemainAfterExit=no\nFragmentPath=/unit\n'
        with patch.object(a, 'systemctl', return_value=output):
            with self.assertRaises(a.Refused): a.show(a.LOCAL)

    def test_invalid_cli(self):
        with patch.object(a.sys, 'argv', ['adapter', 'invalid']):
            with self.assertRaises(a.Refused): a.main()

    def test_no_cloud_hook(self):
        with patch.object(a, 'show', return_value=unit(OnSuccess='')):
            with self.assertRaises(a.Refused): a.run('verify-existing')

    def test_backup_gate_before_activation(self):
        deploy = (SCRIPT.parent / 'deploy-vps.sh').read_text()
        self.assertLess(deploy.index('"$HOOK" create-and-verify'), deploy.index('phase=activate'))
        self.assertLess(deploy.index('"$HOOK" verify-existing'), deploy.index('phase=prepare'))

    def test_busy_blocks(self):
        with patch.object(a, 'show', return_value=unit(ActiveState='activating')), \
                patch.object(a, 'systemctl') as command:
            with self.assertRaises(a.Refused): a.run('create-and-verify')
            command.assert_not_called()

    def test_create_success_waits_cloud(self):
        fresh = self.root / 'cotuong-2026-10-21_03-01-00.sql.gz'
        def start(*args, **kwargs):
            fresh.write_bytes(gzip.compress(SQL))
        with patch.object(a, 'BACKUPS', self.root), patch.object(a, 'show', return_value=unit()), \
                patch.object(a, 'systemctl', side_effect=start), \
                patch.object(a, 'wait_completed', side_effect=[unit(300, 400), unit(500, 600)]) as wait, \
                patch.object(a, 'receipt') as save:
            a.run('create-and-verify')
            self.assertEqual(wait.call_args_list[1].args[0], a.CLOUD)
            self.assertEqual(save.call_args.args[0]['file'], fresh.name)


if __name__ == '__main__':
    unittest.main()
