import { Types } from "mongoose";

export interface ICreateOrder {
  contactInfo: string;
}

export interface IChangeStatusOrder {
  newStatus: string;
}
