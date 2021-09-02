const ObjectID = require('mongoose').Types.ObjectId;

var seedJobs = [
    {
        _id: new ObjectID(),
        inspections: [],
        client: null,
        address: "1733 S. Casablanca St",
        city: "Visalia",
        state: "CA",
        zipcode: "93292",
        date_created: Date()
    }
];
  
module.exports = {
    seedJobs,
};
  
