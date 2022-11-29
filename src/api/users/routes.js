const routes = (handler) => [
  {
    method: 'GET',
    path: '/v1/users',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'POST',
    path: '/v1/users',
    handler: handler.postUserByIdHandler,
  },
  {
    method: 'PUT',
    path: '/v1/users',
    handler: handler.putUserByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/v1/users',
    handler: handler.deleteUserByIdHandler,
  },
];

module.exports = routes;
