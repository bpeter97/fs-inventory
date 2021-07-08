const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Inspection model.
const InspectionSchema = new Schema({
    sections: [],
    inspector: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    type: {
        type: String,
        required: true
    },
    num_of_stories: {
        type: Number,
        required: true
    },
    year_built: {
        type: Number,
        required: false
    },
    people_at_inspection: {
        type: String,
        required: true
    },
    date_of_inspection: {
        type: Date,
    },
});

// Export the Inspection model.
module.exports = Inspection = mongoose.model("inspection",InspectionSchema);
