# Backup security boundaries

## Keys and credentials

- Age private identity remains on the Windows operator machine and a separate offline recovery copy. Only the public `age1...` recipient may be installed on the test VPS.
- SSH private keys, rclone configuration, OAuth tokens, Cloudflare tokens, database environment files and age identities must never enter Git, release artifacts, backup payloads or logs.
- Keep backup directories root-owned mode `0700`, backup files and sidecars root-owned mode `0600`, and offsite credentials in dedicated root-only files separate from the app environment.
- Use separate least-privilege credentials for backup upload and recovery download. Do not grant bucket or Drive-wide access when object-level access is sufficient.

## Google OAuth findings

The operator reports the `CoTuong Backup` OAuth app is in Testing and Publish is disabled. The Windows rclone config requests `drive.file` and has a custom client configured. The VPS rclone config also requests `drive.file`, but uses rclone's built-in client configuration. The VPS read-only folder listing failed; its exact cause is not known because raw authentication diagnostics were suppressed. No credential or app setting was changed.

Google documents `drive.file` as a non-sensitive, per-file scope. Google also documents that authorizations for External apps left in Testing expire after seven days for scopes beyond basic identity scopes; verify the app's audience before relying on that exact limit. This is not a stable unattended-backup setup.

More importantly, Google's Workspace API User Data policy says Drive API use must not back up content from the developer's own app or project. Do not implement automated game database/media backup through Google Drive, regardless of encryption. Keep the app in Testing until an authorized operator reviews its Branding, Audience, Data Access and any Console issue details. Never publish it, expand scopes or replace the OAuth client without explicit approval.

Official references:

- [Google Workspace API User Data policy](https://developers.google.com/workspace/workspace-api-user-data-developer-policy)
- [Drive API scope definitions](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- [OAuth app audience and Testing status](https://support.google.com/cloud/answer/15549945)

## Scope and deletion

Never access the old production VPS or its backups. Offsite backup verification must not list, modify or delete the legacy `CoTuong-Backups` folder. R2 policy is manually checked in the Cloudflare dashboard and recorded in a root-owned, seven-day attestation; never place account-wide Admin Read on the VPS. Upload fails closed when the attestation is absent, invalid, stale or expired. Local and R2 retention commands default to dry-run, validate complete backup sets and the latest verified offsite source, preserve the newest valid set, and require both `--apply` and an explicit environment gate to delete. The installed service receives no deletion gate. Keep deletion disabled until a separate approval.
