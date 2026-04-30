"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CONTENT } from "@/config/content";
import { ArrowUpRight } from "lucide-react";
import NavDots from "./NavDots";

/**
 * A clean, minimal services section with micro-interactions.
 * - lg+: scroll-jacked horizontal carousel
 * - <lg: simple vertical stack (no scroll hijacking)
 */
export function ServicesHorizontal() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const scrollDrivenX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, maxTranslate],
  );

  const springX = useSpring(scrollDrivenX, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateTranslate = () => {
      const track = trackRef.current;
      if (!track) return;

      const overflow = track.scrollWidth - track.clientWidth;
      if (overflow <= 0) {
        setMaxTranslate(0);
        return;
      }

      // Add a small buffer to ensure the final card is fully reachable
      setMaxTranslate(-overflow);
    };

    updateTranslate();
    window.addEventListener("resize", updateTranslate);
    return () => window.removeEventListener("resize", updateTranslate);
  }, []);

  const scrollToCard = (index: number) => {
    setActiveIndex(index);

    if (window.innerWidth < 1024) {
      const mobileCards = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-mobile-service-card='true']",
        ),
      );
      const targetMobileCard = mobileCards[index];
      if (targetMobileCard) {
        targetMobileCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
      return;
    }

    const section = targetRef.current;
    const track = trackRef.current;
    if (!section) {
      return;
    }
    if (!track) {
      return;
    }

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-service-card='true']"),
    );
    const targetCard = cards[index];
    if (!targetCard) {
      return;
    }

    const scrollRange = section.offsetHeight - window.innerHeight;
    const overflow = Math.max(track.scrollWidth - track.clientWidth, 1);
    const targetTranslate = Math.min(targetCard.offsetLeft, overflow);
    const targetProgress = targetTranslate / overflow;
    const targetTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetTop + scrollRange * targetProgress,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ─── MOBILE / TABLET  (<lg) ─── plain vertical layout ─── */}
      <section className="block lg:hidden bg-transparent px-5 sm:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="mb-3 block text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">
            {CONTENT.services.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05] font-poppins">
            {CONTENT.services.heading}
            <span className="text-accent italic">
              {" "}
              {CONTENT.services.subheading}
            </span>
          </h2>
        </motion.div>

        {/* Cards — vertical stack */}
        <div className="flex flex-col gap-6">
          {CONTENT.services.items.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              mobile
              isActive={activeIndex === index}
              onClick={() => scrollToCard(index)}
            />
          ))}

          {/* CTA card */}
          <div className="flex flex-col justify-center border border-dashed border-white/10 rounded-2xl p-8 group cursor-pointer hover:border-white/30 transition-colors">
            <p className="text-white/40 text-sm mb-4 uppercase tracking-widest">
              Next Step
            </p>
            <h3 className="text-2xl text-white group-hover:translate-x-2 transition-transform duration-300">
              Start your project
            </h3>
            <ArrowUpRight
              className="text-white/20 mt-4 group-hover:text-white group-hover:rotate-45 transition-all duration-300"
              size={32}
            />
          </div>

          <div
            className="mt-2 flex items-center justify-center gap-2"
            aria-label="Service navigation dots"
          >
            <NavDots
              items={CONTENT.services.items}
              activeIndex={activeIndex}
              onSelect={(i: number) => scrollToCard(i)}
            />
          </div>
        </div>
      </section>

      {/* ─── DESKTOP (lg+) ─── scroll-jacked horizontal carousel ─── */}
      <section
        ref={targetRef}
        className="hidden lg:block relative h-[500vh] z-50"
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-28 pb-10">
          {/* Background Subtle Gradient */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_100%)]" />

          {/*
            --section-offset drives BOTH the header indent and the
            initial x-position of the card strip so they share the same
            left edge on every viewport.
          */}
          <div className="flex w-full flex-col">
            {/* Section Header */}
            <div className="mb-8 px-5 sm:px-8 lg:px-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <span className="mb-3 block text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">
                  {CONTENT.services.label}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] font-poppins">
                  {CONTENT.services.heading}
                  <span className="text-accent italic">
                    {" "}
                    {CONTENT.services.subheading}
                  </span>
                </h2>
              </motion.div>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="relative">
              <motion.div
                ref={trackRef}
                style={{
                  x: springX,
                }}
                className="flex gap-8 xl:gap-12 px-5 sm:px-8 lg:px-24"
              >
                {CONTENT.services.items.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    isActive={activeIndex === index}
                    onClick={() => scrollToCard(index)}
                  />
                ))}

                {/* End of list spacer/CTA */}
                <div
                  data-service-card="true"
                  className="flex flex-col justify-center min-w-87.5 md:min-w-120 h-[26rem] border border-dashed border-white/10 rounded-2xl p-10 group cursor-pointer hover:border-white/30 transition-colors bg-white/3"
                >
                  <p className="text-white/40 text-sm mb-4 uppercase tracking-widest">
                    Next Step
                  </p>
                  <h3 className="text-2xl text-white group-hover:translate-x-2 transition-transform duration-300">
                    Start your project
                  </h3>
                  <ArrowUpRight
                    className="text-white/20 mt-4 group-hover:text-white group-hover:rotate-45 transition-all duration-300"
                    size={32}
                  />
                </div>

                {/* Extra spacer to ensure the last card can be fully viewed without hitting the edge immediately */}
                <div className="min-w-[10vw] shrink-0" />
              </motion.div>
            </div>

            <div
              className="mt-8 flex items-center justify-center gap-2"
              aria-label="Service navigation dots"
            >
              <NavDots
                items={CONTENT.services.items}
                activeIndex={activeIndex}
                onSelect={(i: number) => scrollToCard(i)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  service,
  index,
  mobile = false,
  isActive = false,
  onClick,
}: {
  service: any;
  index: number;
  mobile?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      data-service-card="true"
      data-mobile-service-card={mobile ? "true" : undefined}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
      className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-8 sm:p-10 backdrop-blur-xl shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 select-none ${mobile
        ? "w-full min-h-[24rem] sm:min-h-[26rem]"
        : "min-w-87.5 md:min-w-120 min-h-[26rem]"
        } ${isActive ? "border-white/25 bg-white/6" : "border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20"}`}
    >
      {/* Micro-interaction: Hover Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 rounded-2xl pointer-events-none group-hover:opacity-100" />

      <div>
        <div className="flex justify-between items-start mb-8 sm:mb-12">
          <span className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">
            {service.id} / {service.tag}
          </span>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
            <ArrowUpRight
              className="text-white group-hover:text-black transition-colors"
              size={18}
            />
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 sm:mb-6 transition-transform duration-300 group-hover:translate-x-1">
          {service.title}
        </h3>

        <p className="text-white/50 text-base leading-relaxed max-w-[90%]">
          {service.description}
        </p>
      </div>

      {service.videoUrl && (
        <div className="relative mt-6 w-full rounded-2xl p-2 bg-black/20 border border-white/10">
          <div className="relative pt-[56.25%] overflow-hidden rounded-lg bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={service.videoUrl}
              title={`${service.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="relative overflow-hidden mt-6">


        {/* Decorative element */}
        <motion.div
          className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
