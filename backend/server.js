'use strict';

const { Pool } = require('pg');
const Hapi = require('@hapi/hapi');
const Qs = require('qs');

const { getBeersHandler } = require('./src/handlers/getBeersHandler');
const { getBeerStyles } = require('./src/helpers/getBeerStyles');
const { getBeersStylesHandler } = require('./src/handlers/getBeersStylesHandler');

const hostname = '0.0.0.0';
const port = 3001;

// Настройка подключения к базе данных PostgreSQL
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'beer_reviews',
  password: process.env.PGPASSWORD || 'postgres',
  port: parseInt(process.env.PGPORT, 10) || 5432,
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
