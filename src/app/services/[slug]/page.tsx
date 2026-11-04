import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { CONTENT } from "@/config/content";
import { SERVICE_DETAILS } from "@/config/service-details";
import { Footer } from "@/components/Footer";
import { LiteYouTube } from "@/components/LiteYouTube";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const findService = (slug: string) => CONTENT.services.items.find((s) => s.slug === slug);

// Cut at a word boundary so the meta description stays within 160 characters.
const trimDescription = (text: string, max = 160) => {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf(" ", max - 1);
  return `${text.slice(0, cut > 0 ? cut : max - 1).replace(/[\s,;:.]+$/, "")}…`;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CONTENT.services.items.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) return {};
  return pageMetadata({
    title: detail.seoTitle,
    description: trimDescription(detail.answer),
    path: `/services/${service.slug}`,
  });
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-20">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

const card = "rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8";

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) notFound();

  const { site } = CONTENT;
  const url = `${site.url}/services/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        description: detail.answer,
        url,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: detail.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <main className="relative z-10 bg-[#05080d] px-5 pb-24 pt-40 text-white sm:px-8 lg:px-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
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
          <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {detail.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">{detail.answer}</p>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-black p-2">
            <div className="relative overflow-hidden rounded-lg pt-[56.25%]">
              <LiteYouTube url={service.videoUrl} title={`${service.title} showreel`} preload />
            </div>
          </div>

          <Section title="What's included">
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {detail.included.map((item) => (
                <div key={item.title} className={card}>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{item.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Our process">
            <ol className="mt-8 grid gap-5">
              {detail.process.map((step, i) => (
                <li key={step.title} className={`${card} flex gap-5`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                        {step.turnaround}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Pricing">
            <div className={`${card} mt-8`}>
              <p className="text-base leading-7 text-white/70">{detail.pricing}</p>
              <Link
                href="/contact-us"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-white"
              >
                Request a quote
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Section>

          {detail.caseStudy && (
            <Section title="Examples">
              <div className={`${card} mt-8`}>
                <h3 className="text-lg font-semibold">{detail.caseStudy.client}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{detail.caseStudy.summary}</p>
                <p className="mt-4 text-sm font-medium leading-6 text-accent">{detail.caseStudy.result}</p>
              </div>
            </Section>
          )}

          <Section title="Who it's for">
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {detail.audience.map((item) => (
                <div key={item.title} className={card}>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{item.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Frequently asked questions">
            <div className="mt-8 grid gap-3">
              {detail.faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border border-white/10 bg-white/[0.035]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-medium sm:p-6 [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-white/50 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-6 text-white/70 sm:px-6 sm:pb-6">{faq.a}</p>
                </details>
              ))}
            </div>
          </Section>

          <div className="mt-20 rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center sm:p-12">
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
