const BooksHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'books',
  version: '1.0.0',
  register: async (server, { service, userService, validator }) => {
    const booksHandler = new BooksHandler(service, userService, validator);
    server.route(routes(booksHandler));
  },
};
