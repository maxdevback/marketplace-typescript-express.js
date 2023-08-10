import { Types } from "mongoose";
import { OrderModel } from "../entity/model";
import CustomError from "../../../error";
import GoodDB from "../../good/logic";

class OrderDB {
  async getExternal(id: Types.ObjectId) {
    return await OrderModel.findById(id);
  }
  async getById(orderId: Types.ObjectId, authId: Types.ObjectId) {
    const order = await OrderModel.findById(orderId);
    if (!order)
      throw CustomError.notExist("The order with that id dose not exist");
    if (
      order.buyerId.toString() !== authId.toString() &&
      order.sellerId.toString() !== authId.toString()
    )
      throw CustomError.forbidden();
    return await OrderModel.findById(orderId);
  }
  async getAllBySellerId(sellerId: Types.ObjectId) {
    return await OrderModel.find({ sellerId });
  }
  async getAllByBuyerId(buyerId: Types.ObjectId) {
    return await OrderModel.find({ buyerId });
  }
  async getAllByGoodId(goodId: Types.ObjectId, authId: Types.ObjectId) {
    const good = await GoodDB.getExternal(goodId);
    if (!good)
      throw CustomError.notExist("The good with that id dose not exist");
    if (good.sellerId.toString() !== authId.toString())
      throw CustomError.forbidden();
    return await OrderModel.find({ goodId });
  }
  async create(data: {
    buyerId: Types.ObjectId;
    goodId: Types.ObjectId;
    contactInfo: string;
  }) {
    const good = await GoodDB.getExternal(data.goodId);
    if (!good)
      throw CustomError.notExist("The good with that id dose not exist");
    return await OrderModel.create({ ...data, sellerId: good.sellerId });
  }
  async changeStatus(
    orderId: Types.ObjectId,
    newStatus: string,
    authId: Types.ObjectId
  ) {
    const order = await OrderModel.findById(orderId);
    if (!order)
      throw CustomError.notExist("The order with that id dose not exist");
    if (order.sellerId.toString() !== authId.toString())
      throw CustomError.forbidden();
    return await OrderModel.findByIdAndUpdate(orderId, { status: newStatus });
  }
  async deleteUnconfirmed(orderId: Types.ObjectId, authId: Types.ObjectId) {
    const order = await OrderModel.findById(orderId);
    if (!order)
      throw CustomError.notExist("The order with that id dose not exist");
    if (order.status !== "unconfirmed")
      throw CustomError.alreadyExist("The order already confirmed");
    if (order.sellerId.toString() !== authId.toString())
      throw CustomError.forbidden();
    return await OrderModel.deleteOne({ id: orderId });
  }
  async patchUnconfirmed(
    orderId: Types.ObjectId,
    authId: Types.ObjectId,
    data: any
  ) {
    const order = await OrderModel.findById(orderId);
    if (!order)
      throw CustomError.notExist("The good with that id dose not exist");
    if (order.sellerId.toString() !== authId.toString())
      throw CustomError.forbidden();
    if (order.status !== "unconfirmed")
      throw CustomError.alreadyExist("The order already confirmed");
    return await OrderModel.findOneAndUpdate({ id: orderId }, data);
  }
}

export default new OrderDB();
