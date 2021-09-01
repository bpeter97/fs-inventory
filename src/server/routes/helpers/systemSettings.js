const _ = require("lodash");

// Require models
const SystemSetting = require("../../models/SystemSetting");
const { ObjectID } = require("mongodb");

// @route   GET api/systemsettings/
// @desc    Retrieves all system settings.
// @access  Private
exports.getSystemSettings = (req, res) => {
  var errors = {};

  SystemSetting.find({})
    .then((systemSettings) => {
        if (!systemSettings) {
            return res.json({ error: "No systemSettings found." });
        }
        res.send(systemSettings[0]);
    })
    .catch(e => res.status(404).json(e));

};

// @route   PATCH api/systemsettings/:id
// @desc    Updates the system settings
// @access  Private
exports.updateSystemSettings = (req, res) => {
  var errors = {};

  let update = _.pick(req.body, 
    [
      "base_inspection_charge",
      "distance_modifier",
      "age_modifier",
      "square_footage_modifier",
      "pool_spa_charge",
      "deck_charge",
      "crawlspace_charge",
    ]
  );
  
  SystemSetting.findByIdAndUpdate(req.params.id, update, { new: true })
    .then((systemSetting) => {
      if (!systemSetting) {
        return res.json({ error: "No system setting were found." });
      }
      res.send(systemSetting);
    })
    .catch((e) => res.status(404).json(e));
};
