"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Star, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Huts4u made every part of our trip feel seamless. The booking flow felt calm and premium, and the hotel selection genuinely matched the quality we were looking for.",
    name: "Aarushi Mehta",
    role: "Travel Creator",
    destination: "Goa, India",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
  {
    quote:
      "From the moment I landed to check-out, everything was handled beautifully. The concierge service and airport transfers were a luxurious touch we didn't expect.",
    name: "Rahul Kapoor",
    role: "Business Traveler",
    destination: "Maldives",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
  {
    quote:
      "I've used every major booking platform, but Huts4u's curated selection and AI recommendations truly elevated our honeymoon to something magical.",
    name: "Priya Sharma",
    role: "Luxury Traveler",
    destination: "Kerala, India",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
  {
    quote:
      "The flexible booking policy and 24/7 support gave us complete peace of mind during our unpredictable travel schedule. Absolutely world-class service.",
    name: "Vikram Nair",
    role: "Adventure Traveler",
    destination: "Manali, India",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
];

const trustIndicators = [
  { value: "4.9/5", label: "Rating", emoji: "⭐" },
  { value: "50,000+", label: "Travelers", emoji: "✈️" },
  { value: "Secure", label: "Booking", emoji: "🔒" },
  { value: "Best", label: "Price Guarantee", emoji: "💎" },
];

export function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(index);
      setFading(false);
    }, 220);
  }, []);

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = useCallback(() => goTo((active + 1) % testimonials.length), [active, goTo]);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[active];

  return (
    <section className="bg-[#F7F9FC] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Heading */}
        <div className="mb-8 text-center lg:mb-12">
          <p className="section-label">Testimonials</p>
          <h2 className="section-title mt-3">Loved by luxury travelers worldwide</h2>
        </div>

        {/* Carousel card */}
        <div className="relative mx-auto max-w-4xl">
          <div
            className={`rounded-3xl border border-white/70 bg-white/75 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-opacity duration-220 sm:p-10 lg:p-12 ${fading ? "opacity-0" : "opacity-100"}`}
          >
            {/* Decorative quote mark */}
            <div className="mb-4 font-serif text-6xl leading-none text-[#0057D9]/15 select-none">&ldquo;</div>

            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
              {/* Avatar column */}
              <div className="flex flex-row items-center gap-4 sm:w-[100px] sm:flex-col sm:items-center sm:gap-3 sm:text-center">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-[#0057D9]/20 sm:h-20 sm:w-20">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="sm:text-center">
                  <p className="text-sm font-bold text-[#1A2235]">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">{t.role}</p>
                  <div className="mt-1.5 flex gap-0.5 sm:justify-center">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote + badges */}
              <div className="flex-1">
                <blockquote className="text-lg font-medium leading-relaxed text-[#1A2235] sm:text-xl lg:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-medium text-[#6B7280]">
                    📍 {t.destination}
                  </span>
                  {t.verified && (
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified Traveler
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dots + arrows */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-[#0057D9]" : "w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]"}`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] shadow-sm transition hover:border-[#0057D9] hover:text-[#0057D9]"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0057D9] text-white shadow-md transition hover:bg-[#003A8C]"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-12">
          {trustIndicators.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 text-center shadow-sm transition hover:shadow-md"
            >
              <div className="text-3xl">{item.emoji}</div>
              <p className="mt-2 text-xl font-bold text-[#1A2235] sm:text-2xl">{item.value}</p>
              <p className="mt-1 text-sm text-[#6B7280]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

