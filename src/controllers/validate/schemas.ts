import Joi from "joi";

class DefaultValidate {
  idSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });
}

export default new DefaultValidate();
