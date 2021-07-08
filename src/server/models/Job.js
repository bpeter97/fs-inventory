const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Job model.
const JobSchema = new Schema({
    inspections: [],
    client: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Client"
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
    },
});

// Export the Job model.
module.exports = Job = mongoose.model("job",JobSchema);
