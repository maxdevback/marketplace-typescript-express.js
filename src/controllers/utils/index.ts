import { Response } from "express";
import {
  IErrorInServerResponse,
  ISuccessResponse,
  IWrongResponse,
} from "../../types";
import CustomError from "../../models/error";
import logger from "../../models/logger";

class Utils {
  sendSuccessResponse(res: Response<ISuccessResponse>, body: any) {
    res.send({ body });
  }
  sendWrongResponse(
    res: Response<IWrongResponse | IErrorInServerResponse>,
    err: Error
  ) {
    if (err instanceof CustomError) {
      res.status(err.httpStatus);
      res.send({ message: err.message });
    } else {
      try {
        res.status(500);
        logger.add(err);
        this._sendErrorInServerResponse(res, err);
      } catch (err: any) {
        res.status(500);
        res.send({
          message: "Very wrong response",
          error: err,
        });
      }
    }
  }
  _sendErrorInServerResponse(res: Response, error: Error) {
    res.send({ error, errorMessage: error.message });
  }
}

export default new Utils();
