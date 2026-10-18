"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { CheckCircle, AlertCircle, Loader2, ChevronDown, Check } from "lucide-react";

const SERVICES = [
  "Video Editing",
  "Graphic / Character Designing",
  "Web Development",
  "AI Generated Ads",
  "Something else",
];

function ServiceSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <input type="hidden" name="service" value={value} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between bg-white/3 border rounded-2xl px-6 py-5 text-base text-left transition-all focus:outline-none ${
          open
            ? "border-emerald-500/50 bg-white/5"
            : "border-white/5 hover:border-white/10 hover:bg-white/5"
        }`}
      >
        <span className={value ? "text-white" : "text-zinc-400"}>
          {value || "What can we help with?"}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-zinc-400 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-emerald-400" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-30 mt-2 w-full origin-top rounded-2xl border border-white/10 bg-[#0a0a12]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/50 animate-[revealUp_0.2s_ease-out_both]"
        >
          {SERVICES.map((s) => {
            const active = s === value;
            return (
              <button
                key={s}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setValue(s);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                  active
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {s}
                {active && <Check className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContact, null);

  return (
    <section className="relative bg-[#050911] text-white min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-16 flex items-center justify-center pointer-events-none z-0 w-full opacity-60">
        <h1
          className="text-[15vw] font-bold tracking-wide uppercase select-none font-(family-name:--font-bebas-neue)"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% -20%, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Contact
        </h1>
      </div>

      {/* Background Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-250 h-150 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Top Left Line Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none z-0 opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20H150L180 50H200" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="180" cy="50" r="2" fill="white" />
          <path d="M0 60H100L130 90H170" stroke="white" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>

      {/* Top Right Line Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none z-0 opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
          <path d="M200 20H50L20 50H0" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="20" cy="50" r="2" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-300 px-6 lg:px-14 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Side */}
          <div className="flex-1 flex flex-col justify-center opacity-0 animate-[revealUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.1s_both] motion-reduce:animate-none motion-reduce:opacity-100">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-max mb-8">
              <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <span className="text-sm font-medium text-zinc-300">Contact</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-semibold mb-6 tracking-tight">
              Get in touch
            </h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-100 leading-relaxed">
              Have questions or ready to transform your business with AI automation?
            </p>

            <div className="flex flex-col gap-4 w-full max-w-112.5">
              <a
                href="mailto:info@neoworklabs.com"
                className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 bg-white/5 group-hover:text-emerald-400 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email us</h3>
                    <span className="text-sm text-zinc-400">info@neoworklabs.com</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </a>

              <a
                href="https://wa.me/61481332146"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 bg-white/5 group-hover:text-emerald-400 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                    <span className="text-sm text-zinc-400">(+61) 481 332 146</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </a>

              <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/3">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 bg-white/5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Our location</h3>
                    <p className="text-sm text-zinc-400">Canberra, Australia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 w-full max-w-137.5 opacity-0 animate-[revealUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.25s_both] motion-reduce:animate-none motion-reduce:opacity-100">
            {"success" in (state ?? {}) ? (
              <div className="bg-[#0a0a12]/80 backdrop-blur-xl border border-white/10 rounded-4xl p-10 lg:p-14 flex flex-col items-center gap-6 text-center shadow-2xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold">Message sent!</h3>
                <p className="text-zinc-400 leading-relaxed max-w-xs">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                action={formAction}
                className="bg-[#0a0a12]/80 backdrop-blur-xl border border-white/10 rounded-4xl p-6 lg:p-10 flex flex-col gap-8 shadow-2xl relative"
              >
                {"error" in (state ?? {}) && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {"error" in (state ?? {}) ? (state as { error: string }).error : ""}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    aria-label="Name"
                    placeholder="Name"
                    className="w-full bg-white/3 border border-white/5 rounded-2xl px-6 py-5 text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    aria-label="Email"
                    placeholder="Email"
                    className="w-full bg-white/3 border border-white/5 rounded-2xl px-6 py-5 text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all"
                  />
                  <ServiceSelect />
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                    aria-label="Message"
                    rows={6}
                    className="w-full bg-white/3 border border-white/5 rounded-2xl px-6 py-5 text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-white text-black font-bold rounded-2xl py-6 text-lg hover:bg-zinc-100 active:scale-[0.98] transition-all shadow-xl shadow-white/5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
