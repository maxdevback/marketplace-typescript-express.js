import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  about: string | null;
  password: string;
  avatarLink?: string;
  authTokens: { tokenA: string; tokenR: string }[];
}
