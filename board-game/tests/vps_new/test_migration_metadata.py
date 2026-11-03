import importlib.util
import subprocess
import unittest
from pathlib import Path
from unittest.mock import patch

path = Path(__file__).parents[2] / 'ops/vps-new/collect-test-migration-state.py'
spec = importlib.util.spec_from_file_location('metadata_probe', path)
probe = importlib.util.module_from_spec(spec)
spec.loader.exec_module(probe)


class MigrationMetadataTests(unittest.TestCase):
    def test_empty_schema_never_queries_missing_journal_or_reads_env_contents(self):
        calls = []
        def query(sql):
            calls.append(sql)
            if 'SCHEMATA' in sql:
                return [['utf8mb4_0900_ai_ci']]
            if 'TABLES' in sql:
                return []
            if 'VERSION()' in sql:
                return [['8.0.45']]
            if sql.startswith('SHOW GRANTS '):
                return [['GRANT USAGE ON *.*']]
            self.fail('Unexpected query: ' + sql)
        with patch.object(probe, 'query', side_effect=query), patch.object(probe, 'protected_metadata', return_value={'regular': True}):
            report = probe.collect()
        self.assertEqual(report['tableCount'], 0)
        self.assertFalse(report['journalExists'])
        self.assertEqual(report['journal'], [])
        self.assertTrue(all(sql.startswith(('SELECT ', 'SHOW GRANTS ')) for sql in calls))

    def test_nonempty_journal_preserves_exact_checksums_and_status(self):
        def query(sql):
            if 'SCHEMATA' in sql: return [['utf8mb4_0900_ai_ci']]
            if 'TABLES' in sql: return [['schema_migrations', 'InnoDB', 'utf8mb4_0900_ai_ci']]
            if sql.startswith('SELECT version'): return [['001_foundation.sql:001', 'a' * 64, 'running']]
            if 'VERSION()' in sql: return [['8.0.45']]
            return [['metadata grant']]
        with patch.object(probe, 'query', side_effect=query), patch.object(probe, 'protected_metadata', return_value={}):
            report = probe.collect()
        self.assertEqual(report['journal'][0]['status'], 'running')
        self.assertEqual(report['journal'][0]['checksum'], 'a' * 64)

    def test_query_rejects_mutations_and_uses_bounded_captured_socket_sql(self):
        for sql in ('CREATE DATABASE scratch', 'DROP DATABASE cotuong_stage', 'SELECT 1; DELETE FROM users'):
            with self.assertRaises(ValueError): probe.query(sql)
        with patch.object(probe.subprocess, 'run', return_value=subprocess.CompletedProcess([], 0, '8.0.45\n', '')) as run:
            self.assertEqual(probe.query('SELECT VERSION()'), [['8.0.45']])
        self.assertEqual(run.call_args.kwargs['timeout'], 15)
        self.assertTrue(run.call_args.kwargs['capture_output'])


if __name__ == '__main__': unittest.main()
