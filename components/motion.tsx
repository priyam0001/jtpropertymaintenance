"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

// Lenis smooth scroll (design upgrade); skipped entirely for reduced-motion users.
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
