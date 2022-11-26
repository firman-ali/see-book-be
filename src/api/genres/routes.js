const routes = (handler) => [
  {
    method: 'GET',
    path: '/v1/genres',
    handler: handler.getGenresHandler,
  },
  {
    method: 'POST',
    path: '/v1/genres',
    handler: handler.postGenresHandler,
  },
  {
    method: 'GET',
    path: '/v1/genres/{id}',
    handler: handler.getGenresByIdHandler,
  },
  {
    method: 'PUT',
    path: '/v1/genres/{id}',
    handler: handler.putGenresByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/v1/genres/{id}',
    handler: handler.deleteGenresByIdHandler,
  },
];

module.exports = routes;
