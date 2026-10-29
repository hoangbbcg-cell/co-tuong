# Encrypted offsite backups for the test VPS

## Scope and trust boundaries

This procedure applies only to the test VPS `103.153.254.184`, database `cotuong_stage`, and the dedicated private R2 bucket. Production `103.9.78.75`, `hovanggame.com`, Nginx, DNS and firewall are excluded.

The local backup contains a checksummed MySQL dump and media archive in `/var/backups/cotuong-stage`. The R2 uploader age-encrypts both plus a manifest before upload, refuses object overwrite, and downloads each object back to verify SHA-256. The age private identity stays on the operator's Windows/offline recovery locations; only public recipients are installed on the VPS. Never put secrets or backup data in GitHub.

## R2 policy verification without a VPS account-wide token

The VPS needs only a bucket-scoped S3 Object Read & Write credential in `/etc/cotuong/r2-credentials`; it does not receive a Cloudflare Admin Read API token. Cloudflare's documented bucket-lock management and lifecycle configuration are managed through the dashboard/account API, while the S3 object credential cannot read bucket configuration.

Before enabling uploads, an operator with Cloudflare account access must manually inspect the dedicated bucket in the dashboard and confirm:

- Public access/custom domain are disabled.
- An enabled bucket-lock rule covers exactly the `cotuong-stage/` prefix for at least 30 days (2592000 seconds).
- No lifecycle deletion rule, including a broader prefix, overlaps `cotuong-stage/`.

Record these facts in the root-owned `/etc/cotuong/r2-policy-attestation.json`, together with the account ID, bucket, prefix, UTC `checked_at` and `expires_at`. The file must be `root:root 0600`, expire within seven days, and have the exact fields enforced by the uploader. The uploader fails closed if it is missing, malformed, mismatched, stale or expired. Renew it after a new dashboard inspection at least weekly.

This is an operator attestation, not a live Cloudflare API proof: it cannot detect someone changing bucket policy during the seven-day validity window. Restrict who can change bucket settings, and immediately stop uploads if policy changes. No account-wide Admin Read token is stored on the VPS. If policy cannot be inspected and attested, do not upload.

After manually checking the dashboard, the root-owned JSON file uses this exact shape (replace the example bucket/account and UTC timestamps with the values actually checked):

```json
{
  "format": 1,
  "account_id": "<32 lowercase hex account ID>",
  "bucket": "cotuong-stage-backup",
  "prefix": "cotuong-stage/",
  "public_access_disabled": true,
  "lock_age_seconds": 2592000,
  "lifecycle_deletion_overlap": false,
  "verified_via": "cloudflare-dashboard",
  "checked_at": "2026-10-29T12:00:00+00:00",
  "expires_at": "2026-11-05T12:00:00+00:00"
}
```

## Bucket, billing, and credentials

Cloudflare R2 activation may require accepting billing terms or setting up payment. Do not proceed with that checkout/payment step without the user's explicit confirmation. After that confirmation, create a dedicated **private R2 Standard** bucket such as `cotuong-stage-backup`; do not enable public access or custom domains. Set up the lock policy above and no overlapping lifecycle deletion.

Create an S3 API token with **Object Read & Write**, scoped to this one bucket only. Save the access key and secret in a password manager and enter them only into the protected server credential file through an approved interactive procedure. For Windows restore verification, use a separate bucket-scoped **Object Read Only** credential. Never create Admin Read or Admin Write credentials for the VPS.

The non-secret `/etc/cotuong/offsite-backup.conf` contains only `COTUONG_R2_ACCOUNT_ID`, `COTUONG_R2_BUCKET`, and `COTUONG_R2_ENDPOINT`. Protected files are all `root:root 0600`:

| File | Contents |
| --- | --- |
| `/etc/cotuong/offsite-backup.conf` | Non-secret account ID, bucket name, endpoint |
| `/etc/cotuong/r2-credentials` | AWS shared-credentials `[default]` with bucket-scoped S3 key pair |
| `/etc/cotuong/r2-policy-attestation.json` | Expiring operator record of dashboard-verified policy; contains no token |
| `/etc/cotuong/r2-age-recipients` | Public age recipient(s), one per line |

## Upload and recovery

R2 keys are immutable random names under `cotuong-stage/`; each encrypted SQL, media, and manifest object has a SHA-256 sidecar. The uploader verifies local source checksums, gzip/media structure, attestation, encrypts before network transfer, refuses overwrite, reads all objects back, and verifies the ciphertext hashes. Partial remote objects are retained for investigation if a later operation fails; they are not marked as a successful set.

On a trusted Windows operator machine, `verify-offsite-test-backup.py` downloads a selected set with the read-only bucket credential, validates ciphertext checksums, decrypts locally, checks manifest/source hashes, gzip and media structure, and removes its private temporary files. Full recovery readiness additionally requires an explicitly approved scratch-schema database restore and media restore validation. Do not restore over `cotuong_stage`.

## Retention and scheduling

Both R2 and local cleanup helpers default to dry-run. R2 cleanup validates complete object sets, every sidecar, and a recent successful offsite marker; it preserves the newest verified set. Local cleanup validates every paired SQL/media set, file owner/mode/checksums, gzip and media structure, requires the newest local set to be the source of a recent verified R2 upload, and preserves that newest local set. Both apply paths require an explicit CLI flag plus a separate environment gate. The installed systemd retention unit runs dry-run only; it does not receive either deletion gate.

Local backup and cleanup share `/var/backups/cotuong-stage/.backup.lock`, so the scheduled backup unit can acquire it while running under `ProtectSystem=strict` without widening its filesystem permissions. A cleanup run refuses missing/unsafe lock state, incomplete or corrupt sets, a stale/mismatched offsite marker, and any set with unexpected owner/mode. No backup timer is enabled by installation. Automatic deletion must remain disabled until the dry-run plans and exact scope receive separate approval.

The intended schedule is daily at 03:00 `Asia/Ho_Chi_Minh`, `Persistent=false`. The installer only installs helpers/units and calls `systemctl daemon-reload`; it does not enable or start the timer. Never enable it without separate approval because it initiates real database/media backups and cloud uploads.

## Operator actions requiring approval

1. Confirm the Cloudflare R2 billing/activation step before accepting checkout/payment. Then create the private Standard bucket.
2. In bucket settings, verify public access is off, configure the exact 30-day `cotuong-stage/` lock, and ensure no broader/nested lifecycle delete overlaps it.
3. Create a bucket-only Object Read & Write token. Save credentials securely; do not send them in chat. Make a bucket-only Object Read token for Windows recovery verification.
4. Generate the age identity on Windows, verify its ACL and offline recovery copy, and provide only its public recipient to the VPS configuration.
5. After all approvals and config review, install the reviewed backup helpers with one-time interactive `sudo /usr/local/sbin/cotuong-vps-admin install-local-backup`. This action is intentionally not in persistent sudoers; `sudo` prompts for the administrator password. It installs helpers/units and reloads systemd but does not create a backup, upload data, enable a timer, or run retention deletion. Refuse if target paths already exist and review them separately.
6. Separately approve a real backup/upload and restore drill. Require local checks, an `OFFSITE_VERIFIED` readback, a Windows decrypt/manifest verification, and scratch database/media restore validation before declaring two-site backup ready.
7. Separately approve timer activation only after the manual two-site drill passes. Retention deletion remains a different approval and needs reviewed dry-run output.

## Cost estimate

Cloudflare's current R2 Standard pricing page lists 10 GB-month included storage and `$0.015/GB-month` above that, with no direct R2 egress charge; operation allowances also apply. Verify current account terms and actual storage size before enabling billing. No bucket or paid resource was created by this repository work.

References: [R2 pricing](https://developers.cloudflare.com/r2/pricing/), [R2 authentication and bucket-scoped tokens](https://developers.cloudflare.com/r2/api/tokens/), [R2 bucket locks](https://developers.cloudflare.com/r2/buckets/bucket-locks/), [R2 object lifecycles](https://developers.cloudflare.com/r2/buckets/object-lifecycles/), [REST/S3 configuration API limitations](https://developers.cloudflare.com/r2/platform/troubleshooting/).
