import ReviewValidateSchemas from "./schemas";
import DefaultValidate from "../../validate";
import { ICreateReview } from "../types";
import CustomError from "../../../models/error";

class ReviewValidate extends DefaultValidate {
  create(data: ICreateReview) {
    const res = ReviewValidateSchemas.create.validate(data);
    if (res.error)
      throw CustomError.reqBodyInvalid("Body invalid " + res.error);
    return res.value;
  }
}

export default new ReviewValidate();
