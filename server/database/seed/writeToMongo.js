const mongoose = require('mongoose');
const faker = require('faker');

//const mongoURI = 'mongodb+srv://admin:sdc1234@sdc-zjmho.mongodb.net/test?retryWrites=true';
const mongoURI = 'mongodb://localhost:27017/spotify';

const CONFIG = require('../CONFIG');

const db = mongoose.connect(mongoURI, {
  useNewUrlParser: true
});

db
  .then(db => console.log(`Connected to: ${mongoURI}`))
  .catch(err => {
    console.log(`There was a problem connecting to mongo at: ${mongoURI}`)
    console.log(err);
  });


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

var Schema = mongoose.Schema;
var artistSchema = new Schema({
  id: Int16Array,
  name: String,
  albums: [Int16Array],
  singlesEP: [
    id: Int16Array,
  ],
  AppearsOn: [{
    id: Int16Array,
  }]
});
var albumSchema = new Schema({
  id: Int16Array,
  name: String,
  type: String,
  primaryArtist: [{
    id: Int16Array,
  }],
  featuringArtist: [{
    id: Int16Array,
  }],
});

let Artists = mongoose.model('artists', artistSchema);
let Albums = mongoose.model('albums', albumSchema);


const runQuery = (sql) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, res) => {
      if (err)
        return reject(err);
      resolve(res.rows);
    });
  });
}

let sql = 'select * from artists where id < 10000000';

runQuery(sql).then(artistsResults => {
  // var bulk = db.artists.initializeUnorderedBulkOp();
  //let artistCollection = [];

  artistsResults.forEach(artistRecord => {
    sql = `select albums.name as AlbumName, artists.name as ArtistName from albums inner join artistAlbums on albums.id = artistAlbums.albumid inner join artists on artistAlbums.artistid = artists.id where artists.id = ${artistRecord.id}`
    //console.log(sql);
    let artist = '';
    let albumsArray = [];
    runQuery(sql).then(albums => {
      // console.log(albums);
      albums.forEach((album, index) => {
        if (index === 0) {
          artist = album.artistname;
        }
        albumsArray.push({
          'name': album.albumname
        });

      });
      let artists1 = new Artists({
        'name': artist,
        'albums': albumsArray
      })

      artists1.save((err, results) => {
        if (err) console.log(err);
        // console.log(results);
      });
    });
  })
});