# Home điện thoại

2026-10-18: Bố cục theo ảnh người dùng, ảnh chỉ dẫn vị trí; artwork lấy từ project.

- `src/pages/home/MobileHome.tsx` là phần trình bày compact (<=800px); HomePage giữ toàn bộ dialog và hook nghiệp vụ hiện có. Không đổi desktop hoặc token avatar toàn project.
- Nền home.png, avatar/khung tài khoản thật và AvatarRankBadge/PlayerNameplate dùng chung. Quyền bố trí lại avatar chỉ trong Home compact của task này; giữ khóa sau task.
- Hai ô tài nguyên xếp dọc góc phải, dùng gold-frame-v2 và icon v2. Số dư thật; cộng năng lượng mở EnergyDialog, vàng vẫn báo chưa hỗ trợ.
- Banner dùng tournament-title-large, không tạo artwork mới. Hai chế độ mỗi trang: Cờ Tướng/Chọn Bàn, Cờ Úp/Chơi Với Máy. Mũi tên chuyển trang, vòng lại; callback/energy gate/backend giữ useHome.
- Dock: Xếp hạng/Bạn bè/Lịch sử/Cửa hàng/Chat/Cài đặt. Không thêm nhiệm vụ hoặc túi đồ chưa có. Cài đặt mở lên trên để nằm trong viewport; mặc định desktop vẫn mở xuống.
- Theo yêu cầu 2026-10-22, dock mobile tăng nút tiện ích11→12.5cqw (giới hạn56px) và nhãn3.2→3.6cqw; desktop giữ nguyên.
- Nameplate compact rộng37cqw đúng bằng cụm hai ô Elo; giữ chiều cao27px, padding17px và chữ17px như nameplate128px trong PlayerCard. Cụm Elo đặt ở top12cqw; ô cao6cqw, icon3.8cqw và số Elo3.3cqw. Cúp banner là emoji 🏆 runtime, cỡ15cqw.
- Cỡ theo container và chiều cao viewport, có safe-area đáy; không dùng màn mobile demo cũ với chữ lỗi mã hóa và emoji placeholder.

Kiểm chứng:6/6 test mobile-home/home-settings/home-quick-wait/audio-preferences PASS; typecheck/build PASS. Chưa browser QA hoặc kiểm tra hình học trên máy thật vì không có browser kết nối trong phiên. Test DOM chỉ xác nhận carousel/callback/settings, không xác nhận ảnh/pixel/overflow thực tế.
2026-10-18: Nút Cửa hàng đã mở screen shop phủ viewport, dùng chung đường vào với Home desktop.


## Xem mobile trên laptop — 2026-10-20

Mở `http://localhost:5173/mobile-preview` khi dev đang chạy, hoặc `http://localhost:3001/mobile-preview` sau build và `npm.cmd start`.

- Chọn Nhỏ360×800 / Tiêu chuẩn390×844 / Lớn430×932.
- Xoay ngang/dọc và tự thu vừa màn hình laptop; kích thước bên trong iframe vẫn đúng sốpx đã chọn, không ép desktop thành mobile bằng CSS giả.
- Bấm trực tiếp trong điện thoại để đăng nhập, vào Home/Shop/Chọn Bàn hoặc chơi theo cùng luồng ứng dụng. Session/cookie cùng origin.
- Đổi cỡ hoặc xoay không tải lại phiên; nút Tải lại mới reload. Về bản laptop mở `/`.
- Outer preview không khởi tạo account/socket riêng. Các UI compact hiện có được tái sử dụng; các phạm vi UI khóa giữ nguyên. Khung này mô phỏng viewport, không giả lập bàn phím ảo, safe-area phần cứng hoặc hành vi touch riêng của hệ điều hành.

Kiểm chứng:3/3 test preview/route/Home compact PASS, typecheck/build PASS; live URL5173 HTTP200. Chưa browser QA trực quan vì CUA/node_repl không khởi động được runtime trong phiên này.

- 2026-10-20: Theo2ảnh user, bổ sung2ôElo dưới tên Home mobile (elo-frame/red-general/concealedPiece cósẵn, Elo thật theo2variant), cúp🏆 cùng biểu diễn desktop trên banner. Dock6nút dùng homeUtilityButton+HomeIcon/HomeSettings chung desktop, bỏ bộ nền/góc bo riêng mobile. Ô4chếđộ cùng aspect561/701 và width, đồng bộ offset/clip source qua homeModeArtwork dùngcảdesktop/mobile; desktop giữnguyên thôngsốcũ, mobile căn plaque ChọnBàn+50/ChơiMáy+55 để ngang hàng. Khôngđổi avatar/khung/nameplate geometry khóa. MobileHome regression1/1 PASS gồm2Elo/cúp/6nútshared/callbacks/carousel/settings; typecheck/build PASS, dist xácnhận. Đã đốichiếu source ảnh2ôvà thôngsốreference; chưa browserQA trựcquan (CUA/node_repl lỗi runtime ởlượttrước).


- 2026-10-20: Theo ảnh/yêu cầu user mở đúng phạm vi Home mobile để thu avatar/tên/Elo: avatar20→17cqw (khóa lại sau task), nameplate28→25cqw/left19;2Elo cùng hàng grid2 top11/width37cqw, font3cqw. Vàng/năng lượng35→30cqw, h8→7 và icon/chữ/nút+ giảm tương ứng. Giải đấu76→90%/top25%, cúp13→15cqw. Riêng ChọnBàn/ChơiVớiMáy mobile scale1.07 neo plaque84% để cân kíchthước với2ôcòn lại, giữ offsetchung và ngang tên. Chỉ MobileHome, không sửa desktop/token avatar toànproject. Typecheck/build PASS, dist xácnhận layoutmới; không thêm test cho tinhchỉnh size, chưa browserQA trựcquan.


- 2026-10-20: User chỉnh Home mobile: Giải đấu top25→21%; nameplate rộng37cqw bằng tổng2Elo dưới, giữ height5.3cqw/font3.3cqw để không đè Elo; left19cqw giữ. Hạ riêng2ô bênphải ChọnBàn/ChơiMáy thêm20px trên canvas701 (co theo kíchthước), giữscale1.07. Chữ6nhãn dock2.7→3.2cqw. Quyền user chỉmở rộng khungtên mobile tasknày, khóa lại geometry mới; avatar vàdesktop khôngđổi. Typecheck/build PASS, dist xácnhận class/offset mới; chưa browserQA, không thêm test size.


- 2026-10-20: User chỉnh Home mobile: thu2ô bêntrái CờTướng/CờÚp scale0.94 (phải1.07 giữ), tănggap3→6%. Bỏ margin6px/border3px/shadow và lớpviềnvàng ngoài Home compact, section h-dvh w-full để nền đầy viewportđiệnthoại; không bỏ khungthiếtbị ở /mobile-preview. Khungtên được user mở đúngphạmvi tăngheight5.3→6cqw, width37/font3.3/left19 giữ, khôngđè Elo top11; khóa lại sau task. Typecheck/build PASS, dist xácnhận; chưa browserQA, không thêmtest thayđổi size.


- 2026-10-20: User báo ômobile bênphải to hơn sau thuôtrái. Giảm riêng ChọnBàn/ChơiVớiMáy scale1.07→0.94, đồngnhất4ô0.94; giữ vịtrí/gap6%/mobileDrop20. Typecheck/build PASS, dist xácnhận; chưa browserQA.


- 2026-10-20: User yêu cầu nâng ôbênphải mobile ngang ôtrái. Bỏ phần hạ riêng20px canvas (mobileDrop0 thay20) choChọnBàn/ChơiVớiMáy; giữoffsetảnhchung50/55, scale0.94/gap6%. Typecheck/build PASS, dist xácnhận; chưa browserQA.


- 2026-10-20: Xem thử theo user tăng nhẹ2ôbênphải mobile: ChọnBàn/ChơiVớiMáy scale0.94→0.97 (khoảng3.2%), giữneo/offset/mobileDrop0 và ôtrái0.94. Typecheck/build PASS, dist xácnhận; chưa browserQA.


- 2026-10-20: User yêu cầu ôphải tothêm và cácbảng mobile cao hơn (ảnh Hồsơ, gọi rõ Bạnbè/Xếphạng). Ôphải ChọnBàn/ChơiMáy scale0.97→1, trái0.94/offsetgiữ. Thêm mobileDialogHeight dùngchung useProfile/Friends/Ranking/HistoryLayout: portrait<=800px cao82%viewport (chừa48px), giữscalechiềurộng/font/avatar; landscape/desktop giữnguyên. Hồsơ phầnTùychỉnhavatar khôngđổi (avatarHeight/Scale cũ); Chat kếthừaRankingLayout cũngcao hơn. Usermở đúngchiềucao ngoài/vùngnộidung cáckhung mobile trongtasknày, sau taskgiữkhóa lại; khôngđổi geometryavatar/row/button desktop.3/3 tests layout+mobileHome PASS gồmresize/giữscale/desktop; typecheck/build PASS, dist index-C72LcB1Z.js. Chưa browserQA trựcquan.


- 2026-10-20: Theo yêu cầu user, nới các dialog mobile portrait từ lề tổng32px xuống20px qua mobileDialogMargin (Hồ sơ/Bạn bè/Xếp hạng/Lịch sử và Chat kế thừa), giữ desktop/landscape. Chỉnh riêng Thông tin compact: header190→270, cột avatar145→180, avatar tăng25% bằng calc128*1.25, brown card h270 và hẹp theo cột mới, bỏ translateY-21 riêng compact. PlayerInfoCard nhận mobileExpanded cho card Hồ sơ thường, không Tùy chỉnh: tên34→38, chip Elo min-h54, thông số cho wrap khi hẹp. Thống kê132→170, nhãn/chữ/số lớn hơn; vùng Danh hiệu flex còn lại giảm tương ứng. Footer Liên kết/Đăng xuất min-width240, padding/chữ tăng compact. User mở đúng avatar/profile geometry và chiều ngang khung mobile cho task này, khóa lại sau task.6/6 tests mobile-dialog-layout/profile-logout/profile-rank-sync PASS; typecheck/build PASS dist index-i-N9o_7i.js. Chưa browser QA trực quan.


- 2026-10-20: User tinh chỉnh Thông tin mobile: hạ card nâu thêm8px logical (co theo scale), nâng toàn popup6px CSS qua translate riêng compact (không áp dụng Tùy chỉnh/địa chỉ/Danh hiệu full). Cụm Sở hữu nâng3px logical, items-center/leading-none; số từ20px cốđịnh xuống1em bằng nhãn ởcompact. Desktop giữnguyên stylecũ. User cho dịch đúngcard/task này; khóa lại sau sửa. Typecheck/build PASS, dist xácnhận; chưa browserQA, không thêmtest offset.


- 2026-10-20: User xác nhận rõ nâng biển Thông tin và hạ mép trên khung nâu lớn xuống hàng2ô Cờ Tướng/Cờ Úp. ProfileDialog thường compact tách layer nền/viền khỏi content; top nền=270+76 logical theo token header, đáy giữ như cũ, cornerSVG trên đi cùng top mới. Hai lớp skin cũ transparent riêng compact, content/avatar/card/thống kê giữ vị trí. Biển tiêu đề nâng12px logical. Không áp dụng desktop/Tùy chỉnh/địa chỉ/Danh hiệu full/popover.4/4 profile-logout/rank-sync PASS, typecheck/build PASS, dist index-DwMmE4YF.js xác nhận. Chưa browser QA trực quan. Quyền mở đúng skin/biển Hồ sơ mobile task này; khóa lại sau task.


- 2026-10-20: Đính chính theo ảnh/user: khung nâu phải bao toàn bộ bảng Thông tin, không bắt đầu từ2ôthống kê. Đã hoàn tác skin tách/lùi top346 ởlượt trước (hiểu nhầm yêu cầu), khôi phục nền/viền/corner đầy đủ. Nâng riêng PlayerInfoCard compact từ+8 sang-12px logical (~10px CSS lên so với trước), giữ avatar/biển đã nâng/kíchthước còn lại. Typecheck/build PASS, dist xácnhận bỏ --mobile-profile-panel-top và offset mới; chưa browserQA. Quy tắc này thay ghi chú tách khung ngay trước.


- 2026-10-20: Theo user, riêng Hồ sơ compact kéo profileScene từ238 lên506logical (=270header+170stats+66banner/gap) để nền avatar kéo xuống qua hàng2ô CờTướng/CờÚp; chỉ mobileProfilePanel thường, không Tùy chỉnh/địa chỉ/desktop. Nâng card tên/Elo thêm8logical: compact translate-12→-20. PlayerInfoCard mobileExpanded tăng nhãn Bạn bè/Theo dõi/Lượt thích/Địa chỉ19→22logical; số22 giữ cùng cỡnhãn; ID15→19 và sánghơn. Giữ khung nâu bao toàn bảng/geometryavatar. Typecheck/build PASS, dist xácnhận; chưa browserQA, không thêmtest typography.


- 2026-10-20: Theo user chỉnh Hồ sơ mobile: profileScene ngắn lại506→302 logical tới mép trên stats sau nới, mask gradient đen65%→transparent100% hòa vào nền nâu. Stats giữ khungdòng170 và mépdưới, mỗi card cao thêm28logical rồi translateY-28 (tổng198) với gridrow minmax0 để không đẩy nội dung; khoảngtrống phía trên sau cardinfo đủ32logical. Danh hiệu tiêu đề/Chưa có danh hiệu24→30, Sở hữu22→28 và số1em đi cùng. Chỉ compact, desktop/Tùy chỉnh khôngđổi. Typecheck/build PASS, dist xácnhận gradient/neođáy/chữ; chưa browserQA, không thêmtest style.


- 2026-10-20: Theo ảnh user, thanh tiện ích Home mobile theo thứ tự Xếp hạng → Lịch sử → Bạn bè → Chat → Cửa hàng → Cài đặt → Toàn màn hình. Tái sử dụng HomeIcon/homeUtilityButton và home.fullscreen, chia 7 cột, nút co theo 11cqw tối đa48px. Chỉ mobile. Regression mobile-home 1/1 PASS, typecheck/build PASS; chưa browser QA.


- 2026-10-20: User bỏ Toàn màn hình riêng điện thoại; Home mobile còn 6 nút Xếp hạng → Lịch sử → Bạn bè → Chat → Cửa hàng → Cài đặt, chia đều 6 cột. Từ đây các yêu cầu UI hiện tại chỉ sửa mobile, giữ nguyên laptop. Không sửa component/hành vi desktop. Mobile-home 1/1 PASS; typecheck/build PASS, dist index-cbOcM9Cr.js cập nhật; chưa browser QA.

