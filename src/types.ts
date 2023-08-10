import { Types } from "mongoose";

export interface ISuccessResponse {
  body: any;
}

export interface IWrongResponse {
  message: string;
}
export interface IErrorInServerResponse {
  message: string;
  error: Error;
}

export type IResponse =
  | ISuccessResponse
  | IWrongResponse
  | IErrorInServerResponse;
