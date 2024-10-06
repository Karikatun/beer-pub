'use strict';

const { Pool } = require('pg');
const Hapi = require('@hapi/hapi');
const Qs = require('qs');

const { getBeersHandler } = require('./src/handlers/getBeersHandler');
const { getBeerStyles } = require('./src/helpers/getBeerStyles');
const { getBeersStylesHandler } = require('./src/handlers/getBeersStylesHandler');
const { getBeerImageHandler } = require('./src/handlers/getBeerImageHandler');
const { getBeerItemHandler } = require('./src/handlers/getBeerItemHandler');

const hostname = '0.0.0.0';
const port = 3001;

// Настройка подключения к базе данных PostgreSQL
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT, 10),
});

// Инициация сервера
const init = async () => {
  const server = Hapi.server({
    port,
    host: hostname,
    query: {
      parser: (query) => Qs.parse(query)
    },
    "routes": {
      "cors": true
    }
  });

  const styles = await getBeerStyles(pool);

  server.route({
    method: 'GET',
    path: '/api/beers',
    handler: getBeersHandler(pool)
  });

  server.route({
    method: 'GET',
    path: '/api/beerStyles',
    handler: getBeersStylesHandler(styles)
  });

  server.route({
    method: 'GET',
    path: '/api/beer/{id}',
    handler: getBeerItemHandler(pool)
  });

  server.route({
    method: 'POST',
    path: '/api/beer/{id}/image',
    handler: getBeerImageHandler()
  });

  server.route({
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      return h.response('404! Ресурс не найден!').code(404);
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
