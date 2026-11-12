# Bản chia sẻ cho người phát triển — 2026-11-12

Nhánh: `codex/share-current-20261112` trong `hoangbbcg-cell/co-tuong`.

```sh
git clone --branch codex/share-current-20261112 git@github.com:hoangbbcg-cell/co-tuong.git
cd co-tuong/board-game
npm ci
npm run dev
```

Dùng Node từ 22.12 trở lên. Đọc `../AGENTS.md`, `AGENTS.md`, `../AI WORK RULES.md` và `docs/PROJECT-MEMORY.md` trước khi sửa.

Tạo `.env` riêng từ `.env.example` và cấu hình MySQL của môi trường phát triển theo `docs/MYSQL-INTEGRATION.md`. Không sử dụng tài khoản hoặc database production. Các migration mới gồm 021, 022, 023; dùng quy trình migrate/verify trong tài liệu trên database phát triển của bạn.

Source và asset của giao diện hiện tại, admin, đồng hồ/tích lũy, thông báo nhận vật phẩm, online và kiểm thử được đưa vào nhánh này. `.env`, mật khẩu admin, khóa ký/SSH, dữ liệu DB, uploads người dùng, `node_modules`, `dist`, các bản sao lưu và nhật ký máy local không được chia sẻ. Native executable/NNUE cần cấu hình riêng nếu kiểm tra máy native; xem `docs/FAIRY-STOCKFISH-INTEGRATION.md` và `engines/pikafish/README.md`. Không cần các binary này để chỉnh giao diện hoặc chạy bộ test thông thường.

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

Kiểm chứng trước chia sẻ: bộ test local có 1.308 PASS, 44 SKIP, 0 FAIL. Snapshot chỉ gồm các file được stage đã qua TypeScript, lint và Vite; full build local qua hai postbuild ảnh. Quét secret bằng Gitleaks đạt. Đây là nhánh để lấy về sửa, không tự triển khai VPS.
