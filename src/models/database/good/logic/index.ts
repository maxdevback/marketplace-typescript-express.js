import { ICreateGood } from "../../../../controllers/goods/types";
import { Types } from "mongoose";
import CustomError from "../../../error";
import { GoodModel } from "../entity/model";

//TODO:
class GoodDB {
  async create(sellerId: Types.ObjectId, data: ICreateGood) {
    return await GoodModel.create({ ...data, sellerId });
  }
  async getById(id: string, sellerId: Types.ObjectId) {
    return await GoodModel.findOne({ _id: id, sellerId: sellerId });
  }
  async getAllBySellerId(sellerId: Types.ObjectId) {
    return await GoodModel.find({ sellerId });
  }
  async delete(id: string, sellerId: Types.ObjectId) {
    const good = await GoodModel.findByIdAndDelete(id);
    if (!good) throw CustomError.notExist("Not found");
    if (good.sellerId !== sellerId)
      throw CustomError.notExist("The good dose not exist");

    return good;
  }
  async patch(id: string, data: ICreateGood) {
    const good = await GoodModel.findById(id);
    if (!good)
      throw CustomError.notExist("The good with that id dose not found");

    for (let key in data) {
      //@ts-ignore
      //TODO: Later type
      good[key] = data[key];
    }
    return await good.save();
  }
}

export default new GoodDB();
