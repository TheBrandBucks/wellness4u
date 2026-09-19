import type { Profile } from "@/components/Profile";

export const profiles: Profile[] = [
  {
    id: "1",
    name: "Zoya",
    age: 26,
    profession: "Interior Architect",
    location: "Gulberg III, Lahore",
    image: "/images/profile-1.jpg",
    description:
      "Creative professional interested in architecture, design, culture and meaningful conversations.",
    interests: ["Architecture", "Art", "Travel"],
    rating: 4.9,
    verified: true,
    available: true,
  },

  {
    id: "2",
    name: "Aima",
    age: 28,
    profession: "Creative Director",
    location: "DHA Phase 5, Lahore",
    image: "/images/profile-2.jpg",
    description:
      "Creative professional with interests in fashion, photography and contemporary culture.",
    interests: ["Fashion", "Photography", "Culture"],
    rating: 4.8,
    verified: true,
    available: true,
  },
];