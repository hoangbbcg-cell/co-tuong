import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

export const DESKTOP_CANVAS_WIDTH = 1493;
export const DESKTOP_CANVAS_HEIGHT = 731;

/** At or below this layout width the app renders natively (no fixed canvas). */
export const COMPACT_MAX_WIDTH = 800;

type CanvasMetrics = {
  compact: boolean;
  /** Uniform "contain" scale: the whole desktop canvas always fits on screen. */
  scale: number;
};

/**
 * Layout viewport size. We deliberately use innerWidth/innerHeight for the
 * desktop canvas instead of visualViewport: visualViewport shrinks when the
 * mobile keyboard opens (and changes on pinch-zoom), which previously made the
 * canvas rescale and jump off-center. The layout viewport is stable.
 */
function getLayoutViewport() {
  return { width: window.innerWidth, height: window.innerHeight };
}

/** Visual viewport size, used only for the compact (native) layout. */
function getVisualViewport() {
  return {
    width: window.visualViewport?.width ?? window.innerWidth,
    height: window.visualViewport?.height ?? window.innerHeight,
  };
}

function computeMetrics(): CanvasMetrics {
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

function sameMetrics(a: CanvasMetrics, b: CanvasMetrics) {
  return a.compact === b.compact && Math.abs(a.scale - b.scale) < 0.0005;
}

export function DesktopCanvas({ children }: { children: ReactNode }) {
  const [canvas, setCanvas] = useState<CanvasMetrics>(computeMetrics);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      // Coalesce bursts of resize/orientation events into one update per frame.
      frame = requestAnimationFrame(() => {
        const next = computeMetrics();
        setCanvas((prev) => (sameMetrics(prev, next) ? prev : next));
      });
    };
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    // Only react to visualViewport changes while in compact mode; on desktop
    // layout they come from keyboards/pinch-zoom and must not rescale the canvas.
    const vv = window.visualViewport;
    const onVisualResize = () => {
      if (computeMetrics().compact) update();
    };
    vv?.addEventListener("resize", onVisualResize);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      vv?.removeEventListener("resize", onVisualResize);
    };
  }, []);

  const viewportStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    overflow: "hidden",
  };

  // Centered by absolute offset + translate rather than grid/flex, so the
  // position never depends on the canvas's own (unscaled) layout box and stays
  // centered when the keyboard opens or the browser chrome collapses.
  const canvasStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: DESKTOP_CANVAS_WIDTH,
    height: DESKTOP_CANVAS_HEIGHT,
    minWidth: DESKTOP_CANVAS_WIDTH,
    minHeight: DESKTOP_CANVAS_HEIGHT,
    transform: `translate(-50%, -50%) scale(${canvas.scale})`,
    transformOrigin: "center center",
    overflow: "visible",
    "--desktop-canvas-scale": canvas.scale,
  } as CSSProperties;

  // Keep both wrapper nodes across the breakpoint. Adding/removing them remounts
  // Providers and every screen, losing local game/editor state during rotation.
  // Compact wrappers have no layout box or desktop IDs, preserving mobile CSS.
  return (
    <div
      id={canvas.compact ? undefined : "app-desktop-viewport"}
      style={canvas.compact ? { display: "contents" } : viewportStyle}
    >
      <div
        id={canvas.compact ? undefined : "app-desktop-canvas"}
        style={canvas.compact ? { display: "contents" } : canvasStyle}
      >
        {children}
      </div>
    </div>
  );
}
