const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const handler = require('./routes/pgHandler.js');

const papp = express();

papp.use(cors());
papp.use(morgan('dev'));

papp.get('/', (req, res) => {
  res.redirect('/restaurants/1');
});

papp.use('/restaurants/:id', express.static('client/dist')); 
papp.get('/api/restaurants/:id/overview', handler.pgHandler);

module.exports = papp;


