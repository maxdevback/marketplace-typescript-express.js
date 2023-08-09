interface IGetGoodsQueryWithoutPagination {
  title?: undefined | string;
  description?: undefined | string;
  minPrice?: undefined | number;
  maxPrice?: undefined | number;
  [key: string]: any;
}
interface IGetGoodsQueryWithPagination extends IGetGoodsQueryWithoutPagination {
  page: number;
  pageSize: number;
}

export type IGetGoodsQuery =
  | IGetGoodsQueryWithPagination
  | IGetGoodsQueryWithoutPagination;
