"use client";

import { motion } from "framer-motion";

// Content plan 2.3 item 2, laid out like the Leadership band: a small blue
// uppercase label, then the story left-aligned in title case. The label is the
// section's h2 so the page outline still has a heading here. A founding year
// and founder detail go here only once Ascendus provides them.
export default function OurStory() {
    return (
        <section id="our-story" className="scroll-mt-16 w-full px-6 sm:px-[64px] py-10 sm:py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex max-w-[1100px] flex-col gap-4"
            >
                <h2 className="text-[14px] font-semibold uppercase tracking-[0.7px] leading-4 text-[#0061af]">
                    Our Story
                </h2>

                <div className="flex flex-col gap-6 text-base sm:text-lg font-normal capitalize leading-[1.5] text-[#0e2b4b]">
                    <p>
                        Enterprise programmes rarely fail on strategy. They stall in the gaps between the team that designed
                        the system, the team that built it and the team left to run it. Ascendus was established to connect
                        enterprise technology with the realities of the business.
                    </p>
                    <p>
                        We start with the operating model, the current systems, the critical processes and the compliance
                        requirements. Then we shape a practical solution and stay with it after delivery.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
