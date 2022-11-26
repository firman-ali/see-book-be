const { PostBooksPayloadSchema, PutBooksPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const BooksValidator = {
  validatePostBooksPayload: (payload) => {
    const validationResult = PostBooksPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutBooksPayload: (payload) => {
    const validationResult = PutBooksPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = BooksValidator;
