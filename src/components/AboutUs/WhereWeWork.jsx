"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Content plan 2.3 item 7. Only Riyadh is shown as an office: the market chips
// are markets served, not locations, and no other pin is implied until an
// office is confirmed. The full street address is still to be confirmed, so
// the HQ card shows the city only.
const MARKETS = ["Saudi Arabia", "UAE", "Oman", "Qatar", "Kuwait", "Bahrain", "International"];

export default function WhereWeWork() {
    return (
        <section id="where-we-work" className="scroll-mt-16 w-full px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle
                title="Rooted in Saudi Arabia. Focused on the GCC. Open to global collaboration."
                highlight="Focused on the GCC."
                className="mb-10 sm:mb-16"
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,420px)] gap-10 lg:gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <p className="text-base sm:text-lg font-light leading-relaxed text-[#55595E]">
                        Headquartered in Riyadh, Ascendus works with organisations across Saudi Arabia, the wider GCC and
                        selected international markets, according to delivery requirements.
                    </p>
                    <p className="mt-8 text-sm font-medium uppercase tracking-wide text-[#2E3033]">Markets we serve</p>
                    <ul className="mt-4 flex flex-wrap gap-3">
                        {MARKETS.map((market) => (
                            <li key={market} className="border border-[#2E3033]/20 bg-[#f3f6f9] px-4 py-2 text-base text-[#2E3033]">
                                {market}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="bg-[#004174] p-8 text-white"
                >
                    <MapPin className="size-8 sm:size-10 text-white" strokeWidth={1.5} aria-hidden="true" />
                    <p className="mt-6 text-sm font-medium uppercase tracking-wide text-white/70">Headquarters</p>
                    <p className="mt-2 text-xl sm:text-2xl font-semibold">Riyadh</p>
                    <p className="mt-1 text-base sm:text-lg font-light text-white/90">Kingdom of Saudi Arabia</p>
                </motion.div>
            </div>
        </section>
    );
}
