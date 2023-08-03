import { ICreateUser } from "../types";
import { createUserSchema } from "./schemas";

class ValidateUser {
  async validateCreateBody(body: ICreateUser) {
    const res = createUserSchema.validate(body);
    if (res.error) throw res.error;
  }
}

export default new ValidateUser();
