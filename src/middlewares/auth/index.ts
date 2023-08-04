import { Request, Response, NextFunction } from "express";

// authorization plug
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.customAuth = {
    id: "64cbb87c2e9916f696026dad",
  };
  next();
};
