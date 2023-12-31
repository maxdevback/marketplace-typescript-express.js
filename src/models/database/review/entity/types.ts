import { Document, Types } from "mongoose";

export interface IReview extends Document {
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  goodId: Types.ObjectId;
  stars: number;
  edited: boolean;
  text: string;
}
