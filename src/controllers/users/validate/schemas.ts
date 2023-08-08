import Joi from "joi";

class UserValidateSchemas {
  createSchema = Joi.object({
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(6).required(),
  });

  loginSchema = Joi.object({
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(6).required(),
  });

  registerSchema = Joi.object({
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(6).required(),
  });

  idSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });

  getAllQuery = Joi.object({
    usernamePart: Joi.string(),
    page: Joi.number().min(1),
    pageSize: Joi.number().min(5),
  }).with("page", "pageSize");

  patchSchema = Joi.object({
    username: Joi.string().min(4).max(30),
    password: Joi.string().min(6),
    about: Joi.string().max(300),
  });
}

export default new UserValidateSchemas();
