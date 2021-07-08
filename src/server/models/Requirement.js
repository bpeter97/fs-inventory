const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Requirement model.
const RequirementSchema = new Schema({
  is_boolean: {
    type: Boolean,
    required: true
  },
  is_number: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value_string: {
    type: String,
    required: false
  },
  value_boolean: {
    type: Boolean,
    required: false
  },
  value_number: {
    type: Number,
    required: false
  }
});

// Export the Requirement model.
module.exports = Requirement = mongoose.model("requirement", RequirementSchema);
