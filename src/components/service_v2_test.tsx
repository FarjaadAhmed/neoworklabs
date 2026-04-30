"use client";

import { useScroll, useMotionValueEvent, motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import { CONTENT } from "@/config/content";
import { OnboardingChecklist } from "@/components/onboarding-checklist";

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

// Breakpoint helpers
type ScreenSize = "sm" | "md" | "lg";

function getScreenSize(width: number): ScreenSize {
    if (width < 640) return "sm";
    if (width < 1024) return "md";
    return "lg";
}

export function ServicesV2() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [screenSize, setScreenSize] = useState<ScreenSize>("lg");
    const [viewportWidth, setViewportWidth] = useState(1440);

    useEffect(() => {
        const update = () => {
            setScreenSize(getScreenSize(window.innerWidth));
            setViewportWidth(window.innerWidth);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const isMobile = screenSize === "sm";
    const isTablet = screenSize === "md";
    const isSmallScreen = isMobile || isTablet;
    const isLargeScreen = screenSize === "lg";
    const isCompactLarge = isLargeScreen && viewportWidth < 1320;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothScrollPos = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [scrollPos, setScrollPos] = useState(0);
    useMotionValueEvent(smoothScrollPos, "change", (val) => setScrollPos(val));

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 100, damping: 30 };

    const mouseXShift = useSpring(
        useTransform(mouseX, (val) => {
            if (typeof window === "undefined") return 0;
            return (val - window.innerWidth / 2) * 0.02;
        }),
        springConfig
    );

    const mouseYShift = useSpring(
        useTransform(mouseY, (val) => {
            if (typeof window === "undefined") return 0;
            return (val - window.innerHeight / 2) * 0.02;
        }),
        springConfig
    );

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleCardClick = (i: number) => {
        if (!isLargeScreen) return;
        const startAt = i * 0.2;
        const progress = clamp((scrollYProgress.get() - startAt) / 0.2, 0, 1);
        if (progress < 1) return;
        setActiveIndex(prev => prev === i ? null : i);
    };

    const customServices = useMemo(() => [
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
    ], []);

    // Responsive card grid positions (vw / vh percentages)
    // lg: 2×2 grid, md: 2×2 tighter grid, sm: vertical single column
    const getCardTarget = (index: number): { x: number; y: number } => {
        if (isMobile) {
            // Single column, stacked with slight y offset per card
            return { x: 0, y: (index - 1.5) * 14 };
        }
        if (isTablet) {
            // 2×2 but tighter — cards fit within narrower viewport
            const col = index % 2 === 0 ? -22 : 22;
            const row = index < 2 ? -22 : 26;
            return { x: col, y: row };
        }
        // Desktop
        const col = index % 2 === 0 ? (isCompactLarge ? -24 : -28) : (isCompactLarge ? 24 : 28);
        const row = index < 2 ? (isCompactLarge ? -24 : -28) : (isCompactLarge ? 28 : 32);
        return { x: col, y: row };
    };

    const getCardInitialY = (index: number): number => {
        if (isMobile) return 55 + index * 4;
        if (isTablet) return 40 + index * 4;
        return 35 + index * 4;
    };

    const getCardScale = (t: number): number => {
        if (isMobile) return lerp(0.72, 0.78, t);
        if (isTablet) return lerp(0.7, 0.78, t);
        return lerp(0.65, 0.75, t);
    };

    const getCardProps = (index: number, ignoreActive = false) => {
        const isActive = !ignoreActive && activeIndex === index;
        if (isActive) {
            return {
                x: "0vw",
                y: "0vh",
                scale: isMobile ? 0.92 : 0.95,
                opacity: 1,
                zIndex: 50,
            };
        }

        const startAt = index * 0.2;
        const t = clamp((scrollPos - startAt) / 0.2, 0, 1);

        let opacity = lerp(0.5, 1, t);
        if (activeIndex !== null && !isActive) {
            opacity *= 0.3;
        }

        const { x: targetX, y: targetY } = getCardTarget(index);
        const initialY = getCardInitialY(index);

        return {
            x: lerp(0, targetX, t) + "vw",
            y: lerp(initialY, targetY, t) + "vh",
            scale: getCardScale(t),
            opacity,
            zIndex: 10 - index + Math.floor(t * 20),
        };
    };

    // Card width by breakpoint; compact large screens get wider cards with moderated spread.
    const cardMaxWidth = isMobile
        ? "max-w-[92vw]"
        : isTablet
            ? "max-w-[46vw]"
            : isCompactLarge
                ? "max-w-[40vw]"
                : "max-w-[36vw] 2xl:max-w-[34rem]";

    if (!isLargeScreen) {
        return (
            <section
                id="services"
                className="relative isolate text-white bg-transparent py-16 sm:py-20"
            >
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                    <div className="mb-10 text-center">
                        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/50">
                            {CONTENT.services.label}
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            {CONTENT.services.heading}
                            <span className="text-accent"> {CONTENT.services.subheading}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {customServices.map((service) => (
                            <div key={service.id} className="mx-auto w-full max-w-3xl">
                                <OnboardingChecklist
                                    title={service.title}
                                    description={service.description}
                                    items={service.items}
                                    videoThumbnailUrl={service.videoThumbnailUrl}
                                    videoUrl={service.videoUrl}
                                    className="bg-black/50 border border-white/10 text-white/90 backdrop-blur-2xl shadow-2xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={containerRef}
            id="services"
            className="relative isolate text-white bg-transparent h-[400vh]"
            onMouseMove={isLargeScreen ? handleMouseMove : undefined}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                {/* Heading — fades out as scroll begins */}
                <motion.div
                    className="absolute top-[8vh] sm:top-[10vh] md:top-[12vh] lg:top-[15vh] z-0 text-center pointer-events-none px-4"
                    animate={{ opacity: scrollPos > 0.05 || activeIndex !== null ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="mb-2 md:mb-4 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50">
                        {CONTENT.services.label}
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tight leading-tight">
                        {CONTENT.services.heading}
                        <span className="text-accent"> {CONTENT.services.subheading}</span>
                    </h2>
                </motion.div>

                {/* Center "What We Do" reveal */}
                <motion.div
                    className="absolute z-0 text-center pointer-events-none px-4 w-full"
                    animate={{
                        opacity: scrollPos > 0.8 && activeIndex === null ? 1 : 0,
                        scale: scrollPos > 0.8 && activeIndex === null ? 1 : 0.9,
                        y: scrollPos > 0.8 && activeIndex === null ? 0 : 40
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-4 md:mb-6 uppercase">
                        What We Do
                    </h3>
                    <p className="text-white/40 text-xs sm:text-sm md:text-base lg:text-xl max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed font-medium px-2">
                        We blend technical precision with creative vision to build digital products that define the next generation of the web.
                    </p>
                </motion.div>

                {activeIndex !== null && (
                    <div
                        className="absolute inset-0 z-45 pointer-events-auto"
                        onClick={() => setActiveIndex(null)}
                    />
                )}

                {/* Cards */}
                {customServices.map((service, i) => {
                    const isActive = activeIndex === i;
                    const allCardsReached = scrollPos >= 0.8;

                    return (
                        <div
                            key={service.id}
                            className="absolute inset-0 pointer-events-none flex items-center justify-center"
                        >
                            {/* Invisible stable hitbox */}
                            <motion.div
                                className={`absolute ${cardMaxWidth} w-full z-40 cursor-pointer h-[300px] sm:h-[360px] md:h-[400px] opacity-0 ${allCardsReached ? "pointer-events-auto" : "pointer-events-none"
                                    }`}
                                animate={getCardProps(i, true)}
                                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                onClick={() => handleCardClick(i)}
                            />

                            {/* Visual card */}
                            <motion.div
                                className={`absolute ${cardMaxWidth} w-full ${isActive ? "z-50 pointer-events-auto" : "pointer-events-none"
                                    }`}
                                animate={getCardProps(i)}
                                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                            >
                                <motion.div
                                    className={`relative ${isActive
                                            ? "cursor-auto pointer-events-auto"
                                            : "cursor-pointer pointer-events-auto"
                                        }`}
                                    style={{
                                        x: isActive && !isSmallScreen ? mouseXShift : 0,
                                        y: isActive && !isSmallScreen ? mouseYShift : 0,
                                    }}
                                    onClick={() => handleCardClick(i)}
                                >
                                    <OnboardingChecklist
                                        title={service.title}
                                        description={service.description}
                                        items={service.items}
                                        videoThumbnailUrl={service.videoThumbnailUrl}
                                        videoUrl={service.videoUrl}
                                        className={`bg-black/50 border text-white/90 backdrop-blur-2xl shadow-2xl transition-all duration-300 ${isActive
                                                ? "border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                                                : "border-white/10"
                                            }`}
                                    />

                                    {/* Shining border on resting fully-visible cards */}
                                    {!isActive &&
                                        clamp((scrollPos - i * 0.2) / 0.2, 0, 1) === 1 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 0.3, 0] }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: i * 0.8,
                                                }}
                                                className="absolute inset-0 rounded-[1.5rem] border-2 border-white/40 pointer-events-none blur-[1px]"
                                            />
                                        )}
                                </motion.div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}