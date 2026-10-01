# Cờ Tướng

Ứng dụng React + TypeScript: chơi hai người trên cùng thiết bị hoặc hai client qua phòng online. Giữ bàn cờ, tài nguyên, đồng hồ 10 phút, animation, cầu hòa, xin thua, reset, chat, emoji và tin nhắn nhanh của bản cũ.

## Chạy development

Yêu cầu Node.js 22.12+ (đã kiểm tra trên Node 24), npm. Từ thư mục `board-game/`:

```sh
npm ci
npm run dev
```

Frontend: `http://127.0.0.1:5173`. Backend: `http://127.0.0.1:3001`.
Vite proxy `/api` và `/socket.io` sang backend. Nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd` thay cho `npm`.
Không dùng Live Server hoặc mở `index.html` bằng `file://` cho bản React.

## Chơi

- Home → **Chơi Với Máy** → **Pikafish** → chọn phe → **Đấu ngay** → **Sẵn sàng** để đấu engine Pikafish thật. Backend phải chạy; xem [cài đặt và giấy phép Pikafish/NNUE](engines/pikafish/README.md).

- Khi mở trang, bấm **Sẵn sàng** để hai người chơi luân phiên trên cùng thiết bị (không phải AI).
- Bấm **Rời phòng** để đổi tên, chọn chơi cùng máy hoặc tạo/vào phòng online.
- Để thử online: mở hai tab, vào cùng phòng, cả hai bấm **Sẵn sàng**. Mỗi client chỉ đi quân thuộc phe server đã cấp.
- Cầu hòa online cần đối thủ chấp nhận. Xin thua, hết giờ hoặc rời/mất kết nối khi đang chơi sẽ kết thúc ván.
- Chỉ chơi lại online khi ván chưa bắt đầu hoặc đã kết thúc. Cả hai phải sẵn sàng lại.
- Chat giới hạn 300 ký tự/tin, giữ 100 tin gần nhất. React hiển thị nội dung dạng text.

## Lệnh

```sh
npm run typecheck   # TypeScript strict, cả frontend/backend/test
npm test            # Vitest: luật, store, service, HTTP/socket và React
node tests/smoke.mjs # Entry point smoke tương thích, chạy cùng bộ Vitest
npm run build       # Kiểm tra kiểu và build frontend vào dist/
npm start           # Backend phục vụ cả dist/, API và socket tại cổng 3001
```

`npm run dev:web` / `npm run dev:server` chạy riêng từng phần. `npm run preview` chỉ xem frontend build, không thay cho `npm start` khi kiểm tra online.
Backend đọc biến môi trường `PORT` (mặc định 3001), `HOST` (mặc định 127.0.0.1). Bản build dùng cùng origin cho API/socket. Muốn dùng cổng backend khác khi dev, cập nhật proxy trong `vite.config.ts`.

## Cấu trúc

```text
src/
  app/                 App, providers, vòng đời socket, cấu hình Tailwind/font
  features/
    game/components/   UI bàn cờ, người chơi, thao tác, chat
    game/hooks/        Nối UI với state, animation, clock, chat, kích thước
    lobby/components/  UI danh sách và tạo/vào phòng
    lobby/hooks/       Query/mutation phòng và dialog
  pages/game/          Ghép màn hình
  game/rules/          Luật cờ thuần, không DOM/React/socket
  game/state/          Khởi tạo, hằng số, selectors
  game/moves/          Nước đi, đồng hồ, kết thúc ván bất biến
  services/            Axios API, Socket.IO client
  store/               Zustand: ván local và phiên/phòng
  types/               Hợp đồng game/phòng/event dùng chung
  lib/                 Định dạng dùng chung
  assets/              Hình, font, giấy phép và nguồn gốc tài nguyên
server/
  controllers/         HTTP/socket transport, chuyển dữ liệu đến service
  services/            Business logic phòng, phe, luật, clock, chat
  repositories/        Lưu trữ phòng trong bộ nhớ
  app.ts               Lắp ghép server để chạy/test
  index.ts             Listen và shutdown
tests/                 Regression và integration tests
```

React và React DOM render UI; Zustand giữ client state; TanStack Query giữ trạng thái danh sách phòng; Axios gọi HTTP; Socket.IO đồng bộ phòng; Express cung cấp API. Toàn bộ style giao diện nằm trong utility Tailwind tại component; các class button dùng chung ở `src/lib/uiClasses.ts`. `src/app/styles/index.css` chỉ chứa import Tailwind, theme font, breakpoint variants và @font-face. Tọa độ/scale/giá trị animation tính lúc chạy dùng style hoặc biến CSS. TypeScript, Vite, tsx và concurrently phục vụ dev/build; Vitest, Testing Library và jsdom kiểm tra logic/UI.

Các thư mục gốc `js/`, `assets/` được giữ làm bản đối chiếu sau migration; entry React không tải chúng. Các file CSS giao diện cũ đã được xóa sau khi chuyển sang Tailwind. Mọi thay đổi mới thực hiện trong `src/` và `server/`.

## Quyết định và giới hạn

- Server xác thực phe, lượt, tọa độ, luật và thời gian. Frontend online chỉ preview; không tự quyết định nước đi hoặc kết quả.
- Local dùng cùng engine thuần, animation có thể hủy bằng reset. Online dùng đồng hồ server và cập nhật bàn ngay khi server chấp nhận nước đi.
- Repository hiện lưu RAM: restart server mất phòng/chat/ván. Chưa tích hợp Prisma/MySQL, tài khoản, lịch sử hoặc ELO thật. ELO hiện vẫn là số minh họa từ giao diện cũ.
- Phiên online là khách theo kết nối socket, tối đa hai người/phòng. Chưa có spectator hoặc khôi phục ván sau reconnect; mất kết nối giải phóng ghế và xử thua ván đang chơi.
- Có giới hạn phòng, payload và tần suất socket cơ bản; đây chưa phải hệ thống multiplayer đã triển khai production.
- Chưa có xử phạt chiếu dai/đuổi quân/lặp nước theo luật giải đấu.
- Test DOM không thay thế kiểm tra hình ảnh desktop/mobile. Phiên migration chưa kiểm tra trực quan vì không có trình duyệt được kết nối.

Quy tắc làm việc: xem `../AGENTS.md`. Tiến độ: `../PROGRESS.md`.
