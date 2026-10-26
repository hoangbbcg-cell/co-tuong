# Quy tắc hệ thống danh hiệu

- 2026-10-26: Theo user, nút Ẩn Danh hiệu MOBILE cách phải thêm8px: right15→23px. Build/typecheck PASS; dist xác nhận23px; chưa browser QA.

- 2026-10-26: Theo user, nút Ẩn Danh hiệu MOBILE cách phải thêm5px: right10→15px. Giữ phần khác. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, toggle Ẩn catalog Danh hiệu MOBILE chuyển từ giữa sang phải10px thật, bỏ left50%/translateX. Giữ cao/bật tắt/desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, thu nhẹ chữ Chưa có danh hiệu catalog: mobile24→22px, desktop3xl→2xl. Giữ font/màu/căn giữa. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, tăng chữ Chưa có danh hiệu trong catalog Danh hiệu text-xl→text-3xl desktop, mobile24px thật để không co nhỏ theo dialog. Giữ font/màu/căn giữa và empty preview Thông tin. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, biển chữ Danh hiệu thu ngang6px thực (calc trừ6px), nâng4px bằng translateY; giữ chiều cao/khung lớn/tab/X. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, toggle Ẩn Danh hiệu MOBILE căn giữa ngang và giữa đáybiển→đầu tab bằng calc theo86token/offset-30token/slot50px/h18px. Header slot40→50 để đủ vùng toggle không chồng tab; biển tăng nhẹ rộng0.9→0.94/cao0.98→1.02×86token. Giữ khung ngoài/X/nội dung. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, bỏ background phong cảnh Danh hiệu vừa thêm (giữ nền nâu), MOBILE đẩy tab/lưới lên12px qua header slot52→40; nội dung grid top1→0 nâng thêm. Biển chữ Danh hiệu chỉ tăng cao0.9→0.98×86token, ngang giữ0.9 như trước; khung lớn/X giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, thu biển chữ Danh hiệu10% giữ tâm/top, thêm profileScene cùng Thông tin phía trên trong viền trong. Ảnh cao238token/mobile302token, mask đen65%→transparent100% hòa xuống nền nâu, clip rounded trong khung. Giữ kích thước/vị trí khung lớn và close/lưới. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, biển Danh hiệu đồng bộ kích thước CHÍNH ảnh Thông tin: h86token/w86×2074/358, căn giữa thay width100%header phụ thuộc container. Mobile nâng thêm12token đúng translate của header Thông tin (top tổng-30token). Close wrapper inset5token bằng border ngoài Profile để cùng containing block và offset top/right; giữ cỡ closeScale. Dùng artwork Danh hiệu mới có chữ từ edit ảnh Thông tin, không tạo ảnh khác. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User báo Danh hiệu vẫn lệch Thông tin. Sửa MOBILE bỏ dialog fullscreen/grid riêng: dùng đúng native dialog width/height=dialogWidth/Height×scale như Thông tin, wrapper absolute0/0 widthheight chính xác và translateY-6px. Bỏ phụ thuộc !w CSSvar; đưa X ra khỏi grid nội dung, neo root khung với closeScale/top/right giống Profile. Desktop giữ viewport wrapper. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User đính chính phần cần bằng Thông tin là DANH HIỆU, không Tin nhắn. Hoàn tác riêng useProfileLayout/matchingLayout/translate-6/close custom của MessagesDialog, giữ các sửa concurrent khác. Danh hiệu MOBILE giữ width/height từ chính layout Thông tin và translate-6, sửa closeScale/top24/right28 theo rankingCloseLayout giống chính Profile (trước dùng dialogScale khác). Giữ icon Mở danh hiệu đã tăng28/24. Build/typecheck PASS; dist cập nhật; chưa browser QA. Hủy ghi chú lượt trước áp dụng kích thước Tin nhắn.

- 2026-10-25: Theo user, Tin nhắn MOBILE dùng useProfileLayout cùng Thông tin (width740/height responsive/scale), dialog dịch lên6px cùng mốc. Giữ searchLayout khi nhập chống co; desktop Tin nhắn giữ hiện trạng2cột. Ẩn close mặc định surface, gắn DialogCloseButton scale từ incoming ranking giống Profile với top24/right28scaled; options close vẫn dismissOptions. Icon bút Mở danh hiệu trong Profile tăng nút24→28/icon20→24theo token. Build/typecheck PASS; dist cập nhật; chưa browser/keyboard QA.

- 2026-10-25: User yêu cầu tạo lại biển Danh hiệu giống CHÍNH ảnh Thông tin. imagegen edit info-title-friends-frame chỉ đổi chữ Danh hiệu, giữ vàng/đỏ/mây/tua/alpha; gốc references/uploads/honors-title-info-source.png, crop alpha>32 thành2145×374 runtime profile/honors/honors-title-info-frame.png. HonorsDialogShell dùng ảnh có chữ thay title-frame+HTML, giữ geometry/khung ngoài. Đã xem ảnh gốc/crop; build/typecheck PASS; dist có asset; chưa browser QA.

- 2026-10-25: Theo user, khung ngoài catalog Danh hiệu theo mẫu Thông tin: HonorsDialogShell dùng nền nâu/viền kép vàng/họa tiết4góc cùng giá trị, biển đỏ mây/tua từ artwork title-frame sẵn có và chữ Danh hiệu vàng nghiêng HTML. Dùng DialogCloseButton chung và token getCrispUiLayout; gỡ khung/title mobile cũ, desktop chỉ giữ crop sidebar artwork (không vẽ lại nội dung). Grid/catalog/ownership/chọn tối đa3/chi tiết giữ nguyên; mobile header slot52px chừa biển mới. User mở riêng artwork khung/biển thay quy tắc21/10 giữ khung mobile cũ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, khối nội dung Thông tin user chứa bảng tên/Elo nâng stacking z10→z30, trên header/họa tiết z20; giữ vị trí/kích thước avatar, bảng và chữ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Sửa khả năng phục hồi ảnh Danh hiệu khi tải lỗi tạm thời: CrispUiImage có retryOnError opt-in, thử lại tối đa2lần sau500/1000ms bằng query mới để tránh cache response lỗi; ẩn biểu tượng ảnh hỏng trong lúc lỗi, dọn timer khi unmount/đổi src. Bật cho artwork danh hiệu trong ProfileDialog gồm preview/catalog/chi tiết và sprite, không đổi geometry/dữ liệu sở hữu. Chưa tái hiện lỗi mạng trên điện thoại nên chưa xác nhận nguyên nhân mạng gốc. Build/typecheck PASS; dist index-j1ysUa14.js có ui-image-retry; chưa browser QA.

- 2026-10-21: Mobile bắt buộc giữ bộ artwork Danh hiệu gốc (khung vàng, biển đỏ, nút đóng, tab kèm hình). Không thay bằng khung/chữ HTML trơn. Crop và provenance tại src/assets/profile/honors/mobile-artwork.md; tab ảnh giữ ngang/cuộn, danh sách2cột mobile theo cập nhật mới nhất.

- 2026-10-21: Catalog mobile dùng thanh nhóm nằm ngang phía trên có overflow-x-auto/touch-pan-x; danh sách2cột mobile, desktop3cột. Sidebar và bố cục desktop giữ nguyên.

- 2026-10-21: Sở hữu DB là chuẩn khi chọn/hiển thị danh hiệu của tài khoản, kể cả Phong Tặng được admin cấp khi endorsementCount=0. Không lọc lại selected ownership bằng ngưỡng phong tặng phía client. Giữ kiểm tra ownership và tối đa3danhhiệu/nhóm tại server. Catalog mobile cùng kích thước/vị trí khung Thông tin; chữ căn giữa theo tỷ lệ, bộ đếm không đè tên, chi tiết căn giữa trong panel. Desktop giữ bố cục cũ.

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

- Popup **Phong danh hiệu** mở khi bấm chuột phải trực tiếp vào avatar người chơi trong bàn; chuột trái trên avatar tiếp tục mở hồ sơ. Dùng danh sách đủ15 danh hiệu theo thứ tự khung cấp1→5. Ba danh hiệu cấp1 đứng đầu và có ánh sáng vàng. Khung hiển thị8 dòng, các mục còn lại cuộn dọc. Mỗi người chỉ phong một lần cho mỗi danh hiệu của một người nhận. Bấm hàng đã phong để bỏ phong: hàng đang phong mờ50% nhưng vẫn bấm được, bỏ phong thì sáng lại. Trạng thái lưu localStorage qua tải lại/rời phòng; chưa đồng bộ tài khoản hoặc backend. Thông báo dùng thẻ nâu viền vàng thường (grant-row.png từ `src/assets/references/uploads/awarded-honor-row-source.png`), chữ kem; giữ hiệu ứng giống kết bạn: “Đã phong danh hiệu” / “Bạn đã bỏ phong danh hiệu”, hiện500ms rồi bay lên80px và mờ dần trong320ms. Bảng giữ mở sau thao tác.

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

- Hồ sơ người khác2026-10-06: vùng danh hiệu mặc định được thay bằng6 nút3×2 (Xem thông tin, So tài, Thêm bạn/Xóa bạn; Nhắn tin, Theo dõi, Tặng quà). Theo mẫu b99a1e64 ngày2026-10-06, dùng bộ7 ảnh khung/icon tại src/assets/profile/actions; khung hiển thị1471:680 với border-image chia9 vùng (slice200px/width13.596cqw) giữ góc nguồn1471×606, giữ tỷ lệ icon, chữ Cormorant đậm11cqw (tracking-0.025em), icon rộng31.6% vùng nội dung với lề trái9%/phải3%, gap1.5%. Căn tâm2 hàng, lề ngang12px/trên32px/dưới40px và gap ngang12px/dọc20px responsive; không thêm nền/viền/bóng hoặc hover. Nguồn/crop xem assets/profile/actions/source.md. Xem thông tin mở lại preview danh hiệu; Quay lại trở về nhóm nút. Hồ sơ chính mình tiếp tục hiển thị danh hiệu mặc định.
- Hồ sơ người khác dùng cùng ô thông tin đầy đủ/cùng chiều cao như hồ sơ của mình: tên, Elo2 chế độ, Bạn bè/Theo dõi/Lượt thích, địa chỉ, ID và nút sao chép; vùng danh hiệu mặc định thay bằng6 nút. Chỉ hồ sơ của mình được chỉnh địa chỉ/avatar. ID người khác lấy từ prop playerId; chưa có dữ liệu thì hiển thị — và tắt sao chép, không dùng ID của mình hoặc tự tạo ID giả cho người khác.

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

- 2026-10-08, đồng bộ bộ đếm ngoài hồ sơ: các danh hiệu Phong Tặng cấp2–5 dùng chung AwardedHonorCount (con mắt và số font-number) cho catalog và badge ngoài hồ sơ; cấp1 giữ điều kiện hiển thị như catalog hiện hành. Bộ đếm là lượt phong tặng đang hoạt động của đúng người nhận/đúng mã danh hiệu, bắt đầu0 thay số mẫu1. Phong +1, bỏ phong -1; đọc cùng nguồn localStorage qua useHonorGrants và đồng bộ giữa các component trong cùng trang/các tab. Không cộng nhầm giữa người nhận hoặc danh hiệu khác. Chưa có tổng lượt cộng đồng từ backend; một hồ sơ trình duyệt chỉ đóng góp0 hoặc1 cho từng danh hiệu/người nhận.
- 2026-10-08: Icon con mắt trong AwardedHonorCount dùng1.35em, ô bộ đếm bo góc0.45em (giảm từ rounded-full), theo lần chỉnh mới2026-10-08; đồng bộ trong catalog và ngoài hồ sơ, giữ font/cỡ số và vị trí bộ đếm.

- 2026-10-21: Trong catalog Danh Hiệu Phong Tặng, thu toàn bộ huy hiệu con mắt/số còn90% và dịch xuống5px. Chỉ áp dụng catalog, giữ badge trong xem trước hồ sơ.

- 2026-10-08, quyền phong danh hiệu trong bàn: người đang ngồi chỉ mở bảng ở avatar đối thủ, không tự mở/phong cho chính mình. Người xem mở được avatar cả hai người đang đấu. Dùng vai trò/phe trong phòng thay vì vị trí trái/phải hay lượt đang đi; ghế trống không mở bảng. Kiểm tra quyền ở điểm mở và thao tác phong/bỏ phong; avatar không có quyền không hiện gợi ý phong danh hiệu.

- 2026-10-08: Bỏ thao tác chuột phải/phóng to và gợi ý hover trên huy hiệu danh hiệu. Chặn lan sự kiện lên avatar; chỉ chuột phải trực tiếp avatar mở Phong danh hiệu theo quyền đã chốt.

- 2026-10-08, ownership/database rule: new players start with no bestowed titles (all15 grant counts0). Levels2–5 (the twelve titles with an eye) are owned from the first active grant; each additional distinct granting player adds1 to that title's eye count. The three level1 titles unlock individually only at20 distinct active grants each and never display an eye. Never seed bestowed ownership or counts for a new database user. Ownership, Sở hữu, All/owned list and profile visibility must use the same threshold; stored display selections cannot unlock an unearned title. Keep all15 titles in the dedicated catalog/grant menu, but unearned titles cannot be selected for the profile. With a database, count active unique (grantor user ID, recipient user ID, title ID) records, use stable IDs rather than names, forbid self-grants and duplicate active grants, and update grant/revoke plus count atomically on the server. Grant reversal removes that person's contribution; ownership follows the resulting active count. Current implementation has only the local browser profile's0/1 contribution; backend/community aggregation and20-user unlocking await database/authentication.

- 2026-10-15: Ông Hoàng có danh hiệu riêng Kỳ Thủ AI và họa tiết sao riêng từ ảnh205ea2ea; thay quy tắc bỏ toàn bộ danh hiệu/sao máy trước đó. AvatarRankBadge/RankTitleBadge thêm prop computer, tái dùng vị trí/tỷ lệ slot và hàng sao chung, chỉ PlayerCard máy bật. Asset PNG title1168×383 tại(34,154), stars853×199 tại(1270,242), trim alpha<=16 loại nhiễu vô hình, corners alpha0; nguồn giữ references/uploads. Giữ avatar/khung tên/khóa hồ sơ máy. Typecheck/build PASS, đã xem2 crop và xác nhận dist, chưa browser QA.
- 2026-10-16: Catalog Danh hiệu: Tất cả chỉ hiển thị danh hiệu thực sự sở hữu từ DB, người mới rỗng; các tab nhóm vẫn xem được catalog, danh hiệu chưa sở hữu hiện khóa thay dấu cộng và không chọn được. Ba nhóm Chuỗi/Tổng ván/Online theo ownership thật, chỉ mở khi server cấp. Không dùng danh hiệu mẫu để tự mở khóa.
- 2026-10-16: Khôi phục nút cộng trong catalog Danh Hiệu Phong Tặng; chưa sở hữu vẫn không được chọn vào hồ sơ (nút disabled theo ownership), không thay bằng icon khóa trong nhóm này. Ba nhóm cuối giữ khóa; Tất cả vẫn chỉ gồm danh hiệu sở hữu.
- 2026-10-16 (đính chính catalog): Tất cả/Vinh Quang Kỳ Đài/Danh Hiệu Phong Tặng chỉ hiện ownership DB thật, chưa sở hữu thì ẩn. Ba nhóm cuối vẫn hiện danh hiệu chưa đạt với artwork brightness35% và ổ khóa GIỮA thẻ, không khóa ở góc dấu cộng; danh hiệu sở hữu có nút cộng. Giữ xem chi tiết điều kiện khi bấm thẻ khóa.

- 2026-10-21: User yêu cầu sửa lệch bảng Danh hiệu mobile, nútẨn chỉ nằm cạnhX và nâng tab. HonorsFrame giữ kíchthước/vịtrí bằngThôngtin; căn biển ảnh về50%, rộng50% để chừa gócphải. Mobile chia grid48px header/rowtab ảnh cuộnngang/content minmax0 thay top12%/24% theo chiều cao. NútẨn compact riêng catalog26x15, neo cạnhX, không đẩy tiêuđề; X ôm sát ảnh28px. Giữartworkgốc/tab120px/catalog3cột/desktop/ownership. npm.cmd run build(typecheck+Vite) PASS, dist index-B-q8DOiP.js cậpnhật; chưa browserQA trựcquan, không chạytest ởtaskUI này.

- 2026-10-21: Theo user tinh chỉnh Danh hiệu mobile: nâng hàngtab thêm10px (header48→38), nútẨn nâng6px và to30x18/nhãn13px, biểnDanhhiệu rộng50→54% nâng4px; catalog đổi2cột (thay quy tắc3cột mobile trước), desktop vẫn3cột. Giữ artwork/tabảnh cuộn và khung bằngThôngtin. npm.cmd run build(typecheck+Vite) PASS, dist cậpnhật/xácnhận2cột/header38px. Chưa browserQA trựcquan.

- 2026-10-21: User chỉnh Danh hiệu mobile: nútX tăng28→32px, top-1px để tâm vòngX ngang tâmẨn(top6+9px); Ẩn cáchphải42px. Danh sách2cột chặn overflowx/touch-pan-y, thanhnhóm vẫncuộnngang. TabTấtcả bỏ ảnhbaked-selected, dựng bảnthường bằng đúng nền/icon/chữ của desktop. Mọi tab dùng honorsSelectionFrame/mix-blend-lighten cùngdesktop khi chọn, bỏdrop-shadow riêngmobile. Khôngđổi desktop/ownership. npm.cmd run build(typecheck+Vite) PASS, dist index-D-4IAtxZ.js xácnhận. Chưa browserQA trựcquan.

- 2026-10-21: User báo viềnsángtab khôngphủhết/chữPhongTặnglệch mobile. Overlaytab dùng116%x140%, left-8/top-20 theo tỷlệdesktop để bù alpha. PhongTặng dùng helperanchor chung theo tâmnềntímảnh1500x500, centerY cấp1..5=285/270/265/250/250 vàscaleY1.36, áp compact vào catalog/preview/detail; giữ tọađộdesktop, lineheightmobile1.1 để chữ giữa ô. Không đổi artwork/ownership/số cột. npm.cmd run build(typecheck+Vite) PASS, dist index-BJ45t_Wi.js xácnhận overlay/anchor. Chưa browserQA trựcquan.

- 2026-10-21: User yêu cầu căn giữa VinhQuangKỳĐài và danhhiệucấp1 của3tabcuối mobile. Thêm anchor dùngchung catalog/preview/detail: Arena tâmvùngđỏ từảnh2172x724 Y383/385.5/379.5 theo3cấp +scale1.16; progresscấp1 tâm theo crop (lienthang200/368, games195/360, attendance188/363), quyđổi offsetcqw theo artworkscale để bỏ lệch pixelcốđịnh khi co màn. Lineheightmobile1.1, chỉprogresscấp1 đổi; desktop/cấpthấp/artwork/ownership/cột giữnguyên. npm.cmd run build(typecheck+Vite) PASS, dist index-CxGZkxOW.js xácnhận anchor. Chưa browserQA trựcquan, không chạytest taskUI.

- 2026-10-21: User chỉ rõ chữ cấp1 của3tabcuối vẫn lệch riêngThôngtindanhhiệu mobile. HonorDetailSprite nhậnmobileTitle, đặt chữ trực tiếp trong cùng boxcrop/scale vớiảnh, top theo getProgressHonorNameplateCenter dùngchung; ẩn lớpchữngoài riêngcompact khi cấp1 để khôngđè2lớp. Catalog/preview/desktop/cấpthấp giữnguyên; không offset thêm trên panel. npm.cmd run build(typecheck+Vite) PASS, dist index-DZntP1Q5.js xácnhận mobileTitle. Chưa browserQA trựcquan.

- 2026-10-21: User chuyển sang danhhiệu hiểnthịtrựctiếp trongThôngtinuser mobile, yêu cầu cănchữ. ProfileHonorPreviewBadge cho3nhánh dùngcanvas3:1 cục bộ căn giữa hàng đểảnh/chữ dùngchunghệ tọađộ, không căn theo chiều cao gridrow co giãn. Progresspreview dùng mobileTitle trongboxcrop cho mọicấp, ẩn lớpchữngoài compact; Arena dùnganchor vùngđỏ, PhongTặng labelcompacth-auto căn giữa vùngtím. Desktop/catalog/chi tiết/ownership/khungavatar giữnguyên. npm.cmd run build(typecheck+Vite) PASS, dist index-B2wQ1XUV.js xácnhận canvas. Chưa browserQA trựcquan.

- 2026-10-21: User báo popupThôngtindanhhiệu khi bấm danhhiệuởThôngtinuser bịlệch mobile. Nhánh standalone HonorDetailPopover override compact left/top50%, width min(82vw,54dvh), transformtranslate(-50%,-50%) important để không dùnganchorX/side vàwidthphầnmép desktop. Neo giữviewportdialog, đồngbộmọidanhhiệu/ô; desktop/catalog/selection/đóngpopupgiữnguyên. npm.cmd run build(typecheck+Vite) PASS, dist index-jN4DHDKI.js xácnhận CSS centering!important. Chưa browserQA trựcquan.

- 2026-10-25: Theo user, catalog Danh hiệu trong Thông tin user chỉ hiển thị danh hiệu đã sở hữu ở TẤT CẢ tab/nhóm, ẩn mọi danh hiệu chưa có. HonorsFrame lọc ownedIds cả streak/games/attendance như all/arena/awarded. useDatabaseHonors xóa dữ liệu cũ khi đổi user để không hiện nhầm sở hữu tài khoản trước lúc chờ API. Quyền sở hữu/cấp theo criteria ở backend giữ hiện hành: giải đấu cấp riêng; phong tặng threshold; chuỗi/tổng ván khi chốt ván; attendance theo ngày hoạt động. Build/typecheck PASS; dist cập nhật; chưa browser/MySQL QA.

- 2026-10-25: User xác nhận ẩn toàn bộ danh hiệu chưa nhận, đủ điều kiện backend cấp mới xuất hiện. Đồng bộ cả Sở hữu và preview ngoài catalog: chỉ lấy databaseHonors.ownedIds, bỏ fallback local coi danh hiệu giải đấu/chưa cấp là sở hữu. Không xóa danh hiệu DB đã cấp/không sửa điều kiện; hook tiếp tục tải lại mỗi5giây khi mở hồ sơ. Build/typecheck PASS; dist cập nhật; chưa browser/MySQL QA.
