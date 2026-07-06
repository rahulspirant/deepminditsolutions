import { useEffect, useRef, useState } from "react";

/**
 * useAutoScroll
 * ------------------------------------------------------------------
 * Keeps a scroll container pinned to the bottom as new content
 * streams in, but stops auto-scrolling the moment the user manually
 * scrolls up to read earlier messages — resuming only once they
 * scroll back near the bottom themselves.
 * ------------------------------------------------------------------
 */
export function useAutoScroll(dependency) {
  const containerRef = useRef(null);
  const [shouldStick, setShouldStick] = useState(true);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShouldStick(distanceFromBottom < 80);
  };

  useEffect(() => {
    if (!shouldStick) return;
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [dependency, shouldStick]);

  return { containerRef, handleScroll, shouldStick };
}

export default useAutoScroll;
