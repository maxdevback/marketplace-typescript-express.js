import { model } from "mongoose";
import { IReview } from "./types";
import { reviewSchema } from "./schema";

export const ReviewModel = model<IReview>("review", reviewSchema);
