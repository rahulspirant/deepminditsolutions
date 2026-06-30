import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import "./HeroSection.css";
import {
  ShieldCheck,
  Network,
  Cloud,
  Server,
  ArrowRight,
  Compass,
  BadgeCheck,
  Globe2,
  Activity,
  Lock,
  RadioTower,
  Gauge,
} from "lucide-react";
import { NetworkParticles } from "../../backgrounds/backgrounds";

/* ---------------------------------------------
   Static data
--------------------------------------------- */

const trustChips = [
  { icon: BadgeCheck, label: "Certified Engineers" },
  { icon: Compass, label: "Vendor-Neutral Solutions" },
  { icon: Globe2, label: "PAN-India Deployment Support" },
];

const stats = [
  { value: 18, suffix: "+", label: "Years of Experience" },
  { value: 250, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 24, suffix: "/7", label: "Technical Support" },
];

const floatingCards = [
  {
    icon: Activity,
    title: "99.98% Uptime",
    sub: "Infrastructure SLA",
    accent: "cyan",
    position: "top-[6%] -left-6 md:-left-20",
    delay: 0.1,
  },
  {
    icon: Cloud,
    title: "Cloud Migration",
    sub: "Zero downtime cutover",
    accent: "indigo",
    position: "top-[2%] right-0 md:-right-8",
    delay: 0.25,
  },
  {
    icon: Lock,
    title: "Threat Protection",
    sub: "24/7 SOC monitored",
    accent: "blue",
    position: "bottom-[26%] -left-10 md:-left-14",
    delay: 0.4,
  },
  {
    icon: RadioTower,
    title: "24/7 Monitoring",
    sub: "Network NOC active",
    accent: "cyan",
    position: "bottom-[6%] right-2 md:-right-6",
    delay: 0.55,
  },
  {
    icon: Network,
    title: "Secure Network Architecture",
    sub: "Zero-trust segmentation",
    accent: "indigo",
    position: "bottom-[-6%] left-[18%]",
    delay: 0.7,
  },
];

/* ---------------------------------------------
   Static accent class map
   (Tailwind's JIT scanner can only detect literal
   class strings — building them with template
   literals like `bg-${accent}-500/10` silently
   produces missing CSS. This map keeps every
   class name literal so it's always generated.)
--------------------------------------------- */
const accentStyles = {
  cyan: "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-400/20",
  indigo: "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-400/20",
  blue: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-400/20",
};

/* ---------------------------------------------
   Count-up hook
--------------------------------------------- */
function useCountUp(target, isActive, duration = 1.6) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let start = null;
    let frame;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setValue(target);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isActive, target, duration]);

  return value;
}

/* ---------------------------------------------
   Stat card
--------------------------------------------- */
function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(stat.value, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="stat-card group relative rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-sm"
    >
      <div className="flex items-baseline gap-1">
        <span className="text-2xl md:text-3xl font-semibold tracking-tight text-white tabular-nums">
          {count}
        </span>
        <span className="text-2xl md:text-3xl font-semibold text-cyan-400">
          {stat.suffix}
        </span>
      </div>
      <p className="mt-1 text-xs md:text-[13px] text-slate-400 font-medium leading-snug">
        {stat.label}
      </p>
      <span className="stat-underline absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

/* ---------------------------------------------
   Floating dashboard mini card
--------------------------------------------- */
function FloatingCard({ card }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 + card.delay, ease: [0.22, 1, 0.36, 1] }}
      className={`float-card absolute ${card.position} hidden sm:flex w-[168px] items-center gap-3 rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 shadow-glass backdrop-blur-md`}
      style={{ "--float-delay": `${card.delay}s` }}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${accentStyles[card.accent] ?? accentStyles.cyan}`}
      >
        <Icon size={16} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[12.5px] font-semibold text-white leading-tight truncate">
          {card.title}
        </p>
        <p className="text-[10.5px] text-slate-400 leading-tight truncate">{card.sub}</p>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------
   Hero Section
--------------------------------------------- */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const dashboardRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const handlePointerMove = (event) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) * 100;
        const py = ((event.clientY - rect.top) / rect.height) * 100;

        section.style.setProperty("--mx", `${px}%`);
        section.style.setProperty("--my", `${py}%`);

        if (dashboardRef.current) {
          const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
          const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
          dashboardRef.current.style.transform = `rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
        }
      });
    };

    const handlePointerLeave = () => {
      if (dashboardRef.current) {
        dashboardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
      }
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };

  return (
    <section
      ref={sectionRef}
      className="hero-section relative overflow-hidden bg-[#040810] text-white"
    >
      {/* NetworkParticles canvas — sabse neeche, sab CSS layers ke peeche */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <NetworkParticles />
      </div>

      {/* Background layers */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-scanline" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-orb hero-orb--cyan" aria-hidden="true" />
      <div className="hero-orb hero-orb--indigo" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* ---------------- Left: Text content ---------------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />
              <span className="text-xs font-medium tracking-wide text-cyan-300">
                Smart Solutions, Stronger Businesses
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 text-[2.1rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.25rem]"
            >
              Empowering Your{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Digital Future
              </span>{" "}
              with Secure, Scalable IT Infrastructure
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base"
            >
              Deep Mind IT Solutions designs, deploys, and manages the backbone of
              modern enterprises — from resilient network infrastructure and
              cloud migration to cyber security, firewall deployment, and server
              &amp; storage architecture. We extend that foundation with
              surveillance, AV integration, UPS power continuity, and round-the-clock
              managed IT support, so your business runs on infrastructure that's
              built to scale and engineered to last.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="cta-primary group">
                Book a Consultation
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a href="#solutions" className="cta-secondary">
                Explore Solutions
              </a>
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-3"
            >
              {trustChips.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-[13px] font-medium text-slate-300"
                >
                  <Icon size={15} className="text-cyan-400" />
                  {label}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            >
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* ---------------- Right: Dashboard visual ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[420px] w-full max-w-[480px] [perspective:1200px] sm:h-[480px] lg:h-[520px] lg:max-w-none"
          >
            <div
              ref={dashboardRef}
              className="hero-dashboard-tilt relative h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d]"
            >
            {/* Main command center card */}
            <div className="command-card relative z-10 mx-auto w-full max-w-[400px] rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-glass backdrop-blur-xl sm:max-w-[420px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 ring-1 ring-cyan-400/25">
                    <Server size={17} className="text-cyan-300" />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-semibold leading-tight text-white">
                      Infrastructure Command Center
                    </p>
                    <p className="text-[11px] text-slate-500">Live system overview</p>
                  </div>
                </div>
                <span className="status-pill">
                  <span className="status-dot" />
                  Online
                </span>
              </div>

              {/* Mini metrics row */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "CPU", value: 42 },
                  { label: "Network", value: 68 },
                  { label: "Storage", value: 57 },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
                  >
                    <p className="text-[10.5px] text-slate-500">{m.label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{m.value}%</p>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="progress-bar h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{ "--bar-value": `${m.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Network node visualization */}
              <div className="mt-5 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium text-slate-400">
                    Network Topology
                  </p>
                  <Gauge size={13} className="text-indigo-400" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={i}
                      className="node-dot"
                      style={{ "--node-delay": `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Chart block + alert */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <p className="text-[10.5px] text-slate-500">Threat Activity</p>
                  <div className="mt-2 flex h-8 items-end gap-1">
                    {[40, 65, 30, 80, 50, 70, 45].map((h, i) => (
                      <span
                        key={i}
                        className="chart-bar w-full rounded-sm bg-gradient-to-t from-indigo-500/60 to-cyan-400"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <p className="text-[10.5px] font-medium text-slate-300">
                      All systems secure
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-500">Last scan: 2 min ago</p>
                </div>
              </div>
            </div>

            {/* Floating mini dashboard cards */}
            {floatingCards.map((card) => (
              <FloatingCard key={card.title} card={card} />
            ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}