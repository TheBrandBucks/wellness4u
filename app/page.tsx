'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Counter from '@/components/Counter';
import { motion } from "framer-motion";
import { useState } from 'react';
import {profiles} from '@/data/profile';
import {
  BadgeCheck,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Globe, Shield, Clock, FileCheck, Star,
  ArrowRight, Briefcase, BookOpen, Plane
} from 'lucide-react';
import Hero from '@/components/Hero';
import ProfileCard from '@/components/Profile';
import Footer from '@/components/footer';
import { FaWhatsapp } from 'react-icons/fa';

const stats = [
  { value: '15K+', label: 'Visas Processed' },
  { value: '98%', label: 'Success Rate' },
  { value: '60+', label: 'Countries Covered' },
  { value: '24h', label: 'Expert Response' },
];
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


const publicImages = [
  // "/hot-indian-model-girl-png-hd-for-photo-editing-11644404662ujehyc0pgp.png",
 
  "/WhatsApp%20Image%202026-09-01%20at%203.59.19%20AM%20(1).jpeg",
  "/WhatsApp%20Image%202026-09-01%20at%203.59.19%20AM%20(2).jpeg",
  "/WhatsApp%20Image%202026-09-01%20at%203.59.19%20AM.jpeg",
  "/WhatsApp%20Image%202026-09-01%20at%203.59.20%20AM%20(1).jpeg",
  "/WhatsApp%20Image%202026-09-01%20at%203.59.20%20AM.jpeg",
  "/WhatsApp%20Image%202026-09-01%20at%203.59.22%20AM%20(1).jpeg",
  "/WhatsApp%20Image%202026-09-01%20at%203.59.22%20AM.jpeg",
];

// export const profiles: Profile[] = publicImages.map((image, index) => ({
//   id: String(index + 1),
//   name: ["Zoya", "Aisha", "Maira", "Sana", "Hira", "Nimra", "Alina", "Rida", "Fariha"][index],
//   age: 22 + index,
//   profession: [
//     "Interior Architect",
//     "Fashion Stylist",
//     "Creative Director",
//     "Event Manager",
//     "Brand Consultant",
//     "Travel Host",
//     "Model",
//     "Photographer",
//     "Socialite",
//   ][index],
//   location: [
//     "Gulberg III, Lahore",
//     "DHA Phase 5, Lahore",
//     "Johar Town, Lahore",
//     "Model Town, Lahore",
//     "Bahria Town, Lahore",
//     "Garden Town, Lahore",
//     "Lahore Cantt, Lahore",
//     "Shadman, Lahore",
//     "Wapda Town, Lahore",
//   ][index],
//   image,
//   description:
//     "Contact for meetup full services",
//   interests: [
//     ["Architecture", "Art", "Travel"],
//     ["Fashion", "Beauty", "Culture"],
//     ["Photography", "Design", "Art"],
//     ["Events", "Travel", "Lifestyle"],
//     ["Branding", "Travel", "Dining"],
//     ["Cultural Tours", "Fashion", "Music"],
//     ["Modeling", "Luxury", "Style"],
//     ["Photography", "Nature", "Adventure"],
//     ["Social Events", "Dining", "Networking"],
//   ][index],
//   rating: [4.9, 4.8, 4.9, 4.7, 4.8, 4.9, 4.7, 4.8, 4.9][index],
//   verified: true,
//   available: true,
// }));
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
const services = [
  {
    icon: BookOpen,
    title: 'Student Visas',
    desc: 'Study abroad with confidence. We handle F-1, Tier-4, and student visas for top destinations worldwide.',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-700',
    borderColor: 'border-sky-100',
  },
  {
    icon: Briefcase,
    title: 'Work Visas',
    desc: 'Advance your career globally. Expert guidance for H-1B, Skilled Worker, and employment visa applications.',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    borderColor: 'border-emerald-100',
  },
  {
    icon: Plane,
    title: 'Tourist Visas',
    desc: 'Explore the world hassle-free. Fast-track tourist and visitor visa applications for 60+ countries.',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    borderColor: 'border-amber-100',
  },
];

const destinations = [
  { flag: '🇺🇸', name: 'United States', types: 3 },
  { flag: '🇬🇧', name: 'United Kingdom', types: 3 },
  { flag: '🇨🇦', name: 'Canada', types: 3 },
  { flag: '🇦🇺', name: 'Australia', types: 2 },
  { flag: '🇩🇪', name: 'Germany', types: 2 },
  { flag: '🇯🇵', name: 'Japan', types: 2 },
  { flag: '🇦🇪', name: 'UAE', types: 2 },
  { flag: '🇸🇬', name: 'Singapore', types: 2 },
];

const steps = [
  { num: '01', title: 'Select Destination', desc: 'Choose your destination country and visa category' },
  { num: '02', title: 'Review Checklist', desc: 'Get a precise document checklist for your visa type' },
  { num: '03', title: 'Submit Application', desc: 'Complete your application with expert guidance' },
];

const testimonials = [
  { name: 'Priya Sharma', from: 'India to UK', text: 'Got my Tier-4 student visa approved in just 3 weeks. The checklist feature saved me so much time!', stars: 5 },
  { name: 'Carlos Mendes', from: 'Brazil to USA', text: 'Incredible service. My F-1 visa was approved on the first attempt. Highly recommend Mz Global.', stars: 5 },
  { name: 'Yuki Tanaka', from: 'Japan to Germany', text: 'The document wizard was spot on — every item I needed was listed. Zero back-and-forth with the embassy.', stars: 5 },
];

export default function HomePage() {
  const [expanded, setExpanded] = useState(false);

  const description =
    'Get top-class Lahore escorts service with hotel room arrangements starting at affordable rates. EscortsinLahore is one of the most trusted Lahore escort agencies offering genuine, transparent, and high-quality companions right at your doorstep. We provide a wide range of stunning and professional escorts who deliver a safe, discreet, and memorable experience. Whether you want a high-profile companion for a romantic evening, social event, or private time, our verified call girls in Lahore are carefully selected for beauty, personality, and professionalism. Why choose our Lahore escorts service? We offer 100% verified and independent escorts, transparent rates, fast doorstep delivery, complete privacy, and 24/7 availability. You can hire your preferred professional escort without any advance payment, and pay only after you meet and confirm satisfaction. At EscortsinLahore, you will find a large selection of beautiful companions including young college girls, high-profile VIP models, and elegant, sophisticated ladies. Every escort is real and independent, and our call girls in Lahore are known for their charm, confidence, and the ability to create a luxurious and enjoyable atmosphere. Our services are available across Lahore with quick delivery, discreet support, and the comfort of a premium, trusted experience.';

  const preview = `${description.slice(0, 260)}...`;

  return (
    <div id="home" className="relative min-h-screen bg-slate-50">
      <Navbar />

      <a
        href="https://wa.me/923221480953?text=Hi%20I%20want%20to%20book%20a%20profile"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[99999] flex h-20 w-20 items-center justify-center rounded-full border border-[#c49a52]/30 bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(37,211,102,0.5)]"
      >
        <FaWhatsapp className="h-10 w-10 text-white" />
      </a>

      {/* Hero */}
      <Hero />

      <section id="about" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
           
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl">
                Looking for the best Escorts Services in Lahore? 
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {expanded ? description : preview}
              </p>

              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#b68235] transition hover:text-[#8d5d1a]"
              >
                {expanded ? 'Read less' : 'Read more'}
                <span aria-hidden="true">{expanded ? '−' : '+'}</span>
              </button>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  'Verified guidance',
                  'Fast response time',
                  'Country-specific support',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: 'Step-by-step clarity',
                  text: 'Clear checklists and easy instructions make every stage feel manageable.',
                },
                {
                  title: 'Expert review',
                  text: 'Our specialists help you avoid common mistakes before submission.',
                },
                {
                  title: 'Fast turnaround',
                  text: 'Smart workflows help reduce delays and keep your timeline on track.',
                },
                {
                  title: 'Secure process',
                  text: 'Your information stays protected with a discreet, carefully managed approach.',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d4ad69] hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f0e4] text-lg text-[#a66d1d]">
                    ✓
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* Profile */}
   <section
      id="profiles"
      className="bg-[#090908] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#c49a52]">
            Curated Directory
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Meet Verified Community Members
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45 sm:text-base">
            Discover verified adults across Lahore through a privacy-focused
            and respectful community directory.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </section>


  

   
    

  

      {/* Footer */}
<Footer/>
    </div>
  );
}
