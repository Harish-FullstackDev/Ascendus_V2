"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PhoneTabDots, { phoneSwipeProps } from "@/components/CommonComponents/PhoneTabPager";

import webDevelopmentPhoto from "@/assets/Services/FullStackDevelopment/web-development.webp";
import apiDevelopmentPhoto from "@/assets/Services/FullStackDevelopment/api-development.webp";
import databasePhoto from "@/assets/Services/FullStackDevelopment/database-management.webp";
import uiUxPhoto from "@/assets/Services/FullStackDevelopment/ui-ux-design.webp";
import serverPhoto from "@/assets/Services/FullStackDevelopment/server-management.webp";
import devOpsPhoto from "@/assets/Services/FullStackDevelopment/devops-deployment.webp";

const TABS = [
    {
        title: "Web Development",
        desc: "Creating dynamic websites using front-end and back-end technologies for interactivity.",
        img: webDevelopmentPhoto,
    },
    {
        title: "API Development",
        desc: "Designing and implementing APIs for application communication with external services.",
        img: apiDevelopmentPhoto,
    },
    {
        title: "Database Management",
        desc: "Setting up, maintaining, and optimizing databases for efficient data storage and retrieval.",
        img: databasePhoto,
    },
    {
        title: "UI/UX Design",
        desc: "Designing user-friendly interfaces for a seamless experience across all devices.",
        img: uiUxPhoto,
    },
    {
        title: "Server Management",
        desc: "Configuring and maintaining servers for application reliability, performance, and security.",
        img: serverPhoto,
    },
    {
        title: "DevOps & Deployment",
        desc: "Implementing CI/CD pipelines, managing version control, and deploying applications.",
        img: devOpsPhoto,
    },
];

export default function FullStackServices() {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // A timeout per tab, so a tab picked by hand (dot, swipe or click) always
    // gets the full interval before autoplay moves on.
    useEffect(() => {
        if (isPaused) return undefined;
        const timer = setTimeout(() => {
            setActive((prev) => (prev + 1) % TABS.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isPaused, active]);

    const activeTab = TABS[active];
    const go = (step) => setActive((prev) => (prev + step + TABS.length) % TABS.length);

    return (
        <section className="w-full bg-white px-8 py-10 sm:px-[64px] sm:py-[64px] flex flex-col items-center gap-8 sm:gap-[45px]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start sm:items-center gap-2 max-w-[1074px] text-left sm:text-center self-start sm:self-auto"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">
                    Key Benefits of SST&apos;s <span className="text-[#2D8EC5]">Full-Stack Development</span> Services
                </h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    Six disciplines covered by one team, from the interface to the server it runs on.
                </p>
            </motion.div>

            {/* items-stretch lets the tab column match the image height at lg, with
                justify-between spreading the six tabs, instead of a fixed h-96. */}
            <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-[clamp(2.5rem,6vw,100px)] w-full">
                <div className="hidden sm:flex flex-col justify-between w-full lg:w-[32%] gap-2 lg:gap-1 shrink-0">
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
                            className={`text-left border-l-[3px] flex items-center min-h-12 px-3.5 py-1 transition-colors ${index === active
                                ? "border-[#2d8ec5] text-black"
                                : "border-[#6c6c6c] text-[#6c6c6c] opacity-70"
                                }`}
                        >
                            <h3 className="font-houschka-pro text-base sm:text-xl xl:text-2xl font-semibold">{tab.title}</h3>
                        </button>
                    ))}
                </div>

                {/* Phones: no tab list (the dots replace it); the photo panel fits its copy
                    plus the dots, with photo showing above (sizer), and a swipe changes the tab. */}
                <motion.div {...phoneSwipeProps(go)} className="relative w-full lg:flex-1 sm:aspect-[798/446] overflow-hidden">
                    <div aria-hidden="true" className="sm:hidden invisible grid px-5 pt-28 pb-[60px]">
                        {TABS.map((tab) => (
                            <div key={tab.title} className="[grid-area:1/1] flex flex-col gap-2">
                                <span className="text-lg font-semibold">{tab.title}</span>
                                <p className="text-sm font-light leading-relaxed">{tab.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* Every image stays mounted and cross-fades on opacity, so switching tabs never blanks the box; only the copy swaps, after the image has started to change. */}
                    <div className="absolute inset-0">
                        {TABS.map((tab, index) => (
                            <Image
                                key={index}
                                src={tab.img}
                                alt={index === active ? tab.title : ""}
                                fill
                                className={`object-cover transition-opacity duration-700 ease-in-out ${index === active ? "opacity-100" : "opacity-0"}`}
                                priority={index === 0}
                            />
                        ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
                                className="absolute left-5 right-5 bottom-[60px] sm:left-[7%] sm:right-auto sm:bottom-[10%] sm:max-w-[462px] text-white flex flex-col gap-2 sm:gap-3"
                            >
                                <h3 className="font-houschka-pro text-lg sm:text-xl font-semibold">{activeTab.title}</h3>
                                <p className="text-white/90 text-sm sm:text-lg font-light leading-relaxed">{activeTab.desc}</p>
                            </motion.div>
                            </AnimatePresence>
                        </div>

                    {/* Phone pagination (replaces the tab list below sm). */}
                    <PhoneTabDots labels={TABS.map((t) => t.title)} active={active} onSelect={setActive} />
                </motion.div>
            </div>
        </section>
    );
}
