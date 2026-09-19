'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, User, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BASE_URL } from '@/utils/apiConfig';
// import { Orbitron } from "next/font/google";

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   weight: ["600"], // bold weight
// });
// const orbitrondes = Orbitron({
//   subsets: ["latin"],
//   weight: ["400"], // bold weight
//   variable: "--font-orbitron",
// });


import { motion } from "framer-motion";
import Navbar from '@/components/Navbar';
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/blogs/blogs-list`);
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();
        setBlogPosts(data.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories for filtering
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPosts = activeFilter === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const primaryButtonClass =
    "bg-[#c49a52] hover:from-green-600 hover:to-green-300 text-black font-bold";

  return (
    <div className="min-h-screen">
        <Navbar/>
      
      <section className="py-24 bg-[#090908] relative overflow-hidden">
        {/* Floating Gradient Blobs */}
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
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2
              className={`text-5xl md:text-5xl font-bold mb-6 gradient-text text-[#c49a52] `}
            >
              Our Latest Insights
            </h2>
            <p
              className={`text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed`}
            >
              Explore our latest articles, guides, and insights crafted to help
              you stay ahead in the digital world.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border transition-all duration-300
                ${activeFilter === category
                    ? `${primaryButtonClass} border-0`
                    : "bg-transparent border-[#c49a52] text-[#caa360] hover:bg-gray-800/60 hover:text-white"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Blog */}
          {loadingBlogs ? (
            <FeaturedBlogSkeleton />
          ) : sortedPosts?.length === 0 ? (
            <div className="text-center text-gray-400 py-12 text-lg">
              No blog posts found.
            </div>
          ) : (
            <Card
              className="rounded-3xl mb-16 bg-black/30 border border-gray-700/40 backdrop-blur-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.35)] 
            hover:scale-[1.01] transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                {/* Image Section */}
                <div className="relative w-full">
             <Image
  src={sortedPosts[0].image}
  alt={sortedPosts[0].title}
  width={800}  // approximate width, adjust according to your layout
  height={460} // match your h-[460px]
  className="w-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
  priority     // optional: ensures image loads quickly for LCP
/>
                  <Badge
                    className={`absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full
               backdrop-blur-md border border-white/20 drop-shadow-[0_0_4px_rgba(0,0,0,0.5)] tracking-wider`}
                  >
                    Featured
                  </Badge>
                </div>

                {/* Content Section */}
                <CardContent className="p-10 flex flex-col justify-center">
                  <Badge
                    variant="outline"
                    className={`mb-4 text-[#c49a52] border-[#c49a52] inline-flex w-[170px] px-3 py-1 rounded-full text-sm font-medium `}
                  >
                    {sortedPosts[0].category}
                  </Badge>
                  <h2
                    className={`text-3xl md:text-4xl font-bold mb-4 text-white leading-tight`}
                  >
                    {sortedPosts[0].title}
                  </h2>
                  <p
                    className={`text-gray-300 text-lg mb-6 md:w-[475px] tracking-wider leading-relaxed `}
                  >
                    {sortedPosts[0].excerpt}
                  </p>

                  {/* Info */}
                  <div className={`flex flex-wrap tracking-wider items-center gap-6 text-gray-100 text-sm mb-6`}>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-[#c49a52] drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                      <span>{new Date(sortedPosts[0].date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-[#c49a52] drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                      <span>{sortedPosts[0].author}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#c49a52] drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                      <span>{sortedPosts[0].readTime}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    href={`/blog/${sortedPosts[0].id}`}
                    className={`inline-flex items-center justify-center w-full md:w-[475px] py-2 text-lg font-semibold 
                  ${primaryButtonClass} rounded-xl text-gray-900 
                  hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300 group`}
                  >
                    Read More
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingBlogs
              ? Array.from({ length: 4 }).map((_, i) => <BlogSkeleton key={i} />)
              : sortedPosts?.map((post) => (
                <Card
                  key={post.id}
                  className="group bg-black/30 border border-gray-700/40 rounded-3xl overflow-hidden 
      hover:shadow-[0_0_30px_rgba(34,197,94,0.35)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                  <Image
  src={post.image}
  alt={post.title}
  width={400}    // approximate width (adjust to layout)
  height={192}   // match h-48 (12rem = 192px)
  className="w-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
  priority       // optional: if this is above-the-fold
/>

                    <Badge
                      className={`absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full
               backdrop-blur-md border border-white/20 drop-shadow-[0_0_4px_rgba(0,0,0,0.5)] tracking-wide`}
                    >
                      {post.category}
                    </Badge>
                  </div>

                  {/* Card Header */}
                  <CardHeader className={`text-center p-5 space-y-3 flex-grow`}>
                    <h3
                      className={`text-xl font-bold text-white group-hover:text-[#c49a52] transition-colors duration-300`}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 min-h-[60px]">
                      {post.excerpt}
                    </p>
                  </CardHeader>

                  {/* Card Footer */}
                  <CardContent className="pt-0 pb-6 px-5 mt-auto">
                    <div className={`flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-gray-100 text-sm mb-6  tracking-wide`}>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-[#c49a52] drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]" />
                        <span className="font-medium">{new Date(post.date).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-[#c49a52] drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]" />
                        <span className="font-medium">{post.author}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#c49a52] drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]" />
                        <span className="font-medium">{post.readTime}</span>
                      </div>
                    </div>


                    <Link
                      href={`/blog/${post.id}`}
                      className={`inline-flex items-center justify-center w-full py-2 text-base font-semibold 
          ${primaryButtonClass} rounded-xl text-gray-900 
          hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300 group `}
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>



    </div>
  );
};

export default BlogPage;















// Blog Skeleton (projects jaisa)
const BlogSkeleton = () => (
  <div className="group rounded-3xl shadow-sm overflow-hidden border border-green-200/10 animate-pulse">
    {/* Image Skeleton */}
    <div className="w-full h-48 bg-green-200/20" />
    <div className="p-4 space-y-3">
      {/* Title */}
      <div className="h-6 w-3/4 mx-auto bg-gray-200/40 rounded" />
      {/* Excerpt */}
      <div className="h-4 w-full bg-green-200/40 rounded" />
      <div className="h-4 w-5/6 mx-auto bg-green-200/40 rounded" />

      {/* Footer (Date, Author, Time) */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="h-4 w-16 mx-auto bg-green-200/40 rounded" />
        <div className="h-4 w-20 mx-auto bg-green-200/40 rounded" />
        <div className="h-4 w-12 mx-auto bg-green-200/40 rounded" />
      </div>

      {/* Button */}
      <div className="h-10 w-full bg-green-200/40 rounded-xl mt-4" />
    </div>
  </div>
);

const FeaturedBlogSkeleton = () => (
  <Card className="rounded-3xl mb-8 shadow-sm overflow-hidden border bg-green-200/10 border-green-200/10 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Left Image Section */}
      <div className="relative h-64 lg:h-auto bg-green-200/10" />

      {/* Right Content Section */}
      <CardContent className="p-8 md:pb-2 flex flex-col md:items-start items-center justify-center">
        <div className="space-y-4 text-center md:text-left w-full">
          {/* Category */}
          <div className="h-6 w-24 bg-green-200/20 rounded mx-auto md:mx-0" />
          {/* Title */}
          <div className="h-8 w-3/4 bg-green-200/20 rounded mx-auto md:mx-0" />
          {/* Excerpt */}
          <div className="h-4 w-full bg-green-200/20 rounded" />
          <div className="h-4 w-5/6 bg-green-200/20 rounded" />

          {/* Info Section */}
          <div className="grid grid-cols-3 md:flex md:space-x-12 items-center gap-3 text-center mt-4">
            <div className="h-4 w-16 bg-green-200/30 rounded mx-auto" />
            <div className="h-4 w-20 bg-green-200/30 rounded mx-auto" />
            <div className="h-4 w-12 bg-green-200/13 rounded mx-auto" />
          </div>

          {/* Button */}
          <div className="h-10 w-full md:w-[489px] bg-green-200/10 rounded-xl mt-4 mx-auto" />
        </div>
      </CardContent>
    </div>
  </Card>
);
