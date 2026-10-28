# Test VPS phases 4–6: evidence and execution gates

Target: `103.153.254.184`, database `cotuong_stage`, GitHub Environment `vps-test`, release branch `master`. No production operation is part of this plan.

## Current evidence

The operator reported local backup/restore PASS for `/var/backups/cotuong-stage/2026-10-28T09-00-35Z.sql.gz`: SHA-256, scratch restore, table/journal checks and cleanup passed. Preserve this file and its sidecar. At 2026-10-28 11:10 UTC it was about 2 hours old and within the uploader's 12-hour freshness limit; re-check age, owner/mode, sidecar checksum and gzip immediately before any migration/upload. Its exact SHA-256 value was not included in the supplied evidence. No independently verified offsite copy is recorded.

The operator supplied a successful read-only migration inspection for `cotuong_stage`: `EMPTY_BASELINE`, 0 tables, 0 applied steps, 38 expected steps across `001`–`010`, and `schemaVerificationRequired=true`. `MIGRATION_JOURNAL_COMPARISON=PASS` proves the empty journal/schema metadata matched the reviewed migration registry at the inspector's approved master SHA; it does not prove that migrations or full schema verification have run. The current code expands to 38 statement-level entries: 001=21, 002=5, 003–007=1 each, 008–010=2 each. The abbreviated result does not establish app/migrator authentication or least-privilege grant contents; capture those from the retained report or verify them immediately before migration.

`READ_ONLY_PREFLIGHT_ONLY=PASS` proves the checks in the reviewed runner succeeded: pinned SSH, interactive sudo and local root MySQL socket access, schema existence, table/journal consistency, no non-applied journal rows when tables exist, successful SHOW GRANTS calls, and a real root-owned 0700 backup directory. It accepts **either** an empty schema **or** a nonempty journal whose rows are applied. It prints table/journal counts and versions, but does not compare checksums, prove app/migrator password authentication, check the full schema, or prove an offsite backup exists. The saved PASS marker alone does not identify which branch occurred. SHOW GRANTS success does not establish that the grants match the least-privilege policy.

`inspect-test-migration-state.ps1 -ApprovedMasterCommit <reviewed master SHA>` closes the evidence gap without uploading a helper: it executes the reviewed Python probe in memory over pinned SSH, reads only schema metadata/journal/grants and protected-file metadata, saves a unique local JSON report, then compares every live version/checksum/status with `loadMigrations`/`pendingMigrations` from that checkout. The sudo prompt ends with a newline so PowerShell 5.1's Tee pipeline displays it immediately. Report data contains no application rows, environment contents or passwords. The comparison distinguishes EMPTY_BASELINE, PENDING and CURRENT; CURRENT still requires `db:verify` using the app account. A mismatch, running step, hole, duplicate or unjournaled application tables stops the plan.

## Ordered approvals

| Gate | Prepared action | Required evidence / stop condition |
| --- | --- | --- |
| Read-only metadata | Run the inspector and retain its report | Exact pending steps/checksums; review grants and env owner/mode. No inference from old checkpoints. |
| R2 setup | Follow R2-BACKUP.md to create a private bucket, policies and scoped credentials; provision age/AWS CLI and root-only config on the test VPS | Separate approval for cloud/billing and VPS configuration. No token/key enters GitHub/chat. |
| Independent backup | Upload an approved fresh local test backup, verify remote readback, then decrypt/verify off-VPS and scratch-restore the downloaded test copy | Explicit approval for each real backup/upload/restore. Preserve the passed original. A dump older than 12 hours is rejected by the uploader; request a new backup rather than modifying the old file/timestamp. Crypto/gzip verification alone is not MySQL restore PASS. |
| Candidate staging | Dispatch the manual release workflow for the reviewed full master SHA with `operation: stage`; Environment approval is required. It verifies the archive and stages the candidate SHA while the service is stopped and `current` is absent. | Staging writes release files to the test VPS but does not start or restart service. Require separate approval. Do not use the dirty primary checkout or run unverified code as root. |
| Migration | Run exactly once from the staged SHA using the protected migrator environment targeting `cotuong_stage`, then run `db:verify` with app credentials. | Require a fresh verified local backup and restore drill, independently verified encrypted offsite copy per the approved two-site policy, pre-migration grant/auth checks, `EMPTY_BASELINE` comparison, service inactive and candidate SHA recorded. Never apply SQL files manually around the journal runner. |
| Deployment | Dispatch `vps-test-deploy.yml` with the same reviewed SHA and `operation: activate`; approve `vps-test` again. | Fresh push CI/Secret scan PASS, post-migration inspection CURRENT (38/38) and `db:verify` PASS with app account. Activation restarts `cotuong-test.service`; this is a separate approval. |
| QA | Read-only runtime smoke, then approved disposable-account API/socket/gameplay exercise | Report each result separately; liveness and handshake do not prove database or gameplay. |

## Migration failure and rollback

MySQL DDL implicitly commits. `migrateDatabase` journals each statement as running before executing it, then marks it applied. On any failure: stop, retain journal/error code and schema metadata, keep the service inactive, and do not automatically rerun, delete/mark journal rows, apply inverse SQL, or restore over `cotuong_stage`. Investigate which statement committed. A retry/repair or database replacement requires a new explicit plan and approval; migration files 001–010 must not be edited after application.

After separate migration approval and after the candidate is staged, run as root from `/srv/cotuong/releases/<SHA>`:

```bash
set -Eeuo pipefail
/opt/node-v22.23.3/bin/node --env-file=/etc/cotuong/cotuong-migrator.env --import tsx server/database.ts migrate
set +x
set -a
. /etc/cotuong/cotuong.env
set +a
runuser --preserve-environment -u cotuong -- /opt/node-v22.23.3/bin/node --import tsx server/database.ts verify
```

The database account is `cotuong_migrator` for DDL and `cotuong_app` for verification; the OS process for verification is `cotuong`. Expect 38 newly applied steps, followed by full schema verification. Do not run `db:smoke` here because it creates test rows. Run the read-only migration inspector again and require `CURRENT`, 38/38, and matching checksums before activation. Any migration failure stops this sequence; no retry or rollback is automatic.

The preserved pre-migration dump is a recovery source, not permission to overwrite a schema. Validate a recovery copy into a fresh scratch schema first; choose a replacement/switchover only after reviewing state/data impact. Do not grant DROP to the app/migrator to simulate rollback.

Code rollback changes only the release pointer. The activation helper restores a previous release on failed health, or stops the service/removes `current` on a failed first activation. No database changes are reversed. Before any later deployment with a previous release, prove both versions accept the same migrated schema. Existing automated health covers liveness, not full DB compatibility; do not approve an incompatible deployment relying on automatic pointer rollback.

## Post-deployment test plan

Use a pinned SSH tunnel to the test host only, forwarding local `127.0.0.1:13301` to VPS `127.0.0.1:3001`. No Nginx, DNS, firewall or public exposure is required. Run `node --import tsx scripts/vps-test-readonly-smoke.ts http://127.0.0.1:13301` from `board-game`: API liveness, room-list shape, unauthenticated account 401, actual WebSocket transport reaching the server's authentication rejection. This script creates no guest/account/room and sends no gameplay commands. An unavailable transport must fail rather than masquerading as a successful auth rejection.

After separate approval for test data writes, use two newly created Guest test accounts and retain only their IDs (never cookies/session tokens in logs). Exercise Guest cookie/session recovery, HTTP/socket unauthenticated rejection, room create/join/viewer, two-player Ready, random red assignment/red first, legal moves, wrong-turn/illegal-move rejection, chat, resign/result/history/resource accounting, room leave and disconnect cleanup; repeat for Cờ Úp without leaking concealed pieces. Check DB persistence through authenticated APIs and `db:verify`; no direct production or historical-user edits. These actions create test users/matches/resource events and are not read-only. Do not auto-delete QA data.

CI already tests disposable MySQL migration twice/idempotence, schema verification, transactional smoke and account/API/socket integration. Keep those checks and security gates mandatory. Browser QA must additionally check actual animation/audio, mobile/desktop layout, replay and reconnect behavior. Native engine binaries/license/checksums and Google OAuth HTTPS origins remain separate readiness checks; do not claim them passed from unit tests or a loopback HTTP session.
