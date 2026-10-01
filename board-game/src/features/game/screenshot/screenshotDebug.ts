// Temporary A/B switch for isolating screenshot-worker load during gameplay.
// Change to false to restore automatic background screenshot generation.
export const DEBUG_DISABLE_BACKGROUND_SCREENSHOTS = import.meta.env.DEV && true
