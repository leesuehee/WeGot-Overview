const MongoClient = require('mongodb').MongoClient;
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const Faker = require('faker');

let time = new Date().getTime();


let generate = async (instances) => {
  let data = [];
  for (let i = 1; i <= instances; i++) {
    let restaurant = {
      id: i,
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


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  seedDB();
  console.log(`Worker ${process.pid} started`);
}


function seedDB() {
  MongoClient.connect('mongodb://localhost/').then((client) => {
    const db = client.db('wegotdata');
    const collection = db.collection('restaurants');

    let count = parseInt(10000000 / numCPUs); // data points divided by
    // CPUs
    const size = 20000;

    async function insertBulk() {
      let ops = _.range(0, size).map((id) => ({ insertOne: { "document": {...generate(1), rid: id*Math.random() } }}));

      await collection.bulkWrite(ops, { ordered: false });
      count -= size;//
      if (count > 0) {
        insertBulk();
      } else {
        console.log('done in ', (new Date().getTime() - time) / 1000, 's ');
        client.close();
        process.exit();
      }
    }

    insertBulk();
  });
}
