import type { Metadata } from "next";
import { Motion } from "@/components/motion/Motion";
import { PageHero } from "@/components/ui/Blocks";
import { ContactForm } from "@/components/ui/ContactForm";
import { Txt } from "@/components/ui/Txt";
import { FOUNDER_INPUT, workProcess, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a discovery call about your hardware or firmware project, or join the Radon Sentinel early-access list.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Motion>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building."
        lede="Send a few lines about your device. We will reply to arrange a 30-minute discovery call, free and without obligation."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="section">
        <div className="container grid-2" style={{ gridTemplateColumns: undefined }}>
          <div style={{ display: "grid", gap: 28, alignContent: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>What happens next</p>
              <ol className="check-list" style={{ listStyle: "none" }}>
                {workProcess.slice(0, 2).map((p) => (
                  <li key={p.step}>
                    <span>
                      <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{p.title}.</strong> {p.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="glass" style={{ padding: 24, display: "grid", gap: 8 }}>
              <span className="eyebrow">Direct</span>
              {site.email ? (
                <a href={`mailto:${site.email}`} style={{ fontSize: "var(--step-1)" }}>{site.email}</a>
              ) : (
                <span><Txt text={`${FOUNDER_INPUT}: public contact email`} /></span>
              )}
              <span className="muted"><Txt text={site.location} /></span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </Motion>
  );
}
