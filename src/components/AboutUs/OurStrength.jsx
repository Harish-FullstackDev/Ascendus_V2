"use client";

import { motion } from "framer-motion";
import AnimatedStat from "@/components/CommonComponents/AnimatedStat";

// Ascendus at a glance (content plan 2.3 item 9). Values and wording match the
// home page ProofInNumbers, so the two pages never disagree. Same row as the
// home page "Numbers Worth Having a Conversation About": equal columns with
// hairline dividers and count-up numbers; a 2-column grid on small screens with
// the odd third stat centred underneath.
const STRENGTHS = [
    { value: "5+", lines: ["Years of", "Experience"] },
    { value: "400+", lines: ["Team of", "SAP Specialists"] },
    { value: "12+", lines: ["Industries", "Served"] },
];

export default function OurStrength() {
    return (
        <section id="at-a-glance" className="scroll-mt-16 w-full px-8 sm:px-[64px] py-10 sm:py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
            >
                <h2 className="text-2xl sm:text-[28px] font-semibold text-[#2E3033]">
                    Ascendus <span className="text-[#2D8EC5]">at a glance</span>
                </h2>
            </motion.div>

            <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 xl:flex xl:flex-row xl:flex-nowrap xl:items-center xl:gap-10">
                {STRENGTHS.map((item, index) => {
                    const spans = index === STRENGTHS.length - 1 && STRENGTHS.length % 2 === 1;
                    return (
                        <div key={item.value} className="contents">
                            {index > 0 && <div className="hidden w-px self-stretch bg-[#8794a3] xl:block" aria-hidden="true" />}
                            <div className={`flex min-w-0 justify-center xl:flex-1 ${spans ? "col-span-2" : ""}`}>
                                <div className={`flex flex-col gap-2 items-center text-center ${spans ? "w-[calc((100%-24px)/2)] xl:w-auto" : ""}`}>
                                    <AnimatedStat value={item.value} />
                                    <p className="text-[#4a5568] text-lg font-light">
                                        {item.lines[0]}
                                        <br />
                                        {item.lines[1]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
