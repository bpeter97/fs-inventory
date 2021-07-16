const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the SubSection model.
const SubSectionSchema = new Schema({
    label: {
        type: Schema.Types.String,
        required: true
    },
    status: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Status"
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ],
    images: [],
});

// Export the SubSection model.
module.exports = SubSection = mongoose.model("subsection", SubSectionSchema);
