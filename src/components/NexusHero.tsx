"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "lorem\nimpsum" },
  { value: 75, label: "lorem\nimpsum" },
  { value: 100, suffix: "+", label: "lorem\nimpsum" },
  { value: 10, label: "lorem\nimpsum" },
];

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

  useEffect(() => {
    const controls = animate(0, value, {
      delay,
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setCount(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [delay, duration, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function NexusHero() {
  return (
    <section
      className="relative flex min-h-screen flex-col bg-background text-[#f4f6ff]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/Ai model.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <Navbar />
      <div className="relative z-10 mx-auto flex w-full max-w-412.5 flex-col px-6 lg:px-14 mt-36">

        <main className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-2 mt-4">
          <div className="pt-20 lg:pt-20">
            <motion.h1
              className="text-6xl tracking-tight text-white lg:text-[72px] lg:leading-none font-bold font-poppins"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 2.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              neowork
              <br />
              labs<span className="text-accent">.</span>
            </motion.h1>

            <div className="mt-52 space-y-10 lg:mt-72">
              <p className="max-w-md text-[1.3rem] font-normal text-white/90">
                Lorem ipsum dolor sit amet:
              </p>

              <div className="h-px w-36 bg-white/20" />

              <div className="flex max-w-2xl gap-12 lg:gap-10">
                {stats.map((item, index) => (
                  <motion.article
                    key={`${item.value}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <p className="text-4xl font-normal text-accent lg:text-[2.13rem]">
                      <AnimatedCounter
                        value={item.value}
                        suffix={item.suffix}
                        delay={0.8 + index * 0.1}
                      />
                    </p>
                    <p className="mt-4 whitespace-pre-line text-[0.75rem] font-normal leading-6 tracking-wide text-white/70 uppercase xs:text-[0.4rem]  ">
                      {item.label}
                    </p>
                  </motion.article>
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
