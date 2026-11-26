"use client";

import { LuChartColumn, LuPlug, LuZap } from "react-icons/lu";
import { motion } from "framer-motion";

const REASONS = [
    {
        icon: LuPlug,
        title: "Unified Integration",
        desc: "BTP integrates processes, data, and apps, enhancing operational efficiency seamlessly.",
    },
    {
        icon: LuZap,
        title: "Innovation & Agility",
        desc: "BTP enables rapid cloud app development, deployment, scalability, and market responsiveness.",
    },
    {
        icon: LuChartColumn,
        title: "Analytics & Insights",
        desc: "BTP enhances decision-making with analytics and AI, boosting efficiency and competitiveness.",
    },
];

export default function WhyBtp() {
    return (
        <section className="w-full px-8 py-10 sm:px-[64px] sm:py-[64px] flex flex-col gap-10 sm:gap-14">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col gap-2 max-w-[767px]"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">
                    Why Choose <span className="text-[#2D8EC5]">SAP Business Technology Platform?</span>
                </h2>
            </motion.div>

            {/* Three columns divided by thin rules on desktop; stacked with rules between rows below lg. */}
            <div className="grid grid-cols-1 lg:grid-cols-3 border-t max-sm:border-t-0 border-[#d3d5d8] max-sm:gap-8">
                {REASONS.map((reason, index) => (
                    <motion.div
                        key={reason.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                        className={`flex flex-col gap-3 sm:gap-4 py-8 max-sm:py-0 lg:py-10 lg:px-10 border-b max-sm:border-b-0 lg:border-b-0 border-[#d3d5d8] ${
                            index > 0 ? "lg:border-l" : "lg:pl-0"
                        } ${index === REASONS.length - 1 ? "lg:pr-0" : ""}`}
                    >
                        {/* Phones: icon on a rail line, as in "How We Deliver SAP CRM". */}
                        <div className="flex items-center gap-3">
                            <reason.icon aria-hidden="true" strokeWidth={1.5} className="size-8 sm:size-10 shrink-0 text-[#1C5F85]" />
                            <div className="sm:hidden h-px flex-1 bg-[#d3dae2]" />
                        </div>
                        <h3 className="font-switzer text-[#2E3033] text-xl sm:text-2xl font-semibold">{reason.title}</h3>
                        <p className="text-[#55595E] text-base sm:text-lg font-light">{reason.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
