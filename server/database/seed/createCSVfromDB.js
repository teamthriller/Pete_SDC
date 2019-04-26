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
})

sql = `copy artists to '/Users/peteknutson/ghrden01/Pete_SDC/server/database/artists.csv' DELIMITER ',' CSV HEADER;`;

pool.query(sql, (err, res) => {
  console.log(err, res)
});

sql = `copy albums to '/Users/peteknutson/ghrden01/Pete_SDC/server/database/albums.csv' DELIMITER ',' CSV HEADER;`;

pool.query(sql, (err, res) => {
  console.log(err, res)
});

sql = `copy artistalbums to '/Users/peteknutson/ghrden01/Pete_SDC/server/database/artistalbums.csv' DELIMITER ',' CSV HEADER;`;

pool.query(sql, (err, res) => {
  console.log(err, res)
});