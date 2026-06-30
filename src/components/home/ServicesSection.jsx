import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Network,
  CloudCog,
  ShieldCheck,
  Server,
  Headset,
  AppWindow,
  ArrowRight,
} from "lucide-react";
import "./ServicesSection.css";
import { CircuitBoard } from "../../backgrounds/backgrounds";

/* ---------------------------------------------
   Static data
--------------------------------------------- */
const services = [
  {
    icon: Network,
    title: "Network Infrastructure",
    description:
      "Structured cabling, switching, routing and Wi-Fi designed for dependable, low-latency connectivity.",
    highlights: [
      "Structured switching & routing",
      "Enterprise Wi-Fi rollout",
      "Branch & multi-site connectivity",
    ],
  },
  {
    icon: CloudCog,
    title: "Cloud Solutions",
    description:
      "Migration and hybrid cloud architecture that scales with demand while keeping costs predictable.",
    highlights: [
      "Cloud migration & modernization",
      "Hybrid & multi-cloud setup",
      "Automated backup & scaling",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    description:
      "Firewall deployment and endpoint protection built around continuous threat monitoring.",
    highlights: [
      "Firewall & endpoint protection",
      "Access control & identity policy",
      "24/7 threat monitoring",
    ],
  },
  {
    icon: Server,
    title: "Data Center Solutions",
    description:
      "Server, storage and virtualization infrastructure engineered for density and uptime.",
    highlights: [
      "Server & storage deployment",
      "Virtualization architecture",
      "Rack & capacity planning",
    ],
  },
  {
    icon: Headset,
    title: "Managed IT Services",
    description:
      "AMC-backed monitoring and support that keeps infrastructure healthy without the overhead.",
    highlights: [
      "AMC & preventive maintenance",
      "Proactive infrastructure monitoring",
      "Rapid issue troubleshooting",
    ],
  },
  {
    icon: AppWindow,
    title: "Software & App Development",
    description:
      "Business applications and dashboards that automate workflow and surface real operational data.",
    highlights: [
      "Business apps & portals",
      "Custom dashboards",
      "Workflow automation",
    ],
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ---------------------------------------------
   Service card with tilt + spotlight
--------------------------------------------- */
function ServiceCard({ service }) {
  const cardRef = useRef(null);
  const Icon = service.icon;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;

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
      className="service-card group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm"
    >
      <span className="service-card-spotlight" aria-hidden="true" />
      <span className="service-card-beam" aria-hidden="true" />

      <div className="service-icon flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      <h3 className="mt-5 text-[17px] font-semibold text-white">
        {service.title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">
        {service.description}
      </p>

      <ul className="mt-4 space-y-2">
        {service.highlights.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-[12.5px] text-slate-300"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <a
          href="#contact"
          className="service-cta inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan-300"
        >
          Learn More
          <ArrowRight
            size={14}
            className="service-cta-arrow transition-transform duration-300"
          />
        </a>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------
   Services Section
--------------------------------------------- */
export default function ServicesSection() {
  return (
    <section className="services-section relative overflow-hidden bg-[#040810] py-24 sm:py-28">
      {/* CircuitBoard background — PCB traces, fits "services" infrastructure theme */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <CircuitBoard />
      </div>

      {/* Decorative network background */}
      <div className="services-network" aria-hidden="true" />
      <div className="services-spotlight" aria-hidden="true" />

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
            Our Core Services
          </motion.span>

          <motion.h2
            variants={headingItem}
            className="mt-5 text-[1.85rem] font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.3rem]"
          >
            End-to-End IT Solutions Built for{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Reliability, Security, and Scale
            </span>
          </motion.h2>

          <motion.p
            variants={headingItem}
            className="mt-5 text-[14.5px] leading-relaxed text-slate-400 sm:text-[15px]"
          >
            From first consultation to long-term support, Deep Mind IT Solutions
            delivers consulting, deployment, integration, monitoring, and
            maintenance across enterprise networking, cloud, cyber security,
            data center, managed IT, and custom software — as one accountable
            partner instead of six different vendors.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="services-grid relative mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}