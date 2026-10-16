# Mô hình tài khoản Guest và đã liên kết

Ngày chốt: 2026-10-16. Đây là quy tắc thiết kế lâu dài do người dùng duyệt. Đã triển khai giao diện đăng nhập và ghi nhớ lựa chọn chơi khách trong trình duyệt; chưa triển khai tài khoản backend, Google OAuth hoặc database. Chưa duyệt schema database hay phương thức liên kết cụ thể.

## Quyền theo trạng thái tài khoản

| Chức năng | Chưa liên kết (Guest) | Đã liên kết |
| --- | --- | --- |
| Chơi online | Có | Có |
| Chơi với máy / Cờ Úp | Có | Có |
| Tạo/vào phòng | Có | Có |
| Elo / cấp / sao | Có | Có |
| Vàng | Có | Có |
| Danh hiệu | Có | Có |
| Lịch sử đấu | Có | Có |
| Lưu ván / lưu thế | Có | Có |
| Bạn bè / chat | Có | Có |
| Avatar / khung | Có | Có |
| Đổi tên | Không | Có, khi chưa đổi tên thành công |
| Đăng nhập thiết bị khác | Không | Có |
| Khôi phục dữ liệu | Không | Có |
| Xóa game / xóa dữ liệu trình duyệt | Mất tài khoản Guest | Khôi phục bằng đăng nhập |
| Giải đấu chính thức | Không | Có |
| Mua hàng bằng tiền thật sau này | Không | Có |

## Ý nghĩa và phạm vi

- Guest là tài khoản chưa liên kết, vẫn có dữ liệu và quyền sử dụng các tính năng được đánh dấu Có; không thiết kế Guest chỉ như một phiên chơi không có tiến trình.
- Trạng thái liên kết là điều kiện cho đổi tên, đăng nhập thiết bị khác, khôi phục, giải đấu chính thức và mua hàng tiền thật sau này.
- Quyền tính năng trong bảng không thay đổi các giới hạn riêng của từng chế độ chơi: ví dụ ván máy thông thường vẫn theo quy tắc không lưu ván/ghim thế/chat hiện hành. Không suy diễn bảng này thành yêu cầu mở các tính năng đó trong mọi chế độ.
- Khi xóa game hoặc dữ liệu trình duyệt, Guest mất tài khoản và không có luồng khôi phục; tài khoản đã liên kết có thể khôi phục bằng đăng nhập.
- Google là một cách đăng nhập được người dùng nêu cho thiết kế này; chưa triển khai tích hợp. Chưa chốt nơi lưu dữ liệu Guest, cách cấp tên ban đầu, danh sách đầy đủ nhà cung cấp liên kết, cách xử lý xung đột/liên kết tài khoản hoặc schema database. Không tự triển khai các phần này.
- Bảng mô tả thiết kế mục tiêu, không tuyên bố các tính năng mẫu hoặc chưa nối backend đã hoạt động thật.

## Bút đổi tên trong hồ sơ — chốt 2026-10-16

- Guest không hiển thị bút chỉnh sửa tên và không được đổi tên.
- Đăng nhập bằng Google hoặc đã liên kết tài khoản mới được hiện bút đổi tên, với điều kiện người chơi chưa đổi tên thành công.
- Đặt bút ở cuối dòng tên trong phần thông tin hồ sơ, cùng kiểu bút vàng sửa địa chỉ ở cuối dòng địa chỉ trong ảnh tham chiếu người dùng gửi; không đặt sát ngay sau chữ tên.
- Bút tồn tại cho tới khi người chơi đổi tên thành công; sau đó ẩn bút. Mở/hủy thao tác hoặc đổi tên thất bại không làm mất bút.
- Trạng thái đã đổi tên phải thuộc tài khoản và được giữ khi đăng nhập lại/đổi thiết bị, không chỉ là trạng thái UI tạm thời. Cách lưu sẽ được thiết kế ở nhiệm vụ database sau.
- Chưa có quy tắc cấp lại quyền đổi tên, đổi tên trả phí hoặc reset quyền khi liên kết lại; không tự bổ sung.
- Đây là thiết kế cho sau này, chưa sửa UI/code và không ảnh hưởng bút sửa địa chỉ hiện hành.

## Trạng thái thực hiện

- Quy tắc tài khoản và bút đổi tên đang được lưu làm thiết kế. Màn đăng nhập/ghi nhớ chơi khách đã triển khai theo yêu cầu tiếp theo bên dưới; chưa tạo migration, model Prisma hoặc bảng database.

## Màn đăng nhập — triển khai giao diện 2026-10-16

- Người mới vào gặp LoginPage; đã chọn chơi khách trên trình duyệt thì lần sau vào Home trực tiếp. EntryGate đứng trước App, không đổi màn game hiện có.
- co-tuong-entry-v1 chỉ ghi nhớ lựa chọn guest, không chứng thực tài khoản, không thay thế lưu dữ liệu Guest vào database. Xóa key sẽ trở lại trang đăng nhập.
- Google là nút giao diện có thông báo chưa cấu hình; chưa có OAuth/phiên Google thật. Sau khi triển khai auth phải kiểm tra phiên server để người đã đăng nhập Google vào thẳng game, không tin localStorage tự khai google.
- Nền tái dùng Home, artwork khung/logo/nút tự tạo theo ảnh mẫu theo yêu cầu người dùng; giữ nguyên các vùng UI đã khóa.
- Quy tắc bút đổi tên vẫn là thiết kế chưa triển khai; chưa tạo database.

- 2026-10-16: Tên khách tự sinh dạng Kỳ thủ + đúng6 chữ số ngẫu nhiên, không thêm khoảng trắng trước số (ví dụ Kỳ thủ000042). Dùng crypto.getRandomValues, pad số0 đầu; tạo một lần, giữ trong co-tuong-entry-v1 và khôi phục vào sessionStore khi tải lại. Entry guest cũ thiếu tên được bổ sung một lần. Validator client/server chung cho phép đúng mẫu này là ngoại lệ giới hạn10 ký tự; tên tự nhập khác giữ giới hạn cũ. Không bảo đảm tên random duy nhất toàn server khi chưa có DB. Chưa triển khai auth/database hoặc quyền đổi tên.

- 2026-10-16: Hồ sơ của mình đổi nút Thoát thành Đăng xuất theo yêu cầu, giữ hình học/style nút; hồ sơ người khác vẫn Thoát. Bấm mở dialog xác nhận Bạn có chắc muốn đăng xuất? với Hủy/Đồng ý; Hủy/Escape không đăng xuất. Đồng ý đánh dấu signedOut trong co-tuong-entry-v1, ngắt socket (server xử lý rời theo luật cũ), rời/reset ván local và trở lại LoginPage. Không xóa tên khách/localStorage ván-thế; chơi khách lại giữ tên. Chưa có OAuth để thu hồi phiên Google. Lỗi lưu marker giữ phiên và báo lỗi. Quyền sửa chỉ nút/footer và xác nhận của mình, vùng UI khác giữ khóa.
