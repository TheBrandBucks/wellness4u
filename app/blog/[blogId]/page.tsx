// app/blog/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { BASE_URL } from "@/utils/apiConfig";
interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  createdAt: string;
  category: string;
  image: string;
  readTime: string;
}
import { Orbitron } from "next/font/google";
import { CalendarDays, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600"], // bold weight
});
const orbitrondes = Orbitron({
  subsets: ["latin"],
  weight: ["400"], // bold weight
  variable: "--font-orbitron",
});
// Dynamic Blog Page
export default async function BlogDetailsPage({ params }: { params: { blogId: string } }) {
  const { blogId } = params;
  // API call (backend se data fetch)
  const res = await fetch(`${BASE_URL}/api/v1/blogs/single-blog/${blogId}`, {
    cache: "no-store", // hamesha fresh data ke liye
  });
  if (!res.ok) return notFound();
  const data = await res.json();
  const blog: Blog = await data.data;
  // console.log("Single blog:", blog)
  return (
    <div className="min-h-screen bg-black">
      <Navbar/>
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
      <section className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 min-h-[58vh] mt-20`}>
        {/* Blog Hero Image */}
          <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[550px] w-[700px] -translate-x-1/2 rounded-full bg-[#c49a52]/10 blur-[120px]" />

       

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48" />
      </div>
        <div className="relative w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[410px] mb-8 rounded-b-2xl sm:rounded-b-3xl overflow-hidden shadow-2xl">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
            <span className="px-3 sm:px-4 py-1 rounded-full animated-white-border text-xs sm:text-sm font-semibold shadow-md">
              {blog.category}
            </span>
          </div>
        </div>
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold leading-snug sm:leading-tight mb-6">
          <span className={`text-[#c49a52]`}>
            {blog.title}
          </span>
        </h1>
        {/* Author + Read Time + Date */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-gray-500 text-sm sm:text-base">
          {/* Author */}
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#c49a52] drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]" />
            <span className="font-medium">{blog.author}</span>
          </div>

          {/* Read Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#c49a52] drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]" />
            <span className="font-medium">{blog.readTime}</span>
          </div>

          {/* Published Date */}
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-[#c49a52] drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]" />
            <span className="font-medium">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Blog Content */}
        <article className="prose prose-base sm:prose-lg lg:prose-xl prose-blue max-w-none text-gray-400 leading-relaxed space-y-5 sm:space-y-6">
          {blog.content
            .split(/\n+/) // split by new lines
            .map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
        </article>
      </section>


    </div>


  );
}
