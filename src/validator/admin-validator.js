const Joi = require("joi");

exports.createProductSchema = Joi.object({

  categoryId: Joi.number().required(),
  authorId: Joi.number().required(),
  stock: Joi.number(),
  title: Joi.string().required(),
  unit: Joi.number(),
  price: Joi.number(),
  detail: Joi.string(),
  publishing: Joi.string(),
  yearpublication: Joi.date(),
  numberpages: Joi.string(),
});
