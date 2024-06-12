const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');



main().catch(err => console.log(err));

async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log('connected open')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          author : '66374d59c5df8c5c48372b36',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
           
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
          },
            images: [
                {
                  url: 'https://res.cloudinary.com/dlxxsxste/image/upload/v1717405210/YelpCamp/b4unetamhoo5wrwtj6nv.jpg',
                  filename: 'YelpCamp/b4unetamhoo5wrwtj6nv',
              
                },
                {
                  url: 'https://res.cloudinary.com/dlxxsxste/image/upload/v1717405212/YelpCamp/ttgegmkorjysvlf9lvjk.jpg',
                  filename: 'YelpCamp/ttgegmkorjysvlf9lvjk',
            }]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})