"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import bandBg from "@/assets/AboutUs/vision-mission-bg.jpg";

// Vision and mission (content plan 2.3 item 4) on the dark band from the ref
// VisionMissionBand: the black swirl photo behind two columns split by a white
// rule, icon / title / text centred in each. Only Vision and Mission are shown;
// the ref's Culture & Values and CSR columns are not in the playbook. The
// supporting line sits centred under both columns, as in the design.
const STATEMENTS = [
    {
        icon: Eye,
        title: "Our Vision",
        description: "To help organisations build stronger, more connected and future-ready businesses.",
    },
    {
        icon: Target,
        title: "Our Mission",
        description: "To translate business challenges into practical enterprise technology solutions."
    },
];

const SUPPORT = "We measure our work by whether systems keep running as designed, long after the project team has moved on.";

export default function WhereWeHeadedAndWhy() {
    return (
        <section id="vision-mission" className="scroll-mt-16 relative w-full overflow-hidden bg-black px-6 py-12 sm:px-[64px] sm:py-20">
            <Image src={bandBg} alt="" fill sizes="100vw" className="object-cover" />

            <div className="relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-10 sm:mb-14 flex flex-col items-center gap-3 text-center"
                >
                    <p className="text-[14px] font-semibold uppercase leading-4 tracking-[0.7px] text-[#68c2f2]">
                        Vision &amp; Mission
                    </p>
                    <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-medium capitalize leading-[1.2] text-white">
                        Where we&apos;re headed, and why.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-white/60">
                    {STATEMENTS.map((statement, index) => {
                        const Icon = statement.icon;
                        return (
                            <motion.div
                                key={statement.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                                className="flex flex-col items-center gap-3 text-center md:px-12 lg:px-20 md:py-2"
                            >
                                <Icon className="size-8 sm:size-10 text-[#68c2f2]" strokeWidth={1.25} aria-hidden="true" />
                                <h3 className="mt-1 text-sm sm:text-base font-normal uppercase tracking-[0.7px] text-white">{statement.title}</h3>
                                <p className="max-w-md text-base sm:text-lg leading-relaxed text-[#ecf2f9]">{statement.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="mx-auto mt-10 sm:mt-14 max-w-3xl text-center text-sm leading-[1.5] text-[#c9d0d8]"
                >
                    {SUPPORT}
                </motion.p>
            </div>
        </section>
    );
}
