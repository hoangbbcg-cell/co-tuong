# Nhạc nền

- 2026-10-15: Ba file MP3 người dùng cung cấp, phát tuần tự:
  1. et11lx-chinese-ancient-style-music-love-et11lx-155926.mp3
  2. et11lx-chinese-ancient-style-music-love-etlx-247345.mp3
  3. chinesezenmusic-chinese-bamboo-flute-amp-guzheng-relaxing-zen-music-618302.mp3
- Hết mỗi bài chờ4 giây rồi chuyển bài, hết danh sách quay về bài đầu. Dùng chung một HTMLAudioElement xuyên các màn; click/phím/chuyển màn không bỏ qua khoảng nghỉ.
- Tắt nhạc hủy timer; bật lại khi bài đã hết bắt đầu khoảng chờ4 giây trước bài tiếp. Tạm tắt giữa bài thì tiếp tục bài đó.
- Đã bỏ runtime background-music.mp4 cũ; giữ bản nguồn references/uploads/background-music-source.mp4 để đối chiếu. Các MP4 hiệu ứng ván cờ không phải nhạc nền.
- Chưa có tài liệu giấy phép kèm ba MP3; tên file giữ nguyên nguồn do người dùng cung cấp.
- 2026-10-18: Home dùng dropdown Cài đặt với Tắt nhạc nền riêng và Tắt tiếng game (GameSounds master gain) riêng; mute game không tắt player nhạc nền. Trạng thái mute giữ trong phiên xuyên màn.


- 2026-10-18: Chốt lưu riêng bật/tắt nhạc nền và mute tiếng game qua F5 bằng localStorage co-tuong-audio-music-v1/muted-v1. Đọc boolean có validate ngay khi khởi tạo, ghi mỗi toggle, storage lỗi vẫn dùng trong phiên. Không lưu vị trí bài/đổi playlist.3/3 regression dropdown và module-reload/preferences PASS, typecheck/build PASS, dist có khóa lưu; chưa browser QA reload thật.

