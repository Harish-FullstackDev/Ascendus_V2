"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Content plan 2.3 item 8. Text and button only: a partner logo appears here
// only with written proof of that partnership, using the exact status the
// vendor granted.
export default function Partners() {
    return (
        <section id="partners" className="scroll-mt-16 w-full px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle title="Stronger outcomes through the right technology ecosystem." highlight="technology ecosystem." />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="mt-8 sm:mt-10 max-w-3xl mx-auto flex flex-col items-center gap-8 text-center"
            >
                <p className="text-base sm:text-lg font-light leading-relaxed text-[#55595E]">
                    Clients often need several platforms to work together. We choose partners on customer value, technical
                    fit, delivery capability and long-term alignment.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-[#0061AF] px-6 py-2 text-lg font-light text-white transition-colors hover:bg-[#004174]"
                >
                    Discuss a partnership
                </Link>
            </motion.div>
        </section>
    );
}
