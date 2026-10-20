"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, summary, [data-cursor], input, textarea, select, label";

export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!fine || reduced || !root) return;

    root.dataset.hidden = "true";
    const pos = { x: -100, y: -100, rx: -100, ry: -100 };
    let raf = 0;

    const loop = () => {
      pos.rx += (pos.x - pos.rx) * 0.18;
      pos.ry += (pos.y - pos.ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${pos.rx}px, ${pos.ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      root.dataset.hidden = "false";
      const target = e.target as Element | null;
      root.dataset.active = String(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const leave = () => (root.dataset.hidden = "true");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true" data-hidden="true">
      <div className="cursor__ring" ref={ringRef} />
      <div className="cursor__dot" ref={dotRef} />
    </div>
  );
}
