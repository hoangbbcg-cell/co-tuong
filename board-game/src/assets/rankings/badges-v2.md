# Huy hiệu Xếp hạng mới

- Ảnh tham chiếu do người dùng cung cấp: `../85c9c123-6b5c-4c6d-889d-7da5726e49dc.png`.
- Công cụ: ImageGen built-in, tách bốn huy hiệu thành sheet nền alpha; kết quả là bản xử lý bằng AI, không phải crop nguyên pixel từ screenshot.
- Prompt: Extract the ranking badges from the supplied UI reference into four equal horizontal cells: gold laurel crown with 1, silver with 2, bronze with 3, and blank brown plaque from rank 4 with the number removed. Preserve reference colors and shapes, transparent background, no portraits or surrounding UI.
- Sheet được trim từng cell bằng `extract-badges.ps1`. Các góc của bốn PNG có alpha 0.
- `rank-gold-v2.png`, `rank-silver-v2.png`, `rank-bronze-v2.png`: huy hiệu top 3.
- `rank-plain-frame.png`: chỉ nền, không số; RankingDialog render số thứ hạng bằng HTML/Tailwind.
- Giữ nguyên tài nguyên cũ để đối chiếu. Chưa browser QA.
