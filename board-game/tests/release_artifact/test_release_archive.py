import io
import runpy
import tarfile
import tempfile
import unittest
from pathlib import Path

verify_archive = runpy.run_path(
    str(Path(__file__).parents[2] / "ops" / "vps-new" / "verify-test-release.py")
)["verify_archive"]


SHA = "a" * 40
TEST_ROOT = Path(__file__).parents[2]
REQUIRED = {
    "package.json": (tarfile.REGTYPE, 0o640),
    "server/index.ts": (tarfile.REGTYPE, 0o640),
    "dist/index.html": (tarfile.REGTYPE, 0o640),
    "node_modules/tsx/package.json": (tarfile.REGTYPE, 0o640),
    ".cotuong-release-sha": (tarfile.REGTYPE, 0o640),
}


def write_archive(path: Path, extra: tuple[str, int, str] | None = None, marker_sha: str = SHA) -> None:
    with tarfile.open(path, "w:gz") as archive:
        root = tarfile.TarInfo(".")
        root.type = tarfile.DIRTYPE
        root.mode = 0o2750
        archive.addfile(root)
        for name, (kind, mode) in REQUIRED.items():
            info = tarfile.TarInfo(name)
            info.type = kind
            info.mode = mode
            content = marker_sha.encode("ascii") if name == ".cotuong-release-sha" else b"{}"
            info.size = len(content)
            archive.addfile(info, io.BytesIO(content))
        link = tarfile.TarInfo("uploads")
        link.type = tarfile.SYMTYPE
        link.linkname = "/srv/cotuong/shared/uploads"
        archive.addfile(link)
        if extra:
            name, mode, linkname = extra
            info = tarfile.TarInfo(name)
            if linkname:
                info.type = tarfile.SYMTYPE
                info.linkname = linkname
                archive.addfile(info)
            else:
                info.type = tarfile.REGTYPE
                info.mode = mode
                info.size = 1
                archive.addfile(info, io.BytesIO(b"x"))


class ReleaseArchiveTests(unittest.TestCase):
    def test_accepts_contract_archive(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as directory:
            archive = Path(directory) / "release.tar.gz"
            write_archive(archive)
            verify_archive(str(archive), SHA)

    def test_rejects_release_marker_for_another_commit(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as directory:
            archive = Path(directory) / "release.tar.gz"
            write_archive(archive, marker_sha="b" * 40)
            with self.assertRaisesRegex(ValueError, "SHA marker"):
                verify_archive(str(archive), SHA)

    def test_rejects_environment_file(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as directory:
            archive = Path(directory) / "release.tar.gz"
            write_archive(archive, ("server/.env", 0o640, ""))
            with self.assertRaisesRegex(ValueError, "credential file"):
                verify_archive(str(archive), SHA)

    def test_rejects_group_writable_file(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as directory:
            archive = Path(directory) / "release.tar.gz"
            write_archive(archive, ("extra.txt", 0o660, ""))
            with self.assertRaisesRegex(ValueError, "writable"):
                verify_archive(str(archive), SHA)

    def test_rejects_path_traversal(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as directory:
            archive = Path(directory) / "release.tar.gz"
            write_archive(archive, ("../escape", 0o640, ""))
            with self.assertRaisesRegex(ValueError, "escapes"):
                verify_archive(str(archive), SHA)

    def test_rejects_unexpected_symlink(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as directory:
            archive = Path(directory) / "release.tar.gz"
            write_archive(archive, ("dist/escape", 0o777, "/etc/passwd"))
            with self.assertRaisesRegex(ValueError, "symlink"):
                verify_archive(str(archive), SHA)


if __name__ == "__main__":
    unittest.main()
