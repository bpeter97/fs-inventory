const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Job model.
const JobSchema = new Schema({
    inspections: [
        {
            type: Schema.Types.ObjectId,
            ref: "Inspection"
        }
    ],
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
    date_created: {
        type: Date,
    },
});

// Export the Job model.
module.exports = Job = mongoose.model("job",JobSchema);
