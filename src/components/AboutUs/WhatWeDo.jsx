"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, ReceiptText, Cloud, Code2, Workflow } from "lucide-react";

// Five division cards in the playbook priority order (content plan 2.3 item 3),
// each linking to its division overview page. Dark navy band with the same
// eyebrow and heading colours as the ref Why Ascendus band: label and heading
// on the left, Explore Our Services on the right, then a row of white cards.
const DIVISIONS = [
    {
        icon: Layers,
        title: "SAP & Enterprise Applications",
        description: "S/4HANA transformation, implementation, migration and support.",
        href: "/services/sap",
    },
    {
        icon: ReceiptText,
        title: "E-Invoicing & Tax Technology",
        description: "ERP integration and readiness for ZATCA and UAE requirements.",
        href: "/services/e-invoicing",
    },
    {
        icon: Cloud,
        title: "Microsoft & Cloud",
        description: "Azure, Microsoft 365, Power BI and Power Platform.",
        href: "/services/microsoft",
    },
    {
        icon: Code2,
        title: "Digital Engineering & Product Development",
        description: "Custom software, enterprise applications and product engineering.",
        href: "/services/digital-engineering",
    },
    {
        icon: Workflow,
        title: "Digital Transformation & Managed Services",
        description: "Advisory, data, automation, security, infrastructure and support.",
        href: "/services/digital-transformation",
    },
];

export default function WhatWeDo() {
    return (
        <section className="w-full bg-[#00223d] px-6 py-10 sm:px-[64px] sm:py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            >
                <div className="flex flex-col gap-4">
                    <p className="text-[14px] font-semibold uppercase leading-4 tracking-[0.7px] text-[#68c2f2]">
                        What We Do
                    </p>
                    <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-medium capitalize leading-[1.2] text-white">
                        Five capabilities. One accountable team.
                    </h2>
                </div>

                <Link
                    href="/services/"
                    className="group inline-flex h-10 w-fit shrink-0 items-center gap-2 rounded-ui-sm bg-[#0061af] px-4 text-sm font-normal text-white transition-colors duration-300 hover:bg-[#005192] sm:text-base"
                >
                    Explore Our Services
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
            </motion.div>

            <ul className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
                {DIVISIONS.map((division, index) => {
                    const Icon = division.icon;
                    return (
                        <motion.li
                            key={division.href}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                        >
                            <Link
                                href={division.href}
                                className="group flex h-full flex-col gap-4 rounded-ui-md bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.25)]"
                            >
                                <Icon className="size-6 text-[#0061af]" strokeWidth={1.5} aria-hidden="true" />
                                <h3 className="text-base sm:text-lg font-medium leading-snug text-[#0e2b4b] group-hover:text-[#0061af]">
                                    {division.title}
                                </h3>
                                <p className="text-sm leading-[1.5] text-[#415773]">{division.description}</p>
                            </Link>
                        </motion.li>
                    );
                })}
            </ul>
        </section>
    );
}
