"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/content/site";
import { Logo } from "@/components/ui/Arrow";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isCurrent = (href: string) => (pathname === href || pathname.startsWith(href + "/") ? "page" : undefined);

  // close the menu on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="site-header" data-hidden={hidden && !open}>
        <div className="container">
          <div className="site-header__bar glass">
            <Link href="/" className="logo" aria-label={`${site.name}, home`}>
              <Logo />
              <span>{site.shortName}</span>
            </Link>
            <nav className="nav-desktop" aria-label="Primary">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="bracket" aria-current={isCurrent(l.href)}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="header-actions">
              <Link href="/contact" className="btn header-cta">
                Book a call
              </Link>
              <button
                ref={toggleRef}
                type="button"
                className="menu-toggle"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                <span />
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav
        id="mobile-menu"
        className="mobile-menu"
        data-open={open}
        aria-label="Mobile"
        inert={!open}
      >
        {[...navLinks, { label: "Contact", href: "/contact" }].map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isCurrent(l.href)}
            style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
