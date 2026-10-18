# Quy tắc giao diện Bạn bè

- 2026-10-13: Đấu máy là phiên riêng, không báo đang chơi/bận cho lời mời. Vẫn cho Mời chơi/So tài; đồng ý kết thúc phiên máy và chuyển phòng online theo người gửi. Không đưa người nhận vào phiên máy; UI Bạn bè giữ nguyên.

- 2026-10-06: Avatar tại mọi tab mở hồ sơ người chơi bằng button cùng ô76px hiện hành; chỉ bổ sung hành vi, giữ hình học avatar/hàng. Hồ sơ người khác dùng6 nút3×2 tại vùng danh hiệu; nhãn trạng thái bạn dựa theo danh sách bạn bè và lời mời đang chờ.

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
