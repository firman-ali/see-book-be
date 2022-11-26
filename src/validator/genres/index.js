const { PostGenresPayloadSchema, PutGenresPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const GenresValidator = {
  validatePostGenresPayload: (payload) => {
    const validationResult = PostGenresPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutGenresPayload: (payload) => {
    const validationResult = PutGenresPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = GenresValidator;
