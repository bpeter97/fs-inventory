import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Item model.
const ItemSchema = new Schema({
	item_name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	donation: {
		type: Boolean,
		required: true,
	},
	client_access: {
		type: Boolean,
		required: true,
	},
	value: {
		type: Number,
		required: false,
	},
	location: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	photo: {
		type: String,
		required: false,
	},
	program: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Program",
	},
	warehouse: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Warehouse",
	},
});

// Export the Item model.
module.exports = Item = mongoose.model("item", ItemSchema);
