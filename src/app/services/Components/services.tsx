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
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { CONTENT } from "@/config/content";
import { LiteYouTube } from "@/components/LiteYouTube";

const EASE = [0.16, 1, 0.3, 1] as const;

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

// ─── PER-SERVICE CHART COPY ─────────────────────────────────────────────────
// Placeholder metrics — replace with your real numbers per service.
// Each service shows a distinct label / headline / two-stat funnel.
type ChartCopy = {
  label: string;
  headline: string;
  leftValue: number;
  leftCaption: [string, string];
  rightValue: number;
  rightCaption: [string, string];
};

const CHART_COPY: Record<string, ChartCopy> = {
  "1": {
    label: "Performance",
    headline: "Editing that holds attention.",
    leftValue: 45,
    leftCaption: ["longer average", "watch time"],
    rightValue: 30,
    rightCaption: ["higher", "engagement rate"],
  },
  "2": {
    label: "Brand Impact",
    headline: "Design that gets remembered.",
    leftValue: 40,
    leftCaption: ["stronger brand", "recall"],
    rightValue: 25,
    rightCaption: ["faster", "recognition"],
  },
  "3": {
    label: "Conversion",
    headline: "Sites built to convert.",
    leftValue: 50,
    leftCaption: ["faster load", "experience"],
    rightValue: 35,
    rightCaption: ["higher", "conversion rate"],
  },
  "4": {
    label: "Efficiency",
    headline: "Ads produced at scale.",
    leftValue: 60,
    leftCaption: ["lower cost", "per creative"],
    rightValue: 40,
    rightCaption: ["faster", "campaign launches"],
  },
};

function chartCopyFor(id: string): ChartCopy {
  return CHART_COPY[id] ?? CHART_COPY["1"];
}
// ─── END PER-SERVICE CHART COPY ─────────────────────────────────────────────

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
  const reduceMotion = useReducedMotion();

  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? services[0],
    [activeServiceId, services]
  );

  return (
    <main className="relative z-10 overflow-hidden bg-[#05080d] text-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[760px] overflow-hidden px-5 pb-28 pt-40 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-20">
          {/* Desktop only: 2.8 MB for a 20%-opacity backdrop is too heavy on mobile. */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover opacity-20"
          >
            <source src="/servicebg.mp4" type="video/mp4" media="(min-width: 768px)" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,13,0.68)_0%,rgba(5,8,13,0.92)_62%,#05080d_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(97,194,70,0.25),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(77,149,255,0.2),transparent_34%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(0,0,0,0.72),transparent)]" />
        </div>

        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
          className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
        >
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-medium tracking-wide text-white/70">
                Neowork Labs — Services
              </span>
            </motion.div>

            <motion.h1
              variants={slideUp}
              className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Digital systems for brands ready to{" "}
              <span className="text-accent italic">move faster.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-base leading-7 text-white/68 sm:text-lg"
            >
              We combine web development, AI-assisted ads, video editing, and visual
              design into one focused production engine so your brand can launch,
              learn, and scale without scattered teams.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact-us"
                className="group inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#05080d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_10px_40px_rgba(97,194,70,0.4)]"
              >
                Book a call
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="#service-categories"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white transition hover:border-accent/70 hover:bg-accent/10"
              >
                Explore services
              </a>
            </motion.div>

            {/* Service tag row */}
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service.id}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/55"
                >
                  {service.title}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="grid gap-3 sm:grid-cols-2">
            {[
              ["50", "+", "Projects shipped"],
              ["4", "", "Core service systems"],
              ["100", "+", "Creative assets"],
              ["7", "+", "Years experience"],
            ].map(([value, suffix, label]) => (
              <div
                key={label}
                className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-colors hover:border-accent/40"
              >
                <div className="text-3xl font-semibold text-white">
                  <StatCounter target={Number(value)} suffix={suffix} />
                </div>
                <div className="mt-2 text-sm text-white/56">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <a
          href="#service-categories"
          aria-label="Scroll to services"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-white/70 lg:flex"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
            <span className="h-2 w-0.5 rounded-full bg-white/50 motion-safe:animate-[heroScrollCue_1.6s_ease-in-out_infinite]" />
          </span>
        </a>
      </section>

      {/* ── Service categories ───────────────────────────────────────────── */}
      <section id="service-categories" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium text-accent">Categories of Services</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Choose the capability your next launch needs.
            </h2>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Tab rail */}
            <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {services.map((service, index) => {
                const isActive = activeService.id === service.id;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`group relative flex min-w-56 items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors lg:min-w-0 ${
                      isActive
                        ? "border-accent/60 text-white"
                        : "border-white/10 bg-white/[0.035] text-white/62 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {isActive && !reduceMotion && (
                      <motion.span
                        layoutId="serviceTabActive"
                        className="absolute inset-0 -z-10 rounded-xl bg-accent/12"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-accent text-[#05080d]"
                          : "bg-white/5 text-white/60 group-hover:text-white"
                      }`}
                    >
                      <ServiceGlyph title={service.title} className="h-4 w-4" />
                    </span>
                    <span className="flex-1">{service.title}</span>
                    <span
                      className={`font-mono text-xs transition-colors ${
                        isActive ? "text-accent" : "text-white/25"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail panel — re-animates on service switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm text-accent">Service Focus</p>
                      <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                        {activeService.title}
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-6 text-white/64">
                        {activeService.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-3">
                      <Link
                        href={`/services/${activeService.slug}`}
                        className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white/70 transition hover:text-white"
                      >
                        Full details
                      </Link>
                      <Link
                        href="/contact-us"
                        className="group inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold transition hover:border-accent/70 hover:bg-accent/10"
                      >
                        Start this
                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FeaturePanel
                    title="What We Do"
                    icon={BadgeCheck}
                    items={activeService.items.map((item) => item.text)}
                  />
                  <FeaturePanel
                    title="What You Get"
                    icon={Target}
                    items={activeService.outcomes ?? []}
                  />
                </div>

                <ReferralChart copy={chartCopyFor(activeService.id)} />

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                  <div className="mb-7 flex items-center gap-3">
                    <LayoutDashboard className="h-5 w-5 text-accent" />
                    <h3 className="text-xl font-semibold">Delivery Process</h3>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    {processHighlights.map((item, i) => (
                      <div
                        key={item.title}
                        className="relative border-t border-white/10 pt-5"
                      >
                        <span className="absolute -top-px left-0 h-px w-10 bg-accent" />
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-accent">0{i + 1}</span>
                          <h4 className="font-semibold">{item.title}</h4>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/58">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                  <h3 className="text-xl font-semibold">Studio Preview</h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    A compact view of the creative system behind every service:
                    strategy, assets, launch checks, and iteration.
                  </p>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {activeService.previewVideos.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="relative h-44 overflow-hidden rounded-xl border border-white/10 bg-[#080d15]"
                      >
                        <LiteYouTube
                          url={toYouTubeEmbed(url)}
                          title={`${activeService.title} preview ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Success stories ──────────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium text-accent">Success Stories</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Designed for practical business outcomes.
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                name: "B2B Launch System",
                challenge:
                  "The offer was clear, but the website and social content did not explain it quickly enough.",
                solution:
                  "We rebuilt the page hierarchy, tightened messaging, and produced reusable design assets for campaigns.",
              },
              {
                name: "Creator Growth Engine",
                challenge:
                  "The brand needed more short-form output without lowering quality or stretching the internal team.",
                solution:
                  "We shaped a repeatable editing system with hooks, motion templates, thumbnails, and performance review loops.",
              },
            ].map((story, i) => (
              <Reveal
                key={story.name}
                delay={i * 0.1}
                as="article"
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-accent/40 sm:p-8"
              >
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="px-5 pb-24 pt-12 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center sm:p-14">
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
              style={{ background: "radial-gradient(ellipse, #61c246 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <WandSparkles className="h-6 w-6" />
              </div>
              <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Join us in your digital journey and become the next success story.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60">
                Tell us what you are building, where growth feels stuck, and what launch
                you want to make unavoidable.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact-us"
                  className="group inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#05080d] shadow-[0_10px_40px_rgba(97,194,70,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_50px_rgba(97,194,70,0.55)]"
                >
                  Get started
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href="mailto:info@neoworklabs.com"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white transition hover:border-accent/70 hover:bg-accent/10"
                >
                  Free consultation
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// No opacity fade: the hero h1 is the LCP element and must paint before JS loads.
const slideUp = {
  hidden: { y: 24 },
  show: { y: 0, transition: { duration: 0.7, ease: EASE } },
};

function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = as === "article" ? motion.article : motion.div;

  return (
    <MotionTag
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

function StatCounter({ target, suffix }: { target: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const value = useCountUp(target, inView, 1400, 200);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
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

function useInView<T extends Element>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCountUp(target: number, run: boolean, duration = 1500, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;

    let raf = 0;
    let start: number | undefined;

    const timeout = window.setTimeout(() => {
      const tick = (ts: number) => {
        if (start === undefined) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, run, duration, delay]);

  return value;
}

function ReferralChart({ copy }: { copy: ChartCopy }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const leftCount = useCountUp(copy.leftValue, inView, 1400, 900);
  const rightCount = useCountUp(copy.rightValue, inView, 1500, 1100);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e14] p-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <style>{`
        @keyframes rcDraw {
          0% { stroke-dashoffset: 1; opacity: 0; }
          12% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes rcFill {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes rcDot {
          0% { transform: scale(0); opacity: 0; }
          65% { transform: scale(1.35); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes rcHalo {
          0% { transform: scale(0.5); opacity: 0.55; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes rcText {
          0% { opacity: 0; filter: blur(6px); transform: translateY(8px); }
          35% { opacity: 0.35; }
          50% { opacity: 0.85; }
          62% { opacity: 0.45; }
          78% { opacity: 1; filter: blur(0); transform: translateY(0); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }

        .rc-stroke { opacity: 0; stroke-dasharray: 1; }
        .rc-fill { opacity: 0; }
        .rc-dot { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .rc-halo { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .rc-text { opacity: 0; transform-box: fill-box; }

        .rc-glow-green { filter: drop-shadow(0 0 5px rgba(97,194,70,0.65)); }
        .rc-glow-white { filter: drop-shadow(0 0 4px rgba(255,255,255,0.35)); }

        .is-visible .guide-left-1 { animation: rcDraw 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s forwards; }
        .is-visible .guide-left-2 { animation: rcDraw 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s forwards; }
        .is-visible .guide-right-1 { animation: rcDraw 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s forwards; }
        .is-visible .guide-right-2 { animation: rcDraw 1.1s cubic-bezier(0.16,1,0.3,1) 0.28s forwards; }
        .is-visible .bar-left { animation: rcDraw 1s cubic-bezier(0.16,1,0.3,1) 0.7s forwards; }
        .is-visible .bar-right { animation: rcDraw 1.1s cubic-bezier(0.16,1,0.3,1) 0.85s forwards; }
        .is-visible .fill-left { animation: rcFill 1s ease-out 0.95s forwards; }
        .is-visible .fill-right { animation: rcFill 1s ease-out 1.1s forwards; }
        .is-visible .dot-left { animation: rcDot 0.7s cubic-bezier(0.34,1.56,0.64,1) 1.45s forwards; }
        .is-visible .dot-right { animation: rcDot 0.7s cubic-bezier(0.34,1.56,0.64,1) 1.65s forwards; }
        .is-visible .halo-left { animation: rcHalo 1.4s ease-out 1.55s forwards; }
        .is-visible .halo-right { animation: rcHalo 1.4s ease-out 1.75s forwards; }
        .is-visible .text-left { animation: rcText 0.9s ease-out 1.75s forwards; }
        .is-visible .text-right { animation: rcText 0.9s ease-out 1.95s forwards; }

        @media (prefers-reduced-motion: reduce) {
          .rc-stroke, .rc-fill, .rc-dot, .rc-text { opacity: 1 !important; stroke-dashoffset: 0 !important; transform: none !important; filter: none !important; animation: none !important; }
          .rc-halo { display: none; }
        }
      `}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(97,194,70,0.16),transparent_42%)]" />
      <div className="relative">
        <p className="text-sm text-accent">{copy.label}</p>
        <h3 className="mt-2 text-xl font-semibold">{copy.headline}</h3>

        <svg
          viewBox="0 0 600 360"
          role="img"
          aria-label={`${copy.leftValue}% ${copy.leftCaption.join(" ")}, ${copy.rightValue}% ${copy.rightCaption.join(" ")}`}
          className={`mt-6 h-auto w-full ${inView ? "is-visible" : ""}`}
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

          {/* left stat — white bar */}
          <line x1="90" y1="208" x2="90" y2="360" pathLength="1" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 4" className="rc-stroke guide-left-1" />
          <line x1="215" y1="262" x2="215" y2="360" pathLength="1" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 4" className="rc-stroke guide-left-2" />
          <polygon points="90,238 165,238 215,262 215,360 90,360" fill="url(#referralWhite)" className="rc-fill fill-left" />
          <polyline points="90,238 165,238 215,262" pathLength="1" fill="none" stroke="#e9edf2" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className="rc-stroke bar-left rc-glow-white" />
          <circle cx="90" cy="208" r="22" fill="none" stroke="#e9edf2" strokeWidth="1.5" className="rc-halo halo-left" />
          <circle cx="90" cy="208" r="5" fill="#e9edf2" className="rc-dot dot-left rc-glow-white" />
          <text x="78" y="150" fill="#e9edf2" fontSize="46" fontWeight="600" className="rc-text text-left">{leftCount}%</text>
          <text x="80" y="178" fill="rgba(255,255,255,0.6)" fontSize="15" className="rc-text text-left">{copy.leftCaption[0]}</text>
          <text x="80" y="197" fill="rgba(255,255,255,0.6)" fontSize="15" className="rc-text text-left">{copy.leftCaption[1]}</text>

          {/* right stat — green bar */}
          <line x1="360" y1="70" x2="360" y2="360" pathLength="1" stroke="rgba(97,194,70,0.32)" strokeWidth="1" strokeDasharray="3 4" className="rc-stroke guide-right-1" />
          <line x1="500" y1="118" x2="500" y2="360" pathLength="1" stroke="rgba(97,194,70,0.32)" strokeWidth="1" strokeDasharray="3 4" className="rc-stroke guide-right-2" />
          <polygon points="360,98 440,98 500,118 500,360 360,360" fill="url(#referralGreen)" className="rc-fill fill-right" />
          <polyline points="360,98 440,98 500,118" pathLength="1" fill="none" stroke="#61c246" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className="rc-stroke bar-right rc-glow-green" />
          <circle cx="360" cy="70" r="22" fill="none" stroke="#61c246" strokeWidth="1.5" className="rc-halo halo-right" />
          <circle cx="360" cy="70" r="5" fill="#61c246" className="rc-dot dot-right rc-glow-green" />
          <text x="348" y="40" fill="#61c246" fontSize="46" fontWeight="600" className="rc-text text-right">{rightCount}%</text>
          <text x="455" y="34" fill="rgba(97,194,70,0.85)" fontSize="15" className="rc-text text-right">{copy.rightCaption[0]}</text>
          <text x="455" y="53" fill="rgba(97,194,70,0.85)" fontSize="15" className="rc-text text-right">{copy.rightCaption[1]}</text>
        </svg>
      </div>
    </div>
  );
}
