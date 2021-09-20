const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateClientInput(data) {
    // initialize errors, will be returned.
    let errors = {};

    // Set data values to blanks if they're empty.
    data.full_name = !isEmpty(data.full_name) ? data.full_name : "";
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";

    // Check to see if client has validation errors.
    if (validator.isEmpty(data.full_name)) {
        errors.full_name = "The client's name is missing";
    }
    if (validator.isEmpty(data.phone_number)) {
        errors.phone_number = "The client's phone number is missing";
    }

    // Return errors and a property called is_valid.
    return {
        errors,
        is_valid: isEmpty(errors),
    };
};
