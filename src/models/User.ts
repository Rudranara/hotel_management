import { Model, Schema, model, models } from "mongoose";

type UserRole = "guest" | "admin";

export interface UserDocument {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
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
  },
  { timestamps: true },
);

const User = (models.User as Model<UserDocument>) || model<UserDocument>("User", userSchema);

export default User;
