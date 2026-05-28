import { redirect } from "next/navigation";

/**
 * /checkout was a non-functional UI mock with hardcoded data.
 * The real booking flow is: /rooms -> /booking/[roomId] -> Razorpay -> /booking/confirmation/[id]
 * Visitors who land here directly are redirected to /rooms.
 */
export default function CheckoutPage() {
  redirect("/rooms");
}
