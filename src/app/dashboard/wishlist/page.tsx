import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  BedDouble,
  MapPin,
  Star,
  ArrowRight,
  PlusCircle,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { requireAuth, getCurrentUser } from "@/lib/dal";
import { connectToDatabase } from "@/lib/mongodb";
import Room from "@/models/Room";
import { RemoveFromWishlist } from "./_components/remove-button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Wishlist | Huts4u",
  description: "Rooms and properties you've hearted for future stays.",
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function WishlistPage() {
  await requireAuth();

  const user = await getCurrentUser();
  const wishlistIds: string[] = (user?.wishlist ?? []).map(String);

  let rooms: Array<{
    _id: string;
    name: string;
    slug: string;
    type: string;
    location: string;
    price: number;
    images: string[];
    rating: number;
    reviewCount?: number;
    capacity?: number;
    availabilityStatus: string;
  }> = [];

  if (wishlistIds.length > 0) {
    await connectToDatabase();
    const docs = await Room.find({ _id: { $in: wishlistIds } })
      .select("_id name slug type location price images rating reviewCount capacity availabilityStatus")
      .lean();
    rooms = docs.map((r) => ({ ...r, _id: String(r._id) }));
  }

  const isEmpty = rooms.length === 0;
  const uniqueLocations = new Set(rooms.map((r) => r.location.split(",")[0]!.trim())).size;

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Your favourites</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">Wishlist</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            {isEmpty ? "No items yet" : `${rooms.length} saved propert${rooms.length !== 1 ? "ies" : "y"}`}
          </p>
        </div>
        <Link
          href="/rooms"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5] sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          Discover rooms
        </Link>
      </div>

      {isEmpty ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white px-8 py-20 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F1F5F9]">
            <Heart className="h-7 w-7 text-[#9CA3AF]" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-[#111827]">Your wishlist is empty</h2>
          <p className="mt-2 max-w-sm text-sm text-[#6B7280]">
            Browse rooms and tap the heart icon on any listing to add it here for quick access later.
          </p>
          <Link
            href="/rooms"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#22C7C7] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
          >
            <BedDouble className="h-4 w-4" /> Browse rooms
          </Link>
        </div>
      ) : (
        <>
          {/* ── Summary strip ── */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Heart,        label: "Wishlisted",    value: rooms.length,    sub: "saved properties"   },
              { icon: MapPin,       label: "Destinations",  value: uniqueLocations, sub: "unique locations"   },
              { icon: CalendarDays, label: "Ready to book", value: rooms.length,    sub: "check availability" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#22C7C7]/10">
                  <Icon className="h-5 w-5 text-[#22C7C7]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#111827]">{value}</p>
                  <p className="text-xs font-semibold text-[#6B7280]">{label}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Wishlist cards ── */}
          <div className="grid gap-5 sm:grid-cols-2">
            {rooms.map((room) => {
              const available = room.availabilityStatus === "available";
              return (
                <div
                  key={room._id}
                  className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition hover:border-[#22C7C7]/30 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={room.images[0]!}
                      alt={room.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width:640px)100vw,50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Type badge */}
                    <span className="absolute left-3 top-3 rounded-full bg-[#0057D9] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {room.type}
                    </span>

                    {/* Rating */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {room.rating.toFixed(1)}
                      {room.reviewCount != null && room.reviewCount > 0 && (
                        <span className="text-white/70">({room.reviewCount})</span>
                      )}
                    </div>

                    {/* Remove button (client component) */}
                    <RemoveFromWishlist roomId={room._id} />

                    {/* Availability badge */}
                    {!available && (
                      <div className="absolute bottom-3 right-3 rounded-full bg-[#EF4444]/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        {room.availabilityStatus === "limited" ? "Limited" : "Unavailable"}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-[#111827] transition group-hover:text-[#22C7C7]">
                          {room.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#6B7280]">
                          <MapPin className="h-3 w-3 shrink-0 text-[#22C7C7]" /> {room.location}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-lg font-extrabold text-[#111827]">
                          ₹{room.price.toLocaleString("en-IN")}
                        </p>
                        <p className="text-xs text-[#9CA3AF]">per night</p>
                      </div>
                    </div>

                    {room.capacity && (
                      <p className="mt-2 text-xs text-[#9CA3AF]">Up to {room.capacity} guests</p>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-4">
                      <p className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                        <Heart className="h-3 w-3 text-[#22C7C7]" />
                        {available ? "Available to book" : "Currently unavailable"}
                      </p>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#22C7C7] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
                      >
                        Book now <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Personalised picks CTA ── */}
          <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22C7C7] via-[#1DDCDC] to-[#22C7C7]" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#22C7C7]/5 to-transparent" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Personalised for you</p>
                <h2 className="mt-1 text-xl font-bold text-[#111827]">Want more ideas?</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Explore hand-picked rooms based on your wishlist preferences and past stays.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
                >
                  <Sparkles className="h-4 w-4" /> Explore rooms
                </Link>
                <Link
                  href="/deals"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-sm font-semibold text-[#374151] transition hover:border-[#22C7C7] hover:text-[#22C7C7]"
                >
                  View deals <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

