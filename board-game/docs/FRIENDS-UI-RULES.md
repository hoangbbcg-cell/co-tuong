# Quy tắc giao diện Bạn bè

- 2026-10-06: Avatar tại mọi tab mở hồ sơ người chơi bằng button cùng ô76px hiện hành; chỉ bổ sung hành vi, giữ hình học avatar/hàng. Hồ sơ người khác dùng6 nút3×2 tại vùng danh hiệu; nhãn Thêm bạn/Xóa bạn lấy từ danh sách bạn bè đang có.

Đọc tài liệu này trước mọi thay đổi tại `src/features/lobby/components/FriendsDialog.tsx`, `useFriendsLayout.ts`, `SocialUi.tsx` hoặc asset được các phần đó dùng. `AGENTS.md` trỏ tới đây để không vô tình làm lệch các điều người dùng đã chốt.

## Mốc bố cục cố định giữa các tab

- Lấy bố cục Danh sách đã chốt làm chuẩn. Danh sách và Thêm bạn dùng chung `friendDirectoryClass`: hàng điều khiển đầu 54px, khoảng cách 14px, vùng tìm kiếm chiếm 48px (mặt khung 56px lệch lên 4px), khoảng cách 14px, rồi khung danh sách. Vì vậy khung danh sách bắt đầu tại cùng mốc 130px tính từ vùng nội dung và có cùng chiều rộng/chiều cao.
- Thêm bạn đặt tiêu đề Gợi ý trong hàng điều khiển đầu và tìm kiếm ở hàng thứ hai để giữ cùng vị trí với Danh sách. Không tự đổi thứ tự hay chiều cao làm khung hàng di chuyển khi đổi tab.
- Tab Lời mời có hai nhóm nên vị trí và chiều cao vùng cuộn riêng; riêng cột danh hiệu dùng cùng tọa độ ngang với Danh sách/Thêm bạn. Kích thước hàng, avatar, danh hiệu và padding vẫn cùng `FriendRow`.

## Bố cục hàng và trạng thái

- Mốc hiện hành2026-10-05: nền nâu dài thêm50px thiết kế responsive về bên trái (margin-left âm38px+50px), mép phải giữ mốc cũ; danh hiệu/sao/tên bậc dịch riêng sang trái50px bằng brownContentPosition trong FriendRow. Theo yêu cầu2026-10-06, khung/ảnh danh hiệu và cụm sao được mở khóa để thử nghiệm; các cột, nền và nội dung hàng khác vẫn khóa. Nhóm nút theo yêu cầu mới được căn sát phải nền nâu, chừa8px responsive bằng padding-right của cột thao tác, không dùng offset trái50px. Áp dụng mọi tab Bạn bè, giữ kích thước/khoảng cách nội bộ của phần còn khóa. Avatar giữ vị trí cũ; tên/trạng thái dịch trái8px responsive bằng giảm gap từ36px xuống28px.

- Kích thước avatar và khung avatar Bạn bè vẫn nằm trong phạm vi khóa toàn project; khung/ảnh danh hiệu và sao đã mở khóa để thử nghiệm theo yêu cầu2026-10-06. Vị trí ngang danh hiệu ở các tab đã căn chung theo Danh sách sau khi người dùng mở khóa riêng để chỉnh: avatar76px theo responsive scale; cụm danh hiệu/sao166×84px, ảnh danh hiệu166×66.382px, sao25%/gap1.5% và cùng anchor tương đối Home. Không tự đổi hình học avatar.
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
- Danh hiệu và sao dùng `RankTitleBadge` chung với Home, ảnh rank-star.png; sao dưới ảnh danh hiệu theo RANK_TITLE_STARS_STYLE, không còn đặt cạnh tên. Cụm rộng166px/cao84px; khung ảnh166×66.382px để cả cụm vừa hàng85px. Vùng đủ3 ô cố định, sao đạt điền trái→phải; tỷ lệ25% và gap1.5% lấy từ RANK_STAR_LAYOUT. Tên danh hiệu vẫn ở bên cạnh. Mọi tab dùng cùng FriendRank; thay chuẩn chung phải đồng bộ các màn hình trong cùng nhiệm vụ.

- Dùng đủ bảy asset danh hiệu theo thứ tự Tân Binh, Kỳ Sĩ, Kỳ Thủ, Kỳ Tướng, Đại Sư, Kỳ Vương, Kỳ Thánh. Bậc/tên/sao lấy cùng getRankProgress; RankTitleBadge lấy ảnh từ catalog rankArtwork. Cả7 bậc tối đa3 sao, chỉ hiện sao đạt và điền trái→phải; mỗi100 Elo thêm1 sao, sao dừng tại2800 nhưng Elo vẫn tăng. Vùng sao rộng bằng khung danh hiệu, tự co theo tỷ lệ chung. Chi tiết tại docs/RANK-SYSTEM.md.
- Ba tab Danh sách/Thêm bạn/Lời mời giữ kích thước asset nền hiện tại. Khi chọn, dùng `selectedImageTabGlow` chung với Xếp hạng; glow chuyển bằng filter, không đổi layout hoặc vị trí chữ/icon.
- Asset khung tiêu đề nhóm dùng `friend-section-title-frame-tight.png`; phần ngoài viền phải trong suốt và ảnh cắt sát viền. Giữ alpha khi thay/crop asset.

## Lời mời và thao tác

- `sentInvites` là nguồn state duy nhất cho danh sách Đã gửi, số đếm và trạng thái nút Kết bạn. Gửi không thêm trùng; hủy xóa khỏi danh sách và mở lại nút Kết bạn. State hiện tại là thử nghiệm trong phiên; không tuyên bố đã đồng bộ máy chủ hoặc lưu qua lần tải lại.
- Badge tròn đỏ trên tab Lời mời đếm `received.length`, ẩn khi bằng 0, giảm khi chấp nhận/từ chối. Dùng số `99+` khi vượt 99.
- Nút Mời chơi và Nhắn tin phải có phản hồi khi bấm. Khi chưa có tích hợp backend tương ứng, nói rõ tính năng chưa hỗ trợ; không giả báo đã gửi lời mời hoặc tin nhắn.
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
