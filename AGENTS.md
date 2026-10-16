# Hướng dẫn làm việc

- 2026-10-14: Replay/đánh thử dùng chung GamePage; useReplayTrial giữ nhánh snapshot riêng, không ghi gameStore/recording/socket/clock. Icon cột trái hoặc Space chuyển chế độ; cụm điều khiển dưới user phải. Trial có lùi/reset/tiến, toggle máy cơ bản; Phân tích/Gợi ý mới UI. Xem docs/MATCH-SAVING.md.

- 2026-10-14: Đã lưu/Thế cờ dùng savedPositionsStore localStorage theo owner, snapshot GameState tại lúc bấm ghim và nhập tên/ghi chú; danh sách một thế/hàng, vừa hai hàng, mini tái dùng Board dọc, ghi chú cuộn riêng. Mở thế dùng chính GamePage replay một snapshot chỉ đọc; không đổi ván thật. Chi tiết docs/MATCH-SAVING.md.

- 2026-10-13: Vị trí tùy chỉnh: Xóa quân xóa toàn bộ quân thường, giữ Tướng đang có trên bàn và bỏ chọn quân. Không kiểm tra Tướng đối mặt trong thao tác bấm/kéo xếp thế; Đấu ngay và server vẫn báo lỗi, chặn thế Tướng đối mặt.

- 2026-10-13: Mode computer cô lập với sảnh/phòng online, không công bố phòng máy hoặc trạng thái bận/đang chơi. challengeProfile.localBusy chỉ cho mode local đang đấu; online kiểm tra phòng server. Đồng ý lời mời dừng/reset ván máy rồi vào phòng online theo challenge. Máy không hiện Cầu hòa/Xin thua/Đi lại; nút Sẵn sàng sau ván vẫn giữ.

- 2026-10-13: Presence Chọn Bàn theo khu vực đang chọn; ban đầu theo địa chỉ hồ sơ, đổi nơi giảm đếm nơi cũ/tăng nơi mới qua server. Không đổi địa chỉ hồ sơ hoặc số bàn khi chuyển nơi.

- 2026-10-13: Chấp nhận Mời chơi/So tài chọn phòng theo người gửi tại thời điểm đồng ý: chưa có phòng online thì tạo mới cho cả hai; đã có phòng thì đưa người nhận vào phòng người gửi. Người nhận rời phòng cũ nếu khác đích. Giữ kiểm tra bận/Sẵn sàng và quy tắc ghế/người xem, không chiếm ghế. Mời chơi Bạn bè dùng challenge socket chung.

- 2026-10-13: Ghép nhanh chỉ chọn phòng có đúng1 người ngồi, chưa đấu; khán giả không tính. Chọn Bàn phải khớp thời lượng dropdown, không có phòng phù hợp mới mở Tạo bàn. Home giữ mọi thời lượng và fallback máy.

- Trước khi truy cập hoặc làm việc với mã nguồn project, bắt buộc đọc `AGENTS.md` và `AI WORK RULES.md`, rồi tuân thủ cả hai file.
- Trước mỗi lần sửa project, bắt buộc đọc `board-game/docs/PROJECT-MEMORY.md` và tài liệu chuyên biệt của phần liên quan. Khi người dùng chốt/thay đổi quy tắc hoặc phát hiện lỗi, cập nhật ghi nhớ này theo hướng dẫn trong file; phân biệt quy tắc lâu dài với xem thử UI. Trước bàn giao, đối chiếu các quy tắc và lỗi cần tránh, ghi đúng kết quả kiểm chứng.
- Quy tắc đồng bộ2026-10-05: Khi sửa một thành phần/quy tắc được dùng ở nhiều nơi, tìm mọi nơi sử dụng và cập nhật tương ứng trong cùng nhiệm vụ. Ưu tiên component/token dùng chung; không để các màn hình giữ bản cũ hoặc offset riêng. Giữ dữ liệu và kích thước theo ngữ cảnh, đồng bộ tỷ lệ/vị trí tương đối. Chỉ giữ ngoại lệ khi người dùng yêu cầu rõ; nếu có phạm vi khóa, đối chiếu quyền mở khóa đã được người dùng cho trong phiên trước khi hỏi lại.

## Phạm vi và ưu tiên

- Phạm vi khóa theo yêu cầu người dùng2026-10-05, cập nhật2026-10-06: Kích thước/vị trí avatar người chơi và khung avatar vẫn khóa toàn project; không tự sửa các giá trị này. Theo yêu cầu mới, toàn bộ khung/ảnh danh hiệu và cụm sao đi kèm được mở khóa trên toàn project để thử nghiệm, kể cả trong phần danh hiệu của Lịch sử, Xếp hạng, Bạn bè và Hồ sơ; giữ mở đến khi người dùng yêu cầu khóa lại. Bố cục chung các màn Lịch sử/Xếp hạng/Bạn bè vẫn khóa. Danh sách tại board-game/PROGRESS.md.

- Phạm vi khóa giao diện do người dùng chốt2026-10-06, cập nhật2026-10-06: Lịch sử, Xếp hạng và toàn bộ Bạn bè vẫn khóa theo UI hiện hành, ngoại trừ phần ảnh/khung danh hiệu và cụm sao đã được mở khóa riêng để thử nghiệm. Toàn bộ UI Danh hiệu/catalog, popup Thông tin danh hiệu và các phần hiển thị trong/ngoài thông tin user cũng đang mở khóa. Avatar người chơi và khung avatar vẫn khóa riêng. Nếu sửa khác có thể tác động đến bố cục còn khóa, phải báo phạm vi và xin mở khóa trước.

- Mặc định dùng phạm vi nhỏ nhất: xác định mục tiêu và file liên quan, tìm hàm/event/type cụ thể rồi chỉ đọc chức năng cùng style/dependency trực tiếp. Không đọc toàn project hoặc module không liên quan; chỉ mở rộng khi thiếu bằng chứng và dừng tìm khi đủ để sửa đúng.

- Áp dụng toàn project; ứng dụng nằm trong `board-game/`.

- Quy tắc phạm vi khóa do người dùng chốt 2026-10-05: Khi người dùng đánh dấu một file, component, asset, khu vực UI hoặc hành vi cụ thể là “khóa”, giữ nguyên phạm vi đó trong các task sau. Quy tắc áp dụng cả khi đang sửa việc khác: nếu thay đổi dự kiến trực tiếp chạm, cần sửa, hoặc có tác động phụ lên vùng khóa, phải dừng trước khi sửa vùng đó, thông báo chính xác phần nào sẽ bị ảnh hưởng và hỏi người dùng có cho phép mở khóa đúng phạm vi đó trong task hiện tại không. Có thể tiếp tục phần độc lập không chạm vùng khóa trong lúc chờ. Chỉ sửa vùng khóa sau khi người dùng xác nhận rõ; sau task khóa lại. Mỗi lần cho phép chỉ áp dụng cho phạm vi và task đã nêu, không phải quyền thường trực. Đọc/kiểm tra vùng khóa không đồng nghĩa được phép sửa. Ghi chính xác các phạm vi khóa vào `PROGRESS.md` và chỉ xóa khỏi danh sách sau khi người dùng đồng ý mở khóa.

- Ưu tiên đúng chức năng, không phá tính năng cũ, dễ hiểu, tách trách nhiệm, test được, rồi mới tối ưu/làm đẹp.

- Được sửa bug/refactor cần thiết trực tiếp. Không đổi UI, gameplay, kiến trúc ngoài yêu cầu; ghi chú vấn đề khác trừ khi chặn task.

## Kiến trúc đã chốt

- Stack hiện hành: React + TypeScript + Tailwind + Zustand + TanStack Query + Axios; Express + Socket.IO cho phòng online.

- `board-game/index.html` → `src/main.tsx` → providers → App → màn hình theo session. Dùng Vite, không còn entry JavaScript/DOM cũ.

- App mở HomePage mặc định; session store quản lý screen home/rooms/computer/position/game. Vào bàn local/online chuyển sang GamePage, rời/mất kết nối quay về HomePage. Hook useHome xử lý tương tác trang chủ, useLobby giữ API phòng.

- Chọn Bàn là RoomSelectionPage riêng (screen rooms), không phải modal phủ Home; dùng hiệu ứng mở 600ms. Phòng online hỗ trợ 3/5/10/15/30 phút mỗi bên (mặc định 10); server xác thực minutes, khởi tạo clock và giữ cấu hình khi reset. Chơi nhanh chọn ngẫu nhiên bàn còn chỗ, chưa chơi, trên mọi tỉnh/thành và mọi mốc thời gian.

- Home: chỉ Chọn Bàn mở RoomSelectionPage. Chơi Nhanh tại Home lấy danh sách mới và vào thẳng bàn khả dụng, chọn ngẫu nhiên bàn còn chỗ/chưa chơi, không lọc tỉnh hoặc thời gian; hết bàn thì mở ván local mode computer với Máy · Cơ bản. Lỗi mạng vẫn báo lỗi. Chơi nhanh trong RoomSelectionPage lấy danh sách mới và ngẫu nhiên mọi tỉnh/thành; dropdown mặc định10 phút, chỉ gồm các mốc3/5/10/15/30, không có lựa chọn Tất cả; hết bàn mở Tạo bàn. Tạo bàn dùng khu vực đang chọn, mặc định địa chỉ hồ sơ khi mở Chọn Bàn.

- Máy cơ bản trong luồng demo hiện tại: máy đỏ đi trước, người chơi đen; chọn nước hợp lệ ưu tiên ăn quân tại game/moves/computer.ts. Hook useComputer quản lý delay 500ms và hủy khi reset/rời/kết thúc; sau khi máy hoàn tất nước thứ hai thì gửi một yêu cầu Đi lại thử. Pikafish giữ phe người dùng chọn và delay tối thiểu 550ms. Người chơi luôn hiển thị bên trái; nếu cầm Đen thì bàn cờ đảo hướng để quân Đen ở dưới. Giữ Sẵn sàng/khai cuộc 1300ms; local hai người không đổi.

- Home Cờ Úp mở GamePage cùng giao diện, game.variant jieqi và mode computer. Khởi tạo tại game/state/hidden.ts, store cung cấp mẫu xáo; 30 quân úp và hai Tướng ngửa. Piece.type là loại di chuyển hiện tại; concealed giữ loại thật đến khi applyMove lật. Sĩ/Tượng jieqi đã lật bỏ giới hạn cung/sông, vẫn chặn mắt; UI không lộ danh tính quân úp, máy không đánh giá theo danh tính ẩn. Cờ Úp mới hỗ trợ local với máy, chưa online; quy ước tại game/state/hidden-rules.md.

- Luật và engine TypeScript thuần ở `src/game/`, frontend/server cùng import. Không phụ thuộc React, DOM, network hoặc Zustand.

- Local state dùng Zustand; server state danh sách phòng dùng Query; snapshot phòng online lấy từ socket. Không đưa query data trùng lặp vào nhiều store.

- Năng lượng áp dụng online: tối đa 5, hồi 1 mỗi7 phút khi thiếu; tooltip hiển thị đếm ngược. Session store giữ năng lượng/mốc hồi theo phiên. Mỗi ván online bắt đầu trừ1 cho người chơi, người xem không trừ. Hết năng lượng chặn Sẵn sàng/xếp hàng, tạo/vào phòng chưa chơi và ghép nhanh vào phòng online; vẫn cho mở Chọn Bàn và vào phòng đang chơi để xem. Local hotseat và các lựa chọn máy khác được miễn. Ngoại lệ xem thử tạm thời2026-10-09: máy cơ bản trong Cờ Tướng và Cờ Úp dùng luật trừ/chặn online để thử tính năng; gỡ ngoại lệ sau khi kết thúc thử nghiệm. Cảnh báo chỉ hiện trên client đó. Năng lượng chỉ lưu trong phiên; xem video chưa tích hợp.

- Backend Controller → Service → Repository. Lưu RAM là quyết định hiện tại. Chưa có database/auth; không tạo folder rỗng giả như đã triển khai.

- Khi có persistence: Prisma chỉ ở Repository; Service không query Prisma. MySQL/Prisma cần task cấu hình và lưu dữ liệu cụ thể.

## Quy tắc riêng cho Bạn bè

- Trước khi sửa giao diện hoặc hành vi Bạn bè, bắt buộc đọc `board-game/docs/FRIENDS-UI-RULES.md` và đối chiếu hiện trạng/diff. Giữ nhất quán các kích thước, trạng thái, hover, danh hiệu và luồng lời mời đã chốt trong tài liệu.

## Trách nhiệm thư mục

- Xếp hạng/Bạn bè dùng chung SocialAvatar, socialPanelClass, socialActionButton/socialActionStyle tại `src/features/lobby/components/SocialUi.tsx`. Huy hiệu hạng 1–3 nằm trong assets/rankings/*-v2.png; hạng 4 trở đi dùng rank-plain-frame.png và số HTML/Tailwind, nguồn ghi ở badges-v2.md. Dữ liệu Xếp hạng vẫn minh họa.

- Trong Danh hiệu, mục Tất cả luôn nhóm theo thứ tự: Vinh Quang Kỳ Đài → Danh Hiệu Phong Tặng → Chuỗi Chiến Thắng → Tổng Ván Chơi → Online Chuyên Cần. Bên trong Vinh Quang Kỳ Đài luôn xếp Khung Thi Đấu 1, 2, 3 theo thứ tự, lần lượt mang tên Quán Quân, Á Quân, Top 3. Giữ các thứ tự này khi bổ sung danh hiệu.
- Danh hiệu người chơi chọn hiển thị trong hồ sơ xếp nhóm trước theo thứ tự của mục Tất cả: Vinh Quang Kỳ Đài → Danh Hiệu Phong Tặng → Chuỗi Chiến Thắng → Tổng Ván Chơi → Online Chuyên Cần. Sau đó xếp cấp khung tăng dần trong từng nhóm, rồi theo thứ tự khai báo trong catalog; không dùng thời điểm chọn làm thứ tự.
- Quy tắc màu, cấp khung, nội dung gắn với cấp và mã nội bộ của cả năm nhóm danh hiệu được ghi tại `board-game/docs/HONOR-SYSTEM.md`; xem đây là tài liệu chuẩn khi thêm/chỉnh asset hoặc dữ liệu danh hiệu.

- Chọn Bàn: khung ngoài như Home (lề ngang desktop 120px, compact 6px), header gọn như Chơi Với Máy (56/48px). Nền trong khung dùng chung với Chơi Với Máy; header, khung danh sách, nút và icon dùng asset trong `src/assets/room-selection/`, giữ nguồn và tọa độ cắt. Hai nút lọc dùng Tailwind nền kem khi chọn/nâu khi chưa chọn, kích thước 140×34px. Bốn nút tiện ích Cúp/Loa/Bạn bè/Video dùng homeUtilityButton và HomeIcon SVG chung với Home (48×48px). Hai ô đầu dùng toàn mặt nút ảnh brown-button.png từ custom-position.png qua border-image slice 14 fill, width 12px giữ góc; Chơi nhanh dùng red-button.png từ start-match.png, chữ/icon nguồn được thay bằng nền cùng ảnh để đặt nội dung HTML. Khung danh sách dùng border-image từ asset với borderImageWidth ghi rõ đơn vị px để giữ góc khi đổi kích thước; nội dung/phòng/số người vẫn lấy state/API thật, không dùng screenshot tĩnh thay điều khiển. Giữ hiệu ứng 600ms và luồng tạo/vào/lọc/chọn thời gian.
- Ba tiện ích hiện ở header Chọn Bàn phải giữ cùng chức năng với Home: Bạn bè mở FriendsDialog, Thành tích mở RankingDialog, âm thanh dùng chung trạng thái/phát nhạc `useHomeMusic`.

- Home Chơi Với Máy mở ComputerPage riêng (`screen computer`), dùng khung Home và hiệu ứng useRoomEntrance 600ms. Thiết lập desktop dùng một chân dung máy giữa bảng, mặc định Pikafish và cấp 2 trong 10 cấp; biển tên Pikafish cố định, không có dropdown Máy · Cơ bản. Đấu ngay kiểm tra engine rồi tạo ván local với phe Đỏ/Đen/Ngẫu nhiên và tự bắt đầu, giữ khai cuộc1300ms, không cần Sẵn sàng. Vị trí tùy chỉnh mở screen position, trình xếp quân dùng chung Board/PlayerCard, lưu FEN và đấu Pikafish từ thế gốc. Khay giới hạn1 Tướng/2 Sĩ/2 Tượng/2 Mã/2 Xe/2 Pháo/5 Tốt mỗi bên, mờ/khóa loại đã đủ; chặn đặt sai vùng của Tướng/Sĩ/Tượng/Tốt; hai Tướng đối mặt chỉ chặn lúc Đấu ngay. Xóa vẫn được phép để chỉnh thế dang dở; Đấu ngay và server tiếp tục kiểm tra đầy đủ. Chi tiết tại docs/CUSTOM-POSITION.md. Cờ thế chưa hỗ trợ. Máy ở Chơi Nhanh/Cờ Úp giữ nguyên. Dùng background hiện tại; nội dung co theo vùng dưới header bằng useComputerLayout (tối đa 100%), không cuộn dọc; tiêu đề/robot/nút/banner dùng ảnh cắt lưu tại src/assets/computer-setup/ cùng tọa độ nguồn.

- Pikafish native + NNUE chính thức ở `board-game/engines/pikafish/`, chạy server qua UCI, không import vào engine thuần hoặc bundle frontend. Luồng: useComputer → Axios pikafishApi → pikafishController → PikafishService → tiến trình engine. Service dựng lại thế cờ từ lịch sử UCI đã kiểm tra, kiểm tra bestmove; không tác động phòng online. Session lưu computerEngine/computerLevel/humanSide; cấp 1–10 dùng PIKAFISH_LEVELS tại server/services/pikafishLevels.ts: cấp1–3 depth1/2/3 và MultiPV chọn sai số có kiểm soát, cấp4–9 tăng nodes, cấp10 movetime2500/bestmove100%; mỗi go một limit chính, server stop giảm theo clock. Chỉ set Threads/Hash/EvalFile khi UCI quảng bá, clamp giới hạn option và CPU. gameStore lưu lịch sử nước đã áp dụng, reset xóa. Hủy request/tính toán khi reset/rời/kết thúc, bỏ phản hồi cũ; lỗi hiện nút thử lại. Mặc định tối đa 4 threads, Hash 128 MB; tối đa 2 tiến trình, timeout 15 giây, lịch sử tối đa 500 nửa-nước. Giữ giấy phép GPL engine và giấy phép NNUE riêng (không thương mại khi chưa có phép); xem engines/pikafish/README.md.

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

- Phòng online cho phép người vào khi đủ ghế hoặc đang chơi tham gia với vai trò người xem. `RoomSnapshot.viewers` lưu người xem và trạng thái hàng chờ; panel chỉ hiện người xem, queue controls chỉ dành cho họ, còn lệnh ván cờ chỉ dành cho người đang ngồi. Khi ván kết thúc có người thắng và có người đang xếp hàng, luôn đưa người thua xuống cuối hàng và đưa người đầu tiên trong hàng lên ghế; không có ngoại lệ theo chủ phòng. Khi người chơi rời phòng giữa ván, vẫn xử thua và lấp ghế trống bằng người đầu hàng nếu có. Người xem vẫn có thể chat và theo dõi snapshot.

- Danh sách phòng: hook Query → Axios → HTTP Controller → Service → Repository. Tạo/vào phòng invalidate danh sách.

- Server là nguồn sự thật online; không nhận board, phe hoặc kết quả do client tự khai. Frontend chỉ preview nước hợp lệ.

- Đồng hồ local dùng performance.now; đồng hồ online do server tính. Online không dừng clock vì animation hoặc dialog phía client.
- Mỗi lượt tối đa 30/60/90/120 giây theo cấu hình phòng (mặc định60): nền xanh bán trong suốt phủ đầy avatar lúc đầu rồi rút theo chiều kim đồng hồ; viền xanh rút đúng cùng cung. Khi hết giới hạn mỗi nước, dừng clock tại mốc đó và người đang đi thua; giới hạn tổng thời gian ván vẫn được áp dụng nếu hết trước.

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

- Sửa ở tầng chịu trách nhiệm. Không vá UI cho lỗi logic/backend; không refactor chỉ để đẹp.

- Chạy test phù hợp và thêm regression nhỏ khi hợp lý. Thay đổi rộng cần typecheck/build và test; UI test DOM không thay browser QA.

- Báo ngắn gọn nguyên nhân/phạm vi, file sửa, cách sửa và kết quả/giới hạn kiểm chứng.

## Dependency và lệnh

- Trước khi cài thư viện mới, giải thích ngắn gọn công dụng. Chỉ thêm khi có lợi ích rõ; tránh trùng chức năng hoặc thư viện cho vài dòng code.

- Dependency phải được import/sử dụng thực tế. Commit package.json và package-lock.json cùng nhau; không cài global.

- Từ `board-game/`: `npm ci`, `npm run dev`, `npm test`, `npm run typecheck`, `npm run build`.

- Sau mỗi nhiệm vụ có thay đổi project, bắt buộc chạy `npm run build` từ `board-game/` trước khi bàn giao để cập nhật `dist/`. Trên Windows dùng `npm.cmd run build`; chờ build hoàn tất thành công và kiểm tra thay đổi có trong dist trước khi báo xong để người dùng xem kết quả. Không để build sang nhiệm vụ sau.

- `npm start` phục vụ dist + API/socket tại 3001 sau build. Dev Vite 5173 proxy backend 3001. Không dùng Live Server/file://.

- Windows PowerShell chặn npm.ps1: dùng npm.cmd. Sandbox hiện có thể chặn tsx đọc os.userInfo; đó là giới hạn môi trường, không vá dependency để né.

## Duy trì

- Cập nhật AGENTS.md khi thay đổi kiến trúc/quy tắc; cập nhật PROGRESS.md ngắn gọn theo kết quả thực tế.

- Giữ assets/font license/nguồn gốc khi di chuyển. Không xóa tính năng hoạt động nếu không cần thiết.

- Ảnh runtime giữ theo nhóm chức năng tại src/assets; ảnh nguồn tải lên còn cần đối chiếu được gom tại src/assets/references/uploads. Khi dọn ảnh, kiểm tra cả import, tài liệu nguồn và script crop (kể cả đường dẫn wildcard); giữ reference và giấy phép.

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

- Trên toàn ứng dụng, chỉ cho chọn nội dung chữ bằng chuột; ảnh và SVG không hiện vùng chọn xanh hoặc kéo thành ảnh. Quy tắc chung nằm ở class Tailwind trên `board-game/index.html`.

## Design tokens

- Honor badge layout: use the shared `HONOR_BADGE_ASPECT_CLASS` (`aspect-[3/1]`) in `ProfileDialog.tsx` for every award frame so all frame slots match the Quán Quân/Á Quân/Top 3 reference. Center each title over its frame above the artwork; keep cards equal-sized and aligned in horizontal rows with consistent gaps. When a row is incomplete, center that row.
- Shared selection palette reference: selected uses a dark brown gradient `#613014` → `#241007` with a bright gold border `#ffe08b`, gold glow `#f8b73c`, and cream text `#ffe5a6`; unselected uses a deeper brown gradient `#3e200e` → `#1c0e07`, border `#79501e`, muted cream text `#d6b982`. Reusable Tailwind classes live in `board-game/src/lib/uiClasses.ts` as `selectionPalette`; use them for future selected/unselected controls.
- Dragon avatar frame sizing: use the shared `AvatarFrameOverlay` component. Its measured standard is a 166px frame over a 128px avatar (129.6875%), centered at 50%/50%; the overlay scales from its avatar-sized parent, so keep the parent positioned and sized to the avatar. Reuse this component wherever the dragon frame appears so profile, preview, and thumbnails preserve the same ratio when resized. Frame-selection thumbnails show the frame art only, without an avatar inside.
- “Tỷ lệ avata” means the avatar plus the title plaque beneath it. Its reference geometry is stored as `AVATA_RATIO` and `AVATA_TITLE_BADGE_STYLE` in `board-game/src/features/game/components/playerIdentityLayout.ts`: avatar diameter 166px; plaque 174×48px; plaque top at 156px from avatar top and its center 3px right of avatar center. ProfileDialog is the visual reference. It uses a 128px avatar button with a 5px border, so Home uses `HOME_AVATA_TITLE_BADGE_STYLE` to map the profile button’s padding-box coordinates to Home’s unbordered avatar box. Use the shared style in PlayerCard, ProfileDialog, and AvatarCustomization; preserve `max-w-none` where the full shared plaque width must render. Reuse these styles when adding the same avatar/plaque elsewhere. This is distinct from the dragon frame that surrounds the avatar. The title plaque below the avatar must always render above the frame and other avatar overlays.

Ưu tiên sử dụng các token/style/component đã có trong project.

Không tạo màu, spacing hoặc typography mới nếu
design system hiện tại đã có giá trị tương ứng.

- 2026-10-10 ? Sau khi v?n k?t th?c c? ng??i th?ng, gi? k?t qu? ?t nh?t3 gi?y r?i m?i ??a ng??i ??u h?ng hi?n t?i l?n thay ng??i thua; ng??i thua xu?ng cu?i h?ng. Ch?n ready/reset ?? kh?ng b? qua h?ng ch? trong3 gi?y. Server tick th?c hi?n chuy?n gh?; ng??i xem kh?ng x?p h?ng v?n kh?ng ???c ??a l?n. R?i ph?ng v?n l?p gh? ngay theo quy t?c tr??c. Demo hai m?y c?ng k?t th?c tr??c, ??i3 gi?y r?i cho ng??i x?p h?ng v?o v?n m?i.

- 2026-10-10: Queue timing supersedes prior minimum delay: entries queued before match end wait 3 seconds; entries queued after match end promote immediately when first in line. Rematch readiness still prevents replacement. Preserve FIFO; demo follows the same timing.

- 2026-10-14: Lưu ván đấu chỉ sau kết thúc, cho người chơi và khán giả. RoomService cung cấp lastCompletedMatch trước chuyển ghế; local giữ đầy đủ history snapshot. savedMatchesStore lưu localStorage theo tên (chưa auth/đồng bộ); Đã lưu/Ván đấu hỗ trợ xóa/xem lại read-only không tác động game/engine. Lưu từ lịch sử mình/người khác đang phát triển. Trước sửa đọc board-game/docs/MATCH-SAVING.md.

- 2026-10-14: session screen replay dành riêng xem ván đã lưu toàn màn hình; dữ liệu replay tạm ở savedMatchesStore, không ghi đè gameStore hay tạo/join phòng. Xem docs/MATCH-SAVING.md.

- 2026-10-14: Replay dùng CHÍNH GamePage nhận replayData; cấm tạo màn/component bàn cờ riêng. App điều hướng cùng GamePage, useGame nhận nguồn trạng thái replay chỉ đọc và chặn clock/AI/mutation/socket. useReplayPlayback/ReplayControls chỉ điều khiển lịch sử; xóa SavedMatchReplay cũ. Xem docs/MATCH-SAVING.md.

- 2026-10-14: Tab Đã chơi dùng playedMatchesStore lưu tự động snapshot ván hoàn tất theo owner/localStorage qua useMatchSaving; tách Đã lưu thủ công, không dùng fixture.

- 2026-10-14: Đã chơi history TTL một tháng lịch từ endedAt; replay từ Đã chơi chỉ được vào đánh thử sau khi lưu ván hoặc lưu thế gắn sourceMatchId; Space nhắc lưu trước đó.

- 2026-10-15: Quy tắc máy mới do người dùng chốt: mọi chức năng máy chỉ dẫn, hướng dẫn, gợi ý, phân tích nước đi và chơi với máy ngoài chế độ đấu máy10 cấp đều dùng Pikafish mạnh nhất (không chọn sai số/hạ sức mạnh), thời gian search700ms (0,7 giây). Riêng chế độ đấu máy10 cấp giữ nguyên cấu hình từng cấp, kể cả cấp10. Thay thế các cấu hình máy cơ bản hoặc thời gian search cũ trong phạm vi trên.700ms là thời gian engine tính, không phải tổng thời gian mạng/khởi động/diễn giải. Giữ hạn chế trợ giúp trong trận người thật; không tự bật engine cho biến thể chưa được hỗ trợ. Phiên này chỉ ghi quy tắc tài liệu, chưa áp dụng code.

- 2026-10-15: Quy tắc mới thay phạm vi Gợi ý và lùi theo cặp: mọi nút Gợi ý ở bàn thử (replay ván/thế đã lưu và Vị trí tùy chỉnh) dùng Pikafish mạnh nhất/search700ms,1 mũi tên xanh/read-only; replay xác định phe theo savedMatchSide. Bỏ nút Gợi ý riêng ở ván Cờ Tướng/Cờ Úp thông thường; giữ chặn hỗ trợ trong trận người thật và báo chưa hỗ trợ jieqi. Lùi/Tiến mỗi lần đúng1 nửa-nước (1 lần đi quân) cả nút và ←/→, không lùi theo cặp người/máy. Giữ reset/hủy/memo và hover/pressed hiện hành.

- 2026-10-15: Tên hiển thị máy Pikafish đổi thành Ông Hoàng toàn ứng dụng: thiết lập desktop/compact, tên đối thủ, trạng thái suy nghĩ/kết nối, tooltip Gợi ý và thông báo lỗi frontend/server. Mã engine pikafish, API/type/path/binary và giấy phép giữ nguyên. Chặn So tài nhận cả tên mới và tên cũ để tương thích; không đổi tên người chơi/bản ghi lịch sử đã lưu.

- 2026-10-15: Theo yêu cầu mới, avatar máy dùng chân dung GIỮA ảnhc876e59c-c77c-411e-a467-31b5f5b4df21. Runtime ong-hoang-avatar-v2.svg nhúng nguyên pixel nguồn, clip circle(cx1086,cy348,r288), viewBox79860 576576 bỏ vòng vàng nguồn, ngoài tròn trong suốt; không vẽ lại ảnh. Máy chỉ giữ avatar và tên Ông Hoàng: bỏ overlay khung/danh hiệu/sao, khung tên/ELO và trang trí kết quả trên PlayerCard; hồ sơ/chat bỏ khung/huy hiệu máy; thiết lập bỏ khung biển tên. Dùng helper chung cho mọi avatar máy, gồm tên cũ. Quyền sửa này chỉ cho ảnh/trang trí máy, avatar người thật vẫn khóa. Nguồn giữ references/uploads. Typecheck/build PASS; chưa browser QA.

- 2026-10-15: Đính chính avatar máyc876e59c: giữ100% hình GIỮA gồm vòng vàng/chi tiết gốc, chỉ tách khỏi hai hình bên và trim alpha trống (bbox x737,y0,698×694); SVGv3 nhúng nguyên pixel, không circle clip. Hiển thị object-contain trong kích thước avatar hiện có, không rounded/cắt ảnh máy. Khôi phục PlayerNameplate cho tên Ông Hoàng và khung biển tên ở thiết lập máy. Khung overlay/danh hiệu/sao/ELO riêng của máy vẫn bỏ như trước. Áp dụng đồng bộ bàn chơi/chat/thế/hồ sơ/Tin nhắn/thiết lập.

- 2026-10-15: Chốt căn máy: thẻ tên Ông Hoàng dùng cùng margin/translate/breakpoint với thẻ tên người chơi, giữ ngang hàng thay margin riêng mt2. Avatar máy phóng theo đường kính HIỂN THỊ của viền mặc định (156/128×0.896=1.092), giữ nguyên ảnh nguồn và ô anchor. AVATAR_FRAME_VISIBLE_SCALE dùng chung PlayerCard/chat/hồ sơ, không đổi avatar/khung người thật. Không thêm danh hiệu/sao/ELO lại cho máy. Typecheck/build PASS, chưa browser QA.

- 2026-10-15: Máy không mở bảng thông tin/hồ sơ. Avatar máy ở PlayerCard disabled nhưng giữ độ sáng100%, không pointer/context menu phong danh hiệu. Chặn tên máy tại điểm mở Profile của Game/Home/Chọn Bàn, bao gồm đường chat/Tin nhắn/lịch sử. Người thật giữ luồng cũ. Typecheck/build PASS, dist index-DS34NNzo.js xác nhận; chưa browser QA.

- 2026-10-15: Ván đấu máy thông thường (computerMatch, cả Cờ Tướng/Cờ Úp) không có Lưu ván/Ghim thế, mã phòng, lượt xem/panel người xem hoặc chat (desktop/compact). showRoomFeatures dùng chung; useChat disabled cả send/listener/scroll, useMatchSaving không ghi ván máy. Bàn thử tùy chỉnh/replay giữ chức năng riêng đã chốt; online/local hai người giữ UI phòng. Không sửa avatar, khung tên hoặc engine.

- 2026-10-15: Ông Hoàng có danh hiệu riêng Kỳ Thủ AI và họa tiết sao riêng từ ảnh205ea2ea; thay quy tắc bỏ toàn bộ danh hiệu/sao máy trước đó. AvatarRankBadge/RankTitleBadge thêm prop computer, tái dùng vị trí/tỷ lệ slot và hàng sao chung, chỉ PlayerCard máy bật. Asset PNG title1168×383 tại(34,154), stars853×199 tại(1270,242), trim alpha<=16 loại nhiễu vô hình, corners alpha0; nguồn giữ references/uploads. Giữ avatar/khung tên/khóa hồ sơ máy. Typecheck/build PASS, đã xem2 crop và xác nhận dist, chưa browser QA.

- 2026-10-15: Vị trí tùy chỉnh: kéo lấy quân từ khay tự chọn khay bên đó và loại quân đó (chooseForDrag không toggle). PositionPalette đồng bộ activeSide theo piece. Thả hợp lệ giữ chọn nếu loại đó còn trong khay, hết số lượng bỏ chọn/khóa như trước. Kéo quân trên bàn ra ngoài trả khay thì chọn đúng bên/loại vừa lấy xuống. Hover/click/phím tắt, kiểm tra đặt sai và hủy kéo giữ quy tắc hiện tại.10/10 test editor gồm đổi khay/aria-pressed/giữ chọn/hết quân PASS; typecheck/build PASS, chưa browser QA.

- 2026-10-15: Tạo bàn dùng chung khung chọn tỉnh/thành, artwork nút/ô thời gian từ10f8e709/6ff86838. Bàn khóa/mật khẩu hiện chỉ UI xem trước theo xác nhận, chưa nối server; không tuyên bố phòng đã khóa. Nguồn/crop ghi tại board-game/src/assets/create-room/source.md.

- 2026-10-15: Theo yêu cầu toàn project, không hiện outline/ring khi focus điều khiển; utility chung trên body board-game/index.html. Giữ viền biểu thị lựa chọn/trạng thái.

- 2026-10-15: Nhạc nền playlist3 MP3 mới:155926 đầu tiên,247345,618302 rồi lặp; chờ4s giữa bài. useHomeMusic giữ một player dùng chung và timer không bị đổi màn/click bỏ qua. Xem src/assets/audio/background-music-source.md.

- 2026-10-15: Luật Sẵn sàng online có hàng chờ: giữ quy tắc đổi người thua sau ván; cặp đang ngồi cả hai chưa ready chờ10s rồi hiện20→0 tự bắt đầu, một người ready đếm ngầm30s từ lúc bấm đầu; người kia không ready bị xử thua và xuống khán giả, đầu hàng lên. Không có hàng chờ không ép/phạt. Server quyết định mốc và kết quả; xem board-game/docs/ROOM-READINESS.md. Bảng xanh trên cùng, nút ready ẩn sau bấm không thay chữ.

- 2026-10-15: Đính chính Sẵn sàng: người chưa ready sau30s chỉ nhường ghế/xuống khán giả, KHÔNG xử thua hoặc ghi kết quả/lịch sử mới; giữ archive ván trước. Thay phần xử thua của quy tắc ngay trước.

- 2026-10-15: Bàn khóa đã triển khai thật (thay UI preview trước): mục lọc bên phải Còn trống, create password1–64, RoomService xác thực trước join ghế/viewer; Repository giữ salt/hash riêng, snapshots chỉ locked. QuickPlay bỏ khóa; challenge không bypass mật khẩu. Xem board-game/docs/ROOM-LOCKS.md.

- 2026-10-15: Xếp hạng Vào xem chỉ hiện cho top có phòng online thật đang đấu; hook kiểm tra lại và join khán giả, khóa vẫn xác thực mật khẩu. Wrapper ảnh sát không bóng chữ nhật. Danh sách top/ELO vẫn minh họa, không sửa bố cục/avatar đang khóa. Xem board-game/docs/RANKING-WATCH.md.

- 2026-10-16: Chốt mô hình tài khoản Guest/đã liên kết tại board-game/docs/ACCOUNT-MODEL.md. Guest có online/máy/Cờ Úp/phòng/Elo-cấp-sao/vàng/danh hiệu/lịch sử/lưu ván-thế/bạn bè-chat/avatar-khung; chỉ tài khoản đã liên kết được đổi tên, đăng nhập thiết bị khác, khôi phục, giải đấu chính thức và mua tiền thật sau này. Xóa game/dữ liệu trình duyệt mất Guest; đã liên kết khôi phục bằng đăng nhập. Giữ giới hạn từng mode hiện hành. Chỉ chốt tài liệu, chưa code/database/schema/phương thức liên kết.

- 2026-10-16: Bút đổi tên hồ sơ: Guest không có; đăng nhập Google/đã liên kết và chưa đổi tên thành công mới hiện bút vàng ở cuối dòng tên như bút địa chỉ trong ảnh người dùng. Đổi tên thành công thì ẩn bút; hủy/lỗi vẫn giữ. Trạng thái theo tài khoản, giữ qua đăng nhập lại/đổi thiết bị. Chưa có quy tắc cấp lại quyền. Chỉ lưu thiết kế tại docs/ACCOUNT-MODEL.md, chưa code/UI/database.

- 2026-10-16: Màn đăng nhập mới theo ảnh người dùng, artwork tự tạo bằng imagegen theo yêu cầu. EntryGate trước App: chưa chọn cách vào thì LoginPage, đã chơi khách thì vào Home trực tiếp qua localStorage co-tuong-entry-v1. Đây chỉ là ghi nhớ cách vào, không phải auth server hoặc persistence hồ sơ. Không tin flag Google từ client; Google OAuth chưa cấu hình, nút báo rõ và không tạo phiên giả. Khi có auth Google thật phải kiểm tra phiên server rồi bỏ qua trang đăng nhập. Giữ UI/gameplay/phạm vi khóa hiện có. Không tạo database. Xem docs/ACCOUNT-MODEL.md và src/assets/login/source.md.

- 2026-10-16: Tên khách tự sinh dạng Kỳ thủ + đúng6 chữ số ngẫu nhiên, không thêm khoảng trắng trước số (ví dụ Kỳ thủ000042). Dùng crypto.getRandomValues, pad số0 đầu; tạo một lần, giữ trong co-tuong-entry-v1 và khôi phục vào sessionStore khi tải lại. Entry guest cũ thiếu tên được bổ sung một lần. Validator client/server chung cho phép đúng mẫu này là ngoại lệ giới hạn10 ký tự; tên tự nhập khác giữ giới hạn cũ. Không bảo đảm tên random duy nhất toàn server khi chưa có DB. Chưa triển khai auth/database hoặc quyền đổi tên.

- 2026-10-16: Hồ sơ của mình đổi nút Thoát thành Đăng xuất theo yêu cầu, giữ hình học/style nút; hồ sơ người khác vẫn Thoát. Bấm mở dialog xác nhận Bạn có chắc muốn đăng xuất? với Hủy/Đồng ý; Hủy/Escape không đăng xuất. Đồng ý đánh dấu signedOut trong co-tuong-entry-v1, ngắt socket (server xử lý rời theo luật cũ), rời/reset ván local và trở lại LoginPage. Không xóa tên khách/localStorage ván-thế; chơi khách lại giữ tên. Chưa có OAuth để thu hồi phiên Google. Lỗi lưu marker giữ phiên và báo lỗi. Quyền sửa chỉ nút/footer và xác nhận của mình, vùng UI khác giữ khóa.

- 2026-10-16: Chốt ghép đấu tự động tương lai: ưu tiên cùng cấp bậc/cùng số sao; không có thì ngẫu nhiên đối thủ hơn/kém1 sao, mở rộng lần lượt2 rồi3 sao, tối đa3. Không có phù hợp thì người chơi vào phòng một mình chờ, không fallback máy/ghép quá phạm vi. Chỉ ghi thiết kế, chưa đổi code hiện hành; chi tiết ranh giới bậc/sao trần cần chốt trước code. Xem board-game/docs/MATCHMAKING.md.

- 2026-10-16: Chốt ELO mục tiêu theo đối thủ trước trận: thắng cùng bậc/sao +13, thắng cao hơn1/2/3 sao +16/+17/+18, thắng thấp hơn1/2/3 sao đều+10; thua cùng bậc/sao hoặc đối thủ thấp hơn đều-13, thua đối thủ cao hơn1/2/3 sao đều-10. Tính riêng mỗi người, không zero-sum. Chỉ tài liệu, chưa code/DB; hòa/điểm sàn/ngoài phạm vi và ranh giới bậc chưa chốt. Bảng chuẩn tại docs/MATCHMAKING.md.

- 2026-10-16: Chốt sao liên tục qua bậc cho ghép đấu/ELO: index=(bậc-1)*3+(sao-1), chênh=index đối thủ-index mình. BậcN/3 sao +1/+2/+3 là bậcN+1/1/2/3 sao; bậcN/1 sao -1/-2/-3 là bậcN-1/3/2/1 sao. Chỉ xét bậc tồn tại, không dùng danh hiệu trang trí hoặc tự thêm sao ẩn. Thay ghi chú ranh giới bậc chưa chốt trước đó; bảng điểm giữ nguyên. Chỉ tài liệu, chưa code/DB. Xem docs/MATCHMAKING.md.

- 2026-10-16: Chốt trần danh hiệu/sao: Kỳ Thánh1 sao2800–2899,2 sao2900–2999,3 sao từ3000; đạt đủ thì không tăng bậc/sao nữa nhưng ELO thật vẫn tăng. Thay trần sao2800 trước đây bằng3000, giữ mốc vào Kỳ Thánh2800. Đã áp dụng getRankProgress chung mọi consumer, không đổi UI/geometry/avatar hoặc triển khai tính điểm sau trận/DB.
