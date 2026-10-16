# Nút thao tác hồ sơ người khác

Mẫu đối chiếu: `src/assets/references/uploads/profile-actions-reference.png`. Mẫu chỉ dùng đối chiếu bố cục, không được import vào UI.

Asset nguồn giữ nguyên tại `src/assets/references/uploads/`. Bản runtime bỏ pixel alpha nhỏ hơn8/255 (nhiễu ngoài hình gần như vô hình), rồi crop sát bbox alpha; giữ RGB, tỷ lệ và chi tiết nguồn, không upsample.

| Runtime | Nguồn | Crop (left,top,right,bottom) | Kích thước |
| --- | --- | --- | --- |
| `button-frame.png` | `profile-button-frame-source.png` | `(32, 203, 1503, 809)` | 1471×606 |
| `info.png` | `profile-info-source.png` | `(104, 103, 1148, 1129)` | 1044×1026 |
| `challenge.png` | `profile-challenge-source.png` | `(138, 137, 1113, 1106)` | 975×969 |
| `friend.png` | `profile-friend-source.png` | `(74, 78, 1180, 1169)` | 1106×1091 |
| `message.png` | `profile-message-source.png` | `(129, 131, 1124, 1115)` | 995×984 |
| `follow.png` | `profile-follow-source.png` | `(84, 82, 1169, 1158)` | 1085×1076 |
| `gift.png` | `profile-gift-source.png` | `(146, 142, 1109, 1096)` | 963×954 |

## Biến thể Xóa bạn

`remove-friend.png` được tạo theo `friend.png`, giữ nguyên huy hiệu vàng, ánh sáng, tỷ lệ và nền trong suốt; chỉ thay dấu cộng thành dấu trừ để khớp cùng bộ icon. Crop theo bounding box alpha thành 1250×1220px, không còn lề trong suốt dư.


