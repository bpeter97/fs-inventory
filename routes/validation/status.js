const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateStatusInput(data) {
    // initialize errors, will be returned.
    let errors = {};

    // Set data values to blanks if they're empty.
    data.label = !isEmpty(data.label) ? data.label : "";
    data.initials = !isEmpty(data.initials) ? data.initials : "";

    // Check to see if status has validation errors.
    if (validator.isEmpty(data.label)) {
        errors.label = "The label field is empty";
    }
    if (validator.isEmpty(data.initials)) {
        errors.initials = "The initials field is empty";
    }

    // Return errors and a property called is_valid.
    return {
        errors,
        is_valid: isEmpty(errors),
    };
};
