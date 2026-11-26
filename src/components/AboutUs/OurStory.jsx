"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

// Content plan 2.3 item 2: a small blue uppercase label, then the story
// left-aligned in title case. The label is the section's h2 so the page outline
// still has a heading here. A founding year and founder detail go here only
// once Ascendus provides them.
//
// The two paragraphs reveal word by word as the section scrolls in, the same
// scroll-scrubbed wave as the home page's "A Technology Partner Built for
// Enterprise Complexity" section: every word starts pale and settles to the
// final navy as it is reached, and scrolling back up reverses it.
const PARAGRAPHS = [
    "Enterprise programmes rarely fail on strategy. They stall in the gaps between the team that designed the system, the team that built it and the team left to run it. Ascendus was established to connect enterprise technology with the realities of the business.",
    "We start with the operating model, the current systems, the critical processes and the compliance requirements. Then we shape a practical solution and stay with it after delivery.",
];

// One running index across both paragraphs, so the wave carries straight on
// from the first paragraph into the second.
const WORDS_BY_PARAGRAPH = (() => {
    let index = 0;
    return PARAGRAPHS.map((text) => text.split(" ").map((word) => ({ word, index: index++ })));
})();
const WORD_COUNT = WORDS_BY_PARAGRAPH.flat().length;

// Each word fades over this many words' worth of scroll, so several words are
// mid-fade at once and the reveal reads as a soft wave, not word-by-word steps.
const WORD_SPREAD = 4;
const DIM_COLOR = [199, 204, 209]; // #c7ccd1
const FINAL_COLOR = [14, 43, 75]; // #0e2b4b (Figma)

const mixColor = (a, b, t) =>
    `rgb(${a.map((channel, i) => Math.round(channel + (b[i] - channel) * t)).join(", ")})`;

// Word `index` is a pure function of the one shared `wordsRevealed` value, so
// it only brightens while scrolling down and only dims while scrolling up.
function Word({ word, index, wordsRevealed }) {
    const progress = useTransform(wordsRevealed, (v) => Math.min(1, Math.max(0, (v - index) / WORD_SPREAD)));
    const opacity = useTransform(progress, (t) => 0.18 + t * 0.82);
    const color = useTransform(progress, (t) => mixColor(DIM_COLOR, FINAL_COLOR, t));
    return <motion.span style={{ opacity, color }}>{word}</motion.span>;
}

export default function OurStory() {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // Starts once the section's top is 20% up from the bottom of the screen and
    // is complete when it reaches 45% from the top, so the story is fully
    // readable while the section is still settling into view. The spring
    // smooths wheel and trackpad steps.
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.8", "start 0.45"] });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
    const wordsRevealed = useTransform(smoothProgress, [0, 1], [0, WORD_COUNT - 1 + WORD_SPREAD], { clamp: true });

    return (
        <section id="our-story" ref={sectionRef} className="scroll-mt-16 w-full px-8 sm:px-[64px] py-10 sm:py-12">
            <div className="flex flex-col gap-3">
                <h2 className="text-[14px] font-medium uppercase tracking-[0.7px] leading-[14px] text-[#0061af]">
                    Our Story
                </h2>

                <div className="flex flex-col gap-6 text-lg sm:text-[24px] font-normal capitalize leading-[1.4] text-[#0e2b4b]">
                    {WORDS_BY_PARAGRAPH.map((words, p) => (
                        <p key={p}>
                            {reduceMotion ? (
                                PARAGRAPHS[p]
                            ) : (
                                <>
                                    <span aria-hidden="true">
                                        {words.map(({ word, index }, i) => (
                                            <span key={index}>
                                                <Word word={word} index={index} wordsRevealed={wordsRevealed} />
                                                {i < words.length - 1 ? " " : ""}
                                            </span>
                                        ))}
                                    </span>
                                    <span className="sr-only">{PARAGRAPHS[p]}</span>
                                </>
                            )}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
