const request = require("supertest");
const chai = require("chai");
var expect = chai.expect;

const { app } = require("./../index");
const User = require("./../models/User");
const { populateUsers, users } = require("./seed/userSeed");

// New user object used for the register test.
var newUser = {
	first_name: "Johnny",
	last_name: "Boy",
	suffix: "",
	username: "jboy",
	password: "thePassword",
	email: "jboy@test.com",
	type: "Employee",
	approved: false,
};

describe("USERS", () => {
	// call beforeEach() to run functions before each test.
	beforeEach(populateUsers);

	describe("GET /users", () => {
		it("should return an array of users", (done) => {
			request(app)
				.get("/api/users")
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.length).to.equal(users.length);
				})
				.end(done);
		});
	});

	describe("POST /users", () => {
		it("should create a new user", (done) => {
			request(app)
				.post("/api/users")
				.set("Authorization", users[0].token)
				.send(newUser)
				.expect(200)
				.expect((res) => {
					expect(res.body.username).to.equal(newUser.username);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}

					User.findOne({ username: newUser.username })
						.then((user) => {
							expect(user).to.be.ok;
							expect(user.first_name).to.equal(
								newUser.first_name
							);
							expect(user.password).not.to.equal(
								newUser.password
							);
							done();
						})
						.catch((e) => done(e));
				});
		});
		it("should not create a new user with validation errors", (done) => {
			newUser.email = "amessedupemail";
			newUser.first_name = "l";
			newUser.last_name = "l";
			newUser.username = "l";
			newUser.password = "l";
			request(app)
				.post("/api/users")
				.set("Authorization", users[0].token)
				.send(newUser)
				.expect(400)
				.expect((res) => {
					expect(res.body.email).to.equal("Must enter a valid email");
					expect(res.body.first_name).to.equal(
						"First name must be between 2 and 20 characters"
					);
					expect(res.body.last_name).to.equal(
						"Last name must be between 2 and 20 characters"
					);
					expect(res.body.username).to.equal(
						"Username must be between 4 and 20 characters"
					);
					expect(res.body.password).to.equal(
						"Password must be more than 3 characters"
					);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}

					User.findOne({ username: newUser.username })
						.then((user) => {
							expect(user).to.not.be.ok;
							done();
						})
						.catch((e) => done(e));
				});
		});
	});
});
