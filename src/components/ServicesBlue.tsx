"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT } from "@/config/content";

import { ArrowUpRight } from "lucide-react";
import NavDots from "./NavDots";
import ServiceCard from "./ServiceCard";

/**
 * A clean, minimal services section with micro-interactions.
 * - lg+: scroll-jacked horizontal carousel
 * - <lg: simple vertical stack (no scroll hijacking)
 */
export function ServicesBlue() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current || window.innerWidth < 1024) return;
      const rect = targetRef.current.getBoundingClientRect();
      const scrollRange = targetRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      let progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      const newTranslate = progress * maxTranslate;
      setTranslateX(newTranslate);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxTranslate]);

  // Drag-to-scroll refs
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTranslateRef = useRef(0);
  const skipSyncRef = useRef(false);

  useEffect(() => {
    const updateTranslate = () => {
      const track = trackRef.current;
      if (!track) return;

      const overflow = track.scrollWidth - track.clientWidth;
      if (overflow <= 0) {
        setMaxTranslate(0);
        return;
      }

      setMaxTranslate(-overflow);
    };

    updateTranslate();
    window.addEventListener("resize", updateTranslate);
    return () => window.removeEventListener("resize", updateTranslate);
  }, []);

  // Pointer drag handlers — translate horizontal drag into vertical scroll progress
  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    // Ignore pointer down when user interacts with controls (buttons/links/iframes)
    const tgt = e.target as HTMLElement | null;
    if (tgt) {
      const interactive = tgt.closest("button, a, input, textarea, iframe, [role=button]");
      if (interactive) return;
    }
    const el = e.currentTarget;
    try {
      el.setPointerCapture(e.pointerId);
    } catch { }
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    try {
      dragStartTranslateRef.current = translateX;
    } catch {
      dragStartTranslateRef.current = 0;
    }
    document.body.style.cursor = "grabbing";
  };

  const onTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const startTranslate = dragStartTranslateRef.current;

    const track = trackRef.current;
    const section = targetRef.current;
    if (!track || !section) return;

    const overflow = Math.max(track.scrollWidth - track.clientWidth, 1);
    const maxT = maxTranslate || -overflow;

    let targetTranslate = startTranslate + dx;
    if (targetTranslate > 0) targetTranslate = 0;
    if (targetTranslate < maxT) targetTranslate = maxT;

    // progress is ratio of translate between 0 and maxTranslate (both negative or zero)
    const progress = targetTranslate / (maxT || 1);
    const scrollRange = section.offsetHeight - window.innerHeight;
    const targetTop = section.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({ top: targetTop + scrollRange * progress, behavior: "auto" });
  };

  const finishDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (e) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch { }
    }
    isDraggingRef.current = false;
    document.body.style.cursor = "";
    // On drag end, snap active index to nearest card
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-service-card='true']"));
    if (!cards.length) return;

    // determine current translate value
    let currentX = translateX;

    const visibleLeft = -currentX; // how much the track has shifted left
    const visibleCenter = visibleLeft + (track.clientWidth || 0) / 2;
    // find nearest card by distance from track center
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
  };

  // Keep activeIndex synced while the translation changes
  useEffect(() => {
    if (skipSyncRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-service-card='true']"));
    if (!cards.length) return;

    // Use absolute current value but ensure we handle 0 correctly
    const currentTranslate = translateX;
    const trackWidth = track.clientWidth || 0;
    
    // The center of the viewport relative to the track's start
    const visibleCenter = -currentTranslate + trackWidth / 2;
    
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
    
    // Only update if it actually changed to avoid jitter
    setActiveIndex(prev => prev !== nearestIndex ? nearestIndex : prev);
  }, [translateX]);

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    // prevent the spring subscription from immediately overriding the selected index
    skipSyncRef.current = true;

    if (window.innerWidth < 1024) {
      const mobileCards = Array.from(document.querySelectorAll<HTMLElement>("[data-mobile-service-card='true']"));
      const targetMobileCard = mobileCards[index];
      if (targetMobileCard) {
        targetMobileCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      return;
    }

    const section = targetRef.current;
    const track = trackRef.current;
    if (!section) {
      return;
    }
    if (!track) {
      return;
    }

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-service-card='true']"));
    const targetCard = cards[index];
    if (!targetCard) {
      return;
    }

    const scrollRange = section.offsetHeight - window.innerHeight;
    const overflow = Math.max(track.scrollWidth - track.clientWidth, 1);
    
    // Calculate progress as how far the card is into the overflowable range
    let progress = targetCard.offsetLeft / overflow;
    // Clamp progress between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    const targetTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetTop + scrollRange * progress,
      behavior: "smooth",
    });

    // re-enable sync after animation finishes (approx)
    setTimeout(() => {
      skipSyncRef.current = false;
    }, 650);
  };

  return (
    <>
      {/* ─── MOBILE / TABLET  (<lg) ─── plain vertical layout ─── */}
      <section className="block lg:hidden bg-transparent px-5 sm:px-8 py-20 text-slate-900">
        {/* Header */}
        <div
          className="mb-10 animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-forwards"
        >
          <span className="mb-3 block text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500">
            {CONTENT.services.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05] font-poppins">
            {CONTENT.services.heading}
            <span className="text-accent italic"> {CONTENT.services.subheading}</span>
          </h2>
        </div>

        {/* Cards — vertical stack */}
        <div className="flex flex-col gap-6">
          {CONTENT.services.items.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              mobile
              isActive={activeIndex === index}
              onClick={() => scrollToCard(index)}
            />
          ))}

          {/* CTA card */}
          <div className="flex flex-col justify-center rounded-2xl p-8 group cursor-pointer border border-white/20 bg-background backdrop-blur-xl shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] hover:bg-accent hover:border-accent/80 transition-colors">
            <p className="text-white/65 text-sm mb-4 uppercase tracking-widest">Next Step</p>
            <h3 className="text-2xl text-white group-hover:translate-x-2 transition-transform duration-300">
              Start your project
            </h3>
            <ArrowUpRight
              className="text-white/40 mt-4 group-hover:text-white group-hover:rotate-45 transition-all duration-300"
              size={32}
            />
          </div>
{/* 
          <div className="mt-2 flex items-center justify-center gap-2" aria-label="Service navigation dots">
            {CONTENT.services.items.map((service, index) => (
              <button
                key={service.id}
                type="button"
                aria-label={`Go to service ${index + 1}`}
                aria-pressed={activeIndex === index}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-6 bg-accent" : "w-2 bg-slate-300 hover:bg-slate-500"}`}
              />
            ))}
          </div> */}
        </div>
      </section>

      {/* ─── DESKTOP (lg+) ─── scroll-jacked horizontal carousel ─── */}
      <section
        ref={targetRef}
        className="hidden lg:block relative h-[300vh] bg-white text-slate-900"
      >
        <div
          className="sticky top-0 flex h-screen items-center overflow-hidden"
          onPointerDown={onTrackPointerDown}
          onPointerMove={onTrackPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          {/* Background Subtle Gradient */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(2,6,23,0.06)_0%,transparent_100%)]" />

          {/*
            --section-offset drives BOTH the header indent and the
            initial x-position of the card strip so they share the same
            left edge on every viewport.
          */}
          <div className="flex w-full flex-col px-5 sm:px-8 lg:px-24">
            {/* Section Header */}
            <div className="mb-12">
              <div
                className="animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-forwards"
              >
                <span className="mb-3 block text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500">
                  {CONTENT.services.label}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] font-poppins">
                  {CONTENT.services.heading}
                  <span className="text-accent italic"> {CONTENT.services.subheading}</span>
                </h2>
              </div>
            </div>

            {/* Horizontal Scroll Area */}
            <div
              ref={trackRef}
              style={{
                transform: `translateX(${translateX}px)`,
              }}
              onPointerDown={onTrackPointerDown}
              onPointerMove={onTrackPointerMove}
              onPointerUp={finishDrag}
              onPointerCancel={finishDrag}
              className="flex gap-8 xl:gap-12 cursor-grab transition-transform duration-200 ease-out"
            >
              {CONTENT.services.items.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isActive={activeIndex === index}
                  onClick={() => scrollToCard(index)}
                />
              ))}

              {/* End of list spacer/CTA */}
              <div className="flex flex-col justify-center min-w-90 h-120 rounded-2xl p-10 group cursor-pointer border border-white/20 bg-background backdrop-blur-xl shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] hover:bg-accent hover:border-accent/80 transition-colors">
                <p className="text-white/65 text-sm mb-4 uppercase tracking-widest">Next Step</p>
                <h3 className="text-2xl text-white group-hover:translate-x-2 transition-transform duration-300">
                  Start your project
                </h3>
                <ArrowUpRight
                  className="text-white/40 mt-4 group-hover:text-white group-hover:rotate-45 transition-all duration-300"
                  size={32}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2" aria-label="Service navigation dots">
              <NavDots
                items={CONTENT.services.items}
                activeIndex={activeIndex}
                onSelect={(i: number) => scrollToCard(i)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



