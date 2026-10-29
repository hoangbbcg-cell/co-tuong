# Backup readiness report — 2026-10-29

## Repository state and implementation

Audit work started from the latest fetched `origin/master` commit `21f1d89f456aafb02595268ff89815e0577ffbb3` (PR #29). The older Codex branch was preserved. The current candidate adds an orchestration gate so the scheduled service emits `BACKUP_COMPLETE=PASS` only after a matching local DB/media set and exact offsite `OFFSITE_VERIFIED` readback marker. Any helper failure or missing marker fails the systemd unit and records a `daemon.crit` journal alert. Retention remains dry-run.

| Area | Prepared implementation | Verification boundary |
| --- | --- | --- |
| Database | Root-only MySQL dump of `cotuong_stage`, `--single-transaction`, routines/triggers/events, gzip validation and SHA-256 | No database was read or backed up in this task. |
| Media/configuration | Archive only `group-avatars/` and `message-images/`; refuse symlinks, unexpected paths/types and traversal | Runtime config/secrets are deliberately not copied; recreate them from an approved secret store during recovery. RAM rooms/sockets/queues are not recoverable. |
| Offsite | Age-encrypt DB/media/manifest, create-only R2 keys below `cotuong-stage/`, read each encrypted object back and compare SHA-256 | User previously reported synthetic R2 smoke PASS. No real backup was uploaded in this task. |
| Success/error handling | New runner verifies matching local DB/media markers and exact `OFFSITE_VERIFIED` output before `BACKUP_COMPLETE=PASS`; systemd failure logs critical local alert | CI and full Ubuntu unit verification pending for this candidate. External email/SMS/chat is not configured. |
| Schedule | Daily 03:00 `Asia/Ho_Chi_Minh`, `Persistent=false`; installer does not enable/start timer | Timer not activated or checked on VPS in this task. |
| Retention | Local 30 days; R2 35 days to clear the 30-day Bucket Lock boundary; dry-run by default, preserve newest complete set, delete scope is constrained | No deletion or apply mode was run. “Month” is defined as 30×24h locally; R2 has the extra 5-day lock margin. |
| Restore | Existing verifier validates downloaded ciphertext, age decryption, manifest, gzip and media archive; SQL/media validators target scratch | A safe export/transfer script for decrypted recovery artifacts is missing. No current offsite-to-scratch DB+media restore PASS exists. |
| VPS test status | Read-only SSH with pinned host key on 2026-10-29: host `61152.vpsvinahost.vn`, timezone `Asia/Ho_Chi_Minh`, MySQL and `cotuong-test.service` active; `cotuong-local-backup.timer` is `not-found`; `/var/backups/cotuong-stage` is `root:root 0700`. The reviewed shared bundle still lists only `cotuong-backup.service`, its timer template, local helper and app templates. | No sudo, file/config read, DB query, backup, or service action was performed. Newly added runner/R2 executables and installed systemd unit paths were absent to this read-only account. Protected R2 config and actual backup contents were not inspected. |

## R2 state

Operator-provided context says the private Standard bucket `cotuong-stage-backup` exists, Bucket Lock is enabled for 30 days, and synthetic age-encrypted upload/readback/decrypt/hash passed. This task did not query Cloudflare or revalidate lock/lifecycle, credentials, billing, or public access. Bucket policy attestation is still the VPS-side fail-closed gate and does not detect dashboard drift during its seven-day validity window.

## Not performed

No access to VPS `103.9.78.75` or production domain; no real DB/media backup, R2 upload, restore, migration, deployment, timer activation, retention deletion, config or credential changes. The root-only backup directory was inspected by metadata only; its contents were not listed or read. Existing local backup reported on 2026-10-28 is preserved and not treated as current or as offsite proof.

## Remaining gates

1. Complete and test the safe Windows offsite-recovery export/transfer path, then run an approved real DB+media backup and isolated restore drill.
2. Review/install the latest helper/unit bundle on the test VPS with interactive sudo; verify installed file hashes, systemd units and disabled timer read-only.
3. Approve and run one manual two-copy backup and offsite restore drill; require `BACKUP_COMPLETE=PASS`, Windows decryption/manifest verification, and scratch DB+media validation.
4. Only after the drill passes, separately approve enabling the 03:00 timer. Retention deletion remains separately disabled pending dry-run review and approval.
