"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Content plan 3.3 item 2: four short statements.
const CHALLENGES = [
    "Technology decisions drift away from commercial priorities.",
    "Several suppliers leave gaps between systems.",
    "Scope, ownership and acceptance criteria stay unclear.",
    "Go-live arrives, and nobody owns what happens next.",
];

export default function TheChallenge() {
    return (
        <section id="why-us" className="scroll-mt-16 w-full px-8 sm:px-[64px] pt-10 pb-5 sm:pt-16 sm:pb-8">
            <SectionTitle title="Why technology programmes lose their way." highlight="lose their way." className="mb-10 sm:mb-16" />

            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {CHALLENGES.map((text, index) => (
                    <motion.li
                        key={text}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                        className="flex flex-col gap-4 border-l-2 border-[#2D8EC5] bg-[#f3f6f9] p-6 sm:p-8 rounded-ui-md"
                    >
                        <span className="text-sm font-medium tracking-wide text-[#0061AF]">{String(index + 1).padStart(2, "0")}</span>
                        <p className="text-lg sm:text-xl leading-snug text-[#2E3033]">{text}</p>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
}
