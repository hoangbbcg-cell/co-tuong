# Quy tắc năng lượng — 2026-10-29

Quy tắc mới theo người dùng thay các mô tả cũ về chặn vào phòng và ưu tiên người thua.

## Quyền truy cập khi hết năng lượng

- Chặn hai mục ghép trận Cờ Tướng/Cờ Úp tại Home và hiện EnergyNotice.
- Vẫn mở Chọn Bàn, Chơi với máy, Vị trí tùy chỉnh, Lịch sử/Đã lưu và các mục khác. Không thêm điều kiện năng lượng vào việc mở các màn này.
- Vẫn vào phòng có sẵn, kể cả phòng chưa đấu/chưa đủ ghế: server đưa người hết năng lượng vào vai trò người xem, queued=false.
- Không được xếp hàng, chiếm ghế qua xếp hàng hoặc Sẵn sàng khi hết năng lượng. Thử xếp hàng/Sẵn sàng hiện EnergyNotice; server xác thực lại, không chỉ chặn ở client.
- Không mở/gửi Tạo bàn khi hết năng lượng. HTTP tạo phòng và fallback ghép trận đều kiểm tra; So tài không được tạo phòng mới nếu một trong hai người hết năng lượng. Lời mời vào phòng có sẵn vẫn được phép, người hết năng lượng vào xem.
- Chủ bàn khóa không thể đưa người hết năng lượng lên ghế bằng lệnh quản trị.

## Sau ván và hàng chờ

- Có người chờ đủ năng lượng: ưu tiên thay người đang ngồi hết năng lượng trước, kể cả người thắng. Nếu cả hai cùng hết và chỉ có một người chờ thì thay người thua trước. Có đủ hai người chờ thì thay cả hai người hết năng lượng.
- Không có người đang xếp hàng đủ điều kiện thì giữ nguyên ghế, kể cả năng lượng bằng 0; người xem không xếp hàng không kích hoạt thay ghế.
- Người bị thay vì hết năng lượng xuống người xem với queued=false, không tự xếp hàng lại, và chỉ người đó nhận bảng hết năng lượng. Ghi lý do trong chat hệ thống.
- Khi không ai hết năng lượng, bàn thường tiếp tục quy tắc người thua xuống cuối hàng. Bàn khóa tiếp tục giữ ghế, ngoại trừ ưu tiên thay người hết năng lượng có người chờ.
- Sau ván giữ mốc chuyển ghế 3 giây như trước cho người đã chờ từ lúc kết thúc. Người vào hàng sau kết thúc theo luồng cũ; khi đang chờ Sẵn sàng có ghế hết năng lượng thì thay bằng người chờ đủ năng lượng.
- Hòa cũng thay người hết năng lượng khi có hàng chờ. Đối thủ rời phòng vẫn lấp ghế trống trước; nếu còn người chờ thì áp dụng thay người còn lại hết năng lượng.
- Người trong hàng nhưng không còn đủ năng lượng được bỏ trạng thái queued và báo hết năng lượng, không được lên bàn.

## Nguồn dữ liệu và triển khai

- MySQL tiếp tục là nguồn sự thật. Giữ mức hồi 1/7 phút khi dưới 5, cách trừ năng lượng khi bắt đầu và số dư trên 5; không đổi vàng/Elo/kết quả ván.
- Giữ quyền vô hạn cho public ID 29622295 và 96161606; backend dùng energyUnlimited, không ép số dư DB lên một giá trị giả.
- RoomPersistence cập nhật cache sau giao dịch bắt đầu ván và khi chuẩn bị ghế/hàng chờ. `hasEnergy` tính cả hồi tự nhiên từ mốc server; RoomService không nhận số năng lượng từ client.
- RoomRepository nhận callback quyền năng lượng từ persistence. RoomService chọn người thay và gom thông báo theo phòng; controller gửi `room:notice` riêng đến người hết năng lượng. Client ánh xạ lỗi/thông báo này sang EnergyNotice và tải lại hồ sơ khi có account.
- Không migration, không đổi kiến trúc hoặc UI/geometry. Backend cần nạp mã mới; không SSH/deploy/restart production trong nhiệm vụ này.

## Kiểm chứng

- 10 suite, 61/61 test PASS: energy-room-policy, lobby-energy-policy, room-persistence-energy, room-readiness, energy, locked-rooms, locked-room-moderation, locked-room-ui, challenge, home-quick-wait.
- Kiểm tra cache sau trừ điểm cuối, hồi tự nhiên/quyền vô hạn, ưu tiên winner/loser/cả hai/hòa/đối thủ rời, giữ ghế khi không chờ, vào xem với 0 năng lượng, chặn tạo bàn/queue/invite tạo phòng và thông báo đích.
- TypeScript/Vite build PASS, dist cập nhật. Chưa browser/hai thiết bị hoặc giao dịch MySQL thật trong nhiệm vụ này.

- 2026-11-02: Hai tài khoản có quan hệ bạn bè accepted lúc bắt đầu ván được miễn trừ năng lượng cho cả hai. Backend kiểm tra friendship trong transaction bắt đầu; không ghi debit/ledger năng lượng, không cấp thêm số dư. Chỉ quan hệ accepted, không miễn riêng vì có lời mời. Elo/stat/kết quả và chính sách không thưởng vàng khi đấu bạn bè giữ nguyên. Cặp ngồi đúng bàn được server xác nhận có thể Sẵn sàng ở0năng lượng; người lạ và thao tác chưa xác định đối thủ giữ kiểm tra năng lượng hiện hành.
- Triển khai: MatchRepository.start query friendship trước gate balance và bỏ cả UPDATE/ledger khi accepted; MatchRepository.areFriends/RoomPersistence.prepareStarts xác nhận cặp socketID vào friendEnergyExemptPair. RoomRepository.hasEnergy nhận context phòng để miễn đúng cặp, RoomService dùng cho ghế/Ready/sau ván; controller chuẩn bị cặp trước join/Ready/tick và client Ready đọc flag server. Không miễn toàn tài khoản, thay đối thủ làm flag vô hiệu; transaction vẫn recheck quan hệ thật. Không migration/UI geometry. Backup outputs/backups/friend-match-energy-20261102. Final42/42 match-gold-policy/room-persistence-energy/energy-room-policy/rematch/lobby-energy PASS (friend0/5 khôngdebit, bìnhthường debit1mỗi/người, lời mời không tựmiễn, stranger0bịchặn, miễnđúngcặp/chốngstale, joinfriend0→Ready→sauván). Suite match-like-persistence mở rộng có1fail cũ thiếu accounts.profile trong mock; đã chạy source RoomPersistence backup vẫn cùng1fail/5PASS, không đổi test ngoài scope. Chưa MySQL thật/browser2thiếtbị QA; không giao dịch dữ liệu user, không restart/deploy.
