"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Users, Building2, MapPin, Star } from "lucide-react";

const stats = [
  { icon: Users, end: 2, unit: "M+", label: "Happy Travelers", decimal: false },
  { icon: Building2, end: 50, unit: "K+", label: "Luxury Stays", decimal: false },
  { icon: MapPin, end: 500, unit: "+", label: "Destinations", decimal: false },
  { icon: Star, end: 4.9, unit: "/5", label: "Average Rating", decimal: true },
];

function AnimatedCounter({
  end,
  unit,
  decimal,
}: {
  end: number;
  unit: string;
  decimal: boolean;
}) {
  const [count, setCount] = useState(decimal ? end - 1 : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  const animate = useCallback(() => {
    if (animated.current) return;
    animated.current = true;
    const start = decimal ? end - 1 : 0;
    const steps = 40;
    const duration = 1800;
    const increment = (end - start) / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const current = start + increment * step;
      if (step >= steps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
  }, [end, decimal]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animate();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : Math.floor(count)}
      {unit}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="travel-gradient py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mb-8 text-center lg:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            By the Numbers
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Trusted by travelers across the world
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/8 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/12 lg:p-8"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
                  <Icon className="h-7 w-7 text-white" strokeWidth={1.6} />
                </div>
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  <AnimatedCounter end={stat.end} unit={stat.unit} decimal={stat.decimal} />
                </p>
                <p className="mt-2 text-sm font-medium text-white/60 lg:text-base">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
