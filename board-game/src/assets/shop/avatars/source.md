# Avatar concepts — 2026-10-18
Generated with built-in image_gen. Three separate 1254×1254 PNG files, full-bleed background; no transparent margin. Not integrated into the avatar catalog or Shop.

Shared prompt:
Use case: stylized-concept. Create ONE finished square player portrait avatar for a premium Vietnamese xiangqi game with a historical wuxia aesthetic. Subject: [subject below]. Rich finely painted semi-realistic game illustration, cinematic warm gold lighting, detailed expressive face clearly readable at tiny avatar sizes. Centered head-and-shoulders close-up filling the square, entire face and hair visible within the central circular safe area, softly painted dark atmospheric background filling all four edges. No frame, no border, no text, no badge, no watermark. Single character only, not a sheet or collage.

- nu-kiem-khach.png subject: a young adult female sword master, confident calm gaze, ivory and crimson traditional robes, black hair in an elegant high ponytail, subtle golden hair ornament
- lao-quan-su.png subject: an elderly male chess strategist, thoughtful eyes, silver beard, dark teal scholar robes, simple traditional headpiece, dignified wise expression
- nam-tuong-quan.png subject: an adult male warrior general, strong charismatic face, dark hair, bronze and deep red lamellar armor, composed heroic expression

Visual inspection: each image has one centered portrait, no text/frame; face is visible. All backgrounds reach file edges. No source or existing avatar was replaced.
## Bản tăng độ rõ — 2026-10-19
Built-in image_gen edit, mỗi ảnh gốc là edit target tương ứng, không ghi đè gốc:
- src/assets/shop/avatars/nu-kiem-khach-v2.png
- src/assets/shop/avatars/lao-quan-su-v2.png
- src/assets/shop/avatars/nam-tuong-quan-v2.png

Prompt dùng cho từng ảnh:
Use case: precise-object-edit. This exact image is the edit target, a game player avatar. Make a faithful high-clarity version for a small 100–150px circular avatar. Preserve EXACT facial identity, expression, pose, framing, hairstyle, clothes, background, colors and lighting. Only improve definition: crisp natural eyes, eyebrows, lips, hair edges and clothing contours, remove optical softness, improve subtle local contrast so facial features survive downsampling. No redesign, no beauty retouch, no invented details, no change of crop, no text, no frame, no sharpening halos. Keep the entire square composition and full-bleed edges exactly as the reference.

Đã xem3output;1254×1254, ảnh phủ đầy tới bốn cạnh, không khoảng alpha dư. AvatarPortrait dùng CrispUiImage/native img, không thêm Canvas hay CSS filter. Shop và mọi nơi dùng AvatarPortrait đọc cùng bảnv2; mã avatar15/16/17 và bố cục giữ nguyên. Chưa browserQA ảnh tại100–150px; không khẳng định nguyên nhân trình duyệt hoặc hết mọi độ mềm ở kích thước nhỏ.
## Bản nhỏ dùng runtime — 2026-10-19
Thay crop150% bằng toàn bố cụcgốc. small/*.png do scripts/prepare-avatar-sizes.ps1 xuất từ masterv2 với HighQualityBicubic, không AI/sửa chi tiết. Có12 cỡ96..480 mỗi nhânvật, native srcSet chọn theo kíchthướcô/DPR; master1254 không bundle runtime. Đã xem3ảnh128px, kiểm tra36kíchthước/alpha đúng. Giữ filev2 làm nguồn.
