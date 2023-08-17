const initOptions = {};
const pgp = require('pg-promise')(initOptions);

// postgres://danudev:AaosDGBrS1m8b7igk56OJvfdLPPHvmpo@dpg-cjf7r1anip6c73ftl79g-a.frankfurt-postgres.render.com/dbmetasapp

// const cn = {
//   user: 'postgres',
//   password: '061092',
//   host: 'localhost',
//   port: 5432,
//   database: 'metasapp',
// };

const cn = {
  user: 'danudev',
  password: 'AaosDGBrS1m8b7igk56OJvfdLPPHvmpo',
  host: 'dpg-cjf7r1anip6c73ftl79g-a',
  port: 5432,
  database: 'dbmetasapp',
};

const db = pgp(cn);

module.exports = db;
