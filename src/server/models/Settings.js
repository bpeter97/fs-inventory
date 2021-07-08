const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Settings model.
const SettingsSchema = new Schema({
  notifications: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Export the Settings model.
module.exports = Settings = mongoose.model("settings", SettingsSchema);
