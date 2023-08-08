import { Request, Response } from "express";
import {
  IErrorInServerResponse,
  ISuccessResponse,
  IWrongResponse,
} from "../../types";
import CustomError from "../../models/error";

class Utils {
  //TODO: change Body to object
  sendSuccessResponse(res: Response<ISuccessResponse>, body: any) {
    res.send({ body });
  }
  sendWrongResponse(res: Response<IWrongResponse>, err: Error) {
    if (err instanceof CustomError) {
      res.status(err.httpStatus);
      res.send({ message: err.message });
    } else {
      try {
        res.status(500);
        console.log("Error", err);
        this._sendErrorInServerResponse(res, err);
      } catch (err) {
        res.status(500);
        res.send({ message: "Very wrong response" });
      }
    }
  }
  _sendErrorInServerResponse(res: Response, error: Error) {
    res.send({ error, errorMessage: error.message });
  }
}

export default new Utils();
