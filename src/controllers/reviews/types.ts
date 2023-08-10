import { Types } from "mongoose";

export interface ICreateReview {
  orderId: Types.ObjectId;
  stars: number;
  text: string;
}
