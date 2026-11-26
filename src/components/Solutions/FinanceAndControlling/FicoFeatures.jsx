"use client";

import { motion } from "framer-motion";

const CORE_MODULES = [
    {
        title: "Financial Accounting (FI)",
        desc: "Records every financial transaction accurately, covering general ledger, accounts payable and receivable, and asset accounting, for reliable financial statements.",
    },
    {
        title: "Controlling (CO)",
        desc: "Tracks costs and profitability across dimensions, with cost center accounting, internal orders, profitability analysis, and product costing.",
    },
];

const SUPPORTING_FEATURES = [
    {
        title: "Integrated Financial Management",
        desc: "Links finance with controlling, procurement, sales, and other functions, so data stays consistent across the enterprise.",
    },
    {
        title: "Real-time Reporting & Analytics",
        desc: "Real-time access to financial data through standard reports, custom dashboards, and ad-hoc analysis.",
    },
    {
        title: "Compliance & Governance",
        desc: "Financial controls, audit trails, and security measures keep operations transparent and aligned with regulations and internal policies.",
    },
];

// Two core modules in the wide row, three supporting capabilities below. Cards
// size to their copy (the grid stretches each row to its tallest card), so no
// min-height is needed to keep a row aligned.
function Card({ title, desc }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="border border-[#d3d5d8] bg-[#E4E6E7] flex flex-col gap-3 px-6 py-7 sm:px-8 sm:py-8 h-full"
        >
            <h3 className="font-switzer text-[#2E3033] text-xl sm:text-2xl font-semibold">{title}</h3>
            <p className="text-[#55595E] text-base sm:text-lg font-light">{desc}</p>
        </motion.div>
    );
}

export default function FicoFeatures() {
    return (
        <section className="w-full px-8 py-10 sm:px-[64px] sm:py-[64px] flex flex-col items-center gap-10 sm:gap-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start sm:items-center gap-2 max-w-[694px] text-left sm:text-center self-start sm:self-auto"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Features of <span className="text-[#2D8EC5]">Finance and Controlling</span></h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    The core modules, and the integrated capabilities that turn them into one finance function.
                </p>
            </motion.div>

            <div className="w-full max-w-screen flex flex-col gap-6 sm:gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {CORE_MODULES.map((card) => (
                        <Card key={card.title} {...card} />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {SUPPORTING_FEATURES.map((card) => (
                        <Card key={card.title} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
