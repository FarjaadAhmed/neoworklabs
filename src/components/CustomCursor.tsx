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

    // Spring config for smooth follower ring
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const pathname = usePathname();

    useEffect(() => {
        // Only run on desktop/fine-pointer devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Hover state for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // You can add more selectors like 'button', 'a', .hoverable etc.
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-pointer")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);

        // Set initial visibility
        setIsVisible(true);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
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
                className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-accent mix-blend-difference hidden md:block"
                style={{
                    width: isHovering ? 48 : 32,
                    height: isHovering ? 48 : 32,
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            {/* Inner Dot (Instant) */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-accent mix-blend-difference hidden md:block"
                style={{
                    width: 8,
                    height: 8,
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isHovering ? 0 : (isVisible ? 1 : 0),
                }}
            />
        </>
    );
}
