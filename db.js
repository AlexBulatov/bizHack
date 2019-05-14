const { Pool, Client } = require('pg');

var connectionString = "postgres://postgres:,fyfkmysq1234@localhost:5432/postgres";

const client = new Client({
    connectionString: connectionString,
  });

module.exports.client = client;