import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  Clock,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  MapPin,
  Tag,
  Users,
  Wifi,
  Coffee,
  Luggage,
} from "lucide-react";

export const metadata = {
  title: "Flight Deals | Huts4u",
  description:
    "Find the best domestic flight deals — lowest fares, top airlines, flexible dates.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const featuredFlights = [
  {
    from: "DEL", to: "GOI", fromCity: "Delhi", toCity: "Goa",
    price: "₹2,499", oldPrice: "₹5,200",
    date: "Fri, Jul 4", airline: "IndiGo", duration: "2h 20m", stops: "Non-stop",
  },
  {
    from: "BOM", to: "BLR", fromCity: "Mumbai", toCity: "Bangalore",
    price: "₹1,899", oldPrice: "₹3,800",
    date: "Sat, Jul 5", airline: "Air India", duration: "1h 35m", stops: "Non-stop",
  },
  {
    from: "CCU", to: "DEL", fromCity: "Kolkata", toCity: "Delhi",
    price: "₹2,199", oldPrice: "₹4,600",
    date: "Sun, Jul 6", airline: "SpiceJet", duration: "2h 45m", stops: "Non-stop",
  },
  {
    from: "HYD", to: "BOM", fromCity: "Hyderabad", toCity: "Mumbai",
    price: "₹1,699", oldPrice: "₹3,500",
    date: "Mon, Jul 7", airline: "Vistara", duration: "1h 50m", stops: "Non-stop",
  },
  {
    from: "DEL", to: "BLR", fromCity: "Delhi", toCity: "Bangalore",
    price: "₹3,199", oldPrice: "₹6,400",
    date: "Tue, Jul 8", airline: "Air India", duration: "2h 55m", stops: "Non-stop",
  },
  {
    from: "BOM", to: "GOI", fromCity: "Mumbai", toCity: "Goa",
    price: "₹1,299", oldPrice: "₹2,800",
    date: "Wed, Jul 9", airline: "IndiGo", duration: "1h 15m", stops: "Non-stop",
  },
  {
    from: "BLR", to: "HYD", fromCity: "Bangalore", toCity: "Hyderabad",
    price: "₹999", oldPrice: "₹2,200",
    date: "Thu, Jul 10", airline: "SpiceJet", duration: "1h 10m", stops: "Non-stop",
  },
  {
    from: "CCU", to: "BOM", fromCity: "Kolkata", toCity: "Mumbai",
    price: "₹2,899", oldPrice: "₹5,600",
    date: "Fri, Jul 11", airline: "Vistara", duration: "2h 30m", stops: "Non-stop",
  },
];

const popularRoutes = [
  { image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80", city: "Goa", code: "GOI", tag: "Beach Escape", from: "₹1,299" },
  { image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80", city: "Delhi", code: "DEL", tag: "Capital City", from: "₹999" },
  { image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=900&q=80", city: "Mumbai", code: "BOM", tag: "City of Dreams", from: "₹1,199" },
  { image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=80", city: "Bangalore", code: "BLR", tag: "Garden City", from: "₹1,099" },
  { image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80", city: "Kerala", code: "COK", tag: "God's Own Country", from: "₹2,199" },
  { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80", city: "Jaipur", code: "JAI", tag: "Pink City", from: "₹1,699" },
];

const amenities = [
  { icon: Wifi, label: "Free in-flight Wi-Fi", sub: "On select airlines" },
  { icon: Coffee, label: "Complimentary meals", sub: "On full-service flights" },
  { icon: Luggage, label: "15 kg check-in baggage", sub: "Included on all bookings" },
  { icon: Users, label: "Group booking discounts", sub: "6+ passengers" },
];

function getDiscount(price: string, oldPrice: string) {
  const p = parseInt(price.replace(/[^0-9]/g, ""));
  const o = parseInt(oldPrice.replace(/[^0-9]/g, ""));
  return Math.round((1 - p / o) * 100);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FlightsPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=80"
          alt="Flight deals"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.50)_60%,rgba(0,87,217,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Zap className="h-3 w-3" /> Flight Deals
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Fly for less<br />
            <span className="text-[#FF6B35]">every season.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Top domestic routes at unbeatable fares — book today and save up to 52% off published prices.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Star,        label: "Top-rated airlines" },
              { icon: ShieldCheck, label: "Flexible cancellation" },
              { icon: Zap,         label: "Instant e-ticket" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <Icon className="h-3.5 w-3.5 text-[#FF6B35]" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="border-b border-[#E5E7EB] bg-[#F7F9FC]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#E5E7EB] px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: ShieldCheck, label: "Best price guarantee",   sub: "We match any lower fare" },
            { icon: Plane,       label: "10+ airlines",           sub: "All major domestic carriers" },
            { icon: Clock,       label: "24/7 support",           sub: "Always here to help" },
            { icon: Zap,         label: "Instant e-ticket",       sub: "Delivered in seconds" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF]">
                <Icon className="h-4 w-4 text-[#0057D9]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A2235]">{label}</p>
                <p className="text-xs text-[#64748B]">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Flight deals grid ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" /> Today&apos;s Deals
              </p>
              <h2 className="section-title">Flash fares on top routes</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredFlights.map((flight) => {
              const discount = getDiscount(flight.price, flight.oldPrice);
              return (
                <div
                  key={`${flight.from}-${flight.to}-${flight.date}`}
                  className="card-lift group block rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition"
                >
                  {/* Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-[#EEF4FF] px-2.5 py-1 text-[10px] font-bold text-[#0057D9]">
                      {flight.airline}
                    </span>
                    <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[10px] font-bold text-[#16A34A]">
                      {discount}% OFF
                    </span>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-[#1A2235]">{flight.from}</p>
                      <p className="text-xs text-[#6B7280]">{flight.fromCity}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-0.5">
                      <div className="flex w-full items-center gap-1">
                        <div className="h-px flex-1 bg-[#E5E7EB]" />
                        <Plane className="h-4 w-4 text-[#0057D9]" />
                        <div className="h-px flex-1 bg-[#E5E7EB]" />
                      </div>
                      <p className="text-[10px] text-[#9CA3AF]">{flight.duration}</p>
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-500">{flight.stops}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-[#1A2235]">{flight.to}</p>
                      <p className="text-xs text-[#6B7280]">{flight.toCity}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <Clock className="h-3.5 w-3.5" />
                      {flight.date}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#9CA3AF] line-through">{flight.oldPrice}</p>
                      <p className="text-lg font-extrabold text-[#0057D9]">{flight.price}</p>
                    </div>
                  </div>

                  <button className="mt-3 w-full rounded-full bg-[#FF6B35] py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,107,53,0.30)] transition hover:bg-[#E55A24]">
                    Book Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Popular destinations ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Top Destinations
              </p>
              <h2 className="section-title">Popular routes this month</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {popularRoutes.map((route) => (
              <div
                key={route.code}
                className="card-lift group cursor-pointer overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="relative h-28 overflow-hidden sm:h-32">
                  <Image
                    src={route.image}
                    alt={route.city}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)50vw,(max-width:1024px)33vw,16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-[#FF6B35] px-2 py-0.5 text-[9px] font-bold text-white">
                    {route.code}
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-bold text-[#1A2235] group-hover:text-[#0057D9] transition text-sm">{route.city}</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">{route.tag}</p>
                  <p className="mt-2 text-xs font-semibold text-[#0057D9]">From {route.from}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Why book with us</p>
            <h2 className="section-title mx-auto max-w-xl">Everything you need, included</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              Every flight booking comes loaded with perks — no hidden fees, no surprises at the gate.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#DBEAFE] hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                  <Icon className="h-5 w-5 text-[#0057D9]" />
                </div>
                <p className="font-bold text-[#1A2235]">{label}</p>
                <p className="mt-1 text-sm text-[#64748B]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden bg-[#0A1628] px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Tag className="h-3.5 w-3.5" /> Bundle & Save
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Add a hotel and save up to 30% more
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Bundle your flight with one of our luxury rooms and unlock exclusive package pricing — the perfect stay at the perfect price.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/rooms"
              className="rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.40)] transition hover:bg-[#E55A24]"
            >
              Browse hotel rooms
            </Link>
            <Link
              href="/deals"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              View all deals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
