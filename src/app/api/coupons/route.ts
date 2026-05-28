import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

export async function GET() {
  try {
    const user = await getApiUser();
    if (!user || user.role !== "admin") return apiError("Admin access required.", 403);

    await connectToDatabase();
    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
    return apiSuccess(coupons);
  } catch {
    return apiError("Unable to fetch coupons.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getApiUser();
    if (!user || user.role !== "admin") return apiError("Admin access required.", 403);

    await connectToDatabase();
    const body = (await request.json()) as {
      code?: string;
      type?: string;
      value?: number;
      minOrder?: number;
      label?: string;
    };

    if (!body.code || !body.type || !body.value || !body.label) {
      return apiError("code, type, value and label are required.", 422);
    }
    if (!["percent", "flat"].includes(body.type)) {
      return apiError("type must be 'percent' or 'flat'.", 422);
    }
    if (body.type === "percent" && (body.value <= 0 || body.value > 100)) {
      return apiError("Percent discount must be 1–100.", 422);
    }

    const existing = await Coupon.findOne({ code: body.code.trim().toUpperCase() });
    if (existing) return apiError("A coupon with this code already exists.", 409);

    const coupon = await Coupon.create({
      code: body.code.trim().toUpperCase(),
      type: body.type as "percent" | "flat",
      value: body.value,
      minOrder: body.minOrder ?? 0,
      label: body.label,
      active: true,
    });

    return apiSuccess(coupon, "Coupon created.", 201);
  } catch {
    return apiError("Unable to create coupon.", 500);
  }
}
