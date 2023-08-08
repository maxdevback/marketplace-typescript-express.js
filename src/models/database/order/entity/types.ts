import { Document, Types } from "mongoose";

export interface IOrder extends Document {
  buyerId: Types.ObjectId;
  goodId: Types.ObjectId;
  status: string;
  contactInfo: string;
}
