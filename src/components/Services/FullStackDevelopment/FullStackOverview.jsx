"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import overviewImage from "@/assets/Services/FullStackDevelopment/overview.webp";
import { INTRO_TAGS_CLASS, INTRO_TAG_CLASS } from "@/components/CommonComponents/introTags";

const CREDENTIALS = [
    "Full-Stack Development",
    "Agile Development Expert",
    "Proficient in Front-End and Back-End Technologies",
];

export default function FullStackOverview() {
    return (
        <section className="w-full bg-white px-8 py-8 sm:px-[64px] sm:py-[64px] flex flex-col sm:flex-row gap-8 sm:gap-[48px] items-start">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col gap-4 w-full sm:flex-1"
            >
                <p className="text-[#2d8ec5] text-base sm:text-lg font-light">
                    Innovate and streamline web applications.
                </p>
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Why <span className="text-[#2D8EC5]">Full-Stack Development?</span></h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light leading-[1.5]">
                    Full-Stack Development provides comprehensive web solutions, integrating advanced front-end
                    interfaces with robust back-end systems for optimal performance and seamless user experiences.
                </p>
                <p className="text-[#55595E] text-base sm:text-lg font-light leading-[1.5]">
                    Full-stack development offers versatility, enabling seamless integration of front-end and
                    back-end, resulting in efficient, cohesive, and scalable web solutions. Innovation and seamless
                    integration, delivered as one.
                </p>
                <ul className={`${INTRO_TAGS_CLASS} pt-2`}>
                    {CREDENTIALS.map((label) => (
                        <li key={label} className={INTRO_TAG_CLASS}>
                            {label}
                        </li>
                    ))}
                </ul>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="relative w-full sm:w-[518px] aspect-[518/325] shrink-0 self-start overflow-hidden"
            >
                <Image src={overviewImage} alt="Developer working across multiple monitors in a studio" fill className="object-cover" />
            </motion.div>
        </section>
    );
}