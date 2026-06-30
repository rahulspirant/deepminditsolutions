import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  MessageCircle,
  Building2,
  GraduationCap,
  Store,
  Camera,
  Cloud,
  ShieldCheck,
  ClipboardList,
  Compass,
  Hammer,
  PlugZap,
  LifeBuoy,
  Layers,
  Boxes,
  Headset,
  Gauge,
  Lock,
  Network,
  Server,
  BatteryCharging,
  MonitorSmartphone,
  Wifi,
  Image as ImageIcon,
} from "lucide-react";
import "./ClientsPage.css";
import {
  GlowingMesh,
  FloatingOrbs,
  TechGridParticles,
  CircuitBoard,
  NetworkParticles,
} from "../backgrounds/backgrounds";

/** Drop any canvas background behind a section with one line */
function BgLayer({ children }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/**
 * ClientsPage
 * Single-file Clients & Trust page for Deep Mind IT Solutions.
 *
 * Content rule honored throughout this file:
 * - No fabricated client names, brand logos, or specific partner names appear
 *   anywhere below. Every "logo" or "partner" slot is an explicit, labeled
 *   placeholder structure (e.g. "Client Logo — Placeholder") intended to be
 *   swapped for real assets later. Sector lines and engagement snapshots are
 *   generic and anonymized, not claims about specific organizations.
 */

/* ====================================================================== */
/* DATA                                                                    */
/* ====================================================================== */

const sectorsServed = [
  { label: "Enterprise Offices", Icon: Building2 },
  { label: "Education Environments", Icon: GraduationCap },
  { label: "Retail & Branch Networks", Icon: Store },
  { label: "Surveillance & Infrastructure Projects", Icon: Camera },
  { label: "Cloud & Security Deployments", Icon: Cloud },
];

// Placeholder client logo slots — intentionally generic. Swap each
// `placeholderLabel` and add a real `logoSrc` once client logos are
// approved for display.
const clientLogoPlaceholders = Array.from({ length: 10 }, (_, i) => ({
  id: `client-slot-${i + 1}`,
  placeholderLabel: i % 3 === 0 ? "Enterprise Client" : "Client Logo",
}));

const engagementSteps = [
  {
    title: "Consult",
    description:
      "We start by understanding your environment, constraints, and business priorities before proposing anything.",
    Icon: Compass,
  },
  {
    title: "Recommend",
    description:
      "We put forward infrastructure recommendations sized to your actual scale, risk profile, and budget.",
    Icon: ClipboardList,
  },
  {
    title: "Deploy",
    description:
      "Our teams handle procurement, sequencing, and installation with minimal disruption to daily operations.",
    Icon: Hammer,
  },
  {
    title: "Integrate",
    description:
      "Systems are connected, configured, and tested together, not delivered as disconnected pieces.",
    Icon: PlugZap,
  },
  {
    title: "Support",
    description:
      "We stay engaged after go-live with monitoring, maintenance, and a team that already knows your setup.",
    Icon: LifeBuoy,
  },
];

const trustCards = [
  {
    title: "Deployment Planning Mindset",
    description:
      "Every rollout is sequenced and scoped before a single device ships, so installation doesn't disrupt operations.",
    Icon: ClipboardList,
  },
  {
    title: "Multi-Domain Capability",
    description:
      "Networking, cloud, security, surveillance, AV, and power handled by one team, not five disconnected vendors.",
    Icon: Boxes,
  },
  {
    title: "Responsive Support",
    description:
      "Defined response windows and a support team that's reachable when something needs attention.",
    Icon: Headset,
  },
  {
    title: "Solution-Fit Recommendations",
    description:
      "We size infrastructure to your actual environment, not the easiest package to sell.",
    Icon: Gauge,
  },
  {
    title: "Long-Term Infrastructure Thinking",
    description:
      "Designs built to absorb growth and new sites, so you re-architect less often as you scale.",
    Icon: Layers,
  },
  {
    title: "Security-Aware Execution",
    description:
      "Every deployment decision is evaluated through a security lens before it's evaluated for convenience.",
    Icon: Lock,
  },
];

// Placeholder technology / OEM partner categories — no specific vendor
// names are claimed. Replace each `placeholderLabel` with an authorized
// partner name and logo once a formal partnership is confirmed.
const partnerCategories = [
  { category: "Networking Partner", Icon: Network },
  { category: "Security Partner", Icon: ShieldCheck },
  { category: "Server Partner", Icon: Server },
  { category: "Surveillance Partner", Icon: Camera },
  { category: "Power Backup Partner", Icon: BatteryCharging },
  { category: "Collaboration / AV Partner", Icon: MonitorSmartphone },
];

// Anonymized, generic engagement snapshots — illustrative of project types,
// not references to specific named clients.
const engagementSnapshots = [
  {
    title: "Corporate Office Network Rollout",
    description:
      "Structured switching, routing, and Wi-Fi redesigned for a multi-floor corporate office, improving reliability and centralized control.",
    Icon: Building2,
  },
  {
    title: "Educational Campus Surveillance Deployment",
    description:
      "Full-campus IP camera coverage with centralized NVR storage and remote monitoring access for facilities staff.",
    Icon: GraduationCap,
  },
  {
    title: "Branch Connectivity Upgrade",
    description:
      "Standardized networking hardware and managed Wi-Fi rolled out across multiple branch locations for consistent performance.",
    Icon: Wifi,
  },
  {
    title: "Meeting Room AV Implementation",
    description:
      "Interactive panels, conferencing AV, and centralized control deployed across boardrooms and collaboration spaces.",
    Icon: MonitorSmartphone,
  },
  {
    title: "UPS-Backed Critical Equipment Support",
    description:
      "Power continuity planning and UPS deployment to protect critical networking and security equipment during outages.",
    Icon: BatteryCharging,
  },
];

/* ====================================================================== */
/* MOTION VARIANTS                                                        */
/* ====================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardRise = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ====================================================================== */
/* SMALL INLINE HELPERS                                                   */
/* ====================================================================== */

function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <motion.div
      className={`dm-clients-section-head dm-align-${align}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {eyebrow && (
        <motion.span className="dm-clients-eyebrow" variants={fadeUp}>
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 className="dm-clients-title" variants={fadeUp}>
        {title}
      </motion.h2>
      {description && (
        <motion.p className="dm-clients-desc" variants={fadeUp}>
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ====================================================================== */
/* PAGE                                                                    */
/* ====================================================================== */

export default function ClientsPage() {
  return (
    <main className="dm-clients dm-page-shell">
      {/* ============================ HERO ============================ */}
      <section
        className="dm-clients-hero"
        aria-labelledby="clients-hero-heading"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        >
          <GlowingMesh />
        </div>

        <div className="dm-clients-hero-bg" aria-hidden="true">
          <div className="dm-grid-bg" />
          <div className="dm-spotlight-bg" />
        </div>

        <motion.div
          className="dm-clients-container dm-clients-hero-content"
          style={{ position: "relative", zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="dm-clients-eyebrow" variants={fadeUp}>
            Clients &amp; Trust
          </motion.span>
          <motion.h1 id="clients-hero-heading" className="dm-hero-heading" variants={fadeUp}>
            Trusted by Organizations Looking for Reliable IT Infrastructure Execution
          </motion.h1>
          <motion.p className="dm-hero-paragraph" variants={fadeUp}>
            Businesses don&rsquo;t choose a technology partner for a single project.
            They choose one they can rely on for delivery confidence, practical
            execution, and support that doesn&rsquo;t disappear after go-live. That&rsquo;s
            the relationship Deep Mind IT Solutions builds with every organization we
            work with.
          </motion.p>
          <motion.div className="dm-cta-row" variants={fadeUp}>
            <a href="#contact" className="dm-btn dm-btn-primary">
              <PhoneCall size={16} strokeWidth={1.8} />
              <span>Talk to Our Team</span>
              <span className="dm-btn-sweep" aria-hidden="true" />
            </a>
            <a href="#solutions" className="dm-btn dm-btn-ghost">
              <span>Explore Solutions</span>
              <ArrowRight size={16} strokeWidth={1.8} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== CLIENT LOGO WALL SECTION ===================== */}
      <section className="dm-clients-section" aria-labelledby="logos-heading" style={{ position: "relative", overflow: "hidden" }}>
        <BgLayer><FloatingOrbs /></BgLayer>
        <div className="dm-clients-container" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeading
            eyebrow="Who We Work With"
            title="Built for Organizations Across Industries"
            description="Client logos are added here with permission as engagements are completed. This space is structured to hold real client branding."
          />

          <motion.div
            className="dm-logo-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {clientLogoPlaceholders.map(({ id, placeholderLabel }) => (
              <motion.div key={id} className="dm-logo-card" variants={cardRise}>
                <ImageIcon size={22} strokeWidth={1.5} className="dm-logo-card-icon" />
                <span className="dm-logo-card-label">{placeholderLabel}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="dm-sector-row"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {sectorsServed.map(({ label, Icon }) => (
              <motion.div key={label} className="dm-sector-chip" variants={cardRise}>
                <Icon size={16} strokeWidth={1.8} />
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== HOW WE ENGAGE WITH CLIENTS ===================== */}
      <section className="dm-clients-section dm-section-alt" aria-labelledby="engage-heading" style={{ position: "relative", overflow: "hidden" }}>
        <BgLayer><TechGridParticles /></BgLayer>
        <div className="dm-clients-container" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeading
            eyebrow="Our Relationship Flow"
            title="How We Engage with Clients"
          />
          <motion.ol
            className="dm-engage-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {engagementSteps.map(({ title, description, Icon }, index) => (
              <motion.li key={title} className="dm-engage-step" variants={cardRise}>
                <span className="dm-engage-beam" aria-hidden="true" />
                <span className="dm-engage-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="dm-card-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h3 className="dm-engage-title">{title}</h3>
                <p className="dm-engage-desc">{description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ===================== PROJECT TRUST / DELIVERY STRENGTH ===================== */}
      <section className="dm-clients-section" aria-labelledby="trust-heading" id="solutions" style={{ position: "relative", overflow: "hidden" }}>
        <BgLayer><GlowingMesh /></BgLayer>
        <div className="dm-clients-container" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeading
            eyebrow="Delivery Strength"
            title="What Clients Can Count On"
          />
          <motion.div
            className="dm-trust-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {trustCards.map(({ title, description, Icon }) => (
              <motion.div key={title} className="dm-trust-card" variants={cardRise}>
                <span className="dm-card-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h3 className="dm-trust-title">{title}</h3>
                <p className="dm-trust-desc">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== PARTNER PLACEHOLDER SECTION ===================== */}
      <section className="dm-clients-section dm-section-alt" aria-labelledby="partners-heading">
        <div className="dm-clients-container">
          <SectionHeading
            eyebrow="Technology Alliances"
            title="Solution &amp; OEM Partner Categories"
            description="Specific partner names and logos are added here once formal partnerships are confirmed and authorized for display. These categories represent the technology domains we work across."
          />
          <motion.div
            className="dm-partner-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {partnerCategories.map(({ category, Icon }) => (
              <motion.div key={category} className="dm-partner-card" variants={cardRise}>
                <span className="dm-partner-icon">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className="dm-partner-category">{category}</span>
                <span className="dm-partner-placeholder-tag">Logo Placeholder</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== ENGAGEMENT SNAPSHOTS ===================== */}
      <section className="dm-clients-section" aria-labelledby="snapshots-heading" style={{ position: "relative", overflow: "hidden" }}>
        <BgLayer><CircuitBoard /></BgLayer>
        <div className="dm-clients-container" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeading
            eyebrow="Representative Work"
            title="Engagement Snapshots"
            description="Generic, anonymized examples of the kind of work we deliver — not specific named client references."
          />
          <motion.div
            className="dm-snapshot-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {engagementSnapshots.map(({ title, description, Icon }) => (
              <motion.div key={title} className="dm-snapshot-card" variants={cardRise}>
                <span className="dm-snapshot-beam" aria-hidden="true" />
                <span className="dm-card-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h3 className="dm-snapshot-title">{title}</h3>
                <p className="dm-snapshot-desc">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================ CLOSING CTA =========================== */}
      <section className="dm-clients-cta" aria-labelledby="clients-cta-heading" id="contact">
        <BgLayer><NetworkParticles /></BgLayer>
        <div className="dm-clients-cta-bg" aria-hidden="true">
          <div className="dm-grid-bg" />
          <div className="dm-spotlight-bg" />
        </div>
        <motion.div
          className="dm-clients-container dm-clients-cta-content"
          style={{ position: "relative", zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2 id="clients-cta-heading" className="dm-clients-cta-heading" variants={fadeUp}>
            Looking for a Technology Partner You Can Rely On Beyond Deployment?
          </motion.h2>
          <motion.p className="dm-clients-cta-paragraph" variants={fadeUp}>
            Let&rsquo;s start a conversation about your IT infrastructure, cloud,
            security, surveillance, AV, or ongoing support needs &mdash; and what a
            long-term technology partnership with Deep Mind IT Solutions could look
            like.
          </motion.p>
          <motion.div className="dm-cta-row" variants={fadeUp}>
            <a href="#start" className="dm-btn dm-btn-primary">
              <MessageCircle size={16} strokeWidth={1.8} />
              <span>Start a Conversation</span>
              <span className="dm-btn-sweep" aria-hidden="true" />
            </a>
            <a href="#team" className="dm-btn dm-btn-ghost">
              <span>Contact Our Team</span>
              <ArrowRight size={16} strokeWidth={1.8} />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}