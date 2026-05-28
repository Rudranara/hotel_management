import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarX, CheckCircle2, ChevronLeft, MapPin, Star, Users, ShieldCheck, Clock, BadgeCheck } from "lucide-react";

import { getRoomBySlug } from "@/lib/dal";
import { isDatabaseConfigured } from "@/lib/env";
import { formatCurrency } from "@/utils/format";
import { ImageLightbox } from "@/components/image-lightbox";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug).catch(() => null);
  if (!room) return { title: "Room | Huts4u" };
  return {
    title: `${(room as { name?: string }).name ?? "Room"} | Huts4u`,
    description: (room as { description?: string }).description ?? "Luxury hotel room at Huts4u.",
  };
}

type BookedRange = { from: string; to: string };

type NormalizedRoom = {
  _id: string;
  name: string;
  slug: string;
  type: string;
  location: string;
  price: number;
  capacity: number;
  description: string;
  images: string[];
  availabilityStatus: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
};

function fmtRange(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function rangeDays(from: string, to: string) {
  return Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86_400_000);
}

type NormalizedReview = {
  _id: string;
  rating: number;
  comment: string;
  user: { name: string };
};

const DEMO_ROOMS: (NormalizedRoom & { reviews: NormalizedReview[]; bookedRanges?: BookedRange[] })[] = [
  {
    _id: "demo-1",
    name: "Oceanfront Deluxe King",
    slug: "oceanfront-deluxe-king",
    type: "Deluxe",
    location: "Puri, Odisha",
    price: 12500,
    capacity: 2,
    description:
      "Wake up to the sound of waves in our signature Oceanfront Deluxe King room. Floor-to-ceiling windows frame an uninterrupted view of the Bay of Bengal, while hand-crafted teak furniture and locally sourced linens create an atmosphere of refined coastal luxury.",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    ],
    availabilityStatus: "available",
    rating: 4.8,
    reviewCount: 42,
    amenities: ["Ocean View", "Private Balcony", "Breakfast Included", "Wi-Fi", "Air Conditioning"],
    reviews: [
      { _id: "r1", rating: 5, comment: "Absolutely breathtaking views. Woke up to the sunrise over the ocean every morning. Staff were incredibly attentive.", user: { name: "Priya Nair" } },
      { _id: "r2", rating: 5, comment: "The balcony is the highlight — we spent hours just watching the waves. Room was spotlessly clean.", user: { name: "Arjun Mehta" } },
    ],
  },
  {
    _id: "demo-2",
    name: "Garden Pool Villa",
    slug: "garden-pool-villa",
    type: "Villa",
    location: "Bhubaneswar, Odisha",
    price: 28000,
    capacity: 4,
    description:
      "Escape into your own private paradise in our Garden Pool Villa. A secluded infinity pool overlooks manicured tropical gardens, while the interior blends contemporary design with Odishan artisan craftsmanship. Perfect for honeymooners and families seeking complete privacy.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    ],
    availabilityStatus: "available",
    rating: 4.9,
    reviewCount: 28,
    amenities: ["Private Balcony", "Mini Bar", "Airport Pickup", "Wi-Fi", "Air Conditioning", "Breakfast Included"],
    reviews: [
      { _id: "r3", rating: 5, comment: "The private pool is everything. We never wanted to leave. Outstanding service throughout our stay.", user: { name: "Sneha Kulkarni" } },
      { _id: "r4", rating: 5, comment: "Worth every rupee. The villa is even more beautiful in person than the photos suggest.", user: { name: "Rahul Desai" } },
    ],
  },
  {
    _id: "demo-3",
    name: "Presidential Suite",
    slug: "presidential-suite",
    type: "Suite",
    location: "Konark, Odisha",
    price: 45000,
    capacity: 3,
    bookedRanges: [
      { from: "2026-05-28", to: "2026-06-06" },
      { from: "2026-06-18", to: "2026-06-22" },
    ],
    description:
      "The pinnacle of luxury hospitality at Huts4u. Our Presidential Suite spans an entire private floor with panoramic views of the Konark coastline, a dedicated butler, chef's kitchen, home cinema, and a rooftop plunge pool exclusive to suite guests. An experience unlike any other.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    ],
    availabilityStatus: "booked",
    rating: 5.0,
    reviewCount: 15,
    amenities: ["Ocean View", "Breakfast Included", "Mini Bar", "Private Balcony", "Airport Pickup", "Workspace"],
    reviews: [
      { _id: "r5", rating: 5, comment: "Truly a once-in-a-lifetime experience. The butler service and private rooftop pool are unparalleled.", user: { name: "Vikram Iyer" } },
      { _id: "r6", rating: 5, comment: "Celebrated our anniversary here — the staff made it magical. Every single detail was perfect.", user: { name: "Ananya Sharma" } },
    ],
  },
  {
    _id: "demo-4",
    name: "Cozy Forest Cabin",
    slug: "cozy-forest-cabin",
    type: "Cabin",
    location: "Chilika, Odisha",
    price: 8500,
    capacity: 2,
    description:
      "Nestled in a private clearing at the edge of the Chilika wetlands, our Forest Cabin offers a serene escape from city life. Handmade wooden interiors, a private fire pit, and dawn bird-watching sessions make this a favourite among nature lovers and digital detoxers.",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    ],
    availabilityStatus: "available",
    rating: 4.6,
    reviewCount: 31,
    amenities: ["Wi-Fi", "Air Conditioning", "Workspace", "Breakfast Included"],
    reviews: [
      { _id: "r7", rating: 5, comment: "The most peaceful stay I have ever had. Woke up to flamingos on the lake every single morning.", user: { name: "Meera Pillai" } },
      { _id: "r8", rating: 4, comment: "Perfect for a work retreat. Fast Wi-Fi, cozy ambience, and great food. Highly recommend.", user: { name: "Karan Joshi" } },
    ],
  },
  {
    _id: "demo-5",
    name: "Family Beach Retreat",
    slug: "family-beach-retreat",
    type: "Family",
    location: "Gopalpur, Odisha",
    price: 18000,
    capacity: 6,
    description:
      "Designed for families who want it all, our Beach Retreat features two connecting rooms, a private beach cabana, dedicated kids activity zone, and an in-room kitchenette. Direct access to a pristine stretch of Gopalpur beach sets the stage for unforgettable family memories.",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    ],
    availabilityStatus: "available",
    rating: 4.7,
    reviewCount: 54,
    amenities: ["Ocean View", "Breakfast Included", "Air Conditioning", "Wi-Fi", "Private Balcony"],
    reviews: [
      { _id: "r9", rating: 5, comment: "Kids absolutely loved it. The beach cabana and activity zone kept everyone entertained all day.", user: { name: "Neha Gupta" } },
      { _id: "r10", rating: 5, comment: "Spacious, clean, and the staff went above and beyond to make our family vacation special.", user: { name: "Suresh Rao" } },
    ],
  },
  {
    _id: "demo-6",
    name: "Heritage Luxury Suite",
    slug: "heritage-luxury-suite",
    type: "Suite",
    location: "Puri, Odisha",
    price: 32000,
    capacity: 2,
    description:
      "Housed in a lovingly restored 19th-century colonial mansion, the Heritage Luxury Suite blends period architecture with contemporary comforts. Exposed stone walls, antique four-poster beds, and a private courtyard garden make this a truly singular retreat for discerning travellers.",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    ],
    availabilityStatus: "available",
    rating: 4.9,
    reviewCount: 23,
    amenities: ["Private Balcony", "Mini Bar", "Airport Pickup", "Breakfast Included", "Wi-Fi", "Ocean View"],
    reviews: [
      { _id: "r11", rating: 5, comment: "The heritage character of the room is extraordinary. Felt like staying in a piece of living history.", user: { name: "Divya Krishnan" } },
      { _id: "r12", rating: 5, comment: "Courtyard garden is magical in the evenings. Absolutely perfect romantic getaway.", user: { name: "Amit Pandey" } },
    ],
  },
];

export default async function RoomDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let room: NormalizedRoom;
  let reviews: NormalizedReview[];
  let bookedRanges: BookedRange[] = [];

  if (!isDatabaseConfigured()) {
    const demo = DEMO_ROOMS.find((r) => r.slug === slug) ?? DEMO_ROOMS[2];
    room = demo;
    reviews = demo.reviews;
    bookedRanges = (demo as typeof demo & { bookedRanges?: BookedRange[] }).bookedRanges ?? [];
  } else {
    const payload = await getRoomBySlug(slug);
    if (!payload) notFound();

    room = {
      _id: String(payload.room._id),
      name: payload.room.name,
      slug: payload.room.slug,
      type: payload.room.type,
      location: payload.room.location,
      price: payload.room.price,
      capacity: payload.room.capacity,
      description: payload.room.description,
      images: payload.room.images,
      availabilityStatus: payload.room.availabilityStatus,
      rating: payload.room.rating,
      reviewCount: payload.room.reviewCount,
      amenities: payload.room.amenities,
    };

    bookedRanges = payload.bookedRanges;

    reviews = payload.reviews.map((r) => ({
      _id: String(r._id),
      rating: r.rating as number,
      comment: r.comment as string,
      user: { name: (r.user as { name?: string } | undefined)?.name ?? "Guest" },
    }));
  }

  const available = room.availabilityStatus === "available";

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[60vh] min-h-[460px]">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Matching homepage multi-layer gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.82)_0%,rgba(0,87,217,0.45)_60%,rgba(0,87,217,0.15)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

          {/* Back button */}
          <div className="absolute left-4 top-6 z-10 sm:left-8">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <ChevronLeft size={15} />
              All rooms
            </Link>
          </div>

          {/* Room info overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-14 sm:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#0057D9] px-3 py-1 text-xs font-semibold text-white">
                  {room.type}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    available ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {available ? "Available" : "Currently Booked"}
                </span>
                <span className="rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-bold text-white">
                  SAVE 15%
                </span>
              </div>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {room.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/75">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#FF6B35]" />
                  {room.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  {room.rating.toFixed(1)} &middot; {room.reviewCount} reviews
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-white/60" />
                  Up to {room.capacity} guests
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="bg-[#F7F9FC] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* Left column */}
            <div className="space-y-6">

              {/* Image gallery */}
              {room.images.length > 0 && (
                <ImageLightbox images={room.images} roomName={room.name} />
              )}

              {/* Description */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
                <p className="section-label">About this room</p>
                <p className="mt-4 text-base leading-8 text-[#475569]">{room.description}</p>
              </div>

              {/* Amenities */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
                <p className="section-label mb-5">Amenities &amp; features</p>
                <div className="flex flex-wrap gap-2.5">
                  {room.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full border border-[#DBEAFE] bg-[#EEF4FF] px-4 py-2 text-sm font-medium text-[#0057D9]"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Availability ── */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
                <p className="section-label">Availability</p>
                <h2 className="mt-2 text-2xl font-bold text-[#1A2235]">When is this room free?</h2>

                {bookedRanges.length === 0 ? (
                  <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                    <p className="text-sm font-medium text-emerald-700">
                      All future dates are currently open — pick any dates you like.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                      This room is already reserved for the periods below.
                      Choose dates <strong>outside</strong> these windows.
                    </p>

                    <div className="mt-5 space-y-3">
                      {bookedRanges.map(({ from, to }, i) => {
                        const nights = rangeDays(from, to);
                        return (
                          <div
                            key={i}
                            className="flex flex-wrap items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4"
                          >
                            <CalendarX size={16} className="shrink-0 text-rose-400" />
                            <span className="flex-1 text-sm font-semibold text-rose-700">
                              {fmtRange(from)}&nbsp;→&nbsp;{fmtRange(to)}
                            </span>
                            <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-600">
                              {nights} night{nights !== 1 ? "s" : ""} booked
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <p className="mt-4 text-xs text-[#9CA3AF]">
                      Availability refreshes in real-time on every page load.
                    </p>
                  </>
                )}
              </div>

              {/* Reviews */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="section-label">Guest reviews</p>
                    <h2 className="mt-2 text-2xl font-bold text-[#1A2235]">What travellers are saying</h2>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-3 text-center">
                    <div className="flex items-center gap-1.5">
                      <Star size={16} className="fill-amber-400 text-amber-400" />
                      <span className="text-xl font-bold text-[#1A2235]">{room.rating.toFixed(1)}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#9CA3AF]">{room.reviewCount} reviews</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <article
                        key={review._id}
                        className="rounded-xl border border-[#F1F5F9] bg-[#F7F9FC] p-5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0057D9] text-sm font-bold text-white">
                              {review.user.name.charAt(0)}
                            </div>
                            <p className="font-semibold text-[#1A2235]">{review.user.name}</p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
                              <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-[#475569]">{review.comment}</p>
                      </article>
                    ))
                  ) : (
                    <p className="text-[#9CA3AF]">No reviews yet. Be the first to share your experience.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Booking sidebar */}
            <aside>
              <div className="sticky top-24 rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-md">
                <p className="section-label">Reserve this room</p>

                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">Per night</p>
                  <p className="mt-1 text-5xl font-bold text-[#1A2235]">{formatCurrency(room.price)}</p>
                </div>

                <div className="mt-6 space-y-3 rounded-xl border border-[#F1F5F9] bg-[#F7F9FC] p-4 text-sm">
                  {[
                    {
                      label: "Status",
                      value: (
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          available ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                        }`}>
                          {available ? "Available" : "Booked"}
                        </span>
                      ),
                    },
                    { label: "Location", value: <span className="text-[#475569]">{room.location}</span> },
                    { label: "Capacity", value: <span className="text-[#475569]">Up to {room.capacity} guests</span> },
                    {
                      label: "Rating",
                      value: (
                        <span className="flex items-center gap-1 text-[#475569]">
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          {room.rating.toFixed(1)} ({room.reviewCount})
                        </span>
                      ),
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-2">
                      <span className="text-[#9CA3AF]">{label}</span>
                      {value}
                    </div>
                  ))}
                </div>

                {available ? (
                  <Link
                    href={`/booking/${room._id}`}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-5 py-4 font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24] hover:shadow-[0_6px_28px_rgba(255,107,53,0.45)]"
                  >
                    Book this room
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                ) : (
                  <div className="mt-6 inline-flex w-full cursor-not-allowed justify-center rounded-full bg-[#F1F5F9] px-5 py-4 font-semibold text-[#9CA3AF]">
                    Currently unavailable
                  </div>
                )}

                {/* Guarantees */}
                <div className="mt-5 space-y-2.5 border-t border-[#F1F5F9] pt-5">
                  {[
                    { icon: ShieldCheck, text: "Free cancellation within 24 hours" },
                    { icon: Clock,       text: "24/7 guest support" },
                    { icon: BadgeCheck,  text: "Best price guaranteed" },
                  ].map(({ icon: Icon, text }) => (
                    <p key={text} className="flex items-center gap-2 text-xs text-[#64748B]">
                      <Icon size={13} className="shrink-0 text-[#0057D9]" />
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}
