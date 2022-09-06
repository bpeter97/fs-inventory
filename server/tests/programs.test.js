const request = require("supertest");
const chai = require("chai");
var expect = chai.expect;

const { app } = require("./../index");
const { populatePrograms, programs } = require("./seed/programSeed");
const { populateUsers, users } = require("./seed/userSeed");

// new warehouse obejct for post
var newProgram = {
	name: "Program 4",
};

describe("PROGRAMS", () => {
	beforeEach(populatePrograms);
	beforeEach(populateUsers);

	describe("GET /programs", () => {
		it("should return an array of programs", (done) => {
			request(app)
				.get("/api/programs")
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.length).to.equal(programs.length);
				})
				.end(done);
		});
		it("should not return an array of programs if not logged in", (done) => {
			request(app)
				.get("/api/programs")
				.expect(401)
				.expect((res) => {
					expect(res.body.auth).to.equal("Authorization failed");
				})
				.end(done);
		});
	});

	describe("GET /programs/:id", () => {
		it("should return a specific program", (done) => {
			request(app)
				.get(`/api/programs/${programs[0]._id}`)
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.name).to.equal("Program 1");
				})
				.end(done);
		});

		it("should not return a program", (done) => {
			request(app)
				.get(`/api/programs/${programs[0]._id}ssss`)
				.set("Authorization", users[0].token)
				.expect(400)
				.expect((res) => {
					expect(res.body.program).to.equal(
						"There was no program found"
					);
				})
				.end(done);
		});
	});

	describe("POST /programs", (done) => {
		it("should create a new program", (done) => {
			request(app)
				.post("/api/programs/")
				.set("Authorization", users[0].token)
				.send(newProgram)
				.expect(200)
				.expect((res) => {
					expect(res.body.name).to.equal(newProgram.name);
				})
				.end(done);
		});
		it("should not create a new program", (done) => {
			newProgram.name = "";
			request(app)
				.post("/api/programs/")
				.set("Authorization", users[0].token)
				.send(newProgram)
				.expect(400)
				.expect((res) => {
					expect(res.body.name).to.equal("Name is required");
				})
				.end(done);
		});
	});

	describe("PATCH /programs/:id", (done) => {
		it("should update a program", (done) => {
			programs[2].name = "Program 15";

			request(app)
				.patch(`/api/programs/${programs[2]._id}`)
				.set("Authorization", users[0].token)
				.send(programs[2])
				.expect(200)
				.expect((res) => {
					expect(res.body.name).to.equal("Program 15");
				})
				.end(done);
		});
		it("should not update a program", (done) => {
			programs[2].name = "WH 020";
			request(app)
				.patch(`/api/programs/${programs[2]._id}ssss`)
				.set("Authorization", users[0].token)
				.send(programs[2])
				.expect(400)
				.expect((res) => {
					expect(res.body.program).to.equal(
						"There was no program found"
					);
				})
				.end(done);
		});
	});

	describe("DELETE /programs/:id", (done) => {
		it("should delete a program", (done) => {
			request(app)
				.delete(`/api/programs/${programs[2]._id}`)
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.name).to.equal(programs[2].name);
				})
				.end(done);
		});
		it("should not delete a program", (done) => {
			request(app)
				.delete(`/api/programs/${programs[2]._id}ssss`)
				.set("Authorization", users[0].token)
				.expect(400)
				.expect((res) => {
					expect(res.body.program).to.equal(
						"There was no program found"
					);
				})
				.end(done);
		});
	});
});
