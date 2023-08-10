import Joi from "joi";

class OrderValidateSchemas {
  create = Joi.object({
    contactInfo: Joi.string().min(20).max(400).required(),
  });
  changeStatus = Joi.object({
    newStatus: Joi.string().min(5).max(20),
  });
}

export default new OrderValidateSchemas();
