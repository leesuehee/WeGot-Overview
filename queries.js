require('dotenv').config();
const password = process.env.PASS;
const port = process.env.PORT;

const MongoClient = require('mongodb').MongoClient;
const db = require('./db/db.js');

const pgp = require('pg-promise')({
  capSQL : true
});
const connection = `postgres://suehee:${password}@127.0.0.1:${port}/wegotdata`;
const pdb = pgp(connection);


const start = new Date().getTime();

//MONGO QUERY
let mongoQuery = (id) => {
  let mongoConnect = async () => {
    MongoClient.connect('mongodb://localhost/').then(async (client) => {
    const db = client.db('wegotdata');
    const collection = db.collection('restaurants');
    console.log('connected to MongoDB');
      await collection.find({'id': id},(err, data) => {
        if (err) throw err;
          else {
            console.log('completed query');
          }
      });
      console.log(`retrieved in    :  ${ (Date.now() - start) / 1000}`);
    });
  }
  mongoConnect(); 
}
mongoQuery(18611);

//POSTGRES QUERY 
let postQuery = (id) => { 
  pdb.any(`SELECT * FROM restaurant WHERE ID=${id}`)
    .then(data => {
      console.log('retrieved in     :   ', ((Date.now() - start)/1000));
    })
    .catch(err =>  {
      console.log(err);
    })
}
postQuery(1);
