import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { COUPONS } from "@/lib/constants";
import { connectToDatabase } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

export async function POST(request: Request) {
  try {
    const user = await getApiUser();
    if (!user) return apiError("Authentication required.", 401);

    const { code, totalPrice } = (await request.json()) as {
      code?: string;
      totalPrice?: number;
    };

    if (!code || typeof totalPrice !== "number") {
      return apiError("Invalid request.", 400);
    }

    const normalized = code.trim().toUpperCase();

    // Check DB coupons first, fall back to hardcoded constants
    await connectToDatabase();
    const dbCoupon = await Coupon.findOne({ code: normalized, active: true }).lean();

    const coupon: { type: "percent" | "flat"; value: number; minOrder?: number; label: string } | undefined =
      dbCoupon
        ? { type: dbCoupon.type, value: dbCoupon.value, minOrder: dbCoupon.minOrder, label: dbCoupon.label }
        : COUPONS[normalized];

    if (!coupon) {
      return apiError("Invalid or expired coupon code.", 404);
    }

    if (coupon.minOrder && totalPrice < coupon.minOrder) {
      return apiError(
        `This coupon requires a minimum order of ₹${coupon.minOrder.toLocaleString("en-IN")}.`,
        422,
      );
    }

    const discount =
      coupon.type === "percent"
        ? Math.round((totalPrice * coupon.value) / 100)
        : Math.min(coupon.value, totalPrice);

    const finalAmount = Math.max(totalPrice - discount, 0);

    // Increment usage count if DB coupon
    if (dbCoupon) {
      await Coupon.findByIdAndUpdate(dbCoupon._id, { $inc: { usageCount: 1 } });
    }

    return apiSuccess(
      { discount, finalAmount, label: coupon.label },
      `Coupon applied — ${coupon.label}`,
    );
  } catch {
    return apiError("Unable to apply coupon.", 500);
  }
}
