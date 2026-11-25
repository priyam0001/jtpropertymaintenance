"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Button } from "./ui";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
      <span className={`grid h-11 w-10 place-items-center rounded-[8px] ${dark ? "bg-primary" : "bg-primary/90"}`}>
        <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} className="h-8 w-auto" />
      </span>
      <span className={`text-[17px] leading-tight font-semibold lg:text-[19px] ${dark ? "text-dark" : "text-white"}`}>
        {site.wordmark[0]}
        <br className="sm:hidden" /> {site.wordmark[1]}
      </span>
    </Link>
  );
}

// Landora header: translucent pill floating over the hero, not sticky. Off-canvas menu ≤1024px.
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawer = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  async function openDrawer() {
    const d = drawer.current, sc = scroller.current;
    if (!d || !sc) return;
    d.showModal();
    // React drops the autofocus attribute, so focus the close button by hand; preventScroll keeps the track put.
    closeBtn.current?.focus({ preventScroll: true });
    setOpen(true);
    if (!CSS.supports("scroll-initial-target", "nearest")) {
      // Start from the closed stop so the slide-in is visible; two frames let the jump commit.
      sc.scrollTo({ left: sc.offsetWidth, behavior: "instant" });
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }
    sc.scrollTo({ left: 0, behavior: "auto" });
  }

  // Slide out only; the observer below closes the dialog once the sheet has left the screen.
  function closeDrawer() {
    const sc = scroller.current;
    sc?.scrollTo({ left: sc.offsetWidth, behavior: "auto" });
  }

  useEffect(() => {
    const d = drawer.current, sc = scroller.current, sh = sheet.current;
    if (!d || !sc || !sh) return;
    // Any visible pixel counts as open. Math.max guards a zero-width window at load (1/0 would throw).
    const gone = 1 / Math.max(window.innerWidth, 1);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].intersectionRatio < gone && d.open) {
          d.close();
          setOpen(false);
        }
      },
      { root: d, threshold: [gone, 1] },
    );
    io.observe(sh);
    // No scroll-driven animations: write the backdrop opacity from scroll position instead.
    const fade = () => d.style.setProperty("--drawer-backdrop", String(1 - sc.scrollLeft / sh.offsetWidth));
    const fallback = !CSS.supports("animation-timeline: scroll()");
    if (fallback) sc.addEventListener("scroll", fade);
    return () => {
      io.disconnect();
      if (fallback) sc.removeEventListener("scroll", fade);
    };
  }, []);

  return (
    <header className="absolute inset-x-0 top-[25px] z-40 px-[15px] md:top-[30px]">
      <div className="container-x !px-0 md:!px-5">
        <div className="flex items-center justify-between gap-4 rounded-[12px] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md lg:px-5">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 py-3 text-[17px] font-medium transition-colors hover:text-lime ${
                      pathname === item.href ? "text-lime" : "text-white"
                    }`}
                  >
                    {item.label}
                    {"children" in item && <Icon name="chevronDown" className="size-4 transition-transform group-hover:rotate-180" />}
                  </Link>
                  {"children" in item && (
                    <ul className="invisible absolute top-full left-0 min-w-[240px] translate-y-2 rounded-[10px] bg-white p-2 opacity-0 shadow-xl transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link href={c.href} className="block rounded-[6px] px-4 py-2.5 text-[15px] text-dark transition-colors hover:bg-cream hover:text-primary">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <a href={site.phoneHref} className="hidden items-center gap-2 text-[16px] font-medium text-white hover:text-lime xl:flex">
              <Icon name="phone" className="size-4" /> {site.phone}
            </a>
            <span className="hidden md:block">
              <Button href="/contact">Free Quote</Button>
            </span>
            <button
              type="button"
              onClick={openDrawer}
              className="rounded-[6px] bg-primary px-4 py-2.5 text-white lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal <dialog> drawer (modern-web-guidance navigation-drawer): a scroll-snap track with an open and a
          closed stop, so the browser handles the swipe. Styles are .Drawer* in globals.css. */}
      <dialog
        ref={drawer}
        id="mobile-menu"
        className="Drawer"
        aria-label="Mobile menu"
        data-lenis-prevent
        onCancel={(e) => {
          if (!e.cancelable) return;
          e.preventDefault();
          closeDrawer();
        }}
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (!sheet.current?.contains(t) || t.closest("a")) closeDrawer();
        }}
      >
        <div ref={scroller} className="Drawer-scroller">
          <nav ref={sheet} aria-label="Mobile" className="Drawer-sheet flex flex-col gap-6 bg-white p-6">
            <div className="flex items-center justify-between">
              <Logo dark />
              <button ref={closeBtn} type="button" onClick={closeDrawer} className="rounded-[6px] bg-primary p-2.5 text-white" aria-label="Close menu">
                <Icon name="close" className="size-5" />
              </button>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block py-3.5 text-[17px] font-medium text-dark">
                    {item.label}
                  </Link>
                  {"children" in item && (
                    <ul className="mb-3 ml-3 border-l border-line pl-4">
                      {item.children.slice(0, 3).map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block py-2 text-[15px] text-body">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Button href={site.phoneHref} variant="dark">Call {site.phone}</Button>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
