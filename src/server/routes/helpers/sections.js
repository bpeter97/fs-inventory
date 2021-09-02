const _ = require("lodash");
const ObjectID = require('mongoose').Types.ObjectId;

// Require models
const SubSection = require("../../models/SubSection");
const Section = require("../../models/Section");
const Note = require("../../models/Note");
const Requirement = require("../../models/Requirement");
const Status = require("../../models/Status");
const validateSectionInput = require("../validation/sections");

// @route   GET api/sections/
// @desc    Retrieves all sections.
// @access  Private
exports.getSections = (req, res) => {
    Section.find({})
        .populate({
            path: "sub_sections",
            model: SubSection,
            populate: [{
                path: "status",
                model: Status
            },
            {
                path: "notes",
                model: Note
            }]
        })
        .populate({ 
            path: "notes", 
            model: Note 
        })
        .populate({ 
            path: "requirements", 
            model: Requirement 
        })
        .then((sections) => {
            if(!sections) {
                return res.json({ error: "No sections found" });
            }
            res.send(sections);
        })
        .catch(e => res.status(404).json(e));
};

// @route   GET api/sections/:id
// @desc    Gets a specific sections.
// @access  Private
exports.getSection = (req, res) => {
    let errors = {};

    if (!ObjectID.isValid(req.params.id)) {
        errors.section = "There was no section found";
        return res.status(400).json(errors);
    }

    Section.findById(req.params.id)
        .populate({
            path: "sub_sections",
            model: SubSection,
            populate: [{
                path: "status",
                model: Status
            },
            {
                path: "notes",
                model: Note
            }]
        })
        .populate({ 
            path: "notes", 
            model: Note 
        })
        .populate({ 
            path: "requirements", 
            model: Requirement 
        })
        .then((section) => {
            if (!section) {
                return res.json({ error: "There was no section found" });
            }
                res.send(section);
            })
            .catch((e) => res.status(404).json(e));
};

// @route   POST api/sections/
// @desc    Creates a section.
// @access  Private
exports.postSection = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateSectionInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Set the properties for the new Requirement
    var body = _.pick(req.body, [
        "label",
    ]);

    body.notes = [];
    body.sub_sections = [];
    body.requirements = [];

    // If there are requirements, add them to the body.
    if (req.body.requirements !== undefined) {
        req.body.requirements.forEach((requirement) => {
            body.requirements.push(requirement);
        });
    };

    // If there are notes, add them to the body.
    if (req.body.notes !== undefined) {
        req.body.notes.forEach((note) => {
            body.notes.push(note);
        });
    };

    // If there are sub_sections, add them to the body.
    if (req.body.sub_sections !== undefined) {
        req.body.sub_sections.forEach((sub_section) => {
            body.sub_sections.push(sub_section);
        });
    };

    // Create the new Section
    var newSection = new Section(body);

    // Save the new Section to the DB, lastly return the Section.
    newSection
        .save()
        .then((section) => {
            
            if(section) {

                // Save a new notification
                let note_data = {
                    description: `A new section (${section.label}) has been created.`,
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
            section.populate({ 
                path: "sub_sections",
                model: SubSection,
                populate: [{
                    path: "status",
                    model: Status
                },
                {
                    path: "notes",
                    model: Note
                }]
            }).execPopulate();
            section.populate({ path: "notes", model: Note }).execPopulate();
            section.populate({ path: "requirements", model: Requirement }).execPopulate();
            res.send(section);
        })
        .catch(e => res.status(400).json(e));
};

// @route   PATCH api/sections/:id
// @desc    Updates a section.
// @access  Private
exports.patchSection = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateSectionInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.section = "There was no section found";
        return res.status(400).json(errors);
    }

    // Set the properties for the new Client
    var update = _.pick(req.body, [
        "label",
        "status"
    ]);

    update.notes = [];
    update.sub_sections = [];
    update.requirements = [];

    // If there are requirements, add them to the body.
    if (req.body.requirements !== undefined) {
        req.body.requirements.forEach((requirement) => {
            update.requirements.push(requirement);
        });
    };

    // If there are notes, add them to the body.
    if (req.body.notes !== undefined) {
        req.body.notes.forEach((note) => {
            update.notes.push(note);
        });
    };

    // If there are sub_sections, add them to the body.
    if (req.body.sub_sections !== undefined) {
        req.body.sub_sections.forEach((sub_section) => {
            update.sub_sections.push(sub_section);
        });
    };

    // Save the new Section to the DB, lastly return the Section.
    Section.findByIdAndUpdate(req.params.id, update, { new: true })
        .then((section) => {
            if(!section) {
                return res.json({ error: "There was no section found" });
            } else {
                // Save a new notification
                let note_data = {
                    description: `A new section (${section.label}) has been updated.`,
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

                section.populate({ 
                    path: "sub_sections",
                    model: SubSection,
                    populate: [{
                        path: "status",
                        model: Status
                    },
                    {
                        path: "notes",
                        model: Note
                    }]
                }).execPopulate();
                section.populate({ path: "notes", model: Note }).execPopulate();
                section.populate({ path: "requirements", model: Requirement }).execPopulate();
                res.send(section);
            }
        })
        .catch(e => res.status(400).json(e));
};

// @route   DELETE api/sections/:id
// @desc    Deletes a specific section.
// @access  Private
exports.deleteSection = (req, res) => {
    let errors = {};

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.section = "There was no section found";
        return res.status(400).json(errors);
    }

    Section.findByIdAndRemove(req.params.id)
        .then((section) => {
            if (!section) {
                errors.section = "There was no section found";
                res.status(404).json(errors);
            }

            // Save a new notification
            let note_data = {
                description: `A new section (${section.label}) has been deleted.`,
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

            res.json(section);
        })
        .catch((e) => res.status(400).send(e));
};