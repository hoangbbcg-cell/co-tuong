# HOVANG - Mandatory AI Work Rules

<!-- HOVANG-FAILURE-PREVENTION-V1 -->

## 1. Before creating any batch

1. Read AI_FAILURE_LOG.md and this file.
2. Explain purpose, evidence, scope, expected result and risks.
3. Prefer one complete independent PowerShell batch.
4. Do not invent paths, methods, exports, SQL schemas or API mounts.
5. Check actual source before changing code.
6. Never require repetitive audits when available logs are sufficient.
7. When code is changed, create backup before editing.
8. Run TypeScript and relevant tests after editing.
9. Provide rollback and update AI_CHANGELOG.md.
10. Never mark untested work as completed.

## 2. PowerShell and Windows

- Use Windows PowerShell 5.1-compatible syntax.
- Save PS1 files using UTF-8 BOM.
- Use explicit paths and verify existence before executing.
- Avoid MyInvocation.MyCommand.Path inside nested script blocks.
- Do not rely on download success without local file verification.
- Prefer inline, self-contained commands over ZIP installers when feasible.
- Handle Vietnamese project paths correctly.
- Use ASCII-only locations for tools that cannot handle Unicode paths.

## 3. Backend and database

- Inspect real app entry and router mount points.
- Check class methods against source/type definitions.
- Verify MySQL target is LOCAL before database work.
- Back up before any DDL or data mutation.
- Check schema_migrations and table state before retrying failed migrations.
- Do not automatically restore entire databases.
- Never touch VPS or production without explicit authorization.

## 4. Firebase and Android

- Never put Firebase Admin private keys in APKs or ZIPs.
- Keep real sending disabled until explicitly tested.
- Confirm FCM tokens and account association before live delivery.
- Avoid unnecessary Android rebuilds.
- Build and install the final APK once after source integration whenever possible.

## 5. Failure handling

When a batch fails:
1. Use its log to identify the failure.
2. Do not repeat the same batch blindly.
3. Update AI_FAILURE_LOG.md and these rules when appropriate.
4. Repair the root cause rather than removing safety checks.
5. Provide the complete corrected batch, not scattered replacement lines.
6. Preserve exact backup and rollback information.
7. Only confirm PASS from actual results.

## 6. Roadmap

Maintain real statuses: pending, in progress, code PASS, integration PASS,
device verified, deferred.

Keep Admin event/maintenance notifications in the backlog.

- PowerShell 5.1 batch scripts containing Vietnamese path literals must be ASCII-safe (runtime UTF-8 decoding) or saved as UTF-8 with BOM to avoid mojibake.

\
- Run TypeScript and Vitest with explicit working directory, reliable exit codes, and timeout.\


## V6.2 - Audio mock compatibility
- When introducing or calling a method on an object used by tests, inspect compatibility with existing mocks.
- Object optional chaining does not imply optional method invocation.
- Distinguish sounds?.method() from sounds?.method?.().
- Run existing targeted tests before declaring completion.

## FCM / PowerShell 5.1 Unicode safety
- Avoid literal Vietnamese text in PowerShell pipelines to native executables.
- Prefer ASCII-only JavaScript source with Unicode escapes for FCM test messages.
- Validate actual UTF-8 bytes before any real send.
- Never automatically retry a failed FCM send.

## Ranking layout guard
- Inspect JSX inline styles and compact gridTemplateColumns before assuming a static Tailwind grid mismatch.
- Do not replace entire column templates to solve one text alignment override.

- For JSX alignment changes, avoid matching whole attributes as an exact string; validate the specific element and override before editing.

- For ranking JSX edits, verify the actual header line and scope replacements narrowly; stop on mismatches rather than guessing.

- Ready countdown: trace room.readyCountdown through GamePage before changing audio timers; never confuse preparation and match clocks.

- Never treat an unchanged patch as proof that the visual defect is resolved. Run verification and require visual QA.

- React event listeners: verify subscription and cleanup separately; a valid event name normally occurs twice in a useEffect.

- Before editing UI markup, verify that the component actually exists in current source. Do not infer successful application from an earlier supplied script.

- PowerShell audits: never reuse a source-path variable as a foreach/pipeline variable; always read through verified absolute FullName paths.

- Locate a JSX element by a unique semantic attribute and validate its scope before patching; do not assume exact attribute ordering.

- V7 replay: check whether a previous patch already changed positioning before matching old mt-[50px] classes. Use one stable parent for controls that must not move between modes.

- V7 replay: check whether a previous patch already changed positioning before matching old mt-[50px] classes. Use one stable parent for controls that must not move between modes.

- When restoring replay controls, match the complete desktop branch separately from mobile and position-trial branches before editing.

- One-button notice styling: share only frame/text/button; do not overwrite scene backgrounds or backdrop behavior.

- PowerShell: do not reuse automatic/read-only variables such as HOME. Use names like desktopSource/mobileSource. Guard source match counts before writing.

- Do not hardcode the number of repeated JSX structures without checking actual match counts per source file.

- Home notice patches: identify actual JSX dialogs by their ref and preserve backdrop tokens; do not hardcode full CSS class signatures.

- Weekly shop changes must be scoped to local week, tested, and restore both frontend/backend/assets on failure.

- WebP optimization: do not equate hasAlpha metadata with visible alpha pixels; keep previews isolated and verify dimensions, transparency and references.


- Do not pipe ffmpeg/ffprobe version checks through Select-Object -First 1 before checking LASTEXITCODE. Capture full output and verify the exit code immediately.


- Windows PowerShell 5.1: distribute Vietnamese .ps1 files using UTF-8 with BOM.
- Parse-check generated .ps1 scripts before running or distributing them.
- Do not claim a script passed execution unless its output confirms success.

- Do not replace queue controls with seat controls without verifying a server-authorized self-demotion command.

- For server-dependent room actions, require actual local source inspection and full integration tests before accepting a patch.

- Windows PowerShell 5.1: calculate conditional values before applying the -f format operator; do not embed if directly as a format argument.

- For deployment preflight on PowerShell 5.1, do not infer npm build failure from Vite stderr; check actual process exit code.

## Release packaging safety
- Do not recursively package the entire HOVANG worktree.
- Use an explicit, reviewed production-file allowlist.
- Include runtime assets and database migration files when required.
- Exclude local credentials, backups, development caches and runtime data.
- Validate package contents before upload.
- Do not automatically retry an ambiguous deployment failure.

## Release packaging safety
- Do not recursively package the entire HOVANG worktree.
- Use an explicit, reviewed production-file allowlist.
- Include runtime assets and database migration files when required.
- Exclude local credentials, backups, development caches and runtime data.
- Validate package contents before upload.
- Do not automatically retry an ambiguous deployment failure.

- PWA manifest patches must preserve existing fields, permit absent optional icons, validate build output and roll back on failure.

- PWA icon updates must use a verified local brand logo; never silently choose an unrelated image or overwrite existing branding without backup.

- When a branding asset is provided in chat but not addressable by a local script, require explicit Windows file selection instead of guessing a local path or filename.

- VPS deployment preflight must report each failed guard explicitly; never hide the reason behind a generic failure.

- Cross-platform archives must use explicit Unix-style entry paths, with archive integrity and required-file checks before upload.

- With pipefail, avoid short-circuit ZIP-validation pipelines (for example piping listings to grep -q/head); read and validate complete entries to avoid SIGPIPE/exit141.
- A root-owned activator may be unreadable/non-executable directly by deploy user while the exact sudo command is authorized. Do not require direct read/execute permissions or change VPS permissions to bypass this.
- For frontend-only release deployment, compare all non-dist files and symlink targets against the running release before activation; verify HTTPS payload hashes independently after activation.


- git diff --no-index can return1 for normal differences. Whitespace checks must inspect --check diagnostics and fatal exit statuses rather than treating every nonzero diff status as a source validation failure.


## Release validation safety
- Use Vitest-compatible arguments only.
- Run typecheck, build and tests with separate exit-code handling.
- Show progress and enforce a timeout on long-running tasks.
- Stop release if validation fails; inspect existing logs before rerunning.
