import type { Metadata } from "next";
import Link from "next/link";
import { Motion } from "@/components/motion/Motion";
import { Cta, PageHero, SectionHead } from "@/components/ui/Blocks";
import { Arrow } from "@/components/ui/Arrow";
import { workProcess, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Embedded and PCB design, IoT firmware and product prototyping for teams building connected devices.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <Motion>
      <PageHero
        eyebrow="Services"
        title="From schematic to shipped device."
        lede="Three ways to work with us. Each one ends with something you can test, measure and own."
        crumbs={[{ label: "Services" }]}
      />
      <section className="section">
        <div className="container">
          <ul className="service-list" data-stagger>
            {services.map((s) => (
              <li className="service-row" key={s.slug}>
                <span className="service-row__index">{s.index}</span>
                <h2 style={{ fontSize: "var(--step-2)" }}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </h2>
                <p>{s.outcome}</p>
                <span className="service-row__arrow" aria-hidden="true">
                  <Arrow className="" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Every engagement" title="The same four steps." />
          <ol className="steps" data-stagger style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {workProcess.map((p) => (
              <li className="step glass" key={p.step}>
                <span className="step__num">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Cta title="Not sure which service fits?" body="Describe the device and where you are stuck. We will tell you what it needs, even if that is not us." />
    </Motion>
  );
}
