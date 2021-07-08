const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Section model.
const SectionSchema = new Schema({
    label: {
        type: Schema.Types.String,
        required: true
    },
    sub_sections: [],
    notes: [],
    requirements: [],
});

// Export the Section model.
module.exports = Section = mongoose.model("section",SectionSchema);
