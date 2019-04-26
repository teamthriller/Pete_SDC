/* eslint-disable no-console */
const db = require('../database');

module.exports = {
  albums: {
    get: id => new Promise((resolve, reject) => {
      const queryString = `select albums.name as name, albums.photo as image, artists.name as artistname from albums inner join artistAlbums on albums.id = artistAlbums.albumid inner join artists on artistAlbums.artistid = artists.id where artists.id = ${id}`
      db.query(queryString, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    }),
  },
}