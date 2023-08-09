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
    const res: any = {
      username: user.username,
      about: user.about,
      _id: user._id,
    };
    if (user.avatarLink) res.avatarLink = user.avatarLink;
    return res;
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
  async getAuthTokens(id: Types.ObjectId) {
    const user = await UserModel.findById(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not exist");
    return user.authTokens;
  }
  async setAuthTokens(
    id: Types.ObjectId,
    tokens: { tokenA: string; tokenR: string }
  ) {
    const user = await UserModel.findById(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not exist");
    user.authTokens.push(tokens);
    await user.save();
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
  async logout(userId: Types.ObjectId, tokenR: string) {
    const user = await UserModel.findById(userId);
    if (!user) return;
    const newAuth = user?.authTokens.filter((item) => item.tokenR !== tokenR);
    user.authTokens = newAuth;
    await user.save();
  }
  async delete(id: Types.ObjectId) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not found");
    return this._returnSafeData(user);
  }
  async patch(
    id: Types.ObjectId,
    data: IPatchUser,
    avatarLink: string | undefined
  ) {
    const user = await UserModel.findById(id);
    if (!user)
      throw CustomError.notExist("The user with that id dose not found");
    let update: any = { ...data };
    if (avatarLink) update.avatarLink = avatarLink;
    const updatedUser = await UserModel.findByIdAndUpdate(id, update);
    if (!updatedUser)
      throw CustomError.notExist("The user with that id dose not found");
    return this._returnSafeData(updatedUser);
  }
}

export default new UserDB();
