import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";
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

function BrandCard({ brand, accent, index }) {
  return (
    <FadeUp delay={index * 0.06}>
      <div
        style={{
          position: "relative",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "rgba(8,14,26,0.8)",
          border: "1px solid rgba(51,65,85,0.45)",
          backdropFilter: "blur(14px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        }}
        className="dm-brand-card"
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            background: "#0B1018",
            borderBottom: `1px solid ${accent}30`,
            overflow: "hidden",
          }}
        >
          <img
            src={brand.image}
            alt={brand.name}
            loading="lazy"
            decoding="async"
            width="640"
            height="360"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#F1F5F9",
              letterSpacing: "-0.01em",
            }}
          >
            {brand.name}
          </h3>
          {brand.tagline && (
            <p
              style={{
                fontSize: "0.74rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              {brand.tagline}
            </p>
          )}
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94A3B8" }}>
            {brand.desc}
          </p>
        </div>
      </div>
    </FadeUp>
  );
}

export default function ProductCategoryTemplate({
  eyebrow = "Product Category",
  title,
  description,
  Icon,
  accent = "#3B82F6",
  heroBg = "network",
  brandsBg = "techgrid",
  brands = [],
  highlights = [],
}) {
  const HeroBg = BG_MAP[heroBg] || NetworkParticles;
  const BrandsBg = BG_MAP[brandsBg] || TechGridParticles;

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
        <BgLayer>
          <HeroBg />
        </BgLayer>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(rgba(148,163,184,0.055) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
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
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "0.5rem",
                  background: `${accent}1f`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={15} color={accent} />
              </span>
            )}
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontSize: "clamp(2rem, 4.2vw, 3.1rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#F8FAFC",
              marginBottom: "1.25rem",
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "1.02rem",
              lineHeight: 1.75,
              color: "#94A3B8",
              maxWidth: 680,
              margin: "0 auto 2.25rem",
            }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}
          >
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.6rem",
                borderRadius: "0.7rem",
                fontWeight: 600,
                fontSize: "0.92rem",
                color: "#fff",
                background: `linear-gradient(135deg, ${accent}, #818CF8)`,
                textDecoration: "none",
                boxShadow: `0 14px 32px -12px ${accent}88`,
              }}
            >
              <PhoneCall size={16} />
              Talk to Our Team
            </a>
            <a
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.6rem",
                borderRadius: "0.7rem",
                fontWeight: 600,
                fontSize: "0.92rem",
                color: "#E2E8F0",
                border: "1px solid rgba(148,163,184,0.25)",
                background: "rgba(255,255,255,0.03)",
                textDecoration: "none",
              }}
            >
              All Product Categories
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                marginTop: "2.75rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              {highlights.map((h) => (
                <span
                  key={h}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 0.9rem",
                    borderRadius: 999,
                    fontSize: "0.78rem",
                    color: "#C4C9D6",
                    border: "1px solid rgba(148,163,184,0.18)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <CheckCircle2 size={13} color={accent} />
                  {h}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── BRANDS / PRODUCT LINEUP ─────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "7rem",
          background: "#060A12",
        }}
      >
        <BgLayer>
          <BrandsBg />
        </BgLayer>
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
                  color: accent,
                  marginBottom: "0.75rem",
                }}
              >
                Brands We Work With
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                }}
              >
                Vendor-Neutral, Right-Fit Sourcing
              </h2>
              <p
                style={{
                  marginTop: "1rem",
                  color: "#64748B",
                  maxWidth: 520,
                  margin: "1rem auto 0",
                  lineHeight: 1.7,
                  fontSize: "0.9rem",
                }}
              >
                We supply, configure, and support equipment from the brands
                below, matched to your environment rather than to a single
                vendor relationship.
              </p>
            </div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {brands.map((brand, i) => (
              <BrandCard key={brand.name} brand={brand} accent={accent} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "6rem",
          paddingBottom: "7rem",
          background: "#080C14",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 860,
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
                background: `linear-gradient(135deg, ${accent}1f, rgba(124,58,237,0.12))`,
                border: `1px solid ${accent}28`,
                backdropFilter: "blur(16px)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse 60% 45% at 50% 0%, ${accent}1f, transparent)`,
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
                  color: accent,
                  marginBottom: "1rem",
                }}
              >
                Get a Quote
              </p>
              <h2
                style={{
                  position: "relative",
                  fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F1F5F9",
                  marginBottom: "1.15rem",
                  lineHeight: 1.25,
                }}
              >
                Need {title} for Your Environment?
              </h2>
              <p
                style={{
                  position: "relative",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "#AAB1C2",
                  maxWidth: 540,
                  margin: "0 auto 2rem",
                }}
              >
                Tell us your requirements and site conditions — we'll
                recommend the right combination of hardware and handle
                sourcing, installation, and support end to end.
              </p>
              <a
                href="/contact"
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.9rem 1.8rem",
                  borderRadius: "0.7rem",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  color: "#fff",
                  background: `linear-gradient(135deg, ${accent}, #818CF8)`,
                  textDecoration: "none",
                  boxShadow: `0 14px 32px -12px ${accent}88`,
                }}
              >
                <PhoneCall size={16} />
                Request a Quote
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
