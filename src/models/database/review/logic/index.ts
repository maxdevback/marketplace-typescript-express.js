import { Types } from "mongoose";
import { ReviewModel } from "../entity/models";
import { ICreateReview } from "../../../../controllers/reviews/types";
import CustomError from "../../../error";
import OrderDB from "../../order/logic";
import UserDB from "../../user/logic";
import GoodDB from "../../good/logic";
import { IGetReviewQuery } from "./types";

class ReviewDB {
  _pagination(page: number, pageSize: number) {
    return {
      skip: page === 0 ? 0 : (page - 1) * pageSize,
      limit: pageSize,
    };
  }
  _query(query: IGetReviewQuery) {
    const conditions: any = {};
    if (query.edited !== undefined) {
      conditions.edited = query.edited;
    }
    if (query.minStarts || query.maxStarts) {
      conditions.starts = {};
    }
    if (query.minStarts) {
      conditions.price.$gte = query.minStarts;
    }
    if (query.maxStarts) {
      conditions.price.$lte = query.minStarts;
    }
    const dbSearch = ReviewModel.find(conditions);
    if (query.page) {
      const pagination = this._pagination(query.page, query.pageSize);
      dbSearch.skip(pagination.skip).limit(pagination.limit);
    }
    return dbSearch;
  }
  async getById(reviewId: Types.ObjectId) {
    const review = await ReviewModel.findById(reviewId);
    if (!review)
      throw CustomError.notExist("The review with that id dose not exist");
    return review;
  }
  async getByOrderId(orderId: Types.ObjectId, query?: IGetReviewQuery) {
    const order = await OrderDB.getExternal(orderId);
    if (!order)
      throw CustomError.notExist("The order with that id dose not exist");
    return query
      ? await this._query(query).where({ orderId })
      : await ReviewModel.find({ orderId });
  }
  async getAllByBuyerId(buyerId: Types.ObjectId, query?: IGetReviewQuery) {
    const buyer = UserDB.getExternal(buyerId);
    if (!buyer)
      throw CustomError.notExist("The buyer with that id dose not exist");

    return query
      ? await this._query(query).where({ buyerId })
      : await ReviewModel.find({ buyerId });
  }
  async getAllBySellerId(sellerId: Types.ObjectId, query?: IGetReviewQuery) {
    const seller = UserDB.getExternal(sellerId);
    if (!seller)
      throw CustomError.notExist("The seller with id dose not exist");
    return query
      ? await this._query(query).where({ sellerId })
      : await ReviewModel.find({ sellerId });
  }
  async getAllByGoodId(goodId: Types.ObjectId, query?: IGetReviewQuery) {
    const good = await GoodDB.getExternal(goodId);
    if (!good)
      throw CustomError.notExist("The good with that id dose not exist");
    return query
      ? await this._query(query).where({ goodId })
      : await ReviewModel.find({ goodId });
  }
  async create(
    buyerId: Types.ObjectId,
    sellerId: Types.ObjectId,
    data: ICreateReview
  ) {
    const buyer = await UserDB.getExternal(buyerId);
    if (!buyer)
      throw CustomError.notExist("The buyer with that id dose not exist");
    return await ReviewModel.create({ ...data, buyerId, sellerId });
  }
  async patch(
    reviewId: Types.ObjectId,
    data: ICreateReview,
    authId: Types.ObjectId
  ) {
    const review = await ReviewModel.findById(reviewId);
    if (!review)
      throw CustomError.notExist("The review with that id dose not exist");
    if (review.buyerId !== authId)
      return await ReviewModel.findByIdAndUpdate(reviewId, data);
  }
  async delete(reviewId: Types.ObjectId, authId: Types.ObjectId) {
    //TODO: Create check owner in all DB entities. Delete, patch etc.
    const review = await ReviewModel.findById(reviewId);
    if (!review)
      throw CustomError.notExist("The review with that id dose not exist");
    if (review.buyerId !== authId) throw CustomError.forbidden();
    return await ReviewModel.findByIdAndDelete(reviewId);
  }
}

export default new ReviewDB();
