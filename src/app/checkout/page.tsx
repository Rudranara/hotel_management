"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft, Shield, User, Mail, Phone, Users,
  MapPin, CalendarDays, Tag, Info, ChevronRight,
} from "lucide-react";

type Step = "traveller" | "review" | "payment";

const steps: { id: Step; label: string }[] = [
  { id: "traveller", label: "Traveller Info"  },
  { id: "review",    label: "Review & Add-ons" },
  { id: "payment",   label: "Payment"          },
];

const bookingSummary = {
  image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
  name: "The Grand Udaipur Palace",
  location: "Udaipur, Rajasthan",
  checkIn: "Fri, Jul 15, 2026",
  checkOut: "Mon, Jul 18, 2026",
  nights: 3,
  guests: "2 Adults",
  roomType: "Deluxe King Room",
  basePrice: 18500,
  taxes: 3330,
  discount: 5500,
  insurance: 499,
};

function StepIndicator({ current }: { current: Step }) {
  const idx = steps.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center justify-center gap-0 sm:gap-2">
      {steps.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={step.id} className="flex items-center gap-0 sm:gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition sm:h-9 sm:w-9 ${done ? "step-done" : active ? "step-active" : "step-inactive"}`}>
              {done ? "✓" : i + 1}
            </div>
            <span className={`hidden text-xs font-semibold sm:inline ${active ? "text-[#0057D9]" : done ? "text-[#22C55E]" : "text-[#9CA3AF]"}`}>{step.label}</span>
            {i < steps.length - 1 && <div className={`mx-2 h-px w-8 transition sm:w-16 ${done ? "bg-[#22C55E]" : "bg-[#E5E7EB]"}`} />}
          </div>
        );
      })}
    </div>
  );
}

function TravellerForm({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1A2235]">Traveller Information</h2>
        <p className="mt-1 text-sm text-[#6B7280]">Enter details as per your government-issued ID</p>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#1A2235]">
          <User className="h-4 w-4 text-[#0057D9]" />Adult 1 (Primary Guest)
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "First Name",    icon: User,         placeholder: "Enter first name",    type: "text" },
            { label: "Last Name",     icon: User,         placeholder: "Enter last name",     type: "text" },
            { label: "Email Address", icon: Mail,         placeholder: "your@email.com",      type: "email" },
            { label: "Phone Number",  icon: Phone,        placeholder: "+91 9876543210",      type: "tel" },
          ].map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.label}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#6B7280]">{field.label}</label>
                <div className="flex items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-3 py-3 transition focus-within:border-[#0057D9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0057D9]/15">
                  <Icon className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
                  <input type={field.type} placeholder={field.placeholder} className="flex-1 bg-transparent text-sm text-[#1A2235] placeholder:text-[#9CA3AF] focus:outline-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#1A2235]">
          <Users className="h-4 w-4 text-[#0057D9]" />Adult 2
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#6B7280]">First Name</label>
            <input type="text" placeholder="Enter first name" className="w-full rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-3 py-3 text-sm text-[#1A2235] placeholder:text-[#9CA3AF] focus:border-[#0057D9] focus:outline-none focus:ring-2 focus:ring-[#0057D9]/15" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Last Name</label>
            <input type="text" placeholder="Enter last name" className="w-full rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-3 py-3 text-sm text-[#1A2235] placeholder:text-[#9CA3AF] focus:border-[#0057D9] focus:outline-none focus:ring-2 focus:ring-[#0057D9]/15" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1A2235]">
          <Tag className="h-4 w-4 text-[#0057D9]" />Coupon / Promo Code
        </p>
        <div className="flex gap-2">
          <input type="text" placeholder="Enter coupon code" className="flex-1 rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-sm focus:border-[#0057D9] focus:outline-none" />
          <button className="rounded-xl bg-[#0057D9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003A8C]">Apply</button>
        </div>
        <p className="mt-2 text-xs text-[#9CA3AF]">Try: TRAVEL20 for 20% off</p>
      </div>

      <button onClick={onNext} className="btn-primary w-full justify-center py-4 text-base">
        Continue to Review <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ReviewStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [addInsurance, setAddInsurance] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1A2235]">Review Your Booking</h2>
        <p className="mt-1 text-sm text-[#6B7280]">Double-check details before proceeding to payment</p>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-[#1A2235]">Booking Details</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: MapPin,       label: "Property",   value: bookingSummary.name      },
            { icon: CalendarDays, label: "Check In",   value: bookingSummary.checkIn   },
            { icon: CalendarDays, label: "Check Out",  value: bookingSummary.checkOut  },
            { icon: Users,        label: "Guests",     value: bookingSummary.guests    },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.label} className="flex items-start gap-3 rounded-xl bg-[#F7F9FC] p-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0057D9]" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9CA3AF]">{r.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#1A2235]">{r.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Travel Insurance Upsell */}
      <div
        onClick={() => setAddInsurance((p) => !p)}
        className={`cursor-pointer rounded-2xl border-2 p-5 transition ${addInsurance ? "border-[#0057D9] bg-[#EEF4FF]" : "border-[#E5E7EB] bg-white"}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Shield className={`mt-0.5 h-5 w-5 shrink-0 ${addInsurance ? "text-[#0057D9]" : "text-[#9CA3AF]"}`} />
            <div>
              <p className="font-semibold text-[#1A2235]">Add Travel Insurance</p>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                Covers trip cancellation, medical emergencies, and lost baggage up to ₹10 Lakh coverage
              </p>
              <p className="mt-2 text-sm font-bold text-[#0057D9]">₹{bookingSummary.insurance} / person</p>
            </div>
          </div>
          <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${addInsurance ? "border-[#0057D9] bg-[#0057D9]" : "border-[#E5E7EB]"}`}>
            {addInsurance && <span className="text-[10px] text-white font-bold">✓</span>}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary px-6 py-4">
          <ChevronLeft className="h-4 w-4" />Back
        </button>
        <button onClick={onNext} className="btn-primary flex-1 justify-center py-4 text-base">
          Proceed to Payment <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const paymentMethods = [
  { id: "upi",    label: "UPI",          desc: "GPay, PhonePe, BHIM",  icon: "⚡" },
  { id: "card",   label: "Credit/Debit Card", desc: "Visa, Mastercard, RuPay", icon: "💳" },
  { id: "nb",     label: "Net Banking",  desc: "All major banks",      icon: "🏦" },
  { id: "wallet", label: "Wallets",      desc: "Paytm, Amazon Pay",    icon: "👝" },
  { id: "emi",    label: "EMI",          desc: "No-cost EMI options",  icon: "📅" },
];

function PaymentStep({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  const [selected, setSelected] = useState("upi");
  const total = bookingSummary.basePrice * bookingSummary.nights + bookingSummary.taxes + bookingSummary.insurance - bookingSummary.discount;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1A2235]">Choose Payment Method</h2>
        <p className="mt-1 text-sm text-[#6B7280]">100% secure payments powered by Razorpay</p>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition ${selected === method.id ? "border-[#0057D9] bg-[#EEF4FF]" : "border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-[#F7F9FC]"}`}
            >
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${selected === method.id ? "text-[#0057D9]" : "text-[#1A2235]"}`}>{method.label}</p>
                <p className="text-xs text-[#6B7280]">{method.desc}</p>
              </div>
              <div className={`h-5 w-5 rounded-full border-2 transition ${selected === method.id ? "border-[#0057D9] bg-[#0057D9]" : "border-[#D1D5DB]"}`}>
                {selected === method.id && <div className="m-auto mt-0.5 h-2 w-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected === "upi" && (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-[#1A2235]">Enter UPI ID</p>
          <div className="flex gap-2">
            <input type="text" placeholder="yourname@upi" className="flex-1 rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-sm focus:border-[#0057D9] focus:outline-none" />
            <button className="rounded-xl bg-[#0057D9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003A8C]">Verify</button>
          </div>
        </div>
      )}

      {selected === "card" && (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-4">
          <p className="text-sm font-semibold text-[#1A2235]">Card Details</p>
          <input type="text" placeholder="Card Number" className="w-full rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-sm focus:border-[#0057D9] focus:outline-none" maxLength={19} />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="MM/YY" className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-sm focus:border-[#0057D9] focus:outline-none" />
            <input type="text" placeholder="CVV" className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-sm focus:border-[#0057D9] focus:outline-none" maxLength={4} />
          </div>
          <input type="text" placeholder="Cardholder Name" className="w-full rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-sm focus:border-[#0057D9] focus:outline-none" />
        </div>
      )}

      <div className="rounded-2xl border border-[#22C55E]/30 bg-[#F0FDF4] p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#16A34A]" />
          <p className="text-xs font-semibold text-[#16A34A]">256-bit SSL encrypted · PCI-DSS compliant · Your data is 100% safe</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary px-6 py-4">
          <ChevronLeft className="h-4 w-4" />Back
        </button>
        <button onClick={onConfirm} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FF6B35] py-4 text-base font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.4)] transition hover:bg-[#E85520]">
          Pay ₹{total.toLocaleString()} Securely
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("traveller");
  const [confirmed, setConfirmed] = useState(false);
  const total = bookingSummary.basePrice * bookingSummary.nights + bookingSummary.taxes + bookingSummary.insurance - bookingSummary.discount;

  if (confirmed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F9FC] px-4 py-16 text-center">
        <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 shadow-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7]">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="mt-6 text-2xl font-extrabold text-[#1A2235] sm:text-3xl">Booking Confirmed!</h1>
          <p className="mt-3 text-sm text-[#6B7280]">Your booking reference is <strong className="text-[#0057D9]">#HTU2026071501</strong></p>
          <div className="mt-6 rounded-2xl bg-[#F7F9FC] p-4 text-left">
            <p className="font-bold text-[#1A2235]">{bookingSummary.name}</p>
            <p className="mt-1 text-sm text-[#6B7280]">{bookingSummary.checkIn} → {bookingSummary.checkOut}</p>
            <p className="mt-0.5 text-sm text-[#6B7280]">{bookingSummary.roomType} · {bookingSummary.guests}</p>
            <p className="mt-3 text-lg font-extrabold text-[#0057D9]">₹{total.toLocaleString()} Paid</p>
          </div>
          <p className="mt-4 text-xs text-[#9CA3AF]">Confirmation email sent to your registered email address</p>
          <div className="mt-6 flex gap-3">
            <Link href="/dashboard/bookings" className="btn-secondary flex-1 justify-center">View Booking</Link>
            <Link href="/" className="btn-primary flex-1 justify-center">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] bg-white px-4 py-5 shadow-sm">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center gap-3">
            <Link href="/rooms" className="flex items-center gap-1.5 text-sm text-[#6B7280] transition hover:text-[#0057D9]">
              <ChevronLeft className="h-4 w-4" />Back to results
            </Link>
          </div>
          <StepIndicator current={step} />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: current step */}
          <div>
            {step === "traveller" && <TravellerForm onNext={() => setStep("review")} />}
            {step === "review"    && <ReviewStep onNext={() => setStep("payment")} onBack={() => setStep("traveller")} />}
            {step === "payment"   && <PaymentStep onBack={() => setStep("review")} onConfirm={() => setConfirmed(true)} />}
          </div>

          {/* Right: booking summary */}
          <div className="lg:self-start lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <p className="mb-4 font-bold text-[#1A2235]">Booking Summary</p>
              <div className="relative h-36 overflow-hidden rounded-xl">
                <Image src={bookingSummary.image} alt={bookingSummary.name} fill className="object-cover" sizes="380px" />
              </div>
              <p className="mt-3 font-bold text-[#1A2235]">{bookingSummary.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-[#6B7280]">
                <MapPin className="h-3 w-3" />{bookingSummary.location}
              </p>
              <div className="mt-3 space-y-1.5 rounded-xl bg-[#F7F9FC] p-3 text-xs">
                <div className="flex justify-between"><span className="text-[#6B7280]">Check-in</span><span className="font-semibold text-[#1A2235]">{bookingSummary.checkIn}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Check-out</span><span className="font-semibold text-[#1A2235]">{bookingSummary.checkOut}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Room</span><span className="font-semibold text-[#1A2235]">{bookingSummary.roomType}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Guests</span><span className="font-semibold text-[#1A2235]">{bookingSummary.guests}</span></div>
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between text-[#6B7280]">
                  <span>₹{bookingSummary.basePrice.toLocaleString()} × {bookingSummary.nights} nights</span>
                  <span>₹{(bookingSummary.basePrice * bookingSummary.nights).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Taxes & fees</span><span>₹{bookingSummary.taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Travel insurance</span><span>₹{bookingSummary.insurance}</span>
                </div>
                <div className="flex justify-between text-[#16A34A] font-semibold">
                  <span>Discount applied</span><span>−₹{bookingSummary.discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-[#E5E7EB] pt-2 text-base font-extrabold text-[#1A2235]">
                  <span>Total</span><span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#F0FDF4] px-3 py-2">
                <Shield className="h-3.5 w-3.5 text-[#16A34A]" />
                <p className="text-[11px] font-medium text-[#16A34A]">Free cancellation before Jul 12</p>
              </div>
              <div className="mt-3 flex items-start gap-1.5 rounded-xl bg-[#FFFBEB] px-3 py-2">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D97706]" />
                <p className="text-[11px] text-[#92400E]">Price includes all taxes. No hidden charges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
