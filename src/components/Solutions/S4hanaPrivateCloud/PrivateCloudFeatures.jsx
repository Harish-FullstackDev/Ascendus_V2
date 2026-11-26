"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import dedicatedIcon from "@/assets/Solutions/S4hanaPrivateCloud/icon-dedicated.svg";
import securityIcon from "@/assets/Solutions/S4hanaPrivateCloud/icon-security.svg";
import scalabilityIcon from "@/assets/Solutions/S4hanaPrivateCloud/icon-scalability.svg";
import deploymentIcon from "@/assets/Solutions/S4hanaPrivateCloud/icon-deployment.svg";
import integrationIcon from "@/assets/Solutions/S4hanaPrivateCloud/icon-integration.svg";

const ITEMS = [
    {
        icon: dedicatedIcon,
        title: "Dedicated Resources",
        desc: "Your own virtual environment, with top performance and full control over configuration, data privacy, and compliance.",
    },
    {
        icon: securityIcon,
        title: "Enhanced Security",
        desc: "Advanced access controls and encryption protect sensitive data, with security settings you can tune to your compliance standards.",
    },
    {
        icon: scalabilityIcon,
        title: "Scalability",
        desc: "Add users or enter new markets without disruption, adjusting resources as the business grows.",
    },
    {
        icon: deploymentIcon,
        title: "Custom Deployment",
        desc: "Choose a fully managed setup run by SAP, or a hybrid model that combines on-premises and cloud.",
    },
    {
        icon: integrationIcon,
        title: "Seamless Integration",
        desc: "Connect ERP with your other enterprise applications and data sources to streamline workflows and decisions.",
    },
];

export default function PrivateCloudFeatures() {
    return (
        <section className="w-full bg-[#f3f6f9] py-10 px-8 sm:p-16">
            <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12 max-w-[1390px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col gap-2 w-full lg:w-[38%] shrink-0 lg:sticky lg:top-28"
                >
                    <h2 className="text-[#2E3033] text-2xl sm:text-[28px] font-semibold">Features in <span className="text-[#2D8EC5]">S/4HANA Private Cloud</span></h2>
                    <p className="text-[#55595E] text-base sm:text-lg font-light">
                        Dedicated resources, enterprise-grade security, and deployment choices built around your
                        organization.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-col gap-8 sm:gap-10 w-full lg:flex-1 lg:min-w-0"
                >
                    {ITEMS.map((item, index) => (
                        <div key={item.title} className="flex flex-col gap-4 sm:gap-[18px]">
                            <div className="flex max-sm:flex-col items-start gap-x-[clamp(1.5rem,5vw,4rem)] gap-y-3">
                                {/* Phones: icon on a rail line, as in "How We Deliver SAP CRM". */}
                                <div className="flex items-center gap-3 max-sm:w-full">
                                    <div className="relative size-8 sm:size-10 shrink-0">
                                        <Image src={item.icon} alt="" fill className="object-contain" />
                                    </div>
                                    <div className="sm:hidden h-px flex-1 bg-[#d3dae2]" />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-3">
                                    <h3 className="font-switzer text-[#2E3033] text-xl sm:text-2xl font-semibold">{item.title}</h3>
                                    <p className="text-[#55595E] text-base sm:text-lg font-light">{item.desc}</p>
                                </div>
                            </div>
                            <div className={`h-px w-full bg-[#d3dae2] ${index === ITEMS.length - 1 ? "hidden" : "max-sm:hidden"}`} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
