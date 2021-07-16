const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Section model.
const SectionSchema = new Schema({
    label: {
        type: Schema.Types.String,
        required: true
    },
    sub_sections: [
        {
            type: Schema.Types.ObjectId,
            ref: "SubSection"
        }
    ],
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ],
    requirements: [
        {
            type: Schema.Types.ObjectId,
            ref: "Requirement"
        }
    ],
});

// Export the Section model.
module.exports = Section = mongoose.model("section",SectionSchema);
