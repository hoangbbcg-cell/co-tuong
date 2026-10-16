# Giao diện Tin nhắn — xem thử 2026-10-07

## Thành phần danh sách hội thoại — quy tắc lâu dài 2026-10-07

- Tin chưa đọc hiển thị số trong huy hiệu tròn đỏ/viền kem giống Lời mời ở vị trí thời gian; vượt99 hiện99+. Chỉ đếm tin nhận vào sau mốc đã đọc, không đếm tin mình gửi. Mở hội thoại đánh dấu các tin hiện có đã đọc và bỏ huy hiệu; tin nhận khi đang xem hội thoại được đọc ngay. Hết tin chưa đọc thì hiện thời gian như trước. Mốc đọc hiện thuộc client state phiên Tin nhắn, chưa có backend.
- Xem thử2026-10-08: tin mẫu Picolozz/Nguyễn Hoàng Minh Khôi/An ban đầu chưa đọc để xem huy hiệu; các hội thoại còn lại ban đầu đã đọc. Đây là fixture xem UI, không phải quy tắc gán số cho hội thoại thật.

- Danh sách chat có thể gồm cả bạn bè và người lạ. Trạng thái bạn bè không quyết định một người có thể xuất hiện trong danh sách hội thoại hay không.
- Khi nối dữ liệu thật, giữ các hội thoại với người lạ nếu có; không suy ra quan hệ bạn bè từ việc hai người đang nhắn tin.
- Sắp xếp danh sách theo tin mới nhất của mỗi hội thoại; tin gửi đi và tin nhận vào đều cập nhật thứ tự. Hội thoại có hoạt động tin nhắn mới nhất nằm trên cùng, các hội thoại còn lại theo thứ tự thời gian giảm dần.
- Khi mở Nhắn tin từ hồ sơ/hàng của một người, thêm hoặc tìm dòng hội thoại của người đó và đưa lên đầu danh sách ngay, không cần gửi tin trước. Nếu đã có dòng hội thoại thì tái sử dụng dòng đó, không tạo bản sao.
- Đã nối thao tác Nhắn tin ở hồ sơ và nút chat trong Bạn bè với MessagesDialog trên Home và trong ván. Hội thoại mới tạo ở client state với preview trống; mở hội thoại sẵn có giữ nguyên thứ tự danh sách. Chưa đồng bộ/persist backend.

- Avatar popup2026-10-07: ảnh Picolozz86×86px bị phóng mờ; thay riêng ảnh trong popup bằng AvatarPortrait index0 dùng sprite gốc1619×971px. Thu ảnh chân dung từ208px xuống200px theo hệ tọa độ nguồn, giữ tâm; không đổi avatar header/danh sách/tin nhắn.

- Popup tùy chọn chat lấy ảnh `src/assets/references/uploads/messages-options-8109d221.png` làm gốc. Bấm avatar header hoặc nút ba chấm mở cùng popup; bỏ chữ “Tùy chọn trò chuyện” ở trên. Giữ khung/nền/nút/icon của ảnh, avatar lấy từ hội thoại đang mở. Kích thước hiển thị tinh chỉnh hẹp80%, cao88% vùng tham chiếu; nút/avatar tròn giữ dạng tròn. Quay lại/Escape/bấm ngoài đóng popup và trở về chat. Xem thông tin mở ProfileDialog đúng người; Biệt danh mở ô nhập cùng nút Hủy/OK. OK áp dụng tên hiển thị cho hàng chat và header; tên gốc vẫn làm khóa hội thoại. Chặn/Xóa cuộc trò chuyện đã nối hành vi client; Tắt thông báo mở lựa chọn thời gian và lưu thiết lập trong client state. Báo cáo chưa nối hành vi. Asset riêng và tọa độ crop ghi ở src/assets/messages/options/source.md.

- Vầng sáng chọn hội thoại là lớp riêng, mặc định ẩn; chỉ hiện ở hàng đã bấm chọn và chuyển sang hàng mới khi chọn hàng khác. Không gắn sáng cố định vào Picolozz.
- Tin nhắn hiện gửi được vào hội thoại đang chọn: nút gửi hoặc Enter thêm nội dung thành bong bóng gửi, gắn thời điểm hiện tại, xóa ô nhập, cập nhật preview và thời gian hội thoại rồi đưa cuộc trò chuyện lên đầu danh sách. Giới hạn nội dung300 ký tự. Các thread mẫu khác có tin ban đầu để xem; thread và tin mới chỉ tồn tại trong state phía trình duyệt, chưa đồng bộ giữa người dùng/thiết bị và sẽ mất khi tải lại trang.

## Hướng tin nhắn — quy tắc lâu dài 2026-10-07

- Tin do người dùng đang đăng nhập gửi luôn căn bên phải, dùng bong bóng sáng trắng/kem theo giao diện đã duyệt.
- Tin do người đang trò chuyện gửi luôn căn bên trái, kèm avatar của người đó.
- Các tin trong vùng chat xếp liên tiếp từ trên xuống, cách nhau theo gap cố định; không phân tán toàn bộ tin theo chiều cao khung. Khi danh sách dài, cuộn trong vùng chat; tin mới tự cuộn xuống cuối.
- Hai phía tính theo người đang xem cuộc trò chuyện như Zalo. Khi đổi hội thoại hoặc nối dữ liệu thật, giữ quy tắc này; xác định `outgoing` bằng danh tính người gửi so với người đang đăng nhập.
- Hiện tại MessagesDialog đã gửi tin mới với `outgoing: true` và hiển thị đúng hai phía; đây là quy tắc lâu dài, không phải thử UI.

## Chặn liên hệ — hành vi demo 2026-10-07

- Khi chưa chặn, thao tác hiện “Chặn”; sau khi chặn, cùng nút đổi thành “Bỏ chặn”, rồi trở lại “Chặn” sau khi bỏ chặn. Cả hai trạng thái đều xác nhận trước khi đổi.
- Tin gửi khi người dùng đang chặn vẫn nằm đúng vị trí bên phải; thông báo “Vui lòng bỏ chặn để gửi.” căn giữa toàn vùng chat, không đặt trong cột bong bóng. Tin nhận mới sau lúc chặn giữ nguyên nội dung/vị trí bên trái; thêm dòng thông báo ngược “Bạn đã chặn người chơi này.” căn giữa và nút “Bỏ chặn” thao tác được. State chỉ mô phỏng phía client, không giả lập thông báo tới tài khoản bên kia/server.
- Block state lưu trong client state hiện tại, chưa đồng bộ với người nhận hoặc backend. Dòng phản hồi tin nhận là quy tắc hiển thị chờ tích hợp sự kiện server.

## Xóa cuộc trò chuyện — quy tắc 2026-10-07

- Xóa cuộc trò chuyện cần xác nhận, rồi xóa toàn bộ tin trong khung chat ở phía người dùng hiện tại. Giữ dòng liên hệ ở danh sách bên trái; xóa preview/thời gian tin cuối. Bản tin phía đối phương không bị xóa.
- Backend sau này phải tách quyền sở hữu/trạng thái xóa theo từng người tham gia (mỗi phía có bản ghi riêng); không xóa thread dùng chung khiến đối phương mất lịch sử.
- UI prototype hiện xóa thread messages trong state client của phiên đang mở nhưng giữ conversation/contact row; chưa có database/persistence.

- Xóa bạn từ popup tùy chọn dùng lại MessagesFriendRemovalConfirmation, friendshipOverrides và quy tắc bỏ qua xác nhận 10 phút đang dùng ở nút kết bạn trên header. Không dựng hộp xác nhận hoặc friendship state thứ hai.

## Thời gian từng tin nhắn — quy tắc 2026-10-07

- Mỗi tin có nội dung và thời điểm gửi `sentAt`. Khi hai tin liên tiếp cách nhau từ10 phút trở lên, hiện giờ gửi của tin sau ở giữa hai tin, căn giữa toàn vùng chat; không tạo mốc theo đồng hồ đang chạy.
- Bấm bong bóng hiện giờ gửi bên dưới tin đó dạng `HH:mm` (ví dụ11:12: giờ trước, phút sau); bấm lại để ẩn. Giờ gửi riêng mặc định ẩn, chỉ một tin được mở giờ mỗi lần.
- Thời gian ở danh sách hội thoại đang mở lấy từ `sentAt` của tin cuối cùng để đồng bộ với khung chat. Các quy tắc HH:mm/thứ/tháng của danh sách giữ nguyên.
- Khi triển khai database, bắt buộc lưu cả nội dung và thời điểm gửi của mỗi tin; thời điểm do server xác lập, lưu mốc tuyệt đối/UTC và định dạng giờ ở client. Đây là yêu cầu lưu cho triển khai sau; hiện chưa có database hoặc đồng bộ nhắn tin giữa người dùng.

- Mẫu: `src/assets/references/uploads/messages-01f4e691.png` (ID 01f4e691-74e2-4977-a179-63db4a9beef6).
- Khung chat theo ảnh ff79830f: tách lại MessagesSidebar/MessagesChatPane và hai asset khung riêng; kích thước độc lập ở messagesPanelLayout.ts. Giữ fit viewport và mở rộng ngang20%. Họa tiết góc dưới phải/viền dưới và phải có lớp ảnh foreground z-20, clip theo vùng trang trí, nằm trên thanh nhập và pointer-events-none.
- Nội dung đặt trong từng component: trái có Tạo nhóm/tìm kiếm/8 hội thoại; phải có header người đang chat (avatar/tên/trạng thái), 7 bong bóng/thanh nhập/emoji/ảnh/gửi. Avatar và tên header, avatar cạnh tin đến lấy từ hội thoại đang mở. Inset nội dung tính theo từng khung, giữ vị trí mặc định như trước khi tách. Nội dung HTML có cuộn khi vùng thấp; avatar/button giữ object-contain, alpha thật và wrapper sát asset.
- Điều chỉnh chat2026-10-07: bong bóng chỉ hiện nội dung, ẩn thời gian và dấu tick; avatar cạnh bong bóng thu từ58px xuống52px theo token responsive; chữ trong bong bóng tăng21px lên23px. Timestamp ở preview danh sách hội thoại vẫn giữ.
- Điều chỉnh tiếp2026-10-07: nới ô bong bóng (padding ngang20/dọc6px), căn giữa hàng avatar và bong bóng, giảm avatar cạnh tin nhắn từ52px xuống48px. Cỡ chữ23px giữ nguyên.
- Điều chỉnh thanh nhập2026-10-07: đổi vị trí nút đính kèm ảnh và biểu tượng cảm xúc (ảnh bên trái ô nhập, mặt cười bên phải); giảm ảnh nút gửi từ70px xuống63px theo đơn vị thiết kế. Chỉ là điều chỉnh UI xem thử; logic gửi/đính kèm vẫn chưa nối.
- Cân kích thước ba icon2026-10-07: thử icon ảnh30px, mặt cười32px và gửi34px; theo điều chỉnh sau, hoàn tác thử nghiệm này về kích thước trước đó (ảnh theo khung46px/padding8px, mặt cười42px, ảnh gửi63px).
- Header2026-10-07: bên trái hiển thị avatar/tên/trạng thái người đang chat; bên phải chỉ giữ nút ba chấm, bỏ nút thông tin người chat.
- Kích thước icon2026-10-07: icon ảnh và mặt cười cùng45px (mốc mặt cười42px +3px); nút gửi50px (mốc +5px). Khung ảnh ngoài giữ46px.
- Khôi phục panel trái2026-10-07: bỏ trạng thái panel trống chỉ có ba chấm, đưa lại Tạo nhóm/tìm kiếm/8 hội thoại; header bên phải vẫn có tên/avatar trái và ba chấm phải.
- Cân icon ảnh2026-10-07: thu riêng hình SVG ảnh xuống30px để cân với mặt cười; khung nút ngoài46px, icon mặt cười45px và gửi50px giữ nguyên.
- Danh sách hội thoại2026-10-07: tên dùng font-cormorant như tên hồ sơ và tăng từ18px lên20px; trạng thái chỉ online (chấm xanh) hoặc offline (chấm xám). Bỏ nhãn hoạt động, hiển thị tin gần nhất cạnh chấm.
- Cân chiều cao danh sách2026-10-07: nút Tạo nhóm cao56px, ô tìm kiếm50px; vùng danh sách chia thành8 hàng bằng nhau để đủ8 mục.
- Tăng chữ tin gần nhất2026-10-07: dòng xem trước cạnh chấm trạng thái tăng15px→17px; tên và thời gian giữ nguyên.
- Thời gian hội thoại2026-10-07: hiện giờ gửi HH:mm trong24 giờ đầu; từ24 giờ hiển thị thứ (T2–T7/CN), từ30 ngày hoặc khác tháng hiển thị thứ và tháng. Cỡ chữ tăng12px→14px. Không hiển thị dạng “phút trước”; fixture cập nhật mỗi30 giây, nhắn tin chưa nối backend.
- Chấm trạng thái2026-10-07: dùng cùng kích thước21px, viền nâu, bóng và radial gradient như chấm online/offline trong FriendsDialog.
- Dòng xem trước của hội thoại đang mở lấy trực tiếp text ở tin nhắn cuối trong khung chat; danh sách và khung chat không lệch tin mới nhất.
- Nút đóng2026-10-07: dịch lên3px và sang phải5px; thu nút từ56px xuống52px, dấu × từ42px xuống40px.
- Cân lại nút đóng2026-10-07: tăng nút thêm2px lên54px, dấu × lên42px, dịch thêm2px sang phải và xuống2px.
- Mở UI trực tiếp từ nút tiện ích Tin nhắn ở Home, nút Nhắn tin trong hàng Bạn bè hoặc hồ sơ người khác ở Home/Game. Chỉ thay hành vi nút, không sửa bố cục/hình học avatar của các màn đang khóa.
- Đây là UI mẫu theo yêu cầu “logic để sau”: hội thoại hiện tại là fixture; nhập/gửi/ảnh/options chưa nối backend hoặc giả thành công. Đóng/Escape hoạt động. Không coi fixture là tin nhắn thật hoặc quy tắc tài khoản mới.
- Nguồn/crop được ghi trong `src/assets/messages/source.md`. Khung/phong cảnh hiện tại giữ pixel từ ảnh mới; wallpaper AI cũ chỉ giữ để đối chiếu lịch sử.

- Header tin nhắn2026-10-07: tên người đang chat dùng font-cormorant như tên trong thông tin người dùng, giữ cỡ28px; nút đóng dịch thêm3px sang phải.

- Tăng nhẹ cỡ chữ thời gian trong danh sách hội thoại từ14px lên16px; giữ nguyên kiểu định dạng HH:mm/ngày và vị trí.

- Tên hội thoại tăng20px→22px; chấm trạng thái giảm21px→18px, giữ nguyên màu và hiệu ứng.

- Thu chấm trạng thái thêm18px→16px theo yêu cầu.

- Ô tìm kiếm và ô nhập tin nhắn dùng chữ trắng cho cả nội dung nhập lẫn placeholder để thử màu.

- Tăng cỡ chữ ô tìm kiếm và ô nhập chat18px→20px; màu chữ trắng giữ nguyên.

- Sửa avatar popup2026-10-07: bỏ chân dung mặc định/vòng vàng gắn trong ảnh cảnh bằng scene-background.png; avatar thật lấy từ hội thoại đang mở. Chiều rộng và chiều cao dùng cùng đường kính pixel theo chiều rộng popup, giữ tâm và clip tròn; không dùng phần trăm chiều cao theo panel vì panel có tỷ lệ khác gây méo. Phạm vi chỉ popup tùy chọn chat, các avatar khác tiếp tục khóa.


- Popup tùy chọn chat2026-10-07: thêm tên người đang chat ngay dưới avatar, căn giữa theo avatar trong vùng cảnh; không đổi kích thước/định vị panel, avatar, nút hay các lớp nền. Tên dài cắt gọn một dòng để không đẩy bố cục.


- Popup tùy chọn chat2026-10-07: theo yêu cầu mới, bỏ dải header nâu phía trên, nền phong cảnh phủ từ y32 đến386 bằng object-cover. Avatar và tên cùng dịch lên32 đơn vị thiết kế; avatar giữ đường kính tròn. Các nút và khung giữ tọa độ hiện có. Điều chỉnh này thay yêu cầu giữ vị trí avatar/tên trước đó, chỉ trong popup này.

- Popup tùy chọn chat2026-10-07: dịch avatar và tên lên thêm8 đơn vị thiết kế sau khi đã bỏ dải header; avatar vẫn tròn, các lớp/nút khác giữ tọa độ.

- Popup tùy chọn chat2026-10-07: làm mềm điểm nối dưới ảnh phong cảnh bằng gradient 76 đơn vị thiết kế chuyển dần sang màu nền body (#281205); lớp gradient nằm dưới avatar/tên, không tác động bố cục hoặc nút.

- Popup tùy chọn chat2026-10-07: dịch avatar và tên lên thêm10 đơn vị thiết kế theo yêu cầu; các lớp/nút giữ nguyên.

- Popup tùy chọn chat2026-10-07: tăng vùng chuyển sắc dưới cảnh từ76 lên180 đơn vị thiết kế, kéo điểm kết thúc xuống y460 vào phần nền nâu; không dịch chuyển cảnh/avatar/tên/nút lên trên.

- Popup tùy chọn chat2026-10-07: bổ sung danh hiệu và sao bằng RankTitleBadge dùng chung; thứ tự trong cảnh: avatar, tên, danh hiệu/sao. Nâng avatar và tên để dồn chỗ cho huy hiệu trước hàng nút; mỗi hội thoại chưa có Elo riêng nên tạm hiển thị mặc định Tân Binh1 sao. Không đổi thứ tự/kích thước nút.

- Popup tùy chọn chat2026-10-07: sửa thứ tự thành avatar → danh hiệu/sao → tên dưới cùng. Dùng AvatarRankBadge gắn vào box avatar để danh hiệu và sao theo đầy đủ tỷ lệ chung AVATA_RATIO, bỏ kích thước huy hiệu nhỏ riêng. Nâng cụm avatar để đủ chỗ trước hàng nút; portrait giữ đường kính200 theo chiều rộng thiết kế và tròn. Huy hiệu vẫn tạm Tân Binh1 sao vì chưa có Elo liên hệ.

- Popup tùy chọn chat2026-10-07: tên dịch lên thêm8 đơn vị thiết kế, vẫn nằm dưới danh hiệu/sao.

- Popup tùy chọn chat2026-10-07: tên dịch lên thêm8 đơn vị thiết kế nữa, vẫn nằm dưới danh hiệu/sao.

- Popup tùy chọn chat2026-10-07: tên dịch lên thêm10 đơn vị thiết kế, giữ dưới danh hiệu/sao.

- Popup tùy chọn chat2026-10-07: thêm asset `player/name-frame.png` bao tên ở dưới cụm danh hiệu/sao; khung đặt chính giữa, tên căn giữa và cắt gọn nếu dài. Không dịch avatar/huy hiệu/nút.

- Popup tùy chọn chat2026-10-07: thu khung tên từ330×72 xuống290×64 đơn vị thiết kế và căn giữa ngang bằng left50%/translateX(-50%); giữ tâm dọc tên.

- Popup tùy chọn chat2026-10-07: thu khung tên từ290×64 xuống270×59 đơn vị thiết kế và chữ trong khung từ28px xuống24px; vẫn căn giữa ngang.

- Popup tùy chọn chat2026-10-07: bỏ khung name-frame theo yêu cầu mới, tên hiển thị trực tiếp căn giữa bên dưới danh hiệu/sao; tăng cỡ chữ24→26px.

- Popup tùy chọn chat2026-10-07: tên tăng26→28px và dịch lên10 đơn vị thiết kế; danh hiệu/sao giữ nguyên.

- Popup tùy chọn chat2026-10-07: thêm viền chữ tên nâu đậm1px (#2a1008), paint-order stroke fill để giữ nét chữ kem; không thêm lại khung tên.

- Khung chat2026-10-07: nền phong cảnh sau tin nhắn tối nhẹ (lớp đen15%) và blur0.6px bằng backdrop-filter trên vùng danh sách tin; chữ/avatar/bong bóng giữ rõ, không tác động header/composer/viền khung.

- Popup tùy chọn chat2026-10-07: thêm khung avatar vàng mặc định bằng AvatarFrameOverlay/getAvatarFrame(0) giống hồ sơ người khác; khung theo tỷ lệ component chung, danh hiệu/sao nằm trên khung. Chưa có dữ liệu khung riêng của liên hệ; giữ kích thước/vị trí avatar.

- Tin nhắn2026-10-07: nền vùng tin đổi sang lớp đen45% giống backdrop Xếp hạng, bỏ blur theo yêu cầu làm tối mà không làm mờ. Header có icon kết bạn lấy profile/actions/friend.png, bên trái ba chấm, hai icon42px. Nút kết bạn mới chỉ UI theo phạm vi thêm icon, chưa nối gửi lời mời.

- Header Tin nhắn2026-10-07: thay icon kết bạn ảnh bằng SVG đơn giản vòng vàng/nét người+dấu cộng, cùng42px với ba chấm. Bấm tạo lời mời trong pendingFriendRequests dùng chung Bạn bè/Hồ sơ; nền nút tối khi chờ nhưng nét icon giữ sáng, bấm lại hủy. Khi đã là bạn đổi dấu trừ và dùng friendshipOverrides/isExistingFriend chung; xóa cần xác nhận, checkbox bỏ xác nhận10 phút dùng chung mốc của hồ sơ. Đây là state phiên/demo, chưa backend. Ngoại lệ icon giản lược chỉ trong header chat theo yêu cầu; không thay bộ icon Hồ sơ/Bạn bè đã duyệt.

- Header Tin nhắn2026-10-07: trạng thái đang chờ kết bạn đổi từ nền tối sang xanh lá (#285a24), icon vẫn sáng; bấm lại vẫn hủy lời mời.

- Header Tin nhắn2026-10-07: bỏ nền xanh ở trạng thái đang chờ kết bạn, dùng nền nâu thường và opacity50% cho toàn icon/nút; vẫn bấm được để hủy lời mời. Yêu cầu này thay trạng thái nền xanh trước đó.

- Tin nhắn2026-10-07: tăng chữ thời gian giữa các tin và thời gian mở dưới bong bóng từ16 lên18px; các vị trí/thời điểm giữ nguyên.

## Popup Tạo nhóm — xem thử UI 2026-10-07

- Bấm Tạo nhóm trong MessagesDialog mở MessagesCreateGroupPanel theo reference03cff998; bỏ Thư viện/Tệp, thêm icon đổi avatar góc trên phải. Nút dưới dựa trên nút Xem thông tin của popup tùy chọn, chữ Tạo nhóm.
- Avatar tròn, giữ tỷ lệ khung nguồn; tên nhóm nhập được, chọn người trong danh sách hội thoại hiện có, tab 1 mình ẩn danh sách; chọn ảnh từ thiết bị để xem trước avatar. Quay lại/bấm nền/Escape đóng, trả focus về nút mở.
- Đây là UI xem thử, nút tạo cuối chưa nối tạo hội thoại nhóm/API. Không sửa các màn Bạn bè/Hồ sơ hoặc hình học avatar đã khóa.
- Asset và nguồn tại src/assets/messages/create-group/source.md. Build không thay thế browser QA.

- Tinh chỉnh popup Tạo nhóm2026-10-07: nền nâu phủ sát dưới viền ngoài, bo góc và clip phần nền chữ nhật dư quanh banner để không lộ góc nhọn. Icon đổi avatar dùng camera SVG. Hai tab Bạn bè/1 mình dùng viền asset options/block.png (border-image slice12, không lấy chữ/icon trong ảnh); trạng thái chọn dùng cùng gradient/vầng vàng của hàng hội thoại qua messageSelectionHighlight. Giữ bố cục/kích thước các điều khiển.

- Tinh chỉnh màu trạng thái chọn2026-10-07: dùng radial gradient sáng ấm ở tâm (#724018), chuyển qua nâu (#51280f), tối nhất ở góc (#241007); giảm cường độ glow trong và giữ viền sáng. Token dùng chung cho tab Tạo nhóm và hàng hội thoại đang chọn.

- Căn avatar popup Tạo nhóm 2026-10-07: hạ tâm avatar vào giữa khoảng dọc từ cuối banner Tạo nhóm (y114) đến đầu hàng Tên nhóm (y364); avatar top đổi117→151 theo hệ thiết kế, icon camera đi cùng34px. Không đổi cỡ avatar hoặc các vùng khác.

- Chọn thẻ Tạo nhóm2026-10-07: thẻ được chọn dùng đúng lớp highlight hàng hội thoại: bo rounded-lg, viền2px #ffe08b, gradient/glow messageSelectionHighlight. Không clip vầng sáng và không phủ viền asset lên lớp sáng; thẻ chưa chọn giữ khung cũ. Đây là thay đổi hiệu ứng chọn trong popup.

- Góc popup Tạo nhóm2026-10-07: nền nâu nằm đúng vùng trong khung (30,28,884,940), bo góc24 để không lộ ngoài họa tiết; lớp khung/họa tiết dùng z30 trên nền z0 và pointer-events-none. Tránh nới nền vượt qua mép trong viền.

- Nhãn “Tên nhóm” trong popup tạo nhóm tăng nhẹ30→32 đơn vị thiết kế; giữ nguyên vị trí và kích thước ô nhập.

- Danh sách chọn người trong popup Tạo nhóm: cuối mỗi hàng là ô checkbox viền vàng, chưa chọn để trống; khi chọn hiện dấu tích dạng V cao, nhánh phải dài, vàng sáng. Checkbox gốc vẫn nhận click hàng/phím. Quy tắc này thay tick đứng riêng theo chỉnh lại của người dùng2026-10-07.

- Nút Tạo nhóm popup được tăng rộng315→380, giữ tâm ngang; chiều cao tăng nhẹ77→81. Bỏ icon người; chữ căn giữa toàn nút, cỡ32 thay28. Viền tái sử dụng asset qua border-image không fill để không lấy icon trong ảnh.

- Mẫu màu thẻ chọn Tạo nhóm cập nhật theo reference mới: nền chuyển sắc vàng sáng phía trên sang nâu phía dưới, viền vàng #ffdf70 và glow vàng. Quy tắc này thay highlight hàng hội thoại trước đó; chỉ áp dụng hai thẻ Bạn bè/1 mình.

- Màu trạng thái chọn của hai thẻ theo mẫu mới: vàng sáng chuyển dần xuống nâu, viền vàng và glow; thay trạng thái cũ chỉ trong hai thẻ.

- Bong bóng tin nhắn nới padding ngang20→24 và dọc6→8 đơn vị thiết kế; chữ nội dung23px giữ nguyên. Thời gian giữa các tin và thời gian mở dưới bong bóng tăng18→20px.

- Danh sách chọn người Tạo nhóm hiển thị vừa5 hàng trong khung; mỗi hàng cao1/5 vùng nội dung. Render toàn bộ contacts, cuộn dọc để xem hàng còn lại; ẩn scrollbar bằng scrollbar-width:none và pseudo WebKit, không tắt cuộn.

- Icon người/nhóm trong hai thẻ Bạn bè và1 mình tăng30→36 đơn vị thiết kế, cùng tỷ lệ; giữ căn giữa cụm icon/chữ.

- Khung/nền Tạo nhóm cập nhật bằng ảnh3b29fb3a theo yêu cầu2026-10-07, thay cả hai lớp cũ. Chỉ dùng asset mới ở lớp nền/khung có fill z0; nội dung là lớp HTML riêng z10, giữ nguyên tọa độ/kích thước. Bỏ lớp viền foreground: lớp này đã che tiêu đề/quay lại và nút cuối ở bản trước. Reference03cff998 tiếp tục là nguồn bố cục và điều khiển.

- Nút Tạo nhóm2026-10-07: bỏ lớp nền gradient nâu của button; giữ viền asset không fill và đặt chữ trực tiếp giữa nút, tăng32→36 đơn vị thiết kế.

- Sửa nền nâu còn sót2026-10-07: màu nâu nằm trong dải viền ảnh cũ, nên bỏ CSS background chưa đủ. Thay ảnh nút bằng create-button-outline.png chỉ có viền vàng, alpha trong suốt ở giữa và ngoài; render một img phủ nút thay border-image từ ảnh còn nền. Chữ36 căn giữa giữ nguyên.

- Nút Tạo nhóm cập nhật theo lựa chọn mới của người dùng2026-10-07: lấy mẫu options/info.png, xóa icon người và chữ Xem thông tin khỏi ảnh, phục hồi mặt nút nâu liền mạch. Dùng create-button-blank.png phủ nút, chữ Tạo nhóm36 căn giữa HTML. Thay thử nghiệm viền rỗng; không dùng lớp nâu HTML phủ thêm.

- Nút Tạo nhóm có hover sáng hơn bằng brightness125%, chuyển150ms; rời chuột trở lại màu gốc, hỗ trợ prefers-reduced-motion. Thay hover tối theo yêu cầu mới.

## Hành vi tạo nhóm đang nối (2026-10-07)

- Ghi đè ghi chú UI-only phía trên: popup đã nối nút Tạo nhóm tới state Tin nhắn client. Tab Bạn bè chỉ liệt kê người có friendship state là bạn; gợi ý/người lạ và các hội thoại không phải bạn không xuất hiện, trừ khi quan hệ đã được xác nhận là bạn.
- Tên nhóm bắt buộc sau trim; tên rỗng hiện “Vui lòng nhập tên”, focus ô nhập và không đóng popup. Không chọn ảnh dùng avatar mặc định `src/assets/messages/create-group/avatar.png`.
- Cảnh báo tên nhóm nằm ngay phía trên ô nhập; khi người dùng gõ ký tự đầu tiên thì ẩn ngay. Nếu gửi lại tên chỉ có khoảng trắng, xác thực trim sẽ hiện cảnh báo lại.
- Lỗi tên rỗng hiển thị thành bong bóng chữ nhật nền vàng kem ngay phía trên nút Tạo nhóm; không đặt thông báo dưới ô tên.
- Khi tạo, thêm hội thoại nhóm mới đầu danh sách, đặt tên hiển thị theo tên nhóm, thành viên gồm người hiện tại và những người được tick. Tab 1 mình tạo nhóm chỉ có người hiện tại. Hội thoại mở ngay sau khi tạo, thread ban đầu rỗng. Khi có tin nhắn mới, chỉ đưa hội thoại đó lên đầu và giữ nguyên thứ tự tương đối các dòng còn lại.
- Đây mới là state client trong phiên: nhóm/thành viên không đồng bộ với tài khoản khác, không tồn tại sau tải lại; chưa có API hoặc database nhóm. Browser QA chưa thực hiện.

## Tìm kiếm danh sách hội thoại (2026-10-08)

- Ô tìm kiếm lọc hội thoại theo tên gốc, tên hiển thị của nhóm, biệt danh và player ID nếu dữ liệu được cấp; tìm không phân biệt dấu tiếng Việt hoặc hoa/thường. Danh sách rỗng khi không khớp có thông báo “Không tìm thấy người chơi”. Chỉ lọc các hội thoại đã có; chưa tra cứu người chơi mới qua API.
- `playerId` đi theo yêu cầu mở chat từ hồ sơ trong ván để có thể tìm bằng ID. Không tự gán ID giả cho các hội thoại mẫu.

- Xóa bạn trong Tin nhắn dùng lại xác nhận của Hồ sơ: câu hỏi theo tên, Hủy/Đồng ý, checkbox Không hiển thị lại và bỏ xác nhận10 phút. Khung panel nâu viền vàng cùng nút vàng nổi khớp mẫu; thay đổi style chỉ nằm trong component Tin nhắn.

## Avatar nhóm (2026-10-08)

- Số trong tên người/nhóm dùng NumberText với font-number, lining-nums/tabular-nums và cỡ0.9em cùng baseline; giảm nhẹ độ đậm một bậc (opacity88%). Số trong preview/tin nhắn và thời gian dùng font-number cùng lining-nums/tabular-nums, giữ cỡ chữ theo ngữ cảnh; NumberText giảm nhẹ độ đậm của các chữ số.

- Avatar mặc định giữ nguyên hình tròn vàng. Khi tải ảnh, crop ảnh dạng cover bên trong vòng tròn và giữ viền vàng từ asset avatar mặc định; không thay thế viền bằng ảnh chữ nhật. `MessagesGroupAvatar` dùng chung trong preview Tạo nhóm, danh sách, header, tin đến và popup tùy chọn nhóm.
- Mọi avatar người chơi trong Tin nhắn luôn hiển thị hình tròn; dùng `rounded-full` và `object-cover` để cắt phần ảnh thừa, không để ảnh vuông/chữ nhật hoặc méo thành hình khác.
- Dòng nhóm trong danh sách hội thoại có icon ba người màu vàng ngay trước tên nhóm; dòng cá nhân không có icon này.

- Chia vùng danh sách thành 8 chiều cao dòng bằng nhau để mặc định hiện đủ8 hội thoại. Kích thước dòng chỉ dựa trên chiều cao vùng danh sách, giữ nguyên khi lọc/tìm hoặc thêm nhóm; dòng vượt quá8 cuộn bên trong danh sách.

## Tùy chọn nhóm (2026-10-08)

- Xem thử tạm theo yêu cầu2026-10-08: nhóm mẫu “Nhóm Kỳ Hữu” nằm đầu danh sách và được chọn khi mở Tin nhắn trực tiếp. Tài khoản hiện tại là thành viên thường; MinhQuang giữ chìa khóa (đổi sang LinhMeo99 nếu tài khoản hiện tại tên MinhQuang). Dùng để xem quyền: không có camera/Đổi tên; nhóm do người dùng tự tạo vẫn giữ quyền người tạo như trước. Không coi fixture này là nhóm thật hoặc quy tắc mặc định lâu dài.

- Tắt thông báo tạm ẩn theo yêu cầu người dùng. Giữ hộp thời gian và state trong mã để bật lại; Xóa cuộc trò chuyện/Báo cáo dồn lên để không chừa hàng trống. Không tự bật lại mục này.

- Các nhãn thời lượng1h/4h/8h trong hộp Tắt thông báo dùng font-number20px cho cả số và h, đặt trong cùng span để h sát số, không chịu gap của hàng radio. Nhãn Cho đến khi mở lại giữ font/cỡ chữ thường18px.

- Chặn/Bỏ chặn và Xem thành viên dùng OptionRowBackground chung với action-row-blank.png: nền hàng trống liền mạch, chữ HTML trực tiếp trên ảnh, không gradient HTML/border-image hoặc mảng nâu che chữ. Icon Chặn SVG nằm riêng trên nền hàng.

- Bấm Tắt thông báo mở hộp “Tắt thông báo trong:” với lựa chọn đơn1h/4h/8h/Cho đến khi mở lại. Nút chọn dạng vòng tròn có chấm tròn bên trong khi chọn, không dùng dấu tick. Hủy bỏ lựa chọn mới, OK lưu thời lượng/mốc hết hạn theo nhóm trong client state của Tin nhắn. Chưa nối hệ thống thông báo/backend.

- Xác nhận xóa tin nhắn dùng tiêu đề “Xóa toàn bộ tin nhắn?” và dòng “Tin nhắn người bên kia vẫn được giữ, chỉ xóa ở phía bạn.”; không thêm tên người vào tiêu đề hoặc nội dung khác.

- Icon nhóm cạnh tên trong danh sách hội thoại là ba người màu vàng22px; đường SVG phải đủ đầu/thân người, không dùng path lỗi bị méo.

- Ảnh avatar nhóm tải lên hiển thị cùng kích thước box, crop tròn bằng object-cover và không phủ khung/viền avatar mặc định. Khi chưa tải ảnh, giữ nguyên asset avatar mặc định có khung.

- Nút Đổi tên dùng mặt nút trống có sẵn (`create-button-blank.png`), icon bút và chữ HTML đặt trực tiếp trên ảnh. Không phủ hình chữ nhật nâu để che chữ trong ảnh cũ.

- Nút Đổi tên căn giữa phần đầu các tùy chọn. Hàng Xem thành viên dùng Times New Roman22px nét thường theo font các hàng tùy chọn bên dưới, icon34px; số lượng dùng lining-nums và nằm cùng baseline với chữ; hiển thị số thành viên thực tế gồm cả người tạo, bấm mở danh sách tên thành viên. Các hàng Xem thành viên, Tắt thông báo, Xóa cuộc trò chuyện và Báo cáo nằm thành cụm liên tiếp với khoảng cách6 đơn vị thiết kế; không chừa tọa độ của các mục cá nhân đã ẩn.
Bảng thành viên rộng bằng panel danh sách chat, luôn dành chỗ cho8 dòng dù có ít hơn8 người; quá8 người thì cuộn dọc với thanh vàng dùng chung danh sách hội thoại. Chiều cao vùng danh sách lấy8 lần chiều cao dòng chat, giới hạn trong popup rồi chia đều thành8 dòng. Giữ avatar tròn50px trước từng tên; lấy ảnh theo người trong dữ liệu Bạn bè/hội thoại, người hiện tại lấy avatarIndex của session. Tiêu đề bảng22px và số lượng lining-nums; nút Đổi tên24px.
- Ô Đổi tên nhóm có placeholder “Nhập tên”.
- Người tạo nhóm lưu riêng bằng creatorName, luôn đứng đầu danh sách thành viên và có chìa khóa vàng ở góc dưới phải avatar. Thành viên thường không có chìa khóa; nhóm client cũ chưa có trường này lấy người đầu mảng thành viên làm người tạo theo luồng tạo nhóm trước đó.
- Chỉ thành viên có chìa khóa vàng (người tạo nhóm) được thấy và dùng thao tác đổi tên nhóm, đổi ảnh đại diện nhóm. Thành viên khác không được hiện các điều khiển này.
- Popup tùy chọn nhóm có nút camera cùng vị trí/kích thước tương đối như popup Tạo nhóm. Chọn ảnh dùng cùng luồng đọc ảnh, hiển thị tròn qua MessagesGroupAvatar và cập nhật avatar trong hội thoại, danh sách, header và khung chat.
- Vị trí camera popup Tùy chọn khớp camera Tạo nhóm theo tỉ lệ avatar: góc trên phải, cùng độ chồng lên viền tròn.
- Chìa khóa người tạo màu #FBD65B, thu còn13px, đặt trong vòng tròn #666666 20px ở góc dưới phải avatar.
- Tên nhóm trong popup tùy chọn căn giữa theo avatar, đặt cách mép dưới avatar15px; tên chat cá nhân giữ tọa độ riêng hiện có.
- Avatar nhóm, tên nhóm và nút Đổi tên dùng cùng một trục giữa theo tâm nút; camera giữ vị trí tương ứng với góc phải avatar.

- Member rows in the group member popup match the chat list: row height is measured as 1/8 of the chat list height, avatar is 50px, and name uses bold Cormorant 22px with the same horizontal gap and padding. Do not add an outer border that shrinks the avatar image.

- 2026-10-08: Friend request and removal actions live on the header friend button (add/cancel request; remove friend opens the existing confirmation). The options popup no longer has a separate Remove Friend row; the Report row moves up to keep the actions compact.

- 2026-10-08: In group conversation options, center the avatar vertically between the top frame edge (y=32) and Rename button (y=388): avatar center y=200 in source coordinates. Keep the name 15px below avatar bounds and move its camera badge with the avatar.
- 2026-10-08: Sending a friend request from the conversation header shows the same centered green confirmation toast and rise-away animation used in Friends. Canceling a pending request or removing an existing friend does not show this sent toast.
- 2026-10-08: The Mute Notifications action appears only in group conversation options. Hide it for one-to-one conversations and move Delete Conversation and Report up to close the gap; group option positions remain unchanged.

- 2026-10-15: Trong chat bàn chơi, tăng khoảng cách dọc cố định giữa các tin từ6px lên12px; áp dụng cả tin hệ thống kế tiếp và tin thường. Giữ avatar, căn lề và cuộn.
