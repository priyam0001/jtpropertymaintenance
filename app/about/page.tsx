import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero } from "@/components/blocks";
import { CheckBadge, Icon, type IconName } from "@/components/Icon";
import { Eyebrow, Reveal } from "@/components/ui";
import { award, pageMeta, site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta.about,
  alternates: { canonical: "/about" },
};

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "clock", title: "On time, every time", text: "We follow your schedule and meet your deadlines. You never have to wait around for our crew." },
  { icon: "calendar", title: "All four seasons", text: "Spring planting through winter snow: one team looks after your property all year." },
  { icon: "building", title: "No job too big or small", text: "From a single clean-up to an annual contract for a commercial lot, we handle it." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" image="/images/lawn-commercial.webp" />

      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-[68px]">
          <Reveal from="left" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[12px]">
              <Image src="/images/stone-walkway.webp" alt="Flagstone walkway beside a brick home" fill sizes="(min-width:1024px) 620px, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-[12px] bg-primary px-7 py-5 text-white">
              <p className="text-[15px] text-white/80">Serving {site.city} since</p>
              <p className="text-[40px] leading-none font-bold text-lime">{site.founded}</p>
            </div>
          </Reveal>
          <Reveal from="right">
            <Eyebrow>Our Story</Eyebrow>
            <h2>Keeping {site.city} properties in pristine shape since {site.founded}</h2>
            <p className="mt-5 text-[16px]">
              From spring planting to winter snow, {site.name} has you covered. We take great pride in keeping your property in pristine shape with
              planting, landscaping, routine maintenance and grooming, and timely, efficient snow removal.
            </p>
            <p className="mt-4 text-[16px]">
              Our professional staff is always prepared with current equipment, and we look after both residential and commercial properties. Save yourself the
              headache and hassle: call the pros.
            </p>
            <ul className="mt-7 space-y-3">
              {["Residential & commercial properties", "Annual, seasonal, monthly and one-time contracts", "Free estimates on every job"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-dark"><CheckBadge /> {t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-cream">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center"><Eyebrow>What Drives Us</Eyebrow></div>
            <h2>How we work</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v, n) => (
              <Reveal key={v.title} delay={n * 0.12}>
                <div className="group h-full rounded-[12px] bg-white p-8 transition-colors duration-300 hover:bg-primary">
                  <span className="grid size-[54px] place-items-center rounded-[8px] bg-cream text-primary"><Icon name={v.icon} className="size-6" strokeWidth={1.6} /></span>
                  <h3 className="mt-6 text-[22px] transition-colors group-hover:text-white lg:text-[24px]">{v.title}</h3>
                  <p className="mt-3 text-[16px] transition-colors group-hover:text-white/85">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {award && (
      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-[68px]">
          <Reveal from="left">
            <Eyebrow>Recognition</Eyebrow>
            <h2>
              {award.name}: {award.category}, {award.years}
            </h2>
            <p className="mt-5 text-[16px]">
              Consumers and businesses in the {site.city} region selected {site.name} as the {award.name} recipient in the {award.category} category ({award.years}).
            </p>
          </Reveal>
          <Reveal from="right" className="grid grid-cols-2 gap-5">
            {award.images.map((a) => (
              <div key={a.src} className="relative aspect-[3/4] overflow-hidden rounded-[12px] border border-line bg-cream">
                <Image src={a.src} alt={a.alt} fill sizes="(min-width:1024px) 330px, 50vw" className="object-cover" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      )}

      <CtaBand />
    </>
  );
}
