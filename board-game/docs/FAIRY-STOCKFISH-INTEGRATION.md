# Fairy-Stockfish integration

- 2026-10-27: Theo user, máy trong Vị trí tùy chỉnh và Đánh thử luôn Fairy mạnh nhất: usePositionEditor chốt computerEngine=fairy/computerLevel10 khi vào, useReplayTrial gọi fairyStockfishApi.move level10 với FEN gốc+history nhánh riêng thay Pikafish/700ms. Cấp Đấu với máy thường giữ lựa chọn1–10; máy trong trial vẫn mặc định tắt, không tự đi khi vào. Giữ cancel/reset/replay/socket cô lập và Gợi ý hiện tại. Replay-trial3/3 PASS xác nhận Fairy10/history/cancel; typecheck/build PASS, dist cập nhật; chưa browser QA.

- 2026-10-27: Theo user, Fairy cấp1–6 tăng dần: depth1–6, Skill0/3/6/10/14/18, tỷ lệ random nước hợp lệ85/65/45/25/12/4%; random sau replay/validatehistory+abort và lọc lặp cấm. Cấp7–10 cùng engine NNUE fullstrength Skill20/MultiPV1/LimitStrengthfalse, go movetime tối đa800ms thay depth7–10; giới hạn RAM/CPU/clock/cancel giữ. Không đổi UI/PvP/Pikafish/Cờ Úp khác engine. Tests3PASS/1SKIP (240ply gated không chạy); native smoke cấp1/6/7/10 đều trả legal951–1817ms gồm startup, UCI xác nhận options. Typecheck/build PASS; dist cập nhật. Chưa đo Elo/đấu kiểm định độ khó hoặc browser; backend cần nạp code mới, không restart/deploy.

Computer mode uses Fairy-Stockfish through the existing game flow. The frontend calls `src/services/fairyStockfish.ts`; Express routes `/api/fairy-stockfish/ready` and `/move` to `FairyStockfishService`. The service reconstructs the game from validated FEN/UCI history, launches a separate UCI process for the search, then converts and validates the returned move through the shared Xiangqi rules. Replay trial machine moves use Fairy level 10. Analysis and hints retain the existing Pikafish integration.

## Engine files and configuration

The local Windows binary is `engines/fairy-stockfish/fairy-stockfish_x86-64-modern.exe` (13,391,374 bytes; SHA-256 `3F5E81CA2F7C28386540F6D61F496831D8756179FCB1DF0AD40C48D8C345A481`). Executables are gitignored; provide the engine separately on each host.

- Windows default: `engines/fairy-stockfish/fairy-stockfish_x86-64-modern.exe`.
- Linux default: `engines/fairy-stockfish/fairy-stockfish` (a native Linux build must be supplied).
- Override binary path with `FAIRY_STOCKFISH_PATH`.
- Optionally override model path with `FAIRY_STOCKFISH_EVAL_FILE`; a configured missing file is an error.

The tested Fairy-Stockfish 220722 LB binary advertises `UCI_Variant=xiangqi`, `Use NNUE`, and `EvalFile=xiangqi-ae0082262b68.nnue`. With its default model setting it emitted `NNUE evaluation using ... enabled`; no standalone NNUE file was found beside the downloaded executable. Supplying a nonexistent EvalFile makes this binary switch to classical evaluation, which the adapter rejects. The adapter requires the runtime NNUE-enabled message before accepting `bestmove`.

## Protocol and safety limits

Each request runs `uci`, sets `UCI_Variant=xiangqi` and `Use NNUE=true`, applies Threads/Hash only when advertised, then runs `ucinewgame`/`isready`, sends `position`, and searches with depth 1–6 and progressively reduced beginner handicaps, or full-strength `go movetime` for levels 7–10, capped by an 800 ms stop deadline (also reduced if the player's remaining clock is low). The 800 ms limit is engine search time after process/UCI startup; measured end-to-end request time on the local Windows machine was about 1.8 s. It caps each process at two threads and Hash at 128 MB; at most two engine processes are active (aggregate Hash at most 256 MB). Requests have a 15-second outer watchdog, aborted HTTP requests kill their process, and application shutdown closes outstanding processes. A non-Windows host rejects a `.exe` path and requires a native binary.

Fairy UCI ranks are 1–10 while the game rules use 0–9: the adapter offsets ranks in both directions for all history moves and returned moves. It validates the input history by replaying it in the shared game engine and validates the returned side, movement legality, and repetition rule before responding.

## Verification and limitations

Verified with the supplied Windows executable: UCI handshake, Xiangqi selection, `isready`, NNUE activation, legal move for Red, legal move for Black after Red's move, and a custom FEN with Black to move. The gated real-engine test `RUN_FAIRY_STOCKFISH_TESTS=1 npm test -- tests/fairy-stockfish.test.ts` plays up to 240 plies through the shared game rules; if no natural result is adjudicated, it closes the test game by resignation because the game does not currently adjudicate repetition draws automatically. The HTTP endpoints were also exercised against the real backend and engine.

No Linux executable or separate NNUE file was found in Downloads, so Linux runtime and external model packaging remain unverified. The downloaded binary did not include a license file in its source directory; review Fairy-Stockfish's applicable GPL license and include its corresponding source/notice when redistributing the binary. This integration does not copy Pikafish source, binaries, or NNUE into Fairy-Stockfish.
