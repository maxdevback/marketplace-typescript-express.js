import { Request, Response } from "express";
import UserDB from "../../models/database/user/logic";
import Utils from "../utils";
import UsersValidate from "./validate";
import {
  ICreateUser,
  IGetUsersQuery,
  ILoginUser,
  IPatchUser,
  IRegisterUser,
} from "./types";
import { Types } from "mongoose";

class UserController {
  async getAll(req: Request<{}, IGetUsersQuery>, res: Response) {
    try {
      const validatedQuery = UsersValidate.validateQuery(req.query);
      Utils.sendSuccessResponse(res, await UserDB.getAll(validatedQuery));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getById(req: Request<{ userId: Types.ObjectId }>, res: Response) {
    try {
      UsersValidate.validateId(req.params.userId);
      Utils.sendSuccessResponse(res, await UserDB.getById(req.params.userId));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async create(req: Request<{}, {}, ICreateUser>, res: Response) {
    try {
      UsersValidate.validateCreateBody(req.body);
      Utils.sendSuccessResponse(res, await UserDB.create(req.body));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async login(req: Request<{}, {}, ILoginUser>, res: Response) {
    try {
      UsersValidate.validateLoginBody(req.body);
      Utils.sendSuccessResponse(res, await UserDB.login(req.body));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async register(req: Request<{}, {}, IRegisterUser>, res: Response) {
    try {
      UsersValidate.validateRegisterBody(req.body);
      Utils.sendSuccessResponse(res, await UserDB.register(req.body));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async patch(
    req: Request<{ userId: Types.ObjectId }, {}, IPatchUser>,
    res: Response
  ) {
    try {
      UsersValidate.validateId(req.params.userId);
      const validatedBody = UsersValidate.validatePatchBody(req.body);
      Utils.sendSuccessResponse(
        res,
        await UserDB.patch(req.params.userId, validatedBody)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async delete(req: Request<{ userId: Types.ObjectId }>, res: Response) {
    try {
      Utils.sendSuccessResponse(res, await UserDB.delete(req.params.userId));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
}

export default new UserController();
