import { Types } from "mongoose";
import { ReviewModel } from "../entity/models";
import { ICreateReview } from "../../../../controllers/reviews/types";
import CustomError from "../../../error";
import OrderDB from "../../order/logic";
import UserDB from "../../user/logic";
import GoodDB from "../../good/logic";

class ReviewDB {
  async getById(reviewId: Types.ObjectId) {
    const review = await ReviewModel.findById(reviewId);
    if (!review)
      throw CustomError.notExist("The review with that id dose not exist");
    return review;
  }
  async getByOrderId(orderId: Types.ObjectId) {
    const order = await OrderDB.getExternal(orderId);
    if (!order)
      throw CustomError.notExist("The order with that id dose not exist");
    const review = await ReviewModel.findOne({ orderId });
    if (!review)
      throw CustomError.notExist("The review with that id dose not exist");
  }
  async getAllByBuyerId(buyerId: Types.ObjectId) {
    const buyer = UserDB.getExternal(buyerId);
    if (!buyer)
      throw CustomError.notExist("The buyer with that id dose not exist");

    const review = await ReviewModel.find({ buyerId });
    if (!review)
      throw CustomError.notExist("The review with that id dose not exist");
    return review;
  }
  async getAllBySellerId(sellerId: Types.ObjectId) {
    // const seller = UserDB.getExternal(sellerId);
    // if (!seller)
    //   throw CustomError.notExist("The seller with id dose not exist");
    // const review = await ReviewModel.find({})
    // return await ReviewModel.find({ sellerId });
  }
  async getAllByGoodId(goodId: Types.ObjectId) {
    const good = await GoodDB.getExternal(goodId);
    if (!good)
      throw CustomError.notExist("The good with that id dose not exist");
    const review = await ReviewModel.find({ goodId });
    if (!review)
      throw CustomError.notExist("The review with that id dose not exist");
    return review;
  }
  async create(buyerId: Types.ObjectId, data: ICreateReview) {
    const buyer = await UserDB.getExternal(buyerId);
    if (!buyer)
      throw CustomError.notExist("The buyer with that id dose not exist");
    return await ReviewModel.create({ ...data, buyerId });
  }
  async patch(reviewId: Types.ObjectId, data: any) {
    const review = await ReviewModel.findById(reviewId);
    if (!review)
      throw CustomError.notExist("The review with that id dose not exist");
    return await ReviewModel.findByIdAndUpdate(reviewId, data);
  }
  async delete(reviewId: Types.ObjectId) {
    //TODO: Create check owner in all DB entities. Delete, patch etc.
    const review = await ReviewModel.findById(reviewId);
    if (!review)
      throw CustomError.notExist("The review with that id dose not exist");
    return await ReviewModel.findByIdAndDelete(reviewId);
  }
}

export default new ReviewDB();
