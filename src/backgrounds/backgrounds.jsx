import { useRef } from "react";
import {
  useCanvasEngine,
  createNoise2D,
  lerp,
  easeInOutSine,
  clamp,
  rand,
} from "./engine";

const noise2D = createNoise2D(7);

/* helper: additive glow dot */
function glowDot(ctx, x, y, r, color, blur) {
  ctx.beginPath();
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.fillStyle = color;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

/* ============================================================
   1. NETWORK PARTICLES
============================================================ */
function NetworkParticles() {
  const setup = (w, h) => {
    const layers = [
      { count: 60, speed: 0.4, size: [1.6, 2.6], alpha: 0.95, blur: 9, z: 1 },
      { count: 55, speed: 0.25, size: [1, 1.8], alpha: 0.55, blur: 5, z: 0.6 },
      { count: 50, speed: 0.12, size: [0.6, 1.2], alpha: 0.3, blur: 2, z: 0.3 },
    ];
    const particles = [];
    layers.forEach((layer, li) => {
      for (let i = 0; i < layer.count; i++) {
        particles.push({
          x: rand(0, w), y: rand(0, h),
          nOff: rand(0, 1000),
          r: rand(layer.size[0], layer.size[1]),
          layer: li, ...layer,
          flashAt: rand(3, 14),
        });
      }
    });
    return { particles, pulses: [], nextPulse: 1.5, camPhase: rand(0, 100) };
  };

  const draw = (ctx, w, h, dt, t, st) => {
    const camX = Math.sin(t * 0.04 + st.camPhase) * 18;
    const camY = Math.cos(t * 0.03 + st.camPhase) * 12;
    const byLayer = [2, 1, 0].map((l) => st.particles.filter((p) => p.layer === l));

    for (const group of byLayer) {
      for (const p of group) {
        const ang = noise2D(p.x * 0.0025 + p.nOff, p.y * 0.0025 + t * 0.05) * Math.PI * 2;
        p.x += Math.cos(ang) * p.speed * dt * 18;
        p.y += Math.sin(ang) * p.speed * dt * 18;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          const a = group[i], b = group[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const maxD = 95 * (0.5 + a.z * 0.5);
          if (d < maxD) {
            const breathe = 0.5 + 0.5 * Math.sin(t * 1.1 + (a.nOff + b.nOff) * 0.01);
            const alpha = (1 - d / maxD) * 0.35 * a.alpha * breathe;
            const grad = ctx.createLinearGradient(a.x + camX, a.y + camY, b.x + camX, b.y + camY);
            grad.addColorStop(0, `rgba(56,189,248,${alpha})`);
            grad.addColorStop(1, `rgba(99,102,241,${alpha * 0.7})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8 * a.z;
            ctx.beginPath();
            ctx.moveTo(a.x + camX, a.y + camY);
            ctx.lineTo(b.x + camX, b.y + camY);
            ctx.stroke();
          }
        }
      }
      for (const p of group) {
        const pulse = 0.6 + 0.4 * Math.sin(t * 1.8 + p.nOff);
        const flash = (t % p.flashAt) < 0.08 ? 1.8 : 1;
        glowDot(ctx, p.x + camX, p.y + camY, p.r * pulse * flash, `rgba(125,211,252,${p.alpha})`, p.blur * flash);
      }
    }

    st.nextPulse -= dt;
    if (st.nextPulse <= 0) {
      const all = st.particles;
      const a = all[Math.floor(rand(0, all.length))];
      const b = all[Math.floor(rand(0, all.length))];
      if (a !== b) st.pulses.push({ a, b, prog: 0 });
      st.nextPulse = rand(0.6, 1.4);
    }
    st.pulses = st.pulses.filter((p) => p.prog < 1);
    for (const pu of st.pulses) {
      pu.prog += dt * 0.7;
      const e = easeInOutSine(clamp(pu.prog, 0, 1));
      const x = lerp(pu.a.x, pu.b.x, e) + camX;
      const y = lerp(pu.a.y, pu.b.y, e) + camY;
      glowDot(ctx, x, y, 2.2, "rgba(255,255,255,0.95)", 14);
    }
  };

  const ref = useCanvasEngine(setup, draw);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ============================================================
   3. TECH GRID PARTICLES
============================================================ */
function TechGridParticles() {
  const setup = (w, h) => ({
    pillars: Array.from({ length: 50 }, () => ({
      x: rand(0, 1), height: rand(0.15, 1),
      speed: rand(0.2, 0.6), phase: rand(0, 10), pulseOffset: rand(0, 10),
    })),
    sweepPhase: rand(0, 10),
    towers: Array.from({ length: 14 }, () => ({
      x: rand(0, 1), w: rand(0.01, 0.025), h: rand(0.1, 0.45), flickerOff: rand(0, 10),
    })),
  });

  const draw = (ctx, w, h, dt, t, st) => {
    const horizon = h * 0.58;

    const fogGrad = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 60);
    fogGrad.addColorStop(0, "rgba(56,189,248,0)");
    fogGrad.addColorStop(0.5, `rgba(56,189,248,${0.08 + 0.03 * Math.sin(t * 0.4)})`);
    fogGrad.addColorStop(1, "rgba(56,189,248,0)");
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, horizon - 40, w, 100);

    for (const tw of st.towers) {
      const x = tw.x * w;
      const flick = 0.5 + 0.5 * Math.sin(t * 2 + tw.flickerOff) > 0.92 ? 0.4 : 1;
      const hgt = tw.h * horizon;
      ctx.strokeStyle = `rgba(56,189,248,${0.15 * flick})`;
      ctx.lineWidth = tw.w * w;
      ctx.beginPath();
      ctx.moveTo(x, horizon);
      ctx.lineTo(x, horizon - hgt);
      ctx.stroke();
    }

    const scrollOffset = (t * 30) % 40;
    for (let i = -14; i <= 14; i++) {
      const xTop = w / 2 + i * 6;
      const xBottom = w / 2 + i * 70;
      ctx.beginPath();
      ctx.moveTo(xTop, horizon);
      ctx.lineTo(xBottom, h);
      ctx.strokeStyle = "rgba(56,189,248,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (let j = 0; j < 18; j++) {
      const yFactor = (j + scrollOffset / 40) / 18;
      const y = horizon + (h - horizon) * yFactor * yFactor;
      if (y > h) continue;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.strokeStyle = `rgba(56,189,248,${0.22 * (1 - yFactor)})`;
      ctx.stroke();
      ctx.fillStyle = `rgba(56,189,248,${0.015 * (1 - yFactor)})`;
      ctx.fillRect(0, y, w, 2);
    }

    const grad = ctx.createRadialGradient(w / 2, horizon, 0, w / 2, horizon, w * 0.6);
    grad.addColorStop(0, "rgba(56,189,248,0.32)");
    grad.addColorStop(1, "rgba(56,189,248,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, horizon - 100, w, 200);

    const sweepX = ((t * 0.16 + st.sweepPhase) % 1) * w;
    const sweepGrad = ctx.createLinearGradient(sweepX - 70, 0, sweepX + 70, 0);
    sweepGrad.addColorStop(0, "rgba(125,211,252,0)");
    sweepGrad.addColorStop(0.5, "rgba(125,211,252,0.16)");
    sweepGrad.addColorStop(1, "rgba(125,211,252,0)");
    ctx.fillStyle = sweepGrad;
    ctx.fillRect(sweepX - 70, 0, 140, h);

    for (const v of st.pillars) {
      const x = v.x * w;
      const baseAlpha = 0.3 + 0.25 * Math.abs(Math.sin(t * v.speed + v.phase));
      const barH = v.height * horizon * 0.95;
      const grad2 = ctx.createLinearGradient(x, horizon, x, horizon - barH);
      grad2.addColorStop(0, `rgba(125,211,252,${baseAlpha})`);
      grad2.addColorStop(1, "rgba(125,211,252,0)");
      ctx.strokeStyle = grad2;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(x, horizon);
      ctx.lineTo(x, horizon - barH);
      ctx.stroke();

      const pulseT = ((t * 0.5 + v.pulseOffset) % 2) / 2;
      const py = horizon - barH * pulseT;
      glowDot(ctx, x, py, 1.7, `rgba(255,255,255,${Math.sin(pulseT * Math.PI) * 0.9})`, 9);
    }
  };

  const ref = useCanvasEngine(setup, draw);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ============================================================
   4. FLOATING ORBS
============================================================ */
function FloatingOrbs() {
  const setup = (w, h) => ({
    orbs: Array.from({ length: 8 }, () => ({
      x: rand(0, w), y: rand(0, h), r: rand(18, 52),
      hue: ["56,189,248", "168,85,247", "99,102,241"][Math.floor(rand(0, 3))],
      nOff: rand(0, 1000), speed: rand(0.05, 0.12),
    })),
    dust: Array.from({ length: 50 }, () => ({
      x: rand(0, w), y: rand(0, h), r: rand(0.5, 1.4), nOff: rand(0, 1000),
    })),
  });

  const draw = (ctx, w, h, dt, t, st) => {
    for (const o of st.orbs) {
      const nx = noise2D(o.nOff, t * o.speed) * 30;
      const ny = noise2D(o.nOff + 50, t * o.speed) * 22;
      o.tx = o.x + nx;
      o.ty = o.y + ny;
    }
    for (let i = 0; i < st.orbs.length; i++) {
      for (let j = i + 1; j < st.orbs.length; j++) {
        const a = st.orbs[i], b = st.orbs[j];
        const dx = a.tx - b.tx, dy = a.ty - b.ty;
        const d = Math.hypot(dx, dy);
        const minD = (a.r + b.r) * 0.9;
        if (d < minD && d > 0.01) {
          const push = (minD - d) / minD * 6;
          a.tx += (dx / d) * push * dt;
          a.ty += (dy / d) * push * dt;
          b.tx -= (dx / d) * push * dt;
          b.ty -= (dy / d) * push * dt;
        }
      }
    }
    for (const o of st.orbs) {
      o.x = lerp(o.x, o.tx, 0.02);
      o.y = lerp(o.y, o.ty, 0.02);

      const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      grad.addColorStop(0, `rgba(${o.hue},0.55)`);
      grad.addColorStop(0.5, `rgba(${o.hue},0.22)`);
      grad.addColorStop(1, `rgba(${o.hue},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,0.18)`;
      ctx.ellipse(o.x - o.r * 0.25, o.y - o.r * 0.3, o.r * 0.3, o.r * 0.16, -0.5, 0, Math.PI * 2);
      ctx.fill();

      glowDot(ctx, o.x, o.y, o.r * 0.1, `rgba(${o.hue},0.9)`, 14);
    }

    for (const d of st.dust) {
      const n = noise2D(d.nOff, t * 0.1);
      d.x += Math.cos(n * Math.PI * 2) * 4 * dt;
      d.y += Math.sin(n * Math.PI * 2) * 4 * dt;
      if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
      glowDot(ctx, d.x, d.y, d.r, "rgba(186,230,253,0.4)", 3);
    }
  };

  const ref = useCanvasEngine(setup, draw);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ============================================================
   9. CIRCUIT BOARD
============================================================ */
function CircuitBoard() {
  const setup = (w, h) => {
    const paths = [];
    const gridSize = 34;
    for (let i = 0; i < 26; i++) {
      const points = [];
      let cx = rand(0, w), cy = rand(0, h);
      points.push({ x: cx, y: cy });
      const segs = Math.floor(rand(3, 6));
      for (let s = 0; s < segs; s++) {
        if (Math.random() > 0.5) cx += rand(-1, 1) > 0 ? gridSize * rand(1, 3) : -gridSize * rand(1, 3);
        else cy += rand(-1, 1) > 0 ? gridSize * rand(1, 3) : -gridSize * rand(1, 3);
        points.push({ x: cx, y: cy });
      }
      let total = 0;
      const lens = [0];
      for (let k = 1; k < points.length; k++) {
        total += Math.hypot(points[k].x - points[k - 1].x, points[k].y - points[k - 1].y);
        lens.push(total);
      }
      paths.push({ points, lens, total, speed: rand(0.25, 0.6), offset: rand(0, 1) });
    }
    const chips = Array.from({ length: 10 }, () => ({
      x: rand(0, w), y: rand(0, h), size: rand(8, 16), nextBlink: rand(1, 4),
    }));
    return { paths, chips };
  };

  const pointAtDist = (points, lens, total, dist) => {
    const d = ((dist % total) + total) % total;
    for (let i = 1; i < lens.length; i++) {
      if (d <= lens[i]) {
        const segLen = lens[i] - lens[i - 1];
        const f = segLen === 0 ? 0 : (d - lens[i - 1]) / segLen;
        const a = points[i - 1], b = points[i];
        return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
      }
    }
    return points[0];
  };

  const draw = (ctx, w, h, dt, t, st) => {
    for (const p of st.paths) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(56,189,248,0.2)";
      ctx.lineWidth = 1;
      p.points.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
      ctx.stroke();

      const dist = t * 60 * p.speed + p.offset * p.total;
      for (let trail = 0; trail < 7; trail++) {
        const tp = pointAtDist(p.points, p.lens, p.total, dist - trail * 6);
        const alpha = (1 - trail / 7) * 0.9;
        glowDot(ctx, tp.x, tp.y, trail === 0 ? 2.1 : 1.1, `rgba(186,230,253,${alpha})`, trail === 0 ? 9 : 0);
      }
    }

    for (const c of st.chips) {
      ctx.strokeStyle = "rgba(56,189,248,0.35)";
      ctx.strokeRect(c.x - c.size / 2, c.y - c.size / 2, c.size, c.size);
      c.nextBlink -= dt;
      if (c.nextBlink <= 0) {
        c.blinking = true;
        c.nextBlink = rand(1.5, 4);
        c.blinkLife = 0.3;
      }
      if (c.blinking) {
        c.blinkLife -= dt;
        glowDot(ctx, c.x, c.y, 2.5, `rgba(255,255,255,${Math.max(c.blinkLife / 0.3, 0)})`, 10);
        if (c.blinkLife <= 0) c.blinking = false;
      }
    }
  };

  const ref = useCanvasEngine(setup, draw);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ============================================================
   11. GLOWING MESH
============================================================ */
function GlowingMesh() {
  const setup = (w, h) => ({
    pts: Array.from({ length: 70 }, () => ({
      x: rand(0, w), y: rand(0, h),
      vx: 0, vy: 0,
      hx: rand(0, w), hy: rand(0, h),
      nOff: rand(0, 1000),
    })),
    pulses: [], nextPulse: 0,
  });

  const draw = (ctx, w, h, dt, t, st, pointer) => {
    const { pts } = st;
    for (const p of pts) {
      p.hx += noise2D(p.nOff, t * 0.05) * 6 * dt;
      p.hy += noise2D(p.nOff + 40, t * 0.05) * 6 * dt;
      p.hx = clamp(p.hx, 0, w);
      p.hy = clamp(p.hy, 0, h);

      const ax = (p.hx - p.x) * 0.02;
      const ay = (p.hy - p.y) * 0.02;
      p.vx = (p.vx + ax) * 0.9;
      p.vy = (p.vy + ay) * 0.9;

      if (pointer.active) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < 110 && d > 0.01) {
          const force = (1 - d / 110) * 4;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
      }

      p.x += p.vx;
      p.y += p.vy;
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 95) {
          const breathe = 0.5 + 0.5 * Math.sin(t * 1.4 + a.nOff * 0.01);
          ctx.strokeStyle = `rgba(56,189,248,${0.3 * (1 - d / 95) * breathe})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    st.nextPulse -= dt;
    if (st.nextPulse <= 0 && pts.length > 2) {
      const a = pts[Math.floor(rand(0, pts.length))];
      const b = pts[Math.floor(rand(0, pts.length))];
      if (Math.hypot(a.x - b.x, a.y - b.y) < 95) st.pulses.push({ a, b, prog: 0 });
      st.nextPulse = rand(0.1, 0.3);
    }
    st.pulses = st.pulses.filter((p) => p.prog < 1);
    for (const pu of st.pulses) {
      pu.prog += dt * 1.6;
      const x = lerp(pu.a.x, pu.b.x, pu.prog);
      const y = lerp(pu.a.y, pu.b.y, pu.prog);
      glowDot(ctx, x, y, 1.8, "rgba(255,255,255,0.95)", 9);
    }

    for (const p of pts) {
      const pulse = 0.6 + 0.4 * Math.sin(t * 2 + p.nOff);
      glowDot(ctx, p.x, p.y, 1.6 * pulse, "rgba(125,211,252,0.85)", 6);
    }
  };

  const ref = useCanvasEngine(setup, draw);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ============================================================
   BACKGROUND WRAPPER — sirf class lagao, baaki automatic
============================================================ */
const BACKGROUND_MAP = {
  "bg-network":   NetworkParticles,
  "bg-techgrid":  TechGridParticles,
  "bg-orbs":      FloatingOrbs,
  "bg-circuit":   CircuitBoard,
  "bg-mesh":      GlowingMesh,
};

/**
 * BackgroundWrapper — kisi bhi existing div ke saath use karo.
 *
 * <div className="bg-network">
 *   <YourContent />
 * </div>
 *
 * Ye component apne aap detect kar leta hai kaun si class lagi hai.
 */
export function BackgroundWrapper({ className = "", children, style = {}, ...props }) {
  const bgKey = Object.keys(BACKGROUND_MAP).find((cls) =>
    className.split(" ").includes(cls)
  );
  const BgComponent = bgKey ? BACKGROUND_MAP[bgKey] : null;

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
      {...props}
    >
      {BgComponent && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <BgComponent />
        </div>
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export { NetworkParticles, TechGridParticles, FloatingOrbs, CircuitBoard, GlowingMesh };
