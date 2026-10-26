# Kiểm tra import HOVANG — 2026-10-25

## Nguyên nhân

Các file gọi HOVANG đã được Git theo dõi, nhưng ba module sau chỉ tồn tại Local và bị `board-game/.gitignore` loại khỏi Git:

- `src/services/hovang.ts`
- `server/controllers/hovangController.ts`
- `server/services/hovangService.ts`

Đường dẫn tương đối và chữ hoa/thường khớp file thực tế. Checkout Git sạch thiếu module nên TypeScript báo TS2307; Local có file nên typecheck vẫn đạt. Service còn phụ thuộc binary HOVANG được ignore riêng.

Người dùng xác nhận giữ HOVANG chỉ Local, bản GitHub dùng Pikafish. Vì vậy không bổ sung ba module vào Git và không bỏ kiểm tra TypeScript. Gỡ tích hợp HOVANG khỏi runtime được theo dõi; giữ Pikafish và máy cơ bản. Không sửa thuật toán engine hoặc luật game.

## File runtime sửa trong task

- `server/app.ts`: gỡ import, route và vòng đời HOVANG.
- `src/features/game/hooks/useComputer.ts`: gỡ API HOVANG.
- `src/features/game/hooks/useGame.ts`: gỡ nhãn HOVANG.
- `src/features/lobby/hooks/useComputerSetup.ts`: dùng Pikafish cho thiết lập máy.
- `src/features/lobby/hooks/useHome.ts`: gỡ entry HOVANG.
- `src/store/sessionStore.ts`: bỏ lựa chọn HOVANG khỏi kiểu engine.
- `src/features/lobby/components/ComputerSetup.tsx`: nhãn Pikafish hiện hành.
- `src/features/lobby/components/ComputerSetupDesktop.tsx`: nhãn Pikafish hiện hành.
- `src/pages/game/GamePage.tsx`: gỡ nhãn HOVANG.
- `src/pages/home/HomePage.tsx`: gỡ nút HOVANG.
- `src/pages/home/MobileHome.tsx`: gỡ nút HOVANG.

`PROGRESS.md` và `docs/PROJECT-MEMORY.md` được bổ sung kết quả. Không sửa workflow, ignore rules hoặc test.

## Giữ phần Local

Source, adapter, binary và tests HOVANG ignored vẫn nguyên trên máy. Tích hợp UI/backend HOVANG không hoạt động trong cây runtime đã sửa cho GitHub. Bản trước khi sửa và bản vá khôi phục nằm trong thư mục ignored:

`board-game/.checkpoints/hovang-local-before-ci-20261025/`

- `restore-hovang.patch`: khôi phục tích hợp Local; đã qua `git apply --check --ignore-space-change` trên workspace sau sửa. Chỉ dùng sau khi đã lưu riêng thay đổi GitHub, nếu muốn bật lại Local.
- `github-pikafish-only.patch`: chỉ các hunk sửa CI từ HEAD; không chứa UI đang sửa ở task khác. Khi chuẩn bị Git phải chọn đúng hunk, không stage toàn bộ các file có thay đổi UI sẵn.

## Kiểm chứng

- Workspace hiện tại sau khi cập nhật test theo hành vi đã triển khai: `npm run build` PASS (bao gồm typecheck); `npm test -- --maxWorkers=2`: 423 PASS, 21 SKIP, 0 FAIL trên 444 test/102 file.
- Build sinh `dist/assets/index-bCogFuoX.js`; bundle client không chứa tham chiếu HOVANG.
- Không còn chuỗi HOVANG trong source TypeScript runtime được Git theo dõi.

Các test lỗi có thể tái hiện đã được sửa assertion/fixture để khớp API và hành vi hiện tại; không xóa test hoặc thêm skip. Trong 14 lỗi ban đầu, 4 lỗi (country-picker và3 test UI) không tái hiện ở lượt chạy tập trung/full suite cuối nên chưa kết luận được nguyên nhân riêng. Không phát hiện lỗi luật/runtime trong nhóm tái hiện. Phần cập nhật test này không sửa luật/runtime game và không đụng thuật toán hay file HOVANG Local. Các skip 21 test là điều kiện sẵn có. Build vẫn có cảnh báo kích thước chunk lớn hơn 500 kB.

Kết quả snapshot `git archive HEAD` ở lượt kiểm tra HOVANG ban đầu là lịch sử trước khi cập nhật các test ở trên; không đại diện cho kết quả workspace hiện tại.

## CI PR #5 — run 40275314056 (2026-10-26)

Log đầy đủ của job `checks` trên SHA `f5ce3c2c8b881412fb5d73ea611e5fd4f6fc81a8` có 58 diagnostic TypeScript. Run dừng ở `npm run typecheck`, vì vậy job chưa chạy tests hoặc build. Nhóm lỗi `dailyShop` (không tìm thấy module và implicit `any` cho `item`, `id`, `seen`) bắt nguồn từ các module nguồn được import nhưng chưa được theo dõi trong Git; tổng thể có nhiều module frontend/backend tương tự. Kiểm tra file thực tế xác nhận `src/types/dailyShop.ts` tồn tại local, đường dẫn tương đối và chữ hoa/thường khớp, và `.gitignore` không loại file này. Đây là file cần thêm vào Git cùng các module phụ thuộc, asset runtime, migration và regression tests đang thiếu; không phải lỗi thuật toán hoặc luật game.

Đã stage 76 file cần thiết. Không stage HOVANG source/binary; các ngoại lệ local HOVANG vẫn được giữ nguyên. Clean checkout từ SHA CI cộng các file đã chọn xác nhận typecheck PASS, full tests 447 PASS/26 SKIP/0 FAIL và build PASS. Chưa commit, push, merge hoặc deploy.

Không commit, push, merge, deploy, kết nối VPS hoặc thay đổi database.
