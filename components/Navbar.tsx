"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  Search,
  MapPin,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

const navigationItems = [
  { label: "Home", href: "/" },
  // { label: "About", href: "/about" },
  // { label: "Plans", href: "/plans" },
  // { label: "Services", href: "/services" },
  // { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
  { label: "Faqs", href: "/faqs" },
];

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
     <header
  className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "border-b border-white/[0.08] bg-[#090908]/85 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      : "bg-transparent"
  }`}
>
  <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
    {/* ================= LOGO ================= */}
    <a
      href="#home"
      className="group flex shrink-0 items-center justify-start"
    >
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#c49a52]/60 group-hover:bg-[#c49a52]/15 sm:h-16 sm:w-16">
        <Image
          src="/LOGO.png"
          alt="Verified call girls in Lahore"
          width={48}
          height={48}
          className="h-full w-full object-contain p-1"
        />
      </div>
    </a>

    {/* ================= CENTER HEADING ================= */}
    <div className="flex flex-1 items-center justify-center text-center px-2">
      <p className="text-xs font-semibold tracking-wide text-[#f0d8a0] line-clamp-1 sm:text-sm md:text-base md:tracking-[0.06em]">
        100% Legal Wellness Business in Lahore
      </p>
    </div>

    {/* ================= DESKTOP NAV & ACTIONS ================= */}
    <div className="hidden shrink-0 items-center gap-4 lg:flex">
      <nav className="flex items-center gap-1">
        {navigationItems.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-300 ${
              pathname === link.href
                ? "text-white"
                : "text-white/60 hover:bg-white/[0.035] hover:text-white"
            }`}
          >
            {link.label}
            {pathname === link.href && (
              <span className="absolute bottom-0 left-1/2 h-px w-5 -translate-x-1/2 bg-[#c49a52]" />
            )}
          </a>
        ))}
      </nav>

      {/* Location */}
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white transition-all duration-300 hover:border-[#c49a52]/25 hover:text-white/80"
      >
        <MapPin className="h-3.5 w-3.5 text-[#c49a52]" />
        Lahore
      </button>

      {/* CTA */}
      <a
        href="https://wa.me/923221480953?text=Hi%20I%20want%20to%20chat%20with%20you"
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 rounded-lg bg-[#c49a52] px-4 py-2 text-xs font-semibold text-[#0a0907] transition-all duration-300 hover:bg-[#d5b46e] hover:shadow-[0_0_25px_rgba(196,154,82,0.15)]"
      >
        <FaWhatsapp className="h-3.5 w-3.5" />
        0322-1480953
      </a>
    </div>

    {/* ================= MOBILE ACTIONS ================= */}
    <div className="flex shrink-0 items-center gap-2 lg:hidden">
      <button
        type="button"
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileOpen}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-white/70 transition-all duration-300 hover:border-[#c49a52]/30 hover:text-[#d5b46e]"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  </div>
</header>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[88%] max-w-sm border-l border-white/[0.08] bg-[#0b0b09] shadow-2xl transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Drawer header */}
            <div className="flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-[#c49a52]/25 bg-[#c49a52]/10">
                  <Image
                    src="/LOGO.png"
                    alt="Lahore Girls Logo"
                    width={28}
                    height={28}
                    className="h-full w-full object-contain p-1"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Lahore Girls for Date
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Verified Community
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close navigation"
                onClick={closeMobileMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-1 overflow-y-auto px-5 py-7">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
                Navigation
              </p>

              <div className="space-y-1">
                {navigationItems.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200 ${
                      pathname === link.href
                        ? "bg-[#c49a52]/[0.08] text-[#d5b46e]"
                        : "text-white/60 hover:bg-white/[0.035] hover:text-white"
                    }`}
                  >
                    <span className="text-sm">{link.label}</span>

                    <ArrowRight className="h-4 w-4 opacity-40" />
                  </a>
                ))}
              </div>

              {/* Location */}
              <div className="mt-8">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
                  Location
                </p>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[#c49a52]" />

                    <span className="text-sm text-white/70">
                      Lahore, Pakistan
                    </span>
                  </div>

                  <ChevronDown className="h-4 w-4 text-white/30" />
                </button>
              </div>

              {/* Safety box */}
              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#c49a52]/10">
                    <ShieldCheck className="h-4 w-4 text-[#d0aa62]" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/80">
                      Privacy & Safety
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/35">
                      Built around verification, privacy and respectful
                      community standards.
                    </p>
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile CTA */}
            <div className="border-t border-white/[0.07] p-5">
              <a
                href="https://wa.me/923221480953?text=Hi%20I%20want%20to%20chat%20with%20you"
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c49a52] px-5 py-3.5 text-sm font-semibold text-[#0a0907] transition-all duration-300 hover:bg-[#d5b46e]"
              >
                <FaWhatsapp className="h-4 w-4" />
                0322-1480953
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}