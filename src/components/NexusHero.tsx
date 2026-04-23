"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CONTENT } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

const stats: Stat[] = CONTENT.hero.stats.map(s => ({
  value: parseInt(s.value),
  suffix: s.value.replace(/[0-9]/g, ""),
  label: s.label.replace(" ", "\n")
}));

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
};

function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.4,
  delay = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useGSAP(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: duration,
      delay: delay,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.round(obj.val));
      },
    });
  }, [value, duration, delay]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function NexusHero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".hero-title",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 2.2, ease: "power3.out" }
    );

    gsap.fromTo(".hero-stat",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: "power2.out"
      }
    );

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col bg-background text-[#f4f6ff]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="ai-model.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-412.5 flex-col px-6 lg:px-14 mt-28 md:mt-36">

        <main className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-2 mt-4">
          <div className="pt-8 md:pt-20 lg:pt-20">
            <h1
              className="hero-title text-[4rem] leading-[1] sm:text-6xl tracking-tight text-white lg:text-[72px] lg:leading-none font-bold font-poppins opacity-0"
            >
              neowork
              <br />
              labs<span className="text-accent">.</span>
            </h1>

            <div className="mt-24 space-y-8 md:mt-52 md:space-y-10">
              <p className="max-w-md text-lg md:text-[1.3rem] font-normal text-white/90">
                {CONTENT.hero.subtitle}
              </p>

              <div className="h-px w-36 bg-white/20" />

              <div className="grid grid-cols-2 gap-8 sm:flex sm:flex-wrap sm:gap-12 lg:gap-10 max-w-2xl">
                {stats.map((item, index) => (
                  <article
                    key={`${item.value}-${index}`}
                    className="hero-stat opacity-0"
                  >
                    <p className="text-4xl font-normal text-accent md:text-[2.13rem]">
                      <AnimatedCounter
                        value={item.value}
                        suffix={item.suffix}
                        delay={0.8 + index * 0.1}
                      />
                    </p>
                    <p className="mt-2 md:mt-4 whitespace-pre-line text-[0.65rem] md:text-[0.75rem] font-normal leading-5 tracking-wide text-white/70 uppercase">
                      {item.label}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex h-full items-center justify-center lg:justify-end" />
        </main>
      </div>
    </section>
  );
}
