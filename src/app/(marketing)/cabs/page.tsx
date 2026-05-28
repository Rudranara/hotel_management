import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Clock,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  MapPin,
  Users,
  Wifi,
  Phone,
  CheckCircle,
  Tag,
} from "lucide-react";

export const metadata = {
  title: "Cab Bookings | Huts4u",
  description:
    "Book reliable airport transfers, city rides, and outstation cabs at the best rates — instant confirmation, professional drivers.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const cabTypes = [
  {
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
    type: "Hatchback",
    example: "Swift / WagonR",
    seats: 4,
    tag: "Economy",
    tagColor: "bg-[#16A34A] text-white",
    price: "₹12",
    unit: "per km",
    description: "Affordable city rides and short-distance transfers. Best for solo travellers and couples.",
    perks: ["AC cabin", "4 seats", "15 kg luggage", "GPS tracked"],
  },
  {
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=80",
    type: "Sedan",
    example: "Dzire / Etios",
    seats: 4,
    tag: "Popular",
    tagColor: "bg-[#0057D9] text-white",
    price: "₹15",
    unit: "per km",
    description: "Comfortable sedans for city commutes and airport transfers — a step up in comfort.",
    perks: ["AC cabin", "4 seats", "20 kg luggage", "GPS tracked"],
  },
  {
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    type: "SUV",
    example: "Innova / Ertiga",
    seats: 6,
    tag: "Bestseller",
    tagColor: "bg-[#FF6B35] text-white",
    price: "₹20",
    unit: "per km",
    description: "Spacious SUVs for families and group travel — ideal for outstation trips and long journeys.",
    perks: ["AC cabin", "6 seats", "30 kg luggage", "GPS tracked"],
  },
  {
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80",
    type: "Luxury",
    example: "Mercedes / BMW",
    seats: 4,
    tag: "Premium",
    tagColor: "bg-[#7C3AED] text-white",
    price: "₹45",
    unit: "per km",
    description: "Arrive in style. Our luxury fleet offers chauffeur-driven premium sedans for special occasions.",
    perks: ["AC cabin", "4 seats", "Wi-Fi", "Chauffeur driven"],
  },
];

const popularRoutes = [
  { from: "Delhi Airport", to: "Connaught Place",     distance: "22 km", duration: "45 min", price: "₹499" },
  { from: "Mumbai Airport", to: "Bandra",             distance: "14 km", duration: "35 min", price: "₹399" },
  { from: "Bangalore Airport", to: "MG Road",         distance: "35 km", duration: "55 min", price: "₹649" },
  { from: "Hyderabad Airport", to: "Hitech City",     distance: "32 km", duration: "50 min", price: "₹599" },
  { from: "Chennai Airport", to: "T. Nagar",          distance: "16 km", duration: "40 min", price: "₹449" },
  { from: "Goa Airport", to: "Calangute Beach",       distance: "40 km", duration: "60 min", price: "₹749" },
];

const features = [
  { icon: ShieldCheck, label: "Safe & verified drivers",  sub: "All drivers background-checked and licensed" },
  { icon: Clock,       label: "On-time pickup",           sub: "Track your driver in real time" },
  { icon: Wifi,        label: "In-cab Wi-Fi",             sub: "Available on Sedan, SUV & Luxury tiers" },
  { icon: Phone,       label: "24/7 helpline",            sub: "Instant support during your ride" },
];

const outstationRoutes = [
  {
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    route: "Delhi → Agra",       distance: "230 km", price: "₹3,200", duration: "3.5 hrs",
  },
  {
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80",
    route: "Mumbai → Pune",      distance: "155 km", price: "₹2,100", duration: "2.5 hrs",
  },
  {
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    route: "Bangalore → Mysore", distance: "145 km", price: "₹1,950", duration: "2.5 hrs",
  },
  {
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    route: "Jaipur → Udaipur",   distance: "395 km", price: "₹5,400", duration: "6 hrs",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CabsPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2400&q=80"
          alt="Cab bookings"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.50)_60%,rgba(0,87,217,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Car className="h-3 w-3" /> Cab Bookings
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Rides you can rely on,<br />
            <span className="text-[#FF6B35]">every time.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Airport transfers, city rides, and outstation trips — verified drivers, transparent pricing, zero surprises.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Star,        label: "4.8 avg. driver rating" },
              { icon: ShieldCheck, label: "GPS-tracked rides" },
              { icon: Zap,         label: "Instant confirmation" },
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
            { icon: Car,         label: "4 vehicle categories",  sub: "Economy to Luxury" },
            { icon: MapPin,      label: "50+ cities covered",    sub: "Across India" },
            { icon: ShieldCheck, label: "Verified drivers",      sub: "Background-checked & licensed" },
            { icon: Zap,         label: "Instant booking",       sub: "Confirmation in seconds" },
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

      {/* ── Cab types ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <Car className="h-3.5 w-3.5" /> Vehicle Types
              </p>
              <h2 className="section-title">Pick the ride that fits</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cabTypes.map((cab) => (
              <div
                key={cab.type}
                className="card-lift group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:border-[#DBEAFE]"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={cab.image}
                    alt={cab.type}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${cab.tagColor}`}>
                    {cab.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Users className="h-3 w-3" /> {cab.seats} seats
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-[#1A2235] group-hover:text-[#0057D9] transition text-lg">
                    {cab.type}
                  </h3>
                  <p className="text-xs text-[#9CA3AF]">{cab.example}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#475569] line-clamp-2">
                    {cab.description}
                  </p>

                  {/* Perks */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cab.perks.map((perk) => (
                      <span key={perk} className="rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-[10px] font-medium text-[#0057D9]">
                        {perk}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-4 flex items-end justify-between border-t border-[#F1F5F9] pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Starting from</p>
                      <p className="text-xl font-extrabold text-[#1A2235]">{cab.price}</p>
                      <p className="text-xs text-[#9CA3AF]">{cab.unit}</p>
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

      {/* ── Popular airport routes ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Airport Transfers
              </p>
              <h2 className="section-title">Popular airport routes</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularRoutes.map((route) => (
              <div
                key={route.from}
                className="card-lift group flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:border-[#DBEAFE]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1A2235]">
                    <span className="truncate">{route.from}</span>
                  </div>
                  <div className="my-1.5 flex items-center gap-2">
                    <div className="h-px flex-1 border-t border-dashed border-[#D1D5DB]" />
                    <Car className="h-3.5 w-3.5 shrink-0 text-[#0057D9]" />
                    <div className="h-px flex-1 border-t border-dashed border-[#D1D5DB]" />
                  </div>
                  <div className="text-sm font-bold text-[#1A2235] truncate">{route.to}</div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-[#9CA3AF]">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{route.distance}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{route.duration}</span>
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

      {/* ── Outstation trips ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" /> Outstation
              </p>
              <h2 className="section-title">Top outstation routes</h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {outstationRoutes.map((r) => (
              <div
                key={r.route}
                className="card-lift group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:border-[#DBEAFE]"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.route}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-3 left-3 text-sm font-bold text-white">{r.route}</p>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-[#0057D9]" />{r.distance}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-[#0057D9]" />{r.duration}</span>
                  </div>
                  <p className="text-base font-extrabold text-[#0057D9]">{r.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ride with us ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Why choose us</p>
            <h2 className="section-title mx-auto max-w-xl">Safe, comfortable, on time</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              Every ride is designed around your comfort, safety, and peace of mind.
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
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80"
                alt="Every ride includes"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,45vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="section-label">Every ride includes</p>
              <h2 className="section-title mt-2 max-w-md">No hidden charges, ever</h2>
              <p className="mt-3 text-sm text-[#475569]">
                The price you see is the price you pay. Everything below is always included — no surprises at the end of your trip.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "GST and toll charges included",
                  "Real-time GPS ride tracking",
                  "Fully air-conditioned cabin",
                  "Professional, uniformed driver",
                  "Free waiting time (up to 15 min)",
                  "Instant e-receipt on trip completion",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#1A2235]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#0057D9]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/flights"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24]"
                >
                  Explore flight deals
                </Link>
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#1A2235] transition hover:border-[#DBEAFE] hover:text-[#0057D9]"
                >
                  View packages <ArrowRight className="h-4 w-4" />
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
            <Zap className="h-3.5 w-3.5" /> Bundle & Save
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Add a hotel stay and save even more
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Combine your cab booking with a room at Huts4u and unlock exclusive package pricing — seamless travel from the airport to your suite.
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
