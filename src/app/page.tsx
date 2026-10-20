import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Motion } from "@/components/motion/Motion";
import { Split } from "@/components/motion/Split";
import { Corners, Cta, Faq, JsonLd, SectionHead } from "@/components/ui/Blocks";
import { Arrow } from "@/components/ui/Arrow";
import { SentinelDiagram } from "@/components/ui/SentinelDiagram";
import { Txt } from "@/components/ui/Txt";
import { FOUNDER_INPUT, founder, homeFaqs, problems, workProcess, products, services } from "@/content/site";

const capabilities = ["ESP32-S3", "Schematic & PCB layout", "Embedded firmware", "OTA updates", "Wi-Fi & BLE", "Sensor calibration", "Prototyping", "Air-quality sensing"];

export default function Home() {
  const sentinel = products[0];
  return (
    <Motion>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs
            .filter((f) => !f.a.includes(FOUNDER_INPUT))
            .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Hero />

      <div className="strip" aria-label="Capabilities">
        <div className="strip__track" aria-hidden="true">
          {[...capabilities, ...capabilities].map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <p className="sr-only">{capabilities.join(", ")}</p>
      </div>

      {/* Problems → outcomes */}
      <section className="section" aria-labelledby="problems-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              Why teams call us
            </p>
            <Split id="problems-title" text="Hardware fails in the details. We design for them." />
          </div>
          <div className="po-table" data-stagger>
            {problems.map((p) => (
              <div className="po-row" key={p.problem}>
                <span className="po-row__problem">{p.problem}</span>
                <span className="po-row__arrow" aria-hidden="true">
                  →
                </span>
                <span className="po-row__outcome">
                  <span className="sr-only">Instead: </span>
                  {p.outcome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" aria-labelledby="services-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              Services
            </p>
            <Split id="services-title" text="Engineering for teams building connected devices." />
            <p data-reveal>Bring us an idea, a half-finished board or firmware that misbehaves in the field.</p>
          </div>
          <ul className="service-list" data-stagger>
            {services.map((s) => (
              <li className="service-row" key={s.slug}>
                <span className="service-row__index">{s.index}</span>
                <h3>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </h3>
                <p>{s.summary}</p>
                <span className="service-row__arrow" aria-hidden="true">
                  <Arrow className="" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product */}
      <section className="section" aria-labelledby="product-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Products"
            title="We ship our own hardware, too."
            lede="Building a product end to end keeps our client work honest. Radon Sentinel is the first."
          />
          <article className="product-feature glass" data-reveal>
            <div className="product-feature__body">
              <span className="status-pill">{sentinel.status}</span>
              <h3 id="product-title">{sentinel.name}</h3>
              <p className="lede" style={{ fontSize: "var(--step-0)" }}>
                {sentinel.summary}
              </p>
              <ul className="check-list">
                {sentinel.how.map((h) => (
                  <li key={h.title}>
                    <span>
                      <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{h.title}.</strong> {h.body}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="btn-row">
                <Link href={`/products/${sentinel.slug}`} className="btn" data-magnetic>
                  Explore {sentinel.name} <Arrow />
                </Link>
              </div>
            </div>
            <div className="product-feature__visual">
              <SentinelDiagram />
            </div>
          </article>
        </div>
      </section>

      {/* Process */}
      <section className="section" aria-labelledby="process-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              How we work
            </p>
            <Split id="process-title" text="Four steps, no surprises." />
          </div>
          <div className="progress-line" data-progress aria-hidden="true">
            <span />
          </div>
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

      {/* Proof */}
      <section className="section" aria-labelledby="proof-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Selected work"
            title="Proof, not promises."
            lede="We only publish results we can stand behind. Client case studies appear here as they are approved."
          />
          <div className="proof-grid" data-stagger>
            <div className="proof glass corners">
              <Corners />
              <span className="proof__value">MVP</span>
              <span className="proof__label">Radon Sentinel built in-house on ESP32-S3, from board to firmware.</span>
            </div>
            <div className="proof glass corners">
              <Corners />
              <span className="proof__value">
                <span className="placeholder">Metric</span>
              </span>
              <span className="proof__label">
                <Txt text={`${FOUNDER_INPUT}: a measurable client result, e.g. boards delivered or respins avoided.`} />
              </span>
            </div>
            <div className="proof glass corners">
              <Corners />
              <span className="proof__value">
                <span className="placeholder">Quote</span>
              </span>
              <span className="proof__label">
                <Txt text={`${FOUNDER_INPUT}: an approved client testimonial with name and role.`} />
              </span>
            </div>
          </div>
          <div className="btn-row" style={{ marginTop: 32 }} data-reveal>
            <Link href="/work" className="bracket">
              See all work
            </Link>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section" aria-labelledby="founder-title" style={{ paddingTop: 0 }}>
        <div className="container founder">
          <div className="founder__portrait glass corners" data-reveal>
            <Corners />
            <span className="mono" style={{ fontSize: "var(--step--1)" }}>
              <span className="placeholder">Founder photo</span>
            </span>
          </div>
          <div style={{ display: "grid", gap: 20 }}>
            <p className="eyebrow" data-reveal>
              The story
            </p>
            <Split id="founder-title" text="Making invisible problems visible." />
            <p className="lede" data-reveal>
              Risks like radon exposure are easy to ignore because nobody can see them. Making them visible takes
              reliable sensing hardware, and that is what we build, for ourselves and for our clients.
            </p>
            <p className="muted" data-reveal>
              <Txt text={founder.bio} />
            </p>
            <div data-reveal>
              <Link href="/about" className="bracket">
                About the company
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Faq items={homeFaqs} />
      <Cta />
    </Motion>
  );
}
