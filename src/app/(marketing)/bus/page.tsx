import Image from "next/image";
import Link from "next/link";
import {
  Bus,
  Clock,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  MapPin,
  Users,
  Wifi,
  Coffee,
  CheckCircle,
  Tag,
  Wind,
  Armchair,
} from "lucide-react";

export const metadata = {
  title: "Bus Bookings | Huts4u",
  description:
    "Book sleeper buses, AC coaches, and luxury Volvo buses across India — lowest fares, top operators, instant e-ticket.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const busTypes = [
  {
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80",
    name: "Non-AC Seater",
    tag: "Economy",
    tagColor: "bg-[#16A34A] text-white",
    price: "₹199",
    unit: "avg. fare",
    seats: 40,
    description: "Affordable seater buses for short and medium routes. Best for day-time travel on a tight budget.",
    perks: ["40 seats", "Reclining seats", "Window view", "Affordable fares"],
  },
  {
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
    name: "AC Sleeper",
    tag: "Popular",
    tagColor: "bg-[#0057D9] text-white",
    price: "₹599",
    unit: "avg. fare",
    seats: 36,
    description: "Fully flat sleeper berths in an air-conditioned coach — wake up at your destination, refreshed.",
    perks: ["36 berths", "AC cabin", "Reading light", "Charging points"],
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    name: "Volvo AC Semi-Sleeper",
    tag: "Bestseller",
    tagColor: "bg-[#FF6B35] text-white",
    price: "₹450",
    unit: "avg. fare",
    seats: 41,
    description: "The most popular choice — Volvo's smooth ride, full AC, and semi-reclining seats for overnight comfort.",
    perks: ["41 seats", "Full AC", "USB charging", "Blanket provided"],
  },
  {
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
    name: "Luxury Volvo Sleeper",
    tag: "Premium",
    tagColor: "bg-[#7C3AED] text-white",
    price: "₹1,100",
    unit: "avg. fare",
    seats: 24,
    description: "Wide private berths, individual entertainment, and premium cabin service — first class on the road.",
    perks: ["24 berths", "Full AC", "Wi-Fi", "Pillow & blanket"],
  },
];

const popularRoutes = [
  { from: "Delhi",     to: "Jaipur",      duration: "5h 30m",  departs: "22:00", price: "₹350",  operator: "RSRTC"        },
  { from: "Mumbai",    to: "Pune",        duration: "3h 45m",  departs: "06:00", price: "₹280",  operator: "Neeta Travels" },
  { from: "Bangalore", to: "Goa",         duration: "9h 00m",  departs: "21:00", price: "₹650",  operator: "SRS Travels"  },
  { from: "Hyderabad", to: "Bangalore",   duration: "8h 30m",  departs: "20:30", price: "₹599",  operator: "Orange Tours" },
  { from: "Delhi",     to: "Manali",      duration: "14h 00m", departs: "17:30", price: "₹980",  operator: "HRTC"         },
  { from: "Chennai",   to: "Pondicherry", duration: "3h 00m",  departs: "07:00", price: "₹220",  operator: "TNSTC"        },
];

const destinations = [
  { image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80", city: "Goa",       from: "₹450"  },
  { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",    city: "Jaipur",    from: "₹350"  },
  { image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80", city: "Delhi",     from: "₹299"  },
  { image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80", city: "Kerala",    from: "₹799"  },
  { image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=900&q=80", city: "Mumbai",    from: "₹280"  },
  { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80", city: "Manali",    from: "₹850"  },
];

const features = [
  { icon: ShieldCheck, label: "Verified operators",     sub: "Only top-rated, licensed bus operators" },
  { icon: Wifi,        label: "Wi-Fi on luxury buses",  sub: "Stay connected on Volvo premium coaches" },
  { icon: Wind,        label: "Full AC across tiers",   sub: "All AC, Semi-sleeper, and Sleeper buses" },
  { icon: Armchair,    label: "Seat selection",         sub: "Pick your preferred seat at booking" },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BusPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=2400&q=80"
          alt="Bus bookings"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.50)_60%,rgba(0,87,217,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Bus className="h-3 w-3" /> Bus Bookings
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Travel smart, travel<br />
            <span className="text-[#FF6B35]">by bus.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Sleeper buses, AC coaches, and luxury Volvos — book 2,000+ routes across India with instant confirmation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Star,        label: "Top-rated operators" },
              { icon: ShieldCheck, label: "Free seat selection" },
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
            { icon: Bus,         label: "2,000+ routes",         sub: "Across India" },
            { icon: Users,       label: "50+ bus operators",     sub: "KSRTC, Volvo, RSRTC & more" },
            { icon: ShieldCheck, label: "Safe & verified",        sub: "Licensed operators only" },
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

      {/* ── Bus types ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <Bus className="h-3.5 w-3.5" /> Bus Types
              </p>
              <h2 className="section-title">Pick the coach that suits you</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {busTypes.map((bus) => (
              <div
                key={bus.name}
                className="card-lift group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:border-[#DBEAFE]"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={bus.image}
                    alt={bus.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${bus.tagColor}`}>
                    {bus.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Users className="h-3 w-3" /> {bus.seats} seats
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-[#1A2235] group-hover:text-[#0057D9] transition text-lg">
                    {bus.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#475569] line-clamp-2">
                    {bus.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {bus.perks.map((perk) => (
                      <span key={perk} className="rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-[10px] font-medium text-[#0057D9]">
                        {perk}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-end justify-between border-t border-[#F1F5F9] pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Starting from</p>
                      <p className="text-xl font-extrabold text-[#1A2235]">{bus.price}</p>
                      <p className="text-xs text-[#9CA3AF]">{bus.unit}</p>
                    </div>
                    <button className="rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,107,53,0.30)] transition hover:bg-[#E55A24]">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular routes ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Popular Routes
              </p>
              <h2 className="section-title">Most-booked bus routes</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularRoutes.map((route) => (
              <div
                key={`${route.from}-${route.to}`}
                className="card-lift group flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:border-[#DBEAFE]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1A2235]">
                    <span className="truncate">{route.from}</span>
                  </div>
                  <div className="my-1.5 flex items-center gap-2">
                    <div className="h-px flex-1 border-t border-dashed border-[#D1D5DB]" />
                    <Bus className="h-3.5 w-3.5 shrink-0 text-[#0057D9]" />
                    <div className="h-px flex-1 border-t border-dashed border-[#D1D5DB]" />
                  </div>
                  <div className="text-sm font-bold text-[#1A2235] truncate">{route.to}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{route.duration}</span>
                    <span className="flex items-center gap-1"><Bus className="h-3 w-3 text-[#0057D9]" />{route.operator}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Departs {route.departs}</span>
                  </div>
                </div>
                <div className="ml-4 shrink-0 text-right">
                  <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">From</p>
                  <p className="text-lg font-extrabold text-[#0057D9]">{route.price}</p>
                  <button className="mt-2 rounded-full border border-[#E5E7EB] px-3 py-1 text-xs font-semibold text-[#1A2235] transition hover:border-[#0057D9] hover:text-[#0057D9]">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top destinations ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Top Destinations
              </p>
              <h2 className="section-title">Where will the road take you?</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {destinations.map((dest) => (
              <div
                key={dest.city}
                className="card-lift group cursor-pointer overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:border-[#DBEAFE]"
              >
                <div className="relative h-28 overflow-hidden sm:h-32">
                  <Image
                    src={dest.image}
                    alt={dest.city}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)50vw,(max-width:1024px)33vw,16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-[#1A2235] group-hover:text-[#0057D9] transition">{dest.city}</p>
                  <p className="mt-1.5 text-xs font-semibold text-[#0057D9]">From {dest.from}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why book with us ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Why choose us</p>
            <h2 className="section-title mx-auto max-w-xl">Every journey, taken care of</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              We partner only with verified operators and include everything you need for a smooth ride.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, label, sub }) => (
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

      {/* ── What's included ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-md lg:flex">
            <div className="relative h-64 shrink-0 lg:h-auto lg:w-[45%]">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
                alt="Bus journey includes"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,45vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="section-label">Every booking includes</p>
              <h2 className="section-title mt-2 max-w-md">Transparent fares, zero surprises</h2>
              <p className="mt-3 text-sm text-[#475569]">
                What you see is what you pay. Every bus booking comes with these essentials — no hidden fees at the depot.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Instant e-ticket sent to email & SMS",
                  "Free seat selection at booking",
                  "GST included in displayed fare",
                  "Pillow & blanket on sleeper coaches",
                  "Boarding point & drop-off confirmed",
                  "Free cancellation up to 2 hours before departure",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#1A2235]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#0057D9]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/trains"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24]"
                >
                  Explore train routes
                </Link>
                <Link
                  href="/cabs"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#1A2235] transition hover:border-[#DBEAFE] hover:text-[#0057D9]"
                >
                  Book a cab <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden bg-[#0A1628] px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Tag className="h-3.5 w-3.5" /> Complete your trip
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Add a hotel stay to your bus trip
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Pair your bus booking with a luxury room at Huts4u — a seamless journey from your boarding point to a stunning suite.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/rooms"
              className="rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.40)] transition hover:bg-[#E55A24]"
            >
              Browse hotel rooms
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              View packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
