import Image from "next/image";
import { notFound } from "next/navigation";
import { BedDouble, MapPin, Star, Users, Wifi } from "lucide-react";

import { connectToDatabase } from "@/lib/mongodb";
import { isDatabaseConfigured } from "@/lib/env";
import Room from "@/models/Room";
import { formatCurrency } from "@/utils/format";

import { BookingForm } from "@/components/forms/booking-form";
import { SetupNotice } from "@/components/setup-notice";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book a Room | Huts4u",
  description: "Reserve your luxury stay at Huts4u.",
};

export default async function BookingPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  if (!isDatabaseConfigured()) {
    return (
      <div className="min-h-screen bg-[#020617] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SetupNotice />
        </div>
      </div>
    );
  }

  await connectToDatabase();
  const { roomId } = await params;
  const room = await Room.findById(roomId).lean();

  if (!room) {
    notFound();
  }

  const heroImage = room.images?.[0];

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Hero banner */}
      {heroImage && (
        <div className="relative h-64 w-full overflow-hidden md:h-80">
          <Image src={heroImage} alt={room.name} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#020617]" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-amber-300/80">Secure booking</p>
            <h1 className="mt-1 font-serif text-3xl font-medium text-white md:text-4xl">{room.name}</h1>
          </div>
        </div>
      )}

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        {/* Left — room summary */}
        <div className="space-y-5">
          {!heroImage && (
            <>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-amber-300/80">Secure booking</p>
              <h1 className="font-serif text-4xl font-medium text-white">{room.name}</h1>
            </>
          )}

          {/* Price card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-xs text-white/45 uppercase tracking-widest">Nightly rate</p>
            <p className="mt-1 text-4xl font-semibold text-white">
              {formatCurrency(room.price)}
              <span className="ml-1 text-base font-normal text-white/40">/night</span>
            </p>
          </div>

          {/* Room meta */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              <MapPin className="h-4 w-4 shrink-0 text-amber-300/70" />
              <span className="truncate">{room.location}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              <Users className="h-4 w-4 shrink-0 text-amber-300/70" />
              <span>Up to {room.capacity} guests</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              <BedDouble className="h-4 w-4 shrink-0 text-amber-300/70" />
              <span className="capitalize">{room.type}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              <Star className="h-4 w-4 shrink-0 text-amber-300/70" />
              <span>{room.rating} · {room.reviewCount} reviews</span>
            </div>
          </div>

          {/* Amenities */}
          {room.amenities?.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {room.amenities.slice(0, 8).map((a) => (
                  <span key={a} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    <Wifi className="h-3 w-3" />
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-sm leading-7 text-white/55">{room.description}</p>
        </div>

        {/* Right — booking form */}
        <BookingForm roomId={String(room._id)} roomName={room.name} pricePerNight={room.price} />
      </section>
    </div>
  );
}
