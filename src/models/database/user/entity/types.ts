import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  about: string | null;
  password: string;
}
