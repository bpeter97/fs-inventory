import * as _ from "lodash";
// import * as bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

// Require Models
const User = require("../../models/User");

// validation files
const validateUserInput = require("../validation/users");
// const validateLoginInput = require("../validation/login");

// @route   GET api/users/
// @desc    Retrieves all of the users
// @access  Private
exports.getUsers = (req, res) => {
	User.find({})
		.then((users) => {
			if (!users) {
				return res.json({ error: "No users found." });
			}
			res.send(users);
		})
		.catch((e) => res.status(404).json(e));
};

// @route   GET api/users/:id
// @desc    Retrieves all of the users
// @access  Private
exports.getUser = (req, res) => {
	let errors = {};

	if (!ObjectId.isValid(req.params.id)) {
		errors.user = "There was no user found.";
		return res.status(400).json(errors);
	}

	User.findById(req.params.id)
		.then((user) => {
			if (!user) {
				return res.json({ error: "No user was found." });
			}
			res.send(user);
		})
		.catch((e) => res.status(404).json(e));
};

// @route   POST api/register/
// @desc    Creates a new User.
// @access  Private
exports.postUser = (req, res) => {
	// check for validation errors
	const { errors, is_valid } = validateUserInput(req.body);

	// send 400 error with validation errors if not valid.
	if (!is_valid) return res.status(400).json(errors);

	// Set the properties for the new User
	var body = _.pick(req.body, [
		"username",
		"password",
		"first_name",
		"last_name",
		"suffix",
		"email",
	]);

	body.type = "Employee";
	if (req.headers.authorization) {
		body.approved = true;
	} else {
		body.approved = false;
	}
	body.date_created = new Date();

	// Check to see if username exists
	User.findOne({ username: body.username }).then((user) => {
		if (user) {
			errors.username = "Username already exists.";
			return res.status(400).json(errors);
		} else {
			// Create the new user
			var newUser = new User(body);

			// Save the new user to the DB, remember, password is hashed and salted in save() method.
			newUser
				.save()
				.then((user) => res.send(user))
				.catch((err) => console.log(err));
		}
	});
};
