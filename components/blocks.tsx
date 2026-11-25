import Image from "next/image";
import { site } from "@/lib/site";
import { Button, Reveal } from "./ui";
import { Snow } from "./Snow";

// Inner-page banner: dark rounded image banner with the page title.
export function PageHero({ title, image, snow = false }: { title: string; image: string; snow?: boolean }) {
  return (
    <section className="relative mx-[15px] mt-[10px] overflow-hidden rounded-[12px] bg-dark">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" loading="eager" fetchPriority="high" />
      <div className="absolute inset-0 bg-dark/70" />
      {snow && <Snow />}
      <div className="container-x relative flex min-h-[420px] flex-col items-center justify-center pt-28 pb-14 text-center md:min-h-[480px]">
        <Reveal>
          <h1 className="text-white">{title}</h1>
        </Reveal>
      </div>
    </section>
  );
}

// Image marquee band (Landora: green band, 10-speed marquee, edge fades). Pure CSS.
export function Marquee({ images }: { images: { src: string; alt: string }[] }) {
  const loop = [...images, ...images];
  return (
    <section className="overflow-hidden bg-primary py-[60px] lg:py-[78px]" aria-label="Our work through the seasons">
      <div className="relative [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="flex w-max animate-marquee gap-8 motion-reduce:animate-none hover:[animation-play-state:paused]">
          {loop.map((img, n) => (
            <li key={n} className="relative h-[150px] w-[220px] shrink-0 overflow-hidden rounded-[12px] md:h-[200px] md:w-[300px]" aria-hidden={n >= images.length}>
              <Image src={img.src} alt={n < images.length ? img.alt : ""} fill sizes="300px" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Closing call-to-action band shared by inner pages.
export function CtaBand() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[12px] bg-primary px-6 py-12 text-center md:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgba(199,242,104,0.25),transparent_70%)]" />
            <h2 className="relative mx-auto max-w-3xl text-white">Ready for a property that looks great all year?</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-[17px] text-white/85">
              Estimates are always free. Call us or send a message and we&apos;ll put together a quote for your property.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Button href={site.phoneHref}>Call {site.phone}</Button>
              <Button href="/contact" variant="outline">Request a Quote</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
