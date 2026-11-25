"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site, type ServiceCard } from "@/lib/site";
import { CheckBadge, Icon } from "./Icon";
import { Button } from "./ui";

const slides = [
  { image: "/images/lawn-residential.webp", label: "Lawn & Garden Care", alt: "Freshly striped lawn in front of a Barrie home" },
  { image: "/images/plow-trucks-commercial.webp", label: "Snow Plowing & Removal", alt: "J.T. Property Maintenance plow trucks in a cleared commercial lot at night" },
];

// Hero: crossfading background slides with a slow zoom, 5s autoplay (Landora's Swiper timing), paused on hover.
export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), 5000);
    return () => clearTimeout(t);
  }, [i, paused]);

  return (
    <section
      className="relative mx-[15px] mt-[10px] min-h-[720px] overflow-hidden rounded-[12px] bg-dark md:min-h-[820px] lg:min-h-[880px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 6, ease: "linear" }}>
            <Image src={slides[i].image} alt={slides[i].alt} fill sizes="100vw" className="object-cover" preload={i === 0} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,18,0.92)_0%,rgba(18,18,18,0.7)_45%,rgba(18,18,18,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark/80 to-transparent" />

      <div className="container-x relative flex min-h-[720px] flex-col justify-center pt-32 pb-16 md:min-h-[820px] lg:min-h-[880px] lg:px-[60px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-[8px] bg-white/15 px-4 py-2 text-[14px] font-medium tracking-wide text-white backdrop-blur md:text-[17px]"
        >
          <CheckBadge className="size-[18px] bg-lime text-dark" /> SERVING BARRIE SINCE {site.founded}
        </motion.p>

        <h1 className="hero-title max-w-[700px] text-white">
          {site.tagline.split(" ").map((w, n) => (
            <motion.span
              key={n}
              className="inline-block pr-[0.25em]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + n * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <div className="mt-5 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[18px] font-medium text-lime md:text-[22px]"
            >
              {slides[i].label}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Button href={site.phoneHref}>Call for a Free Quote</Button>
          <Button href="/services" variant="outline">Our Services</Button>
        </motion.div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-white md:text-[17px]">
            {["Residential & Commercial", "Free Estimates", "Year-Round Service"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckBadge className="size-[18px] bg-lime text-dark" /> {t}
              </li>
            ))}
          </ul>
          <div className="flex gap-2" role="tablist" aria-label="Choose slide">
            {slides.map((s, n) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={s.label}
                onClick={() => setI(n)}
                className={`h-2.5 rounded-full transition-all duration-500 ${n === i ? "w-10 bg-lime" : "w-2.5 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// "What We Do" card carousel: 3 visible on desktop with prev/next like Landora's owl carousel.
export function ServiceCarousel({ cards }: { cards: ServiceCard[] }) {
  const track = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 30), behavior: "smooth" });
  };
  return (
    <div>
      {/* Lenis keeps smoothing vertical wheel over the cards; only sideways swipes go to the native track. */}
      <div ref={track} className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-[30px] overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-pl-0 sm:px-0 [&::-webkit-scrollbar]:hidden" data-lenis-prevent-horizontal>
        {cards.map((c) => (
          <article key={c.title} className="group w-[85%] shrink-0 snap-start rounded-[12px] bg-white p-[15px] sm:w-[calc(50%-15px)] lg:w-[calc(33.333%-20px)]">
            <div className="relative aspect-[373/260] overflow-hidden rounded-[10px]">
              <Image src={c.image} alt={c.title} fill sizes="(min-width:1024px) 400px, 85vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="px-[18px] pt-7 pb-6">
              <h3 className="text-[22px] leading-snug lg:text-[26px]">{c.title}</h3>
              <p className="mt-3 text-[16px]">{c.text}</p>
              <Link href={c.href} className="mt-5 inline-flex items-center gap-1.5 text-[17px] font-medium text-dark transition-colors hover:text-primary">
                Learn More <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex justify-center gap-3">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            className="grid size-[50px] place-items-center rounded-[10px] bg-white text-dark transition-colors hover:bg-lime"
            aria-label={d < 0 ? "Previous services" : "Next services"}
          >
            <Icon name={d < 0 ? "arrowLeft" : "arrowRight"} />
          </button>
        ))}
      </div>
    </div>
  );
}

// jkit-style accordion: first item open, green header when open, height animation.
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {items.map((it, n) => {
        const isOpen = open === n;
        return (
          <div key={it.q} className={`overflow-hidden rounded-[12px] border transition-colors ${isOpen ? "border-primary bg-cream" : "border-line bg-white"}`}>
            <h3 className="!text-[17px] !font-medium md:!text-[20px]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : n)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors md:px-7 md:py-5 ${isOpen ? "bg-primary text-white" : "text-dark"}`}
              >
                {it.q}
                <span className={`grid size-8 shrink-0 place-items-center rounded-[6px] transition-transform duration-300 ${isOpen ? "rotate-180 bg-white text-dark" : "bg-cream text-dark"}`}>
                  <Icon name="chevronDown" className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
                  <p className="px-5 py-5 text-[16px] md:px-7">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
