import Image from "next/image";
import Link from "next/link";
import { CheckBadge, Icon, type IconName } from "@/components/Icon";
import { Marquee } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { Accordion, HeroSlider, ServiceCarousel } from "@/components/sections";
import { Button, Eyebrow } from "@/components/ui";
import { award, faqs, seasonal, serviceCards, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <About />
      <WhatWeDo />
      <WhyChoose />
      <OurWork />
      <Process />
      <Marquee
        images={[
          { src: "/images/lawn-residential.webp", alt: "Striped residential lawn" },
          { src: "/images/plow-trucks-commercial.webp", alt: "Plow trucks after clearing a commercial lot" },
          { src: "/images/lawn-commercial.webp", alt: "Commercial grounds after grass cutting" },
          { src: "/images/tractor-snowblower.webp", alt: "Tractor with snowblower attachment" },
          { src: "/images/stone-walkway.webp", alt: "Flagstone side walkway" },
          { src: "/images/jt-truck.webp", alt: `${site.name} lawn care truck` },
          { src: "/images/lawn-crew.webp", alt: "Crew planting cedars on a large lawn" },
        ]}
      />
      <Faq />
      <Seasonal />
      {/* Testimonials section intentionally omitted until real Google reviews are supplied (TODO_CLIENT.md). */}
    </>
  );
}

function About() {
  const features: { icon: IconName; title: string; text: string }[] = [
    { icon: "calendar", title: "Year-Round Care", text: "Spring, summer and fall property care, then snow plowing and removal all winter long." },
    { icon: "clipboard", title: "Flexible Contracts", text: "Annual, seasonal, monthly and one-time contracts, so you only pay for what you need." },
  ];
  return (
    <section className="section-y">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[68px]">
        <Reveal from="left">
          <div className="relative aspect-[618/606] overflow-hidden rounded-[12px]">
            <Image src="/images/lawn-crew.webp" alt={`${site.name} crew planting cedars on a large lawn`} fill sizes="(min-width:1024px) 620px, 100vw" className="object-cover" />
          </div>
          <div className="mt-8 flex items-center gap-4">
            <CheckBadge className="size-7" />
            <p className="text-[22px] text-dark md:text-[26px]">SINCE — {site.founded}</p>
          </div>
          <p className="mt-4 max-w-lg text-[16px]">
            Our professional staff has kept {site.city} properties looking their best since {site.founded}, always prepared with current equipment.
          </p>
        </Reveal>

        <Reveal from="right" className="lg:pt-10">
          <Eyebrow>About {site.name}</Eyebrow>
          <h2>Bringing out the best in {site.city} properties</h2>
          <p className="mt-5 text-[16px]">
            Keep your yard and driveway looking great all year round. We provide spring, summer and fall property care, from grass cutting to eavestrough cleaning, and
            monthly to annual snow plowing and removal through the winter, for both residential and commercial properties.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="rounded-[12px] bg-cream px-[30px] pt-8 pb-7">
                <span className="grid size-[54px] place-items-center rounded-[8px] bg-white text-primary">
                  <Icon name={f.icon} className="size-6" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 border-b border-line pb-5 text-[22px] lg:text-[24px]">{f.title}</h3>
                <p className="mt-5 text-[16px]">{f.text}</p>
              </div>
            ))}
          </div>
          <Button href="/about" className="mt-9">More About Us</Button>
        </Reveal>
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section className="section-y bg-cream">
      <div className="container-x">
        <Reveal className="grid gap-6 border-b border-line pb-10 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>What We Do</Eyebrow>
            <h2>Property care for every season</h2>
          </div>
          <p className="text-[16px] lg:pb-2">
            From grass cutting and clean-ups to plowing and salting, our crew handles the time-consuming work so your home or business looks clean, safe and
            orderly every visit.
          </p>
        </Reveal>
        <Reveal className="mt-12">
          <ServiceCarousel cards={serviceCards} />
        </Reveal>
      </div>
    </section>
  );
}

function WhyChoose() {
  const points: { icon: IconName; title: string; text: string }[] = [
    ...(award ? [{ icon: "award" as const, title: award.name, text: `Chosen by ${site.city} consumers and businesses as the ${award.name} winner for ${award.category} (${award.years}).` }] : []),
    { icon: "clipboard", title: "Free Estimates", text: "Every quote is free and comes with no obligation. Call or send a message to get started." },
    { icon: "building", title: "Residential & Commercial", text: "Homes, driveways, parking lots and sidewalks: we maintain properties of every size." },
  ];
  return (
    <section className="section-y">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[60px]">
        <Reveal from="left" className="relative">
          <div className="relative aspect-[422/560] overflow-hidden rounded-[12px]">
            <Image src="/images/tractor-snowblower.webp" alt={`${site.name} tractor with snowblower at sunset`} fill sizes="(min-width:1024px) 520px, 100vw" className="object-cover" />
          </div>
          {award && (
            <div className="absolute right-4 bottom-4 left-4 flex items-center gap-4 rounded-[12px] bg-white/95 p-4 backdrop-blur sm:right-auto sm:max-w-xs">
              <Image src={award.images.at(-1)!.src} alt={award.images.at(-1)!.alt} width={54} height={72} className="h-[72px] w-auto rounded-[4px]" />
              <p className="text-[15px] leading-snug text-dark">
                <span className="font-semibold">{award.name}</span>
                <br />
                {award.category} · {award.years}
              </p>
            </div>
          )}
        </Reveal>
        <Reveal from="right">
          <Eyebrow>Why Choose Us</Eyebrow>
          <h2>Why {site.city} property owners choose {site.shortName}</h2>
          <div className="mt-10 space-y-5">
            {points.map((p) => (
              <div key={p.title} className="group flex gap-5 rounded-[12px] bg-cream p-6 transition-colors duration-300 hover:bg-primary md:p-8">
                <span className="grid size-[54px] shrink-0 place-items-center rounded-[8px] bg-white text-primary">
                  <Icon name={p.icon} className="size-6" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-[20px] transition-colors group-hover:text-white lg:text-[24px]">{p.title}</h3>
                  <p className="mt-2 text-[16px] transition-colors group-hover:text-white/85">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OurWork() {
  const work = [
    { src: "/images/lawn-commercial.webp", title: "Commercial Grounds", text: "Business property grounds cut, edged and cleaned up.", href: "/services/lawn-care-barrie" },
    { src: "/images/plow-trucks-commercial.webp", title: "Commercial Lot Plowing", text: "Our plow trucks after clearing a plaza parking lot.", href: "/services/snow-removal-barrie" },
    { src: "/images/lawn-residential.webp", title: "Residential Lawn Care", text: "Clean stripes, trimmed edges and every clipping picked up.", href: "/services/lawn-care-barrie" },
  ];
  return (
    <section className="section-y bg-cream">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center"><Eyebrow>Our Work</Eyebrow></div>
          <h2>Properties we keep looking their best</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {work.map((w, n) => (
            <Reveal key={w.title} delay={n * 0.15}>
              <Link href={w.href} className="group relative block aspect-[413/562] overflow-hidden rounded-[12px] outline-offset-4 focus-visible:outline-2 focus-visible:outline-primary max-md:aspect-[4/3.6]">
                <Image src={w.src} alt={w.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <span className="mb-5 grid size-[50px] place-items-center rounded-[8px] border border-white/40 text-white transition-colors group-hover:bg-lime group-hover:text-dark">
                    <Icon name="arrowUpRight" />
                  </span>
                  <h3 className="text-[22px] text-white lg:text-[26px]">{w.title}</h3>
                  <p className="mt-3 text-[16px] text-white/90">{w.text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex items-center gap-5">
          <span className="h-px flex-1 bg-line" />
          <p className="text-center text-[16px] text-dark md:text-[17px]">
            Have a different job in mind?{" "}
            <a href={site.phoneHref} className="font-medium text-primary underline-offset-4 hover:underline">
              Call {site.phone}
            </a>
          </p>
          <span className="h-px flex-1 bg-line" />
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", title: "Call for a free quote", text: `Phone ${site.phone} or send us a message describing your property and what it needs.` },
    { n: "02", title: "Pick your contract", text: "Choose what suits you, from a one-time visit to monthly, seasonal or annual service." },
    { n: "03", title: "We handle it, all four seasons", text: "Our crew arrives on schedule with the right equipment, from summer cuts to winter plowing." },
  ];
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>How It Works</Eyebrow>
            <h2>Three simple steps to a well-kept property</h2>
          </div>
          <p className="text-[16px] lg:pb-2">No job is too big or too small for our experienced staff, and we work on your schedule.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, n) => (
            <Reveal key={s.n} delay={n * 0.15}>
              <div className="group h-full rounded-[12px] border border-line p-8 transition-colors duration-300 hover:border-primary hover:bg-primary">
                <span className="text-[56px] leading-none font-bold text-lime [-webkit-text-stroke:1.5px_var(--color-primary)] group-hover:[-webkit-text-stroke:0]">{s.n}</span>
                <h3 className="mt-6 text-[22px] transition-colors group-hover:text-white lg:text-[24px]">{s.title}</h3>
                <p className="mt-3 text-[16px] transition-colors group-hover:text-white/85">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section-y bg-cream">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[60px]">
        <Reveal from="left" className="relative">
          <div className="relative aspect-[498/560] overflow-hidden rounded-[12px]">
            <Image src="/images/stone-walkway.webp" alt="Flagstone side walkway beside a brick home" fill sizes="(min-width:1024px) 500px, 100vw" className="object-cover" />
          </div>
          <span className="absolute top-6 left-6 rounded-[8px] bg-white px-4 py-2"><Eyebrow>Questions</Eyebrow></span>
        </Reveal>
        <Reveal from="right">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mb-8">Answers before you call</h2>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

function Seasonal() {
  const groups = [
    { title: "Spring, Summer & Fall", icon: "leaf" as const, items: seasonal.warm, dark: false },
    { title: "Winter", icon: "snow" as const, items: seasonal.winter, dark: true },
  ];
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center"><Eyebrow>Seasonal Services</Eyebrow></div>
          <h2>One crew for the whole year</h2>
          <p className="mt-4 text-[16px]">Our hours follow the seasons: weekday hours from April to October, and available 24/7 from November through March.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {groups.map((g, n) => (
            <Reveal key={g.title} delay={n * 0.15}>
              <div className={`h-full rounded-[12px] p-8 md:p-10 ${g.dark ? "bg-dark text-white" : "bg-cream"}`}>
                <div className="flex items-center gap-4">
                  <span className={`grid size-[54px] place-items-center rounded-[8px] ${g.dark ? "bg-lime text-dark" : "bg-white text-primary"}`}>
                    <Icon name={g.icon} className="size-6" strokeWidth={1.6} />
                  </span>
                  <h3 className={`text-[24px] lg:text-[28px] ${g.dark ? "text-white" : ""}`}>{g.title}</h3>
                </div>
                <ul className={`mt-8 grid gap-x-6 gap-y-3 ${g.dark ? "" : "sm:grid-cols-2"}`}>
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-[16px]">
                      <CheckBadge className={`size-5 ${g.dark ? "bg-lime text-dark" : ""}`} />
                      <span className={g.dark ? "text-white" : "text-dark"}>{it}</span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-8 text-[15px] ${g.dark ? "text-white/70" : ""}`}>
                  {g.dark ? site.hours[1].label + ": " + site.hours[1].value : site.hours[0].label + ": " + site.hours[0].value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
