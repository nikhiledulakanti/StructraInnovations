import Link from "next/link";
import { products, services, site } from "@/content/site";
import { Logo } from "@/components/ui/Arrow";
import { Txt } from "@/components/ui/Txt";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <Link href="/" className="logo">
              <Logo />
              <span>{site.name}</span>
            </Link>
            <p className="muted" style={{ maxWidth: "36ch" }}>
              {site.tagline}
            </p>
            <Link href="/contact" className="btn btn--ghost" style={{ width: "fit-content" }}>
              {site.primaryCta.label}
            </Link>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/insights">Insights</Link></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                {site.email ? (
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                ) : (
                  <Link href="/contact">Send a message</Link>
                )}
              </li>
              <li className="muted" style={{ paddingBlock: 8 }}>
                <Txt text={site.location} />
              </li>
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="footer-word" aria-hidden="true">
          Structra
        </p>
        <div className="footer-bottom">
          <span>© {site.name}</span>
          <span style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
