"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import overviewImage from "@/assets/Services/EInvoicing/overview.webp";
import { INTRO_TAGS_CLASS, INTRO_TAG_CLASS } from "@/components/CommonComponents/introTags";

const CREDENTIALS = [
    "E-Invoicing Specialist",
    "Master of Digital Transactions",
    "Champion of Streamlined Billing",
];

export default function EInvoicingOverview() {
    return (
        <section className="w-full py-10 sm:py-16">
            <div className="flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2 max-w-[760px] mx-auto text-center px-8"
                >
                    <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Billing Built for the <span className="text-[#2D8EC5]">Digital Era</span></h2>
                    <p className="text-[#55595E] text-base sm:text-lg font-light text-pretty">
                        Automated, compliant, real-time invoicing from creation to payment.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative flex flex-col items-center sm:items-stretch lg:flex-row lg:items-center gap-8 lg:gap-[14px] px-8 sm:px-[64px] lg:pl-[10px] pt-10 sm:pt-[64px]"
                >
                    {/* Navy accent bar spans the row's own height instead of a fixed h-75 */}
                    <div className="hidden lg:block absolute left-0 top-[64px] bottom-0 w-[9px] bg-[#1c5f85]" />

                    <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-5 w-full lg:flex-1 lg:pl-[54px] lg:pr-16 xl:pr-32">
                        <h2 className="text-[#2E3033] text-xl sm:text-2xl font-semibold"><span className="text-[#2D8EC5]">Overview</span></h2>
                        <p className="text-[#55595E] text-base sm:text-lg font-light leading-relaxed text-pretty">
                            E-Invoicing revolutionizes billing with automated workflows, compliance-ready systems, and
                            real-time processing that drive efficiency and reduce errors.
                        </p>

                        {/* Credentials strip from the old page, shown as chips */}
                        <ul className={`${INTRO_TAGS_CLASS} justify-center sm:justify-start`}>
                            {CREDENTIALS.map((item) => (
                                <li key={item} className={INTRO_TAG_CLASS}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative w-full lg:w-[46%] lg:max-w-[569px] aspect-[569/300] shrink-0 bg-[#565656] lg:mr-[64px] rounded-ui-lg overflow-hidden">
                        <Image src={overviewImage} alt="Two colleagues completing an invoice form at a desk" fill className="object-cover" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
