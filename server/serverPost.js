require('newrelic');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const handler = require('./routes/pgHandler.js');
const path = require('path');
const port = 3001;

const papp = express();

papp.use(cors());
papp.use(morgan('dev'));

papp.use(express.static('public'));

papp.get('/', (req, res) => {
  res.redirect(`/restaurants/1`);
});
papp.use('/restaurants/:id', express.static('public')); 
papp.get('/api/restaurants/:id/overview', handler.pgHandler);

papp.listen(port, () => {
  console.log('Listening on port 3001');
});


