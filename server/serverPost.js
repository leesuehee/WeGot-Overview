const mongoose = require('mongoose');
const papp = require('./papp');

const dbAddress = process.env.DB_ADDRESS || 'localhost';

papp.listen(3002, () => {
  console.log('Listening on port 3002');
});
