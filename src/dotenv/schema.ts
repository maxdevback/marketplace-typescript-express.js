import Joi from "joi";

export const envSchema = Joi.object({
  mongoDBLink: Joi.string().required(),
});
