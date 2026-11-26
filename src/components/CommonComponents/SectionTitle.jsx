"use client";

import { motion } from "framer-motion";

// Centred section heading used across the About and Why Ascendus pages: an h2
// with one key phrase in the accent blue, and an optional light subtitle.
// `highlight` must appear verbatim inside `title`. `dark` switches the colours
// for use on a navy band. `capitalize` sets every word in title case, matching
// the About page headings.
export default function SectionTitle({ title, highlight, subtitle, dark = false, capitalize = false, className = "" }) {
    const at = highlight ? title.indexOf(highlight) : -1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`text-center max-w-3xl mx-auto ${className}`}
        >
            <h2 className={`text-2xl sm:text-[28px] font-medium ${capitalize ? "capitalize" : ""} ${dark ? "text-white" : "text-[#2E3033]"}`}>
                {at === -1 ? (
                    title
                ) : (
                    <>
                        {title.slice(0, at)}
                        <span className={dark ? "text-[#00ACEC]" : "text-[#2D8EC5]"}>{highlight}</span>
                        {title.slice(at + highlight.length)}
                    </>
                )}
            </h2>
            {subtitle && <p className={`mt-2 text-base sm:text-lg font-normal ${dark ? "text-white/85" : "text-[#55595E]"}`}>{subtitle}</p>}
        </motion.div>
    );
}
