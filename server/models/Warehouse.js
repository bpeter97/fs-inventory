import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Warehouse model.
const WarehouseSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

// Export the Warehouse model.
module.exports = Warehouse = mongoose.model("warehouse", WarehouseSchema);
