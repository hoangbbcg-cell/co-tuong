# Hình giải đấu mới

Nguồn người dùng: `giải đấu.png`, thêm ngày 2026-09-19. Giữ nguyên ảnh nguồn.

Ảnh sử dụng: `tournament-art-no-cup.png`, chỉnh bằng công cụ ImageGen tích hợp để xóa cúp trong ảnh. Đã xem kết quả: cúp được thay bằng bầu trời/núi và mặt trời; bố cục nhân vật, rồng/hổ và chữ được giữ gần bản gốc. Đây là ảnh chỉnh bằng AI, không đảm bảo giữ nguyên từng pixel.

Prompt: Use case: precise-object-edit. Edit the provided tournament artwork. Remove ONLY the large central trophy (gold cup and purple base), reconstruct the orange sunset sky and distant mountains naturally behind it. Keep EVERYTHING else identical: two warriors, dragon, tiger, landscape, framing and exact Vietnamese typography 'KỲ PHÙNG ĐỊCH THỦ', 'Giải đấu', 'ANH HÙNG HỘI NGỘ'. Same wide aspect ratio. No new trophy, no new text, no new objects. This will be used as a web illustration with a separately rendered trophy over the cleared center. Save the edited image.

Home dùng chữ có sẵn trong ảnh, bỏ chữ HTML trùng. Cúp emoji vẫn là phần tử DOM riêng phủ ở giữa, co theo chiều rộng ảnh. Giữ hành vi nút Giải đấu và nhãn truy cập, dùng mask CSS hòa mép ảnh.
