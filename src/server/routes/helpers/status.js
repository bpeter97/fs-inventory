const _ = require("lodash");
const mongoose = require("mongoose");

// Require models
const Status = require("../../models/Status");
const validateStatusInput = require("../validation/status");

const { ObjectID } = require("mongodb");

// @route   GET api/Status/
// @desc    Retrieves all Status.
// @access  Private
exports.getStatus = (req, res) => {
    Status.find({})
    .then((status) => {
        if (!status) {
            return res.json({ error: "No status found." });
        }
        res.send(status);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/status/
// @desc    Creates a note.
// @access  Private
exports.postStatus = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateStatusInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Set the properties for the new Status
    var body = _.pick(req.body, [
        "label",
        "initials"
    ]);

    // Create the new Status
    var newStatus = new Status(body);

    // Check to see if status already exist.
    Status.findOne({ label: body.label }).then((status) => {
        if (status) {
            // Return error if it already exists.
            errors.label = "A status with that label already exists";
            return res.status(400).json(errors);
        } else {
            Status.findOne({ initials: body.initials }).then((initials) => {
                if (initials) {
                    // Return error if it already exists.
                    errors.initials = "A status with the initials already exists";
                    return res.status(400).json(errors);
                } else {
                    // Save the new Status to the DB, lastly return the Status.
                    newStatus
                        .save()
                        .then((status) => {
                            if(status) {

                                // Save a new notification
                                let note_data = {
                                    description: `A new status (${status.initials}) has been created.`,
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
                            res.send(status);
                        })
                        .catch(e => res.status(400).json(e));
                }
            });
        }
    });
};

// @route   GET api/Status/:id
// @desc    Gets a specific status.
// @access  Private
exports.getStatusById = (req, res) => {
    let errors = {};

    if (!ObjectID.isValid(req.params.id)) {
        errors.status = "There was no status found.";
        return res.status(400).json(errors);
    }

    Status.findById(req.params.id)
        .then((status) => {
            if (!status) {
                return res.json({ error: "There was no status found." });
            }
                res.send(status);
            })
            .catch((e) => res.status(404).json(e));
};