import ReviewValidateSchemas from "./schemas";
import DefaultValidate from "../../validate";
import { ICreateReview } from "../types";
import CustomError from "../../../models/error";
import { IGetReviewQuery } from "../../../models/database/review/logic/types";

class ReviewValidate extends DefaultValidate {
  create(data: ICreateReview) {
    const res = ReviewValidateSchemas.create.validate(data);
    if (res.error)
      throw CustomError.reqBodyInvalid("Body invalid " + res.error);
    return res.value;
  }
  query(data: IGetReviewQuery) {
    const res = ReviewValidateSchemas.query.validate(data);
    if (res.error)
      throw CustomError.reqQueryInvalid("Query invalid " + res.error);
    return res.value;
  }
}

export default new ReviewValidate();
