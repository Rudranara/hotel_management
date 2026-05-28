import Image from "next/image";
import Link from "next/link";
import {
  Train,
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
  BedDouble,
} from "lucide-react";

export const metadata = {
  title: "Train Bookings | Huts4u",
  description:
    "Book train tickets across India — express trains, sleeper coaches, and luxury rail journeys at the best fares.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const trainClasses = [
  {
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80",
    name: "Sleeper Class",
    code: "SL",
    tag: "Economy",
    tagColor: "bg-[#16A34A] text-white",
    price: "₹350",
    unit: "avg. fare",
    description: "Budget-friendly open berths for overnight journeys. Best for solo and group travellers on a budget.",
    perks: ["3-tier berths", "Fans & lights", "Charging points", "Pantry access"],
  },
  {
    image: "https://images.unsplash.com/photo-1527684651001-731c474bbb5a?auto=format&fit=crop&w=900&q=80",
    name: "AC 3-Tier",
    code: "3A",
    tag: "Popular",
    tagColor: "bg-[#0057D9] text-white",
    price: "₹850",
    unit: "avg. fare",
    description: "Air-conditioned 3-tier coaches — the most popular choice for comfortable long-distance travel.",
    perks: ["AC cabin", "3-tier berths", "Bedroll included", "Charging points"],
  },
  {
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
    name: "AC 2-Tier",
    code: "2A",
    tag: "Comfort",
    tagColor: "bg-[#FF6B35] text-white",
    price: "₹1,350",
    unit: "avg. fare",
    description: "Wider berths, more privacy, and superior comfort for a truly restful overnight journey.",
    perks: ["AC cabin", "2-tier berths", "Bedroll included", "Curtain privacy"],
  },
  {
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=900&q=80",
    name: "First Class AC",
    code: "1A",
    tag: "Luxury",
    tagColor: "bg-[#7C3AED] text-white",
    price: "₹2,800",
    unit: "avg. fare",
    description: "Private cabins with locking doors — the pinnacle of Indian rail travel for business and leisure.",
    perks: ["Private cabin", "AC + heating", "Bedroll included", "Exclusive lounge"],
  },
];

const popularTrains = [
  { name: "Rajdhani Express",    from: "New Delhi",   to: "Mumbai Central", duration: "16h 35m", departs: "16:25",  price: "₹1,250", tag: "Premium" },
  { name: "Shatabdi Express",    from: "New Delhi",   to: "Agra Cantt",     duration: "1h 57m",  departs: "06:00",  price: "₹890",   tag: "Superfast" },
  { name: "Duronto Express",     from: "Kolkata",     to: "Mumbai",         duration: "27h 30m", departs: "08:05",  price: "₹1,640", tag: "Express" },
  { name: "Vande Bharat",        from: "New Delhi",   to: "Varanasi",       duration: "8h 03m",  departs: "06:00",  price: "₹1,900", tag: "Superfast" },
  { name: "Humsafar Express",    from: "Gorakhpur",   to: "Anand Vihar",    duration: "7h 15m",  departs: "22:30",  price: "₹960",   tag: "AC 3-Tier" },
  { name: "Garib Rath Express",  from: "Bangalore",   to: "New Delhi",      duration: "33h 45m", departs: "21:45",  price: "₹680",   tag: "Budget AC" },
];

const popularRoutes = [
  { image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80", from: "Delhi", to: "Mumbai",    distance: "1,384 km", price: "₹850"  },
  { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80", from: "Mumbai", to: "Goa",     distance: "588 km",   price: "₹450"  },
  { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",    from: "Delhi", to: "Jaipur",   distance: "304 km",   price: "₹350"  },
  { image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80", from: "Bangalore", to: "Kerala", distance: "540 km", price: "₹520"  },
  { image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",    from: "Delhi", to: "Srinagar",  distance: "820 km",   price: "₹1,200" },
  { image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80", from: "Delhi", to: "Agra",     distance: "200 km",   price: "₹280"  },
];

const features = [
  { icon: ShieldCheck, label: "IRCTC authorised",     sub: "Official ticket booking, zero extra charges" },
  { icon: Wifi,        label: "Wi-Fi on Vande Bharat", sub: "Free onboard internet on select trains" },
  { icon: Coffee,      label: "Pantry car meals",      sub: "Hot meals and snacks on long-distance trains" },
  { icon: BedDouble,   label: "Bedroll included",      sub: "On all AC class bookings" },
];

const tagColors: Record<string, string> = {
  Premium:    "bg-[#7C3AED] text-white",
  Superfast:  "bg-[#0057D9] text-white",
  Express:    "bg-[#FF6B35] text-white",
  "AC 3-Tier": "bg-[#16A34A] text-white",
  "Budget AC": "bg-[#0891B2] text-white",
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TrainsPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=2400&q=80"
          alt="Train bookings"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.50)_60%,rgba(0,87,217,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Train className="h-3 w-3" /> Train Bookings
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Travel India by rail,<br />
            <span className="text-[#FF6B35]">in comfort.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Express trains, luxury coaches, and budget sleepers — book your seat across 7,000+ stations in seconds.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Star,        label: "IRCTC authorised" },
              { icon: ShieldCheck, label: "Instant e-ticket" },
              { icon: Zap,         label: "Confirmed in seconds" },
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
            { icon: Train,       label: "7,000+ stations",      sub: "Across all Indian rail zones" },
            { icon: Users,       label: "4 travel classes",     sub: "Sleeper to First Class AC" },
            { icon: ShieldCheck, label: "IRCTC authorised",     sub: "Official & secure booking" },
            { icon: Zap,         label: "Instant e-ticket",     sub: "Delivered to your email" },
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

      {/* ── Travel classes ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <BedDouble className="h-3.5 w-3.5" /> Travel Classes
              </p>
              <h2 className="section-title">Choose your class</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trainClasses.map((cls) => (
              <div
                key={cls.code}
                className="card-lift group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:border-[#DBEAFE]"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={cls.image}
                    alt={cls.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${cls.tagColor}`}>
                    {cls.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                    {cls.code}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-[#1A2235] group-hover:text-[#0057D9] transition text-lg">
                    {cls.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#475569] line-clamp-2">
                    {cls.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cls.perks.map((perk) => (
                      <span key={perk} className="rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-[10px] font-medium text-[#0057D9]">
                        {perk}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-end justify-between border-t border-[#F1F5F9] pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Starting from</p>
                      <p className="text-xl font-extrabold text-[#1A2235]">{cls.price}</p>
                      <p className="text-xs text-[#9CA3AF]">{cls.unit}</p>
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

      {/* ── Popular trains ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" /> Featured Trains
              </p>
              <h2 className="section-title">India&apos;s most-booked trains</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularTrains.map((train) => (
              <div
                key={train.name}
                className="card-lift group rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:border-[#DBEAFE]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tagColors[train.tag] ?? "bg-[#0057D9] text-white"}`}>
                    {train.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                    <Clock className="h-3 w-3" /> {train.duration}
                  </span>
                </div>

                <h3 className="font-bold text-[#1A2235] group-hover:text-[#0057D9] transition">
                  {train.name}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-[#1A2235]">{train.from}</p>
                    <p className="text-[10px] text-[#9CA3AF]">{train.departs}</p>
                  </div>
                  <div className="flex flex-1 flex-col items-center gap-0.5">
                    <div className="flex w-full items-center gap-1">
                      <div className="h-px flex-1 border-t border-dashed border-[#D1D5DB]" />
                      <Train className="h-3.5 w-3.5 text-[#0057D9]" />
                      <div className="h-px flex-1 border-t border-dashed border-[#D1D5DB]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-[#1A2235]">{train.to}</p>
                    <p className="text-[10px] text-[#9CA3AF]">Arrives</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">From</p>
                    <p className="text-lg font-extrabold text-[#0057D9]">{train.price}</p>
                  </div>
                  <button className="rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,107,53,0.30)] transition hover:bg-[#E55A24]">
                    Book Seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular routes ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Popular Routes
              </p>
              <h2 className="section-title">Most searched rail routes</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {popularRoutes.map((route) => (
              <div
                key={`${route.from}-${route.to}`}
                className="card-lift group cursor-pointer overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:border-[#DBEAFE]"
              >
                <div className="relative h-28 overflow-hidden sm:h-32">
                  <Image
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)50vw,(max-width:1024px)33vw,16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-[#1A2235] group-hover:text-[#0057D9] transition leading-tight">
                    {route.from} → {route.to}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#9CA3AF]">{route.distance}</p>
                  <p className="mt-1.5 text-xs font-semibold text-[#0057D9]">From {route.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Onboard features ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Onboard perks</p>
            <h2 className="section-title mx-auto max-w-xl">Comfort included, every journey</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              From Wi-Fi to warm meals, our train bookings come with the amenities that make the journey as good as the destination.
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
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
                alt="Train journey includes"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,45vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="section-label">Every booking includes</p>
              <h2 className="section-title mt-2 max-w-md">Simple, transparent pricing</h2>
              <p className="mt-3 text-sm text-[#475569]">
                No service fees, no booking charges — the fare you see is what you pay. Your ticket arrives instantly.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Instant e-ticket delivered to email",
                  "GST included in displayed fare",
                  "Seat/berth number confirmed at booking",
                  "Bedroll on all AC class tickets",
                  "Free cancellation up to 4 hours before departure",
                  "PNR status tracking in real time",
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
            Add a hotel and make it a full getaway
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Book your train, then pair it with a luxury room at Huts4u — arriving well-rested has never been this seamless.
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
