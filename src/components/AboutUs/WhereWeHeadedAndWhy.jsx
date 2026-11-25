"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Vision and mission, side by side (content plan 2.3 item 4). The supporting
// line under Mission is carried over from the previous page.
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
        <section id="vision-mission" className="scroll-mt-16 w-full pt-10 sm:pt-16">
            <SectionTitle title="Where we're headed, and why." highlight="and why." className="mb-10 sm:mb-16 px-8 sm:px-[64px]" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 px-8 pb-8 sm:px-[64px] sm:pb-8">
                {STATEMENTS.map((statement, index) => (
                    <motion.div
                        key={statement.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                        className="flex flex-col items-center text-center"
                    >
                        <h3 className="text-xl sm:text-[28px] font-semibold text-[#2E3033]">{statement.title}</h3>
                        <span aria-hidden className="mt-3 block h-1 w-12 bg-[#2d8ec5]" />
                        <p className="mt-6 max-w-xl text-lg sm:text-xl text-[#2E3033] leading-relaxed">{statement.description}</p>
                        {statement.support && (
                            <p className="mt-4 max-w-xl text-base sm:text-lg font-light text-[#55595E] leading-relaxed">{statement.support}</p>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
