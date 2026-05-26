import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Star, Users, ShieldCheck, Clock, BadgeCheck } from "lucide-react";

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

type NormalizedReview = {
  _id: string;
  rating: number;
  comment: string;
  user: { name: string };
};

const DEMO_ROOMS: (NormalizedRoom & { reviews: NormalizedReview[] })[] = [
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

  if (!isDatabaseConfigured()) {
    const demo = DEMO_ROOMS.find((r) => r.slug === slug) ?? DEMO_ROOMS[2];
    room = demo;
    reviews = demo.reviews;
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

    reviews = payload.reviews.map((r) => ({
      _id: String(r._id),
      rating: r.rating as number,
      comment: r.comment as string,
      user: { name: (r.user as { name?: string } | undefined)?.name ?? "Guest" },
    }));
  }

  const available = room.availabilityStatus === "available";

  return (
    <div className="bg-[#020617]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[60vh] min-h-[440px]">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.3)_0%,rgba(2,6,23,0.55)_50%,rgba(2,6,23,1)_100%)]" />

          {/* Back button */}
          <div className="absolute left-4 top-6 z-10 sm:left-8">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/15"
            >
              <ChevronLeft size={15} />
              All rooms
            </Link>
          </div>

          {/* Room info overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-12 sm:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                  {room.type}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    available ? "bg-emerald-400/90 text-emerald-950" : "bg-red-400/85 text-red-950"
                  }`}
                >
                  {available ? "Available" : "Currently Booked"}
                </span>
              </div>
              <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                {room.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/65">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-amber-300" />
                  {room.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="fill-amber-300 text-amber-300" />
                  {room.rating.toFixed(1)} &middot; {room.reviewCount} reviews
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-[#22C7C7]" />
                  Up to {room.capacity} guests
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

          {/* Left column */}
          <div className="space-y-8">

            {/* Image gallery with lightbox */}
            {room.images.length > 0 && (
              <ImageLightbox images={room.images} roomName={room.name} />
            )}

            {/* Description */}
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-[#22C7C7]">About this room</p>
              <p className="mt-4 text-base leading-8 text-white/70">{room.description}</p>
            </div>

            {/* Amenities */}
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#22C7C7]">Amenities &amp; features</p>
              <div className="flex flex-wrap gap-2.5">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#22C7C7]">Guest reviews</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">What travelers are saying</h2>
                </div>
                <div className="shrink-0 rounded-2xl bg-[#22C7C7]/15 px-4 py-3 text-center">
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="fill-amber-300 text-amber-300" />
                    <span className="text-xl font-semibold text-white">{room.rating.toFixed(1)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/40">{room.reviewCount} reviews</p>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <article
                      key={review._id}
                      className="rounded-2xl border border-white/8 bg-white/4 p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#22C7C7]/20 text-sm font-semibold text-[#22C7C7]">
                            {review.user.name.charAt(0)}
                          </div>
                          <p className="font-medium text-white">{review.user.name}</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
                            <Star key={i} size={12} className="fill-amber-300 text-amber-300" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/60">{review.comment}</p>
                    </article>
                  ))
                ) : (
                  <p className="text-white/45">No reviews yet. Be the first to share your experience.</p>
                )}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <aside>
            <div className="sticky top-24 rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-[#22C7C7]">Reserve this room</p>

              <div className="mt-5">
                <p className="text-sm text-white/45">Per night</p>
                <p className="mt-1 text-5xl font-semibold text-white">{formatCurrency(room.price)}</p>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border border-white/8 bg-white/4 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/45">Status</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      available ? "bg-emerald-400/15 text-emerald-300" : "bg-red-400/15 text-red-300"
                    }`}
                  >
                    {available ? "Available" : "Booked"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/45">Location</span>
                  <span className="text-white/75">{room.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/45">Capacity</span>
                  <span className="text-white/75">Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/45">Rating</span>
                  <span className="flex items-center gap-1 text-white/75">
                    <Star size={12} className="fill-amber-300 text-amber-300" />
                    {room.rating.toFixed(1)} ({room.reviewCount})
                  </span>
                </div>
              </div>

              {available ? (
                <Link
                  href={`/booking/${room._id}`}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22C7C7] px-5 py-4 font-semibold text-white transition hover:bg-[#1AB5B5]"
                >
                  Book this room
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              ) : (
                <div className="mt-6 inline-flex w-full cursor-not-allowed justify-center rounded-full bg-white/10 px-5 py-4 font-semibold text-white/30">
                  Currently unavailable
                </div>
              )}

              {/* Guarantees */}
              <div className="mt-5 space-y-2.5">
                {[
                  { icon: ShieldCheck, text: "Free cancellation within 24 hours" },
                  { icon: Clock,       text: "24/7 guest support" },
                  { icon: BadgeCheck,  text: "Best price guaranteed" },
                ].map(({ icon: Icon, text }) => (
                  <p key={text} className="flex items-center gap-2 text-xs text-white/40">
                    <Icon size={13} className="shrink-0 text-[#22C7C7]/70" />
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
