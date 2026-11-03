
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
