// Every piece of business copy lives here so the founder can edit facts in one place.
// Anything we could not verify is marked with FOUNDER_INPUT and rendered visibly on the page.

export const FOUNDER_INPUT = "[Founder input required]";

export const site = {
  name: "Structra Innovations",
  shortName: "Structra",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Connected hardware, from first schematic to field-ready product.",
  description:
    "Structra Innovations designs embedded electronics and builds connected products. Our first product, Radon Sentinel, monitors indoor radon and acts on it.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  location: FOUNDER_INPUT,
  social: [] as { label: string; href: string }[],
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  secondaryCta: { label: "Meet Radon Sentinel", href: "/products/radon-sentinel" },
};

export type Service = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  problem: string;
  outcome: string;
  deliverables: string[];
  approach: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "embedded-pcb-design",
    index: "01",
    title: "Embedded & PCB design",
    summary:
      "Schematics, layout and bring-up for ESP32-class boards that pass their first power-on, not their fourth.",
    problem:
      "Most hardware delays start on the board: a missed pull-up, a noisy antenna keep-out, a part that goes end-of-life mid-build. Each respin costs weeks and a fresh batch of boards.",
    outcome:
      "A board you can order with confidence: reviewed schematics, a layout built for your enclosure and certification path, and a bring-up report that proves every rail and peripheral works.",
    deliverables: [
      "Schematic capture with design-review notes",
      "Multi-layer PCB layout with RF and power-integrity checks",
      "Bill of materials with second-source parts flagged",
      "Fabrication and assembly files ready for your manufacturer",
      "Bring-up and test report for the first boards",
    ],
    approach: [
      {
        title: "Requirements before parts",
        body: "We pin down power budget, enclosure, radios and compliance targets before choosing a single component.",
      },
      {
        title: "Review at every gate",
        body: "Schematic, placement and routing each get a written review, so issues are caught on screen instead of on the bench.",
      },
      {
        title: "Bench-proven handover",
        body: "We power up the first boards ourselves and hand you measurements, not assumptions.",
      },
    ],
    faqs: [
      {
        q: "Which microcontrollers do you work with?",
        a: "Our current product runs on the ESP32-S3, and ESP32-family designs are our core. For other platforms, tell us what you need and we will say honestly whether it is a fit.",
      },
      {
        q: "Can you fix a board someone else designed?",
        a: "Yes. A design review of an existing board is often the fastest way to find why it misbehaves.",
      },
    ],
  },
  {
    slug: "iot-firmware",
    index: "02",
    title: "IoT firmware & connectivity",
    summary:
      "Firmware that reads sensors reliably, survives bad Wi-Fi, updates itself safely and reports what it sees.",
    problem:
      "A device that works on the desk can fail in a basement: dropped connections, drifting readings, a bricked unit after an update. Customers judge the product by those moments.",
    outcome:
      "Firmware with predictable behaviour in the field: sensor pipelines you can trust, connectivity that recovers on its own, and over-the-air updates that roll back if something goes wrong.",
    deliverables: [
      "Sensor drivers with calibration and filtering",
      "Wi-Fi and BLE provisioning flows",
      "Over-the-air updates with rollback",
      "Device-to-cloud messaging and alerting",
      "Logging that helps you debug units in the field",
    ],
    approach: [
      {
        title: "Field conditions first",
        body: "We design for weak signal, power cuts and sensor drift from day one, not as a patch after launch.",
      },
      {
        title: "Observable devices",
        body: "Every unit reports its health, so problems show up on a dashboard before they show up in a support ticket.",
      },
      {
        title: "Safe updates",
        body: "Updates are signed, staged and reversible. A bad release never strands a device.",
      },
    ],
    faqs: [
      {
        q: "Do you build the cloud side too?",
        a: "We build the device-to-cloud link, alerts and simple dashboards. For larger platforms we work alongside your software team.",
      },
      {
        q: "Can you take over existing firmware?",
        a: "Yes. We start with an audit so you know what is worth keeping before anything is rewritten.",
      },
    ],
  },
  {
    slug: "product-prototyping",
    index: "03",
    title: "Product prototyping",
    summary:
      "From idea to a working, testable unit in your hands, with a clear path to manufacture.",
    problem:
      "Founders often have the problem and the market but no hardware team. Hiring one takes months, and a prototype that cannot be manufactured has to be built twice.",
    outcome:
      "A functional prototype you can show investors and test with real users, built from parts and processes that scale to a production run.",
    deliverables: [
      "Feasibility study and component shortlist",
      "Working electronics and firmware prototype",
      "Enclosure concept matched to the board",
      "Cost-down and manufacturing notes",
      "Roadmap from prototype to pilot batch",
    ],
    approach: [
      {
        title: "Prove the risky part first",
        body: "We build the piece most likely to fail, usually the sensing, before polishing anything else.",
      },
      {
        title: "Built to be built again",
        body: "Prototype parts are chosen with production in mind, so the second version refines rather than restarts.",
      },
      {
        title: "Plain-language decisions",
        body: "You get trade-offs explained in cost, time and risk, so you can decide without a hardware background.",
      },
    ],
    faqs: [
      {
        q: "How long does a prototype take?",
        a: `It depends on how much is new. We scope it in the discovery call and give a fixed plan before work starts. ${FOUNDER_INPUT}: typical timeline.`,
      },
      {
        q: "Who owns the design?",
        a: `${FOUNDER_INPUT}: confirm IP ownership terms for client work.`,
      },
    ],
  },
];

export type Product = {
  slug: string;
  name: string;
  status: string;
  summary: string;
  problem: string;
  how: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  audience: string[];
  faqs: { q: string; a: string }[];
};

export const products: Product[] = [
  {
    slug: "radon-sentinel",
    name: "Radon Sentinel",
    status: "In development · MVP",
    summary:
      "A connected radon monitor that watches your indoor air around the clock and switches on HEPA filtration when levels rise.",
    problem:
      "Radon is an odourless, invisible radioactive gas that seeps into buildings from the ground. You cannot sense it, and a one-off test only tells you about the days it ran. Levels change with weather, season and ventilation.",
    how: [
      {
        title: "Measures continuously",
        body: "An ESP32-S3 controller samples the radon sensor through the day and night and builds a running average, so a single spike does not trigger a false alarm.",
      },
      {
        title: "Acts on its own",
        body: "When the average crosses your threshold, Sentinel switches on a connected HEPA filter to capture radon decay products carried on airborne particles.",
      },
      {
        title: "Tells you what to do next",
        body: "You get an alert and a clear history. If levels stay high, Sentinel tells you it is time to call a certified mitigation installer.",
      },
    ],
    specs: [
      { label: "Controller", value: "ESP32-S3" },
      { label: "Connectivity", value: "Wi-Fi" },
      { label: "Mitigation output", value: "HEPA filtration control" },
      { label: "Radon sensor", value: FOUNDER_INPUT },
      { label: "Measurement range & accuracy", value: FOUNDER_INPUT },
      { label: "Power", value: FOUNDER_INPUT },
      { label: "Certifications", value: FOUNDER_INPUT },
      { label: "Price & availability", value: FOUNDER_INPUT },
    ],
    audience: [
      "Homeowners in areas with known radon risk",
      "Landlords who need ongoing evidence for tenants",
      "Schools, offices and basements used as living space",
    ],
    faqs: [
      {
        q: "Does HEPA filtration remove radon gas?",
        a: "No, and we will not claim it does. HEPA filters capture radon decay products attached to dust and aerosols, which is where much of the lung dose comes from. Radon gas itself is removed by ventilation or a sub-slab mitigation system. Sentinel reduces exposure while you measure, and tells you when a mitigation system is needed.",
      },
      {
        q: "Does it replace a professional radon test?",
        a: "Sentinel gives you continuous readings. For legal or real-estate purposes, follow your local authority's testing protocol.",
      },
      {
        q: "When can I buy one?",
        a: "Radon Sentinel is in its MVP stage. Join the early-access list on the contact page and we will tell you first.",
      },
    ],
  },
];

// The wider STRUCTRA system family from the founder's earlier design work. Names are
// confirmed; descriptions and status still need the founder's input.
export const systemFamily = [
  { name: "Mesh Gateway", accent: "mesh", note: `${FOUNDER_INPUT}: one line on what it connects and for whom.` },
  { name: "Power Monitor", accent: "power", note: `${FOUNDER_INPUT}: one line on what it measures and why it matters.` },
  { name: "BLE Analyzer", accent: "ble", note: `${FOUNDER_INPUT}: one line on who uses it and what it reveals.` },
  { name: "Test Panel", accent: "test", note: `${FOUNDER_INPUT}: one line on what it tests and the time it saves.` },
];

export const workProcess = [
  {
    step: "01",
    title: "Discovery call",
    body: "Thirty minutes on the problem, the users and the constraints. You leave with an honest view of feasibility.",
  },
  {
    step: "02",
    title: "Scope & plan",
    body: "A written plan with milestones, deliverables and cost, so there are no surprises later.",
  },
  {
    step: "03",
    title: "Build & review",
    body: "Short cycles with working results you can see and test, and a review at every design gate.",
  },
  {
    step: "04",
    title: "Hand over",
    body: "Files, firmware, test reports and documentation. You own a product, not a dependency on us.",
  },
];

export const problems = [
  {
    problem: "Boards that need a second or third respin",
    outcome: "Reviewed designs that work at first power-on",
  },
  {
    problem: "Devices that drop offline in the field",
    outcome: "Firmware that recovers by itself and reports its health",
  },
  {
    problem: "Prototypes that cannot be manufactured",
    outcome: "Parts and processes chosen for production from day one",
  },
  {
    problem: "Invisible risks like radon going unmeasured",
    outcome: "Continuous sensing that acts and alerts automatically",
  },
];

export const homeFaqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Connected devices built around embedded electronics: sensing, control and IoT products, especially on the ESP32 family. If yours is outside that, we will tell you on the first call.",
  },
  {
    q: "Do you only build your own products?",
    a: "No. We run client projects alongside our own products. Building Radon Sentinel is how we keep our hardware and firmware skills honest.",
  },
  {
    q: "How is pricing structured?",
    a: `${FOUNDER_INPUT}: fixed-scope, milestone or retainer pricing.`,
  },
  {
    q: "Where are you based, and do you work remotely?",
    a: `${FOUNDER_INPUT}: location and remote-working policy.`,
  },
];

export const founder = {
  name: FOUNDER_INPUT,
  role: "Founder",
  bio: `${FOUNDER_INPUT}: two or three sentences on background, the hardware you have shipped, and why you started Structra.`,
};

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];
