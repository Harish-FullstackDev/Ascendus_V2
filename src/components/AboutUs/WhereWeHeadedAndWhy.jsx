"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Vision and mission on the dark band, two columns (content plan 2.3 item 4).
// The supporting line under Mission is carried over from the previous page.
const STATEMENTS = [
    {
        title: "Vision",
        description: "To help organisations build stronger, more connected and future-ready businesses.",
    },
    {
        title: "Mission",
        description: "To translate business challenges into practical enterprise technology solutions.",
        support: "We measure our work by whether systems keep running as designed, long after the project team has moved on.",
    },
];

export default function WhereWeHeadedAndWhy() {
    return (
        <section id="vision-mission" className="scroll-mt-16 w-full bg-[#004174] px-8 sm:px-[64px] py-12 sm:py-20">
            <SectionTitle dark title="Where we're headed, and why." highlight="and why." className="mb-10 sm:mb-16" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 md:divide-x md:divide-white/20">
                {STATEMENTS.map((statement, index) => (
                    <motion.div
                        key={statement.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                        className="flex flex-col items-center text-center md:px-12"
                    >
                        <h3 className="text-xl sm:text-[28px] font-semibold text-white">{statement.title}</h3>
                        <span aria-hidden className="mt-3 block h-1 w-12 bg-[#00ACEC]" />
                        <p className="mt-6 max-w-xl text-lg sm:text-xl text-white leading-relaxed">{statement.description}</p>
                        {statement.support && (
                            <p className="mt-4 max-w-xl text-base sm:text-lg font-light text-white/85 leading-relaxed">{statement.support}</p>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
