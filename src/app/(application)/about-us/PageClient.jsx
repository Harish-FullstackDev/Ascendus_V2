"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AboutUsHero from "@/components/AboutUs/AboutUsHero";
import PageHeroText, { PageHeroIntroMobile } from "@/components/CommonComponents/PageHeroText";
import SectionAnchorNav from "@/components/CommonComponents/SectionAnchorNav";
import OurStory from "@/components/AboutUs/OurStory";
import WhatWeDo from "@/components/AboutUs/WhatWeDo";
import WhereWeHeadedAndWhy from "@/components/AboutUs/WhereWeHeadedAndWhy";
import WhatShapesHowWeDeliver from "@/components/AboutUs/WhatShapesHowWeDeliver";
import Leadership from "@/components/AboutUs/Leadership";
import WhereWeWork from "@/components/AboutUs/WhereWeWork";
import Partners from "@/components/AboutUs/Partners";
import OurStrength from "@/components/AboutUs/OurStrength";
import AboutUsInsights from "@/components/AboutUs/AboutUsInsights";
import ReadyToTransform from "@/components/AboutUs/ReadyToTransform";

// About Ascendus answers "who are you" (content plan section 2). Process content
// lives only on /why-ascendus/, so the two pages never repeat each other.
//
// Partner logos and the Ascendus at a glance figures were supplied by Ascendus.
// Removed as unsupported: the performance tiles, the "Trusted by 150+" banner,
// the testimonials and the finance filler subtitles.

const HERO_TEXT =
    "Ascendus helps organisations modernise business systems and processes through enterprise applications, finance technology and digital engineering.";

const HERO_ACTIONS = [
    { label: "Discover Ascendus", href: "#our-story", primary: true },
    { label: "Request a Consultation", href: "/book-a-consultation" },
];

const SECTIONS = [
    { id: "our-story", label: "Our story" },
    { id: "at-a-glance", label: "At a glance" },
    { id: "vision-mission", label: "Vision & mission" },
    { id: "leadership", label: "Leadership" },
    { id: "how-we-build", label: "How we build" },
    { id: "where-we-work", label: "Where we work" },
    { id: "partners", label: "Partners" },
    { id: "insights", label: "Insights" },
];

const page = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />

            <div className="relative -mt-[64px] lg:-mt-[68px] h-[680px] sm:h-[200vh]">
                <div className="sticky top-0 h-[340px] sm:h-screen z-0">
                    <AboutUsHero />
                </div>

                <div className="absolute inset-x-0 top-0 h-[340px] sm:h-screen z-[5]">
                    <PageHeroText
                        eyebrow="About Us"
                        title="An Enterprise Transformation Partner."
                        text={HERO_TEXT}
                        actions={HERO_ACTIONS}
                    />
                </div>
            </div>

            {/* Not overflow-hidden: that would stop the anchor menu sticking. */}
            <div className="relative z-10 -mt-[340px] sm:-mt-[100vh] bg-white">
                <PageHeroIntroMobile text={HERO_TEXT} actions={HERO_ACTIONS} />
                <SectionAnchorNav items={SECTIONS} />
                <OurStory />
                <WhatWeDo />
                <OurStrength />
                <WhereWeHeadedAndWhy />
                <Leadership />
                <WhatShapesHowWeDeliver />
                <WhereWeWork />
                <Partners />
                <AboutUsInsights />
                <ReadyToTransform capitalizeTitle />
            </div>

            <Footer />
        </div>
    );
};

export default page;
