const Faker = require('faker');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

const start = new Date().getTime();
let randomScore = Math.floor(Math.random() * 5) + 1;
          
let generateArrayOf10kRestaurants = () => {
  let restaurantArray = [];
  for (let i = 0; i < 10000; i++) {
    let restaurant = {
      id              : i,
      title           : `${Faker.name.firstName()} ${Faker.name.lastName()}`,
      tagline         : Faker.lorem.words(),
      typeof          : Faker.lorem.words(),
      vicinity        : Faker.address.streetName(),
      pricelevel      : randomScore,
      zagatfood       : randomScore,
      zagatdecor      : randomScore,
      zagatservice    : randomScore,
      longdescription : Faker.lorem.sentences()
    };
    restaurantArray.push(restaurant);
  };
};

let seed = async(id, con) => {
  console.log('in seed', con);
  let count = 10000000/numCPUs;
  for (let i = 0; i < count; i++) {
    console.log(`worker#${id}'s job`);
    let batch_of_10K_Restaurants = generateArrayOf10kRestaurants();
    await con.insertMany(batch_of_10K_Restaurants, {ordered:false})
    count-=10000;
    console.log(count);
  }   
  client.close();
  process.exit();
};

let clusterUp = async() => {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
      let con = await mongoconnection();
      console.log(con);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died in ${( (Date.now() - start )/ 1000)} sec `);
    });
  } else {
    console.log(`Worker ${process.pid} started`);
    await seed(cluster.worker.id, con);
  }
};
// Open the connection to the server
mongoclient.open(function(err, mongoclient) {
  const db = mongoclient.db('wegotdata');
  const collection = db.collection('restaurants');
  
  clusterUp();
})

