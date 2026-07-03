import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONTENT } from "@/config/content";
import { Reveal } from "./Reveal";

// lucide-react (v1.x) dropped brand icons for trademark reasons, so the social
// glyphs are inline SVGs. They inherit color via currentColor.
function SocialIcon({ label, className }: { label: string; className?: string }) {
  const stroke = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (label) {
    case "Instagram":
      return (
        <svg {...stroke}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...stroke}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...stroke}>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const title = CONTENT.footer.contact.title;

  return (
    <footer className="relative overflow-hidden bg-[#050911] text-white px-6 pt-24 pb-10 sm:px-10 lg:px-20">
      {/* Blend + accent glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050510] to-transparent" />
      <div
        className="pointer-events-none absolute left-1/2 top-8 h-72 w-[900px] -translate-x-1/2 rounded-full opacity-[0.14]"
        style={{ background: "radial-gradient(ellipse, #61c246 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* CTA */}
        <Reveal className="mx-auto mb-24 max-w-3xl text-center">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-accent">
            {CONTENT.footer.cta.text}
          </p>
          <h2 className="mx-auto mb-10 max-w-[900px] text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl lg:text-[56px]">
            {CONTENT.footer.cta.heading}
          </h2>
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#071325] shadow-[0_10px_40px_rgba(97,194,70,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_50px_rgba(97,194,70,0.55)] active:translate-y-0"
          >
            {CONTENT.footer.cta.button}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        {/* Gradient divider */}
        <div className="mb-16 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Columns */}
        <Reveal
          delay={100}
          className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-10 lg:gap-x-16"
        >
          {/* Brand + address + socials */}
          <div className="md:col-span-6 lg:col-span-6">
            <h3 className="mb-6 text-4xl font-light italic tracking-tight lg:text-[40px]">
              {title.slice(0, -1)}
              <span className="text-accent">{title.slice(-1)}</span>
            </h3>
            <div className="mb-8 space-y-1.5 text-[15px] font-medium leading-relaxed text-zinc-400">
              {CONTENT.footer.contact.address.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <div className="flex gap-3">
              {CONTENT.footer.socials.items.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                >
                  <SocialIcon label={social.label} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Inquiries */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              {CONTENT.footer.contact.inquiries.label}
            </h4>
            <ul className="space-y-4 text-[15px] font-medium">
              <li>
                <a
                  href={`mailto:${CONTENT.footer.contact.inquiries.email}`}
                  className="text-zinc-300 transition-colors hover:text-accent"
                >
                  {CONTENT.footer.contact.inquiries.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTENT.footer.contact.inquiries.phone}`}
                  className="text-zinc-300 transition-colors hover:text-accent"
                >
                  {CONTENT.footer.contact.inquiries.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              {CONTENT.footer.links.label}
            </h4>
            <ul className="space-y-4 text-[15px] font-medium">
              {CONTENT.footer.links.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-zinc-300 transition-colors hover:text-accent"
                  >
                    <span className="capitalize">{item.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Oversized wordmark */}
        <div className="pointer-events-none mt-20 select-none overflow-hidden">
          <p className="whitespace-nowrap text-center text-[16vw] font-semibold leading-none tracking-tighter text-white/[0.04] lg:text-[13vw]">
            neowork labs
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600 md:flex-row md:justify-between">
          <p>{CONTENT.footer.bottom.copyright}</p>
          <p>
            Website created by{" "}
            <span className="lowercase text-accent">neoworklabs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
