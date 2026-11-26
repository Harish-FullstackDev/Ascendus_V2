"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneTabDots, { phoneSwipeProps } from "@/components/CommonComponents/PhoneTabPager";
import { LuBot, LuMessagesSquare, LuScanEye, LuTextSearch, LuThumbsUp, LuTrendingUp } from "react-icons/lu";

// No photos. Navy panel (#0A2B3E to #003756) with a soft deep-blue rise, and two
// motions the user liked elsewhere, combined here:
// - the active service's Lucide icon (same set as the rest of the site) sits in
//   the panel's bottom-right corner in a fine line and redraws itself stroke by
//   stroke on every tab change (pen-sketch, as on Microsoft Rollout / GCP);
// - the copy sits top left, and the layout follows SAP Migration's "How a
//   Migration Runs" (panel running to the right edge on desktop);
// - a 3px brand-blue timeline along the foot fills over the autoplay interval
//   (as on Microsoft Migration's benefits), hidden while a tab is hovered.
const INTERVAL = 5000;
const DRAW_KEYFRAMES = "@keyframes aiml-draw { to { stroke-dashoffset: 0; } }";

const TABS = [
    {
        title: "Natural Language Processing (NLP)",
        desc: "Empower your business with advanced text analysis, sentiment detection, machine translation, and automated speech recognition to unlock deeper insights from customer communications, documents, and more.",
        // One-line summary shown inside the panel on phones, where the full
        // description is too long for the 798:446 banner.
        short: "Text analysis, sentiment detection, translation, and speech recognition for deeper customer insight.",
        icon: LuTextSearch,
    },
    {
        title: "Computer Vision",
        desc: "Leverage cutting-edge image classification, object detection, facial recognition, and optical character recognition (OCR) to transform visual data into actionable insights across industries like retail, security, healthcare, and more.",
        // One-line summary shown inside the panel on phones, where the full
        // description is too long for the 798:446 banner.
        short: "Image classification, object detection, and OCR that turn visual data into actionable insight.",
        icon: LuScanEye,
    },
    {
        title: "Predictive Analytics",
        desc: "Utilize historical data to forecast future trends, customer behavior, sales performance, and risk management, enabling proactive decision-making and more effective business strategies.",
        // One-line summary shown inside the panel on phones, where the full
        // description is too long for the 798:446 banner.
        short: "Forecast trends, customer behavior, sales, and risk from historical data to act ahead.",
        icon: LuTrendingUp,
    },
    {
        title: "Recommendation Systems",
        desc: "Deliver personalized experiences through intelligent recommendation engines for content, products, or services, based on user preferences, behaviors, and browsing patterns, improving customer satisfaction and engagement.",
        // One-line summary shown inside the panel on phones, where the full
        // description is too long for the 798:446 banner.
        short: "Personalized product, content, and service recommendations based on user behavior.",
        icon: LuThumbsUp,
    },
    {
        title: "Robotic Process Automation (RPA)",
        desc: "Automate repetitive tasks, from data entry to document processing and customer inquiries, using intelligent bots that increase operational efficiency and reduce human error.",
        // One-line summary shown inside the panel on phones, where the full
        // description is too long for the 798:446 banner.
        short: "Intelligent bots that automate data entry, documents, and inquiries with fewer errors.",
        icon: LuBot,
    },
    {
        title: "Chatbots & Virtual Assistants",
        desc: "Provide seamless, automated customer support and personal task management, delivering instant responses and streamlining workflows for enhanced user satisfaction and reduced operational costs.",
        // One-line summary shown inside the panel on phones, where the full
        // description is too long for the 798:446 banner.
        short: "Instant, automated customer support and task handling that cuts operational costs.",
        icon: LuMessagesSquare,
    },
];

export default function AiMlServices() {
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
        <section className="w-full py-10 sm:py-16 px-8 sm:px-[64px] lg:px-0 flex flex-col items-center gap-8 sm:gap-[45px]">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center gap-2 max-w-[1074px] text-center"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">
                    Top AI &amp; ML-Driven Services <span className="text-[#2D8EC5]">Boosting Efficiency</span> at Ascendus
                </h2>

                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    The capability areas that turn text, images, data, and conversations into business outcomes.
                </p>
            </motion.div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-[100px] w-full lg:pl-[64px]">
                {/* Tabs spread down the panel height at lg, as in How a Migration Runs.
                    Hidden on phones: the dots inside the panel replace them. */}
                <div className="hidden sm:flex flex-col justify-between w-full lg:w-96 lg:h-[520px] gap-2 lg:gap-0 shrink-0">
                    {TABS.map((tab, index) => (
                        <button
                            key={tab.title}
                            type="button"
                            onMouseEnter={() => {
                                setActive(index);
                                setIsPaused(true);
                            }}
                            onMouseLeave={() => {
                                setIsPaused(false);
                            }}
                            onClick={() => setActive(index)}
                            className={`text-left border-l-[3px] flex items-center min-h-12 py-2 px-3.5 transition-colors ${index === active
                                ? "border-[#2d8ec5] text-black"
                                : "border-[#6c6c6c] text-[#6c6c6c] opacity-70"
                                }`}
                        >
                            <h3 className="font-switzer text-base sm:text-xl xl:text-2xl font-semibold">
                                {tab.title}
                            </h3>
                        </button>
                    ))}
                </div>

                {/* Navy panel; below xl the description sits under the panel instead of
                    over it, because these descriptions are too long for a phone-sized overlay. */}
                <div className="flex flex-col gap-5 w-full lg:flex-1 lg:min-w-0">
                    {/* lg:h-[420px] matches the tab column exactly; an aspect ratio would let the
                        panel drift taller or shorter than the list as the width changes. */}
                    {/* Phones: the panel fits its copy (sizer) plus the dots, and a swipe changes the tab. */}
                    <motion.div {...phoneSwipeProps(go)} className="relative w-full sm:aspect-[798/446] lg:aspect-auto lg:h-[520px] overflow-hidden bg-[linear-gradient(to_bottom_right,#0A2B3E,#003756_60%,#00447A)] rounded-ui-lg lg:rounded-r-none">
                    {/* Phone sizer: every tab's copy stacked invisibly in one grid cell,
                        plus room for the dots, so the panel is as tall as the longest tab
                        and never jumps or overlaps when the tab changes. */}
                    <div aria-hidden="true" className="sm:hidden invisible grid px-5 pt-4 pb-[72px]">
                        {TABS.map((tab) => (
                            <div key={tab.title} className="[grid-area:1/1] flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-semibold">{tab.title}</span>
                                    <span className="size-7 shrink-0" />
                                </div>
                                <p className="text-sm font-light leading-[1.5]">{tab.short}</p>
                            </div>
                        ))}
                    </div>
                        <style>{DRAW_KEYFRAMES}</style>
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

                        {/* Self-drawing icon, bottom right (keyed so it redraws per tab). */}
                        <activeTab.icon
                            key={active}
                            aria-hidden="true"
                            strokeWidth={0.6}
                            className="absolute hidden sm:block bottom-[8%] right-[5%] h-[55%] w-auto text-white/35 [&_*]:[stroke-dasharray:100] [&_*]:[stroke-dashoffset:100] [&_*]:animate-[aiml-draw_2s_cubic-bezier(0.65,0,0.35,1)_forwards]"
                        />

                        {/* Text (desktop overlay), top left. */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
                                className="hidden xl:flex absolute left-[55px] top-[46px] w-[58%] max-w-[462px] text-white flex-col gap-3"
                            >
                                <h3 className="font-switzer text-xl font-semibold">{activeTab.title}</h3>
                                <p className="text-white/90 text-lg font-light leading-relaxed">{activeTab.desc}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Phones: copy inside the panel. The large icon is hidden, a small
                            one sits beside the title, and the short summary replaces the long
                            description so nothing overlaps or overflows the banner. */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
                                className="sm:hidden absolute left-5 right-5 top-4 text-white flex flex-col gap-3"
                            >
                                <div className="flex items-center gap-2">
                                    <h3 className="font-switzer text-lg font-semibold">{activeTab.title}</h3>
                                    <activeTab.icon aria-hidden="true" strokeWidth={1} className="size-7 shrink-0 text-white/60" />
                                </div>
                                <p className="text-white/90 text-sm font-light leading-[1.5]">{activeTab.short}</p>
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

                    {/* Text (tablet / small desktop) */}
                    <div className="hidden sm:flex xl:hidden flex-col gap-2">
                        <h3 className="font-switzer text-[#2E3033] text-xl font-semibold">{activeTab.title}</h3>
                        <p className="text-[#55595E] text-base sm:text-lg font-light">{activeTab.desc}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
