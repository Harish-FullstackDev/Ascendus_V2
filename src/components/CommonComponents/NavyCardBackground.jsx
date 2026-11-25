// Navy card face shared by the About "How we build" cards and the Why Ascendus
// reason cards. Resting card is primary/700 (#004174); the open card (hover or
// autoplay) fades to the home page service card's navy gradient (#0A2B3E to
// #003756) and a single faint light sweep crosses it as it opens. The sweep
// snaps back with no transition when the card closes, so it never plays
// backwards.
export default function NavyCardBackground({ isActive }) {
    return (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#004174]">
            <div
                className={`absolute inset-0 bg-[linear-gradient(to_top_right,#0A2B3E,#003756)] transition-opacity duration-500 ease-out ${isActive ? "opacity-100" : "opacity-0"}`}
            />
            <div
                className={`absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.08),transparent)] transition-transform ease-out ${isActive ? "translate-x-[300%] duration-[1400ms]" : "translate-x-0 duration-0"}`}
            />
        </div>
    );
}
