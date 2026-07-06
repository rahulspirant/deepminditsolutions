/**
 * Lightweight Suspense fallback for lazy-loaded routes.
 * Chunks are small (route-level split) so this is typically visible
 * for well under 100ms on a warm cache and a few hundred ms on a
 * cold 4G load — kept intentionally simple with no animation cost.
 */
function RouteFallback() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-live="polite"
      aria-busy="true"
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "3px solid rgba(0, 212, 255, 0.2)",
          borderTopColor: "#00D4FF",
          animation: "dm-route-spin 0.8s linear infinite",
        }}
      />
      <style>{`
        @keyframes dm-route-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default RouteFallback;
