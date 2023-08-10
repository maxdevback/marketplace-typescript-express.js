import { Request, Response, NextFunction } from "express";
import Auth from "../../models/auth";
import UserDB from "../../models/database/user/logic";
import CustomError from "../../models/error";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenA = req.headers?.authorization;
    const tokenR = req.cookies?.Authorization;
    if (tokenA && tokenR) {
      const check = Auth.validate(tokenA.substring(7), tokenR);
      if (check.status === "normal" && check.data) {
        const { id, username } = check.data;
        req.customAuth = { id, username };
      } else if (check.status === "expired" && check.data) {
        const { id, username } = check.data;
        const tokens = await UserDB.getAuthTokens(check.data.id);
        const tokensFromDB: any = tokens.filter((item) => {
          if (item.tokenR === tokenR && item.tokenA === tokenA.substring(7)) {
            return true;
          } else return false;
        })[0];
        if (!tokensFromDB) throw CustomError.notAuth();
        const newTokens = Auth.create({ id, username });
        await UserDB.setAuthTokens(check.data.id, newTokens);
        Auth.set(res, newTokens.tokenA, newTokens.tokenR);
        req.customAuth = { id, username };
      } else {
        throw "";
      }
    }
  } catch (err) {
    res.clearCookie("Authorization");
  } finally {
    next();
  }
};
