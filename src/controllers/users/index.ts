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
import CustomError from "../../models/error";
import Auth from "../../models/auth";

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
  async login(req: Request<{}, {}, ILoginUser>, res: Response) {
    try {
      UsersValidate.validateLoginBody(req.body);
      const user = await UserDB.login(req.body);
      const tokens = Auth.create({ id: user._id, username: user.username });
      Auth.set(res, tokens.tokenA, tokens.tokenR);
      Utils.sendSuccessResponse(res, user);
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
  async logout(req: Request, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      Utils.sendSuccessResponse(
        res,
        await Auth.clear(req, res, req.customAuth.id)
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async patch(req: Request<{}, {}, IPatchUser>, res: Response) {
    try {
      if (!req.customAuth) throw CustomError.notAuth();
      const validatedBody = UsersValidate.validatePatchBody(req.body);
      Utils.sendSuccessResponse(
        res,
        await UserDB.patch(
          req.customAuth.id,
          validatedBody,
          //@ts-ignore
          req.files[0]?.filename
        )
      );
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      if (!req.customAuth?.id) throw CustomError.notAuth;
      Utils.sendSuccessResponse(res, await UserDB.delete(req.customAuth.id));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
}

export default new UserController();
