"use client";

// J.T. only (not in site-template). The snap/arrow/status logic mirrors ServiceCarousel in sections.tsx;
// it is copied rather than shared so `git merge template/main` never conflicts on this feature.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { instagram, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Eyebrow, Reveal } from "./ui";

type Reel = (typeof instagram.reels)[number];

export function Reels() {
  return (
    <section className="section-y bg-cream">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Instagram</Eyebrow>
            <h2>See the crew at work</h2>
          </div>
          <p className="text-[16px] lg:pb-2">
            Short videos from real jobs around {site.city}. Follow{" "}
            <a href={instagram.url} className="font-medium text-primary underline-offset-4 hover:underline" target="_blank" rel="noopener">
              @{instagram.handle}
            </a>{" "}
            for more.
          </p>
        </Reveal>
        <div className="mt-12">
          <ReelSlider />
        </div>
      </div>
    </section>
  );
}

function ReelSlider() {
  const track = useRef<HTMLDivElement>(null);
  const pending = useRef<number | null>(null); // scrollLeft a click already asked for, so rapid clicks build on it
  const settled = useRef(0);
  const [status, setStatus] = useState(""); // empty on load; only announced after the user scrolls
  const reels = instagram.reels;

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
    const n = Math.max(0, Math.min(list.length - 1, nearest(list, pending.current ?? el.scrollLeft) + dir));
    pending.current = list[n];
    const smooth = matchMedia("(prefers-reduced-motion: no-preference)").matches;
    el.scrollTo({ left: list[n], behavior: smooth ? "smooth" : "instant" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const settle = () => {
      pending.current = null;
      const n = nearest(snaps(el), el.scrollLeft);
      if (n === settled.current) return;
      settled.current = n;
      setStatus(`Reel ${n + 1} of ${el.children.length}`);
    };
    if ("onscrollend" in window) {
      // Lenis stops native scrollend at window in the capture phase; a capture listener on window still hears it.
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
    <div aria-roledescription="carousel" aria-label="Instagram reels" role="region">
      <div ref={track} className="-mx-5 flex touch-manipulation snap-x snap-mandatory scroll-pl-5 gap-[30px] overflow-x-auto overscroll-x-contain overscroll-y-auto! px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-pl-0 sm:px-0 [&::-webkit-scrollbar]:hidden" data-lenis-prevent-horizontal>
        {reels.map((r, n) => (
          <article key={r.id} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${reels.length}`} className="w-[78%] shrink-0 snap-start sm:w-[calc(50%-15px)] md:w-[calc(33.333%-20px)] xl:w-[calc(25%-22.5px)]">
            <ReelCard reel={r} />
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
            aria-label={d < 0 ? "Previous reels" : "Next reels"}
          >
            <Icon name={d < 0 ? "arrowLeft" : "arrowRight"} />
          </button>
        ))}
      </div>
    </div>
  );
}

// Facade: a self-hosted cover until tapped, so Instagram's player, scripts and cookies load only for people who ask.
// The box is the player's height from the start (4:5 video + ~225px header/footer), so nothing jumps on tap.
function ReelCard({ reel }: { reel: Reel }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="@container overflow-hidden rounded-[12px] bg-white">
      <div className="relative h-[calc(125cqi+225px)]">
        {playing ? (
          <iframe
            ref={(el) => el?.focus()}
            src={`https://www.instagram.com/reel/${reel.id}/embed/`}
            title={`Instagram reel: ${reel.title}`}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            scrolling="no" // the embed page is taller than its visible card and would show a stray scrollbar
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play reel: ${reel.title} (loads Instagram)`} className="group absolute inset-0 block size-full overflow-hidden text-left outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-lime">
            <Image src={`/images/reels/${reel.id}.webp`} alt="" fill sizes="(min-width:1280px) 300px, (min-width:768px) 33vw, (min-width:640px) 50vw, 78vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/10 to-transparent" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-lime text-dark shadow-lg transition-transform group-hover:scale-110">
                <Icon name="play" className="size-7 translate-x-0.5 fill-current" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5 text-[17px] leading-snug font-medium text-white lg:text-[19px]">{reel.title}</span>
          </button>
        )}
      </div>
    </div>
  );
}
