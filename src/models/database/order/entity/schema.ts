import { Schema } from "mongoose";
import { IOrder } from "./types";

export const orderSchema = new Schema<IOrder>({
  buyerId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  goodId: { type: Schema.Types.ObjectId, required: true, ref: "good" },
  contactInfo: { type: String, required: true },
  status: { type: String, required: true },
});
