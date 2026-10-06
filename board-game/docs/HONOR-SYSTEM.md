# Quy tắc hệ thống danh hiệu

Tài liệu này là quy ước chuẩn cho tên nhóm, cấp khung, màu sắc, nội dung hiển thị và mã nội bộ của danh hiệu. Khung được chọn theo `group + frameLevel`; chữ trên khung là `titleText` độc lập, có thể thay đổi mà không cần tạo khung ảnh mới.

- Thanh cuộn trực quan ở catalog và danh sách chú thích/cách nhận trong popup danh hiệu được ẩn; vùng có nội dung dài vẫn cuộn dọc bằng overflow-y-auto.

## 1. Vinh Quang Kỳ Đài

- **Màu khung:** đỏ.
- **Ý nghĩa:** danh hiệu đạt được qua giải đấu.
- **Cấp khung:**
  - `Vinh Quang Kỳ Đài 1` — cao nhất, cấp Quốc gia.
  - `Vinh Quang Kỳ Đài 2` — cấp Tỉnh.
  - `Vinh Quang Kỳ Đài 3` — cấp Xã.
- **Chữ dùng chung cho cả ba cấp khung:** Quán Quân, Á Quân, Hạng Ba. Không có danh hiệu Top 4.
- Mỗi cấp khung có đủ ba chữ trên, tổng cộng chín biến thể. Khác biệt giữa các cấp chỉ nằm ở asset khung.
- Vị trí chữ trong phần **Thông tin danh hiệu** (2026-10-06): Vinh Quang Kỳ Đài 1 — Á Quân nâng1px; cấp2 — cả Quán Quân, Á Quân, Hạng Ba hạ2px; cấp3 — cả ba chữ nâng2px. Chỉ dịch lớp chữ trong popup thông tin; catalog và preview giữ vị trí cũ, asset khung và hình học badge không đổi.
- **Ví dụ:** khung cấp 1 + “Quán Quân” là Quán Quân cấp Quốc gia; khung cấp 2 + “Á Quân” là Á Quân cấp Tỉnh; khung cấp 3 + “Hạng Ba” là Hạng Ba cấp Xã.
- **Mã asset khung:** `vqkd_1`, `vqkd_2`, `vqkd_3`. **Mã từng danh hiệu:** `vqkd_{level}_{rank}`, ví dụ `vqkd_2_3` là Hạng Ba trên khung cấp 2.
- **Chi tiết và cách nhận:**

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

- Vị trí chữ trong phần **Thông tin danh hiệu** (2026-10-06): Phong Tặng dùng offset cộng dồn so với vị trí chữ gốc: cấp1 +3px; cấp2 -1px; cấp3 0px; cấp4/5 -5px. Lượt chỉnh mới dịch thêm cấp3 xuống1px từ trạng thái trước. Chỉ dịch lớp chữ trong popup thông tin; catalog và preview giữ vị trí cũ, khung/asset và hình học badge không đổi.

- **Màu khung:** tím.
- **Ý nghĩa:** danh hiệu do cộng đồng phong tặng.
- **Cấp khung:** cấp 1 cao nhất, cấp 5 thấp nhất; mỗi cấp có đúng ba danh hiệu.
- **Cách nhận:** cấp 1 nhận được khi có 20 người chơi khác phong tặng; cấp 2–5 nhận được khi có người chơi khác phong tặng.
- **Trạng thái cộng đồng:** chỉ thêm dòng `Đã được cộng đồng công nhận.` vào phần chú thích khi số người phong tặng đạt ngưỡng của cấp đó. Không dùng số lượt xem thay cho số lượt phong tặng.

| Cấp khung | Mã nội bộ | Tên hiển thị | Chú thích | Cách nhận |
| --- | --- | --- | --- | --- |
| 1 | `pt_1_ky-dao` | Kỳ Đạo | Danh hiệu tôn vinh người có phẩm chất và uy tín nổi bật trong kỳ đàn. Chỉ xuất hiện khi có đủ 20 người chơi khác phong tặng. | Nhận được khi có 20 người chơi khác phong tặng danh hiệu này. |
| 1 | `pt_1_huyen-thoai` | Huyền Thoại | Danh hiệu tôn vinh kỳ thủ để lại dấu ấn đặc biệt trong kỳ đàn. Chỉ xuất hiện khi có đủ 20 người chơi khác phong tặng. | Nhận được khi có 20 người chơi khác phong tặng danh hiệu này. |
| 1 | `pt_1_ton-su` | Tôn Sư | Danh hiệu dành cho người được kính trọng về kỳ nghệ và kinh nghiệm. Chỉ xuất hiện khi có đủ 20 người chơi khác phong tặng. | Nhận được khi có 20 người chơi khác phong tặng danh hiệu này. |
| 2 | `pt_2_danh-su` | Danh Sư | Dành cho người có kinh nghiệm, thường xuyên chỉ dẫn và chia sẻ kỳ nghệ. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 2 | `pt_2_cao-nhan` | Cao Nhân | Dành cho kỳ thủ có kỳ nghệ cao, được những người chơi khác nể trọng. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 2 | `pt_2_bac-thay` | Bậc Thầy | Ghi nhận người có kiến thức và kinh nghiệm sâu rộng về cờ tướng. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 3 | `pt_3_ky-phung` | Kỳ Phùng | Dành cho kỳ thủ được xem là một đối thủ xứng tầm và đáng gặp lại. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 3 | `pt_3_doi-thu` | Đối Thủ | Dành cho người chơi được đối phương đánh giá cao sau những ván cờ. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 3 | `pt_3_quan-tu` | Quân Tử | Dành cho người chơi có tinh thần fair-play và cách ứng xử đẹp trên kỳ đàn. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 4 | `pt_4_nghia-hiep` | Nghĩa Hiệp | Dành cho người thường xuyên giúp đỡ và hỗ trợ những kỳ hữu khác. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 4 | `pt_4_truyen-lua` | Truyền Lửa | Dành cho người truyền cảm hứng và khuyến khích người khác gắn bó với cờ tướng. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 4 | `pt_4_hao-han` | Hảo Hán | Dành cho người chơi hào sảng, thân thiện và được kỳ hữu quý mến. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 5 | `pt_5_ky-huu` | Kỳ Hữu | Dành cho người chơi thân thiện, thường xuyên giao lưu cùng những kỳ hữu khác. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 5 | `pt_5_dong-hanh` | Đồng Hành | Dành cho người thường xuyên sát cánh, giao lưu và chơi cờ cùng kỳ hữu. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |
| 5 | `pt_5_tri-ky` | Tri Kỷ | Dành cho người tạo được sự gắn bó và tình bằng hữu đặc biệt trên kỳ đàn. | Nhận được khi có người chơi khác phong tặng danh hiệu này. |

## 3. Chuỗi Chiến Thắng

- **Màu khung:** vàng.
- **Ý nghĩa:** số trận thắng liên tiếp.
- **Thứ tự ưu tiên hiển thị:** Bất Bại → Thống Trị → Liên Thắng → Đà Thắng → Khởi Thắng.
- **Khung:** Bất Bại dùng khung cấp 2; các danh hiệu còn lại dùng khung cấp 1.
- **Nội dung và cách nhận:**

| Danh hiệu | Chú thích | Cách nhận |
| --- | --- | --- |
| Bất Bại | Danh hiệu cao nhất của Chuỗi Chiến Thắng, ghi nhận một chuỗi trận bất bại đầy ấn tượng. | Thắng 20 ván liên tiếp. |
| Thống Trị | Danh hiệu dành cho kỳ thủ duy trì chuỗi chiến thắng vượt trội. | Thắng 15 ván liên tiếp. |
| Liên Thắng | Ghi nhận kỳ thủ tạo được chuỗi chiến thắng đáng chú ý. | Thắng 10 ván liên tiếp. |
| Đà Thắng | Ghi nhận kỳ thủ đang duy trì phong độ chiến thắng ổn định. | Thắng 5 ván liên tiếp. |
| Khởi Thắng | Ghi nhận bước khởi đầu của một chuỗi chiến thắng. | Thắng 3 ván liên tiếp. |
- **Mã nội bộ:** `cct_1` đến `cct_5`.

## 4. Tổng Ván Chơi

- **Màu khung:** xanh lam.
- **Ý nghĩa:** số trận đã chơi, thể hiện kinh nghiệm và thời gian gắn bó.
- **Cách tính:** chỉ tính ván cờ đã hoàn thành; không tính trường hợp vào bàn rồi thoát.
- **Thứ tự ưu tiên hiển thị:** Lão Làng Kỳ Đàn → Kỳ Thủ Lâu Năm → Lão Luyện → Dày Dặn → Khởi Đầu.
- **Nội dung và cách nhận:**

| Danh hiệu | Chú thích | Cách nhận |
| --- | --- | --- |
| Lão Làng Kỳ Đàn | Danh hiệu cao nhất dành cho kỳ thủ đã trải qua vô số ván đấu trên kỳ đàn. | Hoàn thành 10.000 ván cờ. |
| Kỳ Thủ Lâu Năm | Ghi nhận kỳ thủ có thời gian thi đấu lâu dài và giàu kinh nghiệm. | Hoàn thành 3.000 ván cờ. |
| Lão Luyện | Ghi nhận kỳ thủ đã tích lũy nhiều kinh nghiệm qua những ván đấu. | Hoàn thành 1.000 ván cờ. |
| Dày Dặn | Ghi nhận kỳ thủ đã trải qua nhiều trận đấu và tích lũy kinh nghiệm. | Hoàn thành 500 ván cờ. |
| Khởi Đầu | Dấu mốc đầu tiên trên hành trình tích lũy kinh nghiệm tại kỳ đàn. | Hoàn thành 100 ván cờ. |
- **Mã nội bộ:** `tvc_1` đến `tvc_5`.

## 5. Online Chuyên Cần

- **Màu khung:** xanh lục.
- **Ý nghĩa:** mức độ hoạt động và chuyên cần.
- **Cách tính:** số ngày có hoạt động, không tính thời gian treo trực tuyến.
- **Khung và nội dung hiện dùng:**
  - `Online Chuyên Cần 1` — Thường Trực, dùng khung trang trí phía dưới của sprite.
  - `Online Chuyên Cần 2` — Tích Cực, Siêng Năng, Chuyên Cần và Bền Bỉ, dùng khung đơn giản phía trên của sprite.
- **Thứ tự ưu tiên hiển thị:** Thường Trực → Bền Bỉ → Chuyên Cần → Siêng Năng → Tích Cực.
- **Nội dung và cách nhận:**

| Danh hiệu | Chú thích | Cách nhận |
| --- | --- | --- |
| Thường Trực | Danh hiệu cao nhất ghi nhận sự gắn bó lâu dài và thường xuyên với kỳ đàn. | Có hoạt động trong 365 ngày. |
| Bền Bỉ | Ghi nhận kỳ thủ duy trì sự hiện diện và gắn bó trong thời gian dài. | Có hoạt động trong 180 ngày. |
| Chuyên Cần | Ghi nhận sự chăm chỉ và thường xuyên hoạt động trên kỳ đàn. | Có hoạt động trong 100 ngày. |
| Siêng Năng | Ghi nhận kỳ thủ thường xuyên quay lại và tham gia hoạt động. | Có hoạt động trong 30 ngày. |
| Tích Cực | Dấu mốc dành cho kỳ thủ bắt đầu duy trì hoạt động đều đặn. | Có hoạt động trong 7 ngày. |
- **Mã từng danh hiệu:** `occ_2_ben-bi`, `occ_2_chuyen-can`, `occ_2_sieng-nang`, `occ_2_tich-cuc`, `occ_1_thuong-truc`.
- **Asset khung:** `src/assets/awarded-honors/bbceb019-6ed9-498e-aac8-30b90167f7b8.png`; khung cấp 2 nằm phía trên, khung cấp 1 nằm phía dưới. UI crop phần hình thật (cấp 2: `(22,124,1631,261)`, cấp 1: `(4,436,1663,363)`) vào slot 3:1. Cấp 2 dùng bề rộng hình 86%; cấp 1 dùng bề rộng 96% và scale dọc `1.3`, cùng kích thước hiển thị với khung Lão Làng Kỳ Đàn. Chữ căn giữa và dùng màu chữ của Chuỗi Chiến Thắng.

## Quy tắc quản lý và hiển thị

- Hồ sơ người khác2026-10-06: vùng danh hiệu mặc định được thay bằng6 nút3×2 (Xem thông tin, So tài, Thêm bạn/Xóa bạn; Nhắn tin, Theo dõi, Tặng quà). Theo mẫu b99a1e64 ngày2026-10-06, dùng bộ7 ảnh khung/icon tại src/assets/profile/actions; giữ tỷ lệ khung1471:606 và icon, chữ Cormorant đậm10.7cqw (tracking-0.025em), icon rộng32% vùng nội dung với lề trái9%/phải3%, gap1%. Căn tâm2 hàng, lề ngang12px/trên32px/dưới40px và gap ngang12px/dọc20px responsive; không thêm nền/viền/bóng hoặc hover. Nguồn/crop xem assets/profile/actions/source.md. Xem thông tin mở lại preview danh hiệu; Quay lại trở về nhóm nút. Hồ sơ chính mình tiếp tục hiển thị danh hiệu mặc định.

- Phân trang danh hiệu trong hồ sơ2026-10-06: mỗi trang tối đa9 danh hiệu (3×3). Mặc định mở trang đầu; đứng ở khung đầu1,5 giây rồi chạy đều tuyến tính đến mép cuối khung cuối trong tổng cộng6 giây. Dừng ở cuối0,5 giây rồi nhảy ngay về đầu và lặp lại chu kỳ8 giây, không animate trượt ngược. Giữ thứ tự nhóm/cấp và kích thước badge. Dừng khi hồ sơ/khung bị ẩn, đang mở chi tiết hoặc rê chuột trong khung; trang nằm hoàn toàn ngoài khung không nhận thao tác/focus. Với reduced motion, đổi trang bằng bước nhảy thay cho chuyển động liên tục.
- Tên khung theo mẫu `[Tên nhóm] + [Số cấp]`, ví dụ `Vinh Quang Kỳ Đài 1` hoặc `Danh Hiệu Phong Tặng 5`.
- Dữ liệu hiển thị tách riêng nhóm/cấp khung và nội dung chữ. Ví dụ: `{ group: 'vinh-quang-ky-dai', frameLevel: 1, titleText: 'Quán Quân' }` chọn khung đỏ cấp 1 và hiển thị chữ “Quán Quân”.
- Thứ tự nhóm trong mục Tất cả: Vinh Quang Kỳ Đài → Danh Hiệu Phong Tặng → Chuỗi Chiến Thắng → Tổng Ván Chơi → Online Chuyên Cần.
- Trong Vinh Quang Kỳ Đài, xếp lần lượt ba cấp khung; mỗi cấp hiển thị đủ Quán Quân, Á Quân và Hạng Ba.
- Khung là asset dùng lại được; chữ là lớp văn bản thay thế được. Chuẩn bị 23 khung: 3 đỏ và 5 mỗi màu tím, vàng, xanh lam, xanh lục.
- Mọi khung danh hiệu dùng cùng ô hiển thị tỷ lệ 3:1, cùng kích thước và căn chữ giữa khung. Khung có dáng nguồn khác nhau vẫn cần được kiểm tra để phần hình nhìn đồng cỡ trong UI.
- Năm khung Phong Tặng hiện được cắt từ sprite `src/assets/awarded-honors/52405c8d-34f5-4789-a46c-20e1d0674b2e.png`, theo thứ tự trái sang phải là cấp 1–5. Ảnh đầu ra giữ PNG transparent 1500×500, không có chữ; vùng thân đặt chữ được căn cùng tâm canvas (750,250) và bề rộng 580px, giữ nguyên tỷ lệ/ornament. Mức 790px của bộ asset trước không thể dùng với khung cấp 1 mới mà vẫn giữ trọn ornament trong chiều cao 500px.
- Crop nguồn theo pixel `(x,y,w,h)`: cấp 1 `(11,252,422,204)`, cấp 2 `(445,269,420,182)`, cấp 3 `(876,279,412,166)`, cấp 4 `(1301,296,426,147)`, cấp 5 `(1741,321,416,98)`.
- UI dùng chung container 3:1, `object-fit: contain` và scale chung `1.36` cho cả năm; vùng thân hiển thị tương ứng khoảng 789px, gần chuẩn 790px.
- Scale render gợi ý: `phong-tang-1: scale(1.36)`, `phong-tang-2: scale(1.36)`, `phong-tang-3: scale(1.36)`, `phong-tang-4: scale(1.36)`, `phong-tang-5: scale(1.36)`. Giữ scale chung để vùng chữ và thân khung không lệch kích thước tương đối.
- Chữ Phong Tặng dùng `Cormorant Garamond` với glyph tiếng Việt, chuẩn hóa NFC, giữ trên lớp khung và có line-height đủ chỗ cho dấu.
- Mỗi danh hiệu Phong Tặng lưu `name` đầy đủ và có thể có `displayName` rút gọn. Khung chỉ hiển thị `displayName`; chi tiết/nhãn truy cập dùng `name`. Text một dòng nằm giữa vùng rộng 70%, tự co cỡ 30/27/24/21px theo độ dài và không dùng dấu ba chấm.

## Honor title text style
- All badge titles, including future groups, share HONOR_TITLE_FONT_CLASS and getHonorTitleFontSize in ProfileDialog.tsx for the font family, bold italic face, and responsive sizing.
- Color treatment may vary by frame group. Arena and awarded titles use HONOR_TITLE_GOLD_TEXT_STYLE: gold gradient #F7E397 to #EEB33C, 0.012em #9a4a10 stroke, and 0 1px 0 #5f1c00 shadow. Streak titles retain the dark brown #5b2605 fill with a 0 1px 0 #fff0a8 shadow.
- Keep titles centered over the shared 3:1 badge slot. Reuse the typography token while choosing the text color to suit each frame; do not change font per group.
- Match standard streak-frame artwork to the measured reference plaque size of about 230x42px (roughly 5.5:1 at the shown UI scale). Keep the shared 3:1 slot and original sprite crops; use 86% artwork width for level 1. Bất Bại level 2 uses 96% artwork width and 1.1x vertical scale to stay slightly taller and narrower.

## Total games honors
- Source sprite: `src/assets/awarded-honors/6fc3cfba-04f1-4337-8430-8377074835f5.png` (1774x887). The top/simple frame is Tổng Ván Chơi 2; the ornate bottom frame is Tổng Ván Chơi 1.
- Level 1 is `Lão Làng Kỳ Đàn`. Level 2 has `Kỳ Thủ Lâu Năm`, `Lão Luyện`, `Dày Dặn`, and `Khởi Đầu`. Show level 1 first in the all-honors list.
- Render titles with the shared honor font and Chuỗi Chiến Thắng color treatment (`#5b2605` with `#fff0a8` shadow), centered in the shared 3:1 badge slot. Fill the slot width with the frame art; center the final two cards in the second row.

Rendering2026-10-05: xem docs/UI-IMAGE-RENDERING.md. Crop scaleY và scale của khung chọn được chuyển sang kích thước/aspect-ratio tương đương; giữ vị trí, crop, nội dung và màu sắc.

- Rendering sprite 2026-10-05: imageHeight phải bằng chiều cao sprite nguồn / chiều cao crop × 100%, cùng hệ tọa độ với imageTop; khai báo width/height trực tiếp và objectFit:fill chỉ để giữ độ giãn đã được duyệt. Không để height:auto khi ô crop có aspect-ratio đã điều chỉnh. Áp dụng cả danh sách danh hiệu và HonorDetailSprite.

- 2026-10-05: Khoảng cách dọc trong catalog Danh hiệu của mọi tab lấy tab Tất cả làm chuẩn. gap-y phần trăm tính theo tổng chiều cao nội dung nên phải chuẩn hóa theo số hàng: gap = 3% × số hàng Tất cả / số hàng tab hiện tại. Giữ lưới ba cột và kích thước thẻ; không để nhóm ít danh hiệu có khoảng cách hàng nhỏ hơn.
