import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * Koi bhi page khule ya route badle, scroll position hamesha top se start ho.
 * Agar URL me hash (#section) ho to us section tak smooth scroll karta hai,
 * warna page ke top par jump karta hai.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Thoda delay taaki target element DOM me render ho chuka ho
      const id = hash.replace("#", "");
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 80);
      return () => clearTimeout(timeout);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
