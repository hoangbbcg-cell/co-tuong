# Kiểm kê assets — 2026-09-19

Không xóa ảnh, font, giấy phép hoặc Markdown. SHA-256 trước/sau di chuyển giống nhau.

Kiểm chứng: build và typecheck đạt; test UI 18/18 đạt; 33 tham chiếu asset frontend/HTML không có đường dẫn thiếu. Chưa QA trực quan trong trình duyệt. Có 55 file không tìm thấy tham chiếu trực tiếp, cộng pieces/source.png chỉ được registry không dùng export; giấy phép font không đưa vào danh sách xóa.

## Cấu trúc mới

```text
src/assets/
  backgrounds/ (8 files)
  boards/ (1 files)
  computer-setup/ (13 files)
  fonts/ (2 files)
  home-actions/ (25 files)
  icons/ (1 files)
  pieces/ (18 files)
  ranks/ (1 files)
  references/ (1 files)
  room-selection/ (16 files)
docs/
  IMPORTANT-NOTES.md
  ASSET-CLEANUP.md
  asset-notes-pending-removal/
```

## Toàn bộ file di chuyển và đổi tên

Đường dẫn tương đối với board-game. Cột cuối chỉ đổi tên file, không tính thư mục.

| Cũ | Mới | Đổi tên |
| --- | --- | --- |
| `src/assets/015f80dc-24ee-4f7a-8a6b-19c3cec7fd6d.png` | `src/assets/pieces/source.png` | Có |
| `src/assets/action game.png` | `src/assets/home-actions/actions-source.png` | Có |
| `src/assets/avatar.svg` | `src/assets/icons/avatar.svg` | — |
| `src/assets/board-transparent.md` | `docs/asset-notes-pending-removal/board-transparent.md` | — |
| `src/assets/board-transparent.png` | `src/assets/boards/board-transparent.png` | — |
| `src/assets/chơi với máy nền.png` | `src/assets/backgrounds/computer-original.png` | Có |
| `src/assets/Chơi với máy.png` | `src/assets/computer-setup/source.png` | Có |
| `src/assets/chọn bàn.png` | `src/assets/room-selection/source.png` | Có |
| `src/assets/computer-setup/README.md` | `docs/asset-notes-pending-removal/computer-setup/README.md` | — |
| `src/assets/game action.png` | `src/assets/home-actions/badges-source.png` | Có |
| `src/assets/giải đấu.png` | `src/assets/home-actions/tournament-source.png` | Có |
| `src/assets/home-actions/README.md` | `docs/asset-notes-pending-removal/home-actions/README.md` | — |
| `src/assets/home-background.md` | `docs/asset-notes-pending-removal/home-background.md` | — |
| `src/assets/home-background.png` | `src/assets/backgrounds/home-background.png` | — |
| `src/assets/home-ink-background.md` | `docs/asset-notes-pending-removal/home-ink-background.md` | — |
| `src/assets/home-ink-background.png` | `src/assets/backgrounds/home-ink-background.png` | — |
| `src/assets/home-mountain-background.md` | `docs/asset-notes-pending-removal/home-mountain-background.md` | — |
| `src/assets/home-mountain-background.png` | `src/assets/backgrounds/home-mountain-background.png` | — |
| `src/assets/label-computer-title.png` | `src/assets/home-actions/label-computer-title.png` | — |
| `src/assets/label-computer.png` | `src/assets/home-actions/label-computer.png` | — |
| `src/assets/label-create-room-title.png` | `src/assets/home-actions/label-create-room-title.png` | — |
| `src/assets/label-create-room.png` | `src/assets/home-actions/label-create-room.png` | — |
| `src/assets/label-hidden-chess.png` | `src/assets/home-actions/label-hidden-chess.png` | — |
| `src/assets/label-quick-play-title.png` | `src/assets/home-actions/label-quick-play-title.png` | — |
| `src/assets/label-quick-play.png` | `src/assets/home-actions/label-quick-play.png` | — |
| `src/assets/label-select-room.md` | `docs/asset-notes-pending-removal/label-select-room.md` | — |
| `src/assets/label-select-room.png` | `src/assets/home-actions/label-select-room.png` | — |
| `src/assets/landscape-background.md` | `docs/asset-notes-pending-removal/landscape-background.md` | — |
| `src/assets/landscape-background.png` | `src/assets/backgrounds/landscape-background.png` | — |
| `src/assets/MaShanZheng-OFL.txt` | `src/assets/fonts/ma-shan-zheng-ofl.txt` | Có |
| `src/assets/MaShanZheng-Regular.ttf` | `src/assets/fonts/ma-shan-zheng-regular.ttf` | Có |
| `src/assets/mode-labels-v2.md` | `docs/asset-notes-pending-removal/mode-labels-v2.md` | — |
| `src/assets/mode-labels-v3.md` | `docs/asset-notes-pending-removal/mode-labels-v3.md` | — |
| `src/assets/mode-labels.md` | `docs/asset-notes-pending-removal/mode-labels.md` | — |
| `src/assets/nền home.png` | `src/assets/backgrounds/home.png` | Có |
| `src/assets/nền máy.png` | `src/assets/backgrounds/computer.png` | Có |
| `src/assets/pieces/README.md` | `docs/asset-notes-pending-removal/pieces/README.md` | — |
| `src/assets/rank-frame.svg` | `src/assets/ranks/rank-frame.svg` | — |
| `src/assets/room-selection/README.md` | `docs/asset-notes-pending-removal/room-selection/README.md` | — |
| `src/assets/tournament-art-no-cup.md` | `docs/asset-notes-pending-removal/tournament-art-no-cup.md` | — |
| `src/assets/tournament-art-no-cup.png` | `src/assets/home-actions/tournament-art-no-cup.png` | — |
| `src/assets/tournament-characters-transparent.md` | `docs/asset-notes-pending-removal/tournament-characters-transparent.md` | — |
| `src/assets/tournament-characters-transparent.png` | `src/assets/home-actions/tournament-characters-transparent.png` | — |
| `src/assets/tournament-dragon-tiger-transparent.md` | `docs/asset-notes-pending-removal/tournament-dragon-tiger-transparent.md` | — |
| `src/assets/tournament-dragon-tiger-transparent.png` | `src/assets/home-actions/tournament-dragon-tiger-transparent.png` | — |
| `src/assets/tournament-title-large.md` | `docs/asset-notes-pending-removal/tournament-title-large.md` | — |
| `src/assets/tournament-title-large.png` | `src/assets/home-actions/tournament-title-large.png` | — |
| `src/assets/tournament-vignette.md` | `docs/asset-notes-pending-removal/tournament-vignette.md` | — |
| `src/assets/tournament-vignette.png` | `src/assets/home-actions/tournament-vignette.png` | — |
| `src/assets/wood.svg` | `src/assets/backgrounds/wood.svg` | — |
| `src/assets/Ảnh chụp màn hình 2026-09-18 101539.png` | `src/assets/references/screenshot-2026-09-18-101539.png` | Có |

## Code đã cập nhật

- `src/pages/game/GamePage.tsx`
- `src/pages/home/HomePage.tsx`
- `src/features/game/components/Chat.tsx`
- `src/features/game/components/PlayerCard.tsx`
- `src/features/lobby/components/ComputerSetup.tsx`
- `src/features/lobby/components/ProfileDialog.tsx`
- `src/features/lobby/components/RoomSelection.tsx`
- `src/app/styles/index.css`
- `src/assets/pieces/index.ts`
- `index.html`

## Asset có thể xem xét xóa

Không tìm thấy tham chiếu trong frontend và HTML entry hiện tại. Không đọc backend hoặc bản legacy assets/js. Nguồn thiết kế, sheet, screenshot và preview vẫn có giá trị đối chiếu/tái cắt; cần xác nhận trước khi xóa.

- `pieces/source.png`: chỉ được export bởi registry `pieces/index.ts` không được frontend import. Phải xử lý registry cùng lúc nếu xóa nguồn.
- `backgrounds/computer-original.png`
- `backgrounds/home-background.png`
- `backgrounds/home-ink-background.png`
- `backgrounds/home-mountain-background.png`
- `boards/board-transparent.png`
- `computer-setup/footer.png`
- `computer-setup/source.png`
- `computer-setup/title.png`
- `home-actions/actions-source.png`
- `home-actions/badges-source.png`
- `home-actions/extracted-sheet.png`
- `home-actions/full-badges-sheet.png`
- `home-actions/hidden.png`
- `home-actions/label-computer-title.png`
- `home-actions/label-computer.png`
- `home-actions/label-create-room-title.png`
- `home-actions/label-create-room.png`
- `home-actions/label-hidden-chess.png`
- `home-actions/label-quick-play-title.png`
- `home-actions/label-quick-play.png`
- `home-actions/label-select-room.png`
- `home-actions/quick.png`
- `home-actions/rooms.png`
- `home-actions/tournament-art-no-cup.png`
- `home-actions/tournament-characters-transparent.png`
- `home-actions/tournament-dragon-tiger-transparent.png`
- `home-actions/tournament-source.png`
- `home-actions/tournament-vignette.png`
- `pieces/black-advisor.png`
- `pieces/black-cannon.png`
- `pieces/black-elephant.png`
- `pieces/black-general.png`
- `pieces/black-horse.png`
- `pieces/black-rook.png`
- `pieces/black-soldier.png`
- `pieces/f7df1395-527c-4b3d-be26-243de5a2999f.png`
- `pieces/index.ts`
- `pieces/preview.png`
- `pieces/red-advisor.png`
- `pieces/red-cannon.png`
- `pieces/red-elephant.png`
- `pieces/red-general.png`
- `pieces/red-horse.png`
- `pieces/red-rook.png`
- `pieces/red-soldier.png`
- `references/screenshot-2026-09-18-101539.png`
- `room-selection/button.png`
- `room-selection/custom-button-frame.png`
- `room-selection/friends.png`
- `room-selection/header.png`
- `room-selection/muted.png`
- `room-selection/quick.png`
- `room-selection/source.png`
- `room-selection/trophy.png`
- `room-selection/video.png`

## Markdown cũ có thể xóa sau xác nhận

Chỉ lưu tạm; đường dẫn và mô tả vẫn theo bản cũ, có thể lỗi thời. Dùng IMPORTANT-NOTES.md làm tài liệu hiện hành.

- `docs/asset-notes-pending-removal/board-transparent.md`
- `docs/asset-notes-pending-removal/computer-setup/README.md`
- `docs/asset-notes-pending-removal/home-actions/README.md`
- `docs/asset-notes-pending-removal/home-background.md`
- `docs/asset-notes-pending-removal/home-ink-background.md`
- `docs/asset-notes-pending-removal/home-mountain-background.md`
- `docs/asset-notes-pending-removal/label-select-room.md`
- `docs/asset-notes-pending-removal/landscape-background.md`
- `docs/asset-notes-pending-removal/mode-labels-v2.md`
- `docs/asset-notes-pending-removal/mode-labels-v3.md`
- `docs/asset-notes-pending-removal/mode-labels.md`
- `docs/asset-notes-pending-removal/pieces/README.md`
- `docs/asset-notes-pending-removal/room-selection/README.md`
- `docs/asset-notes-pending-removal/tournament-art-no-cup.md`
- `docs/asset-notes-pending-removal/tournament-characters-transparent.md`
- `docs/asset-notes-pending-removal/tournament-dragon-tiger-transparent.md`
- `docs/asset-notes-pending-removal/tournament-title-large.md`
- `docs/asset-notes-pending-removal/tournament-vignette.md`
