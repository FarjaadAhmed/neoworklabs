"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav className="fixed top-4 sm:top-6 left-1/2 z-40 w-[min(92%,1400px)] -translate-x-1/2">
        {/* Global Navbar Glow */}
        <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative flex items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-5 sm:px-8 py-2.5 sm:py-3 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 relative" onClick={() => setMenuOpen(false)}>
            <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full pointer-events-none" />
            <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/20 flex-shrink-0">
              <Image
                src="/neo.jpg"
                alt="Neowork Labs Logo"
                className="h-full w-full object-cover"
                width={32}
                height={32}
              />
            </div>
            <span className="text-sm font-medium tracking-tight text-white">neoworklabs</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[0.85rem] font-normal text-white transition-colors hover:text-emerald-400"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <button className="hidden md:block rounded-full bg-white px-6 py-2.5 text-[0.85rem] font-medium text-[#01010c] transition-transform hover:scale-105 active:scale-95">
            Book a call
          </button>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button className="rounded-full bg-white px-4 py-2 text-[0.8rem] font-medium text-[#01010c] transition-transform hover:scale-105 active:scale-95 whitespace-nowrap">
              Book a call
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 transition-colors hover:bg-white/20"
            >
              <span className="sr-only">{menuOpen ? "Close" : "Open"} navigation menu</span>
              {/* Animated bars */}
              <span
                className="absolute block h-[1.5px] w-4 bg-white transition-all duration-300 ease-in-out"
                style={{
                  transform: menuOpen ? "translateY(0) rotate(45deg)" : "translateY(-4px)",
                }}
              />
              <span
                className="absolute block h-[1.5px] w-4 bg-white transition-all duration-300 ease-in-out"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="absolute block h-[1.5px] w-4 bg-white transition-all duration-300 ease-in-out"
                style={{
                  transform: menuOpen ? "translateY(0) rotate(-45deg)" : "translateY(4px)",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-[min(80vw,320px)] md:hidden transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-full flex-col border-l border-white/10 bg-[#01010c]/95 backdrop-blur-2xl px-6 pt-24 pb-10">
          {/* Glow accent */}
          <div className="absolute top-1/3 -left-16 h-48 w-48 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />

          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-normal text-white/80 transition-all hover:bg-white/5 hover:text-white"
                style={{
                  transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(16px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "300ms",
                  transitionTimingFunction: "ease",
                }}
              >
                <span className="h-px w-4 bg-emerald-500/60 group-hover:w-6 transition-all duration-200" />
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-full bg-white py-3 text-sm font-medium text-[#01010c] transition-transform hover:scale-[1.02] active:scale-95"
            >
              Book a call
            </button>
          </div>
        </div>
      </div>
    </>
  );
}