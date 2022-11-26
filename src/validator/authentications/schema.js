const Joi = require('joi');

const PostLoginPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const PostRegisterUserPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(50).required(),
  username: Joi.string().required(),
  phone: Joi.string().required(),
});

const PostRegisterSellerPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(50).required(),
  username: Joi.string().required(),
  address: Joi.string(),
  phone: Joi.number().required(),
});

const PostRegisterAdminPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(50).required(),
  username: Joi.string().required(),
  phone: Joi.number().required(),
});

const DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  PostLoginPayloadSchema,
  PostRegisterUserPayloadSchema,
  PostRegisterSellerPayloadSchema,
  PostRegisterAdminPayloadSchema,
  DeleteAuthenticationPayloadSchema,
};
