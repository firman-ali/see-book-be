const Joi = require('joi');

const PostPricesPayloadSchema = Joi.object({
  list_price: Joi.array().items(
    Joi.object({
      type: Joi.number().integer().required(),
      duration: Joi.number().integer().min(0).required(),
      price: Joi.number().required(),
    }),
  ).min(1).required(),
});

const PutPricesPayloadSchema = Joi.object({
  list_price: Joi.array().items(
    Joi.object({
      type: Joi.number().integer().required(),
      duration: Joi.number().integer().min(0).required(),
      price: Joi.number().required(),
    }),
  ).min(1).required(),
});

module.exports = { PostPricesPayloadSchema, PutPricesPayloadSchema };
