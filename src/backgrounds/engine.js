import { useEffect, useRef } from "react";

/* ============================================================
   SIMPLEX NOISE (2D) — lightweight, no dependency
   Used everywhere instead of Math.random() for organic motion
============================================================ */
const grad3 = [
  [1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1],
];
function buildPerm(seed) {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seed || 1;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return perm;
}
export function createNoise2D(seed = 42) {
  const perm = buildPerm(seed);
  const F2 = 0.5 * (Math.sqrt(3) - 1);
  const G2 = (3 - Math.sqrt(3)) / 6;
  return function noise2D(xin, yin) {
    let n0, n1, n2;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t, Y0 = j - t;
    const x0 = xin - X0, y0 = yin - Y0;
    let i1, j1;
    if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    const ii = i & 255, jj = j & 255;
    const gi0 = perm[ii + perm[jj]] % 8;
    const gi1 = perm[ii + i1 + perm[jj + j1]] % 8;
    const gi2 = perm[ii + 1 + perm[jj + 1]] % 8;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    n0 = t0 < 0 ? 0 : (t0 *= t0) * t0 * (grad3[gi0][0] * x0 + grad3[gi0][1] * y0);
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    n1 = t1 < 0 ? 0 : (t1 *= t1) * t1 * (grad3[gi1][0] * x1 + grad3[gi1][1] * y1);
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    n2 = t2 < 0 ? 0 : (t2 *= t2) * t2 * (grad3[gi2][0] * x2 + grad3[gi2][1] * y2);
    return 70 * (n0 + n1 + n2); // ~[-1,1]
  };
}

/* ============================================================
   MATH HELPERS — easing / interpolation
============================================================ */
export const lerp = (a, b, t) => a + (b - a) * t;
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
export const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export function springTo(value, target, velocity, stiffness = 0.06, damping = 0.82) {
  const force = (target - value) * stiffness;
  velocity = (velocity + force) * damping;
  return [value + velocity, velocity];
}
export function rand(min, max) { return Math.random() * (max - min) + min; }

/* ============================================================
   CANVAS ENGINE
   - DPR aware
   - ResizeObserver driven
   - delta-time based loop (frame-rate independent)
   - pointer tracking for mouse-reactive effects
============================================================ */
export function useCanvasEngine(setup, draw, opts = {}) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const parent = canvas.parentElement;
    let dpr = Math.min(window.devicePixelRatio || 1, opts.maxDPR || 2);
    let w = 0, h = 0;

    function resize() {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current = setup(w, h);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
      pointerRef.current.active = true;
    }
    function onLeave() { pointerRef.current.active = false; }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);

    let last = performance.now();
    function loop(now) {
      let dt = (now - last) / 1000;
      dt = Math.min(dt, 0.05); // clamp to avoid huge jumps on tab-switch
      last = now;
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, dt, now / 1000, stateRef.current, pointerRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return canvasRef;
}