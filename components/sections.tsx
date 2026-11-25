"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { heroSlides as slides, site, type ServiceCard } from "@/lib/site";
import { CheckBadge, Icon } from "./Icon";
import { Button } from "./ui";

// Hero: crossfading background slides with a slow zoom, 5s autoplay (Landora's Swiper timing), paused on hover.
export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), 5000);
    return () => clearTimeout(t);
  }, [i, paused, reduce]);

  return (
    <section
      className="relative mx-[15px] mt-[10px] min-h-[720px] overflow-hidden rounded-[12px] bg-dark md:min-h-[820px] lg:min-h-[880px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
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
            <Image src={slides[i].image} alt={slides[i].alt} fill sizes="100vw" className="object-cover" loading={i === 0 ? "eager" : undefined} fetchPriority={i === 0 ? "high" : undefined} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,18,0.92)_0%,rgba(18,18,18,0.7)_45%,rgba(18,18,18,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark/80 to-transparent" />

      <div className="container-x relative flex min-h-[720px] flex-col justify-center pt-32 pb-16 md:min-h-[820px] lg:min-h-[880px] lg:px-[60px]">
        {/* Load-in runs in CSS (.rise in globals.css) so the text paints before JS hydrates. */}
        <p className="rise mb-6 inline-flex w-fit items-center gap-2 rounded-[8px] bg-white/15 px-4 py-2 text-[14px] font-medium tracking-wide text-white backdrop-blur md:text-[17px]">
          <CheckBadge className="size-[18px] bg-lime text-dark" /> SERVING {site.city.toUpperCase()} SINCE {site.founded}
        </p>

        <h1 className="hero-title max-w-[700px] text-white">
          {site.tagline.split(" ").map((w, n) => (
            <span key={n} className="rise inline-block pr-[0.25em]" style={{ "--rise-delay": `${0.15 + n * 0.06}s` } as CSSProperties}>
              {w}
            </span>
          ))}
        </h1>

        <div className="mt-5 h-8 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
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

        <div className="rise mt-8 flex flex-wrap gap-4" style={{ "--rise-delay": "0.7s" } as CSSProperties}>
          <Button href={site.phoneHref}>Call for a Free Quote</Button>
          <Button href="/services" variant="outline">Our Services</Button>
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-white md:text-[17px]">
            {site.heroBadges.map((t) => (
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
  const pending = useRef<number | null>(null); // scrollLeft a click already asked for, so rapid clicks build on it
  const settled = useRef(0);
  const [status, setStatus] = useState(""); // empty on load; only announced after the user scrolls

  // Snap offsets of each card, measured from the first card (the track's start padding equals its scroll padding).
  const snaps = (el: HTMLDivElement) => {
    const kids = [...el.children] as HTMLElement[];
    const max = el.scrollWidth - el.clientWidth;
    return kids.map((k) => Math.min(k.offsetLeft - kids[0].offsetLeft, max));
  };
  const nearest = (list: number[], x: number) => list.reduce((b, p, n) => (Math.abs(p - x) < Math.abs(list[b] - x) ? n : b), 0);

  const go = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const list = snaps(el);
    const from = pending.current ?? el.scrollLeft;
    // nearest() picks the first of the end cards that share the max offset, so Previous always moves back.
    const n = Math.max(0, Math.min(list.length - 1, nearest(list, from) + dir));
    const left = list[n];
    pending.current = left;
    const smooth = matchMedia("(prefers-reduced-motion: no-preference)").matches;
    el.scrollTo({ left, behavior: smooth ? "smooth" : "instant" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const settle = () => {
      pending.current = null;
      const n = nearest(snaps(el), el.scrollLeft);
      if (n === settled.current) return;
      settled.current = n;
      setStatus(`Service ${n + 1} of ${el.children.length}`);
    };
    // scrollend where supported, else a debounced scroll listener; never both.
    if ("onscrollend" in window) {
      // Lenis stops native scrollend at window in the capture phase, so the track never hears it;
      // a capture listener on window itself still runs (stopPropagation spares same-node listeners).
      const onEnd = (e: Event) => e.target === el && settle();
      window.addEventListener("scrollend", onEnd, { capture: true });
      return () => window.removeEventListener("scrollend", onEnd, { capture: true });
    }
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(settle, 150);
    };
    el.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section aria-roledescription="carousel" aria-label="Our services">
      {/* Lenis keeps smoothing vertical wheel over the cards; only sideways swipes go to the native track.
          overscroll-y-auto! undoes lenis.css's overscroll-behavior: contain, which traps vertical finger swipes on phones. */}
      <div ref={track} className="-mx-5 flex touch-manipulation snap-x snap-mandatory scroll-pl-5 gap-[30px] overflow-x-auto overscroll-x-contain overscroll-y-auto! px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-pl-0 sm:px-0 [&::-webkit-scrollbar]:hidden" data-lenis-prevent-horizontal>
        {cards.map((c, n) => (
          <article key={c.title} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${cards.length}`} className="group w-[85%] shrink-0 snap-start rounded-[12px] bg-white p-[15px] sm:w-[calc(50%-15px)] lg:w-[calc(33.333%-20px)]">
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
      <p role="status" aria-live="polite" className="sr-only">{status}</p>
      <div className="mt-10 flex justify-center gap-3">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            className="grid size-[50px] touch-manipulation place-items-center rounded-[10px] bg-white text-dark transition-colors hover:bg-lime"
            aria-label={d < 0 ? "Previous services" : "Next services"}
          >
            <Icon name={d < 0 ? "arrowLeft" : "arrowRight"} />
          </button>
        ))}
      </div>
    </section>
  );
}

// jkit-style accordion: first item open, green header when open. Items open independently.
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((it, n) => (
        <AccordionItem key={it.q} q={it.q} a={it.a} defaultOpen={n === 0} />
      ))}
    </div>
  );
}

function AccordionItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panel = useRef<HTMLDivElement>(null);
  // Closed answers use hidden="until-found" so find-in-page can match and open them.
  // React only renders a boolean `hidden`, so the value is set here; Safari falls back to plain hidden.
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (!open) el.setAttribute("hidden", "until-found");
    const onMatch = () => setOpen(true);
    el.addEventListener("beforematch", onMatch);
    return () => el.removeEventListener("beforematch", onMatch);
  }, [open]);
  const id = useId();

  return (
    <div className={`overflow-hidden rounded-[12px] border transition-colors ${open ? "border-primary bg-cream" : "border-line bg-white"}`}>
      <h3 className="!text-[17px] !font-medium md:!text-[20px]">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={id}
          className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors md:px-7 md:py-5 ${open ? "bg-primary text-white" : "text-dark"}`}
        >
          {q}
          <span className={`grid size-8 shrink-0 place-items-center rounded-[6px] transition-transform duration-300 ${open ? "rotate-180 bg-white text-dark" : "bg-cream text-dark"}`}>
            <Icon name="chevronDown" className="size-4" />
          </span>
        </button>
      </h3>
      <div ref={panel} id={id} hidden={!open}>
        <p className="px-5 py-5 text-[16px] md:px-7">{a}</p>
      </div>
    </div>
  );
}
