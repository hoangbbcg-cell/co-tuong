# Encrypted offsite backups for the test VPS

## Layout and trust boundaries

- The local source remains `/var/backups/cotuong-stage/<UTC>.sql.gz` plus a root-owned `0600` SHA-256 sidecar in a root-owned `0700` directory.
- `cotuong-local-backup.service` starts `cotuong-offsite-backup.service` after local success. The offsite unit is skipped until `/etc/cotuong/offsite-backup.conf` exists. The admin installer requires all R2 config files and both tools before enabling the local timer; it accepts an already existing root:root `0700` backup directory and never removes existing backup files.
- The upload helper encrypts the compressed dump and its manifest with `age`. The VPS stores only public age recipients. Keep the matching private identity off the VPS and outside GitHub.
- Use a bucket-scoped R2 S3 credential in `/etc/cotuong/r2-credentials`, a read-only Cloudflare API token for lock inspection in `/etc/cotuong/r2-read-token`, recipients in `/etc/cotuong/r2-age-recipients`, and non-secret endpoint/account/bucket variables in `/etc/cotuong/offsite-backup.conf`. Each file must be `root:root 0600`; none belongs in the app environment.
- The non-secret systemd environment file contains only `COTUONG_R2_ACCOUNT_ID`, `COTUONG_R2_BUCKET`, and `COTUONG_R2_ENDPOINT`. The S3 credentials file uses an AWS shared-credentials `[default]` profile. The Cloudflare read token needs read access to that bucket's lock rules; the S3 credential needs object read/write plus lifecycle-read permission, scoped to the dedicated bucket.
- R2 object names are random, under `cotuong-stage/`. Each `PutObject` uses atomic `If-None-Match: *`; the helper refuses unsafe HEAD errors and never overwrites/deletes remote objects. Data and manifest ciphertexts each have SHA-256 sidecars. The helper downloads all four objects again and verifies their SHA-256 before printing `OFFSITE_VERIFIED`.
- Every upload fails closed unless the Cloudflare API confirms an enabled 35-day lock on the exact `cotuong-stage/` prefix and R2 lifecycle confirms expiration at 90 days or later. R2 locks take precedence over lifecycle deletion, so objects cannot be deleted during the lock window. The helper itself has no remote delete/prune action.
- Local backups older than 12 hours are rejected. An offsite systemd failure is not a completed two-site backup; monitor `cotuong-offsite-backup.service` and require its successful `OFFSITE_VERIFIED` record alongside the local backup checksum.
- No local backup is automatically deleted by this path. Retain local files until a separate approved cleanup policy is selected; monitor VPS free space. R2 objects are lifecycle-expired after 90 days, but cannot be deleted during the 35-day lock.

## Offsite verification and restore

Run `verify-offsite-test-backup.py <prefix> <bucket> <endpoint> <local-age-identity>` on a trusted operator computer with the age private identity and R2 read credentials available locally. It downloads the ciphertext and SHA-256 sidecars to a private temporary directory, verifies both hashes, decrypts the dump and manifest, checks the source digest and `gzip -t`, then removes the temporary files. It never sends the private age identity to the VPS.

This proves that the external copy is readable, decryptable, and byte-valid. It does not claim a database restore. For a full offsite restore drill, transfer only the decrypted **test** dump to the VPS through a protected temporary channel, verify it against the encrypted manifest's `source_sha256`, set root ownership/mode `0600`, and run the existing `validate-test-backup.py` scratch-schema validator. Obtain explicit operator approval before that VPS/database operation. Preserve the original local backup and all R2 objects.

No Cloudflare account, bucket, credentials, bucket lock, lifecycle rule, or VPS package/unit configuration is created by this code change. Those are explicit setup operations requiring approval. The first setup must use a dedicated private bucket and confirm that public access is disabled.

## Cloudflare R2 policy and expected cost

Use R2 Standard. Current published pricing includes 10 GB-month and operation allowances; Standard storage above that is `$0.015/GB-month`, and direct R2 egress is free. Set a 35-day age lock and a 90-day lifecycle expiration on the backup prefix. Verify the account's live regional/billing details before creating the bucket.

References: [R2 pricing](https://developers.cloudflare.com/r2/pricing/), [R2 bucket locks](https://developers.cloudflare.com/r2/buckets/bucket-locks/), [R2 object lifecycles](https://developers.cloudflare.com/r2/buckets/object-lifecycles/), [R2 conditional writes](https://developers.cloudflare.com/r2/api/s3/extensions/).
