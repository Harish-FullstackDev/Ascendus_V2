"use client";

import { motion } from "framer-motion";
const ROW_1 = [
    { title: "Efficiency & Productivity", desc: "Tailored solutions automate processes and improve efficiency, increasing productivity across teams." },
    { title: "Better User Experiences", desc: "Software built around your business needs delivers enhanced experiences for customers and employees." },
    { title: "Competitive Edge", desc: "Custom capabilities that off-the-shelf tools cannot offer help you stand apart in your market." },
];

const ROW_2 = [
    { title: "Scalability & Flexibility", desc: "Room to innovate and adapt as market demands change and the organization grows." },
    { title: "Data Management & Security", desc: "Better control over how data is stored, managed, and protected." },
    { title: "Integration & Growth", desc: "Integration with existing systems supports improved decision-making and long-term growth." },
];

const Card = ({ title, desc, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        className="flex flex-col gap-4"
    >
        <h3 className="font-switzer text-[#2E3033] text-xl font-semibold">{title}</h3>
        <p className="text-[#55595E] text-base sm:text-lg font-light leading-[1.4] text-pretty">{desc}</p>
    </motion.div>
);

// Phone only: one topic per line, icon on the left with the title and description
// stacked to its right, a hairline under each (as in S/4HANA Private Cloud features).
const PhoneItem = ({ title, desc, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        className="flex flex-col gap-4"
    >
        <div className="flex items-start">
            <div className="flex-1 min-w-0 flex flex-col gap-2">
                <h3 className="font-switzer text-[#2E3033] text-xl font-semibold">{title}</h3>
                <p className="text-[#55595E] text-base font-light leading-[1.4] text-pretty">{desc}</p>
            </div>
        </div>
        <div className="h-px w-full bg-[#d3dae2]" />
    </motion.div>
);

const FeatureRow = ({ items }) => (
    <div className="w-full">
        <div className="flex flex-col gap-8 sm:hidden">
            {items.map((item, index) => (
                <PhoneItem key={item.title} {...item} index={index} />
            ))}
        </div>
        <div className="hidden sm:grid grid-cols-2 lg:hidden gap-x-8 gap-y-8">
            {items.map((item, index) => (
                <Card key={item.title} {...item} index={index} />
            ))}
        </div>
        <div className="hidden lg:flex lg:items-stretch">
            {items.map((item, index) => (
                <div key={item.title} className="contents">
                    <div className="flex-1 min-w-0">
                        <Card {...item} index={index} />
                    </div>
                    {index < items.length - 1 && (
                        <div className="w-[144px] shrink-0 flex justify-center">
                            <div className="w-px self-stretch bg-[#8794A3]/30" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default function SoftwareInvestment() {
    return (
        <section className="w-full pt-10 sm:pt-16 pb-10 sm:pb-10 lg:pb-16 px-8 sm:px-[64px]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start sm:items-center gap-4 text-left sm:text-center self-start sm:self-auto mb-10 sm:mb-16 w-full"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">
                    Why Invest in <span className="text-[#2D8EC5]">Software Development</span> for Your Business?
                </h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light max-w-[960px] text-balance">
                    Custom software gives your business solutions built around its own needs, automating processes,
                    lifting productivity, and improving the experience for customers and employees. It scales and
                    adapts as market demands change, and brings better data management, security, and integration
                    with existing systems, supporting sharper decisions, a competitive edge, and long-term growth.
                </p>
            </motion.div>

            <div className="flex flex-col gap-8 sm:gap-10 lg:gap-20 w-full">
                <FeatureRow items={ROW_1} />
                <FeatureRow items={ROW_2} />
            </div>
        </section>
    );
}
