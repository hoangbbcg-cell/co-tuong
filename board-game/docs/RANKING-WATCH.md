# Vào xem từ Xếp hạng

- 2026-10-25: User đính chính So tài trong Thông tin: thành công giữ toast Đã gửi; offline/lỗi trả lại bảng profileActionFeedback như cũ qua setProfileActionFeedback (không còn no-op lỗi). Giữ optional onSent và requestVersion. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, So tài trong ProfileDialog dùng chung useInviteSentNotice với Mời Xếp hạng/Bạn bè: ACK thành công hiện1Đã gửi giữa viewport/bay-fade1300ms, gửi lặp thay singleton, không modal. useProfileChallenge thêm optional onSent giữ requestVersion tránh phản hồi cũ; lỗi So tài không feedback như Mời. Chức năng khác hồ sơ giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, Mời chơi Bạn bè MOBILE dùng đúng toast Đã gửi giữa màn hình/bay48px-fade1300ms/singleton như Xếp hạng. Tách useInviteSentNotice/component dùng chung; hook onSent sauACK thành công, bỏ modal feedback riêng challenge, các feedback kết bạn khác giữ nguyên. Desktop Bạn bè đang khóa giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, Mời lặp chỉ1toast Đã gửi giữa màn hình: singleton key thay mới giữ không xếp chồng; bỏ CSS translate trùng WAAPI khiến lệch tâm. challengeController không emit thông báo Lời mời đã được thay thế khi cùng người gửi mời lại cùng target; lời mời cũ vẫn bị thay. Người gửi khác giữ feedback cũ. Build/typecheck PASS; dist cập nhật; backend cần nạp code mới/chưa restart, chưa socket/browser QA.

- 2026-10-25: User đổi phản hồi Mời Xếp hạng: chỉ khi sendChallenge ACK thành công mới onSent hiện Đã gửi giữa viewport (fixed50%,font18); giữ0.35 thời lượng rồi bay lên48px/fade, tổng1300ms, cleanup animation/onfinish xóa; reduced-motion chỉfade. Lỗi vẫn không toast theo lượt trước, người nhận vẫn popup. useFriendChallenge thêm optional onSent không đổi màn khác. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, bấm Mời ở Xếp hạng chỉ gửi, không hiển thị phản hồi gửi thành công/lỗi tại người gửi: callback useFriendChallenge no-op riêng RankingDialog. Giữ gửi socket/thực thi server/pending chống lặp và popup lời mời phía người nhận; các màn khác giữ thông báo cũ. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, nút Mời Xếp hạng gửi So tài thật đúng người. Sửa challengeController map target.id tài khoản số sang socket đang kết nối qua RoomPersistence.identities, giữ socketID truyền thống; thiếu kết nối báo offline. ChallengeService xác thực avatar/frame theo AVATAR_COUNT/FRAME_COUNT catalog thay giới hạn14/3 gây lỗi người dùng viền mới; bỏ câu Thông tin người chơi không hợp lệ thay phản hồi thử lại, không bỏ validation. Build/typecheck PASS; dist cập nhật; chưa test socket/browser và chưa restart backend, cần nạp backend mới để fix có hiệu lực.

- 2026-10-25: Theo user, riêng nút Mời Xếp hạng thu rộng173→120/cao62đơnvị theo scale, justify-self:end/maxwidth100% chừa cách khung Elo nâu. Giữ chữ30/callback và nút Vào xem cũ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, nút Xếp hạng online chỉ chữ Mời, bỏ mũi tên riêng invite/tăng chữ24→30theo scale; Vào xem giữ. Header Người chơi bỏ padding lệch, căn giữa cột giống Hạng; mobile tăng cao38→46/chữ21→24theo headerScale, cùng columnStyle hàng. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Xếp hạng online rảnh hiện Mời chơi (không hiện tự mời ownID); đang đấu giữ Vào xem, offline không nút. Dùng RankingViewButton chung artwork/cỡ với label invite và disabled pending; useFriendChallenge nhận optional targetId gửi sendChallenge chuẩn, phản hồi notice hiện có, không gọiAPI trong component. Áp dụng laptop/mobile và2tab; server vẫn chặn bận/offline/ràng buộc lời mời. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, Xếp hạng tối đa50người cả2variant/laptop/mobile. RANKING_PLAYER_LIMIT=50 dùng chung Repository SQL LIMIT và hook slice trước render (có hiệu lực ngay cả backend cũ trả100); giữ Elo DESC/id tie-break/filter/thứ hạng. Build/typecheck PASS; dist cập nhật; chưa browser/SQL QA, chưa restart backend.

- 2026-10-25: Theo user, cụm avatar/tên/trạng thái Xếp hạng MOBILE dịch trái5px bằng wrapper translate, cả2tab. Không đổi kích thước/cột Elo/rank hay desktop. Build/typecheck PASS; dist xác nhận class; chưa browser QA.

- 2026-10-25: Theo user, thu nhẹ cả cụm Elo Xếp hạng MOBILE eloScale1.5→1.42 (~5.3%): số/khung/icon/cột đồng tỷ lệ, cả2tab; desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, tăng cả cụm Elo Xếp hạng MOBILE: eloScale1.35→1.5 (~11% thêm) đồng bộ số điểm/khung ảnh/icon và cột chứa; icon giữ32đơnvị theo scale mới. Hai tab cùng áp dụng, desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, chỉ icon Elo Xếp hạng MOBILE tăng25→32đơn vị theo eloScale (~28%), áp dụng cả tab Cờ Tướng/Cờ Úp. Giữ số điểm/khung/bố cục và desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-15: Người dùng mở riêng nút Vào xem và luồng vào phòng; giữ bố cục, avatar và phần còn lại của Xếp hạng.
- RankingViewButton dùng ảnh friend-action-button-frame.png hiện có (210×62, alpha0 ở góc, nội dung sát mép). Wrapper ôm ảnh h-fit/w-fit, padding/margin/border0, line-height0, shadow-none; bỏ bóng CSS hình chữ nhật gây cảm giác crop dư. Giữ kiểu chữ/icon và chiều rộng173×scale, ảnh giữ tỷ lệ.
- Tên/ELO/thứ hạng vẫn là fixture hiện có, chưa có API bảng xếp hạng. useRankingWatch đối chiếu tên người trong top với RoomSummary.playerNames và phase playing; chỉ phòng đang đấu mới hiện nút. Có phòng đang đấu cũng chứng minh người đó đang online; offline/online rảnh không có nút.
- Danh sách phòng dùng Query key rooms, chỉ bật/refetch5s khi dialog mở; observer theo thuộc tính open, đóng thì dừng poll. Trước khi vào xem lấy lại danh sách để tránh ván vừa hết/người đã rời.
- Bấm vào phòng thật bằng Socket room:join asViewer=true. Server kiểm tra phase đang chơi, luôn đưa vào viewers chứ không chiếm ghế. Không trừ/chặn năng lượng của khán giả. Bàn khóa vẫn dùng bảng nhập mật khẩu dùng chung và server kiểm tra mật khẩu.
- Frontend component không gọi API trực tiếp: hook quản lý Query/mutation/trạng thái mật khẩu/lỗi, thành công đóng bảng top và enterOnline. Home và Chọn Bàn dùng cùng RankingDialog; bỏ callback thông báo đang phát triển cũ.
- Cờ Úp chưa hỗ trợ phòng online trong project nên không bật Vào xem phòng Cờ Tướng ở tab Cờ Úp.
- Nhận diện top↔phòng theo tên là giới hạn hiện tại vì chưa auth/ID người dùng backend cho bảng xếp hạng; không tuyên bố dữ liệu ELO/thứ hạng đã trực tuyến.

Kiểm chứng: test DOM điều kiện nút, hook vào phòng thật/kiểm tra lại phòng đã hết/bàn khóa, server vai trò người xem và HTTP-Socket phòng. Chưa QA browser trực tiếp.
- 2026-10-15: Ngoại lệ xem thử tạm: top1 có nút mẫu khi không có phòng đang đấu, click không gọi socket mà hiện thông báo mẫu. Có phòng thật dùng watch như cũ. Thanh cuộn mảnh nâu vàng#92612d, track/corner trong suốt; gỡ nút mẫu khi kết thúc xem UI.

- 2026-10-15: Thumb thanh cuộn đổi trắng#fff theo yêu cầu, track/corner giữ trong suốt.
- 2026-10-16: Người dùng mở khóa riêng avatar/khung avatar trong danh sách Xếp hạng cho task này. Ranking API trả avatarCode/avatarFrameCode từ users; hàng dùng AvatarPortrait/AvatarFrameOverlay/getAvatarFrame chung với hồ sơ. Danh hiệu/sao tiếp tục derive Elo thật riêng variant. Giữ slot84px và bố cục, khóa lại avatar/khung Xếp hạng sau task.
