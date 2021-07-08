const _ = require("lodash");
const mongoose = require("mongoose");

// Require models
const Settings = require("../../models/Settings");
const User = require("../../models/User");

const { ObjectID } = require("mongodb");

// @route   GET api/settings/:id
// @desc    Retrieves all notifications.
// @access  Private
exports.getSettings = (req, res) => {
  var errors = {};

  if (!ObjectID.isValid(req.params.id)) {
    errors.settings = "There was no settings found.";
    return res.status(400).json(errors);
  }

  Settings.findById(req.params.id)
    .then((settings) => {
      if (!settings) {
        return res.json({ error: "No settings were found." });
      }
      res.send(settings);
    })
    .catch((e) => res.status(404).json(e));
};

// @route   PATCH api/settings/:id
// @desc    Marks a notification as read.
// @access  Private
exports.updateSettings = (req, res) => {
  var errors = {};

  let update = _.pick(req.body, ["notifications"]);

  Settings.findByIdAndUpdate(req.params.id, update, { new: true })
    .then((settings) => {
      if (!settings) {
        return res.json({ error: "No settings were found." });
      }
      res.send(settings);
    })
    .catch((e) => res.status(404).json(e));
};
