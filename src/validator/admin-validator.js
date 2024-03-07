const Joi = require("joi");

exports.createProductSchema = Joi.object({
  userId: Joi.number().required(),
  categoryId: Joi.number().required(),
  authorId: Joi.number().required(),
  stock: Joi.number(),
  title: Joi.string().required(),
  unit: Joi.number(),
  priceHigh: Joi.number(),
  minPriceHigh: Joi.number(),
  priceMedium: Joi.number(),
  minPriceMedium: Joi.number(),
  priceLow: Joi.number(),
  minPriceLow: Joi.number(),
  detail: Joi.string(),
  publishing: Joi.string(),
  yearpublication: Joi.date(),
  numberpages: Joi.string(),
});
