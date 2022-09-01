import isEmpty from "./is-empty";
import validator from "validator";

// This validation will be used in the register route for the back end API
module.exports = function validateUserInput(data) {
	// initialize errors, will be returned.
	let errors = {};

	// Set data values to blanks if they're empty.
	data.username = !isEmpty(data.username) ? data.username : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
	data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
	data.suffix = !isEmpty(data.suffix) ? data.suffix : "";
	data.email = !isEmpty(data.email) ? data.email : "";

	// Check to see if first_name has validation errors.
	if (validator.isEmpty(data.first_name)) {
		errors.first_name = "First name is required";
	} else if (!validator.isLength(data.first_name, { min: 2, max: 20 })) {
		errors.first_name = "First name must be between 2 and 20 characters";
	}

	// Check to see if last_name has validation errors.
	if (validator.isEmpty(data.last_name)) {
		errors.last_name = "Last name is required";
	} else if (!validator.isLength(data.last_name, { min: 2, max: 20 })) {
		errors.last_name = "Last name must be between 2 and 20 characters";
	}

	// Check to see if suffix has validation errors.
	if (
		!validator.isEmpty(data.last_name) &&
		!validator.isLength(data.suffix, { min: 2, max: 4 })
	) {
		errors.suffix = "Suffix must be between 2 and 4";
	}

	// Check to see if username has validation errors.
	if (validator.isEmpty(data.username)) {
		errors.username = "Username is required";
	} else if (!validator.isLength(data.username, { min: 4, max: 20 })) {
		errors.username = "Username must be between 4 and 20 characters";
	}

	// Check to see if password has validation errors.
	if (validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	} else if (!validator.isLength(data.password, { min: 3 })) {
		errors.password = "Password must be more than 3 characters";
	}

	// Check to see if email has validation errors.
	if (validator.isEmpty(data.email)) {
		errors.email = "Email is required";
	} else if (!validator.isEmail(data.email)) {
		errors.email = "Must enter a valid email";
	}

	// Return errors and a property called is_valid.
	return {
		errors,
		is_valid: isEmpty(errors),
	};
};
