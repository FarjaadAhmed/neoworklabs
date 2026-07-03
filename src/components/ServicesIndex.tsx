"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { CONTENT } from "@/config/content";
import { LiteYouTube } from "./LiteYouTube";

type ServiceItem = (typeof CONTENT.services.items)[number];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "What we do" index: every service is visible at once as a large
 * typographic row; one row expands at a time to answer "how we help you"
 * (outcomes + preview + CTA). No scroll-jacking — works the same with a
 * mouse, a trackpad, or a thumb.
 */
export function ServicesIndex() {
  const [openId, setOpenId] = useState<string | null>(CONTENT.services.items[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full px-5 py-24 sm:px-8 md:py-36 lg:px-24 text-white">
      {/* Header */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <span className="mb-4 block text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">
            What we do
          </span>
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight leading-[1.05] font-poppins sm:text-5xl lg:text-6xl">
            {CONTENT.services.heading}
            <span className="text-accent italic"> {CONTENT.services.subheading}</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-white/50 md:text-right">
          Four capabilities, one production engine — pick a service to see
          exactly what you get.
        </p>
      </motion.div>

      {/* Service rows */}
      <div className="border-t border-white/10">
        {CONTENT.services.items.map((service, index) => (
          <ServiceRow
            key={service.id}
            service={service}
            index={index}
            open={openId === service.id}
            reduceMotion={!!reduceMotion}
            onToggle={() =>
              setOpenId((current) => (current === service.id ? null : service.id))
            }
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, margin: "-40px" }}
        className="mt-14 flex flex-col items-center gap-4 text-center md:mt-20"
      >
        <p className="text-sm text-white/50">Not sure which one your brand needs first?</p>
        <Link
          href="/contact-us"
          className="group inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-[#071325] shadow-[0_8px_30px_rgba(97,194,70,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(97,194,70,0.55)] active:translate-y-0"
        >
          Book a free strategy call
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
  open,
  reduceMotion,
  onToggle,
}: {
  service: ServiceItem;
  index: number;
  open: boolean;
  reduceMotion: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-60px" }}
      className="border-b border-white/10"
    >
      {/* Row header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center gap-5 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 sm:gap-8 md:py-9"
      >
        <span
          className={`w-10 shrink-0 font-mono text-sm transition-colors duration-300 sm:text-base ${open ? "text-accent" : "text-white/30 group-hover:text-white/60"
            }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="flex-1">
          <span
            className={`block text-2xl font-medium tracking-tight transition-all duration-300 sm:text-4xl md:text-5xl ${open ? "text-white" : "text-white/70 group-hover:text-white group-hover:translate-x-2"
              }`}
          >
            {service.title}
          </span>
        </span>

        <span className="hidden shrink-0 text-[10px] font-mono uppercase tracking-[0.24em] text-white/35 sm:block">
          {service.tag}
        </span>

        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${open
            ? "rotate-45 border-accent bg-accent text-[#071325]"
            : "border-white/15 text-white/60 group-hover:border-white/40 group-hover:text-white"
            }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-10 pl-0 sm:pl-18 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:pb-14">
              <div>
                <p className="max-w-xl text-base leading-relaxed text-white/60">
                  {service.description}
                </p>

                <p className="mb-3 mt-8 text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">
                  How this helps you
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {service.outcomes?.map((outcome, i) => (
                    <motion.li
                      key={outcome}
                      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.06 }}
                      className="flex items-start gap-2.5 text-sm text-white/75"
                    >
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      {outcome}
                    </motion.li>
                  ))}
                </ul>

                <Link
                  href="/contact-us"
                  className="group/cta mt-9 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                >
                  Start this project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </Link>
              </div>

              {service.videoUrl && (
                <div className="relative self-start overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-2">
                  <div className="relative overflow-hidden rounded-lg bg-black pt-[56.25%]">
                    <LiteYouTube url={service.videoUrl} title={`${service.title} showreel`} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
