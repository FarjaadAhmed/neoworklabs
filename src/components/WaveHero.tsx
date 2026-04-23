"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
        gsap.fromTo(".hero-title",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 2.2, ease: "power3.out" }
        );

        gsap.fromTo(".hero-subtitle",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
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

                <main className="grid flex-1 grid-cols-1 items-start gap-12 lg:grid-cols-2 mt-4">
                    <div className="pt-8 md:pt-20 lg:pt-12">
                        <h1
                            className="hero-title text-[4rem] leading-[1] sm:text-6xl tracking-tight text-white lg:text-[72px] lg:leading-none font-bold font-poppins opacity-0"
                        >
                            {firstWord}
                            <br />
                            {restWords}<span className="text-accent">.</span>
                        </h1>

                        <div className="mt-24 space-y-8 md:mt-52 lg:mt-72 md:space-y-10">
                            <p
                                className="hero-subtitle max-w-md text-lg md:text-[1.3rem] font-normal text-white/90 opacity-0"
                            >
                                {CONTENT.hero.subtitle}
                            </p>

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
                </main>
            </div>
        </section>
    );
}
