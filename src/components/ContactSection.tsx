"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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
                    <h4 className="font-semibold text-white">Email us</h4>
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Call us</h4>
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
                    <h4 className="font-semibold text-white">Our location</h4>
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
