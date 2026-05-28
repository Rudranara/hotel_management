import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, ChevronLeft, MapPin, Star, Users } from "lucide-react";

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
      <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
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
    <div className="min-h-screen bg-white">
      {/* Hero banner */}
      {heroImage && (
        <div className="relative h-64 w-full overflow-hidden md:h-80">
          <Image src={heroImage} alt={room.name} fill className="object-cover" priority sizes="100vw" />
          {/* Homepage-style gradient overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.82)_0%,rgba(0,87,217,0.45)_60%,rgba(0,87,217,0.15)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

          {/* Back link */}
          <div className="absolute left-4 top-5 sm:left-8">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <ChevronLeft size={14} />
              Rooms
            </Link>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">Secure booking</p>
            <h1 className="mt-1 text-3xl font-bold text-white md:text-4xl">{room.name}</h1>
          </div>
        </div>
      )}

      <section className="bg-[#F7F9FC] py-10 sm:py-12 lg:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          {/* Left — room summary */}
          <div className="space-y-5">
            {!heroImage && (
              <>
                <p className="section-label">Secure booking</p>
                <h1 className="text-4xl font-bold text-[#1A2235]">{room.name}</h1>
              </>
            )}

            {/* Price card */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">Nightly rate</p>
              <p className="mt-1 text-4xl font-bold text-[#1A2235]">
                {formatCurrency(room.price)}
                <span className="ml-1 text-base font-normal text-[#9CA3AF]">/night</span>
              </p>
            </div>

            {/* Room meta */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin,    value: room.location,                       color: "text-[#0057D9]" },
                { icon: Users,     value: `Up to ${room.capacity} guests`,     color: "text-[#0057D9]" },
                { icon: BedDouble, value: room.type,                           color: "text-[#0057D9]" },
                { icon: Star,      value: `${room.rating} · ${room.reviewCount} reviews`, color: "text-amber-500" },
              ].map(({ icon: Icon, value, color }) => (
                <div key={String(value)} className="flex items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#475569] shadow-sm">
                  <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                  <span className="truncate capitalize">{value}</span>
                </div>
              ))}
            </div>

            {/* Amenities */}
            {room.amenities?.length > 0 && (
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 8).map((a) => (
                    <span key={a} className="rounded-full border border-[#DBEAFE] bg-[#EEF4FF] px-3 py-1 text-xs font-medium text-[#0057D9]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-sm leading-7 text-[#475569]">{room.description}</p>
          </div>

          {/* Right — booking form */}
          <BookingForm roomId={String(room._id)} roomName={room.name} pricePerNight={room.price} />
        </div>
      </section>
    </div>
  );
}
