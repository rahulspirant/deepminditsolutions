/**
 * knowledgeBase.js
 * ------------------------------------------------------------------
 * Single source of truth for everything the DeepMind AI Assistant
 * knows about Deep Mind IT Solutions. Mirrors the real content that
 * lives across the marketing site (About, Services, Products,
 * Industries, Careers, Contact) so the assistant never invents facts.
 *
 * This file is pure data — no React, no side effects — so it can be
 * unit tested, reused by the response generator, and eventually
 * swapped for a CMS-backed fetch without touching the engine logic.
 * ------------------------------------------------------------------
 */

export const company = {
  name: "Deep Mind IT Solutions",
  shortName: "Deep Mind",
  tagline: "End-to-end IT infrastructure, security, and software — under one accountable partner.",
  founded: "18+ years of enterprise IT experience",
  mission:
    "Help businesses modernize, secure, and scale their technology environments through dependable infrastructure, cloud, security, and managed IT services.",
  vision:
    "Become a trusted long-term enterprise technology partner known for reliable execution, practical innovation, and scalable infrastructure thinking.",
  values: [
    "Reliability",
    "Security-first thinking",
    "Client partnership",
    "Practical execution",
    "Scalability mindset",
    "Unwavering support commitment",
  ],
  stats: [
    { label: "Years of experience", value: "18+" },
    { label: "Deployments delivered", value: "250+" },
    { label: "Clients supported", value: "100+" },
    { label: "Support readiness", value: "24/7" },
    { label: "Technology domains covered", value: "9+" },
  ],
  differentiators: [
    "Enterprise infrastructure expertise across networking, servers, cloud, and security — not a single-vendor specialty.",
    "Vendor-neutral recommendations designed around what fits your environment, not what's easiest to sell.",
    "In-house deployment and integration teams, without subcontracting the hard parts.",
    "Defined support response windows and a team that actually picks up the phone.",
    "Security-first approach — every infrastructure decision is evaluated for security before cost.",
    "One partner across networking, surveillance, AV, power, and software instead of five separate vendors.",
  ],
};

export const contact = {
  address:
    "2/29, 1st Floor, near Hanuman Mandir, Vaibhav Khand, Gomti Nagar, Lucknow, Uttar Pradesh, India",
  salesPhone: "+91 95697 75104",
  supportPhone: "+91 63943 33608",
  email: "sales@deepminditsolutions.com",
  hours: "Mon–Sat, 9:30 AM–6:30 PM IST",
  contactPageUrl: "/contact",
};

export const careers = {
  cultureUrl: "/careers",
  highlights: [
    "High-impact work on real enterprise deployments from day one.",
    "Mentorship-led growth from senior engineers and architects.",
    "Balanced ownership — you own outcomes, not just tickets.",
    "Fast-moving culture without enterprise bureaucracy.",
  ],
  openRoles: [
    { title: "Lead Network Engineer", type: "Full-time", location: "Mumbai" },
    { title: "Cloud Infrastructure Specialist", type: "Full-time", location: "Remote" },
    { title: "Cyber Security Consultant", type: "Full-time", location: "Bengaluru" },
    { title: "Project Delivery Manager", type: "Full-time", location: "Pune" },
  ],
};

/**
 * Core services — matches ServicesSection.jsx content 1:1.
 * `keywords` are used by the NLU layer for intent/entity matching.
 */
export const services = [
  {
    id: "network-infrastructure",
    title: "Network Infrastructure",
    url: "/services/network-infrastructure",
    description:
      "Structured cabling, switching, routing and Wi-Fi designed for dependable, low-latency connectivity.",
    highlights: ["Structured switching & routing", "Enterprise Wi-Fi rollout", "Branch & multi-site connectivity"],
    keywords: ["network", "networking", "lan", "wan", "wifi", "wi-fi", "cabling", "switch", "router", "connectivity", "structured cabling"],
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    url: "/services/cloud-solutions",
    description:
      "Migration and hybrid cloud architecture that scales with demand while keeping costs predictable.",
    highlights: ["Cloud migration & modernization", "Hybrid & multi-cloud setup", "Automated backup & scaling"],
    keywords: ["cloud", "migration", "aws", "azure", "hybrid cloud", "multi-cloud", "backup", "cloud computing"],
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    url: "/services/cyber-security",
    description:
      "Firewall deployment and endpoint protection built around continuous threat monitoring.",
    highlights: ["Firewall & endpoint protection", "Access control & identity policy", "24/7 threat monitoring"],
    keywords: ["security", "cyber security", "cybersecurity", "firewall", "endpoint", "threat", "hacking", "ransomware", "antivirus", "vulnerability"],
  },
  {
    id: "data-center",
    title: "Data Center Solutions",
    url: "/services/data-center",
    description:
      "Server, storage and virtualization infrastructure engineered for density and uptime.",
    highlights: ["Server & storage deployment", "Virtualization architecture", "Rack & capacity planning"],
    keywords: ["data center", "datacenter", "server room", "virtualization", "rack", "uptime", "colocation"],
  },
  {
    id: "managed-it",
    title: "Managed IT Services",
    url: "/services/managed-it",
    description:
      "AMC-backed monitoring and support that keeps infrastructure healthy without the overhead.",
    highlights: ["AMC & preventive maintenance", "Proactive infrastructure monitoring", "Rapid issue troubleshooting"],
    keywords: ["managed it", "amc", "annual maintenance", "support", "maintenance", "monitoring", "helpdesk", "it support"],
  },
  {
    id: "software-development",
    title: "Software & App Development",
    url: "/services/software-development",
    description:
      "Business applications and dashboards that automate workflow and surface real operational data.",
    highlights: ["Business apps & portals", "Custom dashboards", "Workflow automation"],
    keywords: ["software", "app development", "application", "custom software", "dashboard", "portal", "automation", "website", "web app"],
  },
];

/**
 * Product categories — matches ProductCategoriesSection.jsx content 1:1.
 */
export const products = [
  {
    id: "server-storage",
    title: "Server & Storage",
    url: "/products/server-storage",
    description: "Enterprise servers and storage built for virtualization-ready workloads.",
    bullets: ["Rack & tower servers", "SAN / NAS storage", "Virtualization-ready"],
    keywords: ["server", "servers", "dell server", "hp server", "storage", "san", "nas", "rack server", "tower server"],
  },
  {
    id: "switches-router-wifi",
    title: "Switches / Router / Wi-Fi",
    url: "/products/switches-router-wifi",
    description: "Managed switching, routing and wireless access for every site.",
    bullets: ["Managed L2/L3 switching", "Enterprise routing", "High-density Wi-Fi"],
    keywords: ["switch", "switches", "router", "routers", "wifi", "wi-fi", "access point", "wireless"],
  },
  {
    id: "passive-items",
    title: "Passive Items",
    url: "/products/passive-items",
    description: "Structured cabling and rack infrastructure for resilient networks.",
    bullets: ["Structured cabling", "Fiber & copper", "Racks & enclosures"],
    keywords: ["cabling", "cables", "patch panel", "fiber", "copper", "rack enclosure", "passive items"],
  },
  {
    id: "firewall",
    title: "Firewall",
    url: "/products/firewall",
    description: "Perimeter security with policy-driven, secure network access.",
    bullets: ["Perimeter security", "Policy & access control", "Secure remote access"],
    keywords: ["firewall", "utm", "fortinet", "sophos", "sonicwall", "perimeter security", "vpn"],
  },
  {
    id: "leds-interactive-panels",
    title: "LEDs & Interactive Panels",
    url: "/products/leds-interactive-panels",
    description: "Display and collaboration panels for classrooms and boardrooms.",
    bullets: ["Interactive classrooms", "Boardroom displays", "Collaboration panels"],
    keywords: ["led", "interactive panel", "smart board", "smart class", "display panel", "digital board"],
  },
  {
    id: "av-kvm",
    title: "AV Solutions & KVM",
    url: "/products/av-kvm",
    description: "Conferencing and display switching for control room environments.",
    bullets: ["Video conferencing", "Display switching", "KVM control rooms"],
    keywords: ["av", "audio visual", "kvm", "video conferencing", "conference room", "control room"],
  },
  {
    id: "projectors",
    title: "Projectors",
    url: "/products/projectors",
    description: "Reliable projection for classrooms, meeting rooms and auditoriums.",
    bullets: ["Classroom projection", "Meeting room setups", "Auditorium-grade units"],
    keywords: ["projector", "projectors", "projection"],
  },
  {
    id: "ups-power",
    title: "UPS Power",
    url: "/products/ups-power",
    description: "Backup continuity and online UPS for critical power protection.",
    bullets: ["Online UPS systems", "Backup continuity", "Critical power protection"],
    keywords: ["ups", "power backup", "battery backup", "online ups", "inverter"],
  },
  {
    id: "cctv-surveillance",
    title: "CCTV Surveillance",
    url: "/products/cctv-surveillance",
    description: "IP camera and recording systems for full-site monitoring visibility.",
    bullets: ["IP camera networks", "NVR / DVR systems", "Remote monitoring"],
    keywords: ["cctv", "camera", "cameras", "surveillance", "nvr", "dvr", "ip camera", "security camera"],
  },
];

/**
 * Industries served — matches IndustriesSection.jsx content 1:1.
 */
export const industries = [
  { id: "corporate", title: "Corporate Offices", text: "Reliable connectivity and security for multi-floor, multi-site teams.", keywords: ["office", "corporate", "workplace", "company"] },
  { id: "education", title: "Education", text: "Campus-wide Wi-Fi and interactive classrooms that scale with enrollment.", keywords: ["school", "college", "university", "education", "campus", "classroom"] },
  { id: "healthcare", title: "Healthcare", text: "Always-on infrastructure for critical systems and patient data security.", keywords: ["hospital", "clinic", "healthcare", "medical"] },
  { id: "manufacturing", title: "Manufacturing", text: "Rugged networking and surveillance across plant floors and warehouses.", keywords: ["factory", "manufacturing", "plant", "warehouse", "industrial"] },
  { id: "government", title: "Government", text: "Secure, compliant infrastructure for public-sector service delivery.", keywords: ["government", "public sector", "municipal"] },
  { id: "retail", title: "Retail", text: "Connected stores with surveillance, Wi-Fi, and centralized monitoring.", keywords: ["retail", "store", "shop", "showroom"] },
  { id: "bfsi", title: "BFSI", text: "High-security networks and uptime for financial transaction systems.", keywords: ["bank", "banking", "finance", "bfsi", "insurance", "nbfc"] },
  { id: "hospitality", title: "Hospitality", text: "Seamless guest connectivity backed by secure back-of-house systems.", keywords: ["hotel", "hospitality", "restaurant", "resort"] },
];

/**
 * Recommendation rules used by recommendationEngine.js.
 * Each rule maps a detected business profile to a curated bundle of
 * services + products, exactly matching the brief's requirements.
 */
export const recommendationRules = [
  {
    id: "sized-business",
    match: { type: "employeeCount", min: 1 },
    label: (n) => `a growing team of about ${n} people`,
    recommend: ["Networking", "Firewall", "Server", "Wi-Fi", "Backup", "CCTV", "Managed IT"],
  },
  {
    id: "school",
    match: { type: "keyword", keywords: ["school", "college", "university", "education", "campus"] },
    label: () => "an education campus",
    recommend: ["Smart Class / Interactive Panels", "Projectors", "Networking", "Firewall", "CCTV"],
  },
  {
    id: "hospital",
    match: { type: "keyword", keywords: ["hospital", "clinic", "healthcare", "medical"] },
    label: () => "a healthcare facility",
    recommend: ["Security / CCTV", "UPS Power", "Storage", "Wi-Fi", "Data Center"],
  },
  {
    id: "office",
    match: { type: "keyword", keywords: ["office", "corporate", "workplace", "company", "startup", "business"] },
    label: () => "an office environment",
    recommend: ["Cloud Solutions", "Network Infrastructure", "Firewall", "AV Solutions", "Meeting Room Setup"],
  },
  {
    id: "retail",
    match: { type: "keyword", keywords: ["retail", "store", "shop", "showroom"] },
    label: () => "a retail environment",
    recommend: ["CCTV Surveillance", "Wi-Fi", "Networking", "Firewall", "Managed IT"],
  },
  {
    id: "manufacturing",
    match: { type: "keyword", keywords: ["factory", "manufacturing", "plant", "warehouse", "industrial"] },
    label: () => "a manufacturing / industrial site",
    recommend: ["Rugged Networking", "CCTV Surveillance", "UPS Power", "Server & Storage", "Managed IT"],
  },
];

/** Quick-fire suggested prompts shown to the user in the widget. */
export const suggestedQuestions = [
  "Which service is best for my business?",
  "Do you provide CCTV installation?",
  "I need cloud migration",
  "What firewall should I buy?",
  "Tell me about your company",
  "I want to schedule a meeting",
];

/** Keywords that signal the user wants to be contacted / has buying intent. */
export const buyingIntentKeywords = [
  "buy", "purchase", "quote", "quotation", "price", "pricing", "cost", "budget",
  "interested", "install", "installation", "need a", "want a", "get a quote",
  "schedule", "meeting", "call me", "contact me", "demo", "proposal", "order",
];

export default {
  company,
  contact,
  careers,
  services,
  products,
  industries,
  recommendationRules,
  suggestedQuestions,
  buyingIntentKeywords,
};
