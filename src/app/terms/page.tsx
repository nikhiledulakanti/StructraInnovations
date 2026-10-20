import type { Metadata } from "next";
import { Motion } from "@/components/motion/Motion";
import { PageHero } from "@/components/ui/Blocks";
import { Txt } from "@/components/ui/Txt";
import { FOUNDER_INPUT, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `Terms for using the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Motion>
      <PageHero eyebrow="Legal" title="Terms of use" crumbs={[{ label: "Terms" }]} />
      <section className="section">
        <div className="container prose">
          <p>
            <Txt text={`Last updated: ${FOUNDER_INPUT}. This is a starting draft and should be reviewed by a qualified lawyer before launch.`} />
          </p>
          <h2>Using this website</h2>
          <p>
            This website describes the services and products of {site.name}. You may use it for your own information.
            Please do not attempt to disrupt it, scrape it at scale or misuse the contact form.
          </p>
          <h2>Information on this site</h2>
          <p>
            We aim to keep content accurate, but it is general information and not professional advice. Radon Sentinel
            is in development, and its specifications and availability may change. For radon testing and mitigation
            decisions, follow your local health authority&apos;s guidance.
          </p>
          <h2>Client work</h2>
          <p>Project engagements are governed by a separate written agreement, which takes precedence over these terms.</p>
          <h2>Intellectual property</h2>
          <p>The text, graphics and code of this website belong to {site.name} unless stated otherwise.</p>
          <h2>Liability</h2>
          <p>
            <Txt text={`${FOUNDER_INPUT}: limitation-of-liability wording appropriate for your jurisdiction.`} />
          </p>
          <h2>Governing law</h2>
          <p>
            <Txt text={`These terms are governed by the laws of ${FOUNDER_INPUT}.`} />
          </p>
        </div>
      </section>
    </Motion>
  );
}
