"use client";

import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="bg-background py-24 text-white">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-14">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Left Side: Content */}
          <div className="flex max-w-[550px] flex-col gap-8">
            <p className="text-lg leading-relaxed lg:text-xl font-light opacity-90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              scelerisque justo urna, vitae sagittis enim feugiat id. Cras dapibus
              erat in orci aliquam, placerat consectetur elit viverra. Nunc
              vulputate magna sit amet nisl tincidunt, pretium molestie erat
              aliquet. Suspendisse consectetur tempus urna, vitae laoreet dui.
            </p>
            
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-colors"
              >
                Get In Touch
              </motion.button>
            </div>
          </div>

          {/* Right Side: Image with Mockup Feel */}
          <div className="relative w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[1.1] overflow-hidden rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-slate-100 p-8 pt-12"
            >
               {/* Simplified mock UI for tablet */}
               <div className="h-full w-full bg-white rounded-2xl shadow-xl flex flex-col p-8 gap-10">
                  <div className="flex gap-16">
                    <div className="flex-1 space-y-4">
                      <div className="flex gap-2 items-center">
                        <div className="h-2 w-20 bg-slate-300 rounded-full" />
                        <div className="h-2 w-2 bg-accent rounded-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                         <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                         <div className="h-1.5 w-[90%] bg-slate-100 rounded-full" />
                         <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                         <div className="h-1.5 w-[60%] bg-slate-100 rounded-full" />
                      </div>
                      <div className="pt-6 grid grid-cols-2 gap-4">
                         <div className="h-24 w-full bg-slate-50 rounded-xl border border-slate-100 flex flex-col p-4 gap-2">
                            <div className="h-1 w-1/3 bg-slate-200 rounded-full" />
                            <div className="h-8 w-8 rounded-full border-2 border-accent" />
                         </div>
                         <div className="h-24 w-full bg-slate-50 rounded-xl border border-slate-100 flex flex-col p-4 gap-2">
                            <div className="h-1 w-1/4 bg-slate-200 rounded-full" />
                            <div className="h-8 w-8 rounded-full border-2 border-slate-200" />
                         </div>
                      </div>
                    </div>
                    <div className="w-1/3 space-y-8">
                       <div className="h-24 w-24 rounded-full border-4 border-accent flex items-center justify-center">
                          <div className="h-16 w-16 rounded-full border-4 border-slate-100" />
                       </div>
                       <div className="space-y-2">
                          <div className="h-1 w-full bg-slate-100 rounded-full" />
                          <div className="h-1 w-1/2 bg-slate-100 rounded-full" />
                       </div>
                    </div>
                  </div>
                  <div className="h-24 w-full overflow-hidden border-t border-slate-100 pt-8 flex gap-4">
                     <div className="flex-1 h-full bg-slate-50 rounded-lg" />
                     <div className="flex-1 h-full bg-slate-50 rounded-lg" />
                     <div className="flex-1 h-full bg-slate-50 rounded-lg" />
                  </div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
