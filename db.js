const { Pool, Client } = require('pg');
const config = require('./config/config');

const client = new Client({
    connectionString: config.connectionString,
  });

const pool = new Pool({
    connectionString: config.connectionString,
});

module.exports.client = client;
module.exports.pool = pool;