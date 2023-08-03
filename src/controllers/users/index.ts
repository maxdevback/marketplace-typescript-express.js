import { Request, Response } from "express";
import UserDB from "../../models/database/user/logic";
import Utils from "../utils";

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      res.send(await UserDB.getAll());
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  async getById(req: Request<{ id: string }>, res: Response) {
    try {
      res.send(await UserDB.getById(req.params.id));
    } catch (err: any) {
      console.log(err);
      Utils.sendWrongResponse(res, err);
    }
  }
  async create(
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) {
    try {
      res.send(await UserDB.create(req.body));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
  path() {}
  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      res.send(await UserDB.delete(req.params.id));
    } catch (err: any) {
      Utils.sendWrongResponse(res, err);
    }
  }
}

export default new UserController();
