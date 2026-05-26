import { AmenitiesSection } from "@/components/home/amenities-section";
import { BlogSection } from "@/components/home/blog-section";
import { DealsSection } from "@/components/home/deals-section";
import { DestinationSection } from "@/components/home/destination-section";
import { HeroSection } from "@/components/home/hero-section";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { PromotionalBanner } from "@/components/home/promotional-banner";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { TrendingRooms } from "@/components/home/trending-rooms";
import { getRooms } from "@/lib/dal";
import { isDatabaseConfigured } from "@/lib/env";
import { formatCurrency } from "@/utils/format";

const destinations = [
  {
    image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1000&q=80",
    name: "Puri",
    price: "Rs 7,500",
    rating: "4.8",
  },
  {
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80",
    name: "Bhubaneswar",
    price: "Rs 6,200",
    rating: "4.7",
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    name: "Konark",
    price: "Rs 8,400",
    rating: "4.9",
  },
  {
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=80",
    name: "Chilika",
    price: "Rs 6,900",
    rating: "4.8",
  },
  {
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80",
    name: "Gopalpur",
    price: "Rs 7,100",
    rating: "4.8",
  },
];

const staticRooms: { image: string; name: string; slug?: string; location: string; rating: string; price: string; oldPrice: string; meta: string }[] = [
  {
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    name: "Sea Breeze Signature Suite",
    slug: undefined,
    location: "Puri Beachfront",
    rating: "4.9",
    price: "Rs 18,500",
    oldPrice: "Rs 22,000",
    meta: "2 Guests · Ocean View · King Bed",
  },
  {
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
    name: "Skyline Premier Room",
    slug: undefined,
    location: "Bhubaneswar Central",
    rating: "4.8",
    price: "Rs 12,000",
    oldPrice: "Rs 14,500",
    meta: "2 Guests · City View · Queen Bed",
  },
  {
    image: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1400&q=80",
    name: "Lagoon Private Villa",
    slug: undefined,
    location: "Chilika Waterfront",
    rating: "5.0",
    price: "Rs 24,000",
    oldPrice: "Rs 29,000",
    meta: "4 Guests · Private Pool · Breakfast",
  },
];

const articles = [
  {
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    category: "Travel Tips",
    title: "How to choose the perfect luxury stay for a weekend escape",
    date: "May 19, 2026",
    time: "5 min read",
  },
  {
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    category: "Destination",
    title: "Why coastal destinations are trending for premium travel now",
    date: "May 16, 2026",
    time: "6 min read",
  },
  {
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    category: "Hospitality",
    title: "Modern hotel amenities guests now expect from top booking platforms",
    date: "May 11, 2026",
    time: "4 min read",
  },
];

export default async function HomePage() {
  let rooms = staticRooms;

  if (isDatabaseConfigured()) {
    try {
      const liveRooms = await getRooms({});
      const featured = liveRooms.filter((r) => r.featured);
      const source = featured.length > 0 ? featured : liveRooms;
      rooms = source.slice(0, 3).map((r) => ({
        image: r.images[0] ?? staticRooms[0].image,
        name: r.name,
        slug: r.slug,
        location: r.location,
        rating: r.rating.toFixed(1),
        price: formatCurrency(r.price),
        oldPrice: formatCurrency(Math.round(r.price * 1.15)),
        meta: `Up to ${r.capacity} guests · ${r.type}`,
      }));
    } catch {
      // fall back to static rooms
    }
  }

  return (
    <div className="bg-[#F8F8F6]">
      <HeroSection />
      <DestinationSection destinations={destinations} />
      <DealsSection />
      <TrendingRooms rooms={rooms} />
      <AmenitiesSection />
      <PromotionalBanner />
      <BlogSection articles={articles} />
      <TestimonialSection />
      <InstagramGallery />
    </div>
  );
}
