

export function Footer() {
    return (
        <footer className="relative bg-[#050911] text-white pt-24 pb-8 px-10 lg:px-20">
            {/* Blend background from previous section */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050510] to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto">
                {/* CTA Section */}
                <div className="text-center mb-40">
                    <p className="text-[13px] font-medium tracking-[0.05em] text-white mb-6">
                        Ready to leverage your data for success?
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] mb-12 max-w-[1000px] mx-auto tracking-tight">
                        Contact us for a <span className="text-accent">personalized strategy</span> that drives your business forward.
                    </h2>
                    <button className="bg-accent text-black px-10 py-3.5 rounded-xl font-bold text-base hover:opacity-90 transition-all">
                        Get In Touch
                    </button>
                </div>

                <div className="border-t border-white/20 mb-20 opacity-30"></div>

                {/* Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-0 lg:gap-x-20">
                    {/* Brand & Address */}
                    <div className="md:col-span-7 lg:col-span-8">
                        <h3 className="text-[40px] font-light mb-8 italic tracking-tight">get in touch<span className="text-accent">.</span></h3>
                        <div className="mb-14">
                            <button className="bg-accent text-black px-8 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-all">
                                Contact Us
                            </button>
                        </div>
                        <div className="text-zinc-400 space-y-1.5 text-[15px] font-medium leading-relaxed">
                            <p>17595 Harvard Avenue</p>
                            <p>Irvine, California 92614</p>
                        </div>
                    </div>

                    {/* Inquiries */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <h4 className="text-zinc-600 text-[11px] mb-10 uppercase tracking-[0.2em] font-bold">inquiries</h4>
                        <ul className="space-y-6 text-[15px] font-bold">
                            <li><a href="mailto:your.email@gmail.com" className="hover:text-accent transition-colors">your.email@gmail.com</a></li>
                            <li><a href="tel:1.555.555.5555" className="hover:text-accent transition-colors">1.555.555.5555</a></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <h4 className="text-zinc-600 text-[11px] mb-10 uppercase tracking-[0.2em] font-bold">links</h4>
                        <ul className="space-y-5 text-[15px] font-bold">
                            <li><a href="#" className="hover:text-accent transition-colors">home</a></li>
                            <li>
                                <a href="#" className="flex items-center gap-2 text-accent">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                    services
                                </a>
                            </li>
                            <li><a href="#" className="hover:text-accent transition-colors">about</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">blog</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright & Legal */}
                <div className="mt-4 flex flex-col md:flex-row justify-between items-end md:items-center text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                    <div className="space-y-2">
                        <p>© Your Company Name. All Rights Reserved.</p>
                        <p className="normal-case font-medium text-zinc-500">Website Created by <span className="text-accent">SKS Creative</span>.</p>
                    </div>
                    <div className="mt-6 md:mt-0 flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">privacy policy</a>
                        <a href="#" className="hover:text-white transition-colors">cookie policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

