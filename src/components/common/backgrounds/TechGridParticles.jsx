import React, { useMemo } from "react";
import "./TechGridParticles.css";

/**
 * TechGridParticles
 * 
 * Reusable enterprise tech grid background system.
 * 
 * Features:
 * - Perspective grid floor (animated drift)
 * - Vertical data lines (varying heights and delays)
 * - Floating particle nodes (cyan glowing dots)
 * - Glow horizon (soft pulsing cyan)
 * - Multiple depth layers
 * - GPU-accelerated CSS animations
 * - Responsive particle reduction on mobile
 * - No canvas, no heavy libraries
 * 
 * Performance:
 * - Pure CSS animations (60 FPS)
 * - Fixed positioning for GPU layering
 * - will-change optimizations
 * - Responsive particle count
 * 
 * Usage:
 * <TechGridParticles />
 * 
 * Always place as first child or early in DOM.
 * Set z-index to keep it behind content.
 */

function TechGridParticles() {
  // ─────────────────────────────────────────────────────────────
  // RESPONSIVE PARTICLE COUNT
  // ─────────────────────────────────────────────────────────────
  // Desktop: ~120 particles
  // Tablet: ~80 particles
  // Mobile: ~40 particles
  
  const particleCount = useMemo(() => {
    if (typeof window === "undefined") return 120;
    
    const width = window.innerWidth;
    if (width < 480) return 40;    // Mobile
    if (width < 768) return 80;    // Tablet
    return 120;                     // Desktop
  }, []);

  // ─────────────────────────────────────────────────────────────
  // VERTICAL DATA LINES
  // ─────────────────────────────────────────────────────────────
  // Generate vertical lines with varying properties
  // ~80-120 lines total
  
  const dataLines = useMemo(() => {
    const lines = [];
    const lineCount = typeof window !== "undefined" && window.innerWidth < 768 ? 60 : 100;
    
    for (let i = 0; i < lineCount; i++) {
      const randomHeight = Math.random() * 60 + 20; // 20-80% height
      const randomDelay = Math.random() * 15; // 0-15s delay
      const randomOpacity = Math.random() * 0.5 + 0.3; // 0.3-0.8 opacity
      const randomDuration = Math.random() * 8 + 12; // 12-20s duration
      
      lines.push({
        id: i,
        left: (i / lineCount) * 100,
        height: randomHeight,
        delay: randomDelay,
        opacity: randomOpacity,
        duration: randomDuration,
      });
    }
    return lines;
  }, []);

  // ─────────────────────────────────────────────────────────────
  // PARTICLE NODES
  // ─────────────────────────────────────────────────────────────
  // Generate floating particles with random properties
  
  const particles = useMemo(() => {
    const p = [];
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1; // 1-4px
      const left = Math.random() * 100;
      const delay = Math.random() * 20; // 0-20s
      const duration = Math.random() * 12 + 18; // 18-30s
      const drift = (Math.random() - 0.5) * 60; // -30 to 30px horizontal drift
      
      p.push({
        id: i,
        size,
        left,
        delay,
        duration,
        drift,
      });
    }
    return p;
  }, [particleCount]);

  return (
    <div className="tech-grid-particles" aria-hidden="true">
      {/* ──────────────────────────────────────────────────────
          LAYER 1: PERSPECTIVE GRID FLOOR
          ────────────────────────────────────────────────────── */}
      <div className="grid-floor" />

      {/* ──────────────────────────────────────────────────────
          LAYER 2: VERTICAL DATA LINES
          ────────────────────────────────────────────────────── */}
      <div className="data-lines-container">
        {dataLines.map((line) => (
          <div
            key={line.id}
            className="data-line"
            style={{
              left: `${line.left}%`,
              height: `${line.height}%`,
              animation: `float-line ${line.duration}s linear ${line.delay}s infinite`,
              opacity: line.opacity,
            }}
          />
        ))}
      </div>

      {/* ──────────────────────────────────────────────────────
          LAYER 3: PARTICLE NODES (FLOATING DOTS)
          ────────────────────────────────────────────────────── */}
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float-up ${particle.duration}s ease-in ${particle.delay}s infinite`,
              "--drift": `${particle.drift}px`,
            }}
          />
        ))}
      </div>

      {/* ──────────────────────────────────────────────────────
          LAYER 4: GLOW HORIZON
          ────────────────────────────────────────────────────── */}
      <div className="glow-horizon" />
    </div>
  );
}

export default TechGridParticles;
