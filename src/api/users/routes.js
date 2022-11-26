const routes = (handler) => [
  {
    method: 'GET',
    path: '/v1/users/detail',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'GET',
    path: '/v1/users/detail-seller',
    handler: handler.getSellerByIdHandler,
  },
  {
    method: 'GET',
    path: '/v1/users/detail-admin',
    handler: handler.getAdminByIdHandler,
  },
];

module.exports = routes;
