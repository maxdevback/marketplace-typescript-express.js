export interface ISuccessResponse {
  body: object;
}

export interface IWrongResponse {
  message: string;
}
export interface IErrorInServerResponse {
  errorMessage: string;
  error: Error;
}

export type IResponse =
  | ISuccessResponse
  | IWrongResponse
  | IErrorInServerResponse;
