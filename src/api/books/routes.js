const routes = (handler) => [
  {
    method: 'GET',
    path: '/v1/books',
    handler: handler.getBooksHandler,
  },
  {
    method: 'POST',
    path: '/v1/books',
    handler: handler.postBooksHandler,
  },
  {
    method: 'GET',
    path: '/v1/books/{id}',
    handler: handler.getBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/v1/books/{id}',
    handler: handler.putBooksByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/v1/books/{id}',
    handler: handler.deleteBooksByIdHandler,
  },
];

module.exports = routes;
