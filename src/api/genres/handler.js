class GenresHandler {
  constructor(service, userService, validator) {
    this._service = service;
    this._userService = userService;
    this._validator = validator;

    this.getGenresHandler = this.getGenresHandler.bind(this);
    this.postGenresHandler = this.postGenresHandler.bind(this);
    this.getGenresByIdHandler = this.getGenresByIdHandler.bind(this);
    this.putGenresByIdHandler = this.putGenresByIdHandler.bind(this);
    this.deleteGenresByIdHandler = this.deleteGenresByIdHandler.bind(this);
  }

  async getGenresHandler() {
    const data = await this._service.getGenres();
    return {
      status: 'success',
      data,
    };
  }

  async postGenresHandler(request) {
    const { uid } = request.auth.credentials;
    await this._userService.verifyAdmin(uid);
    await this._validator.validatePostGenresPayload(request.payload);
    const { name, description } = request.payload;
    const data = await this._service.addGenres(name, description, uid);
    return {
      status: 'success',
      message: 'Data berhasil ditambahkan',
      data,
    };
  }

  async getGenresByIdHandler(request) {
    const { id } = request.params;
    const data = await this._service.getGenresById(id);
    return {
      status: 'success',
      data,
    };
  }

  async putGenresByIdHandler(request) {
    const { id } = request.params;
    this._validator.validatePutGenresPayload(request.payload);
    const data = await this._service.editGenresById(id, request.payload);
    return {
      status: 'success',
      message: 'Data berhasil diperbaharui',
      data,
    };
  }

  async deleteGenresByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteGenresById(id);
    return {
      status: 'success',
      message: 'Data berhasil dihapus',
    };
  }
}

module.exports = GenresHandler;
