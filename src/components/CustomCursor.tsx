"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Track actual mouse position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Light weight spring for better performance
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const pathname = usePathname();

    useEffect(() => {
        // Only run on desktop/fine-pointer devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let frameId: number;
        const moveCursor = (e: MouseEvent) => {
            frameId = requestAnimationFrame(() => {
                cursorX.set(e.clientX);
                cursorY.set(e.clientY);
            });
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // More performant hover check using event delegation or closer logic
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            const isInteractive =
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-pointer") ||
                window.getComputedStyle(target).cursor === "pointer";

            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);

        // Set initial visibility
        setIsVisible(true);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [cursorX, cursorY, pathname]);

    // Prevent hydration mismatch
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}} />

            {/* Outer Spring Follower */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-9999 rounded-full border border-accent hidden md:block"
                style={{
                    width: isHovering ? 32 : 20,
                    height: isHovering ? 32 : 20,
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                    willChange: "transform",
                }}
            />

            {/* Inner Dot (Instant) */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-9999 rounded-full bg-accent hidden md:block"
                style={{
                    width: 4,
                    height: 4,
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isHovering ? 0 : (isVisible ? 1 : 0),
                    willChange: "transform",
                }}
            />
        </>
    );
}
