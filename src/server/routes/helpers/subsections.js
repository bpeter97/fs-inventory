const _ = require("lodash");
const ObjectID = require('mongoose').Types.ObjectId;

// Require models
const SubSection = require("../../models/SubSection");
const Note = require("../../models/Note");
const Status = require("../../models/Status");
const Image = require("../../models/Image");
const validateSubsectionInput = require("../validation/subsections");

// @route   GET api/subsections/
// @desc    Retrieves all subsections.
// @access  Private
exports.getSubsections = (req, res) => {
    SubSection.find({})
        .populate({ path: "status", model: Status })
        .populate({ path: "notes", model: Note })
        .populate({ path: "images", model: Image })
        .then((subsections) => {
            if(!subsections) {
                return res.json({ error: "No subsections found" });
            }
            res.send(subsections);
        })
        .catch(e => res.status(404).json(e));
};

// @route   GET api/subsections/:id
// @desc    Gets a specific subsections.
// @access  Private
exports.getSubsection = (req, res) => {
    let errors = {};

    if (!ObjectID.isValid(req.params.id)) {
        errors.subsection = "There was no subsection found";
        return res.status(400).json(errors);
    }

    SubSection.findById(req.params.id)
        .populate({ path: "status", model: Status })
        .populate({ path: "notes", model: Note })
        .populate({ path: "images", model: Image })
        .then((subsection) => {
            if (!subsection) {
                return res.json({ error: "There was no subsection found" });
            }
                res.send(subsection);
            })
            .catch((e) => res.status(404).json(e));
};

// @route   POST api/subsections/
// @desc    Creates a subsection.
// @access  Private
exports.postSubsection = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateSubsectionInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Set the properties for the new Requirement
    var body = _.pick(req.body, [
        "label",
        "status"
    ]);

    body.notes = [];
    body.images = [];

    // If there are notes, add them to the body.
    if (req.body.notes !== undefined) {
        req.body.notes.forEach((note) => {
            body.notes.push(note);
        });
    };

    // If there are images, add them to the body.
    if (req.body.images !== undefined) {
        req.body.images.forEach((image) => {
            body.images.push(image);
        });
    };

    // Create the new SubSection
    var newSubsection = new SubSection(body);

    // Save the new SubSection to the DB, lastly return the SubSection.
    newSubsection
        .save()
        .then((subsection) => {
            
            if(subsection) {

                // Save a new notification
                let note_data = {
                    description: `A new subsection (${subsection.label}) has been created.`,
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
            subsection.populate({ path: "status", model: Status }).execPopulate();
            subsection.populate({ path: "notes", model: Note }).execPopulate();
            subsection.populate({ path: "images", model: Image }).execPopulate();
            res.send(subsection);
        })
        .catch(e => res.status(400).json(e));
};

// @route   PATCH api/subsections/:id
// @desc    Updates a subsection.
// @access  Private
exports.patchSubsection = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateSubsectionInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.subsection = "There was no subsection found";
        return res.status(400).json(errors);
    }

    // Set the properties for the new Client
    var update = _.pick(req.body, [
        "label",
        "status"
    ]);

    update.notes = [];
    update.images = [];

    // If there are notes, add them to the body.
    if (req.body.notes !== undefined) {
        req.body.notes.forEach((note) => {
            update.notes.push(note);
        });
    };

    // If there are images, add them to the body.
    if (req.body.images !== undefined) {
        req.body.images.forEach((image) => {
            update.images.push(image);
        });
    };

    // Save the new SubSection to the DB, lastly return the SubSection.
    SubSection.findByIdAndUpdate(req.params.id, update, { new: true })
        .then((subsection) => {
            if(!subsection) {
                return res.json({ error: "There was no subsection found" });
            } else {
                // Save a new notification
                let note_data = {
                    description: `A new subsection (${subsection.label}) has been updated.`,
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
                subsection.populate({ path: "status", model: Status }).execPopulate();
                subsection.populate({ path: "notes", model: Note }).execPopulate();
                subsection.populate({ path: "images", model: Image }).execPopulate();
                res.send(subsection);
            }
        })
        .catch(e => res.status(400).json(e));
};

// @route   DELETE api/subsections/:id
// @desc    Deletes a specific subsection.
// @access  Private
exports.deleteSubsection = (req, res) => {
    let errors = {};

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.subsection = "There was no subsection found";
        return res.status(400).json(errors);
    }

    SubSection.findByIdAndRemove(req.params.id)
        .then((subsection) => {
            if (!subsection) {
                errors.subsection = "There was no subsection found";
                res.status(404).json(errors);
            }

            // Save a new notification
            let note_data = {
                description: `A new subsection (${subsection.label}) has been deleted.`,
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

            res.json(subsection);
        })
        .catch((e) => res.status(400).send(e));
};