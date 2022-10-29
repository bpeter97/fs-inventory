const { ObjectId } = require("mongodb");
const Item = require("../../models/Item");

const Program = require("../../models/Program");
const User = require("../../models/User");
const Warehouse = require("../../models/Warehouse");

const userOneID = new ObjectId();
const userTwoID = new ObjectId();
const userThreeID = new ObjectId();
const userFourID = new ObjectId();

const programOneID = new ObjectId();
const programTwoID = new ObjectId();
const programThreeID = new ObjectId();

const whOneID = new ObjectId();
const whTwoID = new ObjectId();
const whThreeID = new ObjectId();

const itemOneID = new ObjectId();
const itemTwoID = new ObjectId();
const itemThreeID = new ObjectId();

// Define Users
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
		approved: false,
	},
];

// Populate Users
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

// Define Programs
var programs = [
	{
		_id: programOneID,
		name: "Program 1",
	},
	{
		_id: programTwoID,
		name: "Program 2",
	},
	{
		_id: programThreeID,
		name: "Program 3",
	},
];

// Populate Programs
const populatePrograms = (done) => {
	Program.deleteMany({})
		.then(() => {
			// generate the hash/salted password for the users.
			var programOne = new Program(programs[0]).save().catch((e) => {
				console.log(e);
			});
			var programTwo = new Program(programs[1]).save().catch((e) => {
				console.log(e);
			});
			var programThree = new Program(programs[2]).save().catch((e) => {
				console.log(e);
			});

			return Promise.all([programOne, programTwo, programThree]);
		})
		.then(() => done())
		.catch((e) => console.log(e));
};

// Define Warehouses
var warehouses = [
	{
		_id: whOneID,
		name: "WH 001",
	},
	{
		_id: whTwoID,
		name: "WH 002",
	},
	{
		_id: whThreeID,
		name: "WH 003",
	},
];

// Populate Warehouses
const populateWarehouses = (done) => {
	Warehouse.deleteMany({})
		.then(() => {
			// generate the hash/salted password for the users.
			var warehouseOne = new Warehouse(warehouses[0])
				.save()
				.catch((e) => {
					console.log(e);
				});
			var warehouseTwo = new Warehouse(warehouses[1])
				.save()
				.catch((e) => {
					console.log(e);
				});
			var warehouseThree = new Warehouse(warehouses[2])
				.save()
				.catch((e) => {
					console.log(e);
				});

			return Promise.all([warehouseOne, warehouseTwo, warehouseThree]);
		})
		.then(() => done())
		.catch((e) => console.log(e));
};

// Define items
var items = [
	{
		_id: itemOneID,
		item_name: "Shovel",
		description: "A standard shovel",
		donation: false,
		client_access: true,
		value: 35,
		location: "Warehouse",
		quantity: 1,
		photo: null,
		program: programs[0]._id.toHexString(),
		warehouse: warehouses[0]._id.toHexString(),
	},
	{
		_id: itemTwoID,
		item_name: "Rake",
		description: "A standard rake",
		donation: false,
		client_access: true,
		value: 25,
		location: "Warehouse",
		quantity: 1,
		photo: null,
		program: programs[1]._id.toHexString(),
		warehouse: warehouses[1]._id.toHexString(),
	},
	{
		_id: itemThreeID,
		item_name: "Blower",
		description: "A standard leaf blower",
		donation: false,
		client_access: true,
		value: 125,
		location: "Warehouse",
		quantity: 1,
		photo: null,
		program: programs[2]._id.toHexString(),
		warehouse: warehouses[2]._id.toHexString(),
	},
];

// Populate items
const populateItems = (done) => {
	Item.deleteMany({})
		.then(() => {
			// create and save items
			var itemOne = new Item(items[0]).save().catch((e) => {
				console.log(e);
			});
			var itemTwo = new Item(items[1]).save().catch((e) => {
				console.log(e);
			});
			var itemThree = new Item(items[2]).save().catch((e) => {
				console.log(e);
			});

			return Promise.all([itemOne, itemTwo, itemThree]);
		})
		.then(() => done())
		.catch((e) => console.log(e));
};

module.exports = {
	populateUsers,
	users,
	populatePrograms,
	programs,
	populateWarehouses,
	warehouses,
	populateItems,
	items,
};
