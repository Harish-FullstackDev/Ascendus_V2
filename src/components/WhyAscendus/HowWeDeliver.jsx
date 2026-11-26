"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Content plan 3.3 item 4 (playbook pages 05 and 09 merged). A horizontal
// stepper from xl, a vertical one below it. "What you receive" are generic
// deliverables until Ascendus confirms its standard set.
const STAGES = [
    { name: "Understand", happens: "We define objectives, scope and stakeholders.", receive: "Agreed objectives and scope" },
    { name: "Assess", happens: "We review current systems, data and integrations.", receive: "Current-state assessment" },
    { name: "Strategise", happens: "We set the roadmap, architecture and delivery plan.", receive: "Roadmap and delivery plan" },
    { name: "Implement", happens: "We design, build, integrate and test.", receive: "Tested solution against acceptance criteria" },
    { name: "Optimise", happens: "We refine processes and performance after release.", receive: "Improvement backlog" },
    { name: "Support", happens: "We run, monitor and improve the live service.", receive: "Service reporting and reviews" },
];

export default function HowWeDeliver() {
    return (
        <section id="how-we-deliver" className="scroll-mt-16 w-full bg-[#f3f6f9] px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle title="From business challenge to business change." highlight="business change." className="mb-10 sm:mb-16" />

            <ol className="relative grid grid-cols-1 xl:grid-cols-6 gap-8 xl:gap-6">
                {/* The rail: down the left of the numbers on phones and tablets,
                    across their centres from xl. */}
                <span aria-hidden="true" className="absolute left-5 top-5 bottom-5 w-px bg-[#2E3033]/20 xl:left-5 xl:right-5 xl:top-5 xl:bottom-auto xl:h-px xl:w-auto" />

                {STAGES.map((stage, index) => (
                    <motion.li
                        key={stage.name}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                        className="relative flex gap-5 xl:flex-col xl:gap-6"
                    >
                        <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#004174] text-base font-medium text-white">
                            {index + 1}
                        </span>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-medium text-[#2E3033]">{stage.name}</h3>
                            <p className="text-base font-normal leading-relaxed text-[#55595E]">{stage.happens}</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#0061AF]">You receive</p>
                            <p className="text-base text-[#2E3033]">{stage.receive}</p>
                        </div>
                    </motion.li>
                ))}
            </ol>

            <p className="mt-10 sm:mt-16 max-w-3xl mx-auto text-center text-base sm:text-lg font-normal leading-relaxed text-[#55595E]">
                <span className="italic text-[#2E3033]">Activities are tailored to the project and agreed scope.</span> Before
                delivery starts, we agree objectives, scope, roles, dependencies, acceptance criteria and governance.
            </p>
        </section>
    );
}
