import type { Metadata } from "next";
import Link from "next/link";
import { Motion } from "@/components/motion/Motion";
import { Corners, Cta, PageHero } from "@/components/ui/Blocks";
import { Arrow } from "@/components/ui/Arrow";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and results from Structra Innovations, including the Radon Sentinel MVP.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <Motion>
      <PageHero
        eyebrow="Work"
        title="Results we can show you."
        lede="We publish client work only with permission and real numbers. Here is what is public today."
        crumbs={[{ label: "Work" }]}
      />
      <section className="section">
        <div className="container card-grid">
          <article className="card glass corners" data-reveal>
            <Corners />
            <span className="eyebrow">Own product · Hardware + firmware</span>
            <h2 style={{ fontSize: "var(--step-2)" }}>Radon Sentinel MVP</h2>
            <p>
              A connected radon monitor on ESP32-S3 that controls HEPA filtration and sends alerts. Designed, built
              and tested in-house.
            </p>
            <Link href="/products/radon-sentinel" className="card__link bracket" style={{ width: "fit-content" }}>
              Read more
            </Link>
          </article>
          <div className="empty-state glass" data-reveal>
            <span className="eyebrow">Client case studies</span>
            <h2>Being written up.</h2>
            <p className="muted" style={{ margin: 0 }}>
              <span className="placeholder">[Founder input required]</span> Add approved client projects with the
              challenge, what we built and a measurable result.
            </p>
            <Link href="/contact" className="btn btn--ghost">
              Ask for references <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <Cta title="Your project could be the next case study." />
    </Motion>
  );
}
