# Quy tắc giao diện Bạn bè

Đọc tài liệu này trước mọi thay đổi tại `src/features/lobby/components/FriendsDialog.tsx`, `useFriendsLayout.ts`, `SocialUi.tsx` hoặc asset được các phần đó dùng. `AGENTS.md` trỏ tới đây để không vô tình làm lệch các điều người dùng đã chốt.

## Mốc bố cục cố định giữa các tab

- Lấy bố cục Danh sách đã chốt làm chuẩn. Danh sách và Thêm bạn dùng chung `friendDirectoryClass`: hàng điều khiển đầu 54px, khoảng cách 14px, vùng tìm kiếm chiếm 48px (mặt khung 56px lệch lên 4px), khoảng cách 14px, rồi khung danh sách. Vì vậy khung danh sách bắt đầu tại cùng mốc 130px tính từ vùng nội dung và có cùng chiều rộng/chiều cao.
- Thêm bạn đặt tiêu đề Gợi ý trong hàng điều khiển đầu và tìm kiếm ở hàng thứ hai để giữ cùng vị trí với Danh sách. Không tự đổi thứ tự hay chiều cao làm khung hàng di chuyển khi đổi tab.
- Tab Lời mời có hai nhóm nên được phép dùng vị trí và chiều cao vùng cuộn riêng. Chỉ đồng bộ kích thước hàng, avatar, danh hiệu và padding theo cùng `FriendRow`; không ép hai nhóm vào vị trí của Danh sách.

## Bố cục hàng và trạng thái

- Mọi hàng trong Danh sách, Bạn Facebook, Thêm bạn, Lời mời đã nhận và Đã gửi lời mời dùng chung `FriendRow` và `friendListClass`. Giữ hàng cao đúng 85px, viền dưới 1px ở mọi hàng (hàng cuối chỉ chuyển viền thành trong suốt, không bỏ độ dày viền), avatar 76px, padding phải hàng 38px, padding trái 0/dọc 0, lề trái khối avatar 16px; toàn bộ cột hàng dịch trái 22px và khoảng avatar tới tên 36px.
- Danh sách/Thêm bạn dùng cột danh hiệu 240px và cột thao tác 330px: họa tiết nâu bên trái avatar đã bỏ; nội dung các cột dịch trái 22px để lấp chỗ trống. Nền nâu thu thêm 30px từ mép trái và danh hiệu dịch phải 30px so với mốc cũ 270px. Lời mời giữ cột danh hiệu 270px riêng để đủ chỗ cho cặp nút; kích thước hàng/avatar/padding vẫn đồng bộ. Danh hiệu dùng ảnh 194×78px theo yêu cầu tăng nhẹ bộ ảnh mới. Kiểm tra nội dung dài và nhóm nút nhận/từ chối không đè sang cột bên cạnh trước khi đổi kích thước cột.
- Mọi danh sách cuộn cần cùng kiểu khung, `scrollbar-gutter: stable`, tràn ngang bị ẩn. Tiêu đề nhóm nằm ngoài vùng cuộn. Không chia cứng lưới 5 hàng: số hàng thay đổi nhưng mỗi hàng vẫn cao cố định 85px.
- Trạng thái chỉ có `online` và `offline`. “Đang chơi/playing” được xem là online. Facebook là thuộc tính phân loại riêng (`facebook?: boolean`), không phải trạng thái thứ ba. `facebook === true` chỉ dành cho người đã kết bạn Facebook, có chơi game này và đăng nhập bằng Facebook hoặc đã liên kết tài khoản Facebook với game. Trạng thái online/offline độc lập với liên kết này. Hàng bạn Facebook hiện chấm xanh hoặc xám, chữ trạng thái và icon Facebook nằm cùng một hàng ngang; icon Facebook 21×21px, cách chữ trạng thái 6px. Phân loại bộ lọc không chồng lấn: **Tất cả** chỉ hiện bạn đã kết bạn trong game (`facebook !== true`), gồm cả online và offline; **Đang online** chỉ hiện bạn trong game có trạng thái `online`; **Bạn Facebook** hiện tất cả người thỏa điều kiện Facebook ở trên, cả online lẫn offline. Không lọc tab Facebook theo presence. Giữ chính sách này khi thay dữ liệu hoặc bộ lọc.
- Bắt buộc chấm trạng thái, chữ Đang online/Offline và icon Facebook nằm cùng một hàng ngang, cùng tâm theo chiều dọc. Cả ba là phần tử con trực tiếp của một hàng inline-flex/flex-row/nowrap; không đặt icon Facebook thành dòng riêng, kể cả khi đổi tab hoặc tên dài.
- Vị trí tên và trạng thái lấy Danh sách → Tất cả làm chuẩn cho mọi hàng. Khối nhận diện cao 76px, cột tên/trạng thái cao 53px với hàng tên 24px, khoảng cách 8px, hàng trạng thái 21px. Cả tên và trạng thái căn cùng mép trái; không để nội dung, Facebook hoặc đổi tab làm thay chiều cao khối chữ và dịch vị trí.
- Hover nút chỉ đổi màu/độ sáng. Không thêm translate, scale, thay kích thước, margin hoặc font khi hover/focus/active; tránh transition gây nhấp nháy.

## Thứ tự người chơi

- Luôn sắp xếp người online trước người offline trong mọi danh sách Bạn bè: danh sách bạn game, tab Facebook, gợi ý kết bạn, lời mời đã nhận và lời mời đã gửi. Giữ nguyên thứ tự tương đối giữa những người cùng trạng thái để danh sách ổn định khi render. Tìm kiếm/lọc chạy trước, rồi sắp xếp các kết quả.

## Danh hiệu và tab

- Bộ bảy ảnh danh hiệu mới dùng chung `rankArtwork` từ `src/lib/rankArtwork.ts`, asset `src/assets/ranks/rank-*-v2.png`; nguồn và crop tại `src/assets/ranks/rank-artwork-v2.md`. Không khai báo bộ import riêng trong Bạn bè để tránh lệch ảnh với các cụm avatar.
- Sao dùng `RankStars` và ảnh rank-star.png chung toàn project, trong vùng chứa103px có container-type:inline-size; không dùng ký tự★. Vùng đủ3 ô cố định, sao đạt điền trái→phải. Tỷ lệ sao/gap lấy từ RANK_STAR_LAYOUT đã khóa; không tự ghi đè khi sửa Bạn bè.

- Dùng đủ bảy asset danh hiệu hiện có cho mọi loại hàng Bạn bè theo thứ tự bậc: Tân Binh, Kỳ Sĩ, Kỳ Thủ, Kỳ Tướng, Đại Sư, Kỳ Vương, Kỳ Thánh. Bậc/tên/sao tính từ Elo bằng `getRankProgress` tại `src/lib/rankProgression.ts`, asset lấy theo tên bậc trong `friendRanks`; quy tắc chi tiết ở `docs/RANK-SYSTEM.md`. Cả 7 bậc tối đa 3 sao, chỉ hiện sao đã đạt và ẩn sao chưa đạt; mỗi 100 Elo lên một sao, đổi bậc sau 3 sao; sao dừng ở 2800 Elo trong khi Elo tổng vẫn tăng; giữ vùng sao rộng tối thiểu 103px để không đổi tỷ lệ hàng; không khôi phục huy hiệu quân cờ tròn thay thế.
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
