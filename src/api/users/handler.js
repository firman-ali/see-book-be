class UsersHandler {
  constructor(service) {
    this._service = service;

    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.getSellerByIdHandler = this.getSellerByIdHandler.bind(this);
    this.getAdminByIdHandler = this.getAdminByIdHandler.bind(this);
  }

  async getUserByIdHandler(request) {
    const { uid } = request.auth.credentials;
    const data = await this._service.getUserById(uid);
    return {
      status: 'success',
      data,
    };
  }

  async getSellerByIdHandler(request) {
    const { uid } = request.auth.credentials;
    const data = await this._service.getSellerById(uid);
    return {
      status: 'success',
      data,
    };
  }

  async getAdminByIdHandler(request) {
    const { uid } = request.auth.credentials;
    const data = await this._service.getAdminById(uid);
    return {
      status: 'success',
      data,
    };
  }
}

module.exports = UsersHandler;
