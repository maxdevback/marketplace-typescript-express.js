import { ICreateGood } from "../../../../controllers/goods/types";
import CustomError from "../../../error";
import { GoodModel } from "../entity/model";

//TODO:
class GoodDB {
  async create(sellerId: string, data: ICreateGood) {
    return await GoodModel.create({ ...data, sellerId });
  }
  async getByIdAndSellerId(id: string, sellerId: string) {
    return await GoodModel.findOne({ _id: id, sellerId: sellerId });
  }
  async getAllBySellerId(sellerId: string) {
    return await GoodModel.find({ sellerId });
  }
  async delete(id: string, sellerId: string) {
    const good = await GoodModel.findById(id);
    if (!good) throw CustomError.notExist("");
  }
}

export default new GoodDB();
