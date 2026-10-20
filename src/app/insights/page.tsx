import type { Metadata } from "next";
import Link from "next/link";
import { Motion } from "@/components/motion/Motion";
import { Cta, PageHero } from "@/components/ui/Blocks";
import { Arrow } from "@/components/ui/Arrow";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes from the bench on embedded hardware, IoT firmware and indoor air quality.",
  alternates: { canonical: "/insights" },
};

const planned = [
  { tag: "Air quality", title: "Radon and HEPA filtration: what it does and does not do" },
  { tag: "Hardware", title: "An ESP32-S3 board bring-up checklist" },
  { tag: "Firmware", title: "OTA updates that never brick a device" },
];

export default function InsightsPage() {
  return (
    <Motion>
      <PageHero
        eyebrow="Insights"
        title="Notes from the bench."
        lede="Practical writing on building connected hardware. The first articles are in progress."
        crumbs={[{ label: "Insights" }]}
      />
      <section className="section">
        <div className="container">
          <div className="empty-state glass" data-reveal style={{ marginBottom: 24 }}>
            <span className="eyebrow">Coming soon</span>
            <h2>No articles published yet.</h2>
            <p className="muted" style={{ margin: 0 }}>
              These are the topics we are writing first. Want to hear when they go live? Leave your email on the
              contact page.
            </p>
            <Link href="/contact?topic=newsletter" className="btn btn--ghost">
              Get notified <Arrow />
            </Link>
          </div>
          <ul className="card-grid card-grid--3" data-stagger>
            {planned.map((p) => (
              <li className="card glass" key={p.title} style={{ opacity: 0.75 }}>
                <span className="eyebrow">{p.tag} · Draft</span>
                <h3>{p.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Cta />
    </Motion>
  );
}
