const _ = require("lodash");
const ObjectID = require('mongoose').Types.ObjectId;

// Require models
const Requirement = require("../../models/Requirement");
const validateRequirementInput = require("../validation/requirements");

// @route   GET api/requirements/
// @desc    Retrieves all requirements.
// @access  Private
exports.getRequirements = (req, res) => {
    Requirement.find({})
        .then((requirements) => {
            if(!requirements) {
                return res.json({ error: "No requirements found" });
            }
            res.send(requirements);
        })
        .catch(e => res.status(404).json(e));
};

// @route   GET api/requirements/:id
// @desc    Gets a specific requirements.
// @access  Private
exports.getRequirement = (req, res) => {
    let errors = {};

    if (!ObjectID.isValid(req.params.id)) {
        errors.requirement = "There was no requirement found";
        return res.status(400).json(errors);
    }

    Requirement.findById(req.params.id)
        .then((requirement) => {
            if (!requirement) {
                return res.json({ error: "There was no requirement found" });
            }
                res.send(requirement);
            })
            .catch((e) => res.status(404).json(e));
};

// @route   POST api/requirementss/
// @desc    Creates a note.
// @access  Private
exports.postRequirement = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateRequirementInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Set the properties for the new Requirement
    var body = _.pick(req.body, [
        "is_boolean",
        "is_number",
        "label",
        "value_boolean",
        "value_character",
        "value_int"
    ]);

    // Create the new Requirement
    var newRequirement = new Requirement(body);

    // Save the new Requirement to the DB, lastly return the Requirement.
    newRequirement
        .save()
        .then((requirement) => {
            
            if(requirement) {

                // Save a new notification
                let note_data = {
                    description: `A new requirement (${requirement.label}) has been created.`,
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
            res.send(requirement);
        })
        .catch(e => res.status(400).json(e));
};

// @route   PATCH api/requirements/:id
// @desc    Updates a requirement.
// @access  Private
exports.patchRequirement = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateRequirementInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.requirement = "There was no requirement found";
        return res.status(400).json(errors);
    }

    // Set the properties for the new Client
    var update = _.pick(req.body, [
        "is_boolean",
        "is_number",
        "label",
        "value_boolean",
        "value_character",
        "value_int"
    ]);

    // Save the new Requirement to the DB, lastly return the Requirement.
    Requirement.findByIdAndUpdate(req.params.id, update, { new: true })
        .then((requirement) => {
            if(!requirement) {
                return res.json({ error: "There was no requirement found" });
            } else {
                // Save a new notification
                let note_data = {
                    description: `A new requirement (${requirement.label}) has been updated.`,
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
                res.send(requirement);
            }
        })
        .catch(e => res.status(400).json(e));
};

// @route   DELETE api/requirements/:id
// @desc    Deletes a specific requirement.
// @access  Private
exports.deleteRequirement = (req, res) => {
    let errors = {};

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.requirement = "There was no requirement found";
        return res.status(400).json(errors);
    }

    Requirement.findByIdAndRemove(req.params.id)
        .then((requirement) => {
            if (!requirement) {
                errors.requirement = "There was no requirement found";
                res.status(404).json(errors);
            }

            // Save a new notification
            let note_data = {
                description: `A new requirement (${requirement.label}) has been deleted.`,
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

            res.json(requirement);
        })
        .catch((e) => res.status(400).send(e));
};