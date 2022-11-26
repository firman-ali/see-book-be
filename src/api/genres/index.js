const GenresHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'genres',
  version: '1.0.0',
  register: async (server, { service, userService, validator }) => {
    const genresHandler = new GenresHandler(service, userService, validator);
    server.route(routes(genresHandler));
  },
};
