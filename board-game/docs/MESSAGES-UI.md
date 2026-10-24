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
- 2026-10-16: Theo yêu cầu mở nguồn avatar/khung thật cho chat bàn và Tin nhắn: MessageAccountAvatar dùng AccountAvatar chung, session cho chính mình và Query search cho người khác; cache theo tên30s. Áp dụng chat bàn, danh sách hội thoại trực tiếp, header, avatar tin nhận và popup tùy chọn. Giữ kích thước/vị trí, ảnh nhóm và máy riêng; không thêm danh hiệu vào chat.
- 2026-10-16: Tên trong Tin nhắn dùng SocialPlayerName của Bạn bè làm chuẩn: font-heading/extrabold, stroke chữ0.2px, số font-number90%/normal/opacity100%/stroke0.3px/cùng baseline. Đồng bộ danh sách/header/tùy chọn/thành viên/chọn người tạo nhóm; giữ cỡ theo ngữ cảnh/màu/layout/avatar.
- 2026-10-16: Sửa giật popup nhóm Tin nhắn do polling1s thay conversationList mất members/creatorName rồi request members bổ sung lại: giữ metadata nhóm cũ trong lúc refresh. Giữ reference threads khi nội dung không đổi để không kích hoạt scroll xuống đáy mỗi poll. Không đổi interval/UI nhóm.
- 2026-10-16: Đổi ảnh nhóm đã nối server thật thay thông báo chưa tích hợp. Frontend chọn ảnh≤10MB, crop vuông/resize256 và encode JPEG; PATCH conversations/:id/avatar kiểm tra JPEG≤120k base64 và owner còn membership. Repository ghi uploads/group-avatars bằng UUID, lưu URL vào avatar_object_key hiện có, rollback lỗi ghi DB dọn file mới. Static/media proxy dev; list trả avatarUrl và mọi vị trí ảnh nhóm đọc cùng URL. Không migration, uploads ignored và cần backup cùng DB.
- 2026-10-16: Tin nhắn: nút mặt cười mở24 emoji/chèn tại caret, giới hạn300 ký tự. Nút ảnh chọn≤10MB, JPEG resize cạnh dài≤720px/nén≤120k base64, xem trước/bỏ ảnh và bấm Gửi. POST conversations/:id/images xác thực membership và send giữ block/idempotency/300char; file UUID uploads/message-images, body lưu đường dẫn /media/message-images/UUID.jpg, render img chỉ khi khớp mẫu path nội bộ nghiêm ngặt; preview hội thoại chỉ 📷 Ảnh. Không migration; static/dev proxy mới, backup uploads cùng DB.

- 2026-10-17: Tin nhắn mở mặc định không tự chọn/tải/đánh dấu đọc hội thoại đầu; vùng chat hiện HOANGBBCG căn giữa hai chiều, Georgia đậm nghiêng/màu #936332 như bàn cờ. Bấm hội thoại, tạo nhóm hoặc Nhắn tin từ hồ sơ vẫn mở hội thoại được yêu cầu. Giữ avatar/bố cục danh sách. Thay quy tắc tự chọn hội thoại đầu trước đây.

- 2026-10-17: Theo yêu cầu mới, riêng chữ HOANGBBCG ở trạng thái chưa chọn hội thoại Tin nhắn dùng trắng kem #fff1d6; giữ font/cỡ/vị trí, không đổi chữ trên bàn cờ.

- 2026-10-17: Ảnh gửi/nhận trong Tin nhắn hiển thị trực tiếp, wrapper sát ảnh không nền/viền/padding/shadow, không đuôi bong bóng/họa tiết hoặc bo cắt ảnh. Tin chữ giữ bong bóng cũ; giữ bấm hiện giờ.

- 2026-10-17: HOANGBBCG mặc định Tin nhắn đổi màu #E6BA86. Khởi tạo selection null và khi đóng reset selection/popup/draft/search để mỗi lần mở tiện ích đều hiện chữ, chưa chọn mục. Mở Nhắn tin đích từ hồ sơ/Bạn bè vẫn theo yêu cầu đích cụ thể.

- 2026-10-17: Sửa ảnh Tin nhắn: bỏ canvas/nền trắng/resize/JPEG conversion, FileReader gửi nguyên bytes PNG/JPEG/WebP/GIF tối đa10MB. Backend validate signature, lưu đúng extension và bytes, parser riêng images14MB. Giữ URL jpg cũ; ảnh gửi căn phải với wrapper min-w-0, bỏ giới hạn min(360px,100%) gây khung rộng lệch. 6/6 regression hiện có PASS; kiểm tra PNG bytes/extension trực tiếp PASS; typecheck/build PASS, dist xác nhận FileReader. Không thêm được regression do EPERM file test; chưa browser QA. Backend cần restart. Ảnh cũ đã flatten trắng không khôi phục alpha, cần gửi lại nguồn.

- 2026-10-17: Theo mẫu mới, chữ HOANGBBCG mặc định Tin nhắn đổi sang trắng ngả vàng nhẹ #FFF6DF thay #E6BA86; giữ vị trí/cỡ/font.

- 2026-10-23: User chốt Xếp hạng hiện tại xong, chuyển sang Tin nhắn mobile: kích thước dialog bằng layout Xếp hạng (width/height×scale), hai panel cao đầy khung. Token nội dung dùng1.5×dialog scale cho chữ/icon/control/hàng tương ứng; desktop giữ công thức cũ. Giữ cấu trúc2panel, dữ liệu/API và hành vi chat.

- 2026-10-23: Theo user, Tin nhắn mobile chuyển sang điều hướng một màn kiểu Zalo: full viewport, danh sách hội thoại toàn chiều ngang; tìm kiếm/tạo nhóm cùng hàng trên. Chọn người/nhóm ẩn danh sách và mở chat toàn chiều ngang; nút quay lại/Escape về danh sách. Đóng dialog dọn lựa chọn/tìm kiếm; Nhắn tin từ hồ sơ vẫn vào đúng đích. Dòng76px, nội dung/token mobile có scale tối thiểu0.65, avatar hàng48px theo quyền phóng nội dung Chat user đã cho. Giữ API/gửi/ảnh/emoji/nhóm/tùy chọn và desktop hai panel. Xếp hạng đã chốt, không sửa.

- 2026-10-23: User đính chính Tin nhắn mobile không full viewport: rộng/cao bằng dialog Xếp hạng qua layout.width/height×layout.scale. Giữ bố cục một màn danh sách hoặc hội thoại, hàng tìm kiếm/tạo nhóm, nội dung lớn và quay lại.

- 2026-10-23: Theo user, Chat mobile tái dùng SocialDialogFrame giống Xếp hạng/Bạn bè, hideTitle riêng để không có chữ Tin nhắn; giữ khung các bảng khác qua mặc định hideTitle=false. Bỏ header chữ/khung phẳng mobile, dùng nút× chung. Tìm kiếm giữ chính màu laptop #241309/viền#dca44d/chữ trắng. Tạo nhóm mobile dựng icon/chữ HTML trên nút112×44px có viền/nền nâu vàng, không kéo méo artwork; desktop giữ ảnh gốc. Hai màn danh sách/chat nằm gọn trong khung, giữ điều hướng/API.

- 2026-10-23: User đính chính nút Tạo nhóm Tin nhắn mobile phải giống laptop: tái dùng group-button.png có sẵn cho cả2 nhánh, bỏ icon/chữ HTML và nền/viền dựng riêng compact. Mobile object-contain trong vùng112×44 để giữ tỷ lệ artwork; laptop giữ nguyên object-fill và kích thước cũ. Giữ mở panel/API tạo nhóm. Build/typecheck PASS; dist xác nhận artwork mobile; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, chữ danh sách Tin nhắn trống “Không tìm thấy người chơi” mobile tăng lên22px thật và semibold; giữ màu/font/căn giữa, desktop nguyên trạng. Build/typecheck PASS; dist xác nhận style mới; chưa browser QA.

- 2026-10-23: User đính chính chữ trống cần tăng là Lịch sử, không phải Tin nhắn. Hoàn tác chữ trống Tin nhắn; historyEmptyTextClass chung Đã chơi/Đã lưu ván/Thế cờ thêm compact22px/semibold, desktop giữ28 theo scale. Build bị chặn bởi lỗi TS2559 tại FriendsDialog.tsx:236 (contentStyle custom property --ranking-tab-width ngoài phạm vi task); chưa cập nhật dist/chưa browser QA.

- 2026-10-23: Theo user, Chat mobile tăng chữ tìm kiếm18px, control cao50px; nút Tạo nhóm132×50/icon24/chữ17 dựng HTML để giữ tỷ lệ. Hội thoại dùng socialPlayerRowClass và radius từ getSocialRowStyle chung Xếp hạng, hàng92px/gap6px, avatar56px, tên20px, preview16px, giờ13px; màu chữ nâu trên nền kem chung. Giữ desktop và dữ liệu/điều hướng. Build/typecheck PASS; dist index-D8PxTPk2.js/index-7lmrkjr-.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user đính chính Chat mobile: Tạo nhóm dùng đúng group-button.png của laptop, bỏ nút HTML thay thế; ảnh giữ tỷ lệ tự nhiên trong vùng144×42px (không kéo méo). Dòng hội thoại dùng nguyên socialPlayerRowClass/getSocialRowStyle và bổ sung đúng dải bóng trái/gradient #4a261327/#75451d1a rộng132×rowScale như Xếp hạng. Giữ nội dung lớn/desktop. Build/typecheck PASS; dist index-CmtssHAy.js/index-R6mo7Grr.css xác nhận; chưa browser QA.

- 2026-10-23: Theo user, Chat mobile thu hàng tìm kiếm/tạo nhóm vào36px tổng chiều ngang, nút nhóm rộng144→126px/cao42→46px và chữ20px. Nút dùng border-image từ chính artwork laptop để giữ góc/hoa văn khi đổi tỷ lệ; icon crop CSS từ cùng ảnh, chữ HTML độc lập để phóng mà không méo. Desktop giữ ảnh gốc. Build/typecheck PASS; dist index-jkKtnjSo.js/index-Iue8rzuG.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user, dựng lại nút Tạo nhóm mobile bằng MessagesCreateGroupButton: nền/viền,4họa tiết góc SVG, icon nhóm SVG và chữ HTML là phần độc lập. Props width/height/iconSize/labelSize/ornamentSize cho chỉnh riêng, không crop hoặc kéo ảnh chứa chữ; giữ ref/focus/onClick. Laptop giữ artwork gốc. Build/typecheck PASS; dist index-DGLJB454.js/index-D3V5j6to.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user, Chat mobile nới hàng tìm kiếm về toàn bề ngang, ô cao50→44px; chữ nhập16px, hint14px hiển thị đủ Tìm tên hoặc ID người chơi như laptop (tự xuống dòng khi thiếu chỗ, không cắt). Hàng hội thoại92→76px, avatar56→48px; thời gian ở mép phải14px, cùng formatter/nguồn lastMessageAt và quy tắc huy hiệu chưa đọc với laptop. Desktop giữ nguyên. Build/typecheck PASS; dist index-BvVz7seY.js/index-y3JzvEv5.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user, Tạo nhóm mobile thay khung và icon SVG bằng2PNG mới trong src/assets: 95959a5a (khung2172×724) và49ad812e (nhóm1254×1254). CSS cắt khoảng alpha dư bằng các viewport riêng; khung chia3lát trái/giữa/phải để giữ góc khi resize, icon giữ tỷ lệ; chữ HTML Georgia bold gần font artwork cũ. Giữ width/height/iconSize/labelSize độc lập và laptop. Build/typecheck PASS; dist index-G_ZUQ2i0.js/index-BAJVcaKS.css xác nhận2asset mới; đã xem nguồn ảnh, chưa browser QA.

- 2026-10-23: Theo user, thẻ Tạo nhóm mobile rộng126→148px, chữ20→17px. Cụm icon/chữ neo giữa trong vùng inset20px, gap4px để nằm trong lòng thẻ; giữ hai asset riêng và chiều cao46px. Avatar hàng hội thoại48→44px, không đổi avatar header hoặc desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, thay riêng khung Tạo nhóm mobile bằng7c55d422-22c0-40f3-9c29-ee23f4b57d58.png (2172×724); crop CSS vùng x12..2160/y180..540, chia3lát cap300px để giữ đầu nhọn/viền. Giữ kích thước148×46, icon49ad812e và chữ17px. Build/typecheck PASS; dist index-uChmMj71.js/index-BYT1m-2a.css xác nhận asset mới; đã xem ảnh nguồn, chưa browser QA.

- 2026-10-24: Theo user, Chat mobile tách thời gian/huy hiệu chưa đọc thành cột riêng bên phải căn giữa chiều dọc hàng. Cụm tên/preview tăng khoảng cách với avatar thêm7px thật qua margin-left. Giữ quy tắc thời gian/chưa đọc và desktop. Build/typecheck PASS; dist index-BAA9p7Gk.js/index-B6elaPna.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo ảnh user, khung ngoài Chat mobile thay SocialDialogFrame bằng conversation-list-frame.png của danh sách laptop: nền nâu hoa văn/viền vàng, cùng inset nguồn. Giữ kích thước dialog hiện tại, nội dung và điều hướng mobile, nút× chung; desktop nguyên trạng. Build/typecheck PASS; dist index-DdSBJ2aq.js/index-U-k3JYlK.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo user, khung Chat mobile bù khoảng trống nguồn của artwork laptop (rect x10/y36/445×940 trên465×998) để đường viền nâu/vàng phủ bằng kích thước dialog các bảng khác; giữ layout nominal. Hàng hội thoại thêm chữ Đang online/Offline cạnh chấm, tách preview xuống dưới. Thời gian cột phải luôn ở hàng trên ngang tên, huy hiệu chưa đọc ở slot dưới (không thay thế thời gian trên mobile). Desktop giữ quy tắc cũ. Build/typecheck PASS; dist index-DjuaXENJ.js/index-BLvoTCl8.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo user, khung Tạo nhóm mobile thay bằng0963fdaa-fd2f-4c9d-bcce-0cd1500ccfd8.png; CSS crop vùng x48..2124/y132..560, chia3lát cap300 để giữ góc bo. Giữ icon/chữ/kích thước và desktop. Build/typecheck PASS; dist index-CH16LqMF.js/index-D54ybWBF.css xác nhận asset mới; đã xem nguồn, chưa browser QA.

- 2026-10-24: Theo phản hồi icon Tạo nhóm mobile bị méo, ảnh icon khóa tỷ lệ nguồn vuông1:1 bằng width/height intrinsic và height:auto, chỉ scale theo một chiều bằng pixel; đặt trong viewport vuông và căn giữa phần alpha thật. Không ép width/height phần trăm độc lập. Giữ khung/chữ/hành vi. Build/typecheck PASS; dist index-BWYA1Sj1.js/index-809XO8Im.css cập nhật; chưa browser QA.

- 2026-10-24: Theo ảnh user, vết lõm cạnh icon thực tế là đường nối3lát khung Tạo nhóm. Bỏ ghép lát, dùng một ảnh khung0963fdaa liên tục với crop CSS toàn vùng2076×428 để không sinh seam/đứt viền. Icon/chữ/kích thước giữ nguyên. Build/typecheck PASS; dist index-bnx9cpIA.js/index-BoCLPUD6.css xác nhận. Chưa browser QA.

- 2026-10-24: User đính chính lỗi là icon ba người Tạo nhóm chứ không phải khung. Thay riêng render PNG bằng SVG ba người với đường tròn/cung mượt, gradient vàng và viền mảnh, tỷ lệ40:32; useId cho gradient độc lập. Giữ khung0963fdaa/chữ/hành vi. Thay quy tắc dùng iconPNG trong các lượt trước theo yêu cầu sửa icon mới. Build/typecheck PASS; dist index-CtTuPbbJ.js/index-DuwSurX4.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo user, tên hội thoại mobile nhỏ20→18px/line22, cụm tên/trạng thái/preview tự căn giữa chiều dọc. Thời gian chuyển vào cùng flex hàng tên/items-baseline để luôn ngang tên, bỏ cột phải tự stretch; huy hiệu chưa đọc nằm bên phải dòng preview phía dưới. Giữ dữ liệu/desktop/khoảng avatar. Build/typecheck PASS; dist index-B7ohCkoh.js/index-D3MUXt0i.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo user, dòng phụ hội thoại mobile giữ chấm presence và hiển thị tin cuối thay chữ Đang online/Offline khi có nội dung; chưa có tin thì fallback trạng thái. Gộp trạng thái/preview thành một dòng dưới tên, ảnh gửi hiện 📷 Ảnh; giữ thời gian ngang tên và badge dưới. Desktop giữ hiện tại. Build/typecheck PASS; dist index-xyMthWFJ.js/index-D5_7bNE4.css cập nhật; chưa browser QA.

- 2026-10-24: Theo user, Chat mobile trở về khung chung SocialDialogFrame như các bảng thông tin/social (không title), thay artwork nâu laptop riêng. Đổi vị trí Tạo nhóm sang trái/tìm kiếm sang phải; nút nhóm148→128px, phần rộng trả cho ô tìm kiếm. Giữ danh sách/điều hướng/icon và desktop. Build/typecheck PASS; dist index-_Dvift2C.js/index-Bd3a8kKr.css xác nhận; chưa browser QA.

- 2026-10-24: Theo user, danh sách Chat mobile thêm socialPanelClass và nền giấy historyParchmentBackground/lớp phủ#fff4dc52 giống Xếp hạng. Hàng tiếp tục dùng socialPlayerRowClass/radius/dải bóng chung; padding ngang12×rowScale cộng5px thật để avatar vào phải/thời gian vào trái. Giữ chiều cao76px, nội dung và desktop. Build/typecheck PASS; dist index-DelhM9hv.js/index-C9kp2aIM.css xác nhận; chưa browser QA.

- 2026-10-24: Theo user, danh sách Chat mobile chia10hàng vừa khung: mỗi hàng calc((100% - 54px)/10), trừ9gap6px; minHeight0 và overflow cuộn giữ các hội thoại còn lại. Avatar giới hạn theo chiều cao hàng, vẫn44px tối đa theo chiều ngang/tỷ lệ vuông. Desktop giữ8hàng cũ. Build/typecheck PASS; dist index-AAyvZ_bP.js/index-CLBj8hsU.css xác nhận10slot. Chưa browser QA.

- 2026-10-24: User đổi Chat mobile về8hội thoại/khung (trừ7gap6px). Mỗi hàng là size container, avatar/tên/preview/thời gian/chấm/badge dùng cqh cùng tỷ lệ theo chiều cao hàng thay pixel cố định; tên/time vẫn cùng baseline, nội dung giữa hàng. Giữ khoảng avatar→text7px user đã chốt; desktop giữ nguyên. Build/typecheck PASS; dist index-Xax82OXF.js/index-c_eS99ht.css xác nhận8slot/cqh. Chưa browser QA.

- 2026-10-24: Theo user, focus tìm kiếm Chat mobile không co khung: chụp layout trước focus và giữ cho phiên dialog, tránh visualViewport bàn phím làm đổi kích thước/8hàng/nội dung. Đóng dialog giải phóng snapshot; thay đổi rộng lớn (đổi hướng) dùng layout mới. Không sửa hook layout chung hoặc desktop. Build/typecheck PASS; dist index-C3iEZWaq.js/index-c_eS99ht.css cập nhật; chưa QA bàn phím điện thoại thật.

- 2026-10-24: Theo user, Chat mobile7hội thoại/khung (trừ6gap6px), nội dung tiếp tục cqh theo chiều cao hàng. Badge chưa đọc tăng33→39cqh, số19.5→22cqh. Preview khi unread>0 dùng semibold/màu nâu đậm#36200c, tự trở lại thường khi đã đọc. Desktop/logic read/API giữ nguyên. Build/typecheck PASS; dist cập nhật và xác nhận7slot; chưa browser QA.

- 2026-10-24: Theo user, nút Chat ngoài Home hiển thị tổng unreadCount mọi hội thoại từ server, Query theo accountID/poll4giây; đọc tin invalidate query để giảm số. Mobile tái dùng chính markup/style huy hiệu lời mời Bạn bè (đỏ/viền kem, max99+), desktop cùng kiểu; số0 ẩn. MobileHome prop optional mặc định0 cho consumer cũ. Build/typecheck PASS sau sửa hợp đồng props; dist cập nhật; chưa browser/API live QA. Không đổi read API hoặc cơ sở dữ liệu.

- 2026-10-24: Theo user, Chat mobile thêm biển Tin nhắn trên đầu khung như các bảng khác: dùng messages/title-frame.png và chữ HTML font-heading vàng/nghiêng trong header SocialDialogFrame, showTitleText opt-in chỉ Chat; bỏ padding chừa header cũ. Nút Tạo nhóm128→112px/icon20/chữ15 để nới ô tìm kiếm; nội dung giữ7hàng theo tỷ lệ. Build/typecheck PASS; dist index-Wcyu5y0K.js/index-BMlGkRX0.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo ảnh user, phóng Tạo nhóm MOBILE bằng kích thước khung Chat; thêm Tên nhóm, tìm bạn theo tên/public ID thật từ socialStore, danh sách có nút +/chọn, khu thành viên đã chọn có nút bỏ và bộ đếm tối đa20 người được thêm, Hủy/Tạo nhóm. Giữ payload/API và nhánh laptop; backend vẫn giới hạn50 như trước. Đây là bước bố trí UI theo ảnh, chưa chốt pixel. Build/typecheck PASS sau sửa NumberText text prop; dist index-CH9CQkMg.js/index-BxFChZVn.css xác nhận nội dung mới; chưa browser QA (browser bị tắt trong Work).

- 2026-10-24: User chốt Tin nhắn/Tạo nhóm MOBILE là hai khung riêng: khi mở Tạo nhóm unmount surface Tin nhắn, panel nhóm là sibling độc lập, dùng SocialDialogFrame và biển title-frame/chữ Tạo nhóm cùng kích thước tiêu đề chuẩn các bảng. Giữ snapshot layout từ trước mở nhóm/focus bất kỳ input đến khi đóng dialog, bỏ điều kiện chênh rộng80px khiến snapshot bị vô hiệu khi bàn phím thu viewport. Không co bảng khi tìm kiếm/nhập tên. Desktop giữ nguyên. Build/typecheck PASS; dist index-CawE3Qtj.js có create-group-frame-title. Chưa QA bàn phím/browser thật.

- 2026-10-24: Theo user, mở Tạo nhóm MOBILE focus panel bằng preventScroll thay autoFocus ô tên để không tự bật bàn phím. Nhãn Tên nhóm giảm10%; chữ hai ô nhập về0.85em, padding trái7px (ô tìm kiếm tính từ icon), thêm icon nhóm vàng trước Bạn bè. Desktop giữ nguyên. Build/typecheck PASS; dist index-B3YA0zzV.js/index-D_lfgq5P.css xác nhận padding; chưa QA trên điện thoại thật.

- 2026-10-24: Theo user, ba nhãn Tên nhóm/Bạn bè/Thành viên đã chọn MOBILE dùng cùng icon nhóm28px cố định (tránh size-6 co theo spacing SocialDialogFrame); thêm icon cho thành viên đã chọn. Hai ô tên/tìm kiếm tăng đệm trái7→14px, giảm cao8→6.5% với min32px. Giữ desktop/luồng chọn và kích thước bảng. Build/typecheck PASS; dist index-D1XGJ78S.js/index-6V5jZa5X.css xác nhận; chưa browser QA.

- 2026-10-24: Theo user, Tạo nhóm MOBILE thu icon tiêu đề về1em theo chữ, kính tìm kiếm1em so với chữ input0.85em. Dòng bạn bè avatar48px, chấm trạng thái10px xanh online/cam offline ưu tiên socialStore.online rồi presence contact; có nhãn accessibility. Khoảng avatar→tên/ID10px cố định; nút cuối36px/dấu cộng30px. Dùng px riêng tránh spacing của SocialDialogFrame làm co chi tiết. Giữ desktop/API. Build/typecheck PASS; dist index-vuFzQx8g.js/index-DyhYhgh-.css cập nhật; chưa browser QA.

- 2026-10-24: Theo user, Tạo nhóm MOBILE chỉ lấy friends.status=accepted từ socialStore, refresh social khi mở có account; không nhập hội thoại chưa kết bạn hoặc dữ liệu demo. Avatar/khung dùng AccountAvatar với avatarCode/avatarFrameCode thật ở cả danh sách và thành viên đã chọn; payload cũng lọc theo bạn bè hiện tại. Icon nhóm1.15em, gap chữ10px. Danh sách chia3hàng trừ2gap6px, padding trái avatar10px. Nhãn Thành viên đã chọn padding dọc10px, ô dưới chia4slot với3gap8px, quá4 cuộn ngang. Desktop giữ nguyên. Build/typecheck PASS; dist index-diVa_jU1.js/index-Qao9CWZx.css xác nhận3slot; đã đối chiếu API social có trường avatar; chưa browser/API live QA.

- 2026-10-24: Theo user, nhãn Thành viên đã chọn MOBILE cùng0.9em với Tên nhóm;4slot chọn/trống đều aspect-square/rounded-full, tên dưới vòng tròn. Hai nút cuối thu rộng84%/cao7%/chữ0.9em. Bộ đếm chỉ số lượng đã chọn, gỡ trần chọn20 và trần50 tại createConversation backend theo yêu cầu không giới hạn số người; vẫn validate mảng/ID/loại trùng và direct chat đúng1người. Build/typecheck PASS; dist index-BcDuYPbV.js/index-Cp0tHSXr.css xác nhận; chưa browser/API live QA, không restart/deploy backend.

- 2026-10-24: Theo user,4vòng tròn thành viên MOBILE căn tâm dọc theo chính vòng tròn; tên đặt absolute bên dưới để không kéo lệch tâm. Số đã chọn tăng0.9→1.05em, đệm phải8px. Nút cuối dòng luôn dấu cộng, khi chọn brightness50% tối hơn; aria-pressed và toggle bỏ chọn giữ nguyên. Build/typecheck PASS; dist index-CcR8tXeS.js/index-CuxxeEen.css xác nhận; chưa browser QA.

- 2026-10-24: Theo ảnh user, thẻ đã chọn MOBILE đổi thành chữ nhật bo16px/nền nâu, avatar neo trên đệm6px và giới hạn65cqh để tên nằm gọn bên dưới trong thẻ. Nút bỏ chọn neo cạnh avatar; vẫn4slot/cuộn ngang, slot trống giữ vòng tròn dấu cộng như ảnh. Bộ đếm giữ số đơn không giới hạn theo yêu cầu trước. Build/typecheck PASS; dist index-BEGDesw4.js/index-WuZHXD13.css xác nhận; chưa browser QA.

- 2026-10-24: Theo user, dấu× bỏ thành viên đã chọn MOBILE chồng trên artwork avatar bằng z30; dịch trái3px (right-5→-2) và lên3px (top-3→-6). Không đổi avatar/thẻ/luồng. Build/typecheck PASS; dist xác nhận offset mới; chưa browser QA.

- 2026-10-24: User đính chính dấu× MOBILE dịch sang phải3px thay trái3px ở yêu cầu trước: right=-8px so với gốc-5px, giữ top=-6px/z30. Build/typecheck PASS; dist index-vLu90JMV.js xác nhận. Chưa browser QA.

- 2026-10-24: Theo user, Tạo nhóm MOBILE tách row/thẻ khỏi button: avatar ở danh sách và đã chọn đều gọi onViewInfo hiện ProfileDialog thật qua callback Home hiện có; chỉ nút+ thêm thành viên, đã chọn bấm+ không bỏ; chỉ nút× trong thẻ dưới bỏ chọn. Tránh nested button bằng sibling controls; chấm presence z30 đè artwork/khung avatar và pointer-events-none. Giữ offset×/dữ liệu/desktop. Build/typecheck PASS; dist xác nhận presence overlay; chưa browser QA.

- 2026-10-24: Kiểm tra Xếp hạng dùng ranking-title-transparent.png chứa chữ raster. Theo user dùng imagegen built-in edit nguồn đó tạo messages-title-gold-v2.png (Tin nhắn) và create-group-title-gold-v2.png (Tạo nhóm): prompt giữ biển đỏ/viền vàng/tua/font serif vàng nổi nghiêng, chỉ đổi chữ, alpha. Hai asset lưu src/assets/messages, bản gốc giữ nguyên. SocialDialogFrame thêm titleCrop opt-in SVG viewBox theo alpha bounds y179..544/181..544 để bỏ lề transparent khi render, giữ header geometry chuẩn Xếp hạng; bỏ chữ HTML riêng của2bảng mobile, h2 sr-only giữ accessibility. Xếp hạng/laptop không đổi. Đã xem cả2ảnh chữ đúng dấu; build/typecheck PASS; dist có2PNG mới; chưa browser QA.

- 2026-10-24: Theo user, riêng hội thoại MOBILE dùng artwork conversation-chat-frame.png như laptop, surface chọn hội thoại bỏ SocialDialogFrame/title/landscape trang trí riêng để header nâu sát đầu trong viền ảnh; danh sách vẫn biển Tin nhắn mới. Header compact back tròn28px/chevron SVG18, avatar28px, padding phải6px để nút more sát viền nội dung. Message list chặn tràn ngang; ẩn riêng lỗi tải tin cũ trong hội thoại mobile (lỗi gửi/thao tác vẫn báo). Desktop không đổi. Build/typecheck PASS; dist xác nhận compact pr6; chưa browser QA.

- 2026-10-24: Theo user, ẩn riêng lỗi tải tin trên cả danh sách/hội thoại MOBILE (trước chỉ hội thoại), lỗi thao tác khác giữ. Hội thoại mở inset ngang3→1.2% để thanh nâu phủ sát viền; bottom3→1.5%. Avatar header34px/more26px; thanh soạn58px, input38px/chữ16, ảnh30/icon22, emoji28/gửi32, gap6px. Desktop giữ nguyên. Build/typecheck PASS; dist xác nhận input38; chưa browser QA.

- 2026-10-24: Sửa hội thoại MOBILE lem viền do inset1.2%/bottom1.5% quá sát artwork: vùng nội dung lùi left2.6%/right3.2%/top4%/bottom3.2%, giữ overflow-hidden để header/soạn tin nằm trong viền vàng. Header nâu giảm min64→cao54px cố định compact, avatar34px giữ. Build/typecheck PASS; dist xác nhận header54; chưa browser QA.

- 2026-10-24: User đính chính hội thoại MOBILE dùng chính khung Tin nhắn: MessagesDialogSurface luôn SocialDialogFrame/biển Tin nhắn cho cả list/chat, gỡ activeChat bypass. Pane chat chỉ dùng phần nền cảnh laptop crop SVG viewBox30/45/820/910 để không có viền thứ2; nội dung full bên trong frame chung/overflow-hidden. Giữ header54/avatar34/more26/soạn58 và desktop. Build/typecheck PASS; dist index-E3M_sO9R.js xác nhận crop; chưa browser QA.

- 2026-10-24: Theo user, hội thoại MOBILE vẫn khung Tin nhắn nhưng bỏ phần biển/khoảng landscape phía trên khi đang chat bằng hideTitle, contentStyle padding0/overflow-hidden để thanh nâu sát mép trong khung; nội dung phủ nền trang trí, list vẫn title Tin nhắn. Thanh soạn66px/input44/ảnh34/icon25/emoji32/gửi36. Desktop giữ. Build/typecheck PASS; dist index-BfQ24YI8.js xác nhận; chưa browser QA.

- 2026-10-24: Theo user, hội thoại MOBILE thu nút ảnh34→30/icon25→22; emoji dùng SVG mặt cười thay glyph, ô emoji32px/gap4/chữ24 để không chồng do spacing scale. Bấm emoji blur ô nhập, chọn emoji không focus input trên mobile; chỉ chạm input mở bàn phím/đóng emoji. Mở options đóng emoji/blur và ẩn form soạn (giữ draft). Sửa send: cache ID hội thoại mới, tách lỗi send khỏi reload sau send, hiển thị lỗi API thật. Phát hiện fallback createClientId trước trả client-* bị server uuid reject: đổi fallback UUIDv4 với time/counter/random nonsecurity;3/3 client-id tests PASS. Local health3001/5173=200, readonly DB kiểm đủ cột chat; db:verify qua tsx lỗi uv_os_get_passwd ENOMEM của môi trường nên không xác nhận toàn schema. Chưa gửi bằng2phiên đăng nhập thật/browser QA. Build/typecheck PASS; dist index-DJUab4aG.js/index-BfwiGioW.css xác nhận thông báo riêng sau gửi. Không restart/deploy hoặc tạo tin test trong DB thật.

- 2026-10-24: Theo user, hội thoại MOBILE hiện lại biển Tin nhắn; bỏ hideTitle và overflow-hidden trên contentStyle để không cắt biển vươn trên khung. Gửi bằng pointer giữ focus input qua preventDefault pointerdown, Enter giữ tự nhiên; pointer ngoài composer blur/đóng emoji. Không focus khi chọnemoji theo yêu cầu trước. Bubble chữ16px/line1.4/padding12×8/gap10/avatar tin32px; desktop giữ giá trị cũ. Build/typecheck PASS; dist index-XQFc7Dlg.js/index-C3R3o7uu.css xác nhận composer marker; chưa QA bàn phím điện thoại thật.

- 2026-10-24: Theo user, hội thoại MOBILE biển Tin nhắn đè lên thanh nâu, thanh nâu bắt đầu sát mép trong trên. SocialDialogFrame thêm overlayTitle opt-in: header absolute/z30/pointer-events-none, không chiếm khoảng flex, ẩn landscape đầu khung. MessagesDialogSurface chỉ bật khi activeChat; list/Tạo nhóm/bảng khác giữ mặc định. Build/typecheck PASS; dist xác nhận overlayTitle; chưa browser QA.

- Kiểm chứng lượt overlayTitle: build đầu Vite dừng mã-1073740791 sau transform; chạy lại npm.cmd run build thành công exit0, dist index-DHbtn2Fg.js/index-C3R3o7uu.css có overlayTitle.

- 2026-10-24: Theo user, bỏ biển Tin nhắn riêng hội thoại MOBILE (hideTitle cùng overlayTitle để thanh nâu sát trên và không landscape); list vẫn có biển. Options ba chấm mobile phóng từ80% sang tối đa96% rộng/94% cao, giữ aspect894:1008; thêm uiScale opt-in nhân tỷ lệ nới width với scale hiện tại để font/icon/khoảng cách/nội dung tăng cùng ảnh và avatar. Desktop giữ kích thước và token cũ. Build/typecheck PASS; dist xác nhận uiScale; chưa browser QA.

- 2026-10-24: Theo user tăng chiều cao bảng ba chấm MOBILE: dùng94% chiều cao khung Tin nhắn, bỏ clamp theo aspect/chiều ngang; giữ width/uiScale hiện tại và laptop. Các vùng đặt theo phần trăm tự giãn dọc. Build/typecheck PASS; dist index-CvRHxYtH.js xác nhận; chưa browser QA.

- 2026-10-24: Theo user, options MOBILE avatar tăng token200→270 theo width; camera nhóm dùng width=height9.5% panel/đệm cân để tròn thật, neo cạnh avatar. Các action mobile thống nhất fullwidth800×90logical/gap12, chung OptionRowBackground/icon34/chữ22, giữ handlers; slot Xem thành viên cùng kích thước/vị trí theo quyền owner. Dùng MessagesBackButton chung với hội thoại (28px ở chat/32px options) để cùng mẫu tròn/chevron; desktop options giữ ảnh back/rowlayout cũ. Build/typecheck PASS; dist index-BfkCZxzT.js cập nhật; chưa browser QA.

- 2026-10-24: Theo user, options MOBILE khôi phục riêng thẻ Đổi tên nhóm: blankActionButton/icon bút/chữ cũ và vị trí/kích thước289/388/317/77; các dòng còn lại giữ đồng bộ. Khung ngoài chuyển sang SocialDialogFrame như Tin nhắn, hideTitle/overlayTitle và bỏ ảnh frame cũ trên mobile; body/scene/handlers giữ, desktop còn khung cũ. OptionsFrame module-level tránh remount khi stateđổi. Build/typecheck PASS; dist index-R1l0KLeo.js xác nhận message-options-title; chưa browser QA.

- 2026-10-24: Theo user, bỏ nút× ngoài bảng options MOBILE qua hideClose opt-in SocialDialogFrame, giữ back. Bảng Xem thành viên mobile rộng100% vùng popup/cao94%, inset3%, viewport list76% chiều cao options thay chiều cao8hàng ở danh sách hội thoại; title20px/tên16/avatar40px, vẫn8hàng/cuộn. Desktop giữ. Build/typecheck PASS; dist có hideClose; chưa browser QA.

- 2026-10-24: User chốt ba chấm MOBILE là trang trong cùng khung: gỡ OptionsFrame/SocialDialogFrame riêng khỏi options; options phủ100% vùng nội dung hiện tại với nền nâu opaque, role=region thay nested dialog, không backdrop click để đóng. Khung Tin nhắn duy nhất giữ nguyên, ẩn nút× khi optionsOpen theo yêu cầu trước; nút back trở lại chat giữ draft/history. Dimensions tính avatar/rows theo vùng khung hiện tại, desktop giữ modal/artwork cũ. Build/typecheck PASS; dist index-Bm2NZYK0.js cập nhật; chưa browser QA.

- 2026-10-24: Theo user, background trang options MOBILE phủ kín ngang và sát mép trên: body inset0/100%×100%, scene x0/y0/rộng894logical, gradient hòa nền cũng fullwidth. Không đổi content/khung/laptop. Build/typecheck PASS; dist index-DpKMkuXU.js xác nhận; chưa browser QA.

- 2026-10-24: Theo user, back options MOBILE cùng chat28px/left6/top13. Xem thành viên dùng DialogCloseButton compact scale width/1120 như ngoài Tin nhắn; khóa người tạo z30 đè avatar/frame. Mỗi dòng mobile thêm nút text... cuối hàng, nền trong suốt/không viền tròn, mở mục Xem thông tin nối callback profile có sẵn; không thêm quyền quản trị/loại thành viên. Build/typecheck PASS; dist index-B3tKRkL6.js/index-hA2D6FGp.css xác nhận; chưa browser QA.

- 2026-10-24: Theo user, quyền ở Xem thành viên MOBILE tính theo người đang xem: thường chỉ icon kết bạn; chủ nhóm (khóa vàng/canManageGroup) thấy... mở Xóa khỏi nhóm/Kết bạn. Không hiển thị action bản thân. MessagesMemberFriendButton dùng useMessageFriendship luồng thật; đã bạn/đã gửi disable, lời mời nhận cho chấp nhận. Bổ sung member remove API: validate ID, transaction khóa conversation, chỉ active owner group được remove active member, cấm removeowner; update left_at, không xóa user/tin. UI chỉ cập nhật sau API thành công, lỗi hiện trong bảng. Build đầu parse lỗi dấu ngoặc JSX đã sửa; build/typecheck cuối PASS; dist có Xóa khỏi nhóm. Chưa browser/API thao tác thật, không xóa thành viên test hoặc restart/deploy.

- 2026-10-24: Theo user, menu thành viên MOBILE đặt bên trái nút.../tâm dọc bằng bounding rect tương đối memberpanel, render ngoài ul để không bị clip khi hàng đầu. Xóa khỏi nhóm thêm SVG× đỏ24px, hr ngang vàng ngăn với kết bạn. Đã kết bạn không disable nữa: bật confirm Xóa bạn/Hủy; chỉ xác nhận mới gọi socialActionByName remove (local demo setFriendship), pending khóa thao tác; quan hệ/nhóm tách riêng. Build/typecheck PASS; dist index-PNc4qTci.js/index-cEH_G9V8.css xác nhận; chưa browser/API thao tác thật, không xóa bạn thử trongDB.

- 2026-10-24: Theo user, confirm xóa bạn trong Xem thành viên dùng chính MessagesFriendRemovalConfirmation như hội thoại, bỏ popup tự dựng; cùng nền/viền/nút Hủy-Đồng ý/checkbox Không hiển thị lại. Chọn skip lưu mốc10phút theo quy ước hook hiện có, sau mốc hiện lại. Guard pending chống gọi lặp; chỉ thay friendship, không loại khỏi nhóm. Build/typecheck PASS; dist index-CMAJ-MP-.js cập nhật; chưa browser/API thao tác thật.

- 2026-10-24: Theo user, sửa tràn2nút confirm chung: bỏ min-width210logical, grid2cột min0/w100%/padding3 để Hủy-Đồng ý nằm trong panel ở mọi consumer. MessagesFriendRemovalConfirmation thêm message/showSkip/pending/error tùy chọn. Xóa khỏi nhóm nay chỉ mở confirm cùng mẫu, luôn có Hủy/Đồng ý/không checkboxskip; chỉ Đồng ý mới gọi API, pending khóa2nút/chốnglặp, lỗi ở trong confirm. Xóa bạn cũng khóa nút khi pending và hiển thị lỗi cùng mẫu. Build/typecheck PASS; dist xác nhận prompt khỏi nhóm; chưa browser/API thao tác thật.

- 2026-10-24: Theo user, menu...2mục Xem thành viên thêm lớp bắt click ngoài trong memberpanel z35, menu z40; chạm ngoài đóng và không kích hoạt hàng bên dưới. Trang options ngoài hội thoại hiện lại DialogCloseButton của khung chung;× gọi dismissOptions quay về chat, không đóng toàn hộp Tin nhắn. Build/typecheck PASS; dist xác nhận Đóng menu thành viên; chưa browser QA.

- 2026-10-24: Theo user, ô tìm kiếm list Tin nhắn MOBILE và input Đổi tên/Biệt danh dùng mẫu Bạn bè: nền nâu gradient#5a3219/#2b1508, viền inset vàng4lớp, bo10px/chữArial16/placeholder14 màu kem. Tách token messagesInputStyles tái dùng2nơi, giữ logic search/layout snapshot và submitrename; desktop/Friends không sửa. Build/typecheck PASS; một lần ghi MessagesDialog bị filemapped đã sửa bằng apply_patch/buildlại; dist xác nhận placeholder mẫu Friends; chưa browser QA.

- 2026-10-24: Theo user, form Đổi tên/Biệt danh MOBILE cao100logical/min58px/rộng800logical thay682×77; input44px, nútHủy/OKcao40px/minrộng44/chữ16. Giữ mẫu ô Friends/submit/cancel và desktop. Build/typecheck PASS; dist xác nhận nút40×44; chưa browser QA.

- 2026-10-24: Theo user, ô soạn chat MOBILE dùng cùng messagesFriendsField/messagesFriendsInput như tìm kiếm/Đổi tên, cao44px/đệm10px; giữ draft/focus/gửi/emoji và desktop. Build/typecheck PASS; dist index-C85eOQNQ.js xác nhận; chưa browser QA.

- 2026-10-24: Theo user, bỏ thông báo Không lưu được biệt danh khỏi catch rename/title trong MessagesDialog; vẫn gọi API và chỉ reload khi thành công, không ghi giả dữ liệu khi thất bại. Build/typecheck PASS; dist index-C1VOvVBj.js không còn chuỗi lỗi cũ. Chưa browser/API live QA.

- 2026-10-24: Theo user, avatar từng người trong Xem thành viên là button gọi onMemberInfo(member) mở ProfileDialog có sẵn, đóng menu... trước; giữ vòngavatar40px/khóa vàng z30 và dữ liệu, không đổi membership. Build/typecheck PASS; dist xác nhận onMemberInfo; chưa browser QA.

- 2026-10-24: Theo user, nhóm mới tạo lên đầu Tin nhắn. Nguyên nhân backend order last_message_at NULL của nhóm chưa tin bị đẩycuối; đổi order COALESCE(last_message_at,created_at) DESC,created_at DESC,id DESC để nhóm mới đúngthứtự cả polling/mởlại. Client sau create/reload đưa id nhóm mới lênđầu ngay và xóa query; local đã prepend giữ nguyên. Không ghi tin giả/đổi dữliệu tin. Build/typecheck PASS; dist index-gOgMGD3M.js cập nhật; chưa browser/API live QA, không restart/deploy backend.
