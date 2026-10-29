# Backup readiness report — 2026-10-29

## Repository implementation status

| Area | Status | Evidence / limitation |
| --- | --- | --- |
| Local database backup | IMPLEMENTED, not re-run | Uses `mysqldump --single-transaction`, gzip integrity check, root-only `0600` SQL dump and SHA-256 sidecar. No backup was executed during this repository task. |
| Application media backup | IMPLEMENTED in candidate branch | New helper packages only `group-avatars/` and `message-images/`, rejects symlinks/unexpected file names and types, records a checksum, and validates extraction into a fresh scratch path. Not yet merged or installed on VPS. |
| Offsite encryption and transfer | IMPLEMENTED in candidate branch | R2 helper age-encrypts SQL, media and manifest; creates immutable object names, refuses overwrite, downloads objects back and verifies ciphertext checksums. Requires R2 setup and an age recipient on VPS. |
| Offsite restore verification | IMPLEMENTED in candidate branch | Windows-side verifier downloads encrypted objects, checks hashes, decrypts with local age identity, validates manifest, gzip and media archive. Actual R2 round-trip is pending bucket and credentials. |
| Retention | PREPARED, dry-run only | R2 helper groups exact object sets, verifies all object/sidecar hashes, requires fresh success marker, preserves newest and selects sets older than 30 days. Apply requires explicit CLI flag plus environment gate. No objects deleted. No local retention is implemented; disk usage needs monitoring. |
| Schedule | PREPARED, disabled by installer | Daily 03:00 `Asia/Ho_Chi_Minh`, `Persistent=false`. Installer now only installs reviewed helpers/units and reloads systemd; timer remains disabled. No schedule was installed/enabled. |
| Cloudflare account / R2 bucket | NOT VERIFIED / NOT CREATED | No Cloudflare account connector, token or configured R2 remote was available to inspect. Windows rclone only listed `gdrive_backup:`. No bucket/token/API credential was created. |
| VPS current R2 setup | NOT VERIFIED in this task | No current read-only inspection of R2 files, systemd unit state or bucket policy was performed. Do not infer current VPS state from old checkpoints. |
| Prior local restore drill | USER-REPORTED PASS | The previously reported 2026-10-28 SQL backup checksum and scratch-schema restore passed; it predates the new media packaging and R2 code. No new database/media backup or restore was run. |
| Production | UNTOUCHED | `103.9.78.75`, `hovanggame.com`, DNS, firewall and Nginx were not accessed or changed. |

## Security and operator decisions

- R2 Object Read & Write/Read tokens can be restricted to one bucket, but Cloudflare documents that these object tokens work only through the S3-compatible API and cannot inspect bucket configuration through the Cloudflare REST API. Lock/lifecycle inspection needs Admin Read only, which has account-wide read scope. The uploader intentionally fails closed unless it can inspect the required lock and absence of overlapping lifecycle deletion. Do not place such a token on the VPS until you explicitly accept its account-wide read scope; never grant Admin Read & Write.
- Create a dedicated private Standard bucket only after approving R2 billing. Keep public access and custom domains disabled. Configure a 30-day lock only for `cotuong-stage/`; do not configure lifecycle deletion for that prefix. The helper's custom cleanup remains dry-run until separately approved.
- Expected Standard storage cost is `$0` for up to the published 10 GB-month allowance and `$0.015/GB-month` above it; direct R2 egress is free. For example, 30 GB-month retained would be about `$0.30/month` storage before any account-specific taxes/charges; request allowances also apply. Actual backup sizes are unknown, so a reliable estimate needs one approved backup.
- The offsite R2 round-trip, decryption and scratch restore must pass before declaring two-site backup readiness. The Windows age private identity stays off VPS and GitHub, with an independent offline recovery copy.
- Timer activation authorizes recurring real database/media backup and upload. Retention deletion is a separate approval and remains disabled until the dry-run has been reviewed.
