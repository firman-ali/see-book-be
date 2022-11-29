const { PostSaleByIdPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const SalesValidator = {
  validatePostSaleByIdPayload: (payload) => {
    const validationResult = PostSaleByIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SalesValidator;
