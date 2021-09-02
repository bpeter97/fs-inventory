const ObjectID = require('mongoose').Types.ObjectId;

var callOneId = new ObjectID();

var seedCalls = [
  {
    _id: callOneId,
    date: new Date(),
    follow_up: new Date(),
    client_name: "Brian Peter Jr",
    phone_number: "559-909-9001",
    address: "1733 S. Casablanca St",
    city: "Visalia",
    state: "CA",
    zipcode: "93292",
    square_foot: "1700",
    home_inspection: true,
    year_built: "1956",
    discount: 50.00,
    crawl: true,
    multi_story: false,
    pool_spa: true,
    deck: false,
    quote: 398.95
  }
];

module.exports = {
  seedCalls,
};
