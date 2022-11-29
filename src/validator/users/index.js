const { PostUserByIdPayloadSchema, PutUserByIdPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const UsersValidator = {
  validatePostUserByIdPayload: (payload) => {
    const validationResult = PostUserByIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutUserByIdPayload: (payload) => {
    const validationResult = PutUserByIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
