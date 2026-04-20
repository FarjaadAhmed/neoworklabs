"use client";

import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="relative bg-[#050911] text-white py-32 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[12vw] font-bold text-white/2 tracking-widest uppercase select-none">
          Contact
        </h1>
      </div>

      {/* Background Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-14">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Side: Content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-max mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span className="text-sm font-medium text-zinc-300">Contact</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-semibold mb-4 tracking-tight">
              Get in touch
            </h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-[400px]">
              Have questions or ready to transform your business with AI automation?
            </p>

            {/* Contact Info Cards */}
            <div className="flex flex-col gap-4">
              {/* Email Card */}
              <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 bg-white/5 group-hover:text-accent transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email us</h4>
                    <p className="text-sm text-zinc-400">johnnykyorov@gmail.com</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 bg-white/5 group-hover:text-accent transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Call us</h4>
                    <p className="text-sm text-zinc-400">(501) 123-4567</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 bg-white/5 group-hover:text-accent transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Our location</h4>
                    <p className="text-sm text-zinc-400">Crosby Street, NY, US</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 w-full max-w-[550px]">
            <div className="bg-[#0a0a0f] border border-white/10 rounded-[28px] p-6 lg:p-8 flex flex-col gap-6 shadow-2xl">

              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-[#13141a] border border-white/5 rounded-xl px-4 py-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent/50 focus:bg-[#1a1b23] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#13141a] border border-white/5 rounded-xl px-4 py-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent/50 focus:bg-[#1a1b23] transition-colors"
                />
                <textarea
                  placeholder="Message"
                  rows={6}
                  className="w-full bg-[#13141a] border border-white/5 rounded-xl px-4 py-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent/50 focus:bg-[#1a1b23] transition-colors resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-white text-black font-semibold rounded-xl py-4 hover:bg-zinc-200 transition-colors">
                Submit
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
