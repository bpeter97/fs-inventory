const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateRequirementInput(data) {
    // initialize errors, will be returned.
    let errors = {};

    // Set data values to blanks if they're empty.
    data.label = !isEmpty(data.label) ? data.label : "";
    data.value_character = !isEmpty(data.value_character) ? data.value_character : "";
    
    // Check to see if the label field is empty.
    if (validator.isEmpty(data.label)) {
        errors.label = "The requirement's label is missing";
    }

    // Check to see if boolean is true, if so, then value boolean can't be empty.
    if(data.is_boolean) {
        if(validator.isEmpty(data.value_boolean)) {
            errors.value = "The value (true/false) for the requirement is missing";
        }
    }

    // Check to see if number is true, if so, then value int can't be empty.
    if(data.is_number) {
        if(validator.isEmpty(data.value_int)) {
            errors.value = "The value (number) for the requirement is missing";
        }
    }

    // if boolean and number is false, then value character can't be empty.
    if(!data.is_boolean && !data.is_number) {
        if(validator.isEmpty(data.value_character)) {
            errors.value = "The value for the requirement is missing";
        }
    }

    // Return errors and a property called is_valid.
    return {
        errors,
        is_valid: isEmpty(errors),
    };

};
