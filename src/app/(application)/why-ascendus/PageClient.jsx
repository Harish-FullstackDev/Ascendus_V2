"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhyHero from "@/components/WhyAscendus/WhyHero";
import PageHeroText, { PageHeroIntroMobile } from "@/components/CommonComponents/PageHeroText";
import SectionAnchorNav from "@/components/CommonComponents/SectionAnchorNav";
import TheChallenge from "@/components/WhyAscendus/TheChallenge";
import SixReasons from "@/components/WhyAscendus/SixReasons";
import HowWeDeliver from "@/components/WhyAscendus/HowWeDeliver";
import EngagementModels from "@/components/WhyAscendus/EngagementModels";
import Governance from "@/components/WhyAscendus/Governance";
import BeyondGoLive from "@/components/WhyAscendus/BeyondGoLive";
import ReadyToTransform from "@/components/AboutUs/ReadyToTransform";

// Why Ascendus answers "why should we choose you and how will you work with us"
// (content plan section 3). The Proof section (one approved case study, client
// logo or verified figure) is left out until one is approved.

const HERO_TEXT =
  "Choose a partner that looks beyond software and understands the processes, people and decisions that determine transformation success.";

const HERO_ACTIONS = [{ label: "Tell us what you need to change", href: "/contact", primary: true }];

const SECTIONS = [
  { id: "why-us", label: "Why us" },
  { id: "how-we-deliver", label: "How we deliver" },
  { id: "engagement-models", label: "Engagement models" },
  { id: "governance", label: "Governance" },
  { id: "beyond-go-live", label: "Beyond go-live" },
];

export default function PageClient() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <div className="relative -mt-[64px] lg:-mt-[68px] h-[680px] sm:h-[200vh]">
        <div className="sticky top-0 h-[340px] sm:h-screen z-0">
          <WhyHero />
        </div>

        <div className="absolute inset-x-0 top-0 h-[340px] sm:h-screen z-[5]">
          <PageHeroText
            eyebrow="Why Ascendus"
            title="Business Outcomes Before Technology Selection."
            text={HERO_TEXT}
            actions={HERO_ACTIONS}
          />
        </div>
      </div>

      {/* Not overflow-hidden: that would stop the anchor menu sticking. */}
      <div className="relative z-10 -mt-[340px] sm:-mt-[100vh] bg-white">
        <PageHeroIntroMobile text={HERO_TEXT} actions={HERO_ACTIONS} />
        <SectionAnchorNav items={SECTIONS} />
        <TheChallenge />
        <SixReasons />
        <HowWeDeliver />
        <EngagementModels />
        <Governance />
        <BeyondGoLive />
        <ReadyToTransform
          title="Let's turn your business challenge into an opportunity."
          text="Tell us what needs to improve and we will help frame the next step."
          buttonLabel="Request a Consultation"
        />
      </div>

      <Footer />
    </div>
  );
}
