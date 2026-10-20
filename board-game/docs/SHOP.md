# Cửa hàng

## Trạng thái hiện hành — 2026-10-19

Shop đã mua thật bằng vàng tài khoản. Mỗi món500 vàng; bấm Mua→Xác nhận mới ghi giao dịch. Bỏ nhãn demo/xem thử và đổi tên avatar gốc thành Quan Vũ. Sản phẩm đã sở hữu (kể cả mặc định hoặc admin cấp) báo Bạn đã có avatar/viền này và không trừ vàng.

Danh mục chuẩn frontend/backend: src/lib/shopCatalog.ts. API POST /api/account/shop/purchase chỉ nhận productId/requestId; server tự lấy giá và code. ShopService→ShopRepository dùng transaction khóa user/resources, kiểm tra sở hữu và số dư, trừ vàng + INSERT user_cosmetics + resource_events cùng commit. Mua trùng409, thiếu vàng400, cùng requestID chỉ ghi một lần; cùng ID cho món khác409. Chưa có thanh toán tiền thật hoặc lịch thay hàng tự động.

API trả profile mới để cập nhật ngay số vàng và mảng cosmetics theo kind avatar/frame. Chọn avatar và Chọn viền đọc mảng sở hữu tương ứng; mua không tự trang bị.3 viền mới dùng frame-4/5/6; chọn/lưu khung mới phải có quyền sở hữu backend. Admin catalog đồng bộ7 khung. Giữ4 khung mặc định và5 avatar cũ khả dụng. Không đổi kích thước/vị trí avatar/khung cũ;3 viền Shop mới không bị clip tròn mất họa tiết cạnh.

Không cần migration mới: tái dùng bảng user_cosmetics từ005 và resource_events. Không buff hoặc tạo giao dịch thử trong DB người chơi thật.

Kiểm chứng:9/9 test React/hook/profile/admin PASS; MySQL8.0.45 tạm15/15 tài khoản/admin/shop PASS, gồm chống mua đồng thời/trùng, tamper giá, replay request, thiếu vàng, rollback khi ledger lỗi và equip viền theo sở hữu. Typecheck/build PASS; chưa browserQA. Các mục demo phía dưới là lịch sử đã được thay thế bởi trạng thái này.

2026-10-18: Trang UI theo ảnh tham chiếu, chiếm toàn vùng bên trong khung ứng dụng cùng Home (desktop lề ngang120px/dọc6px, compact6px). Session thêm `screen: shop`; App ghép ShopPage. Cả hai Home gọi useHome.openShop, nút quay lại đặt screen home. Không tạo phòng hoặc đổi trạng thái ván.

Background gốc người dùng: `src/assets/references/uploads/49740109-5a33-4729-890d-c965b532934c.png`; runtime `src/assets/shop/background.png` là bản sao nguyên pixel, không crop/redraw. Tái dùng name-frame, gold-frame-v2, energy/gold-icon-v2, wood và AvatarPortrait hiện có.

Sidebar Phiên Chợ Hàng Ngày đang chọn; Chợ Cuối Tuần/Kỳ Trân Sự Kiện khóa. Bộ lọc Tất cả/Avatar/Khung Viền hoạt động; chỉ một sản phẩm avatar demo giá minh họa500 vàng. Nút mắt mở preview; không có giao dịch, thay avatar hoặc ghi DB. Khung Viền hiện rỗng. Chưa có lịch hàng hằng ngày/countdown backend, hiển thị --:--:-- thay thời gian giả. Thanh tài nguyên lấy session thật; cộng năng lượng mở EnergyDialog hiện có, bổ sung vàng chưa tích hợp.

Kiểm chứng:4/4 test shop-page/mobile-home/home-quick-wait PASS; typecheck/build PASS và asset/trang mới có trong dist. Chưa browser QA, chưa kiểm tra pixel/overflow trên thiết bị thật vì không có trình duyệt kết nối trong phiên. Test DOM xác nhận một sản phẩm, lọc, preview không trừ vàng, mục khóa và quay Home.

- 2026-10-18: Đính chính Shop theo người dùng: trang lớn nhưng nằm trong cùng khung Home, không kéo nội dung tới mép viewport. Shop dùng useHomeLayout/getCrispUiLayout chung: desktop lề ngang120px, dọc6px, compact6px; cùng viền vàng/nâu và nền ngoài xanh Home. Không sửa Home. Regression kích thước frame và chức năng shop1/1 PASS; typecheck/build PASS, dist có data-shop-frame. Chưa browser QA.

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

- 2026-10-18: Thêm3 avatar imagegen nữ kiếm khách/lão quân sư/nam tướng quân vào Phiên Chợ Hàng Ngày, cùng demo cũ thành4 sản phẩm; tab Tất cả/Avatar dùng chung map, ảnh tròn/card và giá xem thử500 như cũ. Chưa giao dịch/DB/cấp quyền avatar. Nguồn PNG1254x1254 full-bleed tại outputs/avatar-concepts, runtime src/assets/shop/avatars, prompt tại outputs/avatar-concepts/README.md. Shop regression1/1 PASS; chưa browser QA.

- 2026-10-18: Theo yêu cầu bỏ viền ảnh avatar trong Shop:3 ảnh mới vốn không viền; demo dùng sprite có vòng vàng baked-in, crop hiển thị riêng Shop bằng scale1.12 trong ô tròn overflowhidden để bỏ vòng. Không sửa sprite/AvatarPortrait dùng chung hoặc geometry avatar người chơi. Giữ khung card/giá/nút Mua. Đã xem sprite nguồn, typecheck/build PASS, dist xác nhận crop; chưa browser QA.

- 2026-10-19: Thêm bộ bo_3_vien_avatar_03_08_09 từ Downloads vào Shop: viền đỏ03/xanh ngọc08/tím09, tight alpha crop và nguồn tại src/assets/shop/frames/source.md. Product list chung theo kind, Tất cả7/Avatar4/Khung Viền3; objectcontain giữ nguyên tỷ lệ và lỗ alpha. Giá/nútMua xemthử500 theo sảnphẩm cũ, không trừvàng/cấp quyền hoặc sửa frame ngườichơi. Shop1/1 regression lọc/click3viền/no-deduct PASS, typecheck/build PASS; chưa browserQA.

- 2026-10-19: Mua mọi sảnphẩm Shop nay mở ShopPurchaseDialog native modal với tên/giá500 vàng/Hủy/Xác nhận, Escape/bấm ngoài đóng. Hủy không làm gì; Xác nhận vẫn báo xemthử/chưa mởbán, không trừvàng/cấpvậtphẩm/ghiDB. Dùng chung7sảnphẩm và giá chung card/dialog, giữUIcard. Shop1/1 regression bao gồm cancel/confirm/escape/tên-giá/no-deduct PASS, typecheck/build PASS; chưa browserQA.

- 2026-10-20: Shop sản phẩm đã sở hữu dùng lớp phủ đen60% toàn card và ảnh chữ Đã mua user5fc33724 giữa card/rộng85%, chung avatar/khung và các tab. Dùng ownsCosmetic(account,product), account reactive nên hiện ngay khi API mua xong/khi tải lại; giữ chống mua trùng hiện có. Ảnh nguồn2172x724 giữ references/uploads; loại alpha<=16 nhiễu vô hình rồi tightcrop x516/y234/1134x268, đã xem PNG và giữ artwork. Shop regression1/1 PASS gồm before/after mua và món chưa sở hữu; typecheck/build PASS dist index-ZNYKu36_.js và purchased asset. Chưa browser QA.


- 2026-10-20: Theo ảnh user, thu nhỏ chữ Đã mua Shop từ85% xuống60% chiều rộng card, neo50%/50% và translate-50% để căn giữa ngang/dọc toàn ô. Áp dụng chung avatar/khung, giữ overlay60%. Typecheck/build PASS, dist xác nhận class mới; chưa browser QA.


- 2026-10-20: Theo ảnh user, riêng Cửa Hàng Cao Cấp đổi dòng phụ thành Hàng thay thế mỗi tuần; MarketHeading nhận subtitle, các mục khác giữ mặc định. Chỉ đổi chữ UI, chưa triển khai lịch refresh backend. Typecheck/build PASS, dist xác nhận chữ mới; chưa browser QA.


- 2026-10-20: User chốt Shop Sự Kiện dòng2 Chưa có sự kiện. Phiên Chợ Hàng Ngày Làm mới sau đếm HH:MM:SS đến0h Việt Nam UTC+7, qua ngày lặp24h; tính từ Date.now mỗi tick, focus/visibility cập nhật, đổi tab/unmount dọn timer/listener. Số tăng1.3em→1.6em, camvàng#ffad24 đậm hơn và glow5/12px; kiểu số chung MarketHeading. Cao Cấp giữ dòng tuần và placeholder thời gian; Sự Kiện không giả lịch. Đây là đồng hồ UI, chưa tự đổi catalog/backend khi qua ngày.3/3 tests countdown/shop PASS gồm midnight/resume/cleanup, typecheck/build PASS; dist xác nhận nhãn/style/hook. Chưa browser QA.

