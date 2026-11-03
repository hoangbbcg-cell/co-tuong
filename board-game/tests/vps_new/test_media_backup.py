from __future__ import annotations

import importlib.util
import io
import tarfile
import tempfile
import unittest
from pathlib import Path


OPS = Path(__file__).parents[2] / "ops" / "vps-new"
SPEC = importlib.util.spec_from_file_location("cotuong_media_backup", OPS / "cotuong-media-backup.py")
assert SPEC and SPEC.loader
MEDIA = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MEDIA)


class MediaBackupTests(unittest.TestCase):
    def test_packages_only_allowlisted_files_and_restores_to_fresh_directory(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "uploads"
            group = source / "group-avatars"
            messages = source / "message-images"
            group.mkdir(parents=True)
            messages.mkdir()
            image = group / "123e4567-e89b-42d3-a456-426614174000.jpg"
            image.write_bytes(b"fake image bytes")
            archive = root / "backup.uploads.tar.gz"

            digest, count = MEDIA.package_media(source, archive)
            self.assertEqual(count, 1)
            self.assertEqual(MEDIA.sha256_file(archive), digest)
            self.assertEqual(MEDIA.inspect_archive(archive), (1, digest))

            scratch = root / "restore-scratch"
            restored_count, restored_digest = MEDIA.extract_to_fresh_scratch(archive, scratch)
            self.assertEqual((restored_count, restored_digest), (1, digest))
            self.assertEqual((scratch / "group-avatars" / image.name).read_bytes(), b"fake image bytes")
            self.assertTrue((scratch / "message-images").is_dir())

    def test_refuses_symlink_and_unexpected_source_files(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "uploads"
            (source / "group-avatars").mkdir(parents=True)
            (source / "message-images").mkdir()
            unexpected = source / "message-images" / "cache.tmp"
            unexpected.write_bytes(b"not an application media object")
            with self.assertRaisesRegex(MEDIA.MediaBackupError, "unexpected file"):
                MEDIA.package_media(source, root / "backup.tar.gz")

    def test_inspection_rejects_traversal_symlink_and_duplicate_archive_entries(self):
        cases = (
            ("../escape", tarfile.REGTYPE),
            ("group-avatars/link", tarfile.SYMTYPE),
            ("group-avatars/123e4567-e89b-42d3-a456-426614174000.jpg", tarfile.REGTYPE, True),
        )
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for index, case in enumerate(cases):
                archive_path = root / f"unsafe-{index}.tar.gz"
                with tarfile.open(archive_path, "w:gz") as archive:
                    for dirname in MEDIA.MEDIA_DIRS:
                        folder = tarfile.TarInfo(dirname + "/")
                        folder.type = tarfile.DIRTYPE
                        archive.addfile(folder)
                    name, kind, *duplicate = case
                    item = tarfile.TarInfo(name)
                    item.type = kind
                    if kind == tarfile.SYMTYPE:
                        item.linkname = "../../outside"
                    else:
                        item.size = 1
                    archive.addfile(item, io.BytesIO(b"x") if item.size else None)
                    if duplicate:
                        archive.addfile(item, io.BytesIO(b"x"))
                with self.assertRaises(MEDIA.MediaBackupError):
                    MEDIA.inspect_archive(archive_path)

    def test_refuses_to_extract_over_existing_scratch_or_archive(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "uploads"
            for name in MEDIA.MEDIA_DIRS:
                (source / name).mkdir(parents=True)
            archive = root / "backup.tar.gz"
            MEDIA.package_media(source, archive)
            scratch = root / "scratch"
            scratch.mkdir()
            with self.assertRaisesRegex(MEDIA.MediaBackupError, "existing media scratch"):
                MEDIA.extract_to_fresh_scratch(archive, scratch)
            with self.assertRaisesRegex(MEDIA.MediaBackupError, "overwrite"):
                MEDIA.package_media(source, archive)


if __name__ == "__main__":
    unittest.main()
