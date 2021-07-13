const _ = require("lodash");
const mongoose = require("mongoose");

// Require models
const Client = require("../../models/Client");
const validateClientInput = require("../validation/clients");

const { ObjectID } = require("mongodb");

// @route   GET api/Clients/
// @desc    Retrieves all Clients.
// @access  Private
exports.getClients = (req, res) => {
    Client.find({})
    .then((clients) => {
        if (!clients) {
            return res.json({ error: "No clients found." });
        }
        res.send(clients);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/clients/
// @desc    Creates a note.
// @access  Private
exports.postClient = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateClientInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Set the properties for the new Client
    var body = _.pick(req.body, [
        "full_name",
        "phone_number"
    ]);

    // Create the new Client
    var newClient = new Client(body);

    // Check to see if client already exist.
    Client.findOne({ full_name: body.full_name }).then((client) => {
        if (client) {
            // Return error if it already exists.
            errors.full_name = "A client with that name already exist";
            return res.status(400).json(errors);
        }
        
        // Save the new Status to the DB, lastly return the Status.
        newClient
            .save()
            .then((client) => {
                
                if(client) {

                    // Save a new notification
                    let note_data = {
                        description: `A new client (${client.full_name}) has been created.`,
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
                res.send(client);
            })
            .catch(e => res.status(400).json(e));
    });
};

// @route   GET api/clients/:id
// @desc    Gets a specific clients.
// @access  Private
exports.getClient = (req, res) => {
    let errors = {};

    if (!ObjectID.isValid(req.params.id)) {
        errors.client = "There was no client found";
        return res.status(400).json(errors);
    }

    Client.findById(req.params.id)
        .then((client) => {
            if (!client) {
                return res.json({ error: "There was no client found" });
            }
                res.send(client);
            })
            .catch((e) => res.status(404).json(e));
};

// @route   PATCH api/clients/:id
// @desc    Updates a client.
// @access  Private
exports.patchClient = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateClientInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.client = "There was no client found";
        return res.status(400).json(errors);
    }

    // Set the properties for the new Client
    var update = _.pick(req.body, [
        "full_name",
        "phone_number"
    ]);

    // Save the new Client to the DB, lastly return the Client.
    Client.findByIdAndUpdate(req.params.id, update, { new: true })
        .then((client) => {
            if(!client) {
                return res.json({ error: "There was no client found" });
            } else {
                // Save a new notification
                let note_data = {
                    description: `A new client (${client.full_name}) has been updated.`,
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
                res.send(client);
            }
        })
        .catch(e => res.status(400).json(e));
};

// @route   DELETE api/clients/:id
// @desc    Deletes a specific client.
// @access  Private
exports.deleteClient = (req, res) => {
    let errors = {};

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.client = "There was no client found";
        return res.status(400).json(errors);
    }

    Client.findByIdAndRemove(req.params.id)
        .then((client) => {
            if (!client) {
                errors.client = "There was no client found";
                res.status(404).json(errors);
            }

            // Save a new notification
            let note_data = {
                description: `A new client (${client.full_name}) has been deleted.`,
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

            res.json(client);
        })
        .catch((e) => res.status(400).send(e));
};