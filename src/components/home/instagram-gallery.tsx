import Image from "next/image";

const gallery = [
  "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=900&q=80",
];

export function InstagramGallery() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12">
      <div className="mb-6 md:mb-8 lg:mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] lg:text-sm">Instagram gallery</p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#111827] sm:text-3xl lg:text-4xl xl:text-5xl">Travel moments through the Huts4u lens</h2>
      </div>

      {/* 2-column grid on mobile, scales up to 6 columns on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
        {gallery.map((image, index) => (
          <div key={`${image}-${index}`} className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src={image} alt={`Gallery image ${index + 1}`} fill className="object-cover transition duration-500 hover:scale-[1.06]" sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
