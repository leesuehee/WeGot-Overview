const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const handler = require('./routes/pgHandler.js');
const path = require('path');
import React from 'react';
// import { renderToString } from 'react-dom/server';
import Overview from './client/src/components/Overview'





const papp = express();

papp.use(cors());
papp.use(morgan('dev'));

papp.use(express.static(path.join(__dirname, '../public')));
papp.get('/', (req, res) => {
  res.redirect(`/restaurants/1`);

// papp.use('/restaurants/:id', express.static('client/dist')); 
papp.get('/api/restaurants/:id/overview', handler.pgHandler);



module.exports = papp;


