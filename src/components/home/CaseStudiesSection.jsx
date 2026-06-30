import React from "react";
import { motion } from "framer-motion";
import "./CaseStudiesSection.css";
import { GlowingMesh } from "../../backgrounds/backgrounds";

/**
 * CaseStudiesSection
 * "Selected Engagement Highlights" — homepage proof-of-work section
 * for Deep Mind IT Solutions.
 */

const caseStudies = [
  {
    id: "branch-network",
    title: "Branch Network Modernization",
    clientType: "Multi-Location Retail Chain",
    challenge:
      "28 branch locations were running on mismatched, end-of-life switches and consumer-grade Wi-Fi gear. Outages at one site required an on-site technician, and IT had no centralized visibility into branch network health.",
    solution:
      "Deployed a standardized switching and routing architecture across all branches, layered with managed Wi-Fi and a unified next-gen firewall policy pushed from a single control plane.",
    outcome:
      "99.9% branch uptime, zero on-site visits for routine config changes, and one dashboard for the entire retail footprint.",
    tags: ["Switching & Routing", "Managed Wi-Fi", "Next-Gen Firewall", "SD-Branch"],
  },
  {
    id: "hybrid-infra",
    title: "Hybrid Infrastructure Upgrade",
    clientType: "Mid-Size Manufacturing Firm",
    challenge:
      "Core ERP and file services lived on aging on-prem servers with no real disaster recovery plan. A single hardware failure risked days of production downtime.",
    solution:
      "Migrated critical workloads to a hybrid cloud model — virtualized on-prem compute for latency-sensitive ERP, replicated storage and backups to the cloud, and rebuilt the network backbone to support both.",
    outcome:
      "Recovery time objective cut from days to under 4 hours, with predictable monthly infrastructure costs and headroom for future workloads.",
    tags: ["Hybrid Cloud", "Virtualization", "Disaster Recovery", "Storage Replication"],
  },
  {
    id: "surveillance-power",
    title: "Surveillance + Power Continuity Rollout",
    clientType: "Regional Warehousing & Logistics Operator",
    challenge:
      "Three distribution centers had blind spots in camera coverage and no protection against brownouts, which had already caused two unplanned shutdowns of access-control systems.",
    solution:
      "Installed a unified IP camera and NVR system with full-site coverage, paired with UPS and generator-backed power continuity for all surveillance, access-control, and core networking equipment.",
    outcome:
      "Complete site coverage with 90-day footage retention and zero security-system downtime through two subsequent grid outages.",
    tags: ["IP Surveillance", "NVR Systems", "UPS & Power Continuity", "Access Control"],
  },
];

const readout = [
  { key: "challenge", label: "Challenge", dotClass: "dot-challenge" },
  { key: "solution", label: "Solution", dotClass: "dot-solution" },
  { key: "outcome", label: "Outcome", dotClass: "dot-outcome" },
];

const headingVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const blockListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const blockVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const tagListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.65 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function CaseStudyCard({ study }) {
  return (
    <motion.article variants={cardVariants} className="dm-case-card group">
      <span className="dm-case-beam" aria-hidden="true" />
      <div className="dm-case-card-inner">
        <header className="dm-case-header">
          <span className="dm-client-type">{study.clientType}</span>
          <h3 className="dm-case-title">{study.title}</h3>
        </header>

        <motion.div
          className="dm-readout"
          variants={blockListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {readout.map((block) => (
            <motion.div key={block.key} className="dm-readout-row" variants={blockVariants}>
              <div className="dm-readout-label">
                <span className={`dm-dot ${block.dotClass}`} aria-hidden="true" />
                <span>{block.label}</span>
              </div>
              <p className="dm-readout-text">{study[block.key]}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          className="dm-tag-list"
          variants={tagListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {study.tags.map((tag) => (
            <motion.li key={tag} variants={tagVariants} className="dm-tag">
              {tag}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.article>
  );
}

export default function CaseStudiesSection() {
  return (
    <section
      className="dm-section"
      aria-labelledby="case-studies-heading"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* GlowingMesh — mouse hover pe particles cards ke aas paas react karte hain */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <GlowingMesh />
      </div>

      <div className="dm-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className="dm-section-head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span className="dm-eyebrow" custom={0} variants={headingVariants}>
            Selected Engagement Highlights
          </motion.span>

          <motion.h2
            id="case-studies-heading"
            className="dm-title"
            custom={1}
            variants={headingVariants}
          >
            How We Solve Real Infrastructure Challenges
          </motion.h2>

          <motion.p className="dm-description" custom={2} variants={headingVariants}>
            Deep Mind IT Solutions designs and deploys infrastructure that holds up under
            real operating conditions. From branch networking and enterprise security to
            cloud migrations, surveillance, power continuity, and hardware lifecycle
            management, every engagement is built to be practical to run, easy to scale,
            and accountable when something goes wrong. The cases below reflect the kind
            of work we do for clients managing distributed sites and mission-critical
            systems.
          </motion.p>
        </motion.div>

        <motion.div
          className="dm-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}