"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneTabDots, { phoneSwipeProps } from "@/components/CommonComponents/PhoneTabPager";
import { LuGraduationCap, LuIdCard, LuTarget, LuUserPlus } from "react-icons/lu";

// Same panel as Microsoft Migration's key benefits: a quiet navy field
// (#0A2B3E to #003756) with the active item's Lucide icon (same set as the rest
// of the site) drawn large in a thin, faint line as a watermark in the bottom
// right corner (the copy sits top left), laid out like SAP Migration's
// "How a Migration Runs" (panel runs to the right edge on desktop),
// cross-fading and drifting in on each change, and a 3px brand-blue timeline
// along the foot that fills over the autoplay interval (hidden while paused).
const INTERVAL = 5000;

const TABS = [
    {
        icon: LuIdCard,
        label: "Employee Central",
        desc: "A single core HR record for every employee, covering organisation structure, job data, time off, and self-service across countries.",
    },
    {
        icon: LuUserPlus,
        label: "Recruiting & Onboarding",
        desc: "Job requisitions, candidate pipelines, and guided onboarding that help new hires become productive from their first day.",
    },
    {
        icon: LuTarget,
        label: "Performance & Goals",
        desc: "Goal setting, continuous feedback, and review cycles that connect individual performance to business objectives.",
    },
    {
        icon: LuGraduationCap,
        label: "Learning & Development",
        desc: "Course catalogues, compliance training, and development plans that build the skills your workforce needs next.",
    },
];

export default function SuccessFactorsModules() {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // A timeout per tab rather than one interval, so a tab picked by hand
    // (dot, swipe or click) always gets the full interval before moving on.
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
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start sm:items-center gap-2 w-full sm:w-auto max-w-[1074px] text-left sm:text-center"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">From Hire to <span className="text-[#2D8EC5]">Retire</span></h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    The SAP SuccessFactors capabilities we implement, configure, and integrate.
                </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8 lg:gap-[100px] w-full lg:pl-[64px]">
                {/* Tabs spread down the panel height at lg, as in How a Migration Runs.
                    Hidden on phones: the white pagination inside the panel replaces them. */}
                <div className="hidden sm:flex flex-col w-full lg:w-96 lg:h-[420px] justify-between gap-2 lg:gap-0 shrink-0">
                    {TABS.map((tab, index) => (
                        <button
                            key={tab.label}
                            type="button"
                            onMouseEnter={() => {
                                setActive(index);
                                setIsPaused(true);
                            }}
                            onMouseLeave={() => {
                                setIsPaused(false);
                            }}
                            onClick={() => setActive(index)}
                            className={`text-left border-l-[3px] flex items-center min-h-12 px-3.5 transition-colors ${index === active
                                ? "border-[#2d8ec5] text-black"
                                : "border-[#6c6c6c] text-[#6c6c6c] opacity-70"
                                }`}
                        >
                            <h3 className="font-switzer text-base sm:text-2xl font-semibold">{tab.label}</h3>
                        </button>
                    ))}
                </div>

                {/* Navy panel */}
                <div className="w-full lg:flex-1 min-w-0">
                {/* 798:446 banner from sm up. On phones the large watermark icon is
                    hidden and a small copy sits beside the title instead, and the panel
                    grows to fit its copy (see the sizer below) with white pagination under
                    the description; a horizontal swipe also changes the tab. */}
                <motion.div
                    {...phoneSwipeProps(go)}
                    className="relative w-full sm:aspect-[798/446] overflow-hidden rounded-ui-lg"
                >
                    {/* Phone sizer: every tab's copy stacked invisibly in one grid cell,
                        plus room for the pagination, so the panel is as tall as the
                        longest tab and never jumps or overlaps when the tab changes. */}
                    <div aria-hidden="true" className="sm:hidden invisible grid p-5 pb-[72px]">
                        {TABS.map((tab) => (
                            <div key={tab.label} className="[grid-area:1/1] flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-semibold">{tab.label}</span>
                                    <span className="size-7 shrink-0" />
                                </div>
                                <p className="text-sm font-light leading-[1.5]">{tab.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#0A2B3E,#003756_60%,#00447A)]">
                        {/* Faint deep-blue rise behind the copy, for depth. */}
                        {/* Depth, as in What SAP SuccessFactors Offers: a deep-blue rise from the foot,
                            brand-blue light from the bottom-right corner behind the icon, and one
                            faint light sweep each time the tab changes. */}
                        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,95,133,0.4),rgba(28,95,133,0)_60%)]" />
                        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(315deg,rgba(45,142,197,0.3),rgba(45,142,197,0)_45%)]" />
                        <motion.div
                            key={`sweep-${active}`}
                            aria-hidden="true"
                            initial={{ x: "-120%" }}
                            animate={{ x: "320%" }}
                            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.07),transparent)]"
                        />

                        {/* Watermark icon, cross-fading per tab. */}
                        <AnimatePresence>
                            <motion.div
                                key={active}
                                aria-hidden="true"
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute hidden sm:block sm:bottom-[8%] sm:right-[5%] sm:h-[30%] lg:bottom-[10%] lg:right-[6%] lg:h-[50%] aspect-square text-white/[0.22]"
                            >
                                <activeTab.icon strokeWidth={0.8} className="size-full" />
                            </motion.div>
                        </AnimatePresence>

                            <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
                                className="absolute flex left-5 right-5 top-5 sm:left-10 sm:right-10 sm:top-10 lg:left-[55px] lg:right-auto lg:top-[46px] lg:max-w-[462px] text-white flex-col gap-3"
                            >
                                <div className="flex items-center gap-2">
                                    <h3 className="font-switzer text-lg sm:text-xl font-semibold">{activeTab.label}</h3>
                                    <activeTab.icon aria-hidden="true" strokeWidth={1} className="sm:hidden size-7 shrink-0 text-white/60" />
                                </div>
                                <p className="text-white/90 text-sm sm:text-lg font-light leading-[1.5] sm:leading-relaxed">
                                    {activeTab.desc}
                                </p>
                            </motion.div>
                            </AnimatePresence>

                        {/* Phone pagination (replaces the tab list below sm). */}
                        <PhoneTabDots labels={TABS.map((t) => t.label)} active={active} onSelect={setActive} />

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
                        </div>
                </motion.div>
                </div>
            </div>
        </section>
    );
}
