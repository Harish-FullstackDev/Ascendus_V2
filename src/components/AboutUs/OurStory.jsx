"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Content plan 2.3 item 2. A founding year and founder detail go here only once
// Ascendus provides them.
export default function OurStory() {
    return (
        <section id="our-story" className="scroll-mt-16 w-full px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle title="Built around the challenges businesses need to solve." highlight="businesses need to solve." />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="mt-8 sm:mt-10 max-w-3xl mx-auto flex flex-col gap-4 text-center text-base sm:text-lg font-light leading-relaxed text-[#55595E]"
            >
                <p>
                    Enterprise programmes rarely fail on strategy. They stall in the gaps between the team that designed the
                    system, the team that built it and the team left to run it. Ascendus was established to connect
                    enterprise technology with the realities of the business.
                </p>
                <p>
                    We start with the operating model, the current systems, the critical processes and the compliance
                    requirements. Then we shape a practical solution and stay with it after delivery.
                </p>
            </motion.div>
        </section>
    );
}
