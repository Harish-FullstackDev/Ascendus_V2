"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";
import { PartnerLogoMarquee } from "@/components/HomePage/OurProudPartners";

// Content plan 2.3 item 8. The logo strip is the same one the home page shows
// (Our Proud Partners), so both pages list the same logos. The button opens
// the partner programme application form.
export default function Partners() {
    return (
        <section id="partners" className="scroll-mt-16 w-full bg-[#f3f6f9] px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle capitalize title="Stronger outcomes through the right technology ecosystem." highlight="technology ecosystem." />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="mt-8 sm:mt-10 max-w-3xl mx-auto text-center"
            >
                <p className="text-base sm:text-lg font-light leading-relaxed text-[#55595E]">
                    Clients often need several platforms to work together. We choose partners on customer value, technical
                    fit, delivery capability and long-term alignment.
                </p>
            </motion.div>

            <div className="mt-10 sm:mt-14">
                <PartnerLogoMarquee />
            </div>

            <div className="mt-10 sm:mt-14 flex justify-center">
                <Link
                    href="/ascendus-partner"
                    className="inline-flex items-center justify-center bg-[#0061AF] px-6 py-2 text-lg font-light text-white transition-colors hover:bg-[#004174]"
                >
                    Discuss a partnership
                </Link>
            </div>
        </section>
    );
}
