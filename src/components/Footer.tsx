

import { CONTENT } from "@/config/content";

export function Footer() {
    return (
        <footer className="relative bg-[#050911] text-white pt-24 pb-8 px-10 lg:px-20">
            {/* Blend background from previous section */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050510] to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto">
                {/* CTA Section */}
                <div className="text-center mb-40">
                    <p className="text-[13px] font-medium tracking-[0.05em] text-white mb-6">
                        {CONTENT.footer.cta.text}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] mb-12 max-w-[1000px] mx-auto tracking-tight">
                        {CONTENT.footer.cta.heading}
                    </h2>
                    <button className="bg-accent text-black px-10 py-3.5 rounded-xl font-bold text-base hover:opacity-90 transition-all">
                        {CONTENT.footer.cta.button}
                    </button>
                </div>

                <div className="border-t border-white/20 mb-20 opacity-30"></div>

                {/* Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-0 lg:gap-x-20">
                    {/* Brand & Address */}
                    <div className="md:col-span-7 lg:col-span-8">
                        <h3 className="text-[40px] font-light mb-8 italic tracking-tight">{CONTENT.footer.contact.title.slice(0, -1)}<span className="text-accent">{CONTENT.footer.contact.title.slice(-1)}</span></h3>
                        <div className="mb-14">
                            <button className="bg-accent text-black px-8 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-all">
                                {CONTENT.footer.contact.button}
                            </button>
                        </div>
                        <div className="text-zinc-400 space-y-1.5 text-[15px] font-medium leading-relaxed">
                            {CONTENT.footer.contact.address.map((line, idx) => (
                                <p key={idx}>{line}</p>
                            ))}
                        </div>
                    </div>

                    {/* Inquiries */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <h4 className="text-zinc-600 text-[11px] mb-10 uppercase tracking-[0.2em] font-bold">{CONTENT.footer.contact.inquiries.label}</h4>
                        <ul className="space-y-6 text-[15px] font-bold">
                            <li><a href={`mailto:${CONTENT.footer.contact.inquiries.email}`} className="hover:text-accent transition-colors">{CONTENT.footer.contact.inquiries.email}</a></li>
                            <li><a href={`tel:${CONTENT.footer.contact.inquiries.phone}`} className="hover:text-accent transition-colors">{CONTENT.footer.contact.inquiries.phone}</a></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <h4 className="text-zinc-600 text-[11px] mb-10 uppercase tracking-[0.2em] font-bold">{CONTENT.footer.links.label}</h4>
                        <ul className="space-y-5 text-[15px] font-bold">
                            {CONTENT.footer.links.items.map((item, idx) => (
                                <li key={idx}><a href={item.href} className="hover:text-accent transition-colors">{item.label}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright & Legal */}
                <div className="mt-4 flex flex-col md:flex-row justify-between items-end md:items-center text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                    <div className="space-y-2">
                        <p>{CONTENT.footer.bottom.copyright}</p>
                        <p className="normal-case font-medium text-zinc-500">{CONTENT.footer.bottom.credit.split(/SKS Creative/)[0]}<span className="text-accent">neoworks</span>{CONTENT.footer.bottom.credit.split(/SKS Creative/)[1]}</p>
                    </div>
                    <div className="mt-6 md:mt-0 flex gap-8">
                        {CONTENT.footer.bottom.links.map((link, idx) => (
                            <a key={idx} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

