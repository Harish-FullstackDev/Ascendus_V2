"use client";

import { useEffect, useState } from "react";

// Sticky in-page menu for the long single pages (About, Why Ascendus). It
// sticks just under the main navbar once the hero has scrolled away (riding up
// to the screen top, in step with the navbar, when the navbar hides), lights the
// section in view, and scrolls sideways on phones. Each target section carries
// the matching id and a scroll margin so its heading lands below this bar.
export default function SectionAnchorNav({ items }) {
    const [activeId, setActiveId] = useState(items[0]?.id);

    useEffect(() => {
        const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean);
        if (!sections.length) return undefined;

        // A section counts as current once its top passes the band just under
        // the bar (the top ~30% of the screen).
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: "-64px 0px -70% 0px" }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [items]);

    return (
        <nav aria-label="On this page" className="sticky top-[var(--nav-offset,0px)] transition-[top] duration-300 ease-in-out z-40 w-full bg-white/95 backdrop-blur-[12px] border-b border-[#2E3033]/10">
            <ul className="flex items-center gap-6 sm:gap-8 overflow-x-auto px-8 sm:px-[64px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                        <li key={item.id} className="shrink-0">
                            <a
                                href={`#${item.id}`}
                                aria-current={isActive ? "true" : undefined}
                                className={`block py-4 border-b-2 text-sm sm:text-base whitespace-nowrap transition-colors ${isActive
                                    ? "border-[#0061AF] text-[#0061AF] font-medium"
                                    : "border-transparent text-[#55595E] hover:text-[#2E3033]"
                                    }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
