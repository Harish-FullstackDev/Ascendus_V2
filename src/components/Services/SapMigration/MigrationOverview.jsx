"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import overviewPhoto from "@/assets/Services/SapMigration/overview.webp";
import { INTRO_TAGS_CLASS, INTRO_TAG_CLASS } from "@/components/CommonComponents/introTags";

const CREDENTIALS = [
    "Expert in SAP Data Migration",
    "Agile Project Management Skills",
    "Certified in SAP Migration Strategies",
];

export default function MigrationOverview() {
    return (
        <section className="w-full px-8 py-10 sm:px-[64px] sm:py-[64px] bg-white">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 xl:gap-[120px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full lg:flex-1 lg:min-w-0 lg:max-w-[700px] flex flex-col gap-2"
                >
                    <p className="text-[#2d8ec5] text-base sm:text-lg font-light">Migrate and Moderate.</p>
                    <h2 className="text-2xl sm:text-[28px] text-[#2E3033] font-semibold leading-normal">
                        Why <span className="text-[#2D8EC5]">Migration</span> in SAP?
                    </h2>

                    <div className="flex flex-col gap-4 pt-2 text-base sm:text-lg text-[#55595E] font-light leading-relaxed">
                        <p>
                            SAP Migration streamlines operations, enhances efficiency, and ensures seamless data
                            transition to modern platforms.
                        </p>
                        <p>
                            Migration in SAP ensures updated systems, improved functionality, and compatibility with
                            modern business needs, enhancing efficiency, data integrity, and leveraging new
                            technologies for sustainable growth.
                        </p>
                    </div>

                    <ul className={`${INTRO_TAGS_CLASS} pt-4`}>
                        {CREDENTIALS.map((item) => (
                            <li key={item} className={INTRO_TAG_CLASS}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="relative w-full lg:w-[467px] lg:max-w-[40%] lg:ml-auto shrink-0 aspect-[467/357] overflow-hidden rounded-ui-md"
                >
                    <Image src={overviewPhoto} alt="Team analysing charts and reports during SAP migration planning" fill className="object-cover" />
                </motion.div>
            </div>
        </section>
    );
}
