import { Types } from "mongoose";
import { OrderModel } from "../entity/model";
import CustomError from "../../../error";

class OrderDB {
  async getById(orderId: Types.ObjectId) {
    return await OrderModel.findById(orderId);
  }
  async getAllBySellerId(sellerId: Types.ObjectId) {
    return await OrderModel.find({ sellerId });
  }
  async getAllByBuyerId(buyerId: Types.ObjectId) {
    return await OrderModel.find({ buyerId });
  }
  async getAllByGoodId(goodId: Types.ObjectId) {
    return await OrderModel.find({ goodId });
  }
  async create(data: {
    buyerId: Types.ObjectId;
    goodId: Types.ObjectId;
    contactInfo: string;
  }) {
    return await OrderModel.create(data);
  }
  async changeStatus(orderId: Types.ObjectId, newStatus: string) {
    return await OrderModel.findByIdAndUpdate(orderId, { status: newStatus });
  }
  async deleteUnconfirmed(orderId: Types.ObjectId) {
    const order = await OrderModel.findById(orderId);
    //TODO: Create and change method for custom error
    if (!order || order.status !== "unconfirmed")
      throw CustomError.notExist("");
    return await OrderModel.deleteOne({ id: orderId });
  }
  //TODO: Create interfaces and change any type to interface
  async patchUnconfirmed(orderId: Types.ObjectId, data: any) {
    const order = await OrderModel.findById(orderId);
    if (!order || order.status !== "unconfirmed")
      throw CustomError.notExist("");
    for (let key in data) {
      //@ts-ignore
      //TODO: Later type
      order[key] = data[key];
    }
    return await order.save();
  }
}

export default new OrderDB();
