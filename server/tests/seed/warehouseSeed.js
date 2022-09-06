const { ObjectId } = require("mongodb");
const Warehouse = require("../../models/Warehouse");

const whOneID = new ObjectId();
const whTwoID = new ObjectId();
const whThreeID = new ObjectId();

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

module.exports = {
	populateWarehouses,
	warehouses,
};
