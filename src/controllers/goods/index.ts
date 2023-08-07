import { Request, Response } from "express";
import { Types } from "mongoose";
import GoodDB from "../../models/database/good/logic";
import Utils from "../utils";
import CustomError from "../../models/error";
import { ICreateGood } from "./types";

class GoodController {
  async getAllBySellerId(
    req: Request<{ sellerId: Types.ObjectId }>,
    res: Response
  ) {
    try {
      Utils.sendSuccessResponse(
        res,
        await GoodDB.getAllBySellerId(req.params.sellerId)
      );
      GoodDB;
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getById(req: Request<{ goodId: Types.ObjectId }>, res: Response) {
    try {
      Utils.sendSuccessResponse(
        res,
        await GoodDB.getAllBySellerId(req.params.goodId)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async create(req: Request<{}, {}, ICreateGood>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      Utils.sendSuccessResponse(
        res,
        await GoodDB.create(req.customAuth.id, req.body)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async patch(req: Request<{ id: string }, {}, ICreateGood>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      Utils.sendSuccessResponse(
        res,
        await GoodDB.patch(req.params.id, req.body)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      Utils.sendSuccessResponse(
        res,
        await GoodDB.delete(req.params.id, req.customAuth.id)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
}

export default new GoodController();
