const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the SubSection model.
const SubSectionSchema = new Schema({
    status: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Status"
    },
    notes: [],
    images: [],
});

// Export the SubSection model.
module.exports = SubSection = mongoose.model("subsection",SubSectionSchema);
