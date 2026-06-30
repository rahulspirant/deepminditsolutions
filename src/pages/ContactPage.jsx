import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Headphones,
  Mail,
  Clock,
  Network,
  Cloud,
  ShieldCheck,
  Server,
  Camera,
  BatteryCharging,
  Monitor,
  Settings,
  ArrowRight,
  ChevronRight,
  CircleDot,
  Send,
  CheckCircle2,
  AlertCircle,
  User,
  Building2,
  MessageSquare,
  DollarSign,
  LocateFixed,
  ClipboardList,
  Lightbulb,
  FileText,
  CalendarCheck,
} from "lucide-react";
import {
  NetworkParticles,
  TechGridParticles,
  GlowingMesh,
  FloatingOrbs,
  CircuitBoard,
} from "../backgrounds/backgrounds";

/** Drop any canvas background behind a section with one line */
function BgLayer({ children }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Office Address",
    lines: [
      "2/29, 1st Floor, near Hanuman Mandir,",
      "Vaibhav Khand, Gomti Nagar,",
      "Lucknow, Uttar Pradesh, India",
    ],
    accent: "#3B82F6",
  },
  {
    icon: Phone,
    title: "Sales Contact",
    lines: ["+91 95697 75104"],
    accent: "#10B981",
  },
  {
    icon: Headphones,
    title: "Support Contact",
    lines: ["+91 63943 33608", "Mon–Sat, 9:30 AM – 6:30 PM"],
    accent: "#F59E0B",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["sales@deepminditsolutions.com"],
    accent: "#8B5CF6",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday – Saturday", "9:30 AM – 6:30 PM IST", "Closed on Sundays"],
    accent: "#06B6D4",
  },
];

const INQUIRY_CARDS = [
  { icon: Network, title: "Network Infrastructure", summary: "Switching, routing, Wi-Fi & cabling.", accent: "#3B82F6" },
  { icon: Cloud, title: "Cloud Solutions", summary: "Migration, deployment & cloud backup.", accent: "#8B5CF6" },
  { icon: ShieldCheck, title: "Cyber Security", summary: "Firewall, endpoint & access control.", accent: "#EF4444" },
  { icon: Server, title: "Data Center", summary: "Servers, storage & rack infrastructure.", accent: "#10B981" },
  { icon: Camera, title: "CCTV / Surveillance", summary: "IP cameras, NVR & coverage planning.", accent: "#A855F7" },
  { icon: BatteryCharging, title: "UPS / Power Backup", summary: "Business continuity & power protection.", accent: "#F97316" },
  { icon: Monitor, title: "AV / Interactive Displays", summary: "Panels, projectors & AV integration.", accent: "#06B6D4" },
  { icon: Settings, title: "Managed IT Support", summary: "Monitoring, helpdesk & lifecycle.", accent: "#F59E0B" },
];

const SERVICE_OPTIONS = [
  "Network Infrastructure",
  "Cloud Solutions",
  "Cyber Security",
  "Data Center Solutions",
  "CCTV / Surveillance",
  "UPS / Power Backup",
  "AV / Interactive Displays",
  "Managed IT Services",
  "Software & App Development",
  "Multiple Services",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under ₹5 Lakhs",
  "₹5 – ₹20 Lakhs",
  "₹20 – ₹50 Lakhs",
  "₹50 Lakhs – ₹1 Crore",
  "Above ₹1 Crore",
  "Prefer not to say",
];

const SUPPORT_STEPS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Consultation & Requirement Understanding",
    desc: "Our team reviews your inquiry and schedules a conversation to understand your environment, constraints, and objectives before any recommendation is made.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Solution Discussion",
    desc: "We walk through suitable approaches — covering technology options, vendor selection, and delivery methodology aligned to your specific use case.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Quote & Recommendation",
    desc: "Where required, we prepare a detailed scope, solution recommendation, and commercial proposal so every decision is fully informed.",
  },
  {
    icon: CalendarCheck,
    step: "04",
    title: "Project Planning & Follow-Up",
    desc: "On engagement, we initiate a structured project plan — covering timelines, site access, deployment phases, and post-implementation support.",
  },
];

// ─── Animation helper ──────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Input component ───────────────────────────────────────────────────────────

function Field({ label, required, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
      <label
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: error ? "#F87171" : "#94A3B8",
          letterSpacing: "0.04em",
        }}
      >
        {label} {required && <span style={{ color: "#F87171" }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: "0.72rem", color: "#F87171", display: "flex", alignItems: "center", gap: 4 }}>
          <AlertCircle size={11} /> {error}
        </span>
      )}
    </div>
  );
}

const inputBase = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "rgba(15,23,42,0.7)",
  border: "1px solid rgba(51,65,85,0.6)",
  borderRadius: "0.5rem",
  color: "#E2E8F0",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
};

function TextInput({ value, onChange, placeholder, type = "text", error }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        borderColor: error ? "#F87171" : focused ? "rgba(99,102,241,0.6)" : "rgba(51,65,85,0.6)",
        boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
      }}
    />
  );
}

function SelectInput({ value, onChange, options, placeholder, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        borderColor: error ? "#F87171" : focused ? "rgba(99,102,241,0.6)" : "rgba(51,65,85,0.6)",
        boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
        cursor: "pointer",
        appearance: "none",
        color: value ? "#E2E8F0" : "#475569",
      }}
    >
      <option value="" disabled style={{ color: "#475569" }}>{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o} style={{ background: "#0F172A", color: "#E2E8F0" }}>{o}</option>
      ))}
    </select>
  );
}

function TextAreaInput({ value, onChange, placeholder, error, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        resize: "vertical",
        minHeight: 110,
        borderColor: error ? "#F87171" : focused ? "rgba(99,102,241,0.6)" : "rgba(51,65,85,0.6)",
        boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
      }}
    />
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  // Form state
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    service: "", requirement: "", budget: "", city: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.service) e.service = "Please select a service or product";
    if (!form.message.trim()) e.message = "Please describe your requirement";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  };

  return (
    <div
      style={{
        background: "#080C14",
        color: "#E2E8F0",
        fontFamily: "'Inter', 'DM Sans', system-ui, -apple-system, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          paddingTop: "8rem",
          paddingBottom: "5rem",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(79,70,229,0.14) 0%, transparent 65%), #080C14",
        }}
      >
        {/* NetworkParticles background — "connecting with us" theme for contact */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        >
          <NetworkParticles />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(rgba(148,163,184,0.055) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem", textAlign: "center", position: "relative", zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: "1.5rem",
              padding: "0.35rem 1rem",
              borderRadius: 999,
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
              color: "#A5B4FC",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <CircleDot size={9} /> Contact Deep Mind
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3.1rem)",
              fontWeight: 700,
              lineHeight: 1.14,
              letterSpacing: "-0.025em",
              color: "#F1F5F9",
              marginBottom: "1.5rem",
            }}
          >
            Let's Talk About Your{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #818CF8, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              IT Infrastructure, Security, Cloud,
            </span>{" "}
            or Deployment Requirements
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            style={{ fontSize: "1rem", lineHeight: 1.78, color: "#94A3B8", maxWidth: 600, margin: "0 auto 2.5rem" }}
          >
            Whether you need networking, cloud migration, cyber security, data center builds,
            CCTV surveillance, AV systems, UPS infrastructure, or custom software — our team
            is ready to understand your environment and propose the right solution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}
          >
            <button
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "0.85rem 1.75rem",
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                color: "#fff",
                borderRadius: "0.5rem",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 0 24px rgba(99,102,241,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 38px rgba(99,102,241,0.48)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.3)"; }}
            >
              Request a Consultation <ArrowRight size={15} />
            </button>
            <a
              href="mailto:sales@deepminditsolutions.com"
              style={{
                padding: "0.85rem 1.75rem",
                background: "transparent",
                color: "#CBD5E1",
                borderRadius: "0.5rem",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: "1px solid rgba(148,163,184,0.2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(148,163,184,0.07)"; e.currentTarget.style.borderColor = "rgba(148,163,184,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(148,163,184,0.2)"; }}
            >
              Email Our Team <Mail size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 2. CONTACT INFO CARDS ────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem", background: "#060A12" }}>
        <BgLayer><TechGridParticles /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {CONTACT_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeUp key={card.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      padding: "1.6rem",
                      borderRadius: "0.875rem",
                      background: "rgba(8,14,26,0.8)",
                      border: "1px solid rgba(51,65,85,0.42)",
                      backdropFilter: "blur(12px)",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = card.accent + "38";
                      e.currentTarget.style.boxShadow = `0 0 24px ${card.accent}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(51,65,85,0.42)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "0.6rem",
                        background: `${card.accent}14`,
                        border: `1px solid ${card.accent}28`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <Icon size={19} color={card.accent} />
                    </div>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                      {card.title}
                    </p>
                    {card.lines.map((l) => (
                      <p key={l} style={{ fontSize: "0.84rem", color: "#94A3B8", lineHeight: 1.65 }}>{l}</p>
                    ))}
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. CONTACT FORM ──────────────────────────────────────────────────── */}
      <section
        id="contact-form"
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          background: "radial-gradient(ellipse 60% 55% at 70% 50%, rgba(79,70,229,0.1) 0%, transparent 65%), #080C14",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start" }}>
            {/* Left */}
            <FadeUp>
              <div style={{ position: "sticky", top: "5rem" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#818CF8", marginBottom: "0.75rem" }}>
                  Enterprise Inquiry
                </p>
                <h2 style={{ fontSize: "clamp(1.65rem, 2.6vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                  Tell Us What You're Working On
                </h2>
                <p style={{ color: "#64748B", lineHeight: 1.78, fontSize: "0.9rem", marginBottom: "2rem" }}>
                  Fill in your details and describe your requirement. Our team will review your submission
                  and respond within one business day to schedule a consultation.
                </p>

                {/* Response time badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0.6rem 1rem",
                    borderRadius: "0.6rem",
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: "0.78rem", color: "#6EE7B7", fontWeight: 600 }}>
                    Typically responds within 1 business day
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* Form */}
            <FadeUp delay={0.1}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    padding: "3rem 2rem",
                    borderRadius: "1rem",
                    background: "rgba(16,185,129,0.07)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    textAlign: "center",
                  }}
                >
                  <CheckCircle2 size={48} color="#10B981" style={{ margin: "0 auto 1.25rem" }} />
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F1F5F9", marginBottom: "0.75rem" }}>
                    Inquiry Received
                  </h3>
                  <p style={{ color: "#64748B", lineHeight: 1.75, fontSize: "0.9rem" }}>
                    Thank you for reaching out. Our team will review your requirements
                    and get back to you within one business day to schedule a consultation.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    padding: "2.25rem",
                    borderRadius: "1rem",
                    background: "rgba(8,14,26,0.85)",
                    border: "1px solid rgba(51,65,85,0.45)",
                    backdropFilter: "blur(14px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <Field label="Full Name" required error={errors.name}>
                      <TextInput value={form.name} onChange={set("name")} placeholder="John Smith" error={errors.name} />
                    </Field>
                    <Field label="Company Name" required error={errors.company}>
                      <TextInput value={form.company} onChange={set("company")} placeholder="Acme Corporation" error={errors.company} />
                    </Field>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <Field label="Email Address" required error={errors.email}>
                      <TextInput value={form.email} onChange={set("email")} placeholder="john@company.com" type="email" error={errors.email} />
                    </Field>
                    <Field label="Phone Number" required error={errors.phone}>
                      <TextInput value={form.phone} onChange={set("phone")} placeholder="+91 00000 00000" type="tel" error={errors.phone} />
                    </Field>
                  </div>

                  <Field label="Service / Product Interest" required error={errors.service}>
                    <SelectInput value={form.service} onChange={set("service")} options={SERVICE_OPTIONS} placeholder="Select a service or product" error={errors.service} />
                  </Field>

                  <Field label="Business Requirement">
                    <SelectInput value={form.requirement} onChange={set("requirement")} options={["New Deployment", "Upgrade / Expansion", "Replacement", "Consultation Only", "Support / Maintenance", "Other"]} placeholder="Type of requirement" />
                  </Field>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <Field label="Budget Range (Optional)">
                      <SelectInput value={form.budget} onChange={set("budget")} options={BUDGET_OPTIONS} placeholder="Approximate budget" />
                    </Field>
                    <Field label="City / Location">
                      <TextInput value={form.city} onChange={set("city")} placeholder="Mumbai, Delhi, Bangalore…" />
                    </Field>
                  </div>

                  <Field label="Message / Additional Details" required error={errors.message}>
                    <TextAreaInput value={form.message} onChange={set("message")} placeholder="Describe your infrastructure environment, project scope, or specific requirements…" error={errors.message} rows={5} />
                  </Field>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      padding: "0.9rem 1.75rem",
                      background: submitting ? "rgba(79,70,229,0.5)" : "linear-gradient(135deg, #4F46E5, #7C3AED)",
                      color: "#fff",
                      borderRadius: "0.5rem",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      border: "none",
                      cursor: submitting ? "wait" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      boxShadow: submitting ? "none" : "0 0 22px rgba(99,102,241,0.28)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { if (!submitting) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 36px rgba(99,102,241,0.44)"; } }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = submitting ? "none" : "0 0 22px rgba(99,102,241,0.28)"; }}
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }}
                        />
                        Sending…
                      </>
                    ) : (
                      <> <Send size={15} /> Send Inquiry</>
                    )}
                  </button>

                  <p style={{ fontSize: "0.72rem", color: "#334155", textAlign: "center", lineHeight: 1.6 }}>
                    Your information is used only to respond to your inquiry. We do not share data with third parties.
                  </p>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 4. QUICK INQUIRY CARDS ───────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem", background: "#060A12" }}>
        <BgLayer><GlowingMesh /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#818CF8", marginBottom: "0.75rem" }}>
                Quick Inquiry
              </p>
              <h2 style={{ fontSize: "clamp(1.65rem, 2.6vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9" }}>
                What Do You Need Help With?
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "1rem" }}>
            {INQUIRY_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeUp key={card.title} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      padding: "1.5rem",
                      borderRadius: "0.875rem",
                      background: "rgba(8,14,26,0.75)",
                      border: "1px solid rgba(51,65,85,0.4)",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = card.accent + "38";
                      e.currentTarget.style.boxShadow = `0 0 22px ${card.accent}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(51,65,85,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "0.6rem",
                        background: `${card.accent}14`,
                        border: `1px solid ${card.accent}28`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "0.9rem",
                      }}
                    >
                      <Icon size={18} color={card.accent} />
                    </div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#CBD5E1", marginBottom: "0.35rem" }}>{card.title}</p>
                    <p style={{ fontSize: "0.77rem", color: "#475569", lineHeight: 1.6, marginBottom: "0.9rem" }}>{card.summary}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.76rem", fontWeight: 600, color: card.accent }}>
                      Inquire Now <ChevronRight size={12} />
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. MAP SECTION ───────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem", background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(30,58,138,0.13) 0%, transparent 65%), #080C14" }}>
        <BgLayer><FloatingOrbs /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
              {/* Info */}
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#818CF8", marginBottom: "0.75rem" }}>
                  Our Location
                </p>
                <h2 style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                  Visit Our Office
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { icon: MapPin, label: "Address", value: "2/29, 1st Floor, near Hanuman Mandir, Vaibhav Khand, Gomti Nagar, Lucknow, UP" },
                    { icon: Phone, label: "Phone", value: "+91 95697 75104" },
                    { icon: Mail, label: "Email", value: "sales@deepminditsolutions.com" },
                    { icon: Clock, label: "Hours", value: "Mon–Sat, 9:30 AM – 6:30 PM IST" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "0.5rem",
                          background: "rgba(99,102,241,0.1)",
                          border: "1px solid rgba(99,102,241,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={15} color="#818CF8" />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{label}</p>
                        <p style={{ fontSize: "0.84rem", color: "#94A3B8", lineHeight: 1.55 }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  border: "1px solid rgba(51,65,85,0.45)",
                  height: 360,
                  background: "rgba(8,14,26,0.85)",
                }}
              >
                {/*
                  ── TO REPLACE WITH REAL MAP ──────────────────────────────────
                  Replace the content below with:
                  <iframe
                    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  ─────────────────────────────────────────────────────────────
                */}

                {/* Mock map grid */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                      linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Mock roads */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 400 360" preserveAspectRatio="none">
                  <line x1="0" y1="180" x2="400" y2="180" stroke="#818CF8" strokeWidth="3" />
                  <line x1="200" y1="0" x2="200" y2="360" stroke="#818CF8" strokeWidth="3" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="#818CF8" strokeWidth="1.5" />
                  <line x1="0" y1="270" x2="400" y2="270" stroke="#818CF8" strokeWidth="1.5" />
                  <line x1="100" y1="0" x2="100" y2="360" stroke="#818CF8" strokeWidth="1.5" />
                  <line x1="300" y1="0" x2="300" y2="360" stroke="#818CF8" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="200" y2="180" stroke="#818CF8" strokeWidth="1" />
                  <line x1="400" y1="0" x2="200" y2="180" stroke="#818CF8" strokeWidth="1" />
                </svg>
                {/* Pin */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50% 50% 50% 0",
                      background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "rotate(-45deg)",
                      boxShadow: "0 0 28px rgba(99,102,241,0.45)",
                    }}
                  >
                    <MapPin size={22} color="#fff" style={{ transform: "rotate(45deg)" }} />
                  </motion.div>
                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: "2px solid rgba(99,102,241,0.5)",
                    }}
                  />
                </div>

                {/* Label overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1rem 1.25rem",
                    background: "linear-gradient(0deg, rgba(8,14,26,0.95), transparent)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <MapPin size={14} color="#818CF8" />
                  <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 500 }}>
                    Deep Mind IT Solutions — Gomti Nagar, Lucknow
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 6. SUPPORT / RESPONSE EXPECTATION ───────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem", background: "#060A12" }}>
        <BgLayer><CircuitBoard /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#818CF8", marginBottom: "0.75rem" }}>
                What Happens Next
              </p>
              <h2 style={{ fontSize: "clamp(1.65rem, 2.6vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9" }}>
                After You Contact Deep Mind
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {SUPPORT_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeUp key={step.step} delay={i * 0.08}>
                  <div
                    style={{
                      padding: "1.75rem",
                      borderRadius: "0.875rem",
                      background: "rgba(8,14,26,0.75)",
                      border: "1px solid rgba(51,65,85,0.38)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Step number watermark */}
                    <div
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        right: "1rem",
                        fontSize: "3rem",
                        fontWeight: 800,
                        color: "rgba(99,102,241,0.06)",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        userSelect: "none",
                      }}
                    >
                      {step.step}
                    </div>

                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "0.6rem",
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <Icon size={19} color="#818CF8" />
                    </div>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#CBD5E1", marginBottom: "0.6rem", lineHeight: 1.35 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "0.79rem", lineHeight: 1.72, color: "#475569" }}>
                      {step.desc}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. CLOSING CTA ───────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "7rem", background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,70,229,0.1) 0%, transparent 65%), #080C14" }}>
        <BgLayer><NetworkParticles /></BgLayer>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <FadeUp>
            <div
              style={{
                position: "relative",
                padding: "4rem 3rem",
                borderRadius: "1.25rem",
                background: "linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.12))",
                border: "1px solid rgba(99,102,241,0.16)",
                backdropFilter: "blur(16px)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(99,102,241,0.12), transparent)",
                  pointerEvents: "none",
                }}
              />

              <p style={{ position: "relative", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#818CF8", marginBottom: "1rem" }}>
                Ready to Start
              </p>

              <h2 style={{ position: "relative", fontSize: "clamp(1.55rem, 2.8vw, 2.15rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9", marginBottom: "1.25rem", lineHeight: 1.25 }}>
                Ready to Discuss Your Next IT Infrastructure Project?
              </h2>

              <p style={{ position: "relative", color: "#64748B", lineHeight: 1.78, maxWidth: 510, margin: "0 auto 2.5rem", fontSize: "0.9rem" }}>
                Whether you're planning a new deployment, upgrading existing infrastructure,
                or need a consultation — our team is available to scope, design, and support
                your next technology initiative.
              </p>

              <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                <button
                  onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    padding: "0.9rem 2rem",
                    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 0 28px rgba(99,102,241,0.32)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 42px rgba(99,102,241,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(99,102,241,0.32)"; }}
                >
                  Request a Consultation <ArrowRight size={15} />
                </button>
                <a
                  href="tel:+919569775104"
                  style={{
                    padding: "0.9rem 2rem",
                    background: "transparent",
                    color: "#CBD5E1",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "1px solid rgba(148,163,184,0.22)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(148,163,184,0.07)"; e.currentTarget.style.borderColor = "rgba(148,163,184,0.42)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(148,163,184,0.22)"; }}
                >
                  <Phone size={15} /> Call / Email Our Team
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}