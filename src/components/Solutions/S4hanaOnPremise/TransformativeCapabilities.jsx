"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import capabilitiesImage from "@/assets/Solutions/S4hanaOnPremise/capabilities.webp";

const CAPABILITIES = [
    {
        title: "Real-Time Insights",
        desc: "Immediate access to data and analytics, powered by in-memory computing, so you can respond to change in real time.",
    },
    {
        title: "End-to-End Visibility",
        desc: "Complete visibility across finance, supply chain, sales, and service, for more efficient and connected operations.",
    },
    {
        title: "Advanced Automation",
        desc: "Machine learning and RPA automate routine tasks, freeing your team to focus on strategic work.",
    },
    {
        title: "Flexibility and Scalability",
        desc: "Adapt to changing needs, whether scaling operations, adding new technologies, or responding to market shifts.",
    },
    {
        title: "Security & Compliance",
        desc: "Encryption, access controls, and regular audits protect sensitive data and keep you compliant with regulations.",
    },
];

export default function TransformativeCapabilities() {
    return (
        // Vertical breathing room lives on the outer section, outside the grey block,
        // so the grey block runs edge to edge.
        <section className="w-full py-10 sm:py-[32px]">
            <div className="w-full bg-[#f3f6f9] flex flex-col items-center gap-10 sm:gap-16 px-8 sm:px-[64px] py-10 sm:py-[64px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-start sm:items-center gap-2 max-w-[1074px] text-left sm:text-center self-start sm:self-auto"
                >
                    <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Transformative <span className="text-[#2D8EC5]">Capabilities</span></h2>
                    <p className="text-[#55595E] text-base sm:text-lg font-light">
                        What SAP S/4HANA On-Premises brings to finance, supply chain, sales, and service operations.
                    </p>
                </motion.div>

                {/* Both columns split 50/50 with lg:flex-1. The image keeps its portrait ratio and
                    the list is spread across the row height with justify-between, so the copy can
                    grow without a fixed height. */}
                <div className="w-full flex flex-col lg:flex-row lg:items-stretch gap-10 lg:gap-[47px]">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full lg:flex-1"
                    >
                        {/* Portrait on desktop (Figma 546/806); a landscape crop when stacked so
                            the image doesn't push the list a full screen down on phones. */}
                        <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]">
                            <Image src={capabilitiesImage} alt="Analyst reviewing financial charts on a desktop monitor" fill className="object-cover" />
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-8 sm:gap-10 lg:gap-8 lg:justify-between w-full lg:flex-1">
                        {CAPABILITIES.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.06 }}
                                className="group flex flex-col gap-4 w-full"
                            >
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-houschka-pro text-[#2E3033] text-xl font-semibold">{item.title}</h3>
                                    <p className="text-[#55595E] text-base sm:text-lg font-light">{item.desc}</p>
                                </div>
                                <div className="relative w-[139px] h-[2px]">
                                    {/* Base line */}
                                    <div className="absolute left-0 top-1/2 w-full h-px -translate-y-1/2 bg-[#3d3d4e]/40" />

                                    {/* Hover line */}
                                    <div className="absolute left-0 top-1/2 w-full h-[2px] -translate-y-1/2 origin-left bg-[#2D8EC5] scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
