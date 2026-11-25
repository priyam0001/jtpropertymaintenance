import type { Metadata } from "next";
import { PageHero } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion";
import { Eyebrow } from "@/components/ui";
import { pageMeta, site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  ...pageMeta.contact,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" crumb="Contact" image="/images/jt-truck.webp" />
      <section className="section-y">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-[60px]">
          <Reveal from="left">
            <Eyebrow>Get in Touch</Eyebrow>
            <h2>Tell us what your property needs</h2>
            <p className="mt-5 text-[16px]">
              From spring planting to winter snow, we&apos;ve got you covered. Give us a call to discuss your property, or tell us what you&apos;re looking for
              using the form. Estimates are always free.
            </p>
            <div className="mt-8 space-y-4">
              <Info icon="phone" label="Phone" value={site.phone} href={site.phoneHref} />
              <Info icon="mail" label="Email" value={site.email} href={`mailto:${site.email}`} />
              <Info icon="pin" label="Service area" value={site.area} />
              {site.hours.map((h) => <Info key={h.label} icon="clock" label={h.label} value={h.value} />)}
            </div>
          </Reveal>
          <Reveal from="right">
            <div className="rounded-[12px] bg-cream p-6 md:p-10">
              <h2 className="mb-8 !text-[24px] lg:!text-[32px]">Request a free quote</h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Info({ icon, label, value, href }: { icon: "phone" | "mail" | "pin" | "clock"; label: string; value: string; href?: string }) {
  const body = (
    <>
      <span className="grid size-[54px] shrink-0 place-items-center rounded-[8px] bg-primary text-lime"><Icon name={icon} className="size-5" /></span>
      <span>
        <span className="block text-[14px] text-body">{label}</span>
        <span className="block text-[17px] font-medium break-all text-dark">{value}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center gap-4 rounded-[12px] border border-line p-4 transition-colors hover:border-primary">{body}</a>
  ) : (
    <div className="flex items-center gap-4 rounded-[12px] border border-line p-4">{body}</div>
  );
}
