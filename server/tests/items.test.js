const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;

const { app } = require("./../index");
const {
	populateItems,
	items,
	populateWarehouses,
	warehouses,
	populatePrograms,
	programs,
	populateUsers,
	users,
} = require("./seed/dbSeed");

// new item object for post
// Define the Item model.
const newItem = {
	item_name: "Table and Chairs",
	description: "Table and chair set",
	donation: false,
	client_access: true,
	value: 600,
	location: "Apartment 5",
	quantity: 5,
	photo: null,
	program: programs[1]._id.toHexString(),
	warehouse: warehouses[1]._id.toHexString(),
};

describe("ITEMS", () => {
	beforeEach(populateUsers);
	beforeEach(populatePrograms);
	beforeEach(populateWarehouses);
	beforeEach(populateItems);

	describe("GET /items", () => {
		it("should return an array of items", (done) => {
			request(app)
				.get("/api/items")
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.length).to.equal(items.length);
				})
				.end(done);
		});
		it("should not return an array of items if not authorized", (done) => {
			request(app)
				.get("/api/items")
				.expect(401)
				.expect((res) => {
					expect(res.body.auth).to.equal("Authorization failed");
				})
				.end(done);
		});
	});
});
