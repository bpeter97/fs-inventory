const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateSectionInput(data) {
    // initialize errors, will be returned.
    let errors = {};

    // Set data values to blanks if they're empty.
    data.label = !isEmpty(data.label) ? data.label : "";

    // Check to see if subsection has validation errors.
    if (validator.isEmpty(data.label)) {
        errors.label = "The section's label is missing";
    }

    // Return errors and a property called is_valid.
    return {
        errors,
        is_valid: isEmpty(errors),
    };
};
