import { Model, Schema, Types, model, models } from "mongoose";

export interface ReviewDocument {
  user: Types.ObjectId;
  room: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const Review =
  (models.Review as Model<ReviewDocument>) || model<ReviewDocument>("Review", reviewSchema);

export default Review;
