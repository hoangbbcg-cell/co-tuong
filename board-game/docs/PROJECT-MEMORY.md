# Ghi nhớ quy tắc và lỗi cần tránh

- 2026-10-21: User thu tabảnh Danh hiệu mobile150→120px (giữratio/artwork/cuộn) và đưaẨn cạnhX: top8px/right40px, Xgiữtop0/right0. Biển ảnh header rộng66%/tâm35% để chừa vùng điều khiển bênphải, khôngđènhau. Desktopgiữnguyên.

- 2026-10-21: User không chấp nhận khung/tab Danh hiệu mobile bằng CSS đơn giản. Phải giữ artwork gốc: viền vàng/góc trang trí, bảng tên đỏ Danh hiệu, nútX/tua và tab có icon+chữ. Dùng crop từ honors-frame-tight.png qua scripts/crop-honors-mobile.py; frame nine-slice giữ góc, title/tab giữ tỷ lệ/alpha tight. Tab vẫn ngang/cuộn, catalog3cột; desktop nguồn gốc giữ nguyên. Quy tắc này thay skin profile/sidebarHTML/khung trơn ở ghi chú cũ.

- 2026-10-21: User chốt catalog Danh hiệu mobile: các nhóm nằm hàng ngang phía trên, không đủ chỗ thì vuốt/cuộn ngang; bỏ sidebar mobile. Danh sách3danhhiệu/hàng, dùng gần hết chiều ngang panel; thay catalog2cột ở ghi chú trước. Desktop giữ sidebar/layout cũ. Giữ thứ tự nhóm và ownership/chọn hồ sơ.

- 2026-10-21: User yêu cầu khung Danh hiệu mobile bằng Thông tin và chữ căn giữa. Catalog dùng đúng width/height/translate của profile, nền khung mobile riêng theo skin profile để không kéo méo chữ sidebar raster; catalog2cột, detail82%panel căn giữa, desktop giữ cũ. Sửa dấu cộng Phong Tặng: previewHonors trước lọc endorsementCount dù DBđãcấp, làm dấu chọn/preview mất. Tài khoản nay lọc theo ownedIds; legacykhôngaccount giữngưỡngcũ. Không sửa DB/giả endorsement. BrowserQA mocktransport xác nhận sở hữu/count0 chọn-bỏ/đóngmở/preview và tối đa3/nhóm; frame390px370x692.075 tọađộ trùngThôngtin.

- 2026-10-20: User chốt lưới Chọn viền mobile4cột/3hàng nhìn thấy, các viền tiếp theo cuộn nội bộ; thay3cột cũ. Artwork viền vẫn giữ aspect vuông/tròn. Desktop giữ6cột/3hàng.

- 2026-10-20: User yêu cầu bỏ So sánh độ nét A/B/C khỏi Tùy chỉnh avatar trên cả mobile và laptop. Không đưa lại nút hoặc popup so sánh vào giao diện. Footer chỉ còn Hủy/Sử dụng.

- 2026-10-20: User chốt danh sách avatar mobile4cột (thay5), giữ desktop. Nội dung trong PlayerInfoCard của Tùy chỉnh phải trùng từng dòng với Thông tin: khi ẩn nút/cờ địa chỉ giữ placeholder compact:contents/invisible/inert để hàng địa chỉ không giảm chiều cao và làm toàn card justify-center nhảy. Không chỉ đo viền ngoài; đối chiếu top/height tên/Elo/social/địa chỉ/ID. Browser390px cả5hàng trùng hoàn toàn sau sửa.

- 2026-10-20: User yêu cầu cố định toàn bộ nhận diện Tùy chỉnh mobile theo Thông tin: avatar cùng vị trí top/left (wrapper stretch/justify-start/pt1), card cùng tọa độ, nền cùng crop/object-position0%0% và height270+32logical/mask65→100%. Quy tắc này thay nền270+170 riêng Tùy chỉnh ở ghi chú trước; không kéo cao ảnh làm đổi góc crop. Browser390px đo avatar80x80, card234x135, scene346x151 và mọi tọa độ trùng hai màn. Giữ danh sách avatar5cột/3hàng và desktop.

- 2026-10-20: User chốt Tùy chỉnh avatar mobile phải bằng khung Thông tin, dùng cùng PlayerInfoCard/kích thước/vị trí khung tên (cột avatar180, card270/translateY-20 logical). Dialog và biển căn như Thông tin. Nền cảnh kéo xuống qua tab rồi mask black65%→transparent100%, riêng Tùy chỉnh cao270+170logical, tắt lớp che ngang ở compact. Danh sách avatar 5 cột × 3 hàng, ô/ảnh giữ vuông/tròn; thay yêu cầu tạm3cột avatar ở ghi chú trước. Viền vẫn3cột. Desktop giữ cũ.

- 2026-10-20: Lỗi Tùy chỉnh avatar mobile đè tab: các biến --ui-p-164/218/25 chưa có trong PIXEL_SIZES nên fallback thành px không co theo dialog. Trong consumer dùng token đã có và calc theo tỷ lệ; không mặc định fallback px sẽ được scale. Preview phải dành đủ chỗ cho cả avatar/danh hiệu/sao; card mobile cho các chỉ số xuống dòng. Lưới avatar/viền mobile dùng 3 cột, ô vuông, ảnh tròn giữ aspect và cuộn trong vùng chọn; desktop giữ cấu hình cũ. Đây là sửa lỗi trong phạm vi Tùy chỉnh mobile user yêu cầu.

- 2026-10-19: User chốt bảngthưởng chỉhiện sauhếtchiếubí. GameSounds.start trảpromise onended, playCheckmate chờ main+introTwo; useMoveSound báo checkmateAudioComplete theo key nướcván, xửlý snapshot chỉđổiresult/bỏcompletion instancecũ. useMatchResult gate cảaudio vàcallbackBoard hình. Máygiảresign2nước thêm matepresentation qua soundResult/GamePage, khôngđổi backend/PvP.25 targeted tests PASS (23sound/result/testbot+2computerUI), typecheck/build PASS dist index-CmGDITaT.js. Lần chạyrộng ui.test.tsx có20case fail (mock HomeMusic.play undefined/.catch vàflowUIcũ), khôngtuyênbố fullsuitegreen; cậpnhật mockaudioComplete/testintro cũ4→2 đúng cùngclockhiệnhành, khôngđổi intro runtime. Chrome isolated GamePage+WebAudio thật/autoplayallowed/snapshot máygiả: start3726.3/end4562.3/popup4822.8ms, popup sauaudio và~1.1s từmate; khôngDBuser, harness/browserđãdọn.

- 2026-10-19: User xem ảnh thưởng+128vàng và ô sốdư đểchỉnhUI: MatchResultDialog thêm gold-icon-v2 dùngchungHome cạnh số+thưởng; chữ số đổi font-number/TimesNewRoman, normal/lining/tabular giống ôgoldHome. Bỏ từvàngtrựcquan (iconthaynhãn), aria-label Nhận N vàng. Giữ sốthưởngAPI vàmàunâu/cỡ/vịtríô, không đổi mức thưởng thành sốdưtrongảnh. Typecheck/build PASS, dist xácnhận; chưa browserQA lượtstyle này.

- 2026-10-19: Máy giả thử thưởng theo yêu cầu user,2nút Home xiangqi/jieqi, Đỏ đi2nước hợp lệ thắng do máy resign. AccountAPI/auth → TestBotService(RAM30phút/1ván/user, enginechung xácthực/botđáp, serialize+cache UUID) → TestBotRepository(lock user/resources, gold125–150+ledger test_bot_win atomic/keyperván). DBfail rollback/retry cùngsốthưởng; profile API cậpnhậtstore/popup vàng. KhôngElo/statPvP/nănglượng/phòngonline/migration/dependency mới. useComputer thường không chạy khi testBotId; Sẵn sàng/reset tạo vánthửmới, leave/joinonline/locallàm sạch; bỏresponse cũsauthayaccount/rờiván.15/15 unit/React/result/Home regression PASS;18/18 integration trênMySQLtạm PASS gồm cả2variant/reloadbalance/duplicate/crossuser/rollback (sandboxtsx os.userInfo lỗi nên chạyQA script ngoài sandbox đãđượcduyệt). Chrome QA thật Home→GamePage qua2nút/2nước/popup/+135/returnHome135→270 PASS với transportmock/không DBuserthật; ảnh outputs/test-bot-qa.png, harness/browserđãdọn. Typecheck/build PASS dist index-Bq9LX6bW.js xácnhận2nút/API. Chi tiết docs/TEST-BOT.md. Đây là ngoại lệ thử riêng, không thay luật thưởng máy/PvP hiện có.

- 2026-10-19: User báo popup kết quả không thấy khi đấuonline. Đã tái hiện2đường mấtkếtquả trong regression: animation.finished bịreject do cancel và snapshot chuyển thẳng playing→ready. Board dùng Promise.allSettled đợi toàn bộ animation kếtthúc/hủy rồi callback cóguard vòngđời; useMatchResult bổsung lastCompletedMatch mới từserver khi bỏqua finished, chỉ dùng phe đã ghi trong ván, không hiện khán giả đượcđẩyghế.7/7 regression PASS, typecheck/build PASS dist index-BB2xhJBQ.js xácnhận. Chrome headless isolated QA toàn GamePage với snapshotonline giả: win/loss popupopen kíchthước291×364, confirm đóng, viewer khôngpopup, skippedfinished-loss hiện đúng. Screenshot outputs/result-online-qa.png. Khôngđấu trên tài khoảnthật; chưa xácđịnh chínhxác đườnglỗi ở browseruser, khôngtuyênbố đã táihiện cùngphiên thật. Fileharness tạm đãxóa/browserQA đãđóng. Cần reload bundle trướcvánmới.

- 2026-10-19: User chỉ rõ vương miện rời trên avatar hạng1 Xếp hạng (top-one-crown.png), không phải mũ trong chân dung. Dịch riêng SVG crown lên thêm3px CSS bằng top calc(-ranking-5 -3px), chung2tab; giữ ảnh/avatar/khung/bố cục khóa. Quyền chỉnh chỉ crown task này, sautask giữkhóa. Typecheck/build PASS, dist xác nhận offset; chưa browser QA. Ảnh imagegen thử ở lượt hiểu nhầm trước không đưa vào project.

- 2026-10-19: User chốt2ảnh17dba0c6 thắng/ff38225e thua xuất hiện cuối ván sau hiệu ứng chiếu bí, chỉ2người đã đấu thấy. MatchResultDialog dùng native dialog/ảnh gốc/overlay nútXác nhận; nguồn và alpha bbox1122x1402 tại src/assets/game-result/source.md. Board báo hoàn tất sau cả animation.finished nângquân và hitload+200ms, cleanup không phát callback cũ; lỗi tải hit hoàn tất an toàn. useMatchResult ghi phe lúc đangđấu, phân thắngthua theo game.result server/local, giữ popup qua queue rotation, không hiện với spectator mớiđượcđẩyghế/lateviewer/replay/trial/demo/hòa; vánmới/rờiphòng dọn. Chưa nối ô Vậtphẩmnhậnđược, không giả thưởng.5/5 regression hook/effect/move-stability PASS, typecheck/build PASS; dist index-Cx9tqQCr.js và victory/defeat xác nhận; chưa browser QA.

- 2026-10-16: Google Sign-In thật bằng GIS popup + google-auth-library verifyIdToken/audience GOOGLE_CLIENT_ID/nonce một lần. Migration004 thêm google_sub unique ascii_bin và session_expires_at, đã apply1 bước trên cotuong;001–003 không sửa. Guest link transaction giữ users.id/public ID/dữ liệu; Google cũ login lại; conflict409 không merge, revoke device hash user link. Session mới30 ngày hash DB/cookie HttpOnly, Socket.IO dùng auth hiện có. Client dùng VITE_GOOGLE_CLIENT_ID cùng ID backend, không Client Secret/token log/localStorage. Tests30/30 + MySQL tạm9/9 PASS; typecheck/build PASS, dist cập nhật; chưa Google popup QA thật vì Client ID chưa điền. Hướng dẫn/file/phạm vi: docs/GOOGLE-SIGN-IN.md.

- 2026-10-16: Hồ sơ chính mình mở ngoài nút hồ sơ Home chỉ có Thoát bên phải, không Kết bạn/Đăng xuất. ProfileDialog tách accountActions khỏi own identity; nhận diện mình theo session name nếu caller không chỉ định; Chọn Bàn tắt accountActions. Home giữ Liên kết/Đăng xuất. Regression footer2/2 PASS, typecheck/build PASS; dist xác nhận, chưa browser QA.

- 2026-10-16: Ghế online trống không render PlayerCard (không avatar/khung/tên/Elo giả). Người ngồi dùng hồ sơ thật cho portrait/frame/displayName/Elo qua PlayerCard chung; giữ geometry/avatar sizes. RoomPlayer.userId tùy chọn do server gắn từ identity khi publish, không dùng socket id làm DB user_id; hook fallback tìm tên cho snapshot legacy. Regression identity/wait3/3 PASS, typecheck/build PASS; dist cập nhật, chưa browser QA.

- 2026-10-16: Chơi nhanh/Đấu ở Home hết đối thủ thì tạo bàn online10 phút/60s mỗi nước theo tỉnh hồ sơ và join chờ một mình, không fallback máy. Chơi với máy/Cờ Úp riêng giữ nguyên; Chọn Bàn hết phòng vẫn mở Tạo bàn. Regression3/3 PASS, typecheck/build PASS; dist xác nhận, chưa browser QA.

- 2026-10-16: Hàng hội thoại luôn giữ dòng preview cao tối thiểu20px responsive khi rỗng, nên icon nhóm/tên không tụt giữa. Tải list/social/messages đã biết ID song song, read/member không chặn hiển thị; polling1s thay4s, không chồng poll. Tự chọn hội thoại đầu khi selection cũ không còn. Spinner giữa dialog khi tải đầu/chuyển hội thoại/gửi/tạo nhóm; chặn gửi/tạo lặp trong lúc chờ. Giữ avatar/geometry. Typecheck/build PASS, dist xác nhận; chưa browser QA hoặc đo latency thực tế.

- 2026-10-16: Theo yêu cầu giữ hàng hội thoại căn trái như ảnh: button full width/justify-start, thông tin text-left và overflow-hidden, preview min-w-0/justify-start để nội dung dài không đẩy cụm avatar/tên. Giữ kích thước/vị trí avatar và khung. Typecheck/build PASS; dist xác nhận class mới, chưa browser QA.

- 2026-10-16: Sửa tạo nhóm chỉ có chủ nhóm: PersistenceService cho phép members rỗng khi có title; chat trực tiếp vẫn cần đúng1 người khác. Repository tự thêm chủ nhóm role owner. UI giữ nguyên, lỗi tạo nhóm hiện lý do API. Regression validation1/1 và MySQL tạm integration7/7 PASS; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-16: Người dùng hoàn tác lần thu nhỏ tên18; PlayerNameplate trở về font24 theo tỷ lệ chiều rộng như trước. Chưa sửa quy tắc tên hoặc tìm phương án khác. Typecheck/build PASS, dist đã khôi phục; chưa browser QA.

- 2026-10-16: Cờ quốc gia hồ sơ phải dùng CountryFlag/SVG local (assets/countries, MIT flag-icons), không emoji regional indicators vì Windows hiện VN thay cờ. Icon28×21 theo token ui, self-center trong hàng địa chỉ, không đổi avatar/khung. Proxy API Vite phải giữ Host với changeOrigin:false để không bị origin guard403 khi đăng nhập5173.

- 2026-10-16: Tích hợp MySQL thật: migration002/003 đã apply,001 giữ checksum; Guest server Kỳ Thủ XXXXXX/public ID8 unique, credential cookie HttpOnly và hash DB. User mới Elo1000 riêng xiangqi/jieqi, vàng0, energy5. Energy>5 hợp lệ, hồi1/7 phút chỉ đến5. PvP bắt đầu rồi kết thúc (kể cả0 nước/leave) lưu history/replay và transaction Elo/gold; ngoài3 sao thắng+20, hướng thua giữ-10/-13, hòa0, thắng thưởng125–150. Saved/social/DM/honors tải/ghi MySQL, tên resolve users hiện tại; không tự import fixture/localStorage cũ thành dữ liệu user. Google/auth provider link chưa có, không fake. Giữ runtime RAM, UI geometry và Pikafish. Xem MYSQL-INTEGRATION.md cho phạm vi/kiểm chứng/TODO.

- 2026-10-16: Quốc gia/địa chỉ hồ sơ chỉ được lưu một lần; sau lưu thay bút địa chỉ bằng cờ quốc gia, không cho sửa. Việt Nam giữ chọn tỉnh/phường; nước khác lưu quốc gia. Hiện lưu localStorage theo Guest, chưa enforcement MySQL/auth; không đổi avatar hoặc bố cục vùng khóa.

- 2026-10-16: Foundation MySQL 8.0.45: 19 bảng + journal, checksum/advisory lock; DDL dang dở phải kiểm tra thủ công, không DROP. BIGINT ID dùng string; Guest backend Kỳ Thủ XXXXXX unique, chặn rename chưa liên kết; frontend chưa đổi. Chưa auth/UI/game persistence/seed catalog. MySQL tạm migrate/rerun/verify/smoke rollback PASS; test chọn 16/16 PASS; full suite 233 PASS/52 FAIL ngoài DB; typecheck/build PASS. Xem MYSQL-FOUNDATION.md.

- 2026-10-15: Header Chọn Bàn bổ sung Toàn màn hình ở cuối cụm tiện ích; thứ tự Cúp, Bạn bè, Âm thanh, Toàn màn hình; dùng handler fullscreen chung của Home.

- 2026-10-15: Đặt quân bằng click vào điểm không hợp lệ trong Vị trí tùy chỉnh chỉ báo lỗi, vẫn giữ lựa chọn bên/loại quân trong khay để thử điểm khác; áp dụng cho cả hai bên.

- 2026-10-15: Header Chơi với máy (desktop/compact) bỏ Thành tích; hai tiện ích theo thứ tự trái→phải là Âm thanh, Toàn màn hình. Toàn màn hình bật/tắt bằng fullscreen API và báo lỗi qua dialog hiện có.

- 2026-10-15: Trong Vị trí tùy chỉnh, chuột phải lấy quân khỏi bàn cũng tự chọn khay đúng bên và loại quân vừa lấy, đồng bộ với kéo quân ra ngoài.

- 2026-10-15: Màn Vị trí tùy chỉnh bỏ nút Lưu thế cờ ở thanh tiện ích theo yêu cầu; giữ Tạo từ ảnh, Âm thanh và Toàn màn hình.

- 2026-10-14: Hover Lùi/Tiến trial enabled phủ vàng nhạt#ffe08b alpha8%, xuất hiện ngay không transition; thay hover trắng10% trước đó.

- 2026-10-14: Máy đi trial bỏ outline focus khi Enter/click, giữ glow active. Lùi/Tiến enabled hover phủ trắng10%; disabled không hover, giữ artwork mờ.

- 2026-10-14: Lùi bàn thử (nút và ←) quay về trước nước của mình: mình vừa đi/máy chưa đáp lùi1; máy đã đáp sau mình lùi2. Nếu chỉ có nước máy mở đầu thì lùi1, không vượt gốc. Hủy animation/request qua seek; giữ tua từng nước ở replay gốc và nút tiến như cũ.

- 2026-10-14: Lùi/Tiến trial phải làm mờ trực tiếp artwork khi disabled (brightness0.35), không chỉ CSS trên button trong suốt. Robot Máy đi dùng crop img riêng792×182 thay background atlas để tránh render lệch/vỡ; giữ hiệu ứng active.

- 2026-10-14: Máy đi bật phải nổi bật theo ảnh mẫu: phóng1.03, sáng125%, viền vàng2px và glow vàng/cam trong-ngoài rõ. Tắt bỏ active. Chỉ áp dụng nút Máy đi, giữ khung/các nút khác.

- 2026-10-14: Hoàn tác UI khung trial về220px/chữ Máy đi17px và khoảng cách artwork bản trước; giữ active Máy đi scale1.02/viền vàng mảnh/glow nhẹ. Giữ phím tắt và search1s, không hiện dòng đang tính.

- 2026-10-14: Trial bỏ dòng Pikafish đang tính; search vẫn cấp10 nhưng movetime1000ms theo yêu cầu. API thinkMs tùy chọn validated100..2500 chỉ level10; trial gửi1000, chế độ khác giữ profile cũ. Không nhầm thời gian engine với tổng thời gian mạng/khởi động/animation.

- 2026-10-14: Theo yêu cầu thử UI mới sau hoàn tác: trial controls220→240px, khoảng cách artwork các nút tăng theo tỷ lệ khung; chữ Máy đi17→20px. Máy đi bật scale1.02, viền vàng1px/glow nhẹ, tắt về cũ. Không dim nút Lùi/Tiến; giữ toàn bộ phím tắt.

- 2026-10-14: Người dùng hoàn tác riêng UI lần nới/glow/dim trial: khung về220px, bỏ dim Lùi/Tiến và scale/glow Máy đi. Giữ nguyên phím ←/→/↑/↓/Enter/Space đã nối.

- 2026-10-14: Khung trial tăng220→244px; Lùi/Tiến mờ40% khi không dùng được, sáng lại khi có lịch sử. Máy đi bật scale1.04/glow vàng, tắt về cũ. Bàn thử dùng ←/→ lùi/tiến, ↑/↓ reset, Enter bật/tắt Máy đi; bàn gốc Enter Phát/Tạm dừng, Space chuyển bàn. Phím ngoài phạm vi không chiếm thao tác ô nhập/dialog.
- 2026-10-14: Nội dung số mới mặc định dùng font-number và lining-nums/tabular-nums, căn baseline/hàng với nội dung bên cạnh theo yêu cầu người dùng.

- 2026-10-14: Trial dùng cả cụm giữa ảnh4470bd4d làm khung Lùi/Reset/Tiến/Máy đi; hit area tương ứng artwork, nhãn Bật/Tắt HTML trên nền đã xử lý từ ảnh gốc. Phân tích/Gợi ý tách dưới khung gap10px CSS, width72px mỗi nút; không bọc nền/viền thêm. Replay gốc giữ controls cũ.

- 2026-10-14: Phân tích/Gợi ý trong trial dùng hai nút ảnh dưới của4470bd4d, crop alpha riêng trial-analysis/trial-hint, đặt ngang giữ tỷ lệ. Wrapper không nền/viền/padding/shadow. Vẫn UI đang phát triển, không logic phân tích/gợi ý.

- 2026-10-14: Máy hướng dẫn/đánh thử phải dùng Pikafish cấp10 qua API, tuyệt đối không fallback máy cơ bản. Gửi FEN snapshot gốc và lịch sử UCI nhánh tới nước hiện tại, remainingMs600000 để dùng đủ profile mạnh nhất. Hủy request khi tua/reset/tắt/chuyển/rời, validate nước và giữ animation. Lỗi có Thử lại; Cờ Úp báo chưa hỗ trợ Pikafish. Phân tích/Gợi ý vẫn chỉ UI.

- 2026-10-14: Đính chính nút ghim trong replay: chỉ hiện ở bàn thử và bàn chính Ván đấu; bàn chính Thế cờ ẩn ghim. Bàn chơi thật vẫn giữ Lưu thế như trước.

- 2026-10-14: Mở Thế cờ gốc ẩn ReplayControls Phát/0/0/Tua, chỉ giữ icon chuyển bàn (và tiện ích); bàn thử vẫn có controls thử. GameTools cho ghim lưu thế ở mọi replay/trial, lưu snapshot đang hiển thị ngay. replayKind=position phân biệt nguồn, initialMoveCount giữ số nước của thế gốc khi lưu tiếp.

- 2026-10-14: Mỗi lần chuyển Xem lại↔Đánh thử luôn tắt Máy đi. Nước đi thử của người/máy truyền animation Move qua Board chung, khóa nước tiếp khi đang chạy400ms; máy chờ animation xong rồi delay550ms. Tua/reset/chuyển/rời hủy animation/timer cũ.

- 2026-10-14: Phím Enter/NumpadEnter Phát/Tạm dừng replay (không áp dụng trial); Space luôn chuyển Xem lại↔Đánh thử kể cả nút đang focus. Bỏ qua ô nhập/dialog/phím lặp/modifier, không xử lý lúc entrance.

- 2026-10-14: Khoảng cách giữa hàng Thế cờ dùng cùng var(--ui-p-5) với Ván đấu, viewport vẫn vừa hai hàng. Bỏ đường chia liền giữa card; thanh cuộn mảnh nằm ở khoảng trống phải ngoài card, track/corner trong suốt chỉ hiện thumb.

- 2026-10-14: Icon replay chuyển sang trái và đổi chức năng thành Xem lại/Đánh thử, Space dùng cùng thao tác (bỏ qua ô nhập/dialog/phím lặp). Cụm ReplayControls chuyển dưới user phải. Đánh thử chụp đúng snapshot đang xem, tạm dừng replay; useReplayTrial giữ nhánh riêng, không sửa recording/gameStore/socket/clock. Lùi/tiến duyệt nhánh, số nước thay Reset về mốc thử. Máy đi toggle mặc định tắt, bật dùng máy cơ bản theo phe đối diện user; tắt cho đi cả hai bên. Timer máy hủy khi tua/reset/tắt/rời. Phân tích/Gợi ý chỉ UI disabled/đang phát triển. Bấm icon/Space lại trở về đúng nước replay gốc.

- 2026-10-14: Icon đảo hướng replay tăng64→84px desktop,40→52px compact; vị trí không đổi.

- 2026-10-14: Replay thêm nút đảo hướng bàn dùng ảnh người dùng0a700f7c; desktop đặt giữa theo chiều dọc bàn và giữa bàn/mép phải bằng cột phải GamePage. Chỉ đảo Board, giữ user trái và state gốc; vào replay khác reset hướng mặc định. Compact nút nhỏ dưới cụm phải tránh avatar.

- 2026-10-14: Đính chính bố cục hàng Thế cờ: bỏ dịch5px; cột thao tác chỉ rộng bằng nút Mở thế151px responsive, mép phải nút trùng mép phải thùng rác. Cột thông tin minmax(0,1fr) giãn lấp khoảng trống; giữ gap bàn–thông tin10px.

- 2026-10-14: Theo yêu cầu đẩy nhẹ sang phải, cụm thông tin và nút Mở thế hàng Thế cờ dịch5px CSS; bàn mini và thùng rác giữ vị trí.

- 2026-10-14: Nút thùng rác của mỗi hàng Thế cờ nằm góc trên bên phải; giữ nút Mở thế ở bên phải giữa hàng.

- 2026-10-14: Hàng Thế cờ phải rộng bằng Ván đấu, bỏ gutter thanh cuộn dành sẵn riêng. Mở thế dùng cùng asset nút gỗ/font/cỡ chữ Xem lại; Xóa dùng icon thùng rác/nền xám/kích thước của Ván đấu. Hai nút đặt ngang cuối hàng.

- 2026-10-14: Icon số nước/ghi chú và loại cờ trong hàng Thế cờ tăng lên24px responsive; chấm bên tới lượt18px responsive. Ghi chú tăng lề trái để không chồng icon.

- 2026-10-14: Thế cờ: vs cách mỗi user17px CSS; icon số nước/ghi chú là tờ báo SVG. Ghi chú có bút riêng góc trên phải; sửa tên giữ nền gradient vàng/độ đậm, sửa ghi chú giữ nền nâu nhạt. Nút ghim trong ván lưu ngay snapshot với tên mặc định theo số nước và ghi chú trống; không hỏi, không mở dialog. Chỉnh tên/ghi chú sau trong Đã lưu.

- 2026-10-14: Người dùng mở riêng avatar nhỏ hàng Thế cờ, tăng28→34px responsive rồi khóa lại. Cụm hai user ôm nội dung, vs đặt giữa, cách mỗi cụm10px CSS, không flex-1 tạo khoảng trống thừa.

- 2026-10-14: Thông tin hai người trong hàng Thế cờ luôn đặt bản thân bên trái nếu tham gia; nếu hai người lạ đấu thì Đỏ bên trái, Đen bên phải. Dùng savedMatchSide chung với Ván đấu/replay, không đổi phe/lượt trong snapshot.

- 2026-10-14: Mini Board Thế cờ không có bóng khung/bàn (Board shadow=false); nội dung cách bàn10px CSS. Tên thế tăng21→24px responsive và font-black. Các bàn khác giữ bóng mặc định.

- 2026-10-14: Mini Board trong Thế cờ lấy chiều cao hàng thực trừ10px, cách mép trong trên/dưới5px CSS, width theo1134/1296. ResizeObserver đo hàng trong viewport hai dòng; không giữ width178 cố định.

- 2026-10-14: Style hàng Thế cờ theo ảnh mẫu giấy vàng/đường chia nâu, tên nền vàng và bút sửa, hai tên người kèm avatar nhỏ và vs, số nước/chấm màu lượt/biến thể, ghi chú nền nâu nhạt cuộn riêng. Bút cho sửa tên/ghi chú và lưu localStorage. Vẫn hai hàng, bàn mini dọc đúng tỷ lệ và Mở thế/Xóa; modal/Ván đấu không đổi.

- 2026-10-14: Màn bàn cờ luôn có Âm thanh và Toàn màn hình (phóng to/thu nhỏ), kể cả replay ván/đọc thế đã lưu và trình chỉnh thế compact. GameTools replay chỉ hiện hai tiện ích này; không bật lại lệnh thi đấu.

- 2026-10-14: Đã lưu/Thế cờ mỗi hàng một thế, viewport vừa hai hàng và cuộn dọc; ngày giờ/bàn mini dọc/thông tin/nút Mở thế-Xóa. Ghi chú cuộn riêng trong chiều cao cố định. Giữ modal và tab Ván đấu. Người dùng cho phép nối nút ghim: chụp GameState ngay lúc bấm, nhập tên/ghi chú, savedPositionsStore lưu localStorage theo owner; mở thế dùng GamePage replay một snapshot, không đổi gameStore. Board mini dùng Board thật, tỷ lệ1134/1296, chỉ đọc.

- 2026-10-14: Người dùng mở phạm vi footer Lịch sử và danh sách để bỏ thanh chú thích Cờ tướng/Cờ úp; dùng chiều cao được giải phóng cho thêm hàng lịch sử. Đã chơi hiển thị 8 hàng và cuộn khi vượt; dữ liệu Đã chơi vẫn minh họa. Avatar và các khu vực còn lại tiếp tục khóa.

- 2026-10-14: Icon Lưu thế cờ trong GameTools đổi thành cây ghim vàng; giữ vị trí giữa Lưu ván và Bạn bè.

- 2026-10-14: Tiện ích bàn cờ bỏ Camera; thứ tự trái sang phải Lưu ván/Lưu thế cờ/Bạn bè/Âm thanh/Toàn màn hình. Lưu ván giữ icon đĩa mềm và điều kiện kết thúc; Lưu thế dùng icon bàn cờ, hiện thông báo đang phát triển vì chưa nối dữ liệu Thế cờ.

- 2026-10-14: Nút Lưu giữ ván kết thúc gần nhất mà client đã nhận. Vào giữa ván chưa có kết quả thì khóa; đã xem hết ván 1 có thể lưu ván 1 trong ván 2; hết ván 2 thay mục tiêu bằng ván 2. useMatchSaving không nhận archive cũ lúc game đang playing, vẫn giữ lastMatch đã nhận trước đó.

- 2026-10-14: Đã lưu/Ván đấu phải render người dùng sở hữu danh sách bên trái ở cả phe Đỏ và Đen; không chỉ tính leftSide rồi vẫn truyền redName cố định. Biểu tượng phe/kết quả đi cùng người. Replay đặt phe đó dưới bàn, độc lập lượt đầu. Regression DOM hai phe đã kiểm tra thứ tự nút hồ sơ.

- 2026-10-14: Cân màu gỗ quân Đen theo quân Đỏ bằng gamma RGB riêng trong SVG filter, mask theo độ sáng giữ chữ tối. Cùng filter cho bàn/khay/drag/animation, không sửa geometry hoặc bản A. Thay cân màu brightness nhẹ trước đó ở render.

- 2026-10-14: Căn mặt tròn bên trong quân Đỏ sang phải khoảng2% chiều rộng bằng SVG displacement trong ChessPiece, giữ nguyên thân/viền ngoài và tọa độ quân. Áp dụng chung bàn/khay/drag; hiệu ứng kết thúc giữ filter mặt. Không thay file ảnh hoặc mốc A.

- 2026-10-14: Mốc hoàn tác A là .checkpoints/A-2026-10-14.zip (879 tệp), tạo trước khi đồng bộ quân. Manifest/hash tại .checkpoints/A.json. Khi người dùng yêu cầu về A, phục hồi snapshot này rồi build lại; giữ dependencies/binary ignored hiện có. Không nhầm bản sau đồng bộ với A.

- 2026-10-14: Quân mở Đỏ/Đen dùng chung ChessPiece object-fill trong khung108×112, không offset riêng Đỏ4px. Cân tông gỗ Đen bằng pieceColorFilter brightness0.985/saturate1.015 dùng chung trong render/animation/nhận diện. Khay, bàn, quân kéo và ảnh chụp DOM đồng bộ theo component.

- 2026-10-13: Khay xếp thế bỏ nhãn Quân Đen/Quân Đỏ; mỗi màu dùng nhãn1/2/3/4/5/Q/W theo thứ tự Xe/Mã/Tượng/Sĩ/Tướng/Pháo/Tốt, trái sang phải rồi hàng sau. ↑ chọn khay Đen, ↓ chọn khay Đỏ và viền vàng; bấm vào khay chọn màu và giữ lựa chọn; rê chuột chỉ hover, không đổi màu đang chọn; khay đang chọn dùng nền nâu sáng, viền vàng/outline và glow chung để nổi bật. Bấm số trên quân hoặc phím1–5/Q/W chọn quân của khay đang chọn. Quân hết vẫn khóa; không bắt phím trong ô nhập/dialog.

- 2026-10-13: Vị trí tùy chỉnh: Xóa quân xóa toàn bộ quân thường, giữ Tướng đang có trên bàn và bỏ chọn quân. Không kiểm tra Tướng đối mặt trong thao tác bấm/kéo xếp thế; Đấu ngay và server vẫn báo lỗi, chặn thế Tướng đối mặt.

- 2026-10-13: Đấu ngay chuyển xuống dưới khay quân, gap10px, căn giữa chiều dọc cả cụm khay+nút; dùng ảnh nút đỏ/kiếm/hai rồng theo mẫu, bỏ nút giữa bàn trong trình chỉnh thế.

- 2026-10-13: Vị trí tùy chỉnh: đặt/di chuyển sai vị trí báo lỗi rồi bỏ chọn quân. Kéo trực tiếp từ khay hoặc từ bàn mà không cần bấm chọn; thả trong bàn đặt vào giao điểm gần nhất theo hướng bàn và luật hiện hành, thả quân trên bàn ra ngoài thì xóa; thả quân khay ngoài bàn không thêm quân. Pointer cancel không xóa; click sau kéo bị chặn. Chỉ áp dụng trình chỉnh thế.

- 2026-10-13: Bỏ nhãn hiện Đổi bên; khay quân desktop căn giữa chiều dọc vùng từ dưới hàng tiện ích đến mép dưới. Tạo bàn cờ từ ảnh chỉ hiện Đang trong quá trình phát triển, chưa mở chọn ảnh.

- 2026-10-13: Nút Lưu Vị trí tùy chỉnh dùng đĩa mềm vàng theo mẫu mới: thân vàng đặc bo nhẹ, khe trên có chốt vàng, ô dưới kín có thanh ngang lõm; không chữ, icon32px cùng cỡ tiện ích.

- 2026-10-13 — Quân trong khay Vị trí tùy chỉnh không có drop-shadow; truyền shadow=false cho ChessPiece. Quân trên bàn giữ bóng hiện hành.

- 2026-10-13 — Vị trí tùy chỉnh giới hạn mỗi bên1 Tướng/2 Sĩ/2 Tượng/2 Mã/2 Xe/2 Pháo/5 Tốt. Quân dùng hết bị mờ và khóa bấm; tự bỏ chọn sau khi đặt quân cuối. Chặn đặt/di chuyển vào điểm Tướng/Sĩ/Tượng/Tốt không thể tới ; hai Tướng đối mặt chỉ bị chặn khi Đấu ngay. Tượng chỉ đặt tại7 điểm có thể tới bên phần sân mình. Xóa quân vẫn được phép để tạo thế dang dở; kiểm tra Đấu ngay/server FEN vẫn là lớp xác thực cuối.

- 2026-10-13 — Vị trí tùy chỉnh mở từ màn máy, screen position, dùng Board/PlayerCard cũ; không đối thủ/chat/view/clock/vòng xanh/thao tác thi đấu. Khay chuyển bên phải, gap ngang10px với bàn/viền trong, đủ14 loại quân không cuộn khay. Chỉ giữ Xóa quân (thùng rác) và Cài lại (mũi tên khôi phục). Header Lưu/Tạo từ ảnh dùng icon đĩa mềm/ảnh; Đổi bên thay mã phòng. Nút Đấu ngay đỏ/hai rồng nằm dưới khay, gap10px; không hiện nút giữa bàn. Lưu FEN; Tạo từ ảnh hiện chỉ báo đang phát triển, giữ mã nhận diện để phát triển tiếp. Đấu ngay kiểm tra thế rồi khởi tạo Pikafish từ FEN, giữ cấp; server kiểm tra FEN+lịch sử, chơi lại dùng thế gốc. Chi tiết docs/CUSTOM-POSITION.md.

- 2026-10-13 — Banner Luyện cờ nới thêm30px mỗi bên:1208→1268px, tổng60px mỗi bên so với ban đầu; giữ tâm/aspect, fit chiều cao878px.

- 2026-10-13 — Banner Luyện cờ tăng rộng1148→1208px theo hệ thiết kế màn máy (thêm30px mỗi bên), giữ tâm và aspect2132/348.

- 2026-10-13 — Banner Cờ thế màn Chơi với máy thay bằng ảnh Luyện cờ63e5f151, runtime computer-setup/training-banner.png crop2132×348. Giữ tỷ lệ, width thiết kế1148px; fit layout theo chiều cao858px để không tràn. Nguồn/crop tại training-banner-source.md; chưa triển khai chức năng luyện cờ.

- 2026-10-13 — Nút giữa bàn sau ván máy trở lại nhãn Sẵn sàng như bình thường, bỏ ngoại lệ Đấu lại. Giữ tự bắt đầu khi mới vào bàn máy.

- 2026-10-13 — Đính chính ảnh nút tròn: đó là Đi lại/Hoàn nước, không phải nút Sẵn sàng giữa bàn. Đấu máy ẩn toàn bộ MatchActions (Cầu hòa/Xin thua/Đi lại); khôi phục Sẵn sàng sau ván, giữ tự bắt đầu Pikafish.

- 2026-10-13 — Ván mode computer cô lập với phòng online: không tạo/đăng phòng server, không chặn mời chơi bằng localBusy. challengeProfile chỉ báo localBusy cho mode local đang playing; online do server room kiểm tra. Đồng ý lời mời reset ván local/hủy máy rồi enterOnline theo luồng challenge hiện có, không đưa ai vào ván máy. Ẩn Cầu hòa/Xin thua/Đi lại trong máy. Các nút online/local hai người không đổi.

- 2026-10-13 — Đấu máy (mode computer, gồm Cờ Úp/demo) không hiển thị MatchIntro ai đấu với ai hoặc âm thanh intro gọi từ start, đồng hồ và vòng/phủ xanh avatar. GamePage truyền showClock=false vào cả2 PlayerCard và tắt useMatchIntro. Chỉ ẩn hiển thị, giữ luật clock/khai cuộc1300ms; online/local hai người vẫn như cũ.

- 2026-10-13 — Header Chơi với máy lấy geometry avatar/tên của Chọn Bàn: avatar45px desktop/33px compact, hạ1px; cùng AvatarPortrait/AvatarFrameOverlay, bỏ mask/shadow riêng. Cụm gap12px; tên font-heading24px/18px, leading-none, màu#eee4ce, max-width192px. Chỉ đổi màn máy theo yêu cầu, Chọn Bàn giữ nguyên.

- 2026-10-13 — Người dùng mở riêng kích thước avatar header Chơi với máy: tăng40→44px desktop,36→40px compact; frame vẫn scale theo component chung. Tên dùng font-heading (font chính). Các avatar khác tiếp tục khóa.

- 2026-10-13 — Chơi với máy chỉ chọn Pikafish/cấp độ, bỏ dropdown Máy cơ bản trên desktop/compact. Khi vào bàn Pikafish ready tự gọi luồng start hiện có (giữ intro/clock1300ms), ẩn nút Sẵn sàng ban đầu; kết thúc dùng Đấu lại. Header dùng AvatarPortrait/AvatarFrameOverlay và tên session, giữ geometry avatar; cụm tiện ích gap8px theo Home. Máy cơ bản ở Chơi nhanh/Cờ Úp không đổi.

- 2026-10-13 — Sai số Pikafish qua MultiPV và PIKAFISH_MOVE_WEIGHTS (pikafishCandidates.ts): cấp1 top5 [20,25,25,20,10], giảm sai số tới cấp10 bestmove100%. Cấp1–3 đổi sang depth1/2/3 với deadline80/120/180ms vì64 nodes chỉ trả2 PV ở engine thật. Lấy cùng vòng depth, lọc illegal/lặp, thua ngay1 nước, mate âm khi tránh được và chênh300cp; chuẩn hóa trọng số ứng viên còn an toàn, không random ngoài PV. Cấp4–10 giữ search budget. Không khẳng định tránh được chiến thuật sâu.

- 2026-10-13 — 10 cấp Pikafish dùng profile server tại pikafishLevels.ts; binary2026-09-06 không có Skill Level/UCI_Elo (uci-options.txt). Cấp1–9 tăng nodes64→400000, cấp10 movetime2500 không cap depth/nodes; mỗi go chỉ một limit chính. Threads/Hash/EvalFile chỉ set khi handshake quảng bá, clamp min/max và CPU. Deadline stop theo profile/clock, giữ process async/hủy/timeout15s. Chọn cấp lưu session ngay, mỗi search gửi level; chưa benchmark ELO.

- 2026-10-13 — Sau khi bỏ tiêu đề Chơi với máy, giữ Cờ thế tại vị trí cũ: bảng giữa cao625px (tăng82px), giãn biển tên/cấp độ/chọn bên/nút hành động theo chiều dọc; banner cách bảng13px. Footer nằm trong flow dưới banner, không đo top tuyệt đối gây đè cấp độ.

- 2026-10-13 — Màn Chơi với máy bỏ tiêu đề lớn ở desktop/compact; nội dung desktop dồn lên bằng chiều cao tiêu đề cũ 82px theo scale, giữ kích thước hiện hành. Nhãn cấp độ dùng font-heading cho Cấp, font-number lining/tabular cho số, căn chung baseline.

- 2026-10-13 — Căn tâm mặt tròn quân Đỏ của bộ codo-coden-v2: ChessPiece dịch ngang sang phải 4px nhân scale bàn (từ 2px), dùng chung mọi màn qua Board; quân Đen và mặt úp giữ nguyên.


- 2026-10-13 — Bảng Tạo bàn dùng khung72f80581 giống khung chọn tỉnh/thành, gồm nền/tiêu đề/X; các ô thời gian và nút Hủy/Tạo bàn dùng ảnh cắt từ skin v2 cũ để giữ chức năng. CreateRoomForm dùng chung ở Chọn Bàn/LobbyDialog; kích thước ngang tối đa680px, aspect1369/953; tọa độ điều khiển đã căn lại theo khung mới. Nguồn và crop ghi trong create-room/source.md.

- 2026-10-13 — Tiêu đề khung chọn tỉnh/thành tăng nhẹ: 34px desktop/22px compact, font-heading; giữ nguyên tâm, vùng tiêu đề và khung.

- 2026-10-13 — Đã hoàn tác lần thử thu nhỏ bảng Tạo bàn; kích thước hiện hành trở lại max-width680px/73dvh, aspect1589/983.

- 2026-10-13 — Người trong sảnh Chọn Bàn được tính theo tỉnh/thành đang chọn, không cố định theo địa chỉ hồ sơ. Mở màn mặc định địa chỉ hồ sơ; đổi nơi gửi lobby:presence mới để server giảm nơi cũ/tăng nơi mới, không đổi hồ sơ và không cộng giả phía UI. Đổi nơi không gửi null trung gian; reconnect công bố nơi đang chọn, rời màn mới gỡ presence.

- 2026-10-13 — Thẻ chọn tỉnh/thành: icon dùng ô rộng26cqw/cao100% thẻ, object-contain giữ tỷ lệ, hình cao được phép chạm viền trên/dưới. Tên font-heading min(36px,7cqw); số liệu font-number min(28px,5.5cqw). Giữ4 dòng/gap dọc8px và artwork hiện tại.

- 2026-10-13 — Sửa theo phản hồi: thẻ tỉnh/thành phải giãn đầy chiều cao mỗi hàng, gap dọc8px, giữ4 dòng trong viewport. Cho phép artwork thẻ giãn theo ô trong phạm vi này theo yêu cầu; bỏ căn giữa thẻ thấp gây khoảng trống lớn. Gap ngang desktop12px giữ nguyên, compact8px.

- 2026-10-13 — Tiện ích góc phải màn đấu: Chụp hình → Bạn bè → Âm thanh → Toàn màn hình. Nút Bạn bè dùng HomeIcon và FriendsDialog chung, mở hồ sơ/nhắn tin hiện có, Mời chơi dùng challenge chung. Giữ mép phải, gap và geometry avatar; áp dụng GamePage cho cả online/local/Cờ Úp.

- 2026-10-13 — Khung chọn tỉnh/thành chỉ hiển thị4 dòng trong viewport danh sách: desktop2 cột, compact1 cột; phần còn lại cuộn. Grid chia chiều cao thành4 hàng trừ gap, thẻ giữ aspect gốc và căn giữa hàng, không kéo méo artwork.

- 2026-10-13 — Chốt thay riêng khung chọn tỉnh/thành về ảnh72f80581, crop1369×953; thẻ giữ ảnh e05c67be1066×187. Khung có sẵn X nên desktop chỉ đặt hit area, không chồng SVG. Nguồn/script tại province-picker-source.md.

- 2026-10-13 — Mời chơi Bạn bè dùng chung challenge với So tài hồ sơ. Khi đồng ý: người gửi chưa có phòng online → tạo phòng mới cho cả hai, kể cả người nhận đang ở phòng khác; người gửi có phòng → đưa người nhận tới phòng người gửi, không tạo phòng mới. Xác định phòng lúc đồng ý; cập nhật snapshot phòng cũ/phòng đích và socket membership. Giữ chặn đang đấu/đã Sẵn sàng, không chiếm ghế của người khác. Danh sách bạn bè vẫn mẫu, backend lời mời cần người nhận online thật. 8 test service/socket pass; không tuyên bố backend quan hệ bạn bè đã tích hợp.

- 2026-10-13 — Header Chọn Bàn: bấm avatar mở hồ sơ bản thân bằng ProfileDialog hiện có; lưu tên đang nhập hợp lệ trước khi mở. Người dùng cho phép hạ riêng avatar header xuống1px, giữ kích thước và khung avatar; các nơi khác vẫn khóa. Tiện ích từ trái qua phải: Cúp, Bạn bè, Loa; giữ gap10px và chức năng hiện có.

- 2026-10-13 — Thay tiếp khung/thẻ chọn tỉnh thành bằng hai hình trong ảnh e05c67be: khung trên crop1360×720, thẻ dưới1066×187. Giữ tỷ lệ, chữ/icon co theo chiều rộng thẻ để vừa thẻ thấp; nút đóng SVG vì nguồn mới không có X. Nguồn và script tại province-picker-source.md.

- 2026-10-13 — Ghép nhanh chỉ chọn phòng có đúng1 người ngồi, chưa đấu; viewers không tính, không ghép phòng0 hoặc2 người. Chọn Bàn phải khớp thời lượng dropdown và chỉ mở Tạo bàn nếu không có phòng phù hợp. Home giữ mọi thời lượng và fallback máy.

- 2026-10-13 — Thay khung chọn tỉnh/thành bằng ảnh72f80581 và thẻ bằng ảnh971d28dd theo yêu cầu. Runtime crop sát alpha1369×953 và2069×462, giữ tỷ lệ; nguồn/script tại province-picker-source.md. Giữ danh sách, tên/icon và thao tác chọn hiện hành.

- 2026-10-13 — Nút X Tạo bàn neo theo tâm vòng tròn của skin v2: (1499,105) trên ảnh1589×983, tương ứng94.34%/10.68%; SVG vuông và căn giữa, tránh lệch do tọa độ hit area cũ.

- 2026-10-13 — Chơi nhanh trong Chọn Bàn lấy danh sách phòng mới và vào thẳng phòng còn ghế, chưa đấu, đúng thời lượng dropdown; tìm trên mọi tỉnh/thành. Chỉ mở Tạo bàn nếu không có phòng phù hợp. Quy tắc này thay phần “mọi thời lượng” của ghi chú cũ cho Chọn Bàn; Home giữ hành vi riêng. Bàn mẫu không phải phòng online để ghép nhanh.

- 2026-10-10 — Không có ai xếp hàng thì người thua giữ ghế, kể cả có khán giả chưa xếp hàng. Sau ván, người mới xếp hàng được thay người thua nếu chưa có ai Sẵn sàng đấu tiếp; giữ mốc tối thiểu 3 giây từ kết quả, quá mốc thì chuyển ngay. Một trong hai người đã Sẵn sàng thì đóng quyền thay ghế của ván cũ, người mới chỉ vào hàng chờ ván tiếp theo. Kiểm chứng: 6 test liên quan pass.

- 2026-10-10 — Trong demo hai máy, hàng chờ là hàng chờ cục bộ: nếu khán giả xếp trước khi demo kết thúc ở nước thứ3, người đó thay Máy Đen và tiếp tục đấu Máy Đỏ; nếu không ai xếp thì Đỏ thắng như demo. Đây không phải hàng chờ phòng online và không tạo/join server room.

- 2026-10-10 — Xem thử tạm thời: bấm bàn mẫu mở ván local xem hai máy cơ bản tự đi luân phiên theo thời gian của bàn; sau3 nửa-nước demo kết thúc với Máy · Đỏ thắng do Máy · Đen xin thua; tên Máy · Đỏ/Máy · Đen. Chặn người xem đi quân; không tiêu năng lượng hoặc tạo phòng server. Cờ computerDemo được xóa khi rời/vào online/local; useComputer hủy timer khi rời hoặc đổi ván.

- 2026-10-10 — Thẻ bàn dùng con trỏ pointer khi rê chuột, kể cả bàn mẫu xem thử; preview vẫn không gọi join/API online.

- 2026-10-10 — Thẻ phòng trong Chọn Bàn bấm vào sẽ vào/xem đúng phòng thật qua `onJoin(room.id)`; bàn mẫu bấm mở demo cục bộ hai máy, không gọi API. Sắp xếp giảm dần theo tổng người (`players + viewerCount`), tính cả người chơi lẫn khán giả; khi bằng nhau giữ thứ tự tạo từ `RoomRepository` (Map insertion order), phòng cũ đứng trước. Icon mắt hiển thị số tổng ngoài artwork, cách bàn5px; icon ghế/tên chỉ tính người chơi.

- 2026-10-10 — RoomTableGrid dùng `scrollbar-gutter: stable` để dành sẵn chỗ cho thanh cuộn sát mép trong khung; thanh chỉ hiện khi danh sách vượt khung (`overflow-y-auto`), nhờ đó lưới không dịch ngang khi bắt đầu/cuộn hết.

- 2026-10-10 — RoomTableGrid: vùng hình cao78% thẻ; bàn lấy chiều cao thực, giữ aspect934/922. Hai người cao45% bàn, width:auto và neo ngoài mép bàn đúng3px. Không dùng ô ảnh rộng/object-contain gây khoảng hở giả; bàn luôn căn giữa.

- 2026-10-10 — Quy tắc đấu luân phiên: khi ván kết thúc có người thắng và hàng chờ, bất kể ai tạo phòng, người thua xuống cuối hàng và người đầu tiên đang xếp hàng lên bàn ngay. Người xem chưa xếp hàng không được đưa lên; giữ nguyên thứ tự những người còn lại.

- 2026-10-10 — Nếu người đang ngồi rời phòng, xử thua nếu ván đang diễn ra và lấp ghế vừa trống bằng người đầu tiên đang xếp hàng. Người xem không xếp hàng không được tự đưa lên; các người chờ còn lại giữ nguyên thứ tự.

- 2026-10-10 — Phòng 0 người ngồi nhưng còn viewers vẫn hiển thị trong tab “Tất cả”; viewerCount chỉ giữ phòng trên lưới, không cộng vào players, icon ghế hay tên. Chỉ ẩn phòng không có cả players lẫn viewers. Tab “Còn trống” vẫn chỉ hiện đúng1 người chơi. Preview chỉ hiển thị khi API không có phòng thật.

- 2026-10-10 — Tab “Còn trống” ở Chọn Bàn chỉ hiện phòng chưa bắt đầu có đúng1 người đang ngồi; viewers không tính. Giữ điều kiện này cả với preview để tab không hiển thị bàn mẫu đủ2 người.

- 2026-10-10 — Ẩn bàn trống (0 người chơi) khỏi lưới Chọn Bàn; chỉ các ghế chơi hiện tại quyết định. Bàn có1 người vẫn hiện; viewers không tính. Danh sách mẫu cũng chỉ dùng trạng thái1/2 người.

- 2026-10-10 — Nút đóng Tạo bàn: dấu X là SVG đối xứng ở tâm nút, không glyph văn bản để tránh lệch quang học; vùng nút và tọa độ giữ nguyên.

- 2026-10-10 — Thẻ bàn hiển thị thời lượng + tên người chơi ở ghế đầu tiên từ `RoomSummary.playerNames`; không hiện tên nội bộ “Bàn 1”. Danh sách tên lấy theo thứ tự `room.players` ở server, chỉ người đang ngồi, không gồm viewers. Khi người đầu rời, người còn lại tự lên đầu; người vào sau xếp sau. Hình bàn/người thu nhỏ theo yêu cầu.

- 2026-10-10 — Cập nhật lưới bàn xem thử: đủ12 bàn thường, bỏ ô Tạo bàn trong lưới vì có nút trên header. Bỏ dòng phụ Mẫu/số người. Nhãn thời gian/tên bàn cùng font-heading và cỡ20px desktop/14px compact như chữ Tạo bàn trong lưới trước đó; cả số dùng font chữ theo yêu cầu này. Bàn mẫu vẫn không gọi API.

- 2026-10-10 — Xem thử tạm thời theo yêu cầu: khi danh sách bàn trống và tải xong, RoomTableGrid hiện22 bàn mẫu để kiểm tra cuộn; hai bàn đầu luôn đủ2 người để duyệt hình hai bên. Mẫu có1/2 người, không gọi join/API online và không cộng bộ đếm bàn thật; có phòng thật sẽ hiển thị dữ liệu thật. Gỡ dữ liệu mẫu khi người dùng kết thúc xem thử.

- 2026-10-10 — Danh sách Chọn Bàn dùng hai artwork mới (bàn gỗ và người chơi nhìn từ trên), nguồn/crop tại table-artwork-source.md. Lưới4 cột×3 hàng nhìn thấy, mọi ô là bàn thường; phòng từ API, quá12 ô cuộn tiếp. Không dựng phòng hoặc tiền cược giả; hiển thị người chơi hai bên theo số ghế. UI tại RoomTableGrid.

- 2026-10-10 — Thanh cuộn dọc của RoomTableGrid hiện thumb xanh ngọc #22c1a8 mảnh, alpha30% (hover45%); track trong suốt, không thêm nền bao quanh. Cuộn khi danh sách vượt khung.

- 2026-10-10 — Header Chọn Bàn: Bạn bè mở cùng FriendsDialog như Home, Thành tích mở cùng RankingDialog, âm thanh chia sẻ useHomeMusic nên trạng thái và playback luôn đồng bộ.

- 2026-10-10 — Với preview bàn mẫu, dùng trạng thái tải ban đầu thay vì `isFetching` của polling nền. Refetch định kỳ không được gỡ rồi dựng lại 22 node preview vì điều đó làm thanh cuộn chớp và reset vị trí về đầu.

- 2026-10-10 — Header Chọn Bàn: avatar người chơi45px desktop/33px compact; tên24px/18px; avatar và tên căn giữa dọc trong header. Ngoại lệ xem thử áp dụng avatar đã khóa chỉ trong header Chọn Bàn, không đổi avatar trong game/profile.

- 2026-10-10 — Menu Chơi nhanh trong Chọn Bàn không có lựa chọn “Tất cả”; giữ các mốc3/5/10/15/30 và mặc định10 phút.

- 2026-10-10 — Cụm nút tiện ích trong Chọn Bàn dùng cùng bố cục với Home, riêng khoảng cách giữa nút là10px theo yêu cầu (Home8px); giữ `homeUtilityButton`/HomeIcon dùng chung. Mép phải cụm giữ nguyên khi tăng gap.

- 2026-10-10 — Nhãn thời lượng trên nút Chơi nhanh: số dùng font-number, chữ phút/Tất cả dùng font-heading; cùng cỡ22px desktop/18px compact như Chơi nhanh và Tạo bàn.

- 2026-10-10 — Dropdown thời gian Chơi nhanh phải đóng khi bấm/chạm ngoài cụm nút và menu; chọn mốc đóng menu như hiện hành. Listener chỉ tồn tại khi mở và được cleanup.

- 2026-10-10 — Thẻ địa chỉ hiện tại Chọn Bàn bỏ dấu mũi tên cạnh tên; tên22px desktop/18px compact, giữ font-heading và căn trái. Cả thẻ vẫn bấm mở danh sách tỉnh/thành.

- 2026-10-10 — Thẻ khu vực hiện tại trong Chọn Bàn căn trái tên và số liệu. Bỏ hình nhà cố định; ảnh dùng roomProvinceIcon với cùng selection.province như tên: ban đầu theo địa chỉ hồ sơ, chọn khu vực khác đổi cả hình/tên. Không sửa địa chỉ hồ sơ khi duyệt khu vực.

- 2026-10-10 — Chơi nhanh ở Home và Chọn Bàn lấy danh sách mới, chọn ngẫu nhiên bàn còn chỗ/chưa chơi trên mọi tỉnh/thành và thời lượng, không lọc khu vực/thời gian hoặc ưu tiên bàn đầu tiên. Chọn Bàn có dropdown thời gian: mặc định10 phút, chỉ gồm3/5/10/15/30, không có lựa chọn Tất cả, vẫn ngẫu nhiên trên mọi tỉnh/thành. Hết bàn: giữ fallback Home sang máy cơ bản, Chọn Bàn mở Tạo bàn. Tạo bàn dùng tỉnh/thành đang duyệt; khi mới mở Chọn Bàn mặc định theo địa chỉ hồ sơ. Số bàn tính theo province của phòng thật, không tăng bộ đếm giả.

- 2026-10-10 — Xem thử icon trong thẻ chọn tỉnh/thành: vùng ảnh104px desktop/80px compact; tên tỉnh/thành28px desktop/24px compact, dùng font chính theo tên người chơi: font-heading theo yêu cầu mới; giữ tỷ lệ ảnh. Ẩn thanh cuộn trực quan của danh sách tỉnh/thành nhưng vẫn giữ overflow-y-auto để xem đủ34 tỉnh/thành.

- 2026-10-10 — Icon tỉnh/thành: bộ 34 tỉnh/thành và thứ tự chính xác nằm trong `src/assets/room-selection/province-icons/manifest.json`; bảng asset 6 cột, hai ô cuối trống. File riêng đặt số thứ tự và tên tỉnh/thành, không dùng tên cũ/không tự thêm tỉnh. Chỉ hình biểu tượng hoạt hình đồng nhất, PNG alpha thật, không chữ/thẻ/khung/nền, crop sát. Người dùng yêu cầu tạo lại bộ mới vì ảnh tải lên 36 hình không khớp danh sách; không gán tên theo vị trí ảnh nguồn sai. Danh sách lựa chọn thực tế vẫn lấy API, không thay bằng dữ liệu minh họa.

- 2026-10-10 — Xem thử bộ chọn tỉnh/thành trong Chọn Bàn: dùng nguồn 8ee5ac91 làm khung ngoài, f6d81a33 làm thẻ tỉnh/thành. Runtime crop sát tại room-selection/province-picker-frame.png và province-card.png, giữ tỷ lệ; tiêu đề, nút đóng và danh sách API/cuộn là điều khiển HTML. Tiêu đề dùng font chính theo tên người chơi: font-heading, cỡ30px desktop/20px compact và không hiển thị tổng số tỉnh/thành bên cạnh. Nguồn/crop ghi trong province-picker-source.md.

- 2026-10-09 — Thời lượng Chơi nhanh và cấu hình Tạo bàn là hai state độc lập. Mở Tạo bàn mặc định 10 phút mỗi bên và 60 giây mỗi nước; thay đổi lựa chọn ở một nơi không được làm đổi nơi kia.

- 2026-10-10 — Bộ chọn khu vực Chọn Bàn phải tải toàn bộ tỉnh/thành hiện hành từ cùng API `/api/v2/?depth=1` dùng trong bộ chọn địa chỉ hồ sơ, không hard-code danh sách rút gọn. Thẻ hiển thị số bàn theo province của phòng và số người theo presence/province hồ sơ; tăng cỡ tên và số liệu theo yêu cầu mới. Chọn khu vực chỉ đổi phạm vi duyệt, không sửa địa chỉ hồ sơ.

- 2026-10-09 — Hai nút đáy trong Tạo bàn dùng artwork nút nền; hover tăng brightness và saturation trên vùng hit-area để nền nút sáng rõ hơn, không đổi opacity nền.

- 2026-10-09 — Bảng Tạo bàn đã duyệt: khi thu nhỏ hai nút đáy, thu cả artwork trên skin lẫn vùng bấm/chữ overlay theo bounding box mới; giữ khoảng trống và tâm nút, không scale cả panel.

- 2026-10-09 — Bảng Tạo bàn theo mẫu đã được duyệt; thu nhỏ đồng bộ còn tối đa680px ngang/73dvh cao (trước800px/86dvh), giữ tỷ lệ1488:926 và toàn bộ vị trí tương đối.

- 2026-10-09 — Nhạc nền chung dùng file người dùng cung cấp `src/assets/references/uploads/background-music-source.mp4` (runtime `src/assets/audio/background-music.mp4`); hết bài chờ5 giây rồi phát lại. Một player xuyên màn hình, nút nhạc đồng bộ; tắt nhạc hủy lịch phát lại. Mặc định bật; trình duyệt có thể cần thao tác để cho phép phát.

- 2026-10-09 — Bộ đếm năng lượng của EnergyNotice nằm trong góc trên trái khung thông báo, không neo vào viewport. Có thể tăng nhẹ kích thước khung theo yêu cầu hiện tại; giữ bộ đếm ở góc và nội dung cân bằng bên trong. Mỗi lần mở bảng, dropdown hồi năng lượng mở sẵn hướng lên.
- 2026-10-09 — Trong lúc hiệu ứng mở phòng đang chạy, nút Sẵn sàng vẫn thao tác được ngay. Giữ khóa nước đi cho tới khi hiệu ứng kết thúc; không áp dụng trạng thái inert/disabled mở phòng lên hành động Sẵn sàng.

- 2026-10-10 — Xem thử nền khung danh sách Chọn Bàn: #1c0e07 alpha40% (trong suốt60%), nâu đen tối hơn và trong suốt hơn theo yêu cầu mới. Dùng màu đã có trong selectionPalette. Bản A trước thử nghiệm lưu tại `docs/checkpoints/room-selection-A/`, nền #2C1408 alpha65% (trong suốt35%); không ghi đè A. Khi người dùng yêu cầu về A, khôi phục theo snapshot/README. Không dùng blur/backdrop-blur hay opacity cho cả khung. Viền #bd914e, góc #f4d995 và nội dung giữ nét.
- 2026-10-09 — Chọn Bàn bỏ nút Video dưới cùng, chuyển nút Bạn bè lên cụm tiện ích góc trên phải. Hai nút lọc ở dưới cùng; khung giữa giữ khoảng trên8px, chừa24px phía dưới (kéo mép dưới xuống thêm32px theo yêu cầu).

- 2026-10-09 — Chọn Bàn: ô nâu đầu có icon nhà bên trái; bên phải là khu vực đang duyệt (mặc định từ tỉnh/thành hồ sơ), dưới là tổng bàn ở khu vực đó và số kết nối đang ở trang Chọn Bàn có tỉnh/thành hồ sơ tương ứng (bao gồm mình). Không cộng người đang ngồi trong bàn vào bộ đếm này. Server giữ presence trong RAM, bỏ khi rời trang/vào phòng/mất kết nối. Chưa có auth/database nên đếm theo kết nối, chưa gộp nhiều tab của cùng tài khoản.
- 2026-10-09 — Ô địa chỉ Chọn Bàn viết gọn tiền tố “Thành phố ” thành “TP. ” khi hiển thị; tăng nhẹ icon bàn cờ, icon người và số đếm.
- 2026-10-09 — Thẻ địa chỉ Chọn Bàn dùng tên tỉnh20px (compact16), số đếm20px (compact16) và icon đếm22px (compact18), nhỏ hơn nhẹ. Icon kiếm Chơi nhanh36px (compact30), cùng cỡ dấu cộng Tạo bàn; giữ kích thước thẻ.
- 2026-10-09 — Toàn bộ nội dung thẻ địa chỉ có đệm dọc tối thiểu 5px; không thêm padding riêng cho tên thành phố. Chữ Chơi nhanh/thời lượng dùng 18px desktop/16px compact để cân bằng thị giác với chữ serif Tạo bàn 22px/18px.
- 2026-10-09 — Tên tỉnh/thành trong thẻ địa chỉ được hạ thêm 5px so với vị trí căn giữa ban đầu để nhìn rõ khoảng cách mép trên.
- 2026-10-09 — Nút giữa ở Chọn Bàn hiển thị “Tạo bàn” và dấu cộng cạnh nhau, căn giữa cả cụm.
- 2026-10-09 — Mũi tên Chơi nhanh mở bảng xổ dưới nút, chứa các mốc phút theo cột; mỗi thẻ mốc cùng chiều rộng/cao, chọn sẽ cập nhật và đóng bảng.
- 2026-10-09 — Bảng Tạo bàn theo ảnh riêng mới nhất: skin `assets/create-room/dialog-skin.png` có khung vàng, nền cảnh nâu/cây/chùa/mây, tiêu đề cong, ô chọn/nút như mẫu. Chỉ một skin nền, không thêm lớp nâu phủ; chữ và điều khiển HTML/SVG căn theo tỷ lệ skin. Mỗi lần mở mặc định10 phút/60 giây; các mốc mỗi bên3/5/10/15/30 phút, mỗi nước30/60/90/120 giây. Không nhập tên, tên nội bộ “Bàn cờ”. Server xác thực và giữ cấu hình khi reset/rematch; clock/vòng avatar dùng cùng giới hạn.
- 2026-10-09 — Chọn Bàn dùng hai thẻ mới người dùng cung cấp: thẻ nâu cho địa chỉ/Tạo bàn, thẻ đỏ cho Chơi nhanh. Giữ kích thước ô hiện hành; nội dung HTML đặt trên ảnh đầy đủ, không phủ nền nâu khác. Bản runtime được cắt sát, bỏ nhiễu alpha gần trong suốt ngoài thẻ; giữ nguyên ảnh nguồn.
- 2026-10-09 — Ảnh thẻ nâu được render thành img tuyệt đối object-fill phủ kín ô địa chỉ và ô Tạo bàn, nội dung đặt z-index bên trên; giữ chính xác kích thước các ô.
- 2026-10-09 — Thẻ Chọn Bàn cao 72px desktop/64px compact; bỏ border trong suốt 10px cũ vì nó thu nhỏ vùng ảnh nền và làm nội dung vượt viền. Chữ/icon đặt trực tiếp trên ảnh thẻ đầy ô, không có lớp phủ riêng.
- 2026-10-09 — Icon nhà Chọn Bàn dùng bản mới nền alpha trong suốt, crop sát; không dùng ảnh nhà cũ có nền nâu hình chữ nhật. Tăng chữ địa chỉ, số đếm và nhãn Tạo bàn/Chơi nhanh theo yêu cầu.
- 2026-10-09 — Hình trạng thái danh sách bàn trống dùng ảnh bàn mới `references/uploads/empty-board-source.png`, bản runtime crop sát; hiển thị màu gốc không mix-blend-screen.
- 2026-10-09 — Năng lượng chỉ ảnh hưởng online: mỗi ván online bắt đầu trừ 1 cho mỗi người chơi, người xem không trừ. Hết năng lượng chặn Sẵn sàng/xếp hàng, tạo/vào phòng chưa chơi và ghép nhanh vào phòng online; vẫn được vào phòng đang chơi để xem. Home, local và đấu máy/Cờ Úp luôn chơi được, không trừ năng lượng. Ngoại lệ xem thử tạm thời: máy cơ bản ở Cờ Tướng và Cờ Úp dùng luật chặn/trừ như online cho đến khi người dùng kết thúc thử nghiệm; lựa chọn máy khác được miễn. Cảnh báo riêng giữa màn hình trên client thao tác. Hồi 1 điểm mỗi7 phút, tối đa5. Video chưa tích hợp; năng lượng chỉ lưu trong session. EnergyNotice đặt bộ đếm năng lượng ở góc trên trái, dropdown thời gian mở sẵn hướng lên; click trong khung thu dropdown, click ngoài khung đóng bảng, Bỏ qua đóng bảng.
- ENERGY-UI-01 (2026-10-09): Khi chỉnh màu nút Bỏ qua trong EnergyNotice, không kế thừa `lobbyButton` vì class đó có nền vàng dùng chung. Dùng `buttonInteraction` và khai báo nền nâu trực tiếp; hover sáng hơn. Kiểm tra màu thực tế trong CSS đã build, không chỉ thấy class màu nâu trong JSX.

Cập nhật: 2026-10-06. File này lưu các quyết định người dùng đã chốt và bài học từ lỗi trong quá trình sửa project. Lịch sử công việc nằm ở `PROGRESS.md`; quy tắc đang có hiệu lực nằm ở đây và các tài liệu chuyên biệt được dẫn bên dưới.

## Cách sử dụng bắt buộc

1. Trước khi sửa project, đọc file này và tài liệu chuyên biệt của phần đang sửa. Không dựa riêng vào lịch sử chat hoặc trí nhớ.
2. Khi người dùng nói “lưu quy tắc”, “quy tắc tiếp theo”, hoặc chốt một hành vi mặc định, cập nhật quy tắc vào đúng mục và cập nhật tài liệu chuyên biệt nếu có. Ghi ngày, phạm vi và điều người dùng thực sự yêu cầu.
3. Khi người dùng thay đổi một quy tắc, sửa nội dung đang có hiệu lực; ghi quyết định cũ vào lịch sử nếu cần. Không để hai quy tắc trái nhau cùng được trình bày là mặc định.
4. Phân biệt quy tắc lâu dài với xem thử UI. Không biến thử nghiệm thành mặc định cho người chơi mới.
5. Khi gặp lỗi hoặc người dùng báo lỗi, ghi hiện tượng và cách tránh tái diễn. Chỉ ghi nguyên nhân khi đã kiểm tra; nếu chưa xác định thì ghi rõ chưa xác định.
6. Trước khi bàn giao, đối chiếu diff với các quy tắc liên quan và các lỗi đã ghi. Ghi đúng kết quả kiểm chứng; build thành công không đồng nghĩa đã kiểm tra trình duyệt.
7. Nếu yêu cầu mới rõ ràng thay đổi quy tắc cũ, áp dụng yêu cầu mới và cập nhật ghi nhớ. Nếu chưa rõ phạm vi hoặc có phần được khóa theo AGENTS.md, thực hiện theo hướng dẫn tương ứng trong AGENTS.md.
8. Quy tắc đồng bộ người dùng chốt2026-10-05: Mỗi lần sửa một thành phần được dùng ở nhiều nơi, tìm mọi consumer trong project và sửa tương ứng trong cùng nhiệm vụ. Dùng component/token chung để lần sửa sau tự đồng bộ; giữ tỷ lệ/vị trí tương đối theo kích thước vùng chứa. Không duy trì ngoại lệ màn hình nếu người dùng chưa yêu cầu.
9. Quy tắc khóa người dùng chốt2026-10-05: Nếu một thay đổi, kể cả task khác, trực tiếp chạm/cần sửa hoặc có tác động phụ lên phạm vi đã khóa, dừng trước khi sửa phần khóa; nêu rõ phạm vi bị ảnh hưởng và hỏi xin mở khóa cụ thể cho task hiện tại. Vẫn có thể làm phần độc lập không chạm vùng khóa. Chỉ sửa sau khi người dùng xác nhận; sau đó khóa lại. Mỗi xác nhận chỉ áp dụng cho phạm vi/task được nêu, không tự mở khóa cho lần sau. Đọc hoặc kiểm tra mã không phải là quyền sửa.

## Quy tắc đang có hiệu lực

### Khóa UI theo khu vực — 2026-10-06

- Khóa phần giao diện hiện hành của **Lịch sử**, **Xếp hạng** và **Bạn bè** theo phạm vi đang hiển thị; giữ nguyên UI đã chốt. Đây là khóa trình bày, không khóa dữ liệu/chức năng nếu không làm đổi UI. Nếu thay đổi khác có thể tác động các vùng này, hỏi mở khóa trước.
- Theo yêu cầu người dùng2026-10-06, toàn bộ UI Danh hiệu đang mở khóa để thử nghiệm: catalog, popup Thông tin danh hiệu và các phần danh hiệu hiển thị trong/ngoài thông tin user. Khung/ảnh danh hiệu cùng cụm sao đi kèm được mở khóa cả ở các consumer khác như Lịch sử, Xếp hạng, Bạn bè, Home, Hồ sơ, Tùy chỉnh và PlayerCard; giữ mở đến khi người dùng khóa lại. Thanh cuộn trực quan trong catalog và các vùng nội dung danh hiệu bị ẩn, overflow-y-auto vẫn giữ cuộn. Avatar người chơi và khung avatar vẫn khóa độc lập; bố cục các màn Lịch sử/Xếp hạng/Bạn bè vẫn khóa.
- Danh sách phạm vi đang khóa/mở khóa được ghi tại `PROGRESS.md` mục “Phạm vi khóa đang có hiệu lực”.

### Avatar

- Quy tắc2026-10-05: mọi nơi hiển thị avatar trong project đều phải có `cursor-pointer`, kể cả avatar không có hành động gắn riêng. Áp dụng tại component dùng chung và avatar độc lập; không thay kích thước/vị trí đã khóa.

### Danh hiệu, Elo và sao

- Người chơi mới bắt đầu ở **1000 Elo**, danh hiệu **Tân Binh**, **1 sao**. Hằng số dùng chung: `DEFAULT_PLAYER_ELO` trong `src/lib/rankProgression.ts`.
- Thứ tự bảy danh hiệu: **Tân Binh → Kỳ Sĩ → Kỳ Thủ → Kỳ Tướng → Đại Sư → Kỳ Vương → Kỳ Thánh**. Đại Sư là bậc5, Kỳ Vương là bậc6.
- Mốc bậc: 1000 / 1300 / 1600 / 1900 / 2200 / 2500 / 2800. Mỗi100 Elo thêm1 sao, mỗi bậc tối đa3 sao. Sao ngừng tăng tại2800; Elo vẫn có thể tăng. Chi tiết chính thức tại `docs/RANK-SYSTEM.md`.
- Chỉ hiển thị sao đã đạt. **Sao luôn xếp từ trái sang phải trong vùng cố định**: sao đầu không dịch khi số sao thay đổi, kể cả chỉ có1 sao. Không căn giữa các sao theo số lượng đang có.
- Vùng đủ3 ô sao dưới danh hiệu được căn giữa rồi dịch phải3px theo anchor106px; chỉ điền các sao đã đạt từ ô trái sang phải. Căn vị trí vùng theo khung không được làm sao1 tự nhảy vào giữa vùng. Hàng3 sao chiếm78% bề rộng khung (3×25% + 2×1.5%).
- Giữ bộ bảy ảnh mới, catalog `src/lib/rankArtwork.ts`. Các cụm avatar/danh hiệu dùng component chung và giữ vị trí, kích thước thống nhất giữa các bậc. Nguồn/crop tại `src/assets/ranks/rank-artwork-v2.md`.
- **Chuẩn sao toàn project2026-10-05 (đã dịch xuống2px theo yêu cầu):** danh hiệu top84.876613px, sao top120.961945px theo avatar106px; khung132.746801×53.085332px. RANK_STAR_LAYOUT: bottomInset14px, clusterOffsetY-6px, offsetX3px, sao25cqw, gap1.5cqw. RANK_TITLE_STARS_STYLE dùng chung, không offset riêng từng màn hình. Không tự đổi vị trí sao để chữa mờ hoặc bố trí lại thẻ.
- **ĐÃ KHÓA — kích thước/vị trí avatar và khung avatar:** giữ theo thông số responsive hiện hành; yêu cầu thay đổi phải hỏi mở khóa. **ĐÃ MỞ KHÓA theo yêu cầu2026-10-06 — hình học danh hiệu và cụm sao đi kèm:** có thể chỉnh kích thước/vị trí trên toàn project để thử nghiệm, nhưng không thay đổi bố cục tổng thể của Lịch sử, Xếp hạng và Bạn bè.
- Mọi nơi dùng `RankTitleBadge`/`AvatarRankBadge` với `RankStars` và ảnh `src/assets/player/rank-star.png`: Home/Hồ sơ/Tùy chỉnh/PlayerCard/Xếp hạng/Bạn bè. Bạn bè đặt sao dưới ảnh danh hiệu bằng cùng component, cụm rộng166px/cao84px trong hàng85px. Không dựng sao bằng ký tự★ hoặc bộ ảnh khác.
- Người dùng đã cho phép thay đổi tọa độ sao Home và yêu cầu áp dụng chuẩn này trên toàn project. Mọi thay đổi tiếp theo phải đồng bộ qua nguồn dùng chung; giữ tỷ lệ, gap và hướng điền sao đã chốt.
- Rendering UI2026-10-05: bắt buộc đọc docs/UI-IMAGE-RENDERING.md trước khi sửa ảnh nhỏ. RankTitleBadge dùng CrispUiImage render ảnh gốc trực tiếp với object-contain; bỏ SharpRankArtwork/Canvas trung gian và lớp GPU translateZ(0)/backface bắt buộc. Giữ contrast1.12 tĩnh đã có, không thêm filter tăng nét hoặc pixelated/optimize-contrast. Home/Hồ sơ/Bạn bè/Lịch sử/Chơi với máy dùng getCrispUiLayout tính CSS cuối cùng thay parent scale. Giữ asset, bố cục và tỷ lệ/tọa độ sao chuẩn.
- Hover homeUtilityButton dùng nền/viền/chữ, không brightness/filter hoặc transition rộng. RankTitleBadge giữ isolation:isolate, không ép GPU layer và không vẽ lại Canvas theo hover. Giữ tọa độ/kích thước hoặc vùng sao. Screenshot tĩnh không chứng minh mọi frame đều hết nhấp nháy.

### Danh hiệu trong hồ sơ — 2026-10-06

- Khi danh hiệu được chọn vượt sức chứa khung, chia thành các trang tối đa9 danh hiệu (3 cột × 3 hàng), giữ thứ tự nhóm/cấp đang có.
- Mở hồ sơ và thay đổi danh sách luôn bắt đầu ở trang đầu. Đứng ở khung đầu1,5 giây, sau đó chạy đều đến mép cuối khung cuối trong tổng cộng6 giây. Dừng ở cuối0,5 giây rồi nhảy ngay về khung đầu và lặp lại; chu kỳ8 giây, không trượt ngược.
- Dừng bộ đếm khi khung không hiện, khi xem chi tiết danh hiệu hoặc rê chuột trong khung. Trang chưa hiện không nhận thao tác/focus; chế độ giảm chuyển động vẫn đổi trang nhưng bỏ hiệu ứng trượt.

### Hồ sơ người khác — 2026-10-06

- Bấm avatar người khác mở hồ sơ với vùng danh hiệu được thay bằng6 nút,3 cột ×2 hàng: Xem thông tin → So tài → Thêm bạn/Xóa bạn → Nhắn tin → Theo dõi → Tặng quà. Nhãn Thêm bạn/Xóa bạn dựa theo danh sách bạn bè hiện có.
- Theo mẫu b99a1e64-d36b-41e2-8824-05088d378d56 ngày2026-10-06:6 nút dùng bộ7 asset mới (1 khung,6 icon) ở src/assets/profile/actions; giữ3 cột ×2 hàng. Icon bên trái, chữ Cormorant đậm bên phải, cỡ10.7cqw theo bề rộng nút (tracking-0.025em để nhãn dài không tràn); icon rộng32% vùng nội dung, lề nội dung trái9%/phải3%, gap1%. Giữ tỷ lệ khung1471:606, icon object-contain, không thêm nền/viền/bóng hoặc hover; lề ngang12px, trên32px/dưới40px và gap ngang12px/dọc20px theo thiết kế responsive. Mẫu chỉ đối chiếu, không import vào UI; nguồn/crop ghi trong assets/profile/actions/source.md. Quy tắc này thay style nút phẳng #875026 trước đó.
- Xem thông tin mở lại vùng danh hiệu; Quay lại trở về6 nút. Mở hồ sơ mới luôn bắt đầu ở6 nút. Hồ sơ của chính mình giữ vùng danh hiệu.
- Luồng dùng chung cho Home, Bạn bè, Xếp hạng, Lịch sử và avatar trong bàn chơi/chat/danh sách phòng. Các hành động xã hội hiện chưa có xử lý; bấm sẽ báo chưa được hỗ trợ, không báo gửi hay thay đổi quan hệ thành công.

### Bạn bè

- Vị trí hiện hành2026-10-05: nền nâu Bạn bè dài thêm50px responsive về bên trái, mép phải giữ nguyên; danh hiệu/sao/tên bậc dịch riêng sang trái50px qua brownContentPosition trong FriendRow chung mọi tab và tiếp tục khóa. Nhóm nút theo yêu cầu mới căn sát mép phải nền nâu, chừa8px responsive, không dịch trái50px cùng danh hiệu nữa. Avatar giữ vị trí cũ; tên/trạng thái người chơi dịch trái8px responsive bằng gap avatar→chữ36px xuống28px trong FriendIdentity dùng chung mọi tab. Kích thước avatar/danh hiệu/sao giữ nguyên.

- Bắt buộc đọc `docs/FRIENDS-UI-RULES.md` trước khi sửa Bạn bè; tài liệu đó giữ thông số chi tiết và quy tắc bộ lọc.
- Tất cả: bạn trong game. Đang online: bạn trong game đang online. Bạn Facebook: bạn Facebook có chơi game và đăng nhập/liên kết Facebook, bao gồm cả online lẫn offline.
- Chỉ có hai trạng thái online/offline; Facebook là thuộc tính riêng. Chấm trạng thái, chữ trạng thái và icon Facebook nằm cùng hàng ngang. Icon Facebook21px, cách chữ6px.
- Luôn xếp online trước offline trong mọi danh sách Bạn bè; giữ thứ tự ổn định trong cùng trạng thái.
- Các hàng dùng chung kích thước avatar, padding, tên/trạng thái, danh hiệu. Danh sách và Thêm bạn dùng cùng vị trí khung; Lời mời đồng bộ kích thước hàng nhưng có thể khác vị trí vùng cuộn.
- Hover chỉ đổi màu/độ sáng; không dịch vị trí, scale hoặc đổi kích thước chữ/nút. Các nút phải có phản hồi khi bấm.
- Danh sách đã gửi lấy từ lời mời mình đã gửi; badge đỏ trên tab Lời mời đếm lời mời đã nhận.

### Asset và phạm vi sửa

- Chốt2026-10-05: Khi yêu cầu chỉ làm rõ ảnh/chữ, giữ nguyên kích thước và vị trí hiện tại; không phóng to danh hiệu, sao, avatar hoặc nới hàng/cột để chữa mờ. Độ tương phản ảnh danh hiệu hiện cố định1.12, không hover/transition; áp dụng chung qua RankTitleBadge.

- Lịch sử2026-10-05: Theo yêu cầu mới, Thắng/Thua dùng hai hình từ sprite PNG 24f07314-e511-454e-9d58-2a50197a5a34.png (2172×724), nằm trong src/assets/history. MatchResultBadge dùng SVG viewBox để hiển thị trực tiếp vùng Thắng(126,177,935,361) và Thua(1115,191,936,353), giữ tỉ lệ gốc, alpha và màu. Ô vẫn82.77551×39px responsive; Thua giữ offset-2px/-2px. Áp dụng cả hai người chơi và Đã chơi/Đã lưu. Quyết định này thay cách dùng text/SVG nền cũ; không thêm chữ HTML chồng lên artwork.

- Xếp hạng2026-10-05: theo yêu cầu giữ kích thước cũ, đã bỏ sizeScale1.2. Avatar84px, danh hiệu khoảng105.2px theo cùng chuẩn Home; hàng138px, padding dọc0/gap8px; khối nhận diện132px, lề trái8px, avatar đặt xuống5px. Cả tab Cờ Tướng/Cờ Úp dùng cùng component. Chỉ cải thiện độ tương phản ảnh cố định1.12 (không transition/hover/filter URL), giữ lớp vẽ ổn định. Không tăng kích thước danh hiệu/sao/avatar/hàng để chữa mờ. Huy hiệu90×90px căn giữa, số hạng4+ neo tâm50%/50%; dữ liệu vẫn minh họa.

- Ảnh mới phải cắt sát bounding box nội dung nhìn thấy; phần ngoài hình trong suốt thật. Giữ tỷ lệ, màu, chữ và chi tiết của ảnh nguồn.
- Dùng component/catalog chung khi nhiều màn hình cần cùng hình và kích thước. Không đổi phần UI đã chốt ngoài phạm vi yêu cầu.
- Sau thay đổi project, chạy build theo AGENTS.md, xác nhận dist cập nhật và ghi kết quả thực tế vào PROGRESS.md.

## Xem thử đang bật

- 2026-10-04: Home dùng `previewStars={3}` để xem thử Tân Binh đủ3 sao. Elo session vẫn1000; đây không phải quy tắc sao mặc định của người chơi mới. Các nơi không truyền previewStars lấy sao thật theo Elo.
- Chế độ luân phiên danh hiệu mỗi2 giây đã được gỡ theo yêu cầu; không tự bật lại.

## Lỗi đã gặp và cách tránh

- HONOR-TEXT-01 (2026-10-06): Người dùng báo chữ Phong Tặng trong popup không dịch. Đã xác nhận helper liên tục gán lại offset cố định; cấp4/5 vẫn -2px sau yêu cầu dịch lên2px nên không có thay đổi. Với tinh chỉnh dịch thêm, cộng mức dịch vào vị trí đang hiển thị; đo DOM trước/sau để xác nhận delta. Chỉ truyền offset tại HonorDetailPopover; catalog/preview giữ nguyên.

| Mã | Hiện tượng / bằng chứng | Nguyên nhân đã xác định | Cách tránh và kiểm chứng |
| --- | --- | --- | --- |
| STAR-01 | Người dùng báo1 sao nằm giữa khung thay vì xếp từ bên trái. | RankStars từng căn giữa theo số sao hiện có. | Căn giữa vùng đủ3 ô cố định, điền từ trái sang phải. Đối chiếu cả1,2,3 sao: sao đầu phải giữ nguyên vị trí. Phân biệt căn vùng với căn các sao. |
| STAR-02 | Cụm đủ3 sao lệch trái so với danh hiệu. | Hàng sao chiếm78% chiều rộng nhưng bắt đầu ở mép trái của wrapper100%, phần dư chỉ nằm bên phải. | Căn giữa vùng đủ3 ô (78%) trong wrapper; tâm wrapper trùng tâm danh hiệu. Không căn giữa theo số sao đã đạt. |
| STAR-03 | Vị trí sao Home khác các màn hình còn lại. | AvatarRankBadge từng chọn offset riêng bằng placement=home; Bạn bè dựng khung sao riêng cạnh tên. | Dùng RankTitleBadge và RANK_TITLE_STARS_STYLE chung; khi sửa chuẩn, tìm và đồng bộ mọi consumer trong cùng nhiệm vụ. |
| RANK-01 | Danh hiệu nhấp nháy khi rê chuột vào vùng khác sau khi thêm tăng nét. | Bộ lọc SVG convolution là thay đổi trước khi lỗi xuất hiện; chưa xác nhận nguyên nhân ở mức compositor. | Gỡ filter URL/SVG ở RankTitleBadge và dùng ảnh trực tiếp; không thêm lại xử lý nét động nếu chưa kiểm tra hover ở các consumer. |
| RANK-02 | Người dùng báo danh hiệu vẫn nháy khi hover các nút tiện ích bên phải sau khi gỡ SVG filter. | DOM xác nhận các nút chạy brightness(1.25) và transition có filter; chưa xác nhận nguyên nhân compositor trên trình duyệt người dùng. | Đổi hover chung sang nền/viền/chữ, tách lớp vẽ danh hiệu tĩnh bằng translateZ(0); kiểm tra trạng thái hover của cả5 nút, không kết luận từ screenshot tĩnh rằng mọi frame đều không nháy. |
| RANK-01 | Đổi ảnh danh hiệu có nguy cơ làm các màn hình dùng bộ ảnh khác nhau. | Trước khi đồng bộ, FriendsDialog có bộ import riêng và AvatarRankBadge có catalog riêng. | Mọi nơi lấy ảnh từ rankArtwork; khi đổi bậc kiểm tra đồng thời tên, Elo và ảnh. |
| FRIEND-01 | Người dùng báo đổi tab làm avatar, tên/trạng thái và hàng bị nhích lên/xuống. | Chi tiết nguyên nhân từng lần không được kiểm chứng lại trong ghi nhớ này. | Dùng FriendRow và các kích thước cố định trong FRIENDS-UI-RULES; kiểm tra vị trí giữa các tab và các hàng liên tiếp. |
| FRIEND-02 | Người dùng nhiều lần báo icon Facebook rơi xuống dòng dưới trạng thái. | Chưa ghi nhận nguyên nhân đã kiểm chứng tại đây. | Chấm, chữ, icon cùng một flex-row/nowrap; kiểm tra online/offline và tên dài. |
| FRIEND-03 | Người dùng báo hover làm chữ dịch chuyển hoặc giao diện nhấp nháy. | Chưa ghi nhận nguyên nhân đã kiểm chứng tại đây. | Hover chỉ đổi màu/độ sáng; kiểm tra transform, kích thước, margin, font và transition trước khi bàn giao. |
| CHECK-01 | Kiểm tra bundle từng báo thiếu timer2000ms dù build có timer. | Vite rút gọn2000 thành2e3. | Kiểm tra kết quả biên dịch phù hợp với dạng minify; không kết luận thiếu chức năng chỉ vì chuỗi mã nguồn đổi cách viết. |

## Mẫu thêm quy tắc

- Ngày:
- Phạm vi / file liên quan:
- Quy tắc người dùng chốt:
- Thay thế quy tắc cũ nào (nếu có):
- Cách kiểm chứng:

## Mẫu thêm lỗi

- Mã lỗi / ngày:
- Hiện tượng và thao tác gây lỗi:
- Nguyên nhân đã xác định, hoặc “chưa xác định”:
- Cách sửa / cách tránh:
- Kết quả kiểm chứng thực tế:

- STAR-04: Không tự neo sao xuống đáy hoặc đổi vị trí để chữa mờ. Ngày2026-10-05 người dùng yêu cầu rõ dịch sao xuống2px, chuẩn hiện hành top120.961945px theo avatar106px. Mọi lần đổi chuẩn phải xuất phát từ yêu cầu và đồng bộ qua token chung.

- Rendering Xếp hạng2026-10-05: RankingDialog dùng CSS cuối cùng/pixel nguyên, không scale parent hoặc medal; RankingRankBadge render ảnh gốc trực tiếp. Cùng quy tắc rendering nay áp dụng toàn project qua CrispUiImage/getCrispUiLayout. Sao/gap/top vẫn dùng tỷ lệ chuẩn Home, không làm tròn riêng từng consumer. Nguồn rank/sao đủ2x; một số icon/khung Lịch sử chưa đủ2x, xem docs/UI-IMAGE-RENDERING.md. Không upsample rồi nhận là ảnh nguồn rõ hơn.

- Đồng bộ sao2026-10-05: Home là chuẩn duy nhất cho kích thước sao25% chiều rộng khung, gap ngang1.5%, top67.9761% chiều cao khung và dịch phải3px theo khung tham chiếu132.746801px. Xếp hạng đã bỏ cách tự làm tròn riêng sao/gap/top, dùng chính RankStars và RANK_TITLE_STARS_STYLE như Home/Hồ sơ/Tùy chỉnh/PlayerCard/Bạn bè. Ưu tiên tỷ lệ sao giống Home hơn làm tròn từng sao; ảnh danh hiệu Xếp hạng vẫn render trực tiếp và parent không scale. Không thay vị trí chuẩn Home hoặc nới các thẻ.

Quy tắc2026-10-05: Tân Binh giữ vị trí sao hiện hành. Sáu bậc2–7 (Kỳ Sĩ/Kỳ Thủ/Kỳ Tướng/Đại Sư/Kỳ Vương/Kỳ Thánh) hạ riêng hàng sao thêm1px CSS bằng getRankTitleStarsStyle(rank.level), top=calc(top chuẩn + 1px). Áp dụng mọi consumer; không dịch danh hiệu, avatar, thẻ hoặc thành phần UI khác; không đổi size/gap/hướng điền sao. Đây là ngoại lệ theo bậc người dùng yêu cầu, không phải offset riêng màn hình.

- 2026-10-05: Khung đỏ Gợi ý cho bạn ở Thêm bạn dùng cùng friendSectionTitle/Style cao50px thiết kế như hai tiêu đề Lời mời. Đặt trong hàng điều khiển54px theo token responsive để giữ mốc Danh sách/Thêm bạn; không dùng inline height54px cố định bỏ qua hệ số responsive.

- 2026-10-05: Người dùng cho phép mở khóa riêng vị trí ngang danh hiệu giữa các tab Bạn bè, lấy Danh sách làm gốc. FriendRow trước đó đặt cột rank270px trong lời mời và240px ở Danh sách/Thêm bạn làm tiêu đề lệch30px. Dùng cột240px cho mọi FriendRow, giữ cột thao tác330px và tất cả kích thước avatar/khung/sao. Vị trí đã căn chung và tiếp tục được giữ khóa cho lần sau; không mở khóa kích thước.

- 2026-10-05: Theo yêu cầu nới nhẹ các hàng Bạn bè, FriendRow tăng85→90px responsive; grid content track giữ85px để avatar/danh hiệu/sao giữ nguyên kích thước và vị trí tương đối. Phần tăng thêm chỉ tạo khoảng trống cuối hàng; tất cả tab cùng FriendRow nên đồng bộ.

- 2026-10-05: Đồng bộ chiều cao nút Kết bạn, Chấp nhận/Từ chối và Hủy lời mời theo nút Mời chơi của Danh sách bằng token responsive60px; không đổi chiều rộng, icon hay vị trí. Build/typecheck PASS; browser QA tại1280x720: Kết bạn và Chấp nhận đều cao51px CSS sau scale responsive.


- 2026-10-05: Căn giữa theo chiều dọc nội dung FriendRow trong hàng cao90px: giữ track85px, thêm căn giữa content của grid để phân bổ khoảng trống thừa đều trên/dưới. Kích thước, khoảng cách tương đối avatar/danh hiệu/sao và các nút không đổi; áp dụng chung mọi tab Bạn bè. Build/typecheck PASS, dist index-BIZNY3sd.js; browser QA Danh sách ở localhost: hàng55px màn hình, nội dung centerDelta=-0.4px do responsive scale.

- HONOR-SPRITE-01 / 2026-10-05: Khung Chuỗi Chiến Thắng bị cắt lệch và lộ một phần khung khác sau khi đổi scaleY thành aspect-ratio của ô crop nhưng giữ ảnh sprite height:auto. Cách tránh: khai báo cả imageWidth và imageHeight theo tỷ lệ kích thước sprite/vùng crop; ảnh bên trong phải dùng cùng hệ tọa độ phần trăm với ô crop. Đã sửa cả ba nhóm Chuỗi Chiến Thắng/Tổng Ván Chơi/Online Chuyên Cần và HonorDetailSprite; giữ slot, độ rộng, aspect-ratio và các vị trí hiện hành. Typecheck/build PASS; kiểm tra trình duyệt cả ba nhóm và chi tiết Thống Trị không còn ảnh khung dư.

- 2026-10-05: Khoảng cách dọc trong catalog Danh hiệu của mọi tab lấy tab Tất cả làm chuẩn. gap-y phần trăm tính theo tổng chiều cao nội dung nên phải chuẩn hóa theo số hàng: gap = 3% × số hàng Tất cả / số hàng tab hiện tại. Giữ lưới ba cột và kích thước thẻ; không để nhóm ít danh hiệu có khoảng cách hàng nhỏ hơn.

- 2026-10-05: Vị trí khung tiêu đề nhóm friend-section-title-frame-tight.png lấy Gợi ý cho bạn ở Thêm bạn làm chuẩn. Giữ cùng lề ngang/chiều rộng/chiều cao và độ lệch dọc (slot54px - khung50px)/2 theo token responsive. friendSectionTitleStyle dùng chung cho Gợi ý, Lời mời đã nhận và Đã gửi lời mời; Add dùng align-start để độ lệch chung giữ nguyên tọa độ mẫu. Không tăng chiều cao slot hoặc dịch các danh sách/avatar/danh hiệu/sao đã khóa để căn tiêu đề.
- 2026-10-09: Repetition UI rule update: the shared third-round warning is the only centered board panel. A blocked fifth-move red-dot click shows nothing to the actor; online server validation sends a short status only to the opponent, with no clock pause or move commit.
- 2026-10-09: Người dùng yêu cầu bỏ chiếu lặp. Nước đi nào tạo chiếu sẽ xóa chu kỳ lặp hiện tại và không được tính làm nước mở đầu chu kỳ; giữ nguyên đếm/cảnh báo/chặn cho chu kỳ phối hợp đi quân không chiếu. Không triển khai luật phạt chiếu dai.
- 2026-10-09: The manual repetition-test AI first tries its scripted cannon shuttle; if that move is blocked or cannot answer check, it falls back to a normal legal move instead of surfacing a false engine error.
- 2026-10-09: Removed the temporary cannon repetition fixture from Home quick play and computer engine options. Quick play again uses the normal room-matching flow; when it falls back to local basic AI, the machine chooses freely among legal moves after filtering fifth-round repetition violations. Pikafish keeps server validation.
- 2026-10-09: Room Selection header uses the shared player-selected avatarIndex and avatarFrameIndex with AvatarFrameOverlay; the editable player name uses font-heading. Keep its existing header geometry.
- 2026-10-09: In-game check indication uses the existing white move ring around the checked side's general; suppress the textual “đang bị chiếu” status. Keep other status/result messages and last-move ring behavior.
- 2026-10-09: Room Selection header name input has no underline and the avatar/name cluster remains vertically centered in the fixed header.
- 2026-10-09: Takeback-decline “Từ chối” badge must render above the player portrait, frame, and timer arc. Keep the existing badge size, position, and animation; use a stacking level above those avatar overlays.
- 2026-10-09: Room Selection header name is 20px desktop / 16px compact. Use lining-nums and tabular-nums so digits in editable names share the text baseline; preserve vertical centering.


- 2026-10-10 ? Theo y?u c?u l?m nhanh UI ?i?n tho?i: Home c? b? c?c 2?2 n?t ch?i v? ti?n ?ch d? ch?m; Ch?i V?i M?y c? form mobile ri?ng d?ng c?ng hook; Ch?n B?n d?ng k?ch th??c CSS th?c, l??i2 c?t v? ch?n t?nh cao80dvh. Trong v?n, chat mobile m? b?ng n?t, thao t?c v?n l?n h?n v? d?nh v?ng ??y ri?ng. Ch? ??i tr?nh b?y compact, gi? logic/API v? UI desktop; kh?ng s?a avatar, khung avatar ho?c b? c?c c?c dialog x? h?i ?? kh?a. Build/typecheck th?nh c?ng; ch?a ki?m ch?ng tr?c quan tr?n ?i?n tho?i th?t.

- 2026-10-10 ? Sau khi v?n k?t th?c c? ng??i th?ng, gi? k?t qu? ?t nh?t3 gi?y r?i m?i ??a ng??i ??u h?ng hi?n t?i l?n thay ng??i thua; ng??i thua xu?ng cu?i h?ng. Ch?n ready/reset ?? kh?ng b? qua h?ng ch? trong3 gi?y. Server tick th?c hi?n chuy?n gh?; ng??i xem kh?ng x?p h?ng v?n kh?ng ???c ??a l?n. R?i ph?ng v?n l?p gh? ngay theo quy t?c tr??c. Demo hai m?y c?ng k?t th?c tr??c, ??i3 gi?y r?i cho ng??i x?p h?ng v?o v?n m?i.

- 2026-10-10 ? Ng??i ch?i b?t ??u phi?n v?i ??5 n?ng l??ng (MAX_ENERGY), kh?ng kh?i t?o0. Gi? c? ch? tr?/h?i v? l?u trong phi?n hi?n t?i.

- 2026-10-10: Queue timing supersedes prior minimum delay: entries queued before match end wait 3 seconds; entries queued after match end promote immediately when first in line. Rematch readiness still prevents replacement. Preserve FIFO; demo follows the same timing.

- 2026-10-13 — Ảnh 63d54150 thay mặt sau của quân còn úp trên bàn trong ván Cờ Úp; ô chế độ Cờ Úp trên Home giữ nguyên. Không thay luật lật quân hoặc hình quân đã lật.
- Lần hiểu nhầm thay artwork ô Home đã được hoàn tác theo đính chính của người dùng; ảnh cắt/trim 441×435 chuyển sang `pieces/concealed-back.png`.


- Kiểm chứng mặt quân úp 2026-10-13: Home import lại hidden-full.png; typecheck/build PASS, dist có concealed-back-Clukm56z.png. Chưa QA trình duyệt trực tiếp.
- 2026-10-13 — Người dùng chốt giữ ảnh quân úp mới 63d54150 trong ván Cờ Úp; ảnh hiển thị lấp đúng cùng khung quân 108×112 của quân đã mở, cùng bóng đổ và scale khi bàn co giãn. Ô Home giữ nguyên.
- 2026-10-13 — Mặt sau quân Cờ Úp giữ ảnh/kích thước đã chốt; giảm độ bão hòa riêng lúc render xuống 0.84 để viền cam gần tông gỗ của quân mở. Không đổi asset quân mở và ô Home.
- 2026-10-13 — Theo phản hồi, hình quân Đỏ đã mở trong bàn cờ dịch sang phải 2px ở scale bàn gốc để tâm tròn nhìn cân với giao điểm; offset nhân theo scale của Board trong ChessPiece. Không dịch quân Đen hoặc quân còn úp, không sửa file ảnh.
- 2026-10-13 — Chơi với máy desktop theo ảnh mẫu người dùng: một robot Pikafish căn giữa trên bảng 1058×543, hai hàng 5 nút cấp (mặc định Cấp 2), chọn phe và hai nút hành động dưới; banner Cờ thế giữ asset cũ. Biển tên vẫn cho chọn Máy · Cơ bản để giữ tính năng. Cấp Pikafish 1–10 giới hạn thời gian suy nghĩ từ 1/10 đến toàn mức tối đa hiện hành; server xác thực cấp. Header, nền, avatar, mobile và các màn khác giữ nguyên.

- 2026-10-14 — Thông báo thao tác trong Vị trí tùy chỉnh tự ẩn sau 3 giây; thông báo mới thay bộ hẹn giờ cũ, rời màn hình thì dọn timer.

- 2026-10-14: Vị trí tùy chỉnh có công tắc Đi tiên riêng dưới Đổi bên; mặc định Đen. Gạt sang Đen nền đỏ, sang Đỏ nền trắng vàng. Phe cầm quân độc lập bên đi trước; kiểm tra/lưu FEN/Đấu ngay dùng bên đi trước.

- 2026-10-14: Đính chính công tắc Đi tiên theo ảnh: núm bên phải/nền đỏ là Đỏ đi trước; núm bên trái/nền trắng vàng là Đen đi trước. Chữ Đi tiên cách cụm chọn thêm8px.

- 2026-10-14: Công tắc Đi tiên mặc định Đỏ theo yêu cầu mới; biểu tượng ⇄ trong nút đổi bên được nâng2px.

- 2026-10-14: Theo yêu cầu mới, màn Vị trí tùy chỉnh bỏ cụm user bên trái (avatar/danh hiệu/tên); nhãn Đi tiên tăng16→20px. Không còn hàng trống avatar trên compact.

- 2026-10-14: Hai hàng Chọn bên/Đi tiên cách10px. Chọn bên chỉ quyết định phe người chơi và hướng bàn; Đi tiên riêng quyết định lượt đầu (mặc định Đỏ), dùng cho FEN/validation. Nhãn Đỏ/Đen hàng Đi tiên20px, công tắc48×24/núm18px; khung224px giữ tâm.

- 2026-10-14: Theo yêu cầu mở riêng phần Đã lưu của Lịch sử để thêm hai lựa chọn Ván đấu/Thế cờ bên dưới tab. Ván đấu mặc định giữ danh sách hiện có; Thế cờ hiện trạng thái trống, chưa nối dữ liệu lưu thế. Phần còn lại tiếp tục khóa.

- 2026-10-14: Lưu ván vừa kết thúc cho người chơi/người xem; online server chụp diễn biến và tên trước chuyển ghế, local dùng snapshot gameStore. Đã lưu/Ván đấu dùng localStorage thật theo tên, chống trùng/quota, xóa và xem lại từng nước bằng Board chỉ đọc. Không tự lưu; lưu từ lịch sử mình/người khác đang phát triển. Chi tiết docs/MATCH-SAVING.md.

- 2026-10-14: Lưu ván nằm giữa Camera và Bạn bè trong tiện ích bàn cờ, dùng PositionIcon save chung; khóa khi chưa có ván kết thúc/đã lưu. Bỏ nút lưu nổi dưới màn.

- 2026-10-14: Xem lại ván đã lưu chuyển screen replay toàn màn hình, không popup bàn nhỏ; Board/PlayerCard dùng chung, xem từng nước và quay về Home. Không thay gameStore/engine/phòng online.

- 2026-10-14: Replay ván lưu tự chạy khi vào,1,2 giây/nước; Phát/Tạm dừng và tua nằm bên trái bàn desktop. Tua tạm dừng, cuối tự dừng; mobile điều khiển dưới bàn. Chỉ bàn/hai người, không chat/view.

- 2026-10-14: Chốt replay PHẢI dùng chính GamePage (replayData), không màn bàn sao chép. Xóa SavedMatchReplay; useReplayPlayback/ReplayControls chỉ điều khiển lịch sử, Board/PlayerCard/layout gameplay giữ nguyên. Chặn toàn bộ mutation/clock/socket/AI/chat trong replay; back không reset trận thật. Tự phát sau entrance và tua bên trái. docs/MATCH-SAVING.md là chuẩn.

- 2026-10-14: ReplayControls220px, nút phát/dừng trên; lùi–số nước–tiến chung một hàng dưới. Không nút về đầu/tới cuối hoặc thanh tua xanh. Dùng màu nâu/vàng chung.

- 2026-10-14: ?? l?u ? V?n ??u lu?n ??t ng??i l?u b?n tr?i n?u l? ng??i ch?i, bi?u t??ng phe v? k?t qu? theo ??ng ng??i. Replay m?c ??nh qu?n c?a m?nh ? d??i, m?nh b?n tr?i, ??c l?p b?n ?i tr??c. Kh?n gi? gi? ?? b?n tr?i/d??i. D?ng savedMatchSide chung; ?p d?ng c? b?n l?u c? theo t?n.

- 2026-10-14: Icon đổi Xem lại/Đánh thử chuyển xuống dưới hai nút Phân tích và Gợi ý trong cụm điều khiển bên phải; vẫn dùng Space và cùng callback chuyển chế độ.

- 2026-10-14: Pikafish trong chế độ đánh thử dùng cấp10 và giới hạn nghĩ500ms mỗi lượt; không đổi thời gian Pikafish của các luồng khác.

- 2026-10-14: Theo yêu cầu, icon đổi Xem lại/Đánh thử cách hàng Phân tích/Gợi ý thêm10px (margin-top20px tổng).

- 2026-10-14: Đánh thử bỏ delay550ms dư sau animation trước khi gọi Pikafish (vẫn nghĩ500ms). Animation quân bắt đầu đúng độ nhấc đã chọn; quân máy không nhảy lên khi xuất phát. Delta dùng cùng tọa độ làm tròn của PieceView để tránh lệch pixel khi đáp.

- 2026-10-14: Bàn gốc Thế cờ hiện nút đổi sang Đánh thử dưới cụm user phải, margin-top50px; tái dùng ReplayModeButton cùng icon/callback/Space, không hiện Phát/Tua ở bàn gốc Thế cờ.

- 2026-10-14: Theo yêu cầu mới, Pikafish bàn thử tăng thinkMs500→800ms mỗi lượt, giữ cấp10.

- 2026-10-14: Nút đổi bàn cũng hiện dưới khung Phát/tiến lùi khi xem lại Ván đấu, cách50px; dùng chung icon và phím Space để vào Đánh thử.

- 2026-10-14: Replay Ván đấu dùng artwork trial-back/forward cho Lùi/Tiến; nút Phát/Tạm dừng tái dùng viền cắt góc của cùng asset qua border-image. Giữ cụm điều khiển và phím tắt.

- 2026-10-14: Trong hàng Đã lưu → Ván đấu, biểu tượng quân luôn theo thứ tự Đỏ rồi Đen, không đảo thứ tự theo phe người lưu; tên/người chơi vẫn theo quy tắc xếp bên riêng.

- 2026-10-14: Nút playback lấy chuẩn mũi tên trial khung220px:52.8×43.14px (24% ngang,35% cao ảnh937×525). Phát cũng cao43.14px, cùng viền gỗ cắt góc; giữ số nước/phím.

- 2026-10-14: Đã chơi thay fixture bằng playedMatchesStore/localStorage xiangqi-played-matches-v1, tự ghi ván hoàn tất có tên owner trong hai người chơi từ useMatchSaving; độc lập Đã lưu thủ công, xem lại snapshot thật. Nút Phát dùng asset mới replay-play-new.png từ imagegen, giữ chiều cao43.14px.

- 2026-10-14: Theo xem trực quan, nút Phát playback tăng chiều cao lên52.8px để bằng kích thước cạnh nút mũi tên; trước đó container43.14px nhìn thấp hơn.

- 2026-10-14: Đã chơi chỉ nhận snapshot online (marker isOnline), bỏ dữ liệu local/máy khỏi danh sách kể cả entry cũ. Rời phòng giữa ván server finish winner=đối thủ với reason leave và capture archive trước đổi ghế; UI đã xác nhận trước khi rời.

- 2026-10-14: Replay mở từ tab Đã chơi gắn replayRequiresSave. Chỉ sau khi lưu ván vào savedMatchesStore hoặc lưu thế có sourceMatchId mới hiện nút Đánh thử; Space trước đó hiện nhắc lưu, nút ẩn, replay chỉ xem/tua. Replay từ nguồn khác giữ quy tắc hiện tại. Played entries tự hết hạn một tháng lịch kể từ endedAt, ngày cuối tháng được clamp, dọn lúc khởi tạo và timer khi app mở.

- 2026-10-14: Nút Phân tích/Gợi ý trong bàn thử dùng cursor-pointer; bấm hiện status Đang phát triển, chưa chạy logic.

- 2026-10-14: Máy trong mọi replay đánh thử từ ván/thế lưu bắt buộc Pikafish cấp10, thinkMs2500 (mức tối đa cấu hình); không dùng máy cơ bản hoặc rút ngắn thời gian.

- 2026-10-14: Thông báo Đang phát triển/nội dung liên quan replay dùng toast cùng class Vị trí tùy chỉnh: absolute bottom3, giữa, nền xanh viền kem, chữ vàng nhạt, tự ẩn3s; không hiển thị inline dưới nút.

- 2026-10-14: Đính chính thời gian Pikafish trong replay đánh thử: giữ cấp10, thinkMs700 theo yêu cầu; thay giới hạn2500 trước đó.

- 2026-10-14: Trong replay và bàn thử, mọi nước chỉ phát tiếng đi quân; không phát cue ăn quân/chiếu/chiếu hết, intro hoặc cảnh báo thời gian.

- 2026-10-14: Âm thanh replay chỉ giới hạn tiếng đi quân ở thao tác tua; các nước đánh trực tiếp trên bàn thử phải phát âm thanh bình thường (ăn/chiếu/chiếu hết).
- 2026-10-14: Tên thế cờ trong Đã lưu dùng NumberText chung: chữ giữ font-heading, chữ số dùng font-number lining/tabular và compact 0.9em, cùng baseline với chữ.
- 2026-10-14: Chữ số trong tên thế cờ dùng weight normal để nét mỏng tương xứng font-heading; giữ cỡ compact và baseline.
- 2026-10-14: Ván bắt đầu bằng Đấu ngay từ Vị trí tùy chỉnh mở bàn thử cô lập, khởi chạy Pikafish bật sẵn. Cột phải hiện ReplayControls trial; ẩn mã phòng/lượt xem/chat; không lưu nhánh này như ván lịch sử.
- 2026-10-14: Cụm bàn thử mở từ thế tùy chỉnh hiển thị số nước ở nút giữa hàng lùi/tiến và chuyển Reset xuống dưới; replay khác giữ Reset trong nút giữa.
- 2026-10-14: Hoàn tác thay đổi vị trí Reset/số nước trong bàn thử thế tùy chỉnh; giữ nút Reset giữa hàng như thiết kế trước.
- 2026-10-14: ReplayControls dùng bộ ảnh 6c0cdab5 thay toàn bộ khung/nút replay và trial: cắt riêng 8 asset alpha, không lấy biển Máy Cơ bản. Phát/Tạm dừng, Máy đi Bật/Tắt và số nước là dữ liệu sống; Reset trial giữ giữa hàng. Không dùng ảnh ghép tĩnh thay UI.
- 2026-10-14: Mọi bàn thử: Reset dùng crop 0fed4f87 đặt bên phải Gợi ý trong hàng dưới (Phân tích/Gợi ý/Reset); vị trí giữa lùi/tiến hiển thị step/total font số. Phím reset ↑/↓ giữ nguyên.

- 2026-10-15: Ô sửa tên Thế cờ dùng Times New Roman regular riêng cho chữ số, tỷ lệ90%, lining/tabular như NumberText khi hiển thị; giữ font chữ và input native.

- 2026-10-15: Thanh cuộn danh sách Thế cờ đổi thumb sang nâu đậm#613014 để tương phản rõ trên nền vàng; giữ kích thước/vị trí và track trong suốt.

- 2026-10-15: Quy tắc máy mới do người dùng chốt: mọi chức năng máy chỉ dẫn, hướng dẫn, gợi ý, phân tích nước đi và chơi với máy ngoài chế độ đấu máy10 cấp đều dùng Pikafish mạnh nhất (không chọn sai số/hạ sức mạnh), thời gian search700ms (0,7 giây). Riêng chế độ đấu máy10 cấp giữ nguyên cấu hình từng cấp, kể cả cấp10. Thay thế các cấu hình máy cơ bản hoặc thời gian search cũ trong phạm vi trên.700ms là thời gian engine tính, không phải tổng thời gian mạng/khởi động/diễn giải. Giữ hạn chế trợ giúp trong trận người thật; không tự bật engine cho biến thể chưa được hỗ trợ. Phiên này chỉ ghi quy tắc tài liệu, chưa áp dụng code.

- 2026-10-15: Gợi ý đấu máy/bàn thử Vị trí tùy chỉnh dùng usePikafishHint riêng, Pikafish level10/search700ms từ FEN hiện tại bên người chơi; chỉ chạy khi tới lượt người chơi, chặn online/demo/replay/Cờ Úp. Không ghi store, không chọn/đi quân, không đổi lượt/history/clock hoặc bật Máy đi. Board vẽ1 mũi tên xanh opacity0.82 qua tọa độ chung/flipped, pointer-events:none. Bấm lại hủy request cũ/tính lại; đổi board/lượt/phase/reset/undo/rời hủy và bỏ kết quả cũ. Clock tick không xóa gợi ý. Phân tích vẫn đang phát triển.

- 2026-10-15: Ba nút Phân tích/Gợi ý/Reset dùng chung ToolArtworkButton, hover vàng#ffe08b alpha8% tức thì như mũi tên, mask theo alpha artwork. Gợi ý nhấn/đang tính thu94%, artwork brightness0.35; hết request/lỗi/hủy trở lại bình thường, vẫn cho bấm lại tính mới. Đồng bộ nút Gợi ý đấu máy. Không thay gameplay.

- 2026-10-15: Người dùng báo quân đi hơi không mượt ở mọi chế độ. Chưa xác định nguyên nhân/chưa tái hiện trên browser (không có browser kết nối). Regression move-animation-stability xác nhận xóa hint/render lại không restart/cancel animation, giữ DOM quân, lift6px tại scale0.5, đích/top nhất quán và duration400ms.7/7 test stability/hint/trial PASS; chưa sửa production animation. Cần kiểm tra frame thực tế trước khi chốt đã sửa.

- 2026-10-15: Sửa render dư do Gợi ý: trước đây effect setHint/setThinking sau đổi thế tạo thêm render GamePage ngay đầu animation (regression đo2 render). usePikafishHint nay gắn kết quả/thinking với context board/turn/phase/side/revision; ẩn đồng bộ trong render, effect chỉ abort. Sau sửa đo1 render, không giữ mũi tên cũ khi đổi thế; clock tick giữ gợi ý. Không đổi400ms/đường đi/gameplay.15/15 test hint/stability/trial/computer PASS. Chưa xác nhận độ mượt/frame bằng browser.

- 2026-10-15: Người dùng báo mọi thao tác kém mượt từ khi thêm Gợi ý. Giảm tải liên quan: ToolArtworkButton mask hover display:none khi không hover; useReplayTrial memo nước hợp lệ theo game/selected, không tính lại khi UI Gợi ý render. Regression giữ reference moves/không gọi lại rules và đổi chọn tính mới PASS.16/16 test hint/stability/trial/computer PASS; typecheck/build PASS. Không đổi geometry/luật/animation. Chưa đo frame browser, chưa xác nhận hết vấn đề toàn ứng dụng; cần reload tab để nạp dist mới.

- 2026-10-15: Quy tắc mới thay phạm vi Gợi ý và lùi theo cặp: mọi nút Gợi ý ở bàn thử (replay ván/thế đã lưu và Vị trí tùy chỉnh) dùng Pikafish mạnh nhất/search700ms,1 mũi tên xanh/read-only; replay xác định phe theo savedMatchSide. Bỏ nút Gợi ý riêng ở ván Cờ Tướng/Cờ Úp thông thường; giữ chặn hỗ trợ trong trận người thật và báo chưa hỗ trợ jieqi. Lùi/Tiến mỗi lần đúng1 nửa-nước (1 lần đi quân) cả nút và ←/→, không lùi theo cặp người/máy. Giữ reset/hủy/memo và hover/pressed hiện hành.

- 2026-10-15: Tên hiển thị máy Pikafish đổi thành Ông Hoàng toàn ứng dụng: thiết lập desktop/compact, tên đối thủ, trạng thái suy nghĩ/kết nối, tooltip Gợi ý và thông báo lỗi frontend/server. Mã engine pikafish, API/type/path/binary và giấy phép giữ nguyên. Chặn So tài nhận cả tên mới và tên cũ để tương thích; không đổi tên người chơi/bản ghi lịch sử đã lưu.

- 2026-10-15: Trong chat bàn chơi, tăng khoảng cách dọc cố định giữa các tin từ6px lên12px; áp dụng cả tin hệ thống kế tiếp và tin thường. Giữ avatar, căn lề và cuộn.

- 2026-10-15: Avatar máy dùng ảnh6626838d-3cae-4584-b222-c511ca546742 (Ông Hoàng), nguồn ở references/uploads, runtime ở computer-setup/ong-hoang-avatar.png. Dùng computerAvatar/getComputerAvatar chung trong PlayerCard, chat bàn chơi, Thế cờ, hồ sơ máy, Tin nhắn và chân dung thiết lập desktop. Ảnh được clip tròn trong khung hiện có; không đổi kích thước/vị trí avatar/khung. Hỗ trợ tên máy cũ Pikafish và Máy; không sửa dữ liệu lịch sử.

- 2026-10-15: Theo yêu cầu mới, avatar máy dùng chân dung GIỮA ảnhc876e59c-c77c-411e-a467-31b5f5b4df21. Runtime ong-hoang-avatar-v2.svg nhúng nguyên pixel nguồn, clip circle(cx1086,cy348,r288), viewBox79860 576576 bỏ vòng vàng nguồn, ngoài tròn trong suốt; không vẽ lại ảnh. Máy chỉ giữ avatar và tên Ông Hoàng: bỏ overlay khung/danh hiệu/sao, khung tên/ELO và trang trí kết quả trên PlayerCard; hồ sơ/chat bỏ khung/huy hiệu máy; thiết lập bỏ khung biển tên. Dùng helper chung cho mọi avatar máy, gồm tên cũ. Quyền sửa này chỉ cho ảnh/trang trí máy, avatar người thật vẫn khóa. Nguồn giữ references/uploads. Typecheck/build PASS; chưa browser QA.

- 2026-10-15: Đính chính avatar máyc876e59c: giữ100% hình GIỮA gồm vòng vàng/chi tiết gốc, chỉ tách khỏi hai hình bên và trim alpha trống (bbox x737,y0,698×694); SVGv3 nhúng nguyên pixel, không circle clip. Hiển thị object-contain trong kích thước avatar hiện có, không rounded/cắt ảnh máy. Khôi phục PlayerNameplate cho tên Ông Hoàng và khung biển tên ở thiết lập máy. Khung overlay/danh hiệu/sao/ELO riêng của máy vẫn bỏ như trước. Áp dụng đồng bộ bàn chơi/chat/thế/hồ sơ/Tin nhắn/thiết lập.

- 2026-10-15: Chốt căn máy: thẻ tên Ông Hoàng dùng cùng margin/translate/breakpoint với thẻ tên người chơi, giữ ngang hàng thay margin riêng mt2. Avatar máy phóng theo đường kính HIỂN THỊ của viền mặc định (156/128×0.896=1.092), giữ nguyên ảnh nguồn và ô anchor. AVATAR_FRAME_VISIBLE_SCALE dùng chung PlayerCard/chat/hồ sơ, không đổi avatar/khung người thật. Không thêm danh hiệu/sao/ELO lại cho máy. Typecheck/build PASS, chưa browser QA.

- 2026-10-15: Sửa chữ trong thẻ tên bị cắt dấu/nét do truncate kết hợp line-height1: PlayerNameplate đặt line-height1.4 riêng vùng chữ, giữ khung/kích thước/font/vị trí. Component chung áp dụng Home và mọi PlayerCard, gồm Ông Hoàng. Typecheck/build PASS, chưa browser QA.

- 2026-10-15: Máy không mở bảng thông tin/hồ sơ. Avatar máy ở PlayerCard disabled nhưng giữ độ sáng100%, không pointer/context menu phong danh hiệu. Chặn tên máy tại điểm mở Profile của Game/Home/Chọn Bàn, bao gồm đường chat/Tin nhắn/lịch sử. Người thật giữ luồng cũ. Typecheck/build PASS, dist index-DS34NNzo.js xác nhận; chưa browser QA.

- 2026-10-15: Ván đấu máy thông thường (computerMatch, cả Cờ Tướng/Cờ Úp) không có Lưu ván/Ghim thế, mã phòng, lượt xem/panel người xem hoặc chat (desktop/compact). showRoomFeatures dùng chung; useChat disabled cả send/listener/scroll, useMatchSaving không ghi ván máy. Bàn thử tùy chỉnh/replay giữ chức năng riêng đã chốt; online/local hai người giữ UI phòng. Không sửa avatar, khung tên hoặc engine.

- 2026-10-15: Giảm tải sau báo kém mượt: thay SVGv3 nhúng cả sheet avatar3.023.811 byte/2172×724 bằng PNG crop đúng bbox698×694/1.117.868 byte; kiểm tra484.412 pixel ARGB giống nguồn100%, giữ toàn bộ hình/viền gốc. Runtime import ong-hoang-avatar-full.png, ảnh nguồn vẫn giữ. useReplayTrial.select useCallback theo state thực để Board memo không render lại do UI khác; regression giữ callback/moves khi rerender PASS. GamePage memo kiểm tra chiếu theo board/turn/phase; useGame bỏ kiểm tra chiếu dư chỉ để trả status rỗng khi playing, giữ status kết quả.16/16 test hint/trial/animation/computer PASS; typecheck/build PASS. Đã xem PNG xuất, chưa đo FPS trên browser, không khẳng định hết mọi khựng.

- 2026-10-15: Ông Hoàng có danh hiệu riêng Kỳ Thủ AI và họa tiết sao riêng từ ảnh205ea2ea; thay quy tắc bỏ toàn bộ danh hiệu/sao máy trước đó. AvatarRankBadge/RankTitleBadge thêm prop computer, tái dùng vị trí/tỷ lệ slot và hàng sao chung, chỉ PlayerCard máy bật. Asset PNG title1168×383 tại(34,154), stars853×199 tại(1270,242), trim alpha<=16 loại nhiễu vô hình, corners alpha0; nguồn giữ references/uploads. Giữ avatar/khung tên/khóa hồ sơ máy. Typecheck/build PASS, đã xem2 crop và xác nhận dist, chưa browser QA.

- 2026-10-15: Màn Chơi với máy dùng PlayerNameplate chung cho Ông Hoàng thay khung chữ CSS cũ, desktop/compact cùng thẻ tên width250px. Desktop giữ slot top171/h53/w330 và căn giữa; avatar/cấp/phe/hành vi giữ nguyên. Typecheck/build PASS, dist index-wVJBr8a_.js có width250; chưa browser QA.

- 2026-10-15: Vị trí tùy chỉnh: kéo lấy quân từ khay tự chọn khay bên đó và loại quân đó (chooseForDrag không toggle). PositionPalette đồng bộ activeSide theo piece. Thả hợp lệ giữ chọn nếu loại đó còn trong khay, hết số lượng bỏ chọn/khóa như trước. Kéo quân trên bàn ra ngoài trả khay thì chọn đúng bên/loại vừa lấy xuống. Hover/click/phím tắt, kiểm tra đặt sai và hủy kéo giữ quy tắc hiện tại.10/10 test editor gồm đổi khay/aria-pressed/giữ chọn/hết quân PASS; typecheck/build PASS, chưa browser QA.

- 2026-10-15: Tạo bàn dùng khung chọn tỉnh/thành, nút nâu/vàng 10f8e709 và ô thời gian 6ff86838; thêm Bàn khóa và hiện ô mật khẩu/xem-ẩn khi bật. Người dùng xác nhận chỉ làm UI trước; chưa nối khóa/phân quyền/mật khẩu server. Component chung áp dụng Chọn Bàn/LobbyDialog.

- 2026-10-15: Form Tạo bàn: select thời gian phải nằm trên ảnh khung (relative z10); mật khẩu giữ nguyên artwork khi focus, không ring khung mới, tắt autocomplete và dùng input text che ký tự bằng text-security để tránh gợi ý tạo mật khẩu. Hủy/Tạo bàn hover opacity90%, không tăng sáng/bão hòa.

- 2026-10-15: Người dùng yêu cầu toàn project bỏ viền outline/ring khi focus, áp dụng utility Tailwind quan trọng trên body index.html; không đổi viền chọn. Công tắc Bàn khóa thu80%, tắt brightness50%/saturate50%; mật khẩu luôn hiện chữ, bỏ mask/nút con mắt. Vẫn UI preview.

- 2026-10-15: Hủy/Tạo bàn hover phủ vàng nhạt10% theo alpha artwork, không dim toàn nút. Bàn khóa tắt dùng nền nâu đậm/núm kem nâu rõ, không filter tối toàn cụm; hover viền vàng để nhận biết vẫn bấm được. Thay quy tắc hover opacity90/tắt brightness50 trước.

- 2026-10-15: Tạo bàn hover phủ vàng nhạt30% để rõ hơn, Hủy giữ10%. Tắt Bàn khóa dịch hai nhãn/ô thời gian lên11% chiều cao form; bật trở lại vị trí chừa mật khẩu. Hai nút đáy giữ tọa độ.

- 2026-10-15: Nhạc nền dùng3 MP3 mới, đầu155926→247345→618302→lặp; hết bài chờ4s. Một player chung xuyên màn, không để pointer/keyboard bỏ qua khoảng nghỉ. Bỏ runtime nhạc cũ; giữ nguồn archive và âm thanh ván cờ.

- 2026-10-15: Sẵn sàng online: giữ đổi người thua/đầu hàng sau ván; cặp đang ngồi có hàng chờ thì cả hai chưa ready chờ10s rồi hiện20→0 tự bắt đầu, một người ready đếm ngầm30s từ lần bấm đầu; quá hạn người kia thua/not-ready xuống khán giả queued=false, đầu hàng lên đúng ghế. Không hàng chờ thì không ép/phạt. Bảng xanh trên cùng, nút ready ẩn sau bấm không chữ chờ. Chi tiết docs/ROOM-READINESS.md.

- 2026-10-15: Đính chính luật Sẵn sàng: quá30s chỉ chuyển người chưa ready xuống khán giả và đầu hàng lên, KHÔNG xử thua/ghi thắng-thua/tạo ván mới trong lịch sử; giữ archive ván thật trước đó. Thay phần not-ready/xử thua vừa ghi. Mốc10/20/30 và luật đổi người thua ván thật giữ nguyên.

- 2026-10-15: XEM THỬ TẠM theo yêu cầu: mở bàn mẫu Chọn Bàn (useRoomDemo) giữ phase ready và hiện countdown20 ngay, hết20s bắt đầu hai máy. useDemoReadyCountdown chỉ local demo, không online/replay/trial, rời bàn hủy interval. Gỡ ngoại lệ khi kết thúc xem UI; luật online10+20/30 không đổi.

- 2026-10-15: Đã nối Bàn khóa THẬT theo yêu cầu mới, thay ngoại lệ chỉ UI: Tạo bàn gửi mật khẩu1–64 ký tự; server kiểm tra trước join cả ghế/viewer, Repository giữ salt/hash riêng không phát secret. Chọn Bàn thêm mục Bàn khóa bên phải Còn trống, lọc locked theo khu vực, bảng nhập dùng chung LobbyDialog. Chơi nhanh bỏ bàn khóa; lời mời không bypass khóa/rời phòng cũ trước xác thực. Chi tiết docs/ROOM-LOCKS.md.

- 2026-10-15: Số countdown Sẵn sàng trong Board đổi đen, cỡ48→72 nhân scale (tăng50%), bỏ shadow chữ; dùng chung online/bàn mẫu preview.

- 2026-10-15: Mọi bàn locked=true trong RoomTableGrid dùng artwork65c16869 (table-board-locked.png), crop alpha bbox107,140,1041,964; nguồn giữ references/uploads. Giữ slot chung/object-contain, người chơi/nhãn và luồng mật khẩu.

- 2026-10-15: Xếp hạng Vào xem dựng RankingViewButton ôm asset210×62 alpha sẵn, bỏ bóng CSS chữ nhật; chỉ hiện khi tên top nằm trong phòng thật phase playing, click kiểm tra lại rồi join asViewer=true, khóa vẫn hỏi mật khẩu. Server chặn lệnh xem khi chưa/đã hết đấu. Query rooms chỉ poll khi dialog mở. Danh sách tên/ELO vẫn fixture, Cờ Úp online chưa hỗ trợ; docs/RANKING-WATCH.md.

- 2026-10-15: XEM THỬ TẠM Xếp hạng: hàng top1 luôn có1 nút Vào xem mẫu nếu không có trận thật, click chỉ thông báo mẫu; nếu có trận thật vẫn watch bình thường. Các hàng khác giữ điều kiện phòng đang đấu. Thanh cuộn bỏ track trắng, thumb nâu vàng#92612d/hover#613014, track/corner trong suốt.

- 2026-10-15: Thanh kéo Xếp hạng đổi trắng#fff, track/corner vẫn trong suốt. Bạn bè chỉ hiện Mời chơi khi friend.presence=online; offline ẩn nút nhưng giữ Nhắn tin/hàng/avatar.

- 2026-10-16: Vị trí tùy chỉnh: nút đổi bên bỏ translateY-2px, căn giữa hàng Đỏ/Đen; icon hai mũi tên SVG20px đối xứng trong vòng32px, không lệch baseline glyph.

- 2026-10-16: Chốt mô hình tài khoản Guest/đã liên kết tại board-game/docs/ACCOUNT-MODEL.md. Guest có online/máy/Cờ Úp/phòng/Elo-cấp-sao/vàng/danh hiệu/lịch sử/lưu ván-thế/bạn bè-chat/avatar-khung; chỉ tài khoản đã liên kết được đổi tên, đăng nhập thiết bị khác, khôi phục, giải đấu chính thức và mua tiền thật sau này. Xóa game/dữ liệu trình duyệt mất Guest; đã liên kết khôi phục bằng đăng nhập. Giữ giới hạn từng mode hiện hành. Chỉ chốt tài liệu, chưa code/database/schema/phương thức liên kết.

- 2026-10-16: Bút đổi tên hồ sơ: Guest không có; đăng nhập Google/đã liên kết và chưa đổi tên thành công mới hiện bút vàng ở cuối dòng tên như bút địa chỉ trong ảnh người dùng. Đổi tên thành công thì ẩn bút; hủy/lỗi vẫn giữ. Trạng thái theo tài khoản, giữ qua đăng nhập lại/đổi thiết bị. Chưa có quy tắc cấp lại quyền. Chỉ lưu thiết kế tại docs/ACCOUNT-MODEL.md, chưa code/UI/database.

- 2026-10-16: Màn đăng nhập mới theo ảnh người dùng, artwork tự tạo bằng imagegen theo yêu cầu. EntryGate trước App: chưa chọn cách vào thì LoginPage, đã chơi khách thì vào Home trực tiếp qua localStorage co-tuong-entry-v1. Đây chỉ là ghi nhớ cách vào, không phải auth server hoặc persistence hồ sơ. Không tin flag Google từ client; Google OAuth chưa cấu hình, nút báo rõ và không tạo phiên giả. Khi có auth Google thật phải kiểm tra phiên server rồi bỏ qua trang đăng nhập. Giữ UI/gameplay/phạm vi khóa hiện có. Không tạo database. Xem docs/ACCOUNT-MODEL.md và src/assets/login/source.md.

- 2026-10-16: Tên khách tự sinh dạng Kỳ thủ + đúng6 chữ số ngẫu nhiên, không thêm khoảng trắng trước số (ví dụ Kỳ thủ000042). Dùng crypto.getRandomValues, pad số0 đầu; tạo một lần, giữ trong co-tuong-entry-v1 và khôi phục vào sessionStore khi tải lại. Entry guest cũ thiếu tên được bổ sung một lần. Validator client/server chung cho phép đúng mẫu này là ngoại lệ giới hạn10 ký tự; tên tự nhập khác giữ giới hạn cũ. Không bảo đảm tên random duy nhất toàn server khi chưa có DB. Chưa triển khai auth/database hoặc quyền đổi tên.

- 2026-10-16: Cảnh báo Chơi như khách trên LoginPage nâng top84.3%→82.8% theo phản hồi bị họa tiết đáy che; chỉ dịch vị trí dọc, giữ chữ/font/cỡ/bố cục khác.

- 2026-10-16: Số trong tên trên PlayerNameplate dùng NumberText chung với compact90%, font-number/lining-nums/tabular-nums, weight normal và giữ nguyên độ sáng (soften=false). Chữ và số cùng baseline inline, bỏ chữ số oldstyle của font-heading. Đồng bộ Home/PlayerCard/thiết lập qua component chung; giữ nguyên khung/kích thước/vị trí avatar và nameplate.

- 2026-10-16: Theo yêu cầu trực tiếp mở đúng phạm vi typography cột tên/trạng thái và ô tìm kiếm Bạn bè: dùng font-heading (Cormorant) cho chữ/tìm kiếm/trạng thái; tên font-semibold bỏ text-stroke, số tên qua NumberText compact90%/font-number/lining/tabular/weight medium, giữ opacity88% hiện hành và baseline inline. Áp dụng FriendIdentity/PresenceLabel chung mọi tab và cả2 ô tìm kiếm. Giữ font-size/line-height/hàng/spacing/avatar/nút/danh hiệu, không đổi layout; phạm vi còn lại vẫn khóa và typography khóa lại sau nhiệm vụ.

- 2026-10-16: Hồ sơ của mình đổi nút Thoát thành Đăng xuất theo yêu cầu, giữ hình học/style nút; hồ sơ người khác vẫn Thoát. Bấm mở dialog xác nhận Bạn có chắc muốn đăng xuất? với Hủy/Đồng ý; Hủy/Escape không đăng xuất. Đồng ý đánh dấu signedOut trong co-tuong-entry-v1, ngắt socket (server xử lý rời theo luật cũ), rời/reset ván local và trở lại LoginPage. Không xóa tên khách/localStorage ván-thế; chơi khách lại giữ tên. Chưa có OAuth để thu hồi phiên Google. Lỗi lưu marker giữ phiên và báo lỗi. Quyền sửa chỉ nút/footer và xác nhận của mình, vùng UI khác giữ khóa.

- 2026-10-16: Theo yêu cầu tăng nhẹ độ dày chữ/số Bạn bè: tên FriendIdentity semibold→bold, số NumberText medium→semibold, trạng thái PresenceLabel medium→semibold; giữ font/cỡ/opacity88%/baseline/hình học và không thêm stroke. Component chung đồng bộ mọi tab. Phạm vi typography mở đúng yêu cầu rồi khóa lại, avatar/layout khác giữ nguyên.

- 2026-10-16: Theo phản hồi số đang đậm hơn chữ, tên Bạn bè tăng extrabold và stroke0.2px chỉ phần chữ; span số reset stroke0, NumberText weight normal thay semibold, giữ compact90%/opacity88%/baseline. Trạng thái bold. Thay quy tắc không stroke của lần trước đúng phạm vi tên này; giữ font/cỡ/hình học/avatar và đồng bộ mọi tab qua FriendIdentity/PresenceLabel. Phạm vi typography khóa lại sau task.

- 2026-10-16: Chốt tên Bạn bè/Xếp hạng dùng SocialPlayerName chung tại SocialUi: chữ font-heading/extrabold/stroke0.2px; số NumberText font-number/normal/compact90%/opacity88%, stroke riêng0.1px để tăng nhẹ từ lần trước, cùng baseline inline. Trạng thái dùng socialPresenceTextClass font-heading/bold. Phạm vi người dùng mở gồm typography tên/trạng thái hai màn, không đổi font-size/spacing/avatar/khung/hàng/nút/rank/Elo. Áp dụng mọi tab qua component chung; khóa lại phạm vi sau nhiệm vụ.

- 2026-10-16: Theo yêu cầu tăng số thêm chút, stroke số trong SocialPlayerName tăng0.1px→0.2px, đồng bộ tên Bạn bè/Xếp hạng. Giữ nguyên chữ/font/weight/cỡ/opacity/baseline/hình học; phạm vi khác vẫn khóa.

- 2026-10-16: Sửa cắt nét tên Bạn bè/Xếp hạng: SocialPlayerName có line-height1.4 và tự truncate ngang; h3 giữ slot cao24px, flex items-center/không overflow-hidden để line box đầy đủ vượt slot mà không bị cắt dấu/đuôi chữ. Giữ font/weight/stroke/baseline tương đối và chiều cao hàng/avatar/spacing. Đồng bộ component chung, chỉ mở phạm vi sửa cắt nét rồi khóa lại.

- 2026-10-16: Chốt ghép đấu tự động tương lai: ưu tiên cùng cấp bậc/cùng số sao; không có thì ngẫu nhiên đối thủ hơn/kém1 sao, mở rộng lần lượt2 rồi3 sao, tối đa3. Không có phù hợp thì người chơi vào phòng một mình chờ, không fallback máy/ghép quá phạm vi. Chỉ ghi thiết kế, chưa đổi code hiện hành; chi tiết ranh giới bậc/sao trần cần chốt trước code. Xem board-game/docs/MATCHMAKING.md.

- 2026-10-16: Chốt ELO mục tiêu theo đối thủ trước trận: thắng cùng bậc/sao +13, thắng cao hơn1/2/3 sao +16/+17/+18, thắng thấp hơn1/2/3 sao đều+10; thua cùng bậc/sao hoặc đối thủ thấp hơn đều-13, thua đối thủ cao hơn1/2/3 sao đều-10. Tính riêng mỗi người, không zero-sum. Chỉ tài liệu, chưa code/DB; hòa/điểm sàn/ngoài phạm vi và ranh giới bậc chưa chốt. Bảng chuẩn tại docs/MATCHMAKING.md.

- 2026-10-16: Chốt sao liên tục qua bậc cho ghép đấu/ELO: index=(bậc-1)*3+(sao-1), chênh=index đối thủ-index mình. BậcN/3 sao +1/+2/+3 là bậcN+1/1/2/3 sao; bậcN/1 sao -1/-2/-3 là bậcN-1/3/2/1 sao. Chỉ xét bậc tồn tại, không dùng danh hiệu trang trí hoặc tự thêm sao ẩn. Thay ghi chú ranh giới bậc chưa chốt trước đó; bảng điểm giữ nguyên. Chỉ tài liệu, chưa code/DB. Xem docs/MATCHMAKING.md.

- 2026-10-16: Chốt trần danh hiệu/sao: Kỳ Thánh1 sao2800–2899,2 sao2900–2999,3 sao từ3000; đạt đủ thì không tăng bậc/sao nữa nhưng ELO thật vẫn tăng. Thay trần sao2800 trước đây bằng3000, giữ mốc vào Kỳ Thánh2800. Đã áp dụng getRankProgress chung mọi consumer, không đổi UI/geometry/avatar hoặc triển khai tính điểm sau trận/DB.

- 2026-10-16: Theo yêu cầu tăng độ đậm và dày số tên Bạn bè/Xếp hạng: SocialPlayerName giữ weight normal, số bỏ soften (opacity100% thay88%), stroke0.2→0.3px. Giữ phần chữ/font/cỡ/line-box1.4/baseline/hình học; áp dụng cả2 màn qua component chung, phạm vi khác giữ khóa.

- 2026-10-16: Backlog ưu tiên làm sớm bảng Năng lượng3 lựa chọn: video+1,19.000đ/50 năng lượng,40.000đ/vô hạn1 tháng. Xem ../.. /docs/backlog/system/ENERGY-PACKAGES.md (đường dẫn từ root: docs/backlog/system/ENERGY-PACKAGES.md). Chỉ backlog, chưa đổi code/DB; cần chốt số dư vượt trần5/thời hạn/gia hạn và tích hợp thanh toán/video; mua tiền thật giữ yêu cầu tài khoản liên kết.

- 2026-10-16: MySQL mục tiêu8.0.45/cotuong, runtime cotuong_app, không root. Đã thêm mysql2/promise pool lazy tại server/repositories/mysqlPool.ts và CLI server/checkMysql.ts (npm.cmd run db:check, chỉ SELECT1, đóng pool). Node đọc board-game/.env qua --env-file-if-exists cho start/dev:server/db:check; .env.example không mật khẩu, env thật ignored, không VITE_ hoặc log secrets. Chỉ hạ tầng kết nối, repository game vẫn RAM, chưa users/migration/ORM/auth. mysql2 được người dùng ưu tiên cho nhiệm vụ này, quy tắc Prisma chỉ áp dụng khi có Prisma. Chờ người dùng xác nhận kết nối thật trước users. Xem board-game/docs/MYSQL-CONNECTION.md.
- 2026-10-16: Login giữ nút vàng của artwork; nút Google SDK chuyển vào dialog dùng chung (link=false), không chồng nút trắng trên artwork. Giữ GIS popup/nonce/backend verification. Typecheck/build PASS; chưa browser QA/popup thật.
- 2026-10-16: Theo yêu cầu hoàn tác nút login tùy chỉnh/dialog vừa thử; giữ nút Google GIS trực tiếp như trước. Thay ghi chú thử dialog trước đó. Không đổi auth/backend hoặc artwork.
- 2026-10-16: Theo yêu cầu bỏ lớp nút vàng dưới Google, LoginPage dùng login-panel-google.png: imagegen xóa khung kem/vàng, chỉ ghép vùng (190,610,830,185) vào ảnh gốc để giữ nguyên pixel ngoài vùng. Nút GIS trắng giữ nguyên trực tiếp; không đổi auth/geometry. Đã xem asset; chưa browser QA.
- 2026-10-16: Khi Google đã gắn với tài khoản khác, thông báo trong hộp Liên kết chỉ còn “Google này đã thuộc tài khoản khác.” Không đổi xử lý409/không merge hoặc auth.
- 2026-10-16: Trong hồ sơ chính mình, chữ “Chưa có danh hiệu” tăng18→24px; giữ nguyên căn giữa, màu và khung.
- 2026-10-16: Tên Guest hiển thị mới dùng “Kỳ thủ” + 5 số random; guest_code nội bộ DB vẫn 6 số để giữ unique/schema. Guest cũ 6 số vẫn được validate để tương thích, tên tự sinh cũ trong DB chỉ đổi display_name/search_name, không xóa hồ sơ/dữ liệu. Cách vào trên thiết bị mới (tự vào Guest hay hiện màn chọn) đang chờ người dùng làm rõ.
- 2026-10-16 (đính chính): Tên hiển thị Guest mới phải là “Guest” + 5 chữ số random (ví dụ Guest04217), không phải “Kỳ thủ”. guest_code nội bộ vẫn 6 số; tên cũ vẫn được validate tương thích. Đã đổi lại tên Guest cũ trong DB từ Kỳ thủxxxxx sang Guestxxxxx, giữ toàn bộ dữ liệu.
- 2026-10-16: Người dùng mở khóa riêng avatar/khung avatar trong danh sách Xếp hạng cho task này. Ranking API trả avatarCode/avatarFrameCode từ users; hàng dùng AvatarPortrait/AvatarFrameOverlay/getAvatarFrame chung với hồ sơ. Danh hiệu/sao tiếp tục derive Elo thật riêng variant. Giữ slot84px và bố cục, khóa lại avatar/khung Xếp hạng sau task.
- 2026-10-16: Theo yêu cầu sửa riêng ô tìm kiếm Bạn bè: cả Danh sách/Thêm bạn dùng lining-nums/tabular-nums để số thẳng hàng; dữ liệu Friend giữ publicId và bộ lọc chung khớp tên hoặc ID công khai chính xác. API search đã hỗ trợ ID; sửa client không loại kết quả ID vì tên khác query. Giữ layout/avatar; khóa lại phạm vi ô tìm kiếm sau task.
- 2026-10-16: Người dùng mở riêng vị trí cụm avatar/khung/danh hiệu/sao Xếp hạng để hạ2px CSS; không dịch tên/hạng/hàng. Bạn bè mở riêng nguồn avatar/khung thật trên mọi tab: API social/search trả avatarCode/avatarFrameCode; AccountAvatar dùng chung Xếp hạng/Bạn bè tái sử dụng portrait/frame hồ sơ. Giữ slot76px/84px, danh hiệu/sao Bạn bè và layout khác. Khóa lại các phạm vi avatar sau task.
- 2026-10-16: Theo yêu cầu căn giữa cụm Xếp hạng theo chiều dọc hàng: slot cụm124px theo scale, anchor top6px theo scale, thay slot132px/top5px+2px cũ. Giữ avatar84px và tỷ lệ danh hiệu/sao, tên/hạng/bố cục khác. Phạm vi vị trí cụm mở riêng cho task, sau đó khóa lại.
- 2026-10-16: Sửa sót Home.openHistoryPlayerProfile: mở chính mình từ Xếp hạng/Bạn bè/Lịch sử/Tin nhắn luôn dùng dialog hồ sơ chung, không chuyển sang dialog tài khoản Home. ProfileDialog mặc định accountActions=false; chỉ dialog mở trực tiếp từ avatar/header Home truyền accountActions=true. Các nơi khác chỉ Thoát. Giữ nhận diện own và UI khác.
- 2026-10-16: Theo yêu cầu tăng nhẹ khung thông tin hồ sơ: PlayerInfoCard cao thêm16px theo scale, giữ mép trên và mở rộng xuống; gap dòng6→10px. Đồng bộ hồ sơ mình/người khác/preview tùy chỉnh bằng component chung. Không đổi avatar hoặc khung avatar.
- 2026-10-16: Người dùng yêu cầu hoàn tác lần tăng chiều cao khung thông tin và giãn dòng; PlayerInfoCard trở về gap-y-1.5 và chiều cao hồ sơ/preview ban đầu. Không giữ lại biến thể đó.
- 2026-10-16: Catalog Danh hiệu: Tất cả chỉ hiển thị danh hiệu thực sự sở hữu từ DB, người mới rỗng; các tab nhóm vẫn xem được catalog, danh hiệu chưa sở hữu hiện khóa thay dấu cộng và không chọn được. Ba nhóm Chuỗi/Tổng ván/Online theo ownership thật, chỉ mở khi server cấp. Không dùng danh hiệu mẫu để tự mở khóa.
- 2026-10-16: Khôi phục nút cộng trong catalog Danh Hiệu Phong Tặng; chưa sở hữu vẫn không được chọn vào hồ sơ (nút disabled theo ownership), không thay bằng icon khóa trong nhóm này. Ba nhóm cuối giữ khóa; Tất cả vẫn chỉ gồm danh hiệu sở hữu.
- 2026-10-16 (đính chính catalog): Tất cả/Vinh Quang Kỳ Đài/Danh Hiệu Phong Tặng chỉ hiện ownership DB thật, chưa sở hữu thì ẩn. Ba nhóm cuối vẫn hiện danh hiệu chưa đạt với artwork brightness35% và ổ khóa GIỮA thẻ, không khóa ở góc dấu cộng; danh hiệu sở hữu có nút cộng. Giữ xem chi tiết điều kiện khi bấm thẻ khóa.
- 2026-10-16: Sửa ô nhập chat phòng nhảy lên đầu khi chưa có tin nhắn do log hidden mất flex spacer. Chat form mt-auto luôn neo đáy khung ở expanded/collapsed desktop/compact; giữ picker phía trên và toggle. Không đổi gửi/nhận tin.
- 2026-10-16: Theo yêu cầu mở nguồn avatar/khung thật cho chat bàn và Tin nhắn: MessageAccountAvatar dùng AccountAvatar chung, session cho chính mình và Query search cho người khác; cache theo tên30s. Áp dụng chat bàn, danh sách hội thoại trực tiếp, header, avatar tin nhận và popup tùy chọn. Giữ kích thước/vị trí, ảnh nhóm và máy riêng; không thêm danh hiệu vào chat.
- 2026-10-16: Tên trong Tin nhắn dùng SocialPlayerName của Bạn bè làm chuẩn: font-heading/extrabold, stroke chữ0.2px, số font-number90%/normal/opacity100%/stroke0.3px/cùng baseline. Đồng bộ danh sách/header/tùy chọn/thành viên/chọn người tạo nhóm; giữ cỡ theo ngữ cảnh/màu/layout/avatar.
- 2026-10-16: View bàn chơi: bộ đếm tiếp tục từ room.viewers server; danh sách khán giả/xếp hàng bỏ avatar/khung mẫu, dùng MessageAccountAvatar truy xuất tài khoản thật và SocialPlayerName chung Bạn bè. Giữ slot/kích thước/nút queue và dữ liệu hàng từ snapshot.
- 2026-10-16: Theo yêu cầu áp dụng avatar/khung thật trong Lịch sử: Player chung Đã chơi/Đã lưu và avatar hai người ở Thế cờ dùng MessageAccountAvatar/AccountAvatar. Giữ slot51px/34px, tên/kết quả/bố cục và ảnh máy riêng. Phạm vi nguồn avatar mở riêng task, khóa lại sau task.
- 2026-10-16 (đính chính view): bộ đếm mắt ở bàn online tính tổng người đang có trong phòng = players + viewers theo ID socket duy nhất; người tạo/ngồi một mình phải hiện1. Không phải chỉ đếm khán giả. Panel khán giả/queue vẫn chỉ liệt kê viewers, không thay luật ghế/hàng chờ.
- 2026-10-16: Bàn online chưa đủ2 ghế có người thì ẩn nút Sẵn sàng. Lưu thế cờ chỉ khả dụng sau ít nhất1 nửa-nước (match.moveCount>0), disabled nút và guard callback khi0; áp dụng GamePage chung online/local/replay/trial. Không đổi đồng hồ/ready server.
- 2026-10-16: Theo yêu cầu mới, panel người trong phòng hiển thị cả người đang ngồi chơi và khán giả/xếp hàng, khớp tổng bộ đếm mắt. Ghép players chỉ id/name, không dùng ready làm queued để tránh người ngồi bị hiện thẻ chờ. Avatar/khung thật tiếp tục qua component chung; queue controls chỉ dành cho viewers.
- 2026-10-16: Theo yêu cầu tăng riêng avatar/tên thẻ người trong phòng: ô avatar28→36px, tên14→16px, thẻ40→52px đồng bộ watching/waiting. Bỏ filter drop-shadow trên cả thẻ và bóng chữ để tránh raster hóa/làm nhòe chữ/ảnh; giữ avatar/khung nguồn thật và vị trí panel. Phạm vi này mở riêng task, khóa lại sau task.
- 2026-10-16: Tiếp tục giảm nhòe panel người trong phòng: bỏ stroke chữ/số riêng tên kích thước16px; bỏ transform translateY10px của parent, thay tọa độ top/bottom tương đương để giữ vị trí và tránh composite lớp chữ/ảnh. Không đổi typography Bạn bè hoặc các panel khác.
- 2026-10-16: Kết thúc xem thử bàn mẫu Chọn Bàn theo yêu cầu dữ liệu thật. RoomTableGrid chỉ dùng rooms API đã lọc khu vực/trạng thái, bỏ22 previewRooms và đường vào demo. Không có phòng hiện rỗng, không giả người/bàn; Tạo/vào/khóa/ghép nhanh giữ server thật.
- 2026-10-16: Theo yêu cầu tăng tiếp avatar/tên panel người trong phòng: slot avatar36→44px, tên16→18px, thẻ52→64px. Đồng bộ người ngồi/người xem/xếp hàng; giữ xử lý giảm nhòe và panel. Phạm vi kích thước mở riêng task rồi khóa lại.
- 2026-10-16: Theo yêu cầu căn giữa thông báo rỗng trong Lịch sử: Đã chơi/Đã lưu ván dùng1 hàng chiếm vùng còn lại và place-items-center khi không có record; Thế cờ rỗng flex1/grid center. Giữ layout có dữ liệu và typography.
- 2026-10-16: Đính chính thẻ người trong phòng theo yêu cầu: giữ chiều cao gốc h10, cố định rộng166px (thẻ chờ200px có số thứ tự) tránh tên/avatar làm nở khung. Avatar32px/tên18px lớn hơn gốc28px/14px, giảm padding trong để vừa khung; bỏ tăng chiều cao52/64px trước đó.
- 2026-10-16: Tăng chữ thông báo danh sách rỗng Lịch sử và đồng bộ Đã chơi/Đã lưu ván/Thế cờ bằng historyEmptyTextClass chung28px theo scale; giữ căn giữa2 chiều. Không đổi ghi chú hay nội dung hàng có dữ liệu.
- 2026-10-16: Theo yêu cầu mới thẻ người trong phòng cao48px, avatar36px/tên20px, chiều ngang w-fit ôm nội dung thay rộng cố định166/200px; padding trái/phải5px. Đồng bộ người ngồi/người xem/xếp hàng, giữ cách giảm nhòe. Thay yêu cầu kích thước thẻ trước đó.
- 2026-10-16: Giữ kích thước thẻ/avatar/tên vừa chốt; riêng panel người trong phòng dùng image-rendering -webkit-optimize-contrast cho portrait/frame để cải thiện lấy mẫu ảnh nhỏ trên Chromium, số trong tên opacity80% cân nét với chữ (không đổi tên ở Bạn bè/Tin nhắn). Chưa kiểm chứng độ nét trên browser.
- 2026-10-16: Đính chính số trong tên thẻ phòng: opacity100%/cùng màu chữ, không giảm độ sáng. Ép stroke số0px và font-normal để thắng stroke0.3px của SocialPlayerName, giảm độ dày nét thật; giữ font-number/kích thước và chữ.
- 2026-10-16: Căn giữa2 chiều thông báo Chưa có bàn phù hợp và Đang tải danh sách bàn trong toàn khung RoomTableGrid bằng absolute inset0/grid place-items-center; không phụ thuộc chiều cao hàng lưới. Đồng bộ các tab và desktop/compact, giữ font/cỡ/màu.
- 2026-10-16: Theo yêu cầu bỏ Space trong Vị trí tùy chỉnh (Chơi với máy): chặn Space kích hoạt nút đang focus tại CustomPositionPage và GamePage positionTrial. Không chặn nhập dấu cách trong input/textarea/select/contenteditable; phím khác và Space chuyển chế độ replay giữ nguyên.
- 2026-10-16: Sửa giật popup nhóm Tin nhắn do polling1s thay conversationList mất members/creatorName rồi request members bổ sung lại: giữ metadata nhóm cũ trong lúc refresh. Giữ reference threads khi nội dung không đổi để không kích hoạt scroll xuống đáy mỗi poll. Không đổi interval/UI nhóm.
- 2026-10-16: Đổi ảnh nhóm đã nối server thật thay thông báo chưa tích hợp. Frontend chọn ảnh≤10MB, crop vuông/resize256 và encode JPEG; PATCH conversations/:id/avatar kiểm tra JPEG≤120k base64 và owner còn membership. Repository ghi uploads/group-avatars bằng UUID, lưu URL vào avatar_object_key hiện có, rollback lỗi ghi DB dọn file mới. Static/media proxy dev; list trả avatarUrl và mọi vị trí ảnh nhóm đọc cùng URL. Không migration, uploads ignored và cần backup cùng DB.
- 2026-10-16: Tin nhắn: nút mặt cười mở24 emoji/chèn tại caret, giới hạn300 ký tự. Nút ảnh chọn≤10MB, JPEG resize cạnh dài≤720px/nén≤120k base64, xem trước/bỏ ảnh và bấm Gửi. POST conversations/:id/images xác thực membership và send giữ block/idempotency/300char; file UUID uploads/message-images, body lưu đường dẫn /media/message-images/UUID.jpg, render img chỉ khi khớp mẫu path nội bộ nghiêm ngặt; preview hội thoại chỉ 📷 Ảnh. Không migration; static/dev proxy mới, backup uploads cùng DB.

- 2026-10-17: Tin nhắn mở mặc định không tự chọn/tải/đánh dấu đọc hội thoại đầu; vùng chat hiện HOANGBBCG căn giữa hai chiều, Georgia đậm nghiêng/màu #936332 như bàn cờ. Bấm hội thoại, tạo nhóm hoặc Nhắn tin từ hồ sơ vẫn mở hội thoại được yêu cầu. Giữ avatar/bố cục danh sách. Thay quy tắc tự chọn hội thoại đầu trước đây.

- 2026-10-17: Theo yêu cầu mới, riêng chữ HOANGBBCG ở trạng thái chưa chọn hội thoại Tin nhắn dùng trắng kem #fff1d6; giữ font/cỡ/vị trí, không đổi chữ trên bàn cờ.

- 2026-10-17: Ảnh gửi/nhận trong Tin nhắn hiển thị trực tiếp, wrapper sát ảnh không nền/viền/padding/shadow, không đuôi bong bóng/họa tiết hoặc bo cắt ảnh. Tin chữ giữ bong bóng cũ; giữ bấm hiện giờ.

- 2026-10-17: HOANGBBCG mặc định Tin nhắn đổi màu #E6BA86. Khởi tạo selection null và khi đóng reset selection/popup/draft/search để mỗi lần mở tiện ích đều hiện chữ, chưa chọn mục. Mở Nhắn tin đích từ hồ sơ/Bạn bè vẫn theo yêu cầu đích cụ thể.

- 2026-10-17: Sửa ảnh Tin nhắn: bỏ canvas/nền trắng/resize/JPEG conversion, FileReader gửi nguyên bytes PNG/JPEG/WebP/GIF tối đa10MB. Backend validate signature, lưu đúng extension và bytes, parser riêng images14MB. Giữ URL jpg cũ; ảnh gửi căn phải với wrapper min-w-0, bỏ giới hạn min(360px,100%) gây khung rộng lệch. 6/6 regression hiện có PASS; kiểm tra PNG bytes/extension trực tiếp PASS; typecheck/build PASS, dist xác nhận FileReader. Không thêm được regression do EPERM file test; chưa browser QA. Backend cần restart. Ảnh cũ đã flatten trắng không khôi phục alpha, cần gửi lại nguồn.

- 2026-10-17: Popup Năng lượng theo mẫu mới, nguồn 21090d85-e647-4210-8a57-0a9e779a67ea.png, nút X vuông tách riêng thay nút tròn nguồn. Mở từ vùng/nút cộng năng lượng Home. Nội dung100 năng lượng/19.000đ, vô hạn30 ngày/39.000đ, video3 lượt và hồi30 phút là artwork xem UI theo mẫu lần này, chưa đổi nghiệp vụ7 phút/gói đã chốt hoặc triển khai quảng cáo/thanh toán. Nút hành động báo chưa tích hợp, không cộng tài nguyên.

- 2026-10-17: Theo yêu cầu thu nhỏ popup Năng lượng: chiều rộng tối đa1160px/80vw thay1460px/94vw; bỏ hàng mô tả dưới tiêu đề và toàn bộ thanh ghi chú cuối, dồn artwork gọn theo chiều dọc. Giữ tiêu đề Năng lượng/3 gói/nút X. Không thay HOANGBBCG hoặc nghiệp vụ.

- 2026-10-17: Theo mẫu mới, chữ HOANGBBCG mặc định Tin nhắn đổi sang trắng ngả vàng nhẹ #FFF6DF thay #E6BA86; giữ vị trí/cỡ/font.

- 2026-10-17: Thu hẹp thêm popup Năng lượng theo yêu cầu: rộng tối đa980px/68vw thay1160px/80vw, giữ artwork và tỷ lệ.

- 2026-10-17: Hover3 nút Năng lượng căn theo mặt artwork: left6.6/37.8/68.8%,top76.9%,w24.7%,h10.4%; clip góc vát, hover vàng nhạt #fff1b8/30 thay trắng, không dịch/scale.

- 2026-10-17: Bỏ riêng dòng Còn 3 lần hôm nay trên thẻ video Năng lượng; giữ dòng Nhận ngay1 Năng lượng và vị trí/hover các nút. Không triển khai giới hạn lượt video.

- 2026-10-17: Hover3 nút Năng lượng vàng hơn/bớt đục: #ffd34e20% (pressed30%) thay kem #fff1b830/40%; giữ vùng/góc vát.

- 2026-10-17: Nút cộng năng lượng Home mở cùng EnergyDialog như vùng năng lượng; phục hồi tooltip native title đếm ngược home.energyCountdown trên cả vùng và dấu cộng. Vàng giữ thông báo chưa hỗ trợ. Giữ geometry.

- 2026-10-17: Nút X popup Năng lượng tăng rộng4.5→5.2% và cursor-pointer, giữ anchor góc phải và asset.

- 2026-10-17: Tooltip năng lượng Home thay title native bằng bảng nâu viền vàng/chữ kem/mũi nhọn, hiện hover/focus vùng hoặc dấu cộng. Energy>=MAX_ENERGY5 hiện Năng lượng đầy; thiếu mới đếm ngược hồi. Giữ nghiệp vụ hồi7 phút/số dư vượt5.

- 2026-10-17: Bỏ nhãn Cờ Úp phủ phía trên bàn GamePage theo yêu cầu; giữ variant/gameplay/accessibility. Phần bỏ Chơi với máy đang chờ làm rõ nút Home hay nhãn bàn.

- 2026-10-18: Home Cờ Úp chuyển sang phòng online cùng variant jieqi: ghép bàn mở có đúng1 người, hết bàn tạo10 phút/60s theo tỉnh hồ sơ và ngồi chờ, không fallback máy. Quick Cờ Tướng bỏ bàn jieqi. Server xác thực variant, xáo bằng crypto và giữ variant khi reset/đổi ghế; publicRoom che concealed trong broadcast/ack/challenge và archive, không sửa state authoritative. Bỏ nhãn Cờ Úp phủ trên bàn; giữ nút Home Chơi với máy. Thay quy tắc Cờ Úp chỉ local trước đây.

- 2026-10-18: Bấm vùng/nút cộng năng lượng ẩn tooltip ngay qua openEnergy chung; ngăn focus tự khôi phục tooltip sau khi đóng popup, rê lại mới hiện.

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

- 2026-10-18: Chơi nhanh/Đấu không bắt khai địa chỉ, ghép ngẫu nhiên mọi khu vực như hiện hành. Đính chính: vẫn được mở Chọn Bàn khi chưa có địa chỉ; chỉ thao tác mở chọn tỉnh/thành phố mới yêu cầu lưu địa chỉ hồ sơ (countryCode có giá trị), thiếu thì giữ màn Chọn Bàn và nhắc chọn trong Hồ sơ. Giữ quyền chuyển khu vực tìm bàn sau khi khai địa chỉ. Giải đấu tương lai cũng phải yêu cầu khai địa chỉ; chưa có luồng giải đấu để triển khai. Không đổi quy tắc lưu địa chỉ một lần hoặc UI hồ sơ. Regression home/presence5/5 PASS; chưa browser QA.

- 2026-10-18: Chọn quốc gia trong VietnamAddressPicker đổi native select sang danh sách nút cuộn ngay trong khung, mỗi hàng dùng CountryFlag SVG thật/tên nước và highlight/check khi chọn. Tái dùng palette/nút danh sách tỉnh; giữ Tiếp/Lưu/Hủy và quy tắc lưu1 lần. Country picker/flag/location4/4 PASS, typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-18: Bổ sung ô tìm quốc gia theo cùng giao diện tìm tỉnh/xã, lọc tên không phân biệt dấu/hoa thường hoặc mã quốc gia; có xóa tìm và trạng thái rỗng. Xóa truy vấn khi chuyển quốc gia↔tỉnh, giữ tìm tỉnh/xã hiện hành.2/2 regression country picker PASS, typecheck/build PASS, dist xác nhận; chưa browser QA.

- 2026-10-18: User báo không lưu được Xã An Nhơn Tây/TP.HCM. Đã xác minh API địa giới mã79/27508 hợp lệ; DB Guest chưa location, thử UPDATE trong transaction rồi rollback thành công (không lưu thay user). Chưa xác định nguyên nhân request thật; browser connector không có tab. VietnamAddressPicker trước che lỗi bằng thông báo chung, nay hiển thị errorMessage API, trạng thái Đang lưu/chặn submit trùng, giữ lựa chọn khi lỗi.3/3 picker tests PASS, typecheck/build PASS, dist xác nhận. Chờ user thử lại lấy lỗi cụ thể; KHÔNG tuyên bố lỗi lưu đã hết.

- 2026-10-18: Sửa Chơi nhanh không địa chỉ bị Tỉnh/thành phố không hợp lệ khi hết đối thủ: applyAccount đặt province rỗng, Home trước gửi chuỗi rỗng tạo bàn. Nay quick xiangqi/jieqi bỏ province nếu trống, roomApi.create cũng chuẩn hóa trường tùy chọn để đồng bộ mọi nơi tạo. Không gán tỉnh giả/không bắt khai địa chỉ khi chơi ngẫu nhiên; chỉ chọn tỉnh trong Chọn Bàn yêu cầu địa chỉ.7/7 quick/presence tests PASS gồm Guest province rỗng ở2variant, typecheck/build PASS, dist xác nhận. Chưa browser QA. Lỗi lưu địa chỉ trước vẫn chưa xác định, không coi là đã sửa.

- 2026-10-18: Đã xác định lỗi lưu địa chỉ Nguồn yêu cầu không hợp lệ: proxy dev5173 gửi Host không khớp Origin dù changeOrigin:false. vite.config thêm sameOriginProxy dùng chung API/media, proxyReq set Host từ incoming.headers.host; giữ kiểm tra nguồn backend nguyên vẹn. HTTP thật trước sửa localhost/127 qua5173 trả403, sau sửa localhost/127/HostLAN đều401 (request không cookie, đã qua origin guard), Origin lạ vẫn403. DB UPDATE rollback trước đó đã xác nhận hợp lệ; chưa thực hiện lưu bằng session người dùng/browser. Typecheck/build PASS; dist rebuild cùng bundle vì chỉ cấu hình dev. Ghi chú chờ xác định lỗi nguồn ở lượt trước đã được giải quyết; user tải lại và thử lưu.

- 2026-10-18: Thêm3 avatar imagegen nữ kiếm khách/lão quân sư/nam tướng quân vào Phiên Chợ Hàng Ngày, cùng demo cũ thành4 sản phẩm; tab Tất cả/Avatar dùng chung map, ảnh tròn/card và giá xem thử500 như cũ. Chưa giao dịch/DB/cấp quyền avatar. Nguồn PNG1254x1254 full-bleed tại outputs/avatar-concepts, runtime src/assets/shop/avatars, prompt tại outputs/avatar-concepts/README.md. Shop regression1/1 PASS; chưa browser QA.

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

- 2026-10-19: User gỡ avatar thử Quan Vũ/avatar-0 và avatar thứ hai Nữ kiếm khách/avatar-15 khỏi Shop; avatar-15 ẩn khỏi picker dù cosmetic cũ còn trong dữ liệu. Đã xóa đúng user_cosmetics row avatar/avatar-15 của tài khoản Guest public ID29622295 (ảnh Hồ sơ); account đang dùng avatar-17 nên không đổi avatar hiện tại, không hoàn vàng. Shop catalog bỏ hai SKU nên backend từ chối mua mới; còn Lão quân sư/Nam tướng quân và3viền. Shop UI/inventory tests3 PASS, MySQL integration suite skipped (DB_INTEGRATION chưa bật), typecheck/build PASS dist index-D5DwodzU.js. Chưa browser QA.

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


- 2026-10-20: User xác nhận trong task CI: khôi phục hiệu ứng OpeningCover dùng chung về600ms theo tài liệu, thay1500ms trong implementation. Áp dụng các màn dùng cùng cover (Game/Chọn Bàn/Chơi với máy), không đổi intro1300ms/clock/luật hoặc geometry UI.


- 2026-10-21: User xác nhận có thể bỏ phần So sánh độ nét avatar A/B/C. Giữ UI đã bỏ tính năng; không đưa lại để vượt test. Regression avatar-comparison được giữ file và chuyển sang kiểm tra preview/chọn không tự equip, Hủy không đổi avatar, Sử dụng áp dụng đúng và một lần.


- 2026-10-21: Hoàn tất sửa CI Local: phân loại59 lỗi ban đầu (28 harness/môi trường,25 kỳ vọng cũ,6 thông báo backend UTF8; xem docs/CI-TEST-AUDIT.md). Sửa literal RoomService/aria-label thứ tự chờ, test/harness/provider/fixture theo quy tắc hiện hành; không đổi engine/gameplay/auth/DB schema. User chọn OpeningCover600ms và cho bỏ A/B/C; giữ test file avatar-comparison, kiểm tra preview không tựequip/Hủy/Use đúng và một lần. Full cuối378PASS/0FAIL/17 gateDB (tổng395), MySQLtạm17/17+migrate30/rerun0/verify/smoke PASS; typecheck/build PASS dist index-WmLSGyiZ.js. Đối chiếu baseline không mấtfile/không giảmcase, skipgatesgiữnguyên; thêm5case, khôngskip/only/retry/tăngtimeout. Giới hạn1worker sau khi2worker còn timeout khôngổnđịnh. Chưa commit/push/SSH/VPS/deploy/browserQA; LocalNode24, GitHubNode22/Ubuntu chưachạy.



- 2026-10-21: Theo yêu cầu user, GamePage mobile bỏ lề/viền ngoài để bàn rộng bằng viewport khi đủ chiều cao, giữ tỷ lệ bàn và căn giữa màn hình. Người dùng (leftSide) sát trên, người thứ hai sát dưới qua grid 3 hàng cân nhau; user mở đúng vị trí hai PlayerCard mobile trong task này, giữ kích thước avatar và desktop, khóa lại vị trí sau task. Tiện ích gom dưới nút ba gạch dùng gameUtilityButton, Chat/người xem/hàng chờ chỉ hiện cùng menu. useBoardLayout dành 260px cho hai vùng người chơi, màn thấp vẫn co bàn để vừa. Typecheck/build PASS, dist cập nhật và xác nhận Menu bàn cờ; chưa browser QA trực quan.


- 2026-10-21: User sửa GamePage mobile: hai avatar cách mép trên/dưới viewport5px, bản thân ở trên; bỏ translate âm cũ của user/tên/clock mobile và neo hai card absolute để không phụ thuộc chiều cao hàng grid. Kích thước avatar giữ60px, quyền thay vị trí chỉ GamePage mobile và khóa lại sau task. Thoát vào menu, Toàn màn hình ẩn mobile, Ghim/Lưu hiện ngoài menu với điều kiện enable cũ. Desktop giữ bố cục. Typecheck/build PASS, dist cập nhật; chưa browser QA trên điện thoại thật.


- 2026-10-21: User chốt vị trí GamePage mobile: avatar trên bên trái cách mép10px, avatar dưới đối xứng bên phải cách mép10px, thông tin nằm phía trong đối diện avatar. Giữ mép trên/dưới5px và kích thước60px đã chốt, desktop giữ nguyên. Quyền chỉnh đúng vị trí mobile task này, khóa lại sau task. Typecheck/build PASS, dist cập nhật; chưa browser QA trực quan.


- 2026-10-21: Theo user, GamePage mobile tăng mép trên/dưới avatar5→15px; user z40 trên lớp trang trí z10. Thanh tiện ích chuyển xuống trái10px/bottom25px (căn giữa avatar dưới60px/bottom15px), thứ tự ba gạch→Ghim→Lưu; nút mobile40px/gap8 để vừa cạnh card188px ở viewport360px, menu bung lên trên. Desktop giữ thứ tự/kích thước cũ. Quyền chỉnh đúng mobile task này, khóa lại sau task. Build/typecheck PASS, dist cập nhật; chưa browser QA trực quan.

- 2026-10-21: Backup Adapter cho CI/CD theo VPS user xác nhận: cotuong-backup.sh/service -> OnSuccess cloud service, cotuong-YYYY-MM-DD_HH-MM-SS.sql.gz. Thêm Python stdlib root-only hook2action, gzip/SQL markers/SHA256/age/newfile gate, đợi local và lần cloud mới hoàn tất; không đổi backup cũ, không SQL/restore/productiondeploy. Sudoers exact commands, hướng dẫn cài/audit/VM staging/restore drill tại docs/BACKUP-ADAPTER.md. Gate tạo mới trước activate sau prepare/snapshot; workflow dùng script từ trusted checkout, kiểm port1..65535.25 adapter tests PASS bằng fixture/mock, Bash syntax PASS, npm.cmd run build(typecheck+Vite)PASS dist index-BqK419Up.js. Chưa nghiệmthu Ubuntu/systemd/sudo/Drive/restore, chưa SSH/cài/push/deploy; gzip và cloud exit0 không chứng minh restore hoặc remotechecksum. Reviewer phải kiểm bằng chứng offsite/restore riêng trước duyệt.


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
