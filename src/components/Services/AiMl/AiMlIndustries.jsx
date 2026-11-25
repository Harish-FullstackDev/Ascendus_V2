"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import retail from "@/assets/Services/AiMl/icons/retail.svg";
import banking from "@/assets/Services/AiMl/icons/banking.svg";
import manufacturing from "@/assets/Services/AiMl/icons/manufacturing.svg";
import publicSector from "@/assets/Services/AiMl/icons/public-sector.svg";
import energy from "@/assets/Services/AiMl/icons/energy.svg";

const INDUSTRIES = [
    { name: "Retail & FMCG", icon: retail },
    { name: "Banking & Financial Services", icon: banking },
    { name: "Manufacturing", icon: manufacturing },
    { name: "Public Sector & Security", icon: publicSector },
    { name: "Oil, Gas & Energy", icon: energy },
];

// Phone marquee speed, in px per second, and how long it waits after a swipe
// before drifting again.
const DRIFT_SPEED = 30;
const RESUME_AFTER_MS = 2500;

// Phones: the industries row drifts on its own and can also be swiped by hand.
// It is a real horizontal scroller (so touch, momentum and wheel all work), with
// the list doubled back-to-back; whenever the scroll position passes one full
// copy in either direction it jumps back by exactly one copy, so the loop has
// no visible seam and no end. A touch stops the drift; it resumes a moment after
// the finger lifts. Reduced-motion users get the manual scroller only.
function useDriftingScroller() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const phone = window.matchMedia("(max-width: 639px)");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        let pos = 1;
        let last = performance.now();
        let holdUntil = 0;
        let frame = 0;

        // Position is kept in [1, copy + 1): far enough from 0 that a swipe back
        // still produces a scroll event to wrap on, and the drift and the wrap use
        // the same range so they never bounce the position between the two ends.
        const copyWidth = () => el.scrollWidth / 2;
        const wrap = () => {
            const copy = copyWidth();
            if (copy <= 0) return;
            if (el.scrollLeft >= copy + 1) el.scrollLeft -= copy;
            else if (el.scrollLeft < 1) el.scrollLeft += copy;
        };

        const tick = (now) => {
            const dt = Math.min(now - last, 64);
            last = now;
            if (phone.matches && !reduced.matches && now > holdUntil) {
                pos += (DRIFT_SPEED * dt) / 1000;
                const copy = copyWidth();
                if (copy > 0 && pos >= copy + 1) pos -= copy;
                el.scrollLeft = pos;
            } else {
                pos = el.scrollLeft;
            }
            frame = requestAnimationFrame(tick);
        };

        const hold = () => { holdUntil = Infinity; };
        const release = () => { holdUntil = performance.now() + RESUME_AFTER_MS; };
        // Any scroll the drift didn't make (finger, momentum, wheel, keyboard)
        // becomes the new drift position, so the drift carries on from there.
        const onScroll = () => {
            wrap();
            if (performance.now() < holdUntil || Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
        };
        const onWheel = () => { holdUntil = performance.now() + RESUME_AFTER_MS; };

        el.scrollLeft = pos;
        el.addEventListener("touchstart", hold, { passive: true });
        el.addEventListener("touchend", release, { passive: true });
        el.addEventListener("touchcancel", release, { passive: true });
        el.addEventListener("wheel", onWheel, { passive: true });
        el.addEventListener("scroll", onScroll, { passive: true });
        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            el.removeEventListener("touchstart", hold);
            el.removeEventListener("touchend", release);
            el.removeEventListener("touchcancel", release);
            el.removeEventListener("wheel", onWheel);
            el.removeEventListener("scroll", onScroll);
        };
    }, []);

    return ref;
}

export default function AiMlIndustries() {
    const scrollerRef = useDriftingScroller();

    return (
        <section className="w-full bg-[#f3f6f9] py-10 px-8 sm:p-16">
            <div className="w-full mx-auto flex flex-col items-center gap-10 sm:gap-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2 max-w-[780px] mx-auto text-center"
                >
                    <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Where AI &amp; ML <span className="text-[#2D8EC5]">Create Value</span></h2>
                    <p className="text-[#55595E] text-base sm:text-lg font-light">
                        Sectors where language, vision, and predictive models are put to work on everyday operations.
                    </p>
                </motion.div>

                {/* Wraps and centers instead of justify-between + nowrap, so the row never
                    overflows between sm and xl where five labels don't fit on one line. */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                    className="hidden sm:flex flex-wrap w-full justify-center xl:justify-between items-center gap-x-10 gap-y-6"
                >
                    {INDUSTRIES.map((industry) => (
                        <div key={industry.name} className="flex items-center gap-2">
                            <div className="relative shrink-0 size-8 sm:size-10">
                                <Image src={industry.icon} alt="" fill className="object-contain" />
                            </div>
                            <p className="text-[#2E3033] text-sm sm:text-lg font-light">{industry.name}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Mobile: drifting marquee that can also be swiped (see useDriftingScroller).
                    The list is doubled; each item carries its own right padding instead of
                    a flex gap, so one copy is exactly half the track and the loop is seamless. */}
                <div
                    ref={scrollerRef}
                    className="sm:hidden w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                    <div className="flex items-center w-max">
                        {[...INDUSTRIES, ...INDUSTRIES].map((industry, index) => (
                            <div
                                key={`${industry.name}-${index}`}
                                aria-hidden={index >= INDUSTRIES.length ? "true" : undefined}
                                className="flex items-center gap-2 shrink-0 pr-10"
                            >
                                <div className="relative shrink-0 size-8 sm:size-10">
                                    <Image src={industry.icon} alt="" fill className="object-contain" />
                                </div>
                                <p className="text-[#2E3033] text-sm font-light whitespace-nowrap">{industry.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
