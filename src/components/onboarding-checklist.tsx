"use client";

import * as React from "react";
import { motion, Variants, Transition } from "framer-motion";
import { CheckCircle2, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

// Define the type for a single checklist item
interface ChecklistItem {
  id: number | string;
  text: string;
  helperText?: string;
  helperLink?: {
    href: string;
    text: string;
  };
}

// Define the props for the main component
export interface OnboardingChecklistProps {
  title: string;
  description: string;
  items: ChecklistItem[];
  videoThumbnailUrl: string;
  videoUrl: string;
  className?: string;
}

/**
 * A responsive and animated onboarding checklist component.
 * @param title - The main heading for the checklist.
 * @param description - A short description displayed below the title.
 * @param items - An array of checklist items to display.
 * @param videoThumbnailUrl - The URL for the video thumbnail image.
 * @param videoUrl - The URL for the video to be played in a modal.
 * @param className - Optional additional class names for the container.
 */
export const OnboardingChecklist = ({
  title,
  description,
  items,
  videoThumbnailUrl,
  videoUrl,
  className,
}: OnboardingChecklistProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      } as Transition,
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      } as Transition,
    },
  };

  const MotionCard = motion(Card);

  return (
    <MotionCard
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "w-full max-w-4xl mx-auto bg-card text-card-foreground border rounded-2xl shadow-sm p-6 sm:p-7 md:p-8 overflow-hidden",
        className
      )}
    >
      <CardContent className="p-6 sm:p-7 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7 lg:gap-8 items-center">
          {/* Left Side: Title and Checklist */}
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-[1.7rem] lg:text-2xl font-bold tracking-tight leading-tight">{title}</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {items.map((item) => (
                <motion.li key={item.id} variants={itemVariants} className="flex flex-col">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="ml-3 text-sm md:text-[0.95rem] font-medium leading-snug">{item.text}</span>
                  </div>
                  {item.helperText && item.helperLink && (
                    <div className="ml-8 mt-1 text-xs md:text-sm text-muted-foreground">
                      {item.helperText}{" "}
                      <a
                        href={item.helperLink.href}
                        className="text-primary underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                      >
                        {item.helperLink.text}
                      </a>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Side: Video Thumbnail */}
          <motion.div
            variants={itemVariants} // Re-using item variant for a nice slide-in effect
            className="relative group rounded-lg overflow-hidden cursor-pointer w-full aspect-video"
          >
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <img
                    src={videoThumbnailUrl}
                    alt="Video guide thumbnail"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-0 border-0">
                <DialogTitle className="sr-only">{title} video guide</DialogTitle>
                <div className="aspect-video">
                  <iframe
                    src={videoUrl}
                    title="Onboarding Video Guide"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </CardContent>
    </MotionCard>
  );
};