const Joi = require("joi");

exports.createProductSchema = Joi.object({
  userId: Joi.number().required().strip(),
  categoryId: Joi.number().required(),
  authorid: Joi.number().required(),
  stock: Joi.number().required(),
  title: Joi.string().required(),
  unit: Joi.number(),
  priceHigh: Joi.number().required(),
  minPriceHigh: Joi.number().required(),
  priceMedium: Joi.number().required(),
  minPriceMedium: Joi.number().required(),
  priceLow: Joi.number(),
  minPriceLow: Joi.number(),
  detail: Joi.string(),
  publishing: Joi.string(),
  yearpublication: Joi.date(),
  numberpages: Joi.string(),
});


