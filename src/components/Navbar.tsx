"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Pricing", href: "/#pricing" },
  // { name: "FAQ", href: "/#faq" }, --- IGNORE ---
  { name: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[min(90%,1400px)] -translate-x-1/2">
      {/* Global Navbar Glow */}
      <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative flex items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-8 py-3 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 relative">
          <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full pointer-events-none"></div>
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
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

        {/* Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[0.85rem] font-normal text-white transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <button className="rounded-full bg-white px-6 py-2.5 text-[0.85rem] font-medium text-[#01010c] transition-transform hover:scale-105 active:scale-95">
          Book a call
        </button>
      </div>
    </nav>
  );
}
