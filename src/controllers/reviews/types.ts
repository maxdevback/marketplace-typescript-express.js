import { Types } from "mongoose";

export interface ICreateReview extends Document {
  buyerId: Types.ObjectId;
  goodId: Types.ObjectId;
  stars: number;
  text: string;
}
