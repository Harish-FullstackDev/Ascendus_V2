"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AboutUsHero from "@/components/AboutUs/AboutUsHero";
import AboutUsHeroText from "@/components/AboutUs/AboutUsHeroText";
import WhatShapesHowWeDeliver from "@/components/AboutUs/WhatShapesHowWeDeliver";
import TrustedByBand from "@/components/AboutUs/TrustedByBand";
import DiscoverWhatSetsUsApart from "@/components/AboutUs/DiscoverWhatSetsUsApart";
import WhereWeHeadedAndWhy from "@/components/AboutUs/WhereWeHeadedAndWhy";
import OurStrength from "@/components/AboutUs/OurStrength";
import ClientTestimonials from "@/components/AboutUs/ClientTestimonials";
import FutureFocusedInsights from "@/components/AboutUs/FutureFocusedInsights";
import ReadyToTransform from "@/components/AboutUs/ReadyToTransform";

const page = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <div className="relative -mt-[64px] lg:-mt-[68px] h-[680px] sm:h-[200vh]">
        <div className="sticky top-0 h-[340px] sm:h-screen z-0">
          <AboutUsHero />
        </div>

        <div className="absolute inset-x-0 top-0 h-[340px] sm:h-screen z-[5]">
          <AboutUsHeroText />
        </div>
      </div>

      <div className="relative z-10 -mt-[340px] sm:-mt-[100vh] bg-white">
        <WhatShapesHowWeDeliver />
        <TrustedByBand />
        <WhereWeHeadedAndWhy />
        <DiscoverWhatSetsUsApart />
        <OurStrength />
        {/* <ClientTestimonials /> */}
        {/* <FutureFocusedInsights /> */}
        <ReadyToTransform />
      </div>

      <Footer />
    </div>
  );
};

export default page;
