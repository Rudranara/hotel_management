import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Star, MapPin, ArrowRight } from "lucide-react";

const destinations = [
  { image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", name: "Goa", tag: "Beach Paradise", hotels: 1240, from: "₹2,500/night" },
  { image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80", name: "Manali", tag: "Mountain Escape", hotels: 680, from: "₹1,800/night" },
  { image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80", name: "Kerala", tag: "Backwater Bliss", hotels: 920, from: "₹3,200/night" },
  { image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80", name: "Rajasthan", tag: "Royal Heritage", hotels: 1560, from: "₹2,800/night" },
  { image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80", name: "Andaman", tag: "Island Getaway", hotels: 340, from: "₹4,500/night" },
  { image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80", name: "Rishikesh", tag: "Adventure Hub", hotels: 480, from: "₹1,200/night" },
];

export function PopularDestinations() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:py-10 lg:px-10 xl:px-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="section-label flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" />Popular Destinations</p>
          <h2 className="section-title">Where do you want to go?</h2>
          <p className="mt-2 text-sm text-[#6B7280]">Explore India&apos;s most loved travel spots</p>
        </div>
        <Link href="/rooms" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0057D9] transition hover:text-[#003A8C] sm:flex">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
        {destinations.map((dest) => (
          <Link
            key={dest.name}
            href={`/rooms?destination=${dest.name.toLowerCase()}`}
            className="card-lift group block overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
          >
            <div className="relative h-36 overflow-hidden lg:h-44">
              <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:640px)50vw,(max-width:1024px)33vw,200px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-[#374151]">{dest.tag}</span>
              <div className="absolute bottom-2.5 left-2.5">
                <p className="text-sm font-bold text-white">{dest.name}</p>
                <p className="text-[10px] text-white/75">{dest.hotels.toLocaleString()} hotels</p>
              </div>
            </div>
            <div className="px-3 py-2.5">
              <p className="text-[11px] text-[#6B7280]">Starting from</p>
              <p className="text-sm font-bold text-[#0057D9]">{dest.from}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── Trending Hotels ──────────────────────────────────────────────────────────

const hotels = [
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
    name: "The Grand Udaipur Palace", location: "Udaipur, Rajasthan",
    rating: 4.9, reviews: 1842, price: "₹18,500", oldPrice: "₹24,000",
    badge: "Bestseller", amenities: ["Pool", "Spa", "Restaurant", "Free WiFi"],
  },
  {
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=900&q=80",
    name: "Seaside Infinity Resort", location: "Puri, Odisha",
    rating: 4.8, reviews: 1124, price: "₹12,800", oldPrice: "₹16,000",
    badge: "Top Rated", amenities: ["Beach Access", "Pool", "Breakfast", "AC"],
  },
  {
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
    name: "Himalayan Snow Lodge", location: "Manali, Himachal Pradesh",
    rating: 4.7, reviews: 892, price: "₹8,500", oldPrice: "₹11,000",
    badge: "Great Value", amenities: ["Mountain View", "Fireplace", "WiFi", "Parking"],
  },
  {
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
    name: "Backwater Heritage Villa", location: "Alleppey, Kerala",
    rating: 4.9, reviews: 2103, price: "₹15,200", oldPrice: "₹20,000",
    badge: "Luxury Pick", amenities: ["Private Pool", "Houseboat", "Spa", "Ayurveda"],
  },
];

export function TrendingHotelsSection() {
  return (
    <section className="bg-[#F7F9FC] py-8 md:py-10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="section-label"><Star className="mr-1.5 inline h-3.5 w-3.5" />Top Hotels</p>
            <h2 className="section-title">Handpicked stays you&apos;ll love</h2>
          </div>
          <Link href="/rooms" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0057D9] transition hover:text-[#003A8C] sm:flex">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {hotels.map((hotel) => (
            <Link key={hotel.name} href="/rooms" className="card-lift group block overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
              <div className="relative h-48 overflow-hidden">
                <Image src={hotel.image} alt={hotel.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" />
                <span className="absolute left-3 top-3 rounded-full bg-[#FF6B35] px-2.5 py-0.5 text-[10px] font-bold text-white">{hotel.badge}</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-[#1A2235]">{hotel.name}</h3>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#6B7280]">
                      <MapPin className="h-3 w-3" />{hotel.location}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-lg bg-[#0057D9] px-2 py-1 text-center">
                    <p className="text-sm font-bold text-white">{hotel.rating}</p>
                    <p className="text-[9px] text-white/75">/ 5</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {hotel.amenities.map((a) => (
                    <span key={a} className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-medium text-[#6B7280]">{a}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#9CA3AF] line-through">{hotel.oldPrice}</p>
                    <p className="text-base font-extrabold text-[#1A2235]">{hotel.price}<span className="text-xs font-normal text-[#6B7280]">/night</span></p>
                  </div>
                  <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]">
                    {Math.round((1 - parseInt(hotel.price.replace(/[^0-9]/g, "")) / parseInt(hotel.oldPrice.replace(/[^0-9]/g, ""))) * 100)}% OFF
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
