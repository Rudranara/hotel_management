import Image from "next/image";
import Link from "next/link";
import { Plane, Package, Clock, Tag, ArrowRight, Sparkles, Zap } from "lucide-react";

// ── Flight Deals ─────────────────────────────────────────────────────────────

const flightDeals = [
  { from: "DEL", to: "GOI", fromCity: "Delhi", toCity: "Goa", price: "₹2,499", oldPrice: "₹5,200", date: "Fri, Jul 4", airline: "IndiGo", duration: "2h 20m" },
  { from: "BOM", to: "BLR", fromCity: "Mumbai", toCity: "Bangalore", price: "₹1,899", oldPrice: "₹3,800", date: "Sat, Jul 5", airline: "Air India", duration: "1h 35m" },
  { from: "CCU", to: "DEL", fromCity: "Kolkata", toCity: "Delhi", price: "₹2,199", oldPrice: "₹4,600", date: "Sun, Jul 6", airline: "SpiceJet", duration: "2h 45m" },
  { from: "HYD", to: "BOM", fromCity: "Hyderabad", toCity: "Mumbai", price: "₹1,699", oldPrice: "₹3,500", date: "Mon, Jul 7", airline: "Vistara", duration: "1h 50m" },
];

export function FlightDealsSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:py-10 lg:px-10 xl:px-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="section-label flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" />Flight Deals</p>
          <h2 className="section-title">Fly for less this season</h2>
        </div>
        <Link href="/flights" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0057D9] transition hover:text-[#003A8C] sm:flex">
          All Deals <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {flightDeals.map((deal) => (
          <Link key={`${deal.from}-${deal.to}`} href="/flights" className="card-lift group block rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-[#EEF4FF] px-2.5 py-1 text-[10px] font-semibold text-[#0057D9]">{deal.airline}</span>
              <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[10px] font-semibold text-[#16A34A]">
                {Math.round((1 - parseInt(deal.price.replace(/[^0-9]/g, "")) / parseInt(deal.oldPrice.replace(/[^0-9]/g, ""))) * 100)}% OFF
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center">
                <p className="text-xl font-extrabold text-[#1A2235]">{deal.from}</p>
                <p className="text-[10px] text-[#6B7280]">{deal.fromCity}</p>
              </div>
              <div className="flex flex-1 flex-col items-center gap-0.5">
                <div className="flex w-full items-center gap-1">
                  <div className="h-px flex-1 bg-[#E5E7EB]" />
                  <Plane className="h-3.5 w-3.5 text-[#0057D9]" />
                  <div className="h-px flex-1 bg-[#E5E7EB]" />
                </div>
                <p className="text-[10px] text-[#9CA3AF]">{deal.duration}</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-extrabold text-[#1A2235]">{deal.to}</p>
                <p className="text-[10px] text-[#6B7280]">{deal.toCity}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#F1F5F9] pt-3">
              <div className="flex items-center gap-1 text-[11px] text-[#6B7280]">
                <Clock className="h-3 w-3" />{deal.date}
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[#9CA3AF] line-through">{deal.oldPrice}</p>
                <p className="text-base font-extrabold text-[#0057D9]">{deal.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── Holiday Packages ─────────────────────────────────────────────────────────

const packages = [
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    name: "Goa Beach Fiesta", duration: "4N/5D", nights: 4, price: "₹12,499", oldPrice: "₹18,000",
    includes: ["Hotel", "Flights", "Breakfast", "Sightseeing"], tag: "Bestseller",
  },
  {
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80",
    name: "Manali Snow Adventure", duration: "5N/6D", nights: 5, price: "₹15,999", oldPrice: "₹24,000",
    includes: ["Hotel", "Flights", "All Meals", "Adventure Activities"], tag: "Top Pick",
  },
  {
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    name: "Kerala Backwater Retreat", duration: "6N/7D", nights: 6, price: "₹22,499", oldPrice: "₹32,000",
    includes: ["Heritage Hotel", "Houseboat", "Flights", "All Meals"], tag: "Luxury",
  },
  {
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    name: "Rajasthan Royal Tour", duration: "7N/8D", nights: 7, price: "₹28,999", oldPrice: "₹42,000",
    includes: ["Palace Hotels", "Flights", "Breakfast", "Desert Safari"], tag: "Popular",
  },
];

export function HolidayPackagesSection() {
  return (
    <section className="bg-gradient-to-br from-[#0A1628] to-[#0057D9] py-10 md:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#FF6B35]">
              <Package className="h-3.5 w-3.5" />Holiday Packages
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">All-inclusive getaways</h2>
            <p className="mt-2 text-sm text-white/60">Flights + Hotels + Activities bundled for the best value</p>
          </div>
          <Link href="/packages" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-white/80 transition hover:text-white sm:flex">
            All Packages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => (
            <Link key={pkg.name} href="/packages" className="card-lift group block overflow-hidden rounded-2xl bg-white/8 ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-white/12 hover:ring-white/20">
              <div className="relative h-44 overflow-hidden">
                <Image src={pkg.image} alt={pkg.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-[#FF6B35] px-2.5 py-0.5 text-[10px] font-bold text-white">{pkg.tag}</span>
                <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  <Clock className="h-3 w-3" />{pkg.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{pkg.name}</h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {pkg.includes.map((item) => (
                    <span key={item} className="flex items-center gap-0.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/75">
                      <Tag className="h-2.5 w-2.5" />{item}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-white/50">per person</p>
                    <p className="text-xs text-white/50 line-through">{pkg.oldPrice}</p>
                    <p className="text-xl font-extrabold text-white">{pkg.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="rounded-full bg-[#22C55E] px-2.5 py-1 text-[11px] font-bold text-white">
                      {Math.round((1 - parseInt(pkg.price.replace(/[^0-9]/g, "")) / parseInt(pkg.oldPrice.replace(/[^0-9]/g, ""))) * 100)}% OFF
                    </span>
                    <span className="text-[10px] text-white/50">{pkg.nights} nights</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── AI Recommended Section ───────────────────────────────────────────────────

export function AIRecommendedSection() {
  const suggestions = [
    { dest: "Coorg, Karnataka", why: "Coffee estates in full bloom · Perfect weather", price: "₹8,500/night", icon: "🌿" },
    { dest: "Spiti Valley, HP", why: "Rare clear skies · Limited crowd season", price: "₹6,200/night", icon: "🏔️" },
    { dest: "Hampi, Karnataka", why: "UNESCO site · Budget-friendly stays", price: "₹3,800/night", icon: "🏛️" },
    { dest: "Ziro, Arunachal", why: "Festival season · Offbeat experience", price: "₹5,100/night", icon: "🎋" },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:py-10 lg:px-10 xl:px-12">
      <div className="mb-8">
        <p className="section-label flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" />AI Recommended</p>
        <h2 className="section-title">Trips picked just for you</h2>
        <p className="mt-2 text-sm text-[#6B7280]">Based on trending searches and seasonal insights</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {suggestions.map((s) => (
          <Link key={s.dest} href="/rooms" className="card-lift group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <span className="text-3xl">{s.icon}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-[#1A2235]">{s.dest}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{s.why}</p>
              <p className="mt-2 text-sm font-bold text-[#0057D9]">from {s.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
