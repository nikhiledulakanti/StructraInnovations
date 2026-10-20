import type { Metadata } from "next";
import Link from "next/link";
import { Motion } from "@/components/motion/Motion";
import { Cta, PageHero } from "@/components/ui/Blocks";
import { Arrow } from "@/components/ui/Arrow";
import { SentinelDiagram } from "@/components/ui/SentinelDiagram";
import { products } from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description: "Connected products designed and built by Structra Innovations, starting with Radon Sentinel.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <Motion>
      <PageHero
        eyebrow="Products"
        title="Devices we design, build and stand behind."
        lede="Our products use the same engineering we offer clients, and they prove it works outside the lab."
        crumbs={[{ label: "Products" }]}
      />
      <section className="section">
        <div className="container" style={{ display: "grid", gap: 24 }}>
          {products.map((p) => (
            <article className="product-feature glass" key={p.slug} data-reveal>
              <div className="product-feature__body">
                <span className="status-pill">{p.status}</span>
                <h2 style={{ fontSize: "var(--step-3)" }}>{p.name}</h2>
                <p className="lede" style={{ fontSize: "var(--step-0)" }}>{p.summary}</p>
                <div className="btn-row">
                  <Link href={`/products/${p.slug}`} className="btn" data-magnetic>
                    View {p.name} <Arrow />
                  </Link>
                </div>
              </div>
              <div className="product-feature__visual">
                <SentinelDiagram />
              </div>
            </article>
          ))}
        </div>
      </section>
      <Cta
        title="Want early access?"
        body="Join the early-access list and we will tell you when Radon Sentinel is ready to order."
        label="Join early access"
        href="/contact?topic=early-access"
      />
    </Motion>
  );
}
