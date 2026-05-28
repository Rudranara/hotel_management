import { Crown, Car, UserCheck, MapPin, RefreshCcw, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Crown,
    title: "VIP Check-In Experience",
    description: "Skip the queues with dedicated VIP lounges and personalized welcome service at every property.",
    gradient: "from-amber-500/20 to-yellow-400/5",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-500",
    border: "border-amber-200",
  },
  {
    icon: Car,
    title: "Airport Transfers",
    description: "Complimentary luxury vehicle transfers between the airport and your accommodation.",
    gradient: "from-blue-500/20 to-indigo-400/5",
    iconBg: "bg-blue-500/15",
    iconColor: "text-[#0057D9]",
    border: "border-blue-200",
  },
  {
    icon: UserCheck,
    title: "Personal Travel Concierge",
    description: "A dedicated concierge to handle restaurant reservations, activities, and special requests.",
    gradient: "from-purple-500/20 to-violet-400/5",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-600",
    border: "border-purple-200",
  },
  {
    icon: MapPin,
    title: "Curated Local Experiences",
    description: "Handpicked tours, cultural immersions, and insider access to hidden local gems.",
    gradient: "from-emerald-500/20 to-green-400/5",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-600",
    border: "border-emerald-200",
  },
  {
    icon: RefreshCcw,
    title: "Flexible Booking",
    description: "Free cancellation up to 24 hours before check-in. Modify dates with zero penalties.",
    gradient: "from-rose-500/20 to-pink-400/5",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-500",
    border: "border-rose-200",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance via call, chat, or video from our luxury travel specialists.",
    gradient: "from-cyan-500/20 to-teal-400/5",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-600",
    border: "border-cyan-200",
  },
];

export function AmenitiesSection() {
  return (
    <section id="services" className="bg-[#F7F9FC] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mb-8 text-center lg:mb-12">
          <p className="section-label">Why Choose Huts4u</p>
          <h2 className="section-title mx-auto mt-3 max-w-2xl text-center">
            Every luxury your journey deserves
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#6B7280]">
            We go beyond accommodation — delivering a complete premium travel experience before, during, and after your stay.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className={`group relative overflow-hidden rounded-2xl border ${benefit.border} bg-white p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] lg:p-8`}
              >
                {/* Ambient orb */}
                <div
                  className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${benefit.gradient} blur-3xl transition-transform duration-500 group-hover:scale-150`}
                />
                <div className={`relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${benefit.iconBg}`}>
                  <Icon className={`h-7 w-7 ${benefit.iconColor}`} strokeWidth={1.8} />
                </div>
                <h3 className="relative mb-3 text-lg font-bold text-[#1A2235]">{benefit.title}</h3>
                <p className="relative text-sm leading-7 text-[#6B7280]">{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
