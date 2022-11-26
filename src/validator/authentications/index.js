const {
  PostLoginPayloadSchema,
  PostRegisterUserPayloadSchema,
  PostRegisterSellerPayloadSchema,
  PostRegisterAdminPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationsValidator = {
  validatePostLoginPayload: (payload) => {
    const validationResult = PostLoginPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePostRegisterUserPayload: (payload) => {
    const validationResult = PostRegisterUserPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePostRegisterSellerPayload: (payload) => {
    const validationResult = PostRegisterSellerPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePostRegisterAdminPayload: (payload) => {
    const validationResult = PostRegisterAdminPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const validationResult = DeleteAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;
