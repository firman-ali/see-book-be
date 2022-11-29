/* eslint-disable max-len */
class PricesHandler {
  constructor(service, userService, validator) {
    this._service = service;
    this._userService = userService;
    this._validator = validator;

    this.postPricesHandler = this.postPricesHandler.bind(this);
    this.getPricesByIdHandler = this.getPricesByIdHandler.bind(this);
    this.putPricesByIdHandler = this.putPricesByIdHandler.bind(this);
    this.deletePricesByIdHandler = this.deletePricesByIdHandler.bind(this);
  }

  async postPricesHandler(request) {
    const { uid } = request.auth.credentials;
    const { bookId } = request.params;
    const { list_price } = request.payload;
    this._validator.validatePostPricesPayload(request.payload);
    await this._userService.verifyAccessNotUser(uid);
    const data = await this._service.addPrices(bookId, list_price);
    return {
      status: 'success',
      message: 'Data berhasil ditambahkan',
      data,
    };
  }

  async getPricesByIdHandler(request) {
    const { bookId } = request.params;
    const data = await this._service.getPricesById(bookId);
    return {
      status: 'success',
      data,
    };
  }

  async putPricesByIdHandler(request) {
    const { bookId } = request.params;
    this._validator.validatePutPricesPayload(request.payload);
    const { list_price } = request.payload;
    const data = await this._service.editPricesById(bookId, list_price);
    return {
      status: 'success',
      message: 'Data berhasil diperbaharui',
      data,
    };
  }

  async deletePricesByIdHandler(request) {
    const { id } = request.params;
    await this._service.deletePricesById(id);
    return {
      status: 'success',
      message: 'Data berhasil dihapus',
    };
  }
}

module.exports = PricesHandler;
