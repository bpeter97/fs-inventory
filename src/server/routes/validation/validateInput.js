const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateInput(identity, data) {

    // initialize errors, will be returned.
    let errors = {};

    switch(identity) {
        case "inspection":

            // Set data values to blank if they're empty.
            data.type = !isEmpty(data.type) ? data.type : "";

            // Check to see if note has validation errors.
            if (validator.isEmpty(data.type)) {
                errors.type = "The inspection's type is missing";
            }

            break;
        default:
            break;
    }

    // Return errors and a property called is_valid.
    return {
        errors,
        is_valid: isEmpty(errors),
    };
};
