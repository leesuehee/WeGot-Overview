const Faker = require('faker');
// const mongoose = require('mongoose');
// const dataB = require('./db/db.js');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const MongoClient = require('mongodb').MongoClient;

const start = new Date().getTime();

let generate10K = (j) => {
  let data = [];
  for (let i = 1; i <= 10000; i++) {
    let restaurant = {
      id: j+i,
      name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
      tagline: Faker.lorem.words(),
      type: Faker.lorem.words(),
      vicinity: Faker.address.streetName(),
      priceLevel: Math.floor(Math.random() * 5) + 1,
      zagatFood: Math.floor(Math.random() * 5) + 1,
      zagatDecor: Math.floor(Math.random() * 5) + 1,
      zagatService: Math.floor(Math.random() * 5) + 1,
      longDescription : Faker.lorem.sentences()
    }
    data.push(restaurant);
  }
  return data;
}
let random = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

let generateArrayOf10Batches = () => {
  let rand = random(10000)
  let batches = [];
  for (let i = 0; i < 50; i++){
    let tenK = generate10K(rand);
    batches.push(tenK);
  }
  return batches;
};

let batch = generateArrayOf10Batches();

async function seedMils (arrayOfDataBatches) {
  MongoClient.connect('mongodb://localhost/').then((client) => {
    const db = client.db('wegotdata');
    const collection = db.collection('restaurants');

    let count = 0;
    for (let i = 0; i < arrayOfDataBatches.length; i++) {
      collection.insertMany(arrayOfDataBatches[i], {ordered: false}, (err, data)=>{
        if (err) { 
          throw err;
        } else {
          console.log('inserting');
          count++;
          if (count === 10) {
            client.close();
            process.exit();
          }
        }
      })
    }
  })
} 

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

  cluster.on('exit', (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} died in ${( (Date.now() - start )/ 1000)} sec `);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  seedMils(batch);
}

