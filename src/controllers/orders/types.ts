import { Types } from "mongoose";

export interface ICreateOrder {
  buyerId: Types.ObjectId;
  goodId: Types.ObjectId;
  status: string;
  contactInfo: string;
}

export interface IChangeStatusOrder {
  newStatus: string;
}
