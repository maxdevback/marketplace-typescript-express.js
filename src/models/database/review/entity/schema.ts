import { Schema } from "mongoose";
import { IReview } from "./types";

export const reviewSchema = new Schema<IReview>({
  buyerId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  sellerId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  goodId: { type: Schema.Types.ObjectId, required: true, ref: "goods" },
  stars: { type: Number, required: true },
  edited: { type: Boolean, required: true, default: false },
  text: { type: String, required: true },
});
