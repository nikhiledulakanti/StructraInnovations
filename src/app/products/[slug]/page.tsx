import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Motion } from "@/components/motion/Motion";
import { Cta, Faq, JsonLd, PageHero, SectionHead } from "@/components/ui/Blocks";
import { SentinelDiagram } from "@/components/ui/SentinelDiagram";
import { Txt } from "@/components/ui/Txt";
import { products, site } from "@/content/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: product.name, description: product.summary, url: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <Motion>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.summary,
          brand: { "@type": "Brand", name: site.name },
        }}
      />
      <PageHero
        eyebrow={product.status}
        title={product.name}
        lede={product.summary}
        crumbs={[{ label: "Products", href: "/products" }, { label: product.name }]}
      />
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div style={{ display: "grid", gap: 16 }}>
            <p className="eyebrow" data-reveal>The problem</p>
            <p className="lede" data-reveal>{product.problem}</p>
          </div>
          <div className="glass corners" data-reveal style={{ display: "grid", placeItems: "center" }}>
            <span className="corner corner--tl" />
            <span className="corner corner--tr" />
            <span className="corner corner--bl" />
            <span className="corner corner--br" />
            <SentinelDiagram />
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="Sense. Decide. Act." />
          <div className="card-grid card-grid--3" data-stagger>
            {product.how.map((h, i) => (
              <div className="card glass" key={h.title}>
                <span className="step__num">0{i + 1}</span>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-2">
          <div style={{ display: "grid", gap: 32, alignContent: "start" }}>
            <SectionHead eyebrow="Who it is for" title="Built for spaces people live and work in." />
            <ul className="check-list" data-stagger>
              {product.audience.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="glass" style={{ padding: 28 }} data-reveal>
            <h2 className="eyebrow" style={{ marginBottom: 8 }}>Specifications</h2>
            <table className="spec-table">
              <tbody>
                {product.specs.map((s) => (
                  <tr key={s.label}>
                    <th scope="row">{s.label}</th>
                    <td><Txt text={s.value} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Faq items={product.faqs} />
      <Cta
        title={`Be first to get ${product.name}.`}
        body="Join the early-access list. We will only email you about availability and pilot programmes."
        label="Join early access"
        href="/contact?topic=early-access"
      />
    </Motion>
  );
}
