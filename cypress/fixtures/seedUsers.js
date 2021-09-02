const ObjectID = require('mongoose').Types.ObjectId;

var userOneId = new ObjectID();

var seedUsers = [
  {
    _id: userOneId,
    username: "blpsr",
    password: "Victory2021!",
    first_name: "Brian",
    last_name: "Peter",
    suffix: "Sr",
    email: "dad@email.com",
    position: "Manager",
    type: "Admin",
    approved: "true",
  },
];

module.exports = {
  seedUsers,
};
