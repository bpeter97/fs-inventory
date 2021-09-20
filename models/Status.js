const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Status model.
const StatusSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    initials: {
        type: String,
        required: true
    }
});

// Export the Status model.
module.exports = Status = mongoose.model("status",StatusSchema);
