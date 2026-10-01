# Hướng dẫn làm việc

- Trước khi truy cập hoặc làm việc với mã nguồn project, bắt buộc đọc `AGENTS.md` và `AI WORK RULES.md`, rồi tuân thủ cả hai file.

## Phạm vi và ưu tiên

- Mặc định mọi task dùng phạm vi nhỏ nhất có thể. Người dùng không cần lặp lại yêu cầu này ở mỗi prompt.

- Với task nhỏ, chỉ tìm và đọc file trực tiếp chứa chức năng cần sửa và style/dependency trực tiếp liên quan. Chỉ mở thêm file khi thật sự cần để hiểu hoặc sửa đúng.

- Không tự đọc rộng sang backend, game logic, socket, AI, page khác hoặc module khác nếu task hiện tại không liên quan.

- Không scan/đọc toàn project để “hiểu trước” cho task nhỏ. Chỉ đọc rộng khi task thực sự liên quan nhiều tầng hoặc người dùng yêu cầu rõ.

- Khi đã đủ bằng chứng để sửa đúng thì dừng tìm kiếm và bắt đầu sửa; không tiếp tục mở file chỉ để tham khảo.

- Áp dụng toàn project; ứng dụng nằm trong `board-game/`.

- Khi người dùng đánh dấu một file, component, asset, khu vực UI hoặc hành vi cụ thể là “khóa”, giữ nguyên phạm vi đó trong các task sau. Nếu người dùng yêu cầu sửa trực tiếp phần đang khóa, chưa chỉnh ngay: nêu rõ phần đang khóa và hỏi họ có đồng ý mở khóa không. Chỉ sửa phần bị khóa sau khi họ xác nhận rõ việc mở khóa; yêu cầu sửa thông thường không tự mở khóa. Quy tắc này không yêu cầu xin duyệt thay đổi ở nơi khác chỉ vì thay đổi đó có thể ảnh hưởng đến phần đang khóa. Ghi chính xác các phạm vi đang khóa vào mục tương ứng trong `PROGRESS.md` và chỉ xóa khỏi danh sách sau khi người dùng đồng ý mở khóa.

- Ưu tiên đúng chức năng, không phá tính năng cũ, dễ hiểu, tách trách nhiệm, test được, rồi mới tối ưu/làm đẹp.

- Trước task xác định mục tiêu, file liên quan và phần không cần đụng. Search hàm/event/type cụ thể, không đọc toàn project cho bug nhỏ.

- Được sửa bug/refactor cần thiết trực tiếp. Không đổi UI, gameplay, kiến trúc ngoài yêu cầu; ghi chú vấn đề khác trừ khi chặn task.

## Kiến trúc đã chốt

- Người dùng yêu cầu migration thực tế ngày 2026-09-16: React + TypeScript + Tailwind + Zustand + TanStack Query + Axios; Express + Socket.IO cho phòng online.

- `board-game/index.html` → `src/main.tsx` → providers → App → GamePage. Dùng Vite, không còn entry JavaScript/DOM cũ.

- App mở HomePage mặc định; session store quản lý screen home/rooms/game. Vào bàn local/online chuyển sang GamePage, rời/mất kết nối quay về HomePage. Hook useHome xử lý tương tác trang chủ, useLobby giữ API phòng.

- Chọn Bàn là RoomSelectionPage riêng (screen rooms), không phải modal phủ Home; dùng hiệu ứng mở 600ms. Phòng online hỗ trợ 3/5/10/15/30 phút mỗi bên (mặc định 10); server xác thực minutes, khởi tạo clock và giữ cấu hình khi reset. Chơi nhanh chỉ ghép bàn khả dụng cùng thời gian.

- Home: chỉ Chọn Bàn mở RoomSelectionPage. Chơi Nhanh tại Home lấy danh sách mới và vào thẳng bàn khả dụng, ưu tiên bàn có một người chờ, không lọc thời gian; hết bàn thì mở ván local mode computer với Máy · Cơ bản. Lỗi mạng vẫn báo lỗi. Bộ lọc thời gian của Chơi nhanh trong RoomSelectionPage vẫn áp dụng riêng.

- Máy cơ bản trong luồng demo hiện tại: máy đỏ đi trước, người chơi đen; chọn nước hợp lệ ưu tiên ăn quân tại game/moves/computer.ts. Hook useComputer quản lý delay 500ms và hủy khi reset/rời/kết thúc; sau khi máy hoàn tất nước thứ hai thì gửi một yêu cầu Đi lại thử. Pikafish giữ phe người dùng chọn và delay tối thiểu 550ms; không phải engine AI mạnh. Người chơi luôn hiển thị bên trái; nếu cầm Đen thì bàn cờ đảo hướng để quân Đen ở dưới. Giữ Sẵn sàng/khai cuộc 1300ms; local hai người không đổi.

- Home Cờ Úp mở GamePage cùng giao diện, game.variant jieqi và mode computer. Khởi tạo tại game/state/hidden.ts, store cung cấp mẫu xáo; 30 quân úp và hai Tướng ngửa. Piece.type là loại di chuyển hiện tại; concealed giữ loại thật đến khi applyMove lật. Sĩ/Tượng jieqi đã lật bỏ giới hạn cung/sông, vẫn chặn mắt; UI không lộ danh tính quân úp, máy không đánh giá theo danh tính ẩn. Cờ Úp mới hỗ trợ local với máy, chưa online; quy ước tại game/state/hidden-rules.md.

- Luật và engine TypeScript thuần ở `src/game/`, frontend/server cùng import. Không phụ thuộc React, DOM, network hoặc Zustand.

- Local state dùng Zustand; server state danh sách phòng dùng Query; snapshot phòng online lấy từ socket. Không đưa query data trùng lặp vào nhiều store.

- Backend Controller → Service → Repository. Lưu RAM là quyết định hiện tại. Chưa có database/auth; không tạo folder rỗng giả như đã triển khai.

- Khi có persistence: Prisma chỉ ở Repository; Service không query Prisma. MySQL/Prisma cần task cấu hình và lưu dữ liệu cụ thể.

## Trách nhiệm thư mục

- Xếp hạng/Bạn bè dùng chung SocialAvatar, socialPanelClass, socialActionButton/socialActionStyle tại `src/features/lobby/components/SocialUi.tsx`. Huy hiệu hạng 1–3 nằm trong assets/rankings/*-v2.png; hạng 4 trở đi dùng rank-plain-frame.png và số HTML/Tailwind, nguồn ghi ở badges-v2.md. Dữ liệu Xếp hạng vẫn minh họa.

- Trong Danh hiệu, mục Tất cả luôn nhóm theo thứ tự: Vinh Quang Kỳ Đài → Danh Hiệu Phong Tặng → Chuỗi Chiến Thắng → Tổng Ván Chơi → Online Chuyên Cần. Bên trong Vinh Quang Kỳ Đài luôn xếp Khung Thi Đấu 1, 2, 3 theo thứ tự, lần lượt mang tên Quán Quân, Á Quân, Top 3. Giữ các thứ tự này khi bổ sung danh hiệu.
- Danh hiệu người chơi chọn hiển thị trong hồ sơ xếp nhóm trước theo thứ tự của mục Tất cả: Vinh Quang Kỳ Đài → Danh Hiệu Phong Tặng → Chuỗi Chiến Thắng → Tổng Ván Chơi → Online Chuyên Cần. Sau đó xếp cấp khung tăng dần trong từng nhóm, rồi theo thứ tự khai báo trong catalog; không dùng thời điểm chọn làm thứ tự.
- Quy tắc màu, cấp khung, nội dung gắn với cấp và mã nội bộ của cả năm nhóm danh hiệu được ghi tại `board-game/docs/HONOR-SYSTEM.md`; xem đây là tài liệu chuẩn khi thêm/chỉnh asset hoặc dữ liệu danh hiệu.

- Chọn Bàn (2026-09-19): khung ngoài như Home (lề ngang desktop 120px, compact 6px), header gọn như Chơi Với Máy (56/48px). Nền trong khung dùng lại `src/assets/nền máy.png` từ Chơi Với Máy; header, khung danh sách, nút và icon cắt từ `src/assets/chọn bàn.png`, lưu ở `src/assets/room-selection/` cùng tọa độ nguồn. Hai nút lọc dùng Tailwind nền kem khi chọn/nâu khi chưa chọn, kích thước 140×34px. Bốn nút tiện ích Cúp/Loa/Bạn bè/Video dùng homeUtilityButton và HomeIcon SVG chung với Home (48×48px). Hai ô đầu dùng toàn mặt nút ảnh brown-button.png từ custom-position.png qua border-image slice 14 fill, width 12px giữ góc; Chơi nhanh dùng red-button.png từ start-match.png, chữ/icon nguồn được thay bằng nền cùng ảnh để đặt nội dung HTML. Khung danh sách dùng border-image từ asset với borderImageWidth ghi rõ đơn vị px để giữ góc khi đổi kích thước; nội dung/phòng/số người vẫn lấy state/API thật, không dùng screenshot tĩnh thay điều khiển. Giữ hiệu ứng 600ms và luồng tạo/vào/lọc/chọn thời gian.

- Home Chơi Với Máy mở ComputerPage riêng (`screen computer`), dùng khung Home và hiệu ứng useRoomEntrance 600ms. Từ 2026-09-21, Pikafish là lựa chọn đầu tiên/mặc định trong hai ô máy; Đấu ngay kiểm tra engine rồi tạo ván local với phe Đỏ/Đen/Ngẫu nhiên. Máy · Cơ bản vẫn chọn được; Vị trí tùy chỉnh/Cờ thế chưa hỗ trợ. Máy ở Chơi Nhanh/Cờ Úp giữ nguyên. Dùng background hiện tại; nội dung co theo vùng dưới header bằng useComputerLayout (tối đa 85%), không cuộn dọc; tiêu đề/robot/nút/banner dùng ảnh cắt lưu tại src/assets/computer-setup/ cùng tọa độ nguồn.

- Pikafish native + NNUE chính thức ở `board-game/engines/pikafish/`, chạy server qua UCI, không import vào engine thuần hoặc bundle frontend. Luồng: useComputer → Axios pikafishApi → pikafishController → PikafishService → tiến trình engine. Service dựng lại thế cờ từ lịch sử UCI đã kiểm tra, kiểm tra bestmove; không tác động phòng online. Session lưu computerEngine/humanSide; gameStore lưu lịch sử nước đã áp dụng, reset xóa. Hủy request/tính toán khi reset/rời/kết thúc, bỏ phản hồi cũ; lỗi hiện nút thử lại. Mặc định tối đa 4 threads, Hash 128 MB, 1 giây/nước giảm theo clock; tối đa 2 tiến trình, timeout 15 giây, lịch sử tối đa 500 nửa-nước. Giữ giấy phép GPL engine và giấy phép NNUE riêng (không thương mại khi chưa có phép); xem engines/pikafish/README.md.

- `src/app/`: khởi tạo, providers, vòng đời kết nối; `app/styles/index.css`: chỉ import Tailwind, theme font, custom breakpoint variants và @font-face.

- `src/features/game/components/`: UI thuần qua props; `hooks/`: nối UI với state/logic, clock, animation, chat, kích thước.
- Nút chụp ảnh dùng `src/features/game/hooks/useScreenshotRenderer.ts` để xuất trực tiếp `main[data-screenshot-root]` đang hiển thị bằng `html-to-image.toBlob`, `pixelRatio: 1`. Các phần tử ngoài main và phần tử gắn `data-screenshot-exclude="true"`, `role="status"` hoặc `role="alert"` không xuất hiện trong PNG. Screenshot không dùng worker dựng lại giao diện.

- `src/features/lobby/components/`: UI phòng; `hooks/`: Query/mutation, tạo/vào phòng và dialog.

- `src/pages/game/`: ghép các component/hook thành màn hình.

- `src/game/rules/`: luật di chuyển, chiếu, nước hợp lệ; `state/`: khởi tạo/hằng số/selectors; `moves/`: nước đi, clock, kết thúc ván bất biến.

- `src/services/`: Axios/API, Socket.IO; `src/store/`: Zustand game local và phiên chơi.

- `src/types/`: kiểu game/phòng/socket dùng chung; `src/lib/`: tiện ích; `src/assets/`: tài nguyên và giấy phép.

- `server/controllers/`: nhận HTTP/event, gọi service, trả response/phát snapshot; không chứa luật game.

- `server/services/`: xác thực input, thành viên/phe/lượt, business logic phòng, chat, clock.

- `server/repositories/`: truy cập dữ liệu; hiện Map trong bộ nhớ.

- `server/app.ts`: lắp ghép server test được; `server/index.ts`: listen/shutdown.

- `tests/`: Vitest cho engine/store/service, tích hợp HTTP/socket, React bằng jsdom. `tests/smoke.mjs` gọi cùng bộ test.

- `board-game/js`, `assets` là bản gốc giữ để đối chiếu; entry React không import. Các stylesheet giao diện cũ đã được chuyển sang Tailwind và xóa theo yêu cầu; không sửa nhầm bản gốc thay cho `src/`.

## Data flow

- Local: component → hook → Zustand action → engine/rules → state mới → React render. Animation ở hook; reset vô hiệu hóa callback cũ bằng version.

- Online: component → hook → service socket → Controller → RoomService → engine xác thực → Repository → snapshot socket → session store → React.

- Phòng online cho phép người vào khi đủ ghế hoặc đang chơi tham gia với vai trò người xem. `RoomSnapshot.viewers` lưu người xem và trạng thái hàng chờ; panel chỉ hiện người xem, queue controls chỉ dành cho họ, còn lệnh ván cờ chỉ dành cho người đang ngồi. Khi ván kết thúc có người thắng và có hàng chờ, chỉ người thắng nhận lời mời đấu với người đầu hàng; chấp nhận thay ghế người thua bằng người đó và đưa người thua xuống cuối hàng, từ chối giữ nguyên hai ghế. Khi người chơi rời phòng giữa ván, vẫn xử thua và lấp ghế trống bằng người đầu hàng nếu có. Người xem vẫn có thể chat và theo dõi snapshot.

- Danh sách phòng: hook Query → Axios → HTTP Controller → Service → Repository. Tạo/vào phòng invalidate danh sách.

- Server là nguồn sự thật online; không nhận board, phe hoặc kết quả do client tự khai. Frontend chỉ preview nước hợp lệ.

- Đồng hồ local dùng performance.now; đồng hồ online do server tính. Online không dừng clock vì animation hoặc dialog phía client.
- Mỗi lượt tối đa 60 giây: nền xanh bán trong suốt phủ đầy avatar lúc đầu rồi rút theo chiều kim đồng hồ; viền xanh rút đúng cùng cung. Khi hết 60 giây, dừng clock tại mốc đó và người đang đi thua; giới hạn tổng thời gian ván vẫn được áp dụng nếu hết trước.

- Khai cuộc: local/server trì hoãn mốc bắt đầu clock 1300ms và khóa nước đi trong khoảng này; hiệu ứng frontend dài 1,3 giây. Server tự quyết định mốc thời gian, không chờ animation client.

## Luật và hành vi cần bảo toàn

- Bàn 10×9, 32 quân ban đầu, đỏ đi trước, luân phiên; không ăn quân cùng bên.

- Tướng đi ngang/dọc một ô trong cung; không để hai tướng đối mặt. Sĩ đi chéo một ô trong cung.

- Tượng đi chéo hai ô, không qua sông/chặn mắt; mã không bị cản chân; xe không xuyên quân.

- Pháo đi thẳng; khi ăn có đúng một ngòi. Tốt đi tới; qua sông đi ngang, không lùi.

- Cấm nước tự làm tướng mình bị chiếu; hết nước hợp lệ cũng thua. Hết giờ/xin thua/ăn tướng/chiếu bí kết thúc ván; hòa cần đồng thuận.

- Hai người online cùng sẵn sàng mới bắt đầu. Không reset ván online đang diễn ra. Rời/mất kết nối xử thua và giải phóng ghế; chưa có resume.

- Chat là text, tối đa 300 ký tự/tin, 100 tin gần nhất. Không render HTML người dùng.

- Luật lặp nước/chiếu dai/đuổi quân chưa triển khai; không tuyên bố hỗ trợ giải đấu.

## Coding và sửa bug

- TypeScript strict, ES modules, UTF-8. Dùng import type cho type; component không chứa luật hoặc gọi API trực tiếp.

- Giao diện dùng utility Tailwind ngay trong component; chuỗi class dùng chung ở `src/lib/uiClasses.ts`. Không thêm stylesheet selector riêng hoặc @apply để khôi phục CSS cũ. Class phải viết đầy đủ để Tailwind quét được.

- Ngoại lệ theo yêu cầu người dùng: `src/features/game/components/piece-text.css` chứa class hiệu ứng chữ quân cờ và bốn biến thể màu; chỉ áp dụng cho `PieceText`, không áp dụng lên khung quân hoặc vùng `board-hit`.

- Giữ breakpoint compact ≤800px, desktop ≥801px và các mốc chiều cao 690/620px. Các giá trị tọa độ/scale/animation tính lúc chạy có thể dùng style hoặc CSS custom property; font local khai báo bằng @font-face.

- Tầng rules/moves không có side effect; không sửa board đầu vào. Không dùng any để bỏ qua hợp đồng dữ liệu; validate input tại server.

- Đọc file liên quan, phân loại UI/state/rules/API/socket/backend, truy đúng data flow và nguyên nhân gốc. Chỉ mở rộng tìm kiếm khi thiếu bằng chứng; dừng khi đủ.

- Sửa ở tầng chịu trách nhiệm. Không vá UI cho lỗi logic/backend; không refactor chỉ để đẹp.

- Chạy test phù hợp và thêm regression nhỏ khi hợp lý. Thay đổi rộng cần typecheck/build và test; UI test DOM không thay browser QA.

- Báo ngắn gọn nguyên nhân/phạm vi, file sửa, cách sửa và kết quả/giới hạn kiểm chứng.

## Dependency và lệnh

- Trước khi cài thư viện mới, giải thích ngắn gọn công dụng. Chỉ thêm khi có lợi ích rõ; tránh trùng chức năng hoặc thư viện cho vài dòng code.

- Dependency phải được import/sử dụng thực tế. Commit package.json và package-lock.json cùng nhau; không cài global.

- Từ `board-game/`: `npm ci`, `npm run dev`, `npm test`, `npm run typecheck`, `npm run build`.

- Sau mỗi nhiệm vụ có thay đổi project, bắt buộc chạy `npm run build` từ `board-game/` trước khi bàn giao để cập nhật `dist/`.

- `npm start` phục vụ dist + API/socket tại 3001 sau build. Dev Vite 5173 proxy backend 3001. Không dùng Live Server/file://.

- Windows PowerShell chặn npm.ps1: dùng npm.cmd. Sandbox hiện có thể chặn tsx đọc os.userInfo; đó là giới hạn môi trường, không vá dependency để né.

## Duy trì

- Cập nhật AGENTS.md khi thay đổi kiến trúc/quy tắc; cập nhật PROGRESS.md ngắn gọn theo kết quả thực tế.

- Giữ assets/font license/nguồn gốc khi di chuyển. Không xóa tính năng hoạt động nếu không cần thiết.

- Chưa có auth, DB, ELO thật, sp    



# UI IMPLEMENTATION RULES

## Reference images
Các ảnh trong:
docs/ui-reference/

là SOURCE OF TRUTH cho giao diện.

Khi tôi yêu cầu làm một màn hình dựa trên ảnh reference:

1. KHÔNG tự redesign.
2. KHÔNG tự thay đổi layout.
3. KHÔNG tự chọn lại màu sắc.
4. KHÔNG tự thay font, font-size, font-weight.
5. KHÔNG tự thay spacing, padding, margin.
6. KHÔNG tự thay border-radius, shadow, border.
7. KHÔNG thêm component hoặc nội dung không có trong mẫu.

Mục tiêu là tái tạo giao diện càng sát reference càng tốt.

## Quy trình bắt buộc

Trước khi code:
- Kiểm tra reference image tương ứng.
- Kiểm tra component/style hiện có trong project.
- Tái sử dụng component hiện có nếu phù hợp.
- Không viết lại component đã tồn tại.

Sau khi code:
- So sánh implementation với reference.
- Kiểm tra kích thước, vị trí, khoảng cách, màu,
  typography, border, radius và alignment.
- Nếu khác reference thì tự sửa trước khi hoàn thành.

## Asset cropping và transparency

### Quy chuẩn tight-crop toàn project

- Mọi hình ảnh, icon và button image mới tạo hoặc đưa vào giao diện phải được xử lý sát viền tuyệt đối. Nội dung nhìn thấy phải chạm bounding box của file; không để khoảng trắng, vùng transparent hoặc pixel thừa ở bất kỳ cạnh nào.
- Sau khi tạo ảnh, bắt buộc kiểm tra bounding box của toàn bộ pixel nhìn thấy và crop đúng bounding box đó. Nếu nền trong suốt thì phải cắt bỏ toàn bộ vùng transparent dư.
- Không tự thêm khung, viền, padding, shadow, background hoặc khoảng trống ngoài ảnh nếu người dùng không yêu cầu. Không dùng màu nền để che phần dư; phải sửa đúng file ảnh hoặc kích thước container.
- Wrapper `button`, `div`, `span` dùng riêng để chứa ảnh phải ôm sát ảnh: `width: fit-content; height: fit-content; padding: 0; margin: 0; border: none; background: transparent; box-shadow: none; line-height: 0;`. Không để `min-width`, `min-height`, padding mặc định của button hoặc CSS global làm wrapper lớn hơn ảnh.
- Thẻ `img` ưu tiên `display: block; margin: 0; padding: 0; border: 0;`. Nếu cần bo góc thì bo trực tiếp theo hình ảnh, không tạo lớp nền lớn hơn ảnh.
- Trước khi hoàn thành phải kiểm tra: kích thước file ảnh, vùng transparent, kích thước element HTML, và padding/margin/border của wrapper.
- Asset còn dư viền dù chỉ vài pixel được xem là chưa đạt. Quy chuẩn này áp dụng cố định cho toàn bộ project, trừ khi người dùng nói rõ ảnh cần khoảng thở hoặc padding.

- Khi cắt asset từ ảnh reference, phải trim sát phần hình cần dùng; không để dải nền, viền ảnh chụp hoặc khoảng trống thừa bao quanh.
- Phần ngoài hình cần dùng phải có alpha trong suốt thật, không dùng màu nền giả để che.
- Avatar hiển thị trong từng hàng Bạn bè dùng chung `src/assets/icons/avatar.svg`, có nền xanh đậm/hình kỳ sĩ vàng; bọc bằng vòng vàng gradient theo avatar Home và không dùng ảnh chân dung/danh hiệu riêng.
- Hai nút Mời chơi và Nhắn tin trong hàng Bạn bè dùng asset cắt từ `friends-list-source.png` (`friend-invite-button.png`, `friend-chat-button.png`) với góc ngoài alpha trong suốt; không dựng lại gradient, viền hoặc icon bằng CSS/SVG.
- Giữ nguyên nội dung, tỷ lệ, màu và chi tiết của asset gốc; không tự vẽ lại hoặc làm biến dạng khi chỉ được yêu cầu cắt nền.
- Trước khi thay vào UI, kiểm tra kích thước crop và alpha ở các góc; component hiển thị asset bằng `object-contain` khi cần giữ trọn hình.

## Existing UI

Nếu một phần giao diện đã được tôi duyệt:

KHÔNG được thay đổi nó khi làm feature khác,
trừ khi tôi yêu cầu rõ ràng.

Không refactor CSS/UI ngoài phạm vi task.

## Design tokens

- Honor badge layout: use the shared `HONOR_BADGE_ASPECT_CLASS` (`aspect-[3/1]`) in `ProfileDialog.tsx` for every award frame so all frame slots match the Quán Quân/Á Quân/Top 3 reference. Center each title over its frame above the artwork; keep cards equal-sized and aligned in horizontal rows with consistent gaps. When a row is incomplete, center that row.
- Shared selection palette reference: selected uses a dark brown gradient `#613014` → `#241007` with a bright gold border `#ffe08b`, gold glow `#f8b73c`, and cream text `#ffe5a6`; unselected uses a deeper brown gradient `#3e200e` → `#1c0e07`, border `#79501e`, muted cream text `#d6b982`. Reusable Tailwind classes live in `board-game/src/lib/uiClasses.ts` as `selectionPalette`; use them for future selected/unselected controls.
- Dragon avatar frame sizing: use the shared `AvatarFrameOverlay` component. Its measured standard is a 166px frame over a 128px avatar (129.6875%), centered at 50%/50%; the overlay scales from its avatar-sized parent, so keep the parent positioned and sized to the avatar. Reuse this component wherever the dragon frame appears so profile, preview, and thumbnails preserve the same ratio when resized. Frame-selection thumbnails show the frame art only, without an avatar inside.
- “Tỷ lệ avata” means the avatar plus the title plaque beneath it. Its reference geometry is stored as `AVATA_RATIO` and `AVATA_TITLE_BADGE_STYLE` in `board-game/src/features/game/components/playerIdentityLayout.ts`: avatar diameter 166px; plaque 174×48px; plaque top at 156px from avatar top and its center 3px right of avatar center. ProfileDialog is the visual reference. It uses a 128px avatar button with a 5px border, so Home uses `HOME_AVATA_TITLE_BADGE_STYLE` to map the profile button’s padding-box coordinates to Home’s unbordered avatar box. Use the shared style in PlayerCard, ProfileDialog, and AvatarCustomization; preserve `max-w-none` where the full shared plaque width must render. Reuse these styles when adding the same avatar/plaque elsewhere. This is distinct from the dragon frame that surrounds the avatar. The title plaque below the avatar must always render above the frame and other avatar overlays.

Ưu tiên sử dụng các token/style/component đã có trong project.

Không tạo màu, spacing hoặc typography mới nếu
design system hiện tại đã có giá trị tương ứng.
