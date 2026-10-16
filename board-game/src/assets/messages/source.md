# Nguồn asset Tin nhắn

- Tách hai khoang2026-10-07: `extract-chat-frame.ps1` cắt ảnh1355×998 tại x465. `conversation-list-frame.png`465×998 là khoang trái; `conversation-chat-frame.png`890×989 là khoang phải sau trim alpha9 hàng trên. MessagesChatPane đặt ảnh ở top9/998, height989/998 để giữ tọa độ gốc; ảnh hai bên chạm bbox riêng. Component không import chat-frame.png chung nữa. Kích thước pane độc lập, nội dung/asset mặc định ghép như khung trước.

- Khung hiện hành2026-10-07: ảnh người dùng `../references/uploads/messages-ff79830f.png`1536×1024, ID `ff79830f-a2af-42e3-bf3f-94dd6f755139`. `extract-chat-frame.ps1` giữ nguyên pixel khung/phong cảnh, mask phần nền mờ ngoài đường bao và trim alpha. Runtime `chat-frame.png`1355×998, bbox nguồn(90,11)–(1444,1008); bốn góc alpha0. Ảnh này thay khung CSS/SVG và wallpaper AI cũ trong MessagesDialog; nội dung HTML giữ từ bản trước.

- Mẫu người dùng: `../references/uploads/messages-01f4e691.png`, bản ảnh 1448×1086, ID `01f4e691-74e2-4977-a179-63db4a9beef6`. Script `extract-reference.ps1` giữ tọa độ crop, mask alpha theo hình tròn/bo góc; pixel nội dung chạm cạnh canvas, góc alpha=0.
- Avatar: Picolozz (64,309,86,86); Khôi (65,413,82,82); An (64,507,82,82); Máy (65,599,82,82); Dũng (65,691,82,82); Tuấn (65,784,82,82); Hân (65,877,82,82); Phát (65,969,82,82).
- Nút gửi (1292,937,95,95); tùy chọn (1234,158,51,51); thông tin liên hệ (1309,158,53,53); Tạo nhóm (64,150,427,63). Nút Tạo nhóm giữ chữ/icon gốc.
- `title-frame.png` (bản cũ, không còn import vào UI): giữ khung `../rankings/ranking-title-transparent.png`2166×360; vùng chữ cũ được thay bằng texture đỏ lấy từ chính banner. Người dùng đã yêu cầu bỏ toàn bộ banner phía trên.
- `chat-background.png`: phục hồi wallpaper bằng built-in imagegen từ crop (518,235,882,704); ảnh crop đối chiếu ở `../references/uploads/messages-chat-background-source.png`. Chỉ xóa avatar, bong bóng, chữ/timestamp/emoji/checkmark, giữ cảnh chiều tà, núi/chùa/sông, lan can đá, lá phong và đèn lồng phải. Phần bị che trong mẫu được AI phục hồi, không phải pixel nguồn nguyên bản.
- Prompt: Restore ONLY the background wallpaper; remove all portraits and seven chat bubbles, text, timestamps, emoji, checkmarks, outlines and shadows; seamlessly fill occluded areas; preserve existing scenery, composition, colors, blur and lighting; output full-bleed wallpaper at 882:704 with no UI/border/padding.
- Runtime chỉ import asset riêng. Ảnh mẫu và crop dùng đối chiếu, không làm screenshot giao diện tĩnh.

- Khôi phục khung chung2026-10-07: runtime dùng lại chat-frame.png nguyên khung1355×998; hai ảnh khoang riêng chỉ giữ đối chiếu, không import vào UI.

- Tách lại2026-10-07: runtime dùng hai ảnh khoang riêng. MessagesChatPane dùng thêm cùng ảnh khung làm foreground, clipPath giới hạn viền dưới/phải và họa tiết góc dưới phải để trang trí phủ trên thanh nhập; không tạo hoặc biến đổi asset.
