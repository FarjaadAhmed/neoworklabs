import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { CONTENT } from "@/config/content";
import { Footer } from "@/components/Footer";
import { LiteYouTube } from "@/components/LiteYouTube";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const findService = (slug: string) => CONTENT.services.items.find((s) => s.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return CONTENT.services.items.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const service = findService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = findService((await params).slug);
  if (!service) notFound();

  const { site } = CONTENT;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <main className="relative z-10 bg-[#05080d] px-5 pb-24 pt-40 text-white sm:px-8 lg:px-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="mx-auto max-w-5xl">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>

          <p className="mt-10 text-sm font-medium text-accent">{service.tag}</p>
          <h1 className="mt-3 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">
            {service.description}
          </p>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-black p-2">
            <div className="relative overflow-hidden rounded-lg pt-[56.25%]">
              <LiteYouTube url={service.videoUrl} title={`${service.title} showreel`} preload />
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { heading: "What we do", items: service.items.map((i) => i.text) },
              { heading: "What you get", items: service.outcomes },
            ].map((panel) => (
              <section
                key={panel.heading}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8"
              >
                <h2 className="text-xl font-semibold">{panel.heading}</h2>
                <ul className="mt-6 grid gap-4">
                  {panel.items.map((item) => (
                    <li key={item} className="flex gap-3 border-t border-white/10 pt-4 text-sm leading-6 text-white/70">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              Ready to start on {service.title.toLowerCase()}?
            </h2>
            <Link
              href="/contact-us"
              className="group mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#05080d] transition-all duration-300 hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
