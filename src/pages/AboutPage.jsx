import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Network,
  Cloud,
  ShieldCheck,
  Server,
  Headset,
  Code2,
  Camera,
  MonitorSmartphone,
  BatteryCharging,
  Building2,
  Handshake,
  Layers,
  LifeBuoy,
  Gauge,
  Award,
  Users,
  Clock,
  Globe2,
  Wrench,
  Lock,
  TrendingUp,
  Boxes,
  ClipboardList,
  Compass,
  PackageSearch,
  Hammer,
  ClipboardCheck,
  RefreshCw,
  CalendarCheck,
  PhoneCall,
} from "lucide-react";
import "./AboutPage.css";
import {
  NetworkParticles,
  TechGridParticles,
  FloatingOrbs,
  CircuitBoard,
  GlowingMesh,
} from "../backgrounds/backgrounds";

/* ====================================================================== */
/* DATA                                                                    */
/* ====================================================================== */

const storyCards = [
  {
    title: "Business-First Approach",
    description:
      "Every recommendation starts with your operations, budget, and growth plans, not a product catalog.",
    Icon: Building2,
  },
  {
    title: "Reliable Deployment",
    description:
      "Structured rollouts with clear timelines, so infrastructure goes live without disrupting daily work.",
    Icon: ClipboardCheck,
  },
  {
    title: "Long-Term Support",
    description:
      "We stay engaged after go-live, with monitoring, maintenance, and a team that already knows your environment.",
    Icon: LifeBuoy,
  },
  {
    title: "Scalable Infrastructure Mindset",
    description:
      "Every design accounts for tomorrow's load, not just today's requirement, so you re-architect less often.",
    Icon: Layers,
  },
];

const pillars = [
  {
    title: "Mission",
    description:
      "Help businesses modernize, secure, and scale their technology environments through dependable infrastructure, cloud, security, and managed IT services.",
    Icon: Compass,
  },
  {
    title: "Vision",
    description:
      "Become a trusted long-term enterprise technology partner known for reliable execution, practical innovation, and scalable infrastructure thinking.",
    Icon: Globe2,
  },
  {
    title: "Core Values",
    description:
      "Reliability, security-first thinking, client partnership, practical execution, scalability mindset, and an unwavering support commitment.",
    Icon: Handshake,
  },
];

const proofCards = [
  {
    title: "Enterprise Infrastructure Expertise",
    description:
      "Deep working knowledge across networking, servers, cloud, and security, not a single-vendor specialty.",
    Icon: Network,
  },
  {
    title: "Vendor-Neutral Recommendations",
    description:
      "We design around what fits your environment best, not what's easiest for us to sell.",
    Icon: Compass,
  },
  {
    title: "Deployment & Integration Capability",
    description:
      "In-house teams that plan, install, and integrate systems end-to-end, without subcontracting the hard parts.",
    Icon: Wrench,
  },
  {
    title: "Support Responsiveness",
    description:
      "Defined response windows and a team that picks up the phone when something needs attention.",
    Icon: Headset,
  },
  {
    title: "Security-First Approach",
    description:
      "Every infrastructure decision is evaluated through a security lens before it's evaluated for cost.",
    Icon: Lock,
  },
  {
    title: "Scalable Long-Term Thinking",
    description:
      "Designs built to absorb growth, new sites, and added headcount without a forced overhaul.",
    Icon: TrendingUp,
  },
  {
    title: "Cross-Domain Technology Capability",
    description:
      "One partner across networking, surveillance, AV, power, and software, instead of five separate vendors.",
    Icon: Boxes,
  },
  {
    title: "Business-Focused Implementation",
    description:
      "Technical decisions translated into plain operational outcomes your business actually cares about.",
    Icon: Gauge,
  },
];

const stats = [
  { label: "Years of Experience", value: 18, suffix: "+", Icon: Award },
  { label: "Deployments Delivered", value: 250, suffix: "+", Icon: ClipboardList },
  { label: "Clients Supported", value: 100, suffix: "+", Icon: Users },
  { label: "Support Readiness", value: 24, suffix: "/7", Icon: Clock },
  { label: "Technology Domains Covered", value: 9, suffix: "+", Icon: Layers },
];

const capabilities = [
  {
    title: "Networking",
    description: "Structured switching, routing, and enterprise Wi-Fi for every site.",
    bullets: ["Core & access switching", "Site-to-site routing", "Managed enterprise Wi-Fi"],
    Icon: Network,
  },
  {
    title: "Cloud",
    description: "Migration, hybrid deployment, and scalable cloud architecture.",
    bullets: ["Hybrid cloud design", "Backup & disaster recovery", "Workload migration"],
    Icon: Cloud,
  },
  {
    title: "Security",
    description: "Firewall, endpoint protection, and layered risk reduction.",
    bullets: ["Next-gen firewalls", "Endpoint protection", "Access & policy control"],
    Icon: ShieldCheck,
  },
  {
    title: "Data Center",
    description: "Server rooms, racks, cooling, and resilient power design.",
    bullets: ["Rack & server rooms", "Cooling & layout planning", "Resilient power design"],
    Icon: Server,
  },
  {
    title: "Managed IT",
    description: "Proactive monitoring, helpdesk, and infrastructure upkeep.",
    bullets: ["24/7 monitoring", "Helpdesk support", "Patch & maintenance cycles"],
    Icon: Headset,
  },
  {
    title: "Software Solutions",
    description: "Custom business applications and systems integration.",
    bullets: ["Custom applications", "Systems integration", "Workflow automation"],
    Icon: Code2,
  },
  {
    title: "Surveillance",
    description: "IP cameras, NVRs, and complete site coverage.",
    bullets: ["IP camera deployment", "NVR & storage sizing", "Remote monitoring access"],
    Icon: Camera,
  },
  {
    title: "AV & Display",
    description: "Meeting room, signage, and large-venue display systems.",
    bullets: ["Interactive panels", "Boardroom AV", "Digital signage"],
    Icon: MonitorSmartphone,
  },
  {
    title: "UPS / Power Continuity",
    description: "Battery backup and power resilience for critical systems.",
    bullets: ["UPS sizing & install", "Generator integration", "Power continuity planning"],
    Icon: BatteryCharging,
  },
];

const processSteps = [
  {
    title: "Discovery & Requirement Mapping",
    description: "We assess your current environment, constraints, and business goals.",
    Icon: PackageSearch,
  },
  {
    title: "Solution Architecture",
    description: "We design infrastructure suited to your scale, budget, and risk tolerance.",
    Icon: Compass,
  },
  {
    title: "Procurement & Deployment Planning",
    description: "We source the right hardware and sequence the rollout to minimize disruption.",
    Icon: ClipboardList,
  },
  {
    title: "Installation & Integration",
    description: "Our teams install, configure, and integrate every system end-to-end.",
    Icon: Hammer,
  },
  {
    title: "Testing, Handover & Training",
    description: "We validate performance, document the setup, and train your team to operate it.",
    Icon: ClipboardCheck,
  },
  {
    title: "Ongoing Support & Optimization",
    description: "We monitor, maintain, and refine the environment as your business evolves.",
    Icon: RefreshCw,
  },
];

/* ====================================================================== */
/* MOTION VARIANTS                                                        */
/* ====================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardRise = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ====================================================================== */
/* REUSABLE BG LAYER HELPER                                               */
/* ====================================================================== */

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

/* ====================================================================== */
/* SMALL INLINE HELPERS                                                   */
/* ====================================================================== */

function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <motion.div
      className={`dm-about-section-head dm-align-${align}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {eyebrow && (
        <motion.span className="dm-about-eyebrow" variants={fadeUp}>
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 className="dm-about-title" variants={fadeUp}>
        {title}
      </motion.h2>
      {description && (
        <motion.p className="dm-about-desc" variants={fadeUp}>
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

function CountUpStat({ value, suffix, durationMs = 1400 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    let start = null;
    let frameId;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, durationMs, shouldReduceMotion]);

  return (
    <span ref={ref} className="dm-stat-number">
      {display}
      <span className="dm-stat-suffix">{suffix}</span>
    </span>
  );
}

/* ====================================================================== */
/* PAGE                                                                    */
/* ====================================================================== */

export default function AboutPage() {
  return (
    <main className="dm-about dm-page-shell">

      {/* ══════════════════════════════════════════════════════════════
          HERO  →  bg-network
          Network Particles: connected nodes = perfect for "IT solutions"
          first impression. Energetic, techy, professional.
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="dm-about-hero"
        aria-labelledby="about-hero-heading"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <BgLayer><NetworkParticles /></BgLayer>

        <div className="dm-about-hero-bg" aria-hidden="true">
          <div className="dm-hero-grid" />
          <div className="dm-hero-spotlight" />
        </div>

        <div
          className="dm-about-container dm-hero-grid-layout"
          style={{ position: "relative", zIndex: 1 }}
        >
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.span className="dm-about-eyebrow" variants={fadeUp}>
              About Deep Mind IT Solutions
            </motion.span>
            <motion.h1 id="about-hero-heading" className="dm-hero-heading" variants={fadeUp}>
              Building Reliable, Secure, and Scalable IT Foundations for Modern Businesses
            </motion.h1>
            <motion.p className="dm-hero-paragraph" variants={fadeUp}>
              Deep Mind IT Solutions is an IT infrastructure and business technology
              solutions company that helps organizations modernize how they run. We design,
              deploy, and support networking, cloud, cyber security, server infrastructure,
              surveillance, AV, and power continuity systems &mdash; built to perform under
              real operating conditions, not just on a spec sheet.
            </motion.p>
            <motion.div className="dm-hero-cta-row" variants={fadeUp}>
              <a href="#contact" className="dm-btn dm-btn-primary">
                <PhoneCall size={16} strokeWidth={1.8} />
                <span>Talk to an Expert</span>
                <span className="dm-btn-sweep" aria-hidden="true" />
              </a>
              <a href="#capabilities" className="dm-btn dm-btn-ghost">
                <span>Explore Solutions</span>
                <ArrowRight size={16} strokeWidth={1.8} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="dm-hero-visual"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <div className="dm-panel dm-panel-main">
              <div className="dm-panel-row">
                <span className="dm-panel-dot dm-dot-blue" />
                <span className="dm-panel-bar dm-bar-w70" />
              </div>
              <div className="dm-panel-row">
                <span className="dm-panel-dot dm-dot-teal" />
                <span className="dm-panel-bar dm-bar-w45" />
              </div>
              <div className="dm-panel-row">
                <span className="dm-panel-dot dm-dot-violet" />
                <span className="dm-panel-bar dm-bar-w60" />
              </div>
              <div className="dm-panel-graph">
                <span className="dm-graph-bar" style={{ height: "38%" }} />
                <span className="dm-graph-bar" style={{ height: "62%" }} />
                <span className="dm-graph-bar" style={{ height: "48%" }} />
                <span className="dm-graph-bar" style={{ height: "80%" }} />
                <span className="dm-graph-bar" style={{ height: "55%" }} />
              </div>
            </div>
            <div className="dm-panel dm-panel-float dm-panel-float-1">
              <ShieldCheck size={18} strokeWidth={1.8} />
              <span>Threat monitoring active</span>
            </div>
            <div className="dm-panel dm-panel-float dm-panel-float-2">
              <Server size={18} strokeWidth={1.8} />
              <span>Uptime 99.9%</span>
            </div>
            <span className="dm-node-line dm-node-line-1" />
            <span className="dm-node-line dm-node-line-2" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          COMPANY STORY  →  bg-orbs
          Floating Orbs: soft, glowing, premium feel — suits the
          "partner, not vendor" storytelling tone perfectly.
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="dm-about-section"
        aria-labelledby="story-heading"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <BgLayer><FloatingOrbs /></BgLayer>

        <div
          className="dm-about-container dm-story-layout"
          style={{ position: "relative", zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="dm-about-eyebrow">Our Story</span>
            <h2 id="story-heading" className="dm-about-title dm-align-left">
              A Technology Partner, Not Just a Vendor
            </h2>
            <p className="dm-story-paragraph">
              Deep Mind IT Solutions helps businesses modernize and manage their technology
              environments end-to-end. We work across networking, cloud, cyber security,
              server infrastructure, surveillance, AV, UPS and power continuity, and managed
              IT &mdash; the systems that keep day-to-day operations running without
              interruption.
            </p>
            <p className="dm-story-paragraph">
              We built this company around a simple idea: infrastructure should be a source
              of confidence, not a recurring headache. That means we don&rsquo;t disappear
              after installation. We aim to be a long-term technology partner, staying
              engaged through monitoring, support, and the next phase of your growth, with a
              consistent focus on practical execution and reliability over flashy promises.
            </p>
          </motion.div>

          <motion.div
            className="dm-story-cards"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {storyCards.map(({ title, description, Icon }) => (
              <motion.div key={title} className="dm-story-card" variants={cardRise}>
                <span className="dm-card-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h3 className="dm-story-card-title">{title}</h3>
                <p className="dm-story-card-desc">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MISSION / VISION / VALUES  →  bg-techgrid
          TechGrid hologram city: futuristic horizon + city skyline —
          perfectly frames aspirational "vision & mission" content.
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="dm-about-section dm-section-alt"
        aria-labelledby="pillars-heading"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <BgLayer><TechGridParticles /></BgLayer>

        <div
          className="dm-about-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <SectionHeading
            eyebrow="What Drives Us"
            title="Mission, Vision &amp; Core Values"
          />
          <motion.div
            className="dm-pillar-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {pillars.map(({ title, description, Icon }) => (
              <motion.div key={title} className="dm-pillar-card" variants={cardRise}>
                <span className="dm-pillar-beam" aria-hidden="true" />
                <span className="dm-card-icon dm-card-icon-lg">
                  <Icon size={26} strokeWidth={1.6} />
                </span>
                <h3 className="dm-pillar-title">{title}</h3>
                <p className="dm-pillar-desc">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY CHOOSE US  →  bg-mesh (mouse responsive!)
          GlowingMesh reacts to mouse hover — visitors exploring
          "why choose us" cards will interact naturally with it.
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="dm-about-section"
        aria-labelledby="why-heading"
        id="why-deep-mind"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <BgLayer><GlowingMesh /></BgLayer>

        <div
          className="dm-about-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <SectionHeading
            eyebrow="Proof, Not Promises"
            title="Why Businesses Choose Deep Mind IT Solutions"
          />
          <motion.div
            className="dm-proof-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {proofCards.map(({ title, description, Icon }) => (
              <motion.div key={title} className="dm-proof-card" variants={cardRise}>
                <span className="dm-card-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h3 className="dm-proof-title">{title}</h3>
                <p className="dm-proof-desc">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS  →  no extra bg (existing dm-stats-section bg is fine)
          Already has its own grid overlay — adding canvas here would
          visually compete with the count-up numbers.
      ══════════════════════════════════════════════════════════════ */}
      <section className="dm-about-section dm-stats-section" aria-labelledby="stats-heading">
        <div className="dm-stats-bg" aria-hidden="true">
          <div className="dm-hero-grid" />
        </div>
        <div className="dm-about-container">
          <SectionHeading
            eyebrow="Track Record"
            title="Experience That Shows Up in the Numbers"
          />
          <motion.div
            className="dm-stats-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map(({ label, value, suffix, Icon }) => (
              <motion.div key={label} className="dm-stat-card" variants={cardRise}>
                <span className="dm-card-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <CountUpStat value={value} suffix={suffix} />
                <span className="dm-stat-label">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CORE CAPABILITIES  →  bg-circuit
          CircuitBoard PCB traces running through a 9-capability grid —
          thematically perfect: data flowing through infrastructure.
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="dm-about-section dm-section-alt"
        aria-labelledby="capabilities-heading"
        id="capabilities"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <BgLayer><CircuitBoard /></BgLayer>

        <div
          className="dm-about-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <SectionHeading
            eyebrow="What We Deliver"
            title="Core Capabilities"
            description="Nine technology pillars covering the full lifecycle of a modern business's infrastructure."
          />
          <motion.div
            className="dm-capability-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {capabilities.map(({ title, description, bullets, Icon }) => (
              <motion.div key={title} className="dm-capability-card" variants={cardRise}>
                <span className="dm-card-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h3 className="dm-capability-title">{title}</h3>
                <p className="dm-capability-desc">{description}</p>
                <ul className="dm-capability-bullets">
                  {bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW WE WORK  →  no extra bg
          Process list is already visually rich with numbered steps
          and icons. A canvas bg here would distract from the flow.
      ══════════════════════════════════════════════════════════════ */}
      <section className="dm-about-section" aria-labelledby="process-heading">
        <div className="dm-about-container">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Work with Clients"
          />
          <motion.ol
            className="dm-process-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {processSteps.map(({ title, description, Icon }, index) => (
              <motion.li key={title} className="dm-process-step" variants={cardRise}>
                <span className="dm-process-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="dm-card-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h3 className="dm-process-title">{title}</h3>
                <p className="dm-process-desc">{description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CLOSING CTA  →  bg-network (same as hero — creates bookend)
          Repeating NetworkParticles ties the page together visually,
          giving the CTA the same energy as the opening hero.
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="dm-about-cta"
        aria-labelledby="about-cta-heading"
        id="contact"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <BgLayer><NetworkParticles /></BgLayer>

        <div className="dm-about-cta-bg" aria-hidden="true">
          <div className="dm-hero-grid" />
          <div className="dm-hero-spotlight" />
        </div>

        <motion.div
          className="dm-about-container dm-about-cta-content"
          style={{ position: "relative", zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2 id="about-cta-heading" className="dm-about-cta-heading" variants={fadeUp}>
            Looking for a Technology Partner That Can Deliver with Confidence?
          </motion.h2>
          <motion.p className="dm-about-cta-paragraph" variants={fadeUp}>
            Let&rsquo;s talk about your infrastructure upgrades, cloud modernization, cyber
            security, surveillance, AV solutions, server deployment, power backup, or managed
            support needs &mdash; and how Deep Mind IT Solutions can help you execute with
            confidence.
          </motion.p>
          <motion.div className="dm-hero-cta-row" variants={fadeUp}>
            <a href="#schedule" className="dm-btn dm-btn-primary">
              <CalendarCheck size={16} strokeWidth={1.8} />
              <span>Schedule a Consultation</span>
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