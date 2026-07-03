"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

// ─── REPLACE WITH YOUR REAL CLIENTS ────────────────────────────────────────
// Fill in name, role, company, rating (1-5), and their testimonial quote.
// Add or remove objects from this array to change how many cards are shown.
const TESTIMONIALS = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Founder",
    company: "BrightScale",
    rating: 5,
    quote:
      "Neowork Labs transformed our content pipeline completely. We went from sporadic posting to a consistent, professional brand presence that actually converts. The AI-powered ads alone cut our CPL by 40%.",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Head of Marketing",
    company: "Elevate Media",
    rating: 5,
    quote:
      "Every piece of content they produce looks like it was made by a studio ten times their size. The team is responsive, the work is exceptional, and they genuinely care about results — not just deliverables.",
  },
  {
    id: "3",
    name: "Marcus Rivera",
    role: "CEO",
    company: "NovaBrand",
    rating: 5,
    quote:
      "We needed a website and video content fast without sacrificing quality. Neowork delivered ahead of schedule. Our new site converts at 3× our old one. I'd recommend them to any founder who takes growth seriously.",
  },
];
// ─── END REPLACE ────────────────────────────────────────────────────────────

// ─── TRUSTPILOT WIDGET ──────────────────────────────────────────────────────
// Once you have a Trustpilot Business account:
// 1. Go to https://businessapp.b2b.trustpilot.com/ → Get widgets
// 2. Copy your businessunit-id and template-id
// 3. Replace the placeholder values below and uncomment the <TrustpilotWidget />
// 4. Remove the <TrustpilotPlaceholder /> component
// ─── END TRUSTPILOT ────────────────────────────────────────────────────────

// function TrustpilotWidget() {
//   return (
//     <>
//       <div
//         className="trustpilot-widget"
//         data-locale="en-AU"
//         data-template-id="REPLACE_WITH_TEMPLATE_ID"
//         data-businessunit-id="REPLACE_WITH_BUSINESSUNIT_ID"
//         data-style-height="52px"
//         data-style-width="100%"
//         data-theme="dark"
//       >
//         <a
//           href="https://www.trustpilot.com/review/neoworklabs.com"
//           target="_blank"
//           rel="noopener"
//         >
//           Trustpilot
//         </a>
//       </div>
//       <Script
//         src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
//         strategy="lazyOnload"
//       />
//     </>
//   );
// }

const EASE = [0.16, 1, 0.3, 1] as const;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i < count ? "#61c246" : "transparent"}
          stroke={i < count ? "#61c246" : "rgba(255,255,255,0.2)"}
        />
      ))}
    </div>
  );
}

function InitialAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
      {initials}
    </div>
  );
}

export function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full px-5 py-24 sm:px-8 md:py-36 lg:px-24 text-white overflow-hidden">
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{ background: "radial-gradient(ellipse, #61c246 0%, transparent 70%)" }}
      />

      {/* Header */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="mb-14 flex flex-col gap-4 md:mb-20"
      >
        <span className="block text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">
          Client stories
        </span>
        <h2 className="max-w-xl text-4xl font-semibold tracking-tight leading-[1.05] font-poppins sm:text-5xl">
          Real results for{" "}
          <span className="text-accent italic">real brands.</span>
        </h2>
      </motion.div>

      {/* Testimonial cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-60px" }}
            className="group flex flex-col gap-6 rounded-2xl border border-white/8 bg-white/3 p-7 transition-colors duration-300 hover:border-white/15 hover:bg-white/5"
          >
            <Stars count={t.rating} />

            <blockquote className="flex-1 text-base leading-relaxed text-white/70">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              <InitialAvatar name={t.name} />
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/45">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust signals + Trustpilot CTA */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        viewport={{ once: true, margin: "-40px" }}
        className="mt-14 flex flex-col items-center gap-6 border-t border-white/8 pt-14 text-center md:mt-20 md:pt-20"
      >
        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: "25+", label: "Happy clients" },
            { value: "100+", label: "Projects delivered" },
            { value: "7+", label: "Years of experience" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-semibold text-white">{s.value}</span>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Trustpilot placeholder — replace with <TrustpilotWidget /> when ready */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-xs text-white/35">
            We&apos;re building our Trustpilot profile — reviews coming soon.
          </p>
          {/* Replace the link below with your real Trustpilot review page URL */}
          <Link
            href="https://www.trustpilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group/tp inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
          >
            Leave us a review on Trustpilot
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/tp:translate-x-0.5 group-hover/tp:-translate-y-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
