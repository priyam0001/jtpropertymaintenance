"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Button } from "./ui";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
      <span className={`grid h-11 w-10 place-items-center rounded-[8px] ${dark ? "bg-primary" : "bg-primary/90"}`}>
        <Image src="/images/jt-logo.png" alt="" width={433} height={558} className="h-8 w-auto" preload />
      </span>
      <span className={`text-[17px] leading-tight font-semibold lg:text-[19px] ${dark ? "text-dark" : "text-white"}`}>
        J.T. Property
        <br className="sm:hidden" /> Maintenance
      </span>
    </Link>
  );
}

// Landora header: translucent pill floating over the hero, not sticky. Off-canvas menu ≤1024px.
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
              onClick={() => setOpen(true)}
              className="rounded-[6px] bg-primary px-4 py-2.5 text-white lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-dark/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-full max-w-[360px] flex-col gap-6 overflow-y-auto bg-white p-6 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: [0.6, 0.1, 0.2, 1] }}
              aria-label="Mobile menu"
              onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
            >
              <div className="flex items-center justify-between">
                <Logo dark />
                <button type="button" onClick={() => setOpen(false)} className="rounded-[6px] bg-primary p-2.5 text-white" aria-label="Close menu">
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
