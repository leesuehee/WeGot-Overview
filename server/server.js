const mongoose = require('mongoose');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('../webpack.config.js');
const app = require('./app');

const dbAddress = process.env.DB_ADDRESS || 'localhost';


mongoose.connect(`mongodb://localhost/wegotdata`);

app.listen(3002, () => {
  console.log('Listening on port 3002');
});

// =============================================================== //
// ===== webpack lines commented for proxy server purposes ======= //
// =============================================================== //
