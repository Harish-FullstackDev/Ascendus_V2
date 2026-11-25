"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// For hover-highlight card grids that stack into one column on phones. Phones
// have no hover, so below sm the highlight follows scroll instead: whichever
// card crosses a thin band across the middle of the viewport becomes active.
//
// Returns `isPhone` (pause autoplay while it is true) and `cardRef(index)` to
// attach to each card.
export default function usePhoneScrollHighlight(setActiveIndex) {
    const [isPhone, setIsPhone] = useState(false);
    const cards = useRef([]);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        const update = () => setIsPhone(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!isPhone) return undefined;
        // Top and bottom 45% of the viewport are cut off, leaving a 10% band
        // in the middle; the card intersecting it is the one being read.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const index = cards.current.indexOf(entry.target);
                    if (index !== -1) setActiveIndex(index);
                });
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );
        cards.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [isPhone, setActiveIndex]);

    const cardRef = useCallback(
        (index) => (el) => {
            cards.current[index] = el;
        },
        []
    );

    return { isPhone, cardRef };
}
