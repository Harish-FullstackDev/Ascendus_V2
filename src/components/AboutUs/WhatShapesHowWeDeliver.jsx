"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Puzzle, Plug, Cloud } from "lucide-react";
import bandBg from "@/assets/AboutUs/how-we-build-bg.webp";

// Four principles (content plan 2.3 item 5), laid out like the ref Why Ascendus
// band: the Riyadh night skyline behind a dark left-to-right wash, copy on the
// left and four icon pillars split by white rules on the right. Headings match
// their text. Still to be confirmed with delivery leadership.
const PRINCIPLES = [
    {
        icon: ShieldCheck,
        title: "Minimal Core Customisation",
        description: "We keep custom code out of the SAP core, so upgrades stay safe.",
    },
    {
        icon: Puzzle,
        title: "Upgrade-Safe Extensions",
        description: "We build extensions on SAP Business Technology Platform.",
    },
    {
        icon: Plug,
        title: "Standard Integration",
        description: "We use standard APIs and integration suites, not direct system changes.",
    },
    {
        icon: Cloud,
        title: "Cloud-Native Practice",
        description: "We apply cloud-native methods so systems scale and keep improving.",
    },
];

export default function WhatShapesHowWeDeliver() {
    return (
        <section
            id="how-we-build"
            className="scroll-mt-16 relative flex w-full items-center overflow-hidden bg-[#00223d] px-6 py-10 sm:px-[64px] sm:py-[48px] xl:min-h-[464px]"
        >
            <Image src={bandBg} alt="" fill sizes="100vw" className="object-cover object-bottom" />
            <div
                aria-hidden
                className="absolute inset-0"
                style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.15) 100%)" }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative flex w-full flex-col items-start gap-10 xl:flex-row xl:items-center xl:gap-12"
            >
                <div className="flex w-full flex-col gap-6 xl:w-[340px] xl:shrink-0">
                    <p className="text-[14px] font-semibold uppercase leading-4 tracking-[0.7px] text-[#68c2f2]">How We Build</p>

                    <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-medium capitalize leading-[1.2] text-white">
                        What shapes how we deliver.
                    </h2>

                    <p className="max-w-[340px] text-sm font-normal capitalize leading-[1.5] text-white sm:text-base">
                        The principles carried into every engagement, not values printed on a wall and left there.
                    </p>
                </div>

                <ul className="grid w-full min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 md:flex md:flex-1 md:gap-0">
                    {PRINCIPLES.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="flex flex-1 justify-start md:min-h-[200px] md:items-center md:justify-center md:border-r md:border-white/70 md:px-4 md:last:border-r-0"
                            >
                                <div className="flex w-full flex-col items-start gap-2 md:max-w-[170px]">
                                    <span className="flex size-12 items-center justify-center">
                                        <Icon className="size-9 text-white" strokeWidth={1.25} aria-hidden="true" />
                                    </span>
                                    <div className="flex flex-col gap-3 pt-2">
                                        <h3 className="text-base font-normal leading-[1.5] text-white">{item.title}</h3>
                                        <p className="text-sm leading-[1.4] text-[#c9d0d8]">{item.description}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </motion.div>
        </section>
    );
}
