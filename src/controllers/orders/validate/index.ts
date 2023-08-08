import CustomError from "../../../models/error";
import DefaultValidate from "../../validate";
import { IChangeStatusOrder, ICreateOrder } from "../types";
import OrderValidateSchemas from "./schemas";

class OrderValidate extends DefaultValidate {
  create(data: ICreateOrder) {
    const res = OrderValidateSchemas.create.validate(data);
    if (res.error)
      throw CustomError.reqBodyInvalid("The body invalid " + res.error);
    return res.value;
  }
  changeStatus(data: IChangeStatusOrder) {
    const res = OrderValidateSchemas.changeStatus.validate(data);
    if (res.error)
      throw CustomError.reqBodyInvalid("The body invalid " + res.error);
    return res.value;
  }
}

export default new OrderValidate();
