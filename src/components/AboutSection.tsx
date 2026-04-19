"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section className="relative w-full bg-background py-40 text-white overflow-hidden">
      <div className="mx-auto max-w-[1700px] px-6 lg:px-14">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side: Headlines */}
          <div className="flex flex-col justify-between py-10">
            <h2 className="text-5xl font-light leading-[1.1] tracking-tight md:text-7xl">
              Lorem ipsum <span className="text-accent">dolor</span>
              <br />
              dolor <span className="text-accent">sit</span> amet
              <br />
              consectetur <span className="text-accent">adipiscing</span> elit.
            </h2>
          </div>

          {/* Right Side: Orbital Visual & Content */}
          <div className="relative flex flex-col items-center justify-center min-h-[500px]">
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

            {/* Paragraph Content */}
            <div className="relative z-10 flex flex-col justify-end w-full pl-0 lg:pl-20">
              <p className="max-w-xl text-lg font-light leading-relaxed text-white/70 md:text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                scelerisque justo urna, vitae sagittis enim feugiat id. Cras
                dapibus erat in orci aliquam, placerat consectetur elit viverra.
                Nunc vulputate magna sit amet nisl tincidunt, pretium molestie
                erat aliquet. Suspendisse consectetur tempus urna, vitae laoreet
                dui.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
