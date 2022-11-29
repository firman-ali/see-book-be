const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const FirebaseAuth = require('./services/firebase/FirebaseAuth');

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const genres = require('./api/genres');
const GenresService = require('./services/postgres/GenresService');
const GenresValidator = require('./validator/genres');

const books = require('./api/books');
const BooksService = require('./services/postgres/BooksService');
const BooksValidator = require('./validator/books');

const prices = require('./api/prices');
const PricesService = require('./services/postgres/PricesService');
const PricesValidator = require('./validator/prices');

const sales = require('./api/sales');
const SalesService = require('./services/postgres/SalesService');
const SalesValidator = require('./validator/sales');

const TokenManager = require('./tokenize/GenerateSignature');
// const CacheService = require('./services/redis/CacheService');

const ClientError = require('./exceptions/ClientError');

require('dotenv').config();

const init = async () => {
//   const cacheService = new CacheService();
  const usersService = new UsersService();
  const genresService = new GenresService();
  const booksService = new BooksService();
  const pricesService = new PricesService();
  const salesService = new SalesService();

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

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
      plugin: Inert,
    },
    {
      plugin: FirebaseAuth,
    },
  ]);

  server.auth.strategy('firebase', 'firebase', {
    instance: admin,
  });
  server.auth.default('firebase');

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
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
        userService: usersService,
        validator: BooksValidator,
      },
    },
    {
      plugin: prices,
      options: {
        service: pricesService,
        userService: usersService,
        validator: PricesValidator,
      },
    },
    {
      plugin: sales,
      options: {
        service: salesService,
        tokenManager: TokenManager,
        validator: SalesValidator,
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
