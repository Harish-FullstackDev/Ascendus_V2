"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Hero copy for the About and Why Ascendus pages: eyebrow, rule, H1, then a
// sub-paragraph and buttons. The phone hero is only 340px tall, so below sm the
// hero keeps the eyebrow and H1 and the paragraph and buttons move into
// <PageHeroIntroMobile>, rendered just under the hero on white.
//
// actions: [{ label, href, primary }]

const buttonBase = "inline-flex items-center justify-center px-6 py-2 text-lg font-normal transition-colors rounded-ui-sm";

export default function PageHeroText({ eyebrow, title, text, actions = [] }) {
    return (
        <div className="absolute inset-x-0 top-[18%] sm:top-[23%] px-8 py-6 sm:py-0 sm:px-10 md:ml-7 lg:px-[57px]">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-[1057px]"
            >
                <p className="text-white/90 text-sm sm:text-lg lg:text-xl uppercase tracking-wide font-light">{eyebrow}</p>

                <div className="mt-3 sm:mt-1 h-px w-full bg-white/40" />

                <h1 className="text-white text-xl sm:text-4xl lg:text-5xl font-medium capitalize mt-6 sm:mt-6 leading-tight">{title}</h1>

                <div className="hidden sm:block">
                    <p className="mt-6 max-w-[760px] text-lg lg:text-xl font-normal leading-relaxed text-white/90">{text}</p>
                    {actions.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-4">
                            {actions.map((action) => (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    className={`${buttonBase} ${action.primary
                                        ? "bg-[#0061AF] text-white hover:bg-[#004174]"
                                        : "border border-[#d0d0d0] text-white hover:bg-white hover:text-black"
                                        }`}
                                >
                                    {action.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export function PageHeroIntroMobile({ text, actions = [] }) {
    return (
        <div className="sm:hidden px-8 pt-10">
            <p className="text-base font-normal leading-relaxed text-[#55595E]">{text}</p>
            {actions.length > 0 && (
                <div className="mt-6 flex flex-col gap-3">
                    {actions.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className={`${buttonBase} ${action.primary
                                ? "bg-[#0061AF] text-white hover:bg-[#004174]"
                                : "border border-[#2E3033] text-[#2E3033] hover:bg-[#2E3033] hover:text-white"
                                }`}
                        >
                            {action.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
