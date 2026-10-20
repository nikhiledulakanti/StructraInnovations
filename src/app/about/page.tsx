import type { Metadata } from "next";
import { Motion } from "@/components/motion/Motion";
import { Corners, Cta, PageHero, SectionHead } from "@/components/ui/Blocks";
import { Txt } from "@/components/ui/Txt";
import { founder, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Structra Innovations is an engineering company building connected hardware for clients and for its own products.",
  alternates: { canonical: "/about" },
};

const principles = [
  { title: "Honest about physics", body: "We say what a device can and cannot do. Radon Sentinel's own FAQ explains the limits of HEPA filtration." },
  { title: "Production in mind", body: "Every prototype decision considers the hundredth unit, not just the first." },
  { title: "You own the result", body: "Designs, firmware and documentation are handed over in full." },
];

export default function AboutPage() {
  return (
    <Motion>
      <PageHero
        eyebrow="About"
        title="An engineering company that ships its own hardware."
        lede={`${site.name} builds connected devices for clients and for itself. Making our own products keeps our engineering grounded in what actually works in the field.`}
        crumbs={[{ label: "About" }]}
      />
      <section className="section">
        <div className="container founder">
          <div className="founder__portrait glass corners" data-reveal>
            <Corners />
            <span className="placeholder">Founder photo</span>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            <p className="eyebrow" data-reveal>{founder.role}</p>
            <h2 style={{ fontSize: "var(--step-3)" }} data-reveal><Txt text={founder.name} /></h2>
            <p className="lede" data-reveal><Txt text={founder.bio} /></p>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How we think" title="Three principles we work by." />
          <div className="card-grid card-grid--3" data-stagger>
            {principles.map((p) => (
              <div className="card glass" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Facts" title="The company at a glance." />
          <table className="spec-table glass" style={{ padding: 28, display: "table" }}>
            <tbody>
              <tr><th scope="row">Founded</th><td><Txt text="[Founder input required]" /></td></tr>
              <tr><th scope="row">Based in</th><td><Txt text={site.location} /></td></tr>
              <tr><th scope="row">Focus</th><td>Embedded hardware, IoT firmware, air-quality products</td></tr>
              <tr><th scope="row">First product</th><td>Radon Sentinel (MVP)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <Cta />
    </Motion>
  );
}
