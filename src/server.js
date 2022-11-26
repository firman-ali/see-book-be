const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const genres = require('./api/genres');
const GenresService = require('./services/postgres/GenresService');
const GenresValidator = require('./validator/genres');

const books = require('./api/books');
const BooksService = require('./services/postgres/BooksService');
const BooksValidator = require('./validator/books');

const prices = require('./api/prices');
const PricesService = require('./services/postgres/PricesService');
const PricesValidator = require('./validator/prices');

// const CacheService = require('./services/redis/CacheService');

const ClientError = require('./exceptions/ClientError');

require('dotenv').config();

const init = async () => {
//   const cacheService = new CacheService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const genresService = new GenresService();
  const booksService = new BooksService();
  const pricesService = new PricesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('seebook_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        uid: artifacts.decoded.payload.uid,
      },
    }),
  });
  server.auth.default('seebook_jwt');

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
      },
    },
    {
      plugin: authentications,
      options: {
        service: authenticationsService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: genres,
      options: {
        service: genresService,
        userService: usersService,
        validator: GenresValidator,
      },
    },
    {
      plugin: books,
      options: {
        service: booksService,
        validator: BooksValidator,
      },
    },
    {
      plugin: prices,
      options: {
        service: pricesService,
        validator: PricesValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isServer) {
      console.log(response.message);
      return h
        .response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        })
        .code(500);
    }
    return response.continue || response;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
