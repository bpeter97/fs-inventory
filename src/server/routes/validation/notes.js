const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateNoteInput(data) {
    // initialize errors, will be returned.
    let errors = {};

    // Set data values to blanks if they're empty.
    data.note = !isEmpty(data.note) ? data.note : "";

    // Check to see if note has validation errors.
    if (validator.isEmpty(data.note)) {
        errors.note = "The note field is empty";
    }

    // Return errors and a property called is_valid.
    return {
        errors,
        is_valid: isEmpty(errors),
    };
};
