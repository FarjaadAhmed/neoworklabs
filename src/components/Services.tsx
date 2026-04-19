"use client";

import { motion, Variants } from "framer-motion";

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

const itemVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 150,
    x: index % 3 === 0 ? -100 : index % 3 === 1 ? 0 : 100,
    scale: 0.8,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function FeatureGrid() {
  return (
    <section className="bg-background py-40 text-white overflow-x-hidden">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ 
                once: true, 
                amount: 0.1,
                margin: `-100px 0px -${index * 150}px 0px` 
              }}
              className="w-full aspect-[4/3] rounded-[24px] bg-white/5 backdrop-blur-md border border-white/10 p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all hover:bg-white/10 hover:border-white/20"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight leading-none text-accent">{feature.title}</h3>
                <p className="text-xs font-medium leading-relaxed opacity-60 max-w-[240px]">
                  {feature.description}
                </p>
              </div>
              
              <div className="mt-auto pt-4 grayscale brightness-200 contrast-200">
                {feature.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
