"use client";

import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuChartGantt, LuGlobe, LuRadar, LuTowerControl, LuTruck, LuWarehouse } from "react-icons/lu";

const ITEMS = [
    {
        title: "Advanced Planning and Optimization (APO)",
        desc: [
            "Plan demand, supply networks, and production on real-time data, for efficient planning across every stage of the supply chain.",
        ],
        icon: LuChartGantt,
        points: ["Demand planning", "Supply network planning", "Production planning"],
    },
    {
        title: "Extended Warehouse Management (EWM)",
        desc: [
            "Run inbound and outbound processes, inventory, and yard operations with greater speed and accuracy.",
        ],
        icon: LuWarehouse,
        points: ["Inbound & outbound", "Inventory management", "Yard operations"],
    },
    {
        title: "Transportation Management (TM)",
        desc: [
            "Optimize route planning, shipment tracking, and execution to cut freight costs and improve delivery reliability.",
        ],
        icon: LuTruck,
        points: ["Route planning", "Shipment tracking", "Lower freight cost"],
    },
    {
        title: "Event Management (EM)",
        desc: [
            "Monitor shipment delays and production issues in real time, so disruptions are handled before they spread.",
        ],
        icon: LuRadar,
        points: ["Real-time event tracking", "Disruption alerts", "Timely interventions"],
    },
    {
        title: "Global Trade Services (GTS)",
        desc: [
            "Manage import and export compliance and trade risk, keeping cross-border operations aligned with global regulations.",
        ],
        icon: LuGlobe,
        points: ["Import & export compliance", "Trade risk mitigation", "Cross-border operations"],
    },
    {
        title: "Supply Chain Control Tower",
        desc: [
            "One central view of the supply chain, with key metrics, early issue alerts, and data-driven decisions.",
        ],
        icon: LuTowerControl,
        points: ["End-to-end visibility", "Key metric monitoring", "Data-driven decisions"],
    },
];

const ROTATE_INTERVAL = 4500;

// No photos, same treatment as SSM Procurement's features panel. The left panel
// is navy (#0A2B3E to #003756) with a soft deep-blue rise; the active module's
// Lucide icon (same set as the rest of the site) draws itself stroke by stroke
// on every change, with the module's key points (from its description) easing
// in below it. Along the panel's right edge a 3px brand-blue line fills top to
// bottom over the rotate interval.
const DRAW_KEYFRAMES = "@keyframes scm-draw { to { stroke-dashoffset: 0; } }";

export default function ScmModules() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        // Auto-rotate only from lg, where the list sits beside the fixed-height
        // panel. Below lg the panel is hidden and the list stacks, so each
        // rotation changed the section's height: the content below jumped and
        // the navbar's scroll show/hide fired. There the first item stays open
        // until tapped.
        if (!window.matchMedia("(min-width: 1024px)").matches) return;
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % ITEMS.length);
        }, ROTATE_INTERVAL);
        return () => clearInterval(timer);
    }, [active]);

    return (
        <section className="w-full py-10 sm:py-16 px-8 sm:px-[0px]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start sm:items-center gap-2 max-w-[780px] mx-auto text-left sm:text-center self-start sm:self-auto"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Modules of <span className="text-[#2D8EC5]">Supply Chain Management</span></h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">Modules covering planning, warehousing, transportation, event monitoring, global trade, and end-to-end visibility.</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row max-w-screen mx-auto lg:h-[580px] pt-10 lg:pt-16">
                <div className="relative hidden lg:block w-full lg:h-full lg:w-[35%] shrink-0 overflow-hidden bg-[linear-gradient(to_top_right,#0A2B3E,#003756)] rounded-ui-md">
                    <style>{DRAW_KEYFRAMES}</style>
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,95,133,0.4),rgba(28,95,133,0)_65%)]" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={ITEMS[active].title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.25 } }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-10"
                        >
                            {(() => {
                                const Icon = ITEMS[active].icon;
                                return (
                                    <Icon
                                        aria-hidden="true"
                                        strokeWidth={0.6}
                                        className="w-[34%] h-auto text-white/55 [&_*]:[stroke-dasharray:100] [&_*]:[stroke-dashoffset:100] [&_*]:animate-[scm-draw_2s_cubic-bezier(0.65,0,0.35,1)_forwards]"
                                    />
                                );
                            })()}
                            <ul className="flex flex-col gap-3">
                                {ITEMS[active].points.map((point, i) => (
                                    <motion.li
                                        key={point}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 + i * 0.2 }}
                                        className="flex items-center gap-3 text-white/80 text-base font-light"
                                    >
                                        <span className="size-1.5 shrink-0 bg-[#2D8EC5]" />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>

                    {/* Upright timeline, restarts on every change (keyed). */}
                    <div aria-hidden="true" className="absolute inset-y-0 right-0 w-[3px] bg-white/15">
                        <motion.div
                            key={active}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: ROTATE_INTERVAL / 1000, ease: "linear" }}
                            className="w-full h-full origin-top bg-[#2D8EC5]"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full lg:flex-1">
                    {ITEMS.map((item, index) => {
                        const isActive = index === active;
                        return (
                            // Fragment, not a wrapper element: the active button grows with
                            // lg:flex-1 against this flex column, which a wrapper would break.
                            <Fragment key={item.title}>
                                <button
                                    type="button"
                                    onClick={() => setActive(index)}
                                    className={`relative text-left flex flex-col justify-center gap-3 px-6 sm:px-8 border-b border-[#cac9c9] last:border-b-0 overflow-hidden bg-[#F8FAFC] rounded-ui-lg ${isActive ? "py-6 lg:flex-1" : "py-5"}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="scm-module-highlight"
                                            className="absolute inset-0 bg-[#E8EBEF] border-l-[12px] border-l-[#1C5F85]"
                                            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                                        />
                                    )}
                                    <div className="relative flex flex-col gap-3 ">
                                        <h3 className="font-switzer text-[#2E3033] text-xl sm:text-2xl font-semibold">{item.title}</h3>
                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                                    className="overflow-hidden flex flex-col gap-3 text-[#55595E] text-base w-[92%] font-normal"
                                                >
                                                    {item.desc.map((paragraph) => (
                                                        <p key={paragraph}>{paragraph}</p>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </button>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
