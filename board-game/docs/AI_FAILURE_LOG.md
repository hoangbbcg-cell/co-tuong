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

## 2026-11-03 - Source publication validation
- Initial sandbox GitHub auth lookup falsely reported invalid token due network restrictions; authorized network lookup authenticated correctly.
- Git index lock contention interrupted stage/commit; verified state before retry, no hook bypass. Windows CRLF caused whole-file merge conflicts; normalized three-way resolution retained master ops and local gameplay.
- Untracked workflow blocked merge; backed up before using upstream tracked workflow. One fixture-update command had duplicate board-game cwd prefix; corrected before writing.
- Sandbox test/npm runs stalled; canceled before source merge or dependency changes, ran verification outside sandbox. Initial full result: 66 failing tests, no successful full baseline.
- Build failed MODULE_NOT_FOUND sharp: dependency was used by postbuild but not declared. Added pinned dev dependency, full build then exit0. Do not deploy when CI/tests remain failing.
- Wrong generic SSH key could not log in as deploy account; used existing dedicated cotuong_vps_test_deploy key successfully. No remote state changed.

## 20261103-202710 - Fairy migration failure
- Error: Không tìm thấy Git repository.
- Source rollback attempted: False
- GitHub/VPS unchanged.


## 20261103-202800 - Fairy migration V2
- Error: Computer engine : expected 1 match, found 0
- Rollback attempted: False
- Earlier batch incorrectly required a .git directory.
- Rule: Do not assume Git metadata is a directory or present in every working copy.
- Rule: Validate exact source patterns before modifying files.


## 20261103-203111 - Fairy migration V4 failed
- Error: computer engine branch expected once, found 0
- Source restored: False
- Prior V2 failed because multiline match used incorrect indentation.


## 20261103-203234 - Fairy migration V5 failure
- Error: [33m[plugin builtin:vite-reporter] 
- Source rollback attempted: True
- Previous V4 failed on an overly strict multiline match; V5 uses a bounded branch pattern.


- 2026-11-03 20:47:36: FAIRY V7 Unicode fix failure: HINT_TEST failed: exit 1; see C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V7-UNICODE-20261103-204725\HINT_TEST.log. Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V7-UNICODE-20261103-204725\REPORT.txt

- 2026-11-03 20:53:45: FAIRY V9 failed: COMPUTER_TEST failed (exit 1); log: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-20261103-205333\COMPUTER_TEST.log. Changed test rollback attempted: True. Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-20261103-205333\REPORT.txt

- 2026-11-03 20:56:23 V9 FIX failure: COMPUTER_TEST failed: 1. Backup: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-FIX-20261103-205610\computer.test.tsx.backup; report: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-FIX-20261103-205610\REPORT.txt. Test file rollback attempted.

- 2026-11-03T20:59:57 V9 timing fix R2: FAILED/ROLLED BACK; target tests/computer.test.tsx; backup C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-TIMING-R2-20261103-205957\computer.test.tsx.backup; report C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-TIMING-R2-20261103-205957\REPORT.txt

- 2026-11-03T21:00:51 V9 timing fix R3: FAILED/ROLLED BACK; target tests/computer.test.tsx; backup C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-TIMING-R3-20261103-210050\computer.test.tsx.backup; report C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-TIMING-R3-20261103-210050\REPORT.txt

- 2026-11-03T21:13:13 V10 test migration failed: . Rollback attempted. Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V10-TEST-MIGRATION-20261103-211234\REPORT.txt

- 2026-11-03T21:15:32 V10 test migration failed: TARGETED_TESTS failed (exit 1). Rollback attempted. Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V10-TEST-MIGRATION-R2-20261103-211456\REPORT.txt

- 2026-11-03T21:18:03 V10.1 R3 failure: Validation failed. BASELINE_UI=1 TYPECHECK=1 MIGRATED_TESTS=1. See logs.. Rollback: True. Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V10-R3-20261103-211800\REPORT.txt

- 2026-11-03T21:21:03 V10.1 R4 failure: Validation failed. BASELINE_UI=1 TYPECHECK=0 MIGRATED_TESTS=1. See logs.. Rollback: True. Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V10-R4-20261103-212006\REPORT.txt

2026-11-03 Fairy V10.1: First UI fixture change (authenticated entry/loading state) still yielded 25/25 failures. Evidence points to React.lazy/Suspense route fallback being queried synchronously; no assertion disabled. Restored UI test file only from outputs/backups/fairy-v10.1-20261103-212500/ui.test.tsx. Preserve pre-existing worktree changes.

- 2026-11-03 V10–V13 full regression NOT PASS: final Vitest summary reported 876 passed, 63 failed, 41 skipped. Failures include HTTP/Socket.IO integration tests failing with `fetch failed`/`websocket error` under the restricted local sandbox, plus existing stale assertions or fixtures in entry, shop, saved history, room readiness/moderation, match intro/recording, player identity and other tests. Do not label this full suite PASS. Targeted Fairy/UI suite passed 61/61 when loopback was allowed; typecheck/build passed. Full JSON evidence: `outputs/backups/fairy-v10-v13-20261103-213118/full-vitest-final.json`.
- V10–V13 patch iteration errors caught and fixed before final validation: first compatibility-test insertion in `tests/computer.test.tsx` produced a TypeScript parse error due to a missing line break; a new real-engine test initially lacked the `isMoveLegal` import. Targeted checks caught both; corrected and rerun successfully. No rollback of unrelated worktree changes.
- During final audit, `rg` was unavailable in the PowerShell environment; switched to `git grep` for the Pikafish reference inventory. No files were changed by the failed command.

- 2026-11-03 V14 full-suite diagnosis: sandboxed Vitest initially reported 63 failures (876 pass/41 skipped); 32 HTTP/Socket assertions failed because sandbox loopback was blocked. Re-ran with authorized local loopback: the server/network tests passed, leaving 31 genuine stale test assumptions/fixtures and readiness-policy regressions. One failing test matched socket/network symptoms but its assertion was a separate room-view isolation expectation; it was counted among the 31 application/test mismatches, not as an environment-only failure. Updated those causes and additional three legacy readiness assertions found on regression (without disabling tests). Final full run 939/0/41; retain both initial and loopback JSON evidence under `outputs/backups/fairy-v14-20261103-222105/`.

- 2026-11-03 V15 production preflight: first BatchMode SSH attempt was refused because the configured private key was not loaded/unlocked in the Codex environment; user loaded the existing key into SSH Agent, and the same alias then authenticated successfully. Read-only audit found hovanggame.com routes to 127.0.0.1:3001 served by `cotuong-test.service`; `cotuong.service` is inactive. The SSH account `cotuong_codex` has no sudo and cannot access the release, env, web root or backup paths; the checked-in deploy script targets a different layout/account/service. No release or system state was changed. Do not guess another identity or deploy into the test service. Resume only after confirming the intended production service and providing the authorized least-privileged backup/deploy path. Local validation PASS: Vitest 939/0/41, Fairy/UI 61/61, TypeScript and build.


### 2026-11-04 00:40:26 - V15 deploy gate V1 quoting failure
- Cause: nested quoting in SSH command containing node -e.
- Symptom: Node [eval]:1 error; PowerShell NativeCommandError.
- Impact: diagnostic stopped; no deployment or migration.
- Fix: use npm pkg get scripts; capture stderr separately.

### 2026-11-04 00:42:06 - V15 Deploy Gate V3 PowerShell failure
- Symptom: finally was interpreted as an independent command.
- Cause: multi-block interactive execution did not preserve the complete try/catch/finally statement.
- Impact: V3 diagnostic did not complete reliably.
- Correction: create and syntax-check a standalone .ps1 before execution.
- V4 result: FAILED.

- 2026-11-04: VPS code required migration 018–020 while journal had only 47 applied steps. Room commands and queued persistence repeatedly failed. Operator-backed repair applied six additive steps after verified SQL backup and scratch restore; schema verification passed. This confirms schema drift; exact initial driver error was not available in restricted logs. Always verify schema compatibility before activating code. Room/challenge interaction confirmation remains pending.

- 2026-11-04: User reports Android Zalo screenshot unchanged after text-size-adjust compatibility patch. Deployment/hash checks only proved delivery, not UI correction. Do not mark the layout fix PASS. Prepared public/hovang-layout-check.html to measure UA, viewport, container units, CSS layer support and DOM/canvas text scaling before another patch. Actual cause still unconfirmed; no font compensation or geometry change applied.
- 2026-11-04: Zalo v1 CSS text adjustment failed on actual game; root32px/dock27.648px at384px viewport, computed adjust100%. V2 uses inline important adjustment for current and added DOM nodes, without font-size compensation. Actual source of scaling not fully confirmed; must remeasure device after deployment before marking fixed.
- 2026-11-04: V1/V2 none adjustments failed on real Zalo even with inline important. Real probe tests demonstrate explicit50% corrects 2x scaling. V3 uses measured adjustment rather than hard-coded device font compensation. Do not infer device rendering correctness from delivery hashes or mocked tests; verify phone after activation.

### 2026-11-04 12:09:29 - Zalo layout patch
- Error: Tests failed: 1
- Source rollback: True
- Lesson: require exact CSS guard, backup, and successful automated checks before accepting patch.

- 2026-11-04 practice-AI iteration: new dialog tests initially lacked JSDOM showModal/close; supplied isolated browser fixtures. Browser QA found DesktopCanvas direct-child sizing stretched the new native dialog; wrapped it in display:contents and reverified laptop/mobile geometry. Full regression found two pre-existing country tests still expecting Thailand; updated tests to Vietnam-only selection, confirmation and retry. All final tests passed. Packaging initially stopped because live Zalo script had a newer V5 safe-area extension; preserved that code and its live index reference rather than overwriting it with localV3. No failed validation was deployed.

### 20261104-190702 - Auto BOT Audit V1
- Error: RIPGREP NOT FOUND.
- Cause: rg.exe was not available in the current PowerShell PATH.
- Impact: audit stopped before scanning; game source unchanged.
- Fix: use built-in PowerShell Select-String.

### 2026-11-04 19:17:18 - Name frame patch
- Error: Cannot overwrite variable HOME because it is read-only or constant.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\NAME-FRAME-20261104-191718
- Lesson: verify source guards and tests before accepting UI changes.


### 2026-11-04 19:43:38 - Restore board text
- Error: Insertion guard failed: next line matches=5
- Prevention: restore only the requested JSX element from a verified backup.


- 2026-11-04: Task khung tên: rg không có trong PowerShell hiện tại; dùng Select-String/Get-ChildItem cho tìm kiếm phạm vi hẹp.

- 2026-11-04: Đối chiếu thẻ tên Home: MobileHome nằm trong src/pages/home, không phải features/lobby/components; tra tài liệu MOBILE-HOME trước tìm đường dẫn.

- 2026-11-04: Ghi khi Vite đang đọc gặp user-mapped section; chờ build xong rồi sửa. Lần retry dùng nhầm prefix board-game khi cwd đã là board-game; sửa đường dẫn tương đối đúng cwd trước chạy lại.

- 2026-11-04: Deploy khung tên20px: SSH cotuong_deploy@103.153.254.184 bằng cotuong_github_deploy bị Permission denied(publickey). Chưa ghi VPS. Không tự đổi sang user khác vì AGENTS giới hạn tài khoản deploy; chờ user cho phép ngoại lệ hoặc cấp lại key.

- 2026-11-04: Test dialog đổi tên JSDOM không có showModal; spyOn không dùng được khi property chưa tồn tại. Fixture định nghĩa showModal bằng Object.defineProperty và dọn sau test; không đổi code production để vượt test.

- 2026-11-04: Fixture showModal phải đặt dialog.open=true để Testing Library thấy điều khiển; no-op mock làm dialog vẫn ẩn. Sửa fixture mô phỏng hành vi mở thật.

- 2026-11-04: User đã sửa mật khẩu VPS nhưng SSH session mới vẫn cần sudo tương tác (sudo -n true thất bại); không suy luận reset password tương đương NOPASSWD. Gửi script kiểm tra cho user chạy trong terminal. tar.exe không nhận output path tuyệt đối Unicode; dùng cwd explicit và đường dẫn tương đối.

- 2026-11-04: Fixture deploy Python trên Windows cần -X utf8; temp hệ thống sandbox bị access denied nên dùng TemporaryDirectory(dir='.') trong workspace. Fixture sau sửa PASS. Không đưa thay đổi chưa qua fixture lên activation.

- 2026-11-04: Name deploy v1 đã tự rollback /var/backups/hovang-name-changes-20261104-uQaQCs. Tsc báo4 TS2307 do VPS thiếu src/features/lobby/components/RoomPasswordDialog.tsx, build chưa chạy. Chuẩn bị v2 bổ sung đúng file hiện có đã tracked local, guard thiếu file/asset, giữ tsc/build và rollback xóa file mới nếu lỗi; không bỏ kiểm tra.

- 2026-11-04: Deploy v2 tsc/build/rename smoke PASS nhưng public assets HTTP500 và tự rollback backup /var/backups/hovang-name-changes-20261104-h9aMAs. Root cause: assetroot.mkdir(mode=0755) chịu umask077 thành0700; chỉ chmod descendants bỏ sót assetroot. Runtime cotuong, health sau rollback200, URL cũ thiếu404 nhưng dưới thư mục0700 trả500. V3 chmod assetroot0755 rõ ràng, namespace mới, kiểm đọc đệ quy bằng runuser cotuong trước restart/publish.

- 2026-11-04: Lệnh SSH verify dùng regex có dấu quote kép lồng qua PowerShell bị unmatched quote; thay grep -F namespace cố định, không thay đổi VPS.

- 2026-11-04: Sau name deploy v3, Google login báo chưa cấu hình. Đối chiếu bundle public: trước có OAuth Client ID, bundle mới không có. Root cause deploy build chưa nạp /etc/cotuong/cotuong.env (systemd EnvironmentFile), Vite không nhận VITE_GOOGLE_CLIENT_ID. Hotfix nạp env file bằng Node, xác minh GOOGLE_CLIENT_ID khớp public Client ID trước deploy, gán VITE_GOOGLE_CLIENT_ID trong tiến trình build, kiểm bundle và public asset chứa ID; không in env/backend secret. Cần giữ kiểm env khi deploy frontend về sau.

- 2026-11-04: Google hotfix v1 dừng trước build do GOOGLE_CLIENT_ID undefined trong file unit gốc cotuong.env; không activate, backup /var/backups/hovang-google-build-20261104-393bq1. systemctl show EnvironmentFiles xác nhận drop-in qa-database.conf thay bằng /etc/cotuong/cotuong-qa.env. Phải đọc property hiệu lực, không suy từ systemctl cat một phần. V2 nạp đúng effective env và guard path trước build.

- 2026-11-04: Task welcome mẫu ảnh: Python không có Pillow, đọc kích thước PNG qua IHDR bằng Node, không cài thêm thư viện. Chrome headless QA sandbox trả ERR_NETWORK_ACCESS_DENIED; thử quyền ngoài sandbox vẫn không tạo screenshot, chưa xác nhận browser visual. DOM tests không thay thế screenshot.

- 2026-11-05: Regression online snapshot mới trước sửa3/4FAIL: ACK trùng vẫnnotify, clocksnapshot thay board/seat references, nước thật dựng lại quân đứngyên. Đây là bằngchứng churn, không chứngminh toànbộ lỗiGPUflash. Sửa chia sẻreference và giảm Appsubscription;22/22checksPASS. Không dùng testDOM/build làm bằngchứng hết nháy trựcquan.

- 2026-11-05: Nháy Xuống bàn đãtáihiện chínhxác bằng computedstyle: disabled:opacity-60 chuyển1→0.6 do mọi command đi quân đặt pending. Đừng bỏ disabled để sửa nháy; chỉ giữ opacity100. Hai regression panel/footer FAIL trước sửa làrepro chủđích, không phải lỗi server.

- 2026-11-05: Ràdiff trước deploy phát hiện replace opacity banđầu cũngchạm queuebutton do chungsubstring. Đã hoàn lại queueopacity60, chỉgiữstandup100; diff cuối1dòng.13/13tests vàVitebuildPASSsau phạmviđúng. ĐónggóichỉRoomUsersPanel, khônggomApp/storeperformancefixchưadeploy.

- 2026-11-05: Readycountdown bịẩn khi2ghếkhôngqueue do updateReadyWait gate hasQueue. User yêu cầu mới loại gate đó; không coi sốmove/ready/viewer changes làdeadline mới. Lượt cập nhật test còn2assertioncũ vì CRLF/LF khiến replacekhôngkhớp; chuẩn hóaLF và sửaassertionđúngquytắc, giữ guard.75testsPASSsau sửa, khôngbỏtests.

### 2026-11-05 09:11:02 - Script path encoding issue resolved
- Previous attempt failed before modification because Windows PowerShell decoded a non-ASCII project path incorrectly.
- Prevention: use the current project directory instead of embedding non-ASCII path literals in the script.


- 2026-11-05 09:15:51 Center-clock V3: [33m[plugin builtin:vite-reporter] . Rollback attempted; see report C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-CENTER-CLOCK-20261105-091351.txt

- 2026-11-05 09:25:26 V3 lesson: PowerShell native stderr and ErrorActionPreference Stop can misclassify Vite warnings as fatal; V4 captures native stdout/stderr to files and checks process exit code.

## 2026-11-05T12:37:50 - Dual AI patch failed
- Error: [33m[plugin builtin:vite-reporter] 
- Source files restored from: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\dual-ai-20261105-123550


## 20261105-125408 - Replay toolbar center attempt
- Error: Tests failed with exit code 1. Log: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-buttons-center-20261105-125408\test.log
- Source rollback: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-buttons-center-20261105-125408
- VPS untouched.


- 2026-11-05 13:06:23 Replay V3 failure: [33m[plugin builtin:vite-reporter] . Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-buttons-v3-20261105-130426.

- 2026-11-05 14:52:17 LOCAL restore old machine button failed: [33m[plugin builtin:vite-reporter] . Current backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\restore-old-machine-20261105-131049.

## 20261105-165418 - Covered undo patch failed
- [33m[plugin builtin:vite-reporter] 
- Source rollback: completed.
- Report: C:\Users\NHAT HOANG\Downloads\HOVANG-COVERED-UNDO-RESULT-20261105-165418.txt

## 20261105-170025 - Covered undo patch failed
- Vitest failed. Logs: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\covered-no-takeback-20261105-170025\vitest.log ; D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\covered-no-takeback-20261105-170025\vitest.stderr.log
- Source rollback: completed.
- Report: C:\Users\NHAT HOANG\Downloads\HOVANG-COVERED-UNDO-RESULT-20261105-170025.txt

## 20261105-175633 - V2 rollback due to full-suite failures
- V2 built successfully but full Vitest suite had 7 failures outside covered-undo checks; baseline was not measured in V2.
- V3 compares baseline and patched test names and does not claim full-suite PASS if baseline failures remain.

- 2026-11-05 18:54:11 Earlier Replay UI V2 scripts failed at parse time: $now colon interpolation, then corrupted UTF-8 text in a PowerShell 5.1 script. Corrective action: ASCII-only source, no non-ASCII literals, guarded patch and rollback.

- 2026-11-05 19:45:39 Previous V5 draft failed parsing due to ambiguous variable-colon syntax. It did not apply. This revision uses ASCII and ${now} interpolation.

- 2026-11-05 19:52:27 Room tabs V2: full test suite reported failures and was interrupted. Restored RoomSelection.tsx from D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\room-tabs-v2-20261105-194640\RoomSelection.tsx. Recovery copy: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\room-tabs-v2-recovery-20261105-195224.tsx. Need targeted verification before reapplying.

## 2026-11-05 21:42:34 - Flip artwork failure
- Error: BUILD FAILED: 1
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\flip-artwork-20261105-214043


## 2026-11-05 21:47:15 - Elo Honor V2
- Failure: Build failed
- Previous issue: PowerShell finally executed as a separate command.
- Prevention: run the complete try/catch/finally inside one scriptblock.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\elo-honor-v2-20261105-214505\ProfileDialog.tsx


## 2026-11-05 21:48:22 - Flip artwork V8 failure
- Reason: UI TEST FAILED: 1
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\flip-artwork-v8-20261105-214658
- Rule: validate TypeScript and Vite separately when WebP finalpass has a known failure.

## 2026-11-05 21:54:44 - HOVANG-ASSISTANT-ERROR-LESSONS-20261105

Errors caused by assistant-provided commands:

1. PowerShell ParserError caused by unescaped variable followed by colon.
2. PowerShell script encoding corrupted Vietnamese strings.
3. ripgrep command was called without checking availability.
4. Tee-Object -Encoding is unsupported in Windows PowerShell 5.1.
5. Build failures were not initially separated by stage.
6. Vitest diagnostic commands failed to capture useful error details.

Required corrective action:
- Validate PowerShell 5.1 syntax before sending scripts.
- Avoid incompatible commands and parameters.
- Use safe encoding for generated scripts.
- Capture actual exit codes and errors.
- Do not report success without verification.
- Document failures before attempting another patch.

## 2026-11-05 21:56:56 - Build diagnostic
- Issue: PowerShell 5.1 NativeCommandError interrupted npm output capture.
- Cause: stderr from Vite combined with ErrorActionPreference Stop.
- Fix: run npm through Start-Process and redirect stdout/stderr.
- Source code: unchanged.


- 2026-11-05 22:00:31 Ranking tabs V6: GUARD FAIL [room imports]: 0. Guard exact JSX and verify asset existence before changing UI; rollback on failure.

- 2026-11-05 22:18:03 Variant isolation V9: BUILD FAIL: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\variant-isolation-v9-20261105-221756\build.log. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\variant-isolation-v9-20261105-221756. Check source guards, build and targeted tests before applying variant separation.

- 2026-11-05 22:24:38 Variant V10 failed: GUARD FAIL [variant state]: 0. Rollback attempted. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\variant-v10-20261105-222438. V9 lesson: preserve compatibility with existing one-argument hook calls.

## 2026-11-05 22:26:55 - Elo rank V6
- Failure: BUILD failed with exit code 1
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\elo-rank-v6-20261105-222519
- Prevention: use exact source guards, verify test/build, rollback on failure.


## 2026-11-06 06:46:08 - Online flicker V5
- Failure: TARGETED_TESTS FAILED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\online-flicker-v5-20261106-064556\useOnlineMoveAnimation.ts
- Source rollback: see V5 report.
- Do not retain an online animation patch unless targeted tests, typecheck and build pass.


## 2026-11-06 06:46:51 - Replay side selector horizontal failure
- File: src\features\game\components\ReplayControls.tsx
- Error: Khong tim thay class container hien tai.
- Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-side-row-20261106-064651\ReplayControls.tsx

- 2026-11-06 06:47:35 Custom first turn patch: GUARD FAIL [hook option]: 0. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\custom-first-turn-20261106-064734.

## 2026-11-06 06:48:31 - Online flicker V6
- Failure: TEST ALREADY EXISTS: D:\Học\code\code games\Cờ Tướng\board-game\tests\online-move-flicker-regression.test.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\online-flicker-v6-20261106-064831\useOnlineMoveAnimation.ts
- Rollback verified: True
- Refer to V6 report for details.


- 2026-11-06 06:49:11 Custom first-turn V2: GUARD FAIL [hook signature]: 0. V1 failed due to exact hook signature matching; V2 uses guarded regex. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\custom-first-turn-v2-20261106-064911.

## 2026-11-06 06:52:30 - Online flicker V7
- Failure: SOURCE GUARD FAILED: block=0 return=0
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\online-flicker-v7-20261106-065230\useOnlineMoveAnimation.ts
- See V7 report for rollback status.


## 2026-11-06 08:40:08 - Avatar rank stability V1
- Failure: TARGETED_TESTS FAILED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\avatar-rank-stability-v1-20261106-083951\PlayerCard.tsx
- Rollback status: see V1 report.
- Source patch is not accepted without tests, typecheck and build.


## 2026-11-06 09:07:15 - Message icon tune failure
- File: src\features\lobby\components\HomeIcon.tsx
- Error: GUARD FAIL: khong tim thay noi dung mong doi.
- Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\message-icon-tune-20261106-090715\HomeIcon.tsx

## 2026-11-06 09:34:31 - Laptop chat height patch failure
- File: src/features/game/components/Chat.tsx
- Error: SOURCE GUARD FAILED: 'h-[92px] flex-none'
- Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\laptop-chat-height-20261106-093431\Chat.tsx
- Typecheck: NOT RUN
- Vite: NOT RUN

## LAPTOP-CHAT-HEIGHT-V1-GUARD-20261106
- V1 failed before patching.
- Cause: expected h-[92px] flex-none, but actual code
  contains h-[92px] flex-none justify-end.
- Impact: no game code changed in V1.
- Corrective action: V2 uses the actual source guard.
- Prevention: never invent an exact class fragment.

## 2026-11-06 09:44:39 - FREE ENERGY V1
- Error: GUARD FAILED: payment state count
- Source rollback: NOT REQUIRED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\free-energy-20261106-094439
- Prevention: strict source guards and automated validation.
- Scope: LOCAL ONLY.


## 2026-11-06 09:47:38 - FREE ENERGY
- Error: GUARD FAILED: TypeScript failed
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\free-energy-v2-20261106-094735
- Source rollback: RESTORED
- Lesson: validate exact anchors before modifying source.
- Scope: LOCAL ONLY.


## 2026-11-06 09:48:05 - FREE ENERGY
- Error: GUARD FAILED: TypeScript failed
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\free-energy-v2-20261106-094802
- Source rollback: RESTORED
- Lesson: validate exact anchors before modifying source.
- Scope: LOCAL ONLY.


## 2026-11-06 11:56:53 - FREE ENERGY V3
- Error: TYPECHECK FAILED (exit 1)
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\free-energy-v3-20261106-115650
- Source rollback: RESTORED
- Lesson: capture complete compiler/build/test output and remove unused imports.
- LOCAL ONLY.


## 2026-11-06 12:05:55 - FREE ENERGY V4
- Error: GUARD FAILED: TEST failed
- Source rollback: RESTORED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\free-energy-v4-20261106-115925
- Previous V3 issue: missing newline between controller route declarations.
- Prevention: explicit newline guard and complete compiler output.
- Scope: LOCAL ONLY.


## 2026-11-06 13:45:32 - WebView Home bottom V3
- Failure: The term '-and' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\webview-home-bottom-v3-20261106-134531\MobileHome.tsx
- Source rollback: see V3 report.


### 2026-11-06 13:50:31 - Free Energy V7
- Patch or verification failed.
- Rollback successful: False
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\FREE-ENERGY-V7-20261106-134942
- Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FREE-ENERGY-V7-20261106-134942.txt

## 2026-11-06 13:50:43 - WebView Home V3.1
- Error: BUILD FAILED
- Source backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\webview-home-v31-20261106-135004\MobileHome.tsx
- Rollback result: see V3.1 report.


## 2026-11-06 13:51:40 - Jieqi captured layout V2 failure
- Error: MOBILE 4-BUTTON ROW ANCHOR NOT FOUND
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-captured-layout-v2-20261106-135140
- Typecheck: NOT RUN
- Vitest: NOT RUN
- Vite: NOT RUN
- Prevention: use exact class guards and locate the mobile 4-button row before patching.

### 2026-11-06 13:52:26 - V7 build and rollback
- V7 TypeScript passed; build interrupted while processing Vite output.
- Previous rollback failed to remove nonempty dist.
- V7.1 recovery verified: True
- Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FREE-ENERGY-V7-RECOVERY-20261106-135219.txt

### 2026-11-06 14:08:58 - Free Energy V8.1
- Error: TYPECHECK FAILED; exit=1
- Source modified: True
- Rollback verified: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\FREE-ENERGY-V81-20261106-140845
- Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FREE-ENERGY-V81-20261106-140845.txt

## 2026-11-06 14:30:32 - Jieqi capture UI V3 failure
- Error: SOURCE GUARD FAILED: data-jieqi-captured-pieces
- Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-capture-ui-v3-20261106-143032\CapturedJieqiPieces.tsx
- Typecheck: NOT RUN
- Vitest: NOT RUN
- Vite: NOT RUN
- Prevention: patch only CapturedJieqiPieces.tsx with exact guards and preserve V2 privacy behavior.

## 2026-11-06 14:50:12 - ROOM COUNT V4
- [33m[plugin builtin:vite-reporter] 
- Review guard before retrying.


## 2026-11-06 15:53:45 - ROOM REALTIME V6
- Error: TYPECHECK failed
- Backup: C:\Users\NHAT HOANG\Downloads\HOVANG-ROOM-REALTIME-V6-BACKUP-20261106-155335
- Verify exact source guards and native command exit codes before retrying.


## 2026-11-06 15:57:38 - In-game Energy V1
- Error: TYPECHECK FAILED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\game-energy-v1-20261106-155704\GamePage.tsx
- Rollback status: see report.
- Do not modify the payment/catalog implementation to add a game button.


## 2026-11-06 16:02:50 - Game Energy Desktop V2
- Failure: ENERGY COMPONENT NOT FOUND: D:\Học\code\code games\Cờ Tướng\board-game\src\features\game\components\GameEnergyControl.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\game-energy-desktop-v2-20261106-160250\GameEnergyControl.tsx
- Rollback: see V2 report.


## 2026-11-06 16:04:06 - Ready viewer countdown V1 failed
- Error: TYPECHECK FAILED: 1
- Guard: PASS; Rollback: PASS
- Typecheck: NOT RUN; Test: NOT RUN; Build: NOT RUN
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ready-viewer-countdown-v1-20261106-160355

## 2026-11-06 16:06:49 - Game Energy V3
- Error: TYPECHECK FAILED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\game-energy-v3-20261106-160618
- File rollback status: see V3 report.
- Previous V2 incorrectly assumed GameEnergyControl.tsx existed.
- Check whether files exist before applying follow-up patches.


## 2026-11-06 16:13:14 - Energy Restore V4
- Error: GAME PAGE HAS CHANGED: 262DB3CAB42FB3B85197D82B2B7B4A9E45734B16E460C2F7A278A2DC136234C7
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\energy-restore-v4-20261106-161313\GamePage.tsx
- Rollback details: V4 report.


## 2026-11-06 16:18:28 - Energy Recovery V5
- Failure: TYPECHECK FAILED
- Root cause of V4: source SHA256 changed; do not patch based on old hash.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\energy-recovery-v5-20261106-161809
- Rollback result: see V5 report.


## 2026-11-06 16:21:08 - V6.3 failure
- GUARD FAILED [Room selection]: anchor missing
- Backup: C:\Users\NHAT HOANG\Downloads\HOVANG-V63-20261106-162108-BACKUP


## 2026-11-06 16:30:31 - Energy Recovery V6
- Failure: PROJECT BUILD FAILED
- V5 root cause: TS2322 because game.variant can be undefined.
- V6 correction: game.variant ?? 'xiangqi'.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\energy-recovery-v6-20261106-162838\GamePage.tsx
- Rollback details: see V6 report.


## 2026-11-06 17:03:30 - Post-match Energy V3
- Error: FILE MISSING: D:\Học\code\code games\Cờ Tướng\board-game\src\features\game\components\GameEnergyControl.tsx
- Backup directory: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\energy-postmatch-v3-20261106-170330
- File rollback status: see report.
- Preserve energy button and existing room queue behavior.
- Guard server timestamp and Ready rendering before patching.


## 2026-11-06 17:25:36 - Postmatch Energy V4
- Failure: TESTS FAILED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\energy-postmatch-v4-20261106-172443
- File rollback results: see report.
- Previous V3 stopped because GameEnergyControl.tsx was missing.
- Never assume an earlier successful patch is still in working tree.


## 2026-11-06 18:05:49 - Energy ad placeholder V1 failure
- Error: VITEST FAILED (1)
- Guard: PASS; Typecheck: PASS; Vitest: NOT RUN; Build: NOT RUN; Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\energy-ad-not-integrated-v1-20261106-180208

## 2026-11-06 18:18:14 - Energy ad shared one-choice UI V3 failure
- Error: STYLE EXPORT GUARD FAILED: oneChoiceNoticeDialog
- Guard: NOT RUN; Typecheck: NOT RUN; Vitest: NOT RUN; Build: NOT RUN; Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\energy-ad-one-choice-v3-20261106-181814
- Prior failure lesson: change only exact V2 overlay and reuse existing single-option styles; do not touch payment or rewards.

## 2026-11-06 18:19:02 - Keep Owner Seat V1
- Error: KEEP_SEAT_TESTS FAILED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\keep-owner-seat-v1-20261106-181856
- Rollback details: see report.
- Only modify locked-room settings and queue rotation for this feature.


## 2026-11-06 18:20:53 - Energy ad shared one-choice UI V3.1 failure
- Error: STYLE EXPORT GUARD FAILED: oneChoiceNoticeDialog (found 0 exporting source files)
- Guard: NOT RUN; Typecheck: NOT RUN; Vitest: NOT RUN; Build: NOT RUN; Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\energy-ad-one-choice-v31-20261106-182052
- Prior failure lesson: change only exact V2 overlay and reuse existing single-option styles; do not touch payment or rewards.

## 2026-11-06 18:22:07 - Keep Seat V2
- Error: TYPECHECK FAILED
- V1 mistake: incorrectly expected a locked owner to lose the seat when Keep Seat was off.
- Preserve previous locked-room behavior unless the new setting is enabled.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\keep-seat-v2-20261106-182153
- Rollback status: see report.


## 2026-11-06 18:23:15 - Energy ad shared one-choice UI V3.2 failure
- Error: HOME MODULE OUTSIDE SHARED LIB: oneChoiceNoticeDialog -> ../../features/lobby/components/OneChoiceNoticeStyles
- Guard: NOT RUN; Typecheck: NOT RUN; Vitest: NOT RUN; Build: NOT RUN; Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\energy-ad-one-choice-v32-20261106-182315
- Prior failure lesson: derive shared styles from HomePage imports rather than assuming export declarations; do not touch payment or rewards.

## 20261106-181837 - QUEUE BLOCKED V1
- Error: Vitest failed
- Source rollback attempted: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\HOVANG-QUEUE-BLOCKED-20261106-181837


## 2026-11-06 18:37:16 - Energy ad notice V3.4 failure
- Error: SOURCE GUARD FAILED: Payment package unlimited (2/1)
- Guard: NOT RUN; Typecheck: NOT RUN; Vitest: NOT RUN; Build: NOT RUN; Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\energy-ad-notice-screenshot-v34-20261106-183716
- Prevention: match actual screenshot and use exact V3.3 source; never assume one-choice styles look like every one-button modal.

## 2026-11-06 18:56:19 - Queue Snapshot V1
- Error: QUEUE_TESTS FAILED
- Goal: late queued viewers must wait until the next match ends.
- Existing issue: post-match rotation reads live queue instead of queue at match finish.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\queue-snapshot-v1-20261106-185612
- Rollback details: see report.


## 2026-11-06 19:39:48 - Integrated 3s Keep Energy V2
- Error: GUARD FAILED [KEEP SEAT AT 3S]: 3 matches
- Integration scope: queue snapshot, 3s timing, owner-energy protection, opponent-energy notice.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\integrated-3s-keep-energy-v2-20261106-193948
- Rollback result: see report.
- Previous Queue Snapshot V1 failure: stale queue rotation and timing assumptions.


## 2026-11-06 19:44:48 - Integrated 3s Keep Energy V3
- Error: TARGETED_TESTS FAILED
- V2 failed because keep-owner-seat test contained three tick(7000) occurrences.
- V3 corrected the expected guard count to three.
- All code changes use backup and automatic rollback.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\integrated-3s-keep-energy-v3-20261106-194439
- Rollback details: see report.


## 2026-11-06 19:45:23 - Game energy recovery tooltip V1 FAIL
- Error: TYPECHECK FAILED: 1
- Guard: PASS; Typecheck: NOT RUN; Vitest: NOT RUN; Build: NOT RUN
- Rollback: PASS; Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\game-energy-recovery-tooltip-v1-20261106-194518
- Prevention: compare actual GameEnergyControl source and avoid modifying EnergyDialog or recovery state.

## 2026-11-06 19:53:11 - Integrated 3s Keep Energy V3
- Error: TARGETED_TESTS FAILED
- V2 failed because keep-owner-seat test contained three tick(7000) occurrences.
- V3 corrected the expected guard count to three.
- All code changes use backup and automatic rollback.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\integrated-3s-keep-energy-v3-20261106-195303
- Rollback details: see report.


## 2026-11-06 19:53:49 - Integrated 3s Keep Energy V3
- Error: TARGETED_TESTS FAILED
- V2 failed because keep-owner-seat test contained three tick(7000) occurrences.
- V3 corrected the expected guard count to three.
- All code changes use backup and automatic rollback.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\integrated-3s-keep-energy-v3-20261106-195342
- Rollback details: see report.


## 2026-11-06 19:54:12 - Finish Time V4
- Error: TARGETED_TESTS FAILED
- Previous V3 wrongly started 3000ms after result ACK.
- Correct rule: checkmate/finished event starts timer and queue snapshot.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\finish-time-v4-20261106-195405
- Rollback details: see report.


## 2026-11-06 19:55:23 - Finish Time V4
- Error: TARGETED_TESTS FAILED
- Previous V3 wrongly started 3000ms after result ACK.
- Correct rule: checkmate/finished event starts timer and queue snapshot.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\finish-time-v4-20261106-195517
- Rollback details: see report.


## 2026-11-06 21:20:00 - Ready Preserve V6
- Error: Small helper note not uniquely identified; no changes
- Objective: preserve Ready timer; remove Keep Seat helper note.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\ready-preserve-v6-20261106-211959
- Rollback details: see report.


## 2026-11-06 22:36:59 - Repair Tests V2
- Error: TARGETED_TESTS FAILED
- Previous V1 contained PowerShell parser error at $name colon.
- V2 uses explicit variable boundaries and independently guarded edits.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\repair-tests-v2-20261106-223614
- Rollback details: see report.


## 2026-11-06 22:42:25 - Repair Tests V3
- Error: [33m[plugin builtin:vite-reporter] 
- Previous V2 accidentally malformed a TypeScript test.
- V3 uses a single verified assertion inside the named test.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\repair-tests-v3-20261106-223936
- Rollback details: see report.


## 2026-11-06 23:08:52 - Repair Tests V5
- Failure: TARGETED_TESTS FAILED
- Scope: locked-room and random-first-player tests.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\repair-tests-v5-20261106-230843
- Rollback details in report.


## 2026-11-06 23:16:30 - Full Repair V6
- Failure: TARGETED_TESTS FAILED (exit 1)
- Scope: 7 regression test files.
- Previous commands: V1 PowerShell parser error;
  V2 malformed test; V3 build-output handling;
  V4 accepted, V5 report incomplete.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\full-repair-v6-20261106-231610
- Rollback and test details: see REPORT.txt.


## 2026-11-06 23:20:13 - Full Repair V7
- Failure: TARGETED_TESTS FAILED
- V6: 75/77 targeted tests PASS, 2 tests FAIL.
- V6 error 1: checking seated B in viewers list.
- V6 error 2: socket test used 2s instead of 3s.
- V7 changes only regression tests.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\full-repair-v7-20261106-231957
- Rollback details: report.


## 2026-11-06 23:23:21 - Full Repair V8
- Failure: TARGETED_TESTS FAILED (exit 1)
- V7 passed 76/77 tests, one socket test failed.
- Root cause: simulated resignation occurred at time 0,
  followed by time jump to 20000ms.
- V8 sets the simulated finish time before resignation.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\full-repair-v8-20261106-232307
- Rollback details: see report.


## 2026-11-07 10:36:59 - Home quick-play province priority V1 failed
- Error: Cannot overwrite variable HOME because it is read-only or constant.
- Guard: NOT RUN; Typecheck: NOT RUN; Vitest: NOT RUN; Build: NOT RUN; Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\auto-join-room-v1-20261107-103659
- Lesson: preserve exact source guards and rollback all changed LOCAL files if verification fails.

## 2026-11-07 10:38:15 - Home quick-play province priority V2 failed
- Error: HOME MATCHMAKING EXACT GUARD FAILED - NO CHANGES
- Guard: NOT RUN; Typecheck: NOT RUN; Vitest: NOT RUN; Build: NOT RUN; Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\auto-join-room-v2-20261107-103815
- Lesson: avoid case-insensitive automatic PowerShell variables (C:\Users\NHAT HOANG); preserve guards and roll back changed LOCAL files.

## 2026-11-07 12:05:19 - Custom Position First Turn V1 failed
- Error: TYPECHECK FAILED: 1
- Guard: PASS; Typecheck: NOT RUN; Vitest: NOT RUN; Build: NOT RUN; Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-first-mover-v1-20261107-120512
- Lesson: exact anchors, line-ending normalization and full rollback required.

- 2026-11-07 12:07:52: Room Bot7 V1 failed. See C:\Users\NHAT HOANG\Desktop\HOVANG-ROOM-BOT7-20261107-120750.txt. Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\room-bot7-20261107-120750. Check rollback result.

- 2026-11-07 12:56:31 Room Bot7 V2 failed. See C:\Users\NHAT HOANG\Desktop\HOVANG-ROOM-BOT7-V2-20261107-125631.txt. Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\room-bot7-v2-20261107-125631.

- 2026-11-07 12:58:39 Room Bot7 V2 failed. See C:\Users\NHAT HOANG\Desktop\HOVANG-ROOM-BOT7-V2-20261107-125839.txt. Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\room-bot7-v2-20261107-125839.

- 2026-11-07 13:01:11 Room Bot7 V2 failed. See C:\Users\NHAT HOANG\Desktop\HOVANG-ROOM-BOT7-V2-20261107-125521.txt. Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\room-bot7-v2-20261107-125521.

### 2026-11-07 13:02:13 - Facebook notice link
- Error: Build failed: 1
- Source rollback attempted: True


## 2026-11-07 13:04:58 - Custom first piece sets side V4 FAILED
- Error: VITEST FAILED: 1
- Guard: PASS; Typecheck: PASS; Vitest: NOT RUN; Build: NOT RUN; Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-free-first-move-v4-20261107-130448
- Rule: never assume a successful build verifies browser input/AI scheduling; preserve existing APIs and guard exact source blocks.

### 2026-11-07 13:06:20 - Facebook notice V2
- Error: Baseline build failed. Source was not changed.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\facebook-notice-v2-20261107-130426
- Baseline log: C:\Users\NHAT HOANG\Downloads\HOVANG-FB-BASELINE-BUILD.log
- Patched log: C:\Users\NHAT HOANG\Downloads\HOVANG-FB-PATCHED-BUILD.log
- Lesson: capture complete baseline and patched build errors before attributing failure to a link change.


- 2026-11-07 13:28:35: Room Bot7 V3 attempt failed: FULL_SUITE FAILED. Rollback and source backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\room-bot7-inline-v3-20261107-132411. Report: C:\Users\NHAT HOANG\Desktop\HOVANG-BOT7-INLINE-V3-20261107-132411.txt.

## 2026-11-07 13:35:37 - Custom free first move V6 FAILED
- Error: VITEST FAILED: 1
- Guard: PASS, Typecheck: PASS, Vitest: NOT RUN, Build: NOT RUN, Rollback: PASS
- Lesson: UI Board event handler must be traced to its actual hook before patching; V5 patched useGame while position mode routes to useReplayTrial.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-free-first-move-v6-20261107-133520

- 2026-11-07 13:55:55: Remove Room Bot7 attempt failed: FULL_SUITE FAILED. Rollback=True. Backup=D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\remove-room-bot7-20261107-134831. Report=C:\Users\NHAT HOANG\Desktop\HOVANG-REMOVE-ROOM-BOT7-20261107-134831.txt.

- 2026-11-07 14:10:07: Room Bot7 removal V3 failed: SOURCE MISSING: src\features\game\components\RoomBot7Practice.tsx. Rollback=False. Backup=D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\remove-room-bot7-v3-20261107-141007. Report=C:\Users\NHAT HOANG\Desktop\HOVANG-REMOVE-BOT7-V3-20261107-141007.txt.

## 2026-11-07 14:17:10 - V10 custom first move FAILED
- Error: VITEST FAILED: 1
- Guard=PASS Typecheck=PASS Vitest=NOT RUN Build=NOT RUN Rollback=PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-first-move-v10-20261107-141655
- Lesson: board orientation and AI assignment must be independent; tests must verify user interaction, not only source strings.

## 2026-11-07 14:48:11 - V12 failed
- Error: GUARD FAILED [RESTORE PLAYER POSITION]: expected 1, found 0
- Typecheck=NOT RUN; Vitest=NOT RUN; Build=NOT RUN; Rollback=NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-first-move-v12-20261107-144810
- Rule: never change player identity for a custom first move.

## 2026-11-07 14:52:08 - V12.1 failure
- Error: VITEST FAILED: 1
- Guard=PASS; Typecheck=PASS; Vitest=NOT RUN; Build=NOT RUN.
- Rollback=PASS; Backup=D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-first-move-v12-1-20261107-145155
- V12 guard failure lesson: match V11's positionViewSide.current, not positionHumanSide.

## 2026-11-07 14:56:32 - V12.1 failure
- Error: VITEST FAILED: 1
- Guard=PASS; Typecheck=PASS; Vitest=NOT RUN; Build=NOT RUN.
- Rollback=PASS; Backup=D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-first-move-v12-1-20261107-145620
- V12 guard failure lesson: match V11's positionViewSide.current, not positionHumanSide.

- 2026-11-07 16:06:32: iOS fallback V2 failed: FALLBACK FILE ALREADY EXISTS - STOP. Rollback=False. Backup=D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\ios-fallback-v2-20261107-160632. Report=C:\Users\NHAT HOANG\OneDrive\Desktop\HOVANG-IOS-FIX-V2-20261107-160632.txt.

## 20261107-164648 - V21.5A.2 PowerShell stderr handling
- Previous batch stopped during full Vitest when a test intentionally
  printed "Saved match deletion failed: Error: offline" to stderr.
- Independent verification: saved-match-history 16/16 PASS, exit code 0.
- Root cause: batch piped stderr into PowerShell under Stop error handling.
- Prevention: execute checks via cmd.exe, redirect stdout/stderr to log,
  wait for completion and decide from actual exit code.
- No gameplay code was changed to address this batch-script issue.

## 20261107-170333 - V21.5A.6 failure
- BASELINE CHANGED: h-[700px] w-[1058px]
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-LAYOUT-V21-5A6-20261107-170333.txt

### 2026-11-07 19:10:18 - JIEQI AUDIT V1/V2
- V1: PowerShell variable scope mismatch caused null output list.
- V2: No intermediate report and no execution timeout.
- V3: Incremental reporting, bounded subprocess execution.
- Game source files: Not intentionally modified.


- 2026-11-07 20:18:10: HOST SEAT QUEUE V1 FAILED: TARGETED_VITEST: FAILED - SEE D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\host-seat-queue-v1-20261107-201755\TARGETED_VITEST.log. Rollback=True. Backup=D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\host-seat-queue-v1-20261107-201755. Report=C:\Users\NHAT HOANG\OneDrive\Desktop\HOVANG-HOST-SEAT-QUEUE-V1-20261107-201755.txt.

## 20261107-201919 - Create room button V1 failed
- Error: FULL-VITEST FAILED
- Source restored if modified.
- New artwork removed if created.
- VPS untouched.

- 2026-11-07 21:48:42: Host seat queue V2 failed: FULL_VITEST: FAILED. LOG: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\host-seat-queue-v2-20261107-202054\FULL_VITEST.log. Rollback=True. Backup=D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\host-seat-queue-v2-20261107-202054. Report=C:\Users\NHAT HOANG\OneDrive\Desktop\HOVANG-HOST-SEAT-QUEUE-V2-20261107-202054.txt.

## 20261107-215151 - Tao ban V2 failure
- Error: MISSING: D:\Học\code\code games\Cờ Tướng\board-game\src\assets\history\controls-create-room-v1.png
- Rollback attempted.

- 2026-11-07 21:58:43: Previous Host Seat Queue V2 full-suite failure: tests/match-saving-ui.test.tsx line 72 used reference equality toBe for separate state objects. Not modified during V3; compared baseline before/after. Do not attribute unrelated test failure to queue logic without evidence.

## 20261107-215513 - Tao ban V2.1 failure
- Error: FULL-VITEST FAILED
- Source restored if modified; new image removed.

## 20261107-220928 - Tao ban V3 failure
- Error: FULL-VITEST FAILED
- Rollback performed where applicable.

## 2026-11-07 22:25:14 - Computer clean UI V1
- Error: FULL VITEST FAILED
- Scope: src\pages\game\GamePage.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-clean-ui-v1-20261107-221726
- Lesson: Verify exact source guards and run tests before accepting UI changes.


## 2026-11-07 22:28:24 - Computer Clean UI V2
- Failure: TYPECHECK FAILED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-clean-ui-v2-20261107-222819
- Rollback attempted for GamePage.tsx and match-saving-ui.test.tsx.
- Review full report before retrying.


## 2026-11-07 22:34:47 - Computer Clean UI V3
- Failure: BUILD FAILED
- Source changes started: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-clean-ui-v3-20261107-223004
- Review report and rollback status before retrying.


## 20261107-225142 - Three buttons V6 failed
- Error: MISSING: C:\Users\NHAT HOANG\Downloads\HOVANG-3-NUT-V6.zip
- Rollback attempted.

## 20261107-225903 - Three buttons V6 failed
- Error: TARGET ALREADY EXISTS: D:\Học\code\code games\Cờ Tướng\board-game\src\assets\history\controls-create-room-v6.png
- Rollback attempted.

- 2026-11-07 23:03:30: Earlier mobile layout audit V1 had invalid PowerShell syntax: Sort-Object Score -Descending, Path. ParserError occurred before execution; no source was modified. Corrected in subsequent audit.

## 20261107-230825 - Buttons V8 failed
- Error: ZIP MISSING IN DOWNLOADS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\buttons-v8-20261107-230825

- 2026-11-07 23:11:41: Mobile Replay Layout V2 failed: TYPECHECK: FAILED - D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-replay-layout-v2-20261107-231133\TYPECHECK.log. Rollback=True. Backup=D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-replay-layout-v2-20261107-231133. Report=C:\Users\NHAT HOANG\OneDrive\Desktop\HOVANG-MOBILE-REPLAY-LAYOUT-V2-20261107-231133.txt.

- 2026-11-07 23:17:36: Mobile Replay Layout V2 FAILED TypeScript TS2367/TS2322 because mobilePart='machine' was used without updating the prop union. V2 rolled back. V3 updated the union and added verification.

## 20261107-233154 - Swap AI/moves failed
- Error: EXPECTED ORDER NOT FOUND
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\swap-ai-moves-20261107-233154
- Rollback attempted if modified.

## 20261107-233230 - Swap AI/navigation V2 failure
- Error: ADJACENT JSX GUARD FAILED: 0
- Source: D:\Học\code\code games\Cờ Tướng\board-game\src\features\game\components\ReplayControls.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\swap-ai-moves-v2-20261107-233230
- Rollback attempted if source was modified.
- VPS: NOT TOUCHED.

## 20261107-233323 - AI / navigation swap review
- V1 failed: searched the variable declaration instead of JSX.
- V2 failed: fragile JSX regex matching.
- V3 status: FAIL
- Lesson: locate complete JSX nodes using anchored lines and verify reversible swaps.
- Source: D:\Học\code\code games\Cờ Tướng\board-game\src\features\game\components\ReplayControls.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\swap-ai-moves-v3-20261107-233323
- VPS: NOT TOUCHED.

## 20261107-233449 - AI / navigation swap
- V1 failure: confused variable declaration with JSX rendering.
- V2 failure: incomplete regex match for nested JSX.
- V3 failure: incorrect JSX boundary/order detection.
- V4 result: FAIL
- Lesson: locate navigation opening and closing lines explicitly, then verify reversible swap.
- Source: D:\Học\code\code games\Cờ Tướng\board-game\src\features\game\components\ReplayControls.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\swap-ai-moves-v4-20261107-233449
- VPS: NOT TOUCHED.

## 20261107-233550 - AI/move controls V5 review
- V1: incorrect variable occurrence.
- V2: fragile JSX regex.
- V3: incorrect JSX boundary/order detection.
- V4: incorrect original-order guard.
- V5: FAIL
- Lesson: for a pure JSX reorder, move the render line instead of parsing a nested JSX block.
- Source: D:\Học\code\code games\Cờ Tướng\board-game\src\features\game\components\ReplayControls.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\swap-ai-v5-20261107-233550
- VPS: NOT TOUCHED.

### 2026-11-07 23:40:55 - Custom Room V1 build invocation
- V1 result: ROLLED BACK.
- Report showed: plugin builtin:vite-reporter.
- Root cause not conclusively confirmed from report alone.
- V1.1 uses process exit codes and separate stdout/stderr logs.
- V1.1 result: PASS - LOCAL; BROWSER QA PENDING
- Detail: 
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-room-v1-1-20261107-233522-979

## 20261107-234222 - AI/navigation swap V6
- Previous V1-V5 failed due to incorrect assumptions or JSX guards.
- Verified current source: AI above navigation.
- V6 status: FAIL
- Lesson: inspect current source before applying position-dependent edits.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\swap-ai-v6-20261107-234222
- VPS: NOT TOUCHED.

## 20261107-234303 - AI/navigation V7
- V6 failed at ONLY-SWAP VERIFICATION.
- Cause: PowerShell array construction was unreliable for JSX block swapping.
- V7 uses one exact text match and direct string replacement.
- V7 status: FAIL
- Source: D:\Học\code\code games\Cờ Tướng\board-game\src\features\game\components\ReplayControls.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\swap-ai-v7-20261107-234303
- VPS: NOT TOUCHED.

## 20261108-114211 - Custom room Back V1 failure
- File: src/features/game/hooks/useGame.ts
- Result: FAIL
- Source modified: True
- Rollback verified: True
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-ROOM-BACK-V1-20261108-114211.txt
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-room-back-v1-20261108-114211
- VPS: NOT TOUCHED.

## 2026-11-08 11:58:23 - HISTORY ROOM V1
- Error: GUARD FAILED: src\store\sessionStore.ts | MATCHES=2
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\history-room-v1-20261108-115819
- Rule: Do not deploy until guards and checks pass.


## 20261108-115401 - Custom room Back V2 failure
- Error: BUILD FAILED
- Source modified: True
- Rollback verified: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-room-back-v2-20261108-115401
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-ROOM-BACK-V2-20261108-115401.txt
- Lesson: Preserve the original source and rollback on any failed guard or test.
- VPS: NOT TOUCHED.

## 2026-11-08 12:04:31 - HISTORY ROOM V2
- Error: [33m[plugin builtin:vite-reporter] 
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\history-room-v2-20261108-120143


## 20261108-120437 - WebP Build Guard V1
- Error: BUILD FAILED
- Rollback verified: True
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-WEBP-BUILD-GUARD-V1-20261108-120437.txt
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\webp-build-guard-v1-20261108-120437
- VPS: NOT TOUCHED.

## 20261108-121132 - Custom Room Back V3 failure
- Error: GUARD FAILED: expected 1 condition, found 0
- Rollback verified: False
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-room-back-v3-20261108-121132
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-ROOM-BACK-V3-20261108-121132.txt
- VPS: NOT TOUCHED.

## 20261108-131653 - Custom Room Form V4
- Error: [33m[plugin builtin:vite-reporter] 
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-ROOM-FORM-V4-20261108-131653.txt
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-room-form-v4-20261108-131653

## 20261108-210250 - Computer selection fix V1 failure
- Error: UI_TEST FAILED
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-select-fix-v1-20261108-210250
- Lesson: verify exact code before patching and restore both files on failed checks.
- VPS: NOT TOUCHED.

## 20261108-210550 - Computer Select V2 failure
- Error: GUARD FAILED: src\app\App.tsx, count=0
- Rollback: NOT NEEDED - SOURCE UNCHANGED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-select-v2-20261108-210550
- Previous V1 failure: computer entrance did not restart on re-entry.
- Rule: preserve UI regression tests and verify screen lifecycle.
- VPS: NOT TOUCHED.

## 20261108-210500 - Computer Select V2 failure
- Error: FULL_VITEST FAILED
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-select-v2-20261108-210500
- Previous V1 failure: computer entrance did not restart on re-entry.
- Rule: preserve UI regression tests and verify screen lifecycle.
- VPS: NOT TOUCHED.

## Computer Back V3 - 20261108-221833
Result: FAIL
Error: [90mstderr[2m | tests/saved-match-history.test.tsx[2m > [22m[2masks before deleting a saved game and keeps confirmation open on failure (compact=false)
Rollback: True
Scope: src/app/App.tsx
Lesson: Verify exact source guard and tests before accepting a patch.

## Computer Back V4 - 20261108-222434
Result: FAIL
Error: VERIFY FAILED: Home cleanup not found
Source modified: True
Scope: src/app/App.tsx
Lesson: Verify source guards and rollback before deployment.

## 20261108-222504 - Custom position V1 failed
See report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-TRANSITION-V1-20261108-222504.txt
Rollback executed.

## Computer Back V5 - 20261108-222602
- Status: FAIL
- Error: [90mstderr[2m | tests/saved-match-history.test.tsx[2m > [22m[2masks before deleting a saved game and keeps confirmation open on failure (compact=false)
- Modified: True
- Rollback attempted if source changed.
- Lesson: Use exact replacement verification.

## 20261108-223038 - Custom position transition V2
Failure: GUARD FAILED: Position route; matches=0
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-TRANSITION-V2-20261108-223038.txt
Prevention: check process exit code, not stderr alone.
Rollback: attempted; verify report and working tree.

## Computer Back V6 - 20261108-223140
- Result: FAIL
- Error: TYPECHECK FAILED (exit 1)
- Rollback: COMPLETED AND VERIFIED
- Test logs: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-back-v6-20261108-223140\test-logs
- VPS: NOT TOUCHED

## 20261108-223152 - Custom Position V3
VITEST FAILED
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-V3-20261108-223152.txt

## Computer Back Replacement V7 - 20261108-223539
- Result: PENDING
- Success: False
- Error: Cannot validate argument on parameter 'ArgumentList'. The argument is null, empty, or an element of the argument collection contains a null value. Supply a collection that does not contain any null values and then try the command again.
- Files: src/app/App.tsx, src/features/lobby/components/ComputerSetup.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-back-replace-v7-20261108-223539
- Rollback: NOT NEEDED
- Baseline typecheck exit: -1
- Browser QA: PENDING
- VPS: NOT TOUCHED

## 20261108-224047 - Custom Position V4
VITEST REGRESSION: expected 5 baseline failures, found 4
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-V4-20261108-224047.txt

## Computer Back V8 - 20261108-223812
- Success: False
- Error: VITEST FAILED: 1
- Typecheck: EXISTING ERRORS UNCHANGED
- Files: src/app/App.tsx, ComputerSetup.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\back-replace-v8-20261108-223812
- Rollback: COMPLETED AND VERIFIED
- Browser QA: PENDING
- VPS: NOT TOUCHED

## 20261108-224314 - Custom Position V5
BUILD FAILED
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-V5-20261108-224314.txt

## Computer Back V9 - 20261108-224548
- Success: False
- Error: BUILD FAILED: 1
- Scope: App.tsx and ComputerSetup.tsx
- Back button replaced; Home cleanup added if successful.
- Typecheck: PASS
- Full Vitest: BLOCKED / NOT RUN
- Browser QA: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\back-v9-20261108-224548
- Rollback: COMPLETED AND VERIFIED
- VPS: NOT TOUCHED

## 20261108-224753 - V5 dist recovery
Reason: V5 build failed with ENOENT; previous rollback left dist incomplete.
Backup source: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-position-v5-20261108-224314\dist
Preserved previous dist: D:\Học\code\code games\Cờ Tướng\board-game\dist-before-recovery-20261108-224753
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-V5-DIST-RECOVERY-20261108-224753.txt
Source code: unchanged
VPS: unchanged
=== HOVANG V5 DIST RECOVERY ===
MODE: LOCAL RECOVERY
SOURCE CODE: NOT MODIFIED
VPS: NOT TOUCHED
BACKUP FILES: 468
COPYING BACKUP TO STAGING...
STAGING SHA256: PASS
OLD DIST PRESERVED: D:\Học\code\code games\Cờ Tướng\board-game\dist-before-recovery-20261108-224753
RESTORED FILES: 468
RESTORED SHA256: PASS
STATUS: DIST RECOVERED
BUILD: NOT RUN - RECOVERY ONLY
BROWSER QA: PENDING
VPS: NOT TOUCHED

## WebP Build V11 - 20261108-224915
- Success: False
- Error: JS-SYNTAX FAILED (exit 1)
- Scope: scripts\hovang-webp-postbuild.cjs
- Change: Check references before reading PNG.
- Referenced missing images remain blocking errors.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\webp-build-v11-20261108-224915
- Rollback: COMPLETED AND VERIFIED
- VPS: NOT TOUCHED

## WebP Build V12 - 20261108-225032
- Success: False
- Error: PRODUCTION-BUILD FAILED (exit 1)
- Scope: scripts/hovang-webp-postbuild.cjs
- Change: Check static references before reading PNG.
- JS syntax: Checked using relative path.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\webp-build-v12-20261108-225032
- Rollback: COMPLETED AND VERIFIED
- VPS: NOT TOUCHED

## Computer Back V13 - 20261108-225320
- Success: False
- Error: TYPECHECK FAILED
- Scope: App.tsx and ComputerSetup.tsx
- Fix: Remove invalid CustomPositionPage prop.
- Fix: Clear keepComputer on Home navigation.
- Fix: Replace Back button handler.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-back-v13-20261108-225320
- Rollback: COMPLETED AND VERIFIED
- TypeScript: PASS only if successful
- Build and full Vitest: NOT RUN
- Browser QA: PENDING
- VPS: NOT TOUCHED

## 20261109-080826 - Room Users Layer V1
- Error: FULL_VITEST FAILED
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\room-users-layer-v1-20261109-080826
- Lesson: verify exact source and test before accepting a stacking-layer change.
- VPS: NOT TOUCHED.

## 20261109-081621 - Position board height V1
Status: FAILED: BASELINE TEST RESULT UNREADABLE
File: src/pages/computer/CustomPositionPage.tsx
Change: move desktop custom-position board upward by 8px
Unchanged: mobile, board logic, dist, VPS
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\position-board-height-v1-20261109-081621\CustomPositionPage.tsx
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-POSITION-BOARD-HEIGHT-V1-20261109-081621.txt

## 20261109-081823 - Position board height V2
Status: FAILED: [33m[plugin builtin:vite-reporter] 
File: src/pages/computer/CustomPositionPage.tsx
Change: desktop board shifted upward by 8px
Tests: JSON baseline comparison
Unchanged: mobile, game logic, dist, VPS
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\position-board-height-v2-20261109-081823\CustomPositionPage.tsx
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-POSITION-BOARD-HEIGHT-V2-20261109-081823.txt

20261109-081823: V1 could not parse Vitest failures from text output; V2 uses Vitest JSON reporter.

## 20261109-082059 - Position board height V3
Status: FAILED: NEW TEST FAILURES
File: src\pages\computer\CustomPositionPage.tsx
Change: move desktop custom-position board up 8px
Validation: TypeScript, isolated Vite, JSON Vitest comparison
Unchanged: mobile, game logic, dist, VPS
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\position-board-height-v3-20261109-082059\CustomPositionPage.tsx
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-POSITION-BOARD-HEIGHT-V3-20261109-082059.txt

20261109-082059: V2 stopped while capturing Vite output; V3 reads process exit codes using Start-Process.

20261109-082312: V3 incorrectly reported a baseline failure as new because of PowerShell array handling. V4 uses HashSet.

## 20261109-082550 - Position board height V4
Status: FAILED: GUARD FAILED: MATCHES=0
File: src\pages\computer\CustomPositionPage.tsx
Change: desktop custom-position board up 8px
Tests: baseline comparison using HashSet of full test names
Unchanged: mobile, game logic, dist, VPS
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\position-board-height-v4-20261109-082550\CustomPositionPage.tsx
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-POSITION-BOARD-HEIGHT-V4-20261109-082550.txt

20261109-082550: V3 incorrectly reported a baseline failure as new because of PowerShell array handling. V4 uses HashSet.

## 20261109-081522 - Room users layer V2 failure
- Error: FULL_VITEST FAILED
- Baseline full Vitest exit: 1
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\room-users-layer-v2-20261109-081522
- VPS: NOT TOUCHED.

## 20261109-083905 - Room users V4 failure
- Error: GUARD FAILED: RAISE_CUSTOM_CONTROLS - found 0
- Rollback: NOT NEEDED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\room-users-v4-20261109-083905
- VPS: NOT TOUCHED.

## Mobile View Elo Alignment - 20261109-083937
- Success: False
- Error: BUILD FAILED
- File: src/pages/game/GamePage.tsx
- Mobile View: restored original vertical fallback 169px
- Horizontal centering: unchanged
- Desktop and View behavior: unchanged
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-view-elo-20261109-083937
- Rollback: COMPLETED AND VERIFIED
- Browser QA: pending
- VPS: not touched

## 20261109-084007 - Room users V4.1 failure
- Error: POST-PATCH VERIFICATION FAILED
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\room-users-v4-1-20261109-084007
- VPS: NOT TOUCHED.

## Mobile View Elo Alignment V2 - 20261109-084446
- Success: False
- Error: VIEW GUARD FAILED: 0
- Files: useBoardLayout.ts, GamePage.tsx
- Mobile View follows measured Elo vertical center.
- Horizontal center and desktop unchanged.
- Typecheck and Vite build required.
- Production postbuild and full Vitest not run.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\view-elo-align-v2-20261109-084446
- Rollback: NOT NEEDED
- Browser QA: pending
- VPS: NOT TOUCHED

## 20261109-084027 - Laptop board sync V1 failure

- Error: Baseline typecheck/build failed. Source not modified.
- Source rollback: Not needed
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\laptop-board-sync-v1-20261109-084027
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-LAPTOP-BOARD-SYNC-V1-20261109-084027.txt
- VPS: NOT TOUCHED.

## Top Gold Buttons V1 - 20261109-091644
- Success: False
- Error: GUARD FAILED: sound button not found
- File: src/features/lobby/components/ComputerSetup.tsx
- Change: Sync sound and fullscreen button colors with other gold buttons.
- Position / size / icon / logic: unchanged.
- Typecheck: required
- Vite build: required
- Full Vitest: not run
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\top-gold-buttons-v1-20261109-091644
- Rollback: NOT NEEDED
- VPS: NOT TOUCHED

## 20261109-091806 - Trial victory V1
- Error: TYPECHECK FAILED
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\trial-victory-v1-20261109-091806
- VPS: NOT TOUCHED.

## 20261109-093226 - Computer no clock V1
- Error: FULL_VITEST FAILED
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-no-clock-v1-20261109-093226
- VPS: NOT TOUCHED.

## 20261109-095330 - Computer No Clock V2
- Error: [90mstderr[2m | tests/game-sounds.test.ts[2m > [22m[2mkeeps the main checkmate cue when the decorative layer cannot load
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-no-clock-v2-20261109-095330
- VPS: NOT TOUCHED.

## 20261109-095552 - Computer No Clock V3
- Error: EXTENDED_VITEST FAILED WITH EXIT 1
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-no-clock-v3-20261109-095552
- VPS: NOT TOUCHED.

## 20261109-100624 - Computer No Clock V4
- Error: ISOLATED_RENDER_TESTS FAILED WITH EXIT 1
- Rollback: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-no-clock-v4-20261109-100624.
- VPS: NOT TOUCHED.

## 2026-11-09 10:10:55 - iPad frame V2
- LOCAL only; VPS untouched.
- Target: src/lib/desktopCanvas.tsx
- Goal: fit desktop canvas within viewport width and height.
- Result: FAILED / ROLLBACK ATTEMPTED
- Known baseline failures: admin-page, custom-position-free-first-move-v7.
- Browser iPad QA: pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ipad-frame-v2-20261109-100919
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-IPAD-FRAME-FIX-V2-20261109-100919.txt


## 2026-11-09 10:21:16 - iPad frame V3
- LOCAL only; VPS untouched.
- File: src/lib/desktopCanvas.tsx
- Goal: scale canvas by both viewport dimensions.
- Result: FAILED
- Known baseline failures: admin-page and custom-position-free-first-move-v7.
- Browser QA: pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ipad-frame-v3-20261109-102115
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-IPAD-FRAME-FIX-V3-20261109-102115.txt


### 2026-11-09 13:51:38 - Tablet V6
- V6 generated invalid Tailwind custom-variant selectors.
- Build completed with CSS selector warnings.
- PowerShell finally block was executed separately.
- Restored desktopCanvas.tsx and index.css from V6 backup.
- Current pre-rollback state: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v6-before-rollback-20261109-135138
- VPS not touched.


## 2026-11-09 14:09:02 - Hidden AI Mobile V1
- Result: FAILED
- Files: GamePage.tsx, CapturedJieqiPieces.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\hidden-ai-mobile-v1-20261109-140902
- Browser QA pending; VPS untouched.


### 20261109-140938 - Tablet V7 Step 1
- Failure: [90mstderr[2m | tests/saved-match-history.test.tsx[2m > [22m[2masks before deleting a saved game and keeps confirmation open on failure (compact=false)
- Status: FAILED - SOURCE ROLLED BACK
- Lesson: Do not continue tablet changes when a guard or test fails.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v7-step1-20261109-140938

### 20261109-141706 - Tablet V7 retry
- Error: Cannot validate argument on parameter 'ArgumentList'. The argument is null, empty, or an element of the argument collection contains a null value. Supply a collection that does not contain any null values and then try the command again.
- Status: FAILED - SOURCE ROLLED BACK
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v7-step1-retry-20261109-141706


### 20261109-141757 - Tablet V7 Step 1 V3
- Error: JS_SYNTAX failed (exit 1); logs: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v7-step1-v3-20261109-141757\JS_SYNTAX.stdout.log / D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v7-step1-v3-20261109-141757\JS_SYNTAX.stderr.log
- Status: FAILED - ROLLBACK VERIFIED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v7-step1-v3-20261109-141757

## 2026-11-09 14:25:38 - Computer Resign V1
- Result: FAILED
- Scope: enable existing resign button in computer matches
- Source: src/pages/game/GamePage.tsx
- Xiangqi/Jieqi: computer mode
- Existing confirmation and resign logic preserved
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-resign-v1-20261109-142321
- VPS: not touched
- Browser QA: pending


### 20261109-142017 - Tablet V7 Step 1 V4
- Error: BUILD FAILED (exit 1). LOG: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v7-step1-v4-20261109-142017\BUILD.log
- Status: FAILED - ROLLBACK VERIFIED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v7-step1-v4-20261109-142017

### 20261109-143538 - Tablet V7 V5
- Error: Another build/test process may be running. Stop it before retrying.
- Status: FAILED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v7-v5-20261109-143538

### 20261109-162931 - VPS restore failure
- Error: VITEST FAILED
- Rollback: PASS
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-VPS-RESTORE-V4-20261109-162931.txt
- Rule: verify staging and protected files before replacing LOCAL.

### 20261109-164301 - VPS archive audio filename recovery
- Evidence: extracted VPS filename did not match Unicode audio imports.
- Cause: filename encoding corruption during archive extraction.
- Resolution: renamed one WAV file in VPS staging only.
- Audio SHA256: 32EE9A41E18C3A9209622FE5D4575281120B290F960DDC5B6830A2A1632E6D58
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\vps-audio-name-v6-20261109-164301\─æi qu├ón (2).wav
- Source code: unchanged.
- VPS: untouched.
- Full Vitest/build: pending next restore attempt.
- Prevention: verify Unicode filenames after cross-platform archive extraction.

### 20261109-165847 - Computer three-task V8
- Status: FAILED
- Scope: src\pages\game\GamePage.tsx, src\features\game\components\GameEnergyControl.tsx, src\features\game\components\CapturedJieqiPieces.tsx
- Changes: computer resign, computer victory audio isolation, Jieqi mobile utility alignment, horizontal captured pieces
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-3task-v8-20261109-165847
- Rollback: PASS - SOURCE HASH VERIFIED
- Error: [90mstderr[2m | tests/saved-match-history.test.tsx[2m > [22m[2masks before deleting a saved game and keeps confirmation open on failure (compact=false)
- Typecheck/Vitest/build logs: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-3task-v8-20261109-165847
- Browser QA: pending
- VPS: untouched


## 20261109-175123 - Old iPad VPS source V3
- Attempt: Read-only source retrieval via SSH.
- Result: FAILED.
- Error: warning: in the working copy of 'D:\Hß╗ìc\code\code games\Cß╗¥ T╞░ß╗¢ng\board-game\.ai-backups\ipad-old-vps-v3-20261109-175123\src\lib\desktopCanvas.tsx', LF will be replaced by CRLF the next time Git touches it
- Root cause: Not yet confirmed.
- LOCAL game source: unchanged.
- VPS: unchanged.
- Prevention: Validate SSH exit code and SHA256 before importing.


## 20261109-180608 - Deploy archive V2
- Result: FAILED
- Archive: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\deploy-upload-v2-20261109-180608\hovang-local-v2-20261109-180608.tar.gz
- Remote: /home/nhat_hoang/hovang-local-v2-20261109-180608.tar.gz
- No production activation.
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-DEPLOY-UPLOAD-V2-20261109-180608.txt

## 20261109-225144 - Result sound V1
MEMORY READ: AI_WORK_RULES.md
MEMORY READ: AI_FAILURE_LOG.md
MEMORY READ: AI_CHANGELOG.md
MEMORY READ: AI_PROJECT_MEMORY.md
SOUND: WIN ONLY ON WIN; DEFEAT ONLY ON LOSS
TYPECHECK: PASS
ERROR: [33m[plugin builtin:vite-reporter] 
ROLLBACK: RESTORED
SOUND FIX SUCCESS: False

## 20261109-232050 - Piece Smooth V1
MEMORY READ: AI_WORK_RULES.md
MEMORY READ: AI_FAILURE_LOG.md
MEMORY READ: AI_CHANGELOG.md
MEMORY READ: AI_PROJECT_MEMORY.md
BACKUP: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\piece-smooth-v1-20261109-232050
PATCH: FIRST-FRAME CONTINUITY FIX APPLIED
MOVE DURATION: UNCHANGED
MOVE PATH: UNCHANGED
FLIGHT HEIGHT: UNCHANGED
TYPECHECK: PASS
ERROR: BUILD FAILED: 1
STATUS: FAILED
SOURCE ROLLBACK: PASS
SUCCESS: False
LOCAL ONLY: YES
VPS: NOT TOUCHED

### 20261109-231143 - No-Blink V2
- Status: FAILED
- File: src\features\game\components\PlayerCard.tsx
- Transition: 350ms -> 120ms
- Avatar and rank title: unchanged
- Clock logic: unchanged
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\no-blink-v2-20261109-231143
- Rollback: PASS - SOURCE HASH VERIFIED
- Error: BUILD FAILED
- Browser QA: pending
- VPS: untouched

## 20261109-232532 - Piece Smooth V2
MEMORY READ: AI_WORK_RULES.md
MEMORY READ: AI_FAILURE_LOG.md
MEMORY READ: AI_CHANGELOG.md
MEMORY READ: AI_PROJECT_MEMORY.md
BACKUP: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\piece-smooth-v2-20261109-232532\Board.tsx
ERROR: GUARD FAILED: Board.tsx differs from expected version
STATUS: FAILED
SUCCESS: False
LOCAL ONLY: YES
VPS: NOT TOUCHED

## Piece Smooth V1 build diagnosis
Vite frontend build succeeded, but npm run build failed in
scripts/hovang-webp-postbuild.cjs with "Trial increased build size".
This is a postbuild size guard, not a TypeScript or Vite failure.
Do not disable the size guard. Validate Vite separately when
diagnosing animation-only changes, and report the distinction.

### 20261109-232627 - No-Blink V3 (120ms)
- Status: FAILED
- File: src\features\game\components\PlayerCard.tsx
- Change: two timerVisible transitions 350ms -> 120ms
- Avatar, title, clock logic: unchanged
- Source asset: viewer-card-frame-tight.png
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\no-blink-v3-20261109-232627
- Rollback: PASS - SOURCE RESTORED
- Error: VITEST FAILED
- Browser QA: pending
- VPS: untouched

- 2026-11-10: Lệnh sửa PlayerCard lần đầu lặp tiền tố board-game trong cwd board-game nên Resolve-Path lỗi, không ghi file; sửa bằng đường dẫn tương đối src/... và ErrorActionPreference Stop. rg wildcard trong đối số path PowerShell lỗi123; dùng -g cho glob.

- 2026-11-10: Get-Process node không thấy process (exit1) trong lúc poll build; không dùng kết quả này để kết luận build lỗi. Kết quả session build cuối exit0/PASS.

- 2026-11-10 piece-immediate: npm run build lượt đầu tiến trình kết thúc -1073740791 sau Vite transformed, không có lỗi nguồn trong log. Chưa xác định nguyên nhân; chạy lại riêng sau test. Get-CimInstance bị từ chối quyền, không suy đoán trạng thái process từ đó.

- 2026-11-10 / viewer-owner: rg với glob trong đường dẫn trên PowerShell bị OS error 123; dùng thư mục + -g thay thế. Test mới ban đầu kỳ vọng phòng custom nằm trong service.list(), sai vì custom được ẩn khỏi sảnh theo thiết kế; sửa assertion chỉ áp dụng phòng thường/khóa. Chạy lại 11 suites: 91/91 PASS. Lần build đầu TypeScript/Vite qua nhưng postbuild WebP lỗi ENOENT ranking-xiangqi-tab-user-WfsrpnlX.png trong dist; chưa xác định nguyên nhân, không sửa script/asset ngoài phạm vi; chạy lại build để xác minh.

- 2026-11-10 piece-immediate retry: TypeScript/Vite PASS, postbuild ENOENT dist/assets/13_hai_phong-BWqTeccJ.png. Build Vite ra thư mục riêng .ai-backups/piece-immediate-20261110/dist PASS. Không kết luận source lỗi hoặc toàn bộ npm build PASS.
- 2026-11-10 / viewer-owner build retry: npm run build lượt 2 thoát native -1073740791 sau transform; npx vite build --logLevel error chạy lại PASS, build tách riêng outputs/backups/viewer-owner-20261110/dist PASS. Postbuild WebP chạy riêng PASS (206 ảnh chuyển, 142.79MB giảm), đang chờ finalpass. TypeScript chạy lại PASS. git diff --check source/tests task PASS; diff-check tài liệu báo whitespace đã có trong các mục log cũ, không sửa nội dung ngoài task.
- Kết thúc viewer-owner 2026-11-10: finalpass chạy riêng PASS exit0, APPLIED, giảm14.6394MiB; không cần sửa pipeline ngoài phạm vi. Các lỗi build ban đầu được ghi lại, bản Vite tách riêng và từng bước build cuối đều PASS.

- 2026-11-10 / queue-block-entry:12ca mới lần đầu fail do tên fixture Sau mo chan vượt10ký tự, không phải logic queueBlocked. Rút tên fixture thành Mo chan; chạy lại6suites62/62PASS, TypeScriptPASS. Không đổi validator hoặc logic ngoài phạm vi.

- 2026-11-10 / computer-public-brand: truy vấn rg glob trực tiếp đường dẫn trên Windows lỗi123 và src/services/pikafish.ts không tồn tại; đổi sang tra file thực tế. Ba test HTTP loopback bị sandbox EACCES connect127.0.0.1, đã thay bằng gọi Express router trực tiếp trong bộ nhớ, 4/4PASS gồm route/429/503 và không lộ tên/path. Sáu suite UI/service trước đó37/37PASS. TypeScript và Vite build riêng outputs/backups/computer-public-brand-20261110/distPASS. jsdom báo navigation to another Document ở ca điều hướng có sẵn, không phải browserQA. Không xin quyền mạng/không truy cập VPS.
- 2026-11-10 / computer-public-brand: kiểm tra TypeScript cuối gọi nhầm npm tại root không có package.json (ENOENT); chạy lại trong board-game. Không sửa package hoặc cấu trúc repo.

## 2026-11-10 — Rematch audio / normal-room energy
- Kiểm thử trước đây thiếu direct finished→playing; không được kết luận không có lỗi chỉ từ test có phase ready trung gian.
- Lượt đầu: test energy cũ kỳ vọng hai người xuống View, cần cập nhật theo quy tắc mới; test local intro phát hai lần vì reset cờ quá rộng, sửa chỉ reset direct-rematch online (preserveResultOnReady). Một patch hẹp trùng text chạm nhầm cleanup, được phát hiện qua đọc diff và sửa trước chạy xác nhận.
- Socket sandbox EACCES127.0.0.1/websocket error; chạy lại ngoài sandbox localhost tạm 3suites4tests PASS, không VPS.
- Broad UI suite còn1fail: test mong lỗi Fairy-Stockfish gốc nhưng UI hiện thông báo Ông Hoàng chung. Không thay code/thông báo chọn máy ngoài phạm vi. 96 targeted tests và4socket tests cuối PASS; TypeScript/Vite PASS.
- Chuẩn hóa EOL gây diff toàn file ở các file index CRLF; phục hồi CRLF các file đó. Dùng git diff --ignore-space-at-eol khi đối chiếu nội dung.

- 2026-11-10 final-dist: sau copy cả thư mục, checksum index dist khác bản build; chưa xác định nguyên nhân. Đã chép index.html tường minh sau assets, checksum khớp và mọi đường dẫn src/href trong index tồn tại. Không báo bản local sẵn sàng trước kiểm chứng này.

## 2026-11-10 — iPad canvas local validation
- apply_patch rejected delete+add for the same main.tsx in one patch; no write occurred. Replaced the entry separately after backup.
- QA script initially used a Windows drive path in an ESM import (ERR_UNSUPPORTED_ESM_URL_SCHEME); corrected to file:/// with encoded spaces.
- Playwright browser discovery used sandbox APPDATA; explicit PLAYWRIGHT_BROWSERS_PATH found the existing WebKit. WebKit still failed spawn UNKNOWN inside/outside sandbox. Edge sandbox closed during launch; outside sandbox launched, but local navigation timed out. Browser QA is not PASS.
- Regression: 68/69 tests PASS; ui.test.tsx expects Fairy-Stockfish error text but current local implementation returns the Ong Hoang message. Reproduced the identical assertion failure with original main.tsx restored temporarily, then restored the iPad entry in finally. Focused baseline also reported 3 lazy-import teardown errors. No engine/UI test changes made.
- npm run build: TypeScript/Vite PASS, first WebP optimization PASS; finalpass stopped at Less than 5 MiB saved: 0.746. Full npm build is NOT PASS; size guard was preserved. No production deployment.
- Follow-up browser harness lookup: a repo-relative backup path was once combined with cwd=board-game and failed to copy; no source was changed by that failed command. Rerun from the correct working directory using paths relative to that cwd.

- 2026-11-10 Elo random: test ban đầu chọn Elo=1000 và4000/5000 nằm trần sao Kỳ Thánh, chênh Elo không phản ánh cùng bậc/sao như fixture cần; thay fixture sang1100/1150 và xác nhận getRankProgress cùng level/stars trước assert. Không phải lỗi production code.

- 2026-11-10 / VPS release preflight: không thể dùng workflow production để activate vì hiện chỉ tạo artifact. Checkout có146 modified +413 untracked, HEAD diverged from origin/master; không đóng gói tree trực tiếp hoặc bypass SHA+push-CI gate. Full Vitest run cho thấy failures ở ui Fairy message (đã sửa assertion stale; targeted 1/1 PASS), pikafish HTTP, server socket, PayOS webhook, admin, notification device, mobile-preview, moderation, persisted-rematch và locked-room socket. Dừng full run trước tổng kết; các nguyên nhân chưa xác minh hết, không tuyên bố đều do sandbox. Typecheck PASS.

- Kết thúc xác minh 2026-11-10: các lỗi HTTP/Socket/API suite từng báo trong sandbox đều tái hiện dạng `connect EACCES 127.0.0.1:<port>`; chạy lại với quyền loopback, 9 suite30/30 PASS. npm test toàn bộ hoàn tất 225 file PASS/6 SKIP,1171 PASS/41 SKIP; TypeScript PASS. Lỗi duy nhất trong repo là assertion cũ trong ui.test.tsx, đã đồng bộ thông báo Ông Hoàng và test liên quan PASS.
- `git diff --check` trên hai log dài báo nhiều trailing whitespace ở nội dung log cũ đã có trước task (dòng copy output CLI); test assertion thay đổi không có whitespace lỗi. Không chuẩn hóa log lịch sử ngoài phạm vi.

- 2026-11-10 / vps-release-prep: local PowerShell SSH to 103.9.78.75 as cotuong_deploy using the documented key returned Permission denied (publickey); no VPS write/deploy occurred. Initial MySQL integration attempt inside sandbox failed creating/renaming temporary InnoDB redo logs (OS access error 5); reran outside sandbox against an isolated MySQL8.0.45 instance. First integration run exposed stale assertions only: rename fixture used two uppercase letters, game test waited 1.4s while MATCH_INTRO_MS=2s, and Elo tests assumed fixed ±13 despite random 11–13. Updated only tests/account-persistence.integration.test.ts; final db:integration PASS (54 migrations, rerun0, schema/smoke PASS, 6 files/40 tests PASS). Package review caught tracked/untracked backup fixtures and src/assets/references/uploads in early candidates; they were excluded from final v4 allowlist. An initial tar job exceeded the command wait window but completed; integrity was checked on final archive. Auto-review rejected deleting/replacing earlier large staging artifacts; they were retained and distinct v3/v4 artifacts used instead. No candidate package was uploaded.
- 2026-11-10 / user-run deploy commands: pasted PowerShell output confirms the documented `cotuong_github_deploy` key was rejected by 103.9.78.75 on the first SCP. Later SSH/SCP commands were entered separately and also failed public-key auth; no preflight, upload, remote directory, checksum, migration, restart, or deployment succeeded. Do not continue with release commands until deploy-user key/host is corrected and a minimal SSH identity check passes.

- 2026-11-10 move-audio-idle: lookup move-sound-source.md failed because no such documentation exists; used the existing audio/background-music-source.md for mute policy. First test append used duplicated board-game prefix under board-game cwd and failed without changing files; corrected to tests/game-sounds.test.ts and reran successfully (24/24). Verify cwd before relative writes.
- Diff check mặc định báo CRLF là trailing whitespace trên các hunk cả cũ lẫn mới; kiểm tra source/test bằng git -c core.whitespace=cr-at-eol diff --check PASS, không chuẩn hóa toàn file ngoài phạm vi.
- 2026-11-10 audio-idle full build: TypeScript/Vite succeeded; existing hovang-webp-postbuild.cjs:62 failed ENOENT dist/assets/message-CebfAm2M.png. Do not claim full build PASS or deploy generated dist. No changes to image optimizer in this audio task. Node process inventory afterwards returned no process (read-only diagnostic).

- 2026-11-10 reconnect: git status ban đầu bị Permission denied ổ D; xin quyền đúng thư mục rồi đọc/sửa. rg wildcard trong đối số đường dẫn Windows lỗi123; dùng thư mục + glob. Lượt test sandbox: 41 PASS/2 Socket.IO FAIL vì connect EACCES localhost; chạy lại ngoài sandbox 43/43 PASS. Không sửa dependency hoặc logic để né sandbox.

- 2026-11-10 Google login: initial full npm build passed TypeScript and Vite, then WebP postbuild failed ENOENT reading dist/assets/create-group-title-gold-v2-DBQBrjat.png. Cause of missing file not established (shared dist can be changed by another build). Retried Vite plus both unchanged postbuild steps in .ai-backups/google-login-20261110/build. Do not call the initial npm build PASS. Default git diff --check reports CRLF as trailing whitespace; Windows-aware `git -c core.whitespace=cr-at-eol diff --check` on the three tracked source/test changes PASS. Earlier rg commands containing Windows literal wildcard arguments/missing paths were read-only lookup failures; used explicit existing file paths afterward.

- 2026-11-10 reconnect build: lượt đầu TypeScript/Vite PASS nhưng postbuild đọc dist/assets/info-wEJVNkUa.png lỗi ENOENT. Không sửa script ngoài phạm vi; build lại ngoài sandbox thành công đầy đủ (206 PNG chuyển WebP, finalpass237 ảnh). Nguyên nhân file biến mất ở lượt đầu chưa xác định.
- Google login packaging recovery completed: isolated Vite and both original postbuild scripts PASS, finalpass saved14.6394MiB, exit0. No build guard bypassed; source fixes retained after passing validation.

- 2026-11-10 admin-analytics: Initial TypeScript checks found nullable Google profile access and string gold in a numeric store test fixture; guarded profile and corrected fixture, final typecheck PASS. Initial admin HTTP test failed EACCES127.0.0.1 in sandbox; rerun outside sandbox18/18 PASS. First integration-test patch context used a stale test title; apply_patch refused without mutation, then applied against verified final lines. Targeted rg lookups for nonexistent old UI filenames/PowerShell wildcard operands failed; used actual GameTools/ReplayControls and glob flags. No secrets printed. Final disposable MySQL42/42 and full build PASS.

- 2026-11-10 admin-statistics500: sandbox read DB hit EACCES; authorized outside sandbox read confirmed missing022tables. db:migrate failed ER_TABLEACCESS_DENIED_ERROR because configured migrator lacks REFERENCES (SHOW GRANTS verified). Runner left022:001running; after proving both tables absent and exact known checksum/version/status, removed only failed unapplied marker transactionally using existing local runtime DML permissions. No applied records or user data altered. Missing-table fallback regression8/8 and actual DB report read PASS. Administrator grant still required; do not rerun migration blindly while rights are missing. Backup verified before attempt.

- 2026-11-10 deploy packaging: First manifest summary print hit Windows cp1252 UnicodeEncodeError after payload/manifest were already written; reused verified staging and ran python -X utf8 for archive without recopy. First Gitleaks config path ../../.gitleaks.toml was wrong under board-game cwd; corrected ../.gitleaks.toml and scan PASS. SSH two existing deploy keys rejected with publickey; stopped further key attempts, asked user to authorize known deploy public key. No VPS changes yet.

- 2026-11-10 VPS deployment preparation: initial remote typecheck failed due packaging filter omitting scripts/vps-test-readonly-smoke.ts, imported by a test. Added unchanged file to staging and archive-v2; candidate full build then PASS. No source behavior changed. Current VPS fresh backup local succeeded but cloud failed OAuth token refresh; user admin diagnostic confirmed invalid_grant/expired token. No migration/live code changes or restart; do not bypass backup gate. One commentary SSH option typo IdentitiesOnlyes was immediately corrected to IdentitiesOnly before user execution. User pasted an altered Env:Userprofile path once; provided fixed absolute SSH key path, then credential setup succeeded.

- 2026-11-10 normal-empty-room regression setup: initial fixtures used a name over10characters and asViewer=true while phaseReady; server correctly rejected them. Corrected names and normal join into full seats, then marked viewers exhausted after joining. Baseline confirmed two real failures: no-eligible-viewer room retention and final-seat energy demotion without inheritance (both variants). Both fixed; final56/56tests and TypeScript PASS. No regression assertions weakened.

## 20261110-190123 - Fairy deploy V1 failure
Symptom: BASH SYNTAX FAILED
Source ZIP guard and backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\fairy-deploy-20261110-190123
Lesson: stop on failed guard/check; verify rollback before retry.


- 2026-11-10 Bỏ AI: targeted rg used a wildcard filename operand Computer* on Windows and failed; corrected by exact files/--glob. Initial feature clarification was required because “bỏ AI” could mean presentation vs engine behavior; user clarified only the two-switch panel/navigation placement. Final implementation leaves engine callbacks/state unchanged. No build/test failures in feature implementation; previous full build finished while later activity-code addition was being made, so launched clean final full build after all edits to ensure dist matches final source. No simultaneous Vite writes to dist.

- 2026-11-10 orientation-state:2new regressions failed on baseline exactly because state reset after breakpoint rotation; after stable-wrapper fix34/34PASS. Targeted file lookups initially used desktopCanvas.ts/DesktopCanvas.tsx but actual source is desktopCanvas.tsx; corrected casing/extension, no wrong source edits. Final rg usePhonePortrait returned exit1 because no references remain (expected after removal). No failed implementation checks after fix; TypeScript/diff-check PASS. Full build tracked separately.

- 2026-11-10 empty-room VPS investigation: remote rg missing; used Python/read-only metadata instead. Correct-host source inspection failed PermissionError because currentrelease cotuong:cotuong, deploy lacks traversal; did not bypass permissions. Prepared user-run capture helper, not executed because user canceled VPS scope. DNS verification corrected wrong previous production-host assumption before any activation. New abandoned-creation regression intentionallyfailed3cases on baseline, all pass after fix; final92/92andTypeScriptPASS. Source-only helper uploaded to private staging, no live code/DB/room changes or restart. Do not continue old-host deployment instructions for current domain.

- 2026-11-10 device-entry: Web tool không mở được website; curl/browser xác minh gốcHTTPS200 và wwwDNS lỗi6. Windows cached WebKit launch spawnUNKNOWN, không báo Safari PASS; dùng Chromium device emulation ghi rõ giới hạn. Test mới fs URL trong jsdom không file scheme, sửa readFileSync theo cwd project; rerun58/58PASS. Browser phones audit lưu report thiếu thư mục; chuyển audit asset vào work/device-audit và rerun lưu thành công. Không SSH/đổiDNS/taoaccountlive.

- 2026-11-11 release prep: Fullsuite đầu1234PASS/1FAIL/44SKIP doassertionlist1phòngđãlỗithờivớiquytắcẩn0ghế; giữno-new-roomassertionbằngroomsForPreparation vàkiểmtralisthidden, rerun1235PASS/0FAIL. Một số đườngdẫnđọccũ khôngtồntại; đãdùngđúngthưmụcboard-game. BashlocalC:/ProgramFiles/Git/bin/bash.exe khôngcó; dòngPASSđầu khôngđủbằngchứng, đãxácnhậnbash-nthậttrênVPS bằngdeployuser,khôngthựcthirootstub. Khôngdùngadapterrootđểvượtquyền; quyềnrootchờusernhậppassword.

- 2026-11-11 admin UI: lệnh bổ sung test đầu tiên dùng dư prefix board-game khi cwd đã là board-game, FileNotFoundError; đã sửa đường dẫn và chạy regression thành công. Không thay source do lệnh lỗi.

- 2026-11-11 audio-idle-local: Đọc nhầm docs/audio/background-music-source.md và test ui-action-sound/confirmation-action-sound không tồn tại; dùng source audio/background-music-source.md và test ui-checkbox-sound. Guard resumePromise ban đầu chặn gesture mới trong2regression permission, đã cho gesture thửresume lại, rerun48/48 PASS. Harness Vite đầy đủ bị optimizer quétbackup dẫn tới navigationtimeout; dừng2process test, dùng configtest riêng noDiscovery+React/Zustand và cache riêng, Chrome idle180s PASS. Lượt đầu captureConstantSource.offset.value thấy mặcđịnh1 trước automationapply; thêm intrinsicvalue1LSB trướcstart, browserconfirm đúng0.000030517578125. Build các lượt chạy nối tiếp, không chồng postbuild.
- Kiểm chứng cuối admin UI2026-11-11: chạy lại5suite15/15PASS, tscPASS, Vite bundlePASS. Full npm build KHÔNG PASS: bước hovang-webp-finalpass lỗi ENOENT dist/assets/phong-tang-2-C0-SjYor.webp (PNG tồn tại, WebP thiếu). Không xác nhận dist sẵn sàng phát hành; giữ thay đổi source đã qua regression, chưa browserQA/deploy.

- 2026-11-11 animation-assets: Đọc nhầm đường dẫn useRoomEntrance/useAnimation/HovangLoadingOverlay; đã tìm đúng file bằng rg. Get-Process node không thấy process sau build; không coi là lỗi build. Oxlint không chạy được do Windows Application Control chặn native binding, fallback WASI không có; không sửa dependency/không tắt bảo vệ. Dùng12regression + TypeScript/build để kiểm chứng; không ghi lint PASS.
- Diff-check source/test PASS; diff-check toàn tài liệu báo trailing whitespace cũ trong AI_CHANGELOG/AI_FAILURE_LOG, đã đối chiếu backup có sẵn; không sửa nội dung cũ ngoài task.

- Kiểm chứng cuối animation-assets2026-11-11:12/12 tests4suite PASS; mã cuối TypeScript/Vite PASS. Full npm run build cuối FAIL ở script ảnh finalpass do saved2.4741MiB dưới ngưỡng5MiB; không đổi script/ngưỡng/không tuyên bố fullbuildPASS (lượt build trước mãcuối đãPASS). Oxlint bịApplicationControl chặn nativebinding. Chưa browser/FPS/mobile QA; khôngdeploy. Log .checkpoints/animation-assets-20261111/build-final.log. Source giữ thay đổi đã được regression/typecheck/Vite xác minh; lỗi threshold là bước tối ưu artifact, không lỗi TypeScript/animation.

- 2026-11-11 audio build final: postbuildảnh distchung lỗiENOENT market-bronze-Dqy9rnI-.webp; chuyển sangsnapshotcáchly, đúngnpmrunbuild/giữVITEpublickhôngcopy.env. Hai file chuyển cảnh đổi trong lúcbuild; đồngbộdistđầu chạytrướckhifullsourcevalidationkếtthúc nênkhôngđạtchecksumready. Đãgiữcheckpoint, syncđúng2filemới, rerunisolatedbuildPASS, chờsourcehashcomparisonPASS rồicàidistlầncuối+hashPASS. Khôngsửa/hạquytắcảnh hoặcchuyểncảnhđểvượttest.
- 2026-11-11 piece-motion: Đã hiểu nhầm yêu cầu tối ưu quân cờ thành mở màn ở task trước; hoàn tác đúng OpeningCover/test/helper riêng mình, giữ các thay đổi audio/admin của task khác. Regression ChessPiece lượt đầu1FAIL/25PASS do jsdom serialize url(#id) thành url(quoted-id) sau táchfilter; chuẩn hóa dấuquote trong assertion, thêm regression node/filter/bóng không đổi rồi35/35PASS. npx --no-install playwright vẫn tìm registry và ENOTFOUND; khôngcài thêm/khôngghi browserQA PASS. Đọc Piece.tsx/useReplay.ts không tồn tại, đã dùng đúng ChessPiece/useReplayTrial. Build kiểm ở thư mục riêng để tránh xungđột distchung.

- 2026-11-11 mobileactions: banđầu tênGameActions/useGameLayout/testmobile-board-controls khôngtồntại; dùngMatchActions/useBoardLayout. Tìm trongcheckpoint rộng tạooutputlớn, đãdừng vàchỉđọcfilerelated/manifestgóiđãbiết. Khôngsửa cácbảnsnapshotcũ.

- 2026-11-11 mobileactionsbuild: Board.tsx đổi song song và prepareSceneImages.ts bị xóa trongsource tronglúcbuild. Khôngghiđèsource; syncBoardmới,quarantinestalehelperchỉtrongsnapshot sauxácminhkhôngcònimport,buildvàđốichiếufullsourcePASS. Userlàmrõgiữagiữakheboard/screen, thayphươngánbottom56bằngmidpoint vàbuildlạimãcuối,càidistsauvalidationPASS.

- 2026-11-11 iPad cover: Initial backup/edit/test blocked by filesystem permission; no source written. Requested project write permission, then backed up and applied once. Initial Vitest could not write Vite config cache before grant; after grant 19/19 PASS and typecheck PASS. desktopCanvas is .tsx, not .ts; used actual source after lookup.

- 2026-11-11 mobile-motion recovery: User báo sửa trước làm điện thoại đơ; functionaltests không chứng minh FPS. Rollbacksplitfilter/warmcache rồi mới thử mobilecachedfaces. Shellsandbox lỗiCreateProcessSecurityEnvironment0x80070020 vànodeREPLkernelassetslỗi; chỉdùngescalationđượcduyệt, khôngđọcsecret. Đọc nhầmuseCompactViewport/DesktopCanvas/useComputerClock/output.js; dùngđúngfiletìmđược, khôngscanmodulekhác. PNG→WebPrawRGBdelta255 chỉtrongalpha0, visibleRGB/alpha0delta; chuyểnkiểmchứngđúngvisiblepixels. Testđầu3FAIL vìjsdomkhôngmatchMedia, thêmguardtươngthích;r erun32PASS. Captuređầuthiếumetaviewport vàbenchmarkđồngthờitestsbịnhiễu; đãsửaharness/bỏbằngchứngđó. StagepublicenvguardpháthiệnVAPIDlocalkhôngcótronglivebundle; sourcepushcodekhôngbundled, giữGoogleIDmatchlive/bỏpushvars ngoài scope,r erunLinuxbuildPASS. LệnhMoveảnhthamchiếudưprefixboard-gamekhicwdboard-game bịFileNotFound, khôngxóahayđổiảnhnguồnđócủangườidùng. LastpublisherSSHcommand bịAUTOREVIEWREJECT vìAGENTSlocalonly/rootactivation; khôngretryđườngvòng, chỉchốtlocalreviewfiles vàxinuserxácnhận. MọiVPSproductionpointer/service/DBgiữnguyên.

- 2026-11-11 mobile-motion activation attempt: User chạy Apply-Mobile-Motion-VPS-20261111.ps1 nhưng su trả Authentication failure; chưa qua xác thực root, publisher chưa chạy. SSH đọc lại xácnhận current hovang-local-20261111-10fafbf55a51, serviceactive/PID330486, khôngactivation-result.json, liveindexSHA2c568b5f83323d63613057c7a48c6841c4dd217f36bc36dbdc7f0a8192b994ca nhưtrước. Không tựthửmậtkhẩu/đổiquyền/tắtxácthực; chờusernhậpđúngroottrựctiếptrongterminal hoặc khôiphụcrootquabảngquảntrịVPS. Không deploy thànhcông/khôngsửagiaodiện/gameplay lượt này.

- 2026-11-11 mobile-motion auth đính chính: User xác nhận mật khẩu đang có là nhat_hoang, không phải root; root Authentication failure không chứng minh mật khẩu nhat_hoang sai. Đọc readonlyVPS xácnhận nhat_hoang thuộcnhómsudo, PAMsu khôngbậtwheeldeny. Đãsửa đúng Outputs/Apply-Mobile-Motion-VPS-20261111.ps1: vẫnSSHcotuong_deploy, su nhat_hoang rồi sudo xác thực thôngthường bằngmậtkhẩunhat_hoang(usernhậptrựctiếpterminal,cóthể2lần). KhôngđổiSSHuserquảntrị/root, khôngđổisudoers/password, publisherSHA015756f23251133cc1bca9ba6719ed3c0ccd538f3c0d8859ce22b87aa71c069akhôngđổi. Phát hiện trước khiuserđăngnhậplạilỗi quoting quaPowerShell5.1 của cách&ssharglồng; sửaProcessStartInfo+Windowsnativeargumentquoting, testread-only cùng2lớpshell/sha256sum trênWindowsPowerShell5.1PASSpublisherOK. Sửa checksumprintfescape thànhecholineASCIIghimhash; verifytrựctiếpdeployPASS. Testfilebash-squaGetContentRaw bịCRLF(--\r), khôngdùngcáchpipeđóđểkíchhoạt. ClientcuốiparsePASS; userchưachạyclientnhat_hoang, chưadeploy/VPScurrentvẫnbảncũ. Khôngregenerateclientbằngfinalize-local.pycũvìcheckpointđóvẫndựngsuroot; clientOutputshiệntạilàbảnđúng.

- 2026-11-11 mobile-motion sudoTTY: User đãqua su nhat_hoang(passwordđúng), nhưngsudo báo a terminal is required; chưa thực thi rootpublisher. VPSreadonlyvẫncurrent10fafbf55a51/serviceactive/PID330486. su --help trênVPS xácnhận --pty hỗtrợ; cậpnhật client Outputs/Apply-Mobile-Motion-VPS-20261111.ps1 dùng su --pty nhat_hoang -c sudo... đểgiữPTYcho lời hỏi mật khẩu sudo, khôngdùng-S/askpass/ghi mật khẩu hayđổiquyền. PowerShell5.1 testreadonly bridgePTY(trả/dev/pts/1)+nestedchecksum publisherOK, finalclientparsePASS. ChỉmớikiểmtraTTYdướideploy, chưa tựxácthựcnhat_hoang/sudo hoặc activate; chờuserchạyclientmới. Publisher/codegói/VPSadmin/DB/backendkhôngđổi; cầnkiểmtraactivation-result saukhiuserchạyxong. Đây làlỗi clientthiếuPTY ởsu-c trướcđó, khôngyêucầuserđổimậtkhẩu.

- 2026-11-11 mobile-motion publisher v1 FAILED_ROLLED_BACK sauauththànhcông: Usernhậpcorrectnhat_hoang/sudo; publishercopiedcandidate/hashcheckxongnhưngđổicurrentkhôngđổitrangHTTP. NguyênnhânxácnhậnNginxlocation/proxyall127.0.0.1:3001; server/app.ts staticDirectory tính từimport.meta.urlđãrealpathlúcboot nênExpressvẫnđọcBASE/dist cũkhi giữprocesskhôngrestart. Đây làgiảđịnhsai trongpublishercủaagent, khôngphảimậtkhẩu/mạng. V1đãrollbackcurrent10fafbf55a51, backendactive/PID330486khôngđổi, liveindex2c568...nhưtrước; candidatev1retainedrootowned/chưapháthành.
- Đãsửa publisher-v2 SHA b2cca48c440ba367a980c817b19251f899bcb664ac435547e29ff9e16aeff884 (góiUI505files/505hash/32testsfrontendkhôngđổi). Candidate mobile-motion-20261111-06a6d89f7a2a-v2; dùngrenameat2RENAME_EXCHANGE đổi BASE/dist thậtthànhsymlinkcandidate/distnguyêntử, lưuoriginaldir BASE/dist.before-mobile-motion-06a6d89f7a2a-v2; vérifyHTTPnewtrướcđổicurrent, giữoldchunks, admin/serverinodes, backendPID. Rollbackv2khôiPHỤCCẢstaticpathlẫncurrent, khôngchỉđổicurrent. HandlerHUP/INT/TERM đượcghi report/rollback trongtry. Chưachạyrootv2, chờuserchạyOutputsclientđãupdatepinhash/sourcev2, vẫnsu--pty nhat_hoang/sudo2password, khôngđổiquyền.
- KiểmchứngthựcVPSdướideploy, fixture riêng /home/cotuong_deploy/publisher-v2-qa-* (khôngproduction): táihiệnv1currentđổinhưngExpressvẫntrangold; staticexchangePASS/rollbackPASS/PID+RAMcountergiữ. ChạyCHÍNHpublisher-v2 vớirootmetadata/systemctlhookmôphỏngvà505fileartifactthật trênExpressstaticpinnedfixture: successPASS vàforceHTTPmismatchSAUđổicurrent→rollbackPASS,oldchunksPASS,PID+RAMcountergiữ. Khôngelevate/khôngchạmproduction; fixtuređượcdọn. Hai lỗitestfixtuređãsửa: đườngdẫnẩn.cotuong-incoming khiếnExpresssendFileadmindotfiles404, chuyểntempvềhomekhôngẩn; URLold-chunkphải/assets/old-chunk.js. Remotev2py_compile+verify-artifact505PASS/localclientparsePASS. Prodpreflightcurrentvẫnold10faf/active/PID330486. LầnrootkếtiếpkiểmstatusACTIVATED,currentv2,HTMLa104...,PID330486,staticBackupđúng; nếurollbackthìbáoerrorcụthể(naykhôngđểAssertionErrorrỗng).

- 2026-11-11 mobile replay gap: BrowserQAđầudefaultsandboxkhôngstartChrome; lầnChromehostcòndùngVitesandboxthìURLtimeout/harnessnotready. Đãstopđúng2processQAđócủamình, đưaViteQAhostcổng5201vàChromeprofilehostriêng/cổng9243, rerun15/15PASS. KhôngdùngkếtquảlỗiđầulàmbằngchứngQA, khôngđổiphầnmềm/userbrowser/systemsecurity.

- 2026-11-11 room time: Đọc nhầmservices/rooms.ts,roomApi.ts,lobby.ts,moves/clock.ts,gameRepository.ts khôngtồntại; đãdùngservices/api.ts,moves/actions.ts,matchRepository.ts. TypeScriptchặntestByRoleOptions.exactkhônghỗtrợ; bỏoptionthừa, rerunPASS. HTTPlocaltests2casebịEACCESloopbacktrongsandbox,77casekhácPASS; chạynguyên8suitenàytrênhost79/79PASS+typecheck, khôngsửatestsđểnéHTTPvalidation. KhôngMySQL/userthật/VPSactions.

- 2026-11-11 computer-rematch: Một số rg dùng wildcard trong đối số đường dẫn trên Windows và đọc useMatch.ts không tồn tại; chuyển sang đường dẫn thật/useGame.ts. Lần thêm test đầu dùng đường dẫn board-game lặp theo cwd nên không ghi file; sửa đúng cwd. Lần test --root từ thư mục cha làm test đọc file tương đối ENOENT; chạy lại từ board-game. Fixture bắt Tướng ban đầu không hợp lệ vì bên chưa tới lượt đã bị chiếu; thay bằng thế hợp lệ chiếu bí bằng Xe/Mã. Đã khôi phục source trong khi sửa fixture, áp lại đúng một callback và rerun 22/22 + TypeScript PASS. Không dùng các lượt lỗi làm kết quả kiểm chứng.

- 2026-11-11 color-result: Bản WebP thử từ pipeline extract lặp có lỗi màu nền khi xem; đã loại đúng hai file thử, chuyển PNG crop một lần giữ artwork nguồn và xem lại PASS. Không đưa WebP thử vào runtime.

- 2026-11-11 current-release: SSH/junction trong sandbox bịdeny; thực hiện đúnglệnh đãđượcuserủyquyền bằngescalation vàPASS, khôngđổiquyềnVPS. Fullsuiteđầu1fail do assertion5options cũ; cậpnhậtdanh sách7options đúngyêucầu rồi1300PASS. Cópathcwd lặp/rgWindowswildcard vàđọc tênfile khôngtồntại; sửa đườngdẫn, khôngthaycodeđểnétest. Pythonread_text trênlogUTF8 bịcp1252decode; chỉđịnhUTF8 vàPASS. Fullarchiveđầucónhiềulegacy/docscheckpoints dưthừa; dừngscp chínhmình, chuyểndelta8MB+reconstructSHAtoànmanifest, stagingPASS; khôngactivateartifactđầu. Ràpublishercũpháthiệnrollbackstartkhôngrestartnewprocess khi cònactive; đãthêmstop trướcrollback+oldindexverify,4simulationsPASS. Chưacólệnhroot/bảnsaoDBhayrestartthật.

- 2026-11-12 increment-badge: FixtureQA banđầu dùngcwdboard-game rồi lặpđườngdẫnboard-game; đãMove-Itemđúngfixturevềcheckpoint saukiểmtraabsolute trongworkspace. PythonQA cầnencodingUTF8; devVitesandboxkhôngkếtnốiđượcChromehos nênstopđúngprocessQA vàchạyhost; optimizerlâu thìbundlefixture vàpreview. Phépđogapđầu dùngmépchữoutputthaymépkhung; sửađúngthướckhung, phát hiệnviền1px nênbùliveanchor đểgapthực7px. PowerShellReplace3rdargkhôngphảicount nênđãđổicảrecordedoffset; sửađúngmộtoccurrencebằngPython rồi8casesPASS. Buildlặpoutdirngoàirootgiữassetcũ/WebPskip; khôngcàibảnđó. Cleanbuildmãcuối gặpUNRESOLVED_IMPORT./admin.css doAdminPagesửađồngthời ngoài task; khôngtựsửaphầnadmin, dist/VPSgiữ. KếtquảUItests/browserPASS độc lập, khôngtuyênbốfullbuildcuốiPASS.

## 2026-11-12 — Lỗi công cụ trong task admin/time UI (đã xử lý)

- Đọc nhầm tên tests/admin-analytics-ui.test.tsx; tên đúng admin-analytics.test.tsx. Không có source bị mất.
- Script cập nhật test dùng đường dẫn board-game/tests trong khi cwd đã là board-game: FileNotFoundError, chưa ghi gì. Chạy lại từ repo root thành công.
- Lượt test đầu chạy trước khi cập nhật test select native sang desktop combobox nên hai assertion cũ thất bại. Đã đổi test sang chọn option bằng click/keyboard. HTTP test bị EACCES loopback trong sandbox, chạy lại trên host và đạt.
- Script Chrome QA lần đầu escape selector data-value sai, gây SyntaxError ở chính script kiểm tra. Đổi sang getElementById; lượt QA kế tiếp PASS. Không phải lỗi runtime sản phẩm.
- Kiểm tra diff bằng Python gặp UnicodeEncodeError do stdout cp1252; đặt sys.stdout.reconfigure(encoding="utf-8") và chạy lại thành công. Không sửa source trong lệnh kiểm tra.
- 2026-11-12 reward-once: gọi npx vitest nhầm cwd repo root thay board-game; dừng tiến trình chưa có kết quả ngay và chạy đúng app directory. Lượt build trước sửa cuối được giữ cách ly, không cài; build lại source cuối để tránh phát hành artifact thiếu dọn batch khi đổi account.

- 2026-11-12 release-ui: readonly /proc347991/cwd và /srv/current/dist bị Permission denied dưới deploy user; không đổi quyền, chuyển xác minh pinned-path/cwd sang root preflight trong client. Vite/typecheck/PNGpostbuildPASS nhưng finalWebP lượt đầu lỗi picture memory error. Script chưa apply ảnh khi lỗi; chạy lại một luồngVIPS trên hostPASS. Chrome fixture lần đầu chưa tải module đúng hạn, retry sauHTTP200PASS. Đọc README deployment theo tên cũ không có; dùng manifest/publisher đã kiểm chứng hiện tại. rg với glob Powershell literal *.py báo path error; không tác độngsource. Không kích hoạt artifact lỗi, không bypass quyền hoặc tests.

- 2026-11-12 PR35: master direct push rejected GH013 (required PR and2checks), không force/bypass; PR35 auto-merge đã bật. CI contract55 có1fail do docs001–010 khác registry001–023; sửa2canonicaldocs,11/11contractPASS. Lượt chạy unittest đầu dùng cwd root sai nên Start directory not importable; chạy lại đúng snapshot/board-gamePASS. Index riêng dùng parent nhánh GitHub df43666c để không gom commit local7c6c0dc1 chứa file tạm.
