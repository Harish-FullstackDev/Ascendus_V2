"use client";

import { motion } from "framer-motion";
import AnimatedStat from "@/components/CommonComponents/AnimatedStat";

// Per the copy deck: only ship stats we can confirm. The deck lists a 4th
// ("[X] years operating across the region") but flags it explicitly as
// unconfirmed and says to drop to a 3-stat row rather than publish a
// placeholder number — so there are 3 here, not 4.
const STRENGTHS = [
    // mobileLines: forced line split below xl. Without it the TypographyGuard
    // glues the last two words, leaving "SAP" alone on the first line.
    { value: "200+", title: "SAP engagements delivered", mobileLines: ["SAP engagements", "delivered"], description: "" },
    { value: "400+", title: "Specialists across the practice", description: "" },
    { value: "6", title: "Delivery locations across the GCC", description: "" },
];

export default function OurStrength() {
    return (
        <section className="w-full bg-[#f3f6f9] px-8 sm:px-[64px] py-10 sm:py-16">
            {/* Own #f3f6f9 band, so it no longer needs the hairline that used to
                separate it from Discover What Set Us Apart above. */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
            >
                <h2 className="text-2xl sm:text-[28px] font-semibold text-[#2E3033]">The <span className="text-[#2D8EC5]">Scale</span> Behind The Practice</h2>
                <p className="mt-2 text-base sm:text-lg font-light text-[#55595E]">
                    Numbers that describe reach, not just size.
                </p>
            </motion.div>

            {/* Same row as the home page "Numbers Worth Having a Conversation
                About": equal columns with hairline dividers, count-up numbers,
                8px number-to-label gap; a 2-column grid on small screens. */}
            <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 xl:flex xl:flex-row xl:flex-nowrap xl:items-center xl:gap-10">
                {STRENGTHS.map((item, index) => (
                    <div key={item.title} className="contents">
                        {index > 0 && <div className="hidden w-px self-stretch bg-[#8794a3] xl:block" aria-hidden="true" />}
                        {/* An odd last stat spans both grid columns below xl, so it sits
                            centred under the pair instead of alone in the left column. */}
                        <div
                            className={`flex min-w-0 justify-center xl:flex-1 ${index === STRENGTHS.length - 1 && STRENGTHS.length % 2 === 1 ? "col-span-2" : ""}`}
                        >
                            {/* The spanning stat keeps one column's width (half the row minus
                                the 24px gap) so its label wraps like the two above it. */}
                            <div
                                className={`flex flex-col gap-2 items-center text-center ${index === STRENGTHS.length - 1 && STRENGTHS.length % 2 === 1 ? "w-[calc((100%-24px)/2)] xl:w-auto" : ""}`}
                            >
                                <AnimatedStat value={item.value} />
                                <p className="text-[#4a5568] text-lg font-light xl:whitespace-nowrap">
                                    {item.mobileLines ? (
                                        <>
                                            {/* "SAP engagements" is ~149px; the column is 151 at 390 but
                                                136-143 at 360-375. min-w-0 on the cell lets the line
                                                spill a few px into the 24px gap, centred, instead of
                                                widening the grid. Under 360 it may wrap normally. */}
                                            <span className="min-[360px]:whitespace-nowrap">{item.mobileLines[0]}</span>
                                            <br className="xl:hidden" /> {item.mobileLines[1]}
                                        </>
                                    ) : (
                                        item.title
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
