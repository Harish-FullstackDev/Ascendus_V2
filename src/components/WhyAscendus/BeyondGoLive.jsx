"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, RotateCcw } from "lucide-react";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Content plan 3.3 item 7. Keeps the playbook's "aims to support" wording and
// promises no outcomes or response times. The loop graphic runs Assess to
// Support, then a return line back to Assess.
const LOOP = ["Assess", "Implement", "Integrate", "Optimise", "Support"];

export default function BeyondGoLive() {
    return (
        <section id="beyond-go-live" className="scroll-mt-16 w-full px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle
                title="A technology relationship built to stay in the room after go-live."
                highlight="stay in the room after go-live."
            />

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="mt-8 sm:mt-10 max-w-3xl mx-auto text-center text-base sm:text-lg font-light leading-relaxed text-[#55595E]"
            >
                Enterprise systems change as the business changes. One-off projects leave fragmented ownership and a backlog
                nobody owns. Ascendus aims to support clients through assessment, implementation, integration, optimisation
                and support, with one accountable team.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="mt-10 sm:mt-16 flex justify-center"
            >
                {/* md and up: one row with arrows between steps and a return line
                    underneath from Support back to Assess. */}
                <div className="hidden md:block w-full max-w-5xl">
                    <ol className="flex items-center justify-between gap-3">
                        {LOOP.map((step, index) => (
                            <Fragment key={step}>
                                <li className="flex-1 bg-[#004174] px-4 py-4 text-center text-lg font-medium text-white rounded-ui-sm">{step}</li>
                                {index < LOOP.length - 1 && <ArrowRight className="size-5 shrink-0 text-[#2D8EC5]" aria-hidden="true" />}
                            </Fragment>
                        ))}
                    </ol>
                    <div aria-hidden="true" className="relative mx-[10%] h-8 border-x border-b border-[#2D8EC5] rounded-ui-sm">
                        <span className="absolute -left-[5px] -top-1 size-0 border-x-[5px] border-b-[7px] border-x-transparent border-b-[#2D8EC5]" />
                    </div>
                    <p className="mt-3 flex items-center justify-center gap-2 text-sm text-[#55595E]">
                        <RotateCcw className="size-4" aria-hidden="true" /> A continuing cycle, with one accountable team
                    </p>
                </div>

                {/* Phones: a vertical list, then the loop note. */}
                <div className="md:hidden w-full">
                    <ol className="flex flex-col items-stretch gap-2">
                        {LOOP.map((step, index) => (
                            <Fragment key={step}>
                                <li className="bg-[#004174] px-4 py-3 text-center text-lg font-medium text-white rounded-ui-sm">{step}</li>
                                {index < LOOP.length - 1 && <ArrowDown className="size-5 self-center text-[#2D8EC5]" aria-hidden="true" />}
                            </Fragment>
                        ))}
                    </ol>
                    <p className="mt-4 flex items-center justify-center gap-2 text-sm text-[#55595E]">
                        <RotateCcw className="size-4" aria-hidden="true" /> Then back to Assess
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
