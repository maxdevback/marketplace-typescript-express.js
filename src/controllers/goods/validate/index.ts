import GoodSchema from "./schemas";
import CustomError from "../../../models/error";
import { ICreateOrPatchGood } from "../types";
import DefaultValidate from "../../validate/index";
import { IGetGoodsQuery } from "../../../models/database/good/logic/types";

class ValidateGood extends DefaultValidate {
  validateCreateOrPatch(data: ICreateOrPatchGood) {
    const res = GoodSchema.createOrParch.validate(data);
    if (res.error)
      throw CustomError.reqBodyInvalid("Body invalid " + res.error.message);
    return res.value;
  }
  validateQuery(data: IGetGoodsQuery) {
    const res = GoodSchema.query.validate(data);
    if (res.error)
      throw CustomError.reqQueryInvalid("Query invalid" + res.error.message);
    return res.value;
  }
}

export default new ValidateGood();
