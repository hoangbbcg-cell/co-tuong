# Ghi nhớ quy tắc và lỗi cần tránh

Cập nhật: 2026-10-05. File này lưu các quyết định người dùng đã chốt và bài học từ lỗi trong quá trình sửa project. Lịch sử công việc nằm ở `PROGRESS.md`; quy tắc đang có hiệu lực nằm ở đây và các tài liệu chuyên biệt được dẫn bên dưới.

## Cách sử dụng bắt buộc

1. Trước khi sửa project, đọc file này và tài liệu chuyên biệt của phần đang sửa. Không dựa riêng vào lịch sử chat hoặc trí nhớ.
2. Khi người dùng nói “lưu quy tắc”, “quy tắc tiếp theo”, hoặc chốt một hành vi mặc định, cập nhật quy tắc vào đúng mục và cập nhật tài liệu chuyên biệt nếu có. Ghi ngày, phạm vi và điều người dùng thực sự yêu cầu.
3. Khi người dùng thay đổi một quy tắc, sửa nội dung đang có hiệu lực; ghi quyết định cũ vào lịch sử nếu cần. Không để hai quy tắc trái nhau cùng được trình bày là mặc định.
4. Phân biệt quy tắc lâu dài với xem thử UI. Không biến thử nghiệm thành mặc định cho người chơi mới.
5. Khi gặp lỗi hoặc người dùng báo lỗi, ghi hiện tượng và cách tránh tái diễn. Chỉ ghi nguyên nhân khi đã kiểm tra; nếu chưa xác định thì ghi rõ chưa xác định.
6. Trước khi bàn giao, đối chiếu diff với các quy tắc liên quan và các lỗi đã ghi. Ghi đúng kết quả kiểm chứng; build thành công không đồng nghĩa đã kiểm tra trình duyệt.
7. Nếu yêu cầu mới rõ ràng thay đổi quy tắc cũ, áp dụng yêu cầu mới và cập nhật ghi nhớ. Nếu chưa rõ phạm vi hoặc có phần được khóa theo AGENTS.md, thực hiện theo hướng dẫn tương ứng trong AGENTS.md.

## Quy tắc đang có hiệu lực

### Danh hiệu, Elo và sao

- Người chơi mới bắt đầu ở **1000 Elo**, danh hiệu **Tân Binh**, **1 sao**. Hằng số dùng chung: `DEFAULT_PLAYER_ELO` trong `src/lib/rankProgression.ts`.
- Thứ tự bảy danh hiệu: **Tân Binh → Kỳ Sĩ → Kỳ Thủ → Kỳ Tướng → Đại Sư → Kỳ Vương → Kỳ Thánh**. Đại Sư là bậc5, Kỳ Vương là bậc6.
- Mốc bậc: 1000 / 1300 / 1600 / 1900 / 2200 / 2500 / 2800. Mỗi100 Elo thêm1 sao, mỗi bậc tối đa3 sao. Sao ngừng tăng tại2800; Elo vẫn có thể tăng. Chi tiết chính thức tại `docs/RANK-SYSTEM.md`.
- Chỉ hiển thị sao đã đạt. **Sao luôn xếp từ trái sang phải trong vùng cố định**: sao đầu không dịch khi số sao thay đổi, kể cả chỉ có1 sao. Không căn giữa các sao theo số lượng đang có.
- Vùng đủ3 ô sao dưới danh hiệu được căn giữa rồi dịch phải3px theo anchor106px; chỉ điền các sao đã đạt từ ô trái sang phải. Căn vị trí vùng theo khung không được làm sao1 tự nhảy vào giữa vùng. Hàng3 sao chiếm78% bề rộng khung (3×25% + 2×1.5%).
- Giữ bộ bảy ảnh mới, catalog `src/lib/rankArtwork.ts`. Các cụm avatar/danh hiệu dùng component chung và giữ vị trí, kích thước thống nhất giữa các bậc. Nguồn/crop tại `src/assets/ranks/rank-artwork-v2.md`.
- **Tọa độ sao đã khóa theo yêu cầu2026-10-05:** `RANK_STAR_LAYOUT` và `AVATA_RANK_STARS_STYLE` tại playerIdentityLayout.ts. Offset ngang phải3px, offset dọc -14px và offset cụm -1px theo anchor106px; sao25cqw, gap1.5cqw. Danh hiệu dưới avatar132.746801×53.085332px theo anchor106px. Không tự dịch vùng sao, đổi tỷ lệ hoặc ghi đè tọa độ trong màn hình khác; chỉ sửa sau khi người dùng đồng ý mở khóa theo AGENTS.md.
- Mọi nơi hiển thị sao bậc dùng `RankStars` và ảnh `src/assets/player/rank-star.png`, gồm Home/Hồ sơ/Tùy chỉnh/PlayerCard/Bạn bè. Không dựng sao bằng ký tự★ hoặc bộ ảnh khác. Bạn bè giữ vùng chứa103px cạnh tên danh hiệu; cùng component sao tự co theo vùng đó.
- 2026-10-05: Người dùng cho phép thay đổi vị trí sao riêng Home; đã hạ thêm2px từ `starsYPx=-9` xuống `-7` theo anchor106px, giữ `titleYPx=-2`. Phạm vi offset sao Home hiện được mở khóa theo yêu cầu; các tọa độ sao chung và consumer khác vẫn khóa.

### Bạn bè

- Bắt buộc đọc `docs/FRIENDS-UI-RULES.md` trước khi sửa Bạn bè; tài liệu đó giữ thông số chi tiết và quy tắc bộ lọc.
- Tất cả: bạn trong game. Đang online: bạn trong game đang online. Bạn Facebook: bạn Facebook có chơi game và đăng nhập/liên kết Facebook, bao gồm cả online lẫn offline.
- Chỉ có hai trạng thái online/offline; Facebook là thuộc tính riêng. Chấm trạng thái, chữ trạng thái và icon Facebook nằm cùng hàng ngang. Icon Facebook21px, cách chữ6px.
- Luôn xếp online trước offline trong mọi danh sách Bạn bè; giữ thứ tự ổn định trong cùng trạng thái.
- Các hàng dùng chung kích thước avatar, padding, tên/trạng thái, danh hiệu. Danh sách và Thêm bạn dùng cùng vị trí khung; Lời mời đồng bộ kích thước hàng nhưng có thể khác vị trí vùng cuộn.
- Hover chỉ đổi màu/độ sáng; không dịch vị trí, scale hoặc đổi kích thước chữ/nút. Các nút phải có phản hồi khi bấm.
- Danh sách đã gửi lấy từ lời mời mình đã gửi; badge đỏ trên tab Lời mời đếm lời mời đã nhận.

### Asset và phạm vi sửa

- Xếp hạng: mỗi hàng dùng AvatarRankBadge dưới avatar84px, danh hiệu/sao lấy từ Elo cùng hàng; dùng nguyên tọa độ đã khóa. Hàng138px, padding dọc0, khoảng cách8px; khối nhận diện132px, toàn cụm avatar đặt xuống5px trong khối để chừa vương miện và cân khoảng trống trên/dưới. Huy hiệu thứ hạng trong ô90×90px căn giữa hàng/cột, số từ hạng4 trở đi neo tâm50%/50%. Vùng cuộn dọc để đủ chỗ cụm avatar/danh hiệu/sao. Áp dụng cả tab Cờ Tướng và Cờ Úp. Dữ liệu xếp hạng hiện vẫn minh họa.

- Ảnh mới phải cắt sát bounding box nội dung nhìn thấy; phần ngoài hình trong suốt thật. Giữ tỷ lệ, màu, chữ và chi tiết của ảnh nguồn.
- Dùng component/catalog chung khi nhiều màn hình cần cùng hình và kích thước. Không đổi phần UI đã chốt ngoài phạm vi yêu cầu.
- Sau thay đổi project, chạy build theo AGENTS.md, xác nhận dist cập nhật và ghi kết quả thực tế vào PROGRESS.md.

## Xem thử đang bật

- 2026-10-04: Home dùng `previewStars={3}` để xem thử Tân Binh đủ3 sao. Elo session vẫn1000; đây không phải quy tắc sao mặc định của người chơi mới. Các nơi không truyền previewStars lấy sao thật theo Elo.
- Chế độ luân phiên danh hiệu mỗi2 giây đã được gỡ theo yêu cầu; không tự bật lại.

## Lỗi đã gặp và cách tránh

| Mã | Hiện tượng / bằng chứng | Nguyên nhân đã xác định | Cách tránh và kiểm chứng |
| --- | --- | --- | --- |
| STAR-01 | Người dùng báo1 sao nằm giữa khung thay vì xếp từ bên trái. | RankStars từng căn giữa theo số sao hiện có. | Căn giữa vùng đủ3 ô cố định, điền từ trái sang phải. Đối chiếu cả1,2,3 sao: sao đầu phải giữ nguyên vị trí. Phân biệt căn vùng với căn các sao. |
| STAR-02 | Cụm đủ3 sao lệch trái so với danh hiệu. | Hàng sao chiếm78% chiều rộng nhưng bắt đầu ở mép trái của wrapper100%, phần dư chỉ nằm bên phải. | Căn giữa vùng đủ3 ô (78%) trong wrapper; tâm wrapper trùng tâm danh hiệu. Không căn giữa theo số sao đã đạt. |
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
