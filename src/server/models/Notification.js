const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Notification model.
const NotificationSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  users_read: [],
  created_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: Date,
  },
});

// Export the Notification model.
module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);
