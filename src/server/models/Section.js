const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Section model.
const SectionSchema = new Schema({
    sub_sections: [],
    notes: [],
    requirements: [],
});

// Export the Section model.
module.exports = Section = mongoose.model("section",SectionSchema);
