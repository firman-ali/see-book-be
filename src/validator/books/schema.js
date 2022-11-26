const Joi = require('joi');

const PostBooksPayloadSchema = Joi.object({
  name: Joi.string().required(),
  synopsis: Joi.string().required(),
  writer: Joi.string().required(),
  publisher_id: Joi.string(),
  publisher: Joi.string().required(),
  language: Joi.string().required(),
  total_page: Joi.number().required(),
  genres: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    }),
  ).required(),
});

const PutBooksPayloadSchema = Joi.object({
  name: Joi.string(),
  synopsis: Joi.string(),
  writer: Joi.string(),
  publisher_id: Joi.string(),
  publisher: Joi.string(),
  language: Joi.string(),
  total_page: Joi.number().integer(),
  genres: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    }),
  ),
});

module.exports = { PostBooksPayloadSchema, PutBooksPayloadSchema };
