# Test backup operations

## Scope and data sources

This runbook covers only VPS test `103.153.254.184` and the `cotuong_stage` schema. It excludes production `103.9.78.75`, `hovanggame.com`, Nginx, DNS and firewall.

The local helper creates a root-owned, mode-0600 compressed MySQL dump and SHA-256 sidecar in `/var/backups/cotuong-stage`, protected by a lock. The dump uses `mysqldump --single-transaction` and includes routines, triggers and events. It also packages only `group-avatars/` and `message-images/` from `/srv/cotuong/shared/uploads` into a separately checksummed gzip tar. Symlinks, unexpected names/types and path traversal fail closed. A missing media root blocks the backup rather than claiming a complete application snapshot. The scheduled entry point requires matching database/media success markers and an exact `OFFSITE_VERIFIED` marker before emitting `BACKUP_COMPLETE=PASS`; an R2 readback failure makes the systemd backup unit fail while preserving local and partial remote data.

The server writes important media to the release's `uploads/group-avatars/` and `uploads/message-images/` directories. On the VPS, `uploads` is intended to resolve through `/srv/cotuong/shared/uploads`. The R2 manifest binds SHA-256 values for both SQL and media; age encrypts each before upload, and encrypted objects are downloaded and verified again. No plaintext source is uploaded.

## Destination restriction

Do not use Google Drive API or rclone Drive remotes to store backups of this application. Google's Workspace API User Data policy explicitly excludes backup of an application's own content to Drive. The encrypted synthetic fixture upload was only a connectivity test and is not an application backup. The repository contains an R2 adapter, but no Cloudflare account, bucket, token or VPS configuration is verified. Do not upload app content until an approved private bucket and credentials are provisioned.

## Schedule

The requested target is once daily at 03:00 `Asia/Ho_Chi_Minh`, without a boot catch-up run. The repository timer uses an explicit IANA timezone and `Persistent=false`. The installer only installs units and reloads systemd; it does not enable or start the timer. Enabling it requires separate approval and authorizes real backups and R2 uploads. Service failure also emits a local `daemon.crit` journal alert. No email/SMS/chat destination is configured.

## Verification contract

Do not call a backup successful until SQL and media sources are present, local checksum/archive checks pass, all encrypted R2 objects are read back and verified, and restore validation passes in a new scratch database and media directory. Keep the private age identity on the trusted Windows operator machine and a separate offline recovery copy. Never transfer it to the VPS, GitHub, chat or an offsite bucket.

Retention local is **30×24 hours**; R2 is **35×24 hours** to give a five-day margin after the 30-day Bucket Lock. Neither means a calendar month. The R2 cleanup helper defaults to dry-run, verifies complete object sets, requires a recent successful upload marker, and preserves the newest verified set. The local cleanup helper also defaults to dry-run, validates every complete database/media pair, verifies file ownership/modes/checksums/gzip/media structure, requires the newest local set to be the source of a fresh verified offsite upload, and preserves that newest local set. Both apply paths require an explicit CLI flag plus an environment gate. The installed retention service invokes both in dry-run mode only. Do not bypass Bucket Lock. Do not run either helper with `--apply` or enable deletion until the exact plans and scope have been reviewed and separately approved.

## Related procedures

- [RESTORE.md](RESTORE.md)
- [BACKUP-SECURITY.md](BACKUP-SECURITY.md)
- [BACKUP-REPORT.md](BACKUP-REPORT.md)
- [BACKUP-OPERATIONS.md](BACKUP-OPERATIONS.md) — Vietnamese operator guide and exact status/log commands; marks prepared but uninstalled operations
- [R2-BACKUP.md](R2-BACKUP.md) — existing alternative design; not configured
