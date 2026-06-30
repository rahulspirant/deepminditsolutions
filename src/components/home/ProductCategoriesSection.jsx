import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Wifi,
  Cable,
  ShieldAlert,
  PanelTop,
  Tv,
  Projector,
  BatteryCharging,
  Cctv,
  ArrowRight,
} from "lucide-react";
import "./ProductCategoriesSection.css";
import { TechGridParticles } from "../../backgrounds/backgrounds";

/* ---------------------------------------------
   Static data
--------------------------------------------- */
const categories = [
  {
    icon: Server,
    title: "Server & Storage",
    description: "Enterprise servers and storage built for virtualization-ready workloads.",
    bullets: ["Rack & tower servers", "SAN / NAS storage", "Virtualization-ready"],
  },
  {
    icon: Wifi,
    title: "Switches / Router / Wi-Fi",
    description: "Managed switching, routing and wireless access for every site.",
    bullets: ["Managed L2/L3 switching", "Enterprise routing", "High-density Wi-Fi"],
  },
  {
    icon: Cable,
    title: "Passive Items",
    description: "Structured cabling and rack infrastructure for resilient networks.",
    bullets: ["Structured cabling", "Fiber & copper", "Racks & enclosures"],
  },
  {
    icon: ShieldAlert,
    title: "Firewall",
    description: "Perimeter security with policy-driven, secure network access.",
    bullets: ["Perimeter security", "Policy & access control", "Secure remote access"],
  },
  {
    icon: PanelTop,
    title: "LEDs & Interactive Panels",
    description: "Display and collaboration panels for classrooms and boardrooms.",
    bullets: ["Interactive classrooms", "Boardroom displays", "Collaboration panels"],
  },
  {
    icon: Tv,
    title: "AV Solutions & KVM",
    description: "Conferencing and display switching for control room environments.",
    bullets: ["Video conferencing", "Display switching", "KVM control rooms"],
  },
  {
    icon: Projector,
    title: "Projectors",
    description: "Reliable projection for classrooms, meeting rooms and auditoriums.",
    bullets: ["Classroom projection", "Meeting room setups", "Auditorium-grade units"],
  },
  {
    icon: BatteryCharging,
    title: "UPS Power",
    description: "Backup continuity and online UPS for critical power protection.",
    bullets: ["Online UPS systems", "Backup continuity", "Critical power protection"],
  },
  {
    icon: Cctv,
    title: "CCTV Surveillance",
    description: "IP camera and recording systems for full-site monitoring visibility.",
    bullets: ["IP camera networks", "NVR / DVR systems", "Remote monitoring"],
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
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ---------------------------------------------
   Category card with tilt + scan line + spotlight
--------------------------------------------- */
function CategoryCard({ category }) {
  const cardRef = useRef(null);
  const Icon = category.icon;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -5;
    const rotateY = ((x / rect.width) - 0.5) * 5;

    card.style.setProperty("--spot-x", `${x}px`);
    card.style.setProperty("--spot-y", `${y}px`);
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <motion.div
      variants={cardVariants}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="category-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
    >
      <span className="category-card-spotlight" aria-hidden="true" />
      <span className="category-card-scanline" aria-hidden="true" />
      <span className="category-card-beam" aria-hidden="true" />

      <div className="category-icon flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <h3 className="mt-4 text-[15px] font-semibold text-white">
        {category.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
        {category.description}
      </p>

      <ul className="mt-3.5 space-y-1.5">
        {category.bullets.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-[12px] text-slate-300"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <a
          href="#products"
          className="category-cta inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-cyan-300"
        >
          View Category
          <ArrowRight
            size={13}
            className="category-cta-arrow transition-transform duration-300"
          />
        </a>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------
   ProductCategoriesSection
--------------------------------------------- */
export default function ProductCategoriesSection() {
  return (
    <section className="categories-section relative overflow-hidden bg-[#040810] py-24 sm:py-28">
      {/* TechGridParticles background — hologram grid fits product/tech catalog feel */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <TechGridParticles />
      </div>

      <div className="categories-grid-bg" aria-hidden="true" />
      <div className="categories-spotlight" aria-hidden="true" />

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
            Product Portfolio
          </motion.span>

          <motion.h2
            variants={headingItem}
            className="mt-5 text-[1.85rem] font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.3rem]"
          >
            Enterprise Technology Categories We{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Deliver, Deploy, and Support
            </span>
          </motion.h2>

          <motion.p
            variants={headingItem}
            className="mt-5 text-[14.5px] leading-relaxed text-slate-400 sm:text-[15px]"
          >
            Deep Mind IT Solutions supplies and supports enterprise IT and
            infrastructure product categories across networking, security,
            surveillance, power backup, AV, display, and structured
            connectivity — sourced, configured, and deployed by one team.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}