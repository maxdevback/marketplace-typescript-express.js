import Joi from "joi";

class GoodValidateSchema {
  idSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });
}

export default new GoodValidateSchema();
