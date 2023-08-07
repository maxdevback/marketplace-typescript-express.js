import { model } from "mongoose";
import { IOrder } from "./types";
import { orderSchema } from "./schema";

export const OrderModel = model<IOrder>("order", orderSchema);
