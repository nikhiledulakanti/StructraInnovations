"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SceneHandle } from "./scene";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";
import { Split } from "@/components/motion/Split";

// Illustrative numbers for the interactive demo only; not a product measurement.
const DEMO_HIGH = 6.2;
const DEMO_LOW = 1.1;

export function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneHandle | null>(null);
  const meterRef = useRef<HTMLSpanElement>(null);
  const readoutRef = useRef<HTMLElement>(null);
  const holdRef = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);
  const [clean, setClean] = useState(false);

  const onPurify = useCallback((v: number) => {
    const level = DEMO_HIGH - (DEMO_HIGH - DEMO_LOW) * v;
    if (readoutRef.current) readoutRef.current.textContent = level.toFixed(1);
    if (meterRef.current) meterRef.current.style.transform = `scaleX(${level / DEMO_HIGH})`;
    holdRef.current?.style.setProperty("--hold", v.toFixed(3));
    setClean(v > 0.96);
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const boot = () => {
      import("./scene")
        .then(({ createScene }) => {
          if (cancelled) return;
          try {
            sceneRef.current = createScene(el, { reducedMotion, onPurify });
            setReady(true);
          } catch {
            // WebGL unavailable: the gradient fallback stays in place
          }
        })
        .catch(() => {});
    };
    // let the page paint and settle before pulling in three.js
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(boot, { timeout: 1200 })
      : window.setTimeout(boot, 300);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [onPurify]);

  const hold = (on: boolean) => sceneRef.current?.setHold(on);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__canvas" ref={canvasRef}>
        {!ready && <div className="hero__fallback" />}
      </div>
      <div className="hero__shade" />

      <div className="container hero__content">
        <p className="eyebrow" data-reveal>
          Embedded hardware · IoT · Air-quality products
        </p>
        <Split as="h1" id="hero-title" text="Hardware that senses, decides and acts." />

        <div className="hero__bottom">
          <div style={{ display: "grid", gap: 28 }}>
            <p className="hero__lede" data-reveal>
              {site.name} designs and builds connected devices from first schematic to field-ready product. Our own
              product, Radon Sentinel, watches indoor radon and switches on filtration before exposure builds up.
            </p>
            <div className="btn-row" data-reveal>
              <Link href={site.primaryCta.href} className="btn" data-magnetic>
                {site.primaryCta.label} <Arrow />
              </Link>
              <Link href={site.secondaryCta.href} className="btn btn--glass" data-magnetic>
                {site.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="hero__panel glass corners" data-reveal>
            <span className="corner corner--tl" />
            <span className="corner corner--tr" />
            <span className="corner corner--bl" />
            <span className="corner corner--br" />
            <div className="hero__readout">
              <span>Simulated radon level</span>
              <span>
                <strong ref={readoutRef}>{DEMO_HIGH.toFixed(1)}</strong> pCi/L
              </span>
            </div>
            <div className="meter" aria-hidden="true">
              <span ref={meterRef} />
            </div>
            <button
              ref={holdRef}
              type="button"
              className="hold-btn"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                hold(true);
              }}
              onPointerUp={() => hold(false)}
              onPointerCancel={() => hold(false)}
              onKeyDown={(e) => {
                if ((e.key === " " || e.key === "Enter") && !e.repeat) {
                  e.preventDefault();
                  hold(true);
                }
              }}
              onKeyUp={(e) => {
                if (e.key === " " || e.key === "Enter") hold(false);
              }}
              onBlur={() => hold(false)}
              onContextMenu={(e) => e.preventDefault()}
              aria-describedby="hold-help"
            >
              <span className="hold-btn__fill" aria-hidden="true" />
              <span>{clean ? "Air filtered · release to reset" : "Press and hold to filter"}</span>
            </button>
            <p id="hold-help" className="sr-only">
              Demonstration only. Holding the button animates how Sentinel responds to rising radon. The numbers are
              illustrative, not a measurement.
            </p>
            <span className="sr-only" aria-live="polite">
              {clean ? "Simulated level reduced." : ""}
            </span>
          </div>
        </div>
        <span className="scroll-hint" aria-hidden="true">
          Scroll ↓
        </span>
      </div>
    </section>
  );
}
