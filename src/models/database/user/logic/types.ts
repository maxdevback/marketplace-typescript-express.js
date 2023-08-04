interface IGetUsersQueryWithPagination {
  usernamePart: undefined | string;
  page: number;
  pageSize: number;
}
interface IGetUsersQueryWithoutPagination {
  usernamePart: undefined | string;
  page: null;
  pageSize: null;
}

export type IGetUsersQuery =
  | IGetUsersQueryWithPagination
  | IGetUsersQueryWithoutPagination;
