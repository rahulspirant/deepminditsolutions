import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, PhoneCall, CheckCircle2, CalendarCheck } from "lucide-react";
import {
  NetworkParticles,
  TechGridParticles,
  GlowingMesh,
  FloatingOrbs,
  CircuitBoard,
} from "../../backgrounds/backgrounds";

const BG_MAP = {
  network: NetworkParticles,
  techgrid: TechGridParticles,
  mesh: GlowingMesh,
  orbs: FloatingOrbs,
  circuit: CircuitBoard,
};

function BgLayer({ children }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ServiceCategoryTemplate
 * Dedicated page layout for a single service (Network Infrastructure,
 * Cloud Solutions, Cyber Security, etc.) — mirrors the visual language of
 * ProductCategoryTemplate so Products and Services feel like one family.
 */
export default function ServiceCategoryTemplate({
  eyebrow = "Service",
  title,
  description,
  Icon,
  accent = "#3B82F6",
  heroBg = "network",
  offerings = [],
  processSteps = [],
  whyCards = [],
  highlights = [],
}) {
  const HeroBg = BG_MAP[heroBg] || NetworkParticles;

  return (
    <div
      style={{
        background: "#080C14",
        color: "#E2E8F0",
        fontFamily: "'Inter', 'DM Sans', system-ui, -apple-system, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "8rem",
          paddingBottom: "5rem",
          background: `radial-gradient(ellipse 70% 60% at 25% 30%, ${accent}22 0%, transparent 65%), #080C14`,
        }}
      >
        <BgLayer><HeroBg /></BgLayer>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(rgba(148,163,184,0.055) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "1.75rem",
              padding: "0.55rem 1.1rem",
              borderRadius: 999,
              border: `1px solid ${accent}35`,
              background: `${accent}12`,
            }}
          >
            {Icon && (
              <span style={{ width: 28, height: 28, borderRadius: "0.5rem", background: `${accent}1f`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={15} color={accent} />
              </span>
            )}
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent }}>
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.1rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#F8FAFC", marginBottom: "1.25rem" }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "#94A3B8", maxWidth: 680, margin: "0 auto 2.25rem" }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}
          >
            <Link
              to="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.85rem 1.6rem", borderRadius: "0.7rem", fontWeight: 600, fontSize: "0.92rem",
                color: "#fff", background: `linear-gradient(135deg, ${accent}, #818CF8)`,
                textDecoration: "none", boxShadow: `0 14px 32px -12px ${accent}88`,
              }}
            >
              <PhoneCall size={16} /> Talk to Our Team
            </Link>
            <Link
              to="/services"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.85rem 1.6rem", borderRadius: "0.7rem", fontWeight: 600, fontSize: "0.92rem",
                color: "#E2E8F0", border: "1px solid rgba(148,163,184,0.25)", background: "rgba(255,255,255,0.03)",
                textDecoration: "none",
              }}
            >
              All Services <ArrowRight size={16} />
            </Link>
          </motion.div>

          {highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ marginTop: "2.75rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}
            >
              {highlights.map((h) => (
                <span
                  key={h}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.5rem 0.9rem", borderRadius: 999, fontSize: "0.78rem",
                    color: "#C4C9D6", border: "1px solid rgba(148,163,184,0.18)", background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <CheckCircle2 size={13} color={accent} /> {h}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "6rem", paddingBottom: "6rem", background: "#060A12" }}>
        <BgLayer><TechGridParticles /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, marginBottom: "0.75rem" }}>
                What's Included
              </p>
              <h2 style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9" }}>
                Everything needed to deliver {title}
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {offerings.map((item, index) => (
              <FadeUp key={item.title} delay={index * 0.05}>
                <div
                  style={{
                    padding: "1.6rem", borderRadius: "1rem", height: "100%",
                    background: "rgba(8,14,26,0.8)", border: "1px solid rgba(51,65,85,0.45)", backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: "0.6rem", marginBottom: "1rem",
                      background: `${accent}16`, border: `1px solid ${accent}28`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <CheckCircle2 size={18} color={accent} />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F8FAFC", marginBottom: "0.55rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.86rem", lineHeight: 1.75, color: "#64748B" }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      {processSteps.length > 0 && (
        <section style={{ position: "relative", overflow: "hidden", paddingTop: "6rem", paddingBottom: "6rem", background: `radial-gradient(ellipse 65% 55% at 70% 40%, ${accent}10 0%, transparent 60%), #080C14` }}>
          <BgLayer><GlowingMesh /></BgLayer>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: "0 1.5rem" }}>
            <FadeUp>
              <div style={{ marginBottom: "3rem" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#22D3EE", marginBottom: "0.75rem" }}>
                  How we deliver it
                </p>
                <h2 style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9" }}>
                  A disciplined, low-risk delivery process
                </h2>
              </div>
            </FadeUp>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <FadeUp key={step.title} delay={index * 0.06}>
                    <div
                      style={{
                        padding: "1.5rem", borderRadius: "1rem", height: "100%",
                        background: "rgba(8,14,26,0.8)", border: "1px solid rgba(51,65,85,0.42)", backdropFilter: "blur(12px)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>{step.num}</span>
                        {StepIcon && (
                          <span style={{ width: 32, height: 32, borderRadius: "0.5rem", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <StepIcon size={15} color="#60A5FA" />
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#F1F5F9", marginBottom: "0.5rem" }}>{step.title}</h3>
                      <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "#64748B" }}>{step.desc}</p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      {whyCards.length > 0 && (
        <section style={{ paddingTop: "6rem", paddingBottom: "6rem", background: "#060A12" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 1.5rem" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, marginBottom: "0.75rem" }}>
                  Why Deep Mind
                </p>
                <h2 style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9" }}>
                  Built around your business, not a product list
                </h2>
              </div>
            </FadeUp>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {whyCards.map((card, index) => {
                const CardIcon = card.icon;
                return (
                  <FadeUp key={card.title} delay={index * 0.05}>
                    <div style={{ padding: "1.4rem", borderRadius: "0.875rem", background: "rgba(8,14,26,0.8)", border: "1px solid rgba(51,65,85,0.4)", backdropFilter: "blur(10px)" }}>
                      <div style={{ width: 42, height: 42, borderRadius: "0.6rem", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.95rem" }}>
                        {CardIcon && <CardIcon size={18} color="#60A5FA" />}
                      </div>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#CBD5E1", marginBottom: "0.45rem" }}>{card.title}</h3>
                      <p style={{ fontSize: "0.8rem", lineHeight: 1.7, color: "#475569" }}>{card.desc}</p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "7rem", background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}1a 0%, transparent 65%), #080C14` }}>
        <BgLayer><CircuitBoard /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <FadeUp>
            <div
              style={{
                position: "relative", padding: "4rem 2.5rem", borderRadius: "1.25rem",
                background: `linear-gradient(135deg, ${accent}1f, rgba(124,58,237,0.12))`,
                border: "1px solid rgba(99,179,237,0.14)", backdropFilter: "blur(16px)", overflow: "hidden",
              }}
            >
              <p style={{ position: "relative", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, marginBottom: "1rem" }}>
                Ready when you are
              </p>
              <h2 style={{ position: "relative", fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9", marginBottom: "1.15rem", lineHeight: 1.25 }}>
                Let's talk about {title.toLowerCase()} for your business
              </h2>
              <p style={{ position: "relative", color: "#64748B", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 2rem", fontSize: "0.95rem" }}>
                Share a few details about your environment and goals — our team will get back to you with a clear, practical plan.
              </p>
              <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                <Link
                  to="/contact"
                  style={{
                    padding: "0.9rem 1.85rem", background: `linear-gradient(135deg, ${accent}, #4F46E5)`, color: "#fff",
                    borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: 8,
                    boxShadow: `0 0 26px ${accent}4d`, textDecoration: "none",
                  }}
                >
                  Talk to an Expert <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact?type=demo"
                  style={{
                    padding: "0.9rem 1.85rem", background: "transparent", color: "#CBD5E1", borderRadius: "0.5rem",
                    fontWeight: 600, fontSize: "0.9rem", border: "1px solid rgba(148,163,184,0.2)", display: "inline-flex", alignItems: "center", gap: 8,
                    textDecoration: "none",
                  }}
                >
                  <CalendarCheck size={15} /> Book a Demo
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
