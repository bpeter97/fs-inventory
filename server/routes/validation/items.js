const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateItemInput(data) {
	// initialize errors, will be returned.
	let errors = {};

	// Set data values to blanks if they're empty.
	data.item_name = !isEmpty(data.item_name) ? data.item_name : "";
	data.description = !isEmpty(data.description) ? data.description : "";
	data.location = !isEmpty(data.location) ? data.location : "";
	data.photo = !isEmpty(data.photo) ? data.photo : "";
	data.program = !isEmpty(data.program) ? data.program : "";
	data.warehouse = !isEmpty(data.warehouse) ? data.warehouse : "";

	// Check to see if item_name has validation errors.
	if (validator.isEmpty(data.item_name)) {
		errors.item_name = "Item name is required";
	} else if (!validator.isLength(data.item_name, { min: 2, max: 20 })) {
		errors.item_name = "Item name must be between 2 and 20 characters";
	}

	// Check to see if description has validation errors.
	if (validator.isEmpty(data.description)) {
		errors.description = "Description is required";
	}

	// Check to see if location has validation errors.
	if (validator.isEmpty(data.location)) {
		errors.location = "Location is required";
	}

	// Return errors and a property called is_valid.
	return {
		errors,
		is_valid: isEmpty(errors),
	};
};
