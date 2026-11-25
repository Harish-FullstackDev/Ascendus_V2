"use client";

import Image from "next/image";
import heroBg from "@/assets/Solutions/SupplyChainManagement/hero.webp";

export default function Hero() {
    return (
        <div className="relative w-full h-full overflow-hidden bg-black">
            {/* The ship sits at the photo's vertical middle, right under the heading.
                sm+: the photo layer is taller than the hero (overflow clipped), which
                pushes the ship to ~65% of the hero, below the text.
                Phones: a cover-cropped tall layer showed only the middle of the ship, so
                the layer is the photo's own 3:2 shape at full screen width (whole ship,
                bow to stern), with the ship's centre at ~82% of the 340px hero, under the
                three-line heading. Its top edge fades into the black hero background. */}
            <div className="absolute inset-x-0 top-[calc(82%_-_33.33vw)] h-[66.67vw] [mask-image:linear-gradient(to_bottom,transparent,black_30%)] sm:top-0 sm:h-[130%] sm:[mask-image:none]">
                <Image src={heroBg} alt="" fill priority className="object-cover object-center" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
        </div>
    );
}
