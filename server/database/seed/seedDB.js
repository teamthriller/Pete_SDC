const CONFIG = require('../CONFIG');
const words = require('./words');

const {
  Pool,
} = require('pg')

const pool = new Pool({
  user: CONFIG.DATABASE.USER,
  host: 'localhost',
  database: 'spotify',
  password: '',
  port: 5432,
})

let sql = `
    DROP TABLE IF EXISTS artists;
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


CREATE TABLE ArtistNameAlbumName(
  id serial PRIMARY KEY,
  artistName VARCHAR(255),
  albumName VARCHAR(255));


// pool.query(sql, (err, res) => {
//   //console.log(err, res)
// })


const randomArtists = () => {
  let adv = words.adverbs[Math.floor(Math.random() * words.adverbs.length)]
  let noun = words.nouns[Math.floor(Math.random() * words.nouns.length)]
  if (noun.charAt(noun.length - 1) === 's') {
    noun = noun.charAt(0).toUpperCase() + noun.slice(1);

  } else {
    noun = noun.charAt(0).toUpperCase() + noun.slice(1) + 's';
  }
  return adv.trim() + ' ' + noun.trim();
}
const randomAlbum = () => {
  let leader = words.albumLeads[Math.floor(Math.random() * words.albumLeads.length)]
  let adv = words.adverbs[Math.floor(Math.random() * words.adverbs.length)]
  let noun = words.nouns[Math.floor(Math.random() * words.nouns.length)]
  noun = noun.charAt(0).toUpperCase() + noun.slice(1);
  if (leader === '') {
    return adv.trim() + ' ' + noun.trim();
  } else {
    return leader.trim() + ' ' + adv.trim() + ' ' + noun.trim();
  }

}

const runQuery = (sql) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, res) => {
      if (err)
        return reject(err);
      resolve(res.rows[0].id);
    });
  });
}

sql = '';
for (let i = 0; i < 10000; i++) {
  let artist = randomArtists();
  sql = `insert into artists (name) values( '${artist}') RETURNING id;`;
  runQuery(sql).then(artistID => {
    //console.log(artistID);
    sql = '';
    albumCount = Math.random() * 20;
    for (i = 0; i < albumCount; i++) {
      let album = randomAlbum();
      sql = `insert into albums (name) values( '${album}') RETURNING id;`;
      //console.log(sql);
      runQuery(sql).then(albumId => {
        sql = `insert into artistalbums(artistId, albumId) values(${artistID}, ${albumId}) RETURNING id;`;
        pool.query(sql, (err, res) => {
          //console.log(err, res)
        })
      });
    }
  })
}