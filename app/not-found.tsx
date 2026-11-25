import { Button } from "@/components/ui";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative mx-[15px] mt-[10px] overflow-hidden rounded-[12px] bg-dark">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(0,91,45,0.6),transparent_70%)]" />
      <div className="container-x relative flex min-h-[720px] flex-col items-center justify-center pt-32 pb-20 text-center">
        <p className="text-[120px] leading-none font-bold text-lime md:text-[200px]">404</p>
        <h1 className="mt-4 text-white">Page not found</h1>
        <p className="mt-4 max-w-md text-[17px] text-white/80">
          The page you&apos;re looking for has moved or doesn&apos;t exist. Head back home, or call us at {site.phone}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href={site.phoneHref} variant="outline">Call {site.phone}</Button>
        </div>
      </div>
    </section>
  );
}
