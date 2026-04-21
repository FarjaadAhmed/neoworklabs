"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const orbitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Unified Master Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    const TL_DUR = 100; // An arbitrary total duration to base percentage values on

    // Panel animations (enter 0-10%, exit 90-100%)
    tl.fromTo(leftPanelRef.current, 
      { x: -300, opacity: 0, borderRadius: "0px" },
      { x: 0, opacity: 1, borderRadius: "80px", duration: 10, ease: "none" },
      0
    );

    tl.to(leftPanelRef.current, {
      opacity: 0,
      duration: 10,
      ease: "none"
    }, 90);

    // 2. Individual items scroll animations
    const totalItems = SPLIT_SECTION_ITEMS.length;
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const step = 80 / totalItems; // 80 because it spans from 10 to 90
      const startProgress = 10 + (index * step);

      // Use sequential keyframes to avoid overlapping property conflicts on the same element
      tl.fromTo(item, 
        { opacity: 0, y: 60 },
        {
          keyframes: [
            { opacity: 1, y: 36, duration: step * 0.2 },
            { opacity: 1, y: -36, duration: step * 0.6 },
            { opacity: 0, y: -60, duration: step * 0.2 }
          ],
          ease: "none"
        }, 
        startProgress
      );
    });

    // 3. Spinning circles (Continuous, separated from scroll timeline)
    gsap.to(".split-orbit-ring", {
      rotation: 360,
      transformOrigin: "center",
      ease: "none",
      repeat: -1,
      duration: (i) => 20 + i * 10,
    });
    
    gsap.to(".split-orbit-dot", {
      rotation: 360,
      transformOrigin: "center",
      ease: "none",
      repeat: -1,
      duration: (i) => 25 + i * 12,
    });

    // 4. Subtle 3D mouse parallax on the orbit container
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;

      gsap.to(orbitRef.current, {
        x: x * -50,
        y: y * -50,
        rotateX: y * 20,
        rotateY: x * -20,
        ease: "power2.out",
        duration: 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[500vh] w-full bg-[#050510]">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />

      <div className="sticky top-0 flex flex-col md:flex-row h-screen w-full overflow-hidden">
        <div
          ref={leftPanelRef}
          className="relative flex-1 bg-accent flex flex-col justify-center px-8 md:px-24 py-20 text-black z-10"
        >
          <div className="max-w-xl relative h-[400px]">
            {SPLIT_SECTION_ITEMS.map((item, index) => (
              <div
                key={index}
                ref={el => { itemsRef.current[index] = el; }}
                className="absolute inset-0 flex flex-col justify-center space-y-4 opacity-0"
              >
                <div className="w-4 h-4 bg-black rounded-full" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {item.title}
                </h2>
                <p className="text-lg md:text-xl leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center min-h-[500px]" style={{ perspective: 1000 }}>
          <div ref={orbitRef} className="absolute right-[-20%] top-1/2 -translate-y-1/2 h-[800px] w-[800px] opacity-20 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
            <svg viewBox="0 0 200 200" className="h-full w-full" style={{ overflow: "visible" }}>
              {[...Array(8)].map((_, i) => (
                <circle
                  key={i}
                  className="split-orbit-ring"
                  cx="100"
                  cy="100"
                  r={20 + i * 15}
                  fill="none"
                  stroke="white"
                  strokeWidth="0.2"
                  strokeDasharray={i % 2 === 0 ? "1 3" : "0"}
                />
              ))}
              {[35, 65, 95].map((r, i) => (
                <circle
                  key={`dot-${i}`}
                  className="split-orbit-dot"
                  cx={100 + r}
                  cy="100"
                  r="1.5"
                  fill="white"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
