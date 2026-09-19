"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MapPin,
  ShieldCheck,
  Heart,
} from "lucide-react";


const directoryLinks = [
  { label: "Verified Profiles", href: "#profiles" },
  { label: "About Us", href: "#about" },
  { label: "Wellness", href: "#about" },
  { label: "Safety & Compliance", href: "#about" },
];

const supportLinks = [
  { label: "Community Standards", href: "#about" },
  { label: "Privacy & Safety", href: "#about" },
  { label: "FAQ", href: "#about" },
  { label: "Contact Support", href: "https://wa.me/923221480953?text=Hi%20I%20need%20support" },
];

const locations = [
  "Gulberg",
  "DHA",
  "Model Town",
  "Cantt",
  "Johar Town",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#080807] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#c49a52]/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Main footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="#home" className="group inline-flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[#c49a52]/25 bg-[#c49a52]/10 transition-all duration-300 group-hover:border-[#c49a52]/50 group-hover:bg-[#c49a52]/15">
                <Image
                  src="/LOGO.png"
                  alt="Verified call girls in Lahore"
                  width={34}
                  height={34}
                  className="h-full w-full object-contain p-1"
                />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-wide text-white">
                  Lahore Girls for Date
                </p>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Verified Community
                </p>
              </div>
            </a>

            <p className="mt-6 text-sm leading-7 text-white/45">
              A privacy-focused community directory connecting verified
              adults across Lahore with trusted social and wellness
              experiences.
            </p>

            {/* Location */}
            <div className="mt-6 flex items-center gap-2 text-sm text-white/40">
              <MapPin className="h-4 w-4 text-[#c49a52]" />
              <span>Lahore, Pakistan</span>
            </div>

       

        
          </div>

          {/* Directory */}
          <div>
            <h3 className="text-sm font-medium text-white">
              Directory
            </h3>

            <ul className="mt-5 space-y-3">
              {directoryLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/40 transition-colors duration-200 hover:text-[#d5b46e]"
                  >
                    {link.label}

                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular locations */}
          <div>
            <h3 className="text-sm font-medium text-white">
              Popular Locations
            </h3>

            <ul className="mt-5 space-y-3">
              {locations.map((location) => (
                <li key={location}>
                  <a
                    href="#profiles"
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-[#d5b46e]"
                  >
                    {location}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-medium text-white">
              Safety & Assistance
            </h3>

            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group inline-flex items-center gap-1 text-sm text-white/40 transition-colors duration-200 hover:text-[#d5b46e]"
                  >
                    {link.label}

                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Trust box */}
            <div className="mt-7 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c49a52]/10">
                  <ShieldCheck className="h-4 w-4 text-[#d0aa62]" />
                </div>

                <div>
                  <p className="text-xs font-medium text-white/75">
                    Safety comes first
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-white/35">
                    We maintain community standards and encourage respectful,
                    responsible interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07]" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-xs text-white/30">
              © 2026 Lahore Girls for Date. All rights reserved.
            </p>

            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

            <p className="flex items-center gap-1.5 text-xs text-white/30">
              Made with
              <Heart className="h-3 w-3 fill-[#c49a52] text-[#c49a52]" />
              for a safer community
            </p>
          </div>

          {/* Legal */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="#about"
              className="text-xs text-white/30 transition-colors hover:text-white/65"
            >
              Terms & Safety
            </a>

            <a
              href="#profiles"
              className="text-xs text-white/30 transition-colors hover:text-white/65"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Compliance notice */}
        <div className="border-t border-white/[0.05] py-5">
          <p className="mx-auto max-w-4xl text-center text-[10px] leading-5 text-white/25">
            This platform is intended for adults aged 18 and over. Users are
            expected to follow all applicable laws and community standards.
            Commercial sexual services, exploitation, trafficking, and any
            unlawful activity are strictly prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}