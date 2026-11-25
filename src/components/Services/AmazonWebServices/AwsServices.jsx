"use client";

import { useEffect, useRef, useState } from "react";
import { LuArchive, LuDatabase, LuGlobe, LuNetwork, LuServer, LuSquareFunction } from "react-icons/lu";
import { motion } from "framer-motion";
import useAutoScroll from "@/lib/useAutoScroll";

const CARDS = [
    {
        title: "Amazon EC2",
        subtitle: "Elastic Compute Cloud",
        desc: "New EC2 instances optimized for high-performance workloads, GPU-based compute, and burstable computing to scale efficiently for any demand.",
        icon: LuServer,
    },
    {
        title: "Amazon S3",
        subtitle: "Simple Storage Service",
        desc: "Enhanced with intelligent tiering, better cost optimization, and secure data storage with Amazon S3 Glacier for long-term archiving.",
        icon: LuArchive,
    },
    {
        title: "Amazon RDS",
        subtitle: "Relational Database Service",
        desc: "Supports more complex workflows with multi-step processes, enhanced integration with event-driven applications, and extended query execution time.",
        icon: LuDatabase,
    },
    {
        title: "AWS Lambda",
        subtitle: "Serverless Compute",
        desc: "Supports more complex workflows with multi-step Lambda functions, enhanced integration with event-driven applications, and extended execution time.",
        icon: LuSquareFunction,
    },
    {
        title: "Amazon VPC",
        subtitle: "Virtual Private Cloud",
        desc: "Advanced network configurations, PrivateLink connections, cross-region VPC peering, and high availability solutions for securing cloud resources.",
        icon: LuNetwork,
    },
    {
        title: "Amazon CloudFront",
        subtitle: "Content Delivery Network",
        desc: "Improved with real-time analytics, advanced caching, dynamic content delivery, and low-latency solutions for global content distribution.",
        icon: LuGlobe,
    },
];

function ArrowIcon({ direction }) {
    return (
        <svg
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`size-full ${direction === "left" ? "-rotate-90" : "rotate-90"}`}
        >
            <path
                d="M22.7459 37.9097V7.58181M11.373 18.9548L22.7459 7.58181L34.1189 18.9548"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function AwsServices() {
    const trackRef = useRef(null);
    const pauseAutoScroll = useAutoScroll(trackRef);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    // Share of the card row seen so far (visible width included); drives the
    // progress bar so visitors know how many cards are left.
    const [progress, setProgress] = useState(0);

    const updateScrollState = () => {
        const el = trackRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
        setProgress(el.scrollWidth ? Math.min(1, (el.scrollLeft + el.clientWidth) / el.scrollWidth) : 0);
    };

    useEffect(() => {
        updateScrollState();
        const onResize = () => updateScrollState();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const scrollByCard = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelector("[data-card]");
        const amount = card ? card.offsetWidth + 32 : 335;
        el.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    return (
        <section className="w-full bg-white px-8 py-10 sm:px-[64px] sm:py-[64px]">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 sm:gap-10 lg:gap-[80px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    // At lg the column is as wide as the heading's first line, so
                    // "Unlocking Business Potential" never wraps; the intro then wraps
                    // inside that width (w-0 + min-w-full) instead of widening it.
                    className="flex flex-col gap-2 w-full lg:w-fit shrink-0 lg:pt-8"
                >
                    <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold lg:whitespace-nowrap">
                        Unlocking <span className="text-[#2D8EC5] whitespace-nowrap">Business Potential</span>
                        <br />
                        with AWS at Ascendus
                    </h2>
                    <p className="text-[#55595E] text-base sm:text-xl font-light lg:w-0 lg:min-w-full">
                        The core AWS services we architect, deploy, and optimize for our clients.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-6 w-full min-w-0">
                    {/* whileInView lives on the track, not per card: cards scrolled out of
                        view inside the overflow container would otherwise re-trigger their
                        reveal mid-scroll. One trigger, staggered via variants. */}
                    <motion.div
                        ref={trackRef}
                        onScroll={updateScrollState}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                        // overflow-y-hidden keeps the track from also becoming a vertical
                        // scroll container; overscroll-x-contain stops swipes chaining out.
                        className="flex gap-8 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2"
                    >
                        {CARDS.map((card) => (
                            <motion.div
                                key={card.title}
                                data-card
                                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                // Height is a floor, not fixed: the flex row stretches every
                                // card to the tallest, so longer copy never spills out.
                                className="snap-start shrink-0 w-[260px] sm:w-[335px] min-h-[300px] sm:min-h-[380px] bg-white border border-black/[0.35] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex flex-col items-center text-center px-6 sm:px-7 py-7 sm:py-8"
                            >
                                <card.icon aria-hidden="true" strokeWidth={1.5} className="size-8 sm:size-10 mb-5 text-[#1C5F85]" />
                                <h3 className="font-houschka-pro text-[#2E3033] text-xl sm:text-2xl font-semibold">{card.title}</h3>
                                <p className="text-[#2D8EC5] text-sm sm:text-base font-light mt-1">{card.subtitle}</p>
                                <p className="text-[#55595E] text-base sm:text-lg font-light mt-5">{card.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="flex items-center justify-between gap-6">
                        {/* Progress bar fills the row up to the arrows, at every width. */}
                        <div
                            role="progressbar"
                            aria-label="Cards viewed"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(progress * 100)}
                            className="flex-1 h-1.5 bg-[#1C5F85]/15 overflow-hidden"
                        >
                            <div
                                className="h-full bg-[#1C5F85]"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>
                        <div className="flex items-center gap-6">
                        <button
                            type="button"
                            aria-label="Previous"
                            onClick={() => { pauseAutoScroll(); scrollByCard(-1); }}
                            disabled={!canScrollLeft}
                            className={`flex items-center justify-center size-9 sm:size-[46px] transition-[color,transform] disabled:cursor-not-allowed ${canScrollLeft ? "text-black hover:scale-110" : "text-[#c7c7c7]"}`}
                        >
                            <ArrowIcon direction="left" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next"
                            onClick={() => { pauseAutoScroll(); scrollByCard(1); }}
                            disabled={!canScrollRight}
                            className={`flex items-center justify-center size-9 sm:size-[46px] transition-[color,transform] disabled:cursor-not-allowed ${canScrollRight ? "text-black hover:scale-110" : "text-[#c7c7c7]"}`}
                        >
                            <ArrowIcon direction="right" />
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
