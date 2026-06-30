import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./FinalCTASection.css";
import { NetworkParticles } from "../../backgrounds/backgrounds";

/**
 * FinalCTASection
 * Closing CTA for the Deep Mind IT Solutions homepage.
 */

const trustPoints = [
  { id: "response", label: "Response within 1 business day" },
  { id: "consultation", label: "No-obligation consultation" },
  { id: "deployment", label: "PAN-India deployment support" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const riseVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const buttonRowVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.45 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const trustRowVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.75 },
  },
};

const trustItemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "backOut" },
  },
};

function StatusIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="dm-trust-icon">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
      <path
        d="M6 10.2l2.6 2.6L14.2 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FinalCTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="dm-cta-section" aria-labelledby="final-cta-heading">
      {/* NetworkParticles canvas — bookends the page, echoes the hero's energy */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <NetworkParticles />
      </div>

      {/* Background layers */}
      <div className="dm-cta-bg" aria-hidden="true">
        <div className="dm-cta-grid" />
        {!shouldReduceMotion && <div className="dm-cta-beam" />}
        <div className="dm-cta-spotlight" />
        <div className="dm-cta-vignette" />
      </div>

      <motion.div
        className="dm-cta-container"
        style={{ position: "relative", zIndex: 1 }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
      >
        <motion.span className="dm-cta-eyebrow" variants={riseVariants}>
          Ready When You Are
        </motion.span>

        <motion.h2
          id="final-cta-heading"
          className="dm-cta-heading"
          variants={riseVariants}
        >
          Let&rsquo;s Build a More Reliable, Secure, and Scalable IT Environment
        </motion.h2>

        <motion.p className="dm-cta-paragraph" variants={riseVariants}>
          Whether you&rsquo;re modernizing branch networks, planning a cloud migration,
          tightening cyber security, deploying surveillance and AV systems, securing
          power continuity with UPS, or simply need dependable managed support, our
          team is ready to talk specifics. Tell us where your infrastructure stands
          today and what it needs to handle tomorrow &mdash; we&rsquo;ll show you exactly
          how Deep Mind IT Solutions gets you there.
        </motion.p>

        <motion.div className="dm-cta-buttons" variants={buttonRowVariants}>
          <motion.button
            type="button"
            className="dm-btn dm-btn-primary"
            variants={buttonVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Talk to a Solutions Expert</span>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="dm-btn-arrow"
            >
              <path
                d="M4 10h12M11 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          <motion.button
            type="button"
            className="dm-btn dm-btn-secondary"
            variants={buttonVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Request a Proposal
          </motion.button>
        </motion.div>

        <motion.ul className="dm-trust-row" variants={trustRowVariants}>
          {trustPoints.map((point) => (
            <motion.li key={point.id} className="dm-trust-item" variants={trustItemVariants}>
              <StatusIcon />
              <span>{point.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}