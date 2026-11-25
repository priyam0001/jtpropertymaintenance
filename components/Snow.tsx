"use client";

import { useEffect, useRef } from "react";

// Light falling-snow overlay for dark winter areas (idea from React Bits' PixelSnow, own code: no licence strings attached).
// Canvas 2D, ~1 flake per 9000px², runs only while on screen and the tab is visible, off for reduced-motion users.
export function Snow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let flakes: { x: number; y: number; r: number; v: number; a: number; p: number }[] = [];
    let w = 0, h = 0, raf = 0, onScreen = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const flake = (y = Math.random() * h) => ({ x: Math.random() * w, y, r: 0.8 + Math.random() * 2.2, v: 0.25 + Math.random() * 0.9, a: 0.35 + Math.random() * 0.55, p: Math.random() * 6.28 });

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flakes = Array.from({ length: Math.round((w * h) / 9000) }, () => flake());
    };
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.v; f.p += 0.01; f.x += Math.sin(f.p) * 0.3;
        if (f.y > h + 4) Object.assign(f, flake(-4));
        ctx.globalAlpha = f.a;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      cancelAnimationFrame(raf); raf = 0;
      if (onScreen && !document.hidden) raf = requestAnimationFrame(frame);
    };

    ctx.fillStyle = "#fff";
    resize();
    const ro = new ResizeObserver(() => { resize(); ctx.fillStyle = "#fff"; });
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
    ro.observe(canvas); io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}
