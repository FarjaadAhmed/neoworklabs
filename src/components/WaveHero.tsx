"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Waves } from "@/components/ui/wave-background";
import { CONTENT } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
    label: string;
    value: string;
    suffix?: string;
};

const stats: Stat[] = CONTENT.hero.stats.map(s => ({
    label: s.label.replace(" ", "\n"),
    value: s.value.replace(/[^0-9]/g, ""),
    suffix: s.value.replace(/[0-9]/g, "")
}));

type AnimatedCounterProps = {
    value: string;
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
            val: parseInt(value),
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

export function WaveHero() {
    const containerRef = useRef<HTMLElement>(null);
    const titleWords = CONTENT.hero.title.replace(".", "").split(" ");
    const firstWord = titleWords[0];
    const restWords = titleWords.slice(1).join(" ");

    useGSAP(() => {
        const reveal = [".hero-title", ".hero-subtitle", ".hero-cta", ".hero-divider", ".hero-stat", ".hero-scroll-cue"];

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(reveal, { opacity: 1, y: 0 });
            gsap.set(".hero-divider", { width: 144 });
        } else {
            // No opacity fade: the title is the LCP element and must paint before JS loads.
            gsap.fromTo(".hero-title",
                { y: 15 },
                { y: 0, duration: 2.2, ease: "power3.out" }
            );

            gsap.fromTo(".hero-subtitle",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
            );

            gsap.fromTo(".hero-cta",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.35, ease: "power2.out" }
            );

            gsap.fromTo(".hero-divider",
                { opacity: 0, width: 0 },
                { opacity: 1, width: 144, duration: 0.8, delay: 0.3, ease: "power2.out" }
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

            gsap.fromTo(".hero-scroll-cue",
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 1.4, ease: "power2.out" }
            );
        }

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            pin: true,
            pinSpacing: false,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#071325]">
            {/* Wave Background */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                <Waves
                    backgroundColor="#071325"
                    strokeColor="rgba(255, 255, 255, 0.15)"
                    pointerSize={0.5}
                />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 mx-auto flex w-full max-w-[1650px] flex-col px-6 md:px-12 lg:px-36 mt-28 md:mt-36">

                <div className="grid flex-1 grid-cols-1 items-start gap-12 lg:grid-cols-2 mt-4">
                    <div className="pt-8 md:pt-20 lg:pt-12">
                        <h1
                            className="hero-title text-[4rem] leading-[1] sm:text-6xl tracking-tight text-white lg:text-[72px] lg:leading-none font-bold font-poppins"
                        >
                            {firstWord}
                            <br />
                            {restWords}<span className="text-accent">.</span>
                        </h1>

                        <div className="mt-24 space-y-8 md:mt-44 lg:mt-60 md:space-y-10">
                            <p
                                className="hero-subtitle max-w-md text-lg md:text-[1.3rem] font-normal text-white/90 opacity-0"
                            >
                                {CONTENT.hero.subtitle}
                            </p>

                            <div className="hero-cta flex flex-wrap items-center gap-4 opacity-0">
                                <Link
                                    href="/contact-us"
                                    className="group inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-[#071325] shadow-[0_8px_30px_rgba(97,194,70,0.35)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(97,194,70,0.55)] hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Book a call
                                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                                <Link
                                    href="/#services"
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Explore services
                                </Link>
                            </div>

                            <div
                                className="hero-divider h-px w-0 bg-white/20 opacity-0"
                            />

                            <div
                                className="grid grid-cols-2 gap-8 sm:flex sm:flex-wrap sm:gap-12 lg:gap-10 max-w-2xl"
                            >
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
                </div>
            </div>

            {/* Scroll cue */}
            <div className="hero-scroll-cue pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-0 md:flex">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Scroll</span>
                <span className="relative h-10 w-px overflow-hidden bg-white/15">
                    <span className="absolute inset-x-0 top-0 h-4 animate-[heroScrollCue_2s_ease-in-out_infinite] bg-accent" />
                </span>
            </div>
        </section>
    );
}
