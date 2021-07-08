const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Image model.
const ImageSchema = new Schema({
  img: {
    data: Buffer,
    contentType: String
  },
  title: {
    type: String,
    required: false
  },
  alternate_title: {
    type: String,
    required: false
  }
});

// Export the Image model.
module.exports = Image = mongoose.model("image", ImageSchema);
