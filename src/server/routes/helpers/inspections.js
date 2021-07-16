const _ = require("lodash");
const { ObjectID } = require("mongodb");

// Models
const Inspection = require("../../models/Inspection");
const Section = require("../../models/Section");
const User = require("../../models/User");
const SubSection = require("../../models/SubSection");
const Status = require("../../models/Status");
const Note = require("../../models/Note");
const Requirement = require("../../models/Requirement");

// validation
const validateInput = require("../validation/validateInput");

// @route   GET api/inspections/
// @desc    Retrieves all inspections.
// @access  Private
exports.getInspections = (req, res) => {
    Inspection.find({})
        .populate({
            path: "sections",
            model: Section,
            populate: [{
                path: "sub_sections",
                model: SubSection,
                populate: [{
                    path: "status",
                    model: Status
                },
                {
                    path: "notes",
                    model: Note
                }],
                
            }, {
                path: "requirements",
                model: Requirement 
            }]
        })
        .populate({ 
            path: "inspector", 
            model: User 
        })
        .then((inspections) => {
            if(!inspections) {
                return res.json({ error: "No inspections found" });
            }
            res.send(inspections);
        })
        .catch(e => res.status(404).json(e));
};

// @route   GET api/inspections/:id
// @desc    Gets a specific inspections.
// @access  Private
exports.getInspection = (req, res) => {
    let errors = {};

    if (!ObjectID.isValid(req.params.id)) {
        errors.inspection = "There was no inspection found";
        return res.status(400).json(errors);
    }

    Inspection.findById(req.params.id)
        .populate({
            path: "sections",
            model: Section,
            populate: [{
                path: "sub_sections",
                model: SubSection,
                populate: [{
                    path: "status",
                    model: Status
                },
                {
                    path: "notes",
                    model: Note
                }],
                
            }, {
                path: "requirements",
                model: Requirement 
            }]
        })
        .populate({ 
            path: "inspector", 
            model: User 
        })
        .then((inspection) => {
            if (!inspection) {
                return res.json({ error: "There was no inspection found" });
            }
                res.send(inspection);
            })
            .catch((e) => res.status(404).json(e));
};

// @route   POST api/inspections/
// @desc    Creates a inspection.
// @access  Private
exports.postInspection = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateInput("inspection", req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Set the properties for the new Requirement
    var body = _.pick(req.body, [
        "type",
        "inspector",
        "num_of_stories",
        "year_built",
        "people_at_inspection",
        "date_of_inspection",
    ]);

    body.sections = [];

    // If there are sections, add them to the body.
    if (req.body.sections !== undefined) {
        req.body.sections.forEach((section) => {
            body.sections.push(section);
        });
    };

    // Create the new Inspection
    var newInspection = new Inspection(body);

    // Save the new Inspection to the DB, lastly return the Inspection.
    newInspection
        .save()
        .then((inspection) => {
            
            if(inspection) {

                // Save a new notification
                let note_data = {
                    description: `A new inspection (${inspection.type}) has been created.`,
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
            inspection.populate({ 
                path: "sections",
                model: Section,
                populate: [{
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
                },
                {
                    path: "requirements",
                    model: Requirement
                }]
            }).execPopulate();
            inspection.populate({ path: "inspector", model: User }).execPopulate();
            res.send(inspection);
        })
        .catch(e => res.status(400).json(e));
};

// @route   PATCH api/inspections/:id
// @desc    Updates a inspection.
// @access  Private
exports.patchInspection = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateInput("inspection", req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.inspection = "There was no inspection found";
        return res.status(400).json(errors);
    }

    // Set the properties
    var update = _.pick(req.body, [
        "type",
        "inspector",
        "num_of_stories",
        "year_built",
        "people_at_inspection",
        "date_of_inspection",
    ]);

    update.sections = [];

    // If there are sections, add them to the update.
    if (req.body.sections !== undefined) {
        req.body.sections.forEach((section) => {
            update.sections.push(section);
        });
    };

    // Save the new Inspection to the DB, lastly return the Inspection.
    Inspection.findByIdAndUpdate(req.params.id, update, { new: true })
        .then((inspection) => {
            if(!inspection) {
                return res.json({ error: "There was no inspection found" });
            } else {
                // Save a new notification
                let note_data = {
                    description: `A new inspection (${inspection.type}) has been updated.`,
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

                inspection.populate({ 
                    path: "sections",
                    model: Section,
                    populate: [{
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
                    },
                    {
                        path: "requirements",
                        model: Requirement
                    }]
                }).execPopulate();
                inspection.populate({ path: "inspector", model: User }).execPopulate();
                res.send(inspection);
            }
        })
        .catch(e => res.status(400).json(e));
};

// @route   DELETE api/inspections/:id
// @desc    Deletes a specific inspection.
// @access  Private
exports.deleteInspection = (req, res) => {
    let errors = {};

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.inspection = "There was no inspection found";
        return res.status(400).json(errors);
    }

    Inspection.findByIdAndRemove(req.params.id)
        .then((inspection) => {
            if (!inspection) {
                errors.inspection = "There was no inspection found";
                res.status(404).json(errors);
            }

            // Save a new notification
            let note_data = {
                description: `A new inspection (${inspection.type}) has been deleted.`,
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

            res.json(inspection);
        })
        .catch((e) => res.status(400).send(e));
};