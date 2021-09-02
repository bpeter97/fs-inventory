const _ = require("lodash");
const ObjectID = require('mongoose').Types.ObjectId;

// Models
const Job = require("../../models/Job");
const Inspection = require("../../models/Inspection");
const Section = require("../../models/Section");
const User = require("../../models/User");
const SubSection = require("../../models/SubSection");
const Status = require("../../models/Status");
const Note = require("../../models/Note");
const Requirement = require("../../models/Requirement");
const Client = require("../../models/Client");

// @route   GET api/Jobs/
// @desc    Retrieves all Jobs.
// @access  Private
exports.getJobs = (req, res) => {
    Job.find({})
        .populate({
            path: "inspections",
            model: Inspection,
            populate: [{
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
                }, {
                    path: "notes",
                    model: Note 
                }]
            },{
                path: "inspector",
                model: User
            }]
        })
        .populate({ 
            path: "client", 
            model: Client 
        })
        .then((jobs) => {
            if(!jobs) {
                return res.json({ error: "No jobs found" });
            }
            res.send(jobs);
        })
        .catch(e => res.status(404).json(e));
};

// @route   GET api/jobs/:id
// @desc    Gets a specific jobs.
// @access  Private
exports.getJob = (req, res) => {
    let errors = {};

    if (!ObjectID.isValid(req.params.id)) {
        errors.job = "There was no job found";
        return res.status(400).json(errors);
    }

    Job.findById(req.params.id)
        .populate({
            path: "inspections",
            model: Inspection,
            populate: [{
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
                }, {
                    path: "notes",
                    model: Note 
                }]
            },{
                path: "inspector",
                model: User
            }]
        })
        .populate({ 
            path: "client", 
            model: Client 
        })
        .then((job) => {
            if (!job) {
                return res.json({ error: "There was no job found" });
            }
                res.send(job);
            })
            .catch((e) => res.status(404).json(e));
};

// @route   POST api/jobs/
// @desc    Creates a job.
// @access  Private
exports.postJob = (req, res) => {

    // Set the properties for the new Requirement
    var body = _.pick(req.body, [
        "client",
        "address",
        "city",
        "state",
        "zipcode",
        "date_created",
    ]);

    body.inspections = [];

    // If there are inspections, add them to the body.
    if (req.body.inspections !== undefined) {
        req.body.inspections.forEach((inspection) => {
            body.inspections.push(inspection);
        });
    };

    // Create the new Job
    var newJob = new Job(body);

    // Save the new Job to the DB, lastly return the Job.
    newJob
        .save()
        .then((job) => {
            
            if(job) {

                // Save a new notification
                let note_data = {
                    description: `A new job has been created.`,
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
            job.populate({ 
                path: "inspections",
                model: Inspection,
                populate: [{
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
                    }, {
                        path: "notes",
                        model: Note 
                    }]
                },{
                    path: "inspector",
                    model: User
                }]
            }).execPopulate();
            job.populate({ path: "client", model: Client }).execPopulate();
            res.send(job);
        })
        .catch(e => res.status(400).json(e));
};

// @route   PATCH api/jobs/:id
// @desc    Updates a job.
// @access  Private
exports.patchJob = (req, res) => {
    let errors = {};
    
    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.job = "There was no job found";
        return res.status(400).json(errors);
    }

    // Set the properties
    var update = _.pick(req.body, [
        "client",
        "address",
        "city",
        "state",
        "zipcode",
        "date_created",
    ]);

    update.inspections = [];

    // If there are inspections, add them to the update.
    if (req.body.inspections !== undefined) {
        req.body.inspections.forEach((inspection) => {
            update.inspections.push(inspection);
        });
    };

    // Save the new Job to the DB, lastly return the Job.
    Job.findByIdAndUpdate(req.params.id, update, { new: true })
        .then((job) => {
            if(!job) {
                return res.json({ error: "There was no job found" });
            } else {
                // Save a new notification
                let note_data = {
                    description: `A new job has been updated.`,
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

                job.populate({ 
                    path: "inspections",
                    model: Inspection,
                    populate: [{
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
                        }, {
                            path: "notes",
                            model: Note 
                        }]
                    },{
                        path: "inspector",
                        model: User
                    }]
                }).execPopulate();
                job.populate({ path: "client", model: Client }).execPopulate();
                res.send(job);
            }
        })
        .catch(e => res.status(400).json(e));
};

// @route   DELETE api/jobs/:id
// @desc    Deletes a specific job.
// @access  Private
exports.deleteJob = (req, res) => {
    let errors = {};

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.job = "There was no job found";
        return res.status(400).json(errors);
    }

    Job.findByIdAndRemove(req.params.id)
        .then((job) => {
            if (!job) {
                errors.job = "There was no job found";
                res.status(404).json(errors);
            }

            // Save a new notification
            let note_data = {
                description: `A new job has been deleted.`,
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

            res.json(job);
        })
        .catch((e) => res.status(400).send(e));
};