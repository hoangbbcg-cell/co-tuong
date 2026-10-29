# Backup readiness report — 2026-10-29

## Repository implementation status

| Area | Status | Evidence / limitation |
| --- | --- | --- |
| Local database backup | Implemented, not re-run | Consistent `mysqldump --single-transaction`, gzip check, root-only mode-0600 dump and SHA-256 sidecar. No backup was executed in this change. |
| Application media backup | Implemented in master | Packages only group avatars and message images, rejects unsafe archive members and validates scratch extraction. No new data was read. |
| Encrypted R2 transfer | Candidate implementation | Age-encrypts SQL, media and manifest before upload, uses immutable names, and reads back/verifies ciphertext. Requires approved Cloudflare bucket and credentials. |
| R2 policy gate | Candidate implementation | Replaces a VPS-held account-wide Admin Read token with a root-owned, seven-day manual dashboard attestation. It asserts private access, exact prefix lock of at least 30 days, and no overlapping lifecycle deletion. Missing, invalid, stale or expired attestation blocks upload. This is not live API proof and cannot detect drift before expiry. |
| Local retention | Candidate implementation | Dry-run by default; verifies every local set, preserves newest, requires fresh successful offsite marker for that exact source, and uses the same lock as backup. Apply requires explicit flag plus environment gate. No local files were removed. |
| R2 retention | Candidate implementation | Dry-run by default; validates complete remote sets and hashes, requires a recent success marker, preserves newest. Apply requires explicit flag plus environment gate. No remote objects were removed. |
| Installer and timer | Candidate implementation | Adds local retention helper to reviewed bundle/install paths. One-time `sudo` action is not added to persistent sudoers. Systemd retention calls are dry-run. Timer remains disabled; no helper was installed on VPS. |
| Tests | Pending this candidate | Regression tests cover attestation validity/fail-closed cases and local retention planning/gates. CI results will be reported with the PR. |
| Cloudflare/VPS state | Not verified or changed here | No credentials, bucket, policy, helper installation, backup, restore, deletion or timer action was performed. |
| Prior local restore drill | User-reported PASS | SQL-only scratch restore on 2026-10-28. It does not prove current R2 upload, media restore or current DB state. |
| Production | Untouched | No access/change to old VPS, production domain, Nginx, DNS or firewall. |

## Required user actions before operational setup

1. Explicitly confirm any R2 checkout/payment step, then create a dedicated private Standard bucket.
2. In Cloudflare dashboard, verify public access is disabled, configure an enabled 30-day `cotuong-stage/` lock and verify no lifecycle deletion overlap; provide a short-lived root-only attestation on the VPS. No Admin Read token is needed or placed on the VPS. Manual verification has a seven-day drift window.
3. Create an Object Read & Write S3 token scoped only to the backup bucket and a separate bucket-scoped Object Read token for Windows restore checks. Keep credentials in a password manager.
4. Generate and independently protect the age private identity offline; install only the public recipient on the test VPS.
5. Approve the one-time interactive-sudo installation of helpers/units; it does not enable timer or run backup.
6. Separately approve the first real database/media backup, R2 upload, and scratch restore drill; later approve timer activation. Retention deletion is separate and remains disabled.

No live backup, restore, retention deletion, timer activation, migration, deployment, or Cloudflare resource creation was performed for this repository task.
