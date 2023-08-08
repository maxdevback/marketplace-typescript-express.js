import { Schema } from "mongoose";
import { IGood } from "./types";

export const goodSchema = new Schema<IGood>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});
