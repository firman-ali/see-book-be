const routes = (handler) => [
  {
    method: 'GET',
    path: '/v1/sales',
    handler: handler.getSalesHandler,
  },
  {
    method: 'POST',
    path: '/v1/sales',
    handler: handler.postSaleByIdHandler,
  },
  {
    method: 'GET',
    path: '/v1/sales/{id}',
    handler: handler.getSaleByIdHandler,
  },
  {
    method: 'GET',
    path: '/v1/sales/payments',
    handler: handler.getPaymentMethod,
  },
];

module.exports = routes;
