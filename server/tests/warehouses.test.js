const request = require("supertest");
const chai = require("chai");
var expect = chai.expect;

const { app } = require("./../index");
const { populateWarehouses, warehouses } = require("./seed/warehouseSeed");
const { populateUsers, users } = require("./seed/userSeed");

// new warehouse obejct for post
var newWarehouse = {
	name: "WH 004",
};

describe("WAREHOUSES", () => {
	beforeEach(populateWarehouses);
	beforeEach(populateUsers);

	describe("GET /warehouses", () => {
		it("should return an array of warehouses", (done) => {
			request(app)
				.get("/api/warehouses")
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.length).to.equal(warehouses.length);
				})
				.end(done);
		});
		it("should not return an array of warehouses if not logged in", (done) => {
			request(app)
				.get("/api/warehouses")
				.expect(401)
				.expect((res) => {
					expect(res.body.auth).to.equal("Authorization failed");
				})
				.end(done);
		});
	});

	describe("GET /warehouses/:id", () => {
		it("should return a specific warehouse", (done) => {
			request(app)
				.get(`/api/warehouses/${warehouses[0]._id}`)
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.name).to.equal("WH 001");
				})
				.end(done);
		});

		it("should not return a warehouse", (done) => {
			request(app)
				.get(`/api/warehouses/${warehouses[0]._id}ssss`)
				.set("Authorization", users[0].token)
				.expect(400)
				.expect((res) => {
					expect(res.body.warehouse).to.equal(
						"There was no warehouse found"
					);
				})
				.end(done);
		});
	});

	describe("POST /warehouses", (done) => {
		it("should create a new warehouse", (done) => {
			request(app)
				.post("/api/warehouses/")
				.set("Authorization", users[0].token)
				.send(newWarehouse)
				.expect(200)
				.expect((res) => {
					expect(res.body.name).to.equal(newWarehouse.name);
				})
				.end(done);
		});
		it("should not create a new warehouse", (done) => {
			newWarehouse.name = "";
			request(app)
				.post("/api/warehouses/")
				.set("Authorization", users[0].token)
				.send(newWarehouse)
				.expect(400)
				.expect((res) => {
					expect(res.body.name).to.equal("Name is required");
				})
				.end(done);
		});
	});

	describe("PATCH /warehouses/:id", (done) => {
		it("should update a warehouse", (done) => {
			warehouses[2].name = "WH 010";

			request(app)
				.patch(`/api/warehouses/${warehouses[2]._id}`)
				.set("Authorization", users[0].token)
				.send(warehouses[2])
				.expect(200)
				.expect((res) => {
					expect(res.body.name).to.equal("WH 010");
				})
				.end(done);
		});
		it("should not update a warehouse", (done) => {
			warehouses[2].name = "WH 020";
			request(app)
				.patch(`/api/warehouses/${warehouses[2]._id}ssss`)
				.set("Authorization", users[0].token)
				.send(warehouses[2])
				.expect(400)
				.expect((res) => {
					expect(res.body.warehouse).to.equal(
						"There was no warehouse found"
					);
				})
				.end(done);
		});
	});

	describe("DELETE /warehouses/:id", (done) => {
		it("should delete a warehouse", (done) => {
			request(app)
				.delete(`/api/warehouses/${warehouses[2]._id}`)
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.name).to.equal(warehouses[2].name);
				})
				.end(done);
		});
		it("should not delete a warehouse", (done) => {
			request(app)
				.delete(`/api/warehouses/${warehouses[2]._id}ssss`)
				.set("Authorization", users[0].token)
				.expect(400)
				.expect((res) => {
					expect(res.body.warehouse).to.equal(
						"There was no warehouse found"
					);
				})
				.end(done);
		});
	});
});
