# Practice AI levels (2026-11-04)

Levels1–6 supersede the previous Fairy beginner handicaps. The proposed no-opponent bot fallback was cancelled by the user; quick play keeps its prior online waiting/no-room flow.

- Levels 1–6 use the project-owned `server/services/practiceAi.ts`. No native executable is called. Level 1 chooses a random legal move; level 2 prefers captures with a 20% random choice; levels 3–6 use material/position evaluation and iterative alpha-beta search with maximum depth 1/2/3/4. Budgets increase from 500/1800/6000/16000 nodes and 60/120/250/450 ms. These settings are not measured Elo ratings or a guarantee of winning strength.
- Requests replay and validate FEN/history first, then filter forbidden repetition at the root. Search uses immutable simulated boards, cooperatively yields, supports AbortSignal and service shutdown, and admits at most two simultaneous practice requests.
- Levels 7–10 keep native Fairy-Stockfish NNUE, skill20, full-strength search. The existing /api/fairy-stockfish/move route selects the appropriate implementation. /ready probes native Fairy; setup skips it for levels1–6.

Validation of the retained levels: original full baseline956 PASS/0 FAIL/41 SKIP; native/practice17/17 on unchanged backend. After cancelling fallback, related UI/entry/quick-play/practice62/62 PASS. Final build status is recorded in outputs/cancel-fallback-20261104/REPORT.md.
