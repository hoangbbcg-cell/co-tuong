// Opt in with `vite --mode benchmark`; regular development keeps mate/stalemate checks enabled.
export const DEBUG_SKIP_ENDGAME_MOVE_SCAN = import.meta.env.DEV && import.meta.env.MODE === 'benchmark'
