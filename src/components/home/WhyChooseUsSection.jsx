import {
  CheckCircle2,
  Award,
  Boxes,
  Headphones,
  Layers,
  Network,
  CloudCog,
  ShieldCheck,
  Server,
  Cctv,
  BatteryCharging,
} from "lucide-react";
import { motion } from "framer-motion";
import { FloatingOrbs } from "../../backgrounds/backgrounds";
import "./WhyChooseUsSection.css";

/* ---------------------------------------------
   Static data
--------------------------------------------- */
const proofBullets = [
  "Experienced infrastructure specialists",
  "End-to-end deployment and integration",
  "Vendor-neutral recommendations",
  "Fast technical response and support",
  "Security-first implementation mindset",
  "Long-term maintenance and scalability focus",
];

const proofCards = [
  {
    icon: Award,
    title: "18+ Years in IT Infrastructure",
    sub: "Proven delivery across enterprise environments",
  },
  {
    icon: Boxes,
    title: "250+ Deployments Across Use Cases",
    sub: "Networking, cloud, security & data center",
  },
  {
    icon: Headphones,
    title: "24/7 Technical Support & Monitoring",
    sub: "Always-on response for critical systems",
  },
  {
    icon: Layers,
    title: "Customized Solutions for Every Business Size",
    sub: "From single sites to multi-location rollouts",
  },
];

const strengthTags = [
  { label: "Network", icon: Network },
  { label: "Cloud", icon: CloudCog },
  { label: "Security", icon: ShieldCheck },
  { label: "Servers", icon: Server },
  { label: "CCTV", icon: Cctv },
  { label: "UPS", icon: BatteryCharging },
];

/* ---------------------------------------------
   Variants
--------------------------------------------- */
const leftContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const leftItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const rightContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const rightItem = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------------------------------------------
   WhyChooseUsSection
--------------------------------------------- */
export default function WhyChooseUsSection() {
  return (
    <section className="why-section relative overflow-hidden bg-[#05090f] py-24 sm:py-28">
      {/* FloatingOrbs background — soft, ambient drift sits quietly behind the proof cards */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <FloatingOrbs />
      </div>

      <div className="why-grid" aria-hidden="true" />
      <div className="why-spotlight" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-12">
          {/* ---------------- Left: heading + bullets ---------------- */}
          <motion.div
            variants={leftContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={leftItem}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />
              Why Deep Mind
            </motion.span>

            <motion.h2
              variants={leftItem}
              className="mt-5 text-[1.85rem] font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.3rem]"
            >
              Why Enterprises Choose{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Deep Mind IT Solutions
              </span>
            </motion.h2>

            <motion.p
              variants={leftItem}
              className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-slate-400 sm:text-[15px]"
            >
              We help organizations modernize aging infrastructure, reduce
              unplanned downtime, and close security gaps without disrupting
              day-to-day operations. Every engagement is grounded in practical
              implementation — from initial assessment to deployment and
              ongoing support — so your technology environment stays secure,
              scalable, and ready for what's next.
            </motion.p>

            <motion.ul variants={leftItem} className="mt-7 grid gap-3 sm:grid-cols-2">
              {proofBullets.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[13.5px] text-slate-300"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-cyan-400"
                  />
                  {point}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ---------------- Right: proof cards stack ---------------- */}
          <motion.div
            variants={rightContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {proofCards.map(({ icon: Icon, title, sub }, i) => (
                <motion.div
                  key={title}
                  variants={rightItem}
                  className="proof-card group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
                  style={{ "--float-delay": `${i * 0.4}s` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <p className="mt-4 text-[14.5px] font-semibold leading-snug text-white">
                    {title}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">
                    {sub}
                  </p>
                  <span className="proof-card-glow" aria-hidden="true" />
                </motion.div>
              ))}
            </div>

            {/* Strength areas mini card */}
            <motion.div
              variants={rightItem}
              className="strength-card relative mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
            >
              <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400">
                Strength Areas
              </p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {strengthTags.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="strength-tag inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-slate-300"
                  >
                    <Icon size={13} className="text-cyan-400" />
                    {label}
                  </span>
                ))}
              </div>
              <span className="proof-card-glow" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}