import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  GraduationCap,
  HeartPulse,
  Factory,
  Landmark,
  ShoppingBag,
  Banknote,
  Hotel,
  AlertTriangle,
  Layers,
  ShieldOff,
  ScanEye,
  Zap,
  TrendingDown,
  HardDrive,
  ArrowRight,
  ChevronRight,
  CircleDot,
  Network,
  Server,
  ShieldCheck,
  Camera,
  Monitor,
  BatteryCharging,
  Wifi,
  Cloud,
  CheckCircle2,
  MoveRight,
  MapPin,
  Clock,
  Lock,
  Users,
  GitBranch,
  BarChart2,
  LayoutDashboard,
  ClipboardCheck,
} from "lucide-react";
import {
  FloatingOrbs,
  TechGridParticles,
  GlowingMesh,
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

const INDUSTRIES = [
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Offices",
    accent: "#3B82F6",
    challenges: [
      "Multi-floor network reliability and coverage gaps",
      "Fragmented AV and meeting room setups",
      "Compliance and data security pressure",
    ],
    support:
      "Structured cabling, enterprise Wi-Fi, VLAN segmentation, meeting room AV, firewall deployment, and cloud integration for seamless hybrid work environments.",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education",
    accent: "#8B5CF6",
    challenges: [
      "High device density across classrooms and labs",
      "Outdated AV and projector infrastructure",
      "Campus-wide connectivity and security control",
    ],
    support:
      "High-density Wi-Fi, smart classroom panels and projectors, campus surveillance, network segmentation for student/staff zones, and UPS-backed server rooms.",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    accent: "#EF4444",
    challenges: [
      "Zero-downtime requirements for clinical systems",
      "Strict access control and data privacy",
      "IP-based surveillance in sensitive areas",
    ],
    support:
      "UPS power continuity, managed switches for clinical VLANs, access-controlled wireless, IP CCTV across wards, and firewall policies for HIPAA-sensitive data flows.",
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    accent: "#F97316",
    challenges: [
      "Harsh environments demanding ruggedized hardware",
      "Plant-floor to office connectivity gaps",
      "Surveillance coverage across large facilities",
    ],
    support:
      "Industrial-grade networking, OT/IT network separation, plant-wide CCTV, UPS for production line equipment, and cloud-ready infrastructure for operational visibility.",
  },
  {
    id: "government",
    icon: Landmark,
    title: "Government",
    accent: "#10B981",
    challenges: [
      "Strict compliance and data sovereignty requirements",
      "Secure inter-branch connectivity",
      "Physical security and surveillance mandates",
    ],
    support:
      "Compliant network architecture, site-to-site VPN, CCTV and access control integration, air-gapped or isolated VLAN design, and on-premise server infrastructure.",
  },
  {
    id: "retail",
    icon: ShoppingBag,
    title: "Retail",
    accent: "#06B6D4",
    challenges: [
      "Multi-branch network consistency and uptime",
      "POS system reliability and connectivity",
      "In-store surveillance and loss prevention",
    ],
    support:
      "Branch firewall and Wi-Fi standardization, POS-grade networking, IP CCTV and NVR deployment, LED digital signage, and centralized remote monitoring.",
  },
  {
    id: "bfsi",
    icon: Banknote,
    title: "BFSI",
    accent: "#F59E0B",
    challenges: [
      "Regulatory compliance for network and data infrastructure",
      "High-availability requirements for transaction systems",
      "Branch security and surveillance coverage",
    ],
    support:
      "Redundant network paths, next-gen firewall with policy enforcement, UPS for branch continuity, CCTV integration, secure remote access, and server infrastructure planning.",
  },
  {
    id: "hospitality",
    icon: Hotel,
    title: "Hospitality",
    accent: "#A855F7",
    challenges: [
      "Guest Wi-Fi segmentation and performance expectations",
      "Property-wide surveillance and access management",
      "AV and display systems across venues",
    ],
    support:
      "High-density guest wireless, staff/guest VLAN separation, CCTV across common areas and floors, meeting room AV, LED signage, and UPS for front-desk and PMS systems.",
  },
];

const CHALLENGES = [
  {
    icon: AlertTriangle,
    title: "Downtime Risk",
    problem: "Unplanned outages disrupting business-critical operations.",
    solution:
      "UPS-backed infrastructure, redundant network paths, and high-availability server configurations reduce exposure to unplanned downtime.",
  },
  {
    icon: Layers,
    title: "Fragmented Infrastructure",
    problem: "Siloed systems from different eras or vendors that don't integrate.",
    solution:
      "We audit, rationalize, and consolidate infrastructure onto coherent, interoperable platforms with full documentation.",
  },
  {
    icon: ShieldOff,
    title: "Security Exposure",
    problem: "Open perimeters, weak access control, and unmonitored endpoints.",
    solution:
      "Next-gen firewall deployment, endpoint protection, VLAN segmentation, and continuous policy enforcement close the most common attack surfaces.",
  },
  {
    icon: ScanEye,
    title: "Surveillance Blind Spots",
    problem: "Incomplete camera coverage leaving critical areas unmonitored.",
    solution:
      "Coverage mapping, IP camera selection, and NVR design ensure every zone is accounted for with appropriate retention and remote access.",
  },
  {
    icon: Zap,
    title: "Power Continuity",
    problem: "Equipment failure during outages with no clean shutdown or bridging.",
    solution:
      "Properly sized UPS systems with runtime planning protect servers, networking, and critical endpoints from power instability.",
  },
  {
    icon: TrendingDown,
    title: "Poor Scalability",
    problem: "Infrastructure that can't grow with the business without full replacement.",
    solution:
      "We design with headroom — switching capacity, wireless density, storage expansion, and cloud integration are all planned for future scale.",
  },
  {
    icon: HardDrive,
    title: "Legacy Environment Limitations",
    problem: "Aging hardware creating performance, support, and compatibility gaps.",
    solution:
      "Phased upgrade planning replaces legacy components without disrupting operations, with compatibility testing at every stage.",
  },
];

const ADAPT_POINTS = [
  { icon: MapPin, label: "Site Size & Layout", desc: "Floor count, building spread, and cable run requirements shape every network and cabling design." },
  { icon: Clock, label: "Uptime Requirements", desc: "SLA-critical environments get redundant links, UPS, and failover configuration as a baseline." },
  { icon: Lock, label: "Security Sensitivity", desc: "Regulated or high-risk sectors get tighter VLAN boundaries, access policies, and perimeter rules." },
  { icon: Users, label: "User Density", desc: "High-density environments get access point placement modelling and switching capacity headroom." },
  { icon: GitBranch, label: "Branch Connectivity", desc: "Multi-site operations get standardized branch stack designs with centralized management." },
  { icon: Camera, label: "Monitoring Needs", desc: "Coverage zone mapping drives camera selection, placement, and NVR/storage sizing." },
  { icon: Monitor, label: "Display & Collaboration", desc: "Room count, content type, and collaboration workflows drive AV and panel selection." },
  { icon: ClipboardCheck, label: "Compliance Constraints", desc: "Regulatory requirements are mapped at the design stage — not retrofitted after deployment." },
];

const USE_CASES = [
  {
    icon: Network,
    title: "Office Network Modernization",
    industry: "Corporate",
    accent: "#3B82F6",
    desc: "Replacing aging switches and access points with a managed, VLAN-segmented enterprise network across a multi-floor headquarters — with centralized visibility and guest Wi-Fi isolation.",
  },
  {
    icon: Camera,
    title: "Campus Surveillance Rollout",
    industry: "Education",
    accent: "#8B5CF6",
    desc: "End-to-end IP CCTV deployment across a university campus including outdoor PTZ cameras, indoor dome cameras, centralized NVR, and remote monitoring access for the security team.",
  },
  {
    icon: Monitor,
    title: "Smart Classroom Deployment",
    industry: "Education",
    accent: "#06B6D4",
    desc: "Interactive flat panels and short-throw projectors installed across classrooms and lecture halls with structured AV cabling, wall mounts, and teacher training on each system.",
  },
  {
    icon: ShieldCheck,
    title: "Branch Firewall & Wi-Fi Upgrade",
    industry: "Retail / BFSI",
    accent: "#EF4444",
    desc: "Standardized firewall and enterprise Wi-Fi stack deployed across 12 retail branches — with consistent security policy, POS VLAN isolation, and central management.",
  },
  {
    icon: Server,
    title: "Server Room Infrastructure Build",
    industry: "Government / Healthcare",
    accent: "#10B981",
    desc: "Full server room design and build including rack installation, structured patch cabling, managed switching, server commissioning, and documentation handover.",
  },
  {
    icon: BatteryCharging,
    title: "UPS Business Continuity Deployment",
    industry: "Manufacturing / BFSI",
    accent: "#F97316",
    desc: "Rack-mount and tower UPS systems deployed across critical equipment racks and server rooms with runtime calculations, bypass options, and scheduled load testing.",
  },
];

// ─── Animation helper ──────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Visual — industry icon constellation ────────────────────────────────

function HeroVisual() {
  const icons = [
    { Icon: Building2, x: 55, y: 20, c: "#3B82F6", d: 0 },
    { Icon: GraduationCap, x: 78, y: 45, c: "#8B5CF6", d: 0.08 },
    { Icon: HeartPulse, x: 65, y: 72, c: "#EF4444", d: 0.16 },
    { Icon: Factory, x: 38, y: 82, c: "#F97316", d: 0.24 },
    { Icon: Landmark, x: 14, y: 62, c: "#10B981", d: 0.32 },
    { Icon: ShoppingBag, x: 10, y: 32, c: "#06B6D4", d: 0.4 },
    { Icon: Banknote, x: 28, y: 12, c: "#F59E0B", d: 0.48 },
    { Icon: Hotel, x: 50, y: 48, c: "#A855F7", d: 0.56 },
  ];

  return (
    <div className="relative w-full" style={{ height: 340 }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          pointerEvents: "none",
        }}
      />
      {/* SVG lines between icons */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.12,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[
          [55, 20, 78, 45],
          [78, 45, 65, 72],
          [65, 72, 38, 82],
          [38, 82, 14, 62],
          [14, 62, 10, 32],
          [10, 32, 28, 12],
          [28, 12, 55, 20],
          [50, 48, 55, 20],
          [50, 48, 78, 45],
          [50, 48, 38, 82],
          [50, 48, 14, 62],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#818CF8"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        ))}
      </svg>

      {icons.map(({ Icon, x, y, c, d }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: d, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
            width: i === 7 ? 58 : 46,
            height: i === 7 ? 58 : 46,
            borderRadius: "0.75rem",
            background: `${c}14`,
            border: `1px solid ${c}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            boxShadow: i === 7 ? `0 0 28px ${c}22` : "none",
          }}
        >
          <Icon size={i === 7 ? 26 : 20} color={c} />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Industry Card ─────────────────────────────────────────────────────────────

function IndustryCard({ ind, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ind.icon;

  return (
    <FadeUp delay={index * 0.06}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.22 }}
        style={{
          padding: "1.75rem",
          borderRadius: "1rem",
          background: hovered ? "rgba(12,18,34,0.97)" : "rgba(8,14,26,0.8)",
          border: `1px solid ${hovered ? ind.accent + "40" : "rgba(51,65,85,0.45)"}`,
          backdropFilter: "blur(14px)",
          transition: "background 0.22s, border-color 0.22s, box-shadow 0.22s",
          boxShadow: hovered
            ? `0 0 32px ${ind.accent}14, 0 8px 32px rgba(0,0,0,0.4)`
            : "0 2px 14px rgba(0,0,0,0.25)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "default",
        }}
      >
        {/* Icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "0.7rem",
              background: `${ind.accent}14`,
              border: `1px solid ${ind.accent}2e`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={21} color={ind.accent} />
          </div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#F1F5F9",
              letterSpacing: "-0.01em",
            }}
          >
            {ind.title}
          </h3>
        </div>

        {/* Challenges */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#475569",
              marginBottom: "0.6rem",
            }}
          >
            Common Challenges
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {ind.challenges.map((c) => (
              <li
                key={c}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 7,
                  fontSize: "0.79rem",
                  color: "#64748B",
                  marginBottom: "0.4rem",
                  lineHeight: 1.5,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: ind.accent,
                    marginTop: 6,
                    flexShrink: 0,
                    opacity: 0.7,
                  }}
                />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, ${ind.accent}20, transparent)`,
            marginBottom: "1.25rem",
          }}
        />

        {/* How we support */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: ind.accent,
              opacity: 0.8,
              marginBottom: "0.55rem",
            }}
          >
            How We Support
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              lineHeight: 1.72,
              color: "#64748B",
            }}
          >
            {ind.support}
          </p>
        </div>
      </motion.div>
    </FadeUp>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function IndustriesPage() {
  return (
    <div
      style={{
        background: "#080C14",
        color: "#E2E8F0",
        fontFamily: "'Inter', 'DM Sans', system-ui, -apple-system, sans-serif",
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
          background: "#080C14",
        }}
      >
        {/* FloatingOrbs background — soft, varied, fits diverse industries theme */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        >
          <FloatingOrbs />
        </div>

        {/* Line grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
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
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3.5rem",
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
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.25)",
                color: "#A5B4FC",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <CircleDot size={9} />
              Industries We Support
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{
                fontSize: "clamp(1.9rem, 3.2vw, 2.85rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                color: "#F1F5F9",
              }}
            >
              Infrastructure Solutions{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #818CF8, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Tailored to the Operational Needs
              </span>{" "}
              of Diverse Industries
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
                maxWidth: 500,
              }}
            >
              Deep Mind IT Solutions adapts IT, networking, cloud, surveillance,
              display, security, and power continuity infrastructure to the
              specific operational demands of each industry — because a hospital,
              a retail chain, and a government office each face entirely different
              challenges.
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
                  background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 0 24px rgba(99,102,241,0.3)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 0 38px rgba(99,102,241,0.46)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.3)";
                }}
              >
                Discuss Your Industry Requirements <ArrowRight size={15} />
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
                  e.currentTarget.style.background = "rgba(148,163,184,0.07)";
                  e.currentTarget.style.borderColor = "rgba(148,163,184,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(148,163,184,0.2)";
                }}
              >
                Explore Services <ChevronRight size={15} />
              </button>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* ── 2. INDUSTRIES GRID ──────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "6rem", paddingBottom: "6rem", background: "#060A12" }}>
        <BgLayer><TechGridParticles /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#818CF8",
                  marginBottom: "0.75rem",
                }}
              >
                Sector Coverage
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                }}
              >
                Eight Industries, One Integrated Partner
              </h2>
              <p
                style={{
                  marginTop: "1rem",
                  color: "#64748B",
                  maxWidth: 480,
                  margin: "1rem auto 0",
                  lineHeight: 1.7,
                  fontSize: "0.875rem",
                }}
              >
                From enterprise offices to government facilities, Deep Mind
                delivers infrastructure solutions shaped by each sector's
                real-world operational constraints.
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
            {INDUSTRIES.map((ind, i) => (
              <IndustryCard key={ind.id} ind={ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CROSS-INDUSTRY CHALLENGES ────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background: "#080C14",
        }}
      >
        <BgLayer><GlowingMesh /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#818CF8",
                  marginBottom: "0.75rem",
                }}
              >
                Common Pain Points
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
                    maxWidth: 480,
                    lineHeight: 1.2,
                  }}
                >
                  Infrastructure Challenges We Address Across Every Sector
                </h2>
                <p
                  style={{
                    color: "#64748B",
                    maxWidth: 360,
                    lineHeight: 1.75,
                    fontSize: "0.875rem",
                  }}
                >
                  The specific form varies by industry — but the underlying
                  infrastructure problems repeat. We've built systematic
                  responses to each one.
                </p>
              </div>
            </div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {CHALLENGES.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <FadeUp key={ch.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      padding: "1.6rem",
                      borderRadius: "0.875rem",
                      background: "rgba(8,14,26,0.75)",
                      border: "1px solid rgba(51,65,85,0.4)",
                      backdropFilter: "blur(10px)",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(51,65,85,0.4)";
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "0.6rem",
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <Icon size={19} color="#818CF8" />
                    </div>
                    <h3
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        color: "#CBD5E1",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {ch.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "#475569",
                        lineHeight: 1.65,
                        marginBottom: "0.85rem",
                      }}
                    >
                      {ch.problem}
                    </p>
                    <div
                      style={{
                        height: 1,
                        background: "rgba(99,102,241,0.12)",
                        marginBottom: "0.85rem",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "#64748B",
                        lineHeight: 1.7,
                      }}
                    >
                      {ch.solution}
                    </p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. SOLUTION APPROACH ────────────────────────────────────────────── */}
      <section style={{ paddingTop: "6rem", paddingBottom: "6rem", background: "#060A12" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#818CF8",
                  marginBottom: "0.75rem",
                }}
              >
                Methodology
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                  maxWidth: 620,
                  margin: "0 auto",
                  lineHeight: 1.2,
                }}
              >
                How We Adapt Solutions to Real Operating Environments
              </h2>
            </div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            {ADAPT_POINTS.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <FadeUp key={pt.label} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      padding: "1.5rem",
                      borderRadius: "0.875rem",
                      background: "rgba(8,14,26,0.7)",
                      border: "1px solid rgba(51,65,85,0.38)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "0.55rem",
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={17} color="#818CF8" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: "#CBD5E1",
                          marginBottom: "0.35rem",
                        }}
                      >
                        {pt.label}
                      </p>
                      <p
                        style={{
                          fontSize: "0.78rem",
                          color: "#475569",
                          lineHeight: 1.68,
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
      </section>

      {/* ── 5. USE CASE SNAPSHOTS ────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          background:
            "radial-gradient(ellipse 60% 50% at 75% 50%, rgba(168,85,247,0.09) 0%, transparent 65%), #080C14",
        }}
      >
        <BgLayer><CircuitBoard /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#818CF8",
                  marginBottom: "0.75rem",
                }}
              >
                Real-World Applications
              </p>
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
                Industry Use Case Snapshots
              </h2>
            </div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {USE_CASES.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <FadeUp key={uc.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      padding: "1.75rem",
                      borderRadius: "1rem",
                      background: "rgba(8,14,26,0.8)",
                      border: "1px solid rgba(51,65,85,0.4)",
                      backdropFilter: "blur(12px)",
                      transition: "border-color 0.22s, box-shadow 0.22s",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = uc.accent + "38";
                      e.currentTarget.style.boxShadow = `0 0 28px ${uc.accent}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(51,65,85,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Accent top bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: `linear-gradient(90deg, ${uc.accent}, transparent)`,
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "0.6rem",
                          background: `${uc.accent}14`,
                          border: `1px solid ${uc.accent}28`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} color={uc.accent} />
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "0.92rem",
                            fontWeight: 700,
                            color: "#E2E8F0",
                            lineHeight: 1.3,
                          }}
                        >
                          {uc.title}
                        </p>
                        <p
                          style={{
                            fontSize: "0.7rem",
                            color: uc.accent,
                            fontWeight: 600,
                            marginTop: 2,
                          }}
                        >
                          {uc.industry}
                        </p>
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: "0.8rem",
                        lineHeight: 1.72,
                        color: "#64748B",
                      }}
                    >
                      {uc.desc}
                    </p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CLOSING CTA ──────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "6rem", paddingBottom: "7rem", background: "#060A12" }}>
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
                  "linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.12))",
                border: "1px solid rgba(99,102,241,0.16)",
                backdropFilter: "blur(16px)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(99,102,241,0.12), transparent)",
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
                  color: "#818CF8",
                  marginBottom: "1rem",
                }}
              >
                Get in Touch
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
                Need Infrastructure That Fits Your Industry's Real-World
                Requirements?
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
                Whether you're in healthcare, government, education, retail, or
                financial services — our engineers will map the right
                infrastructure to your sector's specific uptime, security,
                compliance, and connectivity demands.
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
                    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 0 28px rgba(99,102,241,0.32)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 0 42px rgba(99,102,241,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 0 28px rgba(99,102,241,0.32)";
                  }}
                >
                  Discuss Your Use Case <ArrowRight size={15} />
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
                    e.currentTarget.style.background = "rgba(148,163,184,0.07)";
                    e.currentTarget.style.borderColor = "rgba(148,163,184,0.42)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(148,163,184,0.22)";
                  }}
                >
                  Contact Deep Mind <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}