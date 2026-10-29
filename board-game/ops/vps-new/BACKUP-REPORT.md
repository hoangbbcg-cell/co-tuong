# Backup readiness report — 2026-10-29

| Area | Status | Evidence / limitation |
| --- | --- | --- |
| Windows Drive smoke test | PASS | The 228-byte age v1 synthetic fixture was uploaded to `CoTuong-Encrypted-Backups`, downloaded, SHA-256 matched, and the temporary download was removed. No private key or OAuth file was uploaded. |
| Windows rclone | PASS | `C:\rclone\rclone.exe`, v1.75.2; remote `gdrive_backup:` present. Windows remote config requests `drive.file` and has a custom client configured. |
| VPS identity and host key | PASS | SSH identity matched pinned ED25519 fingerprint for `103.153.254.184`; no production host was contacted. |
| VPS OS/timezone/MySQL | PASS | Ubuntu 24.04, `Asia/Ho_Chi_Minh`, MySQL active. |
| VPS backup prerequisites | PARTIAL | rclone v1.60.1-DEV and age 1.1.1 are present; disk root filesystem 79 GB with 4.2 GB used; backup directory metadata is `root:root:700`. |
| VPS rclone config | PARTIAL | Config metadata is owner `nhat_hoang`, mode `0600`; remote name exists and scope is `drive.file`, but no custom client ID is configured. Read-only listing of the dedicated folder failed; exact cause remains unverified. |
| Google OAuth | BLOCKED | Operator reports Testing and Publish disabled. Do not change status. Testing has a short authorization lifetime for External apps. Google policy also prohibits using Drive API to back up the developer's own app/project content. |
| Database and grants | PENDING | Non-interactive sudo was unavailable. No current schema, table, migration journal, grants or account authentication state was read in this check. Do not infer emptiness from prior checkpoints. |
| Application data | PENDING | Code writes group avatars and message images under the release `uploads` path, intended to resolve to `/srv/cotuong/shared/uploads`. SSH user could not establish whether that protected directory exists. `current` release symlink was absent. |
| Local backup | PENDING | A 2026-10-28 database-only restore drill was previously reported PASS, but its dump is now older than the 12-hour upload window. No fresh dump was created in this task. |
| Full media backup/restore | FAIL | Current local helper and R2 uploader handle the SQL dump only; they do not package or restore app media. |
| Offsite backup | BLOCKED | No verified offsite application backup exists. Google Drive is not an allowed target for this app-content backup use. R2 remains unconfigured. |
| Schedule | PREPARED | Repository timer is being changed to daily 03:00 `Asia/Ho_Chi_Minh` with no catch-up. The VPS timer was not inspected, installed or enabled. |
| Retention | PENDING | 30-day cleanup is not implemented or enabled. No files were deleted. |
| Restore/deploy/migration | NOT RUN | No restore, migration, deployment, service activation or restart was performed. |
| Production | UNTOUCHED | VPS `103.9.78.75`, `hovanggame.com`, DNS, firewall and Nginx were not accessed or changed. |

## Required decisions and operator steps

1. Choose an offsite provider whose policies permit application-owned database/media backups. The repository has a Cloudflare R2 design; provisioning or credential setup needs separate approval.
2. For current schema/grants and protected media metadata, run the reviewed read-only inspector from Windows and enter the sudo password privately in that terminal. Do not send the password here. It must produce a metadata report before the database baseline can be called current.
3. Approve a fresh local database backup and scratch restore only after the provider/configuration path is approved. Keep backup and restore as separate explicit gates.
4. Approve full media packaging and its isolated restore test before claiming the application backup complete.
5. Separately approve installation/enabling of the daily timer, then later approve any retention deletion policy. Neither is included in this repository-only preparation.
