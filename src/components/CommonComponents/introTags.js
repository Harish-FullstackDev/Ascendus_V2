// Intro-section credential tags ("Seamless Migration", "Certified Experts", ...),
// one look on every page, taken from Microsoft Migration's "Why Migrate to
// Microsoft ERP for Your Business?": a 50% brand-blue hairline, deep-blue light
// text, sharp corners. White fill so the tag reads the same on white and on the
// grey (#f3f6f9) sections. Use INTRO_TAGS_CLASS on the <ul> (plus any margin or
// alignment it needs) and INTRO_TAG_CLASS on each <li>.
//
// Phones: two tags on the first line and the rest on the next (lists put their
// longest tag last, so the first two are the shortest pair). A zero-height
// ::after item with flex-basis 100% sits between the first two tags (order 0)
// and the rest (order 2) and forces the line break. Row spacing comes from a
// margin under the first two tags instead of row-gap, because row-gap would
// also open a gap around the invisible break line.
export const INTRO_TAGS_CLASS = [
    "flex flex-wrap gap-x-2 gap-y-0 sm:gap-3",
    "max-sm:after:content-[''] max-sm:after:basis-full max-sm:after:order-1",
    "max-sm:[&>li:nth-child(n+3)]:order-2 max-sm:[&>li:nth-child(-n+2)]:mb-2",
].join(" ");
// 12px text and 10px sides on phones so two tags fit on the first line on most
// pages; 16px from sm up.
export const INTRO_TAG_CLASS = "border border-[#2d8ec5]/50 bg-white px-2.5 sm:px-3 py-1 text-[#1c5f85] text-xs sm:text-base font-light rounded-ui-sm";
