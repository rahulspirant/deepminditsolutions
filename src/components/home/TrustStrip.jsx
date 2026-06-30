import { motion } from "framer-motion";
import {
  Network,
  Server,
  CloudCog,
  ShieldCheck,
  Cctv,
  BatteryCharging,
} from "lucide-react";
import "./TrustStrip.css";
import { GlowingMesh } from "../../backgrounds/backgrounds";

/* ---------------------------------------------
   Static data
--------------------------------------------- */
const capabilities = [
  {
    icon: Network,
    title: "Enterprise Networking",
    text: "Structured LAN, WAN & Wi-Fi backbones built for uptime.",
  },
  {
    icon: Server,
    title: "Data Center & Server",
    text: "Resilient server, storage & rack infrastructure at scale.",
  },
  {
    icon: CloudCog,
    title: "Cloud & Virtualization",
    text: "Migration and hybrid workloads, modernized end to end.",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    text: "Firewalls, threat monitoring & zero-trust deployment.",
  },
  {
    icon: Cctv,
    title: "Surveillance & Access",
    text: "CCTV, access control & AV systems, fully integrated.",
  },
  {
    icon: BatteryCharging,
    title: "Power Backup & UPS",
    text: "Continuous power design for mission-critical systems.",
  },
];

/* ---------------------------------------------
   Variants
--------------------------------------------- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ---------------------------------------------
   TrustStrip
--------------------------------------------- */
export default function TrustStrip() {
  return (
    <section className="trust-strip relative overflow-hidden bg-[#05090f] py-20 sm:py-24">
      {/* GlowingMesh background — mouse-reactive */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <GlowingMesh />
      </div>

      {/* Background beam + divider lines */}
      <div className="trust-beam" aria-hidden="true" />
      <div className="trust-divider trust-divider--top" aria-hidden="true" />
      <div className="trust-divider trust-divider--bottom" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />
            Capabilities
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.1rem]">
            Trusted by businesses across critical industries
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {capabilities.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="trust-card group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <div className="trust-icon flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-white">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
                {text}
              </p>
              <span className="trust-card-glow" aria-hidden="true" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}