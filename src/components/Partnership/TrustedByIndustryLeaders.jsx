"use client";

import { motion } from "framer-motion";

import { PartnerLogoMarquee } from "@/components/HomePage/OurProudPartners";

// The logo strip is the same marquee the home page (Our Proud Partners) and
// the About Us page show, so all three pages list the same partners.

// Centred block, white on white with "More Than a Partnership" above it: 32px on
// top (the other half of that shared boundary) and the full 64px at the bottom,
// where the CTA band changes the background. Figma rules a hairline across the
// top of the section (232:453) to keep the two white blocks apart.
export default function TrustedByIndustryLeaders() {
    return (
        <section
            id="our-partners"
            className="w-full scroll-mt-24 border-t border-[#f1f5f9] bg-white px-6 sm:px-[64px] pt-10 pb-10 sm:pt-8 sm:pb-16"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center gap-3 text-center"
            >
                <p className="text-sm font-semibold uppercase tracking-[0.7px] text-[#0061af] leading-4">
                    Our Partners
                </p>
                {/* Figma sets this one at the 48px Title-1 size rather than the
                    32px used by the other section headings on this page. */}
                <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium text-[#0f172a] leading-[1.2]">
                    Trusted by Industry Leaders
                </h2>
                <p className="max-w-[728px] text-base font-normal text-[#64748b] leading-[1.5]">
                    We work with a select group of partners who share our commitment to excellence, innovation and
                    customer success.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="mt-9 sm:mt-12"
            >
                <PartnerLogoMarquee />
            </motion.div>
        </section>
    );
}
