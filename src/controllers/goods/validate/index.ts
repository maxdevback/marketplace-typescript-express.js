import GoodSchema from "./schemas";
import CustomError from "../../../models/error";

class ValidateGood {
  validateId(id: string) {
    const res = GoodSchema.idSchema.validate({ id });
    if (res.error)
      throw CustomError.reqQueryInvalid("Params invalid " + res.error.message);
  }
}

export default new ValidateGood();
