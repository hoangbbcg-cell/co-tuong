# Test backup restore procedure

## Current readiness

The operator reported a successful local database-only restore drill on 2026-10-28 into a scratch schema, with checksum, table/journal checks and scratch cleanup passing. That dump is now older than the uploader's 12-hour acceptance window. No current offsite backup or full database-plus-media restore has been verified.

## Restore from an offsite copy

1. Rebuild a trusted operator Windows machine and install reviewed `age` and the approved storage client from their official sources.
2. Recover the private age identity from its protected primary location or offline recovery copy. Never send it to the VPS.
3. Download only the selected encrypted test backup to a private temporary directory. Verify the ciphertext checksum before decryption.
4. Decrypt locally to a temporary file protected by the Windows user's ACL. Verify the manifest checksum, archive contents and compression. Do not print decrypted data.
5. Transfer only the approved test restore material over a pinned SSH connection to the test VPS. Obtain separate approval before any database restore.
6. Restore the SQL dump to a newly generated scratch schema, never over `cotuong_stage` or any production database. Run the reviewed scratch validator and compare table/journal metadata.
7. Verify the decrypted media archive against the manifest, then run `sudo /usr/local/sbin/cotuong-media-backup.py --restore-validate /var/backups/cotuong-stage/<timestamp>.uploads.tar.gz`. It creates a unique `/var/tmp/cotuong-media-restore-check-*` directory, rejects traversal, symlinks, unexpected types/names and existing targets, and prints the exact scratch path and file count. The scratch is preserved for inspection; remove only that exact path after explicit cleanup approval.
8. Preserve the original backup and offsite objects. Remove only scratch data created by that exact drill, after confirming ownership and the generated scratch identifier.

SQL and media validators are separate so either failure remains diagnosable. A full application restore passes only when both succeed and the database metadata agrees with the backup manifest.

## VPS loss

Bootstrap a replacement test VPS from the reviewed non-secret deployment bundle, restore credentials through their approved password manager, verify the destination configuration, then restore database and media into scratch locations first. Re-validate schema and app access before pointing any service at restored data. This procedure does not authorize production recovery or public exposure.
