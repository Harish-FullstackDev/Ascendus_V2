"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import bgImage from "@/assets/Services/GrowWithSap/who-for-bg.webp";

const AUDIENCES = [
    "Midsize Companies",
    "Fast-Growing Businesses",
    "Companies Leaving Legacy ERP",
    "New Subsidiaries & Entities",
    "Businesses Entering New Markets",
    "Teams Adopting Best Practices",
];

export default function GrowWhoItsFor() {
    return (
        <section className="relative w-full overflow-hidden px-8 py-10 sm:px-[64px] sm:py-16 flex flex-col items-center gap-10 sm:gap-14">
            <Image src={bgImage} alt="" fill className="object-cover pointer-events-none" />
            <div className="absolute inset-0 bg-black/70 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center gap-4 text-center"
            >
                <h2 className="text-white text-2xl sm:text-[28px] font-semibold">Who GROW with SAP is For</h2>
                <p className="text-white text-base sm:text-lg font-light">
                    Businesses of all sizes that want to scale on a standard cloud ERP
                </p>
            </motion.div>

            <div className="relative z-10 w-full max-w-[1152px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 sm:gap-y-10">
                {AUDIENCES.map((audience, index) => (
                    <motion.div
                        key={audience}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: (index % 3) * 0.08 }}
                        className={`group relative border-b border-white/50 pb-4 flex items-center justify-center ${index === AUDIENCES.length - 1 ? "max-sm:border-b-0" : ""}`}
                    >
                        <h3 className="font-houschka-pro text-[#f5f6f6] text-xl sm:text-2xl font-medium text-center transition-[color,transform] duration-[1100ms] group-hover:duration-[1400ms] ease-[cubic-bezier(0.37,0,0.63,1)] will-change-transform [backface-visibility:hidden] group-hover:text-white group-hover:-translate-y-1.5 motion-reduce:group-hover:translate-y-0">{audience}</h3>
                        {/* Hover: the title floats up slowly (sine ease, 1.4s in, 1.1s settling back on
                            mouse out); a brand-blue line draws left to right over the resting underline. */}
                        <span
                            aria-hidden="true"
                            className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#2D8EC5] origin-left scale-x-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
