const _ = require("lodash");
const mongoose = require("mongoose");

// Require models
const Call = require("../../models/Call");
const validateCallInput = require("../validation/calls");

const { ObjectID } = require("mongodb");

// @route   GET api/Call/
// @desc    Retrieves all Call.
// @access  Private
exports.getCalls = (req, res) => {
    Call.find({})
    .populate({ path: "inspection", model: Inspection })
    .then((calls) => {
        if (!calls) {
            return res.json({ error: "No calls found." });
        }
        res.send(calls);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/call/
// @desc    Creates a call.
// @access  Private
exports.postCall = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateCallInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Set the properties for the new Call
    var body = _.pick(req.body, [
        "date",
        "follow_up",
        "client_name",
        "phone_number",
        "address",
        "city",
        "state",
        "zipcode",
        "square_foot",
        "home_inspection",
        "crawl",
        "multi_story",
        "pool_spa",
        "deck",
        "quote"
    ]);

    // Create the new Call
    var newCall = new Call(body);

    // Save the new Call to the DB, lastly return the Call.
    newCall
    .save()
    .then((call) => {
        if(call) {

            // Save a new notification
            let note_data = {
                description: `A new call (${call.client_name}) has been created.`,
                users_read: []
            };

            // Get user ID
            User.findByToken(req.headers.authorization).then((user) => {
                note_data.created_by = user._id;
                note_data.date = new Date();
            
                // Save the notification
                let notification = new Notification(note_data);
            
                notification
                  .save()
                  .then((note) => {
                    note.users_read.push(user._id);
                    note
                      .save()
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              });
        }
        res.send(call);
    })
    .catch(e => res.status(400).json(e));
};

// @route   DELETE api/calls/:id
// @desc    Deletes a specific call.
// @access  Private
exports.deleteCall = (req, res) => {
    let errors = {};

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.call = "There was no call found";
        return res.status(400).json(errors);
    }

    Call.findByIdAndRemove(req.params.id)
        .then((call) => {
            if (!call) {
                errors.call = "There was no call found";
                res.status(404).json(errors);
            }

            // Save a new notification
            let note_data = {
                description: `A new call (${call.client_name}) has been deleted.`,
                users_read: []
            };

            // Get user ID
            User.findByToken(req.headers.authorization).then((user) => {
                note_data.created_by = user._id;
                note_data.date = new Date();
            
                // Save the notification
                let notification = new Notification(note_data);
            
                notification
                    .save()
                    .then((note) => {
                    note.users_read.push(user._id);
                    note
                        .save()
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                });

            res.json(call);
        })
        .catch((e) => res.status(400).send(e));
};