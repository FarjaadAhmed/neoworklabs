"use client";

import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Service Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: (
      <svg viewBox="0 0 100 40" className="w-full h-16 opacity-80">
        <line x1="0" y1="10" x2="100" y2="10" stroke="black" strokeWidth="1" />
        <circle cx="70" cy="10" r="2.5" fill="black" />
        <line x1="0" y1="20" x2="100" y2="20" stroke="black" strokeWidth="1" />
        <circle cx="20" cy="20" r="2.5" fill="black" />
        <line x1="0" y1="30" x2="100" y2="30" stroke="black" strokeWidth="1" />
        <circle cx="45" cy="30" r="2.5" fill="black" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="black" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: "Service Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: (
      <svg viewBox="0 0 100 40" className="w-full h-16 opacity-80">
        <rect x="0" y="8" width="18" height="18" rx="4" fill="none" stroke="black" strokeWidth="1.5" />
        <path d="M18 12 H30 L38 4 M18 17 H35 L43 9 M18 22 H40 L48 14" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="38" cy="4" r="1.5" fill="black" />
        <circle cx="43" cy="9" r="1.5" fill="black" />
        <circle cx="48" cy="14" r="1.5" fill="black" />
      </svg>
    ),
  },
  {
    title: "Service Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: (
      <svg viewBox="0 0 100 40" className="w-full h-16 opacity-80">
        <line x1="0" y1="25" x2="100" y2="25" stroke="black" strokeWidth="0.5" />
        <path d="M10 35 L30 15 L55 30 L85 0" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="30" cy="15" r="2.5" fill="black" />
      </svg>
    ),
  },
  {
    title: "Service Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: (
      <svg viewBox="0 0 100 40" className="w-full h-16 opacity-80">
        {[...Array(7)].map((_, i) => (
          <path
            key={i}
            d={`M${15 + i * 12} 40 L${15 + i * 12} 40 L${18 + i * 12} 15 L${12 + i * 12} 15 Z`}
            fill="black"
          />
        ))}
      </svg>
    ),
  },
  {
    title: "Service Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: (
      <svg viewBox="0 0 100 40" className="w-full h-20 opacity-80">
        {[...Array(8)].map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="black" strokeWidth="0.5" />
        ))}
        {[...Array(14)].map((_, i) => (
          <line key={`v-${i}`} x1={i * 8} y1="0" x2={i * 8} y2="40" stroke="black" strokeWidth="0.5" />
        ))}
      </svg>
    ),
  },
  {
    title: "Service Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: (
      <svg viewBox="0 0 100 40" className="w-full h-20 opacity-80">
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={i * 15} y="15" width="12" height="25" fill="none" stroke="black" strokeWidth="1" />
        ))}
        <circle cx="51" cy="27" r="5" fill="black" />
        <circle cx="6" cy="19" r="4.5" fill="none" stroke="black" strokeWidth="1" />
        <circle cx="81" cy="19" r="4.5" fill="none" stroke="black" strokeWidth="1" />
      </svg>
    ),
  },
];

function ServiceCard({ feature, index, progress }: { feature: any; index: number; progress: MotionValue<number> }) {
  // Stagger the cards based on their position in the grid
  const colIndex = index % 3;
  const rowIndex = Math.floor(index / 3);

  // Start the animation even earlier and give it an ultra-smooth, long curve
  const start = rowIndex * 0.15 + colIndex * 0.08;
  const end = start + 0.5;

  // Add a spring to smooth out the scroll progress naturally
  const smoothProgress = useSpring(progress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // Start smoothly from below the screen with a softer 1000 offset
  const y = useTransform(smoothProgress, [start, end], [1000, 0]);

  // Gentle flip from standing back (45deg) to flat (0deg)
  const rotateX = useTransform(smoothProgress, [start, end], [45, 0]);

  // Fade in faster to avoid sudden popping
  const opacity = useTransform(smoothProgress, [start, start + 0.15], [0, 1]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        rotateX,
        transformPerspective: 1200,
        transformOrigin: "bottom center",
      }}
      className="group relative w-full aspect-4/3 rounded-3xl bg-accent p-8 flex flex-col shadow-xl transition-transform duration-300 hover:scale-[1.02] border border-black/10"
    >
      <div className="relative z-10 space-y-4">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-none text-black">
          {feature.title}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-black/80 max-w-[280px]">
          {feature.description}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex justify-center w-full text-black">
        {feature.icon}
      </div>
    </motion.div>
  );
}

export function FeatureGrid() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative bg-background h-[300vh] text-white">
      {/* Sticky container locks the view while scrolling the 300vh block */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-20 pb-40">
        <div className="w-full max-w-[1300px] px-6 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ServiceCard
                key={index}
                feature={feature}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
