# Cờ Úp local

Tham chiếu: https://www.pychess.org/variants/jieqi (đọc ngày 2026-09-18).

- Giữ bàn 10×9 và Tướng ngửa; xáo riêng 15 quân còn lại của mỗi bên.
- Quân úp đi theo loại tại vị trí xuất phát trong nước đầu, rồi lật thành loại thật.
- Sĩ đã lật không bị giới hạn cung; Tượng đã lật có thể qua sông nhưng vẫn bị chặn mắt. Tướng, Xe, Mã, Pháo, Tốt giữ luật tương ứng.
- Engine dùng loại bên ngoài để kiểm tra nước khi còn úp. Sau lật, cập nhật loại thật trước khi tính chiếu/hết nước của đối thủ.
- UI không render danh tính quân úp vào chữ, nhãn truy cập hoặc thuộc tính DOM. Máy cơ bản chỉ đánh giá loại đã công khai; quân úp bị ăn đều có cùng điểm đánh giá.
- Đây là ván local với máy cơ bản; danh tính vẫn nằm trong bộ nhớ client. Chưa hỗ trợ Cờ Úp online, lịch sử quân bị bắt hoặc luật lặp/chiếu dai/đuổi quân giải đấu. Không có panel xem riêng danh tính quân úp đã bắt như một số nền tảng.
- Xáo tại store bằng Math.random; engine nhận mẫu số ngẫu nhiên để có thể test lại kết quả.
