import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Program model.
const ProgramSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

// Export the Program model.
module.exports = Program = mongoose.model("program", ProgramSchema);
