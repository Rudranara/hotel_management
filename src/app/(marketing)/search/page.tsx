import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Star, Wifi, Car, Coffee, Waves, Filter, Map,
  SlidersHorizontal, ArrowUpDown, Sparkles, Shield, Heart,
} from "lucide-react";

const results = [
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
    name: "The Grand Udaipur Palace", location: "Udaipur, Rajasthan",
    rating: 4.9, reviews: 1842, price: 18500, oldPrice: 24000,
    badge: "Bestseller", freeCancellation: true,
    amenities: ["Pool", "Spa", "Restaurant", "Free WiFi", "Airport Shuttle"],
  },
  {
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=900&q=80",
    name: "Seaside Infinity Resort", location: "Calangute, Goa",
    rating: 4.8, reviews: 2104, price: 12800, oldPrice: 16000,
    badge: "Top Rated", freeCancellation: true,
    amenities: ["Beach Access", "Pool", "Breakfast", "AC", "Bar"],
  },
  {
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
    name: "Himalayan Snow Lodge", location: "Old Manali, HP",
    rating: 4.7, reviews: 892, price: 8500, oldPrice: 11000,
    badge: "Great Value", freeCancellation: false,
    amenities: ["Mountain View", "Fireplace", "WiFi", "Parking", "Trekking"],
  },
  {
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
    name: "Backwater Heritage Villa", location: "Alleppey, Kerala",
    rating: 4.9, reviews: 2103, price: 15200, oldPrice: 20000,
    badge: "Luxury Pick", freeCancellation: true,
    amenities: ["Private Pool", "Houseboat", "Spa", "Ayurveda", "All Meals"],
  },
  {
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
    name: "Cliffside Boutique Hotel", location: "Varkala, Kerala",
    rating: 4.6, reviews: 654, price: 6800, oldPrice: 9000,
    badge: "Trending", freeCancellation: true,
    amenities: ["Cliff View", "Yoga", "Organic Food", "WiFi"],
  },
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    name: "Desert Dunes Camp & Resort", location: "Jaisalmer, Rajasthan",
    rating: 4.8, reviews: 1231, price: 9500, oldPrice: 13000,
    badge: "Popular", freeCancellation: false,
    amenities: ["Desert Safari", "Bonfire", "Camel Ride", "Tent Stay"],
  },
];

export default function SearchResultsPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Search summary bar */}
      <div className="border-b border-[#E5E7EB] bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-2 text-sm">
              <MapPin className="h-4 w-4 text-[#0057D9]" />
              <span className="font-semibold text-[#1A2235]">Goa</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-2 text-sm text-[#374151]">
              Jul 15 – Jul 20 · 2 Adults · 1 Room
            </div>
            <button className="ml-auto flex items-center gap-1.5 rounded-full bg-[#0057D9] px-4 py-2 text-sm font-semibold text-white">
              <Filter className="h-3.5 w-3.5" />Modify Search
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-10">
        <div className="flex gap-6">
          {/* Filters sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 space-y-4">
              {/* AI Recommendation Banner */}
              <div className="rounded-2xl bg-gradient-to-br from-[#0057D9] to-[#1E40AF] p-4 text-white">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-white/80" />
                  <p className="text-sm font-bold">AI Insight</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  Prices are <strong className="text-white">15% lower</strong> on weekdays. Consider checking in Tuesday for the best deals.
                </p>
              </div>

              {/* Filter panel */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-bold text-[#1A2235]">Filters</p>
                  <button className="text-xs font-medium text-[#0057D9]">Reset All</button>
                </div>

                {/* Price Range */}
                <div className="mb-5 border-b border-[#F1F5F9] pb-5">
                  <p className="mb-3 text-sm font-semibold text-[#1A2235]">Price Range / Night</p>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="₹ Min" className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm focus:border-[#0057D9] focus:outline-none" />
                    <span className="text-[#9CA3AF]">—</span>
                    <input type="number" placeholder="₹ Max" className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm focus:border-[#0057D9] focus:outline-none" />
                  </div>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {["Under ₹3K", "₹3K–8K", "₹8K–15K", "15K+"].map((r) => (
                      <button key={r} className="rounded-full border border-[#E5E7EB] px-2.5 py-1 text-[11px] font-medium text-[#6B7280] transition hover:border-[#0057D9] hover:bg-[#EEF4FF] hover:text-[#0057D9]">{r}</button>
                    ))}
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-5 border-b border-[#F1F5F9] pb-5">
                  <p className="mb-3 text-sm font-semibold text-[#1A2235]">Star Rating</p>
                  <div className="flex gap-2">
                    {[5, 4, 3, 2].map((s) => (
                      <button key={s} className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] px-2.5 py-1.5 text-xs font-medium text-[#374151] transition hover:border-[#0057D9] hover:bg-[#EEF4FF]">
                        {s}<Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-5 border-b border-[#F1F5F9] pb-5">
                  <p className="mb-3 text-sm font-semibold text-[#1A2235]">Amenities</p>
                  <div className="space-y-2">
                    {[
                      { icon: Wifi,    label: "Free WiFi"       },
                      { icon: Waves,   label: "Swimming Pool"   },
                      { icon: Car,     label: "Free Parking"    },
                      { icon: Coffee,  label: "Breakfast Incl." },
                      { icon: Shield,  label: "Free Cancellation"},
                    ].map((a) => {
                      const Icon = a.icon;
                      return (
                        <label key={a.label} className="flex cursor-pointer items-center gap-2.5 rounded-xl p-2 transition hover:bg-[#F7F9FC]">
                          <input type="checkbox" className="h-4 w-4 accent-[#0057D9]" />
                          <Icon className="h-3.5 w-3.5 text-[#6B7280]" />
                          <span className="text-sm text-[#374151]">{a.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <p className="mb-3 text-sm font-semibold text-[#1A2235]">Location Type</p>
                  <div className="space-y-2">
                    {["City Center", "Near Beach", "Airport Area", "Hill Station"].map((loc) => (
                      <label key={loc} className="flex cursor-pointer items-center gap-2.5 rounded-xl p-2 transition hover:bg-[#F7F9FC]">
                        <input type="checkbox" className="h-4 w-4 accent-[#0057D9]" />
                        <span className="text-sm text-[#374151]">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="min-w-0 flex-1">
            {/* Sort + view controls */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#6B7280]">
                Showing <strong className="text-[#1A2235]">{results.length}</strong> properties in <strong className="text-[#1A2235]">Goa</strong>
              </p>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#374151] transition hover:border-[#0057D9] hover:text-[#0057D9] lg:hidden">
                  <SlidersHorizontal className="h-3.5 w-3.5" />Filters
                </button>
                <button className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#374151] transition hover:border-[#0057D9] hover:text-[#0057D9]">
                  <Map className="h-3.5 w-3.5" />Map View
                </button>
                <button className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#374151] transition hover:border-[#0057D9] hover:text-[#0057D9]">
                  <ArrowUpDown className="h-3.5 w-3.5" />Sort: Recommended
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {results.map((hotel) => {
                const discount = Math.round((1 - hotel.price / hotel.oldPrice) * 100);
                return (
                  <Link
                    key={hotel.name}
                    href={`/rooms/${hotel.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:border-[#0057D9]/30 hover:shadow-[0_8px_32px_rgba(0,87,217,0.1)] sm:flex-row"
                  >
                    {/* Image */}
                    <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-60 lg:w-72">
                      <Image src={hotel.image} alt={hotel.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px)100vw,288px" />
                      <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#6B7280] transition hover:bg-white hover:text-[#EF4444]" onClick={(e) => e.preventDefault()}>
                        <Heart className="h-4 w-4" />
                      </button>
                      <span className="absolute bottom-3 left-3 rounded-full bg-[#FF6B35] px-2.5 py-0.5 text-[10px] font-bold text-white">{hotel.badge}</span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-[#1A2235] transition group-hover:text-[#0057D9]">{hotel.name}</h3>
                            <p className="mt-0.5 flex items-center gap-1 text-sm text-[#6B7280]">
                              <MapPin className="h-3.5 w-3.5" />{hotel.location}
                            </p>
                          </div>
                          <div className="shrink-0 rounded-xl bg-[#0057D9] px-3 py-1.5 text-center">
                            <p className="text-sm font-bold text-white">{hotel.rating}</p>
                            <p className="text-[9px] text-white/70">{hotel.reviews.toLocaleString()} reviews</p>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {hotel.amenities.slice(0, 4).map((a) => (
                            <span key={a} className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-medium text-[#6B7280]">{a}</span>
                          ))}
                        </div>

                        {hotel.freeCancellation && (
                          <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#16A34A]">
                            <Shield className="h-3.5 w-3.5" />Free Cancellation available
                          </p>
                        )}
                      </div>

                      <div className="flex items-end justify-between border-t border-[#F1F5F9] pt-3">
                        <div>
                          <p className="text-xs text-[#9CA3AF] line-through">₹{hotel.oldPrice.toLocaleString()}</p>
                          <p className="text-xl font-extrabold text-[#1A2235]">₹{hotel.price.toLocaleString()}<span className="text-xs font-normal text-[#6B7280]">/night</span></p>
                          <p className="text-[11px] text-[#6B7280]">+ taxes & fees</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-bold text-[#16A34A]">{discount}% OFF</span>
                          <button className="rounded-xl bg-[#0057D9] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(0,87,217,0.25)] transition hover:bg-[#003A8C]">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
