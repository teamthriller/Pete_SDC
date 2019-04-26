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

let sql = `DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS artistAlbums;


CREATE TABLE artists(
id serial PRIMARY KEY,
name VARCHAR (255));

CREATE TABLE albums(
  id serial PRIMARY KEY,
  name VARCHAR (255));

  CREATE TABLE artistAlbums(
    id serial PRIMARY KEY,
    artistId integer,
    albumId integer,
    type int);
  `

// pool.query(sql, (err, res) => {
//   console.log(err, res)
// });

// sql = `COPY artists(id, name) 
// FROM '/Users/peteknutson/ghrden01/Pete_SDC/server/database/artists.csv' DELIMITER ',' CSV HEADER;`;

// pool.query(sql, (err, res) => {
//   console.log(err, res)
// });

// sql = `COPY albums(id, name) 
// FROM '/Users/peteknutson/ghrden01/Pete_SDC/server/database/albums.csv' DELIMITER ',' CSV HEADER;`;

// pool.query(sql, (err, res) => {
//   console.log(err, res)
// });

sql = `COPY artistalbums(id, artistId, albumId, type) 
FROM '/Users/peteknutson/ghrden01/Pete_SDC/server/database/artistalbums.csv' DELIMITER ',' CSV HEADER;`;

pool.query(sql, (err, res) => {
  console.log(err, res)
});

pool.end();