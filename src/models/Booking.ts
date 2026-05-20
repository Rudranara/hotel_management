import { Model, Schema, Types, model, models } from "mongoose";

export interface BookingDocument {
  user: Types.ObjectId;
  room: Types.ObjectId;
  bookingNumber: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<BookingDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    bookingNumber: { type: String, required: true, unique: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    specialRequests: { type: String, default: "" },
  },
  { timestamps: true },
);

bookingSchema.index({ room: 1, checkIn: 1, checkOut: 1, status: 1 });

const Booking =
  (models.Booking as Model<BookingDocument>) || model<BookingDocument>("Booking", bookingSchema);

export default Booking;
