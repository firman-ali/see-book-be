/* eslint-disable max-len */
class BooksHandler {
  constructor(service, userService, validator) {
    this._service = service;
    this._userService = userService;
    this._validator = validator;

    this.getBooksHandler = this.getBooksHandler.bind(this);
    this.postBooksHandler = this.postBooksHandler.bind(this);
    this.getBooksByIdHandler = this.getBooksByIdHandler.bind(this);
    this.putBooksByIdHandler = this.putBooksByIdHandler.bind(this);
    this.deleteBooksByIdHandler = this.deleteBooksByIdHandler.bind(this);
    this.getNewBooksHandler = this.getNewBooksHandler.bind(this);
  }

  async getBooksHandler(request) {
    const params = request.query.name;

    const data = await this._service.getBooks(params);
    return {
      status: 'success',
      data,
    };
  }

  async getNewBooksHandler() {
    const data = await this._service.getNewBooks();
    return {
      status: 'success',
      data,
    };
  }

  async postBooksHandler(request) {
    const { uid } = request.auth.credentials;
    this._validator.validatePostBooksPayload(request.payload);
    await this._userService.verifyAccessNotUser(uid);
    const {
      name, synopsis, writer, language, publisher_id, publisher, total_page, genres,
    } = request.payload;
    const data = await this._service.addBooks(name, synopsis, writer, language, publisher_id, publisher, total_page, genres);
    return {
      status: 'success',
      message: 'Data berhasil ditambahkan',
      data,
    };
  }

  async getBooksByIdHandler(request) {
    const { id } = request.params;
    const data = await this._service.getBooksById(id);
    return {
      status: 'success',
      data,
    };
  }

  async putBooksByIdHandler(request) {
    const { id } = request.params;
    this._validator.validatePutBooksPayload(request.payload);
    const {
      name, synopsis, writer, language, publisher_id, publisher, totalPage, genres,
    } = request.payload;
    const data = await this._service.editBooksById(id, name, synopsis, writer, language, publisher_id, publisher, totalPage, genres);
    return {
      status: 'success',
      message: 'Data berhasil diperbaharui',
      data,
    };
  }

  async deleteBooksByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteBooksById(id);
    return {
      status: 'success',
      message: 'Data berhasil dihapus',
    };
  }
}

module.exports = BooksHandler;
