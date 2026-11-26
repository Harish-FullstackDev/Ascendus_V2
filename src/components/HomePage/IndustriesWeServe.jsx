"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import bannerImg from "@/assets/HomePage/IndustriesWeServe/industries-banner.webp";
import arrowIcon from "@/assets/HomePage/IndustriesWeServe/arrow-right-bold.svg";
import manufacturingImg from "@/assets/HomePage/Industries/manufacturing.webp";
import retailImg from "@/assets/HomePage/Industries/retail_consumer.webp";
import governmentImg from "@/assets/HomePage/Industries/government_public_sector.webp";
import financialImg from "@/assets/HomePage/Industries/banking_financial_services.webp";
import energyImg from "@/assets/HomePage/Industries/energy_utilities.webp";
import engineeringImg from "@/assets/HomePage/Industries/engineering_construction.webp";
import healthcareImg from "@/assets/HomePage/Industries/healthcare_life_sciences.webp";
import technologyMediaImg from "@/assets/HomePage/Industries/technology.webp";
import transportationImg from "@/assets/HomePage/Industries/transportation_logistics.webp";
import educationImg from "@/assets/HomePage/Industries/education_research.webp";

// Names, descriptions and photos carried over from sst_v2's former
// Industry-Specific Solutions carousel; the presentation is sst_website_current's.
const INDUSTRIES = [
    {
        title: "Manufacturing",
        desc: "Streamlining supply chain, production planning, and plant-floor integration with SAP and IoT driven systems.",
        image: manufacturingImg,
    },
    {
        title: "Retail & Consumer",
        desc: "Connecting inventory, logistics, and customer experience across every channel, from store to app to fulfillment.",
        image: retailImg,
    },
    {
        title: "Government & Public Sector",
        desc: "Delivering GCC compliant, secure systems built for accountability and scale.",
        image: governmentImg,
    },
    {
        title: "Banking & Financial Services",
        desc: "Modernizing core banking and finance systems without compromising on security or regulatory reporting.",
        image: financialImg,
    },
    {
        title: "Energy & Utilities",
        desc: "Modernizing asset management, field operations, and grid systems built for uptime and regulatory reporting.",
        image: energyImg,
    },
    {
        title: "Engineering & Construction",
        desc: "Coordinating project controls, procurement, and site execution across complex capital programs.",
        image: engineeringImg,
    },
    {
        title: "Healthcare & Life Sciences",
        desc: "Supporting validated, compliant systems across clinical, research, and life sciences operations.",
        image: healthcareImg,
    },
    {
        title: "Technology, Media & Communications",
        desc: "Scaling billing, network, and content platforms for high-volume technology and media providers.",
        image: technologyMediaImg,
    },
    {
        title: "Transportation & Logistics",
        desc: "Connecting fleet, freight, and supply chain systems for real-time visibility and on-time delivery.",
        image: transportationImg,
    },
    {
        title: "Education & Research",
        desc: "Unifying student, academic, research, and administrative systems on one connected platform.",
        image: educationImg,
    },
];

const PAGE_SIZE = 4;
// Furthest-left card the track can start at — the view always ends on a full
// row of PAGE_SIZE cards, so with 10 industries the last step moves 2, not 4.
const MAX_START = Math.max(0, INDUSTRIES.length - PAGE_SIZE);
// Auto-scroll: one card every AUTOPLAY_MS while the section is on screen,
// wrapping back to the start after the last card. Hovering, focusing or
// touching the cards pauses it; any manual move restarts the countdown.
const AUTOPLAY_MS = 4000;

// Tall photo card (from the home Services carousel, git 5f11962): photo under a
// dark gradient, title at the top, description at the bottom, always visible.
function IndustryCard({ item }) {
    return (
        <div className="group relative w-full overflow-hidden aspect-[7/8] rounded-ui-md">
            <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 25vw"
                className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 via-45% to-black/85 transition-colors duration-500 group-hover:from-black/80 group-hover:via-black/35 group-hover:to-black/90 pointer-events-none" />
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-between p-6 sm:p-8">
                <h3 className="text-white text-xl font-semibold leading-[1.4]">{item.title}</h3>
                {/* Full white at regular weight over the darkened foot of the card,
                    plus a soft shadow so bright patches of photo can't wash it out. */}
                <p className="text-white text-base sm:text-lg font-normal leading-[1.5] pt-2 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">{item.desc}</p>
            </div>
        </div>
    );
}

function useCarouselArrows(ref, deps = []) {
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    // Share of the card row seen so far (visible width included); drives the
    // mobile progress bar so visitors know how many cards are left.
    const [progress, setProgress] = useState(0);

    const update = () => {
        const el = ref.current;
        if (!el) return;
        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
        setProgress(el.scrollWidth ? Math.min(1, (el.scrollLeft + el.clientWidth) / el.scrollWidth) : 0);
    };

    useEffect(() => {
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { canPrev, canNext, progress, update };
}

function scrollByOneCard(ref, direction) {
    const el = ref.current;
    if (!el) return;
    const first = el.children[0];
    const second = el.children[1];
    const step = first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
}

function ArrowButton({ direction, disabled, onClick }) {
    return (
        <button
            type="button"
            aria-label={direction === -1 ? "Previous" : "Next"}
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center size-12 rounded-full border border-[#8794a3] transition-opacity duration-300 ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-[#10161d] hover:border-[#10161d] group/arrow"
                }`}
        >
            <Image
                src={arrowIcon}
                alt=""
                className={`size-6 transition-colors ${direction === -1 ? "-scale-x-100" : ""} ${disabled ? "" : "group-hover/arrow:invert"
                    }`}
            />
        </button>
    );
}

export default function IndustriesWeServe() {
    // Index of the leftmost visible card on desktop.
    const [start, setStart] = useState(0);
    const mobileScrollerRef = useRef(null);
    const mobileArrows = useCarouselArrows(mobileScrollerRef);
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { amount: 0.3 });
    const reduceMotion = useReducedMotion();
    const [paused, setPaused] = useState(false);
    const resumeTimer = useRef(null);
    const autoplay = inView && !paused && !reduceMotion;

    useEffect(() => () => clearTimeout(resumeTimer.current), []);

    // Desktop track: advance one card, wrap to the start after the end.
    useEffect(() => {
        if (!autoplay) return;
        const id = setTimeout(() => setStart((s) => (s >= MAX_START ? 0 : s + 1)), AUTOPLAY_MS);
        return () => clearTimeout(id);
    }, [autoplay, start]);

    // Mobile/tablet scroller: same rhythm, only when that scroller is showing.
    useEffect(() => {
        if (!autoplay) return;
        const id = setInterval(() => {
            const el = mobileScrollerRef.current;
            if (!el || el.offsetParent === null) return;
            if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
                el.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                scrollByOneCard(mobileScrollerRef, 1);
            }
        }, AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [autoplay]);

    const pause = () => {
        clearTimeout(resumeTimer.current);
        setPaused(true);
    };
    const resume = () => setPaused(false);
    // After a touch, give the reader a moment before auto-scroll picks up again.
    const resumeLater = () => {
        clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(resume, AUTOPLAY_MS);
    };
    // Hover pauses only for a real mouse, and focus only for keyboard focus. On
    // phones a tap also fires an emulated mouseenter (never followed by a
    // mouseleave) and focuses the arrow button, which used to leave the
    // carousel paused for good after the first touch.
    const pauseHandlers = {
        onPointerEnter: (e) => e.pointerType === "mouse" && pause(),
        onPointerLeave: (e) => e.pointerType === "mouse" && resume(),
        onFocus: (e) => e.target.matches(":focus-visible") && pause(),
        onBlur: resume,
        onTouchStart: pause,
        onTouchEnd: resumeLater,
        onTouchCancel: resumeLater,
    };

    return (
        <section ref={sectionRef} className="w-full">
            {/* Banner: the photo runs full width behind everything. The heading
                keeps the old black panel's footprint (457px wide, 32px top/bottom
                padding; stacked above a 160px photo strip on phones). A deep navy
                gradient sits behind it instead of a panel: near-solid under the
                text, then fading out across the photo (px stops on desktop so the
                text is always covered whatever the screen width). */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full overflow-hidden flex flex-col sm:flex-row"
            >
                {/* The banner is a short strip (~142px on desktop) over a 16:9 photo, so
                    centring it cut off the two walkers' heads. 35% down keeps their
                    hard hats in view from ~1024px to ~1920px wide. */}
                <Image src={bannerImg} alt="" fill sizes="100vw" className="object-cover object-[50%_35%]" />
                <div className="absolute inset-0 bg-[#1c5f85]/50 mix-blend-overlay" />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,43,62,0.92)_0%,rgba(10,43,62,0.8)_45%,rgba(10,43,62,0.15)_100%)] sm:bg-[linear-gradient(to_right,rgba(10,43,62,0.94)_0px,rgba(10,43,62,0.82)_360px,rgba(10,43,62,0.35)_620px,rgba(10,43,62,0)_900px)]"
                />
                <div className="relative flex flex-col justify-center gap-2 px-8 py-6 sm:px-[64px] sm:py-8 sm:w-[457px] shrink-0">
                    <h2 className="text-white text-[28px] font-semibold">Industries We Serve</h2>
                    <p className="text-white/85 text-lg font-light">
                        Built for the sectors that can&apos;t afford disruption
                    </p>
                </div>
                {/* Photo-only area: 48px strip on phones (kept short so the banner stays
                    compact), the rest of the row on desktop. */}
                <div aria-hidden="true" className="h-[48px] sm:h-auto sm:flex-1" />
            </motion.div>

            {/* Cards */}
            <div className="w-full bg-[#f3f6f9] px-8 py-10 sm:px-[64px] sm:pt-8 sm:pb-16">
                {/* Desktop/tablet: 4-cards-in-view track of tall cards, stepping 4 cards per click
                    (clamped at MAX_START so the last step only moves what's left) */}
                <div className="hidden lg:flex flex-col gap-6" {...pauseHandlers}>
                    <div className="w-full overflow-hidden">
                        {/* One card + one gap-8 = (100% - 96px)/4 + 32px = (100% + 32px)/4,
                            where 100% is the track's own width — the visible row's width. */}
                        <div
                            className="flex gap-8 transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(calc(-${start} * (100% + 32px) / 4))` }}
                        >
                            {INDUSTRIES.map((item) => (
                                <div key={item.title} className="w-[calc((100%-96px)/4)] shrink-0 min-w-0">
                                    <IndustryCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-6">
                        <div className="flex-1 h-2 rounded-full bg-[#d3dae2]">
                            <div
                                className="h-full rounded-full bg-[#1c5f85] transition-all duration-500 ease-out"
                                style={{ width: `${((start + PAGE_SIZE) / INDUSTRIES.length) * 100}%` }}
                            />
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <ArrowButton
                                direction={-1}
                                disabled={start === 0}
                                onClick={() => setStart((s) => Math.max(0, s - PAGE_SIZE))}
                            />
                            <ArrowButton
                                direction={1}
                                disabled={start === MAX_START}
                                onClick={() => setStart((s) => Math.min(MAX_START, s + PAGE_SIZE))}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile / tablet: horizontal snap-scroll */}
                <div className="lg:hidden flex flex-col gap-6" {...pauseHandlers}>
                    <div
                        ref={mobileScrollerRef}
                        onScroll={mobileArrows.update}
                        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory p-2 -m-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {INDUSTRIES.map((item) => (
                            <div key={item.title} className="snap-start shrink-0 w-[260px] sm:w-[300px]">
                                <IndustryCard item={item} />
                            </div>
                        ))}
                    </div>
                    {/* Progress bar on the left, arrows on the right (as in the
                        RISE with SAP Key Differentiators section). */}
                    <div className="flex items-center justify-between gap-6">
                        <div
                            role="progressbar"
                            aria-label="Industries viewed"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(mobileArrows.progress * 100)}
                            className="flex-1 max-w-[220px] h-1 bg-[#1C5F85]/15 overflow-hidden"
                        >
                            <div
                                className="h-full bg-[#1C5F85]"
                                style={{ width: `${mobileArrows.progress * 100}%` }}
                            />
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                        <ArrowButton
                            direction={-1}
                            disabled={!mobileArrows.canPrev}
                            onClick={() => scrollByOneCard(mobileScrollerRef, -1)}
                        />
                        <ArrowButton
                            direction={1}
                            disabled={!mobileArrows.canNext}
                            onClick={() => scrollByOneCard(mobileScrollerRef, 1)}
                        />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
