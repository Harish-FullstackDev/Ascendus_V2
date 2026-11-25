"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoOnDark from "../../assets/Navbar/Ascendus_Secondary_logo.png";
import logoOnLight from "../../assets/Navbar/Ascendus_Primary_Logo.png";
import chevronDown from "../../assets/Navbar/chevron-down.svg";
import { isValidRoute } from "../Constants/Routes/routes";
import CalendlyModal from "../CommonComponents/CommonCalendy";
import { NAV_LINKS, navMegaLinks } from "./menuLinks";

const trimSlash = (path) => (path && path.length > 1 ? path.replace(/\/+$/, "") : path || "/");

// Is the current page this link, or somewhere under it?
const isUnder = (pathname, href) => {
  const here = trimSlash(pathname);
  const target = trimSlash(href);
  return target === "/" ? here === "/" : here === target || here.startsWith(`${target}/`);
};

const isEntryActive = (entry, pathname) =>
  (entry.match ?? [entry.href]).some((href) => isUnder(pathname, href)) ||
  navMegaLinks(entry).some((link) => isUnder(pathname, link.href));

// Figma's 24px chevron asset, used as a mask so it takes the text colour
// (white, the link-on-dark blue, or dark on the scrolled navbar).
const Chevron = ({ open, className = "size-6" }) => (
  <span
    aria-hidden="true"
    className={`${className} shrink-0 bg-current transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    style={{
      maskImage: `url(${chevronDown.src})`,
      WebkitMaskImage: `url(${chevronDown.src})`,
      maskSize: "100% 100%",
      WebkitMaskSize: "100% 100%",
    }}
  />
);

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  // Mobile drawer: which top-level menu (by label) and which Services group are expanded.
  const [openMobileMenu, setOpenMobileMenu] = useState(null);
  const [openMobileGroup, setOpenMobileGroup] = useState(null);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const lightThemeRoutes = ["/legal/privacy/", "/sst-errors/", "/legal/terms/", "/legal/disclaimer/"];
  const isLight = lightThemeRoutes.includes(pathname) || !isValidRoute(pathname);
  const isNavbarLight = isLight || isScrolled;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Always show the navbar near the top of the page.
      if (currentScrollY <= 10) {
        setVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // At least 10px of travel before reacting, to prevent jitter.
      const scrollDifference = currentScrollY - lastScrollY;
      if (Math.abs(scrollDifference) < 10) return;

      setVisible(scrollDifference < 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Desktop mega menu (Services / Industries), opened on hover or focus.
  const [openMegaMenu, setOpenMegaMenu] = useState(null);
  const megaCloseTimer = useRef(null);

  const openMega = (label) => {
    clearTimeout(megaCloseTimer.current);
    setOpenMegaMenu(label);
  };

  const closeMega = () => {
    clearTimeout(megaCloseTimer.current);
    setOpenMegaMenu(null);
  };

  // The pointer crosses the navbar's bottom padding between the trigger and
  // the panel; the delay covers that gap.
  const scheduleMegaClose = () => {
    clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setOpenMegaMenu(null), 150);
  };

  useEffect(() => () => clearTimeout(megaCloseTimer.current), []);

  // Close on navigation, and whenever the navbar hides itself on scroll.
  useEffect(() => {
    closeMega();
  }, [pathname]);

  useEffect(() => {
    if (!visible) closeMega();
  }, [visible]);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // Unfold the drawer down to the current page.
      const current = NAV_LINKS.find((entry) => entry.mega && isEntryActive(entry, pathname));
      setOpenMobileMenu(current?.label ?? null);
      const group = current?.columns?.flat().find((g) => g.items.some((item) => isUnder(pathname, item.href)));
      setOpenMobileGroup(group?.name ?? null);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileMenu(null);
  };

  // Colours per navbar state. Dark (over a hero) is the Figma state; light is
  // the scrolled / light-page state, where the link-on-dark blue would be too
  // pale, so the accent becomes Ascendus blue.
  const tone = isNavbarLight
    ? {
      text: "text-[#2E3033]",
      accent: "text-[#0061AF] border-[#0061AF]",
      accentText: "text-[#0061AF]",
      hoverAccent: "hover:text-[#0061AF] hover:border-[#0061AF]",
      panel: "bg-white/95 text-[#2E3033]",
      panelRule: "border-[#2E3033]",
      subLink: "text-[#4B5563] hover:text-[#0061AF]",
      groupLink: "hover:text-[#0061AF]",
    }
    : {
      text: "text-white",
      accent: "text-[#68C2F2] border-[#68C2F2]",
      accentText: "text-[#68C2F2]",
      hoverAccent: "hover:text-[#68C2F2] hover:border-[#68C2F2]",
      panel: "bg-black/70 text-white",
      panelRule: "border-white",
      subLink: "text-[#D5E2F2] hover:text-[#68C2F2]",
      groupLink: "hover:text-[#68C2F2]",
    };

  // Each top-level item: 6px padding, 18px Medium, and a 2px bottom rule that
  // shows in the accent colour when the item is current, open or hovered.
  const navItemClass = (isAccent) =>
    `flex items-center gap-[6px] p-[6px] border-b-2 whitespace-nowrap transition-colors duration-300 ${isAccent ? tone.accent : `border-transparent ${tone.text} ${tone.hoverAccent}`
    }`;

  const megaLinkProps = (href) => ({
    href,
    onClick: closeMega,
    "aria-current": isUnder(pathname, href) ? "page" : undefined,
  });

  const renderMegaPanel = (entry) => (
    <div className="flex flex-col gap-[24px]">
      <div className={`flex items-center border-b pb-[12px] ${tone.panelRule}`}>
        <Link href={entry.href} onClick={closeMega} className={`text-[24px] font-medium leading-[1.2] capitalize transition-colors ${tone.groupLink}`}>
          {entry.label}
        </Link>
      </div>

      {entry.mega === "columns" ? (
        // Grouped Services: four columns spread edge to edge.
        <div className="flex items-start justify-between gap-x-[24px]">
          {entry.columns.map((column, i) => (
            <div key={i} className="flex flex-col gap-[24px]">
              {column.map((group) => (
                <div key={group.name} className="flex flex-col gap-[16px]">
                  <p className="text-[18px] font-medium leading-[1.2]">{group.name}</p>
                  <ul className="flex flex-col gap-[16px] pl-[24px]">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          {...megaLinkProps(item.href)}
                          className={`text-[14px] font-normal leading-[1.4] transition-colors ${isUnder(pathname, item.href) ? tone.accentText : tone.subLink}`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Flat Industries: a four-column grid.
        <ul className="grid grid-cols-4 gap-[24px]">
          {entry.links.map((link) => (
            <li key={link.href}>
              <Link
                {...megaLinkProps(link.href)}
                className={`text-[18px] font-medium leading-[1.2] transition-colors ${isUnder(pathname, link.href) ? tone.accentText : tone.groupLink}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <nav
        className={`font-switzer w-full z-50 fixed top-0 left-0 transition-transform duration-300 ease-in-out ${visible || isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Desktop: links on the left, logo on the right, 64px in from each edge. */}
        <div className="hidden lg:block">
          <div className="relative w-full flex items-center justify-between gap-6 py-[24px] px-8 xl:px-[64px]">
            {/* Sibling background layer to avoid the nested backdrop-filter bug.
                While Services or Industries is open the bar takes the panel's
                background, so bar and panel read as one surface. */}
            <div
              className={`absolute inset-0 -z-10 backdrop-blur-[12px] transition-colors duration-300 ease-in-out ${openMegaMenu
                ? isNavbarLight ? "bg-white/95" : "bg-black/70"
                : isNavbarLight ? "bg-white/80 shadow-md" : "bg-black/10"
                }`}
            />

            {/* Not positioned: the mega panels anchor to the full-width row. */}
            <ul className="flex items-center gap-3 xl:gap-6 text-[16px] xl:text-[18px] font-medium leading-[1.2]">
              {NAV_LINKS.map((entry) => {
                // While a mega menu is open only its trigger is lit (as in Figma),
                // so the current page's highlight steps aside until it closes.
                const isActive = isEntryActive(entry, pathname) && !openMegaMenu;

                if (!entry.mega) {
                  return (
                    <li key={entry.label}>
                      <Link
                        href={entry.href}
                        aria-current={isActive ? "page" : undefined}
                        className={navItemClass(isActive)}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  );
                }

                const isOpen = openMegaMenu === entry.label;
                return (
                  <li
                    key={entry.label}
                    onMouseEnter={() => openMega(entry.label)}
                    onMouseLeave={scheduleMegaClose}
                    onKeyDown={(e) => e.key === "Escape" && closeMega()}
                  >
                    <Link
                      href={entry.href}
                      onFocus={() => openMega(entry.label)}
                      onClick={closeMega}
                      aria-expanded={isOpen}
                      className={navItemClass(isOpen || isActive)}
                    >
                      {entry.label}
                      <Chevron open={isOpen} />
                    </Link>

                    {/* Full-width panel flush under the navbar row. The scroll sits on
                        the inner box: a backdrop-filter element that is itself a
                        scroll container loses its blur in Chrome. */}
                    <div
                      className={`absolute left-0 top-full w-full transition-all duration-300 ${isOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-2"
                        }`}
                    >
                      <div className={`backdrop-blur-[12px] transition-colors duration-500 ${tone.panel}`}>
                        <div className="min-h-[600px] max-h-[calc(100vh-88px)] overflow-y-auto px-8 xl:px-[64px] py-[12px]">
                          {renderMegaPanel(entry)}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link href="/" onClick={closeMenu} className="shrink-0" aria-label="Ascendus Company home">
              <Image
                src={isNavbarLight ? logoOnLight : logoOnDark}
                alt="Ascendus Company logo"
                priority
                className="h-8 xl:h-10 w-auto"
              />
            </Link>
          </div>
        </div>

        {/* Mobile / tablet header */}
        <div
          className={`flex justify-between items-center lg:hidden w-full px-8 py-4 md:py-5 shadow-md transition-colors duration-500 ease-in-out backdrop-blur-[12px] ${isNavbarLight ? "bg-white/80 text-[#2E3033]" : "bg-black/70 text-white"
            }`}
        >
          {/* Menu button on the left, logo on the right. */}
          <button
            className="flex items-center justify-center p-2 -ml-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <IoMdMenu className="text-3xl sm:text-4xl" />
          </button>

          <Link href="/" onClick={closeMenu} className="flex items-center" aria-label="Ascendus Company home">
            <Image
              src={isNavbarLight ? logoOnLight : logoOnDark}
              alt="Ascendus Company logo"
              priority
              className="h-8 md:h-10 w-auto"
            />
          </Link>
        </div>
      </nav>

      {/* Full-screen mobile menu, slides in from the left (the side its button is on). */}
      <div
        className={`font-switzer fixed inset-0 lg:hidden transform transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white z-[60] flex flex-col`}
      >
        {/* Close sits where the menu button was; logo stays on the right. */}
        <div className="flex justify-between items-center px-8 py-4 md:py-5">
          <button onClick={closeMenu} aria-label="Close menu" className="flex items-center justify-center p-2 -ml-2">
            <IoMdClose className="text-3xl sm:text-4xl text-[#2E3033]" />
          </button>
          <Link href="/" onClick={closeMenu} aria-label="Ascendus Company home">
            <Image src={logoOnLight} alt="Ascendus Company logo" className="h-8 md:h-10 w-auto" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((entry) => {
              const isActive = isEntryActive(entry, pathname);
              const rowClass = `w-full flex items-center justify-between py-3 text-xl font-medium text-left transition-colors duration-300 ${isActive ? "text-[#0061AF]" : "text-[#2E3033] hover:text-[#0061AF]"
                }`;

              if (!entry.mega) {
                return (
                  <li key={entry.label}>
                    <Link href={entry.href} onClick={closeMenu} aria-current={isActive ? "page" : undefined} className={rowClass}>
                      {entry.label}
                    </Link>
                  </li>
                );
              }

              const isOpen = openMobileMenu === entry.label;
              const subLinkClass = (href) =>
                `block py-1.5 ${isUnder(pathname, href) ? "text-[#0061AF] font-medium" : "text-[#4B5563] hover:text-[#0061AF]"}`;

              return (
                <li key={entry.label}>
                  <button
                    type="button"
                    onClick={() => setOpenMobileMenu(isOpen ? null : entry.label)}
                    aria-expanded={isOpen}
                    className={rowClass}
                  >
                    {entry.label}
                    <Chevron open={isOpen} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[3000px] pb-3" : "max-h-0"}`}>
                    <ul className="border-l-2 border-[#E5E7EB] pl-4 flex flex-col">
                      <li>
                        <Link href={entry.href} onClick={closeMenu} className="block py-2 font-medium text-[#2E3033] hover:text-[#0061AF]">
                          All {entry.label.toLowerCase()}
                        </Link>
                      </li>

                      {entry.mega === "columns"
                        ? entry.columns.flat().map((group) => {
                          const isGroupOpen = openMobileGroup === group.name;
                          const isGroupHere = group.items.some((item) => isUnder(pathname, item.href));
                          return (
                            <li key={group.name}>
                              <button
                                type="button"
                                onClick={() => setOpenMobileGroup(isGroupOpen ? null : group.name)}
                                aria-expanded={isGroupOpen}
                                className={`w-full flex items-center justify-between gap-4 py-2 text-left font-medium hover:text-[#0061AF] ${isGroupHere ? "text-[#0061AF]" : "text-[#2E3033]"}`}
                              >
                                {group.name}
                                <Chevron open={isGroupOpen} className="size-5" />
                              </button>
                              {isGroupOpen && (
                                <ul className="pl-4 pb-2 text-[15px]">
                                  {group.items.map((item) => (
                                    <li key={item.href}>
                                      <Link href={item.href} onClick={closeMenu} aria-current={isUnder(pathname, item.href) ? "page" : undefined} className={subLinkClass(item.href)}>
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })
                        : entry.links.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} onClick={closeMenu} aria-current={isUnder(pathname, link.href) ? "page" : undefined} className={subLinkClass(link.href)}>
                              {link.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Spacer so light pages start below the navbar. Dark-hero pages cancel it
          with a matching -mt-[64px] lg:-mt-[68px] on their hero wrapper, so the
          hero runs up under the see-through bar as in Figma. Keep the two in
          step: any mismatch leaves a strip of white page behind the bar. */}
      <div className="h-[64px] lg:h-[68px] w-full" />

      {/* Calendly modal: kept wired for the Book-a-call button when it returns. */}
      <CalendlyModal
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
        calendlyUrl={process.env.NEXT_PUBLIC_CALENDLY_URL}
        pageSettings={{
          backgroundColor: "ffffff",
          primaryColor: "#2d8ec5",
          textColor: "#2d8ec5",
        }}
      />
    </>
  );
};

export default Navbar;
