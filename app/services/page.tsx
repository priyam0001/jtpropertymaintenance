import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/blocks";
import { CheckBadge, Icon } from "@/components/Icon";
import { Snow } from "@/components/Snow";
import { Eyebrow, Reveal } from "@/components/ui";
import { pageMeta, seasonal, serviceCards, site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta.services,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Our Services" image="/images/lawn-crew.webp" />

      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-[68px]">
          <Reveal from="left">
            <Eyebrow>On Time, Every Time</Eyebrow>
            <h2>Affordable landscaping and property maintenance for the {site.city} area</h2>
            <p className="mt-5 text-[16px]">
              We arrive at your property when you need us most, for everything from snow removal to grass cutting. You never have to wait around for our team to
              show up: we follow your schedule and meet your deadlines. Residential or commercial, you can count on excellent pricing and quality work.
            </p>
            <p className="mt-4 text-[16px]">Whether you need your grass cut or debris hauled away after a renovation, call us and we&apos;ll make sure your property meets your standards.</p>
          </Reveal>
          <Reveal from="right">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[12px]">
              <Image src="/images/jt-truck.webp" alt={`${site.name} lawn care truck`} fill sizes="(min-width:1024px) 620px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-cream">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center"><Eyebrow>What We Do</Eyebrow></div>
            <h2>Services for every season</h2>
          </Reveal>
          <div className="mt-12 grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((c, n) => (
              <Reveal key={c.title} delay={n * 0.1}>
                <Link href={c.href} className="group block h-full rounded-[12px] bg-white p-[15px]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                    <Image src={c.image} alt={c.title} fill sizes="(min-width:1024px) 300px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="px-3 pt-6 pb-4">
                    <h3 className="text-[20px] leading-snug lg:text-[22px]">{c.title}</h3>
                    <p className="mt-3 text-[15px]">{c.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-dark group-hover:text-primary">
                      Learn More <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <ServiceGroup title="Spring, Summer & Fall Property Care" icon="leaf" items={seasonal.warm} image="/images/stone-walkway.webp" />
          <ServiceGroup title="Winter Maintenance" icon="snow" items={seasonal.winter} image="/images/plow-trucks-commercial.webp" dark />
        </div>
        <p className="container-x mt-10 text-center text-[18px] font-medium text-dark">Annual, seasonal, monthly and one-time contracts available.</p>
      </section>

      <CtaBand />
    </>
  );
}

function ServiceGroup({ title, icon, items, image, dark = false }: { title: string; icon: "leaf" | "snow"; items: string[]; image: string; dark?: boolean }) {
  return (
    <Reveal>
      <div className={`h-full overflow-hidden rounded-[12px] ${dark ? "bg-dark" : "bg-cream"}`}>
        <div className="relative aspect-[16/7]">
          <Image src={image} alt="" fill sizes="(min-width:1024px) 650px, 100vw" className="object-cover" />
          {dark && <Snow />}
        </div>
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-4">
            <span className={`grid size-[54px] place-items-center rounded-[8px] ${dark ? "bg-lime text-dark" : "bg-white text-primary"}`}>
              <Icon name={icon} className="size-6" strokeWidth={1.6} />
            </span>
            <h2 className={`!text-[24px] lg:!text-[30px] ${dark ? "text-white" : ""}`}>{title}</h2>
          </div>
          <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {items.map((it) => (
              <li key={it} className={`flex items-center gap-3 ${dark ? "text-white" : "text-dark"}`}>
                <CheckBadge className={`size-5 ${dark ? "bg-lime text-dark" : ""}`} /> {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
