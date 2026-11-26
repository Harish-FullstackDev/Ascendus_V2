"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// No photos: every phase card shares one gradient from the site's blue ramp,
// navy #0A2B3E at the bottom-left (under the description) to #00447A at the
// top-right, so all four cards look the same on desktop and mobile. SAP CX's
// One Unified Customer Experience uses the same card.
const CARD_GRADIENT = "bg-[linear-gradient(to_top_right,#0A2B3E,#00447A)]";

const STEPS = [
    {
        title: "Plan & Design",
        desc: "We map your HR processes, policies, and data, then design the SuccessFactors solution around SAP best practices.",
    },
    {
        title: "Configure & Integrate",
        desc: "We configure each module and connect it to payroll, SAP S/4HANA, and the other systems your HR team relies on.",
    },
    {
        title: "Test & Train",
        desc: "We test end-to-end scenarios with your team and prepare instructional material so users are ready on day one.",
    },
    {
        title: "Go Live & Optimize",
        desc: "We support the launch, then adopt SAP's regular releases and refine the solution as your workforce evolves.",
    },
];

// Card face: the shared gradient only. (Arc motif dropped: curves clashed with
// the site's sharp-cornered look.)
function PhaseBackground() {
    return <div aria-hidden="true" className={`absolute inset-0 ${CARD_GRADIENT}`} />;
}

export default function SuccessFactorsMethodology() {
    // Hover-to-grow card row: the first card is open by default, hovering opens another
    // and the last hovered card stays open. Autoplay cycles the open card while the
    // pointer is outside the row and resumes from where the user left off.
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
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">SAP SuccessFactors <span className="text-[#2D8EC5]">Methodology</span></h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    Four phases that take your HR processes from design to a live, continuously improving system.
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
                        className="relative w-full min-h-[200px] overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.19)]"
                    >
                        <PhaseBackground />
                        <div className="relative flex min-h-[inherit] flex-col justify-center gap-2 px-[10%] py-6 text-white">
                            <h3 className="text-xl font-semibold leading-7">{step.title}</h3>
                            <p className="text-base font-light leading-6 text-white/90">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Desktop: hover-to-grow row, same mechanics as SAP CX's One Unified Customer
                Experience. The gap is a % of the row capped at the design value, and card
                height comes only from aspect-ratio (1:1 open, 4:3 closed), which animates.
                No min-height on the open card: min-height can't transition, so it made the
                card snap open and drop shut on narrower screens. */}
            <div
                className="hidden sm:flex sm:items-end gap-[clamp(12px,3.7%,42.67px)] w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div key={step.title} className="relative flex-1 aspect-square min-h-[260px]">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                onMouseEnter={() => setActiveIndex(index)}
                                onFocus={() => setActiveIndex(index)}
                                className={`absolute bottom-0 inset-x-0 overflow-hidden transition-[aspect-ratio] duration-500 ease-out ${isActive ? "aspect-square z-20" : "aspect-[4/3] z-10"
                                    }`}
                            >
                                <PhaseBackground />

                                <div
                                    className={`absolute inset-0 flex flex-col justify-between gap-3 transition-[padding] duration-500 ${isActive ? "p-6" : "p-4"
                                        }`}
                                >
                                    <h3 className="font-switzer text-white text-xl sm:text-2xl font-semibold">{step.title}</h3>
                                    <p
                                        className={`text-white/85 text-base lg:text-lg font-light overflow-hidden transition-all duration-700 ease-out ${isActive ? "max-h-64 opacity-100 delay-250" : "max-h-0 opacity-0"
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
