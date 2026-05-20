import { notFound } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import { isDatabaseConfigured } from "@/lib/env";
import Room from "@/models/Room";
import { formatCurrency } from "@/utils/format";

import { BookingForm } from "@/components/forms/booking-form";
import { SetupNotice } from "@/components/setup-notice";

export const dynamic = "force-dynamic";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  if (!isDatabaseConfigured()) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SetupNotice />
      </section>
    );
  }

  await connectToDatabase();
  const { roomId } = await params;
  const room = await Room.findById(roomId).lean();

  if (!room) {
    notFound();
  }

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-200">Secure booking</p>
        <h1 className="font-serif text-5xl text-white">Reserve {room.name}</h1>
        <p className="text-lg leading-8 text-white/70">
          Confirm your preferred dates and let Huts4u take care of pricing, availability checks, and booking confirmation.
        </p>
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
          <p className="text-sm text-white/60">Nightly price</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(room.price)}</p>
          <p className="mt-4 text-sm text-white/60">{room.location}</p>
        </div>
      </div>

      <BookingForm roomId={String(room._id)} roomName={room.name} />
    </section>
  );
}
