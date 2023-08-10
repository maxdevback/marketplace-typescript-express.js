import Joi from "joi";

class ReviewValidateSchemas {
  create = Joi.object({
    stars: Joi.number().min(1).max(5).required(),
    text: Joi.string().min(10).max(200).required(),
  });
  query = Joi.object({
    minStars: Joi.number().min(1),
    maxStars: Joi.number().max(5),
    edited: Joi.boolean(),
    page: Joi.number(),
    pageSize: Joi.number().min(5),
  }).with("page", "pageSize");
}

export default new ReviewValidateSchemas();
