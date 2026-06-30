import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import "./Footer.css";

/**
 * Footer
 * Closing footer for the Deep Mind IT Solutions homepage.
 *
 * Design notes:
 * - Carries the same dark/slate + signal-blue/violet/teal token system
 *   used in CaseStudiesSection and FinalCTASection, but stays quiet here —
 *   the footer is reference material, not a pitch.
 * - Top beam line echoes the card "rack beam" motif at a much lower
 *   intensity, marking the page's final boundary.
 * - Link hover uses an underline that draws in from the left and glows,
 *   rather than a color-only change, to fit the "signal" visual language.
 */

const quickLinks = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

const solutions = [
  { label: "Network Infrastructure", to: "/services/network-infrastructure" },
  { label: "Cloud Solutions", to: "/services/cloud-solutions" },
  { label: "Cyber Security", to: "/services/cyber-security" },
  { label: "Data Center", to: "/services/data-center" },
  { label: "Managed IT", to: "/services/managed-it" },
  { label: "Software & App Development", to: "/services/software-development" },
];

const productCategories = [
  { label: "Server & Storage", to: "/products/server-storage" },
  { label: "Switches / Router / Wi-Fi", to: "/products/switches-router-wifi" },
  { label: "Passive Items", to: "/products/passive-items" },
  { label: "UPS Power", to: "/products/ups-power" },
  { label: "LEDs & Interactive Panels", to: "/products/leds-interactive-panels" },
  { label: "Firewall", to: "/products/firewall" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", initials: "in" },
  { label: "Twitter", href: "https://twitter.com", initials: "X" },
  { label: "Website", href: "https://deepminditsolutions.com", initials: "W" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const colVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function FooterLinkList({ title, links }) {
  return (
    <motion.div variants={colVariants}>
      <h3 className="dm-footer-col-title">{title}</h3>
      <ul className="dm-footer-link-list">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="dm-footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="dm-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="dm-sr-only">
        Footer
      </h2>

      <span className="dm-footer-beam" aria-hidden="true" />

      <motion.div
        className="dm-footer-container"
        variants={containerVariants}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="dm-footer-grid">
          {/* Column 1 — Company intro */}
          <motion.div className="dm-footer-brand-col" variants={colVariants}>
            <div className="dm-footer-logo">
              <span className="dm-footer-logo-mark" aria-hidden="true" />
              <span className="dm-footer-logo-text">Deep Mind IT Solutions</span>
            </div>
            <p className="dm-footer-summary">
              Deep Mind IT Solutions delivers enterprise networking, server, cloud,
              security, surveillance, AV, and IT infrastructure solutions designed to
              help businesses operate securely and efficiently.
            </p>
            <ul className="dm-footer-social">
              {socialLinks.map(({ label, href, initials }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="dm-footer-social-link"
                  >
                    <span aria-hidden="true">{initials}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <FooterLinkList title="Quick Links" links={quickLinks} />

          {/* Column 3 — Solutions */}
          <FooterLinkList title="Solutions" links={solutions} />

          {/* Column 4 — Product Categories */}
          <FooterLinkList title="Product Categories" links={productCategories} />

          {/* Column 5 — Contact */}
          <motion.div variants={colVariants}>
            <h3 className="dm-footer-col-title">Contact</h3>
            <ul className="dm-footer-contact-list">
              <li className="dm-footer-contact-item">
                <span className="dm-footer-contact-marker" aria-hidden="true" />
                <span>
                  2/29, 1st Floor, near Hanuman Mandir,
                  <br />
                  Vaibhav Khand, Gomti Nagar, Lucknow, Uttar Pradesh, India
                </span>
              </li>
              <li className="dm-footer-contact-item">
                <span className="dm-footer-contact-marker" aria-hidden="true" />
                <span>
                  Sales: <a href="tel:+919569775104" className="dm-footer-inline-link">+91 95697 75104</a>
                </span>
              </li>
              <li className="dm-footer-contact-item">
                <span className="dm-footer-contact-marker" aria-hidden="true" />
                <span>
                  Support: <a href="tel:+916394333608" className="dm-footer-inline-link">+91 63943 33608</a>
                </span>
              </li>
              <li className="dm-footer-contact-item">
                <span className="dm-footer-contact-marker" aria-hidden="true" />
                <span>
                  <a
                    href="mailto:sales@deepminditsolutions.com"
                    className="dm-footer-inline-link"
                  >
                    sales@deepminditsolutions.com
                  </a>
                </span>
              </li>
              <li className="dm-footer-contact-item">
                <span className="dm-footer-contact-marker" aria-hidden="true" />
                <span>Mon&ndash;Sat, 9:30 AM&ndash;6:30 PM IST</span>
              </li>
            </ul>
            <Link to="/contact" className="dm-footer-cta-link">
              <span>Get in touch</span>
              <span className="dm-footer-cta-arrow" aria-hidden="true">&#8599;</span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div className="dm-footer-bottom" variants={colVariants}>
          <p className="dm-footer-copyright">
            &copy; {year} Deep Mind IT Solutions. All rights reserved.
          </p>
          <ul className="dm-footer-legal-list">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="dm-footer-legal-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </footer>
  );
}