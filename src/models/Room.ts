import { Model, Schema, model, models } from "mongoose";

export interface RoomDocument {
  name: string;
  slug: string;
  description: string;
  type: string;
  location: string;
  images: string[];
  price: number;
  capacity: number;
  amenities: string[];
  availabilityStatus: "available" | "limited" | "unavailable";
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema<RoomDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    capacity: { type: Number, required: true, min: 1 },
    amenities: [{ type: String, default: [] }],
    availabilityStatus: {
      type: String,
      enum: ["available", "limited", "unavailable"],
      default: "available",
    },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Room = (models.Room as Model<RoomDocument>) || model<RoomDocument>("Room", roomSchema);

export default Room;
