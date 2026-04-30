"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import NavDots from "./NavDots";
import { ArrowUpRight } from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function ServicesCarousel({
    items,
    activeIndex,
    setActiveIndex,
}: {
    items: any[];
    activeIndex: number;
    setActiveIndex: (i: number) => void;
}) {
    const targetRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [maxTranslate, setMaxTranslate] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const scrollDrivenX = useTransform(scrollYProgress, [0, 1], [0, maxTranslate]);
    const springX = useSpring(scrollDrivenX, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        if (!isClient) return;
        const updateTranslate = () => {
            const track = trackRef.current;
            if (!track) return;
            const overflow = track.scrollWidth - track.clientWidth;
            setMaxTranslate(overflow > 0 ? -overflow : 0);
        };
        updateTranslate();
        window.addEventListener("resize", updateTranslate);
        return () => window.removeEventListener("resize", updateTranslate);
    }, [isClient]);

    // sync activeIndex to visible center
    useEffect(() => {
        if (!isClient) return;
        const unsubscribe = (springX as any).onChange?.((v: number) => {
            const track = trackRef.current;
            if (!track) return;
            const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-service-card='true']"));
            if (!cards.length) return;
            const currentX = v;
            const visibleLeft = -currentX;
            const visibleCenter = visibleLeft + (track.clientWidth || 0) / 2;
            let nearestIndex = 0;
            let nearestDist = Infinity;
            for (let i = 0; i < cards.length; i++) {
                const c = cards[i];
                const cardCenter = c.offsetLeft + c.offsetWidth / 2;
                const dist = Math.abs(cardCenter - visibleCenter);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearestIndex = i;
                }
            }
            setActiveIndex(nearestIndex);
        });
        return () => unsubscribe?.();
    }, [springX, setActiveIndex, isClient]);

    const scrollToCard = (index: number) => {
        const section = targetRef.current;
        const track = trackRef.current;
        if (!section || !track) return;
        const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-service-card='true']"));
        const targetCard = cards[index];
        if (!targetCard) return;
        const scrollRange = section.offsetHeight - window.innerHeight;
        const overflow = Math.max(track.scrollWidth - track.clientWidth, 1);
        const targetTranslate = Math.min(targetCard.offsetLeft, overflow);
        const targetProgress = targetTranslate / overflow;
        const targetTop = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: targetTop + scrollRange * targetProgress, behavior: "smooth" });
        setActiveIndex(index);
    };

    if (!isClient) {
        return (
            <section ref={targetRef} className="hidden lg:block relative h-[300vh] bg-white text-slate-900">
                <div className="sticky top-0 h-screen" />
            </section>
        );
    }

    return (
        <section ref={targetRef} className="hidden lg:block relative h-[300vh] bg-white text-slate-900">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(2,6,23,0.06)_0%,transparent_100%)]" />
                <div className="flex w-full flex-col px-5 sm:px-8 lg:px-24">
                    <div className="mb-12">
                        <div>
                            <span className="mb-3 block text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500">Services</span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] font-poppins">
                                Systems, not features.
                                <span className="text-accent italic"> Built to scale.</span>
                            </h2>
                        </div>
                    </div>

                    <motion.div ref={trackRef} style={{ x: springX }} className="flex gap-8 xl:gap-12 cursor-grab">
                        {items.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                                isActive={activeIndex === index}
                                onClick={() => scrollToCard(index)}
                            />
                        ))}

                        <div className="flex flex-col justify-center min-w-75 h-100 rounded-2xl p-10 group cursor-pointer border border-white/20 bg-background backdrop-blur-xl shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] hover:bg-accent hover:border-accent/80 transition-colors">
                            <p className="text-white/65 text-sm mb-4 uppercase tracking_widest">Next Step</p>
                            <h3 className="text-2xl text-white group-hover:translate-x-2 transition-transform duration-300">Start your project</h3>
                            <ArrowUpRight className="text-white/40 mt-4 group-hover:text-white group-hover:rotate-45 transition-all duration-300" size={32} />
                        </div>
                    </motion.div>

                    {/* NavDots are managed by the parent via state, but we provide local select logic */}
                    <div className="mt-8 flex items-center justify-center gap-2" aria-label="Service navigation dots">
                        <NavDots items={items} activeIndex={activeIndex} onSelect={scrollToCard} />
                    </div>
                </div>
            </div>
        </section>
    );
}
