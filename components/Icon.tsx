// Minimal stroke icons (Lucide-style paths, 24×24) so no icon dependency is needed.
const paths = {
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  chevronDown: "m6 9 6 6 6-6",
  phone:
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 2-10 7L2 6",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-14v4l3 2",
  pin: "M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  check: "M20 6 9 17l-5-5",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M18 6 6 18M6 6l12 12",
  snow: "M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9M9 4l3 2 3-2M9 20l3-2 3 2M4 9l2 3-2 3M20 9l-2 3 2 3",
  leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Zm-9 1c0-3 1.9-5.4 5.1-6",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5-1L7 22l5-3 5 3-1.5-8",
  clipboard:
    "M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1Zm7 2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m1 10 2 2 4-4",
  building: "M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1M9 17h6v4H9z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-5", strokeWidth = 2 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

export function CheckBadge({ className = "size-5" }: { className?: string }) {
  return (
    <span className={`inline-grid shrink-0 place-items-center rounded-full bg-primary text-white ${className}`} aria-hidden="true">
      <Icon name="check" className="size-[60%]" strokeWidth={3} />
    </span>
  );
}
