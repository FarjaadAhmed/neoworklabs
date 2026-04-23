"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CONTENT } from "@/config/content";

export function ServicesCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh] bg-black text-white"
        >
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0,transparent_100%)] z-0 pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-center h-full w-full max-w-[85vw] mx-auto">
                    {/* Header */}
                    <div className="mb-12 md:mb-20">
                        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/50 pl-4 md:pl-0">
                            {CONTENT.services.label}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight pl-4 md:pl-0">
                            {CONTENT.services.heading}
                            <span className="text-accent block text-white/70 mt-2"> {CONTENT.services.subheading}</span>
                        </h2>
                    </div>

                    {/* Carousel */}
                    <motion.div style={{ x }} className="flex gap-8 px-4 md:px-0 w-max">
                        {CONTENT.services.items.map((item, index) => (
                            <div
                                key={item.id}
                                className="group relative flex h-[400px] w-[300px] md:h-[500px] md:w-[450px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10 shrink-0"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-sm font-mono tracking-wider text-white/40">{item.id}</span>
                                        <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs tracking-widest text-white/60">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium mb-4">{item.title}</h3>
                                    <p className="text-sm md:text-base text-white/60 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
                                        {CONTENT.services.outcomeLabel || "Outcome"}
                                    </p>
                                    <p className="text-lg md:text-xl font-medium text-white/90">
                                        {item.metric}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
