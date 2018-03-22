require('dotenv').config();

const pgp = require('pg-promise')({
  capSQL : true
});
const password = process.env.PASS;
const port = process.env.PORT;

const connection = `postgres://suehee:${password}@127.0.0.1:${port}/wegotdata`;
const db = pgp(connection);

const start = Date.now();

const actions = {
  GET: function respondToGETRequest(req, res) {
    console.log('methods',req.params.id);

    db.any(`SELECT * FROM restaurant WHERE ID=${req.params.id}`)
      .then((data) => {
        console.log('QUERIED:',data)
        res.send(data);
      })
      .catch((err) => { 
        res.send(err);
      })
  }
};

const pgHandler = (req, res) => {
  if (actions[req.method]) {
    actions[req.method](req, res);
  } else {
    res.sendStatus(404);
  }
};

module.exports.pgHandler = pgHandler;
