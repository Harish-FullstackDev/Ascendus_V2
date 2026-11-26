"use client";

import { motion } from "framer-motion";

const STEPS = [
    {
        title: "Requirements & Planning",
        desc: "We capture business goals, users, and requirements, then agree scope, priorities, and a delivery plan.",
    },
    {
        title: "Architecture & Design",
        desc: "We define the technical architecture, integrations, and user experience before development begins.",
    },
    {
        title: "Agile Development",
        desc: "Features are built in short iterations, with working software reviewed at the end of each sprint.",
    },
    {
        title: "Testing & Quality Assurance",
        desc: "Automated and manual testing covers functionality, performance, and security at every stage.",
    },
    {
        title: "Deployment",
        desc: "Releases go live through DevOps pipelines that keep deployments repeatable and low-risk.",
    },
    {
        title: "Maintenance & Support",
        desc: "Ongoing updates, bug fixes, and enhancements keep the software secure and aligned with user needs.",
    },
];

export default function SoftwareLifecycle() {
    return (
        <section className="w-full bg-[#f3f6f9] px-8 py-10 sm:px-[64px] sm:py-[64px] flex flex-col items-center gap-10 sm:gap-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start sm:items-center gap-2 max-w-[767px] text-left sm:text-center self-start sm:self-auto"
            >
                <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Our Software <span className="text-[#2D8EC5]">Development Lifecycle</span></h2>
                <p className="text-[#55595E] text-base sm:text-lg font-light">
                    An agile, DevOps-driven approach that takes software from idea to dependable production use.
                </p>
            </motion.div>

            {/* Centre spine on desktop with steps alternating sides; a left spine below lg.
                The spine is drawn per step, from each badge's centre down to the next
                badge, and the last step has none, so it ends at the last badge. */}
            <ol className="relative w-full max-w-[1100px]">
                {STEPS.map((step, index) => {
                    const isRight = index % 2 === 1;
                    return (
                        <motion.li
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative grid grid-cols-[40px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] gap-x-5 lg:gap-x-0 pb-8 last:pb-0 lg:pb-10"
                        >
                            {index < STEPS.length - 1 && (
                                <span className="absolute top-5 bottom-0 left-[19px] lg:left-1/2 w-px bg-[#2d8ec5]/40" aria-hidden />
                            )}
                            <div className="col-start-1 row-start-1 lg:col-start-2 flex justify-center">
                                <span className="relative z-10 flex size-10 items-center justify-center bg-[#0A3A52] text-white text-sm sm:text-base font-semibold rounded-ui-sm">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </div>
                            {/* Card is pulled up so its title's first line is centred on the
                                40px number badge: 24px top padding + half the title's line
                                height (28px / 32px) + the 1px border, minus the badge's half height (20px)
                                = 19px on phones, 21px from sm up. */}
                            <div
                                className={`col-start-2 row-start-1 -mt-[19px] sm:-mt-[21px] flex flex-col gap-2 bg-white border border-[#d3d5d8] px-6 py-6 sm:px-8 rounded-ui-md ${isRight ? "lg:col-start-3" : "lg:col-start-1 lg:text-right"}`}
                            >
                                <h2 className="text-[#2E3033] text-xl leading-[28px] sm:text-2xl sm:leading-[32px] font-semibold">{step.title}</h2>
                                <p className="text-[#55595E] text-base sm:text-lg font-light">{step.desc}</p>
                            </div>
                        </motion.li>
                    );
                })}
            </ol>
        </section>
    );
}
