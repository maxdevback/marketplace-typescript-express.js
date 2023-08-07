import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
// authorization plug
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.customAuth = {
    //TODO: plug
    //@ts-ignore
    id: "64cbb87c2e9916f696026dad",
  };
  next();
};
