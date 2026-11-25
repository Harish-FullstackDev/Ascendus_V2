"use client";

import { useEffect, useState } from "react";

// Phones get a lighter cut of the hero video (~1.3MB) and larger screens the
// desktop cut (~2.8MB). The poster (first frame, ~24KB) shows immediately and
// covers the gap until the video starts, so the hero is never a black box.
// The source is picked after mount: the server render has only the poster,
// and each visitor downloads just the one video their screen needs.
const DESKTOP_SRC = "/sst/hero-desktop.mp4";
const MOBILE_SRC = "/sst/hero-mobile.mp4";
const POSTER_SRC = "/sst/hero-poster.webp";

export default function Hero() {
    const [src, setSrc] = useState(null);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        const update = () => setSrc(mq.matches ? MOBILE_SRC : DESKTOP_SRC);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return (
        <div
            className="relative w-full h-full overflow-hidden bg-black bg-cover bg-center"
            style={{ backgroundImage: `url(${POSTER_SRC})` }}
        >
            {src && (
                <video
                    key={src}
                    src={src}
                    poster={POSTER_SRC}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
        </div>
    );
}
