# Pikafish and HOVANG research analysis

## Verified versions and available artifacts

- **Pikafish:** project documentation and captured UCI output identify release `Pikafish 2026-09-06`, Windows x86-64 universal. `engines/pikafish/README.md` identifies upstream release/source tag `Pikafish-2026-09-06`; `uci-options.txt` records `id name Pikafish 2026-09-06`. The project has Windows and Linux executables and the release `.7z` package, but no Pikafish C++ source/header files. The `.7z` listing includes binaries, `pikafish.nnue`, license/docs, and wiki files; no source tree. No exact commit SHA is recorded. No upstream source was downloaded.
- **HOVANG:** current backend default points to `engines/hovang-v0.4/hovang-engine[.exe]`; its README/source identify v0.4. The project also retains v0.3 source for comparison/rollback. No v0.9 source or runtime path was found. No HOVANG commit ID or license file was found in these engine directories.
- The Windows HOVANG v0.4 executable and its SHA-256 are listed in `FILE_MANIFEST.md`. It is included in the research ZIP. Pikafish binaries are intentionally not copied into the ZIP because corresponding source is absent; their exact local paths, sizes, and hashes are recorded in the manifest. NNUE is not included.

## Integration architecture

Both engines are separate native child processes owned by backend services, outside the frontend bundle. `server/app.ts` creates each service and mounts separate HTTP routers at `/api/pikafish` and `/api/hovang`. The React setup hook calls the selected engine's `/ready` endpoint before starting; `useComputer` sends the current move history, remaining clock, level, and optional initial FEN through the selected Axios service. The backend reconstructs the position and validates the move history using the shared game rules before accepting a returned move.

- **Pikafish protocol:** UCI handshake (`uci`/`uciok`, then `isready`/`readyok`), engine-advertised options, `ucinewgame`, `position startpos|fen ... moves ...`, one `go` limit, and `bestmove`. UCI move coordinates are decoded directly by the shared game UCI parser.
- **HOVANG protocol:** UCCI-compatible handshake (`ucci`, `isready`), `setoption name Hash value 16`, `position ...`, `go movetime ...`, and `bestmove`. The adapter flips rank coordinates (`rank -> 9-rank`) between game and HOVANG conventions for both history and returned moves. README documents `w` as Red and `b` as Black in its FEN convention.
- The services validate that the engine move belongs to the current side and is legal; they also reject forbidden repetition candidates. Pikafish additionally collects MultiPV candidates below level 10, filters legal/immediate-loss candidates, and chooses with configured weights.

## Search and process limits in the checked-in configuration

### Pikafish

`server/services/pikafishLevels.ts` defines levels 1–10. Each `go` uses a single primary search limit: levels 1–3 use depth 1/2/3; levels 4–9 use 4,096/16,000/40,000/100,000/200,000/400,000 nodes; level 10 uses 2,500 ms (or a smaller explicit analysis budget). Server stop deadlines are 80/120/180/250/350/500/700/1,000/1,500/2,500 ms, adjusted against remaining time. Requested Threads are 1 at levels 1–7, 2 at 8–9, and 4 at 10, capped by available CPU and the engine's advertised bounds. Hash is 16/16/16/32/32/64/64/128/128/128 MB. MultiPV is set only if advertised and is used for candidate selection below level 10. The service allows at most two concurrent processes, has a 15-second hard timeout, sends `stop` at the search deadline, and kills on cancellation or shutdown. It creates a process per request, so hash is not retained across moves.

### HOVANG

`server/services/hovangService.ts` uses per-level movetime values `[120, 180, 250, 350, 500, 700, 950, 1250, 1700, 2200]` ms, clamped to remaining clock and 4,000 ms. It sends Hash 16 MB, allows at most two concurrent child processes, and uses watchdog `movetime + 6,000 ms`; cancellation and service shutdown kill the process. It uses one process per request. The source README says `go` is synchronous and does not support asynchronous `stop` while searching. No search Threads option or NNUE is used by HOVANG.

## Research directions for independent HOVANG improvements

These are experiments to investigate, not claims that changes are already implemented or proven stronger:

1. Build a reproducible Xiangqi tactical/endgame suite, perft/rule regressions, and color-swapped self-play opening suite. Record time/nodes, terminal result, adjudication reason, and draw limits; use enough games and SPRT/Elo methodology before claiming strength. The included v0.4-v0.3 arena record is only 12 games and explicitly insufficient for Elo.
2. Audit Xiangqi repetition, perpetual check/chase, stalemate, and search termination against independently authored positions. v0.4 docs call out incomplete long-check/chase rules; source has special low-material stalemate handling in quiescence, which merits targeted coverage across material counts and search depths.
3. Profile evaluation terms (pawn advancement/control, horse legs/outposts, rook files, cannon mobility, king safety) separately, then tune parameters on self-play/training positions. Keep a held-out test set so tuning does not overfit.
4. Compare move ordering, pruning/extensions, transposition-table replacement/size, quiescence, and aspiration settings with controlled node/time budgets. The v0.4 source already contains PVS/alpha-beta, Zobrist TT, aspiration, null move, LMR, killer/history ordering, quiescence, and check extensions per its README/source.
5. Explore a robust asynchronous stop/search interface and persistent per-game process/TT only with explicit CPU/RAM caps and cancellation tests; current backend launches and kills a process for each move, while HOVANG `go` is synchronous.
6. If considering an NNUE, train or obtain independently licensed weights with documented provenance. Do not copy Pikafish code or `pikafish.nnue`; the local NNUE license is separate from the engine GPL.

## Missing inputs for a source-level Pikafish comparison

- Pikafish C++ source at the matching release/tag and its exact commit SHA; neither is present in the checkout/package.
- A decision from the user about whether to obtain/share that source separately. It has not been downloaded.
- Any HOVANG v0.9 source/build/runtime artifacts: this repository resolves to v0.4 and no v0.9 file was found.
- For deeper performance comparisons: a declared CPU/OS target, repeatable benchmark positions, and approved test budgets. No benchmark or engine build was run for this packaging task.

## Copyright and license notes

- Pikafish code is identified as GPL-3.0 by the included `Copying.txt` and README. A binary conveyance normally needs the corresponding source or another GPL-compliant source provision. Since no matching source is in the project and the user asked not to auto-download it, Pikafish executables are described but omitted from this ZIP. Preserve `Copying.txt` and `AUTHORS` with any future distribution.
- `pikafish.nnue` has a distinct license in `NNUE-License.md`, including a restriction on commercial use without permission. The model and release archive containing it are excluded from this ZIP. Its local path, size, and checksum are documented in the manifest.
- No HOVANG license file was found beside v0.3/v0.4 sources; this package is assembled from the user's provided project files for the user's research. Verify HOVANG distribution terms before public redistribution.
