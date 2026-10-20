"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll and hover motion for one page. Scoped to its own <main> so routes that
// Next keeps mounted-but-hidden never pick up each other's triggers.
//
//   data-split       words rise into place (pair with <Split>)
//   data-reveal      fades up when it enters the viewport
//   data-stagger     its direct children fade up one after another
//   data-progress    a child <span> scales with scroll through the element
//   data-parallax=n  drifts vertically by n × its height while scrolling
//   data-magnetic    leans toward the pointer on hover

export function Motion({ children, id = "main" }: { children: ReactNode; id?: string }) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cleanups: (() => void)[] = [];
    // wait for the first-visit preloader before the hero intro plays
    const intro = document.documentElement.classList.contains("no-preload") ? 0 : 0.9;
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        gsap.from(el.querySelectorAll(".split-word > span"), {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          delay: el.closest(".hero") ? intro + 0.1 : 0,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 1,
          ease: "power3.out",
          delay: el.closest(".hero") ? intro + 0.45 : 0,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          autoAlpha: 0,
          y: 32,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-progress]").forEach((el) => {
        const bar = el.querySelector("span");
        if (!bar) return;
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.15");
        gsap.fromTo(
          el,
          { yPercent: -amount * 100 },
          {
            yPercent: amount * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, root);

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          gsap.set(el, { x: 0, y: 0 });
        });
      });
    }

    // fonts and images can shift layout after first measure
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <main id={id} ref={ref} tabIndex={-1}>
      {children}
    </main>
  );
}
