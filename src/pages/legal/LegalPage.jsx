import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, CircleDot } from "lucide-react";
import { NetworkParticles } from "../../backgrounds/backgrounds";

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

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

/**
 * LegalPage
 * Shared layout for Privacy Policy & Terms and Conditions — keeps the same
 * dark / signal-blue visual language as the rest of the site, with a
 * structured, easy-to-scan article body for legal copy.
 */
export default function LegalPage({ eyebrow, title, intro, updatedOn, sections }) {
  return (
    <div
      style={{
        background: "#080C14",
        color: "#E2E8F0",
        fontFamily: "'Inter', 'DM Sans', system-ui, -apple-system, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Hero */}
      <section
        style={{
          position: "relative",
          paddingTop: "9rem",
          paddingBottom: "4.5rem",
          background:
            "radial-gradient(ellipse 70% 60% at 20% 20%, rgba(59,130,246,0.16) 0%, transparent 65%), #080C14",
          borderBottom: "1px solid rgba(51,65,85,0.4)",
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

        <div style={{ position: "relative", zIndex: 10, maxWidth: 880, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginBottom: "1.75rem",
                color: "#94A3B8",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={14} /> Back to home
            </Link>

            <div
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
              <CircleDot size={9} /> {eyebrow}
            </div>

            <h1
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)",
                fontWeight: 700,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                color: "#F1F5F9",
                marginBottom: "1rem",
              }}
            >
              {title}
            </h1>

            <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 680, marginBottom: "0.75rem" }}>
              {intro}
            </p>
            <p style={{ color: "#64748B", fontSize: "0.82rem" }}>Last updated: {updatedOn}</p>
          </FadeUp>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "4.5rem 1.5rem 6rem", background: "#080C14" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          {sections.map((section, index) => (
            <FadeUp key={section.heading} delay={Math.min(index * 0.04, 0.3)}>
              <div
                style={{
                  paddingBottom: "2.25rem",
                  marginBottom: "2.25rem",
                  borderBottom:
                    index === sections.length - 1 ? "none" : "1px solid rgba(51,65,85,0.35)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#F1F5F9",
                    marginBottom: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "0.5rem",
                      background: "rgba(59,130,246,0.12)",
                      border: "1px solid rgba(59,130,246,0.22)",
                      color: "#93C5FD",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </span>
                  {section.heading}
                </h2>

                {section.paragraphs?.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      color: "#94A3B8",
                      fontSize: "0.92rem",
                      lineHeight: 1.85,
                      marginBottom: i === section.paragraphs.length - 1 && !section.list ? 0 : "0.9rem",
                    }}
                  >
                    {para}
                  </p>
                ))}

                {section.list && (
                  <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.2rem", display: "grid", gap: "0.55rem" }}>
                    {section.list.map((item, i) => (
                      <li key={i} style={{ color: "#94A3B8", fontSize: "0.9rem", lineHeight: 1.75 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeUp>
          ))}

          <FadeUp>
            <div
              style={{
                marginTop: "1rem",
                padding: "1.5rem 1.75rem",
                borderRadius: "1rem",
                background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))",
                border: "1px solid rgba(99,179,237,0.16)",
              }}
            >
              <p style={{ color: "#CBD5E1", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "0.85rem" }}>
                Questions about this page? Reach out to our team and we will be happy to help.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <a
                  href="mailto:sales@deepminditsolutions.com"
                  style={{ color: "#60A5FA", fontSize: "0.88rem", fontWeight: 600, textDecoration: "none" }}
                >
                  sales@deepminditsolutions.com
                </a>
                <Link to="/contact" style={{ color: "#60A5FA", fontSize: "0.88rem", fontWeight: 600, textDecoration: "none" }}>
                  Visit Contact page →
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
