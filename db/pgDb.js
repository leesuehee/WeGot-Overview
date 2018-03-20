
require('dotenv').config();
const faker = require('faker');
const pgp = require('pg-promise')({
  capSQL : true
});
const password = process.env.DB_PASS;
const port = process.env.PORT;

const connection = `postgres://postgres:${password}@127.0.0.1:${port}/wegotdata`;
const db = pgp(connection);
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const start = new Date().getTime();

let random = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

// creates an array of restaraunt objects (100 restaurants)
let psqlDataGenerator = () => {
  let data = [];
  for (let i = 0; i < 10000; i++) {
    let restaurant = {
      food: ((Math.random() * 5) + 1).toFixed(1),
      decor: ((Math.random() * 5) + 1).toFixed(1),
      price: ((Math.random() * 5) + 1).toFixed(1),
      title: faker.lorem.word(),
      tagline: faker.lorem.words(),
      dis: faker.lorem.paragraph(),
    }
    data.push(restaurant);
  }
  return data;
}; 

let count = 10000000/numCPUs;

let insertRestaurants = async() => {
  let multipleRestaurants = psqlDataGenerator();
  const cs = new pgp.helpers.ColumnSet(['food','decor','price','title','tagline','dis'],
    {table: 'restaurant'});
  
  const query = pgp.helpers.insert(multipleRestaurants, cs);
  return db.none(query)
    .then((data) => {
      count-=10000;
      console.log(`insertions left: ${count}|| time: ${ (Date.now() - start)/1000}s!`);
    })
    .catch((error) => {console.log(error)}) 
    .catch((err) => {console.log('Insertion - ERROR',err)});
};

let repeat10Ktimes = async() => {
  while(count > 0) {
    await insertRestaurants();
  }
  pgp.end();
  process.exit();
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
    repeat10Ktimes();
}

