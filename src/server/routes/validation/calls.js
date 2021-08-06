const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateCallInput(data) {
    // initialize errors, will be returned.
    let errors = {};

    // Set data values to blanks if they're empty.
    data.client_name = !isEmpty(data.client_name) ? data.client_name : "";
    data.initials = !isEmpty(data.initials) ? data.initials : "";

    // Check to see if Calls has validation errors.
    if (validator.isEmpty(data.client_name)) {
        errors.client_name = "The client name field is empty";
    }

    // Return errors and a property called is_valid.
    return {
        errors,
        is_valid: isEmpty(errors),
    };
};