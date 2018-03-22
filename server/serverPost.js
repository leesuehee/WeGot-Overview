// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('../webpack.config.js');
// const dbAddress = process.env.DB_ADDRESS || 'localhost';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const handler = require('./routes/requestHandler.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wegotdata');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.redirect('/restaurants/ChIJUcXYWWGAhYARmjMY2bJAG2s');
});

app.use('/restaurants/:id', express.static('client/dist')); 
app.get('/api/restaurants/:id/overview', handler.requestHandler);

module.exports = mongo;
// =============================================================== //
// ===== webpack lines commented for proxy server purposes ======= //
// =============================================================== //
