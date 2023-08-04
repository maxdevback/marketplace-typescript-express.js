import { Request, Response } from "express";
import {
  IErrorInServerResponse,
  ISuccessResponse,
  IWrongResponse,
} from "../../types";
import CustomError from "../../models/error";

class Utils {
  sendSuccessResponse(res: Response<ISuccessResponse>, body: object) {
    res.send({ body });
  }
  sendWrongResponse(res: Response<IWrongResponse>, err: Error) {
    if (err instanceof CustomError) {
      res.status(err.httpStatus);
      res.send({ message: err.message });
    } else {
      try {
        res.status(500);
        this._sendErrorInServerResponse(res, err);
      } catch (err) {
        res.send({ message: "Very wrong response" });
      }
    }
  }
  _sendErrorInServerResponse(res: Response, error: Error) {
    res.send({ error, errorMessage: error.message });
  }
}

export default new Utils();
