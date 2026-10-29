# Test backup operations

## Scope and data sources

This runbook covers only VPS test `103.153.254.184` and the `cotuong_stage` schema. It excludes production `103.9.78.75`, `hovanggame.com`, Nginx, DNS and firewall.

The local helper currently creates a root-owned, mode-0600 compressed MySQL dump and SHA-256 sidecar in `/var/backups/cotuong-stage`, protected by a lock. The dump uses `mysqldump --single-transaction` and includes routines, triggers and events. It does not currently include application media.

The server writes important media to the release's `uploads/group-avatars/` and `uploads/message-images/` directories. On the VPS, `uploads` is intended to resolve through `/srv/cotuong/shared/uploads`. A complete backup must include those two media directories as well as MySQL. The current offsite uploader does not yet package those files.

## Destination restriction

Do not use Google Drive API or rclone Drive remotes to store backups of this application. Google's Workspace API User Data policy explicitly excludes backup of an application's own content to Drive. The encrypted synthetic fixture upload was only a connectivity test and is not an application backup. Select a different approved offsite store before implementing or running a real offsite upload. The repository already has a Cloudflare R2 adapter design, but no R2 account, bucket, token or VPS configuration is evidenced here.

## Schedule

The requested target is once daily at 03:00 `Asia/Ho_Chi_Minh`, without a boot catch-up run. The repository timer definition is being prepared with an explicit IANA timezone and `Persistent=false`. That file has not been installed or enabled on the VPS. Installing/enabling it can run a real backup and requires separate approval.

## Verification contract

Do not call a backup successful until all expected sources are included, the local checksum and compression checks pass, the encrypted offsite object is read back and verified, and a restore test passes in a new scratch database. Keep the private age identity on the trusted Windows operator machine and a separate offline recovery copy. Never transfer it to the VPS, GitHub, chat or an offsite bucket.

The current code does not implement a 30-day deletion policy. Do not manually or automatically prune local or remote backup data until a tested, scoped dry-run and explicit deletion approval exist. The last valid backup must be protected.

## Related procedures

- [RESTORE.md](RESTORE.md)
- [BACKUP-SECURITY.md](BACKUP-SECURITY.md)
- [BACKUP-REPORT.md](BACKUP-REPORT.md)
- [R2-BACKUP.md](R2-BACKUP.md) — existing alternative design; not configured
