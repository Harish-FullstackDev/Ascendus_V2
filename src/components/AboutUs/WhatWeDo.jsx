"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/CommonComponents/SectionTitle";

// Five division cards in the playbook priority order (content plan 2.3 item 3),
// each linking to its division overview page.
const DIVISIONS = [
    {
        title: "SAP & Enterprise Applications",
        description: "S/4HANA transformation, implementation, migration and support.",
        href: "/services/sap",
    },
    {
        title: "E-Invoicing & Tax Technology",
        description: "ERP integration and readiness for ZATCA and UAE requirements.",
        href: "/services/e-invoicing",
    },
    {
        title: "Microsoft & Cloud",
        description: "Azure, Microsoft 365, Power BI and Power Platform.",
        href: "/services/microsoft",
    },
    {
        title: "Digital Engineering",
        description: "Custom software, enterprise applications and product engineering.",
        href: "/services/digital-engineering",
    },
    {
        title: "Digital Transformation & Managed Services",
        description: "Advisory, data, automation, security, infrastructure and support.",
        href: "/services/digital-transformation",
    },
];

export default function WhatWeDo() {
    return (
        <section className="w-full bg-[#f3f6f9] px-8 sm:px-[64px] py-10 sm:py-16">
            <SectionTitle title="Five capabilities. One accountable team." highlight="One accountable team." className="mb-10 sm:mb-16" />

            {/* Two columns from sm (the odd fifth card spans both); from lg three on
                top and two centred below, on a six-track grid. Five across left the
                long division names too little room. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                {DIVISIONS.map((division, index) => (
                    <motion.div
                        key={division.href}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                        className={`lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""} ${index === DIVISIONS.length - 1 ? "sm:col-span-2" : ""}`}
                    >
                        <Link
                            href={division.href}
                            className="group flex h-full flex-col gap-4 bg-white p-6 sm:p-8 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] border-t-2 border-transparent transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#0061AF] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)]"
                        >
                            <span className="text-sm font-medium tracking-wide text-[#0061AF]">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="text-xl font-semibold leading-snug text-[#2E3033]">{division.title}</h3>
                            <p className="text-base font-light leading-relaxed text-[#55595E]">{division.description}</p>
                            <span className="mt-auto inline-flex items-center gap-2 pt-2 text-base font-medium text-[#2E3033] group-hover:text-[#0061AF]">
                                Explore
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
