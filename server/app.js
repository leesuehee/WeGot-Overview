const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const handler = require('./routes/mongoHandler.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/restaurants/1');
});

app.use('/restaurants/:id', express.static('client/dist'));
app.get('/api/restaurants/:id/overview', handler.mongoHandler);

module.exports = app;

