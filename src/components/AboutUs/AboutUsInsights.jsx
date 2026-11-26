"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staticBlogsData } from "@/data/blogsData";

// "Our Insights" above the closing CTA, as the ref About page (Figma 695:482)
// places it: intro on the left, three cards on the right (image, uppercase
// topic, one-line description, text link). The ref repeated one placeholder
// tile; this shows real blog posts instead, the newest one from each of three
// different categories, so the cards never repeat a topic.
const INSIGHTS = (() => {
    const seen = new Set();
    return [...staticBlogsData]
        .sort((a, b) => b.publish_date.localeCompare(a.publish_date))
        .filter((post) => !seen.has(post.category) && seen.add(post.category))
        .slice(0, 3);
})();

export default function AboutUsInsights() {
    return (
        <section id="insights" className="scroll-mt-16 w-full bg-white px-6 sm:px-[64px] py-10 sm:py-16">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col gap-4 lg:w-[34%] lg:shrink-0"
                >
                    <p className="text-[14px] font-semibold uppercase leading-4 tracking-[0.7px] text-[#0061af]">Our Insights</p>
                    <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-medium capitalize leading-[1.2] text-[#0e2b4b]">
                        Ideas that inspire.
                        <br />
                        Insights that drive impact.
                    </h2>
                    <p className="text-sm sm:text-base font-normal capitalize leading-[1.5] text-[#415773]">
                        Explore perspectives, trends and practical ideas shaping the future of business, technology and
                        digital transformation.
                    </p>
                </motion.div>

                <ul className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
                    {INSIGHTS.map((post, index) => (
                        <motion.li
                            key={post.slug}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                        >
                            <Link
                                href={`/blog/${post.slug}/`}
                                className="group flex h-full flex-col overflow-hidden rounded-ui-md border border-[#d3dae2] bg-white transition-shadow duration-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)]"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e9edf2] rounded-ui-md">
                                    <Image
                                        src={post.cover_image}
                                        alt=""
                                        fill
                                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 100vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-2 p-5">
                                    <h3 className="text-base font-medium uppercase tracking-[0.5px] text-[#0e2b4b]">{post.category}</h3>
                                    <p className="text-sm leading-[1.4] text-[#415773]">{post.title}</p>
                                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm text-[#0e2b4b] group-hover:text-[#0061af]">
                                        Read Article
                                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
