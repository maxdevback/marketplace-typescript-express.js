import GoodSchema from "./schemas";
import CustomError from "../../models/error";
import { Types } from "mongoose";

class DefaultValidate {
  validateId(id: string | Types.ObjectId) {
    const res = GoodSchema.idSchema.validate({ id });
    if (res.error)
      throw CustomError.reqQueryInvalid("Params invalid " + res.error.message);
  }
}

export default DefaultValidate;
