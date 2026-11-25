"use client";

import Image from "next/image";
import heroBg from "@/assets/AboutUs/about_us_hero.webp";

export default function AboutUsHero() {
    return (
        <div className="relative w-full h-full overflow-hidden bg-black">
            {/* Phones (as on RISE with SAP): crop toward the two people on the right and
                darken from the top, where the hero copy sits. */}
            <Image src={heroBg} alt="" fill priority className="object-cover object-[75%_center] sm:object-center" />
            <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        </div>
    );
}
