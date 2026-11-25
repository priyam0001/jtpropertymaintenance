import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";

type ButtonProps = { href: string; children: ReactNode; variant?: "lime" | "dark" | "outline"; className?: string };

// Landora CTA: lime pill, 10px radius, dark-green arrow chip; hover flips the fill.
export function Button({ href, children, variant = "lime", className = "" }: ButtonProps) {
  const styles = {
    lime: "bg-lime text-dark hover:bg-primary hover:text-white",
    dark: "bg-primary text-white hover:bg-dark",
    outline: "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-dark",
  }[variant];
  const chip = variant === "lime" ? "bg-primary text-lime group-hover:bg-lime group-hover:text-dark" : "bg-lime text-dark";
  const external = href.startsWith("tel:") || href.startsWith("mailto:");
  const cls = `group inline-flex items-center gap-4 rounded-[10px] py-[11px] pr-[12px] pl-[26px] text-[15px] font-medium transition-colors duration-300 lg:text-[18px] ${styles} ${className}`;
  const inner = (
    <>
      {children}
      <span className={`grid size-[30px] place-items-center rounded-[6px] transition-colors duration-300 ${chip}`}>
        <Icon name="arrowUpRight" className="size-4" />
      </span>
    </>
  );
  return external ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-3 flex items-center gap-2 text-[16px] font-medium lg:text-[18px] ${light ? "text-white" : "text-dark"}`}>
      <span className="flex gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`size-[5px] rounded-full ${light ? "bg-lime" : "bg-dark"}`} />
        ))}
      </span>
      {children}
    </p>
  );
}

// Landora's fadeInUp / Left / Right as a CSS scroll-driven animation (globals.css .reveal).
// Content is visible without JS; browsers without view() timelines or with reduced motion skip the effect.
export function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  from?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal reveal-${from} ${className}`} style={delay ? ({ "--reveal-delay": delay } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}
