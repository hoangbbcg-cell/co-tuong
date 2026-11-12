export const DESKTOP_CANVAS_WIDTH = 1493;
export const DESKTOP_CANVAS_HEIGHT = 731;

/** At or below this layout width the app renders natively (no fixed canvas). */
export const COMPACT_MAX_WIDTH = 800;

export type CanvasMetrics = {
  compact: boolean;
  /** Uniform "contain" scale: the whole desktop canvas always fits on screen. */
  scale: number;
};

function getLayoutViewport() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function getVisualViewport() {
  return {
    width: window.visualViewport?.width ?? window.innerWidth,
    height: window.visualViewport?.height ?? window.innerHeight,
  };
}

export function computeMetrics(): CanvasMetrics {
  const { width, height } = getLayoutViewport();
  if (width <= COMPACT_MAX_WIDTH) return { compact: true, scale: 1 };
  const scale = Math.min(
    width / DESKTOP_CANVAS_WIDTH,
    height / DESKTOP_CANVAS_HEIGHT,
  );
  return {
    compact: false,
    scale: Number.isFinite(scale) && scale > 0 ? scale : 1,
  };
}

export function getAppViewportSize() {
  const { compact } = computeMetrics();
  if (compact) {
    const { width, height } = getVisualViewport();
    return { width, height, compact: true };
  }
  return {
    width: DESKTOP_CANVAS_WIDTH,
    height: DESKTOP_CANVAS_HEIGHT,
    compact: false,
  };
}

export function getDesktopCanvasScale() {
  return computeMetrics().scale;
}

export function sameMetrics(a: CanvasMetrics, b: CanvasMetrics) {
  return a.compact === b.compact && Math.abs(a.scale - b.scale) < 0.0005;
}
