const PricesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'prices',
  version: '1.0.0',
  register: async (server, { service, userService, validator }) => {
    const pricesHandler = new PricesHandler(service, userService, validator);
    server.route(routes(pricesHandler));
  },
};
