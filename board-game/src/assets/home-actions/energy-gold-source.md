Nguồn: ảnh người dùng `src/assets/references/uploads/3b5d198c-ea53-4f52-ac87-58ae457a8dc6.png` (2172×724).
Crop artwork: x=21, y=186, width=2130, height=311; bỏ vùng transparent và alpha nhiễu rất mờ ngoài khung. Giữ màu và chi tiết gốc; icon/số được đặt riêng trong Home.

2026-10-06: Theo yêu cầu nới riêng chiều ngang, cụm Home rộng420px thiết kế (compact320px), tăng từ390/300px. Chiều cao giữ theo tỷ lệ nguồn của bề rộng cũ390/300px, làm tròn CSS pixel theo layout.scale. Các lớp ảnh nền dùng cùng ô width/height; icon, chữ và nút cộng giữ kích thước cũ, vị trí ngang vẫn theo phần trăm trong khung.

2026-10-18: Nguồn mới references/uploads/e7544f25-2cc2-4bfb-8fcd-c3f3ff3dd520.png (2172x724). Imagegen background-extraction giữ artwork/tách caro. Crop từ kết quả: energy region260,0,1640,250; gold260,250,1640,230; lightning310,480,200,244; coin530,480,250,244; trim alpha<=16. Runtime energy-frame-v2 1605x227, gold-frame-v21604x217, energy-icon-v2169x218, gold-icon-v2222x219. Home hai khung49%/h-auto không stretch. Plus là button HTML gradient vàng/nâu và SVG dấu cộng, dữ liệu/callback thật.


- 2026-10-18: Theo yêu cầu tăng chiều cao khung tài nguyên Home: hai ảnh khung49% rộng giữ nguyên, cao44px thiết kế (compact36px) thay h-auto~29px; cho phép nới dọc artwork trong task. Icon năng lượng/vàng23→32px (compact28), nút cộng20→26px (compact23). Giữ anchor/số dư/callback. Typecheck/build PASS, dist xác nhận44/26; chưa browser QA.


- 2026-10-18: Theo yêu cầu lấy ô vàng bên phải làm chuẩn, Home hai ô dùng cùng goldFrame; căn số chính giữa từng khung49% tại24.5%/75.5% cụm. Icon trái3%/phải54%, cộng trái41%/phải92%: mọi cặp cách đúng51% bằng khoảng cách gốc2 khung, giữ vị trí tương đối ô phải; giữ size và callback/tooltip. Typecheck/build PASS, dist xác nhận tọa độ mới; chưa browser QA.


- 2026-10-18: Cải thiện rendering khung/icon năng lượng-vàng: ảnh nguồn frame1604x217/icon169x218,222x219 đủ cho kích thước nhỏ. Home dùng width/height/top/left nguyên pixel (sai số làm tròn<=0.5px), bỏ translate trên từng ảnh; giữ geometry danh nghĩa/asset/số/cộng. ResourceArtwork chung dùng -webkit-optimize-contrast riêng resource trên Home/compact/Shop, không áp dụng ảnh khác. Typecheck/build PASS, dist xác nhận sampling; mobile/shop2/2 regression PASS. Chưa browser QA độ nét thực tế, không khẳng định đã xác minh nguyên nhân bằng browser.


- 2026-10-18: Theo ảnh người dùng, dấu cộng tài nguyên chuyển vuông bo4px, nền vàng kem/đổ nổi nhẹ, plus nâu đậm nét bo; ResourceAddButton chung Home desktop/compact/Shop. Giữ slot/vị trí/callback/tooltip. Typecheck/build PASS, dist có surface mới; mobile/shop2/2 regression PASS; chưa browser QA.


- 2026-10-18: Thay khung năng lượng/vàng bằng ảnh2a1666ac-81f6-4519-ad6f-d39df43e1280 theo yêu cầu. Imagegen tách caro sang alpha thật, trim alpha<=16 bbox98,212,1978x278; runtime resource-frame-v3.png. Đồng bộ3 import Home/compact/Shop, giữ slot/icon/số/nút cộng/hành vi. Đã xem crop/góc alpha0; typecheck/build PASS và dist có asset mới. Chưa browser QA.


- 2026-10-18 XEM THỬ UI theo yêu cầu: khung tài nguyên dùng chính player/name-frame.png2137x469 (tỷ lệ4.56 gần ô205.8x44) để màu gỗ nâu/vàng đồng và viền dày khớp khung tên. Đồng bộ Home desktop/compact/Shop, chỉ đổi import nền; giữ slot/icon/số/cộng, không chỉnh asset hoặc PlayerNameplate. Đây là phương án thử, chưa chốt quy tắc lâu dài. Đã xem asset nguồn; typecheck/build PASS, dist cập nhật. Chưa browser QA.

