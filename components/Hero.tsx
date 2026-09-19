"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const trustItems = [
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description: "Identity-checked community members",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description: "Moderated and respectful community",
  },
  {
    icon: LockKeyhole,
    title: "Strict Privacy",
    description: "Discreet and protected information",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#090908] text-white sm:min-h-[820px]">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[550px] w-[700px] -translate-x-1/2 rounded-full bg-[#c49a52]/10 blur-[120px]" />

        <div className="absolute -left-40 top-1/3 h-[350px] w-[350px] rounded-full bg-[#b8873d]/[0.07] blur-[100px]" />

        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#d2aa62]/[0.06] blur-[120px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#090908] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-5 pb-16 pt-32 sm:min-h-[820px] sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c49a52]/30 bg-[#c49a52]/[0.07] px-4 py-2 text-sm text-[#d7b878]"
            >
              <MapPin className="h-4 w-4" />
              <span>Lahore • Discreet & Verified Community</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-6xl lg:text-[4.15rem]"
            >
              Escort services in Lahore <br className="hidden sm:inline" />{" "}
              <span className="block bg-gradient-to-r from-[#e6c889] via-[#c49a52] to-[#9f7437] bg-clip-text text-transparent">
                03221480953
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8"
            >
          Beautiful Escorts Services in Lahore. Choose your preferred partner with complete privacy and comfort. Reliable Call Girl Services – WhatsApp us to book.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#profiles"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-[#c49a52] px-6 font-medium text-[#0b0a08] transition-all duration-300 hover:bg-[#d4ad69] hover:shadow-[0_0_35px_rgba(196,154,82,0.18)]"
              >
                Explore Verified Profiles
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#wellness"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-6 font-medium text-white/85 backdrop-blur-md transition-all duration-300 hover:border-[#c49a52]/30 hover:bg-white/[0.06]"
              >
                <Sparkles className="h-4 w-4 text-[#d0aa62]" />
                Discover Wellness
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-12 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-7 sm:grid-cols-3 sm:gap-5"
            >
              {trustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#c49a52]/20 bg-[#c49a52]/[0.07]">
                      <Icon className="h-4 w-4 text-[#d1ad68]" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white/90">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/40">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:flex"
          >
            <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[440px] lg:max-w-[420px]">
              
              {/* Glow */}
              <div className="absolute inset-8 rounded-full bg-[#c49a52]/10 blur-[90px]" />

              {/* Main visual */}
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#11110f] p-2 shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                  <img
                    src="/hot-indian-model-girl-png-hd-for-photo-editing-11644404662ujehyc0pgp.png"
                    alt="Verified call girls in Lahore"
                    className="absolute inset-0 h-full w-full object-contain object-center bg-[#171411] grayscale-[0.1] contrast-125"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#090908]/85 via-[#090908]/15 to-[#090908]/10" />

                  <div className="absolute left-8 right-8 top-8 flex items-center justify-between">
                    <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/60 backdrop-blur-md">
                      Lahore
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-xs text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Verified
                    </div>
                  </div>

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#c49a52]/20 bg-[#c49a52]/[0.05] shadow-[0_0_80px_rgba(196,154,82,0.1)]">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#c49a52]/30 bg-[#c49a52]/10">
                        <Sparkles className="h-8 w-8 text-[#d5b46e]" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom information card */}
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#c49a52]">
                          Curated Community
                        </p>

                        <h3 className="mt-2 text-xl font-medium">
                          Call Girl Services in Lahore
                        </h3>

                        <p className="mt-1 text-sm text-white/45">
                          Privacy • Respect • Trust
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c49a52]/20 bg-[#c49a52]/10">
                        <ShieldCheck className="h-5 w-5 text-[#d0aa62]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-7 -left-8 hidden w-52 rounded-2xl border border-white/10 bg-[#121210]/90 p-4 shadow-2xl backdrop-blur-xl xl:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c49a52]/10">
                    <BadgeCheck className="h-5 w-5 text-[#d0aa62]" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Identity Checked</p>
                    <p className="mt-0.5 text-xs text-white/40">
                      Verified members
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating location card */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-7 top-24 hidden w-48 rounded-2xl border border-white/10 bg-[#121210]/90 p-4 shadow-2xl backdrop-blur-xl xl:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c49a52]/10">
                    <MapPin className="h-5 w-5 text-[#d0aa62]" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Lahore</p>
                    <p className="mt-0.5 text-xs text-white/40">
                      Local community
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}