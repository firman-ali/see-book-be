const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'sales',
  version: '1.0.0',
  register: async (server, { service, tokenManager, validator }) => {
    const salesHandler = new UsersHandler(service, tokenManager, validator);
    server.route(routes(salesHandler));
  },
};
