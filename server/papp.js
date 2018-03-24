const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const handler = require('./routes/pgHandler.js');

const papp = express();

papp.use(express.static(__dirname + '/../client/dist'));

papp.use(cors());
papp.use(morgan('dev'));

papp.get('/', (req, res) => {
  res.redirect('/restaurants/ChIJUcXYWWGAhYARmjMY2bJAG2s');
});

papp.use('/restaurants/:id', express.static('client/dist')); 
papp.get('/api/restaurants/:id/overview', handler.pgHandler);

module.exports = papp;