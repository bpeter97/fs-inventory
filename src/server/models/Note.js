const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Note model.
const NoteSchema = new Schema({
  note: {
    type: String,
    required: true,
  },
});

// Export the Note model.
module.exports = Note = mongoose.model(
  "note",
  NoteSchema
);
