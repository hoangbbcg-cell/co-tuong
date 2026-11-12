- 2026-11-08: Phòng thế cờ riêng trên laptop: cụm Đổi bên/Đi trước nằm dưới người chơi bên trái (trong PlayerCard), to hơn (nút tròn 44px, chữ 15px). Điện thoại giữ cụm dưới bàn bên trái. Mọi giao diện bàn đấu điện thoại: Back, tin nhắn, Lưu, menu ba gạch và năng lượng hạ 8px (bottom 16→8, Cờ Úp 8→0). Laptop các nút đó không đổi.

- 2026-10-28: Tạo nhóm LAPTOP overlay dùng fixed phủ viewport; popup tối đa90% ngang/94% cao. Dải chọn thành viên dùng 4 cột, vòng tròn theo chiều cao để không tràn; action buttons70% ngang; ba icon nhóm0.9em. Mobile giữ nguyên.
- 2026-10-28: Tạo nhóm LAPTOP dùng cùng markup/form/list/member-selection flow và accepted-friends source socialStore như MOBILE. Giữ kích thước outer popup desktop, callbacks tạo nhóm/xem hồ sơ/chọn thành viên; thay hẳn nhánh tọa độ desktop riêng.
- 2026-10-28: Tạo nhóm LAPTOP dùng viền CSS chung SocialDialogFrame (radius, border, gradient, inset shadows) thay border-image PNG; kích thước và tọa độ nội dung giữ nguyên. Mobile không đổi.
- 2026-10-28: Đính chính Tùy chọn Tin nhắn LAPTOP: viền dùng cùng CSS outer frame của ProfileDialog (Thông tin)—border radius/width, gradient và inset shadows trên hộp pixel-sized; bỏ frame PNG/SocialDialogFrame riêng. Giữ kích thước popup, body đặt inset bên trong viền; mobile không đổi.
- 2026-10-28: Tùy chọn Tin nhắn LAPTOP áp dụng cách MOBILE: không vẽ thêm SocialDialogFrame/khung popup riêng, dùng options body bên trong khung Tin nhắn cha; giữ nguyên kích thước popup và nhánh mobile.
- 2026-10-28: User chốt giá Shop tuần:5avatar thường10.000 vàng/món;4Tây Du Ký (42 Tôn Ngộ Không,38 Đường Tăng,45 Trư Bát Giới,46 Sa Tăng)12.000 vàng/món. SHOP_PRODUCTS dùng nhóm chuẩn chung để API tuần/hiển thị/xác nhận/giao dịch server lấy cùng giá; chợ ngày3.000 giữ nguyên. Kiểm tra catalog Node PASS toàn bộ nhóm; build/typecheck PASS; dist cập nhật; chưa browser/giao dịch DB QA, không phát sinh mua thử.

- 2026-10-28: Ý tưởng backlog do user yêu cầu: theo dõi người chơi trong Bạn bè và nhận thông báo hoạt động liên quan trong Luyện cờ. Chưa triển khai; loại hoạt động, cài đặt, quyền riêng tư và nơi hiển thị thông báo cần chốt khi làm. Chi tiết: ../../docs/backlog/social/theo-doi-nguoi-choi-va-thong-bao-luyen-co.md.

- 2026-10-28: Ý tưởng backlog do user yêu cầu: sưu tập đủ bộ avatar/khung/hiệu ứng/skin để nhận dấu ấn; mở rộng Thông tin hồ sơ với skin, ghi chú cá nhân và liên kết mạng xã hội. Chưa triển khai; điều kiện bộ sưu tập, xác minh liên kết và quyền riêng tư cần chốt lúc làm. Chi tiết tại ../../docs/backlog/social/bo-suu-tap-bo-do-va-dau-an.md và ../../docs/backlog/ui/thong-tin-ho-so-mo-rong.md.

- 2026-10-28: Theo user, Tin nhắn MOBILE > Lời mời dùng cùng chiều cao dòng tab Tất cả: (100%−36px)/7, gap6px. Icon tròn Lời mời vào nhóm và avatar nhóm72cqh theo container dòng như avatar Tất cả, bỏ inline52px cố định của icon. Laptop giữ nguyên. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: User đính chính thứ tự tiện ích bàn cờ LAPTOP trái→phải là Lưu → Ba gạch → Phóng to (order1/2/3), thay thứ tự trước. Back mr-auto giữ cụm tiện ích sát phải cả khi nút Lưu ẩn; mobile giữ nguyên. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Theo user, ẩn riêng lỗi tải inbox Không tải được tin nhắn. phía đáy trên LAPTOP; mobile đã ẩn trước đó. Các lỗi khác và cơ chế tải/retry giữ nguyên. Build/typecheck PASS, dist cập nhật.

- 2026-10-27: Theo user options chat LAPTOP avatar200→180logical, tên34→40logical theo width894; camera nhóm đi theo avatar mới. Form Biệt danh thay đúng dòng Biệt danh tại x47/y487/w800/h90 bằng các dòng khác; Xem thông tin giữ hiện khi sửa desktop, mobile giữ UI cũ. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: User chốt thứ tự tiện ích bàn cờ LAPTOP từ trong ra ngoài (trái→phải): Toàn màn hình → Ba gạch → Lưu ván đấu. Dùng desktop order1/2/3 trong header, menu neo dưới ba gạch; mobile giữ nguyên. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Theo user đổi thứ tự tiện ích bàn cờ LAPTOP: cụm Lưu/Toàn màn hình đứng trước nút ba gạch (desktop order1/2); mobile giữ thứ tự hiện hành. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Theo user, tùy chọn chat riêng LAPTOP đồng bộ mobile: Xem thông tin/Biệt danh/Chặn/Xóa/Báo cáo mỗi dòng full800logical, cao90, bắt đầu385/nhịp102; bỏ hai ô nhỏ cạnh nhau và mốc cũ. Dùng renderer icon/chữ/nền dòng chung hiện có, hành vi và mobile giữ nguyên. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user cả mobile/laptop, tên trong dòng Xem thành viên/Tất cả/Trưởng-phó/Đã chặn/Thêm thành viên/Thêm phó cách avatar thêm4px bằng margin tên cục bộ; không đổi avatar/kích thước dòng và khoảng cách nút. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, bàn cờ LAPTOP bỏ nút ghim Lưu thế cờ, hiện nút ba gạch; menu chung chứa Bạn bè/Âm thanh như mobile, mở xuống dưới trên laptop và lên trên trên mobile. Lưu ván đấu/Toàn màn hình laptop giữ ngoài menu; giữ callback và điều kiện replay/máy. Mobile giữ vị trí/menu cũ. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Theo user riêng LAPTOP Xem thành viên và các tab liên quan: avatar user50→64logical, tên32logical theo width894 (gồm blocked/pending/invite/deputy/leaders), heading Thành viên(số)/tiêu đề tab36logical. Dùng biến cục bộ member section, mobile/geometry phần khác giữ nguyên. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, options laptop nền dưới nâu đặc#281205 như mobile, che hoa văn trong nhưng giữ viền khung. Gap nút giảm12→8logical (nhịp102→98/cao90), chữ dòng22→28/icon34→42/tên28→34 theo scale width894; mobile giữ nguyên. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, riêng popup So tài LAPTOP chữ Không hiển thị lại12→14px; cụm tên/muốn so tài nâng4px. Mobile giữ nguyên. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Theo user, popup nhận So tài LAPTOP rộng320→360px/padding12→16, nội dung20px; tên dùng cùng font/cỡ với chữ muốn so tài, số trong tên1em. Avatar riêng popup48→60px; viền/danh hiệu/sao giữ component và tỷ lệ chung, bật optimize-contrast cho ảnh/background riêng desktop để cải thiện sampling. Nút nhận/từ chối64×34; mobile giữ nguyên. Build/typecheck PASS; dist xác nhận; chưa browser QA độ nét, chưa khẳng định hết mờ.

- 2026-10-27: Theo user, options Tin nhắn LAPTOP căn giữa viewport bằng overlay fixed; trang Cài đặt và Thành viên (gồm các tab/subpage) dùng cùng khung SocialDialogFrame giữ viền3%, không đè khung bằng nền opaque full. Desktop dùng cùng renderer dòng OptionRowBackground/icon/chữ HTML như mobile và scale token theo width/894; mobile giữ bố cục hiện hành. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo ảnh user, thông báo hành động trong Thông tin LAPTOP (ví dụ người chơi offline) dùng kiểu mobile: nền nâu phẳng/viền kem, nút vàng vuông nhẹ, rộng360px tối đa viewport−48px, chữ18px/padding20px. NoticeOverlay vẫn giữa viewport; dùng chung cho mọi profileActionFeedback, không đổi logic. Build/typecheck PASS; dist xác nhận style mới; chưa browser QA.

- 2026-10-27: Theo user phóng options nhóm laptop thêm: rộng min(90% dialog,(viewportH−48)×894/1008), cao theo đúng tỷ lệ894:1008. Chuẩn hóa nút desktop như mobile: y385/487/589/691/793, cao90/gap12logical; bỏ offset owner91 cộng trùng, member cùng nhịp, không đổi mobile. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, thời gian dòng inbox laptop đổi sang nâu#76552e như mobile. Bỏ nhánh mobile render MessagesCreateGroupButton cũ; dùng chung header search+bánh răng SettingsIcon44px mobile/50token desktop, menu Tạo nhóm giữ callback thật và khóa layout mobile. Menu đóng pointerdown ngoài và reset khi dialog đổi open. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Tin nhắn laptop: search giảm padding16→8/gap12→4 để placeholder dịch trái; bảng options mở rộng (giới hạn cao96%/rộng92%), dùng SocialDialogFrame cùng khung Tin nhắn thay ảnh frame cũ; back desktop tròn38px; các dòng group xếp liên tục91logical từ388 (owner có thêm dòng Settings), bỏ khoảng trống cũ. Icon lời mời giữ kích thước vuông52×52 để luôn tròn. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo user, Back trong Danh hiệu dịch trái8px thật cả mobile/laptop. X trong Thông tin, Tùy chỉnh avatar, Chọn địa chỉ, catalog và chi tiết Danh hiệu đóng toàn bộ ProfileDialog; Back giữ quay về Thông tin. Dùng callback đóng ngoài thay đóng riêng màn con. Build/typecheck PASS; dist cập nhật, chưa browser QA.

- 2026-10-27: User xác nhận khôi phục Tin nhắn laptop bảng nền giấy sáng/từng dòng kem trước lúc lỗi. Khôi phục ô tìm ngang+bánh răng/Tạo nhóm, hai tab Tất cả/Lời mời (hook/API lời mời thật), row90px/gap4/chữ24 và21, overlay chọn đen10%, avatar header78%/tênlight, nới ngang120logical trong viewport. Giữ khungchat/padding hiện có và X chung. Build/typecheck PASS, dist cập nhật; chưa browser QA; phục hồi bố cục theo yêu cầu, không khẳng định toàn bộ logic của phiên bản file đã mất được phục hồi.

- 2026-10-27: Sửa khung Tin nhắn laptop bị trộn sau khôi phục file: dialog/surface cùng layout.width×scale và layout.height×scale, nội dung flex1 đúng lòng khung, bỏ X cũ trùng. Khôi phục sidebar giấy/row90px và nối settings chatDisabled/deputyChatAllowed/onSetChat thật qua API để build lại. Build/typecheck PASS, dist cập nhật; chưa browser QA. Không khẳng định đã phục hồi toàn bộ thay đổi MessagesDialog đã mất.

- 2026-10-27: Theo user, hoàn tác riêng dịch chuyển nút X compact/mobile, từ translate(32,-34) về translate(16,-18); laptop giữ translate(32,-34). Build chưa chạy do lỗi typecheck MessagesDialog đã ghi nhận.

- 2026-10-27: Theo user, mobile chat tăng gap avatar–bubble phía người kia thêm3px (gap15px); bubble tin nhắn của mình chừa thêm3px mép phải. Desktop giữ nguyên. Chưa build được do restored MessagesDialog thiếu tích hợp group chat controls; xem trạng thái hiện tại trong task.

- 2026-10-27: Theo user chỉnh mobile chat: gap avatar–bubble giảm18→16px; bubble tin nhắn gửi của mình inset phải3px khỏi viền. Desktop giữ nguyên. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo ảnh user, tăng gap avatar người gửi–bong bóng chat mobile từ12px lên18px; laptop giữ12px, gửi/nhận logic không đổi. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo user, tên người trong dòng inbox laptop tăng22→24px theo scale, nội dung tin nhắn preview19→21px; header chat tên font-normal→light. Giữ chiều cao90px và mobile. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Đính chính theo user: dòng inbox laptop giữ90px, tin nhắn preview bên trong tăng17→19px theo scale; tên header hạ medium→normal. Mobile giữ nguyên. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo user, tên hội thoại header dùng font-medium thay bold; dòng inbox laptop tăng90→100px theo scale. Mobile giữ nguyên. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo user, avatar header chat laptop thu tiếp10% (hiện78% size token66, mobile34px giữ). Bao toàn pane chat bằng customizationListPanel cùng token khung chọn avatar (bo10, viền nâu, nền nâu mờ, shadow trong); khung này bao cả nền/header/tin nhắn/composer. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo user, avatar hội thoại trong header Tin nhắn thu12% riêng laptop (66→58px tương đương), mobile giữ34px. Dòng đang chọn laptop dùng overlay đen nhẹ 12% và viền vàng mảnh; compact giữ messageSelectionHighlight. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo user, khung chat laptop hạ mép trên thêm10px và giảm chiều cao tương ứng10px, giữ đáy/nền tới viền. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Tin nhắn LAPTOP bù chính xác chiều cao header SocialDialogFrame (titleWidth×360/2166−62scale−14scale) bằng marginTop âm/tăng height pane để sát viền trên, giữ đáy. Nút X chung dịch thêm phải10/lên10px: translate32,-34. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo ảnh user, pane chat Tin nhắn LAPTOP mở đến viền trong khung lớn: bù padding phải/đáy2×spacing của SocialDialogFrame bằng marginRight âm và tăng chiều cao tương ứng. Nền/header/composer cùng phủ tới viền; mobile giữ nguyên. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo user nền Tin nhắn phủ full chiều cao: SVG image chatFrame preserveAspectRatio=none để ảnh phủ crop ở mọi tỷ lệ. Nút X chung DialogCloseButton dịch phải/lên thêm6px (translate22,-24 thay16,-18), áp dụng mọi bảng dùng component cả laptop/mobile; kích thước giữ nguyên. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Tin nhắn LAPTOP nới ngang120logical (chặn trong viewport24px), gap inbox8→4scale/lề20→6scale. Ẩn thông báo lỗi gửi phía đáy theo user. Chat crop ảnh viewBox30 45 820 910 bỏ viền baked, phủ đen45% cả trạng thái trống và hội thoại. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Theo user, hạ cả khung và dãy tab Danh hiệu LAPTOP thêm10px (khung top64→74px, tab81→91px trong quy đổi wrapper); nút back laptop28→34px, mobile giữ28px. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Đính chính hạ tab Danh hiệu LAPTOP: tab thực tế là các button absolute compact:hidden, không phải nav hidden/compact:flex. Tăng offset top26→81px trong phép quy đổi wrapper để dịch đúng55px; hoàn tác chỉnh nhầm nav/mobile. Khung giữ top64px. Build/typecheck PASS; chưa browser QA.

- 2026-10-27: Tab catalog Danh hiệu LAPTOP căn trên trong khung dọc bằng items-start, sau đó user yêu cầu hạ dãy tab thêm55px (top48→103px); mobile không đổi. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Thông tin → Danh hiệu cả điện thoại/laptop thêm MessagesBackButton dùng chung Tin nhắn (28px), góc trên trái ngang tâm nút Ẩn; bấm về Thông tin người chơi. Typecheck/build PASS, dist index-BRr6FbNI.js có nút mới; chưa browser QA.

- 2026-10-27: Theo user, đồng bộ khoảng cách các thẻ Đã lưu laptop với Ranking: row-gap8px×scale dialog. Mobile giữ7px như cũ. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo ảnh user, Lịch sử > Đã lưu laptop không ép hai dòng vào chiều cao panel: list dùng hàng max-content, mỗi thẻ đủ cao theo title/user/metadata/ghi chú và overflow-y-auto cuộn xuống. Giữ layout một hàng title/meta; bàn giữ tỷ lệ theo chiều cao thẻ ban đầu. Mobile markup/height policy unchanged. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Đính chính sau user: bỏ ép chiều cao cố định title/meta laptop; giữ title/meta mỗi phần trên một hàng và kích thước chữ, cho grid row tự tăng nếu nội dung cần. Parent list đã overflow-y-auto nên cuộn xuống khi thẻ dài; mini bàn giữ kích thước mount cố định. Mobile giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, thêm dải gradient + bóng mép trái giống dòng Xếp hạng cho từng dòng Lịch sử > Đã lưu ở cả laptop/điện thoại. Mobile scale dải theo1.5×rowScale như Ranking; không đổi khung, kích thước hoặc nội dung dòng. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Ổn định layout sau khi tăng tên/metadata Đã lưu laptop: tiêu đề khóa 1 dòng ellipsis, vùng cao32px×scale; metadata tăng16px theo scale (tối thiểu15), icon17–18px, vùng cao24px×scale để không kéo giãn grid/card/bàn. Điện thoại giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Đính chính theo user: không dùng chung khung dòng Xếp hạng cho Bạn bè/Lịch sử laptop và hoàn tác chiều cao138px. Bạn bè trở lại row90px/nền-gradient-border cũ; Đã chơi Lịch sử trở lại 8 hàng auto-height/khung cũ. Chỉ thêm dải gradient + shadow mép trái y hệt Ranking; giữ gap8px×scale đã chốt và FriendRowShade nâu. Mobile không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user, đồng bộ dòng Bạn bè và Lịch sử Đã chơi LAPTOP trực tiếp với Xếp hạng qua socialPlayerRowClass/getSocialRowStyle/socialPlayerListClass: cao138px×scale, bo/nền/viền và gap8px×scale. FriendRow giữ lớp nâu quanh danh hiệu/nút; mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user, Lịch sử > Đã lưu laptop tăng tên ván20→23px theo scale; metadata số nước/lượt đi tăng lên18px theo scale (tối thiểu15px) và icon theo dòng. Điện thoại giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, đồng bộ gap dòng Đã chơi Lịch sử và các danh sách Bạn bè với Xếp hạng bằng --social-row-gap=8px×scale; Lịch sử giữ 8 hàng bằng cách trừ tổng gap56px. Bạn bè LAPTOP căn hàng header tab Danh sách/Thêm bạn cùng cao56px để vị trí search và đầu danh sách cố định khi đổi hai tab; điện thoại không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user mobile Đã lưu: bỏ border/background/padding của textarea ghi chú để không có khung con. Khi đang sửa tên/ghi chú, pointerdown dấu tích giữ focus bàn phím; click tiếp tục gọi lưu, editor chỉ đóng sau API thành công. Mobile và desktop cùng hành vi lưu; desktop style ghi chú giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user riêng LAPTOP: tên Xếp hạng22→24px, Đã chơi Lịch sử21→23px, Bạn bè22→24px; trạng thái Xếp hạng19→21px và Bạn bè19→21px, tất cả theo scale dialog. Điện thoại giữ nguyên; không đổi cỡ trạng thái Lịch sử. Build PASS, dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user, khôi phục FriendRowShade nâu ở dòng Bạn bè laptop để bao danh hiệu và nút Mời chơi; giữ khung dòng90px và nội dung/cột đã chốt. Mobile không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: User làm rõ mẫu dòng Bạn bè laptop: chỉ lấy khung dòng (nền/viền/bo góc/shadow) từ Xếp hạng; giữ kích thước/cột/nội dung Bạn bè cũ, cao90px theo scale. Bỏ dải trái và nền nhấn cột đã thêm nhầm; mobile/lời mời không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user laptop/mobile, ghi chú Đã lưu tự mở hết trong khi sửa, lưu thành công mới thu về giới hạn dòng đang có. Lịch sử reset Đã chơi khi mở/đóng (X/Escape/native close/open attribute), unmount phần Đã lưu để bỏ draft tên/ghi chú, trạng thái mở/xác nhận/tooltip; không tự lưu draft. Dọn toast và chặn phản hồi lưu Đã chơi phiên cũ hiện toast sau đóng. Regression lifecycle2/2 PASS (TEMP workspace tránh ENOENT cache), typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo ảnh user, danh sách Bạn bè LAPTOP dùng khung dòng socialPlayerRowClass/getSocialRowStyle theo mẫu dòng Xếp hạng: chiều cao138×scale, bo góc/nền/viền, dải nhấn trái và vùng rank được tô nền; thao tác và thông tin bạn bè giữ. Lời mời giữ dòng90px cũ; mobile không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user, Bạn bè laptop bỏ khung/nền riêng của ul để các dòng nằm trực tiếp trên nền giấy; chuyển nền/viền bo từng dòng sang socialPlayerRowClass theo kiểu điện thoại, giữ cột nội dung và thao tác desktop. Mobile không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA. npm.cmd run build PASS, dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user, ghi chú Đã lưu laptop thu gọn tối đa2dòng và ellipsis khi dài hơn; click mở đầy đủ/click lại thu. Mobile giữ3dòng. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user riêng Đã lưu laptop: tên ván20px theo scale, ghi chú20px thay22/loại padding dọc9.5/nhích nhãn và nội dung lên. Đọc thu3dòng có ellipsis, click mở hết/click lại thu. Sửa giữ chiều cao đang hiển thị, nội dung có sẵn không tự nở; chỉ tăng khi số dòng thực tăng. Mini bàn lấy kích thước ban đầu theo scale, không quan sát chiều cao dòng nữa nên ghi chú không phóng bàn. Mobile giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, hover tab con chưa chọn của Bạn bè laptop dùng lớp phủ đen rất nhẹ thay cho xám/giảm opacity; tab đang chọn giữ nguyên glow, không hover. Mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Đính chính hover Bạn bè laptop theo user: tab đã chọn không có hiệu ứng hover, giữ nguyên hiệu ứng click/glow; chỉ tab chưa chọn mới mờ/xám khi rê chuột. Mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user riêng Bạn bè laptop, hover ba tab con giữ nguyên glow/tab effect đang chọn, chỉ giảm opacity và xám nhẹ; bỏ hover brightness sáng gây mất cảm giác selected. Mobile không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA. npm.cmd run build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, ghi chú laptop tăng chiều cao thêm5px (padding dọc7→9.5px) và chữ tăng7px (15→22px theo scale), gồm nhãn/nội dung/sửa; mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA.

- 2026-10-29: Hệ thống backup VPS test dùng local MySQL dump + media archive, age mã hóa trước khi upload Cloudflare R2 private; age private identity ở operator/offline, không lên VPS/GitHub. Timer 03:00 Asia/Ho_Chi_Minh, Persistent=false; installer chỉ cài units và daemon-reload, không bật timer. Backup/upload thật, restore, migration/deploy, timer activation và retention deletion cần phê duyệt riêng. Không cấp/lưu Admin Read account-wide trên VPS; operator kiểm tra Cloudflare dashboard và ghi attestation root:root0600 tối đa7 ngày, upload fail-closed khi thiếu/hết hạn/sai; rủi ro policy drift trong hạn cần nêu. R2 credential chỉ Object Read & Write scope bucket. Local/R2 retention dry-run mặc định, yêu cầu --apply + env gate, xác minh toàn bộ set/checksum/offsite status và giữ bản local/offsite hợp lệ mới nhất; backup/local-retention dùng chung /var/backups/cotuong-stage/.backup.lock. Timer vẫn disabled.

# Ghi nhớ quy tắc và lỗi cần tránh

- 2026-11-08: Replay view (Lịch sử) kiểu YouTube + Back theo người: ReplayControls bỏ nút Phát (controls-play-v2 loại khỏi bundle) cho mọi replay; ReplayTapOverlay đặt absolute inset-0 TRONG span khung số nước (chỉ `!practice`) — bấm ô số nước (X/Y vàng) toggle playback + icon trắng nhỏ giữa KHUNG SỐ mờ biến mất ~1s (transition 700ms sau 300ms, data-screenshot-exclude); icon phản ánh trạng thái: dừng → icon Phát, đang phát → icon 2 gạch; Enter/Space giữ nguyên; practice không có lớp. useLobby.join.onSuccess chỉ `enterCustomRoom` khi `room.customFen && room.ownerId === socket.id` (chủ phòng giữ Back về trial; người join mã/mời về Home như phòng thường). Test tests/replay-youtube-and-owner-join.test.ts; full 218 file/1107 test PASS; typecheck/build PASS; dist không còn controls-play; chưa browser QA.

- 2026-11-08: Phòng thế cờ riêng (customFen từ Vị trí tùy chỉnh Tạo bàn) trừ năng lượng lúc bắt đầu ván như PvP online, gồm ngoại lệ bạn bè accepted miễn trừ năng lượng; MatchRepository.start ghi rated=0 và gold_reward_eligible=0 nên complete không cộng/trừ Elo, không thưởng vàng, không cộng stats/honors. Thay phần "Năng lượng/Elo/vàng/kết quả giữ luật online PvP hiện hành" của quy tắc phòng custom cùng ngày. Phòng thường không đổi.

- 2026-11-08: Sửa tiếp cùng ngày: Đổi bên trong phòng custom là lệnh server `custom-swap-sides` (owner-only, phase!=playing) đổi side cả hai người ngồi — bàn cờ hai bên cùng lật, mỗi người đi quân màu ở dưới mình, không còn flip per-client. Hai field sessionStore: `customPositionSource` = positionFen thế gốc chụp trong usePositionEditor.start (Back từ trial về editor 'position' khôi phục thế ban đầu rồi clear — thay đích cũ screen 'computer'), `customRoomReturnFen` = positionFen trial.game chụp lúc bấm nút Tạo bàn (leaveImmediately custom branch loadPosition rồi clear → Back từ phòng trả đúng thế lúc Tạo bàn). session.leave không xóa 2 field; enterOnline/joinLocal/enterCustomRoom dọn. Compact phòng custom: controls dưới bàn trái (compact:row-start-3 justify-self-start), footer nút vàng bottom-164→148px. Test: roomService 6/6 custom-room-source, full 1104 PASS, build PASS dist GamePage-3EB5yOnB.js.

- 2026-11-08: Phòng "Thế cờ riêng" tạo từ Vị trí tùy chỉnh Đấu ngay: server roomService có helper roomGame dùng createRoomGame khi không custom, còn custom parse gameFromPositionFen(room.customFen) + currentTurn=customFirstTurn (fallback về turn FEN nếu thế mới gây Tướng đối mặt/bị chiếu); 5 vị trí dùng roomGame thay createRoomGame (advanceQueuedPlayer, join-finished, ready-rematch, reset, resetModeratedSeats). create(...) validate customFen qua gameFromPositionFen (chỉ variant 'xiangqi'), startMatch không bốc thăm lại phe trong phòng custom, list() lọc phòng custom, byCode(code) tìm theo mã (GET /api/rooms/by-code/:code). Lệnh custom-first-turn chỉ chủ phòng, phase!=playing, đặt trước nhánh player trong command(); ván playing hai nút CustomRoomControls (owner-only) disabled nhưng còn hiện; hết ván bật lại. Client: join snapshot có customFen → sessionStore.enterCustomRoom + customRoomReturn=true; leaveImmediately có branch custom bỏ local.reset/session.leave để Back về đúng bàn đấu positionTrial từ Vị trí tùy chỉnh (không về Home); GamePage remount (App key đổi theo room.id) rebuild trial từ gameStore nên mọi gate trial phải viết `positionTrial &&`. Năng lượng/Elo/vàng/kết quả giữ luật online PvP hiện hành; joinLocal/leave đặt customRoomReturn=false.

- 2026-11-07: Cờ Úp Đấu với máy dùng engine PikaJieQi (browser WASM tại public/jieqi, chỉ dữ liệu công khai, không đọc concealed vào FEN, chặn nước lặp) không qua server. Session computerEngine thêm 'pikaJieqi'; máy tên Ông Hoàng. Engine cần tài liệu cross-origin isolated: dev Vite server.headers và server/app.ts gắn COOP same-origin-allow-popups + COEP credentialless cho các phản hồi HTML. Thiếu COOP/COEP (ví dụ Safari không hỗ trợ credentialless) thì Đấu ngay Cờ Úp báo lỗi COOP thay vì vào ván; Đấu với máy Cờ Tướng fairy/Vị trí tùy chỉnh không chịu ảnh hưởng. Không dành engine pikafish server cho Cờ Úp; gợi ý Cờ Úp vẫn chặn theo quy tắc 2026-10-15.

- 2026-10-28: Vị trí tùy chỉnh LAPTOP phải có lề hai bên120px trong canvas; dùng desktop max-width calc(100% - 240px), tránh class width cũ bị global canvas override100%. User nói giới hạn khung, không phải giới hạn số quân. Mobile giữ fullwidth.

- 2026-10-27: Riêng catalog Danh hiệu LAPTOP, khung tab thấp hơn (72% vùng nội dung) và từng tab artwork cao42px; mobile giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, tăng nhẹ chữ Ghi chú ở Đã lưu/Ván đấu laptop từ13 lên15px theo dialog scale, gồm chế độ đọc và sửa; mobile giữ13px.

- 2026-10-27: Theo ảnh user, cụm quân giữa hai người trong Đã lưu/Ván đấu laptop căn giữa theo bề ngang riêng của cụm avatar+tên (không căn toàn ô thông tin), đồng thời giữ trung điểm dọc giữa hai hàng. Mobile giữ nguyên.

- 2026-10-27: Theo user riêng Bạn bè LAPTOP: filter tab con đang chọn bỏ nền gradient vàng, chuyển sang hiệu ứng sáng/rực nhẹ như mobile giữ nền idle chung. Hai ô tìm kiếm laptop (Danh sách/Thêm bạn) đổi font Heading nghiêng sang Arial thường cùng mobile, placeholder body thường. Không sửa FriendsDialog mobile. npm.cmd run build PASS; dist được cập nhật; chưa browser QA.

- 2026-10-27: Đính chính quân cờ giữa hai người trong lịch sử đã lưu laptop: vùng hai user dùng justify-content:space-between để người đầu ở trên, cụm quân cờ ở trung điểm dọc và người sau ở dưới trong ô thông tin; mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, cụm quân cờ giữa hai người trong dòng Đã lưu/Ván đấu laptop được đặt vào hàng riêng căn giữa vùng thông tin; mobile giữ cách hiển thị cũ. npm.cmd run build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Sửa copy ID lần nữa: execCommand fallback đồng bộ ngay trong click trước khi thử Clipboard API async, giữ user activation của trình duyệt; vẫn chép đúng số ID hiển thị và báo kết quả bằng toast gợi ý. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Đính chính vị trí con trỏ ghi chú: khi laptop sửa ghi chú đã có nội dung, đặt con trỏ cuối nội dung; ghi chú trống đặt đầu. Mobile giữ vị trí con trỏ cuối như trước. npm.cmd run build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, riêng ghi chú trong Đã lưu/Ván đấu laptop, bấm bút mở nhập ngay trong khung ghi chú hiện có (không vẽ khung textarea lồng), con trỏ đặt đầu nội dung; mobile giữ khung và vị trí con trỏ cũ. Build cần chạy sau chỉnh.

- 2026-10-27: Đính chính lỗi nút copy ID: PlayerInfoCard truyền đúng dãy số đang render vào handler; chỉ bật nút với ID toàn chữ số. Clipboard API chép chuỗi này, fallback textarea có vùng chọn/focus rõ và kiểm tra execCommand; kết quả báo qua gợi ý nổi. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Đính chính phần mini bàn Đã lưu laptop: bỏ trần chiều ngang; ResizeObserver lấy toàn bộ chiều cao trong khung dòng (trừ padding 7px mỗi mép) rồi tính rộng theo tỷ lệ bàn 1134:1296 để bàn phủ kín chiều cao. Khoảng cách nội dung ngang15px, avatar là vùng duy nhất mở hồ sơ, mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA. Build cần chạy sau chỉnh.

- 2026-10-27: Theo user, riêng Lịch sử > Đã lưu/Ván đấu LAPTOP, mini bàn tự căn theo chiều cao dòng và cách vùng thông tin 15px; trần rộng 30% danh sách. Chỉ avatar mở hồ sơ, tên và phần khác không mở; điện thoại giữ nguyên. Sửa selector kiểm tra thứ tự người chơi theo nút avatar sau khi tách vùng bấm. Build PASS, dist cập nhật; không chạy test hoặc browser QA.

- 2026-10-27: Nút sao chép ID trong PlayerInfoCard: dùng Clipboard API và fallback textarea/select rõ ràng; bỏ nhãn inline cạnh icon. Kết quả hiển thị qua gợi ý nổi dùng chung InviteSentNotice: “Đã sao chép ID”/“Không sao chép được ID”. Không đổi ID/dữ liệu hồ sơ. Typecheck/build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user riêng Đã lưu/Ván đấu LAPTOP: miniBoard178→224scale (cap30%list), grid bàncol1/span4row; title trên cùng col2–3 cạnh bàn, user48/name25scale thay34/21, khungnamefitcontent không kéo dài. Metadata và ghi chú chỉcol2–3 dưới user, không dưới bàn. Nút Xem đổi ▶ Xem lại151×52scale/chữ19 giống Đã chơi; thùngrác36×40/icon24px. Mobile giữ markup/geometry cũ, initialboard178 giữ. Typecheck/build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Shop tuần đúng6 avatar:5 ảnh thường code39/40/41/43/44 +1 random trong đúng4 Tây Du Ký code42 Tôn Ngộ Không/38 Đường Tăng/45 Trư Bát Giới/46 Sa Tăng theo ảnh user xác nhận. Thay mọi phân nhóm4 thường/5 Tây Du Ký trước đó; giữ ID/asset. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: VPS thử nghiệm mới `103.153.254.184`/Ubuntu24.04 chạy độc lập, ưu tiên IP/test, không DNS `hovanggame.com`, không copy/xóa dữ liệu hoặc tác động VPS cũ `103.9.78.75`. SSH key/Agent đã xác minh. Tự động hóa quản trị đang chuẩn bị local, chưa bootstrap/cài/đổi quyền. Sau duyệt, chỉ root-owned helper ở thư mục root-only với sudoers exact actions; không NOPASSWD ALL, không sửa SSH/firewall/secrets/MySQL data chưa duyệt. Fairy Linux binary/license/hash hiện chưa kiểm chứng nên fail-closed. Xem `docs/NEW-VPS-BOOTSTRAP.md` và `ops/vps-new/README.md`.

- 2026-10-27: Debug `install-node22`: root audit không thấy vi phạm trong `/opt/node-v22.23.3`, nhưng helper cũ báo lỗi tổng quát. Predicate cũ chỉ báo lỗi khi `find` in path; exit code `find` bị bỏ qua trong `[[ ]]`, không có pipeline nên `pipefail` không áp dụng. Helper local dùng UID 0, `find -P`, bỏ symlink khỏi kiểm mode 022 nhưng vẫn kiểm owner, bắt exit code riêng và báo path. Cây đã có được xác minh trước khi tải archive. Sáu ca `ops/vps-new/test-node-tree-check.sh` PASS; helper SHA đã cập nhật root-owned. Sau cập nhật, `install-node22` và `preflight` PASS; Node v22.23.3/npm10.9.9; không đổi permission/cài lại.

- 2026-10-27: VPS release workflow: SHA mặc định `a1633921…` trên master không có packager, nên bỏ default và chỉ nhận SHA đã qua CI trên master có chứa `build-test-release.sh`. Packager archive riêng `board-game/` và strip thư mục cha để `package.json`, `server/index.ts`, `dist/`, `node_modules/` khớp systemd release root; thêm kiểm tra layout. Ubuntu tar fixture PASS. Reviewer gate `vps-test` chưa xác minh được vì GitHub CLI token invalid và connector chưa kết nối. VPS test có `cotuong_deploy`, MySQL active loopback, Nginx inactive; app env/unit/current release còn thiếu. MySQL root socket query bị từ chối từ user admin; chưa tạo DB/schema, ghi secrets hay cài service.

- 2026-10-27: Theo user hoàn tác bỏ khung full màn hình LAPTOP: useHomeLayout về lề ngang120px/dọc6px và scale cũ, Home/Shop khôi phục border/shadow/viền trang trí; GamePage/CustomPositionPage về wcalc100%-240px/hcalc100dvh-12px và khung cũ. Ranking vẫn kích thước ban đầu, mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA. Typecheck/build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: User đính chính full màn hình là bỏ khung giới hạn ngoài LAPTOP, không phóng Ranking. Hoàn tác riêng viewport Ranking về layout cũ. Home/Shop qua useHomeLayout rộng/cao viewport desktop, giữ content scale cũ; bỏ viền/shadow giới hạn ngoài. GamePage/CustomPositionPage desktop wfull/hdvh/border0/shadownone như trang Chọn bàn; màn chọn bàn/chơi máy vốn full giữ. Compact giữ nguyên. Typecheck/build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user dấu+ chọn danh hiệu LAPTOP tăng nút28px thật, neo top0/left0 góc trên trái từng ô danh hiệu (thay offset3%/2%, clamp22–30logical). Glyph92%/tick/hànhvi giữ; mobile22px/neo cũ giữ. Build/typecheck PASS; dist xác nhận nút+28px góc trái; chưa browser QA.

- 2026-10-27: Theo user tăng nút Ẩn Danh hiệu LAPTOP: nhãn20px, switch48×26px/knob18px/left3px/travel22px. Dùng HonorHiddenToggle chung catalog/chi tiết cho đồng bộ; mobile13px/30×18/knob12 giữ nguyên. Build/typecheck PASS; dist xác nhận switch48×26 desktop; chưa browser QA.

- 2026-10-27: Theo user sau lượt chỉnh Ranking, riêng Xếp hạng LAPTOP mở rộng theo viewport như Chọn bàn: rộng innerWidth-12/lề6px, cao innerHeight-12-trừ50scale chừa biển tiêuđề trên; neo dialog left6/top6+title. Giữ scale nội dung và mobile, không đổi useRankingLayout chung để tránh ảnh hưởng bảng khác. Typecheck/build PASS, dist cập nhật; chưa browser QA. Khóa lại phạm vi sau task.

- 2026-10-27: Theo user nâng nhóm tab Danh hiệu LAPTOP: tab đầu cách mép trên khung10px thật, các tab sau giữ offset tương đối cũ (category.top-13%). Quy đổi tọa độ Shell sang wrapper108.7087%/top-3.5035%; mobile giữ. Build/typecheck PASS; dist xác nhận neo tab cách trên10px; chưa browser QA.

- 2026-10-27: User đính chính bỏ giao diện dòng ngang vừa phục hồi; Đã lưu/Ván đấu LAPTOP dùng cùng MobileSavedMatchRow với điện thoại: tiêu đề sửa được, miniBoard, hai người/cặpquân, nút Xem, metadata/ghi chú sửa được, thùng rác góc phải. Desktop giữ avatar34×scale và tên21×scale theo ngữ cảnh trước, mini178×scale; hai hàng tối thiểu/giãn nội dung, compact giữ nguyên. Giữ savedAt mới nhất đầu, xác nhận xóa/thời gian lưu/chức năng. Build/typecheck PASS; dist cập nhật; chưa browser QA. Quy tắc này thay lượt phục hồi dòng ngang, khóa lại phạm vi.

- 2026-10-27: Theo user LAPTOP khung tab Danh hiệu dịch trái13px từ vịtrí hiện tại (leftborder5+36→+23), padding tab ngang7→12px mỗi bên; lefttab=border5+35,width20%-24px quyđổi wrapper1.060029. Mobile giữ. Build/typecheck PASS; dist xác nhận padding12/offset mới; chưa browser QA.

- 2026-10-27: User xác nhận khôi phục Đã lưu/Ván đấu LAPTOP về dòng ngang: ngày giờ endedAt, hai người/kết quả, cặp quân, Xem lại, thùng rác; 8slot như Đã chơi, bỏ miniBoard/tiêu đề/metadata haihàng desktop. HistoryPlayer tách component dùng chung giữ nguyên markup Đã chơi. Mobile giữ MobileSavedMatchRow/miniBoard/thùngrác góc phải. Thứ tự savedAt giảm dần cả hai, giữ xác nhận xóa/thời gian lưu/replay; Thế cờ không đổi. Build/typecheck PASS; dist cập nhật; chưa browser QA. Khóa lại phạm vi.

- 2026-10-27: Theo user khung tab Danh hiệu LAPTOP dịch phải20px thật (leftborder5+16→+36), tab căn giữa trong khung với padding ngang7px. Tọa độ tab quy đổi wrapper106.0029%/offset-3.0747% về Shell: left=(3.0747%+border5+43px)/1.060029,width=(20%-14px)/1.060029. Mobile/vịtrídọc giữ. Build/typecheck PASS; dist xác nhận tọa độ tab mới; chưa browser QA.

- 2026-10-27: User đính chính muốn hoàn tác giao diện dòng Đã lưu laptop, không phải thứ tự. Khôi phục sort savedAt giảm dần cho ván/thế cảmobile/laptop; giữ contextmenu Đã chơi/padding10. Chờ xác định bố cục cũ cần phục hồi vì HEAD cũng là miniBoard2hàng. Build PASS, dist cập nhật; giao diện chưa sửa.

- 2026-10-27: Theo ảnh user sửa khung tab Danh hiệu LAPTOP bị tràn: chuyển background panel ra khỏi wrapper âm/phóng106%×108.7% về cùng hệ tọa độ HonorsDialogShell, neo left/top/bottom=border5token+padding16px đúng viền trong Shell. Mép trên chạm viền trong, đáy nằm trong khung, width20%; tab/vùngbấm/mobile giữ. Build/typecheck PASS; dist xác nhận neo khung tab trong Shell; chưa browser QA.

- 2026-10-27: Theo user hoàn tác thứ tự Đã lưu riêng laptop về reverse mảng như trước lượt sort mới nhất; áp dụng ván/thế, compact giữ sort savedAt giảm dần. Đã chơi laptop contextMenuOnly trong usePressToRevealDelete: chuột phải mở Lưu ván cờ, chuột trái giữ không mở; mobile giữ200ms. Bảng Lưu ván cờ padding20px thật qua prop HistoryHoldNotice, tooltip thời gian giữ padding cũ. Bấm ngoài đóng/lưu/API giữ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user bỏ khung/nền/viền bao danh sách danh hiệu, chỉ giữ khung tab dùng customizationListPanel. Laptop khung tab kéo dọc vùng nội dung top10.5%→bottom5% của layout nội bộ (sát khoảng header/đáy khung ngoài); mobile khung tab wfull vùng nội dung, giữ lướt ngang. Không đổi danh hiệu/data/selection. Build/typecheck PASS; dist xác nhận chỉ khung tab mới; chưa browser QA.

- 2026-10-27: Theo user cả điện thoại/laptop Lịch sử mới nhất lên đầu: Đã chơi sort endedAt giảm dần, Đã lưu ván sort savedAt giảm dần (legacy thiếu timestamp fallback endedAt), Thế cờ sort savedAt giảm dần. Bỏ reverse theo thứ tự mảng để API/local đều thống nhất, filter tạo mảng mới không mutate store. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Theo user cảmobile/laptop catalog Danh hiệu thêm2khung riêng bao nhóm tab và danh sách danh hiệu, cùng customizationListPanel token với lưới avatar/viền (nâu#1c0d07aa/viền#9f6025/bo10/shadowinset). Desktop2khung cạnh nhau top12%/cao80%, compact giữ tab ngang trên/danh hiệu dưới với padding8. Giữ data/selection/thứtự/avatar. Build/typecheck PASS; dist xác nhận2khung danh hiệu/token chung; chưa browser QA.

- 2026-10-27: Sửa bộ phát replay theo user báo tự phát/nút Phát không chạy: timeout phụ thuộc recordingId thay object recording để refresh cùng ván không reset1200ms liên tục; đọc snapshot mới qua ref. Đổi ID reset step0/animation/autoplay, cuối ván bấm Phát chủ động đặt playingtrue/step0; bản0nước không chạy giả. Giữ chờ entrance, seek/pause và dữ liệu. Regression replay-playback2/2 PASS (refresh400ms, autoplay, pause/resume/restart, đổi ván/chờ entrance); build/typecheck PASS, dist cập nhật; chưa browser QA/live xác nhận nguyên nhân cụ thể trên dữ liệu user.

- 2026-10-27: Theo user LAPTOP Chọn viền5cột/3hàng, mobile4cột ôvuông giữ. Catalog Danh hiệu laptop bỏ sprite nền sidebar cắt gây lệch/icon cụt; mỗi category button tự chứa artwork riêng hiện có và selectionframe neo tương đối như mobile, giữ tọa độ/thứ tự/luồng chọn. Bỏ phong cảnh thừa nằm trong sprite sidebar. Mobile không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA. Build/typecheck PASS; dist xác nhận tab artwork riêng; chưa browser QA.

- 2026-10-27: Theo ảnh user thêm viền khung trong như Ranking cho History/Friends LAPTOP: DesktopSocialLandscape chung thêm lớp pointer-eventsnone inset16×scale, border3×scale màu#d39a42, roundedxl và shadow cùng khung trong SocialDialogFrame. Dùng cùng các nhánh desktop đang render, không đổi geometry nội dung/avatar/mobile. Build/typecheck PASS; dist xác nhận viền; chưa browser QA; khóa lại phạm vi.

- 2026-10-27: Theo user riêng Tùy chỉnh avatar LAPTOP nâng card tên/Elo thêm8px bằng top cục bộ preview, nâng4tab và đầu danh sách12px bằng marginbottom-12 ở section preview. Flex danh sách nhận thêm12px chiều cao, footer giữ neo; không đổi geometry avatar/Thông tin/mobile. Build/typecheck PASS; dist xác nhận offset preview desktop; chưa browser QA.

- 2026-10-27: Theo ảnh user sửa nền tối History/Friends LAPTOP: bỏ background100%auto lấy vùng đỉnh tối của artwork; DesktopSocialLandscape dùng đúng object-cover/object-center, opacity80%, height170 và inset27 theo geometry Ranking. Nền là lớp absolute trực tiếp khung ngoài, không phụ thuộc padding nội dung. Khung giấy tăng ngang bằng padding24 thay36, đáy24 thay28 theo scale; compact giữ nguyên. Build/typecheck PASS, dist cập nhật; chưa browser QA. Thay các phương án nền trước, khóa lại phạm vi.

- 2026-10-27: User báo nền vẫn chưa full. Tìm đúng nhánh FriendsDialog desktop dùng DesktopFriendsDialog, không dùng FriendsDialogFrame. History và DesktopFriendsDialog chuyển phong cảnh lên background khung ngoài (100% auto, center top, khôngrepeat), bỏ ảnh con có inset/height giới hạn; FriendsDialogFrame đồng bộ cùng token để tránh lệch khi dùng lại. Mobile giữ nguyên. Thay hoàn toàn cách offset-9/-25 trước đó; khóa lại phạm vi nền. Build/typecheck PASS; kiểm tra nhánh render thực tế và dist; chưa browser QA trực tiếp.

- 2026-10-27: Đính chính theo hai ảnh user: nền cần phủ tới trên/ngang là PHONG CẢNH, không phải giấy. History/Friends laptop dùng chung getDesktopSocialLandscapeStyle: inset tương đương Ranking27px từ khung, bù padding content36/52 bằng left-right-9/top-25 và cao170 theo scale. Gỡ nền giấy full-content thêm nhầm lượt trước; giấy danh sách giữ. Compact không đổi, phạm vi nền khóa lại. Build/typecheck PASS; dist xác nhận offsets chung; đối chiếu geometry source với ảnh, chưa browser QA trực tiếp.

- 2026-10-27: Theo user riêng Xếp hạng LAPTOP làm rõ danh hiệu/sao: RankingRankBadge dùng sharpen convolution nhẹ bảo toàn alpha + contrast1.12 với ảnh nguồn HD hiện có; lớp sao bỏ translate nửa pixel, tọa độ snap nguyên từ token cũ, giữ kích thước/mốc trong sai số làmtròn. compact prop giữ nhánh render cũ khôngfilter; các màn khác giữ. Typecheck/build PASS; dist xác nhận feConvolveMatrix, chưa browser QA độ nét.

- 2026-10-27: Theo user thu riêng Hủy/Sử dụng Tùy chỉnh avatar MOBILE về cao36px/chữ16/line20/paddingy6/cụmmax280/gap10 như trước; laptop giữ44px/chữ18/cụm360. Build/typecheck PASS; dist xác nhận nút compact36px; chưa browser QA.

- 2026-10-27: Theo user hoàn tác riêng Chọn avatar MOBILE về4cột/ôvuông/hàngmaxcontent/cuộn theo nội dung như trước lần ép3hàng. Chọn viền MOBILE đồng bộ cùng4cột/ôvuông/maxcontent, không ép chiều cao3hàng theo viewport. Laptop avatar5×3/viền4×3 và nút44px giữ. Build/typecheck PASS; dist xác nhận lưới mobile maxcontent; chưa browser QA.
- 2026-10-27: Theo ảnh/user, nền giấy History phủ toàn vùng nội dung bên trong khung laptop, gồm cả sau tab; làm tương tự nền Xếp hạng. Áp dụng cùng nền full-content cho FriendsDialogFrame laptop; lớp phong cảnh giữ nằm trên nền. Compact/mobile và nội dung không đổi. Build/typecheck PASS; dist cập nhật; chưa browser QA. Mở phạm vi nền laptop History/Friends cho task này rồi khóa lại.


- 2026-10-27: Theo user Chọn avatar mobile4cột×3hàng theo vùng viewport, desktop5cột×3hàng; bỏ compact maxcontent/aspectsquare ép hàng theo rộng, ảnh tròn fit theo cao và maxwidth. Hai nút Hủy/Sử dụng chung mobile/laptop tăng36→44px/chữ16→18/cụmmax280→360/gap12. Chọn viền4×3 giữ. Build/typecheck PASS; dist xác nhận nút44px/lưới mới; chưa browser QA.
- 2026-10-27: Theo user đồng bộ riêng Lịch sử LAPTOP: hai tab Đã chơi/Đã lưu dùng chung sprite bốn trạng thái đã dùng trên mobile; lớp phong cảnh đẩy lên/đặt theo Xếp hạng (top2, inset8, cao170). Nội dung/data và compact không đổi. Build/typecheck PASS, dist xác nhận; chưa browser QA. Khóa lại layout sau task.


- 2026-10-27: Sửa theo ảnh user Tùy chỉnh avatar: section preview desktop bỏ h190 cố định thành minheight190 để PlayerInfoCard chung tự tăng theo nội dung, ID nằm trong nền; previewPanel dùng nguyên sizeClass Thông tin, không h270/selfcenter riêng. Giữ geometry avatar. Chọn viền mobile+laptop4cột/3hàng trước cuộn (desktop gap8/2gap16, compact gap12/2gap24). Build/typecheck PASS; dist xác nhận lưới viền3hàng mới; chưa browser QA.

- 2026-10-27: Theo user chỉLAPTOP thu×thêm64/48→56/42×scale; đối chiếu mobile neo top24/right28×scale+translate16,-18, desktop chuẩn hóa cùngmốc trong DialogCloseButton (bỏ lệch riêng Messages). Compact90/68/vịtrígiữnguyên; scrollbargiữ. Typecheck/build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user LAPTOP Tùy chỉnh avatar dùng PlayerInfoCard chung với Thông tin, đồng bộ minheight190/selfstretch/translateY-21 thay h185/selfcenter/-30; giữ chiều rộng ngữ cảnh và geometry avatar. Scene desktop cao238 và fade dọc black65%→transparent100% như Thông tin; bỏ overlay ngang chia nửa nền. Compact giữ height270/selfcenter/-28 và fade cũ. Build/typecheck PASS; dist xác nhận preview card mới; chưa browser QA.
- 2026-10-27: Theo user thu hẹp nút Mời chơi trong Xếp hạng LAPTOP từ173px xuống158px theo scale, giữ chiều cao/icon/nhãn; mobile không đổi. Build PASS, dist xác nhận; chưa browser QA, không chạy test cho spacing. Khóa lại phạm vi sau task.


- 2026-10-27: Theo user LAPTOP nâng section Thắng/Thua lên12px thật bằng margin-top âm, giải phóng khoảng dưới; tăng minheight nội dung Danh hiệu thêm12px và khung flex nhận khoảng trống, giữ chữ empty giữa toàn khung. Giữ cỡ chữ/số hiện tại, mobile không đổi. Build/typecheck PASS; dist xác nhận offset desktop mới; chưa browser QA.

- 2026-10-27: User sửa riêng LAPTOP: thumb cuộn trắng thay xám, giữ700ms sau scroll rồi giảm alpha dần500ms, scroll lại hủyfade/hiện ngay; desktop dialog hook chỉ>800px. Nút×desktop90/68→64/48×scale; compact90/68 giữ nguyên. Typecheck/build PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo ảnh/user chỉnh riêng Xếp hạng LAPTOP: nền nâu bao Elo nới trái/phải mỗi bên5px thật bằng inset span, giữ artwork Elo/kích thước cột/điểm; vương miện top1 nâng4px thật bằng marginTop-4. Cả2tab, compact không đổi. Build/typecheck PASS,dist cập nhật; chưa browser QA, không chạy test cho spacing; khóa lại phạm vi.


- 2026-10-27: User mở riêng LAPTOP đồng bộ nút×/thanh cuộn cho các bảng khung: DialogCloseButton desktop dùng cùng90/68×scale, bo12px cố định/translate16,-18 như compact; thay×riêng Bạn bè desktop/Tin nhắn bằng component chung, Ranking/History/Profile/Honors đã dùng chung. Giá trị compact không đổi. Hook useDesktopDialogScrollbars chỉ viewport>800/dialog, thumb xám#999 khi scroll/tựẩn800ms, CSS desktop scoped dialog trong index.html; mobile giữ nguyên. npm.cmd run build PASS; dist cập nhật; chưa browser QA. Typecheck/build PASS (lần đầu Vite crash, chạy lại thành công), dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user LAPTOP tăng chữ Thắng/Thua18→24px và số24→30px; giữ ô thống kê cao thêm24px. Hoàn tác tăng30px minheight của khung/vùng danh hiệu về240/220logical trước đó, giữ căn giữa empty/header/copy đã chỉnh. Mobile giữ nguyên. Build/typecheck PASS; dist xác nhận chữ thống kê mới; chưa browser QA.

- 2026-10-27: Theo3ảnh user chỉnh LAPTOP: tăng hai ô thống kê Cờ Tướng/Cờ Úp thêm24px thật; empty danh hiệu căn giữa toàn khung section (container con static riêng khi trống), pointer-eventsnone không chặn nút header; icon copy ID bỏ translateY-6px trên desktop để ngang dòng ID. Mobile giữ nguyên. Build/typecheck PASS; dist xác nhận chiều cao thống kê mới; chưa browser QA.

- 2026-10-27: Theo user chỉnh riêng Xếp hạng LAPTOP: header dùng inset đo thực scrollbar+padding danh sách như compact để Hạng/Người chơi/Elo/Thao tác cùng cột dòng bên dưới; giữ khoảng user15px và nhãn căn mép tên. Nền nâu bao Elo cao calc100%+6px và bo ranking5 như mobile, artwork/điểm giữ. Nút invite desktop dùng socialActionButton/socialActionStyle + icon crop friend-invite-button đúng mẫu Bạn bè laptop, đủ chữ Mời chơi và giữ challenge ID/cooldown; compact giữ RankingViewButton chữ Mời như cũ. Không sửa UI Bạn bè/mobile/avatar. Build/typecheck PASS,dist cập nhật; chưa browser QA, không chạy test cho thay đổi trình bày. Khóa lại phạm vi sau task.


- 2026-10-27: Theo user chỉnh Thông tin LAPTOP: nền scene fade dọc black65%→transparent100% hòa khung nâu như mobile; khung danh hiệu tăng minheight30px thật, dùng flex dọc để vùng nội dung giãn theo khung; paddingtop16→12px đưa Danh hiệu/Sở hữu lên4px. Chưa có danh hiệu desktop absolute inset0/grid center trong vùng nội dung. Compact giữ nguyên. Build/typecheck PASS; dist xác nhận style desktop mới; chưa browser QA.

- 2026-10-27: User mở riêng Xếp hạng LAPTOP: cụm user sau cột hạng thêm padding trái15px thật, nhãn Người chơi căn trái theo mép tên bằng cùng avatar84/gap20/margin2+15px; áp dụng cả2tab. Nhánh compact không thêm style nên điện thoại giữ nguyên. Giữ kích thước avatar/khung và cột Elo/thao tác. Build/typecheck PASS,dist cập nhật; chỉnh spacing không chạy tests, chưa browser QA; khóa lại phạm vi sau task.


- 2026-10-27: Theo user thu nhẹ số Bạn bè/Theo dõi/Lượt thích cả mobile/laptop còn93% cỡ trước, vẫn cùng font nhãn. PlayerInfoCard mobile padding ngang6→9px thật, padding đáy tăng3px so với py2, padding trên giữ. Desktop padding giữ; card chung đồng bộ hồ sơ/preview. Build/typecheck PASS; dist xác nhận cỡ số93% và padding mobile mới; chưa browser QA.

- 2026-10-27: Theo user, số hàng Bạn bè/Theo dõi/Lượt thích PlayerInfoCard trên laptop và mobile bỏ font-number, kế thừa cùng font với nhãn chữ. Giữ cỡ/độ đậm/khoảng cách/căn hàng và số Elo/ID khác; đồng bộ card chung. Build/typecheck PASS; dist xác nhận số không còn font-number; chưa browser QA.

- 2026-10-27: Theo user bắt đầu chỉnh UI LAPTOP, điện thoại giữ nguyên. PlayerInfoCard hàng Bạn bè/Theo dõi/Lượt thích desktop căn trái và gap8px thật giữa các mục, vùng đo fit dùng cùng gap8 để nhãn ẩn đúng. Compact giữ justify-between/gap3 cũ, không đổi avatar/cỡ chữ/dữ liệu; đồng bộ card chung hồ sơ/preview. Build/typecheck PASS; dist xác nhận class desktop căn trái/gap8; chưa browser QA.

- 2026-10-27: Sửa tiếp theo phản hồi user: chat mobile chỉ kích hoạt bàn phím sau pointerdown trực tiếp input. Input readonly khi chưa chạm hoặc sau blur; chạm input bỏ readonly ngay trong gesture. Pointerdown ngoài input trong Chat blur và khóa lại input; bỏ preventDefault giữ focus của icon, mở/đóng panel cũng blur. Thay quy tắc giữ focus cũ. Build/typecheck PASS; dist cập nhật có readonly gate; chưa QA bàn phím điện thoại thật.

- 2026-10-27: User xác nhận chat trong trận chỉ bật bàn phím khi bấm ô nhập. useChat bỏ focus tự động khi gửi tin/gợi ý và chọn emoji; vẫn cập nhật caret mà không focus, giữ cơ chế tránh mất focus khi đang gõ. Icon Chat ngoài bàn vẫn mở panel như cũ. Áp dụng hook chung mobile/laptop, không đổi socket/nội dung. Build/typecheck PASS; dist cập nhật; chưa browser/bàn phím thiết bị thật QA.

- 2026-10-27: Theo user, Xem thành viên hiện icon người+dấu cộng Thêm bạn vào nhóm cho mọi vai trò gồm member/deputy/owner, mobile+laptop. Thành viên thường được mở/giữ trang invite (không bị guard tab quản trị đưa về Tất cả); các tab/quyền quản trị giữ nguyên. Backend add đã cho thành viên đang tham gia gửi lời mời, vẫn chặn người bị block và giữ consent/duyệt hiện có. Thay quy tắc ẩn icon mời với member trước đây. Build/typecheck PASS; dist cập nhật và xác nhận icon mời; chưa browser/2client QA.

- 2026-10-27: User báo trong trận vẫn bị dịch khi kéo sau lượt khóa viewport CSS. Thêm useGameViewportLock chỉ gắn khi GamePage mount (online/máy/replay/trial), touchmove nonpassive ngăn pan/bounce ở vùng không cuộn hoặc mép danh sách; cho cuộn đúng hướng trong panel thực sự scrollable, giữ đa chạm/select/range và thao tác tap. Listener trên document để bao phủ chat/view portal, dọn đầy đủ khi rời GamePage. gameScreen fixed/inset0/overflowhidden/overscrollnone, không đổi geometry/avatar/bố cục trong bàn. Regression3/3 PASS (mặt bàn/chạm mép/cuộn chat/đa chạm/cleanup), build/typecheck PASS, dist cập nhật. Chưa kiểm tra iOS/Android/keyboard thật nên chưa khẳng định hết mọi trường hợp dịch màn hình.


- 2026-10-27: Theo user, menu Cài đặt Tin nhắn chứa Tạo nhóm đóng khi pointerdown ngoài cụm menu/nút bánh răng, áp dụng chuột và chạm mobile/laptop. Bấm trong menu giữ xử lý hiện có, bánh răng vẫn toggle; listener capture chỉ tồn tại khi mở và được dọn. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user cố định màn hình toàn project, không cho kéo cả trang lên/xuống. index.html neo body fixed/inset0, html/body rộng-cao100%, root hfull/minh0/overflowhidden/gridrowminmax0-1fr; html overscrollnone và các vùng overflow-y-auto/scroll có overscroll-y-contain để cuộn danh sách không lan ra nền. Giữ cuộn bên trong Lịch sử/Bạn bè/Tin nhắn/Shop và xử lý input/bàn phím hiện có, không touch-actionnone hay preventDefault toàn trang. Admin main chuyển sang vùng cuộn nội bộ hfull/overflow-y-auto để không cắt nội dung quản trị khi root khóa. Mở riêng viewport ngoài trong task này, không đổi avatar/bố cục màn con. Build/typecheck PASS, dist index.html/CSS xác nhận fixed-body/root và overscroll containment; chỉnh CSS/HTML không chạy test logic. Chưa browser/điện thoại/keyboard thực QA.


- 2026-10-27: Theo user, mỗi lần mở/đóng Tin nhắn đặt menu Cài đặt chứa Tạo nhóm về đóng bằng theo dõi thuộc tính open của dialog. Danh sách hội thoại trống hiện Danh sách tin nhắn trống căn giữa ngang/dọc vùng list mobile/laptop; tìm kiếm không có kết quả hiện Không tìm thấy tin nhắn. Giữ luồng tạo nhóm/API. Build/typecheck PASS; dist xác nhận thông báo trống mới; chưa browser QA.

- 2026-10-27: User chốt đã bắt đầu trận là được tính/lưu, không cần đi nước đầu. ContentRepository.history trả cả playing/finished có started_at, trạng thái chưa kết thúc dùng initial_state hiện có (0 nước), không đọc final_state null; timestamp hiển thị fallback started_at. Bookmark chấp nhận playing nếu actor là người tham gia theo DB, finished giữ quyền cũ; chưa bắt đầu vẫn chặn, không nhận board/kết quả client. RecordedMatch thêm startedAt và recordedMatchStarted chung cho saved/played: cho playing có mốc bắt đầu hoặc finished, loại ready; local played upsert cùng ID khi kết thúc thay vì nhân đôi/giữ bản cũ. Mở Lịch sử tải lại history+saved theo account hiện tại; Đã chơi/Đã lưu hiển thị Đang đấu khi chưa có kết quả. Bookmark là tham chiếu nên khi ván kết thúc API trả kết quả/moves đầy đủ của cùng ván. Không migration/thay Elo/vàng/năng lượng. Regression repository+saved-history+store+match-saving23/23 PASS; build/typecheck PASS, dist cập nhật. Bổ sung integration assertion bắt đầu0nước/bookmark trước kết thúc nhưng chưa chạy MySQL integration hoặc browser live; backend cần nạp code mới, không restart/deploy trong task.


- 2026-10-27: User nhắc Lưu ván cờ phải lưu đúng ván trong Đã chơi và báo thông báo gợi ý đôi lúc lệch. Sửa HistoryHoldNotice portal vào chính dialog sở hữu (thay body cho popup tương tác), giữ popover top-layer để escape clipping nhưng không rơi ngoài modal/inert; áp dụng cả tooltip Đã lưu. InviteSentNotice chung portal vào dialog gần nhất hoặc body khi ngoài dialog, dùng popover manual fixed50%/50%, insetauto/margin0/widthmax và transform căn giữa có sẵn trước paint; useLayoutEffect mở/animate để không nhảy góc ban đầu và không lệch theo transform khung cha. Giữ font18/nền/bay48/fade1300, dữ liệu/khóa layout còn lại. Regression saved-history+store15/15 PASS, gồm lưu bằng store thật đúng ID/hiện trong Đã lưu/portal đúng modal/căn giữa ban đầu cảmobile+laptop; build/typecheck PASS, dist cập nhật. Chưa browser hoặc MySQL live QA; không khẳng định đã đo vị trí pixel thực.


- 2026-10-27: Theo user, bấm Lưu ván cờ trong ô nhấn giữ Đã chơi gọi savedMatchesStore.save hiện có, thành công mới đóng ô và hiện thông báo gợi ý Đã lưu qua useInviteSentNotice (cùng mẫu Thêm bạn/Theo dõi). Lỗi hiện thông báo không thể lưu và giữ ô để thử lại; pending khóa nút/ref chống gọi lặp. Icon và chữ đều nằm trong nút bấm, giữ khung vàng dùng chung; click action không bị chặn bởi click thả sau giữ. Regression history10/10 PASS gồm pending/không báo thành công sớm/lỗi/thử lại/mobile+laptop; build/typecheck PASS, dist cập nhật; chưa browser/API live QA.


- 2026-10-27: Theo user đồng bộ chiều cao Mời chơi/Kết bạn/Đã gửi/Hủy/Chấp nhận/Từ chối trong Bạn bè MOBILE theo nút Kết bạn: chung friendActionHeight=118×dialog scale, bỏ giới hạn108 và chiều cao phụ thuộc hàng của cụm lời mời. Laptop giữ khóa; giữ chiều rộng/font/avatar/hành vi. Phạm vi chiều cao mobile khóa lại sau task. Build/typecheck PASS; dist cập nhật và xác nhận bundle có chiều cao118 chung; chưa browser QA.

- 2026-10-27: Theo user, dòng Đã chơi nhấn giữ200ms hiện nguyên icon PositionIcon(save) kèm khung nút vàng gameUtilityButton dùng trong trận + chữ Lưu ván cờ; cùng HistoryHoldNotice với thời gian lưu ở Đã lưu, top-layer/căn giữa theo điểm bấm/mép dưới cách10px thật. Đã chơi giữ ô sau thả tay/nhả chuột/rời dòng/cuộn, bấm trong ô vẫn giữ và bấm ngoài mới ẩn; đổi tab/đóng dọn ô. Chặn click thả sau giữ mở profile/replay. Đã lưu vẫn thả tay ẩn tooltip thời gian. Bấm icon hoặc chữ Lưu ván cờ gọi luồng lưu hiện có; thành công hiện thông báo gợi ý Đã lưu, lỗi không báo thành công. Mobile/laptop cùng hành vi, giữ avatar/bố cục. Regression history8/8 PASS; build/typecheck PASS, dist cập nhật; chưa browser QA. Mở riêng phản hồi nhấn giữ Đã chơi task này rồi khóa lại.


- 2026-10-27: Theo user, thùng rác Đã lưu/Ván đấu mobile+laptop mở thông báo Xác nhận với tên ván và Hủy/Đồng ý (tái dùng mẫu xác nhận chung, nền mờ toàn viewport). Chỉ Đồng ý mới gọi remove/API; pending khóa nút/chống gọi lặp, lỗi giữ thông báo để thử lại, thành công mới đóng. Nhấn thùng rác dọn tooltip thời gian lưu. Phạm vi mở riêng xác nhận rồi khóa lại. Regression history6/6 PASS gồm Hủy/Đồng ý/lỗi/thử lại cả2viewport; build/typecheck PASS, dist cập nhật; chưa browser/API live QA.


- 2026-10-27: Theo user, Lịch sử/Đã lưu nhấn giữ dòng ván 200ms hiện ngày giờ lưu phía trên điểm bấm, mép dưới cách điểm bấm10px thật (mobile/laptop), thả tay/nhả chuột/hủy pointer/rời dòng/cuộn/di chuyển/đổi dòng/đóng dọn thông báo ngay, chặn click thả sau giữ; contextmenu không mở lại tooltip sau nhả. API saved history trả savedAt từ saved_matches.saved_at sẵn có; local ghi savedAt khi lưu, bản legacy thiếu mốc báo chưa có thông tin, không dùng endedAt làm thời gian lưu. Tên ván font-black→font-bold, mobile bỏ stroke0.2px cả input/hiển thị đồng độ đậm; không đổi tên người/avatar/bố cục. Phạm vi mở riêng task này rồi khóa lại. Regression saved-history/store7/7 PASS (TEMP workspace khắc phục ENOENT cache môi trường); npm.cmd run build/typecheck PASS, dist index-DQUkWA7D.js xác nhận thông báo. Chưa browser/MySQL live QA; backend cần nạp code mới, không restart/deploy.


- 2026-10-27: Theo user, địa chỉ dài trong PlayerInfoCard dùng truncate/ellipsis thật, bấm toàn dòng địa chỉ để mở đầy đủ và bấm lại thu gọn. Close event của dialog reset expandedAddress để mở lại luôn gọn; địa chỉ ngắn không bật toggle. Dùng card chung mobile/laptop/hồ sơ chính-người khác/tùy chỉnh, giữ dữ liệu địa chỉ và avatar. Regression toggle/close1/1 PASS; build/typecheck PASS; dist index-ZgtnvGwY.js xác nhận cập nhật; chưa browser QA.

- 2026-10-27: Theo user, hủy lời mời kết bạn cũng hiện thông báo gợi ý “Đã hủy lời mời kết bạn” cùng toast Thêm bạn, chỉ sau thành công. Đồng bộ Bạn bè mobile/desktop và hook useMessageFriendship chung Hồ sơ/Tin nhắn; nút Hủy Bạn bè await API, lỗi không báo thành công. Giữ UI/quan hệ/chấp nhận/xóa bạn. Build/typecheck PASS; dist index-B57buT0P.js xác nhận cập nhật; chưa browser/API QA.

- 2026-10-27: User đặt tên kiểu toast đang dùng cho Thêm bạn là “thông báo gợi ý”. Theo dõi/Bỏ theo dõi trong ProfileDialog dùng cùng useInviteSentNotice/sentFeedback sau API thành công: “Đã theo dõi”/“Đã bỏ theo dõi”, nền nâu/chữ18px/giữa/bay48px-mờ1300ms mobile+laptop; lỗi giữ phản hồi lỗi, không báo thành công. Không đổi layout/quyền/quan hệ. Build/typecheck PASS; dist index-D6e8x6as.js xác nhận cập nhật; chưa browser/API QA.

- 2026-10-27: Theo user, hover toàn vùng Danh hiệu (cả header/padding) dừng ngay carousel; rời vùng chạy tiếp nếu không mở chi tiết, animation tái tạo vẫn xét:hover. Arena cấp2/3 thêm dòng2 chú thích theo provinceName/wardName của hồ sơ đang xem; Quán Quân ghi Vô địch, Á Quân/Hạng Ba giữ đúng hạng. Thiếu địa chỉ hiện tỉnh…/xã…, không lấy địa chỉ người xem cho người khác. Đây là thông tin trình bày theo địa chỉ hiện tại, chưa có dữ liệu giải đấu/địa phương lúc đạt. Test địa phương+profile3/3 PASS; chưa browser QA.

- 2026-10-27: Theo user phóng thêm dấu+ chọn danh hiệu bằng tăng vòng nút clamp18–24→22–30logical desktop và22px thật trên compact; giữ glyph92%/stroke3, vị trí neo/hành vi chọn.

- 2026-10-27: Theo user, thu vùng chữ HonorDetailPopover vào sâu hơn theo artwork: Chú thích left15%/top45%/w70%/h14.5%; Cách nhận left15%/top71%/w70%/h18.5%. Giữ fontsize/scroll, chừa viền và hoa văn.

- 2026-10-27: Theo user, tăng riêng dấu+ chọn danh hiệu SVG72→92% trong nút và stroke2.5→3; giữ vòng nút/dấu✓/hành vi chọn.

- 2026-10-27: Theo user, chữ chi tiết danh hiệu cách bullet◆ bằng padding1.5em/bulletwidth1em theo chính font (thay pl5 bị co bởi scale), đồng bộ popup ngoài/trong catalog. Toggle Ẩn trong chi tiết dùng cùng compactHeader sizing với toggle ngoài: label13px/switch30×18/knob12px trên mobile; giữ logic ẩn.

- 2026-10-27: Theo user, mô tả/cách nhận trong HonorDetailPopover không tràn viền: vùng cao cố định17%/23% theo artwork, box-border/min-h0/overflow-y-auto/overflow-x-hidden/touch-pan-y; li không shrink và nội dung dài wrap để cuộn xuống, không đè nhau. Giữ cỡ chữ mới.

- 2026-10-27: Theo user, chữ tooltip Đã sao chép khi copy ID ở PlayerInfoCard tăng text-xs→text-sm; giữ vị trí/thời gian/hành vi copy.

- 2026-10-27: Theo user, icon địa chỉ xuống2px từ vị trí-3 thành translateY-1px. Tăng chữ mô tả/cách nhận trong HonorDetailPopover chung cho preview Thông tin và catalog Danh hiệu: desktop clamp14–22px, mobile16px cố định; vùng nội dung dài vẫn cuộn.

- 2026-10-27: Theo user, máy trong Vị trí tùy chỉnh và Đánh thử luôn Fairy mạnh nhất: usePositionEditor chốt computerEngine=fairy/computerLevel10 khi vào, useReplayTrial gọi fairyStockfishApi.move level10 với FEN gốc+history nhánh riêng thay Pikafish/700ms. Cấp Đấu với máy thường giữ lựa chọn1–10; máy trong trial vẫn mặc định tắt, không tự đi khi vào. Giữ cancel/reset/replay/socket cô lập và Gợi ý hiện tại. Replay-trial3/3 PASS xác nhận Fairy10/history/cancel; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, icon địa chỉ PlayerInfoCard dịch lên3px bằng translateY; giữ cỡ icon và vị trí chữ/cờ.

- 2026-10-27: Theo user thu nhỏ riêng Hủy/Sử dụng Tùy chỉnh avatar: cao36px/chữ16px/gap10px, cụm rộng tối đa280px căn giữa. Giữ màu/bo8px/hành vi mẫu xác nhận chung; không đổi nút thông báo khác.

- 2026-10-27: Theo user, Fairy cấp1–6 tăng dần: depth1–6, Skill0/3/6/10/14/18, tỷ lệ random nước hợp lệ85/65/45/25/12/4%; random sau replay/validatehistory+abort và lọc lặp cấm. Cấp7–10 cùng engine NNUE fullstrength Skill20/MultiPV1/LimitStrengthfalse, go movetime tối đa800ms thay depth7–10; giới hạn RAM/CPU/clock/cancel giữ. Không đổi UI/PvP/Pikafish/Cờ Úp khác engine. Tests3PASS/1SKIP (240ply gated không chạy); native smoke cấp1/6/7/10 đều trả legal951–1817ms gồm startup, UCI xác nhận options. Typecheck/build PASS; dist cập nhật. Chưa đo Elo/đấu kiểm định độ khó hoặc browser; backend cần nạp code mới, không restart/deploy.

- 2026-10-27: Theo user, Hủy/Sử dụng trong Tùy chỉnh avatar dùng confirmationCancelButton/confirmationAcceptButton và confirmationDialogActions chung như thông báo2lựa chọn: nút44px/chữ18px,2cột/gap12px/bo8px, Hủy nâu/Sử dụng vàng. Giữ callback và dim khi đã áp dụng.

- 2026-10-27: Theo user, Chọn Bàn/Tạo bàn thay dấu×dínhảnh bị kéo dọc bằng nút SVG viewBox vuông/aspect-square, giữ tâm/vùng đóng và pending. Picker tỉnh giữ Tất cả đầu tiên, tỉnh sắp số bàn có người giảm dần rồi người chơi giảm dần, hòa theo tênvi. Tăng tên36→40desktop/mobile10.5→12cqw và số28→32desktop/mobile9→10.5cqw, giới hạn cqh tương ứng. Không đổi profile province/API. Build/typecheck PASS; dist index-BOVf4z1L.js xác nhận cập nhật; chưa browser QA.

- 2026-10-27: Theo user, tăng số Elo hai ô Cờ Tướng/Cờ Úp trong PlayerInfoCard từ24→28logical theo scale dialog; giữ icon/khung/điểm.

- 2026-10-27: Theo user, PlayerInfoCard padding ngang6px desktop/compact thay4px; số hàng Bạn bè/Theo dõi/Lượt thích tăng25→26logical desktop,27→28mobile. Giữ nhãn/gap chữ–số và các dòng khác.

- 2026-10-26: Theo user, PlayerInfoCard padding ngang đúng4px (desktop/compact), padding dọc2px/gap2 giữ nguyên; không đổi cỡ nội dung/khung.

- 2026-10-26: Theo user, khung bao tên/Elo trong Thông tin phải đồng nhất khung preview Tùy chỉnh avatar (đều dùng PlayerInfoCard chung); co nội dung vào trong bằng padding8px/gap8px, giữ nguyên cỡ mọi chữ/số/icon và kích thước ngoài.


- 2026-10-26: Theo user, tăng gap nhãn–số ở hàng Bạn bè/Theo dõi/Lượt thích từ4→8px; số chỉ nhích24→25 desktop và26→27 mobile. Logic ẩn nhãn khi thiếu chỗ giữ.

- 2026-10-26: Theo user, thu hàng Bạn bè/Theo dõi/Lượt thích một nấc: nhãn22/mobile26, số24/mobile26. Phóng icon địa chỉ26/mobile30 và cờ quốc gia26×36 trong PlayerInfoCard; không đổi text/data/geometry khác.

- 2026-10-26: Theo user, tăng nhãn Bạn bè/Theo dõi/Lượt thích lên24px desktop/28 mobile, bỏ icon tim; đo fit để ẩn nhãn khi hẹp và giữ số/aria. Địa chỉ PlayerInfoCard dùng overflow-x-clip (không clip dọc), line-height1.5 và padding dọc2px để nét chữ không bị cắt; expanded cũng giữ linebox đầy đủ.

- 2026-10-26: Theo user hoàn tác thêm1lượt Xem thành viên, về trước task đồng bộ Tin nhắn: nền nâu đặc#281205, bỏ nền/hoa văn mới và dòng kem/gap6slot, khôi phục dòng nâu chia8/đường phân cách cũ ở thành viên/trưởngphó/thêm/chặn/duyệt. Giữ chức năng quản lý/lời mời độc lập. Typecheck/build PASS; dist cập nhật; chưa browser QA.

- 2026-10-26: User đính chính hàng Bạn bè/Theo dõi/Lượt thích phải cùng1hàng, không wrap. PlayerInfoCard đo chiều rộng thực sau font load/resize, không đủ chỗ thì ẩn nhãn chữ và giữ số (tooltip/aria đầy đủ); số tăng26/mobile28logical. Thay quy tắc flex-wrap lượt trước.

- 2026-10-26: Theo user hoàn tác lượt nền giấy sáng Xem thành viên: khôi phục nền nâu/hoa văn compact và conversation-list-frame desktop, màu chữ/tab trước đó; compact giữ dòng inbox kem6slot, desktop dòng nâu8slot như trước lượt đổi giấy. Giữ các thay đổi chức năng độc lập. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-26: User đính chính Xem thành viên theo ảnh Xếp hạng: nền giấy sáng history-parchment-background+overlay#fff4dc52 chung Ranking, bỏ nền nâu/hoa văn. Các dòng tất cả/trưởngphó/thêm/chặn/chờduyệt dùng socialPlayerRowClass màu kem và inbox6slot/gap trên cả mobile/laptop; chữ tên/tiêu đề/tab màu nâu dễ đọc. Giữ avatar/chức năng/quyền. Typecheck/build PASS; dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, Thông tin dịch tên lên3logical, giãn các dòng Elo/thông tin bằng gap3/mobile4 và justify-between; hàng Bạn bè/Theo dõi/Lượt thích tăng chữ22/mobile27. Địa chỉ viết tắt Xã→X. bên cạnh Tp.; đo tràn bằng ResizeObserver, hiện nút … để mở toàn bộ địa chỉ xuống dòng. Section thông tin dùng min-height thay fixed-height để mở địa chỉ không đè thống kê; giữ avatar/khung và dữ liệu lưu.

- 2026-10-26: Theo user, Xem thành viên dùng nền Tin nhắn: compact gradient nâu/hoa văn SocialDialogFrame, desktop conversation-list-frame. Các dòng thành viên/trưởngphó/phongphó/thêm bạn/chặn/chờduyệt dùng messagesInboxRowStyle/ListStyle + socialPlayerRowClass trên compact,6slot/gap8scale; desktop giữ dòng inbox chia8/viềnnâu. Avatar/role/menu/quyền/API giữ. Typecheck/build PASS; dist cập nhật, chưa browser QA.

- 2026-10-26: Theo user, địa chỉ bảng Thông tin viết tắt Thành phố/TP. thành Tp. khi hiển thị; không đổi dữ liệu lưu. PlayerInfoCard tăng chữ địa chỉ19→22, mobile22→26; ID15→17, mobile19→22 theo scale dialog. Giữ geometry/avatar/copy ID.

- 2026-10-26: Theo user, chấp nhận lời mời nhóm mà API pendingApproval=true tiếp tục chờ chủ nhóm duyệt và hiện toast Chờ duyệt bay lên qua useInviteSentNotice; chưa đưa vào inbox/cấp membership. Chấp nhận vào ngay vẫn im lặng. Backend giữ join_request hiện có. Typecheck/build PASS; dist xác nhận Chờ duyệt, chưa browser QA.

- 2026-10-26: Theo user, Lời mời nhóm bỏ dòng status phía trên; từ chối dùng useInviteSentNotice toast Đã từ chối giữa màn/baymất như kết bạn, chấp nhận thành công im lặng. onChanged truyền groupId chỉ khi đã vào thực sự (pendingApproval không đưa lên), reload inbox đưa nhóm mới nhận lên đầu bằng mốc nhận theo account trong phiên dialog, giữ qua poll; tin mới hơn có thể lên trước. Lỗi API dùng toast, không status dòng. Typecheck/build PASS; dist cập nhật; chưa browser QA, thứ tự nhận chưa lưu qua reload trang.

- 2026-10-26: Theo user, gửi lời mời nhóm lặp vẫn được nhưng người nhận chỉ1dòng/nhóm và badge đếm1. DB hiện có PRIMARY KEY(conversation_id,user_id)+upsert không nhân bản; useGroupInvitations select gộp conversationId cho list/badge. Tăng icon Chấp nhận16→22px/max10cqw, Từ chối dùng SVG× cùngsize thay ký tự; giảm gap/font nhẹ để chữ vừa nút, giữ kích thước nút/dòng. Group-invitations11/11 PASS gồm resend upsert2lần; typecheck/build PASS; dist cập nhật, chưa browser/MySQL QA.

- 2026-10-26: User đổi riêng Tạo nhóm: createConversation thêm ngay creator(owner)+tất cả người được chọn(member) trong cùng transaction, không INSERT conversation_invitations khi tạo. Thêm thành viên vào nhóm đã có vẫn giữ luồng lời mời/consent. Không migration hay chuyển lời mời cũ. Group-invitations10/10 PASS (regression mới xác nhận3membership/0invitation); typecheck/build PASS, dist cập nhật. Chưa HTTP/MySQL/browser QA; backend đang chạy cần nạp code mới, không restart/deploy.

- 2026-10-26: Theo user, avatar dòng lời mời lấy avatarUrl nhóm thật, fallback đúng create-group/avatar.png thay avatar người. Hai nút nhận/từ chối tăng vùng48→56%/cao34→42mobile40→48desktop, font theo container để gọn trong khung. Chữ ‹ Lời mời thay MessagesBackButton chung như chat, hiện cả khi trống. Giữ dòng/API/badge. Typecheck/build PASS; dist cập nhật, chưa browser QA.

- 2026-10-26: Theo user, bỏ nút Quay lại ở footer bảng Thông tin người khác (viewOtherProfileInfo); giữ nút Thoát bên phải và nút × đóng bảng. Không thay bố cục nội dung/avatar.

- 2026-10-26: Theo user, bấm dòng Lời mời vào nhóm mới mở nội dung, ẩn dòng danh mục khi mở. Trống hiển thị câu Chưa có lời mời vào nhóm căn giữa ngang/dọc vùng list. Có lời mời dùng cùng chiều cao/nền dòng inbox, chỉ avatar+tên nhóm, bỏ câu người mời; nút Chấp nhận/Từ chối dùng khung socialActionStyle/secondary Friends và icon thêm bạn. Có nút về Lời mời khi list có dữ liệu. Giữ API consent/cache/badge. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, Xem lại từ Lịch sử/Đã chơi cũng được chuyển ngay sang Đánh thử, không cần lưu ván/thế trước. Gỡ trialAllowed/save guard trong GamePage và luôn truyền toggle cho controls desktop; mobile/Space dùng cùng callback. Giữ snapshot trial độc lập và dữ liệu lịch sử gốc. Thay quy tắc bắt lưu trước đó. Typecheck/build PASS; dist index-jqKm3lQG.js xác nhận cập nhật; chưa browser QA.

- 2026-10-26: User yêu cầu bật lại icon chuyển Xem lại/Đánh thử ở tất cả nơi đã có. GamePage.toggleTrial bỏ chặn compact bằng thông báo Chức năng đang được cải tiến; mobile bấm icon hoặc Space dùng cùng toggle thật desktop. Icon dưới Board nhận trial.active để đổi nhãn Về xem lại/Đánh thử đúng trạng thái; giữ điều kiện lưu ván/thế trước khi thử, nhánh snapshot riêng/cancel/reset và vị trí icon. Desktop vốn hoạt động giữ nguyên; không thêm nút vào PvP thật. Replay-trial3/3 PASS; typecheck/build PASS, dist index-CUprs0AC.js xác nhận cập nhật; chưa browser QA.

- 2026-10-26: Đính chính theo user: Lời mời vào nhóm dùng icon danh bạ trắng vẽ SVG native trên nền tròn xanh nước biển gradient, group-invitation-icon.svg; không dùng ảnh chụp đính kèm. Giữ kích thước/khung tròn/dòng/badge. Typecheck/build PASS; dist có icon mới, chưa browser QA.

- 2026-10-26: Theo user, dòng Lời mời vào nhóm dùng chính ảnh đính kèm group-invitation-user.png, MessagesGroupAvatar bọc tròn/viền như inbox. Avatar dòng danh mục và lời mời40→52px (giới hạn theo dòng); avatar inbox50→56token/mobile72→84cqh. Giữ nguyên chiều cao/gap các dòng, logic lời mời/badge. Typecheck/build PASS; dist cập nhật, chưa browser QA.

- 2026-10-26: Theo user, nút Đã hiểu trong thông báo Chơi Với Máy/Luyện cờ phải một dòng. Bỏ size vuông/compact:size-10 khỏi nút thông báo, dùng inline-flex/min-width và whitespace-nowrap để chữ không xuống dòng. Giữ nội dung/callback thông báo.

- 2026-10-26: Theo user, Gợi ý ván máy/từ Vị trí tùy chỉnh dùng thinkMs800/responseBudgetMs800: server trừ validation/UCI startup khỏi ngân sách, dự phòng250ms trả kết quả, riêng hint dùng1thread/hash16MB để giảm khởi tạo; vẫn Pikafishlevel10/bestmove/validatelegal/cancel, không đổi cấu hình máy10cấp. Board arrow z2 dưới piecesz4 (trướcz10), xanh lá#76ad59 theo ảnh, thân22→34/head60→88logical. Đo engine thật ngoài sandbox965/994ms; cold trong sandbox có lần4085ms, chưa đạt bảo đảm tổng0.8s do khởi động/NNUE. Không timeout giả hay nước dự phòng. Hint5/5+Pikafish8/8+inputbudget1/1 PASS; typecheck/build PASS, dist index-h_bvtec1.js xác nhận. Chưa browser QA; backend cần nạp code mới.

- 2026-10-26: Theo user, Tin nhắn/Lời mời đổi nhãn tab Lời mời vào nhóm thành1dòng danh sách cùng messagesInboxRowStyle/nền như Tin nhắn, avatar nhóm/chữ trái và badge đỏ sốlượng bênphải; bấm dòng mở/thu lời mời bên dưới. Tab Lời mời dưới có badge góc trênphải. MessagesInvitationBadge chung hiện>0/99+, số thật từ useGroupInvitations query cache riêngaccount/poll5s luôn khi sidebar mở, cập nhật ngay khi phản hồi; không còn tab loại lời mời. Giữ API/consent/phânquyền. Typecheck/build PASS; dist xác nhận hook/badge, chưa browser QA.

- 2026-10-26: Theo user, bỏ SVG chevron ngoài cùng trong mục Tạo nhóm vì asset action-row-blank đã chứa mũi tên. Tin nhắn và Lời mời vào nhóm MOBILE dùng messagesInboxRowStyles chung: khoảng cách round(8×scale) và slot6dòng như Xếp hạng, row gradient/viền/bo góc chung. Nội dung Tin nhắn giữ chiều cao7slot cũ trong hàng mới để không phóng avatar/chữ theo cqh; avatar lời mời giữ40px. Chỉ sửa trình bày, giữ API/consent. Build/typecheck PASS; dist index-BeLjnGiC.js xác nhận cập nhật; chưa browser QA.

- 2026-10-26: Theo user, mục Tạo nhóm trong Cài đặt Tin nhắn dùng ảnh action-row-blank chung dòng tùy chọn nhóm: nền nâu/viền vàng/hoa văn, icon nhóm vàng trái và chevron vàng phải. Menu rộng240px/max viewport-48px, dòng cao50px/chữ18px. Giữ callback tạo nhóm. Build/typecheck PASS; dist index-2uwhOlim.js xác nhận cập nhật; chưa browser QA.

- 2026-10-26: User chốt kết thúc xem thử nhận thưởng: xóa HOME_REWARD_PREVIEW/PREVIEW_REWARDS/chữ Xem thử, Home chỉ visible khi có pending thưởng thật, Xác nhận ack đồ đang hiện; không mở lại mỗi lần về Home. RewardItemTile/RewardPreviewDialog dùng chung Home và MatchResultDialog: ô vuông/hình lớn/số bên dưới4px/hàng ngang, bấm xem lớn không đóng bảng kết quả. Trong trận giữ khung thắng/thua/mốc vùng thưởng, chỉ hiện vàng/Elo khác0 từ props thật; giữ dấu trừ Elo nếu thua, không thay thưởng/backend. Match-result14/14 PASS; typecheck/build PASS, dist có giao diện mới/không demo, chưa browser QA.

- 2026-10-26: Theo user, Cài đặt Tin nhắn chỉ hiện icon bánh răng giống Cài đặt nhóm, dùng SettingsIcon chung giữ nguyên artwork; bỏ chữ/khung nút riêng, đặt bên phải ô tìm kiếm trong cùng một hàng mobile/desktop. Hai tab dưới cùng Tất cả/Lời mời giảm padding dọc10→4px và khoảng trên8→4px. Build/typecheck PASS; dist index-Ba1-eWvx.js xác nhận cập nhật; chưa browser QA.

- 2026-10-26: Theo user, chữ số trong tên vật phẩm nhận thưởng dùng lining-nums/tabular-nums để cùng đường chân/cao chữ, giữ font-heading/cỡ hiện tại. Đồng bộ số lượng thưởng tại ô và preview cùng kiểu số thẳng. Chỉ HomeRewardNotifications; typecheck/build PASS, dist xác nhận class mới; chưa browser QA.

- 2026-10-26: User chốt dùng hình Elo HD v2 hiện tại và áp dụng cho toàn project. XIANGQI_ELO_ICON tại lib/eloArtwork.ts dùng chung elo-home-hd-v2.png cho Home mobile/laptop, Xếp hạng, PlayerInfoCard/Thông tin, PlayerCard trong trận và MatchResultDialog, popup thưởng/preview. Chỉ đổi icon Elo Cờ Tướng; kích thước/bố cục/điểm/sao/quân bàn cờ/Elo Cờ Úp giữ nguyên. Yêu cầu này mở phạm vi ảnh Elo tại các màn vốn khóa trong task. Typecheck/build PASS; dist có asset/bundle mới, đã đối chiếu7nơi dùng/chưa browser QA.

- 2026-10-26: User chốt Tin nhắn: bỏ nút Tạo nhóm trực tiếp, Cài đặt nằm bên phải và chứa mục Tạo nhóm; dưới cùng sidebar có Tất cả/Lời mời. Lời mời có tab Lời mời vào nhóm, dữ liệu DB/poll5s, Đồng ý/Từ chối. Tạo nhóm chỉ cấp membership cho creator, bạn được chọn nhận invitation; Thêm thành viên cũng chỉ gửi invitation. Người nhận đồng ý mới tạo membership; nếu nhóm bật duyệt và người mời không phải owner thì sau consent mới tạo join_request chờ owner, chưa đọc/gửi được. Từ chối không vào nhóm. Backend lọc recipient từ cookie auth, khóa conversation/transaction, kiểm tra inviter còn active/không bị chặn và owner còn tồn tại; dissolve dọn invitations. Migration012_group_invitations mới,001–011 giữ nguyên; đã apply1bước MySQL local+verifySchema PASS. Tests invitation10/admin18/moderation12/chat9/migration5 =54 PASS khi chạy riêng từng file (Vitest chạy chung lỗi cache SSR/ENOENT, no-isolate xung đột mocks). Typecheck/build PASS, dist cập nhật; chưa browser/2client QA; không restart/deploy, backend đang chạy cần nạp code mới.

- 2026-10-26: User yêu cầu tạo Elo gần hình cũ hơn. Home chuyển elo-home-hd-v2.png, built-in imagegen tham chiếu trực tiếp red-general.png và yêu cầu bám nét chữ/viền mảnh/màu vàng ngà-đỏ; đã xem ảnh kết quả, giữ ảnh độ phân giải cao không filterblur. Ô thưởng/preview dùng cùng v2; ảnh trận giữ nguyên. Prompt/source tại assets/game-result/elo-home-hd-v2.md. Build/typecheck PASS, dist chứa v2; chưa browser QA.

- 2026-10-26: User báo Elo vẫn mờ/răng cưa sau Gaussian. Gỡ SmoothEloArtwork/filter/useId; Home dùng elo-home-hd-v1.png1270×1239 dựng nét lại bằng built-in imagegen từ chính red-general.png60×62 (đồng vàng ngà/chữ đỏ/vòng đỏ/viền vàng), không dùng biến thể source-cut quân cờ. Cả ô thưởng và preview dùng cùng ảnh nét cao, không blur. Nguồn/prompt: assets/game-result/elo-home-hd-v1.md. Giữ ảnh trong trận; typecheck/build PASS, dist có asset mới; đã xem ảnh nguồn/kết quả, chưa browser QA.

- 2026-10-26: Theo user, ẩn dòng trạng thái “đang suy nghĩ” của máy và giới hạn search Fairy tối đa800ms mỗi lượt; mức depth hiện chọn vẫn làm giới hạn tìm kiếm. Giữ các trạng thái lỗi/thông báo. Search thật level10 trả nước hợp lệ; tổng request Windows đo1.8s do startup process/UCI.

- 2026-10-26: User yêu cầu làm mịn Elo thưởng Home nhưng giữ chính hình chiến thắng. SmoothEloArtwork dùng nguyên red-general.png 60×62 trong SVG, browser nội suy auto + Gaussian0.28 đơn vị nguồn, padding1px tránh cắt mép; áp dụng cả ô thưởng và preview lớn. Không thay artwork/bảng kết quả trận; Cờ Úp nguồn lớn giữ nguyên. Typecheck/build PASS; dist xác nhận feGaussianBlur0.28; chưa browser QA.

- 2026-10-26: CD production manual trên master phải chạy CI exact-SHA gate; dùng `cotuong_app` chỉ DML để verify schema hiện tại và `cotuong_migrator` riêng cho migration. Backup local/cloud mới phải được xác minh trước DDL. Migration lỗi có thể implicit-commit nên dừng service, giữ backup pre-migration, không tự restore DB/rollback code; chỉ cho rollback code sau migration thành công khi người review đã xác nhận tương thích dữ liệu.

- 2026-10-26: Theo user, tên hiển thị của Fairy-Stockfish trong Chơi Với Máy, bàn đấu và trạng thái đang nghĩ là “Ông Hoàng”; tên engine/protocol/backend vẫn Fairy-Stockfish. Không đổi engine hoặc tích hợp Pikafish.

- 2026-10-26: Theo user, Tin nhắn → Nhóm → Thêm thành viên dùng cùng bố cục dòng Thành viên: avatar, SocialPlayerName, chiều cao 1/8 viewport, font/padding/đường phân cách/scrollbar; nút + riêng gửi lời mời, avatar mở thông tin. Giữ lọc bạn accepted chưa trong nhóm và API. Typecheck/build PASS; dist index-BAadv2uf.js xác nhận cập nhật; chưa browser QA.

- 2026-10-26: User chốt Elo thưởng Home phải dùng chính hình trong bảng chiến thắng: import assets/pieces/red-general.png cho Cờ Tướng và history/history-hidden-user.png cho Cờ Úp, cùng MatchResultDialog. Bỏ dùng bản source-cut/HD/phóng lại khác hình; giữ browser antialias imageRendering:auto. Typecheck/build PASS; dist cập nhật, chưa browser QA.

- 2026-10-26: Đính chính icon Elo trong popup thưởng Home: giữ đúng đồng Elo đỏ trên nền vàng ngà (đồ họa gốc red-general-source-cut-v1), không dùng biến thể quân cờ mới red-general-source-cut-v1-hd. Tạo bản phóng 4× bằng nội suy bicubic chất lượng cao để giảm răng cưa khi xem lớn; chỉ popup thưởng Home dùng asset mới, không đổi icon Elo trận/xếp hạng. npm.cmd run build/typecheck PASS; dist chứa red-general-elo-smooth-4x-BPB_WDjw.png và bundle mới; chưa browser QA.

- 2026-10-26: Chơi Với Máy dùng Fairy-Stockfish 220722 LB làm lựa chọn duy nhất đang hiển thị; service backend riêng `/api/fairy-stockfish`, `UCI_Variant=xiangqi`, yêu cầu xác nhận log NNUE đã bật, tối đa2 process ×2 threads/128MB hash, timeout15s/cancel. Rank Fairy1–10 map game0–9; replay lịch sử và validate legal/repetition bằng game rules. Pikafish vẫn được giữ cho replay/hints, không dùng cho ván mới. HOVANG source/adapters/tests/docs bị gỡ khỏi active checkout sau backup ZIP SHA256 `97FEDF32CF1A34D1EF16C8CCD118BFF59E113516E89248A792C6CD9FA12BA112` trong `.checkpoints/fairy-migration-hovang-backup-20261026/`. Fairy Windows exe ignored/local; Linux cần native `FAIRY_STOCKFISH_PATH`, chưa xác minh. Test engine thật 240 ply + resignation, HTTP ready/move cả hai màu, computer/position/Pikafish regressions40 PASS/1 SKIP, typecheck/build PASS; dist cập nhật. Chưa browser QA. Xem `docs/FAIRY-STOCKFISH-INTEGRATION.md`.

- 2026-10-26: Theo user, bảng nhận thưởng Home chỉ1hàng ngang/flexnowrap/wmax/scrollX+touchpanx, không xuống dòng. Bấm ô mở RewardPreview kiểu Shop (khung nâu/ảnh lớn/title/Đóng/Escape/bấmngoài), không xác nhận/đóng thưởng bên dưới. Icon Elo riêng popup dùng ảnh red-general-source-cut-v1-hd thay bản nhỏ, objectcontain/antialias browser; không sửa icon/trận. Typecheck/build PASS; dist cập nhật; chưa browser QA lướt/preview.

- 2026-10-26: Theo user xem thử, HOME_REWARD_PREVIEW=true: mỗi lần screen chuyển vềhome (kể cả mở đầu) hiện bảng nhận5món mẫu avatar16/vàng1000/Elo20/danhhiệu cct5/viền4. Xác nhận chỉ đóng preview, không ghi nhận/xóa pendingthật hay cộngđồ/vàng/Elo/DB; lần vềhome kếtiếp hiện lại. Nhãn Xem thử, tắt cờ để trở lại thông báo thật. Typecheck/build PASS; dist index-BIjlCtvu.js xác nhận preview-avatar; chưa browser QA.

- 2026-10-26: Theo user, hai nút×/✓ trong lời mời thu chiều cao36desktop/38mobile→30px, dấu32→28px để vừa; giữ ngang56/64. Chữ Không hiển thị lại tăng11→12px, ôtick14px/khung2/3/callback giữ. Typecheck/build PASS, dist xác nhận30px; chưa browser QA.

- 2026-10-26: Theo user, Home thêm popup nhận đồ từ ảnh85b40e21: ô vuông đồngcỡ cho danh hiệu/avatar/viền/vàng/Elo, số tài nguyên ngoài ô bên dưới4px/icon88%. Resource-only giữ vùng18/56/64/16% như trận; không sửa MatchResultDialog. Hook quan sát profile/APIhonors5s→homeRewardsStore baseline/pending localStorage riêngaccount, firstload chỉbaseline, xác nhận xóa pendingđanghiện; gold/Elo bỏ khi game/replay hoặc played tăng để tránh lặp thưởng trận. Đồ mới chờHome. Snapshot-based/chưa ledgerthôngbáoserver/ackchưađồngbộthiếtbị; xem docs/HOME-REWARDS.md. Build/typecheck PASS; dist index-DJG3nU5R.js + asset; chưa browser/API QA, không DB/restart/deploy.

- 2026-10-26: Theo user thu rõ thông báo nhận Mời chơi/So tài: avatar76→48px (danhhiệu/khung theo), câu22→16px, nhãn Không hiển thị lại14→11px/checkbox18→14px. Thông báo mobile rộng2/3viewport, desktopmin320/2/3viewport, padding12px/gap12/mravatar16 thay32; cụm nhãn+tick rộng2/3khung cănphải. ×✓/logicblock5phút/thời hạn giữ. Typecheck/build PASS, dist xác nhận66.667vw; chưa browser QA.

- 2026-10-26: Theo user sửa thông báo nhận Mời chơi/So tài: bỏ dòng tên riêng phía trên, chỉ giữ câu “Tên muốn so tài.” tăng22px cảmobile/laptop (override compact p18), căn giữa dọc cạnhavatar. Thu nhãn Không hiển thị lại20→14px và checkbox28→18px, giữcụmcănphải/gap8/logic5phút/×✓/avatar. Typecheck/build PASS, dist xác nhận22px; chưa browser QA.

- 2026-10-26: User yêu cầu lại khoảng dưới tìm Bạn bè MOBILE bằng khoảng trên với3tabcon. Lượt mb4 trước chưa tính ui-p48/60 đã scale1.5 còn ui-p4 khôngscale1.5. Sửa marginbottom=var60-var48-2var4, nên hai khoảng thực đều gap14-top4; áp dụng Danh sách/Thêm bạn và trừ cùng reserve trong phép fit6hàng. Giữ vị trí/cỡ ô tìm/phần trên/avatar/laptop. Typecheck/build PASS, dist xác nhậncalc; chưa browser QA.

- 2026-10-26: Theo user, mọi nút gửi Kết bạn dùng toast Đã gửi như Mời chơi/Không đủ tiền: useInviteSentNotice nềnnâu/chữ18px/giữa/bay48px-mờ1300ms. Bạn bè Thêm bạn mobile/laptop bỏ subsystemtoastxanh/fontload/timer500ms, dùng cùng notice đang có choMời chơi. Hồ sơ và MessagesMemberFriendButton nối onSent cho useMessageFriendship; hội thoại đã dùng sentNotice giữ. Chỉ hiện sau request thành công, không hiện khi accept/hủy/xóa/lỗi. Giữ API/quan hệ/nút/layout/khóa avatar. Typecheck/build PASS, dist cập nhật; chưa browser/API QA.

- 2026-10-26: Theo user, mua không đủ vàng hiển thị toast “Không đủ tiền” dùng useInviteSentNotice như Đã gửi lời mời: giữa màn hình/nền nâu/chữ18px/bay48px rồi mờ trong1300ms, không nút×/không nền phủ. Áp dụng Shop mobile/laptop, chỉ nhận đúng lỗi thiếu vàng backend; các lỗi khác và giao dịch giữ nguyên. Bỏ popup thiếu tiền cũ/timer2s. Typecheck/build PASS, dist có toast; chưa browser/API QA.

- 2026-10-26: User yêu cầu khung/chữ/hai nút thực sự cùng cỡ Shop và độmờ như thông báo hiện tại. Phát hiện getCrispUiLayout kế thừa --spacing/--text khiến class chung vẫn bịthu. confirmationDialogFrame reset tokenspacing/text/radius vàpadding24px; title30desktop/24mobile, mô tả20/18px, buttons44px/chữ18/gap12, mt24px cố định. Dùng chung toàn bộ xác nhận gồm Shop; bo8 giữ. Lớp phủ60%đen/khôngblur; Shop bỏbackdropblur/65→60, Chặn/Xóa chat/Tắt thông báo/địa chỉ chuyển NoticeOverlay phủfullviewport chung như Xóa bạn, Escape đóng đúngform. Một nút giữ nguyên. Typecheck/build PASS, dist xác nhậnpxfixed/overlay; chưa browser QA.

- 2026-10-26: Theo user, các thông báo2lựa chọn dùng khung Xác nhận mua Shop làm chuẩn. Tách confirmationDialogStyles dùng chung khung/màu/nền/viền/bóng, rộngmin440px/90vw, title3xl/mobile2xl và nội dungxl/mobilelg, actions2cột. Áp dụng xác nhận chung Xóa bạn/phong chức/xóa thành viên/rời/giải tán/chuyển khóa, Chặn/Bỏ chặn/Xóa chat/Tắt thông báo, Đăng xuất, thiết lập địa chỉ, reset Đánh thử và Shop; thêm tiêu đề Xác nhận ở hộp trước chỉ có câu hỏi. Bỏ kích thước240px/épchữ18 riêng của cặp xác nhận để theo Shop. Hai nút bo16→8px qua tokenchung (Tạo nhóm cũng dùng token), giữ nâu/vàng/callback/pending. Thông báo một lựa chọn giữ nguyên mẫu cũ. Typecheck/build PASS, dist xác nhận tokenkhung/bo8; chưa browser QA.

- 2026-10-26: Theo user, thông báo có2lựa chọn dùng khung nút Hủy/Tạo nhóm MOBILE: Hủy nâu gradient#61300e→#2a1005/viền#c98b31/chữkem; Đồng ý vàng gradient#ffe68b/#f2ab24/#c47412/viền#ffe08b/chữnâu. Tách confirmationButtonStyles chia sẻ với2nút Tạo nhóm; áp dụng xác nhận chung Xóa bạn/phong chức/xóa thành viên/rời nhóm, Chặn/Bỏ chặn/Xóa chat/Tắt thông báo, Đăng xuất, thiết lập địa chỉ, reset Đánh thử và xác nhận muaShop cả2viewport. Giữ panel/nội dung/callback/pending/layout; nút thông báo một lựa chọn Đóng/Đã hiểu giữ nguyên mobileNoticeButtonStyle. Không đổi nút trong các form nhập tên/địa chỉ. Typecheck/build PASS, dist xác nhận2gradient; chưa browser QA.

- 2026-10-26: User hoàn tác riêng icon trong nút Tìm: Bạn bè trở lại kínhlúp32/stroke3.5/size36mobile,31desktop; Chọn Bàn trở lại kínhlúp24/r6.5/stroke2/size16; màu nâu kế thừa nút. SearchButtonIcon chia sẻ mẫu Bạn bè. Giữ khung vàng580e9677, các icon trong ô tìm vẫn mẫu Tin nhắn, không hoàn tác thay đổi khác. Typecheck/build PASS, dist xác nhận icon cũ; chưa browser QA.

- 2026-10-26: Theo user, nhạc chỉ phát trong game, bỏ bảng media Android/Chrome. useHomeMusic chuyển HTMLAudioElement/new Audio sang BackgroundMusicPlayer dùng AudioContext/AudioBufferSourceNode trực tiếp, không MediaSession/media element. Giữ3bài/thứtự/nghỉ4giây/player xuyênmàn/toggle và preference; tạm dừng context khi document hidden, tiếp tục cùng source khi visible, visibility listener thuộc singleton kể cả trang không mount hook. Decode bất đồng bộ khóa version để tắt/ẩn không phát muộn; chỉ giữ buffer bài hiện tại. Tests nhạc+GameSounds12/12 PASS; typecheck/build PASS, dist có decoder mới/không new Audio. Chưa kiểm chứng bảng hệ thống trên Android thật, cần tải lại trang để giải phóng player cũ.

- 2026-10-26: User báo icon nút Tìm chưa đồng bộ: hình đã chung nhưng còn cỡ36/31/16 và màu nâu riêng. SearchButton tự render SearchIcon size var(--ui-p-24,24px)/màu#e5b45d đúng Tin nhắn; bỏ icon children và override svg36 tại các nút Bạn bè mobile/laptop/Chọn Bàn. Giữ chữ/khung/nút/logic. Typecheck/build PASS, dist xác nhận mẫu dùng chung; chưa browser QA.

- 2026-10-26: Theo user, toàn bộ icon tìm kiếm dùng mẫu Tin nhắn: SearchIcon chung SVG24/circle10,10,r7/path m15 15 7 7/stroke2. Thay tại ô/nút Tìm Bạn bè mobile/laptop, Chọn Bàn, tìm hội thoại, tìm bạn Tạo nhóm và tìm thành viên. Giữ kích thước/màu theo ngữ cảnh và logic tìm; không đổi layout/avatar. Typecheck/build PASS, dist cập nhật; đã rà không còn mẫu kínhlúp cũ, chưa browser QA.

- 2026-10-26: Theo user, Bạn bè MOBILE tăng khoảng cách từ khung tìm kiếm xuống danh sách thêm var(--ui-p-4) để bằng khoảng cách từ3bộlọc phía trên xuống khung tìm (gap14/top-4; form48+10.2/art70.2 khiến khoảng dưới thiếu4). Áp dụng form Danh sách/Thêm bạn, giữ desktop và avatar/hàng. Typecheck/build PASS, dist xác nhận compact margin-bottom; chưa browser QA.

- 2026-10-26: Theo user, SearchButton dùng asset580e9677-60e1-44a8-9fd5-45ef04444b44.png thay khung CSS vàng ở Bạn bè/Chọn Bàn cả mobile/laptop. Căn background theo vùng artwork(124,159)-(1650,725) trong ảnh1774×887 để khung phủ đúng nút, không sửa ảnh nguồn; chữ/icon nâu#2b1909 để rõ trên nền vàng. Giữ sizing từng nơi/submit/disabled/logic tìm. Typecheck/build PASS, dist có asset và import; chưa browser QA.

- 2026-10-26: Theo user, lấy ô tìm Bạn bè làm chuẩn tỷ lệ sizing/bo góc. searchFieldMetrics chung: compact H60×1.17,placeholder21/input24/radius10; desktopH56/placeholder23/radius10; font nhập min16/placeholder mobilemin14 như Friends. Áp dụng theo chiều cao ô sẵn có tại Chọn Bàn, tìm hội thoại Tin nhắn, tìm bạn Tạo nhóm; giữ vị trí/kích thước ô/chức năng/font/màu, không đổi Bạn bè desktop đang khóa. messagesFriendsField bo10px→44×10/70.2px cho mọi nơi dùng khung nâu này (kể cả nhập chat/biệt danh), cỡ chữ mặc định nonsearch16/14 giữ nguyên; search truyền CSSvars. Ô địa chỉ/quốc gia dùng khung khác không đổi. Build/typecheck PASS; dist có helper CSSvars; chưa browser/keyboard QA.

- 2026-10-26: Theo user giảm độ tối nút Mời chơi/So tài khi chờ5giây: brightness50→75% tại Bạn bè/Hồ sơ/Xếp hạng cả mobile/laptop; opacity100% để chỉ làm tối nhẹ. Giữ cooldown và hành vi. Typecheck/build PASS, dist xác nhận style75%; chưa browser QA.

- 2026-10-26: Theo user, chữ “Không hiển thị lại” trong lời mời nằm sát bên trái ô tích, gap8px; cả cụm căn phải dưới×/✓ thay dàn đều hai mép. Giữ chữ20px/ô28px và hành vi. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, sau khi bấm Mời chơi/So tài phải chờ tối thiểu5giây mới mời tiếp. challengeCooldownStore dùng chung các entry Bạn bè/Hồ sơ/Xếp hạng cả mobile/laptop; khóa ngay khi gửi, giữ qua đóng/mở/chuyển bảng, hết5giây tự mở khi request đã kết thúc. Nút mời bị disabled và tối brightness50% trong lúc chờ. Server chặn gửi thành công liên tiếp dưới5giây theo accountID (fallback socket), giữ qua reconnect cùng account và dọn mốc hết hạn. Không thay thời hạn lời mời hay quy tắc chặn người gửi. Test cooldown/service/socket11/11 PASS (lượt sandbox lỗi temp/localhost; chạy ngoài sandbox PASS); typecheck/build PASS, dist có cooldown và style. Chưa browser QA, không restart/deploy backend.

- 2026-10-26: Theo user, nút Ẩn Danh hiệu MOBILE cách phải thêm8px: right15→23px. Build/typecheck PASS; dist xác nhận23px; chưa browser QA.

- 2026-10-26: Theo user, nút Ẩn Danh hiệu MOBILE cách phải thêm5px: right10→15px. Giữ phần khác. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, toggle Ẩn catalog Danh hiệu MOBILE chuyển từ giữa sang phải10px thật, bỏ left50%/translateX. Giữ cao/bật tắt/desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, thu nhẹ chữ Chưa có danh hiệu catalog: mobile24→22px, desktop3xl→2xl. Giữ font/màu/căn giữa. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, tăng chữ Chưa có danh hiệu trong catalog Danh hiệu text-xl→text-3xl desktop, mobile24px thật để không co nhỏ theo dialog. Giữ font/màu/căn giữa và empty preview Thông tin. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-26: Hạ biển Danh hiệu2px theo user (translateY-4→-2px), giữ cỡ/khung/tab/X. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-25: Rà soát 14 test fail ban đầu. Mười lỗi tái hiện được là assertion/fixture lỗi thời (Cầu hòa đang ẩn; addressNoticeOpen; overlay đóng qua lớp phủ; archive ID mới; ResizeObserver và selector hàng Đã lưu; Shop chợ server 6 món/3000 vàng; form tìm kiếm vẫn tồn tại sau khi hủy form tạo; Chọn Bàn không còn input tên). Country-picker và3 test UI khác không tái hiện ở lượt chạy tập trung/full suite cuối nên chưa kết luận nguyên nhân riêng. Không có lỗi luật game/runtime được tái hiện. Cập nhật test, không bỏ/xóa test. Giữ nguyên HOVANG CI import fix; thuật toán/file HOVANG local không chỉnh. Kết quả cuối 423 PASS/21 skip có sẵn trên444 tests, typecheck/build PASS.

- 2026-10-25: User yêu cầu hoàn tác riêng lượt trả khung Xóa bạn/Chặn/Xóa trò chuyện về mẫu cũ vừa sửa. Khôi phục mobileNoticePanelStyle/ButtonStyle dùng chung như trước lượt đó; giữ các thay đổi trước (kích thước/hàng nút/chữ giữa/độmờ). Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User đính chính Xóa bạn/Chặn/Xóa trò chuyện dùng KHUNG CŨ Xóa trò chuyện, không kiểu Giải đấu. Trả xác nhận chung MOBILE về gradient nâu#54290f→#241007/viền vàng#e7b755/bo14/bóng cũ, Hủy nâu/Đồng ý vàng; giữ width360/height240/hàngnút cố định/chữ giữa/độmờ đã chốt. Chỉ thông báo một nút Profile/Friends giữ kiểu Giải đấu. Build/typecheck PASS; dist xác nhận khung xác nhận cũ; chưa browser QA.

- 2026-10-25: Theo user, biển chữ Danh hiệu thu ngang6px thực (calc trừ6px), nâng4px bằng translateY; giữ chiều cao/khung lớn/tab/X. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, xác nhận Xóa bạn và các thông báo cùng kiểu MOBILE đồng bộ hình thức thông báo Giải đấu: nền nâu#30271e/viền#c7a264/bo12/bóng và nút vàng Home bo3. Dùng mobileNoticePanelStyle/ButtonStyle chung cho Profile feedback, Friends feedback và xác nhận Tin nhắn/Xóa bạn/Xóa thành viên; giữ rộng/cao/hàng nút đã chốt và giữ NGUYÊN lớp phủ/dộmờ từng nơi, không thêm blur. Desktop Bạn bè giữ nguyên; phạm vi mobile thông báo user mở task này. Build/typecheck PASS; dist xác nhận style mới; chưa browser QA.

- 2026-10-25: Theo user, toggle Ẩn Danh hiệu MOBILE căn giữa ngang và giữa đáybiển→đầu tab bằng calc theo86token/offset-30token/slot50px/h18px. Header slot40→50 để đủ vùng toggle không chồng tab; biển tăng nhẹ rộng0.9→0.94/cao0.98→1.02×86token. Giữ khung ngoài/X/nội dung. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, các xác nhận Tin nhắn MOBILE (Xóa chat/Chặn/Bỏ chặn/Xóa bạn/Xóa thành viên) cố định cao240px/cùng width360 đã chốt, flexcol với nội dung căn giữa vùng phía trên và hàng Hủy/Đồng ý cố định đáy padding20px. Dùng chung messagesConfirmationBody/Actions:2cột bằng nhau/gap12/nút46px/chữ giữa; nội dung dài cuộn riêng, không đẩy nút. Desktop/luồng giữ nguyên. Build/typecheck PASS; dist xác nhận chiều cao/hàng nút; chưa browser QA.

- 2026-10-25: Theo user, bỏ background phong cảnh Danh hiệu vừa thêm (giữ nền nâu), MOBILE đẩy tab/lưới lên12px qua header slot52→40; nội dung grid top1→0 nâng thêm. Biển chữ Danh hiệu chỉ tăng cao0.9→0.98×86token, ngang giữ0.9 như trước; khung lớn/X giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, thu biển chữ Danh hiệu10% giữ tâm/top, thêm profileScene cùng Thông tin phía trên trong viền trong. Ảnh cao238token/mobile302token, mask đen65%→transparent100% hòa xuống nền nâu, clip rounded trong khung. Giữ kích thước/vị trí khung lớn và close/lưới. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, gửi Kết bạn từ Tin nhắn dùng useInviteSentNotice chung Mời chơi, sau social request thành công mới toast Đã gửi (không toast accept/cancel/lỗi). Xóa trò chuyện/Chặn/Bỏ chặn/Tắt thông báo MOBILE chung rộng min360px,viewport-48/mincao200/padding20/chữ18/nút46px, giữ desktop và luồng. Câu hỏi Chặn dùng NumberText compact/normal để số tên cân hàng chữ. Token messagesConfirmationSize dùng chung Options và xác nhận Xóa bạn/Xóa thành viên. Build/typecheck PASS; dist xác nhận kích thước mới; chưa browser/API QA.

- 2026-10-25: Theo user, biển Danh hiệu đồng bộ kích thước CHÍNH ảnh Thông tin: h86token/w86×2074/358, căn giữa thay width100%header phụ thuộc container. Mobile nâng thêm12token đúng translate của header Thông tin (top tổng-30token). Close wrapper inset5token bằng border ngoài Profile để cùng containing block và offset top/right; giữ cỡ closeScale. Dùng artwork Danh hiệu mới có chữ từ edit ảnh Thông tin, không tạo ảnh khác. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User báo trạng thái Tin nhắn chưa thật. API GET conversations bổ sung online theo peerId trong tập tài khoản Socket.IO đang kết nối (cùng nguồn ranking/social), nhóm không giả online. MessagesDialog bỏ hardcode offline, dùng c.online và polling1s hiện có; header bỏ hardcode Đang hoạt động, đổi theo online/offline; chấm header MOBILE tăng12px, giữ chấm danh sách đã thu/geometry avatar. API regression1/1 PASS xác nhận online→offline và đổi tài khoản online qua lần poll; build/typecheck PASS, dist cập nhật. Backend cần nạp code mới; chưa restart/deploy. Chưa browser/socket nhiều thiết bị QA.

- 2026-10-25: User báo Danh hiệu vẫn lệch Thông tin. Sửa MOBILE bỏ dialog fullscreen/grid riêng: dùng đúng native dialog width/height=dialogWidth/Height×scale như Thông tin, wrapper absolute0/0 widthheight chính xác và translateY-6px. Bỏ phụ thuộc !w CSSvar; đưa X ra khỏi grid nội dung, neo root khung với closeScale/top/right giống Profile. Desktop giữ viewport wrapper. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User đính chính phần cần bằng Thông tin là DANH HIỆU, không Tin nhắn. Hoàn tác riêng useProfileLayout/matchingLayout/translate-6/close custom của MessagesDialog, giữ các sửa concurrent khác. Danh hiệu MOBILE giữ width/height từ chính layout Thông tin và translate-6, sửa closeScale/top24/right28 theo rankingCloseLayout giống chính Profile (trước dùng dialogScale khác). Giữ icon Mở danh hiệu đã tăng28/24. Build/typecheck PASS; dist cập nhật; chưa browser QA. Hủy ghi chú lượt trước áp dụng kích thước Tin nhắn.

- 2026-10-25: Theo user, thu chấm trạng thái danh sách Tin nhắn MOBILE26→20cqh; tăng chấm trạng thái trên avatar Tạo nhóm MOBILE10→14px. Giữ màu online xanh/offline xám, vị trí/avatar/dữ liệu và desktop. Build/typecheck PASS; dist xác nhận2cỡmới; chưa browser QA.

- 2026-10-25: Theo user, Tin nhắn MOBILE dùng useProfileLayout cùng Thông tin (width740/height responsive/scale), dialog dịch lên6px cùng mốc. Giữ searchLayout khi nhập chống co; desktop Tin nhắn giữ hiện trạng2cột. Ẩn close mặc định surface, gắn DialogCloseButton scale từ incoming ranking giống Profile với top24/right28scaled; options close vẫn dismissOptions. Icon bút Mở danh hiệu trong Profile tăng nút24→28/icon20→24theo token. Build/typecheck PASS; dist cập nhật; chưa browser/keyboard QA.

- 2026-10-25: Theo user, dấu trạng thái Tạo nhóm Tin nhắn MOBILE dùng online xanh/offline xám gradient giống Bạn bè/Tin nhắn, bỏ offline đỏ; nhãn fallback cùng biến online lấy friends.online ưu tiên để không lệch chấm. Giữ avatar/layout/desktop/luồng tạo nhóm. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User yêu cầu tạo lại biển Danh hiệu giống CHÍNH ảnh Thông tin. imagegen edit info-title-friends-frame chỉ đổi chữ Danh hiệu, giữ vàng/đỏ/mây/tua/alpha; gốc references/uploads/honors-title-info-source.png, crop alpha>32 thành2145×374 runtime profile/honors/honors-title-info-frame.png. HonorsDialogShell dùng ảnh có chữ thay title-frame+HTML, giữ geometry/khung ngoài. Đã xem ảnh gốc/crop; build/typecheck PASS; dist có asset; chưa browser QA.

- 2026-10-25: Theo user, khung ngoài catalog Danh hiệu theo mẫu Thông tin: HonorsDialogShell dùng nền nâu/viền kép vàng/họa tiết4góc cùng giá trị, biển đỏ mây/tua từ artwork title-frame sẵn có và chữ Danh hiệu vàng nghiêng HTML. Dùng DialogCloseButton chung và token getCrispUiLayout; gỡ khung/title mobile cũ, desktop chỉ giữ crop sidebar artwork (không vẽ lại nội dung). Grid/catalog/ownership/chọn tối đa3/chi tiết giữ nguyên; mobile header slot52px chừa biển mới. User mở riêng artwork khung/biển thay quy tắc21/10 giữ khung mobile cũ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User báo nút chuyển máy replay mobile bay lên trên. Bỏ tọa độ midpoint đo JS, wrapper absolute insetx0/top164px+board-height/bottom0 flex items-center justify-center để tâm nút nằm giữa vùng dưới Board và đáy arena theo CSS. Chỉ nút nhận pointer, không che bàn; giữ thông báo. Build/typecheck PASS; dist xác nhận vùng căn giữa mới; chưa browser QA.

- 2026-10-25: Theo user, nút chuyển máy Xem lại MOBILE căn giữa dọc khoảng đáyBoard→mép dưới viewport, ngang giữa; useBoardLayout đo rect ghi --mobile-replay-mode-center, wrapper translateY-50%. Thông báo Chức năng đang được cải tiến giữ khung modal như Giải đấu và đổi nút Đã hiểu sang homeUtilityButton đúng Home; thông báo khác giữ cũ. Build/typecheck PASS; dist xác nhận vị trí mới; chưa browser QA.

- 2026-10-25: Theo user, nút chuyển đánh thử/máy trong Xem lại MOBILE luôn hiển thị dưới Board/căn giữa (mép Board+10px), dùng ReplayModeButton artwork cũ. Bỏ nút lặp trong controls/user phải mobile. Bấm nút hoặc Space mobile chỉ mở dialog Chức năng đang được cải tiến, không đổi trial; desktop giữ toggle thật và vị trí cũ. Build/typecheck PASS; dist xác nhận nút/thông báo; chưa browser QA.

- 2026-10-25: Theo user, clock Xem lại MOBILE chuyển về cụm giữa cùng vị trí/Elo anchor như trận thật, tái dùng MobileMatchSummary clockOnly (ẩn biển/Bàn cờ) kèm đồng hồ cát. Bỏ clock dưới từnguser mobile; desktop giữ recordedClock. Thu margin nút chuyển đánh thử dưới controls50→4px riêng compact/replay để nhường hàng clock, giữ controls giữa2user. Thời gian vẫn snapshot thật, không tick. Build/typecheck PASS; dist xác nhận clockOnly; chưa browser QA.

- 2026-10-25: User đính chính So tài trong Thông tin: thành công giữ toast Đã gửi; offline/lỗi trả lại bảng profileActionFeedback như cũ qua setProfileActionFeedback (không còn no-op lỗi). Giữ optional onSent và requestVersion. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, màn Xem lại ván hiển thị đồng hồ tĩnh của2user dưới Elo qua PlayerCard.recordedClock, đọc remainingTime đúng snapshot playback đang chọn. Tiến/lùi/phát đổi theo snapshot thật, không tick theo thời gian xem; không hiện trong đánh thử hoặc replay1thế, không sửa clock gameplay/DB. Bản lưu cũ chỉ hiển thị dữ liệu đã có, không suy đoán thời gian thiếu. Tests7/7 PASS gồm số dư clock snapshot thật và cập nhật khi tua; build/typecheck PASS, dist xác nhận clock; chưa browser QA.

- 2026-10-25: Theo user, So tài trong ProfileDialog dùng chung useInviteSentNotice với Mời Xếp hạng/Bạn bè: ACK thành công hiện1Đã gửi giữa viewport/bay-fade1300ms, gửi lặp thay singleton, không modal. useProfileChallenge thêm optional onSent giữ requestVersion tránh phản hồi cũ; lỗi So tài không feedback như Mời. Chức năng khác hồ sơ giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: User xác nhận khung cần chuyển là Phát/Lùi/Tiến TRONG màn Xem lại MOBILE. GamePage render ReplayControls riêng giữa2user ở top8px/width220/scale.72 như positionTrial; chỉ1instance, desktop giữ trong user phải. Ẩn MobileMatchSummary nhánh replay tránh chữ Bàn cờ đè controls. Đã hoàn tác lượt sửa nhầm danh sách Đã chơi (Xem lại cột phải/icon2phe giữa). Giữ callback/luật/replay state. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User đính chính yêu cầu khung giữa2user nằm TRONG màn Xem lại, không phải danh sách Đã chơi. Hoàn tác đúng lượt vừa sửa HistoryDialog: Xem lại về cột phải hàng2, icon2phe về cột giữa; không chạm thay đổi khác. Chờ xác định khung điều khiển cần chuyển trong màn replay.

- 2026-10-25: Theo user, Mời chơi Bạn bè MOBILE dùng đúng toast Đã gửi giữa màn hình/bay48px-fade1300ms/singleton như Xếp hạng. Tách useInviteSentNotice/component dùng chung; hook onSent sauACK thành công, bỏ modal feedback riêng challenge, các feedback kết bạn khác giữ nguyên. Desktop Bạn bè đang khóa giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user mở riêng Lịch sử/Đã chơi MOBILE: Xem lại chuyển từ cột phải sang cột giữa hàng2 nằm giữa2user; icon Đỏ/Đen chuyển sang cột phải hàng2 để không chồng. Ngày giờ/cỡ/2user/desktop/Đã lưu/chức năng replay giữ nguyên. Khóa lại phạm vi sau task. Build/typecheck PASS; dist xác nhận vị trí mới; chưa browser QA.

- 2026-10-25: Theo user, Mời lặp chỉ1toast Đã gửi giữa màn hình: singleton key thay mới giữ không xếp chồng; bỏ CSS translate trùng WAAPI khiến lệch tâm. challengeController không emit thông báo Lời mời đã được thay thế khi cùng người gửi mời lại cùng target; lời mời cũ vẫn bị thay. Người gửi khác giữ feedback cũ. Build/typecheck PASS; dist cập nhật; backend cần nạp code mới/chưa restart, chưa socket/browser QA.

- 2026-10-25: User đổi phản hồi Mời Xếp hạng: chỉ khi sendChallenge ACK thành công mới onSent hiện Đã gửi giữa viewport (fixed50%,font18); giữ0.35 thời lượng rồi bay lên48px/fade, tổng1300ms, cleanup animation/onfinish xóa; reduced-motion chỉfade. Lỗi vẫn không toast theo lượt trước, người nhận vẫn popup. useFriendChallenge thêm optional onSent không đổi màn khác. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, bấm Mời ở Xếp hạng chỉ gửi, không hiển thị phản hồi gửi thành công/lỗi tại người gửi: callback useFriendChallenge no-op riêng RankingDialog. Giữ gửi socket/thực thi server/pending chống lặp và popup lời mời phía người nhận; các màn khác giữ thông báo cũ. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, nút Mời Xếp hạng gửi So tài thật đúng người. Sửa challengeController map target.id tài khoản số sang socket đang kết nối qua RoomPersistence.identities, giữ socketID truyền thống; thiếu kết nối báo offline. ChallengeService xác thực avatar/frame theo AVATAR_COUNT/FRAME_COUNT catalog thay giới hạn14/3 gây lỗi người dùng viền mới; bỏ câu Thông tin người chơi không hợp lệ thay phản hồi thử lại, không bỏ validation. Build/typecheck PASS; dist cập nhật; chưa test socket/browser và chưa restart backend, cần nạp backend mới để fix có hiệu lực.

- 2026-10-25: Theo user, riêng nút Mời Xếp hạng thu rộng173→120/cao62đơnvị theo scale, justify-self:end/maxwidth100% chừa cách khung Elo nâu. Giữ chữ30/callback và nút Vào xem cũ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, nút Xếp hạng online chỉ chữ Mời, bỏ mũi tên riêng invite/tăng chữ24→30theo scale; Vào xem giữ. Header Người chơi bỏ padding lệch, căn giữa cột giống Hạng; mobile tăng cao38→46/chữ21→24theo headerScale, cùng columnStyle hàng. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Xếp hạng online rảnh hiện Mời chơi (không hiện tự mời ownID); đang đấu giữ Vào xem, offline không nút. Dùng RankingViewButton chung artwork/cỡ với label invite và disabled pending; useFriendChallenge nhận optional targetId gửi sendChallenge chuẩn, phản hồi notice hiện có, không gọiAPI trong component. Áp dụng laptop/mobile và2tab; server vẫn chặn bận/offline/ràng buộc lời mời. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-25: Theo user, tên user Đã lưu laptop/mobile dùng khung vàng/xanh của Đã chơi: historyPlayerFrame chung gradient/viền/bóng theo winner snapshot (vàng thắng, xanh còn lại như cũ), nối dưới avatar bằng negative margin/z10, giữ font/cỡ/avatar. Đã chơi chỉ tách token màu không đổi hình học. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, chỉ tên ván Đã lưu đổi font-body như ghi chú, cả mobile/laptop; input tên mobile đồng font, bỏ NumberText ở title để số/chữ cùng font. Giữ cỡ/đậm/nền/tên người chơi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User đính chính chỉnh font TÊN NGƯỜI CHƠI trong Đã lưu, không phải tên ván. Hoàn tác font tên ván/ô nhập về trước; tên user laptop/mobile dùng font-heading/extrabold/stroke0.2 như name Xếp hạng, chữ/số cùng font. Giữ cỡ/vị trí. Build/typecheck PASS; dist cập nhật; chưa browser QA. Thay ghi chú Arial tên ván ở lượt ngay trước.

- 2026-10-25: Theo user, tên ván tab Đã lưu dùng font-arial cùng tên user cả laptop/mobile; ô nhập tên mobile cũng Arial, bỏ NumberText riêng để chữ/số cùng font. Giữ cỡ/đậm/nền và bố cục. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, thông báo So tài/không online/xóa bạn MOBILE phóng khung tới min360px/viewport-48, chữ18px line-relaxed/padding20px/nút46px thay token bị co theo dialog. Áp dụng phản hồi Friends/Profile, MessagesFriendRemovalConfirmation dùng chung xóa bạn/xóa khỏi nhóm và ChallengeNotifications; checkbox14/icon18. Desktop Bạn bè khóa giữ nguyên, không đổi hành vi challenge/xóa. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Đã lưu cả laptop/mobile thay vs bằng HistoryMatchPieces (cùng asset Quân đỏ+Quân đen/quân úp và kích cỡ47/90token như Đã chơi), thứ tự đỏ trước giữ độc lập owner. Không đổi avatar/tên/replay/dữ liệu. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Xếp hạng tối đa50người cả2variant/laptop/mobile. RANKING_PLAYER_LIMIT=50 dùng chung Repository SQL LIMIT và hook slice trước render (có hiệu lực ngay cả backend cũ trả100); giữ Elo DESC/id tie-break/filter/thứ hạng. Build/typecheck PASS; dist cập nhật; chưa browser/SQL QA, chưa restart backend.

- 2026-10-25: Theo user, cụm avatar/tên/trạng thái Xếp hạng MOBILE dịch trái5px bằng wrapper translate, cả2tab. Không đổi kích thước/cột Elo/rank hay desktop. Build/typecheck PASS; dist xác nhận class; chưa browser QA.

- 2026-10-25: Theo user, thu nhẹ cả cụm Elo Xếp hạng MOBILE eloScale1.5→1.42 (~5.3%): số/khung/icon/cột đồng tỷ lệ, cả2tab; desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, nhập tên/ghi chú MOBILE nâng/cuộn instant bỏ100ms/smooth, xử lý focusin, giữ scale. Cả laptop/mobile Đã lưu mở trực tiếp SavedMatchesList, bỏ tab con Ván đấu/Thế cờ; không xóa dữ liệu thế cờ. Build/typecheck PASS; dist cập nhật; chưa keyboard/browser QA.

- 2026-10-25: Theo user, nhập tên/ghi chú Đã lưu MOBILE giữ scale/kích thước HistoryDialog khi visualViewport resize do bàn phím. data-history-input focus auto/cuộn giữa; useHistoryLayout bỏ đo scale khi đang focus, sau100ms cuộn ô nhập và translate dialog lên theo phần ô nhập bị viewport che (chừa16px), dọn timer/translate khi resize không nhập/unmount. Desktop giữ nguyên. Build/typecheck PASS; dist có data-history-input; chưa QA bàn phím điện thoại thật.

- 2026-10-25: Theo user, bút sửa ghi chú Đã lưu/Ván đấu MOBILE mở expanded=true và textarea autoFocus/con trỏ cuối. useLayoutEffect theo editing/draft đo scrollHeight+2 tự cao đầy đủ nội dung khi mở/gõ, không cuộn nội bộ/cắt3dòng lúc sửa. Build/typecheck PASS; dist cập nhật; chưa browser QA bàn phím thật.

- 2026-10-25: Theo user, ghi chú Đã lưu/Ván đấu MOBILE mặc định line-clamp-3 (3dòng/ellipsis), bấm nội dung toggle mở đầy đủ/thu lại; button có aria-expanded và data-history-edit tránh holdXóa. Bút sửa/giá trị lưu và desktop giữ nguyên. Build/typecheck PASS; dist xác nhận toggle; chưa browser QA.

- 2026-10-25: User xác nhận ẩn toàn bộ danh hiệu chưa nhận, đủ điều kiện backend cấp mới xuất hiện. Đồng bộ cả Sở hữu và preview ngoài catalog: chỉ lấy databaseHonors.ownedIds, bỏ fallback local coi danh hiệu giải đấu/chưa cấp là sở hữu. Không xóa danh hiệu DB đã cấp/không sửa điều kiện; hook tiếp tục tải lại mỗi5giây khi mở hồ sơ. Build/typecheck PASS; dist cập nhật; chưa browser/MySQL QA.

- 2026-10-25: Đã lưu/Ván đấu mobile tăng metadata12–14px/icon16, gap user-vs3px. Icon bàn cờ dùng HistoryBoardIcon chung cả laptop/mobile (gồm Thế cờ). Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, catalog Danh hiệu trong Thông tin user chỉ hiển thị danh hiệu đã sở hữu ở TẤT CẢ tab/nhóm, ẩn mọi danh hiệu chưa có. HonorsFrame lọc ownedIds cả streak/games/attendance như all/arena/awarded. useDatabaseHonors xóa dữ liệu cũ khi đổi user để không hiện nhầm sở hữu tài khoản trước lúc chờ API. Quyền sở hữu/cấp theo criteria ở backend giữ hiện hành: giải đấu cấp riêng; phong tặng threshold; chuỗi/tổng ván khi chốt ván; attendance theo ngày hoạt động. Build/typecheck PASS; dist cập nhật; chưa browser/MySQL QA.

- 2026-10-25: Theo user, Đã lưu/Ván đấu MOBILE tên ván15→18px/font-black+stroke0.2px; metadata chuyển hàng fullwidth không wrap, icon tờ báo/Nước, chấm màu/bên tới lượt, bàn cờ/variant. Thùng rác luôn hiện góc phải trên7px/vùng24px/icon16px (thay ẩn chờ giữ riêng mục này). Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Đã lưu/Ván đấu MOBILE tên ván dùng font-heading/font-black/nền vàng highlight+NumberText như Thế cờ laptop; input cùng font-position-title-input. Tên user Arial thường/nền kem-xanh như laptop, giữ avatar/cỡ và cho đầy đủ xuống dòng. Bỏ phe/thắng-thua dưới từng user, thêm vs giữa hai người; metadata Nước N/chấm màu Đỏ hoặc Đen tới lượt/variant lấy snapshot cuối thật, không fake Nước1. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, riêng Đã lưu/Ván đấu MOBILE dùng socialPlayerRowClass như Đã chơi, cao theo nội dung/đệm và gap7px; mini Board rộng36%list thay30%, avatar96token/tên43token đầy đủ xuống dòng, phe/kết quả/variant/số nước dưới tên. Nút chỉ chữ Xem rộng48px ở phải giữa dọc. Thêm bút sửa TÊN VÁN (không đổi tên tài khoản) và ghi chú cuối dòng. Metadata savedTitle/savedNote theo bookmark riêng owner; store update→PATCH saved-matches/:id→PersistenceService validate100/5000→Repository owner-filter. Migration007 thêm saved_matches.title/note, giữ001–006; chưa apply DB/restart backend. Build/typecheck PASS; dist index-igZBPYB6.js có form mới; chưa browser/MySQL QA. Desktop UI giữ nguyên, mobile giữ500ms hiện Xóa; pen/input không kích hoạt hold.

- 2026-10-25: User mở Lịch sử cả laptop/mobile: Đã lưu/Ván đấu dùng SavedMatchesList mới theo bố cục Thế cờ laptop (mini Board thật thế cuối, hai người, kết quả, số nước/variant, Xem lại/Xóa), hai hàng trong vùng nhìn và cuộn. Thế cờ giữ chỉnh tên/ghi chú/Mở thế/Xóa; bỏ cột ngày/giờ ở cả2loại đã lưu, không xóa timestamp dữ liệu. Mở Ván đấu/Thế cờ trên mobile như desktop; chung store/API/replay/ownership, mobile giữ500ms hiện Xóa, desktop nút Xóa sẵn. Đã chơi laptop giữ UI/hành vi cũ; chỉ Đã lưu đổi UI được user yêu cầu. Build/typecheck PASS; dist index-CgUN8pBV.js có bố cục mới; chưa browser QA/kiểm tra thao tác trên thiết bị thật.

- 2026-10-25: Theo user, tăng cả cụm Elo Xếp hạng MOBILE: eloScale1.35→1.5 (~11% thêm) đồng bộ số điểm/khung ảnh/icon và cột chứa; icon giữ32đơnvị theo scale mới. Hai tab cùng áp dụng, desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, chỉ icon Elo Xếp hạng MOBILE tăng25→32đơn vị theo eloScale (~28%), áp dụng cả tab Cờ Tướng/Cờ Úp. Giữ số điểm/khung/bố cục và desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User chỉnh lại Shop MOBILE thành3cột×3hàng, thay yêu cầu4×3 ngay trước. Giữ chiều cao3hàng/cuộn và desktop. Build/typecheck PASS; dist index-BWTLGI6c.js xác nhận3×3; chưa browser QA.

- 2026-10-25: Theo user, lưới Shop chỉ MOBILE đổi4cột×3hàng trong vùng nhìn; chiều cao hàng (100%-8px)/3 trừ2gap4px, hàng phát sinh cùng chiều cao và cuộn. Desktop4×2 giữ nguyên; không đổi sản phẩm/giao dịch. Build/typecheck PASS; dist index-Cmnxy_o1.js xác nhận class mới; chưa browser QA.

- 2026-10-25: Theo user, khối nội dung Thông tin user chứa bảng tên/Elo nâng stacking z10→z30, trên header/họa tiết z20; giữ vị trí/kích thước avatar, bảng và chữ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Sửa khả năng phục hồi ảnh Danh hiệu khi tải lỗi tạm thời: CrispUiImage có retryOnError opt-in, thử lại tối đa2lần sau500/1000ms bằng query mới để tránh cache response lỗi; ẩn biểu tượng ảnh hỏng trong lúc lỗi, dọn timer khi unmount/đổi src. Bật cho artwork danh hiệu trong ProfileDialog gồm preview/catalog/chi tiết và sprite, không đổi geometry/dữ liệu sở hữu. Chưa tái hiện lỗi mạng trên điện thoại nên chưa xác nhận nguyên nhân mạng gốc. Build/typecheck PASS; dist index-j1ysUa14.js có ui-image-retry; chưa browser QA.

- 2026-10-25: Theo user, preview Chọn viền căn giữa mỗi ô cả2chiều: wrapper absolute inset0/grid place-items-center/size container, anchor vuông min77.1cqw/cqh để vừa cả rộng/cao thay h-full/mobilew-full gây tràn lệch. Chỉ preview catalog; avatar thật/overlay chung giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, lưới Chọn viền avatar đổi4cột×4hàng cả mobile/laptop; compact tính chiều cao4hàng trừ3gap ui36. Giữ chỉ viền sở hữu/không thêm ô khóa. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Chọn viền trong Tùy chỉnh avatar mobile+desktop chỉ render4viền mặc định và các viền đã sở hữu; gỡ toàn bộ ô placeholder khóa thay vì render18ô. Giữ index gốc/trang bị/geometry và không cấp quyền viền chưa mua. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, mỗi tài khoản chỉ1Like/ván và chỉ nút Like mặc định ghi nhận, mọi icon picker (kể cả👍) chỉ hiệu ứng. PlayerLikeButton chỉ gọi saveMatchLike khi !fromPicker; hook chặn lượt đã ghi/pending cùng account+match, retry lỗi được, vánID mới nhận lượt mới. DB khóa unique(match_id,actor_id) giữ nguyên, duplicate no-op giữ target đầu tiên và không cho hủy để tái sử dụng. Không sửa migration cũ/không xóa Like lịch sử. Tests10/10 PASS (like lặp/đổi đích/click đồng thời/ván mới/retry và broadcast); build/typecheck PASS, dist cập nhật. Chưa browser/MySQL thật QA.

- 2026-10-25: Theo user, giãn khoảng icon trong picker gap2px→8px, khung desktop180→220px/mobile167→196px để đủ chỗ6icon; giữ neo trái Like/top10px. Thời gian bay local/online800→1200ms. Build/typecheck PASS; dist xác nhận thời gian/khoảng icon mới; chưa browser QA.

- 2026-10-25: Theo user, bảng chọn Like/biểu cảm đặt bên trái nút Like (đo rect trái trừ42px), mép trên viewport10px; portal body tránh bị cắt/stacking parent, z950, resize đo lại. Thời gian bay icon local và người nhận online cùng800ms. Giữ chặn thao tác browser. Build/typecheck PASS; chưa browser QA.

- 2026-10-25: Theo user, bỏ giới hạn200ms riêng và thông báo Thả biểu cảm quá nhanh ở socket room:reaction; giữ xác thực/rate limit chung và nhịp animation local. Cụm Like/picker chặn select/copy/cut/context menu/drag, touch-callout và tap highlight xanh; ảnh Like draggable=false, mousedown preventDefault để không bôi đen khi bấm nhiều lần. Chỉ cụm biểu cảm, giữ ô chat nhập/copy bình thường. Build/typecheck PASS; tests phòng/reaction PASS; dist xác nhận chặn thao tác browser; chưa browser QA.

- 2026-10-25: Theo user, Back từ trận Vị trí tùy chỉnh chạy session.leave cleanup rồi screen computer thay home; màn xếp thế usePositionEditor.back vốn về computer giữ nguyên. Cả mobile/desktop về Chơi Với Máy, không ảnh hưởng Back online/replay thường. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Like/biểu cảm online phát realtime tới mọi người trong phòng gồm khán giả qua room:reaction. Service xác thực thành viên/đúng targetSide+ID và allowlist6emoji, controller dùng rate limit chung+200ms riêng, broadcast trừ người gửi (đã có animation local). PlayerCard nhận trên avatar kể cả không hiện nút Like; kiểm tra room/pair/target/match hiện tại, hủy animation khi đổi phiên/unmount, không replay/snapshot/lưuDB hiệu ứng. Lượt thích persistence cũ giữ nguyên. Tests28/28 PASS, gồm socket3client xác nhận đối thủ/khán giả cùng nhận và người gửi không nhận lặp; build/typecheck PASS, dist xác nhận room:reaction. Chưa browser QA nhiều thiết bị.

- 2026-10-25: User đính chính xác nhận reset CHỈ áp dụng nút reset vàng trong bảng ReplayControls đánh thử (ảnh). Hoàn tác xác nhận ở Cài lại màn xếp thế; ReplayControls mở alertdialog portal body giữa viewport tránh scale parent, Hủy giữ trạng thái/Đồng ý practice.reset. Keyboard reset giữ hiện hành. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User chốt lại Sẵn sàng online chỉ hiện khi đủ2người ngồi trên bàn; một mình không hiện, khán giả không tính. GamePage khôi phục gate players.length===2, vẫn khóa bấm trong entrance; local/máy giữ nguyên. Quy tắc này thay lượt cho hiện khi1người trước đó. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, bấm Cài lại trong Vị trí tùy chỉnh (mobile/desktop) mở xác nhận giữa màn hình Bạn có muốn cài lại bàn cờ không? Hủy/Escape đóng và giữ thế, Đồng ý mới editor.reset. Không đổi Xóa quân/luật. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, người chơi xin thua online hợp lệ gửi tin hệ thống chat “Tên đã đầu hàng.” qua RoomService.append, dùng tên server và kiểu system giống thông báo vào phòng; hiển thị chung laptop/mobile/khán giả, không đổi kết quả/thưởng. Tests phòng/server26/26 PASS; build/typecheck PASS, dist cập nhật (tin sinh ở backend); chưa browser QA.

- 2026-10-25: Theo user, vào lại phòng là phiên lưu mới: useMatchSaving ghi nhớ ID archive lúc mount và không nhận lại ván cũ đó; vẫn giữ bản ván kết thúc mới trong phiên hiện tại. RoomService.join khi người mới vào ghế bàn finished đưa game về ready/thế đầu, reset ready/offer/undo/history/repetition và cửa sổ rotation; giữ archive/thưởng/lịch sử đã chốt. Sẵn sàng hiện khi người ngồi vừa vào kể cả chỉ1người, khóa bấm tới entrance hoàn tất. Chat mobile disabled trong entrance nhưng opacity100 để không tối. Tests liên quan39/39 PASS; build/typecheck PASS, dist xác nhận cập nhật; chưa browser QA.

- 2026-10-25: Theo user, thông báo Vị trí tùy chỉnh/trận đấu căn giữa viewport: editor/tools notice, statusText, positionSaveNotice và saving.error dùng fixed50%/translate-50%/z500 thay top/bottom riêng. Dialog/toast khác đã giữa giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Chat MOBILE mở có backdrop trong portal z499 dưới panel z500; bấm ngoài chỉ blur/đóng Chat ở click, giữ backdrop suốt pointerdown→click để không truyền chọn/đi quân hoặc bấm UI phía dưới. Bỏ listener document pointerdown đóng sớm ở useMobileChatOverlay, hook chỉ đo viewport (giữ tham số tùy chọn tương thích nơi gọi cũ). Desktop giữ nguyên. Build/typecheck PASS; dist xác nhận backdrop; chưa browser QA.

- 2026-10-25: Theo user, nhãn đi tiên MOBILE cố định rộng66px theo Đen tiên để nút đổi bên không dịch khi đổi chữ. Bảng điều khiển positionTrial mobile scale.64→.72 (~158px). GamePage truyền machineImmediately=false cho useReplayTrial: vào từ Vị trí tùy chỉnh không tự máy đi, người dùng bật Máy đi nếu muốn; startImmediately vẫn true. Đấu ngay Chơi với máy giữ useComputer cũ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, icon View MOBILE giữ vị trí giữa dưới Board5px, tách biến vị trí riêng trên main khỏi khung portal. Khung View thêm lớp bấm ngoài trong portal z899, panel z900 để đóng khi chạm ngoài, chỉ mobile. Giữ panel bottom58px/desktop. Build/typecheck PASS; dist xác nhận vị trí icon/lớp đóng ngoài; chưa browser QA.

- 2026-10-25: Theo user, cụm đi tiên trong Vị trí tùy chỉnh MOBILE tăng cách âm lượng5px (right51→56). Bảng điều khiển đánh thử sau Đấu ngay từ vị trí tùy chỉnh (positionTrial) đưa lên giữa2user trên mobile, chỉ mount1bảng, desktop giữ trong PlayerCard; scale.64 rộng141px vừa khoảng giữa. Ẩn MobileMatchSummary ở positionTrial tránh chồng bảng. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, hạ khung View MOBILE thêm3px, bottom61→58px. Build/typecheck PASS; dist xác nhận bottom58px; chưa browser QA.

- 2026-10-25: Theo user, chữ số trong tên mobileHeader và danh sách View thu thêm0.9→0.85em, chỉ số/không đổi chữ. Panel View MOBILE hạ3px (bottom64→61px). Build/typecheck PASS; dist xác nhận cả2thay đổi; chưa browser QA.

- 2026-10-25: Theo user, View MOBILE mở panel qua portal document.body z900 để vượt stacking context avatar/Board/tiện ích, giữ vị trí/kích thước và nhánh desktop. Thu chữ số tên mobileHeader về0.9em qua NumberText compact; tên trong panel View mobile thu thêm về0.9em để cân với chữ. Không đổi avatar/logic. Build/typecheck PASS; dist xác nhận lớp panel mới; chưa browser QA.

- 2026-10-25: Theo user, tạm ẩn riêng nút Cầu hòa cả laptop/mobile bằng SHOW_DRAW_BUTTON=false trong MatchActions; giữ nguyên JSX/icon/callback để bật lại bằng true. Xin thua/Đi lại và xử lý lời mời hòa hiện có giữ nguyên. Build/typecheck PASS; dist cập nhật, nút drawButton được loại khỏi bundle; chưa browser QA.

- 2026-10-25: Theo user, Vị trí tùy chỉnh MOBILE nút đỏ chỉ hiện kiếm/khung (ẩn nhãn visual, aria-label Đấu ngay), đặt phải20%width/cao40; hai nút vàng căn giữa hàng/nhãn14px. Đổi thứ tự icon đổi bên ra trái công tắc trong cụm phải, tăng32→36px. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Vị trí tùy chỉnh MOBILE tắt overflow cuộn, bỏ Đấu ngay overlay giữa Board. Hàng dưới Board gồm Xóa quân/Cài lại và ComputerActionButton start đỏ/icon kiếm bên phải44%width/cao48px dùng chung màn máy. Giảm margin khay dưới để gọn; desktop giữ nút cũ. Build/typecheck PASS; dist cập nhật; chưa browser QA màn thấp.

- 2026-10-25: Theo user, Xóa quân/Cài lại MOBILE force size36px/icon20 như Back (tránh class size12 ghi đè). Khay rộng86% thay full-16px, padding4/gap2; hàng full khay/quân74% thay64% để lớn nhẹ và gần nhau. Đấu ngay giữa Board44→52%width. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, dịch riêng cụm Cầu hòa/Đi lại/Xin thua MOBILE sang trái2px so với tâm (left calc50%-2px). Giữ cụm tiện ích/Back và desktop. Build/typecheck PASS; dist xác nhận offset trái2px; chưa browser QA.

- 2026-10-25: Theo user, Xóa quân/Cài lại MOBILE36px/icon20 và nâng3px; quân khay70→64% trong hàng rộng86%/gap4px để nhỏ và gần hơn. Switch đi tiên48×24/knob20/chữ16, nhãn ở trái switch; icon đổi bên bỏ fixed trái, nằm cạnh switch trong cụm phải. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Xóa quân/Cài lại MOBILE đổi sang đúng gameUtilityButton + PositionIcon như khay laptop; nhãn font-heading18 nằm riêng dưới nút, gap4/giữa2nút24px. Giữ vị trí dưới Board/callback. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, quân trong khay MOBILE thu82→70%ô; icon Xóa quân/Cài lại16px (override SVG sẵn32px) căn giữa wrapper grid/shrink0, nút items-center/justify-center/chữ14 leading-none. Không đổi quân trên Board/desktop/logic. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User đính chính cụm cần dịch phải2px là Lưu/Chat/Menu, không phải Cầu hòa/Đi lại/Xin thua. Trả MatchActions về center50%; header tiện ích mobile right10→8px, Chat portal đồng bộ offset46→44px. Giữ Back left8px theo yêu cầu trước. Build/typecheck PASS; dist xác nhận offset cụm tiện ích và center cũ; chưa browser QA.

- 2026-10-25: Theo user, icon Cầu hòa MOBILE tối giản hình bắt tay chỉ còn silhouette/tay áo và một nét nếp gấp, bỏ nét ngón rườm rà. Cả cụm3nút dịch phải2px (left calc50%+2px); Back dịch trái2px (left10→8px). Giữ desktop/chức năng. Build/typecheck PASS; dist xác nhận offset mới; chưa browser QA.

- 2026-10-25: Theo user, khay quân MOBILE thêm khung nâu/viền vàng, quân82%ô/gap8px; nút Xóa quân/Cài lại dưới Board có icon trash/restore. Switch đi tiên chuyển cạnh âm thanh phải51px, icon đổi bên tròn cạnh Back trái51px. Đấu ngay overlay giữa bàn44%width, nút dưới ẩn compact. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser/drag QA.

- 2026-10-25: Theo user, icon bắt tay Cầu hòa MOBILE gọn26px, đơn giản silhouette/ngón và giữ vàng kem. Like căn giữa khoảng trống thật từ mép avatar tới mép mã phòng bằng đo rect/ResizeObserver, căn giữa dọc avatar; không đổi geometry avatar. Ô Elo mobileHeader cố định60px (=đệm16+icon15+gap3+số4ch26), số giữ4ch theo font13px nên điểm ít/nhiều không co khung. Giữ desktop/logic. Build/typecheck PASS; dist xác nhận đo Like và ô Elo4ch; chưa browser QA.

- 2026-10-25: Theo user, Vị trí tùy chỉnh MOBILE bỏ khung/chữ chọn phe cũ, cạnh Back có switch nhãn động Đỏ tiên (phải)/Đen tiên (trái) và icon đổi bên riêng. MobilePositionPalette trên Board2hàng×7 (Đỏ trên/Đen dưới), dùng limits/ChessPiece/callback cũ. Khay desktop ẩn compact, giữ keyboard handler cũ; Xóa quân/Cài lại ra dưới Board, Đấu ngay giữ tiếp dưới. Board fullwidth/desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser/drag QA.

- 2026-10-25: Theo user, icon Cầu hòa/Xin thua MOBILE chuyển sang vàng kem currentColor kế thừa mobileRoundAction (#ffe69b) như Đi lại; tô đầy hình bắt tay và lá cờ. Bắt tay có nét phân tách ngón màu nền nâu để rõ hình, cờ giữ cán nét và phần vải tô đầy. Kiểu nút/bố cục/desktop/callback giữ nguyên. Build/typecheck PASS; dist xác nhận icon tô đầy/màu kế thừa; chưa browser QA.

- 2026-10-25: User đính chính icon Cầu hòa/Xin thua MOBILE phải nét viền trắng/rỗng như Đi lại, không phải emoji tô kín. Thay filter emoji bằng SVG fill none/stroke currentColor trắng, viewBox32 và nét2.4/bo tròn/cỡ30px như icon Đi lại; giữ kiểu nút, desktop và callback. Build/typecheck PASS; dist xác nhận icon outline trắng; chưa browser QA.

- 2026-10-25: Theo user, Cầu hòa/Xin thua MOBILE dùng lại ký hiệu cũ 🤝/⚑ thay SVG mới; đổi icon trắng qua filter brightness(0) invert(1), giữ nút tròn và bố cục/desktop. Build/typecheck PASS; dist xác nhận icon cũ/filter trắng; chưa browser QA.

- 2026-10-25: Theo user, Cầu hòa/Xin thua MOBILE đổi thành nút tròn36px cùng nền radial/viền/bóng với Đi lại, dùng mobileRoundAction chung cả3. Icon SVG bắt tay/lá cờ26px ở giữa; nhãn mobile sr-only và aria-label/title giữ ý nghĩa. Desktop và callback/disabled giữ nguyên. Build/typecheck PASS; dist xác nhận kiểu nút tròn/icon; chưa browser QA.

- 2026-10-25: Theo user, GamePage MOBILE ẩn viền inset ngoài và hai hoa văn góc; Like chuyển lên cạnh trong avatar, hai bên mã phòng (top28px, trái center-103px/phải center+76px). Cụm Cầu hòa/Đi lại/Xin thua căn giữa dưới View8px, top đo theo Board.bottom+39px thay neo đáy; View vẫn cách Board5px/cao26px. Giữ avatar/desktop/callback/luật. Build/typecheck PASS; dist index-_nCNFBPR.js xác nhận vị trí Like/thao tác; chưa browser QA.

- 2026-10-25: Theo user, Vị trí tùy chỉnh MOBILE Board full viewport width qua useBoardLayout(true), cao1296/1134 tương ứng, bỏ lề/viền ngoài và padding ngang. Arena flow scroll, top=max90px,(100dvh-boardHeight)/2 để bàn giữa màn hình khi đủ chỗ; khay/nút đẩy xuống sau Board20px, sửa riêng sau. Header giữ vị trí; desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, Board trong GamePage MOBILE phủ toàn chiều ngang arena, không còn thu theo chiều cao còn lại; chiều cao giữ tỷ lệ1296/1134. useBoardLayout(fullMobileWidth) bật riêng GamePage; Vị trí tùy chỉnh và desktop giữ chế độ fit hiện hành. Thay quy tắc fit mobile phía trên. Build/typecheck PASS; dist index-CGGl5x7k.js xác nhận nhánh full width; chưa browser QA.

- 2026-10-25: Theo user, Vị trí tùy chỉnh MOBILE đặt Chọn bên180px ở giữa phía trên bàn, Back fixed top/left7px và nav âm thanh fixed top/right7px. Header absolute không đẩy bàn; arena fullheight/căn giữa/cột mobile có paddingtop76px, Board justify-self-center. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: Theo user, bàn cờ MOBILE tăng biển mã phòng120×58→144×70/chữ14→17; thêm SVG đồng hồ cát giữa hai clock. View căn giữa dưới mép Board5px bằng vị trí đo thật trong useBoardLayout; Back chuyển về góc trái đáy chỗ View cũ, bỏ Back trùng trong menu. Cụm thao tác giữa màn hình theo thứ tự Cầu hòa / Đi lại / Xin thua qua order compact. Giữ callback/logic và nhánh desktop; chưa browser QA.

- 2026-10-25: Theo user, chỉ Vị trí tùy chỉnh MOBILE tạm ẩn nút Tạo bàn cờ từ ảnh (compact:hidden để mở lại), ẩn fullscreen; back/âm thanh36px/icon20 như tab khác. Cụm chọn bên rộng210px thay full, chữ14/padding gọn, header min36px. Desktop/luật xếp quân/ảnh nền giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-25: User xác nhận HOVANG chỉ Local, bản GitHub giữ Pikafish. Sửa lỗi CI TS2307: app/useComputer/useComputerSetup đã tracked nhưng 3 module HOVANG bị board-game/.gitignore loại. Gỡ tham chiếu HOVANG khỏi 11 file runtime tracked (server wiring, hooks/store, nhãn/nút chọn engine), không sửa thuật toán/luật; giữ adapter/source/binary/test HOVANG ignored. Lưu nguyên trạng tích hợp Local và restore-hovang.patch dưới board-game/.checkpoints/hovang-local-before-ci-20261025/; github-pikafish-only.patch chỉ chứa thay đổi task, không kèm UI đang sửa. Typecheck/build workspace và snapshot HEAD + đúng hunks task (không có HOVANG ignored) PASS; test máy/Pikafish/backend snapshot16 PASS/5 SKIP. Full test workspace410 PASS/3 FAIL/21 SKIP (ui.test.tsx2, lobby-presence.test.tsx1); snapshot Git sạch400 PASS/4 FAIL/26 SKIP (thêm chat timeout5s), chi tiết docs/CI-HOVANG-IMPORTS.md; không sửa/skip các test lỗi. Không commit/push/merge/deploy.

- 2026-10-24: Theo user, Chọn Bàn/Chơi Với Máy phủ toàn viewport cả mobile/laptop: wrapper w-full h-dvh thay lề desktop120px/mobile6px và bỏ border5px/bóng/viền inset/hoa văn góc ngoài. Giữ khung nội dung/entrance600ms/dialog/chức năng. Quy tắc này thay hình học khung Home cũ riêng2màn. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: User đính chính Luyện cờ MOBILE chỉ tăng cao: trả rộng về100%+16px/margin-8 như trước lượt to thêm, aspect2132/418 thay2132/348 (~20% cao hơn), ảnh object-fill; giữ nâng10px. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, Luyện cờ MOBILE rộng tăng từ100%+16px lên100%+32px, margin ngang-16px; giữ nâng10px và tỷ lệ ảnh. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Xem thử theo user, Luyện cờ MOBILE rộng thêm16px (margin ngang-8px), giữ aspect artwork và nâng10px bằng relative top-10; desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, setup máy MOBILE căn giữa chữ Chọn bên, ba radio căn giữa gap24px thay trải đều. Gom riêng level→Chọn bên→2nút và translateY20px; Luyện cờ nằm ngoài wrapper giữ mt-auto/vị trí cũ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, máy MOBILE nâng riêng icon bánh răng3px; radio Chọn bên dùng màu/viền/checked như desktop (Đỏ red, còn lại vàng), tiêu đề căn trái,3lựa chọn justify-between/gap20. Khoảng giữa các cụm setup20px (gap5), Luyện cờ giữ mt-auto/artwork/vị trí cuối. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, hai nút máy MOBILE thu icon18→16cqw, tăng chữ8.5→9cqw; giữ khung/căn giữa/desktop. Build bị chặn TS7053 ở MobileMatchSummary đang thay đổi: khai báo rightSide:Side để index clock đúng kiểu, không đổi hành vi. Build/typecheck sau sửa PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, hai nút máy MOBILE thu icon20→18cqw, tăng riêng chữ8→8.5cqw. Wrapper h-full/items-center, nhãn flex/self-stretch/items-center/leading-none để chữ+icon giữa dọc. Giữ khung và desktop fontsize/icon. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, tăng tiếp chữ/icon2nút máy MOBILE: chữ7.5→8cqw, icon18→20cqw; padding5→4cqw/gap3→2cqw. Laptop/khung giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, tăng tiếp chữ/icon2nút máy MOBILE: chữ6.7→7.5cqw, icon15→18cqw; padding7→5cqw/gap4→3cqw. Laptop/khung giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, tăng chữ/icon2nút máy MOBILE: chữ5.5→6.7cqw, icon11→15cqw; padding12→7cqw/gap5→4cqw để vừa nội dung. Laptop/cỡ khung giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, áp dụng ComputerActionButton chung cho2nút Vị trí tùy chỉnh/Đấu ngay MOBILE; thay ảnh chữ gộp bằng SVG/icon vector/chữ HTML co theo container như laptop. Giữ hàng cao48px/2cột/gap12, callback/disabled/busy. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, dựng lại2nút Vị trí tùy chỉnh/Đấu ngay LAPTOP bằng ComputerActionButton: khung SVG gradient/viền/góc, icon vector bánh răng/kiếm, nhãn HTML Arial bold. Nội dung cqw theo container nút để đổi kích thước đồng tỷ lệ, giữ ô/vị trí82px và callback/disabled/busy. Mobile giữ ảnh cũ vì user chỉ yêu cầu laptop. Không thay luật/engine. Build/typecheck PASS; dist cập nhật; chưa browser QA trực quan.

- 2026-10-24: Theo user, chuyển lựa chọn HOVANG v0.4 ra Home dưới Cờ Tướng cả mobile/laptop; openHovang chọn engine hovang rồi mở ComputerPage, Chơi Với Máy chọn Pikafish. Gỡ selector engine khỏi setup hai bản. Mobile ẩn fullscreen, nameplate210→170px, thêm banner Luyện cờ cuối setup cùng artwork/hành vi chưa hỗ trợ desktop. Giữ engine/backend/level/luật. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, ô nhập và nút Tìm Bạn bè MOBILE cao thêm17% đồng bộ cả Danh sách/Thêm bạn; tăng slot form tương ứng tránh chồng dòng, công thức chiều cao dòng chung trừ thêm phần tăng. Desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, nút Tìm Bạn bè MOBILE tăng chữ23→27 và icon31→36 theo token compact; giữ khung/cỡ nút và desktop/Chọn Bàn. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, thay riêng nền nút Tìm bằng khung trống4cdefa67 tại Chọn Bàn/Bạn bè mobile+desktop; shared SearchButton giữ chữ/icon HTML và submit/disabled. Chữ vàng sáng để đọc trên nền nâu; nguồn references/uploads, runtime buttons/search-frame.png crop(467,158,1240,392). Build/typecheck PASS; dist cập nhật; chưa browser QA. Mở riêng artwork nút Tìm desktop theo user.

- 2026-10-24: User yêu cầu hoàn tác lần dùng ảnh nút Tìm cdd2fd06. Khôi phục nút HTML vàng trước đó trong Chọn Bàn/Bạn bè mobile+desktop, gỡ SearchButton và ảnh runtime crop. Giữ ảnh nguồn trong references/uploads; chức năng tìm kiếm giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, dùng ảnh cdd2fd06 cho nút Tìm Chọn Bàn và Bạn bè cả mobile/desktop. Shared SearchButton, giữ submit/disabled và kích thước theo ngữ cảnh; nguồn references/uploads/cdd2fd06..., runtime buttons/search-button.png trim alpha>16. Build/typecheck PASS; dist cập nhật; chưa browser QA. User mở riêng artwork nút Tìm laptop task này.

- 2026-10-24: Theo user, picker tỉnh dùng DialogCloseButton chung theo scale social/compact thay X SVG riêng. Tạo bàn MOBILE nới khung tới min92vw/90dvh và aspect1369/1200, parent padding8px, chữ/field/nút tăng tương ứng khoảng15–20%; desktop giữ khung cũ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Nâng lựa chọn HOVANG lên v0.4 giữ nguyên API/UCCI, kiểm tra luật/rank conversion, giới hạn2 process + Hash16MB + watchdog/cancel; Pikafish và Máy cơ bản không đổi. G++ WinLibs16.2 build static v0.4, native regression PASS gồm perft(4)=3290240,14.417 thế ngẫu nhiên và stalemate; UCCI `ucciok`/`readyok`/`bestmove` PASS. HTTP E2E dùng engine thật chạy240 nửa nước hợp lệ, xác nhận Đỏ/Đen lần lượt đi và kết thúc bài test bằng resignation; game chưa tự adjudicate lặp. HOVANG adapter/service tests+Pikafish regression 11/11 PASS; typecheck/build PASS và dist có nhãn v0.4. Chưa browser QA; executable local ở `engines/hovang-v0.4/hovang-engine.exe`, source/binary v0.3 giữ để rollback.
- 2026-10-24 (cập nhật): G++ WinLibs16.2 cài ở đường dẫn có dấu cách: link trực tiếp bị tách `default-manifest.o`; executable dynamic còn thiếu DLL. `build-windows.ps1` dùng specs tạm bỏ manifest entry, output tương đối, static GCC runtime; file specs được dọn. Đã build `hovang-engine.exe` và native C++ tests PASS.
- HOVANG E2E thật qua HTTP `/api/hovang`: readiness PASS, Đỏ đi nước đầu và Đen lượt kế, 240 nửa nước hợp lệ qua engine + `applyMove`, sau đó kết thúc test bằng resignation. Ván không tự kết thúc do game chưa adjudicate lặp tự động; không sửa quy tắc game. Regression lưu tại `tests/hovang-native.test.ts` (chỉ chạy khi RUN_HOVANG_NATIVE_TESTS=1). Pikafish giữ nguyên.

- 2026-10-24: Theo user, form tìm phòng noValidate/bỏ required+pattern native để không hiện tooltip trình duyệt. Mã rỗng/sai6số hoặc tìm API thất bại hiện toast Không tìm thấy phòng bằng khung Shop, tựẩn2s/cleanup timer; không đẩy lỗi findRoom ra banner Chọn Bàn. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, thanh tìm phòng header Chọn Bàn dùng kiểu Bạn bè: input nền nâu gradient/viền inset vàng/icon kính lúp, chữ nhập Arial16/placeholder body14; nút Tìm vàng tách rời/font body bold. Giữ căn giữa/chức năng mã6số. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, header Chọn Bàn thêm form tìm số phòng6chữ số căn giữa ngang back. useLobby.joinByCode fetch API rooms mới toàn hệ thống, khớp code chính xác không phụ thuộc tỉnh/filter/cap30; phòng mở join, khóa mở RoomPasswordDialog hiện có rồi join theo password. Giữ validate tên/năng lượng/server role, không thấy phòng báo lỗi. Build/typecheck PASS; dist cập nhật; chưa browser/socket QA.

- 2026-10-24: Theo user, picker tỉnh MOBILE tăng tiếp hình rộng min(36cqw,100cqh)/cao full ô, globe27cqw/78cqh; tên10.5cqw/34cqh, số9cqw/28cqh. Giữ object-contain/tỷ lệ ảnh và2×6; desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, picker tỉnh MOBILE tăng hình min(24cqw,65cqh)→min(30cqw,82cqh), tên8/26→9.5/30, số6.5/21→8/25 theo cqw/cqh; globe tăng21cqw/58cqh. Giảm padding/gap để nội dung vừa ô, giữ2×6/desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Xem thử theo user, picker tỉnh MOBILE2cột×6hàng (cao ô=(100%-40px)/6); mỗi ô size container, icon clamp theo cqw/cqh, chữ tên min(8cqw,26cqh), số min(6.5cqw,21cqh), padding/gap tỷ lệ. Desktop giữ2×4. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, picker tỉnh/thành MOBILE đổi1→2cột, giữ4hàng trong vùng nhìn qua auto-rows(100%-24px)/4 và cuộn dọc. Desktop vốn2×4 giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, hộp nhắc thiết lập địa chỉ dùng khung thông báo thiếu tiền Shop: shopMobileDialogFrameClass, viền vàng2px/bo16/nền gradient/bóng inset, desktop cùng kiểu tương ứng. Giữ nội dung và Hủy/Đồng ý mở Hồ sơ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, bấm chọn tỉnh khi chưa lưu địa chỉ mở hộp alertdialog Bạn chưa chọn địa chỉ, hãy thiết lập địa chỉ với Hủy/Đồng ý thay status banner. Hủy/Escape đóng, Đồng ý đóng và mở ProfileDialog editable hiện có để thiết lập. Áp dụng cả mobile/desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, gỡ hoàn toàn demoRooms/prop demo trong RoomTableGrid. Bộ đếm bàn chọn tỉnh/Tất cả chỉ tính phòng có ghế hoặc viewer, khớp danh sách; không xóa phòng RAM/không restart backend. useLobby.error không đưa join.error lên Chọn Bàn khi passwordRoom đang mở; passwordError giữ trong dialog. Test lọc tỉnh chọn explicit allProvinces=false theo mặc định mới. locked-room-ui+quickRoom4/4 PASS; build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, Chọn Bàn mặc định Tất cả khi countryCode khác VN (gồm nước ngoài/chưa lưu). Địa chỉ Việt Nam vẫn vào tỉnh hồ sơ. Tất cả dùng chung danh sách bàn các tỉnh Việt Nam hiện có, giới hạn30 như trước; không đổi địa chỉ hồ sơ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, Chơi nhanh trong Chọn Bàn giữ lọc đúng minutes từ API mới, hết bàn báo Không có bàn phù hợp với thời gian đã chọn thay mở Tạo bàn. Tắt prop20bàn demo, trở lại dữ liệu thật. Đối chiếu CreateRoomForm→useLobby→API→RoomService giữ minutes/turnSeconds/game.remainingTime/turnTimeLimitMs; không cần vá clock. quickRoom+room-time-settings11/11 PASS (30/60/90/120s và reset); build/typecheck PASS; dist cập nhật; chưa browser/socket QA thực.

- 2026-10-24: User hủy yêu cầu avatar/ô chọn do nói nhầm. Chọn Bàn MOBILE thu mũi tên thời gian28→24px, tăng tên tỉnh/Tạo bàn16→18px; giữ số/icon khác/desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, Chơi nhanh MOBILE chỉ tăng chữ Chơi nhanh/phút18→20px; số thời lượng giữ18px, icon32→28px. Giữ khung/desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, nút Chơi nhanh Chọn Bàn MOBILE tăng icon24→32px và chữ16→18px (gồm thời lượng), giữ khung/desktop và hành vi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, bỏ icon SVG ổ khóa nổi trên mỗi bàn khóa trong RoomTableGrid. Giữ artwork lockedBoard và logic mật khẩu/khóa;20bàn demo vẫn bật theo lượt xem thử trước. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: XEM THỬ tạm theo user: RoomSelection bật prop demo RoomTableGrid với20bàn minh họa (1/2ghế, nhiều thời gian/bàn khóa), disabled và chặn onJoin, không tạo phòng server. Tên/thời gian MOBILE14→13px. Dữ liệu/API thật giữ nguyên; gỡ prop demo khi user kết thúc xem thử. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, tên dưới bàn MOBILE bỏ ellipsis/truncate, cho wrap/overflow-wrap:anywhere và caption flex-wrap để hiện đủ. Artwork cao72→76%, hình người38→46% chiều bàn. Giữ desktop/lưới3×4. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, caption bàn MOBILE dùng font-body Arial cho tên lẫn số thời gian cùng14px/baseline. Vùng artwork cao60→72% ô, hình người28→38% chiều bàn; giữ lưới3×4 và desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: User chốt mặc định Chọn Bàn: có địa chỉ lấy tỉnh hồ sơ, chưa có countryCode chọn Tất cả; đối chiếu hook hiện tại đã đúng nên giữ. Thu chữ tên/thời gian dưới mỗi bàn MOBILE20→14px qua compact:text-sm; desktop giữ20px. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: User đính chính bộ đếm người chọn tỉnh/Tất cả: chỉ cộng room.players (người ngồi ghế), không cộng viewerCount/hàng chờ/presence sảnh. Đồng bộ nút hiện tại và từng thẻ tỉnh/Tất cả, toàn bộ bàn không chỉ30mẫu. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, bộ đếm người Tất cả (nút hiện tại và thẻ trong picker) cộng players+viewerCount của toàn bộ bàn mọi tỉnh, không lấy presence sảnh hoặc30bàn mẫu. Giữ cap30. Lưới MOBILE3cột×4hàng trong viewport, hàng(100%-24px)/4 và cuộn; artwork người cạnh bàn mobile28% để vừa3cột, desktop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, nâng cụm tên tỉnh/thành và hàng số bàn/người trong nút chọn tỉnh Chọn Bàn lên3px qua wrapper relative top-3px; giữ ảnh/khung. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, Chọn Bàn khởi tạo allProvinces=true nếu chưa lưu địa chỉ (countryCode null), mặc định xem Tất cả tối đa30 bàn ngẫu nhiên. Có địa chỉ giữ mặc định tỉnh hồ sơ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, bộ chọn tỉnh Chọn Bàn thêm Tất cả/icon globe trên cả mobile/desktop. allProvinces riêng không sửa tỉnh hồ sơ/presence/tỉnh tạo bàn. Lấy bàn thật có người từ mọi tỉnh, áp dụng lọc hiện tại rồi Fisher-Yates tối đa30, memo theo snapshot/filter; bộ đếm tổng mọi tỉnh. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, bỏ avatar/tên ở header Chọn Bàn và Chơi Với Máy trên cả mobile/laptop. Nút quay lại đưa vào flex header items-center thay absolute, tiện ích ml-auto để giữa dọc; không thay avatar máy trong nội dung. Giữ tên phiên và luồng bắt đầu/join. Build/typecheck PASS; dist cập nhật; chưa browser QA; phạm vi mở riêng header theo user.

- 2026-10-24: Theo user, Chọn Bàn MOBILE ẩn tiện ích Toàn màn hình/Bạn bè/Thành tích; âm thanh và quay lại36px/icon20. Ba control tỉnh/Tạo bàn/Chơi nhanh cao64→52px, chữ18→16/icon tương ứng nhỏ; ba lọc dưới cao44→32/rộng110/chữ12. Giữ desktop/avatar/tên/luồng phòng. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, sắp xếp23PNG rời ở gốc src/assets: ảnh runtime Tạo nhóm→messages/create-group-frame.png;22ảnh nguồn→references/uploads theo tính năng (5ảnh chưa rõ mục đích giữ unclassified). Cập nhật import/đường dẫn nguồn liên quan; manifest tại src/assets/ASSET-ORGANIZATION.md. Không chỉnh pixel/UI. Build/typecheck PASS; dist cập nhật; chưa browser QA. Script crop-reference-pieces.ps1 còn tham chiếu c7ad3098 đã thiếu từ trước, ngoài23file lần này.

- 2026-10-24: Theo user, mọi dòng Bạn bè MOBILE dùng chiều cao chuẩn Thêm bạn: panel làm size container, FriendRow flex-basis tính từ cùng100cqh trừ hàng tiêu đề54/search48/hai gap14 rồi chia6/trừ row-gap. Không phụ thuộc chiều cao list4nhận/2gửi nữa. Nút Hủy tăng chữ27→30/icon37→42logical riêng sent. Laptop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, nút Hủy trong Đã gửi lời mời MOBILE dùng cùng kích thước/chữ27/icon37logical và giới hạn cao như Từ chối; dùng cùng vùng invitationActions và wrapper, một nút căn phải. Giữ API hủy/laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, nền nâu Lời mời nhận MOBILE bỏ override cao để dùng cùng công thức các dòng khác (100%-ui4-15px); cụm nút giới hạn cao bên trong nền với đệm8px. Nút Kết bạn/Đã gửi rộng250→280, chữ30→33logical; giữ cao118. Laptop/dòng khác giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Tích hợp HOVANG Engine v0.3 thành lựa chọn thử nghiệm riêng trong Chơi Với Máy; giữ Pikafish/Máy cơ bản. Backend UCCI chạy tối đa2 process, Hash16MB, watchdog và kill khi hủy; xác thực lịch sử/nước đi bằng engine chung. HOVANG rank gốc tính từ phía Đen, khác game UCI nên adapter lật rank hai chiều cho FEN/history/move. Build native bằng `engines/hovang-v0.3/build-windows.ps1` hoặc g++ Linux; môi trường task không có C++ compiler nên chưa tạo binary/chạy native tests hoặc ván thực, chỉ adapter tests.

- 2026-10-24: Theo user, tăng tiếp nút Kết bạn/Đã gửi MOBILE220×106→250×118logical, chữ28→30 theo dialog scale. Giữ dòng/khung/laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, nút Kết bạn tại Thêm bạn MOBILE tăng173×90→220×106logical, chữ28logical theo dialog scale; trạng thái Đã gửi cùng kích thước tránh nhảy. Giữ dòng/khung/laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Sửa Gợi ý bạn trống do socialStore.search query rỗng luôn xóa users. Thêm GET /social/suggestions qua session auth→PersistenceService→SocialRepository: random tối đa20 active users, loại bản thân/accepted friends/block hai chiều. Query rỗng lấy gợi ý, query có chữ giữ search tên/ID; version bỏ phản hồi cũ. Mobile và desktop dùng chung dữ liệu, không đổi geometry laptop. Build/typecheck PASS; persistence-rules2/2 PASS; dist cập nhật. Chưa xác minh SQL trên DB/browser thật; backend cần nạp code mới, không restart/deploy trong task.

- 2026-10-24: Theo user, chỉ hai nút nhận lời mời Bạn bè MOBILE thu icon khoảng20% (Add52.5→42, Remove46.5→37logical), tăng chữ25→27logical. Override token ngay cụm nút để không ảnh hưởng nút khác; giữ khung/offset trái3px. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, dịch cả cụm hai nút Chấp nhận/Từ chối trong lời mời nhận Bạn bè MOBILE sang trái3px hiển thị qua translateX(-3px); giữ nền nâu/kích thước và laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Theo user, hai nút nhận lời mời Bạn bè MOBILE rộng hơn bằng giảm padding trái vùng nút40→22logical (mỗi nút thêm9logical); giảm cao tối đa126→108logical/hàng trừ20px, chữ30→25logical. Giữ nền nâu và giới hạn trong khung. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-24: Sửa riêng lời mời nhận Bạn bè MOBILE theo user: bỏ kéo nền nâu âm sang vùng trạng thái, mép trái nền inset7px; hai nút chia đều chiều rộng khả dụng và giới hạn chiều cao trong nền (hàng trừ14px, tối đa126logical), chữ29→30. Vùng nút padding trái40logical+7px tránh hoa văn, giữ khoảng đệm mọi cạnh. Build/typecheck PASS; dist cập nhật; chưa browser QA; laptop/dòng khác giữ nguyên.

- 2026-10-24: Theo user, chỉ dòng Lời mời đã nhận Bạn bè MOBILE nới vùng thao tác440→500logical sang trái, nền nâu nới trái thêm12logical và cao thêm15px. Hai nút Chấp nhận/Từ chối190×106→220×118, chữ26→29 theo scale. Dùng prop invitationActions riêng, các dòng khác/laptop không đổi. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, hai nút Chấp nhận/Từ chối trong Lời mời đã nhận Bạn bè MOBILE tăng rộng145→190, cao90→106, chữ21.6→26 logical theo dialog scale; padding/gap cùng scale, không shrink nút. Giữ dòng/avatar/desktop và hành vi. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, hạ cụm sao toàn project2px theo khung tham chiếu: clusterOffsetYPx -14→-12; vị trí hiện tại cao hơn6px so trước chuỗi chỉnh. Token chung áp dụng mobile/laptop/người chơi/máy. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, nâng cụm sao toàn project thêm4px theo khung tham chiếu: clusterOffsetYPx -10→-14, tổng nâng8px so trước các lượt chỉnh. Token chung áp dụng mobile/laptop/người chơi/máy. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, nâng sao toàn project thêm2px theo khung tham chiếu: clusterOffsetYPx -8→-10, tổng nâng4px so trước hai lượt chỉnh. Đồng bộ mobile/laptop/người chơi/máy qua token chung. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, nâng cụm sao toàn project/mobile/laptop qua RANK_STAR_LAYOUT.clusterOffsetYPx -6→-8 (lên2px ở tỷ lệ tham chiếu, co cùng khung). RankTitleBadge và RankingRankBadge cùng dùng getRankTitleStarsStyle; gồm sao máy artwork riêng. Giữ kích thước sao/avatar/danh hiệu/luật Elo. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Sửa badge Lời mời MOBILE bị cắt bởi hàng tab overflow: nâng badge thêm3px, chừa padding-top bằng spacing+8px và bù margin-top để giữ mốc tab. Badge có khoảng3px phía trên cho hiển thị trọn; giữ cuộn ngang/Home/laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, nâng cả badge Home MOBILE và badge tab Lời mời thêm2px hiển thị so vị trí trước; giữ cỡ/số/neo ngang. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, badge Bạn bè ngoài Home MOBILE nâng từ top-1.5cqw lên-2.2cqw. Badge tab Lời mời tăng35→38, số19→20 theo token compact; giữ vị trí trái và dữ liệu. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, Home MOBILE thêm badge đỏ góc trên phải nút Bạn bè, đếm tổng lời mời pending đã nhận (requestedBy khác account.id) từ socialStore thật; không tính bạn accepted/lời mời đã gửi. Không có lời mời thì ẩn, trên99 hiện99+; aria-label đọc tổng đầy đủ. Store cập nhật từ refresh Bạn bè hiện có. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, ba tab lớn Bạn bè MOBILE giảm gap8→5px hiển thị; badge đỏ Lời mời tăng28→35 và số15→19 theo token nội dung compact, giữ góc trái. Laptop giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, ba tab lớn Bạn bè MOBILE cách nhau đúng8px hiển thị (gap-[8px], không theo dialog scale); badge tròn đỏ Lời mời chuyển sang góc trái tab. Giữ kích thước tab/cuộn ngang và laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, thu độ loang glow tab con Bạn bè MOBILE: hai drop-shadow blur2/7px giảm1/4px, giữ brightness1.1/saturate1.3 và không viền chọn. Tab lớn/laptop giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, tab con Bạn bè MOBILE khi chọn chỉ dùng selectedImageTabGlow của tab lớn; bỏ pseudo-element nền/viền nới và viền inset vàng riêng. Nền cùng màu tab thường, border transparent khi chọn. Laptop giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, tab con lọc Bạn bè MOBILE dùng chính selectedImageTabGlow chung với ba tab lớn khi được chọn; giữ ô nền đã nới và kích thước chữ/icon. Laptop giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: User làm rõ tab con Bạn bè MOBILE cần TO ô nền chọn, không tăng sáng. Nền selected tách pseudo-element nới ngang4/dọc6 đơn vị spacing theo dialog scale; chữ/icon và slot giữ nguyên. Bỏ glow/active brightness125 của lượt hiểu sai. Laptop giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, ba tab lớn Bạn bè MOBILE dùng cùng cỡ tab Xếp hạng: rộng264×1.6 và cao70×1.6 theo dialog scale; không co tab, hàng lướt ngang khi thiếu chỗ. Laptop giữ riêng. Build/typecheck PASS; dist cập nhật; chưa QA thao tác vuốt trên thiết bị. Khóa lại phạm vi sau task.

- 2026-10-23: Bạn bè mobile: nút Tìm dùng font-body Arial đậm không nghiêng như ba nút lọc Tất cả/Đang online/Bạn Facebook. Giữ cỡ, màu, khung, icon, bố cục và toàn bộ laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA.
- 2026-10-23: User đính chính hiệu ứng tab con cần tăng trên MOBILE. Hoàn tác đúng glow/active brightness vừa thêm trên DesktopFriendsDialog; áp dụng selected glow viền2px/blur12spread3 và active brightness125 sang FriendsDialog mobile. Giữ toàn bộ cỡ tab/các chỉnh laptop trước đó. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Bạn bè laptop theo user tăng vùng hiệu ứng tab con: selectedFilter thêm viền sáng2px và glow12px/spread3px, lúc nhấn brightness125; giữ kích thước/bố cục tab, không tác động mobile hoặc nút khác. Build/typecheck PASS; dist index-1HCP8CoD.js/index-DY7iBcQh.css xác nhận; chưa browser QA.

- 2026-10-23: Theo tiếp nối task font laptop, tăng tab con Bạn bè LAPTOP: filter cao54→66/chữ22→25, icon tăng14%; tiêu đề mục con cao50→60/chữ27→30, hàng Gợi ý66 và top căn giữa3px theo scale. Giữ font-body bold, avatar/dòng/nút khác và mobile. Build/typecheck PASS; dist index-C7-AItwJ.js/index-Bl4cpC0W.css xác nhận; chưa browser QA. Khóa lại desktop sau task.

- 2026-10-23: User mở riêng FONT tab con Bạn bè laptop: đổi filterButton và friendSectionTitle ở DesktopFriendsDialog sang font-body Arial bold không nghiêng giống mobile. Giữ cỡ22/27, icon và toàn bộ geometry desktop. Build/typecheck PASS; dist index-Db04Kalm.js/index-Q13H9-aA.css xác nhận; chưa browser QA. Khóa lại laptop sau thay font.

- 2026-10-23: Bạn bè mobile tăng chữ tab lọc22→25 và tiêu đề con27→30 theo token1.5; icon lọc tăng khoảng14% (online31, Facebook38/inner30, nhóm48×36). Giữ font-body bold, khung/dòng và desktop; các token25/36/38 được scale nội dung. Build/typecheck PASS; dist index-8IRzMIoM.js/index-Q13H9-aA.css xác nhận; chưa browser QA.

- 2026-10-23: Bạn bè mobile: chữ Mời chơi32→34logical; icon35→40 và crop background/offset tăng cùng40/35 tránh cắt lệch. Tab lọc/tiêu đề con3mục dùng font-body Arial bold không nghiêng. Giữ kích thước nút/tab/dòng và DesktopFriendsDialog. Build/typecheck PASS; dist index-C0TyD6TS.js/index-Dkbcqxgk.css cập nhật; chưa browser QA.

- 2026-10-23: Bạn bè mobile theo user tăng avatar118→128logical; AvatarRankBadge/danh hiệu/sao kế thừa cùng tỷ lệ và neo. Không đổi dòng/khung/cột. Mời chơi270×100→285×106, chữ30→32 theo dialog scale; nền nâu translateX -12logical giữ width/height hiện tại (đã giảm15px). DesktopFriendsDialog không đổi. Build/typecheck PASS, dist cập nhật; chưa browser QA; khóa lại phạm vi/avatar.

- 2026-10-23: Bạn bè MOBILE theo user placeholder dùng font-body Arial không nghiêng (cả Danh sách/Thêm bạn), giữ cỡ hiện tại. Nền nâu bao2nút giảm cao thêm15px thật, giữ giữa dọc và kích thước nút/dòng; DesktopFriendsDialog không đổi. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, đấu bạn bè không cộng/trừ Elo. MatchRepository.complete dùng policy đã chốt gold_reward_eligible cùng kiểm tra accepted lúc kết thúc để delta0 cho cả2 người (gồm Mời chơi/So tài, gỡ bạn giữa ván không bật lại). Giữ stats/năng lượng/lịch sử và chính sách vàng; đối thủ thường Elo như cũ. Không migration vì tái dùng policy persisted. Existing match-gold-policy5/5 PASS; typecheck/build PASS; dist cập nhật (backend-only bundle không đổi). Môi trường từ chối ghi tests nên chưa thêm regression Elo; chưa QA DB thật, backend cần nạp code mới.

- 2026-10-23: User xác nhận laptop vẫn phóng quá, yêu cầu hoàn tác đầy đủ bản cũ. DesktopFriendsDialog khôi phục nguyên component từ HEAD (chỉ đổi tên export), gồm dòng90/avatar76/danh hiệu cột riêng/nút173×60/chat63×54/search56. FriendsDialog chỉ chọn component theo compact, giữ nhánh mobile hiện tại. Không dùng bản desktop đã bị chỉnh size trong các lượt mobile. Build/typecheck PASS; dist index-MeDpNjVR.js/index-5juzdCui.css cập nhật; đối chiếu nội dung desktop với HEAD khớp hoàn toàn sau đổi tên. Chưa browser QA.

- 2026-10-23: User yêu cầu trả lại nền nâu bao Mời chơi/Chat ở Bạn bè mobile. FriendRowShade hiển thị cả compact bên cột thao tác, lề âm12/không nhận pointer; giữ kiểu dòng/khung/khoảng cách mới. Desktop giữ nguyên nền nâu hiện có. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-23: User đính chính3tab chính Bạn bè mobile chỉ căn mốc với Xếp hạng, KHÔNG thu kích thước. Khôi phục hàng tab fullwidth/gap1, ảnh h-auto/w-full/scaleY1.12 theo cỡ trước đồng bộ; bỏ hàng84%/gap10 và chiều cao ép theo tab Xếp hạng. Giữ neo dọc từ SocialDialogFrame; laptop giữ nguyên nhánh riêng. Build/typecheck PASS; dist index-6XDeaDwx.js/index-CBth_oD0.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: User khóa riêng Bạn bè LAPTOP, hoàn tác lượt đồng bộ vừa rồi trên desktop. FriendsDialogFrame chỉ dùng SocialDialogFrame khi compact; desktop khôi phục khung/nền/title/tab/dòng150 liền nhau/khung list/nền nâu SVG như ngay trước task đồng bộ. Mobile giữ dòng/khung/tab dùng chung Xếp hạng. Các chỉnh tiếp mặc định chỉ Bạn bè mobile trừ khi user mở laptop rõ. Tests ranking-view+mobile-dialog-layout3/3 PASS, typecheck/build PASS; dist index-DILmSzb6.js/index-DYj2_tBu.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user đồng bộ Bạn bè với Xếp hạng: SocialDialogFrame dùng chung khung ngoài/khung trong/nền phong cảnh/hoa văn/tiêu đề/nút X; title slot theo tỷ lệ artwork Xếp hạng để hàng3tab Bạn bè cùng mốc với2tab Xếp hạng. socialModeTabsClass, socialPlayerRowClass/ListClass và getSocialRowStyle dùng chung: dòng desktop138, mobile6slot, gap8×dialogScale, bo10×rowScale/viền/nền giống nhau; bỏ khung danh sách/nền nâu SVG riêng Bạn bè. Lời mời giữ4nhận+2gửi qua biến số slot; giữ các nút và data/search/keyboard behavior. Avatar/tên/luật không đổi. Existing ranking-view+mobile-dialog-layout3/3 PASS, typecheck/build PASS; dist cập nhật. Chưa browser QA trực quan; khóa lại phạm vi.

- 2026-10-23: Bạn bè mobile theo user đưa3tab chính lên: bỏ padding-top token48 (đang boost1.5) của content wrapper, hết khoảng chừa dư dưới tiêu đề. Panel bên dưới flex1 nhận toàn bộ chiều cao vừa giải phóng, giữ đáy và các điều khiển/dòng hiện hành; desktop không đổi. Build/typecheck PASS; dist index-CObBlHEV.js/index-CQsQa2jN.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: User đính chính tab con Bạn bè mobile bị nhỏ: bỏ reset token về scale laptop ở hàng lọc/tiêu đề mục con, khôi phục boost nội dung1.5× cho cả3 mục; giữ kiểu/logic laptop. Placeholder giảm24→21 token (mobile tối thiểu14px), giữ font kiểu; chữ nhập Arial/min16px giữ nguyên. Build/typecheck PASS; dist index-wzSn32Eq.js/index-CEenSVvk.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: User đính chính font tìm kiếm Bạn bè: placeholder giữ font-heading/Cormorant Garamond nghiêng cũ; chỉ chữ nhập dùng Arial bình thường. Nút Tìm trả font kiểu vàng cũ. Áp dụng cả Danh sách và Thêm bạn, giữ cỡ/keyboard layout. Build/typecheck PASS; dist index-CtxZtSqj.js/index-Cv7yuEY1.css xác nhận placeholder variant. Chưa browser QA.

- 2026-10-23: Đính chính sửa lớp mờ khai cuộc: chỉ tăng z-index trong khung game không vượt stacking context của ancestor fixed. MatchIntro phải portal ra document.body cùng cấp Chat portal, z600 trên Chat350/panel500. Giữ hiệu ứng/ref/cleanup/timing; cả ba nút nhận cùng lớp mờ. Build/typecheck PASS; chưa QA điện thoại thật.

- 2026-10-23: Bạn bè theo user: tab lọc/tiêu đề mục con cả3tab dùng getCrispUiLayout theo tỷ lệ laptop, không nhận boost1.5 của hàng user. Search input/nút dùng Arial không nghiêng; mobile input tối thiểu16px tránh zoom. useFriendsLayout bỏ resize lúc input trong dialog focus để keyboard không co/dịch bảng và hàng bạn bè. Giữ lọc dữ liệu/tương tác cũ. Build/typecheck PASS, dist cập nhật; chưa QA bàn phím trên điện thoại thật. Khóa lại phạm vi.

- 2026-10-23: Khai cuộc phải làm mờ cả ba nút trên GamePage, gồm Chat mobile render portal z350. MatchIntro nâng lớp phủ z40→600 vượt cụm nút/panel z500, dùng một lớp nền mờ chung, giữ thời lượng và luật. Build/typecheck PASS; chưa QA điện thoại thật.

- 2026-10-23: Bạn bè theo user căn tên+trạng thái giữa chiều dọc dòng: bù xuống15% đường kính avatar để cân phần padding dưới30% của cụm avatar/danh hiệu. Tên giảm nhẹ26→25desktop/30→29mobile; trạng thái/avatar/chiều cao dòng giữ nguyên. Token29 mobile cùng scale nội dung. Build/typecheck PASS; dist index-CRazB_Nl.js/index-C4eihsx7.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user tăng avatar Bạn bè92desktop/118mobile (badge AvatarRankBadge tăng cùng tỷ lệ), tên26/30 và trạng thái22/24 theo token nội dung. Ô tìm và nút Tìm cao56→60, nút rộng170→190/chữ21→23, ô nhập chữ23→24 ở cả Danh sách/Thêm bạn. Giữ nguyên chiều cao dòng150desktop, mobile basis92%/số hàng và form48 để không làm đổi vùng danh sách. Build/typecheck PASS; dist index-D-oe8vwT.js/index-B-OY-xb7.css xác nhận. Chưa browser QA; khóa lại avatar/phạm vi.

- 2026-10-23: Sửa popup leave bị hiện lại khi người mới vào: sau lần chuyển kết quả leave sang phiên ghế kế tiếp, tiêu thụ ngay liveParticipant cũ. Lần đổi ghế sau chỉ dọn popup, không tái chuyển kết quả ván đã kết thúc. Người thắng do đối thủ rời vẫn nhận bảng một lần; người mới vào/rời không mở lại. Regression App departure→join→leave + kết quả 15/15 PASS; typecheck/build PASS, chưa QA hai thiết bị.

- 2026-10-23: User yêu cầu danh hiệu chồng avatar đúng Home: thay wrapper FriendRank tự dựng bằng chính AvatarRankBadge chung (đủ height theo avatar và z20 như Home), bỏ bản riêng. Dành phần dưới30% avatar thay padding60/76 cũ để cụm avatar/tên/trạng thái giữa hàng. Giảm chiều cao dòng desktop160→150, mobile basis92%/số hàng (ngắn8%). Build/typecheck PASS; dist index-B_ONnnQp.js/index-BJAP6EgS.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Đối thủ rời phòng giữa ván vẫn phải hiện bảng chiến thắng cho người ở lại. App giữ riêng phe người đã tham gia ngay trước đổi ghế, chỉ chuyển kết quả leave mới đúng người thắng sang phiên GamePage mới; không cấp popup cho người vào sau/khán giả. Đây là ngoại lệ popup leave theo yêu cầu mới; vẫn unmount để dọn hiệu ứng cũ. Typecheck/build PASS; chưa QA hai thiết bị.

- 2026-10-23: User đính chính danh hiệu Bạn bè phải gắn/chồng phần dưới avatar như Home. Dùng nguyên AVATA_TITLE_BADGE_STYLE chung cho top/left/width, bỏ override top100%/left50% gây tách rời. Áp dụng mọi hàng/tab mobile+laptop; giữ avatar/tên/nút. Build/typecheck PASS; dist index-CxSHuUmf.js/index-BZx2Uhjd.css cập nhật. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Bảng cầu hòa dùng chung markup/kích thước/nút/đóng-từ chối với bảng hoàn tác; chỉ đổi câu trên artwork thành “Đối phương muốn cầu hòa”. Asset draw-dialog.png chỉnh bằng imagegen từ takeback-dialog.png, giữ bản gốc. Chỉ người chơi đối diện lời mời được trả lời. Build/typecheck PASS; chưa browser QA.

- 2026-10-23: User mở căn/kích thước cụm user Bạn bè: mép trái cả cụm danh hiệu dưới avatar cách viền10px thật (padding bù35% phần badge170%); avatar84desktop/108mobile, tăng nhẹ tên/trạng thái, danh hiệu kế thừa avatar. Mời chơi230×82 desktop/270×100 mobile; Chat104×88/118×100. Cột thao tác440, token160/440 khai báo theo scale; desktop hàng160/mobile giữ6 hàng. Build/typecheck PASS; dist index-lu1j4fNx.js/index-BNcPd06d.css xác nhận. Chưa browser QA; khóa lại phạm vi/avatar sau task.

- 2026-10-23: Sau khi được đồng ý hoàn tác online, khóa yêu cầu tiếp của chính người đó tới khi họ đi một nước hợp lệ mới. Nước đối thủ không mở khóa, từ chối không áp khóa mới; giữ quota/luật lùi hiện hành và điều kiện đã tự đi. Ván mới xóa khóa. Snapshot dùng chung UI/server cho Cờ Tướng/Cờ Úp, mobile/desktop. Build/typecheck PASS; chưa browser QA.

- 2026-10-23: Online chỉ được yêu cầu hoàn tác khi chính mình đã đi ít nhất một nước còn trong lịch sử ván. Sau nước đầu của đối thủ, người chưa đi bị khóa nút; server kiểm tra lịch sử trước khi trừ lượt yêu cầu. Sau khi hoàn tác về đầu ván, điều kiện được tính lại. Áp dụng chung Cờ Tướng/Cờ Úp, mobile/desktop. Build/typecheck PASS; chưa browser QA.

- 2026-10-23: User chốt danh hiệu Bạn bè nằm DƯỚI AVATAR (không cột riêng). Neo badge170% avatar, dành khoảng dưới tránh đè hàng; avatar giữ cỡ cũ. Giảm nhẹ tên/trạng thái; hàng2 cột identity/thao tác400 theo scale, nền nâu theo cột nút nên sang trái. Tăng Mời chơi mobile245×90/desktop210×74; Chat106×90/94×80. Token400 khai báo cục bộ theo scale; desktop hàng140, mobile giữ6 hàng. Build/typecheck PASS; dist index-BiDeDKsi.js/index-DUUA1eIE.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Sửa lỗi Bạn bè nút Mời chơi/Chat tràn mất: các token73/92/184/200/230/350 mới chưa có trong getCrispUiLayout nên fallback pixel nguyên, làm cột vượt bảng. Khai báo đủ token cục bộ theo dialog scale cho cả desktop/mobile, giữ kích thước tương đối đã yêu cầu. Nền nâu lề âm12 bao đủ ảnh/nút và ngắn hơn lề âm40 cũ; không dùng lề dương cắt dưới danh hiệu. Build/typecheck PASS; dist index-DT7WBaz8.js/index-DHd1fBqX.css xác nhận. Chưa browser QA; khóa lại phạm vi. Khi thêm token phải kiểm tra có trong bảng scale hoặc khai báo cục bộ.

- 2026-10-23: Theo yêu cầu mới, popup kết quả thêm dòng Elo dưới vàng, icon dùng red-general của Cờ Tướng hoặc history-hidden-user của Cờ Úp như Home; số có dấu +/− từ elo_delta server. Hai dòng căn trái, cả cụm giữa chiều dọc ô vật phẩm. Máy giả Elo+0. Thay quy tắc bỏ Elo ngay trước; không thay tính thưởng. Build/typecheck PASS; chưa QA điện thoại thật.

- 2026-10-23: User đính chính ô vật phẩm popup kết quả chỉ hiển thị icon vàng rồi số vàng có dấu +/−, cụm căn trái và giữa chiều dọc vùng giấy; bỏ dòng Elo khỏi popup. Hiển thị +0 khi server chốt không thưởng, không ẩn cả cụm. Dùng dữ liệu server, không thay chính sách vàng/Elo. Build/typecheck PASS; chưa QA điện thoại thật.

- 2026-10-23: User đính chính chỉ thu khung nâu sang phải: tăng lề trái nền20→60 theo token dialog, mép phải giữ tại cột thao tác; min-w-0/overflow-hidden chặn SVG ép chiều rộng. Không tăng khung hoặc đổi cột/nút/danh hiệu trong lượt sửa này. Build/typecheck PASS; dist index-B4E64Hcj.js/index-CQ3169Oy.css xác nhận. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Bạn bè theo user thu nền nâu ngắn thêm bằng lề trái20 thay lề âm40; cột danh hiệu200desktop/230mobile, thao tác350. Ảnh danh hiệu184desktop/210mobile (chiều cao tương ứng); Mời chơi190×66/chữ23 desktop,220×80/chữ26 mobile; Chat84×72 desktop/94×80 mobile, cùng dialog scale. Build/typecheck PASS; dist index-DSD_69gK.js/index-PtHQ86nI.css xác nhận. Chưa browser QA; khóa lại phạm vi sau task.

- 2026-10-23: Sửa bảng kết quả online thiếu số cộng: trước chỉ truyền rewardGold của máy giả. API authenticated /match-rewards/:id đọc vàng ledger online_match_win và elo_delta của chính người tham gia; chỉ hiển thị khi transaction đã finished, retry khi chưa chốt, refresh account sau chốt. GamePage nối vàng/Elo vào popup chung mobile/desktop; không tự tính hoặc cấp thưởng client. Chính sách bạn bè/lời mời/hòa giữ nguyên. 19/19 test liên quan PASS; typecheck/build PASS, dist xác nhận match-rewards. Chưa QA điện thoại thật/DB live; backend cần chạy code mới.

- 2026-10-23: Bạn bè theo user: căn Mời chơi mobile200×72/chữ24 theo dialog scale, crop icon35 cùng scale nguồn; tăng Chat mobile84×72/desktop76×65. Cột thao tác330 cả hai, gap18 theo scale; nền nâu kéo trái thêm20 (lề âm40), giãn danh hiệu/nút. Build/typecheck PASS; dist index-DqsMIZe2.js/index-DgHs07uv.css xác nhận. Chưa browser QA; khóa lại phạm vi sau task.

- 2026-10-23: Theo user, Bạn bè mobile/laptop bỏ chữ tên bậc rời bên cạnh ảnh danh hiệu. Thu cột danh hiệu desktop240→180/mobile320→210, căn ảnh giữa cột và bỏ offset trái; thu nền nâu về lề âm20, vẫn phủ cột thao tác. Giữ avatar/nút/chức năng; khóa lại phạm vi sau task. Build/typecheck PASS, dist index-CwwnwAnM.js/index-BqhHPnav.css xác nhận. Chưa browser QA.

- 2026-10-23: Khi cầu hòa được chấp nhận, kết thúc ván với kết quả hòa nhưng không hiển thị icon/biểu cảm hay bảng thắng-thua; giữ trạng thái hòa cho lịch sử/kết quả ván. Không thay đổi vàng, Elo, thống kê thành tích hoặc xét danh hiệu cho cả hai người. Luồng trình chiếu thắng-thua chỉ chạy khi có winner.


- 2026-10-23: Theo user, Bạn bè mobile: chữ danh hiệu nằm bên phải ảnh (flex-row), dành cột320logical cho danh hiệu/280 cho thao tác. Thu nền nâu từ trái38logical bằng lề âm88→50, vẫn trải sang thao tác. User mở đúng avatar Bạn bè mobile task này: tăng76→96logical, giữ ảnh/khung/click/tâm theo hàng; desktop giữ nguyên. Build/typecheck PASS; dist index-SbS0itO7.js/index-DO6q01GP.css cập nhật. Chưa browser QA; khóa lại avatar/phạm vi sau task.

- 2026-10-23: User đính chính Bạn bè mobile: nền nâu danh hiệu phải trải qua cả cột thao tác như cũ (col2→4, khôi phục lề âm nền). Tên user tăng22→26 token, trạng thái19→21; dùng SocialPlayerName fullName/equalDigitSize như Xếp hạng, cùng font/cỡ chữ-số, cho xuống dòng. Avatar giữ hiện tại; desktop giữ nguyên. Build/typecheck PASS; dist index-CbYlu1On.js/index-Dkdd7-tY.css cập nhật. Chưa browser QA; khóa lại sau task.

- 2026-10-23: Bạn bè mobile theo user: ba tab chính thu về100% bề ngang, tăng chiều cao artwork12% và thêm padding; nội dung/control/search/tên/trạng thái token1.35→1.5×. Nền nâu chỉ còn cột danh hiệu, bỏ tràn sang thao tác và offset trái; danh hiệu rộng166→190/cao66.382→76, xếp tên bậc xuống dưới. Giữ6 người trước cuộn, avatar và desktop. npm.cmd run build/typecheck PASS; dist index-BwdRghSF.js/index-DhCfrtsr.css cập nhật. Chưa browser QA; khóa lại sau task.

- 2026-10-23: Theo user, Bạn bè mobile hạ nội dung bằng padding-top token48 để chừa nền; ba tab chính rộng thêm token54, giảm gap; token nội dung/filter tăng1.2→1.35×. Danh sách/Thêm bạn chia6 hàng trước cuộn; Lời mời chia4 nhận+2 gửi. Avatar/desktop giữ nguyên. Build/typecheck PASS; dist index-DAGFMFN2.js/index-BsKURtdk.css xác nhận friends-visible-rows. Chưa browser QA; khóa lại sau task.

- 2026-10-23: Theo user, khung ảnh tiêu đề Bạn bè/Lịch sử mobile tăng12% từ650 lên728 logical, cùng công thức650×scale×1.12 của Xếp hạng; ảnh tự cao theo tỷ lệ. Giữ neo giữa/top, desktop và nội dung. Build/typecheck PASS; dist index-CT3hn9Qs.js/index-CF_yB55F.css cập nhật. Chưa browser QA; khóa lại phạm vi sau task.

- 2026-10-22: User mở nội dung Bạn bè mobile: phóng20% token chữ/icon/control và chiều cao hàng (90→108 logical), ba tab giãn toàn bề rộng nội dung. Áp dụng Danh sách/Thêm bạn/Lời mời qua contentStyle chung. Các nút inline173/145px được tính scale ở compact để vừa cột; desktop và avatar giữ hiện tại. npm.cmd run build/typecheck PASS; dist index-rfYGowkG.js/index-CF_yB55F.css cập nhật. Chưa browser QA; khóa lại phạm vi sau task.

- 2026-10-22: User yêu cầu nguyên mẫu nút × Xếp hạng cho Bạn bè/Lịch sử mobile: DialogCloseButton cố định borderRadius12px như Xếp hạng, không nhận --radius-xl bị getCrispUiLayout scale ở bảng khác; dùng cùng buttonInteraction. Cỡ72/56 theo scale; desktop trả đúng56/42 theo scale. Build/typecheck PASS; dist index-DXuPjUd7.js/index-CF_yB55F.css cập nhật; chưa browser QA.

- 2026-10-22: Dùng chung DialogCloseButton cho Xếp hạng, Bạn bè và Lịch sử. Cùng markup/style dấu ×; compact là72px vùng bấm và56px glyph theo scale dialog; desktop56/42. Friends/history hooks cung cấp compact theo viewport. npm.cmd run build/typecheck PASS; dist index-BSq7Ldtc.js/index-BC4nPvAz.css cập nhật; chưa browser QA.

- 2026-10-22: Theo user, nút đóng Bạn bè và Lịch sử điện thoại dùng cùng kích thước Xếp hạng: vùng bấm72px, dấu56px qua compact Tailwind và token theo scale dialog; desktop giữ56/42px. npm.cmd run build/typecheck PASS; dist index-BsH_1VBg.js/index-BzMcndy_.css cập nhật. Chưa browser QA.

- 2026-10-22: Theo user, tăng thêm nút × Xếp hạng mobile: vùng bấm64→72px, dấu48→56px. npm.cmd run build/typecheck PASS; dist index-uEKQmEuV.js/index-CyNrYBfH.css cập nhật; desktop giữ nguyên, chưa browser QA.

- 2026-10-22: Theo user, nút × đóng Xếp hạng mobile tăng56→64px, dấu ×42→48px; desktop giữ hiện tại. npm.cmd run build/typecheck PASS; dist index-F6RiQncf.js/index-CyNrYBfH.css cập nhật. Chưa browser QA.

- 2026-10-22: Xếp hạng mobile theo user: trạng thái online/offline/đang chơi bỏ truncate, cho wrap và giảm gap chấm/chữ để hiện đủ. Thanh cuộn mobile bỏ skin trắng/thin/gutter, dùng native overflow-y-auto cùng Lịch sử; màu xám/tự ẩn theo trình duyệt và hệ điều hành. Desktop giữ skin cũ. npm.cmd run build/typecheck PASS; dist index-CSMz296x.js/index-ByTeN08r.css cập nhật. Chưa browser QA trên điện thoại.

- 2026-10-22: Theo user, tăng thêm5px chiều ngang ô Elo Xếp hạng mobile; width calc từ29 lên34px×dialogScale. npm.cmd run build/typecheck PASS; dist/assets/index-BmjJ11DY.js và index-CcFjjYfI.css cập nhật. Desktop giữ nguyên; chưa browser QA.

- 2026-10-22: Theo user, ô nền Elo mobile giữ cao full hàng và tăng rộng thêm5px×dialogScale (29px tổng); build PASS, dist/assets/index-DLGEiX34.js mới nhất. Desktop giữ nguyên. Chưa browser QA.

- 2026-10-22: Theo user, nền nâu bao Elo Xếp hạng mobile cao100% hàng, marginBlock0; rộng thêm24px×dialogScale về phải, giữ mốc trái/offset và vùng tên. Desktop giữ nguyên. npm.cmd run build/typecheck PASS; dist index-D7LsS19u.js/index-CNVVDGzD.css cập nhật; chưa browser QA.

- 2026-10-22: Xếp hạng mobile: Elo cột122×eloScale/offset36×dialogScale; tên giữ24×rowScale, bỏ truncate và cho xuống dòng, h3 tự cao để không khuất. fullName+equalDigitSize dùng cùng font-heading/weight/lining-nums cho toàn tên (chữ và số bằng cỡ), chỉ compact. Desktop/consumer khác giữ mặc định. Build/typecheck PASS; dist index-g6Edeibv.js/index-C444bi-_.css xác nhận fullName; chưa browser QA.

- 2026-10-22: Theo user, tên trong Xếp hạng mobile tăng22→24 logical theo rowScale; chữ số trong tên dùng100% thay90% qua SocialPlayerName.equalDigitSize riêng compact. Laptop và các consumer khác giữ mặc định. npm.cmd run build/typecheck PASS; dist index-70fAFiZP.js xác nhận equalDigitSize. Chưa browser QA.

- 2026-10-22: Sửa Xếp hạng mobile theo ảnh user: cột Elo dùng132×eloScale thay156×rowScale, trả phần rộng chênh lệch cho cột tên nên Elo dịch phải thực trong layout; header và hàng dùng chung gridTemplateColumns. Giữ offset24px, avatar/nút và desktop. npm.cmd run build (typecheck+Vite) PASS; dist index-B6l5561i.js xác nhận grid mới. Chưa browser QA.

- 2026-10-22: Xếp hạng mobile theo user: giữ nội dung hàng1.5×/~6 dòng; hàng nhãn dùng cùng scale1.5× để canh đúng cột; Elo riêng1.35×, dịch phải24px theo scale dialog để chừa vùng tên; hai tab Cờ Tướng/Cờ Úp tăng40% tổng. Laptop giữ nguyên. `npm.cmd run build` PASS; dist/assets/index-9hjkmlPq.js/index-CcYwxfLn.css cập nhật; chưa browser QA.

- 2026-10-22: Điều chỉnh tiếp hàng Lịch sử mobile theo ảnh user: cột ngày/người/quân/người/nút và cột xóa dùng fr theo tỉ lệ để hai cụm người chơi có bề rộng cân đối trên màn hẹp; compact avatar44px, bảng tên34px/chữ17px, kết quả66×32, quân36px, ngày16px, Xem lại128×44. Giữ đủ10 dòng/tab lớn, desktop và chức năng. Đã khóa lại sau task.
- 2026-10-22: Theo yêu cầu mở đúng phạm vi Lịch sử mobile cho task này: khung tiêu đề/social panel giữ chung kích thước thiết kế với Bạn bè; Đã chơi/Đã lưu ván chia đủ10 hàng trong khung. Tăng nội dung hàng (avatar51→64, chữ/thời gian, quân, kết quả, nút Xem lại) theo kích thước hàng mới; nút replay khớp cột. Laptop giữ nguyên. Đã khóa lại Lịch sử sau task.

- 2026-10-22: Hồ sơ người khác trên compact/mobile xếp6 nút thao tác2 cột ×3 hàng để nút rộng/cao tự tăng theo bề rộng; laptop giữ3×2. Giữ thứ tự, asset, icon và hành vi hiện có.

- 2026-10-22: EnergyNotice chỉ compact tăng padding-top28→64px, bảng cao thêm36px để ô năng lượng top12/h36 có hàng riêng phía trên tiêu đề. Giữ neo góc trái/dropdown hồi mở lên, desktop và thao tác cũ; không nhầm với bảng mua EnergyDialog.

- 2026-10-22: Chuyển CD Local sang cotuong_deploy theo user; SSH103.9.78.75:22/key đã thử, CI master và2action adapter PASS do user xác nhận. Không SSH/đổi quyền/restart/push/deploy trong task này. Workflow/script từ chối admin/root, incoming/state/lock/log riêng home deploy0700, APP/WEB giữ nguyên. Publish/rollback rsync bỏ owner/group/perms/dir&link times, dùng mode nguồn+default ACL để runtime/Nginx đọc file tạo dưới umask077. Preflight --check kiểm quyền/sudo/runtime nonroot, chỉ verify-existing/status, không backup mới/build/activate. Sudoers exact user deploy; hướng dẫn ACL --x home750, exclude secrets/runtime, probe kế thừa, visudo và GitHubsecrets tại docs/DEPLOY-USER.md.9fixture deploy+25adapter PASS, Bashsyntax/runblocks PASS, typecheck/build PASS; chưa nghiệm thu ACL/sudo/SSH/GitHub trên Ubuntu.

- 2026-10-22: Bút đổi tên hồ sơ đã triển khai theo ACCOUNT-MODEL: chỉ chính mình, account.linked=true và renamed=false; Guest/chưa tải account/người khác/đã đổi tên không có bút. Form 1–10 ký tự, gọi API /name có quyền backend một lần, tải lại account/history/saved sau lưu để đồng bộ owner tên. Hủy/lỗi không tiêu quyền; đổi thành công ẩn bút. Dùng PlayerInfoCard chung các breakpoint và phần Tùy chỉnh.

- 2026-10-22: User đính chính: bốc thăm NGƯỜI cầm Đỏ, Đỏ luôn đi tiên. RoomService.startMatch chọn người theo phe hiện hành rồi gán lại hai phe trước start/persistence; không đặt currentTurn Đen. Mỗi người50%, bốc lại mỗi ván/Ready/autostart. App key theo cặp ID đã sort để đổi màu cùng hai người không remount; đổi/trống người vẫn dừng hiệu ứng như cũ.

- 2026-10-22: Popup mua Năng lượng mobile: giá dùng font-number, lining/tabular nums, không nghiêng, căn giữa và không xuống dòng. Crop icon nguồn y330 dùng chiều cao riêng: Video/gói100 là268px, vô hạn257px; thay crop chung245 gây mất viền tròn dưới. Riêng vô hạn dừng trước y588 vì từ đó có chữ trắng trong nguồn; giữ nguyên tỷ lệ artwork.

- 2026-10-22: Gỡ cách hiểu sai random currentTurn ở local/Pikafish và tham số firstTurn API. Ván thường giữ Đỏ mở đầu, máy giữ phe chọn sẵn, custom FEN/replay giữ lượt gốc; bốc thăm hai người online thực hiện bằng đổi phe ở server.

- 2026-10-22: Bỏ OpeningCover khi người khác vào/đổi ghế trong cùng phòng: App nhớ phòng đã mở, truyền skipEntrance cho phiên GamePage remount; lần chính mình vào phòng mới vẫn mở như cũ. Giữ key hai ghế để dừng hiệu ứng cũ. Đi/ăn quân Board dùng cung33 mốc, hạ liên tục tới đích thay đoạn tới90% rồi rơi40ms, thời lượng400ms/đích/hủy giữ nguyên; áp dụng chung hai breakpoint.

- 2026-10-22: Đính chính popup mua Năng lượng mobile portrait theo user: rộng/cao bằng bảng Thông tin, dùng chung useProfileLayout và offset -6px; thay cách chỉ tăng80vw. Ba gói xếp3 hàng, hình nguồn crop bằng CSS giữ tỷ lệ, chữ/nút HTML lớn theo container. Desktop và landscape giữ artwork ngang. Nút vẫn báo chưa tích hợp, không cộng tài nguyên.

- 2026-10-22: Theo phản hồi laptop giật, Board/ChessPiece chuẩn bị lớp transform compositing ở cả desktop và compact, không chỉ mobile. Chiếu bí mọi breakpoint giữ filter/blur tĩnh, chỉ animate transform/opacity; thay ngoại lệ desktop filter động trước đó. Giữ nhịp400ms, cancel khi đổi ghế và gate kết quả/audio. Test kiểm tra WAAPI không animate filter và vẫn chờ completion; chưa profile FPS/browser QA.

- 2026-10-22: User yêu cầu phóng bảng mua Năng lượng trên điện thoại; compact width80vw (trước68vw), giới hạn1160px (trước980px), toàn bộ artwork/nội dung/nút tăng đồng tỷ lệ. Giữ desktop nguyên kích thước và giữ hit area bám artwork theo phần trăm.

- 2026-10-22: User chốt khi một trong hai người đấu rời phòng/xuống khán giả/đổi ghế phải hủy toàn bộ presentation ván cũ ngay, không truyền sang ván sau. App key GamePage theo room và socket Đỏ/Đen (không theo snapshot/clock); unmount hủy audio, Board lift/hit/timer, biểu cảm và trạng thái UI. Mount ở snapshot finished không phát lại mate/faces. Quy tắc mới này thay ngoại lệ giữ popup qua queue rotation; luật server/kết quả/thưởng giữ nguyên. Cùng hai ghế, ván kế tiếp vẫn reset theo phase ready.

- 2026-10-22: Home desktop/mobile: hover/focus vùng năng lượng hiện thời gian hồi và ẩn khi rời vùng. Chỉ dấu cộng mở bảng EnergyDialog; bấm vùng số dư không mở bảng mua.

- 2026-10-22: Chiếu bí mobile: không animate filter/drop-shadow từng sprite và blur từng bóng đồng loạt; giữ filter tĩnh, bóng chỉ animate transform/opacity và quân vẫn nâng/hạ như trước. Desktop giữ filter động. Giữ Promise.allSettled animation.finished, callback hit và gate âm thanh/kết quả; chưa đo FPS trên điện thoại thật.

- 2026-10-22: Khi vào bàn chưa đấu hiển thị tên/Elo, bắt đầu đấu mới thay Elo bằng clock. PlayerCard dùng [&[hidden]]:hidden! để flex/compact:flex/desktop:flex không ghi đè thuộc tính hidden của Elo và hai đồng hồ.

- 2026-10-21: Like trong trận phải dùng activeMatchId do RoomPersistence cấp và lưu DB, không dùng lastCompletedMatch hoặc mã online tạm. API nhận server_online đang playing hoặc finished; local chỉ lưu phiên. Chỉ ghi nhận client sau API thành công; activeMatchId bỏ khỏi snapshot khi không playing.

- 2026-10-21: User báo cung bay17 mốc mobile vẫn chưa mượt. Đã trả đường bay/easing400ms giống laptop; compact giữ will-change-transform trên lớp chuyển động từ khi đứng yên và transform-gpu trên lớp artwork/filter để giảm chi phí tạo lớp lúc bắt đầu đi/ăn quân. Chưa đo frame hoặc QA điện thoại thật, không khẳng định đã giải quyết hoàn toàn.

- 2026-10-21: GamePage mobile: khung tên và đồng hồ người trên cùng mép trái; người dưới cùng mép phải. Căn h2 theo mobileEdge cùng mép hàngclock, không dùng mxauto riêng gây lệch.
- 2026-10-21: GamePage mobile: dịch riêng khung tên trên3px sang trái và khung tên dưới3px sang phải; không đổi vị trí đồng hồ hay avatar.

- 2026-10-21: GamePage mobile user dưới: tên và đồng hồ nằm cùng data-player-identity cạnh avatar; đồng hồ ngay dưới tên, Like tách bên trái/cách8px. Gỡ hàng clock riêng phía trên card dưới; avatar/identity cùng grid row1, giữ mép dưới14px và avatar64px.

- 2026-10-21: Khôi phục animation online: useGame trước trả null cho online; useOnlineMoveAnimation phát400ms từ snapshot server tiến đúng1 nửa-nước và xác nhận cùng ID quân nguồn→đích. Snapshot đồng hồ/ack trùng không restart; latejoin/đổi phòng/undo/nhảy nhiều nước không animate. Clock server tiếp tục, giữ reduced-motion và hiệu ứng cuối ván.

- 2026-10-21: User chốt không cộng vàng cho cả hai trường hợp: tài khoản đã kết bạn accepted dù vào bàn cách nào, hoặc cặp đấu qua lời mời Mời chơi/So tài. MatchRepository chốt gold_reward_eligible ở start (DB migration006), end kiểm tra thêm bạn bè mới; không thể unfriend giữa ván để nhận vàng. Cặp mời ghi nội bộ theo hai socket, không tắt vàng cả phòng/người chơi thay ghế. Không ghi gold ledger khi bị loại; Elo/stat/năng lượng vẫn giữ.

- 2026-10-21: Mã phòng GamePage lấy từ RoomSnapshot.code do server cấp6 chữ số, không trùng phòng đang tồn tại và giữ qua reset. UUID vẫn là ID nội bộ/socket; không có code thì ẩn bảng mã, không dùng123456 mẫu.

- 2026-10-21: Ba nút trong menu ba gạch GamePage mobile (Rời phòng/Bạn bè/Âm thanh) đều 44×44px, bằng nút Chat/Lưu/Menu bên ngoài.

- 2026-10-21: GamePage mobile: user dưới bottom14px (hạ6px từ20), icon View28×21px (tăng từ24×18); mã phòng hạ6px/chữ16px, ba nút top76px. Chỉ chỉnh các vị trí/kích thước được user yêu cầu, avatar giữ nguyên kích thước.

- 2026-10-23: Theo user, nền/thẻ Xếp hạng mobile phải trắng kem thay vàng: lớp phủ giấy #fffaf0eb, thẻ #fffdf7/#f7f3eb/#fffaf2, header #f2ede3, nền cột Elo #e9e2d5. Giảm ám vàng ở bóng panel và dải nền cột hạng. Chỉ màu compact, giữ geometry/asset/Elo/avatar/desktop; khóa lại sau task.

- 2026-10-23: Theo user, hai tab Cờ Tướng/Cờ Úp ở Xếp hạng mobile phóng đồng tỷ lệ1.4→1.6 lần kích thước gốc264×70 (tăng thêm14.3% so lượt trước); giữ tâm, ảnh nguyên tỷ lệ và cả hai trạng thái. Desktop giữ cỡ cũ; khóa lại phạm vi sau task.

- 2026-10-23: Theo user, chữ Đang online trong Xếp hạng mobile phải bằng Offline: cả hai cùng cỡ22×rowScale cố định, một dòng; bỏ tự co riêng hai trạng thái này vì chuỗi online dài hơn gây chữ nhỏ. Trạng thái Đang chơi và tên vẫn fit như cũ. Giữ desktop, áp dụng cả hai tab; khóa lại sau task.

- 2026-10-23: Theo user, Xếp hạng mobile dịch Elo trái thêm12px logical (offset36→24 theo dialogScale), tiêu đề căn theo cùng eloOffset/eloWidthExtension. Đổi nhãn Điểm→Elo. Tên/trạng thái hiển thị đủ một dòng không ellipsis; RankingSingleLineText/useSingleLineTextSize đo chữ thật bằng Range, tự co font khi cột thiếu chỗ, tính lại khi resize/font tải xong. Max tên28/trạng thái22 theo rowScale; avatar và kích thước ô giữ nguyên. Khóa lại sau task.

- 2026-10-23: Theo user, tăng riêng nội dung hàng Xếp hạng mobile: số/huy hiệu thứ hạng phóng15% bằng scale trong chính ô hạng; tên người chơi24→28 logical theo rowScale, trạng thái19→22. Giữ full name/wrap, avatar, cột/nhãn đã căn, Elo và desktop. Áp dụng cả Cờ Tướng/Cờ Úp, khóa lại sau task.

- 2026-10-23: User yêu cầu căn nhãn Người chơi/Điểm với hàng dưới (các nhãn nằm ở Xếp hạng). Compact: header co cùng bề rộng nội dung danh sách qua useRankingListInset đo scrollbar/padding bằng ResizeObserver; Người chơi căn đúng mép tên sau avatar84+gap20+margin8 theo rowScale; Điểm căn giữa ô Elo có offset36 và phần rộng thêm34px theo dialogScale. Giữ nội dung hàng, avatar và desktop; khóa lại sau task.

- 2026-10-22: User đính chính nền Lịch sử mobile phải thay nền khung nâu bằng cùng ảnh phong cảnh social-header-landscape.png của Xếp hạng. frameStyle compact dùng ảnh làm background trực tiếp (rộng100%, caoauto/center top/no-repeat), thay gradient nâu phía sau tab; giữ hai khung Ván đấu/Thế cờ và nội dung danh sách. Desktop giữ cũ; khóa lại sau task.

- 2026-10-22: User đính chính phần nâu trong Lịch sử mobile: trả lại khung/viền/nền riêng của hai tab con Ván đấu/Thế cờ (giữ cỡ lớn); bỏ lớp phong cảnh nâu phụ phía sau header trên compact, thay yêu cầu kéo cao/fade trước đó. Giữ tab ảnh Đã chơi/Đã lưu,12 dòng và nhấn giữ hiện thùng rác. Khóa lại sau task.

- 2026-10-22: Theo user, Lịch sử mobile bỏ viền/nền nâu của tab con Ván đấu/Thế cờ, giữ chữ và vùng bấm. Nền phong cảnh header hạ top từ-8 lên8px thiết kế, kéo cao270px và mask mờ dần mép dưới. Ván đấu/Thế cờ đã lưu dùng chung usePressToRevealDelete: mặc định ẩn thùng rác, giữ500ms hiện icon; di chuyển hơn8px/cuộn/đổi tab/đóng dialog hủy, không mở profile/replay khi thả sau giữ. Bấm thùng rác mới gọi API xóa cũ, lỗi vẫn báo; desktop giữ hành vi cũ. Khóa lại phạm vi sau task.

- 2026-10-22: Theo user, phóng riêng hai tab con Ván đấu/Thế cờ trong Đã lưu mobile: min-width210px/min-height72px thiết kế, chữ21→34, padding ngang28/dọc10; desktop và tab ảnh Đã chơi/Đã lưu giữ nguyên. Phạm vi mở đúng hai tab con, khóa lại sau task.

- 2026-10-22: User yêu cầu hoàn tác riêng hai tab Lịch sử: trả Đã chơi/Đã lưu về ảnh gốc có chữ theo trạng thái, bỏ nền mask và chữ HTML vừa thử. Giữ kích thước tab trước đó và đồng bộ danh sách Đã lưu/Đã chơi12 dòng. Khóa lại sau task.

- 2026-10-22: User yêu cầu Đã lưu/Ván đấu bằng Đã chơi trên mobile: hai tab dùng chung HistoryTabButton, cùng nền nét cọ lấy alpha asset Đã chơi và chữ HTML font-heading italic50px thiết kế; ảnh desktop giữ nguyên. Dành cùng chiều cao hàng chọn Ván đấu/Thế cờ cho cả hai tab (ẩn ở Đã chơi); cùng lưới5 cột và12 dòng, nút Xóa mobile nằm góc phải trên từng dòng thay cột riêng để không thu avatar/tên/Xem lại. Giữ tên đầy đủ và chức năng lưu/xóa/replay; khóa lại sau task.

- 2026-10-22: Theo user, avatar Lịch sử mobile84→76px thiết kế; tên giữ24px, bỏ ellipsis/truncate riêng compact bằng whitespace-normal/text-clip/overflow-wrap:anywhere, thẻ tên h-auto/min-h66 và padding4 để tự cao theo tên. Áp dụng hai người và Đã chơi/Đã lưu ván; giữ12 dòng. Khóa lại đúng phạm vi sau task.

- 2026-10-22: User yêu cầu phóng thêm nội dung Lịch sử mobile: avatar72→84px thiết kế, thẻ tên58→66/chữ24, ngày giờ22, quân44→50, Xem lại cao54→63/chữ24. Cặp quân giữa compact gap0 để gần nhau hơn; giữ12 dòng, áp dụng Đã chơi/Đã lưu ván. Đúng phạm vi user mở task này, khóa lại sau task.

- 2026-10-22: Theo user, Lịch sử mobile hiển thị12 ván trong khung (thay10), chiều cao hàng trừ đúng11 khoảng cách; áp dụng Đã chơi/Đã lưu ván. Avatar60→72px thiết kế (tăng đều), thẻ tên48→58/chữ17→21, quân36→44, ngày giờ16→19, Xem lại cao44→54/chữ21 và tăng phần cột18fr. Cân lại cột co giãn, giữ desktop và hành vi; khóa lại phạm vi sau task.

- 2026-10-22: Theo user, tăng đều avatar trong hai cụm người chơi ở hàng Lịch sử mobile từ44 lên60px thiết kế; tăng chiều cao thẻ tên34→48px, giữ căn giữa và lưới10 dòng. Áp dụng chung Đã chơi/Đã lưu; desktop giữ nguyên. Mở đúng phạm vi avatar/thẻ tên task này và khóa lại sau task.

- 2026-10-21: User hủy yêu cầu khóa xoay điện thoại; đã gỡ tự khóa portrait và tự bật fullscreen.

- 2026-10-21: Theo user, hai tài khoản public ID29622295 và96161606 có năng lượng vô hạn. Entitlement server-side theo public ID; không trừ PvP/máy thử, không chặn queue/ready/create/join; UI Home hiển thị∞. Không chỉnh số dư DB và không áp dụng tài khoản khác.

- 2026-10-21: GamePage online: Rời phòng khi đang chơi không hiện confirm, rời trực tiếp. Mobile Like nằm ngang cùng đồng hồ, cách8px; nút27px/icon17px cho cả hai người. Đồng hồ dùng khung viền CSS riêng, không dùng asset khung Elo. Desktop giữ nguyên.
- 2026-10-21: PlayerInfoCard compact: user chỉ yêu cầu phóng to Bạn bè/Theo dõi/Lượt thích (nhãn/số24px, tim24px). Name giữ38px, Elo giữ text-2xl như trước; không tăng hai phần này. Áp dụng chung Hồ sơ và Tùy chỉnh avatar.
- 2026-10-21: Hồ sơ người khác compact: panel nâu chứa6 thẻ thao tác dùng h-fit/flex-none; lưới3×2 gap5px, lề trái/phải/trên5px và dưới2px để sát hàng nút dưới. Desktop giữ gap/padding gốc.
- 2026-10-21: Hai thẻ thống kê Cờ Tướng/Cờ Úp trong popup Hồ sơ compact cao thêm5px; neo mép trên như cũ bằng cách giữ translateY -16px và tăng phần bù chiều cao16→21px. Không đổi desktop hoặc vùng avatar.
- 2026-10-21: Icon Chat và panel Chat GamePage compact portal ra document.body để neo theo viewport, không dịch theo ancestor/hàng flex khi bật/tắt; placeholder44px giữ vị trí các nút header. Mã phòng mobile top6px/chữ16px; hàng ba nút mobile ở top76px dưới mã phòng; Chat44px bằng Lưu/Menu, right theo gap chung. Theo user đính chính, khung thông tin nâu (name/Elo/địa chỉ) cạnh avatar trong popup compact nâng8px bằng dịch cả card; biển danh hiệu, avatar và nameplate trong trận giữ nguyên vị trí.

- 2026-10-21: Catalog Danh Hiệu Phong Tặng: huy hiệu con mắt/số thu còn90% và dịch xuống5px; chỉ catalog, badge xem trước hồ sơ giữ nguyên.
- 2026-10-21: GamePage mobile cố định hàng Lưu→Chat→ba gạch ở right10px/top76px, bằng mép khung avatar trên; vào phòng không làm dịch hàng nút. Lưu nằm ngoài menu; menu mở xuống dưới. View ở trái10px/bottom20px; bảng người xem mở lên ngay phía trên nút, lớp z500 phủ thành phần khác. Chat mobile mở cũng phủ thành phần khác ở z500; mở View/Chat thì đóng panel/menu đối diện. Cụm Hoàn tác/Cầu hòa/Xin thua absolute trong main h-dvh, căn giữa theo khung tên/Elo của người dưới và cách mép trái khung 4px qua ResizeObserver, không portal document.body để tránh sai viewport Android. Laptop giữ bố cục cũ. Biểu cảm online chỉ hiện trong ván đang đấu và dọn khi kết thúc/rời; mobile đang đấu thay Elo bằng clock; đối thủ trên, mình dưới. Không đổi kích thước avatar.
- 2026-10-21: Home mobile giữ nameplate rộng37cqw bằng cụm hai ô Elo; cao27px, padding17px, chữ17px. Cụm Elo ở top12cqw; ô cao6cqw, icon3.8cqw, số Elo3.3cqw. Cúp giải đấu dùng lại emoji 🏆 runtime tại vị trí hiện hành; desktop17cqw, mobile15cqw, giữ hiệu ứng drop-shadow.

- 2026-10-21: Bộ chọn địa chỉ mobile giữ nguyên khung/offset của Thông tin qua mọi bước, kể cả khi mở bàn phím; không autofocus và bỏ qua resize giảm chiều cao khi input focus. Mobile chỉ hiện nút quay lại dạng icon lớn, ẩn dòng lưu ý cạnh nhóm nút; desktop giữ nhãn/lưu ý. Ô tìm kiếm cao56 logical/chữ18px, tên khu vực18px; danh sách quốc gia ưu tiên Việt Nam rồi Trung Quốc trên mobile, desktop giữ thứ tự gốc. Luôn cần hai lần chạm liên tiếp vào cùng quốc gia hoặc tỉnh trên mobile, kể cả mục đã được chọn sẵn: Việt Nam đi thẳng đến tỉnh, quốc gia khác lưu địa chỉ; tỉnh đi thẳng sang xã/phường. Desktop giữ nguyên thao tác nút.

- 2026-10-21: Trên IP LAN/HTTP không hỗ trợ Google Sign-In, GoogleSignInButton chỉ hiện lý do; không phủ nút fallback “Đăng nhập với Google” khiến người dùng tưởng bấm được. Guest vẫn dùng được qua LAN; Google cần origin HTTPS được đăng ký.

- 2026-10-21: CI PR Ubuntu báo lỗi test: Rời phòng có desktop `#backButton` và nút mobile trong menu nên test phải truy vấn theo role trong banner rồi chọn ID header; không đổi giao diện. Route `/mobile-preview[/]` trả404 chỉ vì test tạo production app trước build, checkout sạch thiếu `dist/index.html`; inject `staticDirectory` tùy chọn và temp fixture vào test, production mặc định vẫn dist. 381 PASS/17 SKIP Local; 6 test Pikafish thật cần binary Windows, 17 DB integration chạy riêng MySQL tạm17/17 PASS. Không thay luật/nghiệp vụ. CI actions checkout@v7/setup-node@v7 runtime24, Node project22. Chưa push/merge/deploy; xem docs/CI-TEST-AUDIT.md.

- 2026-10-21: Icon sao chép ID trong PlayerInfoCard dùng vùng bấm20px, SVG14px và nâng6px so với tâm hàng ID. Áp dụng chung Thông tin và Tùy chỉnh avatar vì cùng card.

- 2026-10-21: Bảng Thông tin danh hiệu mở từ danh hiệu trong hồ sơ ở compact phải fixed theo viewport, tâm màn hình và không nhận tọa độ badge đã bấm. Không chuyển dialog hồ sơ sang toàn màn hình khi mở chi tiết: giữ nguyên khung Thông tin, scene background và offset compact -6px trước/sau khi mở. Giữ vị trí neo cạnh badge trên desktop.

- 2026-10-21: User thu tabảnh Danh hiệu mobile150→120px (giữratio/artwork/cuộn) và đưaẨn cạnhX: top8px/right40px, Xgiữtop0/right0. Biển ảnh header rộng66%/tâm35% để chừa vùng điều khiển bênphải, khôngđènhau. Desktopgiữnguyên.

- 2026-10-21: User không chấp nhận khung/tab Danh hiệu mobile bằng CSS đơn giản. Phải giữ artwork gốc: viền vàng/góc trang trí, bảng tên đỏ Danh hiệu, nútX/tua và tab có icon+chữ. Dùng crop từ honors-frame-tight.png qua scripts/crop-honors-mobile.py; frame nine-slice giữ góc, title/tab giữ tỷ lệ/alpha tight. Tab vẫn ngang/cuộn, catalog3cột; desktop nguồn gốc giữ nguyên. Quy tắc này thay skin profile/sidebarHTML/khung trơn ở ghi chú cũ.

- 2026-10-21: User chốt catalog Danh hiệu mobile: các nhóm nằm hàng ngang phía trên, không đủ chỗ thì vuốt/cuộn ngang; bỏ sidebar mobile. Danh sách3danhhiệu/hàng, dùng gần hết chiều ngang panel; thay catalog2cột ở ghi chú trước. Desktop giữ sidebar/layout cũ. Giữ thứ tự nhóm và ownership/chọn hồ sơ.

- 2026-10-21: User yêu cầu khung Danh hiệu mobile bằng Thông tin và chữ căn giữa. Catalog dùng đúng width/height/translate của profile, nền khung mobile riêng theo skin profile để không kéo méo chữ sidebar raster; catalog2cột, detail82%panel căn giữa, desktop giữ cũ. Sửa dấu cộng Phong Tặng: previewHonors trước lọc endorsementCount dù DBđãcấp, làm dấu chọn/preview mất. Tài khoản nay lọc theo ownedIds; legacykhôngaccount giữngưỡngcũ. Không sửa DB/giả endorsement. BrowserQA mocktransport xác nhận sở hữu/count0 chọn-bỏ/đóngmở/preview và tối đa3/nhóm; frame390px370x692.075 tọađộ trùngThôngtin.

- 2026-10-20: User chốt lưới Chọn viền mobile4cột/3hàng nhìn thấy, các viền tiếp theo cuộn nội bộ; thay3cột cũ. Artwork viền vẫn giữ aspect vuông/tròn. Desktop giữ6cột/3hàng.

- 2026-10-20: User yêu cầu bỏ So sánh độ nét A/B/C khỏi Tùy chỉnh avatar trên cả mobile và laptop. Không đưa lại nút hoặc popup so sánh vào giao diện. Footer chỉ còn Hủy/Sử dụng.

- 2026-10-20: User chốt danh sách avatar mobile4cột (thay5), giữ desktop. Nội dung trong PlayerInfoCard của Tùy chỉnh phải trùng từng dòng với Thông tin: khi ẩn nút/cờ địa chỉ giữ placeholder compact:contents/invisible/inert để hàng địa chỉ không giảm chiều cao và làm toàn card justify-center nhảy. Không chỉ đo viền ngoài; đối chiếu top/height tên/Elo/social/địa chỉ/ID. Browser390px cả5hàng trùng hoàn toàn sau sửa.

- 2026-10-20: User yêu cầu cố định toàn bộ nhận diện Tùy chỉnh mobile theo Thông tin: avatar cùng vị trí top/left (wrapper stretch/justify-start/pt1), card cùng tọa độ, nền cùng crop/object-position0%0% và height270+32logical/mask65→100%. Quy tắc này thay nền270+170 riêng Tùy chỉnh ở ghi chú trước; không kéo cao ảnh làm đổi góc crop. Browser390px đo avatar80x80, card234x135, scene346x151 và mọi tọa độ trùng hai màn. Giữ danh sách avatar5cột/3hàng và desktop.

- 2026-10-20: User chốt Tùy chỉnh avatar mobile phải bằng khung Thông tin, dùng cùng PlayerInfoCard/kích thước/vị trí khung tên (cột avatar180, card270/translateY-20 logical). Dialog và biển căn như Thông tin. Nền cảnh kéo xuống qua tab rồi mask black65%→transparent100%, riêng Tùy chỉnh cao270+170logical, tắt lớp che ngang ở compact. Danh sách avatar 5 cột × 3 hàng, ô/ảnh giữ vuông/tròn; thay yêu cầu tạm3cột avatar ở ghi chú trước. Viền vẫn3cột. Desktop giữ cũ.

- 2026-10-20: Lỗi Tùy chỉnh avatar mobile đè tab: các biến --ui-p-164/218/25 chưa có trong PIXEL_SIZES nên fallback thành px không co theo dialog. Trong consumer dùng token đã có và calc theo tỷ lệ; không mặc định fallback px sẽ được scale. Preview phải dành đủ chỗ cho cả avatar/danh hiệu/sao; card mobile cho các chỉ số xuống dòng. Lưới avatar/viền mobile dùng 3 cột, ô vuông, ảnh tròn giữ aspect và cuộn trong vùng chọn; desktop giữ cấu hình cũ. Đây là sửa lỗi trong phạm vi Tùy chỉnh mobile user yêu cầu.

- 2026-10-19: User chốt bảngthưởng chỉhiện sauhếtchiếubí. GameSounds.start trảpromise onended, playCheckmate chờ main+introTwo; useMoveSound báo checkmateAudioComplete theo key nướcván, xửlý snapshot chỉđổiresult/bỏcompletion instancecũ. useMatchResult gate cảaudio vàcallbackBoard hình. Máygiảresign2nước thêm matepresentation qua soundResult/GamePage, khôngđổi backend/PvP.25 targeted tests PASS (23sound/result/testbot+2computerUI), typecheck/build PASS dist index-CmGDITaT.js. Lần chạyrộng ui.test.tsx có20case fail (mock HomeMusic.play undefined/.catch vàflowUIcũ), khôngtuyênbố fullsuitegreen; cậpnhật mockaudioComplete/testintro cũ4→2 đúng cùngclockhiệnhành, khôngđổi intro runtime. Chrome isolated GamePage+WebAudio thật/autoplayallowed/snapshot máygiả: start3726.3/end4562.3/popup4822.8ms, popup sauaudio và~1.1s từmate; khôngDBuser, harness/browserđãdọn.

- 2026-10-19: User xem ảnh thưởng+128vàng và ô sốdư đểchỉnhUI: MatchResultDialog thêm gold-icon-v2 dùngchungHome cạnh số+thưởng; chữ số đổi font-number/TimesNewRoman, normal/lining/tabular giống ôgoldHome. Bỏ từvàngtrựcquan (iconthaynhãn), aria-label Nhận N vàng. Giữ sốthưởngAPI vàmàunâu/cỡ/vịtríô, không đổi mức thưởng thành sốdưtrongảnh. Typecheck/build PASS, dist xácnhận; chưa browserQA lượtstyle này.

- 2026-10-19: Máy giả thử thưởng theo yêu cầu user,2nút Home xiangqi/jieqi, Đỏ đi2nước hợp lệ thắng do máy resign. AccountAPI/auth → TestBotService(RAM30phút/1ván/user, enginechung xácthực/botđáp, serialize+cache UUID) → TestBotRepository(lock user/resources, gold125–150+ledger test_bot_win atomic/keyperván). DBfail rollback/retry cùngsốthưởng; profile API cậpnhậtstore/popup vàng. KhôngElo/statPvP/nănglượng/phòngonline/migration/dependency mới. useComputer thường không chạy khi testBotId; Sẵn sàng/reset tạo vánthửmới, leave/joinonline/locallàm sạch; bỏresponse cũsauthayaccount/rờiván.15/15 unit/React/result/Home regression PASS;18/18 integration trênMySQLtạm PASS gồm cả2variant/reloadbalance/duplicate/crossuser/rollback (sandboxtsx os.userInfo lỗi nên chạyQA script ngoài sandbox đãđượcduyệt). Chrome QA thật Home→GamePage qua2nút/2nước/popup/+135/returnHome135→270 PASS với transportmock/không DBuserthật; ảnh outputs/test-bot-qa.png, harness/browserđãdọn. Typecheck/build PASS dist index-Bq9LX6bW.js xácnhận2nút/API. Chi tiết docs/TEST-BOT.md. Đây là ngoại lệ thử riêng, không thay luật thưởng máy/PvP hiện có.

- 2026-10-19: User báo popup kết quả không thấy khi đấuonline. Đã tái hiện2đường mấtkếtquả trong regression: animation.finished bịreject do cancel và snapshot chuyển thẳng playing→ready. Board dùng Promise.allSettled đợi toàn bộ animation kếtthúc/hủy rồi callback cóguard vòngđời; useMatchResult bổsung lastCompletedMatch mới từserver khi bỏqua finished, chỉ dùng phe đã ghi trong ván, không hiện khán giả đượcđẩyghế.7/7 regression PASS, typecheck/build PASS dist index-BB2xhJBQ.js xácnhận. Chrome headless isolated QA toàn GamePage với snapshotonline giả: win/loss popupopen kíchthước291×364, confirm đóng, viewer khôngpopup, skippedfinished-loss hiện đúng. Screenshot outputs/result-online-qa.png. Khôngđấu trên tài khoảnthật; chưa xácđịnh chínhxác đườnglỗi ở browseruser, khôngtuyênbố đã táihiện cùngphiên thật. Fileharness tạm đãxóa/browserQA đãđóng. Cần reload bundle trướcvánmới.

- 2026-10-19: User chỉ rõ vương miện rời trên avatar hạng1 Xếp hạng (top-one-crown.png), không phải mũ trong chân dung. Dịch riêng SVG crown lên thêm3px CSS bằng top calc(-ranking-5 -3px), chung2tab; giữ ảnh/avatar/khung/bố cục khóa. Quyền chỉnh chỉ crown task này, sautask giữkhóa. Typecheck/build PASS, dist xác nhận offset; chưa browser QA. Ảnh imagegen thử ở lượt hiểu nhầm trước không đưa vào project.

- 2026-10-19: User chốt2ảnh17dba0c6 thắng/ff38225e thua xuất hiện cuối ván sau hiệu ứng chiếu bí, chỉ2người đã đấu thấy. MatchResultDialog dùng native dialog/ảnh gốc/overlay nútXác nhận; nguồn và alpha bbox1122x1402 tại src/assets/game-result/source.md. Board báo hoàn tất sau cả animation.finished nângquân và hitload+200ms, cleanup không phát callback cũ; lỗi tải hit hoàn tất an toàn. useMatchResult ghi phe lúc đangđấu, phân thắngthua theo game.result server/local, giữ popup qua queue rotation, không hiện với spectator mớiđượcđẩyghế/lateviewer/replay/trial/demo/hòa; vánmới/rờiphòng dọn. Chưa nối ô Vậtphẩmnhậnđược, không giả thưởng.5/5 regression hook/effect/move-stability PASS, typecheck/build PASS; dist index-Cx9tqQCr.js và victory/defeat xác nhận; chưa browser QA.

- 2026-10-16: Google Sign-In thật bằng GIS popup + google-auth-library verifyIdToken/audience GOOGLE_CLIENT_ID/nonce một lần. Migration004 thêm google_sub unique ascii_bin và session_expires_at, đã apply1 bước trên cotuong;001–003 không sửa. Guest link transaction giữ users.id/public ID/dữ liệu; Google cũ login lại; conflict409 không merge, revoke device hash user link. Session mới30 ngày hash DB/cookie HttpOnly, Socket.IO dùng auth hiện có. Client dùng VITE_GOOGLE_CLIENT_ID cùng ID backend, không Client Secret/token log/localStorage. Tests30/30 + MySQL tạm9/9 PASS; typecheck/build PASS, dist cập nhật; chưa Google popup QA thật vì Client ID chưa điền. Hướng dẫn/file/phạm vi: docs/GOOGLE-SIGN-IN.md.

- 2026-10-16: Hồ sơ chính mình mở ngoài nút hồ sơ Home chỉ có Thoát bên phải, không Kết bạn/Đăng xuất. ProfileDialog tách accountActions khỏi own identity; nhận diện mình theo session name nếu caller không chỉ định; Chọn Bàn tắt accountActions. Home giữ Liên kết/Đăng xuất. Regression footer2/2 PASS, typecheck/build PASS; dist xác nhận, chưa browser QA.

- 2026-10-16: Ghế online trống không render PlayerCard (không avatar/khung/tên/Elo giả). Người ngồi dùng hồ sơ thật cho portrait/frame/displayName/Elo qua PlayerCard chung; giữ geometry/avatar sizes. RoomPlayer.userId tùy chọn do server gắn từ identity khi publish, không dùng socket id làm DB user_id; hook fallback tìm tên cho snapshot legacy. Regression identity/wait3/3 PASS, typecheck/build PASS; dist cập nhật, chưa browser QA.

- 2026-10-16: Chơi nhanh/Đấu ở Home hết đối thủ thì tạo bàn online10 phút/60s mỗi nước theo tỉnh hồ sơ và join chờ một mình, không fallback máy. Chơi với máy/Cờ Úp riêng giữ nguyên; Chọn Bàn hết phòng vẫn mở Tạo bàn. Regression3/3 PASS, typecheck/build PASS; dist xác nhận, chưa browser QA.

- 2026-10-16: Hàng hội thoại luôn giữ dòng preview cao tối thiểu20px responsive khi rỗng, nên icon nhóm/tên không tụt giữa. Tải list/social/messages đã biết ID song song, read/member không chặn hiển thị; polling1s thay4s, không chồng poll. Tự chọn hội thoại đầu khi selection cũ không còn. Spinner giữa dialog khi tải đầu/chuyển hội thoại/gửi/tạo nhóm; chặn gửi/tạo lặp trong lúc chờ. Giữ avatar/geometry. Typecheck/build PASS, dist xác nhận; chưa browser QA hoặc đo latency thực tế.

- 2026-10-16: Theo yêu cầu giữ hàng hội thoại căn trái như ảnh: button full width/justify-start, thông tin text-left và overflow-hidden, preview min-w-0/justify-start để nội dung dài không đẩy cụm avatar/tên. Giữ kích thước/vị trí avatar và khung. Typecheck/build PASS; dist xác nhận class mới, chưa browser QA.

- 2026-10-16: Sửa tạo nhóm chỉ có chủ nhóm: PersistenceService cho phép members rỗng khi có title; chat trực tiếp vẫn cần đúng1 người khác. Repository tự thêm chủ nhóm role owner. UI giữ nguyên, lỗi tạo nhóm hiện lý do API. Regression validation1/1 và MySQL tạm integration7/7 PASS; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-16: Người dùng hoàn tác lần thu nhỏ tên18; PlayerNameplate trở về font24 theo tỷ lệ chiều rộng như trước. Chưa sửa quy tắc tên hoặc tìm phương án khác. Typecheck/build PASS, dist đã khôi phục; chưa browser QA.

- 2026-10-16: Cờ quốc gia hồ sơ phải dùng CountryFlag/SVG local (assets/countries, MIT flag-icons), không emoji regional indicators vì Windows hiện VN thay cờ. Icon28×21 theo token ui, self-center trong hàng địa chỉ, không đổi avatar/khung. Proxy API Vite phải giữ Host với changeOrigin:false để không bị origin guard403 khi đăng nhập5173.

- 2026-10-16: Tích hợp MySQL thật: migration002/003 đã apply,001 giữ checksum; Guest server Kỳ Thủ XXXXXX/public ID8 unique, credential cookie HttpOnly và hash DB. User mới Elo1000 riêng xiangqi/jieqi, vàng0, energy5. Energy>5 hợp lệ, hồi1/7 phút chỉ đến5. PvP bắt đầu rồi kết thúc (kể cả0 nước/leave) lưu history/replay và transaction Elo/gold; ngoài3 sao thắng+20, hướng thua giữ-10/-13, hòa0, thắng thưởng125–150. Saved/social/DM/honors tải/ghi MySQL, tên resolve users hiện tại; không tự import fixture/localStorage cũ thành dữ liệu user. Google/auth provider link chưa có, không fake. Giữ runtime RAM, UI geometry và Pikafish. Xem MYSQL-INTEGRATION.md cho phạm vi/kiểm chứng/TODO.

- 2026-10-16: Quốc gia/địa chỉ hồ sơ chỉ được lưu một lần; sau lưu thay bút địa chỉ bằng cờ quốc gia, không cho sửa. Việt Nam giữ chọn tỉnh/phường; nước khác lưu quốc gia. Hiện lưu localStorage theo Guest, chưa enforcement MySQL/auth; không đổi avatar hoặc bố cục vùng khóa.

- 2026-10-16: Foundation MySQL 8.0.45: 19 bảng + journal, checksum/advisory lock; DDL dang dở phải kiểm tra thủ công, không DROP. BIGINT ID dùng string; Guest backend Kỳ Thủ XXXXXX unique, chặn rename chưa liên kết; frontend chưa đổi. Chưa auth/UI/game persistence/seed catalog. MySQL tạm migrate/rerun/verify/smoke rollback PASS; test chọn 16/16 PASS; full suite 233 PASS/52 FAIL ngoài DB; typecheck/build PASS. Xem MYSQL-FOUNDATION.md.

- 2026-10-15: Header Chọn Bàn bổ sung Toàn màn hình ở cuối cụm tiện ích; thứ tự Cúp, Bạn bè, Âm thanh, Toàn màn hình; dùng handler fullscreen chung của Home.

- 2026-10-15: Đặt quân bằng click vào điểm không hợp lệ trong Vị trí tùy chỉnh chỉ báo lỗi, vẫn giữ lựa chọn bên/loại quân trong khay để thử điểm khác; áp dụng cho cả hai bên.

- 2026-10-15: Header Chơi với máy (desktop/compact) bỏ Thành tích; hai tiện ích theo thứ tự trái→phải là Âm thanh, Toàn màn hình. Toàn màn hình bật/tắt bằng fullscreen API và báo lỗi qua dialog hiện có.

- 2026-10-15: Trong Vị trí tùy chỉnh, chuột phải lấy quân khỏi bàn cũng tự chọn khay đúng bên và loại quân vừa lấy, đồng bộ với kéo quân ra ngoài.

- 2026-10-15: Màn Vị trí tùy chỉnh bỏ nút Lưu thế cờ ở thanh tiện ích theo yêu cầu; giữ Tạo từ ảnh, Âm thanh và Toàn màn hình.

- 2026-10-14: Hover Lùi/Tiến trial enabled phủ vàng nhạt#ffe08b alpha8%, xuất hiện ngay không transition; thay hover trắng10% trước đó.

- 2026-10-14: Máy đi trial bỏ outline focus khi Enter/click, giữ glow active. Lùi/Tiến enabled hover phủ trắng10%; disabled không hover, giữ artwork mờ.

- 2026-10-14: Lùi bàn thử (nút và ←) quay về trước nước của mình: mình vừa đi/máy chưa đáp lùi1; máy đã đáp sau mình lùi2. Nếu chỉ có nước máy mở đầu thì lùi1, không vượt gốc. Hủy animation/request qua seek; giữ tua từng nước ở replay gốc và nút tiến như cũ.

- 2026-10-14: Lùi/Tiến trial phải làm mờ trực tiếp artwork khi disabled (brightness0.35), không chỉ CSS trên button trong suốt. Robot Máy đi dùng crop img riêng792×182 thay background atlas để tránh render lệch/vỡ; giữ hiệu ứng active.

- 2026-10-14: Máy đi bật phải nổi bật theo ảnh mẫu: phóng1.03, sáng125%, viền vàng2px và glow vàng/cam trong-ngoài rõ. Tắt bỏ active. Chỉ áp dụng nút Máy đi, giữ khung/các nút khác.

- 2026-10-14: Hoàn tác UI khung trial về220px/chữ Máy đi17px và khoảng cách artwork bản trước; giữ active Máy đi scale1.02/viền vàng mảnh/glow nhẹ. Giữ phím tắt và search1s, không hiện dòng đang tính.

- 2026-10-14: Trial bỏ dòng Pikafish đang tính; search vẫn cấp10 nhưng movetime1000ms theo yêu cầu. API thinkMs tùy chọn validated100..2500 chỉ level10; trial gửi1000, chế độ khác giữ profile cũ. Không nhầm thời gian engine với tổng thời gian mạng/khởi động/animation.

- 2026-10-14: Theo yêu cầu thử UI mới sau hoàn tác: trial controls220→240px, khoảng cách artwork các nút tăng theo tỷ lệ khung; chữ Máy đi17→20px. Máy đi bật scale1.02, viền vàng1px/glow nhẹ, tắt về cũ. Không dim nút Lùi/Tiến; giữ toàn bộ phím tắt.

- 2026-10-14: Người dùng hoàn tác riêng UI lần nới/glow/dim trial: khung về220px, bỏ dim Lùi/Tiến và scale/glow Máy đi. Giữ nguyên phím ←/→/↑/↓/Enter/Space đã nối.

- 2026-10-14: Khung trial tăng220→244px; Lùi/Tiến mờ40% khi không dùng được, sáng lại khi có lịch sử. Máy đi bật scale1.04/glow vàng, tắt về cũ. Bàn thử dùng ←/→ lùi/tiến, ↑/↓ reset, Enter bật/tắt Máy đi; bàn gốc Enter Phát/Tạm dừng, Space chuyển bàn. Phím ngoài phạm vi không chiếm thao tác ô nhập/dialog.
- 2026-10-14: Nội dung số mới mặc định dùng font-number và lining-nums/tabular-nums, căn baseline/hàng với nội dung bên cạnh theo yêu cầu người dùng.

- 2026-10-14: Trial dùng cả cụm giữa ảnh4470bd4d làm khung Lùi/Reset/Tiến/Máy đi; hit area tương ứng artwork, nhãn Bật/Tắt HTML trên nền đã xử lý từ ảnh gốc. Phân tích/Gợi ý tách dưới khung gap10px CSS, width72px mỗi nút; không bọc nền/viền thêm. Replay gốc giữ controls cũ.

- 2026-10-14: Phân tích/Gợi ý trong trial dùng hai nút ảnh dưới của4470bd4d, crop alpha riêng trial-analysis/trial-hint, đặt ngang giữ tỷ lệ. Wrapper không nền/viền/padding/shadow. Vẫn UI đang phát triển, không logic phân tích/gợi ý.

- 2026-10-14: Máy hướng dẫn/đánh thử phải dùng Pikafish cấp10 qua API, tuyệt đối không fallback máy cơ bản. Gửi FEN snapshot gốc và lịch sử UCI nhánh tới nước hiện tại, remainingMs600000 để dùng đủ profile mạnh nhất. Hủy request khi tua/reset/tắt/chuyển/rời, validate nước và giữ animation. Lỗi có Thử lại; Cờ Úp báo chưa hỗ trợ Pikafish. Phân tích/Gợi ý vẫn chỉ UI.

- 2026-10-14: Đính chính nút ghim trong replay: chỉ hiện ở bàn thử và bàn chính Ván đấu; bàn chính Thế cờ ẩn ghim. Bàn chơi thật vẫn giữ Lưu thế như trước.

- 2026-10-14: Mở Thế cờ gốc ẩn ReplayControls Phát/0/0/Tua, chỉ giữ icon chuyển bàn (và tiện ích); bàn thử vẫn có controls thử. GameTools cho ghim lưu thế ở mọi replay/trial, lưu snapshot đang hiển thị ngay. replayKind=position phân biệt nguồn, initialMoveCount giữ số nước của thế gốc khi lưu tiếp.

- 2026-10-14: Mỗi lần chuyển Xem lại↔Đánh thử luôn tắt Máy đi. Nước đi thử của người/máy truyền animation Move qua Board chung, khóa nước tiếp khi đang chạy400ms; máy chờ animation xong rồi delay550ms. Tua/reset/chuyển/rời hủy animation/timer cũ.

- 2026-10-14: Phím Enter/NumpadEnter Phát/Tạm dừng replay (không áp dụng trial); Space luôn chuyển Xem lại↔Đánh thử kể cả nút đang focus. Bỏ qua ô nhập/dialog/phím lặp/modifier, không xử lý lúc entrance.

- 2026-10-14: Khoảng cách giữa hàng Thế cờ dùng cùng var(--ui-p-5) với Ván đấu, viewport vẫn vừa hai hàng. Bỏ đường chia liền giữa card; thanh cuộn mảnh nằm ở khoảng trống phải ngoài card, track/corner trong suốt chỉ hiện thumb.

- 2026-10-14: Icon replay chuyển sang trái và đổi chức năng thành Xem lại/Đánh thử, Space dùng cùng thao tác (bỏ qua ô nhập/dialog/phím lặp). Cụm ReplayControls chuyển dưới user phải. Đánh thử chụp đúng snapshot đang xem, tạm dừng replay; useReplayTrial giữ nhánh riêng, không sửa recording/gameStore/socket/clock. Lùi/tiến duyệt nhánh, số nước thay Reset về mốc thử. Máy đi toggle mặc định tắt, bật dùng máy cơ bản theo phe đối diện user; tắt cho đi cả hai bên. Timer máy hủy khi tua/reset/tắt/rời. Phân tích/Gợi ý chỉ UI disabled/đang phát triển. Bấm icon/Space lại trở về đúng nước replay gốc.

- 2026-10-14: Icon đảo hướng replay tăng64→84px desktop,40→52px compact; vị trí không đổi.

- 2026-10-14: Replay thêm nút đảo hướng bàn dùng ảnh người dùng0a700f7c; desktop đặt giữa theo chiều dọc bàn và giữa bàn/mép phải bằng cột phải GamePage. Chỉ đảo Board, giữ user trái và state gốc; vào replay khác reset hướng mặc định. Compact nút nhỏ dưới cụm phải tránh avatar.

- 2026-10-14: Đính chính bố cục hàng Thế cờ: bỏ dịch5px; cột thao tác chỉ rộng bằng nút Mở thế151px responsive, mép phải nút trùng mép phải thùng rác. Cột thông tin minmax(0,1fr) giãn lấp khoảng trống; giữ gap bàn–thông tin10px.

- 2026-10-14: Theo yêu cầu đẩy nhẹ sang phải, cụm thông tin và nút Mở thế hàng Thế cờ dịch5px CSS; bàn mini và thùng rác giữ vị trí.

- 2026-10-14: Nút thùng rác của mỗi hàng Thế cờ nằm góc trên bên phải; giữ nút Mở thế ở bên phải giữa hàng.

- 2026-10-14: Hàng Thế cờ phải rộng bằng Ván đấu, bỏ gutter thanh cuộn dành sẵn riêng. Mở thế dùng cùng asset nút gỗ/font/cỡ chữ Xem lại; Xóa dùng icon thùng rác/nền xám/kích thước của Ván đấu. Hai nút đặt ngang cuối hàng.

- 2026-10-14: Icon số nước/ghi chú và loại cờ trong hàng Thế cờ tăng lên24px responsive; chấm bên tới lượt18px responsive. Ghi chú tăng lề trái để không chồng icon.

- 2026-10-14: Thế cờ: vs cách mỗi user17px CSS; icon số nước/ghi chú là tờ báo SVG. Ghi chú có bút riêng góc trên phải; sửa tên giữ nền gradient vàng/độ đậm, sửa ghi chú giữ nền nâu nhạt. Nút ghim trong ván lưu ngay snapshot với tên mặc định theo số nước và ghi chú trống; không hỏi, không mở dialog. Chỉnh tên/ghi chú sau trong Đã lưu.

- 2026-10-14: Người dùng mở riêng avatar nhỏ hàng Thế cờ, tăng28→34px responsive rồi khóa lại. Cụm hai user ôm nội dung, vs đặt giữa, cách mỗi cụm10px CSS, không flex-1 tạo khoảng trống thừa.

- 2026-10-14: Thông tin hai người trong hàng Thế cờ luôn đặt bản thân bên trái nếu tham gia; nếu hai người lạ đấu thì Đỏ bên trái, Đen bên phải. Dùng savedMatchSide chung với Ván đấu/replay, không đổi phe/lượt trong snapshot.

- 2026-10-14: Mini Board Thế cờ không có bóng khung/bàn (Board shadow=false); nội dung cách bàn10px CSS. Tên thế tăng21→24px responsive và font-black. Các bàn khác giữ bóng mặc định.

- 2026-10-14: Mini Board trong Thế cờ lấy chiều cao hàng thực trừ10px, cách mép trong trên/dưới5px CSS, width theo1134/1296. ResizeObserver đo hàng trong viewport hai dòng; không giữ width178 cố định.

- 2026-10-14: Style hàng Thế cờ theo ảnh mẫu giấy vàng/đường chia nâu, tên nền vàng và bút sửa, hai tên người kèm avatar nhỏ và vs, số nước/chấm màu lượt/biến thể, ghi chú nền nâu nhạt cuộn riêng. Bút cho sửa tên/ghi chú và lưu localStorage. Vẫn hai hàng, bàn mini dọc đúng tỷ lệ và Mở thế/Xóa; modal/Ván đấu không đổi.

- 2026-10-14: Màn bàn cờ luôn có Âm thanh và Toàn màn hình (phóng to/thu nhỏ), kể cả replay ván/đọc thế đã lưu và trình chỉnh thế compact. GameTools replay chỉ hiện hai tiện ích này; không bật lại lệnh thi đấu.

- 2026-10-14: Đã lưu/Thế cờ mỗi hàng một thế, viewport vừa hai hàng và cuộn dọc; ngày giờ/bàn mini dọc/thông tin/nút Mở thế-Xóa. Ghi chú cuộn riêng trong chiều cao cố định. Giữ modal và tab Ván đấu. Người dùng cho phép nối nút ghim: chụp GameState ngay lúc bấm, nhập tên/ghi chú, savedPositionsStore lưu localStorage theo owner; mở thế dùng GamePage replay một snapshot, không đổi gameStore. Board mini dùng Board thật, tỷ lệ1134/1296, chỉ đọc.

- 2026-10-14: Người dùng mở phạm vi footer Lịch sử và danh sách để bỏ thanh chú thích Cờ tướng/Cờ úp; dùng chiều cao được giải phóng cho thêm hàng lịch sử. Đã chơi hiển thị 8 hàng và cuộn khi vượt; dữ liệu Đã chơi vẫn minh họa. Avatar và các khu vực còn lại tiếp tục khóa.

- 2026-10-14: Icon Lưu thế cờ trong GameTools đổi thành cây ghim vàng; giữ vị trí giữa Lưu ván và Bạn bè.

- 2026-10-14: Tiện ích bàn cờ bỏ Camera; thứ tự trái sang phải Lưu ván/Lưu thế cờ/Bạn bè/Âm thanh/Toàn màn hình. Lưu ván giữ icon đĩa mềm và điều kiện kết thúc; Lưu thế dùng icon bàn cờ, hiện thông báo đang phát triển vì chưa nối dữ liệu Thế cờ.

- 2026-10-14: Nút Lưu giữ ván kết thúc gần nhất mà client đã nhận. Vào giữa ván chưa có kết quả thì khóa; đã xem hết ván 1 có thể lưu ván 1 trong ván 2; hết ván 2 thay mục tiêu bằng ván 2. useMatchSaving không nhận archive cũ lúc game đang playing, vẫn giữ lastMatch đã nhận trước đó.

- 2026-10-14: Đã lưu/Ván đấu phải render người dùng sở hữu danh sách bên trái ở cả phe Đỏ và Đen; không chỉ tính leftSide rồi vẫn truyền redName cố định. Biểu tượng phe/kết quả đi cùng người. Replay đặt phe đó dưới bàn, độc lập lượt đầu. Regression DOM hai phe đã kiểm tra thứ tự nút hồ sơ.

- 2026-10-14: Cân màu gỗ quân Đen theo quân Đỏ bằng gamma RGB riêng trong SVG filter, mask theo độ sáng giữ chữ tối. Cùng filter cho bàn/khay/drag/animation, không sửa geometry hoặc bản A. Thay cân màu brightness nhẹ trước đó ở render.

- 2026-10-14: Căn mặt tròn bên trong quân Đỏ sang phải khoảng2% chiều rộng bằng SVG displacement trong ChessPiece, giữ nguyên thân/viền ngoài và tọa độ quân. Áp dụng chung bàn/khay/drag; hiệu ứng kết thúc giữ filter mặt. Không thay file ảnh hoặc mốc A.

- 2026-10-14: Mốc hoàn tác A là .checkpoints/A-2026-10-14.zip (879 tệp), tạo trước khi đồng bộ quân. Manifest/hash tại .checkpoints/A.json. Khi người dùng yêu cầu về A, phục hồi snapshot này rồi build lại; giữ dependencies/binary ignored hiện có. Không nhầm bản sau đồng bộ với A.

- 2026-10-14: Quân mở Đỏ/Đen dùng chung ChessPiece object-fill trong khung108×112, không offset riêng Đỏ4px. Cân tông gỗ Đen bằng pieceColorFilter brightness0.985/saturate1.015 dùng chung trong render/animation/nhận diện. Khay, bàn, quân kéo và ảnh chụp DOM đồng bộ theo component.

- 2026-10-13: Khay xếp thế bỏ nhãn Quân Đen/Quân Đỏ; mỗi màu dùng nhãn1/2/3/4/5/Q/W theo thứ tự Xe/Mã/Tượng/Sĩ/Tướng/Pháo/Tốt, trái sang phải rồi hàng sau. ↑ chọn khay Đen, ↓ chọn khay Đỏ và viền vàng; bấm vào khay chọn màu và giữ lựa chọn; rê chuột chỉ hover, không đổi màu đang chọn; khay đang chọn dùng nền nâu sáng, viền vàng/outline và glow chung để nổi bật. Bấm số trên quân hoặc phím1–5/Q/W chọn quân của khay đang chọn. Quân hết vẫn khóa; không bắt phím trong ô nhập/dialog.

- 2026-10-13: Vị trí tùy chỉnh: Xóa quân xóa toàn bộ quân thường, giữ Tướng đang có trên bàn và bỏ chọn quân. Không kiểm tra Tướng đối mặt trong thao tác bấm/kéo xếp thế; Đấu ngay và server vẫn báo lỗi, chặn thế Tướng đối mặt.

- 2026-10-13: Đấu ngay chuyển xuống dưới khay quân, gap10px, căn giữa chiều dọc cả cụm khay+nút; dùng ảnh nút đỏ/kiếm/hai rồng theo mẫu, bỏ nút giữa bàn trong trình chỉnh thế.

- 2026-10-13: Vị trí tùy chỉnh: đặt/di chuyển sai vị trí báo lỗi rồi bỏ chọn quân. Kéo trực tiếp từ khay hoặc từ bàn mà không cần bấm chọn; thả trong bàn đặt vào giao điểm gần nhất theo hướng bàn và luật hiện hành, thả quân trên bàn ra ngoài thì xóa; thả quân khay ngoài bàn không thêm quân. Pointer cancel không xóa; click sau kéo bị chặn. Chỉ áp dụng trình chỉnh thế.

- 2026-10-13: Bỏ nhãn hiện Đổi bên; khay quân desktop căn giữa chiều dọc vùng từ dưới hàng tiện ích đến mép dưới. Tạo bàn cờ từ ảnh chỉ hiện Đang trong quá trình phát triển, chưa mở chọn ảnh.

- 2026-10-13: Nút Lưu Vị trí tùy chỉnh dùng đĩa mềm vàng theo mẫu mới: thân vàng đặc bo nhẹ, khe trên có chốt vàng, ô dưới kín có thanh ngang lõm; không chữ, icon32px cùng cỡ tiện ích.

- 2026-10-13 — Quân trong khay Vị trí tùy chỉnh không có drop-shadow; truyền shadow=false cho ChessPiece. Quân trên bàn giữ bóng hiện hành.

- 2026-10-13 — Vị trí tùy chỉnh giới hạn mỗi bên1 Tướng/2 Sĩ/2 Tượng/2 Mã/2 Xe/2 Pháo/5 Tốt. Quân dùng hết bị mờ và khóa bấm; tự bỏ chọn sau khi đặt quân cuối. Chặn đặt/di chuyển vào điểm Tướng/Sĩ/Tượng/Tốt không thể tới ; hai Tướng đối mặt chỉ bị chặn khi Đấu ngay. Tượng chỉ đặt tại7 điểm có thể tới bên phần sân mình. Xóa quân vẫn được phép để tạo thế dang dở; kiểm tra Đấu ngay/server FEN vẫn là lớp xác thực cuối.

- 2026-10-13 — Vị trí tùy chỉnh mở từ màn máy, screen position, dùng Board/PlayerCard cũ; không đối thủ/chat/view/clock/vòng xanh/thao tác thi đấu. Khay chuyển bên phải, gap ngang10px với bàn/viền trong, đủ14 loại quân không cuộn khay. Chỉ giữ Xóa quân (thùng rác) và Cài lại (mũi tên khôi phục). Header Lưu/Tạo từ ảnh dùng icon đĩa mềm/ảnh; Đổi bên thay mã phòng. Nút Đấu ngay đỏ/hai rồng nằm dưới khay, gap10px; không hiện nút giữa bàn. Lưu FEN; Tạo từ ảnh hiện chỉ báo đang phát triển, giữ mã nhận diện để phát triển tiếp. Đấu ngay kiểm tra thế rồi khởi tạo Pikafish từ FEN, giữ cấp; server kiểm tra FEN+lịch sử, chơi lại dùng thế gốc. Chi tiết docs/CUSTOM-POSITION.md.

- 2026-10-13 — Banner Luyện cờ nới thêm30px mỗi bên:1208→1268px, tổng60px mỗi bên so với ban đầu; giữ tâm/aspect, fit chiều cao878px.

- 2026-10-13 — Banner Luyện cờ tăng rộng1148→1208px theo hệ thiết kế màn máy (thêm30px mỗi bên), giữ tâm và aspect2132/348.

- 2026-10-13 — Banner Cờ thế màn Chơi với máy thay bằng ảnh Luyện cờ63e5f151, runtime computer-setup/training-banner.png crop2132×348. Giữ tỷ lệ, width thiết kế1148px; fit layout theo chiều cao858px để không tràn. Nguồn/crop tại training-banner-source.md; chưa triển khai chức năng luyện cờ.

- 2026-10-13 — Nút giữa bàn sau ván máy trở lại nhãn Sẵn sàng như bình thường, bỏ ngoại lệ Đấu lại. Giữ tự bắt đầu khi mới vào bàn máy.

- 2026-10-13 — Đính chính ảnh nút tròn: đó là Đi lại/Hoàn nước, không phải nút Sẵn sàng giữa bàn. Đấu máy ẩn toàn bộ MatchActions (Cầu hòa/Xin thua/Đi lại); khôi phục Sẵn sàng sau ván, giữ tự bắt đầu Pikafish.

- 2026-10-13 — Ván mode computer cô lập với phòng online: không tạo/đăng phòng server, không chặn mời chơi bằng localBusy. challengeProfile chỉ báo localBusy cho mode local đang playing; online do server room kiểm tra. Đồng ý lời mời reset ván local/hủy máy rồi enterOnline theo luồng challenge hiện có, không đưa ai vào ván máy. Ẩn Cầu hòa/Xin thua/Đi lại trong máy. Các nút online/local hai người không đổi.

- 2026-10-13 — Đấu máy (mode computer, gồm Cờ Úp/demo) không hiển thị MatchIntro ai đấu với ai hoặc âm thanh intro gọi từ start, đồng hồ và vòng/phủ xanh avatar. GamePage truyền showClock=false vào cả2 PlayerCard và tắt useMatchIntro. Chỉ ẩn hiển thị, giữ luật clock/khai cuộc1300ms; online/local hai người vẫn như cũ.

- 2026-10-13 — Header Chơi với máy lấy geometry avatar/tên của Chọn Bàn: avatar45px desktop/33px compact, hạ1px; cùng AvatarPortrait/AvatarFrameOverlay, bỏ mask/shadow riêng. Cụm gap12px; tên font-heading24px/18px, leading-none, màu#eee4ce, max-width192px. Chỉ đổi màn máy theo yêu cầu, Chọn Bàn giữ nguyên.

- 2026-10-13 — Người dùng mở riêng kích thước avatar header Chơi với máy: tăng40→44px desktop,36→40px compact; frame vẫn scale theo component chung. Tên dùng font-heading (font chính). Các avatar khác tiếp tục khóa.

- 2026-10-13 — Chơi với máy chỉ chọn Pikafish/cấp độ, bỏ dropdown Máy cơ bản trên desktop/compact. Khi vào bàn Pikafish ready tự gọi luồng start hiện có (giữ intro/clock1300ms), ẩn nút Sẵn sàng ban đầu; kết thúc dùng Đấu lại. Header dùng AvatarPortrait/AvatarFrameOverlay và tên session, giữ geometry avatar; cụm tiện ích gap8px theo Home. Máy cơ bản ở Chơi nhanh/Cờ Úp không đổi.

- 2026-10-13 — Sai số Pikafish qua MultiPV và PIKAFISH_MOVE_WEIGHTS (pikafishCandidates.ts): cấp1 top5 [20,25,25,20,10], giảm sai số tới cấp10 bestmove100%. Cấp1–3 đổi sang depth1/2/3 với deadline80/120/180ms vì64 nodes chỉ trả2 PV ở engine thật. Lấy cùng vòng depth, lọc illegal/lặp, thua ngay1 nước, mate âm khi tránh được và chênh300cp; chuẩn hóa trọng số ứng viên còn an toàn, không random ngoài PV. Cấp4–10 giữ search budget. Không khẳng định tránh được chiến thuật sâu.

- 2026-10-13 — 10 cấp Pikafish dùng profile server tại pikafishLevels.ts; binary2026-09-06 không có Skill Level/UCI_Elo (uci-options.txt). Cấp1–9 tăng nodes64→400000, cấp10 movetime2500 không cap depth/nodes; mỗi go chỉ một limit chính. Threads/Hash/EvalFile chỉ set khi handshake quảng bá, clamp min/max và CPU. Deadline stop theo profile/clock, giữ process async/hủy/timeout15s. Chọn cấp lưu session ngay, mỗi search gửi level; chưa benchmark ELO.

- 2026-10-13 — Sau khi bỏ tiêu đề Chơi với máy, giữ Cờ thế tại vị trí cũ: bảng giữa cao625px (tăng82px), giãn biển tên/cấp độ/chọn bên/nút hành động theo chiều dọc; banner cách bảng13px. Footer nằm trong flow dưới banner, không đo top tuyệt đối gây đè cấp độ.

- 2026-10-13 — Màn Chơi với máy bỏ tiêu đề lớn ở desktop/compact; nội dung desktop dồn lên bằng chiều cao tiêu đề cũ 82px theo scale, giữ kích thước hiện hành. Nhãn cấp độ dùng font-heading cho Cấp, font-number lining/tabular cho số, căn chung baseline.

- 2026-10-13 — Căn tâm mặt tròn quân Đỏ của bộ codo-coden-v2: ChessPiece dịch ngang sang phải 4px nhân scale bàn (từ 2px), dùng chung mọi màn qua Board; quân Đen và mặt úp giữ nguyên.


- 2026-10-13 — Bảng Tạo bàn dùng khung72f80581 giống khung chọn tỉnh/thành, gồm nền/tiêu đề/X; các ô thời gian và nút Hủy/Tạo bàn dùng ảnh cắt từ skin v2 cũ để giữ chức năng. CreateRoomForm dùng chung ở Chọn Bàn/LobbyDialog; kích thước ngang tối đa680px, aspect1369/953; tọa độ điều khiển đã căn lại theo khung mới. Nguồn và crop ghi trong create-room/source.md.

- 2026-10-13 — Tiêu đề khung chọn tỉnh/thành tăng nhẹ: 34px desktop/22px compact, font-heading; giữ nguyên tâm, vùng tiêu đề và khung.

- 2026-10-13 — Đã hoàn tác lần thử thu nhỏ bảng Tạo bàn; kích thước hiện hành trở lại max-width680px/73dvh, aspect1589/983.

- 2026-10-13 — Người trong sảnh Chọn Bàn được tính theo tỉnh/thành đang chọn, không cố định theo địa chỉ hồ sơ. Mở màn mặc định địa chỉ hồ sơ; đổi nơi gửi lobby:presence mới để server giảm nơi cũ/tăng nơi mới, không đổi hồ sơ và không cộng giả phía UI. Đổi nơi không gửi null trung gian; reconnect công bố nơi đang chọn, rời màn mới gỡ presence.

- 2026-10-13 — Thẻ chọn tỉnh/thành: icon dùng ô rộng26cqw/cao100% thẻ, object-contain giữ tỷ lệ, hình cao được phép chạm viền trên/dưới. Tên font-heading min(36px,7cqw); số liệu font-number min(28px,5.5cqw). Giữ4 dòng/gap dọc8px và artwork hiện tại.

- 2026-10-13 — Sửa theo phản hồi: thẻ tỉnh/thành phải giãn đầy chiều cao mỗi hàng, gap dọc8px, giữ4 dòng trong viewport. Cho phép artwork thẻ giãn theo ô trong phạm vi này theo yêu cầu; bỏ căn giữa thẻ thấp gây khoảng trống lớn. Gap ngang desktop12px giữ nguyên, compact8px.

- 2026-10-13 — Tiện ích góc phải màn đấu: Chụp hình → Bạn bè → Âm thanh → Toàn màn hình. Nút Bạn bè dùng HomeIcon và FriendsDialog chung, mở hồ sơ/nhắn tin hiện có, Mời chơi dùng challenge chung. Giữ mép phải, gap và geometry avatar; áp dụng GamePage cho cả online/local/Cờ Úp.

- 2026-10-13 — Khung chọn tỉnh/thành chỉ hiển thị4 dòng trong viewport danh sách: desktop2 cột, compact1 cột; phần còn lại cuộn. Grid chia chiều cao thành4 hàng trừ gap, thẻ giữ aspect gốc và căn giữa hàng, không kéo méo artwork.

- 2026-10-13 — Chốt thay riêng khung chọn tỉnh/thành về ảnh72f80581, crop1369×953; thẻ giữ ảnh e05c67be1066×187. Khung có sẵn X nên desktop chỉ đặt hit area, không chồng SVG. Nguồn/script tại province-picker-source.md.

- 2026-10-13 — Mời chơi Bạn bè dùng chung challenge với So tài hồ sơ. Khi đồng ý: người gửi chưa có phòng online → tạo phòng mới cho cả hai, kể cả người nhận đang ở phòng khác; người gửi có phòng → đưa người nhận tới phòng người gửi, không tạo phòng mới. Xác định phòng lúc đồng ý; cập nhật snapshot phòng cũ/phòng đích và socket membership. Giữ chặn đang đấu/đã Sẵn sàng, không chiếm ghế của người khác. Danh sách bạn bè vẫn mẫu, backend lời mời cần người nhận online thật. 8 test service/socket pass; không tuyên bố backend quan hệ bạn bè đã tích hợp.

- 2026-10-13 — Header Chọn Bàn: bấm avatar mở hồ sơ bản thân bằng ProfileDialog hiện có; lưu tên đang nhập hợp lệ trước khi mở. Người dùng cho phép hạ riêng avatar header xuống1px, giữ kích thước và khung avatar; các nơi khác vẫn khóa. Tiện ích từ trái qua phải: Cúp, Bạn bè, Loa; giữ gap10px và chức năng hiện có.

- 2026-10-13 — Thay tiếp khung/thẻ chọn tỉnh thành bằng hai hình trong ảnh e05c67be: khung trên crop1360×720, thẻ dưới1066×187. Giữ tỷ lệ, chữ/icon co theo chiều rộng thẻ để vừa thẻ thấp; nút đóng SVG vì nguồn mới không có X. Nguồn và script tại province-picker-source.md.

- 2026-10-13 — Ghép nhanh chỉ chọn phòng có đúng1 người ngồi, chưa đấu; viewers không tính, không ghép phòng0 hoặc2 người. Chọn Bàn phải khớp thời lượng dropdown và chỉ mở Tạo bàn nếu không có phòng phù hợp. Home giữ mọi thời lượng và fallback máy.

- 2026-10-13 — Thay khung chọn tỉnh/thành bằng ảnh72f80581 và thẻ bằng ảnh971d28dd theo yêu cầu. Runtime crop sát alpha1369×953 và2069×462, giữ tỷ lệ; nguồn/script tại province-picker-source.md. Giữ danh sách, tên/icon và thao tác chọn hiện hành.

- 2026-10-13 — Nút X Tạo bàn neo theo tâm vòng tròn của skin v2: (1499,105) trên ảnh1589×983, tương ứng94.34%/10.68%; SVG vuông và căn giữa, tránh lệch do tọa độ hit area cũ.

- 2026-10-13 — Chơi nhanh trong Chọn Bàn lấy danh sách phòng mới và vào thẳng phòng còn ghế, chưa đấu, đúng thời lượng dropdown; tìm trên mọi tỉnh/thành. Chỉ mở Tạo bàn nếu không có phòng phù hợp. Quy tắc này thay phần “mọi thời lượng” của ghi chú cũ cho Chọn Bàn; Home giữ hành vi riêng. Bàn mẫu không phải phòng online để ghép nhanh.

- 2026-10-10 — Không có ai xếp hàng thì người thua giữ ghế, kể cả có khán giả chưa xếp hàng. Sau ván, người mới xếp hàng được thay người thua nếu chưa có ai Sẵn sàng đấu tiếp; giữ mốc tối thiểu 3 giây từ kết quả, quá mốc thì chuyển ngay. Một trong hai người đã Sẵn sàng thì đóng quyền thay ghế của ván cũ, người mới chỉ vào hàng chờ ván tiếp theo. Kiểm chứng: 6 test liên quan pass.

- 2026-10-10 — Trong demo hai máy, hàng chờ là hàng chờ cục bộ: nếu khán giả xếp trước khi demo kết thúc ở nước thứ3, người đó thay Máy Đen và tiếp tục đấu Máy Đỏ; nếu không ai xếp thì Đỏ thắng như demo. Đây không phải hàng chờ phòng online và không tạo/join server room.

- 2026-10-10 — Xem thử tạm thời: bấm bàn mẫu mở ván local xem hai máy cơ bản tự đi luân phiên theo thời gian của bàn; sau3 nửa-nước demo kết thúc với Máy · Đỏ thắng do Máy · Đen xin thua; tên Máy · Đỏ/Máy · Đen. Chặn người xem đi quân; không tiêu năng lượng hoặc tạo phòng server. Cờ computerDemo được xóa khi rời/vào online/local; useComputer hủy timer khi rời hoặc đổi ván.

- 2026-10-10 — Thẻ bàn dùng con trỏ pointer khi rê chuột, kể cả bàn mẫu xem thử; preview vẫn không gọi join/API online.

- 2026-10-10 — Thẻ phòng trong Chọn Bàn bấm vào sẽ vào/xem đúng phòng thật qua `onJoin(room.id)`; bàn mẫu bấm mở demo cục bộ hai máy, không gọi API. Sắp xếp giảm dần theo tổng người (`players + viewerCount`), tính cả người chơi lẫn khán giả; khi bằng nhau giữ thứ tự tạo từ `RoomRepository` (Map insertion order), phòng cũ đứng trước. Icon mắt hiển thị số tổng ngoài artwork, cách bàn5px; icon ghế/tên chỉ tính người chơi.

- 2026-10-10 — RoomTableGrid dùng `scrollbar-gutter: stable` để dành sẵn chỗ cho thanh cuộn sát mép trong khung; thanh chỉ hiện khi danh sách vượt khung (`overflow-y-auto`), nhờ đó lưới không dịch ngang khi bắt đầu/cuộn hết.

- 2026-10-10 — RoomTableGrid: vùng hình cao78% thẻ; bàn lấy chiều cao thực, giữ aspect934/922. Hai người cao45% bàn, width:auto và neo ngoài mép bàn đúng3px. Không dùng ô ảnh rộng/object-contain gây khoảng hở giả; bàn luôn căn giữa.

- 2026-10-10 — Quy tắc đấu luân phiên: khi ván kết thúc có người thắng và hàng chờ, bất kể ai tạo phòng, người thua xuống cuối hàng và người đầu tiên đang xếp hàng lên bàn ngay. Người xem chưa xếp hàng không được đưa lên; giữ nguyên thứ tự những người còn lại.

- 2026-10-10 — Nếu người đang ngồi rời phòng, xử thua nếu ván đang diễn ra và lấp ghế vừa trống bằng người đầu tiên đang xếp hàng. Người xem không xếp hàng không được tự đưa lên; các người chờ còn lại giữ nguyên thứ tự.

- 2026-10-10 — Phòng 0 người ngồi nhưng còn viewers vẫn hiển thị trong tab “Tất cả”; viewerCount chỉ giữ phòng trên lưới, không cộng vào players, icon ghế hay tên. Chỉ ẩn phòng không có cả players lẫn viewers. Tab “Còn trống” vẫn chỉ hiện đúng1 người chơi. Preview chỉ hiển thị khi API không có phòng thật.

- 2026-10-10 — Tab “Còn trống” ở Chọn Bàn chỉ hiện phòng chưa bắt đầu có đúng1 người đang ngồi; viewers không tính. Giữ điều kiện này cả với preview để tab không hiển thị bàn mẫu đủ2 người.

- 2026-10-10 — Ẩn bàn trống (0 người chơi) khỏi lưới Chọn Bàn; chỉ các ghế chơi hiện tại quyết định. Bàn có1 người vẫn hiện; viewers không tính. Danh sách mẫu cũng chỉ dùng trạng thái1/2 người.

- 2026-10-10 — Nút đóng Tạo bàn: dấu X là SVG đối xứng ở tâm nút, không glyph văn bản để tránh lệch quang học; vùng nút và tọa độ giữ nguyên.

- 2026-10-10 — Thẻ bàn hiển thị thời lượng + tên người chơi ở ghế đầu tiên từ `RoomSummary.playerNames`; không hiện tên nội bộ “Bàn 1”. Danh sách tên lấy theo thứ tự `room.players` ở server, chỉ người đang ngồi, không gồm viewers. Khi người đầu rời, người còn lại tự lên đầu; người vào sau xếp sau. Hình bàn/người thu nhỏ theo yêu cầu.

- 2026-10-10 — Cập nhật lưới bàn xem thử: đủ12 bàn thường, bỏ ô Tạo bàn trong lưới vì có nút trên header. Bỏ dòng phụ Mẫu/số người. Nhãn thời gian/tên bàn cùng font-heading và cỡ20px desktop/14px compact như chữ Tạo bàn trong lưới trước đó; cả số dùng font chữ theo yêu cầu này. Bàn mẫu vẫn không gọi API.

- 2026-10-10 — Xem thử tạm thời theo yêu cầu: khi danh sách bàn trống và tải xong, RoomTableGrid hiện22 bàn mẫu để kiểm tra cuộn; hai bàn đầu luôn đủ2 người để duyệt hình hai bên. Mẫu có1/2 người, không gọi join/API online và không cộng bộ đếm bàn thật; có phòng thật sẽ hiển thị dữ liệu thật. Gỡ dữ liệu mẫu khi người dùng kết thúc xem thử.

- 2026-10-10 — Danh sách Chọn Bàn dùng hai artwork mới (bàn gỗ và người chơi nhìn từ trên), nguồn/crop tại table-artwork-source.md. Lưới4 cột×3 hàng nhìn thấy, mọi ô là bàn thường; phòng từ API, quá12 ô cuộn tiếp. Không dựng phòng hoặc tiền cược giả; hiển thị người chơi hai bên theo số ghế. UI tại RoomTableGrid.

- 2026-10-10 — Thanh cuộn dọc của RoomTableGrid hiện thumb xanh ngọc #22c1a8 mảnh, alpha30% (hover45%); track trong suốt, không thêm nền bao quanh. Cuộn khi danh sách vượt khung.

- 2026-10-10 — Header Chọn Bàn: Bạn bè mở cùng FriendsDialog như Home, Thành tích mở cùng RankingDialog, âm thanh chia sẻ useHomeMusic nên trạng thái và playback luôn đồng bộ.

- 2026-10-10 — Với preview bàn mẫu, dùng trạng thái tải ban đầu thay vì `isFetching` của polling nền. Refetch định kỳ không được gỡ rồi dựng lại 22 node preview vì điều đó làm thanh cuộn chớp và reset vị trí về đầu.

- 2026-10-10 — Header Chọn Bàn: avatar người chơi45px desktop/33px compact; tên24px/18px; avatar và tên căn giữa dọc trong header. Ngoại lệ xem thử áp dụng avatar đã khóa chỉ trong header Chọn Bàn, không đổi avatar trong game/profile.

- 2026-10-10 — Menu Chơi nhanh trong Chọn Bàn không có lựa chọn “Tất cả”; giữ các mốc3/5/10/15/30 và mặc định10 phút.

- 2026-10-10 — Cụm nút tiện ích trong Chọn Bàn dùng cùng bố cục với Home, riêng khoảng cách giữa nút là10px theo yêu cầu (Home8px); giữ `homeUtilityButton`/HomeIcon dùng chung. Mép phải cụm giữ nguyên khi tăng gap.

- 2026-10-10 — Nhãn thời lượng trên nút Chơi nhanh: số dùng font-number, chữ phút/Tất cả dùng font-heading; cùng cỡ22px desktop/18px compact như Chơi nhanh và Tạo bàn.

- 2026-10-10 — Dropdown thời gian Chơi nhanh phải đóng khi bấm/chạm ngoài cụm nút và menu; chọn mốc đóng menu như hiện hành. Listener chỉ tồn tại khi mở và được cleanup.

- 2026-10-10 — Thẻ địa chỉ hiện tại Chọn Bàn bỏ dấu mũi tên cạnh tên; tên22px desktop/18px compact, giữ font-heading và căn trái. Cả thẻ vẫn bấm mở danh sách tỉnh/thành.

- 2026-10-10 — Thẻ khu vực hiện tại trong Chọn Bàn căn trái tên và số liệu. Bỏ hình nhà cố định; ảnh dùng roomProvinceIcon với cùng selection.province như tên: ban đầu theo địa chỉ hồ sơ, chọn khu vực khác đổi cả hình/tên. Không sửa địa chỉ hồ sơ khi duyệt khu vực.

- 2026-10-10 — Chơi nhanh ở Home và Chọn Bàn lấy danh sách mới, chọn ngẫu nhiên bàn còn chỗ/chưa chơi trên mọi tỉnh/thành và thời lượng, không lọc khu vực/thời gian hoặc ưu tiên bàn đầu tiên. Chọn Bàn có dropdown thời gian: mặc định10 phút, chỉ gồm3/5/10/15/30, không có lựa chọn Tất cả, vẫn ngẫu nhiên trên mọi tỉnh/thành. Hết bàn: giữ fallback Home sang máy cơ bản, Chọn Bàn mở Tạo bàn. Tạo bàn dùng tỉnh/thành đang duyệt; khi mới mở Chọn Bàn mặc định theo địa chỉ hồ sơ. Số bàn tính theo province của phòng thật, không tăng bộ đếm giả.

- 2026-10-10 — Xem thử icon trong thẻ chọn tỉnh/thành: vùng ảnh104px desktop/80px compact; tên tỉnh/thành28px desktop/24px compact, dùng font chính theo tên người chơi: font-heading theo yêu cầu mới; giữ tỷ lệ ảnh. Ẩn thanh cuộn trực quan của danh sách tỉnh/thành nhưng vẫn giữ overflow-y-auto để xem đủ34 tỉnh/thành.

- 2026-10-10 — Icon tỉnh/thành: bộ 34 tỉnh/thành và thứ tự chính xác nằm trong `src/assets/room-selection/province-icons/manifest.json`; bảng asset 6 cột, hai ô cuối trống. File riêng đặt số thứ tự và tên tỉnh/thành, không dùng tên cũ/không tự thêm tỉnh. Chỉ hình biểu tượng hoạt hình đồng nhất, PNG alpha thật, không chữ/thẻ/khung/nền, crop sát. Người dùng yêu cầu tạo lại bộ mới vì ảnh tải lên 36 hình không khớp danh sách; không gán tên theo vị trí ảnh nguồn sai. Danh sách lựa chọn thực tế vẫn lấy API, không thay bằng dữ liệu minh họa.

- 2026-10-10 — Xem thử bộ chọn tỉnh/thành trong Chọn Bàn: dùng nguồn 8ee5ac91 làm khung ngoài, f6d81a33 làm thẻ tỉnh/thành. Runtime crop sát tại room-selection/province-picker-frame.png và province-card.png, giữ tỷ lệ; tiêu đề, nút đóng và danh sách API/cuộn là điều khiển HTML. Tiêu đề dùng font chính theo tên người chơi: font-heading, cỡ30px desktop/20px compact và không hiển thị tổng số tỉnh/thành bên cạnh. Nguồn/crop ghi trong province-picker-source.md.

- 2026-10-09 — Thời lượng Chơi nhanh và cấu hình Tạo bàn là hai state độc lập. Mở Tạo bàn mặc định 10 phút mỗi bên và 60 giây mỗi nước; thay đổi lựa chọn ở một nơi không được làm đổi nơi kia.

- 2026-10-10 — Bộ chọn khu vực Chọn Bàn phải tải toàn bộ tỉnh/thành hiện hành từ cùng API `/api/v2/?depth=1` dùng trong bộ chọn địa chỉ hồ sơ, không hard-code danh sách rút gọn. Thẻ hiển thị số bàn theo province của phòng và số người theo presence/province hồ sơ; tăng cỡ tên và số liệu theo yêu cầu mới. Chọn khu vực chỉ đổi phạm vi duyệt, không sửa địa chỉ hồ sơ.

- 2026-10-09 — Hai nút đáy trong Tạo bàn dùng artwork nút nền; hover tăng brightness và saturation trên vùng hit-area để nền nút sáng rõ hơn, không đổi opacity nền.

- 2026-10-09 — Bảng Tạo bàn đã duyệt: khi thu nhỏ hai nút đáy, thu cả artwork trên skin lẫn vùng bấm/chữ overlay theo bounding box mới; giữ khoảng trống và tâm nút, không scale cả panel.

- 2026-10-09 — Bảng Tạo bàn theo mẫu đã được duyệt; thu nhỏ đồng bộ còn tối đa680px ngang/73dvh cao (trước800px/86dvh), giữ tỷ lệ1488:926 và toàn bộ vị trí tương đối.

- 2026-10-09 — Nhạc nền chung dùng file người dùng cung cấp `src/assets/references/uploads/background-music-source.mp4` (runtime `src/assets/audio/background-music.mp4`); hết bài chờ5 giây rồi phát lại. Một player xuyên màn hình, nút nhạc đồng bộ; tắt nhạc hủy lịch phát lại. Mặc định bật; trình duyệt có thể cần thao tác để cho phép phát.

- 2026-10-09 — Bộ đếm năng lượng của EnergyNotice nằm trong góc trên trái khung thông báo, không neo vào viewport. Có thể tăng nhẹ kích thước khung theo yêu cầu hiện tại; giữ bộ đếm ở góc và nội dung cân bằng bên trong. Mỗi lần mở bảng, dropdown hồi năng lượng mở sẵn hướng lên.
- 2026-10-09 — Trong lúc hiệu ứng mở phòng đang chạy, nút Sẵn sàng vẫn thao tác được ngay. Giữ khóa nước đi cho tới khi hiệu ứng kết thúc; không áp dụng trạng thái inert/disabled mở phòng lên hành động Sẵn sàng.

- 2026-10-10 — Xem thử nền khung danh sách Chọn Bàn: #1c0e07 alpha40% (trong suốt60%), nâu đen tối hơn và trong suốt hơn theo yêu cầu mới. Dùng màu đã có trong selectionPalette. Bản A trước thử nghiệm lưu tại `docs/checkpoints/room-selection-A/`, nền #2C1408 alpha65% (trong suốt35%); không ghi đè A. Khi người dùng yêu cầu về A, khôi phục theo snapshot/README. Không dùng blur/backdrop-blur hay opacity cho cả khung. Viền #bd914e, góc #f4d995 và nội dung giữ nét.
- 2026-10-09 — Chọn Bàn bỏ nút Video dưới cùng, chuyển nút Bạn bè lên cụm tiện ích góc trên phải. Hai nút lọc ở dưới cùng; khung giữa giữ khoảng trên8px, chừa24px phía dưới (kéo mép dưới xuống thêm32px theo yêu cầu).

- 2026-10-09 — Chọn Bàn: ô nâu đầu có icon nhà bên trái; bên phải là khu vực đang duyệt (mặc định từ tỉnh/thành hồ sơ), dưới là tổng bàn ở khu vực đó và số kết nối đang ở trang Chọn Bàn có tỉnh/thành hồ sơ tương ứng (bao gồm mình). Không cộng người đang ngồi trong bàn vào bộ đếm này. Server giữ presence trong RAM, bỏ khi rời trang/vào phòng/mất kết nối. Chưa có auth/database nên đếm theo kết nối, chưa gộp nhiều tab của cùng tài khoản.
- 2026-10-09 — Ô địa chỉ Chọn Bàn viết gọn tiền tố “Thành phố ” thành “TP. ” khi hiển thị; tăng nhẹ icon bàn cờ, icon người và số đếm.
- 2026-10-09 — Thẻ địa chỉ Chọn Bàn dùng tên tỉnh20px (compact16), số đếm20px (compact16) và icon đếm22px (compact18), nhỏ hơn nhẹ. Icon kiếm Chơi nhanh36px (compact30), cùng cỡ dấu cộng Tạo bàn; giữ kích thước thẻ.
- 2026-10-09 — Toàn bộ nội dung thẻ địa chỉ có đệm dọc tối thiểu 5px; không thêm padding riêng cho tên thành phố. Chữ Chơi nhanh/thời lượng dùng 18px desktop/16px compact để cân bằng thị giác với chữ serif Tạo bàn 22px/18px.
- 2026-10-09 — Tên tỉnh/thành trong thẻ địa chỉ được hạ thêm 5px so với vị trí căn giữa ban đầu để nhìn rõ khoảng cách mép trên.
- 2026-10-09 — Nút giữa ở Chọn Bàn hiển thị “Tạo bàn” và dấu cộng cạnh nhau, căn giữa cả cụm.
- 2026-10-09 — Mũi tên Chơi nhanh mở bảng xổ dưới nút, chứa các mốc phút theo cột; mỗi thẻ mốc cùng chiều rộng/cao, chọn sẽ cập nhật và đóng bảng.
- 2026-10-09 — Bảng Tạo bàn theo ảnh riêng mới nhất: skin `assets/create-room/dialog-skin.png` có khung vàng, nền cảnh nâu/cây/chùa/mây, tiêu đề cong, ô chọn/nút như mẫu. Chỉ một skin nền, không thêm lớp nâu phủ; chữ và điều khiển HTML/SVG căn theo tỷ lệ skin. Mỗi lần mở mặc định10 phút/60 giây; các mốc mỗi bên3/5/10/15/30 phút, mỗi nước30/60/90/120 giây. Không nhập tên, tên nội bộ “Bàn cờ”. Server xác thực và giữ cấu hình khi reset/rematch; clock/vòng avatar dùng cùng giới hạn.
- 2026-10-09 — Chọn Bàn dùng hai thẻ mới người dùng cung cấp: thẻ nâu cho địa chỉ/Tạo bàn, thẻ đỏ cho Chơi nhanh. Giữ kích thước ô hiện hành; nội dung HTML đặt trên ảnh đầy đủ, không phủ nền nâu khác. Bản runtime được cắt sát, bỏ nhiễu alpha gần trong suốt ngoài thẻ; giữ nguyên ảnh nguồn.
- 2026-10-09 — Ảnh thẻ nâu được render thành img tuyệt đối object-fill phủ kín ô địa chỉ và ô Tạo bàn, nội dung đặt z-index bên trên; giữ chính xác kích thước các ô.
- 2026-10-09 — Thẻ Chọn Bàn cao 72px desktop/64px compact; bỏ border trong suốt 10px cũ vì nó thu nhỏ vùng ảnh nền và làm nội dung vượt viền. Chữ/icon đặt trực tiếp trên ảnh thẻ đầy ô, không có lớp phủ riêng.
- 2026-10-09 — Icon nhà Chọn Bàn dùng bản mới nền alpha trong suốt, crop sát; không dùng ảnh nhà cũ có nền nâu hình chữ nhật. Tăng chữ địa chỉ, số đếm và nhãn Tạo bàn/Chơi nhanh theo yêu cầu.
- 2026-10-09 — Hình trạng thái danh sách bàn trống dùng ảnh bàn mới `references/uploads/empty-board-source.png`, bản runtime crop sát; hiển thị màu gốc không mix-blend-screen.
- 2026-10-09 — Năng lượng chỉ ảnh hưởng online: mỗi ván online bắt đầu trừ 1 cho mỗi người chơi, người xem không trừ. Hết năng lượng chặn Sẵn sàng/xếp hàng, tạo/vào phòng chưa chơi và ghép nhanh vào phòng online; vẫn được vào phòng đang chơi để xem. Home, local và đấu máy/Cờ Úp luôn chơi được, không trừ năng lượng. Ngoại lệ xem thử tạm thời: máy cơ bản ở Cờ Tướng và Cờ Úp dùng luật chặn/trừ như online cho đến khi người dùng kết thúc thử nghiệm; lựa chọn máy khác được miễn. Cảnh báo riêng giữa màn hình trên client thao tác. Hồi 1 điểm mỗi7 phút, tối đa5. Video chưa tích hợp; năng lượng chỉ lưu trong session. EnergyNotice đặt bộ đếm năng lượng ở góc trên trái, dropdown thời gian mở sẵn hướng lên; click trong khung thu dropdown, click ngoài khung đóng bảng, Bỏ qua đóng bảng.
- ENERGY-UI-01 (2026-10-09): Khi chỉnh màu nút Bỏ qua trong EnergyNotice, không kế thừa `lobbyButton` vì class đó có nền vàng dùng chung. Dùng `buttonInteraction` và khai báo nền nâu trực tiếp; hover sáng hơn. Kiểm tra màu thực tế trong CSS đã build, không chỉ thấy class màu nâu trong JSX.

Cập nhật: 2026-10-06. File này lưu các quyết định người dùng đã chốt và bài học từ lỗi trong quá trình sửa project. Lịch sử công việc nằm ở `PROGRESS.md`; quy tắc đang có hiệu lực nằm ở đây và các tài liệu chuyên biệt được dẫn bên dưới.

## Cách sử dụng bắt buộc

1. Trước khi sửa project, đọc file này và tài liệu chuyên biệt của phần đang sửa. Không dựa riêng vào lịch sử chat hoặc trí nhớ.
2. Khi người dùng nói “lưu quy tắc”, “quy tắc tiếp theo”, hoặc chốt một hành vi mặc định, cập nhật quy tắc vào đúng mục và cập nhật tài liệu chuyên biệt nếu có. Ghi ngày, phạm vi và điều người dùng thực sự yêu cầu.
3. Khi người dùng thay đổi một quy tắc, sửa nội dung đang có hiệu lực; ghi quyết định cũ vào lịch sử nếu cần. Không để hai quy tắc trái nhau cùng được trình bày là mặc định.
4. Phân biệt quy tắc lâu dài với xem thử UI. Không biến thử nghiệm thành mặc định cho người chơi mới.
5. Khi gặp lỗi hoặc người dùng báo lỗi, ghi hiện tượng và cách tránh tái diễn. Chỉ ghi nguyên nhân khi đã kiểm tra; nếu chưa xác định thì ghi rõ chưa xác định.
6. Trước khi bàn giao, đối chiếu diff với các quy tắc liên quan và các lỗi đã ghi. Ghi đúng kết quả kiểm chứng; build thành công không đồng nghĩa đã kiểm tra trình duyệt.
7. Nếu yêu cầu mới rõ ràng thay đổi quy tắc cũ, áp dụng yêu cầu mới và cập nhật ghi nhớ. Nếu chưa rõ phạm vi hoặc có phần được khóa theo AGENTS.md, thực hiện theo hướng dẫn tương ứng trong AGENTS.md.
8. Quy tắc đồng bộ người dùng chốt2026-10-05: Mỗi lần sửa một thành phần được dùng ở nhiều nơi, tìm mọi consumer trong project và sửa tương ứng trong cùng nhiệm vụ. Dùng component/token chung để lần sửa sau tự đồng bộ; giữ tỷ lệ/vị trí tương đối theo kích thước vùng chứa. Không duy trì ngoại lệ màn hình nếu người dùng chưa yêu cầu.
9. Quy tắc khóa người dùng chốt2026-10-05: Nếu một thay đổi, kể cả task khác, trực tiếp chạm/cần sửa hoặc có tác động phụ lên phạm vi đã khóa, dừng trước khi sửa phần khóa; nêu rõ phạm vi bị ảnh hưởng và hỏi xin mở khóa cụ thể cho task hiện tại. Vẫn có thể làm phần độc lập không chạm vùng khóa. Chỉ sửa sau khi người dùng xác nhận; sau đó khóa lại. Mỗi xác nhận chỉ áp dụng cho phạm vi/task được nêu, không tự mở khóa cho lần sau. Đọc hoặc kiểm tra mã không phải là quyền sửa.

## Quy tắc đang có hiệu lực

- 2026-11-10: URL công khai chơi máy Cờ Úp là /co-up-ong-hoang; /jieqi-ai giữ tương thích và đổi thanh địa chỉ sang URL mới. Lỗi máy/kết nối chỉ dùng Ông Hoàng hoặc Cờ Úp Ông Hoàng, không đưa nguyên văn lỗi native/worker/network lên UI hoặc API máy. Đồng bộ setup/ván máy/đánh thử/gợi ý/thế tùy chỉnh bằng computerErrorMessage. Không đổi định danh engine/luật/cấp độ. Production cần alias Nginx nội bộ mới tới handler /jieqi-ai đang có COOP/COEP; đã chuẩn bị ops/jieqi-public-route.conf local, chưa áp dụng VPS.

- 2026-11-10: Chủ bật Chặn xếp hàng thì mọi người mới vào luôn xuống View queued=false, bất kể 0/1/2 người trên bàn và kể cả lời mời từ chủ. Không tự thay đổi ghế hiện có; chủ vẫn được Đưa lên bàn qua quản lý. Tắt chặn khôi phục cách vào ghế trống hiện hành. Áp dụng chung trong RoomService.join cho mọi đường vào phòng.

- 2026-11-10: Bàn có quyền quản lý (locked=true hoặc customFen, kể cả Thế cờ riêng không bật khóa) giữ ownerId khi chủ xuống View, gồm tự xuống/đổi ghế/hết năng lượng. Cho người cuối cùng xuống View; phòng còn người xem vẫn tồn tại dù không còn ghế nào có người. Không ép viewer không xếp hàng lên ghế khi người cuối rời; chủ chỉ chuyển khi thực sự rời phòng. Người chủ động Xếp hàng vẫn theo FIFO/đủ năng lượng; phòng trống hoàn toàn vẫn xóa. Bàn thường giữ quy tắc cũ. Quy tắc này thay phần tương ứng trong ghi chú 2026-11-03 và chuyển chủ khi xuống View trước đó. Client áp dụng cả nút và hook gửi lệnh, server kiểm tra độc lập.

### Khóa UI theo khu vực — 2026-10-06

- Khóa phần giao diện hiện hành của **Lịch sử**, **Xếp hạng** và **Bạn bè** theo phạm vi đang hiển thị; giữ nguyên UI đã chốt. Đây là khóa trình bày, không khóa dữ liệu/chức năng nếu không làm đổi UI. Nếu thay đổi khác có thể tác động các vùng này, hỏi mở khóa trước.
- Theo yêu cầu người dùng2026-10-06, toàn bộ UI Danh hiệu đang mở khóa để thử nghiệm: catalog, popup Thông tin danh hiệu và các phần danh hiệu hiển thị trong/ngoài thông tin user. Khung/ảnh danh hiệu cùng cụm sao đi kèm được mở khóa cả ở các consumer khác như Lịch sử, Xếp hạng, Bạn bè, Home, Hồ sơ, Tùy chỉnh và PlayerCard; giữ mở đến khi người dùng khóa lại. Thanh cuộn trực quan trong catalog và các vùng nội dung danh hiệu bị ẩn, overflow-y-auto vẫn giữ cuộn. Avatar người chơi và khung avatar vẫn khóa độc lập; bố cục các màn Lịch sử/Xếp hạng/Bạn bè vẫn khóa.
- Danh sách phạm vi đang khóa/mở khóa được ghi tại `PROGRESS.md` mục “Phạm vi khóa đang có hiệu lực”.

### Avatar

- Quy tắc2026-10-05: mọi nơi hiển thị avatar trong project đều phải có `cursor-pointer`, kể cả avatar không có hành động gắn riêng. Áp dụng tại component dùng chung và avatar độc lập; không thay kích thước/vị trí đã khóa.

### Danh hiệu, Elo và sao

- Người chơi mới bắt đầu ở **1000 Elo**, danh hiệu **Tân Binh**, **1 sao**. Hằng số dùng chung: `DEFAULT_PLAYER_ELO` trong `src/lib/rankProgression.ts`.
- Thứ tự bảy danh hiệu: **Tân Binh → Kỳ Sĩ → Kỳ Thủ → Kỳ Tướng → Đại Sư → Kỳ Vương → Kỳ Thánh**. Đại Sư là bậc5, Kỳ Vương là bậc6.
- Mốc bậc: 1000 / 1300 / 1600 / 1900 / 2200 / 2500 / 2800. Mỗi100 Elo thêm1 sao, mỗi bậc tối đa3 sao. Sao ngừng tăng tại2800; Elo vẫn có thể tăng. Chi tiết chính thức tại `docs/RANK-SYSTEM.md`.
- Chỉ hiển thị sao đã đạt. **Sao luôn xếp từ trái sang phải trong vùng cố định**: sao đầu không dịch khi số sao thay đổi, kể cả chỉ có1 sao. Không căn giữa các sao theo số lượng đang có.
- Vùng đủ3 ô sao dưới danh hiệu được căn giữa rồi dịch phải3px theo anchor106px; chỉ điền các sao đã đạt từ ô trái sang phải. Căn vị trí vùng theo khung không được làm sao1 tự nhảy vào giữa vùng. Hàng3 sao chiếm78% bề rộng khung (3×25% + 2×1.5%).
- Giữ bộ bảy ảnh mới, catalog `src/lib/rankArtwork.ts`. Các cụm avatar/danh hiệu dùng component chung và giữ vị trí, kích thước thống nhất giữa các bậc. Nguồn/crop tại `src/assets/ranks/rank-artwork-v2.md`.
- **Chuẩn sao toàn project2026-10-05 (đã dịch xuống2px theo yêu cầu):** danh hiệu top84.876613px, sao top120.961945px theo avatar106px; khung132.746801×53.085332px. RANK_STAR_LAYOUT: bottomInset14px, clusterOffsetY-6px, offsetX3px, sao25cqw, gap1.5cqw. RANK_TITLE_STARS_STYLE dùng chung, không offset riêng từng màn hình. Không tự đổi vị trí sao để chữa mờ hoặc bố trí lại thẻ.
- **ĐÃ KHÓA — kích thước/vị trí avatar và khung avatar:** giữ theo thông số responsive hiện hành; yêu cầu thay đổi phải hỏi mở khóa. **ĐÃ MỞ KHÓA theo yêu cầu2026-10-06 — hình học danh hiệu và cụm sao đi kèm:** có thể chỉnh kích thước/vị trí trên toàn project để thử nghiệm, nhưng không thay đổi bố cục tổng thể của Lịch sử, Xếp hạng và Bạn bè.
- Mọi nơi dùng `RankTitleBadge`/`AvatarRankBadge` với `RankStars` và ảnh `src/assets/player/rank-star.png`: Home/Hồ sơ/Tùy chỉnh/PlayerCard/Xếp hạng/Bạn bè. Bạn bè đặt sao dưới ảnh danh hiệu bằng cùng component, cụm rộng166px/cao84px trong hàng85px. Không dựng sao bằng ký tự★ hoặc bộ ảnh khác.
- Người dùng đã cho phép thay đổi tọa độ sao Home và yêu cầu áp dụng chuẩn này trên toàn project. Mọi thay đổi tiếp theo phải đồng bộ qua nguồn dùng chung; giữ tỷ lệ, gap và hướng điền sao đã chốt.
- Rendering UI2026-10-05: bắt buộc đọc docs/UI-IMAGE-RENDERING.md trước khi sửa ảnh nhỏ. RankTitleBadge dùng CrispUiImage render ảnh gốc trực tiếp với object-contain; bỏ SharpRankArtwork/Canvas trung gian và lớp GPU translateZ(0)/backface bắt buộc. Giữ contrast1.12 tĩnh đã có, không thêm filter tăng nét hoặc pixelated/optimize-contrast. Home/Hồ sơ/Bạn bè/Lịch sử/Chơi với máy dùng getCrispUiLayout tính CSS cuối cùng thay parent scale. Giữ asset, bố cục và tỷ lệ/tọa độ sao chuẩn.
- Hover homeUtilityButton dùng nền/viền/chữ, không brightness/filter hoặc transition rộng. RankTitleBadge giữ isolation:isolate, không ép GPU layer và không vẽ lại Canvas theo hover. Giữ tọa độ/kích thước hoặc vùng sao. Screenshot tĩnh không chứng minh mọi frame đều hết nhấp nháy.

### Danh hiệu trong hồ sơ — 2026-10-06

- Khi danh hiệu được chọn vượt sức chứa khung, chia thành các trang tối đa9 danh hiệu (3 cột × 3 hàng), giữ thứ tự nhóm/cấp đang có.
- Mở hồ sơ và thay đổi danh sách luôn bắt đầu ở trang đầu. Đứng ở khung đầu1,5 giây, sau đó chạy đều đến mép cuối khung cuối trong tổng cộng6 giây. Dừng ở cuối0,5 giây rồi nhảy ngay về khung đầu và lặp lại; chu kỳ8 giây, không trượt ngược.
- Dừng bộ đếm khi khung không hiện, khi xem chi tiết danh hiệu hoặc rê chuột trong khung. Trang chưa hiện không nhận thao tác/focus; chế độ giảm chuyển động vẫn đổi trang nhưng bỏ hiệu ứng trượt.

### Hồ sơ người khác — 2026-10-06

- Bấm avatar người khác mở hồ sơ với vùng danh hiệu được thay bằng6 nút,3 cột ×2 hàng: Xem thông tin → So tài → Thêm bạn/Xóa bạn → Nhắn tin → Theo dõi → Tặng quà. Nhãn Thêm bạn/Xóa bạn dựa theo danh sách bạn bè hiện có.
- Theo mẫu b99a1e64-d36b-41e2-8824-05088d378d56 ngày2026-10-06:6 nút dùng bộ7 asset mới (1 khung,6 icon) ở src/assets/profile/actions; giữ3 cột ×2 hàng. Icon bên trái, chữ Cormorant đậm bên phải, cỡ10.7cqw theo bề rộng nút (tracking-0.025em để nhãn dài không tràn); icon rộng32% vùng nội dung, lề nội dung trái9%/phải3%, gap1%. Giữ tỷ lệ khung1471:606, icon object-contain, không thêm nền/viền/bóng hoặc hover; lề ngang12px, trên32px/dưới40px và gap ngang12px/dọc20px theo thiết kế responsive. Mẫu chỉ đối chiếu, không import vào UI; nguồn/crop ghi trong assets/profile/actions/source.md. Quy tắc này thay style nút phẳng #875026 trước đó.
- Xem thông tin mở lại vùng danh hiệu; Quay lại trở về6 nút. Mở hồ sơ mới luôn bắt đầu ở6 nút. Hồ sơ của chính mình giữ vùng danh hiệu.
- Luồng dùng chung cho Home, Bạn bè, Xếp hạng, Lịch sử và avatar trong bàn chơi/chat/danh sách phòng. Các hành động xã hội hiện chưa có xử lý; bấm sẽ báo chưa được hỗ trợ, không báo gửi hay thay đổi quan hệ thành công.

### Bạn bè

- Vị trí hiện hành2026-10-05: nền nâu Bạn bè dài thêm50px responsive về bên trái, mép phải giữ nguyên; danh hiệu/sao/tên bậc dịch riêng sang trái50px qua brownContentPosition trong FriendRow chung mọi tab và tiếp tục khóa. Nhóm nút theo yêu cầu mới căn sát mép phải nền nâu, chừa8px responsive, không dịch trái50px cùng danh hiệu nữa. Avatar giữ vị trí cũ; tên/trạng thái người chơi dịch trái8px responsive bằng gap avatar→chữ36px xuống28px trong FriendIdentity dùng chung mọi tab. Kích thước avatar/danh hiệu/sao giữ nguyên.

- Bắt buộc đọc `docs/FRIENDS-UI-RULES.md` trước khi sửa Bạn bè; tài liệu đó giữ thông số chi tiết và quy tắc bộ lọc.
- Tất cả: bạn trong game. Đang online: bạn trong game đang online. Bạn Facebook: bạn Facebook có chơi game và đăng nhập/liên kết Facebook, bao gồm cả online lẫn offline.
- Chỉ có hai trạng thái online/offline; Facebook là thuộc tính riêng. Chấm trạng thái, chữ trạng thái và icon Facebook nằm cùng hàng ngang. Icon Facebook21px, cách chữ6px.
- Luôn xếp online trước offline trong mọi danh sách Bạn bè; giữ thứ tự ổn định trong cùng trạng thái.
- Các hàng dùng chung kích thước avatar, padding, tên/trạng thái, danh hiệu. Danh sách và Thêm bạn dùng cùng vị trí khung; Lời mời đồng bộ kích thước hàng nhưng có thể khác vị trí vùng cuộn.
- Hover chỉ đổi màu/độ sáng; không dịch vị trí, scale hoặc đổi kích thước chữ/nút. Các nút phải có phản hồi khi bấm.
- Danh sách đã gửi lấy từ lời mời mình đã gửi; badge đỏ trên tab Lời mời đếm lời mời đã nhận.

### Asset và phạm vi sửa

- Chốt2026-10-05: Khi yêu cầu chỉ làm rõ ảnh/chữ, giữ nguyên kích thước và vị trí hiện tại; không phóng to danh hiệu, sao, avatar hoặc nới hàng/cột để chữa mờ. Độ tương phản ảnh danh hiệu hiện cố định1.12, không hover/transition; áp dụng chung qua RankTitleBadge.

- Lịch sử2026-10-05: Theo yêu cầu mới, Thắng/Thua dùng hai hình từ sprite PNG 24f07314-e511-454e-9d58-2a50197a5a34.png (2172×724), nằm trong src/assets/history. MatchResultBadge dùng SVG viewBox để hiển thị trực tiếp vùng Thắng(126,177,935,361) và Thua(1115,191,936,353), giữ tỉ lệ gốc, alpha và màu. Ô vẫn82.77551×39px responsive; Thua giữ offset-2px/-2px. Áp dụng cả hai người chơi và Đã chơi/Đã lưu. Quyết định này thay cách dùng text/SVG nền cũ; không thêm chữ HTML chồng lên artwork.

- Xếp hạng2026-10-05: theo yêu cầu giữ kích thước cũ, đã bỏ sizeScale1.2. Avatar84px, danh hiệu khoảng105.2px theo cùng chuẩn Home; hàng138px, padding dọc0/gap8px; khối nhận diện132px, lề trái8px, avatar đặt xuống5px. Cả tab Cờ Tướng/Cờ Úp dùng cùng component. Chỉ cải thiện độ tương phản ảnh cố định1.12 (không transition/hover/filter URL), giữ lớp vẽ ổn định. Không tăng kích thước danh hiệu/sao/avatar/hàng để chữa mờ. Huy hiệu90×90px căn giữa, số hạng4+ neo tâm50%/50%; dữ liệu vẫn minh họa.

- Ảnh mới phải cắt sát bounding box nội dung nhìn thấy; phần ngoài hình trong suốt thật. Giữ tỷ lệ, màu, chữ và chi tiết của ảnh nguồn.
- Dùng component/catalog chung khi nhiều màn hình cần cùng hình và kích thước. Không đổi phần UI đã chốt ngoài phạm vi yêu cầu.
- Sau thay đổi project, chạy build theo AGENTS.md, xác nhận dist cập nhật và ghi kết quả thực tế vào PROGRESS.md.

## Xem thử đang bật

- 2026-10-04: Home dùng `previewStars={3}` để xem thử Tân Binh đủ3 sao. Elo session vẫn1000; đây không phải quy tắc sao mặc định của người chơi mới. Các nơi không truyền previewStars lấy sao thật theo Elo.
- Chế độ luân phiên danh hiệu mỗi2 giây đã được gỡ theo yêu cầu; không tự bật lại.

## Lỗi đã gặp và cách tránh

- HONOR-TEXT-01 (2026-10-06): Người dùng báo chữ Phong Tặng trong popup không dịch. Đã xác nhận helper liên tục gán lại offset cố định; cấp4/5 vẫn -2px sau yêu cầu dịch lên2px nên không có thay đổi. Với tinh chỉnh dịch thêm, cộng mức dịch vào vị trí đang hiển thị; đo DOM trước/sau để xác nhận delta. Chỉ truyền offset tại HonorDetailPopover; catalog/preview giữ nguyên.

| Mã | Hiện tượng / bằng chứng | Nguyên nhân đã xác định | Cách tránh và kiểm chứng |
| --- | --- | --- | --- |
| STAR-01 | Người dùng báo1 sao nằm giữa khung thay vì xếp từ bên trái. | RankStars từng căn giữa theo số sao hiện có. | Căn giữa vùng đủ3 ô cố định, điền từ trái sang phải. Đối chiếu cả1,2,3 sao: sao đầu phải giữ nguyên vị trí. Phân biệt căn vùng với căn các sao. |
| STAR-02 | Cụm đủ3 sao lệch trái so với danh hiệu. | Hàng sao chiếm78% chiều rộng nhưng bắt đầu ở mép trái của wrapper100%, phần dư chỉ nằm bên phải. | Căn giữa vùng đủ3 ô (78%) trong wrapper; tâm wrapper trùng tâm danh hiệu. Không căn giữa theo số sao đã đạt. |
| STAR-03 | Vị trí sao Home khác các màn hình còn lại. | AvatarRankBadge từng chọn offset riêng bằng placement=home; Bạn bè dựng khung sao riêng cạnh tên. | Dùng RankTitleBadge và RANK_TITLE_STARS_STYLE chung; khi sửa chuẩn, tìm và đồng bộ mọi consumer trong cùng nhiệm vụ. |
| RANK-01 | Danh hiệu nhấp nháy khi rê chuột vào vùng khác sau khi thêm tăng nét. | Bộ lọc SVG convolution là thay đổi trước khi lỗi xuất hiện; chưa xác nhận nguyên nhân ở mức compositor. | Gỡ filter URL/SVG ở RankTitleBadge và dùng ảnh trực tiếp; không thêm lại xử lý nét động nếu chưa kiểm tra hover ở các consumer. |
| RANK-02 | Người dùng báo danh hiệu vẫn nháy khi hover các nút tiện ích bên phải sau khi gỡ SVG filter. | DOM xác nhận các nút chạy brightness(1.25) và transition có filter; chưa xác nhận nguyên nhân compositor trên trình duyệt người dùng. | Đổi hover chung sang nền/viền/chữ, tách lớp vẽ danh hiệu tĩnh bằng translateZ(0); kiểm tra trạng thái hover của cả5 nút, không kết luận từ screenshot tĩnh rằng mọi frame đều không nháy. |
| RANK-01 | Đổi ảnh danh hiệu có nguy cơ làm các màn hình dùng bộ ảnh khác nhau. | Trước khi đồng bộ, FriendsDialog có bộ import riêng và AvatarRankBadge có catalog riêng. | Mọi nơi lấy ảnh từ rankArtwork; khi đổi bậc kiểm tra đồng thời tên, Elo và ảnh. |
| FRIEND-01 | Người dùng báo đổi tab làm avatar, tên/trạng thái và hàng bị nhích lên/xuống. | Chi tiết nguyên nhân từng lần không được kiểm chứng lại trong ghi nhớ này. | Dùng FriendRow và các kích thước cố định trong FRIENDS-UI-RULES; kiểm tra vị trí giữa các tab và các hàng liên tiếp. |
| FRIEND-02 | Người dùng nhiều lần báo icon Facebook rơi xuống dòng dưới trạng thái. | Chưa ghi nhận nguyên nhân đã kiểm chứng tại đây. | Chấm, chữ, icon cùng một flex-row/nowrap; kiểm tra online/offline và tên dài. |
| FRIEND-03 | Người dùng báo hover làm chữ dịch chuyển hoặc giao diện nhấp nháy. | Chưa ghi nhận nguyên nhân đã kiểm chứng tại đây. | Hover chỉ đổi màu/độ sáng; kiểm tra transform, kích thước, margin, font và transition trước khi bàn giao. |
| CHECK-01 | Kiểm tra bundle từng báo thiếu timer2000ms dù build có timer. | Vite rút gọn2000 thành2e3. | Kiểm tra kết quả biên dịch phù hợp với dạng minify; không kết luận thiếu chức năng chỉ vì chuỗi mã nguồn đổi cách viết. |

## Mẫu thêm quy tắc

- Ngày:
- Phạm vi / file liên quan:
- Quy tắc người dùng chốt:
- Thay thế quy tắc cũ nào (nếu có):
- Cách kiểm chứng:

## Mẫu thêm lỗi

- Mã lỗi / ngày:
- Hiện tượng và thao tác gây lỗi:
- Nguyên nhân đã xác định, hoặc “chưa xác định”:
- Cách sửa / cách tránh:
- Kết quả kiểm chứng thực tế:

- STAR-04: Không tự neo sao xuống đáy hoặc đổi vị trí để chữa mờ. Ngày2026-10-05 người dùng yêu cầu rõ dịch sao xuống2px, chuẩn hiện hành top120.961945px theo avatar106px. Mọi lần đổi chuẩn phải xuất phát từ yêu cầu và đồng bộ qua token chung.

- Rendering Xếp hạng2026-10-05: RankingDialog dùng CSS cuối cùng/pixel nguyên, không scale parent hoặc medal; RankingRankBadge render ảnh gốc trực tiếp. Cùng quy tắc rendering nay áp dụng toàn project qua CrispUiImage/getCrispUiLayout. Sao/gap/top vẫn dùng tỷ lệ chuẩn Home, không làm tròn riêng từng consumer. Nguồn rank/sao đủ2x; một số icon/khung Lịch sử chưa đủ2x, xem docs/UI-IMAGE-RENDERING.md. Không upsample rồi nhận là ảnh nguồn rõ hơn.

- Đồng bộ sao2026-10-05: Home là chuẩn duy nhất cho kích thước sao25% chiều rộng khung, gap ngang1.5%, top67.9761% chiều cao khung và dịch phải3px theo khung tham chiếu132.746801px. Xếp hạng đã bỏ cách tự làm tròn riêng sao/gap/top, dùng chính RankStars và RANK_TITLE_STARS_STYLE như Home/Hồ sơ/Tùy chỉnh/PlayerCard/Bạn bè. Ưu tiên tỷ lệ sao giống Home hơn làm tròn từng sao; ảnh danh hiệu Xếp hạng vẫn render trực tiếp và parent không scale. Không thay vị trí chuẩn Home hoặc nới các thẻ.

Quy tắc2026-10-05: Tân Binh giữ vị trí sao hiện hành. Sáu bậc2–7 (Kỳ Sĩ/Kỳ Thủ/Kỳ Tướng/Đại Sư/Kỳ Vương/Kỳ Thánh) hạ riêng hàng sao thêm1px CSS bằng getRankTitleStarsStyle(rank.level), top=calc(top chuẩn + 1px). Áp dụng mọi consumer; không dịch danh hiệu, avatar, thẻ hoặc thành phần UI khác; không đổi size/gap/hướng điền sao. Đây là ngoại lệ theo bậc người dùng yêu cầu, không phải offset riêng màn hình.

- 2026-10-05: Khung đỏ Gợi ý cho bạn ở Thêm bạn dùng cùng friendSectionTitle/Style cao50px thiết kế như hai tiêu đề Lời mời. Đặt trong hàng điều khiển54px theo token responsive để giữ mốc Danh sách/Thêm bạn; không dùng inline height54px cố định bỏ qua hệ số responsive.

- 2026-10-05: Người dùng cho phép mở khóa riêng vị trí ngang danh hiệu giữa các tab Bạn bè, lấy Danh sách làm gốc. FriendRow trước đó đặt cột rank270px trong lời mời và240px ở Danh sách/Thêm bạn làm tiêu đề lệch30px. Dùng cột240px cho mọi FriendRow, giữ cột thao tác330px và tất cả kích thước avatar/khung/sao. Vị trí đã căn chung và tiếp tục được giữ khóa cho lần sau; không mở khóa kích thước.

- 2026-10-05: Theo yêu cầu nới nhẹ các hàng Bạn bè, FriendRow tăng85→90px responsive; grid content track giữ85px để avatar/danh hiệu/sao giữ nguyên kích thước và vị trí tương đối. Phần tăng thêm chỉ tạo khoảng trống cuối hàng; tất cả tab cùng FriendRow nên đồng bộ.

- 2026-10-05: Đồng bộ chiều cao nút Kết bạn, Chấp nhận/Từ chối và Hủy lời mời theo nút Mời chơi của Danh sách bằng token responsive60px; không đổi chiều rộng, icon hay vị trí. Build/typecheck PASS; browser QA tại1280x720: Kết bạn và Chấp nhận đều cao51px CSS sau scale responsive.


- 2026-10-05: Căn giữa theo chiều dọc nội dung FriendRow trong hàng cao90px: giữ track85px, thêm căn giữa content của grid để phân bổ khoảng trống thừa đều trên/dưới. Kích thước, khoảng cách tương đối avatar/danh hiệu/sao và các nút không đổi; áp dụng chung mọi tab Bạn bè. Build/typecheck PASS, dist index-BIZNY3sd.js; browser QA Danh sách ở localhost: hàng55px màn hình, nội dung centerDelta=-0.4px do responsive scale.

- HONOR-SPRITE-01 / 2026-10-05: Khung Chuỗi Chiến Thắng bị cắt lệch và lộ một phần khung khác sau khi đổi scaleY thành aspect-ratio của ô crop nhưng giữ ảnh sprite height:auto. Cách tránh: khai báo cả imageWidth và imageHeight theo tỷ lệ kích thước sprite/vùng crop; ảnh bên trong phải dùng cùng hệ tọa độ phần trăm với ô crop. Đã sửa cả ba nhóm Chuỗi Chiến Thắng/Tổng Ván Chơi/Online Chuyên Cần và HonorDetailSprite; giữ slot, độ rộng, aspect-ratio và các vị trí hiện hành. Typecheck/build PASS; kiểm tra trình duyệt cả ba nhóm và chi tiết Thống Trị không còn ảnh khung dư.

- 2026-10-05: Khoảng cách dọc trong catalog Danh hiệu của mọi tab lấy tab Tất cả làm chuẩn. gap-y phần trăm tính theo tổng chiều cao nội dung nên phải chuẩn hóa theo số hàng: gap = 3% × số hàng Tất cả / số hàng tab hiện tại. Giữ lưới ba cột và kích thước thẻ; không để nhóm ít danh hiệu có khoảng cách hàng nhỏ hơn.

- 2026-10-05: Vị trí khung tiêu đề nhóm friend-section-title-frame-tight.png lấy Gợi ý cho bạn ở Thêm bạn làm chuẩn. Giữ cùng lề ngang/chiều rộng/chiều cao và độ lệch dọc (slot54px - khung50px)/2 theo token responsive. friendSectionTitleStyle dùng chung cho Gợi ý, Lời mời đã nhận và Đã gửi lời mời; Add dùng align-start để độ lệch chung giữ nguyên tọa độ mẫu. Không tăng chiều cao slot hoặc dịch các danh sách/avatar/danh hiệu/sao đã khóa để căn tiêu đề.
- 2026-10-09: Repetition UI rule update: the shared third-round warning is the only centered board panel. A blocked fifth-move red-dot click shows nothing to the actor; online server validation sends a short status only to the opponent, with no clock pause or move commit.
- 2026-10-09: Người dùng yêu cầu bỏ chiếu lặp. Nước đi nào tạo chiếu sẽ xóa chu kỳ lặp hiện tại và không được tính làm nước mở đầu chu kỳ; giữ nguyên đếm/cảnh báo/chặn cho chu kỳ phối hợp đi quân không chiếu. Không triển khai luật phạt chiếu dai.
- 2026-10-09: The manual repetition-test AI first tries its scripted cannon shuttle; if that move is blocked or cannot answer check, it falls back to a normal legal move instead of surfacing a false engine error.
- 2026-10-09: Removed the temporary cannon repetition fixture from Home quick play and computer engine options. Quick play again uses the normal room-matching flow; when it falls back to local basic AI, the machine chooses freely among legal moves after filtering fifth-round repetition violations. Pikafish keeps server validation.
- 2026-10-09: Room Selection header uses the shared player-selected avatarIndex and avatarFrameIndex with AvatarFrameOverlay; the editable player name uses font-heading. Keep its existing header geometry.
- 2026-10-09: In-game check indication uses the existing white move ring around the checked side's general; suppress the textual “đang bị chiếu” status. Keep other status/result messages and last-move ring behavior.
- 2026-10-09: Room Selection header name input has no underline and the avatar/name cluster remains vertically centered in the fixed header.
- 2026-10-09: Takeback-decline “Từ chối” badge must render above the player portrait, frame, and timer arc. Keep the existing badge size, position, and animation; use a stacking level above those avatar overlays.
- 2026-10-09: Room Selection header name is 20px desktop / 16px compact. Use lining-nums and tabular-nums so digits in editable names share the text baseline; preserve vertical centering.


- 2026-10-10 ? Theo y?u c?u l?m nhanh UI ?i?n tho?i: Home c? b? c?c 2?2 n?t ch?i v? ti?n ?ch d? ch?m; Ch?i V?i M?y c? form mobile ri?ng d?ng c?ng hook; Ch?n B?n d?ng k?ch th??c CSS th?c, l??i2 c?t v? ch?n t?nh cao80dvh. Trong v?n, chat mobile m? b?ng n?t, thao t?c v?n l?n h?n v? d?nh v?ng ??y ri?ng. Ch? ??i tr?nh b?y compact, gi? logic/API v? UI desktop; kh?ng s?a avatar, khung avatar ho?c b? c?c c?c dialog x? h?i ?? kh?a. Build/typecheck th?nh c?ng; ch?a ki?m ch?ng tr?c quan tr?n ?i?n tho?i th?t.

- 2026-10-10 ? Sau khi v?n k?t th?c c? ng??i th?ng, gi? k?t qu? ?t nh?t3 gi?y r?i m?i ??a ng??i ??u h?ng hi?n t?i l?n thay ng??i thua; ng??i thua xu?ng cu?i h?ng. Ch?n ready/reset ?? kh?ng b? qua h?ng ch? trong3 gi?y. Server tick th?c hi?n chuy?n gh?; ng??i xem kh?ng x?p h?ng v?n kh?ng ???c ??a l?n. R?i ph?ng v?n l?p gh? ngay theo quy t?c tr??c. Demo hai m?y c?ng k?t th?c tr??c, ??i3 gi?y r?i cho ng??i x?p h?ng v?o v?n m?i.

- 2026-10-10 ? Ng??i ch?i b?t ??u phi?n v?i ??5 n?ng l??ng (MAX_ENERGY), kh?ng kh?i t?o0. Gi? c? ch? tr?/h?i v? l?u trong phi?n hi?n t?i.

- 2026-10-10: Queue timing supersedes prior minimum delay: entries queued before match end wait 3 seconds; entries queued after match end promote immediately when first in line. Rematch readiness still prevents replacement. Preserve FIFO; demo follows the same timing.

- 2026-10-13 — Ảnh 63d54150 thay mặt sau của quân còn úp trên bàn trong ván Cờ Úp; ô chế độ Cờ Úp trên Home giữ nguyên. Không thay luật lật quân hoặc hình quân đã lật.
- Lần hiểu nhầm thay artwork ô Home đã được hoàn tác theo đính chính của người dùng; ảnh cắt/trim 441×435 chuyển sang `pieces/concealed-back.png`.


- Kiểm chứng mặt quân úp 2026-10-13: Home import lại hidden-full.png; typecheck/build PASS, dist có concealed-back-Clukm56z.png. Chưa QA trình duyệt trực tiếp.
- 2026-10-13 — Người dùng chốt giữ ảnh quân úp mới 63d54150 trong ván Cờ Úp; ảnh hiển thị lấp đúng cùng khung quân 108×112 của quân đã mở, cùng bóng đổ và scale khi bàn co giãn. Ô Home giữ nguyên.
- 2026-10-13 — Mặt sau quân Cờ Úp giữ ảnh/kích thước đã chốt; giảm độ bão hòa riêng lúc render xuống 0.84 để viền cam gần tông gỗ của quân mở. Không đổi asset quân mở và ô Home.
- 2026-10-13 — Theo phản hồi, hình quân Đỏ đã mở trong bàn cờ dịch sang phải 2px ở scale bàn gốc để tâm tròn nhìn cân với giao điểm; offset nhân theo scale của Board trong ChessPiece. Không dịch quân Đen hoặc quân còn úp, không sửa file ảnh.
- 2026-10-13 — Chơi với máy desktop theo ảnh mẫu người dùng: một robot Pikafish căn giữa trên bảng 1058×543, hai hàng 5 nút cấp (mặc định Cấp 2), chọn phe và hai nút hành động dưới; banner Cờ thế giữ asset cũ. Biển tên vẫn cho chọn Máy · Cơ bản để giữ tính năng. Cấp Pikafish 1–10 giới hạn thời gian suy nghĩ từ 1/10 đến toàn mức tối đa hiện hành; server xác thực cấp. Header, nền, avatar, mobile và các màn khác giữ nguyên.

- 2026-10-14 — Thông báo thao tác trong Vị trí tùy chỉnh tự ẩn sau 3 giây; thông báo mới thay bộ hẹn giờ cũ, rời màn hình thì dọn timer.

- 2026-10-14: Vị trí tùy chỉnh có công tắc Đi tiên riêng dưới Đổi bên; mặc định Đen. Gạt sang Đen nền đỏ, sang Đỏ nền trắng vàng. Phe cầm quân độc lập bên đi trước; kiểm tra/lưu FEN/Đấu ngay dùng bên đi trước.

- 2026-10-14: Đính chính công tắc Đi tiên theo ảnh: núm bên phải/nền đỏ là Đỏ đi trước; núm bên trái/nền trắng vàng là Đen đi trước. Chữ Đi tiên cách cụm chọn thêm8px.

- 2026-10-14: Công tắc Đi tiên mặc định Đỏ theo yêu cầu mới; biểu tượng ⇄ trong nút đổi bên được nâng2px.

- 2026-10-14: Theo yêu cầu mới, màn Vị trí tùy chỉnh bỏ cụm user bên trái (avatar/danh hiệu/tên); nhãn Đi tiên tăng16→20px. Không còn hàng trống avatar trên compact.

- 2026-10-14: Hai hàng Chọn bên/Đi tiên cách10px. Chọn bên chỉ quyết định phe người chơi và hướng bàn; Đi tiên riêng quyết định lượt đầu (mặc định Đỏ), dùng cho FEN/validation. Nhãn Đỏ/Đen hàng Đi tiên20px, công tắc48×24/núm18px; khung224px giữ tâm.

- 2026-10-14: Theo yêu cầu mở riêng phần Đã lưu của Lịch sử để thêm hai lựa chọn Ván đấu/Thế cờ bên dưới tab. Ván đấu mặc định giữ danh sách hiện có; Thế cờ hiện trạng thái trống, chưa nối dữ liệu lưu thế. Phần còn lại tiếp tục khóa.

- 2026-10-14: Lưu ván vừa kết thúc cho người chơi/người xem; online server chụp diễn biến và tên trước chuyển ghế, local dùng snapshot gameStore. Đã lưu/Ván đấu dùng localStorage thật theo tên, chống trùng/quota, xóa và xem lại từng nước bằng Board chỉ đọc. Không tự lưu; lưu từ lịch sử mình/người khác đang phát triển. Chi tiết docs/MATCH-SAVING.md.

- 2026-10-14: Lưu ván nằm giữa Camera và Bạn bè trong tiện ích bàn cờ, dùng PositionIcon save chung; khóa khi chưa có ván kết thúc/đã lưu. Bỏ nút lưu nổi dưới màn.

- 2026-10-14: Xem lại ván đã lưu chuyển screen replay toàn màn hình, không popup bàn nhỏ; Board/PlayerCard dùng chung, xem từng nước và quay về Home. Không thay gameStore/engine/phòng online.

- 2026-10-14: Replay ván lưu tự chạy khi vào,1,2 giây/nước; Phát/Tạm dừng và tua nằm bên trái bàn desktop. Tua tạm dừng, cuối tự dừng; mobile điều khiển dưới bàn. Chỉ bàn/hai người, không chat/view.

- 2026-10-14: Chốt replay PHẢI dùng chính GamePage (replayData), không màn bàn sao chép. Xóa SavedMatchReplay; useReplayPlayback/ReplayControls chỉ điều khiển lịch sử, Board/PlayerCard/layout gameplay giữ nguyên. Chặn toàn bộ mutation/clock/socket/AI/chat trong replay; back không reset trận thật. Tự phát sau entrance và tua bên trái. docs/MATCH-SAVING.md là chuẩn.

- 2026-10-14: ReplayControls220px, nút phát/dừng trên; lùi–số nước–tiến chung một hàng dưới. Không nút về đầu/tới cuối hoặc thanh tua xanh. Dùng màu nâu/vàng chung.

- 2026-10-14: ?? l?u ? V?n ??u lu?n ??t ng??i l?u b?n tr?i n?u l? ng??i ch?i, bi?u t??ng phe v? k?t qu? theo ??ng ng??i. Replay m?c ??nh qu?n c?a m?nh ? d??i, m?nh b?n tr?i, ??c l?p b?n ?i tr??c. Kh?n gi? gi? ?? b?n tr?i/d??i. D?ng savedMatchSide chung; ?p d?ng c? b?n l?u c? theo t?n.

- 2026-10-14: Icon đổi Xem lại/Đánh thử chuyển xuống dưới hai nút Phân tích và Gợi ý trong cụm điều khiển bên phải; vẫn dùng Space và cùng callback chuyển chế độ.

- 2026-10-14: Pikafish trong chế độ đánh thử dùng cấp10 và giới hạn nghĩ500ms mỗi lượt; không đổi thời gian Pikafish của các luồng khác.

- 2026-10-14: Theo yêu cầu, icon đổi Xem lại/Đánh thử cách hàng Phân tích/Gợi ý thêm10px (margin-top20px tổng).

- 2026-10-14: Đánh thử bỏ delay550ms dư sau animation trước khi gọi Pikafish (vẫn nghĩ500ms). Animation quân bắt đầu đúng độ nhấc đã chọn; quân máy không nhảy lên khi xuất phát. Delta dùng cùng tọa độ làm tròn của PieceView để tránh lệch pixel khi đáp.

- 2026-10-14: Bàn gốc Thế cờ hiện nút đổi sang Đánh thử dưới cụm user phải, margin-top50px; tái dùng ReplayModeButton cùng icon/callback/Space, không hiện Phát/Tua ở bàn gốc Thế cờ.

- 2026-10-14: Theo yêu cầu mới, Pikafish bàn thử tăng thinkMs500→800ms mỗi lượt, giữ cấp10.

- 2026-10-14: Nút đổi bàn cũng hiện dưới khung Phát/tiến lùi khi xem lại Ván đấu, cách50px; dùng chung icon và phím Space để vào Đánh thử.

- 2026-10-14: Replay Ván đấu dùng artwork trial-back/forward cho Lùi/Tiến; nút Phát/Tạm dừng tái dùng viền cắt góc của cùng asset qua border-image. Giữ cụm điều khiển và phím tắt.

- 2026-10-14: Trong hàng Đã lưu → Ván đấu, biểu tượng quân luôn theo thứ tự Đỏ rồi Đen, không đảo thứ tự theo phe người lưu; tên/người chơi vẫn theo quy tắc xếp bên riêng.

- 2026-10-14: Nút playback lấy chuẩn mũi tên trial khung220px:52.8×43.14px (24% ngang,35% cao ảnh937×525). Phát cũng cao43.14px, cùng viền gỗ cắt góc; giữ số nước/phím.

- 2026-10-14: Đã chơi thay fixture bằng playedMatchesStore/localStorage xiangqi-played-matches-v1, tự ghi ván hoàn tất có tên owner trong hai người chơi từ useMatchSaving; độc lập Đã lưu thủ công, xem lại snapshot thật. Nút Phát dùng asset mới replay-play-new.png từ imagegen, giữ chiều cao43.14px.

- 2026-10-14: Theo xem trực quan, nút Phát playback tăng chiều cao lên52.8px để bằng kích thước cạnh nút mũi tên; trước đó container43.14px nhìn thấp hơn.

- 2026-10-14: Đã chơi chỉ nhận snapshot online (marker isOnline), bỏ dữ liệu local/máy khỏi danh sách kể cả entry cũ. Rời phòng giữa ván server finish winner=đối thủ với reason leave và capture archive trước đổi ghế; UI đã xác nhận trước khi rời.

- 2026-10-14: Replay mở từ tab Đã chơi gắn replayRequiresSave. Chỉ sau khi lưu ván vào savedMatchesStore hoặc lưu thế có sourceMatchId mới hiện nút Đánh thử; Space trước đó hiện nhắc lưu, nút ẩn, replay chỉ xem/tua. Replay từ nguồn khác giữ quy tắc hiện tại. Played entries tự hết hạn một tháng lịch kể từ endedAt, ngày cuối tháng được clamp, dọn lúc khởi tạo và timer khi app mở.

- 2026-10-14: Nút Phân tích/Gợi ý trong bàn thử dùng cursor-pointer; bấm hiện status Đang phát triển, chưa chạy logic.

- 2026-10-14: Máy trong mọi replay đánh thử từ ván/thế lưu bắt buộc Pikafish cấp10, thinkMs2500 (mức tối đa cấu hình); không dùng máy cơ bản hoặc rút ngắn thời gian.

- 2026-10-14: Thông báo Đang phát triển/nội dung liên quan replay dùng toast cùng class Vị trí tùy chỉnh: absolute bottom3, giữa, nền xanh viền kem, chữ vàng nhạt, tự ẩn3s; không hiển thị inline dưới nút.

- 2026-10-14: Đính chính thời gian Pikafish trong replay đánh thử: giữ cấp10, thinkMs700 theo yêu cầu; thay giới hạn2500 trước đó.

- 2026-10-14: Trong replay và bàn thử, mọi nước chỉ phát tiếng đi quân; không phát cue ăn quân/chiếu/chiếu hết, intro hoặc cảnh báo thời gian.

- 2026-10-14: Âm thanh replay chỉ giới hạn tiếng đi quân ở thao tác tua; các nước đánh trực tiếp trên bàn thử phải phát âm thanh bình thường (ăn/chiếu/chiếu hết).
- 2026-10-14: Tên thế cờ trong Đã lưu dùng NumberText chung: chữ giữ font-heading, chữ số dùng font-number lining/tabular và compact 0.9em, cùng baseline với chữ.
- 2026-10-14: Chữ số trong tên thế cờ dùng weight normal để nét mỏng tương xứng font-heading; giữ cỡ compact và baseline.
- 2026-10-14: Ván bắt đầu bằng Đấu ngay từ Vị trí tùy chỉnh mở bàn thử cô lập, khởi chạy Pikafish bật sẵn. Cột phải hiện ReplayControls trial; ẩn mã phòng/lượt xem/chat; không lưu nhánh này như ván lịch sử.
- 2026-10-14: Cụm bàn thử mở từ thế tùy chỉnh hiển thị số nước ở nút giữa hàng lùi/tiến và chuyển Reset xuống dưới; replay khác giữ Reset trong nút giữa.
- 2026-10-14: Hoàn tác thay đổi vị trí Reset/số nước trong bàn thử thế tùy chỉnh; giữ nút Reset giữa hàng như thiết kế trước.
- 2026-10-14: ReplayControls dùng bộ ảnh 6c0cdab5 thay toàn bộ khung/nút replay và trial: cắt riêng 8 asset alpha, không lấy biển Máy Cơ bản. Phát/Tạm dừng, Máy đi Bật/Tắt và số nước là dữ liệu sống; Reset trial giữ giữa hàng. Không dùng ảnh ghép tĩnh thay UI.
- 2026-10-14: Mọi bàn thử: Reset dùng crop 0fed4f87 đặt bên phải Gợi ý trong hàng dưới (Phân tích/Gợi ý/Reset); vị trí giữa lùi/tiến hiển thị step/total font số. Phím reset ↑/↓ giữ nguyên.

- 2026-10-15: Ô sửa tên Thế cờ dùng Times New Roman regular riêng cho chữ số, tỷ lệ90%, lining/tabular như NumberText khi hiển thị; giữ font chữ và input native.

- 2026-10-15: Thanh cuộn danh sách Thế cờ đổi thumb sang nâu đậm#613014 để tương phản rõ trên nền vàng; giữ kích thước/vị trí và track trong suốt.

- 2026-10-15: Quy tắc máy mới do người dùng chốt: mọi chức năng máy chỉ dẫn, hướng dẫn, gợi ý, phân tích nước đi và chơi với máy ngoài chế độ đấu máy10 cấp đều dùng Pikafish mạnh nhất (không chọn sai số/hạ sức mạnh), thời gian search700ms (0,7 giây). Riêng chế độ đấu máy10 cấp giữ nguyên cấu hình từng cấp, kể cả cấp10. Thay thế các cấu hình máy cơ bản hoặc thời gian search cũ trong phạm vi trên.700ms là thời gian engine tính, không phải tổng thời gian mạng/khởi động/diễn giải. Giữ hạn chế trợ giúp trong trận người thật; không tự bật engine cho biến thể chưa được hỗ trợ. Phiên này chỉ ghi quy tắc tài liệu, chưa áp dụng code.

- 2026-10-15: Gợi ý đấu máy/bàn thử Vị trí tùy chỉnh dùng usePikafishHint riêng, Pikafish level10/search700ms từ FEN hiện tại bên người chơi; chỉ chạy khi tới lượt người chơi, chặn online/demo/replay/Cờ Úp. Không ghi store, không chọn/đi quân, không đổi lượt/history/clock hoặc bật Máy đi. Board vẽ1 mũi tên xanh opacity0.82 qua tọa độ chung/flipped, pointer-events:none. Bấm lại hủy request cũ/tính lại; đổi board/lượt/phase/reset/undo/rời hủy và bỏ kết quả cũ. Clock tick không xóa gợi ý. Phân tích vẫn đang phát triển.

- 2026-10-15: Ba nút Phân tích/Gợi ý/Reset dùng chung ToolArtworkButton, hover vàng#ffe08b alpha8% tức thì như mũi tên, mask theo alpha artwork. Gợi ý nhấn/đang tính thu94%, artwork brightness0.35; hết request/lỗi/hủy trở lại bình thường, vẫn cho bấm lại tính mới. Đồng bộ nút Gợi ý đấu máy. Không thay gameplay.

- 2026-10-15: Người dùng báo quân đi hơi không mượt ở mọi chế độ. Chưa xác định nguyên nhân/chưa tái hiện trên browser (không có browser kết nối). Regression move-animation-stability xác nhận xóa hint/render lại không restart/cancel animation, giữ DOM quân, lift6px tại scale0.5, đích/top nhất quán và duration400ms.7/7 test stability/hint/trial PASS; chưa sửa production animation. Cần kiểm tra frame thực tế trước khi chốt đã sửa.

- 2026-10-15: Sửa render dư do Gợi ý: trước đây effect setHint/setThinking sau đổi thế tạo thêm render GamePage ngay đầu animation (regression đo2 render). usePikafishHint nay gắn kết quả/thinking với context board/turn/phase/side/revision; ẩn đồng bộ trong render, effect chỉ abort. Sau sửa đo1 render, không giữ mũi tên cũ khi đổi thế; clock tick giữ gợi ý. Không đổi400ms/đường đi/gameplay.15/15 test hint/stability/trial/computer PASS. Chưa xác nhận độ mượt/frame bằng browser.

- 2026-10-15: Người dùng báo mọi thao tác kém mượt từ khi thêm Gợi ý. Giảm tải liên quan: ToolArtworkButton mask hover display:none khi không hover; useReplayTrial memo nước hợp lệ theo game/selected, không tính lại khi UI Gợi ý render. Regression giữ reference moves/không gọi lại rules và đổi chọn tính mới PASS.16/16 test hint/stability/trial/computer PASS; typecheck/build PASS. Không đổi geometry/luật/animation. Chưa đo frame browser, chưa xác nhận hết vấn đề toàn ứng dụng; cần reload tab để nạp dist mới.

- 2026-10-15: Quy tắc mới thay phạm vi Gợi ý và lùi theo cặp: mọi nút Gợi ý ở bàn thử (replay ván/thế đã lưu và Vị trí tùy chỉnh) dùng Pikafish mạnh nhất/search700ms,1 mũi tên xanh/read-only; replay xác định phe theo savedMatchSide. Bỏ nút Gợi ý riêng ở ván Cờ Tướng/Cờ Úp thông thường; giữ chặn hỗ trợ trong trận người thật và báo chưa hỗ trợ jieqi. Lùi/Tiến mỗi lần đúng1 nửa-nước (1 lần đi quân) cả nút và ←/→, không lùi theo cặp người/máy. Giữ reset/hủy/memo và hover/pressed hiện hành.

- 2026-10-15: Tên hiển thị máy Pikafish đổi thành Ông Hoàng toàn ứng dụng: thiết lập desktop/compact, tên đối thủ, trạng thái suy nghĩ/kết nối, tooltip Gợi ý và thông báo lỗi frontend/server. Mã engine pikafish, API/type/path/binary và giấy phép giữ nguyên. Chặn So tài nhận cả tên mới và tên cũ để tương thích; không đổi tên người chơi/bản ghi lịch sử đã lưu.

- 2026-10-15: Trong chat bàn chơi, tăng khoảng cách dọc cố định giữa các tin từ6px lên12px; áp dụng cả tin hệ thống kế tiếp và tin thường. Giữ avatar, căn lề và cuộn.

- 2026-10-15: Avatar máy dùng ảnh6626838d-3cae-4584-b222-c511ca546742 (Ông Hoàng), nguồn ở references/uploads, runtime ở computer-setup/ong-hoang-avatar.png. Dùng computerAvatar/getComputerAvatar chung trong PlayerCard, chat bàn chơi, Thế cờ, hồ sơ máy, Tin nhắn và chân dung thiết lập desktop. Ảnh được clip tròn trong khung hiện có; không đổi kích thước/vị trí avatar/khung. Hỗ trợ tên máy cũ Pikafish và Máy; không sửa dữ liệu lịch sử.

- 2026-10-15: Theo yêu cầu mới, avatar máy dùng chân dung GIỮA ảnhc876e59c-c77c-411e-a467-31b5f5b4df21. Runtime ong-hoang-avatar-v2.svg nhúng nguyên pixel nguồn, clip circle(cx1086,cy348,r288), viewBox79860 576576 bỏ vòng vàng nguồn, ngoài tròn trong suốt; không vẽ lại ảnh. Máy chỉ giữ avatar và tên Ông Hoàng: bỏ overlay khung/danh hiệu/sao, khung tên/ELO và trang trí kết quả trên PlayerCard; hồ sơ/chat bỏ khung/huy hiệu máy; thiết lập bỏ khung biển tên. Dùng helper chung cho mọi avatar máy, gồm tên cũ. Quyền sửa này chỉ cho ảnh/trang trí máy, avatar người thật vẫn khóa. Nguồn giữ references/uploads. Typecheck/build PASS; chưa browser QA.

- 2026-10-15: Đính chính avatar máyc876e59c: giữ100% hình GIỮA gồm vòng vàng/chi tiết gốc, chỉ tách khỏi hai hình bên và trim alpha trống (bbox x737,y0,698×694); SVGv3 nhúng nguyên pixel, không circle clip. Hiển thị object-contain trong kích thước avatar hiện có, không rounded/cắt ảnh máy. Khôi phục PlayerNameplate cho tên Ông Hoàng và khung biển tên ở thiết lập máy. Khung overlay/danh hiệu/sao/ELO riêng của máy vẫn bỏ như trước. Áp dụng đồng bộ bàn chơi/chat/thế/hồ sơ/Tin nhắn/thiết lập.

- 2026-10-15: Chốt căn máy: thẻ tên Ông Hoàng dùng cùng margin/translate/breakpoint với thẻ tên người chơi, giữ ngang hàng thay margin riêng mt2. Avatar máy phóng theo đường kính HIỂN THỊ của viền mặc định (156/128×0.896=1.092), giữ nguyên ảnh nguồn và ô anchor. AVATAR_FRAME_VISIBLE_SCALE dùng chung PlayerCard/chat/hồ sơ, không đổi avatar/khung người thật. Không thêm danh hiệu/sao/ELO lại cho máy. Typecheck/build PASS, chưa browser QA.

- 2026-10-15: Sửa chữ trong thẻ tên bị cắt dấu/nét do truncate kết hợp line-height1: PlayerNameplate đặt line-height1.4 riêng vùng chữ, giữ khung/kích thước/font/vị trí. Component chung áp dụng Home và mọi PlayerCard, gồm Ông Hoàng. Typecheck/build PASS, chưa browser QA.

- 2026-10-15: Máy không mở bảng thông tin/hồ sơ. Avatar máy ở PlayerCard disabled nhưng giữ độ sáng100%, không pointer/context menu phong danh hiệu. Chặn tên máy tại điểm mở Profile của Game/Home/Chọn Bàn, bao gồm đường chat/Tin nhắn/lịch sử. Người thật giữ luồng cũ. Typecheck/build PASS, dist index-DS34NNzo.js xác nhận; chưa browser QA.

- 2026-10-15: Ván đấu máy thông thường (computerMatch, cả Cờ Tướng/Cờ Úp) không có Lưu ván/Ghim thế, mã phòng, lượt xem/panel người xem hoặc chat (desktop/compact). showRoomFeatures dùng chung; useChat disabled cả send/listener/scroll, useMatchSaving không ghi ván máy. Bàn thử tùy chỉnh/replay giữ chức năng riêng đã chốt; online/local hai người giữ UI phòng. Không sửa avatar, khung tên hoặc engine.

- 2026-10-15: Giảm tải sau báo kém mượt: thay SVGv3 nhúng cả sheet avatar3.023.811 byte/2172×724 bằng PNG crop đúng bbox698×694/1.117.868 byte; kiểm tra484.412 pixel ARGB giống nguồn100%, giữ toàn bộ hình/viền gốc. Runtime import ong-hoang-avatar-full.png, ảnh nguồn vẫn giữ. useReplayTrial.select useCallback theo state thực để Board memo không render lại do UI khác; regression giữ callback/moves khi rerender PASS. GamePage memo kiểm tra chiếu theo board/turn/phase; useGame bỏ kiểm tra chiếu dư chỉ để trả status rỗng khi playing, giữ status kết quả.16/16 test hint/trial/animation/computer PASS; typecheck/build PASS. Đã xem PNG xuất, chưa đo FPS trên browser, không khẳng định hết mọi khựng.

- 2026-10-15: Ông Hoàng có danh hiệu riêng Kỳ Thủ AI và họa tiết sao riêng từ ảnh205ea2ea; thay quy tắc bỏ toàn bộ danh hiệu/sao máy trước đó. AvatarRankBadge/RankTitleBadge thêm prop computer, tái dùng vị trí/tỷ lệ slot và hàng sao chung, chỉ PlayerCard máy bật. Asset PNG title1168×383 tại(34,154), stars853×199 tại(1270,242), trim alpha<=16 loại nhiễu vô hình, corners alpha0; nguồn giữ references/uploads. Giữ avatar/khung tên/khóa hồ sơ máy. Typecheck/build PASS, đã xem2 crop và xác nhận dist, chưa browser QA.

- 2026-10-15: Màn Chơi với máy dùng PlayerNameplate chung cho Ông Hoàng thay khung chữ CSS cũ, desktop/compact cùng thẻ tên width250px. Desktop giữ slot top171/h53/w330 và căn giữa; avatar/cấp/phe/hành vi giữ nguyên. Typecheck/build PASS, dist index-wVJBr8a_.js có width250; chưa browser QA.

- 2026-10-15: Vị trí tùy chỉnh: kéo lấy quân từ khay tự chọn khay bên đó và loại quân đó (chooseForDrag không toggle). PositionPalette đồng bộ activeSide theo piece. Thả hợp lệ giữ chọn nếu loại đó còn trong khay, hết số lượng bỏ chọn/khóa như trước. Kéo quân trên bàn ra ngoài trả khay thì chọn đúng bên/loại vừa lấy xuống. Hover/click/phím tắt, kiểm tra đặt sai và hủy kéo giữ quy tắc hiện tại.10/10 test editor gồm đổi khay/aria-pressed/giữ chọn/hết quân PASS; typecheck/build PASS, chưa browser QA.

- 2026-10-15: Tạo bàn dùng khung chọn tỉnh/thành, nút nâu/vàng 10f8e709 và ô thời gian 6ff86838; thêm Bàn khóa và hiện ô mật khẩu/xem-ẩn khi bật. Người dùng xác nhận chỉ làm UI trước; chưa nối khóa/phân quyền/mật khẩu server. Component chung áp dụng Chọn Bàn/LobbyDialog.

- 2026-10-15: Form Tạo bàn: select thời gian phải nằm trên ảnh khung (relative z10); mật khẩu giữ nguyên artwork khi focus, không ring khung mới, tắt autocomplete và dùng input text che ký tự bằng text-security để tránh gợi ý tạo mật khẩu. Hủy/Tạo bàn hover opacity90%, không tăng sáng/bão hòa.

- 2026-10-15: Người dùng yêu cầu toàn project bỏ viền outline/ring khi focus, áp dụng utility Tailwind quan trọng trên body index.html; không đổi viền chọn. Công tắc Bàn khóa thu80%, tắt brightness50%/saturate50%; mật khẩu luôn hiện chữ, bỏ mask/nút con mắt. Vẫn UI preview.

- 2026-10-15: Hủy/Tạo bàn hover phủ vàng nhạt10% theo alpha artwork, không dim toàn nút. Bàn khóa tắt dùng nền nâu đậm/núm kem nâu rõ, không filter tối toàn cụm; hover viền vàng để nhận biết vẫn bấm được. Thay quy tắc hover opacity90/tắt brightness50 trước.

- 2026-10-15: Tạo bàn hover phủ vàng nhạt30% để rõ hơn, Hủy giữ10%. Tắt Bàn khóa dịch hai nhãn/ô thời gian lên11% chiều cao form; bật trở lại vị trí chừa mật khẩu. Hai nút đáy giữ tọa độ.

- 2026-10-15: Nhạc nền dùng3 MP3 mới, đầu155926→247345→618302→lặp; hết bài chờ4s. Một player chung xuyên màn, không để pointer/keyboard bỏ qua khoảng nghỉ. Bỏ runtime nhạc cũ; giữ nguồn archive và âm thanh ván cờ.

- 2026-10-15: Sẵn sàng online: giữ đổi người thua/đầu hàng sau ván; cặp đang ngồi có hàng chờ thì cả hai chưa ready chờ10s rồi hiện20→0 tự bắt đầu, một người ready đếm ngầm30s từ lần bấm đầu; quá hạn người kia thua/not-ready xuống khán giả queued=false, đầu hàng lên đúng ghế. Không hàng chờ thì không ép/phạt. Bảng xanh trên cùng, nút ready ẩn sau bấm không chữ chờ. Chi tiết docs/ROOM-READINESS.md.

- 2026-10-15: Đính chính luật Sẵn sàng: quá30s chỉ chuyển người chưa ready xuống khán giả và đầu hàng lên, KHÔNG xử thua/ghi thắng-thua/tạo ván mới trong lịch sử; giữ archive ván thật trước đó. Thay phần not-ready/xử thua vừa ghi. Mốc10/20/30 và luật đổi người thua ván thật giữ nguyên.

- 2026-10-15: XEM THỬ TẠM theo yêu cầu: mở bàn mẫu Chọn Bàn (useRoomDemo) giữ phase ready và hiện countdown20 ngay, hết20s bắt đầu hai máy. useDemoReadyCountdown chỉ local demo, không online/replay/trial, rời bàn hủy interval. Gỡ ngoại lệ khi kết thúc xem UI; luật online10+20/30 không đổi.

- 2026-10-15: Đã nối Bàn khóa THẬT theo yêu cầu mới, thay ngoại lệ chỉ UI: Tạo bàn gửi mật khẩu1–64 ký tự; server kiểm tra trước join cả ghế/viewer, Repository giữ salt/hash riêng không phát secret. Chọn Bàn thêm mục Bàn khóa bên phải Còn trống, lọc locked theo khu vực, bảng nhập dùng chung LobbyDialog. Chơi nhanh bỏ bàn khóa; lời mời không bypass khóa/rời phòng cũ trước xác thực. Chi tiết docs/ROOM-LOCKS.md.

- 2026-10-15: Số countdown Sẵn sàng trong Board đổi đen, cỡ48→72 nhân scale (tăng50%), bỏ shadow chữ; dùng chung online/bàn mẫu preview.

- 2026-10-15: Mọi bàn locked=true trong RoomTableGrid dùng artwork65c16869 (table-board-locked.png), crop alpha bbox107,140,1041,964; nguồn giữ references/uploads. Giữ slot chung/object-contain, người chơi/nhãn và luồng mật khẩu.

- 2026-10-15: Xếp hạng Vào xem dựng RankingViewButton ôm asset210×62 alpha sẵn, bỏ bóng CSS chữ nhật; chỉ hiện khi tên top nằm trong phòng thật phase playing, click kiểm tra lại rồi join asViewer=true, khóa vẫn hỏi mật khẩu. Server chặn lệnh xem khi chưa/đã hết đấu. Query rooms chỉ poll khi dialog mở. Danh sách tên/ELO vẫn fixture, Cờ Úp online chưa hỗ trợ; docs/RANKING-WATCH.md.

- 2026-10-15: XEM THỬ TẠM Xếp hạng: hàng top1 luôn có1 nút Vào xem mẫu nếu không có trận thật, click chỉ thông báo mẫu; nếu có trận thật vẫn watch bình thường. Các hàng khác giữ điều kiện phòng đang đấu. Thanh cuộn bỏ track trắng, thumb nâu vàng#92612d/hover#613014, track/corner trong suốt.

- 2026-10-15: Thanh kéo Xếp hạng đổi trắng#fff, track/corner vẫn trong suốt. Bạn bè chỉ hiện Mời chơi khi friend.presence=online; offline ẩn nút nhưng giữ Nhắn tin/hàng/avatar.

- 2026-10-16: Vị trí tùy chỉnh: nút đổi bên bỏ translateY-2px, căn giữa hàng Đỏ/Đen; icon hai mũi tên SVG20px đối xứng trong vòng32px, không lệch baseline glyph.

- 2026-10-16: Chốt mô hình tài khoản Guest/đã liên kết tại board-game/docs/ACCOUNT-MODEL.md. Guest có online/máy/Cờ Úp/phòng/Elo-cấp-sao/vàng/danh hiệu/lịch sử/lưu ván-thế/bạn bè-chat/avatar-khung; chỉ tài khoản đã liên kết được đổi tên, đăng nhập thiết bị khác, khôi phục, giải đấu chính thức và mua tiền thật sau này. Xóa game/dữ liệu trình duyệt mất Guest; đã liên kết khôi phục bằng đăng nhập. Giữ giới hạn từng mode hiện hành. Chỉ chốt tài liệu, chưa code/database/schema/phương thức liên kết.

- 2026-10-16: Bút đổi tên hồ sơ: Guest không có; đăng nhập Google/đã liên kết và chưa đổi tên thành công mới hiện bút vàng ở cuối dòng tên như bút địa chỉ trong ảnh người dùng. Đổi tên thành công thì ẩn bút; hủy/lỗi vẫn giữ. Trạng thái theo tài khoản, giữ qua đăng nhập lại/đổi thiết bị. Chưa có quy tắc cấp lại quyền. Chỉ lưu thiết kế tại docs/ACCOUNT-MODEL.md, chưa code/UI/database.

- 2026-10-16: Màn đăng nhập mới theo ảnh người dùng, artwork tự tạo bằng imagegen theo yêu cầu. EntryGate trước App: chưa chọn cách vào thì LoginPage, đã chơi khách thì vào Home trực tiếp qua localStorage co-tuong-entry-v1. Đây chỉ là ghi nhớ cách vào, không phải auth server hoặc persistence hồ sơ. Không tin flag Google từ client; Google OAuth chưa cấu hình, nút báo rõ và không tạo phiên giả. Khi có auth Google thật phải kiểm tra phiên server rồi bỏ qua trang đăng nhập. Giữ UI/gameplay/phạm vi khóa hiện có. Không tạo database. Xem docs/ACCOUNT-MODEL.md và src/assets/login/source.md.

- 2026-10-16: Tên khách tự sinh dạng Kỳ thủ + đúng6 chữ số ngẫu nhiên, không thêm khoảng trắng trước số (ví dụ Kỳ thủ000042). Dùng crypto.getRandomValues, pad số0 đầu; tạo một lần, giữ trong co-tuong-entry-v1 và khôi phục vào sessionStore khi tải lại. Entry guest cũ thiếu tên được bổ sung một lần. Validator client/server chung cho phép đúng mẫu này là ngoại lệ giới hạn10 ký tự; tên tự nhập khác giữ giới hạn cũ. Không bảo đảm tên random duy nhất toàn server khi chưa có DB. Chưa triển khai auth/database hoặc quyền đổi tên.

- 2026-10-16: Cảnh báo Chơi như khách trên LoginPage nâng top84.3%→82.8% theo phản hồi bị họa tiết đáy che; chỉ dịch vị trí dọc, giữ chữ/font/cỡ/bố cục khác.

- 2026-10-16: Số trong tên trên PlayerNameplate dùng NumberText chung với compact90%, font-number/lining-nums/tabular-nums, weight normal và giữ nguyên độ sáng (soften=false). Chữ và số cùng baseline inline, bỏ chữ số oldstyle của font-heading. Đồng bộ Home/PlayerCard/thiết lập qua component chung; giữ nguyên khung/kích thước/vị trí avatar và nameplate.

- 2026-10-16: Theo yêu cầu trực tiếp mở đúng phạm vi typography cột tên/trạng thái và ô tìm kiếm Bạn bè: dùng font-heading (Cormorant) cho chữ/tìm kiếm/trạng thái; tên font-semibold bỏ text-stroke, số tên qua NumberText compact90%/font-number/lining/tabular/weight medium, giữ opacity88% hiện hành và baseline inline. Áp dụng FriendIdentity/PresenceLabel chung mọi tab và cả2 ô tìm kiếm. Giữ font-size/line-height/hàng/spacing/avatar/nút/danh hiệu, không đổi layout; phạm vi còn lại vẫn khóa và typography khóa lại sau nhiệm vụ.

- 2026-10-16: Hồ sơ của mình đổi nút Thoát thành Đăng xuất theo yêu cầu, giữ hình học/style nút; hồ sơ người khác vẫn Thoát. Bấm mở dialog xác nhận Bạn có chắc muốn đăng xuất? với Hủy/Đồng ý; Hủy/Escape không đăng xuất. Đồng ý đánh dấu signedOut trong co-tuong-entry-v1, ngắt socket (server xử lý rời theo luật cũ), rời/reset ván local và trở lại LoginPage. Không xóa tên khách/localStorage ván-thế; chơi khách lại giữ tên. Chưa có OAuth để thu hồi phiên Google. Lỗi lưu marker giữ phiên và báo lỗi. Quyền sửa chỉ nút/footer và xác nhận của mình, vùng UI khác giữ khóa.

- 2026-10-16: Theo yêu cầu tăng nhẹ độ dày chữ/số Bạn bè: tên FriendIdentity semibold→bold, số NumberText medium→semibold, trạng thái PresenceLabel medium→semibold; giữ font/cỡ/opacity88%/baseline/hình học và không thêm stroke. Component chung đồng bộ mọi tab. Phạm vi typography mở đúng yêu cầu rồi khóa lại, avatar/layout khác giữ nguyên.

- 2026-10-16: Theo phản hồi số đang đậm hơn chữ, tên Bạn bè tăng extrabold và stroke0.2px chỉ phần chữ; span số reset stroke0, NumberText weight normal thay semibold, giữ compact90%/opacity88%/baseline. Trạng thái bold. Thay quy tắc không stroke của lần trước đúng phạm vi tên này; giữ font/cỡ/hình học/avatar và đồng bộ mọi tab qua FriendIdentity/PresenceLabel. Phạm vi typography khóa lại sau task.

- 2026-10-16: Chốt tên Bạn bè/Xếp hạng dùng SocialPlayerName chung tại SocialUi: chữ font-heading/extrabold/stroke0.2px; số NumberText font-number/normal/compact90%/opacity88%, stroke riêng0.1px để tăng nhẹ từ lần trước, cùng baseline inline. Trạng thái dùng socialPresenceTextClass font-heading/bold. Phạm vi người dùng mở gồm typography tên/trạng thái hai màn, không đổi font-size/spacing/avatar/khung/hàng/nút/rank/Elo. Áp dụng mọi tab qua component chung; khóa lại phạm vi sau nhiệm vụ.

- 2026-10-16: Theo yêu cầu tăng số thêm chút, stroke số trong SocialPlayerName tăng0.1px→0.2px, đồng bộ tên Bạn bè/Xếp hạng. Giữ nguyên chữ/font/weight/cỡ/opacity/baseline/hình học; phạm vi khác vẫn khóa.

- 2026-10-16: Sửa cắt nét tên Bạn bè/Xếp hạng: SocialPlayerName có line-height1.4 và tự truncate ngang; h3 giữ slot cao24px, flex items-center/không overflow-hidden để line box đầy đủ vượt slot mà không bị cắt dấu/đuôi chữ. Giữ font/weight/stroke/baseline tương đối và chiều cao hàng/avatar/spacing. Đồng bộ component chung, chỉ mở phạm vi sửa cắt nét rồi khóa lại.

- 2026-10-16: Chốt ghép đấu tự động tương lai: ưu tiên cùng cấp bậc/cùng số sao; không có thì ngẫu nhiên đối thủ hơn/kém1 sao, mở rộng lần lượt2 rồi3 sao, tối đa3. Không có phù hợp thì người chơi vào phòng một mình chờ, không fallback máy/ghép quá phạm vi. Chỉ ghi thiết kế, chưa đổi code hiện hành; chi tiết ranh giới bậc/sao trần cần chốt trước code. Xem board-game/docs/MATCHMAKING.md.

- 2026-10-16: Chốt ELO mục tiêu theo đối thủ trước trận: thắng cùng bậc/sao +13, thắng cao hơn1/2/3 sao +16/+17/+18, thắng thấp hơn1/2/3 sao đều+10; thua cùng bậc/sao hoặc đối thủ thấp hơn đều-13, thua đối thủ cao hơn1/2/3 sao đều-10. Tính riêng mỗi người, không zero-sum. Chỉ tài liệu, chưa code/DB; hòa/điểm sàn/ngoài phạm vi và ranh giới bậc chưa chốt. Bảng chuẩn tại docs/MATCHMAKING.md.

- 2026-10-16: Chốt sao liên tục qua bậc cho ghép đấu/ELO: index=(bậc-1)*3+(sao-1), chênh=index đối thủ-index mình. BậcN/3 sao +1/+2/+3 là bậcN+1/1/2/3 sao; bậcN/1 sao -1/-2/-3 là bậcN-1/3/2/1 sao. Chỉ xét bậc tồn tại, không dùng danh hiệu trang trí hoặc tự thêm sao ẩn. Thay ghi chú ranh giới bậc chưa chốt trước đó; bảng điểm giữ nguyên. Chỉ tài liệu, chưa code/DB. Xem docs/MATCHMAKING.md.

- 2026-10-16: Chốt trần danh hiệu/sao: Kỳ Thánh1 sao2800–2899,2 sao2900–2999,3 sao từ3000; đạt đủ thì không tăng bậc/sao nữa nhưng ELO thật vẫn tăng. Thay trần sao2800 trước đây bằng3000, giữ mốc vào Kỳ Thánh2800. Đã áp dụng getRankProgress chung mọi consumer, không đổi UI/geometry/avatar hoặc triển khai tính điểm sau trận/DB.

- 2026-10-16: Theo yêu cầu tăng độ đậm và dày số tên Bạn bè/Xếp hạng: SocialPlayerName giữ weight normal, số bỏ soften (opacity100% thay88%), stroke0.2→0.3px. Giữ phần chữ/font/cỡ/line-box1.4/baseline/hình học; áp dụng cả2 màn qua component chung, phạm vi khác giữ khóa.

- 2026-10-16: Backlog ưu tiên làm sớm bảng Năng lượng3 lựa chọn: video+1,19.000đ/50 năng lượng,40.000đ/vô hạn1 tháng. Xem ../.. /docs/backlog/system/ENERGY-PACKAGES.md (đường dẫn từ root: docs/backlog/system/ENERGY-PACKAGES.md). Chỉ backlog, chưa đổi code/DB; cần chốt số dư vượt trần5/thời hạn/gia hạn và tích hợp thanh toán/video; mua tiền thật giữ yêu cầu tài khoản liên kết.

- 2026-10-16: MySQL mục tiêu8.0.45/cotuong, runtime cotuong_app, không root. Đã thêm mysql2/promise pool lazy tại server/repositories/mysqlPool.ts và CLI server/checkMysql.ts (npm.cmd run db:check, chỉ SELECT1, đóng pool). Node đọc board-game/.env qua --env-file-if-exists cho start/dev:server/db:check; .env.example không mật khẩu, env thật ignored, không VITE_ hoặc log secrets. Chỉ hạ tầng kết nối, repository game vẫn RAM, chưa users/migration/ORM/auth. mysql2 được người dùng ưu tiên cho nhiệm vụ này, quy tắc Prisma chỉ áp dụng khi có Prisma. Chờ người dùng xác nhận kết nối thật trước users. Xem board-game/docs/MYSQL-CONNECTION.md.
- 2026-10-16: Login giữ nút vàng của artwork; nút Google SDK chuyển vào dialog dùng chung (link=false), không chồng nút trắng trên artwork. Giữ GIS popup/nonce/backend verification. Typecheck/build PASS; chưa browser QA/popup thật.
- 2026-10-16: Theo yêu cầu hoàn tác nút login tùy chỉnh/dialog vừa thử; giữ nút Google GIS trực tiếp như trước. Thay ghi chú thử dialog trước đó. Không đổi auth/backend hoặc artwork.
- 2026-10-16: Theo yêu cầu bỏ lớp nút vàng dưới Google, LoginPage dùng login-panel-google.png: imagegen xóa khung kem/vàng, chỉ ghép vùng (190,610,830,185) vào ảnh gốc để giữ nguyên pixel ngoài vùng. Nút GIS trắng giữ nguyên trực tiếp; không đổi auth/geometry. Đã xem asset; chưa browser QA.
- 2026-10-16: Khi Google đã gắn với tài khoản khác, thông báo trong hộp Liên kết chỉ còn “Google này đã thuộc tài khoản khác.” Không đổi xử lý409/không merge hoặc auth.
- 2026-10-16: Trong hồ sơ chính mình, chữ “Chưa có danh hiệu” tăng18→24px; giữ nguyên căn giữa, màu và khung.
- 2026-10-16: Tên Guest hiển thị mới dùng “Kỳ thủ” + 5 số random; guest_code nội bộ DB vẫn 6 số để giữ unique/schema. Guest cũ 6 số vẫn được validate để tương thích, tên tự sinh cũ trong DB chỉ đổi display_name/search_name, không xóa hồ sơ/dữ liệu. Cách vào trên thiết bị mới (tự vào Guest hay hiện màn chọn) đang chờ người dùng làm rõ.
- 2026-10-16 (đính chính): Tên hiển thị Guest mới phải là “Guest” + 5 chữ số random (ví dụ Guest04217), không phải “Kỳ thủ”. guest_code nội bộ vẫn 6 số; tên cũ vẫn được validate tương thích. Đã đổi lại tên Guest cũ trong DB từ Kỳ thủxxxxx sang Guestxxxxx, giữ toàn bộ dữ liệu.
- 2026-10-16: Người dùng mở khóa riêng avatar/khung avatar trong danh sách Xếp hạng cho task này. Ranking API trả avatarCode/avatarFrameCode từ users; hàng dùng AvatarPortrait/AvatarFrameOverlay/getAvatarFrame chung với hồ sơ. Danh hiệu/sao tiếp tục derive Elo thật riêng variant. Giữ slot84px và bố cục, khóa lại avatar/khung Xếp hạng sau task.
- 2026-10-16: Theo yêu cầu sửa riêng ô tìm kiếm Bạn bè: cả Danh sách/Thêm bạn dùng lining-nums/tabular-nums để số thẳng hàng; dữ liệu Friend giữ publicId và bộ lọc chung khớp tên hoặc ID công khai chính xác. API search đã hỗ trợ ID; sửa client không loại kết quả ID vì tên khác query. Giữ layout/avatar; khóa lại phạm vi ô tìm kiếm sau task.
- 2026-10-16: Người dùng mở riêng vị trí cụm avatar/khung/danh hiệu/sao Xếp hạng để hạ2px CSS; không dịch tên/hạng/hàng. Bạn bè mở riêng nguồn avatar/khung thật trên mọi tab: API social/search trả avatarCode/avatarFrameCode; AccountAvatar dùng chung Xếp hạng/Bạn bè tái sử dụng portrait/frame hồ sơ. Giữ slot76px/84px, danh hiệu/sao Bạn bè và layout khác. Khóa lại các phạm vi avatar sau task.
- 2026-10-16: Theo yêu cầu căn giữa cụm Xếp hạng theo chiều dọc hàng: slot cụm124px theo scale, anchor top6px theo scale, thay slot132px/top5px+2px cũ. Giữ avatar84px và tỷ lệ danh hiệu/sao, tên/hạng/bố cục khác. Phạm vi vị trí cụm mở riêng cho task, sau đó khóa lại.
- 2026-10-16: Sửa sót Home.openHistoryPlayerProfile: mở chính mình từ Xếp hạng/Bạn bè/Lịch sử/Tin nhắn luôn dùng dialog hồ sơ chung, không chuyển sang dialog tài khoản Home. ProfileDialog mặc định accountActions=false; chỉ dialog mở trực tiếp từ avatar/header Home truyền accountActions=true. Các nơi khác chỉ Thoát. Giữ nhận diện own và UI khác.
- 2026-10-16: Theo yêu cầu tăng nhẹ khung thông tin hồ sơ: PlayerInfoCard cao thêm16px theo scale, giữ mép trên và mở rộng xuống; gap dòng6→10px. Đồng bộ hồ sơ mình/người khác/preview tùy chỉnh bằng component chung. Không đổi avatar hoặc khung avatar.
- 2026-10-16: Người dùng yêu cầu hoàn tác lần tăng chiều cao khung thông tin và giãn dòng; PlayerInfoCard trở về gap-y-1.5 và chiều cao hồ sơ/preview ban đầu. Không giữ lại biến thể đó.
- 2026-10-16: Catalog Danh hiệu: Tất cả chỉ hiển thị danh hiệu thực sự sở hữu từ DB, người mới rỗng; các tab nhóm vẫn xem được catalog, danh hiệu chưa sở hữu hiện khóa thay dấu cộng và không chọn được. Ba nhóm Chuỗi/Tổng ván/Online theo ownership thật, chỉ mở khi server cấp. Không dùng danh hiệu mẫu để tự mở khóa.
- 2026-10-16: Khôi phục nút cộng trong catalog Danh Hiệu Phong Tặng; chưa sở hữu vẫn không được chọn vào hồ sơ (nút disabled theo ownership), không thay bằng icon khóa trong nhóm này. Ba nhóm cuối giữ khóa; Tất cả vẫn chỉ gồm danh hiệu sở hữu.
- 2026-10-16 (đính chính catalog): Tất cả/Vinh Quang Kỳ Đài/Danh Hiệu Phong Tặng chỉ hiện ownership DB thật, chưa sở hữu thì ẩn. Ba nhóm cuối vẫn hiện danh hiệu chưa đạt với artwork brightness35% và ổ khóa GIỮA thẻ, không khóa ở góc dấu cộng; danh hiệu sở hữu có nút cộng. Giữ xem chi tiết điều kiện khi bấm thẻ khóa.
- 2026-10-16: Sửa ô nhập chat phòng nhảy lên đầu khi chưa có tin nhắn do log hidden mất flex spacer. Chat form mt-auto luôn neo đáy khung ở expanded/collapsed desktop/compact; giữ picker phía trên và toggle. Không đổi gửi/nhận tin.
- 2026-10-16: Theo yêu cầu mở nguồn avatar/khung thật cho chat bàn và Tin nhắn: MessageAccountAvatar dùng AccountAvatar chung, session cho chính mình và Query search cho người khác; cache theo tên30s. Áp dụng chat bàn, danh sách hội thoại trực tiếp, header, avatar tin nhận và popup tùy chọn. Giữ kích thước/vị trí, ảnh nhóm và máy riêng; không thêm danh hiệu vào chat.
- 2026-10-16: Tên trong Tin nhắn dùng SocialPlayerName của Bạn bè làm chuẩn: font-heading/extrabold, stroke chữ0.2px, số font-number90%/normal/opacity100%/stroke0.3px/cùng baseline. Đồng bộ danh sách/header/tùy chọn/thành viên/chọn người tạo nhóm; giữ cỡ theo ngữ cảnh/màu/layout/avatar.
- 2026-10-16: View bàn chơi: bộ đếm tiếp tục từ room.viewers server; danh sách khán giả/xếp hàng bỏ avatar/khung mẫu, dùng MessageAccountAvatar truy xuất tài khoản thật và SocialPlayerName chung Bạn bè. Giữ slot/kích thước/nút queue và dữ liệu hàng từ snapshot.
- 2026-10-16: Theo yêu cầu áp dụng avatar/khung thật trong Lịch sử: Player chung Đã chơi/Đã lưu và avatar hai người ở Thế cờ dùng MessageAccountAvatar/AccountAvatar. Giữ slot51px/34px, tên/kết quả/bố cục và ảnh máy riêng. Phạm vi nguồn avatar mở riêng task, khóa lại sau task.
- 2026-10-16 (đính chính view): bộ đếm mắt ở bàn online tính tổng người đang có trong phòng = players + viewers theo ID socket duy nhất; người tạo/ngồi một mình phải hiện1. Không phải chỉ đếm khán giả. Panel khán giả/queue vẫn chỉ liệt kê viewers, không thay luật ghế/hàng chờ.
- 2026-10-16: Bàn online chưa đủ2 ghế có người thì ẩn nút Sẵn sàng. Lưu thế cờ chỉ khả dụng sau ít nhất1 nửa-nước (match.moveCount>0), disabled nút và guard callback khi0; áp dụng GamePage chung online/local/replay/trial. Không đổi đồng hồ/ready server.
- 2026-10-16: Theo yêu cầu mới, panel người trong phòng hiển thị cả người đang ngồi chơi và khán giả/xếp hàng, khớp tổng bộ đếm mắt. Ghép players chỉ id/name, không dùng ready làm queued để tránh người ngồi bị hiện thẻ chờ. Avatar/khung thật tiếp tục qua component chung; queue controls chỉ dành cho viewers.
- 2026-10-16: Theo yêu cầu tăng riêng avatar/tên thẻ người trong phòng: ô avatar28→36px, tên14→16px, thẻ40→52px đồng bộ watching/waiting. Bỏ filter drop-shadow trên cả thẻ và bóng chữ để tránh raster hóa/làm nhòe chữ/ảnh; giữ avatar/khung nguồn thật và vị trí panel. Phạm vi này mở riêng task, khóa lại sau task.
- 2026-10-16: Tiếp tục giảm nhòe panel người trong phòng: bỏ stroke chữ/số riêng tên kích thước16px; bỏ transform translateY10px của parent, thay tọa độ top/bottom tương đương để giữ vị trí và tránh composite lớp chữ/ảnh. Không đổi typography Bạn bè hoặc các panel khác.
- 2026-10-16: Kết thúc xem thử bàn mẫu Chọn Bàn theo yêu cầu dữ liệu thật. RoomTableGrid chỉ dùng rooms API đã lọc khu vực/trạng thái, bỏ22 previewRooms và đường vào demo. Không có phòng hiện rỗng, không giả người/bàn; Tạo/vào/khóa/ghép nhanh giữ server thật.
- 2026-10-16: Theo yêu cầu tăng tiếp avatar/tên panel người trong phòng: slot avatar36→44px, tên16→18px, thẻ52→64px. Đồng bộ người ngồi/người xem/xếp hàng; giữ xử lý giảm nhòe và panel. Phạm vi kích thước mở riêng task rồi khóa lại.
- 2026-10-16: Theo yêu cầu căn giữa thông báo rỗng trong Lịch sử: Đã chơi/Đã lưu ván dùng1 hàng chiếm vùng còn lại và place-items-center khi không có record; Thế cờ rỗng flex1/grid center. Giữ layout có dữ liệu và typography.
- 2026-10-16: Đính chính thẻ người trong phòng theo yêu cầu: giữ chiều cao gốc h10, cố định rộng166px (thẻ chờ200px có số thứ tự) tránh tên/avatar làm nở khung. Avatar32px/tên18px lớn hơn gốc28px/14px, giảm padding trong để vừa khung; bỏ tăng chiều cao52/64px trước đó.
- 2026-10-16: Tăng chữ thông báo danh sách rỗng Lịch sử và đồng bộ Đã chơi/Đã lưu ván/Thế cờ bằng historyEmptyTextClass chung28px theo scale; giữ căn giữa2 chiều. Không đổi ghi chú hay nội dung hàng có dữ liệu.
- 2026-10-16: Theo yêu cầu mới thẻ người trong phòng cao48px, avatar36px/tên20px, chiều ngang w-fit ôm nội dung thay rộng cố định166/200px; padding trái/phải5px. Đồng bộ người ngồi/người xem/xếp hàng, giữ cách giảm nhòe. Thay yêu cầu kích thước thẻ trước đó.
- 2026-10-16: Giữ kích thước thẻ/avatar/tên vừa chốt; riêng panel người trong phòng dùng image-rendering -webkit-optimize-contrast cho portrait/frame để cải thiện lấy mẫu ảnh nhỏ trên Chromium, số trong tên opacity80% cân nét với chữ (không đổi tên ở Bạn bè/Tin nhắn). Chưa kiểm chứng độ nét trên browser.
- 2026-10-16: Đính chính số trong tên thẻ phòng: opacity100%/cùng màu chữ, không giảm độ sáng. Ép stroke số0px và font-normal để thắng stroke0.3px của SocialPlayerName, giảm độ dày nét thật; giữ font-number/kích thước và chữ.
- 2026-10-16: Căn giữa2 chiều thông báo Chưa có bàn phù hợp và Đang tải danh sách bàn trong toàn khung RoomTableGrid bằng absolute inset0/grid place-items-center; không phụ thuộc chiều cao hàng lưới. Đồng bộ các tab và desktop/compact, giữ font/cỡ/màu.
- 2026-10-16: Theo yêu cầu bỏ Space trong Vị trí tùy chỉnh (Chơi với máy): chặn Space kích hoạt nút đang focus tại CustomPositionPage và GamePage positionTrial. Không chặn nhập dấu cách trong input/textarea/select/contenteditable; phím khác và Space chuyển chế độ replay giữ nguyên.
- 2026-10-16: Sửa giật popup nhóm Tin nhắn do polling1s thay conversationList mất members/creatorName rồi request members bổ sung lại: giữ metadata nhóm cũ trong lúc refresh. Giữ reference threads khi nội dung không đổi để không kích hoạt scroll xuống đáy mỗi poll. Không đổi interval/UI nhóm.
- 2026-10-16: Đổi ảnh nhóm đã nối server thật thay thông báo chưa tích hợp. Frontend chọn ảnh≤10MB, crop vuông/resize256 và encode JPEG; PATCH conversations/:id/avatar kiểm tra JPEG≤120k base64 và owner còn membership. Repository ghi uploads/group-avatars bằng UUID, lưu URL vào avatar_object_key hiện có, rollback lỗi ghi DB dọn file mới. Static/media proxy dev; list trả avatarUrl và mọi vị trí ảnh nhóm đọc cùng URL. Không migration, uploads ignored và cần backup cùng DB.
- 2026-10-16: Tin nhắn: nút mặt cười mở24 emoji/chèn tại caret, giới hạn300 ký tự. Nút ảnh chọn≤10MB, JPEG resize cạnh dài≤720px/nén≤120k base64, xem trước/bỏ ảnh và bấm Gửi. POST conversations/:id/images xác thực membership và send giữ block/idempotency/300char; file UUID uploads/message-images, body lưu đường dẫn /media/message-images/UUID.jpg, render img chỉ khi khớp mẫu path nội bộ nghiêm ngặt; preview hội thoại chỉ 📷 Ảnh. Không migration; static/dev proxy mới, backup uploads cùng DB.

- 2026-10-17: Tin nhắn mở mặc định không tự chọn/tải/đánh dấu đọc hội thoại đầu; vùng chat hiện HOANGBBCG căn giữa hai chiều, Georgia đậm nghiêng/màu #936332 như bàn cờ. Bấm hội thoại, tạo nhóm hoặc Nhắn tin từ hồ sơ vẫn mở hội thoại được yêu cầu. Giữ avatar/bố cục danh sách. Thay quy tắc tự chọn hội thoại đầu trước đây.

- 2026-10-17: Theo yêu cầu mới, riêng chữ HOANGBBCG ở trạng thái chưa chọn hội thoại Tin nhắn dùng trắng kem #fff1d6; giữ font/cỡ/vị trí, không đổi chữ trên bàn cờ.

- 2026-10-17: Ảnh gửi/nhận trong Tin nhắn hiển thị trực tiếp, wrapper sát ảnh không nền/viền/padding/shadow, không đuôi bong bóng/họa tiết hoặc bo cắt ảnh. Tin chữ giữ bong bóng cũ; giữ bấm hiện giờ.

- 2026-10-17: HOANGBBCG mặc định Tin nhắn đổi màu #E6BA86. Khởi tạo selection null và khi đóng reset selection/popup/draft/search để mỗi lần mở tiện ích đều hiện chữ, chưa chọn mục. Mở Nhắn tin đích từ hồ sơ/Bạn bè vẫn theo yêu cầu đích cụ thể.

- 2026-10-17: Sửa ảnh Tin nhắn: bỏ canvas/nền trắng/resize/JPEG conversion, FileReader gửi nguyên bytes PNG/JPEG/WebP/GIF tối đa10MB. Backend validate signature, lưu đúng extension và bytes, parser riêng images14MB. Giữ URL jpg cũ; ảnh gửi căn phải với wrapper min-w-0, bỏ giới hạn min(360px,100%) gây khung rộng lệch. 6/6 regression hiện có PASS; kiểm tra PNG bytes/extension trực tiếp PASS; typecheck/build PASS, dist xác nhận FileReader. Không thêm được regression do EPERM file test; chưa browser QA. Backend cần restart. Ảnh cũ đã flatten trắng không khôi phục alpha, cần gửi lại nguồn.

- 2026-10-17: Popup Năng lượng theo mẫu mới, nguồn 21090d85-e647-4210-8a57-0a9e779a67ea.png, nút X vuông tách riêng thay nút tròn nguồn. Mở từ vùng/nút cộng năng lượng Home. Nội dung100 năng lượng/19.000đ, vô hạn30 ngày/39.000đ, video3 lượt và hồi30 phút là artwork xem UI theo mẫu lần này, chưa đổi nghiệp vụ7 phút/gói đã chốt hoặc triển khai quảng cáo/thanh toán. Nút hành động báo chưa tích hợp, không cộng tài nguyên.

- 2026-10-17: Theo yêu cầu thu nhỏ popup Năng lượng: chiều rộng tối đa1160px/80vw thay1460px/94vw; bỏ hàng mô tả dưới tiêu đề và toàn bộ thanh ghi chú cuối, dồn artwork gọn theo chiều dọc. Giữ tiêu đề Năng lượng/3 gói/nút X. Không thay HOANGBBCG hoặc nghiệp vụ.

- 2026-10-17: Theo mẫu mới, chữ HOANGBBCG mặc định Tin nhắn đổi sang trắng ngả vàng nhẹ #FFF6DF thay #E6BA86; giữ vị trí/cỡ/font.

- 2026-10-17: Thu hẹp thêm popup Năng lượng theo yêu cầu: rộng tối đa980px/68vw thay1160px/80vw, giữ artwork và tỷ lệ.

- 2026-10-17: Hover3 nút Năng lượng căn theo mặt artwork: left6.6/37.8/68.8%,top76.9%,w24.7%,h10.4%; clip góc vát, hover vàng nhạt #fff1b8/30 thay trắng, không dịch/scale.

- 2026-10-17: Bỏ riêng dòng Còn 3 lần hôm nay trên thẻ video Năng lượng; giữ dòng Nhận ngay1 Năng lượng và vị trí/hover các nút. Không triển khai giới hạn lượt video.

- 2026-10-17: Hover3 nút Năng lượng vàng hơn/bớt đục: #ffd34e20% (pressed30%) thay kem #fff1b830/40%; giữ vùng/góc vát.

- 2026-10-17: Nút cộng năng lượng Home mở cùng EnergyDialog như vùng năng lượng; phục hồi tooltip native title đếm ngược home.energyCountdown trên cả vùng và dấu cộng. Vàng giữ thông báo chưa hỗ trợ. Giữ geometry.

- 2026-10-17: Nút X popup Năng lượng tăng rộng4.5→5.2% và cursor-pointer, giữ anchor góc phải và asset.

- 2026-10-17: Tooltip năng lượng Home thay title native bằng bảng nâu viền vàng/chữ kem/mũi nhọn, hiện hover/focus vùng hoặc dấu cộng. Energy>=MAX_ENERGY5 hiện Năng lượng đầy; thiếu mới đếm ngược hồi. Giữ nghiệp vụ hồi7 phút/số dư vượt5.

- 2026-10-17: Bỏ nhãn Cờ Úp phủ phía trên bàn GamePage theo yêu cầu; giữ variant/gameplay/accessibility. Phần bỏ Chơi với máy đang chờ làm rõ nút Home hay nhãn bàn.

- 2026-10-18: Home Cờ Úp chuyển sang phòng online cùng variant jieqi: ghép bàn mở có đúng1 người, hết bàn tạo10 phút/60s theo tỉnh hồ sơ và ngồi chờ, không fallback máy. Quick Cờ Tướng bỏ bàn jieqi. Server xác thực variant, xáo bằng crypto và giữ variant khi reset/đổi ghế; publicRoom che concealed trong broadcast/ack/challenge và archive, không sửa state authoritative. Bỏ nhãn Cờ Úp phủ trên bàn; giữ nút Home Chơi với máy. Thay quy tắc Cờ Úp chỉ local trước đây.

- 2026-10-18: Bấm vùng/nút cộng năng lượng ẩn tooltip ngay qua openEnergy chung; ngăn focus tự khôi phục tooltip sau khi đóng popup, rê lại mới hiện.

- 2026-10-18: Home thêm icon Shop và bánh răng Cài đặt cùng HomeIcon/homeUtilityButton; chuyển bật/tắt nhạc Home vào dialog Cài đặt dùng useHomeMusic hiện có, đồng bộ lối vào compact. Shop hiện báo đang chuẩn bị, chưa có mua hàng. Không thay tiện ích các màn khác. Typecheck/build PASS, dist index-CewNzn9k.js xác nhận settings/music/shop; chưa browser QA.


- 2026-10-18: Theo yêu cầu icon tô đặc, HomeIcon Cài đặt/Shop/Tin nhắn dùng fill currentColor cùng màu vàng nút tiện ích, khoét âm tâm bánh răng/cửa shop/dòng tin nhắn bằng evenodd; giữ kích thước/nút/hành vi. Typecheck/build PASS; dist xác nhận cả3 path đặc. Chưa browser QA.


- 2026-10-18: Người dùng mở riêng vị trí cụm nhận diện Home trong task: dịch toàn cụm avatar/tên/Elo trái10px CSS và cụm tiện ích phải10px CSS, cùng độ dịch; giữ kích thước/khoảng cách trong cụm và thanh tài nguyên giữa. Phạm vi vị trí mới khóa lại sau task. Typecheck/build PASS, dist xác nhận2 offset; chưa browser QA.


- 2026-10-18: Tăng riêng icon bánh răng HomeIcon28→34px theo yêu cầu; giữ khung nút48px và các icon khác. Typecheck/build PASS, dist xác nhận34px; chưa browser QA.


- 2026-10-18: Cài đặt Home thay modal bằng dropdown neo dưới bánh răng, đóng ngoài/Escape/blur; compact dùng chung HomeSettings. Hai công tắc độc lập Tắt nhạc nền và Tắt tiếng (icon nốt nhạc vàng). audioSettingsStore giữ mute trong phiên xuyên màn; GameSounds master gain tắt toàn bộ effects/intro/checkmate/clock kể cả đang phát, không tác động useHomeMusic. Typecheck/build PASS, dist xác nhận dropdown/2 nhãn. Test3 file12 PASS/1 FAIL kỳ vọng intro cũ start(4,2) nhưng code trước task start(2,2), không đổi timing. Regression mới dropdown/mute PASS; chưa browser/audio QA thật.


- 2026-10-18: Thay khung năng lượng/vàng Home bằng nguồn e7544f25-2cc2-4bfb-8fcd-c3f3ff3dd520; imagegen tách nền caro sang alpha thật, crop4 asset v2 trim alpha<=16. Hai khung giữ tỷ lệ tự nhiên, cùng vùng cụm cũ; dùng icon nguồn mới. Dấu cộng thiết kế HTML/SVG tròn vàng nổi20px; giữ số dư/tooltip/callback. Typecheck/build PASS, dist có4 asset mới; đã xem crop/kiểm tra alpha góc, chưa browser QA.


- 2026-10-18: Theo yêu cầu tăng chiều cao khung tài nguyên Home: hai ảnh khung49% rộng giữ nguyên, cao44px thiết kế (compact36px) thay h-auto~29px; cho phép nới dọc artwork trong task. Icon năng lượng/vàng23→32px (compact28), nút cộng20→26px (compact23). Giữ anchor/số dư/callback. Typecheck/build PASS, dist xác nhận44/26; chưa browser QA.


- 2026-10-18: Home tài nguyên dịch icon trái thêm3% bề rộng cụm (8→5%,57→54%), dấu cộng phải thêm3% (41→44%,89→92%); đồng bộ guard tooltip năng lượng theo vị trí mới. Giữ kích thước/khung/số. Typecheck/build PASS, dist xác nhận offset; chưa browser QA.


- 2026-10-18: Theo yêu cầu lấy ô vàng bên phải làm chuẩn, Home hai ô dùng cùng goldFrame; căn số chính giữa từng khung49% tại24.5%/75.5% cụm. Icon trái3%/phải54%, cộng trái41%/phải92%: mọi cặp cách đúng51% bằng khoảng cách gốc2 khung, giữ vị trí tương đối ô phải; giữ size và callback/tooltip. Typecheck/build PASS, dist xác nhận tọa độ mới; chưa browser QA.


- 2026-10-18: Thu nhỏ nhẹ icon năng lượng/vàng Home32→29px, compact28→25px; giữ đồng bộ2 icon, anchor/khung/số/dấu cộng. Typecheck/build PASS, dist xác nhận29px; chưa browser QA.


- 2026-10-18: Dịch cả2 icon năng lượng/vàng Home sang phải đúng3px CSS bằng left calc(3%+3px)/calc(54%+3px); giữ kích thước và mọi thành phần khác. Typecheck/build PASS, dist xác nhận2 offset; chưa browser QA.


- 2026-10-18: Chốt lưu riêng bật/tắt nhạc nền và mute tiếng game qua F5 bằng localStorage co-tuong-audio-music-v1/muted-v1. Đọc boolean có validate ngay khi khởi tạo, ghi mỗi toggle, storage lỗi vẫn dùng trong phiên. Không lưu vị trí bài/đổi playlist.3/3 regression dropdown và module-reload/preferences PASS, typecheck/build PASS, dist có khóa lưu; chưa browser QA reload thật.


- 2026-10-18: Home điện thoại theo bố cục reference tượng trưng, tái dùng asset project: MobileHome riêng compact<=800, hồ sơ trên trái/tài nguyên2 hàng trên phải/banner giữa/carousel2 ô trang1 Cờ Tướng-Chọn Bàn,trang2 Cờ Úp-Chơi Với Máy/thanh6 tiện ích dưới. Quyền đổi geometry avatar chỉ Home compact trong task này, không sửa token/component avatar chung; khóa lại sau task. Desktop giữ nguyên. HomeSettings thêm placement above tùy chọn cho dock, default dưới không đổi. 6/6 regression mobile carousel/callback/settings/audio/quick-wait PASS; typecheck/build PASS, dist xác nhận. Chưa browser QA: phiên không có trình duyệt kết nối (CUA listBrowsers rỗng). Xem docs/MOBILE-HOME.md.


- 2026-10-18: Thêm screen shop/ShopPage phủ viewport theo reference; background49740109 giữ nguyên pixel tại assets/shop/background.png, nguồn references/uploads. Home desktop/mobile cùng useHome.openShop. Sidebar3 mục (2 khóa), filter Tất cả/Avatar/Khung Viền, đúng1 avatar demo500 vàng, preview read-only/không mua/trừ vàng. Tài nguyên thật, cộng năng lượng dùng EnergyDialog; countdown chưa nghiệp vụ hiển thị --:--:--.4/4 regression shop/mobile/home-quick PASS, typecheck/build PASS, dist xác nhận shop/demo/background. Chưa browser QA vì không có browser kết nối. Không sửa UI khóa khác.


- 2026-10-18: Đính chính Shop theo người dùng: trang lớn nhưng nằm trong cùng khung Home, không kéo nội dung tới mép viewport. Shop dùng useHomeLayout/getCrispUiLayout chung: desktop lề ngang120px, dọc6px, compact6px; cùng viền vàng/nâu và nền ngoài xanh Home. Không sửa Home. Regression kích thước frame và chức năng shop1/1 PASS; typecheck/build PASS, dist có data-shop-frame. Chưa browser QA.


- 2026-10-18: Cải thiện rendering khung/icon năng lượng-vàng: ảnh nguồn frame1604x217/icon169x218,222x219 đủ cho kích thước nhỏ. Home dùng width/height/top/left nguyên pixel (sai số làm tròn<=0.5px), bỏ translate trên từng ảnh; giữ geometry danh nghĩa/asset/số/cộng. ResourceArtwork chung dùng -webkit-optimize-contrast riêng resource trên Home/compact/Shop, không áp dụng ảnh khác. Typecheck/build PASS, dist xác nhận sampling; mobile/shop2/2 regression PASS. Chưa browser QA độ nét thực tế, không khẳng định đã xác minh nguyên nhân bằng browser.


- 2026-10-18: Theo ảnh người dùng, dấu cộng tài nguyên chuyển vuông bo4px, nền vàng kem/đổ nổi nhẹ, plus nâu đậm nét bo; ResourceAddButton chung Home desktop/compact/Shop. Giữ slot/vị trí/callback/tooltip. Typecheck/build PASS, dist có surface mới; mobile/shop2/2 regression PASS; chưa browser QA.


- 2026-10-18: Thay khung năng lượng/vàng bằng ảnh2a1666ac-81f6-4519-ad6f-d39df43e1280 theo yêu cầu. Imagegen tách caro sang alpha thật, trim alpha<=16 bbox98,212,1978x278; runtime resource-frame-v3.png. Đồng bộ3 import Home/compact/Shop, giữ slot/icon/số/nút cộng/hành vi. Đã xem crop/góc alpha0; typecheck/build PASS và dist có asset mới. Chưa browser QA.


- 2026-10-18 XEM THỬ UI theo yêu cầu: khung tài nguyên dùng chính player/name-frame.png2137x469 (tỷ lệ4.56 gần ô205.8x44) để màu gỗ nâu/vàng đồng và viền dày khớp khung tên. Đồng bộ Home desktop/compact/Shop, chỉ đổi import nền; giữ slot/icon/số/cộng, không chỉnh asset hoặc PlayerNameplate. Đây là phương án thử, chưa chốt quy tắc lâu dài. Đã xem asset nguồn; typecheck/build PASS, dist cập nhật. Chưa browser QA.


- 2026-10-18: LAN: dev:web vite --host0.0.0.0, vite.config server.host0.0.0.0, server/index default HOST0.0.0.0 (vẫn cho override env). Client Axios relative /api, Socket.IO io() cùng origin; Vite proxy nội bộ127.0.0.1:3001 giữ nguyên/changeOriginfalse để cookie/origin guard đúng, không hardcode loopback client. Smoke tạm không DB: API+WebSocket qua Vite PASS127.0.0.1/localhost/192.168.1.17; backend direct LAN health PASS. Typecheck/build PASS, dist cập nhật; chưa kiểm tra điện thoại thật/firewall từ thiết bị khác. Không đổi UI/gameplay. Cần restart server đang chạy.


- 2026-10-18: Chốt mỗi trình duyệt/site giữ1 Guest bằng cookie thiết bị server; thoát/F5/mở lại khôi phục Guest cũ, không yêu cầu chọn khách lại. /me401 thì POST /api/account/guest/restore, chỉ resume cookie Guest chưa liên kết, tuyệt đối không create; cookie path /api/account/guest gửi được xuống route con. Logout vẫn revoke session, giữ device; restore xóa marker signedOut, dedupe startup tránh xoay2 session. Thiết bị mới/xóa dữ liệu gặp Login và chỉ tạo Guest khi chủ động chọn. Không dùng localStorage/user_id để chứng thực; không fingerprint máy, khác browser/origin là vùng lưu riêng.17/17 test entry/device-service/logout/Google-button PASS; typecheck/build PASS, dist có route mới. Chưa browser/MySQL integration thật, cần restart backend. Không migration/UI/gameplay.


- 2026-10-18: Sửa răng cưa icon năng lượng/vàng: ResourceArtwork thêm smooth=true dùng imageRendering:auto riêng icon (Home desktop/compact/Shop và giá vàng sản phẩm); giữ optimize-contrast cho khung. Không sửa asset/size/anchor. Nguyên nhân code có chế độ tăng nét cùng khung, có thể gây cạnh gắt khi thu nhỏ; chưa xác minh browser. Typecheck/build PASS, dist có smooth flag; chưa browser QA.


- 2026-10-18: Shop dùng gameUtilityButton/GameBackIcon chung thay back tròn; thu biển Cửa Hàng280x72/text36→220x48/text24 theo token, header86→64. HomeResourceLayout chung Home/Shop tính cùng width420scale/frame49% cao44scale/icon29scale/text20scale/plus26scale; không đổi hình học Home. Ba thẻ sidebar từ min-height112 sang fixed102px (thẻ2 trừ10px), cùng cột40px/2 dòng tên/width và căn giữa; compact64px giữ dock ngang.2/2 test shop/mobile PASS, typecheck/build PASS, dist xác nhận mới; chưa browser QA.


- 2026-10-18: Sidebar Shop đổi sang artwork theo reference crop người dùng: imagegen tách/tái dựng2 nền trống active đỏ/viền vàng sáng và idle nâu/đồng, pagoda vàng/đồng,gift,lock thay SVG outline/emoji. Crop alpha<=16, tight6 PNG tại assets/shop; sprite nguồn giữ references/uploads/shop-sidebar-extraction.png. Giữ3 thẻ102px và2 dòng; active hover sáng/pressed scale0.98 dịch1px tối nhẹ, motion-reduce tắt transition.2 mục khóa vẫn disabled, không tự mở nội dung. Đã xem3 crop và kiểm tra góc alpha0; shop1/1 test PASS; typecheck/build PASS, dist xác nhận asset/pressed. Chưa browser QA.


- 2026-10-18: Shop thêm MarketHeading theo crop reference: biển nền nâu gradient, mép cong/viền vàng nâu, title Georgia bold vàng gradient/shadow và baseline cong nhẹ bằng SVG textPath. Hai dải mô tả/clock đồng bộ nâu tối cong, thêm icon đồng hồ; giữ --:--:-- chưa lịch backend. SVG native text/shapes không tạo raster hay font mới, không đổi phần khác. Shop1/1 test PASS, typecheck/build PASS, dist xác nhận path/gradient. Chưa browser QA đối chiếu pixel.


- 2026-10-18: Thu biển nâu tiêu đề Shop100%/max1000→88%/max880, font SVG64→56 theo yêu cầu; title gradient dọc đúng #F7ED96→#FBC12E. Giữ baseline cong/mô tả/countdown và khu khác. Typecheck/build PASS, dist xác nhận2 màu/size; chưa browser QA.


- 2026-10-18: Thu3 dải nền MarketHeading ôm chữ theo yêu cầu: path biển chính rộng716 thay964 đơn vị, giảm phần trống dọc viewBox136→104; dải mô tả w-fit/padding ngang20/dọc2, timer ngang16/dọc2. Giữ font56/gradient#F7ED96→#FBC12E và baseline. Typecheck/build PASS, dist xác nhận path/w-fit; chưa browser QA.


- 2026-10-18: Bỏ lớp nền gradient/viền ngang header Shop, giữ back/biển tên/tài nguyên và geometry. Thu mô tả Hàng thay mới mỗi ngày max25→18px, dòng Làm mới sau max22→16px, countdown1.25→1.15em; compact tương ứng nhỏ hơn. Giữ biển nâu/title chính. Typecheck/build PASS, dist xác nhận; chưa browser QA.


- 2026-10-18: Dải tiêu đề chợ chuyển thanh ngang nới hai đầu (SVGx110..890), giảm chiều cao/path cong ít; nền opacity0.78/viền0.65. Mô tả/timer nới padding ngang28/24px, padding dọc4px; cả cụm gap4px, nền gradient alpha~72–78%, timer bo cong nhẹ. Giữ font/màu chữ/nội dung. Typecheck/build PASS, dist xác nhận padding/opacity; chưa browser QA.


- 2026-10-18: Biển tiêu đề chợ cong nhẹ trên/dưới, radial gradient giữa nâu sáng#78380f→viền gần đen#080301, opacity0.88. Hai dải dưới tăng alpha~87–94% để bớt trong suốt, giữ padding4/font/màu chữ. Typecheck/build PASS, dist xác nhận màu/alpha; chưa browser QA.


- 2026-10-18: Làm lại cụm tiêu đề Shop theo ảnh mới: imagegen trích/tái dựng3 biển nâu sẫm trang trí mảnh, cropalpha<=16 main2072x250/sub1382x168/clock1078x160. MarketHeading dùng background asset ôm chữ/paddingdọc4px/gap4, title Georgia bold baseline thẳng gradient#F7ED96→#FBC12E; mô tả nhỏ và countdown có clock căn giữa. Không đổi nội dung backend, vẫn --:--:--. Đã xem crop/alpha0; shop1/1 test PASS, typecheck/build PASS, dist có3 asset. Chưa browser QA đối chiếu ảnh.


- 2026-10-18: Dịch cụm MarketHeading lên10px CSS; thu thanh3 filter Tất cả/Avatar/Khung Viền ngang100→92% căn giữa, cao64→44px thiết kế, compact40px. Chữ filter Georgia thường18px thay heading24px, compact14px theo mẫu; giữ state filter/hành vi/sản phẩm. Shop1/1 test PASS; typecheck/build PASS, dist xác nhận offset/size; chưa browser QA.


- 2026-10-18: Shop tabpanel mt0 sát dưới filter; thu mỗi tab40px (group calc92%-120px), Georgia bold theo mẫu dòng mô tả. Lưới desktop4 cột2 hàng bằng grid-rows2/flex1/min-h0, card flex để ảnh co theo chiều cao hàng, footer40px; vẫn chỉ1 demo không nhân bản. Compact2 cột giữ responsive. Shop1/1 test PASS, typecheck/build PASS, dist xác nhận grid/width; chưa browser QA.


- 2026-10-18: Shop filter Georgia thường giống dòng Hàng thay mới mỗi ngày; gap3 tab20px cố định. Tabpanel padding20px/lưới gap10px. Bỏ badgeThường và khungvuông/border/glow quanh avatar demo, giữ ảnh tròn căn giữa; preview đồng bộ tròn/không rarity. Không chạm avatar người chơi ngoàiShop. Shop1/1 test PASS trước đổi font/preview; typecheck/build cuối PASS, dist xác nhận3 gap/avatar. Chưa browser QA.


- 2026-10-18: Kiểm tra lỗi font tabShop: chuỗi Khung Viền là NFC đúng U+1EC1, không có khoảng trắng nội bộ. Đồng bộ span nhãn tab với dòng mô tả: Georgia normal/cùng clamp12,1.2vw,18/leadingtight; whitespace-nowrap/kerning normal/wordspacingnormal/NFC/langvi, button flexcenter thay leadingnone. Giữ gap20/khung/state. Shop1/1 test PASS, typecheck/build PASS. Chưa browser QA nên chưa khẳng định nguyên nhân hoặc đã hết lỗi glyph thực tế.


- 2026-10-18: Đổi nhãn sidebarShop mục2 thành Cửa Hàng Cao Cấp (2 dòng Cửa Hàng/Cao Cấp), mục3 thành Sự Kiện (1 dòng căn giữa). Giữ artwork/kích thước/khóa; cập nhật selector test. Typecheck/build PASS, dist xác nhận tên mới; chưa browser QA.


- 2026-10-18: User xác nhận nhãn filter vẫn tách dấu sau lần giữGeorgia; thay riêng3 nhãn bằng Cormorant Garamond600 font-heading/font-semibold đã nhúng local đủ Vietnamese, tránh phụ thuộc glyph/fallback Georgia hệ thống. Giữ NFC/spacing/layout; chưa kết luận nguyên nhân browser vì chưa QA thật. Typecheck/build PASS, dist xác nhận font local600. Cần kiểm tra trực quan lại, không tuyên bố đã xác nhận hết lỗi.


- 2026-10-18: Căn lại3 thẻ sidebarShop: cùng grid3 cột36px/icon, textminmax,12px/lock; gap8/padding12, chữ căn giữa mỗi cột/cùng tâm dọc, ảnh icon nằm ô vuông36/objectcontain thay widthfull heightauto nên gift không tự cao lệch. Active chừa slot khóa rỗng giống2 thẻkhóa. Compact icon24/textflex, lock ghim góc để không ép tên. Giữ khung102px/artwork/trạng thái. Shop1/1 test PASS trước tinh chỉnh kích thước cột; typecheck/build cuối PASS, dist xác nhận. Chưa browser QA.


- 2026-10-18: Filter3 tab Shop dùng ShopFilterTab: chữ local Cormorant tăng clamp12..18→14..20px/bold700, compact14px; thẻSVG góc vát/2viền nâu vàng, selected sáng gradient kem-vàng, hoverbright110/pressdịch1px+dark90. Giữ gap20/kích thước/state lọc. Shop1/1 test PASS, typecheck/build PASS, dist xác nhận text/path; chưa browser QA.


- 2026-10-18: User cảm giác2 thẻsidebar tối nghiêng phải. Code không rotate/skew, artwork cũ bevel/góc/ánh sáng lệch nhẹ; imagegen chỉnh riêng tab-idle-v2 cân trái/phải, rail ngang/dọc, giữ phong cách/màu. Trim alpha<=16 output2150x708/corner0; đổi1 import dùng chung2 thẻ, không đổi text/icon/layout. Đã xem output; typecheck/build PASS, dist cóassetv2. Chưa browser QA cảm nhận sau thay.


- 2026-10-18: User mở2 mục Shop Cửa Hàng Cao Cấp/Sự Kiện để bấm chuyển: sidebar state market, bỏ disabled/lock, selected dùng artworkđỏ/iconvàng, title theo mục;2 mục mới danh sách trống, demo chỉDaily. Avatar demo to hơn nhờ giảm vùng padding16→4px (compact12→4), giữ ảnh tròn. Thay mắt/preview bằng nútMua báo sảnphẩm xemthử/chưa mở bán, không trừ vàng/DB/avatar. Shop1/1 regression switch/filter/buy-no-deduct PASS, typecheck/build PASS, dist xác nhận nhãn; chưa browser QA.


- 2026-10-18: User báo title Cửa Hàng Cao Cấp tách dấu. Chuỗi NFC đúng U+1EA5 (ấ), không phải dữ liệu có khoảng trắng. MarketHeading cònGeorgia trong khi3tabđãfontlocal: đổi toàn cụm heading/mô tả/timer sang Cormorant Garamond600 local Vietnamese, titlefont-semibold khớp face600, langvi/NFC/kerningnormal. Giữ cỡ/màu/nền/geometry. Shop1/1 test PASS, typecheck/build PASS, dist xác nhận font/NFC; chưa browser QA nên chưa xác nhận hết lỗi glyph thực tế.


- 2026-10-18: Theo yêu cầu tăng chữ lớn Shop, MarketHeading tăng tiêu đề desktop clamp28px/3.6vw/52px, compact20px/5.8vw/30px; dùng chung cả3 mục. Giữ font local600, màu và hai dòng phụ. Đây là tinh chỉnh UI xem thử. Typecheck/build PASS, dist xác nhận cỡ mới; chưa browser QA.

- 2026-10-18: Xem thử UI Shop theo yêu cầu tăng hai dòng phụ MarketHeading: mô tả clamp14px/1.5vw/22px, làm mới clamp14px/1.35vw/20px, compact cả hai14px; timer/icon co theo em. Dùng chung3 mục, giữ font/màu/tiêu đề chính. Typecheck/build PASS, dist xác nhận cả2 cỡ; chưa browser QA.

- 2026-10-18: Chơi nhanh/Đấu không bắt khai địa chỉ, ghép ngẫu nhiên mọi khu vực như hiện hành. Đính chính: vẫn được mở Chọn Bàn khi chưa có địa chỉ; chỉ thao tác mở chọn tỉnh/thành phố mới yêu cầu lưu địa chỉ hồ sơ (countryCode có giá trị), thiếu thì giữ màn Chọn Bàn và nhắc chọn trong Hồ sơ. Giữ quyền chuyển khu vực tìm bàn sau khi khai địa chỉ. Giải đấu tương lai cũng phải yêu cầu khai địa chỉ; chưa có luồng giải đấu để triển khai. Không đổi quy tắc lưu địa chỉ một lần hoặc UI hồ sơ. Regression home/presence5/5 PASS; chưa browser QA.

- 2026-10-18: Chọn quốc gia trong VietnamAddressPicker đổi native select sang danh sách nút cuộn ngay trong khung, mỗi hàng dùng CountryFlag SVG thật/tên nước và highlight/check khi chọn. Tái dùng palette/nút danh sách tỉnh; giữ Tiếp/Lưu/Hủy và quy tắc lưu1 lần. Country picker/flag/location4/4 PASS, typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-18: Bổ sung ô tìm quốc gia theo cùng giao diện tìm tỉnh/xã, lọc tên không phân biệt dấu/hoa thường hoặc mã quốc gia; có xóa tìm và trạng thái rỗng. Xóa truy vấn khi chuyển quốc gia↔tỉnh, giữ tìm tỉnh/xã hiện hành.2/2 regression country picker PASS, typecheck/build PASS, dist xác nhận; chưa browser QA.

- 2026-10-18: User báo không lưu được Xã An Nhơn Tây/TP.HCM. Đã xác minh API địa giới mã79/27508 hợp lệ; DB Guest chưa location, thử UPDATE trong transaction rồi rollback thành công (không lưu thay user). Chưa xác định nguyên nhân request thật; browser connector không có tab. VietnamAddressPicker trước che lỗi bằng thông báo chung, nay hiển thị errorMessage API, trạng thái Đang lưu/chặn submit trùng, giữ lựa chọn khi lỗi.3/3 picker tests PASS, typecheck/build PASS, dist xác nhận. Chờ user thử lại lấy lỗi cụ thể; KHÔNG tuyên bố lỗi lưu đã hết.

- 2026-10-18: Sửa Chơi nhanh không địa chỉ bị Tỉnh/thành phố không hợp lệ khi hết đối thủ: applyAccount đặt province rỗng, Home trước gửi chuỗi rỗng tạo bàn. Nay quick xiangqi/jieqi bỏ province nếu trống, roomApi.create cũng chuẩn hóa trường tùy chọn để đồng bộ mọi nơi tạo. Không gán tỉnh giả/không bắt khai địa chỉ khi chơi ngẫu nhiên; chỉ chọn tỉnh trong Chọn Bàn yêu cầu địa chỉ.7/7 quick/presence tests PASS gồm Guest province rỗng ở2variant, typecheck/build PASS, dist xác nhận. Chưa browser QA. Lỗi lưu địa chỉ trước vẫn chưa xác định, không coi là đã sửa.

- 2026-10-18: Đã xác định lỗi lưu địa chỉ Nguồn yêu cầu không hợp lệ: proxy dev5173 gửi Host không khớp Origin dù changeOrigin:false. vite.config thêm sameOriginProxy dùng chung API/media, proxyReq set Host từ incoming.headers.host; giữ kiểm tra nguồn backend nguyên vẹn. HTTP thật trước sửa localhost/127 qua5173 trả403, sau sửa localhost/127/HostLAN đều401 (request không cookie, đã qua origin guard), Origin lạ vẫn403. DB UPDATE rollback trước đó đã xác nhận hợp lệ; chưa thực hiện lưu bằng session người dùng/browser. Typecheck/build PASS; dist rebuild cùng bundle vì chỉ cấu hình dev. Ghi chú chờ xác định lỗi nguồn ở lượt trước đã được giải quyết; user tải lại và thử lưu.

- 2026-10-18: Thêm3 avatar imagegen nữ kiếm khách/lão quân sư/nam tướng quân vào Phiên Chợ Hàng Ngày, cùng demo cũ thành4 sản phẩm; tab Tất cả/Avatar dùng chung map, ảnh tròn/card và giá xem thử500 như cũ. Chưa giao dịch/DB/cấp quyền avatar. Nguồn PNG1254x1254 full-bleed tại outputs/avatar-concepts, runtime src/assets/shop/avatars, prompt tại outputs/avatar-concepts/README.md. Shop regression1/1 PASS; chưa browser QA.

- 2026-10-18: Theo yêu cầu bỏ viền ảnh avatar trong Shop:3 ảnh mới vốn không viền; demo dùng sprite có vòng vàng baked-in, crop hiển thị riêng Shop bằng scale1.12 trong ô tròn overflowhidden để bỏ vòng. Không sửa sprite/AvatarPortrait dùng chung hoặc geometry avatar người chơi. Giữ khung card/giá/nút Mua. Đã xem sprite nguồn, typecheck/build PASS, dist xác nhận crop; chưa browser QA.

- 2026-10-19: Trang quản trị riêng /admin đăng nhập bằng1 mật khẩu (theo chốt user, KHÔNG theo ID tài khoản). Scrypt ADMIN_PASSWORD_HASH chỉ backend/.env; mật khẩu sinh24 ký tự trong board-game/.admin-access.txt ignored, không log/bundle/localStorage. API /api/admin session RAM2h/hash/cookie HttpOnly SameSiteStrict/rate5sai10phút, kiểm tra Origin. AdminService→AdminRepository transaction chỉnh số dư/Elo2variant, grant/equip18avatar/4khung/39danhhiệu, ledger+audit UUID idempotent/lý do. Migration005 thêm2bảng user_cosmetics/admin_audit,001–004 giữ nguyên; runner chuẩn hóa CRLF→LF khớp journal đã xác minh. AvatarPortrait chung hỗ trợ3ảnhShop, picker chỉ thêm avatar đã sở hữu; không đổi geometry. Setup/migration0052bước/verify DB thật PASS, không buff user thật.16/16 unit/React/migration +11/11 MySQLtạm PASS; API live login/catalog/search/logout PASS; typecheck/build PASS, dist xác nhận admin và không chứa mật khẩu/hash. Chưa browserQA. Xem board-game/docs/ADMIN.md.

- 2026-10-19: Sửa sao/danh hiệu trong Thông tin người chơi/Tùy chỉnh và popup thông tin chat: AvatarRankBadge trước thiếu elo nên luôn mặc định1000/Tân Binh1sao. ProfileDialog lấy Elo xiangqi của đúng displayedAccount (hồ sơ mình fallback session.elo), truyền chung sang AvatarCustomization; MessagesOptionsPanel lấy profile đúng người. Không sửa hình học/avatar/star style hoặc công thức sao.11/11 regression profile/realtime-customization/otherplayer/logout/rank PASS, typecheck/build PASS, dist index-BsIxUJLJ.js xác nhận. Chưa browserQA.

- 2026-10-19: Theo user xác nhận hạ khung danh sách avatar bên dưới: offsettop6px thiết kế responsive, đồng bộ panel Chọn avatar/Chọn viền cùngslot; giữ kích thước panel/ô/ảnh và cụm thông tin/preview trên. Đây là chỉnhUI xem thử riêngtask, không mở khóa geometry avatar toànproject. Typecheck/build PASS, dist xác nhận; chưa browserQA.

- 2026-10-19: User đính chính khung nâu đen lấn sao là ranh giới nền phong cảnh ở Tùy chỉnh, không phải panel danh sách. Hoàn tác offsettop6 của2panel avatar/frame; tăng đoạn phong cảnh và overlay tương ứng thêm8px CSS chỉ khi avatarCustomizationOpen để ranh giới nâu đen xuống8px. Giữ avatar/sao/tab/list geometry. Thay cách hiểu lần trước; typecheck/build PASS, dist xác nhận, chưa browserQA.

- 2026-10-19: Thêm bộ bo_3_vien_avatar_03_08_09 từ Downloads vào Shop: viền đỏ03/xanh ngọc08/tím09, tight alpha crop và nguồn tại src/assets/shop/frames/source.md. Product list chung theo kind, Tất cả7/Avatar4/Khung Viền3; objectcontain giữ nguyên tỷ lệ và lỗ alpha. Giá/nútMua xemthử500 theo sảnphẩm cũ, không trừvàng/cấp quyền hoặc sửa frame ngườichơi. Shop1/1 regression lọc/click3viền/no-deduct PASS, typecheck/build PASS; chưa browserQA.

- 2026-10-19: Mua mọi sảnphẩm Shop nay mở ShopPurchaseDialog native modal với tên/giá500 vàng/Hủy/Xác nhận, Escape/bấm ngoài đóng. Hủy không làm gì; Xác nhận vẫn báo xemthử/chưa mởbán, không trừvàng/cấpvậtphẩm/ghiDB. Dùng chung7sảnphẩm và giá chung card/dialog, giữUIcard. Shop1/1 regression bao gồm cancel/confirm/escape/tên-giá/no-deduct PASS, typecheck/build PASS; chưa browserQA.

- 2026-10-19: User chốt Shop mua thật bằng vàng, bỏ demo và chặn trùng: danh mục chuẩn src/lib/shopCatalog.ts giá500; Quan Vũ thay tên Avatar demo. Auth API ShopService→ShopRepository transaction lockuser/resource, checkownership/balance, debit+cosmetics+ledger atomic, requestUUID idempotent. Món đã có mặcđịnh/admin/mua báo Bạn đã có avatar/viền này, khôngtrừvàng; thiếuvàng khôngcấp. UI cậpnhật ngay account/gold/cosmetics, Chọn avatar/Chọn viền đọc kindtươngứng, không tựequip.3viền frame4–6 backendcheckownership, render qua getAvatarFrame chung; chỉ3assetmới bỏcircleclip tránhcắtornament, giữgeometrykhungcũ. Admin7khung đồngbộ. Khôngmigrationmới/khôngmuathử trênDBuserthật.9/9 unit/React +15/15 MySQLtạm PASS gồm concurrency/idempotence/tamper/rollback/equip, typecheck/build PASS, dist index-DmRNrHp6.js xác nhận muaAPI/no-demo. Chưa browserQA. Quy tắc này thay trạng thái xemthử; docs/SHOP.md là chuẩn.

- 2026-10-19: Theo user sửa danh sách Chọn avatar: ảnhmới img trước dùnghcalc không có khung kíchthước riêng nên hiểnthị lớn/cắtngang khác spritecũ. Bọc mọi thumbnail cùng viewport aspect-square/hcalc100%-8/overflowhidden/roundedfull; ảnhcon sizefull, spritecũ scale1.12 cắt vòngvàng baked-in, ảnhmới khôngscale. Chỉ phạmvi thumbnail danh sách theo quyềntask, không sửa avatarpreview trên/khungtrangbị hay AvatarPortrait dùngchung. Typecheck/build PASS, dist xácnhận; chưa browserQA.

- 2026-10-19: User báo avatar mới mờ. Nguồn gốc1254², browserQA không cóbrowseriab nên chưa xác định nguyênnhân renderthực. Dùng imagegen edit3ảnh tăng độ rõ mắt/tóc/contour theo ảnhgốc, lưu -v2 siblings, giữoriginal và prompt nguồn tại src/assets/shop/avatars/source.md. Đồngbộ Shop/AvatarPortrait mọiconsumer, render qua CrispUiImage nativeimg, khôngCSSfilter/Canvas/đổi geometry/mãvậtphẩm/DB. Đã xem3ảnh1254²/fullbleed;5/5 shop/inventory/profile regression PASS, typecheck/build PASS, dist đủ3ảnhv2. Chưa browserQA nên chưa xácnhận hiệuquả thực ở100–150px.

- 2026-10-19: User vẫn thấy avatar mới hơi mờ sauv2. Đổi cách hiển thị3avatar mới sang native CSSbackground cùng môhình spritecũ, backgroundsize150%/position50%35% để mặt chiếm nhiều pixel hơn trong cùng vòng; khôngCSSfilter/Canvas/transformscaleparent và không sửa ảnhnguồn. Shop cũng dùng AvatarPortrait để crop đồngnhất với Hồsơ/Tùychỉnh/bàn/chát. Giữ viewport/kíchthước/vịtrí avatarvàkhung, không thay bậc/DB/quyền sởhữu.5/5 regression shop/inventory/profile PASS, typecheck/build PASS, dist xácnhận. Đây là đổi crop/render, không khẳng định đã đo nguyênnhân mờ bằng browser; chưa browserQA.

- 2026-10-19: User yêu cầu hoàn tác crop150% và dùng file ảnhnhỏ. Đã gỡ backgroundcrop, giữkhungảnhgốc; scripts/prepare-avatar-sizes.ps1 resize deterministic HQBicubic/TileFlipXY từmasterv2 thành36PNG (3ảnh×12cỡ96/128/136/160/192/200/256/272/320/384/408/480). SmallAvatarPortrait dùng srcSet+sizes đoôthật chọnnguồnnhỏ theoDPR; khôngCanvasruntime/filter/zoom/cropmới. Shop vàAvatarPortrait dùngcùng nguồnnhỏ, không đổi geometry/DB. Đã xem3bản128px, QA36/36size/alpha PASS,5/5 regression shop/inventory/profile PASS, typecheck/build PASS; dist36ảnhnhỏ/0masterv2. Chưa browserQA; không khẳngđịnh triệt tiêumọi resample ởmọi viewport.

- 2026-10-19: Theo user chỉ thử1avatar Lão quân sư A/B/C, không rollout. Tùy chỉnh thêm nút mở portal so sánh đúng width preview làm tròn; A giữ SmallAvatarPortrait hiện tại, B Lanczos3 antialias rồi Gaussian unsharp20% sau resize, 1x/2x nguyên pixel48–160, C chờ ảnh/local file chỉ preview. Không đổi equip/DB/geometry hiện hành. Diagnostics runtime báo size/current source/DPR và ancestor filter/transform/scale; objectcover, không scale test.193/193 PNG size PASS,5/5 regression comparison/inventory/profile PASS, typecheck/build PASS, dist index-BHUyrude.js. Chưa browser QA; chưa kết luận B thắng. Nguồn/script và hướng dẫn tại src/assets/shop/avatars/ab-test/source.md.

- 2026-10-19: User gỡ avatar thử Quan Vũ/avatar-0 và avatar thứ hai Nữ kiếm khách/avatar-15 khỏi Shop; avatar-15 ẩn khỏi picker dù cosmetic cũ còn trong dữ liệu. Đã xóa đúng user_cosmetics row avatar/avatar-15 của tài khoản Guest public ID29622295 (ảnh Hồ sơ); account đang dùng avatar-17 nên không đổi avatar hiện tại, không hoàn vàng. Shop catalog bỏ hai SKU nên backend từ chối mua mới; còn Lão quân sư/Nam tướng quân và3viền. Shop UI/inventory tests3 PASS, MySQL integration suite skipped (DB_INTEGRATION chưa bật), typecheck/build PASS dist index-D5DwodzU.js. Chưa browser QA.

- 2026-10-19: Popup thắng/thua: nút Xác nhận cursor-pointer; click mọi vị trí trong bảng hoặc backdrop đóng sau đủ 1000ms kể từ showModal. Escape cũng qua cùng khóa 1s, preventDefault tránh native đóng sớm. Giữ gate hình/audio chiếu bí và thưởng. Regression match-result 10/10 PASS, typecheck/build PASS; dist index-BGEr8t-w.js xác nhận performance.now()+1000/cursor-pointer. Chưa browser QA lượt này.


- 2026-10-20: Xem thử theo user: cả hai Máy giả cho người chơi Đỏ thua sau 2 nước hợp lệ (winner black/resign), không cộng hoặc trừ vàng. Giữ popup/chiếu bí/audio và khóa đóng 1s. Thay tạm luồng thắng thử trước đó; không đổi PvP/Pikafish. 13/13 test service/result PASS; typecheck/build PASS, chưa browser QA/DB integration lượt này.


- 2026-10-20: Sửa mất animation Máy giả: useTestBot trước gán snapshot animation:null. Nay sau API xác nhận, trình diễn nước Đỏ qua applyMoveWithResult/animation dùng chung, chờ PIECE_MOVE_DURATION_MS rồi snapshot+nước đáp máy; nước cuối giữ animation nước Đỏ. Khóa chọn khi animation, guard id/account/animationVersion bỏ phản hồi sau reset/rời. Không đổi kết quả thua thử hoặc DB/luật thưởng. 15/15 tests test-bot-ui/service/match-result PASS gồm animation cả2variant; typecheck/build PASS, dist cập nhật. Chưa browser QA.


- 2026-10-20: User chốt dùng bảng thắng/thua đã duyệt cho online thật. Đối chiếu GamePage/useMatchResult: đã nối online sẵn qua room.game và phe participant, không cần sửa runtime hoặc luật server. Thêm regression cả xiangqi/jieqi: Đỏ thắng/Đen thua, viewer không thấy, đổi phòng dọn; cùng suite giữ gate hình/audio và khóa đóng1s. 12/12 match-result tests PASS; typecheck/build PASS, dist vẫn dùng MatchResultDialog chung. Chưa đấu online 2 browser thật lượt này. Ô thưởng popup online chưa nối, không giả số thưởng; máy giả giữ thua thử2nước, chưa có yêu cầu xóa.


- 2026-10-20: User yêu cầu bỏ hai nút Máy giả Cờ Tướng/Cờ Úp khỏi Home. Đã xóa entry points, hook và khung thông báo lỗi khỏi Home; giữ Chơi Với Máy/Cờ Úp hiện hành. Chỉ gỡ UI; API/test-bot và service backend vẫn còn nhưng không còn nút khởi chạy. Typecheck/build PASS, dist index-B6QlZxvA.js cập nhật; chưa browser QA.


- 2026-10-20: User chốt mặt cười/mặt khóc trên avatar chỉ hiện 5 giây từ kết quả; một người rời/đổi ghế thì tắt cả hai ngay. useResultFaces dùng chung hai PlayerCard, theo room/phase/winner/reason và socket ID từng ghế; snapshot lặp không gia hạn, không gắn kết quả người cũ lên ghế mới, timer dọn khi ván mới/rời. Không thay geometry avatar hoặc popup kết quả. 4/4 regression PASS (5s/snapshot lặp/ghế trống/đổi người/rời ngay snapshot cuối); typecheck/build PASS, dist index-Cqm7HK7W.js cập nhật, chưa browser QA.


- 2026-10-20: Shop sản phẩm đã sở hữu dùng lớp phủ đen60% toàn card và ảnh chữ Đã mua user5fc33724 giữa card/rộng85%, chung avatar/khung và các tab. Dùng ownsCosmetic(account,product), account reactive nên hiện ngay khi API mua xong/khi tải lại; giữ chống mua trùng hiện có. Ảnh nguồn2172x724 giữ references/uploads; loại alpha<=16 nhiễu vô hình rồi tightcrop x516/y234/1134x268, đã xem PNG và giữ artwork. Shop regression1/1 PASS gồm before/after mua và món chưa sở hữu; typecheck/build PASS dist index-ZNYKu36_.js và purchased asset. Chưa browser QA.


- 2026-10-20: Theo ảnh user, thu nhỏ chữ Đã mua Shop từ85% xuống60% chiều rộng card, neo50%/50% và translate-50% để căn giữa ngang/dọc toàn ô. Áp dụng chung avatar/khung, giữ overlay60%. Typecheck/build PASS, dist xác nhận class mới; chưa browser QA.


- 2026-10-20: Theo ảnh user, riêng Cửa Hàng Cao Cấp đổi dòng phụ thành Hàng thay thế mỗi tuần; MarketHeading nhận subtitle, các mục khác giữ mặc định. Chỉ đổi chữ UI, chưa triển khai lịch refresh backend. Typecheck/build PASS, dist xác nhận chữ mới; chưa browser QA.


- 2026-10-20: User chốt Shop Sự Kiện dòng2 Chưa có sự kiện. Phiên Chợ Hàng Ngày Làm mới sau đếm HH:MM:SS đến0h Việt Nam UTC+7, qua ngày lặp24h; tính từ Date.now mỗi tick, focus/visibility cập nhật, đổi tab/unmount dọn timer/listener. Số tăng1.3em→1.6em, camvàng#ffad24 đậm hơn và glow5/12px; kiểu số chung MarketHeading. Cao Cấp giữ dòng tuần và placeholder thời gian; Sự Kiện không giả lịch. Đây là đồng hồ UI, chưa tự đổi catalog/backend khi qua ngày.3/3 tests countdown/shop PASS gồm midnight/resume/cleanup, typecheck/build PASS; dist xác nhận nhãn/style/hook. Chưa browser QA.


- 2026-10-20: User xác nhận web mobile + xem UI điện thoại trên laptop. Thêm /mobile-preview (dev và npm start) dùng MobilePreviewPage/iframe same-origin / với viewport thật360x800/390x844/430x932, xoayngang/dọc, tự scale vừa vùng laptop và Tải lại. Outer preview không mount EntryGate/Providers/socket riêng; iframe dùng app/mobile compact và tài khoản hiện có, đổi cỡ không reload iframe. Không sửa geometry/avatar/bố cục khóa hoặc tách gameplay mobile. 3/3 tests preview/HTTP route/MobileHome PASS, typecheck/build PASS; HTTP live5173/mobile-preview và3001/api/health200, dist xác nhận. CUA và node_repl lỗi khởi động runtime nên chưa browser QA trực quan. Link dùng http://localhost:5173/mobile-preview hoặc3001/mobile-preview khi npm start.


- 2026-10-20: Theo2ảnh user, bổ sung2ôElo dưới tên Home mobile (elo-frame/red-general/concealedPiece cósẵn, Elo thật theo2variant), cúp🏆 cùng biểu diễn desktop trên banner. Dock6nút dùng homeUtilityButton+HomeIcon/HomeSettings chung desktop, bỏ bộ nền/góc bo riêng mobile. Ô4chếđộ cùng aspect561/701 và width, đồng bộ offset/clip source qua homeModeArtwork dùngcảdesktop/mobile; desktop giữnguyên thôngsốcũ, mobile căn plaque ChọnBàn+50/ChơiMáy+55 để ngang hàng. Khôngđổi avatar/khung/nameplate geometry khóa. MobileHome regression1/1 PASS gồm2Elo/cúp/6nútshared/callbacks/carousel/settings; typecheck/build PASS, dist xácnhận. Đã đốichiếu source ảnh2ôvà thôngsốreference; chưa browserQA trựcquan (CUA/node_repl lỗi runtime ởlượttrước).


- 2026-10-20: Theo ảnh/yêu cầu user mở đúng phạm vi Home mobile để thu avatar/tên/Elo: avatar20→17cqw (khóa lại sau task), nameplate28→25cqw/left19;2Elo cùng hàng grid2 top11/width37cqw, font3cqw. Vàng/năng lượng35→30cqw, h8→7 và icon/chữ/nút+ giảm tương ứng. Giải đấu76→90%/top25%, cúp13→15cqw. Riêng ChọnBàn/ChơiVớiMáy mobile scale1.07 neo plaque84% để cân kíchthước với2ôcòn lại, giữ offsetchung và ngang tên. Chỉ MobileHome, không sửa desktop/token avatar toànproject. Typecheck/build PASS, dist xácnhận layoutmới; không thêm test cho tinhchỉnh size, chưa browserQA trựcquan.


- 2026-10-20: User chỉnh Home mobile: Giải đấu top25→21%; nameplate rộng37cqw bằng tổng2Elo dưới, giữ height5.3cqw/font3.3cqw để không đè Elo; left19cqw giữ. Hạ riêng2ô bênphải ChọnBàn/ChơiMáy thêm20px trên canvas701 (co theo kíchthước), giữscale1.07. Chữ6nhãn dock2.7→3.2cqw. Quyền user chỉmở rộng khungtên mobile tasknày, khóa lại geometry mới; avatar vàdesktop khôngđổi. Typecheck/build PASS, dist xácnhận class/offset mới; chưa browserQA, không thêm test size.


- 2026-10-20: User chỉnh Home mobile: thu2ô bêntrái CờTướng/CờÚp scale0.94 (phải1.07 giữ), tănggap3→6%. Bỏ margin6px/border3px/shadow và lớpviềnvàng ngoài Home compact, section h-dvh w-full để nền đầy viewportđiệnthoại; không bỏ khungthiếtbị ở /mobile-preview. Khungtên được user mở đúngphạmvi tăngheight5.3→6cqw, width37/font3.3/left19 giữ, khôngđè Elo top11; khóa lại sau task. Typecheck/build PASS, dist xácnhận; chưa browserQA, không thêmtest thayđổi size.


- 2026-10-20: User báo ômobile bênphải to hơn sau thuôtrái. Giảm riêng ChọnBàn/ChơiVớiMáy scale1.07→0.94, đồngnhất4ô0.94; giữ vịtrí/gap6%/mobileDrop20. Typecheck/build PASS, dist xácnhận; chưa browserQA.


- 2026-10-20: User yêu cầu nâng ôbênphải mobile ngang ôtrái. Bỏ phần hạ riêng20px canvas (mobileDrop0 thay20) choChọnBàn/ChơiVớiMáy; giữoffsetảnhchung50/55, scale0.94/gap6%. Typecheck/build PASS, dist xácnhận; chưa browserQA.


- 2026-10-20: Xem thử theo user tăng nhẹ2ôbênphải mobile: ChọnBàn/ChơiVớiMáy scale0.94→0.97 (khoảng3.2%), giữneo/offset/mobileDrop0 và ôtrái0.94. Typecheck/build PASS, dist xácnhận; chưa browserQA.


- 2026-10-20: User yêu cầu ôphải tothêm và cácbảng mobile cao hơn (ảnh Hồsơ, gọi rõ Bạnbè/Xếphạng). Ôphải ChọnBàn/ChơiMáy scale0.97→1, trái0.94/offsetgiữ. Thêm mobileDialogHeight dùngchung useProfile/Friends/Ranking/HistoryLayout: portrait<=800px cao82%viewport (chừa48px), giữscalechiềurộng/font/avatar; landscape/desktop giữnguyên. Hồsơ phầnTùychỉnhavatar khôngđổi (avatarHeight/Scale cũ); Chat kếthừaRankingLayout cũngcao hơn. Usermở đúngchiềucao ngoài/vùngnộidung cáckhung mobile trongtasknày, sau taskgiữkhóa lại; khôngđổi geometryavatar/row/button desktop.3/3 tests layout+mobileHome PASS gồmresize/giữscale/desktop; typecheck/build PASS, dist index-C72LcB1Z.js. Chưa browserQA trựcquan.


- 2026-10-20: Theo yêu cầu user, nới các dialog mobile portrait từ lề tổng32px xuống20px qua mobileDialogMargin (Hồ sơ/Bạn bè/Xếp hạng/Lịch sử và Chat kế thừa), giữ desktop/landscape. Chỉnh riêng Thông tin compact: header190→270, cột avatar145→180, avatar tăng25% bằng calc128*1.25, brown card h270 và hẹp theo cột mới, bỏ translateY-21 riêng compact. PlayerInfoCard nhận mobileExpanded cho card Hồ sơ thường, không Tùy chỉnh: tên34→38, chip Elo min-h54, thông số cho wrap khi hẹp. Thống kê132→170, nhãn/chữ/số lớn hơn; vùng Danh hiệu flex còn lại giảm tương ứng. Footer Liên kết/Đăng xuất min-width240, padding/chữ tăng compact. User mở đúng avatar/profile geometry và chiều ngang khung mobile cho task này, khóa lại sau task.6/6 tests mobile-dialog-layout/profile-logout/profile-rank-sync PASS; typecheck/build PASS dist index-i-N9o_7i.js. Chưa browser QA trực quan.


- 2026-10-20: User tinh chỉnh Thông tin mobile: hạ card nâu thêm8px logical (co theo scale), nâng toàn popup6px CSS qua translate riêng compact (không áp dụng Tùy chỉnh/địa chỉ/Danh hiệu full). Cụm Sở hữu nâng3px logical, items-center/leading-none; số từ20px cốđịnh xuống1em bằng nhãn ởcompact. Desktop giữnguyên stylecũ. User cho dịch đúngcard/task này; khóa lại sau sửa. Typecheck/build PASS, dist xácnhận; chưa browserQA, không thêmtest offset.


- 2026-10-20: User xác nhận rõ nâng biển Thông tin và hạ mép trên khung nâu lớn xuống hàng2ô Cờ Tướng/Cờ Úp. ProfileDialog thường compact tách layer nền/viền khỏi content; top nền=270+76 logical theo token header, đáy giữ như cũ, cornerSVG trên đi cùng top mới. Hai lớp skin cũ transparent riêng compact, content/avatar/card/thống kê giữ vị trí. Biển tiêu đề nâng12px logical. Không áp dụng desktop/Tùy chỉnh/địa chỉ/Danh hiệu full/popover.4/4 profile-logout/rank-sync PASS, typecheck/build PASS, dist index-DwMmE4YF.js xác nhận. Chưa browser QA trực quan. Quyền mở đúng skin/biển Hồ sơ mobile task này; khóa lại sau task.


- 2026-10-20: Đính chính theo ảnh/user: khung nâu phải bao toàn bộ bảng Thông tin, không bắt đầu từ2ôthống kê. Đã hoàn tác skin tách/lùi top346 ởlượt trước (hiểu nhầm yêu cầu), khôi phục nền/viền/corner đầy đủ. Nâng riêng PlayerInfoCard compact từ+8 sang-12px logical (~10px CSS lên so với trước), giữ avatar/biển đã nâng/kíchthước còn lại. Typecheck/build PASS, dist xácnhận bỏ --mobile-profile-panel-top và offset mới; chưa browserQA. Quy tắc này thay ghi chú tách khung ngay trước.


- 2026-10-20: Theo user, riêng Hồ sơ compact kéo profileScene từ238 lên506logical (=270header+170stats+66banner/gap) để nền avatar kéo xuống qua hàng2ô CờTướng/CờÚp; chỉ mobileProfilePanel thường, không Tùy chỉnh/địa chỉ/desktop. Nâng card tên/Elo thêm8logical: compact translate-12→-20. PlayerInfoCard mobileExpanded tăng nhãn Bạn bè/Theo dõi/Lượt thích/Địa chỉ19→22logical; số22 giữ cùng cỡnhãn; ID15→19 và sánghơn. Giữ khung nâu bao toàn bảng/geometryavatar. Typecheck/build PASS, dist xácnhận; chưa browserQA, không thêmtest typography.


- 2026-10-20: Theo user chỉnh Hồ sơ mobile: profileScene ngắn lại506→302 logical tới mép trên stats sau nới, mask gradient đen65%→transparent100% hòa vào nền nâu. Stats giữ khungdòng170 và mépdưới, mỗi card cao thêm28logical rồi translateY-28 (tổng198) với gridrow minmax0 để không đẩy nội dung; khoảngtrống phía trên sau cardinfo đủ32logical. Danh hiệu tiêu đề/Chưa có danh hiệu24→30, Sở hữu22→28 và số1em đi cùng. Chỉ compact, desktop/Tùy chỉnh khôngđổi. Typecheck/build PASS, dist xácnhận gradient/neođáy/chữ; chưa browserQA, không thêmtest style.


- 2026-10-20: Hoàn tất yêu cầu trước kiểm tra VPS: stats mobile phần nới lên giảm28→16logical, giữ mép dưới; vùng preview danh hiệu flex-fill riêng compact để Chưa có danh hiệu ở giữa cả vùng, desktop giữh220. User chọn cấp thật: đã đối chiếu duy nhất Guest81416/publicID29622295, cấp39/39 qua AdminService/AdminRepository với equipfalse và UUID/lýdo/audit, DB readback39 sở hữu/0selected; gold/energy/avatar/stats khôngđổi. Đây là thay đổi dữ liệu Local được user cho phép, không liên quan VPS. Script tạm đãdọn. Build PASS dist index-85xgulgP.js; chưa browserQA.


- 2026-10-20: User báo Google khônglogin và Guest mới mỗi lần npm dev trênđiệnthoại. User xácnhận Chrome/Safari thường cùnghttp://192.168.1.12:5173. Đốichiếu Local2clientID có/match, productionfalse; live LAN /google/nonce200, cookie HttpOnly/Strict/Securefalse, không tạouser/đụngDB. Google official cấmrawIP/nonHTTPS trừloopback; thêm googleOriginError + GoogleSignInButton giải thích địa chỉkhônghỗtrợ, bỏ tảiSDK/nonce vònglặp trênLANIP, khôngfakeGoogle. Phát hiện restore bắt mọilỗi thànhentrynull: sửa restoreError và EntryGate Thửlại cho non401, chỉ401 thiếucredential mớiLogin; thànhcông/logout xóaerror. Khôngthaycookie/auth/backendDB.26/26 entry/origin/Googlebutton/device-service/verification PASS; typecheck/build PASS dist xácnhận. Chưa táihiện nickmới trênmáythật nên khôngkhẳngđịnh đãsửa nguyênnhân mấtcookie; cần thửlại đúngIP/browser sau reload. HTTPSdomain đãđăngkýGoogle cầnthiết choGloginđiệnthoại, khôngchỉthêmIPLAN vàoorigins.


- 2026-10-20: Theo ảnh user, thanh tiện ích Home mobile theo thứ tự Xếp hạng → Lịch sử → Bạn bè → Chat → Cửa hàng → Cài đặt → Toàn màn hình. Tái sử dụng HomeIcon/homeUtilityButton và home.fullscreen, chia 7 cột, nút co theo 11cqw tối đa48px. Chỉ mobile. Regression mobile-home 1/1 PASS, typecheck/build PASS; chưa browser QA.


- 2026-10-20: User bỏ Toàn màn hình riêng điện thoại; Home mobile còn 6 nút Xếp hạng → Lịch sử → Bạn bè → Chat → Cửa hàng → Cài đặt, chia đều 6 cột. Từ đây các yêu cầu UI hiện tại chỉ sửa mobile, giữ nguyên laptop. Không sửa component/hành vi desktop. Mobile-home 1/1 PASS; typecheck/build PASS, dist index-cbOcM9Cr.js cập nhật; chưa browser QA.


- 2026-10-20: CI/CD Local: .github/workflows/ci.yml push/PR master Node22, npmci/typecheck/fulltest/build và MySQL8 runner cô lập; deploy.yml chỉ manual exact SHA master có push CI success, Environment production, strict SSH hostkey, concurrency. deploy-vps.sh backup hook root-owned bắt buộc (chưa biết hệ thống backup VPS), build staging/snapshot/verify schema cả2bản, không DDL/restoreDB, health/rollback code chỉ khi reviewer xác nhận data-compatible; pending migration dừng và cần quy trình quản trị tạm quyền+finally/revoke riêng. Chưa push/SSH/deploy thật. Fulltest314PASS/59FAIL/17SKIP (giữCIđỏ), MySQLtạm17/17+migrate/rerun/verify/smoke PASS, Bashsyntax/typecheck/build PASS; LocalNode24, chưa nghiệmthu Node22/GitHub/Ubuntu/rollback. Chi tiết docs/CI-CD.md. Không đổi UI/game/auth hoặc DBproduction.


- 2026-10-20: User xác nhận trong task CI: khôi phục hiệu ứng OpeningCover dùng chung về600ms theo tài liệu, thay1500ms trong implementation. Áp dụng các màn dùng cùng cover (Game/Chọn Bàn/Chơi với máy), không đổi intro1300ms/clock/luật hoặc geometry UI.


- 2026-10-21: User xác nhận có thể bỏ phần So sánh độ nét avatar A/B/C. Giữ UI đã bỏ tính năng; không đưa lại để vượt test. Regression avatar-comparison được giữ file và chuyển sang kiểm tra preview/chọn không tự equip, Hủy không đổi avatar, Sử dụng áp dụng đúng và một lần.


- 2026-10-21: Hoàn tất sửa CI Local: phân loại59 lỗi ban đầu (28 harness/môi trường,25 kỳ vọng cũ,6 thông báo backend UTF8; xem docs/CI-TEST-AUDIT.md). Sửa literal RoomService/aria-label thứ tự chờ, test/harness/provider/fixture theo quy tắc hiện hành; không đổi engine/gameplay/auth/DB schema. User chọn OpeningCover600ms và cho bỏ A/B/C; giữ test file avatar-comparison, kiểm tra preview không tựequip/Hủy/Use đúng và một lần. Full cuối378PASS/0FAIL/17 gateDB (tổng395), MySQLtạm17/17+migrate30/rerun0/verify/smoke PASS; typecheck/build PASS dist index-WmLSGyiZ.js. Đối chiếu baseline không mấtfile/không giảmcase, skipgatesgiữnguyên; thêm5case, khôngskip/only/retry/tăngtimeout. Giới hạn1worker sau khi2worker còn timeout khôngổnđịnh. Chưa commit/push/SSH/VPS/deploy/browserQA; LocalNode24, GitHubNode22/Ubuntu chưachạy.



- 2026-10-21: Theo yêu cầu user, GamePage mobile bỏ lề/viền ngoài để bàn rộng bằng viewport khi đủ chiều cao, giữ tỷ lệ bàn và căn giữa màn hình. Người dùng (leftSide) sát trên, người thứ hai sát dưới qua grid 3 hàng cân nhau; user mở đúng vị trí hai PlayerCard mobile trong task này, giữ kích thước avatar và desktop, khóa lại vị trí sau task. Tiện ích gom dưới nút ba gạch dùng gameUtilityButton, Chat/người xem/hàng chờ chỉ hiện cùng menu. useBoardLayout dành 260px cho hai vùng người chơi, màn thấp vẫn co bàn để vừa. Typecheck/build PASS, dist cập nhật và xác nhận Menu bàn cờ; chưa browser QA trực quan.


- 2026-10-21: User sửa GamePage mobile: hai avatar cách mép trên/dưới viewport5px, bản thân ở trên; bỏ translate âm cũ của user/tên/clock mobile và neo hai card absolute để không phụ thuộc chiều cao hàng grid. Kích thước avatar giữ60px, quyền thay vị trí chỉ GamePage mobile và khóa lại sau task. Thoát vào menu, Toàn màn hình ẩn mobile, Ghim/Lưu hiện ngoài menu với điều kiện enable cũ. Desktop giữ bố cục. Typecheck/build PASS, dist cập nhật; chưa browser QA trên điện thoại thật.


- 2026-10-21: User chốt vị trí GamePage mobile: avatar trên bên trái cách mép10px, avatar dưới đối xứng bên phải cách mép10px, thông tin nằm phía trong đối diện avatar. Giữ mép trên/dưới5px và kích thước60px đã chốt, desktop giữ nguyên. Quyền chỉnh đúng vị trí mobile task này, khóa lại sau task. Typecheck/build PASS, dist cập nhật; chưa browser QA trực quan.


- 2026-10-21: Theo user, GamePage mobile tăng mép trên/dưới avatar5→15px; user z40 trên lớp trang trí z10. Thanh tiện ích chuyển xuống trái10px/bottom25px (căn giữa avatar dưới60px/bottom15px), thứ tự ba gạch→Ghim→Lưu; nút mobile40px/gap8 để vừa cạnh card188px ở viewport360px, menu bung lên trên. Desktop giữ thứ tự/kích thước cũ. Quyền chỉnh đúng mobile task này, khóa lại sau task. Build/typecheck PASS, dist cập nhật; chưa browser QA trực quan.

- 2026-10-21: Backup Adapter cho CI/CD theo VPS user xác nhận: cotuong-backup.sh/service -> OnSuccess cloud service, cotuong-YYYY-MM-DD_HH-MM-SS.sql.gz. Thêm Python stdlib root-only hook2action, gzip/SQL markers/SHA256/age/newfile gate, đợi local và lần cloud mới hoàn tất; không đổi backup cũ, không SQL/restore/productiondeploy. Sudoers exact commands, hướng dẫn cài/audit/VM staging/restore drill tại docs/BACKUP-ADAPTER.md. Gate tạo mới trước activate sau prepare/snapshot; workflow dùng script từ trusted checkout, kiểm port1..65535.25 adapter tests PASS bằng fixture/mock, Bash syntax PASS, npm.cmd run build(typecheck+Vite)PASS dist index-BqK419Up.js. Chưa nghiệmthu Ubuntu/systemd/sudo/Drive/restore, chưa SSH/cài/push/deploy; gzip và cloud exit0 không chứng minh restore hoặc remotechecksum. Reviewer phải kiểm bằng chứng offsite/restore riêng trước duyệt.


- 2026-10-21: User chỉnh nhận diện GamePage mobile: nameplate120→144px/chữ tăng theo tỷ lệ, số trong tên override1em thay0.9em; Elo rộng144px bằng nameplate. Hai card rộng212px, grid đảo cột bên dưới; avatar60px căn giữa theo hàng tên+Elo, thông tin/clock/actions giữ riêng. ViewersButton luôn hiện ở góc trên phải10px/top15px thay nằm trong menu; Chat/hàng chờ vẫn theo menu. Thanh3nút mobile36px/gap6 để không đè card212px ở360px. Desktop giữ nguyên; quyền chỉnh geometry đúng mobile task này, khóa lại sau sửa. Typecheck/build PASS, dist cập nhật; chưa browser QA trực quan.


- 2026-10-21: User tinh chỉnh GamePage mobile: khung tên144→132px/card212→200px; Elo bỏ width144, ôm nội dung với padding ngang5px. ViewersButton h26/minwidth48, icon24x18/số13px; useBoardLayout đo tâm data-player-identity bằng ResizeObserver, truyền CSS var để căn dọc nút theo tên/Elo. Ba nút dưới36→40px/gap6 giữ thứ tự ba gạch/Ghim/Lưu. Desktop giữ nguyên, geometry mobile chốt lại sau task. Typecheck/build PASS; dist xác nhận token132px/40px/viewer center. Chưa browser QA trực quan.


- 2026-10-21: User chỉnh GamePage mobile: card dưới đảo identity/avatar xuống hàng2, clock lên hàng1 để cân mép nhận diện với card trên15px. Elo padding ngang10px; 3nút dưới44px/gap4. Sửa stacking: main compact isolate, scene compact isolation:auto/nền transparent cho user z80/60 thật sự trên decoration z10; wrapper user pointer-events:none/card auto tránh chặn nút. View panel neo ngay dưới mắt (tâm+22px)/right10/width280/z100 trong nhánh user trênz80, footer mắt z90 giữ toggle trên panel. Thẻ view/chờ mobile36px, avatar24px, tên14px/sốchờ20px, padding/gap nhỏ; nền panel gần đục. Desktop giữ nguyên. Quyền user mở đúng geometry mobile task này, khóa lại sau task. Typecheck/build PASS, dist cập nhật; chưa browser QA trực quan.

- 2026-10-21: User yêu cầu sửa lệch bảng Danh hiệu mobile, nútẨn chỉ nằm cạnhX và nâng tab. HonorsFrame giữ kíchthước/vịtrí bằngThôngtin; căn biển ảnh về50%, rộng50% để chừa gócphải. Mobile chia grid48px header/rowtab ảnh cuộnngang/content minmax0 thay top12%/24% theo chiều cao. NútẨn compact riêng catalog26x15, neo cạnhX, không đẩy tiêuđề; X ôm sát ảnh28px. Giữartworkgốc/tab120px/catalog3cột/desktop/ownership. npm.cmd run build(typecheck+Vite) PASS, dist index-B-q8DOiP.js cậpnhật; chưa browserQA trựcquan, không chạytest ởtaskUI này.

- 2026-10-21: Theo user tinh chỉnh Danh hiệu mobile: nâng hàngtab thêm10px (header48→38), nútẨn nâng6px và to30x18/nhãn13px, biểnDanhhiệu rộng50→54% nâng4px; catalog đổi2cột (thay quy tắc3cột mobile trước), desktop vẫn3cột. Giữ artwork/tabảnh cuộn và khung bằngThôngtin. npm.cmd run build(typecheck+Vite) PASS, dist cậpnhật/xácnhận2cột/header38px. Chưa browserQA trựcquan.


- 2026-10-21: User tinh chỉnh GamePage mobile: avatar60→64px (danh hiệu/sao kế thừa tỷ lệ cùng avatar), cột64px giữ card200px; nameplate132→128px, sốtên1em→0.9em. Elo khung cao30→28, giữ padding ngang10, icon15→18/số13→15, gap6→3px. Ghim chỉ ẩn mobile, thay bằng nút Chat44px dùng gameUtilityButton/HomeIcon messages, thứ tự menu/Chat/Lưu; nối toggle bảngchat hiện có, aria expanded/controls, gỡ nút Chat phụ trong menu. Chat chỉ xuất hiện nơi hỗ trợ chat hiện hành, không tạo chat máy/replay. Desktop giữ nguyên. Quyền user mở đúng nhận diện mobile task này, khóa lại sau sửa. Typecheck/build PASS, dist cập nhật; chưa browser QA trực quan.

- 2026-10-21: User chỉnh Danh hiệu mobile: nútX tăng28→32px, top-1px để tâm vòngX ngang tâmẨn(top6+9px); Ẩn cáchphải42px. Danh sách2cột chặn overflowx/touch-pan-y, thanhnhóm vẫncuộnngang. TabTấtcả bỏ ảnhbaked-selected, dựng bảnthường bằng đúng nền/icon/chữ của desktop. Mọi tab dùng honorsSelectionFrame/mix-blend-lighten cùngdesktop khi chọn, bỏdrop-shadow riêngmobile. Khôngđổi desktop/ownership. npm.cmd run build(typecheck+Vite) PASS, dist index-D-4IAtxZ.js xácnhận. Chưa browserQA trựcquan.


- 2026-10-21: User chốt Chat GamePage mobile mở phủ phần dưới: wrapper fixed inset-x0/bottom0/fullwidth, cao khoảng trống dưới bàn +45% chiều cao bàn (CSS calc((100dvh-boardHeight)/2+boardHeight*.45)); Chat h-full/nền gần đục phủ user/nút phía dưới, desktop giữ layout cũ. Bấm Chat mở tự expand nếu collapsed, đóng menu/người xem; giữ danh sách tin nhắn flex phía trên và form/icon mt-auto/shrink0 phía dưới, cuộn nội bộ. Không sửa socket/chat data. Typecheck/build PASS, dist xác nhận fullwidth/bottom0 và công thức CSS đã biên dịch; chưa browser QA trực quan.

- 2026-10-21: User báo viềnsángtab khôngphủhết/chữPhongTặnglệch mobile. Overlaytab dùng116%x140%, left-8/top-20 theo tỷlệdesktop để bù alpha. PhongTặng dùng helperanchor chung theo tâmnềntímảnh1500x500, centerY cấp1..5=285/270/265/250/250 vàscaleY1.36, áp compact vào catalog/preview/detail; giữ tọađộdesktop, lineheightmobile1.1 để chữ giữa ô. Không đổi artwork/ownership/số cột. npm.cmd run build(typecheck+Vite) PASS, dist index-BJ45t_Wi.js xácnhận overlay/anchor. Chưa browserQA trựcquan.


- 2026-10-21: User chốt Chat mobile bỏ mũi tên thu/mở (desktop giữ), bỏ nútĐóng; useMobileChatOverlay đóng khi pointerdown ngoài container, bỏqua nútChat, blur ô nhập và dọn listener. Khung giữ chiều cao từ trước bànphím, neo đáy theo visualViewport.height/offsetTop và layout viewport, clamp trong vùng nhìn thấy; resize gửi tin không tính lại chiều cao. Giữ focus trước gửi/preventScroll, chặn pointerdown nútform lấyfocus, không focus lại sau async trênmobile; Enter/send xửlý riêng không đụng IME, input16px tránh autozoom. Desktop giữ luồng cũ.3/3 hook regression PASS (viewport/giữheight/rerender/đóngngoài/cleanup/layoutresize), typecheck/build PASS, dist xác nhận. Chưa QA bàn phím Chrome/Safari trênđiệnthoạithật; tests môphỏng viewport không thay nghiệmthu thiếtbị.

- 2026-10-21: User yêu cầu căn giữa VinhQuangKỳĐài và danhhiệucấp1 của3tabcuối mobile. Thêm anchor dùngchung catalog/preview/detail: Arena tâmvùngđỏ từảnh2172x724 Y383/385.5/379.5 theo3cấp +scale1.16; progresscấp1 tâm theo crop (lienthang200/368, games195/360, attendance188/363), quyđổi offsetcqw theo artworkscale để bỏ lệch pixelcốđịnh khi co màn. Lineheightmobile1.1, chỉprogresscấp1 đổi; desktop/cấpthấp/artwork/ownership/cột giữnguyên. npm.cmd run build(typecheck+Vite) PASS, dist index-CxGZkxOW.js xácnhận anchor. Chưa browserQA trựcquan, không chạytest taskUI.


- 2026-10-21: User nhấn mạnh chat phủ mọi phần game mobile: sửa đúng stacking ancestor user dưới, khi mobileChatOpen nâng parent60→200, chat con100; cao hơn user trên80/người xem80/footer90/toolbar50. Giữ viewport keyboard/outsideclose. User dưới nâng bottom15→25px. Căn name/Elo cùng tâm ngang (Elo mxauto), hàng identity selfcenter theo nhóm avatar+title+stars: dành thêm20px dưới avatar64 để bố cục tính phần badge/star vốn absolute; không đổi asset/token danh hiệu. Desktop giữ nguyên; quyền chỉnh nhận diện mobile task này, khóa lại sau task.3/3 mobile-chat-overlay regression PASS; typecheck/build PASS, dist xác nhận. Chưa browser QA trực quan.

- 2026-10-21: User chỉ rõ chữ cấp1 của3tabcuối vẫn lệch riêngThôngtindanhhiệu mobile. HonorDetailSprite nhậnmobileTitle, đặt chữ trực tiếp trong cùng boxcrop/scale vớiảnh, top theo getProgressHonorNameplateCenter dùngchung; ẩn lớpchữngoài riêngcompact khi cấp1 để khôngđè2lớp. Catalog/preview/desktop/cấpthấp giữnguyên; không offset thêm trên panel. npm.cmd run build(typecheck+Vite) PASS, dist index-DZntP1Q5.js xácnhận mobileTitle. Chưa browserQA trựcquan.


- 2026-10-21: User chỉnh GamePage mobile: bảngemoji6→24 biểu cảm (18mới chỉmobile), chạm/focus ô nhập gọi closePicker để đóng bảngicon/gợiý kểcả input đãfocus; giữ chọnemoji và keyboard flow. User dưới hạ5px (bottom25→20), Elo trên mx0 căn trái name128, Elo dưới margin-leftauto căn phải. Giãn3nút từgap4 lên tốiđa8 bằng clamp theo viewport để khôngđè carduser ở360px. Menu mở nâng ancestor header lênz300 vượt user80/60, chat200, footer90; đóng về50. Desktop giữ UI/bộemoji cũ. Quyền user chỉnh đúngmobile tasknày, khóa lại sautask. npm.cmd run build(typecheck+Vite) PASS, dist xácnhận; chưa browserQA trựcquan, không chạy thêmtest cho tinhchỉnhUI này.


- 2026-10-21: User yêu cầu sao to hơn trên điện thoại và laptop/toàn project. Thêm RANK_STAR_SIZE_SCALE1.08 ở playerIdentityLayout; starWidth25→27cqw (+8%), gap1.5 giữ, 3ô78→84% vùng cốđịnh, giữneo/topleft/điềntrái→phải. RankStars chung tự cập nhật Home/mobileHome/GamePage/Profile/Tùychỉnh/Bạnbè/Xếphạng/Tinnhắn/lờimời; sao máy ảnhriêng dùng cùng token108%/căn giữa thay100%. Giữ avatar/ảnhdanhhiệu/bố cục/luậtElo. Đồng bộ AGENTS/RANK-SYSTEM/FRIENDS-UI-RULES/UI-IMAGE-RENDERING. npm.cmd run build(typecheck+Vite) PASS, dist xácnhận token27 và scale1.08. Không chạy thêmtest cho thayđổi kíchthước UI này; chưa browserQA trựcquan.

- 2026-10-21: User chuyển sang danhhiệu hiểnthịtrựctiếp trongThôngtinuser mobile, yêu cầu cănchữ. ProfileHonorPreviewBadge cho3nhánh dùngcanvas3:1 cục bộ căn giữa hàng đểảnh/chữ dùngchunghệ tọađộ, không căn theo chiều cao gridrow co giãn. Progresspreview dùng mobileTitle trongboxcrop cho mọicấp, ẩn lớpchữngoài compact; Arena dùnganchor vùngđỏ, PhongTặng labelcompacth-auto căn giữa vùngtím. Desktop/catalog/chi tiết/ownership/khungavatar giữnguyên. npm.cmd run build(typecheck+Vite) PASS, dist index-B2wQ1XUV.js xácnhận canvas. Chưa browserQA trựcquan.


- 2026-10-21: User yêu cầu sao to thêm toàn project/mobile+laptop. Token RANK_STAR_SIZE_SCALE1.08→1.16: sao27→29cqw (thêm7.4% so với lượt trước, tổng16% so gốc25), 3ô90%/gap1.5, saoAI116% cùng token. Giữ anchor/avatar/danhhiệu/luật. Đồng bộ tài liệu chuẩn. npm.cmd run build(typecheck+Vite) PASS, dist xácnhận scale1.16; chưa browserQA trựcquan, không thêmtest cho tăngsize.

- 2026-10-21: User báo popupThôngtindanhhiệu khi bấm danhhiệuởThôngtinuser bịlệch mobile. Nhánh standalone HonorDetailPopover override compact left/top50%, width min(82vw,54dvh), transformtranslate(-50%,-50%) important để không dùnganchorX/side vàwidthphầnmép desktop. Neo giữviewportdialog, đồngbộmọidanhhiệu/ô; desktop/catalog/selection/đóngpopupgiữnguyên. npm.cmd run build(typecheck+Vite) PASS, dist index-jN4DHDKI.js xácnhận CSS centering!important. Chưa browserQA trựcquan.


- 2026-10-21: User yêu cầu sao to thêm và gần nhau toànproject/mobile+laptop. Scale1.16→1.24, sao29→31cqw (+6.9% so trước), gap1.5→0.5cqw (giảm2/3), 3ô94% vùngcốđịnh giữneo/hướngđiền. Artworkmáy mộtngôisao trangtrí tăng124% theo tokenchung. Đồngbộ tài liệu chuẩn, khôngđổi avatar/danhhiệu/luật. npm.cmd run build(typecheck+Vite) PASS, dist xácnhận scale1.24/gap0.5; chưa browserQA trựcquan, không thêmtest cho chỉnhsize/gap.
- 2026-10-22: Theo user, Xếp hạng mobile tăng nội dung mỗi hàng1.35→1.5×, gồm avatar/huy hiệu top1–4/tên/điểm/nút; giữ khoảng6 dòng, chrome/tab và dock mobile đã chỉnh ở lượt trước, laptop giữ nguyên. `npm.cmd run build` (typecheck+Vite) PASS; dist/assets/index-BQxR6PWu.js xác nhận scale1.5. Chưa browser QA.


- 2026-10-23: CI #8 / PR #4, commit gốc 428ae4c: không đọc được log GitHub qua connector vì cần liên kết tài khoản; đã tái hiện đúng hai lỗi ui.test.tsx tại Local (hết giờ phe Đỏ/Đen). Test gộp start và timeout trong một act nên effect không quan sát playing; tách render playing trước khi kết thúc, giữ đủ assertions kết quả/biểu cảm. Full suite còn phát hiện kỳ vọng keyframe90% cũ, thiếu matchMedia desktop trong country-picker và server.test giả định người vào trước cầm Đỏ; chỉ cập nhật test theo animation liên tục và màu từ snapshot Ready. Không sửa runtime/Elo/tài khoản/bảo mật/workflow/VPS, không xóa test/skip/retry hoặc tăng timeout. Tránh dựng ready→playing→finished trong cùng act khi kiểm thử hiệu ứng gắn phiên; mock browser boundary và đọc màu server đã chia. Kiểm chứng 2026-10-23: related72/72; snapshot sạch từ HEAD cộng đúng4 file test: npm test397 PASS/23 SKIP vốn có (17MySQL+6Pikafish), exit0; typecheck/build PASS cả workspace và snapshot. Snapshot ZIP giữ tên asset tiếng Việt; lần giải nén tar trước đó lỗi Unicode không tính là PASS. Dist workspace đã cập nhật; thay đổi chỉ test nên không thêm mã runtime vào bundle. Chưa có kết quả lần CI GitHub mới tại thời điểm ghi chú; không merge/deploy.

- 2026-10-23: User yêu cầu hoàn tác thử màu nền/thẻ Xếp hạng: bỏ toàn bộ override màu compact vừa thêm, trở lại màu nền giấy/thẻ/header/cột Elo sẵn có trước task đổi trắng kem. Giữ các chỉnh sửa kích thước/căn cột trước đó; khóa lại phạm vi.

- 2026-10-23: Đồng bộ tên/trạng thái hai tab Xếp hạng mobile theo user: tên cố định28×rowScale, font-heading, không tự co; vùng tên hai dòng cùng chiều cao/neo đáy. Trạng thái cùng font-heading/cỡ22×rowScale/line-height1.2, nhãn đang chơi đúng variant. Avatar/màu/desktop giữ hiện tại; khóa lại sau task.

- 2026-10-23: Đính chính theo user: tên người chơi trong Xếp hạng mobile nằm một hàng. Tên dùng font-heading chung, tự co theo chiều rộng để hiện đủ; khung tên trở về chiều cao một hàng để trạng thái giữ vị trí thẳng hàng trên hai tab. Build/typecheck PASS; khóa lại phạm vi.

- 2026-10-23: Đính chính theo user: tên Xếp hạng mobile không tự thu nhỏ; giữ cỡ28×rowScale trên một hàng và cho chữ tràn ngang nếu dài. Cùng font/cỡ/vị trí giữa Cờ Tướng và Cờ Úp; build/typecheck PASS.

- 2026-10-23: Theo user, thu nhỏ nhẹ tên trong Xếp hạng mobile từ28 xuống26×rowScale. Giữ một hàng, tràn ngang khi dài, cùng font/vị trí trên hai tab; không đổi chiều cao vùng tên, trạng thái, avatar hay desktop. Build/typecheck PASS; khóa lại phạm vi.

- 2026-10-23: Theo user, thu nhỏ nhẹ huy hiệu Top 1–3 trong Xếp hạng mobile: scale phần huy hiệu trong ô hạng từ1.15 xuống1.08. Không đổi avatar, cột hoặc desktop; khóa lại sau task.

- 2026-10-23: Theo user, thu nhỏ thêm huy hiệu Top 1–3 Xếp hạng mobile: bỏ phần phóng thêm, về scale rowScale gốc (từ1.08). Desktop/avatar/các cột giữ nguyên; khóa lại sau task.

- 2026-10-23: Theo user, giảm bo góc khung Elo Xếp hạng compact: khung nền và ô số từ bán kính9/8 về5 theo scale dialog. Desktop và số liệu giữ nguyên; khóa lại sau task.

- 2026-10-23: Theo user, thẻ Elo trong danh sách Xếp hạng dùng artwork/kiểu số của Home (elo-frame.png, font-number, CrispUiImage); Cờ Úp dùng icon quân ẩn và Elo theo variant hiện chọn. Thay khung nâu cũ, giữ dữ liệu, cột/offset và áp dụng cả desktop/compact.

- 2026-10-23: Theo user đính chính thẻ Elo Xếp hạng: khôi phục viền nâu bao ngoài, tăng lớp viền và nền Home-frame lên cao42 (trước32), số18→22 và icon22→25 theo eloScale. Cờ Tướng/Cờ Úp cùng layout; dữ liệu/desktop scaling giữ đúng. Build/typecheck PASS.

- 2026-10-23: Đính chính theo user: khung bao Elo là lớp nền nâu trong suốt cũ bg-[#b68c53]/20, desktop margin17/cao trừ34, mobile full hàng và bo5. Bỏ border/gradient/shadow vừa thêm nhầm. Giữ thẻ Elo Home cao42, số22/icon25 đã phóng; padding dùng token34 có sẵn. Khóa lại phạm vi.

- 2026-10-23: Theo user, tăng tiếp thẻ Elo Xếp hạng: artwork cao42→46 theo scale; số22→24. Nền nâu bao ngoài nới thêm6px cả chiều rộng và cao, căn giữa trong ô; giữ viền/nền nâu cũ, icon và dữ liệu. Áp dụng cả desktop/compact.

- 2026-10-23: Theo user, khung nâu bao Elo trong Xếp hạng điện thoại rộng thêm7px (tổng phần nới compact 6→13px theo dialog scale). Thẻ Elo bên trong và desktop giữ nguyên.

- 2026-10-23: Theo ảnh user, chỉ nới nền nâu nhạt phía sau thẻ Elo mobile thêm đúng7px hiển thị sang phải: tách nền thành lớp absolute compact:-right-[7px]. Không thay bề rộng/neo của thẻ ảnh, icon hoặc số; desktop giữ nguyên. Khóa lại phạm vi.

- 2026-10-23: Đính chính theo user: nền nâu bao Elo mobile nới đều hai bên, trái3.5px/phải3.5px (tổng chiều ngang thêm7px), thay nới riêng bên phải7px. Giữ thẻ/số và tâm hiện tại; khóa lại phạm vi.

- 2026-10-23: Theo user, mỗi dòng Lịch sử điện thoại (Đã chơi và Đã lưu/Ván đấu) xếp hai người trên–dưới, hai quân cờ ở giữa; ngày giờ bên trái, nút Xem lại cuối dòng bên phải. Grid compact 3 cột/3 hàng, chiều cao tối thiểu220 theo dialog scale để đủ nội dung. Giữ kích thước avatar, desktop, dữ liệu và hành vi xem lại/xóa. Khóa lại phạm vi sau task. Kiểm chứng: npm.cmd run build/typecheck PASS; dist index-BP2J5pC0.js/index-CL70y7zz.css xác nhận class bố cục mới. Chưa browser QA.

- 2026-10-23: Theo user, tăng nút đóng chung Xếp hạng/Bạn bè/Lịch sử mobile: vùng bấm72→84 và dấu×56→64 theo dialog scale. Giữ góc12px, vị trí/buttonInteraction, desktop56/42. Áp dụng qua DialogCloseButton dùng chung; khóa lại phạm vi.

- 2026-10-23: Theo user, nâng nút× chung Xếp hạng/Bạn bè/Lịch sử mobile lên3px hiển thị qua DialogCloseButton. Giữ kích thước84/64, neo ngang/góc và desktop. Khóa lại phạm vi.

- 2026-10-23: Theo user, phóng nội dung hàng Lịch sử điện thoại: avatar76→96, tên/nút Xem lại24→32, badge Thắng/Thua66×32→90×43, quân50→72, ngày giờ22→28, nút cao63→84 theo dialog scale. Người trên căn trái/người dưới căn phải trong cột giữa (rộng90%); hàng tối thiểu300 để đủ chỗ. Dùng chung Đã chơi/Đã lưu ván; desktop và Thế cờ giữ nguyên. User mở riêng avatar/bố cục mobile cho task này, khóa lại sau task. Build/typecheck PASS; dist hiện hành xác nhận class căn trái/phải và avatar96. Chưa browser QA.

- 2026-10-23: Theo user, nâng nút× mobile thêm5px, tổng offset lên8px; đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton. Giữ kích thước và desktop; khóa lại phạm vi.

- 2026-10-23: Theo user, dịch nút× mobile sang phải5px, giữ offset lên8px; đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton. Desktop giữ nguyên; khóa lại phạm vi.

- 2026-10-23: Theo user chỉnh tiếp Lịch sử điện thoại: người trên sát mép trái toàn dòng, phía trên ngày giờ; người dưới sát mép phải, đảo avatar/tên/kết quả và viền/padding để đối xứng. Hai cụm cùng rộng75%; ngày giờ/quân/nút Xem lại cùng hàng giữa. Phóng thêm avatar118, tên/nút38, badge108×52, quân90, ngày giờ34, nút cao100; hàng tối thiểu380 theo dialog scale. Áp dụng Đã chơi và Đã lưu/Ván đấu, desktop giữ nguyên; khóa lại phạm vi sau task. Build/typecheck PASS, dist đã xác nhận class bố cục đối xứng/avatar118; chưa browser QA.

- 2026-10-23: Theo user, dịch nút× mobile thêm lên10px/trái15px so vị trí trước; tổng offset trái10/lên18px. Đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton; khóa lại phạm vi.

- 2026-10-23: User đính chính hướng dịch nút× lượt trước: phải15px thay trái15px, giữ nâng thêm10px. Tổng offset hiện tại phải20/lên18px cho Xếp hạng/Bạn bè/Lịch sử mobile; desktop giữ nguyên. Khóa lại phạm vi.

- 2026-10-23: Theo user, Lịch sử mobile thu nhẹ avatar118→106, tăng tên38→44 và badge Thắng/Thua108×52→132×63 theo dialog scale. Giữ bố cục đối xứng và các thành phần khác/desktop. Áp dụng chung Đã chơi/Đã lưu ván; khóa lại phạm vi. Build/typecheck PASS; dist xác nhận đủ3 kích thước mới; chưa browser QA.

- 2026-10-23: Theo user, Lịch sử điện thoại thu avatar106→96; khung tên kéo chồng48 vào dưới avatar với padding60 đối xứng trái/phải, cao tối thiểu96 cùng avatar để liền khối thay vì chỉ chạm mép tròn. Giữ tên44/badge132×63 và bố cục, desktop nguyên trạng. Áp dụng Đã chơi/Đã lưu ván; khóa lại phạm vi. Build/typecheck PASS; dist xác nhận avatar96 và overlap hai hướng. Chưa browser QA.

- 2026-10-23: User chốt Xếp hạng hiện tại xong, chuyển sang Tin nhắn mobile: kích thước dialog bằng layout Xếp hạng (width/height×scale), hai panel cao đầy khung. Token nội dung dùng1.5×dialog scale cho chữ/icon/control/hàng tương ứng; desktop giữ công thức cũ. Giữ cấu trúc2panel, dữ liệu/API và hành vi chat.

- 2026-10-23: Theo user, tên người chơi Lịch sử điện thoại tăng nhẹ44→48 theo dialog scale và font-bold thay font-medium trên compact. Áp dụng cả2 người/Đã chơi/Đã lưu ván; desktop và bố cục giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist xác nhận tên48/font-bold; chưa browser QA.

- 2026-10-23: Theo user, tên Lịch sử mobile cùng kiểu Xếp hạng: font-heading/extrabold, stroke0.2px, chữ/số cùng font và cỡ, một hàng/line1.4; giữ cỡ48 hiện tại. Đã lưu/Ván đấu luôn hiện thùng rác ở hàng đầu bên phải, trên Xem lại (vùng bấm72/icon43 theo scale), bỏ giữ lâu mới hiện riêng danh sách ván; Thế cờ giữ hành vi cũ. Desktop giữ font/layout và nút xóa hiện có. Build/typecheck PASS; dist xác nhận style tên/vị trí nút; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, dòng ván Lịch sử mobile dùng chung socialPlayerRowClass của Xếp hạng (nền giấy gradient/viền/bo góc/bóng inset/overflow); radius lấy getSocialRowStyle cùng scale. Giữ chiều cao và bố cục3hàng/tên/avatar/nút vừa chốt, áp dụng Đã chơi và Đã lưu/Ván đấu; desktop/Thế cờ giữ nguyên. Build/typecheck PASS; dist xác nhận shared row style. Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, Tin nhắn mobile chuyển sang điều hướng một màn kiểu Zalo: full viewport, danh sách hội thoại toàn chiều ngang; tìm kiếm/tạo nhóm cùng hàng trên. Chọn người/nhóm ẩn danh sách và mở chat toàn chiều ngang; nút quay lại/Escape về danh sách. Đóng dialog dọn lựa chọn/tìm kiếm; Nhắn tin từ hồ sơ vẫn vào đúng đích. Dòng76px, nội dung/token mobile có scale tối thiểu0.65, avatar hàng48px theo quyền phóng nội dung Chat user đã cho. Giữ API/gửi/ảnh/emoji/nhóm/tùy chọn và desktop hai panel. Xếp hạng đã chốt, không sửa.

- 2026-10-23: User làm rõ là ô lớn bao mỗi ván Lịch sử, không phải thanh tên. Mobile giữ socialPlayerRowClass/radius chung Xếp hạng, bổ sung gap8×dialogScale và lớp bóng gradient trái132×rowScale như dòng Xếp hạng. Giữ bố cục bên trong/thanh tên, desktop nguyên trạng. Build/typecheck PASS; dist xác nhận lớp bóng chung; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: User đính chính Tin nhắn mobile không full viewport: rộng/cao bằng dialog Xếp hạng qua layout.width/height×layout.scale. Giữ bố cục một màn danh sách hoặc hội thoại, hàng tìm kiếm/tạo nhóm, nội dung lớn và quay lại.

- 2026-10-23: Theo user, danh sách Đã chơi mobile kéo lên sát2tab chính: bỏ hàng tab con ẩn nhưng vẫn chiếm chỗ (compact:invisible/compact:flex), dùng hidden thật khi không ở Đã lưu. Đã lưu vẫn hiện2tab con và giữ khoảng chừa; desktop giữ hành vi cũ. Build/typecheck PASS; dist xác nhận bỏ hàng chừa ẩn; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, Chat mobile tái dùng SocialDialogFrame giống Xếp hạng/Bạn bè, hideTitle riêng để không có chữ Tin nhắn; giữ khung các bảng khác qua mặc định hideTitle=false. Bỏ header chữ/khung phẳng mobile, dùng nút× chung. Tìm kiếm giữ chính màu laptop #241309/viền#dca44d/chữ trắng. Tạo nhóm mobile dựng icon/chữ HTML trên nút112×44px có viền/nền nâu vàng, không kéo méo artwork; desktop giữ ảnh gốc. Hai màn danh sách/chat nằm gọn trong khung, giữ điều hướng/API.

- 2026-10-23: Theo user, phóng2tab con Ván đấu/Thế cờ trong Đã lưu mobile khoảng25%: chữ34→43, min-height72→90, min-width210→270, padding ngang28→36/dọc10→12 theo dialog scale. Desktop/Đã chơi giữ nguyên; khóa lại phạm vi. Build/typecheck PASS; dist xác nhận kích thước tab mới; chưa browser QA.

- 2026-10-23: User đính chính nút Tạo nhóm Tin nhắn mobile phải giống laptop: tái dùng group-button.png có sẵn cho cả2 nhánh, bỏ icon/chữ HTML và nền/viền dựng riêng compact. Mobile object-contain trong vùng112×44 để giữ tỷ lệ artwork; laptop giữ nguyên object-fill và kích thước cũ. Giữ mở panel/API tạo nhóm. Build/typecheck PASS; dist xác nhận artwork mobile; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, chữ danh sách Tin nhắn trống “Không tìm thấy người chơi” mobile tăng lên22px thật và semibold; giữ màu/font/căn giữa, desktop nguyên trạng. Build/typecheck PASS; dist xác nhận style mới; chưa browser QA.

- 2026-10-23: User đính chính chữ trống cần tăng là Lịch sử, không phải Tin nhắn. Hoàn tác chữ trống Tin nhắn; historyEmptyTextClass chung Đã chơi/Đã lưu ván/Thế cờ thêm compact22px/semibold, desktop giữ28 theo scale. Build bị chặn bởi lỗi TS2559 tại FriendsDialog.tsx:236 (contentStyle custom property --ranking-tab-width ngoài phạm vi task); chưa cập nhật dist/chưa browser QA.

- 2026-10-23: Theo user, Chat mobile tăng chữ tìm kiếm18px, control cao50px; nút Tạo nhóm132×50/icon24/chữ17 dựng HTML để giữ tỷ lệ. Hội thoại dùng socialPlayerRowClass và radius từ getSocialRowStyle chung Xếp hạng, hàng92px/gap6px, avatar56px, tên20px, preview16px, giờ13px; màu chữ nâu trên nền kem chung. Giữ desktop và dữ liệu/điều hướng. Build/typecheck PASS; dist index-D8PxTPk2.js/index-7lmrkjr-.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user,2tab chính Lịch sử mobile Đã chơi/Đã lưu tăng từ264×70×1.4 lên264×70×1.6 theo dialog scale, cùng công thức tab Xếp hạng. Desktop giữ nguyên. Build/typecheck PASS; dist xác nhận tab mới và bao gồm chữ trống Lịch sử22px từ lượt trước (lỗi build Bạn bè đã hết ở workspace hiện tại). Chưa browser QA; khóa lại phạm vi.

- 2026-10-23: Theo user, tạm ẩn2tab con Ván đấu/Thế cờ trong Lịch sử MOBILE. SHOW_MOBILE_SAVED_CATEGORIES=false giữ markup/state/tính năng Thế cờ để phục hồi; compact luôn chọn matches khi ẩn, Đã lưu mở trực tiếp danh sách ván và không chừa chiều cao tab con nên khung lên ngang Đã chơi. Không xóa dữ liệu, desktop giữ2tab con. Build/typecheck PASS; dist đã cập nhật; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user đính chính Chat mobile: Tạo nhóm dùng đúng group-button.png của laptop, bỏ nút HTML thay thế; ảnh giữ tỷ lệ tự nhiên trong vùng144×42px (không kéo méo). Dòng hội thoại dùng nguyên socialPlayerRowClass/getSocialRowStyle và bổ sung đúng dải bóng trái/gradient #4a261327/#75451d1a rộng132×rowScale như Xếp hạng. Giữ nội dung lớn/desktop. Build/typecheck PASS; dist index-CmtssHAy.js/index-R6mo7Grr.css xác nhận; chưa browser QA.

- 2026-10-23: Theo user, nhích2cụm avatar/tên Lịch sử mobile vào trong12 logical theo dialog scale (trên margin-left, dưới margin-right đối xứng) để khung avatar không khuất mép ô. Giữ kích thước/khung tên dính avatar và desktop. Build/typecheck PASS; dist xác nhận inset2hướng; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, dùng thanh cuộn Xếp hạng laptop cho danh sách Bạn bè/Xếp hạng/Lịch sử mobile: socialListScrollbarClass chung ở uiClasses, thumb trắng/bo tròn, track trong suốt, thin/6px, gutter stable, ẩn nút mũi tên. Friends áp dụng mọi tab/danh sách lời mời; History cả Đã chơi/Đã lưu và Thế cờ đang ẩn để phục hồi đồng bộ. Desktop giữ style cũ (Ranking tái dùng token cùng nội dung). Build/typecheck PASS; dist xác nhận thanh cuộn trắng; chưa QA trình duyệt điện thoại thật (thanh cuộn overlay do trình duyệt điều khiển). Khóa lại phạm vi.

- 2026-10-23: Theo user, thêm nút× vào góc trên phải bảng thông tin user MOBILE qua DialogCloseButton chung Xếp hạng (cỡ84/dấu64 và offset chung theo scale). onClose đóng hồ sơ; chỉ hiện trên bảng thông tin chính, không chèn lên chỉnh avatar/địa chỉ/catalog danh hiệu; desktop giữ nguyên. Build/typecheck PASS; dist xác nhận nút compact; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, Chat mobile thu hàng tìm kiếm/tạo nhóm vào36px tổng chiều ngang, nút nhóm rộng144→126px/cao42→46px và chữ20px. Nút dùng border-image từ chính artwork laptop để giữ góc/hoa văn khi đổi tỷ lệ; icon crop CSS từ cùng ảnh, chữ HTML độc lập để phóng mà không méo. Desktop giữ ảnh gốc. Build/typecheck PASS; dist index-jkKtnjSo.js/index-Iue8rzuG.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user, dựng lại nút Tạo nhóm mobile bằng MessagesCreateGroupButton: nền/viền,4họa tiết góc SVG, icon nhóm SVG và chữ HTML là phần độc lập. Props width/height/iconSize/labelSize/ornamentSize cho chỉnh riêng, không crop hoặc kéo ảnh chứa chữ; giữ ref/focus/onClick. Laptop giữ artwork gốc. Build/typecheck PASS; dist index-DGLJB454.js/index-D3V5j6to.css xác nhận. Chưa browser QA.

- 2026-10-23: User đính chính nút× hồ sơ mobile phải chính xác như Xếp hạng: dùng DialogCloseButton cùng scale từ useRankingLayout, cả offset top24/right28 tính theo ranking scale thay profile scale740 khiến nút lớn hơn. Giữ transform/style chung và neo góc bảng hồ sơ. Desktop giữ nguyên. Build/typecheck PASS; dist xác nhận offset mới; chưa browser QA.

- 2026-10-23: Theo user, đồng bộ nút× MOBILE qua DialogCloseButton chung cho Hồ sơ/Xếp hạng/Bạn bè/Lịch sử (và nơi tái dùng): dịch trái4px (translateX20→16), tăng nhẹ vùng bấm84→90 và dấu64→68 theo scale. Hồ sơ giữ scale Xếp hạng đã chốt; mọi chỉnh tiếp dùng component chung, không offset riêng. Desktop giữ56/42 và không transform. Build/typecheck PASS; dist xác nhận offset chung mới; chưa browser QA. Khóa lại phạm vi.

- 2026-10-23: Theo user, Chat mobile nới hàng tìm kiếm về toàn bề ngang, ô cao50→44px; chữ nhập16px, hint14px hiển thị đủ Tìm tên hoặc ID người chơi như laptop (tự xuống dòng khi thiếu chỗ, không cắt). Hàng hội thoại92→76px, avatar56→48px; thời gian ở mép phải14px, cùng formatter/nguồn lastMessageAt và quy tắc huy hiệu chưa đọc với laptop. Desktop giữ nguyên. Build/typecheck PASS; dist index-BvVz7seY.js/index-y3JzvEv5.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user chỉnh Shop MOBILE: biển Cửa Hàng110×36 cạnh Back; tài nguyên riêng Shop116×26/ô, icon18/số14/plus18, góc trên phải xếp năng lượng trên/vàng dưới cách30px. Header72px; cụm MarketHeading lên trước dock chợ, vùng18dvh/min130; dock Phiên Chợ/Cao Cấp/Sự Kiện xuống ngay trước filter và panel sản phẩm qua order+section contents compact. Desktop/Home/resource token chung không đổi; giữ mua hàng/API/countdown. Build/typecheck PASS; dist xác nhận thứ tự/biển mới; chưa browser QA điện thoại.

- 2026-10-23: Theo user, Shop mobile lưới3cột×4hàng thay2cột; gap/padding4px và footer32px/icon14/chữ12 để vừa ô hẹp. Giữ số sản phẩm thật, không nhân bản lấp12ô. Ba tab chợ chữ12→14px, line1.15; ẩn slot cuối trống compact để không tạo hàng grid phụ đẩy icon/tên lệch tâm dọc. Desktop giữ4×2 và kiểu cũ. Build/typecheck PASS; dist xác nhận grid3×4; chưa browser QA.

- 2026-10-23: Theo user, Tạo nhóm mobile thay khung và icon SVG bằng2PNG mới trong src/assets: 95959a5a (khung2172×724) và49ad812e (nhóm1254×1254). CSS cắt khoảng alpha dư bằng các viewport riêng; khung chia3lát trái/giữa/phải để giữ góc khi resize, icon giữ tỷ lệ; chữ HTML Georgia bold gần font artwork cũ. Giữ width/height/iconSize/labelSize độc lập và laptop. Build/typecheck PASS; dist index-G_ZUQ2i0.js/index-BAJVcaKS.css xác nhận2asset mới; đã xem nguồn ảnh, chưa browser QA.

- 2026-10-23: Theo user, thẻ Tạo nhóm mobile rộng126→148px, chữ20→17px. Cụm icon/chữ neo giữa trong vùng inset20px, gap4px để nằm trong lòng thẻ; giữ hai asset riêng và chiều cao46px. Avatar hàng hội thoại48→44px, không đổi avatar header hoặc desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, thay riêng khung Tạo nhóm mobile bằng7c55d422-22c0-40f3-9c29-ee23f4b57d58.png (2172×724); crop CSS vùng x12..2160/y180..540, chia3lát cap300px để giữ đầu nhọn/viền. Giữ kích thước148×46, icon49ad812e và chữ17px. Build/typecheck PASS; dist index-uChmMj71.js/index-BYT1m-2a.css xác nhận asset mới; đã xem ảnh nguồn, chưa browser QA.

- 2026-10-24: Theo user, Chat mobile tách thời gian/huy hiệu chưa đọc thành cột riêng bên phải căn giữa chiều dọc hàng. Cụm tên/preview tăng khoảng cách với avatar thêm7px thật qua margin-left. Giữ quy tắc thời gian/chưa đọc và desktop. Build/typecheck PASS; dist index-BAA9p7Gk.js/index-B6elaPna.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo ảnh user, khung ngoài Chat mobile thay SocialDialogFrame bằng conversation-list-frame.png của danh sách laptop: nền nâu hoa văn/viền vàng, cùng inset nguồn. Giữ kích thước dialog hiện tại, nội dung và điều hướng mobile, nút× chung; desktop nguyên trạng. Build/typecheck PASS; dist index-DdSBJ2aq.js/index-U-k3JYlK.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo user, khung Chat mobile bù khoảng trống nguồn của artwork laptop (rect x10/y36/445×940 trên465×998) để đường viền nâu/vàng phủ bằng kích thước dialog các bảng khác; giữ layout nominal. Hàng hội thoại thêm chữ Đang online/Offline cạnh chấm, tách preview xuống dưới. Thời gian cột phải luôn ở hàng trên ngang tên, huy hiệu chưa đọc ở slot dưới (không thay thế thời gian trên mobile). Desktop giữ quy tắc cũ. Build/typecheck PASS; dist index-DjuaXENJ.js/index-BLvoTCl8.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo user, làm đẹp3filter Shop MOBILE Tất cả/Avatar/Khung Viền: tab bo8/viền vàng, selected gradient kem-vàng/bóng sáng nhẹ, idle nâu nổi; highlight mép trên, chữ16/extrabold. Thanh48px/gap6/padding5, hiệu ứng nhấn hạ2px/scale0.96 và transition200ms có motion-reduce; focus outline. SVG và hình thức desktop giữ nguyên, filter data/mua hàng không đổi. Build/typecheck PASS; dist xác nhận hiệu ứng/tab mới; chưa browser QA.

- 2026-10-24: Theo user, Cửa Hàng Cao Cấp có countdown tuần dạngXd HH:MM:SS (ngày ký hiệu d). Mốc chọn00:00 thứHai UTC+7, tự lặp7ngày; tái dùng hook timer/focus/visibility và daily mặc định giữ nguyên. Quy tắc thời gian dùng chung hai viewport, không đổi geometry laptop. Chỉ đồng hồ UI, chưa tự thay catalog/backend. Kiểm tra3mốc thứHai/giây cuối/trước2ngày PASS; build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, thu nhẹ3filter Shop mobile: thanh48→42px, chữ16→14px; giữ nền/viền/effect nhấn và desktop. Build/typecheck PASS; dist xác nhận chiều cao mới; chưa browser QA.

- 2026-10-24: Theo user, khung Tạo nhóm mobile thay bằng0963fdaa-fd2f-4c9d-bcce-0cd1500ccfd8.png; CSS crop vùng x48..2124/y132..560, chia3lát cap300 để giữ góc bo. Giữ icon/chữ/kích thước và desktop. Build/typecheck PASS; dist index-CH16LqMF.js/index-D54ybWBF.css xác nhận asset mới; đã xem nguồn, chưa browser QA.

- 2026-10-24: Theo user,3filter Shop mobile dùng hiệu ứng như tab con Danh sách Bạn bè: transition filter150ms/hover110, selected brightness1.1/saturate1.3/drop-shadow1px vàng+4px cam; bỏ nhấn lún2px/scale0.96 và glow cũ. Giữ kích thước42/chữ14, hình thức và desktop. Build/typecheck PASS; dist xác nhận hiệu ứng mới; chưa browser QA.

- 2026-10-24: Theo phản hồi icon Tạo nhóm mobile bị méo, ảnh icon khóa tỷ lệ nguồn vuông1:1 bằng width/height intrinsic và height:auto, chỉ scale theo một chiều bằng pixel; đặt trong viewport vuông và căn giữa phần alpha thật. Không ép width/height phần trăm độc lập. Giữ khung/chữ/hành vi. Build/typecheck PASS; dist index-BWYA1Sj1.js/index-809XO8Im.css cập nhật; chưa browser QA.

- 2026-10-24: Theo user, bỏ đổi nền vàng của3filter Shop mobile khi chọn: selected giữ cùng nền nâu/viền/chữ/bóng như idle, chỉ khác hiệu ứng filter phát sáng đã chốt. Desktop giữ màu chọn cũ. Build/typecheck PASS; dist xác nhận selected nền nâu; chưa browser QA.

- 2026-10-24: Theo ảnh user, vết lõm cạnh icon thực tế là đường nối3lát khung Tạo nhóm. Bỏ ghép lát, dùng một ảnh khung0963fdaa liên tục với crop CSS toàn vùng2076×428 để không sinh seam/đứt viền. Icon/chữ/kích thước giữ nguyên. Build/typecheck PASS; dist index-bnx9cpIA.js/index-BoCLPUD6.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo user,3filter Shop mobile selected có nền vàng nâu nhẹ gradient#8a652e→#604019, viền#c69a54/chữ#fff0c4; giữ glow đã chốt và idle nâu. Desktop giữ nguyên. Build/typecheck PASS; dist xác nhận nền mới; chưa browser QA.

- 2026-10-24: User đính chính lỗi là icon ba người Tạo nhóm chứ không phải khung. Thay riêng render PNG bằng SVG ba người với đường tròn/cung mượt, gradient vàng và viền mảnh, tỷ lệ40:32; useId cho gradient độc lập. Giữ khung0963fdaa/chữ/hành vi. Thay quy tắc dùng iconPNG trong các lượt trước theo yêu cầu sửa icon mới. Build/typecheck PASS; dist index-CtTuPbbJ.js/index-DuwSurX4.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo user, popup xác nhận mua Shop mobile dùng font-body Arial chính cho nội dung/nút, title24/body18 line-relaxed. Giá tách số và chữ vàng, inline-flex items-baseline, số font-number lining/tabular/not-italic để ngay hàng. Desktop giữ font/kích thước cũ; không đổi giao dịch. Build/typecheck PASS; dist xác nhận số mới; chưa browser QA.

- 2026-10-24: Theo user, tên hội thoại mobile nhỏ20→18px/line22, cụm tên/trạng thái/preview tự căn giữa chiều dọc. Thời gian chuyển vào cùng flex hàng tên/items-baseline để luôn ngang tên, bỏ cột phải tự stretch; huy hiệu chưa đọc nằm bên phải dòng preview phía dưới. Giữ dữ liệu/desktop/khoảng avatar. Build/typecheck PASS; dist index-B7ohCkoh.js/index-D3MUXt0i.css xác nhận. Chưa browser QA.

- 2026-10-24: Theo user, dòng phụ hội thoại mobile giữ chấm presence và hiển thị tin cuối thay chữ Đang online/Offline khi có nội dung; chưa có tin thì fallback trạng thái. Gộp trạng thái/preview thành một dòng dưới tên, ảnh gửi hiện 📷 Ảnh; giữ thời gian ngang tên và badge dưới. Desktop giữ hiện tại. Build/typecheck PASS; dist index-xyMthWFJ.js/index-D5_7bNE4.css cập nhật; chưa browser QA.

- 2026-10-24: Sửa mua Shop kẹt Đang mua trên mobile HTTP/LAN: useShopPurchase gọi crypto.randomUUID ngoài try sau khi khóa busy, browser không secure context có thể thiếu hàm khiến không gửi API/không chạy finally. Đổi sang createClientId sẵn có (getRandomValues tạo UUIDv4) và đưa sinh/lưu requestId vào try để luôn giải phóng busy khi lỗi. Giữ Mua→Xác nhận và giao dịch thật/chống trùng/retry cùng key, không giả trừ vàng hoặc tự cấp đồ. Regression HTTP thiếu randomUUID + shop inventory/page4/4 PASS; typecheck/build PASS, dist cập nhật. Chưa mua trên điện thoại/DB thật.

- 2026-10-24: Theo user, Chat mobile trở về khung chung SocialDialogFrame như các bảng thông tin/social (không title), thay artwork nâu laptop riêng. Đổi vị trí Tạo nhóm sang trái/tìm kiếm sang phải; nút nhóm148→128px, phần rộng trả cho ô tìm kiếm. Giữ danh sách/điều hướng/icon và desktop. Build/typecheck PASS; dist index-_Dvift2C.js/index-Bd3a8kKr.css xác nhận; chưa browser QA.

- 2026-10-24: Theo user, Shop mobile lỗi thiếu vàng hiển thị chỉ Không đủ tiền ở giữa viewport, tự tắt2000ms qua effect cleanup; nhận đúng thông báo lỗi thiếu vàng server, không che lỗi khác. Dấu× thông báo mobile tăng36px/vùng bấm44px. Desktop và giao dịch giữ nguyên. Build/typecheck PASS; dist xác nhận thông báo mới; chưa browser QA.

- 2026-10-24: Theo user, danh sách Chat mobile thêm socialPanelClass và nền giấy historyParchmentBackground/lớp phủ#fff4dc52 giống Xếp hạng. Hàng tiếp tục dùng socialPlayerRowClass/radius/dải bóng chung; padding ngang12×rowScale cộng5px thật để avatar vào phải/thời gian vào trái. Giữ chiều cao76px, nội dung và desktop. Build/typecheck PASS; dist index-DelhM9hv.js/index-C9kp2aIM.css xác nhận; chưa browser QA.

- 2026-10-24: Theo user, làm đẹp khung Không đủ tiền Shop mobile: nền nâu gradient/ánh sáng trên, viền vàng2px+inset, bo16/bóng ngoài, min-height96, chữ Arial20semibold kem căn giữa thật; dấu× góc trên phải. Giữ text/tự tắt2s và desktop/thông báo khác. Build/typecheck PASS; dist xác nhận khung mới; chưa browser QA.

- 2026-10-24: Theo user, danh sách Chat mobile chia10hàng vừa khung: mỗi hàng calc((100% - 54px)/10), trừ9gap6px; minHeight0 và overflow cuộn giữ các hội thoại còn lại. Avatar giới hạn theo chiều cao hàng, vẫn44px tối đa theo chiều ngang/tỷ lệ vuông. Desktop giữ8hàng cũ. Build/typecheck PASS; dist index-AAyvZ_bP.js/index-CLBj8hsU.css xác nhận10slot. Chưa browser QA.

- 2026-10-24: Theo user, popup Xác nhận mua mobile dùng cùng khung Không đủ tiền: trích shopMobileDialogFrameClass chung cho2popup (nền nâu gradient/viền vàng/inset/bo16/bóng). Giữ nội dung/nút/giao dịch và desktop. Build/typecheck PASS; dist xác nhận khung chung; chưa browser QA.

- 2026-10-24: User đổi Chat mobile về8hội thoại/khung (trừ7gap6px). Mỗi hàng là size container, avatar/tên/preview/thời gian/chấm/badge dùng cqh cùng tỷ lệ theo chiều cao hàng thay pixel cố định; tên/time vẫn cùng baseline, nội dung giữa hàng. Giữ khoảng avatar→text7px user đã chốt; desktop giữ nguyên. Build/typecheck PASS; dist index-Xax82OXF.js/index-c_eS99ht.css xác nhận8slot/cqh. Chưa browser QA.

- 2026-10-24: User xác nhận thiết kế nút tab Đã lưu giống Đã chơi. HistoryTabButton MOBILE dùng chung dáng alpha nét cọ của playedTab, nền đỏ khi chọn/nâu khi chưa chọn và chữ HTML font-heading50/extrabold/italic vàng, đồng nhất cả2tab. Giữ kích thước/vị trí và desktop dùng ảnh gốc; dữ liệu/nội dung không đổi. Yêu cầu mới thay lần hoàn tác mask trước đây. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, hoàn tác riêng lượt đồng bộ thiết kế2nút Đã chơi/Đã lưu vừa thử: bỏ mask/chữ HTML, trả HistoryTabButton dùng ảnh tab gốc có chữ (compact:size-full). Giữ kích thước/tab/data/bố cục đã chốt trước lượt thử. Build/typecheck PASS; dist xác nhận ảnh tab gốc; chưa browser QA.

- 2026-10-24: Theo user, focus tìm kiếm Chat mobile không co khung: chụp layout trước focus và giữ cho phiên dialog, tránh visualViewport bàn phím làm đổi kích thước/8hàng/nội dung. Đóng dialog giải phóng snapshot; thay đổi rộng lớn (đổi hướng) dùng layout mới. Không sửa hook layout chung hoặc desktop. Build/typecheck PASS; dist index-C3iEZWaq.js/index-c_eS99ht.css cập nhật; chưa QA bàn phím điện thoại thật.

- 2026-10-24: Theo user, Chat mobile7hội thoại/khung (trừ6gap6px), nội dung tiếp tục cqh theo chiều cao hàng. Badge chưa đọc tăng33→39cqh, số19.5→22cqh. Preview khi unread>0 dùng semibold/màu nâu đậm#36200c, tự trở lại thường khi đã đọc. Desktop/logic read/API giữ nguyên. Build/typecheck PASS; dist cập nhật và xác nhận7slot; chưa browser QA.

- 2026-10-24: Theo user, nút Chat ngoài Home hiển thị tổng unreadCount mọi hội thoại từ server, Query theo accountID/poll4giây; đọc tin invalidate query để giảm số. Mobile tái dùng chính markup/style huy hiệu lời mời Bạn bè (đỏ/viền kem, max99+), desktop cùng kiểu; số0 ẩn. MobileHome prop optional mặc định0 cho consumer cũ. Build/typecheck PASS sau sửa hợp đồng props; dist cập nhật; chưa browser/API live QA. Không đổi read API hoặc cơ sở dữ liệu.

- 2026-10-24: Theo user, thay2tab Lịch sử MOBILE bằng4PNG mới ở assets: 0c6e579c active Đã chơi,527ca72d idle Đã chơi,c29af6e7 active Đã lưu,d30c4e9b idle Đã lưu. Giữ nguyên pixel nguồn2172×724; SVG viewBox0/90/2172/550 giảm lề trống dọc, không redraw chữ/nền. Desktop tiếp tục4ảnh cũ; giữ kích thước/vị trí tab. Đã xem đủ4ảnh, build/typecheck PASS; dist có đủ4asset mới; chưa browser QA.

- 2026-10-24: Sửa tab Lịch sử mobile phóng khi chọn do4PNG có lề alpha khác nhau. Đo bounds alpha>32 từ nguồn, dùng viewBox riêng từng ảnh để artwork active/idle cùng chiếm hộp nút cố định; không thay width/height khi chọn. Desktop giữ nguyên. Build/typecheck PASS; dist xác nhận bounds riêng; chưa browser QA.

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

- 2026-10-24: Theo user,2tab Lịch sử mobile thay bằng sprite b52ef10c-bb5a-4de9-800e-24e6a8d904eb.png chứa4trạng thái: trái idle/phải active, trên Đã chơi/dưới Đã lưu. SVG crop mỗi ô cùng1050×220 (x20/1100,y110/374) trên nguồn2173×724, giữ kích thước hộp cố định; không sửa pixel asset. Bỏ import4ảnh mobile trước, desktop giữảnh cũ. Build/typecheck PASS; dist có sprite mới; chưa browser QA.

- 2026-10-24: Kiểm tra Xếp hạng dùng ranking-title-transparent.png chứa chữ raster. Theo user dùng imagegen built-in edit nguồn đó tạo messages-title-gold-v2.png (Tin nhắn) và create-group-title-gold-v2.png (Tạo nhóm): prompt giữ biển đỏ/viền vàng/tua/font serif vàng nổi nghiêng, chỉ đổi chữ, alpha. Hai asset lưu src/assets/messages, bản gốc giữ nguyên. SocialDialogFrame thêm titleCrop opt-in SVG viewBox theo alpha bounds y179..544/181..544 để bỏ lề transparent khi render, giữ header geometry chuẩn Xếp hạng; bỏ chữ HTML riêng của2bảng mobile, h2 sr-only giữ accessibility. Xếp hạng/laptop không đổi. Đã xem cả2ảnh chữ đúng dấu; build/typecheck PASS; dist có2PNG mới; chưa browser QA.

- 2026-10-24: User yêu cầu toàn project dùng thanh cuộn Xếp hạng, mở riêng phạm vi scrollbar cả mobile/laptop. Đồng bộ qua utility Tailwind trên html/index.html cho mọi descendant kể cả portal/dialog/input/textarea: thumb trắng bo tròn, track/corner transparent, thin và6px cả ngang/dọc, ẩn nút mũi tên. Bỏ override màu vàng/xanh/nâu và scrollbar:none ở10file src; giữ overflow và gutter hiện có. Vùng cuộn trước ẩn nay dùng kiểu chung. uiClasses giữ gutter riêng, appearance quản lý tập trung index.html. Build/typecheck PASS; dist HTML/CSS xác nhận quy tắc toàn cục; chưa QA browser/điện thoại thật (overlay do OS/browser quản lý). Lịch sử hiện tại user chốt tạm xong; khóa lại các layout sau task.

- 2026-10-24: Theo user, Shop MOBILE mua thành công không hiện thông báo Đã mua. useShopPurchase thêm showSuccessMessage defaulttrue, ShopPage truyền!layout.compact; giữ cập nhật account/vàng/cosmetics và đóng popup, lỗi/thiếu tiền vẫn báo. Desktop giữ thông báo cũ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, Back Shop MOBILE bằng Chọn Bàn: dùng cùng compact:size-9/icon SVG size-5 (36/20px theo spacing), giữ gameUtilityButton và desktop48px. Build/typecheck PASS; dist xác nhận class kích thước; chưa browser QA.

- 2026-10-24: Theo user, scrollbar toàn project chỉ hiển thị dọc. Root index.html đổi chiều cao WebKit scrollbar ngang6→0, giữ dọc6px/trắng/bo; browser hỗ trợ WebKit dùng scrollbar-width:auto để không bị standard thin bỏ qua height0. Các vùng overflow-x-auto/scroll ẩn scrollbar qua selector chung (hỗ trợ Firefox), vẫn giữ overflow/kéo ngang. Đã đối chiếu3vùng kéo ngang hiện tại chỉ ngang, không chứa cuộn dọc. Build/typecheck PASS; dist HTML/CSS xác nhận selector; chưa browser QA. Áp dụng mobile+laptop.

- 2026-10-24: Theo user, giữ khung tên/Elo cạnh avatar cố định khi mở chỉnh avatar MOBILE: preview PlayerInfoCard dùng cùng chiều cao270/translateY-28 như hồ sơ, thay-20 gây nhảy8logical. Mở nút× DialogCloseButton chung trên tùy chỉnh avatar; bấm quay lại hồ sơ, không tự lưu avatar; nút hồ sơ vẫn đóng dialog. Giữ avatar geometry/desktop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, Đấu với máy MOBILE header tiện ích thu36/icon20 như Chọn Bàn (Back đã36). Thay form mobile sơ lược/lỗi nhãn tiếngViệt bằng panel nâu viền vàng, chân dung/nameplate máy, chọn engine, thẻ cấp5cột×2hàng, chọn bên và2nút ảnh gốc Vị trí tùy chỉnh/Đấu ngay. ComputerLevelButton tách nguyên markup desktop/Ornament tái dùng mobile (cao44/chữ18); laptop giữ nguyên markup lớp/geometry cũ. Giữ engine/level/side/API/start; không sửa gameplay. Build/typecheck PASS; dist xác nhận bố cục; chưa browser QA nên chưa xác nhận pixel/overflow thực tế.

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

- 2026-10-24: User chốt HOVANG mới thêm chỉ giữ LOCAL, không đưa GitHub; bản GitHub chỉ giữ Pikafish. .gitignore bỏ toàn bộ engines/hovang-*, adapter client/server, tests và tài liệu/build HOVANG. Tích hợp HOVANG trong tracked files (app/session/hooks/UI) vẫn là thay đổi local, phải loại từng hunk khi chuẩn bị commit và kiểm tra staged diff/build snapshot Pikafish-only; không commit các file đó nguyên trạng. Không push task này. Giữ toàn bộ file local, không xóa máy.

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

- 2026-10-24: User chuyển từ Chat sang Lịch sử, mở riêng lớp hiển thị2tab MOBILE: nav Đã chơi/Đã lưu z25 thay10, cao hơn banner/họa tiết z20 để không bị che; nút× z30 vẫn trên. Không sửa vị trí/kích thước/assets/tab data, desktop giữ z10. Khóa lại phạm vi sau task. Build/typecheck PASS; dist xác nhận compact:z25; chưa browser QA.

- 2026-10-24: Theo user, nhóm mới tạo lên đầu Tin nhắn. Nguyên nhân backend order last_message_at NULL của nhóm chưa tin bị đẩycuối; đổi order COALESCE(last_message_at,created_at) DESC,created_at DESC,id DESC để nhóm mới đúngthứtự cả polling/mởlại. Client sau create/reload đưa id nhóm mới lênđầu ngay và xóa query; local đã prepend giữ nguyên. Không ghi tin giả/đổi dữliệu tin. Build/typecheck PASS; dist index-gOgMGD3M.js cập nhật; chưa browser/API live QA, không restart/deploy backend.

- 2026-10-24: Theo user, Chọn Bàn nới ô tìm theo số/nútTìm: form desktopmin440/46% thay360/42%, compactrộng viewport-112px thay58% để chừa back/âmthanh; nút min72desktop/64mobile, gap6mobile, thêm kínhlúpSVG16 bên chữTìm. Giữh36/logic joinByCode/mã6số/pending. Build/typecheck PASS; dist xác nhận440/46%; chưa browser QA.

- 2026-10-24: User yêu cầu thu nhẹ cụm tìm Chọn Bàn: desktop410/44% thay440/46%, mobileviewport-124px thay-112; nútmin66desktop/60mobile thay72/64. Giữ cao/icon/logic. Build/typecheck PASS; dist xác nhận410/44%; chưa browser QA.

- 2026-10-24: User thu thêm cụm tìm Chọn Bàn: desktop390/43%, mobileviewport-134px; nútmin62desktop/56mobile, cao/icon/logic giữ. Build/typecheck PASS; dist xác nhận390/43%; chưa browser QA.

- 2026-10-24: Theo user, Home MOBILE dấu∞ năng lượng tăng3.2→4cqw (25%), giữ tâm; sốnănglượng thường/vàng/laptop/chínhsách2ID vôhạn giữ nguyên. Build/typecheck PASS; dist xác nhận4cqw; chưa browser QA.

- 2026-10-24: User tăng tiếp dấu∞ Home MOBILE4→4.8cqw (thêm20%), giữ tâm/các giátrịkhác/laptop. Build đầu Vite lỗi-1073740791; chạy lại build/typecheck PASS exit0, dist có4.8cqw. Chưa browser QA.

- 2026-10-24 — TODO do user yêu cầu ghi nhớ: sau này thiết kế thêm2mục Nhiệm vụ và Hòm thư ở bên phải ngoài Home. Hiện chỉ ghi backlog, chưa triển khai UI/chức năng, chưa mở khóa bố cục hoặc chốt kích thước; khi thực hiện mặc định mobile theo phạm vi phiên hiện tại, laptop cần yêu cầu riêng.

- 2026-10-24: Đính chính nơi ghi ý tưởng Home Nhiệm vụ/Hòm thư: backlog chính thức tại docs/backlog/ui/home-nhiem-vu-hom-thu.md, liên kết mục Làm sau trong docs/backlog/README.md. Chỉ ghi ý tưởng, chưa triển khai.

- 2026-10-24: User yêu cầu lưu UI bàn cờ hiện tại thành mốcA trước thử thayđổi. Checkpoint docs/checkpoints/board-ui-A có snapshot323file (gameUI/hooks/pages, token/styles và assetsboard/pieces/directimports), manifestSHA256 khớp323/323, gitHEAD thamchiếu; gồm uncommitted hiện tại. Khi hoàn tácA chỉ phục hồi phạm viUI yêu cầu, không resetcảproject/ghiđè thayđổi chức năng khác. Chưa sửaUI bàncờ ở lượt này; không ghiđè checkpointA.

- Kiểm chứng checkpoint bàn cờA: build/typecheck PASS exit0, dist cập nhật (dist/assets/index-Cpid4rd6.css, dist/assets/index-CVd1enXP.js). Chưa browser QA; không có thay đổi UI bàn cờ trong task lưu mốc.

- 2026-10-24: User mở riêng bố cục bàn cờ MOBILE theo ảnh:2PlayerCard trêncùng mìnhtrái/đốithủphải, avatar64giữ nguyên, tên dưới/Elo dưới tên (giữ khiđấu); MobileMatchSummary giữa hiểnthị mãphòng thật trên2clock theo màu/state. Header164px/bottom90px, hookfitreserve254px; giữboardgeometry/phe/luật/serverclock. Các tiệních/menu/chat/view và matchactions/like chuyểnxuốngdưới, menumởlên; controlsreplayđán hthử ởcụmdưới có maxheight/cuộn. Desktop nhánh cũ giữ. Tài liệu docs/MOBILE-BOARD-UI.md. Build/typecheck PASS; dist xác nhận Mã phòng và thời gian. CheckpointA đã đối chiếu323/323SHA256 nguyênvẹn. Chưa browser/thiếtbị QA, không chạythử gameplay; khôngsửadatabase/deploy.

- 2026-10-24: Theo user thu nhỏ cụm người chơi MOBILE: avatar64→56px riêng mobileHeader, nameplateclamp84/26vw/108 thay96/30vw/124, Elo cao24/icon15/chữ13/đệm8. Hai cụm neo left/right2px và cột(100%-144)/2 để nhích ra ngoài. Clock nhỏ70×25/chữ14 đặt cạnhnhau (trái/phải đúng leftSide/rightSide) thay2hàng; mãphòng ởtrên. Desktop/clocklogic/checkpointA giữ nguyên. Build/typecheck PASS; dist xác nhận nameplate mới; chưa browser QA.

- 2026-10-24: Theo user, bỏ nhãn màu Đỏ/Đen hiểnthị trên clock (aria giữ), avatarheader56→60px kéo danhhiệu/sao cùng tỷ lệ, hai cột user thu(100%-160)/2 để nhíchra2bên. Clockcao24 ngangElo; hook đo rect[data-player-elo] thật ghi --mobile-clock-top, observer identity tựcăn khi tên/profile/layout đổi; fallbackcalc chỉtrướcđo. Tên/Elo/cỡclock khác/laptop/mốcA giữ. Build/typecheck PASS; dist xác nhận --mobile-clock-top; chưa browser QA.

- 2026-10-24: Theo user tăng cụmuser MOBILE: avatar60→64px kéo danhhiệu/sao theo; chữname tăng24→26/180 theo width nameplate (giữwidth để khôngtrànmép), ELOcao26/icon16/chữ14/đệm9. Mãphòng108×52→120×58/chữ14 và riêng plaque top+6px, khôngdịchclock; clockvẫnđo theoElo thật. Desktop/mốcA khôngsửa. Build/typecheck PASS; dist xác nhận plaque top6/120×58; chưa browser QA.

- 2026-10-24: Theo user, header bàncờ MOBILE avatar64→68px (danhhiệu/sao theo tỷlệ), chữname26→28/180 theo width hiệncó; Elo thu cao26→24/đệm9→8/icon16→15/chữ14→13. Nút View khôi phục cao26px như snapshotA, giữ neo đáy hiện16px. Clockđo theoElotiếp tục, fallback cậpnhậtavatar. Desktop/mốcA giữ. Build/typecheck PASS; dist xác nhận name28/180; chưa browser QA.

- 2026-10-24: Theo user, tên header bàncờ MOBILE hiểnthị đầyđủ, không...: PlayerNameplate thêm fullName opt-in/khôngtruncate/chữsốkhôngthu0.9em, đệm4px/tựxuốngdòng nếu dài và tựtăngcao biển; chỉPlayerCard mobileHeader bật, cáctab/laptop giữmặcđịnh.3nút Lưu/Chat/Menu thu44→36px/icon20 như tiệních Chọn Bàn, slotchat/offset46/headerh36 đồngbộ; núttrongmenu cũng36. ClockvẫnđoElo theoidentityheight. Build/typecheck PASS; dist xác nhận fullName; chưa browser QA.

- Kiểm chứng lượt bố trí mobile2026-10-25: tăng vùng điều khiển dưới bàn90→144px và đồng bộ phép fit Board để View không chồng hàng thao tác ở màn thấp. Build/typecheck PASS, dist xác nhận mã vị trí View/icon mới; chưa browser QA.

- 2026-10-25: Theo user, các nút tiện ích MOBILE back/sound/chat/menu/save/friends/reset/trash đồng cỡ dock Home: token mobileUtilityTokens ởuiClasses size min(12.5vw,56px)/icon28px. Game/RoomSelection/ComputerSetup/CustomPosition/Shop áp dụng; Home dock không đổi hình học, laptop chỉ thêm customproperty khôngđổi style. Bỏ override36/icon20, slotchat theo cùngsize/portaloffsetcalc8+size+gap; popupmenu mởtrên size+12, headerroom/computer cao size+12 để khôngtràn. GiữView/MatchActions/avatar/khóaUIkhác. Build/typecheck PASS; dist xác nhận token; chưa browser QA, snapshotA khôngsửa.

- 2026-10-25: User thu lại lượt tăng nút tiện ích MOBILE bằng Home: hiện chỉ tăng nhẹ so với gốc36px/icon20 lên40px/icon22, thay size min(12.5vw,56px)/icon28 của lượt trước. Đồng bộ slotchat/portaloffset/header/popup theo40px; Home/laptop/View/avatar giữ nguyên. Build/typecheck PASS; dist index-BKiDThIc.css có token40px; chưa browser QA. Không sửa checkpointA.

- 2026-10-25: Theo user tăng nhẹ tiếp nút tiện ích MOBILE40→42px/icon22→24px; slotchat/header/offset và menu đồng bộ42px. Home/desktop/View/avatar không đổi. Build/typecheck PASS; dist xác nhận token42px; chưa browser QA.

- 2026-10-25: User mở Shop cả laptop/mobile để kiểm tra thêm khoảng20avatar. Thêm20 thẻ mẫu riêng ShopPage dùng18ảnh avatar sẵn có (lặp2ảnh), không tạo hình mới/catalog backend/giao dịch. Thẻ mẫu có nút Xem thử, không gọi mua/đánh dấu sở hữu;5sản phẩm thật giữAPI cũ. Lưới giữ4cột×2hàng laptop và3cột×4hàng mobile, hàng phát sinh cùngchiều cao để cuộn thay coô. Build/typecheck PASS; dist xác nhận avatar-preview; chưa browser QA. Đây là dữ liệu xem thử, chưa chốt hàng mở bán.

- 2026-10-25: User xác nhận muốn20 hình avatar mới khác nhau, thay20thẻ dùngảnh cũ của lượt trước. Built-in image_gen tạo20portrait riêng phongcách cổtrang/chân dung giữa nền nâuđỏ; lưu20PNG gốc +20JPEG512 tại src/assets/shop/avatars/daily/, prompt/tên/nguồn tại source.json và contact-sheet.jpg. dailyAvatarPreviews.ts nạp20ảnh cho PhiênChợHằngNgày cả laptop/mobile; Xem thử mởShopAvatarPreview ảnh lớn, Escape/Đóng/bấmngoài đóng. Giữ5sản phẩm thật/backend/giao dịch; ảnhmới chỉxemthử, chưa mởbán. Đã xemcontactsheet20ảnh, build/typecheck PASS; kiểm đếm20ảnhgốc/20portraittrongdist; chưa browserQA.

- 2026-10-25: User đính chính20viền Shop phải đơn giản như3viền hiện có, không họatiết long/phượng cầu kỳ. Bỏ hướngimagegen trangtrí (không dùngảnh đó trong project). Tạo20SVG gốc dạngvòngtròn, tâm/nềntrongsuốt,20palette và5kiểuđiểmnhấnnhỏ: trơn/ngọcthoi/hạt/khấc/đườngkhắc. Asset+source.json tại src/assets/shop/frames/daily; dailyFramePreviews.ts thêm20thẻ KhungViền/Tấtcả PhiênChợHằngNgày cả laptop/mobile. Popup xemthử nhậnkind, lồngviền lênavatar; khôngcliptrònviền. Giữ20avatarmới/5mónmua thật/backend;20viền mới chưa mởbán/cấpquyền. Build/typecheck PASS; đếm20SVG, dist cóframe-preview; chưa browserQA.

- 2026-10-25: User thấy20viền quá đơn giản, yêu cầu làm lại thêm1–2họatiết/mẫu. Cậpnhật đúng20SVG hiệncó, giữpalette/dángvòngtròn/tâmtrongsuốt; mỗi mẫu1motif riêng (sen/mây/vươngmiện/lá/cánh/ấn/lửa/mai/ngọc/trai/quạt/trúc/sóng/sao/nút/cánhhoa/bội/núi/mặttrời/cuốnvân) và1điểmngọc nhỏmépdưới. Khôngthêmhàng/đổigeometryavatar hoặc backend/mua. source.json cậpnhật motif; cả laptop/mobile dùngcùngasset. Build/typecheck PASS; dist cậpnhật; chưa browserQA.

- 2026-10-25: User bác20SVG, yêu cầu tối thiểu chấtliệu như3viền đỏ/ngọc/tím trongảnh. Tạo lại20ảnh riêng bằng built-in image_gen, dùng trực tiếp3PNG hiệncó làm style reference: vòngmen/ngọc/kimloại cóvân, bevel/ánhbóng/2ốp nhỏhai bên, tâm+nềntrongsuốt. PNG gốc1254² vàruntime512² tại src/assets/shop/frames/daily-v3/, prompt/nguồnsource.json, contact-sheet.jpg. dailyFramePreviews.ts chuyển20import sangPNG mới, SVG cũ khôngruntime; khôngthêm20thẻ nữa hoặcđổimua thật. Đãxemcontactsheet20mẫu; tâm/góc20ảnhalpha0 (alpha-report.json); build/typecheck PASS, distđủ20PNG. ÁpdụngShop laptop/mobile, giữpopupxemthử; chưa browserQA.

- 2026-10-25 — Quy tắc Shop thật mới (thay các mục xem thử/500 vàng trước): cả laptop/mobile dùng catalog45 món (22avatar,23viền), toàn bộ Phiên Chợ Hằng Ngày giá3000vàng.20avatar mới code18–37/20viềnPNG mới code7–26 đã nối ADMIN catalog, render AvatarPortrait/getAvatarFrame/overlay và danh sách sở hữu; mua cập nhật DB/account, không tự equip. Card chỉ hiện6món server chọn (3avatar+3viền), bấm hình mở popup rõ dù đãmua, nútMua riêng mở xác nhận. Server chặn mua món ngoài ngày/phiên hết hạn sau kiểm tra idempotency, giữ transaction/chống trùng/thiếuvàng.
- Lịch chung server theo00:00ViệtNam UTC+7; mỗi ngày1roll60%0móncũ/30%1/10%2 trên tổng6món. Cũ là từngxuấthiện bấtkỳngàytrước, không phải đãsởhữu; ngày đầu chưa cócũ chỉhàngmới. Khônglặpmón trongngày. Khi khôngđủ mới mỗi loại, bù tối thiểu bằngcũ để đủ3+3; hếtmới được6móncũ theo user, khôngreset lịch sử. DB daily_shop_state/daily_shop_days giữ lịch sử trọn đời và bộngày đã chốt; khóa singletontransaction để khôngrandomkhác giữa request/server/restart. Chỉ chốt khi phát sinh phiên ngày, không tạo lịch giả cho ngày không truy cập.
- Thực hiện migration local chuẩn theo thứtự:007_saved_match_details:001 cònchờ (title/noteLịchsử) và008_daily_shop:001–002 đãapply+verifySchemaPASS (3bước).001–006 khôngsửa; khôngSSH/deploy/restart. CLItsx vướng uv_os_get_passwd ENOMEM, dùng Node native transform-types/resolvehook để chạy chính server/database.ts migrate. Đãkhởi tạo phiên thật2026-10-25 từShopService.daily:avatar27/36/31,frame23/8/11,đúng6×3000vàng; khôngmua thử/trừvàng/cấpđồuser. Build/typecheck PASS; dist index-BsP-6WJl.js có/shop/daily, không chạy tests/browserQA. ClientQuery poll30s/focus vàtimerrefreshAt để đổi ngày; lỗi cóThửlại, khôngfallbackcataloggiả.
- 2026-10-25: Theo user, popup xem viền Shop cả laptop/mobile dùng avatar hiện tại từ sessionStore.avatarIndex thay avatar16 cố định. Theo dõi reactive cùng nguồn trang bị/account, chỉ đổi ảnh trong viền; xem avatar sản phẩm/geometry/mua không đổi. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, bỏ dòng trạng thái “Không tìm thấy người chơi” khi danh sách Tin nhắn không có hội thoại phù hợp; giữ nguyên ô tìm kiếm, lọc và danh sách. Build/typecheck PASS; dist xác nhận không còn chuỗi trạng thái. Chưa browser QA.

- 2026-10-26: Theo user, nềnmờ thôngbáo/xácnhận phải phủ toànviewport kểcả ngoài khunggame. Thêm NoticeOverlay dùng native dialog.showModal top-layer, fixedinset0/100vw×100dvh/maxnone để thoátclipping/transform khungcha nhưng kếthừatoken. Ápdụng MessagesFriendRemovalConfirmation dùngchung Hồsơ/Chat/thànhviênnhóm, feedbackHồsơ vàfeedbackBạnbè cả2viewport. Giữnộidung/nút/callback, EscapegọiHủy (pendingkhôngđóng); stopPropagationcancel/close để khôngđóng/resetdialogcha. Build/typecheck PASS,distcậpnhật; chưa browserQA. Chỉ mởphạmvilớpphủthôngbáo tasknày, geometryavatar/cácbảng giữkhóa.

- 2026-10-26: Xem thử theo user: SearchButton chung Bạnbè mobile/laptop và ChọnBàn dùng ảnhfriend-action-button-frame.png nhưMờichơi thaysearch-frame.png; chữ/iconnâu#2b1909để rõ trênnềnvàng. Giữ size/class từngngữcảnh/type submit/disabled/callback; khôngđổiMờichơihoặclayoutBạnbè. Build/typecheck PASS,distcậpnhật; chưa browserQA. ChỉxemthửkhungnútTìm, khôngchốtkhóavĩnhviễn.

- 2026-10-26: User thaythử SearchButton bằngkiểuvàng nútHủy/Đồngý trongảnh (mobileNoticeButtonStyle): bỏảnhMờichơi, nền gradient#ad7e08→#805100/viền#d8ac35/chữicon#ffe535/bo3px/insethighlight nhưmẫu. ÁpdụngchungTìm Bạnbè/ChọnBàn cảmobile/laptop; giữsize/submit/disabled/callback. Build/typecheck PASS,distcậpnhật; chưa browserQA. Đây làxemthử, thaylượt dùngảnhMờichơi trước.

- 2026-10-26: Theo user, Không hiển thị lại của xác nhận xóa bạn chuyển xuống dưới panel15px, căn phải theo panel thay vì gócviewport. Label absolute topcalc100%+15/right0 bên trong sectionrelative, giữcheckbox/pending/hànhvi và nềnmờfullviewport; áp dụngcomponentchung Hồsơ/Chat/thànhviên cảmobile/laptop. Build/typecheck PASS,distxácnhận; chưa browserQA.

- 2026-10-26: User bỏKhônghiểnthịlại ởxóabạn: gỡcheckboxkhỏiMessagesFriendRemovalConfirmation, bỏbypassmutedUntil/cấpmute ởhook vàmemberoptions đểluônxácnhận; giữhủy/đồngý vàbackend. ThôngbáoMờichơi/SoTài dùngNumberText compact/normal/khôngsoften cho2chỗtên, đồngfont/cỡsốnhưtênkhác. Thu2khung✓× desktop80×40→56×36/mobile90×46→64×38, tăngdấu24→32px/căngiữa; giữmàu/aria/pending/callback. Ápdụngcảlaptop/mobile. Build/typecheck PASS,distcậpnhật; chưa browserQA.

- 2026-10-26: Theo user, thôngbáoMờichơi/SoTài xếpChặn/×/✓ (×trái✓phải). Haiô tick5phút/10phút chọnđộcquyền, mặcđịnh5; Chặn từchốilờimờihiệntại vàkhóa người gửitheokhoảngchọn,×chỉtừchối. ChallengeService validateacceptedfalse/block5|10, chặnserver trướcphátinvite; blocksRAM theo socketngườinhận+accountIDgửidoauthcontrollercấp (khôngtinclient), gửinốilạikhôngbypass, hếtgiờtựdọn. Receiverdisconnect xóablockphiên;reload/thoát-vàolạigame nhậnlờimờibìnhthường, rờibàntrongcùngkếtnốikhôngreset. KhôngDB/khôngchặnchat/hủybạn. Khi bịchặn gửi,mọientryBạnbè/Hồsơ hiệntoastĐãbịchặn dùngchungInviteSentNotice vớiĐãgửi; resultblockcũngtoast, khôngpopup lớn. Build/typecheck PASS,distcậpnhật; chưa QA2client/socketthật,khôngchạytests/khôngrestartserver.

- 2026-10-26: Theo user dờiphầnChặn xuốngdưới2nút×/✓, táchbằngline/đệm16; nútChặn112×46/chữ20px, ôtick20px/chữthờigian18px/gap24 lớn hơn. Hai nút×/✓ vàlogicblock5/10phút giữnguyên. Ápdụnglaptop/mobile. Build/typecheck PASS,distcậpnhật; chưa browserQA.

- 2026-10-26: User đổiChặn thành1checkboxtrắng bên dưới×/✓ cănphải. Bỏnútvàng/line/haiôthờigian; một hàngjustify-end ôtick20px+Chặn+select5/10phút (mặcđịnh5). Tickthựchiệnchặn server/từchối nhưnúttrước;×vẫnchỉtừchối,✓vẫnnhận. Ápdụngmobile/laptop,khôngđổilogicblockphiên. Build/typecheck PASS,distcậpnhật; chưa browserQA.

- 2026-10-26: Theo user, checkbox trong lời mời So tài chỉ còn nhãn “Không hiển thị lại” và ô tích; căn nhãn trái/ô tích sát phải, tăng chữ lên20px và ô tích28px. Tick giữ hành vi chặn người gửi trong5phút mặc định rồi từ chối lời mời hiện tại; ×/✓ không đổi. Build PASS, dist cập nhật; chưa browser QA.

- 2026-10-26: Theo user, trang tùy chọn Tin nhắn của nhóm thêm mục cuối “Rời nhóm” với biểu tượng cửa/thoát màu vàng đồng bộ hàng icon và chữ hồng đỏ. Mở xác nhận kiểu thông báo Tin nhắn trước khi rời; dùng action member=leave đã có ở backend, chỉ xóa nhóm khỏi danh sách và lịch sử hiển thị của chính người rời, không xóa nhóm/tin nhắn toàn cục. Build/typecheck PASS; dist cập nhật; chưa browser/API live QA.

- 2026-10-26: Theo user, lỗi thao tác Tin nhắn (tạo nhóm/thao tác quá nhanh và lỗi thành viên/rời nhóm) tự ẩn sau3giây, dọn timer khi đổi lỗi/unmount. Chủ nhóm có khóa vàng thấy dòng Cài đặt/icon bánh răng vàng ở đầu tùy chọn nhóm; các hàng chủ nhóm dời xuống cùng nhịp, Rời nhóm vẫn cuối. Cài đặt chưa có nghiệp vụ được chốt, bấm hiện toast Chức năng đang được cải tiến tự ẩn. Build/typecheck PASS; dist xác nhận Cài đặt nhóm; chưa browser/API live QA.

- 2026-10-26: Quy tắc nhóm mới theo user (thay nút Cài đặt placeholder): Cài đặt chỉ chủ nhóm/khóa vàng, Đổi tên đưa vào trong, có Chuyển khóa vàng cho thành viên đang tham gia, công tắc Duyệt thành viên và Giải tán nhóm cuối bảng. Giải tán/Rời nhóm cùng chữ đỏ nhạt#ff9b9b. Chủ nhóm bấm Rời nhận popup Vui lòng chuyển khóa vàng cho người khác trước khi rời nhóm; backend chặn tương ứng409. Transfer khóa conversation trong transaction, hạ owner cũ/nâng người nhận; chỉ chủ nhóm được transfer/dissolve/đổi duyệt. Giải tán kết thúc mọi membership và dọn yêu cầu chờ, giữ dữ liệu lịch sử, cả nhóm không gửi tiếp được.
- Duyệt mặc định tắt: thành viên thường thêm người vào thẳng khi tắt, khi bật tạo yêu cầu chờ không tạo membership và hiện thông báo chờ giống xác nhận Tin nhắn. Chủ nhóm thêm luôn trực tiếp và dọn yêu cầu tương ứng. Xem thành viên có Thêm thành viên chọn bạn đã accepted, chủ nhóm thêm tab Chờ duyệt/tên người mời/nút từ chối hoặc duyệt; polling dùng dữ liệu DB, chặn phản hồi cũ khi đổi nhóm/tài khoản. Tắt duyệt chỉ áp dụng lời mời mới, yêu cầu đã chờ vẫn để chủ nhóm xử lý. Không cấp quyền gửi/đọc tin cho người chờ.
- Migration009_group_membership thêm conversations.member_approval_required và conversation_join_requests; giữ001–008 nguyên vẹn. Đã apply2bước vào MySQL local qua db:migrate và verifySchema PASS (lần sandbox bịEACCES, chạy lệnh được duyệt ngoài sandbox thành công). Regression group-administration18/18 PASS; typecheck/build PASS, dist xác nhận đủ điều khiển. Chưa browser/2tài khoản/API live QA; không SSH/deploy/restart server.

- 2026-10-26: Theo user, Rời nhóm/Giải tán nhóm tăng đỏ từ#ff9b9b sang#ff5555; cả chữ và icon dùng đúng cùng màuđỏ, chỉ2mục này. Build/typecheck PASS, dist xác nhận; chưa browser QA.

- 2026-10-26: User đổi Xem thành viên thành dãy tab ngang/lướt ngang: Tất cả → Trưởng và phó nhóm → Đã chặn → Duyệt thành viên (tab duyệt chỉ chủ nhóm). Tất cả/Trưởng-phó dùng role DB, khóa vàng owner/khóa bạc deputy và giữ avatar geometry; vàng được phong/gỡ phó trong menu..., quyền quản trị hiện chỉ owner. Bỏ Kết bạn trong danh sách/menu thành viên; menu vàng có Phong/Gỡ phó, Chặn/Bỏ chặn và Xóa khỏi nhóm ở cuối, chữ+icon Xóa cùng đỏ#ff5555 của Rời nhóm. Thêm thành viên chuyển khỏi tab sang icon người+ góc phải trên trang tùy chọn nhóm, đối diện back; danh sách mời riêng vẫn chọn bạn accepted. Cài đặt Duyệt thành viên nay mở chính tab thành viên, công tắc và danh sách chờ cùng một chỗ.
- User xác nhận Chặn thành viên là chặn CHAT và MỜI, KHÔNG đuổi khỏi nhóm: giữ membership/quyền đọc, từ chối send(text/ảnh) và add/invite trên server; chặn chỉ trong nhóm đó, không sửa quan hệ bạn bè/chặn riêng. Tab Đã chặn lấy DB, owner có Bỏ chặn, phục hồi hai quyền mà không đổi ghế/role/membership. Owner không được chặn/phong lại chính owner; member/deputy không có quyền moderation. Migration010_group_moderation đổi CHECKrole thêmdeputy và tạo conversation_member_blocks,001–009 giữ nguyên. Đã apply2bước local+verifySchema PASS.
- Kiểm chứng: group-administration18/18 và group-moderation12/12 PASS khi chạy từng file (chạy chung bị cache Temp ENOENT của môi trường); typecheck/build PASS, dist cập nhật. Chưa browser/2client/API live QA; không SSH/deploy/restart server.
- 2026-10-26: CI PR #5 run 40275314056 trên SHA `f5ce3c2c8b881412fb5d73ea611e5fd4f6fc81a8` có 58 diagnostic TypeScript do các module được import nhưng chưa được Git theo dõi; `src/types/dailyShop.ts` không bị ignore và đường dẫn/casing đúng. Đã stage 76 file nguồn, asset runtime, migration và regression test cần thiết cùng tài liệu cập nhật. Không thêm HOVANG source/binary, không đổi thuật toán/game logic. Clean checkout: typecheck PASS, full tests 447 PASS/26 SKIP/0 FAIL, build PASS. CI gốc dừng sau typecheck; không commit/push/merge/deploy.

- 2026-10-26: CI PR #5 run 40277641337 xanh typecheck/full suite nhưng Disposable MySQL integration phát hiện 4 Shop tests dùng fixture đã lỗi thời (giá cũ500 và mua trực tiếp món không thuộc phiên chợ); Shop hiện dùng6 món mỗi ngày,3000 vàng/món. Không đổi nghiệp vụ: tests lấy sản phẩm thật từ /shop/daily bằng tài khoản xác thực, kiểm tra giá3000 và giữ auth/tamper/idempotency/concurrency/insufficient-funds/rollback assertions. Disposable MySQL 8.0.45 migrate lần1/lần2, verify, smoke và 4 file integration PASS 20/20; full suite PASS 456/21 skip trên477, typecheck PASS. build PASS; không dùng DB production/HOVANG, không deploy.

- 2026-10-26: Theo user, Xem thành viên bỏ khung/nền nút tab: Tất cả/Trưởng và phó nhóm/Đã chặn là tab ngang lướt, line dưới chung và tab chọn đổi chữ+gạch vàng. Duyệt thành viên tách một dòng toàn ngang dưới tab, tiêu đề Thành viên(số) xuống dưới dòng duyệt. Header back trái, icon thêm bạn vào nhóm+tìm kiếm phải; tìm bật input lọc tên trong danh sách đang xem, thêm mở danh sách mời hiện có. Giữ API/quyền/geometryavatar. Build/typecheck PASS,dist xác nhận2control mới; chưa browserQA.

- 2026-10-26: Theo user, Xem thành viên/Thêm bạn cùng fullwidth/fullheight vàpadding20 như trang Cài đặt, bỏ inset3/6% và viềnpanel riêng. Dòng Duyệt thêm iconngười+dấutích vàng theo iconthêmngười; bỏsố/mũitên, chỉhiệnchấmbáođỏ10px khi pendingMembers.length>0, aria cósốchờ. Build/typecheck PASS,distxácnhận; chưa browserQA.

- 2026-10-26: Theo user, header thành viên thu iconTìm/Thêm28→24px, đảo thứtự Tìmtrái/Thêmphải. Ô tìm bật ngaybêntráiiconTìm trongcùnghàngheader, dùng messagesFriendsField/Input mẫuTìmBạnbè (gradientnâu/viềninsetvàng/font), cao36px/co theo vùngtrống; bỏhànginputriêng. Giữlọctên/luồngmời. Build/typecheck PASS,distxácnhận; chưa browserQA.

- 2026-10-26: Theo user, header thành viên cố định cao36px để mởôTìm khôngdịchUI; inputkhôngautofocus, mởXemthànhviên resetsearchđóng/rỗng. Sốcounttiêuđề dùngNumberTextcompact/normal nhỏ0.9em nhưsốtên. Duyệt mởtrangriêngtrongcùngkhung, ẩntab/dòngđiềuhướnggốc, cóswitchbật/tắt vàdanh sáchchờ, backvềTấtcả. TabTrưởng-phó bỏdòngDuyệt, thayThêmphónhóm mởchọnthànhviênthường gọiAPIpromotehiệncó;backvềTrưởng-phó. Build/typecheck PASS,distxácnhận; chưa browserQA.

- 2026-10-26: Theoảnhuser, chữ Xóa toàn bộ tin nhắn? MOBILE dùng cùngfontbody/cỡ18px với dònggiảithích để nhìnđồngcỡ (trướcCormorantnhỏthịgiác), giữnguyênbold. Desktopgiữfontcũ. Build/typecheck PASS,distxácnhận; chưa browserQA.

- 2026-10-26: Theo user, phầnthànhviên/duyệt khônghiện lỗi Thao tác quá nhanh (chỉẩnmessageUI,giữratelimitserver). Menu...vàng thêmPhongtrưởngnhóm. Phong/Gỡphó từmenuhoặcThêmphó đều mởxácnhận; phongtrưởng cảnhbáomấtquyền/vềmember, chỉgọitransfer sauĐồngý. TáidùngAPItransactionowner→member/target→owner và cậpnhậtroles/creatorName ngayđểẩnquyềnquảntrịcũ. Build/typecheck PASS,distxácnhận; regressiongroup-administration18/18PASS; chưa browserQA.

- 2026-10-26: Theo user, Thêm phó nhóm dùng row cùng avatar/tên/font/chiều cao1/8 như Thành viên, avatar mởprofile và+ mởconfirmphong; khôngsửa geometryavatar. TabĐãchặn bỏdòngDuyệt, chỉTấtcả giữ. KiểmtraChặn phát hiện polling dùngchunghạnmứcIP600/phút vớiwrites trongkhiUIẩn429: táchread/write bucket,cùnggiữ600/phút mỗi nhóm, khôngbỏratelimit. Thêmversionguard dữliệugroup đểphản hồipollcũkhôngghiđè blockedlist sauvừachặn/bỏchặn. HTTPregression xácnhậnhết600GETvẫnPATCHblockthànhcông1/1PASS; moderation12/12PASS. Build/typecheck PASS,distxácnhận. Chưa2client/browser/DBthậtQA,khôngrestartdeploy; backendcầnnạpcodecontroller mới.

- 2026-10-26: Theo user, dấu+Thêmphó đổiSVG34px/nút40px thayglyph24/nút32 để rõ/lớnhơn. Đối chiếuluồng: pickerphóchỉlấymembershiệntạirolemember; pickerThêmthànhviênchỉfriendsaccepted vàchưacótrongnhóm, giữlọcsearch. Build/typecheckPASS,distxácnhận; chưa browserQA.

- 2026-10-26: Theo user, dấu+Thêmphó SVG34→30px giữnguyênvùngbấm40. Người bịchặn cóbadge nềntrònxám/cùngkíchthước-vịtríkeyvàng vàdấu/đỏ#ff5555, dùngcomponentBlockedMemberBadge tạiTấtcả/Trưởng-phó/Đãchặn/Thêmphó. Trạngtháiblockedưu tiênhiệnbadge/ thaykey, rolethậtkhôngđổi; bỏchặntrảbadgekeynếucó. Giữavatar geometry. Build/typecheckPASS,distxácnhận; chưa browserQA.

- 2026-10-26: Theo user, badgeblocked dấu/đỏ dùngSVGfullsize/pathchạm gầnmépvòngtròn thayicon13px. BỏiconThêmthànhviên ởtrangoptionsngoài (ảnhuser). Thànhviênthường chỉxemTấtcả vàtìm, ẩnTrưởng-phó/Đãchặn vàiconmời trongbảng; khi mấtrole tựvềTấtcả. Vàng/bạc giữtabquảnlý vàiconThêm trongXemthànhviên. ChỉđổiUItheouser, backendluậtchặn/mờiđãchốtgiữ. Build/typecheckPASS,distxácnhận; chưa browserQA.

- 2026-10-26: User thu dấu/blocked vềcùngiconkeyvàng: SVG13logical thayfullsize, vòngbadge20/vịtrí/path/màu giữ. Build/typecheckPASS,distxácnhận; chưa browserQA.

- 2026-10-26: Theo user, các dòng options (Xóa chat/Báo cáo/Rời/Cài đặt) dùngfontnumber/cỡui-p22/normal nhưXemthànhviên để đồngcỡthịgiác. Đổi tên nhóm chuyển thànhiconbút cạnhtênchỉowner, mởformmax80/APIrenamehiệncó; bỏhàngĐổitên/Chuyểnkhóa/Duyệt khỏiCàiđặt (phongtrưởng vàduyệt trongThànhviênvẫngiữ). Càiđặt chỉTắttinnhắnnhóm, dưới cóline vàGiảitánởcuốidanh sáchđượcnânglên, bỏảnhrowmũitênriêngGiảitán/giữtrashđỏ.
- Tắttinnhắnnhóm mởtrangtrongkhungcũ với2checkbox Tắt tin nhắn nhóm/Khóa bạc có thể nhắn. Serverkhóachatkhibật: ownerluônđượcgửi, memberbịchặn, deputy chỉđượckhioptionbạc=true; individualblockedvẫnbịchặn. Text/ảnhđềudùngsendchung/ảnhlỗidọnfile, vẫnchoxemtin. Flagsmặcđịnhfalse,persistDB,owner-onlymutation+validatebool/transactionlock. Migration011_group_chat_controls đãapply1bướclocal+verifySchemaPASS,001–010khôngsửa. Pollversionguard tránhphảnhồicũđèswitchsauvừalưu.
- Kiểm chứng group-chat-controls9/9 vàgroup-moderation12/12PASS; typecheck/buildPASS,distcậpnhật; chưa browser/2clientQA,khôngrestartdeploy/backendcầnnạpcode mới.

- 2026-10-26: Theo user, Giảitánnhóm trởlại dạnghàngcókhungnâuviềnvàng/cùngcao90logical/mobile50 nhưcáchàngsettings, giữchữiconđỏ/linephâncách/khôngmũitên. DướinhãncheckboxTắttinnhắnnhóm thêmghichú14pxmàukem: Người dùng trong nhóm sẽ không thể gửi tin nhắn. Build/typecheckPASS,distxácnhận; chưa browserQA.

- 2026-10-26: Theo user, núttrongoptionsnhóm/thànhviên/càiđặt bấmkhôngnháy: tắtWebKittaphighlighttrongphạmvi, disabledkhôngđổiopacity, giữkeyboardfocus/chốngbấmlặp. Checkboxduyệt/tắtchat/quyềnbạc hiểnthịngaygiátrịvừachọn trongkhiAPIpending, lỗihoànlạigiátrịserver; khôngcònchớptrạngtháicũtrướclưuxong. Build/typecheckPASS,distxácnhận; chưa browserQA.

- 2026-10-26: User đính chínhnháyởôcheckbox. Thay3ôduyệt/tắtchat/quyềnbạc bằngGroupCheckbox: inputnativeẩn, phầnô/dấutíchluôngiữDOM/khônganimation, disabledkhiAPIpendingkhôngđổiappearance. Giữoptimisticcheck/rollbacklỗi; bổsungversionguardchoonSetApprovalchặnphảnhồipollcũ. Regression2/2PASS xácnhậncheckedtrue/visibleboxgiữnguyênquaAPIpending/rerenderpropscũ/hoàntất. Build/typecheckPASS,distxácnhận; chưa browserQA, khôngkhẳngđịnhQAvisual.

- 2026-10-26: Theo user, tênnhómdướiavatar căn giữa độc lập, bútabsolute bênphảitên+8px khôngchiếmwidth/tácđộngtâm; tênquádài truncatechừakhoảngbút. FormĐổitên dùngconfirmationDialogFrame/Title/Actions vàCancel/Accept chung2lựachọn Hủy/Đồngý, ônhập60px/min60/wfullthay44px. Giữavatar/APIpending/validate80. Build/typecheckPASS,distxácnhận; chưa browserQA.

- 2026-10-27: Theo user, thu chiều cao ba tab con lọc Bạn bè LAPTOP 66→56px theo scale; đồng bộ chiều cao wrapper để các tab lớn/điện thoại không đổi. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-27: Theo user, giao diện Tin nhắn LAPTOP đồng bộ khung ngoài/biển Tin nhắn/nút đóng bằng SocialDialogFrame; bỏ khung ảnh lồng ở hai pane, ô tìm kiếm dùng messagesFriendsField/Input như mobile, danh sách hội thoại có nền giấy và dòng socialPlayerRowClass/getSocialRowStyle như Xếp hạng (gap8×scale). Chat, dữ liệu và thao tác giữ nguyên; mobile giữ geometry/style hiện tại. npm.cmd run build PASS, dist cập nhật; chưa browser QA.
- 2026-10-27: Đính chính theo user: khung Tin nhắn LAPTOP phải đúng khổ SocialDialogFrame dùng bởi Xếp hạng (layout.width/height×layout.scale), không phóng rộng1.2×. Co hai pane và toàn bộ UI theo contentScale để nằm trong vùng lòng khung sau title/padding; center theo chiều ngang. Điện thoại giữ nguyên. Build/typecheck bắt buộc trước bàn giao.
- 2026-10-27: Theo user riêng Shop LAPTOP, ba tab lọc Tất cả/Avatar/Khung Viền dùng cùng nền nâu/viền vàng nâu/glow selected/hover/click như mobile; bỏ artwork SVG desktop riêng. MarketHeading region giảm31→24dvh; compact giữ18dvh và style tab cũ. Không đổi sản phẩm/giao dịch.
- 2026-10-27: Theo user, chữ ba tab lọc Shop LAPTOP tăng14→18px; điện thoại giữ14px.
- 2026-10-27: Đính chính theo ảnh: phần cần rút ngắn là biển artwork “Cửa Hàng” trên header Shop LAPTOP, không phải vùng MarketHeading. Khôi phục MarketHeading31dvh; biển laptop rộng220→180px theo token, mobile110px giữ nguyên.
- 2026-10-27: Theo user, ảnh avatar trong Shop phiên chợ tuần dùng `image-rendering:-webkit-optimize-contrast` trên ảnh con để nét hơn khi thu nhỏ; chỉ áp dụng market tuần, asset PNG gốc giữ nguyên.
- 2026-10-27: Theo user, bảng Thông tin LAPTOP hiện nút X góc trên phải bằng DialogCloseButton chung với Xếp hạng/Lịch sử; truyền compact theo layout thay vì chỉ hiện mobile. Giữ callback đóng/quay lại Tùy chỉnh avatar và mobile. npm.cmd run build (typecheck+Vite) PASS; dist cập nhật và xác nhận marker nút; chưa browser QA.

- 2026-10-27: Theo user Chọn Bàn LAPTOP bỏ Cúp/Bạn bè trên header; phóng form tìm36→44px, rộng tối đa480px có giới hạn chừa310px hai bên; nút Tìm62→80px, chữ16/icon20. Mobile và logic tìm/vào phòng giữ nguyên.
- 2026-10-28: Khôi phục thanh tab Tất cả/Lời mời trên mobile Tin nhắn. Điều kiện render nội dung giờ theo tab ở cả compact/desktop; Lời mời dùng layout compact khi cần, thao tác tab đóng hội thoại đang mở để quay lại danh sách.
- 2026-10-28: Theo user đồng bộ Tin nhắn > Lời mời LAPTOP với mẫu mobile: dòng danh mục và từng lời mời dùng chung thẻ parchment/social row (desktop theo row90×scale, gap4×scale); avatar nhóm theo token52×scale; nút phản hồi cao48×scale. Mobile giữ nguyên slot7/gap6/avatar72cqh/nút42px; API, badge, phản hồi/chờ duyệt và empty/error state giữ nguyên. Chưa browser QA.
- 2026-10-28: Đính chính theo user Tin nhắn > Lời mời LAPTOP: danh sách thêm cùng padding phải `pr-1` như tab Tất cả để hàng có cùng chiều rộng; chữ danh mục, tên nhóm và trạng thái rỗng/lỗi dùng nâu #251506 như điện thoại. Mobile không đổi.
- 2026-10-28: Theo user, thêm clip `ui-action-confirmation.mp4` làm tiếng hiệu ứng giao diện cho nút Hủy/Sử dụng và các nút Hủy/Đồng ý trong hộp thoại hai lựa chọn dùng confirmation styles chung. Phát qua click listener App, tuân theo trạng thái muted toàn game; click nhanh phát lại từ đầu. Không thay nhạc nền/âm thanh nước cờ. npm.cmd run build PASS (typecheck+Vite), dist có ui-action-confirmation-Cc_8OrBO.mp4; chưa browser/audio QA trực quan.
- Build sau chỉnh: `MessagesInboxInvitations.tsx` syntax transpile PASS bằng esbuild; `npm.cmd run build` dừng ở typecheck do lỗi JSX tại `DesktopFriendsDialog.tsx` dòng231/264 (ngoài file/phạm vi task). `dist` chưa cập nhật; chưa browser QA.
- 2026-10-28: Bấm danh hiệu trong bảng Nhận được mở preview và bảng thông tin danh hiệu đồng thời, cạnh nhau trên laptop/xếp dọc compact. Tái dùng catalog và HonorDetailPopover, không tự xác nhận thưởng. Build/typecheck PASS; chưa browser QA.
- 2026-10-28: Theo user thu artwork danh hiệu trong preview nhận thưởng xuống58% vùng xem, tương ứng vùng danh hiệu trong bảng thông tin bên cạnh. Build/typecheck PASS; chưa browser QA.
- 2026-10-28: Đính chính yêu cầu trước: giữ artwork preview cỡ ban đầu; bảng nhận danh hiệu rộng480px căn giữa viewport, bảng thông tin đặt bên phải cách16px, rộng tối đa54dvh như popover hồ sơ và giới hạn theo khoảng trống màn hình. Compact xếp dọc. Thay quy tắc thu artwork58%. Chưa browser QA.
- 2026-10-28: Laptop Tin nhắn: sidebar dùng cùng mốc mép trên với khung chat, nâng cả tìm kiếm/cài đặt; tăng chiều cao sidebar bù phần nâng nên khung danh sách cao hơn, giữ vị trí hai tab dưới. Mobile giữ nguyên. Chưa browser QA.
- 2026-10-28: Theo user cải thiện độ nét avatar Tin nhắn: dùng image-rendering -webkit-optimize-contrast cục bộ ở MessageAccountAvatar (ảnh và sprite background) và MessagesGroupAvatar để giảm mềm nét khi thu nhỏ; giữ nguyên nguồn/kích thước/vị trí/khung. Chưa browser QA độ nét.
- 2026-10-28: User xác nhận chỉnh thanh nhập tin nhắn dưới cùng: mobile thanh66→54px/ô44→36px, nút ảnh cùng kích thước36px bằng ô nhập. Laptop dùng cùng field inset như mobile, thanh64logical/ô và nút ảnh44logical; giữ chức năng gửi/emoji/ảnh. Chưa browser QA.
- 2026-10-28: Theo ảnh user, trong thông báo xác nhận xóa bạn, tên người chơi trên LAPTOP dùng font-body và NumberText weight normal, soften=false, khớp nhánh MOBILE; chỉ đổi tên được chèn vào câu, khung/câu/nút và thông báo khác giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-28: User báo tên trong hộp xác nhận xóa bạn bị lệch cỡ; bỏ span font-body bọc riêng, dùng đúng NumberText text={name} compact weight=normal soften=false như hộp Chặn trong MessagesOptionsPanel. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-28: Theo user, đồng bộ mọi hộp xác nhận laptop dùng MessagesFriendRemovalConfirmation: tên trong xóa bạn, chặn/bỏ chặn, đổi vai trò, xóa thành viên, rời nhóm, giải tán nhóm và xóa ván đã lưu dùng chung ConfirmationName/NumberText compact normal soften=false như xác nhận Chặn. Message nhận ReactNode để render tên cùng kiểu; bố cục/cỡ tiêu đề/nút giữ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-28: Theo user, hộp xác nhận xóa toàn bộ tin nhắn (mobile/laptop) bỏ dòng hỏi “Xóa toàn bộ tin nhắn?”; đưa câu “Tin nhắn người bên kia vẫn được giữ, chỉ xóa ở phía bạn.” lên làm nội dung chính dưới tiêu đề. Hành vi nút Hủy/Đồng ý giữ. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-28: Theo ảnh user chỉnh form Biệt danh trên laptop: ô nhập cao70%→80% hàng và nút Hủy/OK cũng cao80% để khớp ô. Nhánh uiScale/mobile giữ nguyên kích thước44/40px. Chưa browser QA.
- 2026-10-28: Theo user, bấm Báo cáo trong Tùy chọn Tin nhắn hiển thị toast giữa màn hình “Tính năng đang phát triển” bằng useInviteSentNotice; cùng component áp dụng laptop/điện thoại, không gửi API báo cáo. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-28: Theo đính chính user, hộp xóa tin nhắn trên cả laptop/điện thoại giữ lại câu “Xóa toàn bộ tin nhắn?” có dấu hỏi trước câu giải thích; các nút/hành vi giữ nguyên. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-28: Đính chính theo ảnh user: hộp xác nhận xóa tin nhắn trên cả laptop/điện thoại bỏ hoàn toàn dòng “Xóa toàn bộ tin nhắn?”; câu “Tin nhắn người bên kia vẫn được giữ, chỉ xóa ở phía bạn.” là nội dung duy nhất dưới tiêu đề. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-28: User tăng riêng nút Hủy/OK của form Biệt danh laptop: min-width54px, padding ngang12px, chữ18 logical. Mobile form giữ nguyên44px/16px. npm.cmd run build PASS; dist cập nhật; chưa browser QA.
- 2026-10-28: Theo ảnh user, câu nội dung hộp xóa tin nhắn trên cả nền kết thúc bằng dấu hỏi; bảng Tùy chọn thêm DialogCloseButton X ở góc trên phải, dùng onBack để đóng/quay hội thoại như nút Back trái. Shared MessagesOptionsPanel áp dụng mobile/laptop. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-28: Nút Báo cáo trong Tùy chọn hội thoại mở thông báo dạng hộp thoại một lựa chọn “Đóng” với nội dung “Tính năng đang phát triển”, dùng chung desktop/mobile; thay toast tự tắt. Chưa browser QA.
- 2026-10-28: Theo user, các nút Back tròn kiểu mũi tên trong khung laptop dùng chung `MessagesBackButton`; Tạo nhóm laptop bỏ ảnh back riêng và dùng component chung tại cùng vị trí/kích cỡ tương đương. Back trên thanh tiện ích (Home/game/shop) và nút đóng không thuộc kiểu này; mobile giữ nguyên. Build PASS, dist cập nhật; chưa browser QA.
- 2026-10-28: Đính chính phạm vi nút X của bảng Tùy chọn hội thoại: gỡ X riêng vừa thêm trên mobile, laptop vẫn giữ X; mobile dùng nút quay lại hiện có. Thay ghi chú 2026-10-28 về X dùng chung.
- 2026-10-28: Theo user, ẩn nút Tạo bàn cờ từ ảnh trong Vị trí tùy chỉnh trên laptop; điện thoại vốn đã ẩn, giữ nguyên. Các nút âm thanh/toàn màn hình và chức năng khác không đổi.
- 2026-10-28: Theo ảnh user, Back tròn laptop dùng chuẩn38px ở Tạo nhóm/Cài đặt/Xem thành viên/Lời mời/Hồ sơ; compact28px. X laptop dùng chung DialogCloseButton, chuẩn kích thước56/42px cố định giữa dialog; compact giữ90/68×scale. Khi Tùy chọn Tin nhắn desktop mở, khung cha z10; scrim z35 phủ SocialDialogFrame/X cha. OptionsPanel portal trực tiếp vào dialog z40 nên khung/X đang mở luôn rõ và thao tác được. Scrim chặn click lên khung cha; click ngoài không đóng bảng. Typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-28: Theo user, mọi chế độ dùng Board đều phát cue âm thanh tương ứng: Chơi với máy phát intro khi bắt đầu; replay và bàn thử phát tiếng đi/ăn/chiếu/chiếu bí khi phát hoặc tua. Bỏ cờ chỉ phát tiếng đi quân; không phát cảnh báo clock ở chế độ không có clock. Giữ nguyên công tắc Tắt tiếng chung. Regression âm thanh/computer/replay 15/15 PASS; typecheck/build PASS, dist cập nhật; chưa browser/audio QA.
- 2026-10-28: Đính chính quy tắc âm thanh theo user: mọi chế độ dùng Board phát âm thanh theo sự kiện. Chơi với máy phát intro khi bắt đầu; replay/bàn thử phát cue nước đi, ăn quân, chiếu và chiếu bí khi duyệt nước. Mở ván lưu sẵn ở nước cuối không tự phát lại chiếu bí; không phát cảnh báo clock nếu không có clock. Tôn trọng Tắt tiếng. Regression âm thanh/computer/replay 15/15 PASS; typecheck/build PASS, dist cập nhật; chưa browser/audio QA.
- 2026-10-28: Theo ảnh user, Vị trí tùy chỉnh LAPTOP thay nút Đấu ngay asset rồng bằng ComputerActionButton màu đỏ giống nút ở thiết lập máy; giữ vị trí dưới khay, callback/disabled/busy. Mobile giữ markup đang dùng. Typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-28: Theo user, nút Đấu ngay LAPTOP ở Vị trí tùy chỉnh rộng80% so với khay và căn giữa; chữ riêng nút tăng lên8cqw. Điện thoại giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-28: Theo user, tăng chiều cao nút Đấu ngay LAPTOP ở Vị trí tùy chỉnh khoảng22% (aspect-ratio 440/82→440/100), giữ rộng80%/chữ8cqw; mobile không đổi. Typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-28: User tăng chữ/icon nút Đấu ngay laptop ở Vị trí tùy chỉnh: chữ9cqw, icon14cqw; padding/gap7/3cqw để vừa trong nút. Kích thước nút và mobile giữ nguyên. Typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-28: Theo user, nút quay lại tròn laptop dùng chung MessagesBackButton giảm38→34px, icon giữ cùng tỷ lệ; điện thoại28px giữ nguyên. Component dùng xuyên các khung trên project nên đồng bộ mọi vị trí.
- 2026-10-28: Đính chính user: yêu cầu thu nhỏ là dấu × DialogCloseButton laptop, không phải mũi tên MessagesBackButton. Khôi phục MessagesBackButton laptop38px; DialogCloseButton dùng chung laptop giảm56/42→52/38px, compact90/68×scale giữ nguyên. Áp dụng tất cả dialog dùng chung.
- 2026-10-28: Theo ảnh user, laptop mở Thông tin danh hiệu cạnh bên phải khung hồ sơ, cách15px. Tọa độ popover chuyển từ viewport sang tọa độ cục bộ hộp thoại; chiều rộng giới hạn phần viewport còn trống để không bị cắt. Mobile giữ kiểu xếp dọc/neo giữa. Typecheck/build PASS, dist cập nhật; chưa browser QA.
- 2026-10-28: Theo user, dấu X bảng Thông tin danh hiệu trong preview nhận thưởng chỉ ẩn panel chi tiết; preview Danh hiệu nhận được vẫn mở ở laptop/điện thoại. Nút Đóng preview vẫn đóng toàn bộ. Build/typecheck PASS; chưa browser QA.
- 2026-10-28: User đính chính vị trí Thông tin danh hiệu LAPTOP: neo theo chính badge danh hiệu vừa bấm với gap15px, giống catalog Danh hiệu; nếu mép phải thiếu chỗ thì hiện phía trái theo cột. Chuyển tọa độ viewport sang hệ của hộp thoại hồ sơ và giới hạn rộng theo khoảng trống phía tương ứng. Mobile giữ xếp dọc. Typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-28: Theo ảnh user, thẻ thông tin hồ sơ laptop tăng padding ngang thêm5px (6→11px). Dòng địa chỉ vẫn hiển thị theo dữ liệu hồ sơ; nếu chưa có địa chỉ hiện “Chưa chọn địa chỉ”. Không thay đổi dữ liệu address. Build PASS; chưa browser QA.
- 2026-10-28: Đính chính hành vi dấu X trong bảng nhận danh hiệu: X của panel Thông tin danh hiệu chặn sự kiện nổi bọt và chỉ ẩn panel; khung Nhận được giữ mở trên laptop/mobile. Nút Đóng trong preview vẫn đóng toàn bộ. Build/typecheck PASS; chưa browser QA.
- 2026-10-28: Theo user, X góc trên phải của bảng Tùy chọn Tin nhắn laptop luôn nằm trên nội dung/lớp con (z100). Nút đóng dùng chung nhận zIndex tùy chọn, mặc định giữ30 cho các vị trí khác; X của khung cha vẫn bị scrim làm mờ/khóa. Build PASS, dist cập nhật; chưa browser QA.
- 2026-10-28: Sửa lần nữa luồng X chi tiết danh hiệu: trạng thái ẩn panel được nâng lên HomeRewardNotifications, độc lập với state chọn/đóng RewardPreview; X chỉ tắt thông tin, khung nhận thưởng vẫn mở. Chưa browser QA, cần xác nhận trên dev server sau HMR.

- 2026-10-28: Theo user, bộ chọn địa chỉ LAPTOP đồng bộ bố cục/tương tác với mobile: nút quay lại dạng icon 56px, danh sách quốc gia dọc ưu tiên Việt Nam rồi Trung Quốc, ẩn dòng lưu ý; cần click lần hai cùng quốc gia/tỉnh để chuyển bước/lưu. Giữ API, xác thực, quy tắc lưu một lần. Build PASS; chưa browser QA.
- 2026-10-28: Đính chính sau lỗi còn thoát Home: preview item không còn mở native dialog lồng bên trong dialog nhận thưởng. Dùng lớp phủ div trong dialog cha; X chi tiết chỉ ẩn panel qua state cha, Escape khi preview đang mở đóng preview trước và không xác nhận/đóng thưởng. Chưa browser QA.
- 2026-10-28: Theo ảnh user, tăng nhãn “34 tỉnh/thành” trong bước chọn tỉnh từ16px lên18px; nút Hủy và Tiếp/Lưu địa chỉ trong VietnamAddressPicker có cursor-pointer. Thông báo nhắc thiết lập địa chỉ ở Chọn Bàn giữ nguyên. Build PASS; chưa browser QA.
- 2026-10-28: Theo user, thông báo một lựa chọn trong Tùy chọn Tin nhắn laptop đổi nút “Đóng” thành “Đã hiểu” và dùng kiểu nút vàng giống thông báo Đấu với máy/Home; mobile giữ cách trình bày hiện có. Build PASS, dist cập nhật; chưa browser QA.
- 2026-10-28: Đính chính luồng Danh hiệu trong ProfileDialog: X của HonorDetailPopover quay lại danh sách catalog bằng onBack/setSelectedHonor(null), giữ nguyên bảng Thông tin người chơi; không gọi onDismiss/đóng ProfileDialog. Thay quy tắc 2026-10-27 về X chi tiết đóng toàn bộ. Build/typecheck PASS; chưa browser QA.
- 2026-10-28: Theo user, hồ sơ người chơi khác có nút “Quay lại” ở footer bên trái, đối diện “Thoát”, trên desktop và mobile; đóng hồ sơ về màn trước. Không thay footer tài khoản của chính mình hoặc các màn chỉnh sửa hồ sơ.

- 2026-10-28: Theo user, bút đổi tên trong hồ sơ chính hiện cho mọi tài khoản chưa đổi tên, kể cả Guest chưa liên kết. Bấm bút ở Guest mở hộp thoại hai lựa chọn: cần liên kết tài khoản để đổi tên; Hủy hoặc Liên kết (mở GoogleLinkDialog). Tài khoản linked tiếp tục form đổi tên hiện hành; backend vẫn enforce quyền đổi một lần.
- 2026-10-28: Đính chính nút hồ sơ “Quay lại”: chỉ hiện ở footer khi mở Xem thông tin từ bảng thao tác của hồ sơ người khác; bấm sẽ về bảng thao tác trước đó. Ẩn trên bảng thao tác như ảnh, không hiện hồ sơ của mình. Cả desktop/mobile dùng cùng điều kiện.

- 2026-10-28: Đính chính vị trí nút Back catalog Danh hiệu: dịch sang trái thêm10 logical px so với vị trí gốc trên laptop. Compact/điện thoại và các Back khác giữ nguyên.
- 2026-10-28: Theo user, nút Quay lại ở hồ sơ người chơi trên điện thoại dùng cùng kích thước compact với nút Thoát (min-width/padding/font); laptop không đổi.

- 2026-10-28: Đính chính phạm vi bút hồ sơ: bút đổi tên và bút chọn địa chỉ chỉ hiển thị trong hồ sơ chính mở từ HomePage. Các hồ sơ từ Chọn Bàn, trận đấu, Lịch sử, Tin nhắn và nơi khác không hiện nút sửa; quốc kỳ đã chọn vẫn hiển thị. Quyền/luồng backend giữ nguyên.
- 2026-10-28: Theo user, nhãn cột “Thao tác” trong Xếp hạng compact/mobile dịch sang phải5px; laptop giữ nguyên.
- 2026-10-28: Đính chính bôi chọn: nội dung dòng Lịch sử > Đã lưu đặt select-none để chạm/nhấn giữ không highlight xanh; ô nhập tên/ghi chú vẫn select-text. Tooltip thời gian giữ laptop +20px và điện thoại +40px so với điểm bấm.
- 2026-10-28: Đính chính sau kiểm tra user: Lịch sử > Đã lưu laptop đặt bàn cờ absolute tại góc trên trái với kích thước cố định theo rowBoardWidth; giữ min-height thẻ theo kích thước bàn ban đầu. Ghi chú mở rộng làm thẻ cao hơn nhưng không dịch bàn cờ. Điện thoại giữ nguyên.
- 2026-10-28: Theo yêu cầu demo không lưu dữ liệu thật, hồ sơ laptop public ID64830084 hiển thị thêm9 danh hiệu mẫu trong lưới preview 3×3. Chỉ lớp hiển thị; không ghi DB/localStorage, không đổi số sở hữu thật (vẫn từ API), mobile/catalog/trang bị không áp dụng. Nhãn “mẫu” phân biệt dữ liệu demo.

- 2026-10-28: Đính chính màu khung tên Lịch sử > Đã lưu: khung vàng theo chủ sở hữu ván (bản thân), khung xanh cho đối thủ; hoàn toàn không phụ thuộc kết quả thắng/thua. Laptop/điện thoại cùng cách thể hiện; History Đã chơi giữ nguyên.
- 2026-10-28: Theo user, riêng hồ sơ LAPTOP hạ chiều cao vùng card thông tin trên từ min190→166logical; PlayerInfoCard desktop nén gap-y/vertical padding một mức để vẫn chứa đủ name/Elo/stats/address/ID. Khung Danh hiệu flex bên dưới tự nhận phần chiều cao được giải phóng. Avatar/stat card, điện thoại, dữ liệu và thứ tự không đổi.

- 2026-10-28: Đính chính theo ảnh: nút chuyển Xem lại/Đánh thử laptop đặt giữa ReplayControls (left50%, translateX−50%), dưới cột điều khiển tại top220px; cột giữ cao220px để neo ổn định khi đổi trạng thái. Compact tự cao và giữ luồng cũ.
- 2026-10-28: Theo user, thêm danh hiệu mẫu thứ9 (10 mục hiển thị tính cả 1 danh hiệu thật) vào demo laptop ID64830084 để thử hiệu ứng carousel chuyển trang. Không thêm/sửa dữ liệu sở hữu.
- 2026-10-28: Bạn bè > Bạn Facebook: khi danh sách lọc trống, hiện “Đang phát triển” căn giữa nền danh sách trên laptop và điện thoại. Danh sách Facebook có dữ liệu vẫn render như cũ.
- 2026-10-28: Theo user, nâng riêng lưới huy hiệu trong preview Danh hiệu hồ sơ laptop lên6px bằng translateY; heading, khung, lưới/layout flow và điện thoại giữ nguyên.
- 2026-10-28: Đính chính theo ảnh user: bỏ dịch lưới huy hiệu laptop lên6px để không cắt nội dung theo chiều dọc. Riêng preview demo laptop ID64830084 rút ngắn đoạn trượt carousel từ6s xuống700ms để 9 mẫu + danh hiệu thật nhanh chóng trở lại trạng thái trang 3×3 hiển thị trọn; hồ sơ/mobile khác giữ animation6s và dữ liệu/ownership không đổi.
- 2026-10-28: Theo user, hoàn tác thời lượng trượt riêng700ms của demo laptop; carousel laptop dùng cùng animation6s như mobile, giữ thời gian chờ chung, vị trí/lưới3×3 và dữ liệu demo không đổi.

- 2026-10-28: Theo yêu cầu mở khóa riêng trong task này, dòng Bạn bè LAPTOP bo góc 10px theo scale và viền đầy đủ như dòng Xếp hạng; giữ chiều cao, gap, nội dung và toàn bộ mobile. Phạm vi khóa Bạn bè laptop trở lại sau lượt chỉnh này. npm.cmd run build PASS, dist cập nhật; chưa browser QA.

- 2026-10-28: Theo yêu cầu tiếp nối cho tab Lời mời Bạn bè LAPTOP, khoảng cách giữa hai nhóm Lời mời đã nhận/đã gửi dùng cùng --social-row-gap (8px theo scale) như các dòng trong tab khác; danh sách con giữ gap chung, mobile không đổi. Mở khóa riêng phạm vi tab này trong task; khóa laptop trở lại sau task. Build cần xác nhận.
- Build verification for 2026-10-28 invitation spacing adjustment: npm.cmd run build PASS (typecheck and Vite build); dist updated. Browser visual QA not performed.

- 2026-10-28: Theo ảnh user, tab Lời mời Bạn bè LAPTOP: tiêu đề Lời mời đã nhận dùng vùng cố định cao56px và cùng khung đỏ/vị trí như Gợi ý cho bạn; phần danh sách và nút giữ nguyên, mobile không đổi. Mở khóa riêng tiêu đề trong task này; khóa laptop trở lại sau task. Build cần xác nhận.

- Build verification for laptop received-invites header: npm.cmd run build PASS (typecheck and Vite); dist updated. No browser visual QA.

- 2026-10-28: Theo ảnh user, riêng nút Tìm của tab Danh sách Bạn bè LAPTOP thu rộng170→152 logical px theo scale để mép phải thẳng với dòng kết quả bên dưới. Ô nhập, nút Tìm tab Thêm bạn và mobile giữ nguyên. Mở khóa riêng phạm vi nút này trong task; khóa laptop trở lại sau task. Build cần xác nhận.
- Build verification for laptop friend-list search button width: npm.cmd run build PASS (typecheck and Vite); dist updated. Browser visual QA not performed.

- 2026-10-28: Theo user, Bạn bè LAPTOP lấy chiều ngang ô tìm+nút Tìm trong tab Danh sách làm chuẩn: nút Tìm cố định152px theo scale ở cả Danh sách và Thêm bạn; các dòng kết quả trong cả hai danh sách chiếm đủ bề ngang tương ứng. Mobile giữ nguyên. Mở khóa riêng độ rộng hàng và control tìm trong task này; khóa laptop trở lại sau task. Build cần xác nhận.
- Kiểm chứng thay đổi chiều ngang dòng/nút Tìm Bạn bè LAPTOP (2026-10-28): npm.cmd run build PASS (typecheck và Vite), dist cập nhật; chưa browser QA.

- 2026-10-28: Đính chính theo ảnh user: các dòng gợi ý trong tab Thêm bạn laptop phải kéo đến mép phải của nút Tìm (không theo toàn bộ chiều ngang ô nhập+nút). Mở rộng riêng vùng danh sách để bù padding phải và scrollbar gutter, canh mép dòng bằng mép nút Tìm; mobile và các tab khác giữ nguyên. Mở khóa riêng chiều rộng danh sách Thêm bạn trong task này; khóa laptop trở lại sau task. Build cần xác nhận.
- Kiểm chứng đính chính chiều ngang dòng gợi ý Bạn bè LAPTOP (2026-10-28): npm.cmd run build PASS (typecheck/Vite), dist cập nhật; chưa browser QA.

- 2026-10-28: Theo ảnh user, tab Lời mời Bạn bè trên laptop và điện thoại thêm khoảng14px theo scale giữa mỗi khung tiêu đề đỏ (Lời mời đã nhận/Đã gửi lời mời) với danh sách ngay dưới, đồng bộ nhịp giữa tiêu đề và trường/danh sách ở hai tab kia. Không đổi phân bổ chiều cao giữa hai nhóm hay nội dung. Mở khóa riêng spacing tab Lời mời trong task này; khóa lại sau task. Build cần xác nhận.
- Kiểm chứng khoảng cách tiêu đề đỏ–danh sách trong tab Lời mời (laptop/điện thoại): npm.cmd run build PASS (typecheck và Vite), dist cập nhật; chưa browser QA.


- 2026-10-28: Đính chính theo user: yêu cầu trước là gap GIỮA CÁC DÒNG trong hai danh sách Lời mời đã nhận/Đã gửi, không phải gap khung đỏ–danh sách. Gỡ gap14px giữa tiêu đề và list ở mobile/laptop; đặt rowGap rõ ràng theo --social-row-gap = 8px×scale ở cả hai viewport, đồng bộ các tab danh sách khác. Build cần xác nhận.
- Kiểm chứng đính chính gap dòng tab Lời mời (mobile/laptop): npm.cmd run build PASS (typecheck/Vite), dist cập nhật; chưa browser QA.


- 2026-10-28: Theo user, lấy chiều dài dòng tab Thêm bạn làm chuẩn cho dòng ở Danh sách và hai nhóm Lời mời. Laptop dùng chung friendRowsWidthStyle cho cả bốn list (bù padding phải + scrollbar gutter để mép dòng trùng); điện thoại vốn dùng chung friendListClass/row sizing nên giữ nguyên. Đây là chỉnh tiếp dựa trên phạm vi mở khóa các lượt Bạn bè gần nhất. Build cần xác nhận.
- Build verification for shared friend row width (Danh sách/Lời mời from Thêm bạn): npm.cmd run build PASS (typecheck/Vite), dist updated; chưa browser QA.
- 2026-10-28: Theo user, khoảng cách dòng-trên-dòng chuẩn (rowGap --social-row-gap = 8px×scale) được áp dụng giữa khung tiêu đề đỏ và dòng đầu tiên ở cả hai nhóm Lời mời đã nhận/Đã gửi, laptop và điện thoại. Khoảng này đồng nhất với gap giữa các dòng bên dưới; không đổi chiều cao/dữ liệu. Build cần xác nhận.
- Kiểm chứng spacing giữa tiêu đề đỏ và dòng đầu tab Lời mời ở mobile/laptop: npm.cmd run build PASS (typecheck/Vite), dist cập nhật; chưa browser QA.
- 2026-10-28: Laptop game UI scales as one centered 1493×731 CSS canvas, calibrated to the 1536×864 display screenshot (visible game area about1253×698 inside browser viewport). Uniform scale is min(screen ratio to1536×864, available viewport fit); all canvas descendants/dialogs scale together, leftover horizontal space stays balanced, and mobile ≤800px remains unchanged. Do not redesign individual dialogs to achieve this behavior.
- 2026-10-28: Laptop canvas implementation detail: use a fixed viewport-sized centering wrapper, then a separate 1493×731 transformed content canvas. Keep the outer wrapper unscaled so full-screen fixed overlays cannot be clipped by the scaled content bounds; scale the complete app tree inside. Uniform scale uses screen ratio to1536×864 and available viewport fit; mobile ≤800px unchanged.
- 2026-10-28: User chốt laptop luôn đầy chiều cao vùng trình duyệt; scale toàn canvas = viewportHeight/731, chiều ngang và nội dung tăng giảm cùng tỷ lệ, căn giữa ngang. Quy tắc này thay giới hạn scale theo screen.width/screen.height hoặc fit ngang trước đó. Home desktop bỏ lề dọc12px để khung đầy chiều cao.
- 2026-10-28: Home laptop cụm tiện ích vàng dịch phải3px (left10→13), khoảng hở hai khung tài nguyên giảm4px theo scale bằng nới mỗi frame2px về phía giữa; nội dung/resource token dùng chung Shop giữ nguyên.
- 2026-10-28: Theo user thu nhẹ cụm hai khung năng lượng/vàng Home laptop còn97%, giữ tâm cụm và tỷ lệ nội dung; mobile giữ nguyên.

- 2026-10-28: Sửa X Thông tin danh hiệu mở từ badge trong hồ sơ: callback chỉ setPreviewHonorDetailOpen(false), không gọi onClose của ProfileDialog. Áp dụng laptop/mobile; giữ bảng Thông tin người chơi. Build cần xác nhận.- 2026-10-28: User yêu cầu mọi nút dấu X dùng cùng âm thanh ui-action-confirmation của hộp thoại hai lựa chọn. App click capture nhận dấu ×/✕/✖ hoặc nút Đóng có ảnh/SVG, bao gồm DialogCloseButton và X ảnh Năng lượng. Không phát cho lớp backdrop vô hình hoặc nút disabled; tôn trọng muted chung.

- Kiểm chứng sửa X chi tiết danh hiệu hồ sơ: npm.cmd run build PASS (typecheck/Vite), dist cập nhật; chưa browser QA.- 2026-10-28: Theo user sửa răng cưa viền avatar Tin nhắn LAPTOP: MessageAccountAvatar và MessagesGroupAvatar dùng image-rendering:auto riêng desktop thay optimize-contrast. Giữ nguồn, kích thước, vị trí/clip viền và mobile; chưa browser QA.
- 2026-10-28: Các nút Back/Quay lại/Trở về/Về và Rời phòng dùng GameBackIcon phát chung ui-action-confirmation như X và nút thông báo, qua capture listener App; tôn trọng muted/disabled.
- 2026-10-28: X Thông tin danh hiệu là hitbox trống trên artwork (không chứa ký tự/img/svg); nhận diện riêng aria-label Đóng thông tin danh hiệu để phát ui-action-confirmation. Giữ callback đóng riêng bảng con và muted chung.
- 2026-10-28: Giảm trễ UI action sound bằng Web Audio latencyHint interactive, preload/decode một lần khi App mount; pointerdown/keydown mở AudioContext, click phát AudioBufferSourceNode mới và dừng tiếng cũ. Không đợi tải rồi phát click cũ; muted vẫn áp dụng.

- 2026-10-28: Sửa khung màn bàn cờ laptop bị cắt sau scale canvas: GamePage dùng h-full của canvas và main calc(100%-12px), thay dvh bị scale hai lần. Compact giữ h-dvh. Build cần xác nhận.
- Kiểm chứng khung GamePage laptop: npm.cmd run build PASS (typecheck/Vite), dist cập nhật; chưa browser QA.
- 2026-10-28: Sửa tiếp viền hai bên GamePage laptop: calc kích thước phải có khoảng trắng quanh phép trừ; dùng h calc(100% - 12px), w calc(100% - 240px), max-width theo viewport chia scale canvas trừ24px để viền luôn nằm trong vùng nhìn thấy. Compact giữ nguyên. Build cần xác nhận.
- Kiểm chứng sửa viền ngang GamePage: npm.cmd run build PASS (typecheck/Vite), dist cập nhật; chưa browser QA.- 2026-10-28: Giảm trễ click sau idle: UI AudioContext duy trì source buffer im lặng lặp khi tab visible và unmuted, khởi động từ tương tác; dừng khi hidden/muted hoặc App unmount. Giữ decode sẵn và resume tại pointerdown/keydown. Chưa đo latency thiết bị thực; không khẳng định triệt tiêu độ trễ phần cứng.
- 2026-10-28: User cung cấp hai MP3: victory-fanfare.mp3 (freesound_community-success-fanfare-trumpets-6185) chỉ phát khi người chơi thắng và resultDialog.outcome=win, sau callback hoàn tất hình và hai lớp audio chiếu bí hiện có. home-reward-received.mp3 (astralsynthesizer-11l-victory-1749704552668-358772) chỉ phát khi bảng HomeRewardNotifications mở; không dùng trong MatchResultDialog/preview vật phẩm trong trận. useCelebrationSound preload Web Audio, muted realtime, hủy pending/source khi đóng/reset/rời; không đổi nghiệp vụ thưởng.
- 2026-10-28: Theo user bỏ hiệu ứng âm thanh chuyển vào/bắt đầu bàn: useMoveSound.playMatchIntro không phát intro clips, chỉ dừng intro còn sót. Giữ hiệu ứng hình mở bàn, khai cuộc/clock1300ms và mọi cue đi quân/ăn quân/chiếu/chiếu bí, tiếng thắng/thưởng mới.
- 2026-10-28: Đính chính phạm vi audio: khôi phục intro audio khi bắt đầu bàn thường/Chơi với máy. Chỉ bỏ cue âm thanh phát do thao tác nút Đánh thử chuyển giữa snapshot replay và trial; các nước đi trong trial vẫn có đầy đủ cue. GamePage gửi token chuyển mode đến useMoveSound để bỏ đúng transition frame.
- 2026-10-28: Đính chính chuyển bàn thử→xem thường còn nghe tiếng: khi token đổi mode, ngoài chặn cue frame chuyển còn gọi GameSounds.stopAll để dừng âm thanh cũ đang chạy/cue chờ từ mode trước. Intro bàn thường giữ nguyên.
- 2026-10-28: User cung cấp defeat-fanfare.mp4 làm tiếng thua. Phát khi resultDialog.outcome=loss, đồng bộ thời điểm mở popup như âm victory khi outcome=win; mỗi kết quả phát đúng cue tương ứng, chờ gate hình/audio chiếu bí như hiện có. Home reward sound không đổi.
- 2026-10-28: Đính chính cách phát theo user: khi thắng phát tiếng victory; khi thua phát defeat-fanfare.mp4 đồng thời với tiếng victory đang có. Hai clip cùng bắt đầu theo resultDialog outcome sau gate chiếu bí; Home reward riêng.
- 2026-10-28: Âm thanh vào bàn dùng `src/assets/audio/board-entry.mp4`, preload qua Web Audio helper trong `src/lib/uiActionSound.ts`, tôn trọng Tắt tiếng và phát khi vào replay từ Xem lại/Đã lưu/Đã lưu thế, hoặc Đấu ngay từ Vị trí tùy chỉnh/Chơi với máy. Chỉ phát khi thao tác thực sự chuyển vào màn hình cờ; nút Lưu ván cờ riêng không phát cue này.
- 2026-10-28: User cung cấp hai MP4 mới: position-place.mp4 phát khi đặt/di chuyển quân hợp lệ trong Vị trí tùy chỉnh, cả click và kéo thả; customization-tab.mp4 phát khi bấm bốn tab Chọn avatar/Chọn viền/Skin/Hiệu ứng. Dùng Web Audio preload chung, tôn trọng Tắt tiếng; không phát khi chọn quân, đặt sai hoặc thả lại ô cũ. Không đổi geometry/avatar/UI.

- 2026-10-28: Theo user, nút thông báo một lựa chọn Đóng/Đã hiểu/Xác nhận/OK dùng chung ui-action-confirmation với dấu X. Nhận diện trong dialog/alertdialog, bỏ qua form nhập và nút disabled; tôn trọng muted và capture listener chung tránh phát hai lần.
- Kiểm chứng âm thanh nút thông báo một lựa chọn: build/typecheck PASS, dist xác nhận matcher mới; chưa browser/audio QA.
- 2026-10-28: Sửa tiếng đặt quân bị mất ở Vị trí tùy chỉnh: runtime dùng position-place.wav tách từ MP4 user bằng Windows MediaTranscoder, PCM48kHz/stereo16bit; bỏ113ms im lặng đầu, còn362ms. Preload lại khi mount editor và retry prepare khi đặt quân sau lỗi tải/giải mã. Giữ cùng âm nguồn và các nhánh click/kéo thả; MP4 gốc giữ tham chiếu. Build/typecheck PASS, placement3/3 PASS; chưa nghe thử browser (browser automation bị tắt).
- 2026-10-28: User đính chính âm thanh1 là tiếng BỎ quân KHỎI bàn ở Vị trí tùy chỉnh: position-remove.wav phát khi kéo ra ngoài/chuột phải xóa quân/nút Xóa quân (một cue cho thao tác xóa nhiều quân). ĐẶT/CHUYỂN quân hợp lệ dùng đúng asset đi quân (2).wav như bàn đấu, cả click và kéo thả. Quy tắc này thay toàn bộ mô tả trước về position-place.mp4/wav làm tiếng đặt quân. Bốn tab tùy chỉnh vẫn dùng customization-tab.mp4.

- 2026-10-28: Theo user, nút tab Danh hiệu (mọi nhóm) và công tắc Ẩn, 2 tab Xếp hạng, 2 tab Đã chơi/Đã lưu Lịch sử, cùng 3 tab Bạn bè phát customization-tab.mp4 qua UI action audio preload chung; áp dụng FriendsDialog mobile và DesktopFriendsDialog laptop. Tôn trọng Tắt tiếng; không đổi hành vi/bố cục.
- Kiểm chứng tab audio: npm.cmd run build PASS (typecheck/Vite), dist chứa marker data-ui-tab-sound; chưa browser/audio QA.
- 2026-10-28: Sửa phản hồi thiếu tiếng mở bàn Lịch sử/Đã lưu/Đấu máy: helper chung giữ mọi handler cũ, runtime dùng board-entry.wav PCM tách từ MP4 user và cắt268ms im lặng đầu (còn541ms). Gesture unlock gọi prepareBoardEntryActionSound để retry sau lần tải/giải mã lỗi; preload App vẫn giữ. Áp dụng cả Đấu ngay vị trí tùy chỉnh. Build/typecheck PASS; dist xác nhận WAV; chưa nghe trực tiếp browser.

- 2026-10-28: Theo user, mũi tên hoàn/lùi nước không phát tiếng ăn quân. useMoveSound nhận mọi lần giảm moveCount kể cả rời snapshot finished, dừng cue cũ và chỉ phát tiếng đi quân; không suy ra ăn quân từ ô đích của snapshot trước. Áp dụng chung laptop/mobile/replay/bàn thử.
- Kiểm chứng bỏ tiếng ăn quân khi lùi: npm.cmd run build PASS (TypeScript/Vite), dist cập nhật; chưa nghe thử trong trình duyệt.

- 2026-10-28: Theo user, dùng customization-tab.mp4 cho 3 filter tab Bạn bè (Tất cả/Đang online/Bạn Facebook) cả laptop/mobile; tab quản lý nhóm và duyệt checkbox/nút ✓, chấp nhận/từ chối lời mời trong Tin nhắn; 3 tab bên trái + 3 tab giữa Cửa hàng; và mọi nút/checkbox tương tác hiện dấu ✓ (avatar/khung, Tắt nhạc/Tắt tiếng, chấp nhận so tài, tỉnh/quốc gia/xã). Marker data-ui-selection-sound qua listener chung, tôn trọng muted, không phát cho dấu ✓ chỉ trang trí.
- Kiểm chứng âm thanh selection bổ sung: npm.cmd run build/typecheck PASS, dist index-ZlXjosJc.js cập nhật và có marker; chưa browser/audio QA.

- Xác nhận build cuối sau khi bổ sung âm thanh nút ✓ So tài: npm.cmd run build PASS, dist/assets/index-Dkd77jxl.js có data-ui-selection-sound; chưa browser/audio QA.

- 2026-10-28: Theo ảnh user, công tắc khóa/mật khẩu trong CreateRoomForm phát customization-tab.mp4 qua data-ui-selection-sound như các switch/tab khác; không đổi trạng thái, style hay hành vi khóa. npm.cmd run build/typecheck PASS, dist xác nhận marker; chưa browser/audio QA.

- 2026-10-28: Theo ảnh user, nút loa Bật/Tắt nhạc dùng HomeIcon sound/muted ở Chọn Bàn và Chơi với Máy phát customization-tab.mp4 qua data-ui-selection-sound, đồng nhất nút trong HomeSettings; giữ trạng thái nhạc/mute. Build/typecheck PASS, dist index-CQaFuEd5.js xác nhận marker; chưa browser/audio QA.

- 2026-10-28: Theo user, chọn Cấp 1–10 và phe Đỏ/Đen/Ngẫu nhiên trong Thiết lập máy phát customization-tab.mp4 qua marker UI selection chung, cả laptop/mobile; trạng thái muted được tôn trọng, không đổi hình thức hoặc lựa chọn. Build bị chặn ở typecheck bởi lỗi đang có trong server/app.ts (dòng51 res chưa khai báo) và lỗi TS2306 import roomController; chưa cập nhật dist hoặc browser/audio QA.

- 2026-10-28: Theo user, ở Vị trí tùy chỉnh nút Đổi bên Đỏ/Đen phát âm thanh X ui-action-confirmation; công tắc Đi tiên laptop/mobile phát customization-tab.mp4. Cả hai dùng helper chung, tôn trọng muted, không đổi hành vi chọn.
- Build bị chặn ban đầu do res.locals tham chiếu sai trong Socket.IO middleware; bỏ đúng dòng không hợp lệ (middleware HTTP riêng gán roomCreatorId), sau đó npm.cmd run build PASS, dist/assets/index-CyaaqtrX.js cập nhật. Chưa browser/audio QA.

- 2026-10-28: User báo không nghe âm thanh nút Đổi bên/Đi tiên. Nguyên nhân helper bỏ click khi buffer chưa tải/giải mã; uiActionSound nay chuẩn bị buffer theo yêu cầu và phát sau khi sẵn sàng, hủy request cũ khi có thao tác mới/tắt tiếng, giữ guard nguồn đang phát. Build PASS; dist/assets/index-CwOHFXPE.js cập nhật; chưa browser/audio QA.

- 2026-10-28: User changed global selection/tab audio: every UI location that previously played customization-tab.mp4 now plays ui-action-confirmation.mp4, including tab markers, direct AvatarCustomization tab calls and Đi tiên switch. Existing mute handling/readiness retained; position move/remove/board sounds unaffected. 
pm.cmd run build PASS, dist/assets/index-wzik3Hsg.js; no browser/audio QA.
- 2026-10-28: User yêu cầu căn giữa bảng hết năng lượng. EnergyNotice native dialog phủ viewport fixed/inset0/100vw×100dvh/zoom1, open:grid place-items-center; scale laptop chuyển vào section để giữ kích thước bảng nhưng không làm lệch hệ tọa độ overlay. Giữ countdown/nút/callback/backdrop. Build/typecheck PASS, dist xác nhận; chưa browser QA.

- 2026-10-28: User mở cả laptop/mobile cho quản trị Bàn khóa: password trống được phép, passwordRequired tách locked; chỉ hỏi khi thật có mật khẩu. Chủ gắn tài khoản tạo từ auth HTTP/socket (RAM), chuyển khi rời. Menu ba gạch thêm nút vàng Cài đặt bên phải: Chặn hàng giải phóng queue + toast Đã thoát hàng, vào hàng bị chặn báo Đã chặn vào hàng; chặn chat chung/riêng báo Đã chặn chat, chủ miễn. Checkbox áp dụng ngay; lệnh quản lý Hủy/Đồng ý. Chủ chuột phải avatar/dòng View (mobile ⋯): xuống xem/lên ghế trống/cấm-bỏ cấm chat/đuổi về Home; server xác thực mọi lệnh, kick rời socket room. Điều hành ghế đang đấu chốt kết quả theo leave rồi reset thế chờ. Bàn khóa bỏ rotation sau thua và mọi ép sẵn sàng/countdown, giữ ghế. Bàn thường giữ luật. Avatar bàn cả2bản đổi phong danh hiệu sang giữ550ms, hủy rê10px; click ngắn hồ sơ. Chi tiết docs/ROOM-LOCKS.md. Chưa browser QA.
- Kiểm chứng quản trị Bàn khóa: 25/25 unit/UI/readiness/locked-room và 2/2 HTTP-Socket integration PASS (loopback ngoài sandbox); npm.cmd run build PASS gồm TypeScript/Vite, dist xác nhận cài đặt/chặn hàng/chat/menu quản lý. Chưa browser/touch/2thiết bị QA; chưa SSH/deploy/restart production, backend cần nạp mã mới.

- 2026-10-28: Theo user, khôi phục customization-tab.mp4 có chọn lọc cho: mở/sửa Thông tin và Danh hiệu, chọn avatar/viền/skin/hiệu ứng, bút chỉnh trong Đã lưu, tab/tìm/thao tác Bạn bè, danh sách/emoji/đổi tên/ảnh nhóm/nút tích Tin nhắn, tab và nút Mua Cửa hàng, mọi role=switch và nút âm thanh, chọn thời gian bàn/nhanh, cấp và phe Chơi với máy. Marker data-ui-tab-sound, tôn trọng muted và phát sau preload; các vùng khác tiếp tục âm thanh X. Không đổi UI/nghiệp vụ. npm.cmd run build PASS; dist index-BWqCwhvL.js có cả hai asset; chưa browser/audio QA.
- 2026-10-28: User chốt người chơi vào/ra phòng không được nháy giao diện. App giữ GamePage theo room ID thay vì cặp ghế; presentationKey theo room+cặp socket ID đã sort chỉ reset presentation. useGame dọn chọn quân/pending/repetition, online animation và audio có token phiên; GamePage dọn trạng thái kết quả/từ chối/preview mà không remount DOM. useMatchResult reset phiên tại key đổi và nhận initialResultSide cho thắng do đối thủ rời đúng một lần. Giữ opening lúc tự vào phòng mới, không phát lại khi người khác vào/ra/đổi ghế; viewer vào/ra không reset phiên ghế. Không đổi backend/thưởng. Regression4suite27/27 PASS (TEMP trong workspace +1worker tránh ENOENT sandbox); typecheck/build PASS, dist xác nhận; chưa browser/hai thiết bị QA.

- 2026-10-28: Đính chính theo user: các tab chính Bạn bè (Danh sách/Thêm bạn/Lời mời) và bộ lọc Tất cả/Đang online/Bạn Facebook tiếp tục dùng âm thanh nút X (data-ui-selection-sound) cả laptop/mobile. Nút Tìm và thao tác kết bạn/mời chơi/nhắn tin vẫn dùng customization-tab.mp4. npm.cmd run build PASS, dist index-_fB5uf6T.js; chưa browser/audio QA.

- 2026-10-28: User chốt chọn tỉnh/ghép bàn khi chưa lưu địa chỉ: ngẫu nhiên bàn Việt Nam đủ điều kiện trước, hết bàn Việt Nam phù hợp mới sang nước khác. Dùng chung randomAvailableRoom ở Home Cờ Tướng/Cờ Úp và Chơi nhanh Chọn Bàn, sau lọc variant/time/ghế/khóa. Tất cả trong Chọn Bàn hiển thị random tối đa30bàn Việt Nam có người, hết mới fallback quốc tế; bộ đếm tính toàn pool trước cap. roomRegions chuẩn hóa Thành phố/Tỉnh/TP., nhận34tỉnh hiện hành; phòng cũ không khu vực thuộc lobby Việt Nam mặc định. Danh sách tỉnh xếp số bàn giảm, rồi số người ngồi bàn giảm, rồi tên; viewer không tính người chơi. Không đổi địa chỉ hồ sơ/geometry.
- Kiểm chứng quy tắc vùng Chọn Bàn: 6/6 kiểm tra room-regions/quickRoom/locked-room-ui PASS; npm.cmd run build PASS (TypeScript/Vite), dist/assets/index-BqaWRpkO.js đã cập nhật. Chưa browser QA hoặc kiểm tra với phòng quốc tế thật.

- 2026-10-29: Theo user, Home avatar, avatar được chọn và nút mở avatar trong Hồ sơ dùng tiếng X (ui-action-confirmation). Bốn tab Chọn avatar/Chọn viền/Skin/Hiệu ứng cũng dùng tiếng X. Các dòng Tùy chọn Tin nhắn (gồm Biệt danh/Đổi tên nhóm, cài đặt, thành viên, báo cáo/xóa/rời nhóm) dùng tiếng X. Hai nút Tắt nhạc nền/Tắt tiếng giữ customization-tab.mp4. Chọn cấp/phe Chơi với máy và Đổi bên/Đi tiên Vị trí tùy chỉnh dùng tiếng X; marker X được ưu tiên cả trên role=switch để chỉ phát một cue. Không đổi UI/nghiệp vụ. npm.cmd run build PASS (typecheck/Vite), dist/assets/index-BLC7QUjs.js; chưa browser/audio QA.

- 2026-10-29: Theo user, khung Chọn tỉnh/thành LAPTOP dùng nền nâu #241007/viền #79501e/bo rounded-xl như mobile, bỏ artwork province-picker-frame có X tròn in sẵn. Dùng đúng nhánh nút X compact tại góc phải (52px desktop, giữ kích thước compact hiện hành), chỉ còn một X. Header cao64px, danh sách nằm dưới; desktop giữ2cột/4hàng, mobile6hàng và nội dung/logic cũ.
- Kiểm chứng khung chọn tỉnh laptop: npm.cmd run build PASS (TypeScript/Vite), dist cập nhật; đã đối chiếu bỏ tham chiếu artwork chứa X tròn. Chưa browser QA.

- 2026-10-29: Đính chính âm thanh theo ảnh user: ô vật phẩm trong danh sách Avatar/Viền/Skin/Hiệu ứng dùng tiếng tab (hai danh mục sau hiện chưa có vật phẩm); các tab danh mục vẫn tiếng X. Thoát/Quay lại cuối Hồ sơ, hai tab Lịch sử, thùng rác Lịch sử, tab/bộ lọc và Tìm Bạn bè, hai tab Tất cả/Lời mời Tin nhắn, toàn bộ tab Cửa hàng, ba nút tỉnh/Tạo bàn/Chơi nhanh và ba bộ lọc Chọn Bàn dùng tiếng X. Hai bút tên/ghi chú Đã lưu, dòng Lời mời Tin nhắn và nút Mua dùng tiếng tab. SearchButton chung mặc định tiếng X. Thông báo một lựa chọn trong Tùy chọn Tin nhắn laptop dùng chung khung520px/min-height180px, chữ24px, nút120×44/chữ22; giữ kiểu mobile. Chưa browser/audio QA.
- Kiểm chứng mapping âm thanh và thông báo 2026-10-29: npm.cmd run build PASS (TypeScript/Vite, exit0); dist/assets/index-CQzan5Qb.js chứa hai marker âm thanh và kích thước thông báo mới. Chưa browser/audio QA.

- 2026-10-29: Xem thử UI theo user: Tạo bàn cả laptop/mobile dùng khung nâu #241007/viền #79501e/bo rounded-xl như Chọn tỉnh mới. Bỏ artwork nền chứa X tròn; dùng DialogCloseButton nhánh compact (desktop52px/mobile theo scale), disabled khi đang gửi. Giữ tỷ lệ/kích thước bảng và form, công tắc, mật khẩu không bắt buộc, hai thời gian và nút tạo/hủy. Chưa chốt khóa UI.
- Kiểm chứng xem thử Tạo bàn: npm.cmd run build PASS (TypeScript/Vite), dist xác nhận khung mới; chưa browser QA.

- 2026-10-29: Xem thử theo user: hai bảng Chọn tỉnh/Tạo bàn cả laptop/mobile dùng chính brown-card-upload.png của hai nút header làm khung. RoomDialogFrame chung border-image slice160 fill, viền28px desktop/20px compact để kéo cạnh/nền, giữ4góc họa tiết. Thay khung CSS nâu phẳng của lượt trước, giữ X mới và nội dung/logic/kích thước hai bảng; chưa chốt khóa UI.
- Kiểm chứng khung ảnh dùng chung Chọn tỉnh/Tạo bàn: npm.cmd run build PASS (TypeScript/Vite), dist xác nhận slice160 fill và token viền; chưa browser QA.

- 2026-10-29: Theo user, tiếng X áp dụng Liên kết/Đăng xuất Hồ sơ, ResourceAddButton (+năng lượng/vàng), nút mở hồ sơ/avatar người khác, sáu thao tác Hồ sơ, toàn bộ nút tiện ích vàng Home và bốn mode Home cả laptop/mobile. Tin nhắn: mở Cài đặt/các mục bên trong, kết bạn/ba chấm, mở emoji/ảnh/gửi, Hủy/OK biệt danh, toàn bộ nút/menu/tab/checkbox Tùy chọn nhóm và Tạo nhóm dùng tiếng X; chỉ từng emoji trong bảng chọn giữ tiếng tab. Giữ âm tab của danh sách hội thoại/lời mời và các vùng đã chốt khác; chỉ thay âm thanh.
- Kiểm chứng âm thanh các nút 2026-10-29: npm.cmd run build PASS (TypeScript/Vite, exit0), dist/assets/index-yvbb1XDV.js chứa marker X/tab; emoji lựa chọn và danh sách hội thoại giữ marker tab, menu nhóm đã chuyển X. Chưa browser/audio QA.
- 2026-10-29: User đổi quy tắc năng lượng, chuẩn tại docs/ENERGY-RULES.md. Sau ván có hàng chờ đủ năng lượng thì ưu tiên thay ghế hết năng lượng trước người thua; cả2hết/1ngườichờ thay người thua trước, đủ2ngườichờ thay cả2. Không có ngườichờ giữ ghế. Người bị thay vì hết năng lượng xuống viewer queued=false và nhận EnergyNotice riêng. Hết năng lượng vẫn mở các mục khác/vào phòng có sẵn để xem; chặn 2mục CờTướng/CờÚp Home, queue/Ready và mọi đường tạo phòng (HTTP/fallback/So tài cần phòng mới). Bàn khóa giữ ngoại lệ ghế cũ khi còn năng lượng, nhưng cũng thay người hết nếu có ngườichờ; chủ không promote người hết năng lượng. Giữ hồi/trừ/vô hạn/vàng/Elo/kết quả; RoomPersistence cache sau start+tính hồi tự nhiên, server authoritative. 10suite61/61 PASS; typecheck/build PASS, dist cập nhật; chưa browser/2thiết bị/MySQL thật, không deploy/restart production.

- 2026-10-29: Theo user, chọn mốc thời gian Tạo bàn (phút/giây) và Chơi nhanh dùng tiếng X; thao tác mở select/dropdown giữ tiếng tab. Select native Tạo bàn phát tab ở pointerdown và X ở change, bỏ marker click tab để tránh tiếng tab ghi đè lúc chọn.
- Kiểm chứng âm thanh chọn thời gian: npm.cmd run build PASS (TypeScript/Vite, exit0), dist/assets/index-DA9sB4t8.js đã cập nhật; chưa browser/audio QA.

- 2026-10-29: Theo user cả2bản: người đang xem ván online nghe victory-fanfare khi ván kết thúc có người thắng, cùng gate hoàn tất hình/âm chiếu bí của người chơi; không mở popup thưởng cho viewer, không phát khi mới vào ván đã kết thúc/replay/hòa. useMatchResult theo dõi spectator sống và trả spectatorVictoryReady. Đóng bảng kết quả/nhận thưởng Home chỉ đóng UI; cue đã bắt đầu tiếp tục tới onended, còn cue chưa tải xong bị hủy để không phát trễ. useCelebrationSound finishOnClose giữ gain/mute subscription tới cuối; rời màn/đổi phiên ghế/bắt đầu ván mới/đổi account vẫn dọn cue, không mang sang phiên khác. 26/26 celebration/match-result/leave-session kiểm tra PASS; chưa browser/audio/hai thiết bị QA.
- Kiểm chứng bổ sung: npm.cmd run build PASS (TypeScript/Vite), dist xác nhận finishOnClose/spectatorVictoryReady; chưa nghe thử trên trình duyệt.
- 2026-10-29: Theo ảnh user, khôi phục khung nâu/viền vàng của bảng xem lớn danh hiệu nhận được. RewardPreviewDialog luôn dùng shopMobileDialogFrameClass/border/background/padding, không bỏ lớp khung khi có details. Bảng Thông tin danh hiệu bên cạnh và luồng nhận thưởng giữ nguyên. Shared preview Home/trong trận tiếp tục đồng bộ; build/typecheck PASS, dist xác nhận; chưa browser QA.
- 2026-10-29: Theo ảnh user, toàn bộ tab nhóm catalog Danh hiệu (Tất cả/Vinh Quang Kỳ Đài/Danh Hiệu Phong Tặng/Chuỗi Chiến Thắng/Tổng Ván Chơi/Online Chuyên Cần) và nút Ẩn danh hiệu dùng tiếng X. Đổi marker của hai renderer desktop/mobile và HonorHiddenToggle chung sang data-ui-selection-sound; bộ nhận diện ưu tiên marker X nên role=switch không phát chồng tiếng tab. Các ô danh hiệu vẫn giữ tiếng tab. Build/typecheck PASS, dist cập nhật; chưa browser/audio QA.

- 2026-10-29: Theo user cả laptop/mobile: bút sửa tên và chọn địa chỉ chỉ xuất hiện ở màn Thông tin chính theo quyền sẵn có; không render trong preview Tùy chỉnh avatar. ProfileDialog chặn nameEditControl/editControl khi avatarCustomizationOpen, gỡ wrapper hidden/compact:contents để không còn nút ẩn trong DOM/focus. Không đổi quyền đổi tên/địa chỉ hoặc avatar geometry.
- Kiểm chứng ẩn bút trong Tùy chỉnh avatar: npm.cmd run build PASS (TypeScript/Vite), dist cập nhật; chưa browser QA.
- 2026-10-29: User chốt tất cả ô tick/checkbox dùng âm thanh tab. isUiTabAction ưu tiên input[type=checkbox]/role=checkbox trước marker X; checkbox disabled/aria-disabled không phát, isUiSelectionAction không bắt checkbox. App bỏ click nhãn checkbox để chỉ phát một lần từ click input được browser chuyển tiếp. GroupCheckbox marker đổi tab; nút chọn/bỏ danh hiệu hồ sơ dạng +/tick cũng tab. Công tắc nút Ẩn danh hiệu vẫn X như yêu cầu riêng trước đó (không phải input checkbox). Checkbox native lời mời/ảnh vị trí/quản trị bàn tự được bao phủ qua handler chung. 4/4 regression PASS; typecheck/build PASS, dist xác nhận; chưa browser/audio QA.
- 2026-10-29: Theo ảnh user, công tắc Bàn khóa trong form Tạo bàn và hai nút Hủy/Tạo bàn dưới cùng dùng tiếng X. CreateRoomForm gắn data-ui-selection-sound cho đúng3button, dùng capture listener chung tránh phát chồng tiếng tab của role=switch; áp dụng laptop/mobile. Dropdown thời gian giữ mapping hiện tại, checkbox thực vẫn tab. Build/typecheck PASS, dist xác nhận; chưa browser/audio QA.

- 2026-10-29: Theo user, thông báo Không có bàn phù hợp ở Chọn Bàn cả2bản là lớp absolute nằm trên vùng danh sách bàn (top8/inset8/z30), không chiếm chiều cao flex/đẩy khung bàn xuống. useRoomSelection.message tự xóa sau2000ms, X đóng ngay; timer cleanup khi đổi thông báo/unmount. Không đổi lỗi lobby hoặc ghép bàn.
- Kiểm chứng thông báo phủ danh sách bàn: npm.cmd run build PASS (TypeScript/Vite), dist xác nhận lớp absolute mới; chưa browser QA.
- 2026-10-29: Theo user, hai nút Vị trí tùy chỉnh/Đấu ngay ở thiết lập Chơi với máy dùng tiếng X trên desktop/mobile. Đấu ngay vào GamePage dùng board-entry.wav như Xem lại/Đã lưu; không được chồng tiếng intro mở trận. useMoveSound thêm matchIntroEnabled mặc định true; useGame tắt cho computer engine khác basic (Fairy/Pikafish của thiết lập máy), chặn cả yêu cầu intro từ start và transition ready→playing. useComputerSetup vẫn phát board-entry sau engine ready thành công. Giữ intro online/basic và các tiếng đi/ăn/chiếu/chiếu bí. Computer/move-sound16/16 PASS; typecheck/build PASS, dist xác nhận; chưa browser/audio QA.
- 2026-10-29: Theo user, nút/banner Luyện cờ ở màn Chơi với máy dùng tiếng X trên laptop/mobile. Gắn data-ui-selection-sound ở ComputerSetup/ComputerSetupDesktop, giữ thông báo chưa hỗ trợ và giao diện. Typecheck/build PASS, dist xác nhận; chưa browser/audio QA.

- 2026-10-29: User đổi riêng Chơi nhanh trong Chọn Bàn: fetch danh sách mới, khớp thời gian/variant và đúng1người ngồi/chưa đấu; random trong tỉnh đang chọn trước, không có mới random tỉnh khác. Tất cả không ưu tiên tỉnh riêng; quy tắc ưu tiên Việt Nam khi chưa địa chỉ tiếp tục áp dụng khi fallback. Cho vào bàn khóa nếu passwordRequired=false; bàn có mật khẩu hoặc dữ liệu khóa cũ chưa xác nhận không-mật-khẩu luôn bỏ qua. Truyền tỉnh từ useRoomSelection vào mutation, không lấy tỉnh hồ sơ thay lựa chọn UI; không giới hạn bởi30bàn hiển thị. Home giữ chính sách khóa hiện có.
- Kiểm chứng Chơi nhanh ưu tiên tỉnh: 7/7 quickRoom/room-regions/locked-room-ui PASS; npm.cmd run build PASS (TypeScript/Vite), dist xác nhận allowPasswordlessLocked. Chưa browser/hai client QA.

- 2026-10-29: Theo user riêng MOBILE: căn Like theo trung điểm khe ngang giữa mép avatar và mép khung mã phòng thực; useBoardLayout đo lại sau opening/đổi phiên/resize, dùng bề ngang hiển thị Like. Bỏ nút ⋯ cạnh avatar trong bàn khóa; khi chủ giữ avatar mở Phong danh hiệu, nút vàng Cài đặt người chơi nằm đầu panel trước tiêu đề/danh sách, mở đúng menu quản lý mục tiêu cũ. Chuột phải laptop, menu dòng View và quyền server giữ nguyên. Không đổi geometry avatar/khung mã phòng.
- 2026-10-29: Theo user chỉ MOBILE bàn cờ: mở menu ba gạch không hiện nút Xếp/Thoát hàng độc lập nữa. Wrapper RoomQueueButton ngoài danh sách luôn compact:hidden, bỏ phụ thuộc mobileMenuOpen. Chỉ View mở RoomUsersPanel mới thấy thao tác hàng chờ; desktop giữ hành vi hiện có. Không đổi luật queue/năng lượng/role. Room-users-panel1/1 PASS; build/typecheck PASS, dist xác nhận; chưa browser QA.
- Kiểm chứng căn Like/mobile quản lý avatar: npm.cmd run build PASS (TypeScript/Vite), dist xác nhận nút Cài đặt người chơi và anchor mã phòng; chưa browser/touch QA.
- 2026-10-29: User đổi quản trị Đưa lên bàn: khi chưa đấu, đủ2người vẫn đưa viewer được chọn lên, thay người ngồi khác chủ phòng ở đúng ghế/màu, bất kể người đó đã Ready hay chưa. Người bị thay xuống View queued=false, target rời danh sách View/queue, reset thế chờ/Ready như resetModeratedSeats cũ; ghế trống vẫn vào bình thường. Nếu chủ đang View và cả2ghế đầy, chọn ghế đầu tiên khác chủ theo thứ tự players. Giữ quyền chủ/không tự tác động mình/kiểm tra năng lượng target; ván đang playing vẫn chặn promote. Thêm chat hệ thống cho lần thay ghế. Moderation/energy/readiness33/33 PASS; typecheck/build PASS, dist tái tạo (logic server); chưa browser/2thiết bị QA, backend cần nạp mã mới.

- 2026-10-29: Theo user, viewer online có quyền giữ avatar để Phong danh hiệu cho cả2ghế; canGrantOnSide đối chiếu role viewer tường minh, người đang ngồi chỉ phong cho người còn lại, replay giữ tắt. Khi phase playing, cấm promote và demote kể cả chủ gọi trực tiếp/server; UI vô hiệu hai lựa chọn và Đồng ý của xác nhận ghế đang mở khi ván bắt đầu. Giữ cấm chat/kick theo quyền cũ, giữ đổi ghế khi chưa đấu. Quy tắc này thay việc demote đang đấu xử leave trước đó.
- Kiểm chứng quyền phong viewer/khóa đổi ghế: 9/9 room-moderation PASS, gồm lệnh đổi ghế bị từ chối không đổi snapshot đang đấu; npm.cmd run build PASS (TypeScript/Vite), dist cập nhật. Chưa browser/hai client QA.

- 2026-10-29: User báo giữ avatar MOBILE không mở Phong danh hiệu. Thêm useAvatarTouchHold bắt touchstart/move/end native passive:false, ngăn browser giữ ảnh/pan và native synthetic click; giữ550ms dùng callback mới nhất, không bị reset bởi clock rerender. Tap ngắn button.click để giữ mở hồ sơ/âm UI; giữ lâu nuốt click, rê>10px/touchcancel/đổi target/unmount hủy timer. Pointer handlers cũ chỉ xử lý mouse/pen, avatar touch-none/callout-none/chặn drag. Không đổi geometry/quyền phong/desktop. Chưa thiết bị thực QA.
- Kiểm chứng giữ avatar mobile: 5/5 native touch regression PASS (giữ qua rerender, tap, kéo/hủy/đổi target), npm.cmd run build PASS (TypeScript/Vite), dist xác nhận consumeHeldClick. Chưa thử trên điện thoại thật.
- 2026-10-29: Takeback online tạm dừng clock tối đa10.000ms. RoomService giữ deadline đơn điệu theo room; tick hoặc lệnh xử lý offer hết hạn đồng bộ, xóa offer và tính clock bằng advanceClock từ đúng deadline tới thời điểm xử lý để không mất/thừa thời gian khi tick muộn. Reply tại deadline trở đi bị từ chối; resolve/leave/reset/new match/finish/seat rotation dọn deadline. Không dùng timer callback riêng nên deadline cũ không thể đóng request mới. RoomOfferDialog chỉ render theo offer trong snapshot; snapshot null tự unmount popup cho người nhận, requester không render popup; room:state gửi tới cả hai phiên, system message hết hạn không dùng room:notice/block overlay. Kiểm chứng VPS workspace cách ly: TypeScript/build PASS; room+popup35/35 PASS; Socket.IO hai client2/2 PASS gồm 9.999/10.000ms, null snapshot cả hai, clock tiếp tục đúng2giây, join phiên mới nhận null. Full suite trên Linux: 528 PASS/38 FAIL/27 SKIP (593); baseline cô lập trước vá 518 PASS/38 FAIL/27 SKIP (583), đúng cùng38 lỗi trên cùng8 test files, không có lỗi mới; 10 test mới đều PASS. SSH alias cotuong-codex xác thực đúng tài khoản/VPS; chỉ đồng bộ snapshot code đã lọc secret vào /home/cotuong_codex/workspace/takeback-timeout-check-20261029. Không sửa release/candidate cũ/production, không restart/deploy/DB; candidate chính thức và symlink production chưa được xác minh do không có quyền ghi release.

- 2026-10-29: Theo user, hàng chờ Bàn khóa hoạt động như thường khi người thua KHÔNG phải chủ: đầu hàng lên sau3s nếu đã chờ từ trước, người thua xuống cuối hàng; chủ thua giữ ghế, người thắng không bị thay. Chặn hàng và ưu tiên thay ghế hết năng lượng vẫn giữ; không bật ép Sẵn sàng/countdown. Mobile Cài đặt người chơi nằm ngoài phía trên khung Phong danh hiệu, không chiếm hàng danh hiệu. Bỏ ⋯ trong dòng View/hàng chờ; nhấn giữ550ms mở quản lý, cho phép kéo cuộn danh sách và không mở hồ sơ sau giữ. Danh hiệu đã phong không gỡ: nút đã phong disabled, hook local/API chỉ thêm idempotent; server ContentRepository.endorse từ chối enabled=false trước transaction, không DELETE/revoke từ bỏ phong. Không thay lựa chọn ẩn/hiện danh hiệu đã sở hữu.
- Kiểm chứng hàng chờ/nút ngoài khung/giữ View/phong vĩnh viễn: 33/33 qua6suite PASS; thêm fallback contextmenu cho giữ dòng View mobile (giữ khả năng cuộn), kiểm lại8/8 touch/View PASS gồm case mới. Tổng34case riêng biệt PASS. npm.cmd run build PASS (TypeScript/Vite), dist xác nhận nút ngoài khung và trạng thái Đã phong. Chưa browser/thiết bị thật/MySQL thật QA; backend cần nạp mã mới.
- 2026-10-29: Theo user, chữ tên người/thời gian dưới các bàn Chọn Bàn LAPTOP dùng font-body như MOBILE, bỏ font-heading/font-number riêng tại nhãn footer RoomTableGrid; giữ cỡ chữ/bố cục và font số đếm người chung. Cả2bản, bấm Back khi đang chơi và thực sự là người tham gia phải mở LeaveRoomDialog với2nút Hủy/Rời bàn, ghi chú giữa Khi rời bàn, bạn sẽ thua ván đấu. useGame.leave chỉ yêu cầu xác nhận, confirmLeave mới dùng luồng rời cũ; Hủy/Escape không gửi socket hoặc reset bàn. Viewer/replay/chưa đấu/kết thúc rời trực tiếp. Không pause clock, không tự khai kết quả ở client; server giữ xử thua online. Dọn xác nhận khi kết thúc/đổi phiên ghế. 4suite19/19 PASS; typecheck/build cuối PASS, dist index-BXo2br4x.js xác nhận; chưa browser/thiết bị thật QA.

- 2026-10-29: User chốt cô lập View/hàng chờ với bàn đang đấu. GamePage Ready sau kết quả dùng khóa ván ổn định (id/phe thắng/lý do/số nước/phiên ghế), không reset2s theo object result mới ở mỗi socket snapshot. Viewer join/leave/queue không reset game/ready/hiệu ứng của cặp ghế.
- Đổi ghế tự động sau kết quả chờ cả2người đã đấu gửi result-presentation-complete đúng archive ID, sau callback hết5s biểu cảm và gate hình/audio chiếu bí; server mới đặt deadline now+2000. Viewer không ACK; ACK cũ bị chặn, ACK trùng không kéo dài. Không cho người mới vào hàng sau kết thúc bypass thời gian. Snapshot Ready mới chỉ sau deadline; không dùng timeout đoán độ dài audio. Client cũ không ACK phải cập nhật cùng backend.
- Người xuống bàn luôn View thường queued=false, muốn chờ phải tự bấm. Người vừa lên bàn không bị tự thay vì người dưới xếp hàng/không Ready. Cả bàn thường và bàn khóa chỉ đếm để bắt đầu: không Ready cả2 thì10s chờ+20s đếm; có1Ready thì đếm30s từ lầnReady đầu rồi bắt đầu đúng cặp, không phạt xuống View. Hết hàng chờ hủy đếm như cũ. Thay ghế hết năng lượng/chủ phòng bàn khóa miễn xuống vì thua/luật rời ghế vẫn giữ ngoại lệ đã chốt. Luật này thay readiness kick/khóa không-countdown và loser tự queued trước đó.
- Kiểm chứng cô lập View/đổi ghế sau hiệu ứng: 95/95 qua8suite rooms/readiness/energy/moderation/visual-gates PASS; 1/1 integration ba socket loopback PASS (hai ACK, chặn ACK viewer, đủ2s, snapshot View thường và cặp mới không bị thay). npm.cmd run build PASS (TypeScript/Vite), dist xác nhận result-presentation-complete/presentationReady. Chưa browser/thiết bị thật QA; cần backend và frontend cùng mã mới, chưa deploy/restart production.

- 2026-10-29: Theo user, bảng emoji Tin nhắn laptop/mobile giữ mở sau mỗi lần chọn để chèn liên tiếp; nút mở khi bảng đang mở cũng không đóng. Chỉ pointerdown ngoài bảng và nút mở mới đóng; bỏ đóng khi input nhận focus do code đặt lại con trỏ. Giữ âm X ở nút mở, âm tab từng emoji và giới hạn300 ký tự.
- 2026-10-29: Theo user riêng MOBILE khi bấm danh hiệu vừa nhận: RewardPreviewDialog có details dùng khung chính nhỏ min(66vw,320px,62dvh), max-height78dvh, padding12px/title18px/nút Đóng gọn; overlay grid căn giữa cả ngang/dọc. Thông tin danh hiệu đặt absolute cạnh phải tại left58% khung chính, width min(44vw,220px,42dvh), giữa dọc, được chồng lên khung chính; chữ các ul12px cục bộ. Bỏ luồng xếp bảng thông tin xuống dưới trên compact để mở/đóng info không kéo lệch khung chính. Chỉ nhánh honor nhận thưởng có details, desktop/các vật phẩm khác giữ như cũ. Build/typecheck PASS, dist xác nhận; chưa browser/thiết bị thật QA.
- Kiểm chứng giữ mở bảng emoji: npm.cmd run build PASS (TypeScript/Vite, exit0), dist/assets/index-B5iR6G8u.js cập nhật. Chưa browser/touch QA.

- 2026-10-29: Theo user, bấm ô avatar/viền trong danh sách Shop (ngày/tuần, laptop/mobile) để xem rõ phát tiếng X/ui-action-confirmation qua data-ui-selection-sound. Nút Mua tiếp tục tiếng tab theo quy tắc riêng; giữ mua/preview và muted chung.

- 2026-10-29: Theo user, Xin thua cả laptop/mobile dùng ResignDialog native NoticeOverlay hai lựa chọn Hủy/Đồng ý theo style xác nhận chung, thay window.confirm. Chỉ Đồng ý gửi resign hiện có; Hủy/Escape/bấm nền đóng, không kết thúc ván. Không pause đồng hồ; đóng/dọn xác nhận khi kết thúc hoặc đổi phiên ghế, chặn xác nhận cũ/người xem/replay. 14/14 kiểm tra leave-confirmation + replay-game-isolation PASS (TEMP trong workspace để tránh ENOENT sandbox); npm.cmd run build PASS, dist/assets/index-D7s1gTl0.js cập nhật. Chưa browser/thiết bị thật QA.
- Kiểm chứng âm ô Shop: npm.cmd run build PASS (TypeScript/Vite), dist cập nhật; chưa nghe thử trên trình duyệt.

- 2026-10-29: Theo ảnh user, tooltip Hồi năng lượng dùng NumberText chung để chữ số đếm phút/giây có font-number/lining-nums/tabular-nums thẳng hàng, cùng cỡ và semibold, không giảm opacity. Đồng bộ Home laptop/mobile, giữ chữ/bố cục/logic hồi năng lượng.
- Kiểm chứng font số hồi năng lượng: npm.cmd run build PASS (TypeScript/Vite), dist/assets/index-YDhhxkCs.js cập nhật; chưa browser QA.
- 2026-10-29: User thay lượt xem thử info nhỏ bên cạnh danh hiệu vừa nhận trên MOBILE: bảng Thông tin danh hiệu nay lớn min(86vw,56dvh), fixed giữa viewport; chỉ hiện trong lúc tay chạm/giữ, pointerdown mở NGAY không delay, thả pointerup/cancel/lostcapture hoặc blur/ẩn tab đóng ngay. Hỗ trợ cả ô danh hiệu trong bảng nhận thưởng và artwork ở preview; original tile mở preview đồng thời giữ info, thả ra vẫn giữ preview chính giữa nhưng ẩn info. useMobileHonorPress cục bộ RewardItemTile dùng pointercapture + window release theo đúngpointer, chặn contextmenu/touchdrag tại vùng giữ. Info mobile pointer-events-none để không cắt mất thao tác thả; bỏ override chữ12, trở lại chữ compact16. Khung chính nhỏ/căn giữa giữ như lượt trước; desktop và vật phẩm khác giữ hành vi cũ. 6/6 immediate-hold/release/cancel/lostcapture/blur/pointer-ID/desktop regression PASS; typecheck/build PASS, dist xác nhận; chưa điện thoại thật QA.

- 2026-10-29: User chốt khi có người xếp hàng và đúng1người Sẵn sàng: tổng20s tính từ lầnReady đầu của người đó, 5s đầu readyCountdown=null, từ5.000ms hiện15 rồi giảm tới1, đủ20s bắt đầu đúng cặp/khai cuộc cũ. Ready lặp không kéo dài mốc. Chỉ ghế CHƯA Ready thấy số qua readyCountdownForPlayer; ghế Ready và viewer không nhận số vào Board. Nhánh cả2chưaReady vẫn10s+20s như cũ. Áp dụng laptop/mobile/bàn thường/khóa; không đổi ghế vì chưaReady.
- Kiểm chứng bộ đếm1Ready: 25/25 qua4suite PASS, kiểm mốc4.999s ẩn/5s hiện15/19.999s hiện1/20s bắt đầu, chỉ ghế chưaReady thấy và Ready lặp không đổi mốc, cả bàn thường/khóa. npm.cmd run build PASS (TypeScript/Vite), dist cập nhật; chưa browser/thiết bị thật QA; backend cần nạp mã mới.

- 2026-10-29: Theo user, trong bàn cờ laptop/mobile: Lưu ván, menu3gạch, phóng to, Bạn bè, View, xếp/thoát hàng, mở chat/avatar/biểu cảm/gợi ý/gửi dùng tiếng X qua marker chung. Từng emoji và từng câu gợi ý trong chat bàn dùng tiếng tab. Nút loa giữ âm tab đã chốt; không đổi UI hoặc gameplay.
- Kiểm chứng âm bàn cờ: npm.cmd run build PASS (TypeScript/Vite), dist/assets/index-CBn1xe0p.js cập nhật; chưa nghe thử browser.

- 2026-10-29: Theo user, người bấm Từ chối yêu cầu Đi lại/Cầu hòa trong bàn chơi cả laptop/mobile nhận toast gợi ý Từ chối qua showRoomNotice/useInviteSentNotice (giữa màn hình, bay lên/tự mất). Chỉ phát sau ACK thành công; lỗi/hết hạn không báo từ chối thành công. Không đổi nghiệp vụ hoặc hình từ chối phía người gửi.
- Kiểm chứng toast Từ chối yêu cầu trong bàn: npm.cmd run build PASS (TypeScript/Vite), dist cập nhật; chưa browser QA.

- 2026-10-29: Theo user, chat trong bàn cờ laptop/mobile không đóng bảng emoji sau khi chọn emoji. useChat.emoji chỉ chèn ký tự/đặt lại con trỏ, giữ picker hiện tại; hành vi bấm ngoài/Escape/gửi và âm thanh giữ nguyên.
- Kiểm chứng giữ bảng emoji chat bàn: npm.cmd run build PASS (TypeScript/Vite), dist/assets/index-GwVFgyvL.js cập nhật; chưa browser/touch QA.

- 2026-10-29: Theo user, mọi ô lựa chọn tỉnh/thành và Tất cả trong popup Chọn tỉnh của Chọn Bàn dùng tiếng X (data-ui-selection-sound), cả laptop/mobile.
- Kiểm chứng âm chọn tỉnh: npm.cmd run build PASS (TypeScript/Vite), dist/assets/index-DLNd20ID.js cập nhật; chưa nghe thử browser.

- 2026-10-29: User đính chính chỉ Đi lại (Cầu hòa đã bỏ UI). Gỡ hoàn toàn hình/bảng Từ chối trên avatar PlayerCard. Cả người gửi và người phản hồi yêu cầu Đi lại thấy toast Từ chối giữa màn hình/bay lên/tự mất khi từ chối tay hoặc hết hạn10s. Server expireTakebackOffer tạo takebackDecline ID mới trước xóa offer, không đổi clock/deadline; hook useTakebackDeclineNotice nhận sự kiện mới một lần, bỏ snapshot cũ/viewer/phiên ghế cũ. Máy từ chối cũng dùng toast. Gỡ toast trực tiếp reply command để tránh lặp và không gắn Cầu hòa.

- 2026-10-29: Theo user, artwork danh hiệu trong nhận thưởng Home và preview nhận thưởng bỏ badge con mắt/lượt phong tặng phía trên cả laptop/mobile. ReceivedHonorArtwork truyền showCount=false qua HonorCatalogBadge/AwardedHonorBadge; mặc định catalog/hồ sơ vẫn giữ bộ đếm.
- Kiểm chứng bỏ mắt nhận danh hiệu: npm.cmd run build PASS (TypeScript/Vite), dist/assets/index-iOlacHhl.js xác nhận showCount=false; chưa browser QA.
- Kiểm chứng gợi ý Từ chối Đi lại: 39/39 rooms/offer-dialog/decline-notice PASS (timeout10s có metadata, hai ghế nhận một lần, snapshot cũ/viewer/phiên mới không phát lại, máy cùng toast); npm.cmd run build PASS (TypeScript/Vite), dist xác nhận bỏ takebackDeclineKey. Chưa browser/thiết bị thật QA; backend cần nạp mã mới cho sự kiện hết hạn.

- 2026-10-29: User đính chính gợi ý Từ chối Đi lại chỉ dành cho requester (người bị từ chối), cả từ chối tay/hết hạn. Người phản hồi và viewer không thấy; máy vẫn báo cho người yêu cầu. Thay quy tắc cả2ghế của lượt trước; không đổi server/clock/offer.
- Kiểm chứng chỉ requester thấy Từ chối: 4/4 regression PASS, gồm người phản hồi không nhận toast ở bấm nút/hết hạn; npm.cmd run build PASS (TypeScript/Vite), dist cập nhật; chưa browser QA.

- 2026-10-29: Sửa thiếu bảng Nhận được trên điện thoại dù đã có danh hiệu: homeRewardsStore trước bỏ qua snapshot đầu và union mã đã thấy khiến gỡ/cấp lại không tạo receipt. Thêm honorReceiptsInitialized để đồng bộ một lần danh hiệu thực đang sở hữu ở thiết bị mới/cache cũ (kể cả desktop); không nhân đôi pending. Sau Xác nhận/reload/về Home không lặp. Lưu snapshot sở hữu mới nhất, loại pending danh hiệu đã gỡ; nhận lại sau khi quan sát snapshot không sở hữu tạo thông báo mới. Chỉ tạo thông báo từ dữ liệu API, không cấp vật phẩm/đổi DB. Chuyển cache cũ có thể hiển thị lại danh hiệu đang sở hữu một lần vì chưa có marker mới. 5/5 regression PASS, npm.cmd run build PASS (TypeScript/Vite); dist/assets/index-CHXZet0D.js xác nhận marker mới. Chưa QA điện thoại thật.

- 2026-10-29: Theo user, mọi nút Cài lại dùng tiếng đi quân. Hai nút Cài lại laptop/mobile của Vị trí tùy chỉnh gọi reset chung ở usePositionEditor, phát playPositionMoveActionSound một lần; dùng asset đi quân (2).wav đã preload, tuân thủ Tắt tiếng. Không đổi thao tác reset.

- 2026-10-29: Hoàn tất yêu cầu căn giữa nhận thưởng mobile: native dialog Nhận được phủ viewport100vw×100dvh/grid center, artwork giữ min(92vw,70dvh) ở khung con, desktop giữ layout. Chặn confirm khi preview đang mở và bỏ cancel nổi bọt từ dialog con. RewardPreviewDialog chỉ đóng bằng chạm nền nếu chính pointerdown bắt đầu trên nền; bỏ click chuyển đích khi preview vừa mở để không mất bảng do cùng cú chạm. Đóng/Escape preview vẫn hoạt động. 7/7 reward-gesture/receipt tests PASS; npm.cmd run build PASS, dist/assets/index-DoQC6Z7T.js cập nhật; chưa QA điện thoại thật/âm thanh.
- Kiểm chứng tiếng Cài lại: npm.cmd run build PASS (TypeScript/Vite); dist/assets/index-DoQC6Z7T.js cập nhật; chưa nghe thử browser.

- 2026-10-29: Theo user, hồ sơ nước ngoài tạo bàn mặc định thuộc Tất cả (province rỗng), không dùng tỉnh Việt Nam còn sót trong session. Home fallback và form mặc định cùng quy tắc; Chọn Bàn chỉ truyền tỉnh khi chọn tỉnh cụ thể, chọn lại Tất cả bỏ tỉnh cũ khi tạo. Không thay địa chỉ hồ sơ/dữ liệu tỉnh khác; cả laptop/mobile.
- Kiểm chứng: 9/9 Home/room-regions/locked-room-ui PASS (CN có tỉnh cache cũ, chọn tỉnh thủ công, quay lại Tất cả); npm.cmd run build PASS TypeScript/Vite, dist xác nhận creationProvince. Chưa browser/thiết bị thật QA.

- 2026-10-30: Theo user, bảng xem lớn vật phẩm trong Nhận được trên MOBILE cố định ngang, không vuốt lệch sang hai bên. RewardPreviewDialog khóa overflow-x/overscroll-x và chỉ cho pan dọc, giới hạn wrapper theo viewport; áp dụng component preview dùng chung Home/trong trận. Giữ luồng chạm/giữ thông tin danh hiệu và đóng preview. npm.cmd run build PASS (TypeScript/Vite), dist/assets/index-DjDWAhjn.js xác nhận lớp khóa cuộn mới; chưa QA vuốt trên điện thoại thật.

- 2026-10-30: Theo user, Mời chơi/So tài kiểm tra bàn hiện tại của người gửi: đủ2ghế thì báo gợi ý Bàn đã đầy. và không gửi lời mời. Khi Đồng ý lời mời cũ, server kiểm tra lại bàn người gửi tại thời điểm đó trước busy/Ready và trước rời phòng/chuyển ghế; bàn đầy thì giữ nguyên phòng/ghế, không đưa người nhận xuống khán giả hoặc đánh dấu cặp mời. Thông báo gợi ý chung qua useInviteSentNotice ở Bạn bè/Hồ sơ/lời mời nhận, cả laptop/mobile. Hai suite challenge/cooldown12/12 PASS; npm.cmd run build PASS (TypeScript/Vite), dist xác nhận thông báo. Chưa browser/hai thiết bị QA; backend cần nạp mã mới, không tự restart/deploy.

- 2026-11-02: Theo user, đồng bộ bảng thông báo một lựa chọn theo mẫu So tài khi người chơi offline: nền nâu phẳng/viền kem, rộng tối đa360px (viewport−48px), chữ18px, nút vàng tối thiểu120×46px. OneChoiceNoticeStyles dùng chung Home/Chọn Bàn/Chơi với máy/trong bàn/Hồ sơ/Bạn bè/kiểm tra tên/tùy chọn Tin nhắn trên laptop và mobile. Giữ nội dung/callback, không đổi bảng hai lựa chọn hoặc layout màn cha/avatar. Build TypeScript/Vite PASS; dist đã kiểm tra token chung; chưa browser QA.

- 2026-11-02: Theo user, bấm ảnh đã gửi/nhận trong Tin nhắn mở ảnh lớn giữa viewport, giữ tỷ lệ và giới hạn theo màn hình; nền tối và blur. MessageImagePreview dùng native NoticeOverlay chung cả laptop/mobile; đóng bằng X, Escape hoặc bấm nền; đổi hội thoại/đóng Tin nhắn dọn ảnh. Tin chữ giữ thao tác xem giờ, không đổi upload/quyền truy cập ảnh. npm.cmd run build PASS (TypeScript/Vite); dist MessagesDialog-CBWuKVDK.js xác nhận preview. Chưa browser/điện thoại thật QA.

- 2026-11-02: Theo user, bảng xác nhận hai lựa chọn LAPTOP đồng bộ kiểu MOBILE qua confirmationDialogStyles: font-body, tiêu đề24/32px bold, nội dung18/29px, nút44px/chữ18/24px. Khung/nền/nút nâu-vàng dùng chung sẵn có giữ theo mobile. Áp dụng mọi consumer gồm giải tán/rời nhóm/xóa bạn/chặn/xóa chat, đăng xuất/địa chỉ, mua Shop, rời bàn/xin thua/reset đánh thử và form dùng cùng token; không đổi callback/pending. Build TypeScript/Vite PASS; dist xác nhận token mới; chưa browser QA.

- 2026-11-02: Theo user chỉnh riêng Tạo nhóm LAPTOP: tăng cao popup (chặn viewport−32px), thu font nền .043→.037 theo width và icon3mục1.08em; ô tên/tìm cao7.5% tối thiểu44px, chữ cùng18px; tên bạn bỏ font đậm/stroke riêng SocialPlayerName, tên/ID thu .9/.75em, padding dòng trên/dưới4→7px. Hai nút dùng confirmationDialogActions cùng kích thước Tùy chỉnh avatar desktop44px/chữ18/cụm360px/font-body. Vùng chọn cao20%, thẻ phủ cột thay vuông, tên16px xuống dòng, X16px căn giữa. Mobile giữ nguyên, avatar không đổi. Build TypeScript/Vite PASS; dist xác nhận thẻ mới; chưa browser QA.

- 2026-11-02: Theo user, riêng Tạo nhóm LAPTOP tăng avatar thành viên đã chọn48→56px (giới hạn70cqh); tiêu đề Bạn bè cùng0.9em với Tên nhóm nên icon1.08em đi theo đúng tỷ lệ. Mobile và avatar các vị trí khác giữ nguyên. Sau chỉnh khóa lại geometry avatar cục bộ này. Build TypeScript/Vite PASS; dist MessagesDialog-CPPKJ2-V.js xác nhận; chưa browser QA.

- 2026-11-02: Theo user, riêng Tin nhắn LAPTOP tăng cao thanh nhập64→76logical và ô nhập/nút ảnh44→56logical; emoji45→56logical dùng cùng composer-control-size. Mobile giữ54/36/emoji30px và nút gửi giữ nguyên. Áp dụng chung hội thoại cá nhân/nhóm. Build TypeScript/Vite PASS; dist MessagesDialog-BZjy8-jT.js xác nhận; chưa browser QA.

- 2026-11-02: Sửa Mời chơi Bạn bè báo trùng tên: useFriendChallenge gửi accountId từ socialStore; ChallengeService tìm socket theo identity account do server xác thực, không fallback tên nếu account offline; nhiều kết nối cùng account chọn kết nối đăng ký gần nhất. Giữ đường socketId/tên cho consumer cũ, cooldown/busy/full/energy không đổi. Tên dòng Bạn bè dùng equalDigitSize, tiêu đề feedback dùng NumberText không thu nhỏ số. Regression challenge13/13 PASS gồm tên trùng/nhiều socket và offline không mời nhầm; build TypeScript/Vite PASS, dist cập nhật; chưa QA hai thiết bị. Backend cần nạp mã mới; không restart/deploy.

- 2026-11-02: Theo user, căn icon nhóm cạnh tên và camera cạnh preview Ảnh trong inbox trên cả laptop/mobile. Icon nhóm dùng1em theo font dòng/self-center, bỏ top2px riêng tên. Camera thay emoji hệ điều hành bằng SVG1em trong flex items-center/gap.35em cùng chữ; hỗ trợ cả preview URL ảnh và marker 📷 Ảnh từ API. Không đổi avatar/dữ liệu/tương tác. Build TypeScript/Vite PASS; dist MessagesDialog-Aa2cEf-C.js xác nhận; chưa browser QA.

- 2026-11-02: Theo user, tách 6 viền đang ghép trên avatar Shop cao cấp thành sản phẩm Khung Viền riêng: Hồ Ly/Thiên Tôn/Sa Tăng/Bạch Long/Hắc Lang/Bạch Hổ, mã frame-27–32. Avatar không còn overlay viền; Tất cả có cả hai loại. Catalog/API tuần/mua/admin/chọn viền dùng định nghĩa chung, loại viền tuần khỏi chợ ngày. Giữ giá theo mẫu cũ (Sa Tăng12.000, còn lại10.000), không tự cấp/equip hoặc đổi geometry avatar. Regression tuần + inventory4/4 PASS; TypeScript/Vite build PASS, dist có đủ6PNG; chưa browser/giao dịch DB QA. Backend cần nạp mã mới; không restart/deploy.

- 2026-11-02: Theo user, thành viên tự rời nhóm thành công tạo thông báo bền vững trong lịch sử chat: avatar tài khoản+tên+đã rời nhóm căn giữa, chung laptop/mobile. Repository ghi message server với client_message_id group-left: +25hex (36ký tự) cùng transaction left_at/update last_message_at; send chặn prefix dành riêng, không đổi schema. API trả eventType/avatar/name theo senderId; client render riêng thay bong bóng. Không tạo sự kiện khi owner bị chặn rời hoặc thao tác lỗi; không áp dụng kick/giải tán. group-chat-controls17/17 PASS; TypeScript/Vite build PASS, dist xác nhận; chưa MySQL/browser nhiều thiết bị QA, backend cần nạp mã mới, không tự restart/deploy.

- 2026-11-02: Theo user, thanh cuộn danh sách Shop phải nổi trên mép khung, không chiếm chiều rộng/đẩy ô sản phẩm. ShopScrollPanel ẩn scrollbar native bằng utility ưu tiên cao, vẽ thumb absolute 6px kéo được; giữ wheel/touch cuộn thật và dùng chung chợ ngày/tuần, các tab, laptop/mobile. TypeScript/Vite build PASS, dist đã cập nhật; chưa browser/touch QA.

- 2026-11-02: Theo user, phóng hai nút Chấp nhận/Từ chối lời mời vào nhóm trong Tin nhắn LAPTOP: cụm ngang56→64%, cao48→56logical theo scale, font clamp14–20px/7cqw, icon tối đa26px/11cqw. Mobile và callbacks/pending giữ nguyên. TypeScript/Vite build PASS; dist MessagesDialog-BoretpCW.js xác nhận; chưa browser QA.

- 2026-11-02: User báo 6 viền tuần mờ. Nguồn5ảnh341–342×341, Bạch Hổ512². crispImageProps dùng -webkit-optimize-contrast riêng6asset, preview dùng CrispUiImage đồng bộ Shop/chọn viền/overlay; giữ geometry/asset. Build TypeScript/Vite PASS, dist cập nhật; chưa browser QA, nguồn nhỏ vẫn giới hạn chi tiết khi phóng lớn.

- 2026-11-02: Theo user, bỏ tiếng tích tắc đồng hồ tự động khi bắt đầu và trong lượt đi trên cả laptop/mobile, mọi mode dùng useGame. clockTickPolicy luôn false để useMoveSound dừng timer tự động; giữ audio đếm Sẵn sàng, cảnh báo10giây cuối và âm nước đi/khai cuộc/kết quả. Hai suite policy10/10 PASS; TypeScript/Vite build PASS; dist GamePage-BiqnFoTG.js cập nhật; chưa nghe thử browser.

- 2026-11-02: User yêu cầu tái tạo6viền tuần nét hơn, giữ mẫu và thay vào. Built-in image_gen edit từngPNG nguồn,6bản1254² tại assets/shop/frames/weekly-custom (giữ tên/mapping frame27–32), originals-before-hd-20261102 giữ bản cũ, source-hd.json ghi prompt/nguồn. Đã đối chiếu trực quan6mẫu, giữ motif/màu/bố cục chính; tái tạoAI không pixel-identical. Tâm/góc6ảnh alpha0. Không đổi geometry/catalog/giá. Build TypeScript/Vite PASS, dist kiểm đủ6PNG mới; chưa browser QA.

- 2026-11-02: User đổi quy tắc presentation online: người khác ra/vào phòng, đổi ghế hoặc lên bàn không ngắt bảng thắng/thua và âm thanh kết quả của người đã đấu. Chỉ chính người đó bấm Sẵn sàng mới dọn kết quả/âm thanh; ván mới hoặc tự rời phòng vẫn dọn vòng đời. Thay phần reset kết quả/audio theo cặp ghế của quy tắc2026-10-22; không đổi luật server/thưởng. Tiếng đếm Sẵn sàng dùng kênh riêng, không bị thao tác/stop tích tắc tự động ngắt.
- Kiểm chứng thay đổi đếm/kết quả2026-11-02: 40/40 game-sounds/move-sound/match-result/result-presentation-stability PASS; npm.cmd run build TypeScript/Vite PASS, dist GamePage-CRQIZ5dx.js xác nhận kênh readyCountdown; diff-check các file logic âm thanh/kết quả PASS. Chưa browser/audio/hai thiết bị QA. Giữ reset animation và các popup thao tác theo ghế; chỉ scope audio/kết quả chuyển về room+self Ready.

- 2026-11-02: Sửa regression mất bảng/âm thanh thắng thua sau thay đổi giữ kết quả: cờ player.ready vẫn true trong ván đang playing, không được dùng để xóa participant. useMatchResult chỉ xóa khi ready và phase ready; GamePage/useGame cũng chỉ đưa ready ở phase ready vào khóa âm thanh, tránh hủy âm chiếu bí lúc kết thúc do ready tự reset. Thêm regression chơi với ready=true rồi kết thúc phải hiện thắng. Giữ quy tắc người khác ra/vào/đổi ghế không dọn kết quả.
- Kiểm chứng sửa regression kết quả:39/39 match-result/move-sound/game-sounds PASS, có ca player.ready=true suốt playing rồi vềfalse lúc kết thúc; npm.cmd run build TypeScript/Vite PASS, dist cập nhật. Chưa browser/audio QA hai thiết bị.

- 2026-11-02: Theo user, làm lại nội dung Tạo bàn MOBILE lớn hơn: form compact flex dọc/gap12/padding24, tối đa90dvh và cuộn khi thiếu cao; tiêu đề8cqw, nhãn4.6cqw, giá trị/nút5.2cqw. Hai ô thời gian và nút Hủy/Tạo cao56px/full vùng nội dung; khóa bàn switch56×32/núm24; mật khẩu48px, bật khóa tự giãn nội dung không chồng. Desktop giữ tọa độ/kích thước cũ, footer wrapper display:contents. Không đổi tạo phòng/mật khẩu/thời gian/âm thanh. locked-room-ui3/3 PASS; npm.cmd run build TypeScript/Vite PASS, dist CreateRoomForm-BqNaN2U1.js xác nhận; chưa browser/điện thoại thật QA. UI xem thử, chưa chốt khóa mới.

- 2026-11-02: Theo user, hai mũi tên Chế độ trước/tiếp theo Home mobile và nút Giải đấu Home mobile/laptop phát tiếng X qua data-ui-selection-sound chung, tôn trọng muted và không chồng tiếng tab. Giữ callback/chuyển trang/UI. Backup outputs/backups/home-x-sound-20261102. mobile-home + ui-checkbox-sound5/5 PASS; npm.cmd run build TypeScript/Vite PASS; dist index-Pj3YiMZv.js xác nhận marker; chưa nghe thử browser.

- 2026-11-02: Theo user, mọi vùng chờ tải dùng vòng xoay ở giữa, trừ màn đầu vào game. Thêm HovangLoadingOverlay tái dùng HovangDataSpinner hiện có, absolute/fixed không chiếm layout và pointer-events-none. Áp dụng lazy màn App/mở Tin nhắn Home+Chọn Bàn, Shop, tải/thao tác Tin nhắn, đăng nhập Guest/Google, tìm bàn/tạo bàn, chuẩn bị máy/thế, Lobby, xử lý năng lượng/thông báo/admin. Danh sách bàn/tỉnh/địa chỉ/lời mời vốn có spinner giữ nguyên. Không sửa EntryGate/GameLoadingScreen, không đổi nghiệp vụ. Backup outputs/backups/loading-spinner-20261102; rollback chỉ các file trong manifest backup, không đè thay đổi task khác. Kiểm thử loading-overlay/locked-room-ui/mobile-home6/6 PASS; TypeScript/Vite build PASS, dist kiểm overlay. Shop-page suite cũ không PASS: thiếu ResizeObserver trong jsdom, thử mock thấy assertion geometry cũ784px khác khung hiện1253px; đã trả test về nguyên trước task, không đổi UI để qua test. Chưa browser/thiết bị thật QA.

- 2026-11-02: Theo user, người mới vào phòng không nghe/nhận presentation kết quả cũ. Online useMoveSound chỉ đánh dấu đã theo dõi live khi phase playing; GamePage cùng gate cho hình chiếu bí. Không ngắt âm/bảng của người đã theo dõi. RoomService join có hàng chờ luôn đưa newcomer xuống view; fillQueuedVacancies đưa queued đủ năng lượng lên ghế trống theo thứ tự, join-queue mới không vượt hàng. Giữ queueBlocked/đang chơi/năng lượng/mật khẩu. Không hàng chờ vẫn lên ghế nếu đủ điều kiện. Backup outputs/backups/join-queue-silent-20261102. 55/55 targeted queue/audio/result/energy/locked PASS; kiểm lại suite queue3/3 PASS sau sửa fixture. Build TypeScript/Vite PASS, dist GamePage-i_sIPorJ.js cập nhật. Chưa browser/hai thiết bị QA; backend cần nạp mã mới, không restart/deploy.

- 2026-11-02: Theo user, khi chủ phòng bị chuyển xuống View trong luồng xoay hàng, quyền chủ chuyển cho đối thủ còn trên bàn trước khi chèn người mới; không giao cho người vừa lên. Theo dõi ownerId cả bàn thường (người vào đầu tiên), bàn khóa giữ quyền claim theo account. RoomSummary thêm ownerName lấy theo ownerId; RoomTableGrid laptop/mobile hiển thị ownerName thay playerNames[0] (fallback cho dữ liệu cũ), giữ tên/phòng gốc và hình học. Giữ điều kiện xoay hiện hành, gồm ngoại lệ chủ bàn khóa còn năng lượng giữ ghế; không tự thay đổi khi nào xuống View. Backup outputs/backups/room-owner-transfer-20261102. 35tests PASS/1skip legacy countdown; test mới gồm locked owner hết năng lượng thua→View, quyền và tên thuộc người thắng ở ghế thứ2, quyền cũ bị chặn. Đã chạy baseline backup xác nhận test countdown cũ21/20 vẫn fail. Build TypeScript/Vite PASS, dist cập nhật; chưa browser/hai thiết bị QA. Backend cần nạp mã mới; không restart/deploy.

- 2026-11-02: Theo user, bỏ quảng cáo demo và giữ điểm phát để nối quảng cáo thật sau. Home bỏ nhánhDEV/state/markup MockInterstitialAd, xóa component demo và test countdown riêng. Mọi môi trường dùng cùng homeInterstitial.request() tại vị trí return Home; giữ takeOnlineAdOffer chống lặp, tích lũy2ván/điều kiện rời online, rewarded provider và cờ H5false. Chưa có quảng cáo thật thì fail-open không chặn Home/không nhận thưởng. Backup outputs/backups/remove-demo-ads-20261102; phục hồi đúng4file nếu cần.6suite ads32/32 PASS, npm.cmd run build TypeScript/Vite PASS, dist không chứa demo. Chưa browser/SDKthật QA; không bật quảng cáo thật/deploy.

- 2026-11-02: Theo user, bổ sung placement Xem quảng cáo30s sau này. ENERGY_REWARDED_AD_PLACEMENT energy_watch_ad/requestedDurationSeconds30 truyền vào RewardedAdProvider.show; cả Xem video trong Năng lượng và EnergyNotice gọi rewardedAds chung. Provider hiện null: không demo/countdown giả/không tự cấp năng lượng; unavailable/error giữ thông báo cũ. SDK thật sau này phải hỗ trợ creative30s; đây là thời lượng yêu cầu, không timer ép ngắt quảng cáo hoặc bằng chứng cấp thưởng. Interstitial returnHome giữ riêng. Backup outputs/backups/rewarded-ad-placement-20261102. rewardedAds+adsHomeIntegration10/10 PASS; TypeScript/Vite build PASS, dist có placement. Chưa SDK/browser thật QA.

- 2026-11-02: Theo user đổi nhãn HOANGBBCG→HOVANG ở sông bàn cờ và nền trống Tin nhắn, chung laptop/mobile; đồng bộ renderer screenshot worker cũ và tài liệu nguồn asset. Giữ font/cỡ/vị trí/màu. Backup outputs/backups/hovang-label-20261102. npm.cmd run build TypeScript/Vite PASS; dist GamePage-Cd1iuuOs.js/MessagesDialog-DdalG7_j.js có HOVANG; rg xác nhận src/dist không còn HOANGBBCG. Chưa browser QA.

- 2026-11-02: Theo user, nút điều khiển Xem lại/Đánh thử dùng tiếng X qua data-ui-selection-sound ở ArtworkButton và ToolArtworkButton: lùi/tiến, Máy đi, Phân tích, Gợi ý, reset, Phát/Tạm dừng; thêm Thử lại cùng cụm. Nút chuyển Xem lại/Đánh thử vốn có marker giữ nguyên. Dùng listener chung/tôn trọng muted, không đổi UI/callback hoặc tiếng đi quân. Backup outputs/backups/replay-x-sound-20261102.
- Kiểm chứng replay-X: replay-playback/ui-checkbox-sound6/6 PASS; npm.cmd run build TypeScript/Vite PASS; dist GamePage có marker chung mới. Chưa nghe thử browser.

- 2026-11-02: Theo ảnh user, Đã chơi Lịch sử chỉ hiện ván finished có winner (thắng/thua), bỏ Đang đấu và ván hòa khỏi danh sách này; dùng filter chung HistoryDialog laptop/mobile. Không xóa dữ liệu/đổi API/ghi ván hoặc Đã lưu; kết thúc có winner tự xuất hiện theo store. Thay quy tắc hiển thị playing trong Đã chơi2026-10-27, giữ Đã lưu cũ. Backup outputs/backups/history-finished-only-20261102. Hai regression mới laptop/mobile PASS (ẩn playing/draw, hiện completed, reactive khi finished); build TypeScript/Vite PASS, dist cập nhật. Full saved-match-history16ca:6PASS/10FAIL (các ca cũ query/hold/dialog), không tuyên bố toàn suite PASS; chưa browser QA.

- 2026-11-02: Theo user, làm lại MatchIntro đối đầu: Elo cao dải cam trên/đi từ trái, thấp dải xanh dưới/đi từ phải, bằngElo Đỏ trên; avatar+viền+tên vàElo lấy useDatabaseProfile theo userId/variant như PlayerCard, khóa snapshot thứ tự lúc intro hiện. SVG hai kiếm giữa, WAAPI1300ms giữ clock/âm/luật:24%vào nhanh,24–65%trôi chậm(-16→16),65–82%bay tiếp vàmờ1→0 trong50px(16→66), cuối bay khỏi khung. Backdrop blur/nền tối, responsive cả viewport, reduced-motion giữ hình tĩnh. Chỉ geometry avatar trong hiệu ứng mới được sửa theo quyền user; PlayerCard/avatar nơi khác giữ. Backup outputs/backups/match-intro-versus-20261102. match-intro-versus+room-entrance4/4PASS, TypeScript/Vite buildPASS, dist GamePage kiểm mới; chưa browser/motion thật QA. UI xem thử, không chốt khóa mới.

- 2026-11-02: Theo user, khi người cuối cùng trong hai ghế rời phòng, nếu không có queued đủ năng lượng lấp ghế thì tự đưa viewer vào sớm nhất đủ năng lượng lên bàn dù queued=false, giao ownerId và RoomSummary.ownerName theo người đó. Không tự kéo viewer thường lên khi vẫn còn một người trên ghế. Giữ ưu tiên hàng chờ/energy/mật khẩu, áp dụng bàn thường/khóa. RoomService lưu thứ tự lần vào View trong RAM độc lập thứ tự vào/rời hàng; người bị xuống View nhận thứ tự mới. Backup outputs/backups/earliest-viewer-owner-20261102. 29/29 queue/energy/locked PASS gồm bàn thường/khóa, giữ userId, đổi tên và queue-toggle không làm mất ưu tiên đến sớm; TypeScript/Vite build PASS, dist cập nhật; chưa browser/hai thiết bị QA, không restart/deploy. Backend cần nạp mã mới.

- 2026-11-02: Theo user, kết thúc ván nếu đúng2người đã đấu vẫn giữ ghế, sau tối thiểu5s và cả2ACK hoàn tất presentation thì tự chuẩn bị ván kế/hiện đếm30ngay (không thêm1s chờ); 30s sau tự bắt đầu nếu đủ điều kiện, cả2Ready vẫn bắt đầu ngay. Server rematchWaits khóa archiveID+cặpID, ACK chỉ nhận người ngồi/đúngván; không dùng5s để đoán audio, phải chờ callback ACK. Hàng chờ cần xoay giữ ưu tiên+gate cũ; chủ bàn khóa giữ ghế cũng đếm lại. Rời ghế/đổi ván/xóa phòng dọn rematchWaits; giữ archive tới ván mới. Backup outputs/backups/rematch-countdown-20261102. 30/30 rematch/ready/energy/queue PASS, sau cleanup test lại5/5 rematch PASS; npm.cmd run build TypeScript/Vite PASS, dist cập nhật, diff-check PASS. Chưa browser/hai thiết bị QA; backend cần nạp mã mới, không restart/deploy.

- 2026-11-02: User báo không thấy đếm sau ván. Sửa hai chỗ: server không chặn HIỂN THỊ đếm bằng2ACK nữa; sau5s finished hiển thị30→0 và giữ nguyên bàn/kết quả. Chỉ tự bắt đầu ván tiếp khi hết30s+2ACK audio/hình thật+canStart, không cắt presentation. readyCountdownForPlayer cho phép phasefinished (chỉ ghế chưaReady), MatchResultDialog nhận số đếm và hiện ngay trong top-layer popup để không bị popup che. Thay cơ chế reset sang ready sau5s của task trước; hàng chờ/thay ghế vẫn ưu tiên. Backup outputs/backups/rematch-visible-countdown-20261102. Lượt1:31/31 rematch/audio-countdown/visibility/result PASS; sau thêm regression popup và nối helper27/27 rematch+result PASS. Build TypeScript/Vite PASS; dist kiểm nhãn đếm mới, diff-check PASS. Chưa browser/hai thiết bị QA; đọc process backend qua CIM bị hạn chế nên chưa xác nhận runtime đã nạp bản mới; không restart/deploy.

- 2026-11-10 cập nhật quy tắc 2026-11-02: Sau ván, nếu cả hai ghế của bàn KHÔNG KHÓA cùng hết năng lượng, sau thời gian trình diễn kết quả hiện có đưa cả hai ra khỏi phòng và báo hết năng lượng. Ưu tiên queued đủ năng lượng theo FIFO, rồi viewer thường đủ năng lượng theo thứ tự vào View lên thay (tối đa hai); có người thay thì giữ phòng/giao chủ mới, không có thì đóng/xóa phòng (viewer còn lại cũng hết năng lượng được đưa ra/báo). Không đẩy xuống giữa ván. Nếu chỉ một người hết năng lượng hoặc bàn khóa, giữ luật xuống View queued=false; chủ bàn khóa hết năng lượng vẫn giữ ghế. Không thay luật miễn năng lượng vô hạn/bạn bè hoặc giao dịch kết quả.
- Sửa nguyên nhân đếm lại không chạy với persistence thật: RoomPersistence.observe đổi lastCompletedMatch.id sang UUID DB khi recordCompletion. captureCompletedMatch phải tạo rematchWaits SAU observer để giữ đúng ID cuối; trước đây test RAM không tái hiện. Thêm regression observer đổi ID và test2socket thật xác nhận cả2nhận30→29 qua room:state/helperUI. Người hết năng lượng không hàng chờ xuống sau5s trình diễn; sau xoay có người khác hết năng lượng vẫn dọn ghế dù hết hàng, giữ lockedowner. Backup outputs/backups/persisted-rematch-energy-20261102. Final32/32 rematch/energy/queue/presentation PASS; socket1/1 PASS ngoài sandbox (localhost tạm, không DB thật). Build TypeScript/Vite PASS, dist cập nhật/diff-check PASS. Chưa browser2thiết bị/MySQL thật QA; không có listener local3001/5173 ở lần kiểm tra; không restart/deploy máy chủ người dùng.

- 2026-11-02: User yêu cầu intro giữa chậm hơn, dải thấp hơn, blur nền nhẹ và không chạy clock trong hiệu ứng. MATCH_INTRO_MS1300→2600 dùng chung hook/startGame local/RoomService; server vẫn authoritative, chặn move và không trừ tổng/lượt trước lastClockUpdate. Dải vào12%, giữa12–74%(~1612ms), mờ50px đến90%, thoát100%; cao cụm clamp210/38vh/300 thay260/52vh/400, avatar56–88 thay64–112 riêng intro. Nền tối30%/blur4px. GameSounds delay tick theo token chung (policy tick vẫn tắt). Đồng bộ fixture thời gian intro về token, không đổi assertion nghiệp vụ cũ. Backup outputs/backups/slower-match-intro-20261102. Final6suite35/35PASS gồm engine/server không trừgiờ/chặnmove vàhook giữa>1500ms/cònhiện ở1300ms. Build TypeScript/Vite đãPASS, đang chờ postbuild tối ưu ảnh kết thúc; chưa browser2thiết bị QA. Backend cần nạp mã mới để áp dụng2600ms online, không restart/deploy.

- Kiểm chứng cuối slower-intro: npm.cmd run build hoàn tất exit0 gồm cả2postbuild ảnh; dist có kích thước/blur intro mới.35/35targetedPASS.

- 2026-11-02: Hai tài khoản có quan hệ bạn bè accepted lúc bắt đầu ván được miễn trừ năng lượng cho cả hai. Backend kiểm tra friendship trong transaction bắt đầu; không ghi debit/ledger năng lượng, không cấp thêm số dư. Chỉ quan hệ accepted, không miễn riêng vì có lời mời. Elo/stat/kết quả và chính sách không thưởng vàng khi đấu bạn bè giữ nguyên. Cặp ngồi đúng bàn được server xác nhận có thể Sẵn sàng ở0năng lượng; người lạ và thao tác chưa xác định đối thủ giữ kiểm tra năng lượng hiện hành.
- Triển khai: MatchRepository.start query friendship trước gate balance và bỏ cả UPDATE/ledger khi accepted; MatchRepository.areFriends/RoomPersistence.prepareStarts xác nhận cặp socketID vào friendEnergyExemptPair. RoomRepository.hasEnergy nhận context phòng để miễn đúng cặp, RoomService dùng cho ghế/Ready/sau ván; controller chuẩn bị cặp trước join/Ready/tick và client Ready đọc flag server. Không miễn toàn tài khoản, thay đối thủ làm flag vô hiệu; transaction vẫn recheck quan hệ thật. Không migration/UI geometry. Backup outputs/backups/friend-match-energy-20261102. Final42/42 match-gold-policy/room-persistence-energy/energy-room-policy/rematch/lobby-energy PASS (friend0/5 khôngdebit, bìnhthường debit1mỗi/người, lời mời không tựmiễn, stranger0bịchặn, miễnđúngcặp/chốngstale, joinfriend0→Ready→sauván). Suite match-like-persistence mở rộng có1fail cũ thiếu accounts.profile trong mock; đã chạy source RoomPersistence backup vẫn cùng1fail/5PASS, không đổi test ngoài scope. Chưa MySQL thật/browser2thiếtbị QA; không giao dịch dữ liệu user, không restart/deploy.
- Kiểm chứng cuối friend-energy:42/42 targeted PASS; npm.cmd run build chạy đơn bằng cmd.exe hoàn tất EXIT0, gồm TypeScript/Vite và cả2bước WebP postbuild (finalpass APPLIED). dist GamePage-3oT8x2C9.js xác nhận friendEnergyExemptPair; diff-check file sửa PASS. Chưa MySQL thật/browserQA; backend cần nạp mã mới, không restart/deploy.

- 2026-11-02: Người đã Sẵn sàng vẫn nhìn thấy số đếm giữa bàn như ghế chưa Sẵn sàng; viewer tiếp tục không nhận số đếm. Cả2Ready vẫn bắt đầu ngay theo server. Dùng ReadyCountdownBadge chung cho Board và popup kết quả: khung nâu gradient/viền vàng, iconđồnghồ+nhãn, số tabular;5giâycuối cam, co theo scale laptop/mobile. Giữ vị trí neo phía trên nút Ready, không đổi deadline/gameplay/audio.
- Backup outputs/backups/countdown-badge-ready-visible-20261102. 33/33 countdownaudio/visibility/matchresult/rematch PASS (Ready vẫn hiện,viewer ẩn,đếm biến mất khi playing,popup đổi sốreactive). Đây là UI xem thử theo yêu cầu, không khóa thiết kế mới. Chưa browser/điện thoại thật QA.

- 2026-11-02: Theo mẫu user, MatchIntro thay2kiếmSVG bằng3lớpPNG1254² nềnalpha: emblem(khiên+vòng+lá), sword-left/sword-right; built-in image_gen edit ảnh thamchiếu, táidựng phần che. Asset/prompt/source/reference tại src/assets/match-intro. Huyhiệu translateZ360→0/scale bounce như đậpvào;2kiếm độc lập trượt chéo từ gần±36px, vào nhanh300ms rồichậm1000ms, thoátngắn/mờ. Thêm2tamgiác hướng vào giữa ở2đầu mỗi dải. MATCH_INTRO_MS2600→2000 chia300vào+1000giữa, chung server/local/tick/audio; clockvàmove vẫnchờtoken. DảiElo/avatar/viền/tên/cam-xanh/blur giữ. Backup outputs/backups/match-intro-layered-20261102.6suite35/35PASS (giữa1s, Z, kiếmnear36, alphaảnhkiểmtrựcquan, clockserver/engine); build đangchờ2postbuild tốiưuảnh, TypeScript/Vite xong. Chưa browsermotion/2thiếtbịQA; backend cần nạpmã2s, khôngrestart/deploy.

- Kiểm chứng cuối layered-intro: build delivery hoàn tất EXIT0 gồm TypeScript/Vite và cả2postbuild (finalpass237WebP/APPLIED). dist có GamePage mới và3asset emblem/sword-left/sword-right;35/35targetedPASS. Lượtbuild đầuENOENT không được tínhPASS; giữ logdelivery làm bằngchứng.

- 2026-11-03: Nút Xuống bàn dùng ảnh user cung cấp tại assets/room-users/stand-up.png, hiển thị đúng vị trí điều khiển hàng chờ cho ghế online cả laptop/mobile; chỉ hiện khi đủ hai ghế đang có người ngồi và chỉ người đang ngồi thấy. Nếu chỉ còn một người, người đó không thể xuống bàn; server từ chối lệnh tương ứng. View giữ Xếp hàng/Thoát hàng. Bấm xuống View queued=false nhưng không rời phòng/socket. Đang playing thì xử thua theo luật rời ghế (result leave), ghi kết quả server trước đổi ghế; sau ván không tạo kết quả lần nữa. Ghế trống ưu tiên queued đủ năng lượng, chủ cũ xuống View chuyển quyền cho người còn trên bàn trước người mới lên. Tự xuống một mình không tự kéo chính mình lên lại. Replay/máy/demo không có nút.
- RoomCommand thêm stand-up; RoomService xác thực actor đang ngồi, dọn clock/offer/repetition/readiness cũ, giữ userId khi chuyển viewer và idempotency qua pipeline command cũ. useGame.standUp nối UI; RoomStandUpButton tiếng X dùng ảnh PNGalpha2048×686 nguyên bản (không imagegen/cắt/vẽ lại). RoomUsersPanel ưu tiên onStandUp trước queue, GamePage gate theo player cả panel mobile/desktop và footerdesktop. Backup outputs/backups/stand-up-button-20261103. 23/23 stand-up/room-users-panel/queue/rematch PASS; TypeScriptcheck PASS. Chưa browser/2thiếtbịQA; backend cần nạp mã mới, không restart/deploy.
- 2026-11-03: Đính chính presentation sau ván theo yêu cầu user: khi bất kỳ người chơi nào bấm Sẵn sàng giữa hai ván, ẩn ngay kết quả Thắng/Thua và dừng âm thanh kết quả trên cả hai client; ACK completion vẫn gửi để không kẹt rematch. Không dùng ready=true còn sót trong phase playing để hủy kết quả/chiếu bí. Clock laptop luôn hiện hai phía từ lúc vào phòng, gồm ghế trống; trước ván đứng yên, chỉ game phase playing mới dùng đồng hồ server đếm. Khi Ready giữa ván, presentation hoàn tất hoặc popup đóng, hay đổi người ở ghế sau ván, đồng hồ trình bày trở về thời gian cấu hình; khi ván mới chơi dùng remainingTime authoritative. Mobile giữ UI hiện hữu. Backup outputs/backups/result-ready-clocks-20261103. 50/50 targeted PASS; typecheck PASS; build/browser/two-client QA đang xác minh/chưa xác nhận. Không thay clock server, archive, Elo/thưởng.

- 2026-11-03: Theo user, bảng Thắng/Thua là lớp nổi không modal đặt giữa viewport, không backdrop làm mờ, không chiếm chỗ layout và thao tác ngoài bảng vẫn xuyên qua; giữ nội dung, timer, reward, nút xác nhận/đóng và luồng presentation/audio. MatchResultDialog dùng dialog.show(), fixed inset, wrapper bắt pointer riêng trên artwork. 29/29 match-result/rematch-countdown PASS; TypeScript PASS; chưa browser QA.

- 2026-11-03: Theo user, số đếm rematch30 giây phía trên popup kết quả chỉ còn chữ số lớn màu vàng cam, bóng sáng nhẹ; bỏ khung/nền/viền/nhãn/icon, không đổi lớp nổi/vị trí/nhịp hoặc logic đếm/tự bắt đầu. ReadyCountdownBadge result branch riêng; countdown Ready giữa bàn giữ giao diện chốt2026-11-02. Backup outputs/backups/countdown-number-only-20261103. match-result+ready-countdown-visibility23/23 PASS; typecheck PASS; build/browser QA pending. Không đổi server/deadline/gameplay.
- 2026-11-03: Theo user, số đếm giữ neo Board khi bảng kết quả xuất hiện; GamePage không dựng số đếm riêng trên popup. Ghế trống giữ geometry PlayerCard bằng visibility, clock vẫn visible tại cùng vị trí dưới identity; không sửa thời gian server.
`n- 2026-11-03: Sửa phạm vi countdown theo phản hồi user: Board cũng phải chỉ có số, không khung/nhãn/icon. Dùng chung markup number-only mọi nơi; thay ghi chú giữ badge Ready trước đó.
- 2026-11-03: Xuống bàn khi playing phải hỏi Hủy/Đồng ý bằng khung xác nhận chung; chỉ Đồng ý gửi stand-up. Tự đóng khi phase/phòng/ghế thay đổi, xác nhận kiểm tra lại đủ hai người. Ngoài ván xuống trực tiếp. Không dừng clock.

- 2026-11-03: Menu ba gạch thêm Tin nhắn/Chia sẻ bàn online. Chia sẻ mở MessagesDialog với tab Bạn bè (accepted)/Nhóm, chọn người/nhóm chuẩn bị nội dung mời, người dùng bấm Gửi qua API hiện hữu. Tin mời hiển thị nút bấm vào bàn qua roomSocket.join; đang ở bàn khác yêu cầu rời trước, lỗi phòng/khóa theo server. Không gửi mật khẩu. Backup outputs/backups/game-message-share-20261103. Typecheck PASS trước bổ sung contacts; build đang xác minh, chưa browser/two-client QA.

- Kiểm chứng game-message-share: typecheck PASS; npm.cmd run build hoàn tất exit0 gồm tối ưu WebP, dist cập nhật. Chưa browser/hai tài khoản QA; không deploy/server/DB changes.

- 2026-11-03: Đính chính chia sẻ: tab Cá nhân gồm hội thoại 1-1 kể cả chưa kết bạn; bỏ điều kiện accepted trong filter. Nhóm chỉ nhóm. Giữ bạn bè chưa có hội thoại có thể chọn gửi.

- 2026-11-03: Tin chia sẻ bàn dùng snapshot JSON HOVANG_SHARE trong body hiện có: tên hai ghế và viewerCount chốt ngay lúc Gửi, không subscribe cập nhật. RoomShareCard có gold optional để nối dữ liệu sau, hiện không cấp giá trị vàng. Parse kiểm schema, tương thích marker cũ; join lỗi phòng không tồn tại hiện thông báo tương ứng. Backup outputs/backups/share-room-card-20261103. Typecheck PASS, chưa browser/hai tài khoản QA.

- 2026-11-03: Thẻ chia sẻ dạng đối đầu: Elo cao trái viền cam, thấp phải viền xanh; avatar ở mép ngoài dùng AccountAvatar và AvatarRankBadge (danh hiệu/sao), tên/Elo bên cạnh. Giữa dùng emblem+2swords của MatchIntro; View style/icon của bàn ở trên, bấm qua bubble vào phòng. Viewer snapshot giữ nguyên. Hồ sơ/Elo theo useDatabaseProfile và variant, mặc định1000 khi chưa có profile; tin cũ tương thích. Backup outputs/backups/share-card-versus-20261103. Typecheck PASS trước bổ sung variant; chưa browser QA.

- 2026-11-03: Theo ảnh mẫu user, thẻ chia sẻ thành banner đối đầu: dải cam/xanh phát sáng bo về tâm, avatar lớn ở hai mép ngoài, tên/Elo trên dải, AccountAvatar+AvatarRankBadge thật (gồm sao), emblem/hai kiếm giữa. Nút View bàn giữ ở trên; tỷ lệ dùng container query co theo card. Chỉ scope RoomShareCard, không đổi avatar nơi khác. Backup outputs/backups/share-card-reference-20261103. Chưa browser QA.
- 2026-11-03: Khai cuộc theo user: nền phủ30%→55%, góc hai dải cam/xanh20px→4px; mobile avatar20vw (72–96px), khung cao300–380px để chứa danh hiệu/sao AvatarRankBadge theo Elo hồ sơ thật. Thứ tự dải giữ theo lúc mở, dữ liệu hồ sơ tiếp tục cập nhật khi tải xong; chưa có hồ sơ thì không hiển thị avatar/rank demo, Elo hiện …. Không đổi thời lượng/gameplay/audio. TypeScript PASS; chưa browser/device QA. Backup outputs/backups/match-intro-mobile-20261103.

- 2026-11-03: Theo user, thu thẻ chia sẻ riêng laptop từ min(680px,68vw) xuống min(340px,26vw), max-width100%, bỏ min-width desktop; nội dung cqw co đồng bộ, mobile giữ nguyên. Backup RoomShareCard-before-laptop-size.tsx.

- 2026-11-03: Thẻ chia sẻ laptop mở rộng theo chiều ngang vùng tin nhắn (flex1/min-width0/max-width100%), card width100% box-border và cqw đồng scale. Bỏ bubble nền vàng/viền/padding/đuôi riêng với room-share, tin thường giữ cũ. Backup outputs/backups/share-card-wide-20261103. Chưa browser QA.
- 2026-11-03: Theo user, khung khai cuộc cam/xanh bay quá tâm6% viewport rồi trôi chậm thêm2.5% từ20–62% timeline; sau đó tăng tốc lướt khỏi màn và mờ hết ở80%. Giữ MATCH_INTRO_MS/gameplay/audio. Backup outputs/backups/intro-fly-timing-20261103. TypeScript PASS, chưa browser QA.

- 2026-11-03: Thu thẻ share laptop xuống88% và max calc(100%-64px) để chừa avatar/tên sender riêng; shared group dùng sender metadata thay avatar nhóm. View chốt lúc Gửi bằng Set IDs players+viewers như GamePage, không chỉ viewers. Tin cũ giữ snapshot cũ. Backup outputs/backups/share-card-sender-view-20261103. Chưa browser QA.

- 2026-11-03: User chốt mọi dữ liệu thẻ share là snapshot lúc Gửi. createRoomShare async lấy profile theo userId, lưu tuple tên/Elo/avatarCode/frameCode + variant/View trong body; renderer không gọi useDatabaseProfile nữa, rank/sao từ Elo frozen. Thiếu profile báo lỗi, không gửi dữ liệu giả; View chốt trước await. Tin cũ thiếu snapshot không thể hồi phục hồ sơ lịch sử. Backup outputs/backups/share-frozen-profile-20261103. Typecheck PASS, chưa browser QA.

- 2026-11-03: Avatar sender tin chia sẻ outgoing đặt bên phải bằng order-last, incoming giữ bên trái; bỏ nhãn tên dưới avatar, cùng size/căn giữa/gap hàng tin nhắn hiện có. Backup outputs/backups/share-sender-alignment-20261103. Chưa browser QA.

- 2026-11-03: Link room-share: cùng phòng báo Đang trong phòng hiện tại; participant playing chặn đổi phòng. Ngoài ván/viewer được leave rồi join mặc định, giữ server FIFO queued trước newcomer/ghế đầy vào View. PlayerCard giữ tên hidden của ghế vừa trống để không đổi height hàng Elo neo đồng hồ mobile; không đổi avatar geometry. Backup outputs/backups/share-navigation-clock-20261103. Chưa browser/hai client QA.

- Bổ sung server join: fillQueuedVacancies trước khi xét vai trò newcomer, để FIFO lên trước rồi newcomer nhận ghế còn lại. 6/6 queue PASS sau sửa, typecheck PASS; full frontend build exit0. Chưa browser/mobile/hai client QA; backend cần nạp mã mới, không restart/deploy.

- 2026-11-03: Elo room-share lấy profile API mới cho cả chính mình (/me) thay account cache; lấy đúng variant và bỏ fallback1000 cho ghế có người. Thiếu stat báo lỗi không gửi. Snapshot giữ nguyên sau gửi, không sửa tin cũ. Backup outputs/backups/share-real-elo-20261103.

- 2026-11-03: RoomShareCard tên đổi font-body semibold dễ đọc; ghế snapshot Chờ người chơi không dựng avatar/Elo/rank giả, giữ khoảng trống và hình chiến đấu giữa. Hai ghế có người vẫn hiện đủ. Backup outputs/backups/share-name-empty-seat-20261103.
- 2026-11-03: Theo user, clock laptop dưới Elo: bỏ translateY(-23px) trên clock PlayerCard, giữ margin-top12px để không che Elo. Mobile giữ nguyên. Backup outputs/backups/laptop-clock-below-elo-20261103. Chưa browser QA.

- 2026-11-03: Thông báo thao tác room-share (cùng phòng, đang đấu, phòng mất/lỗi join) dùng sentNotice.show chung: giữa màn hình, bay lên và tự mất1300ms, thay databaseError ở đáy. Backup outputs/backups/share-floating-notice-20261103.

- 2026-11-03: Sửa share Elo lỗi thiếu GameState.variant (optional): mặc định xiangqi trước tra stats, không thay Elo giả. Tất cả databaseError MessagesDialog chuyển sentNotice nổi bay lên; giữ ẩn lỗi tải inbox theo quy tắc cũ, bỏ alert đáy. Backup outputs/backups/message-notice-elo-fix-20261103.
- 2026-11-03: Theo user, margin-top đồng hồ laptop giảm12→5px để gần Elo hơn; mobile giữ nguyên.

- 2026-11-03: GameTools Tin nhắn có badge đỏ unread dùng useUnreadMessageCount chung Home (cùng query/poll4s), ẩn0/max99+. View room-share mobile cao36px/min-width48px/icon28×21, laptop giữ nguyên. Backup outputs/backups/game-unread-mobile-view-20261103.

- 2026-11-03: Theo user, giảm chiều cao View room-share mobile36→28px, ngang giữ48px.
- 2026-11-03: Theo user, trong luồng Chia sẻ bàn nếu draft khác nguyên dòng Mời vào bàn: HOVANG_ROOM:<roomId> thì hiện Link gửi không đúng, return trước tạo snapshot/API/sendImage và không xóa draft. Áp dụng chung laptop/mobile, cá nhân/nhóm. TypeScript PASS; chưa browser QA. Backup outputs/backups/share-invalid-draft-20261103.

- 2026-11-03: View share mobile cao26px/paddingY0, mắt30×23px; padding đáy card42px cân khoảng trên gồm View, desktop giữ nguyên.

- 2026-11-03: View share mobile mắt28×21px, số18px, padding dưới35px (giảm7px) theo user.

- 2026-11-03: View share mobile mắt26×20px/số17px, padding đáy28px (giảm thêm7px) theo user.

- 2026-11-03: Room-share mobile mắt24×18px/số15px, tên3.8cqw/Elo3.4cqw; desktop giữ nguyên. Backup RoomShareCard-before-mobile-text-boost.tsx.

- 2026-11-03: Theo ảnh user, room-share mobile tăng68→74vw, View23px/min42/mắt22×16/số14. Ẩn riêng avatar sender outgoing ngoài thẻ ở compact; avatar hai người bên trong snapshot giữ nguyên. Desktop giữ. Backup outputs/backups/share-mobile-view-width-20261103.

- 2026-11-03: Theo user, nới room-share mobile78vw/laptop92%, gap2users10cqw; đáy giảm10px mobile18/desktop2px. Snapshot mới ordered=true, người gửi đang ngồi luôn ở cam/trái, đối thủ xanh/phải; sender viewer thì Elo cao trái. Không sort lại theo người xem tin, tin cũ giữ Elo-order. Backup outputs/backups/share-sender-orange-spacing-20261103.

- 2026-11-03: Share laptop đáy9px (+7), ẩn outgoing sender avatar ngoài thẻ cả2bản. Nếu chỉ1ghế có người luôn đưa occupied sang trái kể cả tin snapshot cũ. Mobile81vw, gap2bên7cqw/avatar-text1.5cqw. Backup outputs/backups/share-final-spacing-20261103.

- 2026-11-03: Theo user, room-share laptop padding đáy19px (+10), tên mobile3.6cqw (thu nhẹ từ3.8).

- 2026-11-03: Room-share laptop tên3.8cqw/Elo3.4cqw theo user; mobile giữ nguyên.

- 2026-11-03: Thu tên laptop room-share3.8→3.5cqw; Elo/mobile giữ nguyên.

- 2026-11-03: Chủ bàn khóa demote/kick người ngồi thì reset ghế rồi fillQueuedVacancies để queued FIFO đủ năng lượng lên ngay, giữ queueBlocked và chặn demote giữa ván. Demoted View queued=false giữ userId. Backup outputs/backups/locked-demote-queue-20261103.

- 2026-11-03: Đính chính user: moderation demote/kick ghế chờ1000ms server monotonic rồi tick fill FIFO; chặn fill/join ghế bypass trong thời gian chờ. Backup outputs/backups/locked-demote-delay-20261103.
- 2026-11-03: User báo toàn UI laptop màn lớn giật, nhất là đi quân/hiệu ứng. Board PieceView memo so sánh dữ liệu quân/path thay reference để clock snapshot không render lại quân đứng yên; lớp chọn quân có will-change khi active, khung/kiếm intro chuẩn bị compositor và dọn khi đóng. Không đổi asset/geometry/timing/gameplay. TypeScript PASS. Chưa profile FPS/GPU trên máy gặp lỗi, không xác nhận hết giật. Backup outputs/backups/board-render-performance-20261103.
- 2026-11-03: Người nhận lời mời Mời chơi/So tài từ chủ phòng khóa được vào không nhập mật khẩu; server xác nhận inviter hiện vẫn owner khi accept. Join thường/lời mời không phải chủ vẫn kiểm mật khẩu, không gửi password client và không đổi queue/ghế. tests/challenge15/15 PASS. Backup outputs/backups/owner-invite-password-20261103. Chưa socket/browser QA, backend cần nạp mã mới.

- 2026-11-03: User yêu cầu phone portrait: Android MainActivity manifest screenOrientation portrait; web usePhonePortrait thử ScreenOrientation lock trên phone khi mở/fullscreen/đổi hướng. Browser có thể từ chối, không thể bảo đảm khóa xoay tab thường. Không build/install APK tự động. Backup outputs/backups/phone-portrait-20261103.
- 2026-11-03: Chọn địa chỉ chỉ hiển thị Việt Nam, giữ tỉnh/xã thật. Bấm Lưu địa chỉ mở xác nhận chung Hủy/Đồng ý, hiện địa chỉ và cảnh báo chỉ lưu một lần; chỉ Đồng ý gọi onSave, Hủy giữ lựa chọn. Chung laptop/mobile. TypeScript PASS; chưa browser/API QA. Backup outputs/backups/address-vn-confirm-20261103.

- 2026-11-03: Bản web thêm manifest PWA display standalone + orientation portrait và link manifest trong index. Kết hợp ScreenOrientation hook. Khóa chắc khi cài như app trên browser hỗ trợ; tab web thường không thể cưỡng chế do quyền trình duyệt. Backup outputs/backups/web-portrait-lock-20261103. Typecheck/build pending.
- 2026-11-03: Ba tab Chuỗi Chiến Thắng/Tổng Ván Chơi/Online Chuyên Cần trong catalog Danh hiệu hiện liệt kê toàn bộ danh hiệu catalog; sở hữu giữ giao diện chọn, chưa sở hữu phủ khóa qua renderer hiện hữu. Tab Tất cả và hai nhóm đầu tiếp tục chỉ hiện danh hiệu đã sở hữu. TypeScript PASS; chưa browser QA. Backup outputs/backups/locked-honor-catalog-20261103.
- 2026-11-03: Theo user, trong tùy chỉnh avatar laptop, tab Skin/Hiệu ứng giữ khung nội dung viền/nền và hiện trạng thái trống giống mobile: Chưa có skin/Chưa có hiệu ứng. Không đổi avatar/khung/tab khác. TypeScript PASS, chưa browser QA. Backup outputs/backups/skin-effect-empty-laptop-20261103.

- 2026-11-03: User authorized official local PWA frontend deployment to hovanggame.com on 103.153.254.184 via cotuong_deploy. PASS: active release 0ffcc17feb69ee6d1d9d0de10676c661e27f55c5; old 7588c5553e5037b6578dff1c1d774cdda929fd46 retained. Only dist replaced, 11,908 non-dist entries identical; no DB/migration/backend/config edits. Existing activator succeeded; health/HTTPS/manifest/192+512 icon hashes verified from VPS and local. Rollback not required; Android install device QA not run. Report D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-deploy-20261103-135717\REPORT.md.


- 2026-11-03: User now requests a custom install INVITATION during entry loading only for Chrome Android with actual beforeinstallprompt. This supersedes earlier removal of custom promotion: white rounded Material style/light blue action, HOVANG disclosure, official unchanged logo/manifest; never imitate Chrome permission UI. Click Cho phép invokes native prompt directly; Để sau defers7days; standalone/installed/other browsers excluded, late event never opens UI during game. GameLoadingScreen sibling card + loadingInstall controller, restore error bypasses minimum loader. Backup/report D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-loading-20261103-141945\REPORT.md.16/16 targeted PASS, full build PASS, browser fixture360/390/430PASS. Production frontend release5316513562c2ab653ba349edddaf99edda561e97; old0ffcc17feb69ee6d1d9d0de10676c661e27f55c5 retained; health/HTTPS/PWA+entry asset hashesPASS, backend identical. Real Android device QA NOT TESTED; rollback not needed.


- 2026-11-03: User authorizes installed Android immersive PWA: manifest-android.webmanifest displayfullscreen selected by early hovang-pwa-platform.js; canonical desktop manifest URL stays standalone/byte-identical. Same id/scope/startURL/icons; no fullscreenAPI auto-call in Chrome tabs. viewport-fit=contain prioritizes cutout-safe board/controls, may reserve camera strip; no locked geometry changes. Loading invitation must recognize both standalone and fullscreen modes. Old Android WebAPK may need reinstall because manifest URL split; keep Chrome cookies/site data, use official Chrome installation menu; desktop reinstall unnecessary.27/27 targetedPASS, fullbuildEXIT0, replay UI viewport390x844/360x744/430x876PASS. Real Android bars/swipes/cutout/login QA NOT TESTED. Production frontend release1b9865e04412ef4dbe5406303879b79d4fcbb69d, old5316513562c2ab653ba349edddaf99edda561e97 retained;11909non-dist entries unchanged, HTTPShealth/hashPASS; no DB/backend/config edits, rollback not needed. Docs/PWA-IMMERSIVE.md; report D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-immersive-20261103-142638\REPORT.md.


- 2026-11-03: User supersedes prior loader-unmount behavior: when actual ChromeAndroid PWA invitation visible, keep Loading even after minimumtimer/account readiness. Later saves7days and releases; Allow calls prompt directly in click and waits for native completion/dismissal/errors. loadingInstall.getGateSnapshot tracks invitation/nativePending separately; EntryGate subscribes without blocking restore/data. No event/installed/standalone/fullscreen/desktop never waits; lateevents ignored, async completions invalidated after unmount/error, session settled prevents loops. Authentication routing unchanged (Home ifentry elseLogin), UI/logo/manifests/fullscreen/gameplay unchanged.39/39testsPASS, fullbuildEXIT0. Production frontend3a54ffce210ae53e292e57d589cf0f1513222851; old1b9865e04412ef4dbe5406303879b79d4fcbb69d retained;11909non-dist entries unchanged, HTTPShealth/hashPASS. Rollback not required; Android realnativeQA NOT TESTED. Docs/PWA-ENTRY-FLOW.md; report D:\Học\code\code games\Cờ Tướng\board-game\outputs\pwa-entry-gate-20261103-143847\REPORT.md.


- 2026-11-03: USER REPLACES native PWA installation/fullscreen promotion with WEBSITE SHORTCUT guidance. ChromeAndroid normalbrowser Loading offers Them loi tat HOVANG?, Materialwhite/officiallogo/HOVANGdisclosure. No beforeinstallprompt.prompt, nativeeventretention, userChoice/WebAPK/fakedownload/successclaim. Allow opens manualinstructions Chrome⋮->Cai dat va tao loi tat->Tao loi tat->Them; closealwaysavailable releasesLoading; Later andclose defer7days via hovang-shortcut-later-until. Noeventrequired; init/login/data unchanged, authroutingnormal; desktop/standalone/fullscreen/otherbrowsers bypass. OldPWAflagsleftunused; no storageclear. Androidmanifest displaybrowser (notfullscreen), sameURL/id/icons; desktopmanifeststandalone unchanged to protectlaptop, pushworker/iconsunchanged. Chrome canstilloffer manualInstall; websitecannotforce shortcut-only orconfirmcreated/convertoldapps. WEBSITE-SHORTCUT.md supersedes oldPWAentry/immersivedocs.32/32testsPASS/fullbuildPASS/browserfixture360/390PASS; realAndroid menu/iconQA NOT TESTED. Prode93561fded2c9dbd23575e021c77f2a24eb392b3; old3a54ffce210ae53e292e57d589cf0f1513222851 retained;HTTPShealth/hashPASS/11909non-distidentical; nobackendDBNginxchanges, rollbacknotneeded. Report D:\Học\code\code games\Cờ Tướng\board-game\outputs\website-shortcut-20261103-144924\REPORT.md.


- 2026-11-03: Theo user, bảng Nhận được ở local căn giữa màn hình: bỏ desktop translateY5dvh ở HomeRewardNotifications, dùng m-auto native dialog; mobile grid center giữ nguyên. Không đổi kích thước/luồng nhận thưởng. Backup outputs/backups/reward-center-20261103.

- 2026-10-28: CI/CD isolated VPS: giữ production workflow/deploy script không đổi; CI thêm Oxlint, `npm audit --audit-level=high`, Gitleaks SHA-pinned, helper/archive/activation rollback regression. Audit ban đầu phát hiện10 advisory trên semver hiện có; `npm audit fix` nâng bản vá tương thích, audit hiện0. Release packager đổi umask077→027, root archive mode2750 để runtime `cotuong_release` đọc được; validator từ chối secret/path traversal/symlink/quyền ghi và thiếu file. Deploy chỉ `workflow_dispatch` trên master, xác minh full SHA + push CI, Environment reviewer `vps-test`, host key cố định/đã pin, user `cotuong_deploy`, artifact checksum, no-arg root activation, không DDL/migration/public Nginx; rollback chỉ code. GitHub hiện PR#6 đã merge SHA28c76bcf và CI run40608977741 PASS; Environment reviewer hoangbbcg-cell/master/no admin bypass/self-review allowed. User chốt branch policy CI-only (0 approvals), squash auto-merge chính thức, không bypass; ruleset cần báo trước và chưa áp dụng tại checkpoint. VPS mới chỉ đọc xác nhận Node22.23.3/npm10.9.9, MySQL active, Nginx inactive/port80 closed; DB schema/env/unit/current chưa có và deploy SSH secrets chưa cấu hình. Kiểm chứng local: Vitest447 PASS/26 SKIP, build/typecheck PASS, audit0, artifact validator5/5, backup adapter25/25; deploy-user temp tests không chạy được trong Windows sandbox (ACL temp), Oxlint native bị Windows Application Control chặn, chờ CI Ubuntu. Không đổi VPS/DB/DNS/firewall/production.
- 2026-10-28: CD test VPS first-boot rules: deploy identity (`cotuong_deploy`) cannot traverse `/etc/cotuong`; only root activation validates `cotuong.env` owner `root:cotuong`, mode0640. Deployment client must never stat/read the protected env path. Install/enable `cotuong-test.service` before first release without starting it; allow missing `current`, but validate it strictly if present. First approved deployment alone creates `current` and restarts service. Preserve no-public-Nginx/manual-Environment gate; migrations remain outside workflow. Live: SSH CI key validated on 103.153.254.184, deploy sudo only fixed activation helper, GH Environment secrets set, MySQL confirms no `cotuong_stage`/app/migrator accounts, env/unit/current absent. Do not deploy until interactive sudo preparation and CD contract PR are complete.
- 2026-10-28: PR #8 (`027ab549`) merged by squash auto-merge after required `checks` and `Secret scan` passed; master push CI passed. First-boot bootstrap follow-up prepares `prepare-test-vps-first-boot.ps1` and its root Bash script: pinned admin SSH/host key, SHA verification, helper backup/update, empty cotuong_stage with DML-only app and DML+DDL migrator users, protected env files, systemd enabled but not started. No migration or deployment. Script requires interactive sudo; no output of generated credentials. CI gate remains manual vps-test reviewer and Deploy is not authorized.
- 2026-10-28: User reproduced PS5.1 SSH failure in bootstrap. Exact cause: PS5.1 legacy native argument passing removed the embedded quote around `UserKnownHostsFile="C:\Users\NHAT HOANG\.ssh\known_hosts"`; OpenSSH treated it as two paths. Earlier ssh -G/PS7 checks did not exercise this call path. Replace inline `-o` with temporary SSH config passed through `-F` to both ssh/scp; keep StrictHostKeyChecking yes and pinned ED25519 SHA256. `-Preflight` runs SSH identity/IP and read-only SCP of `/etc/hostname`. Recursively cleanup local staging with Force/Confirm false. Verify via exact PowerShell 5.1 preflight before bootstrap; no sudo/deploy in this fix task.
- 2026-10-28: User reproduced bootstrap exit127 after SSH/SCP/upload/checks passed. Root cause: wrapper used Windows `Join-Path $remoteDir` for Linux remote manifest/script paths; on Windows PowerShell it emitted `\home\...`, then interpolated that invalid path into the remote Bash command. Build remote paths with `"$remoteDir/name"` using literal `/`. `-Preflight` now passes `/etc/hostname` through Bash `$1` via the same ssh.exe argument-array mechanism and reads it without sudo or remote writes; preserve strict pinned host checking and exact staging cleanup.
- 2026-10-28: On the new VPS, SSH login umask is `0002`; SCP creates uploaded bundle files as `nhat_hoang:nhat_hoang` mode `0664`, so the root bootstrap correctly rejected group-write. Keep the root helper's `/022` rejection. Wrapper must validate all five uploaded regular files are owned by `nhat_hoang`, then chmod only those exact files (including manifest) to `0600` before checksum/syntax checks and before sudo. Root script independently validates owner/type/write bits on the script, helpers, unit and manifest. No VPS changes beyond an isolated diagnostic upload/stats and its exact-path cleanup; bootstrap itself still requires interactive sudo approval.
- 2026-10-28: VPS test preflight run40638408243 confirmed root helper `/usr/local/sbin/cotuong-deploy-activate` is intentionally `root:root`0750. Parent directories `/`, `/usr`, `/usr/local`, `/usr/local/sbin` are root:root0755 with no extended ACLs. `cotuong_deploy` cannot execute helper directly by design; the workflow's direct `test -x` was a false requirement because deploy invokes only the exact no-argument helper through `sudo -n`, and the preceding sudo listing check passed. Preserve 0750/least privilege; remove direct-execute assertion, retain owner/mode + exact sudo-rule check. No root permission change.
- 2026-10-28: User confirmed first-boot bootstrap completed for test VPS `103.153.254.184`, creating `cotuong_stage`, app/migrator accounts, protected env and `cotuong-test.service`; PR #15 merged and master CI PASS. Read-only workflow run `40640901804`: `validate-environment-gate` and `preflight` SUCCESS, and Environment approval completed. That run did not inspect MySQL grants/schema journal or protected env metadata, and no real backup/restore/migration/deploy was reported. Preserve the existing dirty `test-github-ci` checkout and independent untracked work; readiness work is isolated from fetched `origin/master`. Added a test-only backup restore validator: verifies root/mode0600 dump and SHA256 sidecar, restores into unique scratch schema, compares table count, checks applied journal when nonempty, accepts an empty pre-migration schema, then drops only scratch. CI regression uses mocked MySQL and never touches VPS/DB. Actual backup/restore, migrations and deployment remain unperformed; before migration use `cotuong_migrator`, then verify with `cotuong_app`. Health is liveness-only.
- 2026-10-28: Readiness audit found VPS test deployment instructions naming migrations 001–012 while migrationRepository.ts on master registers 001–010. Update the runbook to reference the registered migration set and record its current range; add a regression test preventing documentation drift. Never infer deployed schema state from this code list; inspect the actual journal read-only before migration.
- 2026-10-28: Operator reported first real test backup/restore drill passed for `/var/backups/cotuong-stage/2026-10-28T09-00-35Z.sql.gz`; checksum passed, scratch restore/table/journal verification passed, scratch schema was removed, and no migration/deploy ran. Preserve that backup. New R2 code must encrypt with age public-key recipients, keep private identity off VPS/GitHub, use create-only writes and remote SHA readback, fail closed unless exact-prefix 35-day lock and 90-day lifecycle are verified, and never delete remote objects. R2 credentials/account/config, migration, deploy and QA still require separate approval.
- 2026-10-28: Operator reports READ_ONLY_PREFLIGHT_ONLY=PASS but saved output has no journal/count lines. The reviewed runner does print those lines; its PASS accepts either an empty bootstrap schema or an all-applied nonempty journal and does not compare checksums or verify credential login. Never infer actual applied versions from that marker. Prepare a metadata-only SSH inspector with an explicit newline sudo prompt for PS5.1 Tee, local retained JSON report, and comparison through the canonical migration parser. No upload/DDL/application rows/env contents. R2 bucket policy GETs require separate account-level Admin Read only credentials; bucket-scoped Object Read & Write must only handle objects. Reject overlapping lifecycle deletion rules below 90 days. Current roadmap/approval/rollback/QA gates are in ops/vps-new/FIRST-DEPLOY-ROADMAP.md; R2 remains unconfigured and no migration/deploy is authorized.

- 2026-10-28: Root cause of the PR #22 migration inspector failure: Windows PowerShell 5.1/OpenSSH remote-shell reparsing stripped nested quotes in the Base64 command substitution, so Bash received `set` as the `-c` program and printed environment variables; metadata collection never ran. Both the metadata inspector and backup drill now use shared `ssh-bash-command.ps1`, which protects a Base64 decode pipeline in one single-quoted `bash -c` argument and pipes the decoded script to Bash. PowerShell regression executes the payload through Git Bash and requires exactly `BASH_TRANSPORT_EXECUTED:42`, and the inspector still requires the metadata sentinel plus successful local journal/checksum comparison before PASS. No VPS command or DB operation is part of regression.

- 2026-10-28: Operator supplied `READ_ONLY_MIGRATION_INSPECTION=PASS` for test `cotuong_stage`: EMPTY_BASELINE, 0 tables/steps applied, 38 statement-level steps expected from 001–010, schemaVerificationRequired=true. Registry counts: 001=21; 002=5; 003–007=1 each; 008–010=2 each. This is read-only operator evidence; no migration/deploy followed. The 2026-10-28 09:00Z local dump was reported SHA/restore-drill PASS, but its exact digest and current age must be rechecked before use; no offsite R2 copy is evidenced. PR #23 fixed PS5.1 SSH Bash transport. New staged-first-deploy workflow requires separate vps-test Environment-gated `stage` and `activate` dispatches; stage leaves service stopped/current absent. A release SHA marker is checked by archive verification and the root activator. Existing combined `deploy` mode remains for later releases. Keep migration/restore/backup/deploy unrun until separate approval.
- 2026-10-29: Google Drive smoke passed only with the synthetic age v1 fixture. Google Workspace API User Data policy excludes backup of the developer's own app/project content to Drive; do not build or run game DB/media backup via Drive API. Operator reports the OAuth app is Testing with Publish disabled; do not alter OAuth status/scopes/client without approval. Windows rclone requests `drive.file` with a custom client, while VPS rclone requests `drive.file` using built-in client config; VPS read-only folder listing failed and cause remains unknown. VPS read-only inventory confirms Ubuntu 24.04, Asia/Ho_Chi_Minh, MySQL active, backup directory root:root:700, but noninteractive sudo did not permit DB/media metadata inspection. App media lives under release `uploads/group-avatars` and `uploads/message-images` via `/srv/cotuong/shared/uploads`; current local/R2 backup code handles SQL only. Target schedule is daily 03:00 Vietnam time without catch-up; changing the repo timer does not install/enable it. A fresh backup, full media snapshot/restore, offsite provider approval and retention cleanup remain outstanding. See `ops/vps-new/BACKUP*.md`.

- 2026-10-29: Backup audit found systemd previously marked the local-only job successful before its asynchronous `OnSuccess` R2 upload completed. The scheduled entry point must emit `BACKUP_COMPLETE=PASS` only after matching DB/media local markers and exact R2 `OFFSITE_VERIFIED` readback marker; otherwise fail the unit and log a local critical alert. Retention remains dry-run. Installation, real backup/upload/restore, timer activation, and deletion need separate approval.

- 2026-10-29: Online request-takeback tự hết hạn sau10.000ms theo deadline performance.now riêng từng phòng. Tick 250ms và các lệnh reply/join xử lý offer tại hoặc sau deadline; reset/rời/kết thúc/bắt đầu ván mới dọn deadline. Clock được tính tiếp từ đúng deadline, chỉ trừ thời gian sau hạn. room:state phát snapshot tới hai client; RoomOfferDialog chỉ hiện khi snapshot còn offer đối thủ nên tự unmount trên hai màn hình, reconnect không nhận offer cũ; thông báo hết hạn nằm trong chat hệ thống, không phủ bàn cờ. Regression trên base c47feaa71b5d99d83b103d6796c8e1419496b03c: baseline453 PASS/26 SKIP/0 FAIL; bản vá464 PASS/26 SKIP/0 FAIL; room/popup/Socket.IO38/38 PASS; TypeScript/build PASS. Không có migration/schema mới; QA thủ công hai trình duyệt còn chờ.

- 2026-11-03: User authorized publishing all valid local code to GitHub then VPS. Prepared codex/publish-local-20261103/PR33, excluded secrets/backups/build products/native engines, kept pre-push secret scan. Current snapshot full suite not green (872pass66fail41skip); typecheck/lint/build pass, room/popup follow-up35pass. VPS activation withheld; no migration/service changes. Report outputs/github-publish-20261103/REPORT.md.

- 2026-11-03 V14: Aligned `RoomService.updateReadyWait` with the canonical readiness rules. Without queued viewers there is no Ready countdown. With a queue and both players unready, the start window is 10 seconds plus 20 seconds displayed countdown. With one Ready, total wait is 20 seconds and the first 5 seconds are hidden; the second Ready starts immediately. Queue state changes reset the timer. Applies to normal and locked rooms. Verified by full Vitest 939 passed/0 failed/41 unchanged skipped, readiness-focused 31/31, Fairy/UI 61/61, TypeScript and production build PASS. Local-only; no deployment.

- 2026-11-04: User requests removal of Thailand selection on VPS; country picker offers Vietnam only. Preserve historical stored profile country data. Local source updated and build PASS; VPS frontend activation pending sudo command.
- 2026-11-04: Vietnam-only country picker activated on VPS; live HTTPS bundle verified against local build. Backup /var/backups/hovang-country-20261104T022045Z. Supersedes activation-pending note above.

- 2026-11-04: User rule: clearing messages inside a group clears the requester history but must keep the group visible while membership is active. Leaving/dissolving remains separate. Backend conversations filter updated locally; VPS activation pending.
- 2026-11-04: Group-clear backend patch activated on VPS; backup /var/backups/hovang-group-clear-20261104T022517Z. Post-deploy service/HTTPS health/Fairy readiness verified; group clear UI behavior awaits authenticated user retry.

- 2026-11-04: User authorizes whole-game Android Zalo layout fix. Screenshot suggests text inflation relative to controls. Scoped compatibility script disables browser text autosizing for Android Zalo/WebView; preserves normal Chrome and iPhone detection behavior. Local build PASS; real Zalo QA and VPS activation pending. Do not claim native WebView textZoom fixed without phone verification.
- 2026-11-04: Zalo text autosizing compatibility script activated on VPS; backup /var/backups/hovang-zalo-layout-20261104T040134Z. HTTPS script hash verified; Android phone layout still needs user confirmation.
- 2026-11-04: Zalo font fix V3 supersedes V1/V2. Device proof: fixed16px rendered32px at none/100%,16px at50%; dock27.648px corrected13.824px. Calibrate percentage from fixed16px probe at100%, apply to current/new DOM; normal browsers excluded. Local checks/build PASS, phone verification after activation remains pending.
- Zalo V3 VPS activation confirmed; backup /var/backups/hovang-zalo-v3-20261104T044216Z. HTTPS delivery/hash and backend health verified. Device rendering confirmation pending.
- 2026-11-04 user rule: AI levels1–6 are project-owned (random/capture then progressively deeper bounded search);7–10 use native Fairy. Home Xiangqi and room-selection quick play without an opponent start unlisted local Ông Hoàng level6. Manual rooms/hidden chess retain existing wait behavior. Notice persists until ×; checkbox suppresses within current tab login session, reset on explicit login/logout. Pause initial/rematch start until notice is dismissed. See docs/PRACTICE-AI.md. Local validation956/0/41, real-engine17/17, browser laptop/mobile/typecheck/build PASS; VPS activation pending sudo.
- 2026-11-04 superseding fallback-level rule: no-opponent Xiangqi quick play now uses Ông Hoàng level7 (native Fairy), not level6. Session checkbox/notice behavior unchanged. Lower practice AI levels1–6 and native7–10 split remains.
- 2026-11-04 latest user rule supersedes fallback6/7: cancel ONLY automatic bot fallback and its notice/session checkbox. Home quick play again creates an online waiting room if no opponent; room-selection quick play uses its previous no-room message. Keep own AI1–6/native Fairy7–10 in explicit computer play. VPS auto-fallback was never activated; old pending deployment script cancelled to prevent accidental activation.

- 2026-11-04: Theo user chỉnh bản LOCAL: khung tên trong ván đấu co theo tên, bỏ chiều rộng tối thiểu90px riêng PlayerCard. User đính chính: hiện trọn tên một dòng, không ellipsis/giới hạn chiều rộng; padding hai bên20px. Dùng fitContent opt-in ở PlayerNameplate, giữ các consumer Home/thiết lập và geometry avatar. Không deploy/push.


- 2026-11-04: User hủy thử style Home cho tên bàn đấu: hoàn tác cỡ chữ/khung về token170 desktop và clamp84/26vw/108 mobileHeader trước thử Home; giữ tên đầy đủ và padding20px. Không sửa Home/avatar.

- 2026-11-04: User chốt tên tự đặt/đổi tên tối đa1 ký tự in hoa Unicode (tính chữ Việt có dấu),0 hoa hợp lệ. Dùng playerRenameError chung UI/UserService/AccountService; chặn trước ghi DB, không tự đổi chữ hoặc tiêu quyền đổi tên. Giữ tên cũ/Guest và playerNameError khi join/restore; không hồi tố dữ liệu. Local, chưa deploy.

- 2026-11-04: User chạy name-changes deploy v3 thành công: khung tên đầy đủ/padding20px và quy tắc đổi tên tối đa1chữhoa đã lên VPS. Backup /var/backups/hovang-name-changes-20261104-y0XBvh. Tsc/build/rename smoke/runtime asset readability/public assets PASS theo log activation. Chưa xác nhận trực quan bằng tài khoản thật.

- 2026-11-04: XEM THỬ LOCAL theo user: bảng chào mừng HOVANG ở giữa viewport khi vào Home; giữ nguyên nội dung user và link Facebook https://www.facebook.com/share/1cMN4XZVtX/ + Zalo https://zalo.me/g/8ux46ujifj5hjjzlfil5 bấm mở tab mới. Theo mẫu mới dùng artwork user cung cấp với nút X và Facebook/Zalo có anchor thật; URL chỉ nằm trong href, không hiện ra. Bảng fit viewport giữ tỷ lệ. User xác nhận mỗi lần thoát rồi mở lại game hiện lại, đóng giữ ẩn khi chuyển màn/về Home; chỉ local/chưa deploy. Không sửa layout/avatar Home.

- 2026-11-04: User mở riêng chiều rộng thẻ tên Home: luôn bằng tổng cụm2Elo bên dưới (desktop cùng token180 theo scale, mobile37cqw). PlayerNameplate fixedWidth opt-in ở2Home; không đổi avatar/khung/chiều cao/cỡ chữ. Thẻ tên bàn đấu fitContent tối thiểu140px, giữ đầy đủ tên/padding20px. User yêu cầu đưa cả thông báo artwork và thay đổi này lên VPS; đã chuẩn bị gói, chờ sudo activation; sau task khóa lại phạm vi Home vừa chỉnh.

- 2026-11-04: User đính chính nameplate trong bàn đấu MOBILE tối thiểu120px; laptop giữ140px, padding20px/tênđầyđủ và Home fixedWidth bằng2Elo giữ nguyên. Localđãsửa compact:min-w120, gói frontend riêng name-mobile120-vps-20261104 đãupload/chờsudo. Bảnwelcome trước đã thấy namespacepublic welcome-name-20261104.

- 2026-11-04 mới nhất: user giảm thêm20px CHỈ name trong trận MOBILE: min100px thay120px; desktop140px vàHomewidthbằng2Elo/padding20/font/avatar giữnguyên. Bản120 chưaactivate (publicvẫnwelcome-name), gói100 thaythếđãupload/chờsudo.

- 2026-11-05: User báo toàn giao diện nháy khi đi quân ONLINE. Đã tái hiện reference churn/ACK trùng bằng test, chưa profilebrowser/GPU. Local shareRoomSnapshot tái dùng nhánh JSON live không đổi (không deepwalkarchive), receiveRoom bỏ storeupdate trùng; App tách subscription clock/move khỏi route shell. Giữ authoritative takeback/ready/seat/result, clock/gameplay/animation400ms/audio/avatar/UI.22/22test8suite,typecheck/VitebuildPASS; chưa browser/hai thiết bịQA/chưaVPS, chưa khẳngđịnh hết nháy thực tế. docs/ONLINE-RENDER-STABILITY.md.

- 2026-11-05: User xác định nháy riêng nútXuốngbàn khi chínhmìnhđiquân. Đã táihiện độmờ1→0.6 khi match.pending chờACK do disabled:opacity-60 ởRoomStandUpButton chung. Sửa disabled:opacity-100, vẫndisabled/chặnbấm/kíchthước/ảnh/quyềngiữnguyên; áp dụng footerdesktop vàRoomUsersPanel mobile/desktop. Regressioncomputedopacity trướcsửa2FAIL; sau sửa kiểm trahình/nútgiữDOM,opacity1,pendingkhônggửi,lạienabledclickđược. Local/chưaVPS.

- 2026-11-05: User yêu cầu deploy sửa nháy Xuống bàn. Gói1fileRoomUsersPanel đãupload, chỉđổi standupdisabledopacity100 (queuegiữ60); khônggomApp/store performancefixlocal. BaselineVPSname-mobile100; chờ sudo stand-up-stable-deploy-20261105.sh, chưaactivate.

- 2026-11-05 mới nhất: User khôi phục đếm30s khi2người ngồi online. PhaseReady đủ2ghế chờ1giây rồi mới hiện30→0 (tổng31giây), khôngcầnqueue/bànkhóa giốngbànthường; hết1giâychờ+30giâyđếm servercanStarttựbắtđầu đúngcặp,2Readyvẫnbắtđầungay. MộtReady/lặpReady/viewer/queuetogglekhôngresetdeadline;1ghếhủy/cặpmới30s. Hai ghếđềuthấy/viewerẩn. Thayquytắcqueuegate/ẩn10+20/mộtReady20s cũ CHỈphaseReady; giữfinishedrematchACK/rotation/energy/clock/audio. Local/chưaVPS; docs/ROOM-READINESS.md mụcQuytắchiệnhành2026-11-05.

- 2026-11-05 đínhchính: người thứhai lênbàn phải chờđúng1giây mới hiện30; mốc999msnull/1000ms30/30999ms1/31000msstart.2Readyvẫnngay,kểcảtrong1giâyđầu. KhôngresetbởiReady/queue/viewer;đổicặpchờ1s+30s lại. ChỉphaseReady,khôngđổifinishedrematch.

- 2026-11-08: Xem lại/Đánh thử mobile giữ nút chuyển chế độ tại vùng điều khiển cố định dưới bàn; khi vào Đánh thử, Board dùng state trial cho cả replay và position trial, cho phép người dùng đi quân ở đúng lượt, chỉ các bên bật máy mới tự động đi. Local/chưa deploy.

- 2026-11-08: Thêm công tắc Cài đặt Home để bật/tắt chữ HOVANG trên bàn cờ. Công tắc chỉ hiện với public ID trong allowlist src/lib/hovangBrandEntitlement.ts; trạng thái lưu theo ID trên localStorage và đồng bộ sang Board. Cấp quyền bằng cách thêm public ID vào HOVANG_WATERMARK_CONTROL_PUBLIC_IDS.

- 2026-11-08: Nút chuyển Xem lại/Đánh thử trên laptop cố định tại vị trí bàn thử; nút Tạo bàn dùng CreateRoomForm chung và ẩn Bàn khóa khi tạo từ thế cờ.

- 2026-11-08: Nút chuyển Xem lại/Đánh thử trên laptop cố định tại vị trí bàn thử; nút Tạo bàn dùng CreateRoomForm chung và ẩn Bàn khóa khi tạo từ thế cờ.

- 2026-11-08: Nút chuyển Xem lại/Đánh thử trên laptop cố định tại vị trí bàn thử; nút Tạo bàn dùng CreateRoomForm chung và ẩn Bàn khóa khi tạo từ thế cờ.

- 2026-11-08: CustomRoomControls laptop/mobile bỏ chữ và hai nút Đỏ/Đen, dùng một switch duy nhất: gạt phải là Đỏ đi trước, gạt trái là Đen đi trước. ReplayControls ẩn cụm Tạo bàn/Cài lại/Đổi bên khi chỉ xem lại; chỉ hiện trong Đánh thử.

- 2026-11-08: Custom room owner được đổi bên ngay cả khi chỉ có một người ngồi; server đảo side của mọi ghế hiện có (một hoặc hai). Mobile cụm điều khiển AI/đánh thử đặt giữa vùng mép trên và đầu bàn, tăng nhẹ scale.

- 2026-11-08: Vite dev/preview thêm Cache-Control no-store/no-cache/must-revalidate để F5 luôn revalidate HTML/module bundle local, không cần Ctrl+F5 hoặc cửa sổ ẩn danh.

- 2026-11-08: ReplayControls laptop khi mở từ Xem lại (có onToggleMode) ẩn cụm 3 nút Tạo bàn/Cài lại/Đổi bên; mobile và bàn thử từ Vị trí tùy chỉnh giữ điều khiển.

- 2026-11-08: Đính chính Replay: giữ 3 nút Tạo bàn/Cài lại/Đổi bên trong bàn thử; bỏ nút chuyển chế độ ở giữa bàn, chỉ render một nút chuyển cố định phía dưới khu vực điều khiển desktop và mobile.

- 2026-11-08: Form Tạo bàn từ thế cờ riêng giãn đều hai cụm thời gian theo chiều dọc; nút Đổi bên và switch Đi trước giữ opacity100 khi pending để chống nháy lúc bấm/gạt.

- 2026-11-08: Tạo bàn custom giãn lại mốc dọc: nhãn/ô thời gian lần lượt 31/38% và 52/59%, nút hạ lên 78% để các khoảng đều hơn.

- 2026-11-08: HomeSettings mục Hiện chữ HOVANG trên bàn đổi icon ký hiệu sang ảnh vương miện top-one-crown, giữ kích thước icon 24px và cỡ chữ/hàng hiện tại; google-services.json không dùng.

- 2026-11-08: Đính chính HomeSettings: bỏ ảnh huy hiệu top-one-crown, dùng SVG vương miện vàng kiểu icon giao diện; toàn bộ dòng cài đặt đồng bộ font-body 16px/normal/leading-none.

- 2026-11-08: HomeSettings rà soát kỹ dòng watermark: hàng tối thiểu52px, font-body16px line-height1.15, icon crown SVG 28px màu #ffe08a cùng drop-shadow HomeIcon, cột dấu tích rộng16px căn giữa.

- 2026-11-08: Nút vương miện watermark giữ cột dấu tích cố định (w16 shrink0), khi bấm đặt HOVANG watermark ẩn ngay và chỉ cập nhật dấu tích, không dịch cụm hàng.

- 2026-11-08: Bỏ watermark HOVANG khỏi mọi Board và screenshot.worker; HomeSettings mục đổi thành icon trophy vàng chung HomeIcon, nhãn Bỏ logo, dấu tích cố định luôn hiện.

- 2026-11-08: Home desktop/mobile tăng độ hiện diện background: desktop thêm lớp tối nhẹ theo chiều dọc và radial vignette từ viền nâu vào tâm; mobile giảm brightness background còn0.88 và thêm radial vignette.

- 2026-11-08: Bỏ logo dùng lại SVG vương miện cũ (không dùng cúp), icon dịch phải1px qua cột32px; nhãn tăng17px; dấu tích dùng cùng cột/căn giữa như hai dòng trên.

- 2026-11-08: Icon vương miện Bỏ logo màu vàng sáng #ffe7a3, nhích trái2px; dấu tích toggle theo watermarkVisible, bấm lần lượt bật/tắt bỏ logo.

- 2026-11-08: Thêm HomeIcon crown dùng cùng SVG wrapper/currentColor/filter/kích thước size7 như các icon cài đặt trên; dòng Bỏ logo dùng HomeIcon crown và cùng row typography.

- 2026-11-08: Board trong CustomPositionPage/Vị trí tùy chỉnh truyền showHovangWatermark=false, đồng bộ bỏ logo với GamePage và mọi bàn thử.

- 2026-11-08: Home dùng bamboo-sunset-user.png làm nền ngoài; lớp phủ tối nằm ở main dưới khung nâu, không phủ nội dung/nền bên trong khung desktop. Mobile dùng cùng nền tre giảm sáng, giữ nội dung Home.

- 2026-11-08: Computer setup/custom position: nút Back từ Vị trí tùy chỉnh về Home (trừ luồng replay quay lại ván); gỡ nền tre/ảnh landscape bên ngoài ở hai màn hình, giữ nền nội dung setup/bàn cờ.

- 2026-11-09: Luồng tạo bàn từ thế cờ/Chơi với máy không hiển thị Bàn khóa hoặc Mật khẩu. Chủ phòng online được mở Cài đặt và dùng các chức năng quản lý phòng ở mọi phòng; khóa chỉ còn kiểm soát quyền vào phòng.

- 2026-11-09: Khi từ Chơi với máy/Vị trí tùy chỉnh chuyển sang màn hình lazy (Đấu ngay hoặc mở Vị trí tùy chỉnh), giữ màn hình hiện tại được mount làm nền và dùng HovangLoadingOverlay dạng vùng trong lúc module mới tải; chỉ dọn màn hình cũ sau khi màn hình mới render/hoàn tất entrance. Không dùng fallback fullscreen che thành màn hình trống.
- 2026-11-09: Khi mở bảng người trong phòng trên mobile bàn thế cờ riêng, nút Xếp hàng/Xuống bàn vẫn neo trên bảng; cụm Đổi bên/Đi trước chuyển xuống dưới bảng để không che hoặc đứng trước danh sách.
- 2026-11-09: Nút View/số người trong phòng trên mobile bàn thế cờ riêng neo ở phía trên cụm Đổi bên/Đi trước và bảng người chơi, tránh chồng lên các điều khiển.

- 2026-11-09: Đồng bộ laptop bàn thế cờ riêng: footer View/Xếp hàng được neo phía trên bảng người; cụm Đổi bên/Đi trước chuyển xuống dưới bảng khi danh sách mở.

- 2026-11-10: Theo user, hiệu ứng chuyển bên lớp phủ xanh và viền thời gian trong PlayerCard dùng 120ms (trước 350ms), đồng bộ laptop/mobile; không đổi clock hoặc geometry avatar. User báo quân giật trước khi đi: Board bỏ animation hạ wrapper riêng, nối độ nâng khi chọn vào cùng quỹ đạo bay 400ms để tránh hạ quân rồi mới trượt. Regression animation/online/player/clock 14/14 PASS; typecheck và Vite PASS; chưa browser QA.

- 2026-11-10 kiểm chứng cuối task timer/quân: npm run build PASS gồm cả hai bước postbuild ảnh; 14/14 targeted tests PASS; chưa browser QA.

- 2026-11-10 (phản hồi tiếp): User vẫn thấy quân đứng một nhịp trước khi đi ở cả online/máy. Board chung nhận primary pointerdown thay vì chờ click sau nhả; bỏ click chuột/touch trùng, giữ click detail=0 cho keyboard/assistive. Quỹ đạo bay dùng tốc độ linear thay ease-out để không có đoạn gần như đứng cuối nước. Giữ 400ms/độ nâng/luật và xác nhận server online. 41/41 targeted tests PASS, TypeScript PASS; chưa browser QA, chưa khẳng định đã loại độ trễ mạng online.

- 2026-11-10 kiểm chứng piece-immediate: 41/41 tests và typecheck PASS; Vite isolated PASS. Full build chưa PASS do postbuild ảnh ENOENT trong dist; chưa browser QA/deploy.

- 2026-11-10 (đính chính theo user): Hoàn tác riêng lượt piece-immediate: Board trở lại onClick và easing cubic-bezier(0.22,0.61,0.36,1); bỏ test pointerdown. Quy tắc pointerdown/linear ở ghi chú trước đã hủy; giữ khung thời gian120ms và bản quỹ đạo trước lượt này. Kiểm tra âm khai cuộc: useMoveSound phát khi phase chuyển sang playing, không phụ thuộc thao tác Ready; về ready reset cờ intro nên ván tự bắt đầu kế tiếp vẫn gọi phát. Thêm regression ready→playing→finished→ready→playing, không bấm Ready, mỗi ván gọi intro và snapshot lặp không gọi thêm. 6suite40/40tests PASS; typecheck PASS. Chưa nghe trực tiếp trên trình duyệt; mute/autoplay vẫn theo cấu hình/trình duyệt.

- 2026-11-10 sửa lỗi audio rematch: kiểm tra lượt trước chỉ mô phỏng finished→ready→playing nên thiếu trường hợp server tự hết đếm chuyển thẳng finished→playing. Cờ intro của ván cũ chặn lần phát kế; moveCount reset còn bị nhận nhầm là takeback rồi stopAll. useMoveSound reset cờ intro cho online direct-rematch và chỉ nhận takeback khi trước/sau đều playing; bỏ lần gọi intro online trùng trong useGame. Giữ local explicit-start/âm lượng/assets và khóa kết quả theo vòng đời. Test mới phải mô phỏng finished→playing, moveCount về0, intro phát một lần và không stop ngay, snapshot lặp không phát lại. 96 targeted tests +4 socket tests PASS; TypeScript/Vite mã cuối PASS. Chưa nghe audio trực tiếp/hai thiết bị QA; chưa deploy.

- 2026-11-10 final rematch/audio/energy:96targeted+4sockettests PASS, TypeScript/Vite/cả2postbuild PASS; dist local cập nhật, có backup/checksum/indexasset kiểm chứng. Còn1test UI máy lệch thông báo ngoài phạm vi; chưa browser audio/2thiết bịQA, không deploy/restart.

- 2026-11-10 theo yêu cầu user: PvP thắng/thua khi cùng bậc+cùng sao dùng một delta ngẫu nhiên chung mỗi match từ11–13; winner +delta, loser -delta. Các khoảng rank khác giữ nguyên; hòa0, chế độ không đủ điều kiện Elo vẫn0. Sinh randomInt(11,14) một lần trong transaction settlement, truyền cho cả hai người. Tests persistence-rules/match-gold-policy 13/13 PASS; typecheck PASS. Chưa kiểm tra DB live/deploy.

- 2026-11-10: iPad dùng entry nhánh riêng qua iframe same-origin 1493×731; nhận diện iPad/iPadOS Safari, scale đồng đều theo min(viewportW/designW, viewportH/designH), nền home tre có sẵn, visualViewport/safe area. Xoay chỉ resize khung, giữ app/ván. Điện thoại/laptop đi theo appBootstrap hiện tại. Local-only; code/unit/typecheck/Vite pass, nhưng browser/iPad thật và full npm build còn pending.
- 2026-11-10: User báo tiếng đi quân trễ sau khi suy nghĩ lâu. Chưa xác định nguyên nhân trên thiết bị thực. GameSounds dùng latencyHint interactive, giữ render stream bằng oscillator gain0 và gọi resume ngay trước await tải/giải mã; dispose dọn oscillator. Không sửa gameplay/UI/âm lượng/assets. Regression mô phỏng nghỉ180s, resume/cleanup và move-sound24/24 PASS; TypeScript PASS. Chưa nghe thử trên thiết bị, chưa deploy; không khẳng định hết trễ phần cứng/Bluetooth.
- Kiểm chứng cuối task audio-idle: Vite compile PASS nhưng npm run build đầy đủ FAIL ở tối ưu ảnh có sẵn (ENOENT dist/assets/message-CebfAm2M.png). Dist chưa đủ điều kiện bàn giao/deploy; source audio và24test PASS, chưa QA nghe thực tế.

- 2026-11-10 reconnect: Theo phản ánh nghe điện thoại rồi quay lại bị văng, giữ ghế đang đấu khi mất kết nối 3 phút (trước 60 giây). Đồng hồ/lượt vẫn chạy, hết giờ thi đấu có thể kết thúc sớm hơn. Resume theo account đã xác thực, giữ ghế/bàn/chủ phòng, xóa deadline và disconnectedAtEpochMs cũ để mỗi lần mất mạng tiếp theo có đủ cửa sổ mới. Khi quay về tab/focus hoặc có mạng, client thử connect + resume/resync; cleanup listener khi unmount. Rời chủ động giữ luật cũ. Tests room-reconnect-grace/room-foreground-reconnect/rooms/server: 4 suites,43/43 PASS; TypeScript PASS. Chưa thử cuộc gọi trên điện thoại thật; không deploy/restart. Backup .checkpoints/reconnect-20261110. Full build đang chờ postbuild ảnh.
- 2026-11-10 Google blank login: GIS button explicitly opts into FedCM on supported browsers, no auto selection; shared login/link component guards known embedded app browsers and explains full-browser sign-in. Guest linking has distinct preservation warning; do not claim Guest transfers across browsers. Failed initialization has visible retry. COOP/COEP remain for browser Cờ Úp worker. Six targeted suites/32 tests and TypeScript PASS; no real account/phone QA or deployment. See GOOGLE-SIGN-IN.md and AI_CHANGELOG.md; legacy non-FedCM isolated popup behavior remains unverified.

- 2026-11-10 reconnect kiểm chứng cuối: npm.cmd run build PASS (TypeScript, Vite, cả hai postbuild ảnh); dist chứa listener foreground/online mới. 43/43 targeted tests PASS, diff whitespace check PASS. Chưa QA cuộc gọi trên điện thoại thật; chưa deploy/restart backend.

- 2026-11-10 avatar-green-layer: Theo ảnh/user, lớp phủ xanh thời gian phải trên cả portrait và viền avatar. Chỉ PlayerCard đổi z-index fill2→11 và arc11→12, AvatarFrameOverlay giữ10. Không đổi geometry/avatar/khung/clock/màu/thời lượng120ms; dùng chung laptop/mobile. Backup .checkpoints/avatar-green-layer-20261110. PlayerCard identity6/6 PASS; full build đang chạy. Chưa browser QA/deploy.

- 2026-11-10 avatar-green-layer kiểm chứng cuối: full npm.cmd run build PASS gồm TypeScript/Vite/cả hai postbuild ảnh; dist/assets/appBootstrap-rzdealfV.js có fill z11 và arc z12 trên frame z10. PlayerCard6/6 tests PASS. Chưa browser QA, chưa deploy.

- 2026-11-10: Theo user, admin thêm thống kê tổng tài khoản đã vào game/online/offline/Google/khách và nhật ký ai vào trang/dùng chức năng nào. Tổng lấy users active hiện có; online là unique authenticated account có socket đang nối toàn game, nhiều tab1người, offline=total-online; Google theo google_sub hiện tại. Analytics admin-only, không dựa lobby/ghế/Google client flag. UI auto15s, lọc người/thời gian/loại tài khoản/trạng thái/trang/chức năng, danh sách+nhật ký50dòng/trang, aggregate lượt và distinct users. Nhật ký mới từ lúc triển khai, không giả dữ liệu cũ. App tracking mã cố định, gom mẻ/không block game, không ghi chat/biểu mẫu/token/rawURL; server gắn identity/time, UUID chống trùng, login/APIthànhcông server-only. Không dùng telemetry cho nghiệp vụ/thưởng. Migration022 thêm2bảng/index;001–021 giữ nguyên.18/18 targeted+42/42 MySQLtạm PASS, TypeScript/build đủ2postbuild PASS; chưa browser/2thiếtbịQA, không migrate DB thật/deploy/restart. Xem docs/ADMIN.md. Backup .checkpoints/admin-analytics-20261110.

- 2026-11-10: Admin statistics failed on local because022not applied and migrator lacks REFERENCES for FKs (verified grants). Added missing-schema fallback: existing account/connection statistics remain real; activityAvailable=false and activeInPeriod=null, explicit admin notice instead of generic500/false0.8/8 targeted +TypeScript PASS; direct local DB report read PASS. Backup .checkpoints/admin-analytics-activation-20261110/database-before.sql verified checksum. Migration attempt denied before any table created; exact unapplied running marker removed after no-table/checksum verification, applied history untouched. Need administrator GRANT REFERENCES ON cotuong.* TO cotuong_migrator@localhost, then normal migration022. Never claim activity logging active before those tables exist. No production/VPS operations or privilege changes.

- 2026-11-10 cập nhật cuối admin analytics: User đã cấp REFERENCES thành công trên MySQL local. Đã chạy đúng2bước migration022 và db:verify PASS; đọc report DB thật PASS, activityAvailable=true, hai journal022applied, tổngGoogle+khách khớp. Thay trạng thái chờ cấp quyền/chưa có bảng ở ghi chú trước. Không tạo sự kiện giả/đổi tài khoản/tài nguyên, không VPS/deploy/restart. Tải lại localhost/admin để xem. Backup trước migration giữ tại .checkpoints/admin-analytics-activation-20261110.

- 2026-11-10: Admin analytics/catalog nhận401 phải đồng bộ về ô đăng nhập, dọn dữ liệu quản trị/notice và dừng polling401; đăng nhập lại tải mới thống kê. Không giữ shell “đã đăng nhập” khi server từ chối phiên. Không nhầm lỗi mạng tạm thành hết phiên. Sessions admin RAM2h, restart mất phiên vẫn giữ luật bảo mật cũ.7/7 React tests+TypeScript PASS, health backend/proxy200; chưa browserQA. Backup .checkpoints/admin-session-expiry-20261110.

- 2026-11-10: Theo user, bàn thường khi hết người ngồi phải có người View lên thay hoặc xóa phòng. Kiểm tra xác nhận leave đã có chọn View đủ năng lượng đến sớm nhất nhưng còn sót phòng chỉ có View hết năng lượng, và tick sau demote người cuối hết năng lượng. Sửa helper settleEmptyNormalTable dùng chung leave/command/tick: ưu tiên queued FIFO đủ năng lượng, rồi View thường đủ năng lượng đến sớm nhất/giao owner; không người phù hợp thì dọn View, thông báo energy/rời socket và xóa. Chỉ !locked&&!customFen, Cờ Tướng/Cờ Úp; không kéo View thường lên khi còn1ghế; ngoại lệ bàn khóa/thế riêng giữ nguyên.56/56tests7suite PASS gồm socket thật, TypeScript PASS; chưa browser/deploy. Backup .checkpoints/normal-empty-room-20261110. Gói VPS v2/staging trước đó CHƯA chứa sửa này, phải làm mới artifact/candidate trước khi tiếp tục triển khai.

- 2026-11-10: User làm rõ Bỏ AI là ẩn cả khung2nút chọn bên máy, công tắc và hình2quân, rồi chuyển bộ tua dưới lên thay trong Vị trí tùy chỉnh/Đấu ngay; không tắt máy hoặc ẩn danh hiệu. Quyền admin độc lập aiControlsControl/actionai-controls, migration023mặcđịnh0. HomeSettings desktop/mobile hiện Bỏ AI/iconAIgạchchéo đỏ dưới Bỏ logo chỉ cho account được cấp; chọn lưu localStorage theo publicId, backend permission gate luôn kiểm. ReplayControls nhận hideAiControls chỉ trong customPositionTrial; mobile không còn cụm navigation cũ/bộ trùng, giữ back/seek/count/Tạo bàn/Reset/Đổi bên. Thu hồi/tài khoản khác trả UI mặc định. Không chạm geometry avatar/Lịch sử/online/gameplay. Backup .checkpoints/ai-setting-20261110 gồm SQL trước023verifiedSHA; local023apply1bước/db:verifyPASS, không cấp userthật/khôngVPS. Cần refresh gói/candidateVPS cũ và thêm023trước profile mới khi triển khai.
- Kiểm chứng cuối Bỏ AI:33/33targeted+43/43MySQLtạm PASS; npm.cmd run build mãcuối PASS (TypeScript/Vite/2postbuild), local db:verify PASS; chưa browserQA/VPS/userthậtgrant.

- 2026-11-10: User yêu cầu xoay ngang/dọc giữ nguyên ván/thế/tùy chọn đang dùng, không reset. Tái hiện DesktopCanvas remount Providers/App khi vượt800px vì đổi children trực tiếp↔2wrapper. Sửa giữ wrapperDOM ổn định, compact display:contents/id desktop chỉ gắn khi desktop, giữstyle/scale cũ. Bỏ hook ép portrait còn sót (theo hủy khóa xoay2026-10-21), App không tự ép hướng. Không sửa gameplay/avatar geometry/iframe iPad/quyền AI.2regression mới fail baseline, sau sửa34/34tests5suite+TypeScript PASS; chưa điệnthoại/browserQA. Backup .checkpoints/orientation-state-20261110. BảnVPS/archivev2/candidate cũ chưa chứa sửa này.
- Kiểm chứng cuối xoay màn hình:34/34tests và full npm.cmd run build PASS (TypeScript/Vite/2postbuild). Chưa QA điệnthoạithật/browser, chưaVPS.

- 2026-11-10: User yêu cầu chỉ fixlocal phòng thường rác/tạo không có người, dừng đọcVPS. Phòng thường0ghế không đưa vào Chọn Bàn; user đã hủy hạn60s; phòng hoàn toàn khôngplayers/viewers giữ thời hạn dọn30phút cũ. Giữ phòng1người ngồi, không thêm hạn mới cho khóa/custom/grace reconnect; View-only dùng helperpromoteđủnănglượng hoặc xóa như trước. Prune từlist/create vẫn được gom phátrooms:changed qua tick và dọnhistory/readywait.92/92HTTP/socket/service tests9suite+TypeScriptPASS, nofrontendbuildneeded, chưadeploy. Backup .checkpoints/empty-room-vps-20261110.
- Đính chính VPS: DNS hovanggame.com thực tế103.153.254.184 (backendpublic3phòng,2phòng0ghế1View);103.9.78.75làmáycũ/backend[] tại lần đọc. Máy hiện tại servicecotuong-test.service/current/srv/cotuong/releases/hovang-local-v4-routefix-20261110; deploykhôngđọcsource(doowner cotuong:cotuong). Không áp dụng giả địnhschema005/migrationpending/migrator/Drivebackup của máy cũ cho máy mới. Đã dừngVPS theo user trước capturehelper/admin/livechanges. Handoff được sửa đầu file để tránh dùng nhầm đích.

- 2026-11-10 user đính chính: BỎ quy tắc mới tạo phòng không ai vào60s tự xóa. RoomRepository quay về timeout30phút cũ cho phòng hoàn toàn không có thành viên; giữẩnphòngthường0ghế trênChọnBàn và helper đưaViewlên/xóa khi hết người ngồi theo nănglượng. Test xác nhận sau60sphòngvẫncòn/vàođược sau5phút; socketcleanup test quay vềngưỡng30phútcũ. Chỉlocal, khôngVPS.

- 2026-11-10 device-entry: User yêu cầu kiểm tra link trên mọi thiết bị. Website gốcHTTPS200, HTTP301 vềHTTPS; www lỗiDNS (curl6), chưa thay DNS/server. Chrome/Edge desktop và Chromium mô phỏng Pixel7/iPhone13/iPadgen7 tới Login, Android bấm Để sau lời mời lối tắt; không tạo account/login thật. WebKit Windows spawnUNKNOWN nên chưa Safari QA, không kết luận mọi máy đều hoạt động. Thêm startup recovery script thường + bootstrap catch/noscript: retry khi module/preload lỗi hoặc30s chưa render; gỡ overlay/listener/timer sau render, giữ cookie/data/ván.58/58tests5suite PASS; full build đang chạy. Chi tiết docs/DEVICE-ENTRY.md; backup .checkpoints/device-entry-20261110. Chưa deploy.

- 2026-11-10 device-entry kiểm chứng cuối:58/58tests5suite PASS; npm.cmd run build PASS gồmTypeScript/Vite/2postbuild; public/dist startup script SHA256 khớp. BrowserChrome local: chặn entry hoặc bootstrap đều hiện retry; bỏ chặn+bấmThửlại vàoLogin; normalLogin không bị overlay. LiveChrome/Edgedesktop +ChromiumemulationPixel7/iPhone13/iPadgen7 đếnLogin; không có testđăngnhập/gameplay/Safarithật. Khôngdeploy/SSH/DNS. wwwvẫnthiếuDNS, đang chờ thông tin nhà cung cấpDNS. Diffcheckindex.html báo blank trailingwhitespace cósẵn trongbackup, khôngchỉnh ngoài phạmvi.

- 2026-11-11 release preparation: User yêu cầu đưa bản local hiện tại lên103.153.254.184, lệnh cuối tự nhập mật khẩu. Đóng gói immutable hovang-local-20261111-ae912bddf415 (2310files/662690180bytes, SHA2569d25a1bbe15773796f8b0ccd3d6a7c0f4838ea8cd9a84acee7632c3aeb5a4690), excludesenv/adminsecret/DB/uploads/Windowsengines/node_modules. Gitleaks/manifest/archive/sourcechecksum PASS; fullsuite cuối1235PASS/0FAIL/44SKIP, MySQLtạm43PASS, fullbuildPASS. Cập nhật assertion energy-room-policy theoẩnphòng0ghế,44relatedPASS; khôngđổigameplay. Đãuploadprivateincoming+checksumPASS, npmci Linux/typecheckPASS trong staging deployuser,13896filemanifestpinned. Chưađổicurrent/stopservice/migrateDB thật. Chuẩn bị PowerShell5.1 parsePASS+rootPythoncompile+schemaTStranspile+bash-n trênVPS PASS. Root wrapper dùngsu root nhập mậtkhẩutrựctiếp, pinhelperhash, backup/restore scratch trướcDDL, onlypending022/023, activegameguard, verifySchema, atomicswitch+health/socket/frontend, code/service rollbackgiữschemaadditive. Root/envSQLthật cònchờuserchạylệnh. Outputs/README-Deploy-HOVANG-20261111.md trongchat làhandoff; khôngápdụngpipelineGitHub/VPScũ.

- 2026-11-11: Admin UI: danh sách người chơi tối đa30/trang, online trước rồi ID giảm dần ngay tại repository trước LIMIT/OFFSET; nhật ký vẫn50/trang. Xem chi tiết mở tài khoản trong khối quản lý, cuộn tới thông tin/tài nguyên/Elo/quyền; giữ Xem hoạt động riêng. Giao diện admin chia khối, trạng thái online có màu. Không thay UI game/avatar/auth/DB schema. Kiểm chứng:15 test liên quan PASS (13 ban đầu và2 regression mới), TypeScript PASS; chưa browser QA. Backup .checkpoints/admin-ui-20261111.

- 2026-11-11 audio-idle-local: User báo bản giữ gain0 trước vẫn trễ lần đầu sau idle. UI sửa interrupted/nonrunning resume, chủ động statechange/focus/visibility; gesture mới không bị chặn bởi resume cũ chờ autoplay. Dùng ConstantSource DC1/32768 chung thay graphzero, offset đặt ngay từ khi tạo node, mute/hidden gate và cleanup. GameSounds cache decodedbuffer, cue có sẵn start đồng bộ trước await; giữ volume/assets/intro/checkmate/countdown/nhạc nền.8suite48test PASS; Chrome AudioContext thật idle180s giữrunning/startUI11ms/move6.7ms, chưa đo âm ra loa/Bluetooth; DCintrinsic check đúng1LSB và idle10s start0.5/0.9ms. Backup .checkpoints/audio-idle-local-20261111, docs/AUDIO-IDLE.md. Fullbuild mãcuối đangchờ; chưaVPS. Gói ae912bddf415 cũ chưa chứa sửa này, phải refresh trước phát hành. Thay giải pháp oscillatorgain0 của10/11; không khẳng định triệt tiêu mọi độtrễ phầncứng.
- Kiểm chứng cuối admin UI2026-11-11: chạy lại5suite15/15PASS, tscPASS, Vite bundlePASS. Full npm build KHÔNG PASS: bước hovang-webp-finalpass lỗi ENOENT dist/assets/phong-tang-2-C0-SjYor.webp (PNG tồn tại, WebP thiếu). Không xác nhận dist sẵn sàng phát hành; giữ thay đổi source đã qua regression, chưa browserQA/deploy.

- 2026-11-11 animation-assets: User yêu cầu giữ nguyên hình thức/tốc độ animation, mạng chậm được chờ tải trước rồi phát hiệu ứng đồng nhất. OpeningCover dùng chung Game/Chọn Bàn/Chơi với máy/xếp thế chờ ảnh img, CSS background/border-image tải + decode, chừa hai frame chuẩn bị rồi phát nguyên keyframe/easing/600ms. Hiện spinner chung trong lúc chờ, ảnh lỗi không giữ màn vô hạn, unmount hủy listeners/frame/timer; callback mới không làm animation chạy lại. Bỏ qua nhánh display:none/hidden; vẫn tải artwork aria-hidden trong scene inert. Không sửa geometry/avatar/UI khóa/gameplay/clock/audio/server. Backup .checkpoints/animation-assets-20261111. 12/12 tests trên4suite PASS, diff-check PASS. Chưa đo FPS/browser/điện thoại thật; không kết luận hết mọi giật lag ở các animation khác. Không deploy; gói release cũ không chứa thay đổi này.

- Kiểm chứng cuối animation-assets2026-11-11:12/12 tests4suite PASS; mã cuối TypeScript/Vite PASS. Full npm run build cuối FAIL ở script ảnh finalpass do saved2.4741MiB dưới ngưỡng5MiB; không đổi script/ngưỡng/không tuyên bố fullbuildPASS (lượt build trước mãcuối đãPASS). Oxlint bịApplicationControl chặn nativebinding. Chưa browser/FPS/mobile QA; khôngdeploy. Log .checkpoints/animation-assets-20261111/build-final.log. Source giữ thay đổi đã được regression/typecheck/Vite xác minh; lỗi threshold là bước tối ưu artifact, không lỗi TypeScript/animation.

- 2026-11-11 audio-idle-local kết quả cuối:8suite49/49 PASS. Chromeidle180s PASS (UI11ms/move6.7ms scheduling), kiểm tra intrinsicDC/idle10s PASS(0.5/0.9ms), khôngđooutputphysical. Npmrunbuild mãcuối ởdistchung gặpENOENTfinalpassảnh; npmrunbuildsnapshotcáchly PASS đủTypeScript/Vite/2postbuild. Snapshot được sync hai file chuyển cảnh mới cập nhật song song (prepareSceneImages.ts/OpeningCover.tsx), đốichiếu toànsrc/server/publicchecksum PASS rồi mới cài distlatest vàverifyindexhash PASS. Checkpoint giữ các disttrước; source sửa khác đượcgiữ. Lượtcopydistđầu khởi động trước nguồnvalidationxong đãkhôngđạt vì2fileđổi; đãđónggóilạivàđốichiếuxongtrướclầncàicuối. KhôngVPS; candidateae912bddf415 cũkhôngcóaudiofixnày.
- 2026-11-11 piece-motion (đính chính animation-assets): User làm rõ chỉ yêu cầu tối ưu ANIMATION QUÂN CỜ DI CHUYỂN, không phải mở màn. Đã khôi phục OpeningCover và tests/opening-cover từ backup trước task animation-assets (SHA256 OpeningCover khớp), xóa helper prepareSceneImages; hủy quy tắc chờ ảnh/spinner mở màn vừa thêm. Giữ quỹ đạo33mẫu/nâng-hạ/easing/thời lượng400ms của quân, gameplay/clock/audio/avatar/UI khóa. Board memo đường đi theo tọa độ thay identity object, tránh restart khi snapshot cùng nước đi đi kèm selection update. ChessPiece giữ bộ lọc mặt quân ở ảnh ổn định, chuyển drop-shadow cùng thông số ra wrapper để không thay cả chuỗi xử lý mặt quân khi đi/hạ; ảnh decoding async. warmImageCache giữ15ảnh nguồn/decoded dùng chung (14quân+quânúp), không fetch/decode lặp theo mỗi nước, lỗi cho phép tải lại khi mở Board sau; áp dụng mọi nơi dùng Board/ChessPiece. Không thêm loading/đổi thời gian di chuyển hoặc đụng chuyển cảnh. Backup .checkpoints/piece-motion-20261111.35/35tests7suite PASS gồm quânđỏ/đen, nâng-hạ, ănquân, snapshot/marker online và warmcache; TypeScript/Vite buildcáchly PASS, diff-checksource PASS. Chưa đo FPS/browser/điệnthoạithật, không khẳng định hết mọi giật phầncứng/mạng. Chưa deploy; releasecandidate cũ chưa chứa thay đổi này.

- 2026-11-11 mobile match actions: User phản ánh Đi lại/Hoàn tác và Xin thua bị đưa lên cao, xác nhận muốn về giữa gần đáy, ngay trên hàng Back/Menu. MatchActions chỉ đổi compact top var→topauto/bottom56px, giữ size36/gap/thứtự/màu/callback vàdesktop. Không sửa useBoardLayout/avatar/gameplay.21/21tests3suite PASS; browser CSS thật vớicomponentmarkup ở320×568,360×640,390×844,430×932,568×320 đều bottom56px/height36,desktop1366×768 vẫnrelative. Screenshot390 kiểm tra khôngchồngBack/Menu. Buildsnapshotcáchly đanghoàntất, chưaVPS; backup .checkpoints/mobile-match-actions-20261111. GóiVPS ae912bddf415 cũ chưa chứa sửa mobile/audio mới.
- Piece-motion bổ sung2026-11-11: Khi scale responsive đổi giữa nước đi, PieceMotion giữ currentTime và trạng thái nâng do chọn ở đầu nước, không phát lại400ms từ đầu; không đổi33keyframe/easing. Regression đổi scale ở175ms xác nhận tiếp tục175ms và giữlift. Kiểm chứng mãcuối36/36tests7suite PASS +TypeScript/Vite buildcáchlyPASS. Bộảnh ở buildcáchly lượttrước đãqua cả2postbuildPASS; đangđónggóilại mãcuối. OpeningCover/test đãkhớpbackup trước sửa nhầm; không cònprepareSceneImages trongsource/bundle. ChưaFPS/browser/mobilethậtQA, khôngdeploy.

- Kiểm chứng bàn giao piece-motion2026-11-11: Mãcuối36/36tests7suite, TypeScript, Vite và2postbuild ởdist-final cáchlyPASS (finalpassAPPLIED/saved14.6394MiB). Đãbackupdistcũ rồicopydist-final vào board-game/dist, kiểm từngfileSHA256khớp. Khôngcònthayđổimởmànhiểunhầm; giữaudio/adminvàcácsrc khác hiệncó. ChưaFPS/browser/mobilethậtQA, khôngdeploy/VPS; artifactreleasecũcầnlàmmớinếupháthành.

- 2026-11-11 mobile actions đính chính theo user: KHÔNG neo sát đáy/bottom56px. Tâm cụm Đi lại/Xin thua phải nằm giữa mép dưới bàn cờ và mép dưới màn hình. useBoardLayout tínhmidpointtừgetBoundingClientRect trừnửachiềucaocụmnút/clamptrongmain, MatchActionscompactdùngvarnày/cófallback; desktopclass/size/callbackgiữnguyên.21/21tests PASS; Chromeharnesshook+componentthật ở5viewportmobile+desktop+đổilạimobile PASS tâmđúngmidpoint(<1px). npmrunbuildsnapshotcáchly PASS đủTypeScript/Vite/2postbuild; đốichiếufullsrc/server/publicPASS vàcàidistlocal/hashPASS. Giữmọisửaâmthanh/Boardhiệntại, chưaVPS; backup .checkpoints/mobile-match-actions-20261111. Thay quytắc bottom56px trongghi chútrước.
- 2026-11-11 iPad cover: User requires a rigid image-like scene, uniform scale in either orientation, centered brown frame and clipping overflow. fitIPadCanvas now uses max(width/1493,height/731) instead of min; existing centered iframe/transform origin and host clipping retained. Detect desktop-mode MacIntel iPad via multitouch without requiring Mobile UA. Backup .checkpoints/ipad-cover-20261111; rollback only src/ipadCanvas.ts and tests/ipad-canvas.test.ts from that checkpoint. 19/19 targeted tests PASS, npm typecheck PASS; Chrome real rendering harness PASS on 6 iPad portrait/landscape dimensions with centered uniform cover and one persistent iframe. No full production build, physical iPad QA or VPS deploy this task.

- 2026-11-11 mobile-motion recovery: User làm rõ chỉ điện thoại bị giật ở ONLINE và Cờ Tướng với máy; Cờ Úp máy mượt. Hủy yêu cầu rollback toàn VPS, giữ admin và laptop. Đã bỏ split-filter/warm15ảnh của task piece-motion trước; giữ path theo tọa độ và currentTime khi scale đổi. Compact Board Cờ Tướng dùng14mặt quân kết xuất từ đúng renderer cũ (108x112/DPR3), WebP lossless+sRGB ICC để postbuild không nén lossy lại; pixelRGB nhìnthấy/alpha khớp PNGnguồn (0delta). Không đổi glyph/màu/geometry/avatar/quỹđạo33mẫu/easing/400ms; bóng cùng9/13/4*scale. Desktop/CờÚp giữ renderer SVG cũ; ảnhcachedlỗi fallback renderer gốc. Chỉ GamePage mobileCờTướng bật chờ decodeảnh quân rồi2RAF trước OpeningCover600ms; spinnerchung khi chờ, unmount hủy, không đổi clock/server/audio.32/32tests5suite+TypeScriptPASS; localVite+2postbuildPASS,485filesdistSHAkhớp,14ảnhlosslessSHAgiữnguyên. Đãbackup/càilocaldist. ChromeactualCSS390x844DPR3/CPU4x xácnhận32cachedfaces/0SVGfilters/400ms/0restart, khôngexception; baseline32SVG. Hai phépđo tuần tự p95gap44.6→40.4ms/max96→68.9ms nhưng vẫn cógap>50ms; không tuyên bố hếtgiật/FPSđiệnthoạithật. Screenshot1110x1269 meanchannelDelta0.276/255,0.0245%channels>24 (lấymẫuảnh), đãxemlayout. Đo trước thiếumetaviewport/chạyđồngthời test không dùnglàmbằngchứngmobile. Backup/harness .checkpoints/piece-mobile-recovery-20261111 và board-game/.checkpoints/mobile-motion-qa.
- VPS2026-11-11: Read-only xácnhận current hovang-local-20261111-10fafbf55a51, cotuong-test.serviceactive; frontendliveindexSHA2c568b5f83323d63613057c7a48c6841c4dd217f36bc36dbdc7f0a8192b994ca. Hai release11/11 khác12srcfiles(kểcảBoard/ChessPiece/audio/admin), không đoán rollback. Theo userchuyểnlạifixmobilecảlocal/VPS, đãstaging từ đúngnpm-stage releasehiện tại, chỉpatchUI20files (kểindex),1823fileskhác giữSHA gồmadmin/server/public. BuildLinuxTypeScript/Vite/2postbuildPASS,485frontendfiles/14losslessassetshaPASS. GóiUI505files39299725bytes SHA06a6d89f7a2a39174401df4e2961e6af324e24b0eaa9a63110e4e0bdd1da6814 ở /home/cotuong_deploy/.cotuong-incoming/mobile-motion-20261111/mobile-motion-ui.tar.gz. Rootpublisher dựkiến clonehardlinkcurrent, thay riêngdist+sourceUI/giữoldhashedchunks, atomicswitchcurrent, checkindex/admin/health/PIDkhôngđổi, rollbackcurrentnếulỗi; KHÔNGrestart/DB/migrate. Publisher mới chỉ chuẩn bị local PythoncompilePASS/PowerShellparsePASS, chưa upload/chưaartifactpreflight/chưakíchhoạt. Auto-review đãREJECT lệnhuploadpublisher+SSHverify doAGENTS2026-10-22chỉLocal/lệnhthủcông/khôngSSH vàrootactivationrisk; khônglách, chờuserxácnhậnmởđúngphạmvi. Lệnh bịrejectkhông chạy bướcnào. VPSlivechưađổi. FileReview Outputs/Apply-Mobile-Motion-VPS-20261111.ps1; khôngchạy trướcxácnhận/verify. Admin4hash ghim trong ui-ready.json; không đổiUIadmin.

- 2026-11-11 mobile-motion VPS user đã xác nhận rõ “ok đưa lên lại vps nào”, mở đúng phạm vi SSH/cập nhật frontend mobile task này; không mở backend/DB/admin. SSH preflight xácnhận current vẫn hovang-local-20261111-10fafbf55a51, cotuong-test.serviceactive/PID330486, góiUI SHA06a6d89f7a2a39174401df4e2961e6af324e24b0eaa9a63110e4e0bdd1da6814khớp. Publisher đãupload, SHA015756f23251133cc1bca9ba6719ed3c0ccd538f3c0d8859ce22b87aa71c069akhớp; py_compilePASS và --verify-artifactPASS505files/adminPinned/productionChangedfalse. PowerShellclientparse+Bash-ntrênVPSPASS. Auto-reviewđãchophép các bướcSSHsauuserxácnhận. Chưa kíchhoạt: cotuong_deploy chỉNOPASSWD exact/usr/local/sbin/cotuong-deploy-activate(bộSHA40cũ/restart), khôngdùngđườngnàyđểláchquyền hoặc làmngắtván. Cáchfrontend-only cầnusernhập roottrực tiếp bằng Outputs/Apply-Mobile-Motion-VPS-20261111.ps1; clientSSHdeploy/suroot, installpublisherrootprivate+ghimchecksum, khôngghi/logmậtkhẩu. KhôngSSHroot, khôngđổiquyền/sudoers. Chờuserchạylệnhvàkiểmtra activation-result.json; VPSlivechưađổi/lệnhrootchưachạy. Khiuserchạyxong: xácnhậncurrentmobile-motion-20261111-06a6d89f7a2a, liveindexSHAa104dde79392b1084a06bba478dca0ee76ace7d8b1ba6646a1b656793925f900, admin/health200vàbackendPID330486khôngđổi. Nếucurrent/PIDđãđổibởi taskkhác, phảireviewlạikhôngépkíchhoạt.

- 2026-11-11 mobile-motion activation attempt: User chạy Apply-Mobile-Motion-VPS-20261111.ps1 nhưng su trả Authentication failure; chưa qua xác thực root, publisher chưa chạy. SSH đọc lại xácnhận current hovang-local-20261111-10fafbf55a51, serviceactive/PID330486, khôngactivation-result.json, liveindexSHA2c568b5f83323d63613057c7a48c6841c4dd217f36bc36dbdc7f0a8192b994ca nhưtrước. Không tựthửmậtkhẩu/đổiquyền/tắtxácthực; chờusernhậpđúngroottrựctiếptrongterminal hoặc khôiphụcrootquabảngquảntrịVPS. Không deploy thànhcông/khôngsửagiaodiện/gameplay lượt này.

- 2026-11-11 mobile-motion auth đính chính: User xác nhận mật khẩu đang có là nhat_hoang, không phải root; root Authentication failure không chứng minh mật khẩu nhat_hoang sai. Đọc readonlyVPS xácnhận nhat_hoang thuộcnhómsudo, PAMsu khôngbậtwheeldeny. Đãsửa đúng Outputs/Apply-Mobile-Motion-VPS-20261111.ps1: vẫnSSHcotuong_deploy, su nhat_hoang rồi sudo xác thực thôngthường bằngmậtkhẩunhat_hoang(usernhậptrựctiếpterminal,cóthể2lần). KhôngđổiSSHuserquảntrị/root, khôngđổisudoers/password, publisherSHA015756f23251133cc1bca9ba6719ed3c0ccd538f3c0d8859ce22b87aa71c069akhôngđổi. Phát hiện trước khiuserđăngnhậplạilỗi quoting quaPowerShell5.1 của cách&ssharglồng; sửaProcessStartInfo+Windowsnativeargumentquoting, testread-only cùng2lớpshell/sha256sum trênWindowsPowerShell5.1PASSpublisherOK. Sửa checksumprintfescape thànhecholineASCIIghimhash; verifytrựctiếpdeployPASS. Testfilebash-squaGetContentRaw bịCRLF(--\r), khôngdùngcáchpipeđóđểkíchhoạt. ClientcuốiparsePASS; userchưachạyclientnhat_hoang, chưadeploy/VPScurrentvẫnbảncũ. Khôngregenerateclientbằngfinalize-local.pycũvìcheckpointđóvẫndựngsuroot; clientOutputshiệntạilàbảnđúng.

- 2026-11-11 mobile-motion sudoTTY: User đãqua su nhat_hoang(passwordđúng), nhưngsudo báo a terminal is required; chưa thực thi rootpublisher. VPSreadonlyvẫncurrent10fafbf55a51/serviceactive/PID330486. su --help trênVPS xácnhận --pty hỗtrợ; cậpnhật client Outputs/Apply-Mobile-Motion-VPS-20261111.ps1 dùng su --pty nhat_hoang -c sudo... đểgiữPTYcho lời hỏi mật khẩu sudo, khôngdùng-S/askpass/ghi mật khẩu hayđổiquyền. PowerShell5.1 testreadonly bridgePTY(trả/dev/pts/1)+nestedchecksum publisherOK, finalclientparsePASS. ChỉmớikiểmtraTTYdướideploy, chưa tựxácthựcnhat_hoang/sudo hoặc activate; chờuserchạyclientmới. Publisher/codegói/VPSadmin/DB/backendkhôngđổi; cầnkiểmtraactivation-result saukhiuserchạyxong. Đây làlỗi clientthiếuPTY ởsu-c trướcđó, khôngyêucầuserđổimậtkhẩu.

- 2026-11-11 mobile-motion publisher v1 FAILED_ROLLED_BACK sauauththànhcông: Usernhậpcorrectnhat_hoang/sudo; publishercopiedcandidate/hashcheckxongnhưngđổicurrentkhôngđổitrangHTTP. NguyênnhânxácnhậnNginxlocation/proxyall127.0.0.1:3001; server/app.ts staticDirectory tính từimport.meta.urlđãrealpathlúcboot nênExpressvẫnđọcBASE/dist cũkhi giữprocesskhôngrestart. Đây làgiảđịnhsai trongpublishercủaagent, khôngphảimậtkhẩu/mạng. V1đãrollbackcurrent10fafbf55a51, backendactive/PID330486khôngđổi, liveindex2c568...nhưtrước; candidatev1retainedrootowned/chưapháthành.
- Đãsửa publisher-v2 SHA b2cca48c440ba367a980c817b19251f899bcb664ac435547e29ff9e16aeff884 (góiUI505files/505hash/32testsfrontendkhôngđổi). Candidate mobile-motion-20261111-06a6d89f7a2a-v2; dùngrenameat2RENAME_EXCHANGE đổi BASE/dist thậtthànhsymlinkcandidate/distnguyêntử, lưuoriginaldir BASE/dist.before-mobile-motion-06a6d89f7a2a-v2; vérifyHTTPnewtrướcđổicurrent, giữoldchunks, admin/serverinodes, backendPID. Rollbackv2khôiPHỤCCẢstaticpathlẫncurrent, khôngchỉđổicurrent. HandlerHUP/INT/TERM đượcghi report/rollback trongtry. Chưachạyrootv2, chờuserchạyOutputsclientđãupdatepinhash/sourcev2, vẫnsu--pty nhat_hoang/sudo2password, khôngđổiquyền.
- KiểmchứngthựcVPSdướideploy, fixture riêng /home/cotuong_deploy/publisher-v2-qa-* (khôngproduction): táihiệnv1currentđổinhưngExpressvẫntrangold; staticexchangePASS/rollbackPASS/PID+RAMcountergiữ. ChạyCHÍNHpublisher-v2 vớirootmetadata/systemctlhookmôphỏngvà505fileartifactthật trênExpressstaticpinnedfixture: successPASS vàforceHTTPmismatchSAUđổicurrent→rollbackPASS,oldchunksPASS,PID+RAMcountergiữ. Khôngelevate/khôngchạmproduction; fixtuređượcdọn. Hai lỗitestfixtuređãsửa: đườngdẫnẩn.cotuong-incoming khiếnExpresssendFileadmindotfiles404, chuyểntempvềhomekhôngẩn; URLold-chunkphải/assets/old-chunk.js. Remotev2py_compile+verify-artifact505PASS/localclientparsePASS. Prodpreflightcurrentvẫnold10faf/active/PID330486. LầnrootkếtiếpkiểmstatusACTIVATED,currentv2,HTMLa104...,PID330486,staticBackupđúng; nếurollbackthìbáoerrorcụthể(naykhôngđểAssertionErrorrỗng).

- 2026-11-11 MOBILE MOTION VPS ACTIVATED THÀNH CÔNG: User chạy clientv2/su--pty nhat_hoang/sudo thànhcông; publisher statusACTIVATED. Agent SSHreadonly kiểmtra lại current=/srv/cotuong/releases/mobile-motion-20261111-06a6d89f7a2a-v2, cotuong-test.serviceactive/MainPID330486 đúngPIDtrướcdeploy(khôngrestart), /api/healthstatusok. PublicHTTPS/ và/admin cùngSHAa104dde79392b1084a06bba478dca0ee76ace7d8b1ba6646a1b656793925f900 khớpnewindex. Public14ảnhmobileface và2JSrendererbundles đềuSHAkhớpstagedmanifest; /co-up-ong-hoang200/COOPsame-origin/COEPcredentiallessPASS. Admin4sourcehashgiữnguyên, khôngDBaction, retainedOldChunks28; UI505fileartifactgiữchecksumđãverify. Đãthaytrạngtháichờkíchhoạttrướcđó; websitehiệnđangphụcvụbảnsửamobile. CầnuserreloadtrangvàQAđiệnthoạithật, khôngtựkhẳngđịnhhếtmọigiậtGPU/mạng.
- Deploymentlayout sauv2: backendPID330486vẫnCWDreleasecũ hovang-local-20261111-10fafbf55a51; chínhBASE/distnaylàsymlinknewcandidate/dist đểExpresspinnedstaticpathđọcfrontendmới. Originalfrontenddirectorybackup tại /srv/cotuong/releases/hovang-local-20261111-10fafbf55a51/dist.before-mobile-motion-06a6d89f7a2a-v2. KHÔNGxóaoldBASEkhibackendcònchạyởđó. RollbackfrontendphảikhôiphụcCẢstaticpathnàyvàcurrent; chỉđổicurrentkhôngđủ. Candidatev1failedvẫngiữđểaudit; khôngtựcleanup/restart. Nginx/backend/config/auth/schemakhôngđổi. Bảnlocalđãcàifrontendđãtesttrước, VPSstagingdựatrênbaselinehiệntạigiữnguyêncácsrcngoàiphạmvi.

- 2026-11-11 mobile replay gap: User yêu cầu cụm nút tiến/lùi trên điện thoại không đè bàn, cách mép dưới bàn5px. useBoardLayout đo board-frame.bottom trừarena.top+5 và đặt --mobile-replay-controls-top trong nhánhcompact; dùng observer/resize sẵn có, không đo theo từngframe quânđi. GamePage navigation dưới Board neo top biếnchung/items-start, childscale giữ.78 vàorigin-top đểkhôngtrànngược lênkhi vùngdướithấp. KhiBỏAI gộpnavvàotools, tools dùngcùngtop+origin-top/scale.74; toolschưaBỏAIởheadergiữcũ. Desktop/boardgeometry/avatar/responsivecònkhác/callback/replaystate/audio/animationkhôngđổi. Backup .checkpoints/mobile-replay-gap-20261111/GamePage.tsx,useBoardLayout.ts. TypeScript/VitePASS; Chromeactualcomponents+hook ở320x568,360x640,390x844,430x932,568x320 x replay/trial/hidden-ai=15casesPASS,minGap=maxGap5px,0JSerrors; đãxemscreenshotmobile-controls.png. QAfixtureởboard-game/.checkpoints/mobile-motion-qa/controls.html. Chỉlocal; chưaSSH/deployVPS tasknày. BảnVPSmobile-motion...v2đangchạykhôngđổi.

- Bàn giao mobile replay gap2026-11-11: TypeScript/Vite/2postbuildPASS,15browsercasesPASSđúng5px; đãbackupdistlocalvàcàibuildmới/đốichiếuSHA256tấtcảfilekhớp. KhôngdeployVPS/khôngđổiadmin/backend. PhysicalmobileQA chưa làm; Chrome viewportQA đãxácnhậncụmkhôngđèBoard.

- 2026-11-11 room time/increment: User thêm Tạo bàn thời gianván1/2phút, tíchlũy1..10, giới hạnmỗinướckhôngvượtthờigianvánbanđầu. ROOM_MINUTESchungnay[1,2,3,5,10,15,30], dropdownChọnBànđồngbộtựđộng; mặcđịnh10phút/60s/khôngtíchlũygiữ. ROOM_INCREMENT_SECONDS0..10(0Không), roomTurnSecondsFor lọc[30,60,90,120]<=minutes*60; formclampkhiđổi1phút, thêmselecttíchlũy/mobilexếpdọc,desktop2ôcuốicùnghàng; chỉbốcụcTạoBàn. LuồngForm/useLobby/roomApi/controller/RoomService nối tham số cuối đểcaller cũgiữnguyên. RoomSnapshot.incrementSeconds; GameState.incrementMs chỉkhác0; enginecộngFischersaumỗinướchợplệchobênvừađi, khôngchoinvalid/sailượt/timeout/repetition, tổngthờigiancóthểvượtmốcbanđầunhờtíchlũynhưngperturncapgiữbanđầu. Reset/rematch/roomthếriêngiữconfig,undoSnapshotbỏcreditnướcđãhoàntác. CờTướng/CờÚpđềucó. Khôngthayclock/audio/luậtReady/Elo/gold/energy/avatar/UIkhóavùngkhác. DBinitial_stateJSONđãchứafield,migrationskhôngđổi. Backend/enginecóđổi nênlúcdeployphảicậpnhậtđồngbộ/kếhoạchrestartkhôngngắttrận, KHÔNGdùngpublisherfrontend-onlytasktrước.
- Kiểmchứngroomtime: baseline9/9PASS trước sửa; mãcuối79/79tests8suitePASS gồmHTTPcreatevàvalidationthật, mỗiincrement0..10, expiredmove, CờTướng/CờÚp, customroom, reset/takeback, UIclamp+forward, rules/store/locks/intro hồi quy; TypeScriptPASS. Chromeformthật9casesdesktop1366x768/mobile390x844/360x640 xnormal/locked/customPASS, desktopkhôngchồngnút/mobilecóthểcuộntớiallfields/submission1phút60s+10sđúng; đãxem2screenshot. Backup `.checkpoints/room-time-increment-20261111` (8sourcefiles), hướngdẫn `docs/ROOM-TIME-CONTROLS.md`. Chỉlocal,chưaSSH/deployVPS trongtask này. TypeScript/Vite/PNGpostbuildPASS, finalWebPpostbuild đangchờchốtkếtquả.

- Bàn giao room-time/increment2026-11-11:79/79tests8suite+TypeScript+Vite+2postbuildPASS,9browserformcasesPASS. Đãbackup/càidistlocalvàSHA256từngfilekhớp. KhôngSSH/deployVPS/khôngDBmigration. Cóbackend/enginechange nênVPSchưacó1/2phút/tíchlũychođếnkhideployđồngbộđúngsource, khôngtái dùnggóiUI-onlyanimation.

- 2026-11-11: Theo ảnh/user, nhãn Tạo bàn rút gọn thành Thời gian nước đi thay Thời gian tối đa mỗi nước đi trên cả mobile/desktop. Chỉ đổi nhãn và locator test liên quan, không đổi giới hạn/cấu hình/geometry. Backup .checkpoints/room-time-label-20261111. Chưa build/deploy lượt đổi chữ này.

- 2026-11-11: Theo user, hai nhãn Thời gian nước đi/Thời gian tích lũy tăng desktop2.2→2.7cqw bằng nhãn Thời gian chơi mỗi bên phía trên; mobile giữ4.6cqw đã bằng nhau. Không đổi ô chọn/cấu hình thời gian hoặc vùng khác. Backup .checkpoints/room-time-label-size-20261111/CreateRoomForm.tsx. Source/diff-checkPASS; chưa build/deploy lượt chữ này.

- 2026-11-11: Sửa Sẵn sàng sau khi kết thúc bàn Vị trí tùy chỉnh: Board gọi trial.reset thay match.start (useGame nhận replay nên start bỏ qua). Khôi phục đúng thế gốc bằng state trial riêng, không ghi gameStore/socket hoặc sửa UI/luật. Regression chiếu bí→reset, máy thường 3 engine qua 3 ván liên tiếp và replay isolation: 4 suite 22/22 PASS; TypeScript PASS. Chưa browser QA/build dist/VPS. Backup .checkpoints/computer-rematch-20261111.

- 2026-11-11 ĐÍNH CHÍNH TÍCH LŨY CÓ TRẦN: User chốt tích lũy cộng NGAY khi đi nước hợp lệ vào THỜI GIAN CÒN LẠI của bên vừa đi, tốiđa bằng mốc banđầu mỗi bên; không cộng vào thời gian mỗi nước/khôngchờanimation. Ví dụ1phút58s+5s=60s,40s+5s=45s. Quy tắc này thay/hủy phần FISCHER khônggiới hạn ghi trong lượtroom-time trước. Servertạo GameState.initialTimeMs=minutes*60000 khibậtincrement cho CờTướng/CờÚp/thếriêng; reset/rematchgiữcap; engineMath.min(cap,remaining+increment) trongapplyMoveWithResult. Gamekhôngincrementgiữnguyên; fallbacktrần10phútchogamelegacy/local thiếumetadata, onlinecấuhìnhmớiđềucómetadata từserver. Đi lại snapshotskhôiphụcđúngcap; nhánhTrialdùngđồnghồ10phútsẵn có thìđổicapclone10phút đểkhôngtrừnhầm xuống1phút, khôngmutatesource. Giới hạn nước đi/Elo/gold/energy/ready/audio/animationkhôngđổi. CómetadataJSONmới, khôngmigration.
- Kiểmchứngcapped-increment:94/94tests9suite+TypeScriptPASS, gồm0..10increments/đúngtrần1/2/3/5/10/15/30phút/ngay trongSnapshotcùnglastMove/cảhai màu/CờTướng/CờÚp/custom/reset/undo/timeout/HTTP/Trial/rules/store/locks. VitebuildPASS; đangchốthai bướcảnhvàdistlocal (gồmnhãnngắncỡchữlớn màuserđãchốt ở2lượttrước). Backup `.checkpoints/capped-room-increment-20261111`, tài liệuchuẩn docs/ROOM-TIME-CONTROLS.md đãsửanộidungtrầnnày. ChưaSSH/deployVPS/migrateDBtasknày.

- Bàn giao trần tích lũy2026-11-11:94/94tests9suite+TypeScript/Vite/2postbuildPASS; diffchecksourcePASS, đãbackup/càidistlocal485filesSHA256khớp. Build này gồm cả nhãnThời gian nướcđiđãrútgọn vàcỡchữhai nhãnbằngnhãntrênmàuserchốttừ2lượttrước. KiểmtraGamePage/useBetweenMatchClocks trongphaseplayinghiểnthịtrựctiếpgame.remainingTime, khôngchờanimation; creditcùngsnapshotvớilastMove. Chỉlocal; chưaSSH/deployVPS/DBmigration.

- 2026-11-11 đính chính theo user: Yêu cầu đấu máy là đổi bảng kết quả, không phải báo lỗi. Dùng artwork user gửi ĐỎ THẮNG/ĐEN THẮNG theo game.result.winner cho máy Cờ Tướng/Cờ Úp và positionTrial; không theo thắng/thua của người cầm quân. Online giữ victory/defeat cũ. Tái dùng vòng đời popup/đợi hiệu ứng và Xác nhận, vùng bấm phù hợp ảnh ngang; ảnh màu không có ô thưởng. 43/43 tests 4 suite + TypeScript/diff-check PASS. Đã xem ảnh đỏ sau cắt; chưa browser QA/build dist/deploy. Backup .checkpoints/computer-color-result-20261111.

- 2026-11-11 current-release: User yêu cầu kiểm tra bản hiện tại/các thay đổi rồi đưa VPS. Đã snapshot cô lập, đối chiếu với baseline10faf+mobilev2 hiện chạy. Phạm vi gồm popup máy theo màu/Readytrial, mobile replaygap, thời gian1/2phút + mỗi nước/tíchlũycótrần và iPadfallback hiện tại; admin/package/public không đổi runtime. Fullsuite lượt cuối243suite1300PASS/44SKIP/0FAIL; MySQLtạm43PASS; TypeScript/Vite/2postbuildPASS; GitleaksPASS; Chrome6popupcases mobile/desktop/ConfirmPASS, đãxemảnhsource+build. Sửa đúng1assertion ui.test.tsx từ5mốc sang7mốc đãchốt, backup có; rerunfullsuitePASS. Đãcài localdist487files/checksumPASS, disttrước ở .checkpoints/release-current-20261111/dist-before.
- Candidate hovang-local-20261111-0a36c7056a4e: fullmanifest2715files SHA0a36c7056a4ea1c42a1a13947d2cd1dbcec24bb525190b767c170bb4bc2260a1, delta450files8443196bytes SHAe1222dc4b5000f547ea55ab4e5a9819fbc949af4028769e0854cd5daca7ff979. Incoming /home/cotuong_deploy/.cotuong-incoming/<release>; reconstruct2265unchangedfiles từoldnpmstage bằngSHA, npmci/LinuxTypeScriptPASS, Linuxmanifest14301filesSHA83c7b459db1c61bc55fdb201a75a0f0f06a989652f7ac5def8d1d61e0666955f. Khôngsecrets/enginebinary/runtimeuploads/legacyassets/docscheckpoints tronggói. Payloadđầufull770MB đãdừngupload, partialprivate9d61827889c1retained/chưaactivate, khôngtái dùng; chuyểndeltađủmanifest.
- CHƯA KÍCH HOẠT: VPSreadonly cuối currentmobile-motion-20261111-06a6d89f7a2a-v2/MainPID330486/healthok, HTMLa104dde79392b1084a06bba478dca0ee76ace7d8b1ba6646a1b656793925f900. Chờusernhậpnhat_hoang/sudo qua Outputs/Apply-Current-Release-VPS-20261111.ps1 (SSHcotuong_deploy/su--pty, khôngghi mật khẩu). Helperrootgiữpreviousrelease, kiểmtraactiveprivate/publicmatch trướcstop, backupDB+restore-drillscratch, verifySchema cảnew/rollback, KHÔNGmigrate, rồiswapcurrent/start/health/socket/public+admin. MớiđãcompilePython/Bash/PowerShellPASS và4rollbacksimulationPASS, chưachạybackuproot/restart. Newindexdựkiến dd3d7c6dfb5e17459328715627c9fe248e5c87fc5afb4c32435fa15b516a0190; kếtquảthật tại incoming/activation-result.json khiuserchạyxong. HelperSHA8f39e0cee6d8a1bbef3a2435fa0092a8dec8f5fe7f8fa2f79964fa0f35258370; metaSHA0874a7f953c42511c4ac1b467997056ca003170170aad764393abc61c41a5da5. Rollbackđãsửastopnewtrướcswapold/startold vàverifyoldindex; khôngchỉsystemctlstartkhiprocessnewcònactive.

- 2026-11-11 CURRENT RELEASE ĐÃ KÍCH HOẠT: User chạy client/su nhat_hoang/sudo thành công, BACKUP_RESTORE_VERIFIED và DEPLOY_SUCCESS. Agent SSHread-only xác nhận current=/srv/cotuong/releases/hovang-local-20261111-0a36c7056a4e; cotuong-test.service active/MainPID347991; activation-result.statusACTIVATED/migrations0, backup=/var/backups/hovang-local-20261111-0a36c7056a4e. Public/ và/admin cùngHTMLSHAdd3d7c6dfb5e17459328715627c9fe248e5c87fc5afb4c32435fa15b516a0190 đúngcandidate; /api/healthok vàSocket.IOhandshake0PASS. Public41JS/CSS+2artworkselected(trong41) đềuSHAkhớpmanifest, gồmred-wins-CeVFHFeF.webp/black-wins-DgUE8t3Q.webp; /co-up-ong-hoangHTTP200/COOPsame-origin/COEPcredentiallessPASS. Ghi đètrạng tháichờkíchhoạt ghi chútrước: bản mới đãlênVPS, córestartbackendđồngbộtime/increment; khôngmigration. Backup/bảncũgiữ, khôngcleanupoldreleases. ChưaQAđiệnthoạithật/đăngnhập/vánPvPthật trênVPS; khôngtạogame/account hoặcđổitàinguyênđểtest.

- 2026-11-12 theo user: Hiển thị tích lũy bằng huy hiệu tròn nhỏ số+chữs dùng IncrementBadge chung(20px/font10/s8), đọc game.incrementMs/1000. Laptop cạnh PHẢI từng đồng hồ, gapthực7px (liveboxbù1pxviền; recordedwrapperkhôngviền), giữ tâm/geometryđồnghồ/avatar. MobilethaySVGđồnghồcát giữa2đồnghồ bằngcùngbadge, giữgrid/clocks/sideorder; trườnghợpkhôngtíchlũyhiện0s. GamePage truyềncảhaiPlayerCard vàhaiMobileMatchSummary, gồmrecordedclocks; khôngđổiluậttíchlũy/backend. Backup .checkpoints/increment-badge-20261112.16/16tests3suite+TypeScriptPASS, Chromebundledrealcomponents8cases(390/1366×0/1/5/10s)PASS:20×20px/gap7px/mobilecenter/0JSerrors, đãxem2screenshot. Vite+2postbuildlượttrướcPASS nhưngbuildclean mãcuốibịchặn bởithayđổiđồngthờingoàitask: AdminPage.tsx import ./admin.css chưa có (mtime06:45:41). Khôngsửa/rollbackadmin, KHÔNGcài/ghiđèdist hoặcdeployVPStasknày. Không dùngbuildcũđểkhẳngđịnhbảnmớinhấttoànprojectbuildPASS.

- 2026-11-12 increment-badge cập nhật cuối: admin.css đã được tác vụ đồng thời bổ sung; build dist-ready Vite PASS và PNGpostbuild208convertedPASS. Tuy nhiên AdminAnalytics.tsx/admin.css tiếp tục được sửa SAU mốc dist-ready/index.html, nên không dùng build này ghi đè dist local. Phần4filehuyhiệu đã ghim source-hashes.json/Chrome8casesPASS; dist/VPS vẫn giữ nguyên. Không tiếp tục đuổi theo hoặc rollback tác vụ admin ngoài phạm vi.
- increment-badge kết quả build cuối: dist-ready đã PASS đủ Vite và2postbuild (239WebPoptimized/15skip), nhưng KHÔNG cài dist vì2fileadmin mới hơn index build. Không deploy. Kết quả kiểm tra UI16/16+TypeScript+Chrome8/8 giữ nguyên.

- 2026-11-12, quy tắc UI theo user: Tạo bàn mobile đặt Thời gian nước đi và Thời gian tích lũy cùng một hàng. Laptop menu tích lũy luôn mở xuống dưới, có cuộn/keyboard/Escape/click ngoài; giữ lựa chọn Không/1–10 và luật cộng ngay có trần. /admin được user yêu cầu thiết kế lại: giao diện xanh đậm/vàng, các khối tổng quan/bộ lọc/bảng/quản lý tài khoản đồng bộ, CSS scope riêng admin. Hai ô tìm ID có × chung; bộ lọc thống kê xóa cả query đã áp dụng, về danh sách người chơi/trang đầu ngay. Quản lý tài khoản xóa query/tải danh sách không lọc. Không đổi auth/backend/DB/UI game hoặc vùng khóa. Backup .checkpoints/admin-room-ui-20261112; chỉ local, chưa VPS. Kết quả kiểm chứng cuối ghi ở AI_CHANGELOG.md.

- Bàn giao 2026-11-12 admin/time UI: 21/21 tests (5 suite), TypeScript, Vite và hai postbuild PASS. Chrome 9 room cases + admin desktop/mobile PASS; ảnh đã xem. Đã sao lưu dist cũ và cài dist-final local 488 files, từng file SHA256 khớp. Chưa deploy VPS, chưa QA điện thoại thật; không thay backend/auth/DB hoặc UI game ngoài hai ô thời gian được yêu cầu.

- 2026-11-12 theo user tăng nhẹ huy hiệu tích lũy: IncrementBadge chung đường kính20→22px, số10→12px, chữs8→11px. Áp dụng tự động laptop/mobile/live/replay; giữ neo/gap7px và gridmobile, không đổi đồng hồ/avatar/luật. Badge22px vẫn vừa khe24px giữa hai đồng hồ mobile, còn1px mỗi phía. Backup .checkpoints/increment-badge-size-20261112. Đối chiếu source/diff PASS; chưa build/browser/VPS lượt tăng cỡ này.

- 2026-11-12 theo user tăng tiếp huy hiệu tích lũy và đổi cam sữa: IncrementBadge chung đường kính22→28px, số và chữs cùng15px (bỏsnhỏriêng), viền1px và chữ cùng#f0bd80, nền#503a23 nhưkhungđồnghồlaptop. Laptop giữneo/gap7px. Mobile nớicộtgiữa16→28px đểbadgekhôngđè2đồnghồ, giữcăngiữacụm/hướngclock/cỡ2clock; khôngđổiluật. Thaycỡ22/12/11 ởghi chútrước. Backup .checkpoints/increment-badge-orange-20261112. Source/diffcheckPASS; chưa build/browser/VPS lượtđổicỡmàunày.

- 2026-11-12: User chốt Nhận được chỉ trình diễn một lần. HomeRewardNotifications chụp batch, ghi receipt NGAY sau showModal thành công, không chờ Xác nhận; giữ UI/preview tới khi đóng, đồ mới tới chờ batch sau. Về Home/remount/reload không replay. homeRewardsStore đọc localStorage mới nhất, hook nghe storage event; ledger mã đã trình diễn và union danh hiệu từng thấy ngăn snapshot mất/tái xuất hiện hoặc regrant báo lại đồ cũ (thay quy tắc29/10 cho báo lại danh hiệu). Profile thiếu cosmetics không được coi kho rỗng, chờ inventory thật để baseline, tránh báo avatar/viền cũ khi hydrate. Chỉ receipt trình duyệt, không thêm server/DB hoặc cấp đồ. Menu tích lũy laptop theo ảnh user: nền nâu/font Times/dòng chọn xanh/bỏ checkmark, vẫn mở xuống cuộn. Backup .checkpoints/reward-once-select-style-20261112; kiểm chứng cuối AI_CHANGELOG.md; chưa VPS.

- 2026-11-12 theo user thu nhẹ huy hiệu tích lũy: đường kính28→26px, số/chữs15→14px qua IncrementBadge chung laptop/mobile/live/replay. Giữ cam sữa#f0bd80, viền1px, nền/neo/gap và cộtgiữa28px. Backup .checkpoints/increment-badge-trim-20261112. Đối chiếu2sizetokensPASS; chưa build/browser/VPS lượtthu này.

- Bàn giao reward-once/select-style 2026-11-12: 18/18 tests (4 suite), TypeScript, Vite và 2 postbuild PASS; Chrome 9 form cases + reward laptop/mobile PASS, ảnh đã xem. Đã backup/cài dist-final local 488 files SHA256 từng file khớp; mã liên quan không mới hơn build. Không SSH/deploy VPS hoặc thay dữ liệu thật. Receipt chỉ lưu ở trình duyệt, không thêm đồng bộ server.

- 2026-11-12 theo ảnh user: menu tích lũy laptop căn trái, padding trái 20%/phải 15% cùng trường chọn thời gian nước đi; thay căn giữa và padding 12px của lượt trước. Chỉ khoảng đệm option, không đổi mobile/giá trị/luật. Backup .checkpoints/increment-menu-padding-20261112. TypeScript PASS; chưa build dist/browser/deploy lượt chỉnh nhỏ này.

- 2026-11-12 theo ảnh user: Tạo bàn mobile đưa công tắc Bàn khóa về cạnh phải nhãn ở bên trái hàng, justify-start/gap16px thay justify-between đẩy sát mép phải. Laptop, kích thước công tắc và hành vi khóa giữ nguyên. Backup .checkpoints/room-lock-toggle-left-20261112. Chỉ source local, chưa build/browser/VPS lượt chỉnh vị trí này.

- 2026-11-12 UI release READY_NOT_ACTIVATED: user yêu cầu kiểm tra local và đưa VPS, đã đối chiếu13srcfrontend (admin/search×, tạo bàn/menu/lề/côngtắctrái, badge26px/chữ14/cam sữa, receive-once); backend/public/package không đổi. Fullsuite1308PASS/44SKIP/0FAIL; TypeScript/Vite/2postbuild/Gitleaks/LinuxsourceTypecheck/Chrome9room+2rewardPASS. Đã backup/càilocaldist488fileSHAkhớp. Artifact501files38634523bytes SHA6db469245b9c1c2d6113abce4b616315154158f3178e812a31f9d06a4801eef4, candidateui-20261112-6db469245b9c, newindex283b71c0e11f443185144bed4fc4561d67b0cd5a4f686b583bb7f70b73535459. Upload privateincomingui-20261112 +checksum/verify501PASS. PublisherSHAafbf4174994282fbdc73b7a817322b15b1fcf3276c2594cc6bac9dd5f131e5ed; fixtureexactpublisher success+forcedfailure rollback cảBASE/dist/currentPASS, samePID/RAM. Khôngrestart/DB/migrate. Rootpreflight127protectedhash+9oldUIhash/PID347991/current0a36/cwd/staticlayout; nếu khác thìdừng. Client Outputs/Apply-Local-UI-VPS-20261112.ps1 đãPS5.1parse/bash-nPASS, user cần nhậpnhat_hoang/sudoởterminal(su--pty)nhưtrước; chưachạyroot/chưaactivate. Prodcuốivẫncurrent0a36/PID347991active/HTMLdd3d... . Sauuserchạy kiểmactivation-result.statusACTIVATED/currentui-new/index283b.../PIDkhôngđổi/publicadmin/assets. Backupsource/artifact/log .checkpoints/release-ui-20261112. Đừngtuyênbốđãlênkhiuserchưachạyclient.

- 2026-11-12 GitHub handoff theo user: tạo nhánh codex/share-current-20261112 từ local hiện tại, merge origin/master để giữ CODEOWNERS mới. Gom source/assets/public/migration021–023/tests/docs hiện hành, loại diagnostics .txt, .githead, secrets, binary/NNUE native, dist/node_modules/runtimeuploads và checkpoints. Không có import adapter engine HOVANG-only trong runtime được chia sẻ. Snapshot từ index (không dựa file ignored) đã typecheck/lint/VitePASS; Gitleaks snapshotPASS. Fullsuite local ngay trước task1308PASS/44SKIP/0FAIL. Hướng dẫn clone/setup tại docs/DEVELOPMENT-HANDOFF.md. Giữ pre-push hook bắt buộc, không push master/không kích hoạt CD hoặc VPS. Biên nhận SHA/push lưu .checkpoints/github-share-20261112.
