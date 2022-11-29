class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.postUserByIdHandler = this.postUserByIdHandler.bind(this);
    this.putUserByIdHandler = this.putUserByIdHandler.bind(this);
    this.deleteUserByIdHandler = this.deleteUserByIdHandler.bind(this);
  }

  async getUserByIdHandler(request) {
    const { uid } = request.auth.credentials;
    await this._service.statusDeletedUser(uid);
    const data = await this._service.getUserById(uid);
    return {
      status: 'success',
      data,
    };
  }

  async postUserByIdHandler(request) {
    const { uid, email } = request.auth.credentials;
    await this._service.statusDeletedUser(uid);
    this._validator.validatePostUserByIdPayload(request.payload);
    const data = await this._service.addUser(uid, email, request.payload);
    return {
      status: 'success',
      data,
    };
  }

  async putUserByIdHandler(request) {
    const { uid } = request.auth.credentials;
    await this._service.statusDeletedUser(uid);
    this._validator.validatePutUserByIdPayload(request.payload);
    await this._service.updateUserById(uid, request.payload);
    return {
      status: 'success',
      message: 'User berhasil diperbaharui',
    };
  }

  async deleteUserByIdHandler(request) {
    const { uid } = request.auth.credentials;
    await this._service.statusDeletedUser(uid);
    await this._service.deleteUserById(uid);
    return {
      status: 'success',
      message: 'User berhasil dihapus',
    };
  }
}

module.exports = UsersHandler;
