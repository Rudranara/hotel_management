import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Clock,
  Tag,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  Plane,
  Utensils,
  Camera,
  Headphones,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "Holiday Packages | Huts4u",
  description:
    "All-inclusive holiday packages — flights, hotels, meals and activities bundled for the best value.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const allPackages = [
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    name: "Goa Beach Fiesta",
    destination: "Goa, India",
    duration: "4N/5D",
    nights: 4,
    price: "₹12,499",
    oldPrice: "₹18,000",
    includes: ["Hotel", "Flights", "Breakfast", "Sightseeing"],
    tag: "Bestseller",
    description: "Sun, sand, and seafood — the perfect quick escape to India's most beloved beach destination.",
  },
  {
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80",
    name: "Manali Snow Adventure",
    destination: "Manali, Himachal Pradesh",
    duration: "5N/6D",
    nights: 5,
    price: "₹15,999",
    oldPrice: "₹24,000",
    includes: ["Hotel", "Flights", "All Meals", "Adventure Activities"],
    tag: "Top Pick",
    description: "Snowfields, adventure sports, and cozy mountain lodges in the heart of the Himalayas.",
  },
  {
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    name: "Kerala Backwater Retreat",
    destination: "Kerala, India",
    duration: "6N/7D",
    nights: 6,
    price: "₹22,499",
    oldPrice: "₹32,000",
    includes: ["Heritage Hotel", "Houseboat", "Flights", "All Meals"],
    tag: "Luxury",
    description: "Drift through lush backwaters on a private houseboat — the most serene experience in India.",
  },
  {
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    name: "Rajasthan Royal Tour",
    destination: "Rajasthan, India",
    duration: "7N/8D",
    nights: 7,
    price: "₹28,999",
    oldPrice: "₹42,000",
    includes: ["Palace Hotels", "Flights", "Breakfast", "Desert Safari"],
    tag: "Popular",
    description: "Palaces, deserts, and royalty — an immersive journey through the Land of Kings.",
  },
  {
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    name: "Kashmir Valley Escape",
    destination: "Srinagar, Jammu & Kashmir",
    duration: "5N/6D",
    nights: 5,
    price: "₹19,499",
    oldPrice: "₹28,000",
    includes: ["Houseboat", "Hotel", "Flights", "All Meals"],
    tag: "New",
    description: "Paradise on earth — float on Dal Lake and wake up to the most breathtaking mountain views.",
  },
  {
    image: "https://images.unsplash.com/photo-1477587458883-47145ed6979e?auto=format&fit=crop&w=900&q=80",
    name: "Andaman Island Getaway",
    destination: "Port Blair, Andaman",
    duration: "6N/7D",
    nights: 6,
    price: "₹24,999",
    oldPrice: "₹36,000",
    includes: ["Beach Resort", "Flights", "Breakfast", "Water Sports"],
    tag: "Exclusive",
    description: "Crystal-clear waters, pristine beaches, and world-class coral reefs in the Bay of Bengal.",
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    name: "Ladakh High Altitude Trek",
    destination: "Leh, Ladakh",
    duration: "7N/8D",
    nights: 7,
    price: "₹32,999",
    oldPrice: "₹48,000",
    includes: ["Luxury Camp", "Flights", "All Meals", "Trek Guide"],
    tag: "Adventure",
    description: "Moonscapes, monasteries, and the world's highest motorable roads await in this bucket-list trip.",
  },
  {
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80",
    name: "Golden Triangle Explorer",
    destination: "Delhi–Agra–Jaipur",
    duration: "6N/7D",
    nights: 6,
    price: "₹18,499",
    oldPrice: "₹27,000",
    includes: ["Heritage Hotels", "Flights", "Breakfast", "Guided Tours"],
    tag: "Popular",
    description: "The Taj Mahal, Amber Fort, and Old Delhi — India's most iconic sights in one seamless circuit.",
  },
];

const whyUs = [
  { icon: Plane,       label: "Flights included",          sub: "Round-trip airfare for 2 adults on all packages" },
  { icon: Utensils,    label: "Meals & dining",            sub: "Breakfast, or full-board options available" },
  { icon: Camera,      label: "Guided experiences",        sub: "Curated sightseeing with expert local guides" },
  { icon: Headphones,  label: "24/7 trip support",         sub: "Our team is always a call away" },
];

const tagColors: Record<string, string> = {
  Bestseller: "bg-[#FF6B35] text-white",
  "Top Pick":  "bg-[#0057D9] text-white",
  Luxury:      "bg-[#7C3AED] text-white",
  Popular:     "bg-[#16A34A] text-white",
  New:         "bg-[#0891B2] text-white",
  Exclusive:   "bg-[#DB2777] text-white",
  Adventure:   "bg-[#D97706] text-white",
};

function getDiscount(price: string, oldPrice: string) {
  const p = parseInt(price.replace(/[^0-9]/g, ""));
  const o = parseInt(oldPrice.replace(/[^0-9]/g, ""));
  return Math.round((1 - p / o) * 100);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PackagesPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=2400&q=80"
          alt="Holiday packages"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.50)_60%,rgba(0,87,217,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Package className="h-3 w-3" /> Holiday Packages
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            All-inclusive getaways<br />
            <span className="text-[#FF6B35]">built for you.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Flights + Hotels + Meals + Activities — bundled into one price with zero hidden fees.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Star,        label: "Handpicked properties" },
              { icon: ShieldCheck, label: "Free cancellation" },
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
            { icon: Package,     label: "8 curated packages",    sub: "New destinations added monthly" },
            { icon: Plane,       label: "Flights included",       sub: "Round-trip on every package" },
            { icon: ShieldCheck, label: "Free cancellation",      sub: "Up to 7 days before travel" },
            { icon: Star,        label: "4.9 avg. rating",        sub: "From 2,400+ travellers" },
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

      {/* ── Packages grid ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5" /> All Packages
              </p>
              <h2 className="section-title">Choose your perfect getaway</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allPackages.map((pkg) => {
              const discount = getDiscount(pkg.price, pkg.oldPrice);
              return (
                <div
                  key={pkg.name}
                  className="card-lift group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:border-[#DBEAFE]"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Tag badge */}
                    <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tagColors[pkg.tag] ?? "bg-[#FF6B35] text-white"}`}>
                      {pkg.tag}
                    </span>
                    {/* Duration */}
                    <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      <Clock className="h-3 w-3" /> {pkg.duration}
                    </span>
                    {/* Discount */}
                    <span className="absolute bottom-3 right-3 rounded-full bg-[#22C55E] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {discount}% OFF
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-[#9CA3AF]">{pkg.destination}</p>
                    <h3 className="mt-1 font-bold leading-snug text-[#1A2235] group-hover:text-[#0057D9] transition lg:text-lg">
                      {pkg.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#475569] line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Includes pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {pkg.includes.map((item) => (
                        <span key={item} className="flex items-center gap-1 rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-[10px] font-medium text-[#0057D9]">
                          <Tag className="h-2.5 w-2.5" /> {item}
                        </span>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="mt-4 flex items-end justify-between border-t border-[#F1F5F9] pt-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Per person</p>
                        <p className="text-xs text-[#9CA3AF] line-through">{pkg.oldPrice}</p>
                        <p className="text-xl font-extrabold text-[#1A2235]">{pkg.price}</p>
                      </div>
                      <button className="rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,107,53,0.30)] transition hover:bg-[#E55A24]">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why book with us ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Why choose a package</p>
            <h2 className="section-title mx-auto max-w-xl">Everything handled, nothing missed</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              We take care of every detail so you can focus on the experience — not the logistics.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map(({ icon: Icon, label, sub }) => (
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

      {/* ── What's included breakdown ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-md lg:flex">
            {/* Image side */}
            <div className="relative h-64 shrink-0 lg:h-auto lg:w-[45%]">
              <Image
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
                alt="Package includes"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/10" />
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="section-label">What's included</p>
              <h2 className="section-title mt-2 max-w-md">Every package comes fully loaded</h2>
              <p className="mt-3 text-sm text-[#475569]">
                No nickel-and-diming — our packages bundle everything you need at one honest price.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Round-trip flights for 2 adults",
                  "Hotel accommodation (as per package)",
                  "Daily breakfast or full-board meals",
                  "Curated sightseeing & guided tours",
                  "Airport transfers & local transport",
                  "24/7 on-trip concierge support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#1A2235]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#0057D9]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/rooms"
                  className="rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24]"
                >
                  Browse hotel rooms
                </Link>
                <Link
                  href="/flights"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#1A2235] transition hover:border-[#DBEAFE] hover:text-[#0057D9]"
                >
                  View flight deals <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA banner ── */}
      <section className="relative overflow-hidden bg-[#0A1628] px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Zap className="h-3.5 w-3.5" /> Limited Time Offers
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Ready to plan your next adventure?
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Pick a package above or let our AI assistant recommend the perfect trip based on your preferences and budget.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/deals"
              className="rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.40)] transition hover:bg-[#E55A24]"
            >
              See all deals
            </Link>
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Explore rooms <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
