import Image from "next/image";

const gallery = [
  { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80", label: "Bali, Indonesia", tall: true },
  { src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80", label: "Santorini, Greece", tall: false },
  { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80", label: "Paris, France", tall: false },
  { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80", label: "Dubai, UAE", tall: true },
  { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80", label: "Kyoto, Japan", tall: false },
  { src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80", label: "Nice, France", tall: false },
  { src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80", label: "Amalfi Coast, Italy", tall: false },
  { src: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=900&q=80", label: "Maldives", tall: false },
  { src: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=80", label: "Rome, Italy", tall: false },
];

export function InstagramGallery() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mb-8 lg:mb-10">
          <p className="section-label">Travel Moments</p>
          <h2 className="section-title mt-3">Through the Huts4u lens</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#6B7280]">
            Real destinations, real travelers. Tag us <span className="font-semibold text-[#0057D9]">@huts4u</span> to be featured.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
          style={{ gridAutoRows: "200px" }}
        >
          {gallery.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={`group relative overflow-hidden rounded-2xl${item.tall ? " row-span-2" : ""}`}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Gradient overlay with destination label */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📍</span>
                  <span className="text-sm font-semibold text-white drop-shadow">{item.label}</span>
                </div>
              </div>
              {/* Always-visible subtle pin on non-tall cards */}
              {!item.tall && (
                <div className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-0.5 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[10px] font-medium text-white">{item.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

