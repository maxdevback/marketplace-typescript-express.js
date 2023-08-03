import { ICreateUser } from "../../../../controllers/users/types";
import CustomError from "../../../error";
import { UserModel } from "../entity/model";

class UserDB {
  async getById(id: string) {
    const user = await UserModel.findById(id);
    if (!user) throw CustomError.notExist("The user with that id do not exist");
    return user;
  }
  async getAll() {
    return await UserModel.find();
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
  async delete(id: string) {
    return await UserModel.findByIdAndDelete(id);
  }
  path() {}
}

export default new UserDB();
