import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  BedDouble,
  MapPin,
  Star,
  Trash2,
  ArrowRight,
  PlusCircle,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { requireAuth } from "@/lib/dal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Wishlist | Huts4u",
  description: "Rooms and properties you've hearted for future stays.",
};

// ── Static placeholder data ───────────────────────────────────────────────────

const wishlistItems = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    name: "Clifftop Infinity Pool Suite",
    location: "Munnar, Kerala",
    rating: "4.9",
    reviews: 214,
    price: "₹21,000",
    oldPrice: "₹25,000",
    meta: "2 Guests · Infinity Pool · King Bed",
    tag: "Trending",
    tagColor: "bg-rose-50 text-rose-700 border border-rose-200",
    savedOn: "May 24, 2026",
    slug: "/rooms",
    availability: "Available",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    name: "Heritage Haveli Grand Room",
    location: "Jaipur, Rajasthan",
    rating: "4.8",
    reviews: 178,
    price: "₹15,500",
    oldPrice: "₹18,000",
    meta: "2 Guests · Courtyard View · Queen Bed",
    tag: "Heritage",
    tagColor: "bg-amber-50 text-amber-700 border border-amber-200",
    savedOn: "May 21, 2026",
    slug: "/rooms",
    availability: "Only 2 left",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    name: "Mountain View Chalet",
    location: "Manali, Himachal Pradesh",
    rating: "5.0",
    reviews: 92,
    price: "₹28,000",
    oldPrice: "₹33,000",
    meta: "4 Guests · Valley View · Two Beds",
    tag: "Luxury",
    tagColor: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    savedOn: "May 17, 2026",
    slug: "/rooms",
    availability: "Available",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    name: "Beachfront Palm Cottage",
    location: "Goa, North Beach",
    rating: "4.7",
    reviews: 340,
    price: "₹11,000",
    oldPrice: "₹13,500",
    meta: "2 Guests · Sea View · Double Bed",
    tag: "Bestseller",
    tagColor: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    savedOn: "May 12, 2026",
    slug: "/rooms",
    availability: "High demand",
  },
];

const isEmpty = false;

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function WishlistPage() {
  await requireAuth();

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Your favourites</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">Wishlist</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            {isEmpty ? "No items yet" : `${wishlistItems.length} saved propert${wishlistItems.length !== 1 ? "ies" : "y"}`}
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
              { icon: Heart,        label: "Wishlisted",        value: wishlistItems.length, sub: "saved properties"     },
              { icon: MapPin,       label: "Destinations",      value: 4,                    sub: "unique locations"      },
              { icon: CalendarDays, label: "Ready to book",     value: wishlistItems.length, sub: "check availability"   },
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
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition hover:border-[#22C7C7]/30 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width:640px)100vw,50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Tag */}
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${item.tagColor}`}>
                    {item.tag}
                  </span>

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {item.rating}
                    <span className="text-white/70">({item.reviews})</span>
                  </div>

                  {/* Remove button */}
                  <button
                    aria-label="Remove from wishlist"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#EF4444] shadow transition hover:bg-white hover:shadow-md"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Availability badge */}
                  {item.availability !== "Available" && (
                    <div className="absolute bottom-3 right-3 rounded-full bg-[#FF6B35]/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                      {item.availability}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-[#111827] transition group-hover:text-[#22C7C7]">
                        {item.name}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-xs text-[#6B7280]">
                        <MapPin className="h-3 w-3 shrink-0 text-[#22C7C7]" /> {item.location}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-extrabold text-[#111827]">{item.price}</p>
                      <p className="text-xs text-[#9CA3AF] line-through">{item.oldPrice}</p>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-[#9CA3AF]">{item.meta}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-4">
                    <p className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                      <Heart className="h-3 w-3 text-[#22C7C7]" /> Saved {item.savedOn}
                    </p>
                    <Link
                      href={item.slug}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#22C7C7] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
                    >
                      Book now <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
