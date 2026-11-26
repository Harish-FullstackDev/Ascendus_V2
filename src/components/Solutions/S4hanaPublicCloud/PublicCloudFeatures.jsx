"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneTabDots, { phoneSwipeProps } from "@/components/CommonComponents/PhoneTabPager";
import { LuChartColumn, LuCpu, LuRocket, LuScaling, LuUsers } from "react-icons/lu";

// No photos. Laid out like SAP Migration's "How a Migration Runs": tabs on the
// left, and a navy panel (#0A2B3E to #003756, soft deep-blue rise) running to
// the right edge on desktop, with the active feature's title and description at
// the top left and its Lucide icon (same set as the rest of the site) in the
// bottom-right corner, faint and sketching itself stroke by stroke on every
// tab change. One
// faint band of light passes across on each change, and a 3px brand-blue
// timeline along the foot fills over the autoplay interval (hidden while a tab
// is hovered). Panel height follows the copy, with a floor.
const INTERVAL = 5000;
const DRAW_KEYFRAMES = "@keyframes pc-draw { to { stroke-dashoffset: 0; } }";

const TABS = [
    {
        title: "Quick Setup",
        desc: "A rapid deployment model with minimal configuration, so you go live fast and start improving productivity sooner.",
        icon: LuRocket,
    },
    {
        title: "Flexible Scaling",
        desc: "A modular, configurable system that scales with growth and shifts in demand while keeping performance steady.",
        icon: LuScaling,
    },
    {
        title: "Cutting-Edge Features",
        desc: "Predictive analytics and IoT integration help you anticipate trends, monitor operations in real time, and find new opportunities.",
        icon: LuCpu,
    },
    {
        title: "Instant Insights",
        desc: "In-memory computing gives real-time insight into operations, customers, and market trends for faster, confident decisions.",
        icon: LuChartColumn,
    },
    {
        title: "Improved Collaboration",
        desc: "Intuitive interfaces and integration across SAP applications keep teams aligned and data consistent across departments.",
        icon: LuUsers,
    },
];

export default function PublicCloudFeatures() {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // A timeout per tab, so a tab picked by hand (dot, swipe or click) always
    // gets the full interval before autoplay moves on.
    useEffect(() => {
        if (isPaused) return undefined;
        const timer = setTimeout(() => {
            setActive((prev) => (prev + 1) % TABS.length);
        }, INTERVAL);
        return () => clearTimeout(timer);
    }, [isPaused, active]);

    const activeTab = TABS[active];
    const go = (step) => setActive((prev) => (prev + step + TABS.length) % TABS.length);

    return (
        <section className="w-full border-t border-[#d3dae2] py-10 sm:py-16 px-8 sm:px-[64px] lg:px-0 flex flex-col items-center gap-8 sm:gap-[45px]">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start sm:items-center gap-2 max-w-[1074px] text-left sm:text-center self-start sm:self-auto"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">
                    Features in <span className="text-[#2D8EC5]">S/4HANA Public Cloud</span>
                </h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    The capabilities that set the public cloud edition apart.
                </p>
            </motion.div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-[100px] w-full lg:pl-[64px]">
                {/* Tabs spread down the panel height at lg (420px floor), as in How a Migration Runs.
                    Hidden on phones: the dots inside the panel replace them. */}
                <div className="hidden sm:flex flex-col w-full lg:w-96 lg:min-h-[420px] justify-between gap-2 lg:gap-0 shrink-0">
                    {TABS.map((tab, index) => (
                        <button
                            key={tab.title}
                            type="button"
                            onMouseEnter={() => {
                                setActive(index);
                                setIsPaused(true);
                            }}
                            onMouseLeave={() => setIsPaused(false)}
                            onClick={() => setActive(index)}
                            className={`text-left border-l-[3px] flex items-center min-h-12 px-3.5 transition-colors ${index === active
                                ? "border-[#2d8ec5] text-black"
                                : "border-[#6c6c6c] text-[#6c6c6c] opacity-70"
                                }`}
                        >
                            <h3 className="font-switzer text-base sm:text-2xl font-semibold">{tab.title}</h3>
                        </button>
                    ))}
                </div>

                {/* Navy panel: copy top left, self-drawing icon bottom right */}
                <div className="w-full lg:flex-1 lg:min-w-0">
                    {/* A swipe changes the tab on phones. */}
                    <motion.div {...phoneSwipeProps(go)} className="relative w-full min-h-[320px] lg:min-h-[420px] lg:h-full overflow-hidden bg-[linear-gradient(to_top_right,#0A2B3E,#003756)]">
                        <style>{DRAW_KEYFRAMES}</style>
                        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,95,133,0.4),rgba(28,95,133,0)_65%)]" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                                transition={{ duration: 0.4 }}
                                className="relative flex flex-col h-full min-h-[inherit] px-6 pt-8 pb-[72px] sm:pl-[55px] sm:pr-10 sm:pt-[46px] sm:pb-12"
                            >
                                {/* One light sweep per change */}
                                <motion.div
                                    aria-hidden="true"
                                    initial={{ x: "0%" }}
                                    animate={{ x: "300%" }}
                                    transition={{ duration: 1.6, ease: "easeOut" }}
                                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.07),transparent)]"
                                />
                                <div className="relative z-10 flex flex-col gap-3 max-w-[520px]">
                                    {/* Phones: the large corner icon is hidden (it ran into the long
                                        descriptions) and a small one sits right beside the title. */}
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-switzer text-white text-xl sm:text-2xl font-semibold">{activeTab.title}</h3>
                                        <activeTab.icon aria-hidden="true" strokeWidth={1} className="sm:hidden size-7 shrink-0 text-white/60" />
                                    </div>
                                    <p className="text-white/85 text-base sm:text-lg font-light leading-relaxed text-pretty">{activeTab.desc}</p>
                                </div>
                                <div aria-hidden="true" className="absolute hidden sm:block bottom-[8%] right-[5%] h-[55%] aspect-square">
                                    <activeTab.icon
                                        aria-hidden="true"
                                        strokeWidth={0.6}
                                        className="size-full text-white/20 [&_*]:[stroke-dasharray:100] [&_*]:[stroke-dashoffset:100] [&_*]:animate-[pc-draw_2.2s_cubic-bezier(0.65,0,0.35,1)_0.1s_forwards]"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Phone pagination (replaces the tab list below sm). */}
                        <PhoneTabDots labels={TABS.map((t) => t.title)} active={active} onSelect={setActive} />

                        {/* Autoplay timeline: restarts on each tab (keyed), hidden while paused. */}
                        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
                            {!isPaused && (
                                <motion.div
                                    key={active}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                                    className="h-full origin-left bg-[#2D8EC5]"
                                />
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
