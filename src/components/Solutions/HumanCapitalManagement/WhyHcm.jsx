"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import officePhoto from "@/assets/Solutions/HumanCapitalManagement/AI_Intelligent_Assistants.webp";

const REASONS = [
    {
        title: "Streamlined & Digitalized HR Processes",
        desc: "SAP HCM optimizes HR processes, automates payroll, and enhances data transparency, productivity, and compliance.",
    },
    {
        title: "Comprehensive HR Capabilities",
        desc: "SAP HCM integrates personnel, time, payroll, organizational management, talent, recruitment, and more for comprehensive HR management.",
    },
    {
        title: "Strategic HR Insights & Decision-Making",
        desc: "SAP HCM delivers robust HR analytics for strategic decisions, enabling trend identification and alignment with business goals.",
    },
];

// Same side-by-side layout as the S/4HANA Private Cloud "Why Choose" section.
export default function WhyHcm() {
    return (
        <section className="relative z-10 w-full pt-0 sm:pt-16 pb-0 sm:pb-16">
            {/* Full-bleed row: photo card on the left at its design width (578px cap, not a %
                of the viewport), the panel sits beside it rather than overlapping it. */}
            <div className="flex w-full flex-col lg:flex-row">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="group relative h-[340px] w-full shrink-0 overflow-hidden sm:h-[460px] lg:h-[588px] lg:w-[44%] lg:max-w-[578px]"
                >
                    <Image
                        src={officePhoto}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/45" />

                    <div className="absolute inset-x-8 bottom-8 flex flex-col gap-2 sm:inset-x-[64px] lg:inset-x-auto lg:bottom-[24%] lg:left-[16%] lg:right-[12%]">
                        <h2 className="text-2xl sm:text-[28px] font-semibold text-white">
                            Why Choose Human Capital Management?
                        </h2>
                        <p className="text-base font-light leading-snug text-white/90 sm:text-lg">
                            One HR platform for the whole employee lifecycle.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="relative w-full lg:max-w-[800px] self-center lg:min-h-[480px] bg-white shadow-[2px_2px_46px_rgba(0,0,0,0.15)] flex flex-col justify-center gap-8 px-8 sm:px-12 py-12"
                >
                    {REASONS.map((reason, index) => (
                        <Fragment key={reason.title}>
                            {/* Subtle hairline between reasons only; the panel gap spaces it evenly. */}
                            {index > 0 && <div aria-hidden="true" className="h-px w-full bg-[#d3dae2]" />}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-switzer text-[#2E3033] text-xl sm:text-2xl font-semibold">{reason.title}</h3>
                                <p className="text-[#55595E] text-base sm:text-lg font-light">{reason.desc}</p>
                            </div>
                        </Fragment>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
