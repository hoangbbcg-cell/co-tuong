# Âm thanh sau khi để yên — 11/11/2026

User báo lần bấm đầu sau idle nghe trễ, các lần tiếp theo bình thường. Chỉ sửa local trong lượt này.

Các điểm sửa:

- UI xử lý mọi trạng thái chưa running và chưa closed, gồm interrupted; chủ động resume khi có statechange/focus/visibility. Tương tác mới được thử resume ngay cả khi lời gọi resume cũ đang chờ autoplay.
- Thay loop zero/oscillator gain0 bằng ConstantSource DC một LSB16bit (1/32768), dùng chung helper `audioOutputKeepAlive.ts`. Đặt offset nhỏ ngay khi tạo node. Đây là DC không thêm giai điệu/tiếng nền; nhánh này bị ngắt hoặc gain0 khi mute/tab hidden, dọn khi unmount/dispose.
- GameSounds giữ AudioBuffer đã giải mã và gọi source.start ngay trong cùng lần gọi với cue đã cache/context running. Giữ hủy cue, checkmate completion, intro, âm lượng/assets và nhạc nền hiện hành.

Kiểm chứng:

- 8suite/48test PASS: idle180giây, interrupted, retry gesture khi resume cũ chờ, mute/hidden, dispose, intro/checkmate/countdown và nhạc nền.
- Chrome headless với AudioContext thật, chờ180giây: hai context running; UI source.start khoảng11ms, move khoảng6.7ms tính từ handler. Không có pageerror. Đây là đo scheduling WebAudio, không đo âm ra loa/Bluetooth.
- Kiểm tra khởi tạo DC sau bước đặt intrinsic offset: cả hai node đúng0.000030517578125; lần phát sau10giây idle gọi start0.5/0.9ms.
- Full build mã cuối đang chờ ghi nhận kết quả cuối; không coi unit test là bằng chứng đã hết mọi độ trễ phần cứng.

Tham khảo trạng thái interrupted: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/state . Cần nghe thử trên thiết bị/trình duyệt người dùng thực tế để xác nhận triệu chứng.

Gói VPS `hovang-local-20261111-ae912bddf415` đã chuẩn bị trước đó KHÔNG chứa sửa âm thanh này. Chưa cập nhật hoặc triển khai VPS trong lượt này; cần làm gói mới trước khi phát hành bản local mới.

- 2026-11-11 audio-idle-local kết quả cuối:8suite49/49 PASS. Chromeidle180s PASS (UI11ms/move6.7ms scheduling), kiểm tra intrinsicDC/idle10s PASS(0.5/0.9ms), khôngđooutputphysical. Npmrunbuild mãcuối ởdistchung gặpENOENTfinalpassảnh; npmrunbuildsnapshotcáchly PASS đủTypeScript/Vite/2postbuild. Snapshot được sync hai file chuyển cảnh mới cập nhật song song (prepareSceneImages.ts/OpeningCover.tsx), đốichiếu toànsrc/server/publicchecksum PASS rồi mới cài distlatest vàverifyindexhash PASS. Checkpoint giữ các disttrước; source sửa khác đượcgiữ. Lượtcopydistđầu khởi động trước nguồnvalidationxong đãkhôngđạt vì2fileđổi; đãđónggóilạivàđốichiếuxongtrướclầncàicuối. KhôngVPS; candidateae912bddf415 cũkhôngcóaudiofixnày.