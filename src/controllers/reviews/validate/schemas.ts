import Joi from "joi";

class ReviewValidateSchemas {
  create = Joi.object({
    buyerId: Joi.string().hex().length(24).required(),
    goodId: Joi.string().hex().length(24).required(),
    stars: Joi.number().min(1).max(5).required(),
    text: Joi.string().min(10).max(200).required(),
  });
}

export default new ReviewValidateSchemas();
