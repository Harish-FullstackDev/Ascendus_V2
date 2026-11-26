"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const STEPS = [
    {
        title: "Sales",
        desc: "Give sellers a complete view of each customer, with real-time insights that help them respond quickly to customer needs.",
    },
    {
        title: "Marketing",
        desc: "Use unified customer data and AI-driven insights to deliver targeted, personalized campaigns across every channel.",
    },
    {
        title: "Commerce",
        desc: "Offer seamless buying experiences across channels, connected to the same customer data that drives sales and service.",
    },
    {
        title: "Service",
        desc: "Automate service workflows and equip support teams with the context they need to resolve issues and build loyalty.",
    },
];

// No photos: same card row and the same single gradient as the SuccessFactors
// Methodology section (navy #0A2B3E bottom-left, under the description, to
// #00447A top-right). Every card looks the same on desktop and mobile; the open
// card is told apart only by growing.
function CardBackground() {
    return <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top_right,#0A2B3E,#00447A)]" />;
}

export default function CxCapabilities() {
    // First card opens by default; hover opens another and it stays open.
    // Autoplay cycles the cards and pauses while the pointer is over the row.
    const [activeIndex, setActiveIndex] = useState(0);

    const [isPaused, setIsPaused] = useState(false);
    const autoplayRef = useRef(null);

    useEffect(() => {
        if (isPaused) return undefined;

        autoplayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % STEPS.length);
        }, 2500);

        return () => clearInterval(autoplayRef.current);
    }, [isPaused]);

    return (
        <section className="w-full bg-white py-10 sm:p-16 px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start sm:items-center gap-2 max-w-[767px] mx-auto text-left sm:text-center mb-10 sm:mb-[50px]"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">
                    One Unified <span className="text-[#2D8EC5]">Customer Experience</span>
                </h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    SAP CX brings sales, marketing, commerce, and service together in a single solution.
                </p>
            </motion.div>

            {/* Mobile: static stacked cards, description always visible. Same card as
                About Us "What Shapes How We Deliver": 200px floor, soft shadow, copy
                centred vertically and inset 10% left and right. */}
            <div className="flex sm:hidden flex-col gap-6 w-full">
                {STEPS.map((step, index) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        className="relative w-full min-h-[200px] overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.19)] rounded-ui-md"
                    >
                        <CardBackground />
                        <div className="relative flex min-h-[inherit] flex-col justify-center gap-2 px-[10%] py-6 text-white">
                            <h3 className="text-xl font-semibold leading-7">{step.title}</h3>
                            <p className="text-base font-light leading-6 text-white/90">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Desktop: hover-to-grow row, first card open by default. Height comes
                from aspect-ratio (1:1 open, 4:3 closed; was 4:5 and 16:15) so the cards keep their
                proportions as they go fluid. */}
            <div
                className="hidden sm:flex sm:items-end gap-[clamp(12px,3.7%,42.67px)] w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div key={step.title} className="relative flex-1 aspect-square min-h-[240px]">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                onMouseEnter={() => setActiveIndex(index)}
                                onFocus={() => setActiveIndex(index)}
                                className={`absolute bottom-0 inset-x-0 overflow-hidden transition-[aspect-ratio] duration-500 ease-out rounded-ui-md ${isActive ? "aspect-square z-20" : "aspect-[4/3] z-10"
                                    }`}
                            >
                                <CardBackground />

                                <div
                                    className={`absolute inset-0 flex flex-col justify-between gap-3 transition-[padding] duration-500 ${isActive ? "p-6" : "p-4"
                                        }`}
                                >
                                    <h3 className="font-switzer text-white text-xl sm:text-2xl font-semibold">{step.title}</h3>
                                    <p
                                        className={`text-white/85 text-lg font-light overflow-hidden transition-all duration-700 ease-out ${isActive ? "max-h-64 opacity-100 delay-250" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
