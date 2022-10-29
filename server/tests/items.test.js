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
var newItem = {
	item_name: "Table and Chairs",
	description: "Table and chair set",
	donation: false,
	client_access: true,
	value: 600,
	location: "Apartment 5",
	quantity: 5,
	photo: "",
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

	describe("GET /items/:id", () => {
		it("should return an item", (done) => {
			request(app)
				.get(`/api/items/${items[0]._id}`)
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.item_name).to.equal(items[0].item_name);
				})
				.end(done);
		});
		it("should not return an item with incorrect ID", (done) => {
			request(app)
				.get(`/api/items/${items[0]._id}ssssss`)
				.set("Authorization", users[0].token)
				.expect(400)
				.expect((res) => {
					expect(res.body.item).to.equal("There was no item found");
				})
				.end(done);
		});
	});

	describe("POST /items", () => {
		it("should create a new item", (done) => {
			request(app)
				.post("/api/items")
				.set("Authorization", users[0].token)
				.send(newItem)
				.expect(200)
				.expect((res) => {
					expect(res.body.item_name).to.equal(newItem.item_name);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}
					done();
				});
		});
		it("should not create a new item", (done) => {
			newItem.item_name = "";
			request(app)
				.post("/api/items")
				.set("Authorization", users[0].token)
				.send(newItem)
				.expect(400)
				.expect((res) => {
					expect(res.body.item_name).to.equal(
						"Item name is required"
					);
				})
				.end(done);
		});
	});

	describe("DELETE /items/:id", () => {
		it("should delete a item", (done) => {
			request(app)
				.delete(`/api/items/${items[2]._id}`)
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.item_name).to.equal(items[2].item_name);
				})
				.end(done);
		});
		it("should not delete a item", (done) => {
			request(app)
				.delete(`/api/items/${items[2]._id}ssss`)
				.set("Authorization", users[0].token)
				.expect(400)
				.expect((res) => {
					expect(res.body.item).to.equal("There was no item found");
				})
				.end(done);
		});
	});

	describe("PATCH /items/:id", () => {
		it("should update a item", (done) => {
			items[2].item_name = "Bag of Screws";
			request(app)
				.patch(`/api/items/${items[2]._id}`)
				.set("Authorization", users[0].token)
				.send(items[2])
				.expect(200)
				.expect((res) => {
					expect(res.body.item_name).to.equal("Bag of Screws");
				})
				.end(done);
		});
		it("should not update a item", (done) => {
			items[1].item_name = "Bag of Screws";
			request(app)
				.patch(`/api/items/${items[1]._id}ssss`)
				.set("Authorization", users[0].token)
				.send(items[1])
				.expect(400)
				.expect((res) => {
					expect(res.body.item).to.equal("There was no item found");
				})
				.end(done);
		});
	});
});
