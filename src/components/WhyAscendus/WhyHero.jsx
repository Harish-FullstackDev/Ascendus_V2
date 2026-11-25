"use client";

import Image from "next/image";
import heroBg from "@/assets/WhyAscendus/why_ascendus_hero.webp";

// Same treatment as the About hero: phones darken from the top where the copy
// sits, larger screens darken from the bottom.
export default function WhyHero() {
    return (
        <div className="relative w-full h-full overflow-hidden bg-black">
            <Image src={heroBg} alt="" fill priority className="object-cover object-center" />
            <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-black/80 to-black/30" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>
    );
}
