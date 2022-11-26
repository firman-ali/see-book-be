const routes = (handler) => [
  {
    method: 'POST',
    path: '/v1/prices/{bookId}',
    handler: handler.postPricesHandler,
  },
  {
    method: 'GET',
    path: '/v1/prices/{bookId}',
    handler: handler.getPricesByIdHandler,
  },
  {
    method: 'PUT',
    path: '/v1/prices/{bookId}',
    handler: handler.putPricesByIdHandler,
  },
];

module.exports = routes;
