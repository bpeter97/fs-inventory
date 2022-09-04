const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const userOneID = new ObjectId();
const userTwoID = new ObjectId();
const userThreeID = new ObjectId();
const userFourID = new ObjectId();

var users = [
	{
		_id: userOneID,
		first_name: "Brian",
		last_name: "Peter",
		suffix: "Jr",
		username: "blpj",
		password: "thePassword",
		email: "test@test.com",
		type: "Admin",
		date_created: new Date(),
		approved: true,
	},
	{
		_id: userTwoID,
		first_name: "Brian",
		last_name: "Peter",
		suffix: "Sr",
		username: "blpsr",
		password: "thePassword",
		email: "gbr@test.com",
		type: "Staff",
		date_created: new Date(),
		approved: false,
	},
	{
		_id: userThreeID,
		first_name: "Taylor",
		last_name: "Hartley",
		suffix: "",
		username: "thartley",
		password: "thePassword",
		email: "new@test.com",
		type: "Admin",
		date_created: new Date(),
		approved: true,
	},
	{
		_id: userFourID,
		first_name: "Jesse",
		last_name: "Johnson",
		suffix: "",
		username: "jjohnson",
		password: "thePassword",
		email: "jjohnson@test.com",
		type: "Staff",
		date_created: new Date(),
		approved: true,
	},
];

const populateUsers = (done) => {
	User.deleteMany({})
		.then(() => {
			// generate the hash/salted password for the users.
			var userOne = new User(users[0]).save().then((user) => {
				users[0].token = user.generateAuthToken();
			});
			var userTwo = new User(users[1]).save().then((user) => {
				users[1].token = user.generateAuthToken();
			});
			var userThree = new User(users[2]).save();
			var userFour = new User(users[3]).save();

			return Promise.all([userOne, userTwo, userThree, userFour]);
		})
		.then(() => done())
		.catch((e) => console.log(e));
};

module.exports = {
	populateUsers,
	users,
};
