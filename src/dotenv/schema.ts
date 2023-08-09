import Joi from "joi";

export const envSchema = Joi.object({
  mongoDBLink: Joi.string().required(),
  port: Joi.number().required(),
  refreshTokenSecret: Joi.string().required(),
  accessTokenSecret: Joi.string().required(),
});
