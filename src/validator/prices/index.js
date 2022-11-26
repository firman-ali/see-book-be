const { PostPricesPayloadSchema, PutPricesPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const PricesValidator = {
  validatePostPricesPayload: (payload) => {
    const validationResult = PostPricesPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutPricesPayload: (payload) => {
    const validationResult = PutPricesPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PricesValidator;
