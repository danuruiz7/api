const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = {
  user: 'postgres',
  password: '061092',
  host: 'localhost',
  port: 5432,
  database: 'metasapp',
};

const db = pgp(cn);

module.exports = db;
