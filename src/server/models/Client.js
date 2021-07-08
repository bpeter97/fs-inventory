const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Client model.
const ClientSchema = new Schema({
  full_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: false
  }
});

// Export the Client model.
module.exports = Client = mongoose.model("client", ClientSchema);
