/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const router = require('./routes');
// const { DatabaseQueryHandler } = require('./database/index.js');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/../public`));
app.use('/albums', router);

const PORT = 3242;

app.listen(PORT, (err) => {
  if (err) {
    console.error('failed to open server');
  } else {
    console.log(`Listening on ${PORT}`);
  }
});