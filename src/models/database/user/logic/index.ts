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
import { FilterQuery, Types } from "mongoose";
import { IUser } from "../entity/types";

class UserDB {
  _returnSafeData(user: IUser) {
    return { username: user.username, about: user.about, _id: user._id };
  }
  _pagination(page: number, pageSize: number) {
    return {
      skip: page === 0 ? 0 : (page - 1) * pageSize,
      limit: pageSize,
    };
  }
  async getExternal(id: Types.ObjectId) {
    return await UserModel.findById(id);
  }
  async getById(id: Types.ObjectId) {
    const user = await UserModel.findById(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not exist");
    return this._returnSafeData(user);
  }
  async getAll(query: IGetUsersQuery) {
    const dbSearch = query.usernamePart
      ? UserModel.find({ username: { $regex: query.usernamePart } })
      : UserModel.find();

    if (query.page) {
      const pagination = this._pagination(query.page, query.pageSize);
      dbSearch.skip(pagination.skip).limit(pagination.limit);
    }
    const users = await dbSearch.exec();
    return users.map((user) => {
      return this._returnSafeData(user);
    });
  }
  async create(data: ICreateUser) {
    const userWithThatUsername = await UserModel.findOne({
      username: data.username,
    });
    if (userWithThatUsername)
      throw CustomError.alreadyExist(
        "The user with that username already exist"
      );
    return this._returnSafeData(await UserModel.create(data));
  }
  //TODO: Maybe move the search user logic into a separate internal method
  async login(data: ILoginUser) {
    const userFromDB = await UserModel.findOne({ username: data.username });
    if (!userFromDB)
      throw CustomError.notExist(
        "The user with this combination of login and password was not found"
      );
    if (await comparePassword(data.password, userFromDB.password))
      return this._returnSafeData(userFromDB);
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
    return this._returnSafeData(
      await UserModel.create({ ...data, password: hashedPassword })
    );
  }
  async delete(id: Types.ObjectId) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not found");
    return this._returnSafeData(user);
  }
  async patch(id: Types.ObjectId, data: IPatchUser) {
    const user = await UserModel.findById(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not found");

    const updatedUser = await UserModel.findByIdAndUpdate(id, data);
    if (!updatedUser)
      throw CustomError.notExist("The user with that id dose not found");
    return this._returnSafeData(updatedUser);
  }
}

export default new UserDB();
