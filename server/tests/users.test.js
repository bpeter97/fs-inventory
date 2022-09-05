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

var registerUser = {
	first_name: "jake",
	last_name: "smith",
	suffix: "",
	username: "jsithinson",
	password: "thePassword",
	email: "jsmithinson@test.com",
	type: "Employee",
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

	describe("GET /users/:id", () => {
		it("should get a specific user with the provided ID", (done) => {
			request(app)
				.get(`/api/users/${users[0]._id}`)
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body._id).to.equal(users[0]._id.toHexString());
					expect(res.body.username).to.equal(users[0].username);
				})
				.end(done);
		});
		it("should not return a user with invalid ID", (done) => {
			request(app)
				.get(`/api/users/${users[0]._id}ssss`)
				.set("Authorization", users[0].token)
				.expect(400)
				.expect((res) => {
					expect(res.body.user).to.equal("There was no user found");
					expect(res.body.username).to.not.equal(users[0].username);
				})
				.end(done);
		});
	});

	describe("PATCH /users/:id", () => {
		it("should update and return a single user", (done) => {
			users[1].approved = true;

			request(app)
				.patch(`/api/users/${users[1]._id.toHexString()}`)
				.set("Authorization", users[0].token)
				.send(users[1])
				.expect(200)
				.expect((res) => {
					expect(res.body.username).to.equal(users[1].username);
					expect(res.body.approved).to.equal(true);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}

					User.findById(users[1]._id.toHexString())
						.then((user) => {
							expect(user.approved).to.equal(true);
							done();
						})
						.catch((e) => done(e));
				});
		});

		it("should not update and return a user with invalid ID", (done) => {
			request(app)
				.patch(`/api/users/${users[1]._id}ssss`)
				.set("Authorization", users[0].token)
				.send(users[1])
				.expect(400)
				.expect((res) => {
					expect(res.body.auth).to.equal("Invalid ID");
				})
				.end(done);
		});

		it("should not update and return a user with validation errors", (done) => {
			userData = {
				firstName: "",
				lastName: "Peter",
				suffix: "Sr",
				username: "blpsr",
				password: "thePassword",
				email: "gbr@test.com",
				type: "Brian",
			};
			request(app)
				.patch(`/api/users/${users[1]._id}`)
				.set("Authorization", users[0].token)
				.send(userData)
				.expect(400)
				.expect((res) => {
					expect(res.body.first_name).to.equal(
						"First name is required"
					);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}

					User.findById(users[1]._id.toHexString())
						.then((user) => {
							expect(user.approved).to.equal(true);
							expect(user.first_name).to.equal("Brian");
							done();
						})
						.catch((e) => done(e));
				});
		});
	});

	describe("DELETE /users/:id", () => {
		it("should delete and return a single user", (done) => {
			request(app)
				.delete(`/api/users/${users[0]._id}`)
				.set("Authorization", users[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body._id).to.equal(users[0]._id.toHexString());
					expect(res.body.username).to.equal(users[0].username);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}

					User.findById(users[0]._id.toHexString())
						.then((user) => {
							expect(user).to.not.be.ok;
							done();
						})
						.catch((e) => done(e));
				});
		});
		it("should not delete and return a user with invalid ID", (done) => {
			request(app)
				.delete(`/api/users/${users[1]._id}sss`)
				.set("Authorization", users[0].token)
				.expect(400)
				.expect((res) => {
					expect(res.body.user).to.equal("There was no user found");
					expect(res.body.username).to.not.equal(users[1].username);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}

					User.findById(users[1]._id.toHexString())
						.then((user) => {
							expect(user).to.be.ok;
							expect(user.username).to.equal(users[1].username);
							done();
						})
						.catch((e) => done(e));
				});
		});
	});

	describe("POST /login", () => {
		let loginUser = {
			username: "blpj",
			password: "thePassword",
		};

		let loginWrongUser = {
			username: "blpj",
			password: "thePasswordssssss",
		};

		it("should log the user into the website", (done) => {
			request(app)
				.post("/api/login")
				.send(loginUser)
				.expect(200)
				.expect((res) => {
					expect(res.body.success).to.equal(true);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}
					done();
				});
		});

		it("should not log the user in with an incorrect password", (done) => {
			request(app)
				.post("/api/login")
				.send(loginWrongUser)
				.expect(401)
				.expect((res) => {
					expect(res.body.login).to.equal(
						"Wrong username/password combination"
					);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}
					done();
				});
		});

		it("should not log the user in when not approved", (done) => {
			request(app)
				.post("/api/login")
				.send(users[3])
				.expect(401)
				.expect((res) => {
					expect(res.body.login).to.equal(
						"Your account is not approved yet"
					);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}
					done();
				});
		});
	});

	describe("POST /register", () => {
		it("should register a new user", (done) => {
			request(app)
				.post("/api/register")
				.send(registerUser)
				.expect(200)
				.expect((res) => {
					expect(res.body.username).to.equal(registerUser.username);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}

					User.findOne({ username: registerUser.username })
						.then((user) => {
							expect(user).to.be.ok;
							expect(user.first_name).to.equal(
								registerUser.first_name
							);
							expect(user.password).not.to.equal(
								registerUser.password
							);
							done();
						})
						.catch((e) => done(e));
				});
		});
		it("should not register a new user with validation errors", (done) => {
			registerUser.email = "amessedupemail";
			registerUser.first_name = "l";
			registerUser.last_name = "l";
			registerUser.username = "l";
			registerUser.password = "l";
			request(app)
				.post("/api/register")
				.set("Authorization", users[0].token)
				.send(registerUser)
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
