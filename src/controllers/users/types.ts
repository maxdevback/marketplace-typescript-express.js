export interface ICreateUser {
  username: string;
  password: string;
}
export interface ILoginUser {
  username: string;
  password: string;
}
export interface IRegisterUser {
  username: string;
  password: string;
}

export interface IGetUsersQuery {
  page?: number;
  pageSize?: number;
  usernamePart?: string;
}

export interface IPatchUser {
  username?: string;
  password?: string;
  about?: string;
}
