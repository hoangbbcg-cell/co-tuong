# Ghi chú danh hiệu

Cập nhật: 30-09-2026. Đây là bản ghi nhớ nội dung và quy ước hiển thị danh hiệu đã thống nhất.

## Tóm tắt

- Có 5 nhóm danh hiệu, tổng cộng 39 biến thể: Vinh Quang Kỳ Đài (9), Phong Tặng (15), Chuỗi Chiến Thắng (5), Tổng Ván Chơi (5), Online Chuyên Cần (5).
- Danh mục **Danh Hiệu Phong Tặng** vẫn giữ đủ 15 định nghĩa theo 5 cấp × 3 danh hiệu ở mục 2; các thẻ hiện bị ẩn khỏi giao diện.
- Cả sáu tab danh hiệu đều hiển thị. Chỉ danh hiệu đã mở khóa và chưa bị ẩn mới có nút chọn; mỗi tab nhóm cho phép chọn tối đa 3 danh hiệu để đưa lên hồ sơ. Danh hiệu khóa vẫn mở bảng thông tin nhưng không thể chọn. Khi ẩn một danh hiệu đã chọn, danh hiệu đó được bỏ khỏi hồ sơ và nút chọn không còn xuất hiện cho tới khi hiện lại. Tab **Tất cả** luôn liệt kê mọi danh hiệu đã mở khóa, kể cả danh hiệu chưa chọn hoặc đang ẩn; danh hiệu đang ẩn không có nút chọn. Khi không có danh hiệu nào mở khóa, hiện “Chưa có danh hiệu”. Lựa chọn được lưu cục bộ theo ID hồ sơ.
- Ô **Danh hiệu** trong hồ sơ hiển thị các danh hiệu đã chọn và chưa bị ẩn, tối đa 3 lựa chọn từ mỗi nhóm. Hiển thị tối đa 9 thẻ cùng lúc, xếp cấp cao trước; nếu nhiều hơn, các trang tự trượt sang trái mỗi 5 giây và tạm dừng khi rê chuột vào vùng thẻ. Bấm thẻ giữ hồ sơ đang mở và hiện riêng bảng thông tin (không mở danh sách), căn giữa theo chiều dọc màn hình và cách thẻ 15px; thẻ ở hai cột đầu mở bảng bên phải, cột cuối mở bên trái. Bản xem trước không phát sáng khi bấm. Bấm ngoài bảng sẽ đóng; bấm thẻ khác sẽ chuyển thông tin sang thẻ vừa chọn.
- Khung thông tin danh hiệu có công tắc **Ẩn**: tắt màu xám, bật màu xanh lá. Bật sẽ ẩn và bỏ chọn danh hiệu khỏi hồ sơ; danh hiệu vẫn có thể mở trong tab **Tất cả** để hiện lại. Khung danh sách cũng có công tắc cạnh nút đóng, dùng chung trạng thái ẩn của danh hiệu đang mở hoặc đang chọn; bấm ở một vị trí cập nhật công tắc còn lại. Trạng thái được lưu cục bộ theo hồ sơ.
- Chuỗi Chiến Thắng, Tổng Ván Chơi và Online Chuyên Cần đang hiển thị kiểu khóa: khung/chữ tối hơn, icon ổ khóa nằm giữa; vẫn bấm được để xem thông tin và điều kiện nhận.
- Giữ nguyên asset khung, màu, font, kích thước, vị trí và bố cục đã duyệt khi chỉnh dữ liệu danh hiệu khác. Mỗi cấp Phong Tặng dùng đúng khung riêng của cấp đó.
- Chữ tiếng Việt dùng font có đủ glyph tiếng Việt và văn bản chuẩn NFC.
- Nội dung Chú thích và Cách nhận dùng dấu đầu dòng hình thoi cho từng dòng; chừa một khoảng nhỏ giữa dấu và chữ. Nếu nội dung dài, cuộn bên trong vùng nội dung.
- Khi khung Thông tin danh hiệu đang mở, bấm danh hiệu khác sẽ đổi nội dung ngay trong khung đang mở. Khung được căn giữa theo chiều dọc của bảng danh hiệu, không căn theo vị trí thẻ được chọn.
- Thẻ danh hiệu và các tab bên trái có con trỏ bàn tay khi rê chuột.
- Khung đang chọn trong danh sách có trạng thái chung `title-frame selected`: viền được làm sáng bằng drop-shadow theo alpha PNG; glow và tia vàng được neo theo bounding box khung, co theo crop/aspect ratio, không đổi khung, chữ hoặc layout. Hiệu ứng mờ vào trong 200ms và chỉ hiện trên danh hiệu đang mở thông tin.

## 1. Vinh Quang Kỳ Đài

Khung màu đỏ. Ba cấp khung: cấp 1 Quốc gia, cấp 2 Tỉnh, cấp 3 Xã. Mỗi cấp có Quán Quân, Á Quân và Hạng Ba.

Hiển thị đủ 9 thẻ Vinh Quang Kỳ Đài trong tab. Người chơi có thể chọn tối đa 3 thẻ của nhóm này để hiển thị trên hồ sơ.

| Cấp | Danh hiệu | Chú thích | Cách nhận |
| --- | --- | --- | --- |
| Quốc gia | Quán Quân | Danh hiệu cao quý nhất. Quán quân cờ tướng cấp Quốc gia. | Không thể tự mở khóa. Nhận được khi vô địch giải đấu cờ tướng cấp Quốc gia. |
| Quốc gia | Á Quân | Á quân cờ tướng cấp Quốc gia. | Không thể tự mở khóa. Nhận được khi đạt Á quân giải đấu cờ tướng cấp Quốc gia. |
| Quốc gia | Hạng Ba | Hạng Ba cờ tướng cấp Quốc gia. | Không thể tự mở khóa. Nhận được khi đạt Hạng Ba giải đấu cờ tướng cấp Quốc gia. |
| Tỉnh | Quán Quân | Quán quân cờ tướng cấp Tỉnh. | Không thể tự mở khóa. Nhận được khi vô địch giải đấu cờ tướng cấp Tỉnh. |
| Tỉnh | Á Quân | Á quân cờ tướng cấp Tỉnh. | Không thể tự mở khóa. Nhận được khi đạt Á quân giải đấu cờ tướng cấp Tỉnh. |
| Tỉnh | Hạng Ba | Hạng Ba cờ tướng cấp Tỉnh. | Không thể tự mở khóa. Nhận được khi đạt Hạng Ba giải đấu cờ tướng cấp Tỉnh. |
| Xã | Quán Quân | Quán quân cờ tướng cấp Xã. | Không thể tự mở khóa. Nhận được khi vô địch giải đấu cờ tướng cấp Xã. |
| Xã | Á Quân | Á quân cờ tướng cấp Xã. | Không thể tự mở khóa. Nhận được khi đạt Á quân giải đấu cờ tướng cấp Xã. |
| Xã | Hạng Ba | Hạng Ba cờ tướng cấp Xã. | Không thể tự mở khóa. Nhận được khi đạt Hạng Ba giải đấu cờ tướng cấp Xã. |

## 2. Danh Hiệu Phong Tặng

Dùng khung tím tương ứng cấp 1–5. Cấp 1 cao nhất, cấp 5 thấp nhất. Hiển thị đúng 5 hàng × 3 cột, theo thứ tự sau:

Hiển thị đủ 15 thẻ Phong Tặng trong tab để chọn và xem thông tin. Người chơi có thể chọn tối đa 3 thẻ của nhóm này để hiển thị trên hồ sơ. Lựa chọn ở giao diện hiện được lưu cục bộ; project chưa có dữ liệu phong tặng thật.

| Cấp | Danh hiệu | Chú thích | Cách nhận |
| --- | --- | --- | --- |
| 1 | Kỳ Đạo | Danh hiệu tôn vinh người có phẩm chất và uy tín nổi bật trong kỳ đàn. Chỉ xuất hiện khi có đủ 20 người chơi phong tặng. | Nhận được khi có 20 người chơi khác phong tặng danh hiệu này. |
| 1 | Huyền Thoại | Danh hiệu tôn vinh kỳ thủ để lại dấu ấn đặc biệt trong kỳ đàn. Chỉ xuất hiện khi có đủ 20 người chơi phong tặng. | Nhận được khi có 20 người chơi khác phong tặng danh hiệu này. |
| 1 | Tôn Sư | Danh hiệu dành cho người được kính trọng về kỳ nghệ và kinh nghiệm. Chỉ xuất hiện khi có đủ 20 người chơi phong tặng. | Nhận được khi có 20 người chơi khác phong tặng danh hiệu này. |
| 2 | Danh Sư | Dành cho người có kinh nghiệm, thường xuyên chỉ dẫn và chia sẻ kỳ nghệ. | Nhận được khi có người khác phong tặng. |
| 2 | Cao Nhân | Dành cho kỳ thủ có kỳ nghệ cao, được những người chơi khác nể trọng. | Nhận được khi có người khác phong tặng. |
| 2 | Bậc Thầy | Ghi nhận người có kiến thức và kinh nghiệm sâu rộng về cờ tướng. | Nhận được khi có người khác phong tặng. |
| 3 | Kỳ Phùng | Dành cho kỳ thủ được xem là một đối thủ xứng tầm và đáng gặp lại. | Nhận được khi có người khác phong tặng. |
| 3 | Đối Thủ | Dành cho người chơi được đối phương đánh giá cao sau những ván cờ. | Nhận được khi có người khác phong tặng. |
| 3 | Quân Tử | Dành cho người chơi có tinh thần fair-play và cách ứng xử đẹp trên kỳ đàn. | Nhận được khi có người khác phong tặng. |
| 4 | Nghĩa Hiệp | Dành cho người thường xuyên giúp đỡ và hỗ trợ những kỳ hữu khác. | Nhận được khi có người khác phong tặng. |
| 4 | Truyền Lửa | Dành cho người truyền cảm hứng và khuyến khích người khác gắn bó với cờ tướng. | Nhận được khi có người khác phong tặng. |
| 4 | Hảo Hán | Dành cho người chơi hào sảng, thân thiện và được kỳ hữu quý mến. | Nhận được khi có người khác phong tặng. |
| 5 | Kỳ Hữu | Dành cho người chơi thân thiện, thường xuyên giao lưu cùng những kỳ hữu khác. | Nhận được khi có người khác phong tặng. |
| 5 | Đồng Hành | Dành cho người thường xuyên sát cánh, giao lưu và chơi cờ cùng kỳ hữu. | Nhận được khi có người khác phong tặng. |
| 5 | Tri Kỷ | Dành cho người tạo được sự gắn bó và tình bằng hữu đặc biệt trên kỳ đàn. | Nhận được khi có người khác phong tặng. |

Ghi chú cộng đồng:

- Mốc ghi nhận theo cấp: cấp 1 cần 20 lượt phong tặng; cấp 2 cần 15; cấp 3 cần 10; cấp 4 cần 5; cấp 5 cần 3.
- Với ba danh hiệu cấp 1, dòng trong chú thích về việc xuất hiện sau 20 lượt phong tặng là điều kiện hiển thị đã yêu cầu.
- 12 thẻ cấp 2–5 có icon con mắt và số ở phía trên. Hiện số hiển thị là `1` theo yêu cầu mẫu; đó chưa phải số lượt xem thật.
- Số mắt là lượt xem, không thay thế số người phong tặng.

## 3. Chuỗi Chiến Thắng

Khung màu vàng. Danh sách ưu tiên từ cao xuống thấp. Bất Bại dùng khung cấp 2; bốn danh hiệu còn lại dùng khung cấp 1.

| Ưu tiên | Danh hiệu | Chú thích | Cách nhận |
| --- | --- | --- | --- |
| 1 | Bất Bại | Danh hiệu cao nhất của Chuỗi Chiến Thắng, ghi nhận một chuỗi trận bất bại đầy ấn tượng. | Thắng **20 ván liên tiếp**. |
| 2 | Thống Trị | Danh hiệu dành cho kỳ thủ duy trì chuỗi chiến thắng vượt trội. | Thắng **15 ván liên tiếp**. |
| 3 | Liên Thắng | Ghi nhận kỳ thủ tạo được chuỗi chiến thắng đáng chú ý. | Thắng **10 ván liên tiếp**. |
| 4 | Đà Thắng | Ghi nhận kỳ thủ đang duy trì phong độ chiến thắng ổn định. | Thắng **5 ván liên tiếp**. |
| 5 | Khởi Thắng | Ghi nhận bước khởi đầu của một chuỗi chiến thắng. | Thắng **3 ván liên tiếp**. |

## 4. Tổng Ván Chơi

Khung màu xanh lam. Chỉ tính ván cờ đã hoàn thành; không tính vào bàn rồi thoát. Lão Làng Kỳ Đàn dùng khung cấp 1 và được xếp trước; bốn danh hiệu còn lại dùng khung cấp 2.

| Ưu tiên | Danh hiệu | Chú thích | Cách nhận |
| --- | --- | --- | --- |
| 1 | Lão Làng Kỳ Đàn | Danh hiệu cao nhất dành cho kỳ thủ đã trải qua vô số ván đấu trên kỳ đàn. | Hoàn thành **10.000 ván cờ**. |
| 2 | Kỳ Thủ Lâu Năm | Ghi nhận kỳ thủ có thời gian thi đấu lâu dài và giàu kinh nghiệm. | Hoàn thành **3.000 ván cờ**. |
| 3 | Lão Luyện | Ghi nhận kỳ thủ đã tích lũy nhiều kinh nghiệm qua những ván đấu. | Hoàn thành **1.000 ván cờ**. |
| 4 | Dày Dạn | Ghi nhận kỳ thủ đã trải qua nhiều trận đấu và tích lũy kinh nghiệm. | Hoàn thành **500 ván cờ**. |
| 5 | Khởi Đầu | Dấu mốc đầu tiên trên hành trình tích lũy kinh nghiệm tại kỳ đàn. | Hoàn thành **100 ván cờ**. |

## 5. Online Chuyên Cần

Khung màu xanh lá. Tính số ngày có hoạt động, không tính số giờ treo trực tuyến. Thường Trực dùng khung cấp 1 trang trí và có kích thước theo khung Lão Làng Kỳ Đàn; bốn danh hiệu còn lại dùng khung cấp 2.

| Ưu tiên | Danh hiệu | Chú thích | Cách nhận |
| --- | --- | --- | --- |
| 1 | Thường Trực | Danh hiệu cao nhất ghi nhận sự gắn bó lâu dài và thường xuyên với kỳ đàn. | Có hoạt động trong **365 ngày**. |
| 2 | Bền Bỉ | Ghi nhận kỳ thủ duy trì sự hiện diện và gắn bó trong thời gian dài. | Có hoạt động trong **180 ngày**. |
| 3 | Chuyên Cần | Ghi nhận sự chăm chỉ và thường xuyên hoạt động trên kỳ đàn. | Có hoạt động trong **100 ngày**. |
| 4 | Siêng Năng | Ghi nhận kỳ thủ thường xuyên quay lại và tham gia hoạt động. | Có hoạt động trong **30 ngày**. |
| 5 | Tích Cực | Dấu mốc dành cho kỳ thủ bắt đầu duy trì hoạt động đều đặn. | Có hoạt động trong **7 ngày**. |

## Ghi chú dữ liệu

Các điều kiện trong tài liệu là nội dung và quy tắc đã thống nhất cho giao diện. Bộ đếm mắt hiện là số mẫu `1`; số lượt phong tặng, ván hoàn thành và ngày hoạt động cần nguồn dữ liệu thật trước khi có thể hiển thị như thống kê thực tế.
