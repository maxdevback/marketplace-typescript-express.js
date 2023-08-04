import { Document, Types } from "mongoose";

export interface IGood extends Document {
  title: string;
  description: string;
  price: number;
  sellerId: Types.ObjectId;
}
