"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import NavyCardBackground from "@/components/CommonComponents/NavyCardBackground";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Content plan 3.3 item 3. Each card links to its service page. The SAP and
// Microsoft lines still need Ascendus to confirm the modules and scope.
const REASONS = [
    {
        title: "Business-led discovery",
        text: "We start with your operating model, systems and goals, not our service list.",
        href: "/services/digital-transformation/technology-advisory",
    },
    {
        title: "SAP depth",
        text: "SAP is our core practice, from S/4HANA transformation to application management.",
        href: "/services/sap",
    },
    {
        title: "E-invoicing readiness",
        text: "We connect ERP, finance and tax processes to ZATCA and UAE requirements, working with accredited providers where required.",
        href: "/services/e-invoicing",
    },
    {
        title: "Microsoft and cloud",
        text: "Azure, Microsoft 365, Power BI and Power Platform, shaped around your security and operating model.",
        href: "/services/microsoft",
    },
    {
        title: "Digital engineering",
        text: "Custom software and integrations for the processes standard platforms do not fit.",
        href: "/services/digital-engineering",
    },
    {
        title: "Governance and support",
        text: "Agreed milestones, testing and acceptance, then a support model after go-live.",
        href: "/services/digital-transformation/application-support",
    },
];

export default function SixReasons() {
    const [hovered, setHovered] = useState(null);

    return (
        <section className="w-full px-8 sm:px-[64px] pt-5 pb-10 sm:pt-8 sm:pb-16">
            <SectionTitle title="What working with Ascendus looks like." highlight="with Ascendus" className="mb-10 sm:mb-16" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {REASONS.map((reason, index) => (
                    <motion.div
                        key={reason.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
                    >
                        <Link
                            href={reason.href}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                            onFocus={() => setHovered(index)}
                            onBlur={() => setHovered(null)}
                            className="group relative flex h-full min-h-[220px] flex-col overflow-hidden px-[10%] py-8 text-white shadow-[0px_2px_8px_rgba(0,0,0,0.19)] rounded-ui-md"
                        >
                            <NavyCardBackground isActive={hovered === index} />
                            <div className="relative flex h-full flex-col gap-3">
                                <h3 className="text-xl font-medium leading-7">{reason.title}</h3>
                                <p className="text-base font-normal leading-6 text-white/90">{reason.text}</p>
                                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-base font-medium">
                                    Learn more
                                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
