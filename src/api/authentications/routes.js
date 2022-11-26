const routes = (handler) => [
  {
    method: 'POST',
    path: '/v1/login-user',
    handler: handler.postLoginUserHandler,
    options: { auth: false },
  },
  {
    method: 'POST',
    path: '/v1/register-user',
    handler: handler.postRegisterUserHandler,
    options: { auth: false },
  },
  {
    method: 'POST',
    path: '/v1/login-seller',
    handler: handler.postLoginSellerHandler,
    options: { auth: false },
  },
  {
    method: 'POST',
    path: '/v1/register-seller',
    handler: handler.postRegisterSellerHandler,
    options: { auth: false },
  },
  {
    method: 'POST',
    path: '/v1/login-admin',
    handler: handler.postLoginAdminHandler,
    options: { auth: false },
  },
  {
    method: 'POST',
    path: '/v1/register-admin',
    handler: handler.postRegisterAdminHandler,
    options: { auth: false },
  },
  {
    method: 'POST',
    path: '/v1/logout',
    handler: handler.postLogoutHandler,
  },
];

module.exports = routes;
