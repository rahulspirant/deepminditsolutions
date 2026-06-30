import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  CircuitBoard,
  TechGridParticles,
  GlowingMesh,
  FloatingOrbs,
  NetworkParticles,
} from "../backgrounds/backgrounds";
import {
  Network,
  Cloud,
  ShieldCheck,
  Server,
  Settings,
  Code2,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Zap,
  Globe,
  Lock,
  BarChart3,
  Headphones,
  Layers,
  ScanLine,
  CircleDot,
  MoveRight,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "network",
    anchorId: "network-infrastructure",
    pagePath: "/services/network-infrastructure",
    icon: Network,
    title: "Network Infrastructure",
    summary:
      "End-to-end structured network design — from core switching to enterprise-wide Wi-Fi — built for reliability, performance, and growth.",
    offerings: [
      "Structured cabling & switching",
      "Routing & enterprise Wi-Fi",
      "Network segmentation & VLANs",
      "Capacity planning & optimization",
    ],
    accent: "#3B82F6",
  },
  {
    id: "cloud",
    anchorId: "cloud-solutions",
    pagePath: "/services/cloud-solutions",
    icon: Cloud,
    title: "Cloud Solutions",
    summary:
      "Strategic cloud migration and deployment that modernizes your infrastructure without disrupting day-to-day business operations.",
    offerings: [
      "Cloud readiness assessment",
      "Migration planning & execution",
      "Backup, DR & recovery design",
      "Scalable multi-cloud architecture",
    ],
    accent: "#8B5CF6",
  },
  {
    id: "security",
    anchorId: "cyber-security",
    pagePath: "/services/cyber-security",
    icon: ShieldCheck,
    title: "Cyber Security",
    summary:
      "Defense-in-depth security frameworks that protect your perimeter, endpoints, and access paths against modern threats.",
    offerings: [
      "Firewall & perimeter hardening",
      "Endpoint detection & response",
      "Identity & access governance",
      "Continuous risk monitoring",
    ],
    accent: "#EF4444",
  },
  {
    id: "datacenter",
    anchorId: "data-center",
    pagePath: "/services/data-center",
    icon: Server,
    title: "Data Center Solutions",
    summary:
      "Full-scope data center builds — from server room layouts to rack infrastructure — engineered for density, uptime, and future scale.",
    offerings: [
      "Server room design & planning",
      "Rack, storage & compute setup",
      "Power, cooling & UPS systems",
      "Infrastructure consolidation",
    ],
    accent: "#10B981",
  },
  {
    id: "managed",
    anchorId: "managed-it",
    pagePath: "/services/managed-it",
    icon: Settings,
    title: "Managed IT Services",
    summary:
      "Proactive monitoring, user support, and lifecycle management so your technology operates reliably without burdening your team.",
    offerings: [
      "24/7 infrastructure monitoring",
      "Helpdesk & user support",
      "Patch management & maintenance",
      "Asset lifecycle assistance",
    ],
    accent: "#F59E0B",
  },
  {
    id: "software",
    anchorId: "software-development",
    pagePath: "/services/software-development",
    icon: Code2,
    title: "Software & App Development",
    summary:
      "Purpose-built business software and web applications that automate workflows and eliminate operational bottlenecks.",
    offerings: [
      "Custom business software",
      "Web & internal applications",
      "Workflow automation systems",
      "Digital process tooling",
    ],
    accent: "#06B6D4",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    icon: ScanLine,
    title: "Assessment",
    desc: "We audit your existing infrastructure, workflows, and constraints to establish a clear, unbiased baseline before any recommendation is made.",
  },
  {
    num: "02",
    icon: Layers,
    title: "Solution Design",
    desc: "Our engineers architect a solution specific to your environment — vendor-agnostic, budget-aware, and aligned to your operational goals.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Deployment Planning",
    desc: "A detailed project plan, risk register, and rollout schedule are defined so implementation proceeds with minimal business disruption.",
  },
  {
    num: "04",
    icon: Zap,
    title: "Implementation & Integration",
    desc: "Certified engineers deploy, configure, and integrate the solution across your environment with rigorous quality checkpoints at every stage.",
  },
  {
    num: "05",
    icon: Headphones,
    title: "Support & Optimization",
    desc: "Post-deployment, we monitor performance, resolve issues proactively, and tune the system as your business demands evolve.",
  },
];

const WHY_CARDS = [
  {
    icon: Cpu,
    title: "Deep Infrastructure Expertise",
    desc: "Over a decade of hands-on experience designing and deploying enterprise-grade infrastructure across sectors.",
  },
  {
    icon: Globe,
    title: "Business-First Consulting",
    desc: "Every recommendation is anchored in your operational objectives — not product margins or vendor incentives.",
  },
  {
    icon: Layers,
    title: "Multi-Vendor Capability",
    desc: "Certified across leading platforms including Cisco, Fortinet, Microsoft, AWS, and more for unbiased solution design.",
  },
  {
    icon: Lock,
    title: "Security-First Implementation",
    desc: "Security is baked into every deployment — not bolted on after. From network design to cloud to software.",
  },
  {
    icon: Headphones,
    title: "Responsive, Accountable Support",
    desc: "Dedicated engineers, defined SLAs, and a direct line to the people who built your system when it matters.",
  },
  {
    icon: BarChart3,
    title: "Scalable Long-Term Thinking",
    desc: "We design for where your business is going — not just where it is today — so infrastructure investments last.",
  },
];

const COVERAGE = [
  { label: "Office & Campus Networking", icon: Network },
  { label: "Branch Connectivity & SD-WAN", icon: Globe },
  { label: "Cloud Modernization", icon: Cloud },
  { label: "Cyber Security Hardening", icon: ShieldCheck },
  { label: "Surveillance & Monitoring Environments", icon: ScanLine },
  { label: "Server & Data Center Readiness", icon: Server },
  { label: "Business Software Workflows", icon: Code2 },
  { label: "Power Continuity & UPS Systems", icon: Zap },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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

// ─── Hero abstract visual ─────────────────────────────────────────────────────

function HeroVisual() {
  return (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center select-none pointer-events-none">
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)",
        }}
      />
      {/* Orbit rings */}
      {[340, 260, 180].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: `rgba(99,179,237,${0.08 + i * 0.04})`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 28 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Orbiting node */}
          <div
            className="absolute rounded-full"
            style={{
              width: 8,
              height: 8,
              top: -4,
              left: "50%",
              marginLeft: -4,
              background: ["#3B82F6", "#8B5CF6", "#10B981"][i],
              boxShadow: `0 0 12px 3px ${["#3B82F6", "#8B5CF6", "#10B981"][i]}`,
            }}
          />
        </motion.div>
      ))}
      {/* Center node */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-2xl"
        style={{
          width: 88,
          height: 88,
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(139,92,246,0.22))",
          border: "1px solid rgba(99,179,237,0.25)",
          backdropFilter: "blur(12px)",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cpu size={36} color="#93C5FD" />
      </motion.div>
      {/* Satellite icons */}
      {[
        { Icon: Network, x: -160, y: -80, c: "#3B82F6" },
        { Icon: ShieldCheck, x: 160, y: -60, c: "#EF4444" },
        { Icon: Cloud, x: 140, y: 80, c: "#8B5CF6" },
        { Icon: Server, x: -150, y: 90, c: "#10B981" },
        { Icon: Code2, x: 0, y: -160, c: "#06B6D4" },
        { Icon: Settings, x: 0, y: 160, c: "#F59E0B" },
      ].map(({ Icon, x, y, c }, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center rounded-xl"
          style={{
            width: 52,
            height: 52,
            left: "50%",
            top: "50%",
            marginLeft: x - 26,
            marginTop: y - 26,
            background: `rgba(${c
              .slice(1)
              .match(/.{2}/g)
              .map((h) => parseInt(h, 16))
              .join(",")}, 0.12)`,
            border: `1px solid ${c}33`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
        >
          <Icon size={22} color={c} />
        </motion.div>
      ))}
      {/* Connection lines (SVG overlay) */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.15 }}
        viewBox="0 0 420 420"
        preserveAspectRatio="xMidYMid meet"
      >
        {[
          [210, 210, 50, 130],
          [210, 210, 370, 150],
          [210, 210, 350, 290],
          [210, 210, 60, 300],
          [210, 210, 210, 50],
          [210, 210, 210, 370],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#93C5FD"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
      </svg>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div
      style={{
        background: "#080C14",
        color: "#E2E8F0",
        fontFamily:
          "'Inter', 'DM Sans', system-ui, -apple-system, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(30,58,138,0.22) 0%, transparent 70%), #080C14",
          paddingTop: "6rem",
          paddingBottom: "5rem",
        }}
      >
        <BgLayer><CircuitBoard /></BgLayer>
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  color: "#93C5FD",
                }}
              >
                <CircleDot size={10} />
                Our Services
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                }}
              >
                Integrated IT Services{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #60A5FA, #818CF8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Designed for Performance,
                </span>{" "}
                Security, and Business Continuity
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                style={{
                  marginTop: "1.5rem",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  color: "#94A3B8",
                  maxWidth: 520,
                }}
              >
                Deep Mind IT Solutions delivers a complete portfolio of
                enterprise IT services — from network infrastructure and cyber
                security to cloud migration, data center builds, managed
                support, and custom software — giving businesses a single
                trusted partner for every layer of their technology stack.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="flex flex-wrap gap-4 mt-10"
              >
                <button
                  style={{
                    padding: "0.85rem 1.75rem",
                    background:
                      "linear-gradient(135deg, #2563EB, #4F46E5)",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 0 24px rgba(59,130,246,0.3)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 36px rgba(59,130,246,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0 24px rgba(59,130,246,0.3)";
                  }}
                >
                  Talk to an Expert <ArrowRight size={16} />
                </button>
                <button
                  style={{
                    padding: "0.85rem 1.75rem",
                    background: "transparent",
                    color: "#CBD5E1",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    border: "1px solid rgba(148,163,184,0.2)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(148,163,184,0.08)";
                    e.currentTarget.style.borderColor =
                      "rgba(148,163,184,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor =
                      "rgba(148,163,184,0.2)";
                  }}
                >
                  Request a Consultation <ChevronRight size={16} />
                </button>
              </motion.div>
            </div>

            {/* Right — Abstract Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICES OVERVIEW GRID ─────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background: "#060A12",
        }}
      >
        <BgLayer><TechGridParticles /></BgLayer>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "#60A5FA" }}
              >
                Service Portfolio
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                }}
              >
                Six Core Service Lines
              </h2>
              <p
                style={{
                  marginTop: "1rem",
                  color: "#64748B",
                  maxWidth: 500,
                  margin: "1rem auto 0",
                  lineHeight: 1.7,
                }}
              >
                Each practice area is staffed by certified specialists and
                delivered through a repeatable, outcome-focused methodology.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              const isHovered = hoveredCard === svc.id;
              return (
                <FadeUp key={svc.id} delay={i * 0.07}>
                  <motion.div
                    id={svc.anchorId}
                    onMouseEnter={() => setHoveredCard(svc.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      background: isHovered
                        ? "rgba(15,23,42,0.95)"
                        : "rgba(10,16,30,0.8)",
                      border: `1px solid ${
                        isHovered ? svc.accent + "44" : "rgba(51,65,85,0.5)"
                      }`,
                      borderRadius: "1rem",
                      padding: "2rem",
                      height: "100%",
                      cursor: "pointer",
                      backdropFilter: "blur(12px)",
                      boxShadow: isHovered
                        ? `0 0 32px ${svc.accent}18, 0 8px 32px rgba(0,0,0,0.4)`
                        : "0 2px 16px rgba(0,0,0,0.3)",
                      transition:
                        "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                      scrollMarginTop: "110px",
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "0.75rem",
                        background: `${svc.accent}18`,
                        border: `1px solid ${svc.accent}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <Icon size={24} color={svc.accent} />
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#F1F5F9",
                        marginBottom: "0.75rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {svc.title}
                    </h3>

                    {/* Summary */}
                    <p
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        color: "#64748B",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {svc.summary}
                    </p>

                    {/* Offerings */}
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem" }}>
                      {svc.offerings.map((o) => (
                        <li
                          key={o}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            fontSize: "0.82rem",
                            color: "#94A3B8",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            color={svc.accent}
                            style={{ marginTop: 2, flexShrink: 0 }}
                          />
                          {o}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to={svc.pagePath}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: svc.accent,
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      View Service Details
                      <MoveRight size={14} />
                    </Link>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. DELIVERY PROCESS ───────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(30,58,138,0.16) 0%, transparent 70%), #080C14",
        }}
      >
        <BgLayer><GlowingMesh /></BgLayer>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "#60A5FA" }}
              >
                Methodology
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                }}
              >
                How We Deliver Services
              </h2>
              <p
                style={{
                  marginTop: "1rem",
                  color: "#64748B",
                  maxWidth: 480,
                  margin: "1rem auto 0",
                  lineHeight: 1.7,
                }}
              >
                A structured five-phase approach that reduces risk, ensures
                alignment, and delivers predictable outcomes.
              </p>
            </div>
          </FadeUp>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line */}
            <div
              className="absolute hidden lg:block"
              style={{
                top: 36,
                left: "10%",
                right: "10%",
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(59,130,246,0.25) 20%, rgba(139,92,246,0.25) 80%, transparent)",
              }}
            />

            <div className="grid lg:grid-cols-5 gap-8">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <FadeUp key={step.num} delay={i * 0.1}>
                    <div className="flex flex-col items-center text-center lg:items-center">
                      {/* Step bubble */}
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "relative",
                          zIndex: 10,
                          width: 72,
                          height: 72,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(79,70,229,0.25))",
                          border: "1px solid rgba(99,179,237,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1.25rem",
                          backdropFilter: "blur(8px)",
                          boxShadow: "0 0 24px rgba(59,130,246,0.12)",
                        }}
                      >
                        <Icon size={26} color="#93C5FD" />
                        {/* Step number badge */}
                        <div
                          style={{
                            position: "absolute",
                            top: -6,
                            right: -6,
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #2563EB, #4F46E5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {i + 1}
                        </div>
                      </motion.div>

                      <h3
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: "#E2E8F0",
                          marginBottom: "0.6rem",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          lineHeight: 1.7,
                          color: "#475569",
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE ─────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background: "#060A12",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "#60A5FA" }}
              >
                Why Deep Mind
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                }}
              >
                What Clients Trust Us With
              </h2>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeUp key={card.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      padding: "1.75rem",
                      borderRadius: "0.875rem",
                      background: "rgba(10,16,30,0.7)",
                      border: "1px solid rgba(51,65,85,0.4)",
                      backdropFilter: "blur(10px)",
                      transition: "border-color 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(99,179,237,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(51,65,85,0.4)";
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "0.6rem",
                        background: "rgba(37,99,235,0.15)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <Icon size={20} color="#60A5FA" />
                    </div>
                    <h3
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "#CBD5E1",
                        marginBottom: "0.6rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.83rem",
                        lineHeight: 1.7,
                        color: "#475569",
                      }}
                    >
                      {card.desc}
                    </p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. SERVICE COVERAGE ───────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(79,70,229,0.1) 0%, transparent 65%), #080C14",
        }}
      >
        <BgLayer><FloatingOrbs /></BgLayer>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <FadeUp>
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: "#60A5FA" }}
                >
                  Capability Summary
                </p>
                <h2
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#F1F5F9",
                    marginBottom: "1.25rem",
                    lineHeight: 1.2,
                  }}
                >
                  What We Support Across Your Business
                </h2>
                <p
                  style={{
                    color: "#64748B",
                    lineHeight: 1.75,
                    fontSize: "0.95rem",
                    marginBottom: "2rem",
                  }}
                >
                  From head-office networks to remote branches, cloud platforms
                  to on-premise data centers, and custom software to power
                  continuity — Deep Mind covers the full operational
                  technology footprint of a modern enterprise.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: "0.85rem",
                    color: "#93C5FD",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Request a full capability brief <ArrowRight size={15} />
                </div>
              </div>
            </FadeUp>

            {/* Right: coverage grid */}
            <FadeUp delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {COVERAGE.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "1rem 1.25rem",
                        borderRadius: "0.75rem",
                        background: "rgba(10,16,30,0.75)",
                        border: "1px solid rgba(51,65,85,0.45)",
                        backdropFilter: "blur(8px)",
                        cursor: "default",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "0.5rem",
                          background: "rgba(37,99,235,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={17} color="#60A5FA" />
                      </div>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#94A3B8",
                          fontWeight: 500,
                          lineHeight: 1.4,
                        }}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 6. CLOSING CTA ────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "7rem",
          background: "#060A12",
        }}
      >
        <BgLayer><NetworkParticles /></BgLayer>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp>
            {/* Glow backdrop */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                padding: "4rem 3rem",
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.14), rgba(79,70,229,0.14))",
                border: "1px solid rgba(99,179,237,0.14)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.12), transparent)",
                }}
              />

              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "#60A5FA", position: "relative" }}
              >
                Get Started
              </p>

              <h2
                style={{
                  position: "relative",
                  fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                  marginBottom: "1.25rem",
                  lineHeight: 1.25,
                }}
              >
                Need the Right IT Service Partner for Your Next Infrastructure
                Initiative?
              </h2>

              <p
                style={{
                  position: "relative",
                  color: "#64748B",
                  lineHeight: 1.75,
                  maxWidth: 560,
                  margin: "0 auto 2.5rem",
                  fontSize: "0.95rem",
                }}
              >
                Whether you're planning a cloud migration, network overhaul,
                security hardening, data center build, managed IT transition,
                or custom software project — our specialists are ready to
                scope, design, and deliver.
              </p>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    padding: "0.9rem 2rem",
                    background:
                      "linear-gradient(135deg, #2563EB, #4F46E5)",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 0 28px rgba(59,130,246,0.35)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 40px rgba(59,130,246,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0 28px rgba(59,130,246,0.35)";
                  }}
                >
                  Book a Consultation <ArrowRight size={16} />
                </button>
                <button
                  style={{
                    padding: "0.9rem 2rem",
                    background: "transparent",
                    color: "#CBD5E1",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    border: "1px solid rgba(148,163,184,0.25)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(148,163,184,0.08)";
                    e.currentTarget.style.borderColor =
                      "rgba(148,163,184,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor =
                      "rgba(148,163,184,0.25)";
                  }}
                >
                  Contact Sales <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}