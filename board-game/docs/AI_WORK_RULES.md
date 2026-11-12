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

## 20261103-202710 - Engine migration safety
- Verify exact source patterns before engine replacement.
- Preserve legacy tests until migrated.
- Restore source files if validation fails.


## 20261103-202800 - Git preflight correction
- Use git rev-parse when repository verification is required.
- Do not use Test-Path .git as the sole repository check.
- Preserve and test source changes before deployment.


## 20261103-203111 - Patch rule
- Verify exact source, normalize line endings for multiline matches, back up before writing, restore after failed checks.


## 20261103-203234 - Engine patch rule
- Validate actual source with a bounded pattern before writing; keep backups; rollback after failed validation.


- For Windows PowerShell 5.1, deliver .ps1 files containing Vietnamese paths as UTF-8 with BOM; verify target before modification.

- Fairy test migrations must mock the same API actually called by useComputer, retain guards/backups and test exit codes, and avoid touching production engine configuration.

- Fairy migration: mock the actual fairyStockfishApi used by useComputer; do not spy on legacy pikafishApi. Guard test file and rollback on failure.

- Do not assume fixed 1301ms engine opening delay; check lastClockUpdate and real hook timing before patching tests.

- Do not assume fixed 1301ms engine opening delay; check lastClockUpdate and real hook timing before patching tests.

- V10 lesson: capture npm stdout/stderr to a file through cmd.exe and always preserve the exit code and failed test output in REPORT.txt.

- V10 lesson: run unmodified UI baseline before migration; distinguish pre-existing UI failures from Fairy migration; retain complete logs.

- V10 R3 lesson: do not use cmd.exe /s /c with fragile quoting; verify logs contain actual tsc/Vitest output before interpreting exit codes. R4 uses Start-Process stdout/stderr and exit code.
- React.lazy UI tests should settle the active route import within `act` before querying; `findBy` can hang when fake timers are enabled and lazy imports have not settled. Keep assertions tied to current user-visible flows.
- For JSDOM-only missing browser APIs such as `ResizeObserver`, add a minimal test setup fixture rather than changing application UI. Keep real-engine HTTP tests separate from sandbox runs when loopback is blocked, and report full-suite network failures distinctly from product regressions.
- After editing TSX tests, run the focused file immediately to catch syntax/import errors before the full suite; preserve exact test exit status and JSON/log artifacts.

- When HTTP/Socket integration tests fail with loopback errors under sandbox restrictions, preserve the baseline and re-run with local loopback enabled before classifying failures as product bugs. Keep environmental failures distinct from assertions that still fail after loopback is available.
- Before adjusting test expectations, compare them with current canonical product rules and implementation; fix stale fixture/expectation causes without deleting tests, weakening assertions, or changing gameplay to satisfy a test.

- Production deploy preflight must resolve the public site to the intended VPS and authenticate to that same host with an explicitly configured, authorized deploy identity before reading production state or creating backups. Do not substitute a test host, administrator user, or a different key when publickey authentication is refused.

### V15 SSH scripting rule (2026-11-04 00:40:26)
- Avoid nested node -e expressions passed through PowerShell and SSH.
- Capture native stderr separately on Windows PowerShell 5.1.
- Require explicit SSH exit code and completion marker.

### 2026-11-04 00:42:06 - PowerShell batch execution
- Create a complete standalone .ps1 for complex try/catch/finally logic.
- Parse the complete file before execution.
- Do not treat an incomplete diagnostic as deployment success.

- Zalo layout fixes: validate exact selector, preserve backup, test/build, rollback on failure, and require real-device browser QA.


### 20261104-190702 - Local audit portability
- Do not assume rg.exe is installed or on PATH.
- Prefer built-in PowerShell tools for portable read-only audits.

- Restore individual UI elements without reverting unrelated approved changes.


- Build scripts must judge native tool success by process exit code; capture stderr separately without terminating on warnings.

- When full-suite tests fail after a narrow patch, measure baseline before modification; compare exact failed tests and clearly report remaining failures. Never label full suite PASS if any tests fail.

- 2026-11-05 18:54:11 PowerShell script delivery: use ASCII-only script source for PowerShell 5.1 or validated BOM encoding. Avoid ambiguous variable-colon interpolation. Check syntax before distribution.

- 2026-11-05 19:45:39 Do not interpolate $variable immediately followed by a colon in PowerShell. Use ${variable} or separate text.

- 2026-11-05 20:07:05: Prefer directly pasted PowerShell commands; avoid unnecessary script downloads. Guard, backup, build, rollback and log code changes.

- 2026-11-05 21:16:48: Uu tien gui lenh PowerShell day du trong chat khi co the; khi sua UI ReplayControls thi chi sua dung file src\features\game\components\ReplayControls.tsx, backup truoc, build sau, rollback neu loi.

- 2026-11-05 21:25:08 - Uu tien gui lenh PowerShell day du trong chat; khi sua ReplayControls thi backup truoc, build sau, rollback neu loi, va chi sua dung phan duoc yeu cau.

- PowerShell multi-line patches must be wrapped in one complete scriptblock.
- Never run a detached finally block.
- Verify current source before reapplying a patch.


## 2026-11-05 21:54:44 - HOVANG-ASSISTANT-ERROR-LESSONS-20261105

Mandatory rules:

1. Every assistant-caused failure must be recorded.
2. Explain root cause and prevention before repeating work.
3. Use PowerShell 5.1 compatible syntax.
4. Never use unescaped variable-colon expressions.
5. Check tool availability before invoking tools.
6. Prefer direct paste-and-run commands over downloads.
7. Preserve source with backup and verified rollback.
8. Separate typecheck, Vite, tests and post-build results.
9. Record actual results, never assume PASS.
10. Update AI_CHANGELOG.md after successful source changes.
11. Avoid repeating previously documented errors.

- Capture npm/Vite build output on Windows PowerShell 5.1 using Start-Process with separate stdout and stderr files, and check ExitCode.
- Do not treat stderr warnings as proof of build failure.


- Ranking tab reuse: prefer existing original PNG assets and selectedImageTabGlow over recreating them with CSS; validate both screens and preserve business logic.

- Variant isolation: keep province, room filters and quick-play preferences independent; never combine Xiangqi and Jieqi counts. Test both variants before deployment.

- When extending a hook used by existing tests, preserve backward-compatible arguments or update all callers deliberately. Verify with TypeScript and targeted tests.

- Elo rank badge changes must not alter per-mode Elo, settlement or match rating.
- Guard every replacement before writing and rollback on failed validation.


- Online animation fixes must be checked against server snapshots, old move markers and computer-mode isolation.
- Use source guards, backups and automatic rollback when an online animation patch fails verification.


- React Testing Library renderHook tests must use a DOM-capable environment such as jsdom.
- Online animation patches must pass targeted tests, TypeScript, build and visual QA before being declared fully fixed.


## SIDE-ROW-EXACT-CSS-GUARD-20261106
- Previous replay side-row patch failed because an exact CSS class was assumed.
- Inspect actual JSX before editing; do not guess complete class strings.
- Patch only the verified selector region with bounded guards.
- Verify red and black controls, icons, toggle handlers, and responsive layout.
- Backup, test, rollback, and log actual results.

- Never overwrite an existing regression test without backing it up.
- For online animation fixes, test both move snapshots and clock-only snapshots.
- Declare success only after targeted tests, typecheck, build and browser visual QA.


- Online avatar/rank fixes must not display another player's cached profile.
- Preserve avatar and rank visuals during temporary data gaps instead of hiding them.
- Keep game Elo rules and avatar artwork unchanged.
- Validate source changes with targeted tests, typecheck, build and visual QA.


## MESSAGE-ICON-POWERSHELL-GUARD-20261106
- Do not use expandable PowerShell strings for JSX template literals.
- Verify complete JSX blocks before replacing them.
- Guard patch counts and compare the complete expected result.
- Report UPDATED only after verified writes and successful tests.

## MOBILE-CHAT-ENTRANCE-LAYER-20261106
- A disabled button remains visible during entrance animations.
- Portals rendered in document.body can appear above clipped room content.
- Gate mobile chat toggle rendering with entrance state instead of
  changing global z-index values.
- Preserve existing chat handlers, icons and panel behavior.

## CHAT-HEIGHT-EXACT-GUARD-20261106
- Check exact class fragments against real source before patching.
- Limit visual changes to the intended responsive layout.
- Verify source differences and test results before declaring PASS.

- Compare actual WebView rendering separately from normal Chrome rendering.
- Do not alter working Chrome Home geometry to fix an in-app browser issue.
- Limit WebView layout overrides to the specific affected component.
- Do not mark a mobile UI fix complete before Facebook/Zalo visual QA.


## 2026-11-06 13:50:43 - PowerShell batch safety
- Keep PowerShell logical operators inside a complete Where-Object condition.
- Validate test discovery before invoking npm.
- Treat test/build failure as a rollback condition.
- Confirm Facebook/Zalo visually before accepting any WebView UI fix.


## 2026-11-06 13:51:40 - Jieqi captured layout safety
- Desktop and mobile captured indicators may need different positions.
- Keep Jieqi capture display separate from toolbar positioning.
- Move mobile toolbar only after locating the exact 4-button container.

### V7 lesson - PowerShell and Vite
- Capture native command output without allowing warnings to abort before checking LASTEXITCODE.
- Preserve the existing dist by renaming it before restoring a verified backup.
- Never claim rollback PASS unless source and dist hashes are verified.

## 2026-11-06 13:58:05 - Build validation and WebView
- A post-build optimization threshold stop is not the same as a Vite compile error.
- Do not disable or reduce the 5 MiB optimization threshold.
- Report project build and independent Vite build separately.
- Keep working Chrome layout intact when targeting Facebook/Zalo.
- Require real Facebook/Zalo visual QA before declaring the UI fixed.


### Free energy patch guard lesson
- Match multiline code with CRLF/LF tolerant patterns.
- Require exactly one match before applying a replacement.
- Capture native build output separately and check exit code.
- Preserve failed dist before restoring backup.

- For Jieqi capture UI follow-up changes, patch only CapturedJieqiPieces.tsx unless the request explicitly changes V2 private/public capture data rules.

- Reuse the existing EnergyDialog when adding new energy entry points.
- Show current energy from the session store; do not hardcode player energy.
- Keep the mobile Leave button and desktop top-right tools usable.
- Verify desktop and mobile UI before accepting a new game control.


- Verify desktop and mobile button placement separately.
- Do not assume Flexbox order guarantees visibility in a crowded room header.
- Preserve the working mobile energy control when correcting desktop placement.
- Require visual confirmation before declaring the desktop button fixed.


- Viewer Ready UI must use server room.readyCountdown; never give a spectator a Ready command or a separate timer; playback reuses existing tick sound with browser gesture restrictions.

- Before modifying a component from an earlier patch, verify the component exists.
- Never infer that a previous patch succeeded solely from a UI report.
- Do not insert duplicate GamePage imports or component instances.
- Preserve existing payment logic when adding UI entry points.


- Preserve existing game energy controls when changing energy seating rules.
- Verify both component existence and GamePage imports before follow-up UI patches.
- A read-only audit cannot remove source code; investigate rollback and active build separately.


- Verify current source content rather than assuming previous component existence or hash.
- Do not duplicate an existing energy button.
- Preserve all other modifications in GamePage.
- Restore only missing references/components, with backup and rollback.


- Check optional TypeScript values before passing them to required component props.
- Preserve existing GamePage modifications when restoring UI.
- Never overwrite an existing energy component without inspecting it.
- Require targeted tests, typecheck and build before accepting source patches.


## 2026-11-06 16:32:11 - Room realtime safety
- Match source anchors against the actual current files.
- Preserve 60-second reconnect and game rules.
- Avoid emitting lobby updates on clock-only ticks.
- Compare focused test results with baseline.
- Require multi-browser QA before marking feature complete.


- Start finished-match grace periods from the server completion timestamp.
- Do not show Ready during the five-second post-match result window.
- Never change a locked-room owner's energy eligibility without preserving room ownership semantics.
- Protect GameEnergyControl and payment integration during seating changes.
- Do not declare multiplayer behavior verified based solely on build/test.


- Verify source files at execution time before dependent feature changes.
- Preserve Git working-tree changes and never reset unrelated files.
- Ready must be hidden and rejected by server during the five-second post-match grace.
- Do not allow queue rotation before that grace elapses.
- Keep payment and authentication untouched.


- Energy ad placeholder: never leave client-side claim endpoint wired behind an unavailable-ad message. Protect payment checkout; update only scoped EnergyDialog and test/rollback.

- Energy ads placeholder must reuse the shared one-choice notice UI used in Home (oneChoiceNoticeDialog and oneChoiceNoticeButton), not invent a distinct modal. Preserve no-energy-reward behavior.

- Keep Owner Seat must be disabled by default.
- The server must authorize every locked-room settings change.
- Keep Owner Seat must not become an energy exemption.
- Do not touch GamePage or GameEnergyControl when changing room settings.
- Check win, loss, draw, no queue, and feature-disabled behavior.


- Energy ads placeholder must reuse the shared one-choice notice UI used in Home (oneChoiceNoticeDialog and oneChoiceNoticeButton), not invent a distinct modal. Preserve no-energy-reward behavior.

- Never alter baseline locked-room seating behavior when Keep Seat is disabled.
- Test feature-on and feature-off modes independently.
- Preserve the five-second post-match window and energy eligibility.
- Protect GamePage and GameEnergyControl during locked-room settings work.


- Energy ads placeholder must reuse the shared one-choice notice UI used in Home (oneChoiceNoticeDialog and oneChoiceNoticeButton), not invent a distinct modal. Preserve no-energy-reward behavior.

- Energy ad notice visual specification: dark-brown centered rectangular overlay, gold one-button 'Đóng', as in screenshot provided 2026-11-06; do not substitute generic one-choice notice styles.

- Post-match queue rotation must use the queue snapshot at that match's completion.
- Late joiners must not enter the earlier match's replacement window.
- Preserve Keep Seat, five-second grace and energy eligibility.
- Maintain separate tests for normal rooms, locked rooms, before-finish and after-finish queueing.
- Never modify GamePage or energy button for this server-only rule.


- Keep Seat owner must not be demoted solely due to zero energy.
- Zero energy still blocks Ready and starting another match.
- Late queue members cannot replace players for an earlier match.
- Three-second wait starts only after both result-presentation acknowledgements.
- Never reset the same deadline on duplicate acknowledgements.
- Opponent-energy notification dismissal must not mutate the match.
- Preserve unrelated 5000ms timers and existing energy UI.


- Before replacing test timing literals, verify their total occurrence count.
- Never assume a test boundary appears only once.
- Preserve all unrelated source files and verify protected hashes.
- Queue rotation uses the queue captured at match completion.
- Three-second post-result wait and depleted-owner Keep Seat must be tested together.
- Do not deploy to VPS without LOCAL validation.


- In-game energy recovery tooltip: hover desktop; hold on mobile; quick tap must retain EnergyDialog action; follow store recovery epoch.

- Before replacing test timing literals, verify their total occurrence count.
- Never assume a test boundary appears only once.
- Preserve all unrelated source files and verify protected hashes.
- Queue rotation uses the queue captured at match completion.
- Three-second post-result wait and depleted-owner Keep Seat must be tested together.
- Do not deploy to VPS without LOCAL validation.


- Before replacing test timing literals, verify their total occurrence count.
- Never assume a test boundary appears only once.
- Preserve all unrelated source files and verify protected hashes.
- Queue rotation uses the queue captured at match completion.
- Three-second post-result wait and depleted-owner Keep Seat must be tested together.
- Do not deploy to VPS without LOCAL validation.


- The 3000ms postmatch timer starts when the match ends, not after result presentation.
- Queue eligibility is captured at that same instant.
- Result presentation acknowledgements cannot restart the 3000ms timer.
- Avoid changing existing energy regression expectations to force PASS.
- Preserve Keep Seat, energy UI, viewer Ready visibility and unrelated timers.


- The 3000ms postmatch timer starts when the match ends, not after result presentation.
- Queue eligibility is captured at that same instant.
- Result presentation acknowledgements cannot restart the 3000ms timer.
- Avoid changing existing energy regression expectations to force PASS.
- Preserve Keep Seat, energy UI, viewer Ready visibility and unrelated timers.


- Clicking Ready must not restart an already active countdown.
- Keep the server deadline stable through finished -> ready.
- Keep Seat UI cleanups must not alter its toggle or behavior.
- Protect queue snapshot and 3-second postmatch timing.


- In PowerShell interpolation, use ${name} before a literal colon.
- Check full batch syntax before delivering runnable commands.
- Never change HOVANG production behavior to force legacy tests to pass.
- Use exact source anchors and rollback on regression failure.


- For PowerShell string replacements, use exact guarded spans.
- Never concatenate quoted arguments in a way that changes
  the positional parameters of a replacement function.
- Check targeted tests before accepting any test-only patch.
- Preserve existing LOCAL gameplay rules and protected source.


- Check Ready test timing against the actual 1-second start delay.
- Do not alter game behavior to satisfy obsolete test clocks.
- Preserve original source and roll back on required-test failure.


- Preserve the user-confirmed LOCAL gameplay behavior.
- Queue eligibility is captured at match completion.
- The 3000ms postmatch gate starts at match completion.
- A late queue entry cannot replace seats for that result.
- The Ready clock must not restart when a player readies.
- Test leaving-game results against the durable archive
  when the live game state has already been reset.
- Never weaken meaningful assertions to force PASS.
- Require full suite, typecheck and build before VPS deployment.


- Do not assert that an occupied player appears in viewers.
- Do not let a test cancel its own queue eligibility when
  verifying a finish-time queue snapshot.
- Test rotation at 3000ms after match completion.
- Never change production gameplay to force test PASS.
- Full suite, typecheck and build must pass before VPS deployment.


- In time-dependent tests, set the clock before the event
  that records its timestamp, not afterward.
- A finished match at 20000ms reaches the 3000ms gate
  at 23000ms.
- Preserve queue eligibility snapshot at actual finish.
- Verify all tests, typecheck and build before VPS deploy.
- Roll back the entire patch when mandatory checks fail.


- Welcome announcement links: exact-match guard, backup, build verification, and rollback on failure; never change unrelated social links.


- Link-only builds: check baseline first; save complete build logs; back up source and dist; rollback on failure.


- PowerShell rule: when a variable is immediately followed by colon in an interpolated string, use ${variable} to avoid a parser error.

- Safari compatibility work: verify native API is preserved, isolate fallback in public asset, run smoke tests and rollback on failure.

- Host seat replacement: only moderate/promote by authorized room owner may give the displaced seat occupant queue priority 1; manual demote remains View. Guard server branch and verify queue order with tests.

- Host seat queue tests: use short valid player names and test replacement order without modifying automatic rotation.

- For isolated host queue changes: test the owner promote path, demote isolation, FIFO/priority, permissions and room regressions. Preserve unrelated match-saving behavior; establish a baseline before attributing pre-existing failures.

## Computer UI patch safety
- Use explicit computerMatch conditions.
- Preserve online, replay and custom-position flows.
- Require source guards, backup, tests and rollback.


## Computer UI patch rule
- Verify baseline test failures before UI edits.
- Use exact source guards and deep equality for serialized state comparisons.
- Preserve backups and rollback both source and test changes on failure.


## Computer UI V3 safety
- Check GameTools callback types before modifying props.
- Do not pass undefined to required callbacks.
- Hide friends using showMatchTools.
- Preserve exact guards, backup and rollback.


- PowerShell Sort-Object multi-key ordering must use valid -Property expressions. Never append another property after -Descending with a comma. For mobile JSX layout patches, use exact-match guards and verify laptop variants remain intact.

- Mobile replay: isolate the top navigation/tool frame from the Red/Black machine switches; preserve native desktop layout and all original event handlers.

- When adding JSX rendering modes, update the prop union before writing dependent comparisons and usages; run TypeScript after patch and rollback on failures.

## 20261107-233323 - JSX swapping
- Do not rely on the first occurrence of a JSX variable name.
- Avoid regex that stops at the first nested closing tag.
- Match complete anchored JSX blocks and verify the swap is reversible.
- Run typecheck, tests and build before marking success.

## 20261107-233449 - Safe JSX group relocation
- Use exact source-backed line anchors for UI group relocation.
- Preserve complete JSX blocks and event handlers.
- Verify reconstruction of the original source before writing.
- Require typecheck, tests and build after changes.

## 20261107-233550 - Minimal JSX relocation
- Prefer moving one render line when it preserves the entire component.
- Verify exact source reconstruction before writing.
- Keep unrelated modes, handlers and artwork unchanged.
- Run typecheck, tests and build after modifying code.

### 2026-11-07 23:40:55 - PowerShell external tool execution
- Do not treat Vite/npm stderr output alone as a failed build.
- Capture stdout, stderr and process exit code separately.
- Require exit code zero for TypeScript, Vitest and build.
- Preserve test logs and rollback source changes on failure.

## 20261107-234303 - JSX reorder verification
- Prefer one exact matched region for JSX-only reordering.
- Preserve untouched source prefix and suffix.
- Back up before writing; verify with tests and build.
- Roll back automatically on failure.

- HISTORY ROOM: Guard exact code anchors; backup before writing; rollback on test failure; never infer browser QA from build.


- When an exact anchor occurs multiple times, verify and declare its expected count; never silently skip the guard.


- Native test/build commands: capture stdout and stderr separately; decide PASS/FAIL using process exit code.

## PowerShell native process handling - 20261108-223140
- Do not treat stderr alone as a failed test.
- Capture stdout, stderr and actual process exit code.
- Require successful typecheck, Vitest and build.
- Verify rollback integrity after a failed patch.

## Back Replacement V7 - 20261108-223539
- Check baseline TypeScript errors before blaming a patch.
- Use process exit codes for tests.
- Require file hashes to verify rollback.

## PowerShell V8 - 20261108-223812
- Avoid reserved automatic variable name Args.
- Pass explicit arguments into Start-Process.
- Compare baseline and post-patch TypeScript errors.
- Verify rollback by file hash.

## Back V9 - 20261108-224548
- Failure: BUILD FAILED: 1
- Verify current source before applying patches.
- Do not attribute baseline test errors to new changes.

## WebP postbuild V11 - 20261108-224915
- Failure: JS-SYNTAX FAILED (exit 1)
- Avoid reading unreferenced stale image paths.
- Never silently skip a referenced missing asset.
- Investigate concurrent build processes if ENOENT persists.

## WebP V12 - 20261108-225032
- Error: PRODUCTION-BUILD FAILED (exit 1)
- Run Node syntax checks from scripts directory.
- Avoid unquoted paths with spaces in Start-Process.
- Preserve source backups and verify rollback hashes.

## 20261109-080826 - Popup layering safety
- Check stacking contexts and overflow before increasing z-index.
- Keep desktop and mobile changes scoped separately.
- Failed checks require rollback and browser QA remains pending.

20261109-081823: Compare Vitest failures using structured JSON, not console FAIL-line patterns.

20261109-082059: For isolated Vite builds, capture stdout/stderr separately and use the actual process exit code.

20261109-082312: Use normalized test-name sets when comparing Vitest JSON failures; avoid nested PowerShell arrays.

20261109-082550: Use normalized test-name sets when comparing Vitest JSON failures; avoid nested PowerShell arrays.

## 20261109-081522 - Room users layering
- Preserve eye-button toggle and visibility of custom room controls.
- Preserve queue/stand-up footer controls.
- Do not accept failed regression tests without investigation.

## 20261109-083905 - Room users desktop positioning
- Guard desktop panel and custom controls before patching.
- Preserve View close behavior when changing stacking order.
- Preserve mobile layout and queue/stand-up actions.
- Roll back on failed typecheck, targeted test or build.

## Mobile View Alignment - 20261109-083937
- Error: BUILD FAILED
- Preserve horizontal centering and mobile-only scope.
- Verify source guards before changing positioning.

## 20261109-084007 - PowerShell JSX guard
- Use literal single-quoted strings for JSX class guards.
- Avoid double-quoted interpolation of JSX expressions containing dollar signs.
- Require unique matches before editing.
- Roll back on failed checks.

## Mobile View Elo V2 - 20261109-084446
- Failure: VIEW GUARD FAILED: 0
- Verify layout guards and rollback hashes.
- Use measured Elo geometry instead of pixel guesses.

## Top Gold Buttons V1 - 20261109-091644
- Failure: GUARD FAILED: sound button not found
- Keep UI color changes isolated from behavior changes.
- Verify rollback by file hash.

## 20261109-091806 - Trial result safety
- Trial checkmate must show victory regardless of side.
- Never change actual game winner to fake a UI result.
- Keep online/computer/replay result logic unchanged.
- Preserve the checkmate animation completion callback.
- Always back up and roll back on failed checks.

## 20261109-093226 - Computer clock safety
- Disable both periodic clock tick and move-time charging.
- Do not modify shared online clock rules.
- Preserve AI computation timers.
- Require typecheck, tests, build and rollback.

## 20261109-095330 - Clock modification safety
- Verify baseline test failures before attributing them to a patch.
- Keep online clock and AI computation timeout unchanged.
- Always backup and rollback on required-check failure.

## 20261109-095552 - Safe test execution
- Capture external command stdout and stderr using cmd.exe redirection.
- Evaluate the process exit code, not stderr text alone.
- Roll back source when a required test or build fails.

## 20261109-100624 - Vitest teardown safety
- Run teardown-sensitive render tests separately.
- Do not ignore Vitest exit code.
- Never mark excluded tests as full-suite PASS.
- Protect assets when build scripts may optimize images.

- iPad V3: Do not treat existing baseline Vitest failures as canvas regressions; prevent concurrent builds and verify rollback.


### 2026-11-09 13:51:38 - Tablet V6
- V6 generated invalid Tailwind custom-variant selectors.
- Build completed with CSS selector warnings.
- PowerShell finally block was executed separately.
- Restored desktopCanvas.tsx and index.css from V6 backup.
- Current pre-rollback state: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v6-before-rollback-20261109-135138
- VPS not touched.


- PowerShell npm/Vitest checks must use process exit codes; do not treat stderr output alone as a failed test.


- Avoid PowerShell automatic variable names such as Args for function parameters.
- Check actual process exit codes and verify rollback with SHA256.

- Computer resign patch: verify the exact actionProps source before replacement; rollback on test/build failure.


- On Windows, avoid passing unquoted paths with spaces to Start-Process ArgumentList.
- Prefer stdin for Node.js syntax checks and use process exit codes for npm checks.

- Do not run concurrent builds against the same dist directory.
- Check build process conflicts before modifying files.

## HOVANG PERMANENT MEMORY RULE V1

1. Before any task, read AI_WORK_RULES.md, AI_FAILURE_LOG.md,
   AI_CHANGELOG.md and AI_PROJECT_MEMORY.md.
2. Reuse verified findings. Do not repeat completed audits
   without a concrete reason.
3. Before editing, state exact files, before/after,
   expected impact, unchanged features and risks.
4. Every failure must have a durable record:
   symptoms, evidence, root cause when known,
   resolution, prevention and verification.
5. Every real code change must have a changelog:
   changed files, backup, tests, build, rollback
   and browser QA status.
6. Never record a suspected cause as confirmed.
7. Guard, backup, test and rollback are mandatory.
8. LOCAL ONLY. Never deploy to VPS without
   separate explicit approval.
9. Preserve completed fixes unless a new defect
   is supported by evidence.
10. Read existing logs before requesting a new audit.

- Windows tar.exe: use an ASCII-only staging and archive path for HOVANG; verify tar exit code and archive contents before upload.

## Build validation distinction
When npm run build fails, inspect whether Vite itself failed or
a postbuild step failed. Never label a successful Vite build as
a frontend compile failure. Do not bypass production size guards.

- iPad canvas QA: Windows ESM imports of external tooling need file:/// URLs, not drive-letter specifiers. Keep browser/loopback environment failures separate from application assertions; do not claim device QA from jsdom or fit arithmetic alone.
