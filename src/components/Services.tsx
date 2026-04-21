"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";

type Service = {
  title: string;
  summary: string;
  metric: string;
  tag: string;
};

const services: Service[] = [
  {
    title: "AI Product Engineering",
    summary:
      "Agentic workflows, model orchestration, and production-grade AI systems from idea to launch.",
    metric: "12 week avg launch",
    tag: "AI SYSTEMS",
  },
  {
    title: "Automation Systems",
    summary:
      "End-to-end automations connecting internal tools and eliminating operational overhead.",
    metric: "65% manual work reduced",
    tag: "AUTOMATION",
  },
  {
    title: "Cloud & Platform Ops",
    summary:
      "Scalable infrastructure, observability, and reliability-focused platform engineering.",
    metric: "99.95% uptime target",
    tag: "INFRA",
  },
  {
    title: "AI-Enhanced Experiences",
    summary:
      "Intelligent features and interfaces that leverage AI to delight users and drive engagement.",
    metric: "20%+ engagement lift",
    tag: "AI PRODUCTS",
  }
];

export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "200px" });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    const checkTime = () => {
      if (video.duration) {
        // Fade out slightly before the end (e.g., 0.5s before end)
        const timeLeft = video.duration - video.currentTime;
        if (timeLeft < 0.6 || video.currentTime < 0.3) {
          setVideoOpacity(0);
        } else {
          setVideoOpacity(0.2); // Target max opacity instead of 100%
        }
      }
      rafId = requestAnimationFrame(checkTime);
    };
    rafId = requestAnimationFrame(checkTime);

    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative isolate overflow-hidden py-32 text-white">
      {/* Video Background masked to fade perfectly into the global background */}
      <div
        className="absolute inset-0 -z-20 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
        {isInView && (
          <video
            ref={videoRef}
            src="/servicebg.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ opacity: videoOpacity }}
            className="h-full w-full object-cover scale-110 transition-opacity duration-600 ease-in-out"
          />
        )}
        {/* Darkening tint to blend into deep navy */}
        <div className="absolute inset-0 bg-[#071325]/50 mix-blend-multiply pointer-events-none" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">
            Services
          </p>

          <h2 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Systems, not features.
            <span className="text-accent"> Built to scale.</span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT: Service List */}
          <div className="flex flex-col gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                onMouseEnter={() => setActive(i)}
                className={`group relative cursor-pointer rounded-2xl border p-5 transition-all ${active === i
                  ? "border-white/30 bg-white/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
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
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Dynamic Preview */}
          <div
            className="relative overflow-hidden rounded-3xl border border-white/20 bg-black/30 backdrop-blur-xl"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--x",
                `${e.clientX - rect.left}px`
              );
              e.currentTarget.style.setProperty(
                "--y",
                `${e.clientY - rect.top}px`
              );
            }}
          >


            {/* Content */}
            <motion.div
              key={active}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
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

              {/* Fake System Diagram (replace later) */}
              <div className="mt-12 flex items-center gap-4 text-sm text-white/50">
                {["User", "→", "API", "→", "System", "→", "Output"].map((step, i) => (
                  <span key={i} className={step === "System" ? "text-accent" : ""}>
                    {step}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}