import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Motion } from "@/components/motion/Motion";
import { Cta, Faq, JsonLd, PageHero, SectionHead } from "@/components/ui/Blocks";
import { FOUNDER_INPUT, services, site } from "@/content/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.summary, url: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <Motion>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          provider: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <PageHero
        eyebrow={`Service ${service.index}`}
        title={service.title}
        lede={service.summary}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      />
      <section className="section">
        <div className="container grid-2">
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <p className="eyebrow" data-reveal>The problem</p>
            <p className="lede" data-reveal>{service.problem}</p>
          </div>
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <p className="eyebrow" data-reveal>What you get</p>
            <p className="lede" data-reveal style={{ color: "var(--ink)" }}>{service.outcome}</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-2">
          <SectionHead eyebrow="Deliverables" title="What lands in your hands." />
          <ul className="check-list glass" style={{ padding: 28, alignSelf: "start" }} data-stagger>
            {service.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How we approach it" title="What makes it different." />
          <div className="card-grid card-grid--3" data-stagger>
            {service.approach.map((a, i) => (
              <div className="card glass" key={a.title}>
                <span className="step__num">0{i + 1}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Faq
        items={[
          ...service.faqs,
          { q: "What does it cost?", a: `${FOUNDER_INPUT}: pricing model or typical range for this service.` },
        ]}
      />
      <Cta title={`Talk to us about ${service.title.toLowerCase()}.`} />
    </Motion>
  );
}
