# Giải đấu: nhân vật, rồng và hổ

Nguồn người dùng: `giải đấu.png`. Đầu vào ImageGen tích hợp: `tournament-art-no-cup.png`. Kết quả ngày 2026-09-19: `tournament-dragon-tiger-transparent.png`.

Giữ hai nhân vật, rồng, hổ và chữ Giải đấu; bỏ cảnh nền/chữ phụ/cúp. Đã xem ảnh và xác nhận PNG RGBA với alpha=0 ở góc và giữa phía trên. Home dùng ảnh này, cúp vẫn là phần tử DOM riêng. Ảnh chỉnh AI có thể khác chi tiết so với nguồn.

Prompt: Background extraction from the provided image. Output TRUE transparent alpha PNG. Keep ALL FOUR subjects from the original: the golden dragon above the white-haired warrior on the left, the tiger above the black-haired warrior on the right, BOTH human warriors with flowing hair and robes, and the exact central golden calligraphy 'Giải đấu'. Preserve their detailed appearance, original relative placement and scale as closely as possible, on the same wide canvas. Remove only the scenery: sky, suns, mountains, buildings, trees, water, rocks, chessboard and bottom circles. Remove both small subtitle lines and the ornament under the title. No trophy. The central space above the title must be transparent so a separate UI trophy can appear there. Do not remove the dragon or tiger. Clean antialiased edges, no opaque background, no checkerboard pattern. Keep complete dragon and tiger silhouettes.
