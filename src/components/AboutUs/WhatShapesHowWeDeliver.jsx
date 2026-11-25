"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Four principles (content plan 2.3 item 5). Headings now match their text, and
// the text is dark grey on a light card and always visible, so it passes
// contrast (the old navy cards hid the text until hover). Still to be
// confirmed with delivery leadership.
const PRINCIPLES = [
    {
        title: "Minimal core customisation",
        description: "We keep custom code out of the SAP core, so upgrades stay safe.",
    },
    {
        title: "Upgrade-safe extensions",
        description: "We build extensions on SAP Business Technology Platform.",
    },
    {
        title: "Standard integration",
        description: "We use standard APIs and integration suites, not direct system changes.",
    },
    {
        title: "Cloud-native practice",
        description: "We apply cloud-native methods so systems scale and keep improving.",
    },
];

export default function WhatShapesHowWeDeliver() {
    return (
        <section id="how-we-build" className="scroll-mt-16 w-full px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle title="What shapes how we deliver." highlight="how we deliver." className="mb-10 sm:mb-16" />

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRINCIPLES.map((item, index) => (
                    <motion.li
                        key={item.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                        className="flex flex-col gap-3 border-t-2 border-[#0061AF] bg-[#f3f6f9] p-6 sm:p-8"
                    >
                        <span className="text-sm font-medium tracking-wide text-[#0061AF]">{String(index + 1).padStart(2, "0")}</span>
                        <h3 className="text-xl font-semibold leading-snug text-[#2E3033]">{item.title}</h3>
                        <p className="text-base sm:text-lg font-light leading-relaxed text-[#2E3033]">{item.description}</p>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
}
