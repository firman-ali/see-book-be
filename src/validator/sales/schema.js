const Joi = require('joi');

const PostSaleByIdPayloadSchema = Joi.object({
  customer_name: Joi.string().required(),
  customer_phone_number: Joi.string().required(),
  book: Joi.string().required(),
  price_type: Joi.string().required(),
  duration: Joi.number().integer().min(0).required(),
  sub_total: Joi.number().min(0).required(),
  voucher: Joi.number().min(0).required(),
  total: Joi.number().min(0).required(),
  payment_method: Joi.string().required(),
  payment_channel: Joi.string().required(),
});

module.exports = { PostSaleByIdPayloadSchema };
