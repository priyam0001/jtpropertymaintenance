import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/blocks";
import { CheckBadge, Icon } from "@/components/Icon";
import { Accordion } from "@/components/sections";
import { Button, Reveal } from "@/components/ui";
import { faqs, serviceDetails, site } from "@/lib/site";

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = serviceDetails.find((x) => x.slug === slug);
  if (!d) return {};
  return { title: d.metaTitle, description: d.metaDescription, alternates: { canonical: `/services/${d.slug}` } };
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const d = serviceDetails.find((x) => x.slug === slug);
  if (!d) notFound();

  return (
    <>
      <PageHero title={d.title} image={d.image} snow={d.snow} />

      <section className="section-y">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-[50px]">
          {/* Sidebar: sticky on desktop like Landora's jkit-sticky column */}
          <aside className="order-2 space-y-6 lg:sticky lg:top-8 lg:order-1">
            <nav aria-label="Services" className="rounded-[12px] bg-cream p-6 md:p-8">
              <h2 className="mb-5 !text-[22px] lg:!text-[26px]">Our Services</h2>
              <ul className="space-y-3">
                {serviceDetails.map((s) => {
                  const active = s.slug === d.slug;
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-[10px] px-5 py-4 text-[16px] font-medium transition-colors ${
                          active ? "bg-primary text-white" : "bg-white text-dark hover:bg-primary hover:text-white"
                        }`}
                      >
                        {s.title.replace(` in ${site.city}`, "")}
                        <Icon name="arrowRight" className="size-4" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="relative overflow-hidden rounded-[12px] bg-dark p-8 text-white">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_100%_100%,rgba(0,91,45,0.7),transparent_70%)]" />
              <div className="relative">
                <span className="grid size-[54px] place-items-center rounded-[8px] bg-lime text-dark">
                  <Icon name="phone" className="size-6" />
                </span>
                <p className="mt-6 text-[18px] text-white/80">Need a free estimate?</p>
                <a href={site.phoneHref} className="mt-1 block text-[28px] font-semibold text-white hover:text-lime">{site.phone}</a>
                <p className="mt-4 text-[15px] text-white/70">{d.hours}</p>
                <Button href="/contact" className="mt-6">Request a Quote</Button>
              </div>
            </div>
          </aside>

          <article className="order-1 lg:order-2">
            <Reveal>
              <h2>{d.title}</h2>
              {d.intro.map((p) => (
                <p key={p.slice(0, 20)} className="mt-5 text-[16px]">{p}</p>
              ))}
            </Reveal>

            <Reveal className="mt-10 grid gap-5 md:grid-cols-2">
              {d.gallery.map((g) => (
                <div key={g} className="relative aspect-[4/3] overflow-hidden rounded-[12px]">
                  <Image src={g} alt="" fill sizes="(min-width:1024px) 420px, 100vw" className="object-cover" />
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-10">
              <h3 className="!text-[24px] lg:!text-[30px]">{d.includesTitle}</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {d.includes.map((it) => (
                  <li key={it} className="flex items-center gap-3 rounded-[10px] bg-cream px-5 py-4 text-dark">
                    <CheckBadge /> {it}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-10">
              <div id={d.note.id} className="scroll-mt-8 rounded-[12px] border border-primary/30 bg-primary/5 p-8">
                <h3 className="!text-[22px] lg:!text-[26px]">{d.note.title}</h3>
                <p className="mt-3 text-[16px]">{d.note.text}</p>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <h3 className="mb-6 !text-[24px] lg:!text-[30px]">Common questions</h3>
              <Accordion items={faqs.slice(0, 3).concat(faqs[4])} />
            </Reveal>
          </article>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
