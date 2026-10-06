# Ghi nhớ quy tắc và lỗi cần tránh

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
- Các nút dùng chữ không icon, font Arial medium22px; nền nâu gỗ phẳng #875026, bo góc4px thiết kế, viền nâu vàng dày3px #9c784e, không bóng hay hiệu ứng hover. Kích thước mỗi nút giảm28px chiều ngang,60px chiều cao thiết kế so với ô lưới, căn giữa trong ô.
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
