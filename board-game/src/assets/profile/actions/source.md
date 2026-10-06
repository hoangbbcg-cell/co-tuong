# Nút thao tác hồ sơ người khác

Mẫu đối chiếu: `src/assets/b99a1e64-d36b-41e2-8824-05088d378d56.png`. Mẫu chỉ dùng đối chiếu bố cục, không được import vào UI.

Asset nguồn giữ nguyên tại `src/assets/`. Bản runtime bỏ pixel alpha nhỏ hơn8/255 (nhiễu ngoài hình gần như vô hình), rồi crop sát bbox alpha; giữ RGB, tỷ lệ và chi tiết nguồn, không upsample.

| Runtime | Nguồn | Crop (left,top,right,bottom) | Kích thước |
| --- | --- | --- | --- |
| `button-frame.png` | `2623902f-6d12-4f0c-b9d1-02f5c49dcee6.png` | `(32, 203, 1503, 809)` | 1471×606 |
| `info.png` | `832fe384-9526-4efa-9234-25f77b903fe7.png` | `(104, 103, 1148, 1129)` | 1044×1026 |
| `challenge.png` | `4bde6d94-e7df-464c-856a-e4d22425f95b.png` | `(138, 137, 1113, 1106)` | 975×969 |
| `friend.png` | `e9057ec3-edeb-4c3c-8aa9-179bbf073b87.png` | `(74, 78, 1180, 1169)` | 1106×1091 |
| `message.png` | `1d40a8f7-cb75-4d58-b0c8-1576eb506c92.png` | `(129, 131, 1124, 1115)` | 995×984 |
| `follow.png` | `2b5bcd20-74db-40bf-b4dd-892a3f6eb7c9.png` | `(84, 82, 1169, 1158)` | 1085×1076 |
| `gift.png` | `217a3398-c816-4b99-ab56-71da42769dc6.png` | `(146, 142, 1109, 1096)` | 963×954 |
