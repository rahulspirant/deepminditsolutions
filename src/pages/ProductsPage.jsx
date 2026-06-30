import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Server,
  Network,
  Cable,
  ShieldCheck,
  Monitor,
  Tv2,
  Projector,
  BatteryCharging,
  Camera,
  ArrowRight,
  ChevronRight,
  CircleDot,
  CheckCircle2,
  MoveRight,
  Map,
  Wrench,
  FlaskConical,
  GraduationCap,
  LifeBuoy,
  RefreshCw,
  LayoutGrid,
  Cpu,
  Building2,
  School,
  RadioTower,
  ShoppingBag,
  HeartPulse,
  BookOpen,
  DatabaseZap,
  ScanEye,
  Layers,
  BadgeCheck,
  Shuffle,
  TrendingUp,
  ClipboardList,
} from "lucide-react";
import {
  TechGridParticles,
  CircuitBoard,
  GlowingMesh,
  FloatingOrbs,
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

const CATEGORIES = [
  {
    id: "server",
    icon: Server,
    title: "Server & Storage",
    desc: "Enterprise compute and storage infrastructure sized for real business workloads — from single-site deployments to multi-node environments.",
    offerings: [
      "Enterprise rack & tower servers",
      "SAN / NAS storage planning",
      "Compute infrastructure design",
      "Business continuity configuration",
    ],
    accent: "#3B82F6",
  },
  {
    id: "network",
    icon: Network,
    title: "Switches / Router / Wi-Fi",
    desc: "Core and edge networking hardware from leading vendors, selected for your topology, traffic profile, and scalability roadmap.",
    offerings: [
      "Managed & unmanaged switching",
      "Enterprise routing solutions",
      "High-density wireless infrastructure",
      "Branch & campus connectivity",
    ],
    accent: "#06B6D4",
  },
  {
    id: "passive",
    icon: Cable,
    title: "Passive Items",
    desc: "The structured cabling and enclosure layer that every network depends on — supplied and installed to industry standards.",
    offerings: [
      "Structured cabling (Cat6 / Cat6A / Fiber)",
      "Racks, cabinets & enclosures",
      "Patch panels & keystones",
      "Cable management accessories",
    ],
    accent: "#64748B",
  },
  {
    id: "firewall",
    icon: ShieldCheck,
    title: "Firewall",
    desc: "Next-generation perimeter security platforms that enforce policy, protect access paths, and provide visibility across your network edge.",
    offerings: [
      "Next-gen firewall deployment",
      "Policy & rule configuration",
      "Secure remote access (VPN/ZTNA)",
      "Threat intelligence & filtering",
    ],
    accent: "#EF4444",
  },
  {
    id: "led",
    icon: Monitor,
    title: "LEDs & Interactive Panels",
    desc: "Commercial-grade display and collaboration panels for meeting rooms, classrooms, and presentation environments that demand clarity and reliability.",
    offerings: [
      "Large-format LED display walls",
      "Interactive flat panel systems",
      "Meeting room collaboration panels",
      "Digital signage & communication displays",
    ],
    accent: "#8B5CF6",
  },
  {
    id: "av",
    icon: Tv2,
    title: "AV Solutions & KVM",
    desc: "Professional audio-visual switching and KVM infrastructure for control rooms, broadcast environments, and enterprise presentation spaces.",
    offerings: [
      "AV signal distribution & switching",
      "KVM switching & extension",
      "Control room AV integration",
      "Professional presentation system design",
    ],
    accent: "#F59E0B",
  },
  {
    id: "projectors",
    icon: Projector,
    title: "Projectors",
    desc: "Installation-grade projectors for training rooms, boardrooms, classrooms, and auditoriums — with mount, screen, and alignment support.",
    offerings: [
      "Business & education projectors",
      "Short-throw & ultra short-throw",
      "Screen & mounting infrastructure",
      "Calibration & installation planning",
    ],
    accent: "#10B981",
  },
  {
    id: "ups",
    icon: BatteryCharging,
    title: "UPS Power",
    desc: "Uninterruptible power systems that protect critical infrastructure from outages, surges, and instability across your entire environment.",
    offerings: [
      "Line-interactive & online UPS",
      "Rack-mount & tower form factors",
      "Runtime extension & battery planning",
      "Critical equipment power protection",
    ],
    accent: "#F97316",
  },
  {
    id: "cctv",
    icon: Camera,
    title: "CCTV Surveillance",
    desc: "IP-based camera infrastructure and NVR systems designed for comprehensive site coverage, remote monitoring, and evidence-grade recording.",
    offerings: [
      "IP camera & NVR system supply",
      "Coverage mapping & layout planning",
      "Indoor / outdoor camera selection",
      "Remote monitoring & storage design",
    ],
    accent: "#A855F7",
  },
];

const VALUE_CARDS = [
  {
    icon: ClipboardList,
    title: "Requirement Mapping",
    desc: "We begin by understanding your operational environment, constraints, and goals — before any product is specified.",
  },
  {
    icon: BadgeCheck,
    title: "Right-Fit Recommendation",
    desc: "Vendor-neutral advice that matches hardware to your real workload — not to margin incentives or stock availability.",
  },
  {
    icon: Wrench,
    title: "Installation & Integration",
    desc: "Certified engineers install, rack, cable, and integrate equipment so it functions as a coherent system from day one.",
  },
  {
    icon: FlaskConical,
    title: "Testing & Commissioning",
    desc: "Every deployment is tested against defined acceptance criteria before handover — no shortcuts, no assumptions.",
  },
  {
    icon: GraduationCap,
    title: "Training & Handover",
    desc: "We walk your team through what's been deployed so they can operate and manage it confidently from the start.",
  },
  {
    icon: LifeBuoy,
    title: "Lifecycle Assistance",
    desc: "Post-deployment support, warranty management, firmware updates, and planned refresh cycles handled by a single team.",
  },
];

const SOLUTION_POINTS = [
  {
    icon: Building2,
    title: "Business Need First",
    desc: "Every product recommendation starts with a clear understanding of the operational problem it needs to solve.",
  },
  {
    icon: Shuffle,
    title: "Vendor-Neutral Selection",
    desc: "We work across Cisco, HPE, Fortinet, Hikvision, Samsung, and more — choosing the platform that fits, not the one we're tied to.",
  },
  {
    icon: Layers,
    title: "Infrastructure Compatibility",
    desc: "New equipment is selected to integrate cleanly with your existing environment, not to force unnecessary replacements.",
  },
  {
    icon: TrendingUp,
    title: "Built for Future Scale",
    desc: "We size and configure systems with growth capacity built in — so your investment stays relevant as the business expands.",
  },
  {
    icon: DatabaseZap,
    title: "Deployment Readiness",
    desc: "Pre-configuration, labelling, staging, and site preparation are handled before any engineer sets foot on-site.",
  },
  {
    icon: RefreshCw,
    title: "Support & Refresh Planning",
    desc: "We document what's deployed and build a maintenance and refresh plan so nothing catches your team off-guard.",
  },
];

const ENVIRONMENTS = [
  { icon: Building2, label: "Corporate Offices" },
  { icon: School, label: "Campuses & Institutions" },
  { icon: RadioTower, label: "Control Rooms" },
  { icon: ShoppingBag, label: "Retail Environments" },
  { icon: HeartPulse, label: "Healthcare Facilities" },
  { icon: BookOpen, label: "Training Rooms" },
  { icon: DatabaseZap, label: "Server Rooms" },
  { icon: ScanEye, label: "Surveillance Sites" },
];

// ─── Animation helper ──────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Visual — stacked infrastructure shelf blocks ────────────────────────

function HeroVisual() {
  const blocks = [
    { label: "Server Rack", w: 220, h: 52, icon: Server, c: "#3B82F6", delay: 0 },
    { label: "Network Switch", w: 190, h: 44, icon: Network, c: "#06B6D4", delay: 0.07 },
    { label: "Firewall Appliance", w: 200, h: 44, icon: ShieldCheck, c: "#EF4444", delay: 0.14 },
    { label: "UPS Unit", w: 175, h: 44, icon: BatteryCharging, c: "#F97316", delay: 0.21 },
    { label: "Storage Array", w: 185, h: 44, icon: Cpu, c: "#8B5CF6", delay: 0.28 },
    { label: "CCTV Recorder", w: 165, h: 44, icon: Camera, c: "#A855F7", delay: 0.35 },
  ];

  return (
    <div
      className="relative flex flex-col gap-3 items-end"
      style={{ minHeight: 340 }}
    >
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: -40,
          top: "50%",
          transform: "translateY(-50%)",
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      {blocks.map((b, i) => {
        const Icon = b.icon;
        return (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: b.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: b.w,
              height: b.h,
              borderRadius: "0.5rem",
              background: `rgba(${b.c
                .slice(1)
                .match(/.{2}/g)
                .map((h) => parseInt(h, 16))
                .join(",")}, 0.08)`,
              border: `1px solid ${b.c}28`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 1rem",
              backdropFilter: "blur(10px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle inner scan line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 2,
                background: b.c,
                opacity: 0.5,
                borderRadius: "2px 0 0 2px",
              }}
            />
            <Icon size={18} color={b.c} style={{ flexShrink: 0 }} />
            <span
              style={{
                fontSize: "0.75rem",
                color: "#94A3B8",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              {b.label}
            </span>
            {/* Pulse dot */}
            <motion.div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: b.c,
                marginLeft: "auto",
                flexShrink: 0,
              }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 2.2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}
      {/* Rack outline suggestion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          position: "absolute",
          right: -12,
          top: -12,
          bottom: -12,
          width: 6,
          borderRadius: "3px",
          background:
            "linear-gradient(180deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))",
          border: "1px solid rgba(6,182,212,0.12)",
        }}
      />
    </div>
  );
}

// ─── Category Card ─────────────────────────────────────────────────────────────

function CategoryCard({ cat, index }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = cat.icon;

  return (
    <FadeUp delay={index * 0.06}>
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.22 }}
        style={{
          position: "relative",
          padding: "1.75rem",
          borderRadius: "1rem",
          background: hovered ? "rgba(12,20,38,0.97)" : "rgba(8,14,26,0.8)",
          border: `1px solid ${hovered ? cat.accent + "40" : "rgba(51,65,85,0.45)"}`,
          backdropFilter: "blur(14px)",
          overflow: "hidden",
          cursor: "pointer",
          transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
          boxShadow: hovered
            ? `0 0 36px ${cat.accent}14, 0 8px 32px rgba(0,0,0,0.45)`
            : "0 2px 14px rgba(0,0,0,0.25)",
          height: "100%",
        }}
      >
        {/* Spotlight */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              pointerEvents: "none",
              borderRadius: "50%",
              width: 220,
              height: 220,
              left: mousePos.x - 110,
              top: mousePos.y - 110,
              background: `radial-gradient(circle, ${cat.accent}14 0%, transparent 70%)`,
              transition: "left 0.05s, top 0.05s",
              zIndex: 0,
            }}
          />
        )}

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Icon */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "0.75rem",
              background: `${cat.accent}14`,
              border: `1px solid ${cat.accent}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.1rem",
            }}
          >
            <Icon size={22} color={cat.accent} />
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#F1F5F9",
              marginBottom: "0.65rem",
              letterSpacing: "-0.01em",
            }}
          >
            {cat.title}
          </h3>

          {/* Desc */}
          <p
            style={{
              fontSize: "0.835rem",
              lineHeight: 1.7,
              color: "#64748B",
              marginBottom: "1.4rem",
            }}
          >
            {cat.desc}
          </p>

          {/* Offerings */}
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.6rem" }}>
            {cat.offerings.map((o) => (
              <li
                key={o}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  fontSize: "0.79rem",
                  color: "#94A3B8",
                  marginBottom: "0.45rem",
                }}
              >
                <CheckCircle2
                  size={13}
                  color={cat.accent}
                  style={{ marginTop: 2, flexShrink: 0 }}
                />
                {o}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.8rem",
              fontWeight: 600,
              color: cat.accent,
            }}
          >
            View Category <MoveRight size={13} />
          </div>
        </div>
      </motion.div>
    </FadeUp>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ProductsPage() {
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
      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "6rem",
          paddingBottom: "5rem",
          background:
            "radial-gradient(ellipse 70% 55% at 30% 50%, rgba(6,96,122,0.16) 0%, transparent 65%), #080C14",
        }}
      >
        {/* TechGridParticles background — hologram grid for product catalog feel */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        >
          <TechGridParticles />
        </div>

        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(rgba(148,163,184,0.06) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: "1.5rem",
                  padding: "0.35rem 1rem",
                  borderRadius: 999,
                  background: "rgba(6,182,212,0.1)",
                  border: "1px solid rgba(6,182,212,0.25)",
                  color: "#67E8F9",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <CircleDot size={9} />
                Our Products
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                style={{
                  fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  color: "#F1F5F9",
                }}
              >
                Enterprise Technology Products{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #22D3EE, #818CF8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Backed by Deployment Expertise
                </span>{" "}
                and Ongoing Support
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                style={{
                  marginTop: "1.5rem",
                  fontSize: "1rem",
                  lineHeight: 1.78,
                  color: "#94A3B8",
                  maxWidth: 510,
                }}
              >
                Deep Mind IT Solutions supplies enterprise hardware across
                networking, compute, security, display, and power — and
                delivers every product with full planning, professional
                installation, integration testing, and post-deployment
                support. You get the right product and the certainty that
                it works.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  marginTop: "2.5rem",
                }}
              >
                <button
                  style={{
                    padding: "0.85rem 1.75rem",
                    background: "linear-gradient(135deg, #0891B2, #4F46E5)",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 0 24px rgba(6,182,212,0.28)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 36px rgba(6,182,212,0.42)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0 24px rgba(6,182,212,0.28)";
                  }}
                >
                  Explore Product Categories <ArrowRight size={15} />
                </button>
                <button
                  style={{
                    padding: "0.85rem 1.75rem",
                    background: "transparent",
                    color: "#CBD5E1",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "1px solid rgba(148,163,184,0.2)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(148,163,184,0.07)";
                    e.currentTarget.style.borderColor =
                      "rgba(148,163,184,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor =
                      "rgba(148,163,184,0.2)";
                  }}
                >
                  Talk to Sales <ChevronRight size={15} />
                </button>
              </motion.div>
            </div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. PRODUCT CATEGORIES GRID ──────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background: "#060A12",
        }}
      >
        <BgLayer><CircuitBoard /></BgLayer>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#22D3EE",
                  marginBottom: "0.75rem",
                }}
              >
                Product Catalog
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                }}
              >
                Nine Enterprise Product Categories
              </h2>
              <p
                style={{
                  marginTop: "1rem",
                  color: "#64748B",
                  maxWidth: 480,
                  margin: "1rem auto 0",
                  lineHeight: 1.7,
                  fontSize: "0.9rem",
                }}
              >
                Each category covers supply, specification, integration, and
                support — not just hardware procurement.
              </p>
            </div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY PRODUCT DELIVERY WITH DEEP MIND ─────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background:
            "radial-gradient(ellipse 65% 55% at 80% 40%, rgba(6,96,122,0.14) 0%, transparent 65%), #080C14",
        }}
      >
        <BgLayer><GlowingMesh /></BgLayer>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <FadeUp>
            <div style={{ marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#22D3EE",
                  marginBottom: "0.75rem",
                }}
              >
                The Deep Mind Difference
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#F1F5F9",
                    maxWidth: 520,
                    lineHeight: 1.2,
                  }}
                >
                  Products Delivered as Engineered Solutions
                </h2>
                <p
                  style={{
                    color: "#64748B",
                    maxWidth: 380,
                    lineHeight: 1.75,
                    fontSize: "0.875rem",
                  }}
                >
                  Our product engagement covers every phase from specification
                  to handover — so you don't manage multiple vendors for a
                  single outcome.
                </p>
              </div>
            </div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {VALUE_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeUp key={card.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      padding: "1.6rem",
                      borderRadius: "0.875rem",
                      background: "rgba(8,14,26,0.75)",
                      border: "1px solid rgba(51,65,85,0.4)",
                      backdropFilter: "blur(10px)",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(6,182,212,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(51,65,85,0.4)";
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "0.6rem",
                        background: "rgba(6,182,212,0.1)",
                        border: "1px solid rgba(6,182,212,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <Icon size={19} color="#22D3EE" />
                    </div>
                    <h3
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        color: "#CBD5E1",
                        marginBottom: "0.55rem",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.8rem",
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

      {/* ── 4. SOLUTION-LED APPROACH ────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background: "#060A12",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {/* Left: sticky context */}
            <FadeUp>
              <div style={{ position: "sticky", top: "6rem" }}>
                <p
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#22D3EE",
                    marginBottom: "0.75rem",
                  }}
                >
                  How We Think About Products
                </p>
                <h2
                  style={{
                    fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#F1F5F9",
                    marginBottom: "1.25rem",
                    lineHeight: 1.2,
                  }}
                >
                  Every Category Is Part of an Integrated Solution
                </h2>
                <p
                  style={{
                    color: "#64748B",
                    lineHeight: 1.78,
                    fontSize: "0.9rem",
                    marginBottom: "2rem",
                  }}
                >
                  We don't ship boxes. We plan, integrate, and support
                  technology ecosystems — ensuring every product delivered
                  serves a defined business purpose and operates within a
                  coherent infrastructure.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#22D3EE",
                    cursor: "pointer",
                  }}
                >
                  Request a consultation <ArrowRight size={14} />
                </div>
              </div>
            </FadeUp>

            {/* Right: solution points */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {SOLUTION_POINTS.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <FadeUp key={pt.title} delay={i * 0.07}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex",
                        gap: "1.25rem",
                        padding: "1.4rem",
                        borderRadius: "0.875rem",
                        background: "rgba(8,14,26,0.7)",
                        border: "1px solid rgba(51,65,85,0.35)",
                        alignItems: "flex-start",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "0.55rem",
                          background: "rgba(6,182,212,0.1)",
                          border: "1px solid rgba(6,182,212,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} color="#22D3EE" />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "#CBD5E1",
                            marginBottom: "0.4rem",
                          }}
                        >
                          {pt.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            lineHeight: 1.7,
                            color: "#475569",
                          }}
                        >
                          {pt.desc}
                        </p>
                      </div>
                    </motion.div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PRODUCT ENVIRONMENTS ─────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background:
            "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(79,70,229,0.1) 0%, transparent 60%), #080C14",
        }}
      >
        <BgLayer><FloatingOrbs /></BgLayer>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#22D3EE",
                  marginBottom: "0.75rem",
                }}
              >
                Where We Deploy
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                }}
              >
                Environments We Equip
              </h2>
              <p
                style={{
                  marginTop: "1rem",
                  color: "#64748B",
                  maxWidth: 460,
                  margin: "1rem auto 0",
                  lineHeight: 1.7,
                  fontSize: "0.875rem",
                }}
              >
                Our product categories support a wide range of physical and
                operational environments — from corporate headquarters to
                specialized site builds.
              </p>
            </div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {ENVIRONMENTS.map((env, i) => {
              const Icon = env.icon;
              return (
                <FadeUp key={env.label} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ scale: 1.03, borderColor: "rgba(6,182,212,0.28)" }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.85rem",
                      padding: "1.75rem 1rem",
                      borderRadius: "0.875rem",
                      background: "rgba(8,14,26,0.75)",
                      border: "1px solid rgba(51,65,85,0.4)",
                      textAlign: "center",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: "0.7rem",
                        background: "rgba(6,182,212,0.09)",
                        border: "1px solid rgba(6,182,212,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} color="#22D3EE" />
                    </div>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#94A3B8",
                        lineHeight: 1.4,
                      }}
                    >
                      {env.label}
                    </span>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CLOSING CTA ──────────────────────────────────────────────────── */}
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
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          <FadeUp>
            <div
              style={{
                position: "relative",
                padding: "4rem 3rem",
                borderRadius: "1.25rem",
                background:
                  "linear-gradient(135deg, rgba(8,145,178,0.12), rgba(79,70,229,0.12))",
                border: "1px solid rgba(6,182,212,0.14)",
                backdropFilter: "blur(16px)",
                overflow: "hidden",
              }}
            >
              {/* Top glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(6,182,212,0.1), transparent)",
                  pointerEvents: "none",
                }}
              />

              <p
                style={{
                  position: "relative",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#22D3EE",
                  marginBottom: "1rem",
                }}
              >
                Get Started
              </p>

              <h2
                style={{
                  position: "relative",
                  fontSize: "clamp(1.55rem, 2.8vw, 2.2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                  marginBottom: "1.25rem",
                  lineHeight: 1.25,
                }}
              >
                Looking for the Right Enterprise Technology Stack for Your
                Business?
              </h2>

              <p
                style={{
                  position: "relative",
                  color: "#64748B",
                  lineHeight: 1.78,
                  maxWidth: 520,
                  margin: "0 auto 2.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Connect with our product team to discuss requirements, get
                a right-fit hardware recommendation, and plan your
                deployment — from initial specification through to
                post-installation support.
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
                    background: "linear-gradient(135deg, #0891B2, #4F46E5)",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 0 28px rgba(6,182,212,0.32)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 42px rgba(6,182,212,0.48)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0 28px rgba(6,182,212,0.32)";
                  }}
                >
                  Speak with Our Product Team <ArrowRight size={15} />
                </button>
                <button
                  style={{
                    padding: "0.9rem 2rem",
                    background: "transparent",
                    color: "#CBD5E1",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "1px solid rgba(148,163,184,0.22)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(148,163,184,0.07)";
                    e.currentTarget.style.borderColor =
                      "rgba(148,163,184,0.42)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor =
                      "rgba(148,163,184,0.22)";
                  }}
                >
                  Request a Quote <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}