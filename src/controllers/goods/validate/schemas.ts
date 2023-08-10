import Joi from "joi";

class GoodValidateSchema {
  createOrParch = Joi.object({
    title: Joi.string().min(10).max(200).required(),
    description: Joi.string().min(50).max(200).required(),
    price: Joi.number().min(1).max(9999).required(),
  });
  query = Joi.object({
    title: Joi.string().min(5).max(200),
    description: Joi.string().min(10).max(200),
    minPrice: Joi.number().min(1).max(9999),
    maxPrice: Joi.number().min(1).max(9999),
    page: Joi.number().min(1),
    pageSize: Joi.number().min(10),
  }).with("page", "pageSize");
}

export default new GoodValidateSchema();
