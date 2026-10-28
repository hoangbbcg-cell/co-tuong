# Encrypted offsite backups for the test VPS

## Layout and trust boundaries

- The local source remains `/var/backups/cotuong-stage/<UTC>.sql.gz` plus a root-owned `0600` SHA-256 sidecar in a root-owned `0700` directory.
- `cotuong-local-backup.service` starts `cotuong-offsite-backup.service` after local success. The offsite unit is skipped until `/etc/cotuong/offsite-backup.conf` exists. The admin installer requires all R2 config files and both tools before enabling the local timer; it accepts an already existing root:root `0700` backup directory and never removes existing backup files.
- The upload helper encrypts the compressed dump and its manifest with `age`. The VPS stores only public age recipients. Keep the matching private identity off the VPS and outside GitHub.
- Use a bucket-scoped R2 S3 credential in `/etc/cotuong/r2-credentials`, a read-only Cloudflare API token for lock inspection in `/etc/cotuong/r2-read-token`, recipients in `/etc/cotuong/r2-age-recipients`, and non-secret endpoint/account/bucket variables in `/etc/cotuong/offsite-backup.conf`. Each file must be `root:root 0600`; none belongs in the app environment.
- The non-secret systemd environment file contains only `COTUONG_R2_ACCOUNT_ID`, `COTUONG_R2_BUCKET`, and `COTUONG_R2_ENDPOINT`. The S3 credentials file uses an AWS shared-credentials `[default]` profile with Object Read & Write scoped to the dedicated bucket. Object tokens cannot read bucket configuration. The separate Cloudflare Admin Read only token reads lock and lifecycle via the REST API; it has account-wide read access and cannot change policies. Do not give the VPS Admin Read & Write. Prefer a dedicated backup account if account-wide read access to unrelated buckets is unacceptable.
- R2 object names are random, under `cotuong-stage/`. Each `PutObject` uses atomic `If-None-Match: *`; the helper refuses unsafe HEAD errors and never overwrites/deletes remote objects. Data and manifest ciphertexts each have SHA-256 sidecars. The helper downloads all four objects again and verifies their SHA-256 before printing `OFFSITE_VERIFIED`.
- Every upload fails closed unless the Cloudflare API confirms an enabled 35-day lock on the exact `cotuong-stage/` prefix and lifecycle expiration at 90 days or later. Conflicting enabled deletion rules covering any of this prefix (including broader or nested prefixes) are rejected if they expire earlier or use a fixed date. R2 locks take precedence over lifecycle deletion. The helper itself has no remote delete/prune action. Object Read & Write credentials may still delete objects after their lock expires; the protected recovery window is at least 35 days, not immutable retention for all 90 days.
- Local backups older than 12 hours are rejected. An offsite systemd failure is not a completed two-site backup; monitor `cotuong-offsite-backup.service` and require its successful `OFFSITE_VERIFIED` record alongside the local backup checksum.
- No local backup is automatically deleted by this path. Retain local files until a separate approved cleanup policy is selected; monitor VPS free space. R2 objects are lifecycle-expired after 90 days, but cannot be deleted during the 35-day lock.

## Offsite verification and restore

Run `verify-offsite-test-backup.py <prefix> <bucket> <endpoint> <local-age-identity>` on a trusted operator computer with the age private identity and R2 read credentials available locally. It downloads the ciphertext and SHA-256 sidecars to a private temporary directory, verifies both hashes, decrypts the dump and manifest, checks the source digest and `gzip -t`, then removes the temporary files. It never sends the private age identity to the VPS.

This proves that the external copy is readable, decryptable, and byte-valid. It does not claim a database restore. For a full offsite restore drill, transfer only the decrypted **test** dump to the VPS through a protected temporary channel, verify it against the encrypted manifest's `source_sha256`, set root ownership/mode `0600`, and run the existing `validate-test-backup.py` scratch-schema validator. Obtain explicit operator approval before that VPS/database operation. Preserve the original local backup and all R2 objects.

No Cloudflare account, bucket, credentials, bucket lock, lifecycle rule, or VPS package/unit configuration is created by this code change. Those are explicit setup operations requiring approval. The first setup must use a dedicated private bucket and confirm that public access is disabled.

## Operator setup requiring separate approval

1. **Cloud/billing approval:** in Cloudflare, activate R2 only after reviewing billing, then create a dedicated Standard bucket (suggested name `cotuong-stage-backup`). Select the default jurisdiction: this helper deliberately accepts only `https://<account-id>.r2.cloudflarestorage.com`, not jurisdictional endpoints. Keep the public development URL disabled and add no custom domain. Record only the bucket name/account ID/endpoint in the non-secret setup record.
2. In bucket settings, add an enabled age lock on prefix `cotuong-stage/` for 35 days (`3024000` seconds). Add an enabled lifecycle deletion rule on the same prefix after 90 days (`7776000` seconds). Review every broader/nested deletion rule; the helper rejects an earlier overlap. These policy changes need approval and the administrator credential stays off the VPS.
3. Create an R2 Object Read & Write S3 token scoped to this bucket only. Save its Access Key ID and Secret Access Key in a password manager; do not paste them into chat, command arguments, history, GitHub or app env. Create a separate Admin Read only API token for policy inspection. Cloudflare's Admin read token is account-wide; record that decision before provisioning. A restore-only operator token should be Object Read only for this bucket.
4. On the trusted operator computer, generate an age identity using `age-keygen`. Keep the private identity in a private user directory with verified OS ACLs and an independent offline recovery copy. Export only the `age1...` public recipient for the VPS. Losing the private identity makes R2 backups unrecoverable. Windows `chmod` alone does not establish a private ACL.
5. **VPS configuration approval:** install reviewed age/AWS CLI versions and update the root-owned bundle through a separately reviewed operator step. Prepare the four files below interactively with root ownership and mode 0600; refuse existing paths rather than overwriting credentials. No credential is printed or supplied in shell command arguments. Do not enable any timer or run backup/upload as part of configuration.

| File | Contents |
| --- | --- |
| `/etc/cotuong/offsite-backup.conf` | Three non-secret assignments: account ID, bucket, global endpoint |
| `/etc/cotuong/r2-credentials` | `[default]` with `aws_access_key_id` and `aws_secret_access_key` from the bucket-scoped object token |
| `/etc/cotuong/r2-read-token` | The Admin Read only API token, one line |
| `/etc/cotuong/r2-age-recipients` | Public age recipient(s), one per line; no private identity |

6. Approve the first upload separately after read-only config/policy validation. The passed local dump is never modified. If it is older than 12 hours, approve a fresh local backup/drill first. Require `OFFSITE_VERIFIED`, then an off-VPS decrypt/checksum/gzip verification and an approved scratch MySQL restore using a downloaded R2 copy before calling the two-site system complete. Retain any partial remote upload on failure; it is not a successful backup and must not be automatically deleted or retried as a DB operation.
7. Approve timer installation only after the manual two-site drill passes. Inspect any pre-existing backup unit/helper instead of overwriting it; the current installer intentionally refuses existing installed paths. Monitor both local and offsite unit results and free space. Timer installation uses `--now` and may trigger a missed persistent schedule, so treat it as approval for a real backup/upload, not a configuration-only action.

References for credential scope: [R2 authentication](https://developers.cloudflare.com/r2/api/tokens/), [REST vs object token limitations](https://developers.cloudflare.com/r2/platform/troubleshooting/), [read lifecycle API](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/lifecycle/methods/get/).

## Cloudflare R2 policy and expected cost

Use R2 Standard. Current published pricing includes 10 GB-month and operation allowances; Standard storage above that is `$0.015/GB-month`, and direct R2 egress is free. Set a 35-day age lock and a 90-day lifecycle expiration on the backup prefix. Verify the account's live regional/billing details before creating the bucket.

References: [R2 pricing](https://developers.cloudflare.com/r2/pricing/), [R2 bucket locks](https://developers.cloudflare.com/r2/buckets/bucket-locks/), [R2 object lifecycles](https://developers.cloudflare.com/r2/buckets/object-lifecycles/), [R2 conditional writes](https://developers.cloudflare.com/r2/api/s3/extensions/).
