- 2026-10-27: Theo user, đồng bộ khoảng cách các thẻ Đã lưu laptop với Ranking: row-gap8px×scale dialog. Mobile giữ7px như cũ. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo ảnh user, Lịch sử > Đã lưu laptop không ép hai dòng vào chiều cao panel: list dùng hàng max-content, mỗi thẻ đủ cao theo title/user/metadata/ghi chú và overflow-y-auto cuộn xuống. Giữ layout một hàng title/meta; bàn giữ tỷ lệ theo chiều cao thẻ ban đầu. Mobile markup/height policy unchanged. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Đính chính sau user: bỏ ép chiều cao cố định title/meta laptop; giữ title/meta mỗi phần trên một hàng và kích thước chữ, cho grid row tự tăng nếu nội dung cần. Parent list đã overflow-y-auto nên cuộn xuống khi thẻ dài; mini bàn giữ kích thước mount cố định. Mobile giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, thêm dải gradient + bóng mép trái giống dòng Xếp hạng cho từng dòng Lịch sử > Đã lưu ở cả laptop/điện thoại. Mobile scale dải theo1.5×rowScale như Ranking; không đổi khung, kích thước hoặc nội dung dòng. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Ổn định layout sau khi tăng tên/metadata Đã lưu laptop: tiêu đề khóa 1 dòng ellipsis, vùng cao32px×scale; metadata tăng16px theo scale (tối thiểu15), icon17–18px, vùng cao24px×scale để không kéo giãn grid/card/bàn. Điện thoại giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Đính chính theo user: không dùng chung khung dòng Xếp hạng cho Bạn bè/Lịch sử laptop và hoàn tác chiều cao138px. Bạn bè trở lại row90px/nền-gradient-border cũ; Đã chơi Lịch sử trở lại 8 hàng auto-height/khung cũ. Chỉ thêm dải gradient + shadow mép trái y hệt Ranking; giữ gap8px×scale đã chốt và FriendRowShade nâu. Mobile không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user, đồng bộ dòng Bạn bè và Lịch sử Đã chơi LAPTOP trực tiếp với Xếp hạng qua socialPlayerRowClass/getSocialRowStyle/socialPlayerListClass: cao138px×scale, bo/nền/viền và gap8px×scale. FriendRow giữ lớp nâu quanh danh hiệu/nút; mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user, Lịch sử > Đã lưu laptop tăng tên ván20→23px theo scale; metadata số nước/lượt đi tăng lên18px theo scale (tối thiểu15px) và icon theo dòng. Điện thoại giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, đồng bộ gap dòng Đã chơi Lịch sử và các danh sách Bạn bè với Xếp hạng bằng --social-row-gap=8px×scale; Lịch sử giữ 8 hàng bằng cách trừ tổng gap56px. Bạn bè LAPTOP căn hàng header tab Danh sách/Thêm bạn cùng cao56px để vị trí search và đầu danh sách cố định khi đổi hai tab; điện thoại không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user mobile Đã lưu: bỏ border/background/padding của textarea ghi chú để không có khung con. Khi đang sửa tên/ghi chú, pointerdown dấu tích giữ focus bàn phím; click tiếp tục gọi lưu, editor chỉ đóng sau API thành công. Mobile và desktop cùng hành vi lưu; desktop style ghi chú giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user riêng LAPTOP: tên Xếp hạng22→24px, Đã chơi Lịch sử21→23px, Bạn bè22→24px; trạng thái Xếp hạng19→21px và Bạn bè19→21px, tất cả theo scale dialog. Điện thoại giữ nguyên; không đổi cỡ trạng thái Lịch sử. Build PASS, dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user laptop/mobile, ghi chú Đã lưu tự mở hết trong khi sửa, lưu thành công mới thu về giới hạn dòng đang có. Lịch sử reset Đã chơi khi mở/đóng (X/Escape/native close/open attribute), unmount phần Đã lưu để bỏ draft tên/ghi chú, trạng thái mở/xác nhận/tooltip; không tự lưu draft. Dọn toast và chặn phản hồi lưu Đã chơi phiên cũ hiện toast sau đóng. Regression lifecycle2/2 PASS (TEMP workspace tránh ENOENT cache), typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, ghi chú Đã lưu laptop thu gọn tối đa2dòng và ellipsis khi dài hơn; click mở đầy đủ/click lại thu. Mobile giữ3dòng. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user riêng Đã lưu laptop: tên ván20px theo scale, ghi chú20px thay22/loại padding dọc9.5/nhích nhãn và nội dung lên. Đọc thu3dòng có ellipsis, click mở hết/click lại thu. Sửa giữ chiều cao đang hiển thị, nội dung có sẵn không tự nở; chỉ tăng khi số dòng thực tăng. Mini bàn lấy kích thước ban đầu theo scale, không quan sát chiều cao dòng nữa nên ghi chú không phóng bàn. Mobile giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

# Lưu và xem lại ván đấu

- 2026-10-28: User yêu cầu mọi nơi dùng bàn cờ có âm thanh. Replay/bàn thử khi phát hoặc tua phát cue nước đi/ăn quân/chiếu/chiếu bí tương ứng; bàn Chơi với máy phát intro âm thanh khi bắt đầu. Tôn trọng thiết lập Tắt tiếng; clock chỉ báo ở mode có clock.

- 2026-10-27: Theo user, ghi chú laptop tăng chiều cao thêm5px (padding dọc7→9.5px) và chữ tăng7px (15→22px theo scale), gồm nhãn/nội dung/sửa; mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, tăng nhẹ chữ Ghi chú ở Đã lưu/Ván đấu laptop từ13 lên15px theo dialog scale, gồm chế độ đọc và sửa; mobile giữ13px.

- 2026-10-27: Theo ảnh user, cụm quân giữa hai người trong Đã lưu/Ván đấu laptop căn giữa theo bề ngang riêng của cụm avatar+tên (không căn toàn ô thông tin), đồng thời giữ trung điểm dọc giữa hai hàng. Mobile giữ nguyên.

- 2026-10-27: Đính chính quân cờ giữa hai người trong lịch sử đã lưu laptop: vùng hai user dùng justify-content:space-between để người đầu ở trên, cụm quân cờ ở trung điểm dọc và người sau ở dưới trong ô thông tin; mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, cụm quân cờ giữa hai người trong dòng Đã lưu/Ván đấu laptop được đặt vào hàng riêng căn giữa vùng thông tin; mobile giữ cách hiển thị cũ. Build cần chạy.

- 2026-10-27: Đính chính vị trí con trỏ ghi chú: khi laptop sửa ghi chú đã có nội dung, đặt con trỏ cuối nội dung; ghi chú trống đặt đầu. Mobile giữ vị trí con trỏ cuối như trước. Build cần chạy.

- 2026-10-27: Theo user, riêng ghi chú trong Đã lưu/Ván đấu laptop, bấm bút mở nhập ngay trong khung ghi chú hiện có (không vẽ khung textarea lồng), con trỏ đặt đầu nội dung; mobile giữ khung và vị trí con trỏ cũ. Build cần chạy sau chỉnh.

- 2026-10-27: Đính chính phần mini bàn Đã lưu laptop: bỏ trần chiều ngang; ResizeObserver lấy toàn bộ chiều cao trong khung dòng (trừ padding 7px mỗi mép) rồi tính rộng theo tỷ lệ bàn 1134:1296 để bàn phủ kín chiều cao. Khoảng cách nội dung ngang15px, avatar là vùng duy nhất mở hồ sơ, mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA. Build cần chạy sau chỉnh.

- 2026-10-27: Theo user, riêng Lịch sử > Đã lưu/Ván đấu LAPTOP, mini bàn tự căn theo chiều cao dòng và cách vùng thông tin 15px; trần rộng 30% danh sách. Chỉ avatar mở hồ sơ, tên và phần khác không mở; điện thoại giữ nguyên. Sửa selector kiểm tra thứ tự người chơi theo nút avatar sau khi tách vùng bấm. Build PASS, dist cập nhật; không chạy test hoặc browser QA.

- 2026-10-27: Theo user riêng Đã lưu/Ván đấu LAPTOP: miniBoard178→224scale (cap30%list), grid bàncol1/span4row; title trên cùng col2–3 cạnh bàn, user48/name25scale thay34/21, khungnamefitcontent không kéo dài. Metadata và ghi chú chỉcol2–3 dưới user, không dưới bàn. Nút Xem đổi ▶ Xem lại151×52scale/chữ19 giống Đã chơi; thùngrác36×40/icon24px. Mobile giữ markup/geometry cũ, initialboard178 giữ. Typecheck/build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: User đính chính bỏ giao diện dòng ngang vừa phục hồi; Đã lưu/Ván đấu LAPTOP dùng cùng MobileSavedMatchRow với điện thoại: tiêu đề sửa được, miniBoard, hai người/cặpquân, nút Xem, metadata/ghi chú sửa được, thùng rác góc phải. Desktop giữ avatar34×scale và tên21×scale theo ngữ cảnh trước, mini178×scale; hai hàng tối thiểu/giãn nội dung, compact giữ nguyên. Giữ savedAt mới nhất đầu, xác nhận xóa/thời gian lưu/chức năng. Build/typecheck PASS; dist cập nhật; chưa browser QA. Quy tắc này thay lượt phục hồi dòng ngang, khóa lại phạm vi.

- 2026-10-27: User xác nhận khôi phục Đã lưu/Ván đấu LAPTOP về dòng ngang: ngày giờ endedAt, hai người/kết quả, cặp quân, Xem lại, thùng rác; 8slot như Đã chơi, bỏ miniBoard/tiêu đề/metadata haihàng desktop. HistoryPlayer tách component dùng chung giữ nguyên markup Đã chơi. Mobile giữ MobileSavedMatchRow/miniBoard/thùngrác góc phải. Thứ tự savedAt giảm dần cả hai, giữ xác nhận xóa/thời gian lưu/replay; Thế cờ không đổi. Build/typecheck PASS; dist cập nhật; chưa browser QA. Khóa lại phạm vi.

- 2026-10-27: User đính chính muốn hoàn tác giao diện dòng Đã lưu laptop, không phải thứ tự. Khôi phục sort savedAt giảm dần cho ván/thế cảmobile/laptop; giữ contextmenu Đã chơi/padding10. Chờ xác định bố cục cũ cần phục hồi vì HEAD cũng là miniBoard2hàng. Build PASS, dist cập nhật; giao diện chưa sửa.

- 2026-10-27: Theo user hoàn tác thứ tự Đã lưu riêng laptop về reverse mảng như trước lượt sort mới nhất; áp dụng ván/thế, compact giữ sort savedAt giảm dần. Đã chơi laptop contextMenuOnly trong usePressToRevealDelete: chuột phải mở Lưu ván cờ, chuột trái giữ không mở; mobile giữ200ms. Bảng Lưu ván cờ padding10px thật qua prop HistoryHoldNotice, tooltip thời gian giữ padding cũ. Bấm ngoài đóng/lưu/API giữ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user cả điện thoại/laptop Lịch sử mới nhất lên đầu: Đã chơi sort endedAt giảm dần, Đã lưu ván sort savedAt giảm dần (legacy thiếu timestamp fallback endedAt), Thế cờ sort savedAt giảm dần. Bỏ reverse theo thứ tự mảng để API/local đều thống nhất, filter tạo mảng mới không mutate store. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Sửa bộ phát replay theo user báo tự phát/nút Phát không chạy: timeout phụ thuộc recordingId thay object recording để refresh cùng ván không reset1200ms liên tục; đọc snapshot mới qua ref. Đổi ID reset step0/animation/autoplay, cuối ván bấm Phát chủ động đặt playingtrue/step0; bản0nước không chạy giả. Giữ chờ entrance, seek/pause và dữ liệu. Regression replay-playback2/2 PASS (refresh400ms, autoplay, pause/resume/restart, đổi ván/chờ entrance); build/typecheck PASS, dist cập nhật; chưa browser QA/live xác nhận nguyên nhân cụ thể trên dữ liệu user.

- 2026-10-27: User chốt đã bắt đầu trận là được tính/lưu, không cần đi nước đầu. ContentRepository.history trả cả playing/finished có started_at, trạng thái chưa kết thúc dùng initial_state hiện có (0 nước), không đọc final_state null; timestamp hiển thị fallback started_at. Bookmark chấp nhận playing nếu actor là người tham gia theo DB, finished giữ quyền cũ; chưa bắt đầu vẫn chặn, không nhận board/kết quả client. RecordedMatch thêm startedAt và recordedMatchStarted chung cho saved/played: cho playing có mốc bắt đầu hoặc finished, loại ready; local played upsert cùng ID khi kết thúc thay vì nhân đôi/giữ bản cũ. Mở Lịch sử tải lại history+saved theo account hiện tại; Đã chơi/Đã lưu hiển thị Đang đấu khi chưa có kết quả. Bookmark là tham chiếu nên khi ván kết thúc API trả kết quả/moves đầy đủ của cùng ván. Không migration/thay Elo/vàng/năng lượng. Regression repository+saved-history+store+match-saving23/23 PASS; build/typecheck PASS, dist cập nhật. Bổ sung integration assertion bắt đầu0nước/bookmark trước kết thúc nhưng chưa chạy MySQL integration hoặc browser live; backend cần nạp code mới, không restart/deploy trong task.


- 2026-10-27: User nhắc Lưu ván cờ phải lưu đúng ván trong Đã chơi và báo thông báo gợi ý đôi lúc lệch. Sửa HistoryHoldNotice portal vào chính dialog sở hữu (thay body cho popup tương tác), giữ popover top-layer để escape clipping nhưng không rơi ngoài modal/inert; áp dụng cả tooltip Đã lưu. InviteSentNotice chung portal vào dialog gần nhất hoặc body khi ngoài dialog, dùng popover manual fixed50%/50%, insetauto/margin0/widthmax và transform căn giữa có sẵn trước paint; useLayoutEffect mở/animate để không nhảy góc ban đầu và không lệch theo transform khung cha. Giữ font18/nền/bay48/fade1300, dữ liệu/khóa layout còn lại. Regression saved-history+store15/15 PASS, gồm lưu bằng store thật đúng ID/hiện trong Đã lưu/portal đúng modal/căn giữa ban đầu cảmobile+laptop; build/typecheck PASS, dist cập nhật. Chưa browser hoặc MySQL live QA; không khẳng định đã đo vị trí pixel thực.


- 2026-10-27: Theo user, bấm Lưu ván cờ trong ô nhấn giữ Đã chơi gọi savedMatchesStore.save hiện có, thành công mới đóng ô và hiện thông báo gợi ý Đã lưu qua useInviteSentNotice (cùng mẫu Thêm bạn/Theo dõi). Lỗi hiện thông báo không thể lưu và giữ ô để thử lại; pending khóa nút/ref chống gọi lặp. Icon và chữ đều nằm trong nút bấm, giữ khung vàng dùng chung; click action không bị chặn bởi click thả sau giữ. Regression history10/10 PASS gồm pending/không báo thành công sớm/lỗi/thử lại/mobile+laptop; build/typecheck PASS, dist cập nhật; chưa browser/API live QA.


- 2026-10-27: Theo user, dòng Đã chơi nhấn giữ200ms hiện nguyên icon PositionIcon(save) kèm khung nút vàng gameUtilityButton dùng trong trận + chữ Lưu ván cờ; cùng HistoryHoldNotice với thời gian lưu ở Đã lưu, top-layer/căn giữa theo điểm bấm/mép dưới cách10px thật. Đã chơi giữ ô sau thả tay/nhả chuột/rời dòng/cuộn, bấm trong ô vẫn giữ và bấm ngoài mới ẩn; đổi tab/đóng dọn ô. Chặn click thả sau giữ mở profile/replay. Đã lưu vẫn thả tay ẩn tooltip thời gian. Bấm icon hoặc chữ Lưu ván cờ gọi luồng lưu hiện có; thành công hiện thông báo gợi ý Đã lưu, lỗi không báo thành công. Mobile/laptop cùng hành vi, giữ avatar/bố cục. Regression history8/8 PASS; build/typecheck PASS, dist cập nhật; chưa browser QA. Mở riêng phản hồi nhấn giữ Đã chơi task này rồi khóa lại.


- 2026-10-27: Theo user, thùng rác Đã lưu/Ván đấu mobile+laptop mở thông báo Xác nhận với tên ván và Hủy/Đồng ý (tái dùng mẫu xác nhận chung, nền mờ toàn viewport). Chỉ Đồng ý mới gọi remove/API; pending khóa nút/chống gọi lặp, lỗi giữ thông báo để thử lại, thành công mới đóng. Nhấn thùng rác dọn tooltip thời gian lưu. Phạm vi mở riêng xác nhận rồi khóa lại. Regression history6/6 PASS gồm Hủy/Đồng ý/lỗi/thử lại cả2viewport; build/typecheck PASS, dist cập nhật; chưa browser/API live QA.


- 2026-10-27: Theo user, Lịch sử/Đã lưu nhấn giữ dòng ván 200ms hiện ngày giờ lưu phía trên điểm bấm, mép dưới cách điểm bấm10px thật (mobile/laptop), thả tay/nhả chuột/hủy pointer/rời dòng/cuộn/di chuyển/đổi dòng/đóng dọn thông báo ngay, chặn click thả sau giữ; contextmenu không mở lại tooltip sau nhả. API saved history trả savedAt từ saved_matches.saved_at sẵn có; local ghi savedAt khi lưu, bản legacy thiếu mốc báo chưa có thông tin, không dùng endedAt làm thời gian lưu. Tên ván font-black→font-bold, mobile bỏ stroke0.2px cả input/hiển thị đồng độ đậm; không đổi tên người/avatar/bố cục. Phạm vi mở riêng task này rồi khóa lại. Regression saved-history/store7/7 PASS (TEMP workspace khắc phục ENOENT cache môi trường); npm.cmd run build/typecheck PASS, dist index-DQUkWA7D.js xác nhận thông báo. Chưa browser/MySQL live QA; backend cần nạp code mới, không restart/deploy.


- 2026-10-27: Theo user, máy trong Vị trí tùy chỉnh và Đánh thử luôn Fairy mạnh nhất: usePositionEditor chốt computerEngine=fairy/computerLevel10 khi vào, useReplayTrial gọi fairyStockfishApi.move level10 với FEN gốc+history nhánh riêng thay Pikafish/700ms. Cấp Đấu với máy thường giữ lựa chọn1–10; máy trong trial vẫn mặc định tắt, không tự đi khi vào. Giữ cancel/reset/replay/socket cô lập và Gợi ý hiện tại. Replay-trial3/3 PASS xác nhận Fairy10/history/cancel; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, Xem lại từ Lịch sử/Đã chơi cũng được chuyển ngay sang Đánh thử, không cần lưu ván/thế trước. Gỡ trialAllowed/save guard trong GamePage và luôn truyền toggle cho controls desktop; mobile/Space dùng cùng callback. Giữ snapshot trial độc lập và dữ liệu lịch sử gốc. Thay quy tắc bắt lưu trước đó. Typecheck/build PASS; dist index-jqKm3lQG.js xác nhận cập nhật; chưa browser QA.

- 2026-10-26: User yêu cầu bật lại icon chuyển Xem lại/Đánh thử ở tất cả nơi đã có. GamePage.toggleTrial bỏ chặn compact bằng thông báo Chức năng đang được cải tiến; mobile bấm icon hoặc Space dùng cùng toggle thật desktop. Icon dưới Board nhận trial.active để đổi nhãn Về xem lại/Đánh thử đúng trạng thái; giữ điều kiện lưu ván/thế trước khi thử, nhánh snapshot riêng/cancel/reset và vị trí icon. Desktop vốn hoạt động giữ nguyên; không thêm nút vào PvP thật. Replay-trial3/3 PASS; typecheck/build PASS, dist index-CUprs0AC.js xác nhận cập nhật; chưa browser QA.

- 2026-10-25: Theo user, tên user Đã lưu laptop/mobile dùng khung vàng/xanh của Đã chơi: historyPlayerFrame chung gradient/viền/bóng theo winner snapshot (vàng thắng, xanh còn lại như cũ), nối dưới avatar bằng negative margin/z10, giữ font/cỡ/avatar. Đã chơi chỉ tách token màu không đổi hình học. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, chỉ tên ván Đã lưu đổi font-body như ghi chú, cả mobile/laptop; input tên mobile đồng font, bỏ NumberText ở title để số/chữ cùng font. Giữ cỡ/đậm/nền/tên người chơi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User đính chính chỉnh font TÊN NGƯỜI CHƠI trong Đã lưu, không phải tên ván. Hoàn tác font tên ván/ô nhập về trước; tên user laptop/mobile dùng font-heading/extrabold/stroke0.2 như name Xếp hạng, chữ/số cùng font. Giữ cỡ/vị trí. Build/typecheck PASS; dist cập nhật; chưa browser QA. Thay ghi chú Arial tên ván ở lượt ngay trước.

- 2026-10-25: Theo user, tên ván tab Đã lưu dùng font-arial cùng tên user cả laptop/mobile; ô nhập tên mobile cũng Arial, bỏ NumberText riêng để chữ/số cùng font. Giữ cỡ/đậm/nền và bố cục. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Đã lưu cả laptop/mobile thay vs bằng HistoryMatchPieces (cùng asset Quân đỏ+Quân đen/quân úp và kích cỡ47/90token như Đã chơi), thứ tự đỏ trước giữ độc lập owner. Không đổi avatar/tên/replay/dữ liệu. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, nhập tên/ghi chú MOBILE nâng/cuộn tức thì: bỏ timer100ms và smooth, dùng instant, xử lý thêm focusin trước keyboard resize, giữ scale. Lịch sử cả laptop/mobile bỏ nav Ván đấu/Thế cờ; tab Đã lưu render trực tiếp SavedMatchesList. Chỉ gỡ UI truy cập Thế cờ, không xóa dữ liệu saved_positions hoặc chức năng ghim hiện có. Build/typecheck PASS; dist index-D1mshzuN.js cập nhật; chưa browser/keyboard thật QA.

- 2026-10-25: Theo user, nhập tên/ghi chú Đã lưu MOBILE giữ scale/kích thước HistoryDialog khi visualViewport resize do bàn phím. data-history-input focus auto/cuộn giữa; useHistoryLayout bỏ đo scale khi đang focus, sau100ms cuộn ô nhập và translate dialog lên theo phần ô nhập bị viewport che (chừa16px), dọn timer/translate khi resize không nhập/unmount. Desktop giữ nguyên. Build/typecheck PASS; dist có data-history-input; chưa QA bàn phím điện thoại thật.

- 2026-10-25: Theo user, bút sửa ghi chú Đã lưu/Ván đấu MOBILE mở expanded=true và textarea autoFocus/con trỏ cuối. useLayoutEffect theo editing/draft đo scrollHeight+2 tự cao đầy đủ nội dung khi mở/gõ, không cuộn nội bộ/cắt3dòng lúc sửa. Build/typecheck PASS; dist cập nhật; chưa browser QA bàn phím thật.

- 2026-10-25: Theo user, ghi chú Đã lưu/Ván đấu MOBILE mặc định line-clamp-3 (3dòng/ellipsis), bấm nội dung toggle mở đầy đủ/thu lại; button có aria-expanded và data-history-edit tránh holdXóa. Bút sửa/giá trị lưu và desktop giữ nguyên. Build/typecheck PASS; dist xác nhận toggle; chưa browser QA.

- 2026-10-25: Theo user, metadata Đã lưu/Ván đấu MOBILE tăng chữ clamp12–14px (trước10–12), icon16px, giữ1hàng; gap dọc user/vs7→3px. HistoryBoardIcon dùng chung thay icon⚒ Thế cờ laptop và thêm cho Ván đấu laptop, đồng bộ SVG bàn cờ mobile. Giữ các phần khác. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Đã lưu/Ván đấu MOBILE tên ván15→18px/font-black+stroke0.2px; metadata chuyển hàng fullwidth không wrap, icon tờ báo/Nước, chấm màu/bên tới lượt, bàn cờ/variant. Thùng rác luôn hiện góc phải trên7px/vùng24px/icon16px (thay ẩn chờ giữ riêng mục này). Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Đã lưu/Ván đấu MOBILE tên ván dùng font-heading/font-black/nền vàng highlight+NumberText như Thế cờ laptop; input cùng font-position-title-input. Tên user Arial thường/nền kem-xanh như laptop, giữ avatar/cỡ và cho đầy đủ xuống dòng. Bỏ phe/thắng-thua dưới từng user, thêm vs giữa hai người; metadata Nước N/chấm màu Đỏ hoặc Đen tới lượt/variant lấy snapshot cuối thật, không fake Nước1. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, riêng Đã lưu/Ván đấu MOBILE dùng socialPlayerRowClass như Đã chơi, cao theo nội dung/đệm và gap7px; mini Board rộng36%list thay30%, avatar96token/tên43token đầy đủ xuống dòng, phe/kết quả/variant/số nước dưới tên. Nút chỉ chữ Xem rộng48px ở phải giữa dọc. Thêm bút sửa TÊN VÁN (không đổi tên tài khoản) và ghi chú cuối dòng. Metadata savedTitle/savedNote theo bookmark riêng owner; store update→PATCH saved-matches/:id→PersistenceService validate100/5000→Repository owner-filter. Migration007 thêm saved_matches.title/note, giữ001–006; chưa apply DB/restart backend. Build/typecheck PASS; dist index-igZBPYB6.js có form mới; chưa browser/MySQL QA. Desktop UI giữ nguyên, mobile giữ500ms hiện Xóa; pen/input không kích hoạt hold.

- 2026-10-25: User mở Lịch sử cả laptop/mobile: Đã lưu/Ván đấu dùng SavedMatchesList mới theo bố cục Thế cờ laptop (mini Board thật thế cuối, hai người, kết quả, số nước/variant, Xem lại/Xóa), hai hàng trong vùng nhìn và cuộn. Thế cờ giữ chỉnh tên/ghi chú/Mở thế/Xóa; bỏ cột ngày/giờ ở cả2loại đã lưu, không xóa timestamp dữ liệu. Mở Ván đấu/Thế cờ trên mobile như desktop; chung store/API/replay/ownership, mobile giữ500ms hiện Xóa, desktop nút Xóa sẵn. Đã chơi laptop giữ UI/hành vi cũ; chỉ Đã lưu đổi UI được user yêu cầu. Build/typecheck PASS; dist index-CgUN8pBV.js có bố cục mới; chưa browser QA/kiểm tra thao tác trên thiết bị thật.

- 2026-10-25: User đính chính xác nhận reset CHỈ áp dụng nút reset vàng trong bảng ReplayControls đánh thử (ảnh). Hoàn tác xác nhận ở Cài lại màn xếp thế; ReplayControls mở alertdialog portal body giữa viewport tránh scale parent, Hủy giữ trạng thái/Đồng ý practice.reset. Keyboard reset giữ hiện hành. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-22: Theo user, Lịch sử mobile bỏ viền/nền nâu của tab con Ván đấu/Thế cờ, giữ chữ và vùng bấm. Nền phong cảnh header hạ top từ-8 lên8px thiết kế, kéo cao270px và mask mờ dần mép dưới. Ván đấu/Thế cờ đã lưu dùng chung usePressToRevealDelete: mặc định ẩn thùng rác, giữ500ms hiện icon; di chuyển hơn8px/cuộn/đổi tab/đóng dialog hủy, không mở profile/replay khi thả sau giữ. Bấm thùng rác mới gọi API xóa cũ, lỗi vẫn báo; desktop giữ hành vi cũ. Khóa lại phạm vi sau task.

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

- 2026-10-23: Theo user, mỗi dòng Lịch sử điện thoại (Đã chơi và Đã lưu/Ván đấu) xếp hai người trên–dưới, hai quân cờ ở giữa; ngày giờ bên trái, nút Xem lại cuối dòng bên phải. Grid compact 3 cột/3 hàng, chiều cao tối thiểu220 theo dialog scale để đủ nội dung. Giữ kích thước avatar, desktop, dữ liệu và hành vi xem lại/xóa. Khóa lại phạm vi sau task. Kiểm chứng: npm.cmd run build/typecheck PASS; dist index-BP2J5pC0.js/index-CL70y7zz.css xác nhận class bố cục mới. Chưa browser QA.

- 2026-10-23: Theo user, tăng nút đóng chung Xếp hạng/Bạn bè/Lịch sử mobile: vùng bấm72→84 và dấu×56→64 theo dialog scale. Giữ góc12px, vị trí/buttonInteraction, desktop56/42. Áp dụng qua DialogCloseButton dùng chung; khóa lại phạm vi.

- 2026-10-23: Theo user, nâng nút× chung Xếp hạng/Bạn bè/Lịch sử mobile lên3px hiển thị qua DialogCloseButton. Giữ kích thước84/64, neo ngang/góc và desktop. Khóa lại phạm vi.

- 2026-10-23: Theo user, phóng nội dung hàng Lịch sử điện thoại: avatar76→96, tên/nút Xem lại24→32, badge Thắng/Thua66×32→90×43, quân50→72, ngày giờ22→28, nút cao63→84 theo dialog scale. Người trên căn trái/người dưới căn phải trong cột giữa (rộng90%); hàng tối thiểu300 để đủ chỗ. Dùng chung Đã chơi/Đã lưu ván; desktop và Thế cờ giữ nguyên. User mở riêng avatar/bố cục mobile cho task này, khóa lại sau task. Build/typecheck PASS; dist hiện hành xác nhận class căn trái/phải và avatar96. Chưa browser QA.

- 2026-10-23: Theo user, nâng nút× mobile thêm5px, tổng offset lên8px; đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton. Giữ kích thước và desktop; khóa lại phạm vi.

- 2026-10-23: Theo user, dịch nút× mobile sang phải5px, giữ offset lên8px; đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton. Desktop giữ nguyên; khóa lại phạm vi.

- 2026-10-23: Theo user chỉnh tiếp Lịch sử điện thoại: người trên sát mép trái toàn dòng, phía trên ngày giờ; người dưới sát mép phải, đảo avatar/tên/kết quả và viền/padding để đối xứng. Hai cụm cùng rộng75%; ngày giờ/quân/nút Xem lại cùng hàng giữa. Phóng thêm avatar118, tên/nút38, badge108×52, quân90, ngày giờ34, nút cao100; hàng tối thiểu380 theo dialog scale. Áp dụng Đã chơi và Đã lưu/Ván đấu, desktop giữ nguyên; khóa lại phạm vi sau task. Build/typecheck PASS, dist đã xác nhận class bố cục đối xứng/avatar118; chưa browser QA.

- 2026-10-23: Theo user, dịch nút× mobile thêm lên10px/trái15px so vị trí trước; tổng offset trái10/lên18px. Đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton; khóa lại phạm vi.

- 2026-10-23: User đính chính hướng dịch nút× lượt trước: phải15px thay trái15px, giữ nâng thêm10px. Tổng offset hiện tại phải20/lên18px cho Xếp hạng/Bạn bè/Lịch sử mobile; desktop giữ nguyên. Khóa lại phạm vi.

- 2026-10-23: Theo user, Lịch sử mobile thu nhẹ avatar118→106, tăng tên38→44 và badge Thắng/Thua108×52→132×63 theo dialog scale. Giữ bố cục đối xứng và các thành phần khác/desktop. Áp dụng chung Đã chơi/Đã lưu ván; khóa lại phạm vi. Build/typecheck PASS; dist xác nhận đủ3 kích thước mới; chưa browser QA.

- 2026-10-23: Theo user, Lịch sử điện thoại thu avatar106→96; khung tên kéo chồng48 vào dưới avatar với padding60 đối xứng trái/phải, cao tối thiểu96 cùng avatar để liền khối thay vì chỉ chạm mép tròn. Giữ tên44/badge132×63 và bố cục, desktop nguyên trạng. Áp dụng Đã chơi/Đã lưu ván; khóa lại phạm vi. Build/typecheck PASS; dist xác nhận avatar96 và overlap hai hướng. Chưa browser QA.

- 2026-10-23: Theo user, tên người chơi Lịch sử điện thoại tăng nhẹ44→48 theo dialog scale và font-bold thay font-medium trên compact. Áp dụng cả2 người/Đã chơi/Đã lưu ván; desktop và bố cục giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist xác nhận tên48/font-bold; chưa browser QA.

- 2026-10-23: Theo user, tên Lịch sử mobile cùng kiểu Xếp hạng: font-heading/extrabold, stroke0.2px, chữ/số cùng font và cỡ, một hàng/line1.4; giữ cỡ48 hiện tại. Đã lưu/Ván đấu luôn hiện thùng rác ở hàng đầu bên phải, trên Xem lại (vùng bấm72/icon43 theo scale), bỏ giữ lâu mới hiện riêng danh sách ván; Thế cờ giữ hành vi cũ. Desktop giữ font/layout và nút xóa hiện có. Build/typecheck PASS; dist xác nhận style tên/vị trí nút; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, dòng ván Lịch sử mobile dùng chung socialPlayerRowClass của Xếp hạng (nền giấy gradient/viền/bo góc/bóng inset/overflow); radius lấy getSocialRowStyle cùng scale. Giữ chiều cao và bố cục3hàng/tên/avatar/nút vừa chốt, áp dụng Đã chơi và Đã lưu/Ván đấu; desktop/Thế cờ giữ nguyên. Build/typecheck PASS; dist xác nhận shared row style. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: User làm rõ là ô lớn bao mỗi ván Lịch sử, không phải thanh tên. Mobile giữ socialPlayerRowClass/radius chung Xếp hạng, bổ sung gap8×dialogScale và lớp bóng gradient trái132×rowScale như dòng Xếp hạng. Giữ bố cục bên trong/thanh tên, desktop nguyên trạng. Build/typecheck PASS; dist xác nhận lớp bóng chung; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, danh sách Đã chơi mobile kéo lên sát2tab chính: bỏ hàng tab con ẩn nhưng vẫn chiếm chỗ (compact:invisible/compact:flex), dùng hidden thật khi không ở Đã lưu. Đã lưu vẫn hiện2tab con và giữ khoảng chừa; desktop giữ hành vi cũ. Build/typecheck PASS; dist xác nhận bỏ hàng chừa ẩn; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, phóng2tab con Ván đấu/Thế cờ trong Đã lưu mobile khoảng25%: chữ34→43, min-height72→90, min-width210→270, padding ngang28→36/dọc10→12 theo dialog scale. Desktop/Đã chơi giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist xác nhận kích thước tab mới; chưa browser QA.

- 2026-10-23: User đính chính chữ trống cần tăng là Lịch sử, không phải Tin nhắn. Hoàn tác chữ trống Tin nhắn; historyEmptyTextClass chung Đã chơi/Đã lưu ván/Thế cờ thêm compact22px/semibold, desktop giữ28 theo scale. Build bị chặn bởi lỗi TS2559 tại FriendsDialog.tsx:236 (contentStyle custom property --ranking-tab-width ngoài phạm vi task); chưa cập nhật dist/chưa browser QA.

- 2026-10-23: Theo user,2tab chính Lịch sử mobile Đã chơi/Đã lưu tăng từ264×70×1.4 lên264×70×1.6 theo dialog scale, cùng công thức tab Xếp hạng. Desktop giữ nguyên. Build/typecheck PASS; dist xác nhận tab mới và bao gồm chữ trống Lịch sử22px từ lượt trước (lỗi build Bạn bè đã hết ở workspace hiện tại). Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, tạm ẩn2tab con Ván đấu/Thế cờ trong Lịch sử MOBILE. SHOW_MOBILE_SAVED_CATEGORIES=false giữ markup/state/tính năng Thế cờ để phục hồi; compact luôn chọn matches khi ẩn, Đã lưu mở trực tiếp danh sách ván và không chừa chiều cao tab con nên khung lên ngang Đã chơi. Không xóa dữ liệu, desktop giữ2tab con. Build/typecheck PASS; dist đã cập nhật; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, nhích2cụm avatar/tên Lịch sử mobile vào trong12 logical theo dialog scale (trên margin-left, dưới margin-right đối xứng) để khung avatar không khuất mép ô. Giữ kích thước/khung tên dính avatar và desktop. Build/typecheck PASS; dist xác nhận inset2hướng; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, dùng thanh cuộn Xếp hạng laptop cho danh sách Bạn bè/Xếp hạng/Lịch sử mobile: socialListScrollbarClass chung ở uiClasses, thumb trắng/bo tròn, track trong suốt, thin/6px, gutter stable, ẩn nút mũi tên. Friends áp dụng mọi tab/danh sách lời mời; History cả Đã chơi/Đã lưu và Thế cờ đang ẩn để phục hồi đồng bộ. Desktop giữ style cũ (Ranking tái dùng token cùng nội dung). Build/typecheck PASS; dist xác nhận thanh cuộn trắng; chưa QA trình duyệt điện thoại thật (thanh cuộn overlay do trình duyệt điều khiển). Khóa lại phạm vi.

- 2026-10-23: Theo user, đồng bộ nút× MOBILE qua DialogCloseButton chung cho Hồ sơ/Xếp hạng/Bạn bè/Lịch sử (và nơi tái dùng): dịch trái4px (translateX20→16), tăng nhẹ vùng bấm84→90 và dấu64→68 theo scale. Hồ sơ giữ scale Xếp hạng đã chốt; mọi chỉnh tiếp dùng component chung, không offset riêng. Desktop giữ56/42 và không transform. Build/typecheck PASS; dist xác nhận offset chung mới; chưa browser QA. Khóa lại phạm vi.

- 2026-10-24: User xác nhận thiết kế nút tab Đã lưu giống Đã chơi. HistoryTabButton MOBILE dùng chung dáng alpha nét cọ của playedTab, nền đỏ khi chọn/nâu khi chưa chọn và chữ HTML font-heading50/extrabold/italic vàng, đồng nhất cả2tab. Giữ kích thước/vị trí và desktop dùng ảnh gốc; dữ liệu/nội dung không đổi. Yêu cầu mới thay lần hoàn tác mask trước đây. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, hoàn tác riêng lượt đồng bộ thiết kế2nút Đã chơi/Đã lưu vừa thử: bỏ mask/chữ HTML, trả HistoryTabButton dùng ảnh tab gốc có chữ (compact:size-full). Giữ kích thước/tab/data/bố cục đã chốt trước lượt thử. Build/typecheck PASS; dist xác nhận ảnh tab gốc; chưa browser QA.

- 2026-10-24: Theo user, thay2tab Lịch sử MOBILE bằng4PNG mới ở assets: 0c6e579c active Đã chơi,527ca72d idle Đã chơi,c29af6e7 active Đã lưu,d30c4e9b idle Đã lưu. Giữ nguyên pixel nguồn2172×724; SVG viewBox0/90/2172/550 giảm lề trống dọc, không redraw chữ/nền. Desktop tiếp tục4ảnh cũ; giữ kích thước/vị trí tab. Đã xem đủ4ảnh, build/typecheck PASS; dist có đủ4asset mới; chưa browser QA.

- 2026-10-24: Sửa tab Lịch sử mobile phóng khi chọn do4PNG có lề alpha khác nhau. Đo bounds alpha>32 từ nguồn, dùng viewBox riêng từng ảnh để artwork active/idle cùng chiếm hộp nút cố định; không thay width/height khi chọn. Desktop giữ nguyên. Build/typecheck PASS; dist xác nhận bounds riêng; chưa browser QA.

- 2026-10-24: Theo user,2tab Lịch sử mobile thay bằng sprite b52ef10c-bb5a-4de9-800e-24e6a8d904eb.png chứa4trạng thái: trái idle/phải active, trên Đã chơi/dưới Đã lưu. SVG crop mỗi ô cùng1050×220 (x20/1100,y110/374) trên nguồn2173×724, giữ kích thước hộp cố định; không sửa pixel asset. Bỏ import4ảnh mobile trước, desktop giữảnh cũ. Build/typecheck PASS; dist có sprite mới; chưa browser QA.

- 2026-10-24: User chuyển từ Chat sang Lịch sử, mở riêng lớp hiển thị2tab MOBILE: nav Đã chơi/Đã lưu z25 thay10, cao hơn banner/họa tiết z20 để không bị che; nút× z30 vẫn trên. Không sửa vị trí/kích thước/assets/tab data, desktop giữ z10. Khóa lại phạm vi sau task. Build/typecheck PASS; dist xác nhận compact:z25; chưa browser QA.

- 2026-10-25: Theo user, vào lại phòng là phiên lưu mới: useMatchSaving ghi nhớ ID archive lúc mount và không nhận lại ván cũ đó; vẫn giữ bản ván kết thúc mới trong phiên hiện tại. RoomService.join khi người mới vào ghế bàn finished đưa game về ready/thế đầu, reset ready/offer/undo/history/repetition và cửa sổ rotation; giữ archive/thưởng/lịch sử đã chốt. Sẵn sàng hiện khi người ngồi vừa vào kể cả chỉ1người, khóa bấm tới entrance hoàn tất. Chat mobile disabled trong entrance nhưng opacity100 để không tối. Tests liên quan39/39 PASS; build/typecheck PASS, dist xác nhận cập nhật; chưa browser QA.

- 2026-10-25: User chốt lại Sẵn sàng online chỉ hiện khi đủ2người ngồi trên bàn; một mình không hiện, khán giả không tính. GamePage khôi phục gate players.length===2, vẫn khóa bấm trong entrance; local/máy giữ nguyên. Quy tắc này thay lượt cho hiện khi1người trước đó. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user mở riêng Lịch sử/Đã chơi MOBILE: Xem lại chuyển từ cột phải sang cột giữa hàng2 nằm giữa2user; icon Đỏ/Đen chuyển sang cột phải hàng2 để không chồng. Ngày giờ/cỡ/2user/desktop/Đã lưu/chức năng replay giữ nguyên. Khóa lại phạm vi sau task. Build/typecheck PASS; dist xác nhận vị trí mới; chưa browser QA.

- 2026-10-25: User đính chính yêu cầu khung giữa2user nằm TRONG màn Xem lại, không phải danh sách Đã chơi. Hoàn tác đúng lượt vừa sửa HistoryDialog: Xem lại về cột phải hàng2, icon2phe về cột giữa; không chạm thay đổi khác. Chờ xác định khung điều khiển cần chuyển trong màn replay.

- 2026-10-25: User xác nhận khung cần chuyển là Phát/Lùi/Tiến TRONG màn Xem lại MOBILE. GamePage render ReplayControls riêng giữa2user ở top8px/width220/scale.72 như positionTrial; chỉ1instance, desktop giữ trong user phải. Ẩn MobileMatchSummary nhánh replay tránh chữ Bàn cờ đè controls. Đã hoàn tác lượt sửa nhầm danh sách Đã chơi (Xem lại cột phải/icon2phe giữa). Giữ callback/luật/replay state. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, màn Xem lại ván hiển thị đồng hồ tĩnh của2user dưới Elo qua PlayerCard.recordedClock, đọc remainingTime đúng snapshot playback đang chọn. Tiến/lùi/phát đổi theo snapshot thật, không tick theo thời gian xem; không hiện trong đánh thử hoặc replay1thế, không sửa clock gameplay/DB. Bản lưu cũ chỉ hiển thị dữ liệu đã có, không suy đoán thời gian thiếu. Tests7/7 PASS gồm số dư clock snapshot thật và cập nhật khi tua; build/typecheck PASS, dist xác nhận clock; chưa browser QA.

- 2026-10-25: Theo user, clock Xem lại MOBILE chuyển về cụm giữa cùng vị trí/Elo anchor như trận thật, tái dùng MobileMatchSummary clockOnly (ẩn biển/Bàn cờ) kèm đồng hồ cát. Bỏ clock dưới từnguser mobile; desktop giữ recordedClock. Thu margin nút chuyển đánh thử dưới controls50→4px riêng compact/replay để nhường hàng clock, giữ controls giữa2user. Thời gian vẫn snapshot thật, không tick. Build/typecheck PASS; dist xác nhận clockOnly; chưa browser QA.

- 2026-10-25: Theo user, nút chuyển đánh thử/máy trong Xem lại MOBILE luôn hiển thị dưới Board/căn giữa (mép Board+10px), dùng ReplayModeButton artwork cũ. Bỏ nút lặp trong controls/user phải mobile. Bấm nút hoặc Space mobile chỉ mở dialog Chức năng đang được cải tiến, không đổi trial; desktop giữ toggle thật và vị trí cũ. Build/typecheck PASS; dist xác nhận nút/thông báo; chưa browser QA.

- 2026-10-25: Theo user, nút chuyển máy Xem lại MOBILE căn giữa dọc khoảng đáyBoard→mép dưới viewport, ngang giữa; useBoardLayout đo rect ghi --mobile-replay-mode-center, wrapper translateY-50%. Thông báo Chức năng đang được cải tiến giữ khung modal như Giải đấu và đổi nút Đã hiểu sang homeUtilityButton đúng Home; thông báo khác giữ cũ. Build/typecheck PASS; dist xác nhận vị trí mới; chưa browser QA.

- 2026-10-25: User báo nút chuyển máy replay mobile bay lên trên. Bỏ tọa độ midpoint đo JS, wrapper absolute insetx0/top164px+board-height/bottom0 flex items-center justify-center để tâm nút nằm giữa vùng dưới Board và đáy arena theo CSS. Chỉ nút nhận pointer, không che bàn; giữ thông báo. Build/typecheck PASS; dist xác nhận vùng căn giữa mới; chưa browser QA.

- 2026-10-28: Đính chính bôi chọn: nội dung dòng Lịch sử > Đã lưu đặt select-none để chạm/nhấn giữ không highlight xanh; ô nhập tên/ghi chú vẫn select-text. Tooltip thời gian giữ laptop +20px và điện thoại +40px so với điểm bấm.
- 2026-10-28: Đính chính sau kiểm tra user: Lịch sử > Đã lưu laptop đặt bàn cờ absolute tại góc trên trái với kích thước cố định theo rowBoardWidth; giữ min-height thẻ theo kích thước bàn ban đầu. Ghi chú mở rộng làm thẻ cao hơn nhưng không dịch bàn cờ. Điện thoại giữ nguyên.
- 2026-10-28: Đính chính màu khung tên Lịch sử > Đã lưu: khung vàng theo chủ sở hữu ván (bản thân), khung xanh cho đối thủ; hoàn toàn không phụ thuộc kết quả thắng/thua. Laptop/điện thoại cùng cách thể hiện; History Đã chơi giữ nguyên.
- 2026-10-28: Đính chính theo ảnh: nút chuyển Xem lại/Đánh thử laptop đặt giữa ReplayControls (left50%, translateX−50%), dưới cột điều khiển tại top220px; cột giữ cao220px để neo ổn định khi đổi trạng thái. Compact tự cao và giữ luồng cũ.
- 2026-10-28: Khi mở bàn cờ từ Xem lại trong lịch sử, ván/thế ở tab Đã lưu, phát cue `board-entry.mp4`; thao tác Lưu ván cờ không mở bàn nên không phát cue này.
- 2026-10-28: Tiếng mở Xem lại/Đã lưu chuyển sang board-entry.wav từ cùng clip nguồn, bỏ268ms im lặng đầu; gesture chung retry tải/giải mã sau lỗi, không chỉ preload một lần tại App.

- 2026-10-28: Hoàn/lùi nước bằng mũi tên chỉ phát tiếng đi quân, không tiếng ăn quân/chiếu bí; nhận diện bằng moveCount giảm ở mọi phase và dừng cue cũ trước khi phát.

- 2026-10-28: Theo user, khôi phục customization-tab.mp4 có chọn lọc cho: mở/sửa Thông tin và Danh hiệu, chọn avatar/viền/skin/hiệu ứng, bút chỉnh trong Đã lưu, tab/tìm/thao tác Bạn bè, danh sách/emoji/đổi tên/ảnh nhóm/nút tích Tin nhắn, tab và nút Mua Cửa hàng, mọi role=switch và nút âm thanh, chọn thời gian bàn/nhanh, cấp và phe Chơi với máy. Marker data-ui-tab-sound, tôn trọng muted và phát sau preload; các vùng khác tiếp tục âm thanh X. Không đổi UI/nghiệp vụ. npm.cmd run build PASS; dist index-BWqCwhvL.js có cả hai asset; chưa browser/audio QA.

- 2026-10-29: Hai tab Đã chơi/Đã lưu và thùng rác dùng tiếng X. Hai nút bút tên ván/ghi chú dùng tiếng tab, áp dụng component ván đã lưu chung laptop/mobile và thế cờ.
- Kiểm chứng mapping âm thanh và thông báo 2026-10-29: npm.cmd run build PASS (TypeScript/Vite, exit0); dist/assets/index-CQzan5Qb.js chứa hai marker âm thanh và kích thước thông báo mới. Chưa browser/audio QA.

- 2026-10-29: Theo user cả2bản: người đang xem ván online nghe victory-fanfare khi ván kết thúc có người thắng, cùng gate hoàn tất hình/âm chiếu bí của người chơi; không mở popup thưởng cho viewer, không phát khi mới vào ván đã kết thúc/replay/hòa. useMatchResult theo dõi spectator sống và trả spectatorVictoryReady. Đóng bảng kết quả/nhận thưởng Home chỉ đóng UI; cue đã bắt đầu tiếp tục tới onended, còn cue chưa tải xong bị hủy để không phát trễ. useCelebrationSound finishOnClose giữ gain/mute subscription tới cuối; rời màn/đổi phiên ghế/bắt đầu ván mới/đổi account vẫn dọn cue, không mang sang phiên khác. 26/26 celebration/match-result/leave-session kiểm tra PASS; chưa browser/audio/hai thiết bị QA.

- 2026-10-29: User chốt cô lập View/hàng chờ với bàn đang đấu. GamePage Ready sau kết quả dùng khóa ván ổn định (id/phe thắng/lý do/số nước/phiên ghế), không reset2s theo object result mới ở mỗi socket snapshot. Viewer join/leave/queue không reset game/ready/hiệu ứng của cặp ghế.
- Đổi ghế tự động sau kết quả chờ cả2người đã đấu gửi result-presentation-complete đúng archive ID, sau callback hết5s biểu cảm và gate hình/audio chiếu bí; server mới đặt deadline now+2000. Viewer không ACK; ACK cũ bị chặn, ACK trùng không kéo dài. Không cho người mới vào hàng sau kết thúc bypass thời gian. Snapshot Ready mới chỉ sau deadline; không dùng timeout đoán độ dài audio. Client cũ không ACK phải cập nhật cùng backend.
- Người xuống bàn luôn View thường queued=false, muốn chờ phải tự bấm. Người vừa lên bàn không bị tự thay vì người dưới xếp hàng/không Ready. Cả bàn thường và bàn khóa chỉ đếm để bắt đầu: không Ready cả2 thì10s chờ+20s đếm; có1Ready thì đếm30s từ lầnReady đầu rồi bắt đầu đúng cặp, không phạt xuống View. Hết hàng chờ hủy đếm như cũ. Thay ghế hết năng lượng/chủ phòng bàn khóa miễn xuống vì thua/luật rời ghế vẫn giữ ngoại lệ đã chốt. Luật này thay readiness kick/khóa không-countdown và loser tự queued trước đó.

- 2026-11-02: Theo user, nút điều khiển Xem lại/Đánh thử dùng tiếng X qua data-ui-selection-sound ở ArtworkButton và ToolArtworkButton: lùi/tiến, Máy đi, Phân tích, Gợi ý, reset, Phát/Tạm dừng; thêm Thử lại cùng cụm. Nút chuyển Xem lại/Đánh thử vốn có marker giữ nguyên. Dùng listener chung/tôn trọng muted, không đổi UI/callback hoặc tiếng đi quân. Backup outputs/backups/replay-x-sound-20261102.

- 2026-11-02: Theo ảnh user, Đã chơi Lịch sử chỉ hiện ván finished có winner (thắng/thua), bỏ Đang đấu và ván hòa khỏi danh sách này; dùng filter chung HistoryDialog laptop/mobile. Không xóa dữ liệu/đổi API/ghi ván hoặc Đã lưu; kết thúc có winner tự xuất hiện theo store. Thay quy tắc hiển thị playing trong Đã chơi2026-10-27, giữ Đã lưu cũ. Backup outputs/backups/history-finished-only-20261102. Hai regression mới laptop/mobile PASS (ẩn playing/draw, hiện completed, reactive khi finished); build TypeScript/Vite PASS, dist cập nhật. Full saved-match-history16ca:6PASS/10FAIL (các ca cũ query/hold/dialog), không tuyên bố toàn suite PASS; chưa browser QA.
