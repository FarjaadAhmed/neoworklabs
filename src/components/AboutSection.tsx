"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { TextReveal } from "./TextReveal";
import { CONTENT } from "@/config/content";

export function AboutSection() {
  const container = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".orbit-ring", {
      rotation: 360,
      transformOrigin: "center",
      ease: "none",
      repeat: -1,
      duration: (i) => 20 + i * 10,
    });
    gsap.to(".orbit-dot", {
      rotation: 360,
      transformOrigin: "center",
      ease: "none",
      repeat: -1,
      duration: (i) => 25 + i * 12,
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;

      gsap.to(orbitRef.current, {
        x: x * -40,
        y: y * -40,
        rotateX: y * 15,
        rotateY: x * -15,
        ease: "power2.out",
        duration: 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });

  return (
    <section ref={container} className="relative z-10 w-full py-40 text-white overflow-hidden">
      <div className="mx-auto max-w-[1700px] px-6 lg:px-14">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side: Headlines */}
          <div className="flex flex-col justify-between py-10 font-extrabold">
            <div className="space-y-6">
              <TextReveal
                text={CONTENT.about.revealText}
                className="text-3xl tracking-tighter md:text-4xl"
              />
              <div className="flex flex-col space-y-4 pt-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-16 w-64 bg-accent rounded-full"
                />
                <div className="flex space-x-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="h-16 w-52 bg-accent rounded-full"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="h-16 w-20 bg-accent rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Orbital Visual & Content */}
          <div className="relative flex flex-col items-center justify-center min-h-[500px]" style={{ perspective: 1000 }}>
            {/* Massive Orbital Visual Background */}
            <div ref={orbitRef} className="absolute right-[-20%] top-1/2 -translate-y-1/2 h-[800px] w-[800px] opacity-20 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
              <svg viewBox="0 0 200 200" className="h-full w-full" style={{ overflow: "visible" }}>
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={i}
                    className="orbit-ring"
                    cx="100"
                    cy="100"
                    r={20 + i * 15}
                    fill="none"
                    stroke="white"
                    strokeWidth="0.2"
                    strokeDasharray={i % 2 === 0 ? "1 3" : "0"}
                  />
                ))}
                {/* Wandering Dots */}
                {[35, 65, 95].map((r, i) => (
                  <circle
                    key={`dot-${i}`}
                    className="orbit-dot"
                    cx={100 + r}
                    cy="100"
                    r="1.5"
                    fill="white"
                  />
                ))}
              </svg>
            </div>

            {/* Paragraph Content */}
            <div className="relative z-10 flex flex-col justify-end w-full pl-0 lg:pl-20">
              <p className="max-w-xl text-lg font-light leading-relaxed text-white/70 md:text-2xl whitespace-pre-line">
                {CONTENT.about.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
