import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getApiUser();
    if (!user || user.role !== "admin") return apiError("Admin access required.", 403);

    await connectToDatabase();
    const { id } = await params;
    const body = (await request.json()) as Partial<{
      code: string; type: string; value: number; minOrder: number; label: string; active: boolean;
    }>;

    const coupon = await Coupon.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!coupon) return apiError("Coupon not found.", 404);

    return apiSuccess(coupon, "Coupon updated.");
  } catch {
    return apiError("Unable to update coupon.", 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getApiUser();
    if (!user || user.role !== "admin") return apiError("Admin access required.", 403);

    await connectToDatabase();
    const { id } = await params;
    const deleted = await Coupon.findByIdAndDelete(id).lean();
    if (!deleted) return apiError("Coupon not found.", 404);

    return apiSuccess(null, "Coupon deleted.");
  } catch {
    return apiError("Unable to delete coupon.", 500);
  }
}
