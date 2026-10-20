import Link from "next/link";
import { Motion } from "@/components/motion/Motion";
import { Arrow } from "@/components/ui/Arrow";

export default function NotFound() {
  return (
    <Motion>
      <section className="page-hero" style={{ minHeight: "70svh", borderBottom: 0 }}>
        <div className="container" style={{ display: "grid", gap: 24 }}>
          <p className="eyebrow">Error 404</p>
          <h1 style={{ fontSize: "var(--step-4)" }}>No signal at this address.</h1>
          <p className="lede">The page may have moved, or the link may be mistyped.</p>
          <div className="btn-row">
            <Link href="/" className="btn">
              Back to home <Arrow />
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </Motion>
  );
}
