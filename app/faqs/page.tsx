'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { BASE_URL } from '@/utils/apiConfig';

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/faqs/faqs-list`);
        if (!response.ok) throw new Error('Failed to fetch FAQs');

        const result = await response.json();
        setFaqs(result.data ?? []);
      } catch (fetchError) {
        console.error('Error fetching FAQs:', fetchError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const categories = ['All', ...Array.from(new Set(faqs.map((faq) => faq.category)))];
  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#090908] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }} />
        <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[550px] w-[700px] -translate-x-1/2 rounded-full bg-[#c49a52]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#c49a52]">Need to know</p>
            <h1 className="text-4xl font-bold tracking-tight text-[#f0d8a0] sm:text-5xl">Frequently Asked Questions</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              Find clear answers about our services, process, and support.
            </p>
          </div>

          {!loading && faqs.length > 0 && (
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenFaq(null);
                  }}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === category
                      ? 'border-[#c49a52] bg-[#c49a52] text-[#090908]'
                      : 'border-[#c49a52]/40 text-[#d5b46e] hover:border-[#c49a52] hover:bg-[#c49a52]/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="space-y-4" aria-label="Loading FAQs">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-20 animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.04]" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-8 text-center text-red-200">
              FAQs are temporarily unavailable. Please try again shortly.
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 text-center text-gray-400">
              No FAQs found.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;

                return (
                  <div key={faq.id} className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] transition-colors hover:border-[#c49a52]/40">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
                    >
                      <span className="flex items-start gap-3 text-base font-semibold text-white sm:text-lg">
                        <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#c49a52]" />
                        {faq.question}
                      </span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-[#c49a52] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/[0.08] px-5 pb-6 pt-5 sm:px-7">
                        <p className="whitespace-pre-line leading-7 text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}