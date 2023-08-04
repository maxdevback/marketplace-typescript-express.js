//TODO: change response

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

declare global {
  namespace Express {
    interface Request {
      customAuth: {
        id: string;
      };
    }
  }
}
