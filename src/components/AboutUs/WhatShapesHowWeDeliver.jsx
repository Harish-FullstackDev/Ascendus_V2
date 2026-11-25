"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NavyCardBackground from "@/components/CommonComponents/NavyCardBackground";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Headings now match their text (the old Ownership / Precision / Transparency /
// Regional Fluency titles described something else). Content plan 2.3 item 5.
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

const AUTOPLAY_INTERVAL = 3500;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhatShapesHowWeDeliver() {
    // Autoplay cycles the open card; hovering the grid pauses it and hands control
    // to the pointer, and mouse-leave resumes from the same card.
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayRef = useRef(null);

    useEffect(() => {
        if (isPaused) return undefined;
        autoplayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % PRINCIPLES.length);
        }, AUTOPLAY_INTERVAL);
        return () => clearInterval(autoplayRef.current);
    }, [isPaused]);

    return (
        <section id="how-we-build" className="scroll-mt-16 w-full px-8 sm:px-[64px] pt-10 pb-10 sm:pt-8 sm:pb-16">
            <div className="flex flex-col gap-10 sm:gap-16">
                <SectionTitle
                    title="What shapes how we deliver."
                    highlight="how we deliver."
                    subtitle="The principles carried into every engagement, not values printed on a wall and left there."
                />

                {/* Mobile: static stacked cards in the open look, description always visible. */}
                <div className="flex sm:hidden flex-col gap-6 w-full">
                    {PRINCIPLES.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="relative w-full min-h-[200px] overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.19)]"
                        >
                            <NavyCardBackground isActive />
                            <div className="relative flex min-h-[inherit] flex-col justify-center gap-2 px-[10%] py-6 text-white">
                                <h3 className="text-xl font-semibold leading-7">{item.title}</h3>
                                <p className="text-base font-light leading-6 text-white/90">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* sm and up: reveal grid driven by hover or autoplay. */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
                >
                    {PRINCIPLES.map((item, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <motion.div
                                key={item.title}
                                variants={itemVariants}
                                onMouseEnter={() => setActiveIndex(index)}
                                className="relative w-full min-h-[240px] overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.19)]"
                            >
                                <NavyCardBackground isActive={isActive} />
                                <div className="absolute inset-0 flex flex-col justify-center px-[10%] text-white">
                                    <h3 className="text-xl font-semibold leading-7">{item.title}</h3>
                                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                        <div className="overflow-hidden">
                                            <p className="text-base font-light leading-6 pt-2">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
