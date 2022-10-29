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

NotificationSchema.methods.generateNote = function (desc, user) {
	var note = this;
	note.description = desc;
	note.users_read.push(user._id);
	note.created_by = user._id;
	return this;
};

// Export the Notification model.
module.exports = Notification = mongoose.model(
	"notification",
	NotificationSchema
);
