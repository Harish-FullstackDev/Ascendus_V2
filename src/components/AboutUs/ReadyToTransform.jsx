"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import ctaBg from "@/assets/cta-bg.webp";
import CalendlyModal from "@/components/CommonComponents/CommonCalendy";

// Closing CTA band, shared by About and Why Ascendus; each page passes its own copy.
export default function ReadyToTransform({
    title = "Tell us what you need to change.",
    text = "Describe the challenge and the outcome you want. We will help frame the next step.",
    buttonLabel = "Request a Consultation",
    capitalizeTitle = false,
}) {
    const [showCalendly, setShowCalendly] = useState(false);

    const handleContactClick = () => {
        setShowCalendly(true);
    };

    return (
        <>
            <section className="relative z-0 w-full overflow-hidden">
                <Image src={ctaBg} alt="" fill className="object-cover object-bottom" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-12 px-8 sm:px-[64px] py-14 sm:py-16 lg:py-0 lg:min-h-[288px]"
                >
                    <div className="flex flex-col gap-3 w-full sm:w-[60%] lg:w-[74%] text-center sm:text-left items-center sm:items-start">
                        <h2 className={`text-2xl sm:text-[32px] lg:text-[40px] leading-tight font-medium text-white ${capitalizeTitle ? "capitalize" : ""}`}>
                            {title}
                        </h2>

                        <p className="text-base sm:text-xl font-normal text-white/90">
                            {text}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleContactClick}
                        className="group inline-flex shrink-0 items-center gap-4 rounded-ui-sm bg-white px-6 py-3.5 text-sm sm:text-base font-normal uppercase tracking-[0.5px] text-[#0e2b4b] shadow-[0px_4px_16px_rgba(0,0,0,0.18)] transition-colors duration-300 hover:bg-[#ecf2f9]"
                    >
                        {buttonLabel}
                        <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                    </button>
                </motion.div>
            </section>

            {/* Calendly Modal */}
            <CalendlyModal
                isOpen={showCalendly}
                onClose={() => setShowCalendly(false)}
                calendlyUrl={process.env.NEXT_PUBLIC_CALENDLY_URL}
                pageSettings={{
                    backgroundColor: "ffffff",
                    primaryColor: "#2d8ec5",
                    textColor: "#003756",
                }}
            />
        </>
    );
}

