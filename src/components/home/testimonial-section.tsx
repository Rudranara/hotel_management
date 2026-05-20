import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonial = {
  quote:
    "Huts4u made every part of our trip feel seamless. The booking flow felt calm and premium, and the hotel selection genuinely matched the quality we were looking for.",
  name: "Aarushi Mehta",
  role: "Travel Creator",
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
};

export function TestimonialSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12">
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-8 lg:rounded-3xl lg:p-12 xl:p-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-8 lg:gap-12">
          {/* Portrait: top on mobile only */}
          <div className="relative h-[260px] w-full shrink-0 overflow-hidden rounded-3xl sm:hidden">
            <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover object-top" sizes="100vw" />
          </div>

          {/* Quote content */}
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] lg:text-sm">Testimonials</p>
            <blockquote className="mt-4 text-xl font-semibold leading-relaxed text-[#111827] sm:text-2xl lg:mt-5 lg:text-3xl xl:text-4xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-5 lg:mt-6">
              <p className="text-sm font-semibold text-[#111827] lg:text-base xl:text-lg">{testimonial.name}</p>
              <p className="mt-1 text-xs text-[#6B7280] lg:text-sm xl:text-base">{testimonial.role}</p>
            </div>
            <div className="mt-5 flex gap-2.5 lg:mt-7">
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:bg-[#F9FAFB] sm:h-11 sm:w-11 lg:h-12 lg:w-12">
                <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:bg-[#F9FAFB] sm:h-11 sm:w-11 lg:h-12 lg:w-12">
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>
          </div>

          {/* Portrait: right side on sm+ only */}
          <div className="relative hidden w-[190px] shrink-0 overflow-hidden rounded-xl sm:block lg:w-[300px] lg:rounded-2xl xl:w-[360px]">
            <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" sizes="(max-width: 1024px) 190px, 360px" />
          </div>
        </div>
      </div>
    </section>
  );
}
