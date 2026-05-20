import {
  AirVent,
  BedDouble,
  MonitorPlay,
  ShieldCheck,
  Soup,
  WavesLadder,
  Wifi,
} from "lucide-react";

const amenities = [
  { title: "Free WiFi", icon: Wifi, description: "Fast browsing in every room and suite." },
  { title: "Easy Booking", icon: BedDouble, description: "Effortless reservation flow and confirmations." },
  { title: "Air Conditioning", icon: AirVent, description: "Balanced cooling for restful comfort." },
  { title: "Free Breakfast", icon: Soup, description: "Freshly prepared morning dining included." },
  { title: "Swimming Pool", icon: WavesLadder, description: "Relax with scenic water-side lounging." },
  { title: "24/7 Room Service", icon: BedDouble, description: "Round-the-clock hospitality support." },
  { title: "Safe & Secure", icon: ShieldCheck, description: "Trusted stays with added peace of mind." },
  { title: "Smart TV Entertainment", icon: MonitorPlay, description: "Modern in-room entertainment access." },
];

export function AmenitiesSection() {
  return (
    <section id="services" className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12">
      <div className="mb-8 text-center md:mb-10 lg:mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] lg:text-sm">Amenities</p>
        <h2 className="mx-auto mt-2 max-w-xs text-2xl font-semibold leading-tight text-[#111827] sm:max-w-lg sm:text-3xl lg:max-w-2xl lg:text-4xl xl:text-5xl">Everything your luxury stay should include</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        {amenities.map((amenity) => {
          const Icon = amenity.icon;

          return (
            <article key={amenity.title} className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:p-6 lg:py-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F3FF] text-[#7C3AED] lg:h-14 lg:w-14 lg:rounded-2xl">
                <Icon className="h-6 w-6 lg:h-7 lg:w-7" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-[#111827] sm:text-base lg:text-lg">{amenity.title}</h3>
              <p className="mt-2 text-xs leading-[1.6] text-[#6B7280] sm:text-sm lg:text-base lg:leading-7">{amenity.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
