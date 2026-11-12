- 2026-10-27: User đính chính thứ tự tiện ích bàn cờ LAPTOP trái→phải là Lưu → Ba gạch → Phóng to (order1/2/3), thay thứ tự trước. Back mr-auto giữ cụm tiện ích sát phải cả khi nút Lưu ẩn; mobile giữ nguyên. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: User chốt thứ tự tiện ích bàn cờ LAPTOP từ trong ra ngoài (trái→phải): Toàn màn hình → Ba gạch → Lưu ván đấu. Dùng desktop order1/2/3 trong header, menu neo dưới ba gạch; mobile giữ nguyên. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Theo user đổi thứ tự tiện ích bàn cờ LAPTOP: cụm Lưu/Toàn màn hình đứng trước nút ba gạch (desktop order1/2); mobile giữ thứ tự hiện hành. Build/typecheck PASS; dist xác nhận; chưa browser QA.

- 2026-10-27: Theo user, bàn cờ LAPTOP bỏ nút ghim Lưu thế cờ, hiện nút ba gạch; menu chung chứa Bạn bè/Âm thanh như mobile, mở xuống dưới trên laptop và lên trên trên mobile. Lưu ván đấu/Toàn màn hình laptop giữ ngoài menu; giữ callback và điều kiện replay/máy. Mobile giữ vị trí/menu cũ. Build/typecheck PASS; dist xác nhận; chưa browser QA.

# Bàn cờ điện thoại — bố cục thử sau mốc A

- 2026-10-27: Sửa tiếp theo phản hồi user: chat mobile chỉ kích hoạt bàn phím sau pointerdown trực tiếp input. Input readonly khi chưa chạm hoặc sau blur; chạm input bỏ readonly ngay trong gesture. Pointerdown ngoài input trong Chat blur và khóa lại input; bỏ preventDefault giữ focus của icon, mở/đóng panel cũng blur. Thay quy tắc giữ focus cũ. Build/typecheck PASS; dist cập nhật có readonly gate; chưa QA bàn phím điện thoại thật.

- 2026-10-27: User xác nhận chat trong trận chỉ bật bàn phím khi bấm ô nhập. useChat bỏ focus tự động khi gửi tin/gợi ý và chọn emoji; vẫn cập nhật caret mà không focus, giữ cơ chế tránh mất focus khi đang gõ. Icon Chat ngoài bàn vẫn mở panel như cũ. Áp dụng hook chung mobile/laptop, không đổi socket/nội dung. Build/typecheck PASS; dist cập nhật; chưa browser/bàn phím thiết bị thật QA.

Ngày 2026-10-24, người dùng yêu cầu bố trí lại UI điện thoại theo ảnh tham chiếu.

- Mốc hoàn tác được giữ tại `docs/checkpoints/board-ui-A/`; không ghi đè snapshot này.
- Hai người chơi nằm trên cùng: người đang chơi ở phía trái theo `leftSide` hiện có, đối thủ bên phải. Khán giả giữ hai phía theo màu; không tự đổi phe hoặc xoay bàn.
- Avatar giữ nguyên 64px và artwork/khung đang dùng. Tên nằm dưới avatar, Elo dưới tên; Elo tiếp tục hiện khi đấu ở bố cục mới.
- `MobileMatchSummary` hiển thị mã phòng thật ở giữa, phía trên hai đồng hồ theo màu tương ứng với người trái/phải. Các giá trị lấy trực tiếp từ game/room state; replay/đánh thử không hiện đồng hồ chạy giả.
- Hàng trên dành 164px. Bàn cờ vẫn dùng Board/geometry cũ, co theo vùng còn lại và giữ khoảng 90px tối thiểu dưới bàn cho điều khiển.
- Menu, lưu, chat và xem người trong phòng chuyển về đáy; menu phụ mở hướng lên. Cầu hòa/xin thua/đi lại nằm hàng phía trên cụm tiện ích. Like và điều khiển replay/đánh thử cũng chuyển xuống dưới, giữ callback cũ.
- PlayerCard chỉ bật bố cục mới khi `compactViewport`; laptop giữ nhánh bố cục cũ. Không sửa luật, đồng hồ server, ghế, thưởng hoặc phiên hiệu ứng.

## Kiểm chứng

- Build/typecheck thành công, dist cập nhật.
- Đối chiếu SHA256: snapshot A còn nguyên 323/323 file.
- Chưa QA trực tiếp trên trình duyệt/điện thoại; không tuyên bố đã xác minh pixel hoặc bàn phím thực tế.

- 2026-10-24: Theo user thu nhỏ cụm người chơi MOBILE: avatar64→56px riêng mobileHeader, nameplateclamp84/26vw/108 thay96/30vw/124, Elo cao24/icon15/chữ13/đệm8. Hai cụm neo left/right2px và cột(100%-144)/2 để nhích ra ngoài. Clock nhỏ70×25/chữ14 đặt cạnhnhau (trái/phải đúng leftSide/rightSide) thay2hàng; mãphòng ởtrên. Desktop/clocklogic/checkpointA giữ nguyên. Build/typecheck PASS; dist xác nhận nameplate mới; chưa browser QA.

- 2026-10-24: Theo user, bỏ nhãn màu Đỏ/Đen hiểnthị trên clock (aria giữ), avatarheader56→60px kéo danhhiệu/sao cùng tỷ lệ, hai cột user thu(100%-160)/2 để nhíchra2bên. Clockcao24 ngangElo; hook đo rect[data-player-elo] thật ghi --mobile-clock-top, observer identity tựcăn khi tên/profile/layout đổi; fallbackcalc chỉtrướcđo. Tên/Elo/cỡclock khác/laptop/mốcA giữ. Build/typecheck PASS; dist xác nhận --mobile-clock-top; chưa browser QA.

- 2026-10-24: Theo user tăng cụmuser MOBILE: avatar60→64px kéo danhhiệu/sao theo; chữname tăng24→26/180 theo width nameplate (giữwidth để khôngtrànmép), ELOcao26/icon16/chữ14/đệm9. Mãphòng108×52→120×58/chữ14 và riêng plaque top+6px, khôngdịchclock; clockvẫnđo theoElo thật. Desktop/mốcA khôngsửa. Build/typecheck PASS; dist xác nhận plaque top6/120×58; chưa browser QA.

- 2026-10-24: Theo user, header bàncờ MOBILE avatar64→68px (danhhiệu/sao theo tỷlệ), chữname26→28/180 theo width hiệncó; Elo thu cao26→24/đệm9→8/icon16→15/chữ14→13. Nút View khôi phục cao26px như snapshotA, giữ neo đáy hiện16px. Clockđo theoElotiếp tục, fallback cậpnhậtavatar. Desktop/mốcA giữ. Build/typecheck PASS; dist xác nhận name28/180; chưa browser QA.

- 2026-10-24: Theo user, tên header bàncờ MOBILE hiểnthị đầyđủ, không...: PlayerNameplate thêm fullName opt-in/khôngtruncate/chữsốkhôngthu0.9em, đệm4px/tựxuốngdòng nếu dài và tựtăngcao biển; chỉPlayerCard mobileHeader bật, cáctab/laptop giữmặcđịnh.3nút Lưu/Chat/Menu thu44→36px/icon20 như tiệních Chọn Bàn, slotchat/offset46/headerh36 đồngbộ; núttrongmenu cũng36. ClockvẫnđoElo theoidentityheight. Build/typecheck PASS; dist xác nhận fullName; chưa browser QA.

- 2026-10-25: Theo user, bàn cờ MOBILE tăng biển mã phòng120×58→144×70/chữ14→17; thêm SVG đồng hồ cát giữa hai clock. View căn giữa dưới mép Board5px bằng vị trí đo thật trong useBoardLayout; Back chuyển về góc trái đáy chỗ View cũ, bỏ Back trùng trong menu. Cụm thao tác giữa màn hình theo thứ tự Cầu hòa / Đi lại / Xin thua qua order compact. Giữ callback/logic và nhánh desktop; chưa browser QA.

- Kiểm chứng lượt bố trí mobile2026-10-25: tăng vùng điều khiển dưới bàn90→144px và đồng bộ phép fit Board để View không chồng hàng thao tác ở màn thấp. Build/typecheck PASS, dist xác nhận mã vị trí View/icon mới; chưa browser QA.

- 2026-10-25: Theo user, Board trong GamePage MOBILE phủ toàn chiều ngang arena, không còn thu theo chiều cao còn lại; chiều cao giữ tỷ lệ1296/1134. useBoardLayout(fullMobileWidth) bật riêng GamePage; Vị trí tùy chỉnh và desktop giữ chế độ fit hiện hành. Thay quy tắc fit mobile phía trên. Build/typecheck PASS; dist index-CGGl5x7k.js xác nhận nhánh full width; chưa browser QA.

- 2026-10-25: Theo user, GamePage MOBILE ẩn viền inset ngoài và hai hoa văn góc; Like chuyển lên cạnh trong avatar, hai bên mã phòng (top28px, trái center-103px/phải center+76px). Cụm Cầu hòa/Đi lại/Xin thua căn giữa dưới View8px, top đo theo Board.bottom+39px thay neo đáy; View vẫn cách Board5px/cao26px. Giữ avatar/desktop/callback/luật. Build/typecheck PASS; dist index-_nCNFBPR.js xác nhận vị trí Like/thao tác; chưa browser QA.

- 2026-10-25: Theo user, Cầu hòa/Xin thua MOBILE đổi thành nút tròn36px cùng nền radial/viền/bóng với Đi lại, dùng mobileRoundAction chung cả3. Icon SVG bắt tay/lá cờ26px ở giữa; nhãn mobile sr-only và aria-label/title giữ ý nghĩa. Desktop và callback/disabled giữ nguyên. Build/typecheck PASS; dist xác nhận kiểu nút tròn/icon; chưa browser QA.

- 2026-10-25: Theo user, Cầu hòa/Xin thua MOBILE dùng lại ký hiệu cũ 🤝/⚑ thay SVG mới; đổi icon trắng qua filter brightness(0) invert(1), giữ nút tròn và bố cục/desktop. Build/typecheck PASS; dist xác nhận icon cũ/filter trắng; chưa browser QA.

- 2026-10-25: User đính chính icon Cầu hòa/Xin thua MOBILE phải nét viền trắng/rỗng như Đi lại, không phải emoji tô kín. Thay filter emoji bằng SVG fill none/stroke currentColor trắng, viewBox32 và nét2.4/bo tròn/cỡ30px như icon Đi lại; giữ kiểu nút, desktop và callback. Build/typecheck PASS; dist xác nhận icon outline trắng; chưa browser QA.

- 2026-10-25: Theo user, icon Cầu hòa/Xin thua MOBILE chuyển sang vàng kem currentColor kế thừa mobileRoundAction (#ffe69b) như Đi lại; tô đầy hình bắt tay và lá cờ. Bắt tay có nét phân tách ngón màu nền nâu để rõ hình, cờ giữ cán nét và phần vải tô đầy. Kiểu nút/bố cục/desktop/callback giữ nguyên. Build/typecheck PASS; dist xác nhận icon tô đầy/màu kế thừa; chưa browser QA.

- 2026-10-25: Theo user, icon bắt tay Cầu hòa MOBILE gọn26px, đơn giản silhouette/ngón và giữ vàng kem. Like căn giữa khoảng trống thật từ mép avatar tới mép mã phòng bằng đo rect/ResizeObserver, căn giữa dọc avatar; không đổi geometry avatar. Ô Elo mobileHeader cố định60px (=đệm16+icon15+gap3+số4ch26), số giữ4ch theo font13px nên điểm ít/nhiều không co khung. Giữ desktop/logic. Build/typecheck PASS; dist xác nhận đo Like và ô Elo4ch; chưa browser QA.

- 2026-10-25: Theo user, icon Cầu hòa MOBILE tối giản hình bắt tay chỉ còn silhouette/tay áo và một nét nếp gấp, bỏ nét ngón rườm rà. Cả cụm3nút dịch phải2px (left calc50%+2px); Back dịch trái2px (left10→8px). Giữ desktop/chức năng. Build/typecheck PASS; dist xác nhận offset mới; chưa browser QA.

- 2026-10-25: User đính chính cụm cần dịch phải2px là Lưu/Chat/Menu, không phải Cầu hòa/Đi lại/Xin thua. Trả MatchActions về center50%; header tiện ích mobile right10→8px, Chat portal đồng bộ offset46→44px. Giữ Back left8px theo yêu cầu trước. Build/typecheck PASS; dist xác nhận offset cụm tiện ích và center cũ; chưa browser QA.

- 2026-10-25: Theo user, dịch riêng cụm Cầu hòa/Đi lại/Xin thua MOBILE sang trái2px so với tâm (left calc50%-2px). Giữ cụm tiện ích/Back và desktop. Build/typecheck PASS; dist xác nhận offset trái2px; chưa browser QA.

- 2026-10-25: Theo user, các nút tiện ích MOBILE back/sound/chat/menu/save/friends/reset/trash đồng cỡ dock Home: token mobileUtilityTokens ởuiClasses size min(12.5vw,56px)/icon28px. Game/RoomSelection/ComputerSetup/CustomPosition/Shop áp dụng; Home dock không đổi hình học, laptop chỉ thêm customproperty khôngđổi style. Bỏ override36/icon20, slotchat theo cùngsize/portaloffsetcalc8+size+gap; popupmenu mởtrên size+12, headerroom/computer cao size+12 để khôngtràn. GiữView/MatchActions/avatar/khóaUIkhác. Build/typecheck PASS; dist xác nhận token; chưa browser QA, snapshotA khôngsửa.

- 2026-10-25: Theo user, tạm ẩn riêng nút Cầu hòa cả laptop/mobile bằng SHOW_DRAW_BUTTON=false trong MatchActions; giữ nguyên JSX/icon/callback để bật lại bằng true. Xin thua/Đi lại và xử lý lời mời hòa hiện có giữ nguyên. Build/typecheck PASS; dist cập nhật, nút drawButton được loại khỏi bundle; chưa browser QA.

- 2026-10-25: User thu lại lượt tăng nút tiện ích MOBILE bằng Home: hiện chỉ tăng nhẹ so với gốc36px/icon20 lên40px/icon22, thay size min(12.5vw,56px)/icon28 của lượt trước. Đồng bộ slotchat/portaloffset/header/popup theo40px; Home/laptop/View/avatar giữ nguyên. Build/typecheck PASS; dist index-BKiDThIc.css có token40px; chưa browser QA. Không sửa checkpointA.

- 2026-10-25: Theo user, View MOBILE mở panel qua portal document.body z900 để vượt stacking context avatar/Board/tiện ích, giữ vị trí/kích thước và nhánh desktop. Thu chữ số tên mobileHeader về0.9em qua NumberText compact; tên trong panel View mobile thu thêm về0.9em để cân với chữ. Không đổi avatar/logic. Build/typecheck PASS; dist xác nhận lớp panel mới; chưa browser QA.

- 2026-10-25: Theo user tăng nhẹ tiếp nút tiện ích MOBILE40→42px/icon22→24px; slotchat/header/offset và menu đồng bộ42px. Home/desktop/View/avatar không đổi. Build/typecheck PASS; dist xác nhận token42px; chưa browser QA.

- 2026-10-25: Theo user, chữ số trong tên mobileHeader và danh sách View thu thêm0.9→0.85em, chỉ số/không đổi chữ. Panel View MOBILE hạ3px (bottom64→61px). Build/typecheck PASS; dist xác nhận cả2thay đổi; chưa browser QA.

- 2026-10-25: Theo user, hạ khung View MOBILE thêm3px, bottom61→58px. Build/typecheck PASS; dist xác nhận bottom58px; chưa browser QA.

- 2026-10-25: Theo user, icon View MOBILE giữ vị trí giữa dưới Board5px, tách biến vị trí riêng trên main khỏi khung portal. Khung View thêm lớp bấm ngoài trong portal z899, panel z900 để đóng khi chạm ngoài, chỉ mobile. Giữ panel bottom58px/desktop. Build/typecheck PASS; dist xác nhận vị trí icon/lớp đóng ngoài; chưa browser QA.

- 2026-10-25: Theo user, Chat MOBILE mở có backdrop trong portal z499 dưới panel z500; bấm ngoài chỉ blur/đóng Chat ở click, giữ backdrop suốt pointerdown→click để không truyền chọn/đi quân hoặc bấm UI phía dưới. Bỏ listener document pointerdown đóng sớm ở useMobileChatOverlay, hook chỉ đo viewport (giữ tham số tùy chọn tương thích nơi gọi cũ). Desktop giữ nguyên. Build/typecheck PASS; dist xác nhận backdrop; chưa browser QA.

- 2026-10-27: Khung trang toàn project được cố định ở index.html bằng body fixed/inset0/root hfull overflowhidden, overscroll bị chặn ở html và giới hạn tại danh sách cuộn. Giữ layout/geometry bàn, cuộn panel và hỗ trợ nhập liệu; build/typecheck PASS, chưa QA điện thoại thật.

- 2026-10-27: User báo trong trận vẫn bị dịch khi kéo sau lượt khóa viewport CSS. Thêm useGameViewportLock chỉ gắn khi GamePage mount (online/máy/replay/trial), touchmove nonpassive ngăn pan/bounce ở vùng không cuộn hoặc mép danh sách; cho cuộn đúng hướng trong panel thực sự scrollable, giữ đa chạm/select/range và thao tác tap. Listener trên document để bao phủ chat/view portal, dọn đầy đủ khi rời GamePage. gameScreen fixed/inset0/overflowhidden/overscrollnone, không đổi geometry/avatar/bố cục trong bàn. Regression3/3 PASS (mặt bàn/chạm mép/cuộn chat/đa chạm/cleanup), build/typecheck PASS, dist cập nhật. Chưa kiểm tra iOS/Android/keyboard thật nên chưa khẳng định hết mọi trường hợp dịch màn hình.


- 2026-10-29: Theo user riêng MOBILE: căn Like theo trung điểm khe ngang giữa mép avatar và mép khung mã phòng thực; useBoardLayout đo lại sau opening/đổi phiên/resize, dùng bề ngang hiển thị Like. Bỏ nút ⋯ cạnh avatar trong bàn khóa; khi chủ giữ avatar mở Phong danh hiệu, nút vàng Cài đặt người chơi nằm đầu panel trước tiêu đề/danh sách, mở đúng menu quản lý mục tiêu cũ. Chuột phải laptop, menu dòng View và quyền server giữ nguyên. Không đổi geometry avatar/khung mã phòng.

- 2026-10-29: User báo giữ avatar MOBILE không mở Phong danh hiệu. Thêm useAvatarTouchHold bắt touchstart/move/end native passive:false, ngăn browser giữ ảnh/pan và native synthetic click; giữ550ms dùng callback mới nhất, không bị reset bởi clock rerender. Tap ngắn button.click để giữ mở hồ sơ/âm UI; giữ lâu nuốt click, rê>10px/touchcancel/đổi target/unmount hủy timer. Pointer handlers cũ chỉ xử lý mouse/pen, avatar touch-none/callout-none/chặn drag. Không đổi geometry/quyền phong/desktop. Chưa thiết bị thực QA.

- 2026-11-02: Theo user, làm lại MatchIntro đối đầu: Elo cao dải cam trên/đi từ trái, thấp dải xanh dưới/đi từ phải, bằngElo Đỏ trên; avatar+viền+tên vàElo lấy useDatabaseProfile theo userId/variant như PlayerCard, khóa snapshot thứ tự lúc intro hiện. SVG hai kiếm giữa, WAAPI1300ms giữ clock/âm/luật:24%vào nhanh,24–65%trôi chậm(-16→16),65–82%bay tiếp vàmờ1→0 trong50px(16→66), cuối bay khỏi khung. Backdrop blur/nền tối, responsive cả viewport, reduced-motion giữ hình tĩnh. Chỉ geometry avatar trong hiệu ứng mới được sửa theo quyền user; PlayerCard/avatar nơi khác giữ. Backup outputs/backups/match-intro-versus-20261102. match-intro-versus+room-entrance4/4PASS, TypeScript/Vite buildPASS, dist GamePage kiểm mới; chưa browser/motion thật QA. UI xem thử, không chốt khóa mới.

- 2026-11-02: User yêu cầu intro giữa chậm hơn, dải thấp hơn, blur nền nhẹ và không chạy clock trong hiệu ứng. MATCH_INTRO_MS1300→2600 dùng chung hook/startGame local/RoomService; server vẫn authoritative, chặn move và không trừ tổng/lượt trước lastClockUpdate. Dải vào12%, giữa12–74%(~1612ms), mờ50px đến90%, thoát100%; cao cụm clamp210/38vh/300 thay260/52vh/400, avatar56–88 thay64–112 riêng intro. Nền tối30%/blur4px. GameSounds delay tick theo token chung (policy tick vẫn tắt). Đồng bộ fixture thời gian intro về token, không đổi assertion nghiệp vụ cũ. Backup outputs/backups/slower-match-intro-20261102. Final6suite35/35PASS gồm engine/server không trừgiờ/chặnmove vàhook giữa>1500ms/cònhiện ở1300ms. Build TypeScript/Vite đãPASS, đang chờ postbuild tối ưu ảnh kết thúc; chưa browser2thiết bị QA. Backend cần nạp mã mới để áp dụng2600ms online, không restart/deploy.

- 2026-11-02: Theo mẫu user, MatchIntro thay2kiếmSVG bằng3lớpPNG1254² nềnalpha: emblem(khiên+vòng+lá), sword-left/sword-right; built-in image_gen edit ảnh thamchiếu, táidựng phần che. Asset/prompt/source/reference tại src/assets/match-intro. Huyhiệu translateZ360→0/scale bounce như đậpvào;2kiếm độc lập trượt chéo từ gần±36px, vào nhanh300ms rồichậm1000ms, thoátngắn/mờ. Thêm2tamgiác hướng vào giữa ở2đầu mỗi dải. MATCH_INTRO_MS2600→2000 chia300vào+1000giữa, chung server/local/tick/audio; clockvàmove vẫnchờtoken. DảiElo/avatar/viền/tên/cam-xanh/blur giữ. Backup outputs/backups/match-intro-layered-20261102.6suite35/35PASS (giữa1s, Z, kiếmnear36, alphaảnhkiểmtrựcquan, clockserver/engine); build đangchờ2postbuild tốiưuảnh, TypeScript/Vite xong. Chưa browsermotion/2thiếtbịQA; backend cần nạpmã2s, khôngrestart/deploy.

- 2026-11-04: Bản local dùng fitContent cho tên PlayerCard cả laptop/mobile: chiều rộng theo nội dung cộng padding20px mỗi bên, không ép tối thiểu90px; theo đính chính user hiện trọn tên một dòng, bỏ ellipsis và giới hạn chiều rộng. Không đổi avatar.


- 2026-11-04: User hủy thử style Home cho tên bàn đấu: hoàn tác cỡ chữ/khung về token170 desktop và clamp84/26vw/108 mobileHeader trước thử Home; giữ tên đầy đủ và padding20px. Không sửa Home/avatar.

- 2026-11-04: User đặt thẻ tên bàn đấu tối thiểu140px cả laptop/mobile, vẫn w-max theo tên đầy đủ/padding20px. PlayerNameplate fitContent áp dụngmin140, không đổi geometryavatar.

- 2026-11-04 (đính chính mới nhất): min-width thẻ tên trong bàn đấu mobile120px, thay140px riêngmobile; desktop140px giữ, không đổi font/padding20/đầyđủtên/avatar.

- 2026-11-04 mới nhất supersedes min120: CHỈ thẻ tên trong trận mobile min100px; desktopmin140/Home fixedWidth/padding20 khôngđổi.

- 2026-11-10: Theo user, hiệu ứng chuyển bên lớp phủ xanh và viền thời gian trong PlayerCard dùng 120ms (trước 350ms), đồng bộ laptop/mobile; không đổi clock hoặc geometry avatar. User báo quân giật trước khi đi: Board bỏ animation hạ wrapper riêng, nối độ nâng khi chọn vào cùng quỹ đạo bay 400ms để tránh hạ quân rồi mới trượt. Regression animation/online/player/clock 14/14 PASS; typecheck và Vite PASS; chưa browser QA.

- 2026-11-10 (phản hồi tiếp): User vẫn thấy quân đứng một nhịp trước khi đi ở cả online/máy. Board chung nhận primary pointerdown thay vì chờ click sau nhả; bỏ click chuột/touch trùng, giữ click detail=0 cho keyboard/assistive. Quỹ đạo bay dùng tốc độ linear thay ease-out để không có đoạn gần như đứng cuối nước. Giữ 400ms/độ nâng/luật và xác nhận server online. 41/41 targeted tests PASS, TypeScript PASS; chưa browser QA, chưa khẳng định đã loại độ trễ mạng online.

- 2026-11-10 (đính chính theo user): Hoàn tác riêng lượt piece-immediate: Board trở lại onClick và easing cubic-bezier(0.22,0.61,0.36,1); bỏ test pointerdown. Quy tắc pointerdown/linear ở ghi chú trước đã hủy; giữ khung thời gian120ms và bản quỹ đạo trước lượt này. Kiểm tra âm khai cuộc: useMoveSound phát khi phase chuyển sang playing, không phụ thuộc thao tác Ready; về ready reset cờ intro nên ván tự bắt đầu kế tiếp vẫn gọi phát. Thêm regression ready→playing→finished→ready→playing, không bấm Ready, mỗi ván gọi intro và snapshot lặp không gọi thêm. 6suite40/40tests PASS; typecheck PASS. Chưa nghe trực tiếp trên trình duyệt; mute/autoplay vẫn theo cấu hình/trình duyệt.

## 2026-11-10 — Xoay ngang/dọc giữ state đang chạy

User yêu cầu xoay ngang rồi dọc phải giữ nguyên trạng thái, không reset/ảnh hưởng ván. DesktopCanvas trước đây trả children trực tiếp khi compact và thêm2wrapper khi desktop; vượt breakpoint800px đã remount toàn bộ Providers/App, làm mất state local của editor/trial/thiết lập và vòng đời kết nối.

Giữ2DOMwrapper cố định ở cả2chế độ, compact display:contents và không gắn id desktop để giữ CSS/hình học hiện tại. Khi xoay chỉ đổi style/id/scale, không remount cây ứng dụng. Bỏ usePhonePortrait tự ép portrait còn sót trong App theo quy tắc đã hủy khóa xoay2026-10-21; màn hình theo hướng thiết bị. Không đổi luật/timer/engine/permission AI, geometry avatar hoặc iframe iPad.

Regression mới đã fail trên bản trước và PASS sau sửa: qua lại390×844↔932×430/1000×600 nhiều lần giữ bước đi, lựa chọn AI, nội dung input, chính nodeDOM và mount count1; kiểm tra cả windowresize/visualViewportresize.34/34targeted5suite PASS, TypeScript PASS. Chưa thử xoay điện thoại thật/browserQA. Backup .checkpoints/orientation-state-20261110; trạng thái build cuối xem AI_CHANGELOG.
