import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface authData {
  username: string;
  id: Types.ObjectId;
}

export type jwtAuthPayload = JwtPayload & authData;

export interface ITokensStatus {
  status: string;
  tokenA: string;
  tokenR: string;
  data: null | jwtAuthPayload;
}

declare global {
  namespace Express {
    interface Request {
      customAuth?: authData;
    }
  }
}
