import { Model, Schema, model, models, Types } from "mongoose";

type UserRole = "guest" | "admin";

export interface AiSearchHistoryEntry {
  query:     string;
  label:     string;
  filters:   Record<string, unknown>;
  createdAt: Date;
}

export interface UserDocument {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
  wishlist: Types.ObjectId[];
  aiSearchHistory: AiSearchHistoryEntry[];
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["guest", "admin"], default: "guest" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    avatar: { type: String, default: "" },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Room", default: [] }],
    aiSearchHistory: {
      type: [
        {
          query:     { type: String, required: true },
          label:     { type: String, required: true },
          filters:   { type: Schema.Types.Mixed, default: {} },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
  },
  { timestamps: true },
);

const User = (models.User as Model<UserDocument>) || model<UserDocument>("User", userSchema);

export default User;
