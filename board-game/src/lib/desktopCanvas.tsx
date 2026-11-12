import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  DESKTOP_CANVAS_HEIGHT,
  DESKTOP_CANVAS_WIDTH,
  computeMetrics,
  sameMetrics,
  type CanvasMetrics,
} from "./desktopCanvasMetrics";

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
