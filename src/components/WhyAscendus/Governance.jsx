"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Content plan 3.3 item 6. No ISO, CMMI or similar certifications are named
// until certificates exist.
const CONTROLS = [
    { title: "Project governance", text: "Clear decision rights and reporting." },
    { title: "Risk management", text: "Risks logged, owned and escalated." },
    { title: "Quality planning", text: "Quality criteria agreed before build." },
    { title: "Testing", text: "Tests tied to business-critical processes." },
    { title: "Change control", text: "Scope changes agreed before work begins." },
    { title: "Documentation", text: "Handover material your team can use." },
];

export default function Governance() {
    return (
        <section id="governance" className="scroll-mt-16 w-full bg-[#f3f6f9] px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle
                title="Governance that keeps transformation accountable."
                highlight="accountable."
                subtitle="Enterprise initiatives need decision rights, delivery controls, testing discipline and transparent reporting. We set governance in proportion to the engagement."
                className="mb-10 sm:mb-16"
            />

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CONTROLS.map((control, index) => (
                    <motion.li
                        key={control.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
                        className="bg-white p-6 sm:p-8 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] rounded-ui-md"
                    >
                        <span aria-hidden className="block h-1 w-12 bg-[#2d8ec5]" />
                        <h3 className="mt-5 text-xl font-semibold text-[#2E3033]">{control.title}</h3>
                        <p className="mt-2 text-base sm:text-lg font-light leading-relaxed text-[#55595E]">{control.text}</p>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
}
