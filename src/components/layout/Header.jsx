import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/deepmind-logo.png";
import logoWebp from "../../img/deepmind-logo.webp";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu, X, ChevronDown, ArrowRight,
  PhoneCall, CalendarCheck,
  Network, Cloud, ShieldCheck, Server, Headset, Code2,
  HardDrive, Wifi, Cable, Shield, MonitorSmartphone,
  Cast, Projector, BatteryCharging, Camera,
} from "lucide-react";
import "./Header.css";

/* ── Nav items — path React Router routes se match karte hain ── */
const navItems = [
  { label: "Home",       path: "/" },
  { label: "About",      path: "/about" },
  { label: "Services",   path: "/services",   megaMenu: "services" },
  { label: "Products",   path: "/products",   megaMenu: "products" },
  { label: "Industries", path: "/industries" },
  { label: "Clients",    path: "/clients" },
  { label: "Careers",    path: "/careers" },
  { label: "Contact",    path: "/contact" },
];

const servicesMenu = {
  intro: "From core networking and cloud modernization to security, managed support, and custom business applications, Deep Mind IT Solutions helps organizations build dependable, scalable IT environments.",
  items: [
    { title: "Network Infrastructure",     description: "Structured networking, routing, switching, and enterprise Wi-Fi", path: "/services/network-infrastructure", Icon: Network },
    { title: "Cloud Solutions",            description: "Migration, hybrid cloud, backup, and scalable deployment",        path: "/services/cloud-solutions",        Icon: Cloud },
    { title: "Cyber Security",             description: "Firewall, endpoint protection, and risk reduction",               path: "/services/cyber-security",         Icon: ShieldCheck },
    { title: "Data Center Solutions",      description: "Server rooms, racks, cooling, and resilient power design",        path: "/services/data-center",            Icon: Server },
    { title: "Managed IT Services",        description: "Proactive monitoring, helpdesk, and infrastructure support",      path: "/services/managed-it",             Icon: Headset },
    { title: "Software & App Development", description: "Custom business applications and systems integration",            path: "/services/software-development",   Icon: Code2 },
  ],
};

const productsMenu = {
  intro: "Explore enterprise-ready technology categories covering servers, networking, power backup, surveillance, AV, and structured infrastructure for modern business operations.",
  items: [
    { title: "Server & Storage",          description: "Enterprise servers, NAS, and scalable storage arrays",     path: "/products/server-storage",          Icon: HardDrive },
    { title: "Switches / Router / Wi-Fi", description: "Core, access, and distribution networking hardware",       path: "/products/switches-router-wifi",     Icon: Wifi },
    { title: "Passive Items",             description: "Structured cabling, racks, and connectivity essentials",   path: "/products/passive-items",           Icon: Cable },
    { title: "Firewall",                  description: "Perimeter security appliances for every business scale",   path: "/products/firewall",                Icon: Shield },
    { title: "LEDs & Interactive Panels", description: "Display, signage, and collaborative meeting technology",   path: "/products/leds-interactive-panels", Icon: MonitorSmartphone },
    { title: "AV Solutions & KVM",        description: "Audio-visual systems and centralized device control",      path: "/products/av-kvm",                  Icon: Cast },
    { title: "Projectors",                description: "Boardroom and large-venue projection systems",             path: "/products/projectors",              Icon: Projector },
    { title: "UPS Power",                 description: "Battery backup and power continuity for critical systems", path: "/products/ups-power",               Icon: BatteryCharging },
    { title: "CCTV Surveillance",         description: "IP cameras, NVRs, and complete site coverage",            path: "/products/cctv-surveillance",       Icon: Camera },
  ],
};

/* ── Variants (same as original) ── */
const headerRevealVariants = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const megaMenuVariants = {
  hidden:  { opacity: 0, y: -10, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0,   filter: "blur(0px)", transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8,  filter: "blur(4px)", transition: { duration: 0.18, ease: "easeIn" } },
};
const megaListVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
};
const megaItemVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};
const mobilePanelVariants = {
  hidden:  { x: "100%" },
  visible: { x: 0,      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: "100%", transition: { duration: 0.32, ease: [0.4, 0, 1, 1] } },
};
const mobileOverlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};
const mobileListVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const mobileItemVariants = {
  hidden:  { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.32, ease: "easeOut" } },
};

/* ── MegaMenuPanel ── */
function MegaMenuPanel({ menu, id, onClose }) {
  return (
    <motion.div
      className="dm-mega-panel"
      role="region"
      aria-label={`${id} menu`}
      variants={megaMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="dm-mega-inner">
        <div className="dm-mega-intro">
          <span className="dm-mega-intro-eyebrow">
            {id === "services" ? "Services" : "Product Categories"}
          </span>
          <p className="dm-mega-intro-text">{menu.intro}</p>
          <Link
            to={id === "services" ? "/services" : "/products"}
            className="dm-mega-intro-link"
            onClick={onClose}
          >
            <span>{id === "services" ? "View all services" : "View all products"}</span>
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        <motion.ul className="dm-mega-grid" variants={megaListVariants} initial="hidden" animate="visible">
          {menu.items.map(({ title, description, path, Icon }) => (
            <motion.li key={title} variants={megaItemVariants}>
              <Link to={path} className="dm-mega-item" onClick={onClose}>
                <span className="dm-mega-item-icon"><Icon size={18} strokeWidth={1.7} /></span>
                <span className="dm-mega-item-text">
                  <span className="dm-mega-item-title">{title}</span>
                  <span className="dm-mega-item-desc">{description}</span>
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

/* ── MobileAccordion ── */
function MobileAccordion({ label, menu, isOpen, onToggle, onClose }) {
  return (
    <div className="dm-mobile-accordion">
      <button type="button" className="dm-mobile-accordion-trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span>{label}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            className="dm-mobile-accordion-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {menu.items.map(({ title, path, Icon }) => (
              <li key={title}>
                <Link to={path} className="dm-mobile-accordion-link" onClick={onClose}>
                  <Icon size={16} strokeWidth={1.8} />
                  <span>{title}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Header ── */
export default function Header() {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();

  const [isScrolled,     setIsScrolled]     = useState(false);
  const [activeMenu,     setActiveMenu]     = useState(null);
  const [isMobileOpen,   setIsMobileOpen]   = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimeoutRef = useRef(null);

  /* Route change → sab band karo */
  useEffect(() => {
    setActiveMenu(null);
    setIsMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const openMenu = useCallback((key) => {
    clearTimeout(closeTimeoutRef.current);
    setActiveMenu(key);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => setActiveMenu(null), 160);
  }, []);

  const closeAll = useCallback(() => {
    setActiveMenu(null);
    setIsMobileOpen(false);
    setMobileExpanded(null);
  }, []);

  /* "/" exact match, baaki startsWith */
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <motion.header
      className={`dm-header ${isScrolled ? "dm-header-scrolled" : ""}`}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate="visible"
      variants={headerRevealVariants}
      onMouseLeave={scheduleClose}
    >
      <div className="dm-header-inner">

        {/* Brand */}
        <Link to="/" className="dm-brand" aria-label="Deep Mind IT Solutions — Home">
          <div className="dm-brand">
  <picture>
    <source srcSet={logoWebp} type="image/webp" />
    <img
      src={logo}
      alt="DeepMind IT Solutions"
      className="dm-brand-logo"
      width="127"
      height="126"
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  </picture>
</div>
          <span className="dm-brand-text">
            <span className="dm-brand-name">
              <span className="dm-brand-glow">DeepMind</span>ITSolutions
            </span>
            <span className="dm-brand-tagline">IT Infrastructure &bull; Cloud &bull; Security</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="dm-nav" aria-label="Primary">
          <ul className="dm-nav-list">
            {navItems.map((item) => {
              const active     = isActive(item.path);
              const isMenuOpen = activeMenu === item.megaMenu;
              return (
                <li
                  key={item.label}
                  className="dm-nav-item"
                  onMouseEnter={() => item.megaMenu ? openMenu(item.megaMenu) : scheduleClose()}
                >
                  <Link
                    to={item.path}
                    className={`dm-nav-link ${active ? "dm-nav-link-active" : ""}`}
                    aria-expanded={item.megaMenu ? isMenuOpen : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    {item.megaMenu && (
                      <motion.span
                        animate={{ rotate: isMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.22 }}
                        className="dm-nav-chevron"
                      >
                        <ChevronDown size={14} strokeWidth={2} />
                      </motion.span>
                    )}
                    <span className="dm-nav-pill" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <AnimatePresence>
            {activeMenu === "services" && (
              <div className="dm-mega-wrapper" onMouseEnter={() => openMenu("services")} onMouseLeave={scheduleClose}>
                <MegaMenuPanel menu={servicesMenu} id="services" onClose={closeAll} />
              </div>
            )}
            {activeMenu === "products" && (
              <div className="dm-mega-wrapper dm-mega-wrapper-wide" onMouseEnter={() => openMenu("products")} onMouseLeave={scheduleClose}>
                <MegaMenuPanel menu={productsMenu} id="products" onClose={closeAll} />
              </div>
            )}
          </AnimatePresence>
        </nav>

        {/* Desktop CTAs */}
        <div className="dm-cta-area">
          <Link to="/contact?type=demo" className="dm-btn dm-btn-ghost">
            <CalendarCheck size={16} strokeWidth={1.8} />
            <span className="dm-btn-label">Book a Demo</span>
          </Link>
          <Link to="/contact" className="dm-btn dm-btn-primary-sm">
            <PhoneCall size={16} strokeWidth={1.8} />
            <span>Talk to an Expert</span>
            <span className="dm-btn-sweep" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="dm-hamburger"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((v) => !v)}
        >
          <motion.span animate={{ rotate: isMobileOpen ? 90 : 0, opacity: isMobileOpen ? 0 : 1 }}>
            <Menu size={22} strokeWidth={1.9} />
          </motion.span>
          <motion.span
            className="dm-hamburger-close"
            animate={{ rotate: isMobileOpen ? 0 : -90, opacity: isMobileOpen ? 1 : 0 }}
          >
            <X size={22} strokeWidth={1.9} />
          </motion.span>
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="dm-mobile-overlay"
              variants={mobileOverlayVariants}
              initial="hidden" animate="visible" exit="exit"
              onClick={closeAll}
            />
            <motion.div
              className="dm-mobile-panel"
              variants={mobilePanelVariants}
              initial="hidden" animate="visible" exit="exit"
              role="dialog" aria-modal="true" aria-label="Mobile navigation"
            >
              <div className="dm-mobile-panel-header">
                <span className="dm-brand-text">
                  <span className="dm-brand-name">
                    <span className="dm-brand-glow">Deep Mind</span> IT Solutions
                  </span>
                </span>
                <button type="button" className="dm-mobile-close" aria-label="Close menu" onClick={closeAll}>
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              <motion.ul className="dm-mobile-list" variants={mobileListVariants} initial="hidden" animate="visible">
                {navItems.map((item) => (
                  <motion.li key={item.label} variants={mobileItemVariants}>
                    {item.megaMenu ? (
                      <MobileAccordion
                        label={item.label}
                        menu={item.megaMenu === "services" ? servicesMenu : productsMenu}
                        isOpen={mobileExpanded === item.megaMenu}
                        onToggle={() => setMobileExpanded((cur) => cur === item.megaMenu ? null : item.megaMenu)}
                        onClose={closeAll}
                      />
                    ) : (
                      <Link
                        to={item.path}
                        className={`dm-mobile-link ${isActive(item.path) ? "dm-mobile-link-active" : ""}`}
                        onClick={closeAll}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="dm-mobile-cta-area">
                <Link to="/contact?type=demo" className="dm-btn dm-btn-ghost dm-btn-full" onClick={closeAll}>
                  <CalendarCheck size={16} strokeWidth={1.8} />
                  <span>Book a Demo</span>
                </Link>
                <Link to="/contact" className="dm-btn dm-btn-primary-sm dm-btn-full" onClick={closeAll}>
                  <PhoneCall size={16} strokeWidth={1.8} />
                  <span>Talk to an Expert</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}