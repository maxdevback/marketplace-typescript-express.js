import { Types } from "mongoose";
import { ReviewModel } from "../entity/models";

class ReviewDB {
  async getById(reviewId: Types.ObjectId) {
    return await ReviewModel.findById(reviewId);
  }
  async getByOrderId(orderId: Types.ObjectId) {
    return await ReviewModel.findOne({ orderId });
  }
  async getAllByBuyerId(buyerId: Types.ObjectId) {
    return await ReviewModel.find({ buyerId });
  }
  async getAllBySellerId(sellerId: Types.ObjectId) {
    return await ReviewModel.find({ sellerId });
  }
  async getAllByGoodId(goodId: Types.ObjectId) {
    return await ReviewModel.find({ goodId });
  }
  async create(data: any) {
    return await ReviewModel.create(data);
  }
  async patch(reviewId: Types.ObjectId, data: any) {
    return await ReviewModel.findByIdAndUpdate(reviewId, data);
  }
  async delete(reviewId: Types.ObjectId) {
    return await ReviewModel.findByIdAndDelete(reviewId);
  }
}

export default new ReviewDB();
