import { Schema } from "mongoose";
import { IOrder } from "./types";

export const orderSchema = new Schema<IOrder>({
  buyerId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  goodId: { type: Schema.Types.ObjectId, required: true, ref: "goods" },
  sellerId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  contactInfo: { type: String, required: true },
  status: { type: String, required: true, default: "unconfirmed" },
});
