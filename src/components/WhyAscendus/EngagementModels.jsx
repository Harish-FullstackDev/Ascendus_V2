"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Content plan 3.3 item 5. Each model still needs Ascendus to confirm it is a
// real offering; no rates, team sizes or service levels are published.
const MODELS = [
    { model: "Project-based delivery", bestFor: "A defined outcome with clear scope", how: "Fixed milestones and acceptance criteria" },
    { model: "Time and materials", bestFor: "Scope that will evolve", how: "Agreed team and rate card, regular reviews" },
    { model: "Application management", bestFor: "Ongoing support after go-live", how: "Agreed service scope, prioritisation and reporting" },
    { model: "Dedicated specialist team", bestFor: "Added capacity or specialist skills", how: "A team aligned to your roadmap" },
    { model: "Advisory assignment", bestFor: "A decision or roadmap before delivery", how: "A scoped engagement with a defined output" },
];

export default function EngagementModels() {
    return (
        <section id="engagement-models" className="scroll-mt-16 w-full px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle
                title="A delivery model that fits the work."
                highlight="fits the work."
                subtitle="We discuss scope, skills, governance and commercial needs before recommending a model."
                className="mb-10 sm:mb-16"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* md and up: a table. */}
                <table className="hidden md:table w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b-2 border-[#2E3033]">
                            <th scope="col" className="w-[30%] py-4 pr-6 text-base font-semibold text-[#2E3033]">Model</th>
                            <th scope="col" className="w-[33%] py-4 pr-6 text-base font-semibold text-[#2E3033]">Best for</th>
                            <th scope="col" className="py-4 text-base font-semibold text-[#2E3033]">How it works</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MODELS.map((row) => (
                            <tr key={row.model} className="border-b border-[#2E3033]/15">
                                <th scope="row" className="py-5 pr-6 text-lg font-semibold text-[#2E3033]">{row.model}</th>
                                <td className="py-5 pr-6 text-base sm:text-lg font-light text-[#55595E]">{row.bestFor}</td>
                                <td className="py-5 text-base sm:text-lg font-light text-[#55595E]">{row.how}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Phones: one card per model. */}
                <ul className="md:hidden flex flex-col gap-4">
                    {MODELS.map((row) => (
                        <li key={row.model} className="border-l-2 border-[#2D8EC5] bg-[#f3f6f9] p-6">
                            <h3 className="text-lg font-semibold text-[#2E3033]">{row.model}</h3>
                            <p className="mt-3 text-sm font-medium uppercase tracking-wide text-[#0061AF]">Best for</p>
                            <p className="mt-1 text-base font-light text-[#55595E]">{row.bestFor}</p>
                            <p className="mt-3 text-sm font-medium uppercase tracking-wide text-[#0061AF]">How it works</p>
                            <p className="mt-1 text-base font-light text-[#55595E]">{row.how}</p>
                        </li>
                    ))}
                </ul>

                <p className="mt-6 text-sm sm:text-base italic font-light text-[#55595E]">
                    Subject to capability and availability. Final models are agreed contractually.
                </p>
            </motion.div>
        </section>
    );
}
