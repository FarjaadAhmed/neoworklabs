"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SPLIT_SECTION_ITEMS = [
  {
    title: "Innovate",
    description: "Pushing boundaries with cutting-edge technology and creative solutions."
  },
  {
    title: "Design",
    description: "Crafting intuitive user experiences that resonate and inspire action."
  },
  {
    title: "Develop",
    description: "Building robust, scalable applications with clean and efficient code."
  },
  {
    title: "Launch",
    description: "Bridging the gap between vision and reality with seamless deployment."
  },
  {
    title: "Scale",
    description: "Optimizing performace to ensure your growth knows no bounds."
  }
];

export function SplitSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate section entry/exit
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const leftX = useTransform(scrollYProgress, [0, 0.1], [-300, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.1], ["0px", "80px"]);

  return (
    <section ref={containerRef} className="relative min-h-[500vh] w-full bg-[#050510]">
      {/* Sticky Container holds the view while items scroll through */}
      <div className="sticky top-0 flex flex-col md:flex-row h-screen w-full overflow-hidden">

        {/* Left Side: Lime Content (Sticky Panel) */}
        <motion.div
          style={{ x: leftX, opacity: sectionOpacity, borderRadius }}
          className="relative flex-1 bg-accent flex flex-col justify-center px-8 md:px-24 py-20 text-black z-10"
        >
          <div className="max-w-xl relative h-[400px]">
            {SPLIT_SECTION_ITEMS.map((item, index) => {
              // Calculate individual item timings over the 500vh scroll
              // Each item gets a slice of progress
              const totalItems = SPLIT_SECTION_ITEMS.length;
              const step = 0.8 / totalItems; // Use middle 80% for items
              const start = 0.1 + (index * step);
              const end = start + step;

              // We'll use hooks in a helper map, but for Framer Motion on the map is fine 
              // as long as the array length is constant. 
              // Using style-based transforms within the map is preferred for scroll linking.

              // Note: useTransform must be called inside the component, but we can 
              // generate them here in the map as long as the list is static.
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const itemOpacity = useTransform(scrollYProgress,
                [start, start + step * 0.2, end - step * 0.2, end],
                [0, 1, 1, 0]
              );

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const itemY = useTransform(scrollYProgress,
                [start, end],
                [60, -60]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity: itemOpacity, y: itemY }}
                  className="absolute inset-0 flex flex-col justify-center space-y-4"
                >
                  <div className="w-4 h-4 bg-black rounded-full" />
                  <motion.h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {item.title}
                  </motion.h2>
                  <motion.p className="text-lg md:text-xl leading-relaxed max-w-sm">
                    {item.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side: Orbital Visual & Content */}
        <div className="relative flex-1 flex flex-col items-center justify-center min-h-[500px]">
          {/* Massive Orbital Visual Background */}
          <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 h-[800px] w-[800px] opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx="100"
                  cy="100"
                  r={20 + i * 15}
                  fill="none"
                  stroke="white"
                  strokeWidth="0.2"
                  strokeDasharray={i % 2 === 0 ? "1 3" : "0"}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20 + i * 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "center" }}
                />
              ))}
              {/* Wandering Dots */}
              {[35, 65, 95].map((r, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={100 + r}
                  cy="100"
                  r="1.5"
                  fill="white"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25 + i * 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "center" }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}


