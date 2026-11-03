# HOVANG - GOOGLE H5 ADS TECHNICAL HANDOFF

## Current status

Project: HOVANG Co Tuong Online
Environment: LOCAL Windows only

Google H5 Games Ads application:
- Submitted on 2026-11-01.
- Approval has not yet been confirmed.
- Commercial Google H5 Ads remain disabled.

## Verified checkpoints

A6.1 - Application submitted: COMPLETE.

A6.2 - Google H5 adapter:
- Earlier targeted QA: 46/46 PASS.

A6.3 - Browser SDK:
- NOT READY.
- Coc Coc: SDK main script loaded, onReady not received.
- Chrome: SDK main script loaded, onReady not received.
- Edge: SDK main script loaded, onReady not received.
- Coc Coc previously reported ERR_BLOCKED_BY_ADMINISTRATOR.
- Root cause remains UNCONFIRMED.
- Do not mark browser QA as PASS.

A6.3.6 - Failsafe:
- VERIFIED PASS on 2026-11-01.
- 32/32 targeted tests PASS.
- TypeScript typecheck PASS.
- 15-second timeout protects pre-ad waiting state.
- Timeout must not interrupt an already started ad.
- Late callbacks are isolated from newer requests.
- SDK timeout does not cancel an internal Google request.

A6.3.7 - Temporary SDK page cleanup:
- VERIFIED PASS on 2026-11-01.
- 32/32 targeted tests PASS.
- TypeScript typecheck PASS.
- h5-sdk-local-test.html removed from project root.
- Backup:
  C:\Users\NHAT HOANG\Downloads\HOVANG-A637-BACKUP-20261101-120347\h5-sdk-local-test.html

## Local Mock Ad - V4.1

Previously manually verified:
- Accumulate 2 distinct online matches.
- Exiting mid-match may count if the match is eligible.
- Maximum 1 ad per room exit.
- Counter resets after triggering.
- Browser-local storage; not account synchronized.
- Mock only in development mode.

Do not change this logic as part of Google SDK approval work.

## Remaining roadmap

A6.3 Browser SDK:
- Pending successful real-browser initialization.

A6.4 Commercial Google Ads:
- BLOCKED until Google approval.
- Confirm publisher account and allowed integration.
- Verify production-domain configuration.
- Verify real SDK lifecycle on approved environment.
- Confirm no ad blocks game navigation.
- Confirm audio restores after advertisement.
- Check Google ad placement policies.
- Enable production feature flag only after review.

## Safety rules

- All development changes on LOCAL Windows only.
- Do not modify VPS or production without explicit authorization.
- Do not enable commercial advertising before approval.
- Before code edits: explain scope and risks.
- Preserve backup and rollback.
- Run targeted tests and TypeScript typecheck.
- Record verified results in docs/AI_CHANGELOG.md.
- Never claim an unexecuted test has passed.

## Separate project backlog

Notification roadmap:
- Step 5: Admin event and maintenance management.
- DEFERRED; not removed or completed.

## Next action

Wait for Google H5 Games Ads approval.
Meanwhile, continue unrelated HOVANG development safely.
- 2026-11-02: Theo user, bỏ quảng cáo demo và giữ điểm phát để nối quảng cáo thật sau. Home bỏ nhánhDEV/state/markup MockInterstitialAd, xóa component demo và test countdown riêng. Mọi môi trường dùng cùng homeInterstitial.request() tại vị trí return Home; giữ takeOnlineAdOffer chống lặp, tích lũy2ván/điều kiện rời online, rewarded provider và cờ H5false. Chưa có quảng cáo thật thì fail-open không chặn Home/không nhận thưởng. Backup outputs/backups/remove-demo-ads-20261102; phục hồi đúng4file nếu cần.6suite ads32/32 PASS, npm.cmd run build TypeScript/Vite PASS, dist không chứa demo. Chưa browser/SDKthật QA; không bật quảng cáo thật/deploy.

- 2026-11-02: Theo user, bổ sung placement Xem quảng cáo30s sau này. ENERGY_REWARDED_AD_PLACEMENT energy_watch_ad/requestedDurationSeconds30 truyền vào RewardedAdProvider.show; cả Xem video trong Năng lượng và EnergyNotice gọi rewardedAds chung. Provider hiện null: không demo/countdown giả/không tự cấp năng lượng; unavailable/error giữ thông báo cũ. SDK thật sau này phải hỗ trợ creative30s; đây là thời lượng yêu cầu, không timer ép ngắt quảng cáo hoặc bằng chứng cấp thưởng. Interstitial returnHome giữ riêng. Backup outputs/backups/rewarded-ad-placement-20261102. rewardedAds+adsHomeIntegration10/10 PASS; TypeScript/Vite build PASS, dist có placement. Chưa SDK/browser thật QA.
