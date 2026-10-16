"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { services, type Service } from "@/data/services";
import { WHATSAPP_NUMBER } from "@/data/serviceAreas";

function ServiceCard({
  service,
  active,
  activeIndex,
  onStep,
  onSelect,
  onHoverChange,
}: {
  service: Service;
  active: Service;
  activeIndex: number;
  onStep: (delta: number) => void;
  onSelect: (index: number) => void;
  onHoverChange: (hovered: boolean) => void;
}) {
  const total = services.length;
  const [contentVisible, setContentVisible] = useState(true);

  // Re-trigger the staggered slide-up content animation whenever the slide changes
  useEffect(() => {
    setContentVisible(false);
    const timer = setTimeout(() => setContentVisible(true), 40);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I would like to inquire about ${active.title}.`
  )}`;

  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    total
  ).padStart(2, "0")}`;

  const highlightTitle = (title: string, highlight: string) => {
    const i = title.toLowerCase().indexOf(highlight.toLowerCase());
    if (i === -1) return title;
    return (
      <>
        {title.slice(0, i)}
        <span className="text-[#E8C16A]">
          {title.slice(i, i + highlight.length)}
        </span>
        {title.slice(i + highlight.length)}
      </>
    );
  };

  return (
    <article
      aria-label={service.title}
      onMouseOver={() => onHoverChange(true)}
      onMouseOut={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
      className="group relative h-[300px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(0,0,0,0.55)] sm:h-[260px]"
    >
      {/* Background slides (stacked crossfade) */}
      {services.map((s, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={s.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1088px"
              className={`object-cover object-[70%_center] transition-transform ease-out [transition-duration:1400ms] ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        );
      })}

      {/* Left-to-right readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-8">
        {/* Category badge */}
        <div
          className={`transition-all delay-150 duration-700 ease-out ${
            contentVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <span className="inline-block rounded-full border border-[#E8C16A]/40 bg-black/40 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E8C16A] backdrop-blur-sm sm:text-xs">
            {active.badge}
          </span>
        </div>

        <div
          className={`transition-all delay-200 duration-700 ease-out ${
            contentVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {/* Title */}
          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {highlightTitle(active.title, active.highlight)}
          </h3>

          {/* Description */}
          <p className="mt-2 max-w-md text-xs leading-5 text-white/70 sm:text-sm sm:leading-6">
            {active.description}
          </p>

          {/* WhatsApp CTA */}
          <div className="mt-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book ${active.title} on WhatsApp`}
              className="group/btn inline-flex items-center gap-2 rounded-full border border-[#25D366]/60 bg-black/35 px-4 py-2.5 text-xs font-semibold text-[#25D366] backdrop-blur-sm transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:shadow-[0_10px_28px_rgba(37,211,102,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] active:scale-95 sm:px-5 sm:text-sm"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              Book on WhatsApp
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Pagination dots */}
          <div className="mt-4 flex items-center gap-2">
            {services.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Show ${s.title}`}
                aria-current={i === activeIndex}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8C16A] ${
                  i === activeIndex
                    ? "w-6 bg-[#E8C16A]"
                    : "w-2 bg-white/30 hover:bg-white/55"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={() => onStep(-1)}
        aria-label={`Previous service (currently ${active.title})`}
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all duration-300 hover:border-[#E8C16A]/60 hover:text-[#E8C16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8C16A] active:scale-95 sm:left-4 sm:h-10 sm:w-10"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => onStep(1)}
        aria-label={`Next service (currently ${active.title})`}
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all duration-300 hover:border-[#E8C16A]/60 hover:text-[#E8C16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8C16A] active:scale-95 sm:right-4 sm:h-10 sm:w-10"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-5 right-5 z-10 sm:bottom-6 sm:right-6">
        <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-medium tabular-nums text-white/85 backdrop-blur-md sm:text-xs">
          {counter}
        </span>
      </div>
    </article>
  );
}

export default function OurServices() {
  const total = services.length;
  // Active slide per card — initial order is shuffled once after mount and
  // every change keeps all cards distinct (no two cards show the same slide).
  const [activeIndexes, setActiveIndexes] = useState<number[]>(() =>
    services.map((_, i) => i)
  );
  const [hoveredCount, setHoveredCount] = useState(0);

  // Randomize initial order client-side only (avoids hydration mismatch)
  useEffect(() => {
    const order = services.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setActiveIndexes(order);
  }, []);

  // Step a card forward/backward. Since the number of cards equals the number
  // of services, every slide is always visible — so stepping swaps with the
  // card that currently shows the target slide, keeping all cards distinct.
  const stepCard = useCallback(
    (cardIdx: number, delta: number) => {
      setActiveIndexes((prev) => {
        const target = (prev[cardIdx] + delta + total) % total;
        const otherIdx = prev.indexOf(target);
        if (otherIdx === cardIdx) return prev;
        const updated = [...prev];
        updated[otherIdx] = prev[cardIdx];
        updated[cardIdx] = target;
        return updated;
      });
    },
    [total]
  );

  // Direct dot selection — swap with the card currently showing that slide so
  // every card always displays a unique service
  const selectSlide = useCallback((cardIdx: number, target: number) => {
    setActiveIndexes((prev) => {
      if (prev[cardIdx] === target) return prev;
      const otherIdx = prev.indexOf(target);
      const updated = [...prev];
      if (otherIdx !== -1) updated[otherIdx] = prev[cardIdx];
      updated[cardIdx] = target;
      return updated;
    });
  }, []);

  // Random autoplay: swap a random pair of cards' slides so content keeps
  // changing randomly while every card always shows a unique service.
  // Pauses while any card is hovered/focused.
  useEffect(() => {
    if (hoveredCount > 0 || total < 2) return;
    const timer = setInterval(() => {
      setActiveIndexes((prev) => {
        if (prev.length < 2) return prev;
        const a = Math.floor(Math.random() * prev.length);
        let b = Math.floor(Math.random() * prev.length);
        if (b === a) b = (b + 1) % prev.length;
        const updated = [...prev];
        [updated[a], updated[b]] = [updated[b], updated[a]];
        return updated;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [hoveredCount, total]);

  const handleHoverChange = useCallback((hovered: boolean) => {
    setHoveredCount((c) => Math.max(0, c + (hovered ? 1 : -1)));
  }, []);

  return (
    <section
      id="our-services"
      aria-labelledby="our-services-heading"
      className="bg-[#080A0D] px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-12 bg-gradient-to-r from-transparent to-[#E8C16A]/70 sm:w-16"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8C16A]">
              What We Offer
            </p>
            <span
              aria-hidden="true"
              className="h-px w-12 bg-gradient-to-l from-transparent to-[#E8C16A]/70 sm:w-16"
            />
          </div>

          <h2
            id="our-services-heading"
            className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Our <span className="text-[#E8C16A]">Services</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
            Explore our premium services, tailored to your preferences and
            comfort.
          </p>
        </div>

        {/* Stacked service cards */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-6 sm:mt-14 sm:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              active={services[activeIndexes[index]]}
              activeIndex={activeIndexes[index]}
              onStep={(delta) => stepCard(index, delta)}
              onSelect={(target) => selectSlide(index, target)}
              onHoverChange={handleHoverChange}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
