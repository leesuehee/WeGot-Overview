require('newrelic')
const app = require('./app');

app.listen(3002, () => {
  console.log('Listening on port 3002');
});

// =============================================================== //
// ===== webpack lines commented for proxy server purposes ======= //
// =============================================================== //
