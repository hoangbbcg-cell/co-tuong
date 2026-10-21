# Kiểm tra và sửa test CI — 2026-10-20

Phạm vi: sửa nguyên nhân 59 test lỗi của lần chạy ban đầu (314 đạt/59 lỗi/17 integration chưa bật), không đổi luật cờ/nghiệp vụ để vượt test. Không commit/push/SSH/deploy/VPS. Các thay đổi UI/avatar mobile có sẵn trong workspace thuộc task khác, không hoàn tác hoặc gộp thành sửa lỗi CI.

## Phân loại 59 lỗi ban đầu

Phân loại theo lỗi đầu tiên quan sát được; một test có thể lộ thêm kỳ vọng cũ sau khi sửa harness.

| File | Số lỗi | Nguyên nhân và cách xử lý |
|---|---:|---|
| chess-piece.test.tsx | 17 | Test DOM/asset/animation cũ: component đã dùng wrapper+img+SVG filter; marker đổi tên; WAAPI dùng translate3d. Test truy vấn đúng img/filter, vẫn kiểm tra đủ asset hai phe, marker/tọa độ, đường bay, tư thế cuối và cleanup. Không thay render/animation runtime. |
| energy.test.ts | 2 | Test cũ dùng hồi5 phút và trừ local. Quy tắc hiện hành hồi7 phút, local không trừ; online chỉ trừ một lần/người ngồi. Cập nhật mốc và kiểm tra charge/reset/giới hạn0. Giữ code nghiệp vụ. |
| repetition-ui.test.tsx | 3 | Actor không còn nhận thông báo khi click chấm đỏ; online gửi repetition-attempt chứ không commit move. Cảnh báo vòng3 chờ dismiss, không tự tắt5s. Cập nhật assertions và chờ Promise command, kiểm tra giữ board/lượt/animation/sound/selection và snapshot không lặp thông báo. |
| repetition.test.ts | 1 | Test server đi tiếp vòng4 khi chưa đóng cảnh báo vòng3. Thêm kiểm tra pause/chặn đi, rồi đóng bằng command có thật trước vòng4. Không sửa luật lặp. |
| rooms.test.ts | 7 | 6 lỗi do thông báo backend bị mojibake UTF-8 (5 invalid minutes,1 takeback); sửa literal thông báo đúng tiếng Việt, giữ điều kiện/logic. 1 test cũ từ chối người thứ3; quy tắc hiện hành cho vào khán giả, không chiếm ghế/ready. |
| room-users-panel.test.tsx | 1 | Thiếu QueryClientProvider sau khi avatar dùng Query; bổ sung harness thật. Sau đó phát hiện lỗi runtime aria-label “Thứ rự chờ”, sửa thành “Thứ tự chờ”, không đổi bố cục/avatar. |
| saved-match-history.test.tsx | 2 | Thiếu QueryClientProvider cho MessageAccountAvatar. Dùng helper QueryClient mới mỗi render và clear sau test. Giữ kiểm tra owner-first cho cả Đỏ/Đen. |
| ui.test.tsx | 21 | Harness jsdom thiếu document.fonts/AudioContext/media Promise/scrollTo, state không reset đầy đủ, CSS responsive không được nạp. Mock đúng browser boundary, giữ các test audio riêng thật, mô phỏng desktop:hidden trong test và reset store. Sau sửa harness, cập nhật điều khiển/fixture theo luồng đã chốt: Home Cờ Úp online, hết đối thủ tạo bàn chờ, máy basic cầm Đỏ/người Đen, vào bàn đầy để xem, dropdown option, hồ sơ đóng ngoài/Đăng xuất, popup kết quả. Phát hiện OpeningCover1500ms trái tài liệu600ms: đã hỏi và user chọn khôi phục600ms; sửa token thời gian chung, test chờ cover và kiểm tra board khóa. Thêm test riêng giữ coverage lật quân Cờ Úp local. |
| user-repository.test.ts | 1 | Fixture tên Guest cũ; ACCOUNT-MODEL.md đã đính chính Guest+5 số, guest_code6 số. Cập nhật fixture/SQL params, giữ kiểm tra BIGINT string/parameterization/release và rename atomic. |
| country-picker.test.tsx | 2 | Timeout ở chế độ worker mặc định; chạy lại nguyên test với2 worker đạt, không đổi timeout/assertion. |
| profile-rank-sync.test.tsx | 1 | Timeout do cùng áp lực worker; giữ nguyên bài test. |
| shop-page.test.tsx | 1 | Timeout do cùng áp lực worker; giữ nguyên bài test. |
| **Tổng** | **59** | **28 lỗi harness/môi trường,25 kỳ vọng cũ,6 lỗi thông báo code thật theo lỗi đầu tiên.** Lỗi aria-label thật lộ sau khi sửa harness được ghi riêng, không cộng trùng vào59. |

Chạy lại baseline trước sửa với `--maxWorkers=2`:319 đạt/54 lỗi/17 chưa bật; 5 timeout ban đầu không còn (gồm1 test UI). Log ghi88 worker được spawn trong toàn lượt chạy, không chứng minh88 worker chạy cùng lúc. Sau tối ưu truy vấn, lượt full2 worker đã đạt0 lỗi nhưng lượt xác minh sau có timeout chuyển màn không ổn định. Cấu hình bàn giao giới hạn1 worker cho cả npm test Local và CI, vẫn isolate từng file; không tăng timeout, không bỏ file, không thêm skip/only/retry để che lỗi.

## Quy tắc dùng để đối chiếu

- `docs/REPETITION-RULES.md`: vòng3 pause đến khi người chơi đóng, chấm đỏ chỉ báo đối thủ và không commit nước.
- `docs/ACCOUNT-MODEL.md`: đính chính Guest+5 số và mã nội bộ6 số.
- AGENTS/PROJECT-MEMORY: hồi năng lượng7 phút, local miễn; Home nhanh/Cờ Úp online; khán giả khi đủ ghế; máy basic Đỏ/người Đen; popup kết quả thay thông báo chữ cũ.
- Component/hook hiện có là căn cứ cho chi tiết DOM/assets/browser API; không sửa nghiệp vụ để làm khớp test cũ.

Các mock trong UI regression chỉ thay API trình duyệt không có ở jsdom và server boundary được test giả lập; không sửa app runtime thành no-op. Bộ home-music/game-sounds/move-sound/audio-preferences vẫn chạy kiểm tra audio riêng. QueryClient là provider thật, không mock useQuery trả dữ liệu giả.

Trong lượt full đầu sau sửa (369 đạt/5 lỗi/17 integration chưa bật),4 test UI vẫn vượt5s do truy vấn role toàn bộ cây có nhiều dialog lớn đóng sẵn;1 fixture phòng thiếu province nên bị bộ lọc khu vực loại đúng. Đã scope truy vấn bàn vào `#board`, khai báo province thật của fixture, reset store và clear QueryClient sau test, mock mặc định danh sách phòng ở boundary để không gọi server thật. Không tăng timeout. Lượt UI riêng sau đó23/23 đạt; kiểm tra full tiếp theo mới là kết quả bàn giao.

Lượt full tiếp theo373 đạt/1 timeout chat/17 integration chưa bật: giữ các assertions chat, emoji, XSS và navigation/đổi tên; tách hai trách nhiệm độc lập thành2 test và dùng truy vấn aria-label trực tiếp cho chat thay vì tính accessible name toàn cây. Thêm2 regression cho OpeningCover600ms (fallback đúng mốc/hủy khi unmount và WAAPI cả2panel/onfinish/cleanup). Không xóa bài test hoặc chuyển lỗi thành skip.

## Kết quả bàn giao 2026-10-21

Lượt full cuối `ci-tests-serial.json`:**378 đạt/0 lỗi/17 integration chưa bật, tổng395**, exit0.17 test integration vốn được gate bởi DB_INTEGRATION đã chạy riêng qua `npm run db:integration`:**17/17 đạt** trên MySQL8.0.45 tạm/cổng33319, migrate30 bước rồi chạy lại0, verify/smoke đạt. Như vậy395 bài được thực thi qua hai luồng đúng môi trường. Không kết nối database người dùng hoặc VPS để bật chúng.

`npm run typecheck` đạt; `npm run build` cuối gồm typecheck đạt, dist index-WmLSGyiZ.js cập nhật. Local Node24.21.0/Windows; GitHub Node22/Ubuntu chưa chạy vì chưa push. Báo cáo JSON/log Local được gitignore, không commit.

Khi đối chiếu danh sách test trước/sau phát hiện workspace có thay đổi ngoài phần CI: file tracked `tests/avatar-comparison.test.tsx` bị xóa cùng UI So sánh độ nét A/B/C trong AvatarCustomization. User xác nhận cho bỏ phần so sánh độ nét. Đã giữ việc bỏ UI, khôi phục file test và chuyển regression sang hợp đồng còn hiệu lực: xem trước/chọn không tự equip hoặc đổi avatar đang dùng, Hủy giữ lựa chọn hiện hành, Sử dụng áp dụng đúng avatar/khung và không áp dụng trùng. Không khôi phục tính năng A/B/C đã bỏ. Test riêng1/1 và full suite cuối đều đạt.

Đối chiếu JSON baseline với lượt cuối:0 file test bị mất,0 file giảm số case, tập17 test gate bởi DB_INTEGRATION không đổi. Tổng390→395 (thêm5 case); không thêm skip/only/retry và không tăng timeout để làm CI xanh. MaxWorkers1 là giới hạn tài nguyên theo file, không tắt isolate hoặc concurrency bên trong các test transaction/Promise.all.

## Các file thuộc phần sửa CI

- Runtime: `server/services/roomService.ts` chỉ sửa literal tiếng Việt bị lỗi mã hóa; `src/features/game/components/RoomUsersPanel.tsx` sửa aria-label thứ tự chờ; `src/features/game/components/OpeningCover.tsx` khôi phục600ms theo xác nhận user. Không sửa engine/rules/gameplay/database schema.
- Test: các file trong bảng phân loại được cập nhật khi cần; country-picker/profile-rank-sync/shop-page không sửa. Thêm `tests/helpers/renderWithQuery.tsx`, `tests/opening-cover.test.tsx`, giữ/cập nhật `tests/avatar-comparison.test.tsx` theo quyết định bỏ A/B/C. Test audio chuyên biệt giữ nguyên và vẫn chạy.
- Config: `vite.config.ts` maxWorkers1; `.gitignore` bỏ qua JSON chẩn đoán Local. Không thay script npm/dependency hoặc giới hạn kiểm tra trong workflow.
- Tài liệu: file này, CI-CD.md, PROJECT-MEMORY.md, PROGRESS.md và ghi nhớ quyết định user trong AGENTS.md.

Chưa commit, push, deploy hoặc SSH/VPS; chưa browser QA. Các thay đổi avatar/profile mobile ngoài phạm vi CI trong workspace được giữ nguyên, không nhận là phần sửa luật/CI của task này.

## GitHub Ubuntu regression — 2026-10-21

GitHub CI do user chạy báo `373 PASS / 2 FAIL / 23 SKIP` (398 test). Cả hai lỗi thuộc test/harness: `ui.test.tsx` tìm theo tên duy nhất trong khi header có hai nút Rời phòng cho desktop và menu mobile; `mobile-preview-route.test.ts` khởi tạo app trước bước build nên checkout Ubuntu sạch không có `dist/index.html`, làm `sendFile` trả404. Không đổi UI, route production, luật cờ hoặc nghiệp vụ; không bỏ test.

Sửa UI test truy vấn theo role trong banner rồi chọn nút header `id=backButton`. Route test tạo fixture `index.html` trong thư mục tạm; `createApplication` nhận `staticDirectory` tùy chọn cho test, mặc định production vẫn dùng `dist`. Test xác nhận cả `/mobile-preview` và `/mobile-preview/` trả HTML200. Không cần đổi thứ tự bước workflow hoặc build giả trước test.

Đối chiếu 398 test sau sửa trên Local Windows: `381 PASS / 17 SKIP`; chênh đúng6 skip do 6 test gọi Pikafish thật chỉ bật khi có binary Windows. Ubuntu không có binary này nên chúng skip có điều kiện. 17 MySQL integration test là nhóm DB gate riêng, không được coi là bỏ qua: `npm run db:integration` dùng MySQL8 tạm chạy `17/17 PASS`, migrate30/rerun0, verify/smoke PASS. Tổng số test giữ nguyên398; không thêm `skip`, `only`, retry hoặc tăng timeout. Kết quả GitHub sau khi cập nhật PR chưa xác nhận vì chưa push.

Workflow Actions được cập nhật `checkout@v7` và `setup-node@v7` trong CI; deploy workflow chỉ nâng checkout. Runtime project vẫn Node22. Các release mới dùng Node24 cho runtime của action và yêu cầu runner hỗ trợ Node24; GitHub-hosted `ubuntu-24.04` đáp ứng. Không thể đọc log cảnh báo cụ thể của lần PR qua trình duyệt trong phiên này; cập nhật xử lý cảnh báo runtime Node20 của các major cũ theo release chính thức. Chưa merge/deploy.
