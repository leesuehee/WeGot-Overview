
require('dotenv').config();
const faker = require('faker');
const pgp = require('pg-promise')({
  capSQL : true
});
const password = process.env.PASS;
const port = process.env.PORT;

const connection = `postgres://suehee:${password}@127.0.0.1:${port}/wegotdata`;

const db = pgp(connection);
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const start = Date.now();

let random = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

// creates an array of restaraunt objects (100 restaurants)
let psqlDataGenerator = () => {
  let data = [];
  for (let i = 0; i < 10000; i++) {
    let restaurant = {
      title           : faker.lorem.word(),
      zagatfood       : ((Math.random() * 5) + 1).toFixed(1),
      zagatdecor      : ((Math.random() * 5) + 1).toFixed(1),
      zagatservice    : ((Math.random() * 5) + 1).toFixed(1),
      typeof          : faker.lorem.word(),
      pricelevel      : ((Math.random() * 5) + 1).toFixed(1),
      tagline         : faker.lorem.words(),
      vicinity        : faker.address.city(),
      longdescription : faker.lorem.paragraph(),
    }
    data.push(restaurant);
  }
  return data;
}; 

let count = 10000000/numCPUs;

let insertRestaurants = async() => {
  let multipleRestaurants = psqlDataGenerator();
  const cs = new pgp.helpers.ColumnSet(['title','zagatfood','zagatdecor','zagatservice','typeof','pricelevel','tagline','vicinity','longdescription'],
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

