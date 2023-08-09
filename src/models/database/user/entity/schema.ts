import { Schema } from "mongoose";
import { IUser } from "./types";

export const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarLink: { type: String },
  about: { type: String },
});
