"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
    service,
    index,
    mobile = false,
    isActive = false,
    onClick,
}: {
    service: any;
    index: number;
    mobile?: boolean;
    isActive?: boolean;
    onClick?: () => void;
}) {
    return (
        <motion.div
            data-service-card="true"
            data-mobile-service-card={mobile ? "true" : undefined}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onClick?.();
                }
            }}
            className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-8 sm:p-10 backdrop-blur-xl shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 select-none ${mobile
                ? "w-full min-h-96 sm:min-h-112.5"
                : "min-w-87.5 md:min-w-112.5 min-h-112.5"
                } ${isActive ? "border-accent/80 bg-background" : "border-white/20 bg-background hover:border-accent/80 hover:scale-105"}`}
        >
            <div className="absolute inset-0 bg-linear-to-br from-white/14 via-white/5 to-transparent opacity-0 transition-opacity duration-500 rounded-2xl pointer-events-none group-hover:opacity-100" />

            <div>
                <div className="flex justify-between items-start mb-8 sm:mb-12">
                    <span className="text-xs font-mono text-white/55 group-hover:text-white/80 transition-colors">
                        {service.id} / {service.tag}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/25 bg-white/6 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                        <ArrowUpRight className="text-white group-hover:text-black transition-colors" size={18} />
                    </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 sm:mb-6 transition-transform duration-300 group-hover:translate-x-1">
                    {service.title}
                </h3>

                <p className="text-white/72 text-base leading-relaxed max-w-[90%]">
                    {service.description}
                </p>
            </div>

            {service.videoUrl && (
                <div className="relative mt-6 w-full rounded-2xl p-2 bg-black/20 border border-white/10">
                    <div className="relative pt-[56.25%] overflow-hidden rounded-lg bg-black">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={service.videoUrl}
                            title={`${service.title} video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            <div className="relative overflow-hidden mt-6">
                <div className="h-px w-full bg-white/20 mb-6" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">Target Outcome</span>
                    <span className="text-xl font-medium text-white/90 group-hover:text-white transition-colors">{service.metric}</span>
                </div>

                <motion.div
                    className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/14 rounded-full blur-2xl pointer-events-none"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}
