import JWT from "jsonwebtoken";
import { Request, Response } from "express";
import { authData, jwtAuthPayload } from "./types";
import { ITokensStatus } from "./types";
import { envVars } from "../../dotenv";
import UserDB from "../database/user/logic";
import { Types } from "mongoose";

class Auth {
  expiresInForA = "1h";
  expiresInForR = "30 days";
  maxAgeForCookies = 1000 * 60 * 60 * 24 * 30;
  create(data: authData) {
    return {
      tokenA: JWT.sign(data, envVars.accessTokenSecret, {
        expiresIn: this.expiresInForA,
      }),
      tokenR: JWT.sign(data, envVars.refreshTokenSecret, {
        expiresIn: this.expiresInForR,
      }),
    };
  }
  _isEqual(tokenAPayload: jwtAuthPayload, tokenRPayload: jwtAuthPayload) {
    try {
      if (
        tokenAPayload.username === tokenRPayload.username &&
        tokenAPayload.id === tokenRPayload.id
      ) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  validate(tokenA: string, tokenR: string) {
    try {
      const tokensStatus: ITokensStatus = {
        status: "normal",
        tokenA,
        tokenR,
        data: null,
      };
      //If verify not valid. it's throw error
      const tokenAData = JWT.verify(
        tokenA,
        envVars.accessTokenSecret
      ) as jwtAuthPayload;
      const tokenRData = JWT.verify(
        tokenR,
        envVars.refreshTokenSecret
      ) as jwtAuthPayload;
      if (!this._isEqual(tokenAData, tokenRData)) {
        tokensStatus.status = "invalid";
      } else {
        tokensStatus.data = tokenAData;
      }
      return tokensStatus;
    } catch (err) {
      const tokensStatus: ITokensStatus = {
        status: "expired",
        tokenA,
        tokenR,
        data: null,
      };
      let tokenRData: jwtAuthPayload;
      try {
        tokenRData = JWT.verify(
          tokenR,
          envVars.refreshTokenSecret
        ) as jwtAuthPayload;
      } catch (err) {
        tokensStatus.status = "fullExpiresOrMissing";
        return tokensStatus;
      }
      const tokenAData = JWT.decode(tokenA) as jwtAuthPayload | null;
      if (!tokenAData || !this._isEqual(tokenAData, tokenRData))
        tokensStatus.status = "invalid";
      else if (tokenAData) tokensStatus.data = tokenAData;
      return tokensStatus;
    }
  }
  set(res: Response, tokenA: string, tokenR: string) {
    res.cookie("Authorization", tokenR, {
      httpOnly: true,
      maxAge: this.maxAgeForCookies,
    });
    res.header("Authorization", "Bearer " + tokenA);
  }
  async clear(req: Request, res: Response, userId: Types.ObjectId) {
    const tokenR = req.cookies?.Authorization;
    await UserDB.logout(userId, tokenR);
    res.clearCookie("Authorization");
  }
}

export default new Auth();
