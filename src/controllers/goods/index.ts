import { Request, Response } from "express";
import Utils from "../utils";
import CustomError from "../../models/error";
import { ICreateGood } from "./types";

class GoodController {
  getAllByAuth(req: Request, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  getById(req: Request, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  create(req: Request<{}, {}, ICreateGood>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  edit(req: Request, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  delete(req: Request, res: Response) {
    try {
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
}

export default new GoodController();
