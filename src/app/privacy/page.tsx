import type { Metadata } from "next";
import { Motion } from "@/components/motion/Motion";
import { PageHero } from "@/components/ui/Blocks";
import { Txt } from "@/components/ui/Txt";
import { FOUNDER_INPUT, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects and uses personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Motion>
      <PageHero eyebrow="Legal" title="Privacy policy" crumbs={[{ label: "Privacy" }]} />
      <section className="section">
        <div className="container prose">
          <p>
            <Txt text={`Last updated: ${FOUNDER_INPUT}. This is a starting draft and should be reviewed by a qualified lawyer for your jurisdiction before launch.`} />
          </p>
          <h2>Who we are</h2>
          <p>
            <Txt text={`${site.name} (“we”, “us”) operates this website. Registered company details: ${FOUNDER_INPUT}.`} />
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>Information you send through the contact form: name, email, company and your message.</li>
            <li>Basic technical data your browser sends to any website, such as IP address and browser type, used to keep the site secure and working.</li>
          </ul>
          <p>This site does not use advertising or tracking cookies.</p>
          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and, if you ask, to tell you about Radon Sentinel availability or new articles.</li>
            <li>To protect the site against spam and abuse.</li>
          </ul>
          <p>We do not sell your personal information.</p>
          <h2>Who we share it with</h2>
          <p>
            <Txt text={`Service providers who host this website and process form submissions on our behalf: ${FOUNDER_INPUT}.`} />
          </p>
          <h2>How long we keep it</h2>
          <p>
            <Txt text={`Enquiries are kept for ${FOUNDER_INPUT} unless we start working together.`} />
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask us to access, correct or delete the personal information we hold about you, or to stop
            contacting you, at any time.
          </p>
          <h2>Contact</h2>
          <p>
            {site.email ? <>Email <a href={`mailto:${site.email}`}>{site.email}</a>.</> : <Txt text={`${FOUNDER_INPUT}: privacy contact email.`} />}
          </p>
        </div>
      </section>
    </Motion>
  );
}
