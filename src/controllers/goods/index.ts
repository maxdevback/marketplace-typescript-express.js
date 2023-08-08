import { Request, Response } from "express";
import { Types } from "mongoose";
import GoodDB from "../../models/database/good/logic";
import Utils from "../utils";
import CustomError from "../../models/error";
import { ICreateOrPatchGood } from "./types";
import ValidateGood from "./validate";
import { IGetGoodsQuery } from "../../models/database/good/logic/types";

class GoodController {
  async getAll(req: Request<{}, IGetGoodsQuery>, res: Response) {
    try {
      const validatedQuery = ValidateGood.validateQuery(req.query);
      Utils.sendSuccessResponse(res, await GoodDB.getAll(validatedQuery));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getAllByAuth(req: Request, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      Utils.sendSuccessResponse(
        res,
        await GoodDB.getAllBySellerId(req.customAuth.id)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getAllBySellerId(
    req: Request<{ sellerId: Types.ObjectId }, IGetGoodsQuery>,
    res: Response
  ) {
    try {
      ValidateGood.validateId(req.params.sellerId);
      const validatedQuery = ValidateGood.validateQuery(req.query);
      Utils.sendSuccessResponse(
        res,
        await GoodDB.getAllBySellerId(req.params.sellerId, validatedQuery)
      );
      GoodDB;
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getById(req: Request<{ goodId: Types.ObjectId }>, res: Response) {
    try {
      ValidateGood.validateId(req.params.goodId);
      Utils.sendSuccessResponse(res, await GoodDB.getById(req.params.goodId));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async create(req: Request<{}, {}, ICreateOrPatchGood>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      const validatedBody: ICreateOrPatchGood =
        ValidateGood.validateCreateOrPatch(req.body);
      Utils.sendSuccessResponse(
        res,
        await GoodDB.create(req.customAuth.id, validatedBody)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async patch(
    req: Request<{ goodId: string }, {}, ICreateOrPatchGood>,
    res: Response
  ) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      ValidateGood.validateId(req.params.goodId);
      Utils.sendSuccessResponse(
        res,
        await GoodDB.patch(req.params.goodId, req.body)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async delete(req: Request<{ goodId: string }>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      ValidateGood.validateId(req.params.goodId);
      Utils.sendSuccessResponse(
        res,
        await GoodDB.delete(req.params.goodId, req.customAuth.id)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
}

export default new GoodController();
