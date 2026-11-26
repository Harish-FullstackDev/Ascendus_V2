"use client";

import { useState } from "react";
import { LuActivity, LuAward, LuBadgeCheck, LuCloud, LuHeartHandshake, LuLayers, LuPlug, LuUserCheck } from "react-icons/lu";
import { motion } from "framer-motion";
import usePhoneScrollHighlight from "@/components/CommonComponents/usePhoneScrollHighlight";

const ITEMS = [
    {
        icon: LuBadgeCheck,
        title: "Certified SAP CX Professionals",
        desc: "Collaborate with experts who deliver tailored CX solutions for your business needs.",
    },
    {
        icon: LuPlug,
        title: "Seamless Integration",
        desc: "Integrate customer engagement processes with existing systems for a unified view of your customers.",
    },
    {
        icon: LuUserCheck,
        title: "Personalized Experiences",
        desc: "Deliver targeted, personalized experiences to customers using AI-driven insights.",
    },
    {
        icon: LuHeartHandshake,
        title: "Customer-Centric Culture",
        desc: "Design effective, profitable business solutions.",
    },
    {
        icon: LuLayers,
        title: "Scalable Solutions",
        desc: "Adopt solutions that grow with your business to meet evolving customer expectations.",
    },
    {
        icon: LuActivity,
        title: "Real-Time Data Insights",
        desc: "Make informed decisions with real-time customer data and advanced analytics.",
    },
    {
        icon: LuAward,
        title: "Proven Best Practices",
        desc: "Leverage industry-standard practices to enhance customer relationships and loyalty.",
    },
    {
        icon: LuCloud,
        title: "Cloud Flexibility",
        desc: "Utilize SAP CX's cloud-based tools for flexibility and scalability in customer management.",
    },
];

export default function CxSuccessFactors() {
    // Desktop: the border and the foot line react to hover. Phones have no hover,
    // so there the card crossing the middle of the screen gets the same look as
    // you scroll, one card at a time.
    const [activeIndex, setActiveIndex] = useState(null);
    const { isPhone, cardRef } = usePhoneScrollHighlight(setActiveIndex);

    return (
        <section className="w-full bg-[#f3f6f9] py-10 px-8 sm:p-16 flex flex-col gap-10 sm:gap-[50px]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start sm:items-center gap-2 max-w-[767px] mx-auto text-left sm:text-center"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Our Key <span className="text-[#2D8EC5]">Success Factors</span> with SAP CX</h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    What we bring to every SAP CX engagement to strengthen customer relationships.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {ITEMS.map((item, index) => {
                    const isLit = isPhone && index === activeIndex;
                    return (
                    <motion.div
                        key={item.title}
                        ref={cardRef(index)}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
                        className={`group bg-white border flex flex-col gap-4 p-6 sm:p-8 transition-colors duration-300 hover:border-[#2d8ec5] ${isLit ? "border-[#2d8ec5]" : "border-[#E2E5EA]"}`}
                    >
                        <item.icon aria-hidden="true" strokeWidth={1.5} className="size-8 sm:size-10 text-[#1C5F85]" />
                        <h3 className="font-switzer text-[#2E3033] text-lg sm:text-xl font-semibold">{item.title}</h3>
                        <p className="text-[#55595E] text-base font-light leading-relaxed">{item.desc}</p>
                        <div className={`mt-auto h-[2px] bg-[#2d8ec5] transition-all duration-300 group-hover:w-full ${isLit ? "w-full" : "w-10"}`} />
                    </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
