"use client";

import { useEffect, useRef, useState } from "react";

// A brief counter shown once per browser session. The inline script in the root
// layout adds .no-preload before paint on repeat visits so it never flashes.
export function Preloader() {
  const [done, setDone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // hidden by CSS on repeat visits
    if (document.documentElement.classList.contains("no-preload")) return;
    try {
      sessionStorage.setItem("structra:preloaded", "1");
    } catch {}

    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: "ease-out", fill: "forwards" }).onfinish =
          () => setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;
  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__inner corners">
        <span className="corner corner--tl" />
        <span className="corner corner--tr" />
        <span className="corner corner--bl" />
        <span className="corner corner--br" />
        <span className="preloader__label">Calibrating sensors</span>
        <span className="preloader__count" ref={countRef}>
          000
        </span>
      </div>
    </div>
  );
}
