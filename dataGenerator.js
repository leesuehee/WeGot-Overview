const Faker = require('faker');
const mongoose = require('mongoose');
const db = require('./db/db.js');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const start = new Date().getTime();


// let generateMillions = (instances) => {
//   let data = [];
//   for (let i = 1; i <= instances; i++) {
//     let restaurant = {
//       id: i,
//       name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
//       tagline: Faker.lorem.words(),
//       type: Faker.lorem.words(),
//       vicinity: Faker.address.streetName(),
//       priceLevel: Math.floor(Math.random() * 5) + 1,
//       zagatFood: Math.floor(Math.random() * 5) + 1,
//       zagatDecor: Math.floor(Math.random() * 5) + 1,
//       zagatService: Math.floor(Math.random() * 5) + 1,
//       longDescription : Faker.lorem.sentences()
//     }
//     data.push(restaurant);
//   }
//   return data;
// }

// const batch = new Promise ((resolve, reject) => {
//   let array = [];
//   for (let i = 0; i < 100; i++) {
//     let generated = generateMillions(100);
//     array.push(generated);
//   }
//   resolve(array);
// }).then((array) => {
//   db.insertMany(array, (err, data)=> {
//     if (err) throw err;
//     else {
//       console.log('inserted')
//     }
//   })
// }).catch((err) => {
//   console.log('errored')
// });

// function seedMillions () {
//   mongoose.connect('mongodb://localhost/wegotdata');
//   let count = parseInt(10000000 / numCPUs);

//   let size = 100;
//    async function insert () {
//     await batch
//     count -= size;
//     if (count > 0) {
//       insert (); 
//     } else {
//       console.log(`finished in ${(new Date().getTime() - start)/1000 }`)
//       process.exit();
//     }
//   }
//   insert()
// }


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
  let rand = random(1000000)
  let batches = [];
  for (let i = 0; i < 10; i++){
    let tenK = generate10K(rand);
    batches.push(tenK);
  }
  return batches;
};

let batch = generateArrayOf10Batches();

async function seedMils (arrayOfDataBatches) {
  mongoose.connect('mongodb://localhost/wegotdata');
  // let count = parseInt(10000000 / numCPUs);
  // let size = 20000;
  let count = 0;
  for (let i = 0; i < arrayOfDataBatches.length; i++) {
    await db.RestaurantModel.insertMany(arrayOfDataBatches[i], (err, data) => {
      if (err) { 
        throw err;
      } else {
        console.log('inserting');
        count++;
        if (count === 10) {
          process.exit();
        }
      }
    })
  }
} 

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  let workerID = 0;
  // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
      workerID++; 
    }

  cluster.on('exit', (worker, code, signal) => {
    workerID--;
    mongoose.disconnect();
    console.log(`worker ${worker.process.pid} died in ${( (Date.now() - start )/ 1000)} sec `);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  seedMils(batch);
}

