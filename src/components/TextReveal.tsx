"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className = "" }) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 75%"],
    });

    const words = text.split(" ");

    return (
        <h2 ref={containerRef} className={`${className} flex flex-wrap leading-relaxed`}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word key={i} range={[start, end]} progress={scrollYProgress}>
                        {word}
                    </Word>
                );
            })}
        </h2>
    );
};

interface WordProps {
    children: React.ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
    const textOpacity = useTransform(progress, range, [0, 1]);
    const bgOpacity = useTransform(progress, range, [1, 0]);

    return (
        <span className="mx-2 lg:mx-4 lg:my-2 relative inline-flex items-center justify-center">
            <motion.span
                className="absolute inset-y-0 inset-x-[-0.2em] rounded-full bg-accent"
                style={{
                    opacity: bgOpacity,
                }}
            />
            <motion.span
                className="relative z-10 text-white capitalize"
                style={{ opacity: textOpacity, }}
            >
                {children}
            </motion.span>
        </span>
    );
};
