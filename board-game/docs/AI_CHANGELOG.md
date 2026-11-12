
## 2026-10-31 18:47:23 - Căn giữa thông báo nhận thưởng Home
- Mục tiêu: đưa toàn bộ bảng Nhận được xuống gần tâm khung game laptop.
- File sửa: src/features/lobby/components/HomeRewardNotifications.tsx
- Thay đổi: desktop translateY(5dvh), mobile giữ nguyên.
- Không thay đổi: hình ảnh, kích thước, nút xác nhận, âm thanh, logic thưởng.
- TypeScript: PASS.
- Build: PASS.
- Kiểm thử giao diện: CHƯA XÁC NHẬN.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.reward-center-backup-20261031-184713
- Rollback: khôi phục HomeRewardNotifications.tsx từ backup trên.

## 2026-10-31 19:01:07 - Tự bắt đầu trận sau 30 giây
- Mục tiêu: đủ 2 người, chờ 1 giây, đếm 30 giây rồi bắt đầu.
- File sửa: server/services/roomService.ts
- File sửa: src/lib/roomReadiness.ts
- File sửa: src/features/game/components/Board.tsx
- Không đổi: điều kiện hiển thị nút trong GamePage.tsx.
- Đã loại bỏ nhánh đếm 20 giây và trễ 10 giây cũ trên server.
- Bấm Sẵn sàng không làm trận bắt đầu trước hạn.
- Số giây không phụ thuộc trạng thái hiển thị nút.
- TypeScript: PASS.
- Build: PASS.
- Related tests: 0 file được chọn, PASS nếu có.
- Kiểm thử thực tế với 2 trình duyệt: CHƯA XÁC NHẬN.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ready-30s-backup-20261031-190054
- Rollback: khôi phục 4 file từ backup.
- Không sửa VPS.

## 2026-10-31 19:03:16 - Notification step 2C (LOCAL)
- Migration 019 already registered before step: True
- Migration registry changed: False
- QA script created: True
- Typecheck: PASS; notification tests: PASS (16/16 expected).
- QA integration NOT run; migration NOT executed.
- DB persistence: still OFF by default. Push: OFF. VPS: untouched.
- Manual live-device validation: NOT DONE.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-2c-backup-20261031-190306
- Rollback: restore migrationRepository.ts from backup only if changed; remove scripts/notification-qa-2c.mjs only if created by this batch.

## 2026-10-31 19:35:59 - ADS A1
- Goal: Rewarded advertising foundation.
- Scope: LOCAL only.
- Added: src/features/ads/rewardedAds.ts
- Added: tests/rewardedAds.test.ts
- Provider: Not connected.
- Real advertisements: Disabled.
- Energy granting: Not implemented.
- Targeted tests exit code: 0
- Typecheck exit code: 0
- Status: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ads-a1-backup-20261031-193550
- Rollback: Remove the two new files and restore the prior changelog from backup.

## 2026-10-31 19:50:18 - ADS A2
- Scope: LOCAL only; click-to-show voluntary ad after completed online match, once per match and only on Home.
- Updated: useGame.ts, HomePage.tsx.
- Added: onlineAdOffer.ts, onlineAdOffer.test.ts.
- Advertising SDK: Not connected; no actual ads can play yet.
- No payments, energy, or server modifications.
- Targeted tests and typecheck: PASS.
- Backup and rollback: D:\Học\code\code games\Cờ Tướng\board-game\.ads-a2-backup-20261031-195012

## 2026-10-31 19:52:07 - Notification 2C MySQL QA fixture-safe fix
- QA database: hovang_notification_qa on LOCAL MySQL.
- Accepted only an empty QA users table or existing fixture id=1; verified migration 019 on QA only.
- Offline write/read, reconnect persistence and online reset: PASS.
- Typecheck and 16 notification unit tests: PASS.
- Production DB: unchanged. DB persistence switch: OFF. Push: OFF. VPS: unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-2c-fixture-backup-20261031-195159
- Manual multi-device runtime test: NOT YET VERIFIED.
- Rollback code: restore scripts/notification-qa-prepared.mjs from backup; QA DDL is retained.

## 2026-10-31 19:54:02 - ADS A2B
- Scope: LOCAL only; correct A2 to automatic post-online-match ad attempt after Home navigation (without opt-in modal).
- Files changed: src/pages/home/HomePage.tsx; src/features/ads/onlineAdOffer.ts; tests/onlineAdOffer.test.ts.
- Safety: online finished-match eligibility remains in useGame.ts; no ad inside room; consume pending ad once before calling provider; failure or unavailable does not block Home.
- SDK: NOT CONNECTED. Actual ad will NOT display until a provider is configured.
- Tests: targeted tests PASS; typecheck PASS. Manual gameplay not yet verified.
- Backup/rollback: D:\Học\code\code games\Cờ Tướng\board-game\.ads-a2b-backup-20261031-195355

## 2026-10-31 22:22:14 - Notification 3A foundation
- Added validation and dormant MySQL repository for push subscriptions.
- Files: server/services/notificationDevicePolicy.ts, server/repositories/notificationDeviceRepository.ts, tests/notificationDevicePolicy.test.ts
- Tests and typecheck: PASS.
- DB migration: NOT RUN; API: NOT CONNECTED; Push: NOT ENABLED; VPS: UNCHANGED.
- Backup marker: D:\Học\code\code games\Cờ Tướng\board-game\.notification-3a-backup-20261031-222204
- Rollback: delete only these three new files after confirming no later changes depend on them.

## 2026-10-31 22:24:45 - ADSENSE VERIFICATION
- Scope: LOCAL index.html only.
- Publisher ID: ca-pub-9272190698840010
- Purpose: Google AdSense website verification.
- Result: Source verification PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.adsense-verify-backup-20261031-222444
- Deployment: NOT performed.
- Google review: NOT requested.

## 2026-10-31 22:31:23 - Notification step 3B (API dormant)
- Added: server/controllers/notificationDeviceController.ts; tests/notificationDeviceRouter.test.ts
- Modified: server/app.ts (mount /api/notifications)
- Auth: existing ct_guest_session, account owner checks and origin rejection
- Activation: disabled unless HOVANG_NOTIFICATION_DEVICE_API=enabled and schema 019 exists (DO NOT ENABLE YET)
- Tests: typecheck PASS; focused notifications PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-3b-backup-20261031-223113
- Rollback: restore app.ts from backup and remove the two newly added files
- No MySQL migration, Push sending or VPS changes
- Manual verification on devices: NOT DONE

## 2026-10-31 22:34:28 - Notification step 3C (Push worker dormant)
- Added: public/hovang-push-sw.js, src/services/notificationPushClient.ts, scripts/generate-notification-vapid.mjs, tests/notificationPushClient.test.ts
- Typecheck: PASS; notification tests: PASS; worker syntax: PASS
- No Service Worker registration, VAPID key generation, permission prompt, live push, DB migration, or VPS edits
- Backup marker: D:\Học\code\code games\Cờ Tướng\board-game\.notification-3c-backup-20261031-223419
- Rollback: delete only the four added files listed above
- Device/browser manual QA: NOT DONE

## 2026-10-31 22:41:07 - Notification 3D Home opt-in invitation
- App.tsx: added optional post-login Home permission invitation
- New files: src/services/notificationInvitePolicy.ts, src/app/NotificationPermissionInvite.tsx, tests/notificationInvitePolicy.test.ts
- Browser permission requested only after explicit click; no backend subscription or push delivery
- Account-scoped defer preference; no prompts while playing or unsupported
- Typecheck: PASS; focused notification tests: PASS
- Manual browser QA: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-3d-invite-backup-20261031-224057
- Rollback: restore App.tsx from backup and delete only the three new files
- VPS and production DB: untouched

## 2026-10-31 22:45:07 - ADS A3
- Goal: Google H5 interstitial adapter, safe disabled foundation.
- Files: src/features/ads/googleH5Interstitial.ts; tests/googleH5Interstitial.test.ts
- Provider: not connected; H5_GAME_ADS_ENABLED=false.
- No Home wiring, no ad requests, no PayOS/DB changes, no VPS changes.
- Targeted tests: PASS; typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ads-a3-backup-20261031-224459
- Rollback: delete the two created files and restore changelog backup if necessary.

## 2026-10-31 22:48:31 - ADS A4
- Goal: Wire after-online-match Home auto-trigger to Google H5 adapter.
- Scope: LOCAL only; changed src/pages/home/HomePage.tsx only.
- Preserved: completed online match -> leave room -> Home -> consume once -> request interstitial; no prompt, no ad while in room.
- Safety: H5_GAME_ADS_ENABLED remains false; no real ads, no SDK init, no payment/reward, no VPS changes.
- Tests: A1/A2B/A3 targeted tests PASS; typecheck PASS; manual match workflow not yet verified.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ads-a4-backup-20261031-224823
- Rollback: D:\Học\code\code games\Cờ Tướng\board-game\.ads-a4-backup-20261031-224823\rollback.ps1
## 2026-10-31 22:56:53 - Notification 3E Loading Gate
- Goal: pause entry loading until notification invitation resolved.
- Files: src\app\App.tsx, src\app\EntryGate.tsx, src\app\NotificationPermissionInvite.tsx
- Typecheck: PASS
- Notification tests: PASS
- Manual loading/UI check: PENDING
- Push delivery: DISABLED
- Database/VPS: unchanged
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-3e-loading-gate-20261031-225642
- Rollback: restore the three files from backup.

### 2026-10-31 23:01:12 - ADS A5 targeted integration tests
- Files: tests/leave-result-session.test.tsx, tests/adsHomeIntegration.test.ts.
- Fixed React.lazy test synchronization (await findByTestId). Added online offer/adapter/Home-wiring regression cases.
- Targeted tests and typecheck: PASS. Commercial ads remain disabled.
- Existing RoomService readiness regression failures remain unresolved; no server gameplay changes made.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ads-a5-backup-20261031-230059
- Rollback: D:\Học\code\code games\Cờ Tướng\board-game\.ads-a5-backup-20261031-230059\rollback.ps1

## 2026-10-31 23:22:12 - Notification 4A device opt-in client
- Added src/services/notificationDeviceClient.ts; wired the invite button behind VITE_HOVANG_PUSH_REGISTRATION_ENABLED=true.
- API remains disabled by default; no production migration, no PUSH delivery.
- Typecheck: PASS; existing notification regression: PASS; end-to-end device test: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-4a-backup-20261031-232201
- Rollback: restore src\app\NotificationPermissionInvite.tsx from backup and remove src\services\notificationDeviceClient.ts.
- MySQL/VPS/payment: untouched.

## 2026-10-31 23:25:02 - Notification 4A.1 VAPID
- VAPID key: created or existing key preserved.
- Key file: .local-secrets/notification-vapid.json
- Key format: PASS
- Typecheck: PASS
- Notification regression: PASS
- Device registration: not enabled.
- Production database and VPS: untouched.
- Rollback: preserve existing keys; do not delete keys used by subscribed devices.
- Manual push verification: PENDING.

## 2026-11-01 06:35:03 - Notification 019 Phase 2
- Database: cotuong / LOCAL
- Recovered 019:002 using local application credentials.
- Remaining official migrations: PASS
- Schema verification: PASS
- Four notification tables: PASS
- Original DB backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-4a2-db-backup-20261101-062412\mysql-before-019.sql
- Device registration activation: PENDING
- VPS untouched.
- MySQL DDL: do not restore/retry automatically.

## 2026-11-01 06:35:44 - Notification 4A.2 LOCAL registration activation
- Local DB schema: verified read-only (notification_devices).
- Browser registration flag: enabled locally (Vite restart required).
- Server API flag: enabled locally (server restart required).
- VAPID key pair: matched; PRIVATE key not copied to web env.
- Gate supports devices with permission already granted.
- Typecheck: PASS. Notification regression: PASS.
- Real browser/API/MySQL registration: PENDING MANUAL VERIFICATION.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-4a2-backup-20261101-063531
- Rollback: restore changed files from backup; delete .env.local if it did not exist.
- VPS / non-local database: untouched.

## A5.2 Room/Ready - 2026-11-01 06:36:19
- Changed: tests\rooms.test.ts, tests\room-readiness.test.ts, tests\room-view-isolation.test.ts, tests\ready-countdown-visibility.test.ts, src\lib\roomReadiness.ts
- Fix: countdown hidden for already Ready seated player; 31s timing tests aligned.
- Verified: 9 targeted test files PASS; npm run typecheck PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.a5-room-fix-v4-20261101-063558
- Rollback: D:\Học\code\code games\Cờ Tướng\board-game\.a5-room-fix-v4-20261101-063558\rollback.ps1
- Logs: D:\Học\code\code games\Cờ Tướng\board-game\.a5-room-fix-v4-20261101-063558\verify.log, D:\Học\code\code games\Cờ Tướng\board-game\.a5-room-fix-v4-20261101-063558\typecheck.log
- Manual Online QA pending; commercial ads disabled.

## 2026-11-01 06:45:42 - Notification Portal Fix
- Purpose: render loading invitation above game loading UI.
- Fix: correct React createPortal JSX wrapping.
- File: src\app\NotificationPermissionInvite.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-portal-fix-20261101-064527
- Typecheck: PASS
- Notification regression: PASS
- Browser UI verification: PENDING
- MySQL, payments and VPS: unchanged.

## 2026-11-01 06:46:16 - H5 Ads preparation
- Local only; files: index.html, tests/googleH5Interstitial.test.ts, tests/adsHomeIntegration.test.ts
- Google H5 API bootstrap (no ad requests); simulated lifecycle + integration tests.
- Tests/typecheck PASS; commercial H5_GAME_ADS_ENABLED remains false. Real H5 approval & manual E2E pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.h5-ads-prep-20261101-064553


## 2026-11-01 06:50:48 - Native Browser Permission Gate
- Replaced custom entry permission dialog with a click-triggered browser permission flow.
- Loading waits for user action, with a skip option.
- Browser handles the actual permission popup.
- Unsupported HTTP LAN continues without the permission gate.
- Files: src/app/EntryGate.tsx, src/app/NativeNotificationGate.tsx
- Typecheck: PASS
- Notification regression: PASS
- Manual browser verification: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-native-gate-backup-20261101-065036
- MySQL, payments and VPS: unchanged.

## 2026-11-01 07:22:20 - Web Notification Gate Removal
- Goal: open HOVANG Web without notification permission UI.
- Removed entry loading notification gate from EntryGate.tsx.
- Preserved normal loading, account restore and login routing.
- Preserved notification backend, MySQL and VAPID infrastructure.
- Android native notification permission: NOT YET IMPLEMENTED.
- Typecheck: PASS
- Notification regression: PASS
- Manual browser verification: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.notification-web-gate-removal-20261101-072210
- VPS and database: unchanged.

## 2026-11-01 07:28:10 - Android 5A
- Goal: scaffold HOVANG Android with Capacitor.
- Capacitor: 8.6.0
- Android application ID: com.hovang.cotuong (provisional)
- Typecheck: PASS
- Web build: PASS
- Android project generation/sync: PASS
- Android APK build: NOT YET TESTED
- Native notifications and FCM: NOT YET IMPLEMENTED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-5a-backup-20261101-072744
- MySQL, payments, VPS: unchanged.

## 2026-11-01 07:29:06 - Android 5B Notification Permission
- Added POST_NOTIFICATIONS to AndroidManifest.xml.
- MainActivity requests native Android notification permission on Android 13+.
- No custom HOVANG permission dialog or button.
- Web notification gate remains disabled.
- TypeScript and source checks: PASS.
- Android native compilation and on-device UI: NOT YET VERIFIED.
- FCM and real Push delivery: NOT YET IMPLEMENTED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-5b-permission-backup-20261101-072902
- MySQL, payments and VPS: unchanged.

### 2026-11-01 07:30:58 - Mock Ad V1 LOCAL
- Muc tieu: Hien mock interstitial sau khi van Online ket thuc va ve Home.
- Sua: src/pages/home/HomePage.tsx
- Tao: src/features/ads/MockInterstitialAd.tsx
- Tao: tests/mockInterstitialAd.test.ts
- Pham vi: DEV only; Google H5 commercial disabled.
- Automated targeted Vitest: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.mock-ad-backup-20261101-073052
- Rollback: restore HomePage.tsx tu backup, xoa hai file Mock Ad V1.
- Ton dong: chua xac nhan manual browser QA hai tai khoan.

### 2026-11-01 09:21:58 - Immediate Ready Start
- LOCAL only.
- Changed roomService.ts and useGame.ts.
- Both players Ready starts match immediately.
- Intro audio follows confirmed playing phase.
- 30-second preparation countdown remains for unready players.
- Focused regression and ads integration tests: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ready-immediate-20261101-092150
- Pending: legacy readiness tests need updated expectations and full regression run.
- Pending: browser test on two devices.

### 2026-11-01 09:31:25 - Online Mid-Match Exit Mock Ad
- Environment: LOCAL only.
- useGame.ts: allow mid-match online player exit ad opportunity.
- onlineAdOffer.ts: add explicit eligibility helper.
- tests/online-exit-mock-ad.test.ts: new regression coverage.
- Ready phase, spectators, computer and replay remain excluded.
- Same match cannot generate repeated ad opportunities.
- Mock remains DEV only through existing HomePage gate.
- Commercial Google Ads unchanged.
- Targeted Vitest PASS.
- Typecheck PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.online-exit-ad-20261101-093106
- Rollback: restore both original files and remove new test file.
- Pending: manual browser QA for mid-match exit.

### 2026-11-01 09:43:05 - Online Ad Accumulation V3
- LOCAL only.
- Modified: src/features/ads/onlineAdOffer.ts
- Modified: src/features/game/hooks/useGame.ts
- Reviewed/updated: tests/online-exit-mock-ad.test.ts
- Added: tests/online-ad-accumulation.test.ts
- Two distinct online matches unlock one ad on eligible exit.
- Progress persists between rooms in the same browser.
- Ten matches in one room produce only one ad on exit.
- Excess matches are discarded after one ad opportunity.
- Ready logic and server unchanged.
- Commercial Google Ads unchanged.
- Targeted Vitest: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ad-accumulation-v3-20261101-094249
- Rollback: restore original files and remove new test.
- Pending: manual browser QA.

### 2026-11-01 09:53:30 - Online Ad Identity V4.1
- Environment: LOCAL only.
- Modified: useGame.ts, onlineAdOffer.ts.
- Added: online-ad-identity-v41.test.ts.
- Added fallback identity when active match has no server ID.
- Stable match identity across playing and finished.
- New room and rematch receive separate identities.
- Existing accumulation threshold: two matches.
- Maximum one ad per eligible exit.
- Ready/backend/Google commercial ads unchanged.
- Targeted Vitest: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ad-identity-v41-20261101-095315
- Rollback: restore both files and delete the V4.1 test.
- Pending: manual browser verification.

### 2026-11-01 11:15:03 - A6.2 Google H5 SDK QA
- Environment: LOCAL only.
- Added tests/google-h5-sdk-a62.test.ts.
- Validated disabled, unavailable, busy and SDK error cases.
- Validated break completion statuses and audio boundaries.
- Existing Google H5 adapter unchanged.
- Google commercial ads remain disabled.
- Targeted Vitest: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.a62-google-h5-qa-20261101-111447
- Rollback: remove tests/google-h5-sdk-a62.test.ts.
- Pending: browser-level Google test mode and approval.

### 2026-11-01 11:19:44 - A6.3 H5 SDK Browser Test
- Environment: LOCAL development only.
- Added temporary standalone h5-sdk-local-test.html.
- Uses official Google Ad Placement API test mode.
- Does not modify the game Home, match counter, or SDK adapter.
- H5_GAME_ADS_ENABLED remains false.
- Targeted Vitest: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.a63-browser-test-20261101-111935
- Rollback: delete h5-sdk-local-test.html.
- Pending: manual browser test and subsequent removal of test page.
- Do not deploy the temporary test HTML to production.

### 2026-11-01 11:24:41 - A6.3.1 SDK Browser Diagnostic
- Environment: LOCAL only.
- Modified: h5-sdk-local-test.html
- Added script load and error diagnostics.
- Added API onReady monitoring and readiness timeout.
- Blocks manual adBreak until SDK reports ready.
- Added browser callback logs and copy-log control.
- Google commercial advertising remains disabled in game.
- Vitest and Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.a631-sdk-diagnostic-20261101-112425
- Rollback: restore original h5-sdk-local-test.html.
- Pending: browser QA to identify real SDK loading failure.

### 2026-11-01 11:28:15 - A6.3.2 SDK Auto Preload Test
- Scope: LOCAL standalone H5 diagnostic page only.
- Modified: h5-sdk-local-test.html
- Changed preloadAdBreaks from on to auto.
- Purpose: isolate preload-related SDK readiness issues.
- Commercial Google Ads remain disabled.
- Targeted Vitest: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.a632-sdk-auto-20261101-112805
- Rollback: restore h5-sdk-local-test.html from backup.
- Pending: browser onReady verification.
- Pending: check Google Ad Placement API Console messages.
- Do not deploy diagnostic HTML to production.

## 2026-11-01 11:44:40 - Android Capacitor Build Link
- Problem: copied Android project could not resolve :capacitor-android.
- Fix: bundle Capacitor Android library inside ASCII build directory.
- Updated: HOVANG-Android-Build/capacitor.settings.gradle
- Main React/Android source: unchanged.
- Gradle link/source verification: PASS
- Gradle APK build: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-capacitor-link-backup-20261101-114439
- MySQL, payments and VPS: unchanged.

### 2026-11-01 11:50:42 - A6.3.6 Google H5 Failsafe
- Environment: LOCAL only.
- Modified: src/features/ads/googleH5Interstitial.ts
- Added: tests/google-h5-failsafe-a636.test.ts
- Added a 15-second pre-ad callback timeout.
- Timeout is cancelled after beforeAd.
- afterAd releases busy state and restores audio.
- adBreakDone also performs safe completion.
- Stale callbacks cannot affect newer requests.
- SDK unavailable and synchronous errors remain fail-open.
- Commercial Google Ads remain disabled.
- Targeted Vitest: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.a636-failsafe-20261101-115034
- Rollback: restore original adapter and remove new test.
- Limitation: adapter timeout does not cancel a pending Google SDK request.
- Pending: browser verification after Google H5 approval.

### 2026-11-01 12:03:52 - A6.3.7 H5 SDK temporary page cleanup
- Environment: LOCAL Windows only.
- Removed from project root: h5-sdk-local-test.html
- Verified SHA256 backup: C:\Users\NHAT HOANG\Downloads\HOVANG-A637-BACKUP-20261101-120347\h5-sdk-local-test.html
- Purpose: prevent accidental deployment of the temporary SDK diagnostic page.
- Google H5 SDK browser QA remains NOT READY.
- Google commercial ads remain disabled.
- Existing A6.3.6 15-second failsafe preserved.
- Mock Ad and online match counter untouched.
- Targeted Vitest: PASS.
- Typecheck: PASS.
- Rollback: copy backup HTML to project root.
- A6.3.7: COMPLETED.
- A6.3.8: PENDING.
- A6.4: PENDING GOOGLE APPROVAL.

### 2026-11-01 12:04:56 - A6.3.8 Ads Handoff
- Environment: LOCAL Windows.
- Created/updated: docs/HOVANG_ADS_HANDOFF_A638.md
- Documented A6.1 through A6.4.
- A6.3.6 previously verified: 32/32 tests PASS, typecheck PASS.
- A6.3.7 previously verified: 32/32 tests PASS, typecheck PASS.
- A6.3 browser SDK remains NOT READY.
- A6.4 remains pending Google approval.
- Commercial ads confirmed disabled.
- No source code changes in this batch.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.a638-handoff-20261101-120456
- A6.3.8 documentation: VERIFIED.

## 2026-11-01 12:39:43 - Android 5B.2 Startup
- Problem: APK has no Vite proxy for relative account API routes.
- Debug-only fix: point Capacitor WebView to LOCAL LAN Vite server.
- Target: http://192.168.1.73:5173
- Android cleartext enabled for debug build copy only.
- Account profile response guard added.
- Typecheck and notification regression: PASS.
- Android APK rebuild / manual runtime test: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-5b2-startup-backup-20261101-123934
- Production release must remove HTTP LAN debug configuration.
- MySQL, payments and VPS: unchanged.

## 2026-11-01 13:40:48 - Android Firebase 5C.1
- Firebase project: hovang-94cd7
- Package: com.hovang.cotuong
- Installed google-services.json in original Android and ASCII build copy.
- Enabled Google Services Gradle plugin in both app modules.
- Firebase configuration checks: PASS
- TypeScript and notification regression: PASS
- Native Gradle compilation: PENDING
- FCM token registration and Push delivery: NOT IMPLEMENTED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-firebase-5c1-backup-20261101-134038
- Original Web, MySQL, payments and VPS: unchanged.

## 2026-11-01 13:47:00 - Android 5C.2a FCM Client
- Installed @capacitor/push-notifications 8.1.3.
- Added Android-only native FCM registration listeners.
- FCM token kept in memory, not logged or stored in browser storage.
- Web notification permission UI remains disabled.
- No backend token submission implemented yet.
- TypeScript: PASS
- Notification regression: PASS
- Native Android sync/build/device test: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-5c2-fcm-backup-20261101-134643
- Database, payments and VPS: unchanged.

## 2026-11-01 13:48:14 - Android 5C.2b Native Push Sync
- Original Capacitor Android sync: PASS
- Push plugin copied to ASCII Android build project.
- Capacitor core vendor reference: preserved.
- Native Push Gradle linkage: PASS
- Firebase config and LAN debug URL: preserved.
- Gradle native compilation: PENDING
- FCM token reception: PENDING
- Android token storage API: NOT IMPLEMENTED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-5c2b-sync-backup-20261101-134812
- MySQL, payments and VPS: unchanged.

## 2026-11-01 14:03:16 - Android native FCM API foundation
- Created Android-only FCM token registration API, dedicated migration 020, repository, sender module.
- Bound native token to authenticated account and device logout.
- Sender disabled without explicit local flags and Google server credentials.
- Typecheck and regression: PASS
- Migration, native APK compilation, scheduler and real FCM delivery: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-fcm-5c3-backup-20261101-140306
- VPS unchanged.

## 2026-11-01 14:05:15 - Native FCM 5C.4
- Registered 020_native_fcm.sql in migrationFiles.
- TypeScript and 40 notification tests: PASS.
- Database DDL: NOT EXECUTED.
- Firebase Admin credentials: NOT CONFIGURED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-fcm-5c4-backup-20261101-140505
- MySQL data and VPS: unchanged.

## 2026-11-01 14:17:12 - Native FCM 020 Recovery
- LOCAL database: cotuong.
- Cause: migration 020 journal remained running after permission failure.
- Orphan journal checksum and missing FCM table verified.
- Journal recovered under LOCAL root account.
- FCM table, columns and foreign key verified.
- Migration 020 status: applied.
- Project schema verification: PASS.
- Original backup: C:\Users\NHAT HOANG\HOVANG-DB-Backups\FCM-020-20261101-141059\cotuong-before-020.sql
- Rollback: manual, only after reviewing schema and current data.
- VPS, payments and production: unchanged.

## 2026-11-01 14:21:54 - HOVANG 5D.1 Firebase Admin
- Firebase project: hovang-94cd7.
- Firebase Admin key installed outside project.
- Private key format validation: PASS.
- Secret file ACL restricted to current user, SYSTEM and Administrators.
- Local backend startup launcher created: D:\Học\code\code games\Cờ Tướng\board-game\scripts\start-fcm-local.ps1
- Native FCM API enabled only by local launcher.
- Real FCM sending: DISABLED.
- TypeScript and FCM regression: PASS.
- Existing launcher backup: not needed
- MySQL, payments, VPS and Android APK: unchanged.
- Recovery: restore launcher backup if present; remove new launcher otherwise. Revoke Firebase key in Google Cloud if compromised.

## 2026-11-01 14:36:02 - Native FCM 5E offline scheduler foundation
- New server/services/nativeFcmScheduler.ts and 6 policy tests.
- Server integration: gated by FCM_SCHEDULER, FCM_SEND and offline DB flags, disabled by default.
- Covers offline 6h/24h/3d/7d; one latest overdue reminder, dedupe via notification_deliveries.
- No energy-full scheduling in this patch; no real push sent; no new migration.
- Source backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-fcm-5e-backup-20261101-143552
- LOCAL only; MySQL/VPS not modified by installer.

## 2026-11-01 15:51:46 - HOVANG FCM 5E.2
- Installed energy-full scheduler using energy_subscriptions.
- No invented AccountService.hasUnlimitedEnergy method.
- Linked to existing offline scheduler and feature flags.
- TypeScript and targeted notification tests: PASS.
- Real FCM sending: DISABLED by default.
- MySQL integration and Android delivery: NOT VERIFIED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-fcm-5e2-inline-backup-20261101-155130
- Rollback: restore nativeFcmScheduler.ts.bak and remove the two new files.
- No MySQL, VPS or APK changes.

## 2026-11-01 15:57:46 - HOVANG 5E.3
- MySQL LOCAL database: cotuong.
- Migration 019/020: verified applied.
- Offline candidate query EXPLAIN: PASS.
- Energy candidate query EXPLAIN: PASS.
- Unlimited-energy query EXPLAIN: PASS.
- TypeScript: PASS.
- Notification regression: PASS.
- Real scheduler execution with live sending: NOT TESTED.
- Android FCM delivery: NOT TESTED.
- MySQL data and VPS: unchanged.
- Changelog backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-5e3-log-backup-20261101-155746

## 2026-11-01 16:15:25 - HOVANG FCM JDK21 Debug APK
- Microsoft OpenJDK 21 verified and used.
- Android web assets synchronized.
- Gradle debug build PASS.
- APK: C:\Users\NHAT HOANG\HOVANG-Android-Build\app\build\outputs\apk\debug\app-debug.apk
- APK size: 205257607 bytes
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-fcm-5g-jdk21-build-20261101-161332
- FCM registration and delivery on phone: NOT TESTED.
- Real scheduler sending: DISABLED.
- MySQL and VPS unchanged.

## 2026-11-01 16:51:48 - HOVANG Android bundled UI
- Root cause: debug APK loaded remote Vite IP 192.168.1.73.
- Removed server.url from Android Capacitor config.
- Rebuilt dist and bundled it in APK.
- TypeScript: PASS.
- Web build: PASS.
- Gradle JDK21 assembleDebug: PASS.
- Packaged APK config and index.html: VERIFIED.
- APK: C:\Users\NHAT HOANG\HOVANG-Android-Build\app\build\outputs\apk\debug\app-debug.apk
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-bundled-final-20261101-165123
- Android Home screen: NOT YET DEVICE-VERIFIED.
- API / Socket.IO / FCM on device: NOT YET VERIFIED.
- MySQL / VPS: unchanged.

## 2026-11-01T09:51:52.351Z - HOVANG room sound
- Seat: other room occupants hear arrival, including viewer promotion/queue rotation; actor does not.
- Leave button: departing user and other room members hear door-close sound on server confirmation.
- Changed: src/types/room.ts, server/controllers/roomController.ts, src/app/useRoomConnection.ts, public/audio/room-seat.mp3, public/audio/room-leave.mp3
- Typecheck: PASS. Targeted vitest: no NEW failures compared with pre-patch baseline. (Existing failures are reported, not silently treated as passing.)
- Backup/rollback: D:\Học\code\code games\Cờ Tướng\board-game\.room-sound-backup-20261101095139
- Note: browser autoplay restrictions may affect passive listeners; MP4-extracted seat cue requires copyright/license review.

## 2026-11-01T10:53:38.626Z - Room leave audio V4.1 (LOCAL)
- Changed: src/app/useRoomConnection.ts; cached reusable preloaded leave-only audio, warmed after user gesture. Seat audio and server room events unchanged.
- Baseline failing tests: 6; after failing tests: 6; new failures: 0. Typecheck PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.room-leave-fast-v4-backup-20261101105325. Restore from D:\Học\code\code games\Cờ Tướng\board-game\.room-leave-fast-v4-backup-20261101105325\src\app\useRoomConnection.ts if required.
- Mobile browser sound/network timing still needs live two-client confirmation.

## 2026-11-01 17:56:12 - HOVANG named debug APK
- Verified source APK contains bundled UI and native Push plugin.
- Verified server.url absent.
- Copied as: C:\Users\NHAT HOANG\Downloads\HOVANG-NEW.apk
- SHA256: 51FD666B8CB574D5239C12944CDDD3F844B00ADE5291080E8F871256B1C1606C
- This is a debug APK, not a Play Store release.
- Device launch and real FCM delivery: NOT VERIFIED.
- Existing APK and MySQL/VPS: unchanged.

### 2026-11-01 18:04:30 - V5 capture/check audio replacement
- Scope: LOCAL only. Changed src/features/game/hooks/useMoveSound.ts and added src/assets/audio/hovang-capture-v5.mp3, src/assets/audio/hovang-check-v5.mp3.
- Capture: user-provided MP4 audio converted to MP3; check: user-provided metal clang MP3. Checkmate and all other cues unchanged.
- Validation: focused audio Vitest BEFORE/AFTER pass; TypeScript typecheck pass. Existing unrelated room test failures not modified.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.capture-check-v5-backup-20261101-180421
- Rollback: restore useMoveSound.ts from backup and remove the two v5 MP3 assets.
- Device audio testing still pending.

## 2026-11-01 18:21:17 - Payment popup theming
- File: src/features/lobby/components/EnergyDialog.tsx
- Popup 100 energy: blue; unlimited 30d: green. Reuse original panel sprite crop; leave video offer untouched.
- Payment API, checkout and status functions unchanged.
- Typecheck: PASS; build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\payment-popup-20261101-182108\EnergyDialog.tsx

## 2026-11-01 18:29:49 - Payment 100 font fix
- File: src/features/lobby/components/EnergyDialog.tsx
- Chinh font so 100 thanh sans-serif, lining/tabular.
- Giu nguyen giao dien, logic payOS va cac goi khac.
- Typecheck: PASS
- Build: PASS
- Browser QA: chua xac nhan
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\payment-100-font-20261101-182934\EnergyDialog.tsx

## 2026-11-01 18:29:53 - Android LOCAL same-origin backend APK
- Fixed PowerShell HOME variable collision.
- Backend health and bundled-web server on LAN: PASS.
- Android origin: http://192.168.1.12:3001
- Same-origin /api and Socket.IO retained.
- Gradle build and packaged FCM plugin: PASS.
- Output: C:\Users\NHAT HOANG\Downloads\HOVANG-LOCAL-FCM-FIX-20261101-182952.apk
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.android-origin-fix-20261101-182922
- Login/Home/FCM device behavior: NOT YET VERIFIED.
- Local debug only, not for public release.
- No MySQL/VPS changes.

## 2026-11-01 18:40:14 - HOVANG 5F.2 Native FCM router order
- Native FCM router moved before generic notification router.
- Reason: generic router middleware could intercept /native/token.
- TypeScript and notification tests: PASS.
- Real FCM token registration: NOT YET VERIFIED.
- Previous MySQL result: zero registered devices.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-native-router-fix-20261101-184001
- Rollback: restore app.ts.bak.
- MySQL, VPS and APK unchanged.
- LOCAL backend restart required.

## 2026-11-01 18:48:36 - Mobile Home Profile Click
- File: src/pages/home/MobileHome.tsx
- Avatar: giu nguyen onClick openProfile.
- Ten: button doi thanh div, khong con openProfile.
- ELO: giu nguyen hien thi, khong co onClick.
- Desktop Home: khong thay doi.
- Typecheck: PASS.
- Build: PASS.
- Browser QA: chua xac nhan.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\home-mobile-profile-20261101-184827\MobileHome.tsx

## 2026-11-01 18:52:29 - Disable browser text selection
- Scope: Global HOVANG UI.
- Modified: src/main.tsx
- Added: src/hovang-selection-lock.css
- Prevent mouse and touch text selection in game UI.
- Keep input, textarea and editable content selectable.
- No game logic, database, VPS or payment changes.
- Typecheck: PASS
- Build: PASS
- Browser QA: pending
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\disable-selection-20261101-185215

## 2026-11-01T11:54:49.671Z – Clock tick audio V6 (LOCAL)
- Added uploaded clock tick cue every second while game phase is playing; stops outside playing. No server clock logic changed.
- Files: src/features/game/audio/GameSounds.ts; src/features/game/hooks/useMoveSound.ts; src/assets/audio/hovang-clock-tick-v6.mp3
- Typecheck: PASS; focused Vitest BEFORE 20 pass / 0 fail; AFTER 20 pass / 0 fail.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.clock-tick-v6-backup-2026-11-01T11-54-32-100Z
- Mobile audio behavior still requires manual verification.

## 2026-11-01 18:59:03 - 5F.2 Android FCM registration retry
- Added native FCM registration retry on focus, online and every 30 seconds while active and token missing.
- Added account-token binding retry every 30 seconds while active.
- Existing token deduplication and cookie-based authentication retained.
- No tokens are logged or written to persistent browser storage.
- TypeScript, notification regression and frontend build: PASS.
- LOCAL Android APK uses backend-served UI, so no APK rebuild in this step.
- On-device registration and MySQL record: NOT YET VERIFIED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-registration-retry-20261101-185848
- No VPS/MySQL/Android native changes.

## 2026-11-01 20:43:35 - FCM local-only diagnostics
- Added temporary authenticated diagnostic endpoint.
- Android reports only stage labels, never FCM tokens.
- Diagnostics disabled when NODE_ENV=production.
- TypeScript, notification tests and frontend build: PASS.
- On-device evidence: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-diag-20261101-204313
- No MySQL, VPS or APK changes.

## 2026-11-01 20:53:52 - HOVANG 5F.3 one-device FCM test
- Firebase project: hovang-94cd7.
- MySQL LOCAL: exactly one active device verified.
- OAuth and FCM validate_only: PASS.
- One real FCM message: ACCEPTED by Firebase.
- Device display/delivery: pending confirmation.
- No topic, bulk notification or scheduler enabled.
- No MySQL, VPS, APK or application source changes.
- Backup of logs: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-single-push-20261101-205350

## 2026-11-01 20:55:52 - HOVANG 5F.3 one-device FCM test
- Firebase project: hovang-94cd7.
- MySQL LOCAL: exactly one active device verified.
- OAuth and FCM validate_only: PASS.
- One real FCM message: ACCEPTED by Firebase.
- Device display/delivery: pending confirmation.
- No topic, bulk notification or scheduler enabled.
- No MySQL, VPS, APK or application source changes.
- Backup of logs: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-single-push-20261101-205548

## 2026-11-01 21:03:11 - Mobile Honor Eye Position
- File: src/features/lobby/components/ProfileDialog.tsx
- Component: AwardedHonorCount
- Mobile: right 4%, top 6%, relative to honor badge.
- Desktop: unchanged.
- Honor count and game logic: unchanged.
- Typecheck: PASS
- Build: PASS
- Mobile visual QA: pending
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\honor-eye-mobile-20261101-210258\ProfileDialog.tsx
\
## 20261101-210315 - V6 clock gain LOCAL\
- Clock gain 0.22 -> 3.0.\
- Typecheck and audio tests PASS.\
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.clock-v6-gain-backup-20261101-210315\
- Mobile listening pending.\


## 2026-11-01 21:19:13 - HOVANG 5F.3 notification channel
- Added Android native notification channel: hovang_notifications.
- Importance: HIGH (4), vibration and lights enabled.
- Channel creation occurs before native FCM registration.
- No FCM token or secret logging.
- Typecheck, notification tests and frontend build: PASS.
- Channel creation on Samsung: NOT YET VERIFIED.
- New-channel Push delivery: NOT YET VERIFIED.
- Existing APK/native configuration unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-channel-fix-20261101-211851
- No Firebase sends, MySQL writes or VPS changes.

## 2026-11-01 21:19:29 - Correct honor eye scope
- Restored catalog eye position in ProfileDialog.tsx.
- Added profile-preview-only CSS for honor counter.
- No honor counts or game logic modified.
- Typecheck: PASS
- Build: PASS
- Browser visual QA: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\honor-eye-correct-20261101-211916

## 2026-11-01 21:21:28 - HOVANG FCM channel verification
- Added channel_ready stage to LOCAL FCM diagnostic endpoint.
- Android reports channel_ready only after createChannel succeeds.
- Typecheck, notification tests and frontend build: PASS.
- Device confirmation: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-channel-diag-20261101-212108
- MySQL, VPS, APK unchanged; no Push sent.

## 2026-11-01 21:25:24 - FCM channel diagnostics
- Previous device logs confirmed token_received and binding_ok, but no channel_ready.
- Added channel_attempt and channel_failed status-only reporting.
- Typecheck, targeted tests and frontend build: PASS.
- Actual Android channel creation: NOT YET VERIFIED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-channel-trace-20261101-212507
- No Push, APK, MySQL or VPS changes.

## 2026-11-01 21:27:04 - Honor eye catalog V2
- Corrected catalog eye position to top 6%, right 4%.
- Removed previous incorrect preview CSS patch.
- Honor values and interaction unchanged.
- Typecheck PASS; Build PASS; Visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\honor-eye-fix-v2-20261101-212652

## 2026-11-01 21:32:04 - LOCAL FCM backend recovery
- Previous problem: port 3001 EADDRINUSE, then FCM API returned HTTP 503.
- Stopped only verified HOVANG Node server and verified watcher if present.
- Restarted one local server without Node watch.
- HOVANG_NATIVE_FCM_API=enabled.
- HOVANG_NATIVE_FCM_SEND=disabled.
- Unauthenticated FCM endpoint: HTTP 401 PASS.
- No Push, APK build, MySQL write or VPS change.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-backend-recovery-20261101-213158

## 2026-11-01 21:34:45 - Ranking Elo spacing balance
- File: src/features/lobby/components/RankingDialog.tsx
- When no action button exists, Elo block spans columns 3 / 5 and aligns right.
- Goal: left/right spacing inside ranking row feels balanced.
- Rows with action buttons keep original center layout.
- Typecheck: PASS
- Build: PASS
- Visual QA: pending
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ranking-elo-spacing-20261101-213433\RankingDialog.tsx

## 2026-11-01 21:34:51 - HOVANG 5F.3 channel Push
- Samsung reported channel_attempt and channel_ready.
- Firebase project: hovang-94cd7.
- Channel: hovang_notifications.
- Target: exactly one active LOCAL FCM device.
- FCM validation: PASS.
- Firebase accepted exactly one real Push: HTTP 200.
- Samsung display: awaiting confirmation.
- No scheduler, APK build, VPS changes or MySQL writes.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-channel-push-20261101-213450

## 2026-11-01 21:37:08 - HOVANG 5F.3 channel Push
- Samsung reported channel_attempt and channel_ready.
- Firebase project: hovang-94cd7.
- Channel: hovang_notifications.
- Target: exactly one active LOCAL FCM device.
- FCM validation: PASS.
- Firebase accepted exactly one real Push: HTTP 200.
- Samsung display: awaiting confirmation.
- No scheduler, APK build, VPS changes or MySQL writes.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-channel-push-20261101-213706

## 2026-11-01 21:41:10 - HOVANG Clock Tick V6.2
- Scope: src\features\game\hooks\useMoveSound.ts
- Change: reconcile clock tick on each React render.
- Existing GameSounds timer guard prevents duplicate intervals.
- Preserve optional method invocation for existing audio mocks.
- Typecheck: PASS.
- Targeted existing audio tests: PASS.
- Actual audible playback: PENDING USER CONFIRMATION.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.clock-v62-backup-20261101-214059\useMoveSound.ts
- Rollback: restore backup file to source path.
- Status: automated checks passed; V6 still requires real-device QA.

## 2026-11-01 21:41:32 - Undo wrong ranking Elo change
- Restored original Elo layout in RankingDialog.tsx.
- Reason: user requested row background spacing, not Elo repositioning.
- Typecheck PASS; Build PASS; Browser QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ranking-elo-undo-20261101-214121\RankingDialog.tsx

## 2026-11-01 21:45:01 - HOVANG FCM Unicode safe test
- Used ASCII-only JavaScript and Unicode escapes.
- UTF-8 payload validation: PASS.
- Firebase accepted one Push via hovang_notifications.
- Samsung text rendering: awaiting confirmation.
- No MySQL writes, VPS, APK or application changes.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-unicode-safe-20261101-214455

## 2026-11-01 21:46:16 - Ranking row scrollbar spacing
- File: src/features/lobby/components/RankingDialog.tsx
- Extend ranking scroll list 18px to the right.
- Keep 2px right padding inside the scroll list.
- Player columns, Elo and action buttons unchanged.
- Typecheck: PASS; Build: PASS; Visual QA: pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ranking-row-scroll-20261101-214604\RankingDialog.tsx

## 2026-11-01 21:49:55 - HOVANG V6.4 diagnostic
- Scope: GameSounds.ts, useMoveSound.ts.
- Added temporary LOCAL audio diagnostic panel.
- Read-only status: phase, context, mute, timer, attempts, starts.
- Typecheck: PASS.
- Existing targeted audio tests: PASS.
- Actual audible playback: NOT YET VERIFIED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.clock-v64-backup-20261101-214942
- Status: diagnostic only; pending browser QA.
- Rollback: restore both source files from backup.

## 2026-11-01 21:54:34 - Shared scrollbar rail
- Applied shared scrollbar spacing to 2 list elements.
- Desktop: 18px right expansion.
- Mobile: 10px right expansion.
- Preserved existing custom-margin lists.
- No Elo, player information or game logic changes.
- Typecheck: PASS; Build: PASS.
- Visual QA: pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\shared-scroll-rail-20261101-215415

## 2026-11-01 21:56:07 - HOVANG 5F.4A closed-app Push
- Test: HOVANG removed from Android recent apps before sending.
- Firebase validation: PASS.
- One Push accepted via hovang_notifications.
- TTL: 120 seconds, high priority.
- Actual Android delivery/display: awaiting user verification.
- No APK build, server code change, scheduler or MySQL write.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-5f4a-20261101-215601

## 2026-11-01 21:56:45 - Clock V6.5
- File: src\features\game\hooks\useMoveSound.ts
- Problem: tick starts immediately when phase becomes playing.
- Change: require phase playing and moveCount greater than zero.
- This uses first completed move as a proxy, not verified server clock state.
- V6.4 diagnostic remains installed.
- Typecheck: PASS.
- Existing audio tests: PASS.
- Actual clock synchronization: PENDING USER QA.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.clock-v65-backup-20261101-215633\useMoveSound.ts
- Rollback: restore backup file to original path.

## 2026-11-01 21:56:55 - History shared scroll rail
- Files: HistoryDialog.tsx, SavedMatchesList.tsx
- History Played and Saved use shared scrollbar rail.
- Desktop: shared 18px right expansion.
- Mobile: shared 10px right expansion.
- Ranking and other working lists unchanged.
- Typecheck: PASS
- Build: PASS
- Visual QA: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\history-scroll-rail-20261101-215645

## 2026-11-01 21:59:11 - HOVANG 5F.4B
- Lock screen Push test via hovang_notifications.
- One active local device; Unicode validated.
- Firebase accepted one notification.
- Samsung lock-screen display: awaiting confirmation.
- No APK build, DB write, VPS or scheduler changes.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-5f4b-20261101-215907

## 2026-11-01 22:00:03 - HOVANG 5F.4B
- Lock screen Push test via hovang_notifications.
- One active local device; Unicode validated.
- Firebase accepted one notification.
- Samsung lock-screen display: awaiting confirmation.
- No APK build, DB write, VPS or scheduler changes.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-5f4b-20261101-220000

## 2026-11-01 22:04:47 - HOVANG 5F.4C
- Test scenario: Samsung offline at time of sending.
- Firebase project: hovang-94cd7.
- Channel: hovang_notifications.
- One active local FCM device.
- One notification accepted by Firebase.
- TTL: 300 seconds.
- Reconnection delivery: awaiting user confirmation.
- No scheduler, APK, source, DB or VPS changes.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.fcm-5f4c-20261101-220442

## 2026-11-01 22:07:31 - HOVANG V6.6
- Goal: tick only after actual turn clock begins advancing.
- Source: useGame.ts, useMoveSound.ts, clockTickPolicy.ts.
- Removed incorrect moveCount > 0 gate from V6.5.
- Uses game.turnElapsed, remainingTime, phase and repetition pause.
- Does not modify server clock or game state.
- Added seven policy tests.
- Typecheck: PASS.
- Targeted tests: PASS.
- Build: PASS.
- Audible QA, Viewer, mobile: PENDING.
- Diagnostic V6.4 remains installed temporarily.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.clock-v66-backup-20261101-220701
- Rollback: restore both original source files and remove the two new files.

## 2026-11-01 22:07:51 - Center mobile profile actions
- File: src/features/lobby/components/ProfileDialog.tsx
- Mobile six-action panel now uses available flex space.
- Grid content centered vertically within its panel.
- Original button gap 5px retained.
- No button functionality or desktop changes.
- Typecheck PASS; Build PASS; Mobile visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-profile-actions-center-20261101-220735\ProfileDialog.tsx

## 2026-11-01 22:16:18 - Ranking header alignment
- File: src/features/lobby/components/RankingDialog.tsx
- Change: center the Thao tac JSX header.
- Typecheck: PASS.
- Build: PASS.
- Visual QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ranking-align-20261101-221558\RankingDialog.tsx

## 2026-11-01 22:16:18 - Clock Audio V7
- Files: clockTickPolicy.ts, GameSounds.ts
- Removed dependence on turnElapsed for clock tick eligibility.
- First tick delayed 1300ms; following ticks every 1000ms.
- Audio playback gain increased from 3.0 to 4.0.
- Added cancellation of pending first tick.
- Typecheck PASS; Targeted tests PASS; Build PASS.
- Browser audio QA PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\clock-audio-v7-20261101-221542

## 2026-11-01 22:25:48 - Ranking headers
- File: src/features/lobby/components/RankingDialog.tsx
- Change: center align Hạng, Người chơi, Elo, Thao tác.
- Typecheck: PASS.
- Build: PASS.
- Visual column alignment: pending browser confirmation.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ranking-headers-20261101-222526\RankingDialog.tsx

## 2026-11-01 22:29:12 - Clock audio direct test
- Files: GameSounds.ts, useMoveSound.ts
- Added manually triggered test clock sound.
- Added clockTickRunning to debug display.
- Automatic ready/playing rules unchanged.
- Typecheck PASS; Build PASS.
- Browser listening test PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\clock-audio-direct-test-20261101-222853

## 2026-11-01 22:31:51 - Ranking header alignment
- File: src\features\lobby\components\RankingDialog.tsx
- Removed desktop-only textAlign:left and paddingLeft from player header.
- Preserved shared header/row grid template and four column widths.
- Typecheck: PASS.
- Build: PASS.
- Visual QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ranking-header-fix-20261101-223132\RankingDialog.tsx
- Rollback: restore RankingDialog.tsx from backup.

## 2026-11-01 22:34:43 - Profile stats laptop alignment V1
- Scope: PlayerInfoCard.tsx, stats numeric text only.
- Change: desktop:relative desktop:top-[2px].
- Goal: optical vertical alignment of Friends / Followers / Likes values.
- Mobile: unchanged by this patch.
- Test: npm run typecheck PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.profile-stats-align-20261101-223435\PlayerInfoCard.tsx
- Rollback: Copy-Item -LiteralPath 'D:\Học\code\code games\Cờ Tướng\board-game\.profile-stats-align-20261101-223435\PlayerInfoCard.tsx' -Destination 'D:\Học\code\code games\Cờ Tướng\board-game\src\features\lobby\components\PlayerInfoCard.tsx' -Force
- Visual QA: pending manual confirmation.

## 2026-11-01 22:36:34 - Ranking header position
- File: src\features\lobby\components\RankingDialog.tsx
- Rank heading unchanged.
- Player heading offset: +85 scaled px.
- Elo heading offset: +24 scaled px for desktop.
- Action heading offset: +24 scaled px.
- Compact Elo existing offset preserved.
- Data rows, avatars, Elo values, buttons unchanged.
- Typecheck: PASS.
- Build: PASS.
- Visual QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ranking-header-position-20261101-223613\RankingDialog.tsx
- Rollback: restore RankingDialog.tsx from backup.

## 2026-11-01 22:38:07 - Profile stats baseline V2
- Scope: src/features/lobby/components/PlayerInfoCard.tsx
- Removed incorrect V1 desktop vertical offset if present.
- Replaced desktop center alignment with baseline alignment.
- Mobile remains items-center.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.profile-baseline-fix-20261101-223759\PlayerInfoCard.tsx
- Rollback: Copy-Item -LiteralPath 'D:\Học\code\code games\Cờ Tướng\board-game\.profile-baseline-fix-20261101-223759\PlayerInfoCard.tsx' -Destination 'D:\Học\code\code games\Cờ Tướng\board-game\src\features\lobby\components\PlayerInfoCard.tsx' -Force
- Visual verification: pending laptop screenshot.

## 2026-11-01 22:44:05 - Profile Stats V4
- Target: PlayerInfoCard.tsx renderStats.
- Remove prior numeric top offset.
- Desktop: shared label/value font size and line height.
- Desktop: align stats elements on typographic baseline.
- Mobile: existing non-desktop classes retained.
- Typecheck: PASS.
- Changed: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.profile-stats-v4-20261101-224359\PlayerInfoCard.tsx
- Visual confirmation: pending.

## 2026-11-01 22:47:25 - Profile stats V5
- Scope: PlayerInfoCard.tsx / renderStats.
- Change: desktop:translate-y-[2px] on entire stats item.
- Preserved V4 baseline alignment.
- Mobile: unchanged.
- Typecheck: PASS.
- Modified: True
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.profile-stats-v5-20261101-224721\PlayerInfoCard.tsx
- Visual confirmation: pending.

## 2026-11-01 22:48:09 - Ready audio V3
- Fixed V2 source guard: addEventListener and removeEventListener are two valid references.
- Connected online ready countdown decreases to existing audio playback.
- Preserved manual TEST, match-clock audio, and other game functions.
- Typecheck PASS; targeted tests PASS; build PASS.
- Browser audio QA PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ready-audio-v3-20261101-224752

## 2026-11-01 22:50:06 - Loading UI V1
- Added shared 12-spoke HovangDataSpinner.
- Updated loading indicators in room list, province picker,
  address picker and group invitations.
- Suppressed premature empty message list during loading.
- Preserved existing empty and error states.
- Typecheck: PASS.
- Build: PASS.
- Desktop/mobile visual QA: PENDING.
- Other screens remain in loading-state backlog.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.loading-ui-v1-20261101-224955
- Rollback: restore backed-up files and remove new spinner.

## 2026-11-01 22:51:36 - Remove temporary audio debug overlay
- File: src/features/game/hooks/useMoveSound.ts
- Removed HOVANG V6.4 AUDIO floating debug panel.
- Removed COPY V6.4 and TEST CLOCK SOUND controls.
- Preserved automatic online ready countdown audio.
- Preserved GameSounds and normal match sounds.
- Typecheck PASS; audio tests PASS; build PASS.
- Visual/audio QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\remove-audio-debug-20261101-225118\useMoveSound.ts

## 2026-11-01 23:12:40 - V7 Replay Mode Button
- Files: src\features\game\components\ReplayControls.tsx; src\pages\game\GamePage.tsx
- Unified desktop replay button anchor at 220px.
- Replaced desktop position replay 50px margin placement.
- Added data-ui-selection-sound to shared ReplayModeButton.
- Desktop and mobile share the same selection sound hook.
- Mobile layout unchanged.
- Typecheck: PASS.
- Build: PASS.
- Visual/audio QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.v7-replay-button-20261101-231230

## 2026-11-01 23:19:39 - Saved delete text-only V4
- Mode: CREATE
- Message: Da xoa, no green checkmark.
- Shows after successful saved-match delete; auto-hide 2200ms.
- Typecheck and build: PASS; visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\saved-delete-text-v4-20261101-231927

## 2026-11-01 23:23:39 - Center saved-delete toast
- File: saved-match-delete-toast.css
- Centered success notice horizontally and vertically.
- Applies to laptop and mobile.
- Preserved text, animation duration and delete logic.
- Typecheck PASS; Build PASS; visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\center-delete-toast-20261101-232330\saved-match-delete-toast.css

## 2026-11-01 23:31:43 - Unify saved-delete toast
- Reused the existing useInviteSentNotice notification system.
- Message: Da xoa, no checkmark.
- Same center positioning, colors, font and 1300ms animation as friend invite toast.
- Removed local saved-match-delete-toast.css.
- Preserved deletion success/error behavior.
- Typecheck PASS; targeted tests PASS if present; build PASS.
- Browser QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\shared-delete-toast-20261101-233133

## 2026-11-02 07:31:26 - ADSENSE LOCAL PUBLIC CONTENT
- Goal: Add publicly readable HOVANG informational pages.
- Files: index.html, src/pages/login/LoginPage.tsx, public/robots.txt, public/sitemap.xml, public/about.html, public/guide.html, public/privacy.html, public/terms.html, public/contact.html
- Test: npm run build PASS; public output files verified.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.adsense-public-backup-20261102-073116
- Rollback: restore original files from backup; delete newly created files.
- Production: NOT DEPLOYED. Browser and Google review NOT VERIFIED.
- Follow-up: confirm legal/privacy details, contact channel, ads.txt,
  mobile login layout, then deploy and verify online.

## 2026-11-02 07:34:51 - ADSENSE SUPPORT CONTACT
- Goal: Publish confirmed HOVANG support email.
- Email: hoangbbcg@gmail.com
- Files: public/contact.html, public/privacy.html, public/terms.html
- Test: npm run build PASS; dist contact/policy pages verified.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.adsense-contact-backup-20261102-073441
- Rollback: Restore the three files from the backup.
- Production: NOT DEPLOYED.
- Pending: Verify actual data processing, privacy disclosures,
  terms, ads.txt and mobile browser presentation.

## 2026-11-02 07:42:09 - Mobile message image processing
- Files: src/lib/messageImage.ts, MessagesDialog.tsx
- Mobile image picker accepts image/*.
- Large images converted to compressed JPEG, max edge 1600px.
- GIF animation preserved; HEIC decoding attempted only when supported.
- Backend and API contracts unchanged.
- Typecheck PASS; build PASS; device QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-message-image-20261102-074154

## 2026-11-02 07:47:49 - HOVANG POLICY UPDATE
- Goal: Replace provisional privacy and terms content.
- Files: public/privacy.html, public/terms.html
- Source: HOVANG local policy audit 20261102-074437.
- Test: npm run build PASS; output HTML verified.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.policy-final-backup-20261102-074740
- Rollback: restore the two original files from backup.
- Production: NOT DEPLOYED.
- Limitations: retention, complete deletion behavior, external
  data sharing and legal requirements not independently verified.
- Pending: owner review, real-world practices, ads.txt verification,
  production deployment and browser checks.

## 2026-11-02 07:49:23 - Mobile message images V3
- File: src/lib/messageImage.ts
- Non-GIF images are decoded and converted to JPEG before upload.
- Input limit: 50 MB; target output: 700 KB; max edge: 1920px.
- Improved initial JPEG quality for text screenshots.
- GIF remains animated and subject to output size limit.
- API, database, VPS and message UI unchanged.
- Typecheck PASS; build PASS; mobile device QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-image-compat-20261102-074910

## 2026-11-02 07:52:32 - V7.2 unified replay button
- File: src\pages\game\GamePage.tsx
- One desktop replay mode button for both normal replay and saved position.
- Same parent and absolute anchor: left 50%, top 220px.
- Existing shared selection sound preserved.
- Mobile replay branch unchanged.
- Typecheck: PASS.
- Build: PASS.
- Visual/audio QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.v72-replay-anchor-20261102-075219\GamePage.tsx

## 2026-11-02 07:53:22 - Tạo nhóm laptop theo mobile
- File: src\features\lobby\components\MessagesCreateGroupPanel.tsx
- Đồng bộ kích thước biểu tượng tiêu đề.
- Đồng bộ tỷ lệ hai nút Hủy / Tạo nhóm.
- Giữ nguyên bố cục thành viên đã chọn.
- Giữ nguyên logic chọn bạn bè và tạo nhóm.
- Typecheck: PASS.
- Build: PASS.
- Visual QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.create-group-mobile-style-20261102-075311\MessagesCreateGroupPanel.tsx

## 2026-11-02 07:59:55 - Desktop messages UI V1
- File: src/features/lobby/components/MessagesDialog.tsx
- Increased desktop conversation avatars by approximately 16%.
- Reduced horizontal spacing between avatar and conversation text.
- Enlarged desktop search field height and available width.
- Mobile compact overrides preserved.
- Typecheck PASS; build PASS; browser visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\desktop-messages-ui-20261102-075944\MessagesDialog.tsx

## 2026-11-02 08:03:32 - Desktop messages V2
- File: src/features/lobby/components/MessagesDialog.tsx
- Avatars: 116% -> 110%.
- Avatar/text gap: restored desktop gap-2.
- Conversation name: down 2px desktop.
- Status/preview: up 2px desktop.
- Search field: unchanged.
- Compact/mobile UI: unchanged.
- Typecheck PASS; build PASS; browser visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\desktop-messages-v2-20261102-080321\MessagesDialog.tsx

## 2026-11-02 08:04:09 - Restore original replay button
- File: src\pages\game\GamePage.tsx
- Restored desktop replay control region from verified V7 backup.
- Original desktop ReplayControls toggle restored.
- Original saved-position margin mt-[50px] restored.
- Mobile branch outside modified region preserved.
- Typecheck: PASS.
- Build: PASS.
- Browser visual QA: PENDING.
- Original backup: D:\Học\code\code games\Cờ Tướng\board-game\.v7-replay-button-20261101-231230\src\pages\game\GamePage.tsx
- Safety backup: D:\Học\code\code games\Cờ Tướng\board-game\.replay-original-restore-20261102-080357\GamePage.tsx
&#10;## 2026-11-02 08:06:00 - AdSense ads.txt&#10;- Added or verified public/ads.txt&#10;- Publisher: pub-9272190698840010&#10;- Build: PASS; dist/ads.txt verified&#10;- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ads-txt-backup-20261102-080551&#10;- VPS unchanged; dashboard ID confirmation pending.&#10;

## 2026-11-02T02:09:49.321Z - Image V3
- Lossless WebP conversions: 3
- Source files updated: 6
- Saved MB: 3.93
- Typecheck: PASS
- Build: PASS
- Browser visual QA: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.image-v3-backup-20261102-090929

## 2026-11-02 09:15:22 - Shared notice V5
- Files: HomePage.tsx, MessagesOptionsPanel.tsx, OneChoiceNoticeStyles.ts
- Home message dialogs updated: 1
- Unified frame, text and one-button notice appearance.
- Preserved each original dialog backdrop.
- Preserved all scene backgrounds and dismiss callbacks.
- MobileHome.tsx, VPS and database untouched.
- Typecheck PASS; build PASS; browser/device visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\shared-notice-v5-20261102-091503

## 2026-11-02 11:03:33 - Weekly Shop 2026-11-02 / avatar-frame V7
- Week-specific Backend selection: Hồ Ly, Thiên Tôn, Sa Tăng, Bạch Long, Hắc Lang, Bạch Hổ.
- Tôn Ngộ Không removed from this week's offer only; existing product and ownership preserved.
- Six named frames added as matching avatar decorations in weekly Shop product cards and previews.
- Frame display is decorative; no ownership, frame purchase or equip logic was added.
- Original future weekly rotation preserved.
- Files: server/services/weeklyShopSelection.ts, src/pages/shop/ShopPage.tsx, src/pages/shop/ShopAvatarPreview.tsx, six weekly-custom PNG assets.
- Tests: npm run typecheck PASS; npm run build PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.weekly-vien-v6-backup-20261102-110319
- Visual and purchase QA: not yet verified manually.
### 2026-11-02 14:02:15 - Codex toolkit verification
- Scope: Verify Codex tooling after installer error.
- Source code: Not modified.
- Changes: Documentation logs and verification report.
- Backup: C:\Users\NHAT HOANG\HOVANG-CODEX-VERIFY-20261102-140210
- Test: Command availability, CLI help, skill files, MCP registration.
- Limitation: Actual MCP operation and browser interaction not tested.
- Report: C:\Users\NHAT HOANG\HOVANG-CODEX-VERIFY-20261102-140210\REPORT.txt

- 2026-11-02: Theo user, hai mũi tên Chế độ trước/tiếp theo Home mobile và nút Giải đấu Home mobile/laptop phát tiếng X qua data-ui-selection-sound chung, tôn trọng muted và không chồng tiếng tab. Giữ callback/chuyển trang/UI. Backup outputs/backups/home-x-sound-20261102. mobile-home + ui-checkbox-sound5/5 PASS; npm.cmd run build TypeScript/Vite PASS; dist index-Pj3YiMZv.js xác nhận marker; chưa nghe thử browser.

- 2026-11-02: Theo user, mọi vùng chờ tải dùng vòng xoay ở giữa, trừ màn đầu vào game. Thêm HovangLoadingOverlay tái dùng HovangDataSpinner hiện có, absolute/fixed không chiếm layout và pointer-events-none. Áp dụng lazy màn App/mở Tin nhắn Home+Chọn Bàn, Shop, tải/thao tác Tin nhắn, đăng nhập Guest/Google, tìm bàn/tạo bàn, chuẩn bị máy/thế, Lobby, xử lý năng lượng/thông báo/admin. Danh sách bàn/tỉnh/địa chỉ/lời mời vốn có spinner giữ nguyên. Không sửa EntryGate/GameLoadingScreen, không đổi nghiệp vụ. Backup outputs/backups/loading-spinner-20261102; rollback chỉ các file trong manifest backup, không đè thay đổi task khác. Kiểm thử loading-overlay/locked-room-ui/mobile-home6/6 PASS; TypeScript/Vite build PASS, dist kiểm overlay. Shop-page suite cũ không PASS: thiếu ResizeObserver trong jsdom, thử mock thấy assertion geometry cũ784px khác khung hiện1253px; đã trả test về nguyên trước task, không đổi UI để qua test. Chưa browser/thiết bị thật QA.

- 2026-11-02: Theo user, người mới vào phòng không nghe/nhận presentation kết quả cũ. Online useMoveSound chỉ đánh dấu đã theo dõi live khi phase playing; GamePage cùng gate cho hình chiếu bí. Không ngắt âm/bảng của người đã theo dõi. RoomService join có hàng chờ luôn đưa newcomer xuống view; fillQueuedVacancies đưa queued đủ năng lượng lên ghế trống theo thứ tự, join-queue mới không vượt hàng. Giữ queueBlocked/đang chơi/năng lượng/mật khẩu. Không hàng chờ vẫn lên ghế nếu đủ điều kiện. Backup outputs/backups/join-queue-silent-20261102. 55/55 targeted queue/audio/result/energy/locked PASS; kiểm lại suite queue3/3 PASS sau sửa fixture. Build TypeScript/Vite PASS, dist GamePage-i_sIPorJ.js cập nhật. Chưa browser/hai thiết bị QA; backend cần nạp mã mới, không restart/deploy.

- 2026-11-02: Theo user, khi chủ phòng bị chuyển xuống View trong luồng xoay hàng, quyền chủ chuyển cho đối thủ còn trên bàn trước khi chèn người mới; không giao cho người vừa lên. Theo dõi ownerId cả bàn thường (người vào đầu tiên), bàn khóa giữ quyền claim theo account. RoomSummary thêm ownerName lấy theo ownerId; RoomTableGrid laptop/mobile hiển thị ownerName thay playerNames[0] (fallback cho dữ liệu cũ), giữ tên/phòng gốc và hình học. Giữ điều kiện xoay hiện hành, gồm ngoại lệ chủ bàn khóa còn năng lượng giữ ghế; không tự thay đổi khi nào xuống View. Backup outputs/backups/room-owner-transfer-20261102. 35tests PASS/1skip legacy countdown; test mới gồm locked owner hết năng lượng thua→View, quyền và tên thuộc người thắng ở ghế thứ2, quyền cũ bị chặn. Đã chạy baseline backup xác nhận test countdown cũ21/20 vẫn fail. Build TypeScript/Vite PASS, dist cập nhật; chưa browser/hai thiết bị QA. Backend cần nạp mã mới; không restart/deploy.

- 2026-11-02: Theo user, bỏ quảng cáo demo và giữ điểm phát để nối quảng cáo thật sau. Home bỏ nhánhDEV/state/markup MockInterstitialAd, xóa component demo và test countdown riêng. Mọi môi trường dùng cùng homeInterstitial.request() tại vị trí return Home; giữ takeOnlineAdOffer chống lặp, tích lũy2ván/điều kiện rời online, rewarded provider và cờ H5false. Chưa có quảng cáo thật thì fail-open không chặn Home/không nhận thưởng. Backup outputs/backups/remove-demo-ads-20261102; phục hồi đúng4file nếu cần.6suite ads32/32 PASS, npm.cmd run build TypeScript/Vite PASS, dist không chứa demo. Chưa browser/SDKthật QA; không bật quảng cáo thật/deploy.

- 2026-11-02: Theo user, bổ sung placement Xem quảng cáo30s sau này. ENERGY_REWARDED_AD_PLACEMENT energy_watch_ad/requestedDurationSeconds30 truyền vào RewardedAdProvider.show; cả Xem video trong Năng lượng và EnergyNotice gọi rewardedAds chung. Provider hiện null: không demo/countdown giả/không tự cấp năng lượng; unavailable/error giữ thông báo cũ. SDK thật sau này phải hỗ trợ creative30s; đây là thời lượng yêu cầu, không timer ép ngắt quảng cáo hoặc bằng chứng cấp thưởng. Interstitial returnHome giữ riêng. Backup outputs/backups/rewarded-ad-placement-20261102. rewardedAds+adsHomeIntegration10/10 PASS; TypeScript/Vite build PASS, dist có placement. Chưa SDK/browser thật QA.

- 2026-11-02: Theo user đổi nhãn HOANGBBCG→HOVANG ở sông bàn cờ và nền trống Tin nhắn, chung laptop/mobile; đồng bộ renderer screenshot worker cũ và tài liệu nguồn asset. Giữ font/cỡ/vị trí/màu. Backup outputs/backups/hovang-label-20261102. npm.cmd run build TypeScript/Vite PASS; dist GamePage-Cd1iuuOs.js/MessagesDialog-DdalG7_j.js có HOVANG; rg xác nhận src/dist không còn HOANGBBCG. Chưa browser QA.

- 2026-11-02: Theo user, nút điều khiển Xem lại/Đánh thử dùng tiếng X qua data-ui-selection-sound ở ArtworkButton và ToolArtworkButton: lùi/tiến, Máy đi, Phân tích, Gợi ý, reset, Phát/Tạm dừng; thêm Thử lại cùng cụm. Nút chuyển Xem lại/Đánh thử vốn có marker giữ nguyên. Dùng listener chung/tôn trọng muted, không đổi UI/callback hoặc tiếng đi quân. Backup outputs/backups/replay-x-sound-20261102.

- 2026-11-02: Theo ảnh user, Đã chơi Lịch sử chỉ hiện ván finished có winner (thắng/thua), bỏ Đang đấu và ván hòa khỏi danh sách này; dùng filter chung HistoryDialog laptop/mobile. Không xóa dữ liệu/đổi API/ghi ván hoặc Đã lưu; kết thúc có winner tự xuất hiện theo store. Thay quy tắc hiển thị playing trong Đã chơi2026-10-27, giữ Đã lưu cũ. Backup outputs/backups/history-finished-only-20261102. Hai regression mới laptop/mobile PASS (ẩn playing/draw, hiện completed, reactive khi finished); build TypeScript/Vite PASS, dist cập nhật. Full saved-match-history16ca:6PASS/10FAIL (các ca cũ query/hold/dialog), không tuyên bố toàn suite PASS; chưa browser QA.

- 2026-11-02: Theo user, làm lại MatchIntro đối đầu: Elo cao dải cam trên/đi từ trái, thấp dải xanh dưới/đi từ phải, bằngElo Đỏ trên; avatar+viền+tên vàElo lấy useDatabaseProfile theo userId/variant như PlayerCard, khóa snapshot thứ tự lúc intro hiện. SVG hai kiếm giữa, WAAPI1300ms giữ clock/âm/luật:24%vào nhanh,24–65%trôi chậm(-16→16),65–82%bay tiếp vàmờ1→0 trong50px(16→66), cuối bay khỏi khung. Backdrop blur/nền tối, responsive cả viewport, reduced-motion giữ hình tĩnh. Chỉ geometry avatar trong hiệu ứng mới được sửa theo quyền user; PlayerCard/avatar nơi khác giữ. Backup outputs/backups/match-intro-versus-20261102. match-intro-versus+room-entrance4/4PASS, TypeScript/Vite buildPASS, dist GamePage kiểm mới; chưa browser/motion thật QA. UI xem thử, không chốt khóa mới.

- 2026-11-02: Theo user, khi người cuối cùng trong hai ghế rời phòng, nếu không có queued đủ năng lượng lấp ghế thì tự đưa viewer vào sớm nhất đủ năng lượng lên bàn dù queued=false, giao ownerId và RoomSummary.ownerName theo người đó. Không tự kéo viewer thường lên khi vẫn còn một người trên ghế. Giữ ưu tiên hàng chờ/energy/mật khẩu, áp dụng bàn thường/khóa. RoomService lưu thứ tự lần vào View trong RAM độc lập thứ tự vào/rời hàng; người bị xuống View nhận thứ tự mới. Backup outputs/backups/earliest-viewer-owner-20261102. 29/29 queue/energy/locked PASS gồm bàn thường/khóa, giữ userId, đổi tên và queue-toggle không làm mất ưu tiên đến sớm; TypeScript/Vite build PASS, dist cập nhật; chưa browser/hai thiết bị QA, không restart/deploy. Backend cần nạp mã mới.

- 2026-11-02: Theo user, kết thúc ván nếu đúng2người đã đấu vẫn giữ ghế, sau tối thiểu5s và cả2ACK hoàn tất presentation thì tự chuẩn bị ván kế/hiện đếm30ngay (không thêm1s chờ); 30s sau tự bắt đầu nếu đủ điều kiện, cả2Ready vẫn bắt đầu ngay. Server rematchWaits khóa archiveID+cặpID, ACK chỉ nhận người ngồi/đúngván; không dùng5s để đoán audio, phải chờ callback ACK. Hàng chờ cần xoay giữ ưu tiên+gate cũ; chủ bàn khóa giữ ghế cũng đếm lại. Rời ghế/đổi ván/xóa phòng dọn rematchWaits; giữ archive tới ván mới. Backup outputs/backups/rematch-countdown-20261102. 30/30 rematch/ready/energy/queue PASS, sau cleanup test lại5/5 rematch PASS; npm.cmd run build TypeScript/Vite PASS, dist cập nhật, diff-check PASS. Chưa browser/hai thiết bị QA; backend cần nạp mã mới, không restart/deploy.

- 2026-11-02: User báo không thấy đếm sau ván. Sửa hai chỗ: server không chặn HIỂN THỊ đếm bằng2ACK nữa; sau5s finished hiển thị30→0 và giữ nguyên bàn/kết quả. Chỉ tự bắt đầu ván tiếp khi hết30s+2ACK audio/hình thật+canStart, không cắt presentation. readyCountdownForPlayer cho phép phasefinished (chỉ ghế chưaReady), MatchResultDialog nhận số đếm và hiện ngay trong top-layer popup để không bị popup che. Thay cơ chế reset sang ready sau5s của task trước; hàng chờ/thay ghế vẫn ưu tiên. Backup outputs/backups/rematch-visible-countdown-20261102. Lượt1:31/31 rematch/audio-countdown/visibility/result PASS; sau thêm regression popup và nối helper27/27 rematch+result PASS. Build TypeScript/Vite PASS; dist kiểm nhãn đếm mới, diff-check PASS. Chưa browser/hai thiết bị QA; đọc process backend qua CIM bị hạn chế nên chưa xác nhận runtime đã nạp bản mới; không restart/deploy.

- 2026-11-02: Sau ván, người ngồi hết năng lượng phải xuống View queued=false kể cả không có hàng chờ; chủ bàn khóa là ngoại lệ luôn giữ ghế khi hết năng lượng, cả khi có người xếp hàng. Người thay vẫn theo FIFO/đủ năng lượng; không đẩy xuống giữa ván. Quy tắc này thay ngoại lệ chủ bàn khóa hết năng lượng phải nhường và giữ người hết năng lượng khi không có hàng trước đó.
- Sửa nguyên nhân đếm lại không chạy với persistence thật: RoomPersistence.observe đổi lastCompletedMatch.id sang UUID DB khi recordCompletion. captureCompletedMatch phải tạo rematchWaits SAU observer để giữ đúng ID cuối; trước đây test RAM không tái hiện. Thêm regression observer đổi ID và test2socket thật xác nhận cả2nhận30→29 qua room:state/helperUI. Người hết năng lượng không hàng chờ xuống sau5s trình diễn; sau xoay có người khác hết năng lượng vẫn dọn ghế dù hết hàng, giữ lockedowner. Backup outputs/backups/persisted-rematch-energy-20261102. Final32/32 rematch/energy/queue/presentation PASS; socket1/1 PASS ngoài sandbox (localhost tạm, không DB thật). Build TypeScript/Vite PASS, dist cập nhật/diff-check PASS. Chưa browser2thiết bị/MySQL thật QA; không có listener local3001/5173 ở lần kiểm tra; không restart/deploy máy chủ người dùng.

## 2026-11-02 18:02:36 - Lossless PNG optimization
- Goal: Reduce HOVANG build size without altering decoded image pixels.
- Scope: Selected active PNG assets in src/assets.
- Files modified: 580e9677-60e1-44a8-9fd5-45ef04444b44.png, awarded-honors\grant-row-sparkle.png, awarded-honors\grant-row.png, awarded-honors\phong-tang-1.png, awarded-honors\phong-tang-2.png, awarded-honors\phong-tang-3.png, awarded-honors\phong-tang-4.png, awarded-honors\phong-tang-5.png, buttons\ready-avatar-ribbon.png, computer-setup\avatar.png, computer-setup\back.png, computer-setup\ong-hoang-avatar-full.png, computer-setup\ong-hoang-stars.png, computer-setup\ong-hoang-title.png, computer-setup\training-banner.png, create-room\cancel-upload.png, create-room\confirm-upload.png, create-room\field-upload.png, energy-shop\close.png, energy-shop\panel-no-count.png, friends\friend-action-button-frame.png, friends\friend-chat-button.png, friends\friend-invite-button.png, friends\friend-secondary-action-button-frame.png, friends\friend-section-title-frame-tight.png, friends\friends-banner.png, friends\friends-tab-add-inactive.png, friends\friends-tab-invites-inactive.png, friends\friends-tab-list-inactive.png, history\controls-analysis-v2.png, history\controls-back-v2.png, history\controls-count-v2.png, history\controls-forward-v2.png, history\controls-frame-v2.png, history\controls-hint-v2.png, history\controls-machine-v2.png, history\controls-play-v2.png, history\controls-reset-v2.png, history\history-banner.png, history\history-black-user.png, history\history-hidden-user.png, history\history-red-user.png, history\history-replay-button-frame.png, history\replay-flip.png, home-actions\energy-icon-v2.png, home-actions\energy-icon.png, home-actions\gold-icon-v2.png, icons\like-white.png, icons\move-indicator-dot.png, messages\avatar-an.png, messages\avatar-dung.png, messages\avatar-han.png, messages\avatar-khoi.png, messages\avatar-phat.png, messages\avatar-picolozz.png, messages\avatar-tuan.png, messages\conversation-chat-frame.png, messages\create-group\avatar.png, messages\create-group\back.png, messages\create-group\body.png, messages\create-group\create-button-blank.png, messages\create-group\frame.png, messages\more.png, messages\options\action-row-blank.png, messages\options\back.png, messages\options\block.png, messages\options\body.png, messages\options\delete-chat.png, messages\options\frame.png, messages\options\info.png, messages\options\mute.png, messages\options\nickname.png, messages\options\remove-friend.png, messages\options\report.png, messages\send.png, pieces\codo-coden-v2\black-advisor-codo-coden-v2.png, pieces\codo-coden-v2\black-cannon-codo-coden-v2.png, pieces\codo-coden-v2\black-elephant-codo-coden-v2.png, pieces\codo-coden-v2\black-general-codo-coden-v2.png, pieces\codo-coden-v2\black-horse-codo-coden-v2.png, pieces\codo-coden-v2\black-rook-codo-coden-v2.png, pieces\codo-coden-v2\black-soldier-codo-coden-v2.png, pieces\codo-coden-v2\red-advisor-codo-coden-v2.png, pieces\codo-coden-v2\red-cannon-codo-coden-v2.png, pieces\codo-coden-v2\red-elephant-codo-coden-v2.png, pieces\codo-coden-v2\red-general-codo-coden-v2.png, pieces\codo-coden-v2\red-horse-codo-coden-v2.png, pieces\codo-coden-v2\red-rook-codo-coden-v2.png, pieces\codo-coden-v2\red-soldier-codo-coden-v2.png, pieces\concealed-back.png, player\elo-frame.png, player\rank-star.png, profile\actions\remove-friend.png, profile\avatar-customization-title.png, profile\customization-tab-avatar.png, profile\customization-tab-effect.png, profile\honors\honors-detail-frame.png, profile\honors\honors-frame-tight.png, profile\honors\honors-title-info-frame.png, profile\info-title-friends-frame.png, profile\mode-hidden.png, profile\mode-xiangqi.png, rankings\rank-bronze-v2.png, rankings\rank-gold-v2.png, rankings\rank-plain-frame.png, rankings\rank-silver-v2.png, rankings\ranking-title-transparent.png, rankings\top-one-crown.png, room-code\room-code-frame.png, room-selection\avatar.png, room-selection\back.png, room-selection\brown-card-upload.png, room-selection\province-card.png, room-selection\province-icons\01_ha_noi.png, room-selection\province-icons\02_cao_bang.png, room-selection\province-icons\03_tuyen_quang.png, room-selection\province-icons\04_dien_bien.png, room-selection\province-icons\05_lai_chau.png, room-selection\province-icons\06_son_la.png, room-selection\province-icons\07_lao_cai.png, room-selection\province-icons\08_thai_nguyen.png, room-selection\province-icons\09_lang_son.png, room-selection\province-icons\10_quang_ninh.png, room-selection\province-icons\11_bac_ninh.png, room-selection\province-icons\12_phu_tho.png, room-selection\province-icons\13_hai_phong.png, room-selection\province-icons\14_hung_yen.png, room-selection\province-icons\15_ninh_binh.png, room-selection\province-icons\16_thanh_hoa.png, room-selection\province-icons\17_nghe_an.png, room-selection\province-icons\18_ha_tinh.png, room-selection\province-icons\19_quang_tri.png, room-selection\province-icons\20_hue.png, room-selection\province-icons\21_da_nang.png, room-selection\province-icons\22_quang_ngai.png, room-selection\province-icons\23_gia_lai.png, room-selection\province-icons\24_khanh_hoa.png, room-selection\province-icons\25_dak_lak.png, room-selection\province-icons\26_lam_dong.png, room-selection\province-icons\27_dong_nai.png, room-selection\province-icons\28_tp_ho_chi_minh.png, room-selection\province-icons\29_tay_ninh.png, room-selection\province-icons\30_dong_thap.png, room-selection\province-icons\31_vinh_long.png, room-selection\province-icons\32_an_giang.png, room-selection\province-icons\33_can_tho.png, room-selection\province-icons\34_ca_mau.png, room-selection\province-picker-frame.png, room-selection\red-card-upload.png, room-selection\table-player-blue.png, room-selection\table-player-red.png, room-users\queue-join-swapped.png, room-users\queue-leave-swapped.png, room-users\viewer-card-frame-tight.png, room-users\waiting-card-frame-tight.png, shop\avatars\ab-test\lao-quan-su-128.png, shop\avatars\ab-test\lao-quan-su-136.png, shop\avatars\ab-test\lao-quan-su-160.png, shop\avatars\ab-test\lao-quan-su-192.png, shop\avatars\ab-test\lao-quan-su-200.png, shop\avatars\ab-test\lao-quan-su-256.png, shop\avatars\ab-test\lao-quan-su-272.png, shop\avatars\ab-test\lao-quan-su-320.png, shop\avatars\small\lao-quan-su-128.png, shop\avatars\small\lao-quan-su-136.png, shop\avatars\small\lao-quan-su-160.png, shop\avatars\small\lao-quan-su-192.png, shop\avatars\small\lao-quan-su-200.png, shop\avatars\small\lao-quan-su-256.png, shop\avatars\small\lao-quan-su-272.png, shop\avatars\small\lao-quan-su-320.png, shop\avatars\small\lao-quan-su-384.png, shop\avatars\small\lao-quan-su-408.png, shop\avatars\small\lao-quan-su-480.png, shop\avatars\small\nam-tuong-quan-128.png, shop\avatars\small\nam-tuong-quan-136.png, shop\avatars\small\nam-tuong-quan-160.png, shop\avatars\small\nam-tuong-quan-192.png, shop\avatars\small\nam-tuong-quan-200.png, shop\avatars\small\nam-tuong-quan-256.png, shop\avatars\small\nam-tuong-quan-272.png, shop\avatars\small\nam-tuong-quan-320.png, shop\avatars\small\nam-tuong-quan-384.png, shop\avatars\small\nam-tuong-quan-408.png, shop\avatars\small\nam-tuong-quan-480.png, shop\avatars\small\nam-tuong-quan-96.png, shop\avatars\small\nu-kiem-khach-128.png, shop\avatars\small\nu-kiem-khach-136.png, shop\avatars\small\nu-kiem-khach-160.png, shop\avatars\small\nu-kiem-khach-192.png, shop\avatars\small\nu-kiem-khach-200.png, shop\avatars\small\nu-kiem-khach-256.png, shop\avatars\small\nu-kiem-khach-272.png, shop\avatars\small\nu-kiem-khach-320.png, shop\avatars\small\nu-kiem-khach-384.png, shop\avatars\small\nu-kiem-khach-408.png, shop\avatars\small\nu-kiem-khach-480.png, shop\avatars\small\nu-kiem-khach-96.png, shop\frames\daily-v3\bac-sang.png, shop\frames\daily-v3\dong-co.png, shop\frames\daily-v3\hong-ngoc.png, shop\frames\daily-v3\hong-phan.png, shop\frames\daily-v3\lam-bac.png, shop\frames\daily-v3\nau-go.png, shop\frames\daily-v3\ngoc-bich.png, shop\frames\daily-v3\trang-ngoc.png, shop\frames\daily-v3\xanh-ngoc.png, shop\frames\vien_03_do.png, shop\frames\vien_08_xanh_ngoc.png, shop\frames\vien_09_tim.png, shop\gift.png, shop\heading-clock.png, shop\heading-main.png, shop\heading-subtitle.png, shop\market-bronze.png, shop\market-gold.png, shop\purchased.png, shop\tab-active.png, shop\tab-idle-v2.png, takeback\takeback-accept.png, takeback\takeback-decline.png
- Build before: 193.855 MB.
- Build after: 191.454 MB.
- Saved: 2.4 MB.
- Build: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.optimize-png-20261102-180154.
- Browser visual QA: pending.
- Network transfer size: not measured.


## 20261102-181010 - Isolated WebP V2 trial
- Goal: Test WebP quality 88 while protecting original build.
- Changed: 202 PNG assets in isolated preview.
- Skipped: 0.
- Before: 191.454 MiB.
- After trial: 57.548 MiB.
- Saved: 133.907 MiB.
- Validation: dimensions, alpha pixels, static references.
- Browser QA: pending user review.
- Source and original dist: unchanged.
- Recovery: stop preview and use original dist.
- Trial: C:\Users\NHAT HOANG\HOVANG-WEBP-V2-20261102-181010\preview-dist
- Report: C:\Users\NHAT HOANG\HOVANG-WEBP-V2-20261102-181010\REPORT.txt


## 20261102-181757 - Apply approved WebP build to LOCAL
- Scope: dist only.
- Approved WebP images: 202.
- Before: 191.454 MiB.
- After: 57.548 MiB.
- Saved: 133.907 MiB.
- Typecheck: PASS.
- Asset existence and size: PASS.
- Browser functional QA: pending.
- VPS deployment: not performed.
- Original dist backup: C:\Users\NHAT HOANG\HOVANG-WEBP-APPLY-20261102-181757\dist-original.
- Rollback: restore backup to project dist.
- Important: subsequent builds may replace this optimized dist.


## 20261102-182154 - Persistent WebP postbuild
- Goal: Preserve approved WebP optimization after every npm build.
- Files: package.json, scripts/hovang-webp-postbuild.cjs.
- Original build command: npm run typecheck && vite build
- New build command: npm run typecheck && vite build && node scripts/hovang-webp-postbuild.cjs . dist scripts/hovang-webp-build-result.json optimize
- Previous optimized dist: 57.548 MiB.
- New optimized dist: 57.548 MiB.
- Difference: 0 MiB.
- Converted assets: 202.
- Build: PASS.
- Typecheck: PASS.
- Browser QA: pending.
- Backup: C:\Users\NHAT HOANG\HOVANG-WEBP-PERSIST-20261102-182154.
- Rollback: restore package-original.json and dist-original;
  remove scripts/hovang-webp-postbuild.cjs.
- Source PNG and VPS: unchanged.


## 20261102-183011 - Home lazy loading V2
- Goal: Disable eager GamePage and RoomSelectionPage preload.
- Source: src/app/App.tsx.
- TypeScript AST dependency removed from patcher.
- Build/typecheck: PASS.
- Home test: PASS.
- WebP optimization: PASS.
- Before: 57.548 MiB.
- After: 57.547 MiB.
- Difference: 0 MiB.
- Network savings: not measured.
- Browser QA: pending.
- Backup: C:\Users\NHAT HOANG\HOVANG-HOME-LAZY-V2-20261102-183011.
- Rollback: restore App.tsx.original and dist-original.
- VPS: unchanged.


## 20261102-184015 - Isolated Home audio V3 trial
- Goal: Compare three Home tracks at MP3 128 kbps.
- Game source and dist: unchanged.
- Trial savings: 4.84 MiB.
- Actual build: 57.547 MiB.
- Projected build if approved: 52.707 MiB.
- Duration validation: PASS.
- Listening QA: pending.
- Backup: C:\Users\NHAT HOANG\HOVANG-AUDIO-V3-20261102-184015\original.
- Game rollback: not required.
- VPS: unchanged.


## 20261102-184515 - Home MP3 audio optimization
- Goal: Apply compressed Home music to LOCAL.
- Modified source files: chinesezenmusic-chinese-bamboo-flute-amp-guzheng-relaxing-zen-music-618302.mp3, et11lx-chinese-ancient-style-music-love-etlx-247345.mp3, et11lx-chinese-ancient-style-music-love-et11lx-155926.mp3.
- Bitrate: 128 kbps.
- Before build: 57.547 MiB.
- After build: 52.707 MiB.
- Reduced: 4.84 MiB.
- Build/typecheck/WebP postbuild: PASS.
- Home music and audio preferences tests: PASS.
- Actual listening QA: pending user review.
- Original audio and dist backup: C:\Users\NHAT HOANG\HOVANG-AUDIO-APPLY-20261102-184515.
- Restore script: C:\Users\NHAT HOANG\HOVANG-AUDIO-APPLY-20261102-184515\RESTORE.ps1.
- VPS: unchanged.


## 20261102-185617 - WebP Q76 LOCAL optimization
- Goal: Save at least 5 MiB from WebP.
- Modified: package.json, scripts/hovang-webp-finalpass.cjs.
- Source images: unchanged.
- Build before: 52.707 MiB.
- Build after: 38.545 MiB.
- Saving: 14.162 MiB.
- Build and typecheck: PASS.
- Visual QA: pending.
- Backup: C:\Users\NHAT HOANG\HOVANG-WEBP-Q76-20261102-185617.
- Restore: C:\Users\NHAT HOANG\HOVANG-WEBP-Q76-20261102-185617\RESTORE.ps1.
- VPS: unchanged.


- 2026-11-02: User yêu cầu intro giữa chậm hơn, dải thấp hơn, blur nền nhẹ và không chạy clock trong hiệu ứng. MATCH_INTRO_MS1300→2600 dùng chung hook/startGame local/RoomService; server vẫn authoritative, chặn move và không trừ tổng/lượt trước lastClockUpdate. Dải vào12%, giữa12–74%(~1612ms), mờ50px đến90%, thoát100%; cao cụm clamp210/38vh/300 thay260/52vh/400, avatar56–88 thay64–112 riêng intro. Nền tối30%/blur4px. GameSounds delay tick theo token chung (policy tick vẫn tắt). Đồng bộ fixture thời gian intro về token, không đổi assertion nghiệp vụ cũ. Backup outputs/backups/slower-match-intro-20261102. Final6suite35/35PASS gồm engine/server không trừgiờ/chặnmove vàhook giữa>1500ms/cònhiện ở1300ms. Build TypeScript/Vite đãPASS, đang chờ postbuild tối ưu ảnh kết thúc; chưa browser2thiết bị QA. Backend cần nạp mã mới để áp dụng2600ms online, không restart/deploy.

- Kiểm chứng cuối slower-intro: npm.cmd run build hoàn tất exit0 gồm cả2postbuild ảnh; dist có kích thước/blur intro mới.35/35targetedPASS.

- 2026-11-02: Hai tài khoản có quan hệ bạn bè accepted lúc bắt đầu ván được miễn trừ năng lượng cho cả hai. Backend kiểm tra friendship trong transaction bắt đầu; không ghi debit/ledger năng lượng, không cấp thêm số dư. Chỉ quan hệ accepted, không miễn riêng vì có lời mời. Elo/stat/kết quả và chính sách không thưởng vàng khi đấu bạn bè giữ nguyên. Cặp ngồi đúng bàn được server xác nhận có thể Sẵn sàng ở0năng lượng; người lạ và thao tác chưa xác định đối thủ giữ kiểm tra năng lượng hiện hành.
- Triển khai: MatchRepository.start query friendship trước gate balance và bỏ cả UPDATE/ledger khi accepted; MatchRepository.areFriends/RoomPersistence.prepareStarts xác nhận cặp socketID vào friendEnergyExemptPair. RoomRepository.hasEnergy nhận context phòng để miễn đúng cặp, RoomService dùng cho ghế/Ready/sau ván; controller chuẩn bị cặp trước join/Ready/tick và client Ready đọc flag server. Không miễn toàn tài khoản, thay đối thủ làm flag vô hiệu; transaction vẫn recheck quan hệ thật. Không migration/UI geometry. Backup outputs/backups/friend-match-energy-20261102. Final42/42 match-gold-policy/room-persistence-energy/energy-room-policy/rematch/lobby-energy PASS (friend0/5 khôngdebit, bìnhthường debit1mỗi/người, lời mời không tựmiễn, stranger0bịchặn, miễnđúngcặp/chốngstale, joinfriend0→Ready→sauván). Suite match-like-persistence mở rộng có1fail cũ thiếu accounts.profile trong mock; đã chạy source RoomPersistence backup vẫn cùng1fail/5PASS, không đổi test ngoài scope. Chưa MySQL thật/browser2thiếtbị QA; không giao dịch dữ liệu user, không restart/deploy.
- Kiểm chứng cuối friend-energy:42/42 targeted PASS; npm.cmd run build chạy đơn bằng cmd.exe hoàn tất EXIT0, gồm TypeScript/Vite và cả2bước WebP postbuild (finalpass APPLIED). dist GamePage-3oT8x2C9.js xác nhận friendEnergyExemptPair; diff-check file sửa PASS. Chưa MySQL thật/browserQA; backend cần nạp mã mới, không restart/deploy.

- 2026-11-02: Người đã Sẵn sàng vẫn nhìn thấy số đếm giữa bàn như ghế chưa Sẵn sàng; viewer tiếp tục không nhận số đếm. Cả2Ready vẫn bắt đầu ngay theo server. Dùng ReadyCountdownBadge chung cho Board và popup kết quả: khung nâu gradient/viền vàng, iconđồnghồ+nhãn, số tabular;5giâycuối cam, co theo scale laptop/mobile. Giữ vị trí neo phía trên nút Ready, không đổi deadline/gameplay/audio.
- Backup outputs/backups/countdown-badge-ready-visible-20261102. 33/33 countdownaudio/visibility/matchresult/rematch PASS (Ready vẫn hiện,viewer ẩn,đếm biến mất khi playing,popup đổi sốreactive). Đây là UI xem thử theo yêu cầu, không khóa thiết kế mới. Chưa browser/điện thoại thật QA.

- 2026-11-02: Theo mẫu user, MatchIntro thay2kiếmSVG bằng3lớpPNG1254² nềnalpha: emblem(khiên+vòng+lá), sword-left/sword-right; built-in image_gen edit ảnh thamchiếu, táidựng phần che. Asset/prompt/source/reference tại src/assets/match-intro. Huyhiệu translateZ360→0/scale bounce như đậpvào;2kiếm độc lập trượt chéo từ gần±36px, vào nhanh300ms rồichậm1000ms, thoátngắn/mờ. Thêm2tamgiác hướng vào giữa ở2đầu mỗi dải. MATCH_INTRO_MS2600→2000 chia300vào+1000giữa, chung server/local/tick/audio; clockvàmove vẫnchờtoken. DảiElo/avatar/viền/tên/cam-xanh/blur giữ. Backup outputs/backups/match-intro-layered-20261102.6suite35/35PASS (giữa1s, Z, kiếmnear36, alphaảnhkiểmtrựcquan, clockserver/engine); build đangchờ2postbuild tốiưuảnh, TypeScript/Vite xong. Chưa browsermotion/2thiếtbịQA; backend cần nạpmã2s, khôngrestart/deploy.

- Kiểm chứng cuối layered-intro: build delivery hoàn tất EXIT0 gồm TypeScript/Vite và cả2postbuild (finalpass237WebP/APPLIED). dist có GamePage mới và3asset emblem/sword-left/sword-right;35/35targetedPASS. Lượtbuild đầuENOENT không được tínhPASS; giữ logdelivery làm bằngchứng.

## 2026-11-02 23:46:42 - Friend matches history-only
- File: server\repositories\matchRepository.ts
- Accepted friends start matches with rated=0.
- Completion reads the stored rated flag.
- Friend matches do not update played/win/loss/streak statistics.
- Friend matches cannot grant games/streak honors.
- Friendship at settlement also excludes statistics and honors.
- Match moves and completed history are retained.
- Existing energy exemption and gold policy preserved.
- Source policy checks: PASS (8).
- Typecheck: PASS.
- Build: PASS.
- Database integration QA: PENDING.
- Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.friend-history-only-20261102-234439\matchRepository.ts

## 2026-11-02 23:50:46 - Xuong ban button asset preflight
- Original user-provided image installed/verified: src/assets/ui/hovang-xuong-ban.png
- TS/TSX source unchanged. Button integration pending exact source inspection.
- Source report: C:\Users\NHAT HOANG\Downloads\HOVANG-XUONG-BAN-SOURCE-REPORT.txt
- Previous asset backup, if any: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\xuong-ban-asset-20261102-235045

## 2026-11-02T17:03:51.848Z - Ready and result clock V2
- Files: src/pages/game/GamePage.tsx, src/features/game/hooks/useMatchResult.ts
- Any seated player Ready suppresses old win/loss UI
- Result effect completion or dialog dismissal resets clocks visually
- Live desktop/mobile clocks updated; replay clock unchanged
- Authoritative server clock and match history unchanged
- Typecheck PASS; Build PASS
- Two-client and audio QA PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ready-clock-v2-20261103-000154

- 2026-11-03: Nút Xuống bàn dùng ảnh user cung cấp tại assets/room-users/stand-up.png, hiển thị đúng vị trí điều khiển hàng chờ cho ghế online cả laptop/mobile; chỉ người đang ngồi thấy, View giữ Xếp hàng/Thoát hàng. Bấm xuống View queued=false nhưng không rời phòng/socket. Đang playing thì xử thua theo luật rời ghế (result leave), ghi kết quả server trước đổi ghế; sau ván không tạo kết quả lần nữa. Ghế trống ưu tiên queued đủ năng lượng, chủ cũ xuống View chuyển quyền cho người còn trên bàn trước người mới lên. Tự xuống một mình không tự kéo chính mình lên lại. Replay/máy/demo không có nút.
- RoomCommand thêm stand-up; RoomService xác thực actor đang ngồi, dọn clock/offer/repetition/readiness cũ, giữ userId khi chuyển viewer và idempotency qua pipeline command cũ. useGame.standUp nối UI; RoomStandUpButton tiếng X dùng ảnh PNGalpha2048×686 nguyên bản (không imagegen/cắt/vẽ lại). RoomUsersPanel ưu tiên onStandUp trước queue, GamePage gate theo player cả panel mobile/desktop và footerdesktop. Backup outputs/backups/stand-up-button-20261103. 23/23 stand-up/room-users-panel/queue/rematch PASS; TypeScriptcheck PASS. Chưa browser/2thiếtbịQA; backend cần nạp mã mới, không restart/deploy.

## 2026-11-03 - Đồng bộ kết quả Ready và clock laptop
- File: src/pages/game/GamePage.tsx, src/features/game/hooks/useBetweenMatchClocks.ts, src/features/game/hooks/useGame.ts, src/features/game/hooks/useMoveSound.ts, src/features/game/components/PlayerCard.tsx, src/lib/roomReadiness.ts.
- Khi một ghế Ready giữa hai ván, cả hai client xóa kết quả hình/âm thanh và ACK presentation; không coi ready cũ trong phase playing là tín hiệu xóa. Đồng hồ hai phía trên laptop hiện cả khi ghế trống, đứng yên trước ván và chỉ đếm khi playing. Sau kết quả/Ready/đổi người ngồi reset về thời lượng cấu hình; khi chơi lấy remainingTime authoritative. UI mobile giữ nguyên.
- Regression tests: 50/50 PASS; typecheck PASS. Build đang chạy; chưa QA browser/hai thiết bị.
- Backup: outputs/backups/result-ready-clocks-20261103.
## 2026-11-03 - Bảng kết quả nổi không chiếm chỗ
- Mục tiêu: hiển thị bảng Thắng/Thua như lớp nổi giữa màn hình.
- File sửa: src/features/game/components/MatchResultDialog.tsx; tests/match-result.test.tsx; docs/PROJECT-MEMORY.md; docs/ROOM-READINESS.md.
- Thay đổi: dialog non-modal fixed phủ viewport, nền ngoài trong suốt và xuyên pointer; artwork giữ kích thước/neo trung tâm, các phần khác không bị đẩy.
- Giữ nguyên: nội dung, countdown, reward, xác nhận/đóng, âm thanh và luồng kết quả.
- Kiểm tra: match-result/rematch-countdown 29/29 PASS; TypeScript PASS; browser QA CHƯA.


## 2026-11-03 - Số đếm ván kế tiếp tối giản
- File: src/features/game/components/ReadyCountdownBadge.tsx; tests/match-result.test.tsx.
- Số đếm 30 giây trên bảng kết quả chỉ là chữ số lớn màu vàng cam, bóng sáng nhẹ; bỏ badge, nền, viền và chữ. Phần đếm Ready giữa bàn và hành vi/countdown unchanged.
- Kiểm chứng: match-result và ready-countdown-visibility 23/23 PASS; typecheck PASS. Build/browser QA pending.
- Backup: outputs/backups/countdown-number-only-20261103.
`n- 2026-11-03: Sửa đúng countdown Board thành number-only; bản trước chỉ sửa result branch nên user không thấy. Backup ReadyCountdownBadge-before-board-fix.tsx trong outputs/backups/countdown-number-only-20261103.

- 2026-11-03: Menu ba gạch thêm Tin nhắn/Chia sẻ bàn online. Chia sẻ mở MessagesDialog với tab Bạn bè (accepted)/Nhóm, chọn người/nhóm chuẩn bị nội dung mời, người dùng bấm Gửi qua API hiện hữu. Tin mời hiển thị nút bấm vào bàn qua roomSocket.join; đang ở bàn khác yêu cầu rời trước, lỗi phòng/khóa theo server. Không gửi mật khẩu. Backup outputs/backups/game-message-share-20261103. Typecheck PASS trước bổ sung contacts; build đang xác minh, chưa browser/two-client QA.

- Kiểm chứng game-message-share: typecheck PASS; npm.cmd run build hoàn tất exit0 gồm tối ưu WebP, dist cập nhật. Chưa browser/hai tài khoản QA; không deploy/server/DB changes.

- 2026-11-03: Tab chia sẻ Bạn bè đổi Cá nhân, hiện mọi hội thoại 1-1, gồm người đang nhắn chưa kết bạn. Backup MessagesDialog-before-direct-filter.tsx. Chưa browser QA.

- 2026-11-03: Tin chia sẻ bàn dùng snapshot JSON HOVANG_SHARE trong body hiện có: tên hai ghế và viewerCount chốt ngay lúc Gửi, không subscribe cập nhật. RoomShareCard có gold optional để nối dữ liệu sau, hiện không cấp giá trị vàng. Parse kiểm schema, tương thích marker cũ; join lỗi phòng không tồn tại hiện thông báo tương ứng. Backup outputs/backups/share-room-card-20261103. Typecheck PASS, chưa browser/hai tài khoản QA.

- Kiểm chứng share-room-card: typecheck và build đầy đủ PASS (exit0). Chưa browser/hai client QA.

- 2026-11-03: Thẻ chia sẻ dạng đối đầu: Elo cao trái viền cam, thấp phải viền xanh; avatar ở mép ngoài dùng AccountAvatar và AvatarRankBadge (danh hiệu/sao), tên/Elo bên cạnh. Giữa dùng emblem+2swords của MatchIntro; View style/icon của bàn ở trên, bấm qua bubble vào phòng. Viewer snapshot giữ nguyên. Hồ sơ/Elo theo useDatabaseProfile và variant, mặc định1000 khi chưa có profile; tin cũ tương thích. Backup outputs/backups/share-card-versus-20261103. Typecheck PASS trước bổ sung variant; chưa browser QA.

- Kiểm chứng share-card-versus: typecheck và full build exit0 PASS; chưa browser QA.

- 2026-11-03: Theo ảnh mẫu user, thẻ chia sẻ thành banner đối đầu: dải cam/xanh phát sáng bo về tâm, avatar lớn ở hai mép ngoài, tên/Elo trên dải, AccountAvatar+AvatarRankBadge thật (gồm sao), emblem/hai kiếm giữa. Nút View bàn giữ ở trên; tỷ lệ dùng container query co theo card. Chỉ scope RoomShareCard, không đổi avatar nơi khác. Backup outputs/backups/share-card-reference-20261103. Chưa browser QA.

- share-card-reference: typecheck/full build PASS exit0; chưa browser QA.
- 2026-11-03: Khai cuộc theo user: nền phủ30%→55%, góc hai dải cam/xanh20px→4px; mobile avatar20vw (72–96px), khung cao300–380px để chứa danh hiệu/sao AvatarRankBadge theo Elo hồ sơ thật. Thứ tự dải giữ theo lúc mở, dữ liệu hồ sơ tiếp tục cập nhật khi tải xong; chưa có hồ sơ thì không hiển thị avatar/rank demo, Elo hiện …. Không đổi thời lượng/gameplay/audio. TypeScript PASS; chưa browser/device QA. Backup outputs/backups/match-intro-mobile-20261103.

- 2026-11-03: Thu gọn RoomShareCard laptop để vừa khung chat; mobile giữ nguyên. Chưa browser QA.

- 2026-11-03: Thẻ chia sẻ laptop mở rộng theo chiều ngang vùng tin nhắn (flex1/min-width0/max-width100%), card width100% box-border và cqw đồng scale. Bỏ bubble nền vàng/viền/padding/đuôi riêng với room-share, tin thường giữ cũ. Backup outputs/backups/share-card-wide-20261103. Chưa browser QA.
- 2026-11-03: Theo user, khung khai cuộc cam/xanh bay quá tâm6% viewport rồi trôi chậm thêm2.5% từ20–62% timeline; sau đó tăng tốc lướt khỏi màn và mờ hết ở80%. Giữ MATCH_INTRO_MS/gameplay/audio. Backup outputs/backups/intro-fly-timing-20261103. TypeScript PASS, chưa browser QA.

- 2026-11-03: Thu thẻ share laptop xuống88% và max calc(100%-64px) để chừa avatar/tên sender riêng; shared group dùng sender metadata thay avatar nhóm. View chốt lúc Gửi bằng Set IDs players+viewers như GamePage, không chỉ viewers. Tin cũ giữ snapshot cũ. Backup outputs/backups/share-card-sender-view-20261103. Chưa browser QA.

- 2026-11-03: User chốt mọi dữ liệu thẻ share là snapshot lúc Gửi. createRoomShare async lấy profile theo userId, lưu tuple tên/Elo/avatarCode/frameCode + variant/View trong body; renderer không gọi useDatabaseProfile nữa, rank/sao từ Elo frozen. Thiếu profile báo lỗi, không gửi dữ liệu giả; View chốt trước await. Tin cũ thiếu snapshot không thể hồi phục hồ sơ lịch sử. Backup outputs/backups/share-frozen-profile-20261103. Typecheck PASS, chưa browser QA.

- share-frozen-profile: typecheck/full build PASS exit0; chưa browser QA.

- 2026-11-03: Avatar sender tin chia sẻ outgoing đặt bên phải bằng order-last, incoming giữ bên trái; bỏ nhãn tên dưới avatar, cùng size/căn giữa/gap hàng tin nhắn hiện có. Backup outputs/backups/share-sender-alignment-20261103. Chưa browser QA.

- 2026-11-03: Link room-share: cùng phòng báo Đang trong phòng hiện tại; participant playing chặn đổi phòng. Ngoài ván/viewer được leave rồi join mặc định, giữ server FIFO queued trước newcomer/ghế đầy vào View. PlayerCard giữ tên hidden của ghế vừa trống để không đổi height hàng Elo neo đồng hồ mobile; không đổi avatar geometry. Backup outputs/backups/share-navigation-clock-20261103. Chưa browser/hai client QA.

- share-navigation-clock: Typecheck PASS; tests 11/12 PASS. Ca empty identity cũ fail vì đã dùng visibility giữ geometry ghế trống (không xóa DOM); không sửa UI để thỏa assertion cũ. Join priority suite PASS. Chưa browser QA.

- Final: queue6/6 PASS sau server update; typecheck/full build PASS. Mobile geometry chưa device QA. Backend cần nạp mã mới.

- 2026-11-03: Elo room-share lấy profile API mới cho cả chính mình (/me) thay account cache; lấy đúng variant và bỏ fallback1000 cho ghế có người. Thiếu stat báo lỗi không gửi. Snapshot giữ nguyên sau gửi, không sửa tin cũ. Backup outputs/backups/share-real-elo-20261103.

- 2026-11-03: RoomShareCard tên đổi font-body semibold dễ đọc; ghế snapshot Chờ người chơi không dựng avatar/Elo/rank giả, giữ khoảng trống và hình chiến đấu giữa. Hai ghế có người vẫn hiện đủ. Backup outputs/backups/share-name-empty-seat-20261103.
- 2026-11-03: Theo user, clock laptop dưới Elo: bỏ translateY(-23px) trên clock PlayerCard, giữ margin-top12px để không che Elo. Mobile giữ nguyên. Backup outputs/backups/laptop-clock-below-elo-20261103. Chưa browser QA.

- 2026-11-03: Thông báo thao tác room-share (cùng phòng, đang đấu, phòng mất/lỗi join) dùng sentNotice.show chung: giữa màn hình, bay lên và tự mất1300ms, thay databaseError ở đáy. Backup outputs/backups/share-floating-notice-20261103.

- 2026-11-03: Sửa share Elo lỗi thiếu GameState.variant (optional): mặc định xiangqi trước tra stats, không thay Elo giả. Tất cả databaseError MessagesDialog chuyển sentNotice nổi bay lên; giữ ẩn lỗi tải inbox theo quy tắc cũ, bỏ alert đáy. Backup outputs/backups/message-notice-elo-fix-20261103.
- 2026-11-03: Theo user, margin-top đồng hồ laptop giảm12→5px để gần Elo hơn; mobile giữ nguyên.

- 2026-11-03: GameTools Tin nhắn có badge đỏ unread dùng useUnreadMessageCount chung Home (cùng query/poll4s), ẩn0/max99+. View room-share mobile cao36px/min-width48px/icon28×21, laptop giữ nguyên. Backup outputs/backups/game-unread-mobile-view-20261103.

- 2026-11-03: View thẻ share mobile cao28px theo user; backup RoomShareCard-before-height-reduce.tsx.
- 2026-11-03: Theo user, trong luồng Chia sẻ bàn nếu draft khác nguyên dòng Mời vào bàn: HOVANG_ROOM:<roomId> thì hiện Link gửi không đúng, return trước tạo snapshot/API/sendImage và không xóa draft. Áp dụng chung laptop/mobile, cá nhân/nhóm. TypeScript PASS; chưa browser QA. Backup outputs/backups/share-invalid-draft-20261103.

- 2026-11-03: Tinh chỉnh View share mobile26px/mắt30×23px/đáy42px. Backup RoomShareCard-before-view-spacing.tsx.

- 2026-11-03: Cân View mobile: mắt28×21/số18/đáy35px. Backup RoomShareCard-before-eye-number-balance.tsx.

- 2026-11-03: Thu nhẹ icon/số View mobile và đáy giảm7px còn28px. Backup RoomShareCard-before-final-view-reduce.tsx.

- 2026-11-03: Thẻ mời phòng mobile thu View, tăng tên/Elo theo user.

- 2026-11-03: Theo ảnh user, room-share mobile tăng68→74vw, View23px/min42/mắt22×16/số14. Ẩn riêng avatar sender outgoing ngoài thẻ ở compact; avatar hai người bên trong snapshot giữ nguyên. Desktop giữ. Backup outputs/backups/share-mobile-view-width-20261103.

- 2026-11-03: Theo user, nới room-share mobile78vw/laptop92%, gap2users10cqw; đáy giảm10px mobile18/desktop2px. Snapshot mới ordered=true, người gửi đang ngồi luôn ở cam/trái, đối thủ xanh/phải; sender viewer thì Elo cao trái. Không sort lại theo người xem tin, tin cũ giữ Elo-order. Backup outputs/backups/share-sender-orange-spacing-20261103.

- 2026-11-03: Share laptop đáy9px (+7), ẩn outgoing sender avatar ngoài thẻ cả2bản. Nếu chỉ1ghế có người luôn đưa occupied sang trái kể cả tin snapshot cũ. Mobile81vw, gap2bên7cqw/avatar-text1.5cqw. Backup outputs/backups/share-final-spacing-20261103.

- 2026-11-03: Laptop đáy+10px, tên mobile thu nhẹ. Backup RoomShareCard-before-bottom-name-adjust.tsx.

- 2026-11-03: Tăng tên/Elo laptop thẻ chia sẻ. Backup RoomShareCard-before-laptop-text-boost.tsx.

- 2026-11-03: Thu nhẹ tên laptop còn3.5cqw. Backup RoomShareCard-before-laptop-name-reduce.tsx.

- 2026-11-03: Sửa moderation bàn khóa bỏ trống ghế khi có queue; gọi fillQueuedVacancies sau reset. Giữ userId người xuống View.

- locked-demote-queue: Regression FIFO mới PASS; typecheck PASS. Hai suite trước15/16 PASS, ca cũ đếm20/21 fail không liên quan. Backend cần nạp mới, không restart/deploy.

- 2026-11-03: Đính chính user: moderation demote/kick ghế chờ1000ms server monotonic rồi tick fill FIFO; chặn fill/join ghế bypass trong thời gian chờ. Backup outputs/backups/locked-demote-delay-20261103.
- 2026-11-03: User báo toàn UI laptop màn lớn giật, nhất là đi quân/hiệu ứng. Board PieceView memo so sánh dữ liệu quân/path thay reference để clock snapshot không render lại quân đứng yên; lớp chọn quân có will-change khi active, khung/kiếm intro chuẩn bị compositor và dọn khi đóng. Không đổi asset/geometry/timing/gameplay. TypeScript PASS. Chưa profile FPS/GPU trên máy gặp lỗi, không xác nhận hết giật. Backup outputs/backups/board-render-performance-20261103.
- 2026-11-03: Người nhận lời mời Mời chơi/So tài từ chủ phòng khóa được vào không nhập mật khẩu; server xác nhận inviter hiện vẫn owner khi accept. Join thường/lời mời không phải chủ vẫn kiểm mật khẩu, không gửi password client và không đổi queue/ghế. tests/challenge15/15 PASS. Backup outputs/backups/owner-invite-password-20261103. Chưa socket/browser QA, backend cần nạp mã mới.

- 2026-11-03: Phone portrait native manifest + web best-effort hook. Chưa thiết bị/APK QA.
- 2026-11-03: Chọn địa chỉ chỉ hiển thị Việt Nam, giữ tỉnh/xã thật. Bấm Lưu địa chỉ mở xác nhận chung Hủy/Đồng ý, hiện địa chỉ và cảnh báo chỉ lưu một lần; chỉ Đồng ý gọi onSave, Hủy giữ lựa chọn. Chung laptop/mobile. TypeScript PASS; chưa browser/API QA. Backup outputs/backups/address-vn-confirm-20261103.

- 2026-11-03: Bản web thêm manifest PWA display standalone + orientation portrait và link manifest trong index. Kết hợp ScreenOrientation hook. Khóa chắc khi cài như app trên browser hỗ trợ; tab web thường không thể cưỡng chế do quyền trình duyệt. Backup outputs/backups/web-portrait-lock-20261103. Typecheck/build pending.
- 2026-11-03: Ba tab Chuỗi Chiến Thắng/Tổng Ván Chơi/Online Chuyên Cần trong catalog Danh hiệu hiện liệt kê toàn bộ danh hiệu catalog; sở hữu giữ giao diện chọn, chưa sở hữu phủ khóa qua renderer hiện hữu. Tab Tất cả và hai nhóm đầu tiếp tục chỉ hiện danh hiệu đã sở hữu. TypeScript PASS; chưa browser QA. Backup outputs/backups/locked-honor-catalog-20261103.
- 2026-11-03: Theo user, trong tùy chỉnh avatar laptop, tab Skin/Hiệu ứng giữ khung nội dung viền/nền và hiện trạng thái trống giống mobile: Chưa có skin/Chưa có hiệu ứng. Không đổi avatar/khung/tab khác. TypeScript PASS, chưa browser QA. Backup outputs/backups/skin-effect-empty-laptop-20261103.

## 2026-11-03 12:19:47 - New VPS workflow preparation

- Target: HOVANG VPS 103.153.254.184.
- File: .github/workflows/deploy.yml.
- Replaced legacy production deployment with CI-verified immutable release packaging.
- Preserved manual master SHA and successful CI checks.
- No VPS activation, MySQL migration, service restart or Git push.
- Validation: required workflow markers and git diff --check PASS.
- Backup: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-DEPLOY-WORKFLOW-20261103-121947
- Rollback: restore deploy.yml.before and AI_CHANGELOG.md.before from backup.
- Production deployment status: NOT EXECUTED.
- Pending: verify production backup, database compatibility and activation procedure.

## 2026-11-03 12:32:00 - HOVANG VPS direct release

- VPS: 103.153.254.184
- Service: cotuong-test.service
- Snapshot ID: 
- Mode: local source and dist archive; Linux npm ci on VPS
- Outcome: STOP / NOT CONFIRMED
- Git push: not executed
- MySQL migration: not executed
- Shared runtime data: not intentionally modified
- Release activator: /usr/local/sbin/cotuong-deploy-activate
- Report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-RELEASE-20261103-123030\REPORT.txt
- Remote log: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-RELEASE-20261103-123030\SSH.log

## 2026-11-03 12:34:56 - HOVANG ZIP VPS deploy

- VPS: 103.153.254.184
- SSH user: cotuong_deploy
- Snapshot: 
- Result: FAILED / NOT CONFIRMED
- Previous release: 13cc451f8549ffcb64754a760d22eb19df11ab7a
- Packaging: Windows .NET ZipArchive
- MySQL migration: not executed
- Previous release and shared data: not intentionally removed
- Report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-ZIP-DEPLOY-20261103-123456\REPORT.txt
- Remote execution log: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-ZIP-DEPLOY-20261103-123456\REMOTE.txt

## 2026-11-03 12:41:37 - HOVANG VPS release V3
- Target: 103.153.254.184
- Release: 7588c5553e5037b6578dff1c1d774cdda929fd46
- Result: PASS
- Packaging: explicit production allowlist
- Previous release: 13cc451f8549ffcb64754a760d22eb19df11ab7a
- MySQL migration: not executed
- Remote activation: cotuong-deploy-activate
- Report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-DEPLOY-V3-20261103-124115\REPORT.txt
- Remote log: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-DEPLOY-V3-20261103-124115\REMOTE.txt

## 2026-11-03 12:57:43 - Google VPS V3
- VPS: 103.153.254.184
- Scope: GOOGLE_CLIENT_ID in service environment.
- SSH: interactive sudo; no password stored.
- Outcome: STOP / NOT CONFIRMED
- MySQL: unchanged by this batch.
- Remote configuration backup: printed in VPS output.
- Report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG_GOOGLE_FIX_V3.txt

## 2026-11-03 12:58:04 - Android home shortcut V2
- Fixed existing manifest compatibility (missing icons property allowed).
- Added Android Chrome Add to Home Screen invitation.
- Uses native browser install prompt when available; otherwise shows Chrome menu instructions.
- Seven-day dismissal cooldown; standalone mode excluded.
- Existing manifest properties and icons preserved except display set to standalone.
- Generated placeholder H icons: 2.
- Files: index.html, public/hovang-home-shortcut.js, manifest and any missing icons.
- JS syntax PASS; typecheck PASS; build PASS.
- Android browser/device QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\android-shortcut-v2-20261103-125608
- VPS/MySQL: UNCHANGED.

## 2026-11-03 13:00:34 - Google VPS V4
- Target: 103.153.254.184
- Scope: GOOGLE_CLIENT_ID, /etc/cotuong/cotuong-qa.env
- Fix: wait for HTTP health before Google nonce test
- Result: PASS
- MySQL migration: not executed
- Git: unchanged
- Backup and rollback: see terminal transcript
- Report: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-GOOGLE-V4-20261103-130024.txt

## 2026-11-03 13:14:57 - Apply official HOVANG logo to PWA icons
- Selected logo file manually from Windows picker.
- Selected logo: C:\Users\NHAT HOANG\Downloads\Ảnh ChatGPT 13_11_51 3 thg 11, 2026.png
- Replaced temporary placeholder icons with official logo.
- Files updated: public/icons/hovang-shortcut-192.png, public/icons/hovang-shortcut-512.png
- Preserved existing manifest and Android add-to-home invitation logic.
- Typecheck: PASS
- Build: PASS
- Dist icon verification: PASS
- Android visual QA: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\pwa-logo-apply-20261103-131300
- VPS deployment: NOT DONE

## 2026-11-03 13:28:38 - Chrome native PWA promotion
- Removed the custom Android Add to Home Screen dialog.
- Removed script reference from index.html.
- Removed public/hovang-home-shortcut.js from active project.
- Preserved manifest and official HOVANG icons 192/512.
- Browser controls whether and when native install promotion appears.
- Native prompt timing cannot be forced at the loading screen.
- Typecheck PASS; build PASS; dist verification PASS.
- Android HTTPS browser QA PENDING.
- VPS / MySQL NOT TOUCHED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\pwa-native-chrome-20261103-132650

## 2026-11-03 13:58:05 - AdSense policy fix V3

- Goal: remove global AdSense loading from game screens pending policy review.
- Modified: index.html, tests/adsHomeIntegration.test.ts.
- Verification: google-adsense-account meta retained.
- H5 commercial flag: unchanged, disabled.
- Rewarded ads, game logic, payment: unchanged.
- Typecheck: PASS.
- Targeted ads tests: PASS.
- Production build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ads-policy-v3-20261103-135404
- Rollback: restore both files from backup.
- VPS deployment: NOT performed.
- Google policy approval: NOT confirmed.

## 2026-11-03 - Official PWA production deployed: PASS
- Frontend dist deployed through existing activator; previous release 7588c5553e5037b6578dff1c1d774cdda929fd46 retained; active 0ffcc17feb69ee6d1d9d0de10676c661e27f55c5.
- Typecheck PASS; 459 ZIP files verified locally/Linux; 11,908 non-dist entries unchanged. HTTPS health/manifest/icon hashes PASS independently from VPS and Windows. No database/backend/config changes. Rollback not required.
- Existing dist used; actual Android install QA not performed. Report: D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-deploy-20261103-135717\REPORT.md


## 20261103-140427 - Kiểm tra trước deploy AdSense (chưa deploy)
- Xác minh local index.html, dist/index.html, public/ads.txt, 5 trang tĩnh và PWA manifest/icons. dist/ads.txt đang thiếu.
- Không triển khai do host/account/path/service trong yêu cầu xung đột trực tiếp với AGENTS.md, DEPLOY-USER.md và guard trong deploy-vps.sh. Không có thay đổi remote.
- Chi tiết: D:\Học\code\code games\Cờ Tướng\board-game\outputs\adsense-deploy-20261103-140427/REPORT.md.

## 2026-11-03 14:11 - AdSense deploy tiếp tục (đã dừng an toàn)
- Xác minh lại dist/ads.txt: tồn tại, khớp byte-for-byte/SHA-256 với public/ads.txt. Báo cáo cũ kết luận thiếu file là sai; không thấy lỗi cấu hình build nên không sửa source.
- VPS read-only: cotuong-test.service active; current trỏ release 0ffcc17feb69ee6d1d9d0de10676c661e27f55c5; release không đọc được bởi nhat_hoang theo quyền hiện có. Public HTTP/AdSense/PWA checks PASS.
- Chưa deploy/backup: phiên sudo -v chờ người dùng nhập trực tiếp nhưng không nhận input; chưa chạy lệnh thay đổi. Không chạm backend/DB/Nginx/service.
- Báo cáo: outputs/adsense-deploy-20261103-141144/REPORT.md.

## 20261103-141832 - AdSense V3 production verified
HTTPS SHA-256 của index, ads.txt, 5 trang nội dung, manifest và 2 icons khớp local. Health ok/service active. V3 đã hiện diện trong release 0ffcc17feb69ee6d1d9d0de10676c661e27f55c5; không cần deploy mới, không thay remote/backup/rollback. Report: outputs/adsense-deploy-20261103-141832/REPORT.md.

## 2026-11-03 - Chrome Android loading install invitation: LOCAL/PRODUCTION PASS
- Added LoadingInstallInvitation + loadingInstall controller: white/Material card, explicit HOVANG disclosure, actual beforeinstallprompt gate, synchronous click prompt, seven-day defer, standalone/installed exclusion. UI ends with loading; restore errors take precedence. Manifest/logo unchanged.
- Backup/report: D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-loading-20261103-141945\REPORT.md. Tests 16/16 PASS; full typecheck/build PASS. Browser fixture at 360/390/430px PASS; real Android native install QA NOT TESTED.
- Frontend-only release 5316513562c2ab653ba349edddaf99edda561e97 activated; previous 0ffcc17feb69ee6d1d9d0de10676c661e27f55c5 retained. 11,908 non-dist entries identical. HTTPS health/manifest/icons/entry JS+CSS hashes PASS from VPS and Windows. Rollback not required. No backend/MySQL/config changes.


2026-11-03 Fairy VPS repair PASS: user installed official pinned Linux Xiangqi NNUE binary through guarded sudo script. Independent HTTPS ready + level10 legal move + health PASS, service active, no restart. Current changed externally to 1b9865e04412ef4dbe5406303879b79d4fcbb69d and API remains working. Report: outputs/fairy-vps-fix-20261103/REPORT.md. Future deployments must retain Linux engine; no deployment pipeline changes here.

## 2026-11-03 - Installed Android PWA immersive fullscreen: LOCAL/PRODUCTION PASS
- Android selects a new fullscreen manifest via early head bootstrap; existing desktop manifest stays byte-identical/standalone. Same id/start_url/scope/icons. Android viewport-fit=contain protects cutout-safe viewport without changing locked geometry. Normal tabs do not auto-enter Fullscreen API.
- Loading invitation recognizes fullscreen installed mode; invitation design/policy, login/game/backend unchanged. Tests27/27PASS, full typecheck/buildEXIT0, actual replay UI browserQA390x844 and reduced safe viewport360x744/430x876PASS. Real Android/OEM/system-bar/swipe/native-login QA NOT TESTED.
- Active release1b9865e04412ef4dbe5406303879b79d4fcbb69d; previous5316513562c2ab653ba349edddaf99edda561e97 retained.461ZIP files verified,11909non-dist entries identical, HTTPS/health/all changed asset hashesPASS from VPS+Windows; rollback not required. No backend/DB/Nginx/sudoers changes.
- Existing Android installs may require reinstall because Android manifest URL changed; do not clear Chrome site data. Full instructions docs/PWA-IMMERSIVE.md. Report/backups: D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-immersive-20261103-142638\REPORT.md


## 2026-11-03 - Loading/PWA/Home transition gate: LOCAL/PRODUCTION PASS
- Fixed EntryGate ignoring visible invitation/native prompt: readiness can finish in background but Loading remains until Later or Chrome prompt settles. Later keeps7daydefer; direct click prompt, one-shot event, errors/unmount/late completions handled; no event/installed/desktop bypass. Auth routing unchanged.
- Existing invitation UI/logo, both manifests and Android fullscreen bootstrap unchanged. No backend/DB/Nginx/sudoers/gameplay edits.39/39testsPASS; fulltypecheck/buildEXIT0; preserved-asset and scoped patch checksPASS.
- Active3a54ffce210ae53e292e57d589cf0f1513222851; previous1b9865e04412ef4dbe5406303879b79d4fcbb69d retained.461ZIP entries verified;11909non-dist entries identical. HTTPS/health/PWA+JS+CSS hashesPASS from VPS+Windows. Rollback NOT REQUIRED; Android real device/native promptQA NOT TESTED.
- Docs/PWA-ENTRY-FLOW.md; report/backups D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-entry-gate-20261103-143847\REPORT.md


## 2026-11-03 - Website shortcut invitation replaces native PWA installation: PASS
- ChromeAndroid browser Loading now offers a HOVANG Material website shortcut. Allow opens manual Chrome menu guide only; close resumes entry. Later defers7days. No nativeprompt/userChoice/WebAPK request, fake shortcut/download or claimed success. Gate preserves background initialization/auth routing.
- Android manifest displayfullscreen->browser; same metadata/icons retained. Desktop manifest, officialicons and pushworker byte-identical. Prior PWA entry/fullscreen docs marked superseded; WEBSITE-SHORTCUT.md is current.
- Tests32/32PASS; typecheck/fullbuildEXIT0; browserfixture360/390PASS. ActualAndroid menu/iconcreationQA NOT TESTED. Activee93561fded2c9dbd23575e021c77f2a24eb392b3; old3a54ffce210ae53e292e57d589cf0f1513222851 retained;11909non-dist entries identical. HTTPS/health/icon/manifest/worker/JS/CSS hashesPASS from VPS+Windows. Rollback not needed; no backend/DB/Nginx edits.
- Chrome controls manual menu choices; shortcut-only creation and oldWebAPK conversion cannot be guaranteed. Report/backups D:\Học\code\code games\Cờ Tướng\board-game\outputs\website-shortcut-20261103-144924\REPORT.md


## 2026-11-03 15:31:55 - Shortcut invitation choice once
- Added public/hovang-shortcut-choice-once.js.
- Updated index.html to load the choice handler.
- Either De sau or Cho phep records a permanent browser-local decision.
- Existing invitation automatically dismisses on subsequent visits.
- No seven-day expiry in the new decision record.
- Does not claim shortcut installation success.
- Node syntax check: PASS.
- Typecheck: PASS.
- Build: PASS.
- Dist verification: PASS.
- Android browser behavior: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\shortcut-choice-once-20261103-152948.
- VPS / MySQL: NOT TOUCHED.

## 2026-11-03 15:42:57 - Room log throttling

- Scope: server/controllers/roomController.ts
- Change: limit repeated generic persistence logs to once per 5 seconds.
- Baseline failed tests: 6
- Patched failed tests: 6
- New failures: 0
- Typecheck: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\room-log-fix-20261103-154247\backup
- VPS deployment: NOT PERFORMED
- Runtime confirmation: NOT VERIFIED


## 2026-11-03 - Căn giữa bảng nhận thưởng local
- HomeRewardNotifications.tsx: bỏ offset desktop translate-y5dvh để dialog nằm giữa viewport; mobile đã grid center.
- Backup: outputs/backups/reward-center-20261103/HomeRewardNotifications.tsx.
- Kiểm tra source: offset gỡ đúng một nơi; chưa QA trình duyệt. Không build/deploy VPS.

## 2026-11-03 - Publish current source to GitHub
- Branch codex/publish-local-20261103, draft PR#33; source/assets/docs included, local reports/backups/credentials/build products excluded.
- Retained upstream operational safeguards, normalized Git line endings, declared build dependency sharp, synchronized room test fixtures with current rules.
- Typecheck/lint/build PASS. Full suite 872 PASS/66 FAIL/41 SKIP; subsequent room/popup35/35 PASS. Full suite not green; VPS not activated.
- Report: outputs/github-publish-20261103/REPORT.md.

## 20261103-202416 - Country picker fix
- File: src\features\lobby\components\VietnamAddressPicker.tsx
- Change: Restore Thailand to the selectable country list.
- Targeted test: PASS.
- Typecheck: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\HOVANG-COUNTRY-FIX-20261103-202416\VietnamAddressPicker.tsx.bak
- Scope: LOCAL only. GitHub/VPS unchanged.


## 20261103-203855 - Fairy migration V6
- Replaced legacy Pikafish runtime calls with Fairy-Stockfish.
- Disabled Pikafish API and server service registration.
- Typecheck, Fairy tests, build: PASS.
- Backup: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V6-20261103-203855\backup
- Legacy tests and files not yet removed. Full test suite not yet run.
- LOCAL only; GitHub and VPS unchanged.


- 2026-11-03 20:51:12: FAIRY V8 hint test fix: hint test API mock and five-argument assertion migrated. Typecheck, targeted tests, build PASS. Backup: C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V8-20261103-204910\pikafish-hint.test.tsx.bak

- 2026-11-03T20:59:57 V9 timing fix R2: FAILED/ROLLED BACK; target tests/computer.test.tsx; backup C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-TIMING-R2-20261103-205957\computer.test.tsx.backup; report C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-TIMING-R2-20261103-205957\REPORT.txt

- 2026-11-03T21:00:51 V9 timing fix R3: FAILED/ROLLED BACK; target tests/computer.test.tsx; backup C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-TIMING-R3-20261103-210050\computer.test.tsx.backup; report C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-TIMING-R3-20261103-210050\REPORT.txt

- 2026-11-03T21:06:41 FAIRY V9 ONEPASS: PASS. Target tests/computer.test.tsx. Backup C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-ONEPASS-20261103-210437\computer.test.tsx.bak. Report C:\Users\NHAT HOANG\Downloads\HOVANG-FAIRY-V9-ONEPASS-20261103-210437\REPORT.txt. LOCAL only.

2026-11-03 Fairy V10.1 investigation: PlayerInfoCard guarded fonts.ready and migrated tests/ui.test.tsx Fairy mocks. Entry fixture tweak did not resolve 25/25 lazy-route failures; restored ui.test.tsx from task backup to avoid retaining ineffective fixture changes. Retained optional ready guard. Status NOT PASS; no build/other suites completed.

## 2026-11-03 — HOVANG FAIRY V10–V13 local audit
- Updated `tests/ui.test.tsx` to settle React.lazy route imports inside `act`, align stale dialog/profile assertions with current UI, and mock Fairy API/engine state. UI regression: 25/25 PASS.
- Migrated relevant test paths to Fairy: repetition hint API spy, custom-position direct service, and the Fairy HTTP route check. Added a persisted `pikafish` engine alias regression asserting calls route through Fairy.
- Expanded gated Fairy integration checks across levels 1/6/7/10, cancellation, legal moves, 240-ply Red/Black play and Black-side custom FEN. Real local engine tests passed.
- Audited Pikafish references. Removed unused client service `src/services/pikafish.ts` after repository-wide reference check and backup. Kept old server adapter/tests isolated, the `pikafish` persisted enum alias, old player-name matching, UI hint identifiers and all Pikafish engine assets/license for compatibility/history.
- Added a JSDOM `ResizeObserver` fixture in `tests/setup.ts`; ranking-view setup now passes. The shop-page test still has an unrelated stale width expectation.
- Validation: targeted Fairy/UI group 7 files, 61/61 PASS (including real Fairy executable with `RUN_FAIRY_STOCKFISH_TESTS=1`); TypeScript PASS; production build PASS. Full Vitest: 876 PASS, 63 FAIL, 41 skipped; therefore master task status NOT PASS. Failures include loopback/network-denied HTTP/socket tests and unrelated stale UI/server assertions; details in `outputs/reports/HOVANG-FAIRY-V10-V13-FINAL-REPORT.md`.
- Backups before edits: `outputs/backups/fairy-v10-v13-20261103-213118/` and earlier V10.1 backup `outputs/backups/fairy-v10.1-20261103-212500/`. LOCAL only; no VPS, GitHub or production DB changes.

## 2026-11-03 — HOVANG V14 full test recovery
- Investigated all 63 failures from the V10–V13 full Vitest report. 32 assertions were HTTP/Socket loopback failures from the restricted sandbox; the remaining 31 came from stale test fixtures/expectations and readiness behavior conflicting with the current canonical readiness policy.
- Fixed the root cause in `server/services/roomService.ts`: countdowns require queued viewers; one Ready with a queue starts after 20 seconds (first 5 seconds hidden), both Ready starts immediately, and queue changes reset the countdown. Updated readiness docs and stale test fixtures/assertions without deleting tests or weakening assertions. Fairy/Pikafish legacy compatibility remains intact.
- Regression: full Vitest 939 passed, 0 failed, 41 skipped (unchanged); Fairy/UI suite 61/61; initial 15-suite repair group 100/100; readiness-focused 31/31; TypeScript PASS; production build exit 0. HTTP/socket integration passed with local loopback enabled. Build retains the existing non-failing large-chunk warning.
- Source snapshots and pre-build `dist` backup: `outputs/backups/fairy-v14-20261103-222105/`. Full report: `outputs/reports/HOVANG-V14-FULL-TEST-REPORT.md`.
- LOCAL only. No VPS, GitHub, production database, or Pikafish binary/license changes.

## 2026-11-03 — HOVANG V15 production deploy preflight (BLOCKED)
- LOCAL revalidation: full Vitest 939 passed/0 failed/41 skipped; Fairy/UI 61/61; typecheck PASS; production build PASS (exit 0). Pre-build dist and test artifacts are backed up at `outputs/backups/fairy-v15-20261103-2322/`.
- SSH alias `cotuong-codex` authenticated to the DNS-resolved site host 103.153.254.184 after the user loaded the configured key in SSH Agent. Read-only audit: Ubuntu 24.04.3 x86_64, 4 CPU, ~3.8 GiB RAM, 55 GiB free. `nginx` and `mysql` are active; `cotuong-test.service` is active on 127.0.0.1:3001 and `cotuong.service` is inactive. Nginx routes `hovanggame.com` to port 3001. Public GET `/api/health` returned 200 and `/api/fairy-stockfish/ready` returned `{"ready":true}`.
- Deployment blocked: account `cotuong_codex` has no sudo and cannot traverse/read the active release, production environment, web root or protected backup paths. Existing deploy script targets `/home/nhat_hoang/co-tuong/board-game`, `/var/www/cotuong`, `cotuong_deploy` and `cotuong.service`, so it does not match the observed active `/srv/cotuong/current` + `cotuong-test.service` route. No production backup, upload, restart, database operation or config change was performed. Full report: `outputs/reports/HOVANG-V15-PRODUCTION-DEPLOYMENT-REPORT.md`.

## 2026-11-04 — VPS schema repair
- Operator executed the prepared backup/repair script: checksum OK, scratch restore PASS, backup `/var/backups/hovang-schema-20261104T021202Z`. Applied six pending steps from 018–020; canonical schema verification PASS.
- Post-repair direct SSH verification: cotuong-test.service active, health API status ok, Fairy readiness true. Journal is not readable by the Codex SSH account; room/challenge user interaction still needs confirmation. No service restart or database restore performed.

- 2026-11-04: Removed Thailand from VietnamAddressPicker selectable countries; only VN remains. Existing stored country data is retained. TypeScript + production build PASS. Prepared guarded frontend-only VPS patch at outputs/remove-thailand-20261104; uploaded to admin home, activation awaits interactive sudo. No production change claimed yet.
- 2026-11-04 activation confirmed: operator COUNTRY_FRONTEND_PASS; backup /var/backups/hovang-country-20261104T022045Z. Independent HTTPS verification loaded /assets/index-BPsh77k_.js, SHA256 93D246425B2153A4CCCBE4E0B5950D245BB36598F46485DD0D31C884BB9C3833 matches local build; VN-only filter present and VN/TH filter absent. Backend health ok. Production frontend PASS; browser interaction not manually exercised.

- 2026-11-04: Clear group chat retains the active group in conversations even when no messages remain after the member clear boundary. Added group exception to list filter; message read boundary and membership checks remain in force. Local focused security/image-access tests 16/16 and TypeScript PASS. VPS guarded source patch uploaded; activation pending sudo. Backup/local scripts outputs/group-clear-20261104.
- VPS activation confirmed by operator GROUP_CLEAR_PATCH_PASS; backup /var/backups/hovang-group-clear-20261104T022517Z. Independent SSH post-check: service active, public HTTPS health ok, Fairy ready true. Initial two connection refusals were during startup and subsequent health checks passed. Authenticated clear/reload group interaction still awaits user confirmation.

- 2026-11-04: Android Zalo screenshot shows enlarged text overflowing Home dock; user reports whole-game issue. Added early Android in-app/WebView scoped text-size-adjust:none compatibility script, included by index.html; no component geometry/font sizes changed. UA checks 4/4, TypeScript and build PASS. Actual Zalo phone effect NOT VERIFIED; runtime WebView textZoom may require additional diagnosis if issue persists. Prepared VPS frontend index/script patch with backup and rollback; uploaded, sudo activation pending. outputs/zalo-layout-20261104.
- VPS activation confirmed: ZALO_LAYOUT_PATCH_PASS; backup /var/backups/hovang-zalo-layout-20261104T040134Z. Independent HTTPS verification: index includes compatibility script; live script SHA256 1E5593035254152A6B8A39DD7E2B1ABDF38AF3B582DA951742DEDBF774767319 matches LOCAL; health ok. Actual Android Zalo appearance remains awaiting user confirmation.
- 2026-11-04 Zalo device measurements: actual game root font 32px, 3.6cqw dock label 27.648px at width384 (expected13.824px), effective text-size-adjust100% despite v1 stylesheet script loaded. V1 NOT FIXED on device. V2 applies inline important text-size-adjust:none once per existing/new element in Android in-app browsers; checks initial and dynamically inserted nodes, excludes normal Chrome. JS syntax/behavior checks PASS; deployed phone result not yet verified. Cache-busted script reference ?v=2; backup-enabled VPS activation pending.
- Zalo V2 activation confirmed by operator; backup /var/backups/hovang-zalo-v2-20261104T042413Z. Independent HTTPS index/script hash checks PASS and health ok. Actual device typography remains NOT VERIFIED pending repeat measurements.

- 2026-11-04 Zalo V3: Real-device trials prove none/100% keep font doubled, while 50% yields root16px, dock13.824px and fixed probe16px. Replaced ineffective V2 none with adaptive percentage compensation measured from a hidden fixed16px, 100%-adjusted probe. Recalibrates on load/resize/content insertion; new DOM inherits correction through inline important properties. Compensates enlargement only, defaults100%, excludes ordinary Chrome/iPhone. Five simulated UA/scaling cases incl dynamic insertion/resize PASS; JS syntax and full build/typecheck PASS exit0. Uploaded backup/checksum/rollback deployment script; production activation pending sudo. outputs/zalo-v3-20261104.
- Zalo V3 activated: operator ZALO_V3_DEPLOY_PASS; backup /var/backups/hovang-zalo-v3-20261104T044216Z. Independent HTTPS verification: index uses ?v=3, script SHA256 matches local, health ok. Actual phone appearance pending user confirmation.

### 2026-11-04 12:34:18 - Zalo V4
- Scope: production in-app layout script.
- Preserved V3 text sizing; added Android Zalo-only dock padding cap.
- JS syntax and remote HTTP checks: PASS.
- Browser visual QA: PENDING.
- Local deployment workspace: D:\Học\code\code games\Cờ Tướng\board-game\outputs\zalo-v4-20261104-123402
- Remote backup and rollback paths: printed by deploy script.


### 2026-11-04 12:44:20 - WebView V5
- Scope: production mobile Home dock.
- Preserved V4 script and existing text scaling.
- Added browser-independent mobile dock safe-area cap.
- JS syntax: PASS.
- Production HTTP checks: PASS.
- Manual browser verification: PENDING.
- Database and backend: NOT TOUCHED.
- LOCAL source files: NOT CHANGED.
- Deployment workspace: D:\Học\code\code games\Cờ Tướng\board-game\outputs\zalo-facebook-v5-20261104-124412
- VPS rollback command: printed during deployment.


## 2026-11-04 — Practice AI1–6 and no-opponent fallback
- Implemented project-owned legal-move practice AI1–6 with increasing material/position search budgets, cooperative cancellation and concurrency cap; native Fairy remains at7–10. Setup no longer requires a native readiness check for1–6. Legacy Pikafish data names and engine assets/license retained.
- Xiangqi quick play falls back to an unlisted local Ông Hoàng level6 match when no opponent is available; available opponents and network-error behavior are preserved. Added persistent ×-dismissed notice and sessionStorage-backed checkbox reset by explicit login/logout. Match clock starts only after dismissal; non-suppressed rematches show the notice again.
- Validation: full Vitest956 passed/0 failed/41 skipped; native/practice tests17/17; TypeScript/build PASS. Chrome laptop/mobile browser checks PASS, including geometry, opponent display, clock pause, close and suppression. Corrected stale country tests left from prior Vietnam-only request; no country application changes.
- Backups/artifacts: outputs/practice-ai-20261104/. VPS package uploaded with guarded source/index/compat checks, backup, rollback, stage/native/HTTP smoke checks, and active-match stop. Activation awaits user sudo; no VPS deployment success claimed. Live ZaloV5 extension discovered during baseline comparison and preserved by merging only compiled asset references into live index.

- 2026-11-04 update: user changed no-opponent fallback from Ông Hoàng level6 to level7. Updated helper, notice wording and tests; levels1–6 remain project AI and7–10 remain native Fairy. Current targeted UI/quick-play/notice group33/33 PASS. VPS baseline still pre-deploy; rebuilding the staged package before activation.
- Level7 final update: targeted33/33 and build/typecheck PASS; regenerated clean release-level7 stage and uploaded package. SHA256 c0de57ecff71204bfb8e10d1011a3e3d4ab5116fc60013bf02a82e1b07c00c45 matches remote. Activation still pending user sudo.

- 2026-11-04 user cancels only automatic no-opponent machine matches and notice; retains project AI1–6/native Fairy7–10 in explicit computer play. Restored the task-backed-up Home quick play, room-selection no-room handling, game start, App and entry flow; removed only newly created fallback helper/store/dialog/tests after snapshots. Related62/62 PASS. Verified VPS compiled frontend still pre-feature, and replaced the old pending hovang-practice-deploy.sh with a CANCELLED guard. A separate AI-levels-only package is being prepared.

### 2026-11-04 19:20:54 - Name frame V2 LOCAL
- Home: name width follows content, constrained by available space.
- Game: nameplate width follows content with min/max limits.
- Mobile fullName sizing preserved.
- TypeScript, targeted Vitest and build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\NAME-FRAME-V2-20261104-191905
- VPS: untouched.
- Visual QA: pending user confirmation.


### 2026-11-04 19:42:10 - Board UI V1 LOCAL
- PlayerCard.tsx: center the nameplate in the player identity area.
- Board.tsx: remove the HOVANG text overlay at board center.
- Preserve adaptive nameplate sizing and board background.
- TypeScript, Vitest, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\BOARD-UI-V1-20261104-193635
- VPS: NOT TOUCHED.
- Visual QA: PENDING.


### 2026-11-04 19:56:22 - Player name center V3
- File: src/features/game/components/PlayerCard.tsx
- Center mobileHeader nameplate using 50% positioning and -50% translation.
- Preserve adaptive nameplate width and existing Elo/avatar layout.
- No changes to Board.tsx, Home, game logic, or VPS.
- TSC, Vitest, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\PLAYER-NAME-CENTER-V3-20261104-195053\PlayerCard.tsx
- Visual QA: PENDING.


### 2026-11-04 20:34:39 - Player Center V4
- Removed V3 horizontal displacement from nameplate.
- Centered mobileHeader identity children on a common horizontal axis.
- Centered mobileHeader Elo frame.
- Preserved nameplate auto sizing, avatar, badge, and vertical spacing.
- File: src\features\game\components\PlayerCard.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\PLAYER-CENTER-V4-20261104-202854\PlayerCard.tsx
- TSC, Vitest, build: PASS.
- Visual QA: PENDING.
- VPS: NOT TOUCHED.


### 2026-11-04 20:44:47 - Player Center V5
- PlayerCard.tsx: center the full nameplate using a full-width flex row.
- Center the Elo frame on compact layouts.
- Remove previous nameplate positioning rules.
- Preserve adaptive nameplate sizing and other player UI.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\PLAYER-CENTER-V5-20261104-203455\PlayerCard.tsx
- TypeScript, Vitest, build: PASS.
- Visual QA: PENDING.
- VPS: NOT TOUCHED.


### 2026-11-04 20:53:25 - Name auto width V6
- File: src/features/game/components/PlayerNameplate.tsx
- Name frame width follows content with minimum and maximum limits.
- Mobile fullName frame also supports adaptive width.
- PlayerCard.tsx and Elo centering unchanged.
- TSC, Vitest, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\NAME-AUTO-V6-20261104-204318\PlayerNameplate.tsx
- VPS: NOT TOUCHED.
- Visual QA: PENDING.


## 2026-11-04 - Khung tên ván đấu co theo tên (LOCAL)
- Sửa PlayerNameplate thêm fitContent, bật riêng PlayerCard: bỏ min-width90, đệm ngang12/180 theo scale, max-width100% vùng tên. Giữ avatar và consumer ngoài bàn đấu.
- Backup: outputs/backups/nameplate-fit-20261104 (trạng thái local trước sửa).
- Kiểm chứng: player-card-identity 6/6 PASS; TypeScript và Vite PASS. Chưa browser QA; bước tối ưu ảnh sau Vite đang chạy.
- Không push/deploy.

## 2026-11-04 - Đính chính tên đầy đủ/padding5px (LOCAL)
- PlayerNameplate fitContent: nowrap, shrink-0, max-width none, padding ngang5px; bỏ truncate cho PlayerCard cả laptop/mobile. Consumer khác giữ nguyên.
- Backup: outputs/backups/nameplate-full-5px-20261104.
- Kiểm chứng: player-card-identity6/6 PASS, typecheck PASS, npx vite build PASS (dist cập nhật); chưa browser QA. Không chạy lại postbuild tối ưu ảnh cho thay đổi CSS này. Không push/deploy.

## 2026-11-04 - Thẻ tên bàn đấu giống Home (LOCAL)
- PlayerCard dùng token180 desktop (cao38/chữ24), compact cao27/chữ17 cùng Home. Giữ PlayerNameplate artwork/font/màu, tên đầy đủ/padding5px.
- Backup outputs/backups/nameplate-home-style-20261104. Không sửa avatar hoặc Home.
- player-card-identity6/6 PASS; typecheck PASS. Chưa browser QA; Vite build được ghi trong backup/vite-build.log.

## 2026-11-04 - Khoảng cách chữ/khung tên giống Home (LOCAL)
- Thay padding5px bằng cùng tỷ lệ Home: desktop24/180 theo token, mobile17px; bỏ padding dọc2px riêng fullName để căn giữa giống Home. Giữ đầy đủ tên/co chiều rộng, không sửa Home/avatar.
- Backup outputs/backups/nameplate-home-padding-20261104. Typecheck PASS; chưa browser QA.

## 2026-11-04 - Hoàn tác thử thẻ tên giống Home
- Theo user khôi phục cỡ chữ/khung PlayerCard trước thử Home (token170 desktop/clamp mobileHeader); padding5px và hiện đầy đủ tên giữ như bản trước thử.
- Hoàn tác đúng hunk tên, giữ thay đổi local khác. Backup outputs/backups/nameplate-undo-home-20261104.
- Typecheck/Vite build PASS, dist cập nhật; chưa browser QA. Không push/deploy.

## 2026-11-04 - Padding tên bàn đấu10px
- Theo user tăng riêng fitContent padding ngang5→10px mỗi bên; giữ cỡ chữ/khung và tên đầy đủ. Home/avatar giữ nguyên.
- Backup outputs/backups/nameplate-padding10-20261104. Vite build PASS, dist cập nhật; chưa browser QA. Không push/deploy.

## 2026-11-04 - Padding tên bàn đấu20px
- Theo user tăng thêm10px: fitContent padding10→20px mỗi bên. Giữ chữ/chiều cao/tên đầy đủ và các consumer ngoài bàn đấu.
- Backup outputs/backups/nameplate-padding20-20261104. Vite build PASS, dist cập nhật; chưa browser QA. Không push/deploy.

## 2026-11-04 - Chuẩn bị deploy khung tên20px
- Gói nguồn allowlist2file tại outputs/nameplate-vps-20261104/nameplate-source.tar.gz. Chưa dùng dist local vì có nhiều thay đổi khác và chưa đối chiếu live.
- SSH deploy user bị từ chối publickey; chưa upload/activate/restart hoặc thay đổi VPS. Đang chờ quyết định tài khoản từ user.

## 2026-11-04 - Tên tự đặt tối đa1 ký tự in hoa
- playerRenameError dùng chung UI/ProfileRenameDialog, UserService và AccountService. Đếm Unicode Lu sau NFC; cho phép0–1, chặn>=2 với thông báo rõ trước ghi DB/quyền đổi tên. Giữ length/mẫu khách/quyền liên kết một lần.
- Tên cũ/Guest vẫn join/restore bình thường; không cập nhật dữ liệu tài khoản. Không đổi layout/avatar.
- Backup outputs/backups/rename-uppercase-20261104. Tests3suite33/33 PASS (Unicode/NFC/UI/backend/no-write/compat), typecheck PASS, Vite build PASS/dist cập nhật; chưa browser QA. Chưa deploy VPS.
- Rollback: phục hồi4file production từ backup; bỏ regression mới nếu hoàn tác toàn bộ quy tắc.

## 2026-11-04 - Gói deploy tên20px/1chữhoa đã đối chiếu VPS
- Live snapshot từ /srv/cotuong/releases/hovang-v15-20261104-010148 khớp6file trước sửa; diff chỉ tên/centering và rename validator.
- Gói6file SHA256 4e3e5477dc8a4888c268e8f0d224b272bcaa341dbad786350e6b4cb114841db6, đã upload cùng script /home/cotuong_codex/name-changes-deploy-20261104.sh. Chờ user nhat_hoang chạy sudo, chưa activation.
- Script guard source/index/hash, active matches/disk/lock, backup bytes verified, tsc/build/smoke, giữ live custom scripts, asset mới trong namespace riêng name-changes-20261104, restart+health/public asset verification, rollback source/index khi lỗi. Không migrate hay ghi tài khoản.
- Bash syntax VPS PASS; fixture local backup/hashes/HTML merge/versioned assets/Python syntax PASS. Test app33/33 và typecheck/build đã PASS ở task trước; production UI chưa QA.

## 2026-11-04 - Sửa chặn deploy do VPS thiếu RoomPasswordDialog
- V1 rollback do thiếu source dependency. Script v2 thêm duy nhất RoomPasswordDialog từ local (hash132bd533d4df08c68498ce695ff8cc8fa08dc0f7c5799108d233af2558401e52), kiểm tra các asset/type/helper trước sửa, giữ6source chính và guard nguyên trạng.
- Script v2 /home/cotuong_codex/name-changes-deploy-v2-20261104.sh đã upload; rollback bao gồm xóa file hỗ trợ nếu mới thêm. Tsc/build lỗi được in tự động. Chưa kích hoạt v2; source local không thay trong lượt này.

## 2026-11-04 - Deploy tên v3 sửa quyền asset
- V2 rollback an toàn sau lỗi quyền thư mục asset; health public200/service active đã kiểm lại.
- V3 thêm chmod0755 root asset namespace mới name-changes-v3-20261104 và runuser runtime kiểm toàn bộ cây asset trước kích hoạt. Giữ backup/guard/tsc/build/smoke/rollback, không chỉnh Nginx/quyền cả release.
- Fixture6hash/backup/HTML merge PASS; script upload /home/cotuong_codex/name-changes-deploy-v3-20261104.sh. Chưa kích hoạt v3.

## 2026-11-04 - Name changes VPS activation PASS
- User chạy sudo name-changes-deploy-v3-20261104.sh: BACKUP_VERIFIED, RENAME_SMOKE_PASS, LIVE_CUSTOM_SCRIPTS_PRESERVED, RUNTIME_ASSETS_READABLE, PUBLIC_ASSETS_PASS, DEPLOY_PASS.
- Backup /var/backups/hovang-name-changes-20261104-y0XBvh; namespace name-changes-v3-20261104. Hai thay đổi tên20px/tối đa1chữhoa được kích hoạt, bổ sung source RoomPasswordDialog thiếu để build. Không migrate/ghi dữ liệu user.
- Visual/authenticated rename QA pending.

## 2026-11-04 - Chuẩn bị hotfix build Google config
- Lỗi do script deploy frontend thiếu build env, không phải Google Cloud. Đã so sánh bundle trước/sau, thiếu publicClientID ở bản mới.
- /home/cotuong_codex/google-build-fix-20261104.sh: backup index, hash guard, nạp runtime env an toàn, verify clientID khớp baseline/backend, build namespace mới, giữ live custom scripts/name source, chmod/runtime-readable, verify publicID/asset/health rồi mới PASS; rollback index nếu lỗi. Không restart/migrate/dữ liệu user.
- Fixture HTML/Python syntax PASS, bash syntax VPS PASS; chờ user sudo kích hoạt và Google popup QA thật.

## 2026-11-04 - Google hotfix v2 đúng effective EnvironmentFiles
- V1 chặn an toàn vì file cấu hình gốc không chứaID. V2 dùng /etc/cotuong/cotuong-qa.env đã xác nhận từ systemctl show, thêm guard đường dẫn hiệu lực. Giữ assert khớp backend/frontend/baseline, backup/rollback và không restart.
- Fixture HTML/Python và Bash syntax PASS; đã upload /home/cotuong_codex/google-build-fix-v2-20261104.sh; chờ user kích hoạt.

## 2026-11-04 - Thông báo chào mừng HOVANG (LOCAL xem thử)
- Thêm WelcomeAnnouncement qua portal/NoticeOverlay và mount App khi Home. Bảng giữa viewport nâu/vàng, giữ nội dung user,2link Facebook/Zalo mở tab mới, X/Đã hiểu/Escape; nội dung cuộn trên màn nhỏ.
- Hiện mỗi vòng đời App, đóng không lặp khi chuyển màn/về Home; reload hiện lại. Chưa chốt lưu trạng thái lâu dài. Không đổi Home/avatar/backend hoặc VPS.
- Backup outputs/backups/welcome-announcement-20261104/App.tsx. Rollback: phục hồi App.tsx và bỏ component mới.
- Tests4/4 PASS, typecheck PASS, Vite build PASS/dist cập nhật. Chưa browser/thiết bị QA; không tuyên bố đã kiểm trực quan.

## 2026-11-04 - Đổi link Facebook thông báo local
- href/chữ hiển thị WelcomeAnnouncement đổi sang https://www.facebook.com/share/1cMN4XZVtX/, cập nhật assertion test và ghi nhớ. Zalo/lifecycle/style giữ.
- Backup outputs/backups/welcome-facebook-link-20261104. Test4/4 PASS; Vite build cập nhật dist theo log backup. Không deploy VPS.

## 2026-11-04 - Thông báo local theo artwork user
- WelcomeAnnouncement dùng đúng PNG mẫu1205x1305 user cung cấp, giữ bố cục/tiêu đề/text artwork. X và2nút cộng đồng là button/anchor HTML overlay khớp vị trí trong ảnh, URLẩn và mởtabmới. Fit viewport giữ tỷ lệ, portal/native modal, lifecycle giữ.
- Asset/source.md ghi nguồn. Backup outputs/backups/welcome-reference-design-20261104 (component/test trước sửa). Không thay app routes/backend/Home/avatar; không deploy.
- Test3/3 PASS (href đúng/URLẩn/đóng/lifecycle/Escape), typecheck PASS, Vite build PASS/dist cập nhật. Screenshot browser chưa xác nhận; Chrome không tạo PNG trong môi trường. Preview harness outputs/welcome-reference-preview-20261104 dùng component thật, không đóng vai trang app mới.

## 2026-11-04 - Home name bằng2Elo/board name min140 + chuẩn bị deploy welcome
- PlayerNameplate thêm fixedWidth opt-in cho Home desktop/mobile, cùng widthtoken với cụm2Elo; fitContent tối thiểu140px và padding20 giữtênđầyđủ. Không đổi font/height/avatar/layoutngoài yêucầu.
- Backup outputs/backups/welcome-home-name-20261104.10/10 test3suite PASS, typecheck PASS,Vite build PASS.
- Gói6filefrontend (App,WelcomeAnnouncement,artwork,PlayerNameplate,2Home), hash678a6f413b0e4fef5c1a98e3e781b9dc1957bcb38f8db17a46848bc050bbecf3. Không backend/migration/restart.
- Script /home/cotuong_codex/welcome-name-deploy-20261104.sh: normalized source/index driftguards, backupverified/rollbackexisting+newfiles, tsc/build từeffectiveqaenv, verifyGoogle/link/artwork, giữcustomscripts, namespaceassets riêng+runtimepermissions. Local sourcebackup/HTMLmerge/Python/Node syntax fixture PASS,Bash syntaxVPS PASS. Chờ user sudo activation. BrowserQA chưa xác nhận.

## 2026-11-04 - Giảm nameplate bàn đấu mobile xuốngmin120
- PlayerNameplate fitContent thêm compact:min-w120, desktopmin140giữ; không đổiHomeElo/height/font/avatar.
- Backup outputs/backups/name-mobile120-20261104.10/10test3suite vàVitebuildPASS.
- VPSbảnwelcome đãkíchhoạt (HTMLhash02a74795e2000b174af68dc96515bcca01246b63399a288ee1554ebba415a2da). Gói1source hash925562d14ff2a5ccac07115ffc11eab3da5ee0a5f9c046d262d90a0bfa869c89 và script /home/cotuong_codex/name-mobile120-deploy-20261104.sh đãupload, chờsudo kíchhoạt. Fixturebackup/HTML/Python/Node syntax vàBashsyntaxPASS; giữGoogleconfig/assetpermissions/rollback, khôngrestart.

## 2026-11-04 - Mobile in-match name min100px
- compact:min-w120→100 riêng fitContent. Backup outputs/backups/name-mobile100-20261104. Player-card6/6,VitebuildPASS; sourcebackup/HTMLmerge/Python+Node fixturePASS.
- Public vẫn bảnwelcome,120 chưaactivate. Gói100hash1bf7bc9302c90e687b2dfc32f88a79c35a45173bd6aaea5dba91b927e8a6d5ea + /home/cotuong_codex/name-mobile100-deploy-20261104.sh đãupload/chờsudo; thaybản120, giữGoogle/rollback/khôngrestart.

## 2026-11-05 - Giảm cập nhật toàn giao diện khi nhận snapshot online
- App subscribe phase thay nguyênroom; store.receiveRoom chia sẻ reference nhánhJSONlive và bỏACKtrùng. Helper mới src/lib/roomSnapshot.ts không deepwalkarchive. Không đổi layout/clock/luật/server.
- Regression banđầu3/4FAIL tái hiện cậpnhậtthừa. Sau sửa22/22test8suitePASS gồmroute shellkhôngrerender qua move/tick/ACK vàendphasevẫnupdate,animations/leave/result/store;typecheck/VitebuildPASS,distcậpnhật.
- Backup outputs/backups/online-render-stability-20261105. Chưa browser/GPUQA hoặcdeployVPS; user cầnthửlạihiệntượng thực tế.

## 2026-11-05 - Xuống bàn không chớp mờ khi tự đi quân
- Chỉ RoomStandUpButton trong RoomUsersPanel.tsx: disabled:opacity60→100. Pending vẫndisable/chặnclick, giữảnh140x43/scale/vịtrí vàluậtxuốngbàn. Áp dụngchungpanel/footer.
- Reprocomputedopacity2testFAILtrướcsửa (1→0.6);13/13 room-users-panel/stand-upPASSsau sửa gồmgiữDOM/opacity vàdisabledchặnthao tác. Typecheck/VitebuildPASS,distcậpnhật.
- Backup outputs/backups/stand-up-opacity-20261105 (source/test trước sửa). Chưa browserQA/chưaVPS. Rollback khôi phụcRoomUsersPanel.tsx từbackup.

## 2026-11-05 - Chuẩn bị deploy sửa nháy Xuống bàn
- Chốtpublicbaseline name-mobile100 hash1dbd10f2a9fbb467698e2a7b9a1b828042f0286723e604f2356ae3d7061399ec,serviceactive/healthok,qaenvhiệulực.
- Gói1fileRoomUsersPanel thayduynhất opacitydisabled củaRoomStandUpButton60→100; queue giữ60. KhôngbaoApp/store/roomSnapshotlocal khác. Hashacb81ab5e253e17c6aab372f1ced44cca37825113bbc718f96a68931917794af.
- Upload /home/cotuong_codex/stand-up-stable-deploy-20261105.sh +release. Giữbackup/rollback,source/indexguards,tsc/build từqaenv/Googleverify,runtimeassetpermissions/publicart/linksverify. Khôngrestart/migrate.
-13/13testPASS,VitebuildPASS,fixturebackup/HTML/Python/NodePASS,BashsyntaxVPSPASS. Chờusernhat_hoangsudoactivation,chưađánh dấuđãdeploy.

## 2026-11-05 - Khôi phục đủ2ghế đếm30s
- updateReadyWait bỏqueuegate/ẩn10s/nhánh1Ready20s; pairwait chỉgiữpair+since, đủ2ghếphaseReadyhiện30ngay,tựstartcanStarttại30s.2Readyvẫnstartngay;ready/queuetogglekhôngreset. GiữfinishedrematchACK/rotation/energy/clock/luậtkhác.
- Update3readinessregressiontheochínhsáchmới,thêm two-seat-countdown4test(noqueue/bànkhóa/1ghế/viewerqueue/đổicặp),helperUI2ghếthấy/viewerẩn giữcodechung.
-75/75test10suitePASS,typecheckPASS,VitebuildPASS/distcậpnhật; chưa browser/socket2thiếtbịQA hoặcdeployVPS. Backendlocalcầnnạpmãmới đểhiệulực.
- Backup outputs/backups/two-seat-countdown-20261105 (roomService+3tests). Rollback phục hồitừbackup vàbỏtestnew nếuhoàntáctoànbộquytắc; không hoàn tác thayđổi localkhác.

## 2026-11-05 - Chờ1s sau ghế thứhai rồi đếm30s
- updateReadyWait phaseReady trừ1s settling trước elapsedcountdown:ẩntrước1000ms,hiện30ở1000ms,startở31000ms nếucanStart.2Readygiữngay;finishedrematchkhôngđổi.
- Backup outputs/backups/countdown-one-second-20261105 (server+4tests trước sửa).75/75test10suitePASS gồm999/1000/30999/31000ms,queue/viewer/newpair/locked/ready. Local,chưaVPS.

### 2026-11-05 09:11:02 - Elo and clock separation (LOCAL)
- File: src/features/game/components/PlayerCard.tsx
- Elo remains visible during and after matches; desktop clock positioned below Elo with spacing.
- Build: PASS; TypeScript: PASS. Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\HOVANG-ELO-CLOCK-20261105-090907\PlayerCard.tsx
- Rollback: Copy-Item -LiteralPath 'D:\Học\code\code games\Cờ Tướng\board-game\backups\HOVANG-ELO-CLOCK-20261105-090907\PlayerCard.tsx' -Destination 'D:\Học\code\code games\Cờ Tướng\board-game\src\features\game\components\PlayerCard.tsx' -Force


- 2026-11-05 09:25:26 LOCAL V4: centered desktop clock beneath Elo; typecheck/build exit codes 0; backup D:\Học\code\code games\Cờ Tướng\board-game\.hovang-backups\center-clock-v4-20261105-092332\PlayerCard.tsx; browser QA pending; VPS untouched.

## 20261105-175633 - Cờ Úp không hoàn tác (LOCAL)
- UI: ẩn nút Đi lại trong Cờ Úp, giữ Xin thua.
- Client/store: chặn yêu cầu và thao tác hoàn tác Cờ Úp.
- Server: từ chối request-takeback/reply-takeback cho jieqi.
- Chỉ sửa 5 file game; không thay Google Client ID/OAuth/.env/VPS/database.
- Build PASS; targeted tests PASS; full suite compared against baseline (see report). Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\covered-no-takeback-20261105-175633

- 2026-11-05 18:10:33 LOCAL: Can giua nut Xin thua desktop trong MatchActions.tsx. Build PASS. Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\center-resign-20261105-180854. Khong sua Google Client ID, OAuth, env, database, VPS.

- 2026-11-05 18:44:15 LOCAL ReplayControls.tsx: Restyled red/black machine toggles; centered two 105px analysis/reset artwork buttons with original layout size. Build PASS. Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-ui-20261105-184230\ReplayControls.tsx. VPS/auth untouched. Visual QA pending.

- 2026-11-05 18:54:11 LOCAL Replay UI V3: bottom artwork buttons 105px to 76px centered; compact side controls one row without visual labels. Build PASS; visual QA pending. Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-ui-v3-20261105-185224\ReplayControls.tsx. Auth/VPS untouched.

- 2026-11-05 18:59:16 Replay mobile V4: bottom artwork buttons compact width 76px to 66px; compact top margin 10px to 4px. Desktop unchanged. Build PASS. Visual QA pending. Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-mobile-v4-20261105-185725\ReplayControls.tsx. VPS/auth untouched.

- 2026-11-05 19:01:44 LOCAL: Them chon Co Tuong / Co Up trong CreateRoomForm.tsx; truyen variant qua useLobby.ts. Build va targeted tests PASS. Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\create-room-variant-20261105-185951. Khong sua OAuth, Google Client ID, env, database, VPS.

- 2026-11-05 19:45:39 Replay laptop V5: laptop artwork buttons 76px to 70px, laptop side labels 14px to 17px. Mobile 66px/buttons and hidden labels unchanged. Build PASS; visual QA pending. Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-laptop-v5-20261105-194336\ReplayControls.tsx.

- 2026-11-05 19:55:53 LOCAL: RoomSelection V3 - tabs Co Tuong/Co Up below room search, moved existing room filters below tabs, filtered visible rooms by variant. Shared room-code search unchanged. Build and targeted tests PASS. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\room-tabs-v3-20261105-195401\RoomSelection.tsx.

## 2026-11-05 20:07:05 - Replay flip V6
- Changed CustomPositionPage.tsx
- Removed first-side controls from UI.
- Preserved existing change-side button.
- Changed ReplayControls.tsx
- Added third equal-width flip button.
- Changed GamePage.tsx
- Added replay-only board orientation state.
- Build: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-flip-v6-20261105-200510
- Visual QA: PENDING


- 2026-11-05 20:23:31 LOCAL tabs design V4: redesigned Xiangqi/Jieqi tabs in RoomSelection and CreateRoomForm; restored room filters to footer; reduced province/create/quick-play heights to 58px desktop and 44px compact. Build and targeted tests PASS. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\tabs-design-v4-20261105-202127. Visual QA pending.

## 2026-11-05 21:16:48 - ReplayControls change-side button restyle
- File: src\features\game\components\ReplayControls.tsx
- Muc tieu:
  - Lam lai nut Doi ben de dong bo hon voi 2 nut Phan tich / Hoan tac
  - Giu nguyen chuc nang onFlipBoard
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-change-side-style-20261105-211445\ReplayControls.tsx
- Build: PASS
- Ghi chu: Chi sua giao dien nut Doi ben, khong sua logic game.

## 2026-11-05 21:25:08 - ReplayControls flip button style V7
- File: src\features\game\components\ReplayControls.tsx
- Muc tieu:
  - Tao lai nut Doi ben theo style dong bo hon voi 2 nut Phan tich / Hoan tac
  - Giu nguyen chuc nang onFlipBoard
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-flip-button-v7-20261105-212320\ReplayControls.tsx
- Build: PASS
- Ghi chu: Chi sua UI nut Doi ben.

## 2026-11-05 21:57:05 - Flip artwork V9
- Replaced CSS flip button with PNG artwork.
- Kept original onFlipBoard handler.
- Source: src/features/game/components/ReplayControls.tsx
- Asset: src/assets/history/controls-flip-v1.png
- Artwork smoke: PASS
- Typecheck: PASS
- Vite: PASS
- UI baseline: previously failed; not claimed PASS.
- Full WebP build: not run.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\flip-artwork-v9-20261105-215647
- Visual QA: pending.

## 2026-11-05 22:01:32 - Flip button size fix
- File: src\features\game\components\ReplayControls.tsx
- Muc tieu:
  - Thu nho nut Doi ben de kich thuoc nhin can hon voi 2 nut con lai
- Thay doi:
  - className cua flip button: w-full min-w-0 -> w-[92%] min-w-0 justify-self-center
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\flip-size-fix-20261105-220117\ReplayControls.tsx
- Typecheck: PASS
- Vite: PASS
- Visual QA: PENDING

- 2026-11-05 22:06:43 LOCAL V7: Reused RankingDialog original Xiangqi/Jieqi PNG tabs and selectedImageTabGlow in RoomSelection and CreateRoomForm, reduced tab dimensions. Build PASS. Visual QA pending. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\ranking-tabs-v7-20261105-220305.

- 2026-11-05 22:13:25 LOCAL V8: centered ranking-image tabs on mobile and enlarged them on desktop in RoomSelection and CreateRoomForm. Original assets and behavior preserved. Build PASS. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\ranking-tabs-v8-20261105-220938. Visual QA pending.

- 2026-11-05 22:28:57 LOCAL V11: separated Xiangqi/Jieqi room lists, province filters/counts, quick-play settings, room-code search and creation default. Compatible hook signature. Build PASS. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\variant-v11-20261105-222645. Interactive QA pending.

## 2026-11-05 22:50:30 - Huy hiệu cấp bậc Elo dùng chung hai chế độ (LOCAL)
- Mục tiêu: badge cấp bậc + sao dùng chung, tính bằng Math.max(eloXiangqi, eloJieqi), không cộng dồn; số Elo hiển thị trong trận/Xếp hạng giữ theo chế độ đang chơi.
- File sửa: src/lib/rankProgression.ts (thêm helper sharedRankElo / sharedRankEloFromStats, type VariantRating), src/pages/home/HomePage.tsx, src/pages/home/MobileHome.tsx, src/features/game/components/PlayerCard.tsx (badge dùng rankElo, hàng Elo giữ elo theo variant), src/features/game/components/MatchIntro.tsx (introPlayer thêm rankElo), src/features/lobby/components/MessagesOptionsPanel.tsx, src/features/lobby/components/ProfileDialog.tsx, server/repositories/socialRepository.ts (suggestions+list: GREATEST(COALESCE(sx.elo,1000),COALESCE(sj.elo,1000)) với 2 join user_game_stats xiangqi/jieqi).
- Giữ nguyên: 7 cấp bậc/mốc rankProgression.ts, công thức cộng/trừ Elo, Danh hiệu Đấu Trường, Xếp hạng (bố cục khóa), RoomShareCard, ChallengeNotifications, sessionStore.elo/xiangqi.
- Test mới: tests/elo-badge-sync.test.tsx 7/7 PASS (Elo cao nhất, không cộng dồn, fallback mặc định, ranh giới cấp bậc, MatchIntro giữ Elo variant, PlayerCard badge/row, ProfileDialog badge).
- Targeted tests: profile-rank-sync + rank-progression + matchIntro + match-intro-versus = PASS; player-card-identity 2/6 fail XÁC NHẬN LỖI CÓ SẴN (fail cả với PlayerCard gốc trước khi sửa, thuộc bộ 7 test fail có sẵn không liên quan Elo).
- TypeScript: PASS (exit 0).
- Build: PASS (exit 0); dist/assets/index-CR1ysF18.js build 11/05/2026 22:49, xác nhận chứa sharedRankElo; postbuild WebP chạy thành công (không gặp lỗi ENOENT của V6).
- Backup: outputs/backups/elo-rank-v7-20261105-223855 (9 file + PlayerCard.current.tsx); rollback khôi phục từng file từ đó.
- Chưa kiểm chứng: query GREATEST(...) trên MySQL thật; browser QA giao diện.
- Không sửa VPS, không đụng database người chơi, không push.

- 2026-11-06 06:48:11 LOCAL: Custom-position trial first enabled AI side determines opening turn only before any move. Replay trial and other modes unchanged. Build PASS; related tests as reported. Interactive QA pending. Backup: D:\Học\code\code games\Cờ Tướng\board-game\docs\backups\custom-first-turn-20261106-064612.

## 2026-11-06 06:52:17 - Replay side row V2
- Source: src/features/game/components/ReplayControls.tsx
- Changed machine side selector to a horizontal row.
- Hidden visible Red/Black labels.
- Preserved piece icons, switches and click handlers.
- Kept analysis, reset and flip artwork unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\side-row-v2-20261106-065207\ReplayControls.tsx
- Typecheck: PASS
- Vite: PASS
- Full npm build: NOT RUN
- UI test: NOT RUN (earlier baseline failed)
- Visual QA: PENDING

## 2026-11-06 06:57:18 - Online flicker V9 verification
- Verified existing online animation patch without modifying the hook.
- Test environment: jsdom.
- Targeted online regression tests: PASS.
- TypeScript: PASS.
- Build: PASS.
- Test backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\online-flicker-v9-20261106-065526\online-move-flicker-regression.test.tsx
- Original online source hash: F4BB4E2020FA29858667EC616EEE115AE82B26D86B085247338C1175B184BD29
- Real online visual QA: PENDING.
- VPS, database, Google Login: NOT TOUCHED.


## 2026-11-06 07:16:54 - Online marker flicker V10
- LOCAL only.
- Changed: src\features\game\components\Board.tsx
- Changed: src\pages\game\GamePage.tsx
- Added test: tests\online-last-move-flicker-v10.test.tsx
- Suppress previous move origin/destination markers while an online command is pending.
- Preserve last move markers outside the pending period.
- Computer and offline play do not enable the suppression.
- Targeted Vitest: PASS.
- TypeScript: PASS.
- Build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\online-flicker-v10-20261106-071459
- Online visual QA: PENDING.
- VPS / database / Google login: NOT TOUCHED.


## 2026-11-06 08:31:02 - Friend chat Message icon
- Files: FriendsDialog.tsx, DesktopFriendsDialog.tsx
- Reused existing assets/profile/actions/message.png.
- Kept chatButtonImage variable and existing chat handlers.
- No match-room chat changes.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\friend-message-icon-20261106-083048
- Smoke: PASS
- Typecheck: PASS
- Vite: PASS
- Full build: NOT RUN
- Visual QA: PENDING

## 2026-11-06 08:39:44 - Shared Home/Game Message icon V2
- HomeIcon.tsx: replaced old messages glyph with a speech bubble and three dots.
- Home and GameTools use the shared messages icon.
- FriendsDialog.tsx: restored original friend-chat-button.png.
- DesktopFriendsDialog.tsx: restored original friend-chat-button.png.
- Existing click handlers and unread badge logic unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\message-icon-v2-20261106-083934
- Smoke: PASS
- Typecheck: PASS
- Vite: PASS
- Full npm build: NOT RUN
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 09:09:49 - Shared message icon V3
- File: src/features/lobby/components/HomeIcon.tsx
- Increased only messages icon from size-7 to size-8.
- Replaced outlined bubble with solid fill.
- Three dots use even-odd transparent cutouts.
- Home/Game share the messages icon.
- Friends UI: NOT TOUCHED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\message-icon-v3-20261106-090939\HomeIcon.tsx
- Typecheck: PASS
- Vite: PASS
- Visual QA: PENDING.
- VPS: NOT TOUCHED.

## 2026-11-06 09:12:08 - Avatar rank stability V3
- Scope: LOCAL PlayerCard.tsx only.
- Added regression test: tests\avatar-rank-stability-v3-20261106-090958.test.tsx
- Preserve last confirmed portrait, frame, Elo, name and shared rank during temporary profile gaps.
- Do not reuse profile across different players or empty seats.
- Regression tests: PASS.
- Related online/rank tests: PASS.
- Previously passing PlayerCard identity tests: PASS.
- Two existing mobile clock tests: BASELINE FAIL before V3, not changed.
- TypeScript: PASS.
- Build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\avatar-rank-v3-20261106-090958\PlayerCard.tsx
- Actual online visual QA: PENDING.
- VPS / database / authentication: NOT TOUCHED.


## 2026-11-06 09:27:04 - Restore mobile match chat toggle icon
- File: src/pages/game/GamePage.tsx
- Replaced shared HomeIcon on the mobile chat-opening button only.
- Restored previous rectangular message icon with two lines.
- Preserved toggleMobileChat, mobileChatOpen and chat panel behavior.
- Home icon: NOT TOUCHED.
- Friends icons: NOT TOUCHED.
- Chat.tsx: NOT TOUCHED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-chat-toggle-20261106-092643\GamePage.tsx
- Verify: PASS
- Typecheck: PASS
- Vite: PASS
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 09:30:38 - Hide mobile chat toggle during room entrance
- File: src/pages/game/GamePage.tsx
- Root cause: chat toggle is portaled to document.body with z-index 350.
- Fix: do not render mobile chat toggle while entrance.entering is true.
- Chat toggle appears after room entrance finishes.
- Chat icon, click handler, panel and message functionality unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-chat-entrance-20261106-093027\GamePage.tsx
- Guard: PASS
- Typecheck: PASS
- Vite: PASS
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 09:33:29 - Desktop opponent avatar stability V5
- Changed: src\features\lobby\hooks\useDatabaseProfile.ts
- Changed: src\features\game\components\PlayerCard.tsx
- Desktop remote profiles are cached by signed-in account and player identity.
- Cached identity is available immediately after a desktop PlayerCard remount.
- Valid server responses update the cached profile.
- Mobile profile stability mode remains disabled.
- V3 PlayerCard identity cache remains present.
- Opponent regression: PASS.
- Online and rank targeted tests: PASS.
- TypeScript: PASS.
- Build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\opponent-avatar-v5-20261106-093106
- Existing 2 mobile clock baseline test failures: NOT CHANGED.
- Actual desktop opponent visual QA: PENDING.
- VPS, database, authentication: NOT TOUCHED.


## 2026-11-06 09:36:25 - Laptop chat height V2
- File: src/features/game/components/Chat.tsx
- Expanded height: 318px -> 308px (-10px).
- Collapsed height: unchanged (92px).
- Mobile compact layout: unchanged.
- Width, position, icons and chat behavior: unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\laptop-chat-height-v2-20261106-093613\Chat.tsx
- Guard: PASS
- Typecheck: PASS
- Vite: PASS
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 09:43:38 - Opponent rank badge V7
- LOCAL only.
- Modified: src\features\game\components\AvatarRankBadge.tsx
- Added regression: tests\opponent-badge-stability-v7-20261106-094121.test.tsx
- Memoized AvatarRankBadge to avoid rerendering rank artwork when props are unchanged.
- Verified that changing Elo or preview stars still rerenders the badge.
- Badge regression: PASS.
- Related rank and online tests: PASS.
- TypeScript: PASS.
- Build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\opponent-badge-v7-20261106-094121\AvatarRankBadge.tsx
- Two pre-existing mobile-clock test failures: NOT MODIFIED.
- Desktop opponent visual verification: PENDING.
- VPS / database / authentication: NOT TOUCHED.


## 2026-11-06 09:50:21 - Smooth clock turn V1
- LOCAL only.
- Modified: src\features\game\components\PlayerCard.tsx
- Desktop turn clock transition: 100ms -> 250ms.
- Mobile turn clock: 250ms transition added.
- Easing: ease-in-out.
- Animated properties: background-color, border-color, box-shadow.
- Clock values, timer logic, Elo, avatar and badge: unchanged.
- Related tests: PASS.
- Previously passing PlayerCard tests: PASS.
- TypeScript: PASS.
- Build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\clock-smooth-v1-20261106-094833\PlayerCard.tsx
- Two pre-existing mobile-clock baseline test failures: NOT CHANGED.
- Visual QA: PENDING.
- VPS / database / Google authentication: NOT TOUCHED.


## 2026-11-06 11:52:21 - Mobile View and Clock layout
- GamePage.tsx: centered mobile View at 123px.
- MobileMatchSummary.tsx: room clock moved below room code (82px within summary).
- Viewer list: opens downward, centered at viewport top 155px.
- Replay clockOnly placement: preserved.
- Desktop layout and chat: not modified.
- Clock values and View handlers: not modified.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-view-clock-20261106-115205
- Guard: PASS
- Verify: PASS
- Typecheck: PASS
- Vite: PASS
- Full npm build: NOT RUN
- Visual mobile QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 11:56:12 - Mobile clock width
- File: src/features/game/components/MobileMatchSummary.tsx
- Clock boxes: 70px -> 64px each.
- Grid: 70/16/70 -> 64/16/64.
- Clock height and font unchanged.
- Player name frames: pending source review, not changed.
- Desktop: unchanged.
- Typecheck: PASS
- Vite: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-frame-width-20261106-115601
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 11:58:06 - Mobile player name width
- File: src/features/game/components/PlayerCard.tsx
- Mobile match header nameplate: clamp(84px,26vw,108px) -> clamp(79px,24.5vw,102px).
- Nameplate text scaling adjusted proportionally.
- Both player sides: updated.
- Clock width: unchanged from previous 64px patch.
- Avatar, Elo, rank, desktop and Home: unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-name-width-20261106-115755\PlayerCard.tsx
- Guard: PASS
- Typecheck: PASS
- Vite: PASS
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 12:03:45 - Match result backdrop V1
- Scope: LOCAL only.
- Modified: src\features\game\components\MatchResultDialog.tsx
- Added a non-interactive fullscreen overlay behind the win/loss result.
- Backdrop blur: 3px.
- Dark overlay opacity: 10%.
- Result artwork, rewards, buttons, timers and result logic: unchanged.
- Source exact-change verification: PASS.
- Related tests: PASS.
- TypeScript: PASS.
- Build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\result-backdrop-v1-20261106-120113\MatchResultDialog.tsx
- Actual laptop/mobile visual QA: PENDING.
- VPS, database and authentication: NOT TOUCHED.


## 2026-11-06 12:06:36 - Temporarily hide Save Match
- File: src/pages/game/GamePage.tsx
- Changed showSaveMatch condition to false.
- Save Match button hidden on desktop and mobile during matches.
- Save Position button remains unchanged.
- Match saving logic and saved data remain unchanged.
- Re-enable by restoring the original showSaveMatch condition.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\hide-save-match-20261106-120625\GamePage.tsx
- Typecheck: PASS
- Vite: PASS
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 12:09:22 - Result dark backdrop V2
- File: src\features\game\components\MatchResultDialog.tsx
- Replaced blur 3px + black 10% with black 40% and no blur.
- Win/loss artwork, buttons, rewards and game logic unchanged.
- Related tests, TypeScript and build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\result-dark-v2-20261106-120713\MatchResultDialog.tsx
- Visual QA: PENDING.
- VPS / database: NOT TOUCHED.


## 2026-11-06 12:25:55 - Restore Save Match button
- File: src/pages/game/GamePage.tsx
- Restored the original showSaveMatch condition.
- Save Match visible again when its original conditions are met.
- Desktop and mobile supported.
- Save Position unchanged.
- Save handlers and match data unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\restore-save-match-20261106-122544\GamePage.tsx
- Typecheck: PASS
- Vite: PASS
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 13:02:12 - Mobile Home VPS parity V1
- LOCAL comparison experiment.
- Changed index.html only.
- Removed the local-only loading tag for hovang-inapp-layout.js?v=3.
- Script file itself preserved.
- VPS currently does not load this script.
- HomePage.tsx, MobileHome.tsx and menu CSS: unchanged.
- Tests (if found), TypeScript and build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\mobile-home-vps-v1-20261106-125925\index.html
- Browser visual verification: PENDING.
- Possible impact on in-app browsers: MUST BE CHECKED.
- VPS / database / Google login: NOT TOUCHED.


## 2026-11-06 13:46:13 - Jieqi Captured Pieces V1
- Files: GamePage.tsx, CapturedJieqiPieces.tsx, capturedJieqiPieces.test.ts
- Mobile: compact captured piece icon at lower left, count bottom right.
- Desktop: captured piece indicator in left-of-board player area.
- Variant: Jieqi only; Xiangqi unchanged.
- Count: missing opponent pieces out of 16, not hidden identities.
- Detailed piece-type ledger: NOT IMPLEMENTED; requires capture history.
- Takeback/resync: count derived again from current board.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-captured-v1-20261106-134600
- Typecheck: PASS
- Vitest: PASS
- Vite: PASS
- Browser QA: PENDING
- VPS: NOT TOUCHED

### 2026-11-06 13:52:26 - V7.1 recovery
- V7 source files verified against backup.
- dist restored from V7 backup and SHA256 verified.
- Previous dist preserved at: D:\Học\code\code games\Cờ Tướng\board-game\backups\V7-DIST-FAILED-20261106-135219
- Free energy feature remains pending.
- VPS and MySQL not touched.

## 2026-11-06 13:54:44 - Jieqi captured layout V2.1
- CapturedJieqiPieces.tsx: desktop top 350 -> 500px.
- Short desktop: top 285 -> 430px.
- Mobile captured icon: bottom 72 -> 56px.
- GamePage.tsx: Jieqi mobile toolbar, Back and Chat lowered by 8px.
- Xiangqi mobile bottom controls retain their previous positions.
- Capture logic and piece counts: unchanged.
- Other GameTools, clock and player components: unchanged.
- Typecheck: PASS
- Vitest: PASS
- Vite: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-capture-layout-v21-20261106-135424
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 13:58:05 - WebView Home V3.2
- LOCAL only; file changed: src\pages\home\MobileHome.tsx
- WebView bottom dock padding limited to 2cqw.
- Normal browser layout preserved.
- 7-button/dock visual structure: unchanged (six controls).
- Targeted Home tests: PASS.
- TypeScript: PASS.
- Build status: PROJECT BUILD PASS
- Existing 5 MiB optimization rule: unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\webview-home-v32-20261106-135345\MobileHome.tsx
- Facebook/Zalo visual QA: PENDING.
- VPS, database, Google login: NOT TOUCHED.


### 2026-11-06 14:11:57 - Free Energy V8.2
- LOCAL: free +1 energy modal, authenticated API and transaction.
- Energy capped at 5, with resource event ledger.
- Typecheck/build/account integration test: PASS.
- Browser and concurrency QA: PENDING.
- Paid packages and VPS untouched.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\FREE-ENERGY-V82-20261106-141128
- Report: C:\Users\NHAT HOANG\Downloads\HOVANG-FREE-ENERGY-V82-20261106-141128.txt

### 2026-11-06 14:22:38 - Reward center V1
- Changed HomeRewardNotifications dialog positioning.
- Centered reward frame with fixed viewport grid.
- Preserved reward artwork, reward items and confirmation button.
- Typecheck/build PASS; visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\REWARD-CENTER-20261106-142220

### 2026-11-06 14:24:32 - Reward center V2
- Restored original reward dialog width and sizing.
- Centered the reward wrapper without fullscreen grid.
- Preserved reward artwork, items and confirmation button.
- Typecheck/build PASS; visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\REWARD-CENTER-V2-20261106-142414

## 2026-11-06 14:25:05 - Jieqi captured privacy V2
- Captured history added to GameState; public snapshots redacted per authenticated socket.
- Recipient-specific room broadcasts and ACKs; spectator cannot inspect hidden capture identity.
- Removed persistence-only private fields from published snapshots.
- Captures grouped by capturer, face-up or concealed; private revealed face dimmed.
- Laptop own/top, opponent/bottom; mobile own/left, opponent/right.
- Tests: PASS; typecheck: PASS; Vite: PASS; visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-capture-private-v2-20261106-142442
- VPS: NOT TOUCHED.

### 2026-11-06 14:28:00 - Reward center V3
- Centered HomeRewardNotifications dialog with 50% position and translate.
- Preserved original reward frame dimensions and artwork.
- TypeScript and Vite build PASS.
- Visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\REWARD-CENTER-V3-20261106-142740

### 2026-11-06 14:31:46 - Reward center V4
- Replaced dialog transform positioning with viewport flex centering.
- Constrained reward artwork wrapper to min(92vw,70dvh).
- Typecheck/build PASS.
- Visual QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\REWARD-CENTER-V4-20261106-143135

## 2026-11-06 14:35:07 - Jieqi capture UI V3.1
- Exact V2 component anchored; mobile both capture rows positioned below board (+72px from its bottom).
- Reuse original ChessPiece artwork instead of fake glyph circles; V2 privacy and dimming maintained.
- File: src\features\game\components\CapturedJieqiPieces.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-capture-ui-v31-20261106-143455
- Typecheck: PASS; Vitest: PASS; Vite: PASS
- Browser visual QA pending. VPS unchanged.

## 2026-11-06 14:43:06 - Jieqi capture UI V3.3
- File: src/features/game/components/CapturedJieqiPieces.tsx
- Mobile captured groups centered between board bottom and bottom button row.
- Left mobile group: concealed captured pieces always appear first (left side).
- Right mobile group: concealed captured pieces always appear last (right side).
- Desktop layout unchanged.
- V2 privacy and ChessPiece rendering unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-capture-ui-v33-20261106-144254
- Typecheck: PASS
- Vitest: PASS
- Vite: PASS
- Visual QA: PENDING
- VPS: NOT TOUCHED

## 2026-11-06 14:50:34 - Jieqi capture V3.4
- Mobile left: covered, dimmed, bright, from left edge inward.
- Mobile right: covered, dimmed, bright, from right edge inward.
- Mobile right panel now aligns captured icons to the right edge.
- Desktop layout, capture data, ChessPiece artwork and privacy unchanged.
- File: src\features\game\components\CapturedJieqiPieces.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-capture-v34-20261106-145024
- Typecheck: PASS; Vitest: PASS; Vite: PASS
- Browser QA: PENDING. VPS: NOT TOUCHED.

## 2026-11-06 15:41:13 - Jieqi capture V3.5
- Input source: V3.4
- Laptop upper/lower: covered -> dimmed revealed -> bright revealed.
- Mobile left: covered first at left edge.
- Mobile right: covered first from right edge inward.
- Only the capture UI sorting and responsive row layout changed.
- Privacy, capture records and ChessPiece artwork unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-capture-v35-20261106-154026
- Typecheck: PASS; Vitest: PASS; Build: PASS
- Browser QA pending. VPS untouched.

## 2026-11-06 15:44:41 - ROOM COUNT V5
- Scope: LOCAL.
- Added RoomSummary.onlineCount.
- Eye counts connected seated players and viewers, deduplicated by identity.
- Preserved player seat state and reconnect grace.
- TYPECHECK: PASS.
- BUILD: PASS.
- SOURCE VERIFICATION: PASS.
- Multi-client runtime and realtime synchronization: NOT VERIFIED.
- Backup: C:\Users\NHAT HOANG\Downloads\HOVANG-ROOM-COUNT-V5-BACKUP-20261106-153954


## 2026-11-06 15:56:49 - Ready reseat sync V1
- After finished game, new seated pair transitions to fresh ready game and server Ready wait.
- Original rematch pair retains existing effect delay and countdown.
- Pending queue rotation, playing and one-seat rooms are untouched.
- Files: server/services/roomService.ts; src/lib/roomReadiness.ts; tests/readyReseatSync.test.ts
- Typecheck: PASS; Ready tests: PASS; Vite: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ready-reseat-sync-20261106-155626
- Browser/online QA: PENDING; VPS: UNCHANGED

## 2026-11-06 16:11:37 - Ready viewer countdown V2
- Viewer sees server readyCountdown during ready/finished if 2 seats; use match.viewer at line 159 rather than later-declared isRoomViewer, without Ready/start action.
- Viewer uses same ready decrement audio event as seated players; no independent clock or server mutation.
- Files: src/pages/game/GamePage.tsx; src/lib/roomReadiness.ts; tests/readyViewerCountdown.test.ts
- Typecheck: PASS; Tests: PASS; Build: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ready-viewer-countdown-v2-20261106-161105
- Browser audio QA pending; browsers may block sound until user interacts. VPS unchanged.

## 2026-11-06 16:16:28 - Ready Viewer shared UI V3
- Remove separate old-style viewer countdown overlay.
- Viewer uses existing Board Ready display with server countdown.
- Viewer Start action disabled; tick sound path unchanged.
- File: src/pages/game/GamePage.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ready-viewer-shared-ui-v3-20261106-161615
- Typecheck: PASS; Tests: PASS; Build: PASS
- Visual QA pending. VPS not touched.

## 2026-11-06 16:32:11 - Room realtime V6.3.2
- LOCAL only; VPS unchanged.
- Typed rooms:changed event.
- Lobby listens for server changes and reconnect.
- Server compares connected identities before broadcasting.
- Room selection and grid use onlineCount for occupied filtering.
- Grid sorting uses onlineCount.
- 5-second polling preserved.
- Typecheck, focused tests, build: PASS.
- Existing V5 baseline failures tracked separately.
- Browser QA: PENDING.
- Backup: C:\Users\NHAT HOANG\Downloads\HOVANG-V632-20261106-163014-BACKUP


## 2026-11-06 17:54:20 - Energy UI V5
- Fixed V4 invalid JSX parentheses in GamePage showStart.
- Restored GameEnergyControl if missing.
- Hid online Ready during first 5 seconds after server result timestamp.
- Existing RoomService and server seating rules unchanged.
- UI tests, typecheck, build PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\energy-ui-v5-20261106-175217
- Server Ready rejection / energy demotion / notice delivery: PENDING.
- Real multiplayer visual QA: PENDING.
- VPS, DB, payment, auth: NOT TOUCHED.


## 2026-11-06 18:11:59 - Energy watch-ad placeholder V2
- LOCAL only. File: src\features\lobby\components\EnergyDialog.tsx
- Removed FreeEnergyPanel and direct /api/account/free-energy call from EnergyDialog.
- The XEM action now opens a single message: Quang cao chua duoc tich hop (Vietnamese shown in UI).
- Mobile offer text no longer promises +1 energy. Two paid products and checkout code unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\energy-ad-not-integrated-v2-20261106-181146
- Typecheck: PASS; Vitest: PASS; Build: PASS
- Focused energy, ad and payment tests PASS; full suite from V1 had 8 failures across unrelated room, player-card and UI files (not waived). Browser QA pending; VPS untouched.

## 2026-11-06 18:28:32 - Energy ads shared one-choice UI V3.3
- File: src\features\lobby\components\EnergyDialog.tsx
- The XEM placeholder uses ./OneChoiceNoticeStyles, exactly the same style module referenced by HomePage; TypeScript checks exports.
- Message: Quảng cáo chưa được tích hợp; one action: Đã hiểu.
- No ad reward/API call; payment packages and checkout unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\energy-ad-one-choice-v33-20261106-182820
- Typecheck: PASS; Focused Vitest: PASS; Build: PASS
- Full suite not rerun (V1 had 8 failures not confirmed as baseline). Browser QA pending. VPS untouched.

## 2026-11-06 18:29:42 - Keep Seat V3
- LOCAL only.
- Added Keep Seat to locked-room settings, default OFF.
- Eligible owner remains seated after win/loss/draw when enabled.
- Waiting eligible player replaces opponent.
- Preserved existing behavior when feature is OFF.
- Backward compatible room-settings: keepOwnerSeat optional.
- Legacy command preserves current keepOwnerSeat value.
- Invalid setting values rejected.
- Five-second postmatch guard retained.
- Targeted tests, TypeScript and build PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\keep-seat-v3-20261106-182740
- Real multiplayer UI verification: PENDING.
- VPS, payment, Google auth, database: NOT TOUCHED.


## 2026-11-06 18:40:57 - Energy ad notice screenshot V3.4.1
- File: src\features\lobby\components\EnergyDialog.tsx
- Changed only ad-not-integrated notice appearance to match user's screenshot: centered brown box, dark backdrop, single gold 'Đóng' button.
- Removed incompatible oneChoiceNoticeStyles import; message and no-reward behavior unchanged.
- Payment packages and API unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\energy-ad-notice-screenshot-v341-20261106-184043
- Typecheck: PASS; focused Vitest: PASS; Vite build: PASS
- Visual QA pending; VPS untouched.

## 2026-11-06 18:41:39 - Moderation Playing Guard V1
- LOCAL only.
- Blocked owner kick, demote and promote while game.phase is playing.
- Server rejects all three commands before mutating room state.
- Client disables related actions and confirmation while playing.
- Mute/unmute still permitted.
- After game ends, existing moderation rules preserved.
- Keep Seat V3, GamePage and energy button unchanged.
- Targeted tests, TypeScript, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\moderation-playing-guard-v1-20261106-183934
- Real multiplayer QA: PENDING.
- VPS, database, payment, Google authentication: NOT TOUCHED.


## 2026-11-06 18:47:44 - Viewer Ready V1
- LOCAL only.
- Modified GamePage.tsx: showStart now excludes isRoomViewer.
- Viewer Ready countdown remains connected and visible when active.
- Seated-player Ready logic unchanged.
- Five-second postmatch grace preserved.
- Board, server, GameEnergyControl: unchanged and hash verified.
- Tests, typecheck, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\viewer-ready-v1-20261106-184546
- Browser visual QA: PENDING.
- VPS, payment, authentication, database: NOT TOUCHED.


## 2026-11-06 18:53:48 - Energy So tai notice V3.5
- Reused actual oneChoiceNoticePanel and oneChoiceNoticeButton from ProfileDialog/OneChoiceNoticeStyles.
- Advertisement notice text: Quang cao chua duoc tich hop (Vietnamese shown in UI).
- Same brown notice panel and yellow Dong button; no custom recreation of those styles.
- Only EnergyDialog notice component/import and a dedicated test modified.
- Energy reward API not invoked. Payment packages unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\energy-so-tai-notice-v35-20261106-185332
- Typecheck: PASS; Vitest: PASS; Build: PASS
- Browser QA pending. VPS untouched.

## 20261106-185458 - QUEUE BLOCKED V2
- LOCAL only.
- Changed: server/services/roomService.ts
- Preserve seated players when queueBlocked.
- Prevent automatic energy demotion and queue rotation.
- Validate both players' energy before Ready.
- Preserve keepOwnerSeat.
- Typecheck/build/targeted server tests: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\backups\HOVANG-QUEUE-BLOCKED-V2-20261106-185458
- Client timing and real multiplayer QA: PENDING.

## 2026-11-06 19:50:25 - Game energy hover/hold tooltip V2
- Files: src\features\game\components\GameEnergyControl.tsx; tests/game-energy-recovery-tooltip.test.ts
- Desktop: hover for current recovery countdown; mobile: hold >=450 ms, release to hide; tap still opens EnergyDialog.
- Browser timer typed as number | null to fix TS2322 (window.setTimeout vs NodeJS.Timeout). Same energy recovery timestamp and 420s fallback as EnergyNotice. No resource/account/ads changes.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\game-energy-recovery-tooltip-v2-20261106-195012
- Typecheck: PASS; focused Vitest: PASS; Build: PASS
- Browser QA pending; VPS unchanged.

## 2026-11-06 21:07:54 - Finish Time V5
- LOCAL only.
- Queue captured at match finish, before postmatch delay.
- Three-second timer starts at match finish, not result ACK.
- Late queue members wait for next completed match.
- Ready no longer blocked by postmatch late queue.
- Locked-room Keep Seat owner stays seated even at zero energy.
- Existing energy rules remain active for other seated players.
- Legacy energy and Keep Seat tests use updated 3-second boundaries.
- Targeted tests, typecheck and build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\finish-time-v5-20261106-210550
- Browser/multiplayer QA: PENDING.
- VPS, payment, Google authentication, database: NOT TOUCHED.


## 2026-11-06 21:24:49 - Ready Preserve V7
- LOCAL only.
- Preserve 30-second Ready countdown deadline when first player clicks Ready.
- Timer continues from its existing value, not from 30 seconds.
- Both players Ready still start immediately when eligible.
- Remove exact small explanatory paragraph under Keep Seat.
- Keep Seat label, toggle and server behavior unchanged.
- V5 queue snapshot and 3-second deadline preserved.
- Targeted tests, typecheck, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\ready-preserve-v7-20261106-212246
- Multiplayer UI QA: PENDING.
- VPS, auth, payment, database: NOT TOUCHED.


## 2026-11-06 22:18:54 - Mobile in-game chat send preserves focus V1
- Modified Chat.tsx: exclude send button from mobile pointer blur, prevent send button stealing focused input, preserve focus on form submission.
- Kept game chat container and backend send logic unchanged. Desktop unaffected by mobile predicate.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-chat-keyboard-preserve-v1-20261106-221838
- Typecheck: PASS; targeted Vitest: PASS; build: PASS
- Browser keyboard testing on real mobile device pending; VPS not touched.

## 2026-11-06 22:51:21 - Repair Tests V4
- LOCAL only: updated four outdated regression test files.
- Ready countdown tests follow 3000ms from match finish.
- Late queue remains waiting until another finished match.
- Home dialog tests distinguish separate welcome notices.
- Production game source unchanged.
- Targeted tests, typecheck, build: PASS.
- Build checked through actual process exit code.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\repair-tests-v4-20261106-224832
- Full suite: still pending.
- VPS: NOT TOUCHED.


## 2026-11-06 23:44:15 - Full Repair V9
- LOCAL only; VPS untouched.
- RoomService seat rotation no longer waits for presentation ACK + 2s.
- Seat rotation uses match finish + 3000ms.
- Finish-time queue snapshot preserved.
- Keep Seat, queue blocking and energy policy preserved.
- Updated seven regression test files.
- Socket test verifies replacement without A/B presentation ACK.
- Targeted tests, full test suite, typecheck, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\full-repair-v9-20261106-233438


## 2026-11-07 07:16:47 - VPS Fairy Xiangqi NNUE V3
- Replaced only Linux Fairy binary with official XQ embedded-NNUE release after UCI/NNUE test.
- Verified service remained active; no restart. Browser QA pending.
- Report: C:\Users\NHAT HOANG\OneDrive\Desktop\HOVANG-FAIRY-NNUE-VPS-V3-20261107-071633.txt

## 2026-11-07 10:40:27 - Home quick-play province/room priority V3
- Changed: src/lib/quickRoom.ts; src/features/lobby/hooks/useHome.ts; tests/quick-room-priority-v3.test.ts
- Home Dau co priority: public one-player same province > public other provinces > locked without password and one player > create empty room.
- No password bypass. Other room-selection flow, server, VPS, Google login and payment unchanged.
- Guard: PASS; Typecheck: PASS; Vitest: PASS; Build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\auto-join-room-v3-20261107-104014
- Browser gameplay QA pending.

## 2026-11-07 12:46:14 - Custom Position First Turn V2
- Added independent first move selection: human/computer, regardless of red/black.
- Modified: src/features/game/hooks/usePositionEditor.ts; src/pages/computer/CustomPositionPage.tsx
- Test: tests/custom-position-first-mover-v2.test.ts
- Guard: PASS; Typecheck: PASS; Vitest: PASS; Build: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-first-mover-v2-20261107-124559
- Local UI/browser QA pending. VPS and auto-join unchanged.

- 2026-11-07 13:12:13 Room Bot7 V2 LOCAL: independent room practice component, five-second offer, no server changes. Automated checks PASS. Manual browser QA pending. Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\room-bot7-v2-20261107-130534.

## 2026-11-07 13:15:50 - Custom first piece sets side V5
- No separate first-turn controls; Red/Black buttons still flip the position editor board.
- CustomPositionPage first active turn can be Red or Black on first selection.
- First selected piece sets both currentTurn and humanSide before calling local.select; ordinary alternating human/AI turns are unchanged after a move.
- Illegal starting positions for the chosen side are blocked by positionError.
- Modified: usePositionEditor.ts, CustomPositionPage.tsx, useGame.ts, existing V2 test, legacy editor test (one obsolete assertion) and V5 regression test.
- Guard: PASS; Typecheck: PASS; Vitest: PASS; Build: PASS. Browser QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-free-first-move-v5-20261107-131533; VPS, server, auto-join V3 untouched.

### 2026-11-07 13:22:00 - Facebook notice V3
- Source: src\app\WelcomeAnnouncement.tsx
- Old: https://www.facebook.com/share/1cMN4XZVtX/
- New: https://www.facebook.com/share/1GheyTB5rm/
- Build method: temporary ASCII SUBST path
- Baseline build: PASS
- Patched build: PASS
- Dist link verification: PASS
- Zalo link: UNCHANGED
- Full test suite: NOT RUN
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\facebook-v3-20261107-131756
- VPS: NOT DEPLOYED


## 2026-11-07 13:40:44 - Custom free first move V7
- Root cause: GamePage selects trial.select for custom position, not useGame.select; V5 patched the wrong handler. V6 tests used Node environment instead of jsdom.
- Updated: useReplayTrial.ts; selects either Red or Black on the opening click only for custom-position-trial; machine assigned opposite side.
- Board-flip/orientation controls untouched, online and replay untouched.
- Test: custom-position-free-first-move-v7.test.tsx; Typecheck: PASS, Vitest: PASS, Build: PASS; browser QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-free-first-move-v7-20261107-134014; VPS untouched.

- 2026-11-07 13:43:06: Room Bot7 V4 LOCAL. Reused existing room board slot; removed second floating board; updated stale Facebook test expectation to approved URL. Tests, typecheck, build PASS. Browser QA pending. VPS unchanged. Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\bot7-inline-v4-20261107-133128.

## 2026-11-07 14:06:04 - Custom Position V8
- Scope: LOCAL hook + game presentation + regression test only.
- Opening piece controls player's side and board orientation; automatically enable opposite-side AI after first move animation.
- Replay, online, room matching, editor flip button, VPS untouched.
- Guard=PASS Typecheck=PASS Vitest=PASS Build=PASS; Browser QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-first-move-v8-20261107-140542

- 2026-11-07 14:12:25: Removed room Bot7 invitation and inline practice on user request. Original online board restored. Standalone computer mode, Facebook link, Elo, energy and queue preserved. Tests/typecheck/build PASS. Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\remove-room-bot7-v3-20261107-140622. VPS unchanged.

## 2026-11-07 14:28:16 - V11 custom first move
- Board orientation only changes by explicit Flip action.
- AI OFF by default; manual toggle for each side only.
- Updated obsolete V7/V8 test expectations.
- Guard=PASS; Typecheck=PASS; Vitest=PASS; Build=PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-first-move-v11-20261107-142615
- Browser QA pending. VPS untouched.

## 2026-11-07 15:37:04 - V13 custom first move
- Scope: custom first-move color selection only.
- Removed humanSide mutation and openingSide UI overrides.
- Removed automatic flip reset triggered by choosing a piece.
- Preserved player labels, manual flip and manual AI controls.
- Updated obsolete V7/V8 assertions.
- Guard=PASS; Typecheck=PASS; Targeted=PASS; FullTests=PASS; Build=PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-first-move-v13-20261107-153233
- Browser QA pending. VPS untouched.

## 20261107-154831 - PikaJieQi V21.4
- Scope: LOCAL only.
- Added: src\services\pikaJieqi.ts, tests\pikaJieqi.test.ts, public/jieqi engine assets.
- Public FEN excludes concealed identities.
- Unknown captured identities cause explicit rejection.
- Typecheck, targeted Vitest, full Vitest and build: PASS.
- Browser gameplay QA: PENDING.
- AI gameplay activation: NOT ENABLED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-v21-4-20261107-154831
- VPS: NOT TOUCHED.

## 20261107-164648 - V21.5A.3 Computer setup layout
- Desktop frame height increased from 625px to 650px.
- Desktop tabs repositioned and compensated for layout.scale.
- Level grid top 300px, row gap 20px.
- Side controls top 470px; action buttons top 548px.
- Training banner margin increased to 22px.
- Mobile level grid and subsequent controls shifted down 12px.
- RoomSelection and RankingDialog unchanged.
- Automated checks PASS; browser QA pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-layout-v21-5a3-20261107-164648
- VPS not touched.

## 20261107-170003 - Rollback V21.5A.4
- Reverted desktop computer setup layout to verified V21.5A.3.
- Restored file: src/features/lobby/components/ComputerSetupDesktop.tsx
- Verified SHA256: 92587DED4B0D82D6D413953546937329F08BA4E01BA6A8F59F5D37E21C826D54
- Safety backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\rollback-v21-5a4-safety-20261107-170003
- Mobile, AI, gameplay, authentication and VPS unchanged.
- Browser QA: pending.

## 20261107-170454 - V21.5A.7 Desktop layout correction
- Baseline: verified V21.5A.3.
- Changed file: src/features/lobby/components/ComputerSetupDesktop.tsx
- Outer frame top and scale unchanged.
- Setup panel height: 650px -> 700px, extending downward.
- Variant tabs top: 236px -> 244px.
- Level grid top: 300px -> 322px; row gap: 20px -> 24px.
- Side selection top: 470px -> 505px.
- Action buttons top: 548px -> 600px.
- Training banner width unchanged: 1268px.
- Banner height: 145px, cropped without stretching.
- Desktop footer slogan removed.
- Mobile and shared tab source hashes unchanged.
- Typecheck, targeted Vitest, full Vitest, build: PASS.
- Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-layout-v21-5a7-20261107-170454
- VPS untouched.

## 20261107-171943 - Rollback V21.5A.7
- Restored laptop layout to verified V21.5A.3.
- File: src/features/lobby/components/ComputerSetupDesktop.tsx
- SHA256: 92587DED4B0D82D6D413953546937329F08BA4E01BA6A8F59F5D37E21C826D54
- Safety backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\rollback-v21-5a7-safety-20261107-171943\ComputerSetupDesktop.tsx
- Mobile, gameplay, AI, authentication and VPS unchanged.
- Browser QA: pending.

## 20261107-185000 - Jieqi vs computer V22 (OpenCode)
- Scope: LOCAL only. Enabled Cờ Úp tab in Đấu với máy: useComputerSetup starts hidden match with engine pikaJieqi (requires crossOriginIsolated), useComputer calls pikaJieqiMove(game, signal, depth=level 1..10), GamePage shows Ông Hoàng.
- COOP same-origin-allow-popups + COEP credentialless on HTML documents: vite dev server.headers and server/app.ts static/admin responses.
- Typecheck PASS; full Vitest 216 files / 1093 tests PASS (incl. new tests/computerJieqi.test.tsx 5/5); build PASS, dist has jieqi assets.
- Browser gameplay QA: PENDING. VPS: NOT TOUCHED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\outputs\backups\jieqi-enable-v1-20261107-183000

### 2026-11-07 19:14:18 - Jieqi COOP/COEP
- Scope: LOCAL Vite configuration.
- Status: PASS - PATCHED LOCAL
- File: vite.config.ts
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\jieqi-coop-coep-20261107-191357
- Verification: TypeScript, targeted Jieqi tests, Vite CLI.
- Browser QA: Pending.
- VPS: Not touched.


- 2026-11-07 21:58:43: HOVANG owner promote queue V3 LOCAL. Only displaced player from host promote is placed at queue position 1. Manual demote and automatic rotation unchanged. Targeted room tests and build PASS. Match-saving baseline=1; after=1. Full suite not rerun (prior unrelated failure). Browser QA pending. Backup=D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\host-seat-queue-v3-20261107-215359. VPS untouched.

## 20261107-223100 - Three replay control buttons V4
- Updated ReplayControls.tsx artwork imports.
- Added three matching 512x512 PNG assets:
  - controls-create-room-v4.png
  - controls-reset-v4.png
  - controls-flip-v4.png
- First button labeled Tao ban, with crossed swords.
- Reset and Flip button handlers unchanged.
- Button positions and layout classes preserved.
- Online room creation remains a placeholder.
- Typecheck, full Vitest and build: PASS.
- Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\three-buttons-v4-20261107-223100
- VPS: untouched.

## 2026-11-07 22:48:51 - Computer UI V5
- LOCAL only; VPS unchanged.
- Hide computer-mode energy, messages, share, room settings, friends and match tools.
- Preserve required onFriends callback and existing save visibility.
- Correct saved-state test to structural equality.
- Typecheck, targeted Vitest, full Vitest, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-clean-ui-v5-20261107-224321
- Browser QA: PENDING.


## 2026-11-07 22:59:03 - AI Energy V6
- File: src/pages/game/GamePage.tsx
- Hide energy in custom-position AI trial.
- Keep regular computer mode energy hidden.
- Match action buttons and online mode unchanged.
- Typecheck, Vitest, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ai-energy-v6-20261107-225306-8238
- Browser QA: PENDING.


- 2026-11-07 23:03:30: HOVANG mobile replay layout V1 LOCAL: split navigation and tools rendering, place 3 tools beside mobile avatar header with mode switch below, move navigation and machine toggles below chessboard. Desktop unchanged. Typecheck/replay tests/build PASS. Mobile browser visual QA pending. Backup=D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-replay-layout-v1-20261107-230022; VPS unchanged.

## 20261107-230006 - HOVANG three buttons HD
- Installed original high-resolution PNG assets without resizing.
- Replaced Create Room, Reset and Flip artwork imports.
- Preserved button layout, classes and click handlers.
- Online room creation still a placeholder.
- Typecheck: PASS.
- Full Vitest: PASS.
- Build: PASS.
- Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\three-buttons-hd-20261107-230006
- VPS: NOT TOUCHED.

## 2026-11-07 23:09:01 - Replay Energy V7
- File: src/pages/game/GamePage.tsx
- Hide energy in replay mode (History and Saved Matches).
- Keep computer and custom-position energy hidden.
- Preserve energy in live online matches.
- Typecheck, Vitest, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\replay-energy-v7-20261107-230255-0221
- Browser QA: PENDING.


- 2026-11-07 23:17:36: Mobile Replay Layout V3 LOCAL: upper frame contains navigation and three tools; mode button below; Red/Black machine panel centered beneath board. Added 'machine' to mobilePart TypeScript union. Desktop preserved. Typecheck, replay tests, build PASS. Visual QA pending. Backup=D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-replay-layout-v3-20261107-231447. VPS unchanged.

- 2026-11-07 23:26:18: Mobile Replay Align V4: moved mobile top controls from top 0px to top 8px to align with mobile avatar. Other controls and desktop unchanged. Typecheck, replay tests and build PASS. Visual QA pending. Backup=D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-replay-align-v4-20261107-232436. VPS untouched.

### 2026-11-07 23:40:55 - Custom Room V1.1
- Files: ReplayControls.tsx, usePositionEditor.ts
- Connected Create Table button to custom position screen.
- Back returns to game when entered through replay.
- Existing computer start behavior retained.
- TYPECHECK: PASS
- TARGETED VITEST: PASS
- FULL VITEST: PASS
- BUILD: PASS
- Browser QA: PENDING
- Online custom room: NOT IMPLEMENTED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-room-v1-1-20261107-233522-979
- VPS: NOT TOUCHED

### 2026-11-08 10:05:47 - Custom room editor border
- File: src\pages\computer\CustomPositionPage.tsx
- Removed the light inset border/shadow from the custom position frame.
- Preserved outer brown border, board, background and controls.
- Typecheck: PASS
- Vitest: PASS
- Build: PASS
- Browser visual QA: PENDING
- Online custom room: NOT IMPLEMENTED BY THIS PATCH
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-room-border-20261107-234116-935
- VPS: NOT TOUCHED

## 20261108-120822 - Finalpass V2
- File: scripts\hovang-webp-finalpass.cjs
- Retry ENOENT reads up to five attempts.
- Persistent missing files still fail the build.
- WebP quality, threshold and original images unchanged.
- Build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\finalpass-v2-20261108-120822
- VPS: NOT TOUCHED.

## 2026-11-08 12:13:19 - HISTORY ROOM V3
- Create online room from History/Saved replay position.
- Restore replay step and trial position on return.
- Files: src\store\sessionStore.ts, src\features\game\hooks\useReplayPlayback.ts, src\pages\game\GamePage.tsx, src\features\game\components\ReplayControls.tsx, src\features\game\hooks\useGame.ts
- Guard: PASS
- Typecheck: PASS
- Targeted Vitest: PASS
- Build: PASS
- Browser QA: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\history-room-v3-20261108-121053
- VPS: NOT TOUCHED


## 20261108-134316 - Custom Room Form V5
- File: src\features\lobby\components\CreateRoomForm.tsx
- Hide lock/password controls for custom rooms.
- Keep normal-room lock controls unchanged.
- Typecheck, UI test and Build: PASS.
- Full Vitest and browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-room-form-v5-20261108-134316
- VPS: NOT TOUCHED.

## 20261108-135313 - Custom Room Back V6
- Scope: src\features\game\hooks\useGame.ts
- Owner Back from custom online room returns to position trial.
- Replay/history/saved origin no longer redirects owner to replay.
- Restore original custom FEN and clear stale replay return state.
- Guest Back and normal rooms unchanged.
- Typecheck, UI test, full Vitest and Build: PASS.
- Browser QA and two-account online QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-room-back-v6-20261108-135313
- VPS: NOT TOUCHED.

- 2026-11-08: Đồng bộ nền tre ngoài theo Home cho màn Chơi với máy, Chọn bàn, Vị trí tùy chỉnh và bàn đấu: cùng độ phủ -3%/106%, brightness 0.58, blur 1px và lớp phủ gradient/radial.

## 20261108-222504 - Custom position transition V1
Status: FAILED; ROLLBACK
Scope: CustomPositionPage.tsx, App.tsx
ComputerPage.tsx: reference only
Goal: opening transition and desktop frame consistency
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-position-transition-v1-20261108-222504
VPS: untouched

## 20261108-223038 - Custom position transition V2
Status: FAILED; ROLLBACK ATTEMPTED
Files: CustomPositionPage.tsx, App.tsx
Change: opening cover and brown desktop frame
ComputerPage.tsx: unchanged
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-position-transition-v2-20261108-223038
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-TRANSITION-V2-20261108-223038.txt
VPS: untouched

## 20261108-223152 - Custom Position V3
Status: FAILED; CHECK ROLLBACK
Changed: src/pages/computer/CustomPositionPage.tsx
App.tsx: verified, not changed
Change: OpeningCover, entrance state, desktop brown frame
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-position-v3-20261108-223152
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-V3-20261108-223152.txt
VPS: not touched

## 20261108-224047 - Custom Position V4
Status: FAILED; CHECK ROLLBACK
File: src/pages/computer/CustomPositionPage.tsx
App.tsx: read only
Changes: opening cover, outer background, desktop frame
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-position-v4-20261108-224047
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-V4-20261108-224047.txt
VPS: not touched

## 20261108-224314 - Custom Position V5
Status: FAILED; CHECK ROLLBACK
File: src/pages/computer/CustomPositionPage.tsx
App.tsx: unchanged
Changes: OpeningCover, outer background, desktop frame
Tests: compare failure names before and after patch
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-position-v5-20261108-224314
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-V5-20261108-224314.txt
VPS: not touched

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

## 20261108-225108 - Custom Position V7
Status: TYPECHECK AND ISOLATED VITE PASS; TEST/BROWSER QA PENDING
Changed: src/pages/computer/CustomPositionPage.tsx
App.tsx: unchanged
WebP scripts: unchanged
dist: not targeted
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-position-v7-20261108-225108
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CUSTOM-POSITION-V7-20261108-225108.txt
VPS: not touched

## Computer Back V15 - 20261108-230633
- Success: True
- Error: 
- Scope: App.tsx and ComputerSetup.tsx
- Back button replaced.
- Home cleanup added.
- CustomPositionPage prop preserved.
- Typecheck: PASS
- Focused Vitest: FAIL - REVIEW TEST LOG
- Build: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-back-v15-20261108-230633
- Rollback: NOT NEEDED
- Browser QA: PENDING
- VPS: NOT TOUCHED

## 20261109-080804 - Create room layout V1
Status: STATIC CHECKS PASS; BROWSER QA PENDING
File: src\features\lobby\components\CreateRoomForm.tsx
Change: Custom position time labels and fields moved upward
Unchanged: normal room creation, room logic, VPS, dist
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\create-room-layout-v1-20261109-080804\CreateRoomForm.tsx
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-CREATE-ROOM-LAYOUT-V1-20261109-080804.txt

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

## 20261109-082059 - Position board height V3
Status: FAILED: NEW TEST FAILURES
File: src\pages\computer\CustomPositionPage.tsx
Change: move desktop custom-position board up 8px
Validation: TypeScript, isolated Vite, JSON Vitest comparison
Unchanged: mobile, game logic, dist, VPS
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\position-board-height-v3-20261109-082059\CustomPositionPage.tsx
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-POSITION-BOARD-HEIGHT-V3-20261109-082059.txt

## 20261109-082312 - Position board height V4
Status: STATIC CHECKS PASS; BROWSER QA PENDING
File: src\pages\computer\CustomPositionPage.tsx
Change: desktop custom-position board up 8px
Tests: baseline comparison using HashSet of full test names
Unchanged: mobile, game logic, dist, VPS
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\position-board-height-v4-20261109-082312\CustomPositionPage.tsx
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-POSITION-BOARD-HEIGHT-V4-20261109-082312.txt

## 20261109-082550 - Position board height V4
Status: FAILED: GUARD FAILED: MATCHES=0
File: src\pages\computer\CustomPositionPage.tsx
Change: desktop custom-position board up 8px
Tests: baseline comparison using HashSet of full test names
Unchanged: mobile, game logic, dist, VPS
Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\position-board-height-v4-20261109-082550\CustomPositionPage.tsx
Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-POSITION-BOARD-HEIGHT-V4-20261109-082550.txt

## 20261109-082850 - Room users layer V3
- Scope: LOCAL laptop game room.
- File: src/pages/game/GamePage.tsx
- Preserve eye-button toggle.
- Keep custom-room controls visible and remove 300px displacement.
- Keep queue/stand-up footer actions visible.
- Remove duplicate desktop queue/stand-up action inside panel.
- Viewer panel layer: z-[100].
- Eye button layer: z-[300].
- TypeScript: PASS.
- Targeted UI test: PASS.
- Build: PASS.
- Full Vitest: NOT RUN; previous baseline failed.
- Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\room-users-layer-v3-20261109-082850\GamePage.tsx
- VPS: NOT TOUCHED.

## Mobile View Position - 20261109-083430
- Success: True
- Error: 
- File: src/pages/game/GamePage.tsx
- Change: Raise mobile View button by 48px
- Desktop: unchanged
- View toggle behavior: unchanged
- Full Vitest: not run
- Browser QA: pending
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-view-up-20261109-083430
- Rollback: NOT NEEDED
- VPS: not touched

## 20261109-084508 - Room users V4.2
- Scope: LOCAL desktop game room.
- File: src/pages/game/GamePage.tsx
- Viewer panel bottom: -10px to 0px.
- Viewer panel z-index: 100 to 400.
- Detect clicks at the actual View button bounds to close the panel.
- Custom room controls: mt-3 to mt-1, raised by 8px.
- Queue and stand-up controls preserved.
- Mobile portal unchanged.
- Typecheck: PASS.
- UI test: PASS.
- Build: PASS.
- Source verification: PASS.
- Full Vitest: NOT RUN; previous baseline failed.
- Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\room-users-v4-2-20261109-084508\GamePage.tsx
- VPS: NOT TOUCHED.

## Mobile View Elo V3 - 20261109-085318
- Success: True
- Error: 
- Scope: useBoardLayout.ts, GamePage.tsx
- Mobile View uses measured Elo center.
- Horizontal center preserved.
- Desktop unchanged.
- Typecheck and Vite build checked.
- Full Vitest / postbuild not run.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\view-elo-v3-20261109-085318
- Rollback: NOT NEEDED
- Browser QA: pending
- VPS: NOT TOUCHED

## 20261109-085631 - Laptop board sync V2

- File: src/pages/computer/CustomPositionPage.tsx
- Desktop scene height aligned to main game layout.
- Desktop horizontal padding set to 24px.
- Desktop grid gap set to 8px.
- Desktop board aligned to top; removed desktop -8px offset.
- Mobile compact classes unchanged.
- TypeScript: PASS.
- Vitest: compared with baseline; see report.
- Vite build: PASS.
- Full npm build: NOT VERIFIED; existing WebP postbuild error.
- Browser visual QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\laptop-board-sync-v2-20261109-085631
- VPS: NOT TOUCHED.

## Top Gold Buttons V2 - 20261109-092154
- Success: True
- Error: 
- File: src/features/lobby/components/ComputerSetup.tsx
- Change: Laptop sound and fullscreen colors.
- Mobile, size, position, icons and behavior unchanged.
- Tests: TypeScript + Vite build
- Full Vitest: NOT RUN
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\top-gold-v2-20261109-092154
- Rollback: NOT NEEDED
- Browser QA: PENDING
- VPS: NOT TOUCHED

## 20261109-092116 - Trial Victory V2
- File: src/pages/game/GamePage.tsx
- Enable result UI in custom-position trial.
- Display victory for either side on checkmate.
- Prevent trial checkmate defeat audio.
- Fix V1 TS2322 by narrowing displayedResultOutcome.
- Typecheck: PASS.
- Targeted UI test: PASS.
- Build: PASS.
- Full Vitest: NOT RUN.
- Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\trial-victory-v2-20261109-092116\GamePage.tsx
- VPS: NOT TOUCHED.

## 20261109-093119 - Custom position owner transfer V1
- Scope: LOCAL, server/services/RoomService.ts
- Custom room: transfer ownership after seat and queue updates.
- Priority: remaining seated player, then promoted queued player.
- Next seated player inherits ownership if prior owner is only a viewer.
- Normal rooms: existing owner transfer path preserved.
- Stand-up: existing behavior preserved.
- Typecheck: PASS
- Targeted Vitest: PASS
- Vite build: PASS
- Full npm build: not verified (existing WebP postbuild issue).
- Browser QA: PENDING
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\custom-owner-transfer-20261109-093119
- VPS: NOT TOUCHED


## Top Buttons Sync V3 - 20261109-093334
- Success: True
- Error: 
- Scope: ComputerSetup.tsx
- Reference: RoomSelection.tsx
- Sound and fullscreen use original homeUtilityButton.
- Removed V2 desktop gold overrides.
- Header background and spacing aligned with Room Selection.
- Mobile shadow preserved.
- Back and button logic unchanged.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\top-buttons-sync-v3-20261109-093334
- Rollback: NOT NEEDED
- Browser QA: PENDING
- Full Vitest and production postbuild: NOT RUN
- VPS: NOT TOUCHED

## Room Owner Scope V1 - 20261109-095442
- Success: True
- Error: 
- Server: roomService.ts
- Client: useRoomModeration.ts
- Tests: room-owner-scope-v1.test.ts
- Owner moderation limited to locked or custom-FEN rooms.
- Password optional for locked-room ownership.
- Internal ownerId and queue logic preserved.
- Typecheck: PASS
- Targeted tests: PASS
- Vite build: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\room-owner-scope-v1-20261109-095442
- Rollback: NOT NEEDED
- Browser QA: PENDING
- VPS: NOT TOUCHED

## HOVANG Test Repair V2 - 20261109-101020
- Success: True
- Error: 
- Changed: four test files only
- Admin: assert disabled with empty reason
- Custom position: assert current Board handler
- Async teardown: await pending dynamic imports
- AdminPage, GamePage, App: NOT MODIFIED
- Room owner policy: NOT MODIFIED
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\test-repair-v2-20261109-101020
- Rollback: NOT NEEDED
- Browser QA: PENDING
- Production postbuild: NOT RUN
- VPS: NOT TOUCHED

## 20261109-101455 - HOVANG Clock Test V5
- Scope: LOCAL test files only.
- Modified: tests/leave-result-session.test.tsx.
- Modified: tests/online-shell-render-stability.test.tsx.
- Change: import App asynchronously in beforeAll.
- Wait for vi.dynamicImportSettled before tests execute.
- Typecheck: PASS.
- Isolated render tests: PASS.
- Repeat render tests: PASS.
- Game source: NOT MODIFIED.
- Clock patch: NOT YET APPLIED.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\clock-test-v5-20261109-101455.
- VPS: NOT TOUCHED.

## 20261109-101730 - HOVANG Computer No Clock V6
- LOCAL only; VPS untouched.
- Files: src\features\game\hooks\useGame.ts, src\store\gameStore.ts.
- Computer clock interval disabled.
- Computer clock tick and move time charging disabled.
- Computer low-time warning disabled.
- Online clock unchanged.
- AI thinking timer unchanged.
- Typecheck: PASS.
- Targeted Vitest: PASS.
- Render Vitest: PASS.
- Extended Vitest: PASS with two baseline exclusions.
- Full unexcluded Vitest: NOT VERIFIED.
- Build: PASS.
- Assets: original hashes restored and verified.
- Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-no-clock-v6-20261109-101730.

## 2026-11-09 10:32:33 - iPad V5
- LOCAL only; VPS untouched.
- Target: src/lib/desktopCanvas.tsx
- Result: PASS
- Browser QA: pending.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ipad-frame-v5-20261109-103034
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-IPAD-FRAME-V5-20261109-103034.txt


## 20261109-103627 - HOVANG Mobile Clock V7
- Scope: LOCAL only.
- Modified: src\pages\game\GamePage.tsx, src\features\game\hooks\useGame.ts.
- Mobile computer match clock display disabled.
- Computer match ticking sound disabled.
- Desktop computer clock remains hidden.
- Online clocks unchanged.
- AI thinking timer unchanged.
- Typecheck: PASS.
- Clock Vitest: PASS.
- Render Vitest: PASS.
- Build: PASS.
- Assets: original hashes verified.
- Browser QA: PENDING.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\mobile-clock-v7-20261109-103627.
- VPS: NOT TOUCHED.

### 2026-11-09 13:51:38 - Tablet V6
- V6 generated invalid Tailwind custom-variant selectors.
- Build completed with CSS selector warnings.
- PowerShell finally block was executed separately.
- Restored desktopCanvas.tsx and index.css from V6 backup.
- Current pre-rollback state: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v6-before-rollback-20261109-135138
- VPS not touched.


## 2026-11-09 14:13:04 - Hidden AI Mobile V2
- Result: PASS
- Scope: mobile Jieqi computer layout
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\hidden-ai-mobile-v2-20261109-141037
- VPS untouched. Browser QA pending.


## 2026-11-09 14:29:01 - Computer Resign V2
- Status: TYPECHECK PASS; BUILD PENDING
- File: src/pages/game/GamePage.tsx
- Change: enable existing resign action in computer mode
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-resign-v2-20261109-142855
- Build/Vitest: intentionally skipped due to freeze investigation
- VPS: untouched


## 2026-11-09 14:33:19 - Computer Result Sound V1
- Status: TYPECHECK PASS
- File: src/pages/game/GamePage.tsx
- Scope: computer level matches, victory sound only for human win
- Defeat sound and result presentation logic unchanged
- Online and position trial sound behavior preserved
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-result-sound-v1-20261109-143312\GamePage.tsx
- Build and browser QA pending
- VPS: untouched


### 20261109-143817 - Tablet V7 V6
- Scope: index.html only.
- Tablet portrait: viewport width 480 experiment.
- Tablet landscape: original viewport.
- JS syntax, TypeScript, Vitest, build: PASS.
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\tablet-v7-v6-20261109-143817
- Browser QA: PENDING.
- VPS: NOT TOUCHED.

### 20261109-162931 - VPS to LOCAL restore
- Status: FAILED
- Source: hovang-jieqi-auto-20261109-132809
- Scope: src, server, public, scripts, tests, engines, index.html, package.json, package-lock.json, vite.config.ts, tsconfig.json
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\vps-restore-20261109-162931
- Rollback: PASS
- Error: VITEST FAILED
- VPS not modified.

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

### 20261109-164427 - VPS source restore V7
- Status: PASS - VPS SOURCE RESTORED TO LOCAL
- Source: hovang-jieqi-auto-20261109-132809
- Scope: src, server, public, scripts, tests, engines, index.html, package.json, package-lock.json, vite.config.ts, tsconfig.json
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\vps-restore-v7-20261109-164427
- Rollback: NOT NEEDED
- Error: 
- Tests and build: see D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-VPS-RESTORE-V7-20261109-164427.txt
- Browser QA: pending
- VPS: untouched

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

### 20261109-174305 - Computer 3-task V9
- Status: PASS - LOCAL CHECKS
- Scope: src\pages\game\GamePage.tsx, src\features\game\components\GameEnergyControl.tsx, src\features\game\components\CapturedJieqiPieces.tsx
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-3task-v9-20261109-174305
- Rollback: NOT NEEDED
- Error: 
- Tests: TYPECHECK, VITEST, BUILD
- Test logs: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\computer-3task-v9-20261109-174305
- Browser QA: pending
- VPS: untouched


## 20261109-175407 - Restore old VPS iPad responsive
- Source release: hovang-local-v9-20261107-063939
- File: src/lib/desktopCanvas.tsx
- Before SHA256: 33AF6A81F0491D7CDDF8BB1F15BC320C80121C18E444B06EC9014A7F5DBC32A9
- Expected old SHA256: 23163063ACD4A280DECCBD0265B4CBA0E0529FF92F011482185E07F926FC11B8
- Result: PASS
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\ipad-vps-restore-20261109-175407
- VPS: not touched
- Browser QA: pending
- Other game source files: unchanged


## 20261109-180813 - Deploy upload V3
- Previous failure: Windows tar.exe could not open Unicode path.
- Fix: Stage and archive using ASCII-only temporary path.
- Result: UPLOAD VERIFIED
- Archive: C:\Users\NHATHO~1\AppData\Local\Temp\HOVANG-DEPLOY-20261109-180813\hovang-local-20261109-180813.tar.gz
- Remote: /home/nhat_hoang/hovang-local-20261109-180813.tar.gz
- Production activation: NOT PERFORMED
- Report: D:\Học\code\code games\Cờ Tướng\board-game\HOVANG-DEPLOY-UPLOAD-V3-20261109-180813.txt

## 20261109-225843 - Result sound and Elo sync V1
MEMORY READ: AI_WORK_RULES.md
MEMORY READ: AI_FAILURE_LOG.md
MEMORY READ: AI_CHANGELOG.md
MEMORY READ: AI_PROJECT_MEMORY.md
BACKUP: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\result-elo-sync-v1-20261109-225843
SOUND: FIX APPLIED
WIN SOUND: WIN ONLY
LOSE SOUND: LOSS ONLY
ELO PROFILE SYNC: PATCH APPLIED
SERVER REWARD FLOW: PRESERVED
ELO FORMULA: UNCHANGED
TYPECHECK: PASS
TARGETED VITEST: PASS
BUILD: PASS
STATUS: PASS
SUCCESS: True
SCOPE: LOCAL ONLY
VPS: NOT TOUCHED
DATABASE: NOT TOUCHED

### 20261109-225650 - Avatar clock no-blink V1
- Status: PASS - LOCAL CHECKS
- File: src\features\game\components\PlayerCard.tsx
- Changes: smooth green overlay and timer ring; stable avatar frame brightness
- Avatar image and rank title: unchanged
- Clock logic: unchanged
- Backup: D:\Học\code\code games\Cờ Tướng\board-game\.ai-backups\no-blink-v1-20261109-225650
- Rollback: NOT NEEDED
- Error: 
- Browser QA: pending
- VPS: untouched

### 20261109-230843 - Remove temporary screen measurement tool
- Removed script reference from index.html.
- Removed public/hovang-screen-measure.js.
- Typecheck: PASS.
- Build: PASS.
- VPS: NOT TOUCHED.
- Restore point: hovang-safe-v1.


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

## 2026-11-10 — Timer 120ms và quân di chuyển
- PlayerCard: lớp phủ/viền xanh chuyển bên 350→120ms trên laptop/mobile.
- Board: bỏ animation settling riêng, gộp độ nâng đang chọn vào cùng quỹ đạo bay; giữ thời lượng đi 400ms.
- Kiểm chứng mã cuối: 4 suites / 14 tests PASS; npm run build PASS (TypeScript, Vite và cả hai postbuild ảnh). Chưa browser QA; không deploy.
- Backup trước sửa: .ai-backups/timer-piece-20261110/{Board,PlayerCard}.tsx. Rollback chỉ hai file từ bản sao này nếu không có sửa mới hơn; giữ nguyên thay đổi có sẵn khác.

- 2026-11-10 / Giữ chủ phòng khi xuống View: RoomService giữ ownerId cho locked/customFen qua tự xuống/đổi ghế/hết năng lượng; chuyển chủ khi thực sự rời (kể cả chủ đang View); bỏ nhánh join custom chiếm lại quyền và ép viewer thường lên khi hết người ngồi. Cho người cuối xuống bàn, giữ phòng có viewer, xóa khi hết mọi thành viên. GamePage/useGame đồng bộ nút và gửi lệnh laptop/mobile. Giữ Xếp hàng tự nguyện/FIFO và bàn thường. Backup: outputs/backups/viewer-owner-20261110. Kiểm chứng 11 suites 91/91 PASS (gồm hook client, panel, phòng khóa Cờ Tướng/Cờ Úp, custom khóa/mở, stand-up/leave/queue/energy/ready); TypeScript PASS; đang kiểm tra lại build sau lỗi WebP postbuild. Chưa browser/hai thiết bị QA; không deploy/restart/DB/Git push.

## 2026-11-10 — Quân nhận thao tác ngay khi nhấn
- Board: primary pointerdown gọi onSelect ngay; click detail>0 không gọi lại, keyboard/assistive click detail=0 vẫn hoạt động; chuột phải không đi quân. Tốc độ bay linear, giữ 400ms và quỹ đạo nâng/hạ.
- Kiểm chứng: 4 suites / 41 tests PASS (animation stability, online animation, position editor, UI); npm run typecheck PASS; Vite isolated build .ai-backups/piece-immediate-20261110/dist PASS.
- npm run build chưa hoàn tất: lượt đầu exit -1073740791; retry TypeScript/Vite PASS nhưng postbuild ảnh ENOENT dist/assets/13_hai_phong-BWqTeccJ.png. Không sửa pipeline ngoài phạm vi. Chưa browser QA/deploy; online vẫn chờ server xác nhận.
- Backup/rollback: .ai-backups/piece-immediate-20261110/Board.tsx và move-animation-stability.test.tsx; chỉ phục hồi hai file khi không có thay đổi mới hơn.
- Kiểm chứng bổ sung viewer-owner 2026-11-10: thêm 2 regression chủ custom hết năng lượng xuống View có/không người xếp hàng, 10/10 test viewer-room-owner PASS; tổng các ca đã chạy 93 PASS. TypeScript cuối PASS; Vite build chung và Vite build tách riêng outputs/backups/viewer-owner-20261110/dist PASS; postbuild WebP riêng PASS. Hai lượt npm run build trước gặp lỗi native/ảnh dist như AI_FAILURE_LOG; chưa tuyên bố full npm build PASS. Finalpass ảnh đang kiểm tra.
- Hoàn tất viewer-owner 2026-11-10: finalpass ảnh PASS exit0/APPLIED, giảm14.6394MiB. Từng bước TypeScript → Vite → WebP postbuild → finalpass đã PASS khi chạy lại riêng; dist có bản mới. Chưa browser/hai thiết bị QA, chưa deploy/restart. Quy tắc trong AGENTS/PROJECT-MEMORY/ROOM-LOCKS đã cập nhật; giữ bố cục/avatar khóa và bàn thường.

## 2026-11-10 — Undo piece-immediate, kiểm tra tiếng tự bắt đầu
- Hoàn tác riêng Board onPointerDown/linear về onClick/ease-out và phục hồi test animation từ backup .ai-backups/piece-immediate-20261110. Giữ sửa cũ và timer120ms.
- Không đổi audio production. Thêm test auto-start và rematch tự-start trong tests/move-sound.test.tsx; backup test tại .ai-backups/undo-check-start-audio-20261110.
- 6 suites/40 tests PASS; typecheck PASS. Chưa browser audio QA; không build/deploy lượt này.

- 2026-11-10 / Chặn xếp hàng chặn vào ghế: RoomService.join đưa mọi người mới vào View queued=false khi queueBlocked, kể cả lời mời chủ, dù có0/1/2người ngồi. Giữ ghế hiện có và lệnh quản lý Đưa lên bàn; tắt chặn khôi phục luồng join cũ. Backup outputs/backups/queue-block-entry-20261110. Sáu suites62/62PASS gồm12ca mới cho bàn khóa Cờ Tướng/Cờ Úp/custom bật-tắt khóa ×0/1/2ghế; kiểm tra join thường/lời mời, chặn join-queue, chủ promote, tắt chặn. TypeScript PASS. Chỉ sửa backend và test/tài liệu, không build lại frontend; chưa socket/browserQA/deploy/restart.

- 2026-11-10 / computer-public-brand: đường dẫn máy Cờ Úp đổi /co-up-ong-hoang qua computerPresentation; main nhận alias /jieqi-ai và replaceState giữquery/hash, không đổi handoff/cấp/phe/isolation/thoát. useComputerSetup chuyển tới URL mới. Lỗi user-facing dùng computerErrorMessage Ông Hoàng/Cờ Úp Ông Hoàng chung setup/ván/trial/gợi ý/thế tùy chỉnh; controller Fairy trả thông báo công khai cho lỗi service/lỗi bất ngờ, giữ status dự kiến. Không echo tên engine/path/model/cấu hình; không đổi định danh nội bộ/luật/giấy phép. Chuẩn bị ops/jieqi-public-route.conf để rewrite Nginx nội bộ tới handler isolation cũ, chưa áp dụng VPS. Backup outputs/backups/computer-public-brand-20261110. 7suites43/43PASS gồm route cũ/mới, HTTP-router 429/503 không lộ diagnostic, setup/game/Jieqi/hint lỗi+retry, replay/trial/editor regressions. TypeScriptPASS; Vite build tách riêng backup/distPASS, không ghi đè dist chung/không chạy lại WebP. Chưa browser/Nginx config runtimeQA; chưa deploy/restart/push. Diff-check có blank EOF cũ usePositionEditor đã xác nhận tồn tại trong backup, không sửa whitespace ngoài task.

## 2026-11-10 — Âm thanh tự bắt đầu ván kế và đóng bàn thường hết năng lượng
- Lỗi: sau tự đếm, server chuyển thẳng finished→playing; intro của ván trước còn bị đánh dấu đã xử lý và moveCount về0 bị coi là takeback rồi stopAll. Reset cờ intro đúng direct-rematch online, chỉ nhận takeback khi trước/sau đều playing, bỏ effect phát online trùng trong useGame; không đổi luồng local bấm bắt đầu.
- Bàn không khóa: sau gate trình diễn kết quả hiện có, nếu cả hai ghế hết năng lượng, server đưa cả hai ra với reason energy. Ưu tiên queued FIFO đủ năng lượng rồi viewer thường theo thứ tự vào View để lên ghế/giao owner mới. Không còn người đủ năng lượng thì xóa phòng; các viewer hết năng lượng còn lại cũng nhận notice và rời phòng. Một người hết năng lượng/bàn khóa giữ luật cũ, không đổi luật trong ván/kết quả/thưởng.
- Controller tách socket khỏi room thật; client về Home, mở EnergyNotice chung, không hiện nhầm thông báo bị đuổi. Snapshot ACK muộn không kéo người chơi vào lại.
- Kiểm chứng mã cuối: 11 suites/96 tests PASS +3 suites/4 real-socket tests PASS; TypeScript PASS; Vite build final-dist PASS. Test rộng ui.test.tsx có1fail nội dung lỗi máy (mong lỗi Fairy-Stockfish gốc, hiện lỗi Ông Hoàng chung), ngoài phần sửa; không sửa test để che lỗi.
- Browser audio/hai thiết bị QA chưa chạy; không VPS/deploy/restart/DB migration. Backup mã trước sửa: .ai-backups/rematch-audio-energy-20261110; phục hồi theo từng hunk nếu file có sửa mới hơn, không đè sửa của task khác.

- Đóng gói mã cuối: hai postbuild WebP PASS (final-package.log); final-dist đã sao chép vào dist local sau backup dist-before-publish. Chép index.html tường minh cuối cùng, checksum khớp và toàn bộ src/href nội bộ của index tồn tại. Không deploy/restart.

## 2026-11-10 — Random Elo cùng bậc/cùng sao
- Cập nhật ratingDelta nhận delta chung; transaction settlement rút crypto.randomInt(11,14) một lần và dùng cho cả hai phía. Hòa/ngoài eligibility không thay đổi; các chênh rank khác giữ policy.
- Regression kiểm ba giá trị11/12/13 và cặp thắng/thua đối xứng. 13 tests PASS; typecheck PASS. Chưa DB live/deploy. Backup: .ai-backups/elo-random-same-rank-20261110.

## 2026-11-10 - Canvas rieng cho iPad (local)
- src/main.tsx chi chon canvas cho iPad/iPadOS Safari; cac thiet bi khac dung appBootstrap hien tai. Canvas iframe cung nguon giu viewport/CSS 1493x731, scale-to-fit theo visualViewport + safe area, can giua va dung background home hien co. Xoay chi resize khung, khong reload app.
- Them src/ipadCanvas.ts, src/appBootstrap.tsx (giu nguyen React entry truoc canvas) va tests/ipad-canvas.test.ts.
- Kiem chung: 18/18 canvas tests PASS; TypeScript PASS; 44 focused regression tests truoc chinh nhan dien PASS. Vite-only build rieng PASS. Full npm run build chua PASS vi WebP finalpass dung theo nguong toi thieu (0.746 MiB < 5 MiB); giu nguyen guard. Browser/iPad that chua QA duoc do harness khong vao duoc game; khong deploy.
- Backup truoc sua: .ai-backups/ipad-canvas-20261110-094937 (main.tsx va tai lieu goc). Rollback: phuc hoi src/main.tsx tu backup; xoa src/appBootstrap.tsx, src/ipadCanvas.ts, tests/ipad-canvas.test.ts neu chua co sua moi hon.
- 2026-11-10 / Rà soát cập nhật VPS theo yêu cầu: không phát hành vì checkout codex/publish-local-20261103 đang có146 file modified +413 untracked; HEAD 017d45d0 không nằm trong origin/master và có4 commit ngoài master; release production chỉ chấp nhận SHA master có push CI. .github/workflows/deploy.yml chỉ build/lưu artifact, xác nhận rõ không SSH/SCP/migrate/restart/activate; vps-test-deploy nhắm VPS test riêng. Không stage/commit/push/SSH hoặc thay đổi VPS. Local typecheck PASS; test thông báo setup máy sau cập nhật 1/1 PASS; npm test toàn bộ đã chạy một phần, quan sát nhiều suite thất bại (ui lỗi assertion cũ đã cập nhật, HTTP/socket/webhook/API suites), rồi dừng trước summary nên không có kết luận full-suite. Dist/build chưa chạy cho toàn bộ dirty tree. Chưa deploy.

- 2026-11-10 / Sửa test báo lỗi máy sau đổi nhãn công khai: tests/ui.test.tsx cập nhật assertion từ lỗi Fairy thô sang thông báo Ông Hoàng chung. Nguyên nhân các suite HTTP/Socket thất bại ở lượt kiểm tra trước là sandbox từ chối connect 127.0.0.1 với EACCES; không phải lỗi ứng dụng. Xác minh ngoài sandbox: 9 suite tích hợp30/30 PASS; toàn bộ npm test 225 file passed,6 skipped; 1171 passed,41 skipped; TypeScript PASS. Không cần sửa runtime code.

## 2026-11-10 — VPS release package preparation
- Corrected stale expectations in `tests/account-persistence.integration.test.ts` only: valid one-uppercase rename fixture, wait derived from `MATCH_INTRO_MS`, and both Elo assertions accept the documented random same-rank range 11–13. Backup: `.ai-backups/deploy-fix-account-persistence-20261110/`.
- Verification: `npm run db:integration` PASS (54 migrations, rerun 0, schema + smoke PASS; 6 files / 40 tests PASS); `npm run build` PASS (typecheck/Vite/WebP optimization/finalpass). No browser QA. Earlier complete local suite result remains 1171 PASS / 41 SKIP; not rerun after assertion-only edits.
- Prepared private local source archive v4: `.ai-backups/hovang-private-local-release-20261110-v4.tar.gz`, SHA-256 `485CE0E7EC1389126C4537EDB95DBC11F85FA50B5A4FB4607F4C533F6577A241`, 596.4 MiB / 2010 files. Allowlist excludes credentials, backup/reference uploads, engines, node_modules, dist, internal docs/reports; includes migration 021. Archive integrity/content scan PASS.
- No application behavior changed. SSH authentication failed with the available documented key; no VPS upload, migration, backup, restart, or activation occurred. Website QA pending.

## 2026-11-10 — Move audio after idle
- User reports delayed move sound after thinking for a long time. Device/browser cause remains unconfirmed without listening QA.
- GameSounds uses interactive latency, maintains a zero-gain oscillator render stream between cues, and requests resume before awaiting asset decoding. Dispose stops/disconnects the stream. Shared by all useMoveSound consumers; no gameplay/UI/asset/volume changes.
- Regression tests simulate 180 seconds between cues, interruption resume, cleanup; game-sounds + move-sound 24/24 PASS, TypeScript PASS. Build verification pending.
- Backup: .ai-backups/move-audio-idle-20261110. No deploy; hardware/Bluetooth/browser idle latency still requires device QA.
- Validation final: 24/24 targeted tests PASS; TypeScript PASS; Vite compilation PASS. Full npm run build FAIL in existing image postprocessor: ENOENT dist/assets/message-CebfAm2M.png at scripts/hovang-webp-postbuild.cjs:62. No image/postbuild code changed; generated dist is not verified for release. Audio source/tests retained because relevant checks passed; no deploy/browser listening QA.

- 2026-11-10 reconnect: Theo phản ánh nghe điện thoại rồi quay lại bị văng, giữ ghế đang đấu khi mất kết nối 3 phút (trước 60 giây). Đồng hồ/lượt vẫn chạy, hết giờ thi đấu có thể kết thúc sớm hơn. Resume theo account đã xác thực, giữ ghế/bàn/chủ phòng, xóa deadline và disconnectedAtEpochMs cũ để mỗi lần mất mạng tiếp theo có đủ cửa sổ mới. Khi quay về tab/focus hoặc có mạng, client thử connect + resume/resync; cleanup listener khi unmount. Rời chủ động giữ luật cũ. Tests room-reconnect-grace/room-foreground-reconnect/rooms/server: 4 suites,43/43 PASS; TypeScript PASS. Chưa thử cuộc gọi trên điện thoại thật; không deploy/restart. Backup .checkpoints/reconnect-20261110. Full build đang chờ postbuild ảnh.
## 2026-11-10 — Google login blank-window mitigation
- Shared login/link GIS button opts supported browsers into FedCM, keeps explicit account selection and backend credential verification. COOP/COEP required by Cờ Úp remain unchanged.
- Added embedded-browser guard for Zalo/Facebook/Instagram/LINE/Android WebView with full-browser instructions and distinct Guest-link preservation warning. Initialization/network failures now show a retry label.
- Backup: `.ai-backups/google-login-20261110/manifest.txt`; new files `src/lib/googleBrowser.ts`, `tests/google-browser.test.ts`.
- Verification: targeted 6 suites / 32 tests PASS; TypeScript PASS; Windows-aware tracked diff whitespace check PASS. Initial `npm run build` failed at WebP postbuild with missing dist PNG after TypeScript/Vite passed. Isolated Vite rebuild PASS; first postbuild PASS (206 conversions, 142.79 MiB saved). Final postbuild result follows below.
- No Google Cloud/account configuration changes, DB writes, migration, commit/push or production deployment. No real account or phone QA; do not claim all mobile browsers fixed. Unsupported embedded browsers receive guidance rather than opening Google inside their WebView. Non-FedCM legacy popups under isolation remain unverified.

- 2026-11-10 reconnect kiểm chứng cuối: npm.cmd run build PASS (TypeScript, Vite, cả hai postbuild ảnh); dist chứa listener foreground/online mới. 43/43 targeted tests PASS, diff whitespace check PASS. Chưa QA cuộc gọi trên điện thoại thật; chưa deploy/restart backend.
- Final packaging verification: isolated Vite + unchanged WebP optimize + unchanged WebP finalpass all PASS (finalpass saved14.6394MiB; threshold5MiB preserved), process exit0. Verified compiled `use_fedcm_for_button:true` in isolated build. Build location: `.ai-backups/google-login-20261110/build/`. This is a validated local build, not a website release; initial shared-dist npm build remains recorded as failed.

- 2026-11-10 avatar-green-layer: Theo ảnh/user, lớp phủ xanh thời gian phải trên cả portrait và viền avatar. Chỉ PlayerCard đổi z-index fill2→11 và arc11→12, AvatarFrameOverlay giữ10. Không đổi geometry/avatar/khung/clock/màu/thời lượng120ms; dùng chung laptop/mobile. Backup .checkpoints/avatar-green-layer-20261110. PlayerCard identity6/6 PASS; full build đang chạy. Chưa browser QA/deploy.

- 2026-11-10 avatar-green-layer kiểm chứng cuối: full npm.cmd run build PASS gồm TypeScript/Vite/cả hai postbuild ảnh; dist/assets/appBootstrap-rzdealfV.js có fill z11 và arc z12 trên frame z10. PlayerCard6/6 tests PASS. Chưa browser QA, chưa deploy.

## 2026-11-10 — Admin user analytics and activity history
- Added authenticated admin overview, account list, per-user activity timeline and usage aggregation with query/type/connection/date/kind/code filters,50-row pagination,15s foreground refresh and visible error/retry states. Existing admin resource/cosmetic controls remain.
- Added ActivityService→ActivityRepository, fixed activity catalogs, authenticated bounded batching (20/request,120/min/account), UUID idempotence, server login and successful-account-API observations; App collector records screen changes and recognized controls/dialogs without modifying locked UI. Never stores typed/chat content, credentials or arbitrary URLs; user/time are server-assigned. Client cannot emit login/server-success codes. Connected account counts deduplicate actual sockets across the whole game; current-process scope.
- Migration022 introduces user_activity_events/state with indexes/FKs; existing migrations unchanged. No historical backfill and no automatic real-DB migration/deploy. See ADMIN.md for semantics/coverage/limits/manual activation.
- Backup .checkpoints/admin-analytics-20261110. Targeted6suites18/18 PASS; disposable MySQL first run41/41, after adding date/Google/pagination regression final42/42 PASS (56migration steps,rerun0,schema/smoke PASS). TypeScript PASS; full npm run build PASS including both WebP stages. Diff check with Windows CRLF support PASS. No browser/listening/two-device QA and no production writes/restart/SSH.

- 2026-11-10 admin-analytics activation fix: screenshot localhost/admin reports generic500. Read-only local DB confirmed both022tables and journal absent. Created ignored full SQL backup6,727,858bytes with verified SHA25643064634bbef6d8f76cda52fa8618f3723c4ff7d53f635e9ff29f2f427b32320 under .checkpoints/admin-analytics-activation-20261110. Checksum preflight confirms only022:001/002 pending. Configured cotuong_migrator has SELECT/INSERT/UPDATE/CREATE/INDEX/ALTER but lacks REFERENCES, so db:migrate failed ER_TABLEACCESS_DENIED_ERROR at first CREATE FK table. Confirmed no tables created, exact running marker/checksum only, removed that failed unapplied marker transactionally; no applied history/account data changed. Minimal administrator grant prepared in grant-references-local.sql; no grants changed, no remote actions.
- Repository now serves existing account totals/list and online status when activity tables are absent, returns activityAvailable=false and activeInPeriod=null; UI shows explicit not-enabled status and em dash instead of false0/generic500.8/8 regression/service/React tests and TypeScript PASS; direct local DB report read PASS. Full build pending; journal remains clean with022pending. Activity history still requires REFERENCES grant plus normal migration. No claim that history is active.
- Admin missing-schema fallback verification final: full npm.cmd run build PASS (TypeScript/Vite/both WebP stages),8/8 targeted PASS; direct local DB statistics read PASS. Still waiting for administrator to grant REFERENCES;022not applied. User requested PowerShell command; verified mysql.exe exists and local config is localhost:3306/cotuong. No privilege change performed by agent.

- 2026-11-10 admin-analytics activation completed: user successfully granted REFERENCES to existing local cotuong_migrator@localhost from MySQL monitor. Ran npm.cmd run db:migrate: exactly2new022steps PASS. db:verify PASS (schema/checksum/FK/index). Direct ActivityService report against local DB PASS, activityAvailable=true; both022journal steps applied; total=Google+guest consistency PASS. No fake activity inserted, no account/resource data modified; no remote/deploy/restart. Prior “waiting for REFERENCES /022pending” status is superseded. User should refresh localhost/admin for live statistics/history.

- 2026-11-10 admin session recovery: user screenshot showed analytics401 while admin shell remained logged in. Backend3001 and Vite5173/api/health both200; current network healthy, session invalidity confirmed by screenshot response. AdminAuth keeps sessions in RAM (2h, restart invalidates); analytics and catalog async401 had not propagated to useAdmin. Added stable shared sessionExpired callback clearing target/users/catalog/notice and returning to password form; analytics clears stale report, stops401polling and notifies parent; catalog and action401 share recovery. Network errors retain valid auth and permit retry.7/7 React regression tests PASS including relogin+statistics, catalog401, temporary network; TypeScript PASS. Backup .checkpoints/admin-session-expiry-20261110. No auth lifetime/security/DB changes; browser-session QA not performed. Vite validation pending.
- Admin session recovery validation final: isolated Vite production compile PASS at .checkpoints/admin-session-expiry-20261110/dist;7/7 React tests and TypeScript PASS. Default dist/image postprocessors not rebuilt this follow-up; Vite dev source at localhost5173 uses corrected recovery. No backend restart or database changes.

- 2026-11-10 VPS update requested by user for current game server. Full local build PASS including both WebP postbuild stages. Prepared source package .checkpoints/vps-release-20261110-175231/hovang-local-release.tar.gz (2053files,606401342bytes,SHA2563f266845509113ddb605398221f37c49013bc6b3ce4d4a273347cb853e4db86f), archive read/member checks PASS; includes022and admin-session fix, excludes credentials/env/backups/media/engines/node_modules. Gitleaks redacted directory scan PASS/no leaks. Full npm test still running in tool session96802, no final result yet. SSH cotuong_deploy@103.9.78.75 refused existing cotuong_github_deploy and hovang_deploy_ed25519 keys (publickey); no remote mutation/upload/backup/restart/migration performed. User requests one command to log in and authorize deploy key manually; pending user action. No GitHub push (private local engine changes preserved).
- VPS release follow-up: complete npm test finished PASS:233files passed/6skipped;1206tests passed/43skipped,333.23s. User attempted manual authorization command but nhat_hoang login was rejected before sudo/key write, so no remote change occurred. Explicit existing private key vinahost_cotuong is present locally; next manual command specifies it rather than relying on default SSH identities. Its acceptance has not been verified; do not claim connectivity restored.
- Deploy SSH follow-up: user successfully installed cotuong_github_deploy public key via nhat_hoang using vinahost_cotuong. SSH debug now confirms server accepts fingerprint U3m3HIZY3AMxFYimayZZYI1E1PPPuUK11aB2kJxrjsY; authentication stops before signed packet because private key requires passphrase and is not loaded in ssh-agent. Verified using ssh-keygen with empty passphrase without printing key; agent currently has3other keys. User must run ssh-add for cotuong_github_deploy locally; never request passphrase in chat. No further VPS writes by agent; release/build/fulltest/secret-scan artifacts remain ready.

- 2026-11-10 VPS staging follow-up: SSH deploy works after user ssh-add. Live cotuong.service active, APP/WEB verified; deploy sudo remains narrowly scoped. User configured private mysql-migrator.json mode0600; login and all required DDL permissions PASS. Actual VPS journal is30applied steps through005; checksum prefix comparison PASS against new registry,26pending steps006–022. No migration or live activation performed.
- Backup gate: adapter verify-existing failed; create-and-verify triggered existing local+cloud units. Local dump job success, cloud job failed. User-ran sanitized admin diagnostic confirmed OAuth invalid_grant/token expired/refresh failure (gdrive_crypt backend). Do not bypass fresh cloud-backup gate. Prepared reconnect-cloud-drive.py in incoming; root-only config backup, discovers existing underlying drive, then invokes interactive rclone reconnect. User must authenticate Drive through SSH localhost53682 tunnel per https://rclone.org/remote_setup/; never send tokens/passwords in chat.
- Staged candidate npm ci/build PASS on Linux with preserved VPS .env. Original packaging missed scripts/vps-test-readonly-smoke.ts needed by tests/typecheck; added unchanged file, rebuilt source archive v2,2054files606402367bytes,SHA256911d17f3c983d0c2158c7133b6cc10b6f1793a8f8f42c8d3299789ce1b94a7ad; Gitleaks PASS/no leaks, remote checksum PASS. Incoming /home/cotuong_deploy/.cotuong-incoming/local-20261110-175231/release.tar.gz now v2 (old kept release-v1.tar.gz); candidate under candidate/board-game already matches fix. Final candidate build log reports PASS, both WebP stages ran.
- VPS lacks native Fairy engine. Prepared official Linux Xiangqi NNUE in incoming/fairy-linux (release xiangqi-c07e94a5c7cb,https://github.com/fairy-stockfish/Fairy-Stockfish-NNUE/releases), GitHub published SHA2562394fd4d1430edfddaea55097a7e10c8a9b96fca94f5600a8fb6e209b769bf01verified; UCI/ready/NNUE/bestmove a1a2 PASS; Copying.txt retained. APP/engines not writable by deploy; binary not installed into live yet. Requires narrow admin install into APP/engines/fairy-stockfish with executable/readable modes after backup gate; keep Pikafish and config intact.

## 2026-11-10 — Ordinary empty-table lifecycle
- User asked to check/complete ordinary-room behavior when no players remain. Existing leave path promoted earliest eligible viewer, but retained spectator-only rooms when all viewers were depleted. Reproduced second gap: energy demotion of the last remaining player during tick did not promote an eligible spectator.
- Extracted settleEmptyNormalTable, reused after leave/readiness updates, normal game commands and nonplaying tick. Only ordinary rooms (!locked&&!customFen): queued eligible FIFO first, then earliest-arrived eligible viewer; if none can sit, clear spectators via existing energy removal/notice path and delete room. No promotion of unqueued viewers while a seated player remains. Locked/custom viewer-owner rules unchanged.
- Backup .checkpoints/normal-empty-room-20261110. Eight new two-variant service regressions plus real socket removal regression. Final7suites56/56PASS, TypeScript PASS. No UI/build assets/DB/VPS changes; no browserQA.
- Deployment remains pending cloud OAuth/backup and engine installation. Existing archive v2 and remote candidate do not include this newer roomService/test change; MUST refresh/revalidate source artifact and candidate before activating. Updated handoff notice accordingly.

- 2026-11-10 AI setting request in progress: user requests admin-granted permission and a Home settings toggle below Bỏ logo with crossed-out AI icon, scoped to Vị trí tùy chỉnh/Đấu ngay. Meaning of “bỏ AI” is unresolved (hide AI presentation vs disable automatic machine moves); async clarification asked, dependent behavior/permission/migration not implemented. Added unused ai-off variant to existing HomeIcon SVG (letters AI/red slash), backup .checkpoints/ai-setting-20261110/HomeIcon.tsx; TypeScript PASS. No assets generated, UI locks/geometry/gameplay/DB/VPS unchanged. Continue after user clarifies intent; do not claim feature complete or deploy stale archive.

## 2026-11-10 — Bỏ AI permission and trial-controls layout
- User clarified the requested behavior: hide the complete two-side AI switch panel, including frame/switches/general glyphs, and move lower replay navigation into that location. Retained original request for separate admin entitlement and Home toggle below Bỏ logo with crossed AI icon.
- Added migration023ai_controls_control(default0), AccountProfile.aiControlsControl and admin actionai-controls with locked-user transaction, boolean validation, audit/reason/requestid/idempotency. No automatic grants. New profile SQL requires023; applied exactly1pending local step after verified ignored SQL backup6,730,736bytes SHA256d1d542a34f9012928374f7c30c1e10410ef2aed9c8574699498453b4e34caa42; db:verify PASS.
- HomeSettings uses per-account persisted preference gated by backend grant, red-slash AI SVG in existing icon system. Shared preference hook updates on toggle/storage/account/permission changes. ReplayControls hides machine panel and renders navigation in tools for mobile; GamePage removes lower mobile wrapper while enabled; desktop all-panel keeps one navigation row. Scoped to customPositionTrial; history replay/online/avatar geometry/engine logic remain as before. Activity tracking recognizes fixed ai_controls toggle code.
- Backup .checkpoints/ai-setting-20261110. Targeted initial7suites26/26PASS; follow-up4suites12/12PASS includes adminUIgrant/revoke+activity. Disposable MySQL6suites43/43PASS,57migrationsteps/rerun0/schema/smoke PASS. Final combined tests/build status to follow. No real-user grants, browserQA or VPS operations. Existing VPS archive/candidate stale; include new migration023 and room-empty follow-up before future deployment.
- Bỏ AI final verification: combined9suites33/33PASS; disposable MySQL6suites43/43PASS. Final npm.cmd run build PASS after all source/activity edits, includes TypeScript/Vite/both WebP postbuild stages; local db:verify PASS, diff whitespace check (CRLF-aware) PASS. No browser/device QA and no real-user permission grant. No VPS changes; handoff updated with stale-artifact warning and migration023.

## 2026-11-10 — Keep application state during orientation changes
- Root cause reproduced: DesktopCanvas returned children directly at<=800px and nested wrappers at>800px, causing Providers/App descendants to unmount/remount whenever phone rotation crossed the breakpoint. This reset hook/form/trial state and restarted effect lifetimes.
- Keep wrapper nodes stable. Compact uses display:contents with desktop IDs absent; desktop retains original styles/IDs/scaling. No changes to layout constants, avatar geometry, game/AI logic or iPad iframe. Removed stale usePhonePortrait call/import/file that forced portrait, consistent with2026-10-21 cancellation and current rotation request.
- Backup .checkpoints/orientation-state-20261110. New regression2cases failed before fix; final5suites34/34PASS (rotation state/DOM identity/effect lifecycle, visualViewport, iPad, AI controls, custom position). TypeScript and CRLF-aware diff-check PASS. Full build pending. No DB/VPS changes or physical-device/browser QA. Existing VPS release artifacts stale and need refresh before later deployment.
- Orientation-state final verification: npm.cmd run build PASS, includes TypeScript/Vite/both WebP stages;34/34targeted tests PASS, CRLF-aware diff-check PASS. No physical-phone/browser QA, DB/VPS changes or production deployment. Handoff file updated to require refreshed artifacts with this fix.

## 2026-11-10 — Abandoned ordinary-room cleanup (local-only final scope)
- Initially investigated VPS read-only per user. Critical discovery: hovanggame.com DNS is103.153.254.184, not103.9.78.75. Public/current-host API showed3rooms including2ordinary0seat/1viewer rooms(codes313544/311863), old-host backend returned[]. Current-host deploy keycotuong_vps_test_deploy works, servicecotuong-test.service active, current release /srv/cotuong/releases/hovang-local-v4-routefix-20261110 ownedcotuong:cotuong and unreadable by deploy. Prepared a narrow source-capture helper in private incoming; user then explicitly canceled further VPS reading and requested local fix only. No live code/data/room mutation or restart performed. Prior old-host staged release/Drive OAuth/migrator status is not live-host evidence; corrected handoff prominently.
- Local RoomService.list excludes ordinary zero-seat rooms. Repository prunes fully unoccupied ordinary creations after60s(join grace) vs legacy30min for locked/custom; occupied/watching rooms excluded from age prune. Service prunes on tick too, records removed snapshots even if detected by list/create, cleans initial histories/readywait and drains to controller publisher for rooms:changed. Existing View-only settlement still promotes queued/earliest eligible or removes depleted viewers and closes. Keeps any seated waiting player, locked/custom rules and reconnect grace.
- Backup .checkpoints/empty-room-vps-20261110. Six new creation tests(3failed baseline/3alreadyPASS), plus real socket regression for expiry/update and preservation of occupied socket. Final9suites92/92PASS; TypeScript and CRLF-aware diff-checkPASS. Backend-only change: no Vite/image pipeline rerun; no browserQA/DB changes/deploy. Existing release artifacts stale.

## 2026-11-10 — Remove newly introduced sixty-second creation expiry
- User canceled the60s auto-delete rule. Restored the prior30min completely-unoccupied cleanup for all room types, leaving ordinary0-seat lobby filtering and eligible-viewer inheritance/closure behavior intact. No new expiry replacement policy introduced.
- Updated regressions to assert an unjoined room survives60s and accepts its owner after5min; existing empty cleanup/socket tests now use legacy30min. Backup .checkpoints/remove-empty-60s-20261110. Updated active rules and handoff to supersede60s references; no VPS/DB/frontend changes. Final validation follows.
- Sixty-second rule cancellation validation:9suites92/92PASS,TypeScriptPASS. No frontend build needed for backend-only expiry rollback; no VPS changes. Active documentation updated, previous60snotes are superseded.

- 2026-11-10 device-entry: User yêu cầu kiểm tra link trên mọi thiết bị. Website gốcHTTPS200, HTTP301 vềHTTPS; www lỗiDNS (curl6), chưa thay DNS/server. Chrome/Edge desktop và Chromium mô phỏng Pixel7/iPhone13/iPadgen7 tới Login, Android bấm Để sau lời mời lối tắt; không tạo account/login thật. WebKit Windows spawnUNKNOWN nên chưa Safari QA, không kết luận mọi máy đều hoạt động. Thêm startup recovery script thường + bootstrap catch/noscript: retry khi module/preload lỗi hoặc30s chưa render; gỡ overlay/listener/timer sau render, giữ cookie/data/ván.58/58tests5suite PASS; full build đang chạy. Chi tiết docs/DEVICE-ENTRY.md; backup .checkpoints/device-entry-20261110. Chưa deploy.

- 2026-11-10 device-entry kiểm chứng cuối:58/58tests5suite PASS; npm.cmd run build PASS gồmTypeScript/Vite/2postbuild; public/dist startup script SHA256 khớp. BrowserChrome local: chặn entry hoặc bootstrap đều hiện retry; bỏ chặn+bấmThửlại vàoLogin; normalLogin không bị overlay. LiveChrome/Edgedesktop +ChromiumemulationPixel7/iPhone13/iPadgen7 đếnLogin; không có testđăngnhập/gameplay/Safarithật. Khôngdeploy/SSH/DNS. wwwvẫnthiếuDNS, đang chờ thông tin nhà cung cấpDNS. Diffcheckindex.html báo blank trailingwhitespace cósẵn trongbackup, khôngchỉnh ngoài phạmvi.

- 2026-11-11 release preparation: User yêu cầu đưa bản local hiện tại lên103.153.254.184, lệnh cuối tự nhập mật khẩu. Đóng gói immutable hovang-local-20261111-ae912bddf415 (2310files/662690180bytes, SHA2569d25a1bbe15773796f8b0ccd3d6a7c0f4838ea8cd9a84acee7632c3aeb5a4690), excludesenv/adminsecret/DB/uploads/Windowsengines/node_modules. Gitleaks/manifest/archive/sourcechecksum PASS; fullsuite cuối1235PASS/0FAIL/44SKIP, MySQLtạm43PASS, fullbuildPASS. Cập nhật assertion energy-room-policy theoẩnphòng0ghế,44relatedPASS; khôngđổigameplay. Đãuploadprivateincoming+checksumPASS, npmci Linux/typecheckPASS trong staging deployuser,13896filemanifestpinned. Chưađổicurrent/stopservice/migrateDB thật. Chuẩn bị PowerShell5.1 parsePASS+rootPythoncompile+schemaTStranspile+bash-n trênVPS PASS. Root wrapper dùngsu root nhập mậtkhẩutrựctiếp, pinhelperhash, backup/restore scratch trướcDDL, onlypending022/023, activegameguard, verifySchema, atomicswitch+health/socket/frontend, code/service rollbackgiữschemaadditive. Root/envSQLthật cònchờuserchạylệnh. Outputs/README-Deploy-HOVANG-20261111.md trongchat làhandoff; khôngápdụngpipelineGitHub/VPScũ.

- 2026-11-11: Admin UI: danh sách người chơi tối đa30/trang, online trước rồi ID giảm dần ngay tại repository trước LIMIT/OFFSET; nhật ký vẫn50/trang. Xem chi tiết mở tài khoản trong khối quản lý, cuộn tới thông tin/tài nguyên/Elo/quyền; giữ Xem hoạt động riêng. Giao diện admin chia khối, trạng thái online có màu. Không thay UI game/avatar/auth/DB schema. Kiểm chứng:15 test liên quan PASS (13 ban đầu và2 regression mới), TypeScript PASS; chưa browser QA. Backup .checkpoints/admin-ui-20261111.

- 2026-11-11 audio-idle-local: User báo bản giữ gain0 trước vẫn trễ lần đầu sau idle. UI sửa interrupted/nonrunning resume, chủ động statechange/focus/visibility; gesture mới không bị chặn bởi resume cũ chờ autoplay. Dùng ConstantSource DC1/32768 chung thay graphzero, offset đặt ngay từ khi tạo node, mute/hidden gate và cleanup. GameSounds cache decodedbuffer, cue có sẵn start đồng bộ trước await; giữ volume/assets/intro/checkmate/countdown/nhạc nền.8suite48test PASS; Chrome AudioContext thật idle180s giữrunning/startUI11ms/move6.7ms, chưa đo âm ra loa/Bluetooth; DCintrinsic check đúng1LSB và idle10s start0.5/0.9ms. Backup .checkpoints/audio-idle-local-20261111, docs/AUDIO-IDLE.md. Fullbuild mãcuối đangchờ; chưaVPS. Gói ae912bddf415 cũ chưa chứa sửa này, phải refresh trước phát hành. Thay giải pháp oscillatorgain0 của10/11; không khẳng định triệt tiêu mọi độtrễ phầncứng.
- Kiểm chứng cuối admin UI2026-11-11: chạy lại5suite15/15PASS, tscPASS, Vite bundlePASS. Full npm build KHÔNG PASS: bước hovang-webp-finalpass lỗi ENOENT dist/assets/phong-tang-2-C0-SjYor.webp (PNG tồn tại, WebP thiếu). Không xác nhận dist sẵn sàng phát hành; giữ thay đổi source đã qua regression, chưa browserQA/deploy.

- 2026-11-11 animation-assets: User yêu cầu giữ nguyên hình thức/tốc độ animation, mạng chậm được chờ tải trước rồi phát hiệu ứng đồng nhất. OpeningCover dùng chung Game/Chọn Bàn/Chơi với máy/xếp thế chờ ảnh img, CSS background/border-image tải + decode, chừa hai frame chuẩn bị rồi phát nguyên keyframe/easing/600ms. Hiện spinner chung trong lúc chờ, ảnh lỗi không giữ màn vô hạn, unmount hủy listeners/frame/timer; callback mới không làm animation chạy lại. Bỏ qua nhánh display:none/hidden; vẫn tải artwork aria-hidden trong scene inert. Không sửa geometry/avatar/UI khóa/gameplay/clock/audio/server. Backup .checkpoints/animation-assets-20261111. 12/12 tests trên4suite PASS, diff-check PASS. Chưa đo FPS/browser/điện thoại thật; không kết luận hết mọi giật lag ở các animation khác. Không deploy; gói release cũ không chứa thay đổi này.

- Kiểm chứng cuối animation-assets2026-11-11:12/12 tests4suite PASS; mã cuối TypeScript/Vite PASS. Full npm run build cuối FAIL ở script ảnh finalpass do saved2.4741MiB dưới ngưỡng5MiB; không đổi script/ngưỡng/không tuyên bố fullbuildPASS (lượt build trước mãcuối đãPASS). Oxlint bịApplicationControl chặn nativebinding. Chưa browser/FPS/mobile QA; khôngdeploy. Log .checkpoints/animation-assets-20261111/build-final.log. Source giữ thay đổi đã được regression/typecheck/Vite xác minh; lỗi threshold là bước tối ưu artifact, không lỗi TypeScript/animation.

- 2026-11-11 audio-idle-local kết quả cuối:8suite49/49 PASS. Chromeidle180s PASS (UI11ms/move6.7ms scheduling), kiểm tra intrinsicDC/idle10s PASS(0.5/0.9ms), khôngđooutputphysical. Npmrunbuild mãcuối ởdistchung gặpENOENTfinalpassảnh; npmrunbuildsnapshotcáchly PASS đủTypeScript/Vite/2postbuild. Snapshot được sync hai file chuyển cảnh mới cập nhật song song (prepareSceneImages.ts/OpeningCover.tsx), đốichiếu toànsrc/server/publicchecksum PASS rồi mới cài distlatest vàverifyindexhash PASS. Checkpoint giữ các disttrước; source sửa khác đượcgiữ. Lượtcopydistđầu khởi động trước nguồnvalidationxong đãkhôngđạt vì2fileđổi; đãđónggóilạivàđốichiếuxongtrướclầncàicuối. KhôngVPS; candidateae912bddf415 cũkhôngcóaudiofixnày.
- 2026-11-11 piece-motion (đính chính animation-assets): User làm rõ chỉ yêu cầu tối ưu ANIMATION QUÂN CỜ DI CHUYỂN, không phải mở màn. Đã khôi phục OpeningCover và tests/opening-cover từ backup trước task animation-assets (SHA256 OpeningCover khớp), xóa helper prepareSceneImages; hủy quy tắc chờ ảnh/spinner mở màn vừa thêm. Giữ quỹ đạo33mẫu/nâng-hạ/easing/thời lượng400ms của quân, gameplay/clock/audio/avatar/UI khóa. Board memo đường đi theo tọa độ thay identity object, tránh restart khi snapshot cùng nước đi đi kèm selection update. ChessPiece giữ bộ lọc mặt quân ở ảnh ổn định, chuyển drop-shadow cùng thông số ra wrapper để không thay cả chuỗi xử lý mặt quân khi đi/hạ; ảnh decoding async. warmImageCache giữ15ảnh nguồn/decoded dùng chung (14quân+quânúp), không fetch/decode lặp theo mỗi nước, lỗi cho phép tải lại khi mở Board sau; áp dụng mọi nơi dùng Board/ChessPiece. Không thêm loading/đổi thời gian di chuyển hoặc đụng chuyển cảnh. Backup .checkpoints/piece-motion-20261111.35/35tests7suite PASS gồm quânđỏ/đen, nâng-hạ, ănquân, snapshot/marker online và warmcache; TypeScript/Vite buildcáchly PASS, diff-checksource PASS. Chưa đo FPS/browser/điệnthoạithật, không khẳng định hết mọi giật phầncứng/mạng. Chưa deploy; releasecandidate cũ chưa chứa thay đổi này.

- 2026-11-11 mobile match actions: User phản ánh Đi lại/Hoàn tác và Xin thua bị đưa lên cao, xác nhận muốn về giữa gần đáy, ngay trên hàng Back/Menu. MatchActions chỉ đổi compact top var→topauto/bottom56px, giữ size36/gap/thứtự/màu/callback vàdesktop. Không sửa useBoardLayout/avatar/gameplay.21/21tests3suite PASS; browser CSS thật vớicomponentmarkup ở320×568,360×640,390×844,430×932,568×320 đều bottom56px/height36,desktop1366×768 vẫnrelative. Screenshot390 kiểm tra khôngchồngBack/Menu. Buildsnapshotcáchly đanghoàntất, chưaVPS; backup .checkpoints/mobile-match-actions-20261111. GóiVPS ae912bddf415 cũ chưa chứa sửa mobile/audio mới.
- Piece-motion bổ sung2026-11-11: Khi scale responsive đổi giữa nước đi, PieceMotion giữ currentTime và trạng thái nâng do chọn ở đầu nước, không phát lại400ms từ đầu; không đổi33keyframe/easing. Regression đổi scale ở175ms xác nhận tiếp tục175ms và giữlift. Kiểm chứng mãcuối36/36tests7suite PASS +TypeScript/Vite buildcáchlyPASS. Bộảnh ở buildcáchly lượttrước đãqua cả2postbuildPASS; đangđónggóilại mãcuối. OpeningCover/test đãkhớpbackup trước sửa nhầm; không cònprepareSceneImages trongsource/bundle. ChưaFPS/browser/mobilethậtQA, khôngdeploy.

- Kiểm chứng bàn giao piece-motion2026-11-11: Mãcuối36/36tests7suite, TypeScript, Vite và2postbuild ởdist-final cáchlyPASS (finalpassAPPLIED/saved14.6394MiB). Đãbackupdistcũ rồicopydist-final vào board-game/dist, kiểm từngfileSHA256khớp. Khôngcònthayđổimởmànhiểunhầm; giữaudio/adminvàcácsrc khác hiệncó. ChưaFPS/browser/mobilethậtQA, khôngdeploy/VPS; artifactreleasecũcầnlàmmớinếupháthành.

- 2026-11-11 mobile actions đính chính theo user: KHÔNG neo sát đáy/bottom56px. Tâm cụm Đi lại/Xin thua phải nằm giữa mép dưới bàn cờ và mép dưới màn hình. useBoardLayout tínhmidpointtừgetBoundingClientRect trừnửachiềucaocụmnút/clamptrongmain, MatchActionscompactdùngvarnày/cófallback; desktopclass/size/callbackgiữnguyên.21/21tests PASS; Chromeharnesshook+componentthật ở5viewportmobile+desktop+đổilạimobile PASS tâmđúngmidpoint(<1px). npmrunbuildsnapshotcáchly PASS đủTypeScript/Vite/2postbuild; đốichiếufullsrc/server/publicPASS vàcàidistlocal/hashPASS. Giữmọisửaâmthanh/Boardhiệntại, chưaVPS; backup .checkpoints/mobile-match-actions-20261111. Thay quytắc bottom56px trongghi chútrước.
- 2026-11-11 iPad cover: User requires a rigid image-like scene, uniform scale in either orientation, centered brown frame and clipping overflow. fitIPadCanvas now uses max(width/1493,height/731) instead of min; existing centered iframe/transform origin and host clipping retained. Detect desktop-mode MacIntel iPad via multitouch without requiring Mobile UA. Backup .checkpoints/ipad-cover-20261111; rollback only src/ipadCanvas.ts and tests/ipad-canvas.test.ts from that checkpoint. 19/19 targeted tests PASS, npm typecheck PASS; Chrome real rendering harness PASS on 6 iPad portrait/landscape dimensions with centered uniform cover and one persistent iframe. No full production build, physical iPad QA or VPS deploy this task.

- 2026-11-11 mobile-motion recovery: User làm rõ chỉ điện thoại bị giật ở ONLINE và Cờ Tướng với máy; Cờ Úp máy mượt. Hủy yêu cầu rollback toàn VPS, giữ admin và laptop. Đã bỏ split-filter/warm15ảnh của task piece-motion trước; giữ path theo tọa độ và currentTime khi scale đổi. Compact Board Cờ Tướng dùng14mặt quân kết xuất từ đúng renderer cũ (108x112/DPR3), WebP lossless+sRGB ICC để postbuild không nén lossy lại; pixelRGB nhìnthấy/alpha khớp PNGnguồn (0delta). Không đổi glyph/màu/geometry/avatar/quỹđạo33mẫu/easing/400ms; bóng cùng9/13/4*scale. Desktop/CờÚp giữ renderer SVG cũ; ảnhcachedlỗi fallback renderer gốc. Chỉ GamePage mobileCờTướng bật chờ decodeảnh quân rồi2RAF trước OpeningCover600ms; spinnerchung khi chờ, unmount hủy, không đổi clock/server/audio.32/32tests5suite+TypeScriptPASS; localVite+2postbuildPASS,485filesdistSHAkhớp,14ảnhlosslessSHAgiữnguyên. Đãbackup/càilocaldist. ChromeactualCSS390x844DPR3/CPU4x xácnhận32cachedfaces/0SVGfilters/400ms/0restart, khôngexception; baseline32SVG. Hai phépđo tuần tự p95gap44.6→40.4ms/max96→68.9ms nhưng vẫn cógap>50ms; không tuyên bố hếtgiật/FPSđiệnthoạithật. Screenshot1110x1269 meanchannelDelta0.276/255,0.0245%channels>24 (lấymẫuảnh), đãxemlayout. Đo trước thiếumetaviewport/chạyđồngthời test không dùnglàmbằngchứngmobile. Backup/harness .checkpoints/piece-mobile-recovery-20261111 và board-game/.checkpoints/mobile-motion-qa.
- VPS2026-11-11: Read-only xácnhận current hovang-local-20261111-10fafbf55a51, cotuong-test.serviceactive; frontendliveindexSHA2c568b5f83323d63613057c7a48c6841c4dd217f36bc36dbdc7f0a8192b994ca. Hai release11/11 khác12srcfiles(kểcảBoard/ChessPiece/audio/admin), không đoán rollback. Theo userchuyểnlạifixmobilecảlocal/VPS, đãstaging từ đúngnpm-stage releasehiện tại, chỉpatchUI20files (kểindex),1823fileskhác giữSHA gồmadmin/server/public. BuildLinuxTypeScript/Vite/2postbuildPASS,485frontendfiles/14losslessassetshaPASS. GóiUI505files39299725bytes SHA06a6d89f7a2a39174401df4e2961e6af324e24b0eaa9a63110e4e0bdd1da6814 ở /home/cotuong_deploy/.cotuong-incoming/mobile-motion-20261111/mobile-motion-ui.tar.gz. Rootpublisher dựkiến clonehardlinkcurrent, thay riêngdist+sourceUI/giữoldhashedchunks, atomicswitchcurrent, checkindex/admin/health/PIDkhôngđổi, rollbackcurrentnếulỗi; KHÔNGrestart/DB/migrate. Publisher mới chỉ chuẩn bị local PythoncompilePASS/PowerShellparsePASS, chưa upload/chưaartifactpreflight/chưakíchhoạt. Auto-review đãREJECT lệnhuploadpublisher+SSHverify doAGENTS2026-10-22chỉLocal/lệnhthủcông/khôngSSH vàrootactivationrisk; khônglách, chờuserxácnhậnmởđúngphạmvi. Lệnh bịrejectkhông chạy bướcnào. VPSlivechưađổi. FileReview Outputs/Apply-Mobile-Motion-VPS-20261111.ps1; khôngchạy trướcxácnhận/verify. Admin4hash ghim trong ui-ready.json; không đổiUIadmin.

- 2026-11-11 mobile-motion VPS user đã xác nhận rõ “ok đưa lên lại vps nào”, mở đúng phạm vi SSH/cập nhật frontend mobile task này; không mở backend/DB/admin. SSH preflight xácnhận current vẫn hovang-local-20261111-10fafbf55a51, cotuong-test.serviceactive/PID330486, góiUI SHA06a6d89f7a2a39174401df4e2961e6af324e24b0eaa9a63110e4e0bdd1da6814khớp. Publisher đãupload, SHA015756f23251133cc1bca9ba6719ed3c0ccd538f3c0d8859ce22b87aa71c069akhớp; py_compilePASS và --verify-artifactPASS505files/adminPinned/productionChangedfalse. PowerShellclientparse+Bash-ntrênVPSPASS. Auto-reviewđãchophép các bướcSSHsauuserxácnhận. Chưa kíchhoạt: cotuong_deploy chỉNOPASSWD exact/usr/local/sbin/cotuong-deploy-activate(bộSHA40cũ/restart), khôngdùngđườngnàyđểláchquyền hoặc làmngắtván. Cáchfrontend-only cầnusernhập roottrực tiếp bằng Outputs/Apply-Mobile-Motion-VPS-20261111.ps1; clientSSHdeploy/suroot, installpublisherrootprivate+ghimchecksum, khôngghi/logmậtkhẩu. KhôngSSHroot, khôngđổiquyền/sudoers. Chờuserchạylệnhvàkiểmtra activation-result.json; VPSlivechưađổi/lệnhrootchưachạy. Khiuserchạyxong: xácnhậncurrentmobile-motion-20261111-06a6d89f7a2a, liveindexSHAa104dde79392b1084a06bba478dca0ee76ace7d8b1ba6646a1b656793925f900, admin/health200vàbackendPID330486khôngđổi. Nếucurrent/PIDđãđổibởi taskkhác, phảireviewlạikhôngépkíchhoạt.

- 2026-11-11 mobile-motion auth đính chính: User xác nhận mật khẩu đang có là nhat_hoang, không phải root; root Authentication failure không chứng minh mật khẩu nhat_hoang sai. Đọc readonlyVPS xácnhận nhat_hoang thuộcnhómsudo, PAMsu khôngbậtwheeldeny. Đãsửa đúng Outputs/Apply-Mobile-Motion-VPS-20261111.ps1: vẫnSSHcotuong_deploy, su nhat_hoang rồi sudo xác thực thôngthường bằngmậtkhẩunhat_hoang(usernhậptrựctiếpterminal,cóthể2lần). KhôngđổiSSHuserquảntrị/root, khôngđổisudoers/password, publisherSHA015756f23251133cc1bca9ba6719ed3c0ccd538f3c0d8859ce22b87aa71c069akhôngđổi. Phát hiện trước khiuserđăngnhậplạilỗi quoting quaPowerShell5.1 của cách&ssharglồng; sửaProcessStartInfo+Windowsnativeargumentquoting, testread-only cùng2lớpshell/sha256sum trênWindowsPowerShell5.1PASSpublisherOK. Sửa checksumprintfescape thànhecholineASCIIghimhash; verifytrựctiếpdeployPASS. Testfilebash-squaGetContentRaw bịCRLF(--\r), khôngdùngcáchpipeđóđểkíchhoạt. ClientcuốiparsePASS; userchưachạyclientnhat_hoang, chưadeploy/VPScurrentvẫnbảncũ. Khôngregenerateclientbằngfinalize-local.pycũvìcheckpointđóvẫndựngsuroot; clientOutputshiệntạilàbảnđúng.

- 2026-11-11 mobile-motion sudoTTY: User đãqua su nhat_hoang(passwordđúng), nhưngsudo báo a terminal is required; chưa thực thi rootpublisher. VPSreadonlyvẫncurrent10fafbf55a51/serviceactive/PID330486. su --help trênVPS xácnhận --pty hỗtrợ; cậpnhật client Outputs/Apply-Mobile-Motion-VPS-20261111.ps1 dùng su --pty nhat_hoang -c sudo... đểgiữPTYcho lời hỏi mật khẩu sudo, khôngdùng-S/askpass/ghi mật khẩu hayđổiquyền. PowerShell5.1 testreadonly bridgePTY(trả/dev/pts/1)+nestedchecksum publisherOK, finalclientparsePASS. ChỉmớikiểmtraTTYdướideploy, chưa tựxácthựcnhat_hoang/sudo hoặc activate; chờuserchạyclientmới. Publisher/codegói/VPSadmin/DB/backendkhôngđổi; cầnkiểmtraactivation-result saukhiuserchạyxong. Đây làlỗi clientthiếuPTY ởsu-c trướcđó, khôngyêucầuserđổimậtkhẩu.

- 2026-11-11 mobile-motion publisher v1 FAILED_ROLLED_BACK sauauththànhcông: Usernhậpcorrectnhat_hoang/sudo; publishercopiedcandidate/hashcheckxongnhưngđổicurrentkhôngđổitrangHTTP. NguyênnhânxácnhậnNginxlocation/proxyall127.0.0.1:3001; server/app.ts staticDirectory tính từimport.meta.urlđãrealpathlúcboot nênExpressvẫnđọcBASE/dist cũkhi giữprocesskhôngrestart. Đây làgiảđịnhsai trongpublishercủaagent, khôngphảimậtkhẩu/mạng. V1đãrollbackcurrent10fafbf55a51, backendactive/PID330486khôngđổi, liveindex2c568...nhưtrước; candidatev1retainedrootowned/chưapháthành.
- Đãsửa publisher-v2 SHA b2cca48c440ba367a980c817b19251f899bcb664ac435547e29ff9e16aeff884 (góiUI505files/505hash/32testsfrontendkhôngđổi). Candidate mobile-motion-20261111-06a6d89f7a2a-v2; dùngrenameat2RENAME_EXCHANGE đổi BASE/dist thậtthànhsymlinkcandidate/distnguyêntử, lưuoriginaldir BASE/dist.before-mobile-motion-06a6d89f7a2a-v2; vérifyHTTPnewtrướcđổicurrent, giữoldchunks, admin/serverinodes, backendPID. Rollbackv2khôiPHỤCCẢstaticpathlẫncurrent, khôngchỉđổicurrent. HandlerHUP/INT/TERM đượcghi report/rollback trongtry. Chưachạyrootv2, chờuserchạyOutputsclientđãupdatepinhash/sourcev2, vẫnsu--pty nhat_hoang/sudo2password, khôngđổiquyền.
- KiểmchứngthựcVPSdướideploy, fixture riêng /home/cotuong_deploy/publisher-v2-qa-* (khôngproduction): táihiệnv1currentđổinhưngExpressvẫntrangold; staticexchangePASS/rollbackPASS/PID+RAMcountergiữ. ChạyCHÍNHpublisher-v2 vớirootmetadata/systemctlhookmôphỏngvà505fileartifactthật trênExpressstaticpinnedfixture: successPASS vàforceHTTPmismatchSAUđổicurrent→rollbackPASS,oldchunksPASS,PID+RAMcountergiữ. Khôngelevate/khôngchạmproduction; fixtuređượcdọn. Hai lỗitestfixtuređãsửa: đườngdẫnẩn.cotuong-incoming khiếnExpresssendFileadmindotfiles404, chuyểntempvềhomekhôngẩn; URLold-chunkphải/assets/old-chunk.js. Remotev2py_compile+verify-artifact505PASS/localclientparsePASS. Prodpreflightcurrentvẫnold10faf/active/PID330486. LầnrootkếtiếpkiểmstatusACTIVATED,currentv2,HTMLa104...,PID330486,staticBackupđúng; nếurollbackthìbáoerrorcụthể(naykhôngđểAssertionErrorrỗng).

- 2026-11-11 MOBILE MOTION VPS ACTIVATED THÀNH CÔNG: User chạy clientv2/su--pty nhat_hoang/sudo thànhcông; publisher statusACTIVATED. Agent SSHreadonly kiểmtra lại current=/srv/cotuong/releases/mobile-motion-20261111-06a6d89f7a2a-v2, cotuong-test.serviceactive/MainPID330486 đúngPIDtrướcdeploy(khôngrestart), /api/healthstatusok. PublicHTTPS/ và/admin cùngSHAa104dde79392b1084a06bba478dca0ee76ace7d8b1ba6646a1b656793925f900 khớpnewindex. Public14ảnhmobileface và2JSrendererbundles đềuSHAkhớpstagedmanifest; /co-up-ong-hoang200/COOPsame-origin/COEPcredentiallessPASS. Admin4sourcehashgiữnguyên, khôngDBaction, retainedOldChunks28; UI505fileartifactgiữchecksumđãverify. Đãthaytrạngtháichờkíchhoạttrướcđó; websitehiệnđangphụcvụbảnsửamobile. CầnuserreloadtrangvàQAđiệnthoạithật, khôngtựkhẳngđịnhhếtmọigiậtGPU/mạng.
- Deploymentlayout sauv2: backendPID330486vẫnCWDreleasecũ hovang-local-20261111-10fafbf55a51; chínhBASE/distnaylàsymlinknewcandidate/dist đểExpresspinnedstaticpathđọcfrontendmới. Originalfrontenddirectorybackup tại /srv/cotuong/releases/hovang-local-20261111-10fafbf55a51/dist.before-mobile-motion-06a6d89f7a2a-v2. KHÔNGxóaoldBASEkhibackendcònchạyởđó. RollbackfrontendphảikhôiphụcCẢstaticpathnàyvàcurrent; chỉđổicurrentkhôngđủ. Candidatev1failedvẫngiữđểaudit; khôngtựcleanup/restart. Nginx/backend/config/auth/schemakhôngđổi. Bảnlocalđãcàifrontendđãtesttrước, VPSstagingdựatrênbaselinehiệntạigiữnguyêncácsrcngoàiphạmvi.

- 2026-11-11 mobile replay gap: User yêu cầu cụm nút tiến/lùi trên điện thoại không đè bàn, cách mép dưới bàn5px. useBoardLayout đo board-frame.bottom trừarena.top+5 và đặt --mobile-replay-controls-top trong nhánhcompact; dùng observer/resize sẵn có, không đo theo từngframe quânđi. GamePage navigation dưới Board neo top biếnchung/items-start, childscale giữ.78 vàorigin-top đểkhôngtrànngược lênkhi vùngdướithấp. KhiBỏAI gộpnavvàotools, tools dùngcùngtop+origin-top/scale.74; toolschưaBỏAIởheadergiữcũ. Desktop/boardgeometry/avatar/responsivecònkhác/callback/replaystate/audio/animationkhôngđổi. Backup .checkpoints/mobile-replay-gap-20261111/GamePage.tsx,useBoardLayout.ts. TypeScript/VitePASS; Chromeactualcomponents+hook ở320x568,360x640,390x844,430x932,568x320 x replay/trial/hidden-ai=15casesPASS,minGap=maxGap5px,0JSerrors; đãxemscreenshotmobile-controls.png. QAfixtureởboard-game/.checkpoints/mobile-motion-qa/controls.html. Chỉlocal; chưaSSH/deployVPS tasknày. BảnVPSmobile-motion...v2đangchạykhôngđổi.

- Bàn giao mobile replay gap2026-11-11: TypeScript/Vite/2postbuildPASS,15browsercasesPASSđúng5px; đãbackupdistlocalvàcàibuildmới/đốichiếuSHA256tấtcảfilekhớp. KhôngdeployVPS/khôngđổiadmin/backend. PhysicalmobileQA chưa làm; Chrome viewportQA đãxácnhậncụmkhôngđèBoard.

- 2026-11-11 room time/increment: User thêm Tạo bàn thời gianván1/2phút, tíchlũy1..10, giới hạnmỗinướckhôngvượtthờigianvánbanđầu. ROOM_MINUTESchungnay[1,2,3,5,10,15,30], dropdownChọnBànđồngbộtựđộng; mặcđịnh10phút/60s/khôngtíchlũygiữ. ROOM_INCREMENT_SECONDS0..10(0Không), roomTurnSecondsFor lọc[30,60,90,120]<=minutes*60; formclampkhiđổi1phút, thêmselecttíchlũy/mobilexếpdọc,desktop2ôcuốicùnghàng; chỉbốcụcTạoBàn. LuồngForm/useLobby/roomApi/controller/RoomService nối tham số cuối đểcaller cũgiữnguyên. RoomSnapshot.incrementSeconds; GameState.incrementMs chỉkhác0; enginecộngFischersaumỗinướchợplệchobênvừađi, khôngchoinvalid/sailượt/timeout/repetition, tổngthờigiancóthểvượtmốcbanđầunhờtíchlũynhưngperturncapgiữbanđầu. Reset/rematch/roomthếriêngiữconfig,undoSnapshotbỏcreditnướcđãhoàntác. CờTướng/CờÚpđềucó. Khôngthayclock/audio/luậtReady/Elo/gold/energy/avatar/UIkhóavùngkhác. DBinitial_stateJSONđãchứafield,migrationskhôngđổi. Backend/enginecóđổi nênlúcdeployphảicậpnhậtđồngbộ/kếhoạchrestartkhôngngắttrận, KHÔNGdùngpublisherfrontend-onlytasktrước.
- Kiểmchứngroomtime: baseline9/9PASS trước sửa; mãcuối79/79tests8suitePASS gồmHTTPcreatevàvalidationthật, mỗiincrement0..10, expiredmove, CờTướng/CờÚp, customroom, reset/takeback, UIclamp+forward, rules/store/locks/intro hồi quy; TypeScriptPASS. Chromeformthật9casesdesktop1366x768/mobile390x844/360x640 xnormal/locked/customPASS, desktopkhôngchồngnút/mobilecóthểcuộntớiallfields/submission1phút60s+10sđúng; đãxem2screenshot. Backup `.checkpoints/room-time-increment-20261111` (8sourcefiles), hướngdẫn `docs/ROOM-TIME-CONTROLS.md`. Chỉlocal,chưaSSH/deployVPS trongtask này. TypeScript/Vite/PNGpostbuildPASS, finalWebPpostbuild đangchờchốtkếtquả.

- Bàn giao room-time/increment2026-11-11:79/79tests8suite+TypeScript+Vite+2postbuildPASS,9browserformcasesPASS. Đãbackup/càidistlocalvàSHA256từngfilekhớp. KhôngSSH/deployVPS/khôngDBmigration. Cóbackend/enginechange nênVPSchưacó1/2phút/tíchlũychođếnkhideployđồngbộđúngsource, khôngtái dùnggóiUI-onlyanimation.

- 2026-11-11: Theo ảnh/user, nhãn Tạo bàn rút gọn thành Thời gian nước đi thay Thời gian tối đa mỗi nước đi trên cả mobile/desktop. Chỉ đổi nhãn và locator test liên quan, không đổi giới hạn/cấu hình/geometry. Backup .checkpoints/room-time-label-20261111. Chưa build/deploy lượt đổi chữ này.

- 2026-11-11: Theo user, hai nhãn Thời gian nước đi/Thời gian tích lũy tăng desktop2.2→2.7cqw bằng nhãn Thời gian chơi mỗi bên phía trên; mobile giữ4.6cqw đã bằng nhau. Không đổi ô chọn/cấu hình thời gian hoặc vùng khác. Backup .checkpoints/room-time-label-size-20261111/CreateRoomForm.tsx. Source/diff-checkPASS; chưa build/deploy lượt chữ này.

- 2026-11-11: Sửa Sẵn sàng sau khi kết thúc bàn Vị trí tùy chỉnh: Board gọi trial.reset thay match.start (useGame nhận replay nên start bỏ qua). Khôi phục đúng thế gốc bằng state trial riêng, không ghi gameStore/socket hoặc sửa UI/luật. Regression chiếu bí→reset, máy thường 3 engine qua 3 ván liên tiếp và replay isolation: 4 suite 22/22 PASS; TypeScript PASS. Chưa browser QA/build dist/VPS. Backup .checkpoints/computer-rematch-20261111.

- 2026-11-11 ĐÍNH CHÍNH TÍCH LŨY CÓ TRẦN: User chốt tích lũy cộng NGAY khi đi nước hợp lệ vào THỜI GIAN CÒN LẠI của bên vừa đi, tốiđa bằng mốc banđầu mỗi bên; không cộng vào thời gian mỗi nước/khôngchờanimation. Ví dụ1phút58s+5s=60s,40s+5s=45s. Quy tắc này thay/hủy phần FISCHER khônggiới hạn ghi trong lượtroom-time trước. Servertạo GameState.initialTimeMs=minutes*60000 khibậtincrement cho CờTướng/CờÚp/thếriêng; reset/rematchgiữcap; engineMath.min(cap,remaining+increment) trongapplyMoveWithResult. Gamekhôngincrementgiữnguyên; fallbacktrần10phútchogamelegacy/local thiếumetadata, onlinecấuhìnhmớiđềucómetadata từserver. Đi lại snapshotskhôiphụcđúngcap; nhánhTrialdùngđồnghồ10phútsẵn có thìđổicapclone10phút đểkhôngtrừnhầm xuống1phút, khôngmutatesource. Giới hạn nước đi/Elo/gold/energy/ready/audio/animationkhôngđổi. CómetadataJSONmới, khôngmigration.
- Kiểmchứngcapped-increment:94/94tests9suite+TypeScriptPASS, gồm0..10increments/đúngtrần1/2/3/5/10/15/30phút/ngay trongSnapshotcùnglastMove/cảhai màu/CờTướng/CờÚp/custom/reset/undo/timeout/HTTP/Trial/rules/store/locks. VitebuildPASS; đangchốthai bướcảnhvàdistlocal (gồmnhãnngắncỡchữlớn màuserđãchốt ở2lượttrước). Backup `.checkpoints/capped-room-increment-20261111`, tài liệuchuẩn docs/ROOM-TIME-CONTROLS.md đãsửanộidungtrầnnày. ChưaSSH/deployVPS/migrateDBtasknày.

- Bàn giao trần tích lũy2026-11-11:94/94tests9suite+TypeScript/Vite/2postbuildPASS; diffchecksourcePASS, đãbackup/càidistlocal485filesSHA256khớp. Build này gồm cả nhãnThời gian nướcđiđãrútgọn vàcỡchữhai nhãnbằngnhãntrênmàuserchốttừ2lượttrước. KiểmtraGamePage/useBetweenMatchClocks trongphaseplayinghiểnthịtrựctiếpgame.remainingTime, khôngchờanimation; creditcùngsnapshotvớilastMove. Chỉlocal; chưaSSH/deployVPS/DBmigration.

- 2026-11-11 đính chính theo user: Yêu cầu đấu máy là đổi bảng kết quả, không phải báo lỗi. Dùng artwork user gửi ĐỎ THẮNG/ĐEN THẮNG theo game.result.winner cho máy Cờ Tướng/Cờ Úp và positionTrial; không theo thắng/thua của người cầm quân. Online giữ victory/defeat cũ. Tái dùng vòng đời popup/đợi hiệu ứng và Xác nhận, vùng bấm phù hợp ảnh ngang; ảnh màu không có ô thưởng. 43/43 tests 4 suite + TypeScript/diff-check PASS. Đã xem ảnh đỏ sau cắt; chưa browser QA/build dist/deploy. Backup .checkpoints/computer-color-result-20261111.

- 2026-11-11 current-release: User yêu cầu kiểm tra bản hiện tại/các thay đổi rồi đưa VPS. Đã snapshot cô lập, đối chiếu với baseline10faf+mobilev2 hiện chạy. Phạm vi gồm popup máy theo màu/Readytrial, mobile replaygap, thời gian1/2phút + mỗi nước/tíchlũycótrần và iPadfallback hiện tại; admin/package/public không đổi runtime. Fullsuite lượt cuối243suite1300PASS/44SKIP/0FAIL; MySQLtạm43PASS; TypeScript/Vite/2postbuildPASS; GitleaksPASS; Chrome6popupcases mobile/desktop/ConfirmPASS, đãxemảnhsource+build. Sửa đúng1assertion ui.test.tsx từ5mốc sang7mốc đãchốt, backup có; rerunfullsuitePASS. Đãcài localdist487files/checksumPASS, disttrước ở .checkpoints/release-current-20261111/dist-before.
- CHƯA KÍCH HOẠT: VPSreadonly cuối currentmobile-motion-20261111-06a6d89f7a2a-v2/MainPID330486/healthok, HTMLa104dde79392b1084a06bba478dca0ee76ace7d8b1ba6646a1b656793925f900. Chờusernhậpnhat_hoang/sudo qua Outputs/Apply-Current-Release-VPS-20261111.ps1 (SSHcotuong_deploy/su--pty, khôngghi mật khẩu). Helperrootgiữpreviousrelease, kiểmtraactiveprivate/publicmatch trướcstop, backupDB+restore-drillscratch, verifySchema cảnew/rollback, KHÔNGmigrate, rồiswapcurrent/start/health/socket/public+admin. MớiđãcompilePython/Bash/PowerShellPASS và4rollbacksimulationPASS, chưachạybackuproot/restart. Newindexdựkiến dd3d7c6dfb5e17459328715627c9fe248e5c87fc5afb4c32435fa15b516a0190; kếtquảthật tại incoming/activation-result.json khiuserchạyxong. HelperSHA8f39e0cee6d8a1bbef3a2435fa0092a8dec8f5fe7f8fa2f79964fa0f35258370; metaSHA0874a7f953c42511c4ac1b467997056ca003170170aad764393abc61c41a5da5. Rollbackđãsửastopnewtrướcswapold/startold vàverifyoldindex; khôngchỉsystemctlstartkhiprocessnewcònactive.

- 2026-11-11 CURRENT RELEASE ĐÃ KÍCH HOẠT: User chạy client/su nhat_hoang/sudo thành công, BACKUP_RESTORE_VERIFIED và DEPLOY_SUCCESS. Agent SSHread-only xác nhận current=/srv/cotuong/releases/hovang-local-20261111-0a36c7056a4e; cotuong-test.service active/MainPID347991; activation-result.statusACTIVATED/migrations0, backup=/var/backups/hovang-local-20261111-0a36c7056a4e. Public/ và/admin cùngHTMLSHAdd3d7c6dfb5e17459328715627c9fe248e5c87fc5afb4c32435fa15b516a0190 đúngcandidate; /api/healthok vàSocket.IOhandshake0PASS. Public41JS/CSS+2artworkselected(trong41) đềuSHAkhớpmanifest, gồmred-wins-CeVFHFeF.webp/black-wins-DgUE8t3Q.webp; /co-up-ong-hoangHTTP200/COOPsame-origin/COEPcredentiallessPASS. Ghi đètrạng tháichờkíchhoạt ghi chútrước: bản mới đãlênVPS, córestartbackendđồngbộtime/increment; khôngmigration. Backup/bảncũgiữ, khôngcleanupoldreleases. ChưaQAđiệnthoạithật/đăngnhập/vánPvPthật trênVPS; khôngtạogame/account hoặcđổitàinguyênđểtest.

- 2026-11-12 theo user: Hiển thị tích lũy bằng huy hiệu tròn nhỏ số+chữs dùng IncrementBadge chung(20px/font10/s8), đọc game.incrementMs/1000. Laptop cạnh PHẢI từng đồng hồ, gapthực7px (liveboxbù1pxviền; recordedwrapperkhôngviền), giữ tâm/geometryđồnghồ/avatar. MobilethaySVGđồnghồcát giữa2đồnghồ bằngcùngbadge, giữgrid/clocks/sideorder; trườnghợpkhôngtíchlũyhiện0s. GamePage truyềncảhaiPlayerCard vàhaiMobileMatchSummary, gồmrecordedclocks; khôngđổiluậttíchlũy/backend. Backup .checkpoints/increment-badge-20261112.16/16tests3suite+TypeScriptPASS, Chromebundledrealcomponents8cases(390/1366×0/1/5/10s)PASS:20×20px/gap7px/mobilecenter/0JSerrors, đãxem2screenshot. Vite+2postbuildlượttrướcPASS nhưngbuildclean mãcuốibịchặn bởithayđổiđồngthờingoàitask: AdminPage.tsx import ./admin.css chưa có (mtime06:45:41). Khôngsửa/rollbackadmin, KHÔNGcài/ghiđèdist hoặcdeployVPStasknày. Không dùngbuildcũđểkhẳngđịnhbảnmớinhấttoànprojectbuildPASS.

- 2026-11-12 increment-badge cập nhật cuối: admin.css đã được tác vụ đồng thời bổ sung; build dist-ready Vite PASS và PNGpostbuild208convertedPASS. Tuy nhiên AdminAnalytics.tsx/admin.css tiếp tục được sửa SAU mốc dist-ready/index.html, nên không dùng build này ghi đè dist local. Phần4filehuyhiệu đã ghim source-hashes.json/Chrome8casesPASS; dist/VPS vẫn giữ nguyên. Không tiếp tục đuổi theo hoặc rollback tác vụ admin ngoài phạm vi.
- increment-badge kết quả build cuối: dist-ready đã PASS đủ Vite và2postbuild (239WebPoptimized/15skip), nhưng KHÔNG cài dist vì2fileadmin mới hơn index build. Không deploy. Kết quả kiểm tra UI16/16+TypeScript+Chrome8/8 giữ nguyên.

## 2026-11-12 — Admin UI và hai ô thời gian

- Backup: .checkpoints/admin-room-ui-20261112. Thay riêng CreateRoomForm/IncrementSelect, AdminPage/admin.css/AdminAnalytics/AdminSearchInput và test tương ứng.
- Mobile hai ô thời gian chung một hàng; laptop tích lũy mở xuống bằng portal ngoài clip, giữ dữ liệu/luật tích lũy đã chốt.
- Admin: nền xanh đậm/vàng, thẻ số liệu, điều hướng và bộ lọc, bảng và editor thống nhất; bỏ sidebar trống, đánh dấu tài khoản chọn. × ở hai ô ID/tên gọi lại API không lọc; analytics reset trang và quay về users.
- Chrome fixture dữ liệu giả: 9 trường hợp tạo bàn + admin desktop/mobile (tìm/xóa/chi tiết) PASS, không exception hoặc tràn ngang toàn trang. Đã xem ảnh menu desktop, form mobile 360, admin 1440/390 và editor. Không sửa dữ liệu thật/không SSH/deploy.

- Bàn giao 2026-11-12 admin/time UI: 21/21 tests (5 suite), TypeScript, Vite và hai postbuild PASS. Chrome 9 room cases + admin desktop/mobile PASS; ảnh đã xem. Đã sao lưu dist cũ và cài dist-final local 488 files, từng file SHA256 khớp. Chưa deploy VPS, chưa QA điện thoại thật; không thay backend/auth/DB hoặc UI game ngoài hai ô thời gian được yêu cầu.

- 2026-11-12 theo user tăng nhẹ huy hiệu tích lũy: IncrementBadge chung đường kính20→22px, số10→12px, chữs8→11px. Áp dụng tự động laptop/mobile/live/replay; giữ neo/gap7px và gridmobile, không đổi đồng hồ/avatar/luật. Badge22px vẫn vừa khe24px giữa hai đồng hồ mobile, còn1px mỗi phía. Backup .checkpoints/increment-badge-size-20261112. Đối chiếu source/diff PASS; chưa build/browser/VPS lượt tăng cỡ này.

- 2026-11-12 theo user tăng tiếp huy hiệu tích lũy và đổi cam sữa: IncrementBadge chung đường kính22→28px, số và chữs cùng15px (bỏsnhỏriêng), viền1px và chữ cùng#f0bd80, nền#503a23 nhưkhungđồnghồlaptop. Laptop giữneo/gap7px. Mobile nớicộtgiữa16→28px đểbadgekhôngđè2đồnghồ, giữcăngiữacụm/hướngclock/cỡ2clock; khôngđổiluật. Thaycỡ22/12/11 ởghi chútrước. Backup .checkpoints/increment-badge-orange-20261112. Source/diffcheckPASS; chưa build/browser/VPS lượtđổicỡmàunày.

## 2026-11-12 — Nhận vật phẩm một lần và kiểu menu tích lũy

- Backup: .checkpoints/reward-once-select-style-20261112, gồm store/hook/component nhận thưởng, IncrementSelect và test cũ.
- Ghi receipt sau khi bảng mở thành công; batch đang mở độc lập với pending đã tiêu thụ. Rời/về Home/remount không phát lại; đồ tới khi đang mở giữ cho lượt sau. Đọc storage mới nhất, nghe storage event, giữ ledger/các danh hiệu từng thấy. Profile thiếu inventory không lập baseline rỗng gây báo đồ cũ khi hydrate. Không đổi quyền sở hữu hoặc backend/DB.
- Menu tích lũy laptop dùng kiểu native trong ảnh tham chiếu: nâu/font Times/dòng xanh, không bo góc/checkmark; giữ mở xuống và cuộn.
- 17/17 tests, 4 suite + TypeScript PASS. Chrome 9 room cases + reward desktop/mobile PASS: receipt được tiêu thụ lúc bảng mở, không hiện lại sau rời/về Home hoặc remount, không exception. Đã xem ảnh menu và bảng mobile. Chưa kiểm tra thiết bị thật hoặc đồng bộ receipt server; chưa deploy VPS.
- Kiểm chứng bổ sung mã cuối: 18/18 tests trên 4 suite + TypeScript PASS, gồm đổi A→B→A không replay batch cũ, hydrate inventory không báo đồ cũ và đọc receipt tab khác. Chrome kiểm tra lại mã cuối PASS. Build source cuối đang hoàn tất cách ly trước khi cài dist.

- 2026-11-12 theo user thu nhẹ huy hiệu tích lũy: đường kính28→26px, số/chữs15→14px qua IncrementBadge chung laptop/mobile/live/replay. Giữ cam sữa#f0bd80, viền1px, nền/neo/gap và cộtgiữa28px. Backup .checkpoints/increment-badge-trim-20261112. Đối chiếu2sizetokensPASS; chưa build/browser/VPS lượtthu này.

- Bàn giao reward-once/select-style 2026-11-12: 18/18 tests (4 suite), TypeScript, Vite và 2 postbuild PASS; Chrome 9 form cases + reward laptop/mobile PASS, ảnh đã xem. Đã backup/cài dist-final local 488 files SHA256 từng file khớp; mã liên quan không mới hơn build. Không SSH/deploy VPS hoặc thay dữ liệu thật. Receipt chỉ lưu ở trình duyệt, không thêm đồng bộ server.

- 2026-11-12 theo ảnh user: menu tích lũy laptop căn trái, padding trái 20%/phải 15% cùng trường chọn thời gian nước đi; thay căn giữa và padding 12px của lượt trước. Chỉ khoảng đệm option, không đổi mobile/giá trị/luật. Backup .checkpoints/increment-menu-padding-20261112. TypeScript PASS; chưa build dist/browser/deploy lượt chỉnh nhỏ này.

- 2026-11-12 theo ảnh user: Tạo bàn mobile đưa công tắc Bàn khóa về cạnh phải nhãn ở bên trái hàng, justify-start/gap16px thay justify-between đẩy sát mép phải. Laptop, kích thước công tắc và hành vi khóa giữ nguyên. Backup .checkpoints/room-lock-toggle-left-20261112. Chỉ source local, chưa build/browser/VPS lượt chỉnh vị trí này.

## 2026-11-12 — Chuẩn bị phát hành UI local lên VPS (chưa kích hoạt)

User yêu cầu kiểm tra local và đưa lên. Đối chiếu manifest release VPS hovang-local-20261111-0a36c7056a4e: 13 file nguồn frontend thay đổi, không thay backend/public/package/index-source; loại file đối chiếu CustomPositionPage.tsx.githead khỏi gói, giữ local. Gồm admin mới + × tìm ID, form tạo bàn/2ô mobile/menu tích lũy + lề/công tắc trái, IncrementBadge 26px/chữ14/cam sữa và đồng hồ, nhận vật phẩm một lần. Không deploy toàn bộ local hoặc đưa file không liên quan.

Validation: fullsuite1308PASS/44SKIP/0FAIL; TypeScript/Vite/2postbuildPASS; Gitleaks không phát hiện secret. Chrome9roomcases + reward desktop/mobile PASS, công tắc cách nhãn16px/two-columns/menu-downward/receive-once; admin đã có QA2viewport từ task trước. Linux source typecheckPASS trên bản sao riêng của staging hiện chạy. Build image finalpass lượt đầu báo picture memory error; chưa ghi ảnh nào vì script chỉ apply sau khi kiểm tra toàn bộ. Chạy lại đúng artifact với VIPS_CONCURRENCY1 trên host PASS. Dist local đã backup và cài488files/SHA256từngfilekhớp.

Gói candidate ui-20261112-6db469245b9c:501files/38634523bytes, archiveSHA6db469245b9c1c2d6113abce4b616315154158f3178e812a31f9d06a4801eef4, indexSHA283b71c0e11f443185144bed4fc4561d67b0cd5a4f686b583bb7f70b73535459. Upload private incoming /home/cotuong_deploy/.cotuong-incoming/ui-20261112, checksum + --verify-artifact501PASS. Publisher root-pinned SHAafbf4174994282fbdc73b7a817322b15b1fcf3276c2594cc6bac9dd5f131e5ed, compilePASS/PS5.1parsePASS/bash-nPASS. Giữ127protectedruntimehashes và9prepatchhashes, PID347991/base release để chặn drift. Clone hardlink base, thay riêngdist+13src, giữoldchunks vàserverinode; atomically redirect pinnedBASE/dist rồicurrent. Không restart/backend/DB/migrate. Ghi backup dist.before-ui-refresh-6db469245b9c-v2 trong base. Rollback cả pinnedstaticpath và current, không chỉ current.

Đã chạy CHÍNH publisher mới trên fixture Express dưới deploy user: successPASS, forcedHTTPmismatch saucurrent-switch→rollbackPASS; PID/RAMcountergiữ. Không root/production trong test. Prodreadonly cuối vẫn current0a36/PID347991active/HTMLdd3d7c6dfb5e17459328715627c9fe248e5c87fc5afb4c32435fa15b516a0190. Chưa ACTIVATED. Client Outputs/Apply-Local-UI-VPS-20261112.ps1 dùngSSHcotuong_deploy/su--pty nhat_hoang/sudo, user nhập mật khẩu ở terminal, không lưu/log. Vì deployuser không có quyền ghi release/pinnedstatic, cần user chạy client để kích hoạt. Sau đó kiểmtra activation-result/publicHTMLnew/PIDgiữ/admin200/assets. Không dùng script release11/11 cho gói này.

## 2026-11-12 — Chia sẻ bản hiện tại qua GitHub

User yêu cầu đẩy bản hiện tại để người khác lấy về sửa. Tạo nhánh codex/share-current-20261112, đồng bộ CODEOWNERS mới từ origin/master; stage source/assets/migrations/tests và tài liệu có chọn lọc. Không đưa credential, env thật, executable/NNUE native, diagnostics, githead, build, dependency, checkpoint hoặc dữ liệu người dùng vào commit. Hướng dẫn nhận source: docs/DEVELOPMENT-HANDOFF.md.

Snapshot xuất từ Git index đã TypeScript/lint/Vite PASS, Gitleaks PASS; bản runtime local trước đó fullsuite1308PASS/44SKIP/0FAIL và fullbuildPASS. Không thay source runtime hoặc thao tác VPS trong task này. Hook pre-push giữ nguyên và phải chạy khi push. Biên nhận commit/remote lưu riêng .checkpoints/github-share-20261112.


- 2026-11-12 PR #35: user yêu cầu đưa nhánh chia sẻ lên master, mở quyền push master của task này. GitHub ruleset yêu cầu checks + Secret scan và 1 CODEOWNER approval; direct fast-forward bị chặn, không bypass. Tạo PR35 và bật squash auto-merge sau đủ điều kiện. CI code/tests/MySQL/build PASS, nhưng contract triển khai phát hiện tài liệu canonical còn ghi001–010 trong khi registry001–023. Chỉ cập nhật canonical range trong ops/vps-new/CI-CD.md và README.md, giữ checkpoint lịch sử. 11/11 Python contract tests PASS; không sửa SQL/workflow/backend hoặc VPS. Lượt duyệt CODEOWNER vẫn bắt buộc.
