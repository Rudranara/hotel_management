export type Deal = {
  slug: string;
  image: string;
  tag: string;
  discount: number; // percentage, e.g. 35
  title: string;
  description: string;
  cta: string;
  /** Room type keyword used to pre-filter /rooms page */
  roomType: string;
  /** Full detail shown on /deals/[slug] */
  heroImage: string;
  longDescription: string;
  perks: string[];
  terms: string[];
  validUntil: string;
};

export const DEALS: Deal[] = [
  {
    slug: "summer-escape",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2400&q=80",
    tag: "35% Discount",
    discount: 35,
    roomType: "Deluxe",
    title: "Summer escape deals for luxury beachfront stays",
    description:
      "Reserve early and unlock breakfast, flexible check-in, and premium resort credit.",
    cta: "Unlock Deal",
    longDescription:
      "Escape to the coast this summer and indulge in everything a luxury beachfront stay has to offer. Our summer escape package is designed for travellers who want more — more comfort, more flexibility, and more value. Book any beachfront room and instantly unlock a curated set of inclusions that make your stay truly seamless.",
    perks: [
      "Daily complimentary breakfast for two",
      "Flexible check-in from 10 AM",
      "Late check-out until 2 PM",
      "₹2,000 resort credit to spend on dining or spa",
      "Complimentary room upgrade (subject to availability)",
      "Welcome amenity upon arrival",
    ],
    terms: [
      "Valid for stays between June 1 – August 31, 2026.",
      "Minimum 2-night stay required.",
      "Cannot be combined with other promotional offers.",
      "Resort credit is non-refundable and non-transferable.",
      "Advance booking required at least 7 days prior to check-in.",
    ],
    validUntil: "August 31, 2026",
  },
  {
    slug: "room-upgrade",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
    tag: "20% Discount",
    discount: 20,
    roomType: "Suite",
    title: "Book two nights and enjoy a complimentary room upgrade",
    description:
      "Perfect for quick indulgent getaways, romantic escapes, and family breaks.",
    cta: "View Offer",
    longDescription:
      "Sometimes the best experiences come from unexpected upgrades. Book any two consecutive nights with us and we'll move you up to the next room category at no extra cost — so you can experience premium comfort at an everyday rate. Perfect for weekend getaways, anniversaries, and family holidays.",
    perks: [
      "Automatic upgrade to next room category",
      "20% off published room rates",
      "Turndown service each evening",
      "Complimentary bottle of sparkling wine on arrival",
      "Priority restaurant reservations",
      "Access to exclusive lounge (select room categories)",
    ],
    terms: [
      "Offer valid on 2-night minimum bookings.",
      "Room upgrade subject to availability at time of check-in.",
      "20% discount applied to base room rate only.",
      "Valid for new bookings made before July 31, 2026.",
      "Not applicable on public holidays or peak festival dates.",
    ],
    validUntil: "July 31, 2026",
  },
];

export function getDealBySlug(slug: string): Deal | undefined {
  return DEALS.find((d) => d.slug === slug);
}
