"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { CONTENT } from "@/config/content";

type Service = {
  title: string;
  summary: string;
  metric: string;
  tag: string;
};

const services: Service[] = CONTENT.services.items.map(item => ({
  title: item.title,
  summary: item.description,
  metric: item.metric,
  tag: item.tag
}));

export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "200px" });

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative isolate overflow-hidden py-32 text-white"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* Video (optimized usage) */}
        {isInView && (
          <video
            src="service_optimized.mp4" // USE OPTIMIZED FILE
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="h-full w-full object-cover will-change-transform"
            style={{ opacity: 0.18 }}
          />
        )}

        {/* Gradient overlay (cheap, replaces blend mode) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325]/80 via-[#071325]/60 to-[#071325]/90" />

      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">
            {CONTENT.services.label}
          </p>

          <h2 className="text-5xl font-semibold tracking-tight md:text-6xl">
            {CONTENT.services.heading}
            <span className="text-accent"> {CONTENT.services.subheading}</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT */}
          <div className="flex flex-col gap-4">
            {services.map((service, i) => (
              <div
                key={service.title}
                onMouseEnter={() => setActive(i)}
                className={`group relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${active === i
                  ? "border-white/30 bg-white/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                style={{
                  transform: active === i && !shouldReduceMotion ? "scale(1.015)" : "scale(1)",
                  willChange: "transform, background-color, border-color"
                }}
              >
                <p className="text-xs tracking-[0.25em] text-white/40">
                  {service.tag}
                </p>

                <h3 className="mt-2 text-xl font-medium">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm text-white/60">
                  {service.summary}
                </p>

                {active === i && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-2xl border border-white/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div
            className="relative overflow-hidden rounded-3xl border border-white/20 bg-black/10 backdrop-blur-md"
            onMouseMove={(e) => {
              const target = e.currentTarget;
              const rect = target.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              // Use requestAnimationFrame for smoother updates
              requestAnimationFrame(() => {
                if (target) {
                  target.style.setProperty("--x", `${x}px`);
                  target.style.setProperty("--y", `${y}px`);
                }
              });
            }}
          >
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 p-10"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                {services[active].tag}
              </p>

              <h3 className="mt-4 text-3xl font-semibold">
                {services[active].title}
              </h3>

              <p className="mt-4 max-w-md text-white/70">
                {services[active].summary}
              </p>

              {/* Metric */}
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Outcome
                </p>
                <p className="mt-2 text-2xl font-medium text-accent">
                  {services[active].metric}
                </p>
              </div>

              {/* System Flow */}
              <div className="mt-12 flex items-center gap-4 text-sm text-white/50">
                {["User", "→", "API", "→", "System", "→", "Output"].map(
                  (step, i) => (
                    <span
                      key={i}
                      className={step === "System" ? "text-accent" : ""}
                    >
                      {step}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}