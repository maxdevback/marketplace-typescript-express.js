export interface IGetReviewQueryWithoutPagination {
  minStarts: number;
  maxStarts: number;
  edited?: boolean;
  [key: string]: any;
}

interface IGetReviewQueryWithPagination
  extends IGetReviewQueryWithoutPagination {
  page: number;
  pageSize: number;
}

export type IGetReviewQuery =
  | IGetReviewQueryWithPagination
  | IGetReviewQueryWithoutPagination;
