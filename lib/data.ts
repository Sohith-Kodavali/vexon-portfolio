// ---------------------------------------------------------------------------
// Site content.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Vexon Solutions",
  role: "Design Studio",
  discipline: "Interfaces · Motion · WebGL",
  location: "India",
  timezone: "IST (UTC+5:30)",
  availability: "Two slots · next quarter",
  email: "support@vexonsol.com",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/company/vexonsolutions" },
    { label: "GitHub", href: "https://github.com/vexonsolutions" },
    { label: "X", href: "https://x.com/vexonsolutions" },
    { label: "Instagram", href: "https://instagram.com/vexonsolutions" }
  ]
} as const;

export const heroWords = ["Interfaces", "that", "feel", "alive"] as const;

export const manifesto =
  "We design and engineer interfaces where motion is the material. Not decoration — structure. The part that tells you where you are, what matters, and what happens next.";

export const tickerWords = [
  "Interface design",
  "Creative engineering",
  "Motion systems",
  "Real-time graphics",
  "Design systems",
  "Performance",
  "Art direction",
  "Interaction"
] as const;

export const stats = [
  { value: "40+", label: "Projects shipped" },
  { value: "12", label: "Industries" },
  { value: "6", label: "Countries served" }
] as const;

export type Project = {
  idx: string;
  slug: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  /** Case-study narrative, one string per paragraph. */
  story: readonly string[];
  scope: readonly string[];
  stack: readonly string[];
  outcome: string;
  image: string;
  url?: string;
  colors: { c1: [number, number, number]; c2: [number, number, number]; freq: number; warp: number };
};

// Project names are final. Each project has a case-study page at /work/<slug>;
// `url`, when present, is the live site linked from that page.
export const projects: Project[] = [
  {
    idx: "01",
    slug: "rrkfoods",
    name: "RRK Foods",
    category: "Restaurant · Brand + Site",
    year: "2025",
    summary:
      "A food court with a following, given a site that sells the food before you taste it — menu, ordering and a voice that carries the brand.",
    story: [
      "RRK Foods runs one of the busiest food courts in Eluru, and almost every customer meets it on a phone. The old site buried the menu behind three taps and a slow gallery; we rebuilt the front door so the food is the first thing you see — and the first thing you can order.",
      "We took the brand into a warmer register: a red that holds up on a screen, type that lets the dishes breathe, and a menu that reads in a single scroll. The ordering flow was rebuilt around one question — what do you feel like eating?",
      "It now does what a restaurant site should: it sells before you taste."
    ],
    scope: ["Art direction", "Website", "Ordering flow", "Copy"],
    stack: ["HTML5", "CSS3", "JavaScript"],
    outcome: "A one-page front door that turns a phone visit into an order.",
    image: "/work/rrkfoods.webp",
    url: "https://rrkfoods.in",
    colors: { c1: [0.96, 0.26, 0.15], c2: [0.1, 0.04, 0.03], freq: 2.2, warp: 1.6 }
  },
  {
    idx: "02",
    slug: "techyuva",
    name: "TechYuva",
    category: "Community · Events",
    year: "2025",
    summary:
      "A community hub built to fill rooms — events, workshops and a home for the people who actually show up.",
    story: [
      "TechYuva is a student community that lives or dies by turnout. Its events, workshops and people were scattered across posters and group chats, so we gave them one home where the next thing is always easy to find.",
      "Every event gets a page of its own, and the motion carries a little of the room's energy — quick, warm, slightly restless, never precious.",
      "The site now does the job the community always needed: it fills seats."
    ],
    scope: ["Website", "Event pages", "Motion"],
    stack: ["HTML5", "CSS3", "JavaScript"],
    outcome: "One home for events and workshops — and noticeably fuller rooms.",
    image: "/work/techyuva.webp",
    url: "https://techyuva.in",
    colors: { c1: [0.16, 0.8, 0.66], c2: [0.02, 0.1, 0.09], freq: 2.8, warp: 2.0 }
  },
  {
    idx: "03",
    slug: "zyppyn",
    name: "Zyppyn",
    category: "Product · Consumer",
    year: "2024",
    summary:
      "A pre-launch product story: premium display hardware introduced before anyone can buy it, with restraint instead of hype.",
    story: [
      "Zyppyn was introducing premium display hardware before anyone could buy it. The brief was restraint: no countdown, no borrowed drama — just the object, described properly.",
      "We built the story around the product itself: close, quiet imagery, a palette that stays out of the way, and type that lets the hardware set the tone.",
      "It reads like the thing it is selling — considered, unhurried, confident."
    ],
    scope: ["Creative direction", "Website", "Product narrative"],
    stack: ["HTML5", "CSS3", "JavaScript"],
    outcome: "A pre-launch story that feels like the product: restrained and confident.",
    image: "/work/zyppyn.webp",
    url: "https://zyppyn.com",
    colors: { c1: [0.48, 0.7, 0.96], c2: [0.03, 0.06, 0.11], freq: 2.4, warp: 1.6 }
  },
  {
    idx: "04",
    slug: "envirosys",
    name: "Envirosys",
    category: "Environment · Services",
    year: "2024",
    summary:
      "An environmental services company given a clearer, more credible front door — the work explained properly, for the people who commission it.",
    story: [
      "Envirosys does serious environmental work for clients who commission it, but its old site explained none of it clearly. We rebuilt the front door around credibility rather than decoration.",
      "The work is now laid out the way a buyer reads it — what they do, who it is for, and why it is safe to trust — with an information architecture that survives the jargon.",
      "The result is a site that does the explaining before the first meeting."
    ],
    scope: ["Website", "Information architecture", "Copy"],
    stack: ["HTML5", "CSS3", "JavaScript"],
    outcome: "A clearer, more credible front door for the people who commission the work.",
    image: "/work/envirosys.webp",
    colors: { c1: [0.4, 0.8, 0.36], c2: [0.03, 0.09, 0.05], freq: 2.1, warp: 1.7 }
  }
];

export const capabilities = [
  {
    idx: "01",
    title: "Interface Design",
    body: "Systems, not screens — typography, spacing and colour that hold together across every state.",
    tags: ["UI/UX", "Design systems", "Prototyping"]
  },
  {
    idx: "02",
    title: "Creative Engineering",
    body: "Production front-end where the details are the product — performance budgets and pixel discipline.",
    tags: ["Next.js", "TypeScript", "Accessibility"]
  },
  {
    idx: "03",
    title: "Motion & WebGL",
    body: "Shaders, simulations and choreography that give an interface weight, rhythm and memory.",
    tags: ["Three.js", "GLSL", "GSAP"]
  },
  {
    idx: "04",
    title: "Art Direction",
    body: "The point of view — what a brand looks like, sounds like and refuses to be.",
    tags: ["Identity", "Type", "Creative direction"]
  }
] as const;

export const processSteps = [
  { idx: "01", title: "Frame", body: "Understand the objective, the audience and what success actually measures." },
  { idx: "02", title: "Direction", body: "Establish a point of view — visual language, motion principles, structure." },
  { idx: "03", title: "Craft", body: "Design and engineer in the same loop. Details decide the outcome." },
  { idx: "04", title: "Ship", body: "Performance, accessibility, QA — then release with confidence and support." }
] as const;

export const testimonials = [
  {
    quote: "They understood the food before they understood the menu. Online orders picked up in the first month.",
    cite: "Ravi Teja",
    org: "RRK Foods"
  },
  {
    quote: "The site finally looks like the community it serves — fast, warm, and impossible to scroll past.",
    cite: "Sneha Reddy",
    org: "TechYuva"
  },
  {
    quote: "Restrained, and on time. They found the tone before we had the words for it.",
    cite: "Arjun Mehta",
    org: "Zyppyn"
  },
  {
    quote: "They explained our work better than we could. Clients now arrive already convinced.",
    cite: "Priya Nair",
    org: "Envirosys"
  }
] as const;

export const recognition = [
  "Awwwards — Site of the Day (placeholder)",
  "FWA — Site of the Day (placeholder)",
  "CSS Design Awards (placeholder)",
  "Webby Nominee (placeholder)"
] as const;

// "Process" is intentionally absent: the process now plays inside the pinned
// warp transition rather than living in its own section.
export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#capabilities" },
  { label: "Contact", href: "#contact" }
] as const;
