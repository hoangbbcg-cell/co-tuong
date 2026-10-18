# Background Cửa hàng

Nguồn người dùng 2026-10-18: 49740109-5a33-4729-890d-c965b532934c.png.
Runtime background.png sao chép nguyên file, không sửa pixel, không tạo bằng AI trong task này. Nguồn lưu tại ../references/uploads/49740109-5a33-4729-890d-c965b532934c.png.
Phủ viewport bằng object-cover; toàn bộ chữ, tab, sidebar, số dư và sản phẩm là UI tương tác riêng.

2026-10-18: Theo ảnh sidebar đính kèm, imagegen background-extraction/tái dựng mặt thẻ không chữ và icon theo reference. Sprite shop-sidebar-extraction.png1942x809 tại references/uploads. Crop regions: active0,0,990,395;idle990,0,952,395;gold120,410,480,399;bronze650,410,450,399;gift1100,410,370,399;lock1500,410,300,399. Alpha<=16 transparent, trim visible bbox. Runtime tab-active900x299,tab-idle877x290,market-gold379x316,market-bronze369x311,gift277x280,lock150x184. Không lấy chữ raster từ reference; tên/khóa state và hit-area là UI thật.


2026-10-18: heading-main/subtitle/clock.png từ imagegen edit theo ảnh mẫu mới của user; sprite references/uploads/shop-heading-backplates.png2170x725. Crop toàn ngang tại y0/h310,y310/h190,y500/h225 rồi trim alpha<=16; output2072x250,1382x168,1078x160. Chữ và clock UI đặt riêng, không raster hóa nội dung.


2026-10-18: tab-idle-v2.png imagegen sửa từ tab-idle.png nhằm cân geometry/bevel trái-phải, không rotate CSS. Trim alpha<=16:2150x708; dùng chung2 mục khóa. V1 giữ để đối chiếu.

