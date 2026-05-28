import { env, isEmailConfigured } from "@/lib/env";

interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  bookingNumber: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
}

function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function bookingConfirmedHtml(data: BookingEmailData) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Booking Confirmed — Huts4u</title></head>
<body style="font-family:system-ui,sans-serif;background:#F1F5F9;padding:40px 16px;margin:0">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E5E7EB">
    <div style="background:#22C7C7;padding:32px 40px">
      <p style="margin:0;color:#fff;font-size:22px;font-weight:700">Huts4u</p>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Booking Confirmation</p>
    </div>
    <div style="padding:32px 40px">
      <p style="color:#111827;font-size:16px">Hi ${data.guestName},</p>
      <p style="color:#6B7280;line-height:1.6">Your reservation has been received. Here's your booking summary:</p>
      <div style="background:#F8FAFC;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin:24px 0">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;color:#9CA3AF">Booking Ref</td><td style="padding:6px 0;color:#111827;font-weight:600;text-align:right;font-family:monospace">${data.bookingNumber}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF">Room</td><td style="padding:6px 0;color:#111827;text-align:right">${data.roomName}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF">Check-in</td><td style="padding:6px 0;color:#111827;text-align:right">${data.checkIn}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF">Check-out</td><td style="padding:6px 0;color:#111827;text-align:right">${data.checkOut}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF">Nights</td><td style="padding:6px 0;color:#111827;text-align:right">${data.nights}</td></tr>
          <tr style="border-top:1px solid #E5E7EB"><td style="padding:12px 0 0;color:#111827;font-weight:600">Total</td><td style="padding:12px 0 0;color:#22C7C7;font-weight:700;font-size:18px;text-align:right">${formatINR(data.totalPrice)}</td></tr>
        </table>
      </div>
      <p style="color:#6B7280;font-size:14px">Questions? Reply to this email or visit your <a href="${env.appUrl}/dashboard/bookings" style="color:#22C7C7">bookings dashboard</a>.</p>
      <p style="color:#9CA3AF;font-size:13px;margin-top:32px;border-top:1px solid #E5E7EB;padding-top:20px">© Huts4u · Odisha, India</p>
    </div>
  </div>
</body>
</html>`;
}

function bookingCancelledHtml(data: Pick<BookingEmailData, "guestName" | "bookingNumber" | "roomName">) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Booking Cancelled — Huts4u</title></head>
<body style="font-family:system-ui,sans-serif;background:#F1F5F9;padding:40px 16px;margin:0">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E5E7EB">
    <div style="background:#0F172A;padding:32px 40px">
      <p style="margin:0;color:#fff;font-size:22px;font-weight:700">Huts4u</p>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:14px">Booking Cancellation</p>
    </div>
    <div style="padding:32px 40px">
      <p style="color:#111827;font-size:16px">Hi ${data.guestName},</p>
      <p style="color:#6B7280;line-height:1.6">Your booking <strong style="color:#111827;font-family:monospace">${data.bookingNumber}</strong> for <strong style="color:#111827">${data.roomName}</strong> has been cancelled.</p>
      <p style="color:#6B7280;font-size:14px">If this was a mistake, please <a href="${env.appUrl}/rooms" style="color:#22C7C7">browse our rooms</a> and make a new reservation.</p>
      <p style="color:#9CA3AF;font-size:13px;margin-top:32px;border-top:1px solid #E5E7EB;padding-top:20px">© Huts4u · Odisha, India</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendBookingConfirmedEmail(data: BookingEmailData) {
  if (!isEmailConfigured()) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(env.resendApiKey);

    await resend.emails.send({
      from: env.resendFrom,
      to: data.guestEmail,
      subject: `Booking Confirmed — ${data.bookingNumber} · Huts4u`,
      html: bookingConfirmedHtml(data),
    });
  } catch (err) {
    // Email failure should never break the booking flow
    console.error("[email] Failed to send booking confirmation:", err);
  }
}

function paymentConfirmedHtml(data: BookingEmailData) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Payment Confirmed — Huts4u</title></head>
<body style="font-family:system-ui,sans-serif;background:#F1F5F9;padding:40px 16px;margin:0">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E5E7EB">
    <div style="background:linear-gradient(135deg,#0057D9 0%,#22C7C7 100%);padding:32px 40px">
      <p style="margin:0;color:#fff;font-size:22px;font-weight:700">Huts4u</p>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Payment Confirmed ✓</p>
    </div>
    <div style="padding:32px 40px">
      <p style="color:#111827;font-size:16px">Hi ${data.guestName},</p>
      <p style="color:#6B7280;line-height:1.6">Your payment has been received and your booking is <strong style="color:#16A34A">fully confirmed</strong>. We look forward to welcoming you.</p>
      <div style="background:#F8FAFC;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin:24px 0">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;color:#9CA3AF">Booking Ref</td><td style="padding:6px 0;color:#111827;font-weight:600;text-align:right;font-family:monospace">${data.bookingNumber}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF">Room</td><td style="padding:6px 0;color:#111827;text-align:right">${data.roomName}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF">Check-in</td><td style="padding:6px 0;color:#111827;text-align:right">${data.checkIn}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF">Check-out</td><td style="padding:6px 0;color:#111827;text-align:right">${data.checkOut}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF">Nights</td><td style="padding:6px 0;color:#111827;text-align:right">${data.nights}</td></tr>
          <tr style="border-top:1px solid #E5E7EB"><td style="padding:12px 0 0;color:#111827;font-weight:600">Amount paid</td><td style="padding:12px 0 0;color:#22C7C7;font-weight:700;font-size:18px;text-align:right">${formatINR(data.totalPrice)}</td></tr>
        </table>
      </div>
      <p style="color:#6B7280;font-size:14px">View your booking anytime in your <a href="${env.appUrl}/dashboard/bookings" style="color:#22C7C7">bookings dashboard</a>.</p>
      <p style="color:#9CA3AF;font-size:13px;margin-top:32px;border-top:1px solid #E5E7EB;padding-top:20px">© Huts4u · Odisha, India</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendPaymentConfirmedEmail(data: BookingEmailData) {
  if (!isEmailConfigured()) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(env.resendApiKey);

    await resend.emails.send({
      from: env.resendFrom,
      to: data.guestEmail,
      subject: `Payment Confirmed — ${data.bookingNumber} · Huts4u`,
      html: paymentConfirmedHtml(data),
    });
  } catch (err) {
    console.error("[email] Failed to send payment confirmation:", err);
  }
}

export async function sendBookingCancelledEmail(
  data: Pick<BookingEmailData, "guestName" | "guestEmail" | "bookingNumber" | "roomName">,
) {
  if (!isEmailConfigured()) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(env.resendApiKey);

    await resend.emails.send({
      from: env.resendFrom,
      to: data.guestEmail,
      subject: `Booking Cancelled — ${data.bookingNumber} · Huts4u`,
      html: bookingCancelledHtml(data),
    });
  } catch (err) {
    console.error("[email] Failed to send cancellation email:", err);
  }
}
