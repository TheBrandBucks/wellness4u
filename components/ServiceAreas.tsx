"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { serviceAreas, WHATSAPP_NUMBER, type ServiceArea } from "@/data/serviceAreas";

// Deterministic order on server + first client render; shuffled once after mount
// so every visit shows a random order without a hydration mismatch.
function useShuffledAreas() {
  const [areas, setAreas] = useState(serviceAreas);

  useEffect(() => {
    const copy = [...serviceAreas];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setAreas(copy);
  }, []);

  return areas;
}

export default function ServiceAreas() {
  const areas = useShuffledAreas();
  const total = areas.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = areas[activeIndex];

  const carouselRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  // `request` changes on every click so clicking the same area again re-scrolls
  const [mapView, setMapView] = useState<{ area: ServiceArea; request: number } | null>(null);

  const showOnMap = useCallback((area: ServiceArea) => {
    setMapView((prev) => ({ area, request: (prev?.request ?? 0) + 1 }));
  }, []);

  useEffect(() => {
    if (mapView) mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [mapView]);

  const backToLocations = () =>
    carouselRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  // Autoplay: jump to a random slide every few seconds (never repeats the current one)
  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        let next = Math.floor(Math.random() * total);
        if (next === current) next = (next + 1) % total;
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, total]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I would like to inquire about your services in ${active.name}, ${active.city}.`
  )}`;

  return (
    <section
      id="service-areas"
      aria-labelledby="service-areas-heading"
      className="bg-[#0B0D10] px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-12 bg-gradient-to-r from-transparent to-[#E9C46A]/70 sm:w-16"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E9C46A]">
              Areas We Cover
            </p>
            <span
              aria-hidden="true"
              className="h-px w-12 bg-gradient-to-l from-transparent to-[#E9C46A]/70 sm:w-16"
            />
          </div>

          <h2
            id="service-areas-heading"
            className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Explore Our
            <br />
            <span className="text-[#E9C46A]">Service</span> Areas
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
            Discover available services in your preferred location. We are here
            to serve you.
          </p>
        </div>

        {/* Carousel card */}
        <div ref={carouselRef} className="mx-auto mt-12 max-w-6xl sm:mt-14">
          <div
            className="relative h-[440px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:h-[500px] lg:h-[560px]"
            onMouseOver={() => setPaused(true)}
            onMouseOut={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {/* Slides (stacked for smooth crossfade) */}
            {areas.map((area, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={area.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1152px"
                    className={`object-cover transition-transform ease-out [transition-duration:1400ms] ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                  />

                  {/* Readability overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />

                  {/* Photo credit (required by the image's Creative Commons licence) */}
                  <a
                    href={area.imageCredit.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isActive ? 0 : -1}
                    className="absolute right-4 top-4 z-10 max-w-[38%] truncate rounded-full bg-black/40 px-2.5 py-1 text-[10px] text-white/60 backdrop-blur-sm transition-colors hover:text-white sm:right-6 sm:top-6 sm:max-w-[45%]"
                  >
                    Photo: {area.imageCredit.author} · {area.imageCredit.license}
                  </a>

                  {/* Location badge */}
                  <div
                    className={`absolute left-5 top-5 transition-all delay-150 duration-700 ease-out sm:left-7 sm:top-7 ${
                      isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => showOnMap(area)}
                      tabIndex={isActive ? 0 : -1}
                      aria-label={`Show ${area.name}, ${area.city} on the map below`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-colors hover:border-[#E9C46A]/60 hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9C46A] sm:text-sm"
                    >
                      <MapPin className="h-4 w-4 text-[#E9C46A]" aria-hidden="true" />
                      {area.name}, {area.city}
                    </button>
                  </div>

                  {/* Bottom content */}
                  <div
                    className={`absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 transition-all delay-200 duration-700 ease-out sm:p-8 lg:p-10 ${
                      isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <div className="max-w-2xl">
                      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                        {area.name}, {area.city}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                        {area.description}
                      </p>
                    </div>

                    <div>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isActive ? 0 : -1}
                        aria-label={`Chat on WhatsApp about services in ${area.name}, ${area.city}`}
                        className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:bg-[#1eb857] hover:shadow-[0_14px_36px_rgba(37,211,102,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] active:scale-95 sm:px-6"
                      >
                        <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                        Chat on WhatsApp
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Prev / Next arrows */}
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous service area"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all duration-300 hover:border-[#E9C46A]/60 hover:bg-black/65 hover:text-[#E9C46A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9C46A] active:scale-95 sm:left-5 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next service area"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all duration-300 hover:border-[#E9C46A]/60 hover:bg-black/65 hover:text-[#E9C46A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9C46A] active:scale-95 sm:right-5 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>

            {/* Slide counter */}
            <div className="absolute bottom-5 right-5 z-10 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10">
              <span className="rounded-full border border-white/15 bg-black/45 px-3.5 py-1.5 text-xs font-medium tabular-nums text-white backdrop-blur-md sm:text-sm">
                {activeIndex + 1} / {total}
              </span>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {areas.map((area, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}: ${area.name}, ${area.city}`}
                  aria-current={isActive}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9C46A] ${
                    isActive
                      ? "w-8 bg-[#E9C46A]"
                      : "w-2.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* In-page map for the location chosen from a card's badge */}
        {mapView && (
          <div
            ref={mapRef}
            className="mx-auto mt-12 max-w-6xl scroll-mt-24 sm:mt-14"
            aria-live="polite"
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-white sm:text-2xl">
                <MapPin className="h-5 w-5 text-[#E9C46A]" aria-hidden="true" />
                {mapView.area.name}, {mapView.area.city}
              </h3>
              <button
                type="button"
                onClick={backToLocations}
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-[#E9C46A]/60 hover:text-[#E9C46A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9C46A] sm:self-auto"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
                Back to locations
              </button>
            </div>
            <div className="h-[360px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:h-[460px]">
              <iframe
                key={mapView.area.id}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${mapView.area.name}, ${mapView.area.city}, Pakistan`
                )}&z=14&output=embed`}
                title={`Map of ${mapView.area.name}, ${mapView.area.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
