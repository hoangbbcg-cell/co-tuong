## Phạm vi đang khóa theo yêu cầu người dùng
- Các tab trong Danh hiệu chính của ProfileDialog: Tất cả, Vinh Quang Kỳ Đài, Danh Hiệu Phong Tặng, Chuỗi Chiến Thắng, Tổng Ván Chơi và Online Chuyên Cần. Khóa trực tiếp giao diện và hành vi của các tab này, gồm khung, icon, chữ, vị trí và trạng thái chọn. Yêu cầu sửa trực tiếp các tab phải được người dùng mở khóa trước.

2026-10-01: Removed the “Đã chọn: n/3” status from the main honor catalog.
2026-10-01: Moved the profile honor count to sit beside the edit icon in the section heading.
2026-10-01: Added the current profile-honor count to the section heading as “Danh hiệu: n”.
2026-10-01: Matched the All tab's catalog top spacing to Vinh Quang's 18px scroll offset and removed the misplaced intergroup gap.
2026-10-01: Restored the level-2 Vinh Quang Kỳ Đài title offset and moved only level-3 titles upward by 2px.
2026-10-01: Added extra spacing before the first Awarded Honors row in the All catalog so it clears the Vinh Quang Kỳ Đài rows above.
2026-10-01: Raised the titles in only the three level-2 Vinh Quang Kỳ Đài badges by 2px.
2026-10-01: Lowered the titles inside the three Vinh Quang Kỳ Đài catalog badges by 2px; the detail panel is unchanged.
2026-10-01: Applied group priority first, then honor level and catalog order to the badges shown in the player profile; documented the rule.
2026-10-01: Clicking outside the honor detail panel now clears the gold glow from the last clicked badge.
2026-10-01: Changed selected profile-honor controls to green with a larger white checkmark.
2026-10-01: Added 6px of top spacing before the honor catalog grid so its first row clears the frame border.
2026-10-01: Removed the approval requirement for other-area changes based only on possible effects; the direct lock on all six main honor tabs remains.
2026-10-01: Locked all six main honor tabs.
2026-10-01: Enlarged the All honors label to match the lower labels and shifted its icon right for alignment. Production build/typecheck passed.
2026-10-01: Added the user lock/unlock rule to AGENTS.md.
2026-10-01: Restored main Vinh Quang Kỳ Đài badge titles to their centered position and raised only the detail-panel title by 4px. Production build/typecheck passed.
2026-10-01: Nudged Vinh Quang Kỳ Đài catalog badge titles upward by 2px. Production build/typecheck passed.
2026-10-01: Increased the All honors category label to match the title sizing used by the honor badges below. Production build/typecheck passed.
2026-10-01: Centered Vinh Quang Kỳ Đài badge titles vertically by removing the 6px downward offset. Production build/typecheck passed.
2026-10-01: Replaced the All honors tile artwork with a cropped standard category frame, the supplied grid icon, matching label styling, and the shared selected glow. Production build/typecheck passed.
2026-10-01: Restored the selected glow around clicked honor cards, including while details are hidden; the tick itself stays unlit. Build/typecheck passed.
2026-10-01: Removed the circular glow around honor tick controls; selection behavior remains unchanged. Build/typecheck passed.
2026-10-01: Kept the tick halo linked to the clicked honor even when its detail panel is hidden. Build/typecheck passed.
2026-10-01: With honor details hidden, clicking a badge still marks it and glows its tick control; tick selection remains enabled. Build/typecheck passed.
2026-10-01: Lowered Vinh Quang Kỳ Đài rank labels by 4px further in the main honor catalog and detail panel; profile preview placement remains unchanged. Build/typecheck passed.
2026-10-01: Reused the selected honor glow as a circular halo around checked selection buttons and removed the halo from honor artwork. Build/typecheck passed.
2026-10-01: Scoped the hide switch to the main honors section: it now blocks detail popovers while keeping honor badges and profile user information visible. Build/typecheck passed.
2026-10-01: Honor detail panels opened from middle-column badges now use the same horizontal position as the middle Vinh Quang Kỳ Đài badge. Build/typecheck passed.
2026-10-01: Raised the honor detail panel above the honor-list hide toggle when they overlap. Production build/typecheck passed.
2026-10-01: Nudged all visible text in Vinh Quang Kỳ Đài honor details. Production build/typecheck passed.
2026-10-01: Reduced the baked-in glow on the “Tất cả” honor category tile with a localized backdrop brightness filter; other category art/layout remain unchanged. Build/typecheck passed.
2026-10-01: Unified profile honor visibility into one per-profile switch. Hiding now hides all honor badges, closes any open detail panel, and blocks opening details until shown again; existing per-honor hide data migrates to the shared state. Production build/typecheck passed.
2026-10-01: Grouped all 20 loose `src/assets` PNGs under awarded-honors, profile/honors, player, and references/honors; updated imports and honor-system paths. Production build/typecheck passed.
2026-09-29: Profile honor preview now opens only a standalone centered detail panel, without opening the honor list. Build passed.
2026-09-29: Forced pointer cursor on the clickable profile honor previews. Build passed.
2026-09-29: Made the three profile preview honors clickable to open their detail panel centered vertically. Build passed.
2026-09-29: Replaced profile honor placeholder icons with three unique random sample honor badges. Build passed; browser was unavailable for visual review.
2026-09-29: Added the All honors empty-state text Chua co danh hieu when no unlocked titles are available. Build passed.
2026-09-29: Restored detail clicks on visually locked streak, games, and attendance honors as requested; lock styling remains. Build passed.
2026-09-29: Updated All honors tab to show only unlocked honors, with no locked items or empty-state message. Build passed.
2026-09-29: Added the empty-state note to the Awarded Honors tab for when no bestowed honors are unlocked. Build passed.
2026-09-29: Disabled clicks on locked Streak, Total Games, and Attendance honor cards so they no longer open details. Build passed.
2026-09-29: Added centered lock icons and dimmed Streak, Total Games, and Attendance honors; disabled clicks while locked. Build passed.
2026-09-29: Hid bestowed honor cards until player award records exist; documented unlock rule and left empty state undesigned. Build passed.
2026-09-29: Hid Vinh Quang Ky Dai cards from the catalog and all-honors view; added tournament-participation empty state. Build passed.
2026-09-29: Added docs/danhhieu.md with honor names, descriptions, earn rules, thresholds, and UI notes. Build passed.
2026-09-29: Changed how-to text for bestowed honors levels 2-5 to require another player endorsement; level 1 retains its 20-endorsement condition. Build passed.
2026-09-29: Added detail text and completion/activity thresholds to Total Games and Attendance honors, and enabled their detail cards. Build passed.
2026-09-29: Corrected detail-copy numerals to lining figures, nudged them to baseline, and slightly increased their size. Build passed.
2026-09-29: Added descriptions and win-streak requirements to all five streak honors and opened them through the shared honor detail panel. Build passed.
2026-09-29: Increased indentation after diamond bullets in both honor detail sections. Build passed.
2026-09-29: Added diamond bullets to every description line in honor details; how-to-earn lines already use the same marker. Build passed.
2026-09-29: Made honor detail text areas content-height with balanced vertical padding and a max height; they scroll only when text exceeds the available panel. Build passed.
2026-09-29: Increased the honor detail description area and rendered the bestowed visibility note on its own diamond-bulleted line. Build passed.
2026-09-29: Enlarged bestowed-honor eye/count badges and changed them to a gold-brown frame. Build passed.
2026-09-29: Updated bestowed honor copy and per-level endorsement thresholds (20/15/10/5/3), including recognition status gating. Build passed.
2026-09-29: Added the 20-endorsement visibility note to Kỳ Đạo, Huyền Thoại, and Tôn Sư. Build passed.
2026-09-29: Added unique descriptions and the 20-endorsement requirement for all 15 bestowed honors; detail status is gated by endorsement count. Build passed.
2026-09-29: Selecting another arena honor while details are open now replaces the detail without closing it. Build passed.
2026-09-29: Centered the honor detail frame vertically within the main honors frame. Build passed.
2026-09-29: Aligned bestowed honor view badges to each frame's upper edge at their displayed position. Build passed.
2026-09-29: Added pointer cursors to honor badges and left category tabs. Build passed.
2026-09-29: Added eye/view badges to bestowed honor levels 2-5; fallback count is 1. Build passed.
2026-09-29: Aligned Vinh Quang detail frame to visible badge top, accounting for transparent PNG padding. Build passed.
2026-09-29: Anchored the Vinh Quang detail frame top edge to the selected badge artwork top; build/typecheck passed.
2026-09-29: Switched Vinh Quang Ky Dai detail copy to Vietnamese-capable Cormorant Garamond and NFC-normalized lines; build/typecheck passed.
2026-09-29: Added exact Vinh Quang Ky Dai descriptions and unlock instructions for all nine honors; National Champion has its special distinction; build/typecheck passed.
2026-09-29: Matched the Thuong Truc level 1 green frame size to the Lao Lang Ky Dan badge; build/typecheck passed.
2026-09-29: Moved level 1 attendance title to the first slot, followed by level 2 titles in reverse supplied order; build/typecheck passed.
2026-09-29: Matched Online Chuyen Can visible frame bounds to other badges and fixed category filtering to show only its five cards; build/typecheck passed.
2026-09-29: Added five Online Chuyen Can honors using the supplied two-level green sprite, reverse priority order, centered streak-color text and matching badge slots; build/typecheck passed.
2026-09-29: Further increased Bat Bai frame height and reduced Lao Lang Ky Dan frame height; width and text unchanged; build/typecheck passed.
2026-09-29: Increased Bat Bai frame height and reduced Lao Lang Ky Dan frame height; text and horizontal sizes unchanged; build/typecheck passed.
2026-09-29: Matched purple honor title sizing to the full badge slot instead of the narrower text wrapper; frame sizing unchanged; build/typecheck passed.
2026-09-29: Restored Bat Bai and Lao Lang Ky Dan frame-height scales to their pre-normalization values; build/typecheck passed.
2026-09-29: Reverted the purple awarded honor title font-size increase to its previous sizing rule; build/typecheck passed.
2026-09-29: Increased title font size slightly in purple bestowed honor frames only; build/typecheck passed.
2026-09-29: Increased the vertical scale of the Bat Bai badge and slightly reduced Lao Lang Ky Dan; build/typecheck passed.
2026-09-29: Reverted the all-frame asset crop/normalization; restored prior title frame rendering and rebuilt dist.
2026-09-29: Restored Bat Bai to its prior 96%-wide, 57.6%-high display size; build/typecheck passed.
2026-09-29: Reverted the vertical enlargement of the Bat Bai streak badge; build/typecheck passed.
2026-09-29: Removed centering offsets from honor rows; incomplete rows now flow left to right. Build/typecheck passed.
2026-09-29: Trimmed excess transparent pixels from the blue level-1 crop so its visible bounds match the gold frame; adjusted title centering. Build/typecheck passed.
## 2026-09-29 - Match Bat Bai frame to Lao Lang size
- Applied the enlarged Lao Lang frame dimensions to Bat Bai without moving its title or changing other streak badges.
- Production build and typecheck pass.

## 2026-09-29 - Increase Lao Lang frame height further
- Increased only the blue Lao Lang frame's vertical scale by another 10%; width and title position are unchanged.
- Production build and typecheck pass.

## 2026-09-29 - Increase Lao Lang frame height again
- Increased only the blue Lao Lang frame's vertical scale by another 10%; width and title position are unchanged.
- Production build and typecheck pass.

## 2026-09-29 - Center Lao Lang title vertically
- Shifted only the Lao Lang Ky Dan title 3px upward to center it optically in the ornate frame body.
- Production build and typecheck pass.

## 2026-09-29 - Increase Lao Lang frame height
- Increased only the ornate blue level-1 frame's vertical scale by 10%; its width and all other badges stay unchanged.
- Production build and typecheck pass.

## 2026-09-29 - Match Lao Lang frame to Bat Bai
- Set the ornate blue Lao Lang Ky Dan frame to the same 96% width and 57.6% height display bounds as the gold Bat Bai frame.
- Production build and typecheck pass.

## 2026-09-29 - Match total-games level 1 to streak level 1
- Resized the ornate blue level-1 frame to use the regular gold streak frame dimensions; other badge sizes stay unchanged.
- Production build and typecheck pass.

## 2026-09-29 - Reduce bestowed honors to 15
- Kept exactly three titles per existing frame level, in five groups and grid order; removed surplus entries and duplicate displayed titles.
- Production build, typecheck, and data-count verification pass; no CSS changed.

## 2026-09-29 - Match level-1 total-games frame to Bat Bai
- Enlarged the ornate blue level-1 frame to match the gold Bat Bai frame bounds (96% width, 57.6% height); level 2 stays matched to the regular gold frame.
- Production build and typecheck pass.

## 2026-09-29 - Match total-games badges to gold frames
- Matched blue frame artwork to the regular gold streak frame bounds: 86% width by 46.9% height of the badge slot.
- Production build and typecheck pass.

## 2026-09-29 - Match total-games badges to measured reference
- Measured level-5 purple badge visible bounds at 86.1% width by 52.2% height of its tile; fit total-games frame crops within that bound while preserving source aspect ratios.
- Production build and typecheck pass.

## 2026-09-29 - Match total-games badge size
- Fit both total-games frame crops to the shared honor artwork bounds while preserving each crop's original aspect ratio.
- Production build and typecheck pass.

## 2026-09-29 - Align honor card spacing
- Rendered awarded, streak, and total-games badges in one shared three-column grid in the All view so every row uses the same gap and cards no longer overlap.
- Kept incomplete final rows centered. Production build and typecheck pass.

## 2026-09-29 - Enlarge and align total-games cards
- Increased total-games frame art to fill its shared 3:1 card slot and kept titles centered over each crop.
- Centered the two cards in the final row in both All and Total Games views; build and typecheck pass.

## 2026-09-29 - Add total games honors
- Added the blue total-games sprite as a level-2 simple frame and level-1 ornate frame, with L?o L?ng K? ??n prioritized before four level-2 titles.
- Reused the shared honor font and streak-brown text style; exposed the badges in All and Total Games views. Build and typecheck pass.

## 2026-09-29 - Lower only B?t B?i title
- Moved the B?t B?i text overlay down by 2px without shifting its frame or other streak titles.
- Production build and typecheck pass.

## 2026-09-29 - Refine B?t B?i frame proportions
- Narrowed the B?t B?i frame width from 100% to 96% and increased its vertical scale by 10%; other frames remain unchanged.
- Updated the honor sizing rule; production build and typecheck pass.

## 2026-09-29 - Enlarge the B?t B?i frame only
- Set the level-2 B?t B?i artwork to 100% of its shared 3:1 slot, keeping its normalized aspect ratio; all level-1 gold cards stay at 86%.
- Updated the sizing note; production build and typecheck pass.

## 2026-09-29 - Match gold streak card size to purple reference
- Measured the purple reference at roughly 230x42px and reduced the gold artwork width to 86%, normalizing each crop to about 5.5:1 while retaining 3:1 slots.
- Updated the honor-system sizing note; production build and typecheck pass.

## 2026-09-29 - Restore streak title color with shared font
- Restored the original dark-brown streak text color and pale shadow while sharing font family, bold italic face, and responsive sizing with other badge titles.
- Updated the honor style rule; production build and typecheck pass.

## 2026-09-29 - Match streak frame artwork size
- Measured the reference plaque at about 6:1 and normalized both gold sprite crops to that visible ratio while keeping the shared 3:1 card slots and original crop bounds.
- Documented the sizing rule; production build and typecheck pass.

## 2026-09-29 - Shared gold honor title style
- Applied the existing gold gradient, stroke, and shadow to streak titles and centralized the typography style for all badge groups.
- Documented the reusable title style in docs/HONOR-SYSTEM.md; production build and typecheck pass.

## 2026-09-29 - Enlarge streak badge artwork
- Expanded streak-frame artwork to fill the shared 3:1 badge slot while preserving each crop's aspect ratio and centered text.
- Production build and typecheck pass.

## 2026-09-29 - Unified awarded and streak badge spacing
- Placed award and streak badges in one grid in All view so they share the same row gap and cannot overlap at the section boundary.
- Production build and typecheck pass.

## 2026-09-29 - Matched streak frame sizing and spacing
- Scaled streak frame artwork to 84% of its 3:1 slot and increased the gap after awarded honors in All view to 12%.
- Production build and typecheck pass.

## 2026-09-29 - Assigned streak frames correctly
- Kept only Bat Bai on frame 2; Thong Tri, Lien Thang, Da Thang, and Khoi Thang use frame 1.
- Removed the duplicate Lien Thang frame-2 entry. Production build and typecheck pass.

## 2026-09-29 - Restored streak titles on level-2 frames
- Kept Lien Thang on frame 1 and restored Bat Bai, Thong Tri, Lien Thang, Da Thang, and Khoi Thang on frame 2.
- Production build and typecheck pass.

## 2026-09-29 - Reduced win streak titles to Lien Thang levels 1-2
- Kept only two Lien Thang entries, using the first and second frames from the supplied sprite; removed other streak titles from the list.
- Production build and typecheck pass.

## 2026-09-29 - Updated the Lien Thang frame
- Replaced only the Lien Thang frame-1 art with the lower frame from the supplied sprite.
- Production build and typecheck pass.

## 2026-09-29 - Spaced win-streak badges after awarded honors
- Increased the gap before the streak grid in All view to prevent badges from crowding the final awarded row.
- Production build and typecheck pass; browser visual review unavailable because no browser is connected.

## 2026-09-29 - Added win-streak honors
- Added four level-1 titles and BAt Bai on frame 2, ordered from highest to lowest priority; the source sprite is cropped in CSS.
- Added the streak category and placed it after awarded honors in All.
- Production build and typecheck pass; visual browser review unavailable because no browser is connected.

## 2026-09-29 - Adjusted level-3 and level-5 honor text
- Shifted level-3 text down 1px and level-5 text up 1px; other honor text positions stay unchanged.
- Production build and typecheck pass.

## 2026-09-29 - Adjusted level-1 and level-4 honor text
- Shifted level-4 text up 2px and level-1 text down 2px; other honor text positions stay unchanged.
- Production build and typecheck pass.

## 2026-09-29 - Raised level-5 honor titles
- Moved only the text overlay on level-5 awarded honors up by 2px.
- Production build and typecheck pass.

## 2026-09-29 - Lowered level-1 honor titles
- Moved only the text overlay on level-1 awarded honors down by 2px.
- Production build and typecheck pass.

## 2026-09-29 - Widened level-5 honor frames
- Slightly increased horizontal scaling for level-5 awarded honor frames only.
- Production build and typecheck pass.

## 2026-09-29 - Raised four awarded honor rows
- Shifted the level-4 and level-5 honor badges up by 2px; other levels remain unchanged.
- Production build and typecheck pass.

## 2026-09-29 - Lowered two awarded honor rows
- Shifted the level-1 honor badges down by 2px; other honor levels remain unchanged.
- Production build and typecheck pass.

## 2026-09-29 - Removed the awarded honor title
- Removed the level-4 `Nguoi Dan Duong` entry; all remaining honors render as before.
- Production build and typecheck pass.

## 2026-09-29 - Equalized honor grid row gaps
- Matched the gap between red tournament badges and the first purple row to the existing 2% row gap, replacing the oversized 8% margin.
- Production build and typecheck pass.

## 2026-09-29 - Adjusted purple honor title offset
- Reduced the purple title vertical offset from 5% to 3% of the badge height.
- Production build and typecheck pass.

## 2026-09-29 - Lowered purple honor titles further
- Shifted awarded purple title text from 50% to 55% of each badge height; the frames and red titles remain in place.
- Production build and typecheck pass.

## 2026-09-29 - Lowered first arena honor row slightly
- Shifted only the title overlay for Vinh Quang Ky Dai level 1 down by 2px; the badge images and other rows keep their positions.
- Production build and typecheck pass.

## 2026-09-29 - Centered honor title text vertically
- Removed the red title's small downward offset and centered purple title content at the badge's 50% vertical point.
- Production build and typecheck pass.

## 2026-09-29 - Lightened honor title weight
- Reduced both honor title renderers from font-weight 800 to 700 while retaining the Alegreya face, size, stroke, and shadow.
- Production build and typecheck pass.

## 2026-09-29 - Sharpened honor title rendering
- Increased Alegreya honor title weight to 800 and reduced text stroke and shadow blur to sharpen edges while preserving size, gold fill, and placement.
- Production build and typecheck pass.

## 2026-09-29 - Trialed Alegreya honor titles
- Switched the unified honor title face to Alegreya Italic variable, weight 700 via the existing bold style. Google Fonts metadata includes Vietnamese and weight range 400-900; added its OFL notice.
- Honor text regression tests pass (10); typecheck and production build pass.

## 2026-09-29 - Increased honor title size and weight appearance
- Raised title scaling to 9cqw with a 29px cap, and increased text stroke from 0.018em to 0.03em for a visibly heavier appearance; long awarded names keep adaptive sizing.
- Production build and typecheck pass.

## 2026-09-29 - Slightly enlarged honor titles
- Raised honor title size caps from 23px to 25px and thickened the existing text stroke slightly for both red and purple title frames.
- Production build and typecheck pass.

## 2026-09-29 - Unified honor title font
- Both red arena and purple awarded titles now use the official Cormorant Garamond italic variable face at weight 700; it loads one full Vietnamese-capable font file without glyph-level fallback.
- Added the four missing requested honor strings to the normalization/measurement regression cases; targeted tests and production build pass.

## 2026-09-29 - Restored red honor title font
- Red arena titles now use the existing `font-georgia` class again; purple awarded titles retain the Vietnamese glyph fallback.

# Tiến độ

Cập nhật: 2026-09-28.

## Đã làm
- 2026-09-29: Giữ Georgia làm font chính cho text danh hiệu; thêm Cormorant Garamond Việt hóa làm fallback subset bằng `unicode-range` cho glyph Georgia thiếu. Cả 6 ca Unicode PASS; build PASS; không có browser session để kiểm tra render trực quan.
- 2026-09-29: Chuẩn hóa NFC trước khi render danh hiệu, render nguyên văn bản thành một node, dùng `Intl.Segmenter('vi', grapheme)` cho auto-fit và đặt kerning/ligature/letter-spacing theo yêu cầu; giữ Georgia và toàn bộ hiệu ứng màu. Năm ca Unicode PASS; build PASS; chưa browser QA.
- 2026-09-29: Bỏ mục danh hiệu Phong Tặng `Bạn Cờ Đáng Quý` bị trùng chữ hiển thị `Bạn Cờ`; giữ `Bạn Cờ Tâm Giao`. Build PASS; chưa browser QA.
- 2026-09-29: Hạ vùng chữ Phong Tặng 5% theo chiều dọc để căn tâm thị giác vào thân khung tím, giữ nguyên font, cỡ chữ và asset. Build PASS; chưa browser QA.
- 2026-09-29: Chuẩn hóa mọi danh hiệu Phong Tặng có bốn từ: text trên khung hiện hai từ đầu; tên đầy đủ trong chi tiết giữ nguyên. Build PASS; chưa browser QA.
- 2026-09-29: Rút gọn hai nhãn Phong Tặng dài thành `Quân Tử` và `Tri Kỷ` để tránh sát/chạm ornament; giữ tên đầy đủ trong thông tin và căn giữa trên khung. Build PASS; chưa browser QA.
- 2026-09-29: Căn giữa chữ trong từng khung Phong Tặng chính xác theo tâm ngang/dọc của ô, giữ vùng chữ 70% và kiểu chữ hiện tại. Build PASS; chưa browser QA.
- 2026-09-29: Rút gọn chữ hiển thị một số danh hiệu Phong Tặng (`Tông Sư`, `Chí Tôn`, `Danh Sĩ`, `Tôn Sư`, `Danh Sư`, `Cao Nhân`), giữ nguyên `Huyền Thoại`, `Thánh Thủ`, `Bậc Thầy` và tên đầy đủ cho chi tiết. Build PASS; chưa browser QA.
- 2026-09-29: Kéo dài riêng khung Danh Hiệu Phong Tặng cấp 2 và 3 (`scaleX(1.7)`); các cấp khác giữ `scaleX(1.52)`, chiều cao và chữ không đổi. Build PASS; chưa browser QA.
- 2026-09-29: Giảm cỡ chữ Danh Hiệu Phong Tặng về cùng thang với chữ khung đỏ (`clamp(10px, 7.5cqw, 23px)`), vẫn giữ co chữ nhẹ theo độ dài tên. Build PASS; chưa browser QA.
- 2026-09-29: Kéo dài phần ảnh của cả năm khung Danh Hiệu Phong Tặng theo chiều ngang (`scaleX(1.52)`), giữ nguyên chiều cao, chữ và lưới hiển thị. Build PASS; chưa browser QA.
- 2026-09-29: Đồng bộ font Georgia đậm nghiêng và viền chữ vàng của danh hiệu tím theo ba khung Vinh Quang Kỳ Đài; giữ gradient `#F7E397` → `#EEB33C`, cách căn giữa và tự co chữ để vừa khung. Build PASS; chưa browser QA.
- 2026-09-29: Tăng chiều cao hiển thị riêng cho ba khung Vinh Quang Kỳ Đài bằng `scaleY(1.16)`; giữ nguyên container, chữ, layout và khung tím. Build PASS; chưa browser QA.
- 2026-09-28: Theo yêu cầu, hoàn tác toàn bộ thay đổi khung Danh hiệu từ hai asset `f2b4...` và `eb7e...`; khôi phục `honors-frame-tight.png`, tỷ lệ, cột danh mục và hàng ba danh hiệu trước đó. Giữ thao tác đóng bằng click ngoài/nút X. Build/typecheck PASS; chưa browser QA.
- 2026-09-28: Dùng `eb7e94bc-efe1-48da-a09e-cc0b2ccaf6fc.png` làm khung lớn phủ vùng nội dung bên phải; đặt ba danh hiệu Kỳ Đài thành một hàng bên trong khung. Build/typecheck PASS; chưa browser QA.
- 2026-09-28: Thay khung Danh hiệu bằng asset `f2b4a848-cbc5-446a-a50e-b57000d98fb8.png` (1448×1086, tỷ lệ 4:3); cắt riêng cột sáu danh mục 264×688px từ khung cũ để giữ nguyên chức năng, căn lại các vùng bấm/viền chọn/nút X và giới hạn khung ở 90% chiều cao viewport. Build/typecheck PASS; chưa browser QA.
- 2026-09-28: Tăng khung thông tin danh hiệu lên bằng chiều cao khung chính trừ 50px và căn giữa dọc; giữ nguyên vị trí cả ba danh hiệu. Khung thông tin hạng 2 cách ô giữa 15px về bên phải và được phép tràn khỏi viền chính để không bị cắt. Click ngoài khung thông tin hoặc nút X trong khung sẽ đóng chi tiết; các nút X hiện con trỏ bàn tay. Build/typecheck PASS; chưa browser QA.
- 2026-09-28: Cắt sát asset honors-frame-tight.png (1366×999px), giữ nguyên tiêu đề và nút X; căn giữa khung Danh hiệu ở mức tối đa 90% viewport. Build/typecheck PASS; chưa browser QA.
- 2026-09-28: Khung thông tin danh hiệu mở dạng popover bên trong khung Danh hiệu, cách thẻ được chọn 15px; hạng 1/2 mở bên phải, hạng 3 mở bên trái. Nút quay lại giữ nguyên; nội dung điều kiện nhận vẫn tĩnh. Build/typecheck PASS; chưa browser QA.
- 2026-09-28: Cắt vùng hiển thị khung Danh hiệu sát viền vàng, bỏ dải cảnh nền thừa quanh ảnh; giữ nguyên vị trí các nút và nhãn bằng cách duy trì hệ tọa độ ảnh gốc. Điều chỉnh tỷ lệ tối đa theo vùng crop. Build PASS; chưa browser QA.
- 2026-09-28: Cho mục “Tất cả” hiển thị toàn bộ danh hiệu hiện có; ba danh hiệu kỳ đài vẫn đồng thời xuất hiện trong mục Vinh Quang Kỳ Đài. Build PASS; chưa browser QA.
- 2026-09-28: Tách dấu sắc của “Á Quân” thành nét vàng riêng đặt trên chữ A để không bị chìm/mất trong font và hoa văn khung; giữ aria-label đầy đủ. Build PASS; chưa browser QA.
- 2026-09-28: Nâng riêng số 3 trong nhãn “Top 3” lên 0.08em để cân ngang theo thị giác với chữ “Top”. Build PASS; chưa browser QA.
- 2026-09-28: Đặt lớp chữ ba danh hiệu ở `z-10`, ảnh khung ở `z-0` và cho chữ overflow-visible để hoa văn không che hoặc cắt chữ. Build PASS; chưa browser QA.
- 2026-09-28: Hạ mặt chữ ba nhãn thi đấu 0.1em để căn giữa theo thị giác trong phần nền đỏ của khung. Build PASS; chưa browser QA.
- 2026-09-28: Sửa chữ danh hiệu bị tối đen bằng cách bỏ bóng `text-shadow` phủ mặt chữ, giảm viền và dùng `drop-shadow` bên ngoài để giữ gradient vàng sáng. Build PASS; chưa browser QA.
- 2026-09-28: Làm gradient chữ thi đấu rõ hơn bằng hai vùng màu `#F7E397`/`#EEB33C`, ép nền vào mặt chữ qua `WebkitTextFillColor: transparent` và bỏ bóng sáng làm hòa màu. Build PASS; chưa browser QA.
- 2026-09-28: Căn giữa chính xác ba nhãn thi đấu theo cả hai chiều bằng lớp flex phủ toàn bộ từng khung. Build PASS; chưa browser QA.
- 2026-09-28: Đổi ba nhãn khung thi đấu sang gradient dọc `#F7E397` → `#EEB33C` và giảm cỡ tối đa còn 23px/7.5cqw. Build PASS; chưa browser QA.
- 2026-09-28: Giảm cỡ chữ ba nhãn khung thi đấu từ tối đa 32px xuống 26px và tỷ lệ từ 10.5cqw xuống 8.5cqw để vừa khung hơn. Build PASS; chưa browser QA.
- 2026-09-28: Đổi chữ Quán Quân/Á Quân/Top 3 sang Georgia Bold Italic để gần kiểu chữ “Tất cả” trong asset, đồng thời giảm cỡ để luôn vừa khung. Build PASS; chưa browser QA.
- 2026-09-28: Đơn giản hóa chữ ba khung thi đấu về một lớp vàng kem, viền nâu và bóng nhẹ; giữ font nghiêng, căn giữa và tự co vừa lòng khung. Build PASS; chưa browser QA.
- 2026-09-28: Làm lại chữ Quán Quân/Á Quân/Top 3 bằng hai lớp: mặt vàng kem chuyển vàng cam và cạnh nổi đỏ nâu; giới hạn chữ trong 64% lòng khung, cỡ chữ co theo từng ô. Build PASS; chưa browser QA.
- 2026-09-28: Chỉnh lại chữ ba khung thi đấu sát mẫu vàng kim; dùng cỡ chữ theo kích thước từng khung để nhãn nằm gọn bên trong. Build PASS; chưa browser QA.
- 2026-09-28: Đổi nhãn ba khung đấu thành “Quán Quân”, “Á Quân”, “Top 3” và áp dụng chữ Cormorant Garamond nghiêng, gradient vàng, viền nâu đỏ cùng bóng nổi. Build PASS; chưa browser QA.
- 2026-09-28: Đặt tên ba asset `khung-thi-dau-1/2/3.png` theo thứ tự nguồn 2/3/1; khi chọn Vinh Quang Kỳ Đài hiển thị ba khung cùng kích thước trên một hàng, có nhãn tương ứng. Build PASS; chưa browser QA.
- 2026-09-28: Tăng khung sáng mục được chọn (`scale(1.16, 1.4)`) và hạ nhẹ 0.4% chiều cao để khớp ô bấm hơn. Build PASS; chưa browser QA.
- 2026-09-28: Đặt “Tất cả” làm mục được chọn mặc định và hiện khung chọn ngay khi mở Danh hiệu. Build PASS; chưa browser QA.
- 2026-09-28: Gỡ trạng thái hover trên sáu vùng bấm trong khung Danh hiệu; trạng thái đã chọn và focus bàn phím vẫn giữ nguyên. Build PASS; chưa browser QA.
- 2026-09-28: Bỏ bộ lọc làm tối ảnh nút “Tất cả”; giữ nguyên độ sáng asset kể cả khi đang chọn mục danh hiệu khác. Build PASS; chưa browser QA.
- 2026-09-28: Phóng khung Danh hiệu đến kích thước lớn nhất vừa viewport (`min(100vw, 133.03dvh)`) và giữ nguyên tỷ lệ ảnh 1450:1090. Build PASS; chưa browser QA.
- 2026-09-28: Thay nút “Tất cả” bằng asset `55ac6ca7-bf46-4204-9bf8-c0f6f9edb5df.png`, làm tối nút khi không được chọn và phủ asset `76991422-5c14-4970-b197-0141d169d35d.png` lên mục sau khi bấm chọn. Build PASS; chưa browser QA.
- 2026-09-28: Tách sáu mục danh hiệu thành vùng bấm riêng có trạng thái chọn và hỗ trợ bàn phím. Khi mục khác được chọn, “Tất cả” tối đi nhưng giữ icon/chữ nguyên từ asset; mục được chọn có nền vàng và quầng sáng. Build PASS; chưa browser QA.
- 2026-09-28: Dùng asset mới `44a8d880-69a1-4bc2-9add-24eedf845a66.png` cho khung Danh hiệu; nút sửa mở ảnh theo tỷ lệ gốc và nút X đóng. Build PASS; chưa browser QA.
- 2026-09-28: Gỡ màn khung Danh hiệu vừa thêm theo yêu cầu; asset gốc được giữ lại trong `src/assets` nhưng không còn dùng trong giao diện. Build PASS.
- 2026-09-28: Thử mở asset `03fa0740-bb82-4666-93cf-dcf9c7649b47.png` làm khung Danh hiệu rồi che menu và huy hiệu in sẵn; sau đó gỡ theo yêu cầu.
- 2026-09-28: Chuyển mặc định hiệu ứng mở sang `cover-transform`; flag `OPENING_MODE` vẫn cho phép so với `clip`. Nhánh cover dùng hai panel trái/phải trượt từ đường giữa ra ngoài bằng transform trong 1500ms; board render sẵn, không capture DOM và không animate clip-path. Build PASS; chưa browser QA.
- 2026-09-27: Bỏ scale 90% của ảnh nền để ảnh phủ kín vùng khung bằng `object-cover`; giữ neo góc trên trái và crop phần tràn trong wrapper; build PASS.
- 2026-09-27: Thu ảnh nền ProfileDialog còn 90%, neo ở góc trên bên trái trong cả Thông tin và Chỉnh sửa avatar; build PASS.
- 2026-09-27: Căn ảnh nền Thông tin/Chỉnh sửa avatar theo góc trên bên trái; bỏ lệch trái 5% ở chế độ chỉnh sửa để phần ảnh dư được crop bên phải/dưới trong khung overflow-hidden; build PASS.
- 2026-09-27: Thay ảnh nền cảnh của khung Thông tin và Chỉnh sửa avatar bằng asset mới `0ee91cbb-26f8-4bb8-bc0d-2fe1b86ad68b.png`; cả hai chế độ dùng chung ảnh trong ProfileDialog; build PASS.
- 2026-09-27: Thay bốn ký tự icon tab Chỉnh sửa avatar bằng SVG tương ứng mẫu cho Chọn khung, Chọn avatar, Huy hiệu và Hiệu ứng; build PASS.
- 2026-09-27: Thu vùng preview phía trên tab Chỉnh sửa avatar từ 185px xuống 170px để khoảng cách trên hàng tab cân với khoảng cách 8px bên dưới; build PASS.
- 2026-09-27: Tăng hàng tab trong AvatarCustomization từ 42px lên 50px, chữ từ 15px lên 17px và biểu tượng tab lên 20px; build PASS.
- 2026-09-27: Dùng `84870f28-d760-4ca4-aad2-cb485a10a2f1.png` làm ảnh nền cảnh trong khung Thông tin và chế độ Chỉnh sửa avatar của ProfileDialog; build PASS.
- 2026-09-27: Lưu “tỷ lệ avata” trong AVATA_RATIO/AVATA_TITLE_BADGE_STYLE và áp dụng ở HomePage, PlayerCard, ProfileDialog, AvatarCustomization. Plaque chuẩn là 174×48px; Home dùng HOME_AVATA_TITLE_BADGE_STYLE để quy đổi tọa độ từ vùng avatar có viền 128px của ProfileDialog sang vùng avatar Home không viền. Bốn nơi dùng ảnh giữ đúng kích thước qua `max-w-none` nếu tỷ lệ vượt 100%; build PASS.
- 2026-09-27: Thêm con trỏ bàn tay cho avatar cạnh tin nhắn trong khung chat.
- 2026-09-27: Cố định khung nút xếp/thoát hàng ở 142×44px để thay đổi ảnh theo trạng thái không làm icon mắt trong footer dịch chuyển.
- 2026-09-27: Làm mượt cuộn tin nhắn chat và hai bảng emoji/gợi ý; tự cuộn chat tới tin mới bằng requestAnimationFrame + smooth scroll, tôn trọng `prefers-reduced-motion`.
- 2026-09-27: Gỡ các thuộc tính `title` gây tooltip khi rê chuột trên trang cờ và component con; giữ `aria-label` để bảo toàn tên truy cập. Rà soát không còn tooltip `title` trong page/components/hooks game.
- 2026-09-27: Hiển thị con trỏ bàn tay khi rê lên avatar người chơi và avatar trong danh sách viewer/hàng chờ.
- 2026-09-27: Đặt bảng viewer ở trạng thái thu gọn mặc định khi vào phòng; nút mắt dùng để mở bảng. Build/typecheck PASS.
- 2026-09-27: Khi bảng viewer đóng, đưa nút xếp/thoát hàng xuống cạnh nút mắt ở footer, căn giữa theo trục dọc; khi mở bảng, nút vẫn nằm giữa phía trên khung.
- 2026-09-27: Đổi chéo icon cửa/mũi tên giữa hai thẻ Xếp hàng và Thoát hàng, giữ nhãn và trạng thái hiển thị theo từng nút. Tạo PNG tight-crop đúng kích thước hiển thị; không thêm animation. Build/typecheck PASS.
- 2026-09-27: Chuyển nút xếp/thoát hàng của bảng viewer ra phía trên khung danh sách, căn giữa và đặt cách khung 10px; khung danh sách giữ nguyên toàn bộ kích thước cũ. Build/typecheck PASS.
- 2026-09-27: Thêm chế độ xem thử viewer cục bộ qua `?viewer=1` trên Vite dev hoặc localhost; bật ngay cả ở trạng thái sẵn sàng và tự mở bảng người trong phòng. Mẫu có tổng cộng 3 người: hai người chơi trên bàn và viewer; khóa nước đi, mô phỏng xếp/thoát hàng và không gọi backend. Host production/phòng online không bị ảnh hưởng. Typecheck/build PASS.
- 2026-09-26: Sửa bóng hiệu ứng bay quân: bóng mặt bàn lớn hơn, nghiêng 7° và đặt lệch xuống/phải; giảm blur, chỉ hạ nhẹ opacity khi bay và giữ bóng gắn trên quân đậm hơn. Build/typecheck PASS.
- 2026-09-26: Khi nước ăn quân đồng thời chiếu Tướng, tiếng chiếu thay tiếng ăn quân; âm lượng tiếng chiếu tăng riêng từ 0.65 lên 0.95. Nước chiếu không ăn vẫn giữ tiếng đi quân cùng tiếng chiếu. Build/typecheck PASS.
- 2026-09-26: Chỉnh hiệu ứng bay quân thành 600ms: bay lên 100ms, giữ trên không 400ms, đáp xuống 100ms; nâng 10px. Các quân chạy đồng thời. Build/typecheck PASS.
- 2026-09-26: Dùng asset `1790439324411_2137874395677077050_7229889354659670468.mp4` làm âm báo chiếu Tướng. Preload một lần cùng các audio; chỉ reset/phát khi nước mới đặt Tướng đối phương vào chiếu, vẫn giữ tiếng đi quân/ăn quân. Build/typecheck PASS.
- 2026-09-26: Cho hiệu ứng nhấc quân chạy thử một lần sau 1 giây khi ván bắt đầu, dùng cùng chuyển động/bóng của hiệu ứng chiếu bí; một quân làm điểm nhấn bay trễ vì chưa có quân chiếu bí ở đầu ván. Nếu trận kết thúc trước đó thì hủy lượt xem trước. Build/typecheck PASS; chưa browser QA.
- 2026-09-26: Thêm hiệu ứng chiếu bí tại Board: các quân trên bàn bay lên/dừng/hạ xuống; quân vừa chiếu bí bắt đầu trễ 260ms. Bóng tách khỏi quân, mờ và nở theo độ cao; đổ bóng quân giảm khi bay rồi trở lại lúc đáp. Chỉ chạy khi `result.reason === 'checkmate'`, sau animation nước cuối; tôn trọng `prefers-reduced-motion`. Typecheck/build PASS; chưa browser QA.
- 2026-09-26: Audit move/audio: local human/bot move đều được store chốt qua `applyMove`; bỏ precheck trùng cho kết quả bot, vẫn báo lỗi nếu store từ chối. Undo khôi phục snapshot tin cậy; online vẫn để server gọi `applyMove`. Chỉ bật bỏ quét chiếu bí/hết nước ở mode `benchmark`, để dev bình thường giữ game-over scan. Sửa bộ đếm undo thành giảm sau mỗi lần dùng; intro chỉ bị pause ở nước đầu và reset khi gọi restart ván mới. Bổ sung test sound/store, sửa test socket đợi hết khai cuộc 1,3 giây. 56 test trọng tâm PASS, server integration PASS, build PASS. Full suite: 97/104 pass; còn 7 lỗi test tại `tests/chess-piece.test.tsx` và `tests/ui.test.tsx`, chưa xử lý trong task này.
- 2026-09-26: Khôi phục Chụp hình lấy PNG trực tiếp từ `main[data-screenshot-root]` bằng `html-to-image.toBlob`; bỏ status/alert và phần tử được đánh dấu loại trừ. Filter kiểm tra `Element` an toàn để tránh lỗi `node.getAttribute`; pixelRatio 1, có đo thời gian render/tải. Blob tạo tại click nên khớp UI hiện tại nhưng chậm hơn worker cache; build PASS.
- 2026-09-26: Dịch riêng panel danh sách người xem xuống 10px; giữ nguyên nút mở và kích thước panel; build PASS.
- 2026-09-26: Ghi lại tỷ lệ avatar/danh hiệu theo ảnh tham chiếu (avatar 166px; plaque rộng 147px, mép trên cách đỉnh avatar 156px, tâm lệch phải 3px) trong playerIdentityLayout.ts và áp dụng tỷ lệ co giãn cho PlayerCard; build PASS.
- 2026-09-26: Tách bảng “Mã phòng” từ ảnh tham khảo thành asset PNG trong suốt, bỏ mã mẫu và đặt khung cạnh nút Back (cách 15px); khung luôn hiện để thử UI với mã mẫu 123456; giảm kích thước khung và mã 25%, đặt khung vào giữa khoảng ngang từ nút Back tới mép bàn cờ, tự tính theo kích thước bàn; tăng nhẹ kích thước thêm khoảng 10%; build PASS.
- 2026-09-25: Điều tra con trỏ Busy bằng `performance.mark/measure` (500 nước khai cuộc): `applyMove` p95 0,0112 ms/max 0,5293 ms; `isMoveLegal` p95 0,0049 ms; `hasAnyLegalMove` p95 0,0044 ms; `getLegalMoves` p95 0,0166 ms. Hotspot là class `cursor-wait` trong animation, không phải tác vụ chặn main thread; đổi sang cursor mặc định nhưng giữ animation và khóa nước đi. 19/19 test bàn cờ và build PASS; Chrome Profiler không khả dụng trong phiên này.
- 2026-09-25: Giảm render thừa quân cờ: `cloneBoard` giữ reference quân không đổi, `PieceView`/`ChessPiece` dùng React.memo, key theo id ổn định, tọa độ bay/vị trí được làm tròn; test xác nhận quân tĩnh không render/remount khi một quân đi. Build PASS; 19/19 test component bàn cờ PASS. Toàn suite đạt 92/98; 6 lỗi còn lại ở server/store/UI ngoài phạm vi.
- 2026-09-25: Giữ asset “Từ chối” sáng rõ khi hiện, bỏ opacity pulse làm chữ mờ; mỗi thông báo mới nhún nhẹ hai nhịp và tăng sáng 25%.
- 2026-09-25: Dùng asset nút “Từ chối” hiện có, đặt chính giữa avatar máy/đối thủ và cho nháy nhẹ 2,2 giây. Mỗi lần từ chối mới có key riêng để animation khởi động lại thay vì chồng nhãn.
- 2026-09-25: Trong bàn với máy, chỉ bật nút yêu cầu hoàn tác sau khi người chơi đã tự đi ít nhất một nước; nước khai cuộc của máy không làm nút sáng sớm. Khi sáng, còn 2 lượt yêu cầu và mỗi lần máy từ chối trừ một lượt.
- 2026-09-25: Để thử UI từ chối hoàn tác ở bàn với máy, máy hiện từ chối yêu cầu, trừ một lượt yêu cầu và hiện khung “Từ chối” cạnh avatar máy trong 2,2 giây.
- 2026-09-25: Cho phép hoàn tác nước cuối cùng khi chỉ còn 1 ply trong lịch sử, kể cả khi lượt bình thường yêu cầu hoàn tác theo cặp 2 nước; đồng bộ khả năng này cho local với máy và server online để nút không bị khóa sớm.
- 2026-09-25: Bàn với máy xem thao tác hoàn tác là được chấp nhận ngay, nên reset lượt hoàn tác của người chơi về 2 sau khi hoàn tác thành công; nút vẫn mờ khi chưa đủ nước lịch sử để hoàn tác tiếp.
- 2026-09-25: Xác nhận server reset số lần hoàn tác của người yêu cầu về 2 khi đối thủ chấp nhận; sửa reset nhầm sự kiện từ chối ngay sau khi tạo để thông báo cạnh avatar được hiển thị.
- 2026-09-25: Phòng online phát thông báo từ chối hoàn tác kèm phe yêu cầu/người từ chối; người yêu cầu thấy khung “Từ chối” cạnh avatar đối thủ trong 2,2 giây.
- 2026-09-25: Khi lịch sử ván giảm do đi lại, phát âm thanh đi quân thay vì phân loại lại nước trước đó theo quân bị ăn; áp dụng cho bàn local với máy và snapshot phòng online.
- 2026-09-25: Nút Đi lại giữ nguyên độ sáng cả khi chưa có nước đi lại hoặc đang khóa trong animation; xóa opacity giảm riêng trên một phần icon, vẫn giữ thuộc tính disabled để không nhận click.
- 2026-09-25: Điều chỉnh lại trạng thái sáng/mờ của nút Đi lại: mờ khi chưa thể dùng hoặc hết lượt đi lại; sáng ngay khi dùng được. Khóa tạm trong animation không làm nút mờ.
- 2026-09-25: Nút Đi lại vẫn bị khóa trong lúc quân chạy animation nhưng không còn giảm opacity, tránh nháy mờ khi bấm lúc nút đang disabled.
- 2026-09-25: Chuyển lượt, vòng xanh và đồng hồ ngay khi nước đi hợp lệ được áp dụng; animation 250ms chỉ giữ quân đang bay làm lớp hiển thị. Đồng hồ bên mới chạy xuyên suốt animation, hoàn tất animation chỉ dọn trạng thái hiển thị.

- 2026-09-25: Thay animation đi/ăn quân bằng một đường bay ngang trực tiếp tới đích rồi đáp xuống, cố định 250ms dù xa/gần; độ nâng giữa đường chỉ 8px. Bỏ nghiêng, phóng to và nhịp nâng/đập riêng khi ăn. Đồng bộ timer hoàn tất nước đi; test quân cờ/máy và build (gồm typecheck) PASS, dist đã cập nhật. Chưa kiểm tra trực quan trong trình duyệt.
- 2026-09-25: Làm mượt animation quân sau phản hồi khựng: bỏ điểm trung gian/easing đổi nhịp và độ nâng, để quân đi liền theo một đường thẳng với easing giảm tốc nhẹ tại đích; giữ thời lượng 250ms.
- 2026-09-25: Điều chỉnh đường bay theo phản hồi: tăng thời lượng lên 350ms, giữ quân ở độ cao thấp 8px trong 90% quãng ngang và chỉ hạ xuống tại ô đích ở 10% cuối.
- 2026-09-25: Tăng thời lượng bay quân 350→400ms. Đồng hồ vẫn trừ bên đang có lượt; khi về 0 thì bên đó thua và đối thủ thắng (logic timeout hiện có).

- 2026-09-25: Giảm nhấp nháy bàn cờ khi tương tác quân: nguyên nhân là clock cập nhật Zustand mỗi 100ms khiến màn hình và toàn bộ Board diff liên tục; memo hóa Board và ổn định callback chọn/khởi động để Board chỉ render lại khi props bàn thay đổi.
- 2026-09-25: Tiếp tục xử lý nhòe/nháy khi thả quân: tách transform nâng quân đang chọn khỏi transform Web Animations lúc ăn quân để hai animation không ghi đè nhau; bỏ transition cho filter bóng sáng để không nội suy nhòe.
- 2026-09-25: Sửa nhòe toàn bộ quân khi thao tác: bỏ thu phóng GPU chung cho lớp quân, tính kích thước/tọa độ từng quân trực tiếp ở tỷ lệ hiển thị, bỏ phóng to ảnh khi chọn; bóng quân cũng co theo tỷ lệ và ảnh quân không cho trình duyệt kéo/thả mặc định. Build PASS; chưa có trình duyệt kết nối để kiểm tra trực quan.
- 2026-09-25: Làm lại animation quân theo video tham chiếu: một timeline 300ms đồng bộ quãng đi, độ cao và độ nghiêng; quân đi phẳng phần đầu, nhấc cao sát ô đích, rồi hạ ngang hoàn toàn để hai đầu chạm bàn cùng lúc. Nước ăn dùng cùng chuyển động.
- 2026-09-25: Làm mượt nhịp đáp quân: bỏ các keyframe hạ quá sát nhau gây đổi easing/giật vận tốc; chuyển từ đỉnh nâng xuống tư thế phẳng bằng một nhịp ease-in-out duy nhất, vẫn giữ tổng thời lượng 300ms.
- 2026-09-25: Nút “Sẵn sàng” giữa bàn cờ thay bằng asset `src/assets/buttons/ready-button-ss.png`, cắt từ `src/assets/ss.png` thành PNG nền trong suốt; giữ kích thước hiển thị và hành vi cũ.
- 2026-09-25: Làm nút “Sẵn sàng” bớt vàng/sáng hơn nhẹ bằng imagegen, thêm bóng mềm trong asset; giảm kích thước hiển thị từ 205/162px còn 190/150px (desktop/compact).
- 2026-09-25: Thu nhỏ thêm nút “Sẵn sàng” còn 170/135px (desktop/compact), thay asset bằng bản bóng đậm và sắc hơn, ít blur.
- 2026-09-25: Chỉnh bóng asset nút “Sẵn sàng” theo ảnh tham chiếu: đổ lệch xuống-phải, rõ vừa phải và mềm nhẹ; không đổi kích thước nút hoặc nội dung.
- 2026-09-25: Khung người trong phòng kéo dài tới đáy vùng bên trái. Cắt sát alpha của hai ảnh viền thành `*-tight.png` từ nguồn gốc, không đổi nội dung; thẻ vàng/xanh cùng cao 40px, ôm sát nội dung, padding ngang 10px, căn trái và gap dọc 10px. Nhóm số/avatar/tên thẻ vàng căn giữa chiều dọc. Khi danh sách đầy, phần trong bảng cuộn dọc. Nút mắt mờ như nằm dưới bảng khi mở nhưng vẫn bấm được để đóng; chạm nơi khác không đóng. Chưa QA trong browser vì phiên không kết nối.
- 2026-09-24: Cắt đủ 14 PNG quân cờ từ hai ảnh người dùng thêm vào `src/assets/coden.png` (đen) và `src/assets/codo.png` (đỏ). Asset ở `src/assets/pieces/coden-codo-v1/` được tách nền alpha và trim sát viền; `ChessPiece` chỉ render ảnh crop, bỏ CSS drop-shadow cũ.
- 2026-09-24: Thêm bóng đổ ngoài cho quân cờ, lệch 4px sang phải và 7px xuống, blur 3px để bóng lớn hơn nhưng vẫn sắc; không thay asset, tọa độ hoặc vùng bấm.
- 2026-09-24: Board chuyển sang bộ 14 PNG `*-ai-v1.png`: quân gỗ nổi mặt kem, viền/glyph đỏ hoặc đen và thân dày phía dưới theo ảnh tham chiếu người dùng. Giữ nguyên luật, tọa độ, kích thước hiển thị và vùng bấm; bộ honey-gold-v5 cũ được giữ để đối chiếu.
- 2026-09-23: Hoàn tác các thử nghiệm riêng của Tốt đỏ về `red-soldier-reference-v12-tight.png`, đồng bộ lại tông gỗ, mặt, vòng và chữ với bộ quân đỏ hiện tại; vẫn hiển thị 54×57px. Các quân khác giữ nguyên.
- 2026-09-23: Kéo khung/vòng trong của Tốt đỏ xuống thêm 2px: asset `red-soldier-reference-v17-ring-down-4px-tight.png` giữ mép trên `y=11`, đáy vòng tại `y=155` (tổng cộng thấp hơn bản gốc 4px). Các phần khác giữ nguyên.
- 2026-09-23: Tốt đỏ giữ cùng kích thước hiển thị 54×57px và alpha 200×200px như các quân đỏ khác; asset `red-soldier-reference-v16-ring-down-2px-tight.png` giữ mép trên vòng đỏ tại `y=11` và mở đáy vòng xuống thêm 2px đến `y=153`. Chữ/thân quân và các quân khác giữ nguyên.
- 2026-09-23: Thử riêng Tốt đỏ với asset `red-soldier-reference-v14-black-wood-tight.png`: giữ chữ/vòng đỏ và dáng nghiêng, đổi mặt/thân sang tông gỗ vàng cam đậm theo Tốt đen hiện tại; alpha được crop sát đủ 200×200px. Các quân còn lại giữ nguyên.
- 2026-09-23: Tạo phiên bản mới của đủ bộ quân đỏ, chỉ làm chữ `車/馬/相/仕/帥/炮/兵` sáng và đỏ tươi hơn; giữ nguyên viền đỏ nâu, mặt kem, thân gỗ, alpha, kích thước và các asset gốc để hoàn tác.
- 2026-09-23: Hoàn thiện toàn bộ quân đỏ `車/馬/相/仕/帥/炮/兵` theo phong cách Pháo v8: cùng mặt kem oval nâng lên, viền đỏ, thân gỗ dày và alpha crop sát 200×200px; kể cả Tốt đỏ đã chuyển sang bộ mới. Kích thước hiển thị đỏ giữ 54×57px, quân đen không đổi.
- 2026-09-23: Chuẩn hóa kích thước nhìn thấy của Pháo đỏ theo Tốt đỏ: asset `red-cannon-reference-v8-tight.png` có canvas và alpha bounding box cùng 200×200px, tiếp tục hiển thị trong container đỏ 54×57px. Các quân khác giữ nguyên.
- 2026-09-23: Thử riêng quân Pháo đỏ bằng asset `red-cannon-reference-v7-tight.png` tạo theo ảnh mẫu: mặt kem oval nâng lên, viền/chữ đỏ và thân gỗ dày phía dưới; PNG alpha được crop sát và chuẩn hóa 200×200px. Các quân đỏ khác và quân đen giữ nguyên.
- 2026-09-22: Quân đen giữ sprite/bóng cũ 56×56px. Tốt đỏ dùng asset `兵` alpha mới, mặt trong/vòng viền nâng lên để phần chân gỗ dưới rõ hơn; asset crop sát và tối ưu 200×200px, hiển thị 58×58px. Các quân đỏ còn lại giữ render cũ.
- 2026-09-23: Hoàn tác bộ PNG v6 của sáu quân đỏ `车/马/相/仕/帅/炮`; các quân này dùng chung asset vỏ rỗng `red-empty-shell-v1-tight.png`, đã xóa mặt kem và chữ thành alpha trong suốt, chỉ giữ viền/vỏ ngoài. Năm Tốt đỏ giữ nguyên `red-soldier-reference-v9-tight.png` ở 54×57px; quân đen giữ sprite 56×56px. Giữ quy tắc bắt buộc build lại `dist/` sau mỗi nhiệm vụ có thay đổi project.

- 2026-09-22: Làm chữ/vòng trong của quân đỏ sáng và đỏ hơn nhẹ (`#93271D`), giữ nguyên toàn bộ khung gỗ lấy từ quân đen; tăng kích thước quân và vùng bấm từ 52px lên 54px, không đổi tọa độ bàn.

- 2026-09-22: Sửa lại bộ quân đỏ sau khi đối chiếu mẫu: dùng trực tiếp khung, màu gỗ, highlight và thân dưới của sprite quân đen; chỉ giữ mặt chữ/vòng trong đỏ `#7A1D14`. Hai sprite nay cùng kích thước 2297×311 và cùng lưới cắt.

- 2026-09-22: Tăng độ đậm khung/thân gỗ của riêng bộ quân đỏ để cân với quân đen; chuẩn hóa chữ và vòng trong về `#7A1D14`, giữ nguyên hình dáng, kích thước sprite và khe alpha.

- 2026-09-22: Làm lại hai sprite quân đen/đỏ với thân gỗ phía dưới dài và lồi hơn, mặt quân nhích lên; giảm sắc vàng sang tông be-nâu dịu gần màu bàn cờ. Tách 7 ô sprite bằng khe alpha sạch và cập nhật kích thước viewBox; chờ browser QA trực quan.

- 2026-09-22: Hoàn thiện lại sprite quân theo hai ảnh cận cảnh: thân ngoài tròn, mặt chữ/vòng trong nhích lên, viền dưới vàng dày và lồi; thêm khoảng alpha 20px giữa từng ô sprite và mask tròn để loại mảnh dư. Giữ bóng nâu đậm/ít blur; typecheck/build PASS, chưa browser QA.
- 2026-09-22: Chỉnh lại hai sprite quân theo ảnh cận cảnh: dáng bầu dọc, phần trên thu nhẹ và đáy nở/dày hơn; bóng nâu tăng opacity, offset xuống-phải và giảm blur. Cập nhật viewBox theo kích thước sheet mới; typecheck/build PASS, chưa browser QA.
- 2026-09-22: Tách lại quân cờ từ hai ảnh mẫu thành hai sprite sheet nền trong suốt `black-pieces-v2.png` và `red-pieces-v2.png`, đủ 7 loại quân mỗi bên; Board cắt sprite theo loại quân và thêm drop-shadow nâu lệch xuống-phải theo mẫu. Typecheck/build PASS; chưa có browser QA trực quan.
- 2026-09-22: Làm lại bàn cờ theo ảnh `c7ad3098-859f-443b-819c-e9f9a521b7b6.png`: nền gỗ sáng/viền nổi/lưới mới ở tỷ lệ bàn cũ 532×608, nhãn giữa đổi thành `hoangbbcg`, quân cờ dùng bộ PNG gỗ cùng phong cách thay cho vẽ CSS. Tạo asset `src/assets/boards/maple-xiangqi-board-v2.png` từ ImageGen; typecheck/build PASS. Chưa có browser QA trực quan.

- 2026-09-21: Dùng `src/assets/tach_ban_da_03_co_luc.wav` làm tiếng đi quân. Hook giao diện chỉ phát khi `lastMove` thực sự đổi, áp dụng local/máy/online và không phát khi khởi tạo hoặc reset. Typecheck/build PASS.

- Lịch sử/Bạn bè/Xếp hạng: phủ lớp kem 32% lên texture nền giấy để màu nhẹ hơn, vẫn giữ vân giấy.

- Bạn bè/Xếp hạng: dùng cùng nền giấy nâu vàng `history-parchment-background.png` cho khung nội dung, đặt dưới dữ liệu và điều khiển hiện có.

- Lịch sử: tạo history-parchment-background.png (1024×1536, alpha đặc toàn ảnh) bằng imagegen làm nền giấy nâu vàng cho khung danh sách, dùng `cover`/`center` dưới các hàng dữ liệu.

- Lịch sử: bỏ texture lặp gây sọc dọc ở footer, thay bằng gradient gỗ nâu liền mạch.

- Lịch sử: cắt texture gỗ nâu trống 55×60 từ footer của history-reference.png và dùng làm nền lặp cho footer lịch sử thay cho gradient CSS.

- Lịch sử: thay tiêu đề CSS bằng history-banner.png tạo qua imagegen từ banner Bạn bè, chữ Lịch sử vàng nổi. Bỏ mảng oval che chữ và các lớp chữ CSS; làm sạch alpha dưới 32 và trim còn 2135×370, giữ chiều rộng header 650px.

- Lịch sử: sửa tiêu đề gradient bị bóng nâu che bằng cách tách lớp viền/bóng phía sau và lớp chữ vàng phía trước; căn giữa vùng header 60px. Build kiểm tra kỹ thuật, chưa kiểm chứng trực tiếp trong trình duyệt.

- Lịch sử đấu: tiêu đề Lịch sử có gradient vàng sáng dần lên trên như Bạn bè và được căn giữa theo bounding box thật của chữ.
- Lịch sử đấu: làm sắc nét tiêu đề Lịch sử bằng cách bỏ gradient và drop-shadow kép gây mờ, dùng màu vàng đặc, viền nâu mảnh và một bóng cứng.
- Lịch sử đấu: làm lại typography tiêu đề Lịch sử theo mẫu Bạn bè bằng Georgia đậm nghiêng, gradient vàng, viền nâu mảnh và bóng tối gọn; bỏ hiệu ứng làm chữ phồng.
- Lịch sử đấu: tiêu đề Lịch sử được chỉnh serif nghiêng, nét đậm, vàng kem và bóng/viền nâu theo chữ Bạn bè trên banner.
- Lịch sử đấu: tăng độ phai ở nửa phải dải xanh của hàng Thua và chuyển về kem sớm hơn.
- Lịch sử đấu: tăng độ nhận biết dải xanh của hàng Thua ngay sau avatar và cho xanh mờ dần sang trắng kem ở bên phải, tránh trùng màu hàng Thắng.
- Lịch sử đấu: nhãn Thua được nhích lên và sang trái 2px khi hiển thị; asset được khôi phục sạch từ ảnh nguồn để không tạo bóng chữ hoặc mảng nền.
- Lịch sử đấu: cả dải Thắng và Thua chỉ phủ màu trạng thái hơi quá nửa khung, sau đó nhạt dần về trắng kem ở mép phải.
- Lịch sử đấu: nền xanh của hàng Thua chỉ phủ hơi quá nửa dải tên rồi chuyển về trắng kem; tăng nhãn Thắng/Thua từ 36px lên 39px.
- Lịch sử đấu: làm dịu tông xanh của trạng thái Thua ở cả dải nền và nhãn kết quả.
- Lịch sử đấu: trạng thái Thua dùng dải nền xanh nước nhạt; asset nhãn Thua được chỉnh xanh nước đậm hơn để tách rõ hai lớp.
- Lịch sử đấu: hoàn tác lần tăng kích thước/nền vừa rồi; chỉ dải người chơi có kết quả Thắng dùng nền vàng, hàng Thua giữ nền kem cũ; nhãn trở lại 36px.
- Lịch sử đấu: tăng nhãn Thắng/Thua từ 36px lên 39px và tăng sắc vàng kem của dải tên bên ngoài nhãn theo ảnh mẫu.
- Lịch sử đấu: hoàn tác xử lý nối màu trước đó; dựng lại nhãn từ ảnh nguồn, bỏ viền gấp trang trí bên phải và chỉ giữ phần màu vàng/xanh bên trong.
- Lịch sử đấu: xóa đường gấp/viền đứng tại điểm nối bên trái nhãn Thắng/Thua, cho sọc màu chuyển liền vào thân nhãn; chi tiết viền gấp chỉ còn ở mép phải.
- Lịch sử đấu: giảm nhẹ chiều cao nhãn Thắng/Thua từ 39px xuống 36px, giữ đúng tỷ lệ ảnh.
- Lịch sử đấu: thu nhãn Thắng/Thua từ 43px xuống 39px và thêm dải vàng kem chuyển từ sau avatar qua tên tới nhãn theo ảnh mẫu.
- Lịch sử đấu: khôi phục phần sọc chuyển màu bên trái của nhãn Thắng/Thua theo ảnh nguồn, giữ alpha sát viền và làm mềm điểm nối với thân huy hiệu.
- Quy chuẩn asset: bổ sung quy tắc tight-crop bắt buộc toàn project vào `AGENTS.md`; nhãn Thắng/Thua được nâng độ phân giải, làm nét từ đúng ảnh tham chiếu và `img` bỏ toàn bộ margin/padding/border.
- Lịch sử đấu: cắt lại asset Thắng/Thua, loại bỏ dải nền và đường viền hàng bị dính ở bên trái/trên/dưới; giữ mép ngoài trong suốt thật và hiển thị nhãn sát khung tên.
- Lịch sử đấu: tăng avatar 48→51px và dải tên 40→43px; thay huy hiệu CSS bằng hai nhãn Thắng/Thua cắt nguyên từ `history-reference.png`. Bản v2 mask sát đường viền khuyết, bốn góc alpha 0, phóng 2× và sharpen nhẹ chữ; UI hiển thị cao 37px để giữ đúng tỷ lệ.
- Lịch sử đấu: tách avatar 48px ra khỏi khung tên; dải tên/kết quả giảm còn cao 40px, lùi 8px dưới avatar và không còn phần khung/padding thừa ở bên trái.
- Lịch sử đấu: giảm nhẹ cỡ tên người chơi 19→18px và bỏ cạnh viền trái của hai ô người chơi; giữ avatar, kết quả và ba cạnh còn lại.
- Lịch sử tab Đã xem: bỏ khối thông báo `flex-1` làm lưới bảy hàng bị ép chiều cao; ba ván đã xem giờ dùng cùng chiều cao hàng với tab Đã chơi, không còn chồng avatar/quân/nút.
- Lịch sử đấu: cắt trực tiếp từ `history-reference.png` bốn asset alpha sát viền cho hai tab Đã chơi/Đã xem, nút Xem lại và quân úp; thay toàn bộ phần CSS cũ bằng asset mới, giữ callback/tab. Tab đang chọn luôn đỏ, tab còn lại nâu đen; hai ảnh cao 54px và căn giữa theo chiều dọc. Nút Xem lại dùng khung cắt sát 151×52px, bỏ chữ/icon mờ trong ảnh và render lại nội dung bằng HTML để sắc nét. Nguồn/toạ độ ghi tại `src/assets/history/history-crops.md`.
- Lịch sử đấu: thay vỏ dialog và khung nội dung bằng cùng bộ khung gỗ/giấy, nền phong cảnh và họa tiết góc đang dùng ở Bạn bè/Xếp hạng; tiêu đề dùng trực tiếp `friends/friends-banner.png` cùng kích thước/vị trí của Bạn bè, che phần chữ nhúng sẵn và đặt Lịch sử chính giữa. Giữ nguyên tab, dữ liệu và hành vi xem lại. Typecheck/build PASS; Browser không có kết nối nên chưa visual QA.
- Xếp hạng: phóng huy hiệu top 3 thêm 10%, tăng sáng nhẹ và hai đốm lấp lánh có tôn trọng reduced motion; avatar Xếp hạng tăng 76→84px. Avatar Bạn bè giữ nguyên.
- Xếp hạng: dựng bảng năm hàng theo ảnh 85c9c123-6b5c-4c6d-889d-7da5726e49dc, cột Hạng/Người chơi/Điểm/Thao tác; dùng chung SocialAvatar, khung giấy và nút với Bạn bè qua SocialUi.tsx. Huy hiệu 1–3 tách bằng ImageGen, hạng 4–5 dùng nền rỗng + số HTML/Tailwind. Mảng nâu trái avatar Bạn bè kéo dài thêm 14px. Typecheck/build PASS; browser không có kết nối nên chưa visual QA. Dữ liệu xếp hạng vẫn minh họa.
- Bạn bè: Chấp nhận khóa một dòng, giảm padding/gap để vừa nút; hai nút nhận/từ chối cao 52px. Thanh tiêu đề cao 50px, chữ 27px đậm nghiêng và bỏ phong bì theo mẫu. Chưa browser QA.
- Bạn bè: thu Chấp nhận/Từ chối còn 165×56px; dịch avatar phải thêm 6px, giữ vị trí tên bằng giảm khoảng cách tương ứng. Chưa browser QA.
- Bạn bè: chữ Mời chơi chuyển sang HTML dùng chung font/cỡ/màu với nút hành động, nền dùng asset sạch; giữ icon kiếm từ ảnh gốc. Chưa browser QA.
- Bạn bè: nút hành động chữ nhật giảm rộng 183→173px, tăng cao 54→60px; mảng nâu cấp bậc cao thêm 6px, thêm hoa văn nâu chỉ bên trái avatar. Chưa browser QA.
- Bạn bè: dịch avatar/tên sang phải 16px, bỏ nền nâu sau avatar; mảng cấp bậc nhô trái 38px và chuyển mép nhọn sang đường lượn tròn. Chưa browser QA.
- Bạn bè: đổi mảng nền nâu bo tròn thành mép nhấp nhô nhỏ có nét hoa văn, tăng độ đậm; nhô 24px bên trái cấp bậc theo ảnh đối chiếu.
- Khung nội dung Bạn bè đổi sang giấy kem, viền kép mảnh; thêm vùng nâu nhẹ sau avatar và cụm cấp bậc/nút theo mẫu. Chưa xác nhận trực quan trong browser.
- 2026-09-21: Cắt và làm sạch khung tiêu đề đỏ 1102×58 từ ảnh Lời mời; áp dụng asset nền thật cho Gợi ý cho bạn/Lời mời đã nhận/Đã gửi lời mời. Chữ đồng bộ Times New Roman đậm nghiêng 29px, vàng kem và bóng nâu theo mẫu. Typecheck/build PASS, dist đã cập nhật.
- 2026-09-21: Đồng bộ chiều cao hàng Thêm bạn/Lời mời theo danh sách Bạn bè ở 85px; ô tìm kiếm Thêm bạn dùng cùng font Times New Roman nghiêng 21px và màu kem của ô tìm danh sách. Nút Tìm dùng kính lúp SVG 31px, chữ 21px; nút vàng dùng màu chữ chuẩn #2b1909. Typecheck/build PASS, dist đã cập nhật.
- 2026-09-21: Thay icon người+ tự vẽ trên nút Kết bạn/Chấp nhận bằng PNG tách trực tiếp từ ảnh nguồn, nền alpha thật; hiển thị trong ô 35×35px để phần hình khoảng 31×31px như icon nút Mời chơi. Typecheck/build PASS, dist đã cập nhật.
- 2026-09-21: Đồng bộ nội dung tất cả nút hành động Bạn bè với nút Mời chơi: chữ Times New Roman đậm nghiêng 21px, icon 31–35px; tách thêm nền hồng 210×62 cho Đã gửi/Từ chối/Hủy lời mời để chữ và icon không bị co theo ảnh. Typecheck/build PASS, dist đã cập nhật.
- 2026-09-21: Chuẩn hóa kích thước nút hành động Bạn bè theo nút Mời chơi 183×54px: Kết bạn, Đã gửi, Chấp nhận, Từ chối và Hủy lời mời; giữ nút chat vuông riêng. Typecheck/build PASS, dist đã cập nhật.
- 2026-09-21: Lời mời Bạn bè dùng ba asset cắt trực tiếp từ ảnh nguồn cho Chấp nhận/Từ chối/Hủy lời mời, giữ nguyên chữ, icon, màu và viền mẫu; Chấp nhận/Từ chối nằm ngang cách 10px, các góc ngoài có alpha thật. Typecheck/build PASS, dist đã cập nhật.
- 2026-09-21: Tách nền nút hành động Bạn bè 210×62 từ nút “Mời chơi”, giữ viền/màu/alpha gốc; các nút Kết bạn/Chấp nhận/Từ chối/Hủy lời mời dùng trực tiếp asset mới ở kích thước 183×54px, chữ đen đậm nghiêng 21px và icon SVG 28–35px theo tỷ lệ mẫu. Bỏ padding ngang để hàng Thêm bạn/Lời mời chạm sát viền trong khung. Typecheck/build PASS, dist đã cập nhật.
- 2026-09-21: Giảm thời gian tìm nước Pikafish tối đa từ 3000 xuống 1000ms; vẫn giảm thêm khi gần hết giờ. Typecheck và 4/4 kiểm thử Pikafish (gồm engine/HTTP thật) PASS.
- 2026-09-21: Tích hợp Pikafish 2026-09-06 native + NNUE chính thức vào Chơi Với Máy; lựa chọn đầu/mặc định là Pikafish, Đấu ngay kiểm tra engine và vào ván, hỗ trợ Đỏ/Đen/Ngẫu nhiên. Backend UCI tách controller/service, kiểm tra lịch sử/nước trả về, giới hạn CPU/hash/số tiến trình/timeout, hủy khi rời/reset/kết thúc; lỗi có thử lại. Giữ máy cơ bản cho Chơi nhanh/Cờ Úp. Đã cài engine Windows và giấy phép/nguồn ở engines/pikafish; sửa đường dẫn NNUE tương đối cho workspace tiếng Việt. Typecheck/build PASS, 73/73 tests PASS gồm engine thật 4 nửa-nước, HTTP thật và lifecycle React; dist đã cập nhật. Browser không có kết nối nên chưa visual QA. NNUE có điều kiện không thương mại khi chưa được phép; hướng dẫn trong engines/pikafish/README.md.
- 2026-09-20: Đồng bộ font hai tab Thêm bạn/Lời mời theo tab Danh sách: ô nhập, tiêu đề và nút chuyển từ font-chess/Arial sang Times New Roman nghiêng, giữ nguyên cỡ và layout.
- 2026-09-20: Bộ lọc Bạn bè tách nguồn hiển thị: Tất cả chỉ online/offline, Đang online chỉ online, Bạn Facebook chỉ tài khoản Facebook; đổi nhãn nút Facebook thành “Bạn Facebook”.
- 2026-09-20: Ô tìm Bạn bè tăng riêng phần nhìn thấy 42→50px qua lớp phủ nên không dịch các layout khác, viền giảm 2→1px; thêm lọc theo tên và nút × xóa toàn bộ nội dung khi đã gõ.
- 2026-09-20: Thu avatar chung Bạn bè cùng khung vàng 86→76px, padding 5→4px để vừa hàng hơn.
- 2026-09-20: Hoàn tác avatar chân dung Bạn bè và thay toàn bộ bằng `icons/avatar.svg` theo mẫu người dùng: nền xanh đậm, kỳ sĩ vàng, khung tròn vàng gradient như Home.
- 2026-09-20: Làm rõ khung avatar Bạn bè theo phản hồi: thay gradient khó thấy bằng viền vàng đặc 6px, vòng trong xanh đậm và kích thước ngoài 86px.
- 2026-09-20: Avatar Bạn bè dùng khung tròn hai lớp theo mẫu: vòng ngoài vàng dày, nền tròn tối bên trong và chân dung được clip hoàn toàn trong vòng trong; không dùng outline ngoài.
- 2026-09-20: Bỏ outline/ring CSS thừa quanh avatar Bạn bè vì chồng với vòng vàng đã có trong asset, loại bỏ vòng vàng lộ ở phía trên.
- 2026-09-20: Sửa khung avatar Bạn bè: bỏ nền gradient/padding chồng vào ảnh, thay bằng outline và ring tròn hoàn toàn nằm bên ngoài chân dung.
- 2026-09-20: Avatar Bạn bè thêm khung tròn vàng-nâu theo avatar Home (gradient, viền và bóng); giữ ảnh chân dung bên trong 78px.
- 2026-09-20: Tăng khoảng avatar→tên trong hàng Bạn bè 32→42px.
- 2026-09-20: Khung danh sách Bạn bè tăng cao 412→427px; mép dưới hạ 15px và năm hàng giãn theo phần cao mới.
- 2026-09-20: Giảm trạng thái Bạn bè 21→19px, giữ font-medium.
- 2026-09-20: Giữ trạng thái Bạn bè 21px nhưng giảm font-semibold→font-medium theo phản hồi để nét chữ nhẹ hơn.
- 2026-09-20: Trạng thái trong hàng Bạn bè tăng 19→21px và font-medium→font-semibold theo yêu cầu.
- 2026-09-20: Hàng Bạn bè tăng khoảng avatar→chữ 20→32px, thu tên 24→22px và giảm trạng thái từ bold xuống medium; Facebook đổi thành icon ô vuông xanh 25px với chữ f trắng theo mẫu.
- 2026-09-20: Hàng Bạn bè tăng avatar 68→78px, khoảng avatar→chữ 12→20px; tên tăng 20→24px, trạng thái tăng 16→19px và hạ cách tên 8px để tách hai dòng theo mẫu.
- 2026-09-20: Vùng danh sách Bạn bè đổi thành một khung kem vàng liền mạch với viền kép và bóng trong; bỏ ô bo góc riêng từng người, thay bằng các hàng nối nhau phân cách qua đường kẻ ngang mảnh.
- 2026-09-20: Thu hai nút ảnh Bạn bè theo tỷ lệ, cao 62→54px (Mời chơi 210→183px rộng, Nhắn tin 72→63px rộng) để giảm chiều cao mà không làm méo asset.
- 2026-09-20: Cắt trực tiếp nút Mời chơi 210×62px và Nhắn tin 72×62px từ `friends-list-source.png`, mask góc ngoài thành alpha trong suốt; FriendsDialog dùng hai asset để giữ màu, viền, bóng và icon khớp mẫu.
- 2026-09-20: Nút Mời chơi Bạn bè tăng 126×38→178×50px; nút chat tăng 44×38→60×50px, đồng thời tăng icon kiếm, bong bóng chat và chữ theo tỷ lệ mẫu.
- 2026-09-20: Tạo sáu `friend-avatar-*-portrait.png` bằng cách cắt đúng vùng chân dung/vòng vàng 63×63px từ asset gốc; FriendsDialog dùng trực tiếp ảnh mới nên không còn lệch tâm, vòng lá hay nhãn danh hiệu. Dải hàng lấy lại tông kem mẫu #E0C698–#EBD2A5.
- 2026-09-20: Sửa avatar Bạn bè bị lệch bằng cách căn giữa ảnh nguồn trong khung tròn; đổi dải từng hàng từ nâu đậm sang kem vàng nhạt, viền và bóng nhẹ theo ảnh mẫu.
- 2026-09-20: Hàng Bạn bè theo mẫu: avatar chỉ còn chân dung trong khung tròn, bỏ nhãn danh hiệu; thêm cột quân cờ, tên cấp bậc và sao; từng hàng có dải vàng nâu và viền bao riêng.
- 2026-09-20: Khôi phục nền kem sáng của khung danh sách Bạn bè; thêm dải gradient vàng nâu nhẹ trên từng hàng để bao toàn bộ nội dung người chơi theo mẫu, thay vì làm đậm nền khung chung.
- 2026-09-20: Danh sách Bạn bè tăng avatar 88×72→96×78px; nền vùng năm hàng đổi sang gradient vàng nâu đậm hơn, giữ tông kem-gỗ của khung hiện có.
- 2026-09-20: Tab Danh sách Bạn bè giãn hai khoảng cách dọc 8→14px, tăng vùng năm hàng 390→412px để hàng thoáng hơn và giữ khoảng trống đáy khoảng 35px.
- 2026-09-20: Tab Danh sách Bạn bè chỉ hiển thị năm người đầu trong năm hàng cố định cao 390px, để lại vùng trống ở dưới danh sách theo mẫu.
- 2026-09-20: Nâng tiếp phần tab và nội dung Bạn bè 16px (padding trên 68→52px), giữ banner tại vị trí vừa chỉnh.
- 2026-09-20: Tinh chỉnh khung Bạn bè: hạ banner 12px (-62→-50px), đồng thời nâng tab và nội dung bên dưới 12px (padding trên 80→68px).
- 2026-09-20: Đồng bộ khung Bạn bè theo Xếp hạng: cao 750px, giữ cùng công thức scale theo khung 780px để không nở chiều rộng; banner “Bạn bè” thu 720→650px và nâng -24→-62px.
- 2026-09-20: Xác nhận sáu avatar Bạn bè `friend-avatar-*-cutout.png` đều có alpha 0 ở bốn góc; giữ nền ngoài trong suốt và bổ sung quy ước asset trong AGENTS.md: chỉ giữ chân dung, vòng hoa và nhãn danh hiệu, không đưa lại khung nền hình chữ nhật.
- 2026-09-19: Nền GamePage giữ blur tối đa 0.6px sát bàn, rõ dần về bốn mép khung ngoài bằng lớp ảnh sắc nét cùng scale/vị trí và mask chuyển tiếp. useBoardLayout đo vị trí bàn thật, cập nhật mask khi resize để áp dụng desktop/compact. Không tăng blur hoặc đổi bàn/điều khiển. Typecheck/build và 18/18 UI tests PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Chuyển mặt bàn và vùng sông sang cam nâu ấm: giữa #f3bf80, vùng chính #ecab66/#df9650, mép #b36b30; giữ chuyển sáng giữa/tối dần sát viền. Không đổi nền hoặc thành phần khác. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Mặt bàn chuyển gradient xuyên tâm: giữa sáng #f1c58a, chuyển mềm qua màu gỗ mật ong đến nâu #a86d37 ở mép, bóng chìm đều quanh viền; vùng sông sáng giữa đồng bộ. Giảm blur nền 1.5→0.6px. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Giảm blur nền GamePage 3→1.5px; chỉnh mặt bàn từ vàng sáng sang nâu gỗ ấm (#c58b50, tâm #d8a166), giảm lớp sáng và đồng bộ dải sông nâu mật ong. Giữ viền/quân/tọa độ và UI khác. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Chỉnh riêng nền/mặt bàn GamePage theo ảnh tham chiếu: import nền home.png, cover/căn giữa/phóng 116%, blur 3px và lớp tối nhẹ hai bên. Board giữ canvas 532×608 và toàn bộ tọa độ/quân/hit target; đổi mặt gỗ vàng ấm, viền vàng nhiều lớp và góc trang trí SVG, dải sông có mây. Không đổi avatar/chat/nút/gameplay. Typecheck/build và 18/18 UI tests PASS, cập nhật dist; chưa browser QA nên chưa xác nhận độ giống ảnh.
- 2026-09-19: Dời cả hàng bốn cụm chế độ Home lên 10px thực tế bằng offset bù scale 55→45; giữ kích thước 205px và căn hàng bảng tên. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Căn hàng bảng tên bốn cụm Home theo tọa độ trong ảnh cắt: bù Chọn Bàn 50px và Chơi Với Máy 55px trên canvas ảnh cao 701px, offset tỷ lệ theo kích thước hiển thị. Tăng chiều rộng desktop 190→205px, giữ tỷ lệ và vị trí vùng bố cục; compact vẫn co vừa ô. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Khôi phục vùng chiếm chỗ cũ của hàng chế độ Home (ô vuông 175px tối đa + khoảng cách + vùng nhãn 82/48px) để thay ảnh nguyên cụm không làm hàng tự dịch xuống. Ảnh neo theo vị trí ô cũ, rộng desktop 170→190px thực tế, cao theo tỷ lệ; compact giới hạn vừa ô. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Thay đủ 4 ô Home bằng nguyên cụm hình+bảng chữ từ game action.png. Thứ tự đã xác nhận 1→1, 2→4, 3→3, 4→2; ImageGen tách nền rồi cắt 4 PNG *-full tại home-actions, lưu nguồn/prompt. Rộng 170px sau bù scale khi đủ chỗ, cao theo tỷ lệ; giữ callback và tên truy cập, bỏ ảnh nhãn rời. Typecheck/build và 18/18 UI tests PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Tách ba minh họa từ action game.png bằng ImageGen rồi cắt PNG alpha tại src/assets/home-actions/: ô 1→Chơi Nhanh, ô 2→Cờ Úp, ô cuối→Chọn Bàn. Giữ tên nút, callback, kích thước/vị trí hiện tại và ô Chơi Với Máy; không dùng Kho Games. Có README nguồn/prompt/tọa độ; đã xem sheet/kiểm tra alpha. Typecheck/build và 18/18 UI tests PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Tăng cúp riêng cụm Giải đấu 14→17cqw, nâng nhẹ để chừa chữ; ImageGen phóng chữ Giải đấu khoảng 20% và thêm bóng/ánh vàng, lưu tournament-title-large.png cùng prompt. Thêm hai dòng KỲ PHÙNG ĐỊCH THỦ / ANH HÙNG HỘI NGỘ và nét trang trí theo mẫu bằng Tailwind; giữ rồng/hổ/hai nhân vật và mask hòa nền. Đã xem ảnh/kiểm tra alpha; typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Hòa cụm Giải đấu vào nền Home bằng mask chuyển trong suốt ở hai bên, trên và phần chân nhân vật; giữ vùng giữa chứa chữ/rồng/hổ rõ. Giảm nhẹ brightness/contrast còn 95%, saturation 90% để gần tông cảnh nền, cúp vẫn lớp riêng. Không sửa ảnh nguồn. Typecheck/build PASS, cập nhật dist; chưa kiểm tra trực quan trình duyệt.
- 2026-09-19: Khôi phục rồng và hổ trong cụm Giải đấu theo phản hồi. ImageGen tách nền giữ cả hai nhân vật/rồng/hổ/chữ, lưu tournament-dragon-tiger-transparent.png và prompt; Home dùng ảnh mới, cúp vẫn riêng. Đã xem ảnh/kiểm tra alpha, typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Tách tiếp nền cụm Giải đấu theo đính chính: ImageGen chỉ giữ hai nhân vật và chữ Giải đấu, bỏ cảnh/rồng/hổ/chữ phụ, lưu tournament-characters-transparent.png cùng prompt. Xác nhận PNG có alpha trong suốt; Home bỏ mask mờ, giữ cúp DOM riêng. Typecheck/build PASS, cập nhật dist; đã xem asset, chưa browser QA.
- 2026-09-19: Thay cụm Giải đấu Home bằng ảnh mới giải đấu.png của người dùng; ImageGen xóa cúp dính trong ảnh, lưu tournament-art-no-cup.png cùng prompt/nguồn. Giữ cúp emoji thành lớp DOM riêng, dùng chữ có sẵn trong ảnh để tránh chồng chữ; giữ vị trí cụm, hover và hành vi thông báo. Typecheck/build và 18/18 UI tests PASS, cập nhật dist; đã xem ảnh kết quả, chưa browser QA.
- 2026-09-19: Thay nền Home bằng ảnh người dùng cung cấp `src/assets/nền home.png`; giữ object-cover/căn giữa và bố cục hiện tại. Giữ ảnh nền cũ trong assets. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Đồng bộ Cúp/Loa header và Bạn bè/Video footer Chọn Bàn với Home: dùng chung homeUtilityButton tại uiClasses, 48×48px, màu/bóng/hover giống nhau, icon SVG HomeIcon (bổ sung video). Home giữ nguyên diện mạo. Hai ô nâu dùng mặt ảnh nút Vị trí tùy chỉnh đã lưu với slice 14 fill/viền 12px, giữ góc và nền ảnh thay vì kéo giãn toàn ảnh. Typecheck/build và 18/18 UI tests PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Giảm ba nút trên Chọn Bàn thêm 8px (desktop 72→64px, compact 64→56px). Hai nút lọc thu còn 140×34px, cách nhau 8px; trạng thái chọn nền kem/chữ nâu, chưa chọn nền nâu/viền kem theo ảnh. Icon footer thu 40px, gap 20px, giảm khoảng trên 8px. Khung danh sách flex-1 tự tăng chiều cao từ diện tích tiết kiệm, giữ lệch ngang 10px mỗi bên với hàng nút. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Thu thêm hàng ba nút Chọn Bàn khoảng 60px tổng chiều rộng desktop; khung danh sách dùng chung vùng căn giữa, hàng nút có padding 10px mỗi bên để khung chỉ rộng hơn hàng nút 20px tổng cộng. Compact thu vùng chung còn 88%, giữ cùng độ lệch 10px. Giữ chiều cao nút. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Tăng chiều cao ba nút Chọn Bàn thêm 10px: desktop 62→72px, compact 54→64px. Thu chiều rộng vùng chung hàng nút/danh sách 94%→88% (compact 96%→92%), giữ căn giữa và padding hàng nút. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Theo đính chính, Chọn Bàn dùng cả mặt nút ảnh từ Vị trí tùy chỉnh/Đấu ngay (nền, viền, bóng) cho nút nâu/đỏ; thay chữ/icon nguồn bằng dải nền cùng ảnh rồi đặt nội dung động. Tăng padding ngang hàng ba nút 20→70px mỗi bên trên desktop, giảm cao 78→62px (compact 64→54px), giảm khoảng trên 20→12px và dưới 12→8px. Nới vùng danh sách 88%→94% và tận dụng chiều cao tiết kiệm. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-19: Sửa Chọn Bàn theo phản hồi: khôi phục khung ngoài/lề như Home; header thu 56px, compact 48px như Chơi Với Máy. Cắt riêng viền nút Vị trí tùy chỉnh để dùng cho hai ô đầu và hai nút lọc. Khung danh sách giữ asset cắt từ ảnh chọn bàn gốc; sửa borderImageWidth từ số không đơn vị (nhân border-width, gây phóng đại/nhòe góc) thành px, áp dụng cả viền nút đỏ. Typecheck/build và 18/18 UI tests PASS, cập nhật dist; chưa visual QA trên browser.
- 2026-09-19: Dựng lại Chọn Bàn theo ảnh mới `src/assets/chọn bàn.png`: cắt 12 asset có nguồn/tọa độ ở room-selection/README.md, khung co giãn giữ góc, header và ba ô trên, panel danh sách lớn/trạng thái rỗng, bộ lọc nâu vàng và icon footer. Nền toàn màn hình dùng lại nền máy.png của Chơi Với Máy; bỏ khung ngoài giới hạn ngang 120px để khớp bố cục mẫu. Giữ dữ liệu phòng thật, tạo/vào/lọc/chọn thời gian và hiệu ứng 600ms. Typecheck/build và 18/18 UI tests PASS; cập nhật dist, chưa browser QA vì không có trình duyệt kết nối.
- 2026-09-19: Hạ banner Cờ thế theo khoảng trống thực tế dưới hàng hai nút: tâm banner ở khoảng 40% từ đáy hàng nút đến viền dưới (hơi cao hơn trung điểm). Footer căn giữa đáy banner và viền dưới; đo lại theo resize/kích thước ảnh bằng useComputerLayout. Typecheck/build PASS, cập nhật dist; chưa visual QA do chưa có trình duyệt kết nối.
- 2026-09-19: Chơi Với Máy đưa nét chữ tiêu đề lên cách mép vùng dưới header khoảng 10px, tăng chữ thêm 2/3 và giảm bóng. Thu robot 210→188px, khoảng cách hai hàng khoảng 10px; kéo dài vùng hai ô 840→900px, tăng select cao 58→66px, viền kép nâu vàng và mũi tên 20→40px. Cụm chọn bên/nút/Cờ thế lên theo bố cục; footer dùng chữ thuần, bỏ nền/khung dính trong PNG. Typecheck/build và 18/18 UI tests PASS, cập nhật dist; chưa browser QA do không có trình duyệt kết nối.
- 2026-09-18: Bỏ thanh nền/khung/đường viền footer Chơi Với Máy. Dòng chữ ảnh nằm giữa khoảng từ đáy Cờ thế đến viền dưới, đo vị trí banner và cập nhật khi resize/scale; blend-screen hòa nền ảnh chữ. Footer không còn chiếm 40px trong flex nên không thu banner để nhường chỗ; giữ tỷ lệ ảnh Cờ thế. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-18: Thêm lại footer chữ “Cờ tướng · Trí tuệ vô tận” bằng PNG đã cắt từ mẫu, neo đáy khung trên nền nâu/đường vàng. Phủ gradient tối trên và nhạt dần xuống dưới; tăng drop-shadow tiêu đề. Hàng chọn bên tăng icon 28→36px, radio 24→32px, chữ 22–24px theo canvas; select dùng Arial 22px trắng kem, nền nâu và viền vàng mảnh theo ảnh. Giữ co vừa vùng còn lại, không cuộn, UI-only. Typecheck/build PASS; cập nhật dist, chưa browser QA.
- 2026-09-18: Giảm riêng chữ Chơi Với Máy còn 2/3, giữ kích thước/vị trí hai mây. Giảm lề trên chọn bên để nâng cụm dưới khoảng 15px; giảm khoảng cách chọn bên→nút và nút→Cờ thế khoảng 8px, bù theo scale và chặn lề âm trên màn hình nhỏ. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-18: Tiêu đề Chơi Với Máy tách ba vùng hiển thị từ cùng PNG bằng clip-path, dịch hai mây ra ngoài thêm 24px mỗi bên theo canvas. Tăng chiều rộng tiêu đề/ô chọn/banner 48px, hàng hai nút 96px (mỗi nút khoảng 40px thực tế ở scale 85%); canvas rộng 1148px tiếp tục co vừa viewport. Không sửa ảnh nguồn hoặc gameplay. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-18: Thu tiêu đề Chơi Với Máy 814→690px, thêm đường phân cách vàng mảnh chuyển nhạt hai đầu. Tăng avatar AI 174→210px, khoảng cách hai hàng bù scale đạt khoảng 15px (màn hình rất nhỏ giảm theo tỷ lệ). Tăng banner Cờ thế 977→1100px; canvas 1100×810 giữ co vừa khung/không cuộn. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-18: Thay background Chơi Với Máy bằng ảnh `src/assets/nền máy.png`. Hạ cụm nội dung dưới header 20px thực tế; tăng hai avatar AI từ 140→174px theo canvas và bỏ dòng “Bản giao diện · Chưa kết nối ván chơi”. Tăng canvas cao 750px, trừ khoảng hạ khi tính scale để giữ vừa khung/không cuộn. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-18: Nâng tiêu đề Chơi Với Máy lên sát mép dưới header, giảm khoảng trống trong vùng tiêu đề. Thu mỗi select/nút/banner khoảng 48px theo canvas (xấp xỉ 40px ở scale 85%); giãn hai hàng máy 12→28px, lề chọn phe 20→28px và khoảng trước Cờ thế 8→28px. Background cover/căn giữa trong toàn vùng dưới header, cắt phần dư theo tỷ lệ, giữ không cuộn. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-18: Chơi Với Máy neo nội dung cách mép trên vùng dưới header 8px, giữ tự co/không cuộn. Tiêu đề đổi sang title-transparent.png chỉnh bằng ImageGen, bỏ nền chữ nhật và dòng “Thử thách trí tuệ · Luyện kỹ năng”; bỏ footer “Cờ tướng · Trí tuệ vô tận”. Thêm lớp nâu chuyển mềm giữa background theo ảnh phản hồi. Giữ ảnh nguồn. Build/typecheck PASS; cập nhật dist, chưa browser QA.
- 2026-09-18: Thay nền Chơi Với Máy bằng `src/assets/chơi với máy nền.png` người dùng cung cấp, bỏ sepia/lớp tối của nền thay thế. Thu header và avatar; nội dung được căn giữa, co đồng đều theo cả chiều rộng/cao vùng dưới header (tối đa 85%, canvas 1025×700) qua useComputerLayout/ResizeObserver. Bỏ overflow-y-auto, khóa overflow để trang không cuộn dọc; giữ khung và hiệu ứng mở. Build/typecheck và 18/18 UI tests PASS; cập nhật dist. Chưa browser QA vì chưa có trình duyệt kết nối.
- 2026-09-18: Cắt trực tiếp ảnh người dùng `src/assets/Chơi với máy.png` thành 11 PNG tại `src/assets/computer-setup/` (tiêu đề, robot đen/đỏ, hai nút, banner Cờ thế, avatar/header/footer). Robot có mask alpha; giữ nguồn và tọa độ trong README, không sinh lại hình. ComputerSetup dùng ảnh cắt thay SVG/emoji/ảnh dựng; giữ select/radio và hành vi UI-only, khung và hiệu ứng 600ms. Background rời chờ người dùng; các ảnh chữ/banner vẫn chứa nền gốc trong vùng cắt, chưa thể xác nhận giống toàn màn hình 100%. Đã xem ảnh cắt và kiểm tra alpha. Sửa option `exact` không hợp type trong hai assertion UI cũ. Typecheck/build PASS, 18/18 UI tests PASS; cập nhật dist, chưa browser QA.
- 2026-09-18: Theo xác nhận chỉ làm UI, Home Chơi Với Máy mở màn hình thiết lập riêng: khung viền như Home, hiệu ứng mở từ tâm 600ms dùng useRoomEntrance; hai ô chọn máy, chọn đỏ/đen/ngẫu nhiên, nút Vị trí tùy chỉnh/Đấu ngay và banner Cờ thế. Chưa nối ván chơi hoặc Pikafish; nút báo rõ trạng thái chưa hỗ trợ. Tạm dùng landscape-background, avatar robot SVG và banner dựng từ ảnh bàn hiện có; cần asset riêng để sát mẫu. Không đổi engine hoặc thêm dependency. Build/typecheck PASS, 61/61 test hiện có PASS; thêm hai regression UI và chạy 18/18 UI tests PASS. Đã cập nhật dist. Browser không có kết nối, chưa visual QA desktop/mobile.
- 2026-09-18: Sửa ảnh chữ Chọn Bàn bằng ImageGen để chữ n rõ, không đọc thành Chọm; giữ màu vàng/viền và thu nhãn Home 100%→90%. Đã xem ảnh, lưu prompt tại src/assets/label-select-room.md. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-18: Mở chế độ Cờ Úp từ Home, dùng lại GamePage/bàn/màu/khung/quân và hiệu ứng hiện có; quân chưa lật mặt gỗ trơn, không đưa tên thật vào DOM. Xáo 15 quân mỗi phe, hai Tướng ngửa; nước đầu theo vị trí gốc, sau đó lật và đi theo loại thật; Sĩ ra cung/Tượng qua sông sau lật, vẫn kiểm tra chiếu và chặn mắt. Chơi với máy cơ bản cầm đen, không dùng danh tính ẩn chọn nước; local/online Cờ Tướng giữ nguyên. Typecheck/build và 61/61 tests PASS. Chưa browser QA, chưa Cờ Úp online hoặc luật lặp/chiếu dai giải đấu; nguồn và quy ước tại src/game/state/hidden-rules.md.
- 2026-09-18: Chơi Nhanh Home khi không có bàn online khả dụng mở ván với Máy · Cơ bản, người đỏ/máy đen. Máy tự chọn nước hợp lệ ưu tiên ăn quân sau 550ms, qua cùng store/animation; hủy lượt chờ khi reset/rời/kết thúc, khóa điều khiển quân đen và xin thua đúng phe người chơi. Giữ nút Sẵn sàng, khai cuộc, online và local hai người. Typecheck/build và 55/55 tests PASS (fallback, máy đáp nước, rời bàn hủy timer, lựa chọn nước không sửa board). Đã cập nhật dist; chưa browser QA.
- 2026-09-18: Home đổi Chọn Bàn sang PNG chữ nét cọ vàng/viền tối theo ảnh Chơi Nhanh, sinh bằng ImageGen; nguồn/prompt ở src/assets/label-select-room.md. Chỉ Chọn Bàn mở danh sách; Chơi Nhanh gọi Query lấy phòng mới rồi socket vào thẳng bàn khả dụng (ưu tiên một người chờ), hết bàn/lỗi hiện thông báo Home. Khóa bấm lặp và chuyển chế độ trong lúc chờ. Typecheck/build và 14/14 UI tests PASS, gồm vào thẳng bàn/hết bàn; đã xem asset và kiểm tra alpha, chưa browser QA.
- 2026-09-18: Tinh chỉnh Chọn Bàn: header 80→70px; hàng ba ô giảm padding dọc tổng 10px, cách đường viền trên/dưới 8px. Nội dung header/hàng nút/footer lùi ngang thêm 20px, đường phân cách vẫn chạy hết khung. Cụm nút footer hạ 10px bằng padding trên 22px/dưới 39px, giữ chiều cao footer. Typecheck/build PASS, cập nhật dist; chưa browser QA.
- 2026-09-18: Chọn Bàn đặt trong khung viền/góc vàng nâu như GamePage, nền ngoài xanh rêu, lề desktop 120px và compact 6px. Header tăng 55→80px, item căn giữa dọc; thêm đường phân cách dưới hàng chọn/tạo/chơi nhanh. Footer giảm chiều cao 20px để hạ mép trên, đưa item sát mép trên 12px và chừa đáy 49px. Nút lọc giữ 180×50, bo 4px, viền kép, Arial 20px/600 theo mẫu mới. Typecheck/build PASS; đã build dist, chưa browser QA.
- 2026-09-18: Chọn Bàn chuyển thành page riêng toàn màn hình, không backdrop Home; giữ mở từ tâm 600ms. Header 55px, icon 48px theo Home. Hàng Chọn Bàn/Tạo bàn/Chơi nhanh tỷ lệ 3:3:4 gap 25px desktop; compact xuống hàng. Tăng chữ chơi nhanh/thời gian, icon hover nền đục và mở select 3/5/10/15/30 phút. API/server áp dụng thời gian thật và giữ khi reset, quick play lọc đúng thời gian. Bộ lọc hạ 65px trong footer, nút 180×50, chỉ giữ hai icon bạn bè/video 48px và bỏ link local tại đây. Typecheck/build và 41 test hiện có PASS; chưa browser QA.
- 2026-09-18: Đổi nhãn Home thành Chọn Bàn; thay lobby Home bằng màn hình nâu–vàng theo ảnh tham chiếu, lưới bàn ba cột/avatar, tạo bàn, lọc tất cả/còn trống và chơi nhanh vào bàn khả dụng (không có bàn thì mở form tạo). Phòng/số người lấy API thật; bạn bè/video/thành tích báo chưa triển khai, không giả số người xem/năng lượng. Dùng lại useRoomEntrance mở vuông từ tâm 600ms, khóa tương tác và hỗ trợ reduced motion. Giữ lobby trong game và luồng local/online; không thêm dependency. Typecheck/build PASS; Browser không có kết nối nên chưa đối chiếu trực quan.
- 2026-09-18: GameTools đổi loa theo mẫu vàng với dấu × bên phải khi tắt (bật hiện sóng); icon toàn màn hình đổi thành bốn mũi tên hướng ra góc. Giữ nút, kích thước và callback; chỉ sửa SVG bàn cờ. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: PlayerCard nâng thẻ đỏ 10px chỉ compact ≤800px; ô tên hai phe thu rộng còn 94%, giảm padding dọc/cỡ chữ desktop nhẹ. Thay nhãn ELO bằng icon quân Tướng đỏ Tailwind, giữ số điểm và nhãn truy cập. Typecheck/build và 10/10 UI tests PASS; chưa visual QA trình duyệt.
- 2026-09-18: Bù vị trí chữ từng quân thêm 0.5px theo yêu cầu: Xe/Tốt đen xuống-phải; Mã/Tượng/Sĩ/Tướng đen và Tướng/Tượng đỏ sang phải. PieceText nhận prop shift, chỉ đổi transform chữ; không đổi khung/vị trí quân/gameplay. Typecheck/build và 10/10 UI tests PASS; chưa visual QA trình duyệt.
- 2026-09-18: Làm nhẹ các lớp shadow chữ để giảm cảm giác dày, giữ weight 400/cỡ 23px; bù tâm thị giác sang trái 0.5px và lên 0.75px theo ảnh phản hồi. Chỉ sửa PieceText CSS, giữ khung/vùng bấm/gameplay. Typecheck/build PASS; chưa xác nhận trực quan trong trình duyệt.
- 2026-09-18: Giảm độ đậm chữ PieceText hai nấc 600→400; giữ cỡ 23px, màu và bóng nổi. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Thu chữ PieceText 25→23px, weight 700→600 và giảm độ dày/đậm bóng dưới để nét nhẹ hơn; giữ hiệu ứng nổi và màu. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Thu chữ PieceText 28→25px theo yêu cầu; giữ font, màu, hiệu ứng nổi và căn giữa. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Tách ký tự HTML thành PieceText với CSS riêng theo yêu cầu: font DFKai-SB/BiauKai/KaiTi/STKaiti/serif, weight 700, căn giữa, năm lớp text-shadow tạo sáng trên/bóng dưới/ánh màu. Hỗ trợ green/orange/red/black qua prop color; Board giữ đỏ/đen theo phe. Cỡ 28px để vừa vòng trong 34px thay vì 38px mẫu; bỏ stroke/offset cũ. Không đổi khung, bàn, board-hit hoặc game logic. Cập nhật ngoại lệ CSS trong AGENTS.md. Typecheck/build và 10/10 UI tests PASS; chưa visual QA, font thực tế phụ thuộc máy.
- 2026-09-18: Tăng rõ độ dày chữ STKaiti: stroke quân thường 1.2→1.8px, Tượng 0.85→1.35px; giữ cỡ 23px, màu và khung. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Thu chữ STKaiti 24→23px và tăng stroke thêm 0.2px (Tượng 0.85px, quân khác 1.2px); giữ màu, căn giữa và khung. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Đổi riêng chữ trên quân sang STKaiti / 华文楷体 qua utility Tailwind, dự phòng KaiTi/SimSun/serif; giữ cỡ chữ, màu và độ đậm. Không thêm file font; hiển thị STKaiti phụ thuộc font có trên máy. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Chỉnh tâm thị giác chữ quân bằng offset lên 0.5px, giữ căn giữa ngang/dọc, cỡ 24px, màu và độ đậm. Typecheck/build PASS; cần đối chiếu trực quan trình duyệt để xác nhận tâm từng glyph.
- 2026-09-18: Khôi phục màu gỗ vàng nâu, gradient mặt quân và bóng cạnh trước lần chỉnh theo ảnh mẫu; giữ chữ 24px, vòng trong 34px nét 1px và màu phe đỏ/đen. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Chỉnh quân Tailwind theo ảnh quân tốt mẫu: chữ 24px căn giữa, vòng trong 34px nét 1px, vành/mặt kem sáng và bóng cạnh nhẹ; giữ ngoài 46px và độ đậm riêng của Tượng. Typecheck/build PASS; chưa đối chiếu trực quan trong trình duyệt.
- 2026-09-18: Thu chữ quân 28→25px, dùng flex toàn vùng trong để căn giữa ngang/dọc; giữ khung và độ đậm. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Giảm chữ quân 31→28px để cách vòng tròn theo ảnh phản hồi; giữ kích thước mặt/khung và độ đậm từng loại quân. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Thu mặt trong quân 37→35px trong khung ngoài 46px; tăng stroke chữ lên 1px, riêng Tượng hai phe giữ 0.65px. Giữ cỡ chữ, vị trí và thao tác. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Tăng độ đậm chữ quân đỏ/đen bằng Tailwind text-stroke 0.65px cùng màu chữ; giữ cỡ chữ 31px và kích thước quân. Typecheck/build PASS; chưa visual QA trình duyệt.
- 2026-09-18: Bỏ ảnh quân trên bàn theo yêu cầu; dựng quân bằng utility Tailwind với mặt gỗ kem, viền tròn nổi, vòng trong theo màu phe và chữ font-chess. Giữ đường kính 46px, tọa độ, animation và vùng bấm; ảnh nguồn giữ đối chiếu. Cập nhật regression nước đi theo ký tự quân. Typecheck/build và 10/10 UI tests PASS; chưa visual QA trình duyệt.
- 2026-09-18: Đổi nguồn quân sang ảnh mới 015f80dc-24ee-4f7a-8a6b-19c3cec7fd6d.png sau khi người dùng xóa pieces-source.png; căn lại SVG viewBox riêng cho hai hàng đỏ/đen. Giữ kích thước quân và gameplay. Typecheck/build và 10/10 UI tests PASS; chưa visual QA trình duyệt.
- 2026-09-18: Thay hình quân trên bàn bằng 14 vùng SVG từ pieces-source.png mới (1536×1024): đen hàng trên, đỏ hàng dưới. Giữ nguyên ảnh nguồn, khung quân 46px, vùng bấm và gameplay; PNG cũ giữ đối chiếu. Cập nhật regression kiểm tra ảnh/tọa độ quân tốt đỏ sau nước đi. Typecheck/build và 10/10 UI tests PASS; chưa visual QA trong trình duyệt.
- Bỏ dùng PNG nền bàn theo yêu cầu; dựng mặt/khung gỗ nâu cam bằng Tailwind gradient, vân nhẹ, góc bo và bóng chìm quanh mép. Lưới/cung/dấu pháo-tốt bằng SVG hai nét sáng–tối khử răng cưa. Tăng mép trên/dưới thêm 18 đơn vị mỗi phía, tỷ lệ bàn 532:608; đồng bộ tọa độ quân/marker/vùng bấm và layout. Giữ ảnh nguồn để đối chiếu, không import vào bàn. Typecheck/build và 10/10 UI tests PASS; chưa visual QA.
- Thay bàn bằng ảnh board-source.png mới 532×572: tạo board-transparent.png xóa nền trắng ngoài bằng flood fill, giữ nguyên gỗ/viền và nguồn. Căn lại tọa độ quân/hit target/tỷ lệ theo ảnh mới; bỏ SVG đường kẻ cũ để tránh chồng nét. Đã xem ảnh tách nền; typecheck/build và 10/10 UI tests PASS, chưa visual QA trong game.
- Làm rõ đường bàn mới: đổi nét SVG từ #855020 sang nâu đậm #603515, độ dày 1.15→1.65 theo tọa độ ảnh gốc. Giữ khử răng cưa, nền gỗ và vị trí quân. Typecheck/build PASS; chưa visual QA.
- Dùng trực tiếp board-source.png (511×580) làm bàn/khung; bỏ khung gỗ CSS cũ. Phủ đường SVG geometricPrecision theo lưới ảnh để giữ nét liên tục khi scale; không sharpen gắt hoặc sửa nguồn. Căn lại quân, marker và hit target theo tọa độ ảnh, điều chỉnh scale/chiều cao cột theo tỷ lệ 511:580. Typecheck/build và 10/10 UI tests PASS; đã xem nguồn, chưa visual QA toàn bàn.
- Tăng nét 14 quân bằng unsharp mask nhẹ từ ảnh nguồn, giới hạn mức chỉnh để giảm quầng; giữ alpha/mép ngoài và CSS bo tròn. Đã xem preview và build/typecheck PASS; độ chi tiết vẫn giới hạn bởi nguồn đường kính khoảng 55px, chưa QA trực quan trong game.
- Thu chiều rộng bàn còn 96% mức vừa khung, chiều cao tự co theo tỷ lệ mặt bàn. Chỉnh khung gỗ nâu cam #bb783f và mặt #cd894b; thay bóng cạnh lệch mạnh bằng vùng tối mềm quanh cả bốn mép và góc bo như mẫu. Sửa nhãn truy cập bàn bị lỗi dấu. Typecheck/build PASS; chưa visual QA.
- Bỏ số hai đầu bàn; chỉnh khung có cạnh sáng trên/trái, cạnh tối dưới/phải và bóng ngoài bốn phía. Desktop giảm padding dọc vùng bàn 24→4px, giảm phần rộng dành hai bên 420→340px để bàn cao/rộng hơn theo tỷ lệ 588:652 của mặt bàn; giữ giới hạn vừa viewport và compact. Typecheck/build và 10/10 UI tests PASS; chưa visual QA.
- Bàn theo mẫu gỗ cam nâu: mặt #ce8b4e, khung gỗ #bb7540 bo tròn, bỏ viền vàng/họa tiết góc và dấu góc pháo/tốt để khớp mẫu. Đường bàn/cung dùng ba nét sáng–tối lệch nhẹ tạo cảm giác rãnh khắc; thêm số 1–9 hai đầu. Giữ kích thước/spacing tọa độ/vùng bấm và quân PNG. Typecheck/build và 10/10 UI tests PASS; chưa visual QA đối chiếu ảnh trong trình duyệt.
- Khôi phục 14 ảnh quân cắt nguyên bản, bỏ viền đồng tâm tự dựng. Board bọc ảnh bằng khung 53×53 rounded-full/overflow-hidden để bo và cắt mép, không thêm border/ring/shadow quanh quân. Typecheck/build PASS; chưa visual QA trình duyệt.
- Làm lại viền 14 quân bằng vòng tròn đồng tâm khử răng cưa, ảnh vuông 120×120 giữ chữ gốc. Sửa kích thước hiển thị từ 57×59 thành 57×57 để bỏ kéo oval. Đã xem preview; typecheck/build PASS. Không thay luật hoặc thao tác; chưa visual QA trong game.
- Làm mượt mép 14 PNG quân: cắt lại từ nguồn, thu mặt nạ ngoài 0.8px và chuyển alpha smoothstep 1.3px để giảm răng cưa/nền sót. Giữ nguyên RGB chữ/mặt quân, ảnh nguồn và logic. Đã xem preview đủ 14 quân; typecheck/build PASS, chưa visual QA trong game.
- Cắt 14 PNG quân từ src/assets/pieces-source.png do người dùng cung cấp, giữ RGB gốc và tách nền bằng alpha ellipse khử răng cưa. Đã xem bản ghép preview đủ 14 quân, lưu nguồn/tọa độ tại src/assets/pieces/README.md. Board dùng map asset theo phe/type thay chữ và mặt quân CSS; giữ vị trí, vùng bấm, animation và toàn bộ engine. Typecheck/build và 10/10 UI tests PASS; đã kiểm tra ảnh cắt, chưa visual QA toàn bàn trong trình duyệt.
- 2026-09-18: Chỉnh quân theo mẫu bằng Tailwind: mặt kem sáng, mép ngà kép, cạnh nổi mỏng/bóng sát; vòng trong theo màu phe đỏ/đen, chữ thư pháp 37px và giảm stroke cho nét thanh rõ. Giữ đường kính 53px, ký tự, vị trí và thao tác. Typecheck/build và 10/10 UI tests PASS; chưa visual QA đối chiếu mẫu trong trình duyệt.
- Rút hiệu ứng mở phòng 1000→600ms. App gỡ Home theo callback hoàn tất thực tế thay timer riêng; giữ clip-path inset(0) sau khi mở để tránh đổi lớp hiển thị ở cuối, bỏ bật/tắt will-change. Quân/người chơi vẫn hiện sau khi mở hết. Build/typecheck và 10/10 UI tests PASS; chưa visual QA độ mượt.
- Chuyển cảnh vào bàn: đổi easing sang tăng/giảm tốc cân bằng, tính ô vuông theo đúng kích thước khung thay vì vmax để không mở vượt khung quá sớm; gợi ý will-change trong animation. Chỉ hiện quân/người chơi/nút sẵn sàng khi animation thực sự kết thúc (onfinish), giữ bố cục người chơi bằng visibility và không blur. Typecheck/build và 10/10 UI tests PASS; chưa xác nhận độ mượt trực quan trên trình duyệt.
- Hiệu ứng vào phòng: bỏ blur và ẩn người chơi/quân/tiện ích trong lúc mở; toàn bộ nội dung hiện sẵn để được lộ ra cùng vùng vuông, không bật hiện cuối hiệu ứng. Giữ viền đứng yên, thời lượng 1 giây và khóa tương tác trong chuyển cảnh. Typecheck/build và 10/10 UI tests PASS; chưa visual QA trình duyệt.
- Sửa màn hình Home chỉ hiện nền sau khi thêm chuyển cảnh: wrapper Home trong App thiếu w-full, bị co chiều rộng trong root grid place-items-center và Home overflow-hidden cắt nội dung. Thêm w-full, build lại dist cho cổng 3001. Typecheck/build và 10/10 UI tests PASS; DOM test không kiểm tra kích thước layout, chưa visual QA trình duyệt.
- Chỉnh hiệu ứng vào phòng theo yêu cầu mới: bỏ nền xám/grayscale; giữ Home phía sau trong 1 giây, nội dung phòng mở vuông từ tâm chỉ bên trong viền. Viền/họa tiết và nền ngoài đứng yên; bàn mờ nhẹ, người chơi/quân hiện sau khi mở. Home phía sau inert và được gỡ sau hiệu ứng. Build/typecheck PASS, 10/10 UI tests PASS gồm kiểm tra giữ/gỡ Home; chưa visual QA trình duyệt.
- Thêm hiệu ứng vào bàn 1000ms: vùng vuông mở từ tâm phủ viewport trên nền xám, cảnh bàn mờ/xám trong lúc mở; ẩn người chơi, chat, tiện ích và quân cờ, khóa tương tác bằng inert rồi hiện khi hoàn tất. Hook useRoomEntrance quản lý animation/timer và hủy khi rời màn hình, bỏ chuyển động với prefers-reduced-motion; không đổi clock/luật/khai cuộc 1300ms. Typecheck/build và 12/12 UI/matchIntro tests PASS; chưa visual QA trình duyệt.
- Sửa đúng bố cục chat bên phải trong ảnh người dùng: các lần tăng 180→240px trước chỉ áp dụng mobile ≤800px nên không tác động ảnh. Với desktop rộng ≤1400px hoặc cao ≤800px, giảm margin trên chat mở 45→5px để khung cao thêm 40px, giữ đáy. Desktop lớn hơn giữ nguyên; mobile vẫn 240px và chat thu gọn không đổi. Typecheck/build PASS; chưa visual QA trình duyệt.
- Tăng tiếp chiều cao chat mở trên màn hình nhỏ từ 200 lên 240px theo yêu cầu, giữ neo đáy và giữ nguyên desktop/thu gọn. Typecheck/build PASS; chưa visual QA trình duyệt.
- Tăng chiều cao chat khi mở trên màn hình nhỏ (≤800px) từ 180 lên 200px, giữ neo đáy; desktop và trạng thái thu gọn giữ nguyên. Typecheck/build PASS; chưa visual QA trình duyệt.
- Chat desktop: hạ mép trên thêm 15px (margin 30 → 45px), giữ đáy trong khung. Cụm cầu hòa/xin thua cách phía trên 25px trên desktop; đổi chữ sang Arial đứng để hiển thị dấu tiếng Việt rõ. Bỏ dòng thông tin “Cùng máy · 10 phút”/phòng cạnh nút người xem. Typecheck/build PASS; chưa visual QA trình duyệt.
- Sửa 7 điểm màn hình bàn cờ: hai khung tên cùng rộng 160px desktop; bỏ nút reset và tiêu đề Cờ Tướng; chat mở trên desktop ngắn thêm 30px, giữ đáy. Bỏ thay đổi opacity của nút cầu hòa/xin thua khi animation/pending nhưng giữ khóa thao tác. Viền lượt avatar dùng data-active ngay trên avatar, không co và đưa lớp xanh lên trên ảnh cho cả hai phe. Kết quả ván hiện giữa màn hình, ưu tiên hơn notice; hết giờ ghi rõ Đỏ/Đen thắng. Build/typecheck và 12/12 UI/store tests PASS, có regression chuyển lượt và timeout hai phe; chưa visual QA do chưa có Browser kết nối.
- Bàn cờ: thêm ba nút camera/âm thanh/toàn màn hình góc phải, cùng cỡ 48px và kiểu vàng–nâu với back; căn hai phía cách viền trong 12px. Cân cột hai bên để bàn nằm giữa ngang, hạ người chơi thêm 16px; tăng khoảng cách trên chat 30px ở desktop thường, bỏ translate/chiều rộng tràn khung, thêm nền tối bán trong suốt và căn đáy theo bàn. Chuyển nút chơi lại/thông tin phòng xuống cạnh nút người xem. Loa dùng nhạc hiện có, toàn màn hình hoạt động; camera hiện thông báo chưa triển khai. Typecheck/build và 5/5 UI tests PASS; Browser không có kết nối nên chưa visual QA.
- Mặt bàn cờ đổi từ vàng #e6bd77 sang nâu gỗ nhạt #c9a47e, giữ vân gỗ, đường kẻ và màu quân. Typecheck/build PASS; chưa visual QA.
- Khung màn hình bàn cờ theo mẫu Home: nền ngoài xanh rêu #263a35, lề desktop hai bên 120px, trên/dưới 6px; compact chừa 6px mỗi bên. Giữ viền vàng–nâu kép và padding, đưa nền tranh bàn cờ vào bên trong khung để không phủ vùng ngoài. Typecheck/build PASS; chưa visual QA.
- Màn hình bàn cờ: thêm khung nâu viền vàng kép và họa tiết góc theo Home, cách viewport 8px; padding trong khung 24px desktop/12px compact. Header/nút con mắt cùng lùi vào padding, bàn tự co theo vùng còn lại và giữ tỷ lệ. Typecheck/build và 5/5 UI tests PASS; chưa visual QA.
- Bàn cờ desktop: bỏ giới hạn khung 1320px và hàng header/footer chiếm chiều cao; bàn dùng vùng cao viewport trừ lề 4px mỗi phía, vẫn co đúng tỷ lệ và giới hạn chiều rộng để chừa hai cột người chơi/chat. Header/nút ở hai bên, thông tin người chơi hạ dưới header; compact giữ các hàng riêng. Nút rời bàn 48×48 như tiện ích Home; nút con mắt giảm 40 → 32px cao, icon 40×30 → 32×24. Typecheck/build PASS, 5/5 UI tests PASS; Browser không có kết nối nên chưa visual QA.
- Hồ sơ: tăng nhẹ độ đậm Bạn bè/Theo dõi, nhãn 400 → 500 và số 500 → 600; giữ cỡ chữ/khoảng cách. Typecheck/build PASS; chưa visual QA.
- Hồ sơ: thu tiếp icon chỉ số 36 → 32px, chữ số 30 → 24px, padding dọc ô 6 → 4px. Dòng Bạn bè/Theo dõi giảm nhãn về font-normal, số về font-medium. Giữ màu và hình quân cờ. Typecheck/build PASS; chưa visual QA.
- Hai ô chỉ số hồ sơ: khôi phục vùng icon 36×36 để chiều cao ô trở lại kích thước cũ; giữ nền/viền/chữ số màu cũ, chỉ dùng hình quân gỗ Tướng đỏ và quân úp mới được co vừa. Typecheck/build PASS; chưa visual QA.
- Hồ sơ: tăng nền tối 20% → 30%, giữ không blur; tăng độ rõ/cỡ chữ và khoảng cách Bạn bè/Theo dõi, bỏ dòng Khách · chỉ số minh họa trong dialog. Thu avatar 160 → 138px và cụm danh hiệu/sao để không chạm khung thống kê. Hai icon dựng bằng Tailwind thành quân gỗ nghiêng có bề dày: một Tướng đỏ và một quân úp mặt trơn theo mẫu. Typecheck/build PASS; chưa visual QA.
- Hồ sơ: giảm lớp phủ đen phía sau từ 65% xuống 20%, bỏ backdrop blur để trang chủ vẫn nhìn rõ và chỉ hơi tối. Typecheck/build PASS; chưa visual QA.
- Hồ sơ: đổi sang khung dọc 760×910 tự co theo cả hai chiều viewport, tối đa 85%, chừa lề 16px và bỏ cuộn dialog. Chỉnh tỷ lệ gần ảnh mẫu: viền gỗ dày/góc vàng, hoa văn giấy, avatar xám, khu Danh hiệu cao hơn; giữ khoảng cách đều giữa các khung. Typecheck/build và 5/5 UI tests PASS; kiểm tra công thức co vừa 6 kích thước desktop/mobile (cả ngang). Browser không có kết nối nên chưa xác nhận trực quan độ giống ảnh.
- Hồ sơ Home: bấm avatar mở dialog Thông tin theo bố cục mẫu, tên lấy từ session; hai ô chỉ số dùng quân Tướng đỏ và quân cờ úp. Khung thống kê và Danh hiệu cách nhau cùng khoảng cách với khung hồ sơ phía trên; tiêu đề Danh hiệu có nét trang trí vàng nâu. Có nút Thoát, liên kết tài khoản hiện thông báo chưa triển khai; số liệu/danh hiệu ghi rõ minh họa. Typecheck/build và 5/5 UI tests PASS; Browser báo không có trình duyệt nên chưa visual QA.
- Home: dùng ảnh nền người dùng cung cấp từ dist/assets/cbba3315-64df-475d-9764-a5f39a96efd7.png, lưu nguồn bền vững tại src/assets/home-mountain-background.png và đổi import HomePage. Giữ nền cũ home-ink-background.png. Đã xem ảnh nguồn; typecheck/build PASS, chưa visual QA trang trong trình duyệt.
- Home: hạ toàn bộ hàng ô tròn và chữ bên dưới thêm 15px thực tế, bù theo scale khung cho desktop/compact. Typecheck/build PASS; chưa visual QA trình duyệt.
- Home: nâng tâm cụm giải đấu desktop từ 32% lên 28% chiều cao khung (compact nâng thêm 16px); thu đường kính tối đa ô tròn 185 → 175px, rộng 95% cột để thu nhẹ cả màn hình nhỏ, tăng offset xuống thêm 8px thực tế. Typecheck/build PASS; chưa visual QA vì Browser chưa kết nối.
- Home theo ảnh tham chiếu mới: hạ riêng bốn ô tròn thêm 12px thực tế; nâng tâm cụm giải đấu/cúp/hai hình từ 38% lên 32% chiều cao khung desktop, compact nâng 20px trong bố cục. Typecheck/build PASS; chưa kiểm tra trực quan do Browser chưa có kết nối.
- Home: tăng đường kính tối đa ô tròn 170 → 185px; ảnh tên chế độ 66 → 74px (compact 38 → 43px), tăng chữ mô tả và hạ nhóm chữ 8px thực tế. Cụm giải đấu/cúp/minh họa desktop đặt tâm ở 38% chiều cao khung; compact hạ thêm 18px so với trước. Giữ giới hạn co vừa cột trên màn hình nhỏ. Typecheck/build PASS; Browser không có kết nối nên chưa visual QA.
- Thay bốn ảnh tên chế độ theo mẫu sáu chữ mới: gradient trên #F9EDA0 xuống #C39D44, viền xám xanh #353B36 được chỉ định trong prompt ImageGen. Kiểm tra từng ảnh, sửa Cờ Úp để bỏ quầng mờ. Build/typecheck PASS; chưa visual QA trình duyệt. Prompt/nguồn: src/assets/mode-labels-v3.md; ảnh sinh không đảm bảo màu từng pixel tuyệt đối.
- Căn cụm hồ sơ/tiện ích cách mép trong viền trên 12px thực tế theo scale; cụm giải đấu desktop neo giữa cùng mốc 12px thay offset âm để không bị cắt ở trên. Giữ bố cục giải đấu compact. Typecheck/build PASS; chưa visual QA trình duyệt.
- Dựng lại bốn PNG tên chế độ bằng ImageGen: nét cọ dày nghiêng, vàng kem/ochre và bóng viền nâu theo ảnh mẫu; sửa dấu ờ trong Cờ Úp. Phóng minh họa hai người sau cúp từ 620×360 lên 700×405 (compact cao 310). Đã xem ảnh riêng và kiểm tra alpha; typecheck/build PASS, chưa QA trong trình duyệt. Prompt: src/assets/mode-labels-v2.md.
- Hạ hàng ô tròn và tên thêm 15px thực tế; thêm nút THOÁT giữa đáy khung, nền gỗ vàng nâu bo tròn, chữ Arial đen theo mẫu. Nút thoát fullscreen hoặc hướng dẫn đóng tab; giữ lối chơi local. Typecheck/build PASS; chưa visual QA trình duyệt.
- Tăng màu minh họa sau cúp: opacity 95%, saturation 150%, contrast 110%; giữ trung tâm rõ và mask chuyển mờ dần ra mép ngoài. Typecheck/build PASS; chưa visual QA trình duyệt.
- Thêm minh họa giản lược sau cúp giải đấu từ ảnh mẫu: màu dịu, opacity/mask cho mép hòa dần vào nền, không nhận click. Cúp tăng quầng sáng vàng; giữ cúp/chữ ở lớp trước. Asset/prompt tournament-vignette.*; typecheck/build và 4 test UI PASS, chưa visual QA trình duyệt.
- Hoàn tất ảnh chữ bốn chế độ: PNG vàng nét cọ/viền nâu, nền alpha trong suốt, thay font render bằng ảnh có alt tương ứng. Hạ cả hàng ô và chữ thêm 25px thực tế theo scale. Nguồn/prompt trong src/assets/mode-labels.md. Typecheck/build và 4 test UI PASS; đã xem từng ảnh và kiểm tra alpha, chưa QA tổng thể trình duyệt.
- Tên chế độ cách ô tròn khoảng 20px thực tế sau khi bù offset; chuyển font-chess, cỡ 40px (compact 22px), nét đậm nghiêng vàng nhạt và bóng nâu theo mẫu. Typecheck/build PASS; chưa đối chiếu font trong trình duyệt.
- Hạ riêng bốn ô tròn home 18px thực tế (bù theo scale khung), giữ vị trí tên chế độ. Typecheck/build PASS.
- Home: nâng hàng ô/chữ 40px trong bố cục (compact 20px), hạ cụm cúp 35px desktop; tên chế độ tăng 20 lên 34px, đậm nghiêng kiểu thư pháp vàng viền bóng nâu (compact 18px). Typecheck/build PASS; chưa visual QA.
- Home còn 4 ô Chơi nhanh/Tạo bàn/Chơi với máy/Cờ Úp, luôn xếp một hàng ngang; vòng tròn tăng từ 140 lên 170px, tên và mô tả đưa ra dưới vòng tròn. Giữ responsive co vừa khung. Typecheck/build và 4 test UI PASS.
- Home: sửa tính kích thước khung để lề trái/phải desktop đúng 120px kể cả khi giới hạn bởi chiều cao; khung giãn theo vùng còn lại, nội dung vẫn co vừa và không cuộn. Typecheck/build PASS.
- Sửa lề home thành khung bao thật: nền tranh và nội dung cùng nằm trong viền vàng nâu có họa tiết góc; phía ngoài màu xám xanh rêu đậm #263a35. Khung tự co vừa viewport, chừa mép để viền không bị cắt, không cuộn. Typecheck/build PASS; chưa visual QA.
- Home: nâng cụm giải đấu 100px trên desktop (mobile 25px để tránh chồng header); thu vùng nội dung với lề desktop tối thiểu 120px mỗi bên. Avatar đổi nền nâu viền vàng theo mẫu, huy hiệu Kỳ Sĩ và ba sao vàng. Typecheck/build và 4 test UI PASS; chưa visual QA.
- Home đổi sang nền thủy mặc núi hồ theo mẫu mới (ImageGen, home-ink-background.png), bỏ lớp tối cũ. Nút tròn thu từ 190 xuống 140px (compact 125px). Hook useHomeLayout co toàn bố cục theo chiều rộng/cao viewport, HomePage khóa cuộn; dialog phòng vẫn cuộn khi cần. Typecheck/build và 33 test PASS; chưa kiểm tra trực quan trình duyệt.
- Chỉnh home theo mẫu mới: hồ sơ avatar viền vàng/huy hiệu Kỳ Sĩ, tên và hai ô chỉ số mẫu nền nâu; nút tiện ích vàng nâu với icon lịch sử/cúp/bạn bè/toàn màn hình. Thay sách/cài đặt bằng loa bật/tắt giai điệu ngũ cung tự tổng hợp bằng Web Audio, chỉ phát khi nhấn và dừng khi rời home; sáu chế độ đổi sang hình tròn viền nổi. Typecheck/build và 33 test PASS; chưa kiểm tra hình/âm thanh trực tiếp trong trình duyệt.
- Thêm HomePage theo ảnh tham chiếu: nền rồng/hổ tái dựng bằng ImageGen, phủ kín màn hình và giảm màu; avatar, tiện ích, cúp nền trong suốt bằng emoji, chữ Giải đấu vàng phát sáng/viền nâu, 6 thẻ có nền màu đầy đặn. Asset và prompt lưu tại src/assets/home-background.*.
- App mở trang chủ; chọn/tạo bàn mở lobby online, nút chơi hai người cùng máy vào local, rời phòng về home. Thông báo tính năng chưa có dùng dialog; mất kết nối hiện notice trên home. Chơi nhanh hiện mở danh sách phòng, chưa matchmaking/15 phút; AI, học cờ, Cờ Úp, giải đấu chưa triển khai.
- Kiểm tra sau hoàn thiện: typecheck/build và 33/33 test PASS. Browser runtime báo không có trình duyệt nên chưa visual QA desktop/mobile.
- Đã bỏ chữ “heo” khỏi khai cuộc theo yêu cầu mới.
- Thêm chữ “heo” đỏ, đậm, cỡ 64–120px dưới cụm tên/kiếm khai cuộc theo yêu cầu. Typecheck/build PASS.
- Xác nhận bằng regression UI: sau 1,3 giây khai cuộc, không cần chọn/đi quân, đồng hồ đỏ tự giảm 10:00 → 09:59 → 09:58, đen giữ 10:00. Cả 3 test UI PASS; không cần sửa logic clock.
- Tăng khai cuộc lên 1300ms theo yêu cầu mới; thời gian giữ đồng hồ/khóa nước đi local và server đồng bộ 1,3 giây. Cập nhật mốc fade-out, tài liệu và regression. Typecheck/build và 31/31 test PASS.
- Khai cuộc rút xuống 1000ms, bao gồm hiệu ứng in/ánh vàng/mờ dần; khóa bàn trong lúc hiển thị. Local và server đặt mốc clock sau 1 giây, engine từ chối nước đi trước mốc đó. Thêm regression local/server tại 999ms và 1000ms, cập nhật test UI/socket và quy tắc AGENTS.md. Typecheck/build và 31/31 test PASS; chưa QA trực quan trong trình duyệt.
- Khai cuộc theo bố cục tham chiếu: mỗi tên giữa hai line vàng cổ, vòng tròn kiếm chéo ở tâm, nền tối/mờ nhẹ. Sau hiệu ứng in tại chỗ, hai vệt vàng chạy từ hai đầu ngoài vào tâm rồi tắt, giữ tông vàng đậm; bỏ tia mặt trời cũ. Typecheck/build và 5 test UI/hook PASS; chưa QA trực quan trong trình duyệt.
- Khai cuộc: thay dấu chéo bằng hai kiếm SVG bắt chéo, tên màu nâu giữ hào quang vàng. Thay toàn bộ chuyển động bay bằng hiệu ứng đóng dấu tại chỗ đồng thời (scale/opacity 320ms). Typecheck/build và 5 test UI/hook PASS; chưa QA trực quan trong trình duyệt.
- Tinh chỉnh khai cuộc theo yêu cầu: bỏ khung/nền và chữ trang trí, thu nhỏ tên (tối đa 46px), kéo sát dấu chéo, dùng vàng nhạt #ffe5a1 theo viền avatar với quầng sáng/tia mặt trời quanh từng tên. Giữ chuyển động cũ. Typecheck/build và 5 test UI/hook PASS; chưa QA trực quan trên trình duyệt.
- Thêm mở màn khai cuộc: tên hai người bay từ hai bên, dấu chéo nét bút từ trên xuống, chữ lớn đậm nghiêng và nền cổ phong; tự ẩn sau 2.6 giây. Hook quản lý animation/timer, hủy khi reset/rời phòng, hỗ trợ reduced motion; không dừng clock online. Font dùng Segoe Script và fallback hệ thống. Typecheck/build và 5 test UI/hook PASS; chưa QA chuyển động trong trình duyệt.
- Đổi nút back theo ảnh mẫu: nền nâu vàng, viền nổi, icon mũi tên rời cửa màu vàng bằng SVG; giữ hành vi rời phòng và chiều cao header. Typecheck/build và 2 test UI PASS; chưa kiểm tra trực quan trên trình duyệt.
- Đổi nút số người trong phòng sang biểu tượng mắt vàng và nền nâu chuyển sắc theo ảnh tham chiếu. Online đếm players từ snapshot socket; local hiển thị 1 người tương ứng danh sách hiện tại. Typecheck/build PASS; chưa kiểm tra trực quan bằng trình duyệt.
- Tăng nét chữ quân cờ đỏ/đen trong Board.tsx bằng Tailwind text-stroke 0.025em (0.9px ở cỡ chữ 36px), giữ font thư pháp và màu hiện tại. Typecheck/build PASS; chưa đối chiếu trực quan trong trình duyệt với ảnh mẫu.
- Migration sang React + TypeScript strict + Vite; tách app/features/pages/game/services/store/types/lib/assets theo yêu cầu.
- Tích hợp và dùng thực tế Tailwind, Zustand, TanStack Query, Axios, Express, Socket.IO. Có npm scripts và lockfile.
- Engine rules/state/moves thuần TypeScript dùng chung frontend/server. Giữ chơi local, bàn cờ/tài nguyên, clock, animation có hủy khi reset, hòa, xin thua, chat/emoji/tin nhanh và đổi tên.
- Phòng online hai client: HTTP danh sách/tạo phòng; socket vào/rời, sẵn sàng, đi quân, chat, cầu hòa và kết thúc. Server xác thực phe/lượt/luật/thời gian.
- Backend tách Controller → Service → Repository RAM; có kiểm tra payload, giới hạn phòng/chat/socket cơ bản.
- 26 test pass: luật 7 loại quân, chiếu/tướng đối mặt, chiếu bí/hết nước, store/animation/timeout, room service, HTTP/socket hai client, React local/chat/phòng.
- Typecheck, production build và entry smoke đều pass; Express phục vụ bản build trả 200. `npm run dev` đã chạy cả Vite 5173 và backend 3001; backend health trả 200. Đã cập nhật README và AGENTS.md.
- Chuyển toàn bộ style giao diện sang utility Tailwind: bố cục, bàn/quân cờ, thẻ người chơi, chat, dialog, responsive và trạng thái tương tác. Chỉ giữ import/theme/variants/@font-face trong index.css; không thêm dependency.
- Xóa 8 stylesheet giao diện cũ trong `src/app/styles/` và `css/` sau khi xác nhận không còn tham chiếu. Test React dùng test ID thay cho class CSS cũ.
- Sau khi xóa CSS cũ: typecheck/build PASS và 26/26 test PASS. Kiểm tra CSS build có ảnh/font, breakpoint, reduced motion; không còn selector giao diện cũ. Browser vẫn chưa kết nối nên chưa có visual QA.

## Đang làm
- Vòng thời gian avatar phủ xanh đầy lúc đầu rồi rút theo chiều kim đồng hồ trong 60 giây mỗi lượt; viền xanh bám cùng mép mảng xanh, để lộ avatar đúng màu. Hết lượt thì dừng đồng hồ và xử thua; typecheck/build PASS.
- Danh hiệu Tân Binh giữ vị trí cũ sát dưới avatar, tăng lớp hiển thị để nằm trên avatar/vòng xanh.
- Theo yêu cầu mới: hover Giải đấu và bốn chế độ chơi tăng sáng nhẹ 5%, chuyển tiếp filter 150ms (tôn trọng reduced motion), không thay đổi vị trí/kích thước. Typecheck/build PASS.
- Bỏ hover phóng to Giải đấu, hover dịch chuyển và tăng sáng của bốn chế độ chơi; giữ click và focus bàn phím. Typecheck/build PASS.
- Sửa tiêu đề Giải đấu: giữ Segoe Script và màu/viền, đặt dấu sắc riêng phía trên â để không tạo khoảng hở trước u; căn giữa, giữ một dòng và thêm nhãn truy cập đúng dấu. Typecheck/build PASS; cần xác nhận trực quan trên browser.
- Tăng nhẹ khoảng 7% ba nhãn Tạo Bàn/Chơi Với Máy/Cờ Úp (width 74%/91%/62%), giữ Chơi Nhanh và kiểu chữ hiện tại. Typecheck/build PASS; chưa có browser QA.
- Cân chiều cao nét chữ nhãn theo alpha bounds của ảnh, lấy Chơi Nhanh làm chuẩn (tỉ lệ chiều rộng: 100%/69%/85%/58%). Giữ font Giải đấu, thử dùng â + combining acute cho “ấ” để xử lý lỗi glyph trong ảnh người dùng. Typecheck/build PASS; chưa xác nhận hiển thị dấu trên browser.
- Nhãn chế độ: sửa chữ hoa trực tiếp bằng ImageGen trên ảnh tham chiếu, giữ kiểu thư pháp vàng; lưu ba bản `label-*-title.png` cạnh ảnh gốc. Prompt: chỉ viết hoa đầu từ trong “Chơi Nhanh”, “Tạo Bàn”, “Chơi Với Máy”, giữ nét chữ/màu/viền/nền trong suốt. “Cờ Úp” giữ ảnh gốc. Giảm kích thước nhãn 88→82px (compact 52→48px), rộng 94%→88%.
- Theo yêu cầu sửa lại: khôi phục nhãn ảnh gốc dưới các ô tròn, giữ nguyên kiểu chữ cũ và kích thước 88px/52px; giữ các chỉnh sửa khung tên/ELO.
- Tăng nhẹ padding/cỡ chữ khung tên và chỉ số; hai ô chỉ số dùng grid hai cột khớp hai mép khung tên. Nhãn chế độ đổi từ ảnh sang chữ vàng nghiêng để viết hoa đầu mỗi từ. Typecheck/build PASS; chưa có browser QA.
- Tinh chỉnh tiếp theo: khung tên rộng thêm 5px, cao thêm 3px; mỗi ô chỉ số thêm padding tương ứng 5px ngang/3px dọc. Thu nhẹ nhãn dưới ô tròn (88px desktop/52px compact, rộng 94%). Typecheck/build PASS; chưa có browser QA.
- 2026-09-17: Tăng kích thước nhãn chế độ chơi, bỏ mô tả nhỏ bên dưới, thu gọn khung tên/chỉ số trang chủ; đổi vị trí loa và toàn màn hình (toàn màn hình ngoài cùng bên phải). AGENTS.md yêu cầu đọc AI WORK RULES.md trước khi làm việc với mã nguồn. Typecheck/build PASS, 4/4 UI tests PASS; chưa kiểm tra trực quan do Browser không khả dụng.
- Migration và chuyển Tailwind đã hoàn tất; giữ `board-game/js`, `assets` làm bản đối chiếu, không được entry React sử dụng.

## Task tiếp theo
- Thời gian phòng: thêm 10 regression cho năm mức phút và input sai; 16/16 room service tests PASS.
- Chọn Bàn: 12/12 UI tests PASS, gồm lọc phòng thật/tạo bàn và mở lại hiệu ứng 600ms; cần browser QA so với ảnh tham chiếu.
- Kiểm tra trực quan desktop/mobile khi có trình duyệt kết nối.
- Theo yêu cầu tiếp theo: tài khoản, persistence Prisma/MySQL, lịch sử/ELO thật, hoặc khôi phục kết nối.

## Giới hạn / vấn đề còn lại
- Không có trình duyệt kết nối trong phiên này; React DOM/integration tests không chứng minh giao diện pixel-perfect.
- Phòng/chat/ván online lưu RAM, mất khi restart. Phiên khách theo socket; chưa có auth, spectator hoặc resume; mất kết nối xử thua.
- Chưa triển khai luật chiếu dai/lặp nước/đuổi quân theo giải đấu. ELO hiển thị vẫn là số mẫu từ bản cũ.
- Sandbox Windows chặn tsx đọc os.userInfo; backend chạy được khi cấp quyền chạy ngoài sandbox. Không thay mã thư viện để xử lý giới hạn môi trường.
- Lần migration trước, bộ duyệt từ chối xóa đệ quy nguồn cũ. Task mới yêu cầu chuyển hết CSS: đã xác minh không còn import stylesheet cũ và xóa đúng 8 file CSS; không xóa đệ quy JS/assets.

## Quyết định quan trọng
- Người dùng đã yêu cầu đổi kiến trúc và chuyển hết CSS sang Tailwind; giữ tài nguyên, bố cục và hành vi giao diện thay vì thiết kế lại.
- Chưa cài Prisma/MySQL vì chưa có task persistence/database. Chỉ Repository được dùng Prisma khi bổ sung.
- Engine độc lập DOM; online server là nguồn sự thật. Không nhận board/kết quả do client tự khai.
- Bộ emoji cạnh nút like chờ 1 giây sau khi bấm like; nếu chuột rời nút trước khi hết giờ thì hủy mở bộ emoji.
- Hiệu ứng sét SVG chiếu bí được thay bằng `set_danh_0_2s.webp`; file gốc lặp vô hạn nên ảnh được gỡ sau một lượt 200 ms để chỉ đánh một lần.
- Ảnh động chiếu bí dùng overlay fixed phủ toàn viewport, cao `100dvh`, căn ngang theo quân bị chiếu và kết thúc ở mép dưới màn hình.
- Gắn/gỡ ảnh động chiếu bí trực tiếp trong lớp hiệu ứng để tránh React render lại toàn bộ bàn cờ khi ảnh bắt đầu/kết thúc; đưa lớp ảnh lên compositor khi phát.
- Sửa ảnh động chiếu bí không hiện: gắn overlay vào viewport trước khi nạp WebP, bỏ điều kiện reduce-motion để hiệu ứng được phát theo yêu cầu.

- 2026-09-30: Thông tin danh hiệu mở từ hồ sơ căn giữa dọc viewport, cách thẻ được bấm 15px; hai thẻ đầu mở bảng bên phải, thẻ cuối bên trái. Build PASS.
- 2026-09-30: Thêm hào quang vàng nhiều lớp, phát sáng và lan quanh thẻ Danh hiệu đang được chọn trong hồ sơ; Tailwind-only, giữ nguyên khung và chữ. Build PASS.
- 2026-09-30: Đổi hào quang thẻ Danh hiệu thành quầng vàng tĩnh, sát khung; bỏ hiệu ứng pulse và ping. Build PASS.
- 2026-09-30: Thay quầng tròn bằng các tia vàng mảnh tĩnh, tỏa ngắn ra ngoài thẻ Danh hiệu; nền tia dùng conic gradient và mask mờ dần. Build PASS.
- 2026-09-30: Bấm ngoài bảng thông tin danh hiệu hồ sơ sẽ đóng; bấm thẻ khác sẽ thay nội dung và giữ bảng mở. Build PASS.
- 2026-09-30: Thêm trạng thái title-frame selected dùng chung cho các thẻ; glow/ray theo alpha PNG hoặc crop sprite, filter theo cqw, opacity transition 200ms. Kiểm tra hình học ở 120x40, 240x80 và 360x120; build PASS, chưa có browser screenshot QA.
- 2026-09-30: Tinh chỉnh trạng thái chọn Danh hiệu theo ảnh mẫu: tia vàng dài theo chiều dọc, quầng sát khung, viền sáng theo alpha ảnh; lớp hiệu ứng nằm sau khung và chuyển mượt 200ms. Build PASS.
- 2026-09-30: Chỉnh tia sáng danh hiệu đã chọn: thay tia lặp đều bằng các dải vàng ít hơn, rộng và mềm hơn, dài ngắn không đồng đều; giữ nguyên khung và chữ. Build PASS.
- 2026-09-30: Dùng asset 189fd0e1-1168-4016-9dc0-6ec6124d03f9.png làm tia sáng phía sau danh hiệu được chọn, rộng 115% theo vùng khung thật; bỏ tia CSS tự vẽ. Build PASS.
- 2026-09-30: Tạm mở lại đầy đủ 39 danh hiệu để chỉnh giao diện: 9 Vinh Quang Kỳ Đài, 15 Phong Tặng, và ba nhóm còn lại mỗi nhóm 5; tab Tất cả và tab riêng đều hiện thẻ, vẫn bấm xem thông tin. Build PASS.
- 2026-09-30: Tách trạng thái ánh sáng danh hiệu khỏi bảng thông tin: bấm ngoài đóng bảng nhưng giữ sáng thẻ vừa chọn; chọn thẻ khác chuyển ánh sáng sang thẻ mới, áp dụng ở danh sách và ba thẻ xem trước hồ sơ. Build PASS.
- 2026-09-30: Tăng ảnh ánh sáng riêng cho Phong Tặng cấp 1 lên 143.75% chiều rộng vùng khung; các cấp khác giữ nguyên. Build PASS.
- 2026-09-30: Tăng ảnh ánh sáng của Vinh Quang Kỳ Đài cấp 1 lên cùng mức 143.75% chiều rộng vùng khung; cấp 2 và 3 giữ nguyên. Build PASS.
- 2026-09-30: Tăng ảnh ánh sáng của Vinh Quang Kỳ Đài cấp 2 lên cùng mức với cấp 1; cấp 3 giữ nguyên. Build PASS.
- 2026-09-30: Tăng nhẹ ánh sáng Vinh Quang Kỳ Đài cấp 1 từ 143.75% lên 149.5% chiều rộng khung; các cấp khác giữ nguyên. Build PASS.
- 2026-09-30: Tăng nhẹ ảnh ánh sáng cho Vinh Quang Kỳ Đài cấp 3 lên 143.75% chiều rộng khung; cấp 1 và 2 giữ nguyên. Build PASS.
- 2026-09-30: Tăng ảnh ánh sáng cho Phong Tặng cấp 1 từ 143.75% lên 149.5% chiều rộng khung, cả trong danh sách và thẻ xem trước hồ sơ. Build PASS.
- 2026-09-30: Tăng ảnh ánh sáng Phong Tặng cấp 2 lên cùng mức cấp 1; các cấp 3–5 giữ nguyên. Build PASS.
- 2026-09-30: Tăng ảnh ánh sáng Phong Tặng cấp 3 và 4 lên cùng mức cấp 1–2 trong danh sách và thẻ xem trước hồ sơ; cấp 5 giữ nguyên. Build PASS.
- 2026-09-30: Tăng nhẹ ánh sáng Phong Tặng cấp 5 lên 132.25% chiều rộng vùng khung; áp dụng ở danh sách và thẻ xem trước hồ sơ. Build PASS.
- 2026-09-30: Giảm nhẹ ảnh ánh sáng Vinh Quang Kỳ Đài cấp 3 từ 143.75% xuống 138% chiều rộng khung; cấp 1 và 2 giữ nguyên. Build PASS.
- 2026-09-30: Tăng nhẹ ảnh ánh sáng Phong Tặng cấp 5 từ 132.25% lên 138% chiều rộng vùng khung; áp dụng trong danh sách và thẻ xem trước hồ sơ. Build PASS.
- 2026-09-30: Chuẩn hóa ánh sáng cho ba tab Chuỗi Chiến Thắng, Tổng Ván Chơi, Online Chuyên Cần bằng helper chung: cấp 1 120%, cấp 2 110% kích thước glow cơ sở; đồng nhất cả thẻ danh sách và xem trước hồ sơ. Build PASS.
- 2026-09-30: Giảm nhẹ glow cấp 2 cho Chuỗi Chiến Thắng, Tổng Ván Chơi và Online Chuyên Cần từ 110% xuống 105%; cấp 1 giữ 120%. Build PASS.
- 2026-09-30: Giảm tiếp glow cấp 2 ở ba tab tiến trình về kích thước cơ sở (100%); cấp 1 giữ 120%. Build PASS.
- 2026-09-30: Thu nhỏ thêm glow cấp 2 ở Chuỗi Chiến Thắng, Tổng Ván Chơi và Online Chuyên Cần xuống 90% kích thước cơ sở; cấp 1 giữ 120%. Build PASS.
- 2026-09-30: Giảm độ đục của ảnh ánh sáng ở ba tab Chuỗi Chiến Thắng, Tổng Ván Chơi, Online Chuyên Cần để tia vàng bớt gắt: cấp 1 còn 60%, cấp 2 còn 38%; giữ kích thước đã chỉnh. Build PASS.
- 2026-09-30: Tăng độ đục ảnh ánh sáng cấp 1 ở ba tab tiến trình từ 60% lên 75%; cấp 2 giữ 38%. Build PASS.
- 2026-09-30: Áp dụng độ sáng/kích thước glow của ba tab tiến trình theo loại asset khung cấp 1/cấp 2 thay vì trường level; riêng Chuỗi Chiến Thắng, Bất Bại dùng khung cấp 1. Build PASS.
- 2026-09-30: Cân lại độ đục glow theo loại khung ở ba tab tiến trình: cấp 1 giảm từ 75% xuống 68%, cấp 2 tăng từ 38% lên 45%; kích thước giữ nguyên. Build PASS.
- 2026-09-30: Tăng độ đục glow cấp 2 ở ba tab tiến trình từ 45% lên 52%; cấp 1 giữ 68%, kích thước không đổi. Build PASS.
- 2026-09-30: Tăng tiếp độ đục glow cấp 2 cho ba tab tiến trình từ 52% lên 62%; cấp 1 giữ 68%. Build PASS.
- 2026-09-30: Cân lại cường độ glow ba tab tiến trình theo loại khung: cấp 1 giảm từ 68% xuống 60%, cấp 2 tăng từ 62% lên 70%; kích thước giữ nguyên. Build PASS.
- 2026-09-30: Theo phân loại khung, giảm kích thước ảnh glow cấp 1 (Bất Bại/Lão Làng Kỳ Đàn/Thường Trực) từ 138% xuống 115% chiều rộng khung, tăng cấp 2 từ 103.5% lên 126.5%; cường độ giữ nguyên. Build PASS.
- 2026-09-30: Thu nhỏ nhẹ glow khung cấp 2 ở ba tab tiến trình từ 126.5% xuống 120.75% chiều rộng khung; cấp 1 giữ nguyên. Build PASS.
- 2026-09-30: Tăng nhẹ kích thước glow Phong Tặng cấp 5 từ 138% lên 143.75% chiều rộng vùng khung; áp dụng cả danh sách và xem trước hồ sơ. Build PASS.
- 2026-09-30: Nới nhẹ kích thước glow khung cấp 2 ở ba tab tiến trình từ 120.75% lên 124.2% chiều rộng khung; cấp 1 giữ nguyên. Build PASS.
- 2026-09-30: Nới nhẹ kích thước glow khung cấp 1 ở ba tab tiến trình từ 115% lên 120.75% chiều rộng khung; cấp 2 giữ 124.2%. Build PASS.
- 2026-09-30: Ẩn ba nhóm tab đầu khỏi danh mục Danh hiệu và chỉ để lại Chuỗi Chiến Thắng, Tổng Ván Chơi, Online Chuyên Cần; mặc định mở Chuỗi Chiến Thắng. Giữ nguyên dữ liệu các nhóm đã ẩn và cập nhật docs/danhhieu.md. Build PASS.
- 2026-09-30: Tăng nhẹ kích thước ba thẻ xem trước Danh hiệu trong hồ sơ; click chỉ mở thông tin và không phát sáng tại thẻ xem trước. Build PASS.
- 2026-09-30: Mở lại cả sáu tab Danh hiệu; thêm chọn/bỏ chọn tối đa 3 thẻ mỗi nhóm, tổng hợp lựa chọn ở tab Tất cả và lưu cục bộ theo hồ sơ. Build PASS.
- 2026-09-30: Thêm công tắc Ẩn trong khung thông tin danh hiệu; trạng thái bật màu xanh, tắt màu xám, lưu theo hồ sơ và ẩn thẻ khỏi danh sách đang hiển thị. Build PASS.
- 2026-09-30: Sửa danh hiệu không hiện trong lưới chọn; khung nút co về kích thước nội dung khi được bọc trong ô chọn. Thêm w-full để giữ đúng chiều ngang và tỉ lệ 3:1. Build PASS.
2026-10-01: Changed the profile honor count label to “Sở hữu: n”.
2026-10-01: Reduced the profile honor ownership label weight and aligned its count to the text baseline.
