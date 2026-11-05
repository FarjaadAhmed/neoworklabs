import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONTENT } from "@/config/content";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Neowork Labs is a creative studio in Canberra, Australia. We offer video editing, graphic and character design, web development, and AI-generated ads to brands worldwide.",
  path: "/about",
});

const SERVICE_SUMMARIES: Record<string, string> = {
  "video-editing":
    "We turn raw footage into finished videos for social media, ads, YouTube, and brand content. That covers pacing, color, sound, motion graphics, and exports sized for each platform.",
  "graphic-character-design":
    "We design brand identities, social and marketing graphics, print and digital assets, and original characters. Each piece follows one visual system, so your brand looks the same everywhere.",
  "web-development":
    "We design and build websites, from single landing pages to larger web applications. Sites are responsive, load fast, and are set up for search engines from the start.",
  "ai-generated-ads":
    "We use AI models to produce video and image ads. This lets you test more creative variations without booking a new shoot for each one.",
};

export default function AboutPage() {
  const { site, company, hero, services, process } = CONTENT;
  const { email, phone } = CONTENT.footer.contact.inquiries;

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${site.name}`,
    url: `${site.url}/about`,
    about: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <main className="relative z-10 bg-[#05080d] px-5 pb-24 pt-40 text-white sm:px-8 lg:px-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium text-accent">About</p>
          <h1 className="mt-3 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            About {site.name}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">
            {site.name} is a creative studio based in Canberra, Australia. We edit videos, design
            graphics and characters, build websites, and produce AI-generated ads for brands around
            the world.
          </p>
          {company.founder && (
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">
              {site.name} was founded by {company.founder}
              {company.foundingYear && ` in ${company.foundingYear}`}.
            </p>
          )}

          <section className="mt-16">
            <h2 className="text-3xl font-semibold tracking-tight">What we do</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/68">
              A product launch can need a video, social graphics, a landing page, and a set of ads.
              We handle all four in one team. You brief one group of people, and the work looks and
              sounds the same on every channel.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {services.items.map((service) => (
                <article
                  key={service.slug}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8"
                >
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-6 text-white/70">
                    {SERVICE_SUMMARIES[service.slug] ?? service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                  >
                    {service.title} services
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-semibold tracking-tight">How we work</h2>
            <ol className="mt-8 grid gap-4">
              {process.map((step, i) => (
                <li key={step.title} className="flex gap-5 border-t border-white/10 pt-4">
                  <span className="w-8 shrink-0 font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/70">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-semibold tracking-tight">Where we are</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/68">
              Our studio is at {company.streetAddress}, {company.locality}, in Canberra. We work with
              businesses in the {company.region} and with brands in other countries. Projects run
              online. We agree on a brief, share drafts for review, and revise until the work is ready
              to publish.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-semibold tracking-tight">In numbers</h2>
            <dl className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
              {hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"
                >
                  <dt className="text-xs uppercase tracking-widest text-white/50">{stat.label}</dt>
                  <dd className="mt-2 text-4xl font-semibold text-accent">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">Start a project with us</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/68">
              Tell us what you need through the contact page, email {email}, or call {phone}.
            </p>
            <Link
              href="/contact-us"
              className="group mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#05080d] transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact us
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
