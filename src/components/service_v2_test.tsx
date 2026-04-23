"use client";

import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useRef, useState } from "react";
import { CONTENT } from "@/config/content";
import { OnboardingChecklist } from "@/components/onboarding-checklist";

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

export function ServicesV2() {
    const containerRef = useRef<HTMLElement>(null);
    const [scrollPos, setScrollPos] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const timeoutRef = useRef<any>(null);

    const handleMouseEnter = (i: number) => {
        // Calculate the progress for this card
        const startAt = i * 0.2;
        const progress = clamp((scrollPos - startAt) / 0.2, 0, 1);

        // Only allow hover if the card has reached its target position (progress is 1)
        if (progress < 1) return;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setHoveredIndex(i);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setHoveredIndex(null);
        }, 150); // Delay to prevent flickering when moving between cards
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (val) => setScrollPos(val));

    const customServices = [
        {
            id: "srv-1",
            title: "Video Editing",
            description: "Professional video editing services to make your content stand out. We handle everything from raw footage to final polished video, maximizing engagement and watch time.",
            items: [
                { id: "v1", text: "Storyboarding & Pacing" },
                { id: "v2", text: "Color Grading & Audio Mixing" },
                { id: "v3", text: "Motion Graphics & VFX" },
                { id: "v4", text: "Platform-Specific Formatting" }
            ],
            videoThumbnailUrl: "https://images.unsplash.com/photo-1574717024453-354056aadc54?auto=format&fit=crop&q=80&w=1200",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            id: "srv-2",
            title: "Graphic / Character Designing",
            description: "Creative graphic and character design to bring your ideas to life. Whether it's branding, illustrations, or unique character concepts, our artists deliver stunning visual assets.",
            items: [
                { id: "g1", text: "Brand Identity & Logos" },
                { id: "g2", text: "2D/3D Character Design" },
                { id: "g3", text: "Marketing Collateral & UI Assets" },
                { id: "g4", text: "Custom Illustrations" }
            ],
            videoThumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
            videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY"
        },
        {
            id: "srv-3",
            title: "Web Development",
            description: "Robust and scalable web development solutions. From high-converting landing pages to complex web applications, we build fast, responsive, and user-friendly digital experiences.",
            items: [
                { id: "w1", text: "Custom UI/UX Design" },
                { id: "w2", text: "Full-Stack Development" },
                { id: "w3", text: "SEO & Performance Optimization" },
                { id: "w4", text: "E-Commerce Solutions" }
            ],
            videoThumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
            videoUrl: "https://www.youtube.com/embed/bXKIroK1g3c"
        },
        {
            id: "srv-4",
            title: "AI Generated Ads",
            description: "Cutting-edge AI generated advertisements that capture attention and drive conversions. We leverage the latest AI models to produce highly engaging, personalized marketing content at scale.",
            items: [
                { id: "a1", text: "AI Scripting & Copywriting" },
                { id: "a2", text: "AI Voiceovers & Digital Avatars" },
                { id: "a3", text: "A/B Testing Variations generated instantly" },
                { id: "a4", text: "Rapid Content Generation" }
            ],
            videoThumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
            videoUrl: "https://www.youtube.com/embed/G1IbRujko-A"
        }
    ];

    const getCardProps = (index: number) => {
        const isHovered = hoveredIndex === index;
        if (isHovered) {
            return {
                x: "0vw",
                y: "0vh",
                scale: 0.95,
                opacity: 1,
                zIndex: 50,
            };
        }

        const startAt = index * 0.2;
        const t = clamp((scrollPos - startAt) / 0.2, 0, 1);

        let opacity = lerp(0.5, 1, t);
        if (hoveredIndex !== null && !isHovered) {
            opacity *= 0.3;
        }

        const targetX = index % 2 === 0 ? -25 : 25;
        const targetY = index < 2 ? -22 : 25;
        const initialY = 35 + index * 4;

        return {
            x: lerp(0, targetX, t) + "vw",
            y: lerp(initialY, targetY, t) + "vh",
            scale: lerp(0.65, 0.7, t), // Increased from 0.5 to 0.6
            opacity,
            zIndex: 10 - index + Math.floor(t * 20),
        };
    };

    return (
        <section
            ref={containerRef}
            id="services"
            className="relative isolate text-white bg-transparent h-[400vh]"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                <motion.div
                    className="absolute top-[15vh] z-0 text-center pointer-events-none"
                    animate={{ opacity: scrollPos > 0.05 || hoveredIndex !== null ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">{CONTENT.services.label}</p>
                    <h2 className="text-5xl font-semibold tracking-tight md:text-6xl">
                        {CONTENT.services.heading}
                        <span className="text-accent"> {CONTENT.services.subheading}</span>
                    </h2>
                </motion.div>

                {/* Center Text Reveal (Visible when all cards are in position) */}
                <motion.div
                    className="absolute z-0 text-center pointer-events-none px-4"
                    animate={{
                        opacity: scrollPos > 0.8 && hoveredIndex === null ? 1 : 0,
                        scale: scrollPos > 0.8 && hoveredIndex === null ? 1 : 0.8,
                        y: scrollPos > 0.8 && hoveredIndex === null ? 0 : 20
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-4">
                        What We Do
                    </h3>
                    <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                        We blend technical precision with creative vision to build
                        digital products that define the next generation of the web.
                    </p>
                </motion.div>

                {customServices.map((service, i) => {
                    const isHovered = hoveredIndex === i;
                    return (
                        <motion.div
                            key={service.id}
                            className={`absolute w-full max-w-4xl ${isHovered ? 'z-50' : ''}`}
                            animate={getCardProps(i)}
                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {isHovered && (
                                <div className="absolute inset-[-100px] z-[-1] pointer-events-auto" />
                            )}
                            <div className={isHovered ? "cursor-auto pointer-events-auto" : "cursor-pointer pointer-events-auto"}>
                                <OnboardingChecklist
                                    title={service.title}
                                    description={service.description}
                                    items={service.items}
                                    videoThumbnailUrl={service.videoThumbnailUrl}
                                    videoUrl={service.videoUrl}
                                    className={`bg-black/50 border text-white/90 backdrop-blur-2xl shadow-2xl transition-all duration-300 ${isHovered ? "border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.1)]" : "border-white/10"
                                        }`}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
