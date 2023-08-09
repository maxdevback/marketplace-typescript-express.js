import { Schema } from "mongoose";
import { IReview } from "./types";

export const reviewSchema = new Schema<IReview>({
  buyerId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  sellerId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  goodId: { type: Schema.Types.ObjectId, required: true, ref: "good" },
  stars: { type: Number, required: true },
  edited: { type: Boolean, required: true, default: false },
  text: { type: String, required: true },
});
