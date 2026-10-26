# Quy tắc giao diện Bạn bè

- 2026-10-26: Theo user, SearchButton dùng asset580e9677-60e1-44a8-9fd5-45ef04444b44.png thay khung CSS vàng ở Bạn bè/Chọn Bàn cả mobile/laptop. Căn background theo vùng artwork(124,159)-(1650,725) trong ảnh1774×887 để khung phủ đúng nút, không sửa ảnh nguồn; chữ/icon nâu#2b1909 để rõ trên nền vàng. Giữ sizing từng nơi/submit/disabled/logic tìm. Typecheck/build PASS, dist có asset và import; chưa browser QA.

- 2026-10-26: Theo user, lấy ô tìm Bạn bè làm chuẩn tỷ lệ sizing/bo góc. searchFieldMetrics chung: compact H60×1.17,placeholder21/input24/radius10; desktopH56/placeholder23/radius10; font nhập min16/placeholder mobilemin14 như Friends. Áp dụng theo chiều cao ô sẵn có tại Chọn Bàn, tìm hội thoại Tin nhắn, tìm bạn Tạo nhóm; giữ vị trí/kích thước ô/chức năng/font/màu, không đổi Bạn bè desktop đang khóa. messagesFriendsField bo10px→44×10/70.2px cho mọi nơi dùng khung nâu này (kể cả nhập chat/biệt danh), cỡ chữ mặc định nonsearch16/14 giữ nguyên; search truyền CSSvars. Ô địa chỉ/quốc gia dùng khung khác không đổi. Build/typecheck PASS; dist có helper CSSvars; chưa browser/keyboard QA.

- 2026-10-26: Theo user giảm độ tối nút Mời chơi/So tài khi chờ5giây: brightness50→75% tại Bạn bè/Hồ sơ/Xếp hạng cả mobile/laptop; opacity100% để chỉ làm tối nhẹ. Giữ cooldown và hành vi. Typecheck/build PASS, dist xác nhận style75%; chưa browser QA.

- 2026-10-26: Theo user, chữ “Không hiển thị lại” trong lời mời nằm sát bên trái ô tích, gap8px; cả cụm căn phải dưới×/✓ thay dàn đều hai mép. Giữ chữ20px/ô28px và hành vi. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, sau khi bấm Mời chơi/So tài phải chờ tối thiểu5giây mới mời tiếp. challengeCooldownStore dùng chung các entry Bạn bè/Hồ sơ/Xếp hạng cả mobile/laptop; khóa ngay khi gửi, giữ qua đóng/mở/chuyển bảng, hết5giây tự mở khi request đã kết thúc. Nút mời bị disabled và tối brightness50% trong lúc chờ. Server chặn gửi thành công liên tiếp dưới5giây theo accountID (fallback socket), giữ qua reconnect cùng account và dọn mốc hết hạn. Không thay thời hạn lời mời hay quy tắc chặn người gửi. Test cooldown/service/socket11/11 PASS (lượt sandbox lỗi temp/localhost; chạy ngoài sandbox PASS); typecheck/build PASS, dist có cooldown và style. Chưa browser QA, không restart/deploy backend.

- 2026-10-25: Theo user, Mời chơi Bạn bè MOBILE dùng đúng toast Đã gửi giữa màn hình/bay48px-fade1300ms/singleton như Xếp hạng. Tách useInviteSentNotice/component dùng chung; hook onSent sauACK thành công, bỏ modal feedback riêng challenge, các feedback kết bạn khác giữ nguyên. Desktop Bạn bè đang khóa giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, thông báo So tài/không online/xóa bạn MOBILE phóng khung tới min360px/viewport-48, chữ18px line-relaxed/padding20px/nút46px thay token bị co theo dialog. Áp dụng phản hồi Friends/Profile, MessagesFriendRemovalConfirmation dùng chung xóa bạn/xóa khỏi nhóm và ChallengeNotifications; checkbox14/icon18. Desktop Bạn bè khóa giữ nguyên, không đổi hành vi challenge/xóa. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, ô nhập và nút Tìm Bạn bè MOBILE cao thêm17% đồng bộ cả Danh sách/Thêm bạn; tăng slot form tương ứng tránh chồng dòng, công thức chiều cao dòng chung trừ thêm phần tăng. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, nút Tìm Bạn bè MOBILE tăng chữ23→27 và icon31→36 theo token compact; giữ khung/cỡ nút và desktop/Chọn Bàn. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, thay riêng nền nút Tìm bằng khung trống4cdefa67 tại Chọn Bàn/Bạn bè mobile+desktop; shared SearchButton giữ chữ/icon HTML và submit/disabled. Chữ vàng sáng để đọc trên nền nâu; nguồn references/uploads, runtime buttons/search-frame.png crop(467,158,1240,392). Build/typecheck PASS; dist cập nhật; chưa browser QA. Mở riêng artwork nút Tìm desktop theo user.

- 2026-10-24: User yêu cầu hoàn tác lần dùng ảnh nút Tìm cdd2fd06. Khôi phục nút HTML vàng trước đó trong Chọn Bàn/Bạn bè mobile+desktop, gỡ SearchButton và ảnh runtime crop. Giữ ảnh nguồn trong references/uploads; chức năng tìm kiếm giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, dùng ảnh cdd2fd06 cho nút Tìm Chọn Bàn và Bạn bè cả mobile/desktop. Shared SearchButton, giữ submit/disabled và kích thước theo ngữ cảnh; nguồn references/uploads/cdd2fd06..., runtime buttons/search-button.png trim alpha>16. Build/typecheck PASS; dist cập nhật; chưa browser QA. User mở riêng artwork nút Tìm laptop task này.

- 2026-10-24: Theo user, mọi dòng Bạn bè MOBILE dùng chiều cao chuẩn Thêm bạn: panel làm size container, FriendRow flex-basis tính từ cùng100cqh trừ hàng tiêu đề54/search48/hai gap14 rồi chia6/trừ row-gap. Không phụ thuộc chiều cao list4nhận/2gửi nữa. Nút Hủy tăng chữ27→30/icon37→42logical riêng sent. Laptop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, nút Hủy trong Đã gửi lời mời MOBILE dùng cùng kích thước/chữ27/icon37logical và giới hạn cao như Từ chối; dùng cùng vùng invitationActions và wrapper, một nút căn phải. Giữ API hủy/laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, nền nâu Lời mời nhận MOBILE bỏ override cao để dùng cùng công thức các dòng khác (100%-ui4-15px); cụm nút giới hạn cao bên trong nền với đệm8px. Nút Kết bạn/Đã gửi rộng250→280, chữ30→33logical; giữ cao118. Laptop/dòng khác giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, tăng tiếp nút Kết bạn/Đã gửi MOBILE220×106→250×118logical, chữ28→30 theo dialog scale. Giữ dòng/khung/laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, nút Kết bạn tại Thêm bạn MOBILE tăng173×90→220×106logical, chữ28logical theo dialog scale; trạng thái Đã gửi cùng kích thước tránh nhảy. Giữ dòng/khung/laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Sửa Gợi ý bạn trống do socialStore.search query rỗng luôn xóa users. Thêm GET /social/suggestions qua session auth→PersistenceService→SocialRepository: random tối đa20 active users, loại bản thân/accepted friends/block hai chiều. Query rỗng lấy gợi ý, query có chữ giữ search tên/ID; version bỏ phản hồi cũ. Mobile và desktop dùng chung dữ liệu, không đổi geometry laptop. Build/typecheck PASS; persistence-rules2/2 PASS; dist cập nhật. Chưa xác minh SQL trên DB/browser thật; backend cần nạp code mới, không restart/deploy trong task.

- 2026-10-24: Theo user, chỉ hai nút nhận lời mời Bạn bè MOBILE thu icon khoảng20% (Add52.5→42, Remove46.5→37logical), tăng chữ25→27logical. Override token ngay cụm nút để không ảnh hưởng nút khác; giữ khung/offset trái3px. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, dịch cả cụm hai nút Chấp nhận/Từ chối trong lời mời nhận Bạn bè MOBILE sang trái3px hiển thị qua translateX(-3px); giữ nền nâu/kích thước và laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, hai nút nhận lời mời Bạn bè MOBILE rộng hơn bằng giảm padding trái vùng nút40→22logical (mỗi nút thêm9logical); giảm cao tối đa126→108logical/hàng trừ20px, chữ30→25logical. Giữ nền nâu và giới hạn trong khung. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Sửa riêng lời mời nhận Bạn bè MOBILE theo user: bỏ kéo nền nâu âm sang vùng trạng thái, mép trái nền inset7px; hai nút chia đều chiều rộng khả dụng và giới hạn chiều cao trong nền (hàng trừ14px, tối đa126logical), chữ29→30. Vùng nút padding trái40logical+7px tránh hoa văn, giữ khoảng đệm mọi cạnh. Build/typecheck PASS; dist cập nhật; chưa browser QA; laptop/dòng khác giữ nguyên.

- 2026-10-24: Theo user, chỉ dòng Lời mời đã nhận Bạn bè MOBILE nới vùng thao tác440→500logical sang trái, nền nâu nới trái thêm12logical và cao thêm15px. Hai nút Chấp nhận/Từ chối190×106→220×118, chữ26→29 theo scale. Dùng prop invitationActions riêng, các dòng khác/laptop không đổi. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, hai nút Chấp nhận/Từ chối trong Lời mời đã nhận Bạn bè MOBILE tăng rộng145→190, cao90→106, chữ21.6→26 logical theo dialog scale; padding/gap cùng scale, không shrink nút. Giữ dòng/avatar/desktop và hành vi. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, hạ cụm sao toàn project2px theo khung tham chiếu: clusterOffsetYPx -14→-12; vị trí hiện tại cao hơn6px so trước chuỗi chỉnh. Token chung áp dụng mobile/laptop/người chơi/máy. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, nâng cụm sao toàn project thêm4px theo khung tham chiếu: clusterOffsetYPx -10→-14, tổng nâng8px so trước các lượt chỉnh. Token chung áp dụng mobile/laptop/người chơi/máy. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, nâng sao toàn project thêm2px theo khung tham chiếu: clusterOffsetYPx -8→-10, tổng nâng4px so trước hai lượt chỉnh. Đồng bộ mobile/laptop/người chơi/máy qua token chung. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, nâng cụm sao toàn project/mobile/laptop qua RANK_STAR_LAYOUT.clusterOffsetYPx -6→-8 (lên2px ở tỷ lệ tham chiếu, co cùng khung). RankTitleBadge và RankingRankBadge cùng dùng getRankTitleStarsStyle; gồm sao máy artwork riêng. Giữ kích thước sao/avatar/danh hiệu/luật Elo. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Sửa badge Lời mời MOBILE bị cắt bởi hàng tab overflow: nâng badge thêm3px, chừa padding-top bằng spacing+8px và bù margin-top để giữ mốc tab. Badge có khoảng3px phía trên cho hiển thị trọn; giữ cuộn ngang/Home/laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, nâng cả badge Home MOBILE và badge tab Lời mời thêm2px hiển thị so vị trí trước; giữ cỡ/số/neo ngang. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, badge Bạn bè ngoài Home MOBILE nâng từ top-1.5cqw lên-2.2cqw. Badge tab Lời mời tăng35→38, số19→20 theo token compact; giữ vị trí trái và dữ liệu. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, Home MOBILE thêm badge đỏ góc trên phải nút Bạn bè, đếm tổng lời mời pending đã nhận (requestedBy khác account.id) từ socialStore thật; không tính bạn accepted/lời mời đã gửi. Không có lời mời thì ẩn, trên99 hiện99+; aria-label đọc tổng đầy đủ. Store cập nhật từ refresh Bạn bè hiện có. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, ba tab lớn Bạn bè MOBILE giảm gap8→5px hiển thị; badge đỏ Lời mời tăng28→35 và số15→19 theo token nội dung compact, giữ góc trái. Laptop giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, ba tab lớn Bạn bè MOBILE cách nhau đúng8px hiển thị (gap-[8px], không theo dialog scale); badge tròn đỏ Lời mời chuyển sang góc trái tab. Giữ kích thước tab/cuộn ngang và laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, thu độ loang glow tab con Bạn bè MOBILE: hai drop-shadow blur2/7px giảm1/4px, giữ brightness1.1/saturate1.3 và không viền chọn. Tab lớn/laptop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, tab con Bạn bè MOBILE khi chọn chỉ dùng selectedImageTabGlow của tab lớn; bỏ pseudo-element nền/viền nới và viền inset vàng riêng. Nền cùng màu tab thường, border transparent khi chọn. Laptop giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, tab con lọc Bạn bè MOBILE dùng chính selectedImageTabGlow chung với ba tab lớn khi được chọn; giữ ô nền đã nới và kích thước chữ/icon. Laptop giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: User làm rõ tab con Bạn bè MOBILE cần TO ô nền chọn, không tăng sáng. Nền selected tách pseudo-element nới ngang4/dọc6 đơn vị spacing theo dialog scale; chữ/icon và slot giữ nguyên. Bỏ glow/active brightness125 của lượt hiểu sai. Laptop giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, ba tab lớn Bạn bè MOBILE dùng cùng cỡ tab Xếp hạng: rộng264×1.6 và cao70×1.6 theo dialog scale; không co tab, hàng lướt ngang khi thiếu chỗ. Laptop giữ riêng. Build/typecheck PASS; dist cập nhật; chưa QA thao tác vuốt trên thiết bị. Khóa lại phạm vi sau task.

- 2026-10-23: Bạn bè mobile: nút Tìm dùng font-body Arial đậm không nghiêng như ba nút lọc Tất cả/Đang online/Bạn Facebook. Giữ cỡ, màu, khung, icon, bố cục và toàn bộ laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA.
- 2026-10-23: User đính chính hiệu ứng tab con cần tăng trên MOBILE. Hoàn tác đúng glow/active brightness vừa thêm trên DesktopFriendsDialog; áp dụng selected glow viền2px/blur12spread3 và active brightness125 sang FriendsDialog mobile. Giữ toàn bộ cỡ tab/các chỉnh laptop trước đó. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Bạn bè laptop theo user tăng vùng hiệu ứng tab con: selectedFilter thêm viền sáng2px và glow12px/spread3px, lúc nhấn brightness125; giữ kích thước/bố cục tab, không tác động mobile hoặc nút khác. Build/typecheck PASS; dist index-1HCP8CoD.js/index-DY7iBcQh.css xác nhận; chưa browser QA.

- 2026-10-23: Theo tiếp nối task font laptop, tăng tab con Bạn bè LAPTOP: filter cao54→66/chữ22→25, icon tăng14%; tiêu đề mục con cao50→60/chữ27→30, hàng Gợi ý66 và top căn giữa3px theo scale. Giữ font-body bold, avatar/dòng/nút khác và mobile. Build/typecheck PASS; dist index-C7-AItwJ.js/index-Bl4cpC0W.css xác nhận; chưa browser QA. Khóa lại desktop sau task.

- 2026-10-23: User mở riêng FONT tab con Bạn bè laptop: đổi filterButton và friendSectionTitle ở DesktopFriendsDialog sang font-body Arial bold không nghiêng giống mobile. Giữ cỡ22/27, icon và toàn bộ geometry desktop. Build/typecheck PASS; dist index-Db04Kalm.js/index-Q13H9-aA.css xác nhận; chưa browser QA. Khóa lại laptop sau thay font.

- 2026-10-23: Bạn bè mobile tăng chữ tab lọc22→25 và tiêu đề con27→30 theo token1.5; icon lọc tăng khoảng14% (online31, Facebook38/inner30, nhóm48×36). Giữ font-body bold, khung/dòng và desktop; các token25/36/38 được scale nội dung. Build/typecheck PASS; dist index-8IRzMIoM.js/index-Q13H9-aA.css xác nhận; chưa browser QA.

- 2026-10-23: Bạn bè mobile: chữ Mời chơi32→34logical; icon35→40 và crop background/offset tăng cùng40/35 tránh cắt lệch. Tab lọc/tiêu đề con3mục dùng font-body Arial bold không nghiêng. Giữ kích thước nút/tab/dòng và DesktopFriendsDialog. Build/typecheck PASS; dist index-C0TyD6TS.js/index-Dkbcqxgk.css cập nhật; chưa browser QA.

- 2026-10-23: Bạn bè mobile theo user tăng avatar118→128logical; AvatarRankBadge/danh hiệu/sao kế thừa cùng tỷ lệ và neo. Không đổi dòng/khung/cột. Mời chơi270×100→285×106, chữ30→32 theo dialog scale; nền nâu translateX -12logical giữ width/height hiện tại (đã giảm15px). DesktopFriendsDialog không đổi. Build/typecheck PASS, dist cập nhật; chưa browser QA; khóa lại phạm vi/avatar.

- 2026-10-23: Bạn bè MOBILE theo user placeholder dùng font-body Arial không nghiêng (cả Danh sách/Thêm bạn), giữ cỡ hiện tại. Nền nâu bao2nút giảm cao thêm15px thật, giữ giữa dọc và kích thước nút/dòng; DesktopFriendsDialog không đổi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: User xác nhận laptop vẫn phóng quá, yêu cầu hoàn tác đầy đủ bản cũ. DesktopFriendsDialog khôi phục nguyên component từ HEAD (chỉ đổi tên export), gồm dòng90/avatar76/danh hiệu cột riêng/nút173×60/chat63×54/search56. FriendsDialog chỉ chọn component theo compact, giữ nhánh mobile hiện tại. Không dùng bản desktop đã bị chỉnh size trong các lượt mobile. Build/typecheck PASS; dist index-MeDpNjVR.js/index-5juzdCui.css cập nhật; đối chiếu nội dung desktop với HEAD khớp hoàn toàn sau đổi tên. Chưa browser QA.

- 2026-10-23: User yêu cầu trả lại nền nâu bao Mời chơi/Chat ở Bạn bè mobile. FriendRowShade hiển thị cả compact bên cột thao tác, lề âm12/không nhận pointer; giữ kiểu dòng/khung/khoảng cách mới. Desktop giữ nguyên nền nâu hiện có. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-23: User đính chính3tab chính Bạn bè mobile chỉ căn mốc với Xếp hạng, KHÔNG thu kích thước. Khôi phục hàng tab fullwidth/gap1, ảnh h-auto/w-full/scaleY1.12 theo cỡ trước đồng bộ; bỏ hàng84%/gap10 và chiều cao ép theo tab Xếp hạng. Giữ neo dọc từ SocialDialogFrame; laptop giữ nguyên nhánh riêng. Build/typecheck PASS; dist index-6XDeaDwx.js/index-CBth_oD0.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: User khóa riêng Bạn bè LAPTOP, hoàn tác lượt đồng bộ vừa rồi trên desktop. FriendsDialogFrame chỉ dùng SocialDialogFrame khi compact; desktop khôi phục khung/nền/title/tab/dòng150 liền nhau/khung list/nền nâu SVG như ngay trước task đồng bộ. Mobile giữ dòng/khung/tab dùng chung Xếp hạng. Các chỉnh tiếp mặc định chỉ Bạn bè mobile trừ khi user mở laptop rõ. Tests ranking-view+mobile-dialog-layout3/3 PASS, typecheck/build PASS; dist index-DILmSzb6.js/index-DYj2_tBu.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user đồng bộ Bạn bè với Xếp hạng: SocialDialogFrame dùng chung khung ngoài/khung trong/nền phong cảnh/hoa văn/tiêu đề/nút X; title slot theo tỷ lệ artwork Xếp hạng để hàng3tab Bạn bè cùng mốc với2tab Xếp hạng. socialModeTabsClass, socialPlayerRowClass/ListClass và getSocialRowStyle dùng chung: dòng desktop138, mobile6slot, gap8×dialogScale, bo10×rowScale/viền/nền giống nhau; bỏ khung danh sách/nền nâu SVG riêng Bạn bè. Lời mời giữ4nhận+2gửi qua biến số slot; giữ các nút và data/search/keyboard behavior. Avatar/tên/luật không đổi. Existing ranking-view+mobile-dialog-layout3/3 PASS, typecheck/build PASS; dist cập nhật. Chưa browser QA trực quan; khóa lại phạm vi.

- 2026-10-23: Bạn bè mobile theo user đưa3tab chính lên: bỏ padding-top token48 (đang boost1.5) của content wrapper, hết khoảng chừa dư dưới tiêu đề. Panel bên dưới flex1 nhận toàn bộ chiều cao vừa giải phóng, giữ đáy và các điều khiển/dòng hiện hành; desktop không đổi. Build/typecheck PASS; dist index-CObBlHEV.js/index-CQsQa2jN.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: User đính chính tab con Bạn bè mobile bị nhỏ: bỏ reset token về scale laptop ở hàng lọc/tiêu đề mục con, khôi phục boost nội dung1.5× cho cả3 mục; giữ kiểu/logic laptop. Placeholder giảm24→21 token (mobile tối thiểu14px), giữ font kiểu; chữ nhập Arial/min16px giữ nguyên. Build/typecheck PASS; dist index-wzSn32Eq.js/index-CEenSVvk.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: User đính chính font tìm kiếm Bạn bè: placeholder giữ font-heading/Cormorant Garamond nghiêng cũ; chỉ chữ nhập dùng Arial bình thường. Nút Tìm trả font kiểu vàng cũ. Áp dụng cả Danh sách và Thêm bạn, giữ cỡ/keyboard layout. Build/typecheck PASS; dist index-CtxZtSqj.js/index-Cv7yuEY1.css xác nhận placeholder variant. Chưa browser QA.

- 2026-10-23: Bạn bè theo user: tab lọc/tiêu đề mục con cả3tab dùng getCrispUiLayout theo tỷ lệ laptop, không nhận boost1.5 của hàng user. Search input/nút dùng Arial không nghiêng; mobile input tối thiểu16px tránh zoom. useFriendsLayout bỏ resize lúc input trong dialog focus để keyboard không co/dịch bảng và hàng bạn bè. Giữ lọc dữ liệu/tương tác cũ. Build/typecheck PASS, dist cập nhật; chưa QA bàn phím trên điện thoại thật. Khóa lại phạm vi.

- 2026-10-23: Bạn bè theo user căn tên+trạng thái giữa chiều dọc dòng: bù xuống15% đường kính avatar để cân phần padding dưới30% của cụm avatar/danh hiệu. Tên giảm nhẹ26→25desktop/30→29mobile; trạng thái/avatar/chiều cao dòng giữ nguyên. Token29 mobile cùng scale nội dung. Build/typecheck PASS; dist index-CRazB_Nl.js/index-C4eihsx7.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user tăng avatar Bạn bè92desktop/118mobile (badge AvatarRankBadge tăng cùng tỷ lệ), tên26/30 và trạng thái22/24 theo token nội dung. Ô tìm và nút Tìm cao56→60, nút rộng170→190/chữ21→23, ô nhập chữ23→24 ở cả Danh sách/Thêm bạn. Giữ nguyên chiều cao dòng150desktop, mobile basis92%/số hàng và form48 để không làm đổi vùng danh sách. Build/typecheck PASS; dist index-D-oe8vwT.js/index-B-OY-xb7.css xác nhận. Chưa browser QA; khóa lại avatar/phạm vi.

- 2026-10-23: User yêu cầu danh hiệu chồng avatar đúng Home: thay wrapper FriendRank tự dựng bằng chính AvatarRankBadge chung (đủ height theo avatar và z20 như Home), bỏ bản riêng. Dành phần dưới30% avatar thay padding60/76 cũ để cụm avatar/tên/trạng thái giữa hàng. Giảm chiều cao dòng desktop160→150, mobile basis92%/số hàng (ngắn8%). Build/typecheck PASS; dist index-B_ONnnQp.js/index-BJAP6EgS.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: User đính chính danh hiệu Bạn bè phải gắn/chồng phần dưới avatar như Home. Dùng nguyên AVATA_TITLE_BADGE_STYLE chung cho top/left/width, bỏ override top100%/left50% gây tách rời. Áp dụng mọi hàng/tab mobile+laptop; giữ avatar/tên/nút. Build/typecheck PASS; dist index-CxSHuUmf.js/index-BZx2Uhjd.css cập nhật. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Bạn bè user yêu cầu căn danh hiệu theo avatar: dùng width của AVATA_TITLE_BADGE_STYLE chung (~125.23% avatar) thay170%, giữ badge ngay dưới/top100%, căn tâm50%; không đổi avatar/nút. Tên24desktop/28mobile, trạng thái21/23 theo token nội dung; hàng chữ tự cao tránh cắt, chữ-số giữ cùng font. Build/typecheck PASS; dist index-BNz6C6JW.js/index-CnNkfFDB.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: User mở căn/kích thước cụm user Bạn bè: mép trái cả cụm danh hiệu dưới avatar cách viền10px thật (padding bù35% phần badge170%); avatar84desktop/108mobile, tăng nhẹ tên/trạng thái, danh hiệu kế thừa avatar. Mời chơi230×82 desktop/270×100 mobile; Chat104×88/118×100. Cột thao tác440, token160/440 khai báo theo scale; desktop hàng160/mobile giữ6 hàng. Build/typecheck PASS; dist index-lu1j4fNx.js/index-BNcPd06d.css xác nhận. Chưa browser QA; khóa lại phạm vi/avatar sau task.

- 2026-10-23: User chốt danh hiệu Bạn bè nằm DƯỚI AVATAR (không cột riêng). Neo badge170% avatar, dành khoảng dưới tránh đè hàng; avatar giữ cỡ cũ. Giảm nhẹ tên/trạng thái; hàng2 cột identity/thao tác400 theo scale, nền nâu theo cột nút nên sang trái. Tăng Mời chơi mobile245×90/desktop210×74; Chat106×90/94×80. Token400 khai báo cục bộ theo scale; desktop hàng140, mobile giữ6 hàng. Build/typecheck PASS; dist index-BiDeDKsi.js/index-DUUA1eIE.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Sửa lỗi Bạn bè nút Mời chơi/Chat tràn mất: các token73/92/184/200/230/350 mới chưa có trong getCrispUiLayout nên fallback pixel nguyên, làm cột vượt bảng. Khai báo đủ token cục bộ theo dialog scale cho cả desktop/mobile, giữ kích thước tương đối đã yêu cầu. Nền nâu lề âm12 bao đủ ảnh/nút và ngắn hơn lề âm40 cũ; không dùng lề dương cắt dưới danh hiệu. Build/typecheck PASS; dist index-DT7WBaz8.js/index-DHd1fBqX.css xác nhận. Chưa browser QA; khóa lại phạm vi. Khi thêm token phải kiểm tra có trong bảng scale hoặc khai báo cục bộ.

- 2026-10-23: User đính chính chỉ thu khung nâu sang phải: tăng lề trái nền20→60 theo token dialog, mép phải giữ tại cột thao tác; min-w-0/overflow-hidden chặn SVG ép chiều rộng. Không tăng khung hoặc đổi cột/nút/danh hiệu trong lượt sửa này. Build/typecheck PASS; dist index-B4E64Hcj.js/index-CQ3169Oy.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Bạn bè theo user thu nền nâu ngắn thêm bằng lề trái20 thay lề âm40; cột danh hiệu200desktop/230mobile, thao tác350. Ảnh danh hiệu184desktop/210mobile (chiều cao tương ứng); Mời chơi190×66/chữ23 desktop,220×80/chữ26 mobile; Chat84×72 desktop/94×80 mobile, cùng dialog scale. Build/typecheck PASS; dist index-DSD_69gK.js/index-PtHQ86nI.css xác nhận. Chưa browser QA; khóa lại phạm vi sau task.

- 2026-10-23: Bạn bè theo user: căn Mời chơi mobile200×72/chữ24 theo dialog scale, crop icon35 cùng scale nguồn; tăng Chat mobile84×72/desktop76×65. Cột thao tác330 cả hai, gap18 theo scale; nền nâu kéo trái thêm20 (lề âm40), giãn danh hiệu/nút. Build/typecheck PASS; dist index-DqsMIZe2.js/index-DgHs07uv.css xác nhận. Chưa browser QA; khóa lại phạm vi sau task.

- 2026-10-23: Theo user, Bạn bè mobile/laptop bỏ chữ tên bậc rời bên cạnh ảnh danh hiệu. Thu cột danh hiệu desktop240→180/mobile320→210, căn ảnh giữa cột và bỏ offset trái; thu nền nâu về lề âm20, vẫn phủ cột thao tác. Giữ avatar/nút/chức năng; khóa lại phạm vi sau task. Build/typecheck PASS, dist index-CwwnwAnM.js/index-BqhHPnav.css xác nhận. Chưa browser QA.


- 2026-10-23: Theo user, Bạn bè mobile: chữ danh hiệu nằm bên phải ảnh (flex-row), dành cột320logical cho danh hiệu/280 cho thao tác. Thu nền nâu từ trái38logical bằng lề âm88→50, vẫn trải sang thao tác. User mở đúng avatar Bạn bè mobile task này: tăng76→96logical, giữ ảnh/khung/click/tâm theo hàng; desktop giữ nguyên. Build/typecheck PASS; dist index-SbS0itO7.js/index-DO6q01GP.css cập nhật. Chưa browser QA; khóa lại avatar/phạm vi sau task.

- 2026-10-23: User đính chính Bạn bè mobile: nền nâu danh hiệu phải trải qua cả cột thao tác như cũ (col2→4, khôi phục lề âm nền). Tên user tăng22→26 token, trạng thái19→21; dùng SocialPlayerName fullName/equalDigitSize như Xếp hạng, cùng font/cỡ chữ-số, cho xuống dòng. Avatar giữ hiện tại; desktop giữ nguyên. Build/typecheck PASS; dist index-CbYlu1On.js/index-Dkdd7-tY.css cập nhật. Chưa browser QA; khóa lại sau task.

- 2026-10-23: Bạn bè mobile theo user: ba tab chính thu về100% bề ngang, tăng chiều cao artwork12% và thêm padding; nội dung/control/search/tên/trạng thái token1.35→1.5×. Nền nâu chỉ còn cột danh hiệu, bỏ tràn sang thao tác và offset trái; danh hiệu rộng166→190/cao66.382→76, xếp tên bậc xuống dưới. Giữ6 người trước cuộn, avatar và desktop. npm.cmd run build/typecheck PASS; dist index-BwdRghSF.js/index-DhCfrtsr.css cập nhật. Chưa browser QA; khóa lại sau task.

- 2026-10-23: Theo user, Bạn bè mobile hạ nội dung bằng padding-top token48 để chừa nền; ba tab chính rộng thêm token54, giảm gap; token nội dung/filter tăng1.2→1.35×. Danh sách/Thêm bạn chia6 hàng trước cuộn; Lời mời chia4 nhận+2 gửi. Avatar/desktop giữ nguyên. Build/typecheck PASS; dist index-DAGFMFN2.js/index-BsKURtdk.css xác nhận friends-visible-rows. Chưa browser QA; khóa lại sau task.

- 2026-10-23: Theo user, khung ảnh tiêu đề Bạn bè/Lịch sử mobile tăng12% từ650 lên728 logical, cùng công thức650×scale×1.12 của Xếp hạng; ảnh tự cao theo tỷ lệ. Giữ neo giữa/top, desktop và nội dung. Build/typecheck PASS; dist index-CT3hn9Qs.js/index-CF_yB55F.css cập nhật. Chưa browser QA; khóa lại phạm vi sau task.

- 2026-10-22: User mở nội dung Bạn bè mobile: phóng20% token chữ/icon/control và chiều cao hàng (90→108 logical), ba tab giãn toàn bề rộng nội dung. Áp dụng Danh sách/Thêm bạn/Lời mời qua contentStyle chung. Các nút inline173/145px được tính scale ở compact để vừa cột; desktop và avatar giữ hiện tại. npm.cmd run build/typecheck PASS; dist index-rfYGowkG.js/index-CF_yB55F.css cập nhật. Chưa browser QA; khóa lại phạm vi sau task.

- 2026-10-22: User yêu cầu nguyên mẫu nút × Xếp hạng cho Bạn bè/Lịch sử mobile: DialogCloseButton cố định borderRadius12px như Xếp hạng, không nhận --radius-xl bị getCrispUiLayout scale ở bảng khác; dùng cùng buttonInteraction. Cỡ72/56 theo scale; desktop trả đúng56/42 theo scale. Build/typecheck PASS; dist index-DXuPjUd7.js/index-CF_yB55F.css cập nhật; chưa browser QA.

- 2026-10-22: Dùng chung DialogCloseButton cho Xếp hạng, Bạn bè và Lịch sử. Cùng markup/style dấu ×; compact là72px vùng bấm và56px glyph theo scale dialog; desktop56/42. Friends/history hooks cung cấp compact theo viewport. npm.cmd run build/typecheck PASS; dist index-BSq7Ldtc.js/index-BC4nPvAz.css cập nhật; chưa browser QA.

- 2026-10-22: Theo user, nút đóng Bạn bè và Lịch sử điện thoại dùng cùng kích thước Xếp hạng: vùng bấm72px, dấu56px qua compact Tailwind và token theo scale dialog; desktop giữ56/42px. npm.cmd run build/typecheck PASS; dist index-BsH_1VBg.js/index-BzMcndy_.css cập nhật. Chưa browser QA.

- 2026-10-13: Đấu máy là phiên riêng, không báo đang chơi/bận cho lời mời. Vẫn cho Mời chơi/So tài; đồng ý kết thúc phiên máy và chuyển phòng online theo người gửi. Không đưa người nhận vào phiên máy; UI Bạn bè giữ nguyên.

- 2026-10-06: Avatar tại mọi tab mở hồ sơ người chơi bằng button cùng ô76px hiện hành; chỉ bổ sung hành vi, giữ hình học avatar/hàng. Hồ sơ người khác dùng6 nút3×2 trên laptop và2×3 trên điện thoại tại vùng danh hiệu; nhãn trạng thái bạn dựa theo danh sách bạn bè và lời mời đang chờ.

Đọc tài liệu này trước mọi thay đổi tại `src/features/lobby/components/FriendsDialog.tsx`, `useFriendsLayout.ts`, `SocialUi.tsx` hoặc asset được các phần đó dùng. `AGENTS.md` trỏ tới đây để không vô tình làm lệch các điều người dùng đã chốt.

## Mốc bố cục cố định giữa các tab

- Số trong tên và bộ đếm của PlayerInfoCard dùng font-medium để nét mỏng cân với chữ xung quanh; hai số Elo dùng font-semibold theo yêu cầu tăng nhẹ độ đậm2026-10-08. Giữ cỡ chữ/lining/tabular.

- PlayerInfoCard dùng NumberText cho số trong tên/địa chỉ; tên dùng cỡ0.9em cùng baseline, lining/tabular và không giảm opacity. Quy tắc này áp dụng cả hồ sơ và preview Tùy chỉnh avatar qua component chung; mức opacity88% riêng Tin nhắn/Bạn bè giữ nguyên.

- Icon quan hệ Thêm bạn/Chấp nhận/Hủy thêm/Xóa bạn có chiều cao bằng nhau theo chuẩn friend.png1106×1091: ô rộng32% và aspect1106/1091, ảnh height100%/width auto giữ tỷ lệ. Không đặt width32% trực tiếp cho remove-friend.png1250×1220 vì chiều cao sẽ khác.

- Khi có lời mời nhận từ người đang xem, nút hồ sơ đổi thành Chấp nhận, giữ icon friend.png và kích thước32% như Thêm bạn. Chấp nhận cập nhật quan hệ chung, bỏ lời mời nhận/đã gửi tương ứng và đổi sang Xóa bạn. Lời mời nhận lấy từ fixture cùng incomingFriendRequestOverrides trong sessionStore, đồng bộ tab Lời mời/Hồ sơ/Tin nhắn; từ chối cũng lưu chung trong phiên.

- Khung nâu chứa tên/chỉ số/Bạn bè/Theo dõi/Lượt thích/địa chỉ/ID dùng PlayerInfoCard chung với hồ sơ của mình làm chuẩn. Hồ sơ mình/người khác cùng kích thước khung trong header và cùng bố cục nội dung, chỉ thay dữ liệu/quyền sửa. Tùy chỉnh avatar dùng cùng card qua previewPanel, không bản JSX/spacing riêng.

- Theo dõi trong hồ sơ tăng bộ đếm Theo dõi lên1, đổi nhãn thành Bỏ theo dõi và làm tối riêng khung/nền bằng brightness55%; icon/chữ vẫn sáng. Bỏ theo dõi giảm1 và phục hồi nút. State theo tên người lưu chung trong sessionStore để đóng/mở hồ sơ và Home/trong ván đồng bộ; hiện dữ liệu nền120 là mẫu, chưa backend.

- Nút Nhắn tin trong hồ sơ phải đóng hồ sơ trước rồi mở/chọn hội thoại của người đó; kể cả khi khung Tin nhắn đã mở phía sau. Áp dụng qua ProfileDialog dùng chung cho Home và trong ván.

- Lớp tiêu đề trang nằm dưới hàng tab; họa tiết banner không được che chữ hoặc vùng bấm tab. Header dùng stacking level thấp hơn nav.
- Tên người chơi trong các hàng dùng font chính `font-heading`, cỡ22px, font-black và viền chữ0.65px theo Xếp hạng. Chữ số trong tên dùng `font-number` cỡ0.9em với lining-nums/tabular-nums để cùng baseline với chữ, giảm nhẹ độ đậm một bậc (opacity88%). Bộ đếm trong Bạn bè cũng dùng `font-number`, lining-nums/tabular-nums và opacity88%.
- Toàn bộ khu vực Bạn bè và thao tác quan hệ bạn bè trong hồ sơ người khác được mở liên tục theo yêu cầu người dùng; giữ mở cho đến khi họ yêu cầu khóa lại. Kích thước/vị trí avatar và các phần Danh hiệu vẫn theo phạm vi khóa riêng.
- Danh sách bạn trong game phải lọc theo `friendshipOverrides`; người còn trong danh sách phải có cùng trạng thái quan hệ khi mở hồ sơ. “Xóa bạn” dùng luồng xác nhận chung và khi xác nhận phải cập nhật quan hệ để hàng biến mất khỏi danh sách. “Thêm bạn” cập nhật lời mời đang chờ.
- Trong hồ sơ người khác, trạng thái bạn bè dùng icon `remove-friend.png` cùng nhãn “Xóa bạn”; lời mời chờ dùng cùng icon với nhãn “Hủy thêm” và khung tối; trạng thái chưa gửi dùng `friend.png`. Cả ba trạng thái dùng cùng bề rộng icon32% vùng nội dung; không phóng icon sau khi thêm bạn.
- Lời mời trong hồ sơ/Tin nhắn/Thêm bạn/Đã gửi dùng chung `pendingFriendRequests`. Chấp nhận lời mời cập nhật `friendshipOverrides`; danh sách bao gồm người đã chấp nhận, Gợi ý loại họ ra. Hoàn tác giao diện phải giữ các kết nối So tài và Nhắn tin đã hoạt động.

- Lấy bố cục Danh sách đã chốt làm chuẩn. Danh sách và Thêm bạn dùng chung `friendDirectoryClass`: hàng điều khiển đầu 54px, khoảng cách 14px, vùng tìm kiếm chiếm 48px (mặt khung 56px lệch lên 4px), khoảng cách 14px, rồi khung danh sách. Vì vậy khung danh sách bắt đầu tại cùng mốc 130px tính từ vùng nội dung và có cùng chiều rộng/chiều cao.
- Thêm bạn đặt tiêu đề Gợi ý trong hàng điều khiển đầu và tìm kiếm ở hàng thứ hai để giữ cùng vị trí với Danh sách. Không tự đổi thứ tự hay chiều cao làm khung hàng di chuyển khi đổi tab.
- Tab Lời mời có hai nhóm nên vị trí và chiều cao vùng cuộn riêng; riêng cột danh hiệu dùng cùng tọa độ ngang với Danh sách/Thêm bạn. Kích thước hàng, avatar, danh hiệu và padding vẫn cùng `FriendRow`.

## Bố cục hàng và trạng thái

- Mốc hiện hành2026-10-05: nền nâu dài thêm50px thiết kế responsive về bên trái (margin-left âm38px+50px), mép phải giữ mốc cũ; danh hiệu/sao/tên bậc dịch riêng sang trái50px bằng brownContentPosition trong FriendRow. Theo yêu cầu2026-10-06, khung/ảnh danh hiệu và cụm sao được mở khóa để thử nghiệm; các cột, nền và nội dung hàng khác vẫn khóa. Nhóm nút theo yêu cầu mới được căn sát phải nền nâu, chừa8px responsive bằng padding-right của cột thao tác, không dùng offset trái50px. Áp dụng mọi tab Bạn bè, giữ kích thước/khoảng cách nội bộ của phần còn khóa. Avatar giữ vị trí cũ; tên/trạng thái dịch trái8px responsive bằng giảm gap từ36px xuống28px.

- Kích thước avatar và khung avatar Bạn bè vẫn nằm trong phạm vi khóa toàn project; khung/ảnh danh hiệu và sao đã mở khóa để thử nghiệm theo yêu cầu2026-10-06. Vị trí ngang danh hiệu ở các tab đã căn chung theo Danh sách sau khi người dùng mở khóa riêng để chỉnh: avatar76px theo responsive scale; cụm danh hiệu/sao166×84px, ảnh danh hiệu166×66.382px, sao31%/gap0.5% và cùng anchor tương đối Home. Không tự đổi hình học avatar.
- Avatar trong mọi hàng Bạn bè phải có `cursor-pointer`, dù hàng avatar chưa gắn thao tác riêng. Không đổi kích thước hoặc vị trí đã khóa.

- Mọi hàng trong Danh sách, Bạn Facebook, Thêm bạn, Lời mời đã nhận và Đã gửi lời mời dùng chung `FriendRow` và `friendListClass`. Hàng cao90px responsive, track nội dung85px được căn giữa theo chiều dọc; avatar, cột, hàng và các trường nội dung khác giữ kích thước/vị trí đã khóa. Khung/ảnh danh hiệu và cụm sao là ngoại lệ đang mở khóa để thử nghiệm, nhưng không đổi kích thước hàng hoặc vị trí của avatar/tên/nút. Viền dưới1px ở mọi hàng (hàng cuối chỉ trong suốt), avatar76px, padding phải38px, padding trái0/dọc0, lề trái khối avatar16px; cột hàng dịch trái22px và khoảng avatar tới tên28px.
- Danh sách/Thêm bạn/Lời mời dùng cột danh hiệu240px và cột thao tác330px để danh hiệu cùng tọa độ ngang ở mọi tab; cột thao tác Lời mời đủ cho cặp nút nhận/từ chối. Họa tiết nâu bên trái avatar đã bỏ; nội dung các cột dịch trái22px để lấp chỗ trống. Nền nâu thu thêm30px từ mép trái và danh hiệu dịch phải30px so với mốc cũ270px. Cụm danh hiệu/sao166×84px dùng chuẩn Home, ảnh166×66.382px; giữ kích thước hàng/avatar/padding. Kiểm tra nội dung dài và nhóm nút nhận/từ chối không đè sang cột bên cạnh.
- Mọi danh sách cuộn cần cùng kiểu khung, `scrollbar-gutter: stable`, tràn ngang bị ẩn và thanh cuộn dọc được ẩn bằng `scrollbar-width:none`/`::-webkit-scrollbar`, vẫn giữ `overflow-y:auto` để kéo dọc. Tiêu đề nhóm nằm ngoài vùng cuộn. Không chia cứng lưới 5 hàng: số hàng thay đổi nhưng mỗi hàng vẫn cao cố định 90px responsive.
- Trạng thái chỉ có `online` và `offline`. “Đang chơi/playing” được xem là online. Facebook là thuộc tính phân loại riêng (`facebook?: boolean`), không phải trạng thái thứ ba. `facebook === true` chỉ dành cho người đã kết bạn Facebook, có chơi game này và đăng nhập bằng Facebook hoặc đã liên kết tài khoản Facebook với game. Trạng thái online/offline độc lập với liên kết này. Hàng bạn Facebook hiện chấm xanh hoặc xám, chữ trạng thái và icon Facebook nằm cùng một hàng ngang; icon Facebook 21×21px, cách chữ trạng thái 6px. Phân loại bộ lọc không chồng lấn: **Tất cả** chỉ hiện bạn đã kết bạn trong game (`facebook !== true`), gồm cả online và offline; **Đang online** chỉ hiện bạn trong game có trạng thái `online`; **Bạn Facebook** hiện tất cả người thỏa điều kiện Facebook ở trên, cả online lẫn offline. Không lọc tab Facebook theo presence. Giữ chính sách này khi thay dữ liệu hoặc bộ lọc.
- Bắt buộc chấm trạng thái, chữ Đang online/Offline và icon Facebook nằm cùng một hàng ngang, cùng tâm theo chiều dọc. Cả ba là phần tử con trực tiếp của một hàng inline-flex/flex-row/nowrap; không đặt icon Facebook thành dòng riêng, kể cả khi đổi tab hoặc tên dài.
- Vị trí tên và trạng thái lấy Danh sách → Tất cả làm chuẩn cho mọi hàng. Khối nhận diện cao 76px, cột tên/trạng thái cao 53px với hàng tên 24px, khoảng cách 8px, hàng trạng thái 21px. Cả tên và trạng thái căn cùng mép trái; không để nội dung, Facebook hoặc đổi tab làm thay chiều cao khối chữ và dịch vị trí.
- Hover nút chỉ đổi màu/độ sáng. Không thêm translate, scale, thay kích thước, margin hoặc font khi hover/focus/active; tránh transition gây nhấp nháy.
- Icon kính lúp ở ô tìm kiếm Danh sách và ô tìm kiếm Thêm bạn dùng chung SearchIcon: cùng SVG, kích thước31px theo responsive scale và nét vẽ. Chỉ cho phép màu/bóng khác theo nền, không tạo biến thể nhỏ hơn.
- Danh sách và Thêm bạn đều có nút Tìm dùng chung FriendSearchButton: cao56px responsive bằng ô nhập, rộng tối thiểu170px, cùng icon và kiểu vàng. Hàng tìm kiếm vẫn giữ mốc48px, mặt ô/nút56px lệch lên4px; việc thêm nút không dịch khung danh sách bên dưới. Danh sách tiếp tục lọc khi nhập; bấm Tìm hoặc Enter chuẩn hóa khoảng trắng đầu/cuối.
- Chữ gợi ý ô tìm kiếm Danh sách và Thêm bạn thống nhất: “Nhập tên / ID người chơi...”.

## Thứ tự người chơi

- Luôn sắp xếp người online trước người offline trong mọi danh sách Bạn bè: danh sách bạn game, tab Facebook, gợi ý kết bạn, lời mời đã nhận và lời mời đã gửi. Giữ nguyên thứ tự tương đối giữa những người cùng trạng thái để danh sách ổn định khi render. Tìm kiếm/lọc chạy trước, rồi sắp xếp các kết quả.

## Danh hiệu và tab

- Bộ bảy ảnh danh hiệu mới dùng chung `rankArtwork` từ `src/lib/rankArtwork.ts`, asset `src/assets/ranks/rank-*-v2.png`; nguồn và crop tại `src/assets/ranks/rank-artwork-v2.md`. Không khai báo bộ import riêng trong Bạn bè để tránh lệch ảnh với các cụm avatar.
- Danh hiệu và sao dùng `RankTitleBadge` chung với Home, ảnh rank-star.png; sao dưới ảnh danh hiệu theo RANK_TITLE_STARS_STYLE, không còn đặt cạnh tên. Cụm rộng166px/cao84px; khung ảnh166×66.382px để cả cụm vừa hàng85px. Vùng đủ3 ô cố định, sao đạt điền trái→phải; tỷ lệ31% và gap0.5% lấy từ RANK_STAR_LAYOUT. Tên danh hiệu vẫn ở bên cạnh. Mọi tab dùng cùng FriendRank; thay chuẩn chung phải đồng bộ các màn hình trong cùng nhiệm vụ.

- Dùng đủ bảy asset danh hiệu theo thứ tự Tân Binh, Kỳ Sĩ, Kỳ Thủ, Kỳ Tướng, Đại Sư, Kỳ Vương, Kỳ Thánh. Bậc/tên/sao lấy cùng getRankProgress; RankTitleBadge lấy ảnh từ catalog rankArtwork. Cả7 bậc tối đa3 sao, chỉ hiện sao đạt và điền trái→phải; mỗi100 Elo thêm1 sao, sao dừng tại2800 nhưng Elo vẫn tăng. Vùng sao rộng bằng khung danh hiệu, tự co theo tỷ lệ chung. Chi tiết tại docs/RANK-SYSTEM.md.
- Ba tab Danh sách/Thêm bạn/Lời mời giữ kích thước asset nền hiện tại. Khi chọn, dùng `selectedImageTabGlow` chung với Xếp hạng; glow chuyển bằng filter, không đổi layout hoặc vị trí chữ/icon.
- Asset khung tiêu đề nhóm dùng `friend-section-title-frame-tight.png`; phần ngoài viền phải trong suốt và ảnh cắt sát viền. Giữ alpha khi thay/crop asset.

## Lời mời và thao tác

- 2026-10-13: Nút Mời chơi gọi luồng challenge socket thật, dùng thông báo phản hồi hiện có, không đổi layout. Khi chấp nhận, nếu người gửi chưa vào phòng online thì tạo phòng mới và đưa cả hai vào (người nhận rời phòng cũ nếu có); nếu người gửi đang ở phòng thì giữ phòng đó và đưa người nhận tới. Chọn phòng tại thời điểm đồng ý, không theo phòng người nhận. Giữ kiểm tra đang đấu/đã Sẵn sàng và quy tắc ghế/người xem của phòng; không đẩy người khác khỏi bàn. Danh sách Bạn bè vẫn là dữ liệu mẫu trong phiên, chỉ gửi được khi tên đích khớp người thật đang kết nối; lỗi offline/trùng tên không báo thành công giả.

- `sentInvites` là nguồn state duy nhất cho danh sách Đã gửi, số đếm và trạng thái nút Kết bạn. Gửi không thêm trùng; hủy xóa khỏi danh sách và mở lại nút Kết bạn. State hiện tại là thử nghiệm trong phiên; không tuyên bố đã đồng bộ máy chủ hoặc lưu qua lần tải lại.
- Badge tròn đỏ trên tab Lời mời đếm `received.length`, ẩn khi bằng 0, giảm khi chấp nhận/từ chối. Dùng số `99+` khi vượt 99.
- Nút Mời chơi và Nhắn tin phải có phản hồi khi bấm. Nhắn tin mở UI xem thử theo MESSAGES-UI.md; các hành động backend chưa tích hợp không được giả báo đã gửi lời mời hoặc tin nhắn.
- Thẻ xanh “Đã gửi” chỉ dành cho gửi lời mời kết bạn thành công trong state demo. Giữ vị trí trung tâm, nền xanh hiện tại, rộng tối thiểu 190px, Cormorant Garamond 24px/700. Tải font trước khi mount toast để tránh nhảy chữ. Thời gian đứng 500ms, bay lên 80px và mờ trong 320ms. Nếu có toast mới chồng lên, toast cũ bay lên ngay.

## Kiểm tra trước khi bàn giao

1. Xem diff trước khi sửa để bảo toàn các thay đổi hiện tại; không thay cả component bằng bản cũ.
2. Đổi qua từng tab và kiểm tra chiều rộng, vị trí cột, chiều cao hàng, avatar, padding và thanh cuộn. Kiểm tra Online, Offline, Facebook online và Facebook offline nếu fixture có.
3. Hover/focus/active các nút; xác nhận chỉ đổi màu và không nhích/nhấp nháy.
4. Gửi/hủy kết bạn và chấp nhận/từ chối lời mời; xác nhận danh sách, badge và nút dùng chung state.
5. Chạy `npm.cmd run build` từ `board-game/` theo quy tắc dự án; xác nhận asset/bundle mới được đưa vào `dist/`. Ghi kết quả thật vào `PROGRESS.md`. Không nói đã browser QA nếu chưa thao tác giao diện trong trình duyệt.

Rendering2026-10-05: kích thước thiết kế được chuyển qua getCrispUiLayout thành CSS cuối cùng, không parent scale; xem docs/UI-IMAGE-RENDERING.md. Giữ cấu trúc hàng, tọa độ tương đối và chuẩn sao Home.

- 2026-10-05: Khung đỏ Gợi ý cho bạn ở Thêm bạn dùng cùng friendSectionTitle/Style cao50px thiết kế như hai tiêu đề Lời mời. Đặt trong hàng điều khiển54px theo token responsive để giữ mốc Danh sách/Thêm bạn; không dùng inline height54px cố định bỏ qua hệ số responsive.

- 2026-10-05: Người dùng duyệt mở khóa một lần để căn vị trí ngang danh hiệu mọi tab theo Danh sách; mọi FriendRow dùng cột rank240px, action330px. Khóa lại vị trí theo mốc mới, giữ nguyên kích thước avatar/khung/sao.

- Nút thao tác Kết bạn, Chấp nhận/Từ chối và Hủy lời mời dùng cùng chiều cao responsive60px thiết kế như nút Mời chơi ở Danh sách; không gán chiều cao pixel cố định. Giữ nguyên bề rộng riêng của từng nút.

- 2026-10-05: Vị trí khung tiêu đề nhóm friend-section-title-frame-tight.png lấy Gợi ý cho bạn ở Thêm bạn làm chuẩn. Giữ cùng lề ngang/chiều rộng/chiều cao và độ lệch dọc (slot54px - khung50px)/2 theo token responsive. friendSectionTitleStyle dùng chung cho Gợi ý, Lời mời đã nhận và Đã gửi lời mời; Add dùng align-start để độ lệch chung giữ nguyên tọa độ mẫu. Không tăng chiều cao slot hoặc dịch các danh sách/avatar/danh hiệu/sao đã khóa để căn tiêu đề.


## Kết bạn từ hồ sơ người chơi

- Nút Thêm bạn tạo lời mời đang chờ trong state phiên. Trạng thái này còn khi đóng/mở lại hồ sơ; “Hủy thêm” dùng icon Xóa bạn, hiển thị mờ nhưng vẫn bấm được để rút lời mời. Khi state quan hệ chuyển sang đã là bạn, lời mời chờ được xóa và nút trở lại sáng với nhãn Xóa bạn.
- Xóa bạn mở hộp xác nhận “Bạn có chắc muốn xóa bạn với {tên} không?” với nút Hủy và Đồng ý. Checkbox “Không hiển thị lại” nằm ngoài hộp xác nhận ở góc dưới bên phải; khi chọn và Đồng ý, các lần xóa tiếp theo trong 10 phút thực hiện trực tiếp. Sau thời hạn, xác nhận hiện lại.
- Lời mời chờ và thời hạn bỏ xác nhận chỉ lưu trong phiên. Backend kết bạn/đồng ý giữa hai tài khoản chưa được tích hợp; khi dữ liệu quan hệ bên ngoài cập nhật thành bạn, UI sẽ tự chuyển lời mời chờ sang trạng thái bạn bè.

## Theo dõi, nhắn tin và quà tặng

- Bấm Theo dõi: tăng số người theo dõi của người nhận thêm1, rồi đánh dấu nút đã theo dõi bằng trạng thái tối/mờ và vô hiệu hóa. Trạng thái giữ nguyên sau khi đóng/mở lại hồ sơ, không cho nhấn theo dõi thêm lần nữa.
- Nhắn tin2026-10-07: mở giao diện xem thử theo ảnh01f4e691, dùng lại khung Xếp hạng với tiêu đề Tin nhắn. Chỉ dựng UI mẫu, logic để sau; xem MESSAGES-UI.md. Nút trong hàng Bạn bè chỉ đổi hành vi mở dialog, giữ nguyên hình học/UI.
- Tặng quà sẽ hỗ trợ vàng (giá trị món quà phải >3.000 vàng nhằm hạn chế lạm dụng tài khoản phụ), skin, hiệu ứng, khung viền và avatar. Giao diện để quyết định sau.
- Đây là ghi nhận yêu cầu tương lai; không xem là chức năng đã có.
- Nút Thêm bạn dùng `src/assets/profile/actions/friend.png`; khi đã là bạn bè hoặc vừa thêm xong thì dùng `src/assets/profile/actions/remove-friend.png`. Hai icon cùng huy hiệu vàng và phong cách, chỉ khác dấu cộng/trừ; nhãn là Thêm bạn khi chưa kết bạn, Hủy thêm ngay sau khi thêm trong hồ sơ đang mở, Xóa bạn khi mở lại hồ sơ bạn bè.

- 2026-10-15: Mời chơi trong danh sách Bạn bè chỉ render khi presence=online; offline ẩn hoàn toàn, không chỉ disabled. Nút Nhắn tin vẫn hiện, giữ geometry hàng/avatar và các tab kết bạn/lời mời.

- 2026-10-16: Theo yêu cầu trực tiếp mở đúng phạm vi typography cột tên/trạng thái và ô tìm kiếm Bạn bè: dùng font-heading (Cormorant) cho chữ/tìm kiếm/trạng thái; tên font-semibold bỏ text-stroke, số tên qua NumberText compact90%/font-number/lining/tabular/weight medium, giữ opacity88% hiện hành và baseline inline. Áp dụng FriendIdentity/PresenceLabel chung mọi tab và cả2 ô tìm kiếm. Giữ font-size/line-height/hàng/spacing/avatar/nút/danh hiệu, không đổi layout; phạm vi còn lại vẫn khóa và typography khóa lại sau nhiệm vụ.

- 2026-10-16: Theo yêu cầu tăng nhẹ độ dày chữ/số Bạn bè: tên FriendIdentity semibold→bold, số NumberText medium→semibold, trạng thái PresenceLabel medium→semibold; giữ font/cỡ/opacity88%/baseline/hình học và không thêm stroke. Component chung đồng bộ mọi tab. Phạm vi typography mở đúng yêu cầu rồi khóa lại, avatar/layout khác giữ nguyên.

- 2026-10-16: Theo phản hồi số đang đậm hơn chữ, tên Bạn bè tăng extrabold và stroke0.2px chỉ phần chữ; span số reset stroke0, NumberText weight normal thay semibold, giữ compact90%/opacity88%/baseline. Trạng thái bold. Thay quy tắc không stroke của lần trước đúng phạm vi tên này; giữ font/cỡ/hình học/avatar và đồng bộ mọi tab qua FriendIdentity/PresenceLabel. Phạm vi typography khóa lại sau task.

- 2026-10-16: Chốt tên Bạn bè/Xếp hạng dùng SocialPlayerName chung tại SocialUi: chữ font-heading/extrabold/stroke0.2px; số NumberText font-number/normal/compact90%/opacity88%, stroke riêng0.1px để tăng nhẹ từ lần trước, cùng baseline inline. Trạng thái dùng socialPresenceTextClass font-heading/bold. Phạm vi người dùng mở gồm typography tên/trạng thái hai màn, không đổi font-size/spacing/avatar/khung/hàng/nút/rank/Elo. Áp dụng mọi tab qua component chung; khóa lại phạm vi sau nhiệm vụ.

- 2026-10-16: Theo yêu cầu tăng số thêm chút, stroke số trong SocialPlayerName tăng0.1px→0.2px, đồng bộ tên Bạn bè/Xếp hạng. Giữ nguyên chữ/font/weight/cỡ/opacity/baseline/hình học; phạm vi khác vẫn khóa.

- 2026-10-16: Sửa cắt nét tên Bạn bè/Xếp hạng: SocialPlayerName có line-height1.4 và tự truncate ngang; h3 giữ slot cao24px, flex items-center/không overflow-hidden để line box đầy đủ vượt slot mà không bị cắt dấu/đuôi chữ. Giữ font/weight/stroke/baseline tương đối và chiều cao hàng/avatar/spacing. Đồng bộ component chung, chỉ mở phạm vi sửa cắt nét rồi khóa lại.

- 2026-10-16: Theo yêu cầu tăng độ đậm và dày số tên Bạn bè/Xếp hạng: SocialPlayerName giữ weight normal, số bỏ soften (opacity100% thay88%), stroke0.2→0.3px. Giữ phần chữ/font/cỡ/line-box1.4/baseline/hình học; áp dụng cả2 màn qua component chung, phạm vi khác giữ khóa.
- 2026-10-16: Theo yêu cầu sửa riêng ô tìm kiếm Bạn bè: cả Danh sách/Thêm bạn dùng lining-nums/tabular-nums để số thẳng hàng; dữ liệu Friend giữ publicId và bộ lọc chung khớp tên hoặc ID công khai chính xác. API search đã hỗ trợ ID; sửa client không loại kết quả ID vì tên khác query. Giữ layout/avatar; khóa lại phạm vi ô tìm kiếm sau task.
- 2026-10-16: Người dùng mở riêng vị trí cụm avatar/khung/danh hiệu/sao Xếp hạng để hạ2px CSS; không dịch tên/hạng/hàng. Bạn bè mở riêng nguồn avatar/khung thật trên mọi tab: API social/search trả avatarCode/avatarFrameCode; AccountAvatar dùng chung Xếp hạng/Bạn bè tái sử dụng portrait/frame hồ sơ. Giữ slot76px/84px, danh hiệu/sao Bạn bè và layout khác. Khóa lại các phạm vi avatar sau task.

- 2026-10-20: User mở đúng chiều cao khung ngoài Bạn bè trên mobile portrait để cao82%viewport (chừa48px) qua mobileDialogHeight; scale/chiều rộng/avatar/hàng và desktop giữ như cũ. Thay đổi này đồng bộ Hồ sơ/Xếp hạng/Lịch sử; sau task khóa lại geometry mới.


- 2026-10-20: User cho nới chiều ngang các khung mobile portrait: lề tổng20px thay32 qua mobileDialogMargin; các bảng dùng helper chung. Chỉ phần Thông tin được tăng avatar/header/Elo/footer lần này, không sửa hàng Bạn bè/Xếp hạng hoặc desktop. Khóa lại phạm vi sau task.


- 2026-10-23: Theo user, tăng nút đóng chung Xếp hạng/Bạn bè/Lịch sử mobile: vùng bấm72→84 và dấu×56→64 theo dialog scale. Giữ góc12px, vị trí/buttonInteraction, desktop56/42. Áp dụng qua DialogCloseButton dùng chung; khóa lại phạm vi.

- 2026-10-23: Theo user, nâng nút× chung Xếp hạng/Bạn bè/Lịch sử mobile lên3px hiển thị qua DialogCloseButton. Giữ kích thước84/64, neo ngang/góc và desktop. Khóa lại phạm vi.

- 2026-10-23: Theo user, nâng nút× mobile thêm5px, tổng offset lên8px; đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton. Giữ kích thước và desktop; khóa lại phạm vi.

- 2026-10-23: Theo user, dịch nút× mobile sang phải5px, giữ offset lên8px; đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton. Desktop giữ nguyên; khóa lại phạm vi.

- 2026-10-23: Theo user, dịch nút× mobile thêm lên10px/trái15px so vị trí trước; tổng offset trái10/lên18px. Đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton; khóa lại phạm vi.

- 2026-10-23: User đính chính hướng dịch nút× lượt trước: phải15px thay trái15px, giữ nâng thêm10px. Tổng offset hiện tại phải20/lên18px cho Xếp hạng/Bạn bè/Lịch sử mobile; desktop giữ nguyên. Khóa lại phạm vi.

- 2026-10-23: Theo user, dùng thanh cuộn Xếp hạng laptop cho danh sách Bạn bè/Xếp hạng/Lịch sử mobile: socialListScrollbarClass chung ở uiClasses, thumb trắng/bo tròn, track trong suốt, thin/6px, gutter stable, ẩn nút mũi tên. Friends áp dụng mọi tab/danh sách lời mời; History cả Đã chơi/Đã lưu và Thế cờ đang ẩn để phục hồi đồng bộ. Desktop giữ style cũ (Ranking tái dùng token cùng nội dung). Build/typecheck PASS; dist xác nhận thanh cuộn trắng; chưa QA trình duyệt điện thoại thật (thanh cuộn overlay do trình duyệt điều khiển). Khóa lại phạm vi.

- 2026-10-23: Theo user, đồng bộ nút× MOBILE qua DialogCloseButton chung cho Hồ sơ/Xếp hạng/Bạn bè/Lịch sử (và nơi tái dùng): dịch trái4px (translateX20→16), tăng nhẹ vùng bấm84→90 và dấu64→68 theo scale. Hồ sơ giữ scale Xếp hạng đã chốt; mọi chỉnh tiếp dùng component chung, không offset riêng. Desktop giữ56/42 và không transform. Build/typecheck PASS; dist xác nhận offset chung mới; chưa browser QA. Khóa lại phạm vi.

- 2026-10-26: Theo user, nềnmờ thôngbáo/xácnhận phải phủ toànviewport kểcả ngoài khunggame. Thêm NoticeOverlay dùng native dialog.showModal top-layer, fixedinset0/100vw×100dvh/maxnone để thoátclipping/transform khungcha nhưng kếthừatoken. Ápdụng MessagesFriendRemovalConfirmation dùngchung Hồsơ/Chat/thànhviênnhóm, feedbackHồsơ vàfeedbackBạnbè cả2viewport. Giữnộidung/nút/callback, EscapegọiHủy (pendingkhôngđóng); stopPropagationcancel/close để khôngđóng/resetdialogcha. Build/typecheck PASS,distcậpnhật; chưa browserQA. Chỉ mởphạmvilớpphủthôngbáo tasknày, geometryavatar/cácbảng giữkhóa.

- 2026-10-26: Xem thử theo user: SearchButton chung Bạnbè mobile/laptop và ChọnBàn dùng ảnhfriend-action-button-frame.png nhưMờichơi thaysearch-frame.png; chữ/iconnâu#2b1909để rõ trênnềnvàng. Giữ size/class từngngữcảnh/type submit/disabled/callback; khôngđổiMờichơihoặclayoutBạnbè. Build/typecheck PASS,distcậpnhật; chưa browserQA. ChỉxemthửkhungnútTìm, khôngchốtkhóavĩnhviễn.

- 2026-10-26: User thaythử SearchButton bằngkiểuvàng nútHủy/Đồngý trongảnh (mobileNoticeButtonStyle): bỏảnhMờichơi, nền gradient#ad7e08→#805100/viền#d8ac35/chữicon#ffe535/bo3px/insethighlight nhưmẫu. ÁpdụngchungTìm Bạnbè/ChọnBàn cảmobile/laptop; giữsize/submit/disabled/callback. Build/typecheck PASS,distcậpnhật; chưa browserQA. Đây làxemthử, thaylượt dùngảnhMờichơi trước.

- 2026-10-26: Theo user, Không hiển thị lại của xác nhận xóa bạn chuyển xuống dưới panel15px, căn phải theo panel thay vì gócviewport. Label absolute topcalc100%+15/right0 bên trong sectionrelative, giữcheckbox/pending/hànhvi và nềnmờfullviewport; áp dụngcomponentchung Hồsơ/Chat/thànhviên cảmobile/laptop. Build/typecheck PASS,distxácnhận; chưa browserQA.

- 2026-10-26: User bỏKhônghiểnthịlại ởxóabạn: gỡcheckboxkhỏiMessagesFriendRemovalConfirmation, bỏbypassmutedUntil/cấpmute ởhook vàmemberoptions đểluônxácnhận; giữhủy/đồngý vàbackend. ThôngbáoMờichơi/SoTài dùngNumberText compact/normal/khôngsoften cho2chỗtên, đồngfont/cỡsốnhưtênkhác. Thu2khung✓× desktop80×40→56×36/mobile90×46→64×38, tăngdấu24→32px/căngiữa; giữmàu/aria/pending/callback. Ápdụngcảlaptop/mobile. Build/typecheck PASS,distcậpnhật; chưa browserQA.

- 2026-10-26: Theo user, thôngbáoMờichơi/SoTài xếpChặn/×/✓ (×trái✓phải). Haiô tick5phút/10phút chọnđộcquyền, mặcđịnh5; Chặn từchốilờimờihiệntại vàkhóa người gửitheokhoảngchọn,×chỉtừchối. ChallengeService validateacceptedfalse/block5|10, chặnserver trướcphátinvite; blocksRAM theo socketngườinhận+accountIDgửidoauthcontrollercấp (khôngtinclient), gửinốilạikhôngbypass, hếtgiờtựdọn. Receiverdisconnect xóablockphiên;reload/thoát-vàolạigame nhậnlờimờibìnhthường, rờibàntrongcùngkếtnốikhôngreset. KhôngDB/khôngchặnchat/hủybạn. Khi bịchặn gửi,mọientryBạnbè/Hồsơ hiệntoastĐãbịchặn dùngchungInviteSentNotice vớiĐãgửi; resultblockcũngtoast, khôngpopup lớn. Build/typecheck PASS,distcậpnhật; chưa QA2client/socketthật,khôngchạytests/khôngrestartserver.

- 2026-10-26: Theo user dờiphầnChặn xuốngdưới2nút×/✓, táchbằngline/đệm16; nútChặn112×46/chữ20px, ôtick20px/chữthờigian18px/gap24 lớn hơn. Hai nút×/✓ vàlogicblock5/10phút giữnguyên. Ápdụnglaptop/mobile. Build/typecheck PASS,distcậpnhật; chưa browserQA.

- 2026-10-26: User đổiChặn thành1checkboxtrắng bên dưới×/✓ cănphải. Bỏnútvàng/line/haiôthờigian; một hàngjustify-end ôtick20px+Chặn+select5/10phút (mặcđịnh5). Tickthựchiệnchặn server/từchối nhưnúttrước;×vẫnchỉtừchối,✓vẫnnhận. Ápdụngmobile/laptop,khôngđổilogicblockphiên. Build/typecheck PASS,distcậpnhật; chưa browserQA.
