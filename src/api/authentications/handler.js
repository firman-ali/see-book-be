class AuthenticationsHandler {
  constructor(service, tokenManager, validator) {
    this._service = service;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postLoginUserHandler = this.postLoginUserHandler.bind(this);
    this.postRegisterUserHandler = this.postRegisterUserHandler.bind(this);
    this.postLoginSellerHandler = this.postLoginSellerHandler.bind(this);
    this.postRegisterSellerHandler = this.postRegisterSellerHandler.bind(this);
    this.postLoginAdminHandler = this.postLoginAdminHandler.bind(this);
    this.postRegisterAdminHandler = this.postRegisterAdminHandler.bind(this);
    this.postLogoutHandler = this.postLogoutHandler.bind(this);
  }

  async postLoginUserHandler(request, h) {
    this._validator.validatePostLoginPayload(request.payload);
    const { email, password } = request.payload;

    const user = await this._service.verifyUserCredential(email, password);
    const { uid, profile_pic, name } = user;
    const accessToken = this._tokenManager.generateAccessToken({ uid });
    const refreshToken = this._tokenManager.generateRefreshToken({ uid });

    await this._service.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Login berhasil',
      data: {
        uid,
        name,
        email,
        profile_pic,
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async postRegisterUserHandler(request, h) {
    this._validator.validatePostRegisterUserPayload(request.payload);

    const data = await this._service.addUser(request.payload);

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data,
    });
    response.code(201);
    return response;
  }

  async postLoginSellerHandler(request, h) {
    this._validator.validatePostLoginPayload(request.payload);
    const { email, password } = request.payload;

    const seller = await this._service.verifySellerCredential(email, password);
    const {
      uid, profile_pic, address, name,
    } = seller;
    const accessToken = this._tokenManager.generateAccessToken({ uid });
    const refreshToken = this._tokenManager.generateRefreshToken({ uid });

    await this._service.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Login berhasil',
      data: {
        uid,
        name,
        email,
        profile_pic,
        address,
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async postRegisterSellerHandler(request, h) {
    this._validator.validatePostRegisterSellerPayload(request.payload);

    const data = await this._service.addSeller(request.payload);

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data,
    });
    response.code(201);
    return response;
  }

  async postLoginAdminHandler(request, h) {
    this._validator.validatePostLoginPayload(request.payload);
    const { email, password } = request.payload;

    const admin = await this._service.verifyAdminCredential(email, password);
    const { uid, profile_pic, name } = admin;
    const accessToken = this._tokenManager.generateAccessToken({ uid });
    const refreshToken = this._tokenManager.generateRefreshToken({ uid });

    await this._service.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Login berhasil',
      data: {
        uid,
        name,
        email,
        profile_pic,
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async postRegisterAdminHandler(request, h) {
    this._validator.validatePostRegisterAdminPayload(request.payload);

    const data = await this._service.addAdmin(request.payload);

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data,
    });
    response.code(201);
    return response;
  }

  async postLogoutHandler(request, h) {
    this._validator.validateDeleteAuthenticationPayload(request.payload);

    const { refreshToken } = request.payload;

    await this._service.verifyRefreshToken(refreshToken);
    await this._service.deleteRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'User berhasil logout',
    });
    response.code(201);
    return response;
  }
}

module.exports = AuthenticationsHandler;
