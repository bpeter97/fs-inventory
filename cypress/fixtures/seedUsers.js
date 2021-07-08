const { ObjectID } = require("mongodb");

var userOneId = new ObjectID();

var seedUsers = [
  {
    _id: userOneId,
    username: "blpsr",
    password: "thePassword",
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
