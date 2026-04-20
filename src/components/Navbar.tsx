"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[min(90%,1400px)] -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-8 py-3 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image
              src="/neo (1).jpg"
              alt="Neowork Labs Logo"
              className="h-full w-full object-cover"
              width={32}
              height={32}
            />
          </div>
          <span className="text-sm font-medium tracking-tight text-white">neoworklabs</span>
        </div>

        {/* Links */}
        <div className="hidden items-center gap-10 md:flex">
          <a href="#" className="text-[0.85rem] font-normal text-white transition-colors hover:text-accent">Home</a>
          <a href="#" className="text-[0.85rem] font-normal text-white transition-colors hover:text-accent">Services</a>
          <a href="#" className="text-[0.85rem] font-normal text-white transition-colors hover:text-accent">Projects</a>
          <a href="#" className="text-[0.85rem] font-normal text-white transition-colors hover:text-accent">Pricing</a>
          <a href="#" className="text-[0.85rem] font-normal text-white transition-colors hover:text-accent">FAQ</a>
        </div>

        {/* CTA */}
        <button className="rounded-full bg-white px-6 py-2.5 text-[0.85rem] font-medium text-[#01010c] transition-transform hover:scale-105 active:scale-95">
          Book a call
        </button>
      </div>
    </nav>
  );
}
