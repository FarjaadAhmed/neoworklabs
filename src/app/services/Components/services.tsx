"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Bot,
  Clapperboard,
  Code2,
  LayoutDashboard,
  Palette,
  Play,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CONTENT } from "@/config/content";

function toYouTubeEmbed(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.pathname.startsWith("/embed/")) {
      return url;
    }

    const id = parsed.searchParams.get("v") ?? parsed.pathname.split("/").pop();
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}

const processHighlights = [
  {
    title: "Discovery Sprint",
    text: "We map your audience, offers, content gaps, funnel pressure, and the fastest path to visible momentum.",
  },
  {
    title: "Production System",
    text: "Design, video, AI creative, and web execution move through one coordinated workflow with fewer handoffs.",
  },
  {
    title: "Launch Review",
    text: "Every asset is checked for clarity, speed, mobile fit, conversion intent, and brand consistency before release.",
  },
  {
    title: "Scale Loop",
    text: "We turn results into the next round of sharper creatives, stronger pages, and cleaner operating systems.",
  },
];

type ServiceItem = (typeof CONTENT.services.items)[number];

function ServiceGlyph({ title, className }: { title: string; className?: string }) {
  if (title === "Video Editing") {
    return <Clapperboard className={className} />;
  }

  if (title === "Graphic / Character Designing") {
    return <Palette className={className} />;
  }

  if (title === "Web Development") {
    return <Code2 className={className} />;
  }

  if (title === "AI Generated Ads") {
    return <Bot className={className} />;
  }

  return <Sparkles className={className} />;
}

export default function ServicesPageComponent() {
  const services = CONTENT.services.items;
  const [activeServiceId, setActiveServiceId] = useState(services[0]?.id ?? "1");

  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? services[0],
    [activeServiceId, services]
  );

  return (
    <main className="relative z-10 overflow-hidden bg-[#05080d] text-white">
      <section className="relative min-h-[720px] overflow-hidden px-5 pb-24 pt-36 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-20">
          <video
            src="/service_optimized.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,13,0.68)_0%,rgba(5,8,13,0.92)_62%,#05080d_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(97,194,70,0.25),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(77,149,255,0.2),transparent_34%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(0,0,0,0.72),transparent)]" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium text-accent">Neoworks Lab Services</p>
            <h1 className="text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Digital systems for brands ready to move faster.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
              We combine web development, AI-assisted ads, video editing, and visual design into one focused production engine so your brand can launch, learn, and scale without scattered teams.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#05080d] transition hover:bg-accent"
              >
                Book a call
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#service-categories"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white transition hover:border-accent/70 hover:bg-accent/10"
              >
                Explore services
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["50+", "Projects shipped"],
              ["4", "Core service systems"],
              ["100+", "Creative assets"],
              ["7+", "Years experience"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl"
              >
                <div className="text-3xl font-semibold text-white">{value}</div>
                <div className="mt-2 text-sm text-white/56">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium text-accent">Our Services</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Built as one connected growth stack.</h2>
            <p className="mt-4 text-sm leading-6 text-white/60">
              Each service can stand alone, but the real lift comes when strategy, creative, AI production, and web execution work together.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section> */}

      <section id="service-categories" className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium text-accent">Categories of Services</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Choose the capability your next launch needs.</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {services.map((service) => {
                const isActive = activeService.id === service.id;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`flex min-w-56 items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition lg:min-w-0 ${
                      isActive
                        ? "border-accent/70 bg-accent/12 text-white"
                        : "border-white/10 bg-white/[0.035] text-white/62 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <ServiceGlyph title={service.title} className="h-4 w-4" />
                    {service.title}
                  </button>
                );
              })}
            </div>

            <div className="space-y-5">
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm text-accent">Service Focus</p>
                    <h3 className="mt-2 text-3xl font-semibold">{activeService.title}</h3>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-white/64">{activeService.description}</p>
                  </div>
                  <Link
                    href="/contact-us"
                    className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold transition hover:border-accent/70 hover:bg-accent/10"
                  >
                    Start this
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FeaturePanel title="What We Do" icon={BadgeCheck} items={activeService.items.map((item) => item.text)} />
                <FeaturePanel title="What You Get" icon={Target} items={activeService.outcomes ?? []} />
              </div>

              <ReferralChart />

              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                <div className="mb-7 flex items-center gap-3">
                  <LayoutDashboard className="h-5 w-5 text-accent" />
                  <h3 className="text-xl font-semibold">Delivery Process</h3>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {processHighlights.map((item) => (
                    <div key={item.title} className="border-t border-white/10 pt-5">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-white/58">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                <h3 className="text-xl font-semibold">Studio Preview</h3>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  A compact view of the creative system behind every service: strategy, assets, launch checks, and iteration.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {activeService.previewVideos.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className="relative h-44 overflow-hidden rounded-lg border border-white/10 bg-[#080d15]"
                    >
                      <iframe
                        src={toYouTubeEmbed(url)}
                        title={`${activeService.title} preview ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium text-accent">Success Stories</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Designed for practical business outcomes.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                name: "B2B Launch System",
                challenge: "The offer was clear, but the website and social content did not explain it quickly enough.",
                solution: "We rebuilt the page hierarchy, tightened messaging, and produced reusable design assets for campaigns.",
              },
              {
                name: "Creator Growth Engine",
                challenge: "The brand needed more short-form output without lowering quality or stretching the internal team.",
                solution: "We shaped a repeatable editing system with hooks, motion templates, thumbnails, and performance review loops.",
              },
            ].map((story) => (
              <article key={story.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{story.name}</h3>
                </div>
                <p className="text-sm font-semibold text-white">Challenge</p>
                <p className="mt-2 text-sm leading-6 text-white/58">{story.challenge}</p>
                <p className="mt-6 text-sm font-semibold text-white">Solution</p>
                <p className="mt-2 text-sm leading-6 text-white/58">{story.solution}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-8 text-center sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
            <WandSparkles className="h-6 w-6" />
          </div>
          <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
            Join us in your digital journey and become the next success story.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60">
            Tell us what you are building, where growth feels stuck, and what launch you want to make unavoidable.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#05080d] transition hover:bg-accent"
            >
              Get started
            </Link>
            <a
              href="mailto:your.email@gmail.com"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white transition hover:border-accent/70 hover:bg-accent/10"
            >
              Free consultation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      }}
      className="group relative min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:border-accent/50 hover:bg-white/[0.06] sm:p-8"
    >
      <div className="absolute inset-x-0 top-0 h-40 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(97,194,70,0.44) 1px, transparent 1px), linear-gradient(90deg, rgba(97,194,70,0.44) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(140px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(140px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(97,194,70,0.08), transparent 70%)",
        }}
      />
      <div className="absolute right-6 top-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/25">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#05080d] transition group-hover:bg-accent">
          <ServiceGlyph title={service.title} className="h-5 w-5" />
        </div>
      </div>
      <div className="relative flex h-full flex-col justify-end pt-28">
        <h3 className="text-2xl font-semibold">{service.title}</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">{service.description}</p>
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <span className="text-sm text-white/50">Starts with a strategy call</span>
          <Link
            href="/contact-us"
            className="inline-flex h-9 items-center rounded-full bg-white/[0.08] px-4 text-sm font-semibold transition hover:bg-white hover:text-[#05080d]"
          >
            Book call
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function FeaturePanel({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof BadgeCheck;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Icon className="h-5 w-5 text-accent" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item} className="flex gap-3 border-t border-white/10 pt-4">
            <Play className="mt-1 h-3.5 w-3.5 shrink-0 fill-accent text-accent" />
            <p className="text-sm leading-6 text-white/62">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferralChart() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0a0e14] p-6 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(97,194,70,0.16),transparent_42%)]" />
      <div className="relative">
        <p className="text-sm text-accent">Referral Program</p>
        <h3 className="mt-2 text-xl font-semibold">Earn on every deposit you refer.</h3>

        <svg
          viewBox="0 0 600 360"
          role="img"
          aria-label="10% of second-level referral deposits, 20% of direct referral deposits"
          className="mt-6 h-auto w-full"
        >
          <defs>
            <linearGradient id="referralGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(97,194,70,0.42)" />
              <stop offset="100%" stopColor="rgba(97,194,70,0)" />
            </linearGradient>
            <linearGradient id="referralWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* second-level referrals — white bar */}
          <line x1="90" y1="208" x2="90" y2="360" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="215" y1="262" x2="215" y2="360" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 4" />
          <polygon points="90,238 165,238 215,262 215,360 90,360" fill="url(#referralWhite)" />
          <polyline points="90,238 165,238 215,262" fill="none" stroke="#e9edf2" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="90" cy="208" r="5" fill="#e9edf2" />
          <text x="78" y="150" fill="#e9edf2" fontSize="46" fontWeight="600">10%</text>
          <text x="80" y="178" fill="rgba(255,255,255,0.6)" fontSize="15">of second-level</text>
          <text x="80" y="197" fill="rgba(255,255,255,0.6)" fontSize="15">referral deposits</text>

          {/* direct referrals — green bar */}
          <line x1="360" y1="70" x2="360" y2="360" stroke="rgba(97,194,70,0.32)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="500" y1="118" x2="500" y2="360" stroke="rgba(97,194,70,0.32)" strokeWidth="1" strokeDasharray="3 4" />
          <polygon points="360,98 440,98 500,118 500,360 360,360" fill="url(#referralGreen)" />
          <polyline points="360,98 440,98 500,118" fill="none" stroke="#61c246" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="360" cy="70" r="5" fill="#61c246" />
          <text x="348" y="40" fill="#61c246" fontSize="46" fontWeight="600">20%</text>
          <text x="455" y="34" fill="rgba(97,194,70,0.85)" fontSize="15">of direct</text>
          <text x="455" y="53" fill="rgba(97,194,70,0.85)" fontSize="15">referral deposits</text>
        </svg>
      </div>
    </div>
  );
}
