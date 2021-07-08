const { ObjectID } = require("mongodb");

var seedClients = [
    {
        _id: new ObjectID(),
        full_name: "Joe Shmoe",
        phone_number: "559-999-9999"
    }
];

module.exports = {
    seedClients
};
  
