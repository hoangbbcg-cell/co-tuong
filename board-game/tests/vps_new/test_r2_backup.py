from __future__ import annotations

import importlib.util
import json
import gzip
import hashlib
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


OPS = Path(__file__).parents[2] / "ops" / "vps-new"


def load_module(name: str, file_name: str):
    spec = importlib.util.spec_from_file_location(name, OPS / file_name)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


UPLOAD = load_module("upload_test_backup_r2", "upload-test-backup-r2.py")
VERIFY = load_module("verify_offsite_test_backup", "verify-offsite-test-backup.py")


class R2BackupTests(unittest.TestCase):
    def test_malformed_or_nonfinite_retention_age_fails_closed(self) -> None:
        for value in (True, None, '7776000', float('nan'), float('inf'), -1):
            self.assertFalse(UPLOAD.valid_age({'type': 'Age', 'maxAge': value}, 'maxAge', 90 * 86400))
        self.assertFalse(UPLOAD.valid_age(None, 'maxAge', 90 * 86400))

    def test_source_change_during_encryption_stops_before_remote_upload(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "2026-10-28T09-00-35Z.sql.gz"
            source.write_bytes(b"original dump")
            credentials = root / "credentials"
            credentials.write_text("placeholder", encoding="ascii")
            token = root / "token"
            recipients = root / "recipients"
            old_digest = hashlib.sha256(source.read_bytes()).hexdigest()
            age_calls = 0

            def fake_age(args: list[str], **_kwargs) -> None:
                nonlocal age_calls
                age_calls += 1
                Path(args[args.index("--output") + 1]).write_bytes(b"opaque ciphertext")
                if age_calls == 1:
                    source.write_bytes(b"changed dump")

            with (
                patch.object(UPLOAD, "BACKUP_DIR", root),
                patch.object(UPLOAD, "R2_CREDENTIALS", credentials),
                patch.object(UPLOAD, "R2_READ_TOKEN", token),
                patch.object(UPLOAD, "AGE_RECIPIENTS", recipients),
                patch.object(UPLOAD, "verify_source", return_value=old_digest),
                patch.object(UPLOAD, "load_config", return_value=("bucket", "endpoint", "account", credentials, token)),
                patch.object(UPLOAD, "verify_retention"),
                patch.object(UPLOAD, "require_root_file"),
                patch.object(UPLOAD, "checked_run", side_effect=fake_age),
                patch.object(UPLOAD, "transfer_and_verify") as transfer,
            ):
                with self.assertRaisesRegex(UPLOAD.BackupError, "changed during encryption"):
                    UPLOAD.upload_backup(source)
            transfer.assert_not_called()

    def test_object_upload_uses_atomic_create_only_and_checks_downloaded_hash(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "ciphertext.age"
            source.write_bytes(b"encrypted test bytes")
            expected = UPLOAD.sha256_file(source)
            calls: list[list[str]] = []

            def fake_run(args, *, env=None, check=False, capture_output=False, text=False):
                calls.append(args)
                if args[2] == "head-object":
                    return subprocess.CompletedProcess(args, 1, "", "An error occurred (404) when calling HeadObject")
                if args[2] == "put-object":
                    self.assertIn("--if-none-match", args)
                    self.assertEqual(args[args.index("--if-none-match") + 1], "*")
                    return subprocess.CompletedProcess(args, 0, "", "")
                if args[2] == "get-object":
                    Path(args[-1]).write_bytes(source.read_bytes())
                    return subprocess.CompletedProcess(args, 0, "{}", "")
                raise AssertionError("unexpected AWS operation")

            with patch.object(UPLOAD, "BACKUP_DIR", Path(directory)), patch.object(UPLOAD.subprocess, "run", side_effect=fake_run):
                UPLOAD.transfer_and_verify(source, "cotuong-stage/test.age", "bucket", "https://" + "a" * 32 + ".r2.cloudflarestorage.com", {}, expected)
            self.assertEqual([call[2] for call in calls], ["head-object", "put-object", "get-object"])

    def test_head_error_other_than_not_found_fails_closed(self) -> None:
        result = subprocess.CompletedProcess([], 1, "", "An error occurred (AccessDenied)")
        with patch.object(UPLOAD.subprocess, "run", return_value=result):
            with self.assertRaisesRegex(UPLOAD.BackupError, "safely determine"):
                UPLOAD.head_exists("bucket", "key", "https://" + "a" * 32 + ".r2.cloudflarestorage.com", {})

    def test_retention_requires_prefix_scoped_lock_and_ninety_day_expiry(self) -> None:
        token_path = Path("/not-read-in-test")
        valid_lock = {"success": True, "result": {"rules": [{"id": "retain-test", "enabled": True, "prefix": "cotuong-stage/", "condition": {"type": "Age", "maxAgeSeconds": 35 * 86400}}]}}
        valid_expiry = {"enabled": True, "conditions": {"prefix": "cotuong-stage/"}, "deleteObjectsTransition": {"condition": {"type": "Age", "maxAge": 90 * 86400}}}
        def response(payload):
            return type("Response", (), {"__enter__": lambda self: self, "__exit__": lambda *args: None, "read": lambda self: json.dumps(payload).encode()})()
        lifecycle = {"success": True, "result": {"rules": [valid_expiry]}}
        with patch.object(UPLOAD.Path, "read_text", return_value="redacted-token"), patch.object(UPLOAD.urllib.request, "urlopen", side_effect=[response(valid_lock), response(lifecycle)]) as network, patch.object(UPLOAD.subprocess, "run") as aws:
            UPLOAD.verify_retention("bucket", "a" * 32, token_path)
        self.assertTrue(network.call_args_list[0].args[0].full_url.endswith('/lock'))
        self.assertTrue(network.call_args_list[1].args[0].full_url.endswith('/lifecycle'))
        aws.assert_not_called()  # Bucket configuration must not use object-only credentials.

        unlocked = {"success": True, "result": {"rules": [{"enabled": True, "prefix": "other/", "condition": {"type": "Age", "maxAgeSeconds": 90 * 86400}}]}}
        with patch.object(UPLOAD.Path, "read_text", return_value="redacted-token"), patch.object(UPLOAD.urllib.request, "urlopen", return_value=response(unlocked)):
            with self.assertRaisesRegex(UPLOAD.BackupError, "35-day lock"):
                UPLOAD.verify_retention("bucket", "a" * 32, token_path)
        for prefix in ('', 'cotuong-stage/', 'cotuong-stage/nested/'):
            conflicting = {"enabled": True, "conditions": {"prefix": prefix}, "deleteObjectsTransition": {"condition": {"type": "Age", "maxAge": 86400}}}
            with patch.object(UPLOAD.Path, "read_text", return_value="redacted-token"), patch.object(UPLOAD, "policy_rules", side_effect=[valid_lock['result']['rules'], [valid_expiry, conflicting]]):
                with self.assertRaisesRegex(UPLOAD.BackupError, "conflicting deletion"):
                    UPLOAD.verify_retention("bucket", "a" * 32, token_path)

    def test_offsite_verifier_rejects_untrusted_object_prefix_before_network(self) -> None:
        with self.assertRaisesRegex(VERIFY.VerificationError, "prefix is invalid"):
            VERIFY.verify("../production/backup", "bucket", "https://" + "a" * 32 + ".r2.cloudflarestorage.com", Path("identity"))

    def test_offsite_verifier_checks_remote_hashes_manifest_decryption_and_gzip(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            identity = Path(directory) / "age-identity.txt"
            identity.write_text("age-identity-placeholder", encoding="ascii")
            prefix = "cotuong-stage/20261028T090000Z-" + "b" * 32
            plain_dump = gzip.compress(b"test dump header\n")
            source_digest = hashlib.sha256(plain_dump).hexdigest()
            encrypted_dump = b"opaque encrypted dump"
            encrypted_manifest = b"opaque encrypted manifest"
            manifest = json.dumps({"format": 1, "schema": "cotuong_stage", "source_sha256": source_digest, "encrypted_sha256": hashlib.sha256(encrypted_dump).hexdigest()}).encode()
            objects = {
                prefix + ".sql.gz.age": encrypted_dump,
                prefix + ".sql.gz.age.sha256": (hashlib.sha256(encrypted_dump).hexdigest() + "\n").encode(),
                prefix + ".manifest.age": encrypted_manifest,
                prefix + ".manifest.age.sha256": (hashlib.sha256(encrypted_manifest).hexdigest() + "\n").encode(),
            }

            def fake_run(args: list[str]) -> subprocess.CompletedProcess[str]:
                if args[0] == "aws":
                    Path(args[-1]).write_bytes(objects[args[args.index("--key") + 1]])
                elif args[0] == "age":
                    target = Path(args[args.index("--output") + 1])
                    target.write_bytes(plain_dump if "backup.sql.gz.age" in args[-1] else manifest)
                elif args[0] != "gzip":
                    raise AssertionError("unexpected restore command")
                return subprocess.CompletedProcess(args, 0, "", "")

            with patch.object(VERIFY, "run_silent", side_effect=fake_run):
                actual = VERIFY.verify(prefix, "backup-bucket", "https://" + "a" * 32 + ".r2.cloudflarestorage.com", identity)
            self.assertEqual(actual, source_digest)


if __name__ == "__main__":
    unittest.main()
