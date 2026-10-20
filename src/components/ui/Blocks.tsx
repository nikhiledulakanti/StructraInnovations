import Link from "next/link";
import type { ReactNode } from "react";
import { Split } from "@/components/motion/Split";
import { Arrow } from "@/components/ui/Arrow";
import { Txt } from "@/components/ui/Txt";
import { site } from "@/content/site";

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs && (
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              <li>
                <Link href="/">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <Split as="h1" text={title} />
        {lede && (
          <p className="lede" data-reveal>
            <Txt text={lede} />
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="section-head">
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <Split text={title} />
      {lede && <p data-reveal>{lede}</p>}
    </div>
  );
}

export function Faq({ items, title = "Questions, answered" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container grid-2">
        <div className="section-head" style={{ alignContent: "start" }}>
          <p className="eyebrow" data-reveal>
            FAQ
          </p>
          <Split text={title} id="faq-title" />
        </div>
        <div className="faq" data-stagger>
          {items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div>
                <Txt text={f.a} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta({
  title = "Have a device in mind? Let's talk it through.",
  body = "A 30-minute discovery call is enough to tell you whether your idea is feasible, what it will take, and where the risks are.",
  label = site.primaryCta.label,
  href = site.primaryCta.href,
}: {
  title?: string;
  body?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-block glass corners">
          <span className="corner corner--tl" />
          <span className="corner corner--tr" />
          <span className="corner corner--bl" />
          <span className="corner corner--br" />
          <div className="cta-block__glow" data-parallax="0.2" />
          <Split text={title} />
          <p className="lede" data-reveal>
            {body}
          </p>
          <div className="btn-row" data-reveal>
            <Link href={href} className="btn" data-magnetic>
              {label} <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Corners() {
  return (
    <>
      <span className="corner corner--tl" />
      <span className="corner corner--tr" />
      <span className="corner corner--bl" />
      <span className="corner corner--br" />
    </>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
