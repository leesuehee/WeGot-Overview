require('newrelic');
const papp = require('./papp');

papp.listen(3002, () => {
  console.log('Listening on port 3002');
});
