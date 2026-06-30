import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  NetworkParticles,
  TechGridParticles,
  GlowingMesh,
  CircuitBoard,
} from "../backgrounds/backgrounds";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  ChevronRight,
  CircleDot,
  Clock3,
  Cpu,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const OPEN_ROLES = [
  {
    title: "Lead Network Engineer",
    type: "Full-time",
    location: "Mumbai",
    summary:
      "Own enterprise network modernization programs from design through deployment for high-growth clients.",
    tags: ["Routing", "Switching", "Wi-Fi"],
    accent: "#3B82F6",
  },
  {
    title: "Cloud Infrastructure Specialist",
    type: "Full-time",
    location: "Remote",
    summary:
      "Architect secure, scalable cloud environments and help clients move critical workloads with confidence.",
    tags: ["Azure", "Migration", "Automation"],
    accent: "#06B6D4",
  },
  {
    title: "Cyber Security Consultant",
    type: "Full-time",
    location: "Bengaluru",
    summary:
      "Evaluate risk, implement controls, and lead security hardening across modern organizations.",
    tags: ["SOC", "Firewall", "Compliance"],
    accent: "#EF4444",
  },
  {
    title: "Project Delivery Manager",
    type: "Full-time",
    location: "Pune",
    summary:
      "Coordinate cross-functional delivery for infrastructure, AV, and software initiatives with a customer-first mindset.",
    tags: ["Delivery", "Stakeholder", "Planning"],
    accent: "#8B5CF6",
  },
];

const BENEFITS = [
  {
    icon: Sparkles,
    title: "High-impact work",
    desc: "Shape real client environments instead of shipping generic services.",
  },
  {
    icon: Users,
    title: "Mentorship-led growth",
    desc: "Work alongside senior engineers and delivery leaders who invest in your development.",
  },
  {
    icon: ShieldCheck,
    title: "Balanced ownership",
    desc: "Autonomy, accountability, and a team that trusts you to lead from day one.",
  },
  {
    icon: Zap,
    title: "Fast-moving culture",
    desc: "Tackle modern infrastructure challenges with speed and precision.",
  },
];

const WHY_JOIN = [
  "Work across networking, cloud, security, and managed support engagements.",
  "Join a company known for disciplined delivery and long-term client partnerships.",
  "Grow through exposure to enterprise-grade projects and modern technology stacks.",
  "Contribute to a culture of curiosity, accountability, and continuous improvement.",
];

const PROCESS = [
  {
    title: "Share your profile",
    desc: "Tell us about your experience, strengths, and the kind of work you want to build.",
  },
  {
    title: "Meet the team",
    desc: "A short conversation with our leadership and delivery team to understand fit and ambition.",
  },
  {
    title: "Join the mission",
    desc: "If aligned, we move quickly into onboarding and begin contributing on meaningful work.",
  },
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
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

export default function CareersPage() {
  return (
    <div
      style={{
        background: "#080C14",
        color: "#E2E8F0",
        fontFamily: "'Inter', 'DM Sans', system-ui, -apple-system, sans-serif",
        overflowX: "hidden",
      }}
    >
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "7rem",
          paddingBottom: "5rem",
          background:
            "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(59,130,246,0.16) 0%, transparent 65%), #080C14",
        }}
      >
        <BgLayer><NetworkParticles /></BgLayer>
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
              gap: "3.5rem",
              alignItems: "center",
            }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: "1.25rem",
                  padding: "0.35rem 1rem",
                  borderRadius: 999,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  color: "#93C5FD",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <CircleDot size={9} /> Careers at Deep Mind
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                style={{
                  fontSize: "clamp(2rem, 3.7vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  color: "#F1F5F9",
                  marginBottom: "1.25rem",
                }}
              >
                Build the next generation of enterprise technology solutions with us.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#94A3B8",
                  maxWidth: 560,
                  marginBottom: "2rem",
                }}
              >
                We are hiring engineers, consultants, and delivery professionals who want to work on meaningful infrastructure, security, and cloud engagements for ambitious organizations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
              >
                <button
                  style={{
                    padding: "0.9rem 1.75rem",
                    background: "linear-gradient(135deg, #2563EB, #4F46E5)",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 0 24px rgba(59,130,246,0.28)",
                  }}
                >
                  View Open Roles <ArrowRight size={15} />
                </button>
                <button
                  style={{
                    padding: "0.9rem 1.75rem",
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
                  }}
                >
                  Send Your CV <Send size={15} />
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              <div
                style={{
                  position: "relative",
                  padding: "2rem",
                  borderRadius: "1.25rem",
                  background: "rgba(8,14,26,0.82)",
                  border: "1px solid rgba(51,65,85,0.45)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.28)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {[
                    { label: "Projects delivered", value: "40+" },
                    { label: "Global locations", value: "6" },
                    { label: "Average tenure", value: "4 yrs" },
                    { label: "Hiring focus", value: "Core tech" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        padding: "1rem",
                        borderRadius: "0.8rem",
                        background: "rgba(15,23,42,0.78)",
                        border: "1px solid rgba(51,65,85,0.4)",
                      }}
                    >
                      <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#F8FAFC" }}>{item.value}</p>
                      <p style={{ fontSize: "0.76rem", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.09em", marginTop: "0.35rem" }}>{item.label}</p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1rem 1.1rem",
                    borderRadius: "0.875rem",
                    background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(129,140,248,0.08))",
                    border: "1px solid rgba(99,179,237,0.14)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.6rem" }}>
                    <Building2 size={16} color="#60A5FA" />
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#93C5FD", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Why people stay
                    </span>
                  </div>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#CBD5E1" }}>
                    We combine consulting depth with delivery ownership, giving you a platform to solve hard problems and grow quickly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem", background: "#060A12" }}>
        <BgLayer><TechGridParticles /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "0.75rem" }}>
                What you’ll experience
              </p>
              <h2 style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9" }}>
                A team built for depth, momentum, and long-term growth
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem" }}>
            {BENEFITS.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.title} delay={index * 0.06}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      padding: "1.4rem",
                      borderRadius: "0.875rem",
                      background: "rgba(8,14,26,0.8)",
                      border: "1px solid rgba(51,65,85,0.4)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: "0.6rem", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.95rem" }}>
                      <Icon size={18} color="#60A5FA" />
                    </div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#CBD5E1", marginBottom: "0.45rem" }}>{item.title}</h3>
                    <p style={{ fontSize: "0.8rem", lineHeight: 1.7, color: "#475569" }}>{item.desc}</p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem", background: "radial-gradient(ellipse 65% 55% at 70% 40%, rgba(6,182,212,0.1) 0%, transparent 60%), #080C14" }}>
        <BgLayer><GlowingMesh /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ marginBottom: "3rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#22D3EE", marginBottom: "0.75rem" }}>
                Open roles
              </p>
              <h2 style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9" }}>
                Join a team that values craft, ownership, and delivery excellence
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {OPEN_ROLES.map((role, index) => (
              <FadeUp key={role.title} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    background: "rgba(8,14,26,0.8)",
                    border: "1px solid rgba(51,65,85,0.42)",
                    backdropFilter: "blur(12px)",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ width: 42, height: 42, borderRadius: "0.6rem", background: `${role.accent}16`, border: `1px solid ${role.accent}28`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Briefcase size={18} color={role.accent} />
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{role.type}</span>
                  </div>

                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F8FAFC", marginBottom: "0.6rem" }}>{role.title}</h3>
                  <p style={{ fontSize: "0.84rem", lineHeight: 1.7, color: "#64748B", marginBottom: "1rem" }}>{role.summary}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                    {role.tags.map((tag) => (
                      <span key={tag} style={{ padding: "0.35rem 0.6rem", borderRadius: 999, background: "rgba(15,23,42,0.92)", color: "#94A3B8", fontSize: "0.72rem" }}>{tag}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#CBD5E1", fontSize: "0.8rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={13} color={role.accent} /> {role.location}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock3 size={13} color={role.accent} /> Hybrid</span>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: "5rem", paddingBottom: "5rem", background: "#060A12" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <FadeUp>
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "0.75rem" }}>
                  Why Deep Mind
                </p>
                <h2 style={{ fontSize: "clamp(1.65rem, 2.6vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                  We are building a company where technical depth and professional growth go hand in hand.
                </h2>
                <p style={{ color: "#64748B", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                  Our teams work on complex infrastructure, security, and cloud environments where attention to detail and calm delivery matter as much as technical ability.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {WHY_JOIN.map((point) => (
                    <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <BadgeCheck size={16} color="#34D399" style={{ marginTop: 3, flexShrink: 0 }} />
                      <span style={{ color: "#CBD5E1", fontSize: "0.9rem", lineHeight: 1.6 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div style={{ padding: "1.5rem", borderRadius: "1rem", background: "rgba(8,14,26,0.8)", border: "1px solid rgba(51,65,85,0.42)", backdropFilter: "blur(12px)" }}>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {PROCESS.map((step, index) => (
                    <div key={step.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "#93C5FD", flexShrink: 0 }}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#F8FAFC", marginBottom: "0.35rem" }}>{step.title}</h3>
                        <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "#64748B" }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "7rem", background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,70,229,0.1) 0%, transparent 65%), #080C14" }}>
        <BgLayer><CircuitBoard /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <FadeUp>
            <div style={{ position: "relative", padding: "4rem 2.5rem", borderRadius: "1.25rem", background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))", border: "1px solid rgba(99,179,237,0.14)", backdropFilter: "blur(16px)", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(59,130,246,0.12), transparent)", pointerEvents: "none" }} />

              <p style={{ position: "relative", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "1rem" }}>
                Start your next chapter
              </p>
              <h2 style={{ position: "relative", fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9", marginBottom: "1.15rem", lineHeight: 1.25 }}>
                Ready to build with a team that values technical excellence and practical delivery?
              </h2>
              <p style={{ position: "relative", color: "#64748B", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 2rem", fontSize: "0.95rem" }}>
                Share your background and the kind of work you want to own. We will review your application and get back to you if there is a fit.
              </p>

              <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                <button style={{ padding: "0.9rem 1.85rem", background: "linear-gradient(135deg, #2563EB, #4F46E5)", color: "#fff", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.9rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 0 26px rgba(59,130,246,0.3)" }}>
                  Apply Now <ArrowRight size={15} />
                </button>
                <a href="mailto:careers@deepminditsolutions.com" style={{ padding: "0.9rem 1.85rem", background: "transparent", color: "#CBD5E1", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.9rem", border: "1px solid rgba(148,163,184,0.2)", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                  Email Careers <ChevronRight size={15} />
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
