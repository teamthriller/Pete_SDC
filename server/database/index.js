const CONFIG = require('../CONFIG');

const {
  Pool,
} = require('pg')

const pool = new Pool({
  user: CONFIG.DATABASE.USER,
  host: CONFIG.DATABASE.HOST,
  database: CONFIG.DATABASE.DATABASE,
  password: CONFIG.DATABASE.PWD,
  port: CONFIG.DATABASE.PORT,
  max: 30,
})

module.exports = pool;