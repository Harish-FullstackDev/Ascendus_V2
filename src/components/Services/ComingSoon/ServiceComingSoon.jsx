"use client";

// Placeholder for a service page whose content is not written yet. It keeps
// the URL live (linked from the navbar) on the same dark hero the other
// service pages open with, and points visitors to a consultation instead.
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import heroBg from "@/assets/sst-cta.webp";

export default function ServiceComingSoon({ category, title }) {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />

            <section className="relative -mt-[64px] lg:-mt-[68px] min-h-[560px] sm:min-h-screen flex items-center overflow-hidden bg-black">
                <Image src={heroBg} alt="" fill priority className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40" />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-[1057px] px-8 sm:px-16 pt-24"
                >
                    {category && (
                        <p className="text-white/90 text-sm sm:text-lg lg:text-xl uppercase tracking-wide font-light">
                            {category}
                        </p>
                    )}
                    <div className="mt-3 sm:mt-1 h-px w-full bg-white/40" />
                    <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-semibold mt-6 leading-tight">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-[640px] text-base sm:text-xl font-light text-white/90">
                        Full details for this service are coming soon. Talk to our team in the
                        meantime and we will walk you through how we can help.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/book-a-consultation/"
                            className="border border-white bg-white px-6 py-2 text-lg font-normal text-black text-center transition-colors hover:bg-transparent hover:text-white"
                        >
                            Book a Consultation
                        </Link>
                        <Link
                            href="/services/"
                            className="border border-[#d0d0d0] px-6 py-2 text-lg font-light text-white text-center transition-colors hover:bg-white hover:text-black"
                        >
                            View All Services
                        </Link>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
