#!/usr/bin/python3 -I
"""Root-only deployment gate. Never executes SQL, restore, or cloud commands."""
import gzip
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import subprocess
import sys
import time

BACKUPS = Path('/var/backups/cotuong')
STATE = Path('/var/lib/cotuong-backup-check')
LOCAL = 'cotuong-backup.service'
CLOUD = 'cotuong-cloud-backup.service'
NAME = re.compile(r'cotuong-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.sql\.gz\Z')
MAX_AGE = 86400
TIMEOUT = 900
MAX_SQL = 20 * 1024**3


class Refused(Exception):
    pass


def require(condition, message):
    if not condition:
        raise Refused(message)


def trusted(path):
    """Protect executable, state and unit paths, including their ancestors."""
    path = Path(path)
    for part in (path, *path.parents):
        info = part.lstat()
        require(not stat.S_ISLNK(info.st_mode) and info.st_uid == 0
                and not info.st_mode & 0o022, 'Untrusted administrative path')


def systemctl(*args, timeout=30):
    result = subprocess.run(['/usr/bin/systemctl', *args], capture_output=True,
                            text=True, timeout=timeout, check=False,
                            env={'PATH': '/usr/sbin:/usr/bin:/sbin:/bin', 'LC_ALL': 'C'})
    require(result.returncode == 0, 'systemctl operation failed (inspect journal locally)')
    return result.stdout


def show(unit):
    keys = ('Type', 'RemainAfterExit', 'ActiveState', 'SubState', 'Result',
            'ExecMainStatus', 'ExecMainCode', 'InvocationID',
            'ExecMainStartTimestampMonotonic', 'ExecMainExitTimestampMonotonic',
            'FragmentPath', 'DropInPaths', 'OnSuccess', 'LoadState')
    data = dict(line.split('=', 1) for line in systemctl(
        'show', unit, '--property=' + ','.join(keys)).splitlines() if '=' in line)
    require(data.get('LoadState') == 'loaded', 'Backup unit is not loaded')
    require(data.get('Type') == 'oneshot' and data.get('RemainAfterExit') == 'no',
            'Backup units must already be Type=oneshot, RemainAfterExit=no')
    require(data.get('FragmentPath'), 'Missing unit source')
    for source in [data['FragmentPath'], *data.get('DropInPaths', '').split()]:
        trusted(source)
    return data


def completed(data):
    return (data.get('ActiveState') == 'inactive' and data.get('Result') == 'success'
            and data.get('ExecMainStatus') == '0' and data.get('ExecMainCode') == '1'
            and int(data.get('ExecMainStartTimestampMonotonic', '0')) > 0
            and int(data.get('ExecMainExitTimestampMonotonic', '0')) > 0)


def wait_completed(unit, previous_id, started_us, deadline):
    while time.monotonic() < deadline:
        data = show(unit)
        fresh = (data.get('ExecMainStartTimestampMonotonic') != previous_id
                 and int(data.get('ExecMainStartTimestampMonotonic', '0')) >= started_us)
        if fresh:
            require(data.get('ActiveState') != 'failed', 'Fresh backup service failed')
            if completed(data):
                return data
            if data.get('ActiveState') == 'inactive':
                raise Refused('Fresh backup service did not exit successfully')
        time.sleep(1)
    raise Refused('Backup timeout; service may still run, inspect before retry')


def candidates():
    require(BACKUPS.is_dir() and not BACKUPS.is_symlink(), 'Missing backup directory')
    return {p.name: p.lstat() for p in BACKUPS.iterdir() if NAME.fullmatch(p.name)}


def validate(path, now=None):
    """Read whole gzip (CRC/trailer), inspect dump markers, hash stored bytes."""
    now = time.time() if now is None else now
    before = path.lstat()
    require(stat.S_ISREG(before.st_mode) and before.st_nlink == 1,
            'Backup must be a regular file with one link')
    require(before.st_size > 0, 'Empty backup')
    require(-5 <= now - before.st_mtime <= MAX_AGE, 'Backup expired or future dated')
    fd = os.open(path, os.O_RDONLY | getattr(os, 'O_NOFOLLOW', 0))
    with os.fdopen(fd, 'rb') as raw:
        require(fingerprint(os.fstat(raw.fileno())) == fingerprint(before), 'Backup changed before opening')
        digest = hashlib.file_digest(raw, 'sha256').hexdigest()
        raw.seek(0)
        total = 0
        head = b''
        tail = b''
        schema = False
        carry = b''
        with gzip.GzipFile(fileobj=raw) as dump:
            while chunk := dump.read(1024 * 1024):
                total += len(chunk)
                require(total <= MAX_SQL, 'Decoded backup exceeds safety limit')
                head = (head + chunk)[:65536]
                tail = (tail + chunk)[-65536:]
                text = carry + chunk
                schema |= b'CREATE TABLE ' in text
                # Reject explicit selection of another schema, including multi-DB dumps.
                for db in re.findall(rb'(?m)^USE `([^`]+)`;', text):
                    require(db == b'cotuong', 'Dump selects another database')
                carry = text[-256:]
        require(total > 0 and re.search(rb'-- (?:MySQL|MariaDB) dump', head),
                'Not a recognized SQL dump')
        require(re.search(rb'-- Host: [^\r\n]*Database: cotuong\s*(?:\r?\n)', head),
                'Dump database header does not identify cotuong')
        require(schema and re.search(rb'-- Dump completed on [^\r\n]+\s*\Z', tail),
                'Dump schema/completion marker missing')
        require(fingerprint(os.fstat(raw.fileno())) == fingerprint(before)
                and fingerprint(path.lstat()) == fingerprint(before),
                'Backup changed during verification')
    return {'file': path.name, 'sha256': digest, 'size': before.st_size,
            'mtime_ns': before.st_mtime_ns}


def fingerprint(info):
    return (info.st_dev, info.st_ino, info.st_mode, info.st_size,
            info.st_mtime_ns, info.st_nlink)


def receipt(record, cloud):
    destination = STATE / 'verified.json'
    if destination.exists():
        trusted(destination)
        old = json.loads(destination.read_text())
        if old.get('file') == record['file']:
            require(old.get('sha256') == record['sha256'], 'Recorded backup checksum changed')
    record['cloud_start_monotonic'] = cloud['ExecMainStartTimestampMonotonic']
    record['verified_at'] = int(time.time())
    temporary = STATE / 'verified.new'
    fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    try:
        with os.fdopen(fd, 'w') as stream:
            json.dump(record, stream)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, destination)
    finally:
        temporary.unlink(missing_ok=True)


def run(action):
    local, cloud = show(LOCAL), show(CLOUD)
    require(CLOUD in local.get('OnSuccess', '').split(), 'Expected cloud OnSuccess missing')
    require(local.get('ActiveState') not in ('active', 'activating', 'deactivating')
            and cloud.get('ActiveState') not in ('active', 'activating', 'deactivating'),
            'Backup is already running; retry after completion')
    existing = candidates()
    if action == 'verify-existing':
        require(existing, 'No existing backup')
        name = max(existing, key=lambda item: existing[item].st_mtime_ns)
        record = validate(BACKUPS / name)
        require(completed(local) and completed(cloud), 'Last local/cloud job was not successful')
        require(int(cloud['ExecMainStartTimestampMonotonic']) >=
                int(local['ExecMainExitTimestampMonotonic']), 'Cloud result predates local backup')
        local_exit_wall = time.time() - time.monotonic() + int(local['ExecMainExitTimestampMonotonic']) / 1e6
        require(existing[name].st_mtime <= local_exit_wall + 5,
                'Existing file is newer than the successful backup job')
        # A persisted receipt binds this file to a previously observed cloud invocation.
        # First bootstrap requires the administrator audit described in the installation guide.
        receipt(record, cloud)
    else:
        started_ns = time.time_ns()
        started_us = time.monotonic_ns() // 1000
        deadline = time.monotonic() + TIMEOUT
        systemctl('start', LOCAL, timeout=TIMEOUT)
        local = wait_completed(LOCAL, local.get('ExecMainStartTimestampMonotonic'), started_us, deadline)
        fresh = {name: info for name, info in candidates().items() if name not in existing
                 and info.st_mtime_ns >= started_ns}
        require(fresh, 'Backup job produced no new completed file')
        name = max(fresh, key=lambda item: fresh[item].st_mtime_ns)
        record = validate(BACKUPS / name)
        cloud = wait_completed(CLOUD, cloud.get('ExecMainStartTimestampMonotonic'),
                               int(local['ExecMainExitTimestampMonotonic']), deadline)
        require(validate(BACKUPS / name) == record, 'Backup changed while cloud ran')
        receipt(record, cloud)
    print('OK: local dump verified; cloud service completed successfully; restore not tested')


def main():
    require(len(sys.argv) == 2 and sys.argv[1] in ('verify-existing', 'create-and-verify'),
            'Usage: cotuong-backup-check verify-existing|create-and-verify')
    require(os.geteuid() == 0, 'Adapter requires root through restricted sudo')
    os.umask(0o077)
    trusted(Path(__file__).absolute())
    trusted('/usr/local/sbin/cotuong-backup.sh')
    trusted(STATE)
    # Kernel lock is on a root-owned state inode, never in the deploy user's tree.
    import fcntl
    fd = os.open(STATE / 'adapter.lock', os.O_RDWR | os.O_CREAT | os.O_NOFOLLOW, 0o600)
    with os.fdopen(fd, 'w') as lock:
        trusted(STATE / 'adapter.lock')
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError as error:
            raise Refused('Another adapter invocation is running') from error
        run(sys.argv[1])


if __name__ == '__main__':
    try:
        main()
    except Refused as error:
        print(f'REFUSED: {error}. Deploy blocked.', file=sys.stderr)
        sys.exit(1)
    except (OSError, ValueError, EOFError, KeyError, subprocess.SubprocessError):
        # Never print SQL or command stderr, which can contain credentials.
        print('REFUSED: backup verification failed; inspect units/files locally. Deploy blocked.',
              file=sys.stderr)
        sys.exit(1)
