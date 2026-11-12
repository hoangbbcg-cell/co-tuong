// @vitest-environment jsdom
import { useEffect, useState } from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { DesktopCanvas } from "../src/lib/desktopCanvas";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
function StatefulScreen({
  mounted,
  disposed,
}: {
  mounted: () => void;
  disposed: () => void;
}) {
  const [step, setStep] = useState(0);
  const [machine, setMachine] = useState(false);
  useEffect(() => {
    mounted();
    return disposed;
  }, [mounted, disposed]);
  return (
    <>
      <button onClick={() => setStep((s) => s + 1)}>Đi quân {step}</button>
      <button aria-pressed={machine} onClick={() => setMachine((s) => !s)}>
        Máy
      </button>
      <input aria-label="Ghi chú" defaultValue="" />
    </>
  );
}
it("keeps the same running screen, move state, AI selection and form across portrait-landscape-portrait", () => {
  vi.stubGlobal("innerWidth", 390);
  vi.stubGlobal("innerHeight", 844);
  vi.stubGlobal("visualViewport", undefined);
  const mounted = vi.fn(),
    disposed = vi.fn();
  const view = render(
    <DesktopCanvas>
      <StatefulScreen mounted={mounted} disposed={disposed} />
    </DesktopCanvas>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Đi quân 0" }));
  fireEvent.click(screen.getByRole("button", { name: "Máy" }));
  const input = screen.getByLabelText("Ghi chú");
  fireEvent.change(input, { target: { value: "Thế đang xếp" } });
  expect(document.getElementById("app-desktop-canvas")).toBeNull();
  for (const [width, height] of [
    [932, 430],
    [390, 844],
    [1000, 600],
    [390, 844],
  ]) {
    act(() => {
      vi.stubGlobal("innerWidth", width);
      vi.stubGlobal("innerHeight", height);
      window.dispatchEvent(new Event("resize"));
    });
    expect(screen.getByRole("button", { name: "Đi quân 1" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Máy" }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect(screen.getByLabelText("Ghi chú")).toBe(input);
    expect((input as HTMLInputElement).value).toBe("Thế đang xếp");
    expect(mounted).toHaveBeenCalledTimes(1);
    expect(disposed).not.toHaveBeenCalled();
    expect(!!document.getElementById("app-desktop-canvas")).toBe(width > 800);
  }
  view.unmount();
  expect(disposed).toHaveBeenCalledOnce();
});
it("preserves state when visualViewport crosses the breakpoint independently of window width", () => {
  const viewport = Object.assign(new EventTarget(), {
    width: 390,
    height: 844,
  });
  vi.stubGlobal("visualViewport", viewport);
  const mounted = vi.fn(),
    disposed = vi.fn();
  render(
    <DesktopCanvas>
      <StatefulScreen mounted={mounted} disposed={disposed} />
    </DesktopCanvas>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Đi quân 0" }));
  for (const [width, height] of [
    [932, 430],
    [390, 844],
  ]) {
    act(() => {
      viewport.width = width;
      viewport.height = height;
      viewport.dispatchEvent(new Event("resize"));
    });
    expect(screen.getByRole("button", { name: "Đi quân 1" })).toBeTruthy();
    expect(mounted).toHaveBeenCalledOnce();
    expect(disposed).not.toHaveBeenCalled();
  }
});
