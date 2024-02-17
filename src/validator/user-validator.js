const Joi = require("joi");


exports.createtShippingAddressSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    identityNumber: Joi.string().required(),
    branch: Joi.string().required(),
    address: Joi.string().required(),
    apartment: Joi.string().required(),
    postalCode: Joi.string().required(),
    province: Joi.string().required(),
    district: Joi.string().required(),
    subDistrict: Joi.string().required(),
    
})

exports.createCartSchema = Joi.object({
    totalBeforeDiscount :Joi.number(),
    discount:Joi.number(),
    deliveryFee :Joi.number(),
    total  :Joi.number(),
    quantity :Joi.number(),
})

exports.createOrderSchema = Joi.object({
    totalBeforeDiscount :Joi.number(),
    discount:Joi.number(),
    deliveryFee :Joi.number(),
    total  :Joi.number(),
    quantity :Joi.number(),
    createdAt: Joi.date().required(),
    quantity :Joi.number(),
})

exports.createpaymentSchema = Joi.object({
    amount:Joi.number(),
    moneystatus: Joi.boolean().invalid(false),
    createdAt: Joi.date().required(),
    details: Joi.string()
})

