import { Request, Response } from "express";
import Utils from "../utils";
import OrderDB from "../../models/database/order/logic";
import CustomError from "../../models/error";
import { Types } from "mongoose";
import OrderValidate from "./validate";
import { IChangeStatusOrder, ICreateOrder } from "./types";

class OrdersController {
  async getById(req: Request<{ orderId: Types.ObjectId }>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      OrderValidate.validateId(req.params.orderId);
      Utils.sendSuccessResponse(
        res,
        await OrderDB.getById(req.params.orderId, req.customAuth.id)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getBySellerId(req: Request, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      Utils.sendSuccessResponse(
        res,
        await OrderDB.getAllBySellerId(req.customAuth.id)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getByBuyerId(req: Request, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      Utils.sendSuccessResponse(
        res,
        await OrderDB.getAllByBuyerId(req.customAuth.id)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getByGoodId(req: Request<{ goodId: Types.ObjectId }>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      Utils.sendSuccessResponse(
        res,
        await OrderDB.getAllByGoodId(req.params.goodId, req.customAuth.id)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async create(
    req: Request<{ goodId: Types.ObjectId }, {}, ICreateOrder>,
    res: Response
  ) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      OrderValidate.create(req.body);
      OrderValidate.validateId(req.params.goodId);
      Utils.sendSuccessResponse(
        res,
        await OrderDB.create({
          ...req.body,
          buyerId: req.customAuth.id,
          goodId: req.params.goodId,
        })
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async changeStatus(
    req: Request<{ orderId: Types.ObjectId }, {}, IChangeStatusOrder>,
    res: Response
  ) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      const validatedBody: IChangeStatusOrder = OrderValidate.changeStatus(
        req.body
      );
      Utils.sendSuccessResponse(
        res,
        await OrderDB.changeStatus(
          req.params.orderId,
          validatedBody.newStatus,
          req.customAuth.id
        )
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async deleteUnconfirmed(
    req: Request<{ orderId: Types.ObjectId }>,
    res: Response
  ) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      OrderValidate.validateId(req.params.orderId);
      Utils.sendSuccessResponse(
        res,
        await OrderDB.deleteUnconfirmed(req.params.orderId, req.customAuth.id)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async patchUnconfirmed(
    req: Request<{ orderId: Types.ObjectId }, {}, ICreateOrder>,
    res: Response
  ) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      OrderValidate.validateId(req.params.orderId);
      const validatedBody = OrderValidate.create(req.body);
      Utils.sendSuccessResponse(
        res,
        await OrderDB.patchUnconfirmed(
          req.params.orderId,
          req.customAuth.id,
          validatedBody
        )
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
}

export default new OrdersController();
