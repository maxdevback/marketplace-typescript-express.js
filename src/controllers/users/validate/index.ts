import CustomError from "../../../models/error";
import DefaultValidate from "../../validate";
import {
  ICreateUser,
  IGetUsersQuery,
  ILoginUser,
  IPatchUser,
  IRegisterUser,
} from "../types";
import UsersSchemas from "./schemas";

class ValidateUser extends DefaultValidate {
  validateCreateBody(body: ICreateUser) {
    const res = UsersSchemas.createSchema.validate(body);
    if (res.error)
      throw CustomError.reqBodyInvalid("Body invalid " + res.error.message);
  }
  validateLoginBody(body: ILoginUser) {
    const res = UsersSchemas.loginSchema.validate(body);
    if (res.error)
      throw CustomError.reqBodyInvalid("Body invalid " + res.error.message);
  }
  validateRegisterBody(body: IRegisterUser) {
    const res = UsersSchemas.loginSchema.validate(body);
    if (res.error)
      throw CustomError.reqBodyInvalid("Body invalid " + res.error.message);
  }
  validatePatchBody(body: IPatchUser) {
    const res = UsersSchemas.patchSchema.validate(body);
    if (res.error)
      throw CustomError.reqBodyInvalid("Body invalid " + res.error.message);
    return res.value;
  }
  validateQuery(query: IGetUsersQuery) {
    const res = UsersSchemas.getAllQuery.validate(query);
    if (res.error)
      throw CustomError.reqQueryInvalid("Query invalid " + res.error.message);
    return res.value;
  }
}

export default new ValidateUser();
