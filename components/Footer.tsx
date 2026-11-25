import Image from "next/image";
import Link from "next/link";
import { award, nav, serviceCards, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="mx-[15px] mb-[15px] overflow-hidden rounded-[12px] bg-dark text-white max-md:mb-[86px]">
      <div className="relative">
        {/* Soft green glow standing in for Landora's textured footer background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_110%,rgba(0,91,45,0.55),transparent_70%)]" />
        <div className="container-x relative grid gap-10 pt-[62px] pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-white/80">
              Year-round landscaping and property maintenance for homes and businesses in {site.area}, since {site.founded}.
            </p>
            {award && (
              <div className="mt-6 flex items-center gap-3">
                <Image src={award.images.at(-1)!.src} alt={award.images.at(-1)!.alt} width={60} height={80} className="h-20 w-auto rounded-[6px]" />
                <p className="text-[14px] text-white/80">
                  {award.name}
                  <br />
                  <span className="font-semibold text-white">{award.years}</span> · {award.category}
                </p>
              </div>
            )}
          </div>

          <FooterCol title="Company" links={nav.map((n) => ({ href: n.href, label: n.label }))} />
          <FooterCol title="Services" links={serviceCards.map((s) => ({ href: s.href, label: s.title }))} />

          <div>
            <h3 className="mb-5 text-[22px] text-white lg:text-[26px]">Get in Touch</h3>
            <ul className="space-y-4 text-[16px]">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 hover:text-lime">
                  <Icon name="phone" className="size-4 text-lime" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-lime">
                  <Icon name="mail" className="size-4 shrink-0 text-lime" /> {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="pin" className="size-4 text-lime" /> Serving {site.area}
              </li>
              {site.hours.map((h) => (
                <li key={h.label} className="flex gap-3 text-white/80">
                  <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-lime" />
                  <span>
                    {h.label}: <span className="text-white">{h.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-x relative pb-8">
          <div className="flex flex-col gap-3 rounded-[12px] bg-white/10 px-6 py-5 text-[15px] md:flex-row md:items-center md:justify-between md:px-8">
            <p>© {site.name}. All rights reserved.</p>
            <p className="text-white/70">{site.footerLine}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-5 text-[22px] text-white lg:text-[26px]">{title}</h3>
      <ul className="space-y-3 text-[16px]">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="transition-colors hover:text-lime">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Phones: fixed call bar (most leads are mobile).
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-line bg-white p-2.5 md:hidden">
      <a href={site.phoneHref} className="flex items-center justify-center gap-2 rounded-[10px] bg-primary py-3 text-[16px] font-semibold text-white">
        <Icon name="phone" className="size-4" /> Call Now
      </a>
      <Link href="/contact" className="flex items-center justify-center rounded-[10px] bg-lime py-3 text-[16px] font-semibold text-dark">
        Free Quote
      </Link>
    </div>
  );
}
