const Joi = require('joi');

const PostGenresPayloadSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

const PutGenresPayloadSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
});

module.exports = { PostGenresPayloadSchema, PutGenresPayloadSchema };
