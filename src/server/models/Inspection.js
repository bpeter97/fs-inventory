const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Inspection model.
const InspectionSchema = new Schema({
    sections: [
        {
            type: Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    inspector: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true
    },
    num_of_stories: {
        type: Number
    },
    year_built: {
        type: Number
    },
    people_at_inspection: {
        type: String
    },
    date_of_inspection: {
        type: Date,
    },
});

// Export the Inspection model.
module.exports = Inspection = mongoose.model("inspection",InspectionSchema);
