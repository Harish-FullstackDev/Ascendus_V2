"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import industry1Icon from "@/assets/Services/InternetOfThings/icons/industry-1.svg";
import industry2Icon from "@/assets/Services/InternetOfThings/icons/industry-2.svg";
import industry3Icon from "@/assets/Services/InternetOfThings/icons/industry-3.svg";
import industry4Icon from "@/assets/Services/InternetOfThings/icons/industry-4.svg";

const CARDS = [
    { title: "Manufacturing", desc: "Predictive maintenance and automated control of industrial machinery.", icon: industry1Icon },
    { title: "Logistics & Supply Chain", desc: "Real-time asset tracking with IoT sensors and GPS technology.", icon: industry2Icon },
    { title: "Healthcare", desc: "Wearable devices that track vital signs for remote health management.", icon: industry3Icon },
    { title: "Smart Buildings", desc: "Remote management of thermostats, lighting systems, and climate controls.", icon: industry4Icon },
];

export default function IotIndustries() {
    return (
        <section className="w-full py-10 px-8 sm:p-16 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center gap-2 max-w-[767px] mx-auto text-center mb-14 sm:mb-16"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Where IoT <span className="text-[#2D8EC5]">Creates Value</span></h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    IoT improves quality, safety, and sustainability across industries.
                </p>
            </motion.div>

            {/* Phones: cards size to their copy (no min-height), and rows sit 40px
                apart measured from a card's foot to the top of the next icon tab, which
                rises 48px above its card (mt-12). Tablet and desktop keep the old spacing. */}
            <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-20">
                {CARDS.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        // From sm, each card spans a title row and a description row
                        // shared with the cards beside it (subgrid), so a title that
                        // wraps to two lines pushes every description in that row down
                        // together and they stay aligned.
                        className="group relative flex flex-col sm:grid sm:row-span-2 sm:grid-rows-subgrid sm:gap-4 sm:content-start sm:min-h-[339px] mt-[38px] sm:mt-10 sm:px-8 sm:pt-20 sm:pb-10 border border-[#7f7f7f]/40 bg-white text-center transition-shadow duration-300 hover:shadow-xl"
                    >
                        <div className="absolute -top-[38px] sm:-top-12 left-1/2 -translate-x-1/2 w-24 h-[76px] sm:w-[120px] sm:h-[94px] bg-[#0A3A52] flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                            <Image src={card.icon} alt="" width={40} height={40} className="size-8 sm:size-10" />
                        </div>
                        <div className="flex flex-col flex-1 gap-4 px-8 pt-14 pb-8 sm:contents">
                            <h3 className="font-switzer text-[#2E3033] text-xl sm:text-2xl font-semibold">{card.title}</h3>
                            <p className="text-[#55595E] text-base sm:text-lg font-light text-balance">{card.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}


