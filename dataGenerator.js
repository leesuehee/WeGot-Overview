const Faker = require('faker');
const mongoose = require('mongoose');
const db = require('./db/db.js');

mongoose.connect(`mongodb://localhost/wegotdata`);

let type = () => {
  let typeArr = '';
  for (let item of score) {
    let i = Faker.lorem.words();
    // typeArr.push(i);
    typeArr += ` ${i}`
  }
  return typeArr;
} 

const seedMillions = (instances) => {
  // let data = [];
  for (let i = 0; i < instances; i++) {
    let restaurant = {
      id: i,
      name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
      tagline: Faker.lorem.words(),
      type: type,
      vicinity: Faker.address.streetName(),
      priceLevel: Math.floor(Math.random() * 5) + 1,
      zagatFood: Math.floor(Math.random() * 5) + 1,
      zagatDecor: Math.floor(Math.random() * 5) + 1,
      zagatService: Math.floor(Math.random() * 5) + 1,
      longDescription : Faker.lorem.sentences()
    }
    // data.push(restaurant);
    db.insertOne(restaurant, (err, data) => {
      if (err) throw err;
      else {
        console.log('inserted');
      }
    })
  }
  // console.log(data);
  // db.insertMany(data, (err, data) => {
  //   if (err) throw err;
  //   console.log('inserted')
  // })  
}
seedMillions(10000);