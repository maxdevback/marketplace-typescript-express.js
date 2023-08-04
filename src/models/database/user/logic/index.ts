import { hash as hashPassword, compare as comparePassword } from "bcrypt";
import {
  ICreateUser,
  ILoginUser,
  IPatchUser,
  IRegisterUser,
} from "../../../../controllers/users/types";
import CustomError from "../../../error";
import { UserModel } from "../entity/model";
import { IGetUsersQuery } from "./types";

class UserDB {
  _returnSafeData() {
    //TODO: create method and use for all responses
  }
  _pagination(page: number, pageSize: number) {
    return {
      skip: page === 0 ? 0 : (page - 1) * pageSize,
      limit: pageSize,
    };
  }
  async getById(id: string) {
    const user = await UserModel.findById(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not exist");
    return user;
  }
  async getAll(query: IGetUsersQuery) {
    const dbSearch = query.usernamePart
      ? UserModel.find({ username: { $regex: query.usernamePart } })
      : UserModel.find();

    if (query.page) {
      const pagination = this._pagination(query.page, query.pageSize);
      dbSearch.skip(pagination.skip).limit(pagination.limit);
    }
    return await dbSearch.exec();
  }
  async create(data: ICreateUser) {
    const userWithThatUsername = await UserModel.findOne({
      username: data.username,
    });
    if (userWithThatUsername)
      throw CustomError.alreadyExist(
        "The user with that username already exist"
      );
    return await UserModel.create(data);
  }
  //TODO: Maybe move the search user logic into a separate internal method
  async login(data: ILoginUser) {
    const userFromDB = await UserModel.findOne({ username: data.username });
    if (!userFromDB)
      throw CustomError.notExist(
        "The user with this combination of login and password was not found"
      );
    if (await comparePassword(data.password, userFromDB.password))
      return userFromDB;
    throw CustomError.notExist(
      "The user with this combination of login and password was not found"
    );
  }
  async register(data: IRegisterUser) {
    const duplicate = await UserModel.findOne({ username: data.username });
    if (duplicate)
      throw CustomError.alreadyExist(
        "The user with that username already exist"
      );
    const hashedPassword = await hashPassword(data.password, 10);
    return await UserModel.create({ ...data, password: hashedPassword });
  }
  async delete(id: string) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not found");
    return user;
  }
  async patch(id: string, data: IPatchUser) {
    const user = await UserModel.findById(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not found");

    for (let key in data) {
      //@ts-ignore
      //TODO: Later type
      user[key] = data[key];
    }
    return await user.save();
  }
}

export default new UserDB();
