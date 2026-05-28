import { Model, Schema, model, models } from "mongoose";

export interface CouponDocument {
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
  label: string;
  active: boolean;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<CouponDocument>(
  {
    code:       { type: String, required: true, unique: true, uppercase: true, trim: true },
    type:       { type: String, enum: ["percent", "flat"], required: true },
    value:      { type: Number, required: true, min: 0 },
    minOrder:   { type: Number, default: 0 },
    label:      { type: String, required: true },
    active:     { type: Boolean, default: true },
    usageCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Coupon = (models.Coupon as Model<CouponDocument>) || model<CouponDocument>("Coupon", couponSchema);

export default Coupon;
