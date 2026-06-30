import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop
 * Har page par bottom-right corner me ek floating button — jab user
 * thoda neeche scroll kare, button fade/slide-in ho jata hai aur click
 * karne par smooth scroll se top par le jata hai.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 18, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.85 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: "fixed",
            right: "1.5rem",
            bottom: "1.5rem",
            zIndex: 60,
            width: 46,
            height: 46,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #2563EB, #4F46E5)",
            border: "1px solid rgba(148,163,184,0.25)",
            boxShadow: "0 8px 28px rgba(37,99,235,0.45)",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <ArrowUp size={20} strokeWidth={2.2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
