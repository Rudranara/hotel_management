import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getRoomBySlug } from "@/lib/dal";
import { isDatabaseConfigured } from "@/lib/env";
import { formatCurrency } from "@/utils/format";

import { SetupNotice } from "@/components/setup-notice";

export const dynamic = "force-dynamic";

export default async function RoomDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isDatabaseConfigured()) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SetupNotice />
      </section>
    );
  }

  const { slug } = await params;
  const payload = await getRoomBySlug(slug);

  if (!payload) {
    notFound();
  }

  const { room, reviews } = payload;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {room.images.slice(0, 4).map((image, index) => (
              <div key={`${image}-${index}`} className={`relative overflow-hidden rounded-[2rem] ${index === 0 ? "md:col-span-2 h-[420px]" : "h-56"}`}>
                <Image src={image} alt={room.name} fill className="object-cover" sizes="100vw" />
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200">{room.type}</p>
            <h1 className="mt-3 font-serif text-5xl text-white">{room.name}</h1>
            <p className="mt-4 text-lg leading-8 text-white/70">{room.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {room.amenities.map((amenity) => (
                <span key={amenity} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/40">Guest reviews</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">What travelers are saying</h2>
              </div>
              <div className="rounded-2xl bg-amber-300/20 px-4 py-3 text-amber-100">
                {room.rating.toFixed(1)} / 5
              </div>
            </div>

            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => {
                  const reviewUser = review.user as { name?: string } | undefined;

                  return (
                    <article key={String(review._id)} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-white">{reviewUser?.name ?? "Guest"}</p>
                        <p className="text-sm text-amber-200">{review.rating} / 5</p>
                      </div>
                      <p className="mt-3 text-white/70">{review.comment}</p>
                    </article>
                  );
                })
              ) : (
                <p className="text-white/60">No reviews yet. The first guest impression can start with this booking.</p>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-white/40">Booking snapshot</p>
            <div className="mt-5 space-y-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-white/60">Per night</p>
                  <p className="text-4xl font-semibold text-white">{formatCurrency(room.price)}</p>
                </div>
                <p className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm text-emerald-200">
                  {room.availabilityStatus}
                </p>
              </div>
              <div className="grid gap-3 text-sm text-white/70">
                <p>Location: {room.location}</p>
                <p>Capacity: {room.capacity} guests</p>
                <p>Review count: {room.reviewCount}</p>
              </div>
              <Link
                href={`/booking/${room._id}`}
                className="inline-flex w-full justify-center rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-100"
              >
                Book this room
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
