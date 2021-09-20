const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the SystemSetting model.
const SystemSettingSchema = new Schema({
  base_inspection_charge: {
    type: mongoose.Decimal128,
    required: true,
  },
  distance_modifier: {
    type: mongoose.Decimal128,
    required: true,
  },
  age_modifier: {
    type: mongoose.Decimal128,
    required: true
  },
  square_footage_modifier: {
    type: mongoose.Decimal128,
    required: true
  },
  pool_spa_charge: {
    type: mongoose.Decimal128,
    required: true
  },
  deck_charge: {
    type: mongoose.Decimal128,
    required: true
  },
  crawlspace_charge: {
    type: mongoose.Decimal128,
    required: true
  }
});

// Export the SystemSetting model.
module.exports = SystemSetting = mongoose.model("systemSetting", SystemSettingSchema);
