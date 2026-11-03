# HOVANG - AI Failure Log

<!-- HOVANG-FAILURE-PREVENTION-V1 -->

## 2026-11-01 - Lessons from FCM integration

| ID | Error | Root cause | Mandatory prevention |
|---|---|---|---|
| E001 | ZIP not found in Downloads | Artifact delivery was assumed successful | Prefer self-contained scripts; verify local file before running |
| E002 | Vietnamese project path corrupted | PowerShell 5.1 read UTF-8 without BOM | Use UTF-8 BOM for saved PS1 files; validate Unicode paths |
| E003 | Installer bundle path was null | MyInvocation was used inside a nested script block | Use PSScriptRoot at script scope or explicit verified paths |
| E004 | AccountService.hasUnlimitedEnergy missing | API method was invented without source verification | Verify real classes, methods, types and database schema before editing |
| E005 | Wrong backend entry point | Router mount was assumed to be in server/index.ts | Inspect server/app.ts and actual router registration |
| E006 | Source collection falsely reported empty | PowerShell variable scopes were mixed | Validate actual files instead of relying on incorrectly scoped counters |
| E007 | MySQL backup failed on Unicode path | mysqldump could not write to path containing Vietnamese characters | Use an ASCII-only database backup destination |
| E008 | Migration denied / journal left running | Runtime database account lacked DDL privileges | Check migration privileges, journal and schema; use controlled privileged migration |
| E009 | New patch produced TypeScript errors | Code was not validated against the actual project interfaces | Run typecheck and targeted tests before declaring success |
| E010 | Repeated installation attempts | Previous failures were not converted into permanent checks | Review this log and AI_WORK_RULES.md before each new batch |

## Rules for future incident records

For every new failure record:
- Date and affected roadmap step
- Exact error message
- Root cause supported by code or log
- Files and environment affected
- Whether any files/database were changed
- Backup and rollback location
- Fix and actual test result
- New preventive rule
- Status: open / fixed / verified

Never mark a fix as verified before seeing its real test result.

## 2026-11-01 15:51:46 - E011: Energy scheduler integration
- Earlier patch referenced nonexistent AccountService.hasUnlimitedEnergy.
- Root cause: code generated without checking actual AccountService methods.
- Fix: use energy_subscriptions.unlimited_until from migration 015.
- Preventive rule: verify real interfaces, migration schema and TypeScript before declaring PASS.
- Status: corrected source; runtime integration pending.

## 2026-11-01 16:15:25 - E014: Compatible Gradle JDK
- Problem: Gradle 8.14.3 failed with Java 25.
- Resolution: verified Microsoft OpenJDK 21 before build.
- Prevention: check actual JAVA_HOME and Gradle-compatible JDK before modifying Android assets.
- Result: Gradle build PASS.

## 2026-11-01 - Room-sound PowerShell path encoding failure
- Symptom: PowerShell could not locate the LOCAL project because UTF-8 Vietnamese path was read with the wrong script encoding.
- Cause: the previous .ps1 embedded Vietnamese characters without a Windows PowerShell-compatible encoding.
- Prevention: use ASCII-only scripts and decode UTF-8 path data at runtime, or save scripts as UTF-8 with BOM.
- Original patch failed before changing game source files.


## 2026-11-01 16:42:08 - E015 PowerShell variable scope
- Failed command: $script:lines.Add(...)
- Cause: $lines declared in nested scriptblock, but function referenced $script:lines.
- Fix: pass the collection directly to Add-ReportLine and Inspect-NetworkFile.
- Prevention: do not assume script scope equals a nested invocation scope.
- Result: Android network audit report generated.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-network-audit-fix-20261101-164206

## 2026-11-01 16:51:48 - E016 Android remote-IP dependency
- Failure: ERR_ADDRESS_UNREACHABLE after PC LAN IP changed.
- Root cause: server.url pointed at an unstable Vite LAN address.
- Fix: bundle UI in the APK, omit server.url.
- Prevention: inspect actual packaged Capacitor config in APK.
- Remaining risk: relative API and Socket.IO paths require separate backend connectivity design.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-bundled-final-20261101-165123

### 2026-11-01 - Lessons from previous room audio patches
- Do not assume downloads are in a fixed path or that Windows PowerShell 5.1 handles non-ASCII PS1 paths as UTF-8.
- Do not pass Vitest flags through npm exec without --; use node with Vitest entry point directly.
- Verify generated references exist before applying; run TypeScript and compare baseline tests; print success only if exit code is zero.
- On Windows run TypeScript with node node_modules/typescript/bin/tsc rather than spawnSync npm.cmd with shell:false.

## 2026-11-01 18:29:53 - E017 PowerShell automatic HOME collision
- Root cause: assigning Invoke-WebRequest result to $home.
- PowerShell variable names are case-insensitive and $HOME is read-only.
- Fix: use $homeResponse instead.
- Prevention: never assign to $home, $HOME or other automatic variables.
- Verified result: backend LAN preflight and Android APK build PASS.

## 2026-11-01 18:40:14 - FCM router shadowing
- Failure risk: /api/notifications router middleware matched /native/token.
- Root cause: more general Express router mounted before specific FCM router.
- Prevention: mount /api/notifications/native before /api/notifications.
- Validation: TypeScript and notification regression PASS.
- Note: actual device token binding still requires live verification.

## 2026-11-01 18:40:14 - FCM SQL diagnostic ambiguity
- Error: ER_NON_UNIQ_ERROR in read-only device inspection.
- Cause: unqualified enabled/created_at/updated_at in JOIN query.
- Prevention: prefix device fields with d. and user fields with u.
- Database was not modified.

## 2026-11-01 18:45:12 - Duplicate LOCAL backend
- Error: EADDRINUSE on 0.0.0.0:3001.
- Cause: another process was already listening on backend port.
- Prevention: inspect port ownership before launching FCM backend.
- Do not kill unrelated Node.js processes.
- No source, MySQL, VPS or APK changes.

## V6 repair failure
- V6 failed. Exit code: 1
- Patch script backup: C:\Users\NHAT HOANG\AppData\Local\Temp\HOVANG-CLOCK-V6-c6ae04a8b5b34b6fa2713dbd86289c12\hovang_clock_v6\patch.cjs.backup-20261101-185051

## 2026-11-01 18:51:23 - Backend health unavailable during FCM verification
- Previous event: HOVANG backend had started on port 3001.
- Next read-only health probe: connection refused/unavailable.
- Cause not proven by initial error alone.
- Recovery: check port ownership and start launcher only if port is free.
- Preventive rule: verify backend health before MySQL FCM checks; do not blindly kill Node.
- MySQL, APK and VPS unchanged.

## 2026-11-01 18:55:56 - FCM API 503 recovery
- Before restart: native FCM endpoint HTTP 503.
- Verified HOVANG backend ownership on port 3001.
- Restarted backend with existing LOCAL FCM launcher.
- After restart: native FCM endpoint HTTP 401 without cookie (expected).
- Real FCM sending remains disabled by launcher configuration.
- Android token registration still requires device verification.
- No APK, MySQL, VPS or source changes.

## 2026-11-01 18:59:03 - FCM registration was not retrying
- Symptoms: backend API previously returned 503; MySQL native FCM devices remained at zero.
- Source weakness: token binding attempted on account/token events only.
- Fix: bounded-frequency retry while Android app is active.
- Firebase device token acquisition still requires real device verification.
- No source token or secret is logged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-registration-retry-20261101-185848

## 2026-11-01 20:48:04 - FCM backend unavailable
- Health probes on port 3001 previously failed.
- Checked port ownership without terminating processes.
- LOCAL health: PASS after verification/recovery.
- Native FCM API unauthenticated POST: HTTP 401.
- No source, MySQL, VPS or APK modifications.
- Prevention: check backend lifecycle before diagnosing device FCM.
\
## 20261101-210315 - V6 clock audio troubleshooting\
- Earlier PowerShell runners failed during baseline validation.\
- Corrected runner to use explicit working directory and process exit code.\


## 2026-11-01 21:41:10 - V6.1 test mock incompatibility
- Error: TypeError sounds?.stopClockTick is not a function.
- Cause: V6.1 used optional object access but mandatory method invocation.
- Evidence: 9 move-sound tests failed after patch.
- Recovery: V6.1 source rollback reported successful.
- V6.2 correction: use optional method invocation.

## 2026-11-01 21:44:55 - FCM Vietnamese Unicode pipeline failure
- Previous assistant-provided script failed with Vietnamese Unicode was corrupted before sending.
- No real Push was sent by the failed run.
- Cause under investigation: PowerShell 5.1 pipeline text encoding or input corruption.
- Correction: use ASCII-only JavaScript source with Unicode escape sequences.
- Prevention: verify the actual UTF-8 payload in Node before submitting to Firebase.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-unicode-safe-20261101-214455

## 2026-11-01 22:32:35 - Ranking header fix
- Error: Expected one player header override, found 0. Source unchanged.
- Previous grid-template detection failed because the layout uses dynamic columns in compact mode.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ranking-header-fix-20261101-223235\RankingDialog.tsx

## 2026-11-01 22:33:45 - Ranking Center V2
- Failure: Player header inline left-align override not found exactly once
- Previous patch used an overly strict exact-string JSX match.
- Current patch matches the actual player heading element.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ranking-center-v2-20261101-223345\RankingDialog.tsx

## 2026-11-01 22:34:52 - Ranking header correction
- Error: Player-header left alignment not found. No changes.
- Previous V2 regex did not match the actual JSX style.
- New approach scopes the replacement to the single header line.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ranking-player-center-20261101-223452\RankingDialog.tsx

## 2026-11-01 22:40:49 - Profile baseline V2
- Error: Guard failed: expected 1 stats row, found 0.
- Source rollback attempted if modified.
- Prevention: exact JSX guards, backup, baseline alignment, typecheck.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.profile-baseline-fix-20261101-224048\PlayerInfoCard.tsx

## 2026-11-01 22:42:45 - Ready countdown sound patch failure
- Error: AUDIO TESTS FAILED: 1
- Restored source from: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ready-countdown-sound-20261101-224233
- Lesson: preparation countdown sound must follow room.readyCountdown, not game.phase playing.

## 2026-11-01 22:44:05 - V3 no-op
- V3 printed already present and exited without typecheck.
- Cause: the replacement produced identical source.
- Prevention: verify intended styles, and run typecheck even for no-op.

## 2026-11-01 22:45:46 - Ready countdown audio V2 failure
- Error: Countdown listener expected once, found 2
- Source rollback successful: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ready-countdown-audio-v2-20261101-224546
- Prevention: verify top-level React Hook placement and tests.

## 2026-11-01 22:48:09 - V2 verification bug
- Failure: Countdown listener expected once, found 2.
- Cause: verification counted both event subscription and cleanup.
- Previous V2 patch rolled back before testing.
- Prevention: verify addEventListener and removeEventListener separately.
- V3 backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ready-audio-v3-20261101-224752

## 2026-11-01 23:19:39 - Prior delete toast patch errors
- Previous attempts assumed toast markup existed; source search returned zero matches.
- Prevention: first detect whether UI exists, then update or create with guarded source anchors.

## PowerShell mobile-image audit V1 path failure
- Cause: shared variable name was overwritten during source traversal.
- Symptom: ReadAllLines attempted to read a filename from the PowerShell working directory.
- Impact: audit stopped before completing; no application code changed.
- Prevention: use distinct variable names and absolute FullName paths for file reads.
- Correction: V2 is read-only, validates file existence, and isolates per-file read errors.
## 2026-11-02 07:44:16 - V7 Replay Mode Button
- Error: GUARD [ReplayModeButton selection audio]: expected 1, found 0
- Root cause under investigation: desktop replay mode branches have different button positioning.
- Edited files: 
- Rollback successful: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.v7-replay-button-20261102-074415

## 2026-11-02 07:45:34 - V7.1
- Error: Unexpected position button classes: absolute left-1/2 top-[220px] -translate-x-1/2
- Previous V7 failure: exact JSX guard found zero matches.
- Rollback: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.v71-replay-button-20261102-074534

## 2026-11-02 07:55:58 - Create Group
- Error: GUARD [Biểu tượng tiêu đề]: expected 3, found 0
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.create-group-mobile-style-20261102-075558\MessagesCreateGroupPanel.tsx

## 2026-11-02 07:58:31 - Undo replay position
- Error: Desktop ReplayControls guard failed.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.undo-v7-position-20261102-075831\GamePage.tsx

## 2026-11-02 07:58:53 - Undo replay position
- Error: Desktop ReplayControls guard failed.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.undo-v7-position-20261102-075853\GamePage.tsx

## 2026-11-02 08:00:26 - V7.3 undo
- Error: Desktop normal replay controls: found 0, expected 1.
- Earlier error: desktop ReplayControls was matched using an incorrect guard.
- Prevention: match the exact desktop branch and validate before writes.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.v73-undo-20261102-080026\GamePage.tsx

## 2026-11-02 08:02:12 - Replay restore
- Error: Mobile replay layout validation failed.
- Previous assistant failure: incorrect exact JSX guards caused repeated STOP results.
- Prevention: verify backup and patch only the specific control region.
- Safety backup: D:\Học\code\code games\Cờ Tướng\board-game\.replay-undo-safe-20261102-080212\GamePage.tsx

## 2026-11-02 09:03:09 - Shared notice frame failure
- Error: Cannot overwrite variable HOME because it is read-only or constant.
- Backup: 
- Prevention: guard source anchors and preserve background ownership.

## 2026-11-02 09:06:47 - Image V2
- Failure: Chuyển đổi ảnh thất bại.
- Prior failure: sharp was unavailable.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.image-v2-backup-20261102-090615

## 2026-11-02 09:07:22 - Shared notice V2 failure
- Error: GUARD FAILED: Desktop notice frames - expected 2, found 1
- Previous assistant error: PowerShell HOME is a read-only automatic variable.
- Cause: using a case-insensitive variable name equivalent to HOME.
- Fix: use desktopSource, mobileSource and other unambiguous variables.
- Backup: 
- Source rollback attempted if changes had begun.
- Prevention: never use HOME or other PowerShell automatic variable names for temporary source content.

## 2026-11-02 09:09:47 - Shared notice V3 failure
- Error: No supported notice dialog found in MobileHome.
- Previous V2 error: assumed two desktop frames but source had one.
- Correction: inspect both Home sources and verify actual frame/button counts.
- Backup: 
- Rollback: restored modified source files when needed.

## 2026-11-02 09:12:49 - Shared notice V4 failure
- Error: GUARD: Mobile Home frame - expected 1, found 0
- Backup: 
- Source rollback: attempted if writes began.
- Prevention: use distinct desktop/mobile frame anchors within HomePage.tsx.

## 2026-11-02 09:15:22 - Previous V4 failure
- Error: Mobile Home frame expected 1, found 0.
- Cause: matching the entire CSS class string rather than the actual dialog ref.
- Correction: identify Home message dialogs by ref={home.messageRef}.
- Prevention: do not assume static layout class strings remain unchanged.
- V4 had stopped before modifying source.

## 2026-11-02 09:22:09 - Shared notice V5 failure
- Error: GUARD FAILED: OneChoiceNoticeStyles.ts already exists
- Backup: 
- Code write attempted: False
- Prevention: guard dialog structure, avoid fixed class strings, verify typecheck/build.
- Source rollback attempted if code was written.

## 2026-11-02 10:47:46 - Weekly shop avatar frame patch failed
- Error: STOP: Thiếu ảnh nguồn 1: C:\Users\NHAT HOANG\Downloads\HOVANG-WEEKLY-FRAMES-SHEET-1.png
- Scope:
  - src/lib/shopCosmetics.ts
  - src/pages/shop/ShopPage.tsx
  - src/pages/shop/ShopAvatarPreview.tsx
  - src/assets/shop/frames/weekly-custom/*
- Rollback attempted if files had been modified.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.weekly-shop-frames-20261102-104740

## 2026-11-02 11:00:51 - Weekly shop V6 failure
- Error: GUARD: avatar artwork overlay; expected 1 location, found 0
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.weekly-vien-v6-backup-20261102-110051
- Prevent: inspect source guards and asset source before retry; restore original on failure.

### 2026-11-02 14:02:15 - Codex toolkit installer
- Issue: PowerShell finally was executed separately.
- Cause: The try/catch block ended before finally was pasted.
- Impact: Final report generation did not run.
- Installation: Core tool installation reported successful.
- Prevention: Use one enclosing scriptblock for paste-once commands.
- Verification: See C:\Users\NHAT HOANG\HOVANG-CODEX-VERIFY-20261102-140210\REPORT.txt

- 2026-11-02 Home X sound lookup: initial rg used wrong MobileHome directory and a Windows wildcard path; reran on src/pages/home with --glob. No code/test/build failure. Use rg --files before unknown paths.

### 2026-11-02 14:30:35 - Graphify backend
- Error: unknown backend 'none'.
- Cause: Incorrect --backend none argument in previous guidance.
- Correction: Use --code-only with GRAPHIFY_BACKEND=none.
- Prevention: Verify installed CLI syntax before execution.
- Previous extraction did not complete successfully.

### 2026-11-02 14:34:38 - Graphify path quoting
- Error: path not found: C:\Users\NHAT
- Cause: Start-Process argument handling split a path containing spaces.
- Correction: Reuse and verify existing graph instead of rerunning extraction.
- Prevention: Preserve path arguments as single arguments and validate output first.
- Game source code modified: No.
- Verification report: C:\Users\NHAT HOANG\HOVANG-GRAPHIFY-VERIFY-20261102-143436\REPORT.txt

- 2026-11-02 Spinner task: PowerShell rejected brace-list paths; reran with explicit paths. Shop-page existing regression fails in jsdom (ResizeObserver absent); temporary mock exposed stale expected geometry784px vs1253px. Restored original test, no unrelated production edits. Targeted overlay/Home/create suites pass; report shop limitation honestly.

- 2026-11-02 queue/audio: PowerShell không hỗ trợ glob trong tên đối số rg, đã đổi sang thư mục + -g. Lượt test đầu9lỗi:3fixture mới dùng summary create thay snapshot (đã sửa),1audio gate ảnh hưởng local (đã giới hạn online);5assertion rooms cũ về start sau31s không khớp immediate-ready hiện tại, không sửa gameplay hoặc assertion cũ trong task. rooms.test.ts trả nguyên bản backup; final targeted55/55 PASS. Không tuyên bố toàn suite rooms PASS.

- 2026-11-02 owner-transfer: targeted36test có1fail cũ locked-room-moderation countdown mong20/thực21. Đã tạm khôi phục source backup trước task, chạy riêng ca đó vẫn fail21/20; finally trả source đã sửa, không thay test hoặc gameplay để che lỗi. Final35PASS/1skip ca legacy; build PASS.

- 2026-11-02 replay-X: lookup ReplayModeButton.tsx không tồn tại; component khai báo ngay trong ReplayControls.tsx, đã dùng đúng file, không tạo file mới.

- 2026-11-02 history filter: test draft dùng reason agreement không có trong type, đã sửa draw. Full saved-match-history6PASS/10FAIL ở query/hold/dialog; targeted2ca filter mớiPASS. Lượt kiểm owner riêng2FAIL query buttons trong dialog đóng; không thay UI/logic để ép qua. Không suy đoán baseline/fullPASS; build cuốiPASS.

- 2026-11-02 MatchIntro tests: ảnh avatar0 là sprite background, không phải img; đã kiểm portrait background+frame img. jsdom thiếu Element.animate, bổ sung mock WAAPI/cleanup thay vì sửa production. Tests4/4PASS. git diff-check báo CRLF như trailing whitespace, đổi file effect/hook mới về UTF8LF.

- 2026-11-02 rematch-visible: Get-CimInstance Win32_Process không được quyền truy cập CIM; không xác nhận tiến trình backend/watch từ kết quả đó và không tự restart. Code/test/build đã kiểm chứng riêng.

- 2026-11-02 persisted-rematch: socket test lần đầu trong sandbox lỗi websocket error,4suite còn lại32PASS. Chạy lại riêng socket ngoài sandbox có phê duyệt auto-review thì PASS1/1; không báo lỗi này là lỗi game. Bài học: test countdown phải mô phỏng observer DB đổi archive UUID, không chỉ repository RAM.

## 20261102-181010 - WebP V1 alpha verification failure
- Evidence: lao-quan-su-192-j8rYhxPo.png failed image verification.
- V1 rollback: PASS as reported by PowerShell.
- Root cause not yet proven: comparing hasAlpha flags can reject a valid conversion.
- Prevention: compare decoded alpha pixels and skip unsafe images.
- V2 uses an isolated preview-dist; original dist remains unchanged.


## 20261102-182842 - Home lazy optimization failure
- Error: Source patch failed
- Rollback: PASS
- Prevention: check exact AST, preserve original source and dist.
- Backup: C:\Users\NHAT HOANG\HOVANG-HOME-LAZY-20261102-182842


## 20261102-183640 - Audio trial V2 STOP
- Error: FFprobe verification failed
- No game assets or build changed.
- Prevention: verify dependency and complete conversion before applying assets.
- Trial: C:\Users\NHAT HOANG\HOVANG-AUDIO-V2-20261102-183640


## 20261102-184015 - FFprobe V2 verification issue
- Evidence: FFprobe printed its version but verification returned failure.
- Suspected cause: checking LASTEXITCODE after an early-closing output pipeline.
- Fix: capture full output and check the exit code immediately.
- Game source and dist unchanged.


## 20261102-184953 - MP4 optimization STOP
- Error: Resolution mismatch: 1790415895331_2137874395677077050_7229889354659670468.mp4
- Rollback: NOT REQUIRED
- Backup: C:\Users\NHAT HOANG\HOVANG-VIDEO-OPT-20261102-184953
- Prevention: verify media streams, duration, dimensions and backup before applying.


- 2026-11-02 slower-intro: first8suite35PASS/6FAIL:4fixture còn mốc1400/2300/800+500 đã đồng bộ token;2ca archive queue/auto-ready không thuộc thời lượng, không sửa assertion nghiệp vụ. Final6suite35PASS. Những fixture rooms/ui/computer đã đổi mốc token chưa chạy full các suite đó; không tuyên bố full-suite PASS.

- 2026-11-02 friend-energy: mở rộng match-like-persistence có1fail accounts.profile is not a function. Đã tạm khôi phục RoomPersistence từ backup trước task, suite đó vẫn1fail/5PASS; finally trả source mới. Không sửa nghiệp vụ để né mock cũ. Final5suite liên quan42/42PASS. Diff-check phát hiện extra blank EOF app/controller, chuẩn hóa EOF trong2file đang sửa.
- friend-energy build: ghi lại file log cũ bị khóa bởi process trước; chuyển sang friend-energy-delivery-build.log. Các log đều báo TypeScript/Vite built; phải kiểm exitcode trước bàn giao.
- friend-energy build follow-up: build có2bước WebP postbuild dài sau dòng Vite built. Các build chạy chồng đã lỗi ENOENT trong dist, không được xem dòng Vite built là toàn npm build PASS. Chờ các session cũ kết thúc rồi chạy một build cmd.exe riêng, không sửa script tối ưu ảnh ngoài scope.

- 2026-11-02 countdown-badge: diff-check Board.tsx báo CRLF là trailing whitespace sau ghi file trên Windows; ghi UTF-8/LF cho2component đang sửa và diff-check lại PASS. Không sửa layout ngoài phạm vi.
- countdown-badge build: lần1 Vite không resolve3PNG MatchIntro do asset đang thay đổi ngoài task; kiểm lại cả3file đã hiện diện, không sửa MatchIntro/asset. Chạy build lại sau khi nguồn có đủ, chờ hoàn tất cả postbuild trước bàn giao.

- 2026-11-02 layered-intro build: TypeScript/VitePASS, postbuild205ảnh xong nhưng finalpassENOENT heading-main-CA3Qfa8k.webp. Không sửa pipeline ngoài scope/không tuyên bố buildPASS. CIMprocessinventory bị hạn chế; không xác nhận nguyên nhân chồngbuild. Sau sessioncũEXIT1, chạy lại một cmd.exe build với log delivery riêng, chờexit.

## 2026-11-02 23:50:45 - Xuong ban preflight encoding error
- Cause: assistant packaged a UTF-8 PowerShell script without BOM.
- Windows PowerShell interpreted Vietnamese UTF-8 text using a legacy encoding.
- Symptom: unexpected token and unterminated string ParserError.
- Fix: rewrite existing script using UTF-8 with BOM and validate syntax.
- Backup: C:\Users\NHAT HOANG\Downloads\HOVANG-XUONG-BAN-ASSET\HOVANG-XUONG-BAN-PREFLIGHT.ps1.before-utf8-fix.bak
- Prevention: always validate generated PowerShell syntax and encoding before distribution.

## 2026-11-03 00:00:20 - Ready clock fix
- Error: GUARD Mobile clocks: expected 1, found 2
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ready-clock-fix-20261103-000020
- Source rollback attempted if modified.

## 2026-11-03 00:06:27 - Xuong ban blocked by missing server action
- Image asset exists.
- RoomUsersPanel and GamePage queue controls verified.
- No leave-seat action declaration found in scanned local TypeScript files.
- Source files unchanged.
- Previous assistant failures included invalid Sort-Object syntax and incompatible .ps1 encoding.
- Next implementation must update room command types, server-authorized seat transition, frontend and tests together.

## 2026-11-03 00:09:19 - Xuong ban auto fix failure
- Error: CODEX PATCH FAILED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\xuong-ban-20261103-000907
- Rollback completed: True
- Prevention: require actual source analysis and server-authorized seat transition.
- Do not replace queue logic with an unverified handler.

## 2026-11-03 00:09:44 - Laptop clock fix
- Error: GUARD: xác minh được 0/2 PlayerCard.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.laptop-clock-backup-20261103-000944\GamePage.tsx

- 2026-11-03 stand-up: session build từ lượttrước không còn trong exec registry; không suy ra exitcode. Đọc PNG bằng PIL không có thưviện, chuyển metadata sharp có sẵn ởboard-game; không cài dependency. Một lookup nhầm cwd lặp board-game đã sửa. Build hiện tại chạy riêng sau kiểm không có Vite/WebP khác.


## 2026-11-03 - Lệnh đầu typecheck sai working directory
- Lỗi: npm.cmd run typecheck trả ENOENT root/package.json.
- Nguyên nhân: chạy từ thư mục repo thay vì board-game/. Không có file nào bị đổi bởi lệnh này.
- Khắc phục: chạy lại typecheck từ board-game/, hoàn tất không lỗi.
- Phòng ngừa: chạy npm scripts từ đúng package directory.

- 2026-11-03 game-message-share: Serena transport closed, dùng lookup file trực tiếp; hai lookup tên file không có, không sửa file. Select-String -First không hợp lệ, bỏ query phụ. Typecheck phát hiện union contact thiếu thuộc tính ConversationItem; thêm annotation ConversationItem[] và typecheck lại PASS. Phòng ngừa: khai báo kiểu chung khi nối contact với conversation. Backup outputs/backups/game-message-share-20261103.

- 2026-11-03 share-navigation-clock: player-card-identity empty assertion expected null nhưng DOM hidden giữ geometry tồn tại theo quy tắc trước task. 11/12 targeted PASS; không tuyên bố full PASS.

- 2026-11-03 locked-demote-queue: ca cũ countdown expected20 received21; không đổi deadline để thỏa test cũ. Regression mới lượt đầu fixture tên quá10ký tự, sửa tên hợp lệ và chạy lại PASS.

## 2026-11-03 11:54:26 - VPS preflight PowerShell syntax error
- Previous preflight failed before build.
- Cause: used an if statement directly inside a format expression in Windows PowerShell 5.1.
- Impact: no VPS deployment and no game source modifications.
- Prevention: evaluate conditions into variables before using the -f format operator.

## 2026-11-03 11:58:11 - VPS preflight V2/V3
- Previous V2 failure: PowerShell treated Vite stderr output as a terminating error.
- The '[plugin builtin:vite-reporter]' line alone does not prove the build failed.
- Prevention: execute npm build as a separate process, capture stdout/stderr and evaluate exit code.
- V3 status: PASS
- No VPS changes.

## 2026-11-03 - VPS release packaging failure
- Target: 103.153.254.184
- Attempt 1: Windows tar.exe exited -1073741819 (0xC0000005).
- Attempt 2: ZIP source collection exceeded 500 MiB.
- Cause: packaging scripts used an overly broad source-directory scan.
- VPS changes: none in these failed attempts.
- Prevention: define and validate an explicit production allowlist,
  inspect required runtime assets and sensitive-file exclusions,
  then package only the required release contents.
- Inventory report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG_PACKAGE_SIZE_20261103-123629.txt
- Original log backup: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG_DEPLOY_LOG_BACKUP_20261103-123629

## 2026-11-03 - VPS release packaging failure
- Target: 103.153.254.184
- Attempt 1: Windows tar.exe exited -1073741819 (0xC0000005).
- Attempt 2: ZIP source collection exceeded 500 MiB.
- Cause: packaging scripts used an overly broad source-directory scan.
- VPS changes: none in these failed attempts.
- Prevention: define and validate an explicit production allowlist,
  inspect required runtime assets and sensitive-file exclusions,
  then package only the required release contents.
- Inventory report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG_PACKAGE_SIZE_20261103-123701.txt
- Original log backup: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG_DEPLOY_LOG_BACKUP_20261103-123701

## 2026-11-03 12:53:26 - Android shortcut prompt failure
- Error: EXISTING MANIFEST REQUIRES MANUAL COMPATIBILITY REVIEW
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\android-home-shortcut-20261103-125326
- Rollback: NOT REQUIRED
- Prevention: verify existing manifest compatibility, JS syntax, typecheck and build.

## 2026-11-03 12:58:04 - PWA V1 guard failure
- Cause: assistant incorrectly required an existing manifest to already contain icons.
- Result: guard stopped before source changes.
- Correction: preserve existing manifest and add missing icon entries.
- Prevention: do not treat optional manifest fields as an invalid manifest.

## 2026-11-03 13:03:13 - Official PWA icon failure
- Error: OFFICIAL LOGO NOT FOUND - NOTHING CHANGED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\pwa-official-icon-20261103-130313
- Rollback: NOT REQUIRED
- Prevention: verify original logo identity, aspect ratio, manifest icon paths and build before accepting changes.

## 2026-11-03 13:42:24 - Production PWA deploy attempt
- Error: VPS PREFLIGHT FAILED
- State: NOT CONFIRMED - CHECK REMOTE OUTPUT
- Report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-PWA-DEPLOY-20261103-134220\REPORT.txt
- Prevention: use immutable releases and verify deployment status before retrying.

## 2026-11-03 13:45:23 - PWA deployment preflight failure
- Previous batch failed at VPS PREFLIGHT FAILED.
- Cause not yet established; earlier batch hid the failing condition.
- Action: one consolidated read-only remote diagnostic.
- Diagnostic report: C:\Users\NHAT HOANG\HOVANG-PWA-DEPLOY-DIAG-20261103-134522.txt
- VPS changes: none in this diagnostic.
- Rule: report individual failing preflight conditions before attempting deployment.

## 2026-11-03 13:47:54 - PWA deploy V2
- Error: REMOTE ACTIVATION OR VERIFICATION FAILED
- Remote activation attempted: True
- Verified: False
- Report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-PWA-DEPLOY-V2-20261103-134740\REPORT.txt

## 2026-11-03 13:50:48 - PWA deploy V3
- Error: TAR PACKAGE CREATION FAILED
- Remote stage attempted: False
- Verified: False
- Report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-PWA-DEPLOY-V3-20261103-135047\REPORT.txt
- Rule: do not retry blindly after uncertain remote activation.

## 2026-11-03 13:52:54 - AdSense policy V1 test mismatch

- Cause: V1 removed the H5 bootstrap but updated only one of two assertions.
- Observed: 10/11 targeted tests passed; one assertion expected window.adBreak.
- V1 source rollback completed.
- Prevention: update all affected assertions and run targeted tests before build.
- V2 result: FAILED.

## 2026-11-03 13:53:26 - PWA V3 packaging failure
- V3 failed locally at TAR PACKAGE CREATION FAILED.
- No remote activation was attempted by V3.
- TAR failure details were not captured in the previous report.
- Correction: create a ZIP with explicit forward-slash entry names.
- Rule: validate archive entries locally before any production upload.

## 2026-11-03 13:53:37 - PWA deploy V4
- Error: REMOTE ACTIVATION OR VERIFICATION FAILED
- Remote stage attempted: True
- Production verified: False
- Report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-PWA-V4-20261103-135326\REPORT.txt

## 2026-11-03 13:58:05 - AdSense V2 PowerShell assertion bug

- Cause: incorrect use of PowerShell String.Split for substring occurrence checking.
- Effect: V2 stopped before applying any source changes.
- Prevention: use regex-escaped exact substring counting and validate both assertions.
- V3 status: PASS.

## 2026-11-03 - PWA deployment follow-up diagnostics
- Earlier V4 report: exit141 during Linux ZIP validation, before activation. SIGPIPE is a likely explanation, not confirmed without original pipeline. Old active release verified before retry.
- This task: sandbox SSH connect denied; authorized outside-sandbox SSH succeeded. Root-owned activator cannot be read by deploy user; this does not imply exact sudo invocation is unavailable (activation succeeded). rg unavailable; used PowerShell. Temp report found via original absolute path, not sandbox TEMP.
- Corrected package validation reads all entries and hashes. Deployment and independent HTTPS verification PASS; rollback not required. Report: D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-deploy-20261103-135717\REPORT.md


## 20261103-140427 - AdSense deploy dừng trước VPS
- Nguyên nhân: yêu cầu deploy nêu nhat_hoang/103.153.254.184//srv/cotuong/cotuong-test.service, trong khi AGENTS.md, DEPLOY-USER.md và deploy-vps.sh yêu cầu cotuong_deploy//var/www/cotuong/cotuong.service và từ chối tài khoản quản trị. Không thử SSH/SCP hay thay quyền.
- Phòng tránh: xác nhận một bộ thông tin môi trường chuẩn với repo/owner; giữ nguyên adapter/deploy account hiện hành, không bypass script guard. Báo cáo: D:\Học\code\code games\Cờ Tướng\board-game\outputs\adsense-deploy-20261103-140427/REPORT.md.

## 2026-11-03 14:11 - AdSense deploy bị chặn tại xác thực sudo tương tác
- Báo cáo trước `outputs/adsense-deploy-20261103-140427/REPORT.md` ghi dist/ads.txt thiếu; lần kiểm tra sau xác nhận file có và SHA-256 trùng public/ads.txt. Không tái hiện lỗi build; nguyên nhân chính xác của quan sát cũ chưa thể khẳng định ngoài kết luận cũ bị sai.
- SSH chỉ đọc xác nhận account nhat_hoang không thể traverse release, cần sudo để backup/deploy. Phiên `sudo -v` mở prompt nhưng không nhận được input, nên dừng trước mọi thay đổi.
- Phòng tránh: xác nhận prompt sudo tương tác đã được người dùng nhập thành công trước khi chạy lệnh đọc/ghi có đặc quyền; không dùng sudo -n, không đổi quyền và không chuyển qua deploy script chưa tương thích.
- VPS thay đổi: không có. Báo cáo: outputs/adsense-deploy-20261103-141144/REPORT.md.

## 20261103-141832 - HTTPS diagnostic correction
Sandbox DNS không resolve; lệnh kiểm tra thiếu ErrorAction Stop khiến hash null phát sinh lỗi tiếp. Các dòng Equal=false đó không phải khác biệt production. Kiểm lại qua SSH được cấp quyền, curl HTTPS thành công và hash khớp tất cả 10 file. Phòng tránh: fail-fast trước khi hash response. Sudo timestamp chỉ có hiệu lực trong terminal người dùng; không lặp yêu cầu mật khẩu khi có thể xác minh mục tiêu bằng HTTPS.

## 2026-11-03 - Loading install test isolation
- First targeted run 14/15: factory controller test shared window with the eager application singleton, which also prevented events. Source edits to existing files restored to backup before correction/reapplication; no production changes.
- Correction: disable application singleton in factory tests; assert session cooldown when storage is unavailable. Re-run required.


- Loading install follow-up: corrected isolated controller tests now16/16PASS; full buildPASS. Browser fixture responsivePASS and production HTTPS/hashPASS. No failed activation or rollback.


## 2026-11-03 - PWA immersive test URL loading
- Targeted run:4suites/20testsPASS; new suite could not collect because Vite/jsdom resolved import.meta.url asset URLs as non-file URLs.
- Existing edited files restored from backups before corrected reapplication. No deployment attempted.
- Correction: read exact project files via process.cwd() with the explicitly set working directory; rerun full targeted validation.


2026-11-03 Fairy VPS: fix script stopped before installation because current changed from 0ffcc17 to 5316513562c2ab653ba349edddaf99edda561e97. Symlink independently read by SSH; health ok/engine still missing. Updated explicit release guard and added running-process cwd check; do not bypass guard or restart game.

- PWA immersive correction verified:27/27testsPASS and fullbuildEXIT0. Deployment and independentHTTPS/hashPASS. No failed activation/rollback. Keep real Android system-bar QA marked NOT TESTED. Report D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-immersive-20261103-142638\REPORT.md.


## 2026-11-03 - Entry PWA gate diagnostics
- Root cause: EntryGate ignored visible invitation/native-prompt state and unmounted Loading when the one-second minimum/account loading completed.
- Patch tool initially rejected a combined delete/add of the same test path before applying any mutation; corrected with separate updates.
- A local whitespace guard treated git diff --no-index exit1 (normal differences) as a whitespace failure. Actual scoped --check output was empty; corrected check accepts normal diff status and rejects real check diagnostics. No application/test/build failure was found.
- Prevention: gate the UI transition independently of background readiness; retain a native-prompt state until completion, and invalidate stale completions on unmount.


## 2026-11-03 15:32:48 - Baseline diagnostic command failure
- Previous PowerShell command aborted while capturing Vitest output.
- Rollback had already been verified.
- Fixed by redirecting Vitest stdout/stderr to a separate file through cmd.exe.
- Current baseline test exit: 1

## 2026-11-03 15:41:45 - Room persistence patch failure

- Error: CANNOT VERIFY ROOM TEST FAILURES
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\room-persistence-fix-20261103-154137\backup
- Rollback: DONE
- Lesson: verify source structure and baseline tests before accepting a patch.


## 2026-11-03 15:54:13 - Release validation batch failure
- Previous batch: release-validation-20261103-155109.
- Typecheck exit code 1; build terminated with a Vite reporter exception.
- Previous command incorrectly passed --runInBand to the test script.
- Previous command did not isolate failures and did not provide sufficient visible progress.
- Corrective rule: do not pass Jest-only flags to Vitest; capture each command exit code independently, use time limits and visible progress, and never push when validation fails.
- No Git push or VPS changes were performed by that batch.
