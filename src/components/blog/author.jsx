"use client";

import Image from "next/image";
import authors from "@/components/blog/AuthorData";
import bgimage from "public/blog/d315b1f54a5c717d8114b27effb0c7859d99ecb9.jpg"

export default function AuthorSection() {
    return (
        <section className="py-10  bg-[#f3f6f9]" >
            <div className="max-w-9xl mx-auto px-8">
                <div className="rounded-none bg-gray-100 backdrop-blur-xl border border-white/60 shadow-lg px-8 py-10">

                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-[28px] font-semibold text-[#2E3033]">
                            Meet Our <span className="text-[#2D8EC5]">Authors</span>
                        </h2>
                        <p className="text-[#55595E] text-base sm:text-lg font-light mt-3 max-w-2xl mx-auto">
                            Our experts share practical insights on AI, ERP, CRM,
                            cloud technologies, and digital transformation.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-12">
                        {authors.map((author) => (
                            <div
                                key={author.id}
                                className="flex items-center gap-4 w-full max-w-[260px] sm:w-auto sm:max-w-none sm:min-w-[260px]"
                            >
                                <div className="shrink-0 rounded-full p-1 bg-white/50 backdrop-blur-sm border border-white/70">
                                    <Image
                                        src={author.image}
                                        alt={author.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full object-cover"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-[#2E3033]">
                                        {author.name}
                                    </h2>
                                    <p className="text-base sm:text-lg text-[#2d8ec5] font-light">
                                        {author.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}