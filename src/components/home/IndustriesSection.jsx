import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  HeartPulse,
  Factory,
  Landmark,
  Store,
  Banknote,
  ConciergeBell,
} from "lucide-react";
import "./IndustriesSection.css";
import { FloatingOrbs } from "../../backgrounds/backgrounds";

/* ---------------------------------------------
   Static data
--------------------------------------------- */
const industries = [
  {
    icon: Building2,
    title: "Corporate Offices",
    text: "Reliable connectivity and security for multi-floor, multi-site teams.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    text: "Campus-wide Wi-Fi and interactive classrooms that scale with enrollment.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    text: "Always-on infrastructure for critical systems and patient data security.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    text: "Rugged networking and surveillance across plant floors and warehouses.",
  },
  {
    icon: Landmark,
    title: "Government",
    text: "Secure, compliant infrastructure for public-sector service delivery.",
  },
  {
    icon: Store,
    title: "Retail",
    text: "Connected stores with surveillance, Wi-Fi, and centralized monitoring.",
  },
  {
    icon: Banknote,
    title: "BFSI",
    text: "High-security networks and uptime for financial transaction systems.",
  },
  {
    icon: ConciergeBell,
    title: "Hospitality",
    text: "Seamless guest connectivity backed by secure back-of-house systems.",
  },
];

/* ---------------------------------------------
   Variants
--------------------------------------------- */
const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const headingItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ---------------------------------------------
   Industry card
--------------------------------------------- */
function IndustryCard({ industry }) {
  const Icon = industry.icon;
  return (
    <motion.div
      variants={cardVariants}
      className="industry-card group relative flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
    >
      <div className="industry-icon-wrap relative flex h-14 w-14 items-center justify-center">
        <span className="industry-orbit-ring" aria-hidden="true" />
        <span className="industry-pulse-ring" aria-hidden="true" />
        <div className="industry-icon relative flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      <h3 className="mt-3 text-[15px] font-semibold text-white">
        {industry.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
        {industry.text}
      </p>

      <span className="industry-card-glow" aria-hidden="true" />
    </motion.div>
  );
}

/* ---------------------------------------------
   IndustriesSection
--------------------------------------------- */
export default function IndustriesSection() {
  return (
    <section className="industries-section relative overflow-hidden bg-[#05090f] py-24 sm:py-28">
      {/* FloatingOrbs background — soft, varied = fits diverse industries theme */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <FloatingOrbs />
      </div>

      <div className="industries-grid-bg" aria-hidden="true" />
      <div className="industries-spotlight" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={headingItem}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />
            Industries We Serve
          </motion.span>

          <motion.h2
            variants={headingItem}
            className="mt-5 text-[1.85rem] font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.3rem]"
          >
            IT Infrastructure Solutions Tailored for{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Diverse Business Environments
            </span>
          </motion.h2>

          <motion.p
            variants={headingItem}
            className="mt-5 text-[14.5px] leading-relaxed text-slate-400 sm:text-[15px]"
          >
            Deep Mind IT Solutions supports organizations across corporate,
            education, healthcare, manufacturing, government, retail, BFSI, and
            hospitality environments — with networking, surveillance, cloud,
            AV, security, and power backup infrastructure suited to each
            sector's operating demands.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
        >
          {industries.map((industry) => (
            <IndustryCard key={industry.title} industry={industry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}