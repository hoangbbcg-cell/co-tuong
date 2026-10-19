# Rendering ảnh UI nhỏ

Cập nhật 2026-10-05. Đọc cùng PROJECT-MEMORY.md và tài liệu của màn đang sửa.

## Nguyên nhân đã kiểm tra

- Home, Hồ sơ/Tùy chỉnh avatar, Bạn bè, Lịch sử và Chơi với máy từng scale toàn cụm thiết kế bằng transform. Bitmap nhỏ và chữ được lấy mẫu lại ở parent. Xếp hạng đã bỏ cơ chế này trong lượt trước.
- Danh hiệu dùng Canvas trung gian rồi nằm trong parent scale; lớp translateZ(0)/backface bắt buộc có thể khiến browser composite một bitmap trung gian. Đã gỡ các lớp này, không kết luận chúng là nguyên nhân duy nhất của nhấp nháy.
- Crop huy hiệu Hồ sơ có scaleY; khung chọn có scale. Nay tính kích thước/tỷ lệ CSS tương đương trực tiếp. Marker/hit layer bàn cờ tính tọa độ và kích thước thật thay scale parent, giữ căn theo quân cờ.
- Có kích thước/offset phần trăm và số lẻ. Pixel token responsive nay làm tròn kích thước ô; các tỷ lệ sao/crop vẫn giữ để không đổi bố cục đã chốt.
- Không phát hiện CSS zoom. Nguồn danh hiệu/sao lớn hơn nhiều so với kích thước hiển thị. Mờ không chủ yếu do thiếu độ phân giải nguồn ở hai nhóm này.

## Cách dùng chung

- Dùng src/lib/CrispUiImage.tsx cho ảnh UI tĩnh. Component trả về img trực tiếp, không thêm wrapper/lớp Canvas. Giữ imageRendering:auto để khử răng cưa tự nhiên. Hàm crispImageProps làm tròn thuộc tính width/height dạng số; CSS width/height vẫn có quyền ưu tiên như img bình thường.
- Với cụm thiết kế responsive, dùng getCrispUiLayout(scale, designWidth, designHeight) trong src/lib/crispUiRendering.ts. Kích thước là pixel CSS cuối cùng, không transform scale. Token --ui-p-N có fallback kích thước gốc; bổ sung N vào PIXEL_SIZES nếu có kích thước thiết kế mới. Không scale bù lần nữa ở child.
- FittedUiArtwork dành cho huy hiệu đã có stretch/crop được duyệt: tính contained size từ naturalWidth/naturalHeight và ô thật, rồi render bằng width/height nguyên. scaleX/scaleY là hệ số tính kích thước, không phải CSS transform; objectFit:fill chỉ giữ đúng mức stretch cũ, không áp dụng cho asset mới. Không dùng helper này cho sao/danh hiệu rank có chuẩn tỷ lệ riêng.
- Giữ aspect-ratio gốc hoặc object-contain trong ô cố định. Crop sprite dùng aspect-ratio/background-size/offset tương đương, không đổi vùng crop và không kéo méo ảnh để chữa mờ.
- Không bật pixelated/crisp-edges/optimize-contrast cho artwork nhiều chi tiết. Không thêm Canvas sharpen hoặc filter SVG động chỉ để chữa parent scale. Giữ style màu/bóng đã có.
- Ưu tiên nguồn ít nhất 2x kích thước hiển thị ở màn DPR2. Phóng nguồn nhỏ lên không tạo lại chi tiết. Chỉ thay asset sau khi xác định thật sự cần và giữ thiết kế được duyệt.
- Scale của animation quân cờ/like/intro và hệ tọa độ SVG vector là chủ ý chuyển động, không dùng làm kích thước tĩnh của asset.

## Chuẩn sao không thay đổi

RankStars + RANK_TITLE_STARS_STYLE là nguồn duy nhất, lấy Home làm chuẩn: sao25cqw, gap1.5cqw, 3 ô cố định, điền từ trái; vùng dịch phải3px theo khung132.746801px. Danh hiệu top84.876613px/sao top120.961945px theo avatar106px. Giữ tỷ lệ theo ô, không làm tròn từng sao hoặc tự đổi tọa độ để chữa mờ. Các ô ảnh/title có thể làm tròn pixel cuối cùng nhưng cqw/percentage giữ đúng tỷ lệ.

## Giới hạn nguồn hiện tại

Icon Điểm red-general60x62 khi hiển thị khoảng43px chưa đủ2x. Ảnh tab Lịch sử305x70/306x67 ở khoảng200x46 và khung Xem lại151x52 ở128x44 cũng chưa đủ2x. Đã giữ nguyên theo yêu cầu. Nguồn rank khoảng2000px và sao1199x1219 đủ độ phân giải; chữ rất nhỏ vẫn giới hạn bởi số pixel thật khi hiển thị.

## Khi sửa tiếp

Tìm toàn bộ consumer, cập nhật nguồn dùng chung và kiểm tra Home/Xếp hạng/Hồ sơ/Bạn bè/Lịch sử ở viewport thường và nhỏ. Kiểm tra ancestor transform/zoom, naturalWidth/naturalHeight và bounding box. Build không thay thế kiểm tra trực quan. Sai khác dưới1px do làm tròn không được biến thành thay đổi bố cục hoặc tọa độ sao.
Quy tắc2026-10-05: Tân Binh giữ vị trí sao hiện hành. Sáu bậc2–7 (Kỳ Sĩ/Kỳ Thủ/Kỳ Tướng/Đại Sư/Kỳ Vương/Kỳ Thánh) hạ riêng hàng sao thêm1px CSS bằng getRankTitleStarsStyle(rank.level), top=calc(top chuẩn + 1px). Áp dụng mọi consumer; không dịch danh hiệu, avatar, thẻ hoặc thành phần UI khác; không đổi size/gap/hướng điền sao. Đây là ngoại lệ theo bậc người dùng yêu cầu, không phải offset riêng màn hình.

- 2026-10-18: Cải thiện rendering khung/icon năng lượng-vàng: ảnh nguồn frame1604x217/icon169x218,222x219 đủ cho kích thước nhỏ. Home dùng width/height/top/left nguyên pixel (sai số làm tròn<=0.5px), bỏ translate trên từng ảnh; giữ geometry danh nghĩa/asset/số/cộng. ResourceArtwork chung dùng -webkit-optimize-contrast riêng resource trên Home/compact/Shop, không áp dụng ảnh khác. Typecheck/build PASS, dist xác nhận sampling; mobile/shop2/2 regression PASS. Chưa browser QA độ nét thực tế, không khẳng định đã xác minh nguyên nhân bằng browser.


- 2026-10-18: Sửa răng cưa icon năng lượng/vàng: ResourceArtwork thêm smooth=true dùng imageRendering:auto riêng icon (Home desktop/compact/Shop và giá vàng sản phẩm); giữ optimize-contrast cho khung. Không sửa asset/size/anchor. Nguyên nhân code có chế độ tăng nét cùng khung, có thể gây cạnh gắt khi thu nhỏ; chưa xác minh browser. Typecheck/build PASS, dist có smooth flag; chưa browser QA.


- 2026-10-19: User báo avatar mới mờ. Nguồn gốc1254², browserQA không cóbrowseriab nên chưa xác định nguyênnhân renderthực. Dùng imagegen edit3ảnh tăng độ rõ mắt/tóc/contour theo ảnhgốc, lưu -v2 siblings, giữoriginal và prompt nguồn tại src/assets/shop/avatars/source.md. Đồngbộ Shop/AvatarPortrait mọiconsumer, render qua CrispUiImage nativeimg, khôngCSSfilter/Canvas/đổi geometry/mãvậtphẩm/DB. Đã xem3ảnh1254²/fullbleed;5/5 shop/inventory/profile regression PASS, typecheck/build PASS, dist đủ3ảnhv2. Chưa browserQA nên chưa xácnhận hiệuquả thực ở100–150px.

- 2026-10-19: User vẫn thấy avatar mới hơi mờ sauv2. Đổi cách hiển thị3avatar mới sang native CSSbackground cùng môhình spritecũ, backgroundsize150%/position50%35% để mặt chiếm nhiều pixel hơn trong cùng vòng; khôngCSSfilter/Canvas/transformscaleparent và không sửa ảnhnguồn. Shop cũng dùng AvatarPortrait để crop đồngnhất với Hồsơ/Tùychỉnh/bàn/chát. Giữ viewport/kíchthước/vịtrí avatarvàkhung, không thay bậc/DB/quyền sởhữu.5/5 regression shop/inventory/profile PASS, typecheck/build PASS, dist xácnhận. Đây là đổi crop/render, không khẳng định đã đo nguyênnhân mờ bằng browser; chưa browserQA.

- 2026-10-19: User yêu cầu hoàn tác crop150% và dùng file ảnhnhỏ. Đã gỡ backgroundcrop, giữkhungảnhgốc; scripts/prepare-avatar-sizes.ps1 resize deterministic HQBicubic/TileFlipXY từmasterv2 thành36PNG (3ảnh×12cỡ96/128/136/160/192/200/256/272/320/384/408/480). SmallAvatarPortrait dùng srcSet+sizes đoôthật chọnnguồnnhỏ theoDPR; khôngCanvasruntime/filter/zoom/cropmới. Shop vàAvatarPortrait dùngcùng nguồnnhỏ, không đổi geometry/DB. Đã xem3bản128px, QA36/36size/alpha PASS,5/5 regression shop/inventory/profile PASS, typecheck/build PASS; dist36ảnhnhỏ/0masterv2. Chưa browserQA; không khẳngđịnh triệt tiêumọi resample ởmọi viewport.

- 2026-10-19: Theo user chỉ thử1avatar Lão quân sư A/B/C, không rollout. Tùy chỉnh thêm nút mở portal so sánh đúng width preview làm tròn; A giữ SmallAvatarPortrait hiện tại, B Lanczos3 antialias rồi Gaussian unsharp20% sau resize, 1x/2x nguyên pixel48–160, C chờ ảnh/local file chỉ preview. Không đổi equip/DB/geometry hiện hành. Diagnostics runtime báo size/current source/DPR và ancestor filter/transform/scale; objectcover, không scale test.193/193 PNG size PASS,5/5 regression comparison/inventory/profile PASS, typecheck/build PASS, dist index-BHUyrude.js. Chưa browser QA; chưa kết luận B thắng. Nguồn/script và hướng dẫn tại src/assets/shop/avatars/ab-test/source.md.
