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
    id: "64d211123c134cbe155ad69c",
  };
  next();
};
