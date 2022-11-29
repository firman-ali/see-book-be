const Joi = require('joi');

const PostUserByIdPayloadSchema = Joi.object({
  name: Joi.string().required(),
  phone_number: Joi.string().required(),
  role: Joi.number().integer().min(0).max(2)
    .required(),
});

const PutUserByIdPayloadSchema = Joi.object({
  name: Joi.string(),
  phone_number: Joi.string(),
});

module.exports = { PostUserByIdPayloadSchema, PutUserByIdPayloadSchema };
