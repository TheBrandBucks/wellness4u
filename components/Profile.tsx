"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Heart,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useState } from "react";

export interface Profile {
  id: string;
  name: string;
  age: number;
  profession: string;
  location: string;
  image: string;
  description: string;
  interests: string[];
  rating?: number;
  verified?: boolean;
  available?: boolean;
}

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11110f] transition-all duration-500 hover:-translate-y-1 hover:border-[#c49a52]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={profile.image}
          alt={`${profile.name} profile`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090908] via-transparent to-black/20" />

        {/* Top badges */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          {profile.verified && (
            <div className="flex items-center gap-1.5 rounded-full border border-[#d1ad68]/25 bg-[#0b0b09]/75 px-3 py-1.5 text-[11px] font-medium text-[#e0c17e] backdrop-blur-md">
              <BadgeCheck className="h-3.5 w-3.5" />
              VERIFIED
            </div>
          )}

          <button
            type="button"
            aria-label={
              liked
                ? `Remove ${profile.name} from favorites`
                : `Add ${profile.name} to favorites`
            }
            onClick={() => setLiked(!liked)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-[#c49a52]/40 hover:bg-black/60"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                liked ? "fill-[#d0aa62] text-[#d0aa62]" : "text-white/80"
              }`}
            />
          </button>
        </div>

        {/* Bottom image info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                profile.available ? "bg-emerald-400" : "bg-white/30"
              }`}
            />

            <span className="text-xs text-white/70">
              {profile.available ? "Available" : "Currently offline"}
            </span>
          </div>

          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-white">
                {profile.name}
                <span className="ml-2 text-base font-normal text-white/50">
                  {profile.age}
                </span>
              </h3>

              <p className="mt-1 text-sm text-white/60">
                {profile.profession}
              </p>
            </div>

            {profile.rating && (
              <div className="flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur-md">
                <Star className="h-3.5 w-3.5 fill-[#d0aa62] text-[#d0aa62]" />
                <span className="text-xs font-medium text-white">
                  {profile.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-white">
          <MapPin className="h-4 w-4 text-[#c49a52]" />
          <span>{profile.location}</span>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-white tracking-wider">
          {profile.description}
        </p>

        {/* Interests */}
        {/* <div className="mt-4 flex flex-wrap gap-2">
          {profile.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[11px] text-white/100 backdrop-blur-md transition-colors duration-300 hover:border-[#c49a52]/30 hover:bg-[#c49a52]/10 hover:text-[#d8b976]"
            >
              {interest}
            </span>
          ))}
        </div> */}

        {/* Divider */}
        <div className="my-5 h-px bg-white/[0.07]" />

        {/* Verification */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c49a52]/10">
              <ShieldCheck className="h-4 w-4 text-[#d0aa62]" />
            </div>

            <div>
              <p className="text-xs font-medium text-white/80">
                Identity verified
              </p>
              <p className="text-[10px] text-white/35">
                Privacy protected
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/923221480953?text=Hi%20I%20want%20to%20book%20a%20profile"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#c49a52]/25 bg-[#c49a52]/10 px-4 py-2.5 text-xs font-medium text-[#d8b976] transition-all duration-300 hover:border-[#c49a52]/50 hover:bg-[#c49a52]/15"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}