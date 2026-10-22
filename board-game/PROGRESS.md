# Tiến độ

- 2026-10-22: Theo ảnh user, dịch thêm cụm Elo trong các hàng Xếp hạng mobile từ12 lên24px theo scale dialog, tạo khoảng trống hiển thị tên. Laptop giữ nguyên. `npm.cmd run build` (typecheck + Vite) PASS; dist/assets/index-9hjkmlPq.js/index-CcYwxfLn.css cập nhật. Chưa browser QA.

- 2026-10-22: User mở lại đúng phần Lịch sử mobile cho task này: tab Đã chơi/Đã lưu dùng cùng khung kích thước 264×70 phóng1.4× như Cờ Tướng/Cờ Úp ở Xếp hạng; thu avatar hàng64→48, bảng tên50→38 và chữ24→19 để vừa 10 dòng. Laptop và các phần Lịch sử khác giữ nguyên; khóa lại sau task. `npm.cmd run build` (typecheck + Vite) PASS; dist `index-BTegBM5p.js`/`index-CcYwxfLn.css` cập nhật. Browser QA xác nhận preview mobile/empty state; chưa có dữ liệu lịch sử để kiểm tra hàng có nội dung.

- 2026-10-22: Theo user, căn lại nhãn cột Xếp hạng mobile cùng scale1.5× với hàng để thẳng trục; đẩy ô Elo thêm4px logic (tổng12px theo scale dialog) sang phải, chừa khoảng cho tên. Laptop giữ nguyên. `npm.cmd run build` (typecheck + Vite) PASS; dist/assets/index-BTegBM5p.js và index-CcYwxfLn.css cập nhật. Chưa browser QA.

- 2026-10-22: Theo user, riêng Xếp hạng mobile thu nội dung ô Elo còn1.35× (hàng vẫn1.5×), dịch sang phải8px theo scale dialog; nhãn cột tăng1.6×, hai tab Cờ Tướng/Cờ Úp tăng40%. Laptop giữ nguyên. `npm.cmd run build` (typecheck + Vite) PASS; dist/assets/index-UXL0NhtS.js và index-BxU7l-e1.css cập nhật. Chưa browser QA.

- 2026-10-22: Người dùng mở đúng phạm vi Lịch sử mobile cho task này: làm khung tiêu đề/panel cùng kích thước thiết kế với Bạn bè; danh sách Đã chơi/Đã lưu ván hiển thị10 hàng, phóng avatar/nội dung hàng và căn nút Xem lại vừa cột. Laptop giữ nguyên; khóa lại Lịch sử sau task. `npm.cmd run build` (typecheck + Vite) PASS; dist/assets/index-DtJaoLma.js và index-DV1hfDRX.css xác nhận. Chưa browser QA với dữ liệu có ván lịch sử.

- 2026-10-22: Theo user, tăng riêng nội dung hàng Xếp hạng mobile1.35→1.5×; phóng đồng bộ avatar/huy hiệu top1–4/tên/điểm/thao tác trong 6 dòng. Laptop giữ nguyên. `npm.cmd run build` (typecheck + Vite) PASS; dist/assets/index-BQxR6PWu.js cập nhật. Chưa browser QA.

- 2026-10-22: Theo user, phóng thêm hai tab Cờ Tướng/Cờ Úp trên mobile lên25% tổng, hàng tiêu đề Hạng/Người chơi/Điểm/Thao tác lên cùng tỷ lệ nội dung1.35×. Desktop và hàng user không đổi. `npm.cmd run build` (typecheck + Vite) PASS; dist/assets/index-SNW6tQUN.js/index-DIyOyN7D.css cập nhật. Chưa browser QA.

- 2026-10-22: Xếp hạng mobile còn khoảng6 nick; tăng biển tiêu đề và hai tab Cờ Tướng/Cờ Úp12%. Dock Home mobile phóng6 nút tiện ích11→12.5cqw, nhãn3.2→3.6cqw. Laptop giữ nguyên. `npm.cmd run build` (typecheck + Vite) PASS; dist/assets/index-DemwOyFf.js và index-DMYd12Hr.css cập nhật. Chưa browser QA.

- 2026-10-22: Hồ sơ người khác trên điện thoại đổi lưới nút thao tác thành2 cột ×3 hàng; mỗi nút tự rộng/cao hơn theo cột. Laptop giữ3×2. `npm.cmd run build` (typecheck + Vite) PASS; dist/assets/index-DhqcEtDc.js và index-B46XJKYK.css cập nhật. Chưa browser QA trực quan.

- 2026-10-22: Đính chính Xếp hạng mobile: giữ nội dung mỗi hàng tăng1.35×, mỗi tab hiện khoảng7 người trước khi cuộn; desktop giữ nguyên, bố cục khóa lại sau task. `npm.cmd run build` (typecheck + Vite) PASS; dist/assets/index-D5ZBC3VS.js và index-B46XJKYK.css cập nhật. Chưa browser QA.

- 2026-10-22: Theo ảnh user, tăng riêng EnergyNotice mobile cao thêm36px qua compact:pt-16 (28→64px), chừa ô năng lượng góc trái không đè tiêu đề Bạn đã hết năng lượng. Desktop/font/nút/countdown giữ nguyên. npm.cmd run build(typecheck+Vite) PASS; dist index-BaKval5f.js/index-B97yIm95.css xác nhận compact padding mới. Chưa browser QA.

- 2026-10-22: Hoàn thiện CD Local cho cotuong_deploy: workflow chặn useradmin/IdentitiesOnly, upload/state/lock/log home deploy0700; sudoers đúng5command cố định. Script thêm --check/quyền/runtime nonroot, publish và rollback rsync giữ ACL đích, xử lý private source/readability và timestamp thư mục khácowner. docs/DEPLOY-USER.md có lệnh ACL/probe/visudo/preflight/secret/hoàn tác để user tự review/chạy.9deploy fixture +25adapter tests PASS, Bashscript và workflowrunblocks syntax PASS, npm.cmd run build(typecheck+Vite)PASS, dist cập nhật. Chưa SSH/cấpACL/sudoers/restart/push/deploy production; chưa chạy CI cho thay đổi mới. Trạng thái SSHkey/CI cũ/adapter thật PASS là user báo, không phải nghiệm thu từ agent.

- 2026-10-22: Nối bút vàng cuối tên PlayerInfoCard với form đổi tên ở ProfileDialog. Chỉ own+linked+chưa renamed; Guest/người khác/đã đổi không có bút. Account API /name qua useProfilePersistence, giữ backend xác thực/đổi một lần; tải lại account/dữ liệu sau lưu. Profile/logout/rank-sync/user-repository6/6 PASS ngoài sandbox (sandbox ENOENT cache), npm.cmd run build PASS (typecheck + Vite), dist index-BV9Q8CC2.js/index-DSFkeNWZ.css xác nhận form/bút. Chưa Google/browser QA thật.

- 2026-10-22: Sửa viền dưới hình trong popup Năng lượng bị cắt do crop chung245px: Video/gói100 mở tới598, vô hạn tới587 (trước dòng trắng y588). Dùng iconHeight riêng, giữ tỷ lệ hình/font giá/kích thước bảng. npm.cmd run build PASS (typecheck + Vite); dist index-D1cPjFk8.js xác nhận268/257. Đọc pixel nguồn xác nhận mốc chữ trắng; chưa browser QA.

- 2026-10-22: Sửa font giá popup Năng lượng mobile về font-number/lining/tabular, căn giữa/không nghiêng. Thu crop hình300×260→300×245 để loại mảnh chữ trắng từ dòng mô tả nguồn phía dưới. npm.cmd run build PASS (typecheck + Vite); dist index-BxuKHyGO.js xác nhận crop/font mới. Chưa browser QA.

- 2026-10-22: Popup mua Năng lượng mobile portrait dùng cùng width/height/scale với bảng Thông tin qua useProfileLayout. Tách3 gói thành3 hàng, dùng title/icon từ artwork hiện có bằng CSS crop giữ tỷ lệ và tăng chữ/nút theo cqw; không kéo méo ảnh ngang. Giữ desktop/landscape và hành vi dấu cộng/mua chưa tích hợp. npm.cmd run build PASS (typecheck + Vite); dist index-Dre2-l97.js/index-CZDIQFx_.css xác nhận kích thước/nội dung mới. Chưa browser QA vì CUA getState timeout.

- 2026-10-22: Theo user, phóng popup Năng lượng trên compact: width68→80vw và giới hạn980→1160px; artwork toàn bảng, chữ, thẻ gói, nút/X cùng phóng theo tỷ lệ. Giữ laptop nguyên trạng và giữ vị trí vùng bấm theo phần trăm artwork. `npm.cmd run build` PASS (typecheck + Vite), dist/assets/index-YtUh_pyi.js và index-ILG9oWBn.css cập nhật, CSS xác nhận compact width mới; chưa browser QA.

- 2026-10-22: Home desktop/mobile: vùng năng lượng chỉ hiện tooltip hồi khi hover/pointer rời thì ẩn; bỏ mở EnergyDialog khi bấm vùng tài nguyên, dấu cộng vẫn mở bảng mua. `npm.cmd run build` PASS (typecheck + Vite), dist/assets/index-2fzsgG7d.js và index-CIUvd5av.css cập nhật; chưa browser QA.

- 2026-10-21: Theo user, thu gọn mép dưới panel chứa6 thẻ sát hơn hàng3 nút dưới: compact padding-bottom5→2px, giữ mốc trên/padding-top5px/gap5px; desktop trở về gap/padding gốc. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-c1oubDLS.js và index-BK9uHN6D.css cập nhật, CSS xác nhận padding/gap compact.

- 2026-10-21: Căn khung tên/đồng hồ mobile: trên chung mép trái, dưới chung mép phải bằng margin h2 theo mobileEdge. npm.cmd run build PASS (typecheck + Vite); dist cập nhật, chưa browser QA.

- 2026-10-21: Sửa user dưới mobile: đưa đồng hồ trở lại ngay dưới tên trong identity cạnh avatar, cùngrow1; Like tách bên trái/cách8px. Bỏ hàngclock cũ phía trên. 4/4 PlayerCard identity tests PASS; npm.cmd run build PASS (typecheck + Vite), dist cập nhật. Chưa browser QA.

- 2026-10-21: Theo đính chính user, khôi phục name38px và Elo text-2xl; chỉ giữ Bạn bè/Theo dõi/Lượt thích cùng tim24px trên compact. npm.cmd run build PASS; dist index-BO2Bxeid.js/index-B92OzvWo.css cập nhật, xác nhận class24px. Chưa browser QA.

- 2026-10-21: Theo ảnh user, tăng chiều cao hai thẻ Cờ Tướng/Cờ Úp trong popup Hồ sơ compact thêm5px (height extra16→21px), giữ neo mép trên và translate -16px. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-H1kgT4Xt.js và index-CyWNK39n.css cập nhật, CSS có height calc 100% +21px. Chưa browser QA.

- 2026-10-21: Khôi phục đi quân online400ms qua useOnlineMoveAnimation; nguyên nhân useGame hardcode animation:null khi online. Chỉ snapshot tiến1 nước với quân nguồn/đích hợp lệ mới animate, giữ timer qua ack/clock duplicate và bỏ latejoin/undo/roomchange/gap. 4/4 hook/Board animation tests PASS ngoài sandbox (sandbox lỗi cache ENOENT); npm.cmd run build PASS (typecheck + Vite), dist cập nhật. Chưa browser QA.

- 2026-10-21: Không thưởng vàng cho bạn bè accepted hoặc cặp qua Mời chơi/So tài. MatchRepository chốt gold_reward_eligible ở start, end kiểm thêm bạn bè; không bật lại vàng khi unfriend giữa ván và không loại người thay ghế. Giữ Elo/stat/energy. Migration006 đã apply1 bước local và db:verify PASS. Policy/challenge/migration16/16 PASS ngoài sandbox (sandbox lỗi cache ENOENT); typecheck/build PASS, dist cập nhật. Chưa QA đấu tài khoản thật; backend cần nạp code mới, môi trường khác cần migration006.

- 2026-10-21: Đính chính theo user: bỏ dịch chuyển, chỉ tăng cỡ nội dung PlayerInfoCard compact — name42px, số Elo28px, phần Bạn bè/Theo dõi/Lượt thích24px, tim24px. Hồ sơ và Tùy chỉnh avatar dùng chung; khung/vị trí/ảnh giữ nguyên. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-DC794xzT.js và index-BNvbRgUR.css cập nhật, CSS xác nhận cỡ chữ mới. Chưa browser QA.

- 2026-10-21: Thay mã phòng mẫu bằng code6 chữ số do server cấp, không trùng phòng đang sống; snapshot/list/create cùng code, giữ qua reset. GamePage desktop/mobile cùng đọc snapshot, ẩn khi không có phòng thật. 25/25 rooms tests PASS; npm.cmd run build PASS (typecheck + Vite), dist cập nhật. Cần backend bản mới/phòng mới để nhận code; chưa browser QA.

- 2026-10-21: Đồng bộ ba nút trong menu ba gạch về44×44px như Chat/Lưu/Menu bên ngoài. npm.cmd run build PASS (typecheck + Vite); dist cập nhật, chưa browser QA.

- 2026-10-21: GamePage mobile: hạ riêng hàng Lưu/Chat/Menu thêm6px, top70→76px; mã phòng giữ nguyên. npm.cmd run build PASS (typecheck + Vite); dist xác nhận top76px. Chưa browser QA.

- 2026-10-21: GamePage mobile: mã phòng và ba nút hạ6px, chữ mã phòng18→16px; icon View24×18→28×21px; user dưới bottom20→14px. npm.cmd run build PASS (typecheck + Vite); dist xác nhận các token mới. Chưa browser QA.

- 2026-10-21: Hủy khóa orientation/tự fullscreen theo user; GamePage mobile hiện khung mã phòng trên hàng Lưu/Chat/Menu ở top64px. Chat ép44px/icon32px bằng hai nút cạnh, giữ portal và gap chung. npm.cmd run build PASS (typecheck + Vite), dist xác nhận top64/Chat44/khung mã phòng và đã gỡ portrait lock. Chưa browser QA.

- 2026-10-21: Đính chính đúng đối tượng theo user: hoàn tác nâng biển danh hiệu, thay bằng nâng cả khung thông tin nâu cạnh avatar trong popup compact thêm8px (`translateY -20→-28`); nội dung name/Elo/địa chỉ đi cùng card, không đổi avatar/nameplate trong trận. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-KC-PIwOy.js và index-OA4nP8d-.css cập nhật, CSS có offset mới.

- 2026-10-21: Theo user chỉ định rõ, nâng riêng khung danh hiệu dưới avatar trong popup Thông tin compact8px; không dịch name/Elo/địa chỉ hoặc avatar, cũng không đổi nameplate trong trận. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-lKMQ4Zv9.js và index-CHETN6-h.css cập nhật, CSS xác nhận offset compact8px. Chưa browser QA.

- 2026-10-21: Thay overlay hướng dẫn bằng yêu cầu Screen Orientation API khóa portrait khi chạm trên điện thoại; nếu API cần fullscreen thì app vào fullscreen rồi thử khóa lại. Không có fallback giả khóa. Build/typecheck sẽ chạy; chưa QA trên thiết bị thật.

- 2026-10-21: Theo user đính chính, hoàn tác offset nâng khung tên PlayerCard trong trận và biển danh hiệu (“Kỳ Thánh”) trong popup Thông tin; khôi phục vị trí gốc, không tác động name/Elo/địa chỉ hay avatar. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-BnUV2qxW.js và index-asvbPeSu.css cập nhật. Chưa browser QA.
- 2026-10-21: Chat mobile portal icon và panel ra document.body để cố định viewport; giữ desktop chat tại chỗ. Nameplate mobile nâng8px. Rời phòng trực tiếp không confirm; Like27px/icon17px ngang clock, cách8px; clock giữ viền CSS riêng. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-CStDedDG.js và index-CHETN6-h.css cập nhật. Chưa browser QA.
- 2026-10-21: Thu huy hiệu con mắt/số của Danh Hiệu Phong Tặng trong catalog còn90% và dịch xuống5px; badge preview hồ sơ giữ nguyên. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-piqSKSEo.js và index-B5cj75ga.css xác nhận class điều chỉnh. Chưa browser QA.
- 2026-10-21: Hoàn tác thay đổi hình cúp Home theo yêu cầu: dùng lại emoji 🏆 tại vị trí hiện hành, cỡ17cqw desktop/15cqw mobile; bỏ ảnh PNG render Windows và TournamentCup. Các thay đổi Home khác được giữ nguyên. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-MFrY0U3B.js không còn phụ thuộc ảnh cúp mới. Chưa browser QA.
- 2026-10-21: Cố định 3 nút mobile top18px theo mép frame avatar, không đo theo người vào. View ở góc trái bottom130px; Hoàn tác/Cầu hòa/Xin thua căn giữa theo khung tên/Elo người dưới, sát bên trái bằng ResizeObserver, đặt absolute trong main để tránh lệch Android. Menu mở xuống dưới. Laptop giữ nguyên. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-14k7NGUZ.js xác nhận CSS neo theo identity và bottom130px. Browser preview390×844 và360×800 từ lượt trước; chưa QA lại layout mới trên thiết bị/preview.
- 2026-10-21: Căn mép trên hàng nút mobile với avatar bằng phép đo local đã hiệu chỉnh scaleY của scene; đo lại sau transition/animation, header align-items:start. Typecheck/build PASS; dist/assets/index-CUN-BrYH.js cập nhật. Chưa browser QA.
- 2026-10-21: Sửa đúng thứ tự mobile: trái→phải Lưu, Chat, menu ba gạch ngoài cùng bên phải; hàng nút căn theo mép trên thực tế avatar qua ResizeObserver. Laptop giữ nguyên. Typecheck/build PASS; dist cập nhật. Chưa browser QA.
- 2026-10-21: Vì offset cố định chưa căn trực quan, hàng menu/chat/lưu mobile giờ neo theo mép trên thực tế avatar trên cùng qua ResizeObserver/--mobile-avatar-top; Lưu vẫn nằm ngoài panel menu. Typecheck/build PASS; dist/assets/index-DNdsMcFJ.js cập nhật. Chưa browser QA.
- 2026-10-21: Căn hàng menu/chat/lưu mobile ở right10px/top15px, ngang mép trên avatar; Lưu để ngoài panel menu. Typecheck/build PASS; dist/assets/index-B99l4pMR.js cập nhật. Chưa browser QA.
- 2026-10-21: Theo ảnh user: chuyển 3 nút menu/chat/lưu lên góc trên phải; cụm Hoàn tác/Cầu hòa/Xin thua thay vị trí cũ của chúng ở góc dưới trái; View giữ phía dưới bên phải. Chỉ compact; laptop giữ nguyên. Typecheck/build PASS, dist/assets/index-DSbZn0Qr.js cập nhật; chưa browser QA.
- 2026-10-21: Theo yêu cầu mới trên mobile, nâng cụm tiện ích trái lên bottom80px; chuyển View xuống bottom70px và cụm Hoàn tác/Cầu hòa/Xin thua xuống bottom10px cùng mép phải. Cụm thao tác được portal ra document.body; desktop vẫn render tại chỗ, giữ bố cục. Typecheck/build PASS; dist/assets/index-DI4vWSdW.js cập nhật. Chưa browser QA.
- 2026-10-21: Chỉ chỉnh điện thoại: đồng hồ thay Elo trong hàng nhận diện; đối thủ ở trên, người chơi ở dưới. View top safe-area +5px; cụm Hoàn tác/Cầu hòa/Xin thua cùng mép phải portal ra document.body để không bị lớp transform kéo xuống; top safe-area +36px, right10px, z-index250. Desktop giữ tại chỗ. Build/typecheck PASS, dist/assets/index-DKwxUmAd.js cập nhật; chưa browser QA. Laptop giữ bố cục gốc. Biểu cảm online chỉ hiện lúc đang đấu và được dọn khi ván dừng; kết quả rời phòng không hiện mặt vui/khóc. PlayerCard3/3 + result-faces5/5 + computer-isolation4/4 PASS trước lượt đổi vị trí; npm run build PASS, dist/assets/index-CjsQ8GKO.js cập nhật; chưa browser QA trực quan.

- 2026-10-21: Sửa 2 test fail GitHub Ubuntu: UI test chọn nút `#backButton` bằng role/scope vì có hai nút Rời phòng responsive; route test trước build thiếu `dist/index.html`, thêm `staticDirectory` injection cho app và temp HTML fixture, route production mặc định vẫn dùng dist. UI+route liên quan26/26 PASS; full Local381 PASS/17 SKIP/398 total; 17 DB integration chạy riêng MySQL tạm17/17 PASS; typecheck/build PASS. 6 test Pikafish skip trên Ubuntu do chỉ cài binary Windows. CI dùng checkout@v7/setup-node@v7 (action runtime24, project Node22). Chưa push, chờ GitHub xác nhận; chưa merge/deploy.

- 2026-10-16: Google Sign-In thật bằng GIS popup + google-auth-library verifyIdToken/audience GOOGLE_CLIENT_ID/nonce một lần. Migration004 thêm google_sub unique ascii_bin và session_expires_at, đã apply1 bước trên cotuong;001–003 không sửa. Guest link transaction giữ users.id/public ID/dữ liệu; Google cũ login lại; conflict409 không merge, revoke device hash user link. Session mới30 ngày hash DB/cookie HttpOnly, Socket.IO dùng auth hiện có. Client dùng VITE_GOOGLE_CLIENT_ID cùng ID backend, không Client Secret/token log/localStorage. Tests30/30 + MySQL tạm9/9 PASS; typecheck/build PASS, dist cập nhật; chưa Google popup QA thật vì Client ID chưa điền. Hướng dẫn/file/phạm vi: docs/GOOGLE-SIGN-IN.md.

- 2026-10-16: Hồ sơ chính mình mở ngoài nút hồ sơ Home chỉ có Thoát bên phải, không Kết bạn/Đăng xuất. ProfileDialog tách accountActions khỏi own identity; nhận diện mình theo session name nếu caller không chỉ định; Chọn Bàn tắt accountActions. Home giữ Liên kết/Đăng xuất. Regression footer2/2 PASS, typecheck/build PASS; dist xác nhận, chưa browser QA.

- 2026-10-16: Ghế online trống không render PlayerCard (không avatar/khung/tên/Elo giả). Người ngồi dùng hồ sơ thật cho portrait/frame/displayName/Elo qua PlayerCard chung; giữ geometry/avatar sizes. RoomPlayer.userId tùy chọn do server gắn từ identity khi publish, không dùng socket id làm DB user_id; hook fallback tìm tên cho snapshot legacy. Regression identity/wait3/3 PASS, typecheck/build PASS; dist cập nhật, chưa browser QA.

- 2026-10-16: Chơi nhanh/Đấu ở Home hết đối thủ thì tạo bàn online10 phút/60s mỗi nước theo tỉnh hồ sơ và join chờ một mình, không fallback máy. Chơi với máy/Cờ Úp riêng giữ nguyên; Chọn Bàn hết phòng vẫn mở Tạo bàn. Regression3/3 PASS, typecheck/build PASS; dist xác nhận, chưa browser QA.

- 2026-10-16: Hàng hội thoại luôn giữ dòng preview cao tối thiểu20px responsive khi rỗng, nên icon nhóm/tên không tụt giữa. Tải list/social/messages đã biết ID song song, read/member không chặn hiển thị; polling1s thay4s, không chồng poll. Tự chọn hội thoại đầu khi selection cũ không còn. Spinner giữa dialog khi tải đầu/chuyển hội thoại/gửi/tạo nhóm; chặn gửi/tạo lặp trong lúc chờ. Giữ avatar/geometry. Typecheck/build PASS, dist xác nhận; chưa browser QA hoặc đo latency thực tế.

- 2026-10-16: Theo yêu cầu giữ hàng hội thoại căn trái như ảnh: button full width/justify-start, thông tin text-left và overflow-hidden, preview min-w-0/justify-start để nội dung dài không đẩy cụm avatar/tên. Giữ kích thước/vị trí avatar và khung. Typecheck/build PASS; dist xác nhận class mới, chưa browser QA.

- 2026-10-16: Sửa tạo nhóm chỉ có chủ nhóm: PersistenceService cho phép members rỗng khi có title; chat trực tiếp vẫn cần đúng1 người khác. Repository tự thêm chủ nhóm role owner. UI giữ nguyên, lỗi tạo nhóm hiện lý do API. Regression validation1/1 và MySQL tạm integration7/7 PASS; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-16: Người dùng hoàn tác lần thu nhỏ tên18; PlayerNameplate trở về font24 theo tỷ lệ chiều rộng như trước. Chưa sửa quy tắc tên hoặc tìm phương án khác. Typecheck/build PASS, dist đã khôi phục; chưa browser QA.

- 2026-10-16: Sửa VN thành SVG cờ thật và căn giữa hàng địa chỉ; bộ cờ local đủ mọi quốc gia chọn được, giữ LICENSE/source. Sửa proxy5173 giữ Host để tránh403 và lỗi đăng nhập hiện chi tiết backend.11/11 test country/entry/logout PASS; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-16: Đã nối MySQL thật user/profile/Guest cookie, Elo riêng variant, resources/ledger, PvP history/replay, saved, social, chat và honors;002/003 apply trên cotuong,001 giữ nguyên. DB check/migrate rerun0/verify/smoke PASS; test chọn34/34 PASS; full suite --maxWorkers=4:236 PASS/52 FAIL baseline, integration riêng MySQL8.0.45 tạm (xem báo cáo cuối). Không xóa dữ liệu cũ, không import fixture hoặc fake Google; runtime vẫn RAM. Chi tiết file/API/giới hạn tại docs/MYSQL-INTEGRATION.md.

- 2026-10-16: Thêm chọn quốc gia trong địa chỉ hồ sơ; Việt Nam chọn tỉnh/phường như cũ, nước khác lưu quốc gia. Lưu thành công khóa cả quốc gia/địa chỉ, bút thành cờ. localStorage theo Guest hiện hành, chưa MySQL. Test khóa/persistence1/1 PASS; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-16: Hoàn tất foundation MySQL 19 bảng + journal, CLI migrate/verify/smoke, UserRepository/UserService Guest và rename có điều kiện. MySQL tạm 8.0.45: migrate21/rerun0, FK/index/CHECK và smoke rollback PASS. Test chọn16/16 PASS; full suite233 PASS/52 FAIL trong8 file ngoài DB. Typecheck/build PASS, dist frontend giữ nguyên. Chưa chạy cotuong:3306 vì chưa .env; xem docs/MYSQL-FOUNDATION.md. TODO auth/entry, transaction stats/resources/Elo/matches, chuyển persistence và seed honors.

- 2026-10-14: Hover Lùi/Tiến đổi vàng nhạt8%, bỏ transition để hiện ngay. Typecheck/build PASS, dist cập nhật.

- 2026-10-14: Bỏ viền focus Máy đi; Lùi/Tiến khả dụng hover trắng nhẹ10%, disabled vẫn mờ/không hover. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Lùi trial theo cặp người/máy (1 nước khi chưa có phản hồi, 2 sau máy đáp), nối nút và ←; replay gốc giữ nguyên. 2/2 test hook gồm regression lùi1/lùi2 PASS, typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Sửa dim Lùi/Tiến bằng crop img riêng/brightness0.35, Máy đi render img riêng thay background atlas. Giữ glow/scale. Typecheck/build PASS, dist có3 asset crop; đã xem asset robot, chưa browser QA.

- 2026-10-14: Tăng nổi bật Máy đi bật theo ảnh mẫu: viền vàng2px, glow vàng/cam, sáng125%, scale1.03. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Hoàn tác UI trial240→220px, chữ20→17px, giữ hiệu ứng active Máy đi và toàn bộ logic/phím tắt/search1s. Typecheck/build PASS, dist cập nhật.

- 2026-10-14: Bỏ dòng Pikafish đang tính, trial cấp10 tính1s qua thinkMs1000; server validate override, giữ profile các luồng khác. 2/2 hook test PASS, typecheck/build PASS, dist cập nhật; chưa engine/browser QA trực tiếp.

- 2026-10-14: Nới trial controls240px, giãn nút theo tỷ lệ, chữ Máy đi20px; active scale1.02/viền vàng1px/glow nhẹ. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Hoàn tác UI nới244px/dim/glow trial về bản220px trước đó, giữ phím tắt. Typecheck/build PASS, dist cập nhật.

- 2026-10-14: Nới trial controls244px, dim Lùi/Tiến theo khả dụng, Máy đi active phóng nhẹ/glow vàng. Thêm phím trial ←/→/↑/↓/Enter, giữ Enter replay và Space chuyển bàn; chặn vượt biên/ô nhập/dialog. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Thay cả khung/nút trial bằng cụm giữa ảnh4470bd4d (crop alpha937×525, nhãn máy động). Hai nút Phân tích/Gợi ý72px tách dưới gap10px. Typecheck/build PASS, dist cập nhật; đã xem asset crop, chưa browser QA.

- 2026-10-14: Thay Phân tích/Gợi ý bằng hai artwork dưới ảnh4470bd4d, crop323×300/324×296 góc alpha, kiểm tra ảnh cắt; đặt ngang trong ReplayControls trial. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Trial Máy đi dùng Pikafish cấp10 qua backend với FEN gốc/UCI nhánh; bỏ chooseComputerMove, thêm thinking/error/retry, abort phản hồi cũ và giữ animation. 2/2 test hook (mock API, xác nhận level/FEN/UCI) PASS, typecheck/build PASS, dist cập nhật. Chưa thử engine thật/browser trong nhiệm vụ này; Cờ Úp chưa hỗ trợ Pikafish.

- 2026-10-14: Giới hạn ghim replay: bàn chính Thế cờ ẩn, bàn thử và bàn chính Ván đấu hiện. Typecheck/build PASS, dist cập nhật.

- 2026-10-14: Ẩn Phát/Tua 0/0 của bàn gốc Thế cờ qua replayKind, giữ icon chuyển chế độ; bật ghim Lưu thế trong replay và trial. Giữ số nước gốc qua initialMoveCount khi lưu tiếp từ thế. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Tắt Máy đi mỗi lần chuyển replay/trial; thêm animation Board cho nước thử người/máy và khóa nước chồng. 2/2 regression nhánh/animation/máy/toggle PASS; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Gán Enter cho Phát/Tạm dừng replay, Space chuyển hai chế độ ngay cả khi nút focus; thêm tooltip/aria-keyshortcuts. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Đồng bộ gap hàng Thế cờ với Ván đấu5px responsive, giữ hai hàng; đưa scrollbar mảnh ra khoảng trống phải, track/corner trong suốt. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Thêm useReplayTrial độc lập cho nhánh thử tại snapshot replay; icon trái/Space chuyển chế độ, ReplayControls bên phải có lùi/reset/tiến, Máy đi toggle cơ bản, Phân tích/Gợi ý UI. Ván gốc và gameStore không đổi. 2/2 test nhánh/reset/redo/máy-hủy PASS; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Tăng icon đảo hướng replay64→84px desktop,40→52px compact. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Thêm icon0a700f7c đảo hướng bàn replay, tâm cột phải/tâm chiều cao bàn desktop; giữ user và dữ liệu. Asset crop alpha1242×1187, nguồn ghi riêng. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Căn mép phải Mở thế với thùng rác, thu cột thao tác còn151px responsive để cột thông tin giãn vào phần trống; bỏ offset5px. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Dịch cụm thông tin và nút Mở thế sang phải5px; giữ bàn mini/thùng rác. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Đưa thùng rác Thế cờ lên góc trên phải mỗi hàng. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Đồng bộ chiều rộng hàng Thế cờ với Ván đấu bằng bỏ gutter riêng; Mở thế dùng asset nút gỗ Xem lại, Xóa dùng thùng rác cùng style/kích thước, đặt ngang. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Phóng icon metadata/ghi chú Thế cờ24px và chấm lượt18px; tăng lề chữ ghi chú theo icon. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: vs gap17px; icon tờ báo cho số nước/ghi chú; bút ghi chú riêng góc phải, editor giữ nền hiện hành. Nút ghim lưu ngay không hỏi, xóa SavePositionDialog. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Avatar nhỏ Thế cờ28→34px theo yêu cầu; vs tách giữa hai cụm user, khoảng cách mỗi bên10px. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Sửa thứ tự hai người ở Thế cờ theo savedMatchSide: mình bên trái dù cầm Đen; người lạ đấu mặc định Đỏ trái. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Bỏ bóng mini Board Thế cờ qua prop shadow=false, gap nội dung10px, tên24px/font-black. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Phóng mini Board Thế cờ theo chiều cao hàng, chừa5px trên/dưới và giữ tỷ lệ; cột bàn đo theo viewport thay178px. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Áp dụng style ảnh mẫu cho hàng Thế cờ: giấy vàng, đường chia nâu, tên highlight/bút sửa, người đấu vs/avatar nhỏ, metadata/chấm lượt, ghi chú nền nhẹ cuộn riêng. Bút sửa tên/ghi chú lưu thật. Giữ Board dọc, hai hàng/modal/Ván đấu. Typecheck/build PASS, dist cập nhật; chưa QA browser trực tiếp.

- 2026-10-14: Luôn hiện Âm thanh/Toàn màn hình khi replay ván hoặc mở thế; GameTools dùng showMatchTools để chỉ ẩn các lệnh trận. Bỏ compact:hidden của Toàn màn hình trình chỉnh thế. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Hoàn thiện Đã lưu/Thế cờ: một hàng một thế, hai hàng trong viewport, mini Board thật, thông tin và ghi chú cuộn riêng; Mở thế chỉ đọc qua GamePage, Xóa localStorage. Theo bổ sung người dùng, nối nút ghim lưu snapshot/tên/ghi chú vào savedPositionsStore. Giữ kích thước modal và Ván đấu. Typecheck/build PASS; dist index-7-lGdWLL.js có store/list/dialog. Chưa browser QA trực tiếp.

- 2026-10-14: Bỏ thanh chú thích cuối Lịch sử, mở rộng vùng danh sách; Đã chơi thêm một dòng mẫu thành 8 dòng, hỗ trợ cuộn; Đã lưu dùng vùng trống cho thêm hàng. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Đổi icon Lưu thế cờ thành cây ghim vàng trong PositionIcon; giữ thứ tự nút và hành vi. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Bỏ Camera trong GameTools, thứ tự Lưu ván/Lưu thế/Bạn bè/Âm thanh/Toàn màn hình; icon Lưu thế dạng bàn cờ, bấm báo đang phát triển. Giữ điều kiện Lưu ván. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-14: Siết nhận bản lưu online: mới vào giữa ván không lấy archive cũ, chờ kết thúc; giữ ván 1 đã nhận trong lúc ván 2 đang đấu, hết ván 2 thay mục tiêu Lưu. 4/4 test hook/RoomService PASS; typecheck/build PASS, dist cập nhật. Chưa QA nhiều trình duyệt.

- 2026-10-14: Sửa thiếu nối leftSide vào hai Player của hàng Đã lưu: chủ danh sách ở trái ở cả hai phe, đảo biểu tượng và giữ kết quả tương ứng. Regression DOM hai phe + lưu/perspective: 5/5 PASS; typecheck/build PASS, dist cập nhật. Chưa QA browser trực tiếp.

- 2026-10-13: Vị trí tùy chỉnh: đặt/di chuyển sai vị trí báo lỗi rồi bỏ chọn quân. Kéo trực tiếp từ khay hoặc từ bàn mà không cần bấm chọn; thả trong bàn đặt vào giao điểm gần nhất theo hướng bàn và luật hiện hành, thả quân trên bàn ra ngoài thì xóa; thả quân khay ngoài bàn không thêm quân. Pointer cancel không xóa; click sau kéo bị chặn. Chỉ áp dụng trình chỉnh thế. 11/11 test chỉnh thế/FEN PASS; typecheck/build PASS, dist cập nhật; chưa QA browser kéo thả trực tiếp.

- 2026-10-13: Bỏ nhãn hiện Đổi bên; khay quân desktop căn giữa chiều dọc vùng từ dưới hàng tiện ích đến mép dưới. Tạo bàn cờ từ ảnh chỉ hiện Đang trong quá trình phát triển, chưa mở chọn ảnh.

- 2026-10-13: Đổi nút Lưu Vị trí tùy chỉnh sang icon đĩa mềm nét viền vàng, chữ Lưu bên dưới theo mẫu. Build/typecheck PASS; dist index-CVkcW6Od.js có icon mới. Chưa QA browser trực tiếp.

- 2026-10-13: Siết luật đặt quân Vị trí tùy chỉnh: giới hạn mỗi bên1 Tướng/2 Sĩ/2 Tượng/2 Mã/2 Xe/2 Pháo/5 Tốt; hết quân thì nút khay mờ/disabled và tự bỏ chọn quân cuối. Chặn ô sai của Tướng/Sĩ/Tượng/Tốt, Tướng đối mặt ngay lúc đặt/di chuyển. 10/10 test liên quan PASS; typecheck/build PASS; dist/assets/index-BM4Q0ywa.js có logic giới hạn và kiểm tra ô. Chưa QA browser trực tiếp.

- 2026-10-13: Bỏ drop-shadow riêng14 quân trong khay Vị trí tùy chỉnh qua prop shadow=false; quân trên bàn giữ nguyên. Typecheck/build PASS, xác nhận bundle dist có shadow=false; chưa QA browser trực tiếp lần tinh chỉnh này.

- 2026-10-13: Hoàn thiện Vị trí tùy chỉnh từ màn máy: khay14 loại quân bên phải/gap10px/không cuộn khay, chỉ Xóa quân/Cài lại với icon; header Lưu/Tạo từ ảnh, nút gỗ Sẵn sàng đổi chữ Đấu ngay. Xếp/di chuyển/xóa/reset/lưu FEN/đọc ảnh cục bộ/đấu Pikafish đúng thế và chơi lại thế gốc. Server xác thực FEN+lịch sử, không tác động online. Sửa nhận nhầm nút ảnh trước: ẩn Hoàn nước của máy, khôi phục Sẵn sàng sau ván. 27/27 test liên quan PASS, typecheck/build PASS; dist index-BoZjm0Gr.js có custom-position-start-iJLbhod-.png. QA headless1280×720 xác nhận14 nút, scroll=false, gap10; ảnh khai cuộc nhận đúng32 quân/FEN. Đã xem compact390px, xử lý overflow ngang; chưa thử điện thoại thật/ảnh bộ quân khác.

- 2026-10-13: Ẩn nút giữa bàn sau khi ván đấu với máy kết thúc; giữ nguyên nút ở local/online hai người và tự bắt đầu Pikafish. Build PASS, dist cập nhật; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Nới tiếp Luyện cờ thêm30px mỗi bên (width1268px), giữ tỷ lệ/căn giữa và fit màn. Typecheck/build PASS, dist cập nhật.

- 2026-10-13: Nới banner Luyện cờ thêm30px mỗi bên, giữ căn giữa/tỷ lệ. Typecheck/build PASS, dist cập nhật.

- 2026-10-13: Thay banner Cờ thế bằng ảnh Luyện cờ63e5f151, crop sát2132×348/góc alpha, giữ tỷ lệ và fit màn hình. Typecheck/build PASS, dist có banner mới; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Đổi nhãn Đấu lại về Sẵn sàng theo yêu cầu. Typecheck/build PASS, dist cập nhật.

- 2026-10-13: Ẩn Cầu hòa/Xin thua ở máy, giữ Đi lại; loại computer khỏi trạng thái bận mời chơi. Xác nhận máy không tạo phòng server và nhận lời mời chuyển sang phòng online. 19/19 test liên quan, typecheck/build PASS; dist cập nhật. Chưa QA trình duyệt trực tiếp.

- 2026-10-13: Tắt intro đối thủ/âm thanh intro khi start máy; ẩn đồng hồ và vòng xanh cả2 avatar trong mode computer. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Đối chiếu trực tiếp Chọn Bàn và áp dụng avatar45/33px, offset1px, gap12px và font tên24/18px cho Chơi với máy; bỏ overlay tối/shadow riêng. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Tăng avatar header Chơi với máy40→44px desktop/36→40px compact; tên giữ font-heading chính. Typecheck/build PASS, dist cập nhật.

- 2026-10-13: Bỏ dropdown máy, dùng Pikafish cố định; avatar/khung và tên thật ở header, tiện ích gap8px. Vào ván Pikafish tự bắt đầu, giữ khai cuộc1300ms; chơi lại ghi Đấu lại. Typecheck,7/7 test computer và build PASS; dist cập nhật. Chưa QA trình duyệt trực tiếp.

- 2026-10-13: Thêm MultiPV/xác suất10 cấp, bộ lọc nước hợp lệ và sai lầm quá nặng. Engine thật xác nhận depth1 đủ5 PV (64 nodes chỉ2); cấp1–3 depth1/2/3. 21/21 test liên quan PASS; typecheck PASS, kiểm tra lại7 test profile/candidate PASS. Giữ yêu cầu không build của tác vụ engine.

- 2026-10-13: Đọc UCI thật, thêm10 profile Pikafish và apply options có hỗ trợ trước search; giữ lựa chọn cấp trong session. Typecheck PASS; 15/15 test liên quan PASS (gồm engine thật cấp1/5/10, hủy request và lưu/truyền cấp). Không build theo yêu cầu task này.

- 2026-10-13: Hạ Cờ thế về vị trí cũ, giãn bảng giữa thêm82px; sửa footer đè cấp độ bằng flow dưới banner. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Bỏ tiêu đề Chơi với máy, dồn bảng và banner lên; căn baseline Cấp/số với font-heading/font-number. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Căn tâm quân Đỏ theo chiều ngang, tăng dịch phải từ 2 lên 4px theo scale bàn. Typecheck/build PASS, dist cập nhật.

- 2026-10-13: Hoàn tác lần thay bộ quân theo yêu cầu; ChessPiece và ảnh chụp dùng lại codo-coden-v2, giữ căn chỉnh quân Đỏ và quân úp hiện tại. Typecheck/build PASS, dist cập nhật.

- 2026-10-13: Thay khung Tạo bàn bằng ảnh72f80581 dùng chung với khung chọn tỉnh/thành; giữ field/nút bằng crop từ skin cũ, căn lại theo aspect mới. Ba asset crop đã làm alpha trong suốt ở góc. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Tăng tiêu đề chọn tỉnh/thành30→34px desktop,20→22px compact; giữ vị trí. Build PASS, dist cập nhật.

- 2026-10-13: Hoàn tác lần thu nhỏ bảng Tạo bàn theo yêu cầu; trở lại680px/73dvh. Build PASS, dist cập nhật.

- 2026-10-13: Thu nhỏ bảng Tạo bàn trong Chọn Bàn từ max680px/73dvh xuống620px/67dvh, giữ tỷ lệ và bố cục nội dung. Build PASS, dist cập nhật.

- 2026-10-13: Sửa presence theo tỉnh/thành đang chọn thay vì hồ sơ; chuyển nơi cập nhật server trực tiếp, reconnect giữ lựa chọn, rời màn gỡ presence. Hai regression hook/service PASS, typecheck/build PASS, dist cập nhật; chưa QA nhiều trình duyệt.

- 2026-10-13: Tăng icon thẻ tỉnh/thành lên ô26cqw/cao đầy thẻ, giữ tỷ lệ; tăng tên font-heading36px/7cqw và số liệu font-number28px/5.5cqw (lấy giá trị nhỏ hơn). Giữ4 dòng/gap8px. Typecheck/build PASS, ba thay đổi có trong dist; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Sửa thẻ chọn tỉnh/thành giãn đầy4 hàng, gap dọc8px theo phản hồi; artwork thẻ object-fill theo yêu cầu giãn, không còn khoảng trắng giữa slot và thẻ. Typecheck/build PASS, thay đổi có trong dist; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Thêm Bạn bè vào GameTools; thứ tự Chụp hình/Bạn bè/Âm thanh/Toàn màn hình. Mở FriendsDialog dùng chung, nối hồ sơ/nhắn tin hiện có; giữ geometry avatar và UI Bạn bè. Typecheck/build PASS, callback mới có trong dist; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Chọn tỉnh/thành chia viewport danh sách thành4 hàng, giữ2 cột desktop/1 cột compact, các hàng sau cuộn; thẻ giữ tỷ lệ gốc. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Thay riêng khung chọn tỉnh/thành về72f80581 (crop1369×953), giữ thẻ e05c67be. Căn hit area đóng theo X có sẵn, tránh chồng dấu X desktop. Typecheck/build PASS, dist chứa đúng cặp asset mới; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Nối Mời chơi Bạn bè vào challenge socket; khi đồng ý dùng phòng người gửi hoặc tạo mới nếu chưa có phòng, chuyển người nhận khỏi phòng cũ và phát snapshot phòng đích. Giữ UI Bạn bè đã khóa, kiểm tra bận và vai trò ghế/người xem. 8 test service/socket PASS, typecheck/build PASS, dist chứa luồng nút mới; chưa QA hai trình duyệt. Danh sách bạn bè vẫn mẫu, chỉ người online thật khớp tên mới nhận lời mời.

- 2026-10-13: Theo yêu cầu mở phạm vi avatar header Chọn Bàn trong task này: hạ1px, bấm mở hồ sơ hiện có; sau sửa khóa lại geometry. Đổi thứ tự tiện ích Cúp/Bạn bè/Loa, không đổi UI trong các popup. Typecheck/build PASS, callback và vị trí mới có trong dist; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Tách ảnh e05c67be thành khung1360×720/thẻ1066×187, crop sát alpha; thay artwork chọn tỉnh/thành, nội dung co theo thẻ và bổ sung SVG đóng. Typecheck/build PASS, asset mới có trong dist; đã xem ảnh crop, chưa QA trình duyệt trực tiếp.

- 2026-10-13: Ghép nhanh dùng chung chỉ chọn đúng1 người ngồi/chưa đấu; Chọn Bàn giữ lọc thời lượng và fallback Tạo bàn. Regression loại phòng0/2 người, không cộng viewers: 2 test PASS. Typecheck/build PASS, dist cập nhật.

- 2026-10-13: Thay hai artwork khung/thẻ chọn tỉnh/thành, crop sát và đối chiếu ảnh xuất; cập nhật tỷ lệ và nội dung vừa thẻ mới. Typecheck/build PASS, asset mới có trong dist, góc alpha trong suốt; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Căn X Tạo bàn theo tâm vòng tròn trên asset v2, giữ SVG vuông khi co giãn. Typecheck/build PASS, kiểm tra tọa độ mới có trong dist; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Kiểm tra Chơi nhanh Chọn Bàn đã lọc đúng thời lượng, vào thẳng phòng còn ghế/chưa đấu; chỉ mở Tạo bàn khi không có phòng phù hợp. Bổ sung regression chọn phòng theo thời lượng: 2 test PASS; typecheck/build PASS, dist cập nhật. Không đổi UI hoặc luồng Home.

- 2026-10-10: Sửa hàng chờ demo: xếp hàng cục bộ trước nước thứ3 sẽ thay Máy Đen, tiếp tục ván với Máy Đỏ; bỏ hàng thì không được vào. Build/typecheck PASS; dist/assets/index-BHNTZlV9.js.

- 2026-10-10: Nút Vô hàng/Thoát hàng có cursor pointer (disabled vẫn là wait); demo hai máy kết thúc sau3 nửa-nước với Đỏ thắng. Build/typecheck PASS; dist được cập nhật.

- 2026-10-10: Cho bấm bàn mẫu mở demo hai máy cơ bản tự đấu; người dùng xem, tên Máy Đỏ/Đen, thời gian theo bàn, không trừ năng lượng. Hủy timer khi rời. Build/typecheck PASS; chưa browser QA.

- 2026-10-10: Đổi con trỏ thẻ bàn thành pointer, kể cả bàn mẫu; giữ hành vi disabled. Build/typecheck PASS; xác nhận class pointer trong dist.

- 2026-10-10: Sửa nguyên nhân bàn không lớn và người còn xa: vùng hình78%, bàn theo chiều cao thực; người width:auto neo ngoài hai cạnh bàn3px. Build/typecheck PASS; xác nhận vị trí neo3px trong dist. Chưa browser QA.

- 2026-10-10: Phóng bàn trong thẻ từ46% lên50%, tăng vùng hình60% lên64%; hai người đặt trực tiếp hai bên với gap3px, slot trống giữ cân giữa. Build/typecheck PASS; dist được cập nhật.

- 2026-10-10: Xác nhận tie-break khi tổng người bằng nhau giữ thứ tự tạo phòng từ Map insertion order, nên phòng cũ xếp trước; ghi rõ trong component và tài liệu. Build/typecheck PASS; dist được cập nhật.

- 2026-10-10: Tăng bàn cờ từ42% lên46% vùng hình, đưa mỗi hình người22% áp sát bàn với gap3px; giữ cân giữa khi phòng chỉ có một người. Build/typecheck PASS; dist được cập nhật.

- 2026-10-10: Dành sẵn gutter ổn định cho thanh cuộn RoomTableGrid; thanh chỉ hiện khi nội dung tràn, giữ lưới đứng yên và sát mép trong bảng. Build/typecheck PASS; dist được cập nhật.

- 2026-10-10: Ưu tiên phòng có nhiều người nhất bằng cách sắp xếp giảm dần theo tổng người chơi và khán giả; các phòng bằng số giữ thứ tự API. Build/typecheck PASS; dist được cập nhật.

- 2026-10-10: Đặt huy hiệu mắt/số người bên ngoài hình bàn với khoảng cách5px; giữ nguyên tổng số người và tương tác vào phòng thật. Build/typecheck PASS; dist được cập nhật.

- 2026-10-10: Giữ thẻ phòng thật bấm vào để vào/xem đúng phòng; thêm icon mắt và tổng người (`players + viewerCount`) phía trên mỗi bàn. Bàn mẫu không gọi join. Build/typecheck PASS; dist được cập nhật.

- 2026-10-10: Nối tiện ích Chọn Bàn với hành vi Home: mở FriendsDialog/RankingDialog hiện hành và chia sẻ useHomeMusic; giữ icon, nút và bố cục. Typecheck/build PASS; dist/assets/index-B_Xwi7i7.js. Chưa browser QA.

- 2026-10-10: Ngăn lưới preview chớp/reset thanh cuộn mỗi lần polling5 giây: prop loading chỉ theo lần tải đầu (`isLoading`), không theo refetch nền (`isFetching`). Build/typecheck PASS; dist/assets/index-BHSLzXFi.js.

- 2026-10-10: Dịch màu thumb RoomTableGrid nhẹ từ xanh lá sang xanh ngọc #22c1a8; giữ alpha30%/45% hover và track trong suốt. Build/typecheck PASS; dist/assets/index-CGCQwMOp.css và index-Ggs-vNyW.js.

- 2026-10-10: Đổi thumb RoomTableGrid từ xanh lam sang xanh lá #22c55e và giảm alpha45→30% (hover65→45%); track vẫn trong suốt. Build/typecheck PASS; dist/assets/index-C4Km54L4.css và index-zbB2C4fL.js.

- 2026-10-10: RoomTableGrid hiện thanh cuộn mảnh màu xanh lam trong suốt nhẹ; track vẫn trong suốt, không có nền bao. Build/typecheck PASS; dist/assets/index-DRE5pXKI.css và index-cPOmqoSa.js.

- 2026-10-10: Tăng dữ liệu bàn mẫu xem thử từ12 lên22 để kiểm tra thanh cuộn; vẫn không gọi API/không đổi phòng thật. Build/typecheck PASS; dist/assets/index-DqMAj_hE.js.

- 2026-10-10: Bỏ ngoại lệ chủ phòng sau khi thua. Server luôn đưa người thua xuống cuối hàng và người đầu tiên đang xếp hàng lên ghế; xóa prompt đấu tiếp, creator identity/token và các field/protocol liên quan. Regression mục tiêu PASS (2); typecheck/build PASS, dist index-B51ZYaHX.js. Chưa browser QA.

- 2026-10-10: Ngoại lệ cho creator đấu tiếp từng được triển khai rồi bị gỡ theo yêu cầu mới nhất ở mục đầu tiến độ.

- 2026-10-10: Xác nhận luồng rời phòng: người đầu hàng chờ được đưa lên ghế ngay, không lấy người xem chưa xếp hàng; regression người đang chơi rời phòng PASS. Typecheck/build PASS; dist/assets/index-C8C6yh2k.js được tạo.


- 2026-10-10: Giữ phòng có khán giả dù không còn người chơi; thêm viewerCount riêng, không ảnh hưởng số ghế/icon. Chỉ lọc phòng hoàn toàn vắng; tránh preview giả khi bộ lọc không có kết quả. Regression mục tiêu PASS; build/typecheck PASS, dist index-C8FuL2u8.js. Bộ rooms.test đầy đủ còn7 lỗi ở các kiểm tra khác (chuỗi encoding và kỳ vọng chặn người thứ ba).

- 2026-10-10: Tab “Còn trống” chỉ lọc phòng đúng1 người đang ngồi (chưa vào ván), không tính khán giả; preview cũng lọc các bàn một người. Build/typecheck PASS; dist cập nhật index-DCsYFGJm.js.

- 2026-10-10: Ẩn phòng có 0 người chơi khỏi lưới Chọn Bàn; phòng có 1 người vẫn hiện và số người xem không ảnh hưởng. Dữ liệu xem thử cũng chỉ có phòng 1 hoặc 2 người. Build/typecheck PASS; dist cập nhật index-BNzCrpzv.js.

- 2026-10-10: Căn dấu đóng Tạo bàn bằng SVG đối xứng/grid center, giữ nguyên hit area. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-10: Thu hình bàn/người trong ô; bỏ tên “Bàn 1…”, thay bằng thời lượng + tên người ở ghế đầu. `RoomSummary.playerNames` lấy room.players theo thứ tự server, không gồm viewers; người còn lại tự lên đầu khi ghế đầu rời. Build/typecheck PASS; dist index-D9Ti5fS5.js. Chưa browser QA.

- 2026-10-10: Số phút trên nhãn bàn dùng font-number, lining/tabular numerals, căn baseline cạnh tên bàn font-heading. Build/typecheck PASS, dist cập nhật.

- 2026-10-10: Hai bàn mẫu đầu tiên hiển thị đủ2 người để xem bố cục icon hai bên; các mẫu còn lại giữ biến thể0/1/2. Build/typecheck PASS, dist cập nhật.

- 2026-10-10: Lưới xem thử đủ12 bàn thường, bỏ ô Tạo bàn và dòng Mẫu/số người; nhãn dùng font-heading cho chữ/số,20px/14px theo chữ Tạo bàn cũ. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-10: Thêm preview tạm thời11 bàn mẫu khi danh sách trống, cùng ô Tạo bàn đủ4×3; mẫu0/1/2 người và nhiều thời lượng. Không join bàn mẫu hoặc tăng số bàn thật. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-10: Thay hình bàn/ghế danh sách bằng hai asset mới, crop riêng alpha; RoomTableGrid4 cột×3 hàng, ô Tạo bàn đầu tiên, cuộn khi vượt vùng. Giữ tạo/vào/xem/xếp hàng và dữ liệu phòng thật. Build/typecheck PASS; dist có table-board/table-player-blue/table-player-red. Chưa browser QA.

- 2026-10-10: Giảm nhẹ độ trong suốt nền khung danh sách65→60% (#1c0e07 alpha40%); giữ bản A. Build/typecheck PASS, xác nhận class trong dist.

- 2026-10-10: Thử nền khung danh sách nâu đen #1c0e07/35, trong suốt65%; bản A giữ nguyên. Build/typecheck PASS, xác nhận trong dist. Chưa browser QA.

- 2026-10-10: Thử nền khung danh sách #613014/50 theo tông nâu thẻ địa chỉ, tăng trong suốt40→50%; bản A giữ nguyên. Build/typecheck PASS, xác nhận class trong dist. Chưa browser QA.

- 2026-10-10: Lưu bản A của Chọn Bàn tại docs/checkpoints/room-selection-A trước thử màu. Nền khung danh sách đổi #2C1408/65→#48230D/60, nâu rõ hơn và trong suốt40%. Build/typecheck PASS; xác nhận màu mới trong dist. Chưa browser QA.

- 2026-10-10: Tăng khoảng hở giữa từng nút tiện ích Chọn Bàn9→10px, neo mép phải để không dịch cả cụm. Build/typecheck PASS.

- 2026-10-10: Nới khoảng cách cụm tiện ích Chọn Bàn thêm1px, gap9px. Build/typecheck PASS; dist cập nhật.

- 2026-10-10: Giảm avatar header Chọn Bàn3px:48→45px desktop,36→33px compact; giữ tên/căn giữa. Build/typecheck PASS; dist cập nhật.

- 2026-10-10: Header Chọn Bàn tăng avatar40→48px desktop/32→36px compact, tên20→24px/16→18px; cụm căn giữa dọc bằng items-center. Build/typecheck PASS; chưa browser QA.

- 2026-10-10: Đo theo Home: nút tiện ích48×48px từ homeUtilityButton, gap-2=8px. Đồng bộ nav Chọn Bàn cùng flex-wrap/justify-end/gap-2, giữ kích thước nút/icon dùng chung. Build/typecheck PASS. Chưa browser QA.

- 2026-10-10: Bỏ lựa chọn “Tất cả” khỏi dropdown Chơi nhanh; mặc định10 phút và còn các mốc3/5/10/15/30. Build/typecheck PASS; dist cập nhật.

- 2026-10-10: Bọc ba nút tiện ích Chọn Bàn trong nav dùng gap-2 trùng Home, giữ button/icon dùng chung. Build/typecheck PASS, dist cập nhật. Chưa browser QA.

- 2026-10-10: Nhãn thời gian trên nút Chơi nhanh dùng font-number cho số, font-heading cho chữ; cỡ chữ kế thừa22px/18px bằng Chơi nhanh/Tạo bàn. Build/typecheck PASS, xác nhận nhãn cập nhật trong dist. Chưa browser QA.

- 2026-10-10: Menu thời gian Chơi nhanh đóng khi pointerdown ngoài cụm nút/menu; cleanup listener khi đóng/unmount. Build/typecheck PASS, xác nhận handler/ref trong dist. Chưa browser QA.

- 2026-10-10: Chơi nhanh trong Chọn Bàn mặc định10 phút theo yêu cầu mới; vẫn chọn được Tất cả và các mốc khác. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-10: Khôi phục mũi tên/dropdown thời gian Chơi nhanh (Tất cả,3/5/10/15/30 phút); mặc định Tất cả giữ ghép ngẫu nhiên mọi nơi/thời gian, chọn mốc cụ thể lọc thời gian trên mọi tỉnh/thành. Chữ Chơi nhanh22px/18px bằng Tạo bàn. Cấu hình Tạo bàn vẫn độc lập. Build/typecheck PASS, dropdown đã có trong dist. Chưa browser QA.

- 2026-10-10: Bỏ mũi tên cạnh tên trên thẻ địa chỉ, tăng tên20→22px desktop/16→18px compact. Build/typecheck PASS; xác nhận class mới trong dist. Chưa browser QA.

- 2026-10-10: Thẻ địa chỉ Chọn Bàn căn trái tên/số liệu và thay nhà cố định bằng icon tỉnh/thành theo selection.province (mặc định hồ sơ, đổi khi chọn khu vực). Build/typecheck PASS, xác nhận class căn trái/kích thước icon trong bundle dist. Chưa browser QA.

- 2026-10-10: Đồng bộ Chơi nhanh Home/Chọn Bàn qua randomAvailableRoom, tải danh sách mới và chọn ngẫu nhiên mọi tỉnh/thành/thời lượng, loại bàn đủ/đang chơi. Bỏ bộ lọc thời gian Chơi nhanh; giữ fallback khi không có bàn và kiểm tra năng lượng/lỗi mạng. Đối chiếu tạo bàn: khu vực đang chọn, mặc định tỉnh hồ sơ; số bàn lấy danh sách API theo province, refresh5 giây và invalidate khi tạo/vào. Test quickRoom PASS; build/typecheck PASS, dist/index-DUTuq3Oq.js đã cập nhật. Chưa browser/multiclient QA.

- 2026-10-10: Sửa cách hiểu “font chính” theo xác nhận: dùng font của tên người chơi (font-heading) cho tiêu đề và tên tỉnh/thành trong bảng chọn, giữ cỡ chữ. Build/typecheck PASS; xác nhận cả hai trong dist/index-6o_1hM0n.js. Chưa browser QA.

- 2026-10-10: Đổi tên tỉnh/thành trong thẻ chọn sang font chính font-body, giữ cỡ28px/24px. Build/typecheck PASS; xác nhận font mới trong dist/index-C5-MqfJN.js. Chưa browser QA.

- 2026-10-10: Tăng tiếp icon tỉnh/thành lên104px desktop/80px compact, tên lên28px/24px; giữ ẩn thanh cuộn. Build/typecheck PASS, xác nhận class mới trong dist/index-DqKsmpVK.js. Chưa browser QA.

- 2026-10-10: Tăng icon thẻ tỉnh/thành68→88px desktop,48→64px compact; ẩn thanh cuộn trực quan, vẫn cuộn được danh sách. Build/typecheck PASS, xác nhận class mới trong dist/index-8Enznegk.js. Chưa browser QA.

- 2026-10-10: Tạo mới đủ 34 icon tỉnh/thành bằng image_gen theo danh sách người dùng chốt; PNG riêng có tên số thứ tự/tỉnh, alpha thật và crop sát, cạnh dài tối đa256px. Bảng tổng hợp6 cột, ô35–36 trống; manifest lưu tên/biểu tượng/prompt. Thẻ tỉnh/thành Chọn Bàn dùng ảnh thay emoji, dữ liệu API giữ nguyên. Đã xem bảng ảnh và kiểm tra tự động alpha/bounding box đủ34 file. Build/typecheck PASS; dist có đủ34 PNG và bundle index-DbwIOQjn.js. Chưa browser QA.

- 2026-10-10: Tiêu đề chọn tỉnh/thành dùng font chính font-body, tăng24→30px desktop/16→20px compact và bỏ bộ đếm34 bên cạnh. Build/typecheck PASS; đã xác nhận tiêu đề mới trong bundle dist. Chưa browser QA.

- 2026-10-10: Thay khung bộ chọn tỉnh/thành bằng ảnh 8ee5ac91 và các thẻ bằng f6d81a33 theo xác nhận. Crop sát, loại nhiễu alpha rời; giữ tỷ lệ ảnh, dữ liệu API, cuộn/chọn/đóng. Build/typecheck PASS; dist có province-card-D55XZreL.png, province-picker-frame-CNnG5rPy.png và bundle index-DTMi-JvS.js. Đã xem asset crop; chưa browser QA.

- 2026-10-10: Sắp xếp asset rời trong `src/assets/`: ảnh/video nguồn gom vào `references/uploads/`; bốn khung avatar chạy chuyển vào `player/avatar-frames/` và cập nhật import. Giữ các file nguồn, gồm bản trùng byte; cập nhật manifest, đường dẫn script crop và tài liệu nguồn. `npm.cmd run build` và typecheck PASS; dist có đủ bốn asset khung avatar đã chuyển. Chưa browser QA.


- 2026-10-10: Bộ chọn Chọn Bàn tải toàn bộ danh sách tỉnh/thành từ API dùng chung với hồ sơ, bỏ danh sách hard-code 7 nơi; tăng cỡ chữ tên và bộ đếm, giữ scroll cho danh sách dài. `npm.cmd run build` PASS, dist cập nhật (`index-D622sMMI.js`); chưa browser QA.

- 2026-10-09: Thêm bộ chọn khu vực Chọn Bàn với TP.HCM, Hà Nội, Đà Nẵng, Cần Thơ, Huế, Hải Phòng và Bình Dương; thẻ có số bàn/người theo dữ liệu server, khu vực chọn lọc danh sách và Chơi nhanh. Tạo phòng lưu tỉnh/thành. `npm.cmd run build` PASS, dist cập nhật (`index-C1xzSAmJ.js`); chưa browser QA (không có cửa sổ trình duyệt khả dụng trong phiên).

- 2026-10-09: Tách cấu hình thời lượng của Tạo bàn khỏi bộ lọc Chơi nhanh; Tạo bàn có lựa chọn riêng, mặc định 10 phút/60 giây. `npm.cmd run build` PASS, dist cập nhật (`index-Bpi3kx9M.js`); chưa browser QA.

- 2026-10-09: Làm trạng thái hover hai nút đáy Tạo bàn sáng/nổi rõ hơn bằng tăng brightness và saturation. Build/typecheck PASS; dist cập nhật (index-BToC58k3.js). Chưa browser QA.

- 2026-10-09: Thu hai nút đáy của skin Tạo bàn và đồng bộ hit area/chữ; panel và các điều khiển khác giữ nguyên. Đã xem asset; build/typecheck PASS, dist có dialog-skin-v2-B7F8DVD6.png. Chưa browser QA.

- 2026-10-09: Thu nhỏ bảng Tạo bàn khoảng15% (max800→680px, giới hạn cao86→73dvh); skin/chữ/điều khiển co theo cùng tỷ lệ. Build/typecheck PASS; dist cập nhật (index-Bkze7UO0.js). Chưa browser QA.

- 2026-10-09: Dựng lại Tạo bàn theo ảnh riêng mới nhất bằng skin trống bám mẫu; HTML/select/nút thật phủ đúng tỷ lệ, không lớp nền nâu chồng. Giữ mặc định10p/60s và các mốc/server flow. Đã xem asset, trim1488×926/alpha góc0; build/typecheck PASS, dist có dialog-skin-PnGTtC5C.png và index-CvpFYbdw.js. Chưa browser QA.

- 2026-10-09: Bỏ nền nâu đặc trên form Tạo bàn, phần trong transparent để thấy nền cảnh trang; giữ viền và thông tin/điều khiển. Build/typecheck PASS; dist cập nhật (index-Bx5XHiUy.js). Chưa browser QA.

- 2026-10-09: Bảng Tạo bàn bỏ ảnh phong cảnh và lớp phủ gradient chồng, dùng duy nhất nền nâu #47250B trực tiếp trên form; giữ viền/điều khiển và mặc định10p/60s. Build/typecheck PASS; dist cập nhật (index-DtrBJwCo.js). Chưa browser QA.

- 2026-10-09: Chỉnh nền khung danh sách thành nâu tối #2C1408 alpha65%, vẫn thấy cảnh phía sau, không blur. Build/typecheck PASS; dist cập nhật (index-BQJ1pmdU.js). Chưa browser QA.

- 2026-10-09: Làm lại CreateRoomForm theo mẫu đầu tiên với panel phong cảnh nâu/viền vàng, tiêu đề, nút đóng và hai select có icon; reset mặc định10 phút/60 giây mỗi lần mở. Bỏ wrapper popup cũ trong Chọn Bàn; component dùng chung cập nhật cả LobbyDialog. Build/typecheck PASS; dist cập nhật (index-BoKfdGLx.js). Chưa browser QA.

- 2026-10-09: Giữ #47250B, giảm alpha nền55% xuống40% (trong suốt60%); không thêm blur hoặc làm mờ viền/nội dung. Build/typecheck PASS; dist cập nhật (index-DetMNgIN.js). Chưa browser QA.

- 2026-10-09: Đổi nền khung giữa sang màu người dùng chỉ định #47250B, giữ alpha55% (trong suốt45%). Build/typecheck PASS; dist cập nhật (index-BccuLUdR.js). Chưa browser QA.

- 2026-10-09: Chỉnh nền khung giữa thiên nâu sẫm như thẻ thành phố trong mẫu, giữ độ trong suốt45%. Build/typecheck PASS; dist cập nhật (index-cWypuE7B.js). Chưa browser QA.

- 2026-10-09: Tăng sắc nâu nền khung giữa, giảm alpha65% xuống55% (trong suốt45%); giữ viền/góc. Build/typecheck PASS; dist cập nhật (index-BID0HoJ4.js). Chưa browser QA.

- 2026-10-09: Hoàn tác lần chỉnh nền gần nhất, đưa #754b28b3/#583519b3/#3e200eb3 về #45220ca6/#301506a6/#1e0c03a6. Build/typecheck PASS; dist cập nhật (index-Dcvo2OpG.js). Chưa browser QA.

- 2026-10-09: Khôi phục nền nâu ấm bán trong suốt #754b28/#583519/#3e200e alpha70%, sửa việc chọn nhầm bản nâu sẫm. Build/typecheck PASS; dist cập nhật (index-C6WcHVrt.js). Chưa browser QA.

- 2026-10-09: Khôi phục riêng nền khung về trạng thái ngay trước lần hoàn tác màu (#45220c/#301506/#1e0c03, alpha65%); giữ màu viền/góc cũ. Build/typecheck PASS; dist cập nhật (index-Dcvo2OpG.js). Chưa browser QA.

- 2026-10-09: Thu nhẹ chữ/số và icon đếm của thẻ địa chỉ; tăng icon kiếm Chơi nhanh lên cùng cỡ dấu cộng Tạo bàn. Giữ cỡ thẻ. Build/typecheck PASS; dist cập nhật (index-DTaXCuim.js). Chưa browser QA.

- 2026-10-09: Hoàn tác riêng màu hai viền về #bd914e và góc về #f4d995; giữ nền nâu hiện hành nguyên trạng. Build/typecheck PASS; dist có màu viền/góc đã hoàn tác (index-ChqwkQX_.js). Chưa browser QA.

- 2026-10-09: Đồng bộ font ba thẻ Chọn Bàn: nhãn/đơn vị dùng font chính, số và dấu cộng dùng font-number; giữ cỡ/bố cục. Build/typecheck PASS; dist cập nhật (index-BjKcdp0V.js). Chưa browser QA.

- 2026-10-09: Hoàn tác riêng màu nền khung giữa về gradient nâu trước đó (alpha80%); giữ viền và góc gold. Build/typecheck PASS; dist có màu đã hoàn tác (index-DhGz11zR.js). Chưa browser QA.

- 2026-10-09: Đổi hai viền và bốn họa tiết góc khung giữa sang vàng gold #ffd700, giữ nền/kích thước. Build/typecheck PASS; dist có màu gold (index-DEI-l4VN.js). Chưa browser QA.

- 2026-10-09: Tăng tông nâu sẫm và độ trong suốt nền khung giữa từ20% lên35%; giữ viền và nội dung. Build/typecheck PASS; dist có màu/alpha mới (index-DXcGRYia.js). Chưa browser QA.

- 2026-10-09: Chỉnh nền giữa sang nâu sẫm theo mẫu thẻ địa chỉ, alpha80% để vẫn xuyên nền nhưng giảm sắc vàng cảnh phía sau. Build/typecheck PASS; dist có màu mới (index-DhcHiA-Y.js). Chưa browser QA.

- 2026-10-09: Sửa tông nền khung giữa sang nâu đậm thiên đỏ rõ hơn, bỏ nâu vàng nhạt; giữ alpha70% và hình học. Build/typecheck PASS; dist có tông mới (index-DBnJFCVg.js). Chưa browser QA.

- 2026-10-09: Tăng độ trong suốt nền khung giữa từ15% lên30%, đổi gradient sang nâu ấm hơn; giữ viền và nội dung. Build/typecheck PASS; dist có màu/alpha mới (index-CeNDAyPi.js). Chưa browser QA.

- 2026-10-09: Giảm alpha nền gradient khung giữa xuống85%, chỉ nền trong suốt nhẹ, giữ viền/họa tiết/chữ/icon. Build/typecheck PASS; dist có alpha mới (index-CKDfin_r.js). Chưa browser QA.

- 2026-10-09: Đổi nền phẳng khung giữa thành nâu chuyển sắc theo thẻ địa chỉ, dùng màu nâu trong palette chung; giữ viền/họa tiết/kích thước. Build/typecheck PASS; dist có gradient mới (index-Blcwl45V.js). Chưa browser QA.

- 2026-10-09: Đồng nhất nền nâu #483019 từ mép tới giữa, bỏ gradient; thêm viền vàng mảnh và họa tiết bốn góc theo mẫu, giữ kích thước khung. Build/typecheck PASS; dist có màu mới (index-r-LeyJfX.js). Chưa browser QA.

- 2026-10-09: Chỉnh nền khung giữa sang nâu ấm kín, sáng giữa/tối mép theo mẫu; giữ viền1px và kích thước hiện tại. Build/typecheck PASS; dist có gradient mới (index-Cb5F-ogz.js). Chưa browser QA.

- 2026-10-09: Dựng lại khung giữa Chọn Bàn bằng nền nâu85% và viền vàng1px, bỏ khung ảnh/trang trí cũ; giữ nguyên hình học container, hình bàn/chữ và dữ liệu phòng. Build/typecheck PASS; dist có nền mới (index-BfSO6oRW.js). Chưa browser QA.

- 2026-10-09: Sửa hiểu nhầm yêu cầu bỏ lớp trong: khôi phục viền khung danh sách panel.png, giữ chiều cao đã tăng và không thêm nền phủ. Build/typecheck PASS; dist có viền khung (index-DJHUrrlv.js). Chưa browser QA.

- 2026-10-09: Theo yêu cầu giữ nền lớn, bỏ viền panel.png lồng trong danh sách; giữ hình bàn/chữ trên nền cảnh chung và dữ liệu phòng thật. Build/typecheck PASS; dist cập nhật (index-D-pSPPv-.js). Chưa browser QA.

- 2026-10-09: Thay nhạc tổng hợp bằng file người dùng cung cấp, player chung xuyên màn hình; ended chờ5s phát lại, tắt nhạc hủy timer. Build/typecheck PASS; dist có background-music-B1RLsviN.mp4. Chưa nghe kiểm tra trình duyệt.

- 2026-10-09: Kéo mép dưới khung danh sách Chọn Bàn xuống32px bằng giảm khoảng dưới56px xuống24px; giữ mép trên và vị trí hai nút lọc. Build/typecheck PASS; dist có class mới (index-qhekh8r4.js). Chưa browser QA.
- 2026-10-09: Bỏ lớp phủ nền nâu riêng trong khung danh sách Chọn Bàn; hình bàn và chữ đặt trực tiếp trên nền trang. Build/typecheck PASS; dist cập nhật (index-gRHJ1AGq.js). Chưa browser QA.
- 2026-10-09: Hoàn tác ảnh thẻ nâu kéo dãn ở bảng giữa, khôi phục khung panel.png viền mảnh và nền bán trong suốt. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-09: Hoàn tác riêng khung giữa về vị trí/chiều cao trước lần hạ xuống; giữ vị trí tiện ích và nút lọc đã chỉnh. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Bỏ nút Video, chuyển Bạn bè lên header bên phải; bỏ hàng tiện ích dưới, hạ nút lọc và mở rộng bảng giữa xuống dưới, tăng khoảng trên bảng lên16px. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-09: Bảng giữa Chọn Bàn dùng ảnh thẻ nâu người dùng cung cấp, object-fill toàn ô và opacity60; bỏ nền CSS. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-09: Tạo bàn dùng CreateRoomForm chung, bỏ tên phòng, chọn 3/5/10/15/30 phút và giới hạn mỗi nước 30/60/90/120 giây. Cấu hình đi qua API→Controller→Service, engine/clock/vòng avatar dùng giới hạn thực tế, reset/rematch giữ cấu hình. 33 test liên quan PASS; build/typecheck PASS, dist cập nhật. Chưa browser QA.

- 2026-10-09: Dựng mới bảng danh sách giữa bằng nền nâu/viền vàng đơn giản, bỏ khung ảnh và lớp phủ cũ; giữ hình bàn/chữ khi trống và danh sách phòng khi có bàn. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-09: Đặt các mốc phút trong bảng xổ dưới mũi tên; mỗi nút giờ bằng nhau 112×32px. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Làm rõ ảnh thẻ nâu dùng trực tiếp cho cả ô giữa Tạo bàn; render img object-fill phủ đủ kích thước và đặt chữ/dấu cộng ở lớp trên. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Thay popover/select thời gian bằng danh sách nút mốc phút xổ trực tiếp dưới mũi tên Chơi nhanh. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Hoàn nguyên bố trí nút Tạo bàn về chữ và dấu cộng cạnh nhau, căn giữa cả cụm theo yêu cầu người dùng. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Căn chữ Tạo bàn độc lập ở tâm thẻ, neo dấu cộng cách mép phải 8px. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Hạ riêng dòng tỉnh/thành trong thẻ địa chỉ 5px vì padding cha không làm dịch vị trí nội dung đã căn giữa. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Chuyển py5 từ riêng dòng thành phố sang toàn bộ nội dung thẻ địa chỉ để tạo khoảng cách với viền trên/dưới. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Thêm py5 cho nhãn thành phố, giảm cụm chữ Chơi nhanh/thời lượng xuống 18px desktop/16px compact để cân bằng với Tạo bàn. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Đồng bộ chữ thẻ địa chỉ và Chơi nhanh theo cỡ “Tạo bàn” (22px desktop/18px compact), gồm số đếm và thời gian. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Giảm chiều cao ba thẻ Chọn Bàn 8px: 80→72px desktop, 72→64px compact. Build/typecheck PASS; dist cập nhật.

- 2026-10-09: Thay hình giữa danh sách bàn trống bằng ảnh người dùng 44c73279; crop sát 1093×776, bỏ blend-screen để giữ màu gốc. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-09: Thay icon nhà có nền nâu bằng icon imagegen nền trong suốt, crop sát và bỏ nhiễu rời; tăng chữ địa chỉ, số đếm, Tạo bàn/Chơi nhanh. Build/typecheck PASS; dist cập nhật. Đã xem asset, chưa browser QA.

- 2026-10-09: Bỏ border trong suốt cũ khiến ảnh nền thẻ bị thu nhỏ; chữ/icon trực tiếp trên ảnh toàn ô. Tăng ba thẻ lên 80px desktop/72px compact. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-09: Thay thẻ Chọn Bàn bằng hai ảnh mới: nâu cho địa chỉ/Tạo bàn, đỏ cho Chơi nhanh. Crop sát và loại nhiễu alpha <=8; giữ bản nguồn, kích thước ô và nội dung. Build/typecheck PASS; dist có asset mới. Đã xem ảnh crop; chưa browser QA.

- 2026-10-09: Dựng lại hai thẻ địa chỉ/Tạo bàn bằng nền gradient nâu liền mạch từ palette chung, giữ viền ảnh và nội dung HTML trên nền. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-09: Bỏ nền nâu fill trong hai ô địa chỉ/Tạo bàn, giữ viền ảnh và đặt nội dung trên nền trang. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-09: Chọn Bàn: lớp nền nâu phủ toàn khung danh sách; border-image/họa tiết góc chuyển sang overlay phía trên nền và nội dung. Giữ khoảng đệm desktop20px/compact14px. Chưa browser QA.

- 2026-10-09: Sửa màu Bỏ qua sau phản hồi chưa thấy đổi: bỏ nền vàng thừa từ lobbyButton, dùng buttonInteraction và nền nâu riêng; hover sáng hơn. Build/typecheck PASS.

- 2026-10-09: Năng lượng hồi 1 điểm mỗi7 phút; mỗi ván bắt đầu trừ1 cho cả local/online/đấu máy. Chặn Sẵn sàng và xếp hàng khi hết năng lượng bằng dialog cục bộ giữa màn hình. “Xem video” báo chưa tích hợp. Typecheck/build PASS; chưa browser QA.
- 2026-10-09: Điều chỉnh phạm vi chặn: Home chặn bắt đầu chơi khi hết năng lượng; Chọn Bàn vẫn mở và phòng đang chơi vẫn vào xem được. Tạo/vào phòng chưa chơi và xếp hàng bị chặn. Giữ kiểm tra Sẵn sàng cho ván tiếp theo trong phòng. Cùng dialog được đưa lên App để hiện ở mọi màn.
- 2026-10-09: Người dùng đổi quy tắc: năng lượng chỉ áp dụng online. Bỏ trừ/chặn ở Home, local và đấu máy/Cờ Úp; giữ trừ khi trận online bắt đầu và các chặn online tương ứng, vẫn cho vào phòng đang chơi để xem.
- 2026-10-09: Thêm bộ đếm năng lượng góc trên trái EnergyNotice và dropdown đếm ngược mở sẵn, hướng lên. Click trong khung đóng dropdown; click ngoài khung đóng bảng; Bỏ qua đóng bảng. Build/typecheck PASS; chưa browser QA.

- 2026-10-08: Bỏ opacity giảm sáng trên nút Sẵn sàng khi nó hiện trong lúc OpeningCover đang chạy; giữ disabled cho đến khi mở xong. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Nút Sẵn sàng hiện ngay khi bàn ở phase ready trong lúc OpeningCover đang mở; vẫn disabled cho đến khi animation kết thúc. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Khung khai cuộc nhận mọi chuyển vào playing từ ready/finished hoặc đổi phòng, sửa bỏ qua khung khi reset/start đấu lại bị React gộp. Giữ1300ms và tên hai đối thủ từ trạng thái hiện tại. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Thêm tích tắc cảnh báo10s cuối trước timeout (tổng thời gian hoặc lượt60s), dùng Web Audio/kênh clock riêng; dừng khi đổi lượt/kết thúc/reset/rời bàn. Build/typecheck PASS, dist cập nhật; chưa kiểm tra âm thanh trực tiếp trên trình duyệt.

- 2026-10-08: Tăng cỡ số đồng hồ PlayerCard từ16px lên18px, giữ khung/vị trí. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Khi ván bắt đầu, bỏ icon quân Tướng trước đồng hồ PlayerCard; giữ thời gian số và nền/trạng thái đồng hồ. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Sửa trễ câu intro sau khi bấm Bắt đầu: track phụ giữ offset một phần năm nhưng phát ngay cùng track chính, bỏ delay 1–2 giây. `npm.cmd run build` PASS (typecheck + Vite), dist cập nhật; chưa browser QA/audio loopback.

- 2026-10-08: Giới hạn tên người chơi mới tối đa10 ký tự theo NFC/trim qua helper client/store/server. Xác nhận tên quá dài ở luồng vào/tạo/chơi nhanh/local hiện dialog “Vui lòng nhập tối đa 10 ký tự”, giữ tên để sửa; bỏ cắt âm thầm24 ký tự. Tên nhóm/phòng giữ quy tắc riêng. Build/typecheck PASS, dist có thông báo; chưa browser QA.

- 2026-10-08: Chuẩn hóa bảng tên có khung theo Home180×38/font24/padding24 bằng PlayerNameplate. Home và PlayerCard desktop170/compact120 dùng chung tỷ lệ; chiều cao/chữ/padding tính từ chiều rộng, lưu quy tắc toàn project trong AGENTS/PROJECT-MEMORY. Build/typecheck PASS, dist có component/tỷ lệ mới; chưa browser QA. Renderer worker cũ không nằm trong luồng chụp DOM hiện hành.

- 2026-10-08: Bỏ track trắng của thanh cuộn danh sách chat bàn cờ, dùng track trong suốt và thumb xanh lam50% qua Chat chung. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Theo quyền mở bảng Thông tin cho task typography, tăng hai số Elo của PlayerInfoCard từ medium lên semibold, đồng bộ hồ sơ mình/người khác/preview. Build/typecheck PASS; dist cập nhật; chưa browser QA. Phạm vi mở riêng task trở về khóa theo quy tắc trước đó.

- 2026-10-08: Đưa nút back Chọn Bàn/Chơi Với Máy lên trong dải header đen: top4px, compact top0px; giữ trái12px, kích thước48px và bấm ngay trong entrance. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Thay icon Elo trên PlayerCard theo biến thể: Cờ Tướng dùng quân Tướng đỏ, Cờ Úp dùng quân trống vàng như hai chỉ số ở Home; truyền `game.variant` vào hai PlayerCard. `npm.cmd run build` PASS (typecheck + Vite), dist được cập nhật; chưa browser QA.

- 2026-10-08: Nút quay lại Chọn Bàn/Chơi Với Máy dùng được ngay trong OpeningCover1500ms; chuyển `inert` khỏi phần tử cha và chỉ khóa nội dung còn lại, bảo toàn hành vi chờ hiệu ứng của các điều khiển khác. `npm.cmd run build` PASS (typecheck + Vite), dist được cập nhật; chưa browser QA.

- 2026-10-08: Đồng bộ nút quay lại của Chọn Bàn/Chơi Với Máy với nút rời bàn cờ (icon, màu, kích thước48×48, vị trí cách góc trên trái12px); dùng chung GameBackIcon với GamePage và giữ nguyên khoảng trống header. `npm.cmd run build` PASS (typecheck + Vite), dist được cập nhật; chưa browser QA.

- 2026-10-08: Đồng bộ mở Chọn Bàn/Đấu với máy theo Cờ Tướng/Cờ Úp: OpeningCover hai lớp che trượt ngang1500ms, ROOM_OPENING_MODE chung. Giữ khóa thao tác trong entrance và reduced-motion; không đổi khai cuộc/gameplay. Build/typecheck PASS, dist có cover chung; chưa browser QA.

- 2026-10-08: Giảm weight số trong PlayerInfoCard về medium cho tên/điểm/bộ đếm, giữ cỡ chữ và baseline; áp dụng chung hồ sơ/preview avatar. Build/typecheck PASS, dist có weight mới; chưa browser QA.

- 2026-10-08: Theo quyền mở phần avatar cho task typography, sửa số trong tên/địa chỉ của PlayerInfoCard dùng font-number lining/tabular; số trong tên0.9em cùng baseline. Card dùng chung hồ sơ mình/người khác/preview Tùy chỉnh avatar. Không sửa hình học avatar. Build/typecheck PASS, dist có soften=false cho card; chưa browser QA. Phạm vi avatar trở về khóa sau task theo quy tắc mở khóa một lần.

- 2026-10-08: Sửa chiều cao icon quan hệ: hai asset friend1106×1091/remove-friend1250×1220 khác tỷ lệ. Dùng ô chung32% aspect1106/1091 và ảnh height100%/width auto, nên Thêm bạn/Chấp nhận/Hủy thêm/Xóa bạn cùng chiều cao, không bóp ảnh. Build/typecheck PASS, dist có ô mới; chưa browser QA.

- 2026-10-08: Hồ sơ người gửi lời mời hiển thị Chấp nhận, giữ icon Thêm bạn. Đồng bộ lời mời nhận trong sessionStore và useMessageFriendship; chấp nhận ở hồ sơ/header chat cập nhật Bạn bè và bỏ lời mời nhận, từ chối ở danh sách lưu chung. Header chat không hiện toast Đã gửi khi chấp nhận. Build/typecheck PASS, dist có trạng thái incoming mới; chưa browser QA/backend.

- 2026-10-08: Tách PlayerInfoCard chung từ khung thông tin hồ sơ mình, dùng cho hồ sơ người khác và preview Tùy chỉnh avatar; thay dữ liệu qua props. Bỏ chiều cao90% riêng của hồ sơ người khác, thống nhất nội dung/gap/padding theo hồ sơ mình. Giữ ID/copy/địa chỉ/Theo dõi và handler các nút. Build/typecheck PASS, dist có card mới; chưa browser QA.

- 2026-10-08: Theo dõi hồ sơ tăng120→121, đổi Bỏ theo dõi và làm tối riêng nền/khung, icon/chữ giữ sáng; bỏ theo dõi đảo lại. State chung sessionStore theo tên giữ khi đóng/mở và đồng bộ Home/trong ván. Build/typecheck PASS, dist có trạng thái mới; chưa browser QA/backend.

- 2026-10-08: Nút Nhắn tin trong ProfileDialog đóng hồ sơ trước khi mở/chọn đúng hội thoại, sửa tình huống hồ sơ mở từ Tin nhắn vẫn che chat. Handler dùng chung Home/trong ván. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Icon Thêm bạn/Hủy thêm/Xóa bạn trong hồ sơ dùng cùng32% bề rộng, bỏ tăng lên36% khi pending/đã là bạn. Build/typecheck PASS, dist có class chung mới; chưa browser QA.

- 2026-10-08: Thêm huy hiệu tròn đỏ số tin chưa đọc thay thời gian trong danh sách Tin nhắn, lấy số tin nhận sau mốc đọc; chọn hội thoại cập nhật mốc đọc và bỏ huy hiệu. Tin gửi không tăng số; thread bị xóa không còn số. Fixture Picolozz4/Khôi1/An1 để xem thử. Build/typecheck PASS, dist có huy hiệu mới; chưa browser QA/backend sync.

- 2026-10-08: Thêm fixture tạm nhóm “Nhóm Kỳ Hữu”, tài khoản hiện tại là thành viên thường; creator riêng là MinhQuang (LinhMeo99 nếu trùng tài khoản). Mở sẵn nhóm khi vào Tin nhắn trực tiếp để người dùng test việc ẩn camera/Đổi tên và chìa khóa người tạo. Build/typecheck PASS, fixture có trong dist; chưa browser QA.

- 2026-10-08: Sửa lại Chặn/Bỏ chặn và Xem thành viên sau phản hồi mảng nâu vẫn còn: bỏ toàn bộ nền gradient HTML/border-image ghép; dùng ảnh nền hàng trống action-row-blank.png, chữ đặt trực tiếp lên ảnh. Đã xem asset sau tight-crop2164×236/góc alpha0. Build/typecheck PASS, dist có asset mới; chưa browser QA.

- 2026-10-08: Tạm ẩn Tắt thông báo bằng cờ notificationMuteEnabled=false; giữ modal/state đã làm. Dồn Xóa cuộc trò chuyện/Báo cáo lên để các hàng nhóm liên tiếp. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Tăng nhãn1h/4h/8h từ18 lên20px, cả h dùng font-number. Bọc chung span tránh gap của hàng radio tách số khỏi h. Build/typecheck PASS, dist có nhãn mới; chưa browser QA.

- 2026-10-08: Bỏ lớp chữ nhật nâu che chữ của Chặn/Bỏ chặn và Xem thành viên; dùng OptionRowBackground chung, chữ nằm trực tiếp trên nền hàng. Đã tìm các overlay tương tự trong Messages*.tsx; hai lớp cũ không còn. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-08: Tắt thông báo nhóm mở hộp thời gian1h/4h/8h/Cho đến khi mở lại, radio vòng tròn/chấm tròn, Hủy/OK. Thiết lập thời hạn lưu riêng theo nhóm trong client state Tin nhắn; chưa nối thông báo/backend. Build/typecheck PASS, hộp và radio có trong dist/assets/index-CZhQwRky.js; chưa browser QA.

- 2026-10-08: Chỉnh câu xác nhận xóa tin nhắn theo yêu cầu: tiêu đề “Xóa toàn bộ tin nhắn?”, giữ một dòng giải thích “Tin nhắn người bên kia vẫn được giữ, chỉ xóa ở phía bạn.” Build/typecheck PASS; đã xác nhận câu mới có trong dist/assets/index-CP6L0DKU.js.

- 2026-10-08: Ảnh tải lên của avatar nhóm vẫn crop tròn bằng object-cover nhưng bỏ hoàn toàn asset khung vàng mặc định phủ lên ảnh; avatar mặc định chưa đổi. Đồng bộ component dùng chung ở Tạo nhóm/Tùy chọn/danh sách/header/chat. Build/typecheck PASS; dist cập nhật. Chưa browser QA.

- 2026-10-08: Giảm thêm độ đậm thị giác chữ số trong Tin nhắn/Bạn bè: opacity94% xuống88% qua NumberText và huy hiệu lời mời; giữ cỡ chữ và baseline. Cập nhật quy tắc font tương ứng. Build/typecheck PASS, CSS dist có opacity88%; chưa browser QA.

- 2026-10-08: Sửa path SVG icon nhóm cạnh tên bị méo thành icon ba người vàng, giữ kích thước/vị trí. Build/typecheck PASS; path mới có trong dist/assets/index-BDGXAig5.js. Chưa browser QA.

- 2026-10-08: Sửa MessagesGroupAvatar: ảnh upload phủ toàn box như ảnh mặc định thay vì82%; mask vòng vàng dùng circle closest-side để vòng không bị mất. Đồng bộ mọi nơi dùng component. Build/typecheck PASS, kiểm tra mask mới trong dist/assets/index-Dql-KoJq.js; chưa browser QA.

- 2026-10-08: Bảng thành viên nhóm dành sẵn8 dòng, vượt8 người cuộn dọc; dùng chung token thanh cuộn vàng với danh sách Tin nhắn. Giới hạn chiều cao trong popup, giữ avatar và quyền chìa khóa. Build/typecheck PASS; đã kiểm tra mã cuộn trong dist/assets/index-LXd0ucwX.js và màu thanh cuộn trong CSS; chưa browser QA.

- 2026-10-08: Căn số trong Tin nhắn bằng NumberText dùng font-number/lining-nums/tabular-nums; số trong tên0.9em cùng baseline, đồng bộ danh sách/header/tùy chọn/chọn thành viên. Preview và tin nhắn cũng tách số; thời gian có lining/tabular. Build/typecheck PASS, dist/assets/index-CQ54nvKH.js cập nhật; chưa browser QA.

- 2026-10-08: Thu phần số trong tên Lịch sử xuống0.9em (90% cỡ tên) để cân bằng Times New Roman với Cormorant; tự co theo cỡ tên, giữ baseline và độ đậm. Build/typecheck PASS; dist cập nhật. Lịch sử vẫn mở khóa; chưa browser QA.

- 2026-10-08: Tăng tên trong Lịch sử20→21px; phần chữ dùng font-heading, các đoạn số trong tên dùng font-number/lining-nums cùng cỡ và độ đậm để tránh số oldstyle cao thấp. Giữ nguyên chuỗi tên. Build/typecheck PASS; dist/assets/index-BOP0LFji.js cập nhật. Lịch sử tiếp tục mở khóa; chưa browser QA.

- 2026-10-07: Nới ô bong bóng chat (padding ngang20/dọc6px), căn giữa bong bóng với avatar và thu avatar chat48px. Browser QA xác nhận avatar và bong bóng căn giữa theo trục dọc, nội dung đủ, không hiện thời gian/tick. Ảnh outputs/tin-nhan-bong-bong-can-giua.png. `npm.cmd run build` PASS (typecheck + Vite), dist/assets/index-CQ7nWuDn.js.

- 2026-10-07: Tinh chỉnh tin nhắn theo yêu cầu: ẩn timestamp/dấu tick bên trong bong bóng, thu avatar cạnh bong bóng58→52px, tăng chữ21→23px. Timestamp preview danh sách vẫn còn. Browser QA xác nhận vùng chat chỉ còn nội dung7 tin, timestamp/tick không xuất hiện trong cây accessibility; ảnh outputs/tin-nhan-tinh-chinh.png. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-wqgT3osx.js.

- 2026-10-07: Tách Tin nhắn thành MessagesSidebar và MessagesChatPane với hai asset cắt từ ảnhff79830f (trái465×998, phải890×989 sau trim9 hàng alpha trên); width/height từng bên chỉnh riêng qua MESSAGE_PANEL_SIZE trong messagesPanelLayout.ts. Giữ bố cục/nội dung mặc định và mức giãn ngang20%. Browser QA1280×720: hai ảnh nối đúng đường phân cột, nội dung đủ8 hội thoại/7 tin nhắn/thanh nhập, không lệch bố cục mặc định; ảnh outputs/tin-nhan-tach-hai-khung.png. Giữ font nút đóng riêng sau đối chiếu. Build/typecheck cuối PASS; dist/assets/index-CG1o3yZC.js và hai asset khung cập nhật. Viewport QA đã reset; chưa nối logic nhắn tin.

- 2026-10-07: Tăng riêng chiều ngang khung Tin nhắn thêm20%, giới hạn màn hình chừa6px mỗi cạnh; giữ chiều cao và kích thước chữ/avatar. Khung ảnh giãn ngang theo yêu cầu, nội dung HTML theo hai khoang rộng hơn. Browser QA1280×720: khung khoảng1134×696 (ngang trước945px), đủ8 hội thoại/7 tin nhắn/thanh nhập, không tràn khung. Ảnh outputs/tin-nhan-khung-rong.png; đã reset viewport xem thử. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-PV2TjKkq.js.

- 2026-10-07: Theo chỉnh sửa mới, bỏ banner/chữ Tin nhắn phía trên; chỉ giữ khung ảnhff79830f và phóng to theo viewport (lề12px, tối đa1120px ngang), giữ tỷ lệ ảnh và nội dung bản trước. Browser QA tab xem thử714×668: không còn banner, khung rộng690px (trước khoảng582px), đủ8 hội thoại/7 tin nhắn và thanh nhập trong khung. Cập nhật outputs/tin-nhan-khung-moi.png. `npm.cmd run build` PASS (typecheck + Vite), dist/assets/index-CPEjZFKr.js cùng chat-frame-CkHbCwHa.png; chưa kiểm tra viewport khác ở lần này.

- 2026-10-07: Thay khung Tin nhắn bằng ảnhff79830f, crop runtime1355×998 với alpha thật ngoài khung; bỏ khung CSS/SVG và nền chat cũ khỏi MessagesDialog dùng chung Home/Game. Giữ banner và8 hội thoại/7 tin nhắn/thanh nhập/nút bản trước; nội dung đặt đúng hai khoang ảnh, giữ tỷ lệ khung. Browser QA ở tab xem thử: khung mới tải/hiển thị đủ, nội dung nằm trong hai khoang, đóng bằng X rồi mở lại từ Home thành công. Ảnh outputs/tin-nhan-khung-moi.png. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-BYbJpeP0.js và chat-frame-CkHbCwHa.png cập nhật. Game dùng chung component; chưa kiểm tra thao tác trực tiếp trong bàn hoặc viewport khác ở lần này.

- 2026-10-07: Dựng MessagesDialog theo ảnh01f4e691 với hình học/khung Xếp hạng1120×750, banner đổi chữ Tin nhắn; cột8 hội thoại,7 bong bóng/timestamp/checkmarks, thanh nhập/emoji/ảnh/gửi. Mở từ nút Nhắn tin trong Bạn bè/hồ sơ Home/Game; bổ sung icon hội thoại ở hàng tiện ích Home để mở xem thử trực tiếp. Fixture cố định, logic để sau. Asset crop có alpha thật/tight bbox, phong cảnh chat phục hồi riêng bằng built-in imagegen; nguồn/prompt trong assets/messages/source.md. Không sửa RankingDialog, avatar hoặc bố cục các màn khóa. Browser QA: nút tiện ích mới hiện ở Home và mở hộp thoại; cây accessibility hiển thị tiêu đề Tin nhắn, đủ8 hội thoại, nội dung chat và thanh nhập. Screenshot outputs/tin-nhan-ui.png từ trước; hộp thoại đang mở trong tab xem thử. Kích thước responsive 1280×720 và800×620 đã kiểm tra ở lần trước; Game dùng chung component, chưa thao tác trực tiếp trong bàn. `npm.cmd run build` PASS (typecheck + Vite), dist bundle mới `index-mHEaYRUt.js`; cảnh báo hiện có về chunk JS >500 kB.

- 2026-10-07: Cho phép lời mời So tài độc lập tồn tại đồng thời. Khi có lời mời mới đến cùng người nhận, máy chủ xóa lời cũ, báo người gửi cũ và gửi lời mời mới; trả lời lời cũ không còn hợp lệ. `npm.cmd run build` (gồm typecheck) PASS; frontend dist được tạo, bundle `index-BZ3K4c6R.js` không đổi vì task chỉ thay server.

- 2026-10-07: Trạng thái “Hủy thêm” chỉ làm tối khung nút bằng brightness(0.55); icon và chữ giữ sáng, thao tác hủy vẫn hoạt động. Cập nhật PROJECT-MEMORY. `npm.cmd run build` (gồm typecheck) PASS; dist/index.html dùng `index-BZ3K4c6R.js`.

- 2026-10-07: Lời mời So tài hết hạn sau5 giây theo đồng hồ server; phía nhận tự đóng bảng đúng hạn, và sự kiện dọn dẹp server không mở thêm thông báo sau đó. Đồng bộ quy tắc trong PROJECT-MEMORY. `npm.cmd run build` (gồm typecheck) PASS; dist/index.html dùng `index-DEpPbX2A.js`.

- 2026-10-07: Hồ sơ dùng lời mời kết bạn chờ trong session store: “Hủy thêm” mờ nhưng bấm được để rút; khi state quan hệ báo đã là bạn, nút thành “Xóa bạn” sáng. Thêm hộp xác nhận xóa với Hủy/Đồng ý và checkbox bỏ hỏi trong10 phút, hết hạn thì hỏi lại. Cập nhật FRIENDS-UI-RULES và PROJECT-MEMORY; gửi/nhận kết bạn qua backend chưa tích hợp. `npm.cmd run build` (gồm typecheck) PASS; dist/index-B6x2wLTn.js có UI hiện tại. Browser QA: Hủy thêm vẫn mờ và giữ trạng thái khi đóng/mở hồ sơ; bấm Hủy thêm rút lời mời; hộp xác nhận hiện đúng tên/nút/checkbox; chọn bỏ hỏi rồi Đồng ý thì lần xóa kế tiếp chạy trực tiếp. Tải lại trang khôi phục dữ liệu mẫu.

- 2026-10-07: Đồng bộ icon Xóa bạn với bộ icon thao tác hồ sơ mới. Tạo `src/assets/profile/actions/remove-friend.png` theo icon `friend.png`, giữ huy hiệu vàng và thay dấu cộng bằng dấu trừ; crop alpha dư còn 1250×1220px. Cập nhật `ProfileDialog`, FRIENDS-UI-RULES, PROJECT-MEMORY và ghi nguồn asset. Giữ nguyên bố cục, trạng thái và avatar. `npm.cmd run build` (gồm typecheck) PASS; `dist/assets/remove-friend-DapGtU55.png` đã được cập nhật. Chưa browser QA.

- 2026-09-29: Giữ tên đầy đủ trong `name`, thêm `displayName` rút gọn cho các tên dài; chữ trong khung Phong Tặng nằm giữa vùng 70%, một dòng, tự co cỡ 30/27/24/21px và không hiện ellipsis. Khung giữ nguyên scale 1.36. Build/typecheck PASS.
- 2026-09-29: Thay 5 khung Phong Tặng bằng năm khung cắt từ sprite `52405c8d-34f5-4789-a46c-20e1d0674b2e.png` theo thứ tự VIP 1→5; giữ alpha, tỷ lệ gốc và canvas 1500×500, căn thân đặt chữ cùng tâm/bề rộng 580px. Tăng render scale chung lên 1.36 để vùng thân đạt xấp xỉ chuẩn 790px; build/typecheck PASS, asset đã kiểm tra trực quan.
- 2026-09-29: Sửa dấu/chữ trong tên Phong Tặng: dùng Cormorant Garamond có glyph tiếng Việt, chuẩn hóa NFC, nới line-height và giảm stroke để dấu không dính chữ. Build/typecheck PASS; chưa browser QA.
- 2026-09-29: Bộ asset Phong Tặng trước đó được chuẩn hóa thành PNG transparent 1500×500 với thân rộng 790px, sau đó được thay bằng sprite mới phía trên.
- 2026-09-28: Hoàn thiện 9 biến thể Vinh Quang Kỳ Đài: ba cấp khung, mỗi cấp dùng cùng chữ Quán Quân, Á Quân, Hạng Ba; bỏ Top 4/Top 3. Hiển thị theo lưới ba cột, cập nhật thông tin chi tiết theo cấp khung và tài liệu quy tắc.
- 2026-09-28: Bổ sung đủ 30 danh hiệu Phong Tặng (6 tên cho mỗi cấp khung 1–5), tái sử dụng năm asset tím chuẩn hóa; nhóm Phong Tặng và mục Tất cả hiển thị danh sách cuộn theo lưới 3 cột, giữ Vinh Quang Kỳ Đài ở trước. Cập nhật danh sách tên, ý nghĩa và mã nội bộ trong `docs/HONOR-SYSTEM.md`. Đây là catalog giao diện, chưa nối luồng phong/cấp danh hiệu.
- 2026-09-28: Chuẩn hóa 5 khung tím thành PNG transparent 1500×500, scale theo vùng thân đặt chữ, căn tâm vùng thân về cùng tâm canvas; UI dùng chung ô 3:1 với `object-fit: contain`. Không thể kiểm tra trực tiếp trong browser vì phiên làm việc không có browser khả dụng; đã kiểm tra trực quan 5 asset đầu ra.
- 2026-09-28: Tạo `docs/HONOR-SYSTEM.md` để lưu quy ước 23 khung danh hiệu, màu nhóm, thứ bậc, mapping nội dung, mã nội bộ và quy tắc hiển thị; liên kết tài liệu từ AGENTS.md.
- 2026-09-28: Khôi phục tên gốc cho năm danh hiệu phong tặng; dùng cùng cỡ chữ, màu chữ và khung 3:1 như danh hiệu Vinh Quang Kỳ Đài.
- 2026-09-28: Đổi tên năm khung trong Danh Hiệu Phong Tặng thành Danh Hiệu Phong Tặng 1–5; giữ nguyên thứ tự và ảnh.
- 2026-09-28: Thay nhánh snapshot thử nghiệm bằng `OPENING_MODE` (`clip`/`cover-transform`); mode cover giữ nguyên board live và mở bốn panel cố định bằng transform3d, gỡ cover sau 600ms. Build chờ xác nhận.
- 2026-09-28: Thu hitbox bốn chế độ Home về đúng bounding box alpha của từng ảnh thay vì ô vuông lớn; vùng trống quanh ảnh không còn nhận click. Typecheck/build PASS.
- 2026-09-28: Giữ nguyên reveal clip-path bung từ tâm cho cờ Tướng/Cờ Úp; thêm will-change cho scene để trình duyệt chuẩn bị layer cắt trước animation. Quân cờ/thẻ người chơi hiện sẵn bên dưới hiệu ứng. Typecheck/build PASS; chưa browser QA.
- 2026-09-28: Thu phạm vi bấm của bốn chế độ Home về vùng hình/nút; vùng trống bên dưới không còn kích hoạt chế độ. Typecheck/build PASS.
- 2026-09-28: Thu phạm vi click mở hồ sơ Home về avatar; tên và ELO không còn nằm trong nút mở hồ sơ. Typecheck/build PASS.
- 2026-09-28: Gom các asset còn nằm trực tiếp trong `src/assets/` vào `profile/`, `icons/`, `audio/` và `references/`; cập nhật import đang dùng. Typecheck/build PASS.
- 2026-09-28: Trong preview Chỉnh sửa avatar, bỏ viền lồng chiếm diện tích để ảnh tròn phủ hết lòng khung avatar; build PASS.
- 2026-09-28: Phóng icon Skin riêng bằng scale 125% để bù khoảng alpha trong ảnh và cân với các icon tab còn lại, không đổi kích thước thẻ; build PASS.
- 2026-09-28: Bỏ độ dịch xuống 2px của icon các tab Chỉnh sửa avatar để icon căn giữa cùng dòng chữ; build PASS.
- 2026-09-28: Hạ sáng góc chuyển sắc của khung thông tin tên trong ProfileDialog để tông nâu trầm gần với khung Danh hiệu bên dưới; build PASS.
- 2026-09-28: Thay biểu tượng sửa tên/địa chỉ bằng asset `903174a3-cfa1-4f7c-badc-1dd24d62c991.png`, hiển thị lớn hơn trong nút hiện có; build PASS.
- 2026-09-28: Đồng bộ nền khung tên với nền khung Danh hiệu (`#3b1d0b` → `#1b100b`); build PASS.
- 2026-09-28: Thêm ID khách gồm 9 chữ số, lưu ổn định trong localStorage, hiển thị nhỏ màu xám ở hồ sơ của mình và thêm nút sao chép; build PASS.
- 2026-09-28: Thêm 1 Thẻ đổi tên thử nghiệm lưu trong localStorage; yêu cầu thẻ để mở sửa tên, chỉ tiêu hao khi tên đổi thành công và khóa nút khi hết thẻ; build PASS.
- 2026-09-28: Hạ rõ tông khung tên xuống gradient nâu trầm `#2a160b` → `#1b100b` sau phản hồi rằng màu trước khó nhận ra; build PASS.
- 2026-09-28: Căn nội dung hai ô chỉ số về trái và kéo hàng Bạn bè/Theo dõi/Lượt thích full-width để các hàng trong khung hồ sơ bám cùng mép trái; build PASS.
- 2026-09-28: Tăng dòng ID hồ sơ từ 13px lên 15px và căn cả mã/nút sao chép về mép phải; build PASS.
- 2026-09-28: Gỡ sửa tên và bút cạnh tên khỏi hồ sơ; giữ nguyên sửa địa chỉ và nhập tên ở luồng vào phòng, gỡ yêu cầu Thẻ đổi tên khỏi profile; build PASS.
- 2026-09-28: Căn khung thông tin tên giữa theo chiều dọc với hàng hồ sơ, bỏ độ dịch lên trước đó ở cả hồ sơ chủ và hồ sơ xem; build PASS.
- 2026-09-28: Căn lại tâm khung thông tin tên theo cụm avatar và bảng danh hiệu bằng cách nâng 15px; build PASS.
- 2026-09-28: Đổi nền khung tên sang gradient ngang từ trái `#281408` sang phải `#1C0F08`; build PASS.
- 2026-09-28: Nhích khung tên lên thêm 6px, độ dịch dọc hiện tại là -21px; build PASS.
- 2026-09-27: Bấm avatar trong Hồ sơ Home mở màn Tùy chỉnh avatar; thử nghiệm một khung rồng đỏ trong lưới 6×3 (17 ô mẫu khóa), có xem trước, Hủy và Sử dụng. Typecheck/build PASS.
- 2026-09-27: Dịch toàn bộ hộp thoại Tùy chỉnh avatar lên 20px để viền trên gần mép hơn; không đổi vị trí Hồ sơ.
- 2026-09-27: Thu khung xem trước bên phải còn nhỉnh hơn nửa bề ngang khu trên; tăng khung avatar và căn giữa trong cột trái, giữ tên bên dưới.
- 2026-09-27: Dùng lại nền cảnh Hồ sơ sau khu preview avatar; thay nhãn tên tạm bằng asset khung tên gỗ và quân Tướng tròn, căn tên ở giữa ngay dưới avatar.
- 2026-09-27: Hoàn tác dịch chuyển hộp thoại; giữ nguyên vị trí avatar và kéo nền cảnh liền từ đầu khung tới hết vùng hồ sơ phía trên, lấp khoảng trống dưới tiêu đề.
- 2026-09-27: Kéo nền cảnh trong màn Tùy chỉnh avatar lên phủ cả khoảng trống dưới tiêu đề và hết hàng preview; kết thúc nền trước các tab, giữ nguyên vị trí avatar.
- 2026-09-27: Đưa nút Đóng của màn Tùy chỉnh ra góc trên bên phải, không đổi nút Hồ sơ; nhích khung tên avatar lên 4px.
- 2026-09-27: Dịch nút Đóng thêm 18px về góc phải; giảm khoảng trống dưới tiêu đề Hồ sơ để đẩy hàng hồ sơ lên 8px.
- 2026-09-27: Tăng cao tấm tiêu đề Tùy chỉnh avatar và nhích lên nhẹ để che phần chữ “Thông tin” lộ từ banner bên dưới, bỏ cảm giác hai khung chồng nhau.
- 2026-09-27: Tăng tấm tiêu đề tùy chỉnh thêm 5px và căn giữa lại theo chiều dọc.
- 2026-09-27: Dịch hộp thoại Tùy chỉnh lên 50px; dùng banner Hồ sơ làm khung tiêu đề duy nhất và thay chữ bằng lớp nền phẳng, bỏ viền lồng gây chồng khung.
- 2026-09-27: Điều chỉnh theo xác nhận: tăng chiều cao toàn hộp thoại Tùy chỉnh thêm 50px và căn giữa dọc; bỏ dịch chuyển lên 50px.
- 2026-09-27: Đặt asset 9a48f628-f3a9-4a19-ba3c-a7ae83b0b6c2 làm nền ảnh cho khu hồ sơ phía trên; khôi phục nền khung/panel đặc để bỏ hiệu ứng nhìn xuyên nền trang.
- 2026-09-27: Làm nền khung và panel Hồ sơ bán trong suốt để lộ cảnh Home phía sau theo ảnh tham chiếu; giữ nguyên bố cục và các thẻ nội dung.
- 2026-09-27: Thêm icon chỉnh sửa tên và địa chỉ căn phải trong hồ sơ Home; cho phép sửa inline, lưu bằng nút/Enter hoặc hủy bằng nút/Escape. Hồ sơ xem đối thủ không hiện chức năng chỉnh sửa.
- 2026-09-27: Dịch icon của hai ELO trên Home sang phải 2px và tăng số Cờ Úp lên cùng kiểu/cỡ 18px như Cờ Tướng.
- 2026-09-27: Dùng chung khung ELO ảnh của Cờ Tướng cho ô Cờ Úp bên phải trên Home; giữ biểu tượng và số ELO của Cờ Úp.
- 2026-09-27: Phóng khung danh hiệu dưới avatar Home theo tỷ lệ avatar 100/84, tăng chiều rộng từ 172px lên 205px và giữ căn giữa.
- 2026-09-27: Phóng avatar trên Home từ 84px lên 100px; căn lại khung Tân Binh để tiếp tục áp sát mép dưới avatar.
- 2026-09-27: Phóng khung ELO Cờ Tướng trên Home phủ kín ô 88×28px để khớp kích thước với ô Cờ Úp bên phải.
- 2026-09-27: Tăng số ELO Cờ Tướng bên trái trên Home lên kiểu hiển thị 18px Times New Roman, đồng bộ với ELO trong thẻ người chơi; giữ nguyên ELO Cờ Úp bên phải.
- 2026-09-27: Panel người xem chỉ hiển thị người không ngồi trên bàn. Kết thúc ván có người thắng và có người xếp hàng thì gửi lời mời “Đấu với …?” riêng cho người thắng; chấp nhận đổi ghế người thua với người đầu hàng và đưa người thua xuống cuối hàng, từ chối giữ nguyên hai ghế. Typecheck/build PASS.
- 2026-09-27: Hiệu ứng nảy dùng lại bóng nền sẵn có của mỗi quân; bóng dịch chéo xuống phải theo độ cao/tốc độ nảy, kéo dài chéo và tăng blur khi bay lên, giữ trên không 0,4 giây rồi thu ngược về trạng thái gốc trong lúc đáp 0,1 giây. Không tạo lớp bóng mới. Typecheck/build PASS.
- 2026-09-27: Tách hai nút Xếp hàng/Thoát hàng nguyên pixel từ `src/assets/image.png`; cho người vào bàn đầy/đang chơi tham gia xem, xếp hàng bằng nút ảnh, hiện ở khung vàng kèm số thứ tự và tự chuyển người đầu hàng lên ghế khi ghế trống. Người xem chat/xem nhưng không thao tác ván. Typecheck/build PASS.
- 2026-09-26: Gom asset từng nằm ở gốc `src/assets` vào `audio`, `boards/source`, `pieces/coden-codo-v1`, `icons`, `references` và `room-users`; cập nhật import, script cắt quân và ghi chú nguồn.
- 2026-09-26: TEST A debug tạm thời: `DEBUG_DISABLE_BACKGROUND_SCREENSHOTS` bật trong dev để ngăn screenshot worker tự render/mã hóa PNG khi snapshot đổi; bấm Chụp hình vẫn render theo yêu cầu. Production không bị ảnh hưởng; typecheck/build PASS.
- 2026-09-26: Giảm giật khi đi quân: bỏ chuyển động CSS `top` chồng lên animation transform, đưa quân bằng `translate3d` có compositor; memo hóa chat để tránh dựng lại danh sách tin nhắn theo nhịp đồng hồ. Build PASS.
- 2026-09-26: Tránh seek/reset hai MP4 mỗi lần đi quân; chỉ pause intro khi nó còn chạy và tua về đầu lúc bắt đầu ván tiếp theo. Build PASS.
- 2026-09-26: Phát MP4 `1790415939459_2137874395677077050_7229889354659670468` trước ở volume 0.9; preload MP4 còn lại im lặng rồi tua/bật tiếng ở mốc 1/5, để track đầu chạy đến hết. Build PASS.
- 2026-09-26: Tạo bong bóng like trực tiếp trong click handler qua Web Animations API, không chờ React cập nhật state/layout effect; giữ giới hạn 100ms, nút không đổi. Build PASS.
- 2026-09-26: Cho bong bóng like hiện ngay ở frame đầu thay vì fade-in trễ, rút thời gian bay còn 650ms để hết dồn hiệu ứng nhanh hơn; giữ nguyên nút. Build PASS.
- 2026-09-26: Giới hạn tạo bong bóng like ở một lần mỗi 100ms để tránh dồn hiệu ứng; không khóa, giảm sáng hoặc nhấp nháy nút. Build PASS.
- 2026-09-26: Khởi chạy từng bong bóng like đồng bộ ngay sau khi mount bằng useLayoutEffect; không xếp lịch tạo bóng sau khi ngừng bấm, các animation đang chạy vẫn tự hoàn tất. Build PASS.
- 2026-09-26: Khi bấm nút like, hiện bong bóng tròn chứa icon trắng bay lên và mờ dần; animation chạy trong component nút, tôn trọng reduced motion. Build PASS.
- 2026-09-26: Tách dấu like từ src/assets/images.jpg thành PNG trắng nền trong suốt tight-crop 186×200, gắn vào nút like; xác minh alpha và khung cắt. Build PASS.
- 2026-09-26: Vẽ lại icon like theo hình tham chiếu: cổ tay trái, ngón cái hướng lên và bàn tay bo tròn; giữ màu trắng. Build PASS.
- 2026-09-26: Đổi biểu tượng like sang màu trắng, giữ nguyên nền và viền vòng tròn. Build PASS.
- 2026-09-26: Thay icon like bằng silhouette ngón tay cái kiểu Facebook Like, giữ màu kem và vòng tròn phát sáng. Build PASS.
- 2026-09-26: Đổi icon tim thành ngón tay cái like và tăng vòng tròn lên 40px (compact 36px). Build PASS.
- 2026-09-26: Đổi nút like sang tim vàng kem, nền tròn xanh tối bán trong suốt và viền kem phát sáng. Build PASS.
- 2026-09-26: Thêm nút like cách avatar 15px, căn giữa theo chiều cao; người chơi thấy nút ở phía đối thủ, người xem thấy cả hai. Nút bật/tắt cục bộ, chưa gửi reaction cho phòng. Build PASS.

- 2026-09-26: Hoàn tác đổi tông màu thẻ người xem theo yêu cầu; khôi phục khung asset xanh xám ban đầu. Build PASS.
- 2026-09-26: Chỉnh nền và khung các thẻ người xem sang nền xanh đậm và viền vàng hợp tông khung chat; giữ nguyên asset khung và nội dung. Build PASS.
- 2026-09-26: Bo góc nhẹ bảng gợi ý và từng nút; đổi nền sang xanh giao diện hiện có để tăng độ phân biệt. Build PASS.
- 2026-09-26: Bảng gợi ý chat phủ hết vùng nội dung phía trên ô nhập; bỏ bo góc ở bảng và từng gợi ý để hiển thị trọn danh sách. Build PASS.
- 2026-09-26: Khi bấm emoji hoặc gợi ý lúc chat đang thu gọn, tự mở khung rồi hiển thị đúng picker; khung vẫn neo đáy. Build PASS.
- 2026-09-26: Chuyển mũi tên chat sang cyan xanh hơn, tăng chiều cao tam giác giữ nguyên bề rộng; khi thu gọn, ghim ô nhập xuống đáy trong khung để không nhảy lên. Build PASS.
- 2026-09-26: Đổi nút thu/mở chat sang tam giác đặc xanh ngọc, đỉnh cao hơn; giữ thao tác đổi chiều cao và neo đáy khung chat cố định. Build PASS.
- 2026-09-26: Bỏ nút tròn thu/mở ở góc trên khung chat; chuyển thành chevron xanh ngọc ở góc phải ngay trên ô nhập. Build PASS.
- 2026-09-26: Bỏ outline và focus ring mặc định trên ô nhập chat khi focus. Build PASS.
- 2026-09-26: Chuyển bóng icon gợi ý chat vào trong bong bóng bằng gradient đen đổ xuống; giữ thân icon trắng và các chấm dễ đọc. Build PASS.
- 2026-09-26: Tăng hai icon chat lên 24px và thu vùng nút xuống 28px để icon gần nhau hơn. Build PASS.
- 2026-09-26: Đổi icon mặt cười sang gradient vàng theo mẫu; icon chat chuyển trắng và thêm bóng nhẹ bên dưới. Build PASS.
- 2026-09-26: Tô kín icon biểu cảm và gợi ý chat bằng màu vàng hiện có, giữ chi tiết bên trong màu nền tối. Build PASS.
- 2026-09-26: Nâng khung chat compact lên 8px bằng cách tăng bottom offset; giữ nguyên kích thước và bố cục nội dung. Build PASS.
- 2026-09-26: Khắc phục preload screenshot Worker khi trình duyệt không giải mã được avatar SVG bằng PNG dự phòng có sẵn; lỗi asset khác giờ báo rõ tên. Build PASS; chưa kiểm tra runtime trong browser.
- 2026-09-26: Thay chụp DOM bằng screenshot renderer Worker/OffscreenCanvas; cache asset trong worker, gửi snapshot có version cho bàn cờ/quân cờ/hai người chơi/ELO/đồng hồ, giữ blob/version mới nhất bằng refs và chờ đúng version khi tải. Gỡ `html-to-image`. Typecheck/build PASS; browser QA không khả dụng.

- 2026-09-26: Giảm khựng khi chơi: không dựng screenshot nền khi đang chờ hoặc chơi; chỉ chuẩn bị sau 5 giây ở màn hình kết thúc, bỏ quét font toàn màn hình lúc mở game và tránh hai lượt `html-to-image` chồng nhau. Typecheck/build PASS.

- 2026-09-26: Khôi phục hình marker nước đi gốc từ `src/assets/image.png` (hash `y3X00btU` trùng marker cũ trong dist), giữ kích thước hiển thị gốc và bỏ CSS drop-shadow dư. Chặn thông báo store khi đồng hồ tick nhưng game chưa chạy/đã kết thúc, tránh render thừa 10 lần/giây. Typecheck/build PASS.

- 2026-09-26: Rà asset sau hiện tượng giật: `otron.png` bị thiếu đã được thay bằng marker tight-crop hiện có, build không còn import thiếu. Giảm tải main thread bằng cách chỉ chuẩn bị screenshot sau khi bàn cờ ổn định 1200ms và trình duyệt rảnh; vẫn giữ blob hợp lệ gần nhất để tải tức thì. Typecheck/build PASS.

- 2026-09-26: Giảm giật khi chọn quân: dùng marker đã tight-crop 480×475 thay cho ảnh cũ 1254×1254 có vùng trong suốt lớn và bỏ `drop-shadow` GPU trên từng marker nước hợp lệ; ảnh marker vốn đã có hiệu ứng sáng. Typecheck/build PASS.

- 2026-09-26: Khung chat dùng nền, viền và bóng của khung danh sách người chơi; bỏ nền tròn trắng quanh icon và đổi màu icon sang vàng kem #f0c995. Sửa import marker nước đi trong `Board.tsx` sang asset hiện có `move-indicator-dot-user.png`; typecheck/build PASS.

- 2026-09-26: Mở rộng chat để cách bàn cờ và viền ngoài 8px; đổi khung ngoài thành hình chữ nhật, giảm khoảng tin nhắn còn 6px và giảm chiều cao ô nhập 10px. Typecheck/build PASS.

- 2026-09-26: Cố định khung chat vào đáy cột bên phải để cạnh dưới ngang viền dưới khu vực game; chiều cao tăng về phía trên, compact cũng bỏ khoảng lệch đáy 15px. Typecheck/build PASS.

- 2026-09-26: Tăng thêm 20px chiều cao khung chat đang mở; tăng khoảng đệm trên vùng tin nhắn từ 4px lên 12px và giảm khoảng cách giữa các tin từ 15px xuống 10px. Typecheck/build PASS.

- 2026-09-26: Tăng thêm 20px chiều cao khung chat đang mở; chuyển nút thu gọn lên góc khung và giảm padding đầu vùng tin nhắn từ 15px xuống 4px để nội dung sát viền hơn. Typecheck/build PASS.

- 2026-09-26: Tăng thêm 10px chiều cao khung chat đang mở; giữ nội dung cách đầu vùng tin nhắn 15px và tăng khoảng cách giữa các tin lên 15px. Typecheck/build PASS.

- 2026-09-26: Theo ảnh tham chiếu, đẩy khung chat lên 15px, thu thêm 10px, tăng khoảng cách trên của tin nhắn lên 15px và khoảng cách giữa tin nhắn lên 10px; bỏ vạch ngăn, thêm nền tròn trắng cho icon. Typecheck/build PASS.

- 2026-09-26: Theo yêu cầu, đảo ngược lần hoàn tác trước: ô chat trở lại hẹp hơn 10px/cao hơn 10px, ba gợi ý nằm trong popup từ icon chat cạnh emoji. Cập nhật regression mở popup rồi gửi gợi ý. Typecheck/build PASS.

- 2026-09-26: Ô chat hẹp 10px và cao thêm 10px. Thu ba gợi ý thành popup mở từ icon bong bóng cạnh icon mặt cười; từng gợi ý thấp hơn trước và popup rộng hơn khung 3px. Cập nhật regression mở popup rồi gửi gợi ý. Typecheck/build PASS.

- 2026-09-26: Làm lại ô chat theo ảnh tham chiếu: khung xanh đậm viền vàng, ba gợi ý Chào bạn!/Nước đi hay!/Chúc bạn chơi vui! dạng nút có icon hội thoại và mũi tên; ô nhập bo tròn, nút gửi hình máy bay giấy. Giữ lịch sử tin, gửi nhanh, emoji, thu gọn/mở rộng và responsive. Cập nhật UI regression theo gợi ý luôn hiển thị khi mở chat. Build cần chạy.

- 2026-09-26: Chụp hình dùng Blob chuẩn bị nền ở idle sau mỗi thay đổi board và sau khi animation kết thúc; Blob mới lưu trong ref, Blob hợp lệ trước đó vẫn dùng trong lúc bản mới đang tạo. Click chỉ tạo Object URL/tải ngay, không gọi html-to-image hoặc cập nhật state khi thành công. pixelRatio 1; ghi Performance measure và console cho thời gian tạo Blob/click-to-download. Typecheck/build PASS; chưa có số đo runtime trong browser.

- 2026-09-26: Chụp hình dùng Blob chuẩn bị nền ở idle sau mỗi thay đổi board và sau khi animation kết thúc; Blob mới lưu trong ref, Blob hợp lệ trước đó vẫn dùng trong lúc bản mới đang tạo. Click chỉ tạo Object URL/tải ngay, không gọi html-to-image hoặc cập nhật state khi thành công. pixelRatio 1; ghi Performance measure và console cho thời gian tạo Blob/click-to-download. Typecheck/build PASS; chưa đo số liệu thực tế trong browser.

- 2026-09-26: Nút Chụp hình chụp trực tiếp `#gameScreen` bằng html-to-image `toBlob` ở pixelRatio 2, tạo Object URL và tự tải `co-tuong-[timestamp].png`, sau đó thu hồi URL. Không mở chọn vùng/preview/tab mới; dùng ref chống bấm lặp để thao tác không cập nhật state/re-render bàn cờ; thêm thông báo lỗi asset CORS. Build cần chạy.

- 2026-09-26: Tối ưu tiếp nút chụp ảnh: chuẩn bị sẵn CSS font ngay khi vào bàn và tái sử dụng lúc chụp, đồng thời xuất ở đúng kích thước màn hình (pixelRatio 1) để giảm thời gian dựng PNG khi bấm. Build cần chạy.

- 2026-09-26: Chụp màn hình bắt đầu ngay trong thao tác bấm: preload html-to-image khi mở bàn cờ, bỏ chờ fonts.ready và gọi dựng ảnh trước khi cập nhật trạng thái nút đang chụp. Giữ pixelRatio 1.5; build cần chạy.

- 2026-09-26: Tăng tốc chụp màn hình ván cờ bằng cách giảm pixelRatio từ 2 xuống 1.5; giảm khoảng 44% số pixel render trong khi ảnh vẫn xuất lớn hơn kích thước hiển thị. Cập nhật kỳ vọng test hiện có; build cần chạy.

- 2026-09-25: Rà các đoạn video có chuyển động (bỏ khung đầu còn nút phát); quân lướt liên tục qua giao điểm. Bổ sung nhấc/nghiêng nhẹ ở 76% ô cuối; tới đích trong 125ms. Khi ăn quân, nhấc cao 124px, phóng 1.2×, tăng bóng đổ, nghiêng 42° rồi đập xuống trong 250ms; clock chờ đúng 125ms hoặc 375ms. Build cần chạy lại; chưa QA trực quan trên browser.

- 2026-09-24: Cắt và thay toàn bộ 14 asset quân từ hai bộ ảnh người dùng cung cấp; mỗi quân crop sát alpha, mapping đủ 7 loại mỗi bên. Bỏ filter mực đen và drop-shadow CSS vì màu/bóng đã có sẵn trong PNG.
- 2026-09-24: Tạo và áp dụng thử riêng hàng 5 Tốt đỏ bằng asset `red-soldier-maple-v2.png` (902×930, crop alpha sát): gỗ sáng, chữ/viền đỏ và bóng gọn theo ảnh mẫu; không chồng thêm CSS shadow, các loại quân khác giữ nguyên.
- 2026-09-24: Thay bàn v3: bỏ viền đen ngoài cùng, cân khung gỗ trên/dưới bằng hai bên và crop sát 1141×1306; đo lại 90 giao điểm cùng tỷ lệ layout, quân/marker/vùng bấm giữ nguyên kích thước hiển thị.
- 2026-09-24: Thay bàn bằng asset gỗ phong sáng tạo từ ảnh mẫu (`xiangqi-board-light-maple-v2.png`, crop sát 1078×1250); đo lại 90 giao điểm, tỷ lệ bàn/quân/vùng bấm, bỏ watermark cũ và chỉnh bóng quân mềm gọn theo mẫu. Logic game giữ nguyên.
- 2026-09-24: Chuẩn hóa mọi nước đi local về đúng 250ms bất kể khoảng cách (nước gần có vận tốc chậm hơn, nước xa nhanh hơn); nước ăn bắt đầu nhấc từ 40% quãng animation, đạt cao 18px ở 72% rồi đáp đúng hạn 250ms.
- 2026-09-24: Sửa quỹ đạo ăn quân thành đường thẳng đúng tâm ô đích: bỏ lệch ngang 4px và xoay 3°, chỉ còn nhấc dọc 11px rồi đáp tại cùng tọa độ.
- 2026-09-24: Làm chậm riêng pha cong lên/đập xuống của animation ăn quân thêm 180ms; quãng bay tới giữ tốc độ cũ và completeAnimation chờ đúng tổng thời lượng để quân bị ăn không biến mất sớm.
- 2026-09-24: Thêm animation ăn quân nhiều nhịp: quân bay tới 62%, nhấc cao 11px và lệch chéo 4px ở 84%, rồi đập xuống mục tiêu; chỉ chạy khi ô đích có quân, tôn trọng prefers-reduced-motion và quân ăn giữ z-index trên cùng.
- 2026-09-24: Gỡ hoàn toàn hành vi máy tự gửi yêu cầu hoàn tác và dừng đồng hồ cho yêu cầu đó; hoàn tác do người chơi với máy và yêu cầu hoàn tác phòng online vẫn giữ nguyên.
- 2026-09-24: Đặt quân đang chạy animation ở z-index 20 để khi ăn quân luôn nằm trên quân bị ăn; sau animation, quân trở lại thứ tự lớp theo hàng hiển thị.
- 2026-09-24: Đưa marker/chấm nước đi xuống dưới lớp quân để glow không làm mờ mặt quân; quân được chọn nhấc lên 6px, scale 1.04 và giảm nhẹ glow ngoài, giúp quân nổi rõ trên hiệu ứng.
- 2026-09-24: Làm lại marker theo ảnh mẫu: chấm nước đi 13px có tâm cam/vòng vàng sáng và glow rõ; khung chọn quân 60px với bốn góc 18px, nét 4px trắng vàng và viền sáng cam, không phủ mặt quân.
- 2026-09-24: Tăng độ rõ bóng ngoài quân: offset 3×5px, opacity 55%, giảm blur còn 1px để bóng đậm và gọn hơn thay vì nhòe; áp dụng đồng nhất quân đỏ/đen.
- 2026-09-24: Làm nhẹ bóng ngoài của toàn bộ quân đỏ/đen: giảm độ lệch 4×6px xuống 3×4px và opacity từ 60% xuống 35%; giữ nguyên asset, chữ, viền, màu và bộ lọc chữ quân đen.
- 2026-09-24: Làm rõ phong cảnh nền màn chơi: bỏ blur 0.6px, tăng nhẹ contrast/saturation lên 1.08 và giảm độ tối viền phủ từ alpha 0x33 xuống 0x1f; không đổi bàn, quân hay panel.
- 2026-09-24: Sửa bóng quân phía trên phủ lên quân phía dưới: bỏ z-index toàn cục của quân được chọn/đang chạy và xếp lớp quân theo hàng hiển thị, có hỗ trợ bàn đảo chiều; quân luôn nằm trên bóng của hàng phía trên.
- 2026-09-24: Tăng kích thước quân cờ thêm 2px mỗi chiều thành 50.6×54px theo yêu cầu; giữ nguyên tâm giao điểm, tọa độ bàn và vùng bấm.
- 2026-09-24: Sửa hai quân ở hàng liền nhau bị chồng hình bằng cách giới hạn asset quân còn 48.6×52px theo đúng tỷ lệ cũ; chiều cao không còn vượt bước hàng nhỏ nhất, tâm giao điểm và vùng bấm giữ nguyên.
- 2026-09-24: Sửa quân ngoài biên bị gờ gỗ lấn bằng cách thu vùng 90 giao điểm vào 5px ở bốn mép và nội suy lại hàng/cột; kích thước quân giữ nguyên, vùng bấm và marker đi theo tọa độ mới.
- 2026-09-24: Bỏ lớp bóng nâu CSS vừa thêm để quân dùng lại bóng tự nhiên trong asset; giảm nhẹ glow chọn quân từ 3/7px xuống 2/5px, giữ kích thước quân hiện tại.
- 2026-09-24: Tăng quân cờ lại 1px mỗi chiều (55.26×59.14px) và bổ sung bóng đổ nâu nhẹ phía dưới; hiệu ứng phát sáng khi chọn quân vẫn được giữ.
- 2026-09-24: Giảm riêng kích thước quân cờ thêm 2px theo cả chiều rộng và chiều cao (54.26×58.14px trong lớp tọa độ), giữ nguyên kích thước bàn và tâm giao điểm.
- 2026-09-24: Bù lại hệ số phóng 3% của bàn mới để quân cờ giữ đúng kích thước hiển thị trước khi tăng bàn (56.26×60.14px trong lớp tọa độ); chỉ bàn và khoảng cách được mở rộng.
- 2026-09-24: Hoàn tác phần khung gỗ nới thêm 8px và tăng tiếp kích thước toàn bàn khoảng 3%; giữ nguyên tỷ lệ, lưới và vị trí quân.
- 2026-09-24: Làm dày khung gỗ quanh bàn thêm 8px mỗi cạnh để tạo khoảng thở giữa quân ngoài cùng và mép khung; giữ nguyên lưới, kích thước quân và tỷ lệ bàn.
- 2026-09-24: Tăng kích thước hiển thị bàn gỗ mới khoảng 3%, giữ nguyên tỷ lệ và tọa độ 90 giao điểm.
- 2026-09-24: Thay riêng asset bàn bằng bàn gỗ trang trí sắc nét theo ảnh mẫu (1222×1287), đúng 9×10 giao điểm; đo lại tọa độ quân/vùng bấm, bỏ lớp khung kéo dài cũ vì khung đã tích hợp trong ảnh. Quân và marker giữ nguyên.
- 2026-09-24: Tăng nhẹ nút Sẵn sàng từ 190px lên 205px (compact 150px lên 162px); bỏ hoàn toàn transform nhấc 14px và nghiêng 18° của quân đang chọn, giữ glow chọn quân.
- 2026-09-24: Làm rõ riêng chữ quân đen bằng lớp mực #050606 opacity 82% trong vùng giữa mặt quân; mặt nạ loại trừ vòng viền và phần gỗ, quân đỏ giữ nguyên.
- 2026-09-24: Hoàn tác đổi màu vòng viền quân đen sang #F8D394; quân đen trở về nguyên màu asset AI v1 và xóa bộ lọc vòng viền vừa thêm.
- 2026-09-24: Sửa bộ lọc vòng viền quân đen để bao gồm mép mực khử răng cưa ngả nâu và tăng độ phủ màu thay thế, tránh sót hai mép đen quanh màu #F8D394.
- 2026-09-24: Áp dụng màu #F8D394 cho vòng viền khắc bên trong quân đen bằng bộ lọc giới hạn vùng vòng viền và pixel mực; loại trừ chữ ở giữa và gỗ bên ngoài.
- 2026-09-24: Nới ngang bàn thêm 3% và giảm cao thêm 3%, cập nhật đồng bộ tỷ lệ nền, giao điểm và vùng bấm; giữ kích thước quân.
- 2026-09-24: Hoàn tác hiệu ứng làm đậm quân đen, dùng lại nguyên màu asset AI v1 khi tạo chung với quân đỏ; giữ kích thước hiện tại.
- 2026-09-24: Giới hạn bộ lọc mực đen vào vùng chữ giữa mặt quân, loại vòng viền khắc khỏi vùng làm đậm theo yêu cầu; giữ nguyên màu gỗ và vòng viền.
- 2026-09-24: Bỏ contrast toàn ảnh quân đen; dùng SVG filter khoanh vùng pixel tối gần trung tính để làm đậm mực đen, loại trừ sắc gỗ ấm khỏi vùng điều chỉnh.
- 2026-09-24: Tăng tương phản hiển thị riêng quân đen 18% để chữ và vòng viền đậm hơn; giữ nguyên ảnh nguồn và quân đỏ.
- 2026-09-24: Đổi khung quân thành 58×62px; bỏ overflow-hidden và paint containment tại mặt bàn/khung ngoài để không cắt quân sát mép hoặc khi nhấc lên.
- 2026-09-24: Thay toàn bộ 14 loại quân bằng bộ AI cùng phong cách Tốt đỏ đã duyệt; bỏ preview riêng một quân, tăng khung quân từ 58×58px lên 60×60px. Đã đối chiếu trực quan cả bộ chữ đỏ/đen.
- 2026-09-24: Áp dụng thử ảnh AI mới riêng cho quân Tốt đỏ trung tâm (id red-6-4) trên bàn Cờ Tướng; ảnh theo quân khi di chuyển, các quân khác giữ nguyên.
- 2026-09-24: Nới ngang mặt bàn 4%, giảm cao 3%; cập nhật đồng bộ tọa độ quân, marker và vùng bấm theo tỷ lệ mới, giữ nguyên khung quân vuông.
- 2026-09-24: Làm rõ toàn bộ 14 asset quân cờ bằng upscale bicubic 3× và sharpen nhẹ có bảo toàn alpha/chữ Hán; lưu bản `*-hd.png` và chuyển ChessPiece sang dùng bộ HD.
- 2026-09-24: Tăng thêm kích thước bàn cờ bằng cách giảm khoảng dự phòng dọc từ 18px còn 4px; lớp bàn và tọa độ giao điểm phóng đồng bộ nên khoảng cách giữa các quân rộng hơn.
- 2026-09-24: Tăng nhẹ diện tích hiển thị bàn cờ bằng cách giảm khoảng dự phòng dọc 12px; sửa vùng ảnh quân từ 56×59px thành vuông 58×58px để quân tròn, không còn bị kéo dọc.
- 2026-09-24: Tạo asset bàn cờ v4 giữ nguyên 1173×1341px và toàn bộ hình học/khung gỗ, chỉ làm đường lưới bên trong nhạt hơn và nâu ấm hơn; Board đã chuyển sang dùng asset mới.
- 2026-09-24: Đổi hiệu ứng chọn quân/nước hợp lệ sang tông cam đỏ phát sáng theo ảnh mẫu: quân chọn có khung góc và glow, ô trống có chấm sáng, vị trí ăn quân có khung góc cùng màu.
- 2026-09-24: Tăng độ bay của quân đang chọn từ 8px lên 14px, giữ độ nghiêng 18°.
- 2026-09-24: Tăng độ nổi của animation chọn quân từ 4px lên 8px và độ nghiêng phối cảnh từ 10° lên 18° theo yêu cầu.
- 2026-09-24: Thêm animation chọn quân trên Board: quân được nhấc thấp 4px và nghiêng 10° theo phối cảnh; phe gần người xem nghiêng về trước, phe đối diện nghiêng ngược lại, hỗ trợ cả bàn đảo chiều và motion-reduce.
- 2026-09-24: Tăng nhẹ thẻ tên PlayerCard từ 158×35px lên 170×39px, chữ tên từ 18px lên 20px; compact tăng thành 120×28px và chữ 14px.
- 2026-09-24: Tăng padding ngang của thẻ ELO tự ôm nội dung từ 8px lên 14px ở desktop và compact.
- 2026-09-24: Bỏ chiều rộng cố định của thẻ ELO trong PlayerCard; thẻ tự ôm cụm icon–số với padding ngang đúng 8px ở desktop và compact.
- 2026-09-24: Tăng chữ ELO lên 18px (compact 13px), khung cao 37px (compact 30px); nền khung phủ đầy kích thước để chiều cao hiển thị tăng theo container.
- 2026-09-24: Sửa các chữ số ELO cao thấp khác nhau do Georgia: dùng Times New Roman và lining-nums riêng cho số trong PlayerCard; giữ nguyên kích thước thẻ.
- 2026-09-24: Tăng thẻ ELO trong PlayerCard đúng 8px chiều rộng và 5px chiều cao thành 130×33px (compact 96×26px); bỏ dịch chuyển riêng và căn số ELO vào giữa theo chiều dọc.
- 2026-09-24: Thu gọn đồng bộ thẻ ELO trong PlayerCard còn 122×28px (compact 88×21px), giảm icon/chữ và nâng số 1px để icon–số thẳng hàng theo thị giác.
- 2026-09-24: Thu chiều ngang thẻ ELO trong PlayerCard từ 142px xuống 134px (compact 96px), bỏ phần đệm lệch và căn giữa theo chiều dọc cụm biểu tượng–số.
- 2026-09-24: Tăng nhẹ thẻ ELO trong PlayerCard lên 142×44px (compact 100×31px), đồng thời tạo khoảng cách 10px giữa biểu tượng và số ELO để nội dung thoáng, rõ hơn.
- 2026-09-24: Xóa biểu tượng quân đỏ vẽ sẵn khỏi asset nền ELO để không còn chồng với biểu tượng HTML theo phe; tăng khung ELO trong PlayerCard từ 112×35px lên 126×39px (compact 90×28px).
- 2026-09-23: Thiết kế lại khung tên và ELO theo mẫu gỗ nâu/viền vàng, giữ tên và số bằng HTML động; áp dụng khung tên chung cho PlayerCard trong ván và hồ sơ nhanh ngoài Home.
- 2026-09-23: Thêm dải xanh “Sẵn sàng” nền trong suốt đè ngang giữa avatar theo ảnh mẫu; hiển thị riêng trên avatar của thành viên online đã bấm Sẵn sàng trong lúc chờ đối thủ.
- 2026-09-23: Thay asset nút “Sẵn sàng” bằng mẫu kem-vàng mới người dùng cung cấp; tách nền bàn cờ, giữ alpha thật và crop sát còn 1936×499px, không đổi hành vi nút.
- 2026-09-23: Tách nút “Sẵn sàng” từ ảnh người dùng cung cấp thành PNG nền trong suốt, crop sát 2048×669px và thay nút dựng CSS ở giữa bàn; trạng thái “Đang chờ đối thủ…” vẫn dùng chữ động hiện có.
- 2026-09-23: Thêm `capture-piece.wav` từ file người dùng cung cấp và phát riêng cho nước ăn quân; nước đi không bắt quân tiếp tục dùng âm thanh đi quân hiện tại.
- 2026-09-23: Đưa Máy · Cơ bản về thời gian đi 500ms; luôn đặt người chơi ở cột trái và đảo tọa độ hiển thị bàn khi người chơi cầm Đen để quân Đen nằm dưới, không đổi tọa độ/luật game.
- 2026-09-23: Sửa luồng máy xin Đi lại sau nước thứ hai: khi người chơi đồng ý, hoàn cả hai nửa-nước và khôi phục snapshot thời gian của cả hai bên.

- 2026-09-23: Điều chỉnh demo Máy · Cơ bản: khi bấm Sẵn sàng, người chơi chuyển sang Đen để máy Đỏ đi trước; máy chờ 4 giây mỗi lượt và chỉ gửi yêu cầu Đi lại sau khi hoàn tất nước thứ hai của máy (lịch sử đạt 3 nửa-nước), không gửi sau nước mở màn.
- 2026-09-23: Tăng thời gian chờ trước mỗi nước của Máy · Cơ bản từ 550ms lên 4000ms để dễ quan sát UI clock/vòng lượt/popup; Pikafish giữ delay tối thiểu 550ms.
- 2026-09-23: Snapshot Đi lại giờ lưu mốc đầu lượt: khi hoàn một nước sẽ trả lại toàn bộ thời gian người đó đã dùng cho nước bị hủy; hoàn hai nước trả lại thời gian của cả hai bên và đặt `turnElapsed` về 0. Áp dụng chung engine local/máy và server online.
- 2026-09-23: Dấu X trên popup Đi lại là vùng button Từ chối. Trong thời gian popup mở, local/máy dừng tick và online server cập nhật `lastClockUpdate` mà không trừ giờ/không tăng `turnElapsed`, nên đồng hồ và vòng avatar đứng yên; đóng popup đặt lại mốc clock để không cộng dồn thời gian chờ. Overlay giảm còn alpha khoảng 15% và bỏ blur.
- 2026-09-23: Bỏ transition fade/scale của popup Đi lại theo yêu cầu; popup xuất hiện tức thì, giữ kích thước 520px và overlay alpha 40%.
- 2026-09-23: Thu popup Đi lại desktop từ tối đa 760px xuống 520px; giảm overlay từ alpha 80% xuống 40%, blur còn 1px; thêm hiệu ứng mở opacity + scale 90→100% trong 300ms.
- 2026-09-23: Thêm luồng xem thử popup Đi lại ở Máy · Cơ bản: sau nước đầu tiên của máy trong mỗi ván, máy gửi một yêu cầu; Từ chối giữ bàn, Cho phép hoàn đúng nước máy vừa đi và không trừ lượt Đi lại của người chơi.
- 2026-09-23: Thay overlay yêu cầu Đi lại bằng popup gỗ từ ảnh người dùng; lưu `src/assets/takeback/takeback-dialog.png`, đồng thời cắt riêng hai nút `takeback-decline.png`/`takeback-accept.png`, tạo alpha thật ở góc và dùng chúng làm button HTML giữ nguyên logic socket.
- 2026-09-23: Thu khoảng cách giữa các dòng chat từ 8px xuống 4px và giảm padding dọc thẻ chat còn 2px.
- 2026-09-23: Chat đổi tên và nội dung về cùng một hàng cạnh avatar; tăng chữ tin nhắn và thông báo vào phòng lên 15px.
- 2026-09-23: Đổi danh sách chat: tin người chơi hiển thị avatar 32px, tên ở dòng trên và nội dung ở dòng dưới; thông báo hệ thống chỉ render sự kiện `đã vào phòng`, không render avatar và ẩn các dòng rời phòng/từ chối/đồng ý khỏi khung chat.
- 2026-09-23: Đổi đồng hồ avatar theo mẫu người dùng: lớp tròn phủ xanh trên avatar, viền neon xanh dày nằm đúng bounding box, viền vàng mảnh phía trong và lát tối chạy từ vị trí 12 giờ theo thời gian lượt.
- 2026-09-23: Khôi phục viền xanh đậm báo người đang tới lượt quanh avatar; viền dùng inset 0 nên vẫn bằng đúng kích thước avatar, không tràn ra ngoài. Vòng tiến trình SVG mượt được giữ bên dưới.
- 2026-09-23: Sửa chiều tiến trình vòng xanh avatar: đầu lượt vòng hiện đầy đủ và rút dần theo 60 giây, thay vì bị `strokeDashoffset` che toàn bộ ngay lúc chuyển lượt.
- 2026-09-23: Bỏ bảng thông báo kết quả/chiếu bí giữa bàn; kết quả chỉ còn mặt cười/mặt khóc trên avatar và sau 2 giây hiện Sẵn sàng. Thay vòng thời gian pseudo-element tràn mép bằng vòng SVG đúng kích thước avatar, stroke 4px, chuyển `stroke-dashoffset` tuyến tính 300ms; trạng thái vòng và màu đồng hồ đổi trong 100ms khi chuyển lượt. Typecheck PASS; UI kết quả PASS 2/2; store/room PASS 22/22. Chưa browser QA vì không có phiên trình duyệt khả dụng.
- 2026-09-23: Khi ván kết thúc có người thắng, avatar bên thắng phủ mặt cười animation và bên thua phủ mặt khóc animation; icon desktop 122px, nhỏ hơn avatar 10px, đồng thời có tỷ lệ compact/short-desktop. Thông báo kết quả giữ 2 giây rồi nhường chỗ cho nút Sẵn sàng. Local/máy bấm để khởi động ván mới; online người đầu chuyển phòng về ready và chờ người thứ hai. Room test PASS 17/17, UI kết quả PASS 2/2.
- 2026-09-23: Loại bỏ nháy mờ của bàn sau mỗi nước bằng cách giữ lớp nền bàn trên compositing layer ổn định và cô lập repaint. Audio đi quân dùng một instance preload dùng lại; trước âm mới sẽ dừng/tua âm cũ để tránh lần đầu phát trễ rồi chồng tiếng. Typecheck PASS; regression store/computer PASS 10/10.
- 2026-09-23: Điều chỉnh hạn mức yêu cầu Đi lại online: gửi yêu cầu sẽ trừ một lượt; bị từ chối hai lần thì hết quyền gửi, còn khi đối thủ đồng ý hoàn tác thì người yêu cầu được nạp lại đủ hai lượt. Regression room/store PASS 22/22.
- 2026-09-23: Sửa điều kiện nút Đi lại: đầu ván luôn mờ và chỉ bật sau khi chính người chơi đã đi đủ nước để hoàn tác. Bổ sung Đi lại cho ván máy/local: tự lùi một nước khi máy chưa đáp hoặc hai nước khi máy đã đáp, tối đa hai lần/ván; online đồng bộ `moveCount` để client không cho gửi yêu cầu sớm. Test store + room PASS 22/22; typecheck/build PASS và `dist/` đã cập nhật.
- 2026-09-23: Đổi nút tròn thành yêu cầu Đi lại thật, icon reset mới 30×30px. Online: mỗi bên tối đa hai lần yêu cầu/ván (tính khi gửi), đối thủ nhận overlay che màn hình với Đồng ý/Từ chối; server khóa nước đi khi chờ phản hồi. Đồng ý hoàn tác một nước nếu đối thủ chưa đi, hoặc hai nước nếu đã đi và lượt quay lại người yêu cầu; server giữ lịch sử tối đa 500 trạng thái và là nguồn sự thật. Local/máy tạm khóa nút vì không có đối thủ socket duyệt. `tests/rooms.test.ts` PASS 17/17; typecheck và production build PASS, `dist/` đã cập nhật.

- 2026-09-23: Dịch cụm Cầu hòa/Xin thua sang trái 12px và thêm nút tròn Đi lại ở bên phải, icon reset SVG 20×20px. Nút gọi luồng reset hiện có cho local/máy; khi online đang chơi nút bị khóa để giữ quy tắc server không reset ván đang diễn ra. Compact đặt nút nối tiếp trong hàng hành động. Typecheck/build PASS.

- 2026-09-23: Nâng thêm 10px đồng hồ và cụm Cầu hòa/Xin thua trên PlayerCard desktop; giữ nguyên tên/danh hiệu. Panel người xem nâng theo 10px để giữ khoảng cách 10px dưới Xin thua. Typecheck/build PASS.

- 2026-09-23: Nâng thêm 8px khung tên và đồng hồ PlayerCard; nâng cụm Cầu hòa/Xin thua cùng 8px trên desktop. Panel người xem nâng theo 8px để tiếp tục giữ khoảng cách 10px dưới Xin thua; compact giữ vị trí nút cố định cũ. Typecheck/build PASS.

- 2026-09-23: Nâng riêng khung tên PlayerCard thêm 5px (tổng 20px so với vị trí gốc) và đồng hồ lên 5px; giữ nguyên danh hiệu, Cầu hòa và Xin thua. Typecheck/build PASS.

- 2026-09-23: Nâng danh hiệu PlayerCard thêm 2px (chồng 10px vào đáy avatar; compact 7px). Lấy tỷ lệ PlayerCard 132px avatar/270px danh hiệu làm chuẩn cho các vị trí avatar có danh hiệu: Home dùng avatar kỳ sĩ thật 84px + danh hiệu 172px/chồng tỷ lệ 6px; Hồ sơ dùng avatar 128px + danh hiệu 262px/chồng 10px. Avatar nhỏ trong chat/người xem/danh sách xã hội không thêm danh hiệu. Typecheck/build và regression liên quan PASS.

- 2026-09-23: Panel người xem xếp thẻ theo hàng ngang và tự wrap khi hết chỗ. Người chơi online có `ready` được xem là đang chờ đấu: hiện icon đồng hồ cát vàng bên trái avatar và được sắp lên đầu; mẫu local đánh dấu `An` để xem trực tiếp. Typecheck/build và regression panel PASS.

- 2026-09-23: Gộp panel người xem thành một vùng duy nhất, bỏ tiêu đề/khu chờ/đường chia; mép trên panel đặt thấp hơn đáy nút Xin thua 10px theo bố cục desktop. Local hiển thị ba thẻ mẫu cùng kích thước hiện tại với tên ngắn/vừa/dài (`An`, `Picolozz`, `Nguyễn Hoàng Minh Khôi`) để đối chiếu; online tiếp tục dùng thành viên snapshot thật. Typecheck/build PASS; regression được đồng bộ theo nhãn truy cập mới.

- 2026-09-23: Hoàn tác cách chồng danh hiệu sai: danh hiệu đặt ngay dưới avatar rồi kéo lên đúng độ dày viền avatar (8px desktop, 5px compact). Panel người xem đổi tỷ lệ khu chờ/khu trong phòng từ 2:3 thành 1:3 để khu dưới chiếm 75%; thẻ user giảm đúng 8px chiều cao qua avatar 36→28px. Typecheck/build và regression panel PASS.

- 2026-09-23: Đặt danh hiệu chồng vào phần dưới bên trong avatar, cách mép ngoài theo padding khung (desktop 8px). Khu Đang chờ ghép đấu để trống hoàn toàn khi chưa có dữ liệu, đường phân cách tăng độ rõ; danh sách Người trong phòng hạ 8px và giữ avatar/tên căn giữa trong thẻ. Typecheck/build và regression panel PASS.

- 2026-09-23: Sửa lại PlayerCard theo ảnh phản hồi: danh hiệu nằm dưới avatar với mép trên chạm mép dưới avatar; panel người xem hạ thêm 80px để mép trên nằm dưới ELO 10px trong bố cục hiện tại. Thẻ người chơi trong panel thu avatar còn 36px, cao gọn hơn, rộng ôm nội dung và giữ padding ngang 8px. Typecheck/build và regression panel PASS.

- 2026-09-23: Nút Người trong phòng trên bàn cờ mở panel tách khu Đang chờ ghép đấu (nhỏ hơn) và Người trong phòng (lấy snapshot/local state thật); mỗi người là thẻ avatar/tên. Panel bắt đầu thấp hơn ELO 10px, lấp chiều rộng cột trái để cách bàn đúng gap 10px và dùng đúng nền `#061e2280`/viền trong suốt của Chat. Server hiện chưa cung cấp hàng chờ ghép đấu toàn cục nên khu trên hiển thị trạng thái dữ liệu chưa có. Mép dưới danh hiệu PlayerCard chạm mép trên avatar; tên/ELO vẫn nâng 15px. Typecheck/build và regression panel PASS.

- 2026-09-23: Hoàn tác các thử nghiệm riêng của Tốt đỏ về `red-soldier-reference-v12-tight.png`, đồng bộ lại tông gỗ, mặt, vòng và chữ với bộ quân đỏ hiện tại; vẫn hiển thị 54×57px. Các quân khác giữ nguyên.
- 2026-09-23: Kéo khung/vòng trong của Tốt đỏ xuống thêm 2px: asset `red-soldier-reference-v17-ring-down-4px-tight.png` giữ mép trên `y=11`, đáy vòng tại `y=155` (tổng cộng thấp hơn bản gốc 4px). Các phần khác giữ nguyên.
- 2026-09-23: Tốt đỏ giữ cùng kích thước hiển thị 54×57px và alpha 200×200px như các quân đỏ khác; asset `red-soldier-reference-v16-ring-down-2px-tight.png` giữ mép trên vòng đỏ tại `y=11` và mở đáy vòng xuống thêm 2px đến `y=153`. Chữ/thân quân và các quân khác giữ nguyên.
- 2026-09-23: Thử riêng Tốt đỏ với asset `red-soldier-reference-v14-black-wood-tight.png`: giữ chữ/vòng đỏ và dáng nghiêng, đổi mặt/thân sang tông gỗ vàng cam đậm theo Tốt đen hiện tại; alpha được crop sát đủ 200×200px. Các quân còn lại giữ nguyên.
- 2026-09-23: Tạo phiên bản mới của đủ bộ quân đỏ, chỉ làm chữ `車/馬/相/仕/帥/炮/兵` sáng và đỏ tươi hơn; giữ nguyên viền đỏ nâu, mặt kem, thân gỗ, alpha, kích thước và các asset gốc để hoàn tác.
- 2026-09-23: Hoàn thiện toàn bộ quân đỏ `車/馬/相/仕/帥/炮/兵` theo phong cách Pháo v8: cùng mặt kem oval nâng lên, viền đỏ, thân gỗ dày và alpha crop sát 200×200px; kể cả Tốt đỏ đã chuyển sang bộ mới. Kích thước hiển thị đỏ giữ 54×57px, quân đen không đổi.
- 2026-09-23: Chuẩn hóa kích thước nhìn thấy của Pháo đỏ theo Tốt đỏ: asset `red-cannon-reference-v8-tight.png` có canvas và alpha bounding box cùng 200×200px, tiếp tục hiển thị trong container đỏ 54×57px. Các quân khác giữ nguyên.
- 2026-09-23: Thử riêng quân Pháo đỏ bằng asset `red-cannon-reference-v7-tight.png` tạo theo ảnh mẫu: mặt kem oval nâng lên, viền/chữ đỏ và thân gỗ dày phía dưới; PNG alpha được crop sát và chuẩn hóa 200×200px. Các quân đỏ khác và quân đen giữ nguyên.
- 2026-09-22: Quân đen giữ sprite/bóng cũ 56×56px. Tốt đỏ dùng asset `兵` alpha mới, mặt trong/vòng viền nâng lên để phần chân gỗ dưới rõ hơn; asset crop sát và tối ưu 200×200px, hiển thị 58×58px. Các quân đỏ còn lại giữ render cũ.
- 2026-09-23: Hoàn tác bộ PNG v6 của sáu quân đỏ `车/马/相/仕/帅/炮`; các quân này dùng chung asset vỏ rỗng `red-empty-shell-v1-tight.png`, đã xóa mặt kem và chữ thành alpha trong suốt, chỉ giữ viền/vỏ ngoài. Năm Tốt đỏ giữ nguyên `red-soldier-reference-v9-tight.png` ở 54×57px; quân đen giữ sprite 56×56px. Giữ quy tắc bắt buộc build lại `dist/` sau mỗi nhiệm vụ có thay đổi project.

- 2026-09-22: Thử riêng quân `兵` bằng asset `src/assets/pieces/red-soldier-reference-v7.png`: làm nét viền/chữ bằng xử lý ảnh raster, trim sát alpha và render 56×56px với cùng `drop-shadow(4px 6px 1.5px rgb(65 34 15 / 72%))` của quân đen. Sáu quân đỏ khác chưa đổi, quân đen giữ sprite gốc. Build/typecheck và regression test PASS.

- 2026-09-22: Thay âm thanh đi quân cũ bằng asset mới `src/assets/đi quân (2).wav`; giữ nguyên điều kiện phát âm thanh theo `lastMove`. Build/typecheck PASS.

- 2026-09-22: Bàn cờ tăng kích thước hiển thị chung của quân đỏ/đen từ 54px lên 56px. Bản thử `red-pieces-v15.png` chỉ chỉnh ô quân `兵`: hoàn lại sáu quân khác, giữ mặt kem trong bán kính 124px và thu vòng nâu về dải 10px (124–134px) để đồng tỷ lệ với các quân còn lại; chữ đỏ khóa trong bán kính 98px. Sprite giữ lưới 2297×311 (mỗi ô 311px, gap alpha 20px).

- 2026-09-22: Dịch khung avatar Chơi với máy sang phải 45px để cách mép ô Pikafish khoảng 25px; tăng khoảng đệm dưới hai nút tới viền khung lớn thêm 10px; nâng banner Cờ thế 20px bằng cách giảm gap 65→45px.

- 2026-09-22: Hàng hai nút Vị trí tùy chỉnh/Đấu ngay rộng thêm tổng 40px (20px mỗi bên), hai ô Pikafish thu hẹp 100px. Dùng hàng 189/159/40px để tâm hai ô Pikafish khớp tâm avatar tương ứng; hàng Chọn bên giữ cùng mép trái với select.

- 2026-09-22: Nâng banner Cờ thế lên 15px, giảm khoảng cách từ 80px còn 65px.

- 2026-09-22: Tăng mạnh khoảng cách banner Cờ thế từ 40px lên 80px để tách rõ khỏi khung thiết lập.

- 2026-09-22: Tăng khoảng cách banner Cờ thế thêm 15px, từ 25px lên 40px.

- 2026-09-22: Đặt khoảng cách giữa khung thiết lập và banner Cờ thế thành 25px, đẩy riêng banner Cờ thế xuống.

- 2026-09-22: Sửa đúng khoảng cách người dùng chỉ định: bỏ margin 43px trước hai nút hành động; do khung avatar đã cách đáy vùng trên 15px nên khoảng cách khung avatar→nút còn đúng 15px và mép dưới khung lớn tự nâng lên. Khôi phục cách tính khoảng cách banner Cờ thế vì thay đổi trước nhắm nhầm vị trí.

- 2026-09-22: Khoảng cách giữa khung thiết lập Chơi với máy và banner Cờ thế được cố định còn 15px; khung Cờ thế được nâng lên tương ứng.

- 2026-09-22: Thu hai avatar AI từ 196→192px và tăng khoảng cách giữa hai ảnh từ 8→15px; khoảng cách nhìn thấy tới viền trên/dưới vẫn xấp xỉ 15px.

- 2026-09-22: Đo tỷ lệ thật hai PNG robot (174×141/143); tăng chiều rộng hiển thị 161→196px và gap 6→8px. Trong khung avatar cao 358px, tổng chiều cao ảnh còn khoảng 15px ở mép trên và dưới.

- 2026-09-22: Khung avatar Chơi với máy tăng 330→358px trong vùng cao 388px để cách viền trên/dưới đúng 15px; hai avatar tăng 155→161px và giữ gap 6px nên cũng cách khung 15px. Hàng Chọn bên căn trái thẳng với hai ô Pikafish.

- 2026-09-22: Căn lại theo ảnh mẫu Chơi với máy: khung avatar cao 330px nằm giữa vùng trên; hai robot thu còn 155px; Chọn bên và ba radio trở lại hàng ngang dưới hai ô Pikafish.

- 2026-09-22: Thu chiều cao hiển thị khung thiết lập khoảng 15px; bố cục trên đổi thành ba cột: hai AI căn giữa dọc trong khung trái, hai ô chọn máy ở giữa, Chọn bên và ba radio xếp dọc ở phải. Hàng nút giữ dưới cùng với khoảng cách cân đối.

- 2026-09-22: Chơi với máy bổ sung khung viền kép riêng cho cặp AI, hoa văn dây/mây vàng trong khung chính và lớp vân bán trong suốt trên hai nút Vị trí tùy chỉnh/Đấu ngay; giữ nguyên asset, nội dung và hành vi nút.

- 2026-09-22: Chơi với máy có khung nâu đen viền vàng bao cụm chọn máy/chọn bên/hành động theo ảnh mẫu; giảm mạnh opacity hai lớp phủ trung tâm và lớp chọn máy để background phong cảnh bên trong rõ hơn. Chưa browser QA vì phiên này không có Browser kết nối.

- 2026-09-22: Nâng thêm khung danh hiệu Tân Binh 4px, tổng offset lên 8px so với ban đầu.

- 2026-09-22: Khung danh hiệu Tân Binh trong Thông tin được nâng riêng 4px dưới avatar.

- 2026-09-22: Bỏ clipping ở dialog Thông tin và kéo banner lên thêm 8px, khôi phục toàn bộ đường viền vàng phía trên của banner.

- 2026-09-22: Khung Thông tin hạ 12px trong viewport, vẫn căn giữa ngang; banner được kéo lên thêm 8px so với khung.

- 2026-09-22: Banner Thông tin tăng cao 78→86px và được kéo lên thêm 10px để nằm chồng lên mép khung trên, không đổi kích thước khung hồ sơ.

- 2026-09-22: Thay lại banner Thông tin bằng asset mới bám đúng mẫu Banner Bạn bè người dùng cung cấp: tỷ lệ ngang 5,7:1, thanh vàng, mây vàng và hai tua đỏ; chỉ đổi tiêu đề thành “Thông tin”.

- 2026-09-22: Tiêu đề Thông tin dùng phiên bản mới của khung banner Bạn bè, thay chữ chính xác thành “Thông tin”; asset `profile/info-title-friends-frame.png` được trim alpha sát phần nhìn thấy. Khung hồ sơ không đổi kích thước.

- 2026-09-22: Phần nội dung trong khung Hồ sơ cố định dùng `justify-between`, giãn đều bốn hàng tên, ELO, chỉ số và địa chỉ mà không tăng kích thước khung.

- 2026-09-22: Thu chữ hai dòng Bạn bè/Theo dõi/Lượt thích và địa chỉ trong Thông tin từ 21px xuống 19px; số đậm và icon thu tương ứng để giữ tỷ lệ.

- 2026-09-22: Giữ nguyên kích thước các khung Thông tin; thu khoảng cách nội bộ tên→ELO và ELO→chỉ số từ 12px còn 4px, bỏ khoảng cách trước địa chỉ để toàn bộ nội dung nằm gọn trong khung cố định.

- 2026-09-22: Thu chiều cao hai ô ELO trong Thông tin thêm 4px và tăng khoảng cách hai ô thống kê Cờ Tướng/Cờ Úp từ 12px lên 20px.

- 2026-09-22: Hộp Thông tin bổ sung lượt thích (2.4K, icon tim đỏ) và địa chỉ TP. Hồ Chí Minh (icon ghim vàng), theo bố cục ảnh tham chiếu. Thêm regression DOM; typecheck PASS. UI test hiện có 4 lỗi không liên quan do mock `HTMLMediaElement.play()` của jsdom không trả Promise.

- 2026-09-21: Giới hạn Pikafish suy nghĩ tối đa 1 giây/nước thay cho 3 giây, giữ điều chỉnh theo clock. Typecheck và 4/4 kiểm thử Pikafish PASS.

- 2026-09-21: Chơi Với Máy tích hợp Pikafish 2026-09-06 thật (native UCI + NNUE ở backend), lựa chọn đầu/mặc định Pikafish, hỗ trợ chọn phe và Đấu ngay. Theo dõi lịch sử UCI, hủy phản hồi cũ khi reset/rời/kết thúc, báo lỗi/thử lại; Chơi nhanh/Cờ Úp giữ máy cơ bản. Cài engine Windows, giấy phép và hướng dẫn ở engines/pikafish. Typecheck/build và 73/73 tests PASS, gồm engine/HTTP thật và vòng đời UI; cập nhật dist. Chưa browser QA do không có trình duyệt kết nối.

- 2026-09-20: Khớp lại viền ngoài ô tìm Bạn bè theo reference bằng các lớp nâu-vàng; tăng kính lúp lên 25px, placeholder Times New Roman 20px mảnh và xám ấm. Build/typecheck thành công.

- 2026-09-20: Chỉnh ô tìm Bạn bè theo mẫu: cao 38px (3,5/5 ô lọc 54px), nền nâu vàng, font Times New Roman nghiêng, padding 10px và kính lúp SVG vàng. Build/typecheck thành công.

- 2026-09-20: Tăng rõ phần lọc Bạn bè theo phản hồi: ba ô cao 74px, ô tìm kiếm cao 62px, padding khung kem 40px ở cả trái và phải. Build/typecheck thành công.

- 2026-09-20: Làm lại ba bộ lọc Bạn bè theo mẫu: khung vàng hai lớp khi chọn, nền kem-nâu khi chưa chọn, font serif nghiêng và icon SVG nhóm người/chấm online/Facebook; thay ký tự tìm kiếm bằng kính lúp SVG. Build/typecheck thành công.

- Sửa chồng lớp hộp Bạn bè: thu title còn 520px và đặt giữa trên viền; thu hàng ba tab còn 760px; kéo panel kem sát tab; tăng riêng ba nút lọc lên cao 52px để rõ hơn và giữ đủ sáu hàng danh sách.

- Hộp Bạn bè: cắt sát alpha title, thay chữ ba tab bằng ảnh crop từ mẫu, dùng border-image khung từ mẫu và thu gọn hàng để Danh sách hiển thị đủ sáu người trong một màn hình.

- Thêm hộp Bạn bè mở từ Home: có tab Danh sách/Thêm bạn/Lời mời, bộ lọc, tìm kiếm, gửi/chấp nhận/từ chối/hủy lời mời và mời chơi/nhắn tin cục bộ. Dùng title alpha và avatar crop từ bốn ảnh mẫu mới trong `src/assets/friends/`.

- Bỏ ô nhãn ĐỎ/ĐEN dưới avatar trong PlayerCard dùng chung cho Cờ Tướng và Cờ Úp.

- Hai nút Cúp/Loa trong Chơi với máy dùng chung homeUtilityButton 48×48px và HomeIcon với Home, đồng bộ màu/viền/bóng và icon khi bật/tắt nhạc.

- Dời cả cụm bốn nút chế độ chơi trên Home lên 20px hiển thị, có bù scale màn hình.

- Căn giữa khung Xếp hạng theo cả hai chiều theo phản hồi; khoảng cách bảng tới tab là 4px, lề dưới trong khung 8px; giảm lề ngang để bảng và nội dung các hàng rộng hơn.

- Căn khung Xếp hạng giữa theo chiều ngang; đặt lề trên bằng một phần ba khoảng trống dọc để lề dưới gấp đôi lề trên.

- Tăng số hạng từ 4 lên nét cọ nâu đậm 66px cho một chữ số, tự giảm cỡ khi có nhiều chữ số; giảm khung Xếp hạng từ 1120×780 xuống 1120×750 và giữ scale cũ để chiều rộng không tăng.

- Chỉnh Vào xem theo mẫu nút bo góc viền kép, chữ serif nâu và mũi tên; hạng từ 4 dùng font Chess Brush qua Tailwind, bỏ viền/bóng vàng; tăng chấm trạng thái lên 22px và chữ trạng thái lên 23px.

- Căn lại nội dung các hàng Xếp hạng theo nền panel; tăng avatar lên 82px và ELO lên 140×46px, bỏ vòng lá ở ba avatar đầu, chỉnh nút Vào xem thành oval kem với chữ nâu. Build/typecheck thành công; chưa kiểm tra trực quan trong trình duyệt.

- 2026-09-19: Cắt 9 danh hiệu từ ranks/rank-sheet-source.png thành rank-01-novice.png đến rank-09-chess-saint.png. Home và PlayerCard dùng Tân Binh, chồng vào avatar; loại bỏ khung Kỳ Sĩ/Kỳ Thủ và ba sao cũ.
- Tăng kích thước danh hiệu Tân Binh, căn chính giữa tâm avatar và tăng phần chồng lên avatar theo phản hồi.
- Tăng thêm kích thước danh hiệu và dịch nhẹ sang phải theo phản hồi.
- Tách nền ảnh Tân Binh thành alpha trong suốt, trim sát viền, rồi tăng kích thước và dịch sang phải thêm theo phản hồi.
- Tạo `rank-01-novice-clean.png` để thay dứt điểm crop cũ/cache: trim theo alpha ≥64, bỏ viền mờ dư; Home và PlayerCard import file mới, tăng kích thước và dịch phải thêm.
- Xóa `ranks/rank-01-novice.png` cũ theo yêu cầu. Đã build lại dist: chỉ còn bundle `rank-01-novice-clean-62ZYnXEn.png` được ứng dụng phục vụ.
- Căn lại Tân Binh vào tâm ngang avatar ở Home và PlayerCard, giữ kích thước hiện tại.
- Xóa hai dòng phụ trên Home: “Khách · chỉ số mẫu” và “Chơi hai người cùng máy”.
- Cập nhật ProfileDialog theo ảnh mẫu mới: cắt title và huy hiệu Tân Binh vào assets/profile; chuyển khung/tông màu và avatar, giữ nội dung/nút HTML động.
- Thu gọn ProfileDialog còn 740×850px; thay tiêu đề và hai nhãn chế độ bằng crop sát viền, dùng lại danh hiệu Tân Binh chung, đổi hai ô thống kê sang nền kem và tăng vùng Danh hiệu.
- Cắt sát lại asset tiêu đề Thông tin để bỏ phần nền dư; tăng chữ Thắng/Thua trong hai ô thống kê.
- Tách thêm khoảng cách giữa nhãn Thắng/Thua và số liệu; hạ nhẹ danh hiệu Tân Binh dưới avatar ở Home.
- Hạ thêm danh hiệu Tân Binh ở Home, PlayerCard và hộp Thông tin để cách avatar rõ hơn.
- Thay icon minh họa ELO ở hộp Thông tin bằng PNG quân Tướng đỏ/đen có sẵn trong assets/pieces.
- Thay hai ký tự icon ELO cũ trên Home (`🪙`, `●`) bằng PNG quân Tướng đỏ/đen tương ứng.
- Đổi icon ELO bên phải trên Home từ quân Tướng đen sang mặt quân Cờ Úp.
- Thêm bảng Xếp hạng mở từ nút Cúp ở Home: dùng lại khung hồ sơ theo tỷ lệ ngang, có tab Cờ Tướng/Cờ Úp, danh sách người chơi và nút Vào xem. Chuyển ảnh mẫu người dùng cung cấp vào assets/rankings và cắt tiêu đề dùng trực tiếp.
- Dùng đầy đủ viền/góc của Popover hồ sơ cho bảng Xếp hạng; cắt sát lại tiêu đề Xếp hạng, thay crop cũ và cắt hai tab Cờ Tướng/Cờ Úp từ ảnh mẫu để dùng trực tiếp.
- Cắt sát lần nữa tiêu đề và hai tab Xếp hạng để bỏ dải nền/viền dư; ghi đè và xóa ba crop cũ.
- Cắt sâu hơn phần bảng chữ Xếp hạng và hai tab để loại dải viền dưới/các mép nền còn lại; thay và xóa crop trước đó.
- Tách nền trong suốt cho title Xếp hạng từ ảnh mới, thay crop title cũ và đặt title nhô lên mép trên Popover.
- Trim vùng alpha rỗng của title Xếp hạng và nâng nó lên qua viền trên Popover.
- Cắt sát hai tab Cờ Tướng/Cờ Úp từ ảnh mới, thay và xóa hai crop tab cũ.
- Tách nền trong suốt và trim sát lại hai tab Cờ Tướng/Cờ Úp; thay dứt điểm hai crop tab nền nâu cũ.
- Bổ sung trạng thái màu tab Xếp hạng: chọn là đỏ, chưa chọn là nâu; đổi màu khi chuyển Cờ Tướng/Cờ Úp.
- Tách khung thân bảng Xếp hạng từ ảnh mới và đặt dữ liệu HTML lên trên; thay avatar/danh hiệu từng hàng bằng kiểu Home và Tân Binh.
- Bỏ khung dày của thân bảng Xếp hạng, dùng panel màu kem có sẵn vùng hàng và bóng; thêm vòng hoa vàng quanh avatar ba hạng đầu, tạo số hạng có viền/bóng vàng-bạc-đồng và thu gọn ô ELO.
- Thay huy hiệu số hạng 1–3 dựng bằng Tailwind bằng ba PNG nền trong suốt, trim sát hình và dùng trực tiếp trong bảng Xếp hạng.

- Kiểm chứng cleanup: npm run build (bao gồm typecheck) thành công; tests/ui.test.tsx đạt 18/18; 33 tham chiếu asset frontend/HTML đều tồn tại. Chưa kiểm tra trực quan trong trình duyệt.

- 2026-09-19: Gom src/assets theo nhóm; chuyển 33 asset/giấy phép, cập nhật đường dẫn trong 10 file frontend/entry/registry. SHA-256 tất cả file di chuyển giữ nguyên. Gom ghi chú kỹ thuật vào docs/IMPORTANT-NOTES.md; giữ 18 Markdown cũ trong docs/asset-notes-pending-removal để chờ xác nhận. Danh sách đầy đủ và ứng viên xóa tại docs/ASSET-CLEANUP.md. Không thay UI/logic; không sửa ngoài board-game.

- Friends dialog: removed the embedded "Ban be" artwork from the top-center area of `friends-frame.png`; the separately rendered transparent title is now the only title over the frame.
- 2026-09-20: Sửa dứt điểm cấu trúc khung Bạn bè: bỏ border-image từ screenshot (chứa nút đóng và trang trí cũ), bỏ khung nâu lồng bên trong; dùng một khung Tailwind cùng kiểu Thông tin, một tiêu đề và một nút đóng. Tăng vùng nội dung để đủ sáu hàng. Build/typecheck thành công; chưa kiểm chứng trực quan trong trình duyệt.
- 2026-09-20: Bạn bè dùng friends-banner.png, tạo bằng ImageGen từ bảng Xếp hạng với yêu cầu chỉ đổi chữ Bạn bè, giữ thanh vàng/tua và nền trong suốt. Nâng tab 20px, chia đều sáu hàng; chỉnh nút lọc vàng/nâu nhạt và icon theo mẫu. Build/typecheck đạt; chưa QA trình duyệt.
- 2026-09-21: Tạo `social-header-landscape.png` bằng ImageGen theo dải phong cảnh Á Đông trong ảnh mẫu và dùng chung làm nền sau vùng tab của Xếp hạng/Bạn bè.
- 2026-09-21: Cắt riêng, làm sạch alpha và trim sát asset `top-one-crown.png`; dùng vương miện này trên khung avatar người đứng hạng 1.
- 2026-09-21: Chuyển ảnh mẫu lịch sử vào `src/assets/history/history-reference.png`; thêm dialog Lịch sử từ nút tiện ích Home với tab Đã chơi/Đã xem, danh sách minh họa, loại cờ và hành động Xem lại. Chưa có persistence nên chưa lưu/replay ván thật.
- Nâng hàng Chọn bên trên màn Chơi với máy 16px để cách hai nút thao tác bên dưới khoảng 22px.
- Hạ toàn bộ cụm dưới khung avatar của màn Chơi với máy 8px (hai nút thao tác, đáy khung lớn và banner Cờ thế dịch đồng bộ theo layout).
- Làm thanh header Chơi với máy trong suốt hơn với blur nhẹ; thêm bóng đen chuyển mềm vừa phải cho avatar người dùng và hai nút tiện ích màu vàng.
- Tăng độ nhận biết của hiệu ứng header Chơi với máy: cho ảnh nền chạy xuyên dưới header, giảm lớp tối còn 10% và tăng bóng chuyển mềm quanh avatar/hai nút vàng.
- Nới khung bàn cờ thêm 8px mỗi cạnh trái/phải, giữ nguyên kích thước mặt bàn, lưới và quân để các quân biên có thêm khoảng cách với mép ngoài.
- Nới tiếp khung bàn cờ thêm 8px ở cạnh trên/dưới, đồng thời cập nhật chiều cao layout theo toàn bộ khung.
- Tạo lại đủ bảy quân đen theo cùng thân gỗ nghiêng của bộ quân đỏ/kem, đổi vòng và chữ sang đen (`車 馬 象 士 將 炮 卒`); mọi quân hai bên cùng hiển thị 54×57px.
- Làm rõ bộ quân đen: đổi chữ và vòng trong sang đen sâu, nét sắc và tương phản hơn; giữ nguyên thân gỗ, kích thước 54×57px và nền trong suốt.
- Xóa nét viền đen ngoài cùng khỏi toàn bộ quân đen; giữ vòng tròn trong/chữ đen rõ và thay mép ngoài bằng màu gỗ tự nhiên.
- Tăng độ tương phản hiển thị quân đen để chữ sắc, rõ hơn ở kích thước 54×57px; giảm riêng bóng đổ quân đen từ 72% xuống 48% và thu gọn độ lệch/độ nhòe.
- Khôi phục bộ quân đen được tạo trực tiếp theo thân quân đỏ (bản v1/v2), bỏ filter tăng tương phản; tiếp tục giữ bóng quân đen nhẹ ở 48%.
- Giảm bóng toàn bộ quân đỏ xuống cùng thông số với quân đen: lệch 3×5px, blur 1px và opacity 48%.
- 2026-09-23: Tạo lại đủ bảy quân đen từ chính khung/thân của từng quân đỏ tương ứng; giữ nguyên màu gỗ, ánh sáng, hình dáng và chỉ thay vòng/chữ thành mực đen (`車 馬 象 士 將 炮 卒`). Giữ kích thước hiển thị 54×57px và bóng 48%.
- 2026-09-23: Làm sạch viền răng cưa của bảy quân đen bằng alpha mép ngoài tròn, loại pixel bán trong suốt rời và vẽ lại vòng trong chống răng cưa; giữ nguyên thân gỗ, chữ, kích thước và bóng.
- 2026-09-23: Thay cả 14 loại quân bằng PNG cắt trực tiếp từ ảnh gốc c7ad3098, nền ngoài alpha trong suốt, giữ màu/chữ/vòng lệch lên theo mẫu. Lưu tọa độ và script tái tạo tại docs/crop-reference-pieces.ps1; bóng UI mềm 4×6px/3px/48%, kích thước bàn giữ 54×57px. Bóng tái tạo gần mẫu, không phải tách nguyên bóng nền ảnh.
- 2026-09-23: Cắt sát lại mép trái bảy quân đen, thu mask 3px nguồn và chuyển sang source-cut-v2; quân đỏ và bóng giữ nguyên.
- 2026-09-23: Căn lại vùng sáng nền bàn cờ vào chính giữa bằng asset `maple-xiangqi-board-v3-centered-light.png`; giữ nguyên lưới, vân gỗ, khung và kích thước bàn.
- 2026-09-23: Tăng bóng toàn bộ quân cờ từ 48% lên 60% và giảm blur từ 3px xuống 2px; giữ độ lệch 4×6px.
- 2026-09-23: Cho bàn cờ dùng trọn chiều ngang khả dụng, tăng khung trên/dưới từ 8px lên 12px và tăng quân cờ từ 54×57px lên 56×59px.
- 2026-09-23: Giảm giới hạn chiều cao hiển thị của bàn cờ 30px, giữ nguyên tỷ lệ bàn và vị trí giao điểm.
- 2026-09-24: Thay nền bàn cờ bằng `xiangqi-board-mobile-maple-v4.png` tái tạo từ ảnh mẫu mới: gỗ phong vàng nhạt, khung nâu bo nhẹ, lưới nâu mảnh và dải sông. Căn lại đủ 90 giao điểm theo nền mới; tăng quân `maple-v3` lên 104×108px trên canvas để tỷ lệ/khoảng cách sát ảnh mẫu, giữ nguyên logic và màu nguyên bản của đủ 14 quân.
- 2026-09-24: Thay đủ 14 quân bằng bộ `skin-tone-v4`: thân gỗ kem–da người bớt vàng, highlight trên-trái và bóng gọn dưới-phải theo ảnh mẫu; giữ nguyên chữ Hán/vòng đỏ-đen từ bộ đã duyệt. `ChessPiece` dùng trực tiếp asset mới, kích thước hiển thị và logic game không đổi.
- 2026-09-24: Sau khi duyệt riêng quân Tốt đỏ, thay đủ 14 quân bằng bộ `honey-gold-v5`: vàng mật ong hòa màu bàn, viền nâu cam mảnh, góc nhìn phẳng và bóng tiếp xúc gọn dưới-phải. Giữ nguyên chữ Hán đỏ/đen, kích thước hiển thị và logic game.
- 2026-09-24: Cắt lại đủ 14 quân trực tiếp từ codo.png/coden.png thành bộ codo-coden-v2, alpha sát thân và giữ nguyên màu/chữ gốc. Thay bộ cắt thử đang dùng; tái tạo bóng nâu lệch dưới-phải bằng drop-shadow, giữ kích thước và gameplay.
- 2026-09-24: Tăng quân lên 106×110px (+2px mỗi chiều trong hệ tọa độ bàn); mở rộng bóng ngoài từ 7/10/5px sang 9/13/6px, giữ màu và độ đậm.
- 2026-09-24: Tăng tiếp quân lên 108×112px, giữ nguyên tâm giao điểm và bóng ngoài.
- 2026-09-24: Làm bóng quân đậm hơn và giảm độ mờ để viền bóng gọn, rõ hơn.
- 2026-09-24: Giảm nhẹ độ đậm màu bóng quân, giữ nguyên độ gọn 4px blur.
- 2026-09-24: Đổi sắc bóng quân sang nâu nhạt hơn, không làm giảm opacity.
- 2026-09-24: Thiết kế lại danh sách người trong phòng theo `view.png`: người chờ ghép dùng thẻ vàng có số thứ tự và được xếp trước; người chỉ xem dùng thẻ xanh, giữ thứ tự vào trong từng nhóm; bộ đếm mắt chỉ đếm người xem.
- 2026-09-24: Tách khung vàng/xanh sạch từ mẫu `view.png`, trim sát alpha và dùng 9-slice để thẻ người trong phòng co giãn theo tên; thu chiều cao thẻ từ 68px xuống 56px cùng avatar/chữ.
- 2026-09-24: Thay nền bằng banco-inner-clean-v1 từ banco.png, phục hồi các vùng bị quân/bóng che và cắt bỏ khung tối ngoài. Căn lại 90 giao điểm, thay chữ sông bằng HOANGBBCG in nghiêng căn giữa.
- 2026-09-25: Sửa flex sizing của PlayerCard theo vị trí cột để quân Đỏ ở cột chat không chiếm chiều cao toàn cột; chat giữ được chiều cao và trạng thái mở/thu ổn định khi bắt đầu trận. Thêm regression test cho người chơi cầm Đen; test mục tiêu đạt.
- 2026-09-25: Đối chiếu ảnh `src/assets/mau.png`; dùng dấu trắng cho chấm nước hợp lệ, góc chọn/ăn quân, chấm ô cũ, vòng quanh quân mới và quầng chọn. Giữ nguyên màu asset quân/nền bàn; thêm regression cho dấu chọn và ô ăn quân.
- 2026-09-25: Đổi nút camera từ chụp riêng bàn cờ sang chụp toàn bộ vùng game bằng html-to-image sẵn có, giữ cả các điều khiển và tải PNG về máy; thêm kiểm thử tiện ích tải ảnh.
- 2026-09-25: Kiểm tra dấu chọn theo mau.png: tests/chess-piece.test.tsx đạt 20/20; npm.cmd run build thành công.
- 2026-09-25: Bỏ quầng sáng khỏi các dấu nước đi/chọn quân; giữ dấu trắng phẳng và vòng quanh quân không glow. chess-piece.test.tsx đạt 20/20, npm.cmd run build thành công.
- 2026-09-25: Tinh chỉnh lại độ sáng theo ảnh mẫu: thêm quầng trắng nhẹ cho chấm nước, dấu góc và vòng nước trước/mới, không phát sáng mạnh lên quân. chess-piece.test.tsx đạt 20/20; build thành công.
- 2026-09-25: Tăng nhẹ độ sáng dấu chọn theo ảnh và kiểm tra tâm chấm nằm đúng giao điểm bàn. chess-piece.test.tsx đạt 20/20; build thành công.
- 2026-09-25: Thay chấm nước đi và chấm ô cũ bằng asset PNG trong suốt `src/assets/move-indicator-dot.png`, căn tâm tại giao điểm bàn; chess-piece.test.tsx đạt 20/20, build thành công.
- 2026-09-25: Thay sprite chấm nước bằng mẫu chấm phát sáng mềm người dùng gửi, dùng cho nước hợp lệ và ô cũ; asset alpha crop 96×95, hiển thị 32px và canh giữa giao điểm. Test 20/20; build thành công.
- 2026-09-25: Khôi phục trực tiếp pixel gốc của ảnh chấm người dùng chọn, chỉ crop vùng trong suốt thành 480×475 và không resize/nội suy asset; test 20/20, build thành công.
- 2026-09-25: Đổi tên asset chấm sang `move-indicator-dot-user.png` để tránh cache bản cũ và tăng kích thước hiển thị từ 32px lên 48px, giữ nguyên pixel ảnh người dùng chọn; test 20/20, build thành công.
- 2026-09-25: Dùng trực tiếp `src/assets/otron.png` cho chấm nước đi và chấm ô cũ theo chỉ định; giữ nguyên tỷ lệ asset và canh tâm tại giao điểm. Test 20/20; build thành công.
- 2026-09-25: Tăng kích thước hiển thị `otron.png` từ 48px lên 60px để phần chấm nhìn lớn thêm khoảng 5px; giữ tâm tại giao điểm.
- 2026-09-25: Tăng vùng hiển thị `otron.png` lên 120px để bù khoảng trong suốt bên trong asset và scale của bàn, giữ tâm đúng giao điểm.
- 2026-09-25: Tăng vùng hiển thị `otron.png` nhẹ từ 120px lên 140px theo phản hồi; giữ tâm đúng giao điểm.
- 2026-09-25: Tăng vùng hiển thị `otron.png` nhẹ từ 140px lên 155px theo phản hồi; giữ tâm đúng giao điểm.
- 2026-09-25: Thêm quầng trắng nhẹ quanh dấu `otron.png` cho chấm nước đi và ô cũ.

- 2026-09-26: Căn mã phòng 123456 thành 6 ô cùng độ rộng với cỡ chữ 16px và số dạng lining/tabular để các chữ số thẳng hàng; build/typecheck PASS.

- 2026-09-26: Sửa lỗi chụp game do bộ lọc html-to-image nhận cả text node; chỉ đọc thuộc tính sau khi xác nhận node là Element. Build/typecheck PASS.

- 2026-09-26: Tăng tốc chụp DOM: giảm pixelRatio cố định về 1, tắt cacheBust và chuẩn bị/cache CSS font sau khi font tải xong để không quét/nhúng lại font khi bấm mỗi lần; đo riêng thời gian chuẩn bị font, tạo PNG và click-to-download. Build/typecheck PASS; chưa đo runtime trong Chrome.

- 2026-09-26: Hoàn tác chụp DOM theo yêu cầu; khôi phục snapshot theo version và render PNG qua Worker/OffscreenCanvas, gỡ `html-to-image`. Gameplay/UI giữ nguyên.

- 2026-09-26: TEST B debug: thêm cờ dev-only bỏ qua `hasAnyLegalMove`/chiếu bí sau nước đi trong local game; kiểm tra nước đi cơ bản vẫn chạy, server và production giữ nguyên. Build/typecheck PASS.

- 2026-09-26: Phân tích khựng khi đi quân: bỏ hai lần kiểm tra hợp lệ dư trong luồng local (giữ một lần tại applyMove), và chỉ pause intro ở lần đổi nước đầu tiên của ván; giữ nguyên âm thanh bước/ăn quân. Build/typecheck PASS.
- 2026-09-27: Cập nhật hiệu ứng bật quân trong Board thành 3 preset 8/12/16px (480/560/640ms), bóng lệch X/Y 1:1 theo độ bay, nở/nhòe khi lơ lửng và thu về bóng gọn hiện rõ khi tiếp đất. Preview chạy lần lượt ba mẫu; chiếu bí dùng mẫu vừa. `npm.cmd run build` (gồm typecheck) PASS; chưa chạy browser QA.
- 2026-09-27: Thêm bảng 6 reaction emoji dạng dọc, hover/focus mở đè lên nút like, dùng tông viền/nền/bo góc từ emoji picker chat và cao 3/4 giới hạn khung chat theo desktop/compact. Chọn emoji tạo bubble bay tương ứng, vẫn dùng giới hạn like hiện tại. `npm.cmd run build` (typecheck + Vite) PASS.
- 2026-09-27: Chỉnh hiệu ứng quân theo ảnh tham chiếu: preview chỉ bật đúng một lần bằng mẫu vừa; bóng lớn và mềm hơn, dịch chéo xuống phải cùng độ bay. Giữ ba preset trong code để chọn khi cần. `npm.cmd run build` (typecheck + Vite) PASS.
- 2026-09-27: Chỉnh thời gian bật quân thành tổng 600ms: bay lên 100ms, giữ 400ms, hạ xuống 100ms; bóng dùng cùng các mốc pha. Build/typecheck PASS.
- 2026-09-27: Làm avatar hai bên PlayerCard có thể mở chung ProfileDialog của Home; dialog hiển thị tên người chơi được chọn, backdrop tối/mờ giữ đúng style hồ sơ gốc. Nút liên kết tài khoản hiện thông báo placeholder như Home. Build/typecheck PASS.
- 2026-09-27: Tăng độ bật của preset vừa cho animation quân từ 12px lên 14px; thời lượng 600ms và độ lệch bóng 1:1 giữ nguyên. Build/typecheck PASS.
- 2026-09-27: Theo ý người dùng, trả độ bay của mẫu vừa về 12px và tăng nhẹ kích thước/độ đậm bóng (scale, opacity); thời lượng/pha 600ms và tỷ lệ lệch bóng không đổi. Build/typecheck PASS.
- 2026-09-27: Nới trục hẹp của bóng ở trạng thái bay/tiếp đất (scaleY), giữ nguyên trục dài (scaleX), độ bay và thời lượng. Build/typecheck PASS.
- 2026-09-27: Tăng thêm trục hẹp của bóng preset vừa (scaleY 1→1.18) và opacity khi bay 0.34→0.38; chiều dài, thời lượng và độ bay giữ nguyên. Build/typecheck PASS.
- 2026-09-27: Thêm tia sét SVG hội tụ vào Tướng đối phương trong 200ms, kích hoạt khi animation bật quân chiếu bí kết thúc/đáp đất. Ở nước chiếu bí dừng tiếng nước đi/ăn quân/chiếu tướng và phát clip check hiện có tại mốc đáp đất; các nước thường giữ âm cũ. `npm.cmd run build` (typecheck + Vite) PASS.
- 2026-09-27: Thay asset âm thanh chiếu bí bằng clip `1790480222523_2137874395677077050_7229889354659670468.mp4`, phát tại thời điểm quân chiếu bí đáp xuống; âm thanh nước đi thường giữ nguyên.
- 2026-09-27: Làm hiệu ứng sét chiếu bí rõ hơn: các tia xanh/trắng được vẽ lao vào Tướng trong 160ms, chớp theo animation tổng 200ms khi quân đáp xuống; giữ nguyên asset và gameplay.
- 2026-09-27: Giới hạn animation bật quân vào chiếu bí; bỏ hiệu ứng preview đầu ván. Đồng bộ tia sét và âm thanh vào onfinish của quân vừa chiếu bí đáp xuống.
- 2026-09-27: Chuyển điểm kích hoạt tia sét và âm thanh chiếu bí từ lúc đáp xuống sang đầu animation bật quân, để các hiệu ứng bắt đầu đồng thời.
- 2026-09-27: Ẩn bóng ellipse và drop-shadow của riêng quân đang di chuyển; bóng của quân đứng yên và animation chiếu bí giữ nguyên.
- 2026-09-27: Theo yêu cầu kiểm tra, chuyển hiệu ứng bật quân/sét/âm thanh chiếu bí khỏi điều kiện kết thúc ván; nay chỉ chạy một lần ở nước đi đầu tiên của phe người dùng mỗi ván (đỏ: nước 1, đen: nước 2), không kích hoạt cho viewer.
- 2026-09-27: Chuyển gói animation chiếu bí sang nước đi đầu tiên của phe người dùng mỗi ván; không phát theo kết quả chiếu bí thật và không chạy cho viewer.
- 2026-09-27: Tăng riêng âm lượng tiếng chiếu tướng thường từ 0.95 lên mức tối đa 1.0; tiếng chiếu bí và âm thanh khác giữ nguyên.
- 2026-09-27: Nước mở màn được đánh dấu chiếu bí sau khi vượt qua kiểm tra nước hợp lệ; local áp dụng cho nước đầu tiên của người điều khiển (bot vẫn đi bình thường trước đó), online theo nước đầu tiên của ván. Vẽ lại sét thành nhiều nhánh dọc từ trên xuống; clip chiếu bí hiện có phát cùng lúc animation bật quân.
- 2026-09-27: Khi người điều khiển đi nước đầu (local; online là nước đầu của ván), kết thúc ngay với result checkmate sau kiểm tra nước hợp lệ; không hủy animation. Tia sét đổi thành luồng dọc từ trên xuống với 8 nhánh, clip MP4 chiếu bí phát cùng lúc hiệu ứng bật quân.
- 2026-09-27: Replaced the checkmate audio source with 1790483071512_2137874395677077050_7229889354659670468.mp4; the previous clip is no longer imported.
- 2026-09-27: Profile dialog action label is context-specific: Home avatar keeps account linking; in-game player profiles show friend add. Build PASS.
- 2026-09-27: Like reaction picker now opens after 300 ms hover/focus; each like or reaction resets a 3-second reopen cooldown.
- 2026-09-27: Checkmate lightning/audio and remaining-piece lift start together after the attacking piece finishes its move; the attacking piece is excluded from the lift.
- 2026-09-27: Chat message avatars and viewer/queue list avatars open the shared player profile dialog.
- 2026-09-27: Reworked checkmate lightning as a jagged top-down strike with 15 staggered side branches; timing remains about 200 ms.
- 2026-09-27: Reduced the reaction picker reopen cooldown after a like/reaction from 3 seconds to 300 ms; hover-to-open remains 300 ms.
- 2026-09-27: Like/reaction floating bubbles now originate from the center of the player avatar; the external like button remains unchanged.
- 2026-09-27: Shortened checkmate piece-lift animation by 100 ms (600 to 500 ms); rise/landing stay 100 ms each and hold is 300 ms.
- 2026-09-27: Checkmate audio now layers the first match-intro sound, preloaded on a dedicated audio element so intro playback state remains separate.
- 2026-09-27: Reaction picker hover delay is 400 ms; selecting a reaction keeps the picker open for repeated selections.
- 2026-09-27: Default like bubbles originate at the like button again; reaction-picker emoji bubbles continue to originate at the avatar.
- 2026-09-27: Checkmate effects now trigger 100 ms before the attacking move animation ends; lift and lightning durations are unchanged.
- 2026-09-27: Replaced the checkmate overlay intro layer with the other match-start sound (intro sound two); the original checkmate audio still plays concurrently.
- 2026-09-27: Applied screen blending to the checkmate WebP overlay so black pixels blend into the game instead of showing as a dark line; typecheck/build PASS.
- 2026-09-27: Started both checkmate audio cues 100 ms before the visual checkmate effects to compensate for media playback startup delay; typecheck/build PASS.
- 2026-09-27: Checkmate effects now start 100 ms earlier during the attacking move; animation and audio durations are unchanged. Typecheck/build PASS.
- 2026-09-27: Avatar customization now uses a dedicated “Tùy chỉnh avatar” version of the Information title frame; removed the covering pill layer.
- 2026-09-27: Enlarged the avatar in the customization preview to 114px and shifted its scene background so the circular arch centers behind it.
- 2026-09-27: Clipped the shifted customization scene to its preview area and enlarged the avatar to 124px.
- 2026-09-27: Made the profile name/details panel background fully opaque while retaining its brown gradient and existing frame styling.
- 2026-09-27: Lightened the opaque profile name/details panel gradient slightly at the user's request.
- 2026-09-27: Removed the profile dialog close X, centered its contents vertically, and made Escape, backdrop clicks, and the Thoát button close it.
- 2026-09-27: Vertically centered the profile name/details frame within its preview row.
- 2026-09-27: Increased the centered profile name/details frame height by 10px.
- 2026-09-27: Corrected the profile frame adjustment: restored its original height and moved it upward by 10px.
- 2026-09-27: Increased the overlap between the avatar frame and its nameplate so they touch in the customization preview.
- 2026-09-27: Enlarged the avatar inside the selectable frame thumbnail from 61% to 70%.
- 2026-09-27: Increased the avatar customization preview card height by 15px and vertically centered it in its row.
- 2026-09-27: Reused the existing profile name/details panel in the avatar “Chọn khung” preview without changing its appearance in the profile view.
- 2026-09-27: Replaced the customizer's separate avatar nameplate with the existing Tân Binh frame asset and matched the profile avatar/badge proportions.
- 2026-09-27: Matched the avatar customization backdrop to the Information dialog by removing its extra blur and darker overlay.
- 2026-09-27: Lightened the profile name/details panel to match the cream tone of the statistics cards, using dark brown text for contrast.
- 2026-09-27: Reduced the Tân Binh badge in the avatar customization preview from 262px to the saved 205px Home badge size.
- 2026-09-27: Moved the avatar customization profile information panel up 10px to center it vertically against the avatar preview.
- 2026-09-27: Brightened the profile preview frame with a gold edge and added pulsing golden corner glints.
- 2026-09-27: Applied the reference red-and-gold palette to selected customizer tabs/frame and the dark brown palette to unselected states; corner glints now mark selections.
- 2026-09-27: Kept the profile information panel unchanged and moved the pulsing corner glints onto active avatar customization selections.
- 2026-09-27: Saved the selected red/gold and unselected dark-brown palette as reusable selectionPalette classes and documented it in AGENTS.md.
- 2026-09-27: Restored the missing profile scene source PNG from its existing built copy so the required production build could resolve ProfileDialog.
- 2026-09-27: Rounded all four corners of avatar customization tabs and kept their selected/unselected fills on the saved selection palette.
- 2026-09-27: Replaced the selected red fill in the shared selection palette with the dark brown surface and bright gold glow from the selected frame reference.
- 2026-09-27: Replaced the avatar preview scene and the profile dialog outer backdrop with asset 436c7bb5-bf2c-4c64-90e6-68a13a1d86cc, using cover cropping.
- 2026-09-27: Raised the avatar preview information panel by another 20px (total offset 30px) to center it vertically with the preview scene.
- 2026-09-27: Standardized the dragon avatar frame at 166/128 (129.6875%), centered on the avatar, and reused the scalable overlay in profile and customization views.
- 2026-09-27: Changed avatar customization tab corners to the inward scoop shape from the supplied reference, preserving the saved selected and unselected palette.
- 2026-09-27: Restored the saved deep red fill on the active avatar customization tab while retaining its gold edge/glow and leaving the shared selection palette unchanged.
- 2026-09-27: Reverted the profile scene and its outer dialog backdrop from asset 436c7bb5-bf2c-4c64-90e6-68a13a1d86cc to the previous asset 9a48f628-f3a9-4a19-ba3c-a7ae83b0b6c2.
- 2026-09-27: Vertically centered the avatar and title badge stack in the avatar customization preview column.
- 2026-09-27: Restored the profile information card to its opaque brown gradient and light text, keeping the inner stat chips unchanged.
- 2026-09-27: Matched the profile dialog backdrop to FriendsDialog with a black 50% dim layer and no blur or background image.
- 2026-09-27: Moved the avatar and attached title badge stack up by 10px in the customization preview.
- 2026-09-27: Kept the profile scene clipped to its preview area while allowing the raised information card's top border to remain visible.
- 2026-09-27: Moved the normal profile name/details panel upward by 8px more, preserving the separate customization preview offset.
- 2026-09-27: Layered the customization preview title badge above the avatar and dragon frame so it visibly overlaps both.
- 2026-09-27: Hid the name and address edit controls while avatar customization is open; they remain available in the regular profile view.
- 2026-09-27: Removed the sample avatar from frame-selection thumbnails so only the frame artwork appears; documented this for future frame options.
- 2026-09-27: Replaced the four avatar customizer tab SVGs with separately cropped transparent gold icon assets from the supplied reference image.
- 2026-09-27: Shortened the avatar customizer scene's fade into brown and removed the diagonal stripe layer; left the Information view unchanged.
- 2026-09-27: Set the four avatar customizer tab labels in Cormorant Garamond 600, bundling Latin and Vietnamese WOFF2 subsets with the OFL license.
- 2026-09-27: Enlarged the four avatar customizer tab icons from 20px to 24px.
- 2026-09-27: Increased the four avatar customizer tab labels from 17px to 20px.
- 2026-09-27: Moved the avatar customizer background's brown fade earlier so it reaches full brown around the horizontal midpoint.
- 2026-09-27: Increased the avatar customization preview from 128px to 136px and raised its avatar/nameplate stack slightly.
- 2026-09-27: Moved the avatar customization scene fade to the name panel's left edge and shortened the transition to 8% of its width.
- 2026-09-27: Increased avatar customizer tab labels to 22px and icons to 28px.
- 2026-09-27: Centered avatar customizer tab icon/text alignment by removing excess label line height.
- 2026-09-28: Restored enough line-height to prevent Cormorant Garamond descenders from clipping and lowered tab icons by 2px for visual alignment.
- 2026-09-28: Enabled all avatar customizer tabs, moved “Chọn avatar” first, and kept unfinished tabs blank while retaining the frame picker under “Chọn khung”.
- 2026-09-27: Removed internal padding from avatar customizer tab buttons while keeping their grid dimensions fixed.
2026-09-28: Clicking outside avatar customization now returns to the open profile info dialog; closing the dialog resets customization so reopening starts at profile info.
2026-09-28: Added a 15-portrait wuxia avatar picker; the generic first avatar was omitted and the bearded green general portrait is the default, applied through the profile preview on Use.
2026-09-28: Replaced the avatar-customization “Huy hiệu” tab with “Skin” and a clothing icon; its panel remains blank until skin UI is implemented.
2026-09-28: Added the gold circular avatar frame as the first/default frame and applied it to profile, in-game player, room-user, chat, and customization-preview avatars.
2026-09-28: Fixed avatar choices displaying as ovals by constraining portraits to square crops with 4px top/bottom inset in each card.
2026-09-28: Centered each portrait to its measured position in the avatar sprite, correcting the offset inside the circular preview and tiles.
2026-09-28: Replaced the Skin tab's inline shirt glyph with the supplied gold robe asset.
2026-09-28: Enlarged every avatar portrait while keeping its circle centered; tuned the sprite crop so visible portrait rims leave about 4px above and below each picker card.
2026-09-28: Replaced profile address text editing with a searchable two-step province/city and ward/commune picker; the selected address is saved after confirmation.
2026-09-28: Darkened the profile name/details panel gradient while keeping its border, text, and shadows unchanged.
2026-09-28: Kept the profile ID copy icon wired to clipboard copying and added a legacy clipboard fallback for browsers that block the Clipboard API.
2026-09-28: Added an explicit Continue step after selecting a province/city; address saving is available only after choosing a ward/commune.
2026-09-28: Reordered the avatar grid to place portraits 1, 2, 4, 5, and 8 in the first row while preserving each portrait's identity and selection state.
2026-09-28: Made the profile name/details panel visibly brown by lifting both gradient stops and reducing the dark inset shadow's strength.
2026-09-28: Center-aligned the profile social-stat row so the likes group no longer sits higher than friends and following.
2026-09-28: Added transient cream-gold filled copy-icon feedback and a browser-style “Đã sao chép” tooltip after profile ID copying succeeds.
2026-09-28: Filled both overlapping sheets of the profile ID copy icon in cream-gold during its copied feedback state.
2026-09-28: Limited avatar customization to the five portraits in the first row.
2026-09-28: Removed result-count text from the province and ward address-picker header.
2026-09-28: Shifted the friends/following/likes row down by 3px to balance its spacing against adjacent profile details.
2026-09-28: Removed administrative type labels from address options, enlarged province-row chevrons and the province count, and removed the address-picker eyebrow label.
2026-09-28: Increased selected province/ward contrast with the shared gold selection palette, a thicker border, and a visible glow.
2026-09-28: Enlarged the address-picker step heading while preserving its 28px line box and the dialog frame dimensions.
2026-09-28: Prevented selection-induced layout shifts by reserving the address-summary line and keeping option border thickness fixed; brightened selected options.
2026-09-28: Enlarged the address picker breadcrumb text (including “Việt Nam”) while preserving its existing row height.
2026-09-28: Removed the selected-address summary text from the address picker while retaining its reserved space to prevent layout shifts.
2026-09-28: Added the requested square-pen icon to the upper-right end of the editable profile honors heading.
2026-09-28: Made the address search autofocus when opened and capture printable typing from elsewhere in the open dialog, preserving the first typed character.
2026-09-28: Changed the cursor to a hand when hovering the honors edit icon.
2026-09-28: Anchored the in-game avatar frame and title plaque to the actual avatar-sized button, and raised the plaque above every avatar overlay; recorded the stacking rule in AGENTS.md.
2026-09-28: Expanded the honors frame to fill the available viewport height on desktop, removing the visible top margin while preserving its original aspect ratio.
2026-09-28: Restored the honors frame to its previous viewport sizing after the user requested undoing the enlargement.
2026-09-28: Enlarged only the Top 3 award frame artwork by 7% to balance its apparent size with the other two awards.
2026-09-28: Updated the Quán Quân description and qualification text; both honor-detail text areas now scroll vertically if their content exceeds the available space.
2026-09-28: Cropped five purple award frames from the supplied sprite sheet and added them with their requested titles to Danh Hiệu Phong Tặng and Tất cả.
2026-09-28: Left-aligned honor descriptions and earning requirements with 12px bullet indents, and removed the “1:” prefix from the Quán Quân requirement.
2026-09-28: Raised honor title layers above their frame artwork and loosened line boxes so glyphs such as Q remain fully visible.
2026-09-28: Matched the five awarded-honor frames to the existing 3:1 badge size, aligned them in a centered three-plus-two grid, and kept each label centered.
2026-09-28: Removed the Top 3-only frame scale and matched the five new honor labels to the existing 7.5cqw title size for consistent badge alignment.
2026-09-28: Saved the shared 3:1 honor-frame size, centered-title layering, and equal horizontal-row alignment rule in AGENTS.md; both award groups now reference one aspect-ratio class.
2026-09-28: Lowered the manually positioned acute accent on Á Quân so it remains visibly attached to the letter.
2026-09-28: Recorded the preferred category order for the honors “Tất cả” view in AGENTS.md.
2026-09-28: Recorded the Vinh Quang Kỳ Đài order as Khung Thi Đấu 1/Quán Quân, 2/Á Quân, and 3/Top 3.
2026-09-30: Limited profile honor selection to unlocked, unhidden honors; locked/hidden cards retain detail access without a selector, and hiding a selected honor removes it from the profile.
2026-09-30: Restored the All honors tab to its normal appearance by hiding the active highlight overlay on that tab.
2026-09-30: Changed the All honors tab to always list every currently unlocked honor, including unselected and hidden honors; hidden titles still have no profile-selection button.
2026-09-30: Moved the honor detail visibility switch upward into the upper-right area of the panel.
2026-10-01: Aligned the honor visibility label horizontally with its switch and raised the control slightly.
2026-10-01: Raised the existing honor badge in the detail panel slightly without creating a duplicate.
2026-10-01: Nudged the honor visibility control slightly downward and rightward.
2026-10-01: Hid the profile honor preview scrollbar track and thumb while keeping the honor area scrollable.
2026-10-01: The profile honor panel now shows nine level-sorted badges per page and auto-slides left to additional pages, pausing on hover; updated honor notes.
2026-10-01: Lowered the existing honor badge in the detail panel slightly.
2026-10-01: Centered honor titles within the existing detail badge artwork.
2026-10-01: Moved the honor visibility toggle slightly downward and farther right.
2026-10-01: Lowered the honor visibility toggle a little further.
2026-10-01: Added a persistent master visibility switch beside the honors panel close button to hide/show selected profile honors without clearing individual selections.
2026-10-01: Linked the honors-frame visibility control to the same currently selected honor state as the detail-panel switch; the two switches now stay synchronized per honor.
2026-10-01: Shifted the main honors-frame visibility control down 15px while leaving the detail-panel control unchanged.
2026-10-01: Visually aligned bestowed-honor titles with the center of the purple plaque in the detail panel.
2026-10-01: Shifted the honor detail visibility control down 15px.
2026-10-01: Optically centered the purple bestowed-honor title in the detail panel with a small vertical adjustment.
2026-10-01: Lowered the text inside the tournament honor cards slightly while leaving their frames and layout unchanged.
2026-10-01: Raised the eye/count badges slightly on the lower three rows of bestowed honors.
2026-10-01: Raised the eye/count badges on the three level-5 bestowed-honor cards to align with the other awarded tiers.
2026-10-01: Lowered the main honors visibility switch 10px further and raised the detail-panel switch 5px.
2026-10-01: Increased honor catalog row spacing from 2% to 3% across categories to match the Vinh Quang Kỳ Đài row rhythm.

2026-10-03: Đã gỡ khung danh hiệu bên dưới avatar ở Home, hồ sơ và phần xem trước tùy chỉnh; vẫn giữ khung tròn mặc định. Build/typecheck PASS, dist cập nhật.

2026-10-03: Gỡ viền vàng và shadow bên trong avatar hồ sơ gây chồng vòng với khung mặc định; chỉ còn asset khung avatar. Build/typecheck PASS, dist cập nhật.

2026-10-03: Bỏ lớp khung phủ ảnh trong vùng xem trước tùy chỉnh avatar để chỉ còn chân dung; ô chọn khung vẫn giữ nguyên lựa chọn mặc định. Build/typecheck PASS, dist cập nhật.

2026-10-03: Gỡ asset khung vàng mặc định khỏi avatar hồ sơ, bàn cờ, chat và danh sách người xem; bỏ ô khung mặc định khỏi tab Chọn khung, các ô khung mẫu còn lại giữ trạng thái khóa. Build/typecheck PASS, dist cập nhật.

2026-10-03: Khôi phục 30dfa56b… ở ô đầu Chọn khung và làm mặc định. Căn tâm và tỷ lệ theo vùng rỗng của PNG để khung mới đè kín viền gốc trong ảnh; loại bỏ viền CSS phụ ở Home/bàn cờ/chat/danh sách người xem. Build/typecheck PASS, dist cập nhật; browser QA chưa thực hiện được vì tab IAB không kết nối.

2026-10-03: Hiện lại danh hiệu Tân Binh dưới avatar trong hồ sơ và xem trước tùy chỉnh, dùng asset cùng Home, tỷ lệ và vị trí đã chốt; badge nằm trên lớp khung tròn. Build/typecheck PASS, dist cập nhật.

2026-10-03: Đưa avatar đã chọn vào session store; nhấn Sử dụng cập nhật đồng thời avatar hồ sơ và Home, giữ lựa chọn khi đổi màn hình. Đặt danh hiệu Home ở z-20 trên avatar/khung z-10, đồng bộ thứ tự lớp với hồ sơ và xem trước. Build/typecheck PASS, dist cập nhật.

2026-10-04: Chốt mẫu Home 106px làm chuẩn tỷ lệ avatar/danh hiệu. Gộp tỷ lệ, độ dịch và scale hiện tại vào playerIdentityLayout; Home, hồ sơ, xem trước tùy chỉnh và thẻ người chơi bàn cờ dùng chung vị trí/kích thước danh hiệu, luôn nằm trên khung avatar. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Thay icon Tướng đen ở chỉ số hồ sơ/tùy chỉnh bằng ảnh quân cờ úp có sẵn history-hidden-user.png, đồng bộ ảnh với Home. Build/typecheck PASS, dist cập nhật.

2026-10-04: Gỡ 14 thuộc tính title gây tooltip mặc định trên Home, hồ sơ/danh hiệu, danh sách phòng và lịch sử; gỡ tooltip năng lượng khi hover/focus, giữ mô tả aria và phản hồi thao tác. Build/typecheck PASS, dist cập nhật.

2026-10-04: Đổi font các số mã phòng sang Times New Roman như số điểm trong ảnh tham chiếu thứ hai, giữ nguyên cỡ/chữ đậm và khoảng cách. Build/typecheck PASS, dist cập nhật.

2026-10-04: Căn kích thước SVG vòng báo lượt xanh trên avatar theo viền ngoài asset khung vàng ở desktop, compact và short-desktop để hai mép trùng nhau.
Build/typecheck PASS, dist cập nhật.

2026-10-04: Chuẩn kích thước nhìn thấy của icon cờ úp theo quân đỏ: cờ úp 32px vì phủ kín canvas, quân đỏ vẫn 36px do asset có viền trong suốt; giữ ô icon 36px để căn hàng không đổi. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thu ngang bảng mã phòng 190→174px, tăng chiều cao 80→88px và giữ tâm ngang; giảm khoảng ô chữ số 1→0.85em, bỏ letter-spacing để mã phòng bớt dãn. Build/typecheck PASS, dist cập nhật.

2026-10-04: Đưa lớp phủ xanh và vòng báo lượt vào cùng neo kích thước avatar; lớp xanh nằm dưới khung, vòng xanh nằm trong mép vàng và bỏ quầng sáng ngoài. Làm khung vàng đậm hơn (brightness 0.72) khi báo lượt, danh hiệu vẫn ở trên. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Tăng số mã phòng từ 16px lên 18px theo yêu cầu, giữ vị trí và khung hiện tại. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thu khoảng ô số mã phòng từ 0.85em xuống 0.65em, giữ cả dãy căn giữa khung và cỡ số 18px. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thêm ba asset khung đỏ, xanh lá, xanh dương sau khung vàng mặc định trong Chọn khung; thumbnail chỉ chứa viền. Chọn để xem trước, Sử dụng lưu khung vào session và cập nhật Home/hồ sơ; Hủy giữ lựa chọn cũ. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Căn tab tùy chỉnh cùng chiều cao, icon/chữ trong ô 28px căn giữa; bỏ scale riêng của icon Skin. Đổi nhãn Chọn khung thành Chọn viền. Build/typecheck PASS, dist cập nhật.

2026-10-04: Chữ Mã phòng có sẵn trong ảnh khung; tăng bảng 174x88 lên 184x94px, giữ tâm ngang. Nới ô số từ 0.65em lên 0.75em cho dãy số bớt co sát. Build/typecheck PASS, dist cập nhật.

2026-10-04: Cắt phần ngoài asset viền avatar theo vòng tròn ngoài của khung để bỏ quầng/chi tiết dư vượt mép. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Thu icon Chọn avatar 28→26px và nâng 1px; tăng icon Skin 28→32px, giữ tâm các tab thẳng hàng. Build/typecheck PASS, dist cập nhật.

2026-10-04: Nới bảng mã phòng ngang 184→196px, giữ chiều cao 94px và tâm ngang; thu ô số 0.75→0.7em. Build/typecheck PASS, dist cập nhật.

2026-10-04: Siết clip tròn ảnh khung avatar 44.8%→42.5% để cắt thêm quầng sáng ngoài viền theo ảnh mới. Build/typecheck PASS; chưa browser QA.

2026-10-04: Thu icon Chọn avatar 26→24px và nâng 2px; tăng icon Skin 32→36px. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khôi phục clip khung avatar 44.8% vì mức 42.5% cắt vào viền khiến khung mỏng; giữ tỷ lệ khung ban đầu. Build/typecheck PASS, dist cập nhật.

2026-10-04: Nâng icon Chọn avatar thêm 2px (tổng -4px), hạ icon Skin 2px. Build/typecheck PASS, dist cập nhật.

2026-10-04: Cho avatar bên phải dùng cùng hình/màu như bên trái bằng cách bỏ hue-rotate riêng phe đen; viền và danh hiệu hai bên dùng chung PlayerCard. Build/typecheck PASS, dist cập nhật.

2026-10-04: Nút Sử dụng trong tùy chỉnh avatar cập nhật lựa chọn nhưng giữ nguyên trang tùy chỉnh mở; đổi nút sang tông vàng nâu tối hơn. Build/typecheck PASS, dist cập nhật.

2026-10-04: Hoàn tác riêng màu tối của nút Sử dụng, khôi phục gradient vàng sáng ban đầu; thao tác vẫn áp dụng và ở lại trang tùy chỉnh. Build/typecheck PASS, dist cập nhật.

2026-10-04: Sau khi bấm Sử dụng, nút giảm sáng còn 65%, aria-disabled và bỏ qua lần bấm lại, giữ cursor-pointer. Chọn avatar/viền khác làm nút sáng và áp dụng được lại; vẫn ở trang tùy chỉnh. Build/typecheck PASS, dist cập nhật.

2026-10-04: Tick xanh ở avatar/viền bám lựa chọn đang sử dụng (selected props), không bám draft xem thử; tick chuyển khi Sử dụng, khung sáng vẫn đánh dấu mục xem trước. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khi mở lại tab Chọn avatar/Chọn viền, khôi phục draft của tab theo mục đang sử dụng để khung vàng mặc định trùng với tick xanh. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thay danh hiệu bạn Facebook theo bộ danh hiệu đang dùng ở danh sách thường: AnhTuan86 dùng Tân Binh, HoaPhongLan dùng Kỳ Sĩ; ảnh/tên/sao đồng bộ. Build/typecheck PASS, dist cập nhật.

2026-10-04: Đồng bộ Thêm bạn/Lời mời với cột danh hiệu 376px và cột nút 244px của Danh sách, kéo danh hiệu về trái. Toàn bộ gợi ý/lời mời dùng ảnh bộ danh hiệu đã gửi, đổi Đại Sư→Đại Kỳ Sư, Danh Thủ→Kỳ Tướng, Trạng Nguyên→Kỳ Thánh; giữ Kỳ Vương. Bỏ biểu tượng quân cờ cũ; cặp nút nhận/từ chối rộng 160px và căn phải không đè danh hiệu. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Đã gửi lời mời lấy cùng state với nút Kết bạn tại Thêm bạn; bỏ dữ liệu gửi mẫu. Gửi thêm người vào danh sách và cập nhật bộ đếm, chống trùng; hủy gỡ người và mở lại nút Kết bạn. Build/typecheck PASS, dist cập nhật.

2026-10-04: Dịch icon Facebook ở trạng thái bạn bè sang trái 8px, giữ nguyên chấm online và chữ. Build/typecheck PASS, dist cập nhật.

2026-10-04: Chuẩn hóa các khung danh sách bằng friendListClass chung; Lời mời đã nhận/đã gửi dùng ul cùng viền và khoảng cách như Danh sách/Thêm bạn, tiêu đề nằm ngoài vùng cuộn. Khóa chiều cao hàng 85px; giữ avatar chung 72px và khoảng cách ngang tới viền 38px. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Thông báo gửi lời mời kết bạn dùng nền xanh lá, chữ trắng và tick SVG xanh lá đậm cuối dòng. Build/typecheck PASS, dist cập nhật.

2026-10-04: Bỏ các toast khi tìm tên/ID ở Thêm bạn (nhập trống, tìm thấy/không thấy, đã tìm); giữ lọc tìm kiếm. Build/typecheck PASS, dist cập nhật.

2026-10-04: Bỏ toàn bộ toast/feedback trong Bạn bè, dọn state/timer và lời gọi thông báo ở gửi/chấp nhận/từ chối/hủy lời mời và nhắn tin. Các cập nhật lời mời/nút giữ nguyên. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khi gửi lời mời kết bạn chỉ hiện chữ Đã gửi trong khung xanh lá/chữ trắng ở giữa viewport, tự ẩn sau 3 giây; không tick hoặc nội dung khác. Thông báo nằm ngoài wrapper transform để căn đúng màn hình. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thêm hover brightness 110%/150ms cho nút vàng trong Bạn bè: Mời chơi, Nhắn tin, Kết bạn, Chấp nhận, Tìm và bộ lọc. Chỉ chạy khi nút enabled, giữ trạng thái nút đã gửi/đã mời. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thu nút Kết bạn ở trạng thái Đã gửi còn 160×54px, chừa lề phải 8px và thu khoảng đệm để khung nằm gọn trong hàng. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thông báo Đã gửi giữa màn hình bo góc 5px và chuyển sang Cormorant Garamond đậm, tracking nhẹ. Build/typecheck PASS, dist cập nhật.

2026-10-04: Rút thời gian hiển thị thông báo Đã gửi ở giữa màn hình từ 3 giây xuống 1,3 giây. Build/typecheck PASS, dist cập nhật.

2026-10-04: Ưu tiên bạn bè đang online/đang chơi lên đầu danh sách; giữ nguyên thứ tự giữa nhóm cùng trạng thái và không đổi tab Facebook. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khóa translate/scale hover và active cho nút Bạn bè; hover chỉ đổi độ sáng/màu, giữ nguyên vị trí và kích thước. Build/typecheck PASS, dist cập nhật.

2026-10-04: Sửa hover nút vàng Bạn bè bằng lớp trắng alpha 10% bên trong nút, bỏ filter/transition/translate/scale phát sinh khi hover gây đổi lớp vẽ chữ trên dialog thu phóng. Kiểm tra trực tiếp trình duyệt hai nút đầu Danh sách và Thêm bạn: hover lần lượt giữ nguyên tọa độ/kích thước chữ, computed filter/transform/translate/scale đều none. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thêm lớp màu hover alpha 10% dùng chung cho nút Từ chối và Hủy lời mời trong Bạn bè, giữ nguyên vị trí chữ và không dùng filter/transform. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thông báo Đã gửi mở rộng min-width 250px, màu xanh sáng, bo 3px; vào trong 500ms, giữ 300ms, rồi bay lên 80px và mờ 500ms. Toast cũ chuyển thẳng sang pha bay khi gửi toast mới. Build/typecheck PASS.

2026-10-04: Nút Kết bạn giữ cố định 173×60px trước và sau khi gửi, tiếp tục dùng cùng khung; trạng thái Đã gửi chỉ tối màu, không giảm opacity/kích thước. Build/typecheck PASS.

2026-10-04: Thẻ Đã gửi đặt ngoài wrapper thu phóng và dùng wrapper cố định giữa viewport; bỏ hoạt ảnh vào, hiện yên 300ms rồi bay lên 80px/mờ 120ms. Toast mới làm toast cũ bay ngay; ID tăng ngoài state updater. Build/typecheck PASS.

2026-10-04: Tăng chữ Đã gửi từ 20px lên 24px, thu min-width khung xanh 250px xuống 230px và giảm padding để khung thấp gọn hơn. Build/typecheck PASS.

2026-10-04: Tăng độ đậm nền thông báo Đã gửi từ green-500 lên green-600. Build/typecheck PASS.

2026-10-04: Ba tab Bạn bè dùng selectedImageTabGlow chung với Xếp hạng, giữ cùng ảnh nền khi chuyển tab để chữ/icon không nhích. Transition filter 200ms. Build/typecheck PASS, dist có hiệu ứng.

2026-10-04: Kéo dài hiệu ứng thẻ Đã gửi thêm 0,2 giây: thời gian đứng yên 300→500ms và bay mờ 120→320ms. Build/typecheck PASS, dist đã cập nhật.

2026-10-04: Thu chiều ngang tối thiểu thẻ Đã gửi từ 230px xuống 190px. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khôi phục đủ 7 ảnh danh hiệu gốc vào FriendRank dùng chung cho Danh sách, Facebook, Thêm bạn và cả hai nhóm Lời mời. Đồng bộ tên và sao theo cấp; thay huy hiệu quân cờ tròn, cột danh hiệu 320px chứa ảnh 180×72px. Build/typecheck PASS; đủ 7 asset trong dist.

2026-10-04: Sửa chữ Đã gửi giật kích thước ở lần đầu: tải Cormorant Garamond theo đúng weight/size và chuỗi tiếng Việt khi mount, đợi font sẵn sàng trước khi hiện toast và bắt đầu thời gian hiển thị. Hủy cập nhật sau unmount. Build/typecheck PASS; dist có fonts.load. Chưa browser QA.

2026-10-04: Khôi phục hover đổi độ sáng 150ms cho nút Bạn bè (vàng, phụ, chat, lọc và tab), không translate/scale. Mời chơi/Nhắn tin dùng phản hồi riêng thay vì updateFeedback vốn bỏ qua các hành động này; panel nói rõ hai tính năng chưa được hỗ trợ, không giả lập gửi thành công. Build/typecheck PASS; dist xác nhận có thay đổi. Chưa browser QA.

2026-10-04: Tách nền/cắt sát viền asset tiêu đề Bạn bè bằng imagegen và crop alpha sau xử lý; dùng friend-section-title-frame-tight.png (2170×112), alpha góc 0 và tâm 255. Áp dụng chung Gợi ý/Lời mời nhận/Lời mời gửi, bỏ dải kem và phần thừa ngoài viền. Build/typecheck PASS, dist chứa asset mới; đã xem ảnh, chưa browser QA.

2026-10-04: Chuẩn hóa FriendRow cao cố định 85px, avatar 76px dùng chung, padding hàng 16px ngang/0 dọc và lề avatar 22px. Cột danh hiệu 320px, thao tác 330px cố định giữa mọi tab. Mọi danh sách dùng friendListClass với scrollbar-gutter stable, bỏ grid chia đều 5 hàng; lời mời dùng ul và tiêu đề nằm ngoài vùng cuộn. Cặp nút nhận/từ chối 160×60px. Build/typecheck PASS; dist xác nhận bố cục mới, chưa browser QA.

2026-10-04: Đổi giá trị vàng thử nghiệm trong sessionStore từ 1000 thành 100000 theo yêu cầu xem ô vàng Home. Build/typecheck PASS; dist có giá trị mới.

2026-10-04: Nối nút Kết bạn với sentInvites; nút Đã gửi và danh sách/bộ đếm dùng cùng nguồn state, chống trùng và hủy mở lại nút kết bạn. Thêm badge đỏ tròn 28px góc phải tab Lời mời, đếm received và giảm khi chấp nhận/từ chối, ẩn khi bằng 0. Build/typecheck PASS; dist có badge, chưa browser QA.

2026-10-04: Thu cột danh hiệu 320→270px để nền nâu ngắn hơn 50px từ mép trái và danh hiệu dịch phải 50px, tăng chỗ cho tên/trạng thái. PresenceLabel flex-nowrap/whitespace-nowrap kể cả Facebook online. Giữ ảnh danh hiệu 180×72 và hàng85/avatar76; cặp nút lời mời145×60/font18 để chừa khoảng cho danh hiệu không đè nút. Build/typecheck PASS; dist cập nhật, chưa browser QA.

2026-10-04: Chuẩn hóa Presence Friends còn online/offline; Facebook là cờ phân loại riêng. Người Facebook hiện chấm xanh/xám + Đang online/Offline trên hàng đầu, icon f ở hàng dưới; tab Facebook vẫn lọc theo cờ riêng. Đổi trạng thái mẫu playing thành online. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Tạo docs/FRIENDS-UI-RULES.md ghi lại quy tắc bố cục, avatar, trạng thái, Facebook, danh hiệu, hover, lời mời, toast và checklist QA; thêm yêu cầu bắt buộc đọc tài liệu vào AGENTS.md trước khi sửa Bạn bè.

2026-10-04: Chốt lại phân loại danh sách Bạn bè theo yêu cầu: Tất cả chỉ bạn trong game; Đang online chỉ bạn trong game online; Bạn Facebook chỉ contact Facebook có chơi game. Cập nhật bộ lọc và FRIENDS-UI-RULES.md.

2026-10-04: Chỉnh PresenceLabel: chấm xanh/xám, chữ online/offline và icon Facebook nằm cùng hàng ngang; cập nhật quy tắc Bạn bè. Build/typecheck PASS, dist cập nhật.

2026-10-04: Làm rõ quy tắc Bạn Facebook: contact đã kết bạn Facebook, chơi game và đăng nhập/liên kết Facebook; bộ lọc độc lập online/offline. Đặt fixture HoaPhongLan offline để thể hiện người Facebook offline vẫn ở tab này. Build/typecheck PASS.

2026-10-04: Thêm sortOnlineFirst áp dụng cho danh sách bạn game/Facebook, gợi ý, lời mời nhận và lời mời đã gửi; sắp xếp ổn định trong cùng trạng thái sau khi lọc/tìm kiếm. Lưu quy tắc ưu tiên online trong FRIENDS-UI-RULES.md. Build/typecheck PASS.

2026-10-04: Thu icon Facebook 25→21px và khoảng cách tới chữ trạng thái 12→6px; lưu kích thước vào FRIENDS-UI-RULES.md. Build/typecheck PASS, dist cập nhật.

2026-10-04: Lấy Danh sách làm chuẩn bố cục: Danh sách/Thêm bạn dùng chung friendDirectoryClass và các mốc54+14+48+14=130px trước vùng cuộn, giữ cùng kích thước/vị trí khung. Thêm bạn đặt Gợi ý trên tìm kiếm để trùng mốc. Lời mời chỉ đồng bộ FriendRow, vị trí hai nhóm giữ riêng. Lưu quy tắc mới. Build/typecheck PASS, dist có bố cục chung; chưa browser QA.

2026-10-04: Gom chấm trạng thái/chữ/icon Facebook vào cùng một inline-flex row-nowrap, không dùng khối p riêng; bổ sung quy tắc không được xuống dòng. Build/typecheck PASS. Browser QA tại localhost5173: cả online/offline đều có cùng tâm dọc giữa ba phần tử (sai số <0,001px); lưu ảnh xác nhận facebook-status-inline.png.

2026-10-04: Thu nền nâu Danh sách/Thêm bạn thêm30px từ trái bằng cột danh hiệu270→240px, danh hiệu dịch phải30px. Lời mời giữ vị trí cũ để không đè cặp nút; mọi hàng/avatar/padding vẫn dùng chung. Cập nhật quy tắc. Build/typecheck PASS.

2026-10-04: Cố định FriendIdentity cao76px, cột tên/trạng thái grid53px với hàng24/21px cách8px; loại bỏ margin/linebox biến thiên của trạng thái inline-flex. Tên/trạng thái luôn cùng tọa độ trong hàng cho mọi tab kể cả Facebook. Lưu quy tắc. Build/typecheck PASS, dist xác nhận; chưa browser QA.

2026-10-04: Sửa last:border-b-0 thành last:border-b-transparent để hàng cuối không tăng vùng nội dung và lệch tâm ~0,4px. Lưu quy tắc giữ độ dày viền hàng. Build/typecheck PASS; browser đo Danh sách và Thêm bạn: mọi hàng có cùng độ lệch tên13,26px/trạng thái40,46px sau scale, sai số<0,001px. Ảnh friends-fixed-row-offsets.png.
2026-10-04: Triển khai rankProgression dùng chung theo Elo (bậc 1–4: 3 sao; 5–6: 4; 7: 5), các ngưỡng lên bậc 1300/1600/1900/2200/2600/3000 và giới hạn 3200. Bậc 7 tăng 1–5 sao tại 3000/3050/3100/3150/3200. Mọi hàng Bạn bè tính ảnh/tên/sao từ Elo thay sao cố định, giữ hình học hàng. Lưu docs/RANK-SYSTEM.md và cập nhật FRIENDS-UI-RULES.md. Build/typecheck PASS, xác nhận logic trong dist; chưa browser QA. Chưa triển khai cộng/trừ Elo sau trận hoặc persistence.
2026-10-04: Thêm hàng sao ảnh ab9a1b7f dưới danh hiệu Home; trim alpha ảnh thành player/rank-star.png, dùng RankStars chia đều/căn giữa theo tâm và chiều rộng khung danh hiệu, sao chưa đạt grayscale/opacity. Giữ bản xem trước Tân Binh 1/3 sao. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Browser QA Home: 3 ô sao tải thành công, cùng chiều cao 20.8px sau scale, khoảng cách đều; tâm hàng sao lệch 0px so với tâm danh hiệu, cách đáy 2.84px sau scale. Ảnh kiểm chứng lưu ở outputs/home-rank-stars.png của chat.
2026-10-04: Chuẩn hóa mốc bắt đầu 7 bậc thành 1000/1300/1600/1900/2300/2700/3200; mọi bậc mỗi 100 Elo thêm 1 sao. Số ô sao theo độ dài bậc là 3/3/3/4/4/5/5. Cập nhật tài liệu rank và Bạn bè; build/typecheck PASS, xác nhận mốc mới trong dist. Đang chờ người dùng chốt giới hạn 3600 để bậc 7 tăng tới 5 sao hoặc ngoại lệ đủ 5 sao tại 3200; hiện giữ giới hạn cũ 3200.
2026-10-04: Theo phản hồi, tăng ô sao Home từ 22px lên 28px và nâng hàng sao để chồng lên đáy khung danh hiệu 2px; vẫn chia đều/căn tâm. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Tăng tiếp kích thước mỗi ô sao Home từ 28px lên 36px; giữ vị trí, chia đều và căn giữa. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Nâng hàng sao Home thêm 6px so với vị trí trước, chồng lên đáy danh hiệu 8px; giữ size 36px và căn giữa. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Thu khoảng cách sao Home: justify-evenly thành căn giữa với gap 4px; nâng hàng lên thêm 6px (chồng vào khung 14px), giữ size 36px. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Nâng cụm danh hiệu Home và hàng sao cùng 4px, giữ nguyên khoảng cách tương đối; không đổi vị trí danh hiệu trong các màn hồ sơ khác. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Hạ cụm danh hiệu Home và hàng sao xuống 3px so với lần trước; giữ nguyên khoảng cách tương đối. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Trên Home thay khung bậc Tân Binh bằng khung Danh Hiệu Phong Tặng cấp 1 màu tím-vàng, thêm nhãn Huyền Thoại ở giữa; giữ cụm sao phía dưới. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Dịch riêng chữ Á Quân của Vinh Quang Kỳ Đài cấp 1 và 3 xuống 1px; các chữ/cấp khác giữ vị trí. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Căn riêng Hạng Ba Vinh Quang Kỳ Đài: cấp 2 lên 1px, cấp 3 xuống 1px; giữ các chỉnh lệch Á Quân trước đó. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Hạ thêm chữ Quán Quân của Vinh Quang Kỳ Đài cấp 3 xuống 1px; giữ các căn chỉnh Á Quân và Hạng Ba đã có. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Thay khung Huyền Thoại dưới avatar Home bằng danh hiệu thứ 7 Kỳ Thánh (asset 0473928b), bỏ chữ Huyền Thoại; bản xem trước bậc 7 dùng Elo 3200 và sao từ getRankProgress. Giữ kích thước/vị trí khung đã chốt. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Giới hạn vùng sao Home theo chiều rộng danh hiệu, cao 36px; tự tính size min(36px, (width - gaps)/số ô sao) để 4/5 sao thu nhỏ, không tràn. Giữ căn giữa/gap 4px, cập nhật quy tắc. Build/typecheck PASS, dist cập nhật.
2026-10-04: Đổi danh hiệu Home từ Kỳ Thánh về danh hiệu đầu tiên Tân Binh theo ảnh; cập nhật xem trước Elo1000 và 1/3 sao, giữ vị trí/vùng sao đã chốt. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Cập nhật hệ sao theo chốt mới: bảy bậc đều 3 sao; mỗi 100 Elo tăng sao; ngưỡng bậc 1000/1300/1600/1900/2200/2500/2800; sao khóa mức tại 2800 nhưng Elo vẫn giữ/tăng không giới hạn. Đồng bộ Friends và docs/RANK-SYSTEM.md. Build/typecheck PASS, dist cập nhật.
2026-10-04: Đổi danh hiệu Home về bậc cuối Kỳ Thánh, xem trước Elo2800 theo hệ sao mới; build/typecheck PASS, dist cập nhật.
2026-10-04: Đổi danh hiệu Home từ Kỳ Thánh về bậc đầu Tân Binh (Elo1000), giữ hệ sao chung; build/typecheck PASS, dist cập nhật.
2026-10-04: Chuẩn hóa sao dưới avatar theo danh hiệu 1 Tân Binh: dùng rankArtwork cho đủ 7 asset, bù mép alpha dưới mỗi ảnh để khoảng cách tới sao đồng nhất; giữ sao36px/gap4px/vùng khung. Đổi Home xem trước danh hiệu 6 Đại Kỳ Sư Elo2500. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Hạ hàng sao dưới avatar thêm 3px, áp dụng chung cả 7 danh hiệu qua công thức bù alpha; giữ kích thước sao. Build/typecheck PASS, dist cập nhật.
2026-10-04: Bật xem thử UI danh hiệu Home theo yêu cầu: bắt đầu bậc1, cứ2000ms chuyển bậc kế tiếp, sau7 quay lại1. State xem trước cục bộ, timer hủy khi rời Home; dùng catalog ảnh và quy tắc sao chung. Build/typecheck PASS, dist cập nhật.
2026-10-04: Khóa vị trí danh hiệu/sao Home theo bậc1: khung ảnh có chiều cao/rộng cố định, sao dùng vị trí cố định; gỡ bottomInsetRatio gây dịch hàng sao theo asset. Giữ vòng xem thử2s. Build/typecheck PASS, dist cập nhật.
2026-10-04: Tắt luân phiên danh hiệu2s, xem trước bậc4 Kỳ Tướng Elo1900. Thêm AvatarRankBadge chung cho Home, ProfileDialog, AvatarCustomization, PlayerCard để đồng bộ danh hiệu và sao dưới avatar; kích thước sao theo tỷ lệ avatar. Chỉ render sao đạt tại cả AvatarRankBadge và FriendsDialog. Tăng khu vực tùy chỉnh avatar20px để đủ chỗ hàng sao. Build/typecheck PASS, dist cập nhật.
2026-10-04: Browser QA Home, Hồ sơ, Tùy chỉnh avatar: cùng hiện Kỳ Tướng1 sao, chỉ1 ảnh sao trong DOM và tâm sao lệch dưới0.001px; tùy chỉnh không đè hàng nút. PlayerCard đã tích hợp/build, chưa kiểm tra trong bàn chơi.
2026-10-04: Đổi hàng sao AvatarRankBadge từ căn giữa sang căn trái, sao đạt xếp từ trái qua phải ở tất cả các cụm avatar/danh hiệu. Build/typecheck PASS, dist cập nhật.
2026-10-04: Nâng Elo xem trước dùng chung AvatarRankBadge từ1900 lên2100 để Kỳ Tướng hiển thị3 sao tại Home, Hồ sơ, tùy chỉnh và bàn chơi. Build/typecheck PASS, dist cập nhật.
2026-10-04: Bỏ hẳn họa tiết cuộn nâu bên trái avatar FriendRow; chỉnh lề container từ trái16/phải16 sang trái0/phải38, identity lề16, làm avatar/tên/danh hiệu/nút đều dịch trái22px và lấp chỗ trống. Build/typecheck PASS, dist cập nhật.
2026-10-04: Thay đủ bảy danh hiệu bằng bộ ảnh mới người dùng cung cấp, trim đúng bounding box alpha và lưu tại src/assets/ranks/rank-01..07-*-v2.png. Bạn bè và AvatarRankBadge dùng chung rankArtwork; giữ ô ảnh/vùng sao hiện có. Gỡ đúng bảy ảnh cũ khỏi project, chuyển bản khôi phục vào work/removed-old-rank-assets của chat. Nguồn/crop ghi tại rank-artwork-v2.md. Build/typecheck PASS; xác nhận đủ bảy ảnh mới trong dist. Chưa browser QA.
2026-10-04: Tăng nhẹ kích thước bảy danh hiệu mới: khung dưới avatar tăng 8% qua AVATA_RATIO dùng chung; hàng Bạn bè từ180×72 thành194×78px. Cập nhật quy tắc kích thước; build/typecheck PASS và dist có kích thước mới. Chưa browser QA.
2026-10-04: Căn giữa cụm sao đã đạt dưới danh hiệu trong AvatarRankBadge dùng chung; giảm kích thước sao từ29.289cqw xuống25cqw, gap từ3.254cqw xuống1.5cqw và nâng vùng sao3px theo anchor106px. Áp dụng Home/Hồ sơ/Tùy chỉnh/PlayerCard; cập nhật RANK-SYSTEM.md. Build/typecheck PASS; xác nhận thông số mới trong dist. Chưa browser QA.
2026-10-04: Dịch tâm vùng sao AvatarRankBadge sang phải3px theo anchor106px; áp dụng chung các cụm avatar/danh hiệu và ghi vào RANK-SYSTEM.md. Build/typecheck PASS; xác nhận offset trong dist. Chưa browser QA.
2026-10-04: Bật cycleRanks cho danh hiệu Home: lần lượt bậc1→7 mỗi2000ms rồi lặp; preload bảy ảnh, timer cleanup khi unmount. Giữ geometry danh hiệu/sao và dùng getRankProgress cho sao, các nơi khác giữ preview Kỳ Tướng. Build/typecheck PASS; xác nhận cycle trong dist. Chưa browser QA.
2026-10-04: Gỡ timer/cycleRanks; AvatarRankBadge mặc định Tân Binh1 sao với DEFAULT_PLAYER_ELO=1000. Session khởi tạo Elo1000; Home đọc cùng Elo cho điểm Cờ Tướng và danh hiệu, thay điểm mẫu2066. Ghi quy tắc khởi tạo người chơi mới vào RANK-SYSTEM.md (chưa có backend tài khoản). Build/typecheck PASS; xác nhận dist bỏ cycleRanks/2066. Chưa browser QA.
2026-10-04: Đổi thứ tự bậc5 thành Đại Sư (2200–2499 Elo), bậc6 thành Kỳ Vương (2500–2799 Elo); đồng bộ catalog ảnh/tên và tài liệu Bạn bè/hệ bậc. Build/typecheck PASS; xác nhận hai bậc trong dist. Chưa browser QA.
2026-10-04: Khôi phục quy tắc sao luôn xếp trái→phải bằng justify-start trong RankStars, kể cả1 sao. Giữ kích thước/gap/vùng và offset hiện có; ghi rõ sao đầu cố định và không căn giữa theo số sao trong RANK-SYSTEM.md. Build/typecheck PASS; xác nhận trong dist. Chưa browser QA.
2026-10-04: Home bật previewStars=3 trên AvatarRankBadge để xem thử Tân Binh đủ3 sao, giữ xếp trái→phải. Không đổi Elo khởi tạo1000 hoặc quy tắc sao thật; ghi rõ preview trong RANK-SYSTEM.md. Build/typecheck PASS; xác nhận previewStars:3 trong dist. Chưa browser QA.
2026-10-04: Tạo docs/PROJECT-MEMORY.md làm ghi nhớ quy tắc người dùng và lỗi cần tránh; ghi các chốt hiện tại về bậc/Elo/sao/Bạn bè, tách preview3 sao khỏi mặc định, ghi nguyên nhân lỗi chỉ khi có bằng chứng và mẫu cập nhật. AGENTS.md bắt buộc đọc ghi nhớ trước khi sửa và đối chiếu trước bàn giao. Build/typecheck PASS; dist đã cập nhật. Task chỉ đổi tài liệu.
2026-10-05: Căn giữa vùng đủ3 ô sao (78% bề rộng khung) dưới danh hiệu, wrapper cùng tâm ngang danh hiệu và bỏ offset phải3px. Sao đạt điền từ ô trái sang phải, không dịch khi số sao thay đổi; giữ kích thước/gap/vị trí dọc. Cập nhật RANK-SYSTEM và PROJECT-MEMORY, ghi lỗi STAR-02 do vùng78% nằm lệch trái trong wrapper100%. Build/typecheck PASS; xác nhận grid ô sao cố định trong dist. Chưa browser QA.
2026-10-05: Dịch vùng sao AvatarRankBadge sang phải3px theo anchor106px và khóa tọa độ theo yêu cầu. Gom offset/tỷ lệ vào RANK_STAR_LAYOUT, AVATA_RANK_STARS_STYLE; mọi consumer dùng chung. Thay sao ký tự trong FriendRank bằng RankStars ảnh trong vùng103px; không còn sao ký tự trong src. Ghi khóa tại PROGRESS gốc và PROJECT-MEMORY, cập nhật RANK-SYSTEM/FRIENDS-UI-RULES. Build/typecheck PASS; xác nhận token và vùng Bạn bè trong dist. Chưa browser QA.

2026-10-05: Thêm AvatarRankBadge dưới avatar84px trong mọi hàng Xếp hạng, cả tab Cờ Tướng/Cờ Úp; danh hiệu và sao lấy từ Elo của hàng, giữ tọa độ chung đã khóa. Tăng hàng lên156px và gap8px, vùng avatar132px để đủ cụm, danh sách cuộn dọc thay chia cứng5 hàng. Cập nhật PROJECT-MEMORY. Build/typecheck PASS; xác nhận kích thước và binding Elo trong dist. Chưa browser QA.

2026-10-05: Giảm padding dọc hàng Xếp hạng từ12 xuống6px, chiều cao156 xuống148px; giữ vùng avatar/danh hiệu/sao132px và tọa độ đã khóa. Huy hiệu thứ hạng dùng ô90×90 căn giữa cột/hàng, số hạng4+ neo tâm50%/50%. Cập nhật PROJECT-MEMORY. Build/typecheck PASS; xác nhận kích thước và căn giữa trong dist. Chưa browser QA.

2026-10-05: Thu hàng Xếp hạng148→138px, bỏ padding dọc6px→0. Đặt toàn cụm avatar xuống5px trong khối132px để vương miện không chạm viền và cân khoảng trống trên/dưới; tọa độ sao/danh hiệu tương đối avatar đã khóa giữ nguyên. Cập nhật PROJECT-MEMORY. Build/typecheck PASS; xác nhận thông số trong dist. Chưa browser QA.

2026-10-05: Xếp hạng tăng kích thước danh hiệu/sao thật20% (AvatarRankBadge sizeScale1.2) cho cả tab Cờ Tướng/Cờ Úp theo phản hồi chữ quá nhỏ/mờ. Danh hiệu khoảng126.24px theo avatar84px; hàng138→144px, khối132→138px/lề trái18px để tránh tràn và chạm huy hiệu hạng. Giữ chuẩn tương đối của RankTitleBadge; không bộ lọc động. Build/typecheck PASS; browser QA đo danh hiệu107.29px ở viewport hiện tại (trước89.41px), sao nằm trong hàng, filter none. PROJECT-MEMORY/RANK-SYSTEM cập nhật ngữ cảnh Xếp hạng.

2026-10-05: Sửa báo cáo nhấp nháy còn ở Home khi hover nhóm5 nút bên phải: homeUtilityButton bỏ brightness125/transition rộng, giữ sáng bằng gradient/viền/chữ và transition border-color,color,box-shadow; dùng chung cho Home/ComputerSetup/RoomSelection. RankTitleBadge isolate+translateZ(0)+backface hidden để lớp ảnh ổn định khi sibling hover, sao vẫn tràn đúng vùng đã chốt. Build/typecheck PASS. Browser QA hover lần lượt Thành tích/Lịch sử/Bạn bè/Bật nhạc/Toàn màn hình bằng chuột phải+Escape: filter nút none, vị trí danh hiệu x138.8086/y102.7877 và kích thước125.4973×50.18 không đổi ở cả5 lượt, opacity1/ảnh tải đủ; screenshot danh hiệu hiển thị. Ghi RANK-02, chưa xác nhận nguyên nhân compositor trên trình duyệt riêng của người dùng.

2026-10-05: Làm rõ Thắng/Thua trong Lịch sử theo yêu cầu không đổi kích thước: thay ảnh screenshot crop104×49 phóng4× bằng MatchResultBadge (nền cọ SVG vàng/xanh, text thật Alegreya italic800). Giữ ô82.77551×39px và offset Thua-2/-2, không thay hàng/cột/avatar. Component dùng chung cho hai người và cả tab Đã chơi/Đã lưu. Build/typecheck PASS; browser QA hai tab, chữ vừa ô; DOM14 nhãn có khung70.36×33.15px theo scale0.85, không tràn. Cập nhật PROJECT-MEMORY/history-crops; giữ ảnh cũ làm đối chiếu.

2026-10-05: Sửa theo chốt giữ kích thước cũ, chỉ làm rõ: bỏ sizeScale1.2 khỏi AvatarRankBadge/Xếp hạng; khôi phục hàng138px, khối132px/lề trái8px, danh hiệu khoảng105.2px theo avatar84px. RankTitleBadge dùng contrast cố định1.12/transition-none trong lớp vẽ ổn định, áp dụng chung7 danh hiệu, không thay sao hoặc ảnh nguồn. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS; browser QA cả2 tab danh hiệu89.409px ở viewport hiện tại (đúng trước lần phóng20%), contrast1.12/transition none; Home hover Thành tích vẫn dùng lớp vẽ ổn định. Lưu quy tắc không đổi kích thước/vị trí để chữa mờ.

## Lịch sử điều chỉnh tọa độ sao Home (chuẩn hiện hành ở PROJECT-MEMORY.md)

- 2026-10-05: Người dùng cho phép mở khóa, nâng riêng sao Home thêm3px (starsYPx=-6 tổng), rồi khóa lại HOME_RANK_BADGE_OFFSETS/HOME_AVATA_RANK_STARS_STYLE. Danh hiệu Home titleYPx=-2; phần khác giữ nguyên. Cập nhật docs/project memory và RANK-SYSTEM. Build/typecheck PASS; xác nhận starsYPx:-6 trong dist. Chưa browser QA.
 

- 2026-10-05: Người dùng đồng ý mở khóa để nâng riêng danh hiệu Home2px, sao tổng6px theo anchor106px (bản đầu nâng3px, lượt sau nâng thêm3px), rồi khóa lại HOME_RANK_BADGE_OFFSETS/HOME_AVATA_RANK_STARS_STYLE. Home dùng placement=home; các nơi khác giữ tọa độ chung. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS; xác nhận starsYPx:-6 trong dist. Chưa browser QA.


- 2026-10-05: Vị trí vùng sao dưới danh hiệu theo RANK_STAR_LAYOUT/AVATA_RANK_STARS_STYLE trong playerIdentityLayout.ts: anchor106px, offsetX3px, bottomInset14px, clusterOffsetY-1px, starWidth25cqw, gap1.5cqw. Riêng Home khóa HOME_RANK_BADGE_OFFSETS (titleY-2px, starsY-6px) và HOME_AVATA_RANK_STARS_STYLE. Không tự dịch/ghi đè tọa độ hoặc tỷ lệ; chỉ sửa sau khi người dùng đồng ý mở khóa theo AGENTS.md.

- 2026-10-05 (cập nhật): Người dùng cho phép nâng sao Home thêm5px sau khi phản hồi lần dịch3px khó thấy. Tọa độ khóa mới: HOME_RANK_BADGE_OFFSETS starsYPx=-11 (tổng nâng11px); titleYPx=-2. Build/typecheck PASS và screenshot Home từ bản build mới đã xác nhận.

- 2026-10-05: Theo đồng ý mở khóa, hạ riêng sao Home2px (`starsYPx=-9`), giữ danh hiệu `titleYPx=-2` và mọi vị trí chung khác. Khóa lại tọa độ Home sau chỉnh. Build/typecheck PASS; xác nhận asset dist có `starsYPx:-9` và không còn `starsYPx:-11`. Browser QA tại localhost:5173/?rankPreview=20261005d hiển thị cụm sao dưới danh hiệu Home.

- 2026-10-05: Người dùng cho phép thay đổi vị trí sao Home và yêu cầu hạ thêm2px: `starsYPx=-9→-7`, giữ `titleYPx=-2` và mọi tọa độ chung khác. Phạm vi offset sao Home vẫn mở để tiếp tục thay đổi theo yêu cầu. Build/typecheck PASS, asset dist xác nhận `starsYPx:-7`; browser QA tại localhost:5173/?rankPreview=20261005e hiển thị sao dưới danh hiệu Home.

- 2026-10-05: Lấy Home hiện tại làm chuẩn toàn project: thêm RankTitleBadge với RANK_TITLE_STARS_STYLE, bỏ placement/offset riêng Home. AvatarRankBadge dùng chung cho Home/Hồ sơ/Tùy chỉnh/PlayerCard/Xếp hạng; FriendRank dùng cùng component, sao dưới ảnh, cụm166×84px vừa hàng85px. Lưu quy tắc sửa mọi consumer tương ứng trong AGENTS/PROJECT-MEMORY/RANK-SYSTEM/FRIENDS-UI-RULES; ghi lỗi STAR-03. Build/typecheck PASS, dist index-G28z8FUv.js xác nhận clusterOffsetYPx:-8 và không còn starsYPx riêng Home. Browser QA Home, Hồ sơ, Tùy chỉnh, Danh sách/Thêm bạn/Lời mời và hai tab Xếp hạng; tỷ lệ vị trí sao/chiều cao khung khoảng0.642 ở mọi vùng đã đo. PlayerCard được kiểm tra qua consumer dùng chung, chưa mở ván để QA.

- 2026-10-05: Tăng độ rõ cả7 danh hiệu tại RankTitleBadge dùng chung: SVG convolution nhẹ (tổng kernel1, preserveAlpha) và giảm bóng đổ từ0/2/2 xuống0/1/0.4px. Giữ kích thước, tỷ lệ và tọa độ sao. Thử optimize-contrast gây răng cưa khi thu ảnh lớn nên đã bỏ; ghi bài học trong PROJECT-MEMORY. Browser QA Xếp hạng: ảnh tải đủ, filter áp dụng, imageRendering=auto; các danh hiệu nhỏ khoảng89px ở viewport hiện tại vẫn giới hạn chi tiết chữ. Build/typecheck PASS; kiểm tra bundle cập nhật trước bàn giao.

- 2026-10-05: Sửa báo cáo danh hiệu nhấp nháy khi rê vùng khác: gỡ useId/SVG convolution/filter URL và drop-shadow động khỏi RankTitleBadge, ảnh render trực tiếp cho mọi consumer. Giữ tọa độ danh hiệu/sao và các hiệu ứng hover của nút. Lưu lỗi RANK-01; bộ lọc là thay đổi nghi gây lỗi, chưa xác nhận compositor. Build/typecheck PASS; dist index-DM45AVNw.js không còn feConvolveMatrix/rank-artwork-. Browser QA Home: đưa con trỏ tới Thành tích và Chơi Nhanh bằng click chuột phải rồi Escape (không kích hoạt chức năng); DOM xác nhận nút đang :hover, ảnh tải đủ, opacity1/filter none, screenshot danh hiệu hiển thị ở cả hai trạng thái.

- 2026-10-05: Sửa sao bị dồn vào danh hiệu: neo từ đáy khung thêm2px theo anchor106px (top139.961945px), giữ sao25cqw/gap1.5cqw/offsetX3px và kích thước artwork. Xếp hạng nới hàng156px/khối150px; Bạn bè116px/cụm114px; Hồ sơ220px; Tùy chỉnh230px; PlayerCard tăng khoảng dành cho cụm ở desktop/short/compact. Đồng bộ token và docs, ghi STAR-04. Làm nét cả7 danh hiệu bằng SharpRankArtwork Canvas: thu nhiều bước theo độ phân giải hiển thị/DPR, contrast1.12 và unsharp mask0.65 tĩnh, giữ alpha, không CSS/SVG filter động. Không tăng kích thước danh hiệu. Chữ Thắng26→24px/tracking-0.4px, giữ ô82.77551×39 và Thua26px. Build/typecheck PASS, dist cập nhật. Browser QA hai tab Xếp hạng, hai tab Lịch sử (Thắng gọn trong nền), Bạn bè Tất cả, Hồ sơ, Tùy chỉnh, Home hover Thành tích. Đo title89.409px ở Xếp hạng, sao22.344px (25%), gap dưới khung1.339px theo scale; Bạn bè sao25%, còn4.27px trước viền dưới hàng. Canvas CSS filter none, ảnh hiển thị ở hover; chưa kiểm chứng nhấp nháy từng frame hoặc mở ván QA PlayerCard. Chi tiết chữ vẫn phụ thuộc diện tích hiển thị nhỏ; không tuyên bố khôi phục toàn bộ chi tiết gốc.
- 2026-10-05: Theo yêu cầu hoàn tác, phục hồi sao top118.961945px theo avatar106px (bottomInset14/clusterOffsetY-8), giữ tỷ lệ25%/gap1.5%/offsetX3. Khôi phục vùng chứa trước lần neo sao xuống đáy: Ranking138/132px, Friends85/84px, Profile190px, AvatarCustomization190/188/183px, PlayerCard margins78/54px và bỏ compact mb28. Giữ thay đổi làm nét Canvas và chữ Thắng vì người dùng chỉ yêu cầu hoàn tác vị trí sao. Cập nhật quy tắc hiện hành và STAR-04: không tự đổi chuẩn vị trí từ yêu cầu giữ tỷ lệ. Build/typecheck PASS; dist index-tWx-SYxJ.js xác nhận clusterOffsetYPx:-8, không còn titleGapPx:2. Chưa browser QA lượt hoàn tác.

- 2026-10-05: Cải thiện nét danh hiệu nhỏ theo yêu cầu giữ nguyên kích thước: SharpRankArtwork bỏ chuỗi giảm đôi nhiều lần làm mềm chữ, dùng lấy mẫu2x rồi thu một lần về độ phân giải hiển thị; unsharp mask1.1 cho khung≤140px/0.65 cho khung lớn, threshold1.5 và bù nét giới hạn±28 để hạn chế viền sáng. Component chung áp dụng cả7 bậc và mọi consumer. Không sửa kích thước/khung/vị trí danh hiệu hoặc sao; giữ clusterOffsetY-8. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS, dist index-CxeKkb9u.js cập nhật. Chưa browser QA trực quan lượt này; mức rõ tối đa vẫn phụ thuộc số pixel của chữ nhỏ.

- 2026-10-05: Kiểm tra nguyên nhân mờ Xếp hạng trước sửa: parent transform matrix0.85 ở1280×720/matrix0.728205 ở960×600, không CSS zoom; danh hiệu105.188×42.063px và sao26.287/26.3px trước parent scale. Danh hiệu Canvas lại nằm trong parent scale. Nguồn rank2144×724/star1199×1219 đủ2×, avatarSVG; icon red-general60×62 thiếu2× ở43px. Đã báo nguyên nhân trước sửa. RankingDialog chuyển toàn bảng sang kích thước CSS cuối cùng/token pixel nguyên, bỏ parent scale và medal scale110; RankingRankBadge render ảnh gốc/img trực tiếp, object-contain, đọc cùng token tọa độ cũ. Không đổi asset hay các màn khác. Browser QA trước/sau1280×720 và960×600, cả2 tab; sau sửa root/ancestor ảnh transform none/scale none/zoom1, Canvas0. Ở1280: medal84×84, avatar65×65, title89×36, sao22×22; ở960: title77×31, sao19×19. Hàng117px so với117.3px trước ở1280,100px so với100.492px ở960; bề rộng hàng chênh vài pixel do làm tròn/viền, không đổi cấu trúc/cột. Ảnh trực tiếp tránh nội suy parent, chữ nhỏ vẫn giới hạn chi tiết theo số pixel. Đã reset viewport. Build/typecheck PASS; dist index-eS4U3gEw.js có token mới. Chưa đạt nguồn2× cho icon Điểm vì không được thay asset; đã báo giới hạn. Quy tắc cập nhật PROJECT-MEMORY/RANK-SYSTEM.

- 2026-10-05: Theo yêu cầu lấy khoảng cách/kích thước sao Home áp dụng toàn project, tìm mọi consumer. Home/Hồ sơ/Tùy chỉnh/PlayerCard/Bạn bè đã dùng RankStars/RANK_TITLE_STARS_STYLE chung; RankingRankBadge còn tự làm tròn sao/gap/top nên lệch nhẹ. Bỏ phần tính/render sao riêng của Ranking, dùng cùng component/style Home. Giữ tọa độ chuẩn và khung/layout hiện hành; ảnh danh hiệu Ranking vẫn render trực tiếp, parent không scale. Ưu tiên tỷ lệ25%/gap1.5% của Home hơn làm tròn từng sao. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS, dist index-CS5d2E5R.js cập nhật. Chưa browser QA lượt này.

- 2026-10-05: Sửa rendering ảnh nhỏ toàn project theo nguyên nhân đã báo trước sửa: Home/Profile/Tùy chỉnh/Bạn bè/Lịch sử/ComputerSetup có parent transform scale; rank Canvas trung gian còn bị lấy mẫu lại; crop huy hiệu và marker layer có scale riêng. Không CSS zoom; nguồn rank/sao đủ2x, một số icon/frame Lịch sử không đủ. Thêm CrispUiImage/crispUiRendering để img native và CSS cuối cùng, pixel token nguyên; bỏ parent scale, SharpRankArtwork Canvas và GPU translateZ/backface ép buộc. Giữ contrast1.12 tĩnh, asset gốc, cấu trúc và tọa độ/tỷ lệ sao Home. FittedUiArtwork chuyển stretch huy hiệu đã duyệt sang kích thước ảnh thật, giữ crop/style; nền Game scale1.16 thành box116% tương đương. Board marker/hit layer dùng tọa độ/kích thước cuối cùng, không đổi luật/animation/quân. Đồng bộ SocialUi/RankStars/AvatarFrameOverlay/RankingRankBadge; History frame object-contain. Ghi docs/UI-IMAGE-RENDERING.md, cập nhật PROJECT-MEMORY/RANK-SYSTEM/FRIENDS-UI-RULES/HONOR-SYSTEM. Browser QA Home/Profile/Tùy chỉnh/Huy hiệu/Bạn bè/Lịch sử/ComputerSetup/Board tại1280x720 và/hoặc960x600; Xếp hạng cả2 tab ở960 và1280, title89x36 ở1280 với ancestors không scale, Canvas0. Huy hiệu arena213x82px, img chỉ translate tâm, giữ hình dáng; console error0 trong lượt đọc cuối. Đã reset viewport. Build/typecheck PASS; dist index-ZKCooTym.js. Làm tròn có sai khác dưới1px; sao/crop giữ tỷ lệ nên vẫn có kích thước phân số. Không thay ảnh nguồn nhỏ/không tuyên bố khôi phục chi tiết chữ dưới giới hạn pixel; chưa kiểm chứng nhấp nháy từng frame hoặc mọi thao tác chơi cờ.

- 2026-10-05: Theo yêu cầu dịch sao xuống2px và đồng bộ mọi nơi, đổi RANK_STAR_LAYOUT.clusterOffsetYPx từ-8 thành-6; chuẩn sao top120.961945px theo avatar106px (tự co theo tỷ lệ). RankTitleBadge/RankingRankBadge đọc RANK_TITLE_STARS_STYLE chung, áp dụng Home/Hồ sơ/Tùy chỉnh/PlayerCard/Bạn bè/Xếp hạng. Giữ danh hiệu, size/gap/offsetX và rendering. Cập nhật PROJECT-MEMORY/RANK-SYSTEM/UI-IMAGE-RENDERING. Build/typecheck PASS; dist index-DtrYrnFo.js xác nhận clusterOffsetYPx:-6. Chưa browser QA lượt này.

- 2026-10-05: Theo yêu cầu giữ Tân Binh và hạ sao ở6 danh hiệu còn lại1px, thêm getRankTitleStarsStyle(rankLevel) trong playerIdentityLayout; bậc1 trả style cũ, bậc2–7 chỉ top calc(+1px CSS). RankTitleBadge và RankingRankBadge dùng chung helper, đồng bộ mọi consumer. Không sửa vị trí/kích thước avatar, danh hiệu, thẻ hoặc UI khác; size/gap sao giữ nguyên. Cập nhật3 tài liệu quy tắc. Build/typecheck PASS; dist index-D0nu3fLi.js xác nhận +1px. Chưa browser QA lượt này.

- 2026-10-05: Thu khung đỏ Gợi ý cho bạn trong tab Thêm bạn bằng khung Lời mời: bỏ inline height54 cố định, dùng friendSectionTitle cao50px thiết kế/token responsive. Hàng chứa54px giữ mốc điều khiển cùng Danh sách. Giữ asset/chiều rộng và các hàng bạn. Cập nhật FRIENDS-UI-RULES/PROJECT-MEMORY. Build/typecheck PASS; dist index-Dpi2lHR7.js cập nhật. Chưa browser QA lượt này.

## Phạm vi khóa đang có hiệu lực

- 2026-10-08: Giảm nhẹ độ đậm các chữ số trong Tin nhắn và Bạn bè: hạ weight một bậc riêng trên digit runs và opacity94%, giữ nguyên cỡ chữ/vị trí và độ đậm chữ cái. Build/typecheck PASS; dist/assets/index-HOwsRn5X.js và index-BfX_6rZw.css cập nhật; chưa browser QA.

- 2026-10-08: Lịch sử/Xếp hạng và Danh hiệu tiếp tục khóa. Cập nhật mới: toàn bộ UI Bạn bè và các thao tác quan hệ trong hồ sơ người khác được mở liên tục cho đến khi người dùng yêu cầu khóa lại; kích thước/vị trí avatar và nội dung Danh hiệu vẫn khóa riêng.
- 2026-10-08: Theo yêu cầu mở khóa Bạn bè, căn chữ số trong tên bằng NumberText/font-number 0.9em, lining-nums/tabular-nums; bộ đếm lời mời dùng cùng font số và lining/tabular. Build/typecheck PASS; dist/assets/index-D9O4Le9R.js cập nhật; chưa browser QA. UI Bạn bè tiếp tục mở đến khi người dùng yêu cầu khóa.

- 2026-10-08: Khôi phục tính năng bị mất sau khi ProfileDialog bị phục hồi từ HEAD cũ: So tài gọi service Socket.IO, Nhắn tin gọi callback Home/Game, lời mời chờ hiện Hủy thêm/icon trừ/khung tối, danh sách lời mời và chấp nhận dùng state chung. Phục hồi hiển thị/sao chép ID của người đang xem (thiếu ID thì — và tắt copy). Theo dõi/Tặng quà chưa triển khai theo ghi nhớ trước đó. Build/typecheck PASS; dist `index-DmTXpWit.js`. Chưa kiểm chứng trình duyệt với hai phiên online.

- 2026-10-08: Theo yêu cầu, khóa lại toàn bộ UI Lịch sử và mở riêng Bạn bè để hoàn tác giao diện về bản trước. Giữ nguyên các luồng tin nhắn và trạng thái kết bạn đang được nơi khác dùng; khóa lại Bạn bè sau khi hoàn tác. Build/typecheck PASS; `dist/assets/index-KntOnEkV.js` được tạo. Chưa browser QA.
- 2026-10-08: Người dùng mở khóa riêng phần khung Bạn bè; sửa lớp chồng: banner tiêu đề chuyển xuống dưới hàng tab bằng z-index thấp hơn, giữ nguyên kích thước và vị trí các vùng. Khóa lại khung sau chỉnh sửa. Build/typecheck PASS; `dist/assets/index-Cd9034XK.js` được tạo. Chưa browser QA.
- 2026-10-08: Người dùng mở liên tục toàn bộ khu vực Bạn bè và thao tác quan hệ trong hồ sơ người khác cho đến khi họ yêu cầu khóa. Đổi tên người chơi sang `font-heading`; đồng bộ trạng thái danh sách với hồ sơ, thêm nhãn/thao tác xóa bạn có xác nhận và lọc người đã xóa khỏi danh sách. Build/typecheck PASS; `dist/assets/index-B5RETVAn.js` được tạo. Chưa browser QA.
- 2026-10-08: Áp dụng độ đậm tên Xếp hạng cho Bạn bè (`font-black`, viền0.65px), giữ cỡ22px; tách chữ số sang `font-number` 0.9em/lining-nums để thẳng baseline. Build/typecheck PASS; `dist/assets/index-CUOiBudt.js` được tạo. Chưa browser QA.
- 2026-10-08: Đổi icon thao tác trong hồ sơ theo trạng thái quan hệ: bạn hiện tại dùng `remove-friend.png`, chưa kết bạn dùng `friend.png`. Build/typecheck PASS; `dist/assets/index-SLJK37un.js` được tạo. Chưa browser QA.

- Mốc Bạn bè hiện hành2026-10-05: nền nâu dài thêm50px responsive về bên trái, mép phải giữ mốc cũ; danh hiệu/sao/tên bậc dịch trái50px là tọa độ tham chiếu cũ, riêng khung/ảnh danh hiệu và cụm sao hiện mở khóa để thử nghiệm. Avatar, nền, cột và nhóm nút vẫn khóa; giữ nguyên bố cục hàng.

- Theo yêu cầu2026-10-08, UI Lịch sử đã khóa lại sau đợt chỉnh typography. UI Bạn bè hiện được mở liên tục theo yêu cầu mới; phần Danh hiệu và kích thước/vị trí avatar vẫn khóa riêng.
- Khóa Danh hiệu theo yêu cầu2026-10-08: catalog, popup Thông tin danh hiệu, hình/khung/sao và nơi hiển thị trong/ngoài hồ sơ bị khóa toàn project cho đến khi người dùng mở khóa rõ ràng.

- Kích thước/vị trí avatar người chơi và khung avatar trên toàn project. Mốc responsive tại docs/PROJECT-MEMORY.md và docs/RANK-SYSTEM.md; Bạn bè tại docs/FRIENDS-UI-RULES.md. Phải hỏi mở khóa trước khi thay đổi.

- Khóa UI hiện hành của Xếp hạng và toàn bộ Lịch sử. Khu vực Bạn bè và thao tác quan hệ bạn bè trong hồ sơ người khác đang mở; avatar và Danh hiệu giữ phạm vi khóa riêng.
- 2026-10-05: Đối chiếu Bạn bè ở viewport1280×720: khung Gợi ý cho bạn sau khi thu cao50px responsive và khung Lời mời đã nhận/đã gửi cùng43px CSS; cùng width843.2px và ảnh nền. Bọc Gợi ý nằm trong hàng54px để giữ mốc Danh sách/Thêm bạn. Screenshot hai tab xác nhận trực quan. Không cần sửa code thêm lượt này; dist đã build sau khi dùng friendSectionTitle chung.

- 2026-10-05: Icon tìm kiếm ô Danh sách dùng chung SearchIcon với ô tìm kiếm Thêm bạn: cùng hình học SVG,31px responsive và stroke3.5. Giữ màu vàng/bóng cho nền tối. Cập nhật FRIENDS-UI-RULES. Build/typecheck PASS; dist index-Bhk2LSwb.js được tạo mới. Browser QA trực quan chưa chạy vì tab localhost trước đó không còn mở sau khi nối lại phiên.

- 2026-10-05: Tăng chữ placeholder và nội dung hai ô nhập người chơi ở Danh sách/Thêm bạn từ21px lên23px qua token responsive; không đổi chiều cao ô, icon hay layout. Build/typecheck PASS; dist index-DzV7MuEB.js cập nhật. Browser QA trực quan chưa chạy vì localhost tab không còn trong phiên.

- 2026-10-05: Nút Tìm ở Thêm bạn từng dùng height56px cố định, còn ô nhập dùng --ui-p-56 responsive; khi root co theo viewport, nút cao hơn ô. Đổi height nút sang cùng var(--ui-p-56,56px), giữ các style còn lại. Cập nhật FRIENDS-UI-RULES. Build/typecheck PASS; dist index-CaRXOdxz.js cập nhật. Chưa browser QA trực quan lượt này.

- 2026-10-05: User explicitly approved one-time unlock for the Friend tabs rank-title x position. Cause was invite rows using a 270px title column vs 240px in List/Add, shifting rank groups by30px. All FriendRow now use the 240px column; action column stays330px. Browser QA at1280x720: rank/title anchor x=516.8px in List and Invites; screenshot verified. Kept avatar/badge/star dimensions unchanged and relocked the aligned position for future changes.

- 2026-10-05: Nới các hàng Danh sách/Thêm bạn/Lời mời từ85px lên90px responsive (+5px). Grid content track neo85px để giữ nguyên vị trí tương đối và kích thước avatar/khung/sao đã khóa; phần thêm chỉ tăng khoảng trống cuối hàng. Browser QA Danh sách 1280x720 xác nhận row77 CSS px theo scale0.85; cụm avatar/rank giữ trong track85. Build/typecheck PASS; dist index-BImLFixZ.js cập nhật.

- 2026-10-05: Căn giữa theo chiều dọc nội dung FriendRow trong hàng cao90px: giữ track85px, thêm căn giữa content của grid để phân bổ khoảng trống thừa đều trên/dưới. Kích thước, khoảng cách tương đối avatar/danh hiệu/sao và các nút không đổi; áp dụng chung mọi tab Bạn bè. Build/typecheck PASS, dist index-BIZNY3sd.js; browser QA Danh sách ở localhost: hàng55px màn hình, nội dung centerDelta=-0.4px do responsive scale.


- 2026-10-05: Quy tắc mới: mọi avatar trong project hiển thị cursor-pointer. Đặt trực tiếp trong SocialAvatar, AvatarPortrait, avatar placeholder ở Chọn Bàn và avatar header Chơi với máy; Home/Hồ sơ/Xếp hạng/PlayerCard/Chat/RoomUsersPanel vốn ở trong vùng tương tác có cursor pointer. Không đổi geometry bị khóa. Build/typecheck PASS; dist index-DAWRtbaz.js.


- 2026-10-05: Ẩn thanh cuộn trực quan trong danh sách Bạn bè/Lời mời bằng scrollbar-width:none và ::-webkit-scrollbar:hidden; vẫn giữ overflow-y-auto để cuộn dọc, overflow-x-hidden và scrollbar-gutter:stable để không đổi bề ngang nội dung. Build/typecheck PASS; Browser QA tab Lời mời: overflowY=auto, scrollbarWidth=none, scrollHeight220>clientHeight195 nên nội dung còn cuộn được; dist index-DeKVuXl5.js.


- 2026-10-05: Người dùng cho phép mở khóa một lần; dịch nền nâu và nội dung danh hiệu/sao/tên bậc/nút sang trái50px thiết kế responsive bằng brownGroupPosition trong FriendRow. Khóa lại mốc mới. Browser QA Danh sách/Thêm bạn/Lời mời: offset thực30px theo viewport hiện tại, nền x258.3→228.3, rank281.3→251.3, action434.6→404.6; avatar/tên x55.8 và y/width/height giữ nguyên. Build/typecheck PASS; dist index-DhvXVJ9q.js.


- 2026-10-05: Sửa hiểu nhầm yêu cầu: hoàn tác dịch trái cả cụm, chỉ kéo dài nền nâu50px thiết kế về bên trái (margin-left=-(38px+50px), responsive). Nội dung danh hiệu/sao/nút trở về mốc cũ và khóa lại. Không thay chiều cao/kích thước nội dung. Browser QA Danh sách/Lời mời: nền x228.3, width407.3 (+30px CSS tại viewport hiện tại), right635.6 giữ nguyên; rank x281.3 và action x434.6 phục hồi đúng mốc trước dịch. Build/typecheck PASS, dist index-BU_4_TfW.js. Bài học: phân biệt kéo dài nền với dịch toàn bộ nền và nội dung; quy tắc hiện hành đã cập nhật.


- 2026-10-05: Theo yêu cầu tiếp nối, dịch riêng danh hiệu/sao/tên bậc/nút trong nền nâu sang trái50px thiết kế responsive qua brownContentPosition chung cho mọi FriendRow. Nền nâu giữ nguyên chiều dài đã nới, mép phải giữ nguyên. Dùng quyền cho phép trong cùng phạm vi và khóa lại vị trí mới. Browser QA cả3 tab: nền x228.3/right635.6/width407.3 giữ nguyên; rank281.3→251.3, action434.6→404.6 (30px CSS theo scale hiện tại); avatar/tên người chơi giữ x55.8. Build/typecheck PASS, dist index-C5E4-Sxm.js.


- 2026-10-05: Căn nhóm nút của mọi tab Bạn bè sát mép phải nền nâu, chừa8px thiết kế responsive. Bỏ brownContentPosition ở cột thao tác, giữ offset50px của danh hiệu/sao và chiều dài nền. Browser QA cả3 tab: frameRight635.6, buttonRight630.6, gap5px CSS theo scale hiện tại; rankX251.3 giữ nguyên. Build/typecheck PASS; dist index-a-AO4_38.js.


- 2026-10-05: Đổi placeholder tìm kiếm ở cả Danh sách và Thêm bạn thành “Nhập tên / ID người chơi...”. Chỉ cập nhật chữ gợi ý; logic lọc giữ nguyên. Kiểm tra source đủ2 input, build/typecheck PASS; dist index-BWJSBwp2.js. Chưa browser QA lượt này.


- 2026-10-05: Dịch tên người chơi và trạng thái sang trái8px thiết kế responsive trong toàn bộ Bạn bè bằng giảm gap FriendIdentity từ36px xuống28px. FriendRow chung bao phủ Danh sách/Online/Facebook/Thêm bạn/Lời mời nhận và gửi. Avatar, danh hiệu/sao và các nút giữ tọa độ hiện hành. Build/typecheck PASS; dist index-DUIt7Cwp.js. Kiểm tra mã dùng chung; chưa browser QA lượt này.


- 2026-10-05: Thêm nút Tìm vào tab Danh sách, dùng chung FriendSearchButton với Thêm bạn (cao56px/rộng tối thiểu170px responsive). Thu chiều rộng ô nhập để chừa nút, giữ mốc hàng tìm kiếm và khung danh sách. Danh sách vẫn lọc khi nhập; bấm Tìm/Enter trim query. Browser QA tìm “ LinhMeo ” trả LinhMeo99 và trim thành LinhMeo; cả2 tab ô nhập/nút cao34px màn hình, nút rộng104px, cùng top224.91 theo scale hiện tại. Đã xóa query kiểm tra. Build/typecheck PASS; dist index-CForDYMl.js.


- 2026-10-05: Rút nhãn hiển thị nút lời mời đã gửi từ “Hủy lời mời” thành “Hủy”; aria-label giữ mô tả đầy đủ. Build/typecheck PASS; dist index-BtHLrFlg.js.
- 2026-10-05: Người dùng chốt quy tắc khóa: kể cả khi làm task khác, nếu thay đổi chạm/cần sửa hoặc ảnh hưởng phụ đến vùng đã khóa thì dừng trước phần đó, báo đúng phạm vi và hỏi xác nhận mở khóa cho task hiện tại; phần độc lập vẫn được tiếp tục. Xác nhận chỉ áp dụng đúng phạm vi/task và sau đó khóa lại. Đã lưu trong AGENTS.md và docs/PROJECT-MEMORY.md.
- 2026-10-05: Thu chiều cao nền nâu nhạt quanh điểm Elo trong Xếp hạng; lề trên/dưới đặt bằng lề ngang của pill điểm (17px theo thiết kế, responsive theo layout.scale). Dùng chung cho cả Cờ Tướng/Cờ Úp, không đổi kích thước hàng hay các cột khác. Chưa chạy build hoặc browser QA.

- 2026-10-05: Sửa lỗi danh hiệu sprite méo/cắt dư: metadata có imageHeight theo kích thước nguồn/crop và cả bốn consumer render chiều cao tường minh, giữ hình học ô hiện hành. Áp dụng Chuỗi Chiến Thắng/Tổng Ván Chơi/Online Chuyên Cần và chi tiết danh hiệu. Cập nhật bài học PROJECT-MEMORY và HONOR-SYSTEM. npm run build/typecheck PASS; dist index-CQ-oopQk.js. Browser QA cả ba nhóm và chi tiết Thống Trị: viền đầy đủ, không còn lộ khung khác; ảnh đối chiếu lưu trong outputs/danh-hieu-sau-sua.jpg của phiên.

- 2026-10-05: Đồng bộ khoảng cách dọc các tab catalog Danh hiệu theo Tất cả trong HonorsFrame (ProfileDialog.tsx), chuẩn hóa rowGap theo số hàng thay vì 3% giống nhau ở mọi danh sách. Giữ hình học badge/crop và lưới ba cột. Build tạo dist index-ZtfX4uYY.js; browser QA: Tất cả và năm tab riêng cùng gap13.875px/cardHeight57.8125px tại viewport hiện tại. Lưu quy tắc trong PROJECT-MEMORY/HONOR-SYSTEM và ảnh outputs/danh-hieu-khoang-cach.jpg của phiên.

- 2026-10-05: Căn ba khung tiêu đề Bạn bè theo vị trí Gợi ý cho bạn của Thêm bạn. FriendsDialog dùng friendSectionTitleStyle top=calc((--ui-p-54 - --ui-p-50)/2), Add bỏ căn giữa riêng để giữ tọa độ mẫu; hai khung Lời mời áp dụng cùng inset. Build/typecheck PASS, dist index-DyfCCasH.js. Browser QA: mẫu Add x54.2/y186.4125/w606/h30 giữ nguyên; Lời mời nhận y184.9125→186.4125, gửi y420.2→421.7; tọa độ tất cả hàng Add và Lời mời giữ nguyên. Ảnh đối chiếu khung-ban-be-can-vi-tri.jpg trong outputs của phiên.

- 2026-10-05: Thay Thắng/Thua trong MatchResultBadge bằng hai vùng ảnh từ PNG24f07314-e511-454e-9d58-2a50197a5a34 của người dùng. Đặt nguồn vào src/assets/history, crop bằng viewBox giữ tỉ lệ/alpha/màu, ô và offset cũ. Cập nhật PROJECT-MEMORY/history-crops để thay quy tắc text cũ. Typecheck/build PASS, dist index-BtDRXcty.js. Browser QA Đã chơi14 badge/Đã lưu6 badge đều dùng nguồn mới; ô50×24px tại viewport hiện tại. Ảnh kết quả thang-thua-anh-moi.jpg trong outputs của phiên.


- 2026-10-06: Người dùng khóa phần UI hiện hành của Lịch sử, Xếp hạng, Bạn bè và màn Danh hiệu/catalog. Giữ nguyên bố cục, hình học, kích thước, vị trí, khoảng cách, kiểu chữ, màu và asset; không khóa dữ liệu/chức năng nếu không đổi UI. Ngoại lệ: thông tin chi tiết danh hiệu và danh hiệu hiển thị ngoài avatar không thuộc khóa UI này; quy tắc kích thước/vị trí avatar/khung/sao vẫn khóa riêng. Mọi tác động trực tiếp/gián tiếp cần xin mở khóa đúng phạm vi/task và khóa lại sau khi được duyệt. Ghi chú cũ loại trừ khung Gợi ý/Lời mời đã được thay thế; chúng thuộc UI Bạn bè khóa.

- 2026-10-06: Theo yêu cầu, chỉ dịch chữ bên trong khung Vinh Quang Kỳ Đài: cấp1 Á Quân nâng1px; cấp2 cả Quán Quân/Á Quân/Hạng Ba hạ2px; cấp3 cả ba chữ nâng2px. Áp dụng trong ArenaHonorTitle dùng chung cho catalog, preview và thông tin chi tiết. Giữ nguyên ảnh khung, kích thước badge, sao và bố cục khác; quyền chỉnh này chỉ cho task trên, UI khóa lại sau thay đổi.

- 2026-10-06: Theo yêu cầu, chỉ dịch chữ trong khung Phong Tặng: cấp1 hạ2px; cấp2 nâng1px; cấp4 nâng3px; cấp5 nâng4px; cấp3 không đổi. Cập nhật AwardedHonorTitle dùng chung tại catalog/preview/thông tin danh hiệu; giữ nguyên frame, kích thước, bố cục và asset. Chỉ mở khóa phần chữ cho task này, sau đó khóa UI lại.

- 2026-10-06: Theo yêu cầu, hoàn tác các offset mới khỏi catalog/preview danh hiệu và đưa chữ tại đó về vị trí trước; chỉ giữ mức dịch chữ Vinh Quang Kỳ Đài và Phong Tặng trong popup Thông tin danh hiệu. Thực hiện bằng prop riêng của hai component title, không đổi asset, frame hay kích thước. UI catalog vẫn khóa; chỉ nội dung chữ trong popup thông tin được chỉnh theo yêu cầu.

- 2026-10-06: Điều chỉnh theo yêu cầu mới, chỉ trong popup Thông tin danh hiệu: Phong Tặng cấp1 hạ1px; cấp2 giữ mức nâng1px; cấp3, 4, 5 nâng1px. Catalog/preview và mọi hình học khung giữ nguyên.

- 2026-10-06: Cập nhật mức dịch chữ trong popup Thông tin danh hiệu theo yêu cầu mới: Phong Tặng cấp1 hạ2px; cấp2 giữ nguyên mức nâng1px; cấp3 hạ1px; cấp4 và 5 nâng2px. Catalog/preview, khung và bố cục không đổi.

- 2026-10-06: Chỉ cập nhật chữ Phong Tặng trong popup Thông tin danh hiệu: cấp1 hạ1px; cấp3 nâng1px; cấp4/5 nâng2px; cấp2 giữ mức cũ. Hàm offset chỉ được truyền ở HonorDetailPopover; hai consumer catalog/preview giữ lời gọi cũ. Typecheck/build PASS, dist index-DVrH2PbW.js. Chưa kiểm tra trực quan trình duyệt lượt này.

- 2026-10-06: Sửa nguyên nhân chữ Phong Tặng không dịch: các lượt trước gán lại offset cố định nên cấp4/5 vẫn -2px. Lượt này cộng thêm từ vị trí đang hiển thị: cấp1 xuống1px (+1→+2); cấp3 lên1px (-1→-2); cấp4/5 lên2px (-2→-4). Cấp2 giữ -1px. Đo DOM trước/sau tại localhost: Kỳ Đạo +1px, Kỳ Phùng -1px, Nghĩa Hiệp/Kỳ Hữu -2px; vị trí chữ catalog và kích thước chữ đều delta0. Offset chỉ dùng trong popup Thông tin danh hiệu. Typecheck/build PASS; dist index-ZFWLaZV9.js.

- 2026-10-06: Dịch thêm chữ Phong Tặng trong popup Thông tin danh hiệu: cấp1 +1px (offset+2→+3); cấp3 +1px (-2→-1); cấp4/5 -1px (-4→-5); cấp2 giữ -1px. Đo DOM trước/sau: Kỳ Đạo/Kỳ Phùng deltaY+1px; Nghĩa Hiệp/Kỳ Hữu deltaY-1px. Vị trí catalog và kích thước chữ delta0. Typecheck/build PASS; dist index-CJgHjfOC.js.

- 2026-10-06: Dịch thêm riêng chữ Phong Tặng cấp3 trong popup Thông tin danh hiệu xuống1px (offset-1→0); các cấp khác và catalog/preview không đổi. Đo DOM Kỳ Phùng xác nhận deltaY+1px, chiều rộng/cao delta0. Typecheck/build PASS; dist index-CiIgkke5.js.

- 2026-10-06: Người dùng mở khóa toàn bộ UI Danh hiệu, khung/ảnh danh hiệu và cụm sao đi kèm trên mọi consumer để thử nghiệm; avatar người chơi/khung avatar và bố cục chung của Lịch sử, Xếp hạng, Bạn bè vẫn khóa.

- 2026-10-06: Ẩn thanh cuộn nhìn thấy trong hai danh sách chú thích/cách nhận của popup Danh hiệu bằng scrollbar-width:none và ::-webkit-scrollbar:hidden; giữ overflow-y-auto nên nội dung dài vẫn cuộn dọc. Thanh cuộn catalog vốn đã ẩn. Browser QA: list chú thích overflowY=auto, scrollHeight74>clientHeight71, scrollbarWidth=none và webkit display=none; list cách nhận cũng ẩn scrollbar. npm run build PASS, dist index-C_JCGV44.js.

- 2026-10-06: Nới khoảng cách dọc giữa các hàng danh hiệu trong preview Thông tin user từ10px lên12px thiết kế (gap-y-2.5→gap-y-3); giữ khoảng ngang và hình học/kích thước huy hiệu. Browser QA với6 danh hiệu tạm: rowGap computed8.98px ở viewport co hiện tại; đã bỏ các lựa chọn thử và khôi phục “Chưa có danh hiệu”. npm run build PASS; dist index-vPT-LDZ5.js.

- 2026-10-06: Mở các danh hiệu đang hiện ổ khóa trong Chuỗi Chiến Thắng, Tổng Ván Chơi và Online Chuyên Cần để người dùng thử: gỡ biểu tượng ổ khóa, bỏ trạng thái giảm sáng và cập nhật nhãn truy cập; không đổi điều kiện gameplay hay bố cục. `npm run build` PASS.

- 2026-10-06: Bật nút chọn cho danh hiệu thuộc cả 5 nhóm; lựa chọn được lưu trong `profile-honors:{profileId}` và hiện trong preview hồ sơ như các nhóm đã hỗ trợ trước đó. Giữ giới hạn tối đa3 danh hiệu mỗi nhóm. Mở nạp dữ liệu cũ cho các nhóm này; typecheck/build PASS, chưa xác minh thao tác trên trình duyệt.

- 2026-10-06: Sau khi người dùng báo ba tab cuối chưa có nút chọn, bỏ điều kiện dò ID trong danh sách nhóm khỏi predicate hiển thị/chọn; mọi `HonorDetail` đã thuộc union danh hiệu thì được chọn. Build PASS; chưa xác minh trực quan trên trình duyệt.

- 2026-10-06: Hoàn thiện chuyển trang danh hiệu khi đầy khung hồ sơ: giữ9 ô/trang, trượt2 giây mỗi7 giây và lặp từ trang cuối về đầu; reset trang đầu khi mở lại hoặc sửa lựa chọn. Bộ đếm chỉ chạy khi hồ sơ/preview hiện, tạm dừng trong popup chi tiết và các màn phụ; trang ẩn có aria-hidden/inert. Browser QA với15 danh hiệu xác nhận2 trang9+6, animation computed2s, trang1→2 và target quay về0, mở lại ở trang1. Đã xác nhận chọn/lưu đủ cả5 nhóm và khôi phục15 lựa chọn thử về trạng thái ban đầu “Chưa có danh hiệu”. Build/typecheck PASS; dist index-AAfaI4IC.js. Ảnh thử trong outputs/danh-hieu-chuyen-trang.png.

- 2026-10-06: Theo yêu cầu mới, thay carousel dừng/chuyển từng trang bằng Web Animations chạy liên tục tuyến tính12 giây mỗi bề rộng trang; lặp normal từ0 tới mép cuối rồi reset ngay0, không có đoạn chạy ngược. IntersectionObserver đồng bộ aria-hidden/inert theo phần trang thực sự nằm trong khung. Browser QA với10 danh hiệu9+1:5 mẫu300ms ghi x=-13.69,-25.39,-37.74,-49.43,-61.78px, xác nhận tốc độ khoảng39px/s tại viewport468px và cả hai trang tương tác khi đang hiện một phần. Khôi phục10 lựa chọn thử về trạng thái ban đầu. Build/typecheck PASS; dist index-jvXM8BGV.js. Ảnh thử outputs/danh-hieu-chay-deu.png.

- 2026-10-06: Chỉnh nhịp carousel theo xác nhận mới: giữ khung đầu2 giây, chạy tuyến tính đến mép cuối trong tổng cộng5 giây, nhảy ngay về đầu và lặp chu kỳ7 giây. Keyframe giữ translateX(0) đến mốc2/7; animation normal/infinite không chạy ngược. Chỉ sửa thời gian animation, giữ bố cục và kích thước danh hiệu. Build/typecheck PASS; dist index-DLIob0ds.js. Chưa kiểm tra trực quan nhịp mới trên trình duyệt.

- 2026-10-06: Điều chỉnh carousel hồ sơ theo nhịp mới: nghỉ đầu1,5 giây, chạy đều6 giây, nghỉ cuối0,5 giây rồi nhảy về đầu; chu kỳ8 giây. Thêm keyframe cùng vị trí cuối tại mốc7,5/8 và1 để giữ nguyên khung cuối trong0,5 giây; không đổi bố cục/kích thước. Cập nhật PROJECT-MEMORY và HONOR-SYSTEM. Build/typecheck PASS; dist index-D38HRorR.js. Chưa kiểm tra trực quan nhịp mới trên trình duyệt.

- 2026-10-06: Đổi tên danh hiệu Tổng Ván Chơi “Dày Dạn” thành “Dày Dặn” trong dữ liệu dùng chung của catalog, chi tiết và preview hồ sơ; giữ ID day-dan-2 để không mất lựa chọn đã lưu. Đồng bộ HONOR-SYSTEM. Build/typecheck PASS; dist index-MN_76LRx.js. Chưa kiểm tra trực quan trình duyệt.

- 2026-10-06: Nới ngang cụm Năng lượng và vàng ở Home từ390 lên420px thiết kế, compact300 lên320px theo yêu cầu. Cố định chiều cao theo kích thước nguồn ở bề rộng cũ; bốn lớp ảnh nền cùng h-full/w-full, kích thước icon/chữ/nút cộng giữ nguyên. Cập nhật energy-gold-source.md. Build/typecheck PASS; dist index-CH6Ot5bg.js. Chưa kiểm tra trực quan trình duyệt.

- 2026-10-06: Đổi vàng khởi tạo trong sessionStore từ1.000.000 lên10.000.000 theo yêu cầu thử hiển thị. Chỉ thay giá trị xem thử hiện trong Home. Build/typecheck PASS; dist được cập nhật. Chưa kiểm tra trực quan trình duyệt.

- 2026-10-06: Hồ sơ mở từ avatar người khác thay vùng danh hiệu bằng6 nút3 cột ×2 hàng theo thứ tự Xem thông tin, So tài, Thêm bạn/Xóa bạn; Nhắn tin, Theo dõi, Tặng quà. ProfileDialog dùng chung cho Home và GamePage; phân biệt hồ sơ chính mình và lấy nhãn kết bạn từ danh sách hiện có. Nối onOpenProfile vốn chưa được sử dụng tại avatar mọi tab Bạn bè, giữ nguyên ô76px/hình học avatar và bố cục hàng. Xem thông tin mở preview danh hiệu, Quay lại về nhóm nút; mở lại/reset tên bắt đầu ở nhóm nút. Các hành động xã hội chưa có xử lý nên hiện phản hồi chưa hỗ trợ; overlay chặn focus nền bằng inert. Browser QA: LinhMeo99 hiện Xóa bạn, ThanhVan92 hiện Thêm bạn; đo6 nút thành3 cột/2 hàng cùng cỡ, kiểm tra Xem thông tin/Quay lại, phản hồi So tài và hồ sơ Picolozz vẫn có danh hiệu. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-CZMrBv_T.js. GamePage được cập nhật dùng chung, chưa kiểm tra thao tác trong bàn chơi.

- 2026-10-06: Theo yêu cầu, thu chiều cao từng ô trong lưới6 nút hồ sơ người khác khoảng16px theo thiết kế (đo ở localhost giảm từ104px xuống92px CSS viewport), căn giữa theo chiều dọc trong hàng; giữ nguyên lưới, khoảng cách và khung hồ sơ. Browser QA xác nhận cả6 ô cùng92px,2 hàng vẫn cân. Cập nhật ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-rE2znWW1.js.

- 2026-10-06: Theo yêu cầu mới, bỏ toàn bộ6 icon trong nút, thu mỗi nút thêm20px ngang/24px dọc theo kích thước thiết kế (browser QA hiện mỗi ô135×86px), đổi chữ sang Arial đậm20px thiết kế (15px CSS viewport), căn giữa. Lưới/khung hồ sơ giữ nguyên. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-7wbjQuxp.js.
- 2026-10-06: Theo yêu cầu, tăng font Arial trên6 nút hồ sơ người khác từ20px lên22px thiết kế; giảm chiều cao từ calc(100%-24px) xuống calc(100%-30px), chiều ngang giữ calc(100%-20px). Browser QA xác nhận mọi ô135×82px viewport, font16px, text đầy đủ không tràn. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-Cxv_mB3u.js.
- 2026-10-06: Theo yêu cầu, làm mảnh chữ trên6 nút (Arial weight600→500) và thu chiều cao thêm20px viewport; CSS thiết kế đổi calc(100%-30px)→calc(100%-56px), chiều ngang/cỡ chữ giữ nguyên. Browser QA xác nhận6 ô đều135×62px, font16px weight500, nhãn còn nguyên. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-Cq2LHDPd.js.
- 2026-10-06: Theo yêu cầu, chuyển6 nút sang nền nâu gỗ phẳng #4b3322, viền mảnh nâu vàng #9c784e; bỏ gradient, shadow và hover brightness. Thu mỗi nút thêm16px ngang/12px dọc theo kích thước thiết kế (browser QA 123×36px), giữ font22px design/weight500. Build/typecheck PASS; browser QA xác nhận màu nền rgb(75,51,34), viền rgb(156,120,78), box-shadow none; labels đầy đủ. Ảnh outputs/ho-so-nguoi-khac-6-nut.png; dist index-BG8jSX9u.js.
- 2026-10-06: Theo yêu cầu, đổi nền nút sang #43220f và tăng viền nâu vàng #9c784e từ1px lên2px thiết kế. Browser QA xác nhận màu rgb(67,34,15), viền hiển thị1.6px theo scale, kích thước123×36px. Build/typecheck PASS; dist index-CskI7ZeN.js.

- 2026-10-06: Theo yêu cầu, đổi nền6 nút thao tác hồ sơ người khác sang #875026, giảm bo góc còn4px thiết kế, tăng viền nâu vàng lên3px #9c784e và nới mỗi nút thêm8px theo chiều ngang/dọc thiết kế (ô lưới để căn giữa). Browser QA xác nhận màu rgb(135,80,38), viền2.4px và bo góc3px theo scale hiện tại; cả6 nút đồng nhất, không đổi lưới hay hình học avatar. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build PASS; dist index-DBFNZWlP.js.

- 2026-10-06: Theo mẫu b99a1e64-d36b-41e2-8824-05088d378d56, thay nhóm6 nút hồ sơ người khác bằng bộ7 asset mới:1 khung,6 icon. Tạo bản runtime tight-crop tại src/assets/profile/actions, loại alpha nhiễu dưới8/255; giữ tỷ lệ và nguồn gốc trong source.md. Căn3×2 với icon trái/chữ Cormorant phải, không sửa hình học avatar hay các màn khóa. Browser QA6 ảnh/icon tải đủ, cả6 nhãn không tràn, tâm2 hàng ở28.1%/69.5% chiều cao panel so với mẫu28.2%/70.2%; Xem thông tin/Quay lại hoạt động. Ảnh outputs/ho-so-nut-asset-moi.png. Typecheck/build PASS; dist index-CIu3iwLG.js. Mẫu chỉ đối chiếu, không import vào runtime; nguồn được giữ để tra lại.

- 2026-10-06: Tăng icon thao tác hồ sơ người khác từ30% lên32% vùng nội dung, đổi lề trái7%→9% để dịch phải; lề phải3%, gap1%. Chữ10→10.7cqw, tracking-0.025em để nhãn dài nằm gọn. Browser QA tại viewport hiện tại:icon39.2→42.79px (+9.15%), dịch phải3.04px; font15.19→16.26px (+7%),6 nhãn không tràn, Xem thông tin cách icon2.2px. Giữ hình học khung nút, avatar và panel. Typecheck/build PASS; dist index-93CaZUgw.js; ảnh outputs/ho-so-nut-asset-moi.png.

- 2026-10-06: Theo yêu cầu tăng nhẹ chiều cao6 khung nút hồ sơ người khác, đổi tỷ lệ ô1471:606→1471:680. Khung ảnh render bằng border-image chia9 vùng slice200px/width13.596cqw để kéo phần giữa, giữ nguyên tỷ lệ các góc. Browser QA6 nút đều rộng151.95px/cao70.24px (cao thêm7.64px), icon42.79px và cỡ chữ16.26px giữ nguyên; nhãn không tràn, nội dung vẫn căn giữa. Cập nhật PROJECT-MEMORY/HONOR-SYSTEM. Typecheck/build PASS; dist index-Brzn5FvK.js; ảnh outputs/ho-so-nut-asset-moi.png.

- 2026-10-06: Hồ sơ người khác hiển thị đủ các trường chung như hồ sơ mình: bỏ nhánh giảm ô thông tin xuống90%, mở dòng ID/sao chép cho cả2 loại hồ sơ và giữ chiều cao dòng địa chỉ min-h-8 để căn hàng thống nhất. Thêm prop playerId cho ID người được xem; thiếu dữ liệu thì hiện — và vô hiệu sao chép, không hiển thị/sao chép ID của mình cho người khác. Copy dùng displayedProfileId và reset feedback khi ID đổi. Các quyền sửa avatar/địa chỉ vẫn giới hạn hồ sơ mình;6 nút giữ nguyên. Browser QA tại Home→Bạn bè:ô thông tin mình/người khác cùng152.14px, người khác có ID:—/copy disabled và đủ6 nút; chưa kiểm tra trực tiếp trong bàn chơi nhưng dùng cùng component. Typecheck/build PASS; dist index-BauwrnPy.js; ảnh outputs/ho-so-nguoi-khac-day-du.png.

- 2026-10-06: Theo yêu cầu, tăng chữ cả6 nút hồ sơ từ10.7 lên11cqw (font tại browser QA từ16.26 lên16.71px, +2.8%). Nhãn Xem thông tin và5 nhãn còn lại đều fit trong nút; chiều cao/chiều ngang nút và tâm các hàng giữ nguyên. Icon giữ vị trí13.68px và kích thước42.73px. Cập nhật PROJECT-MEMORY/HONOR-SYSTEM. Browser QA PASS; build/typecheck PASS; dist index-ClKa-vgJ.js; ảnh outputs/ho-so-nguoi-khac-day-du.png.


## 2026-10-06 — So tài qua Socket.IO

- Nối nút So tài chung trong ProfileDialog tới challenge service/controller/repository, giữ bố cục/avatar đang khóa. Hồ sơ mở từ phòng truyền socket target ID riêng, không hiển thị nhầm thành ID hồ sơ.
- Presence duy trì ngoài phòng; trạng thái online ready/playing kiểm tra tại server, kiểm tra lại hai phía khi nhận ✓. Chấp nhận tạo phòng10 phút với hai ghế chưa ready; × từ chối, hết hạn60s/mất kết nối hủy lời mời, chặn lời mời trùng.
- Notification fixed góc phải dưới, trượt vào420ms, avatar/khung/danh hiệu/sao dùng component chung; manual popover + portal vào modal trên cùng giữ khả năng tương tác và nằm trên hồ sơ.
- Quan sát trình duyệt với hai phiên Picolozz/LinhMeo99: gửi từ hồ sơ hiện thông báo thành công; người nhận đang mở hồ sơ vẫn thấy và bấm được ✓; hai phiên chuyển vào cùng bàn online. Ảnh: outputs/so-tai-loi-moi.png của chat. Không chạy bộ test tự động trong task này.
- Build cuối: npm.cmd run build thành công (typecheck + Vite); dist/index.html dùng index-BjLEWgha.js.


## 2026-10-06 — Thêm/Xóa bạn trong hồ sơ

- Nút Thêm bạn hiện cập nhật friendshipOverrides dùng chung trong session; hồ sơ khác phản ánh trạng thái ngay. Gỡ quan hệ qua Xóa bạn. Danh sách thêm bạn mới và Gợi ý lọc họ ra; khi xóa người từng được gợi ý, họ trở lại Gợi ý.
- Ngay sau Thêm bạn, nhãn thành Xóa bạn, nút tối `brightness(0.55)` và disabled với cursor-pointer; đóng dialog reset trạng thái nhấn, mở lại Xóa bạn hoạt động.
- Browser QA localhost: thêm ThanhVan92 hiện nút disabled Xóa bạn; đóng/mở hồ sơ lại nút Xóa bạn active; tính năng chỉ lưu trong phiên. Build/typecheck PASS; dist index-Dy1TiNGf.js trước phần đồng bộ Danh sách cuối cùng.
- Kiểm tra cuối sau đồng bộ dữ liệu danh sách: npm.cmd run build PASS (typecheck + Vite), dist/index.html dùng index-BO96pC3C.js. Browser kiểm tra Thêm bạn → Xóa bạn tối/disabled → đóng/mở lại hoạt động; liên hệ thử ThanhVan92 được xóa ngay sau kiểm tra để trả lại trạng thái demo ban đầu.

## 2026-10-06 — Lưu quy tắc Theo dõi/Nhắn tin/Tặng quà

- Theo dõi: sau khi bấm, nút mờ/tối và bị khóa; giữ trạng thái khi đóng rồi mở hồ sơ; tăng follower count người nhận thêm1.
- Tặng quà: dự kiến vàng với giá trị món quà >3.000 vàng để hạn chế lạm dụng tài khoản phụ; thêm lựa chọn skin, hiệu ứng, khung viền, avatar. UI làm sau.
- Nhắn tin: chưa chốt hành vi cụ thể; đợi yêu cầu tiếp theo.
- Chỉ cập nhật tài liệu quy tắc; chưa sửa code/UI, chưa chạy build.


## 2026-10-06 — Icon Xóa bạn

- Dùng asset 1c7141e5-e240-4d7b-abfe-9b66335606a0.png (người kèm dấu trừ) khi hồ sơ ở trạng thái bạn bè; giữ icon Thêm bạn cho trạng thái chưa kết bạn. Đổi icon đồng thời khi label chuyển.



## 2026-10-07 — Client ID fallback cho HTTP LAN

- Quét toàn bộ mã nguồn ngoài node_modules/dist: tìm thấy đúng hai lời gọi trực tiếp crypto.randomUUID trong GamePage và sessionStore; giữ nguyên crypto.getRandomValues đang dùng cho chức năng khác trong ProfileDialog.
- Thêm src/lib/clientId.ts và thay hai call site bằng helper. Helper ưu tiên randomUUID; nếu không có thì tạo UUID v4 bằng getRandomValues (122 bit ngẫu nhiên), và cuối cùng fallback timestamp/counter/Math.random dành cho ID client không nhạy cảm. Không đổi UI, gameplay, mạng, Socket.IO hay âm thanh.
- Thêm tests/client-id.test.ts cho ba nhánh. Test helper: 3/3 PASS. npm run typecheck PASS. npm run build PASS, dist/assets/index-DDnEI4XN.js; còn cảnh báo chunk JS lớn hơn500 kB. npm test tổng thể: 101 PASS, 27 FAIL trong4 file (lỗi API môi trường test AudioContext/document.fonts và các kỳ vọng phòng/animation khác; không phát sinh từ helper).
## 2026-10-07 — Cân kích thước icon Xóa bạn

- Tăng riêng icon trạng thái Hủy thêm/Xóa bạn từ31.6% lên36% vùng nội dung để huy hiệu nhìn bằng cỡ các icon cùng hàng; giữ nguyên khung, vị trí, nhãn và các icon khác. Cập nhật PROJECT-MEMORY.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật, bundle JS `index-D96WUBsx.js` và asset `remove-friend-DapGtU55.png`. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Điều chỉnh thanh nhập Tin nhắn

- Đổi vị trí nút đính kèm ảnh và biểu tượng cảm xúc: ảnh bên trái ô nhập, mặt cười bên phải. Thu nút gửi từ70px xuống63px theo đơn vị thiết kế.
- Cập nhật quy cách UI xem thử trong `docs/MESSAGES-UI.md` và `docs/PROJECT-MEMORY.md`; gửi/đính kèm vẫn chưa có logic.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-Dj2kB7-F.js`. Vite còn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Cập nhật phần đầu Tin nhắn

- Cột trái hiện chỉ còn nút ba chấm ở góc; bỏ danh sách/tìm kiếm/tạo nhóm khỏi UI xem thử. Header chat và avatar cạnh tin đến lấy tên/avatar/trạng thái từ hội thoại đang mở (hiện fixture Picolozz).
- Cập nhật `docs/MESSAGES-UI.md` và `docs/PROJECT-MEMORY.md`. `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-TgHyXCPi.js`. Vite còn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Cân kích thước icon thanh Tin nhắn

- Đặt icon ảnh 30px làm mốc, mặt cười 32px, icon gửi34px; khung nút ảnh giữ46px và vị trí ba nút không đổi.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-BXHlypX8.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Sửa lại header Tin nhắn

- Hoàn tác thử nghiệm kích thước icon thanh nhập: trở lại ảnh trong khung46px/padding8px, mặt cười42px, ảnh gửi63px.
- Header chat giữ avatar/tên/trạng thái người đang chat ở trái; bỏ nút thông tin, chỉ để nút ba chấm ở phải. Panel trái bên ngoài vẫn giữ nút ba chấm theo yêu cầu trước.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-CKcoELlP.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Tăng kích thước icon thanh Tin nhắn

- Đặt icon ảnh và mặt cười cùng45px (mốc mặt cười42px +3px); icon gửi50px (mốc +5px), khung ảnh ngoài giữ46px.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-BDk1J1DZ.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Khôi phục danh sách hội thoại

- Khôi phục nút Tạo nhóm, ô tìm kiếm và 8 hội thoại ở panel trái. Header chat vẫn giữ avatar/tên bên trái và nút ba chấm bên phải.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-DPo83tDT.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Thu icon ảnh thanh nhập

- Thu hình SVG đính kèm từ45px xuống30px để cân thị giác với mặt cười; giữ khung46px và các icon khác.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-Ctr1D8My.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Chỉnh nút đóng Tin nhắn

- Dịch nút đóng lên3px, sang phải5px; giảm khung56px xuống52px và dấu ×42px xuống40px.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-DgHTslqB.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Cân lại nút đóng Tin nhắn

- Tăng nút từ52px lên54px và dấu × từ40px lên42px; dịch thêm2px sang phải và xuống2px.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-ClleHZ_p.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Cập nhật danh sách Tin nhắn

- Tên hội thoại dùng font-cormorant và tăng18px→20px. Chuẩn hóa trạng thái thành online/offline (chấm xanh/xám); thay chữ trạng thái bằng tin nhắn gần nhất cạnh chấm.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-DMnLY9jc.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Khôi phục khung Tin nhắn chung

- Dùng lại chat-frame.png nguyên khung; bỏ MessagesPanels và messagesPanelLayout. Nội dung hai bên định vị theo cùng khung; giữ các chỉnh sửa tên, trạng thái, tin gần nhất và nút đã chốt.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` dùng bundle `index-BNMzD3ja.js`, đã kiểm tra source không còn import component/asset hai pane riêng. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Tách lại khung và đưa họa tiết lên trên

- Khôi phục hai pane độc lập; thêm lớp foreground viền/họa tiết góc dưới bên phải trên thanh nhập, không chặn chuột.
- `npm.cmd run build` PASS (typecheck + Vite); bundle `index-rvJiI8CY.js`. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Chỉnh chiều cao danh sách Tin nhắn

- Nút Tạo nhóm hạ còn56px; ô tìm kiếm tăng lên50px. Chia đều 8 hàng trên phần còn lại, giữ min-height58px.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` cập nhật với bundle `index-DwC6TCUd.js`. Vite còn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Tăng cỡ chữ tin nhắn xem trước

- Dòng tin nhắn mới nhất trong mỗi hàng tăng15px→17px; tên/thời gian không đổi.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` dùng bundle `index-BV-DniY8.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Thời gian tương đối tin nhắn

- Thay giờ cố định bằng thời gian đã trôi qua từ tin mới nhất (phút/giờ/ngày/tháng/năm trước), cập nhật30 giây/lần. Thời điểm vẫn là fixture, chưa lấy từ backend.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` dùng bundle `index-kOU_Rme-.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Định dạng thời gian tin nhắn

- Thay nhãn “phút/giờ trước” bằng giờ HH:mm trong24 giờ; sau24 giờ hiện thứ, qua30 ngày hoặc sang tháng hiện thứ + tháng. Tăng cỡ nhãn thời gian12px→14px.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` dùng bundle `index-B3F1jc4N.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB.

## 2026-10-07 — Đồng bộ chấm trạng thái Tin nhắn

- Thay chấm trạng thái bằng kiểu đang dùng trong Bạn bè:21px, viền nâu, bóng và gradient radial xanh/xám.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` dùng bundle `index-Dz1PB0CF.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB.

## 2026-10-07 — Đồng bộ tin xem trước với chat

- Dòng của Picolozz lấy trực tiếp text từ tin cuối của mảng chat để luôn trùng tin mới nhất đang hiển thị.
- `npm.cmd run build` PASS (typecheck + Vite); `dist/index.html` dùng bundle `index-3sYEhAvN.js`. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB.

## 2026-10-07 — Font tên header Tin nhắn và vị trí nút đóng

- Tên Picolozz trong header dùng font-cormorant như tên ở thông tin người dùng, giữ cỡ28px; nút đóng dịch thêm3px sang phải.
- npm.cmd run build PASS (typecheck + Vite); dist/index.html dùng bundle index-D4GcNvwZ.js. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Chưa kiểm tra trực quan trên trình duyệt.

## 2026-10-07 — Tăng cỡ thời gian hội thoại

- Nhãn giờ/ngày trong danh sách Tin nhắn tăng14px lên16px, giữ nguyên định dạng.
- npm.cmd run build PASS (typecheck + Vite); dist/index.html dùng bundle index-pW5ZEL6O.js. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB.

## 2026-10-07 — Chỉnh tên và chấm trạng thái hội thoại

- Tên hội thoại tăng20px lên22px; chấm online/offline giảm21px xuống18px.
- npm.cmd run build PASS; dist/index.html dùng bundle index-Dj4vcJ-Q.js. Vite còn cảnh báo chunk JavaScript trên500 kB.

## 2026-10-07 — Thu chấm trạng thái hội thoại

- Chấm online/offline giảm18px xuống16px, màu/gradient giữ nguyên.
- npm.cmd run build PASS; dist/index.html dùng bundle index-BlCZzBaX.js. Vite còn cảnh báo chunk JavaScript trên500 kB.

## 2026-10-07 — Thử chữ trắng cho ô tìm kiếm và nhập tin nhắn

- Chữ nhập và placeholder của hai ô chuyển sang trắng.
- npm.cmd run build PASS; dist/index.html dùng bundle index-DigJKc3-.js. Vite còn cảnh báo chunk JavaScript trên500 kB.

## 2026-10-07 — Tăng cỡ chữ hai ô Tin nhắn

- Ô tìm kiếm và ô nhập chat tăng18px lên20px, giữ màu trắng.
- npm.cmd run build PASS; dist/index.html dùng bundle index-B-hIEeOR.js. Vite còn cảnh báo chunk JavaScript trên500 kB.

## 2026-10-07 — Vầng sáng chỉ xuất hiện khi chọn hội thoại

- Bỏ chọn sáng cố định ở hàng Picolozz. Tách vầng sáng thành lớp overlay, mặc định không chọn; bấm hàng nào thì sáng hàng đó. Dùng nút hỗ trợ cả bàn phím, chưa nối chuyển dữ liệu chat.
- npm.cmd run build PASS (typecheck + Vite); kiểm tra lớp chọn và aria-pressed đã có trong dist/assets/index-CpmyjQ4u.js. Chưa kiểm tra tương tác/trực quan trên trình duyệt.

## 2026-10-07 — Mốc thời gian giữa tin và giờ gửi khi bấm

- Mỗi tin mẫu có sentAt; khoảng cách giữa hai tin từ10 phút chèn giờ gửi tin sau căn giữa. Bấm bong bóng hiện giờ HH:mm dưới tin; bấm lại ẩn. Thời gian preview Picolozz dùng sentAt tin cuối.
- Ghi quy tắc database tương lai: lưu nội dung và thời điểm gửi do server xác lập cho từng tin. Chưa triển khai database/backend nhắn tin.
- npm.cmd run build PASS (typecheck + Vite); dist/assets/index-Ci8Dd_Q1.js đã chứa mốc giờ và thao tác bật/tắt. Chưa kiểm tra trực quan/tương tác trên trình duyệt.

## 2026-10-07 — Mở chức năng gửi tin trong hội thoại

- Ô nhập và nút gửi/Enter thêm tin vào thread đang chọn; tin có giờ gửi, preview/thời gian danh sách cập nhật, hội thoại mới nhất lên đầu, và khung cuộn tới tin cuối. Giới hạn300 ký tự.
- Dữ liệu chat hiện chỉ ở state trình duyệt; chưa có API, đồng bộ giữa người dùng/thiết bị, xác thực hay lưu database. Đã ghi yêu cầu database phải lưu nội dung cùng thời điểm gửi server UTC.
- npm.cmd run build PASS (typecheck + Vite); dist/index.html dùng bundle index-Cvtn-Lki.js. Vite vẫn cảnh báo chunk JavaScript lớn hơn500 kB. Không chạy test theo phạm vi xác minh của task.

## 2026-10-07 — Popup tùy chọn hội thoại theo ảnh8109d221

- Bấm avatar header hoặc ba chấm mở MessagesOptionsPanel theo ảnh gốc; bỏ tiêu đề Tùy chọn trò chuyện. Nút Quay lại/Escape/bấm ngoài đóng popup. Avatar lấy từ hội thoại đang mở. Các mục trong popup hiện chỉ là UI, chưa nối thao tác chặn/xóa/báo cáo.
- Crop asset riêng bằng scripts/crop-message-options.ps1; giữ ảnh nguồn trong references/uploads; kiểm tra kích thước và alpha góc, trim1px dư của nút và đồng bộ wrapper.
- Đã đối chiếu bản ghép asset với ảnh nguồn và sửa crop nền header để bỏ hết chữ. Không kiểm tra browser được vì không có browser khả dụng trong phiên công cụ.
- npm.cmd run build PASS (typecheck + Vite); dist/index.html dùng bundle index-CpF2Ig9I.js. Vite còn cảnh báo chunk lớn hơn500 kB.

## 2026-10-07 — Thu nhỏ popup tùy chọn chat

- Popup hiển thị ở84% kích thước giới hạn trước đó, giữ tỷ lệ ảnh gốc.
- npm.cmd run build PASS; dist/index.html dùng bundle index-B3mvSrCU.js. Vite còn cảnh báo chunk JavaScript trên500 kB.

## 2026-10-07 — Avatar popup rõ hơn và nhỏ hơn

- Picolozz dùng AvatarPortrait index0 từ sprite1619×971 thay crop86×86 bị phóng mờ. Chân dung popup giảm208 xuống200px và giữ tâm. Kích thước avatar các vùng khác không đổi.
- npm.cmd run build PASS (typecheck + Vite); dist/index.html dùng bundle index-KzK-CCBm.js. Chưa kiểm tra browser vì browser không khả dụng trong phiên công cụ.

## 2026-10-07 — Chỉnh tỷ lệ popup tùy chọn chat

- Giảm giới hạn chiều rộng popup84%→80%, tăng chiều cao84%→88% vùng tham chiếu; nút và ảnh chân dung giữ hình tròn.
- npm.cmd run build PASS; dist/index.html dùng bundle index-B2GykHPg.js. Vite còn cảnh báo chunk JavaScript trên500 kB.

- 2026-10-07: popup tùy chọn Tin nhắn bỏ chân dung mặc định/vòng vàng trong nền, dùng scene-background.png và avatar thật dạng tròn (width=height pixel, giữ tâm); sửa méo do height% theo tỷ lệ panel khác width%. Chỉ mở sửa avatar popup theo yêu cầu hiện tại, các vùng avatar khác tiếp tục khóa. Đã xem ảnh nền mới không còn portrait/khung, npm.cmd run build thành công (typecheck + Vite), dist có scene-background-BNu6T-cZ.png và bundle index-C1MIulr_.js tham chiếu nền mới. Chưa QA popup trực tiếp trong trình duyệt vì browser không khả dụng trong phiên; không chạy test.


- 2026-10-07: popup tùy chọn chat hiển thị tên người đang nhắn dưới avatar, căn giữa; không đổi bố cục/kích thước các phần. 
pm.cmd run build đang chờ hoàn tất.


- Hoàn tất 2026-10-07: thêm tên ngay dưới avatar popup, giữ nguyên các tọa độ/kích thước thành phần hiện có; tên dài truncate một dòng. 
pm.cmd run build thành công (typecheck + Vite), dist bundle index-BfNHzN3O.js có thay đổi. Chưa kiểm tra UI trực tiếp trong browser.


- 2026-10-07: popup tùy chọn chat bỏ dải nâu header, nền cảnh phủ tới mép trên phần trong khung bằng object-cover; avatar và tên cùng lên32 đơn vị thiết kế, đường kính avatar giữ nguyên và tròn. Nút/khung không dịch. npm.cmd run build thành công (typecheck + Vite); dist index-DUQq-YPz.js có nền scene-background và đã bỏ lớp header cũ. Chưa QA trực tiếp trên browser trong phiên.

- 2026-10-07: avatar và tên popup tùy chọn chat dịch lên thêm8 đơn vị thiết kế. npm.cmd run build thành công (typecheck + Vite), bundle dist index-CSOnLN1P.js cập nhật.

- 2026-10-07: làm hòa mép nối dưới ảnh phong cảnh popup bằng gradient tới màu nền nâu; gradient ở dưới avatar/tên, không đổi vị trí/kích thước. npm.cmd run build thành công (typecheck + Vite); bundle dist index-CVHK43Wy.js cập nhật. Chưa xem popup trực tiếp trong browser phiên này.

- 2026-10-07: popup avatar và tên nâng thêm10 đơn vị thiết kế; npm.cmd run build thành công, dist bundle index-B8dJ9B71.js cập nhật.

- 2026-10-07: vùng chuyển sắc popup kéo sâu hơn vào nền nâu (kết thúc y460); không dịch chuyển ảnh/avatar/nội dung. Build thành công (typecheck + Vite), bundle dist index-BTtuJm6L.js cập nhật. Chưa kiểm tra browser trực tiếp.


- 2026-10-07: popup tùy chọn chat thêm danh hiệu/sao dưới tên qua RankTitleBadge dùng chung; vì dữ liệu liên hệ chưa có Elo riêng nên đang dùng mặc định Tân Binh1 sao. Avatar/tên đưa lên để đủ chỗ phía trên nút. npm.cmd run build thành công (typecheck + Vite), dist bundle index-DecnxZgz.js đã build.

- 2026-10-07: sửa popup tùy chọn chat thành avatar → danh hiệu/sao → tên; AvatarRankBadge dùng tỷ lệ chung theo box avatar thay huy hiệu nhỏ riêng. Nâng cụm để không chạm hàng nút; avatar giữ đường kính/tròn. npm.cmd run build thành công (typecheck + Vite), dist index-BWBBg4pS.js đã cập nhật. Chưa QA trực tiếp trong browser.

- 2026-10-07: tên trong popup dịch lên8 đơn vị thiết kế, vẫn ở dưới danh hiệu/sao. Build thành công; dist bundle index-WwhlYNob.js cập nhật.


- 2026-10-07: tên popup dịch lên thêm8 đơn vị thiết kế nữa; build thành công, dist bundle index-bMoXFkWa.js cập nhật.


- 2026-10-07: tên popup dịch lên thêm10 đơn vị thiết kế; build thành công, dist bundle index-ClT8u7-I.js cập nhật.


- 2026-10-07: dùng khung tên chung player/name-frame.png trong popup; tên căn giữa, giữ cụm/avatar/nút. npm.cmd run build thành công, dist bundle index-Cy-4UvGN.js cập nhật.


- 2026-10-07: thu khung tên còn290×64 đơn vị thiết kế, căn chính giữa theo chiều ngang, giữ tâm dọc tên; build thành công, bundle index-Bj3p1aPk.js cập nhật.


- 2026-10-07: khung tên popup thu còn270×59, chữ tên giảm28→24px. Build thành công, dist bundle index-5j29UL9_.js cập nhật.


- 2026-10-07: bỏ khung tên popup theo yêu cầu, chữ căn giữa dưới danh hiệu/sao và tăng24→26px. Build thành công, dist bundle index-COxm3fTH.js cập nhật.


- 2026-10-07: tên popup tăng26→28px, dịch lên10 đơn vị thiết kế; build thành công, dist bundle index-C5BswKw8.js cập nhật.


- 2026-10-07: thêm viền chữ tên popup nâu đậm1px; build thành công (typecheck + Vite), dist bundle index-DNnDTF7U.js cập nhật. Chưa QA browser trực tiếp.


- 2026-10-07: nền cảnh vùng tin nhắn tối15% và mờ nhẹ0.6px, tin nhắn/avatar không blur. npm.cmd run build thành công (typecheck + Vite); dist index-DO2tYqKJ.js và CSS index-DtmTy9-c.css cập nhật. Chưa QA trực tiếp trong browser.

- 2026-10-07: popup chat thêm khung avatar vàng bằng AvatarFrameOverlay chung, giữ avatar hiện tại và huy hiệu phủ trên khung; dùng khung mặc định do chưa có khung của từng liên hệ. Build thành công (typecheck + Vite), dist index-BYbG0heD.js cập nhật. Chưa QA trực tiếp browser.


- 2026-10-07: nền vùng tin chat tối45% giống backdrop Xếp hạng, bỏ blur. Thêm icon kết bạn có sẵn bên trái ba chấm, cùng42px (UI, chưa nối lời mời). Build thành công; dist index-CRw11JDc.js cập nhật. Chưa QA browser trực tiếp.


- 2026-10-07: header chat dùng icon SVG người+/người− giản lược42px giống nút ba chấm. Gửi/hủy lời mời nối pendingFriendRequests; trạng thái bạn nối friendshipOverrides và danh sách bạn sẵn có. Nền pending tối, glyph vẫn sáng; xóa bạn có xác nhận và tùy chọn bỏ hỏi10 phút chung với hồ sơ. Hook useMessageFriendship xử lý state, UI MessagesFriendButton riêng. npm.cmd run build thành công (typecheck + Vite), dist index-BbY3dPDK.js chứa icon và trạng thái mới. Chưa QA browser trực tiếp; backend kết bạn giữa tài khoản chưa tích hợp.

- 2026-10-07: nền nút header chat đang chờ kết bạn đổi sang xanh lá, icon giữ sáng. Build thành công, dist index-MPPDXmBt.js cập nhật.


- 2026-10-07: bỏ nền xanh nút kết bạn đang chờ, làm mờ toàn nút bằng opacity50%, giữ thao tác hủy lời mời. Build thành công, dist index-B-Czuk4C.js cập nhật.


- 2026-10-07: thời gian giữa các tin và giờ mở dưới bong bóng tăng16→18px. Build thành công; dist bundle index-_1dHJ99s.js cập nhật.


- 2026-10-07: lưu quy tắc lâu dài hướng chat vào PROJECT-MEMORY.md và MESSAGES-UI.md: người đang đăng nhập gửi ở phải/bong bóng sáng, đối phương ở trái/kèm avatar. Đối chiếu MessagesDialog đang đúng (tin gửi outgoing:true, căn phải, nền kem). Chỉ cập nhật tài liệu. Build thành công, dist index-_1dHJ99s.js có sẵn; chưa QA browser trực tiếp.


- 2026-10-07: Thêm popup Tạo nhóm mở từ MessagesDialog theo reference03cff998. Bỏ Thư viện/Tệp; icon đổi avatar trên phải, avatar tròn; nhập tên, tabs/chọn người và preview ảnh hoạt động trong state UI; quay lại/nền/Escape đóng, trả focus. Nút dưới dùng mẫu nâu Xem thông tin với chữ Tạo nhóm. Chưa nối API/tạo hội thoại nhóm. Asset crop/source riêng và ghi nhớ cập nhật. `npm.cmd run build` PASS gồm typecheck; xác nhận dist/assets/index-BXulcEHN.js chứa điều khiển avatar/tên và asset create-button. Đã xem trực tiếp asset khung/nút; chưa browser QA popup, không chạy test. Giữ phạm vi các màn/avatars đang khóa.

- 2026-10-07: Tinh chỉnh Tạo nhóm theo feedback: nới nền nâu phủ sát dưới viền ngoài/bo góc, clip góc nền dư banner; đổi icon chọn avatar sang camera SVG. Hai tab dùng viền options/block.png qua border-image, nền/vầng vàng khi chọn chia sẻ messageSelectionHighlight với hàng hội thoại (giữ nguyên hình thức hàng cũ). Không đổi vị trí/kích thước điều khiển hoặc UI màn đang khóa. `npm.cmd run build` PASS gồm typecheck; dist/assets/index-Btmax4oZ.js chứa borderImageSlice12, camera và màu lựa chọn. Đối chiếu asset/markup với ảnh người dùng; chưa kiểm tra trực tiếp trong trình duyệt, không chạy test.

- 2026-10-07: Chỉnh gradient trạng thái chọn: tâm sáng ấm #724018, vùng giữa #51280f, góc tối #241007; hạ glow phía trong. Token dùng chung tab Tạo nhóm/hàng hội thoại. `npm.cmd run build` PASS gồm typecheck; CSS dist/assets/index-B6t3IoOG.css xác nhận có hai màu tâm/góc. Chưa browser QA; không chạy test.

- 2026-10-07: Hạ avatar tạo nhóm34 đơn vị thiết kế để tâm avatar nằm giữa banner và hàng tên nhóm; camera đi cùng. `npm.cmd run build` PASS gồm typecheck; xác nhận dist/assets/index-DDhkFXzM.js có vị trí avatar151/997 và camera159/997. Chưa browser QA; không chạy test.

- 2026-10-07: Hai thẻ Bạn bè/1 mình dùng chính lớp bo góc, viền vàng2px và vầng sáng của hàng hội thoại khi được chọn; bỏ clip glow/viền asset ở trạng thái chọn. Thẻ chưa chọn giữ khung ảnh. Build/typecheck PASS; dist/assets/index-DUgH87Ch.js có lớp viền chọn và bỏ brightness1.8 cũ. Đối chiếu markup với hiệu ứng reference; chưa browser QA.

- 2026-10-07: Đưa nền nâu Tạo nhóm vào vùng trong khung30,28,884,940, bo góc24 và z0; khung/họa tiết z30 phủ trên. Build/typecheck PASS; dist/assets/index-yhSH5DUM.js có lớp khung z30/nền z0. Chưa browser QA; không chạy test.

- 2026-10-07: Tăng nhãn Tên nhóm30→32; giữ ô nhập/vị trí. `npm.cmd run build` PASS gồm typecheck; dist CSS index-CLwPqH80.css có token32px. Chưa browser QA.

- 2026-10-07: Thay ô vuông chọn thành tick ở cuối mỗi hàng Tạo nhóm; chưa chọn vàng dịu, chọn vàng sáng/glow; giữ checkbox ẩn và focus bàn phím. `npm.cmd run build` PASS gồm typecheck; dist/assets/index-enHcXU2o.js có SVG tick. Chưa browser QA.

- 2026-10-07: Nút Tạo nhóm nới từ315×77 lên380×81, giữ tâm ngang và vị trí chữ. `npm.cmd run build` PASS gồm typecheck; dist/assets/index-D3y2CX_c.js có kích thước mới. Chưa browser QA.

- 2026-10-07: Hai thẻ chế độ Tạo nhóm dùng màu được chọn theo ảnh mới: nền vàng sáng ở trên chuyển xuống nâu, viền #ffdf70, glow; thẻ chưa chọn vẫn nâu tối. Quy tắc này thay màu chọn trước đó của riêng hai thẻ. `npm.cmd run build` PASS gồm typecheck; dist/assets/index-BhZZa6rT.css xác nhận gradient/viền/glow. Chưa browser QA.

- 2026-10-07: Nới bong bóng chat padding ngang20→24/dọc6→8; tăng cả thời gian phân cách và thời gian mở khi bấm tin18→20px. `npm.cmd run build` PASS gồm typecheck; dist/assets/index-zFHiuxQB.js có padding mới và timestamp20px. Chưa browser QA; không chạy test.

- 2026-10-07: Sửa đúng ý ô tick trong chọn thành viên Tạo nhóm: giữ ô vuông bo nhẹ/viền vàng, chỉ khi chọn hiện dấu V cao nhánh phải dài. Checkbox native/click hàng/bàn phím giữ nguyên. Ghi nhớ thay quy tắc tick đứng riêng cũ. Build/typecheck PASS; dist/assets/index-D3XDlTnJ.js có path V mới và bỏ path cũ. Chưa browser QA.

- 2026-10-07: Nút Tạo nhóm bỏ icon người, dùng viền asset qua border-image không fill; chữ căn giữa toàn nút, tăng28→32. Build/typecheck PASS; bundle index-Cbc0Hapc.js xác nhận viền không fill/chữ giữa. Chưa browser QA.

- 2026-10-07: Khung chọn thành viên Tạo nhóm hiện5 hàng, render toàn bộ contacts và cuộn dọc; ẩn scrollbar cả chuẩn/WebKit. Build/typecheck PASS; bundle index-B0vUb_rI.js xác nhận h-1/5 và class ẩn scrollbar. Chưa browser QA.

- 2026-10-07: Tăng đồng bộ hai icon người/nhóm của thẻ Bạn bè/1 mình30→36, giữ căn giữa. Build/typecheck PASS; dist/assets/index-Bb8ELErk.js xác nhận icon36. Chưa browser QA.

- 2026-10-07: Thay cả khung và nền popup Tạo nhóm bằng ảnh3b29fb3a, tight-crop thành phần alpha chính1159×1150 (65,14); giữ tọa độ/kích thước mọi điều khiển. Asset dùng border-image slice210, width75 có fill ở nền và không fill ở foreground z30. Đã xem crop/đối chiếu source và lớp render; chưa browser QA. Build/typecheck PASS; dist/assets/index-Ciehut1Q.js xác nhận ảnh/lớp fill mới cùng tọa độ nút cũ, asset frame-background được xuất.

- 2026-10-07: Sửa lỗi lớp foreground khung mới che tiêu đề/quay lại và nút Tạo nhóm cuối. Bỏ lớp foreground; nền/khung ảnh3b29fb3a chỉ render một lần z0, các điều khiển gom vào lớp nội dung HTML z10 trực tiếp trên nền. Tọa độ/kích thước điều khiển giữ nguyên. Build/typecheck PASS; xác nhận source chỉ1 lớp ảnh khung, không foreground z30 và dist/assets/index-BWUakDah.js có lớp nội dung z10. Đối chiếu nguyên nhân với screenshot người dùng; chưa browser QA.

- 2026-10-07: Bỏ nền gradient nâu phủ giữa nút Tạo nhóm; chữ đặt trực tiếp trong khung nút, căn giữa và tăng32→36. Build/typecheck PASS; dist/assets/index-D0_iHjYS.js xác nhận button trong suốt/chữ36. Chưa browser QA.

- 2026-10-07: Sửa nền nâu còn sót ở nút Tạo nhóm: các lát border-image của ảnh cũ chứa mặt nâu. Built-in imagegen tách viền vàng rỗng, bỏ icon/mặt nâu; crop thành phần alpha chính2172×536 tại0,94. Thay bằng img viền trong suốt, giữ chữ36 và hình học380×81. Đã xem ảnh và kiểm tra vùng trong x200..1971/y120..415 có0 pixel alpha khác0. Build/typecheck PASS; dist/assets/index-dOKCxBPO.js dùng create-button-outline-CziQQSJA.png, bỏ borderImageSlice70/240. Chưa browser QA.

- 2026-10-07: Theo lựa chọn mới, lấy mẫu nút Xem thông tin và bỏ icon/chữ gốc bằng built-in imagegen, giữ mặt nút nâu liền mạch/viền vàng; thay viền rỗng bằng create-button-blank.png. Crop alpha chính2200×549 (0,85), ảnh nguồn/prompt giữ riêng. Chữ Tạo nhóm HTML36 căn giữa; vị trí/kích thước hiện hành giữ nguyên. Đã xem ảnh nút chỉnh và crop; chưa browser QA. Build/typecheck PASS; dist/assets/index-Bt9Qty4H.js xác nhận ảnh blank/chữ36, không còn import outline.

- 2026-10-07: Nút Tạo nhóm tối hơn khi hover (brightness75%, transition150ms), trở lại khi rời chuột, hỗ trợ reduced-motion. Build/typecheck PASS; dist/assets/index-DEl11szg.js xác nhận hover class. Chưa browser QA.

- 2026-10-07: Đổi hover Tạo nhóm từ tối75% sang sáng125%, giữ chuyển150ms/reduced-motion. Build/typecheck PASS; dist/assets/index-CiJC6ydd.js xác nhận class sáng mới. Chưa browser QA.

- 2026-10-07: Ghi quy tắc lâu dài cho Tin nhắn: danh sách hội thoại có thể gồm bạn bè và người lạ; trạng thái kết bạn độc lập với việc có hội thoại. Cập nhật `docs/PROJECT-MEMORY.md` và `docs/MESSAGES-UI.md`; chỉ sửa tài liệu, không đổi UI/chức năng. `npm.cmd run build` PASS (typecheck + Vite, dist được cập nhật); không chạy test vì chỉ sửa tài liệu.

- 2026-10-07: Quy tắc danh sách Tin nhắn: xếp hội thoại theo thời điểm tin nhắn mới nhất, dù tin mới do mình gửi hay đối phương gửi; hội thoại có tin mới nhất lên đầu. Cập nhật PROJECT-MEMORY.md và MESSAGES-UI.md.

- 2026-10-07: Quy tắc Nhắn tin: khi mở chat với ai, thêm/tái sử dụng dòng của người đó và đưa lên đầu danh sách ngay, dù chưa gửi tin; không tạo dòng trùng nếu hội thoại đã tồn tại.

- 2026-10-07: Nối nút Nhắn tin từ hồ sơ và danh sách Bạn bè vào MessagesDialog ở Home/Game. Yêu cầu chat tạo hoặc tái sử dụng hội thoại, chọn nó và đưa lên đầu ngay cả khi preview trống; hội thoại có sẵn không bị tạo trùng. State phía client, chưa persist/backend. npm.cmd run build PASS (typecheck + Vite); dist/assets/index-3SpwOWlT.js được cập nhật. Chưa browser QA.

- 2026-10-07: Sửa vùng chat đang dùng justify-between làm các tin bị dàn cách xa từ đầu đến cuối khung. Đổi sang xếp từ trên xuống với gap-2; overflow-y và tự cuộn đến tin mới giữ nguyên. Cập nhật PROJECT-MEMORY và MESSAGES-UI. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-CFT5hpD_.js. Chưa browser QA.

- 2026-10-07: Nối Xem thông tin trong popup tùy chọn chat tới hồ sơ của người đang chat. Biệt danh mở ô nhập với Hủy/OK; OK cập nhật tên hiển thị ở danh sách chat và header, còn hội thoại tiếp tục dùng tên gốc làm khóa. Nickname chỉ ở state client, chưa persist. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-CxXdmYF-.js và index-BI6VWMhC.css. Chưa browser QA.

- 2026-10-07: Nối mục Chặn bằng hộp xác nhận tên người chơi với Hủy/Đồng ý; xác nhận lần nữa ở cùng mục để bỏ chặn. Khi đang chặn, gửi không thêm tin và hiện “Vui lòng bỏ chặn để gửi.” căn giữa dưới danh sách tin; tin nhận mới sau mốc chặn hiển thị “Bạn đã bị chặn”. State demo phía client; chưa có sự kiện chat từ đối phương/backend. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-C4-vaR0o.js và index-Dv6Jtq5a.css. Chưa browser QA.

- 2026-10-07: Nối Xóa cuộc trò chuyện với xác nhận; xác nhận xóa toàn bộ messages/thread và dòng hội thoại ở client state của người hiện tại, chuyển sang hội thoại kế tiếp hoặc trạng thái danh sách trống. Bản phía người kia không bị chạm; ghi quy tắc database hai phía có record riêng vào PROJECT-MEMORY/MESSAGES-UI. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-Dmv7Mt95.js và index-6hiKjIIj.css. Chưa browser QA.

- 2026-10-07: Mục Xóa bạn trong popup chat đóng options và gọi requestRemoval của useMessageFriendship; dùng lại MessagesFriendRemovalConfirmation hiện hữu cùng friendship state/chính sách bỏ qua 10 phút. Build/typecheck PASS; dist/assets/index-DWPsRo3l.js. Chưa browser QA.

- 2026-10-07: Điều chỉnh quy tắc chat bị chặn theo yêu cầu mới: vẫn thêm tin gửi vào thread; nếu gửi trong lúc chặn, đặt “Vui lòng bỏ chặn để gửi.” ngay dưới bong bóng, cùng kiểu dòng thời gian. Bỏ hành vi chặn submit/notice rời. Cập nhật PROJECT-MEMORY và MESSAGES-UI. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-ZGMSDxbk.js và index-CgwUkZt6.css. Chưa browser QA.

- 2026-10-07: Chỉnh Xóa cuộc trò chuyện theo yêu cầu mới: chỉ xóa thread messages phía mình, giữ dòng hội thoại bên trái; xóa preview và ẩn thời gian tin cuối. Nội dung phía người kia vẫn giữ. Cập nhật PROJECT-MEMORY/MESSAGES-UI. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-zBAIHhMU.js. Chưa browser QA.
- 2026-10-07: Nối luồng Tạo nhóm ở Tin nhắn: tab Bạn bè chỉ lấy quan hệ đang là bạn; tên rỗng sau trim hiện “Vui lòng nhập tên”; ảnh bỏ trống dùng avatar mặc định. Khi tạo, mở hội thoại nhóm mới lên đầu, thread rỗng, giữ danh sách thành viên gồm tài khoản hiện tại và những người đã tick (tab 1 mình chỉ có tài khoản hiện tại). Ẩn các thao tác cá nhân Xem thông tin/Chặn/Xóa bạn trong tùy chọn nhóm. Đã ghi quy tắc vào PROJECT-MEMORY/MESSAGES-UI. `npm.cmd run build` PASS (TypeScript + Vite), dist/assets/index-DyG3lyQH.js và index-DIgpPiIr.css cập nhật; chưa browser QA, không chạy test. Giới hạn: nhóm/thread chỉ ở client state của phiên, chưa đồng bộ server hoặc persistence.
- 2026-10-08: Căn dòng báo chặn giữa toàn vùng chat, giữ bong bóng ở vị trí gửi/nhận; tin đến không còn bị thay nội dung. Khi cuộc trò chuyện đang bị chặn, dòng thông báo ngược giữ ở giữa cùng thao tác Bỏ chặn. Bật tìm kiếm hội thoại theo tên gốc/tên nhóm/biệt danh và player ID được truyền từ hồ sơ trong ván; tìm không phân biệt dấu. Xác nhận Xóa bạn trong Tin nhắn đồng bộ khung/nút với mẫu Hồ sơ. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-D-9etmHt.js và index-BT_9-xWd.css. Chưa browser QA, không chạy test. Tìm kiếm hiện lọc các hội thoại đã có; chưa tra cứu người chơi mới qua server. Block/reverse notice hiện chỉ mô phỏng client, không gửi thông báo sang tài khoản khác.


- 2026-10-08: Chuẩn hóa avatar nhóm: ảnh upload được crop tròn bên trong vòng vàng mặc định; avatar mặc định không đổi. Dùng MessagesGroupAvatar ở preview tạo nhóm, hàng danh sách, header, tin nhắn đến và popup tùy chọn nhóm; không đổi avatar người chơi. `npm.cmd run build` PASS (TypeScript + Vite); dist/assets/index-AFuqlNgX.js và index-DsgZ-vji.css. Chưa browser QA; không chạy test.
- 2026-10-08: Khi lọc Tin nhắn, giữ nguyên thứ tự hiện tại để hội thoại ưu tiên/đang ở đầu vẫn đứng trước; bỏ flex-grow khỏi các hàng kết quả để chúng tụ lại ở trên thay vì giãn dọc toàn panel. `npm.cmd run build` PASS (typecheck + Vite); dist/assets/index-CEEK8EZr.js và index-DsgZ-vji.css. Chưa browser QA; không chạy test.


- 2026-10-08: Sửa bộ chọn tỉnh/thành hồ sơ bị kẹt ở trạng thái tải: chỉ tải danh sách tỉnh ban đầu (depth=1), tải xã/phường theo tỉnh khi chọn (/p/{code}?depth=2), timeout 12 giây và retry riêng cho từng bước. Cập nhật PROJECT-MEMORY để tránh tải toàn bộ dữ liệu địa chỉ cùng lúc. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-MF-ISSVF.js và index-DsgZ-vji.css. Chưa kiểm tra trực tiếp trên trình duyệt.

- 2026-10-08: Cố định chiều cao dòng trong danh sách chat khi tìm kiếm. Dòng lọc lấy chiều cao gốc theo vùng danh sách và tổng số hội thoại trước lọc; không phình theo nội dung nhóm hay số kết quả. Cập nhật docs/MESSAGES-UI.md và PROJECT-MEMORY.md. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-hh3xcY5p.js; chưa browser QA.

- 2026-10-08: Thêm icon ba người màu vàng trước tên các nhóm trong danh sách hội thoại; dòng chat cá nhân giữ nguyên. Cập nhật docs/MESSAGES-UI.md. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-CA2nYFX8.js; chưa browser QA.

- 2026-10-08: Cố định chiều cao mọi dòng danh sách Tin nhắn ở --ui-p-58 trong mọi trạng thái. Thêm nhóm/hội thoại không làm các dòng cũ co lại; danh sách cuộn khi tràn. npm.cmd run build PASS (typecheck + Vite), dist/assets/index-D30asALj.js; chưa browser QA.


- 2026-10-08: Tăng icon nhóm trước tên trong danh sách Tin nhắn từ18px lên22px theo tỉ lệ UI; không đổi chiều cao cố định dòng. npm.cmd run build PASS, dist/assets/index-B93tJvhf.js; chưa browser QA.

- 2026-10-08: Chia vùng danh sách hội thoại thành8 chiều cao dòng bằng nhau để hiển thị đủ8 dòng; chiều cao cố định theo vùng chứa, không thay đổi khi tìm kiếm/thêm hội thoại. Các dòng sau8 cuộn bên trong. Cập nhật docs/MESSAGES-UI.md và PROJECT-MEMORY.md. npm.cmd run build PASS, dist/assets/index-BjD-YOf7.js; chưa browser QA.

- 2026-10-08: Chuyển lỗi tên nhóm rỗng thành bong bóng hình chữ nhật nền vàng kem, đặt ngay phía trên nút Tạo nhóm; bỏ dòng lỗi dưới ô nhập để giữ bố cục. npm.cmd run build PASS, dist/assets/index-Cqw2VX9_.js và index-BkHvTrbb.css; chưa browser QA.

- 2026-10-08: Popup tùy chọn nhóm: căn giữa nút Đổi tên, thêm hàng Xem thành viên (N) bên dưới và mở danh sách tên thành viên khi bấm. Dời các hàng còn lại lên theo thứ tự, không để khoảng trống của hành động riêng cho cá nhân. npm.cmd run build PASS, dist/assets/index-BGoh-yxa.js và index-D6nVTml6.css; chưa browser QA.

- 2026-10-08: Sắp xếp lại menu tùy chọn nhóm thành cụm: Xem thành viên, Tắt thông báo, Xóa cuộc trò chuyện, Báo cáo; mỗi hàng cách6 đơn vị thiết kế để không còn khoảng trống do mục cá nhân ẩn. npm.cmd run build PASS, dist/assets/index-CFF48mPf.js; chưa browser QA.

- 2026-10-08: Chỉnh hàng Xem thành viên: chữ Times New Roman24px cùng nhóm hàng, icon thu42→34px, số lượng dùng font Arial để hiện chữ số Latin 1/2/3... Build PASS, dist/assets/index-DFE62PqJ.js; chưa browser QA.

- 2026-10-08: Bỏ lớp nâu che chữ trên nút Đổi tên; tái sử dụng create-button-blank.png, đặt icon bút và chữ trực tiếp trên mặt nút. Build/typecheck PASS, dist/assets/index-B710-gq2.js. Chưa browser QA.
2026-10-08: Giảm chữ Xem thành viên/tiêu đề bảng xuống22px và dùng Cormorant theo tên hội thoại; số lượng lining-nums cùng baseline. Nút Đổi tên24px. Thêm avatar tròn cho từng thành viên, dùng ảnh Bạn bè/hội thoại và avatar session cho bản thân. Build/typecheck PASS, dist/assets/index-bOOQKOtK.js; chưa browser QA.
- 2026-10-08: Đổi placeholder ô Đổi tên nhóm thành Nhập tên. npm.cmd run build PASS (typecheck + Vite), dist đã cập nhật; chưa browser QA.
- 2026-10-08: Đổi font riêng hàng Xem thành viên sang Times New Roman22px nét thường theo mẫu các hàng tùy chọn bên dưới. Build/typecheck PASS, dist/assets/index-B7eGzUzq.js; chưa browser QA.
- 2026-10-08: Bảng thành viên lấy chiều rộng panel và chiều cao dòng danh sách chat qua ResizeObserver, avatar50px. Lưu creatorName khi tạo nhóm; sắp người tạo đầu bảng và thêm chìa khóa vàng dưới phải avatar. Build/typecheck PASS; chưa browser QA.
- 2026-10-08: Thêm icon camera lên avatar nhóm trong popup tùy chọn; cho chọn ảnh mới và cập nhật hội thoại hiện tại để đồng bộ avatar ở danh sách/header/chat. Build/typecheck PASS, dist/assets/index-Bj-Xo8QT.js; chưa browser QA.
- 2026-10-08: Căn camera avatar nhóm trong popup Tùy chọn về cùng tỉ lệ và độ chồng góc trên phải như popup Tạo nhóm. Build PASS, dist được cập nhật; chưa browser QA.
- 2026-10-08: Thu chìa khóa người tạo trong danh sách thành viên và đặt trong vòng tròn xám. Build/typecheck PASS, dist đã cập nhật; chưa browser QA.
- 2026-10-08: Căn giữa tên nhóm dưới avatar trong popup tùy chọn, cách mép avatar15px theo đơn vị thiết kế. Build PASS, dist đã cập nhật; chưa browser QA.
- 2026-10-08: Đổi chìa khóa người tạo sang #FBD65B và nền/vòng tròn sang #666666. Build/typecheck PASS; dist được cập nhật, chưa browser QA.
- 2026-10-08: Căn avatar, tên nhóm và nút Đổi tên cùng trục giữa trong popup tùy chọn; camera bám theo góc phải avatar sau chỉnh tâm. Build PASS, dist được cập nhật; chưa browser QA.

- 2026-10-08: Matched group member popup rows to chat list dimensions/typography and removed the extra avatar border. Build passed with npm.cmd run build; dist regenerated and references index-D2AVa3Na.js.


- 2026-10-08: Removed the separate Remove Friend row from conversation options; friend request/removal remain together on the header friend control. Report row moved into the freed position. Build pending.
- Build confirmation for the 2026-10-08 friend action move: `npm.cmd run build` passed (typecheck + Vite); dist references index-CFpkPENr.js.

- 2026-10-08: Vertically centered the group avatar in the options popup between the upper frame edge and Rename button; moved camera and group name with it. Build pending.
- Build confirmation: `npm.cmd run build` passed (typecheck + Vite); dist references index-CrP7qWzk.js.
- 2026-10-08: Added the centered green sent toast on new friend requests from the message header; reused the Friends animation class. npm.cmd run build passed (typecheck + Vite); dist references index-DPSmdfv5.js.
- 2026-10-08: Shifted group avatar, camera and name upward by 10 design pixels in the options popup. Build pending.
- Build confirmation: `npm.cmd run build` passed (typecheck + Vite); dist references index-Ds7JGcqV.js.
- 2026-10-08: Hid Mute Notifications for individual conversations, kept it for groups, and compacted the remaining personal options. Build pending.
- Build confirmation: npm.cmd run build passed (typecheck + Vite); dist references index-DBizLL_1.js.
- 2026-10-08: Added semantic font-heading (Cormorant Garamond) and font-body (Arial) tokens; switched the app body to font-body while preserving existing aliases. npm.cmd run build passed (typecheck + Vite); dist references index-BGPq5PZf.js.

- 2026-10-08: Applied semantic typography to player/group names and ELO values (font-heading), with profile social metrics, Win/Loss labels and Owned text on font-body; preserved sizes and weights. Typecheck/build verification pending.

- Typography convention implementation verified: npm.cmd run typecheck and npm.cmd run build passed; dist regenerated as index-BcSlm2pT.js / index-CSoGlx4M.css.

- 2026-10-08: Per follow-up, moved ELO numerals in Home, player cards, ranking, profile rating badges and screenshot renderer to font-body; sizes/weights unchanged. Build verification pending.

- 2026-10-08: Slightly reduced the profile rating numerals from 24px bold to 22px semibold; build verification pending.

- 2026-10-08: Changed the Profile honors heading to font-heading, preserving 24px bold italic styling. Build verification pending.

- 2026-10-08: Reverted profile ELO/rating numerals to their prior Times New Roman 24px bold styling.

- 2026-10-08: Added font-number token for Times New Roman and applied it to profile scores, social metrics, ID, wins/losses, owned count, Home energy/gold, ELO values, room code and screenshot rendering. Build verification pending.

- 2026-10-08: Profile social metric numerals (friends/followers/likes) increased from 22px semibold to 23px medium.

- 2026-10-08: Saved compact count formatting convention: values >=1,000 use K notation, while identifiers, room codes and timestamps retain exact digits. Build verification pending.

- 2026-10-08: Increased profile social metric numeral weight slightly from medium to semibold; size remains 23px.

- 2026-10-08: Enlarged the Profile honors title to 26px and increased its weight to extra-bold; surrounding metrics/layout unchanged.

- 2026-10-08: Reduced the Profile honors title to 24px while retaining extra-bold weight per follow-up.

- 2026-10-08: Increased the Profile honors title weight to black while keeping 24px size.

- 2026-10-08: Enlarged the game player name plaque from 20px to 22px (compact 14px to 16px), retaining font-heading and normal weight.

- 2026-10-08: Increased the game player name plaque another 3px: 22px to 25px, compact 16px to 19px.

- 2026-10-08: Increased the game player name plaque another 2px: 25px to 27px, compact 19px to 21px.

- 2026-10-08: Confirmed game PlayerCard name uses 27px; increased the separate Home name plaque from 20px to 24px so both corresponding name plates reflect the requested larger title. Build verification pending.

- 2026-10-08: Profile honors heading increased by 3px to 27px and given a subtle text stroke for more weight; Owned row reduced from 22px to 20px.

- 2026-10-08: Reduced the Profile honors title from 27px to 25px, preserving black weight and text stroke.

- 2026-10-08: Increased the Owned count numeral to 22px, 2px larger than the 20px Owned label.

- 2026-10-08: Reduced the Owned count numeral from 22px to 20px, matching its label.

- Recovery: Restored ProfileDialog.tsx from HEAD after accidental truncation by shell redirection; reapplied the Owned count size 20px. Prior uncommitted ProfileDialog changes were not recoverable from source, note this limitation.

- Typecheck recovered after restoring ProfileDialog; required ProfileDialog optional playerId/challengeTargetId/onOpenMessages prop types were reapplied. Build verification pending.

- 2026-10-08: Enforced font-number on displayed UI numerals across profile metrics, room counts/times, message timestamps, invite counts, player clocks, room viewer count, Elo and energy/gold. Updated the global rule for all current/future visible numbers. Build verification pending.

- 2026-10-08: Bảng hồ sơ trong Tùy chỉnh avatar dùng nguyên bảng thông tin dùng chung, hiện thêm dòng ID và nút sao chép như phần Thông tin. 
pm.cmd run build (typecheck + Vite) PASS; dist/assets/index-Cgh9GUJJ.js đã cập nhật. Chưa browser QA.

- 2026-10-08: Theo yêu cầu người dùng, khóa lại toàn bộ UI/nội dung Danh hiệu trên project (catalog, ảnh/khung, cụm sao, popup chi tiết và các vị trí hiển thị); không chỉnh đến khi được mở khóa rõ ràng. Đồng bộ phạm vi trong AGENTS.md và PROJECT-MEMORY.md. Không cần build vì chỉ cập nhật hướng dẫn.

- 2026-10-08: Theo xác nhận mở khóa phạm vi typography của Xếp hạng cho task này: tiêu đề cột chuyển sang font-heading giống tên người chơi; tên tăng font-weight 700→800. Build/typecheck PASS; dist/assets/index-D2QJtDY2.js và index-BYqQA81a.css cập nhật. Đã khóa lại Xếp hạng sau khi hoàn tất; chưa browser QA.

- 2026-10-08: Mở khóa Lịch sử cho lần hoàn tác này; khôi phục HistoryDialog.tsx về bản HEAD trước đó, giữ nguyên MatchResultBadge artwork Thắng/Thua. Build/typecheck PASS; dist/assets/index-DD9T2z74.js và index-CRdrARoj.css cập nhật. Đã khóa lại Lịch sử; chưa browser QA.

- 2026-10-08: Theo yêu cầu tăng thêm độ đậm typography Xếp hạng, tiêu đề cột đổi bold→extrabold, tên người chơi extrabold→black; cỡ chữ/font giữ nguyên. Build/typecheck PASS; dist được cập nhật. Đã khóa lại typography Xếp hạng sau task; chưa browser QA.

- 2026-10-08: Tăng độ đậm thêm cho tiêu đề cột và tên Xếp hạng bằng text stroke 0.35px/0.45px; giữ font-size và vị trí. Lý do lần tăng font-weight trước khó thấy: Cormorant Garamond hiện chỉ khai báo face weight 600. Build/typecheck PASS; dist cập nhật. Đã khóa lại Xếp hạng; chưa browser QA.

- 2026-10-08: Theo phản hồi tên trong Xếp hạng vẫn cần đậm hơn, tăng riêng text-stroke tên người chơi từ 0.45px lên 0.8px; tiêu đề và kích thước giữ nguyên. Build/typecheck PASS; dist đã cập nhật. Đã khóa lại Xếp hạng; chưa browser QA.

- 2026-10-08: Theo yêu cầu, giảm nhẹ nét tên Xếp hạng 0.8→0.65px và gắn cỡ tên với token avatar theo tỷ lệ22/84 để tự scale cùng avatar khi thay kích thước. Ghi quy tắc vào PROJECT-MEMORY và RANK-SYSTEM. Build/typecheck PASS; dist cập nhật. Đã khóa lại Xếp hạng; chưa browser QA.

- 2026-10-08: Người dùng mở khóa liên tục toàn bộ UI Lịch sử cho đến khi họ yêu cầu khóa lại; đổi tên hai bên trong hàng lịch sử sang font-heading, giữ cỡ18px và font-weight. Đồng bộ phạm vi vào AGENTS.md/PROJECT-MEMORY.md và ghi kiểu tên vào ghi nhớ. Build/typecheck PASS; dist đã cập nhật; chưa browser QA.

- 2026-10-08: Tăng tên người chơi trong danh sách Lịch sử 18→20px, giữ font-heading và font-weight. Cập nhật PROJECT-MEMORY. Build/typecheck PASS; dist được cập nhật; chưa browser QA.
- 2026-10-08: Popup Tao nhom: moved the empty-name warning above the name field and clear it on the first typed character; trim validation on submit remains. Rule recorded in docs/MESSAGES-UI.md. npm.cmd run build PASS (TypeScript + Vite), dist/assets/index-CqEcjWy6.js updated; no browser QA.
- 2026-10-08: Tin nhan: made player avatars circular and cropped with object-cover in conversation rows, chat header/messages, group member picker, and options; group avatar rendering already clipped to a circle. Added the persistent rule to PROJECT-MEMORY and MESSAGES-UI. npm.cmd run build PASS (TypeScript + Vite); dist/assets/index-Dij9JIZl.js updated; no browser QA.
- 2026-10-08: Tin nhan: preserve conversation order; newly created groups go to the top, and when sending a message promote only that conversation while retaining relative order of all others. Updated PROJECT-MEMORY and MESSAGES-UI. npm.cmd run build PASS (TypeScript + Vite), dist/assets/index-B-uuW9md.js updated; no browser QA.
- 2026-10-08: Tin nhan groups: only the creator identified by creatorName (gold key) can see/use rename and change-avatar controls. Updated PROJECT-MEMORY and MESSAGES-UI. npm.cmd run build PASS (TypeScript + Vite), dist/assets/index-BAz5tLNx.js updated; no browser QA.
- 2026-10-08: Tin nhan block action: dynamically show “Chặn” or “Bỏ chặn” based on current state, masking the baked-in asset label; confirmation remains for either action. Updated PROJECT-MEMORY and MESSAGES-UI. npm.cmd run build PASS (TypeScript + Vite), dist/assets/index-eyitcAUr.js and index-B5eRYPUH.css updated; no browser QA.
- 2026-10-08: Added a hover hint to shared player rank badges and right-click enlargement using the same artwork/stars; close with the button, backdrop, or Escape. Kept avatar/rank geometry and artwork unchanged. Updated PROJECT-MEMORY. `npm.cmd run build` PASS (TypeScript + Vite); `dist/assets/index-B4qKfQt9.js` regenerated. Browser QA not performed.
- 2026-10-08: Raised the shared checkmate piece-lift heights by 2px per intensity and increased airborne hold from 300ms to 400ms. Preserved 100ms ascent/descent and extended total duration to 600ms. Updated PROJECT-MEMORY. `npm.cmd run build` PASS (TypeScript + Vite); `dist/assets/index-v0ThFJbr.js` regenerated. Browser QA not performed.
- 2026-10-08: Shortened the checkmate piece-lift effect by 100ms, restoring total duration to 500ms and raised hold to 300ms; kept the increased lift height and 100ms ascent/descent. Updated PROJECT-MEMORY. `npm.cmd run build` PASS (TypeScript + Vite); `dist/assets/index-CWctVsgP.js` regenerated. Browser QA not performed.
- 2026-10-08: Added the Phong danh hiệu panel to the other-player profile’s Tặng quà action. It lists all 15 existing awarded honors in level order, gives the first three a gold sparkle, shows eight rows with vertical scrolling, and tracks grants only for the current dialog session. Reused the existing ornate panel and selection-glow assets. Updated PROJECT-MEMORY and HONOR-SYSTEM. `npm.cmd run build` PASS (TypeScript + Vite); `dist/assets/index-BaLQNYfl.js` and `index-CgJlFJc0.css` regenerated. Browser QA not performed because the required node_repl computer-use runtime is unavailable in this session.
- 2026-10-08: Changed the Phong danh hiệu trigger to right-clicking the title badge beneath an in-game avatar. Left-click avatar still opens the player profile; the shared badge uses the new context callback in game and retains enlargement elsewhere. Updated PROJECT-MEMORY and HONOR-SYSTEM.

- 2026-10-08: Corrected Phong danh hiệu to open on right-click directly on the in-game avatar. Panel is anchored beneath the clicked avatar with a transparent dismiss layer, uses both tight-cropped frames from a062d2ab (first three level1 rows sparkle), preserves all15 catalog entries and displays8 scrollable rows. Row selection records a UI-session grant per recipient and closes the panel. Restored Tặng quà to its separate unavailable notice; badge enlargement remains separate. TypeScript + Vite build PASS; dist/assets/index-BtSEaNoU.js and index-RCI55Z4e.css generated and checked for the new row assets. Browser visual QA not performed.
- 2026-10-08: Added persistent per-recipient honor toggles via useHonorGrants/localStorage. Each active title appears once; granted rows dim50% but remain clickable for revocation, which restores brightness. Keep the menu open and show green friend-request-style grant/revoke feedback (500ms visible, existing320ms rise/fade). Storage errors report failure; cross-tab storage events refresh state. Removed obsolete unreachable profile-grant state. Updated HONOR-SYSTEM/PROJECT-MEMORY. npm.cmd run build PASS (TypeScript/Vite); dist/assets/index-Bk7Fw6Zt.js and index-CBpS2thX.css regenerated; persistence key and both notification texts confirmed in dist. Browser interaction QA not performed. Persistence is local to the browser profile, not backend/account or cross-device storage.
- 2026-10-08: Changed grant/revoke notifications to the existing regular brown/gold card asset grant-row.png, preserving its1340:290 ratio and cream text; retained500ms visibility and existing320ms upward fade. Updated HONOR-SYSTEM/PROJECT-MEMORY. npm.cmd run build PASS (TypeScript/Vite); dist/assets/index-DaJIbXOt.js and index-1MXL_CJf.css regenerated and verified for the notice card ratio/asset. Browser visual QA not performed.
- 2026-10-08: User authorized the avatar/profile honor count area for this task. Restored the eye/count badge on profile preview honors using the same AwardedHonorCount component as catalog levels2–5; kept level1 visibility rule and avatar/frame geometry. Replaced hardcoded1 with active persistent grant count for the viewed recipient/title (0 or1 from this browser profile). Local grants/revocations update catalog and preview immediately through a shared same-page event, with existing cross-tab sync. Updated HONOR-SYSTEM/PROJECT-MEMORY. Existing avatar/honor locks apply again after this task. npm.cmd run build PASS (TypeScript/Vite); dist/assets/index-DvhxDKDe.js and index-1MXL_CJf.css updated, counter label and sync event confirmed in dist. Browser visual QA not performed. Counts are local contributions; no authenticated community/backend totals exist yet.
- 2026-10-08: Enlarged the shared bestowed-honor eye icon1em→1.2em in catalog/profile preview. Updated memory/honor rules. npm.cmd run build PASS; dist/assets/index-BzQRxwQD.js and index-CdTpvt96.css updated; new icon class confirmed in dist. Browser visual QA not performed.

- 2026-10-08: Applied honor-menu role rules: seated player may open/grant only on the opponent side; viewers may use both occupied seats. Shared permission predicate guards opening, rendering and toggling, and hides unavailable avatar hints. Documented rule in memory/honor docs. npm.cmd run build PASS; dist/assets/index-BhoWRLGK.js updated and confirmed in dist/index.html. Browser interaction QA not performed.

- 2026-10-08: Removed right-click enlargement and hover hint from shared AvatarRankBadge throughout the app. Badge context events stop at the badge so they cannot open the parent avatar menu. Direct avatar right-click and its role rules remain. Updated PROJECT-MEMORY/HONOR-SYSTEM. npm.cmd run build PASS; dist/assets/index-CC3rWLce.js and index-Bqbx7Sxk.css updated, obsolete enlargement hint absent from source/dist. Browser interaction QA not performed.

- 2026-10-08: Saved/applied no default bestowed ownership. Levels2–5 require1 active distinct-person grant; level1's three titles require20 each and have no eye. Owned count/All/profile-preview/selection eligibility use the same threshold, and stale saved selections cannot unlock titles or block valid new selections. Full15 remain in dedicated catalog/grant menu. Documented future database unique grantor/recipient/title records, zero initial data, stable IDs and server aggregation in AGENTS/HONOR-SYSTEM/PROJECT-MEMORY. Final npm.cmd run build PASS (TypeScript/Vite); dist regenerated and current entry checked. Browser QA not performed. Existing local storage contributes0/1 per title/recipient; multi-user database aggregation is still pending.
- 2026-10-08: Increased shared honor eye icon1.2em→1.35em and reduced counter corner radius from full pill to0.45em; catalog/profile preview synchronized. Updated memory/honor docs. npm.cmd run build PASS; dist/assets/index-CdPxCJ9B.js regenerated and both values confirmed in dist. Browser visual QA not performed.

- 2026-10-08: Removed forced first-move checkmate from local useGame/gameStore, shared applyMove and online RoomService. Restored checkmate visual trigger to actual checkmate result. Added regression assertions to opening-clock room test that first legal move stays playing with no result and opponent can reply. Rules/store/hidden tests PASS; overall selected run45/46 PASS, with existing unrelated rooms test failure expecting third player rejection although viewers are allowed. Focused opening/first-move regression PASS. Final npm.cmd run build PASS; dist/assets/index-BA410JDs.js regenerated and entry verified. No forced-checkmate identifiers remain in source/server. Browser QA not performed.
- 2026-10-08: Increased checkmate airborne hold300→800ms (+500ms), shared with piece/shadow/filter animations. Defined landing duration explicitly and derived total from phases (currently100+800+100=1000ms). Requested clarification before reducing ascent/descent by200ms because their combined existing time is only200ms. Build/typecheck PASS and dist updated; browser QA not performed. Travel-speed change remains pending user clarification.

- 2026-10-09: Restricted both in-game Like buttons to occupied human seats in online room snapshots. Hidden for computer/local placeholder/viewer-preview avatars and empty seats; kept opponent-only rule for players and both occupied seats for viewers. Updated memory. npm.cmd run build PASS; dist/assets/index-BBOlelzY.js updated and confirmed via dist/index.html. Browser interaction QA not performed.
# 2026-10-09 — Chống lặp toàn bộ thế cờ

- Thêm `game/rules/repetition.ts`: khóa 90 ô + bên đến lượt, simulation thuần, bộ đếm từng thế và hints legal/repetition-forbidden. Seed thế đầu 1; lần 3 cảnh báo sau animation, lần 4 cho đi, lần 5 bị chặn trước commit, không kết luận hòa/thua.
- Đồng bộ `applyMove`, Zustand, useGame/Board/GamePage và RoomService. Click chấm đỏ giữ quân chọn, không phát sound/animation/socket/AI hoặc thay clock do click. Snapshot clock online không phát lại thông báo.
- Hoàn tác local/server phục hồi bộ đếm từ snapshot; reset/ván mới/rematch seed lại 1. Máy cơ bản tránh nước bị cấm; Pikafish tái dựng lịch sử và giới hạn root moves bằng UCI searchmoves, kiểm tra lại phản hồi.
- Lưu quy tắc vào AGENTS.md, PROJECT-MEMORY.md, REPETITION-RULES.md và cập nhật ghi chú Cờ Úp. Giữ UI/avatar/danh hiệu ngoài phạm vi.
- Kiểm chứng: typecheck thành công; 9 file test liên quan, 59 test qua (rules/store/Cờ Úp/computer/repetition/UI/move sound/Pikafish). Có kiểm chứng engine Pikafish thật tránh lần 5 và từ chối lịch sử chứa nước bị cấm; DOM test click local/online và cảnh báo sau animation. Chưa QA trình duyệt. Không chạy production build theo phạm vi yêu cầu trong attachment.
# 2026-10-09 — Xem thử lặp Pháo Đen

- Home Cờ Tướng tạm vào `repetition-test`: người chơi Đỏ đi trước, máy Đen đưa Pháo trái (hàng2/cột1) vào giữa (cột4) rồi về chỗ cũ. Không thay lựa chọn máy cơ bản/Pikafish hoặc online/Cờ Úp.
- Pháo chỉ đi khi hợp lệ, không ăn quân trong kịch bản; nếu nước tạo lần5 bị cấm thì dừng và báo lý do, không ép commit. Người dùng cần đi một quân qua lại để toàn thế lặp.
- Typecheck và production build thành công; đã kiểm tra bundle dist chứa repetition-test. Chưa thao tác thử trên trình duyệt.
# 2026-10-09 — Sửa entry thử để người dùng cầm Đỏ đi trước

- Nguyên nhân: cấu hình repetition-test trước đó đặt ở playLocal (nút sr-only), trong khi nút Cờ Tướng thực tế gọi quickPlay và vẫn vào máy cơ bản/người Đen. Nối quickPlay vào playRepetitionTest tạm, giữ playLocal hai người; phiên thử dùng humanSide=red và engine=repetition-test, không bị nhánh start basic đổi sang Đen.
- Typecheck/build thành công, dist chứa entry thử mới. Chưa QA trình duyệt.
# 2026-10-09 — Chuyển chống lặp sang chu kỳ quân theo từng bên

- Thay khóa toàn bàn bằng `GameState.repetition.cycles.red/black`; mỗi chu kỳ lưu ID quân, hai ô, hướng gần nhất và bộ đếm A↔B riêng. Nước khác của bên đó tạo chu kỳ mới; lượt đối thủ không đụng bộ đếm. Không tính khóa bàn hoặc mô phỏng đích trong render.
- `applyMoveWithResult` giữ validation cờ tướng và trả lý do bị cấm để store/server không xác nhận lại luật riêng. Marker đỏ, click message, undo/rematch và warning được giữ đồng bộ; Pikafish dựng chu kỳ từ lịch sử thật.
- Thêm hồi quy đúng ví dụ: Đỏ bắt đầu luân phiên trước, Đen đổi quân rồi bắt đầu Pháo; Đỏ bị chặn lần5 khi Đen mới lần3. Test server xác nhận cùng kết quả.
- Typecheck thành công; 8 file test liên quan, 41 test qua, gồm Pikafish thật. Không chạy build theo yêu cầu.
# 2026-10-09 — Fixture thủ công thử đuổi Pháo

- Đổi nước máy `repetition-test`: Pháo Đen trái hàng2 cột1↔0 thay cho đường cột1↔4. Người chơi Đỏ vẫn đi trước, có thể đưa Xe trái lên cùng cánh. Luật đuổi quân chưa được triển khai trong bước này.

# 2026-10-09 — Chuyển luật lặp sang chu kỳ phối hợp hai bên

- Thay quy tắc mỗi bên tự đếm bằng một chu kỳ chung ghi `starter`, quân/ô shuttle của hai bên, pha và số vòng. Chỉ tăng vòng sau chuỗi starter đi, đối thủ đi, starter quay, đối thủ quay; nước lệch từ bên nào cũng reset chu kỳ. Cảnh báo starter khi xong vòng3; chặn nước mở vòng5 của starter. Không thêm luật đuổi quân.
- Dùng chung `applyMoveWithResult` để client/server validate một lần; nước cấm trả lý do riêng, marker đỏ lấy từ hint hợp lệ trong `Board.tsx`. Snapshot undo giữ state cũ; reset/rematch tạo game mới.
- Khôi phục nút Cờ Tướng Home về quick play; không ép người dùng vào fixture repetition-test. Giữ helper test riêng cho test tự động.
- Kiểm chứng: typecheck và bộ test liên quan chạy ở bước bàn giao bên dưới; không chạy build theo yêu cầu.

# 2026-10-09 — Đưa nhắc nhở lặp vào giữa màn hình

- Tách cảnh báo chu kỳ lần3 và thông báo chặn nước lặp khỏi dòng status nhỏ. Hiển thị hai nội dung trong thẻ nâu viền vàng ở tâm màn hình, chữ lớn; các trạng thái khác không đổi vị trí.
- Dùng lại asset thẻ nâu đã có; thẻ không nhận click và không xuất hiện trong ảnh chụp bàn.
- Kiểm chứng typecheck/build thực hiện trước bàn giao.

# 2026-10-09 — Tạm dừng clock trong thẻ nhắc lặp

- Thu nhỏ chữ thẻ nhắc, đóng tự động sau2 giây và thêm vùng bấm ngoài để đóng ngay. Ván local neo clock đến mốc mở lại; online thêm trạng thái pause authoritative, broadcast trong RoomSnapshot, khóa lệnh ván trong thời gian pause và tự resume ở server sau2 giây nếu client mất kết nối.
- Kiểm chứng typecheck/build thực hiện trước bàn giao.

# 2026-10-09 — Đồng bộ nhắc lặp cho hai phía

- Nội dung cảnh báo vòng3 nêu rõ cả hai bên cùng lặp chu kỳ. Online snapshot mang loại notice (warning/forbidden) để cả hai người chơi cùng hiện thẻ kể cả khi chỉ một phía bấm chấm đỏ; đóng ở một phía đóng notice và tiếp tục clock cho cả phòng.
- Kiểm chứng typecheck/build thực hiện trước bàn giao.

# 2026-10-09 — Dùng chung bảng cảnh báo vòng3 trong phòng

- Chuyển cảnh báo hoàn tất vòng3 thành trạng thái phòng do server bật ngay khi nước hoàn tất vòng được commit. Đồng bộ một thẻ duy nhất cho cả hai người chơi và khán giả; clock pause không thời hạn đến khi một trong hai người chơi đóng bằng cách bấm ngoài. Khán giả không thể dismiss.
- Giữ thông báo nước chấm đỏ bị chặn thành notice riêng có timeout2 giây. Local cảnh báo vòng3 cũng giữ clock dừng cho tới dismiss.
- Kiểm chứng typecheck/build thực hiện trước bàn giao.

# 2026-10-09 — Fixture lặp Pháo cho người chơi Đen

- Nút thử Cờ Tướng mở local `repetition-test` với người dùng cầm Đen và đi trước; máy cầm Đỏ. Cả Pháo Đỏ hàng7 và Pháo Đen hàng2 đi ngang giữa cột1↔4 rồi quay lại để người dùng kiểm tra chu kỳ mà Đen khởi đầu.
- Máy không tự đi tiếp khi cảnh báo vòng3 còn mở. Đóng bảng bằng tay mới cho phép máy tiếp tục; chặn lần5 vẫn do luật lặp thật xử lý.
- Kiểm chứng typecheck/build trước bàn giao.

# 2026-10-09 — Cho máy Đỏ đi trước trong fixture lặp Pháo

- Đặt lượt mở đầu theo mặc định: máy Đỏ đi Pháo cột1→4 trước, người chơi cầm Đen và shuttle Pháo cột1↔4. Giữ pause khi cảnh báo vòng3; máy không đi tiếp cho tới khi người dùng tự bấm đóng bảng để xác minh đồng bộ.
- Kiểm chứng typecheck/build trước bàn giao.
- Build/typecheck PASS; dist cập nhật để người dùng mở thử. Chưa browser QA.

- 2026-10-09: Updated repetition notices: only round 3 uses the shared centered panel. A forbidden fifth-move red-dot click has no notice for the actor; online server validates it and sends a short status only to the opponent. The test AI reports its forbidden attempt in the ordinary status line, without opening the retry-error state. Typecheck and production build pass; bundle in dist updated. No browser QA.

- 2026-10-09: Bỏ chiếu lặp khỏi repetition: candidate move tạo chiếu sẽ reset cycle về null; chỉ chu kỳ đi quân phối hợp không chiếu được đếm. Chạy typecheck và production build thành công; dist cập nhật. Không chạy tests theo yêu cầu phiên làm việc.

- 2026-10-09: Fixed repetition-test machine error after an off-script human move: preserve the scripted cannon shuttle when legal, otherwise fall back to a regular legal computer move. Typecheck/build pass; dist updated; no browser QA.

- 2026-10-09: Removed the scripted cannon AI fixture and restored Home quick play room-matching. Basic AI now chooses freely from legal moves filtered through repetition validation; Pikafish remains server-validated. Typecheck/build pass; dist updated. No tests run.

- 2026-10-09: Updated Room Selection header to show the selected player avatar and frame through shared AvatarPortrait/AvatarFrameOverlay, and render the editable name in font-heading. Typecheck/build pass; dist updated. No browser QA.

- 2026-10-09: Replaced the playing check-status text with the shared white ring around the checked general, using the existing last-move ring style. Other status and result messages remain. Typecheck/build pass; dist updated. No browser QA.

- 2026-10-09: Removed the name input underline in Room Selection and vertically centered its avatar/name cluster in the header. Typecheck/build pass; dist updated. No browser QA.

- 2026-10-09: Fixed the takeback-decline “Từ chối” badge stacking in PlayerCard by raising it above the portrait/frame/timer overlays; geometry and animation unchanged. Typecheck/build pass; dist updated. No browser QA.
- 2026-10-09: Enlarged Room Selection header name from 18/14px to 20/16px and enabled lining/tabular numerals for aligned digits. Build including typecheck PASS; dist updated (index-dui-04Of.js). No browser QA.
# 2026-10-09 — Ô địa chỉ Chọn Bàn

- EnergyNotice: đưa bộ đếm vào góc trên trái bên trong khung, chừa khoảng trên tiêu đề; dropdown mở lại mặc định mỗi lần mở bảng. Build/typecheck PASS, xác nhận class mới trong dist. Chưa kiểm tra trình duyệt.
- Theo ảnh người dùng: giữ nguyên padding/bố cục chữ của khung; chỉ phủ ô năng lượng ở góc trên trái bên trong khung. Build/typecheck PASS, dist cập nhật; chưa kiểm tra trình duyệt.
- Mở rộng nhẹ EnergyNotice từ 430px lên 450px và tăng padding dọc để khung cao hơn; giữ năng lượng ở góc trên trái. Build/typecheck PASS, dist cập nhật; chưa kiểm tra trình duyệt.
- Theo yêu cầu tiếp: mở rộng chiều ngang EnergyNotice từ 450px lên 490px, giữ nguyên chiều cao. Build/typecheck PASS; dist cập nhật.
- Xem thử năng lượng: máy cơ bản ở Cờ Tướng và Cờ Úp kiểm tra năng lượng trước khi bắt đầu, mở EnergyNotice nếu hết và trừ1 khi ván bắt đầu; ngoại lệ tạm thời, không áp dụng local hotseat hay lựa chọn máy khác. Build/typecheck PASS; dist cập nhật.
- Mở khóa nút Sẵn sàng trong lúc hiệu ứng mở phòng chạy; giữ khóa nước đi và vẫn chặn nút Sẵn sàng nếu lệnh đang chờ hoặc người chơi đã sẵn sàng. Build/typecheck PASS; dist cập nhật.
- Chọn Bàn: rút gọn tiền tố địa chỉ “Thành phố” thành “TP.” trên nhãn; tăng nhẹ hai icon và số đếm. Build/typecheck PASS; dist cập nhật.
- Nút giữa Chọn Bàn có nhãn “Tạo bàn” và dấu cộng bên phải, căn giữa theo cụm. Build/typecheck PASS; dist cập nhật.

- Hiển thị tỉnh/thành từ địa chỉ hồ sơ dùng chung session, tăng nhẹ hai icon bộ đếm; giữ asset/khung hiện tại.
- Tổng bàn dùng danh sách API; người cùng tỉnh/thành đang ở Chọn Bàn dùng socket presence server qua Controller → Service → Repository. Cleanup khi rời trang/disconnect, đăng ký lại khi reconnect.
- Typecheck/build PASS; dist cập nhật. Chưa kiểm tra đa trình duyệt; chưa có auth nên số người tính theo kết nối.


- 2026-10-10 ? Theo y?u c?u l?m nhanh UI ?i?n tho?i: Home c? b? c?c 2?2 n?t ch?i v? ti?n ?ch d? ch?m; Ch?i V?i M?y c? form mobile ri?ng d?ng c?ng hook; Ch?n B?n d?ng k?ch th??c CSS th?c, l??i2 c?t v? ch?n t?nh cao80dvh. Trong v?n, chat mobile m? b?ng n?t, thao t?c v?n l?n h?n v? d?nh v?ng ??y ri?ng. Ch? ??i tr?nh b?y compact, gi? logic/API v? UI desktop; kh?ng s?a avatar, khung avatar ho?c b? c?c c?c dialog x? h?i ?? kh?a. Build/typecheck th?nh c?ng; ch?a ki?m ch?ng tr?c quan tr?n ?i?n tho?i th?t.

- 2026-10-10 ? Sau khi v?n k?t th?c c? ng??i th?ng, gi? k?t qu? ?t nh?t3 gi?y r?i m?i ??a ng??i ??u h?ng hi?n t?i l?n thay ng??i thua; ng??i thua xu?ng cu?i h?ng. Ch?n ready/reset ?? kh?ng b? qua h?ng ch? trong3 gi?y. Server tick th?c hi?n chuy?n gh?; ng??i xem kh?ng x?p h?ng v?n kh?ng ???c ??a l?n. R?i ph?ng v?n l?p gh? ngay theo quy t?c tr??c. Demo hai m?y c?ng k?t th?c tr??c, ??i3 gi?y r?i cho ng??i x?p h?ng v?o v?n m?i.

- Ki?m ch?ng task ch?3 gi?y: 2 test li?n quan chuy?n h?ng/r?i ph?ng pass, g?m gi? nguy?n gh? ?2999ms v? ??i ?3000ms. To?n b? rooms.test.ts:13 pass/7 fail ? th?ng b?o ti?ng Vi?t l?i m? h?a v? k? v?ng c? ch?n ng??i th? ba (ngo?i ph?m vi). Typecheck/build th?nh c?ng, dist ?? c?p nh?t; ch?a QA tr?nh duy?t.

- 2026-10-10 ? Ng??i ch?i b?t ??u phi?n v?i ??5 n?ng l??ng (MAX_ENERGY), kh?ng kh?i t?o0. Gi? c? ch? tr?/h?i v? l?u trong phi?n hi?n t?i.

- 2026-10-10: Queue/rematch rule verified: loser stays seated without queued viewers; late queue entries replace loser after the 3s result window only before rematch readiness. First ready closes old rotation. Six focused service tests pass.

- 2026-10-10: Queue timing supersedes prior minimum delay: entries queued before match end wait 3 seconds; entries queued after match end promote immediately when first in line. Rematch readiness still prevents replacement. Preserve FIFO; demo follows the same timing.

- 2026-10-13: Theo đính chính, hoàn tác thay đổi ô Cờ Úp Home và dùng ảnh 63d54150 cho mặt sau quân úp trên bàn. Ảnh cắt và trim alpha còn 441×435; typecheck/build PASS, dist có concealed-back-Clukm56z.png. Chưa QA trình duyệt trực tiếp.




- 2026-10-13: Cân ảnh mặt quân úp mới vào đúng khung 108×112 như quân mở, dùng cùng bóng đổ; typecheck/build PASS, dist có ảnh quân úp và class object-fill. Chưa QA trình duyệt trực tiếp.

- 2026-10-13: Cân màu mặt quân úp bằng saturate 0.84 trên Board; đo mẫu viền quân úp 202/131/55 so với quân mở đỏ 202/145/86, đen 182/124/65. Typecheck/build PASS, dist có lớp saturate(0.84); chưa QA trình duyệt trực tiếp.

- 2026-10-13: Căn tâm hình quân Đỏ đã mở sang phải 2px theo scale Board trong ChessPiece; đo alpha asset cân giữa nhưng hiệu chỉnh vị trí thị giác theo phản hồi. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt trực tiếp.

- 2026-10-13: Dựng lại vùng thiết lập desktop Chơi với máy theo ảnh: một robot, 10 cấp, chọn phe, hành động/banner; giữ Máy · Cơ bản trong biển tên. Cấp nối session/API/server thời gian suy nghĩ, xác thực 1–10. Typecheck/build PASS, 6/6 pikafish tests PASS, dist có nhãn cấp. Chưa QA browser vì công cụ Computer Use dừng do chưa hỗ trợ kiểm soát URL trên Windows browser.

- Kiểm chứng bố cục Vị trí tùy chỉnh: typecheck/build PASS; dist có thông báo đang phát triển và class căn giữa khay. Chưa QA browser trực tiếp.

- 2026-10-13: Icon Lưu đổi sang vàng đặc32px như các tiện ích, bỏ chữ bên dưới. Typecheck/build PASS; dist index-C71Fo5ZO.js đã xác nhận icon mới. Chưa QA browser trực tiếp.

- 2026-10-13: Đấu ngay dùng asset đỏ/hai rồng mới dưới khay quân, gap10px và căn giữa cả cụm; ẩn nút giữa bàn chỉ ở trình chỉnh thế. Asset trim alpha2022×355, nguồn được lưu. Typecheck/build PASS; dist index-CgpIF6SV.js có asset mới. Chưa QA browser trực tiếp.

- 2026-10-13: Xóa quân dọn toàn bộ quân thường, giữ Tướng; bỏ chế độ xóa từng quân bằng nút. Cho xếp thế Tướng đối mặt, chỉ chặn Đấu ngay/server. 12/12 test liên quan PASS; typecheck/build PASS; dist index-pUbNjYQj.js có hành vi mới. Chưa QA browser trực tiếp.

- 2026-10-13: Sửa hình icon Lưu theo mẫu mới, thân bo nhẹ/khe trên có chốt vàng/ô dưới rộng,32px không chữ. Typecheck/build PASS; dist index-BsoFwvCt.js xác nhận path mới. Chưa QA browser trực tiếp.

- 2026-10-13: Khay quân bỏ nhãn màu, thêm số1–7 bấm được; ↑/↓ chọn khay Đen/Đỏ viền vàng, phím số chọn quân tương ứng. 7/7 test editor PASS; typecheck/build PASS; dist index-kKDHB2xO.js cập nhật. Chưa QA browser trực tiếp.

- 2026-10-13: Tăng độ nổi khay đang chọn bằng selectionPalette nền/viền/glow và outline vàng; click khay chọn màu. Đổi phím/nhãn6,7 thành Q,W (Pháo,Tốt). 7/7 test editor PASS; typecheck/build PASS; dist index-DgYTp5jk.js cập nhật. Chưa QA browser trực tiếp.

- 2026-10-13: Khay màu được chọn bằng click hoặc ↑/↓, giữ lựa chọn khi rê sang khay khác; hover chỉ sáng viền. Typecheck/build PASS; dist index-D8buVIeh.js xác nhận cập nhật. Chưa QA browser trực tiếp.

- 2026-10-14: Icon Lưu theo mẫu mới: thân vàng đặc, ô dưới kín và rãnh ngang, chốt vàng phía trên; giữ32px không chữ. Typecheck/build PASS; dist index-DE1x7fXJ.js xác nhận path mới. Chưa QA browser trực tiếp.

- 2026-10-14: Saved rollback A before edits in .checkpoints/A-2026-10-14.zip (879 files, SHA256 manifest verified). Git object writes unavailable, used ZIP preserving tracked/nonignored untracked files; dist rebuilt after restore. Synchronized revealed pieces via ChessPiece object-fill/no red4px offset and shared black wood filter; animation/image templates matched. 13/13 custom/editor tests PASS; typecheck/build PASS; dist index-BcuPLWob.js verified. No browser visual QA.

- 2026-10-14: Căn riêng mặt tròn quân Đỏ bằng displacement map (dịch phải2% vùng mặt, trung tính ngoài thân), giữ geometry chung và mốc A. Đồng bộ filter trong animation. Typecheck/build PASS; dist index-CGXqwlWq.js có filter. Chưa QA browser trực tiếp, cần đối chiếu thị giác người dùng.

- 2026-10-14: Cân tông gỗ quân Đen theo Đỏ bằng RGB gamma/mask giữ chữ tối, dùng chung ChessPiece và animation. Geometry/mốc A giữ nguyên. Typecheck/build PASS; dist có wood-mask. Chưa QA browser trực tiếp.

- 2026-10-14: Thông báo trong Vị trí tùy chỉnh tự ẩn sau3 giây; timer cũ được thay khi có thông báo mới và dọn khi unmount. Regression timer 8/8 PASS; typecheck/build PASS, dist được tạo thành công; chưa QA trình duyệt.

- 2026-10-14: Thêm công tắc Đi tiên dưới Đổi bên, mặc định Đen; nền đỏ khi Đen/trắng vàng khi Đỏ. Tách bên đi trước khỏi phe cầm, đồng bộ FEN/validation/start. 9/9 test editor PASS; typecheck/build PASS; dist index-c3FDRM1Q.js chứa công tắc. Chưa QA browser.

- 2026-10-14: Đảo công tắc theo mẫu: phải/nền đỏ là Đỏ tiên; trái/nền trắng vàng là Đen tiên; tăng khoảng cách nhãn Đi tiên thêm8px. Typecheck/build PASS; dist index-C1oD4YFG.js đã kiểm tra nhãn mới; chưa QA browser.

- 2026-10-14: Mặc định công tắc Đi tiên là Đỏ; biểu tượng ⇄ dịch lên2px. 9/9 test editor PASS; typecheck/build PASS, dist index-BNu91Z8n.js cập nhật. Chưa QA browser.

- 2026-10-14: Bỏ cụm user ở Vị trí tùy chỉnh, tăng chữ Đi tiên20px; compact bỏ hàng avatar trống. Typecheck/build PASS; dist index-FlDgcPDV.js đã kiểm tra class chữ mới. Chưa QA browser.

- 2026-10-14: Chọn bên/Đi tiên cách10px; chữ Đỏ/Đen20px, switch48×24, khung224px giữ tâm. Đối chiếu code xác nhận side→humanSide, firstSide→FEN/validation độc lập. Typecheck/build PASS; dist index-CFhfXBGS.js có thay đổi; chưa QA browser.

- 2026-10-14: Mở riêng tab Đã lưu theo yêu cầu, thêm Ván đấu/Thế cờ; mặc định Ván đấu, Thế cờ trạng thái trống chưa nối dữ liệu. Typecheck/build PASS; dist index-CZbxceAd.js có lựa chọn mới. Chưa QA browser; khóa lại phạm vi Lịch sử sau task.

- 2026-10-14: Thêm lưu ván đã kết thúc cho người chơi/khán giả, archive server trước chuyển ghế, localStorage theo tên, chống trùng/quota, xóa và xem lại từng nước. Đã lưu dùng dữ liệu thật; lưu từ lịch sử mình/người khác ghi đang phát triển. 13/13 test lưu/archive/replay/store PASS; typecheck/build PASS, dist cập nhật. Bộ rooms cũ17/24 PASS,7 lỗi kỳ vọng cũ (chuỗi tiếng Việt bị lỗi mã hóa và chặn khán giả); chưa QA browser. Chi tiết docs/MATCH-SAVING.md.

- 2026-10-14: Chuyển Lưu ván lên GameTools giữa Camera và Bạn bè, tái dùng icon save; bỏ nút lưu nổi, giữ báo lỗi lưu. Typecheck/build PASS; dist đã kiểm tra tooltip mới. Chưa QA browser.

- 2026-10-14: Xem lại ván đã lưu mở screen replay toàn màn hình, đóng HistoryDialog; dùng Board/PlayerCard, thanh diễn biến riêng và quay về Home. Không nạp gameStore/engine hoặc phòng. 2/2 test saving/replay PASS; typecheck/build PASS; dist index-CvCfzFmU.js đã kiểm tra. Chưa QA browser.

- 2026-10-14: Replay tự phát1,2 giây/nước với animation Board; tua/phát/tạm dừng bên trái desktop, không chat/view. Tua tạm dừng, cuối tự dừng. 3/3 test replay/saving PASS; typecheck/build PASS; dist có nút Tạm dừng. Chưa QA browser.

- 2026-10-14: Chốt lại Xem lại điều hướng chính GamePage(replayData), không bàn/layout replay riêng; xóa SavedMatchReplay. Dùng useGame nguồn trạng thái chỉ đọc, vô hiệu AI/tick/socket/game commands/chat; giữ Board/PlayerCard/layout/animation gameplay. Tự phát sau entrance, controls trong PlayerCard trái, back không reset trận thật. 21/21 test computer/replay-isolation/playback/saving/archive/store PASS; typecheck/build PASS, dist đã kiểm tra replayData/controls và xóa component cũ. Bộ repetition-ui cũ1/4 PASS,3 lỗi kỳ vọng cảnh báo cũ (click đỏ/auto dismiss), không sửa ngoài phạm vi. Chưa browser QA.

- 2026-10-14: Làm lại ReplayControls220px: phát/dừng hàng trên, lùi–số nước–tiến hàng dưới; bỏ đầu/cuối và thanh range. Nút dùng selectionPalette nâu/vàng và icon chung. Typecheck/build PASS; dist đã kiểm tra grid hàng tua; chưa QA browser.

- 2026-10-14: ?? l?u/V?n ??u ??t m?nh b?n tr?i, phe/k?t qu? theo ng??i; replay qu?n m?nh ? d??i ??c l?p b?n ?i tr??c. D?ng helper chung, b?n l?u c? x?c ??nh theo t?n; kh?n gi? fallback ??. 3/3 test l?u/perspective PASS, typecheck/build PASS, x?c nh?n logic trong dist index-B69CF8kO.js. Ch?a QA browser tr?c ti?p.

- 2026-10-14: B? d?ng th?ng b?o ?ang ph?t tri?n ? tab ?? ch?i trong L?ch s?. Typecheck/build PASS; dist/assets/index-CkKb3W5d.js ?? c?p nh?t.

- 2026-10-14: Đã chuyển icon đổi Xem lại/Đánh thử xuống dưới Phân tích/Gợi ý; phím Space giữ nguyên.

- 2026-10-14: Sửa khựng đầu/cuối animation quân (độ nhấc theo lựa chọn thực và delta làm tròn đồng nhất); bỏ chờ550ms dư trước Pikafish bàn thử, giữ thinkMs500. Replay trial2/2 PASS; typecheck/build PASS, dist cập nhật. Chưa QA độ mượt trực tiếp trên trình duyệt.

- 2026-10-14: Bổ sung nút đổi bàn dưới user phải50px ở bàn gốc Thế cờ; dùng chung ReplayModeButton, click/Space cùng toggleTrial. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt.

- 2026-10-14: Pikafish đánh thử tăng thời gian tính lên800ms theo yêu cầu; cập nhật kỳ vọng test. Typecheck/build PASS, dist cập nhật.

- 2026-10-14: Bổ sung icon đổi bàn dưới cụm điều khiển replay Ván đấu; phím Space dùng chung. Build kiểm chứng ở lượt hiện tại.

- 2026-10-14: Đổi kiểu nút Lùi/Tiến/Phát replay sang gỗ viền vàng cắt góc từ asset bàn thử. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt.

- 2026-10-14: Hàng Đã lưu → Ván đấu hiển thị quân đỏ trước quân đen bất kể phe người lưu. Typecheck/build PASS, dist cập nhật.

- 2026-10-14: Đồng bộ mũi tên playback52.8×43.14px với trial; Phát cao43.14px, chỉnh nền gỗ cùng kiểu viền. Typecheck/build PASS, dist cập nhật; chưa QA trình duyệt.

- 2026-10-14: Tạo asset Phát mới2089×444 alpha crop sát, thay viền dựng cũ. Đã chơi dùng playedMatchesStore tự ghi ván hoàn tất của bản thân, danh sách/replay dữ liệu thật, tách Đã lưu. Test match-saving-ui3/3 PASS; typecheck/build PASS, dist có asset mới; chưa QA trình duyệt.

- 2026-10-14: Nút Phát playback tăng cao43.14→52.8px theo yêu cầu cân bằng với mũi tên. Typecheck/build PASS, dist cập nhật.

- 2026-10-14: Đã chơi lọc/lưu chỉ online; máy/local ẩn. Rời ván online đang chơi đã được confirm client và RoomService xử thua, archive trước đổi ghế. Typecheck/build PASS.

- 2026-10-14: Replay Đã chơi chỉ vào trial sau save match/position, ẩn icon và Space nhắc; lưu ván được nối vào savedMatchesStore. Played history tự xóa theo hạn một tháng lịch/ván. Test3/3 và typecheck PASS; build đang chạy.

- 2026-10-14: Phân tích/Gợi ý chuyển sang pointer và click hiện thông báo Đang phát triển. Typecheck/build PASS.

- 2026-10-14: Pikafish trong đánh thử replay đã lưu tăng thinkMs800→2500, cấp10; kiểm tra test và build.

- 2026-10-14: Toast replay chuyển sang style thông báo Vị trí tùy chỉnh, neo giữa cạnh dưới bàn, tự ẩn3s. Typecheck/build PASS.

- 2026-10-14: Pikafish trial vẫn level10, giảm thinkMs2500→700ms. Test/build chạy.
- 2026-10-14: Đã lưu/Thế cờ: số trong tên dùng NumberText, căn baseline cùng chữ. Kiểm chứng bằng typecheck/build; chưa QA trình duyệt.
- 2026-10-14: Giảm riêng độ đậm chữ số tên thế cờ về normal; typecheck/build thành công.
- 2026-10-14: Đấu ngay từ Vị trí tùy chỉnh nay vào bàn thử cô lập với Pikafish bật sẵn; thay mã phòng/lượt xem/chat bằng cụm thử. Chưa QA browser.
- 2026-10-14: Bàn thử tùy chỉnh: số nước vào giữa cụm lùi/tiến, Reset xuống dưới khung; typecheck/build.
- 2026-10-14: Hoàn tác bố trí Reset xuống dưới; trả cụm bàn thử tùy chỉnh về ban đầu. Build đã chạy.
- 2026-10-14: Thay bộ artwork replay/trial bằng 8 crop 6c0cdab5; tách nút thật, nhãn/số động. Kiểm tra crop alpha góc và ảnh kết quả; typecheck/build thành công, dist/index-DpYluRXT.js đã có. Chưa QA trình duyệt.
- 2026-10-14: Reset ảnh 0fed4f87 crop alpha 879x800, đặt bên phải Gợi ý trên mọi bàn thử; giữa hàng hiển thị step/total bằng font số. Alpha góc=0; typecheck/build thành công, dist cập nhật. Chưa QA browser.

- 2026-10-15: Căn số trong ô sửa tên Thế cờ theo NumberText hiển thị (Times New Roman regular90%, lining/tabular); giữ input/bố cục. Typecheck/build PASS, dist đã xác nhận font mới; chưa QA trình duyệt.

- 2026-10-15: Đổi thumb thanh cuộn Thế cờ sang nâu đậm#613014, giữ hình học/track. Typecheck/build PASS, xác nhận màu trong dist; chưa QA trình duyệt.

- 2026-10-15: Ghi quy tắc Pikafish mạnh nhất/search700ms cho mọi trợ giúp và máy ngoài chế độ10 cấp; đồng bộ AGENTS, memory, tài liệu bàn thử/thế tùy chỉnh và backlog Phân tích/Gợi ý. Chỉ đổi tài liệu, chưa sửa hoặc kiểm chứng runtime.

- 2026-10-15: Gợi ý dùng Pikafish level10/search700ms, trả1 mũi tên xanh trong Board, không đi quân/ghi game state. Hook riêng hủy request/bỏ phản hồi cũ; clear khi đổi thế/lượt/reset/undo/thoát, giữ qua clock tick. Nối nút ở đấu máy và bàn thử tùy chỉnh; chặn online/demo/replay/Cờ Úp. 4 test gợi ý/overlay PASS; các test replay-trial/computer/Pikafish liên quan PASS; typecheck/build PASS, dist/assets/index-BvXeGI0R.js xác nhận arrow. Chưa QA browser hoặc kiểm chứng trực tiếp engine thật cho luồng gợi ý.

- 2026-10-15: Thêm hover vàng8% cho Phân tích/Gợi ý/Reset; Gợi ý nhấn và đang tính thu94%/tối35%, hết tính hoặc hủy trở lại bình thường. Dùng chung cả nút Gợi ý đấu máy.4/4 test hint (gồm trạng thái thinking/hủy) PASS; typecheck/build PASS, dist xác nhận scale mới. Chưa QA trình duyệt.

- 2026-10-15: Người dùng báo quân đi hơi không mượt ở mọi chế độ. Chưa xác định nguyên nhân/chưa tái hiện trên browser (không có browser kết nối). Regression move-animation-stability xác nhận xóa hint/render lại không restart/cancel animation, giữ DOM quân, lift6px tại scale0.5, đích/top nhất quán và duration400ms.7/7 test stability/hint/trial PASS; chưa sửa production animation. Cần kiểm tra frame thực tế trước khi chốt đã sửa. Typecheck/build PASS, dist được build lại.

- 2026-10-15: Bỏ render dư khi xóa Gợi ý lúc đi quân bằng kết quả gắn context/ẩn đồng bộ; regression trước FAIL2 render, sau PASS1 render.15/15 test liên quan PASS; typecheck/build PASS, dist index--k1JWhbu.js cập nhật. Không đổi thời lượng/đường animation; chưa browser QA, chưa khẳng định hết khựng thực tế.

- 2026-10-15: Người dùng báo mọi thao tác kém mượt từ khi thêm Gợi ý. Giảm tải liên quan: ToolArtworkButton mask hover display:none khi không hover; useReplayTrial memo nước hợp lệ theo game/selected, không tính lại khi UI Gợi ý render. Regression giữ reference moves/không gọi lại rules và đổi chọn tính mới PASS.16/16 test hint/stability/trial/computer PASS; typecheck/build PASS. Không đổi geometry/luật/animation. Chưa đo frame browser, chưa xác nhận hết vấn đề toàn ứng dụng; cần reload tab để nạp dist mới.

- 2026-10-15: Đồng bộ Gợi ý Pikafish700ms cho mọi bàn thử replay/tùy chỉnh; bỏ nút riêng trong ván thường. Lùi đổi từng1 nước, phím/nút dùng chung; test lùi2→1→0 PASS.9/9 test trial/hint/stability PASS, typecheck/build PASS; dist index-B6dBIPkw.js đã kiểm tra. Chưa QA browser/engine thật.

- 2026-10-15: Đổi tên máy hiển thị Pikafish→Ông Hoàng trên thiết lập/bàn chơi/thông báo/tooltips và lỗi API; giữ engine ID/path/license, nhận diện máy So tài tương thích tên cũ/mới.23/23 test computer/hint/trial/Pikafish PASS; typecheck/build PASS, dist index-Dc7XnMPb.js có tên mới. Chưa QA browser.

- 2026-10-15: Chat trong bàn chơi tăng gap dọc từng tin6→12px. Typecheck/build PASS, dist CSS đã có gap12px; chưa QA browser.

- 2026-10-15: Thay avatar máy bằng ảnh6626838d, clip tròn theo khung; dùng helper/source chung cả bàn chơi, Thế cờ, hồ sơ, chat/Tin nhắn và thiết lập máy desktop. Không đổi geometry avatar/khung. Nguồn upload giữ tại references/uploads. Typecheck/build PASS, dist có ong-hoang-avatar; đã xem ảnh nguồn, chưa browser QA.

- 2026-10-15: Theo yêu cầu mới, avatar máy dùng chân dung GIỮA ảnhc876e59c-c77c-411e-a467-31b5f5b4df21. Runtime ong-hoang-avatar-v2.svg nhúng nguyên pixel nguồn, clip circle(cx1086,cy348,r288), viewBox79860 576576 bỏ vòng vàng nguồn, ngoài tròn trong suốt; không vẽ lại ảnh. Máy chỉ giữ avatar và tên Ông Hoàng: bỏ overlay khung/danh hiệu/sao, khung tên/ELO và trang trí kết quả trên PlayerCard; hồ sơ/chat bỏ khung/huy hiệu máy; thiết lập bỏ khung biển tên. Dùng helper chung cho mọi avatar máy, gồm tên cũ. Quyền sửa này chỉ cho ảnh/trang trí máy, avatar người thật vẫn khóa. Nguồn giữ references/uploads. Typecheck/build PASS; chưa browser QA.

- 2026-10-15: Giữ trọn hình giữa c876e59c, gồm vòng vàng gốc; bỏ circle clip, dùng object-contain đúng kích thước avatar cũ. Khôi phục khung tên Ông Hoàng trên bàn và thiết lập. Bbox pixel alpha kiểm tra698×694; typecheck/build PASS, dist có avatar-v3. Chưa browser QA.

- 2026-10-15: Chốt căn máy: thẻ tên Ông Hoàng dùng cùng margin/translate/breakpoint với thẻ tên người chơi, giữ ngang hàng thay margin riêng mt2. Avatar máy phóng theo đường kính HIỂN THỊ của viền mặc định (156/128×0.896=1.092), giữ nguyên ảnh nguồn và ô anchor. AVATAR_FRAME_VISIBLE_SCALE dùng chung PlayerCard/chat/hồ sơ, không đổi avatar/khung người thật. Không thêm danh hiệu/sao/ELO lại cho máy. Typecheck/build PASS, chưa browser QA.

- 2026-10-15: Sửa chữ trong thẻ tên bị cắt dấu/nét do truncate kết hợp line-height1: PlayerNameplate đặt line-height1.4 riêng vùng chữ, giữ khung/kích thước/font/vị trí. Component chung áp dụng Home và mọi PlayerCard, gồm Ông Hoàng. Typecheck/build PASS, chưa browser QA.

- 2026-10-15: Máy không mở bảng thông tin/hồ sơ. Avatar máy ở PlayerCard disabled nhưng giữ độ sáng100%, không pointer/context menu phong danh hiệu. Chặn tên máy tại điểm mở Profile của Game/Home/Chọn Bàn, bao gồm đường chat/Tin nhắn/lịch sử. Người thật giữ luồng cũ. Typecheck/build PASS, dist index-DS34NNzo.js xác nhận; chưa browser QA.

- 2026-10-15: Ẩn Lưu/Ghim/mã phòng/view/chat cho ván đấu máy thông thường; tắt hook chat/lưu trong mode này.2/2 regression UI mới Cờ Tướng/Cờ Úp PASS (20 test khác không chạy), typecheck/build PASS; dist index-CpLM637d.js đã kiểm tra. Chưa browser QA.

- 2026-10-15: Giảm tải sau báo kém mượt: thay SVGv3 nhúng cả sheet avatar3.023.811 byte/2172×724 bằng PNG crop đúng bbox698×694/1.117.868 byte; kiểm tra484.412 pixel ARGB giống nguồn100%, giữ toàn bộ hình/viền gốc. Runtime import ong-hoang-avatar-full.png, ảnh nguồn vẫn giữ. useReplayTrial.select useCallback theo state thực để Board memo không render lại do UI khác; regression giữ callback/moves khi rerender PASS. GamePage memo kiểm tra chiếu theo board/turn/phase; useGame bỏ kiểm tra chiếu dư chỉ để trả status rỗng khi playing, giữ status kết quả.16/16 test hint/trial/animation/computer PASS; typecheck/build PASS. Đã xem PNG xuất, chưa đo FPS trên browser, không khẳng định hết mọi khựng.

- 2026-10-15: Ông Hoàng có danh hiệu riêng Kỳ Thủ AI và họa tiết sao riêng từ ảnh205ea2ea; thay quy tắc bỏ toàn bộ danh hiệu/sao máy trước đó. AvatarRankBadge/RankTitleBadge thêm prop computer, tái dùng vị trí/tỷ lệ slot và hàng sao chung, chỉ PlayerCard máy bật. Asset PNG title1168×383 tại(34,154), stars853×199 tại(1270,242), trim alpha<=16 loại nhiễu vô hình, corners alpha0; nguồn giữ references/uploads. Giữ avatar/khung tên/khóa hồ sơ máy. Typecheck/build PASS, đã xem2 crop và xác nhận dist, chưa browser QA.

- 2026-10-15: Màn Chơi với máy dùng PlayerNameplate chung cho Ông Hoàng thay khung chữ CSS cũ, desktop/compact cùng thẻ tên width250px. Desktop giữ slot top171/h53/w330 và căn giữa; avatar/cấp/phe/hành vi giữ nguyên. Typecheck/build PASS, dist index-wVJBr8a_.js có width250; chưa browser QA.

- 2026-10-15: Vị trí tùy chỉnh: kéo lấy quân từ khay tự chọn khay bên đó và loại quân đó (chooseForDrag không toggle). PositionPalette đồng bộ activeSide theo piece. Thả hợp lệ giữ chọn nếu loại đó còn trong khay, hết số lượng bỏ chọn/khóa như trước. Kéo quân trên bàn ra ngoài trả khay thì chọn đúng bên/loại vừa lấy xuống. Hover/click/phím tắt, kiểm tra đặt sai và hủy kéo giữ quy tắc hiện tại.10/10 test editor gồm đổi khay/aria-pressed/giữ chọn/hết quân PASS; typecheck/build PASS, chưa browser QA.

- 2026-10-15: Màn Vị trí tùy chỉnh bỏ nút Lưu thế cờ ở thanh tiện ích theo yêu cầu; giữ Tạo từ ảnh, Âm thanh và Toàn màn hình. Typecheck/build PASS, dist đã cập nhật; chưa QA browser.

- 2026-10-15: Chuột phải lấy quân trong Vị trí tùy chỉnh tự chọn đúng khay bên/loại quân vừa lấy, đồng bộ với kéo quân ra ngoài. 11/11 regression position-editor PASS; typecheck/build PASS, dist cập nhật; chưa QA browser.

- 2026-10-15: Header Chơi với máy bỏ Thành tích, đổi thành Âm thanh bên trái và Toàn màn hình bên phải (desktop/compact). Fullscreen API bật/tắt dùng dialog báo lỗi hiện có. Typecheck/build PASS, dist index-DjscL8db.js cập nhật; chưa QA browser.

- 2026-10-15: Click quân trong khay vào vị trí không hợp lệ giờ chỉ báo lỗi và giữ lựa chọn để thử điểm khác. 11/11 regression position-editor PASS; typecheck/build PASS, dist index-BPxj-ZHo.js cập nhật; chưa QA browser.

- 2026-10-15: Header Chọn Bàn thêm nút Toàn màn hình cuối cụm tiện ích, dùng chung Home fullscreen handler; thứ tự Cúp/Bạn bè/Âm thanh/Toàn màn hình. Typecheck/build PASS, dist index-wIAqh5PP.js cập nhật; chưa QA browser.

- 2026-10-15: Tạo bàn tái dùng khung tỉnh/thành, thay nút Hủy/Tạo và ô thời gian bằng crop nguồn10f8e709/6ff86838; thêm switch Bàn khóa, ô mật khẩu và nút xem/ẩn. Theo xác nhận chỉ UI xem trước, chưa khóa server. Typecheck/build PASS; dist index-gBlcJ7MY.js có3 asset mới. Đã xem crop nút, kiểm tra bbox/corner alpha; chưa QA browser.

- 2026-10-15: Sửa select thời gian bị ảnh khung che bằng relative z10; password focus giữ artwork, bỏ ring, autocomplete off/text-security che ký tự và nút xem-ẩn giữ input text; Hủy/Tạo hover opacity90%. Typecheck/build PASS, dist index-Cfc2IKcG.js đã kiểm tra lớp thời gian/mask/hover; chưa browser QA hoặc kiểm chứng trình quản lý mật khẩu của trình duyệt.

- 2026-10-15: Bỏ outline/ring focus toàn project theo yêu cầu qua body Tailwind; công tắc Bàn khóa nhỏ80%/tắt tối50%; mật khẩu hiện rõ, bỏ mask/con mắt. Typecheck/build PASS, dist index-CevrN0M7.js/index-CB7a1c4s.css cập nhật; chưa browser QA.

- 2026-10-15: Hủy/Tạo bàn hover phủ vàng nhẹ10% mask theo artwork; công tắc khóa bàn off dùng nền nâu/núm kem nâu rõ và hover vàng, bỏ dim filter khiến giống disabled. Typecheck/build PASS, dist index-D_nXBzMz.js đã kiểm tra; chưa browser QA.

- 2026-10-15: Tạo bàn hover vàng nhạt tăng10→30%; Hủy giữ10%. Không khóa thì nhãn/ô thời gian lên11% chiều cao form, có mật khẩu trở lại vị trí cũ. Hai nút Hủy/Tạo giữ nguyên. Typecheck/build PASS, dist index-DWj8LjlY.js đã kiểm tra; chưa browser QA.

- 2026-10-15: Nhạc nền thay bằng3 MP3 mới theo thứ tự155926→247345→618302→lặp, chờ4s giữa bài; tắt nhạc hủy timer, bật lại sau ended chờ4s. Bỏ runtime background-music.mp4 cũ, giữ nguồn archive/âm thanh đi quân. Regression playlist/thời gian/chuyển màn1/1 PASS; typecheck/build PASS, dist index-CeQgzWpB.js có3 MP3 mới và không có nhạc cũ. Chưa nghe thử trên trình duyệt/loa thật.

- 2026-10-15: Sẵn sàng online: ribbon z110 trên avatar/kết quả, chỉ hiện phase ready; nút ẩn sau ready không chữ chờ. Có người xếp hàng: cặp đang ngồi chưa ready chờ10s rồi countdown20→0 tự bắt đầu; một người ready đếm ngầm30s từ lần bấm, người kia quá hạn ghi thua not-ready/xuống khán giả không queued, đầu hàng lên đúng ghế. Không queue không ép/phạt; giữ đổi người thua sau ván hiện hành. Snapshot/server tick quản lý countdown; reset không vượt mốc.27/27 readiness/time/HTTP-Socket/challenge PASS; rooms cũ17/24 PASS,7 lỗi tồn tại (6 chuỗi mojibake,1 kỳ vọng chặn khán giả). Typecheck/build PASS, dist index-BcF0AOoS.js xác nhận countdown/ribbon; chưa browser QA. Docs ROOM-READINESS.md.

- 2026-10-15: Theo đính chính, bỏ xử thua/not-ready khi chậm Sẵn sàng30s; chỉ chuyển xuống khán giả/đổi ghế, không tạo kết quả hoặc archive mới, giữ archive ván thật trước. Regression thêm bảo toàn archive;28/28 readiness/time/HTTP-Socket/challenge PASS. Typecheck/build PASS, dist index-D3tkSJDu.js xác nhận bỏ reason/giữ countdown; chưa browser QA.

- 2026-10-15: Bật XEM THỬ TẠM bàn mẫu Chọn Bàn: vào phase ready, countdown20 ngay rồi hai máy bắt đầu; hook riêng hủy timer khi rời, không online/replay/trial.1/1 regression countdown/start/unmount PASS, typecheck/build PASS; dist index-BozWwrnx.js cập nhật. Không có browser kết nối (IAB không khả dụng), chưa trực tiếp mở/QA giao diện. Người dùng mở Chọn Bàn→bàn mẫu để xem.

- 2026-10-15: Nối Bàn khóa thật: create password1–64, server scrypt/salt kiểm tra join ghế/viewer, Repository giữ hash riêng và xóa cùng phòng, không phát secret. Chọn Bàn thêm lọc Bàn khóa phải Còn trống theo khu vực; RoomPasswordDialog dùng chung Chọn Bàn/LobbyDialog, lỗi giữ bảng/sửa lại; Chơi nhanh bỏ khóa, challenge không bypass và không rời phòng cũ trước kiểm tra.19/19 locked service/UI/HTTP-Socket/quick/challenge/server PASS; typecheck/build PASS, dist index-DF0fjbrG.js xác nhận tab/dialog. Chưa browser QA. Docs ROOM-LOCKS.md, thay bản chỉ UI trước.

- 2026-10-15: Countdown Board đen/cỡ72×scale (tăng50%), bỏ shadow chữ; dùng chung online/preview. Typecheck/build PASS, dist index-DU6X5QJn.js kiểm tra màu/cỡ; chưa browser QA.

- 2026-10-15: Thay artwork bàn locked=true bằng65c16869, crop alpha107,140,1041,964/góc0; runtime room-selection/table-board-locked.png, nguồn references/uploads. RoomTableGrid áp dụng mọi tab, giữ tỷ lệ bằng object-contain/slot chung. Đã xem ảnh crop; typecheck/build PASS, dist index-CSX53sHH.js có asset mới; chưa browser QA.

- 2026-10-15: Dựng lại RankingViewButton ôm asset/sát góc alpha, bỏ shadow chữ nhật; useRankingWatch chỉ bật nút top có phòng thật playing, poll khi dialog mở và kiểm tra lại lúc click. Vào bằng asViewer=true, server chặn ván chưa/hết đấu, khóa vẫn hỏi mật khẩu qua RoomPasswordDialog props chung; Home/Chọn Bàn bỏ toast cũ.13/13 ranking DOM/hook/locked/server/HTTP-Socket PASS; typecheck/build PASS, dist index-BjBBwG6e.js xác nhận. Top/ELO còn fixture theo tên, chưa browser QA; docs RANKING-WATCH.md.

- 2026-10-15: Bật1 nút Vào xem mẫu tạm ởtop1 khi chưa có trận thật; click thông báo mẫu, không socket. Có trận thật vẫn vào xem. Thanh cuộn Xếp hạng chỉ thumb nâu vàng/hover nâu đậm, track/corner trong suốt, bỏ nút cuộn native. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-15: Thanh kéo Xếp hạng trắng#fff, giữ track/corner trong suốt. Bạn bè ẩn nút Mời chơi của offline, chỉ hiện khi presenceonline; giữ Nhắn tin và bố cục. Typecheck/build PASS, dist index-RiGjfF6E.js cập nhật; chưa browser QA.

- 2026-10-16: Căn icon Đổi bên Vị trí tùy chỉnh giữa dọc hàng Đỏ/Đen: bỏ translate-2px, dùng SVG đối xứng20px trong vòng32px thay glyph lệch baseline. Typecheck/build PASS, dist index-Dlnsah7i.js xác nhận SVG; chưa browser QA.

- 2026-10-16: Đã lưu bảng quyền Guest/đã liên kết và phạm vi thiết kế vào docs/ACCOUNT-MODEL.md; đồng bộ AGENTS.md/PROJECT-MEMORY.md. Chưa code, chưa tạo DB hoặc duyệt schema. Không thay giới hạn từng mode. Kiểm chứng tài liệu và build được thực hiện trong nhiệm vụ này.
- Kiểm chứng: bảng ACCOUNT-MODEL đủ 16 mục theo yêu cầu; npm.cmd run build từ board-game PASS (typecheck + Vite), dist/index.html trỏ index-Dlnsah7i.js. Chỉ thay tài liệu; không thay code hoặc tạo database.

- 2026-10-16: Bút đổi tên hồ sơ: Guest không có; đăng nhập Google/đã liên kết và chưa đổi tên thành công mới hiện bút vàng ở cuối dòng tên như bút địa chỉ trong ảnh người dùng. Đổi tên thành công thì ẩn bút; hủy/lỗi vẫn giữ. Trạng thái theo tài khoản, giữ qua đăng nhập lại/đổi thiết bị. Chưa có quy tắc cấp lại quyền. Chỉ lưu thiết kế tại docs/ACCOUNT-MODEL.md, chưa code/UI/database.
- Kiểm chứng nhiệm vụ bút đổi tên: chỉ cập nhật tài liệu; npm.cmd run build (typecheck + Vite) PASS, dist/index.html vẫn tham chiếu index-Dlnsah7i.js; chưa triển khai UI/database.

- 2026-10-16: Tạo LoginPage/EntryGate, artwork imagegen alpha trim1202×1307, nền Home chung. Lần đầu chọn đăng nhập, chơi khách lưu co-tuong-entry-v1 và lần sau vào Home; không giả lập Google OAuth. Không DB, không đổi App/game UI. 4/4 entry regression PASS; typecheck/build PASS, dist index-BOAZed-V.js có key entry và login-panel-TqdqErsY.png. Mở rộng UI suite: 2/22 PASS,20 FAIL (có lỗi mock HTMLMediaElement.play trả undefined tại useHomeMusic và kỳ vọng UI cũ); chưa sửa ngoài phạm vi. Không có browser kết nối/IAB unavailable nên chưa browser QA desktop/compact; đã xem artwork và kiểm tra bbox/corners alpha0.

- 2026-10-16: Guest tự sinh Kỳ thủ +6 số random (giữ số0 đầu), lưu/khôi phục tên cùng entry; nâng cấp entry cũ thiếu tên một lần. Ngoại lệ mẫu tên khách trong validator dùng chung client/server, không đổi giới hạn tên khác hoặc UI.22/22 entry/locked-room/challenge regression PASS gồm restore session/vào online; typecheck/build PASS, xác nhận dist có mẫu tên/padStart6. Không DB, chưa browser QA.

- 2026-10-16: Nâng riêng cảnh báo khách lên1.5% chiều cao khung đăng nhập (top82.8%) theo ảnh người dùng. Typecheck/build PASS, đã xác nhận CSS82.8% trong dist; chưa browser QA vì không có browser khả dụng. Không thay font/nút hoặc luồng đăng nhập.

- 2026-10-16: Số trong tên PlayerNameplate chuyển sang NumberText compact90%/font-number/lining/tabular, cùng baseline và giữ độ sáng; đồng bộ Home/PlayerCard/thiết lập. Không đổi hình học/avatar/khung. Typecheck/build PASS, dist đã cập nhật; chưa browser QA do browser unavailable.

- 2026-10-16: Theo quyền sửa typography Bạn bè trong yêu cầu, chữ tên/trạng thái/tìm kiếm dùng font-heading; tên semibold bỏ stroke, số dùng NumberText medium90% cùng baseline. Đồng bộ mọi tab qua component chung/cả2 input; giữ hình học/avatar/UI khác và khóa lại phạm vi. Typecheck/build PASS, dist cập nhật; chưa browser QA do không có browser khả dụng.

- 2026-10-16: Nút Thoát hồ sơ mình thành Đăng xuất, xác nhận native dialog Hủy/Đồng ý; logout về LoginPage, ngắt socket/reset ván, giữ tên khách/bản lưu và marker signedOut qua reload. Người khác giữ Thoát.9/9 entry/profile logout regression PASS gồm hủy/xác nhận/giữ identity-dữ liệu; typecheck/build PASS, xác nhận dist có signedOut/xác nhận. Không DB/OAuth; chưa browser QA.

- 2026-10-16: Tăng nhẹ độ đậm tên/số/trạng thái Bạn bè qua component chung (bold/semibold/semibold), giữ font/cỡ/spacing/avatar. Typecheck/build PASS, dist cập nhật/xác nhận weight semibold. Chưa browser QA.

- 2026-10-16: Cân độ đậm tên Bạn bè: chữ extrabold/stroke0.2px, số normal/reset stroke0; trạng thái bold. Giữ font/cỡ/baseline/layout. Typecheck/build PASS, dist xác nhận stroke0.2px; chưa browser QA.

- 2026-10-16: Số trong tên Bạn bè tăng nhẹ stroke0.1px; Xếp hạng áp dụng typography tên/trạng thái cùng chuẩn qua SocialPlayerName/socialPresenceTextClass. Giữ font-size/baseline/hình học/avatar/các chỉ số và khóa lại phạm vi. Kiểm chứng ranking-view và typecheck/build trong nhiệm vụ; dist đã xác nhận CSS0.1px. Chưa browser QA.

- 2026-10-16: Tăng riêng stroke số SocialPlayerName0.1→0.2px theo yêu cầu, đồng bộ Bạn bè/Xếp hạng; không đổi chữ/layout. Typecheck/build PASS, dist cập nhật/xác nhận stroke0.2px. Chưa browser QA.

- 2026-10-16: Sửa tên bị khuất nét bằng line-box1.4 trong SocialPlayerName; slot tên24px flex center không clip dọc ở Bạn bè/Xếp hạng, giữ row/avatar/độ đậm. Typecheck/build PASS, dist xác nhận line-box mới; chưa browser QA.

- 2026-10-16: Lưu thiết kế ghép đấu theo cấp/sao tại docs/MATCHMAKING.md, đồng bộ AGENTS/PROJECT-MEMORY/RANK-SYSTEM. Chỉ sửa tài liệu, chưa DB/code/UI; chưa chốt cách tính qua ranh giới bậc/sao trần. Typecheck/build PASS, dist index-CZR8PMJ7.js xác nhận vẫn bản code hiện hành.

- 2026-10-16: Ghi bảng ELO thắng/thua theo chênh sao vào MATCHMAKING.md, đồng bộ quy tắc ở AGENTS/PROJECT-MEMORY/RANK-SYSTEM. Chỉ tài liệu, chưa tính/lưu ELO thật hoặc DB. Đã đối chiếu7 dòng theo yêu cầu; typecheck/build PASS, dist vẫn index-CZR8PMJ7.js.

- 2026-10-16: Chốt cách tính sao liên tục qua bậc cho matchmaking/ELO, cập nhật MATCHMAKING và ghi nhớ; thay phần chưa chốt ranh giới bậc. Chỉ tài liệu, bảng điểm/code/DB giữ nguyên. Đối chiếu ví dụ+/-1/2/3; typecheck/build PASS, dist vẫn index-CZR8PMJ7.js.

- 2026-10-16: Kỳ Thánh tiếp tục tăng sao ở2900/3000, trần Kỳ Thánh3 sao; ELO thật không clamp. getRankProgress chung và tài liệu đồng bộ.7/7 regression mốc2799/2800/2899/2900/2999/3000/5000 PASS; typecheck/build PASS, dist đã cập nhật; không đổi UI hình học/tính điểm sau trận/DB.

- 2026-10-16: Số tên Bạn bè/Xếp hạng đậm100% và stroke0.3px theo yêu cầu, SocialPlayerName chung giữ nguyên phần chữ/cỡ/căn chỉnh. Typecheck/build PASS; dist xác nhận CSS0.3px, chưa browser QA.

- 2026-10-16: Thêm backlog/system/ENERGY-PACKAGES.md, liên kết mục Ưu tiên cao/Cần làm sớm: video+1,19k/50,40k/vô hạn1 tháng. Chỉ tài liệu, chưa UI/code/DB/thanh toán. Đã đối chiếu đủ3 gói; typecheck/build PASS, dist vẫn index-J1egBHZ1.js.

- 2026-10-16: Thêm mysql2^3.24.6, pool backend lazy/env validation (chặn root), db:check SELECT1, .env.example và ignore env, test/docs kết nối.4/4 mysql-pool/server test PASS; typecheck/build PASS, dist index-J1egBHZ1.js và không có mysql2/DB_PASSWORD frontend. Production dependency audit0 lỗi. db:check ngoài sandbox chạy đúng và exit1 do chưa có .env; chưa xác nhận MySQL thật, không yêu cầu/đọc mật khẩu. Sandbox tsx os.userInfo bị chặn, không sửa dependency. Chưa users/tables/migration/game logic. Chờ người dùng điền .env và xác nhận kết nối.

- Kiểm chứng tích hợp cuối:6/6 API/socket/MySQL8.0.45 tạm PASS, gồm disconnect/no-start history, draw/replay và energy trên5; DB thật check/verify/smoke PASS, migrate rerun0. Build PASS, dist index-CdiyPx17.js; chưa browser QA.

- Full suite cuối --maxWorkers=4:236 PASS/52 FAIL/6 SKIP,8 file lỗi baseline không tăng;6 integration skip trong suite đã chạy riêng PASS. Build cuối PASS.
- 2026-10-16: Login giữ nút vàng của artwork; nút Google SDK chuyển vào dialog dùng chung (link=false), không chồng nút trắng trên artwork. Giữ GIS popup/nonce/backend verification. Typecheck/build PASS; chưa browser QA/popup thật.
- 2026-10-16: Theo yêu cầu hoàn tác nút login tùy chỉnh/dialog vừa thử; giữ nút Google GIS trực tiếp như trước. Thay ghi chú thử dialog trước đó. Không đổi auth/backend hoặc artwork.
- 2026-10-16: Theo yêu cầu bỏ lớp nút vàng dưới Google, LoginPage dùng login-panel-google.png: imagegen xóa khung kem/vàng, chỉ ghép vùng (190,610,830,185) vào ảnh gốc để giữ nguyên pixel ngoài vùng. Nút GIS trắng giữ nguyên trực tiếp; không đổi auth/geometry. Đã xem asset; chưa browser QA.
- Kiểm chứng bỏ lớp nút dưới: typecheck/build PASS, dist có login-panel-google-DEQEDoua.png; giữ alpha/bbox ngoài vùng sửa nguyên ảnh gốc. Chưa browser QA.
- 2026-10-16: Khi Google đã gắn với tài khoản khác, thông báo trong hộp Liên kết chỉ còn “Google này đã thuộc tài khoản khác.” Không đổi xử lý409/không merge hoặc auth.
- 2026-10-16: Trong hồ sơ chính mình, chữ “Chưa có danh hiệu” tăng18→24px; giữ nguyên căn giữa, màu và khung.
- 2026-10-16: Tên Guest hiển thị mới dùng “Kỳ thủ” + 5 số random; guest_code nội bộ DB vẫn 6 số để giữ unique/schema. Guest cũ 6 số vẫn được validate để tương thích, tên tự sinh cũ trong DB chỉ đổi display_name/search_name, không xóa hồ sơ/dữ liệu. Cách vào trên thiết bị mới (tự vào Guest hay hiện màn chọn) đang chờ người dùng làm rõ.
- Kiểm chứng tên Guest: build/typecheck PASS; đổi tên đúng1 Guest chưa liên kết trong MySQL, không xóa hàng/dữ liệu; hậu kiểm tên 5 số và mẫu cũ 6 số. Chưa quyết định tự vào Guest hay tiếp tục hiện màn chọn trên thiết bị mới.
- 2026-10-16 (đính chính): Tên hiển thị Guest mới phải là “Guest” + 5 chữ số random (ví dụ Guest04217), không phải “Kỳ thủ”. guest_code nội bộ vẫn 6 số; tên cũ vẫn được validate tương thích. Đã đổi lại tên Guest cũ trong DB từ Kỳ thủxxxxx sang Guestxxxxx, giữ toàn bộ dữ liệu.
- Kiểm chứng đính chính tên Guest: MySQL xác nhận bản ghi đã đổi sang Guest + 5 số; build/typecheck PASS, dist cập nhật.
- 2026-10-16: Người dùng mở khóa riêng avatar/khung avatar trong danh sách Xếp hạng cho task này. Ranking API trả avatarCode/avatarFrameCode từ users; hàng dùng AvatarPortrait/AvatarFrameOverlay/getAvatarFrame chung với hồ sơ. Danh hiệu/sao tiếp tục derive Elo thật riêng variant. Giữ slot84px và bố cục, khóa lại avatar/khung Xếp hạng sau task.
- Kiểm chứng Xếp hạng identity: regression ranking-view hiện có1/1 PASS; typecheck/build PASS, dist index-D2AEbtVh.js cập nhật. Chưa browser QA với hồ sơ chọn avatar/khung khác mặc định. Không sửa được test mới do quyền ghi file test, nên không tuyên bố đã có regression riêng cho avatar.
- 2026-10-16: Theo yêu cầu sửa riêng ô tìm kiếm Bạn bè: cả Danh sách/Thêm bạn dùng lining-nums/tabular-nums để số thẳng hàng; dữ liệu Friend giữ publicId và bộ lọc chung khớp tên hoặc ID công khai chính xác. API search đã hỗ trợ ID; sửa client không loại kết quả ID vì tên khác query. Giữ layout/avatar; khóa lại phạm vi ô tìm kiếm sau task.
- Kiểm chứng tìm kiếm Bạn bè: typecheck/build PASS; dist index-CKNWmitG.js có bộ lọc publicId và kiểu số lining/tabular ở cả2 ô. Chưa browser QA, chưa test tự động riêng cho tìm ID.
- 2026-10-16: Người dùng mở riêng vị trí cụm avatar/khung/danh hiệu/sao Xếp hạng để hạ2px CSS; không dịch tên/hạng/hàng. Bạn bè mở riêng nguồn avatar/khung thật trên mọi tab: API social/search trả avatarCode/avatarFrameCode; AccountAvatar dùng chung Xếp hạng/Bạn bè tái sử dụng portrait/frame hồ sơ. Giữ slot76px/84px, danh hiệu/sao Bạn bè và layout khác. Khóa lại các phạm vi avatar sau task.
- Kiểm chứng avatar Bạn bè/hạ cụm Xếp hạng: regression ranking-view1/1 PASS; typecheck/build PASS, dist cập nhật. Chưa browser QA với từng avatar/khung và mọi tab Bạn bè.
- 2026-10-16: Theo yêu cầu căn giữa cụm Xếp hạng theo chiều dọc hàng: slot cụm124px theo scale, anchor top6px theo scale, thay slot132px/top5px+2px cũ. Giữ avatar84px và tỷ lệ danh hiệu/sao, tên/hạng/bố cục khác. Phạm vi vị trí cụm mở riêng cho task, sau đó khóa lại.
- Kiểm chứng căn cụm Xếp hạng: typecheck/build PASS, dist index-CaRXnOXH.js cập nhật; chưa browser QA.
- 2026-10-16: Sửa sót Home.openHistoryPlayerProfile: mở chính mình từ Xếp hạng/Bạn bè/Lịch sử/Tin nhắn luôn dùng dialog hồ sơ chung, không chuyển sang dialog tài khoản Home. ProfileDialog mặc định accountActions=false; chỉ dialog mở trực tiếp từ avatar/header Home truyền accountActions=true. Các nơi khác chỉ Thoát. Giữ nhận diện own và UI khác.
- Kiểm chứng sửa nguồn mở hồ sơ:2/2 profile-logout PASS với maxWorkers1; typecheck/build PASS, dist index-CsIG_k7w.js xác nhận. Chưa browser QA đường Xếp hạng/Home.
- 2026-10-16: Theo yêu cầu tăng nhẹ khung thông tin hồ sơ: PlayerInfoCard cao thêm16px theo scale, giữ mép trên và mở rộng xuống; gap dòng6→10px. Đồng bộ hồ sơ mình/người khác/preview tùy chỉnh bằng component chung. Không đổi avatar hoặc khung avatar.
- Kiểm chứng khung thông tin: typecheck/build PASS; dist index-C2QVB6xB.js cập nhật. Chưa browser QA khoảng cách trên desktop/compact.
- 2026-10-16: Người dùng yêu cầu hoàn tác lần tăng chiều cao khung thông tin và giãn dòng; PlayerInfoCard trở về gap-y-1.5 và chiều cao hồ sơ/preview ban đầu. Không giữ lại biến thể đó.
- Kiểm chứng hoàn tác khung thông tin: typecheck/build PASS, dist khôi phục index-CsIG_k7w.js.
- 2026-10-16: Catalog Danh hiệu: Tất cả chỉ hiển thị danh hiệu thực sự sở hữu từ DB, người mới rỗng; các tab nhóm vẫn xem được catalog, danh hiệu chưa sở hữu hiện khóa thay dấu cộng và không chọn được. Ba nhóm Chuỗi/Tổng ván/Online theo ownership thật, chỉ mở khi server cấp. Không dùng danh hiệu mẫu để tự mở khóa.
- 2026-10-16: Khôi phục nút cộng trong catalog Danh Hiệu Phong Tặng; chưa sở hữu vẫn không được chọn vào hồ sơ (nút disabled theo ownership), không thay bằng icon khóa trong nhóm này. Ba nhóm cuối giữ khóa; Tất cả vẫn chỉ gồm danh hiệu sở hữu.
- 2026-10-16 (đính chính catalog): Tất cả/Vinh Quang Kỳ Đài/Danh Hiệu Phong Tặng chỉ hiện ownership DB thật, chưa sở hữu thì ẩn. Ba nhóm cuối vẫn hiện danh hiệu chưa đạt với artwork brightness35% và ổ khóa GIỮA thẻ, không khóa ở góc dấu cộng; danh hiệu sở hữu có nút cộng. Giữ xem chi tiết điều kiện khi bấm thẻ khóa.
- 2026-10-16: Sửa ô nhập chat phòng nhảy lên đầu khi chưa có tin nhắn do log hidden mất flex spacer. Chat form mt-auto luôn neo đáy khung ở expanded/collapsed desktop/compact; giữ picker phía trên và toggle. Không đổi gửi/nhận tin.
- 2026-10-16: Theo yêu cầu mở nguồn avatar/khung thật cho chat bàn và Tin nhắn: MessageAccountAvatar dùng AccountAvatar chung, session cho chính mình và Query search cho người khác; cache theo tên30s. Áp dụng chat bàn, danh sách hội thoại trực tiếp, header, avatar tin nhận và popup tùy chọn. Giữ kích thước/vị trí, ảnh nhóm và máy riêng; không thêm danh hiệu vào chat.
- Kiểm chứng avatar chat/Tin nhắn: typecheck/build PASS; dist có MessageAccountAvatar dùng Query và AccountAvatar thật, bao gồm thành viên popup nhóm. Chưa browser QA với các tài khoản chọn ảnh/khung khác nhau. Giữ kích thước/vị trí avatar, khóa lại phạm vi sau task.
- 2026-10-16: Tên trong Tin nhắn dùng SocialPlayerName của Bạn bè làm chuẩn: font-heading/extrabold, stroke chữ0.2px, số font-number90%/normal/opacity100%/stroke0.3px/cùng baseline. Đồng bộ danh sách/header/tùy chọn/thành viên/chọn người tạo nhóm; giữ cỡ theo ngữ cảnh/màu/layout/avatar.
- Kiểm chứng typography Tin nhắn: typecheck/build PASS, dist cập nhật. Chưa browser QA.
- 2026-10-16: View bàn chơi: bộ đếm tiếp tục từ room.viewers server; danh sách khán giả/xếp hàng bỏ avatar/khung mẫu, dùng MessageAccountAvatar truy xuất tài khoản thật và SocialPlayerName chung Bạn bè. Giữ slot/kích thước/nút queue và dữ liệu hàng từ snapshot.
- Kiểm chứng view bàn: typecheck/build PASS, dist cập nhật; chưa browser QA với nhiều khán giả/xếp hàng.
- 2026-10-16: Theo yêu cầu áp dụng avatar/khung thật trong Lịch sử: Player chung Đã chơi/Đã lưu và avatar hai người ở Thế cờ dùng MessageAccountAvatar/AccountAvatar. Giữ slot51px/34px, tên/kết quả/bố cục và ảnh máy riêng. Phạm vi nguồn avatar mở riêng task, khóa lại sau task.
- Kiểm chứng avatar Lịch sử: typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-16 (đính chính view): bộ đếm mắt ở bàn online tính tổng người đang có trong phòng = players + viewers theo ID socket duy nhất; người tạo/ngồi một mình phải hiện1. Không phải chỉ đếm khán giả. Panel khán giả/queue vẫn chỉ liệt kê viewers, không thay luật ghế/hàng chờ.
- Kiểm chứng bộ đếm tổng người: typecheck/build PASS, dist cập nhật. Chưa browser QA đa client.
- 2026-10-16: Bàn online chưa đủ2 ghế có người thì ẩn nút Sẵn sàng. Lưu thế cờ chỉ khả dụng sau ít nhất1 nửa-nước (match.moveCount>0), disabled nút và guard callback khi0; áp dụng GamePage chung online/local/replay/trial. Không đổi đồng hồ/ready server.
- Kiểm chứng Sẵn sàng/Lưu thế: typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-16: Theo yêu cầu mới, panel người trong phòng hiển thị cả người đang ngồi chơi và khán giả/xếp hàng, khớp tổng bộ đếm mắt. Ghép players chỉ id/name, không dùng ready làm queued để tránh người ngồi bị hiện thẻ chờ. Avatar/khung thật tiếp tục qua component chung; queue controls chỉ dành cho viewers.
- Kiểm chứng thẻ người ngồi trong panel: typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-16: Theo yêu cầu tăng riêng avatar/tên thẻ người trong phòng: ô avatar28→36px, tên14→16px, thẻ40→52px đồng bộ watching/waiting. Bỏ filter drop-shadow trên cả thẻ và bóng chữ để tránh raster hóa/làm nhòe chữ/ảnh; giữ avatar/khung nguồn thật và vị trí panel. Phạm vi này mở riêng task, khóa lại sau task.
- Kiểm chứng thẻ người trong phòng: typecheck/build PASS, dist cập nhật. Chưa browser QA độ nét thực tế.
- 2026-10-16: Tiếp tục giảm nhòe panel người trong phòng: bỏ stroke chữ/số riêng tên kích thước16px; bỏ transform translateY10px của parent, thay tọa độ top/bottom tương đương để giữ vị trí và tránh composite lớp chữ/ảnh. Không đổi typography Bạn bè hoặc các panel khác.
- Kiểm chứng giảm nhòe panel: typecheck/build PASS, dist cập nhật; chưa browser QA nên chưa khẳng định mức nét thực tế.
- 2026-10-16: Kết thúc xem thử bàn mẫu Chọn Bàn theo yêu cầu dữ liệu thật. RoomTableGrid chỉ dùng rooms API đã lọc khu vực/trạng thái, bỏ22 previewRooms và đường vào demo. Không có phòng hiện rỗng, không giả người/bàn; Tạo/vào/khóa/ghép nhanh giữ server thật.
- Kiểm chứng Chọn Bàn dữ liệu thật: typecheck/build PASS, dist index-0yXNg2f1.js cập nhật; chưa browser QA tạo/vào phòng đa client.
- 2026-10-16: Theo yêu cầu tăng tiếp avatar/tên panel người trong phòng: slot avatar36→44px, tên16→18px, thẻ52→64px. Đồng bộ người ngồi/người xem/xếp hàng; giữ xử lý giảm nhòe và panel. Phạm vi kích thước mở riêng task rồi khóa lại.
- Kiểm chứng tăng thẻ: typecheck/build PASS, dist index-BcQuocrX.js cập nhật; chưa browser QA.
- 2026-10-16: Theo yêu cầu căn giữa thông báo rỗng trong Lịch sử: Đã chơi/Đã lưu ván dùng1 hàng chiếm vùng còn lại và place-items-center khi không có record; Thế cờ rỗng flex1/grid center. Giữ layout có dữ liệu và typography.
- Kiểm chứng căn giữa thông báo rỗng Lịch sử: typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-16: Đính chính thẻ người trong phòng theo yêu cầu: giữ chiều cao gốc h10, cố định rộng166px (thẻ chờ200px có số thứ tự) tránh tên/avatar làm nở khung. Avatar32px/tên18px lớn hơn gốc28px/14px, giảm padding trong để vừa khung; bỏ tăng chiều cao52/64px trước đó.
- 2026-10-16: Tăng chữ thông báo danh sách rỗng Lịch sử và đồng bộ Đã chơi/Đã lưu ván/Thế cờ bằng historyEmptyTextClass chung28px theo scale; giữ căn giữa2 chiều. Không đổi ghi chú hay nội dung hàng có dữ liệu.
- 2026-10-16: Theo yêu cầu mới thẻ người trong phòng cao48px, avatar36px/tên20px, chiều ngang w-fit ôm nội dung thay rộng cố định166/200px; padding trái/phải5px. Đồng bộ người ngồi/người xem/xếp hàng, giữ cách giảm nhòe. Thay yêu cầu kích thước thẻ trước đó.
- 2026-10-16: Giữ kích thước thẻ/avatar/tên vừa chốt; riêng panel người trong phòng dùng image-rendering -webkit-optimize-contrast cho portrait/frame để cải thiện lấy mẫu ảnh nhỏ trên Chromium, số trong tên opacity80% cân nét với chữ (không đổi tên ở Bạn bè/Tin nhắn). Chưa kiểm chứng độ nét trên browser.
- 2026-10-16: Đính chính số trong tên thẻ phòng: opacity100%/cùng màu chữ, không giảm độ sáng. Ép stroke số0px và font-normal để thắng stroke0.3px của SocialPlayerName, giảm độ dày nét thật; giữ font-number/kích thước và chữ.
- 2026-10-16: Căn giữa2 chiều thông báo Chưa có bàn phù hợp và Đang tải danh sách bàn trong toàn khung RoomTableGrid bằng absolute inset0/grid place-items-center; không phụ thuộc chiều cao hàng lưới. Đồng bộ các tab và desktop/compact, giữ font/cỡ/màu.
- 2026-10-16: Theo yêu cầu bỏ Space trong Vị trí tùy chỉnh (Chơi với máy): chặn Space kích hoạt nút đang focus tại CustomPositionPage và GamePage positionTrial. Không chặn nhập dấu cách trong input/textarea/select/contenteditable; phím khác và Space chuyển chế độ replay giữ nguyên.
- 2026-10-16: Sửa giật popup nhóm Tin nhắn do polling1s thay conversationList mất members/creatorName rồi request members bổ sung lại: giữ metadata nhóm cũ trong lúc refresh. Giữ reference threads khi nội dung không đổi để không kích hoạt scroll xuống đáy mỗi poll. Không đổi interval/UI nhóm.
- 2026-10-16: Đổi ảnh nhóm đã nối server thật thay thông báo chưa tích hợp. Frontend chọn ảnh≤10MB, crop vuông/resize256 và encode JPEG; PATCH conversations/:id/avatar kiểm tra JPEG≤120k base64 và owner còn membership. Repository ghi uploads/group-avatars bằng UUID, lưu URL vào avatar_object_key hiện có, rollback lỗi ghi DB dọn file mới. Static/media proxy dev; list trả avatarUrl và mọi vị trí ảnh nhóm đọc cùng URL. Không migration, uploads ignored và cần backup cùng DB.
- Kiểm chứng ảnh nhóm:4/4 regression validation/owner/storage/cleanup PASS; typecheck/build PASS, dist cập nhật. Chưa QA chọn ảnh thật trong browser hoặc chạy integration MySQL upload. Backend cần restart để có endpoint/media mới.
- 2026-10-16: Tin nhắn: nút mặt cười mở24 emoji/chèn tại caret, giới hạn300 ký tự. Nút ảnh chọn≤10MB, JPEG resize cạnh dài≤720px/nén≤120k base64, xem trước/bỏ ảnh và bấm Gửi. POST conversations/:id/images xác thực membership và send giữ block/idempotency/300char; file UUID uploads/message-images, body lưu đường dẫn /media/message-images/UUID.jpg, render img chỉ khi khớp mẫu path nội bộ nghiêm ngặt; preview hội thoại chỉ 📷 Ảnh. Không migration; static/dev proxy mới, backup uploads cùng DB.
- Kiểm chứng emoji/ảnh Tin nhắn:6/6 regression validation/quyền owner/member/cleanup ảnh PASS; typecheck/build PASS, dist cập nhật. Chưa browser QA gửi/nhận ảnh hai tài khoản. Cần restart backend để có route images/media mới.

- 2026-10-17: Tin nhắn mặc định chưa chọn hội thoại, hiện HOANGBBCG giữa vùng chat theo Georgia đậm nghiêng/màu bàn cờ; bỏ fallback hội thoại đầu và tải thread khi chưa chọn. Mở từ hồ sơ/tạo nhóm giữ chọn đích. Typecheck/build PASS, xác nhận view mới trong dist; chưa browser QA. Không sửa avatar/bố cục danh sách.

- 2026-10-17: Đổi riêng HOANGBBCG mặc định Tin nhắn sang trắng kem #fff1d6. Typecheck/build PASS, màu xác nhận trong dist; chưa browser QA.

- 2026-10-17: Bỏ bong bóng nền/viền/padding/đuôi/họa tiết cho ảnh Tin nhắn cả gửi và nhận; ảnh hiển thị trực tiếp, giữ tin chữ và bấm xem giờ. Typecheck/build PASS, wrapper mới xác nhận trong dist; chưa browser QA.

- 2026-10-17: HOANGBBCG Tin nhắn màu #E6BA86, selection ban đầu null và reset khi đóng để mở lại chưa chọn mục. Typecheck/build PASS, màu mới xác nhận trong dist; chưa browser QA đóng/mở lại.

- 2026-10-17: Sửa ảnh Tin nhắn: bỏ canvas/nền trắng/resize/JPEG conversion, FileReader gửi nguyên bytes PNG/JPEG/WebP/GIF tối đa10MB. Backend validate signature, lưu đúng extension và bytes, parser riêng images14MB. Giữ URL jpg cũ; ảnh gửi căn phải với wrapper min-w-0, bỏ giới hạn min(360px,100%) gây khung rộng lệch. 6/6 regression hiện có PASS; kiểm tra PNG bytes/extension trực tiếp PASS; typecheck/build PASS, dist xác nhận FileReader. Không thêm được regression do EPERM file test; chưa browser QA. Backend cần restart. Ảnh cũ đã flatten trắng không khôi phục alpha, cần gửi lại nguồn.

- 2026-10-17: Thêm EnergyDialog mở từ vùng/nút cộng Năng lượng Home; ghép artwork21090d85 theo mẫu bằng imagegen và nút X mới tách riêng. Asset panel1629x897/close1016x947 trim alpha<=16. Đã xem preview ghép và so vị trí3 nút/X; typecheck/build PASS, dist có dialog và2 asset. Nội dung mẫu chỉ xem UI, chưa video/thanh toán hoặc đổi nghiệp vụ năng lượng. Chưa browser QA.

- 2026-10-17: Thu nhỏ popup Năng lượng tối đa1160px/80vw và bỏ hàng mô tả đầu/thanh ghi chú cuối bằng panel-compact.png1690x897; giữ3 gói/X. Đã xem artwork mới, typecheck/build PASS, dist xác nhận artwork compact/kích thước mới. Sửa nhãn UTF-8 popup và thông báo. Chưa browser QA.

- 2026-10-17: HOANGBBCG Tin nhắn sang trắng vàng nhẹ #FFF6DF; giữ font/cỡ/căn giữa. Typecheck/build PASS, màu mới xác nhận trong dist; chưa browser QA.

- 2026-10-17: Thu ngang popup Năng lượng1160→980px,80→68vw; giữ artwork/tỷ lệ/nút. Typecheck/build PASS, dist xác nhận kích thước mới; chưa browser QA.

- 2026-10-17: Căn vùng hover3 nút Năng lượng theo tọa độ mặt artwork, clip góc vát; hover vàng nhạt30%, pressed40%, không dịch kích thước. Typecheck/build PASS, dist xác nhận hover mới; chưa browser QA.

- 2026-10-17: Bỏ dòng Còn3 lần hôm nay bằng imagegen, chỉ ghép vùng(190,632,280,43) vào panel gốc để giữ nguyên pixel ngoài vùng/vị trí/hover. Đã xem asset; typecheck/build PASS, dist có panel-no-count; chưa browser QA.

- 2026-10-17: Hover nút Năng lượng vàng #ffd34e20%, pressed30%, giảm lớp phủ cho bớt đục; giữ geometry. Typecheck/build PASS, dist xác nhận; chưa browser QA.

- 2026-10-17: Nút cộng năng lượng mở popup Năng lượng, khôi phục tooltip đếm ngược khi hover vùng/nút cộng qua title. Typecheck/build PASS, dist cập nhật và xác nhận dialog/title; chưa browser QA.

- 2026-10-17: Nút X Năng lượng lớn hơn4.5→5.2% và con trỏ bàn tay. Typecheck/build PASS, dist xác nhận; chưa browser QA.

- 2026-10-17: Tooltip năng lượng mới nâu/vàng/chữ kem, hover/focus cả vùng và dấu cộng; >=5 hiện Năng lượng đầy, thiếu mới hồi đếm ngược. Typecheck/build PASS, dist xác nhận tooltip; chưa browser QA.

- 2026-10-18: Home Cờ Úp chuyển sang phòng online cùng variant jieqi: ghép bàn mở có đúng1 người, hết bàn tạo10 phút/60s theo tỉnh hồ sơ và ngồi chờ, không fallback máy. Quick Cờ Tướng bỏ bàn jieqi. Server xác thực variant, xáo bằng crypto và giữ variant khi reset/đổi ghế; publicRoom che concealed trong broadcast/ack/challenge và archive, không sửa state authoritative. Bỏ nhãn Cờ Úp phủ trên bàn; giữ nút Home Chơi với máy. Thay quy tắc Cờ Úp chỉ local trước đây.

- Kiểm chứng Cờ Úp online:9/9 test home-quick-wait/hidden/hidden-online PASS, typecheck/build PASS; dist xác nhận variant và bỏ overlay label. Chưa browser QA2 tài khoản/socket QA riêng cho jieqi. Cần restart backend. Không đổi nút Chơi với máy Home.

- 2026-10-18: Bấm vùng/dấu cộng năng lượng ẩn tooltip ngay và không tự hiện lại do focus sau đóng popup; hover lại mới hiện. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-18: Home thêm icon Shop và bánh răng Cài đặt cùng HomeIcon/homeUtilityButton; chuyển bật/tắt nhạc Home vào dialog Cài đặt dùng useHomeMusic hiện có, đồng bộ lối vào compact. Shop hiện báo đang chuẩn bị, chưa có mua hàng. Không thay tiện ích các màn khác. Typecheck/build PASS, dist index-CewNzn9k.js xác nhận settings/music/shop; chưa browser QA.


- 2026-10-18: Theo yêu cầu icon tô đặc, HomeIcon Cài đặt/Shop/Tin nhắn dùng fill currentColor cùng màu vàng nút tiện ích, khoét âm tâm bánh răng/cửa shop/dòng tin nhắn bằng evenodd; giữ kích thước/nút/hành vi. Typecheck/build PASS; dist xác nhận cả3 path đặc. Chưa browser QA.


- 2026-10-18: Người dùng mở riêng vị trí cụm nhận diện Home trong task: dịch toàn cụm avatar/tên/Elo trái10px CSS và cụm tiện ích phải10px CSS, cùng độ dịch; giữ kích thước/khoảng cách trong cụm và thanh tài nguyên giữa. Phạm vi vị trí mới khóa lại sau task. Typecheck/build PASS, dist xác nhận2 offset; chưa browser QA.


- 2026-10-18: Tăng riêng icon bánh răng HomeIcon28→34px theo yêu cầu; giữ khung nút48px và các icon khác. Typecheck/build PASS, dist xác nhận34px; chưa browser QA.


- 2026-10-18: Cài đặt Home thay modal bằng dropdown neo dưới bánh răng, đóng ngoài/Escape/blur; compact dùng chung HomeSettings. Hai công tắc độc lập Tắt nhạc nền và Tắt tiếng (icon nốt nhạc vàng). audioSettingsStore giữ mute trong phiên xuyên màn; GameSounds master gain tắt toàn bộ effects/intro/checkmate/clock kể cả đang phát, không tác động useHomeMusic. Typecheck/build PASS, dist xác nhận dropdown/2 nhãn. Test3 file12 PASS/1 FAIL kỳ vọng intro cũ start(4,2) nhưng code trước task start(2,2), không đổi timing. Regression mới dropdown/mute PASS; chưa browser/audio QA thật.


- 2026-10-18: Thay khung năng lượng/vàng Home bằng nguồn e7544f25-2cc2-4bfb-8fcd-c3f3ff3dd520; imagegen tách nền caro sang alpha thật, crop4 asset v2 trim alpha<=16. Hai khung giữ tỷ lệ tự nhiên, cùng vùng cụm cũ; dùng icon nguồn mới. Dấu cộng thiết kế HTML/SVG tròn vàng nổi20px; giữ số dư/tooltip/callback. Typecheck/build PASS, dist có4 asset mới; đã xem crop/kiểm tra alpha góc, chưa browser QA.


- 2026-10-18: Theo yêu cầu tăng chiều cao khung tài nguyên Home: hai ảnh khung49% rộng giữ nguyên, cao44px thiết kế (compact36px) thay h-auto~29px; cho phép nới dọc artwork trong task. Icon năng lượng/vàng23→32px (compact28), nút cộng20→26px (compact23). Giữ anchor/số dư/callback. Typecheck/build PASS, dist xác nhận44/26; chưa browser QA.


- 2026-10-18: Home tài nguyên dịch icon trái thêm3% bề rộng cụm (8→5%,57→54%), dấu cộng phải thêm3% (41→44%,89→92%); đồng bộ guard tooltip năng lượng theo vị trí mới. Giữ kích thước/khung/số. Typecheck/build PASS, dist xác nhận offset; chưa browser QA.


- 2026-10-18: Theo yêu cầu lấy ô vàng bên phải làm chuẩn, Home hai ô dùng cùng goldFrame; căn số chính giữa từng khung49% tại24.5%/75.5% cụm. Icon trái3%/phải54%, cộng trái41%/phải92%: mọi cặp cách đúng51% bằng khoảng cách gốc2 khung, giữ vị trí tương đối ô phải; giữ size và callback/tooltip. Typecheck/build PASS, dist xác nhận tọa độ mới; chưa browser QA.


- 2026-10-18: Thu nhỏ nhẹ icon năng lượng/vàng Home32→29px, compact28→25px; giữ đồng bộ2 icon, anchor/khung/số/dấu cộng. Typecheck/build PASS, dist xác nhận29px; chưa browser QA.


- 2026-10-18: Dịch cả2 icon năng lượng/vàng Home sang phải đúng3px CSS bằng left calc(3%+3px)/calc(54%+3px); giữ kích thước và mọi thành phần khác. Typecheck/build PASS, dist xác nhận2 offset; chưa browser QA.


- 2026-10-18: Chốt lưu riêng bật/tắt nhạc nền và mute tiếng game qua F5 bằng localStorage co-tuong-audio-music-v1/muted-v1. Đọc boolean có validate ngay khi khởi tạo, ghi mỗi toggle, storage lỗi vẫn dùng trong phiên. Không lưu vị trí bài/đổi playlist.3/3 regression dropdown và module-reload/preferences PASS, typecheck/build PASS, dist có khóa lưu; chưa browser QA reload thật.


- 2026-10-18: Home điện thoại theo bố cục reference tượng trưng, tái dùng asset project: MobileHome riêng compact<=800, hồ sơ trên trái/tài nguyên2 hàng trên phải/banner giữa/carousel2 ô trang1 Cờ Tướng-Chọn Bàn,trang2 Cờ Úp-Chơi Với Máy/thanh6 tiện ích dưới. Quyền đổi geometry avatar chỉ Home compact trong task này, không sửa token/component avatar chung; khóa lại sau task. Desktop giữ nguyên. HomeSettings thêm placement above tùy chọn cho dock, default dưới không đổi. 6/6 regression mobile carousel/callback/settings/audio/quick-wait PASS; typecheck/build PASS, dist xác nhận. Chưa browser QA: phiên không có trình duyệt kết nối (CUA listBrowsers rỗng). Xem docs/MOBILE-HOME.md.


- 2026-10-18: Thêm screen shop/ShopPage phủ viewport theo reference; background49740109 giữ nguyên pixel tại assets/shop/background.png, nguồn references/uploads. Home desktop/mobile cùng useHome.openShop. Sidebar3 mục (2 khóa), filter Tất cả/Avatar/Khung Viền, đúng1 avatar demo500 vàng, preview read-only/không mua/trừ vàng. Tài nguyên thật, cộng năng lượng dùng EnergyDialog; countdown chưa nghiệp vụ hiển thị --:--:--.4/4 regression shop/mobile/home-quick PASS, typecheck/build PASS, dist xác nhận shop/demo/background. Chưa browser QA vì không có browser kết nối. Không sửa UI khóa khác.


- 2026-10-18: Đính chính Shop theo người dùng: trang lớn nhưng nằm trong cùng khung Home, không kéo nội dung tới mép viewport. Shop dùng useHomeLayout/getCrispUiLayout chung: desktop lề ngang120px, dọc6px, compact6px; cùng viền vàng/nâu và nền ngoài xanh Home. Không sửa Home. Regression kích thước frame và chức năng shop1/1 PASS; typecheck/build PASS, dist có data-shop-frame. Chưa browser QA.


- 2026-10-18: Cải thiện rendering khung/icon năng lượng-vàng: ảnh nguồn frame1604x217/icon169x218,222x219 đủ cho kích thước nhỏ. Home dùng width/height/top/left nguyên pixel (sai số làm tròn<=0.5px), bỏ translate trên từng ảnh; giữ geometry danh nghĩa/asset/số/cộng. ResourceArtwork chung dùng -webkit-optimize-contrast riêng resource trên Home/compact/Shop, không áp dụng ảnh khác. Typecheck/build PASS, dist xác nhận sampling; mobile/shop2/2 regression PASS. Chưa browser QA độ nét thực tế, không khẳng định đã xác minh nguyên nhân bằng browser.


- 2026-10-18: Theo ảnh người dùng, dấu cộng tài nguyên chuyển vuông bo4px, nền vàng kem/đổ nổi nhẹ, plus nâu đậm nét bo; ResourceAddButton chung Home desktop/compact/Shop. Giữ slot/vị trí/callback/tooltip. Typecheck/build PASS, dist có surface mới; mobile/shop2/2 regression PASS; chưa browser QA.


- 2026-10-18: Thay khung năng lượng/vàng bằng ảnh2a1666ac-81f6-4519-ad6f-d39df43e1280 theo yêu cầu. Imagegen tách caro sang alpha thật, trim alpha<=16 bbox98,212,1978x278; runtime resource-frame-v3.png. Đồng bộ3 import Home/compact/Shop, giữ slot/icon/số/nút cộng/hành vi. Đã xem crop/góc alpha0; typecheck/build PASS và dist có asset mới. Chưa browser QA.


- 2026-10-18 XEM THỬ UI theo yêu cầu: khung tài nguyên dùng chính player/name-frame.png2137x469 (tỷ lệ4.56 gần ô205.8x44) để màu gỗ nâu/vàng đồng và viền dày khớp khung tên. Đồng bộ Home desktop/compact/Shop, chỉ đổi import nền; giữ slot/icon/số/cộng, không chỉnh asset hoặc PlayerNameplate. Đây là phương án thử, chưa chốt quy tắc lâu dài. Đã xem asset nguồn; typecheck/build PASS, dist cập nhật. Chưa browser QA.


- 2026-10-18: LAN: dev:web vite --host0.0.0.0, vite.config server.host0.0.0.0, server/index default HOST0.0.0.0 (vẫn cho override env). Client Axios relative /api, Socket.IO io() cùng origin; Vite proxy nội bộ127.0.0.1:3001 giữ nguyên/changeOriginfalse để cookie/origin guard đúng, không hardcode loopback client. Smoke tạm không DB: API+WebSocket qua Vite PASS127.0.0.1/localhost/192.168.1.17; backend direct LAN health PASS. Typecheck/build PASS, dist cập nhật; chưa kiểm tra điện thoại thật/firewall từ thiết bị khác. Không đổi UI/gameplay. Cần restart server đang chạy.


- 2026-10-18: Chốt mỗi trình duyệt/site giữ1 Guest bằng cookie thiết bị server; thoát/F5/mở lại khôi phục Guest cũ, không yêu cầu chọn khách lại. /me401 thì POST /api/account/guest/restore, chỉ resume cookie Guest chưa liên kết, tuyệt đối không create; cookie path /api/account/guest gửi được xuống route con. Logout vẫn revoke session, giữ device; restore xóa marker signedOut, dedupe startup tránh xoay2 session. Thiết bị mới/xóa dữ liệu gặp Login và chỉ tạo Guest khi chủ động chọn. Không dùng localStorage/user_id để chứng thực; không fingerprint máy, khác browser/origin là vùng lưu riêng.17/17 test entry/device-service/logout/Google-button PASS; typecheck/build PASS, dist có route mới. Chưa browser/MySQL integration thật, cần restart backend. Không migration/UI/gameplay.


- 2026-10-18: Sửa răng cưa icon năng lượng/vàng: ResourceArtwork thêm smooth=true dùng imageRendering:auto riêng icon (Home desktop/compact/Shop và giá vàng sản phẩm); giữ optimize-contrast cho khung. Không sửa asset/size/anchor. Nguyên nhân code có chế độ tăng nét cùng khung, có thể gây cạnh gắt khi thu nhỏ; chưa xác minh browser. Typecheck/build PASS, dist có smooth flag; chưa browser QA.


- 2026-10-18: Shop dùng gameUtilityButton/GameBackIcon chung thay back tròn; thu biển Cửa Hàng280x72/text36→220x48/text24 theo token, header86→64. HomeResourceLayout chung Home/Shop tính cùng width420scale/frame49% cao44scale/icon29scale/text20scale/plus26scale; không đổi hình học Home. Ba thẻ sidebar từ min-height112 sang fixed102px (thẻ2 trừ10px), cùng cột40px/2 dòng tên/width và căn giữa; compact64px giữ dock ngang.2/2 test shop/mobile PASS, typecheck/build PASS, dist xác nhận mới; chưa browser QA.


- 2026-10-18: Sidebar Shop đổi sang artwork theo reference crop người dùng: imagegen tách/tái dựng2 nền trống active đỏ/viền vàng sáng và idle nâu/đồng, pagoda vàng/đồng,gift,lock thay SVG outline/emoji. Crop alpha<=16, tight6 PNG tại assets/shop; sprite nguồn giữ references/uploads/shop-sidebar-extraction.png. Giữ3 thẻ102px và2 dòng; active hover sáng/pressed scale0.98 dịch1px tối nhẹ, motion-reduce tắt transition.2 mục khóa vẫn disabled, không tự mở nội dung. Đã xem3 crop và kiểm tra góc alpha0; shop1/1 test PASS; typecheck/build PASS, dist xác nhận asset/pressed. Chưa browser QA.


- 2026-10-18: Shop thêm MarketHeading theo crop reference: biển nền nâu gradient, mép cong/viền vàng nâu, title Georgia bold vàng gradient/shadow và baseline cong nhẹ bằng SVG textPath. Hai dải mô tả/clock đồng bộ nâu tối cong, thêm icon đồng hồ; giữ --:--:-- chưa lịch backend. SVG native text/shapes không tạo raster hay font mới, không đổi phần khác. Shop1/1 test PASS, typecheck/build PASS, dist xác nhận path/gradient. Chưa browser QA đối chiếu pixel.


- 2026-10-18: Thu biển nâu tiêu đề Shop100%/max1000→88%/max880, font SVG64→56 theo yêu cầu; title gradient dọc đúng #F7ED96→#FBC12E. Giữ baseline cong/mô tả/countdown và khu khác. Typecheck/build PASS, dist xác nhận2 màu/size; chưa browser QA.


- 2026-10-18: Thu3 dải nền MarketHeading ôm chữ theo yêu cầu: path biển chính rộng716 thay964 đơn vị, giảm phần trống dọc viewBox136→104; dải mô tả w-fit/padding ngang20/dọc2, timer ngang16/dọc2. Giữ font56/gradient#F7ED96→#FBC12E và baseline. Typecheck/build PASS, dist xác nhận path/w-fit; chưa browser QA.


- 2026-10-18: Bỏ lớp nền gradient/viền ngang header Shop, giữ back/biển tên/tài nguyên và geometry. Thu mô tả Hàng thay mới mỗi ngày max25→18px, dòng Làm mới sau max22→16px, countdown1.25→1.15em; compact tương ứng nhỏ hơn. Giữ biển nâu/title chính. Typecheck/build PASS, dist xác nhận; chưa browser QA.


- 2026-10-18: Dải tiêu đề chợ chuyển thanh ngang nới hai đầu (SVGx110..890), giảm chiều cao/path cong ít; nền opacity0.78/viền0.65. Mô tả/timer nới padding ngang28/24px, padding dọc4px; cả cụm gap4px, nền gradient alpha~72–78%, timer bo cong nhẹ. Giữ font/màu chữ/nội dung. Typecheck/build PASS, dist xác nhận padding/opacity; chưa browser QA.


- 2026-10-18: Biển tiêu đề chợ cong nhẹ trên/dưới, radial gradient giữa nâu sáng#78380f→viền gần đen#080301, opacity0.88. Hai dải dưới tăng alpha~87–94% để bớt trong suốt, giữ padding4/font/màu chữ. Typecheck/build PASS, dist xác nhận màu/alpha; chưa browser QA.


- 2026-10-18: Làm lại cụm tiêu đề Shop theo ảnh mới: imagegen trích/tái dựng3 biển nâu sẫm trang trí mảnh, cropalpha<=16 main2072x250/sub1382x168/clock1078x160. MarketHeading dùng background asset ôm chữ/paddingdọc4px/gap4, title Georgia bold baseline thẳng gradient#F7ED96→#FBC12E; mô tả nhỏ và countdown có clock căn giữa. Không đổi nội dung backend, vẫn --:--:--. Đã xem crop/alpha0; shop1/1 test PASS, typecheck/build PASS, dist có3 asset. Chưa browser QA đối chiếu ảnh.


- 2026-10-18: Dịch cụm MarketHeading lên10px CSS; thu thanh3 filter Tất cả/Avatar/Khung Viền ngang100→92% căn giữa, cao64→44px thiết kế, compact40px. Chữ filter Georgia thường18px thay heading24px, compact14px theo mẫu; giữ state filter/hành vi/sản phẩm. Shop1/1 test PASS; typecheck/build PASS, dist xác nhận offset/size; chưa browser QA.


- 2026-10-18: Shop tabpanel mt0 sát dưới filter; thu mỗi tab40px (group calc92%-120px), Georgia bold theo mẫu dòng mô tả. Lưới desktop4 cột2 hàng bằng grid-rows2/flex1/min-h0, card flex để ảnh co theo chiều cao hàng, footer40px; vẫn chỉ1 demo không nhân bản. Compact2 cột giữ responsive. Shop1/1 test PASS, typecheck/build PASS, dist xác nhận grid/width; chưa browser QA.


- 2026-10-18: Shop filter Georgia thường giống dòng Hàng thay mới mỗi ngày; gap3 tab20px cố định. Tabpanel padding10px/lưới gap10px. Bỏ badgeThường và khungvuông/border/glow quanh avatar demo, giữ ảnh tròn căn giữa; preview đồng bộ tròn/không rarity. Không chạm avatar người chơi ngoàiShop. Shop1/1 test PASS trước đổi font/preview; typecheck/build cuối PASS, dist xác nhận3 gap/avatar. Chưa browser QA.


- 2026-10-18: Kiểm tra lỗi font tabShop: chuỗi Khung Viền là NFC đúng U+1EC1, không có khoảng trắng nội bộ. Đồng bộ span nhãn tab với dòng mô tả: Georgia normal/cùng clamp12,1.2vw,18/leadingtight; whitespace-nowrap/kerning normal/wordspacingnormal/NFC/langvi, button flexcenter thay leadingnone. Giữ gap20/khung/state. Shop1/1 test PASS, typecheck/build PASS. Chưa browser QA nên chưa khẳng định nguyên nhân hoặc đã hết lỗi glyph thực tế.


- 2026-10-18: Đổi nhãn sidebarShop mục2 thành Cửa Hàng Cao Cấp (2 dòng Cửa Hàng/Cao Cấp), mục3 thành Sự Kiện (1 dòng căn giữa). Giữ artwork/kích thước/khóa; cập nhật selector test. Typecheck/build PASS, dist xác nhận tên mới; chưa browser QA.


- 2026-10-18: User xác nhận nhãn filter vẫn tách dấu sau lần giữGeorgia; thay riêng3 nhãn bằng Cormorant Garamond600 font-heading/font-semibold đã nhúng local đủ Vietnamese, tránh phụ thuộc glyph/fallback Georgia hệ thống. Giữ NFC/spacing/layout; chưa kết luận nguyên nhân browser vì chưa QA thật. Typecheck/build PASS, dist xác nhận font local600. Cần kiểm tra trực quan lại, không tuyên bố đã xác nhận hết lỗi.


- 2026-10-18: Căn lại3 thẻ sidebarShop: cùng grid3 cột36px/icon, textminmax,12px/lock; gap8/padding12, chữ căn giữa mỗi cột/cùng tâm dọc, ảnh icon nằm ô vuông36/objectcontain thay widthfull heightauto nên gift không tự cao lệch. Active chừa slot khóa rỗng giống2 thẻkhóa. Compact icon24/textflex, lock ghim góc để không ép tên. Giữ khung102px/artwork/trạng thái. Shop1/1 test PASS trước tinh chỉnh kích thước cột; typecheck/build cuối PASS, dist xác nhận. Chưa browser QA.


- 2026-10-18: Filter3 tab Shop dùng ShopFilterTab: chữ local Cormorant tăng clamp12..18→14..20px/bold700, compact14px; thẻSVG góc vát/2viền nâu vàng, selected sáng gradient kem-vàng, hoverbright110/pressdịch1px+dark90. Giữ gap20/kích thước/state lọc. Shop1/1 test PASS, typecheck/build PASS, dist xác nhận text/path; chưa browser QA.


- 2026-10-18: User cảm giác2 thẻsidebar tối nghiêng phải. Code không rotate/skew, artwork cũ bevel/góc/ánh sáng lệch nhẹ; imagegen chỉnh riêng tab-idle-v2 cân trái/phải, rail ngang/dọc, giữ phong cách/màu. Trim alpha<=16 output2150x708/corner0; đổi1 import dùng chung2 thẻ, không đổi text/icon/layout. Đã xem output; typecheck/build PASS, dist cóassetv2. Chưa browser QA cảm nhận sau thay.


- 2026-10-18: User mở2 mục Shop Cửa Hàng Cao Cấp/Sự Kiện để bấm chuyển: sidebar state market, bỏ disabled/lock, selected dùng artworkđỏ/iconvàng, title theo mục;2 mục mới danh sách trống, demo chỉDaily. Avatar demo to hơn nhờ giảm vùng padding16→4px (compact12→4), giữ ảnh tròn. Thay mắt/preview bằng nútMua báo sảnphẩm xemthử/chưa mở bán, không trừ vàng/DB/avatar. Shop1/1 regression switch/filter/buy-no-deduct PASS, typecheck/build PASS, dist xác nhận nhãn; chưa browser QA.


- 2026-10-18: User báo title Cửa Hàng Cao Cấp tách dấu. Chuỗi NFC đúng U+1EA5 (ấ), không phải dữ liệu có khoảng trắng. MarketHeading cònGeorgia trong khi3tabđãfontlocal: đổi toàn cụm heading/mô tả/timer sang Cormorant Garamond600 local Vietnamese, titlefont-semibold khớp face600, langvi/NFC/kerningnormal. Giữ cỡ/màu/nền/geometry. Shop1/1 test PASS, typecheck/build PASS, dist xác nhận font/NFC; chưa browser QA nên chưa xác nhận hết lỗi glyph thực tế.


- 2026-10-18: Theo yêu cầu tăng chữ lớn Shop, MarketHeading tăng tiêu đề desktop clamp28px/3.6vw/52px, compact20px/5.8vw/30px; dùng chung cả3 mục. Giữ font local600, màu và hai dòng phụ. Đây là tinh chỉnh UI xem thử. Typecheck/build PASS, dist xác nhận cỡ mới; chưa browser QA.

- 2026-10-18: Xem thử UI Shop theo yêu cầu tăng hai dòng phụ MarketHeading: mô tả clamp14px/1.5vw/22px, làm mới clamp14px/1.35vw/20px, compact cả hai14px; timer/icon co theo em. Dùng chung3 mục, giữ font/màu/tiêu đề chính. Typecheck/build PASS, dist xác nhận cả2 cỡ; chưa browser QA.

- 2026-10-18: Chơi nhanh/Đấu không bắt khai địa chỉ, ghép ngẫu nhiên mọi khu vực như hiện hành. Chọn Bàn bắt buộc lưu địa chỉ hồ sơ (countryCode có giá trị); thiếu thì giữ Home và nhắc chọn trong Hồ sơ. Chưa thay quyền chuyển khu vực tìm bàn sau khi khai địa chỉ, đang chờ làm rõ. Giải đấu tương lai cũng phải yêu cầu khai địa chỉ; chưa có luồng giải đấu để triển khai. Không đổi quy tắc lưu địa chỉ một lần hoặc UI hồ sơ. Regression home3/3 PASS, typecheck/build PASS, dist xác nhận; chưa browser QA.

- 2026-10-18: Đính chính yêu cầu địa chỉ: bỏ chặn mở Chọn Bàn ở useHome, chuyển sang openProvincePicker trong useRoomSelection. Chưa khai vẫn vào sảnh/Chơi nhanh được; bấm chọn tỉnh mới nhắc khai địa chỉ Hồ sơ. Giải đấu tương lai vẫn yêu cầu địa chỉ. Đã sửa tài liệu quy tắc thay diễn giải trước.5/5 test home/presence PASS, typecheck/build PASS, dist xác nhận; chưa browser QA.

- 2026-10-18: Chọn quốc gia trong VietnamAddressPicker đổi native select sang danh sách nút cuộn ngay trong khung, mỗi hàng dùng CountryFlag SVG thật/tên nước và highlight/check khi chọn. Tái dùng palette/nút danh sách tỉnh; giữ Tiếp/Lưu/Hủy và quy tắc lưu1 lần. Country picker/flag/location4/4 PASS, typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-18: Bổ sung ô tìm quốc gia theo cùng giao diện tìm tỉnh/xã, lọc tên không phân biệt dấu/hoa thường hoặc mã quốc gia; có xóa tìm và trạng thái rỗng. Xóa truy vấn khi chuyển quốc gia↔tỉnh, giữ tìm tỉnh/xã hiện hành.2/2 regression country picker PASS, typecheck/build PASS, dist xác nhận; chưa browser QA.

- 2026-10-18: User báo không lưu được Xã An Nhơn Tây/TP.HCM. Đã xác minh API địa giới mã79/27508 hợp lệ; DB Guest chưa location, thử UPDATE trong transaction rồi rollback thành công (không lưu thay user). Chưa xác định nguyên nhân request thật; browser connector không có tab. VietnamAddressPicker trước che lỗi bằng thông báo chung, nay hiển thị errorMessage API, trạng thái Đang lưu/chặn submit trùng, giữ lựa chọn khi lỗi.3/3 picker tests PASS, typecheck/build PASS, dist xác nhận. Chờ user thử lại lấy lỗi cụ thể; KHÔNG tuyên bố lỗi lưu đã hết.

- 2026-10-18: Sửa Chơi nhanh không địa chỉ bị Tỉnh/thành phố không hợp lệ khi hết đối thủ: applyAccount đặt province rỗng, Home trước gửi chuỗi rỗng tạo bàn. Nay quick xiangqi/jieqi bỏ province nếu trống, roomApi.create cũng chuẩn hóa trường tùy chọn để đồng bộ mọi nơi tạo. Không gán tỉnh giả/không bắt khai địa chỉ khi chơi ngẫu nhiên; chỉ chọn tỉnh trong Chọn Bàn yêu cầu địa chỉ.7/7 quick/presence tests PASS gồm Guest province rỗng ở2variant, typecheck/build PASS, dist xác nhận. Chưa browser QA. Lỗi lưu địa chỉ trước vẫn chưa xác định, không coi là đã sửa.

- 2026-10-18: Đã xác định lỗi lưu địa chỉ Nguồn yêu cầu không hợp lệ: proxy dev5173 gửi Host không khớp Origin dù changeOrigin:false. vite.config thêm sameOriginProxy dùng chung API/media, proxyReq set Host từ incoming.headers.host; giữ kiểm tra nguồn backend nguyên vẹn. HTTP thật trước sửa localhost/127 qua5173 trả403, sau sửa localhost/127/HostLAN đều401 (request không cookie, đã qua origin guard), Origin lạ vẫn403. DB UPDATE rollback trước đó đã xác nhận hợp lệ; chưa thực hiện lưu bằng session người dùng/browser. Typecheck/build PASS; dist rebuild cùng bundle vì chỉ cấu hình dev. Ghi chú chờ xác định lỗi nguồn ở lượt trước đã được giải quyết; user tải lại và thử lưu.

- 2026-10-18: Tạo3 avatar concept riêng bằng imagegen: nữ kiếm khách/lão quân sư/nam tướng quân, PNG1254x1254 tại outputs/avatar-concepts, prompt/source trong README. Đã xem ảnh, full-bleed không viền alpha dư. Chưa nối catalog/Shop/DB, không đổi UI/avatar đang khóa.

- 2026-10-18: Thêm3 avatar imagegen nữ kiếm khách/lão quân sư/nam tướng quân vào Phiên Chợ Hàng Ngày, cùng demo cũ thành4 sản phẩm; tab Tất cả/Avatar dùng chung map, ảnh tròn/card và giá xem thử500 như cũ. Chưa giao dịch/DB/cấp quyền avatar. Nguồn PNG1254x1254 full-bleed tại outputs/avatar-concepts, runtime src/assets/shop/avatars, prompt tại outputs/avatar-concepts/README.md. Shop regression1/1 PASS; chưa browser QA.

- Kiểm chứng bổ sung Shop3 avatar: typecheck/build PASS, dist có đủ3 PNG và bundle mới; chưa browser QA.

- 2026-10-18: Theo yêu cầu bỏ viền ảnh avatar trong Shop:3 ảnh mới vốn không viền; demo dùng sprite có vòng vàng baked-in, crop hiển thị riêng Shop bằng scale1.12 trong ô tròn overflowhidden để bỏ vòng. Không sửa sprite/AvatarPortrait dùng chung hoặc geometry avatar người chơi. Giữ khung card/giá/nút Mua. Đã xem sprite nguồn, typecheck/build PASS, dist xác nhận crop; chưa browser QA.

- 2026-10-19: Trang quản trị riêng /admin đăng nhập bằng1 mật khẩu (theo chốt user, KHÔNG theo ID tài khoản). Scrypt ADMIN_PASSWORD_HASH chỉ backend/.env; mật khẩu sinh24 ký tự trong board-game/.admin-access.txt ignored, không log/bundle/localStorage. API /api/admin session RAM2h/hash/cookie HttpOnly SameSiteStrict/rate5sai10phút, kiểm tra Origin. AdminService→AdminRepository transaction chỉnh số dư/Elo2variant, grant/equip18avatar/4khung/39danhhiệu, ledger+audit UUID idempotent/lý do. Migration005 thêm2bảng user_cosmetics/admin_audit,001–004 giữ nguyên; runner chuẩn hóa CRLF→LF khớp journal đã xác minh. AvatarPortrait chung hỗ trợ3ảnhShop, picker chỉ thêm avatar đã sở hữu; không đổi geometry. Setup/migration0052bước/verify DB thật PASS, không buff user thật.16/16 unit/React/migration +11/11 MySQLtạm PASS; API live login/catalog/search/logout PASS; typecheck/build PASS, dist xác nhận admin và không chứa mật khẩu/hash. Chưa browserQA. Xem board-game/docs/ADMIN.md.

- 2026-10-19: Sửa sao/danh hiệu trong Thông tin người chơi/Tùy chỉnh và popup thông tin chat: AvatarRankBadge trước thiếu elo nên luôn mặc định1000/Tân Binh1sao. ProfileDialog lấy Elo xiangqi của đúng displayedAccount (hồ sơ mình fallback session.elo), truyền chung sang AvatarCustomization; MessagesOptionsPanel lấy profile đúng người. Không sửa hình học/avatar/star style hoặc công thức sao.11/11 regression profile/realtime-customization/otherplayer/logout/rank PASS, typecheck/build PASS, dist index-BsIxUJLJ.js xác nhận. Chưa browserQA.

- 2026-10-19: Theo user xác nhận hạ khung danh sách avatar bên dưới: offsettop6px thiết kế responsive, đồng bộ panel Chọn avatar/Chọn viền cùngslot; giữ kích thước panel/ô/ảnh và cụm thông tin/preview trên. Đây là chỉnhUI xem thử riêngtask, không mở khóa geometry avatar toànproject. Typecheck/build PASS, dist xác nhận; chưa browserQA.

- 2026-10-19: User đính chính khung nâu đen lấn sao là ranh giới nền phong cảnh ở Tùy chỉnh, không phải panel danh sách. Hoàn tác offsettop6 của2panel avatar/frame; tăng đoạn phong cảnh và overlay tương ứng thêm8px CSS chỉ khi avatarCustomizationOpen để ranh giới nâu đen xuống8px. Giữ avatar/sao/tab/list geometry. Thay cách hiểu lần trước; typecheck/build PASS, dist xác nhận, chưa browserQA.

- 2026-10-19: Thêm bộ bo_3_vien_avatar_03_08_09 từ Downloads vào Shop: viền đỏ03/xanh ngọc08/tím09, tight alpha crop và nguồn tại src/assets/shop/frames/source.md. Product list chung theo kind, Tất cả7/Avatar4/Khung Viền3; objectcontain giữ nguyên tỷ lệ và lỗ alpha. Giá/nútMua xemthử500 theo sảnphẩm cũ, không trừvàng/cấp quyền hoặc sửa frame ngườichơi. Shop1/1 regression lọc/click3viền/no-deduct PASS, typecheck/build PASS; chưa browserQA.

- 2026-10-19: Mua mọi sảnphẩm Shop nay mở ShopPurchaseDialog native modal với tên/giá500 vàng/Hủy/Xác nhận, Escape/bấm ngoài đóng. Hủy không làm gì; Xác nhận vẫn báo xemthử/chưa mởbán, không trừvàng/cấpvậtphẩm/ghiDB. Dùng chung7sảnphẩm và giá chung card/dialog, giữUIcard. Shop1/1 regression bao gồm cancel/confirm/escape/tên-giá/no-deduct PASS, typecheck/build PASS; chưa browserQA.

- 2026-10-19: User chốt Shop mua thật bằng vàng, bỏ demo và chặn trùng: danh mục chuẩn src/lib/shopCatalog.ts giá500; Quan Vũ thay tên Avatar demo. Auth API ShopService→ShopRepository transaction lockuser/resource, checkownership/balance, debit+cosmetics+ledger atomic, requestUUID idempotent. Món đã có mặcđịnh/admin/mua báo Bạn đã có avatar/viền này, khôngtrừvàng; thiếuvàng khôngcấp. UI cậpnhật ngay account/gold/cosmetics, Chọn avatar/Chọn viền đọc kindtươngứng, không tựequip.3viền frame4–6 backendcheckownership, render qua getAvatarFrame chung; chỉ3assetmới bỏcircleclip tránhcắtornament, giữgeometrykhungcũ. Admin7khung đồngbộ. Khôngmigrationmới/khôngmuathử trênDBuserthật.9/9 unit/React +15/15 MySQLtạm PASS gồm concurrency/idempotence/tamper/rollback/equip, typecheck/build PASS, dist index-DmRNrHp6.js xác nhận muaAPI/no-demo. Chưa browserQA. Quy tắc này thay trạng thái xemthử; docs/SHOP.md là chuẩn.

- 2026-10-19: Theo user sửa danh sách Chọn avatar: ảnhmới img trước dùnghcalc không có khung kíchthước riêng nên hiểnthị lớn/cắtngang khác spritecũ. Bọc mọi thumbnail cùng viewport aspect-square/hcalc100%-8/overflowhidden/roundedfull; ảnhcon sizefull, spritecũ scale1.12 cắt vòngvàng baked-in, ảnhmới khôngscale. Chỉ phạmvi thumbnail danh sách theo quyềntask, không sửa avatarpreview trên/khungtrangbị hay AvatarPortrait dùngchung. Typecheck/build PASS, dist xácnhận; chưa browserQA.

- 2026-10-19: User báo avatar mới mờ. Nguồn gốc1254², browserQA không cóbrowseriab nên chưa xác định nguyênnhân renderthực. Dùng imagegen edit3ảnh tăng độ rõ mắt/tóc/contour theo ảnhgốc, lưu -v2 siblings, giữoriginal và prompt nguồn tại src/assets/shop/avatars/source.md. Đồngbộ Shop/AvatarPortrait mọiconsumer, render qua CrispUiImage nativeimg, khôngCSSfilter/Canvas/đổi geometry/mãvậtphẩm/DB. Đã xem3ảnh1254²/fullbleed;5/5 shop/inventory/profile regression PASS, typecheck/build PASS, dist đủ3ảnhv2. Chưa browserQA nên chưa xácnhận hiệuquả thực ở100–150px.

- 2026-10-19: User vẫn thấy avatar mới hơi mờ sauv2. Đổi cách hiển thị3avatar mới sang native CSSbackground cùng môhình spritecũ, backgroundsize150%/position50%35% để mặt chiếm nhiều pixel hơn trong cùng vòng; khôngCSSfilter/Canvas/transformscaleparent và không sửa ảnhnguồn. Shop cũng dùng AvatarPortrait để crop đồngnhất với Hồsơ/Tùychỉnh/bàn/chát. Giữ viewport/kíchthước/vịtrí avatarvàkhung, không thay bậc/DB/quyền sởhữu.5/5 regression shop/inventory/profile PASS, typecheck/build PASS, dist xácnhận. Đây là đổi crop/render, không khẳng định đã đo nguyênnhân mờ bằng browser; chưa browserQA.

- 2026-10-19: User yêu cầu hoàn tác crop150% và dùng file ảnhnhỏ. Đã gỡ backgroundcrop, giữkhungảnhgốc; scripts/prepare-avatar-sizes.ps1 resize deterministic HQBicubic/TileFlipXY từmasterv2 thành36PNG (3ảnh×12cỡ96/128/136/160/192/200/256/272/320/384/408/480). SmallAvatarPortrait dùng srcSet+sizes đoôthật chọnnguồnnhỏ theoDPR; khôngCanvasruntime/filter/zoom/cropmới. Shop vàAvatarPortrait dùngcùng nguồnnhỏ, không đổi geometry/DB. Đã xem3bản128px, QA36/36size/alpha PASS,5/5 regression shop/inventory/profile PASS, typecheck/build PASS; dist36ảnhnhỏ/0masterv2. Chưa browserQA; không khẳngđịnh triệt tiêumọi resample ởmọi viewport.

- 2026-10-19: Theo user chỉ thử1avatar Lão quân sư A/B/C, không rollout. Tùy chỉnh thêm nút mở portal so sánh đúng width preview làm tròn; A giữ SmallAvatarPortrait hiện tại, B Lanczos3 antialias rồi Gaussian unsharp20% sau resize, 1x/2x nguyên pixel48–160, C chờ ảnh/local file chỉ preview. Không đổi equip/DB/geometry hiện hành. Diagnostics runtime báo size/current source/DPR và ancestor filter/transform/scale; objectcover, không scale test.193/193 PNG size PASS,5/5 regression comparison/inventory/profile PASS, typecheck/build PASS, dist index-BHUyrude.js. Chưa browser QA; chưa kết luận B thắng. Nguồn/script và hướng dẫn tại src/assets/shop/avatars/ab-test/source.md.
- 2026-10-19: Gỡ Quan Vũ/avatar-0 (món thử) và Nữ kiếm khách/avatar-15 khỏi Shop; ẩn avatar-15 ở danh sách sở hữu. Đã xác nhận/xóa đúng cosmetic avatar-15 trên Guest public ID29622295, đang equip avatar-17; không hoàn vàng. Shop còn2 avatar mới +3 viền. 3 UI test pass; MySQL integration skipped; typecheck/build PASS, dist index-D5DwodzU.js. Chưa browser QA.
- 2026-10-19: Thêm khung thắng/thua từ2ảnh17dba0c6/ff38225e, chỉ người tham gia thấy, chờ hiệu ứng chiếu bí hoàn tất; Xác nhận đóng. Hook giữ kết quả qua đổi ghế/chờ, loại khán giả/replay/trial/demo/hòa. 5/5 regression PASS, typecheck/build PASS; dist index-Cx9tqQCr.js và2asset đã xác nhận. Chưa browser QA. Ô thưởng để trống, chưa đổi logic thưởng.
- 2026-10-19: Vương miện trên avatar hạng1 Xếp hạng lên thêm3px CSS (chung2tab). Chỉ crown SVG, không đổi avatar/khung. Typecheck/build PASS, dist xác nhận; chưa browser QA.
- 2026-10-19: Củng cố popup thắng/thua online: animationcancel khônglàm mấtcallback; dùng lastCompletedMatch khi snapshot bỏqua finished.7/7 tests PASS, Chrome QA GamePage/snapshotgiả: thắng/thua/confirm/spectator/playing→ready PASS, ảnh outputs/result-online-qa.png; khôngghiDB thật. Typecheck/build PASS dist index-BB2xhJBQ.js. Chưa táihiện trên đúngphiên user; reload trướcvánmới.
- 2026-10-19: Hoàn thành Máy giả Cờ Tướng/Cờ Úp (2nút dưới tráiHome): user đi2nước thắng, server cộng125–150vàng thật cóledger/idempotency; popup hiệnsốvàngAPI. Khôngbuff dữ liệuuser trongQA.15 unit/React PASS;18 integrationMySQLtạm PASS; Chrome Home→2nước→win/+gold/returnHome PASS (transportmock, ảnh outputs/test-bot-qa.png). Typecheck/build PASS dist index-Bq9LX6bW.js. Backend npmstart cầnrestart nếukhôngwatch, frontend reload. Xem docs/TEST-BOT.md.
- 2026-10-19: Ô thưởng popupwin: thêmiconvàngHome, đổi+N sang font-number normal giống ôsốdưvàng; aria-label đầyđủ. Giữ giátrịthưởngAPI. Typecheck/build PASS, dist xácnhận; chưa browserQA lượtstyle.
- 2026-10-19: Popup thắngthua chờ cả hình+2lớpâmthanh chiếubí; máygiả2nước chạy matepresentation (server vẫnresign).25 targeted tests PASS, Chrome WebAudio timing popup4823ms sau audioend4562ms PASS, typecheck/build PASS dist index-CmGDITaT.js. FullUI cũ có20case fail mockâmthanh/flowcũ tronglầnchạyrộng, chưa xửlýngoàiphạmvi; khôngfullsuitegreen.

- 2026-10-19: Popup thắng/thua: nút Xác nhận cursor-pointer; click mọi vị trí trong bảng hoặc backdrop đóng sau đủ 1000ms kể từ showModal. Escape cũng qua cùng khóa 1s, preventDefault tránh native đóng sớm. Giữ gate hình/audio chiếu bí và thưởng. Regression match-result 10/10 PASS, typecheck/build PASS; dist index-BGEr8t-w.js xác nhận performance.now()+1000/cursor-pointer. Chưa browser QA lượt này.


- 2026-10-20: Xem thử theo user: cả hai Máy giả cho người chơi Đỏ thua sau 2 nước hợp lệ (winner black/resign), không cộng hoặc trừ vàng. Giữ popup/chiếu bí/audio và khóa đóng 1s. Thay tạm luồng thắng thử trước đó; không đổi PvP/Pikafish. 13/13 test service/result PASS; typecheck/build PASS, chưa browser QA/DB integration lượt này.


- 2026-10-20: Sửa mất animation Máy giả: useTestBot trước gán snapshot animation:null. Nay sau API xác nhận, trình diễn nước Đỏ qua applyMoveWithResult/animation dùng chung, chờ PIECE_MOVE_DURATION_MS rồi snapshot+nước đáp máy; nước cuối giữ animation nước Đỏ. Khóa chọn khi animation, guard id/account/animationVersion bỏ phản hồi sau reset/rời. Không đổi kết quả thua thử hoặc DB/luật thưởng. 15/15 tests test-bot-ui/service/match-result PASS gồm animation cả2variant; typecheck/build PASS, dist cập nhật. Chưa browser QA.


- 2026-10-20: User chốt dùng bảng thắng/thua đã duyệt cho online thật. Đối chiếu GamePage/useMatchResult: đã nối online sẵn qua room.game và phe participant, không cần sửa runtime hoặc luật server. Thêm regression cả xiangqi/jieqi: Đỏ thắng/Đen thua, viewer không thấy, đổi phòng dọn; cùng suite giữ gate hình/audio và khóa đóng1s. 12/12 match-result tests PASS; typecheck/build PASS, dist vẫn dùng MatchResultDialog chung. Chưa đấu online 2 browser thật lượt này. Ô thưởng popup online chưa nối, không giả số thưởng; máy giả giữ thua thử2nước, chưa có yêu cầu xóa.


- 2026-10-20: User yêu cầu bỏ hai nút Máy giả Cờ Tướng/Cờ Úp khỏi Home. Đã xóa entry points, hook và khung thông báo lỗi khỏi Home; giữ Chơi Với Máy/Cờ Úp hiện hành. Chỉ gỡ UI; API/test-bot và service backend vẫn còn nhưng không còn nút khởi chạy. Typecheck/build PASS, dist index-B6QlZxvA.js cập nhật; chưa browser QA.


- 2026-10-20: User chốt mặt cười/mặt khóc trên avatar chỉ hiện 5 giây từ kết quả; một người rời/đổi ghế thì tắt cả hai ngay. useResultFaces dùng chung hai PlayerCard, theo room/phase/winner/reason và socket ID từng ghế; snapshot lặp không gia hạn, không gắn kết quả người cũ lên ghế mới, timer dọn khi ván mới/rời. Không thay geometry avatar hoặc popup kết quả. 4/4 regression PASS (5s/snapshot lặp/ghế trống/đổi người/rời ngay snapshot cuối); typecheck/build PASS, dist index-Cqm7HK7W.js cập nhật, chưa browser QA.


- 2026-10-20: Shop sản phẩm đã sở hữu dùng lớp phủ đen60% toàn card và ảnh chữ Đã mua user5fc33724 giữa card/rộng85%, chung avatar/khung và các tab. Dùng ownsCosmetic(account,product), account reactive nên hiện ngay khi API mua xong/khi tải lại; giữ chống mua trùng hiện có. Ảnh nguồn2172x724 giữ references/uploads; loại alpha<=16 nhiễu vô hình rồi tightcrop x516/y234/1134x268, đã xem PNG và giữ artwork. Shop regression1/1 PASS gồm before/after mua và món chưa sở hữu; typecheck/build PASS dist index-ZNYKu36_.js và purchased asset. Chưa browser QA.


- 2026-10-20: Theo ảnh user, thu nhỏ chữ Đã mua Shop từ85% xuống60% chiều rộng card, neo50%/50% và translate-50% để căn giữa ngang/dọc toàn ô. Áp dụng chung avatar/khung, giữ overlay60%. Typecheck/build PASS, dist xác nhận class mới; chưa browser QA.


- 2026-10-20: Theo ảnh user, riêng Cửa Hàng Cao Cấp đổi dòng phụ thành Hàng thay thế mỗi tuần; MarketHeading nhận subtitle, các mục khác giữ mặc định. Chỉ đổi chữ UI, chưa triển khai lịch refresh backend. Typecheck/build PASS, dist xác nhận chữ mới; chưa browser QA.


- 2026-10-20: User chốt Shop Sự Kiện dòng2 Chưa có sự kiện. Phiên Chợ Hàng Ngày Làm mới sau đếm HH:MM:SS đến0h Việt Nam UTC+7, qua ngày lặp24h; tính từ Date.now mỗi tick, focus/visibility cập nhật, đổi tab/unmount dọn timer/listener. Số tăng1.3em→1.6em, camvàng#ffad24 đậm hơn và glow5/12px; kiểu số chung MarketHeading. Cao Cấp giữ dòng tuần và placeholder thời gian; Sự Kiện không giả lịch. Đây là đồng hồ UI, chưa tự đổi catalog/backend khi qua ngày.3/3 tests countdown/shop PASS gồm midnight/resume/cleanup, typecheck/build PASS; dist xác nhận nhãn/style/hook. Chưa browser QA.


- 2026-10-20: User xác nhận web mobile + xem UI điện thoại trên laptop. Thêm /mobile-preview (dev và npm start) dùng MobilePreviewPage/iframe same-origin / với viewport thật360x800/390x844/430x932, xoayngang/dọc, tự scale vừa vùng laptop và Tải lại. Outer preview không mount EntryGate/Providers/socket riêng; iframe dùng app/mobile compact và tài khoản hiện có, đổi cỡ không reload iframe. Không sửa geometry/avatar/bố cục khóa hoặc tách gameplay mobile. 3/3 tests preview/HTTP route/MobileHome PASS, typecheck/build PASS; HTTP live5173/mobile-preview và3001/api/health200, dist xác nhận. CUA và node_repl lỗi khởi động runtime nên chưa browser QA trực quan. Link dùng http://localhost:5173/mobile-preview hoặc3001/mobile-preview khi npm start.


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


- 2026-10-20: Hoàn tất yêu cầu trước kiểm tra VPS: stats mobile phần nới lên giảm28→16logical, giữ mép dưới; vùng preview danh hiệu flex-fill riêng compact để Chưa có danh hiệu ở giữa cả vùng, desktop giữh220. User chọn cấp thật: đã đối chiếu duy nhất Guest81416/publicID29622295, cấp39/39 qua AdminService/AdminRepository với equipfalse và UUID/lýdo/audit, DB readback39 sở hữu/0selected; gold/energy/avatar/stats khôngđổi. Đây là thay đổi dữ liệu Local được user cho phép, không liên quan VPS. Script tạm đãdọn. Build PASS dist index-85xgulgP.js; chưa browserQA.


- 2026-10-20: User báo Google khônglogin và Guest mới mỗi lần npm dev trênđiệnthoại. User xácnhận Chrome/Safari thường cùnghttp://192.168.1.12:5173. Đốichiếu Local2clientID có/match, productionfalse; live LAN /google/nonce200, cookie HttpOnly/Strict/Securefalse, không tạouser/đụngDB. Google official cấmrawIP/nonHTTPS trừloopback; thêm googleOriginError + GoogleSignInButton giải thích địa chỉkhônghỗtrợ, bỏ tảiSDK/nonce vònglặp trênLANIP, khôngfakeGoogle. Phát hiện restore bắt mọilỗi thànhentrynull: sửa restoreError và EntryGate Thửlại cho non401, chỉ401 thiếucredential mớiLogin; thànhcông/logout xóaerror. Khôngthaycookie/auth/backendDB.26/26 entry/origin/Googlebutton/device-service/verification PASS; typecheck/build PASS dist xácnhận. Chưa táihiện nickmới trênmáythật nên khôngkhẳngđịnh đãsửa nguyênnhân mấtcookie; cần thửlại đúngIP/browser sau reload. HTTPSdomain đãđăngkýGoogle cầnthiết choGloginđiệnthoại, khôngchỉthêmIPLAN vàoorigins.


- 2026-10-20: Theo ảnh user, thanh tiện ích Home mobile theo thứ tự Xếp hạng → Lịch sử → Bạn bè → Chat → Cửa hàng → Cài đặt → Toàn màn hình. Tái sử dụng HomeIcon/homeUtilityButton và home.fullscreen, chia 7 cột, nút co theo 11cqw tối đa48px. Chỉ mobile. Regression mobile-home 1/1 PASS, typecheck/build PASS; chưa browser QA.


- 2026-10-20: User bỏ Toàn màn hình riêng điện thoại; Home mobile còn 6 nút Xếp hạng → Lịch sử → Bạn bè → Chat → Cửa hàng → Cài đặt, chia đều 6 cột. Từ đây các yêu cầu UI hiện tại chỉ sửa mobile, giữ nguyên laptop. Không sửa component/hành vi desktop. Mobile-home 1/1 PASS; typecheck/build PASS, dist index-cbOcM9Cr.js cập nhật; chưa browser QA.


- 2026-10-20: CI/CD Local: .github/workflows/ci.yml push/PR master Node22, npmci/typecheck/fulltest/build và MySQL8 runner cô lập; deploy.yml chỉ manual exact SHA master có push CI success, Environment production, strict SSH hostkey, concurrency. deploy-vps.sh backup hook root-owned bắt buộc (chưa biết hệ thống backup VPS), build staging/snapshot/verify schema cả2bản, không DDL/restoreDB, health/rollback code chỉ khi reviewer xác nhận data-compatible; pending migration dừng và cần quy trình quản trị tạm quyền+finally/revoke riêng. Chưa push/SSH/deploy thật. Fulltest314PASS/59FAIL/17SKIP (giữCIđỏ), MySQLtạm17/17+migrate/rerun/verify/smoke PASS, Bashsyntax/typecheck/build PASS; LocalNode24, chưa nghiệmthu Node22/GitHub/Ubuntu/rollback. Chi tiết docs/CI-CD.md. Không đổi UI/game/auth hoặc DBproduction.


- 2026-10-20: Riêng Tùy chỉnh avatar trên compact/mobile: dùng khung/tỷ lệ Hồ sơ Thông tin (kích thước desktop giữ nguyên), tăng preview/avatar, tab, khu chọn và nút Hủy/Sử dụng. Không đổi các màn mobile/laptop khác. `npm.cmd run build` bị chặn bởi lỗi TypeScript có sẵn tests/ui.test.tsx:115 (createHiddenGame trong mock thiếu now/samples); chạy Vite build riêng thành công, dist index-BgsXXKMk.js đã cập nhật. Chưa browser QA hoặc chạy tests.

- 2026-10-20: Sửa chồng lấn Tùy chỉnh avatar mobile theo ảnh user: thay token 164/218/25 chưa được scale bằng token có sẵn/calc; preview dành đủ chỗ cho avatar+danh hiệu+sao và card cho wrap chỉ số. Tab icon trên/chữ dưới; lưới avatar/viền 3 cột ô vuông, ảnh tròn không kéo dọc, cuộn nội bộ. Desktop giữ cũ. Browser QA cô lập 360/390px PASS, ảnh outputs/avatar-mobile-fixed.png; không tạo Guest/ghi DB. npm build bị chặn lỗi có sẵn tests/ui.test.tsx:120 createHiddenGame thiếu 2 tham số; Vite build riêng PASS, dist index-0CzcSyC8.js xác nhận. Phạm vi Tùy chỉnh mobile khóa lại sau sửa.- 2026-10-20: Hoàn thiện Tùy chỉnh avatar mobile: preview/card không tràn tab, ảnh/lưới avatar và viền 3 cột vuông; tab icon trên chữ dưới và trạng thái Chưa có skin/Chưa có hiệu ứng riêng compact. Browser QA cô lập 360/390/430px PASS, đo ảnh rộng=cao và card không tràn; giữ nút Hủy/Sử dụng và cuộn nội bộ. 2/2 mobile-dialog-layout PASS, profile-rank-sync không chạy được do ENOENT file tạm sandbox khi import avatar.svg (retry 1worker vẫn lỗi). npm.cmd run build đầy đủ typecheck+Vite PASS, dist index-DS0Iu0Kq.js xác nhận. File mock ui.test đã được sửa từ thay đổi khác trong workspace, không phải task này. Đã dọn harness, không tạo Guest/ghi DB. Ảnh outputs/avatar-mobile-fixed.png và avatar-mobile-fixed-430.png. Laptop giữ nguyên; quyền chỉnh geometry riêng Tùy chỉnh mobile khóa lại sau task.
- 2026-10-20: Theo user, Tùy chỉnh avatar mobile khớp khung Thông tin và PlayerInfoCard: đổi cột180/gap/offset card-20 và căn dialog/biển. Browser390px đo dialog370x692.075 và card234x135 có tọa độ trùng hai màn. Nền riêng Tùy chỉnh cao270+170logical, mask65→100% mờ dần qua tab, ẩn che ngang. Avatar5cột/3hàng, ô vuông/ảnh tròn; viền giữ3cột. BrowserQA cô lập PASS, ảnh outputs/avatar-mobile-five-columns.png; không ghiDB/tạoGuest. npm.cmd run build typecheck+Vite PASS, dist index-DyeJAttY.js xác nhận. Desktop giữ nguyên, khóa lại phạm vi sau task.
- 2026-10-20: User chốt cố định avatar/name/background Tùy chỉnh mobile theo Thông tin. Sửa avatar wrapper bỏ căn giữa dọc, stretch/pt1 đúng chuẩn; nền lấy cùng chiều cao302logical/crop0%0%/mask với Thông tin, thay nền440logical riêng. Card giữ tọa độ chuẩn. BrowserQA390px đo avatar80x80/card234x135/scene346x151 và tọa độ trùng hoàn toàn hai màn. Giữ5cột3hàng avatar. npm.cmd run build typecheck+Vite PASS; dist index-K1515h_h.js xác nhận. Ảnh outputs/avatar-mobile-fixed-to-info.png; đã dọn harness, không ghiDB. Giữ desktop; khóa lại phạm vi sau sửa.
- 2026-10-20: User sửa danh sách avatar mobile còn4cột và nội dung bảng tên cố định như Thông tin. Rootcause ẩn editControl làm hàng địa chỉ giảm cao, toàn content justify-center dịch theo. Giữ slot nút/cờ ẩn bằng compact:contents/invisible/inert riêng Tùy chỉnh; desktop vẫn bỏ control như cũ. BrowserQA390px đo top/height cả5hàng tên/Elo/social/địa chỉ/ID trùng tuyệt đối hai màn; grid4cột74.6px. Build typecheck+Vite PASS, dist index-BxLMQDe_.js xác nhận; ảnh outputs/avatar-mobile-four-columns.png. Đã dọn harness, khôngDB. Khóa lại phạm vi Tùy chỉnh mobile sau task.
- 2026-10-20: Theo user bỏ nút và popup So sánh độ nét A/B/C trên cả điện thoại/laptop trong Tùy chỉnh avatar; dọn import/ref/state và test mở popup đã lỗi thời. Footer còn Hủy/Sử dụng. Build typecheck+Vite PASS, dist index-BZQ3FLWo.js xác nhận không còn nhãn/nội dung so sánh. Không chạy browserQA lượt xóa nút.
- 2026-10-20: Theo user, tab Chọn viền mobile đổi3cột sang4cột và3hàng trong viewport; các hàng tiếp cuộn nội bộ. Giữ ảnh viền vuông/tròn, desktop6cột3hàng. Aria-label trung tính Chọn khung avatar. npm.cmd run build typecheck+Vite PASS, dist index-dxRhlqhb.js xác nhận; chưa browserQA lượt này.
- 2026-10-21: Hoàn tất khung Danh hiệu mobile bằng Thông tin: browser390px đo370x692.075 cùngtop/left; mobile skin profile/sidebarHTML/catalog2cột để không kéo méo chữasset, popupchi tiết82%panelcăngiữa. Chữbadge dùngcenter50%/cqw, đẩybộđếm khỏi tên. Sửa plusPhongTặng do clientlọc lại endorsementCount trongpreview dùownedDB; dùngownedIds khiđăngnhập, giữservermax3/nhóm. BrowserQA transportmock PASS: owned/count0 chọn-bỏ, giới hạn3, đóng/mở giữcheck và previewhiện3badge; khôngghiDBuser. Typecheck+Vite buildPASS, dist index-WmLSGyiZ.js xácnhận; ảnh outputs/honors-mobile-fixed.png và honors-mobile-detail-fixed.png. DọnQA harness; desktopgiữlayoutcũ. ChưakiểmtraAPI/DBthật lượtfix.

- 2026-10-21: Hoàn tất sửa CI Local: phân loại59 lỗi ban đầu (28 harness/môi trường,25 kỳ vọng cũ,6 thông báo backend UTF8; xem docs/CI-TEST-AUDIT.md). Sửa literal RoomService/aria-label thứ tự chờ, test/harness/provider/fixture theo quy tắc hiện hành; không đổi engine/gameplay/auth/DB schema. User chọn OpeningCover600ms và cho bỏ A/B/C; giữ test file avatar-comparison, kiểm tra preview không tựequip/Hủy/Use đúng và một lần. Full cuối378PASS/0FAIL/17 gateDB (tổng395), MySQLtạm17/17+migrate30/rerun0/verify/smoke PASS; typecheck/build PASS dist index-WmLSGyiZ.js. Đối chiếu baseline không mấtfile/không giảmcase, skipgatesgiữnguyên; thêm5case, khôngskip/only/retry/tăngtimeout. Giới hạn1worker sau khi2worker còn timeout khôngổnđịnh. Chưa commit/push/SSH/VPS/deploy/browserQA; LocalNode24, GitHubNode22/Ubuntu chưachạy.

- 2026-10-21: Theo user, Danh hiệu mobile đưa tab nhóm lên hàng ngang trên có overflow-x-auto/touch-pan-x; danh sách3cột rộng90%panel, bỏ khoảngsidebar. Giữ desktop và cơ chế ownership/plus. Browser390px PASS: nav333px/content772px, tới tab cuối scrollLeft438.4 và đổi nhóm đúng;3cột107.675px/cùngtop225.2875. Typecheck+Vite build PASS, dist index-DpJ9aaRE.js xác nhận; ảnh outputs/honors-mobile-top-tabs.png. QA mocktransport khôngDB; dọn harness.


- 2026-10-21: Theo yêu cầu user, GamePage mobile bỏ lề/viền ngoài để bàn rộng bằng viewport khi đủ chiều cao, giữ tỷ lệ bàn và căn giữa màn hình. Người dùng (leftSide) sát trên, người thứ hai sát dưới qua grid 3 hàng cân nhau; user mở đúng vị trí hai PlayerCard mobile trong task này, giữ kích thước avatar và desktop, khóa lại vị trí sau task. Tiện ích gom dưới nút ba gạch dùng gameUtilityButton, Chat/người xem/hàng chờ chỉ hiện cùng menu. useBoardLayout dành 260px cho hai vùng người chơi, màn thấp vẫn co bàn để vừa. Typecheck/build PASS, dist cập nhật và xác nhận Menu bàn cờ; chưa browser QA trực quan.


- 2026-10-21: User sửa GamePage mobile: hai avatar cách mép trên/dưới viewport5px, bản thân ở trên; bỏ translate âm cũ của user/tên/clock mobile và neo hai card absolute để không phụ thuộc chiều cao hàng grid. Kích thước avatar giữ60px, quyền thay vị trí chỉ GamePage mobile và khóa lại sau task. Thoát vào menu, Toàn màn hình ẩn mobile, Ghim/Lưu hiện ngoài menu với điều kiện enable cũ. Desktop giữ bố cục. Typecheck/build PASS, dist cập nhật; chưa browser QA trên điện thoại thật.
- 2026-10-21: Theo ảnh/user khôi phục artwork Danh hiệu mobile, bỏ khung/tab CSS trơn. Crop nguyên bản honors-frame-tight thành frame/title/close/6tabảnh qua scriptPillow có maskalpha+tightbbox; frame nine-slice giữ góc, titleđỏvàng+tua và các hình cúp/phongtặng/kiếm/ván/online giữ tỷ lệ/màu. Giữ kíchthướcprofile, tabcuộnngang/catalog3cột/plusownership; desktopảnhnguồngiữ. Browser390px PASS: 6tabảnh wrapper150px=img150px, nav333/content940 scrollLeft607.2 tớiOnline; chọnKỳĐạo quaPhongTặng PASS (transportmock, khôngDB). ĐãxemPNG/bboxassert9asset; typecheck+Vite buildPASS, dist index-AhRbN2D7.js +9mobilePNG xácnhận. Ảnh outputs/honors-mobile-original-art.png; dọnQA harness. Crop/provenance ở src/assets/profile/honors/mobile-artwork.md.
- 2026-10-21: Theo user thu nhỏ tabảnh Danh hiệu mobile150→120px (~20%), giữ hình/tỷlệ/cuộnngang. ĐưaẨn cạnhX(top8/right40px), dịch biển ảnh header vềtâm35%/rộng66% chừavùngnút. Desktopgiữnguyên. npm.cmd run build typecheck+VitePASS, dist index-gUNOySJt.js xácnhận; chưa browserQA lượtstyle này.


- 2026-10-21: User chốt vị trí GamePage mobile: avatar trên bên trái cách mép10px, avatar dưới đối xứng bên phải cách mép10px, thông tin nằm phía trong đối diện avatar. Giữ mép trên/dưới5px và kích thước60px đã chốt, desktop giữ nguyên. Quyền chỉnh đúng vị trí mobile task này, khóa lại sau task. Typecheck/build PASS, dist cập nhật; chưa browser QA trực quan.


- 2026-10-21: Theo user, GamePage mobile tăng mép trên/dưới avatar5→15px; user z40 trên lớp trang trí z10. Thanh tiện ích chuyển xuống trái10px/bottom25px (căn giữa avatar dưới60px/bottom15px), thứ tự ba gạch→Ghim→Lưu; nút mobile40px/gap8 để vừa cạnh card188px ở viewport360px, menu bung lên trên. Desktop giữ thứ tự/kích thước cũ. Quyền chỉnh đúng mobile task này, khóa lại sau task. Build/typecheck PASS, dist cập nhật; chưa browser QA trực quan.

- 2026-10-21: Backup Adapter cho CI/CD theo VPS user xác nhận: cotuong-backup.sh/service -> OnSuccess cloud service, cotuong-YYYY-MM-DD_HH-MM-SS.sql.gz. Thêm Python stdlib root-only hook2action, gzip/SQL markers/SHA256/age/newfile gate, đợi local và lần cloud mới hoàn tất; không đổi backup cũ, không SQL/restore/productiondeploy. Sudoers exact commands, hướng dẫn cài/audit/VM staging/restore drill tại docs/BACKUP-ADAPTER.md. Gate tạo mới trước activate sau prepare/snapshot; workflow dùng script từ trusted checkout, kiểm port1..65535.25 adapter tests PASS bằng fixture/mock, Bash syntax PASS, npm.cmd run build(typecheck+Vite)PASS dist index-BqK419Up.js. Chưa nghiệmthu Ubuntu/systemd/sudo/Drive/restore, chưa SSH/cài/push/deploy; gzip và cloud exit0 không chứng minh restore hoặc remotechecksum. Reviewer phải kiểm bằng chứng offsite/restore riêng trước duyệt.

- 2026-10-21: Bộ chọn địa chỉ mobile giữ offset -6px của khung Thông tin; nút quay lại icon-only lớn hơn, bỏ nhãn/lưu ý sát nhóm Hủy/Tiếp trên mobile, ưu tiên Việt Nam/Trung Quốc ở đầu danh sách. Luôn cần hai lần chạm cùng quốc gia/tỉnh, kể cả mục đã chọn sẵn; Việt Nam chuyển sang tỉnh, nước khác lưu địa chỉ, tỉnh chuyển sang xã/phường. Desktop giữ luồng nút cũ. Tìm kiếm cao56/chữ18, tên khu vực18. `npm.cmd run build` sau sửa kiểu dữ liệu PASS (typecheck + Vite); dist `index-KKA5uGGj.js` xác nhận. Chưa browser QA.
- 2026-10-21: Home mobile: nameplate rộng37cqw bằng cụm hai ô Elo; giữ chiều cao27px, padding17px và chữ17px theo nameplate128px trong phòng. Cup banner dùng tỷ lệ17cqw/container như laptop. Chỉ MobileHome đổi; build sẽ chạy cho lượt này, chưa browser QA.


- 2026-10-21: User chỉnh nhận diện GamePage mobile: nameplate120→144px/chữ tăng theo tỷ lệ, số trong tên override1em thay0.9em; Elo rộng144px bằng nameplate. Hai card rộng212px, grid đảo cột bên dưới; avatar60px căn giữa theo hàng tên+Elo, thông tin/clock/actions giữ riêng. ViewersButton luôn hiện ở góc trên phải10px/top15px thay nằm trong menu; Chat/hàng chờ vẫn theo menu. Thanh3nút mobile36px/gap6 để không đè card212px ở360px. Desktop giữ nguyên; quyền chỉnh geometry đúng mobile task này, khóa lại sau sửa. Typecheck/build PASS, dist cập nhật; chưa browser QA trực quan.


- 2026-10-21: User tinh chỉnh GamePage mobile: khung tên144→132px/card212→200px; Elo bỏ width144, ôm nội dung với padding ngang5px. ViewersButton h26/minwidth48, icon24x18/số13px; useBoardLayout đo tâm data-player-identity bằng ResizeObserver, truyền CSS var để căn dọc nút theo tên/Elo. Ba nút dưới36→40px/gap6 giữ thứ tự ba gạch/Ghim/Lưu. Desktop giữ nguyên, geometry mobile chốt lại sau task. Typecheck/build PASS; dist xác nhận token132px/40px/viewer center. Chưa browser QA trực quan.


- 2026-10-21: User chỉnh GamePage mobile: card dưới đảo identity/avatar xuống hàng2, clock lên hàng1 để cân mép nhận diện với card trên15px. Elo padding ngang10px; 3nút dưới44px/gap4. Sửa stacking: main compact isolate, scene compact isolation:auto/nền transparent cho user z80/60 thật sự trên decoration z10; wrapper user pointer-events:none/card auto tránh chặn nút. View panel neo ngay dưới mắt (tâm+22px)/right10/width280/z100 trong nhánh user trênz80, footer mắt z90 giữ toggle trên panel. Thẻ view/chờ mobile36px, avatar24px, tên14px/sốchờ20px, padding/gap nhỏ; nền panel gần đục. Desktop giữ nguyên. Quyền user mở đúng geometry mobile task này, khóa lại sau task. Typecheck/build PASS, dist cập nhật; chưa browser QA trực quan.

- 2026-10-21: User yêu cầu sửa lệch bảng Danh hiệu mobile, nútẨn chỉ nằm cạnhX và nâng tab. HonorsFrame giữ kíchthước/vịtrí bằngThôngtin; căn biển ảnh về50%, rộng50% để chừa gócphải. Mobile chia grid48px header/rowtab ảnh cuộnngang/content minmax0 thay top12%/24% theo chiều cao. NútẨn compact riêng catalog26x15, neo cạnhX, không đẩy tiêuđề; X ôm sát ảnh28px. Giữartworkgốc/tab120px/catalog3cột/desktop/ownership. npm.cmd run build(typecheck+Vite) PASS, dist index-B-q8DOiP.js cậpnhật; chưa browserQA trựcquan, không chạytest ởtaskUI này.

- 2026-10-21: Theo user tinh chỉnh Danh hiệu mobile: nâng hàngtab thêm10px (header48→38), nútẨn nâng6px và to30x18/nhãn13px, biểnDanhhiệu rộng50→54% nâng4px; catalog đổi2cột (thay quy tắc3cột mobile trước), desktop vẫn3cột. Giữ artwork/tabảnh cuộn và khung bằngThôngtin. npm.cmd run build(typecheck+Vite) PASS, dist cậpnhật/xácnhận2cột/header38px. Chưa browserQA trựcquan.


- 2026-10-21: User tinh chỉnh GamePage mobile: avatar60→64px (danh hiệu/sao kế thừa tỷ lệ cùng avatar), cột64px giữ card200px; nameplate132→128px, sốtên1em→0.9em. Elo khung cao30→28, giữ padding ngang10, icon15→18/số13→15, gap6→3px. Ghim chỉ ẩn mobile, thay bằng nút Chat44px dùng gameUtilityButton/HomeIcon messages, thứ tự menu/Chat/Lưu; nối toggle bảngchat hiện có, aria expanded/controls, gỡ nút Chat phụ trong menu. Chat chỉ xuất hiện nơi hỗ trợ chat hiện hành, không tạo chat máy/replay. Desktop giữ nguyên. Quyền user mở đúng nhận diện mobile task này, khóa lại sau sửa. Typecheck/build PASS, dist cập nhật; chưa browser QA trực quan.

- 2026-10-21: User chỉnh Danh hiệu mobile: nútX tăng28→32px, top-1px để tâm vòngX ngang tâmẨn(top6+9px); Ẩn cáchphải42px. Danh sách2cột chặn overflowx/touch-pan-y, thanhnhóm vẫncuộnngang. TabTấtcả bỏ ảnhbaked-selected, dựng bảnthường bằng đúng nền/icon/chữ của desktop. Mọi tab dùng honorsSelectionFrame/mix-blend-lighten cùngdesktop khi chọn, bỏdrop-shadow riêngmobile. Khôngđổi desktop/ownership. npm.cmd run build(typecheck+Vite) PASS, dist index-D-4IAtxZ.js xácnhận. Chưa browserQA trựcquan.


- 2026-10-21: User chốt Chat GamePage mobile mở phủ phần dưới: wrapper fixed inset-x0/bottom0/fullwidth, cao khoảng trống dưới bàn +45% chiều cao bàn (CSS calc((100dvh-boardHeight)/2+boardHeight*.45)); Chat h-full/nền gần đục phủ user/nút phía dưới, desktop giữ layout cũ. Bấm Chat mở tự expand nếu collapsed, đóng menu/người xem; giữ danh sách tin nhắn flex phía trên và form/icon mt-auto/shrink0 phía dưới, cuộn nội bộ. Không sửa socket/chat data. Typecheck/build PASS, dist xác nhận fullwidth/bottom0 và công thức CSS đã biên dịch; chưa browser QA trực quan.

- 2026-10-21: User báo viềnsángtab khôngphủhết/chữPhongTặnglệch mobile. Overlaytab dùng116%x140%, left-8/top-20 theo tỷlệdesktop để bù alpha. PhongTặng dùng helperanchor chung theo tâmnềntímảnh1500x500, centerY cấp1..5=285/270/265/250/250 vàscaleY1.36, áp compact vào catalog/preview/detail; giữ tọađộdesktop, lineheightmobile1.1 để chữ giữa ô. Không đổi artwork/ownership/số cột. npm.cmd run build(typecheck+Vite) PASS, dist index-BJ45t_Wi.js xácnhận overlay/anchor. Chưa browserQA trựcquan.


- 2026-10-21: User chốt Chat mobile bỏ mũi tên thu/mở (desktop giữ), bỏ nútĐóng; useMobileChatOverlay đóng khi pointerdown ngoài container, bỏqua nútChat, blur ô nhập và dọn listener. Khung giữ chiều cao từ trước bànphím, neo đáy theo visualViewport.height/offsetTop và layout viewport, clamp trong vùng nhìn thấy; resize gửi tin không tính lại chiều cao. Giữ focus trước gửi/preventScroll, chặn pointerdown nútform lấyfocus, không focus lại sau async trênmobile; Enter/send xửlý riêng không đụng IME, input16px tránh autozoom. Desktop giữ luồng cũ.3/3 hook regression PASS (viewport/giữheight/rerender/đóngngoài/cleanup/layoutresize), typecheck/build PASS, dist xác nhận. Chưa QA bàn phím Chrome/Safari trênđiệnthoạithật; tests môphỏng viewport không thay nghiệmthu thiếtbị.

- 2026-10-21: User yêu cầu căn giữa VinhQuangKỳĐài và danhhiệucấp1 của3tabcuối mobile. Thêm anchor dùngchung catalog/preview/detail: Arena tâmvùngđỏ từảnh2172x724 Y383/385.5/379.5 theo3cấp +scale1.16; progresscấp1 tâm theo crop (lienthang200/368, games195/360, attendance188/363), quyđổi offsetcqw theo artworkscale để bỏ lệch pixelcốđịnh khi co màn. Lineheightmobile1.1, chỉprogresscấp1 đổi; desktop/cấpthấp/artwork/ownership/cột giữnguyên. npm.cmd run build(typecheck+Vite) PASS, dist index-CxGZkxOW.js xácnhận anchor. Chưa browserQA trựcquan, không chạytest taskUI.


- 2026-10-21: User nhấn mạnh chat phủ mọi phần game mobile: sửa đúng stacking ancestor user dưới, khi mobileChatOpen nâng parent60→200, chat con100; cao hơn user trên80/người xem80/footer90/toolbar50. Giữ viewport keyboard/outsideclose. User dưới nâng bottom15→25px. Căn name/Elo cùng tâm ngang (Elo mxauto), hàng identity selfcenter theo nhóm avatar+title+stars: dành thêm20px dưới avatar64 để bố cục tính phần badge/star vốn absolute; không đổi asset/token danh hiệu. Desktop giữ nguyên; quyền chỉnh nhận diện mobile task này, khóa lại sau task.3/3 mobile-chat-overlay regression PASS; typecheck/build PASS, dist xác nhận. Chưa browser QA trực quan.

- 2026-10-21: User chỉ rõ chữ cấp1 của3tabcuối vẫn lệch riêngThôngtindanhhiệu mobile. HonorDetailSprite nhậnmobileTitle, đặt chữ trực tiếp trong cùng boxcrop/scale vớiảnh, top theo getProgressHonorNameplateCenter dùngchung; ẩn lớpchữngoài riêngcompact khi cấp1 để khôngđè2lớp. Catalog/preview/desktop/cấpthấp giữnguyên; không offset thêm trên panel. npm.cmd run build(typecheck+Vite) PASS, dist index-DZntP1Q5.js xácnhận mobileTitle. Chưa browserQA trựcquan.


- 2026-10-21: User chỉnh GamePage mobile: bảngemoji6→24 biểu cảm (18mới chỉmobile), chạm/focus ô nhập gọi closePicker để đóng bảngicon/gợiý kểcả input đãfocus; giữ chọnemoji và keyboard flow. User dưới hạ5px (bottom25→20), Elo trên mx0 căn trái name128, Elo dưới margin-leftauto căn phải. Giãn3nút từgap4 lên tốiđa8 bằng clamp theo viewport để khôngđè carduser ở360px. Menu mở nâng ancestor header lênz300 vượt user80/60, chat200, footer90; đóng về50. Desktop giữ UI/bộemoji cũ. Quyền user chỉnh đúngmobile tasknày, khóa lại sautask. npm.cmd run build(typecheck+Vite) PASS, dist xácnhận; chưa browserQA trựcquan, không chạy thêmtest cho tinhchỉnhUI này.


- 2026-10-21: User yêu cầu sao to hơn trên điện thoại và laptop/toàn project. Thêm RANK_STAR_SIZE_SCALE1.08 ở playerIdentityLayout; starWidth25→27cqw (+8%), gap1.5 giữ, 3ô78→84% vùng cốđịnh, giữneo/topleft/điềntrái→phải. RankStars chung tự cập nhật Home/mobileHome/GamePage/Profile/Tùychỉnh/Bạnbè/Xếphạng/Tinnhắn/lờimời; sao máy ảnhriêng dùng cùng token108%/căn giữa thay100%. Giữ avatar/ảnhdanhhiệu/bố cục/luậtElo. Đồng bộ AGENTS/RANK-SYSTEM/FRIENDS-UI-RULES/UI-IMAGE-RENDERING. npm.cmd run build(typecheck+Vite) PASS, dist xácnhận token27 và scale1.08. Không chạy thêmtest cho thayđổi kíchthước UI này; chưa browserQA trựcquan.

- 2026-10-21: User chuyển sang danhhiệu hiểnthịtrựctiếp trongThôngtinuser mobile, yêu cầu cănchữ. ProfileHonorPreviewBadge cho3nhánh dùngcanvas3:1 cục bộ căn giữa hàng đểảnh/chữ dùngchunghệ tọađộ, không căn theo chiều cao gridrow co giãn. Progresspreview dùng mobileTitle trongboxcrop cho mọicấp, ẩn lớpchữngoài compact; Arena dùnganchor vùngđỏ, PhongTặng labelcompacth-auto căn giữa vùngtím. Desktop/catalog/chi tiết/ownership/khungavatar giữnguyên. npm.cmd run build(typecheck+Vite) PASS, dist index-B2wQ1XUV.js xácnhận canvas. Chưa browserQA trựcquan.


- 2026-10-21: User yêu cầu sao to thêm toàn project/mobile+laptop. Token RANK_STAR_SIZE_SCALE1.08→1.16: sao27→29cqw (thêm7.4% so với lượt trước, tổng16% so gốc25), 3ô90%/gap1.5, saoAI116% cùng token. Giữ anchor/avatar/danhhiệu/luật. Đồng bộ tài liệu chuẩn. npm.cmd run build(typecheck+Vite) PASS, dist xácnhận scale1.16; chưa browserQA trựcquan, không thêmtest cho tăngsize.

- 2026-10-21: User báo popupThôngtindanhhiệu khi bấm danhhiệuởThôngtinuser bịlệch mobile. Nhánh standalone HonorDetailPopover override compact left/top50%, width min(82vw,54dvh), transformtranslate(-50%,-50%) important để không dùnganchorX/side vàwidthphầnmép desktop. Neo giữviewportdialog, đồngbộmọidanhhiệu/ô; desktop/catalog/selection/đóngpopupgiữnguyên. npm.cmd run build(typecheck+Vite) PASS, dist index-jN4DHDKI.js xácnhận CSS centering!important. Chưa browserQA trựcquan.


- 2026-10-21: User yêu cầu sao to thêm và gần nhau toànproject/mobile+laptop. Scale1.16→1.24, sao29→31cqw (+6.9% so trước), gap1.5→0.5cqw (giảm2/3), 3ô94% vùngcốđịnh giữneo/hướngđiền. Artworkmáy mộtngôisao trangtrí tăng124% theo tokenchung. Đồngbộ tài liệu chuẩn, khôngđổi avatar/danhhiệu/luật. npm.cmd run build(typecheck+Vite) PASS, dist xácnhận scale1.24/gap0.5; chưa browserQA trựcquan, không thêmtest cho chỉnhsize/gap.
# 2026-10-21
- Cố định bảng Thông tin danh hiệu mở từ hồ sơ theo viewport ở compact để không dịch chuyển khi bấm các danh hiệu khác; giữ khung Thông tin và scene background nguyên vị trí trước/sau khi mở. Desktop vẫn neo cạnh danh hiệu đã chọn.

# 2026-10-21
- Icon sao chép ID trong PlayerInfoCard giữ SVG14px/vùng bấm20px và nâng6px theo yêu cầu; áp dụng chung Thông tin và Tùy chỉnh avatar.

# 2026-10-21
- Home: hạ cụm Elo mobile từ top11cqw xuống13cqw để tách rõ khỏi thẻ tên. Gom cúp giải đấu laptop/mobile vào TournamentCup dùng chung, giữ nguyên emoji/vị trí/hiệu ứng của laptop. `npm.cmd run build` PASS (typecheck + Vite); dist `index-BdGGI5ki.js` xác nhận class top13cqw và cúp dùng chung. Còn cảnh báo chunk JS lớn vốn có; chưa browser QA.

# 2026-10-21
- Home mobile tinh chỉnh theo phản hồi: Elo từ top13cqw lên12cqw; tăng ô Elo cao5.5→6cqw, icon3.5→3.8cqw và số3→3.3cqw. `npm.cmd run build` PASS (typecheck + Vite); dist `index-DclsWNwh.js` xác nhận các class mới. Cảnh báo chunk JS lớn; chưa browser QA.

- 2026-10-21: Sửa cúp Home khác hình trên điện thoại do glyph emoji theo hệ điều hành. TournamentCup dùng PNG RGBA render đúng glyph Segoe UI Emoji của laptop Windows, tight-crop209×253; giữ cao17cqw/vị trí/filter và dùng chung laptop/mobile. Đã xem ảnh, kiểm tra alpha bbox sát4cạnh, ghi nguồn asset. `npm.cmd run build` PASS (typecheck + Vite), dist index-D9D2uOM_.js trỏ tournament-cup-windows-CgfwwHW7.png. Chưa QA trên điện thoại thật.

# 2026-10-21
- GamePage mobile: khung tên người trên dịch trái3px, người dưới dịch phải3px; đồng hồ/avatar giữ nguyên. Build/typecheck và dist sẽ được kiểm tra trong lượt này.
- Năng lượng vô hạn cho public ID29622295 và96161606: server entitlement theo public ID, bypass trừ/kiểm tra năng lượng online và máy thử; frontend bypass gate và hiển thị∞. Số dư DB giữ nguyên. Typecheck/build sẽ chạy; chưa QA đăng nhập hai tài khoản thật.
- GamePage mobile: Like được tách ra khỏi khung đồng hồ, cách khung8px và tăng đường kính24→27px/icon14→17px. Đồng hồ/desktop giữ nguyên. Build/typecheck sẽ chạy; chưa browser QA.
- GamePage mobile: cố định icon Chat tại top18px/right62px khi mở/đóng panel; giữ placeholder trong hàng công cụ để các icon cạnh nó không xê dịch. Build/typecheck sẽ chạy; chưa browser QA.
- GamePage: bỏ hộp xác nhận khi rời phòng lúc đang chơi; mobile thu Like còn24px, đặt cạnh đồng hồ với khoảng cách8px ở cả hai thẻ, đồng hồ dùng khung viền riêng thay khung Elo. Build/typecheck sẽ chạy; chưa browser QA.
- GamePage mobile: khi mở View, bảng người xem lên z500 phủ các lớp giao diện; chat mở cũng lên z500. Mở một panel sẽ đóng panel/menu kia. Typecheck/build sẽ chạy trong task này; chưa browser QA.
- GamePage mobile: chuyển nút View xuống góc dưới trái, cách đáy20px như cụm tiện ích; bảng người xem neo ngay phía trên nút để mở từ vị trí đó. Desktop giữ nguyên. Typecheck/build sẽ chạy trong task này; chưa browser QA.
- Home mobile: nameplate mở rộng thành 37cqw để rộng bằng cụm hai thẻ Elo bên dưới; giữ nguyên kích thước chữ, chiều cao và padding. Build `npm.cmd run build` PASS (typecheck + Vite), `dist/assets/index-CUN-BrYH.js` có class mới. Chưa kiểm tra trực quan trên thiết bị.
# 2026-10-21
- Sửa Google Sign-In trên IP LAN: ẩn nút fallback giả khi origin không được Google hỗ trợ, giữ thông báo lý do và nút thoát. Chưa thêm đăng nhập Google cho IP LAN; cần domain HTTPS đăng ký với Google.

# 2026-10-21
- Bộ chọn địa chỉ: giữ kích thước/scene như khung Thông tin, không autofocus; bỏ qua resize giảm chiều cao khi input focus và thêm nút back icon thống nhất cho bước quốc gia/tỉnh/xã.


- 2026-10-21: GamePage mobile: cụm Hoàn tác/Cầu hòa/Xin thua được căn theo tâm khung tên/Elo người dưới bằng ResizeObserver, đặt sát bên trái khung user; View ở góc trái, nâng lên bottom130px. Không đổi card/avatar hay giao diện laptop. Build chạy sau cập nhật.

- 2026-10-21: Animation đi quân mobile: cung bay liên tục17 mốc transform3d, hạ liền mạch thay dừng ở90% rồi rơi; giữ400ms. Test animation4/4 PASS (chạy lại ngoài sandbox sau lỗi cache ENOENT); typecheck/build PASS; dist index-D4ToDNK1.js xác nhận easing mới. Chưa QA trên điện thoại thật.

- 2026-10-21: Tối ưu animation mobile lần2: bỏ cung17 mốc, dùng lại nhịp400ms của laptop; chuẩn bị lớp chuyển động bằng will-change và tách lớp artwork/filter bằng transform-gpu trên compact. Test animation4/4 PASS, typecheck/build PASS; dist xác nhận class mới. Chưa profile/QA điện thoại thật nên chưa xác nhận hết giật.

- 2026-10-21: Sửa Like không lưu khi đang đấu: snapshot công bố activeMatchId từ RoomPersistence; GamePage dùng ID này thay mã ván cũ/online tạm; repository nhận ván server_online playing/finished. Local không gọi API UUID. Regression mock4/4 PASS, typecheck/build PASS; dist xác nhận activeMatchId. Chưa QA hai tài khoản/DB thật. Backend cần nạp lại code mới.

- 2026-10-22: PlayerCard sửa flex ghi đè hidden: lúc chưa đấu hiện tên/Elo, ẩn clock; bắt đầu mới hiện clock/thay Elo. Áp dụng hai card, mobile/desktop. Test hiện có4/4 PASS, typecheck/build PASS, dist CSS xác nhận [hidden] display:none!important. Chưa browser QA.

- 2026-10-22: Giảm tải chiếu bí mobile: giữ filter sprite/blur bóng tĩnh thay animate đồng loạt; nâng/hạ và bóng transform/opacity vẫn chạy, desktop giữ nguyên. Completion animation.finished/hit/audio giữ nguyên. Test kết quả+animation13/13 PASS; typecheck/build PASS; dist xác nhận nhánh mobile. Chưa đo FPS/QA điện thoại thật.

- 2026-10-22: Theo yêu cầu mới, App key GamePage theo room và socket hai ghế; đổi/trống ghế unmount toàn phiên hiệu ứng (audio/Board/intro/faces/timer/popup). Không replay mate/faces khi mount finished; Like bubble track/cancel WAAPI; sửa cleanup Board nhánh timer đã bắt đầu để hủy lift/hit và callback cũ. Quy tắc này thay giữ popup qua queue rotation. Regression27/27 PASS, typecheck/build PASS, dist xác nhận callback hủy. Chưa browser QA luồng hai tài khoản.

- 2026-10-22: Tối ưu hiệu ứng laptop: chuẩn bị lớp compositing của quân ở mọi breakpoint; chiếu bí bỏ animation filter/blur đồng loạt, giữ nâng/hạ+bóng transform/opacity và filter artwork tĩnh. Giữ cleanup khi đổi ghế/gate audio. Regression25/25 PASS (thêm kiểm tra keyframe không filter), typecheck/build PASS; dist xác nhận lớp desktop. Chưa browser QA/profile FPS nên chưa xác nhận độ mượt thực tế.

- 2026-10-22: Bỏ mở lại bàn do người khác vào/đổi ghế: App giữ room entrance identity riêng với seat presentation key; GamePage skipEntrance, useRoomEntrance enabled=false cho remount cùng phòng. Lần vào phòng mới vẫn opening. Board đi/ăn quân hạ liên tục33 mốc thay tới90% rồi rơi40ms, giữ400ms/đích/cleanup. Test26/26 PASS gồm opening và landing; typecheck/build PASS; dist xác nhận skipEntrance+33mốc. Chưa browser QA/profile FPS thực tế.

- 2026-10-22: Mỗi ván thường chọn ngẫu nhiên Đỏ/Đen đi trước khi start. Online chọn tại server crypto random khi hai người Ready hoặc countdown; reset chọn lại. Local gameStore chọn khi bắt đầu; custom FEN giữ lượt đã thiết lập. Computer dùng cùng starter; gửi firstTurn cho Pikafish và dựng FEN side-to-move khi Đen mở, giữ testBot Đỏ mở theo ngoại lệ. Typecheck/build PASS; dist xác nhận local random starter. Không chạy tests theo giới hạn lượt này; chưa QA hai thiết bị/browser.

- 2026-10-22: Đính chính luồng đi tiên: RoomService mặc định crypto random0/1, không còn default Đỏ phụ thuộc app inject. Bốc một lần lúc Ready đủ2 hoặc countdown bắt đầu; chọn lại ván sau, snapshot/tick không bốc lại. 60/60 test PASS gồm2người/đen đi đầu/chặn người còn lại/ván kế/auto-start; typecheck/build PASS, dist starter integration xác nhận. Chưa QA browser; API local3001 không truy cập được trong môi trường, không restart backend đang dùng.

- 2026-10-22: Đính chính đi tiên theo user: RoomService.startMatch bốc NGƯỜI cầm Đỏ, người còn lại Đen; currentTurn luôn Đỏ. Dùng chung Ready/autostart, bốc lại ván sau; persistence/history lấy phe đã chia. App key theo cặp ID sort tránh remount khi đổi màu cùng2người. Gỡ random turn local/Pikafish và API firstTurn sai yêu cầu, FEN giữ lượt cấu hình. 62/62 service regression PASS; typecheck/build PASS; dist xác nhận pair identity mới. Chưa QA hai browser/backend live.
