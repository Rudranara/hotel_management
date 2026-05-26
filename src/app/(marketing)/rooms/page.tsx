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
    images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"],
    availabilityStatus: "available",
    rating: 4.9,
    amenities: ["Private Balcony", "Mini Bar", "Airport Pickup"],
  },
];

export default async function RoomsPage() {
  const dbReady = isDatabaseConfigured();
  const dbRooms = dbReady ? await getRooms() : [];
  const rooms = dbReady
    ? dbRooms.map((room) => ({ ...room, _id: String(room._id) }))
    : DEMO_ROOMS;

  return (
    <div className="bg-[#020617]">
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="relative h-80 sm:h-96 md:h-[28rem]">
          <Image
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2400&q=80"
            alt="Browse hotel rooms"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.35)_0%,rgba(2,6,23,0.65)_55%,rgba(2,6,23,1)_100%)]" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200">Discover stays</p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl text-white sm:text-5xl">
              Browse every room in our collection.
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/60">
              Search by destination, filter by room type, and book exceptional hospitality in a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-y border-white/5 bg-white/3">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Star,        label: "4.8 avg. rating",      sub: "across all rooms" },
            { icon: MapPin,      label: "5 destinations",       sub: "across Odisha" },
            { icon: ShieldCheck, label: "Free cancellation",    sub: "within 24 hours" },
            { icon: Zap,         label: "Instant confirmation", sub: "on every booking" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 py-5 pr-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#22C7C7]/10">
                <Icon className="h-4 w-4 text-[#22C7C7]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-white/45">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + rooms grid */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <RoomFilters rooms={rooms} />
      </section>
    </div>
  );
}
