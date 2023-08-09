import { ICreateOrPatchGood } from "../../../../controllers/goods/types";
import { Types } from "mongoose";
import CustomError from "../../../error";
import { GoodModel } from "../entity/model";
import UserDB from "../../user/logic";
import { IGetGoodsQuery } from "./types";

class GoodDB {
  _pagination(page: number, pageSize: number) {
    return {
      skip: page === 0 ? 0 : (page - 1) * pageSize,
      limit: pageSize,
    };
  }
  _searchWithQuery(query: IGetGoodsQuery) {
    const conditions: any = {};
    if (query.title) {
      conditions.title = query.title;
    }
    if (query.description) {
      conditions.description = query.description;
    }
    if (query.minPrice || query.maxPrice) {
      conditions.price = {};
    }
    if (query.minPrice) {
      conditions.price.$gte = query.minPrice;
    }
    if (query.maxPrice) {
      conditions.price.$lte = query.maxPrice;
    }
    const dbSearch = GoodModel.find(conditions);
    if (query.page) {
      const pagination = this._pagination(query.page, query.pageSize);
      dbSearch.skip(pagination.skip).limit(pagination.limit);
    }
    return dbSearch;
  }
  async getExternal(goodId: Types.ObjectId) {
    return GoodModel.findById(goodId);
  }
  async create(
    sellerId: Types.ObjectId,
    data: ICreateOrPatchGood,
    files?: [{ filename: string }]
  ) {
    const duplicate = await GoodModel.findOne({ title: data.title });
    console.log(duplicate);
    if (duplicate) {
      throw CustomError.alreadyExist("The good with that title already exist");
    }

    const good = await GoodModel.create({ ...data, sellerId });
    return good;
  }
  async getById(goodId: Types.ObjectId) {
    const good = await GoodModel.findById(goodId);
    if (!good)
      throw CustomError.notExist("The good with that id dose not exist");
    return good;
  }
  async getAll(query: IGetGoodsQuery) {
    return await this._searchWithQuery(query);
  }
  async getAllBySellerId(sellerId: Types.ObjectId, query?: IGetGoodsQuery) {
    const user = await UserDB.getExternal(sellerId);
    if (!user)
      throw CustomError.notExist("The user with that id dose not exist");
    const dbSearch = query
      ? this._searchWithQuery(query)
      : GoodModel.find({ sellerId });
    return await dbSearch.where("sellerId", sellerId);
  }
  async delete(id: string, sellerId: Types.ObjectId) {
    const good = await GoodModel.findById(id);
    if (!good) throw CustomError.notExist("The good not found");
    if (good.sellerId.toString() !== sellerId.toString())
      throw CustomError.notExist("You're not owner of this good");
    return good;
  }
  async patch(id: string, data: ICreateOrPatchGood) {
    const good = await GoodModel.findById(id);
    if (!good)
      throw CustomError.notExist("The good with that id dose not exist");

    return await GoodModel.findByIdAndUpdate(id, data);
  }
}

export default new GoodDB();
