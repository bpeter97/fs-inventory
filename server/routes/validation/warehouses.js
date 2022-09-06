const validator = require("validator");
const isEmpty = require("./is-empty");

// this function will validate the input fields for the login page
module.exports = function validateWarehouseInput(data) {
	// initialize errors, will be returned.
	let errors = {};

	// Set data values to blanks if they're empty.
	data.name = !isEmpty(data.name) ? data.name : "";

	// Check to see if name has validation errors.
	if (validator.isEmpty(data.name)) {
		errors.name = "Name is required";
	}

	// Return errors and a property called is_valid.
	return {
		errors,
		is_valid: isEmpty(errors),
	};
};
