# Lưu và xem lại ván đấu

- 2026-10-14: Trial.back xác định người đi từ snapshot trước: cuối là mình thì lùi1, cuối là máy và ngay trước là mình thì lùi2. Cả nút Lùi và ArrowLeft dùng back. Replay Phát/Tua giữ mỗi lần1 nước.

- 2026-10-14: Máy đánh thử cấp10 dùng thinkMs1000 (1 giây search), không hiện dòng đang tính. Pikafish API cho override thời gian có validation, không đổi cấp10 ở màn Chơi với máy.

- 2026-10-14: Trial khung240px, giãn artwork theo tỷ lệ, chữ Máy đi20px. Bật máy phóng nhẹ1.02/viền vàng mảnh/glow nhẹ; phím tắt giữ nguyên.

- 2026-10-14: Hoàn tác UI lần mới nhất về khung220px, không dim/glow/scale; giữ toàn bộ phím tắt trial/replay.

- 2026-10-14: Trial controls244px, nút lịch sử không khả dụng mờ; Máy đi bật phóng1.04 và sáng vàng. Phím trial ←/→ lịch sử, ↑/↓ reset, Enter Máy đi. Bàn chính Enter phát/dừng; Space chuyển hai bàn. Không tua vượt biên.

- 2026-10-14: Cụm thử Lùi/Reset/Tiến/Máy đi sử dụng khung giữa ảnh4470bd4d crop alpha, điều khiển HTML trên artwork thật. Phân tích/Gợi ý nằm ngoài bên dưới, gap10px, mỗi nút72px, vẫn chưa có logic.

- 2026-10-14: Thay máy cơ bản trial bằng Pikafish cấp10 (mạnh nhất profile hiện hành), FEN gốc+lịch sử UCI của nhánh. Không fallback; báo lỗi/Thử lại, hủy qua AbortController khi trạng thái đổi. Máy không có clock nên API dùng budget600000ms để không bị giảm profile. Pikafish chưa hỗ trợ jieqi, báo rõ và cho tắt Máy đi để tự thử hai bên.

- 2026-10-14: Ghim chỉ hiện trên trial hoặc replay Ván đấu; replayKind=position ở bàn chính không hiện Lưu thế cờ. Quy tắc này thay phần “mọi replay” trước đó.

- 2026-10-14: Replay mở từ Thế cờ có replayKind=position, initialMoveCount bằng số nước đã lưu; không hiện bộ phát/tua ở bàn gốc. Trial hiện controls riêng. Nút ghim luôn hiện cho replay Ván đấu, Thế cờ và trial, lưu ngay GameState hiện tại và số nước tương ứng.

- 2026-10-14: Chuyển qua lại hai chế độ luôn đặt Máy đi=false. Trial có animation qua Board cho nước người và máy; dùng PIECE_MOVE_DURATION_MS chung, không cho đi chồng animation, máy bắt đầu delay sau animation. Reset/tua/chuyển/rời dọn callback cũ.

- 2026-10-14: Enter Phát/Tạm dừng Xem lại; Space chuyển Xem lại/Đánh thử. Phím tắt bỏ qua ô nhập/dialog và khóa khi entrance, chặn default để không kích hoạt thêm nút focus.

- 2026-10-14: Quy tắc mới thay chức năng đảo hướng của icon hai mũi tên: icon ở cột trái chuyển Xem lại ↔ Đánh thử, phím Space tương đương. ReplayControls nằm dưới user phải. Trial giữ snapshot gốc riêng tại nước đang xem; không đổi recording/gameStore hoặc kết nối phòng. Đánh thử có lùi/reset/tiến, reset xóa nhánh về snapshot đầu; Máy đi bật/tắt (mặc định tắt) dùng chooseComputerMove cơ bản, luôn kiểm tra luật bằng applyMoveWithResult, không tick clock. Khi tua dừng máy để xem lịch sử; đi nước mới cắt nhánh tương lai. Phân tích và Gợi ý chỉ giao diện đang phát triển. Quay về xem lại giữ nguyên nước gốc, không tự phát.

- 2026-10-14: Quy tắc mới thay hộp nhập khi lưu: nút ghim lưu thẳng snapshot hiện tại, tên mặc định “Thế cờ nước N”, ghi chú trống. Sửa tên/ghi chú độc lập qua bút trong danh sách, giữ màu nền khi edit. vs cách user17px; icon metadata/ghi chú dạng tờ báo.

- 2026-10-14: Hàng Thế cờ xếp bản thân bên trái; khi người lưu là khán giả, xếp người cầm Đỏ bên trái. Phe/lượt gốc không thay đổi.

- 2026-10-14: Hàng Thế cờ dùng style ảnh tham chiếu giấy vàng, tiêu đề highlight/bút sửa, người đấu vs và metadata có chấm màu lượt; ghi chú nền nâu nhạt cuộn riêng. Sửa tên/ghi chú qua savedPositionsStore.update, ghi storage thành công mới cập nhật UI. Bàn vẫn dọc theo yêu cầu trước, giữ hai hàng/modal/nút Mở thế-Xóa.

- 2026-10-14: Replay ván và mở thế đã lưu luôn hiện nút Âm thanh/Toàn màn hình qua GameTools chung.

- 2026-10-14: Thế cờ đã nối dữ liệu thật qua savedPositionsStore (localStorage xiangqi-saved-positions-v1, theo tên). Nút ghim chụp trạng thái ngay lúc mở hộp nhập tên/ghi chú, giữ variant/quân úp/lượt/tên hai bên/số nước; lưu lỗi không đóng hộp. Danh sách một thế mỗi hàng, vừa hai hàng, cuộn dọc; ghi chú cuộn riêng. Mini dùng Board thật dọc1134/1296; Mở thế dùng replay một snapshot chỉ đọc, Xóa chỉ xóa bản của owner. Không đổi modal/tab Ván đấu.

- 2026-10-14: Lưu thế cờ dùng icon cây ghim vàng thay icon bàn cờ.

- 2026-10-14: GameTools thay Camera bằng Lưu thế cờ; thứ tự Lưu ván → Lưu thế → Bạn bè → Âm thanh → Toàn màn hình. Lưu thế chưa nối dữ liệu, bấm báo đang phát triển.

- 2026-10-14: Người mới vào giữa ván không được lưu cho tới khi ván đó kết thúc. Người đã nhận kết quả ván 1 vẫn có thể lưu ván 1 trong khi ván 2 đang diễn ra; khi ván 2 kết thúc, mục tiêu Lưu thay bằng ván 2. Không lấy bản lưu cũ của phòng khi mới vào giữa ván.

- Đã lưu/Ván đấu: người dùng sở hữu danh sách luôn bên trái nếu là người chơi, dù cầm Đỏ hay Đen; biểu tượng và kết quả theo đúng phe. Replay mặc định quân người đó ở dưới, không phụ thuộc bên đi trước.

- Sau khi ván kết thúc mới có bản ghi để lưu. Người chơi và khán giả đều dùng nút Lưu ván vừa kết thúc; lưu xong nút Đã lưu ván đấu bị khóa để tránh trùng.
- Nút giữ ván vừa kết thúc trong thời gian còn ở màn bàn cờ, kể cả khi chuyển ghế hoặc reset; kết quả mới thay bản ghi cũ. Rời màn hình mà chưa lưu thì bản ghi local chưa lưu không được giữ.
- Local lấy các snapshot từ gameStore.history và trạng thái kết thúc, bao gồm thế gốc tùy chỉnh/Cờ Úp. History không cắt500 snapshot để tránh mất đầu ván; giới hạn500 nước của API Pikafish vẫn giữ.
- Online RoomService chụp lastCompletedMatch trước khi đổi ghế/rời phòng, gồm id, thời điểm, tên hai bên và diễn biến. Khán giả vào giữa ván nhận đầy đủ diễn biến sau khi kết thúc. Bản này giữ qua chuyển ghế/reset, được bỏ khỏi snapshot khi ván mới bắt đầu để tránh phát lại dữ liệu lớn mỗi tick; client giữ bản vừa nhận.
- Client chỉ lưu bản có trạng thái cuối finished; không nhận dữ liệu này làm lệnh gameplay. Không công bố hoặc lưu ván máy thành phòng online.
- savedMatchesStore lưu localStorage theo tên người dùng hiện tại, chưa có tài khoản/auth/database hoặc đồng bộ thiết bị. Lưu thất bại do quota phải báo lỗi, không báo thành công/không tự xóa ván cũ. Có xóa từng ván trong Đã lưu → Ván đấu.
- Danh sách Đã lưu dùng dữ liệu thật thay fixture; mặc định Ván đấu, Thế cờ vẫn chưa nối dữ liệu. Xem lại điều hướng vào chính GamePage với replayData; Board hiện có chỉ đọc, Đầu/Trước/Sau/Cuối và thanh chọn nước; không khởi động engine/clock hoặc thay đổi ván đang chơi.
- Lưu từ lịch sử đấu của mình và của người khác đang phát triển; không có nút lưu giả cho dữ liệu lịch sử minh họa.
- Phạm vi mở theo yêu cầu14/10/2026: Đã lưu, trình xem lại và thông báo đang phát triển trong Lịch sử; các khu vực/geometry avatar còn lại vẫn khóa.

- 2026-10-14: Nút Lưu dùng icon đĩa mềm vàng trong GameTools, thứ tự Camera/Lưu/Bạn bè/Âm thanh/Toàn màn hình. Chưa có ván kết thúc hoặc đã lưu thì khóa; bỏ nút nổi bên dưới.

- 2026-10-14: Xem lại mở screen replay toàn màn hình bằng session, đóng Lịch sử trước khi chuyển. Tái dùng Board/PlayerCard/useBoardLayout, hiện tên hai bên và điều khiển diễn biến bên dưới; quay lại Home. Không dùng dialog bàn nhỏ nữa, không nạp ván vào gameStore/khởi động máy hoặc phòng online. useBoardLayout nhận compactReservedHeight tùy chọn (mặc định130 giữ màn cũ, replay0).

- 2026-10-14: Mở replay tự phát mỗi1,2 giây/nước, dùng animation Board; tự dừng ở cuối. Có Phát/Tạm dừng; tua Đầu/Trước/Sau/Cuối/thanh trượt sẽ tạm dừng, bấm Phát tiếp tục (ở cuối phát lại từ đầu). Desktop cụm tua nằm bên trái dưới người Đỏ; compact đặt dưới bàn để vừa màn. Không có chat/view hoặc kết nối phòng replay.

- 2026-10-14: Quy tắc hiện hành thay các cách hiển thị trước: KHÔNG có màn/component bàn replay riêng. App dùng cùng GamePage cho gameplay và replayData. SavedMatchReplay đã xóa; useReplayPlayback chỉ điều khiển vị trí lịch sử/animation, ReplayControls chỉ chứa nút và thanh tua. GamePage dùng nguyên Board/ChessPiece/PlayerCard/useBoardLayout/layout hiện hành. Data states[0] là thế ban đầu, các snapshot tiếp theo là lịch sử nước đã lưu; tiến/lùi chọn snapshot, không sửa dữ liệu gốc.
- Replay vô hiệu hóa useComputer (kể cả demo), tick/hoàn tất animation của gameStore, mọi game command/select/start/reset/draw/resign/queue và chat gửi; back chỉ đóng replay về Home, không reset/rời trận thật. Không lưu lại replay thành ván mới. Clock/vòng xanh/ready/chat/view và hiệu ứng intro trận thật không hiện. Tự phát sau entrance,1,2 giây/nước; animation Board dùng chung, timer được dọn khi tua/rời. Tua nằm trong PlayerCard trái.

- 2026-10-14: Khung tua220px, Phát/Tạm dừng toàn chiều ngang ở hàng trên; hàng dưới cố định Lùi/số nước/Tiến. Bỏ nút đầu/cuối và thanh range; nút nâu/viền vàng dùng selectionPalette chung, icon SVG. Chỉ đổi ReplayControls, giữ gameplay/layout/avatar.

- 2026-10-14: ?? l?u ? V?n ??u lu?n ??t ng??i l?u b?n tr?i n?u l? ng??i ch?i, bi?u t??ng phe v? k?t qu? theo ??ng ng??i. Replay m?c ??nh qu?n c?a m?nh ? d??i, m?nh b?n tr?i, ??c l?p b?n ?i tr??c. Kh?n gi? gi? ?? b?n tr?i/d??i. D?ng savedMatchSide chung; ?p d?ng c? b?n l?u c? theo t?n.

- Đánh thử gọi Pikafish cấp10 với thinkMs=500ms; cấu hình này chỉ áp dụng nhánh thử, không ảnh hưởng trận computer thường.

- Bố trí hiện tại: icon đổi Xem lại/Đánh thử nằm dưới Phân tích/Gợi ý, cách thêm10px so với khoảng cách cũ.

- Thời gian Pikafish bàn thử hiện hành: thinkMs800ms, thay500ms trước đó.

- Replay Ván đấu hiển thị nút Đánh thử dưới cụm Phát/tiến lùi, cách50px; dùng chung nút đổi chế độ và phím Space.

- Saved match row piece icons are ordered red then black regardless of the owner's side; player ordering remains owner-left.

- Đã chơi tự lưu ván hoàn tất của owner vào playedMatchesStore, tách kho Đã lưu thủ công; dữ liệu theo tên/localStorage, chưa đồng bộ tài khoản. Lịch sử mới bắt đầu từ lúc triển khai, không phục hồi các ván cũ chưa ghi.

- Played history chỉ lưu ván online mà owner là một trong hai người chơi, đánh máy/local bị loại; kho lọc isOnline để loại entry local cũ. Người chơi chủ động rời ván đang chạy phải xác nhận, server chốt thua với reason leave và phát kết quả cho client lưu.

- Đã chơi replay yêu cầu lưu ván hoặc lưu thế cờ trước khi vào Đánh thử. Khi chưa lưu, ẩn nút đổi chế độ; Space báo cần lưu, playback gốc chỉ xem/tua. Lưu ván replay bằng tiện ích lưu ván; lưu thế gắn sourceMatchId để mở quyền. Chính sách này chỉ áp dụng replay được mở từ tab Đã chơi.

- Lịch sử Đã chơi giữ mỗi ván một tháng lịch tính riêng từ endedAt; hết hạn tự lọc/xóa khỏi localStorage lúc tải kho và theo timer khi app đang mở. Ván kết thúc ngày mai có hạn riêng từ ngày mai.

- Nút Phân tích/Gợi ý là UI đang phát triển: hover pointer, click thông báo Đang phát triển.

- Máy đánh thử trong vùng đã lưu dùng riêng Pikafish cấp10 với thinkMs2500 tối đa; không fallback/basic AI.

- Các status replay (Đang phát triển/nhắc lưu/kết quả lưu) hiển thị bằng toast như CustomPositionPage, giữa cạnh dưới bàn và tự ẩn3 giây.

- Cấu hình hiện hành của Pikafish khi đánh thử từ replay lưu: level10, thinkMs700ms.

- 2026-10-14: Replay bàn chính và bàn thử chỉ phát cue tiếng đi quân cho mỗi nước; không phát tiếng ăn quân, chiếu, chiếu hết, khai cuộc hoặc cảnh báo đồng hồ.

- 2026-10-14: Chỉnh lại quy tắc âm thanh: chỉ thao tác tua lùi/tiến (kể cả tua trong bàn thử) phát tiếng đi quân duy nhất. Nước đi trực tiếp của người/máy trong bàn thử vẫn dùng âm thanh bình thường theo tình huống.
- 2026-10-14: Tiêu đề thế cờ hiển thị chữ số bằng NumberText chung (font-number, lining/tabular, compact 0.9em) để ngay hàng với tên.
- 2026-10-14: NumberText trong tên thế cờ dùng weight normal, tránh kế thừa font-black khiến số quá đậm.
- 2026-10-14: Bộ ảnh điều khiển mới 6c0cdab5 thay khung, Phát, Lùi/Tiến, nền số, Máy đi, Phân tích/Gợi ý trong component chung. Các điều khiển độc lập; nhãn/số động, disabled dim và hover giữ hoạt động. Không lấy biển Máy Cơ bản, trial vẫn Reset ở giữa.
- 2026-10-14: Bàn thử thay Reset giữa hàng bằng số nước hiện tại/tổng nhánh; Reset ảnh 0fed4f87 nằm cạnh Gợi ý hàng dưới. Component chung áp dụng cả thế tùy chỉnh và replay; phím ↑/↓ vẫn reset.

- 2026-10-15: Ô sửa tên Thế cờ dùng Times New Roman regular riêng cho chữ số, tỷ lệ90%, lining/tabular như NumberText khi hiển thị; giữ font chữ và input native.

- 2026-10-15: Thanh cuộn danh sách Thế cờ đổi thumb sang nâu đậm#613014 để tương phản rõ trên nền vàng; giữ kích thước/vị trí và track trong suốt.

- 2026-10-15: Quy tắc máy mới do người dùng chốt: mọi chức năng máy chỉ dẫn, hướng dẫn, gợi ý, phân tích nước đi và chơi với máy ngoài chế độ đấu máy10 cấp đều dùng Pikafish mạnh nhất (không chọn sai số/hạ sức mạnh), thời gian search700ms (0,7 giây). Riêng chế độ đấu máy10 cấp giữ nguyên cấu hình từng cấp, kể cả cấp10. Thay thế các cấu hình máy cơ bản hoặc thời gian search cũ trong phạm vi trên.700ms là thời gian engine tính, không phải tổng thời gian mạng/khởi động/diễn giải. Giữ hạn chế trợ giúp trong trận người thật; không tự bật engine cho biến thể chưa được hỗ trợ. Phiên này chỉ ghi quy tắc tài liệu, chưa áp dụng code.

- 2026-10-15: Gợi ý đấu máy/bàn thử Vị trí tùy chỉnh dùng usePikafishHint riêng, Pikafish level10/search700ms từ FEN hiện tại bên người chơi; chỉ chạy khi tới lượt người chơi, chặn online/demo/replay/Cờ Úp. Không ghi store, không chọn/đi quân, không đổi lượt/history/clock hoặc bật Máy đi. Board vẽ1 mũi tên xanh opacity0.82 qua tọa độ chung/flipped, pointer-events:none. Bấm lại hủy request cũ/tính lại; đổi board/lượt/phase/reset/undo/rời hủy và bỏ kết quả cũ. Clock tick không xóa gợi ý. Phân tích vẫn đang phát triển.

- 2026-10-15: Ba nút Phân tích/Gợi ý/Reset dùng chung ToolArtworkButton, hover vàng#ffe08b alpha8% tức thì như mũi tên, mask theo alpha artwork. Gợi ý nhấn/đang tính thu94%, artwork brightness0.35; hết request/lỗi/hủy trở lại bình thường, vẫn cho bấm lại tính mới. Đồng bộ nút Gợi ý đấu máy. Không thay gameplay.

- 2026-10-15: Sửa render dư do Gợi ý: trước đây effect setHint/setThinking sau đổi thế tạo thêm render GamePage ngay đầu animation (regression đo2 render). usePikafishHint nay gắn kết quả/thinking với context board/turn/phase/side/revision; ẩn đồng bộ trong render, effect chỉ abort. Sau sửa đo1 render, không giữ mũi tên cũ khi đổi thế; clock tick giữ gợi ý. Không đổi400ms/đường đi/gameplay.15/15 test hint/stability/trial/computer PASS. Chưa xác nhận độ mượt/frame bằng browser.

- 2026-10-15: Người dùng báo mọi thao tác kém mượt từ khi thêm Gợi ý. Giảm tải liên quan: ToolArtworkButton mask hover display:none khi không hover; useReplayTrial memo nước hợp lệ theo game/selected, không tính lại khi UI Gợi ý render. Regression giữ reference moves/không gọi lại rules và đổi chọn tính mới PASS.16/16 test hint/stability/trial/computer PASS; typecheck/build PASS. Không đổi geometry/luật/animation. Chưa đo frame browser, chưa xác nhận hết vấn đề toàn ứng dụng; cần reload tab để nạp dist mới.

- 2026-10-15: Quy tắc mới thay phạm vi Gợi ý và lùi theo cặp: mọi nút Gợi ý ở bàn thử (replay ván/thế đã lưu và Vị trí tùy chỉnh) dùng Pikafish mạnh nhất/search700ms,1 mũi tên xanh/read-only; replay xác định phe theo savedMatchSide. Bỏ nút Gợi ý riêng ở ván Cờ Tướng/Cờ Úp thông thường; giữ chặn hỗ trợ trong trận người thật và báo chưa hỗ trợ jieqi. Lùi/Tiến mỗi lần đúng1 nửa-nước (1 lần đi quân) cả nút và ←/→, không lùi theo cặp người/máy. Giữ reset/hủy/memo và hover/pressed hiện hành.

- 2026-10-15: Tên hiển thị máy Pikafish đổi thành Ông Hoàng toàn ứng dụng: thiết lập desktop/compact, tên đối thủ, trạng thái suy nghĩ/kết nối, tooltip Gợi ý và thông báo lỗi frontend/server. Mã engine pikafish, API/type/path/binary và giấy phép giữ nguyên. Chặn So tài nhận cả tên mới và tên cũ để tương thích; không đổi tên người chơi/bản ghi lịch sử đã lưu.

- 2026-10-15: Ván đấu máy thông thường (computerMatch, cả Cờ Tướng/Cờ Úp) không có Lưu ván/Ghim thế, mã phòng, lượt xem/panel người xem hoặc chat (desktop/compact). showRoomFeatures dùng chung; useChat disabled cả send/listener/scroll, useMatchSaving không ghi ván máy. Bàn thử tùy chỉnh/replay giữ chức năng riêng đã chốt; online/local hai người giữ UI phòng. Không sửa avatar, khung tên hoặc engine.
- 2026-10-16: Theo yêu cầu áp dụng avatar/khung thật trong Lịch sử: Player chung Đã chơi/Đã lưu và avatar hai người ở Thế cờ dùng MessageAccountAvatar/AccountAvatar. Giữ slot51px/34px, tên/kết quả/bố cục và ảnh máy riêng. Phạm vi nguồn avatar mở riêng task, khóa lại sau task.
- 2026-10-16: Bàn online chưa đủ2 ghế có người thì ẩn nút Sẵn sàng. Lưu thế cờ chỉ khả dụng sau ít nhất1 nửa-nước (match.moveCount>0), disabled nút và guard callback khi0; áp dụng GamePage chung online/local/replay/trial. Không đổi đồng hồ/ready server.
- 2026-10-16: Theo yêu cầu căn giữa thông báo rỗng trong Lịch sử: Đã chơi/Đã lưu ván dùng1 hàng chiếm vùng còn lại và place-items-center khi không có record; Thế cờ rỗng flex1/grid center. Giữ layout có dữ liệu và typography.
- 2026-10-16: Tăng chữ thông báo danh sách rỗng Lịch sử và đồng bộ Đã chơi/Đã lưu ván/Thế cờ bằng historyEmptyTextClass chung28px theo scale; giữ căn giữa2 chiều. Không đổi ghi chú hay nội dung hàng có dữ liệu.
