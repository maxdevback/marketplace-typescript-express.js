import { Request, Response } from "express";
import Utils from "../utils";
import CustomError from "../../models/error";
import ReviewDB from "../../models/database/review/logic";
import { Types } from "mongoose";
import ReviewValidate from "./validate";
import { ICreateReview } from "./types";

//TODO: Change any body to interfaces
class ReviewsController {
  async getById(req: Request<{ reviewId: Types.ObjectId }>, res: Response) {
    try {
      ReviewValidate.validateId(req.params.reviewId);
      Utils.sendSuccessResponse(
        res,
        await ReviewDB.getById(req.params.reviewId)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getByOrderId(req: Request<{ orderId: Types.ObjectId }>, res: Response) {
    try {
      ReviewValidate.validateId(req.params.orderId);
      Utils.sendSuccessResponse(
        res,
        await ReviewDB.getByOrderId(req.params.orderId)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getAllByBuyerId(
    req: Request<{ buyerId: Types.ObjectId }>,
    res: Response
  ) {
    try {
      ReviewValidate.validateId(req.params.buyerId);
      Utils.sendSuccessResponse(
        res,
        await ReviewDB.getAllByBuyerId(req.params.buyerId)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getAllBySellerId(
    req: Request<{ sellerId: Types.ObjectId }>,
    res: Response
  ) {
    try {
      ReviewValidate.validateId(req.params.sellerId);
      Utils.sendSuccessResponse(
        res,
        await ReviewDB.getAllBySellerId(req.params.sellerId)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getAllByGoodId(
    req: Request<{ goodId: Types.ObjectId }>,
    res: Response
  ) {
    try {
      ReviewValidate.validateId(req.params.goodId);
      Utils.sendSuccessResponse(
        res,
        await ReviewDB.getAllByGoodId(req.params.goodId)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async create(req: Request<{}, {}, ICreateReview>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      const validatedBody = ReviewValidate.create(req.body);
      Utils.sendSuccessResponse(
        res,
        await ReviewDB.create(req.customAuth.id, validatedBody)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async patch(
    req: Request<{ reviewId: Types.ObjectId }, {}, ICreateReview>,
    res: Response
  ) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      ReviewValidate.validateId(req.params.reviewId);
      const validatedBody = ReviewValidate.create(req.body);
      Utils.sendSuccessResponse(
        res,
        await ReviewDB.patch(req.params.reviewId, validatedBody)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async delete(req: Request<{ reviewId: Types.ObjectId }>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      ReviewValidate.validateId(req.params.reviewId);
      Utils.sendSuccessResponse(
        res,
        await ReviewDB.delete(req.params.reviewId)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
}

export default new ReviewsController();
