import Image from "next/image";
import { ShieldCheck, Star, MapPin, Zap } from "lucide-react";

import { getRooms } from "@/lib/dal";
import { isDatabaseConfigured } from "@/lib/env";

import { RoomFilters } from "@/components/forms/room-filters";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Rooms | Huts4u",
  description: "Browse our curated collection of luxury rooms and suites. Filter by type, dates, and price to find your perfect stay.",
};

const DEMO_ROOMS = [
  {
    _id: "demo-1",
    name: "Oceanfront Deluxe King",
    slug: "oceanfront-deluxe-king",
    type: "Deluxe",
    location: "Puri, Odisha",
    price: 12500,
    capacity: 2,
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80"],
    availabilityStatus: "available",
    rating: 4.8,
    amenities: ["Ocean View", "Private Balcony", "Breakfast Included"],
  },
  {
    _id: "demo-2",
    name: "Garden Pool Villa",
    slug: "garden-pool-villa",
    type: "Villa",
    location: "Bhubaneswar, Odisha",
    price: 28000,
    capacity: 4,
    images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"],
    availabilityStatus: "available",
    rating: 4.9,
    amenities: ["Private Balcony", "Mini Bar", "Airport Pickup"],
  },
  {
    _id: "demo-3",
    name: "Presidential Suite",
    slug: "presidential-suite",
    type: "Suite",
    location: "Konark, Odisha",
    price: 45000,
    capacity: 3,
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"],
    availabilityStatus: "booked",
    rating: 5.0,
    amenities: ["Ocean View", "Breakfast Included", "Mini Bar"],
  },
  {
    _id: "demo-4",
    name: "Cozy Forest Cabin",
    slug: "cozy-forest-cabin",
    type: "Cabin",
    location: "Chilika, Odisha",
    price: 8500,
    capacity: 2,
    images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80"],
    availabilityStatus: "available",
    rating: 4.6,
    amenities: ["Wi-Fi", "Air Conditioning", "Workspace"],
  },
  {
    _id: "demo-5",
    name: "Family Beach Retreat",
    slug: "family-beach-retreat",
    type: "Family",
    location: "Gopalpur, Odisha",
    price: 18000,
    capacity: 6,
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"],
    availabilityStatus: "available",
    rating: 4.7,
    amenities: ["Ocean View", "Breakfast Included", "Air Conditioning"],
  },
  {
    _id: "demo-6",
    name: "Heritage Luxury Suite",
    slug: "heritage-luxury-suite",
    type: "Suite",
    location: "Puri, Odisha",
    price: 32000,
    capacity: 3,
    images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"],
    availabilityStatus: "available",
    rating: 4.9,
    amenities: ["Private Balcony", "Mini Bar", "Airport Pickup"],
  },
];

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type: initialType } = await searchParams;
  const dbReady = isDatabaseConfigured();
  const dbRooms = dbReady ? await getRooms() : [];
  const rooms = dbReady
    ? dbRooms.map((room) => ({ ...room, _id: String(room._id) }))
    : DEMO_ROOMS;

  return (
    <div className="bg-white">
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="relative h-[420px] sm:h-[480px] md:h-[540px]">
          <Image
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2400&q=80"
            alt="Browse hotel rooms"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Multi-layer gradient overlay matching homepage style */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.82)_0%,rgba(0,87,217,0.45)_60%,rgba(0,87,217,0.15)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">Discover Stays</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Browse every room in<br />
              <span className="text-[#FF6B35]">our collection.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/70">
              Search by destination, filter by room type, and book exceptional hospitality in a few clicks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> 4.8 avg. rating
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Free cancellation
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5 text-[#FF6B35]" /> Instant confirmation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-[#E5E7EB] bg-[#F7F9FC]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#E5E7EB] px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Star,        label: "4.8 avg. rating",      sub: "across all rooms" },
            { icon: MapPin,      label: "5 destinations",       sub: "across Odisha" },
            { icon: ShieldCheck, label: "Free cancellation",    sub: "within 24 hours" },
            { icon: Zap,         label: "Instant confirmation", sub: "on every booking" },
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

      {/* Filters + rooms grid */}
      <section className="bg-[#F7F9FC] py-10 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <RoomFilters rooms={rooms} initialType={initialType} />
        </div>
      </section>
    </div>
  );
}
